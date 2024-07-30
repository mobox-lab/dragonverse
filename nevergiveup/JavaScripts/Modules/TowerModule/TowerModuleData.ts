/*
 * @Author: shifu.huang
 * @Date: 2023-02-08 14:41:36
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-04 15:37:50
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\TowerModuleData.ts
 * @Description: 塔模块数据
 */


export class TowerModuleData extends Subdata {
    /** 第一次做某事 */
    @Decorator.persistence()
    firstAction: string[];

    /**
     * 数据初始化，给这些数据一个默认值
     */
    protected override initDefaultData(): void {
        this.firstAction = [];
    }
    
    protected onDataInit(): void {
        console.error("数据初始化");
    }
}