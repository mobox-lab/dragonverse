/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-22 14:41:54
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2023-12-22 17:45:27
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\time\timeConfig.ts
 * @Description  : 
 */
//TODO配表

import { GameConfig } from "../../../config/GameConfig";

/**游戏中白天时长 */
export const DayTimeSecond = GameConfig.Global.dayTime.number;//18h*3600s*0.7/60 = 756s
/**游戏中晚上时长 */
export const NightTimeSecond = GameConfig.Global.nightTime.number;//6h*3600s*0.5/60 = 180s
/**游戏一天的时长 */
export const AllTimeSecond = DayTimeSecond + NightTimeSecond;