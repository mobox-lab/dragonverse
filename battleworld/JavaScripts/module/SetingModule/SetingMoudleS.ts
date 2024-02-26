import { EModule_Events_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";








import { SettingModuleC } from "./SetingMoudleC";
import { SettingModuleData } from "./SettingModuleData";


export class SettingModuleS extends ModuleS<SettingModuleC, SettingModuleData> {

    protected onStart(): void {

    }

    protected onPlayerLeft(player: mw.Player): void {

    }


    net_setCameraSpeed(value: number) {
        this.currentData.cameraSpeed = value;
        this.currentData.save(false);
    }


    async net_getCameraSpeed(): Promise<number> {
        return this.currentData.cameraSpeed;
    }

}