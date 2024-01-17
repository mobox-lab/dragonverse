import { GameConfig } from "../../../../config/GameConfig";
import Rank_mainItem_Generate from "../../../../ui-generate/Rank/Rank_mainItem_generate";

export class RankItem extends Rank_mainItem_Generate {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }
    /**
     * 根据配置初始化item
     */
    public init(cfgId: number) {
        let cfg = GameConfig.Rank.getElement(cfgId);
        if (!cfg) return;
        this.mRankName.text = cfg.rankName;
        if (cfg.rankImgID) {
            this.mRankpic.imageGuid = cfg.rankImgID;
        }
    }

    /**
     * 解锁item表现
     */
    public unLock() {
        this.mUnlockimg.visibility = SlateVisibility.SelfHitTestInvisible;
    }

    /**
     * 未解锁item表现
     */
    public lock() {
        this.mUnlockimg.visibility = SlateVisibility.Collapsed;
    }

}