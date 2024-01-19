import { GlobalData } from "../../const/GlobalData";
import GMHUD_Generate from "../../ui-generate/common/GM/GMHUD_generate";
import Hud_Generate from "../../ui-generate/hud/Hud_generate";
import { cubicBezier } from "../../utils/MoveUtil";
import { utils } from "../../utils/uitls";
import { P_SummerCoin } from "../DollMachine/P_DollMachine";
import { EnergyModuleC } from "../Energy/EnergyModule";
import GToolkit from "../../utils/GToolkit";

export class P_HudUI extends Hud_Generate {

    public onJumpAction: Action = new Action();
    public ontransmitAC: Action = new Action();
    public onFastTranAC: Action = new Action();
    /**切换到默认弹簧臂action */
    public onSwitchDefaultArm: Action = new Action();
    /**切换到远弹簧臂action */
    public onSwitchFarArm: Action = new Action();
    /**切换到近弹簧臂action */
    public onSwitchNearArm: Action = new Action();
    /**当前金币数 */
    private mGold: number = 0;
    /**当前钻石数 */
    private mDiamond: number = 0;
    /**目标金币数 */
    private mTargetGold: number = 0;
    /**目标钻石数 */
    private mTargetDiamond: number = 0;
    /**放大缩小tween */
    private mTween: mw.Tween<mw.Vector2> = null;
    /**点击action */
    public mClickAction: Action = new Action();
    /**长按cation */
    public mLongPressAction: Action = new Action();
    /**松开action */
    public mReleaseAction: Action = new Action();
    /**装卸滑板action */
    public onSkateboardAction: Action = new Action();

    private _energyModuleC: EnergyModuleC;

    private energyModuleC(): EnergyModuleC | null {
        if (!this._energyModuleC) this._energyModuleC = ModuleService.getModule(EnergyModuleC);
        return this._energyModuleC;
    }

    protected onStart() {
        this.layer = mw.UILayerScene;
        this.mJump_Btn.onClicked.add(() => {
            this.onJumpAction.call();
        });
        this.mBtn_Transmit.onClicked.add(() => {
            this.ontransmitAC.call();
        });
        this.mBtn_FastTran.onClicked.add(() => {
            this.onFastTranAC.call();
        });
        this.mBtn_nomal.onClicked.add(() => {
            this.onSwitchDefaultArm.call();
        });
        this.mBtn_long.onClicked.add(() => {
            this.onSwitchNearArm.call();
        });
        this.mBtn_near.onClicked.add(() => {
            this.onSwitchFarArm.call();
        });
        this.mBtn_skid.onClicked.add(() => {
            this.onSkateboardAction.call();
        });
        this.mBtn_petspeed.visibility = mw.SlateVisibility.Visible;
        let isEnable: boolean = true;
        this.mBtn_petspeed.touchMethod = (mw.ButtonTouchMethod.DownAndUp);
        let timer: number = null;
        let isTouch: boolean = false;
        this.mBtn_petspeed.onPressed.add(() => {
            if (!isEnable) return;
            isTouch = false;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                isTouch = true;
                this.mLongPressAction.call();
            }, GlobalData.SpeedUp.longPressTime);
        });
        this.mBtn_petspeed.onReleased.add(() => {
            if (!isEnable) return;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            if (!isTouch) {
                this.mClickAction.call();
                isEnable = false;
                TimeUtil.delaySecond(GlobalData.SpeedUp.clickInterval).then(() => {
                    isEnable = true;
                });
            } else {
                this.mReleaseAction.call();
            }
        });
        this.mCanvas_fasttran.visibility = mw.SlateVisibility.Collapsed;
        this.canUpdate = true;
        let minSize = GlobalData.hudUI.canvasSize;
        let maxSize = GlobalData.hudUI.canvasMaxSize;
        const bezier = GlobalData.hudUI.canvasBezier;
        this.mTween = new mw.Tween<mw.Vector2>(minSize).to(maxSize, GlobalData.hudUI.canvasMaxTime).onUpdate((value) => {
            this.mCanvas_coin.renderScale = value;
        }).easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3])).yoyo(true).repeat(1);
        this.mBtn_Transmit.touchMethod = (mw.ButtonTouchMethod.DownAndUp);
        this.mText_stamina2.text = GlobalData.Energy.ENERGY_MAX.toString();
        this.setGMBtn();
        this.startFastTranBtnTween();
    }

    /**设置GM按钮 */
    private setGMBtn() {
        if (GlobalData.Global.isShowGM) {
            let open = true;
            this.mGM.onClicked.add(() => {
                open = !open;
                if (!open)
                    mw.UIService.getUI(GMHUD_Generate).hide();
                else {
                    mw.UIService.getUI(GMHUD_Generate).show();
                }
            });
        } else {
            this.mGM.visibility = mw.SlateVisibility.Collapsed;
        }
    }

    /**设置快捷按钮显示 */
    public setShortcutBtnShow(isShow: boolean): void {
        if (this.mCanvas_fasttran.visible && !isShow) {
            this.mCanvas_fasttran.visibility = mw.SlateVisibility.Collapsed;
        } else if (!this.mCanvas_fasttran.visible && isShow) {
            this.mCanvas_fasttran.visibility = mw.SlateVisibility.Visible;
        }
    }

    /**从左到右的Tween */
    private leftToRightTween: mw.Tween<any> = null;
    /**从右到左的Tween */
    private rightToLeftTween: mw.Tween<any> = null;

    /**开始FastTranBtn */
    public startFastTranBtnTween() {
        let bezierData = GlobalData.TweenFastTranBtn.tweenBezier;
        let startAngle = GlobalData.TweenFastTranBtn.startAngle;
        let endAngle = GlobalData.TweenFastTranBtn.endAngle;
        let time = GlobalData.TweenFastTranBtn.tweenTime;
        this.leftToRightTween = new mw.Tween({angle: startAngle}).to({angle: endAngle}, time * 1000)
            .onUpdate((v) => {
                this.mBtn_FastTran.renderTransformAngle = v.angle;
            })
            .onComplete(() => {
                if (this.rightToLeftTween) {
                    this.rightToLeftTween.start();
                }
            })
            .easing(cubicBezier(bezierData[0], bezierData[1], bezierData[2], bezierData[3]));
        this.rightToLeftTween = new mw.Tween({angle: endAngle}).to({angle: startAngle}, time * 1000)
            .onUpdate((v) => {
                this.mBtn_FastTran.renderTransformAngle = v.angle;
            })
            .onComplete(() => {
                if (this.leftToRightTween) {
                    this.leftToRightTween.start();
                }
            })
            .easing(cubicBezier(bezierData[0], bezierData[1], bezierData[2], bezierData[3]));
        this.leftToRightTween.start();
    }

    /**停止FastTranBtn */
    public stopFastTranBtnTween(): void {
        if (this.leftToRightTween) {
            this.leftToRightTween.stop();
            this.leftToRightTween = null;
        }
        if (this.rightToLeftTween) {
            this.rightToLeftTween.stop();
            this.rightToLeftTween = null;
        }
        this.mBtn_FastTran.renderTransformAngle = 0;
    }

    /**金币显影 */
    public setVis(isShow: boolean): void {
        isShow ? this.show() : this.hide();
        this.mVirtualJoystickPanel.resetJoyStick();
    }

    /**金币数量改变 */
    public changeGold(value: number): void {
        if (this.mGold == value) return;
        if (value > this.mGold) {
            this.mTargetGold = value;
            this.mGoldAddValue = (value - this.mGold) / GlobalData.hudUI.addAniTime;
            return;
        }
        this.mText_coin.text = utils.formatNumber(value);
        this.mGold = value;
        this.mTargetGold = value;
    }

    /**钻石数量改变 */
    public changeDiamond(value: number): void {
        if (this.mDiamond == value) return;
        if (value > this.mDiamond) {
            this.mTargetDiamond = value;
            this.mDiamondAddValue = (value - this.mDiamond) / GlobalData.hudUI.addAniTime;
            return;
        }
        this.mText_diamond.text = utils.formatNumber(value);
        this.mDiamond = value;
        this.mTargetDiamond = value;
    }

    /**金币每秒增加的值 */
    private mGoldAddValue: number = 0;
    /**钻石每秒增加的值 */
    private mDiamondAddValue: number = 0;

    onUpdate(dt: number): void {
        let isChange = false;
        if (this.mTargetGold > this.mGold) {
            this.mGold += this.mGoldAddValue * dt;
            this.mGold = Math.ceil(this.mGold);
            if (this.mGold > this.mTargetGold) this.mGold = this.mTargetGold;
            this.mText_coin.text = utils.formatNumber(this.mGold);
            isChange = true;
        }
        if (this.mTargetDiamond > this.mDiamond) {
            this.mDiamond += this.mDiamondAddValue * dt;
            this.mDiamond = Math.ceil(this.mDiamond);
            if (this.mDiamond > this.mTargetDiamond) this.mDiamond = this.mTargetDiamond;
            this.mText_diamond.text = utils.formatNumber(this.mDiamond);
            isChange = true;
        }

        if (isChange) {
            if (!this.mTween.isPlaying()) this.mTween.start();
        }

        GToolkit.trySetText(this.mText_stamina, this.energyModuleC() ? `${this.energyModuleC().currEnergy()}` : "0");
    }

    protected onShow(...params: any[]): void {
        this.mVirtualJoystickPanel.resetJoyStick();
        mw.UIService.getUI(P_SummerCoin).show();
    }

    protected onHide() {
        this.mVirtualJoystickPanel.resetJoyStick();
        mw.UIService.getUI(P_SummerCoin).hide();
    }

}