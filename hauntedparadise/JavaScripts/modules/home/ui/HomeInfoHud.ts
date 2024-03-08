import { GameConfig } from "../../../config/GameConfig";
import HomeName_UI_Generate from "../../../ui-generate/ShareUI/HomeName_UI_generate";

export default class HomeInfoHud extends HomeName_UI_Generate {

    onStart() {
        this.layer = mw.UILayerTop;
    }

    setInfo(info1: string) {
        if (StringUtil.isEmpty(info1)) {
            this.text_playerName.text = GameConfig.Language["Homename_02"].Value;
            this.text_home.text = "";
            this.text_home_1.text = "";
        } else {
            let newInfo = info1.length > 7 ? info1.substring(0, 7) + "..." : info1.substring(0, 7);
            this.text_playerName.text = newInfo;
            this.text_home.text = GameConfig.Language.tips_show_09.Value;
        }
    }
}