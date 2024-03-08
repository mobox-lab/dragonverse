import { DegreeType } from "../blackboard/BoardDefine";
import GlobalDataHelper from "../procedure/ui/GlobalDataHelper";
import GlobalRankData, { GlobalRankDataInfoBase } from "./GlobalRankData";
import { GlobalRankModuleC, rankDataTypeList } from "./GlobalRankModuleC";
import PlayerRankData from "./PlayerRankData";

/**
 * GlobalRank模块Server端
 */
export class GlobalRankModuleS extends ModuleS<GlobalRankModuleC, PlayerRankData>{
    /** 缓存的数据实例 */
    private dataMap: Map<number, GlobalRankData<any>> = new Map();

    protected override onAwake(): void {
        super.onAwake();
        rankDataTypeList.forEach((rankType) => { this.createDataScript(rankType); });
    }

    /** 请求设置数据 */
    @Decorator.noReply()
    public async net_reqSetData(key: DegreeType, dataStr: string) {
        if (!this.dataMap.has(key)) { return; }
        let info = JSON.parse(dataStr) as GlobalRankDataInfoBase;
        this.dataMap.get(key).setData(info);
        const data = this.getPlayerData(info.i);
        data.setRankData(key, info.t);
    }


    /**
     * 请求设置通关数据
     * @param endId 通关的结局id
     * @param degree 难度
     * @param passTime 通关的时间
     */
    @Decorator.noReply()
    public async net_setPassData(endId: number, degree: DegreeType, passTime: number) {
        this.currentData.updateEndingData(endId, degree, passTime);
    }

    /** 拿自己的排行榜分数 */
    // public async net_getSelfRankScore(key: DegreeType, pid: number): Promise<number> {
    //     return this.getPlayerData(pid).getRankScore(key);
    // }

    /** 生成数据脚本 */
    private async createDataScript(key: DegreeType) {
        const script = await Script.spawnScript(GlobalRankData, true);
        // 初始化各种难度的全服排行榜脚本
        script.server_init(key);
        this.dataMap.set(key, script);
    }

    /** 因为后五十名的数据太多了同步不到客户端，所以rpc拿自己的排名 */
    public net_reqGetSelfRank(degreeType: DegreeType, userId: string): number {
        return this.dataMap.get(degreeType).getDataArray().findIndex((v: GlobalRankDataInfoBase) => { return userId === v.i; });
    }

    /** 每当玩家下线 */
    protected onPlayerLeft(player: mw.Player): void {
        if (Player.getAllPlayers().length <= 1) {
            console.log("Player.getAllPlayers().length: " + Player.getAllPlayers().length);
            this.dataMap.forEach(data => { data.forceUpdateData(); });
        }
    }
}