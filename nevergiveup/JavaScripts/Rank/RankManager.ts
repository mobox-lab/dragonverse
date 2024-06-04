/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-26 09:51:22
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-26 14:28:28
 * @FilePath     : \nevergiveup\JavaScripts\Rank\RankManager.ts
 * @Description  : 修改描述
 */

import { RankActions } from "../Actions";
import { UIInGameRank } from "./ui/UIInGameRank";

export type RankItem = {
    userId: string,
    name: string,
    gold: number,
    damage: number
}
export namespace RankManager {
    export function init() {
        RankActions.onRankItemsChanged.add((rankItems: RankItem[]) => {
            updateRankItems(rankItems);
        });
    }

    export function updateRankItems(rankItems: RankItem[]) {
        let rankUI = UIService.getUI(UIInGameRank);
        rankUI.updateRankItems(rankItems);
        if (!rankUI.visible) {
            UIService.show(UIInGameRank)
        }
    }
}