/**
 * 采集结果算法 enum.
 */
export enum SuccessRateAlgoTypes {
    /**
     * 空置.
     */
    Null,
    /**
     * 测试结果算法.
     */
    TestAlgo,
    /**
     * 机警.
     */
    Alert,
    /**
     * 暴躁.
     */
    Tigerish,
    /**
     * 胆小.
     */
    Coward,
    /**
     * 易怒.
     */
    Crank,
    /**
     * 温和.
     */
    Moderate,
}

/**
 * 捕捉成功率算法. 返回值域 [0,1].
 */
export type SuccessRateAlgo = (...param: unknown[]) => number;

export function SuccessRateAlgoFactory(type: SuccessRateAlgoTypes): SuccessRateAlgo {
    switch (type) {
        case SuccessRateAlgoTypes.TestAlgo:
            return testAlgo;
        case SuccessRateAlgoTypes.Alert :
            return normalAlertAlgo;
        case SuccessRateAlgoTypes.Tigerish :
            return normalTigerishAlgo;
        case SuccessRateAlgoTypes.Coward :
            return normalCowardAlgo;
        case SuccessRateAlgoTypes.Crank :
            return normalCrankAlgo;
        case SuccessRateAlgoTypes.Moderate :
            return normalModerateAlgo;
        case SuccessRateAlgoTypes.Null:
        default:
            return normalAlgo;
    }
}

export function normalAlgo(): number {
    return 1;
}

export function testAlgo(): number {
    return 0.8;
}

export function normalAlertAlgo(): number {
    return 0.2;
}

export function normalTigerishAlgo(): number {
    return 0.3;
}

export function normalCowardAlgo(): number {
    return 0.4;
}

export function normalCrankAlgo(): number {
    return 0.5;
}

export function normalModerateAlgo(): number {
    return 0.6;
}