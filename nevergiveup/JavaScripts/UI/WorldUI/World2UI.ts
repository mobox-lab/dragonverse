import { GlobalData } from "../../const/GlobalData";
import World2UI_Generate from "../../ui-generate/Level/World2UI_generate";


export default class World2UI extends World2UI_Generate {

	// TODO: 不延时多语言就会失效
	protected onAwake() {
        super.onAwake();
        setTimeout(() => {
            super.initButtons();
        }, GlobalData.Global.worldLangInitDelay)
	}
}
