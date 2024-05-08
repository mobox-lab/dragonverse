import { GameConfig } from "../../config/GameConfig";
import ForeignKeyIndexer, { BagTypes } from "../../const/ForeignKeyIndexer";

export module CompanionHelper {

    export function isDragon(bagId: number) {
        return ForeignKeyIndexer.getInstance().isBagItemType(bagId, BagTypes.Dragon);
    }

    /**
     * 获取伙伴类型
     * @param companionId
     * @returns
     */
    export function getCompanionType(bagId: number) {
        let dragonId = ForeignKeyIndexer.getInstance().queryDragonByBagId(bagId);
        if (dragonId) {
            let dragonInfo = GameConfig.Dragon.getElement(dragonId);
            if (dragonInfo) {
                return dragonInfo.elementalId;
            }
        }

        return null;
    }
}