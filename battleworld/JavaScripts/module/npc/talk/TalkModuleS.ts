import { PlayerModuleS } from "../../PlayerModule/PlayerModuleS";
import { TalkModuleC } from "./TalkModuleC";

export class TalkModuleS extends ModuleS<TalkModuleC, null> {

    // 玩家模块
    // private playerModule: PlayerModuleS;

    protected onStart(): void {
        // this.playerModule = ModuleService.getModule(PlayerModuleS);
    }

    /**
     * 对话奖励购买
     */
    // @Decorator.noReply()
    // public net_talkReward(type: TabType, moneyType: EMoneyType, require: number, reward: number) {
    //     let money = this.getMoney(this.currentPlayer, moneyType);
    //     if (money < require) { // 钱不够
    //         return;
    //     }
    //     // 获取背包数据
    //     let bagData: BagModuleData = DataCenterS.getData(this.currentPlayer, BagModuleData);
    //     // 根据类型判断
    //     switch (type) {
    //         case TabType.Scout:
    //         case TabType.Mage:
    //             if (bagData != null && bagData.getItemCount(reward) <= 0) {
    //                 this.playerModule.reducePlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.money, require);
    //                 EventManager.instance.call(EModule_Events_S.bag_addItem, this.currentPlayerId, reward);
    //             }
    //             break;
    //         case TabType.PetEgg:
    //         case TabType.PetFood:
    //             this.reduceMedal(this.currentPlayer, require);
    //             EventManager.instance.call(EModule_Events_S.bag_addItem, this.currentPlayerId, reward);
    //             break;
    //         case TabType.ExchangeStarStone:
    //             this.playerModule.addPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.money, reward);
    //             this.reduceMedal(this.currentPlayer, require);
    //             break;
    //         case TabType.ExchangeStarStone2:
    //             this.playerModule.addPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.money, reward);
    //             this.reduceGoldMedal(this.currentPlayer, require);
    //             break;
    //         case TabType.ExchangePet:
    //         case TabType.ExchangePendant:
    //             EventManager.instance.call(EModule_Events_S.bag_addItem, this.currentPlayerId, reward);
    //             this.reduceGoldMedal(this.currentPlayer, require);
    //             break;
    //         default:
    //             break;
    //     }
    // }

    /**
     * 对话购买,保存购买数据
     * @param type 类型
     */
    // public net_talkBuySaveData(type: TalkDataEnum, money: number, moneyType: EMoneyType) {
    //     let cur = this.getMoney(this.currentPlayer, moneyType);
    //     if (cur < money) {
    //         return;
    //     }
    //     if (!this.currentData.has(type)) {
    //         this.currentData.addType(type);
    //         this.currentData.save(true);

    //         if (moneyType == EMoneyType.StarStone) {
    //             this.playerModule.reducePlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.money, money);
    //         } else if (moneyType == EMoneyType.Medal) {
    //             this.reduceMedal(this.currentPlayer, money);
    //         } else if (moneyType == EMoneyType.GoldMedal) {
    //             this.reduceGoldMedal(this.currentPlayer, money);
    //         }
    //     }
    // }

    /**.reduceGoldMe.reduceGoldMedal
     * 获取钱
     */
    // private getMoney(player: mw.Player, moneyType: EMoneyType) {
    //     if (moneyType == EMoneyType.Medal) {
    //         let data = DataCenterS.getData(player, ArenasModuleData);
    //         return data.medal;
    //     }
    //     if (moneyType == EMoneyType.StarStone) {
    //         return this.playerModule.getPlayerAttr(player.playerId, Attribute.EnumAttributeType.money);
    //     }
    //     if (moneyType == EMoneyType.GoldMedal) {
    //         let medelData = DataCenterS.getData(player, ArenasWorld2Data);
    //         return medelData.goldMedal;
    //     }
    //     return 0;
    // }

}