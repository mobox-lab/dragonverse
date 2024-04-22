import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { stringToNumberArr, utils } from "../../util/uitls";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { P_HudPet2 } from "../Hud/P_HudPet2";
import { TipsManager } from "../Hud/P_TipUI";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { BuffModuleC } from "../buff/BuffModuleC";
import { OnlineModuleData } from "./OnlineModuleData";
import { OnlineMoudleS } from "./OnlineModuleS";
import { P_HudPetGift } from "./P_HudPetGift";
import { P_RewardPanel, RewardState } from "./P_RewardPanel";



export class OnlineMoudleC extends ModuleC<OnlineMoudleS, OnlineModuleData>{

    private onlineUI: P_HudPetGift;
    private rewardPanel: P_RewardPanel;


    protected onStart(): void {
        this.onlineUI = mw.UIService.getUI(P_HudPetGift)
        this.rewardPanel = mw.UIService.create(P_RewardPanel);
        this.initEvents();
    }

    private initEvents() {
        this.data.onlineDayAC.add(this.onOnlineDayChange, this);
        this.data.onHasGetAC.add(() => {
            this.rewardPanel.setRewardState(this.data.HasGetArr.length)
        })
        this.rewardPanel.onRewardBtnAC.add((id: number) => {
            this.stateChange(id, RewardState.rewarded);
        })
        this.rewardPanel.mBtn_Close.onClicked.add(() => { //检查显示 可领取
            this.rewardPanel.hide();
            this.checkCanGet();
        })
        this.onlineUI.onBtnAC.add(() => {
            this.rewardPanel.show();
        })
        this.onlineUI.onOpenBagAC.add((arr: number[]) => {
            ModuleService.getModule(PetBagModuleC).showBag(arr);
        })
        mw.UIService.getUI(P_HudPet2).mBtn_Pet.onClicked.add(() => {
            ModuleService.getModule(PetBagModuleC).showBag();
        })
        this.rewardPanel.setRewardState(this.data.HasGetArr.length)
    }
    /**玩家进入游戏 初始化 */
    private onOnlineDayChange() {
        let curId = 0;
        this.data.HasGetArr.forEach((item) => {
            if (curId <= item)
                curId = item;
            this.rewardPanel.itemArr[item - 1].startCountDown(RewardState.rewarded)
        })
        this.data.WaitGetArr.forEach((item) => {
            if (curId <= item)
                curId = item;
            this.rewardPanel.itemArr[item - 1].startCountDown(RewardState.canReward)
        })

        let len = GameConfig.TimeReward.getAllElement().length;
        if (curId >= len) {
            console.error('lwj 没有需要计时的了');

        } else {

            for (let i = curId; i < len; i++) {
                this.rewardPanel.itemArr[i].startCountDown(RewardState.counting, this.data.todayOnlineTime)
                this.rewardPanel.itemArr[i].onCanGetAC.add((id: number) => {
                    this.stateChange(id, RewardState.canReward);
                })
            }
        }

        this.checkCanGet();
    }

    private stateChange(id: number, state: RewardState) {
        if (state == RewardState.rewarded) {
            AnalyticsTool.action_open_box(id);
        }
        this.server.net_StateChange(id, state);
    }

    /**检查是否有可领取的 */
    private checkCanGet() {
        let arr = this.rewardPanel.itemArr;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].curState == RewardState.canReward) {
                this.onlineUI.canGet();
                return;
            } else if (arr[i].curState == RewardState.counting) {
                this.onlineUI.updateTime(arr[i].curTime, arr[i].cfg.Time);
                return;
            }
        }
        this.onlineUI.geted();
    }

    net_showTips(lanId: string, count: string) {

        let lanArr = stringToNumberArr(lanId);
        let countArr = stringToNumberArr(count);

        lanArr.forEach((lanId, index) => {
            if (countArr[index] != 0) {
                TipsManager.instance.showTip(utils.Format(utils.GetUIText(lanId), countArr[index]));
            } else {
                TipsManager.instance.showTip(utils.GetUIText(lanId));
            }
        })

    }
    // net_getBuff(id: number) {
    //     let cfg = GameConfig.TimeReward.getElement(id);
    //     if (cfg.buff.length == 0) return;

    //     let buffMC = ModuleService.getModule(BuffModuleC);

    //     cfg.buff.forEach((element, index) => {
    //         if (element == GlobalEnum.BuffType.ThreeTimesGold) {
    //             buffMC.addBuff(element, cfg.buffTime[index])
    //             TipsManager.instance.showTip(utils.GetUIText(283));
    //         }
    //         if (element == GlobalEnum.BuffType.ThreeTimesDamage) {
    //             buffMC.addBuff(element, cfg.buffTime[index])
    //             TipsManager.instance.showTip(utils.GetUIText(282));
    //         }
    //         if (element == GlobalEnum.BuffType.LuckyPotion) {
    //             buffMC.addBuff(element, cfg.buffTime[index])
    //             TipsManager.instance.showTip(utils.GetUIText(284));
    //         }
    //         if (element == GlobalEnum.BuffType.SuperLuckyPotion) {
    //             TipsManager.instance.showTip(utils.GetUIText(285));
    //             buffMC.addBuff(element, cfg.buffTime[index])
    //         }
    //     })
    // }

}


