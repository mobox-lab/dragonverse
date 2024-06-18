// /*
//  * @Author: shifu.huang
//  * @Date: 2023-02-08 14:41:36
//  * @LastEditors: shifu.huang
//  * @LastEditTime: 2023-07-17 18:07:12
//  * @FilePath: \invinciblelegend\JavaScripts\modules\rank\RankModuleData.ts
//  * @Description: 修改描述
//  */

// /**
//  * 称号模块的数据，记录玩家的称号和副称号
//  */
// export class RankModuleData extends Subdata {
//     /**玩家称号 */
//     @Decorator.persistence()
//     rank: number;
//     /**玩家副称号 */
//     @Decorator.persistence()
//     subRank: number;

//     /**
//      * 初始化称号和副称号
//      */
//     protected override initDefaultData(): void {
//         this.rank = 1;
//         this.subRank = 1;
//     }
// }