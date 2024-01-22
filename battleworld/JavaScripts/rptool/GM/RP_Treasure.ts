import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { LogManager } from "odin";
import { ClickUIPools } from "../InteractiveObjs/ClickUIs";
import { InteractLogic_C, InteractLogic_S, InteractObject, InteractiveHelper } from "../InteractiveObjs/InteractObject";
import { Easing, Tween } from "../../tool/Tween";
import { util } from "../../tool/Utils";
//import { BagModuleC } from "../../module/BagModule/BagModuleC";
// import { P_AlchemyGet } from "../../module/AlchemyModule/AlchemyUI/P_AlchemyGet";
import { EventManager } from "../../tool/EventManager";
import { EModule_Events } from "../../const/Enum";
import { SoundParam } from "./RP_DestroyManager";
// import { SeasonPassModuleC } from "../../module/SeasonPassModule/SeasonPassModuleC";
import { playCurrentPlayerAnimationAndChangeActionState } from "../../module/PlayerModule/FSM/PlyerState";

/**宝箱 */
@Serializable
class goodInfor {
    @mw.Property({ displayName: "奖励物品id" })
    public id: number = 1001;
    @mw.Property({ displayName: "奖励物品Count" })
    public count: number = 1;
}
@Component
export default class RP_Treasure extends InteractObject {

    @mw.Property({ displayName: "宝箱类型ID", group: "属性" })
    public treasureTypeID: number = 0;
    // @mw.Property({ displayName: "交互距离", group: "属性" })
    // public activeDis: number = 150;//可交互的距离
    // @mw.Property({ displayName: "触发器Guid", group: "属性" })
    // public triggerGuid: string = "";
    // @mw.Property({ displayName: "UI图标", group: "属性" })
    // public icon: string = "110111";//默认是个小手
    @mw.Property({ displayName: "UI图标偏移", group: "属性" })
    public offset: mw.Vector = new mw.Vector(0, 0, 0);
    @mw.Property({ displayName: "冷却时间:单位秒", group: "属性" })
    public cdTime: number = 0;
    @mw.Property({ displayName: "外部条件", group: "属性" })
    public activeCondition: string = "";
    @mw.Property({ displayName: "能否移动", group: "属性" })
    public isCanMove: boolean = true;
    @mw.Property({ displayName: "是否隐藏", group: "属性" })
    public isHide: boolean = true;
    @mw.Property({ displayName: "隐藏延迟", group: "属性" })
    public hideDelayTime: number = 1;

    @mw.Property({ displayName: "资源ID", group: "开宝箱特效" })
    public resGuid: string = "88790";
    @mw.Property({ displayName: "循环次数", group: "开宝箱特效" })
    public loopNum: number = 1;
    @mw.Property({ displayName: "坐标偏移", group: "开宝箱特效" })
    public offset2: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "旋转", group: "开宝箱特效" })
    public rotation: mw.Rotation = mw.Rotation.zero;
    @mw.Property({ displayName: "缩放", group: "开宝箱特效" })
    public scale: mw.Vector = mw.Vector.one;
    @mw.Property({ displayName: "延迟", group: "开宝箱特效" })
    public effDelayTime: number = 0.5;

    @mw.Property({ displayName: "旋转目标值", group: "宝箱动画" })
    public targetRotate: number = -90;
    @mw.Property({ displayName: "旋转目标时间", group: "宝箱动画" })
    public targetRotateTime: number = 1;
    @mw.Property({ displayName: "旋转目标延迟时间", group: "宝箱动画" })
    public targetRotateDelayTime: number = 1;;

    @mw.Property({ displayName: "奖励物品", group: "奖励" })
    public goodInfors: goodInfor[] = [new goodInfor()];
    @mw.Property({ displayName: "奖励金钱", group: "奖励" })
    public money: number = 0;

    @mw.Property({ displayName: "动作ID", group: "动作" })
    public animation: string = "14636";
    @mw.Property({ displayName: "动作速率", group: "动作" })
    public time: number = 2;
    @mw.Property({ displayName: "循环次数", group: "动作" })
    public loop: number = 1;
    @mw.Property({ displayName: "面向偏移", group: "动作" })

    public lookAtOff: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "位置偏移", group: "动作" })
    public locationOff: mw.Vector = mw.Vector.zero;

    @mw.Property({ displayName: "奖励UI延迟", group: "UI" })
    public uiDelayTime: number = 0.5;

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

    @mw.Property({ displayName: "交互UI的Icon的Guid", group: "交互UI" })
    public iconGuid: string = "";
    @mw.Property({ displayName: "UI文本多语言ID", group: "交互UI" })
    public iconTextID: number = 0;
    @mw.Property({ displayName: "UI位置偏移", group: "交互UI" })
    public iconOffset: mw.Vector = mw.Vector.zero;



    protected onStart(): void {
        this.init(RP_Treasure_S, RP_Treasure_C);
    }
}

export class RP_Treasure_C extends InteractLogic_C<RP_Treasure>{

    /**开始时间戳 */
    private mStartTime: number = null;
    private flagIsShow: boolean = false;//交互标记当前是否处于显示状态
    private clickHandle: () => void = null;
    private playerId: number = 0;
    private static yourSelf: mw.Player = null;
    private updateFlag: number = 0;//刷新延迟标记

    private playId: number = null;
    public isOpen = false;
    private lookAtPos: mw.Vector;

    private isOnce: boolean = false;

    private trigger: mw.Trigger = null;
    private isEnter: boolean = false;

    private worldUI: mw.UIWidget = null;

    protected async onStart(): Promise<void> {
        this.mStartTime = null;
        if (RP_Treasure_C.yourSelf == null) {
            Player.asyncGetLocalPlayer().then((player: mw.Player) => {
                RP_Treasure_C.yourSelf = player;
                this.updateFlag = MathUtil.randomInt(0, 100);
                this.useUpdate = true;
                this.playerId = player.playerId;
            });
        } else {
            this.useUpdate = true;
            this.playerId = RP_Treasure_C.yourSelf.playerId;
        }
        if (!AssetUtil.assetLoaded(this.info.soundGuid)) await AssetUtil.asyncDownloadAsset(this.info.soundGuid);
        this.initTrigger();
        this.initWorldUI();
    }

    private async initTrigger() {
        // if (this.info.triggerGuid == "") {
        //     LogManager.instance.logError("宝箱触发器为空 请检查 Guid: " + this.gameObject.guid);
        //     return;
        // }
        let parent = this.gameObject.parent;
        if (parent == null) {
            console.error("RP_Treasure:initTrigger ", this.gameObject.gameObjectId)
            return
        }
        this.trigger = parent.getChildByName("Trigger") as mw.Trigger;
        if (this.trigger == null) {
            LogManager.instance.logError("宝箱触发器查找失败 请检查 Guid: " + this.gameObject.gameObjectId);
            return;
        }
        this.trigger.onEnter.add(this.onTriggerEnter.bind(this));
        this.trigger.onLeave.add(this.onTriggerExit.bind(this));
    }

    private initWorldUI() {
        let parent = this.gameObject.parent;
        if (parent == null) return;
        this.worldUI = parent.getChildByName("WorldUI") as mw.UIWidget;
        if (this.worldUI == null) return;
        this.worldUI.setVisibility(mw.PropertyStatus.Off);
    }

    private onTriggerEnter(obj: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return;
        if (obj != RP_Treasure_C.yourSelf.character) return;
        if (this.isEnter) return
        if (this.isOpen || !InteractiveHelper.playInteractionEnable(RP_Treasure_C.yourSelf)) return;
        this.setActive(true);
        this.isEnter = true;
    }

    private onTriggerExit(obj: mw.GameObject) {
        if (!(PlayerManagerExtesion.isCharacter(obj))) return;
        if (obj != RP_Treasure_C.yourSelf.character) return;
        if (!this.isEnter) return;
        this.setActive(false);
        this.isEnter = false;
    }

    onUpdate(dt: number): void {
        if (++this.updateFlag % 5 != 0) return;
        if (RP_Treasure_C.yourSelf == null) return;

        // let myPos: mw.Vector = RP_Treasure_C.yourSelf.character.worldTransform.position;
        // let pos = this.gameObject.worldTransform.position;
        // let isShow: boolean =
        //     mw.Vector.squaredDistance(myPos, pos) <= Math.pow(this.info.activeDis, 2) &&
        //     InteractiveHelper.playInteractionEnable(RP_Treasure_C.yourSelf) &&
        //     !this.isOpen;
        // let isShow: boolean = this.isEnter && !this.isOpen && InteractiveHelper.playInteractionEnable(RP_Treasure_C.yourSelf);
        // this.setActive(isShow);

        if (this.mStartTime) {
            let t_time = Date.now() - this.mStartTime;
            if (t_time < this.info.cdTime * 1000) {
                // 在cd中
                return;
            }
            // 过了CD
            this.mStartTime = null;
            this.reset()
            //oTrace("cd 重置-------------------")
        }

    }

    //设置是否激活
    private async setActive(value: boolean): Promise<void> {
        if (this.flagIsShow == value) return;
        this.flagIsShow = value;

        //oTrace("设置是否激活xxx", value)
        if (value) {
            if (this.clickHandle == null) {
                this.clickHandle = this.clickBtn.bind(this);
            }
            if (!AssetUtil.assetLoaded(this.info.iconGuid)) await AssetUtil.asyncDownloadAsset(this.info.iconGuid)
            if (this.worldUI == null) {
                ClickUIPools.instance.show(this.info.iconGuid, (this.info.iconTextID == 0 || this.info.iconTextID == null) ? "" : util.getLanguageById(this.info.iconTextID, null), this.gameObject, this.info.offset, this.clickHandle);
            } else {
                this.worldUI.setVisibility(mw.PropertyStatus.On);
                let ui = this.worldUI.getTargetUIWidget();
                if (ui == null) return;
                let btn = ui.findChildByPath("RootCanvas/mBtn_interact") as mw.Button;
                let text = ui.findChildByPath("RootCanvas/mBtn_interact/mText_get") as mw.TextBlock;
                if (btn == null || text == null) return;
                btn.onClicked.clear();
                btn.onClicked.add(this.clickHandle);
                text.text = util.getLanguageById(this.info.iconTextID, null);
            }
        } else {
            if (this.worldUI == null) {
                ClickUIPools.instance.hide(this.gameObject);
            } else {
                this.worldUI.setVisibility(mw.PropertyStatus.Off);
            }
        }
    }

    private isGetReward: boolean = false;

    private async clickBtn() {
        // 领取物品的时候优先关闭交互UI，可能下面逻辑会return掉
        this.setActive(false);

        if (!mw.StringUtil.isEmpty(this.info.activeCondition)
            && !InteractiveHelper.activeConditions(this.info.activeCondition)) {
            return;//外部条件不满足
        }
        if (this.isGetReward) {
            //已经获取过了，不可能再进来了
            ClickUIPools.instance.hide(this.gameObject);
            return
        }
        this.isGetReward = true;

        if (this.info.cdTime > 0) {
            this.mStartTime = Date.now();
        }
        this.interact(this.playerId, true);

        //oTrace("交互成功 tag=" + this.gameObject.tag);
        // ModuleService.getModule(SeasonPassModuleC).dailyOpenBox();
        if (!mw.StringUtil.isEmpty(this.gameObject.tag)) {
            InteractiveHelper.onPandoraAnalytics(this.gameObject.gameObjectId, this.gameObject.tag, true, false);
        }

    }

    protected override onPlayerAction(playerId: number, active: boolean, param: any): void {

        //oTrace("onPlayerAction-------------------", active)

        if (active) {
            EventManager.instance.call(EModule_Events.openBox, this.info.treasureTypeID, 1);
            this.isOpen = true;

            //玩家
            this.lookAtPos = mw.Vector.add(this.gameObject.worldTransform.position, this.info.lookAtOff);
            Player.localPlayer.character.lookAt(this.lookAtPos);
            Player.localPlayer.character.movementEnabled = this.info.isCanMove;
            Player.localPlayer.character.jumpEnabled = this.info.isCanMove;

            //动作
            playCurrentPlayerAnimationAndChangeActionState(this.info.animation, this.info.loop, this.info.time);

            //移动
            setTimeout(() => {
                let rot = new mw.Rotation(0, this.gameObject.worldTransform.rotation.y, this.gameObject.worldTransform.rotation.z);
                new Tween<{ rotx: number }>({ rotx: 0 })
                    .to({ rotx: this.info.targetRotate }, this.info.targetRotateTime * 1000)
                    .onUpdate(arg => {
                        rot.x = arg.rotx;
                        this.gameObject.worldTransform.rotation = rot;
                    })
                    .easing(Easing.Linear.None)
                    .start()
                    .onComplete(() => {
                        if (this.info.isHide) {
                            setTimeout(() => {
                                this.gameObject.setVisibility(mw.PropertyStatus.Off);
                                this.gameObject.parent.setVisibility(mw.PropertyStatus.Off);
                            }, this.info.hideDelayTime * 1000);
                        }
                    })
            }, 1000 * this.info.targetRotateDelayTime);


            //奖励  todo 
            for (let index = 0; index < this.info.goodInfors.length; index++) {
                const element = this.info.goodInfors[index].id;
                const count = this.info.goodInfors[index].count;
                if (element == 0) continue;
                // ModuleService.getModule(BagModuleC).addItem(element, count)
                //oTrace("add===================================", element, count)

                if (index == 0) {
                    setTimeout(() => {
                        // let ui = mw.UIService.getUI(P_AlchemyGet)
                        // mw.UIService.showUI(ui, ui.layer, element, () => {

                        // });
                    }, this.info.uiDelayTime * 1000);
                }
            }

            if (this.info.money > 0) {
                EventManager.instance.call(EModule_Events.add_money, this.info.money);
            }
            let player = Player.getPlayer(playerId);
            SoundService.play3DSound(this.info.soundGuid, player.character.worldTransform.position.clone().add(this.info.soundOffset), this.info.soundPlayTimes, this.info.soundVolume, this.info.soundParam)

            //特效
            setTimeout(() => {
                if (this.playId) {
                    EffectService.stop(this.playId);
                    this.playId = null;
                }

                let resGuid: string = param != null ? param : this.info.resGuid;
                if (mw.StringUtil.isEmpty(resGuid)) return;
                if (this.info.loopNum == 0 && this.playId != null) return;
                this.playId = GeneralManager.rpcPlayEffectOnGameObject(resGuid,
                    this.gameObject.parent, this.info.loopNum, this.info.offset2, this.info.rotation, this.info.scale);
            }, this.info.effDelayTime * 1000);


        } else {

        }
    }

    private reset(): void {
        this.isOpen = false;
        this.isGetReward = false;
        this.gameObject.worldTransform.rotation = new mw.Rotation(0, this.gameObject.worldTransform.rotation.y, this.gameObject.worldTransform.rotation.z);
        if (this.playId) {
            EffectService.stop(this.playId);
            this.playId = null;
        }
        if (this.info.isHide) {
            this.gameObject.setVisibility(mw.PropertyStatus.On);
            this.gameObject.parent.setVisibility(mw.PropertyStatus.On);
        }
    }

}

export class RP_Treasure_S extends InteractLogic_S<RP_Treasure>{
    protected onStart(): void {

    }
    private net_interactNext(playerId: number, active: boolean, param: any): void {
        this.interactNext(playerId, active, param);
    }


    protected override onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
}

