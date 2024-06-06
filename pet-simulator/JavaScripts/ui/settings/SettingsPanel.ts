import GameServiceConfig from "../../const/GameServiceConfig";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { PlayerSettingModuleC } from "../../modules/player-setting/PlayerSettingModule";
import Setting_Main_Generate from "../../ui-generate/Setting_Main_generate";


export default class SettingsPanel extends Setting_Main_Generate {
    private _lastIsMute: boolean = false;
    private _lastSpeedInputScale: number = 0;
    private _currentIsMute: boolean = false;
    private _currentSpeedInputScale: number = 0;

    protected onStart(): void {
        this.imgCircleBack.renderOpacity = 0.7;
        this.mScroll_speedInputScale.sliderButtonReleaseDelegate.add((currentValue: number) => {
            console.log("currentValue", currentValue);

            ModuleService.getModule(PlayerSettingModuleC).set("camera-lookUp-rate-scale", currentValue);

            this._currentSpeedInputScale = ModuleService.getModule(PlayerSettingModuleC).get("camera-lookUp-rate-scale");
        });
        this.mBtn_CloseSound.onClicked.add(() => {
            // 判断是否静音
            let res = !(SoundService.BGMVolumeScale > 0 || SoundService.volumeScale > 0);
            res = !res;
            if (res) {
                // 显示开启声音的样式
                this.text_SoundOff.text = "ON";
                this.imgYellowOn.visibility = SlateVisibility.SelfHitTestInvisible;
                this.imgCircle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
                this.imgCircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
                actions.tweens.stopAllByTag("switchAni");
                actions.tween(this.imgCircleBack)
                    .set({ position: new Vector2(4, 4) })
                    .to(100, { position: new Vector2(22, 4) }, { easing: 'cubicOut' })
                    .union()
                    .setTag("switchAni")
                    .start();

            } else {
                // 显示关闭声音的样式
                this.text_SoundOff.text = "OFF";
                this.imgYellowOn.visibility = SlateVisibility.Collapsed;
                this.imgCircle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
                this.imgCircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
                actions.tweens.stopAllByTag("switchAni");
                actions.tween(this.imgCircleBack)
                    .set({ position: new Vector2(22, 4) })
                    .to(100, { position: new Vector2(4, 4) }, { easing: 'cubicOut' })
                    .union()
                    .setTag("switchAni")
                    .start();
            }


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
        if (this._currentIsMute) {
            //显示关闭声音的样式

            this.imgYellowOn.visibility = SlateVisibility.Visible;
            this.imgCircle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
            this.text_SoundOff.text = "ON";
            this.imgCircleBack.position = new Vector2(22, 4);
            this.imgCircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
        } else {
            //显示开启声音的样式
            this.imgYellowOn.visibility = SlateVisibility.Collapsed;
            this.imgCircle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
            this.text_SoundOff.text = "OFF";
            this.imgCircleBack.position = new Vector2(4, 4);
            this.imgCircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
        }





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