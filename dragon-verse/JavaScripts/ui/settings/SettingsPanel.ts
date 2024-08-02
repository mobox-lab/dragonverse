import GameServiceConfig from "../../const/GameServiceConfig";
import AudioController from "../../controller/audio/AudioController";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { MouseLockController } from "../../controller/MouseLockController";
import Log4Ts from "mw-log4ts";
import { PlayerSettingModuleC } from "../../module/player-setting/PlayerSettingModule";
import Setting_Main_Generate from "../../ui-generate/setting/Setting_Main_generate";


export default class SettingsPanel extends Setting_Main_Generate {
    private _lastIsMute: boolean = false;
    private _lastSpeedInputScale: number = 0;
    private _currentIsMute: boolean = false;
    private _currentSpeedInputScale: number = 0;

    protected onStart(): void {

        this.img_CircleBack.renderOpacity = 0.7;

        this.mScroll_speedInputScale.sliderButtonReleaseDelegate.add((currentValue: number) => {
            console.log("currentValue", currentValue);

            ModuleService.getModule(PlayerSettingModuleC).set("camera-lookUp-rate-scale", currentValue);

            this._currentSpeedInputScale = currentValue;
        });
        this.mBtn_CloseSound.onClicked.add(() => {
            // 判断是否静音
            let res = !(AudioController.getInstance().isPlayBgm || AudioController.getInstance().isPlayEffect);
            res = !res;
            if (res) {
                // 显示开启声音的样式
                this.text_SoundOn.text = "ON";
                this.imgYellowOn.visibility = SlateVisibility.SelfHitTestInvisible;
                this.img_Circle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
                this.img_CircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
                actions.tweens.stopAllByTag("switchAni");
                actions.tween(this.img_CircleBack)
                    .set({ position: new Vector2(4, 4) })
                    .to(100, { position: new Vector2(22, 4) }, { easing: 'cubicOut' })
                    .union()
                    .setTag("switchAni")
                    .start();

            } else {
                // 显示关闭声音的样式
                this.text_SoundOn.text = "OFF";
                this.imgYellowOn.visibility = SlateVisibility.Collapsed;
                this.img_Circle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
                this.img_CircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
                actions.tweens.stopAllByTag("switchAni");
                actions.tween(this.img_CircleBack)
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
        this._currentIsMute = !(AudioController.getInstance().isPlayBgm || AudioController.getInstance().isPlayEffect);
        if (this._currentIsMute) {
            //显示关闭声音的样式

            this.imgYellowOn.visibility = SlateVisibility.Visible;
            this.img_Circle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
            this.text_SoundOn.text = "ON";
            this.img_CircleBack.position = new Vector2(22, 4);
            this.img_CircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_ON_COLOR);
        } else {
            //显示开启声音的样式
            this.imgYellowOn.visibility = SlateVisibility.Collapsed;
            this.img_Circle.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
            this.text_SoundOn.text = "OFF";
            this.img_CircleBack.position = new Vector2(4, 4);
            this.img_CircleBack.imageColor = LinearColor.colorHexToLinearColor(GameServiceConfig.SOUND_OFF_COLOR);
        }



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