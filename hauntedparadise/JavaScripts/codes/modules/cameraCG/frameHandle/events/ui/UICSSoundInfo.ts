
// import { SoundParam } from "../../../../ghost/GhostDefine";
import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSEffectInfoUI_Generate } from "../../../ui/generate/frameInfo/CSEffectInfoUI_generate";
import CSSoundInfoUI_Generate from "../../../ui/generate/frameInfo/CSSoundInfoUI_generate";
import { Log } from "../../../utils/Log";
import { UIEvents } from "../EventsHandle";
import { SoundParams } from "../handles/SoundHandle";


export class UICSSoundInfo extends CSSoundInfoUI_Generate implements UIEvents {

    public data: SoundParams;

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
        const inputs = [
            { input: this.in_Keeptime, keys: ["keepTime"] },
            { input: this.in_loopCount, keys: ["loopCount"] },
            { input: this.in_VolSize, keys: ["volume"] },
        ];
        inputs.forEach((item) => {
            item.input.onTextChanged.add((text) => {
                if (!this.data) return;
                if (CSEditor.instance.selectFramesIndex < 0) return;
                const textNumber = Number(text.trim())
                if (isNaN(textNumber) || textNumber == undefined || textNumber == null) {
                    Log.warn("关键帧值设置异常");
                    return
                }
                let obj = this.data;
                item.keys.forEach((key, index) => {
                    if (index == item.keys.length - 1) {
                        obj[key] = textNumber;
                    } else {
                        obj = obj[key];
                    }
                })
                CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
            });
        })
    }

    setData(info: EventFrameInfo): void {
        this.data = JSON.parse(info.params) as SoundParams;
        this.in_assetId.text = this.data.assetId;
        this.in_targetId.text = this.data.targetId ? this.data.targetId : "";
        this.in_loopCount.text = this.data.loopCount.toString();
        this.in_Keeptime.text = this.data.keepTime.toString();
        this.in_VolSize.text = this.data.volume.toString();
    }

}
