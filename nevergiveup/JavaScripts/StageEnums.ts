/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-14 11:47:00
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 13:48:59
 * @FilePath     : \nevergiveup\JavaScripts\StageEnums.ts
 * @Description  : 修改描述
 */
export type WaveEnemy = {
    type: number;
    count: number;
    spawnInterval: number;
    gate?: number;
};

export type AirDropConifg = {
    type: number;
    count: number;
    spawnInterval: number;
};

export type WaveConfig = {
    enemies: WaveEnemy[];
    waveGold: number;
    waveTime: number;
    hpMultiplier: number;
    escapeDamagePercent?: number;
    armor?: number;
    magic?: number;
    airDrop?: AirDropConifg;
};

export type StageConfig = {
    waves: WaveConfig[];
};

export enum EStageState {
    Game,
    End,
    Wait,
    Settle,
}

export const DifficlutyEnemyHpMultipliers = [1, 1.5, 2];

// type GrowthEnemy = {
//     type: number;
//
//     gate?: number;
//
//     growthConfig: WaveCalculator<GrowthEnemyConfig>;
// }
//
// interface GrowthEnemyConfig {
//     count: number;
//
//     maxHitPointRatio: number;
//
//     spawnInterval: number;
//
//     // ...
// }
//
// interface WaveEventEnemy {
//     enemies: GrowthEnemy[];
// }
//
// abstract class WaveEvent {
//     abstract predicate(wave: number, ...params: any[]): boolean;
//
//     abstract waveCalculators: WaveCalculator<WaveEventEnemy>[];
// }
//
// export type GrowthFunction<R = number> = (wave: number) => R;
//
// export type WaveCalculator<P extends object> = {
//     [K in keyof P]: GrowthFunction<P[K]>;
// };
//
// export function settleWaveCalculator<P extends object>
// (calculator: WaveCalculator<P>, wave: number): Partial<P> {
//     let result: Partial<P> = {};
//     for (const key in calculator) {
//         if (typeof calculator[key] === "function") {
//             result[key] = calculator[key](wave);
//         }
//     }
//
//     return result;
// }

export type NewStageConfig = {
    waves: WaveConfig[] | ((wave: number, execute: boolean, stageId: number) => WaveConfig);
    waveLength?: number;
};

export type WaveUtilConfig = {
    /**
     * 每个回合增加的小怪个数
     */
    plusAmount?: number;
    /**
     * 每bloodRound个回合增加怪物 hpPercent 血量
     */
    bloodRound?: number;
    /**
     * 每typeRound个回合增加一个种类的怪物
     */
    typeRound?: number;
    /**
     * 每bossRound个回合增加一个全新boss
     */
    bossRound?: number;
    /**
     * boss刷新后，每bossBloodRound给boss增加 10%血量
     */
    bossBloodRound?: number;
    /**
     * 第一轮的金币奖励
     */
    waveGold?: number;
    /**
     * 每一轮的时间限制
     */
    waveTime?: number;
    /**
     * 怪物的基础血量
     */
    hpMultiplier?: number;
    /**
     * 小怪每次加的血量
     */
    hpPercent?: number;
    /**
     * Boss每次加的血量
     */
    hpBossPercent?: number;
};
