/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-24 11:08:52
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-24 14:14:53
 * @FilePath     : \nevergiveup\JavaScripts\Bubble\BubbleScript.ts
 * @Description  : 修改描述
 */
import { BubbleProxy, IBubbleUI } from "module_bubble";
import { GameManager } from "../GameManager";
import BubbleUI_Generate from "../ui-generate/bubbleModule/BubbleUI_generate";

@Component
export default class BubbleScript extends BubbleProxy {

    protected onStart(): void {
        super.onStart();
        /**监听MGS消息 */
        if (SystemUtil.isClient()) {
            RoomService.registerMGSChatMessageEvent(msg => {
                //这里的0可以替换成其他皮肤配置，可以每个角色不一样
                // Bubble.showBubble(0, msg);
                GameManager.boardcastMessage(msg);
            });
        }
    }
    protected onCreateBubbleUI(): IBubbleUI {
        return UIService.create(BubbleUI_Generate);
    }
}