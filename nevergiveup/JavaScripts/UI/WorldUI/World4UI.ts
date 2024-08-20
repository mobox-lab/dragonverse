import { GlobalData } from "../../const/GlobalData";
import World4UI_Generate from "../../ui-generate/Level/World4UI_generate";


export default class World4UI extends World4UI_Generate {

	// TODO: 不延时多语言就会失效
	protected onAwake() {
        super.onAwake();
        setTimeout(() => {
            super.initButtons();
        }, GlobalData.Global.worldLangInitDelay)
	}
}
