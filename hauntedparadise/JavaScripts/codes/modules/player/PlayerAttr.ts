/*
 * @Author       : dal
 * @Date         : 2024-03-06 17:41:50
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-07 14:30:09
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\player\PlayerAttr.ts
 * @Description  : 
 */

/**  玩家身上的基础属性 */
@Serializable
export class PlayerAttr {

    /** 经验系数 */
    @Property({ replicated: true })
    public expIndex: number = 1;

    /** 初始化 */
    public init() {
        this.expIndex = 1;
    }
}