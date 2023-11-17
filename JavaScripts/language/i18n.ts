import { GameConfig } from "../config/GameConfig";
import { ILanguageElement } from "../config/Language";

//#region Config 配置区 用于 i18n 配置

/**
 * 多语言类型.
 * 此处映射应与 Language 配置表中的语言列顺序一致.
 *
 * 枚举值用于 ConfigBase.Language 初始化 Value 时计算偏移量.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export enum LanguageTypes {
    English,
    Chinese,
    Japanese
}

/**
 * 缺省多语言表.
 *
 * 开发环境中的语言配置表 允许在不打开 Excel 并再生成配置的情况下进行多语言控制.
 * 用于开发时快速定义缺省文本.
 *
 * 最佳实践要求 发布后此表数据不应被采纳.
 */
let languageDefault = {
    // ["ts_language_1"]: "{0}通关成功，用时<color=#red>{1}</color>",


    ["UI_FashionMagazineSerialSuffix"]: "期",

    ["UI_FashionMagazineAbleToStore"]: "去购买",

    ["UI_FashionMagazineUnableToStore"]: "服装和您的性别不符，仅供浏览哦",

    ["UI_GameSelectGameComingSoon"]: "正在筹备",

    ["UI_ActOfMotion"]: "动作",

    ["UI_ActOfExpression"]: "表情",

    ["UI_Common_Tips"]: "提示",

    ["UI_Create_Role_Tips"]: "确认创建该角色？\n一旦创建，性别将无法更改",

    ["UI_SPRINT_MSG"]: "快速点击画面吧！",

    ["UI_CURVE_MSG"]: "抓住快要离开跳台的瞬间 点击\"跳跃\"按钮！",

    ["UI_FALL_MSG"]: "提前点击按钮摆好姿势落地哦！",

    ["UI_COMMON_OK"]: "确定",

    ["UI_COMMON_CANCEL"]: "取消",

    ["UI_Common_CostNotEnough"]: "费用不足\n赚到足够的钱再来吧",

    ["UI_STORE_BUYSUCCESS"]: "购买成功",
    ["UI_STORE_BUYTIPS"]: "要购买穿着的服饰吗？",

    ["UI_STORE_RESET"]: "要清除已试穿装扮吗？\n我们将为您替换为当前穿戴的装扮",
    ["UI_STORE_GOODS_TIME_FOREVER"]: "永久",
    ["UI_STORE_GOODS_TIME_DAY"]: "天",

    ["UI_STORE_OWNED_GOODS"]: "已拥有",

    ["UI_EXCHANGE_STORE_WAIT"]: "再想一下",

    ["UI_EXCHANGE_STORE_SURE"]: "确认兑换该单品吗？",

    ["UI_FAKE_NICKNAME1"]: "丸不动辣-",
    ["UI_FAKE_NICKNAME2"]: "三十年执行策划",
    ["UI_FAKE_NICKNAME3"]: "起个名字真费劲",
    ["UI_FAKE_NICKNAME4"]: "你叭叭啥",
    ["UI_FAKE_NICKNAME5"]: "真嘟假嘟0_o",

    ["UI_ENERGY_NOT_ENOUGH"]: "体力不够了，休息一会",
    ["UI_TREASURE_HAS_DIGGED"]: "宝物已经被挖掘了哦，再找找吧",
    ["UI_TREASURE_FAR"]: "离宝物近一点才能挖掘哦，再找找吧",
    ["UI_DIGGING_TIPS"]: "持续点击挖掘按钮，用力挖出宝藏吧",
    ["UI_DRESS_PIECES_NOT_ENOUGH"]: "皮肤碎片不够兑换哦，再去挖一点再来吧",
    ["UI_NO_REWARD"]: "好可惜，宝箱是空的呢，再挖挖吧",
    ["UI_DIG_TIPS"]: "一直点击挖掘按钮，将宝物从沙子里挖出来吧",

    ["UI_NOBODY_ACCEPT_INVITATION"]: "无人接受",
    ["UI_ScalerText_text_Interrupt"]: "动作被中断",

    ["UI_BagItem_txtTime_003"]: "小时",
    ["FORMAT_TIME_MINUTE"]: "分",
    ["FORMAT_TIME_SECOND"]: "秒",

    //#region 背包
    ["UI_BAG_BtnTextUnload"]: "卸下",
    ["UI_BAG_BtnTextEquip"]: "装备",
    ["UI_BAG_TextForever"]: "永久",

    ["UI_BAG_Full"]: "装备栏已满!",

    //#endregion
};
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Core 核心功能 请勿修改

type LanguageTable = {
    [Property in keyof typeof languageDefault]: Property;
};

/**
 * i18n.
 * 文本本地化工具.
 *
 * It depends on GameConfigBase.
 * To use specified language, you should call:
 * <code>
 *     i18n.use(LanguageType);
 * </code>
 *
 * When releasing, you should call:
 * <code>
 *     i18n.release();
 * </code>
 *
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 * @version 1.4.0b
 */
class i18n {
    /**
     * Lan Config Keys.
     */
    public keyTable: LanguageTable;

    /**
     * i18n 本地化.
     * 将文本翻译为当地语言.
     * @param keyOrText
     * @param params
     */
    public lan(keyOrText: string, ...params: unknown[]): string {
        if (keyOrText === null || keyOrText === undefined) return "NullKey";

        let text: string = (GameConfig.Language[keyOrText] as ILanguageElement)?.Value;

        if (isNullOrEmpty(text)) {
            text = languageDefault ? languageDefault[keyOrText] : null;
        }

        if (isNullOrEmpty(text)) {
            text = keyOrText;
        }

        return StringUtil.format(text, ...params);
    }

    /**
     * you shouldn't call it.
     */
    public constructor() {
        mw.UIScript.addBehavior("lan", (ui: mw.StaleButton | mw.TextBlock) => {
            let keyOrString: string = ui.text;
            if (isNullOrEmpty(keyOrString)) {
                return;
            }

            ui.text = this.lan(keyOrString);
            return;
        });
    }

    /**
     * 初始化.
     */
    public init(): this {
        this.keyTable = {} as LanguageTable;
        for (const key of Object.keys(languageDefault)) {
            this.keyTable[key] = key;
        }
        return this;
    }

    /**
     * 使用指定语言.
     * @param languageType
     */
    public use(languageType: LanguageTypes = 0): this {
        GameConfig.initLanguage(languageType, defaultGetLanguage);
        return this;
    }

    /**
     * 发布版本时请调用.
     * 用于清空 DefaultLanguage 表 以检查是否所有的 DL 条目都完成配表.
     */
    public release(isRelease: boolean = true): this {
        if (!isRelease) {
            return this;
        }
        languageDefault = null;
        return this;
    }
}

/**
 * default get language func.
 * @param key
 */
export function defaultGetLanguage(key: number | string) {
    const config = GameConfig.Language.getElement(key);
    if (!config) {
        return "unknown_" + key;
    }

    return config.Value;
}

function isNullOrEmpty(text: string): boolean {
    return text === undefined || text === null || text === "";
}

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Export

export default new i18n().init().use();
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄