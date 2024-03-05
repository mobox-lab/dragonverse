/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-05 10:36:11
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-05 10:56:51
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\obby\ObbyPortalTrigger.ts
 * @Description  : 修改描述
 */

import {BagModuleC} from "../../module/bag/BagModule";
import PortalTrigger from "../portal/PortalTrigger";

export default class ObbyPortalTrigger extends PortalTrigger {

    protected transferPlayer(character: mw.Character): void {
        //检查次数

        super.transferPlayer(character);
    }
}