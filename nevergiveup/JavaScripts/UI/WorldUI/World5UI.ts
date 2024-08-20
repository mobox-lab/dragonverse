import { GlobalData } from "../../const/GlobalData";
import World5UI_Generate from "../../ui-generate/Level/World5UI_generate";


export default class World5UI extends World5UI_Generate {

	// TODO: 不延时多语言就会失效
	protected onAwake() {
        super.onAwake();
        setTimeout(() => {
            super.initButtons();
        }, GlobalData.Global.worldLangInitDelay)
	}
}
