import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSLightingInfoUI_Generate } from "../../../ui/generate/frameInfo/CSLightingInfoUI_generate";
import { Log } from "../../../utils/Log";
import { UIEvents } from "../EventsHandle";
import { LightParams } from "../handles/LightHandle";


export class UICSLightInfo extends CSLightingInfoUI_Generate implements UIEvents {

    public data: LightParams;

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
    }

    private initUI(): void {
        const inputs = [
            { input: this.in_yaw, keys: ["yaw"] },
            { input: this.in_pitch, keys: ["pitch"] },
            { input: this.in_directional_Intensity, keys: ["intensity"] },
            { input: this.in_sky_Intensity, keys: ["skyIntensity"] },
            { input: this.in_temperature, keys: ["temperature"] },
            { input: this.in_ev100, keys: ["ev100"] }
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
        this.in_directional_color.onTextChanged.add((text) => {
            const color = LinearColor.colorHexToLinearColor(text);
            if (!color) return;
            this.data.color = text;
            this.img_directional_color.imageColor = color;
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
        this.in_sky_color.onTextChanged.add((text) => {
            const color = LinearColor.colorHexToLinearColor(text);
            if (!color) return;
            this.data.skyColor = text;
            this.img_sky_color.imageColor = color;
            CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
        });
    }

    setData(info: EventFrameInfo): void {
        this.data = info.getParams<LightParams>();
        this.in_yaw.text = this.data.yaw.toString();
        this.in_pitch.text = this.data.pitch.toString();
        this.in_directional_Intensity.text = this.data.intensity.toString();
        this.in_directional_color.text = this.data.color;
        this.in_sky_Intensity.text = this.data.skyIntensity.toString();
        this.in_sky_color.text = this.data.skyColor;
        this.in_temperature.text = this.data.temperature.toString();
        this.in_ev100.text = this.data.ev100.toString();
        this.img_directional_color.imageColor = LinearColor.colorHexToLinearColor(this.data.color);
        this.img_sky_color.imageColor = LinearColor.colorHexToLinearColor(this.data.skyColor);
    }

}
