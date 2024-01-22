import { FuzzySet } from '../FuzzySet';

/**
* 表示左肩形模糊集的类。峰值和左边界点之间的范围表示相同的 DOM。
*
* @augments FuzzySet
*/
class LeftShoulderFuzzySet extends FuzzySet {

	/**
	* 构造一个新的左肩形模糊集。
	*
	* @param {Number} left - 表示模糊集的左边界。
	* @param {Number} midpoint - 表示模糊集的峰值。
	* @param {Number} right - 表示模糊集的右边界。
	*/
	constructor(public left = 0, public midpoint = 0, public right = 0) {

		// 代表值是肩部平台的中点

		const representativeValue = (midpoint + left) / 2;

		super(representativeValue);



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

		// 如果给定值在中心左侧或等于中心，则找到 DOM

		if ((value >= left) && (value <= midpoint)) {

			return 1;

		}

		// 如果给定值在中心右侧，则找到 DOM

		if ((value > midpoint) && (value <= right)) {

			const grad = 1 / (right - midpoint);

			return grad * (right - value);

		}

		// 超出范围

		return 0;

	}


}

export { LeftShoulderFuzzySet };