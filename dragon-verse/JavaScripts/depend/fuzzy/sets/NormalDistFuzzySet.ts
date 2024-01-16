import { FuzzySet } from '../FuzzySet';

/**
* 表示具有正态分布形状的模糊集的类。可以通过均值和标准差来定义。
*
* @author {@link https://github.com/robp94|robp94}
* @augments FuzzySet
*/
class NormalDistFuzzySet extends FuzzySet {


	private _cache: {
		midpoint: number,
		standardDeviation: number,
		variance: number,
		normalizationFactor: number,
	} = Object.create(null);

	/**
	* 构造具有给定值的新三角形模糊集。
	*
	* @param {Number} left - 表示此模糊集的左边界。
	* @param {Number} midpoint - 正态分布的均值或期望值。
	* @param {Number} right - 表示此模糊集的右边界。
	* @param {Number} standardDeviation - 此模糊集的标准差。
	*/
	constructor(public left = 0, public midpoint = 0, public right = 0, public standardDeviation = 0) {

		super(midpoint);





	}

	/**
	* 计算给定值的隶属度。
	*
	* @param {Number} value - 用于计算隶属度的值。
	* @return {Number} 隶属度。
	*/
	computeDegreeOfMembership(value) {

		this.updateCache();

		if (value >= this.right || value <= this.left) return 0;

		return probabilityDensity(value, this.midpoint, this._cache.variance) / this._cache.normalizationFactor;

	}


	//

	private updateCache() {

		const cache = this._cache;
		const midpoint = this.midpoint;
		const standardDeviation = this.standardDeviation;

		if (midpoint !== cache.midpoint || standardDeviation !== cache.standardDeviation) {

			const variance = standardDeviation * standardDeviation;

			cache.midpoint = midpoint;
			cache.standardDeviation = standardDeviation;
			cache.variance = variance;

			// 这个值用于确保DOM位于[0,1]的范围内

			cache.normalizationFactor = probabilityDensity(midpoint, midpoint, variance);

		}

		return this;

	}

}

//

function probabilityDensity(x: number, mean: number, variance: number) {

	return (1 / Math.sqrt(2 * Math.PI * variance)) * Math.exp(- (Math.pow((x - mean), 2)) / (2 * variance));

}

export { NormalDistFuzzySet };