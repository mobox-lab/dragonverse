import {ConfigBase, IElementBase} from "./ConfigBase";
import {AchievementsConfig} from "./Achievements";
import {AreaDivideConfig} from "./AreaDivide";
import {AreaWorldConfig} from "./AreaWorld";
import {AssetsConfig} from "./Assets";
import {AvatarConfig} from "./Avatar";
import {BuffDragonAbilityConfig} from "./BuffDragonAbility";
import {BuffConfig} from "./Buff";
import {CoindownConfig} from "./Coindown";
import {CoinsConfig} from "./Coins";
import {DollMachineConfig} from "./DollMachine";
import {DollConfig} from "./Doll";
import {DropPointConfig} from "./DropPoint";
import {EffectConfig} from "./Effect";
import {EggMachineConfig} from "./EggMachine";
import {EnchantsConfig} from "./Enchants";
import {GoodsTableConfig} from "./GoodsTable";
import {GradientConfig} from "./Gradient";
import {LanguageConfig} from "./Language";
import {MusicConfig} from "./Music";
import {PetARRConfig} from "./PetARR";
import {PetV1Config} from "./PetV1";
import {PetVariantConfig} from "./PetVariant";
import {SceneUnitConfig} from "./SceneUnit";
import {ShopConfig} from "./Shop";
import {TaskShopConfig} from "./TaskShop";
import {TaskConfig} from "./Task";
import {TextConfig} from "./Text";
import {TimeRewardConfig} from "./TimeReward";
import {UpgradeConfig} from "./Upgrade";
import {VIPLV111111111Config} from "./VIPLV111111111";
import {VIPLVConfig} from "./VIPLV";
import {VIPTaskConfig} from "./VIPTask";

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
	public static get Achievements():AchievementsConfig{ return this.getConfig(AchievementsConfig) };
	public static get AreaDivide():AreaDivideConfig{ return this.getConfig(AreaDivideConfig) };
	public static get AreaWorld():AreaWorldConfig{ return this.getConfig(AreaWorldConfig) };
	public static get Assets():AssetsConfig{ return this.getConfig(AssetsConfig) };
	public static get Avatar():AvatarConfig{ return this.getConfig(AvatarConfig) };
	public static get BuffDragonAbility():BuffDragonAbilityConfig{ return this.getConfig(BuffDragonAbilityConfig) };
	public static get Buff():BuffConfig{ return this.getConfig(BuffConfig) };
	public static get Coindown():CoindownConfig{ return this.getConfig(CoindownConfig) };
	public static get Coins():CoinsConfig{ return this.getConfig(CoinsConfig) };
	public static get DollMachine():DollMachineConfig{ return this.getConfig(DollMachineConfig) };
	public static get Doll():DollConfig{ return this.getConfig(DollConfig) };
	public static get DropPoint():DropPointConfig{ return this.getConfig(DropPointConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get EggMachine():EggMachineConfig{ return this.getConfig(EggMachineConfig) };
	public static get Enchants():EnchantsConfig{ return this.getConfig(EnchantsConfig) };
	public static get GoodsTable():GoodsTableConfig{ return this.getConfig(GoodsTableConfig) };
	public static get Gradient():GradientConfig{ return this.getConfig(GradientConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get Music():MusicConfig{ return this.getConfig(MusicConfig) };
	public static get PetARR():PetARRConfig{ return this.getConfig(PetARRConfig) };
	public static get PetV1():PetV1Config{ return this.getConfig(PetV1Config) };
	public static get PetVariant():PetVariantConfig{ return this.getConfig(PetVariantConfig) };
	public static get SceneUnit():SceneUnitConfig{ return this.getConfig(SceneUnitConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get TaskShop():TaskShopConfig{ return this.getConfig(TaskShopConfig) };
	public static get Task():TaskConfig{ return this.getConfig(TaskConfig) };
	public static get Text():TextConfig{ return this.getConfig(TextConfig) };
	public static get TimeReward():TimeRewardConfig{ return this.getConfig(TimeRewardConfig) };
	public static get Upgrade():UpgradeConfig{ return this.getConfig(UpgradeConfig) };
	public static get VIPLV111111111():VIPLV111111111Config{ return this.getConfig(VIPLV111111111Config) };
	public static get VIPLV():VIPLVConfig{ return this.getConfig(VIPLVConfig) };
	public static get VIPTask():VIPTaskConfig{ return this.getConfig(VIPTaskConfig) };
}