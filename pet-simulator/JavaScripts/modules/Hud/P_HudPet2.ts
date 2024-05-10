import HudPet2_Generate from "../../ui-generate/hud/HudPet2_generate";

export class P_HudPet2 extends HudPet2_Generate {
    onStart(): void {
        this.layer = mw.UILayerScene;

    }
}