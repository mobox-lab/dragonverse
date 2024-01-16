import { P_Transmit } from "../modules/AreaDivide/P_Transmit";
import { P_HudUI } from "../modules/Hud/P_HudUI";
import { P_PetHud } from "../modules/Hud/P_PetHud";
import { P_HudPetGift } from "../modules/OnlineModule.ts/P_HudPetGift";
import { P_RewardPanel } from "../modules/OnlineModule.ts/P_RewardPanel";
import { P_Game_Buff } from "../modules/buff/ui/P_Game_Buff";
import MessageBox from "./MessageBox";
import { P_TaskShop } from "../modules/Task/P_TaskShop";
import GameIngo_Generate from "../ui-generate/common/GameIngo_generate";

export class UICtrl {

    private static _instance: UICtrl;
    public static get instance(): UICtrl {
        if (!this._instance) this._instance = new UICtrl();
        return this._instance;
    }

    private isInit: boolean = false;

    public init(): void {
        if (this.isInit) return;
        this.isInit = true;
        mw.UIService.getUI(P_PetHud);
        let uiInstance = mw.UIService;
        const secondUIs: MessageBox[] = [
            // MessageBox.instance,
            MessageBox.oneMess as any,
            uiInstance.getUI(P_RewardPanel),
            uiInstance.getUI(P_Transmit),
            uiInstance.getUI(P_TaskShop),
        ];
        secondUIs.forEach((ui) => {
            ui.showAction.add((ui) => {
                this.showSecondUI();
                this.allShowSecondUI.add(ui);
            })
            ui.hideAction.add(() => {
                this.hideSecondUI();
                this.allShowSecondUI.delete(ui);
            })
        })
        this.eventInit();
    }

    private eventInit(): void {
        Event.addLocalListener("ShowUIAction_37", (uiObj: mw.UIScript) => {
            this.showUIAction(uiObj);
        });
        Event.addLocalListener("HideUIAction_37", (uiObj: mw.UIScript) => {
            this.hideUIAction(uiObj);
        });
    }

    /**已显示的所有UI */
    private allShowUI: Set<mw.UIScript> = new Set();
    /**已显示的所有二级UI */
    private allShowSecondUI: Set<mw.UIScript> = new Set();

    /**ui显示回调 */
    private showUIAction(ui: mw.UIScript): void {
        this.allShowUI.add(ui);
    }

    /**ui隐藏回调 */
    private hideUIAction(ui: mw.UIScript): void {
        this.allShowUI.delete(ui);
    }

    /**关闭所有UI */
    public closeAllUI(): void {
        this.allShowUI.forEach((ui) => {
            (ui as MessageBox).hide();
        })
    }

    /**打开主控 */
    public openMainUI(): void {
        mw.UIService.getUI(P_HudUI).show();
        mw.UIService.getUI(P_Game_Buff).show();
        mw.UIService.getUI(P_HudPetGift).show();
        mw.UIService.getUI(GameIngo_Generate).show();
    }

    /**二级页面打开隐藏其他UI */
    private showSecondUI(): void {
        mw.UIService.getUI(P_HudUI).setVis(false);
        mw.UIService.getUI(P_HudPetGift).hide();
    }

    /**二级页面关闭打开其他UI */
    private hideSecondUI(): void {
        if (this.allShowSecondUI.size <= 0) return;
        mw.UIService.getUI(P_HudUI).setVis(true);
        mw.UIService.getUI(P_HudPetGift).show();
    }

}