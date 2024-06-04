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
}

export type AirDropConifg = {
    type: number;
    count: number;
    spawnInterval: number;
}

export type WaveConfig = {
    enemies: WaveEnemy[];
    waveGold: number;
    waveTime: number,
    hpMultiplier: number;
    airDrop?: AirDropConifg;
}


export type StageConfig = {
    waves: WaveConfig[];
}

export enum EStageState {
    Game,
    End,
    Wait,
    Settle
}

export const DifficlutyEnemyHpMultipliers = [
    1,
    1.5,
    2
]
