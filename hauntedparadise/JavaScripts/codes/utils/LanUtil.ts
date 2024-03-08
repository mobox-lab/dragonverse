import { GameConfig } from "../../config/GameConfig";

export class LanUtil {
    public static getText(key: string): string {

        let val = GameConfig.Language[key];
        if (!val) {
            val = GameConfig.SubLanguage[key];
        }
        if (val && val.Value) {
            return val.Value
        } else {
            console.error("LanguageEx.getText error, key not found: " + key)
        }

        return `u_${key}`;
    }
}