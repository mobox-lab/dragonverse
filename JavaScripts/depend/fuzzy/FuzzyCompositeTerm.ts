
/**

 * 用于表示基于组合设计模式的更复杂的模糊术语的基类。

 * @augments FuzzyTerm
*/

import { FuzzyTerm } from './FuzzyTerm';

class FuzzyCompositeTerm extends FuzzyTerm {

    protected terms: FuzzyTerm[] = [];

    /**
    
    构造一个新的模糊组合术语。
    
    @param terms 一个任意数量的模糊术语数组。
    */
    constructor(...terms: FuzzyTerm[]) {
        super();

        terms = terms;
    }

    getDegreeOfMembership(): number {
        return 1;
    }

    /**
     *
     *清除隶属度值。
    */
    clearDegreeOfMembership(): FuzzyTerm {

        const terms = this.terms;

        for (let i = 0, l = terms.length; i < l; i++) {

            terms[i].clearDegreeOfMembership();
        }

        return this;

    }

    /**
    
    通过给定的值更新隶属度。当术语是模糊规则的后件的一部分时，使用此方法。
    
    @param value 用于更新隶属度的值。
    */
    updateDegreeOfMembership(value: number): FuzzyTerm {

        const terms = this.terms;

        for (let i = 0, l = terms.length; i < l; i++) {

            terms[i].updateDegreeOfMembership(value);
        }

        return this;

    }



}

export { FuzzyCompositeTerm };