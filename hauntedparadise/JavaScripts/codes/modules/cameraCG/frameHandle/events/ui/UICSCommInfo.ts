import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSCommInfoUI_Generate } from "../../../ui/generate/frameInfo/CSCommInfoUI_generate";
import { UIEvents } from "../EventsHandle";

export type EventParams = {
    eventName: string,
    params: string
}

export class UICSCommInfo extends CSCommInfoUI_Generate implements UIEvents {

    public data: EventParams;

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
    }

    private initUI(): void {
        this.in_eventName.onTextChanged.add((text) => {
            if (!this.data) return;
            this.data.eventName = text.trim();
            CSEditor.instance.modifyEventFramesName(CSEditor.instance.selectFramesIndex, this.data.eventName);
        });
        this.in_params.onTextChanged.add((text) => {
            if (!this.data) return;
            this.data.params = text.trim();
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, this.data.params);
        });
    }

    setData(info: EventFrameInfo): void {
        this.data = {
            eventName: info.name.slice(),
            params: info.params.slice()
        }
        this.in_eventName.text = this.data.eventName;
        this.in_params.text = this.data.params;
    }

}
