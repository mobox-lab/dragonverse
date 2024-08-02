import { EventManager } from "../../tool/EventManager";
import { EModule_Events } from "../../const/Enum";
import { SettingModuleS } from "./SettingModuleS";
import SettingUI from "./UI/SettingUI";
import { EWorldType, GlobalWorld } from "../../const/GlobalWorld";
import PlayerSettingModuleData, { SettingOptions } from "./SettingModuleData";
import Log4Ts from "mw-log4ts";
import { Globaldata } from "../../const/Globaldata";


export class SettingModuleC extends ModuleC<SettingModuleS, PlayerSettingModuleData> {

    private setingUI: SettingUI = null;

    protected onStart() {

        this.setingUI = mw.UIService.create(SettingUI);
        EventManager.instance.add(EModule_Events.SetingModuleC_showSetingUI, this.showSetingUI.bind(this));
        //初始化数据
        SoundService.volumeScale = this.data.soundEffectVolume;
        SoundService.BGMVolumeScale = this.data.bgmVolume;
        try {
            KeyboardSimulation.setLookUpRateScale(this.data.cameraLookUpRateScale);
        } catch (e) {
            Log4Ts.log(SettingModuleC, `setLookUpRateScale error:${e}`);
        }
        mw.PostProcess.saturation = this.data.saturation;
        mw.Lighting.castShadowsEnabled = this.data.enableShadow;
        let target = this.data.fovScale * (Globaldata.targetArmMaxLen - Globaldata.targetArmMinLen) + Globaldata.targetArmMinLen;
        Camera.currentCamera.springArm.length = target;
        Globaldata.isAutoLockEnemy = this.data.enableSearch;
    }

    protected onEnterScene(sceneType: number): void {

    }

    public showSetingUI() {
        if (!this.setingUI) {
            return;
        }
        mw.UIService.showUI(this.setingUI);
    }

    // async getCameraSpeed() {
    //     return await this.server.net_getCameraSpeed();
    // }

    // setCameraSpeed(speed: number) {
    //     this.server.net_setCameraSpeed(speed);
    // }
    public applySettings(options: SettingOptions) {
        this.server.net_applySettings(options);
    }
}