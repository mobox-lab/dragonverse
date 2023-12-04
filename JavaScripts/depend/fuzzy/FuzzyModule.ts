import { FuzzyRule } from './FuzzyRule';
import { FuzzyVariable } from './FuzzyVariable';

/**

表示模糊模块的类。游戏实体使用该类的实例进行模糊推理。模糊模块是一组模糊变量和作用于它们的规则的集合。
*/
class FuzzyModule {


    declare static DEFUZ_TYPE: {
        /* eslint-disable @typescript-eslint/naming-convention */

        MAXAV: number,
        CENTROID: number
    };

    /**
    
    构造一个新的模糊模块。
    */
    constructor(
        /**
        模糊规则的数组。
        @type {Array<FuzzyRule>}
        @readonly
        */
        protected rules: FuzzyRule[] = [],
        /**
        
        FLV 的映射。
        @type {Map<String,FuzzyVariable>}
        @readonly
        */
        protected flvs: Map<string, FuzzyVariable> = new Map()) {


    }

    /**
    
    将给定的 FLV 添加到此模糊模块中，并使用给定的名称进行标识。
    
    @param {String} name - FLV 的名称。
    
    @param {FuzzyVariable} flv - 要添加的 FLV。
    
    @return {FuzzyModule} 对该模糊模块的引用。
    */
    addFLV(name: string, flv: FuzzyVariable) {

        this.flvs.set(name, flv);

        return this;

    }

    /**
    
    从此模糊模块中删除给定名称的 FLV。
    
    @param {String} name - 要删除的 FLV 的名称。
    
    @return {FuzzyModule} 对该模糊模块的引用。
    */
    removeFLV(name) {

        this.flvs.delete(name);

        return this;

    }

    /**
    
    将给定的模糊规则添加到此模糊模块中。
    
    @param {FuzzyRule} rule - 要添加的模糊规则。
    
    @return {FuzzyModule} 对该模糊模块的引用。
    */
    addRule(rule: FuzzyRule) {

        this.rules.push(rule);

        return this;

    }

    /**
    
    从此模糊模块中删除给定的模糊规则。
    
    @param {FuzzyRule} rule - 要删除的模糊规则。
    
    @return {FuzzyModule} 对该模糊模块的引用。
    */
    removeRule(rule: FuzzyRule) {

        const rules = this.rules;

        const index = rules.indexOf(rule);
        rules.splice(index, 1);

        return this;

    }

    /**
    
    调用定义的 FLV 的 fuzzify 方法，并使用给定的值进行模糊化。
    
    @param {String} name - FLV 的名称。
    
    @param {Number} value - 要模糊化的 crisp 值。
    
    @return {FuzzyModule} 对该模糊模块的引用。
    */
    fuzzify(name: string, value: number) {

        const flv = this.flvs.get(name);

        flv.fuzzify(value);

        return this;

    }

    /**
    
    给定模糊变量和解模糊化方法，返回 crisp 值。
    
    @param {String} name - FLV 的名称。
    
    @param {String} type - 解模糊化方法的类型。
    
    @return {Number} 解模糊化后的 crisp 值。
    */
    defuzzify(name: string, type = FuzzyModule.DEFUZ_TYPE.MAXAV) {

        const flvs = this.flvs;
        const rules = this.rules;

        this.innerInitConsequences();

        for (let i = 0, l = rules.length; i < l; i++) {

            const rule = rules[i];

            rule.evaluate();
        }

        const flv = flvs.get(name);

        let value;

        switch (type) {

            case FuzzyModule.DEFUZ_TYPE.MAXAV:
                value = flv.defuzzifyMaxAv();
                break;

            case FuzzyModule.DEFUZ_TYPE.CENTROID:
                value = flv.defuzzifyCentroid();
                break;

            default:
                value = flv.defuzzifyMaxAv(); // 使用 MaxAv 作为回退
        }

        return value;

    }

    private innerInitConsequences() {

        const rules = this.rules;

        // 初始化所有规则的后果。

        for (let i = 0, l = rules.length; i < l; i++) {

            const rule = rules[i];

            rule.initConsequence();

        }

        return this;
    }



}
FuzzyModule.DEFUZ_TYPE = Object.freeze({
    MAXAV: 0,
    CENTROID: 1
});


export { FuzzyModule };
