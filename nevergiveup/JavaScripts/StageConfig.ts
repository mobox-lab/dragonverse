/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-07 18:03:07
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-07 17:14:48
 * @FilePath     : \nevergiveup\JavaScripts\StageConfig.ts
 * @Description  : 修改描述
 */

import { NewStageConfig, StageConfig, WaveEnemy } from "./StageEnums";
import { GameConfig } from "./config/GameConfig";
import { WaveUtil } from "./stage/Wave";

export const baseHp = 1000;

export const STAGE_CONFIG: StageConfig[] = [
    // 引导
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 5, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
        ],
    },
    // 世界1-简单
    {
        waves: [
            {
                enemies: [{ type: 1008, count: 5, spawnInterval: 0.5 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1009, count: 5, spawnInterval: 2 }],
                waveGold: 20,
                waveTime: 90,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1010, count: 7, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 90,
                hpMultiplier: 2,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 7, spawnInterval: 2 }],
                waveGold: 40,
                waveTime: 90,
                hpMultiplier: 3,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 3 }],
                waveGold: 50,
                waveTime: 90,
                hpMultiplier: 3,
            },
        ],
    },
    // 世界1-普通
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1.6,
            },
            {
                enemies: [{ type: 1004, count: 10, spawnInterval: 2 }],
                waveGold: 40,
                waveTime: 90,
                hpMultiplier: 3.2,
            },
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 1 }],
                waveGold: 60,
                waveTime: 90,
                hpMultiplier: 4.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 15, spawnInterval: 1 }],
                waveGold: 80,
                waveTime: 90,
                hpMultiplier: 6.4,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 4.8,
            },
            {
                enemies: [{ type: 1001, count: 15, spawnInterval: 1 }],
                waveGold: 120,
                waveTime: 90,
                hpMultiplier: 8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 3 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 12.8,
            },
        ],
    },
    // 世界1-困难
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 3 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.2,
            },
            {
                enemies: [{ type: 1005, count: 10, spawnInterval: 2 }],
                waveGold: 60,
                waveTime: 90,
                hpMultiplier: 4.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 1 }],
                waveGold: 90,
                waveTime: 90,
                hpMultiplier: 6.6,
            },
            {
                enemies: [{ type: 1005, count: 15, spawnInterval: 1 }],
                waveGold: 120,
                waveTime: 90,
                hpMultiplier: 8.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 3 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6.6,
            },
            {
                enemies: [{ type: 1001, count: 15, spawnInterval: 1 }],
                waveGold: 180,
                waveTime: 90,
                hpMultiplier: 11,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 210,
                waveTime: 90,
                hpMultiplier: 13.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 240,
                waveTime: 90,
                hpMultiplier: 15.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 25, spawnInterval: 1 }],
                waveGold: 300,
                waveTime: 90,
                hpMultiplier: 17.6,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 17.6,
            },
        ],
    },
    // 世界2-简单
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 2.4,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 3.6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.8,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 3.6,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
            },
        ],
    },
    // 世界2-普通
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 1.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 3.6,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.2,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10.8,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.4,
            },
        ],
    },
    // 世界2-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.4,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.2,
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9.6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 19.2,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 19.2,
            },
        ],
    },
    // 世界3-简单
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 1.4,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 2.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.2,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.6,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.2,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.2,
            },
        ],
    },
    // 世界3-普通
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16,
            },
        ],
    },
    // 世界3-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.5,
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.5,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 15,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 17.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20,
            },
        ],
    },
    // 世界4-简单
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 0 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.3,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6.9,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9.2,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6.9,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 13.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.1,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.4,
            },
        ],
    },
    // 世界4-普通
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.2,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10.4,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 13,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 15.6,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.2,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 25,
            },
        ],
    },
    // 世界4-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.7,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.4,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.1,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10.8,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.1,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 13.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.9,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 21.6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 21.6,
            },
        ],
    },
    // 世界5-简单
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.8,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.2,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 19.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 22.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 22.4,
            },
        ],
    },
    // 世界5-普通
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.9,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.8,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.7,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.6,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.7,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 17.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20.3,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 23.2,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 25,
            },
        ],
    },
    // 世界5-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 3,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9,
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 15,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 21,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 24,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 25,
            },
        ],
    },
];

export const NEW_STAGE_CONFIG: NewStageConfig[] = [
    // 引导
    {
        waves: [
            {
                enemies: [{ type: 1008, count: 5, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1009, count: 5, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1010, count: 5, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1011, count: 5, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1012, count: 1, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1013, count: 5, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
        ],
    },
    // 世界1-简单
    {
        waves: [
            {
                enemies: [{ type: 1008, count: 5, spawnInterval: 4 },],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1,
            },
            // {
            //     enemies: [{ type: 1001, count: 7, spawnInterval: 2 }],
            //     waveGold: 30,
            //     waveTime: 90,
            //     hpMultiplier: 2,
            //     airDrop: {
            //         type: 1001,
            //         count: 1,
            //         spawnInterval: 10,
            //     },
            // },
            // {
            //     enemies: [{ type: 1001, count: 7, spawnInterval: 2 }],
            //     waveGold: 40,
            //     waveTime: 90,
            //     hpMultiplier: 3,
            // },
            // {
            //     enemies: [{ type: 1003, count: 1, spawnInterval: 3 }],
            //     waveGold: 50,
            //     waveTime: 90,
            //     hpMultiplier: 3,
            // },
        ],
    },
    // {
    //     waves: (wave: number) => {
    //         const waveUtil = new WaveUtil();
    //         const waveEnemy = waveUtil.calculateWaveContent(wave);

    //         return waveEnemy;
    //     },
    //     waveLength: 99999,
    // },
    // {
    //     waves: (wave: number) => {
    //         // 全部可配置的数值 如果不传，就是默认值，如果传，就会覆盖
    //         const waveUtil = new WaveUtil({
    //             plusAmount: 1,
    //             bloodRound: 2,
    //             typeRound: 2,
    //             bossRound: 2,
    //             bossBloodRound: 2,
    //             waveGold: 2,
    //             waveTime: 2,
    //             hpMultiplier: 2,
    //             hpPercent: 2,
    //             hpBossPercent: 2,
    //         });
    //         const waveEnemy = waveUtil.calculateWaveContent(wave);

    //         return waveEnemy;
    //     },
    //     waveLength: 99999,
    // },
    // 世界1-普通
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 1.6,
            },
            {
                enemies: [{ type: 1004, count: 10, spawnInterval: 2 }],
                waveGold: 40,
                waveTime: 90,
                hpMultiplier: 3.2,
            },
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 1 }],
                waveGold: 60,
                waveTime: 90,
                hpMultiplier: 4.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 15, spawnInterval: 1 }],
                waveGold: 80,
                waveTime: 90,
                hpMultiplier: 6.4,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 4.8,
            },
            {
                enemies: [{ type: 1001, count: 15, spawnInterval: 1 }],
                waveGold: 120,
                waveTime: 90,
                hpMultiplier: 8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 3 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 12.8,
            },
        ],
    },
    // 世界1-困难
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 3 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.2,
            },
            {
                enemies: [{ type: 1005, count: 10, spawnInterval: 2 }],
                waveGold: 60,
                waveTime: 90,
                hpMultiplier: 4.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 10, spawnInterval: 1 }],
                waveGold: 90,
                waveTime: 90,
                hpMultiplier: 6.6,
            },
            {
                enemies: [{ type: 1005, count: 15, spawnInterval: 1 }],
                waveGold: 120,
                waveTime: 90,
                hpMultiplier: 8.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 3 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6.6,
            },
            {
                enemies: [{ type: 1001, count: 15, spawnInterval: 1 }],
                waveGold: 180,
                waveTime: 90,
                hpMultiplier: 11,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 210,
                waveTime: 90,
                hpMultiplier: 13.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 240,
                waveTime: 90,
                hpMultiplier: 15.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 25, spawnInterval: 1 }],
                waveGold: 300,
                waveTime: 90,
                hpMultiplier: 17.6,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 3 }],
                waveGold: 100,
                waveTime: 90,
                hpMultiplier: 17.6,
            },
        ],
    },
    // 世界2-简单
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 2.4,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 3.6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.8,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 3.6,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
            },
        ],
    },
    // 世界2-普通
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 1.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 3.6,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.2,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10.8,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.4,
            },
        ],
    },
    // 世界2-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.4,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.2,
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9.6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 19.2,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 19.2,
            },
        ],
    },
    // 世界3-简单
    {
        waves: [
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 1.4,
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 2.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.2,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.6,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1005, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.2,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.2,
            },
        ],
    },
    // 世界3-普通
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16,
            },
        ],
    },
    // 世界3-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.5,
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.5,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 15,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 17.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20,
            },
        ],
    },
    // 世界4-简单
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 0 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.3,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 4.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6.9,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9.2,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6.9,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 13.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.1,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.4,
            },
        ],
    },
    // 世界4-普通
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.2,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10.4,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 7.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 13,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 15.6,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.2,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20.8,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 25,
            },
        ],
    },
    // 世界4-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.7,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.4,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.1,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 10.8,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.1,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 13.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.2,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18.9,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 21.6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 21.6,
            },
        ],
    },
    // 世界5-简单
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.8,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.2,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 16.8,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 19.6,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 22.4,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 22.4,
            },
        ],
    },
    // 世界5-普通
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 2.9,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 5.8,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.7,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 11.6,
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 8.7,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 14.5,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 17.4,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 20.3,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 23.2,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 25,
            },
        ],
    },
    // 世界5-困难
    {
        waves: [
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 200,
                waveTime: 90,
                hpMultiplier: 3,
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 6,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9,
            },
            {
                enemies: [{ type: 1004, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 12,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1006, count: 1, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 9,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 15,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 18,
            },
            {
                enemies: [{ type: 1001, count: 20, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 21,
                airDrop: {
                    type: 1001,
                    count: 1,
                    spawnInterval: 10,
                },
            },
            {
                enemies: [{ type: 1002, count: 20, spawnInterval: 1, gate: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 24,
            },
            {
                enemies: [{ type: 1003, count: 1, spawnInterval: 1 }],
                waveGold: 150,
                waveTime: 90,
                hpMultiplier: 25,
            },
        ],
    },
];
