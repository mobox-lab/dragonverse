/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-10 18:53:17
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-29 15:48:07
 * @FilePath     : \nevergiveup\JavaScripts\UI\UILoading.ts
 * @Description  : 修改描述
 */

import LoadingUI_Generate from "../ui-generate/Sundry/LoadingUI_generate";

export class UILoading extends LoadingUI_Generate {
    onStart() {
        this.layer = UILayerTop;
    }
}