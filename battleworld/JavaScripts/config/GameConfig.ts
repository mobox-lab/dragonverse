import {ConfigBase, IElementBase} from "./ConfigBase";
import {ActionConfig} from "./Action";
import {AppearancePendantConfig} from "./AppearancePendant";
import {AppearanceConfig} from "./Appearance";
import {AreaConfig} from "./Area";
import {BuffConfig} from "./Buff";
import {BulletConfig} from "./Bullet";
import {BulletBombConfig} from "./BulletBomb";
import {CameraShakeConfig} from "./CameraShake";
import {EffectConfig} from "./Effect";
import {EquipConfig} from "./Equip";
import {InitialAttrConfig} from "./InitialAttr";
import {ItemConsumeConfig} from "./ItemConsume";
import {ItemTransferConfig} from "./ItemTransfer";
import {KillTipConfig} from "./KillTip";
import {LandBuffConfig} from "./LandBuff";
import {LandParcelConfig} from "./LandParcel";
import {LandRunConfig} from "./LandRun";
import {LanguageConfig} from "./Language";
import {MascotNpcConfig} from "./MascotNpc";
import {MotionBtnDataConfig} from "./MotionBtnData";
import {MotionBtnConfig} from "./MotionBtn";
import {MotionClipConfig} from "./MotionClip";
import {MotionEffectConfig} from "./MotionEffect";
import {MotionSkillConfig} from "./MotionSkill";
import {movepositionConfig} from "./moveposition";
import {MultipleKillConfig} from "./MultipleKill";
import {NpcDialogConfig} from "./NpcDialog";
import {PropDropConfig} from "./PropDrop";
import {RankConfig} from "./Rank";
import {ShopConfig} from "./Shop";
import {SkillLibConfig} from "./SkillLib";
import {SoundConfig} from "./Sound";
import {TabTalkConfig} from "./TabTalk";
import {WeaponTriggerConfig} from "./WeaponTrigger";
import {WeaponConfig} from "./Weapon";

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
	public static get Action():ActionConfig{ return this.getConfig(ActionConfig) };
	public static get AppearancePendant():AppearancePendantConfig{ return this.getConfig(AppearancePendantConfig) };
	public static get Appearance():AppearanceConfig{ return this.getConfig(AppearanceConfig) };
	public static get Area():AreaConfig{ return this.getConfig(AreaConfig) };
	public static get Buff():BuffConfig{ return this.getConfig(BuffConfig) };
	public static get Bullet():BulletConfig{ return this.getConfig(BulletConfig) };
	public static get BulletBomb():BulletBombConfig{ return this.getConfig(BulletBombConfig) };
	public static get CameraShake():CameraShakeConfig{ return this.getConfig(CameraShakeConfig) };
	public static get Effect():EffectConfig{ return this.getConfig(EffectConfig) };
	public static get Equip():EquipConfig{ return this.getConfig(EquipConfig) };
	public static get InitialAttr():InitialAttrConfig{ return this.getConfig(InitialAttrConfig) };
	public static get ItemConsume():ItemConsumeConfig{ return this.getConfig(ItemConsumeConfig) };
	public static get ItemTransfer():ItemTransferConfig{ return this.getConfig(ItemTransferConfig) };
	public static get KillTip():KillTipConfig{ return this.getConfig(KillTipConfig) };
	public static get LandBuff():LandBuffConfig{ return this.getConfig(LandBuffConfig) };
	public static get LandParcel():LandParcelConfig{ return this.getConfig(LandParcelConfig) };
	public static get LandRun():LandRunConfig{ return this.getConfig(LandRunConfig) };
	public static get Language():LanguageConfig{ return this.getConfig(LanguageConfig) };
	public static get MascotNpc():MascotNpcConfig{ return this.getConfig(MascotNpcConfig) };
	public static get MotionBtnData():MotionBtnDataConfig{ return this.getConfig(MotionBtnDataConfig) };
	public static get MotionBtn():MotionBtnConfig{ return this.getConfig(MotionBtnConfig) };
	public static get MotionClip():MotionClipConfig{ return this.getConfig(MotionClipConfig) };
	public static get MotionEffect():MotionEffectConfig{ return this.getConfig(MotionEffectConfig) };
	public static get MotionSkill():MotionSkillConfig{ return this.getConfig(MotionSkillConfig) };
	public static get moveposition():movepositionConfig{ return this.getConfig(movepositionConfig) };
	public static get MultipleKill():MultipleKillConfig{ return this.getConfig(MultipleKillConfig) };
	public static get NpcDialog():NpcDialogConfig{ return this.getConfig(NpcDialogConfig) };
	public static get PropDrop():PropDropConfig{ return this.getConfig(PropDropConfig) };
	public static get Rank():RankConfig{ return this.getConfig(RankConfig) };
	public static get Shop():ShopConfig{ return this.getConfig(ShopConfig) };
	public static get SkillLib():SkillLibConfig{ return this.getConfig(SkillLibConfig) };
	public static get Sound():SoundConfig{ return this.getConfig(SoundConfig) };
	public static get TabTalk():TabTalkConfig{ return this.getConfig(TabTalkConfig) };
	public static get WeaponTrigger():WeaponTriggerConfig{ return this.getConfig(WeaponTriggerConfig) };
	public static get Weapon():WeaponConfig{ return this.getConfig(WeaponConfig) };
}