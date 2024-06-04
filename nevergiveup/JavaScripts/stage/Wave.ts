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
import { AirDropConifg, WaveConfig } from "../StageEnums";
import { GuideDialog } from "../UI/UIDialog";
import { GameConfig } from "../config/GameConfig";
import { Enemy } from "../enemy/EnemyBase";
import { EEnemyComponentType } from "../tool/Enum";
import { Point, QuadTree, Rectangle } from "../tool/QuadTree";
import { UIMain } from "./ui/UIMain";



export class Wave {
    enemyTypes: number[][] = [];
    enemies: Enemy[] = [];
    spawnIntervals: number[][] = [];
    gates: number[][] = [];
    spawnTimers: number[] = [];
    constructor(wave: WaveConfig) {
        for (let i = 0; i < wave.enemies.length; i++) {
            this.enemyTypes[i] = [];
            this.spawnIntervals[i] = [];
            this.gates[i] = [];
            for (let j = 0; j < wave.enemies[i].count; j++) {
                this.enemyTypes[i].push(wave.enemies[i].type);
                this.spawnIntervals[i].push(wave.enemies[i].spawnInterval);
                if (wave.enemies[i].gate) {
                    this.gates[i].push(wave.enemies[i].gate);
                }
                else {
                    this.gates[i].push(0);
                }
            }
        }
        this.spawnTimers = this.spawnIntervals.slice().map(interval => 10000);
    }

    spawnEnemy(index: number) {
        if (this.enemyTypes[index].length > 0) {
            let enemyType = this.enemyTypes[index].shift();
            this.spawnIntervals[index].shift();
            let gate = this.gates[index].shift();
            // ... spawn enemy logic here ...
            let enemy = new Enemy(WaveManager.currentWaveIndex, enemyType, gate);
            this.enemies.push(enemy);
            WaveManager.enemies.push(enemy);
            let enemyCfg = GameConfig.Monster.getElement(enemyType);
            if (enemyCfg && enemyCfg.types && enemyCfg.types.length > 0) {
                let tagId = enemyCfg.types[0];
                if (tagId) {
                    let tag = GameConfig.Tag.getElement(tagId);
                    if (tag && tag.dialog) {
                        let hasFirst = ModuleService.getModule(PlayerModuleC).hasFirstMonsterTag(tagId);
                        if (!hasFirst) {
                            let stage = GameManager.getStageClient();
                            if (stage && stage.playerIds.length == 1) {
                                // pause
                                UIService.getUI(UIMain).mPause.onClicked.broadcast();
                            }
                            ModuleService.getModule(PlayerModuleC).setFirstMonsterTag(tagId);

                            if (GuideDialog.dialogs.length > 0) {
                                GuideDialog.dialogs = [];
                            }
                            GuideDialog.push("领航员", tag.dialog, () => {
                                GuideDialog.hide();
                                if (stage && stage.playerIds.length == 1) {
                                    // play
                                    UIService.getUI(UIMain).mPlay.onClicked.broadcast();
                                }
                            });
                            GuideDialog.show();
                        }
                    }
                }
            }
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
        }
        else {
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
        return enemies?.filter(enemy => {
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
        }
        else {
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
        return queryRes.map(point => point.obj as Enemy);
    }
}