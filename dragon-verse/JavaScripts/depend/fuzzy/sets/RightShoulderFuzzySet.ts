import { FuzzySet } from '../FuzzySet';

/**
* 表示具有右肩形状的模糊集的类。中点和右边界点之间的范围表示相同的DOM。
*
* @augments FuzzySet
*/
class RightShoulderFuzzySet extends FuzzySet {

	/**
	* 使用给定值构造新的右肩形状的模糊集。
	*
	* @param {Number} left - 表示此模糊集的左边界。
	* @param {Number} midpoint - 表示此模糊集的峰值。
	* @param {Number} right - 表示此模糊集的右边界。
	*/
	constructor(public left = 0, public midpoint = 0, public right = 0) {

		// 代表值是肩膀平台的中点

		const representativeValue = (midpoint + right) / 2;

		super(representativeValue);



	}

	/**
	* 计算给定值的成员资格度。
	*
	* @param {Number} value - 用于计算成员资格度的值。
	* @return {Number} 成员资格度。
	*/
	computeDegreeOfMembership(value) {

		const midpoint = this.midpoint;
		const left = this.left;
		const right = this.right;

		// 如果给定值在中心左侧或等于中心，则查找DOM

		if ((value >= left) && (value <= midpoint)) {

			const grad = 1 / (midpoint - left);

			return grad * (value - left);

		}

		// 如果给定值在中点右侧，则查找DOM

		if ((value > midpoint) && (value <= right)) {

			return 1;

		}

		// 超出范围

		return 0;

	}



}

export { RightShoulderFuzzySet };