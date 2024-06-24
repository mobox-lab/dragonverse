import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import Hover_number2_Generate from "../../ui-generate/Hover_Bag/Hover_number2_generate";
import { P_HoverEnchantItem } from "./P_HoverEnchantItem";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";

/**宠物悬停框 2词条以内 */
export class P_BagHoverNum2 extends Hover_number2_Generate {
    public setPetInfoShow(item: petItemDataNew, loc: mw.Vector2) {
        this.rootCanvas.position = new mw.Vector2(loc.x, loc.y);
        const curPetData = DataCenterC.getData(PetBagModuleData).bagItemsByKey(item.k);
        this.mCanvas_Entrylist.removeAllChildren();
        if (!curPetData) return;
        this.show();
        let cfg = GameConfig.PetARR.getElement(curPetData.I);
        if (cfg == null) return;

        this.mNameBig.text = cfg.petName;
        this.mNameSmall.text = curPetData.p.n;

        this.picLovelovelove.renderOpacity =
            cfg.DevType === GlobalEnum.PetDevType.Love ? 1 : 0.4;
        this.picRainbowowow.renderOpacity =
            cfg.DevType === GlobalEnum.PetDevType.Rainbow ? 1 : 0.4;

        this.setPetInfoRarityUI(cfg.QualityType);

        const isMyth = cfg.QualityType === GlobalEnum.PetQuality.Myth;

        const buffIds = Array.from(curPetData.p.b);

        if (isMyth) {
            const top = buffIds.pop();
            let item = mw.UIService.create(P_HoverEnchantItem);
            item.setCfgId(top, true);
            item.uiObject.size = item.mCanvas.size;
            this.mCanvas_Entrylist.addChild(item.uiObject);
        }

        const len = buffIds?.length ?? 0; // 两词条则可选择一词条重铸
        const items = [];
        for (let i = 0; i < len; i++) {
            const buffId = buffIds[i];
            let item = mw.UIService.create(P_HoverEnchantItem);
            item.uiObject.size = item.mCanvas.size;
            item.setCfgId(buffId);
            this.mCanvas_Entrylist.addChild(item.uiObject);
            items.push(item);
        }
    }

    private setPetInfoRarityUI(type: number) {
        const quality = GlobalEnum.PetQuality;
        switch (type) {
            case quality.Normal: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_1.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[0];
                return;
            }
            case quality.Rare: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_2.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[1];
                return;
            }
            case quality.Epic: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_3.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[2];
                return;
            }
            case quality.Legend: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_4.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[3];
                return;
            }
            case quality.Myth: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_5.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[4];
                return;
            }
            default: {
                this.textRarity.text = GameConfig.Language.PetARR_Quality_1.Value;
                this.picRarity.imageGuid = GlobalData.Enchant.enchantPetRarityGuid[0];
                return;
            }
        }
    }
}

