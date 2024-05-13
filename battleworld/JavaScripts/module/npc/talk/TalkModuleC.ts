import { PlayerManagerExtesion } from "../../../Modified027Editor/ModifiedPlayer";
import { GameConfig } from "../../../config/GameConfig";
import { INpcDialogElement } from "../../../config/NpcDialog";
import { ITabTalkElement } from "../../../config/TabTalk";
import { EModule_Events } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import { ClickUIPools } from "../../../rptool/InteractiveObjs/ClickUIs";
import { EventManager } from "../../../tool/EventManager";
import { checkTriggerGo } from "../../../tool/Utils";
import { PlayerModuleC } from "../../PlayerModule/PlayerModuleC";
import { TalkModuleS } from "./TalkModuleS";
import { P_Game_Talk } from "./ui/P_Game_Talk";


export class TalkModuleC extends ModuleC<TalkModuleS, null> {

    // 对话UI
    private talkUI: P_Game_Talk = null;
    // 玩家模块
    private playerModulec: PlayerModuleC = null;
    // NPC动作存储
    private npcAnimation: Map<string, mw.Animation> = new Map();
    // 存储对象
    // private npcMap: Map<TalkNpcType, mw.GameObject> = new Map();

    protected onEnterScene(sceneType: number): void {
        this.init();
        this.registerEvents();
        this.bindAllTalkNpc();
    }

    /**
     * 初始化
     */
    private init() {
        this.talkUI = mw.UIService.getUI(P_Game_Talk);
        this.playerModulec = ModuleService.getModule(PlayerModuleC);
    }

    /**
     * 注册事件
     */
    private registerEvents(): void {
        // EventManager.instance.add(EModule_Events.talkStudySaveData, this.talkStudy, this);
        EventManager.instance.add(EModule_Events.ui_hideTalk, this.onHideTalk, this);
        // EventManager.instance.add(EModule_Events.talkReward, this.talkReward, this);
    }

    /**
     * 绑定所有对话用NPC
     */
    private async bindAllTalkNpc() {
        let all = GameConfig.NpcDialog.getAllElement();
        for (let i = all.length - 1; i >= 0; i--) {
            let ele = all[i];
            if (StringUtil.isEmpty(ele.NpcGuid) || StringUtil.isEmpty(ele.TriggerGuid)) continue;
            let obj = GameObject.findGameObjectById(ele.NpcGuid);
            let trigger = GameObject.findGameObjectById(ele.TriggerGuid) as mw.Trigger;
            if (obj == null || trigger == null) {
                console.error("对话NPC绑定失败", ele.NpcGuid, ele.TriggerGuid);
                continue;
            }

            if (obj instanceof mw.Character) {
                if (!StringUtil.isEmpty(ele.animationGuid)) {
                    if (AssetUtil.assetLoaded(ele.animationGuid) == false) await AssetUtil.asyncDownloadAsset(ele.animationGuid);
                    let ani = PlayerManagerExtesion.loadAnimationExtesion(obj, ele.animationGuid, false)
                    ani.loop = ele.loop;
                    ani.speed = ele.rate;
                    ani.play();
                    ani.stop();
                    // 为了解决第一次播放动画可能不出来的问题, 单端无rpc消耗
                    TimeUtil.delaySecond(1).then(() => { ani.play(); });
                    this.npcAnimation.set(ele.NpcGuid, ani);
                }
                if (StringUtil.isEmpty(ele.name)) ele.name = "";
                obj.displayName = ele.name;
                // ts报错兼容
                await obj.asyncReady();
                // 关闭npc复杂移动
                obj.complexMovementEnabled = false;
            }
            // this.npcMap.set(all[i].type, obj);
            trigger.onEnter.add(this.onEnterTrigger.bind(this, ele, obj));
            trigger.onLeave.add(this.onLeaveTrigger.bind(this, obj));
        }
    }

    /**
     * 进入触发器
     */
    private onEnterTrigger(ele: INpcDialogElement, obj: mw.GameObject, go: mw.GameObject) {
        if (!checkTriggerGo(go)) {
            return;
        }
        if (ele.talkOffset == null) ele.talkOffset = mw.Vector.zero;
        ClickUIPools.instance.show(Globaldata.talkUIGuid, ele.btntext, obj, ele.talkOffset, () => {
            ClickUIPools.instance.hide(obj);
            // EventManager.instance.call(EModule_Events.ui_openMainView, false);
            this.talkUI.setData(ele);
            // this.setMoneyVisible(ele.moneyType);
            mw.UIService.showUI(this.talkUI);
            if (this.npcAnimation.has(ele.NpcGuid)) {
                this.npcAnimation.get(ele.NpcGuid).stop();
            }
            EventManager.instance.call(EModule_Events.talkToNpc, ele.NpcGuid, ele.type);
        });
    }

    /**
     * 离开触发器
     */
    private onLeaveTrigger(obj: mw.GameObject, go: mw.GameObject) {
        if (!checkTriggerGo(go)) {
            return;
        }
        ClickUIPools.instance.hide(obj);
    }

    /**
     * 设置对话UI的金币显示
     */
    // private setMoneyVisible(moneyType: EMoneyType) {
    //     let value: number = 0;
    //     if (moneyType == EMoneyType.Medal) {
    //         value = DataCenterC.getData(ArenasModuleData)?.medal;
    //     } else if (moneyType == EMoneyType.StarStone) {
    //         value = this.playerModulec.getAttr(Attribute.EnumAttributeType.money);
    //     } else if (moneyType == EMoneyType.GoldMedal) {
    //         value = DataCenterC.getData(ArenasWorld2Data)?.goldMedal;
    //     }
    //     this.talkUI.setMoneyCanvas(moneyType, value);
    // }

    /**
     * 对话解锁
     */
    // private talkStudy(type: TalkDataEnum, money: number, moneyType: EMoneyType) {
    //     this.server.net_talkBuySaveData(type, money, moneyType);
    // }

    /**
     * 对话奖励
     */
    // private talkReward(type: TabType, moneyType: EMoneyType, require: number, reward: number) {
    //     this.server.net_talkReward(type, moneyType, require, reward);
    // }

    /**
     * 隐藏对话
     */
    private onHideTalk(npcId: number, config: ITabTalkElement) {
        let ele = GameConfig.NpcDialog.getElement(npcId);
        if (ele == null) {
            return;
        }
        let ani = this.npcAnimation.get(ele.NpcGuid);
        if (ani == null) {
            return;
        }
        ani.play();
    }

    /**
     * 获取对话的对象
     */
    // public getTalkObj(type: TalkNpcType): mw.GameObject {
    //     if (this.npcMap.has(type) == false) {
    //         return null;
    //     }
    //     return this.npcMap.get(type);
    // }
}