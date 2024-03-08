/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-28 13:48:58
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-02-28 14:19:12
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\ui\UIPrizeTips.ts
 * @Description  : 
 */

import PrizeTips_UI_Generate from "../../../../ui-generate/ShareUI/treasureBox/PrizeTips_UI_generate";
import { CloseFloatWindow } from "../../../ui/CloseFloatWindow";

export class UIPrizeTips extends PrizeTips_UI_Generate {

    onShow(position: Vector2, name: string, description: string) {
        this.text_name.text = name;
        this.text_tips.text = description;
        this.rootCanvas.position = position;
        UIService.show(CloseFloatWindow)
    }
}