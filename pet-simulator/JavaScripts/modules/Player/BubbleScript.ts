import { Bubble, BubbleProxy, IBubbleUI } from "module_bubble";
import BubbleUI_Generate from "../../ui-generate/common/BubbleUI_generate";

@Component
export default class BubbleScript extends BubbleProxy {
    protected onStart(): void {
        super.onStart();
        /**监听MGS消息 */
        if (SystemUtil.isClient()) {
            mw.RoomService.registerMGSChatMessageEvent(msg => {
                //这里的0可以替换成其他皮肤配置，可以每个角色不一样
                Bubble.showBubble(0, msg);
            });
        }
    }
    protected onCreateBubbleUI(): IBubbleUI {
        return mw.UIService.create(BubbleUI_Generate);
    }
}