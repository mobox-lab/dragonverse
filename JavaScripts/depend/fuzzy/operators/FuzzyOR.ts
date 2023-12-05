import { FuzzyCompositeTerm } from '../FuzzyCompositeTerm';

/**
* 表示 OR 运算符的类。可用于构造模糊规则。
*
* @augments FuzzyCompositeTerm
*/
class FuzzyOR extends FuzzyCompositeTerm {



	/**
	* 返回隶属度。AND 运算符返回它操作的集合中的最大隶属度。
	*
	* @return {Number} 隶属度。
	*/
	getDegreeOfMembership() {

		const terms = this.terms;
		let maxDOM = - Infinity;

		for (let i = 0, l = terms.length; i < l; i++) {

			const term = terms[i];
			const currentDOM = term.getDegreeOfMembership();

			if (currentDOM > maxDOM) maxDOM = currentDOM;

		}

		return maxDOM;

	}

}

export { FuzzyOR };