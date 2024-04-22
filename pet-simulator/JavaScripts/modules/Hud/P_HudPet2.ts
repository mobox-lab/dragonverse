import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import HudPet2_Generate from "../../ui-generate/hud/HudPet2_generate";
import {PetBagModuleC} from "../PetBag/PetBagModuleC";

export class P_HudPet2 extends HudPet2_Generate {
    onStart(): void {
        this.layer = mw.UILayerScene;

        KeyOperationManager.getInstance().onKeyUp(this, Keys.B, () => {
            ModuleService.getModule(PetBagModuleC).showBag();
        });
    }
}