// import { PlayerActions } from '../../Actions';
// /*
//  * @Author: shifu.huang
//  * @Date: 2023-06-20 11:24:13
//  * @LastEditors: shifu.huang
//  * @LastEditTime: 2023-12-19 13:52:43
//  * @FilePath: \nevergiveup\JavaScripts\Modules\RankModule\RankModuleC.ts
//  * @Description: 修改描述
//  */

// import { GameConfig } from "../../config/GameConfig";
// import { ILevelElement } from '../../config/Level';
// import { ISubLevelElement } from '../../config/SubLevel';
// import PlayerHeadUI_Generate from '../../ui-generate/PlayerHeadUI_generate';
// import PlayerModuleC from '../PlayerModule/PlayerModuleC';
// import { RankModuleData } from "./RankModuleData";
// import { RankModuleS } from "./RankModuleS";

// /**
//  * 玩家头顶的UI，记录了ui和对应的配置信息
//  */
// class HeadUI {
//     /** 配置表中的数据 */
//     config: ILevelElement;

//     constructor(public uiWidget: mw.UIWidget,
//         public ui: PlayerHeadUI_Generate,
//         public playerId: number,
//         public playerName: string) {
//     }

//     /**
//      * 统一销毁ui和UIWidget
//      */
//     destroy() {
//         this.ui.destroy();
//         this.uiWidget.destroy();
//     }
// }

// /** vector2的临时变量 */
// let TEMP_VECTOR2 = Vector2.zero;
// /** vector3的临时变量 */
// let TEMP_VECTOR3 = Vector.zero;
// /** 颜色值的临时变量 */
// let TEMP_COLOR = LinearColor.black;

// /**
//  * 称号模块的客户端，主要初始化玩家这边的UI，更换称号的内容
//  */
// export class RankModuleC extends ModuleC<RankModuleS, RankModuleData>{
//     /**称号UI的map */
//     public uiMap: Map<number, HeadUI> = new Map();
//     /**称号文本信息 */
//     public stageCfg: ILevelElement;
//     /**玩家模块 */
//     private _playerModule: PlayerModuleC;

//     /**
//      * 获取模块，初始化监听
//      */
//     protected onStart(): void {
//         this._playerModule = ModuleService.getModule(PlayerModuleC);
//         this.initAction();
//     }

//     /**
//      * 初始化监听的action
//      */
//     private initAction() {
//         //这些因为比较高频，就不放S端了，就放c端了
//         PlayerActions.onCurrencyChanged.add(this.judgeUpdate.bind(this));
//     }

//     /**
//      * 判断是否更新称号
//      */
//     private judgeUpdate() {
//         let rank: ILevelElement;
//         const sum = this._playerModule.gold;
//         const cfg = GameConfig.Level.getAllElement();
//         for (let i = 0; i < cfg.length; i++) {
//             if (sum >= cfg[i].needPower) {
//                 rank = cfg[i];
//             } else {
//                 break;
//             }
//         }
//         if (rank.id != this.data.rank) {
//             this.data.rank = rank.id;
//             this.server.net_updateRank(rank.id);
//         }
//     }

//     /**
//      * 同步数据
//      * @param datas 数据
//      */
//     public net_syncData(datas: { id: number, rankId: number, name: string, subRankId: number }[]) {
//         for (let i = 0; i < datas.length; i++) {
//             const data = datas[i];
//             this.net_onPlayerEnterGame(data.id, data.rankId, data.name, data.subRankId, false);
//         }
//     }

//     /**
//      * 当玩家进入游戏时调用
//      * @param playerId 玩家id
//      * @param rankId 称号id
//      * @param playerName 玩家名字
//      * @param subRankId 副称号id
//      * @param isEnter 是否进入
//      * @returns 
//      */
//     public async net_onPlayerEnterGame(playerId: number, rankId: number, playerName: string, subRankId: number, isEnter: boolean = true) {
//         if (this.uiMap.has(playerId)) return;
//         let player = Player.getPlayer(playerId);
//         player?.character?.asyncReady().then((character: Character) => {
//             const ui = GameObject.spawn("UIWidget") as mw.UIWidget;
//             const myUI = mw.UIService.create(PlayerHeadUI_Generate);
//             ui.setTargetUIWidget(myUI.uiWidgetBase);
//             ui.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
//             // ui.parent = character
//             // ui.localTransform.position = (Consts.TEMP_VECTOR3.set(0, 0, 80))
//             character.attachToSlot(ui, mw.HumanoidSlotType.Nameplate);
//             ui.scaledByDistanceEnable = false;
//             // ui.distanceScaleFactor = 10;
//             ui.hideByDistanceEnable = false;
//             ui.drawSize = TEMP_VECTOR2.set(264, 110);
//             ui.localTransform.position = TEMP_VECTOR3.set(0, 0, -10);
//             ui.setVisibility(mw.PropertyStatus.FromParent);
//             myUI.playerName.text = playerName;
//             const headUI = new HeadUI(ui, myUI, playerId, playerName);
//             this.uiMap.set(playerId, headUI);
//             // if (playerId == Player.localPlayer.playerId) isEnter = false;
//             this.checkUpRank(playerId, rankId, playerName, true, isEnter);
//             this.checkUpSubRank(playerId, subRankId, playerName, true, isEnter);

//         })
//     }

//     /**
//      * 玩家离开时调用
//      * @param playerId 玩家id
//      */
//     public net_onPlayerLeaveGame(playerId: number) {
//         if (this.uiMap.has(playerId)) {
//             this.uiMap.get(playerId).destroy();
//             this.uiMap.delete(playerId);
//         }

//     }

//     /**
//      * 更新称号
//      * @param playerId 玩家id
//      * @param rankId 称号id
//      * @param playerName 玩家名字
//      */
//     public net_updateRank(playerId: number, rankId: number, playerName: string) {
//         if (this.uiMap.has(playerId)) {
//             this.checkUpRank(playerId, rankId, playerName, false);
//         }
//     }

//     /**
//      * 更新副称号
//      * @param playerId 玩家id
//      * @param subRankId 称号id
//      * @param playerName 玩家名字
//      */
//     public net_updateSubRank(playerId: number, subRankId: number, playerName: string) {
//         if (this.uiMap.has(playerId)) {
//             this.checkUpSubRank(playerId, subRankId, playerName, false);
//         }
//     }

//     /**
//      * 更新称号
//      * @param playerId 玩家id
//      * @param cfg 文本信息
//      */
//     public updateRank(playerId: number, cfg: ILevelElement) {
//         if (this.uiMap.has(playerId)) {
//             const headUI = this.uiMap.get(playerId);
//             if (cfg.iconGuid) {
//                 mw.AssetUtil.asyncDownloadAsset(cfg.iconGuid).then(() => {
//                     if (headUI && headUI.ui && headUI.ui.image) {
//                         headUI.ui.image.imageGuid = cfg.iconGuid;
//                     }
//                 })
//             }
//             headUI.ui.title.text = cfg.stage;
//             TEMP_COLOR.r = cfg.textColor[0] / 255;
//             TEMP_COLOR.g = cfg.textColor[1] / 255;
//             TEMP_COLOR.b = cfg.textColor[2] / 255;
//             TEMP_COLOR.a = cfg.textColor[3];
//             headUI.ui.title.fontColor = TEMP_COLOR;
//             if (playerId == Player.localPlayer.playerId) this.stageCfg = cfg;
//         }
//     }

//     /**
//      * 更新副称号
//      * @param playerId 玩家id
//      * @param cfg 文本信息
//      */
//     public updateSubRank(playerId: number, cfg: ISubLevelElement) {
//         if (cfg && this.uiMap.has(playerId)) {
//             const headUI = this.uiMap.get(playerId);
//             // mw.AssetUtil.asyncDownloadAsset(cfg.iconGuid).then(() => {
//             //     headUI.ui.image.imageGuid = cfg.iconGuid;
//             // })
//             if (cfg.stage) {
//                 headUI.ui.subTitle.text = cfg.stage;
//             } else {
//                 headUI.ui.subTitle.text = "";
//             }
//             TEMP_COLOR.r = cfg.textColor[0] / 255;
//             TEMP_COLOR.g = cfg.textColor[1] / 255;
//             TEMP_COLOR.b = cfg.textColor[2] / 255;
//             TEMP_COLOR.a = cfg.textColor[3];
//             headUI.ui.subTitle.fontColor = TEMP_COLOR;
//         }
//     }

//     /**
//      * 检测是否更新称号
//      * @param playerId 玩家id
//      * @param rankId 数值总和
//      * @param playerName 玩家名字
//      * @param isFirst 是否第一次进入
//      * @param isShow 是否显示
//      * @returns 
//      */
//     public checkUpRank(playerId: number, rankId: number, playerName: string, isFirst: boolean, isShow: boolean = true): void {
//         const rank = GameConfig.Level.getElement(rankId);
//         this.updateRank(playerId, rank);
//         if (!isShow) return;
//         if (!isFirst) {
//             if (rank.isShow) {
//                 // const str = StringUtil.format(GameConfig.Language.getElement("StageTips").Value, playerName, rank.stage, rank.percent);
//                 // GameNotice.showNotice(str);
//             }
//         } else {
//             if (rank.isWelcome) {
//                 // const str = StringUtil.format(GameConfig.Language.getElement("StageWelcomeTips").Value, playerName, rank.stage, rank.percent);
//                 // GameNotice.showNotice(str);
//             }
//         }

//     }

//     /**
//      * 检测是否更新副称号
//      * @param playerId 玩家id
//      * @param subRankId 副称号id
//      * @param playerName 玩家名字
//      * @param isFirst 是否第一次进入
//      * @param isShow 是否展示
//      */
//     public checkUpSubRank(playerId: number, subRankId: number, playerName: string, isFirst: boolean, isShow: boolean = true): void {
//         const rank = GameConfig.SubLevel.getElement(subRankId);
//         this.updateSubRank(playerId, rank);
//     }

//     // /**
//     //  * 修改玩家头顶称号UI位置
//     //  * @param playerid 玩家ID
//     //  * @param height 身高
//     //  * @param fourFeet 是否是四足
//     //  * @returns 
//     //  */
//     // public net_updateHeadPos(playerid: number, height: number, fourFeet: boolean) {
//     //     if (this.uiMap.has(playerid)) {
//     //         const headUI = this.uiMap.get(playerid);
//     //         if (!headUI) return;
//     //         let pos = new Vector(0, 0, 0);
//     //         if (fourFeet) {
//     //             let cfg = GameConfig.Height.getElement(height);
//     //             pos.z = cfg.BloodZ - 20;
//     //         }
//     //         headUI.uiWidget.localTransform.position = pos;
//     //     }
//     // }

// }
