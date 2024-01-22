import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import MessageBox from "../../utils/MessageBox";
import { utils } from "../../utils/uitls";
import { TipsManager } from "../Hud/P_TipUI";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import { Task_ModuleS } from "../Task/Task_ModuleS";
import { RewardData } from "./RewardData";


export class RewardModuleC extends ModuleC<RewardModuleS, RewardData>{

    protected onEnterScene(sceneType: number): void {
        if (this.data.isGetReward) return;
        this.server.net_addReward();

        let diamond = utils.formatNumber(GlobalData.RewardCompensation.diamond);
        let taskPoint = GlobalData.RewardCompensation.taskPoint;

        let str = StringUtil.format(GameConfig.Language.Tips_gift_4.Value, diamond, taskPoint);
        setTimeout(() => {
            MessageBox.showOneBtnMessage(str, () => {
                TipsManager.instance.showTip(StringUtil.format(GameConfig.Language.Tips_gift_2.Value, diamond));
                TipsManager.instance.showTip(StringUtil.format(GameConfig.Language.Task_shop_19.Value, taskPoint));
            });
        }, 5000);
    }

}

export class RewardModuleS extends ModuleS<RewardModuleC, RewardData>{

    net_addReward(): void {
        ModuleService.getModule(PlayerModuleS).addDiamond(this.currentPlayerId, GlobalData.RewardCompensation.diamond);
        ModuleService.getModule(Task_ModuleS).addTaskPoint(this.currentPlayer, GlobalData.RewardCompensation.taskPoint);
        this.currentData.isGetReward = true;
        this.currentData.save(false);
    }

}