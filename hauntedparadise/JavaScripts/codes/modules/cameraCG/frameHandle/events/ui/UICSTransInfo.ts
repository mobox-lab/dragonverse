import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSTransInfoUI_Generate } from "../../../ui/generate/frameInfo/CSTransInfoUI_generate";
import { Log } from "../../../utils/Log";
import { UIEvents } from "../EventsHandle";
import { TransParams } from "../handles/TransHandle";


export class UICSTransInfo extends CSTransInfoUI_Generate implements UIEvents {

    public data: TransParams;

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
            { input: this.in_posX, keys: ["position", "x"] },
            { input: this.in_posY, keys: ["position", "y"] },
            { input: this.in_posZ, keys: ["position", "z"] },
            { input: this.in_rotX, keys: ["rotation", "x"] },
            { input: this.in_rotY, keys: ["rotation", "y"] },
            { input: this.in_rotZ, keys: ["rotation", "z"] },
            { input: this.in_scaleX, keys: ["scale", "x"] },
            { input: this.in_scaleY, keys: ["scale", "y"] },
            { input: this.in_scaleZ, keys: ["scale", "z"] },
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
        this.data = info.getParams<TransParams>();
        this.in_targetId.text = this.data.targetId ? this.data.targetId : "";
        this.in_posX.text = this.data.position.x.toString();
        this.in_posY.text = this.data.position.y.toString();
        this.in_posZ.text = this.data.position.z.toString();
        this.in_rotX.text = this.data.rotation.x.toString();
        this.in_rotY.text = this.data.rotation.y.toString();
        this.in_rotZ.text = this.data.rotation.z.toString();
        this.in_scaleX.text = this.data.scale.x.toString();
        this.in_scaleY.text = this.data.scale.y.toString();
        this.in_scaleZ.text = this.data.scale.z.toString();
    }

}
