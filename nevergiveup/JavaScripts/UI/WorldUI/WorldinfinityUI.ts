import { GlobalData } from "../../const/GlobalData";
import WorldinfinityUI_Generate from "../../ui-generate/Level/WorldinfinityUI_generate";


export default class WorldinfinityUI extends WorldinfinityUI_Generate {

	// TODO: 不延时多语言就会失效
	protected onAwake() {
        super.onAwake();
        setTimeout(() => {
            super.initButtons();
        }, GlobalData.Global.worldLangInitDelay)
	}
}
