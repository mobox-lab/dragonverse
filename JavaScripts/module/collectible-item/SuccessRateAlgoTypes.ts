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
            return TestAlgo;
        case SuccessRateAlgoTypes.Null:
        default:
            return NormalAlgo;
    }
}

export function NormalAlgo(): number {
    return 1;
}

export function TestAlgo(): number {
    return 0.8;
}