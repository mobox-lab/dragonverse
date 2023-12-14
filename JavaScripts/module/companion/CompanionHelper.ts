import { GameConfig } from "../../config/GameConfig";
import { CompanionInfo } from "./CompanionData";

export module CompanionHelper {


    /**
     * 获取伙伴类型
     * @param companionId 
     * @returns 
     */
    export function getCompanionType(companionId: number | CompanionInfo) {
        let id = typeof companionId === 'number' ? companionId : companionId.companionId;
        let cfg = GameConfig.Dragon.getElement(id);
        if (cfg) {
            return cfg.elementalId;
        }

        return null;
    }
}