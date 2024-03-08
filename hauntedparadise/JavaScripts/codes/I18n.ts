/*
 * @Author       : feifei.song
 * @Date         : 2023-09-01 17:30:40
 * @LastEditors  : feifei.song
 * @LastEditTime : 2023-09-04 20:19:29
 * @FilePath     : \catcompanion\JavaScripts\I18n.ts
 * @Description  : 
 */

import { ConfigBase } from "../config/ConfigBase";
import { GameConfig } from "../config/GameConfig";

// 中文映射
const CNMap: Map<string, string> = new Map<string, string>();

/**
 * 初始化多语言
 */
let setLanguage = (lauguage: number) => {

    // 拿到中文
    const lauID: Map<string, number> = new Map<string, number>();
    const isCN = lauguage == 1 || (lauguage == -1 && mw.LocaleUtil.getDefaultLocale().toString().toLowerCase().match("zh"));
    if (!isCN) {
        ConfigBase.initLanguage(1, null);
        GameConfig.Language.getAllElement().forEach((value, key) => {
            lauID.set(value.Value, value.id);
        });
    }
    GameConfig.initLanguage(lauguage, (key) => {
        let ele = GameConfig.Language.getElement(key);
        if (ele == null) {
            ele = GameConfig.SubLanguage.getElement(key)
            if (!ele) {
                return key + "";
            }
            return ele.Value;
        }
        return ele.Value;
    });
    if (!isCN) {
        lauID.forEach((v, k) => {
            CNMap.set(k, GameConfig.Language.getElement(v).Value);
        })
    }

    // 替换UI中的中文文本
    mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
        const key: string = ui.text;
        if (key) {
            let lan = GameConfig.Language[key];
            if (!lan) {
                lan = GameConfig.SubLanguage[key];
            }

            if (lan) {
                ui.text = lan.Value
            }

            // 对中文进行替换
            if (!isCN) {
                const cn = CNMap.get(key);
                if (cn) {
                    ui.text = cn;
                }

                // 给出未找到中文的警告
                const reg = new RegExp("[\\u4e00-\\u9FFF]+");
                if (reg.test(key)) {
                    console.warn("ui view not found chinese:" + key)
                }
            }
        }
    });

}

/** 添加语言处理器 */
mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
    let key: string = ui.text;
    if (key) {
        let lan = GameConfig.Language[key];
        if (!lan) {
            lan = GameConfig.SubLanguage[key];
        }
        if (lan && lan.Value) {
            ui.text = lan.Value;
        }
    }
});

/** 初始化语言 */
GameConfig.initLanguage(-1, key => {
    let result = GameConfig.Language[key];
    if (!result) {
        result = GameConfig.SubLanguage[key];
    }
    if (result && result.Value) {
        return result.Value;
    } else {
        return `u_${key}`
    }
});

// 初始化多语言
setLanguage(-1);

export namespace I18n {

    export const initLanguage = (lauguage: number) => {
        setLanguage(lauguage);
    }



}
