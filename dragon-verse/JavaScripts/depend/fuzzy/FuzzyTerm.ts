
/**

表示 {@link FuzzyRule} 中一个术语的基类。
*/
export abstract class FuzzyTerm {

    /**
     * 清除隶属度值。
     * @return {FuzzyTerm} 对此术语的引用。
     */
    abstract clearDegreeOfMembership(): FuzzyTerm

    /**
     *返回隶属度。
    * @return {Number} 隶属度。
     */
    abstract getDegreeOfMembership(): number

    /**
    
    *通过给定值更新隶属度。当术语是模糊规则的后件时使用此方法。
    *@param {Number} value - 用于更新隶属度的值。
    *@return {FuzzyTerm} 对此术语的引用。
    */
    abstract updateDegreeOfMembership(value: number): FuzzyTerm

}
