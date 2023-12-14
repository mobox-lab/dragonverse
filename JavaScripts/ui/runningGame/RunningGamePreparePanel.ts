import { GameConfig } from "../../config/GameConfig";
import RGPrepareUI_Generate from "../../ui-generate/runningGame/RGPrepareUI_generate";


export class RunningGamePreparePanel extends RGPrepareUI_Generate {

    private _basicTextSize: number;

    private _readyTime: number;

    private _goTime: number;

    protected onAwake(): void {
        super.onAwake();
        this._basicTextSize = GameConfig.Global.RG_PrepareTextSize.value;
        this._readyTime = GameConfig.Global.RG_Ready_Time.value;
        this._goTime = GameConfig.Global.RG_Go_Time.value;
        this.mReady.fontSize = 0.8 * this._basicTextSize;
        this.mGo.fontSize = 1.5 * this._basicTextSize;
        this.init();
    }

    private init() {
        this.mReady.fontSize = 0.8 * this._basicTextSize;
        this.mReady.visibility = mw.SlateVisibility.Hidden;
        this.mGo.visibility = mw.SlateVisibility.Hidden;
    }

    onShow() {

    }

    public showReady() {
        this.mReady.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.mReady.invalidateLayoutAndVolatility();
        new Tween({ size: 0.8 })
            .to({ size: 1.2 })
            .duration(this._readyTime * 1000)
            .onUpdate(val => {
                this.mReady.fontSize = val.size * this._basicTextSize;
            })
            .start()
            .onComplete(() => {
                this.visible = false;
            });
    }

    public showGo() {
        this.mGo.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        setTimeout(() => {
            this.visible = false;

        }, this._goTime * 1000);

    }


    onHide() {
        this.init();
    }



}