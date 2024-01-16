import { FuzzySet } from '../FuzzySet';

/**
* 用于表示具有三角形形状的模糊集的类。它可以通过左点、中点（峰值）和右点来定义。
*/
class TriangularFuzzySet extends FuzzySet {

	/**
	* 使用给定的值构造一个新的三角形模糊集。
	*
	* @param {Number} left - 表示此模糊集的左边界。
	* @param {Number} midpoint - 表示此模糊集的峰值。
	* @param {Number} right - 表示此模糊集的右边界。
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

		const midpoint = this.midpoint;
		const left = this.left;
		const right = this.right;

		// 如果给定值位于中心左侧或等于中心，则查找DOM

		if ((value >= left) && (value <= midpoint)) {

			const grad = 1 / (midpoint - left);

			return grad * (value - left);

		}

		// 如果给定值位于中心右侧，则查找DOM

		if ((value > midpoint) && (value <= right)) {

			const grad = 1 / (right - midpoint);

			return grad * (right - value);

		}

		// 超出范围

		return 0;

	}



}

export { TriangularFuzzySet };