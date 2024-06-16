import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { stringToBuff } from "../../util/uitls";
import { PlayerModuleC } from "../Player/PlayerModuleC";
import { RewardTipsManager } from "../UI/RewardTips";
import { BagTool } from "./BagTool";
import { PetBagModuleData, petItemDataNew } from "./PetBagModuleData";
import Gtk from "../../util/GToolkit";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import Log4Ts from "../../depend/log4ts/Log4Ts";

type petBuff = {
    /**伤害加成 */
    damageAdd?: number,
    /**金币加成 */
    goldAdd?: number,
    /**钻石加成 */
    diamondAdd?: number,
    /**暴击加成 */
    critAdd?: number,
    /**移动速度加成 */
    moveSpeedAdd?: number,
    /**宝箱伤害加成 */
    boxDamageAdd?: number,
    /**四级金币宝箱加成 */
    fourGoldAdd?: number,
    /**倍率资源加成金币 */
    rateGoldAdd?: number,
    /**自动收集-14 */
    autoCollect?: boolean,
    /**随机钻石-15 */
    randomDiamond?: boolean,
    /**最好朋友词条-16 */
    bestFriend?: number,

}

enum enchantType {
    /**其他 */
    other = 0,
    /**伤害加成 */
    damageAdd = 1,
    /**金币加成 */
    goldAdd = 2,
    /**钻石加成 */
    diamondAdd = 3,
    /**暴击加成 */
    critAdd = 4,
    /**移动速度加成 */
    moveSpeedAdd = 5,
    /**宝箱伤害加成 */
    boxDamageAdd = 6,
    /**四级金币宝箱加成 */
    fourGoldAdd = 7,
    /**倍率资源加成金币 */
    rateGoldAdd = 8,

}

enum specialEnchantId {
    /**王权 */
    id_43 = 43,
    /**磁铁 */
    id_44 = 44,
    /**闪闪发光 */
    id_45 = 45,
    /**最好伙伴 */
    id_46 = 46,
}

/**宠物词条buff */
export class EnchantBuff {
    /**宠物词条buff */
    private static playerPetBuff: Map<number, Map<number, petBuff>> = new Map();
    private static interval: any;

    /**装备 卸载宠物时计算 buff
     * @param keys 当前跟随的宠物keys
     * @param isEquip 是否装备
     */
    public static equipUnPet(playerId: number, keys: number[], isEquip: boolean) {
			this.clearPlayerBuff(playerId);
        const petBuff = Gtk.tryGet(
          this.playerPetBuff,
          playerId,
          () => new Map<number, petBuff>()
        );
        Log4Ts.log(
          EnchantBuff,
          "petBuff:" + JSON.stringify(Array.from(petBuff))
        );
				// 计算当前buff
				for (const key of keys) {
          let buff: petBuff = {
            damageAdd: 0,
            goldAdd: 0,
            diamondAdd: 0,
            critAdd: 0,
            moveSpeedAdd: 0,
            boxDamageAdd: 0,
            fourGoldAdd: 0,
            rateGoldAdd: 0,
            autoCollect: false,
            randomDiamond: false,
            bestFriend: 0,
          };
          let petData = DataCenterS.getData(
            playerId,
            PetBagModuleData
          ).bagItemsByKey(key);
          if (!petData || !petData.p.b || petData.p.b.length == 0) continue;
          let curBuff = stringToBuff(BagTool.getStr(petData));
          curBuff.forEach((element) => {
            this.addBuff(playerId, key, buff, {
              id: element.id,
              level: element.level,
            });
          });
          petBuff.set(key, buff);
        }
        Log4Ts.log(
          EnchantBuff,
          "after compute petBuff:" + JSON.stringify(Array.from(petBuff))
        );
    }

    /**获取宠物词条buff */
    public static getPetBuff(playerId: number, key: number): petBuff {
			const petBuff = Gtk.tryGet(this.playerPetBuff, playerId, () => new Map());
      Log4Ts.log(
        EnchantBuff,
        "getPetBuff key:" +
          key +
          " petBuff:" +
          JSON.stringify(Array.from(petBuff)) 
      );
      return Gtk.tryGet(petBuff, key, () => ({
        damageAdd: 0,
        goldAdd: 0,
        diamondAdd: 0,
        critAdd: 0,
        moveSpeedAdd: 0,
        boxDamageAdd: 0,
        fourGoldAdd: 0,
        rateGoldAdd: 0,
        autoCollect: false,
        randomDiamond: false,
        bestFriend: 0,
      }));
    }

    public static clearPlayerBuff(playerId: number) {
				Log4Ts.log(EnchantBuff, "clearPlayerBuff! ");
				this.randomDiamond(false, playerId); 
				GlobalData.SceneResource.critWeightMap.set(playerId, GlobalData.SceneResource.critWeightUndef);
        this.playerPetBuff.delete(playerId);
    }

    /** 添加词条buff*/
    private static addBuff(playerId: number, key: number, buff: petBuff, item: {
        id: number;
        level: number;
    }): petBuff {

        let speciaId = GlobalData.Enchant.specialEnchantIdRange;
        if (item.id >= speciaId[0] && item.id <= speciaId[1]) {

            if (item.id == specialEnchantId.id_43) {
                if (!buff.damageAdd) buff.damageAdd = 0;
                buff.damageAdd += 100;
                if (!buff.diamondAdd) buff.diamondAdd = 0;
                buff.diamondAdd += 100;
                if (!buff.moveSpeedAdd) buff.moveSpeedAdd = 0;
                buff.moveSpeedAdd += 50;
            }
            if (item.id == specialEnchantId.id_44) {
                if (!buff.autoCollect) buff.autoCollect = true;
                GlobalData.Enchant.petAutoBuffKeys(playerId).push(key);
            }
            if (item.id == specialEnchantId.id_45) {
                if (!buff.randomDiamond) buff.randomDiamond = true;
                this.randomDiamond(true, playerId);
            }
            if (item.id == specialEnchantId.id_46) {
                let atk = 0;
                let pets = DataCenterC.getData(PetBagModuleData).sortBag();
                let len = pets.length > 4 ? 4 : pets.length;
                for (let id = 0; id < len; id++) {
                    const element = pets[id];
                    atk += element.p.a;
                }
                if (!buff.bestFriend) buff.bestFriend = 0;
                buff.bestFriend += atk / len * 1.5;
            }

            return buff;
        }

        let cfg = GameConfig.Enchants.getElement(item.id);
        switch (cfg.EnchantType) {
            case enchantType.damageAdd:
                buff.damageAdd = this.addDamageAdd(buff.damageAdd, item);
                break;
            case enchantType.goldAdd:
                buff.goldAdd = this.addGoldAdd(buff.goldAdd, item);
                break;
            case enchantType.diamondAdd:
                buff.diamondAdd = this.addDiamondAdd(buff.diamondAdd, item);
                break;
            case enchantType.critAdd:
                buff.critAdd = this.addCritAdd(playerId, buff.critAdd, item);
                break;
            case enchantType.moveSpeedAdd:
                buff.moveSpeedAdd = this.addMoveSpeedAdd(buff.moveSpeedAdd, item);
                break;
            case enchantType.boxDamageAdd:
                buff.boxDamageAdd = this.addBoxDamageAdd(buff.boxDamageAdd, item);
                break;
            case enchantType.fourGoldAdd:
                buff.fourGoldAdd = this.addFourGoldAdd(buff.fourGoldAdd, item);
                break;
            case enchantType.rateGoldAdd:
                buff.rateGoldAdd = this.addRateGoldAdd(buff.rateGoldAdd, item);
                break;
            default:
                break;
        }
        return buff;
    }

    public static getAtk(pets: petItemDataNew[]): number {
        //计算前四个最强战力
        let atks: number[] = [];

        for (let i = 0; i < pets.length; i++) {
            const element = pets[i];
            if (GlobalData.Enchant.bestPets.includes(element.I)) continue;
            let atk = element.p.a;
            if (atks.length < 4) {
                if (isNaN(atk)) {
                    atk = 0;
                }
                atks.push(atk);
            } else {
                let min = Math.min.apply(null, atks);
                if (min < atk) {
                    let index = atks.indexOf(min);
                    atks[index] = atk;
                }
            }
        }

        let atk = 0;
        atks.forEach(element => {
            atk += element;
        });
        if (atks.length == 0) return 0;
        return atk / atks.length * 1.5;
    }

    /**移除词条buff 准备干掉*/
    private static delBuff(playerId: number, key: number, buff: petBuff) {
        if (buff.damageAdd) buff.damageAdd = 0;
        if (buff.goldAdd) buff.goldAdd = 0;
        if (buff.diamondAdd) buff.diamondAdd = 0;
        if (buff.critAdd) {
            GlobalData.SceneResource.critWeightMap.set(playerId, GlobalData.SceneResource.critWeightUndef);
            buff.critAdd = 0;
        }
        if (buff.moveSpeedAdd) buff.moveSpeedAdd = 0;
        if (buff.boxDamageAdd) buff.boxDamageAdd = 0;
        if (buff.fourGoldAdd) buff.fourGoldAdd = 0;
        if (buff.rateGoldAdd) buff.rateGoldAdd = 0;
        if (buff.autoCollect) {
            buff.autoCollect = false;
            let index = GlobalData.Enchant.petAutoBuffKeys(playerId).indexOf(key);
            if (index != -1) GlobalData.Enchant.petAutoBuffKeys(playerId).splice(index, 1);
        }
        if (buff.randomDiamond) {
            buff.randomDiamond = false;
            this.randomDiamond(false, playerId);
        }
        if (buff.bestFriend) buff.bestFriend = 0;
    }

    /**随机加钻石 */
    private static randomDiamond(isOpen: boolean, playerId: number) {
			Log4Ts.log(EnchantBuff, "randomDiamond isOpen:" + isOpen);
      if (!isOpen) {
        if (this.interval) {
          TimeUtil.clearInterval(this.interval);
          this.interval = null;
          Log4Ts.log(EnchantBuff, "randomDiamond interval clear");
        }
        return;
      }
      if (this.interval) {
        TimeUtil.clearInterval(this.interval);
        this.interval = null;
      }
      const data = GlobalData.Enchant;
      let time = MathUtil.randomInt(
        data.randomDiamondInterval[0],
        data.randomDiamondInterval[1] + 1
      );

      this.interval = TimeUtil.setInterval(async () => {
        const count = await ModuleService.getModule(
          PlayerModuleS
        ).randomDiamond(playerId);
        Log4Ts.log(EnchantBuff, "randomDiamond count:" + count);
        const player = Player.getPlayer(playerId);
        mw.Event.dispatchToClient(
          player,
          RewardTipsManager.EVENT_NAME_REWARD_TIPS_GET_UI,
          GlobalEnum.CoinType.Diamond,
          count
        );
      }, time);
    }

    /**伤害加成 */
    private static addDamageAdd(damageAdd: number, item: { id: number; level: number; }): number {
        if (!damageAdd) damageAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        damageAdd += cfg.Degree;
        return damageAdd;
    }

    /**金币加成 */
    private static addGoldAdd(goldAdd: number, item: { id: number; level: number; }): number {
        if (!goldAdd) goldAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        goldAdd += cfg.Degree;
        return goldAdd;
    }

    /**钻石加成 */
    private static addDiamondAdd(diamondAdd: number, item: { id: number; level: number; }): number {
        if (!diamondAdd) diamondAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        diamondAdd += cfg.Degree;
        return diamondAdd;
    }

    /**暴击加成 */
    private static addCritAdd(playerId: number, critAdd: number, item: { id: number; level: number; }): number {
        if (!critAdd) critAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        critAdd += cfg.Degree;
        GlobalData.SceneResource.critWeightMap.set(playerId, GlobalData.SceneResource.critWeight(playerId) * (1 + critAdd / 100));
        return critAdd;
    }

    /**移动速度加成 */
    private static addMoveSpeedAdd(moveSpeedAdd: number, item: { id: number; level: number; }): number {
        if (!moveSpeedAdd) moveSpeedAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        moveSpeedAdd += cfg.Degree;
        return moveSpeedAdd;
    }

    /**宝箱伤害加成 */
    private static addBoxDamageAdd(boxDamageAdd: number, item: { id: number; level: number; }): number {
        if (!boxDamageAdd) boxDamageAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        boxDamageAdd += cfg.Degree;
        return boxDamageAdd;
    }

    /**四级金币宝箱加成 */
    private static addFourGoldAdd(fourGoldAdd: number, item: { id: number; level: number; }): number {
        if (!fourGoldAdd) fourGoldAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        fourGoldAdd += cfg.Degree;
        return fourGoldAdd;
    }

    /**倍率资源加成金币 */
    private static addRateGoldAdd(rateGoldAdd: number, item: { id: number; level: number; }): number {
        if (!rateGoldAdd) rateGoldAdd = 0;
        let cfg = GameConfig.Enchants.getElement(item.id);
        rateGoldAdd += cfg.Degree;
        return rateGoldAdd;
    }

}