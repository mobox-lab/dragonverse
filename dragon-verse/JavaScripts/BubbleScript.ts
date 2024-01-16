import { BubbleProxy, IBubbleUI } from "module_bubble";
import Log4Ts from "./depend/log4ts/Log4Ts";
import BubbleUI_Generate from "./ui-generate/bubbleModule/BubbleUI_generate";

@mw.Component
export default class BubbleScript extends BubbleProxy {
    protected onStart(): void {
        Log4Ts.log(BubbleScript, "bubble module start");
        super.onStart();

    }
    protected onCreateBubbleUI(): IBubbleUI {
        return mw.UIService.create(BubbleUI_Generate);
    }
}