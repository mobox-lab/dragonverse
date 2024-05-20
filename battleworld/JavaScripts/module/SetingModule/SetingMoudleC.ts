import { EventManager } from "../../tool/EventManager";
import { EModule_Events } from "../../const/Enum";
import { SettingModuleS } from "./SetingMoudleS";
import SetingUI from "./UI/SetingUI";
import { EWorldType, GlobalWorld } from "../../const/GlobalWorld";
import { SettingModuleData } from "./SettingModuleData";

export class SettingModuleC extends ModuleC<SettingModuleS, SettingModuleData> {

    private setingUI: SetingUI = null;

    protected async onStart() {

        this.setingUI = mw.UIService.create(SetingUI);
        EventManager.instance.add(EModule_Events.SetingModuleC_showSetingUI, this.showSetingUI.bind(this));

        SoundService.BGMVolumeScale = 0.25;
        SoundService.volumeScale = 0.25;
    }

    protected onEnterScene(sceneType: number): void {

    }

    public showSetingUI() {
        if (!this.setingUI) {
            return;
        }
        mw.UIService.showUI(this.setingUI);
    }

    async getCameraSpeed() {
        return await this.server.net_getCameraSpeed();
    }

    setCameraSpeed(speed: number) {
        this.server.net_setCameraSpeed(speed);
    }
}