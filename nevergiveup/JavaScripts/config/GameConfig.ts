import {ConfigBase, IElementBase} from "./ConfigBase";
import {AirdropConfig} from "./Airdrop";
import {BuffConfig} from "./Buff";
import {DragonConfig} from "./Dragon";
import {GlobalConfig} from "./Global";
import {ItemConfig} from "./Item";
import {LanguageConfig} from "./Language";
import {LevelConfig} from "./Level";
import {LevelEffectConfig} from "./LevelEffect";
import {MonsterConfig} from "./Monster";
import {SceneEnvironmentConfig} from "./SceneEnvironment";
import {StageConfig} from "./Stage";
import {SubLevelConfig} from "./SubLevel";
import {TagConfig} from "./Tag";
import {TalentBuffConfig} from "./TalentBuff";
import {TalentTreeConfig} from "./TalentTree";
import {TaskConfig} from "./Task";
import {TechTreeConfig} from "./TechTree";
import {TowerConfig} from "./Tower";
import {VoiceConfig} from "./Voice";
import {WaveConfig} from "./Wave";

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
	public static get Airdrop():AirdropConfig{ return this.getConfig(AirdropConfig) };
	public static get Buff():BuffConfig{ return this.getConfig(BuffConfig) };
	public static get Dragon():DragonConfig{ return this.getConfig(DragonConfig) };
	public static get Global():GlobalConfig{ return this.getConfig(GlobalConfig) };
	public static get Item():ItemConfig{ return this.getConfig(ItemConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get Level():LevelConfig{ return this.getConfig(LevelConfig) };
	public static get LevelEffect():LevelEffectConfig{ return this.getConfig(LevelEffectConfig) };
	public static get Monster():MonsterConfig{ return this.getConfig(MonsterConfig) };
	public static get SceneEnvironment():SceneEnvironmentConfig{ return this.getConfig(SceneEnvironmentConfig) };
	public static get Stage():StageConfig{ return this.getConfig(StageConfig) };
	public static get SubLevel():SubLevelConfig{ return this.getConfig(SubLevelConfig) };
	public static get Tag():TagConfig{ return this.getConfig(TagConfig) };
	public static get TalentBuff():TalentBuffConfig{ return this.getConfig(TalentBuffConfig) };
	public static get TalentTree():TalentTreeConfig{ return this.getConfig(TalentTreeConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
	public static get TechTree():TechTreeConfig{ return this.getConfig(TechTreeConfig) };
	public static get Tower():TowerConfig{ return this.getConfig(TowerConfig) };
	public static get Voice():VoiceConfig{ return this.getConfig(VoiceConfig) };
	public static get Wave():WaveConfig{ return this.getConfig(WaveConfig) };
}