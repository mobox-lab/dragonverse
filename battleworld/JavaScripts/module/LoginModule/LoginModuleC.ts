import { EAreaEvent_C, EAreaId, EGuide_Event_C, EModule_Events, EPlayerEvents_C } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { LoginModuleS } from "./LoginModuleS";
import { PlayerModuleData } from '../PlayerModule/PlayerModuleData';
import { GuideDataHelper } from "module_guide";
import { CameraManger } from "../../tool/CameraManger";


export class LoginModuleC extends ModuleC<LoginModuleS, null> {


    protected onEnterScene(sceneType: number): void {
        CameraManger.instance.init();

        this.startGame();
    }


    /**
     * 开始游戏
     */
    private async startGame() {


        if (DataCenterC.getData(PlayerModuleData).isNewPlayer) {
            let isComplate = DataCenterC.getData(GuideDataHelper).guideIsComplate(1);
            if (isComplate == undefined || isComplate == null || isComplate == false) {

                EventManager.instance.call(EAreaEvent_C.AreaEvent_guidePos_C);
                EventManager.instance.call(EModule_Events.ui_openMainView, true);

                EventManager.instance.call(EGuide_Event_C.GuideEvent_StartGuide_C);
                return;
            } else {
                this.server.net_firstLogin();
            }

        }

        // if (DataCenterC.getData(PlayerModuleData).isNewPlayer) {
        //     EventManager.instance.call(EAreaEvent_C.area_transmit, EAreaId.Battle);

        //     //自由搭配技能 todo

        //     this.server.net_firstLogin();

        // } else {

        // }

        EventManager.instance.call(EAreaEvent_C.area_transmit, EAreaId.Safe);

        this.server.net_startGame();

        EventManager.instance.call(EModule_Events.ui_openMainView, true);


    }

    public firstLogin() {
        this.server.net_firstLogin();
    }


}