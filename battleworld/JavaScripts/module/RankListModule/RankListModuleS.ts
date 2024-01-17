import { EAreaEvents_S, EAreaId, EModule_Events_S, EPlayerEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import RankListModuleC from "./RankListModuleC";
import RankSync from "./RankSync";

/**
 * 记录的排行数据
 */
export type RankListData = { 
    /** 玩家id */
    playerId: number,
    /** 累积击杀人数 */
    sumKillNumber: number, 
    /** 单次最大存活时间 */
    maxLiveTime: number,
    /** 段位分 */
    rankScore: number,
    /** userid */
    userId: string
}

export default class RankListModuleS extends ModuleS<RankListModuleC, null> {
    
    /** 记录玩家是否在战斗区域 */
    private _playerInBattleArea: Set<number> = new Set();
    /** 玩家的数据，记录了当次游戏最大的存活时间和累积击杀人数 */
    private _playerRankData: Map<number, RankListData> = new Map();
    /** 玩家的数据，记录了一条命的存活时间 */
    private _playerLiveTime: Map<number, number> = new Map();

    /** 用于计时 */
    private _liveCheckTime: number = 0;
    /** 通知计时 */
    private _notifyRefreshTime: number = 0;
    /** 展示npc计时 */
    private _refreshNpcTime: number = 0;
    /** 展示npc同步脚本 */
    private _rankSync: RankSync = null;

    /**
     * 初始化监听
     */
    protected onStart(): void {
        EventManager.instance.add(EPlayerEvents_S.player_deadState_s, this.listen_player_deadState, this);
        EventManager.instance.add(EModule_Events_S.area_changeArea, this.listen_area_changeArea, this);


        this.createRankSync();
    }

    /**
     * 中途加入，初始化数据
     * @param player 加入的玩家
     */
    protected onPlayerJoined(player: mw.Player): void {
        if (player) {
            this._playerRankData.set(player.playerId, this.initRankData(player.playerId, player.userId));
        }
    }

    /**
     * 定时检查
     * @param dt 帧时间
     */
    protected onUpdate(dt: number): void {
        this.checkLiveUpdate(dt);
        this.checkNotify(dt);
        this.checkRefreshNpc(dt);
    }

    /**
     * 玩家离开，清除他的数据
     * @param player 离开的玩家
     */
    protected onPlayerLeft(player: mw.Player): void {
        this._playerInBattleArea.delete(player.playerId);
        this._playerRankData.delete(player.playerId);
        this._playerLiveTime.delete(player.playerId);
    }

    /**
     * 玩家死亡，停止生存计时
     * @param playerID 玩家id
     * @param sceneID 如果是玩家，就是击杀者
     */
    private listen_player_deadState(playerID: number, sceneID: number) {
        this._playerInBattleArea.delete(playerID);
        let player = Player.getPlayer(playerID);
        if (player) {
            if (!this._playerRankData.has(sceneID)) return;
            //增加累积击杀数
            let attackData = this._playerRankData.get(sceneID);
            if (!attackData) {
                attackData = this.initRankData(sceneID, player.userId);
                this._playerRankData.set(sceneID, attackData);
            }
            attackData.sumKillNumber++;
        }
    }

    /**
     * 玩家所在区域改变
     * @param playerId 玩家id
     * @param areaId 传送区域
     */
    private listen_area_changeArea(playerId: number, areaId: number) {
        if (areaId == EAreaId.Safe) {
            //停止计时
            this._playerInBattleArea.delete(playerId);
        } else if (areaId == EAreaId.Battle) {
            //开始计时
            this._playerInBattleArea.add(playerId);
            this._playerLiveTime.set(playerId, 0);
        }
    }

    /**
     * 统计并刷新存活时间
     * @param dt 帧间隔
     */
    private checkLiveUpdate(dt: number) {
        this._liveCheckTime += dt;
        if (this._liveCheckTime >= 1) {
            //检查一下这个玩家是否还在战场
            for (const [playerId, liveTime] of this._playerLiveTime) {
                if (this._playerInBattleArea.has(playerId)) {
                    const time = liveTime + this._liveCheckTime;
                    this._playerLiveTime.set(playerId, time);
                    //看一下是否能更新排行榜条目数据
                    const rankData = this._playerRankData.get(playerId);
                    if (rankData) {
                        if (rankData.maxLiveTime < time) {
                            rankData.maxLiveTime = time;
                        }
                    }
                } else {
                    this._playerLiveTime.set(playerId, 0);
                }
            }
            this._liveCheckTime = 0;
        }
    }

    /**
     * 检查是否需要通知客户端刷新
     * //TODO 如果确定了排行榜在安全区，后续可以视情况调整为客户端主动拉取数据，在战场区域就不再发起刷新请求，以提高性能
     * //TODO 可以考虑服务端优化下，数据有变动才进行通知更新
     * @param dt 帧间隔
     */
    private checkNotify(dt: number) {
        this._notifyRefreshTime += dt;
        let playerS = ModuleService.getModule(PlayerModuleS);
        if (this._notifyRefreshTime >= 5) {
            //准备好数据
            const rankData = Array.from(this._playerRankData.values());
            rankData.forEach((data) => {
                data.rankScore = playerS.getPlayerAttr(data.playerId, Attribute.EnumAttributeType.rankScore);
            })
            Player.getAllPlayers().forEach(player => {
                if (player && player.character) {
                    this.getClient(player).net_refreshData(rankData);
                }
            });
            this._notifyRefreshTime = 0;
        }
    }

    /**
     * 初始化一个RankListData
     * @param playerId 玩家id
     * @returns RankListData
     */
    private initRankData(playerId: number, userId: string): RankListData {
        return { playerId, sumKillNumber: 0, maxLiveTime: 0, rankScore: 0 , userId}
    }

    /**
     * 检查刷新展示npc
     */
    private checkRefreshNpc(dt: number) {
        this._refreshNpcTime += dt;
        if (this._refreshNpcTime >= 20) {
            this._refreshNpcTime = 0;

            const rankData = Array.from(this._playerRankData.values());
            if (rankData.length == 0) return;
            rankData.sort((a, b) => b.rankScore - a.rankScore);
            if (!this._rankSync) return;
            this._rankSync.rankScoreFirst = rankData[0].userId;
        }
    }

    /**
     * 创建同步脚本
     */
    private async createRankSync() {
        if (this._rankSync) return;
        this._rankSync = await mw.Script.spawnScript(RankSync, true);
    }
}