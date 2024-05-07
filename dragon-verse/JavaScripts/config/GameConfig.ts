import {ConfigBase, IElementBase} from "./ConfigBase";
import {AnimalEcologyConfig} from "./AnimalEcology";
import {AreaConfig} from "./Area";
import {BagItemConfig} from "./BagItem";
import {CollectibleItemConfig} from "./CollectibleItem";
import {CollectResultAlgoConfig} from "./CollectResultAlgo";
import {DialogueContentNodeConfig} from "./DialogueContentNode";
import {DialogueFuncConfig} from "./DialogueFunc";
import {DialogueInteractNodeConfig} from "./DialogueInteractNode";
import {DragonHabitatConfig} from "./DragonHabitat";
import {DragonConfig} from "./Dragon";
import {ElementalConfig} from "./Elemental";
import {GlobalConfig} from "./Global";
import {IceBlockConfig} from "./IceBlock";
import {LandMarkConfig} from "./LandMark";
import {LanguageConfig} from "./Language";
import {NPCActionConfig} from "./NPCAction";
import {NpcConfig} from "./Npc";
import {ObbycheckConfig} from "./Obbycheck";
import {QualityConfig} from "./Quality";
import {RelateEntityConfig} from "./RelateEntity";
import {SceneEnvironmentConfig} from "./SceneEnvironment";
import {SceneConfig} from "./Scene";
import {SoundConfig} from "./Sound";
import {SuccessRateAlgoConfig} from "./SuccessRateAlgo";
import {TaskConfig} from "./Task";
import {TipsPlaylistConfig} from "./TipsPlaylist";

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
	public static get AnimalEcology():AnimalEcologyConfig{ return this.getConfig(AnimalEcologyConfig) };
	public static get Area():AreaConfig{ return this.getConfig(AreaConfig) };
	public static get BagItem():BagItemConfig{ return this.getConfig(BagItemConfig) };
	public static get CollectibleItem():CollectibleItemConfig{ return this.getConfig(CollectibleItemConfig) };
	public static get CollectResultAlgo():CollectResultAlgoConfig{ return this.getConfig(CollectResultAlgoConfig) };
	public static get DialogueContentNode():DialogueContentNodeConfig{ return this.getConfig(DialogueContentNodeConfig) };
	public static get DialogueFunc():DialogueFuncConfig{ return this.getConfig(DialogueFuncConfig) };
	public static get DialogueInteractNode():DialogueInteractNodeConfig{ return this.getConfig(DialogueInteractNodeConfig) };
	public static get DragonHabitat():DragonHabitatConfig{ return this.getConfig(DragonHabitatConfig) };
	public static get Dragon():DragonConfig{ return this.getConfig(DragonConfig) };
	public static get Elemental():ElementalConfig{ return this.getConfig(ElementalConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get IceBlock():IceBlockConfig{ return this.getConfig(IceBlockConfig) };
	public static get LandMark():LandMarkConfig{ return this.getConfig(LandMarkConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get NPCAction():NPCActionConfig{ return this.getConfig(NPCActionConfig) };
	public static get Npc():NpcConfig{ return this.getConfig(NpcConfig) };
	public static get Obbycheck():ObbycheckConfig{ return this.getConfig(ObbycheckConfig) };
	public static get Quality():QualityConfig{ return this.getConfig(QualityConfig) };
	public static get RelateEntity():RelateEntityConfig{ return this.getConfig(RelateEntityConfig) };
	public static get SceneEnvironment():SceneEnvironmentConfig{ return this.getConfig(SceneEnvironmentConfig) };
	public static get Scene():SceneConfig{ return this.getConfig(SceneConfig) };
	public static get Sound():SoundConfig{ return this.getConfig(SoundConfig) };
	public static get SuccessRateAlgo():SuccessRateAlgoConfig{ return this.getConfig(SuccessRateAlgoConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
	public static get TipsPlaylist():TipsPlaylistConfig{ return this.getConfig(TipsPlaylistConfig) };
}