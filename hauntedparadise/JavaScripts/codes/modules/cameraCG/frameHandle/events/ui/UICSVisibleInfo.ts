import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSVisibleInfoUI_Generate } from "../../../ui/generate/frameInfo/CSVisibleInfoUI_generate";
import { UIEvents } from "../EventsHandle";
import { VisibleParams } from "../handles/VisibleHandle";


export class UICSVisibleInfo extends CSVisibleInfoUI_Generate implements UIEvents {

    public data: VisibleParams;

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
    }

    private initUI(): void {
        this.in_targetId.onTextChanged.add((text) => {
            if (!this.data) return;
            this.data.targetId = text.trim();
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
        this.in_visible.onTextChanged.add((text) => {
            if (!this.data) return;
            this.data.visible = text.trim() != "0";
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
    }

    setData(info: EventFrameInfo): void {
        this.data = JSON.parse(info.params) as VisibleParams;
        this.in_targetId.text = this.data.targetId;
        this.in_visible.text = this.data.visible ? "1" : "0";
    }

}
