/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-15 11:18:51
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-29 15:47:05
 * @FilePath     : \nevergiveup\JavaScripts\UI\CutsceneUI.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-11-30 14:04:07
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-12 11:21:14
 * @FilePath: \nevergiveup\JavaScripts\UI\CutsceneUI.ts
 * @Description: 修改描述
 */

import { GuideManager } from "../Guide/GuideManager";
import UI_TaskMain from "../Modules/taskModule/ui/UI_TaskMain";
import { UITechTree } from "../TechTree/ui/UITechTree";
import Utils from "../Utils";
import { MGSTool } from "../tool/MGSTool";
import CutsceneUI_Generate from "../ui-generate/Sundry/CutsceneUI_generate";
import SettingUI from "./SettingUI";
import TowerShopUI from "./Tower/TowerShopUI";

/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.08.30-13.42.55
 */

/**
 * 开始传送时，黑幕遮挡住的UI
 */
export default class CutsceneUI extends CutsceneUI_Generate {

	/** 展示动画的tween */
	private _showTween;
	/** 回调，外部可指定 */
	private _callback: () => void;
	/** 打开的动画tween */
	private _openTween: mw.Tween<{ percent: number; }>;

	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerSystem;
		this.showCanvas.renderScale = Utils.TEMP_VECTOR2.set(1, 1);
		this.mMaskCanvas.renderOpacity = 0;
		this._openTween = new mw.Tween({ percent: 0.03 }).to({ percent: 1 }, 0.8 * 1000)
			.delay(0.5 * 1000).onUpdate((obj) => {
				this.showCanvas.renderScale = Utils.TEMP_VECTOR2.set(obj.percent, obj.percent);
			}).easing(TweenUtil.Easing.Quintic.In).onComplete(() => {
				mw.UIService.hideUI(this);
			}).onStart(() => {
				this.mMaskCanvas.renderOpacity = 0;
			})
		this._showTween = new mw.Tween({ percent: 1 }).to({ percent: 0.01 }, 0.9 * 1000)
			.onUpdate((obj) => {
				this.showCanvas.renderScale = Utils.TEMP_VECTOR2.set(obj.percent, obj.percent);
			}).easing(TweenUtil.Easing.Quintic.Out).onComplete(() => {
				this._callback && this._callback();
			}).onStart(() => {
				this.clearAll();
				MGSTool.page("loading");
				setTimeout(() => {
					this.mMaskCanvas.renderOpacity = 1;
				}, 0.6 * 1000);
			})
	}

	private clearAll() {
		Event.dispatchToLocal("ResetJoyStick");
		GuideManager.resetTaskGuide();
		UIService.hide(UI_TaskMain);
		UIService.hide(SettingUI);
		UIService.hide(TowerShopUI);
		UIService.hide(UITechTree);
	}

	/**
	 * 设置显示时触发
	 * @param callback 回调
	 */
	protected onShow(callback?: () => void) {
		this._callback = callback;
		this._showTween.start();
	}

	public hideCanvas() {
		this._openTween.start();
	}

}
