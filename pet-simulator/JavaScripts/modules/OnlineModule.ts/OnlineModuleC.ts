import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { stringToNumberArr, utils } from "../../util/uitls";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { P_HudPet2 } from "../Hud/P_HudPet2";
import { TipsManager } from "../Hud/P_TipUI";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { BuffModuleC } from "../buff/BuffModuleC";
import { OnlineModuleData } from "./OnlineModuleData";
import { OnlineModuleS } from "./OnlineModuleS";
import { P_HudPetGift } from "./P_HudPetGift";
import { P_RewardPanel, RewardState } from "./P_RewardPanel";

export class OnlineModuleC extends ModuleC<OnlineModuleS, OnlineModuleData> {

    private onlineUI: P_HudPetGift;
    private rewardPanel: P_RewardPanel;

    protected onStart(): void {
        this.onlineUI = mw.UIService.getUI(P_HudPetGift);
        this.rewardPanel = mw.UIService.getUI(P_RewardPanel);
        this.initEvents();
    }

    private initEvents() {
        this.data.onlineDayAC.add(this.onOnlineDayChange, this);
        this.data.onHasGetAC.add(() => {
            this.rewardPanel.setRewardState(this.data.HasGetArr.length);
        });
        this.rewardPanel.onRewardBtnAC.add((id: number) => {
            this.server.net_requestAccept(id);
        });
        this.rewardPanel.mBtn_Close.onClicked.add(() => { //检查显示 可领取
            this.rewardPanel.hide();
            this.checkCanGet();
        });
        this.onlineUI.onBtnAC.add(() => {
            this.rewardPanel.show();
        });
        this.onlineUI.onOpenBagAC.add((arr: number[]) => {
            ModuleService.getModule(PetBagModuleC).showBag(arr);
        });
        mw.UIService.getUI(P_HudPet2).mBtn_Pet.onClicked.add(() => {
            ModuleService.getModule(PetBagModuleC).showBag();
        });
        this.rewardPanel.setRewardState(this.data.HasGetArr.length);
    }

    /**玩家进入游戏 初始化 */
    private onOnlineDayChange() {
        let curId = 0;
        this.data.HasGetArr.forEach((item) => {
            if (curId <= item) curId = item;
            this.rewardPanel.itemArr[item - 1].startCountDown(RewardState.rewarded);
        });

        let len = GameConfig.TimeReward.getAllElement().length;
        if (curId >= len) {
            console.log("lwj 没有需要计时的了");
        } else {
            for (let i = curId; i < len; i++) {
                this.rewardPanel.itemArr[i].startCountDown(
                    RewardState.counting,
                    this.data.totalOnlineTime);
            }
        }

        this.checkCanGet();
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
        });

    }
}


