/**
 * 采集结果算法 enum.
 */
export enum ResultAlgoTypes {
    /**
     * 空置.
     */
    Null,
}

export type ResultAlgo = (...param: unknown[]) => number;

export function ResultAlgoFactory(type: ResultAlgoTypes): ResultAlgo {
    switch (type) {
        case ResultAlgoTypes.Null:
        default:
            return NormalResultAlgo;
    }
}

export function NormalResultAlgo() {
    return 10;
}