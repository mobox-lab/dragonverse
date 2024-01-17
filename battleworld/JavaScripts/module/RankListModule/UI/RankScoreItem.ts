import { GameConfig } from "../../../config/GameConfig";
import Rankitem_Generate from "../../../ui-generate/Rank/Rankitem_generate";
import { PlayerManager } from "../../PlayerModule/PlayerManager";
import { RankListData } from "../RankListModuleS";
import { IRankItem } from "./RankTool";

export default class RankScoreItem extends Rankitem_Generate implements IRankItem {
    rank: mw.TextBlock;
    playerName: mw.TextBlock;
    playerScore: mw.TextBlock;

    public init() {
        this.rank = this.mRank;
        this.playerName = this.mName;
        this.playerScore = this.mCount;
    }

    public getScore(rankData: RankListData) {
        let rankId = PlayerManager.instance.getRankLevel(rankData.rankScore);
        let cfg = GameConfig.Rank.getElement(rankId);
        let content = GameConfig.Language.Rank_text_18.Value;
        if (!content) return "";
        return StringUtil.format(GameConfig.Language.Rank_text_18.Value, cfg.rankName, rankData.rankScore)
    }
}