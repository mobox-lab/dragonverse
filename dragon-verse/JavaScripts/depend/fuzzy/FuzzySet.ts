import { FuzzyTerm } from './FuzzyTerm';
/**
 * 生成uuid
 * @returns 
 */
function generateUUID(): string {
    let d = new Date().getTime();

    const uuid = 'xyx-xxy'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/**

模糊集合的基类。这种类型的集合由一个成员函数定义，可以是任意形状，但通常是三角形或梯形。它们定义了一个从完全在集合外部的区域到完全在集合内部的区域的渐进过渡，从而使值具有对集合的部分成员资格。

这个类是从{@link FuzzyTerm}派生的，所以它可以直接用于模糊规则中。根据组合设计模式，模糊集合可以被视为一个原子模糊术语。
*/
export class FuzzySet extends FuzzyTerm {


    /**
       
    *表示对此模糊集合的成员资格的程度。
    *@type {Number}
    *@default 0
    */
    public degreeOfMembership = 0;

    /**
     
    *集合成员函数的最大值。例如，如果集合是三角形，则这将是三角形的峰值点。如果集合有平台，则此值将是平台的中点。用于避免运行时计算。
    *@type {Number}
    *@default 0
    */
    public representativeValue = 0;

    /**
     
    *表示此模糊集合的左边界。
    *@type {Number}
    *@default 0
    */
    public left = 0;

    /**
     
    *表示此模糊集合的右边界。
    *@type {Number}
    *@default 0
    */
    public right = 0;
    //

    private _uuid = null;

    /**
     
    构造给定值的新模糊集合。
     
    @param {Number} representativeValue - 集合成员函数的最大值。
    */
    constructor(representativeValue = 0) {

        super();
        this.representativeValue = representativeValue;



    }

    /**
    
    唯一ID，主要用于序列化/反序列化的上下文中。
    
    @type {String}
    
    @readonly
    */
    get uuid() {

        if (this._uuid === null) {

            this._uuid = generateUUID();
        }

        return this._uuid;

    }

    /**
    
    *计算给定值的成员资格度。请注意，此方法不设置{@link FuzzySet＃degreeOfMembership}，因为其他类使用它来计算中间成员资格度值。所有具体的模糊集合类都应该实现此方法。
    *@param {Number} value - 用于计算成员资格度的值。
    *@return {Number} 成员资格度。
    
    **/
    computeDegreeOfMembership(value: number) { return value }


    /**
    
    *清除成员资格度值。
    
    *@return {FuzzySet} 对此模糊集合的引用。
    */
    clearDegreeOfMembership() {

        this.degreeOfMembership = 0;

        return this;

    }

    /**
    
    * 返回成员资格度。
    
    *@return {Number} 成员资格度。
    */
    getDegreeOfMembership() {

        return this.degreeOfMembership;

    }

    /**
    
    *通过给定的值更新成员资格度。当集合是模糊规则的结论的一部分时，使用此方法。
    
    *@return {FuzzySet} 对此模糊集合的引用。
    */
    updateDegreeOfMembership(value) {

        // 如果给定值大于现有值，则更新成员资格度

        if (value > this.degreeOfMembership) this.degreeOfMembership = value;

        return this;

    }





}
