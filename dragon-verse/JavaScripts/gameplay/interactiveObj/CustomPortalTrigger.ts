/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-04-25 16:47:36
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-25 18:10:17
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\CustomPortalTrigger.ts
 * @Description  : 进度条传送门
 */

import Log4Ts from "../../depend/log4ts/Log4Ts";
import { TriggerType } from "./ActiveMode";
import { BasePortalTrigger } from "./BasePortalTrigger";

export default class CustomPortalTrigger extends BasePortalTrigger {
    triggerType: TriggerType = TriggerType.TriggerInClient;

    onStartPortalInServer() {
        // throw new Error("Method not implemented.");
    }
    onStartPortalInClient() {
        Log4Ts.log(BasePortalTrigger, `开始进度条`);
    }
    interruptProgress() {
        Log4Ts.log(BasePortalTrigger, `打断进度条`);
    }
    onProgressDone() {
        Log4Ts.log(BasePortalTrigger, `进度条结束，开始传送`);
    }
}