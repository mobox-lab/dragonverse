import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { RankModuleC, RankUIData } from "./RankModuleC";
import { PlayerModuleData } from "../Player/PlayerModuleData";
import { GlobalData } from "../../const/GlobalData";
import DanceNpcBehaviour from "./DanceNpcBehaviour";
import { CollectModuleData } from "../PetCollect/CollectModuleData";


export enum RankType {
    Collect = "collect",
    Diamond = "diamond",
}

export class RankData {
    public playerId: number;
    public playerName: string;
    public diamond: number;
    public collect: number;
}

export class RankModuleS extends ModuleS<RankModuleC, null>{

    private playerRankDataLs: Array<RankData> = [];

    private npcBehaviours: DanceNpcBehaviour[] = [];

    /**各种类型的排名列表，键为排名类型，值为Id列表 */
    // private rankMap: Map<string, RankUIData[]> = new Map();

    /**前三名npc列表 */
    private npcs: Array<mw.Character> = [];


    protected onStart(): void {
        this.initNpc();
        this.setAutoRefresh();
    }


    protected onPlayerLeft(player: mw.Player): void {
        try {
            this.playerRankDataLs.splice(this.playerRankDataLs.findIndex((item) => {
                return item.playerId == player.playerId;
            }), 1);
            this.getAllClient().net_refresh();
        } catch (e) {
            console.log(e);
        }
    }


    // 添加玩家
    public net_addPlayer(playerName: string) {

        let index = this.playerRankDataLs.findIndex((item) => {
            return item.playerId == this.currentPlayerId;
        });
        // 已添加过则直接返回
        if (index != -1) {
            return;
        }

        let curPlayerId = this.currentPlayerId;

        // 添加排名相关数据变化的回调
        // 钻石
        let playerData = DataCenterS.getData(curPlayerId, PlayerModuleData);
        playerData.onDiamondChange.add(() => {
            this.setValues(curPlayerId, RankType.Diamond, playerData.diamond);
        });
        // 拥有宠物数
        let collectData = DataCenterS.getData(curPlayerId, CollectModuleData);
        collectData.onHasChangeAC.add(() => {
            this.setValues(curPlayerId, RankType.Collect, collectData.HasArr.length);
        })

        // 将玩家数据加入列表
        let data: RankData = new RankData();
        data.playerId = this.currentPlayerId;
        data.playerName = playerName;
        data.diamond = playerData.diamond;
        data.collect = collectData.HasArr.length;

        this.playerRankDataLs.push(data);
        // 每当有新玩家加入游戏之后，令所有玩家客户端的排行榜刷新
        this.getAllClient().net_refresh();
    }

    /**设置玩家排名数据的某一属性 */
    private setValues(playerID: number, type: RankType, value: number) {
        let item = this.playerRankDataLs.find((item) => {
            return item.playerId == playerID;
        });
        if (!item) {
            console.error("玩家ID不存在:" + playerID)
            return;
        }
        item[type] = value;
    }

    public net_getData(): string {
        return JSON.stringify(this.playerRankDataLs);
    }

    /**根据排名类型设置排名list */
    private sortRankListByType(type: RankType): RankUIData[] {
        let rankUIDataList: RankUIData[] = [];
        this.playerRankDataLs.forEach(data => {
            let uiData = new RankUIData(data.playerId, data.playerName, data[type]);
            rankUIDataList.push(uiData);
        })
        // 根据value降序排序
        rankUIDataList.sort((a, b) => b.value - a.value);
        return rankUIDataList;
    }

    /**根据排名类型获取排名数据 */
    public net_getRankByType(type: RankType): string {

        let uiDataList = this.sortRankListByType(type);
        this.setTop3Player();

        return JSON.stringify(uiDataList);
    }

    /**设置前三名跳舞npc模型 */
    private setTop3Player() {
        this.playerRankDataLs.sort((a, b) => b.diamond - a.diamond);
        for (let i = 0; i < 3 && i < this.playerRankDataLs.length; i++) {
            let userId = Player.getPlayer(this.playerRankDataLs[i].playerId).userId;
            if (!userId) continue;
            if (this.npcBehaviours[i].userId != userId) {
                this.npcBehaviours[i].userId = userId;
            } else {
                // console.warn("lmn 排名未变动");
            }
        }
    }

    /**初始化三个跳舞npc 给他们添加行为脚本 */
    private async initNpc() {

        let i = 0;
        let map = GlobalData.Rank.npcDanceMap;
        for (let [npcGuid, danceGuid] of map) {
            let npc = await GameObject.asyncFindGameObjectById(npcGuid) as mw.Character;
            // 把行为脚本挂载到对应的npc身上
            let script = await mw.Script.spawnScript(DanceNpcBehaviour);
            await TimeUtil.delaySecond(0.2);
            script.gameObject = npc;
            i++;
            this.npcBehaviours.push(script);
            // npc开始跳舞
            // script.startAnimation();
            PlayerManagerExtesion.rpcPlayAnimation(npc, danceGuid, 0);
        }
    }

    private setAutoRefresh() {
        TimeUtil.setInterval(() => {
            this.getAllClient().net_refresh();
        }, GlobalData.Rank.refreshTime);
    }

    /**获取npc */
    private async getNpc(guid: string): Promise<mw.Character> {
        let npc = await GameObject.asyncFindGameObjectById(guid) as mw.Character;
        return npc;
    }

}