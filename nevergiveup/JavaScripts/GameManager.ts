/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-04 11:02:29
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-19 13:39:49
 * @FilePath     : \nevergiveup\JavaScripts\GameManager.ts
 * @Description  : 修改描述
 */

import { Bubble } from "module_bubble";
import { EnemyActions, StageActions } from "./Actions";
import { DanmuManager } from "./Danmu/DanmuManager";
import GameStart from "./GameStart";
import { MapManager } from "./MapScript";
import CardModuleC from "./Modules/CardModule/CardModuleC";
import { PlayerUtil } from "./Modules/PlayerModule/PlayerUtil";
import { RankManager } from "./Rank/RankManager";
import { EStageState } from "./StageEnums";
import TowerUI from "./UI/Tower/TowerUI";
import { GameConfig } from "./config/GameConfig";
import { StageC, StageS, StageUtil } from "./stage/Stage";
import { WaveManager, WaveUtil } from "./stage/Wave";
import { MGSTool } from "./tool/MGSTool";
import { WaveModuleC } from "./Modules/waveModule/WaveModuleC";
import CardModuleS from "./Modules/CardModule/CardModuleS";
import { GlobalEventName } from "./const/enum";
import { TipsManager } from "./UI/Tips/CommonTipsManagerUI";
import { PlayerModuleS, StageState } from "./Modules/PlayerModule/PlayerModuleS";
import Gtk from "gtoolkit";
import PlayerModuleC from "./Modules/PlayerModule/PlayerModuleC";
import BuildItemUI from "./UI/BuildItemUI";
import { GlobalData } from "./const/GlobalData";
import { TowerModuleC } from "./Modules/TowerModule/TowerModuleC";

export const ChatType = {
    Text: 1,
    Emoji: 2,
};

export namespace GameManager {
    let script: GameStart;
    export let players: Player[] = [];
    export let allPlayers: Player[] = [];
    let stage: StageC;
    let stages: StageS[] = [];
    export let playerName: string = "";
    export let useEffect: boolean = true;
    export let showDamage: boolean = false;
    export let waveAmount: number = 10;
    export const allGuid = [
        "39E568CB",
        "3F2CB133",
        "06B7E697",
        "2ABA4967",
        "33FD8D2A",
        "25AF42F4",
        "10C7B636",
        "022CC035",
        "3D8E1E1F",
        "223C608D",
        "0929444E",
        "33A03C83",
        "3A88D662",
        "149281A6",
        "0072EA3F",
        "25A98146",
        "146B5105",
        "3F89A52C",
        "2821FFF8",
        "3401BF86",
        "25CD70E8",
        "1E537E03",
        "28CC211F",
        "341C6551",
        "25B682EA",
        "30813915",
        "3FFBBC52",
        "06E165C4",
        "3AAF57DF",
        "2E4107F7",
        "2045C9BF",
        "2F266725",
        "05705A45",
        "2A613312",
        "0D67B0DD",
        "2B149308",
        "2A41D2E4",
        "1A723CDE",
        "31937135",
        "1FE4C110",
        "0802E5E2",
        "34F010B5",
        "2468303F",
        "1433A962",
        "064826A1",
        "04DFC520",
        "23FFB744",
        "0AB58D37",
        "245A0D67",
        "3604803A",
    ];
    export const allGroupIndex = [
        10006, 10007, 10008, 10009, 10010, 10011, 10012, 10013, 10014, 10015, 10016, 10017, 10018, 10019, 10020, 10021,
        10022, 10023, 10024, 10025, 10026, 10027, 10028, 10029, 10030, 10031, 10032, 10033, 10034, 10035, 10036, 10037,
        10038, 10039, 10040, 10041, 10042, 10043, 10044, 10045, 10046, 10047, 10048, 10049, 10050, 10051, 10052, 10053,
        10054, 10055,
    ];

    export function init(gameStart: GameStart) {
        script = gameStart;

        if (SystemUtil.isServer()) {
            // 玩家加入游戏
            Player.onPlayerJoin.add((player) => {
                players.push(player);
                allPlayers.push(player);
                player.character.collisionWithOtherCharacterEnabled = false;
            });

            // Player.onPlayerLeave.add((player) => {
            //     const index = allPlayers.indexOf(player);
            //     if (index != -1) {
            //         players.splice(index, 1);
            //     }
            // });

            Event.addClientListener("startStage", (player: Player, stageCfgId: number) => {
                startGame([player.playerId], stageCfgId);
            });

            Event.addClientListener("boardcastMessage", (player: Player, message: string, type: number) => {
                if (players.indexOf(player) != -1) {
                    for (let i = 0; i < players.length; i++) {
                        Event.dispatchToClient(players[i], "boardcastMessage", player.playerId, message, type);
                    }
                }
            });
        } else {
            // RankManager.init();
            UIService.show(TowerUI);
            initNoticeBoard();

            Event.addServerListener(GlobalEventName.ServerStageState, (state: string) => {
                const stageState: StageState = JSON.parse(state);
                console.log(JSON.stringify(stageState), "广播的stageState");
                if (stageState?.groupIndex) {
                    const index = allGroupIndex.indexOf(stageState?.groupIndex);
                    const guid = allGuid[index];
                    GameObject.asyncFindGameObjectById(guid).then((obj) => {
                        if (Gtk.isNullOrUndefined(obj)) return;
                        setNoticeUI(obj, stageState);
                    });
                }
            });

            Event.addServerListener("onStageCreated", (playerIds: number[], id: number, stageCfgId: number) => {
                stage = new StageC(playerIds, id, stageCfgId);
                const waveUtil = new WaveUtil();
                waveUtil.clearCurrent(id);
                ModuleService.getModule(WaveModuleC).syncWaveUtil(stage.id, waveUtil);
                ModuleService.getModule(TowerModuleC).syncMaxSourceTower(1);
                StageActions.onStageCreated.call(id);
                StageActions.onPlayerCountChanged.call(stage.playerIds.length);
                WaveManager.init();
                let getPlayerLevels = () => stage.playerIds.map((id) => PlayerUtil.getPlayerScript(id)?.level);
                MGSTool.gameStart(
                    stage.stageCfgId,
                    stage.playerIds.length,
                    getPlayerLevels(),
                    ModuleService.getModule(CardModuleC).equipCards
                );
            });

            StageActions.onStageStateChanged.add((state: EStageState) => {
                if (state == EStageState.End) {
                    MapManager.destroy();
                    WaveManager.destroy();
                    let id = stage.id;
                    stage.destroy();
                    stage = null;
                    this.backToLobby();
                    StageActions.onStageEndClient.call(id);
                }
            });

            Event.addServerListener("setWaveCount", (amount: number) => {
                setWaveCount(amount);
            });

            EnemyActions.onBossDie.add(() => {
                if (stage) {
                    Event.dispatchToServer("onBossDie", stage.stageWorldIndex);
                }
            });

            Event.addServerListener("boardcastMessage", (playerId: number, message: string, type: number) => {
                let player = Player.getPlayer(playerId);
                if (player && player.character) {
                    if (type == ChatType.Text) {
                        Bubble.showBubble(0, message, player.character.gameObjectId, true);
                    }
                    let script = PlayerUtil.getPlayerScript(playerId);
                    if (script) {
                        DanmuManager.pushChat(script.playerName, message, type);
                    }
                }
            });
        }
    }

    export function onUpdate(dt) {
        if (SystemUtil.isServer()) {
            for (let i = 0; i < stages.length; i++) {
                stages[i].onUpdate(dt);
            }
        } else {
            if (stage) {
                stage.onUpdated(dt);
            }
        }
    }

    /**
     * 判断金币
     * @param amount 金币数量
     * @returns 是否满足
     */
    export function checkGold(amount: number): boolean {
        //TODO 金币这部分先不做服务器校验
        if (SystemUtil.isServer() || !stage) return false;
        if (stage.gold < amount) return false;
        return true;
    }

    /**
     * 花费金币
     * @param amount 金币数量
     * @returns 是否成功花费
     */
    export function spendGold(amount: number): boolean {
        //TODO 金币这部分先不做服务器校验
        if (SystemUtil.isServer() || !stage) return false;
        if (!checkGold(amount)) return false;
        stage.gold -= amount;
        return true;
    }

    /**
     * 增加金币
     * @param amount 金币数量
     */
    export function addGold(amount: number, worldLocation?: Vector) {
        //TODO 金币这部分先不做服务器校验
        if (stage) {
            if (worldLocation) {
                stage.setGold(stage.gold + amount, worldLocation);
            } else {
                stage.gold += amount;
            }
        }
    }

    export function startGame(playerIds: number[], stageCfgId: number) {
        console.log("#debug startGame stageCfgId:", stageCfgId);
        let gamePlayers = playerIds.map((playerId) => Player.getPlayer(playerId));
        let validGamePlayers = gamePlayers.filter((player) => players.indexOf(player) != -1);
        if (validGamePlayers.length == 0) return;

        // 昵称，等级，进行中的stageId（可以反查难度）出战阵容、
        const userName = PlayerUtil.getPlayerScript(validGamePlayers[0].playerId)?.playerName;
        const level = PlayerUtil.getPlayerScript(validGamePlayers[0].playerId)?.level;
        const stageCfg = GameConfig.Stage.getElement(stageCfgId);
        const difficulty = stageCfg.difficulty;
        const cards = ModuleService.getModule(CardModuleS).getPlayerEquipCards(validGamePlayers[0]);
        // 通过cards对应数据
        const stageState: StageState = {
            userName,
            level,
            difficulty,
            cards,
            stageCfgId,
            groupIndex: stageCfg.groupIndex,
            playerId: validGamePlayers[0].playerId,
        };
        // s端存储 和 广播
        ModuleService.getModule(PlayerModuleS).setStageState(stageState);
        for (let i = 0; i < allPlayers.length; i++) {
            Event.dispatchToClient(allPlayers[i], GlobalEventName.ServerStageState, JSON.stringify(stageState));
        }

        startStage(validGamePlayers, stageCfgId);
        for (let i = 0; i < players.length; i++) {
            if (validGamePlayers.indexOf(players[i]) != -1) {
                players.splice(i, 1);
                i--;
            }
        }
    }
    export function getScript(): GameStart {
        return script;
    }

    export function startStage(gamePlayers: Player[], stageCfgId: number) {
        // 初始化游戏
        let stage = new StageS(gamePlayers, stageCfgId);
        stages.push(stage);
    }

    export function getPlayerStage(player: Player): StageS {
        for (let i = 0; i < stages.length; i++) {
            if (stages[i].players.indexOf(player) != -1) {
                return stages[i];
            }
        }
        return null;
    }

    export function getStagePlayersClient(): number[] {
        if (!stage) return [];
        return stage.playerIds;
    }
    export function getStageClient(): StageC {
        return stage;
    }

    export function getStages(): StageS[] {
        return stages;
    }

    export function getStagePlayersServer(player: Player): number[] {
        let stage = getPlayerStage(player);
        if (!stage) return [];
        return stage.players.map((player) => player.playerId);
    }

    export function addPlayer(player) {
        if (players.indexOf(player) == -1) {
            players.push(player);
            PlayerUtil.getPlayerScript(player.playerId).id = -1;
        }
    }

    export function endStage(stage: StageS) {
        stage.destroy();
        StageActions.onStageEnd.call(stage);
        for (let i = 0; i < stages.length; i++) {
            if (stages[i].id == stage.id) {
                stages.splice(i, 1);
                i--;
            }
        }
    }

    export function setWaveCount(amount: number) {
        if (SystemUtil.isServer()) {
            waveAmount = amount;
            Event.dispatchToAllClient("setWaveCount", amount);
        } else {
            waveAmount = amount;
        }
    }

    export function backToLobby() {
        Player.asyncGetLocalPlayer().then((player) => {
            const stageCfg = StageUtil.getStageCfgById(MapManager.stageCfgId);
            if (stageCfg.resetPosition) {
                player.character.worldTransform.position = stageCfg?.resetPosition.clone();
            } else {
                player.character.worldTransform.position = GlobalData.Global.resetWorldPosition.clone();
            }
        });
    }

    export function getDifficulty(): number {
        if (stage) {
            return stage.difficulty;
        }
        return 0;
    }

    export function getStageConfig() {
        if (stage) {
            const cfg = StageUtil.getStageCfgById(stage.stageCfgId);
            return cfg ?? null;
        }
        return null;
    }

    export function getMultiplayerMultiplier() {
        if (stage && stage.playerIds.length > 1) {
            return GameConfig.Global.getElement(1).multipleplayer[stage.playerIds.length - 2];
        }
        return 1;
    }

    export function startGameClient(stageCfgId: number) {
        Event.dispatchToServer("startStage", stageCfgId);
    }

    export function leaveStageClient() {
        Event.dispatchToServer("clientLeaveStage");
    }

    export function boardcastMessage(message: string, type: number = ChatType.Text) {
        Event.dispatchToServer("boardcastMessage", message, type);
    }

    export function initNoticeBoard() {
        for (let i = 0; i < allGuid.length; i++) {
            const guid = allGuid[i];
            GameObject.asyncFindGameObjectById(guid).then(async (obj) => {
                if (Gtk.isNullOrUndefined(obj)) return;
                const groupIndex = Number(obj.name);
                const stageState = await ModuleService.getModule(PlayerModuleC).getStageStateById(groupIndex);
                // GameConfig.Language.getElement("Text_insufficientStamina").Value
                let UIWidget = obj as mw.UIWidget;
                (
                    UIWidget.getTargetUIWidget().rootContent.findChildByPath(
                        "playingCanvas/canvasPlayerInfo/textName"
                    ) as mw.TextBlock
                ).text = GameConfig.Language.getElement("BuildText_1").Value;
                (
                    UIWidget.getTargetUIWidget().rootContent.findChildByPath("playingCanvas/textBuild") as mw.TextBlock
                ).text = GameConfig.Language.getElement("BuildText_2").Value;
                (
                    UIWidget.getTargetUIWidget().rootContent.findChildByPath("playingCanvas/textStatus") as mw.TextBlock
                ).text = GameConfig.Language.getElement("BuildText_3").Value;
                setNoticeUI(obj, stageState);
            });
        }
    }

    export function setNoticeUI(obj: mw.GameObject, stageState: StageState | null) {
        let UIWidget = obj as mw.UIWidget;
        // if (stageState?.playerId) {
        //     // todo 进行ui展示
        //     const cards = stageState.cards;
        //     const cardsInfos = cards.map((card) => {
        //         return GameConfig.Tower.getElement(card);
        //     });
        //     TipsManager.showTips(
        //         `${stageState?.userName} started game ${stageState.stageCfgId} with ${stageState.difficulty}`
        //     );
        // } else {
        //     const groupIndex = stageState?.groupIndex;
        //     if (groupIndex) {
        //         // todo 进行初始化ui的模式
        //         TipsManager.showTips(`game ${stageState.stageCfgId} end`);
        //     }
        // }
        if (stageState && stageState?.playerId) {
            // 有人游玩
            Gtk.trySetVisibility(
                UIWidget.getTargetUIWidget().rootContent.findChildByPath("playingCanvas") as mw.Canvas,
                mw.SlateVisibility.Visible
            );
            Gtk.trySetVisibility(
                UIWidget.getTargetUIWidget().rootContent.findChildByPath("canvasFight") as mw.Canvas,
                mw.SlateVisibility.Hidden
            );
            const cards = stageState.cards;
            console.log(JSON.stringify(cards), "cards");
            const canvasBuildItem = UIWidget.getTargetUIWidget().rootContent.findChildByPath(
                "playingCanvas/canvasBuildItem"
            ) as mw.Canvas;
            canvasBuildItem.removeAllChildren();
            for (let i = 0; i < cards.length; i++) {
                const id = cards[i];
                const item = UIService.create(BuildItemUI);
                item.init(id);
                canvasBuildItem.addChild(item.uiObject);
            }
            const difficultText = switchDifficultToText(stageState.difficulty);
            (
                UIWidget.getTargetUIWidget().rootContent.findChildByPath(
                    "playingCanvas/textDifficultly"
                ) as mw.TextBlock
            ).text = difficultText;
            (
                UIWidget.getTargetUIWidget().rootContent.findChildByPath(
                    "playingCanvas/canvasPlayerInfo/textPlayerName"
                ) as mw.TextBlock
            ).text = stageState?.userName || "";
            (
                UIWidget.getTargetUIWidget().rootContent.findChildByPath(
                    "playingCanvas/canvasPlayerInfo/imgLvBg/textLv"
                ) as mw.TextBlock
            ).text = `Lv.${(stageState?.level || 0)?.toString()}`;
        } else {
            // 无人游玩
            Gtk.trySetVisibility(
                UIWidget.getTargetUIWidget().rootContent.findChildByPath("playingCanvas") as mw.Canvas,
                mw.SlateVisibility.Hidden
            );
            Gtk.trySetVisibility(
                UIWidget.getTargetUIWidget().rootContent.findChildByPath("canvasFight") as mw.Canvas,
                mw.SlateVisibility.Visible
            );
            (
                UIWidget.getTargetUIWidget().rootContent.findChildByPath("playingCanvas/canvasBuildItem") as mw.Canvas
            ).removeAllChildren();
        }
    }

    export function switchDifficultToText(difficult: number) {
        if (difficult == 0) {
            return "简单";
        } else if (difficult == 1) {
            return "普通";
        } else if (difficult == 2) {
            return "困难";
        } else {
            return "";
        }
    }
}
