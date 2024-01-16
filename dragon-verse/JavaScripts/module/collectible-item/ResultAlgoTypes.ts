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
            return testAlgo;
        case ResultAlgoTypes.Null:
        default:
            return normalResultAlgo;
    }
}

export function normalResultAlgo() {
    return 10;
}

export function testAlgo(): number {
    return 100;
}