'use strict';

var UE = require('ue');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var UE__namespace = UE;

var KeyboardSimulation;
(function (KeyboardSimulation) {
    /**
     * @author            jie.wu
     * @description       设置镜头灵敏度
     * @effect            只在客户端调用生效
     * @param value        value:设置的值
     */
    function setLookUpRateScale(value) {
        UE__namespace.MWKeyboardSimulationConfig.SetLookUpRateScale(value);
    }
    KeyboardSimulation.setLookUpRateScale = setLookUpRateScale;
    /**
     * @author            jie.wu
     * @description       获取镜头灵敏度
     * @effect            只在客户端调用生效
     * @return            获取镜头灵敏度
     */
    function getLookUpRateScale() {
        return UE__namespace.MWKeyboardSimulationConfig.GetLookUpRateScale();
    }
    KeyboardSimulation.getLookUpRateScale = getLookUpRateScale;
})(KeyboardSimulation || (KeyboardSimulation = {}));
globalThis.KeyboardSimulation = KeyboardSimulation;

var foreign0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get KeyboardSimulation () { return KeyboardSimulation; }
});

const MWModuleMap = { 
     'index': foreign0,
};

exports.MWModuleMap = MWModuleMap;
//# sourceMappingURL=index.js.map
