import { FuzzyCompositeTerm } from '../FuzzyCompositeTerm';

/**
* 表示AND运算符的类。可用于构建模糊规则。
*
* @augments FuzzyCompositeTerm
*/
class FuzzyAND extends FuzzyCompositeTerm {

	/**
	* 构造具有给定值的新模糊AND运算符。构造函数接受任意数量的模糊术语。
	*/


	/**
	* 返回隶属度的程度。AND运算符返回其操作的集合的最小隶属度。
	*
	* @return {Number} 隶属度的程度。
	*/
	getDegreeOfMembership() {

		const terms = this.terms;
		let minDOM = Infinity;

		for (let i = 0, l = terms.length; i < l; i++) {

			const term = terms[i];
			const currentDOM = term.getDegreeOfMembership();

			if (currentDOM < minDOM) minDOM = currentDOM;

		}

		return minDOM;

	}

}

export { FuzzyAND };