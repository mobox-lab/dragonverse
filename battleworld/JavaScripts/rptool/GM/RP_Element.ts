import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager, SpawnInfo, } from '../../Modified027Editor/ModifiedSpawn';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { oTrace, oTraceError } from "odin";
import { InteractLogic_C, InteractLogic_S, InteractObject } from "../InteractiveObjs/InteractObject";
//import { BagModuleC } from "../../module/BagModule/BagModuleC";
import { AreaModuleC } from "../../module/AreaModule/AreaModuleC";
import { EventManager } from "../../tool/EventManager";
import { EModule_Events } from "../../const/Enum";
import { SoundParam } from "./RP_DestroyManager";





/**元素*/
@Serializable
class goodInfor {
    @mw.Property({ displayName: "奖励物品id" })
    public id: number = 1001;
    @mw.Property({ displayName: "奖励物品Count" })
    public count: number = 1;
}
@Component
export default class RP_Element extends InteractObject {

    @mw.Property({ displayName: "区域id", group: "属性" })
    public areaID: number = 1;
    @mw.Property({ displayName: "冷却时间:单位秒 (负数只一次)", group: "属性" })
    public cdTime: number = -1;

    @mw.Property({ displayName: "资源ID", group: "碰撞特效" })
    public c_resGuid: string = "151740";
    @mw.Property({ displayName: "循环次数", group: "碰撞特效" })
    public c_loopNum: number = 1;
    @mw.Property({ displayName: "坐标偏移", group: "碰撞特效" })
    public c_offset: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "旋转", group: "碰撞特效" })
    public c_rotation: mw.Rotation = mw.Rotation.zero;
    @mw.Property({ displayName: "缩放", group: "碰撞特效" })
    public c_scale: mw.Vector = mw.Vector.one;


    @mw.Property({ displayName: "奖励物品", group: "奖励" })
    public goodInfors: goodInfor[] = [new goodInfor()];
    @mw.Property({ displayName: "奖励金钱", group: "奖励" })
    public money: number = 0;


    @mw.Property({ displayName: "旋转时间", group: "旋转" })
    public f_time: number = 99999;
    @mw.Property({ displayName: "旋转速度X,Y,Z", group: "旋转" })
    public f_speed: mw.Vector = new mw.Vector(0, 0, 50);
    @mw.Property({ displayName: "是否开启", group: "旋转" })
    public f_use: boolean = false;

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
        this.init(RP_Element_S, RP_Element_C);
    }
}

export class RP_Element_C extends InteractLogic_C<RP_Element>{

    private mStartTime: number = null;
    private updateFlag: number = 0;//刷新延迟标记
    private static yourSelf: mw.Player = null;

    /**触发特效*/
    private c_playId: number = 0;
    /**子物体、*/
    private childOjb: mw.GameObject = null;
    /**是否只一次*/
    private isOnce: boolean = false;
    /**运动器*/
    private integratedMover: mw.IntegratedMover = null;

    private mArea: AreaModuleC = null;

    protected async onStart(): Promise<void> {
        if (RP_Element_C.yourSelf == null) {
            Player.asyncGetLocalPlayer().then((player: mw.Player) => {
                RP_Element_C.yourSelf = player;
                this.updateFlag = MathUtil.randomInt(0, 100);
            });
        } else {

        }

        let trigger: mw.Trigger = null;
        if (this.gameObject instanceof mw.Trigger) {
            trigger = this.gameObject as mw.Trigger;
        } else {
            oTraceError("SP_Trigger_Server->OnStart: GameObject is not Trigger!");
        }

        trigger.onEnter.add(this.listen_enter.bind(this));
        trigger.onLeave.add(this.listen_leave.bind(this));

        // this.childOjb = this.gameObject.getChildren()[0];
        //oTrace("RP_Element_c_____ this.childOjb__________________________", this.childOjb, this.gameObject.guid)
        if (!AssetUtil.assetLoaded(this.info.soundGuid)) await AssetUtil.asyncDownloadAsset(this.info.soundGuid);

        // event事件耗时比较多
        EventManager.instance.add(EModule_Events.area_changeArea, this.onAreaChanged.bind(this));

        // if (this.childOjb == null) {
        //     this.childOjb = this.gameObject.getChildren()[0];
        // }

        // this.resetElement();
        // this.useUpdate = true;
    }

    private onAreaChanged(preAreaID: number, curAreaID: number) {
        //oTrace("RP_Element_c_____onAreaChanged___________________________", preAreaID, curAreaID, this.info.areaID)

        if (this.childOjb == null) {
            this.childOjb = this.gameObject.getChildren()[0];
        }

        if (curAreaID == this.info.areaID) {
            //进入区域
            this.useUpdate = true;
            this.resetElement();
            return;
        }

        if (preAreaID == this.info.areaID) {
            //离开区域
            this.useUpdate = false;
            this.hideElement();
            return;
        }
    }

    /**获取当前玩家区域id */
    public getAreaId() {
        if (this.mArea == null) {
            this.mArea = ModuleService.getModule(AreaModuleC);
        }
        return this.mArea.curAreaId;
    }

    onUpdate(dt: number): void {
        if (++this.updateFlag % 5 != 0) return;
        if (RP_Element_C.yourSelf == null) return;
        if (this.mStartTime) {
            let t_time = Date.now() - this.mStartTime;
            if (t_time < this.info.cdTime * 1000) {
                // 在cd中
                return;
            }
            // 过了CD
            if (this.info.areaID == this.getAreaId()) {
                this.resetElement();
                oTrace("cd 重置-------------------", this.info.areaID)
            }
        }

    }
    private listen_enter(go: mw.GameObject): void {

        if ((PlayerManagerExtesion.isCharacter(go)) == false) {
            return;
        }
        let curPlayer = Player.localPlayer;
        if (curPlayer == null) {
            return;
        }

        if (go != curPlayer.character) {
            return;
        }

        if ((PlayerManagerExtesion.isCharacter(go))) {
            this.interact(curPlayer.playerId, true, null);
        }

    }

    private listen_leave(go: mw.GameObject): void {

        if ((PlayerManagerExtesion.isCharacter(go)) == false) {
            return;
        }

        let curPlayer = Player.localPlayer;
        if (curPlayer == null) {
            return;
        }

        if (go != curPlayer.character) {
            return;
        }

        if ((PlayerManagerExtesion.isCharacter(go))) {
            this.interact(curPlayer.playerId, false, null);
        }

    }

    protected override onPlayerAction(playerId: number, active: boolean, param: any): void {

        oTrace("RP_Element_c onPlayerAction", active)

        if (this.info.cdTime > 0 && this.mStartTime != null) {
            oTrace("RP_Element_c cd", active)
            return;
        }
        if (this.info.cdTime > 0) {
            this.mStartTime = Date.now();
        }

        if (this.isOnce) {
            return
        }
        if (this.info.cdTime < 0) {
            this.isOnce = true;
        }

        if (active) {
            this.triggerElement(playerId)
            this.hideElement();

        } else {

        }
    }

    //重置元素
    private async resetElement() {
        //初始特效子物体
        this.mStartTime = null;
        if (this.childOjb instanceof mw.Effect) {
            (this.childOjb as mw.Effect).play();
        } else {
            this.childOjb.setVisibility(mw.PropertyStatus.On, true);
            this.childOjb.setCollision(mw.PropertyStatus.Off, true);
        }

        //运动器
        if (this.info.f_use) {
            this.integratedMover = await SpawnManager.modifyPoolAsyncSpawn("PhysicsSports", mwext.GameObjPoolSourceType.Asset) as mw.IntegratedMover;
            oTrace("运动器____________________", this.integratedMover)
            if (this.integratedMover) {
                this.integratedMover.enable = true;
                this.integratedMover.rotationSpeed = this.info.f_speed; //new mw.Vector(0,0,MathUtil.randomInt(50,400)) 
                this.integratedMover.rotationRepeat = true;
                this.integratedMover.rotationRepeatTime = this.info.f_time //99999; 
                this.integratedMover.parent = this.childOjb ? this.childOjb : this.gameObject;
            }
        }

    }

    //隐藏元素
    private hideElement() {
        if (!this.childOjb) {
            this.childOjb = this.gameObject.getChildren()[0];
        }
        //特效 容错处理
        if (this.childOjb) {
            if (this.childOjb instanceof mw.Effect) {
                (this.childOjb as mw.Effect).forceStop();
            } else {
                this.childOjb.setVisibility(mw.PropertyStatus.Off, true);
                this.childOjb.setCollision(mw.PropertyStatus.Off, true);
            }
        }

        if (this.integratedMover) {
            this.integratedMover.parent = null;
            this.integratedMover.enable = false;
            this.integratedMover.rotationSpeed = mw.Vector.zero;
            this.integratedMover.rotationRepeat = false;
            this.integratedMover.rotationRepeatTime = 0;
            mwext.GameObjPool.despawn(this.integratedMover)
            this.integratedMover = null;
        }
    }

    //触发元素
    private triggerElement(playerId: number) {
        let player = Player.getPlayer(playerId);
        SoundService.play3DSound(this.info.soundGuid, player.character.worldTransform.position.clone().add(this.info.soundOffset), this.info.soundPlayTimes, this.info.soundVolume, this.info.soundParam)
        //奖励 
        // for (let index = 0; index < this.info.goodInfors.length; index++) {
        //     const element = this.info.goodInfors[index].id;
        //     const count = this.info.goodInfors[index].count;
        //     ModuleService.getModule(BagModuleC).addItem(element, count)
        //     oTrace("add===================================", playerId, element, count)
        // }

        if (this.info.money > 0) {
            EventManager.instance.call(EModule_Events.add_money, this.info.money);
        }

        if (this.c_playId) {
            EffectService.stop(this.c_playId);
            this.c_playId = null;
        }
        this.c_playId = GeneralManager.rpcPlayEffectOnGameObject(
            this.info.c_resGuid, this.gameObject, this.info.c_loopNum,
            this.info.c_offset, this.info.c_rotation, this.info.c_scale);
        EventManager.instance.call(EModule_Events.getStar);
    }

}

export class RP_Element_S extends InteractLogic_S<RP_Element>{
    protected onStart(): void {

    }
    private net_interactNext(playerId: number, active: boolean, param: any): void {
        this.interactNext(playerId, active, param);
    }


    protected override onPlayerAction(playerId: number, active: boolean, param: any): void {
        oTrace("RP_Element_S onPlayerAction", active)
    }
}

