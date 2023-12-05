import { FuzzyCompositeTerm } from '../FuzzyCompositeTerm';

/**
* Hedges是一种特殊的一元运算符，可以用于修改模糊集的含义。FAIRLY模糊hedge扩大了成员关系函数。
*
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzyCompositeTerm
*/
class FuzzyVERY extends FuzzyCompositeTerm {



	// FuzzyTerm API

	/**
	* 清除成员资格值。
	*
	* @return {FuzzyVERY} 对此模糊hedge的引用。
	*/
	clearDegreeOfMembership() {

		const fuzzyTerm = this.terms[0];
		fuzzyTerm.clearDegreeOfMembership();

		return this;

	}

	/**
	* 返回成员资格度。
	*
	* @return {Number} 成员资格度。
	*/
	getDegreeOfMembership() {

		const fuzzyTerm = this.terms[0];
		const dom = fuzzyTerm.getDegreeOfMembership();

		return dom * dom;

	}

	/**
	* 通过给定值更新成员资格度。
	*
	* @return {FuzzyVERY} 对此模糊hedge的引用。
	*/
	updateDegreeOfMembership(value) {

		const fuzzyTerm = this.terms[0];
		fuzzyTerm.updateDegreeOfMembership(value * value);

		return this;

	}

}

export { FuzzyVERY };