







import { EventManager } from "../../tool/EventManager";
import { EModule_Events } from "../../const/Enum";
import { SetingMoudleS } from "./SetingMoudleS";
import SetingUI from "./UI/SetingUI";
import { EWorldType, GlobalWorld } from "../../const/GlobalWorld";


export class SetingMoudleC extends ModuleC<SetingMoudleS, null>
{


    private setingUI: SetingUI = null;

    protected async onStart() {

        this.setingUI = mw.UIService.create(SetingUI);
        EventManager.instance.add(EModule_Events.SetingModuleC_showSetingUI, this.showSetingUI.bind(this));
    }

    protected onEnterScene(sceneType: number): void {

    }

    public showSetingUI() {
        if (!this.setingUI) {
            return;
        }
        mw.UIService.showUI(this.setingUI);
    }


}