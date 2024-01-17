import { SpawnManager } from '../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { Globaldata } from "../const/Globaldata";
import { MotionFrameNode_SkillRect } from "../editors/motionEditor/MotionFrameNodeBase";
import { RP_DestroyManager } from "../rptool/GM/RP_DestroyManager";
import { EventManager } from "./EventManager";
import { EModule_Events } from "../const/Enum";
// import { AreaNpcModuleC } from "../module/AreaNpcModule/AreaNpcModuleC";



export class TriggerHelper {
    private static temporaryTriggerPool: mw.Trigger[] = []

    private static tentativeGameObjectArray: Map<number, mw.GameObject> = new Map()

    /**todo 临时处理下  首次触发器生成有延迟 提前与加载个 */
    public static async init(count: number = 1) {
        for (let index = 0; index < count; index++) {
            let trigger = await SpawnManager.asyncSpawn({ guid: "113", replicates: false }) as mw.Trigger;
            trigger.setCollision(mw.CollisionStatus.Off);
            this.temporaryTriggerPool.push(trigger)
        }
    }

    // 返回触发器
    public static returnTrigger(trigger: mw.Trigger) {
        if (trigger == null) return;

        // 处理下026之后 触发器不显示线框了
        if (SystemUtil.isPIE || Globaldata.isOpenGm) {
            setTimeout(() => {
                trigger.setCollision(mw.CollisionStatus.Off);
            }, 0);
        } else {
            trigger.setCollision(mw.CollisionStatus.Off);
        }

        trigger.parent = null;
    }

    // 从对象池获取Trigger
    public static async getTemporaryTrigger(replicates: boolean = false) {
        for (let boxTrigger of this.temporaryTriggerPool) {
            if (boxTrigger.getCollision() == mw.CollisionStatus.Off) {
                boxTrigger.setCollision(mw.CollisionStatus.QueryOnly);
                return boxTrigger
            }
        }

        let trigger = await SpawnManager.asyncSpawn({ guid: "113", replicates: replicates }) as mw.Trigger;
        await trigger.asyncReady();
        trigger.setCollision(mw.CollisionStatus.QueryOnly);

        this.temporaryTriggerPool.push(trigger)
        //oTrace(`存储的触发器数量:${this.temporaryTriggerPool.length}`)

        return trigger
    }

    // 注册到全局Trigger内以供查询
    public static setTentativeArea(id: number, area: mw.GameObject) {
        if (this.tentativeGameObjectArray.has(id)) {
            return;
        }
        this.tentativeGameObjectArray.set(id, area)
    }

    public static hasTentativeArea(id: number) {
        return this.tentativeGameObjectArray.has(id);
    }

    // 根据id返回指定触发器
    public static getTentativeAreaByID(id: number): mw.GameObject | undefined {
        return this.tentativeGameObjectArray.get(id)
    }

    // 删除触发器
    public static deleteTentativeArea(id: number) {
        if (this.tentativeGameObjectArray.has(id) == false) {
            return;
        }
        this.tentativeGameObjectArray.delete(id)
    }

    // filterFunction:在测试通过后判断,若返回结果为true则视为测试失败
    // 返回 触发ID,被触发位置
    static async testAllSceneUnit(sheet: MotionFrameNode_SkillRect, target: mw.GameObject | mw.Vector, rot?: mw.Rotation,
        filterFunction?: (sceneUnitID: number) => boolean) {
        let trigger = await this.getTemporaryTrigger();
        if (sheet.rectSocket >= 0) {
            if (target instanceof mw.GameObject) {
                if (sheet.rectSocket > 0 && PlayerManagerExtesion.isCharacter(target)) {
                    target.attachToSlot(trigger, sheet.rectSocket);
                } else {
                    trigger.parent = (target);
                }
            }

            trigger.localTransform.position = (sheet.offsetLoc)
            trigger.localTransform.rotation = (new mw.Rotation(sheet.offsetRot));
        } else {
            trigger.worldTransform.position = target as mw.Vector;
            trigger.worldTransform.rotation = rot;
        }

        if (sheet.type == 0) {
            if (trigger.shape != TriggerShapeType.Box) {
                trigger.shape = TriggerShapeType.Box;
            }
            trigger.worldTransform.scale = sheet.LWH;

        } else {
            if (trigger.shape != TriggerShapeType.Sphere) {
                trigger.shape = TriggerShapeType.Sphere;
            }
            Globaldata.tmpVector.x = sheet.range;
            Globaldata.tmpVector.y = sheet.range;
            Globaldata.tmpVector.z = sheet.range;
            trigger.worldTransform.scale = Globaldata.tmpVector;
        }

        let result: number[];

        // 可破坏交互物
        let destroys = RP_DestroyManager.instance.getCurAreaDestroys();
        if (destroys) {
            for (let index = 0; index < destroys.length; index++) {
                const destroy = destroys[index];
                if (destroy == null) {
                    continue;
                }
                if (trigger.checkInArea(destroy)) {
                    EventManager.instance.call(EModule_Events.hitMeshObj_C, destroy.gameObjectId, Player.localPlayer.playerId);
                }
            }
        }

        // // 检测npc
        // let areaNpcs = ModuleService.getModule(AreaNpcModuleC).getCurAreaNpcs();
        // if (areaNpcs) {
        //     for (let index = 0; index < areaNpcs.length; index++) {

        //         let unit = areaNpcs[index];

        //         if (unit.model == null) continue

        //         const tentativeTrigger = unit.model;
        //         if (tentativeTrigger.getCollision() == mw.CollisionStatus.Off) continue

        //         if (!trigger.checkInArea(tentativeTrigger)) continue

        //         if (filterFunction && filterFunction(unit.sceneId) == true) continue

        //         if (!result) result = []
        //         result.push(unit.sceneId)
        //     }
        // }

        // 检测玩家
        let players = Player.getAllPlayers();

        for (let index = 0; index < players.length; index++) {
            let player = players[index];
            let tentativeTrigger = player.character
            if (player.character == null) continue;
            if (!trigger.checkInArea(tentativeTrigger)) continue;

            if (filterFunction && filterFunction(player.playerId) == true) continue;

            if (!result) result = []
            result.push(player.playerId)
        }


        this.returnTrigger(trigger)
        return result;
    }

    // 返回所有碰撞到的玩家ID
    static async isInAreaInd(sheet: MotionFrameNode_SkillRect, from: mw.Vector, dir: mw.Vector) {
        let trigger = await this.getTemporaryTrigger();

        let forward = dir
        let up = mw.Vector.up
        let right = mw.Vector.cross(forward, up)

        trigger.worldTransform.position = this.local2WorldPos(forward, right, up, from, sheet.offsetLoc)

        trigger.worldTransform.rotation = dir.toRotation()

        if (sheet.type == 0) {
            if (trigger.shape != TriggerShapeType.Box) {
                trigger.shape = TriggerShapeType.Box;
            }
            trigger.worldTransform.scale = sheet.LWH;

        } else {
            if (trigger.shape == TriggerShapeType.Sphere == false) {
                trigger.shape = TriggerShapeType.Sphere;
            }
            Globaldata.tmpVector.x = sheet.range;
            Globaldata.tmpVector.y = sheet.range;
            Globaldata.tmpVector.z = sheet.range;
            trigger.worldTransform.scale = Globaldata.tmpVector;
        }


        // let cube = GameObject.findGameObjectById("22436E27");

        // cube.worldTransform.position = trigger.worldTransform.position;
        // cube.worldTransform.scale = sheet.LWH;
        // cube.worldTransform.rotation = dir.toRotation()

        let result: number[] = []

        if (SystemUtil.isServer()) {
            for (let player of Player.getAllPlayers()) {

                if (trigger.checkInArea(player.character)) {
                    result.push(player.playerId)
                }
            }
        } else {
            let player = Player.localPlayer;
            if (player && trigger.checkInArea(player.character)) {
                result.push(player.playerId)
            }
        }


        this.returnTrigger(trigger)
        return result
    }

    private static local2WorldPos(
        forward: mw.Vector,
        right: mw.Vector,
        up: mw.Vector,
        offset: mw.Vector,
        releativeLoc: mw.Vector): mw.Vector {
        return new mw.Vector(
            releativeLoc.x * forward.x + releativeLoc.y * right.x + releativeLoc.z * up.x + offset.x,
            releativeLoc.x * forward.y + releativeLoc.y * right.y + releativeLoc.z * up.y + offset.y,
            releativeLoc.x * forward.z + releativeLoc.y * right.z + releativeLoc.z * up.z + offset.z,
        )
    }
}