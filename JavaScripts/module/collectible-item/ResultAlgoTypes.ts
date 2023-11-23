/**
 * 采集结果算法 enum.
 */
export enum ResultAlgoTypes {
    /**
     * 空置.
     */
    Null,
    /**
     * 测试结果算法.
     */
    TestAlgo
}

export type ResultAlgo = (...param: unknown[]) => number;

export function ResultAlgoFactory(type: ResultAlgoTypes): ResultAlgo {
    switch (type) {
        case ResultAlgoTypes.TestAlgo:
            return TestAlgo;
        case ResultAlgoTypes.Null:
        default:
            return NormalResultAlgo;
    }
}

export function NormalResultAlgo() {
    return 10;
}

export function TestAlgo(): number {
    return 100;
}