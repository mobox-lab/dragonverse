
import { HotWeaponConfig, IHotWeaponElement } from "../../../../config/HotWeapon";
import HotWeaponPanel_Generate from "../../../../ui-generate/ShareUI/hud/HotWeaponPanel_generate";
import { MainUI } from "../../../ui/MainUI";
import { TimerOnly, WaitLoop } from "../../../utils/AsyncTool";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { ObjInterModuleC } from "../../inter/ObjInterModuleC";
import { PlayerInterModuleC } from "../../inter/PlayerInterModule";
import PickHud from "../../inter/ui/PickHud";
import HotWeaponModuleC from "../HotWeaponC";

export default class HotWeaponPanel extends HotWeaponPanel_Generate {

    /** 准星聚焦 */
    public crossFocus() {
        this.focusImg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.unfocusImg.visibility = mw.SlateVisibility.Collapsed;
    }

    /** 准星失焦 */
    public crossUnfocus() {
        this.focusImg.visibility = mw.SlateVisibility.Collapsed;
        this.unfocusImg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
    }

    private _lastTriggerTime: number = 0;

    private atkBtnList: VirtualJoystickPanel[] = [];

    private maskBtnList: MaskButton[] = [];

    protected onStart() {
        Event.addLocalListener("SetHandVisible", (visible) => { this.canvas_catch.visibility = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed; });
        this.canvas_catch.visibility = SlateVisibility.Collapsed;
        this.btn_catch.clickMethod = mw.ButtonClickMethod.MouseDown;
        this.btn_catch.onClicked.add(() => {
            let curTIme = TimeUtil.elapsedTime();
            if (curTIme - this._lastTriggerTime < 0.5) {
                console.error("操作过于频繁")
                return;
            }
            this._lastTriggerTime = curTIme;
            let res = ModuleService.getModule(PlayerInterModuleC).reqStopInter(true);
            if (res) {
                return;
            }
            ModuleService.getModule(ObjInterModuleC).triggerSelectItem();
        })

        this.atkBtnList.push(this.btn_attack);
        this.atkBtnList.push(this.btn_shoot);

        this.maskBtnList.push(this.mMask_attack);
        this.maskBtnList.push(this.mMask_shoot);

        this.atkBtnList.forEach((btn) => {
            btn.onInputDir.add(this.fireInput.bind(this));
        });

        this.maskBtnList.forEach(btn => {
            btn.visibility = mw.SlateVisibility.Collapsed;
        });

        this.btn_reload.onClicked.add(this.reloadBullet.bind(this));
        this.mMask_reload.pressedDelegate.add(() => { })
        this.mMask_reload.visibility = mw.SlateVisibility.Collapsed;
    }

    protected onShow(cfg: IHotWeaponElement) {
        this.crossUnfocus();
        this.text_bulletscapacity.text = "/" + cfg.bulletNum;
        this.setBulletLeft(0);
        this.fireInter = cfg.fireInter;
        this.fireTimer.stop();

        // 摇杆onInputDir感觉有点bug，面板显示时会自动调用一次，先锁上
        this.fireLock = true;
        this.fireTimer.setTimeout(() => { this.fireLock = false; }, this.fireInter);

        if (UIService.getUI(MainUI).canvas_catch.visible) { this.canvas_catch.visibility = mw.SlateVisibility.SelfHitTestInvisible; }

        // 和交互按钮互斥
        UIService.hide(PickHud);
        UIService.getUI(MainUI).setHandVisible(false, 9, false);
        UIService.getUI(MainUI).banHandUIVisible = true;
        // 可以捡，但是不会选中
        Event.dispatchToLocal("EnableNeedSelectWhenPick", false);
    }

    /** 开火间隔 */
    private fireInter: number = 1e2;

    /** 锁 */
    private fireLock: boolean = false;

    private fireTimer: TimerOnly = new TimerOnly();

    /** 开火 */
    private fireInput() {
        if (this.fireLock) { return; }
        GhostTraceHelper.itemTrace(this.selfModule["myWeapon"]["weaponCfg"].id, 10);
        this.fireLock = true;
        this.selfModule.reqFire();
        this.fireTimer.setTimeout(() => {
            this.fireLock = false;
        }, this.fireInter);
    }

    private get selfModule() {
        return ModuleService.getModule(HotWeaponModuleC);
    }

    private reloadBullet() {
        this.selfModule.reqReloadBullet();
    }

    /** 设置子弹剩余量 */
    public setBulletLeft(bulletNum: number) {
        this.text_bulletsleft.text = bulletNum + "";
    }

    /** 冷却时间，这个因没把枪的换弹时间不同而动态变化 */
    private coolTime: number = 0;

    /** 剩多少时间冷却完毕 */
    private leftTime: number = 0;

    protected onHide() {

        this.atkBtnList.forEach(btn => {
            btn.resetJoyStick();
        });

        // 和交互按钮互斥
        UIService.getUI(MainUI).banHandUIVisible = false;
        // 选中打开
        Event.dispatchToLocal("EnableNeedSelectWhenPick", true);
        // 如果有物品，打开拾取交互按钮
        this.canvas_catch.visible && UIService.getUI(MainUI).setHandVisible(true);
    }

    /**
     * 进入冷却
     * @param coolTime 冷却时间
     */
    public enterCool(coolTime: number) {
        this.canUpdate = true;
        this.coolTime = coolTime;
        this.leftTime = coolTime;

        this.atkBtnList.forEach(btn => {
            btn.enable = false;
        });

        this.maskBtnList.forEach(btn => {
            btn.fanShapedValue = 0;
            btn.visibility = SlateVisibility.Visible;
        });

        this.mMask_reload.fanShapedValue = 0;
        this.mMask_reload.visibility = SlateVisibility.Visible;
    }

    private endCool() {
        this.canUpdate = false;

        this.atkBtnList.forEach(btn => {
            btn.enable = true;
        });

        this.maskBtnList.forEach(btn => {
            btn.fanShapedValue = 0;
            btn.visibility = SlateVisibility.Collapsed;
        });

        this.mMask_reload.fanShapedValue = 0;
        this.mMask_reload.visibility = SlateVisibility.Collapsed;
    }

    /**
    * 每一帧调用
    * 通过canUpdate可以开启关闭调用
    * dt 两帧调用的时间差，毫秒
    */
    protected onUpdate(dt: number) {
        if (this.leftTime <= 0) { this.endCool(); return; }
        this.leftTime -= dt;
        this.maskBtnList.forEach(btn => {
            btn.fanShapedValue = 1 - (this.leftTime / this.coolTime);
        });
        this.mMask_reload.fanShapedValue = 1 - (this.leftTime / this.coolTime);
    }
}