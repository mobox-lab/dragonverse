import AudioController from "../../controller/audio/AudioController";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { MouseLockController } from "../../controller/MouseLockController";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { PlayerSettingModuleC } from "../../module/player-setting/PlayerSettingModule";
import Setting_Main_Generate from "../../ui-generate/setting/Setting_Main_generate"

export default class SettingsPanel extends Setting_Main_Generate {
    private _lastIsMute: boolean = false;
    private _lastSpeedInputScale: number = 0;
    private _currentIsMute: boolean = false;
    private _currentSpeedInputScale: number = 0;

    protected onStart(): void {



        this.mScroll_speedInputScale.onSliderValueChanged.add((currentValue: number) => {
            console.log("currentValue", currentValue);

            ModuleService.getModule(PlayerSettingModuleC).set("camera-lookUp-rate-scale", currentValue);

            this._currentSpeedInputScale = currentValue;
        });
        this.mBtn_CloseSound.onClicked.add(() => {
            // 判断是否静音
            let res = !(AudioController.getInstance().isPlayBgm || AudioController.getInstance().isPlayEffect);
            this.mBtn_CloseSound.text = res
                ? "on"
                : "off";
            res = !res;

            ModuleService.getModule(PlayerSettingModuleC).set("mute-bgm-volume", res);
            ModuleService.getModule(PlayerSettingModuleC).set("mute-sound-effect-volume", res);

            this._currentIsMute = res;
        });
        this.mBtn_Back.onClicked.add(() => {
            if (this._lastIsMute !== this._currentIsMute || this._lastSpeedInputScale !== this._currentSpeedInputScale) {
                ModuleService.getModule(PlayerSettingModuleC).apply(true);
            }
            UIService.hide(SettingsPanel);
        });
    }

    protected onShow(...args: unknown[]): void {
        //初始化按钮
        this._currentIsMute = !(AudioController.getInstance().isPlayBgm || AudioController.getInstance().isPlayEffect);
        this.mBtn_CloseSound.text = this._currentIsMute
            ? "off"
            : "on";

        this._currentSpeedInputScale = ModuleService.getModule(PlayerSettingModuleC).get("camera-lookUp-rate-scale");
        this.mScroll_speedInputScale.currentValue = this._currentSpeedInputScale;

        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.mBtn_CloseSound.onClicked.broadcast();
        });

        MouseLockController.getInstance().needMouseUnlock();
    }
    protected onHide(): void {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
        MouseLockController.getInstance().cancelMouseUnlock();

        this._lastIsMute = this._currentIsMute;
        this._lastSpeedInputScale = this._currentSpeedInputScale;
    }
}