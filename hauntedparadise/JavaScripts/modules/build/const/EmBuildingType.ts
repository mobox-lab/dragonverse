

export enum EmBuildingType {
    /**
     * 建筑材料
     */
    Normal = 1,
    /**
     * 伤害<伤害间隔,伤害值>
     */
    Damage = 2,
    /**
     * 弹簧<弹力大小>
     */
    Trampoline = 3,
    /**
     * 水果(回血)<回血数量>
     */
    Fruit = 4,
    /**
     * 建筑生成器<生成间隔时间,最大数量,...ItemCfgIds>
     */
    Spawner = 5,
}