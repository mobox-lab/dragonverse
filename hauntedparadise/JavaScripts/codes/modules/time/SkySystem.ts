import { GameConfig } from "../../../config/GameConfig";
import { MainUI } from "../../ui/MainUI";
import TimeModuleC from "./TimeModuleC";

/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2022-10-18 13:58:45
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2023-12-24 17:24:44
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\time\SkySystem.ts
 * @Description  : 
 */

const IntensityType = {
	/**天空盒 */
	skyBox: "skyBoxLightIntensity",
	/**太阳 */
	sunColor: "sunColor",
	/**天空光 */
	skyLight: "skyLightIntensity",
	/**天空球上层颜色 */
	skyBoxTopColor: "skyBoxTopColor",
	/**天空球中层颜色 */
	skyBoxMiddleColor: "skyBoxMiddleColor",
	/**天空球下层颜色 */
	skyBoxBottomColor: "skyBoxBottomColor",
} as const;

@Component
export default class SkySystem extends Script {

	/**天空光强 */
	skyBoxLightIntensity = GameConfig.Global.skyBoxLightIntensity.array1d;
	/**太阳光颜色 */
	sunColor = GameConfig.Global.sunColor.stringList;
	/** 平行光强*/
	skyLightIntensity = GameConfig.Global.lightingIntensity.array1d;

	/**第i个光强到第i+1个光强持续的时间 */
	intensityTime = GameConfig.Global.lerpTime.array1d;

	/**天空球上层颜色 */
	skyBoxTopColor = GameConfig.Global.skyBoxTopColor.stringList;
	/**天空球中层颜色 */
	skyBoxMiddleColor = GameConfig.Global.skyBoxMiddleColor.stringList;
	/**天空球下层颜色 */
	skyBoxBottomColor = GameConfig.Global.skyBoxBottomColor.stringList;


	/**模拟链表用，存储数组的下一个 */

	nextIntensityId: number[] = []

	/**当前光强的ID */
	curIntensityID: number = -1

	public colorOuter: LinearColor = new LinearColor(0, 0, 0);

	get timer() {
		return Math.round(ModuleService.getModule(TimeModuleC).timer);
	}
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected async onStart(): Promise<void> {
		if (SystemUtil.isServer()) {
			return;
		}

		this.init()
		this.useUpdate = true;
	}

	/** 
	 * 每帧被执行,与上一帧的延迟 dt 秒
	 * 此函数执行需要将this.bUseUpdate赋值为true
	 */
	protected onUpdate(dt: number): void {
		//设置天空盒的光强
		Skybox.skyDomeIntensity = this.calIntensity(IntensityType.skyBox);
		//Skybox.sunIntensity = this.calIntensity(IntensityType.sun);
		Lighting.directionalLightIntensity = this.calIntensity(IntensityType.skyLight);
		//太阳颜色变化
		LinearColor.colorHexToLinearColor(this.calColor(IntensityType.sunColor) + "FF", this.colorOuter);
		Skybox.sunColor = this.colorOuter;

		UIService.getUI(MainUI).changeClockUI(this.colorOuter);
		//天空球颜色变化
		LinearColor.colorHexToLinearColor(this.calColor(IntensityType.skyBoxTopColor) + "FF", this.colorOuter);
		Skybox.skyDomeTopColor = this.colorOuter;
		LinearColor.colorHexToLinearColor(this.calColor(IntensityType.skyBoxMiddleColor) + "FF", this.colorOuter);
		Skybox.skyDomeMiddleColor = this.colorOuter;
		LinearColor.colorHexToLinearColor(this.calColor(IntensityType.skyBoxBottomColor) + "FF", this.colorOuter);
		Skybox.skyDomeBottomColor = this.colorOuter;

	}

	/**初始化 */
	init() {
		//天空盒光强初始化
		for (let i = 0; i < this.skyBoxLightIntensity.length; i++) {
			if (i != this.skyBoxLightIntensity.length - 1) {
				this.nextIntensityId[i] = i + 1;
			} else {
				this.nextIntensityId[i] = 0
			}
		}
		Skybox.skyDomeIntensity = this.skyBoxLightIntensity[this.curIntensityID]
		for (let i = 0; i < this.intensityTime.length; i++) {
			if (this.timer < this.intensityTime[this.nextIntensityId[i]] && this.timer >= this.intensityTime[i]) {
				this.curIntensityID = i;
			}
		}
		if (this.curIntensityID == -1) {
			this.curIntensityID = 0;
		}
	}

	/**以下属性仅在下方方法中调用 */
	private _time;
	private _preId;
	private _intensity;
	private _intensityTarget;
	private _timeTarget;
	/**
	 * 计算增加或减少的光强
	 * @returns 
	 */
	calIntensity(type: string): number {
		this.updateTime(type);


		if (this._time >= this._timeTarget) {
			this.curIntensityID = this.nextIntensityId[this.curIntensityID];
			//防止replicated丢失数据
			if (this.curIntensityID == this[`${type}`].length - 1 && this.timer <= this.intensityTime[0]) {
				this.curIntensityID = 0;
			}
		}
		return this._intensity + (this._intensityTarget - this._intensity) * this._time / this._timeTarget;
	}

	calColor(type: string): string {
		this.updateTime(type);
		return ColorTransition.interpolateColor(this[`${type}`][this.curIntensityID], this[`${type}`][this.nextIntensityId[this.curIntensityID]], this._time / this._timeTarget);
	}
	/**
	 * 
	 * @param type 
	 */
	updateTime(type: string) {
		this._preId = this.curIntensityID - 1 < 0 ? this.intensityTime.length - 1 : this.curIntensityID - 1;
		this._time = this.timer - this.intensityTime[this._preId];
		this._timeTarget = (this.intensityTime[this.curIntensityID] - this.intensityTime[this._preId]);
		this._time = this._time < 0 ? this.timer : this._time;
		this._timeTarget = this._timeTarget <= 0 ? this.intensityTime[this.curIntensityID] : this._timeTarget;

		this._intensity = this[`${type}`][this.curIntensityID];
		this._intensityTarget = this[`${type}`][this.nextIntensityId[this.curIntensityID]];
	}


}



export class ColorTransition {

	public static interpolateColor(startColor: string, endColor: string, progress: number): string {
		// 插值函数，根据进度计算当前颜色
		const start = this.hexToRgb(startColor);
		const end = this.hexToRgb(endColor);

		const r = Math.round(this.interpolate(start.r, end.r, progress));
		const g = Math.round(this.interpolate(start.g, end.g, progress));
		const b = Math.round(this.interpolate(start.b, end.b, progress));

		return this.rgbToHex(r, g, b);
	}

	private static interpolate(start: number, end: number, progress: number): number {
		// 插值函数，用于在两个值之间进行插值
		return start + (end - start) * progress;
	}

	public static hexToRgb(hex: string): { r: number; g: number; b: number } {
		// 将 16 进制颜色转换为 RGB 对象
		const bigint = parseInt(hex.substring(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return { r, g, b };
	}

	public static rgbToHex(r: number, g: number, b: number): string {
		// 将 RGB 值转换为 16 进制颜色字符串
		return `${(1 << 24 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
	}


}


