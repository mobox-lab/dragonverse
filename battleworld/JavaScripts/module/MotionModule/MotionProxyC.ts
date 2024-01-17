import { GameConfig } from "../../config/GameConfig";
import { Globaldata } from "../../const/Globaldata";
import { util } from "../../tool/Utils";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { WeaponModuleData } from "../WeaponModule/WeaponModuleData";

/**
 * 动效播放代理
 */
export class MotionProxyC {

    private mAttr: AttributeModuleC = null;

    private pId: number = 0;

    /**延时器key */
    private finalSkillKey: any = null;


    constructor(pId: number) {
        this.pId = pId;

        this.mAttr = ModuleService.getModule(AttributeModuleC);


    }

    /**释放大招 */
    public releaseFinalSkill() {

        this.clear_finalSkillKey();

        this.finalSkillKey = TimeUtil.setInterval(() => {
            if (this.mAttr == null) {
                return;
            }
            let curAngerValue = this.mAttr.getAttributeValue(Attribute.EnumAttributeType.angerValue, this.pId);
            if (curAngerValue <= 0) {
                //ToDO  服务器设置后 为啥不会同步 需要排查下
                //EventManager.instance.call(EAttributeEvents_C.Attribute_SetAttribute_C, Attribute.EnumAttributeType.gasExplosion, 0, this.pId, true);
                this.clear_finalSkillKey();
                return;
            }
            let weaponData = DataCenterC.getData(WeaponModuleData);
            let weaponCfg = GameConfig.Weapon.getElement(weaponData.getEquipWeaponId());
            if (weaponCfg == null) {
                this.clear_finalSkillKey();
                return;
            }
            let endValue = curAngerValue - weaponCfg.cutBackValue;
            endValue = MathUtil.clamp(endValue, 0, endValue);
            this.mAttr.setAttrValue(Attribute.EnumAttributeType.angerValue, endValue, this.pId, true);

        }, Globaldata.anger_cutBackInterval);
    }


    public clear_finalSkillKey() {
        if (this.finalSkillKey) {
            TimeUtil.clearInterval(this.finalSkillKey);
            this.finalSkillKey = null;
        }
    }


    private releaseEffectIds: number[] = [];
    /**
     * 刷新玩家爆气状态
     * @param state 爆气状态    0:无爆气状态  1:爆气状态
     */
    public refresh_gasExplosion(state: number) {


        if (state == 0) {

            this.clear_effect();

            return;
        }

        let player = mw.Player.getPlayer(this.pId);
        if (player == null) {
            return;
        }
        if (player.character == null) {
            return;
        }

        let weaponId = this.mAttr.getAttributeValue(Attribute.EnumAttributeType.weaponId, this.pId);

        let weaponCfg = GameConfig.Weapon.getElement(weaponId);
        if (weaponCfg == null) {
            return;
        }

        for (let index = 0; index < weaponCfg.angerEffectId.length; index++) {
            const effectId = weaponCfg.angerEffectId[index];

            let releaseEffectId = util.playEffectByConfig(effectId, player.character);
            this.releaseEffectIds.push(releaseEffectId);

        }

    }


    private clear_effect() {
        if (this.releaseEffectIds.length != 0) {
            for (let index = 0; index < this.releaseEffectIds.length; index++) {
                const releaseEffectId = this.releaseEffectIds[index];
                EffectService.stop(releaseEffectId);
            }

            this.releaseEffectIds.length = 0;
        }
    }

    public onDestroy() {
        this.clear_effect();
    }

}