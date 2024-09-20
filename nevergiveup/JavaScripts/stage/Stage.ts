/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-04 11:33:20
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 17:42:56
 * @FilePath     : \nevergiveup\JavaScripts\stage\Stage.ts
 * @Description  : 修改描述
 */

import { EnemyActions, RankActions, StageActions } from "../Actions";
import { AirdropManager } from "../Airdrop/AirdropManager";
import { GameManager } from "../GameManager";
import { MapManager } from "../MapScript";
import CardModuleS from "../Modules/CardModule/CardModuleS";
import { EnergyModuleS } from "../Modules/Energy/EnergyModule";
import PlayerModuleC from "../Modules/PlayerModule/PlayerModuleC";
import { PlayerModuleS } from "../Modules/PlayerModule/PlayerModuleS";
import { PlayerUtil } from "../Modules/PlayerModule/PlayerUtil";
import { TowerManager } from "../Modules/TowerModule/TowerManager";
import { TowerModuleC } from "../Modules/TowerModule/TowerModuleC";
import { AuthModuleS } from "../Modules/auth/AuthModule";
import { DragonDataModuleS } from "../Modules/dragonData/DragonDataModuleS";
import TalentUtils from "../Modules/talent/TalentUtils";
import { WaveModuleC } from "../Modules/waveModule/WaveModuleC";
import { RankItem } from "../Rank/RankManager";
import { baseHp } from "../StageConfig";
import { EStageState, WaveConfig } from "../StageEnums";
import { StageListener } from "../StageListener";
import { TweenCommon } from "../TweenCommon";
import CutsceneUI from "../UI/CutsceneUI";
import LobbyUI from "../UI/LobbyUI";
import { TipsManager } from "../UI/Tips/CommonTipsManagerUI";
import { LastWaveTipsUI } from "../UI/Tips/LastWaveTipsUI";
import TowerUI from "../UI/Tower/TowerUI";
import { GuideDialog } from "../UI/UIDialog";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { IStageElement } from "../config/Stage";
import GameServiceConfig from "../const/GameServiceConfig";
import Log4Ts from "mw-log4ts";
import { Enemy } from "../enemy/EnemyBase";
import { BaseState } from "../fsm/BaseState";
import { Fsm } from "../fsm/Fsm";
import EnvironmentManager from "../gameplay/interactiveObj/EnvironmentManager";
import { EEnemyComponentType } from "../tool/Enum";
import { MGSTool } from "../tool/MGSTool";
import { SoundUtil } from "../tool/SoundUtil";
import { Wave, WaveAirdrop, WaveManager, WaveUtil } from "./Wave";
import { UIMain } from "./ui/UIMain";
import { SettleData, UISettle } from "./ui/UISettle";
import { GlobalEventName } from "../const/enum";

type DeathData = {
    id: number;
    wave: number;
};

type EscapeData = {
    id: number;
    wave: number;
    escapeDamage: number;
};

export class StageS {
    private _fsm: StageFSM;
    public id: number;
    private static counter: number = 0;
    private _deadIds: number[] = [];
    currentWaveDeadIds: number[] = [];
    private _hp: number;
    private _maxHp: number;
    stageWorldIndex: number;
    stageCfgId: number;
    stageCfg: IStageElement;
    cumulativeCount: number = 0;
    currentWaveCount: number = 0;
    currentWave: number = 1;
    currentSkippingPlayers: Player[] = [];
    skipped: boolean = false;
    speedMultipler: number = 1;
    rankItems: RankItem[] = [];

    settleData: SettleData = {
        hasWin: false,
        isPerfect: false,
        isFirst: false,
        time: 0,
        waves: 0,
        wavesMax: 0,
        reward: [],
    };
    // 对局时间
    time: number = 0;
    difficulty: number = 0;
    private _syncTimer: number = 0;
    private _shouldSync: boolean = false;
    private _tempDeadIds: number[] = [];
    private _tempEscapeIds: number[] = [];

    constructor(public players: Player[], stageCfgId: number) {
        this._fsm = new StageFSM(this);
        StageS.counter++;
        this.id = StageS.counter;
        this.stageCfgId = stageCfgId;
        const stageCfg = StageUtil.getStageCfgById(stageCfgId);
        this.stageCfg = stageCfg;
        this.stageWorldIndex = stageCfg?.index ?? 0;
        this.difficulty = stageCfg?.difficulty ?? 0;
        this._fsm.start();
        this.boardcast((player) => {
            Event.dispatchToClient(
                player,
                "onStageCreated",
                this.players.map((player) => player.playerId),
                this.id,
                this.stageCfgId
            );
            PlayerUtil.getPlayerScript(player.playerId).id = this.id;

            let script = PlayerUtil.getPlayerScript(player.playerId);
            let rankItem: RankItem = {
                userId: player.userId,
                name: script.playerName,
                gold: 0,
                damage: 0,
            };
            this.rankItems.push(rankItem);
        });
        this.initHp(players);
        // this._hp = baseHp;
        this.cumulativeCount = 0;
        this.currentWaveCount = 0;
        this._deadIds = [];
        this.currentWaveDeadIds = [];
        this.currentSkippingPlayers = [];
        this.registerListeners();
        // this.updateRankItems();
        ModuleService.getModule(DragonDataModuleS).initData(players);
    }

    initHp(players: Player[]) {
        // 天赋树和龙娘血量加成
        const bh = this.stageCfgId === 7001 ? 1000000 : baseHp;
        for (let index = 0; index < players.length; index++) {
            const player = players[index];
            const userHP = TalentUtils.getModuleSRunesValueById(1003, player);
            const userHP2 = TalentUtils.getModuleSRunesValueById(1027, player);
            const userHPD = TalentUtils.getModuleSRunesValueById(2005, player);
            const userHPInfinite = TalentUtils.getModuleSRunesValueById(1049, player);
            this._hp = Math.floor(bh + userHP + userHP2 + userHPD + userHPInfinite);
            this._maxHp = this._hp;
        }
    }

    registerListeners() {
        StageActions.onStageStateChanged.add((state, stageId: number, ...param: number[]) => {
            if (stageId == this.id) {
                if (state == EStageState.End) {
                    GameManager.endStage(this);
                    // 广播数据和清除数据
                    const stageState = {
                        groupIndex: this.stageCfg.groupIndex,
                    };
                    // ModuleService.getModule(PlayerModuleS).setStageState(stageState);
                    for (let i = 0; i < GameManager.allPlayers.length; i++) {
                        Event.dispatchToClient(
                            GameManager.allPlayers[i],
                            GlobalEventName.ServerStageState,
                            JSON.stringify(stageState)
                        );
                    }
                    this.boardcast((player) => {
                        GameManager.addPlayer(player);
                    });
                } else if (state == EStageState.Settle) {
                    this.boardcast((player) => {
                        this.updateSettleData(player);
                        Event.dispatchToClient(
                            player,
                            "onStageStateChanged",
                            state,
                            this.settleData.hasWin,
                            this.settleData.isPerfect,
                            this.settleData.isFirst,
                            this.settleData.time,
                            this.settleData.waves,
                            this.settleData.wavesMax,
                            this.settleData.reward.map((reward) => reward.guid),
                            this.settleData.reward.map((reward) => reward.amount),
                            this.settleData.reward.map((reward) => reward.type),
                            this._hp
                        );
                    });
                }

                if (state != EStageState.Settle) {
                    this.boardcast((player) => {
                        Event.dispatchToClient(player, "onStageStateChanged", state, ...param);
                    });
                }
            }
        });
        StageListener.addClientListener(
            this.id,
            "onDie",
            (player: Player, enemyIds: number[], waveIds: number[], stageId: number) => {
                if (stageId == this.id) {
                    for (let i = 0; i < enemyIds.length; i++) {
                        let enemyId = enemyIds[i];
                        let waveId = waveIds[i];
                        if (this._deadIds.indexOf(enemyId) == -1) {
                            this._deadIds.push(enemyId);
                            if (this._tempDeadIds.indexOf(enemyId) == -1) {
                                this._tempDeadIds.push(enemyId);
                            }
                            this.onCountChanged();
                        }

                        if (this.currentWave - 1 == waveId) {
                            if (this.currentWaveDeadIds.indexOf(enemyId) == -1) {
                                this.currentWaveDeadIds.push(enemyId);
                                this.onCurrentWaveCountChanged();
                            }
                        }
                    }
                }
            }
        );

        StageListener.addClientListener(
            this.id,
            "onEscaped",
            (player: Player, enemyIds: number[], waveIds: number[], damages: number[], stageId: number) => {
                if (stageId == this.id) {
                    for (let i = 0; i < enemyIds.length; i++) {
                        let enemyId = enemyIds[i];
                        let waveId = waveIds[i];
                        let damage = damages[i];
                        if (this._deadIds.indexOf(enemyId) == -1) {
                            this._deadIds.push(enemyId);
                            if (this._tempEscapeIds.indexOf(enemyId) == -1) {
                                this._tempEscapeIds.push(enemyId);
                            }
                            this.onCountChanged();
                            this._hp -= damage;
                            if (this._hp <= 0) {
                                // 本营死亡
                                this.settleData.hasWin = false;
                                this._fsm.changeState(SettleState, false);
                                return;
                            }
                        }

                        if (this.currentWave - 1 == waveId) {
                            if (this.currentWaveDeadIds.indexOf(enemyId) == -1) {
                                this.currentWaveDeadIds.push(enemyId);
                                this.onCurrentWaveCountChanged();
                            }
                        }
                    }
                    this.boardcast((player) => {
                        Event.dispatchToClient(player, "setStageHp", this._hp, this._maxHp);
                    });
                }
            }
        );

        StageListener.addClientListener(this.id, "gmEndGame", (player: Player, id: number) => {
            if (id == this.id) {
                this._fsm.changeState(EndState);
            }
        });

        StageListener.addClientListener(this.id, "skipWave", (player: Player, id: number, isSkip: boolean) => {
            if (id == this.id) {
                if (isSkip && this.currentSkippingPlayers.indexOf(player) == -1) {
                    this.currentSkippingPlayers.push(player);

                    this.boardcast((player) => {
                        Event.dispatchToClient(
                            player,
                            "updateSkipWave",
                            this.currentSkippingPlayers.length,
                            this.players.length
                        );
                    });

                    if (this.currentSkippingPlayers.length >= Math.ceil(this.players.length / 2)) {
                        this._fsm.changeState(WaitState, 5, this.currentWave);
                    }
                }

                if (!isSkip && this.currentSkippingPlayers.indexOf(player) != -1) {
                    this.currentSkippingPlayers.splice(this.currentSkippingPlayers.indexOf(player), 1);

                    this.boardcast((player) => {
                        Event.dispatchToClient(
                            player,
                            "updateSkipWave",
                            this.currentSkippingPlayers.length,
                            this.players.length
                        );
                    });
                }
            }
        });

        Event.addClientListener("speedUp", (player: Player, id: number, speedMultipler: number) => {
            if (this.id == id) {
                this.speedMultipler = speedMultipler;
                this.boardcast((player) => {
                    Event.dispatchToClient(player, "speedUp", speedMultipler);
                });
            }
        });

        Player.onPlayerLeave.add((player: Player) => {
            if (this.players.indexOf(player) != -1) {
                StageActions.onPlayerLeaveStage.call(player);
                this.players.splice(this.players.indexOf(player), 1);
                this.onPlayerLaveGame(player);
            }

            if (this.currentSkippingPlayers.indexOf(player) != -1) {
                this.currentSkippingPlayers.splice(this.currentSkippingPlayers.indexOf(player), 1);

                this.boardcast((player) => {
                    Event.dispatchToClient(
                        player,
                        "updateSkipWave",
                        this.currentSkippingPlayers.length,
                        this.players.length
                    );
                });
            }
        });

        StageListener.addClientListener(this.id, "clientLeaveStage", (player: Player) => {
            if (this.players.indexOf(player) != -1) {
                this.players.splice(this.players.indexOf(player), 1);
                GameManager.addPlayer(player);
                Event.dispatchToClient(player, "onStageStateChanged", EStageState.End);
                this.onPlayerLaveGame(player);
            }
        });

        StageListener.addClientListener(
            this.id,
            "boardcastMessage",
            (boardcastPlayer: Player, message: string, type: number) => {
                if (this.players.indexOf(boardcastPlayer) != -1) {
                    this.boardcast((player) => {
                        Event.dispatchToClient(player, "boardcastMessage", boardcastPlayer.playerId, message, type);
                    });
                }
            }
        );

        StageListener.addClientListener(
            this.id,
            "updateRankData",
            (player: Player, id: number, gold: number, damage: number) => {
                if (this.id == id) {
                    let rankItem = this.rankItems.find((rankItem) => rankItem.userId == player.userId);
                    rankItem.name = PlayerUtil.getPlayerScript(player.playerId).playerName;
                    rankItem.gold = gold;
                    rankItem.damage = damage;
                    this._shouldSync = true;
                }
            }
        );
    }

    onPlayerLaveGame(player: Player) {
        this.onPlayerCountChanged();
        if (this.players.length > 0) {
            this.rankItems = this.rankItems.filter((rankItem) => {
                return rankItem.userId != player.userId;
            });
        }
    }

    // updateRankItems() {
    //     this._shouldSync = false;
    //     this.rankItems.sort((a, b) => {
    //         return b.damage - a.damage;
    //     });
    //     this.boardcast((player) => {
    //         Event.dispatchToClient(
    //             player,
    //             "updateRankItems",
    //             this.rankItems.map((rankItem) => rankItem.userId),
    //             this.rankItems.map((rankItem) => rankItem.name),
    //             this.rankItems.map((rankItem) => rankItem.gold),
    //             this.rankItems.map((rankItem) => rankItem.damage)
    //         );
    //     });
    // }

    onPlayerCountChanged() {
        if (this.players.length == 0) {
            this._fsm.changeState(EndState);
            return;
        }
        this.boardcast((player) => {
            Event.dispatchToClient(
                player,
                "onPlayerCountChanged",
                this.players.map((player) => player.playerId)
            );
        });
    }

    boardcast(func: (player: Player) => void) {
        for (let i = 0; i < this.players.length; i++) {
            func(this.players[i]);
        }
    }

    onUpdate(dt: number) {
        if (this._fsm) {
            this.time += dt;
            this._fsm.onUpdate(dt);
            this.periodicSync(dt);
        }
    }

    periodicSync(dt: number) {
        this._syncTimer += dt;
        if (this._syncTimer > 3) {
            if (this._tempDeadIds.length > 0) {
                Event.dispatchToServer("onDie", this._tempDeadIds, this.id);
                this._tempDeadIds = [];
                this._syncTimer = 0;
            }

            if (this._tempEscapeIds.length > 0) {
                Event.dispatchToServer("onEscaped", this._tempEscapeIds, this.id);
                this._tempEscapeIds = [];
                this._syncTimer = 0;
            }

            // if (this._shouldSync) {
            //     this.updateRankItems();
            // }
        }
    }

    onCountChanged() {
        if (this._deadIds.length == this.cumulativeCount) {
            const [, length] = WaveUtil.fitOldConfig(this.stageCfgId);
            if (this.currentWave >= length) {
                this._fsm.changeState(SettleState, true);
            } else {
                this._fsm.changeState(WaitState, 5, this.currentWave);
            }
        }
    }

    onCurrentWaveCountChanged() {
        if (this.skipped) return;
        if (this.currentWaveDeadIds.length >= this.currentWaveCount * GameConfig.Global.getElement(1).skipWaveCount) {
            this.skipped = true;
            this.boardcast((player) => {
                Event.dispatchToClient(player, "canSkipWave", 0, this.players.length);
            });
        }
    }

    destroy() {
        StageListener.removeAllListeners(this.id);
    }

    updateSettleData(player: Player) {
        this.settleData.time = this.time;
        this.settleData.waves = this.settleData.hasWin ? this.currentWave : this.currentWave - 1;
        const [, length] = WaveUtil.fitOldConfig(this.stageCfgId);
        this.settleData.wavesMax = length;
        const stageConfig = StageUtil.getStageCfgById(this.stageCfgId);
        const index = stageConfig.index;
        const difficulty = stageConfig.difficulty;
        const unique = Number(index.toString() + difficulty.toString());
        let rewards = [];
        if (this.settleData.hasWin) {
            if (this._hp == this._maxHp) {
                this.settleData.isPerfect = true;
                // 完美胜利
                let isFirst = ModuleService.getModule(PlayerModuleS).setPerfectWin(player, unique);
                // 既是完美胜利的首次，也是普通胜利的首次
                const isNotPerfectFirst = ModuleService.getModule(PlayerModuleS).setWin(player, unique);
                this.settleData.isFirst = isFirst;
                if (isFirst && isNotPerfectFirst) {
                    rewards = [...stageConfig.firstRewardPerfect, ...stageConfig.firstRewardNormal];
                } else if (isFirst && !isNotPerfectFirst) {
                    rewards = stageConfig.firstRewardPerfect;
                } else {
                    rewards = stageConfig.followRewardPerfect;
                }
            } else {
                // 普通胜利
                let isFirst = ModuleService.getModule(PlayerModuleS).setWin(player, unique);
                this.settleData.isFirst = isFirst;
                if (isFirst) {
                    rewards = stageConfig.firstRewardNormal;
                } else {
                    rewards = stageConfig.followRewardNormal;
                }
            }
        } else {
            // 失败
            rewards = stageConfig.failReward;
        }

        this.settleData.reward = [];
        for (let i = 0; i < rewards.length; i++) {
            let [id, amount] = rewards[i];
            let item = GameConfig.Item.getElement(id);
            if (item.itemType == 1) {
                // 金币
                this.settleData.reward.push({ guid: item.itemImgGuid, amount: amount, type: item.itemType });
                ModuleService.getModule(PlayerModuleS).changeGold(player, amount);
            } else if (item.itemType == 2) {
                // 卡牌
                let card = GameConfig.Tower.getElement(item.itemTypeid);
                this.settleData.reward.push({ guid: card.imgGuid, amount: amount, type: item.itemType });
                // TODO: 实际添加卡牌
                ModuleService.getModule(CardModuleS).giveCard(player, card.id);
            } else if (item.itemType == 3) {
                // 科技点
                this.settleData.reward.push({ guid: item.itemImgGuid, amount: amount, type: item.itemType });
                ModuleService.getModule(PlayerModuleS).changeTechPoint(player, amount);
            } else if (item.itemType == 4) {
                // 经验
                this.settleData.reward.push({ guid: item.itemImgGuid, amount: amount, type: item.itemType });
                ModuleService.getModule(PlayerModuleS).changeExp(player, amount);
            }
        }
        if (!this.settleData.hasWin) {
            // 返还体力
            this.settleData.reward.push({
                guid: "376844",
                amount: GameServiceConfig.STAMINA_BACK_START_GAME,
                type: null,
            });
            ModuleService.getModule(EnergyModuleS).addEnergy(player.userId, GameServiceConfig.STAMINA_BACK_START_GAME);
        }
    }

    addGold(amount: number) {
        this.boardcast((player) => {
            Event.dispatchToClient(player, "addGold", amount);
        });
    }

    addPlayerGold(amount: number, player: Player) {
        Event.dispatchToClient(player, "addGold", amount);
    }

    addHp(hp: number) {
        if (this._hp === this._maxHp) {
            return;
        }
        if (this._hp + hp >= this._maxHp) {
            // 回血回满
            this._hp = this._maxHp;
            this.boardcast((player) => {
                Event.dispatchToClient(player, "setStageHp", this._maxHp, this._maxHp);
            });
        } else {
            this._hp = this._hp + hp;
            this.boardcast((player) => {
                Event.dispatchToClient(player, "setStageHp", this._hp, this._maxHp);
            });
        }
    }
}

export class StageC {
    state: EStageState = EStageState.Game;
    duration: number = 0;
    playerIds: number[] = [];
    stage: GameObject;
    id: number;
    stageCfgId: number; // configId
    stageWorldIndex: number;
    difficulty: number;
    speedMultipler: number = 1;
    hasLoaded: boolean = false;
    currentWave: number = 0;
    hp: number = baseHp;
    unlockedTechNodes: { [id: number]: number } = {};
    techNodeMap: { [id: number]: number[] } = {};

    private _gold: number = 0;
    private _damage: number = 0;
    private _dataChanged: boolean = false;
    private _timer = 0;
    private _rankTimer = 0;
    private _currentDeathData: DeathData[] = [];
    private _currentEscapeData: EscapeData[] = [];
    private _lastMonster: number = null;
    private _spent: number = 0;
    // private _rankItems: RankItem[] = [];
    public get gold(): number {
        return this._gold;
    }

    public set gold(value: number) {
        this.setGold(value);
    }

    public setGold(value: number, worldLocation?: Vector) {
        if (this._gold > value) {
            this._spent += this._gold - value;
            this._gold = value;
            this._dataChanged = true;
            StageActions.onGoldChanged.call(this._gold);
        } else {
            if (worldLocation) {
                TweenCommon.addGoldAnim(value - this._gold, worldLocation, new Vector2(0, -50), () => {
                    StageActions.onGoldChanged.call(this._gold);
                });
                this._gold = value;
                this._dataChanged = true;
            } else {
                this._gold = value;
                this._dataChanged = true;
                StageActions.onGoldChanged.call(this._gold);
            }
        }
    }

    public get damage(): number {
        return this._damage;
    }

    public set damage(value: number) {
        this._damage = value;
        this._dataChanged = true;
    }

    constructor(playerIds: number[], id: number, stageCfgId: number) {
        this.id = id;
        this.playerIds = playerIds;
        this.stageCfgId = stageCfgId;
        const stageConfig = StageUtil.getStageCfgById(stageCfgId);
        this.difficulty = stageConfig?.difficulty ?? 0;
        this.currentWave = 0;
        this.stageWorldIndex = stageConfig?.index ?? 0;
        this.gold = 0;
        // todo 天赋树和龙娘血量加成
        const userHP = TalentUtils.getModuleCRunesValueById(1003);
        const userHP2 = TalentUtils.getModuleCRunesValueById(1027);
        const userHPD = TalentUtils.getModuleCRunesValueById(2005);
        const userHPInfinite = TalentUtils.getModuleCRunesValueById(1049);
        const bh = stageCfgId === 7001 ? 1000000 : baseHp;
        this.hp = Math.floor(bh + userHP + userHP2 + userHPD + userHPInfinite);
        ModuleService.getModule(PlayerModuleC)
            .getUnlockTechNodeMap(playerIds)
            .then((res: { [key: number]: number[] }) => {
                this.unlockedTechNodes = ModuleService.getModule(PlayerModuleC).getUnlockTechNodes(res);
                this.techNodeMap = res;
            });
        Enemy.count = 0;

        // UIService.show(CutsceneUI, () => {
        Player.asyncGetLocalPlayer().then((player: Player) => {
            GameManager.backToLobby();
        });

        GameObject.asyncSpawn(stageConfig.guid).then((go: GameObject) => {
            this.stage = go;
            MapManager.stageCfgId = this.stageCfgId;
        });
        // });

        this.registerListeners();
        this.playBGM();
    }

    getUnlockedTechNodes(playerId: number): number[] {
        if (this.techNodeMap[playerId] == null) {
            return [];
        }
        return this.techNodeMap[playerId];
    }

    registerListeners() {
        EnemyActions.onDie.add((enemy: Enemy) => {
            // this.gold += enemy.goldAmount;
            GameManager.addGold(enemy.goldAmount, enemy.position);

            this._currentDeathData.push({
                id: enemy.id,
                wave: enemy.wave,
            });

            MGSTool.goldChange(3, enemy.goldAmount, 3);
        });

        EnemyActions.onEscaped.add((enemy: Enemy) => {
            this._currentEscapeData.push({
                id: enemy.id,
                wave: enemy.wave,
                escapeDamage: enemy.escapeDamage,
            });
            this._lastMonster = enemy.configId;
        });

        StageActions.onMapLoaded.add(() => {
            const stageCfg = GameConfig.Stage.getElement(this.stageCfgId);
            if (stageCfg?.sceneEnvId) {
                EnvironmentManager.getInstance().setEnvironment(stageCfg.sceneEnvId);
                Log4Ts.log(
                    StageC,
                    "stage onMapLoaded stage:" +
                        this.stageCfgId +
                        " difficulty:" +
                        this.difficulty +
                        " sceneEnvId:" +
                        stageCfg.sceneEnvId
                );
            }
            Player.asyncGetLocalPlayer().then((player: Player) => {
                player.character.worldTransform.position = MapManager.birthPosition.clone().add(new Vector(0, 0, 100));
                player.character.worldTransform.rotation = MapManager.birthRotation.clone();
                let point = MapManager.getRoadPositions(0);
                if (point && point[0]) {
                    let [x, y, z] = point[0];
                    Utils.faceCameraToTarget(new Vector(x, y, z - 300));
                }
            });
            this.hasLoaded = true;
            // UIService.getUI(CutsceneUI).hideCanvas();
            UIService.getUI(TowerUI).setStageTowerUI(true);
        });

        StageListener.addServerListener(this.id, "setStageHp", (hp: number, maxHP: number) => {
            let ui = UIService.getUI(UIMain);
            this.hp = hp;
            ui.setHp(hp, maxHP);
        });

        let ui = UIService.getUI(UIMain);
        ui.setHp(this.hp, this.hp);

        StageListener.addServerListener(this.id, "onStageStateChanged", (state: EStageState, ...param: any[]) => {
            this.state = state;

            let ui = UIService.getUI(UIMain);
            if (this.state == EStageState.Game) {
                this.duration = param[0];
                let wave = param[1];
                this.currentWave = wave;
                const [waveContent, waveMax] = WaveUtil.fitOldConfig(this.stageCfgId, wave, true, this.id);
                // let waves: WaveConfig[] =
                //     STAGE_CONFIG[StageUtil.getIndexFromIdAndDifficulty(this.stageIndex, this.difficulty)].waves;
                // let waveMax = waves.length;
                ui.setTimer(this.duration);
                ui.setWave(wave, waveMax);

                WaveManager.addWave(new Wave(waveContent, wave - 1));
                // if (waveContent.airDrop) {
                //     WaveManager.addAirdrop(new WaveAirdrop(waveContent.airDrop));
                // }
                // WaveManager.addWave(new Wave(waves[wave - 1]));
                // if (waves[wave - 1].airDrop) {
                //     WaveManager.addAirdrop(new WaveAirdrop(waves[wave - 1].airDrop));
                // }
            } else if (this.state == EStageState.Wait) {
                this.duration = param[0];
                let mainUI = UIService.getUI(UIMain);
                if (!mainUI.visible) {
                    UIService.show(UIMain);
                }
                UIService.hide(LobbyUI);
                ui.setTimer(this.duration);

                // let config = NEW_STAGE_CONFIG[StageUtil.getIndexFromIdAndDifficulty(this.stageId, this.difficulty)];
                // let currentWave = config.waves(this.currentWave + 1);
                // console.log(this.currentWave, "this.currentWave");
                const [currentWave, waveMax] = WaveUtil.fitOldConfig(this.stageCfgId, this.currentWave + 1);

                if (currentWave) {
                    MGSTool.goldChange(3, currentWave.waveGold, 4);
                    let hasBoss = false;
                    for (let i = 0; i < currentWave.enemies.length; i++) {
                        let enemyType = currentWave.enemies[i].type;
                        let enemyCfg = GameConfig.Monster.getElement(enemyType);
                        if (enemyCfg && enemyCfg.types && enemyCfg.types.includes(EEnemyComponentType.Boss)) {
                            hasBoss = true;
                        }
                    }
                    if (hasBoss) {
                        let isLast = this.currentWave == waveMax - 1;
                        TipsManager.showWaveTips(GameConfig.Language.getElement("Text_MonsterComing").Value, 48, () => {
                            if (isLast) {
                                TipsManager.showWaveTips(
                                    GameConfig.Language.getElement("Text_LastWave").Value,
                                    64,
                                    () => {
                                        UIService.hide(LastWaveTipsUI);
                                    }
                                );
                            } else {
                                TipsManager.showWaveTips(
                                    GameConfig.Language.getElement("Text_BossComing").Value,
                                    64,
                                    () => {
                                        UIService.hide(LastWaveTipsUI);
                                    }
                                );
                            }
                        });
                    }
                }
            } else if (this.state == EStageState.Settle) {
                let [hasWin, isPerfect, isFirst, time, waves, wavesMax, rewardGuids, rewardAmounts, rewardTypes, hp] =
                    param;
                GuideDialog.hide();
                ModuleService.getModule(PlayerModuleC).onStageCompleted(isPerfect, this.stageWorldIndex);
                if (hasWin) {
                    if (isPerfect) {
                        StageActions.onStagePerfectWin.call(this.stageWorldIndex);
                        StageActions.onStageWin.call(this.stageWorldIndex);
                    } else {
                        StageActions.onStageWin.call(this.stageWorldIndex);
                    }
                    SoundUtil.PlaySoundById(2008);
                } else {
                    SoundUtil.PlaySoundById(2009);
                }
                StageActions.onStageComplete.call(this.stageWorldIndex);
                let settleData: SettleData = {
                    hasWin: hasWin,
                    isFirst: isFirst,
                    isPerfect: isPerfect,
                    time: time,
                    waves: waves,
                    wavesMax: wavesMax,
                    reward: rewardGuids.map((guid, index) => {
                        return { guid: guid, amount: rewardAmounts[index], type: rewardTypes[index] };
                    }),
                };
                TimeUtil.delayExecute(() => {
                    let rewardGold = settleData.reward.find((v) => v.type == 1);
                    if (rewardGold) {
                        rewardGold.amount += AirdropManager.gameGold;
                    } else {
                        settleData.reward.push({
                            guid: GameConfig.Item.getElement(1).itemImgGuid,
                            amount: AirdropManager.gameGold,
                            type: 1,
                        });
                    }

                    // MGSTool.gameOver(
                    //     waves,
                    //     this.stageId,
                    //     hasWin,
                    //     isFirst,
                    //     isPerfect,
                    //     hp,
                    //     this.gold,
                    //     this._spent,
                    //     hasWin ? null : this._lastMonster,
                    //     ModuleService.getModule(TowerModuleC)
                    //         .tryTowerMgs?.map((card) => card.toFixed(0))
                    //         .join("")
                    // );

                    UIService.show(UISettle, settleData);
                }, 1);
                // let rewardArr = rewardAmounts.map((amount, index) => {
                //     let cfg = GameConfig.Item.getAllElement().find((item) => item.itemType == rewardTypes[index]);
                //     return [cfg.id, amount];
                // });
                // MGSTool.rewardMGS(rewardArr, 1);
            } else {
                UIService.hide(UIMain);
                UIService.show(LobbyUI);
                UIService.getUI(TowerUI).setStageTowerUI(false);
                if (state == EStageState.End) {
                    ModuleService.getModule(WaveModuleC).syncWaveUtil(this.id, null);
                    this.stopBGM();
                    SoundUtil.playBGM();
                    UIService.hide(UISettle);
                    Event.dispatchToLocal("onStageEnd");
                }
            }
            StageActions.onStageStateChanged.call(this.state, ...param);
            ui.onStateChanged(state);
        });

        StageListener.addServerListener(this.id, "speedUp", (speedMultipler: number) => {
            this.speedMultipler = speedMultipler;
            StageActions.onSpeedMultiplierChanged.call(this.speedMultipler);
        });

        StageListener.addServerListener(this.id, "addGold", (amount: number) => {
            this.gold += amount;
        });

        StageListener.addServerListener(this.id, "onPlayerCountChanged", (playerIds: number[]) => {
            // remove players not in playerIds
            this.playerIds = playerIds.filter((playerId) => playerId != null);
            StageActions.onPlayerCountChanged.call(this.playerIds.length);
        });

        // StageListener.addServerListener(
        //     this.id,
        //     "updateRankItems",
        //     (userIds: string[], names: string[], golds: number[], damages: number[]) => {
        //         this.updateRankItems(userIds, names, golds, damages);
        //     }
        // );
    }

    // updateRankItems(
    //     userIds: string[],
    //     names: string[],
    //     golds: number[],
    //     damages: number[],
    //     updateLocal: boolean = false
    // ) {
    //     // filter this._rankItems not in userIds
    //     this._rankItems = this._rankItems.filter((rankItem) => {
    //         return userIds.indexOf(rankItem.userId) != -1;
    //     });
    //     for (let i = 0; i < userIds.length; i++) {
    //         let item = this._rankItems.find((rankItem) => rankItem.userId == userIds[i]);
    //         if (!item) {
    //             item = {
    //                 userId: userIds[i],
    //                 name: names[i],
    //                 gold: golds[i],
    //                 damage: damages[i],
    //             };
    //             this._rankItems.push(item);
    //         } else {
    //             if (!updateLocal) {
    //                 if (userIds[i] == Player.localPlayer.userId) continue;
    //             }
    //             item.name = names[i];
    //             item.gold = golds[i];
    //             item.damage = damages[i];
    //         }
    //     }
    //     RankActions.onRankItemsChanged.call(this._rankItems);
    // }

    setSpeed(speedMultipler: number) {
        Event.dispatchToServer("speedUp", this.id, speedMultipler);
    }

    onUpdated(dt: number) {
        if (this.state == EStageState.End) return;
        if (this.state == EStageState.Settle) return;
        let dtUpdate = dt * this.speedMultipler;
        this.duration -= dtUpdate;
        if (this.state == EStageState.Game || this.state == EStageState.Wait) {
            let ui = UIService.getUI(UIMain);
            ui.setTimer(this.duration);
        }
        let updateRate = 1 / 30;
        while (dtUpdate > 0) {
            if (dtUpdate < updateRate) updateRate = dtUpdate;
            WaveManager.update(updateRate);
            TowerManager.onUpdate(updateRate);
            dtUpdate -= updateRate;
        }
        // let selfRankItem = this._rankItems.find((rankItem) => rankItem.userId == Player.localPlayer.userId);
        // if (selfRankItem) {
        //     selfRankItem.gold = this.gold;
        //     selfRankItem.damage = this.damage;
        //     selfRankItem.name = GameManager.playerName;
        // this.updateRankItems(
        //     this._rankItems.map((item) => item.userId),
        //     this._rankItems.map((item) => item.name),
        //     this._rankItems.map((item) => item.gold),
        //     this._rankItems.map((item) => item.damage),
        //     true
        // );
        // }
        this.periodicSync(dt);
    }

    periodicSync(dt: number) {
        this._timer += dt;
        this._rankTimer += dt;
        if (this._timer > 1) {
            if (this._currentDeathData.length > 0) {
                Event.dispatchToServer(
                    "onDie",
                    this._currentDeathData.map((data) => data.id),
                    this._currentDeathData.map((data) => data.wave),
                    this.id
                );
                this._currentDeathData = [];
                this._timer = 0;
            }

            if (this._currentEscapeData.length > 0) {
                Event.dispatchToServer(
                    "onEscaped",
                    this._currentEscapeData.map((data) => data.id),
                    this._currentEscapeData.map((data) => data.wave),
                    this._currentEscapeData.map((data) => data.escapeDamage),
                    this.id
                );
                this._currentEscapeData = [];
                this._timer = 0;
            }
        }

        if (this._rankTimer > 5 && this._dataChanged) {
            console.log("update rank");
            Event.dispatchToServer("updateRankData", this.id, this.gold, this.damage);
            this._rankTimer = 0;
            this._dataChanged = false;
        }
    }

    destroy() {
        StageListener.removeAllListeners(this.id);

        EnemyActions.onDie = new Action1<Enemy>();

        EnemyActions.onEscaped = new Action1<Enemy>();

        StageActions.onMapLoaded = new Action();
        if (this.stage) {
            this.stage.destroy();
            this.stage = null;
        }
    }

    /**播放背景音乐 */
    public playBGM(): void {
        const stageConfig = StageUtil.getStageCfgById(this.stageCfgId);
        const bgm = stageConfig.bgm;
        const volume = SoundUtil.bgmVoiceFactor === 0 ? 0 : stageConfig?.bgmVolume || SoundUtil.bgmVoiceFactor;
        if (bgm) {
            SoundService.playBGM(bgm, volume);
        }
    }

    /**停止背景音乐 */
    public stopBGM(): void {
        SoundService.stopBGM();
    }
}

class StageFSM extends Fsm<StageS> {
    constructor(public owner: StageS) {
        super(owner);
    }

    public start() {
        if (this.owner.stageWorldIndex == 99) {
            this.changeState(WaitState, 5, 0);
        } else {
            this.changeState(WaitState, 10, 0);
        }
    }
}

abstract class StageBaseState extends BaseState<StageS, StageFSM> {
    protected abstract get state(): EStageState;
}

class GameState extends StageBaseState {
    private _time: number = 0;
    private _wave: number = 0;
    protected get state(): EStageState {
        return EStageState.Game;
    }
    onUpdate(dt: number): void {
        this._time -= dt * this.fsm.owner.speedMultipler;
        if (this._time <= 0) {
            const [, length] = WaveUtil.fitOldConfig(this.fsm.owner.stageCfgId);
            if (this._wave < length) {
                this.fsm.changeState(WaitState, 5, this._wave);
            } else {
                this.fsm.changeState(SettleState, true);
            }
        }
    }
    onEnter(...params: any[]): void {
        this._wave = params[0];
        const [currentWave] = WaveUtil.fitOldConfig(this.fsm.owner.stageCfgId, this._wave, false, this.fsm.owner.id);
        this._time = currentWave.waveTime;
        this.fsm.owner.currentWaveCount = 0;
        this.fsm.owner.currentWaveDeadIds = [];
        this.fsm.owner.currentSkippingPlayers = [];
        this.fsm.owner.skipped = false;
        for (let i = 0; i < currentWave.enemies.length; i++) {
            this.fsm.owner.cumulativeCount += currentWave.enemies[i].count;
            this.fsm.owner.currentWaveCount += currentWave.enemies[i].count;
        }
        this.fsm.owner.currentWave = this._wave;
        StageActions.onStageStateChanged.call(this.state, this.fsm.owner.id, this._time, this._wave);
    }
}

class WaitState extends StageBaseState {
    private _wave: number = 0;
    onUpdate(dt: number): void {
        this._time -= dt * this.fsm.owner.speedMultipler;
        if (this._time <= 0) {
            const [, length] = WaveUtil.fitOldConfig(this.fsm.owner.stageCfgId);
            if (this._wave < length) {
                this.fsm.changeState(GameState, this._wave + 1);
            } else {
                this.fsm.changeState(SettleState, true);
            }
        }
    }
    private _time: number = 0;
    protected get state(): EStageState {
        return EStageState.Wait;
    }
    onEnter(...params: any[]): void {
        this._time = params[0];
        this._wave = params[1];
        const [currentWave] = WaveUtil.fitOldConfig(
            this.fsm.owner.stageCfgId,
            this._wave + 1,
            false,
            this.fsm.owner.id
        );

        this.fsm.owner.addGold(currentWave.waveGold);
        console.log("this._wave: " + this._wave);

        if (this._wave > 0) {
            for (const player of this.fsm.owner.players) {
                const goldAmount = TalentUtils.getModuleSRunesValueById(1005, player);
                const goldAmount2 = TalentUtils.getModuleSRunesValueById(1029, player);

                const hpAmount = TalentUtils.getModuleSRunesValueById(1010, player);
                const hpAmount2 = TalentUtils.getModuleSRunesValueById(1034, player);
                this.fsm.owner.addPlayerGold(goldAmount + goldAmount2, player);
                console.log("hpAmount + hpAmount2", hpAmount, hpAmount2);
                this.fsm.owner.addHp(hpAmount + hpAmount2);
            }
        }
        StageActions.onStageStateChanged.call(this.state, this.fsm.owner.id, this._time, this._wave);
    }
}

export class SettleState extends StageBaseState {
    private _time: number = 0;
    protected get state(): EStageState {
        return EStageState.Settle;
    }
    onUpdate(dt: number): void {
        this._time -= dt * this.fsm.owner.speedMultipler;
        if (this._time <= 0) {
            this.fsm.changeState(EndState);
        }
    }
    onEnter(...params: any[]): void {
        let [hasWin] = params;
        this.fsm.owner.settleData.hasWin = hasWin;
        this._time = 10 * this.fsm.owner.speedMultipler;
        StageActions.onStageStateChanged.call(this.state, this.fsm.owner.id);
    }
}

class EndState extends StageBaseState {
    protected get state(): EStageState {
        return EStageState.End;
    }

    onUpdate(dt: number): void {}
    onEnter(...params: any[]): void {
        StageActions.onStageStateChanged.call(this.state, this.fsm.owner.id);
    }
}

export namespace StageUtil {
    export function getStageCfgById(id: number) {
        const stageCfg = GameConfig.Stage.getElement(id);
        return stageCfg;
    }
    export function getCfgFromGroupIndexAndDifficulty(index: number, groupIndex: number, difficulty: number) {
        const stages = GameConfig.Stage.getAllElement();
        return stages.find(
            (stage) => stage.difficulty == difficulty && stage.groupIndex == groupIndex && stage.index == index
        );
    }
    export function getIdFromGroupIndexAndDifficulty(index: number, groupIndex: number, difficulty: number) {
        const stageCfg = getCfgFromGroupIndexAndDifficulty(index, groupIndex, difficulty);
        return stageCfg?.id;
    }
    export function getWaveIndexFromId(cfgId: number) {
        const cfg = GameConfig.Stage.getElement(cfgId);
        const waveIndex = (cfg?.index ?? 0) * 3 + (cfg?.difficulty ?? 0) + 1;
        return waveIndex;
    }
    export function getWaveIndexByIndexAndDifficulty(index: number, difficulty: number) {
        const waveIndex = (index ?? 0) * 3 + (difficulty ?? 0) + 1;
        return waveIndex;
    }
    // 获取同世界上一关难度的id数组（）
    export function getPreDifficultyIds(cfg: IStageElement) {
        const difficult = cfg?.difficulty ?? 0;
        if (!difficult) return [];
        const preDifficulty = (cfg?.difficulty ?? 0) - 1;
        const stages = GameConfig.Stage.getAllElement();
        return stages
            .filter((stage) => stage.difficulty == preDifficulty && stage.index == cfg.index)
            .map((stage) => stage.id);
    }
    export function getPreDifficultyUniqueIds(cfg: IStageElement) {
        const difficult = cfg?.difficulty ?? 0;
        if (!difficult) return [];
        const preDifficulty = (cfg?.difficulty ?? 0) - 1;
        const stages = GameConfig.Stage.getAllElement();
        return stages
            .filter((stage) => stage.difficulty == preDifficulty && stage.index == cfg.index)
            .map((stage) => Number(stage.index.toString() + stage.difficulty.toString()));
    }
}
