declare namespace KeyboardSimulation {
    /**
     * @author            jie.wu
     * @description       设置镜头灵敏度
     * @effect            只在客户端调用生效
     * @param value        value:设置的值
     */
    function setLookUpRateScale(value: number): void;
    /**
     * @author            jie.wu
     * @description       获取镜头灵敏度
     * @effect            只在客户端调用生效
     * @return            获取镜头灵敏度
     */
    function getLookUpRateScale(): number;
}
