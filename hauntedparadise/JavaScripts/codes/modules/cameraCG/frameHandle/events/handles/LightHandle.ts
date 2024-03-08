import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { ColorInterpolator } from "../../../simplepathing/interpolator/ColorInterpolator";
import { D2, Interpolator2 } from "../../../simplepathing/interpolator/Interpolator";
import { InterpolatorFactory, InterpolatorType } from "../../../simplepathing/interpolator/InterpolatorFactory";
import { CSCommUitls } from "../../../utils/CSCommUitls";
import { EventsHandle } from "../EventsHandle";
import { EventTriggerType, registerCSEvent } from "../EventsHelper";
import { UICSLightInfo } from "../ui/UICSLightInfo";


export type LightParams = {
    yaw: number,
    pitch: number,
    intensity: number,
    color: string,
    temperature: number,
    skyIntensity: number,
    skyColor: string,
    ev100: number
}

@registerCSEvent(LightHandle.EVENT, "光照", UICSLightInfo, [EventTriggerType.Interpolation])
export class LightHandle extends EventsHandle {

    static readonly EVENT = "CS.Light";

    private _infos: EventFrameInfo[];

    /** 对象插值器组 */
    private _yawInter: Interpolator2<D2>;
    private _pitchInter: Interpolator2<D2>;
    private _intensityInter: Interpolator2<D2>;
    private _colorInter: ColorInterpolator;
    private _temperatureInter: Interpolator2<D2>;
    private _skyIntensityInter: Interpolator2<D2>;
    private _skyColorInter: ColorInterpolator;
    private _ev100Inter: Interpolator2<D2>;

    getRegParams(): LightParams {
        return {
            yaw: -60,
            pitch: -60,
            intensity: 4,
            color: "#FFFFFF00",
            temperature: 6500,
            skyIntensity: 1,
            skyColor: "#FFFFFF00",
            ev100: 0
        }
    }

    getDefParams(): LightParams {
        return {
            yaw: Lighting.yawAngle,
            pitch: Lighting.pitchAngle,
            intensity: Lighting.directionalLightIntensity,
            color: CSCommUitls.linearColorToHex(Lighting.directionalLightColor),
            temperature: Lighting.temperature,
            skyIntensity: Lighting.skyLightIntensity,
            skyColor: CSCommUitls.linearColorToHex(Lighting.skyLightColor),
            ev100: Lighting.ev100
        };
    }

    onReSet(): void {
        if (!this._infos || this._infos.length < 2) return;
        // 还原初始位置
        const params = this._infos[0].getParams<LightParams>();
        Lighting.yawAngle = params.yaw;
        Lighting.pitchAngle = params.pitch;
        Lighting.directionalLightIntensity = params.intensity;
        Lighting.directionalLightColor = LinearColor.colorHexToLinearColor(params.color);
        Lighting.temperature = params.temperature;
        Lighting.skyLightIntensity = params.skyIntensity;
        Lighting.skyLightColor = LinearColor.colorHexToLinearColor(params.skyColor);
        Lighting.ev100 = params.ev100;
    }

    onDataChange(infos: EventFrameInfo[]): void {
        this._infos = infos;
        const paramsInstances: LightParams[] = [];
        const times = infos.map((info) => info.time);

        for (const info of infos) {
            const params = info.getParams<LightParams>();
            paramsInstances.push(params);
        }

        this._yawInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._yawInter.reCompute(paramsInstances.map((param, index) => { return { x: param.yaw, y: times[index] } }));
        this._pitchInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._pitchInter.reCompute(paramsInstances.map((param, index) => { return { x: param.pitch, y: times[index] } }));
        this._intensityInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._intensityInter.reCompute(paramsInstances.map((param, index) => { return { x: param.intensity, y: times[index] } }));
        this._colorInter = InterpolatorFactory.createColorInterpolator();
        this._colorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.color)), times);
        this._temperatureInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._temperatureInter.reCompute(paramsInstances.map((param, index) => { return { x: param.temperature, y: times[index] } }));
        this._skyIntensityInter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._skyIntensityInter.reCompute(paramsInstances.map((param, index) => { return { x: param.skyIntensity, y: times[index] } }));
        this._skyColorInter = InterpolatorFactory.createColorInterpolator();
        this._skyColorInter.reCompute(paramsInstances.map((param) => LinearColor.colorHexToLinearColor(param.skyColor)), times);
        this._ev100Inter = InterpolatorFactory.createInterpolator2<D2>(InterpolatorType.Linear);
        this._ev100Inter.reCompute(paramsInstances.map((param, index) => { return { x: param.ev100, y: times[index] } }));
    }

    onTime(time: number): void {
        if (!this._infos || this._infos.length < 2) return;
        Lighting.yawAngle = this._yawInter.interpolate(time);
        Lighting.pitchAngle = this._pitchInter.interpolate(time);
        Lighting.directionalLightIntensity = this._intensityInter.interpolate(time);
        Lighting.directionalLightColor = this._colorInter.interpolate(time);
        Lighting.temperature = this._temperatureInter.interpolate(time);
        Lighting.skyLightIntensity = this._skyIntensityInter.interpolate(time);
        Lighting.skyLightColor = this._skyColorInter.interpolate(time);
        Lighting.ev100 = this._ev100Inter.interpolate(time);
    }

}
