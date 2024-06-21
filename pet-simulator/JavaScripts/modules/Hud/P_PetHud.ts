import PetHud_Generate from "../../ui-generate/Pet/PetHud_generate";
import AchievementPanel from "../AchievementModule/ui/AchievementPanel";
import { P_DollMachine } from "../DollMachine/P_DollMachine";
import { P_HudPetGift } from "../OnlineModule.ts/P_HudPetGift";
import { P_Bag } from "../PetBag/P_Bag";
import { P_Enchants } from "../PetBag/P_Enchants";
import { P_FusePanel } from "../PetBag/P_FusePanel";
import { P_Pet_Dev } from "../PetBag/P_Pet_Dev";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { CollectModuleC } from "../PetCollect/CollectModuleC";
import { P_Collect } from "../PetCollect/P_Collect";
import { P_LevelUI } from "../Player/P_LevelUI";
// import { P_TradingChooseMain } from "../Trading/P_TradeChoose";
// import { P_HistoryTrade, P_historyRecord } from "../Trading/P_TradeHistory";
// import { P_Trading } from "../Trading/P_Trading";
// import { TradingModuleC } from "../Trading/TradingModuleC";
import { P_HudUI } from "./P_HudUI";



export class P_PetHud extends PetHud_Generate {

    onStart(): void {
        // mw.UIService.getUI(P_TradingChooseMain).showAction.add(() => {
        //     mw.UIService.getUI(P_Bag).hide();
        //     mw.UIService.getUI(P_Collect).hide();
        //     mw.UIService.getUI(AchievementPanel).hide();
        //     mw.UIService.getUI(P_HudUI).setVis(false);
        //     mw.UIService.getUI(P_HudPetGift).hide();
        //     this.mBtn_Trade.enable = false;
        //     this.show();
        // })
        // mw.UIService.getUI(P_TradingChooseMain).hideAction.add(() => {
        //     mw.UIService.getUI(P_HudUI).setVis(true);
        //     mw.UIService.getUI(P_HudPetGift).show();
        //     this.mBtn_Trade.enable = true;
        //     this.hide();
        // })
        mw.UIService.getUI(P_Bag).showAction.add(() => {
            mw.UIService.getUI(P_Collect).hide();
            mw.UIService.getUI(AchievementPanel).hide();
            // mw.UIService.getUI(P_TradingChooseMain).hide();
            mw.UIService.getUI(P_HudUI).setVis(false);
            mw.UIService.getUI(P_HudPetGift).hide();
            this.mBtn_pet.enable = false;
            this.show();
        })
        mw.UIService.getUI(P_Bag).hideAction.add(() => {
            mw.UIService.getUI(P_HudUI).setVis(true);
            mw.UIService.getUI(P_HudPetGift).show();
            this.mBtn_pet.enable = true;
            this.hide();
        })
        mw.UIService.getUI(P_Collect).showAction.add(() => {
            mw.UIService.getUI(P_Bag).hide();
            mw.UIService.getUI(AchievementPanel).hide();
            // mw.UIService.getUI(P_TradingChooseMain).hide();
            mw.UIService.getUI(P_HudUI).setVis(false);
            mw.UIService.getUI(P_HudPetGift).hide();
            this.mBtn_collect.enable = false;
            this.show();
        })
        mw.UIService.getUI(P_Collect).hideAction.add(() => {
            mw.UIService.getUI(P_HudUI).setVis(true);
            mw.UIService.getUI(P_HudPetGift).show();
            this.mBtn_collect.enable = true;
            this.hide();
        })
        mw.UIService.getUI(AchievementPanel).showAction.add(() => {
            mw.UIService.getUI(P_Bag).hide();
            mw.UIService.getUI(P_Collect).hide();
            // mw.UIService.getUI(P_TradingChooseMain).hide();
            mw.UIService.getUI(P_HudUI).setVis(false);
            mw.UIService.getUI(P_HudPetGift).hide();
            this.mBtn_achve.enable = false;
            this.show();
        })
        mw.UIService.getUI(AchievementPanel).hideAction.add(() => {
            mw.UIService.getUI(P_HudUI).setVis(true);
            mw.UIService.getUI(P_HudPetGift).show();
            this.mBtn_achve.enable = true;
            this.hide();
        })
        // mw.UIService.getUI(P_Trading).showAction.add(() => {
        //     if (mw.UIService.getUI(P_HudPetGift).visible) {
        //         mw.UIService.getUI(P_HudPetGift).hide();
        //         mw.UIService.getUI(P_HudUI).setVis(false);
        //     }
        // })
        // mw.UIService.getUI(P_Trading).hideAction.add(() => {
        //     mw.UIService.getUI(P_HudUI).setVis(true);
        //     mw.UIService.getUI(P_HudPetGift).show();
        // })
        // mw.UIService.getUI(P_historyRecord).showAction.add(() => {
        //     mw.UIService.getUI(P_TradingChooseMain).hide();
        //     mw.UIService.getUI(P_HudUI).setVis(false);
        //     mw.UIService.getUI(P_HudPetGift).hide();
        //     this.hide();
        // })
        // mw.UIService.getUI(P_historyRecord).hideAction.add(() => {
        //     mw.UIService.getUI(P_TradingChooseMain).show();
        //
        // })
        // mw.UIService.getUI(P_HistoryTrade).showAction.add(() => {
        //     mw.UIService.getUI(P_historyRecord).hide();
        //     mw.UIService.getUI(P_TradingChooseMain).hide();
        //     mw.UIService.getUI(P_HudUI).setVis(false);
        //     mw.UIService.getUI(P_HudPetGift).hide();
        //     this.hide()
        // })
        // mw.UIService.getUI(P_HistoryTrade).hideAction.add(() => {
        //     mw.UIService.getUI(P_historyRecord).show();
        // })
        mw.UIService.getUI(P_Pet_Dev).hideAction.add(() => {
            mw.UIService.getUI(P_HudUI).show();
            mw.UIService.getUI(P_HudPetGift).show();
        })
        mw.UIService.getUI(P_Pet_Dev).showAction.add(() => {
            mw.UIService.getUI(P_HudUI).hide();
            mw.UIService.getUI(P_HudPetGift).hide();
        })
        mw.UIService.getUI(P_FusePanel).hideAction.add(() => {
            mw.UIService.getUI(P_HudUI).show();
            mw.UIService.getUI(P_HudPetGift).show();
        })
        mw.UIService.getUI(P_FusePanel).showAction.add(() => {
            mw.UIService.getUI(P_HudUI).hide();
            mw.UIService.getUI(P_HudPetGift).hide();
        })
        mw.UIService.getUI(P_LevelUI).hideAction.add(() => {
            mw.UIService.getUI(P_HudUI).show();
            mw.UIService.getUI(P_HudPetGift).show();
        })
        mw.UIService.getUI(P_LevelUI).showAction.add(() => {
            mw.UIService.getUI(P_HudUI).hide();
            mw.UIService.getUI(P_HudPetGift).hide();
        })
        mw.UIService.getUI(P_Enchants).showAction.add(() => {
            mw.UIService.getUI(P_HudUI).setRightBottomVis(false);
            mw.UIService.getUI(P_HudPetGift).hide();
        })
        mw.UIService.getUI(P_Enchants).hideAction.add(() => {
            mw.UIService.getUI(P_HudUI).setRightBottomVis(true);
            mw.UIService.getUI(P_HudPetGift).show();
        })

        mw.UIService.getUI(P_DollMachine).showAction.add(() => {
            // mw.UIService.getUI(P_HudUI).setVis(false);
            mw.UIService.getUI(P_HudPetGift).hide();
        })
        mw.UIService.getUI(P_DollMachine).hideAction.add(() => {
            //mw.UIService.getUI(P_HudUI).setVis(true);
            mw.UIService.getUI(P_HudPetGift).show();
        })
        // mw.UIService.getUI(P_PassTask).showAction.add(() => {
        //     mw.UIService.getUI(P_HudUI).setVis(false);
        //     mw.UIService.getUI(P_HudPetGift).hide();
        // })
        // mw.UIService.getUI(P_PassTask).hideAction.add(() => {
        //     mw.UIService.getUI(P_HudUI).setVis(true);
        //     mw.UIService.getUI(P_HudPetGift).show();
        // });
        // mw.UIService.getUI(P_KeyTips).showAction.add(() => {
        //     mw.UIService.getUI(P_PassTask).hide();
        // })
        // mw.UIService.getUI(P_PassTask).hideAction.add(() => {
        //     mw.UIService.getUI(P_HudUI).setVis(true);
        //     mw.UIService.getUI(P_HudPetGift).show();
        // })

        this.mBtn_pet.onClicked.add(() => {
            ModuleService.getModule(PetBagModuleC).showBag();
        });
        this.mBtn_collect.onClicked.add(() => {
            ModuleService.getModule(CollectModuleC).showCollectUI();
        });
        // this.mBtn_Trade.onClicked.add(async () => {
        //     await ModuleService.getModule(TradingModuleC).showChoosePlayerUI();
        // });
        this.mBtn_achve.onClicked.add(() => {
            mw.UIService.getUI(AchievementPanel).show();
        });
    }

}