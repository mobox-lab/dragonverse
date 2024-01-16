import { FuzzyCompositeTerm } from '../FuzzyCompositeTerm';

/**
* Hedges是一种特殊的一元运算符，可用于修改模糊集的含义。FAIRLY模糊hedge扩大了成员函数。
* 
* @augments FuzzyCompositeTerm
*/
class FuzzyFAIRLY extends FuzzyCompositeTerm {



	// FuzzyTerm API

	/**
	* 清除成员资格度量值。
	*
	* @return {FuzzyFAIRLY} 对此模糊hedge的引用。
	*/
	clearDegreeOfMembership() {

		const fuzzyTerm = this.terms[0];
		fuzzyTerm.clearDegreeOfMembership();

		return this;

	}

	/**
	* 返回成员资格度量。
	*
	* @return {Number} 成员资格度量。
	*/
	getDegreeOfMembership() {

		const fuzzyTerm = this.terms[0];
		const dom = fuzzyTerm.getDegreeOfMembership();

		return Math.sqrt(dom);

	}

	/**
	* 通过给定值更新成员资格度量。
	*
	* @return {FuzzyFAIRLY} 对此模糊hedge的引用。
	*/
	updateDegreeOfMembership(value) {

		const fuzzyTerm = this.terms[0];
		fuzzyTerm.updateDegreeOfMembership(Math.sqrt(value));

		return this;

	}

}

export { FuzzyFAIRLY };