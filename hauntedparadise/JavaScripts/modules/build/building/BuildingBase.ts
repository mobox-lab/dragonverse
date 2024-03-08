import { ObjInterDefine } from "../../../codes/modules/inter/ObjInterDefine";
import { PlayerInterModuleC } from "../../../codes/modules/inter/PlayerInterModule";
import ObjInterScript from "../../../codes/modules/inter/objInter/ObjInterScript";
import { MainUI } from "../../../codes/ui/MainUI";
import { TimerOnly } from "../../../codes/utils/AsyncTool";
import MusicMgr from "../../../codes/utils/MusicMgr";
import { GhostTraceHelper } from "../../../codes/utils/TraceHelper";
import { IBuildingElement } from "../../../config/Building";
import { UtilEx } from "../../../utils/UtilEx";
import { BuildModuleC } from "../BuildModuleC";
import { BuildingHelper } from "../helper/BuildingHelper";
import { BuildingSpawner } from "../spawnTrigger/BuildingSpawnTrigger";
import { BuildingInfo } from "./BuildingInfo";


/**
 * 显示信息的头顶ui
 */
const TOP_UI = "TOP_UI"


/**
 * 建筑基类,其他功能建筑继承这个类,注意自己判断客户端和服务端
 */
export abstract class BuildingBase {
    /**
     * 检测建筑是否准备好
     */
    initCheck = new UtilEx.TimeEx.WaitReady();
    /**
     * 建筑对象
     */
    go: GameObject;
    /**
     * 建筑下的所有子物体,包括建筑本身
     */
    goes: GameObject[] = [];
    /**
     * 建筑信息
     */
    info: BuildingInfo

    /** 配置 */
    cfg: IBuildingElement;

    /** 触发器列表，囊括这个预制件中的所有触发器 */
    private triggerList: Trigger[] = [];

    /**
     * 建筑的缓动动画
     */
    private tween

    /**
     * @virtual 子类继承 显示建筑
     */
    protected abstract onShow();

    /**
     * @virtual 子类继承 隐藏建筑
     */
    protected abstract onHide();

    /**
     * @virtual 子类继承 更新建筑信息
     */
    protected onUpdateInfo(oldInfo: BuildingInfo, newInfo: BuildingInfo) { }

    /**
     * 一般不用
     */
    protected getTriggerList() {
        return this.triggerList;
    }

    /**
     * 进入触发器
     * @param func 
     */
    protected addTriggerEnterFunc(func: (go: GameObject) => void) {
        this.triggerList.forEach(trigger => {
            trigger.onEnter.add(func);
        });
    }

    /**
     * 离开触发器
     * @param func 
     */
    protected addTriggerLeaveFunc(func: (go: GameObject) => void) {
        this.triggerList.forEach(trigger => {
            trigger.onLeave.add(func);
        });
    }

    /**
     * 检测当前建筑的guid是否存在
     * @param guid 
     * @returns 
     */
    checkGuid(guid: string) {
        if (!this.go) return false;
        for (let index = 0; index < this.goes.length; index++) {
            const child = this.goes[index];
            if (child.gameObjectId == guid) {
                return true;
            }
        }
    }

    /**
     * 初始化
     */
    async init(info: BuildingInfo) {
        this.info = info;
        this.cfg = BuildingHelper.getBuildCfgByItemId(this.info.itemId)
        const prefab = SystemUtil.isClient() ? this.cfg.prefabClient : this.cfg.prefabServer;
        this.go = await UtilEx.AssetEx.spawnByPoolAsync(prefab, false, "building");
        await this.go.asyncReady();

        this.go.worldTransform.position = info.pos;
        this.go.worldTransform.rotation = info.rot;

        // 添加按钮响应
        this.goes = [];

        // 能交互的再初始化拾取方法
        this.initGo(this.go, SystemUtil.isClient());

        // 如果是可交互的，绑定一下交互组件
        this.cfg.canInteract && this.bindInterComponent();

        this.onShow();

        this.initCheck.over();
    }

    /** 交互物组件 */
    private objInterComponent: ObjInterScript;

    /** 交互位置所在锚点 */
    private objInterAnchor: GameObject;

    /** 绑定交互组件 */
    public async bindInterComponent() {
        if (SystemUtil.isServer()) return;
        this.objInterAnchor = await GameObject.asyncSpawn("Anchor");
        this.objInterAnchor.parent = this.go;
        this.objInterAnchor.localTransform.position = this.cfg.relativePos;
        this.objInterComponent = await Script.spawnScript(ObjInterScript, false, this.objInterAnchor);
        this.objInterComponent.isSingle = true;
        this.objInterComponent.interactStance = this.cfg.stance;
    }

    /**
     * base回收
     */
    async release() {
        await this.initCheck.ready();
        this.onHide();
        this.highLightBuilding(false);
        this.triggerList.forEach(trigger => {
            trigger.onEnter.clear();
            trigger.onLeave.clear();
        });
        if (TimeUtil.onEnterFrame.includes(this.moveHandle, this)) {
            TimeUtil.onEnterFrame.remove(this.moveHandle, this);
        }

        UtilEx.AssetEx.release(this.go);
        this.cfg = null;
        this.go = null;
        this.goes = [];
        this.triggerList = [];
        if (this.objInterComponent) {
            if (SystemUtil.isClient()) ModuleService.getModule(PlayerInterModuleC).reqStopInter();
            this.objInterComponent.destroy();
            this.objInterComponent = null;
        }
        this.timerOnly.stop();
    }

    async updateInfo(info: BuildingInfo) {
        await this.initCheck.ready();
        const oldInfo = this.info;
        this.info = info;

        // 血量改变
        const hpChange = Math.ceil(info.hp - oldInfo.hp);
        if (hpChange) {
            this.onHpChanged(hpChange);
        }

        // 位置改变
        if (oldInfo.pos.equals(info.pos) == false) {
            this.onMoved();
        }

        this.onUpdateInfo(oldInfo, info);
    }

    initGo(go: GameObject, isClient) {
        this.goes.push(go);

        if (go instanceof Trigger) { this.triggerList.push(go) };

        go.tag = "interObj";
        go["ItemId"] = this.info.itemId;
        go["BuildingUUID"] = this.info.uuid;
        if (isClient) {

            // 静止这个交互UI的显示
            if ((!StringUtil.isEmpty(this.info.ownerId) && this.info.ownerId != Player.localPlayer.userId)) {
                go["banHandUIView"] = true;
            } else {
                go["banHandUIView"] = false;
            }

            go["interBuildFun"] = this.interBuildFunc.bind(this);
            go["interTag"] = this.go.gameObjectId;
            go["highFuncBuilding"] = this.highLightBuilding.bind(this);
            go["longClickInterFunc"] = this.longClickInterFunc.bind(this);
            (go as Model).setCollision(PropertyStatus.On);
        } else {
            (go as Model).setCollision(PropertyStatus.On, true);
        }

        go.getChildren().forEach(e => {
            this.initGo(e, isClient);
        })
    }

    /** 长按效果 */
    private longClickInterFunc() {
        console.log("捡起建筑物", this.info.itemId, this.info.uuid);
        // 只能拾取ownerId是空的或者owner是自己的建筑
        if (StringUtil.isEmpty(this.info.ownerId) || this.info.ownerId === Player.localPlayer.userId) {
            ModuleService.getModule(BuildModuleC).repPick(this);
            GhostTraceHelper.itemTrace(this.info.itemId, 0);
        }
    }

    private async interBuildFunc() {
        if (!this.objInterComponent || !this.objInterAnchor) { return; }

        console.log("交互建筑物", this.info.itemId, this.info.uuid);
        let buildModuleC = ModuleService.getModule(BuildModuleC);
        if (await buildModuleC.checkIllegal(this.info.uuid)) {
            Event.dispatchToLocal("evt_interact", this.objInterAnchor.gameObjectId);
            ModuleService.getModule(PlayerInterModuleC).interBuildingMark = true;
            buildModuleC.reqMarkDirty(this.info.uuid, true);
            buildModuleC.interBuildingUUID = this.info.uuid;
        }
    }

    private highLightBuilding(isHigh: boolean) {

        this.goes.forEach(e => {
            if (e instanceof mw.Model) {
                e.setPostProcessOutline(isHigh, LinearColor.white, 3);
            }
        });
    }

    private beHurtLight(isHigh: boolean) {
        this.goes.forEach(e => {
            if (e instanceof mw.Model) {
                e.setPostProcessOutline(isHigh, LinearColor.red, 3);
            }
        });
    }

    private timerOnly: TimerOnly = new TimerOnly();

    /**
     * 血量改变
     * @param hpChange 
     * @returns 
     */
    private onHpChanged(hpChange: number) {
        if (SystemUtil.isServer()) return;

        this.beHurtLight(true);
        this.timerOnly.setTimeout(() => {
            this.beHurtLight(false);
        }, 3e3);

        if (hpChange > 0) return;
        // 物体抖动
        if (this.tween) this.tween.stop();

        MusicMgr.instance.play(2010, this.go.worldTransform.position);

        this.tween = new Tween(this.info.pos).to(new Vector(10, 0, 0).add(this.info.pos), 0.5)
            .repeat(3)
            .yoyo(true)
            .onUpdate((v) => {
                if (!this.go || !this.go.getVisibility()) {
                    this.tween.stop();
                    return;
                }
                this.go.worldTransform.position = v;
            })
            .onComplete(() => {
                if (!this.go || !this.go.getVisibility() || !this.go.worldTransform) { return; }
                this.go.worldTransform.position = this.info.pos;
            })
            .start();
    }


    /**
     * 位置改变
    */
    private onMoved() {
        if (SystemUtil.isServer()) {
            this.go.worldTransform.position = this.info.pos;
            return;
        }

        if (this.tween) this.tween.stop();
        // 物体移动
        if (false == TimeUtil.onEnterFrame.includes(this.moveHandle, this)) {
            TimeUtil.onEnterFrame.add(this.moveHandle, this);
        }

    }
    private moveHandle(dt) {
        const dis = Vector.distance(this.go.worldTransform.position, this.info.pos);
        if (dis < 2 * BuildingHelper.MoveSpeed * dt) {
            this.go.worldTransform.position = this.info.pos;
            TimeUtil.onEnterFrame.remove(this.moveHandle, this);
            return;
        }
        const dir = this.info.pos.clone().subtract(this.go.worldTransform.position).normalize().multiply(BuildingHelper.MoveSpeed * dt);
        this.go.worldTransform.position = this.go.worldTransform.position.add(dir);

    }

};


/**
 * 没有功能
 */
export class NoFuncBuilding extends BuildingBase {
    protected onShow() {
    }
    protected onHide() {
    }

}


/**
 * 伤害类型
 */
export class DamageBuilding extends BuildingBase {

    /** 伤害帧间隔 毫秒 */
    damageInterTime: number;

    /** 伤害值 */
    damageVal: number;

    protected onShow() {

        this.damageInterTime = Number(this.cfg.dataEx[1]) * 1e3;

        this.damageVal = Number(this.cfg.dataEx[0]);

        if (!this.damageInterTime || !this.damageVal) {
            console.error("DEBUG MyTypeError >>> 配置错误： " + this.cfg.id);
            return;
        }

        if (SystemUtil.isClient()) {
            this.addTriggerEnterFunc((monster: GameObject) => {
                if (monster.tag.includes("Ghost")) {
                    this.triggerDamageInter(monster.gameObjectId);
                }
            });

            this.addTriggerLeaveFunc((monster: GameObject) => {
                if (monster.tag.includes("Ghost")) {
                    this.cancelTriggerDamage(monster.gameObjectId);
                }
            });
        }
    }

    damageInterMap: Map<string, TimerOnly> = new Map();

    /** 触发伤害间隔 */
    private triggerDamageInter(monsterGuid: string) {
        if (this.damageInterMap.has(monsterGuid)) { return; }
        let timerOnly = new TimerOnly();
        this.damageInterMap.set(monsterGuid, timerOnly);
        timerOnly.setInterval(() => {
            Event.dispatchToLocal("HitMonster", monsterGuid, this.damageVal);
        }, this.damageInterTime);
    }

    /** 取消触发 */
    private cancelTriggerDamage(monsterGuid: string) {
        this.damageInterMap.get(monsterGuid).stop();
        this.damageInterMap.delete(monsterGuid);
    }

    protected onHide() {
        this.damageInterMap.forEach((timerOnly) => {
            timerOnly.stop();
        });
        this.damageInterMap.clear();
    }
}


/**
 * 蹦床
 */
export class Trampoline extends BuildingBase {

    lis: EventListener;

    protected onShow() {
        if (SystemUtil.isClient()) {
            this.addTriggerEnterFunc((go: Character) => {
                if (!(go instanceof Character) || go.player != Player.localPlayer) { return; }
                Event.dispatchToServer("TrampolineEvt" + this.go["BuildingUUID"]);
                MusicMgr.instance.play(2008);
            });
        } else {
            this.lis = Event.addClientListener("TrampolineEvt" + this.go["BuildingUUID"], (player: Player) => {
                player.character.addImpulse(new Vector(0, 0, Number(this.cfg.dataEx[0])), true);
            });
        }
    }
    protected onHide() {
        if (this.lis) { this.lis.disconnect(); }
    }
}

export class Fruit extends BuildingBase {
    protected onShow() {
    }
    protected onHide() {
    }

}

/**
 * 建筑生成器
 */
export class Spawner extends BuildingBase {
    private spawner: BuildingSpawner;
    protected onShow() {
        if (SystemUtil.isClient()) return;
        const args = this.cfg.dataEx;
        this.spawner = new BuildingSpawner(+args[0], +args[1], args.slice(2).map(e => +e), this.getTriggerList()[0]);
        this.spawner.show();
    }
    protected onHide() {
        if (SystemUtil.isClient()) return;
        this.spawner?.hide();
    }

}