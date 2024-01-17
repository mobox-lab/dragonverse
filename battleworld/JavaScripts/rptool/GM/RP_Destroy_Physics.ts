import { PlayerManagerExtesion } from "../../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../../config/GameConfig";
import { EModule_Events, EModule_Events_S } from "../../const/Enum";
import { PlayerModuleS } from "../../module/PlayerModule/PlayerModuleS";
import { Attribute } from "../../module/PlayerModule/sub_attribute/AttributeValueObject";
//import { BagModuleS } from "../../module/BagModule/BagModuleS";
import { EventManager } from "../../tool/EventManager";
import { InteractObject, InteractLogic_C, InteractLogic_S } from "../InteractiveObjs/InteractObject";
import { SoundParam, RP_DestroyManager } from "./RP_DestroyManager";


@Serializable
class goodInfor {
    @mw.Property({ displayName: "奖励物品id" })
    public id: number = 0;
    @mw.Property({ displayName: "奖励物品Count" })
    public count: number = 0;
}
const meshObjEventName: string = "clientToServer";
@Component
export default class RP_Destroy_Physics extends InteractObject {

    @mw.Property({ displayName: "物理碰撞体Guid", group: "属性" })
    public physicsGuid: string = "";
    @mw.Property({ displayName: "伤害触发器Guid", group: "属性", capture: true })
    public damageTriggerGuid: string = "";
    @mw.Property({ displayName: "伤害", group: "属性" })
    public damage: number = 50;
    @mw.Property({ displayName: "隐藏时间", group: "属性" })
    public hideTime: number = 1;
    @mw.Property({ displayName: "恢复时间", group: "属性" })
    public recoveryTime: number = 1;
    @mw.Property({ displayName: "冲量加成", group: "属性" })
    public impulse: number = 10;

    @mw.Property({ displayName: "奖励", group: "奖励" })
    public goodInfors: goodInfor[] = [new goodInfor()];
    @mw.Property({ displayName: "奖励金钱", group: "奖励" })
    public money: number = 0;

    @mw.Property({ displayName: "音效Guid", group: "3D音效" })
    public soundGuid: string = "";
    @mw.Property({ displayName: "音效位置偏移", group: "3D音效" })
    public soundOffset: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "音效音量", group: "3D音效" })
    public soundVolume: number = 1;
    @mw.Property({ displayName: "播放次数", group: "3D音效" })
    public soundPlayTimes: number = 1;
    @mw.Property({ displayName: "播放参数", group: "3D音效" })
    public soundParam: SoundParam = new SoundParam();

    protected onStart(): void {
        this.init(RP_Destroy_Physics_S, RP_Destroy_Physics_C);
    }
}

export class RP_Destroy_Physics_C extends InteractLogic_C<RP_Destroy_Physics>{

    private curAreaID: number = null;
    private meshObj: mw.Model = null;
    protected async onStart() {
        this.meshObj = await GameObject.asyncFindGameObjectById(this.info.physicsGuid) as mw.Model;
        EventManager.instance.add(EModule_Events.hitMeshObj_C, this.onHitMeshObj.bind(this));
        this.checkAreaId();
    }

    private checkAreaId(): void {
        let areaConfig = GameConfig.Area.getAllElement();
        for (let index = 0; index < areaConfig.length; index++) {
            if (this.curAreaID) continue;
            const element = areaConfig[index];
            // if (!element.centerPos || !element.areaRange) continue;
            // let dis = mw.Vector.squaredDistance(this.gameObject.worldTransform.position, element.centerPos);
            // if (dis < Math.pow(element.areaRange, 2)) {
            //     this.curAreaID = element.id;
            // }
        }
        if (this.curAreaID == null) this.curAreaID = -1;//如果没有找到区域id，就默认为虚空
        RP_DestroyManager.instance.save(this.curAreaID, this.meshObj);
    }

    private onHitMeshObj(guid: string, playerID: number, force: mw.Vector) {
        // this.callServerFun("net_OnPlayerHit", playerID, guid, force);
        if (guid != this.info.physicsGuid) return;
        Event.dispatchToServer(meshObjEventName, playerID, guid, force);
    }
}

export class RP_Destroy_Physics_S extends InteractLogic_S<RP_Destroy_Physics>{

    private meshObj: mw.Model = null;

    private bornLoc: mw.Vector = null;
    private bornRot: mw.Rotation = null;

    private timer: number = 0;
    private isFly: boolean = false;

    /** 伤害触发器，在物体高速运动过程命中玩家，会造成伤害 */
    private damageTrigger: Trigger = null;
    /** 上一帧的位置 */
    private lastPosition: Vector = Vector.zero;
    /** 当前帧的位置 */
    private curPosition: Vector = Vector.zero;
    /** 方向，向量的模就是帧速度，用此来判断是否是在高速运动的过程中打中了人 */
    private curDirection: Vector = Vector.zero;
    /** 暂时安全的玩家，避免二次伤害 */
    private safePlayer: Set<number> = new Set();
    /** 是否已经达到过最低速度 */
    private hasLowSpeed: boolean = false;
    /** 依附的地块 */
    private parent: GameObject = null;
    /** 玩家模块 */
    private playerModule: PlayerModuleS = null;

    protected onPlayerAction(playerId: number, active: boolean, param: any): void {
        throw new Error("Method not implemented.");
    }

    protected async onStart(): Promise<void> {
        this.playerModule = ModuleService.getModule(PlayerModuleS);
        if (this.info.physicsGuid == null || this.info.physicsGuid == "") {
            console.error(" 当前可破坏物的Guid有问题 挂载物体Guid为：" + this.gameObject.gameObjectId);
            return;
        }
        this.meshObj = await GameObject.asyncFindGameObjectById(this.info.physicsGuid) as mw.Model;
        this.bornRot = this.meshObj.worldTransform.rotation;

        if (!AssetUtil.assetLoaded(this.info.soundGuid)) await AssetUtil.asyncDownloadAsset(this.info.soundGuid);

        //初始化伤害触发器
        if (this.damageTrigger == null) {
            this.damageTrigger = await GameObject.asyncFindGameObjectById(this.info.damageTriggerGuid) as mw.Trigger;
            if (this.damageTrigger) {
                this.damageTrigger.onEnter.clear();
                this.damageTrigger.onEnter.add(this.onTriggerEnter.bind(this));
            }
        }


        // EventManager.instance.add(EModule_Events_S.hitMeshObj_S, this.onPlayerHit.bind(this));
        Event.addClientListener(meshObjEventName, this.clientCallPlayerHit.bind(this))
    }

    public async onUpdate(dt: number): Promise<void> {
        this.calculateDirection(dt);
        if (this.isFly && this.curDirection.magnitude <= 0.01) {
            //避免在物体恢复期间，玩家推动时造成了伤害
            this.hasLowSpeed = true;
        }
        if (!this.isFly) return;
        this.timer += dt;
        if (this.timer > this.info.hideTime && this.meshObj.getVisibility()) {
            this.changeMeshObjState(false);
            // this.meshObj.physicsEnabled = false;
        }
        if (this.timer > this.info.recoveryTime) {
            //恢复在原来的状态
            this.meshObj.worldTransform.position = this.bornLoc;
            this.meshObj.worldTransform.rotation = this.bornRot;
            this.changeMeshObjState(true);
            this.meshObj.physicsEnabled = false;
            this.isFly = false;
            this.timer = 0;
            setTimeout(() => {
                this.hasLowSpeed = false;
            }, 50);
        }

    }

    /**
     * 计算飞行过程的方向，方向的模就是帧速度
     * @param dt 帧间隔
     */
    private calculateDirection(dt: number): void {
        this.curPosition.x = this.meshObj.worldTransform.position.x;
        this.curPosition.y = this.meshObj.worldTransform.position.y;
        this.curPosition.z = this.meshObj.worldTransform.position.z;
        //计算速度
        if (this.lastPosition.x != 0 && this.lastPosition.y != 0 && this.lastPosition.z != 0) {
            Vector.subtract(this.curPosition, this.lastPosition, this.curDirection);
        }
        if (this.damageTrigger) {
            this.damageTrigger.enabled = this.curDirection.magnitude > 0.01 && !this.hasLowSpeed;
        }
        this.lastPosition.x = this.curPosition.x;
        this.lastPosition.y = this.curPosition.y;
        this.lastPosition.z = this.curPosition.z;
    }

    private clientCallPlayerHit(player: mw.Player, playerID: number, guid: string, force: mw.Vector) {
        this.onPlayerHit(guid, playerID, force);
    }

    /**
     * 玩家攻击物体并击飞物体
     * @param guid 物体的Guid
     * @param playerID 攻击者的ID
     * @param force 冲量（如果为null，则选择用玩家方向计算）
     */
    private async onPlayerHit(guid: string, playerID: number, force: mw.Vector) {
        if (!this.info || guid != this.info.physicsGuid || this.isFly) return;

        this.meshObj.physicsEnabled = true;
        let player = Player.getPlayer(playerID);
        if (player == null) {
            return;
        }
        this.safePlayer.add(playerID);
        setTimeout(() => this.safePlayer.delete(playerID), 500);

        if (force == null) {
            force = player.character.worldTransform.getForwardVector();
        }

        const uForce = new UE.Vector();
        uForce.X = force.x * this.info.impulse;
        uForce.Y = force.y * this.info.impulse;
        uForce.Z = force.z * this.info.impulse;

        let loc = player.character.worldTransform.position.clone().add(this.info.soundOffset);
        await TimeUtil.delaySecond(0.01);

        this.meshObj["privateActor"].GetStaticMeshComponent().AddImpulse(uForce, "None", true);
        SoundService.play3DSound(this.info.soundGuid, loc, this.info.soundPlayTimes, this.info.soundVolume, this.info.soundParam)

        this.timer = 0;
        this.isFly = true;

        // for (let index = 0; index < this.info.goodInfors.length; index++) {
        //     const element = this.info.goodInfors[index].id;
        //     const count = this.info.goodInfors[index].count;
        //     if (element == 0 || count == 0) continue;
        //     ModuleService.getModule(BagModuleS).addItem(playerID, element, count)
        // }

        if (this.info.money > 0) {
            EventManager.instance.call(EModule_Events_S.add_Money_S, playerID, this.info.money);
        }
    }

    private changeMeshObjState(is: boolean) {
        this.meshObj.setVisibility(is ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
        this.meshObj.setCollision(is ? mw.CollisionStatus.On : mw.CollisionStatus.Off);
    }

    /**
     * 伤害触发器命中物体
     * @param obj GameObject
     */
    private onTriggerEnter(obj: mw.GameObject): void {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return;
        const character = obj as Character;
        if (this.curDirection.magnitude <= 0.01 || this.safePlayer.has(character.player.playerId)) return;
        this.onHitCharacter(character);
    }

    /**
     * 在高速移动的过程中打中玩家
     * @param victim 被击中的玩家
     */
    protected onHitCharacter(victim: Character) {
        if (!this.playerModule) {
            this.playerModule = ModuleService.getModule(PlayerModuleS);
        }
        if (victim) {
            this.playerModule.reducePlayerAttr(victim.player.playerId, Attribute.EnumAttributeType.hp, this.info.damage);
            let playerId = victim.player.playerId;
            this.safePlayer.add(playerId);
            setTimeout(() => {
                this.safePlayer.delete(playerId);
            }, 500);
        }
    }

    /**
     * 用地块初始化破坏物
     * @param landParcel 地块GameObject
     */
    public reset(landParcel: GameObject): void {
        this.parent = landParcel;
        this.useUpdate = true;
        const model = landParcel as Model;
        this.bornLoc = landParcel.worldTransform.position.clone().add(new Vector(0, 0, model.getBoundingBoxExtent().z));
        this.meshObj.worldTransform.position = this.bornLoc;
        this.changeMeshObjState(true);
    }

    /**
     * 回收
     */
    public recycle(): void {
        this.parent = null;
        this.useUpdate = false;
        this.safePlayer.clear();
        this.changeMeshObjState(false);
        this.curDirection.x = this.curDirection.y = this.curDirection.z = 0;
        this.timer = 0;
        this.isFly = false;
        this.hasLowSpeed = false;
    }
}