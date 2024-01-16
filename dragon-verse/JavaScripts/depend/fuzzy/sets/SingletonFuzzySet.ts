import { FuzzySet } from '../FuzzySet';

/**
* 表示一个模糊集合的类，它是一个单例。在它的范围内，隶属度始终为一。
*
* @author {@link https://github.com/Mugen87|Mugen87}
* @augments FuzzySet
*/
class SingletonFuzzySet extends FuzzySet {

	/**
	* 构造一个新的单例模糊集合，并给出相应的值。
	*
	* @param {Number} left - 表示模糊集合的左边界。
	* @param {Number} midpoint - 表示模糊集合的峰值。
	* @param {Number} right - 表示模糊集合的右边界。
	*/
	constructor(public left = 0, public midpoint = 0, public right = 0) {

		super(midpoint);



	}

	/**
	* 计算给定值的隶属度。
	*
	* @param {Number} value - 用于计算隶属度的值。
	* @return {Number} 隶属度。
	*/
	computeDegreeOfMembership(value) {

		const left = this.left;
		const right = this.right;

		return (value >= left && value <= right) ? 1 : 0;

	}



}

export { SingletonFuzzySet };