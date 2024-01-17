import LiveRank_Generate from "../../../ui-generate/Rank/LiveRank_generate";
import { RankListData } from "../RankListModuleS";
import LiveRankItem from "./LiveRankItem";
import { IRank, IRankItem } from "./RankTool";

export default class LiveRank extends LiveRank_Generate implements IRank {
    rankItemClass: new () => IRankItem;
    rankItems: IRankItem[];
    rankCanvas: mw.Canvas;
    
    public init() {
        this.rankCanvas = this.mRankCanvas;
        this.rankItemClass = LiveRankItem;
    }

    public sortRank(rankList: RankListData[]) {
        if (!rankList) return;
        rankList.sort((a, b) => {
            return b.maxLiveTime - a.maxLiveTime;
        });
    }
}