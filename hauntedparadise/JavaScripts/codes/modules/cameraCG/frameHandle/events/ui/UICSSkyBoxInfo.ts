import { CSEditor } from "../../../CSEditor";
import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { CSSkyBoxInfoUI_Generate } from "../../../ui/generate/frameInfo/CSSkyBoxInfoUI_generate";
import { Log } from "../../../utils/Log";
import { UIEvents } from "../EventsHandle";
import { SkyBoxParams } from "../handles/SkyBoxHandle";


export class UICSSkyBoxInfo extends CSSkyBoxInfoUI_Generate implements UIEvents {

    public data: SkyBoxParams;

    protected onStart(): void {
        this.layer = UILayerTop;
        this.initUI();
    }

    private initUI(): void {
        const inputs = [
            { input: this.in_sun_Intensity, keys: ["sunIntensity"] },
            { input: this.in_moon_Intensity, keys: ["moonIntensity"] },
            { input: this.in_skybox_Intensity, keys: ["intensity"] },
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
                        // 特殊处理
                        if (key == "sunIntensity") {
                            if (textNumber == 0) {
                                obj.sunVisible = false;
                            } else {
                                obj.sunVisible = true;
                            }
                        } else if (key == "moonIntensity") {
                            if (textNumber == 0) {
                                obj.moonVisible = false;
                            } else {
                                obj.moonVisible = true;
                            }
                        }
                        obj[key] = textNumber;
                    } else {
                        obj = obj[key];
                    }
                })
                CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
            });
        })
        const colorInputs = [
            { input: this.in_skybox_color, img: this.img_skybox_color, keys: ["baseColor"] },
            { input: this.in_skybox_color_top, img: this.img_skybox_color_top, keys: ["topColor"] },
            { input: this.in_skybox_color_middle, img: this.img_skybox_color_middle, keys: ["middleColor"] },
            { input: this.in_skybox_color_bottom, img: this.img_skybox_color_bottom, keys: ["bottomColor"] },
            { input: this.in_sun_color, img: this.img_sun_color, keys: ["sunColor"] },
            { input: this.in_moon_color, img: this.img_moon_color, keys: ["moonColor"] },
        ];
        colorInputs.forEach((item) => {
            item.input.onTextChanged.add((text) => {
                const color = LinearColor.colorHexToLinearColor(text);
                if (!color) return;
                item.img.imageColor = color;
                let obj = this.data;
                item.keys.forEach((key, index) => {
                    if (index == item.keys.length - 1) {
                        obj[key] = text;
                    } else {
                        obj = obj[key];
                    }
                })
                CSEditor.instance.modifyEventFramesParams(CSEditor.instance.selectFramesIndex, JSON.stringify(this.data));
            });
        });
    }

    setData(info: EventFrameInfo): void {
        this.data = info.getParams<SkyBoxParams>();
        this.in_skybox_Intensity.text = this.data.intensity.toString();
        this.in_skybox_color.text = this.data.baseColor;
        this.in_skybox_color_top.text = this.data.topColor;
        this.in_skybox_color_middle.text = this.data.middleColor;
        this.in_skybox_color_bottom.text = this.data.bottomColor;
        this.in_sun_Intensity.text = this.data.sunIntensity.toString();
        this.in_sun_color.text = this.data.sunColor;
        this.in_moon_Intensity.text = this.data.moonIntensity.toString();
        this.in_moon_color.text = this.data.moonColor;

        this.img_skybox_color.imageColor = LinearColor.colorHexToLinearColor(this.data.baseColor);
        this.img_skybox_color_top.imageColor = LinearColor.colorHexToLinearColor(this.data.topColor);
        this.img_skybox_color_middle.imageColor = LinearColor.colorHexToLinearColor(this.data.middleColor);
        this.img_skybox_color_bottom.imageColor = LinearColor.colorHexToLinearColor(this.data.bottomColor);
        this.img_sun_color.imageColor = LinearColor.colorHexToLinearColor(this.data.sunColor);
        this.img_moon_color.imageColor = LinearColor.colorHexToLinearColor(this.data.moonColor);
    }

}
