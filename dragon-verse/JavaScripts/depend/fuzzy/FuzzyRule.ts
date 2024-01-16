import { FuzzyTerm } from './FuzzyTerm';




/**

表示模糊规则的类。模糊规则由前提和结论组成，形式为：IF 前提 THEN 结论。
与具有离散值的普通 if/else 语句相比，模糊规则的结论术语可以以一定的程度触发。
*/
export class FuzzyRule {
    /*
    构造一个新的模糊规则。
    @param antecedent 表示规则条件的模糊术语。
    @param consequence 描述条件得到满足时的结论。
    */
    constructor(protected readonly antecedent: FuzzyTerm = null, protected readonly consequence: FuzzyTerm = null) {

    }

    /**
    
    初始化此模糊规则的结论术语。
    */
    initConsequence() {
        this.consequence.clearDegreeOfMembership();
        return this;
    }

    /**
    
    评估规则并使用前提术语的隶属度更新结论术语的隶属度。
    */
    evaluate() {
        this.consequence.updateDegreeOfMembership(this.antecedent.getDegreeOfMembership());
        return this;
    }


}




