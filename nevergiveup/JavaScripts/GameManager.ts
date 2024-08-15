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

export const ChatType = {
    Text: 1,
    Emoji: 2,
};

export namespace GameManager {
    let script: GameStart;
    export let players: Player[] = [];
    let stage: StageC;
    let stages: StageS[] = [];
    export let playerName: string = "";
    export let useEffect: boolean = true;
    export let showDamage: boolean = false;
    export let waveAmount: number = 10;

    export function init(gameStart: GameStart) {
        script = gameStart;

        if (SystemUtil.isServer()) {
            // 玩家加入游戏
            Player.onPlayerJoin.add((player) => {
                players.push(player);
                player.character.collisionWithOtherCharacterEnabled = false;
            });

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

            Event.addServerListener("onStageCreated", (playerIds: number[], id: number, stageCfgId: number) => {
                stage = new StageC(playerIds, id, stageCfgId);
                const waveUtil = new WaveUtil();
                waveUtil.clearCurrent(id);
                ModuleService.getModule(WaveModuleC).syncWaveUtil(stage.id, waveUtil);
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
                player.character.worldTransform.position = new Vector(413.769989, 151.25, 317.369995);
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
}
