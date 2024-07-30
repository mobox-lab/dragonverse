// /*
//  * @Author: shifu.huang
//  * @Date: 2023-07-09 15:14:34
//  * @LastEditors: shifu.huang
//  * @LastEditTime: 2023-12-19 13:58:29
//  * @FilePath: \nevergiveup\JavaScripts\Modules\RankModule\RankModuleS.ts
//  * @Description: 修改描述
//  */

// import { PlayerActions } from "../../Actions";
// import PlayerModuleData from "../PlayerModule/PlayerModuleData";
// import { RankModuleC } from "./RankModuleC";
// import { RankModuleData } from "./RankModuleData";

// /**
//  * @Author       : bao.zhang bao.zhang@appshahe.com
//  * @Date         : 2023-02-02 10:52:33
//  * @LastEditors  : bao.zhang bao.zhang@appshahe.com
//  * @LastEditTime : 2023-02-02 11:16:34
//  * @FilePath     : \AnchorSimulator\JavaScripts\modules\player\PlayerModuleS.ts
//  * @Description  :
//  * @
//  */
// export class RankModuleS extends ModuleS<RankModuleC, RankModuleData> {
//     /**临时变量 */
//     private _tempNumber = 0;
//     /**体型模块 */
//     // private _bodyModuleS: BodyModuleS = null;

//     /**
//      * 获取各个模块，初始化内容
//      */
//     protected onStart(): void {
//         // this._bodyModuleS = ModuleService.getModule(BodyModuleS);
//         console.log("rank模块启动成功");
//         PlayerActions.onPlayerDisplayNameFinishedS.add(this.playerDisplayNameFinished, this);
//     }

//     // protected onPlayerEnterGame(player: mw.Player): void {
//     // this.i++;
//     // const playerData = DataCenterS.getData(player, PlayerModuleData);
//     // const pvpData = DataCenterS.getData(player, PVPDataInfo);
//     // const rankData = DataCenterS.getData(player, RankModuleData);
//     // setTimeout(() => {
//     //     this.getAllClient().net_onPlayerEnterGame(player.playerId, rankData.rank, playerData.playerName, rankData.subRank);
//     //     this.i--;
//     // }, 1000 * this.i);
//     // let datas = []
//     // DataCenterS.getReadyPlayerIds().forEach(playerId => {
//     //     if (playerId != player.playerId) {
//     //         const dataPlayer = DataCenterS.getData(playerId, PlayerModuleData);
//     //         const dataRank = DataCenterS.getData(playerId, RankModuleData);
//     //         datas.push({ id: playerId, rankId: dataRank.rank, name: dataPlayer.playerName, subRankId: dataRank.subRank })
//     //     }
//     // })
//     // pvpData.onSuccNumChange.add((winCount) => {
//     //     const cfgs = GameConfig.SubStage.getAllElement();
//     //     let rank: ISubStageElement;
//     //     for (let i = 0; i < cfgs.length; i++) {
//     //         if (winCount >= cfgs[i].needWin) {
//     //             rank = cfgs[i];
//     //         } else {
//     //             break;
//     //         }
//     //     }
//     //     const pvpData = DataCenterS.getData(player, RankModuleData);
//     //     if (rank.id != pvpData.subRank) {
//     //         this.net_updateSubRank(player, rank.id);
//     //     }
//     // })
//     // this.getClient(player).net_syncData(datas);
//     // }

//     /**
//      * 当玩家显示名字后
//      * @param playerId 玩家id
//      * @returns 
//      */
//     private playerDisplayNameFinished(playerId: number): void {
//         const player = mw.Player.getPlayer(playerId);
//         if (!player) return;
//         this._tempNumber++;
//         const playerData = DataCenterS.getData(player, PlayerModuleData);
//         // const pvpData = DataCenterS.getData(player, PVPDataInfo);
//         const rankData = DataCenterS.getData(player, RankModuleData);
//         setTimeout(() => {
//             this.getAllClient().net_onPlayerEnterGame(player.playerId, rankData.rank, playerData.playerName, rankData.subRank);
//             this._tempNumber--;
//         }, 1000 * this._tempNumber);
//         let datas = []
//         DataCenterS.getReadyPlayerIds().forEach(playerId => {
//             if (playerId != player.playerId) {
//                 const dataPlayer = DataCenterS.getData(playerId, PlayerModuleData);
//                 const dataRank = DataCenterS.getData(playerId, RankModuleData);
//                 datas.push({ id: playerId, rankId: dataRank.rank, name: dataPlayer.playerName, subRankId: dataRank.subRank })
//             }
//         })
//         // pvpData.onSuccNumChange.add((winCount) => {
//         //     const cfgs = GameConfig.SubStage.getAllElement();
//         //     let rank: ISubStageElement;
//         //     for (let i = 0; i < cfgs.length; i++) {
//         //         if (winCount >= cfgs[i].needWin) {
//         //             rank = cfgs[i];
//         //         } else {
//         //             break;
//         //         }
//         //     }
//         //     const pvpData = DataCenterS.getData(player, RankModuleData);
//         //     if (rank.id != pvpData.subRank) {
//         //         this.net_updateSubRank(player, rank.id);
//         //     }
//         // })
//         this.getClient(player).net_syncData(datas);
//     }

//     /**
//      * 更新玩家称号
//      * @param playerId 玩家id
//      * @param rankId 称号id
//      * @param playerName 玩家名字
//      */
//     updateRank(playerId: number, rankId: number, playerName: string) {
//         this.getAllClient().net_updateRank(playerId, rankId, playerName);

//     }

//     /**
//      * 更新玩家副称号
//      * @param playerId 玩家id
//      * @param subRankId 称号id
//      * @param playerName 玩家名字
//      */
//     updateSubRank(playerId: number, subRankId: number, playerName: string) {
//         this.getAllClient().net_updateSubRank(playerId, subRankId, playerName);
//     }

//     /**
//      * 存储称号并更新
//      * @param id 称号id
//      */
//     net_updateRank(id: number) {
//         this.currentData.rank = id;
//         this.currentData.save(false);
//         const data = DataCenterS.getData(this.currentPlayer, PlayerModuleData);
//         this.updateRank(this.currentPlayerId, id, data.playerName);
//     }

//     /**
//      * 存储副称号并更新
//      * @param player 玩家
//      * @param id 称号id
//      */
//     net_updateSubRank(player: mw.Player, id: number) {
//         let rankData = DataCenterS.getData(player, RankModuleData);
//         rankData.subRank = id;
//         rankData.save(true);
//         const data = DataCenterS.getData(player, PlayerModuleData);
//         this.updateSubRank(player.playerId, id, data.playerName);
//     }

//     /**
//      * 玩家离开，清除他的数据
//      * @param player 离开的玩家
//      */
//     protected onPlayerLeft(player: mw.Player): void {
//         this.getAllClient().net_onPlayerLeaveGame(player.playerId);
//     }

//     /**
//      * 获取玩家称号
//      * @param playerid 玩家id
//      * @returns 称号
//      */
//     public getPlayerRank(playerid: number): number {
//         const rankid = this.getPlayerData(playerid)?.rank;
//         return rankid != null ? rankid : 1;
//     }

//     // /**
//     //  * 更新玩家头顶UI位置
//     //  * @param playerid 玩家ID
//     //  * @param fourFeet 是否是四足
//     //  * @returns 
//     //  */
//     // public updateHeadPos(playerid: number, fourFeet: boolean) {
//     //     if (!Player.getPlayer(playerid)) return;
//     //     let height = 1;
//     //     for (let index = 0; index < Player.getAllPlayers().length; index++) {
//     //         if (fourFeet) {
//     //             height = this._bodyModuleS.getCurHeight(playerid);
//     //         }
//     //         this.getClient(Player.getAllPlayers()[index]).net_updateHeadPos(playerid, height, fourFeet);
//     //     }
//     // }
// }