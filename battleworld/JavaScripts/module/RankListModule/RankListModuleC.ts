import RankListModuleS, { RankListData } from "./RankListModuleS";
import KillRank from "./UI/KillRank";
import LiveRank from "./UI/LiveRank";
import rankScore from "./UI/RankScore";
import { IRank, RankUI } from "./UI/RankTool";

/**
 * 排行榜类型枚举
 */
export const enum ERankType {
    /**
     * 累积击杀
     */
    SumKill = 1,

    /**
     * 单次最长存活时间
     */
    MaxLive,
    /** 段位分 */
    RankScore
}


export default class RankListModuleC extends ModuleC<RankListModuleS, null> {

    /** 记录排行榜类型对应在场景上的实例世界UI的guid */
    private readonly _worldRankMap: Map<ERankType, { guid: string, PanelClass: { new(): IRank } }> = new Map<ERankType, { guid: string, PanelClass: { new(): IRank } }>([
        [ERankType.SumKill, { guid: "1D627A26", PanelClass: KillRank }],
        [ERankType.MaxLive, { guid: "16A3295B", PanelClass: LiveRank }],
        [ERankType.RankScore, { guid: "00E55CA0", PanelClass: rankScore }]
    ]);
    /** 记录排行榜类型对应的UI */
    private _worldRankUIMap: Map<ERankType, IRank> = new Map<ERankType, IRank>();

    /** 排行数据 */
    private _rankList: RankListData[] = null;

    protected onStart(): void {
        this.loadWorldRankUI();
    }

    /**
     * 加载世界排行榜UI
     */
    private loadWorldRankUI(): void {
        setTimeout(() => {
            this._worldRankMap.forEach(async (vals, type) => {
                const obj = await GameObject.asyncFindGameObjectById(vals.guid);
                //找到的世界UI
                const worldRankUI = obj as mw.UIWidget;
                //创建UI
                const rankUI = mw.UIService.create(vals.PanelClass);
                RankUI.init(rankUI);
                //关联并刷新数据
                worldRankUI.setTargetUIWidget(rankUI.uiWidgetBase);
                RankUI.refreshRank(rankUI);
                this._worldRankUIMap.set(type, rankUI);
            })
        }, 3000);
    }

    /**
     * 服务器通知刷新
     * @param rankList 最新数据
     */
    public net_refreshData(rankList: RankListData[]) {
        // console.error(`rkc=================================================`);
        this._rankList = rankList;
        // this._rankList.forEach(rank => console.error(`rkc--------------数据：${JSON.stringify(rank)}`));
        this._worldRankUIMap.forEach((rankUI, type) => RankUI.refreshRank(rankUI));
    }

    /**
     * 获取榜单数据
     * @returns 数据
     */
    public getRankList(): RankListData[] {
        const res: RankListData[] = [];
        if (this._rankList) {
            for (let i = 0; i < this._rankList.length; i++) {
                res.push(this._rankList[i]);
            }
        }
        return res;
    }
}