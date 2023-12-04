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
    TestAlgo
}

/**
 * 捕捉成功率算法. 返回值域 [0,1].
 */
export type SuccessRateAlgo = (...param: unknown[]) => number;

export function SuccessRateAlgoFactory(type: SuccessRateAlgoTypes): SuccessRateAlgo {
    switch (type) {
        case SuccessRateAlgoTypes.TestAlgo:
            return testAlgo;
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