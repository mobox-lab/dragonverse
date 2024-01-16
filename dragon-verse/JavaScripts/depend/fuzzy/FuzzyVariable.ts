import { FuzzySet } from './FuzzySet';


/**
 * 表示模糊语言变量（FLV）的类。FLV是由一个或多个模糊集合组成的，用于定性表示概念或领域。例如，模糊集合“愚笨”、“中等”和“聪明”是模糊语言变量“IQ”的成员。
 *
 */
class FuzzyVariable {



    /**
     * 由组成此FLV的模糊集合的数组。
     * @type {Array<FuzzySet>}
     * @readonly
     */
    public fuzzySets: FuzzySet[] = [];

    /**
     * 此FLV的最小值范围。添加/删除模糊集合时，此值会自动更新。
     * @type {Number}
     * @default Infinity
     * @readonly
     */
    public minRange = Infinity;

    /**
     * 此FLV的最大值范围。添加/删除模糊集合时，此值会自动更新。
     * @type {Number}
     * @default - Infinity
     * @readonly
     */
    public maxRange = - Infinity;

    /**
     * 向此FLV添加给定的模糊集合。
     *
     * @param {FuzzySet} fuzzySet - 要添加的模糊集合。
     * @return {FuzzyVariable} 对此FLV的引用。
     */
    add(fuzzySet: FuzzySet) {

        this.fuzzySets.push(fuzzySet);

        // 调整范围

        if (fuzzySet.left < this.minRange) this.minRange = fuzzySet.left;
        if (fuzzySet.right > this.maxRange) this.maxRange = fuzzySet.right;

        return this;

    }

    /**
     * 从此FLV中删除给定的模糊集合。
     *
     * @param {FuzzySet} fuzzySet - 要删除的模糊集合。
     * @return {FuzzyVariable} 对此FLV的引用。
     */
    remove(fuzzySet: FuzzySet) {

        const fuzzySets = this.fuzzySets;

        const index = fuzzySets.indexOf(fuzzySet);
        fuzzySets.splice(index, 1);

        // 遍历所有模糊集合以重新计算最小/最大范围

        this.minRange = Infinity;
        this.maxRange = - Infinity;

        for (let i = 0, l = fuzzySets.length; i < l; i++) {

            const fuzzySet = fuzzySets[i];

            if (fuzzySet.left < this.minRange) this.minRange = fuzzySet.left;
            if (fuzzySet.right > this.maxRange) this.maxRange = fuzzySet.right;

        }

        return this;

    }

    /**
     * 通过计算其在该变量的每个模糊集合中的隶属度，模糊化值。
     *
     * @param {Number} value - 要模糊化的crips值。
     * @return {FuzzyVariable} 对此FLV的引用。
     */
    fuzzify(value: number) {

        if (value < this.minRange || value > this.maxRange) {

            return;

        }

        const fuzzySets = this.fuzzySets;

        for (let i = 0, l = fuzzySets.length; i < l; i++) {

            const fuzzySet = fuzzySets[i];

            fuzzySet.degreeOfMembership = fuzzySet.computeDegreeOfMembership(value);

        }

        return this;

    }

    /**
     * 使用“最大值平均值”（MaxAv）方法对FLV进行去模糊化。
     *
     * @return {Number} 去模糊化的crips值。
     */
    defuzzifyMaxAv() {

        // 最大值平均值（MaxAv）去模糊化方法通过将每个模糊集合的代表值缩放为其DOM并取平均值来实现

        const fuzzySets = this.fuzzySets;

        let bottom = 0;
        let top = 0;

        for (let i = 0, l = fuzzySets.length; i < l; i++) {

            const fuzzySet = fuzzySets[i];

            bottom += fuzzySet.degreeOfMembership;
            top += fuzzySet.representativeValue * fuzzySet.degreeOfMembership;

        }

        return (bottom === 0) ? 0 : (top / bottom);

    }

    /**
     * 使用“重心”方法对FLV进行去模糊化。
     *
     * @param {Number} samples - 用于去模糊化的样本数量。
     * @return {Number} 去模糊化的crips值。
     */
    defuzzifyCentroid(samples = 10) {

        const fuzzySets = this.fuzzySets;

        const stepSize = (this.maxRange - this.minRange) / samples;

        let totalArea = 0;
        let sumOfMoments = 0;

        for (let s = 1; s <= samples; s++) {

            const sample = this.minRange + (s * stepSize);

            for (let i = 0, l = fuzzySets.length; i < l; i++) {

                const fuzzySet = fuzzySets[i];

                const contribution = Math.min(fuzzySet.degreeOfMembership, fuzzySet.computeDegreeOfMembership(sample));

                totalArea += contribution;

                sumOfMoments += (sample * contribution);

            }

        }

        return (totalArea === 0) ? 0 : (sumOfMoments / totalArea);

    }



}

export { FuzzyVariable };

