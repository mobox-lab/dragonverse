import { Bubble } from "module_bubble";
import GToolkit from "../../../util/GToolkit";
import { CompanionContext } from "../context/CompanionContext";
import { TalkContext } from "../context/TalkContext";
import { AAction } from "./base/Action";

export class TalkAction extends AAction<TalkContext>{


    private _lastMessage: string = undefined

    constructor(
        public messageDict: string[] = []
    ) {
        super();
    }

    protected onExecuted(context: TalkContext) {
        this.coolDown = GToolkit.random(3, 10, true) * 1000;
    }


    private selected() {

        let index = GToolkit.random(0, this.messageDict.length, true);
        let message = this.messageDict[index];
        this.messageDict.splice(index, 1);
        if (this._lastMessage) {
            this.messageDict.push(this._lastMessage);
        }
        this._lastMessage = message;
        return message;
    }

    protected onUpdate(context: CompanionContext) {
        let message = this.selected();
        Bubble.showBubble(0, message, context.talker, true)
        this.endInSuccess(context);
    }
    protected onStop(context: CompanionContext) {

    }

}