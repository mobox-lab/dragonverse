/*
 * @Author: shifu.huang
 * @Date: 2023-12-20 19:49:21
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-11 13:33:45
 * @FilePath: \nevergiveup\JavaScripts\VoiceControl.ts
 * @Description: 修改描述
 */
import { SoundUtil, VoiceEvent } from "./tool/SoundUtil";

@Component
export default class VoiceControl extends Script {
	private _volume: number = 1;
	private _event: EventListener;
	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if (this.gameObject instanceof Sound) {
			this._volume = this.gameObject.volume;
			this.gameObject.volume = this._volume * SoundUtil.bgmVoiceFactor;
			this._event = Event.addLocalListener(VoiceEvent.Bgm, this.voiceFun);
			this.gameObject.onDestroyDelegate.add(() => {
				this.gameObject = null;
				Event.removeListener(this._event);
			});
		}
	}

	private voiceFun = (v: number) => {
		if (this.gameObject && this.gameObject.worldTransform != null && this.gameObject instanceof Sound) {
			this.gameObject.volume = v * this._volume ? this._volume : 0;
		}
	}

	/**
	 * 周期函数 每帧执行
	 * 此函数执行需要将this.useUpdate赋值为true
	 * @param dt 当前帧与上一帧的延迟 / 秒
	 */
	protected onUpdate(dt: number): void {

	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {
		Event.removeListener(this._event);
	}
}