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
    waves: WaveConfig[] | ((wave: number) => WaveConfig);
    waveLength?: number;
};

export type WaveUtilConfig = {
    plusAmount?: number;
    bloodRound?: number;
    typeRound?: number;
    bossRound?: number;
    bossBloodRound?: number;
    waveGold?: number;
    waveTime?: number;
    hpMultiplier?: number;
};
