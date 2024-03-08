/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-04 10:09:33
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 18:46:18
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\treasure\TreasureBox.ts
 * @Description  : 
 */

import { WaitLoop } from "../../utils/AsyncTool";
import TreasureModuleC from "./TreasureModuleC";

@Component
export default class TreasureBox extends mw.Script {

    @mw.Property({ displayName: "宝箱ID" })
    public boxID: number = 1
    /**宝箱 */
    private _box: mw.GameObject;
    /**宝箱盖子 */
    private _cover: mw.GameObject;

    private _worldUI: mw.GameObject

    private _callback: Function

    private _oriRotation: Rotation;
    protected onStart(): void {
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            this._oriRotation = this.gameObject.worldTransform.rotation.clone()
            this._box = this.gameObject.getChildByName("宝箱");
            this._cover = this._box.getChildByName("宝箱盖子");
            this._worldUI = this._box.getChildByName("世界UI");
            WaitLoop.loop(() => { return ModuleService.getModule(TreasureModuleC) }).then(treasureMC => {
                treasureMC.registerBox(this.boxID, this)
            })
        })
    }

    public active(call?: Function) {
        if (!this._cover) return
        this._callback = call;
        this.shake()
    }

    private shake() {
        this._worldUI.setVisibility(mw.PropertyStatus.Off, true)
        new Tween({ ro: new Rotation(this._oriRotation.x, this._oriRotation.y - 15, this._oriRotation.z) })
            .to({ ro: new Rotation(this._oriRotation.x, this._oriRotation.y + 15, this._oriRotation.z) }, 100)
            .onUpdate((val) => {
                this._box.worldTransform.rotation = val.ro;
            })
            .yoyo(true)
            .repeat(10)
            .onComplete(() => {
                this._box.worldTransform.rotation = this._oriRotation;
                this.open()
            })
            .start()
    }

    private open() {
        new Tween({ ro: Rotation.zero })
            .to({ ro: new Rotation(- 90, 0, 0) }, 100)
            .onUpdate((val) => {
                this._cover.localTransform.rotation = val.ro;
            })
            .easing(TweenUtil.Easing.Bounce.Out)
            .onComplete(async () => {
                await TimeUtil.delaySecond(0.5)
                this._callback && this._callback()
                this._cover.localTransform.rotation = Rotation.zero;
                this._worldUI.setVisibility(mw.PropertyStatus.On, true)
            })
            .start()
    }

    protected onUpdate(dt: number): void {

    }

}