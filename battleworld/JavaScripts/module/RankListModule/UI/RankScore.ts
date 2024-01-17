import Rank_Generate from "../../../ui-generate/Rank/Rank_generate";
import { RankListData } from "../RankListModuleS";
import KillRankItem from "./KillRankItem";
import RankScoreItem from "./RankScoreItem";
import { IRank, IRankItem } from "./RankTool";

export default class rankScore extends Rank_Generate implements IRank {
    rankItemClass: new () => IRankItem;
    rankItems: IRankItem[];
    rankCanvas: mw.Canvas;
    
    public init() {
        this.rankCanvas = this.mRankCanvas;
        this.rankItemClass = RankScoreItem;
    }

    public sortRank(rankList: RankListData[]) {
        if (!rankList) return;
        rankList.sort((a, b) => {
            return b.rankScore - a.rankScore;
        });
    }
}