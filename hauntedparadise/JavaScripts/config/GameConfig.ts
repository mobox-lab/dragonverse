import {ConfigBase, IElementBase} from "./ConfigBase";
import {BuffConfig} from "./Buff";
import {BuildingConfig} from "./Building";
import {BulletConfig} from "./Bullet";
import {CatHeadConfig} from "./CatHead";
import {DifficultyConfig} from "./Difficulty";
import {GameThemeConfig} from "./GameTheme";
import {GhostAttackConfig} from "./GhostAttack";
import {GhostDayConfig} from "./GhostDay";
import {GhostGraphicConfig} from "./GhostGraphic";
import {GhostGraphConfig} from "./GhostGraph";
import {GhostInstanceConfig} from "./GhostInstance";
import {GhostConfig} from "./Ghost";
import {GiftConfig} from "./Gift";
import {GlobalConfig} from "./Global";
import {GuideTalkConfig} from "./GuideTalk";
import {HomeWeatherConfig} from "./HomeWeather";
import {HotWeaponConfig} from "./HotWeapon";
import {ItemQualityConfig} from "./ItemQuality";
import {ItemConfig} from "./Item";
import {JsonConfig} from "./Json";
import {LanguageConfig} from "./Language";
import {MailBoxConfig} from "./MailBox";
import {MeleeWeaponConfig} from "./MeleeWeapon";
import {NotebookConfig} from "./Notebook";
import {PaintingStyleConfig} from "./PaintingStyle";
import {PassEndingConfig} from "./PassEnding";
import {PlayerExpConfig} from "./PlayerExp";
import {PopularExpConfig} from "./PopularExp";
import {RefreshPackConfig} from "./RefreshPack";
import {RefreshPointConfig} from "./RefreshPoint";
import {SceneRefreshPropsConfig} from "./SceneRefreshProps";
import {ShopConfig} from "./Shop";
import {SoundConfig} from "./Sound";
import {SpecialItemConfig} from "./SpecialItem";
import {SubGlobalConfig} from "./SubGlobal";
import {SubItemConfig} from "./SubItem";
import {SubLanguageConfig} from "./SubLanguage";
import {SubPassEndingConfig} from "./SubPassEnding";
import {TransItemConfig} from "./TransItem";
import {TreasureBoxConfig} from "./TreasureBox";

export class GameConfig{
	private static configMap:Map<string, ConfigBase<IElementBase>> = new Map();
	/**
	* 多语言设置
	* @param languageIndex 语言索引(-1为系统默认语言)
	* @param getLanguageFun 根据key获取语言内容的方法
	*/
	public static initLanguage(languageIndex:number, getLanguageFun:(key:string|number)=>string){
		ConfigBase.initLanguage(languageIndex, getLanguageFun);
		this.configMap.clear();
	}
	public static getConfig<T extends ConfigBase<IElementBase>>(ConfigClass: { new(): T }): T {
		if (!this.configMap.has(ConfigClass.name)) {
			this.configMap.set(ConfigClass.name, new ConfigClass());
		}
		return this.configMap.get(ConfigClass.name) as T;
	}
	public static get Buff():BuffConfig{ return this.getConfig(BuffConfig) };
	public static get Building():BuildingConfig{ return this.getConfig(BuildingConfig) };
	public static get Bullet():BulletConfig{ return this.getConfig(BulletConfig) };
	public static get CatHead():CatHeadConfig{ return this.getConfig(CatHeadConfig) };
	public static get Difficulty():DifficultyConfig{ return this.getConfig(DifficultyConfig) };
	public static get GameTheme():GameThemeConfig{ return this.getConfig(GameThemeConfig) };
	public static get GhostAttack():GhostAttackConfig{ return this.getConfig(GhostAttackConfig) };
	public static get GhostDay():GhostDayConfig{ return this.getConfig(GhostDayConfig) };
	public static get GhostGraphic():GhostGraphicConfig{ return this.getConfig(GhostGraphicConfig) };
	public static get GhostGraph():GhostGraphConfig{ return this.getConfig(GhostGraphConfig) };
	public static get GhostInstance():GhostInstanceConfig{ return this.getConfig(GhostInstanceConfig) };
	public static get Ghost():GhostConfig{ return this.getConfig(GhostConfig) };
	public static get Gift():GiftConfig{ return this.getConfig(GiftConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get GuideTalk():GuideTalkConfig{ return this.getConfig(GuideTalkConfig) };
	public static get HomeWeather():HomeWeatherConfig{ return this.getConfig(HomeWeatherConfig) };
	public static get HotWeapon():HotWeaponConfig{ return this.getConfig(HotWeaponConfig) };
	public static get ItemQuality():ItemQualityConfig{ return this.getConfig(ItemQualityConfig) };
	public static get Item():ItemConfig{ return this.getConfig(ItemConfig) };
	public static get Json():JsonConfig{ return this.getConfig(JsonConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get MailBox():MailBoxConfig{ return this.getConfig(MailBoxConfig) };
	public static get MeleeWeapon():MeleeWeaponConfig{ return this.getConfig(MeleeWeaponConfig) };
	public static get Notebook():NotebookConfig{ return this.getConfig(NotebookConfig) };
	public static get PaintingStyle():PaintingStyleConfig{ return this.getConfig(PaintingStyleConfig) };
	public static get PassEnding():PassEndingConfig{ return this.getConfig(PassEndingConfig) };
	public static get PlayerExp():PlayerExpConfig{ return this.getConfig(PlayerExpConfig) };
	public static get PopularExp():PopularExpConfig{ return this.getConfig(PopularExpConfig) };
	public static get RefreshPack():RefreshPackConfig{ return this.getConfig(RefreshPackConfig) };
	public static get RefreshPoint():RefreshPointConfig{ return this.getConfig(RefreshPointConfig) };
	public static get SceneRefreshProps():SceneRefreshPropsConfig{ return this.getConfig(SceneRefreshPropsConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get Sound():SoundConfig{ return this.getConfig(SoundConfig) };
	public static get SpecialItem():SpecialItemConfig{ return this.getConfig(SpecialItemConfig) };
	public static get SubGlobal():SubGlobalConfig{ return this.getConfig(SubGlobalConfig) };
	public static get SubItem():SubItemConfig{ return this.getConfig(SubItemConfig) };
	public static get SubLanguage():SubLanguageConfig{ return this.getConfig(SubLanguageConfig) };
	public static get SubPassEnding():SubPassEndingConfig{ return this.getConfig(SubPassEndingConfig) };
	public static get TransItem():TransItemConfig{ return this.getConfig(TransItemConfig) };
	public static get TreasureBox():TreasureBoxConfig{ return this.getConfig(TreasureBoxConfig) };
}