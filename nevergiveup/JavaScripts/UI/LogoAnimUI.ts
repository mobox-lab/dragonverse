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
        this._closeTween = new mw.Tween({percent: 1}).to({percent: 0.01}, 0.8 * 1000).onUpdate((obj) => {
            this.can_logo.renderScale = Utils.TEMP_VECTOR2.set(obj.percent, obj.percent);
        }).easing(TweenUtil.Easing.Quintic.In).onComplete(() => {
            mw.UIService.hideUI(this);
        });
        this.resetAnim();
    }

    resetAnim() {
        this.can_logo.renderScale = Utils.TEMP_VECTOR2.set(1, 1);
        const len = GlobalData.Anim.logoAnimFilNum;
        for (let i = 1; i <= len; i++) {
            const flip = this?.[`flip_anim${i}`] as mw.FlipBook | null;
            if (!flip) continue;
            Gtk.trySetVisibility(flip, mw.SlateVisibility.Collapsed);
            if (i + 1 > len) { // 最后一帧
                flip.onFinish.add(() => {
                    // console.log(`#debug logo anim ${i} final finish`);
                    this.resetAnim();
                    this.hideAnim();
                });
                continue;
            }
            const nextFlip = this?.[`flip_anim${i + 1}`] as mw.FlipBook | null;
            if (!nextFlip) continue;
            flip.onFinish?.clear();
            flip.onFinish.add(() => {
                // console.log(`#debug logo anim ${i} finish`);
                nextFlip.visibility = mw.SlateVisibility.Visible;
                nextFlip.play();
                setTimeout(() => {
                    flip.visibility = mw.SlateVisibility.Collapsed;
                }, 70)
            });
        }
    }
    /**
     * 设置显示时触发
     * @param callback 回调
     */
    protected onShow(callback?: () => void) {
        this._callback = callback;
        Gtk.trySetVisibility(this.flip_anim1, mw.SlateVisibility.Visible);
        this.flip_anim1.play();
    }

    public hideAnim() {
        this._closeTween.start();
    }
}
