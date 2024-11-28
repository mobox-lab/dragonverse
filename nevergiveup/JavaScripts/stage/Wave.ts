/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-04 17:46:38
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 18:05:09
 * @FilePath     : \nevergiveup\JavaScripts\stage\Wave.ts
 * @Description  : 修改描述
 */

import { AirdropManager } from "../Airdrop/AirdropManager";
import { GameManager } from "../GameManager";
import { MapManager } from "../MapScript";
import PlayerModuleC from "../Modules/PlayerModule/PlayerModuleC";
import { NEW_STAGE_CONFIG } from "../StageConfig";
import { AirDropConifg, WaveConfig, WaveUtilConfig } from "../StageEnums";
import { GuideDialog } from "../UI/UIDialog";
import { GameConfig } from "../config/GameConfig";
import { Enemy } from "../enemy/EnemyBase";
import { EEnemyComponentType } from "../tool/Enum";
import { Point, QuadTree, Rectangle } from "../tool/QuadTree";
import { StageC, StageUtil } from "./Stage";
import { WaveUtilConstant } from "./Constant";
import Log4Ts from "mw-log4ts";
import { WaveModuleC } from "../Modules/waveModule/WaveModuleC";
import { WaveModuleS } from "../Modules/waveModule/WaveModuleS";
import { TowerModuleC } from "../Modules/TowerModule/TowerModuleC";

export class Wave {
    enemyTypes: number[][] = [];
    enemies: Enemy[] = [];
    spawnIntervals: number[][] = [];
    gates: number[][] = [];
    spawnTimers: number[] = [];
    waveInfo: WaveConfig = null;
    wave: number = null;
    constructor(waveConfig: WaveConfig, wave?: number) {
        this.wave = wave;
        this.waveInfo = waveConfig;
        for (let i = 0; i < waveConfig.enemies.length; i++) {
            this.enemyTypes[i] = [];
            this.spawnIntervals[i] = [];
            this.gates[i] = [];
            for (let j = 0; j < waveConfig.enemies[i].count; j++) {
                this.enemyTypes[i].push(waveConfig.enemies[i].type);
                this.spawnIntervals[i].push(waveConfig.enemies[i].spawnInterval);
                if (waveConfig.enemies[i].gate) {
                    this.gates[i].push(waveConfig.enemies[i].gate);
                } else {
                    this.gates[i].push(0);
                }
            }
        }
        this.spawnTimers = this.spawnIntervals.slice().map((interval) => 10000);
    }

    spawnEnemy(index: number) {
        if (this.enemyTypes[index].length > 0) {
            let enemyType = this.enemyTypes[index].shift();
            this.spawnIntervals[index].shift();
            let gate = this.gates[index].shift();
            // ... spawn enemy logic here ...
            let enemy = this.wave
                ? new Enemy(this.wave, enemyType, gate)
                : new Enemy(WaveManager.currentWaveIndex, enemyType, gate, this.waveInfo);
            this.enemies.push(enemy);
            WaveManager.enemies.push(enemy);
            // 新怪物提示删除
            // let enemyCfg = GameConfig.Monster.getElement(enemyType);
            // if (enemyCfg && enemyCfg.types && enemyCfg.types.length > 0) {
            //     let tagId = enemyCfg.types[0];
            //     if (tagId) {
            //         let tag = GameConfig.Tag.getElement(tagId);
            //         if (tag && tag.dialog) {
            //             let hasFirst = ModuleService.getModule(PlayerModuleC).hasFirstMonsterTag(tagId);
            //             if (!hasFirst) {
            //                 let stage = GameManager.getStageClient();
            //                 if (stage && stage.playerIds.length == 1) {
            //                     // pause
            //                     UIService.getUI(UIMain).mPause.onClicked.broadcast();
            //                 }
            //                 ModuleService.getModule(PlayerModuleC).setFirstMonsterTag(tagId);

            //                 if (GuideDialog.dialogs.length > 0) {
            //                     GuideDialog.dialogs = [];
            //                 }
            //                 GuideDialog.push("领航员", tag.dialog, () => {
            //                     GuideDialog.hide();
            //                     if (stage && stage.playerIds.length == 1) {
            //                         // play
            //                         UIService.getUI(UIMain).mPlay.onClicked.broadcast();
            //                     }
            //                 });
            //                 GuideDialog.show();
            //             }
            //         }
            //     }
            // }
        }
    }

    hasEnemiesToSpawn() {
        for (let i = 0; i < this.enemyTypes.length; i++) {
            if (this.enemyTypes[i].length > 0) {
                return true;
            }
        }
        return false;
    }

    onUpdate(dt) {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].onUpdate(dt);
        }

        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].destroyed) {
                this.enemies.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < this.spawnTimers.length; i++) {
            this.spawnTimers[i] += dt;
        }

        for (let i = 0; i < this.spawnTimers.length; i++) {
            if (this.spawnIntervals[i].length > 0 && this.spawnTimers[i] >= this.spawnIntervals[i][0]) {
                try {
                    this.spawnEnemy(i);
                    this.spawnTimers[i] = 0;
                } catch (e) {
                    console.log("lxhTypee", e);
                }
            }
        }
    }
}

export class WaveAirdrop {
    airDropTypes: number[] = [];
    spawnInterval: number;
    spawnTimer: number;
    constructor(airdrop: AirDropConifg) {
        for (let i = 0; i < airdrop.count; i++) {
            this.airDropTypes.push(airdrop.type);
        }
        this.spawnInterval = airdrop.spawnInterval;
        this.spawnTimer = 10000;
    }

    onUpdate(dt) {
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
            if (this.airDropTypes.length > 0) {
                // ... spawn airdrop logic here ...
                let type = this.airDropTypes.shift();
                // console.log("spawn airdrop", this.type, this.spawnTimer, this.spawnInterval);

                let pos = MapManager.getRandLandPos();
                AirdropManager.createAirdrop(type, new Vector(pos[0], pos[1], pos[2]));
                this.spawnTimer = 0;
            }
        }
    }

    hasAirdropsToSpawn() {
        return this.airDropTypes.length > 0;
    }
}

export namespace WaveManager {
    export let currentWaveIndex: number;
    let waves: Wave[]; // An array of Wave objects
    let airdrops: WaveAirdrop[];
    let listener: EventListener;
    let quadTree: QuadTree;
    export let currentAirDropIndex: number;
    export let enemies: Enemy[] = [];
    export function init() {
        currentWaveIndex = 0;
        currentAirDropIndex = 0;
        waves = []; // An array of Wave objects
        airdrops = [];

        listener = Event.addServerListener("onEnemyDie", (enemyIds: number[]) => {
            for (let i = 0; i < enemyIds.length; i++) {
                let enemy = enemies.find((enemy) => {
                    return enemy.id == enemyIds[i];
                });

                if (enemy) {
                    enemy.kill();
                }
            }
        });
        let bounds = MapManager.getBounds();
        if (bounds) {
            let [x, y, w, h] = bounds;
            quadTree = new QuadTree(new Rectangle(x, y, w, h), 4);
        } else {
            quadTree = null;
        }
    }

    export function destroy() {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].destroy(false);
        }
        enemies = [];
        waves = [];
        currentWaveIndex = 0;
        currentAirDropIndex = 0;
        listener.disconnect();
        listener = null;
    }

    function filterEnemies(enemies: Enemy[], types: EEnemyComponentType[]) {
        const targetTypes = [EEnemyComponentType.Flying, EEnemyComponentType.Stealth];
        return enemies?.filter((enemy) => {
            for (let i = 0; i < targetTypes.length; i++) {
                if (enemy.hasComponentType(targetTypes[i]) && !types.includes(targetTypes[i])) {
                    return false;
                }
            }
            return true;
        });
    }

    export function getEnemiesInRadius(position: number[], radius: number, types: EEnemyComponentType[] = []) {
        let inRange = queryEnemies(position[0], position[1], radius, radius);
        inRange = filterEnemies(inRange, types);
        return inRange;
    }

    export function addWave(wave: Wave) {
        waves.push(wave);
    }

    export function addAirdrop(airdrop: WaveAirdrop) {
        airdrops.push(airdrop);
    }

    export function update(dt) {
        const currentWave = waves[currentWaveIndex];
        const currentAirDrop = airdrops[currentAirDropIndex];

        for (let i = 0; i < waves.length; i++) {
            waves[i].onUpdate(dt);
        }

        for (let i = 0; i < airdrops.length; i++) {
            airdrops[i].onUpdate(dt);
        }

        if (currentWaveIndex < waves.length) {
            if (!currentWave.hasEnemiesToSpawn()) {
                // Check if wave is complete
                currentWaveIndex++;
            }
        }

        if (currentAirDropIndex < airdrops.length) {
            if (!currentAirDrop.hasAirdropsToSpawn()) {
                // Check if airdrop is complete
                currentAirDropIndex++;
            }
        }

        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].destroyed) {
                enemies.splice(i, 1);
                i--;
            }
        }

        let bounds = MapManager.getBounds();
        if (bounds) {
            let [x, y, w, h] = bounds;
            quadTree = new QuadTree(new Rectangle(x, y, w, h), 4);
        } else {
            quadTree = null;
        }

        if (quadTree) {
            for (let i = 0; i < enemies.length; i++) {
                let enemyPos = enemies[i].position;
                quadTree.insert(new Point(enemyPos.x, enemyPos.y, enemies[i]));
            }
        }
    }

    export function queryEnemies(x: number, y: number, w: number, h) {
        if (!quadTree) return [];
        let queryRes = quadTree.query(new Rectangle(x, y, w, h));
        if (!queryRes) return [];
        return queryRes.map((point) => point.obj as Enemy);
    }
}

export class WaveUtil {
    plusAmount = WaveUtilConstant.PLUS_AMOUNT; // 每个回合增加的小怪个数
    bloodRound = WaveUtilConstant.BLOOD_ROUND; // 每bloodRound个回合增加怪物 hpPercent 血量
    typeRound = WaveUtilConstant.TYPE_ROUND; // 每typeRound个回合增加一个种类的怪物
    bossRound = WaveUtilConstant.BOSS_ROUND; // 每bossRound个回合增加一个全新boss
    bossBloodRound = WaveUtilConstant.BOSS_BLOOD_ROUND; //在boss刷新后，每bossBloodRound给boss增加 10%血量
    waveGold = WaveUtilConstant.WAVE_GOLD; // 第一轮的金币奖励
    waveTime = WaveUtilConstant.WAVE_TIME; // 每一轮的时间限制
    hpMultiplier = WaveUtilConstant.HP_MULTIPLIER; // 怪物的基础血量
    hpPercent = WaveUtilConstant.HP_PERCENT; // 小怪每次加的血量
    hpBossPercent = WaveUtilConstant.HP_BOSS_PERCENT; // Boss每次加的血量

    indexArray = [[], [], []]; // 简单关卡剩余状态  普通关卡剩余状态   // 困难关卡剩余状态
    currentWaves: WaveConfig[] = [];
    runningIndex = 0;
    allPassWaves: WaveConfig[] = [];

    protected _sequence = [0, 0, 1, 1, 2];

    waveTimes: number = 0;

    // 初始化怪物,也就是第一轮的怪物
    baseEnemy = {
        enemies: [{ type: 1001, count: 1, spawnInterval: 1 }],
        waveGold: this.waveGold,
        waveTime: this.waveTime,
        hpMultiplier: this.hpMultiplier,
    };

    constructor(config?: WaveUtilConfig) {
        if (config) {
            this.plusAmount = config?.plusAmount || WaveUtilConstant.PLUS_AMOUNT;
            this.bloodRound = config?.bloodRound || WaveUtilConstant.BLOOD_ROUND;
            this.typeRound = config?.typeRound || WaveUtilConstant.TYPE_ROUND;
            this.bossRound = config?.bossRound || WaveUtilConstant.BOSS_ROUND;
            this.bossBloodRound = config?.bossBloodRound || WaveUtilConstant.BOSS_BLOOD_ROUND;
            this.waveGold = config?.waveGold || WaveUtilConstant.WAVE_GOLD;
            this.waveTime = config?.waveTime || WaveUtilConstant.WAVE_TIME;
            this.hpMultiplier = config?.hpMultiplier || WaveUtilConstant.HP_MULTIPLIER;
            this.hpPercent = config?.hpPercent || WaveUtilConstant.HP_PERCENT;
            this.hpBossPercent = config?.hpBossPercent || WaveUtilConstant.HP_BOSS_PERCENT;
        }

        const easyIndexArray = this.filterWaveIndexByDifficulty(0);
        const normalIndexArray = this.filterWaveIndexByDifficulty(1);
        const difficultyIndexArray = this.filterWaveIndexByDifficulty(2);
        this.indexArray = [easyIndexArray, normalIndexArray, difficultyIndexArray];
    }

    getEnemies() {
        let enemyConfig = GameConfig.Monster.getAllElement();
        const bosses = enemyConfig.filter((enemy) => enemy.types && enemy.types.includes(EEnemyComponentType.Boss));
        const enemies = enemyConfig.filter((enemy) => !enemy.types || !enemy.types.includes(EEnemyComponentType.Boss));
        return [bosses, enemies, enemyConfig];
    }

    calculateWaveContent(wave: number) {
        // 先加种类，再加个数，再加血量

        if (wave % this.bossRound === 0) {
            // 加boss
            this.addBoss(wave);

            // 加boss血量
            if (wave >= this.bossBloodRound) {
                this.addBossBlood(wave);
            }
        } else {
            // 加种类
            if (wave >= this.typeRound) {
                this.addType(wave);
            }
            // 加数量
            this.addAmount(wave);

            // 加血量
            if (wave >= this.bloodRound) {
                this.addBlood(wave);
            }
        }

        return this.baseEnemy;
    }

    // 给怪物加数量
    addAmount(wave: number) {
        const amount = (wave - 1) * this.plusAmount;
        const newEnemies = this.baseEnemy.enemies.map((enemy) => {
            return {
                ...enemy,
                count: enemy.count + amount,
            };
        });
        this.baseEnemy.enemies = newEnemies;
    }

    // 给怪物加血量
    addBlood(wave: number) {
        const multiple = Math.floor(wave / this.bloodRound); // multiple指的是需要加几次20%
        this.baseEnemy.hpMultiplier = this.baseEnemy.hpMultiplier * Math.pow(this.hpPercent, multiple);
    }

    // 给怪物加种类
    addType(wave: number) {
        const [bosses, enemies] = this.getEnemies();
        // 筛选出不在怪物表里的怪物
        const existIds = this.baseEnemy.enemies.map((enemy) => enemy.type);
        const restEnemies = enemies.filter((enemy) => !existIds.includes(enemy.id));

        const multiple = Math.floor(wave / this.typeRound); // multiple指的是需要加几种新怪物
        if (multiple <= restEnemies.length) {
            // 如果要加的种类小于等于剩余的种类，那么就加入
            const slicedEnemies = restEnemies.slice(0, multiple);
            const formatSlicedEnemies = slicedEnemies.map((enemy) => {
                return {
                    type: enemy.id,
                    count: 0,
                    spawnInterval: 1, // 1秒一只
                };
            });
            this.baseEnemy.enemies = this.baseEnemy.enemies.concat(formatSlicedEnemies);
        } else {
            const formatAllEnemies = restEnemies.map((enemy) => {
                return {
                    type: enemy.id,
                    count: 0,
                    spawnInterval: 1, // 1秒一只
                };
            });
            this.baseEnemy.enemies = this.baseEnemy.enemies.concat(formatAllEnemies);
        }
    }

    // 增加Boss种类
    addBoss(wave: number) {
        const [bosses, enemies] = this.getEnemies();
        // boss关卡
        this.baseEnemy.enemies = [];
        const multiple = Math.floor(wave / this.bossRound); // multiple指的是需要加几种新Boss
        if (multiple <= bosses.length) {
            // 如果要加的种类小于等于剩余的种类，那么就加入
            const slicedBosses = bosses.slice(0, multiple);
            const formatSlicedBosses = slicedBosses.map((enemy) => {
                return {
                    type: enemy.id,
                    count: 1,
                    spawnInterval: 0.5, // 0.5秒一只
                };
            });
            this.baseEnemy.enemies = this.baseEnemy.enemies.concat(formatSlicedBosses);
        } else {
            const formatAllBosses = bosses.map((enemy) => {
                return {
                    type: enemy.id,
                    count: 1,
                    spawnInterval: 0.5, // 0.5秒一只
                };
            });
            this.baseEnemy.enemies = this.baseEnemy.enemies.concat(formatAllBosses);
        }
    }

    // 增加Boss血量
    addBossBlood(wave: number) {
        const multiple = Math.floor(wave / this.bossBloodRound); // multiple指的是需要加几次10%
        this.baseEnemy.hpMultiplier = this.baseEnemy.hpMultiplier * Math.pow(this.hpBossPercent, multiple);
    }

    getWaveInfoByWaveId(stageId: number) {
        if (SystemUtil.isClient()) {
            const waves = ModuleService.getModule(WaveModuleC).allPassWaves;
            return waves;
        } else {
            const waves = ModuleService.getModule(WaveModuleS).getAllPassWaves(stageId);
            return waves;
        }
    }

    calculateWaveValue(wave: number) {
        const increments = [6, 6, 10, 10, 15];
        let result = 1; // 初始值为1
        wave--; // 从0开始计数

        // 计算完整周期
        const fullCycles = Math.floor(wave / increments.length);
        const remainingSteps = wave % increments.length;

        // 完整周期的增量
        const fullCycleIncrement = increments.reduce((sum, value) => sum + value, 0);
        result += fullCycles * fullCycleIncrement;

        // 剩余步骤的增量
        for (let i = 0; i < remainingSteps; i++) {
            result += increments[i];
        }

        return result;
    }

    newCalculateWave(wave: number, execute: boolean, stageId: number) {
        if (execute) {
            if (SystemUtil.isClient()) {
                let waveInfo: WaveConfig;
                if (this.currentWaves.length > 0) {
                    const waves = this.currentWaves;
                    waveInfo = waves.shift();
                    this.currentWaves = waves;
                } else {
                    const currentValue = this._sequence[this.runningIndex];
                    const randomIndex = this.getRandomElementAndRemove(currentValue);
                    this.runningIndex = (this.runningIndex + 1) % this._sequence.length;
                    const waves = NEW_STAGE_CONFIG[randomIndex].waves;

                    if (Array.isArray(waves)) {
                        let newWaves: WaveConfig[] = waves;
                        const times = this.waveTimes;

                        console.log(`Wave times ${times}: ${this.calculateWaveValue(times + 1)}`);
                        const waveIndex = this.calculateWaveValue(times + 1);
                        let waveValue = GameConfig.Wave.getElement(waveIndex);
                        if (!waveValue) {
                            waveValue = GameConfig.Wave.getElement(300);
                        }
                        newWaves = waves.map((item) => {
                            const newEnemies = item.enemies.map((enemy) => {
                                const spawnInterval = enemy.spawnInterval * waveValue.spawnInterval;
                                return {
                                    ...enemy,
                                    count: Math.floor(enemy.count * waveValue.count),
                                    spawnInterval: spawnInterval > 0.5 ? Number(spawnInterval.toFixed(2)) : 0.5,
                                };
                            });
                            const waveTime = (item.waveTime > 30 ? 30 : item.waveTime) * waveValue.waveTime;
                            // const escapeDamagePercent = 1 * Math.pow(1.2, times);

                            const hpX = 0.5;
                            return {
                                ...item,
                                waveTime: waveTime > 10 ? Number(waveTime.toFixed(0)) : 10,
                                hpMultiplier: 1 * waveValue.hp * hpX * item.hpMultiplier,
                                enemies: newEnemies,
                                // escapeDamagePercent: escapeDamagePercent,
                                armor: waveValue.armor,
                                magic: waveValue.magic,
                                waveGold: 0,
                            };
                        });

                        waveInfo = newWaves.shift();
                        this.currentWaves = newWaves;
                        this.waveTimes++;
                    } else {
                        Log4Ts.error(StageC, "error wave index");
                    }
                }
                const maxSource = Math.floor(wave / 25) + 1;
                const max = Math.min(maxSource, 5);
                ModuleService.getModule(TowerModuleC).syncMaxSourceTower(max);

                this.allPassWaves.push(waveInfo);
                ModuleService.getModule(PlayerModuleC).onInfinityWaveRefresh();
                ModuleService.getModule(WaveModuleC).syncAllPassWaves(stageId, this.allPassWaves);
                ModuleService.getModule(WaveModuleC).syncCurrentWave(stageId, waveInfo);
                console.log(`current wave: ${wave}, current monster config:${JSON.stringify(waveInfo)}`);
                return waveInfo;
            }
        } else {
            // 不执行，只是获取
            const defaultData = {
                waveGold: 200,
                enemies: [],
                waveTime: 0,
                hpMultiplier: 0,
            };
            if (SystemUtil.isServer()) {
                if (stageId) {
                    const currentWave = ModuleService.getModule(WaveModuleS).getCurrentWave(stageId);
                    if (currentWave) {
                        return currentWave;
                    } else {
                        return defaultData;
                    }
                } else {
                    return defaultData;
                }
            } else {
                const currentWave = ModuleService.getModule(WaveModuleC).currentWave;
                if (currentWave) {
                    return currentWave;
                } else {
                    return defaultData;
                }
            }
        }
    }

    clearCurrent(stageId: number) {
        ModuleService.getModule(WaveModuleC).syncCurrentWave(stageId, null);
    }

    filterWaveIndexByDifficulty(difficulty: number) {
        const stageIndexes = [0, 1, 2, 3, 4];
        const res = stageIndexes.map((item) => {
            return StageUtil.getWaveIndexByIndexAndDifficulty(item, difficulty);
        });
        return res;
    }

    getRandomElementAndRemove(difficulty: number) {
        if (this.indexArray[difficulty].length === 0) {
            this.indexArray[difficulty] = this.filterWaveIndexByDifficulty(difficulty);
        }
        const arr = this.indexArray[difficulty];
        const randomIndex = Math.floor(Math.random() * arr.length);
        const [removedElement] = arr.splice(randomIndex, 1);
        this.indexArray[difficulty] = arr;
        return removedElement;
    }

    // 适配老版本的数据
    static fitOldConfig(
        stageCfgId: number,
        wave?: number,
        execute = false,
        stageId?: number
    ): [WaveConfig | null, number] {
        const waveIndex = StageUtil.getWaveIndexFromId(stageCfgId);
        const waves = NEW_STAGE_CONFIG[waveIndex].waves;
        if (Array.isArray(waves)) {
            const currentWaves = waves as WaveConfig[];
            const waveMax = currentWaves.length;
            if (!wave) {
                return [null, waveMax];
            }
            const waveContent = currentWaves[wave - 1];
            return [waveContent, waveMax];
        } else {
            const currentWaves: (wave: number, execute: boolean, stageId?: number) => WaveConfig = waves;
            const waveMax = NEW_STAGE_CONFIG[waveIndex].waveLength;
            if (!wave) {
                return [null, waveMax];
            }
            const waveContent = currentWaves(wave, execute, stageId);
            return [waveContent, waveMax];
        }
    }

    static getAllConfig(stageCfgId: number): WaveConfig[] | null {
        const waveIndex = StageUtil.getWaveIndexFromId(stageCfgId);
        const waves = NEW_STAGE_CONFIG[waveIndex].waves;
        if (Array.isArray(waves)) {
            return waves;
        } else {
            // 无尽模式是函数
            return null;
        }
    }
}
