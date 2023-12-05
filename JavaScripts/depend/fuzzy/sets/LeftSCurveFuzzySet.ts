import { FuzzySet } from '../FuzzySet';

/**
* 表示一个具有S形成员函数的模糊集合的类，其值从高到低。
*
* @author {@link https://github.com/robp94|robp94}
* @augments FuzzySet
*/
class LeftSCurveFuzzySet extends FuzzySet {

	/**
	* 构造一个新的S形模糊集合，具有给定的值。
	*
	* @param {Number} left - 表示此模糊集合的左边界。
	* @param {Number} midpoint - 表示此模糊集合的峰值。
	* @param {Number} right - 表示此模糊集合的右边界。
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

		// 如果给定的值在中心左侧或等于中心，则找到DOM

		if ((value >= left) && (value <= midpoint)) {

			return 1;

		}

		// 如果给定的值在中心右侧，则找到DOM

		if ((value > midpoint) && (value <= right)) {

			if (value >= ((midpoint + right) / 2)) {

				return 2 * (Math.pow((value - right) / (midpoint - right), 2));

			} else { //todo test

				return 1 - (2 * (Math.pow((value - midpoint) / (midpoint - right), 2)));

			}

		}

		// 超出范围

		return 0;

	}



}

export { LeftSCurveFuzzySet };