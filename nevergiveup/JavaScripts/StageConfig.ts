/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-07 18:03:07
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-07 17:14:48
 * @FilePath     : \nevergiveup\JavaScripts\StageConfig.ts
 * @Description  : 修改描述
 */

import { WaveModuleC } from "./Modules/waveModule/WaveModuleC";
import { NewStageConfig, StageConfig } from "./StageEnums";
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
                enemies: [{ type: 1020, count: 5, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 30,
                hpMultiplier: 0.5,
            },
            {
                enemies: [{ type: 1024, count: 5, spawnInterval: 5 }],
                waveGold: 20,
                waveTime: 30,
                hpMultiplier: 0.6,
            },
            {
                enemies: [{ type: 1021, count: 10, spawnInterval: 5 }],
                waveGold: 20,
                waveTime: 80,
                hpMultiplier: 0.6,
            },
            {
                enemies: [{ type: 1023, count: 5, spawnInterval: 5 }],
                waveGold: 20,
                waveTime: 50,
                hpMultiplier: 0.6,
            },
            {
                enemies: [{ type: 1022, count: 15, spawnInterval: 1 }],
                waveGold: 20,
                waveTime: 50,
                hpMultiplier: 0.6,
            },
            {
                enemies: [{ type: 1023, count: 10, spawnInterval: 3 }],
                waveGold: 20,
                waveTime: 300,
                hpMultiplier: 0.6,
            },
        ],
    },
    // {
    //     waves: (wave: number, execute: boolean, stageId?: number) => {
    //         let waveUtil: WaveUtil = new WaveUtil();
    //         if (SystemUtil.isClient()) {
    //             waveUtil = ModuleService.getModule(WaveModuleC).waveUtil;
    //         }

    //         if (waveUtil) {
    //             const waveEnemy = waveUtil.newCalculateWave(wave, execute, stageId);
    //             return waveEnemy;
    //         } else {
    //             return {
    //                 waveGold: 100,
    //                 enemies: [],
    //                 waveTime: 0,
    //                 hpMultiplier: 0,
    //             };
    //         }
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
                enemies: [{ type: 1030, count: 5, spawnInterval: 5 }],
                waveGold: 200,
                waveTime: 50,
                hpMultiplier: 0.8,
            },
            {
                enemies: [{ type: 1034, count: 8, spawnInterval: 3 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 0.8,
            },
            {
                enemies: [{ type: 1030, count: 15, spawnInterval: 1 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 0.8,
            },
            {
                enemies: [{ type: 1034, count: 5, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 0.9,
            },
            {
                enemies: [{ type: 1031, count: 10, spawnInterval: 5 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 0.9,
            },
            {
                enemies: [{ type: 1033, count: 8, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 0.9,
            },
            {
                enemies: [{ type: 1030, count: 20, spawnInterval: 1 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 0.9,
            },
            {
                enemies: [{ type: 1031, count: 5, spawnInterval: 3 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1034, count: 10, spawnInterval: 1 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1032, count: 10, spawnInterval: 3 }],
                waveGold: 30,
                waveTime: 300,
                hpMultiplier: 1,
            },
        ],
    },
    // 世界1-困难
    {
        waves: [
            {
                enemies: [{ type: 1027, count: 15, spawnInterval: 2 }],
                waveGold: 300,
                waveTime: 50,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1024, count: 10, spawnInterval: 3 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1033, count: 10, spawnInterval: 3 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1020, count: 10, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1029, count: 5, spawnInterval: 5 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1032, count: 5, spawnInterval: 5 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1025, count: 20, spawnInterval: 1 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1031, count: 8, spawnInterval: 5 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1023, count: 8, spawnInterval: 5 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1030, count: 15, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1026, count: 8, spawnInterval: 5 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1022, count: 15, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1028, count: 15, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1034, count: 15, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 50,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1021, count: 10, spawnInterval: 2 }],
                waveGold: 30,
                waveTime: 300,
                hpMultiplier: 1.5,
            },
        ],
    },
    // 世界2-简单
    {
        waves: [
            {
                enemies: [{ type: 1035, count: 5, spawnInterval: 4 }],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 0.8,
            },
            {
                enemies: [{ type: 1009, count: 5, spawnInterval: 5 }],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1011, count: 5, spawnInterval: 5 }],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1010, count: 8, spawnInterval: 2 }],
                waveGold: 150,
                waveTime: 20,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1035, count: 10, spawnInterval: 3 }],
                waveGold: 0,
                waveTime: 30,
                hpMultiplier: 0.8,
            },
            {
                enemies: [{ type: 1012, count: 1, spawnInterval: 5 }],
                waveGold: 0,
                waveTime: 240,
                hpMultiplier: 5,
            },
        ],
    },
    // 世界2-普通
    {
        waves: [
            {
                enemies: [{ type: 1035, count: 10, spawnInterval: 4 }],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 1.0,
            },
            {
                enemies: [{ type: 1056, count: 10, spawnInterval: 4 }],
                waveGold: 100,
                waveTime: 50,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1052, count: 10, spawnInterval: 4 }],
                waveGold: 100,
                waveTime: 30,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1010, count: 10, spawnInterval: 3 }],
                waveGold: 0,
                waveTime: 25,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1037, count: 10, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 30,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1012, count: 1, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 240,
                hpMultiplier: 25,
            },
        ],
    },
    // 世界2-困难
    {
        waves: [
            {
                enemies: [{ type: 1015, count: 12, spawnInterval: 4 }],
                waveGold: 200,
                waveTime: 40,
                hpMultiplier: 0.6,
            },
            {
                enemies: [{ type: 1009, count: 6, spawnInterval: 5 }],
                waveGold: 150,
                waveTime: 20,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1017, count: 2, spawnInterval: 15 }],
                waveGold: 100,
                waveTime: 20,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1055, count: 15, spawnInterval: 2 }],
                waveGold: 100,
                waveTime: 20,   
                hpMultiplier: 1.8,
            },
            {
                enemies: [{ type: 1042, count: 1, spawnInterval: 10 }],
                waveGold: 50,
                waveTime: 10,
                hpMultiplier: 8,
            },
            {
                enemies: [{ type: 1060, count: 6, spawnInterval: 4 }],
                waveGold: 0,
                waveTime: 20,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1019, count: 8, spawnInterval: 5 }],
                waveGold: 0,
                waveTime: 40,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1055, count: 40, spawnInterval: 1 }],
                waveGold: 0,
                waveTime: 15,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1056, count: 5, spawnInterval: 3 }],
                waveGold: 0,
                waveTime: 20,
                hpMultiplier: 3,
            },
            {
                enemies: [{ type: 1046, count: 10, spawnInterval: 2 }],
                waveGold: 50,
                waveTime: 15,
                hpMultiplier: 4,
            },
            {
                enemies: [{ type: 1013, count: 10, spawnInterval: 4 }],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 8,
            },
            {
                enemies: [{ type: 1041, count: 1, spawnInterval: 10 }],
                waveGold: 150,
                waveTime: 200,
                hpMultiplier: 40,
            },
        ],
    },
    // 世界3-简单
    {
        waves: [
            {
                enemies: [{ type: 1025, count: 15, spawnInterval: 5 }],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1027, count: 20, spawnInterval: 7 }],
                waveGold: 150,
                waveTime: 15,
                hpMultiplier: 1.5,
            },
            {
                enemies: [{ type: 1043, count: 10, spawnInterval: 4 }],
                waveGold: 100,
                waveTime: 30,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1029, count: 5, spawnInterval: 5 }],
                waveGold: 0,
                waveTime: 30,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1026, count: 5, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 50,
                hpMultiplier: 3.2,
            },
            {
                enemies: [{ type: 1025, count: 15, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 30,
                hpMultiplier: 1.5,
            },
        ],
    },
    // 世界3-普通
    {
        waves: [
            {
                enemies: [{ type: 1030, count: 20, spawnInterval: 4 }],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 1,
            },
            {
                enemies: [{ type: 1033, count: 15, spawnInterval: 5 }],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1031, count: 6, spawnInterval: 3 }],
                waveGold: 150,
                waveTime: 25,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1030, count: 10, spawnInterval: 10 }],
                waveGold: 150,
                waveTime: 20,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1034, count: 5, spawnInterval: 5 }],
                waveGold: 150,
                waveTime: 20,
                hpMultiplier: 3.2,
            },
            {
                enemies: [{ type: 1032, count: 2, spawnInterval: 10 }],
                waveGold: 150,
                waveTime: 50,
                hpMultiplier: 6,
            },
            {
                enemies: [{ type: 1033, count: 15, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 50,
                hpMultiplier: 2,
            },
            {
                enemies: [{ type: 1031, count: 6, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 50,
                hpMultiplier: 4,
            },
            {
                enemies: [{ type: 1030, count: 8, spawnInterval: 10 }],
                waveGold: 100,
                waveTime: 50,
                hpMultiplier: 4,
            },
            {
                enemies: [{ type: 1034, count: 5, spawnInterval: 10 }],
                waveGold: 100,
                waveTime: 300,
                hpMultiplier: 4,
            },
        ],
    },
    // 世界3-困难
    {
        waves: [
            {
                enemies: [{ type: 1028, count: 20, spawnInterval: 2 }],
                waveGold: 200,
                waveTime: 10,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1026, count: 5, spawnInterval: 5 }],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 1.2,
            },
            {
                enemies: [{ type: 1031, count: 7, spawnInterval: 3 }],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1030, count: 15, spawnInterval: 2 }],
                waveGold: 150,
                waveTime: 20,
                hpMultiplier: 2.5,
            },
            {
                enemies: [{ type: 1034, count: 10, spawnInterval: 5 }],
                waveGold: 150,
                waveTime: 20,
                hpMultiplier: 3.2,
            },
            {
                enemies: [{ type: 1032, count: 1, spawnInterval: 15 }],
                waveGold: 150,
                waveTime: 40,
                hpMultiplier: 6,
            },
            {
                enemies: [{ type: 1035, count: 12, spawnInterval: 3 }],
                waveGold: 0,
                waveTime: 30,
                hpMultiplier: 3,
            },
            {
                enemies: [{ type: 1039, count: 8, spawnInterval: 5 }],
                waveGold: 100,
                waveTime: 30,
                hpMultiplier: 4,
            },
            {
                enemies: [{ type: 1037, count: 4, spawnInterval: 10 }],
                waveGold: 100,
                waveTime: 40,
                hpMultiplier: 3.5,
            },
            {
                enemies: [{ type: 1036, count: 6, spawnInterval: 10 }],
                waveGold: 0,
                waveTime: 400,
                hpMultiplier: 4,
            },
            {
                enemies: [{ type: 1032, count: 6, spawnInterval: 10 }],
                waveGold: 120,
                waveTime: 50,
                hpMultiplier: 5,
            },
            {
                enemies: [{ type: 1028, count: 20, spawnInterval: 10 }],
                waveGold: 120,
                waveTime: 50,
                hpMultiplier: 5,
            },
            {
                enemies: [{ type: 1026, count: 5, spawnInterval: 10 }],
                waveGold: 120,
                waveTime: 50,
                hpMultiplier: 6,
            },
            {
                enemies: [{ type: 1030, count: 15, spawnInterval: 10 }],
                waveGold: 0,
                waveTime: 50,
                hpMultiplier: 5,
            },
            {
                enemies: [{ type: 1037, count: 10, spawnInterval: 10 }],
                waveGold: 0,
                waveTime: 400,
                hpMultiplier: 10,
            },
        ],
    },
    // 世界4-简单
    {
        waves: [
            //4-1-1
            {
                enemies: [
                    { type: 1015, count: 10, spawnInterval: 2.5, gate: 0 },
                    { type: 1015, count: 10, spawnInterval: 2.5, gate: 1 },
                ],
                waveGold: 120,
                waveTime: 35,
                hpMultiplier: 1.2,
            },
            //4-1-2
            {
                enemies: [
                    { type: 1016, count: 5, spawnInterval: 4, gate: 0 },
                    { type: 1016, count: 5, spawnInterval: 4, gate: 1 },
                ],
                waveGold: 120,
                waveTime: 35,
                hpMultiplier: 1.2,
            },
            //4-1-3
            {
                enemies: [
                    { type: 1017, count: 4, spawnInterval: 4, gate: 0 },
                    { type: 1017, count: 4, spawnInterval: 4, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 1,
            },
            //4-1-4
            {
                enemies: [
                    { type: 1019, count: 4, spawnInterval: 4.5, gate: 0 },
                    { type: 1019, count: 4, spawnInterval: 4.5, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 50,
                hpMultiplier: 1,
            },
            //4-1-5
            {
                enemies: [
                    { type: 1016, count: 4, spawnInterval: 6, gate: 0 },
                    { type: 1016, count: 4, spawnInterval: 6, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 30,
                hpMultiplier: 3.5,
            },
            //4-1-6
            {
                enemies: [
                    { type: 1062, count: 4, spawnInterval: 6, gate: 0 },
                    { type: 1062, count: 4, spawnInterval: 6, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 300,
                hpMultiplier: 2.4,
            },   
        ],
    },
    // 世界4-普通
    {
        waves: [
            //4-2-1
            {
                enemies: [
                    { type: 1025, count: 6, spawnInterval: 3, gate: 0 },
                    { type: 1025, count: 6, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 1.6,
            },
            //4-2-2
            {
                enemies: [
                    { type: 1029, count: 6, spawnInterval: 5, gate: 0 },
                    { type: 1029, count: 6, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 35,
                hpMultiplier: 1.6,
            },
            //4-2-3
            {
                enemies: [
                    { type: 1027, count: 8, spawnInterval: 3, gate: 0 },
                    { type: 1027, count: 8, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 4,
            },
            //4-2-4
            {
                enemies: [
                    { type: 1026, count: 4, spawnInterval: 3, gate: 1 }
                ],
                waveGold: 200,
                waveTime: 25,
                hpMultiplier: 1,
            },
            //4-2-5
            {
                enemies: [
                    { type: 1028, count: 8, spawnInterval: 4, gate: 0 },
                    { type: 1028, count: 8, spawnInterval: 4, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 35,
                hpMultiplier: 2.5,
            },
            //4-2-6
            {
                enemies: [
                    { type: 1041, count: 4, spawnInterval: 4, gate: 0 },
                    { type: 1041, count: 4, spawnInterval: 4, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 20,
                hpMultiplier: 1.1,
            },
            //4-2-7
            {
                enemies: [
                    { type: 1043, count: 10, spawnInterval: 1.2, gate: 0 },
                ],
                waveGold: 200,
                waveTime: 25,
                hpMultiplier: 7,
            },
            //4-2-8
            {
                enemies: [
                    { type: 1044, count: 15, spawnInterval: 1, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 35,
                hpMultiplier: 7,
            },
            //4-2-9
            {
                enemies: [
                    { type: 1061, count: 6, spawnInterval: 3, gate: 0 },
                    { type: 1045, count: 6, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 20,
                hpMultiplier: 13,
            },
            //4-2-10
            {
                enemies: [
                    { type: 1045, count: 8, spawnInterval: 3, gate: 0 },
                    { type: 1061, count: 8, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 300,
                hpMultiplier: 16,
            },
        ],
    },
    // 世界4-困难
    {
        waves: [
            //4-3-1
            //4-3-1
            {
                enemies: [
                    { type: 1025, count: 15, spawnInterval: 1, gate: 0 },
                ],
                waveGold: 250,
                waveTime: 35,
                hpMultiplier: 1.2,
            },
            //4-3-2
            {
                enemies: [
                    { type: 1017, count: 6, spawnInterval: 5, gate: 0 },
                    { type: 1017, count: 6, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 35,
                hpMultiplier: 0.8,
            },
            //4-3-3
            {
                enemies: [
                    { type: 1029, count: 4, spawnInterval: 2, gate: 0 },
                    { type: 1029, count: 4, spawnInterval: 2, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 25,
                hpMultiplier: 0.6,
            },
            //4-3-4
            {
                enemies: [
                    { type: 1028, count: 8, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 30,
                hpMultiplier: 3,
            },
            //4-3-5
            {
                enemies: [
                    { type: 1008, count: 10, spawnInterval: 1, gate: 0 },
                ],
                waveGold: 250,
                waveTime: 25,
                hpMultiplier: 4,
            },
            //4-3-6
            {
                enemies: [
                    { type: 1019, count: 4, spawnInterval: 5, gate: 0 },
                    { type: 1019, count: 4, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 25,
                hpMultiplier: 1.2,
            },
            //4-3-7
            {
                enemies: [
                    { type: 1062, count: 5, spawnInterval: 2.5, gate: 0 },
                    { type: 1062, count: 5, spawnInterval: 2.5, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 30,
                hpMultiplier: 0.7,
            },
            //4-3-8
            {
                enemies: [
                    { type: 1011, count: 8, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 30,
                hpMultiplier: 4.5,
            },
            //4-3-9
            {
                enemies: [
                    { type: 1050, count: 12, spawnInterval: 2, gate: 0 },
                    { type: 1050, count: 12, spawnInterval: 2, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 30,
                hpMultiplier: 9,
            },
            //4-3-10
            {
                enemies: [
                    { type: 1046, count: 3, spawnInterval: 3.5, gate: 0 },
                ],
                waveGold: 250,
                waveTime: 25,
                hpMultiplier: 6,
            },
            //4-3-11
            {
                enemies: [
                    { type: 1045, count: 10, spawnInterval: 1, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 25,
                hpMultiplier: 9,
            },
            //4-3-12
            {
                enemies: [
                    { type: 1046, count: 4, spawnInterval: 5, gate: 0 },
                    { type: 1045, count: 10, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 40,
                hpMultiplier: 8,
            },
            //4-3-13
            {
                enemies: [
                    { type: 1064, count: 7, spawnInterval: 1.5, gate: 0 },
                ],
                waveGold: 250,
                waveTime: 25,
                hpMultiplier: 7,
            },
            //4-3-14
            {
                enemies: [
                    { type: 1063, count: 10, spawnInterval: 1.6, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 30,
                hpMultiplier: 18,
            },
            //4-3-15
            {
                enemies: [
                    { type: 1056, count: 8, spawnInterval: 3, gate: 0 },
                    { type: 1056, count: 8, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 250,
                waveTime: 300,
                hpMultiplier: 10,
            },
        ],
    },
    // 世界5-简单
    {
        waves: [
            {
                enemies: [
                    { type: 1016, count: 10, spawnInterval: 3, gate: 0 },
                    { type: 1061, count: 25, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 240,
                waveTime: 30,
                hpMultiplier: 1.3,
            },
            {
                enemies: [
                    { type: 1056, count: 4, spawnInterval: 5, gate: 0 },
                    { type: 1055, count: 1, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 120,
                waveTime: 20,
                hpMultiplier: 4,
            },
            {
                enemies: [
                    { type: 1043, count: 1, spawnInterval: 5, gate: 0 },
                    { type: 1049, count: 1, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 10,
                hpMultiplier: 2.2,
            },
            {
                enemies: [
                    { type: 1064, count: 15, spawnInterval: 3, gate: 0 },
                    { type: 1044, count: 15, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 45,
                hpMultiplier: 2.5,
            },
            {
                enemies: [
                    { type: 1052, count: 15, spawnInterval: 3, gate: 0 },
                    { type: 1062, count: 1, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 45,
                hpMultiplier: 3,
            },
            {
                enemies: [
                    { type: 1028, count: 15, spawnInterval: 2, gate: 0 },
                    { type: 1026, count: 2, spawnInterval: 10, gate: 1 },
                ],
                waveGold: 150,
                waveTime: 300,
                hpMultiplier: 4,
            },
        ],
    },
    // 世界5-普通
    {
        waves: [
//5-2-1
            {
                enemies: [
                    { type: 1051, count: 25, spawnInterval: 2, gate: 0 },
                    { type: 1065, count: 8, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 2,
            },
//5-2-2
            {
                enemies: [
                    { type: 1024, count: 10, spawnInterval: 3, gate: 0 },
                    { type: 1042, count: 2, spawnInterval: 10, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 3,
            },
//5-2-3
            {
                enemies: [
                    { type: 1033, count: 15, spawnInterval: 4, gate: 0 },
                    { type: 1034, count: 10, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 30,
                hpMultiplier: 4,
            },
//5-2-4
            {
                enemies: [
                    { type: 1054, count: 10, spawnInterval: 3, gate: 1 }
                ],
                waveGold: 200,
                waveTime: 25,
                hpMultiplier: 8,
            },
//5-2-5
            {
                enemies: [
                    { type: 1032, count: 1, spawnInterval: 3, gate: 0 },
                    { type: 1049, count: 1, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 35,
                hpMultiplier: 3,
            },
//5-2-6
            {
                enemies: [
                    { type: 1031, count: 1, spawnInterval: 3, gate: 0 },
                    { type: 1012, count: 1, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 20,
                hpMultiplier: 4,
            },
//5-2-7
            {
                enemies: [
                    { type: 1056, count: 10, spawnInterval: 2, gate: 0 },
                ],
                waveGold: 200,
                waveTime: 25,
                hpMultiplier: 6,
            },
//5-2-8
            {
                enemies: [
                    { type: 1023, count: 1, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 35,
                hpMultiplier: 8,
            },
//5-2-9
            {
                enemies: [
                    { type: 1052, count: 6, spawnInterval: 3, gate: 0 },
                    { type: 1032, count: 1, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 20,
                hpMultiplier: 3,
            },
//5-2-10
            {
                enemies: [
                    { type: 1050, count: 8, spawnInterval: 3, gate: 0 },
                    { type: 1014, count: 1, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 200,
                waveTime: 300,
                hpMultiplier: 3.8,
            },
        ],
    },
    // 世界5-困难
    {
        waves: [
//5-3-1
            {
                enemies: [
                    { type: 1028, count: 15, spawnInterval: 2, gate: 0 },
                ],
                waveGold: 360,
                waveTime: 35,
                hpMultiplier: 2,
            },
//5-3-2
            {
                enemies: [
                    { type: 1034, count: 5, spawnInterval: 4, gate: 0 },
                    { type: 1047, count: 5, spawnInterval: 4, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 2,
            },
//5-3-3
            {
                enemies: [
                    { type: 1063, count: 10, spawnInterval: 3, gate: 0 },
                    { type: 1046, count: 5, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 3,
            },
//5-3-4
            {
                enemies: [
                    { type: 1019, count: 5, spawnInterval: 5, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 3,
            },
//5-3-5
            {
                enemies: [
                    { type: 1031, count: 10, spawnInterval: 3, gate: 0 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 6,
            },
//5-3-6
            {
                enemies: [
                    { type: 1030, count: 30, spawnInterval: 1, gate: 0 },
                    { type: 1051, count: 30, spawnInterval: 1, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 35,
                hpMultiplier: 2,
            },
//5-3-7
            {
                enemies: [
                    { type: 1014, count: 3, spawnInterval: 10, gate: 0 },
                    { type: 1056, count: 10, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 35,
                hpMultiplier: 5,
            },
//5-3-8
            {
                enemies: [
                    { type: 1032, count: 3, spawnInterval: 8, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 9,
            },
//5-3-9
            {
                enemies: [
                    { type: 1065, count: 12, spawnInterval: 2, gate: 0 },
                    { type: 1042, count: 10, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 4,
            },
//5-3-10
            {
                enemies: [
                    { type: 1019, count: 3, spawnInterval: 8, gate: 0 },
                ],
                waveGold: 300,
                waveTime: 25,
                hpMultiplier: 9,
            },
//5-3-11
            {
                enemies: [
                    { type: 1064, count: 7, spawnInterval: 2, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 25,
                hpMultiplier: 7,
            },
//5-3-12
            {
                enemies: [
                    { type: 1049, count: 3, spawnInterval: 8, gate: 0 },
                    { type: 1052, count: 7, spawnInterval: 3, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 5,
             },
//5-3-13
            {
                enemies: [
                    { type: 1041, count: 3, spawnInterval: 8, gate: 0 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 9,
            },
//5-3-14
            {
                enemies: [
                    { type: 1063, count: 10, spawnInterval: 2, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 30,
                hpMultiplier: 13,
            },
//5-3-15
            {
                enemies: [
                    { type: 1058, count: 15, spawnInterval: 5, gate: 0 },
                    { type: 1049, count: 3, spawnInterval: 8, gate: 1 },
                ],
                waveGold: 300,
                waveTime: 300,
                hpMultiplier: 8,
            },
        ],
    },
    //无尽
    {
        waves: (wave: number, execute: boolean, stageId?: number) => {
            let waveUtil: WaveUtil = new WaveUtil();
            if (SystemUtil.isClient()) {
                waveUtil = ModuleService.getModule(WaveModuleC).waveUtil;
            }

            if (waveUtil) {
                const waveEnemy = waveUtil.newCalculateWave(wave, execute, stageId);
                return waveEnemy;
            } else {
                return {
                    waveGold: 100,
                    enemies: [],
                    waveTime: 0,
                    hpMultiplier: 0,
                };
            }
        },
        waveLength: 99999,
    },
    // 5-1
    {
        waves: [],
    },
    // 5-2
    {
        waves: [],
    },
    // 6-0 训练
    {
        waves: [
            {
                enemies: [
                ],
                waveGold: 0,
                waveTime: 99999,
                hpMultiplier: 1,
            },
        ],
    },
];
