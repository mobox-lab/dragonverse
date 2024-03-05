/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-05 10:36:11
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-05 10:56:51
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\obby\ObbyPortalTrigger.ts
 * @Description  : 修改描述
 */

import { BagModuleC } from "../../module/bag/BagModule";
import ObbyEnterFailPanel from "../../ui/obby/ObbyEnterFailPanel";
import ObbyEnterPanel from "../../ui/obby/ObbyEnterPanel";

import PortalTrigger from "../portal/PortalTrigger";

export default class ObbyPortalTrigger extends PortalTrigger {

    protected async transferPlayer(character: mw.Character) {
        //先弹确认ui
        let ui = UIService.show(ObbyEnterPanel);
        ui.onClickYesCallBack = async () => {
            //检查次数
            let res = await ModuleService.getModule(BagModuleC).consumeObbyTicket();
            if (res) {
                super.transferPlayer(character);
            } else {
                UIService.show(ObbyEnterFailPanel);
            }
        };
    }
}