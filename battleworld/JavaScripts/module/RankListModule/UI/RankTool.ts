import { PlayerHeadUIModuleC } from "../../PlayerHeadUIModule/PlayerHeadUIModuleC";
import RankListModuleC from "../RankListModuleC";
import { RankListData } from "../RankListModuleS";

export interface IRank extends UIScript {

    rankCanvas: Canvas;
    rankItems: IRankItem[];
    rankItemClass: { new (): IRankItem }

    init();

    sortRank(rankList: RankListData[]);
}

export interface IRankItem extends UIScript {

    rank: TextBlock;
    playerName: TextBlock;
    playerScore: TextBlock;

    init();

    getScore(rankData: RankListData);
}

export namespace RankUI {

    /**
     * 初始化排行榜数据
     * @param rank 排行榜接口
     */
    export function init(rank: IRank) {
        rank.init();
        //创建item ui出来
        const size = new Vector2(1920, 85);
        const num = 10;
        rank.rankItems = [];
        for (let i = 0; i < num; i++) {
            const item = UIService.create(rank.rankItemClass);
            item.init();
            item.uiWidgetBase.size = size;
            rank.rankCanvas.addChild(item.uiWidgetBase);
            item.setVisible(false);
            rank.rankItems.push(item);
        }
    }

    /**
     * 刷新这个排行榜的数据
     * @param rank rank接口
     */
    export function refreshRank(rank: IRank) {
        const rankListModule = ModuleService.getModule(RankListModuleC);
        //获取排序后的数据
        const rankList = rankListModule.getRankList();
        if (!rankList) return;
        rank.sortRank(rankList);
        const num = 10;
        for (let i = 0; i < num; i++) {
            if (i >= rankList.length) {
                rank.rankItems[i].setVisible(false);
            } else {
                //更新数据
                rank.rankItems[i].setVisible(true);
                refreshRankItem(rank.rankItems[i], i + 1, rankList[i]);
            }
        }
    }

    /**
     * 刷新
     * @param rankItem 排行条目
     * @param rank 名次
     * @param rankData 数据
     */
    async function refreshRankItem(rankItem: IRankItem, rank: number, rankData: RankListData) {
        rankItem.rank.text = rank.toFixed();
        //根据id查名字
        const playerName = (await ModuleService.getModule(PlayerHeadUIModuleC).getHeadUIWidget(rankData.playerId))?.playerName;
        rankItem.playerName.text = playerName;
        rankItem.playerScore.text = rankItem.getScore(rankData);
    }
}