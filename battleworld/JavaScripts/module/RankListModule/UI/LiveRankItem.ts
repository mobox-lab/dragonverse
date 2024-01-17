import LiveRankItem_Generate from "../../../ui-generate/Rank/LiveRankItem_generate";
import { RankListData } from "../RankListModuleS";
import { IRankItem } from "./RankTool";

export default class LiveRankItem extends LiveRankItem_Generate implements IRankItem {
    rank: mw.TextBlock;
    playerName: mw.TextBlock;
    playerScore: mw.TextBlock;
    
    public init() {
        this.rank = this.mRank;
        this.playerName = this.mName;
        this.playerScore = this.mCount;
    }

    public getScore(rankData: RankListData) {
        return this.formatSeconds(Number(rankData.maxLiveTime.toFixed(0)));
    }

    private formatSeconds(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}