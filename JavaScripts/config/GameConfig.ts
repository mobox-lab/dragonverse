import {ConfigBase, IElementBase} from "./ConfigBase";
import {AreaConfig} from "./Area";
import {BagItemConfig} from "./BagItem";
import {CollectDragonConfig} from "./CollectDragon";
import {CollectibleItemConfig} from "./CollectibleItem";
import {CollectResultAlgoConfig} from "./CollectResultAlgo";
import {DragonConfig} from "./Dragon";
import {ElementalConfig} from "./Elemental";
import {LanguageConfig} from "./Language";
import {QualityConfig} from "./Quality";
import {SoundConfig} from "./Sound";
import {SuccessRateAlgoConfig} from "./SuccessRateAlgo";

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
	public static get Area():AreaConfig{ return this.getConfig(AreaConfig) };
	public static get BagItem():BagItemConfig{ return this.getConfig(BagItemConfig) };
	public static get CollectDragon():CollectDragonConfig{ return this.getConfig(CollectDragonConfig) };
	public static get CollectibleItem():CollectibleItemConfig{ return this.getConfig(CollectibleItemConfig) };
	public static get CollectResultAlgo():CollectResultAlgoConfig{ return this.getConfig(CollectResultAlgoConfig) };
	public static get Dragon():DragonConfig{ return this.getConfig(DragonConfig) };
	public static get Elemental():ElementalConfig{ return this.getConfig(ElementalConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get Quality():QualityConfig{ return this.getConfig(QualityConfig) };
	public static get Sound():SoundConfig{ return this.getConfig(SoundConfig) };
	public static get SuccessRateAlgo():SuccessRateAlgoConfig{ return this.getConfig(SuccessRateAlgoConfig) };
}