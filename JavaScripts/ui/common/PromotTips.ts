/** 
 * @Author       : zewei.zhang
 * @Date         : 2023-12-27 10:03:10
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2023-12-27 11:10:31
 * @FilePath     : \dragon-verse\JavaScripts\ui\common\PromotTips.ts
 * @Description  : tips弹窗
 */

import PromotItem1_Generate from "../../ui-generate/prompt/PromotItem1_generate";

export module PromotTips {
    class PromotTipsUI extends PromotItem1_Generate {
        onShow(text: string) {
            this.rootCanvas.renderOpacity = 0;
            this.option.text = text;
            this.option.fontSize = 10;
            actions.tween(this.rootCanvas).to(300, { renderOpacity: 1 }).start();
        }
    }

    export function showTips(text: string) {
        UIService.show(PromotTipsUI, text);
    }

    export function hideTips() {
        let ui = UIService.getUI(PromotTipsUI);
        if (ui) {
            actions.tween(ui.rootCanvas).to(300, { renderOpacity: 0 }).call(() => {
                UIService.hide(PromotTipsUI);
            }).start();
        }
    }

}

