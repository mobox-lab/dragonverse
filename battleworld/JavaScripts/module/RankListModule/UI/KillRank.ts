import KillRank_Generate from "../../../ui-generate/Rank/KillRank_generate";
import { RankListData } from "../RankListModuleS";
import KillRankItem from "./KillRankItem";
import { IRank, IRankItem } from "./RankTool";

export default class KillRank extends KillRank_Generate implements IRank {
    rankItemClass: new () => IRankItem;
    rankItems: IRankItem[];
    rankCanvas: mw.Canvas;
    
    public init() {
        this.rankCanvas = this.mRankCanvas;
        this.rankItemClass = KillRankItem;
    }

    public sortRank(rankList: RankListData[]) {
        if (!rankList) return;
        rankList.sort((a, b) => {
            return b.sumKillNumber - a.sumKillNumber;
        });
    }
}