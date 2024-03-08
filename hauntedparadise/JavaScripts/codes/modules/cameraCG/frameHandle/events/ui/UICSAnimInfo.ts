import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSAnimInfoUI_Generate } from "../../../ui/generate/frameInfo/CSAnimInfoUI_generate";
import { Log } from "../../../utils/Log";
import { UIEvents } from "../EventsHandle";
import { AnimParams } from "../handles/AnimHandle";


export class UICSAnimInfo extends CSAnimInfoUI_Generate implements UIEvents {

    public data: AnimParams;

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
    }

    private initUI(): void {
        this.in_assetId.onTextChanged.add((text) => {
            if (!this.data) return;
            this.data.assetId = text.trim();
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
        this.in_targetId.onTextChanged.add((text) => {
            if (!this.data) return;
            this.data.targetId = text.trim();
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
        this.in_speed.onTextChanged.add((text) => {
            if (!this.data) return;
            const textNumber = Number(text.trim())
            if (isNaN(textNumber) || textNumber == undefined) {
                Log.warn("关键帧值设置异常");
                return
            }
            this.data.speed = textNumber;
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
        this.in_loopCount.onTextChanged.add((text) => {
            if (!this.data) return;
            const textNumber = Number(text.trim())
            if (isNaN(textNumber) || textNumber == undefined) {
                Log.warn("关键帧值设置异常");
                return
            }
            this.data.loopCount = textNumber;
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
    }

    setData(info: EventFrameInfo): void {
        this.data = JSON.parse(info.params) as AnimParams;
        this.in_assetId.text = this.data.assetId;
        this.in_targetId.text = this.data.targetId;
        this.in_speed.text = this.data.speed.toString();
    }

}
