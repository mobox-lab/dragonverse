
/**hud组件 */
export interface HudComponent {
    jumpBtn: mw.StaleButton
    virtualJoystick: mw.VirtualJoystickPanel
    exitInteractive_btn: mw.StaleButton
    rightDownCon: mw.Canvas
}

export class HUDPanelBase {
    //事件
    public onJump: mw.Action = new mw.Action();
    public onExitInteractive: mw.Action = new mw.Action();
    public onJoyStickInput: mw.Action1<mw.Vector2> = new mw.Action1<mw.Vector2>();
    public buffFunc: Function = null;
    public mVirtualJoystick: mw.VirtualJoystickPanel = null;

    private mJump_btn: mw.StaleButton = undefined;

    private mExitInteractive_btn: mw.StaleButton = undefined;

    // private mRightDownCon: mw.Canvas=undefined;

    constructor(hudComponent: HudComponent) {
        this.mJump_btn = hudComponent.jumpBtn;
        this.setJoystick(hudComponent.virtualJoystick);
        this.mExitInteractive_btn = hudComponent.exitInteractive_btn;
        //  this.mRightDownCon=hudComponent.rightDownCon;

        this.mJump_btn.onPressed.add(() => {
            this.onJump.call();
        });
        this.mExitInteractive_btn.onClicked.add(() => {
            this.onExitInteractive.call();
        });
        this.mExitInteractive_btn.visibility = mw.SlateVisibility.Collapsed;
    }
    /**外部绑定摇杆 */
    public setJoystick(joyStick: mw.VirtualJoystickPanel) {
        this.mVirtualJoystick = joyStick;
        this.mVirtualJoystick.onInputDir.add((vec: mw.Vector2) => {
            this.onJoyStickInput.call(vec);
        });
    }

    public setJoystickEnabled(bool: boolean): void {
        this.mVirtualJoystick.enable = bool;
    }
    /**退出交互按钮 */
    public showExitInteractiveBtn(isShow: boolean) {
        if (isShow) {
            this.mExitInteractive_btn.visibility = (mw.SlateVisibility.Visible);
            this.mJump_btn.visibility = (mw.SlateVisibility.Collapsed);
        } else {
            this.mExitInteractive_btn.visibility = (mw.SlateVisibility.Collapsed);
            this.mJump_btn.visibility = (mw.SlateVisibility.Visible);
        }
    }

    /**
     * 设置遥感和jump显示
     * @param bool 
     */
    public setJoystickAndJumpVis(bool: boolean): void {
        let vis = bool ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.mVirtualJoystick.visibility = vis;
        // this.mRightDownCon.visibility = vis;
    }
}