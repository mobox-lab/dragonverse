import { ConfigBase } from "../config/ConfigBase";
import { GameConfig } from "../config/GameConfig";
import { Globaldata } from "../const/Globaldata";

/**
 * 多语言管理类
 */
export class LanguageManager {


    /**初始化多语言 */
    public static init_language(languageIndex: number) {

        Globaldata.selectedLanguageIndex = Number(languageIndex);
        if (Globaldata.selectedLanguageIndex == -1) {
            Globaldata.selectedLanguageIndex = ConfigBase["getSystemLanguageIndex"]();
        }

        if (SystemUtil.isServer()) {
            return;
        }

        GameConfig.initLanguage(Globaldata.selectedLanguageIndex, this.getLanuageText.bind(this));

        mw.UIScript.addBehavior("lan", this.set_language_ui.bind(this));


        this.language_worldUI();
    }

    private static async language_worldUI() {
        // 世界UI多语言
        if (Globaldata.worldUI == null) {
            return;
        }

        for (let index = 0; index < Globaldata.worldUI.length; index++) {
            const uiGuid = Globaldata.worldUI[index];
            let uiObj = await GameObject.asyncFindGameObjectById(uiGuid) as mw.UIWidget;
            if (uiObj instanceof mw.UIWidget) {
                let rootCanvas = uiObj.getTargetUIWidget().findChildByPath("RootCanvas") as mw.Canvas;
                this.ui_language(rootCanvas);
            }
        }
    }

    /**获取多语言文本 */
    private static getLanuageText(key: string | number) {
        if(key == null){
            return null;
        }

        let result = null;

        if (isNaN(Number(key))) {
            result = GameConfig.Language.findElement("Name", key)?.Value;
        } else {
            result = GameConfig.Language.getElement(key)?.Value;
        }

        if (result) {
            return result;
        } else {
            return key.toString();    
        }
    }

    /**设置UI多语言 */
    private static set_language_ui(ui: mw.StaleButton | mw.TextBlock) {
        let key: string = ui.text;
        if (key) {
            let resultText = this.getLanuageText(key);
            if (resultText) {
                ui.text = resultText;
            }
        }
    }

    private static ui_language(canvas: mw.Canvas) {

        let count = canvas.getChildrenCount();

        for (let index = 0; index < count; index++) {
            const widget = canvas.getChildAt(index);
            if (widget instanceof mw.Canvas) {
                this.ui_language(widget);
                continue;
            }
            if (widget instanceof mw.TextBlock) {
                this.set_language_ui(widget);
            }
            if (widget instanceof mw.StaleButton) {
                this.set_language_ui(widget);
            }
        }
    }
}