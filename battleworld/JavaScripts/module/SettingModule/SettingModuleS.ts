import { SettingModuleC } from "./SettingModuleC";
import PlayerSettingModuleData, { SettingOptions } from "./SettingModuleData";



export class SettingModuleS extends ModuleS<SettingModuleC, PlayerSettingModuleData> {

    protected onStart(): void {

    }

    protected onPlayerLeft(player: mw.Player): void {

    }


    net_applySettings(options: SettingOptions) {
        this.currentData.bgmVolume = options.bgmVolume;
        this.currentData.soundEffectVolume = options.soundEffectVolume;
        this.currentData.cameraLookUpRateScale = options.cameraLookUpRateScale;
        this.currentData.saturation = options.saturation;
        this.currentData.enableShadow = options.enableShadow;
        this.currentData.fovScale = options.fovScale;
        this.currentData.enableSearch = options.enableSearch;
        // this.currentData.cameraSpeed = value;
        this.currentData.save(false);
    }

}