import { GlobalData } from "../../const/GlobalData";
import World3UI_Generate from "../../ui-generate/Level/World3UI_generate";


export default class World3UI extends World3UI_Generate {

	// TODO: 不延时多语言就会失效
	protected onAwake() {
        super.onAwake();
        setTimeout(() => {
            super.initButtons();
        }, GlobalData.Global.worldLangInitDelay)
	}
}
