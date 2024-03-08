import { GMBasePanel } from "module_gm";
import GMHUD_Generate from "../../../ui-generate/ShareUI/module_gm/GMHUD_generate";
import GMItem_Generate from "../../../ui-generate/ShareUI/module_gm/GMItem_generate";


export class GMBasePanelUI extends GMBasePanel<GMHUD_Generate, GMItem_Generate> {
    constructor() {
        super(GMHUD_Generate, GMItem_Generate);
    }
}
