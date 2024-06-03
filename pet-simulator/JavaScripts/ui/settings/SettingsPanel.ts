import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { PlayerSettingModuleC } from "../../modules/player-setting/PlayerSettingModule";
import Setting_Main_Generate from "../../ui-generate/Setting_Main_generate";


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
            let res = !(SoundService.BGMVolumeScale > 0 || SoundService.volumeScale > 0);
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
        this._currentIsMute = !(SoundService.BGMVolumeScale > 0 || SoundService.volumeScale > 0);
        this.mBtn_CloseSound.text = this._currentIsMute
            ? "off"
            : "on";

        this._currentSpeedInputScale = ModuleService.getModule(PlayerSettingModuleC).get("camera-lookUp-rate-scale");
        this.mScroll_speedInputScale.currentValue = this._currentSpeedInputScale;


        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.mBtn_CloseSound.onClicked.broadcast();
        });
    }
    protected onHide(): void {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);

        this._lastIsMute = this._currentIsMute;
        this._lastSpeedInputScale = this._currentSpeedInputScale;
    }
}