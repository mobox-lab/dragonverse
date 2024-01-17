import KillRankItem_Generate from "../../../ui-generate/Rank/KillRankItem_generate";
import { RankListData } from "../RankListModuleS";
import { IRankItem } from "./RankTool";

export default class KillRankItem extends KillRankItem_Generate implements IRankItem {
    rank: mw.TextBlock;
    playerName: mw.TextBlock;
    playerScore: mw.TextBlock;
    
    public init() {
        this.rank = this.mRank;
        this.playerName = this.mName;
        this.playerScore = this.mCount;
    }

    public getScore(rankData: RankListData) {
        return rankData.sumKillNumber;
    }
}