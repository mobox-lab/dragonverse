import Gtk from "gtoolkit";
import { GuideManager } from "../Guide/GuideManager";
import UI_TaskMain from "../Modules/taskModule/ui/UI_TaskMain";
import { TalentTreeContainer } from "../TalentTree/ui/TalentTreeContainer";
import Utils from "../Utils";
import { GlobalData } from "../const/GlobalData";
import { MGSTool } from "../tool/MGSTool";
import logo_anim_Generate from "../ui-generate/logo/logo_anim_generate";
import SettingUI from "./SettingUI";
import TowerShopUI from "./Tower/TowerShopUI";

/**
 * 开局加载的 Logo 动画
 */
export default class LogoAnimUI extends logo_anim_Generate {
    /** 回调，外部可指定 */
    private _callback: () => void;
    /** 打开的动画tween */
    private _closeTween: mw.Tween<{ percent: number; }>;

    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerSystem;
        this._closeTween = new mw.Tween({percent: 1}).to({percent: 0.01}, GlobalData.Anim.logoScaleAnimSeconds * 1000).onUpdate((obj) => {
            this.can_logo.renderScale = Utils.TEMP_VECTOR2.set(obj.percent, obj.percent);
        }).easing(TweenUtil.Easing.Quintic.In).onComplete(() => {
            new mw.Tween({percent: 1}).to({percent: 0.01}, GlobalData.Anim.logoCrossAnimSeconds * 1000).onUpdate((obj) => {
                this.maskImg.renderOpacity = obj.percent;
            }).onComplete(() => {
                mw.UIService.hideUI(this);
            }).start();
        });
        this.resetAnim();
    }

    resetAnim() {
        this.can_logo.renderScale = Utils.TEMP_VECTOR2.set(1, 1);    
        Gtk.trySetVisibility(this.flip_anim1, mw.SlateVisibility.Collapsed);
        this.flip_anim1.onFinish.add(() => {
            this.resetAnim();
            this.hideAnim();
        });
    }
    /**
     * 设置显示时触发
     * @param callback 回调
     */
    protected onShow(opts:{callback?: () => void, framesPerSecond?: number}) {
        const { callback, framesPerSecond = 3 } = opts ?? {};
        this._callback = callback;
        this.maskImg.renderOpacity = 0;
        this.resetAnim();
        this.flip_anim1.framesPerSecond = framesPerSecond ?? 3;
        new mw.Tween({percent: 0.01}).to({percent: 1}, GlobalData.Anim.logoCrossAnimSeconds * 1000).onUpdate((obj) => {
            this.maskImg.renderOpacity = obj.percent;
        }).easing(TweenUtil.Easing.Quintic.Out).onComplete(() => {
            Gtk.trySetVisibility(this.flip_anim1, mw.SlateVisibility.Visible);
            this.flip_anim1.play();
        }).start();
    }

    public hideAnim() {
        this._closeTween.start();
    }
}
