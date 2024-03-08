import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSNavInfoUI_Generate } from "../../../ui/generate/frameInfo/CSNavInfoUI_generate";
import { Log } from "../../../utils/Log";
import { UIEvents } from "../EventsHandle";
import { NavParams } from "../handles/NavHandle";


export class UICSNavInfo extends CSNavInfoUI_Generate implements UIEvents {

    public data: NavParams;

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
        const inputs = [
            { input: this.in_radius, keys: ["radius"] },
            { input: this.in_posX, keys: ["position", "x"] },
            { input: this.in_posY, keys: ["position", "y"] },
            { input: this.in_posZ, keys: ["position", "z"] },
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
        this.data = JSON.parse(info.params) as NavParams;
        this.in_targetId.text = this.data.targetId;
        this.in_radius.text = this.data.radius.toString();
        this.in_posX.text = this.data.position.x.toString();
        this.in_posY.text = this.data.position.y.toString();
        this.in_posZ.text = this.data.position.z.toString();
    }

}
