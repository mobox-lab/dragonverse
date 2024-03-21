/*
 * @Author       : dal
 * @Date         : 2024-01-11 10:06:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-04 11:18:05
 * @FilePath     : \hauntedparadise\JavaScripts\modules\home\component\HomeScript.ts
 * @Description  : 
 */
import HandTriggerCom from "../../../codes/modules/inter/HandTriggerCom";
import {PlayerModuleC} from "../../../codes/modules/player/PlayerModuleC";
import {TimerOnly, WaitLoop} from "../../../codes/utils/AsyncTool";
import {GhostTraceHelper} from "../../../codes/utils/TraceHelper";
import {GameConfig} from "../../../config/GameConfig";
import {HomeModuleC} from "../HomeModuleC";
import {HomeModuleS} from "../HomeModuleS";
import {HomeBaseHud} from "../ui/HomeBaseHud";
import HomeInfoHud from "../ui/HomeInfoHud";
import {BuildModuleS} from "../../build/BuildModuleS";
import Player = mw.Player;

const HomeTrigger = "HomeTrigger";
/**
 * 家园节点脚本
 */
@Component
export default class HomeScript extends Script {

    @Property({group: "Setting", displayName: "家园id"})
    homeId: number = 0;

    @Property({group: "Setting", displayName: "牌子", capture: true})
    homeObjId: string = "";

    @Property({group: "Setting", displayName: "信箱", capture: true})
    mailObjId: string = "";

    @Property({group: "Setting", displayName: "新信息提示", capture: true})
    mailEffId: string = "";

    @Property({group: "Setting", displayName: "出生点", capture: true})
    birthAnchorId: string = "";

    @Property({group: "Setting", displayName: "家园位置锚点", capture: true})
    homeBaseAnchorId: string = "";

    @Property({hideInEditor: true, replicated: true, onChanged: "onPlayerIdChanged"})
    ownerId: string = "";

    @Property({hideInEditor: true, replicated: true, onChanged: "onPlayerAliveDayChange"})
    aliveDay: number = -1;

    private homeTrigger: Trigger;
    private boundMax: Vector;
    private boundMin: Vector;

    async onStart() {
        await this.gameObject.asyncReady();
        console.log("HomeScript start", this.homeId, this.ownerId, this.gameObject.gameObjectId);

        this.homeTrigger = this.gameObject.getChildByName(HomeTrigger) as Trigger;
        this.boundMax = this.homeTrigger.worldTransform.position.clone().add(this.homeTrigger.getBoundingBoxExtent().multiply(0.5));
        this.boundMin = this.homeTrigger.worldTransform.position.clone().add(this.homeTrigger.getBoundingBoxExtent().multiply(-0.5));
        if (SystemUtil.isServer()) {
            this.onStart_Server();
        }
        if (SystemUtil.isClient()) {
            this.onStart_Client();
        }
    }

    /**
     * 检测位置是否在触发器内
     * @param vec
     */
    checkIn(vec: Vector) {
        if (!this.homeTrigger) return false;
        if (vec.x < this.boundMin.x || vec.x > this.boundMax.x) return false;
        if (vec.y < this.boundMin.y || vec.y > this.boundMax.y) return false;
        if (vec.z < this.boundMin.z || vec.z > this.boundMax.z) return false;
        return true;
    }

    async onStart_Server() {
        // 初始化家园
        await ModuleService.ready();
        ModuleService.getModule(HomeModuleS).emptyHomes.push(this);
    }

    private timer: TimerOnly = new TimerOnly();

    public onPlayerAliveDayChange() {
        if (StringUtil.isEmpty(this.ownerId)) {
            return;
        }
        this.timer.setTimeout(() => {
            this.homeInfoUI.text_home_1.text = StringUtil.format(GameConfig.Language.tips_show_10.Value, this.aliveDay);
        }, 1e3);
    }

    /** 房屋信息牌子模型 */
    public homeInfoObj: GameObject;

    /** 房屋信息UI */
    public homeInfoUI: HomeInfoHud;

    private tipsInfoComponent: HandTriggerCom;

    public setHomeInfo(info1) {
        if (!this.homeInfoObj || !this.homeInfoUI) {
            WaitLoop.loop(() => {
                return this.homeInfoObj && this.homeInfoUI;
            }, 100, -1).then(() => {
                this.homeInfoUI.setInfo(info1);
            });
        } else {
            this.homeInfoUI.setInfo(info1);
        }
    }

    /** 给房屋信息牌子绑定世界UI */
    private async bindWorldUI() {
        // 先找到那个牌子
        this.homeInfoObj = GameObject.findGameObjectById(this.homeObjId);
        this.tipsInfoComponent = this.homeInfoObj.getScripts()[0] as HandTriggerCom;
        if (!this.homeInfoObj) {
            return;
        }
        let worldUI = await GameObject.asyncSpawn("UIWidget") as UIWidget;
        worldUI.occlusionEnable = false;
        worldUI.parent = this.homeInfoObj;
        worldUI.localTransform.position = new Vector(0, 0, 10);
        worldUI.localTransform.rotation = new Rotation(90, 90, 0);
        this.homeInfoUI = UIService.create(HomeInfoHud);
        worldUI.setTargetUIWidget(this.homeInfoUI.uiWidgetBase);
    }

    onStart_Client() {
        this.bindWorldUI();
        this.bindMailBox();
        this.onPlayerIdChanged();
    }

    /** 邮箱obj，要在这个上面绑定一个HandTriggerCOm的脚本 */
    private mailBoxObj: GameObject;

    /** 玩家出生点，绑定玩家时，将玩家传送过来 */
    private birthPoint: GameObject;

    /** 有新信件的特效提示 */
    private mailBoxEff: Effect;

    private homeBaseAnchor: GameObject;

    private bindMailBox() {

        this.mailBoxObj = GameObject.findGameObjectById(this.mailObjId) as GameObject;
        this.mailBoxEff = GameObject.findGameObjectById(this.mailEffId) as Effect;
        this.birthPoint = GameObject.findGameObjectById(this.birthAnchorId);
        this.homeBaseAnchor = GameObject.findGameObjectById(this.homeBaseAnchorId);

        this.setMailEffVis(false);
        this.addFunc(this.mailBoxObj);
    }

    /** 自家的提示 */
    // private selfTipsObj: GameObject;

    private async onPlayerIdChanged() {
        await ModuleService.ready();
        ModuleService.getModule(HomeModuleC).setHome(this);
        if (StringUtil.isEmpty(this.ownerId)) {
            // 木牌
            this.tipsInfoComponent.evtDataArr[0].params[0] = GameConfig.Language["hometips_01"].Value;

            // 邮箱
            this.mailBoxObj.tag = "";
            this.setMailEffVis(false);

            this.timer.stop();

            UIService.hide(HomeBaseHud);
        } else {
            // 木牌
            const player = Player.getPlayer(this.ownerId);
            if (!player || !player.character || !player.character.displayName) {
                // WaitLoop.loop(() => { return player.character && player.character.displayName }, 1e2, 5e2).then(() => {
                //     let name = player.character.displayName;
                //     let tipsInfo = StringUtil.format(GameConfig.Language["hometips_02"].Value, name);
                //     /** 显示名字 */
                //     this.setHomeInfo(name);
                //     this.tipsInfoComponent.evtDataArr[0].params[0] = tipsInfo;
                // })
                // 木牌
                this.tipsInfoComponent.evtDataArr[0].params[0] = GameConfig.Language["hometips_01"].Value;

                // 邮箱
                this.mailBoxObj.tag = "";
                this.setMailEffVis(false);

                this.timer.stop();
            } else {
                let name = player.character.displayName;
                let tipsInfo = StringUtil.format(GameConfig.Language["hometips_02"].Value, name);
                /** 显示名字 */
                this.setHomeInfo(name);
                this.tipsInfoComponent.evtDataArr[0].params[0] = tipsInfo;
            }

            // 邮箱
            if (this.isOwner) {
                this.mailBoxObj.tag = "interObj";

                this.teleportToHome(player);
                // 自家的提示
                HomeBaseHud.setTargetLoc(this.homeBaseAnchor);
            }
        }
    }

    public setMailEffVis(vis: boolean) {
        if (!this.mailBoxEff) {
            return;
        }
        this.mailBoxEff.setVisibility(vis ? PropertyStatus.On : PropertyStatus.Off);
    }

    private addFunc(go: mw.GameObject) {
        // 防止重复绑定
        if (!go["interFunc"]) {
            go["interFunc"] = this.interFunc.bind(this);
            go["interTag"] = this.gameObject.gameObjectId;
            go["highFunc"] = this.highLight.bind(this);
        }
    }

    private highLight(isHigh: boolean) {
        (this.mailBoxObj as Model).setPostProcessOutline(isHigh, LinearColor.white, 2);
    }

    private interFunc() {
        Event.dispatchToLocal("ShowMailBox");

        GhostTraceHelper.interTrace(4, 0, this.gameObject.gameObjectId, true);
    }

    private get isOwner() {
        return this.ownerId === Player.localPlayer.userId;
    }

    public teleportToHome(player: Player) {
        if (this.birthPoint) {
            player.character.worldTransform.position = this.birthPoint.worldTransform.position;

            player.character.worldTransform.position = this.birthPoint.worldTransform.position;
            let zRotOff = Vector.subtract(this.mailBoxObj.worldTransform.position, this.birthPoint.worldTransform.position).toRotation().z;
            let birthRot = new Rotation(0, 0, zRotOff);
            player.character.worldTransform.rotation = birthRot;
            if (player === Player.localPlayer) {
                Player.setControllerRotation(birthRot);
            }
            // 改玩家复活后的传送位置
            let playerModuleC = ModuleService.getModule(PlayerModuleC);
            playerModuleC.birthPos = this.birthPoint.worldTransform.position.clone();
            playerModuleC.birthRot = birthRot;
            return true;
        }
        return false;
    }
}