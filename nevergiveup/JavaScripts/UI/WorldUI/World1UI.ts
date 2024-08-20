import { GlobalData } from "../../const/GlobalData";
import World1UI_Generate from "../../ui-generate/Level/World1UI_generate";


export default class World1UI extends World1UI_Generate {

	// TODO: 不延时多语言就会失效
	protected onAwake() {
        super.onAwake();
        setTimeout(() => {
            super.initButtons();
        }, GlobalData.Global.worldLangInitDelay)
	}
}
