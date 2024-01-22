import { GameConfig } from "../../config/GameConfig";
import { EAreaId, EAttributeEvents_S } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { TimerTool } from "../../tool/TimerTool";
import { util } from "../../tool/Utils";
import { AttributeModuleS } from "../AttributeModule/AttributeModuleS";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { WeaponModuleData } from "../WeaponModule/WeaponModuleData";

/**
 * 动效播放代理
 */
export class MotionProxyS {

    private mAttr: AttributeModuleS = null;
    private mPlayer: PlayerModuleS = null;

    private pId: number = 0;


    // 技能释放缓存
    private skillReleaseCache: Map<number, number> = new Map();

    /**延时器key */
    private finalSkillKey: any = null;

    /**定时器key */
    private angerAddKey: any = null;

    private isReleaseFinalSkill: boolean = false;

    constructor(pId: number) {
        this.pId = pId;

        this.mAttr = ModuleService.getModule(AttributeModuleS);
        this.mPlayer = ModuleService.getModule(PlayerModuleS);

        this.start_recoverAnger();
    }

    public isInCD(skillId: number) {
        // 记录cd
        let skillCfg = GameConfig.MotionSkill.getElement(skillId);
        if (skillCfg == null) {
            return false;
        }
        if (this.skillReleaseCache.has(skillId) == false) {
            this.skillReleaseCache.set(skillId, Date.now());
            return false;
        }

        // 距离上次释放技能的时间
        let preReleaseTime = this.skillReleaseCache.get(skillId);
        let calTime = Date.now() - preReleaseTime;
        // 如果再次释放技能时间比cd时间的冷却一半要高 代表数据没问题
        if (calTime > skillCfg.cd * 1000) {
            return false;
        }

        return true;
    }

    /**开始恢复玩家怒气值 */
    private start_recoverAnger() {
        this.clear_recoverAnger();
        this.angerAddKey = TimeUtil.setInterval(() => {
            // 如果正在释放大招 ，则不增加怒气值
            if (this.isReleaseFinalSkill) {
                return;
            }
            if (this.mPlayer.isDead(this.pId)) {
                return;
            }
            // 如果玩家没在战斗区域不增加怒气值
            let areaId = this.mAttr.getAttrValue(this.pId, Attribute.EnumAttributeType.areaId);
            if (areaId != EAreaId.Battle) {
                return;
            }
            let maxAngerValue = this.mAttr.getAttrValue(this.pId, Attribute.EnumAttributeType.maxAngerValue);
            let curAngerValue = this.mAttr.getAttrValue(this.pId, Attribute.EnumAttributeType.angerValue);
            if (curAngerValue >= maxAngerValue) {
                return;
            }
            this.mAttr.calculateAttrValue(this.pId, Attribute.EnumAttributeType.angerValue, Globaldata.anger_addValue);

        }, Globaldata.anger_addValueInterval);
    }

    private clear_recoverAnger() {
        if (this.angerAddKey) {
            TimeUtil.clearInterval(this.angerAddKey);
            this.angerAddKey = null;
        }
    }

    /**释放大招 */
    public releaseFinalSkill() {
        this.clear_finalSkillKey();

        // 根据当前衰减值计算出最后会减完的时间
        let curAngerValue = this.mAttr.getAttrValue(this.pId, Attribute.EnumAttributeType.angerValue);
        if (curAngerValue <= 0) {
            return;
        }

        let weaponData = DataCenterS.getData(this.pId, WeaponModuleData);
        let weaponCfg = GameConfig.Weapon.getElement(weaponData.getEquipWeaponId());
        if (weaponCfg == null) {
            return;
        }

        this.isReleaseFinalSkill = true;


        let timePer = 1 / Globaldata.anger_cutBackInterval;
        let canCutTime = curAngerValue / (weaponCfg.cutBackValue * timePer);

        EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.pId, Attribute.EnumAttributeType.gasExplosion, 1);

        this.finalSkillKey = TimerTool.setTimeout(() => {
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.pId, Attribute.EnumAttributeType.angerValue, 0);
            EventManager.instance.call(EAttributeEvents_S.attr_change_s, this.pId, Attribute.EnumAttributeType.gasExplosion, 0);
            // 削减结束，玩家可以继续增加怒气了
            this.isReleaseFinalSkill = false;
            this.finalSkillKey = null;


        }, canCutTime * 1000);

    }


    public clear_finalSkillKey() {
        if (this.finalSkillKey) {
            TimerTool.clearTimeout(this.finalSkillKey);
            this.finalSkillKey = null;
        }
    }

    /**是否爆气状态 */
    public isExplosiveGas() {
        return this.isReleaseFinalSkill;
    }

    public onDestroy() {
        this.clear_finalSkillKey();

        this.clear_recoverAnger();
    }

}