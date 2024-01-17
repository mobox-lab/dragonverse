import { HUDPanelBase, HudComponent } from "./HUDPanel";


















//客户端
export class HUDModuleC<T extends HUDModuleS<any>> extends ModuleC<T, null> {
    //是否交互中
    public isInteractive = false;
    public panel: HUDPanelBase = null;
    public btnExitInteractiveCallback: () => void;
    public moveExitInteractiveCallback: () => void;

    onStart(): void {

    }
    //进入场景
    onEnterScene(sceneType: number): void {
        // let mainUI= ModuleService.getModule(GUIModuleC).mainUI;
        // let hudComponent:HudComponent ={jumpBtn:mainUI.mJump_btn,virtualJoystick:mainUI.rocker,
        //     exitInteractive_btn: mainUI.mExitInteractive_btn,rightDownCon:null}
        // this.panel = new HUDPanelBase(hudComponent);

        //this.initPanel();
    }

    initPanel() {
        this.panel.onJump.add(this.jump.bind(this));
        this.panel.onJoyStickInput.add(this.onJoyStick.bind(this));
        /**点击退出交互物按钮 */
        this.panel.onExitInteractive.add(() => {
            if (this.btnExitInteractiveCallback != null) {
                this.btnExitInteractiveCallback();
                this.btnExitInteractiveCallback = null;
            }
        }, this);
        /**摇杆移动事件 */
        this.panel.onJoyStickInput.add((v: mw.Vector2) => {
            if (this.moveExitInteractiveCallback != null) {
                this.moveExitInteractiveCallback();
                this.moveExitInteractiveCallback = null;
            }
        });
        this.panel.onJump.add(() => {
            if (this.moveExitInteractiveCallback != null) {
                this.moveExitInteractiveCallback();
                this.moveExitInteractiveCallback = null;
            }
        });
    }

    /**摇杆移动事件 */
    public onJoyStick(v: mw.Vector2): void { }

    /**跳跃方法 */
    public jump(): void {

    }


    /**
     * 设置摇杆区域可用性
     * @param bool
     */
    public setJoystickEnabled(bool: boolean): void {
        this.panel.setJoystickEnabled(bool);
    }

    /**
     * 监听退出交互物的操作
     * @param type 类型 1-按钮退出 2-行走和跳跃退出
     * @param Callback 退出的回调
     */
    public addExitInteractiveListener(type: number, Callback: () => void) {
        this.isInteractive = true;
        this.btnExitInteractiveCallback = Callback;
        this.moveExitInteractiveCallback = Callback;
        this.panel.showExitInteractiveBtn(true);

    }
    public removeExitInteractiveListener() {
        this.isInteractive = false;
        this.btnExitInteractiveCallback = null;
        this.moveExitInteractiveCallback = null;
        this.panel.showExitInteractiveBtn(false);
    }


    /**
     * 设置遥感和jump显示
     * @param bool
     */
    public setJoystickAndJumpVis(bool: boolean): void {
        this.panel.setJoystickAndJumpVis(bool);
    }
}
//服务端
export class HUDModuleS<T extends HUDModuleC<any>> extends ModuleS<T, null> {
    public net_Test(): void {
        // this.currentPlayer.character.collisionEnable = false;
    }
}
