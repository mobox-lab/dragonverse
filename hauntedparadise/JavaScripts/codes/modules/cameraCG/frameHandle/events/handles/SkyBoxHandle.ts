import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { ColorInterpolator } from "../../../simplepathing/interpolator/ColorInterpolator";
import { D2, Interpolator2 } from "../../../simplepathing/interpolator/Interpolator";
import { InterpolatorFactory, InterpolatorType } from "../../../simplepathing/interpolator/InterpolatorFactory";
import { CSCommUitls } from "../../../utils/CSCommUitls";
import { EventsHandle } from "../EventsHandle";
import { EventTriggerType, registerCSEvent } from "../EventsHelper";
import { UICSSkyBoxInfo } from "../ui/UICSSkyBoxInfo";


export type SkyBoxParams = {
    intensity: number,
    baseColor: string,
    topColor: string,
    middleColor: string,
    bottomColor: string,
    sunVisible: boolean,
    sunIntensity: number,
    sunColor: string,
    moonVisible: boolean,
    moonIntensity: number,
    moonColor: string
}

@registerCSEvent(SkyBoxHandle.EVENT, "天空球", UICSSkyBoxInfo, [EventTriggerType.Interpolation])
export class SkyBoxHandle extends EventsHandle {

    static readonly EVENT = "CS.SkyBox";

    private _infos: EventFrameInfo[];

    /** 对象插值器组 */
    private _skyDomeIntensityInter: Interpolator2<D2>;
    private _skyDomeBaseColorInter: ColorInterpolator;
    private _skyDomeTopColorInter: ColorInterpolator;
    private _skyDomeMiddleColorInter: ColorInterpolator;
    private _skyDomeBottomColorInter: ColorInterpolator;
    private _sunIntensityInter: Interpolator2<D2>;
    private _sunColorInter: ColorInterpolator;
    private _moonIntensityInter: Interpolator2<D2>;
    private _moonColorInter: ColorInterpolator;

    getRegParams(): SkyBoxParams {
        return {
            intensity: 1,
            baseColor: "#FFFFFFFF",
            topColor: "#19548BFF",
            middleColor: "#64B2C9FF",
            bottomColor: "#9AB2F3FF",
            sunVisible: true,
            sunIntensity: 40,
            sunColor: "#FFE2B6FF",
            moonVisible: false,
            moonIntensity: 1,
            moonColor: "#FFFFFFFF",
        }
    }

    getDefParams(): SkyBoxParams {
        return {
            intensity: Skybox.skyDomeIntensity,
            baseColor: CSCommUitls.linearColorToHex(Skybox.skyDomeBaseColor),
            topColor: CSCommUitls.linearColorToHex(Skybox.skyDomeTopColor),
            middleColor: CSCommUitls.linearColorToHex(Skybox.skyDomeMiddleColor),
            bottomColor: CSCommUitls.linearColorToHex(Skybox.skyDomeBottomColor),
            sunVisible: Skybox.sunVisible,
            sunIntensity: Skybox.sunIntensity,
            sunColor: CSCommUitls.linearColorToHex(Skybox.sunColor),
            moonVisible: Skybox.moonVisible,
            moonIntensity: Skybox.moonIntensity,
            moonColor: CSCommUitls.linearColorToHex(Skybox.moonColor),
        }
    }

    onReSet(): void {
        if (!this._infos || this._infos.length < 2) return;
        // 还原初始位置
        const params = this._infos[0].getParams<SkyBoxParams>();
        Skybox.skyDomeIntensity = params.intensity;
        Skybox.skyDomeBaseColor = LinearColor.colorHexToLinearColor(params.baseColor);
        Skybox.skyDomeTopColor = LinearColor.colorHexToLinearColor(params.topColor);
        Skybox.skyDomeMiddleColor = LinearColor.colorHexToLinearColor(params.middleColor);
        Skybox.skyDomeBottomColor = LinearColor.colorHexToLinearColor(params.bottomColor);
        Skybox.sunVisible = params.sunVisible;
        Skybox.sunIntensity = params.sunIntensity;
        Skybox.sunColor = LinearColor.colorHexToLinearColor(params.sunColor);
        Skybox.moonVisible = params.moonVisible;
        Skybox.moonIntensity = params.moonIntensity;
        Skybox.moonColor = LinearColor.colorHexToLinearColor(params.moonColor);
    }

    onDataChange(infos: EventFrameInfo[]): void {
        this._infos = infos;
        const paramsInstances: SkyBoxParams[] = [];
        const times = infos.map((info) => info.time);

        for (const info of infos) {
            const params = info.getParams<SkyBoxParams>();
            paramsInstances.push(params);
        }

        this._skyDomeIntensityInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._skyDomeIntensityInter.reCompute(paramsInstances.map((param, index) => { return { x: param.intensity, y: times[index] } }));
        this._skyDomeBaseColorInter = InterpolatorFactory.createColorInterpolator();
        this._skyDomeBaseColorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.baseColor)), times);
        this._skyDomeTopColorInter = InterpolatorFactory.createColorInterpolator();
        this._skyDomeTopColorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.topColor)), times);
        this._skyDomeMiddleColorInter = InterpolatorFactory.createColorInterpolator();
        this._skyDomeMiddleColorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.middleColor)), times);
        this._skyDomeBottomColorInter = InterpolatorFactory.createColorInterpolator();
        this._skyDomeBottomColorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.bottomColor)), times);
        this._sunIntensityInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._sunIntensityInter.reCompute(paramsInstances.map((param, index) => { return { x: param.sunIntensity, y: times[index] } }));
        this._sunColorInter = InterpolatorFactory.createColorInterpolator();
        this._sunColorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.sunColor)), times);
        this._moonIntensityInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._moonIntensityInter.reCompute(paramsInstances.map((param, index) => { return { x: param.moonIntensity, y: times[index] } }));
        this._moonColorInter = InterpolatorFactory.createColorInterpolator();
        this._moonColorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.moonColor)), times);

    }

    onTime(time: number): void {
        if (!this._infos || this._infos.length < 2) return;
        Skybox.skyDomeIntensity = this._skyDomeIntensityInter.interpolate(time);
        Skybox.skyDomeBaseColor = this._skyDomeBaseColorInter.interpolate(time);
        Skybox.skyDomeTopColor = this._skyDomeTopColorInter.interpolate(time);
        Skybox.skyDomeMiddleColor = this._skyDomeMiddleColorInter.interpolate(time);
        Skybox.skyDomeBottomColor = this._skyDomeBottomColorInter.interpolate(time);
        Skybox.sunIntensity = this._sunIntensityInter.interpolate(time);
        Skybox.sunColor = this._sunColorInter.interpolate(time);
        Skybox.moonIntensity = this._moonIntensityInter.interpolate(time);
        Skybox.moonColor = this._moonColorInter.interpolate(time);

        Skybox.sunVisible = Skybox.sunIntensity == 0 ? false : true;
        Skybox.moonVisible = Skybox.moonIntensity == 0 ? false : true;
    }

}
