import { FuzzySet } from '../FuzzySet';

/**
* 表示具有从最低到最高的 S 形成员函数的模糊集的类。
*
* 
* @augments FuzzySet
*/
class RightSCurveFuzzySet extends FuzzySet {

	/**
	* 构造具有给定值的新 S 曲线模糊集。
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
	* 计算给定值的隶属度。
	*
	* @param {Number} value - 用于计算隶属度的值。
	* @return {Number} 隶属度。
	*/
	computeDegreeOfMembership(value) {

		const midpoint = this.midpoint;
		const left = this.left;
		const right = this.right;

		// 如果给定值在中心的左边或等于中心，则查找 DOM

		if ((value >= left) && (value <= midpoint)) {

			if (value <= ((left + midpoint) / 2)) {

				return 2 * (Math.pow((value - left) / (midpoint - left), 2));

			} else {

				return 1 - (2 * (Math.pow((value - midpoint) / (midpoint - left), 2)));

			}


		}

		// 如果给定值在中点右侧，则查找 DOM

		if ((value > midpoint) && (value <= right)) {

			return 1;

		}

		// 超出范围

		return 0;

	}



}

export { RightSCurveFuzzySet };