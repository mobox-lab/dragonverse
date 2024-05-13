import { IEffectElement } from "../../config/Effect";
import { GameConfig } from "../../config/GameConfig";
import { EAnalyticsEvents, EModule_Events, EPickUpType } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { Notice } from "../../tool/Notice";
import { util } from "../../tool/Utils";
import { AnalyticsTool, ECoreStep, EFirstDo, ELootType } from "../AnalyticsModule/AnalyticsTool";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { EnumDamageType } from "../PlayerModule/PlayerModuleData";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import ShowHiddenLand from "./Land/ShowHiddenLand";
import TriggerLand from "./Land/TriggerLand";
import { LandModuleS, LandParce } from "./LandModuleS";
import IPickUpInfo from "./PickUp/IPickUpInfo";
import PickUp from "./PickUp/PickUp";
import PickUpBase from "./PickUp/PickUpBase";
import PickUpDressUp from "./PickUp/PickUpDressUp";
import PickUpHp from "./PickUp/PickUpHp";
import PickUpMoney from "./PickUp/PickUpMoney";
import PickUpPill from "./PickUp/PickUpPill";
import PickUpSkill from "./PickUp/PickUpSkill";

/**
 * 关卡模块 C
 * 1.拾取物 pickup （属性同步脚本，同步流程，同步随机技能球6个，血包3个，金钱3个）
 * 2.地形运动 && buff 
 */
export class LandModuleC extends ModuleC<LandModuleS, null> {

    /**玩家模块*/
    private playerModuleC: PlayerModuleC = null;

    /**地形*/
    public landParcess: LandParce[] = [];

    /**随机地形位置 减少new */
    private randomLandPos: mw.Vector = mw.Vector.zero;

    protected onStart(): void {
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        EventManager.instance.add(EModule_Events.land_pickUp, this.listen_pickUp.bind(this));
        this.initLandParces();
    }

    /**
     * 初始化地形
     */
    private async initLandParces() {

        let cfgs = GameConfig.LandParcel.getAllElement();

        for (let index = 0; index < cfgs.length; index++) {
            const element = cfgs[index];
            let obj = await GameObject.asyncFindGameObjectById(element.Guid);
            if (obj == null) {
                console.error("initLandParces go == null");
            }
            this.landParcess.push({
                cfgId: element.Id, obj: obj,
                BloodSwitch: element.BloodSwitch == 1,
                SkillSwitch: element.SkillSwitch == 1,
                GoldSwitch: element.GoldSwitch == 1,
                RunSwitch: element.RunSwitch == 1,
                BuffSwitch: element.BuffSwitch == 1,
                PortalSwitch: element.PortalSwitch == 1,
                LowPillSwitch: element.LowPillSwitch == 1,
                Destroy: element.Destroy == 1,
                Trans: element.Trans == 1
            });
        }
    }



    /**
     * 拾取掉落物
     */
    // TODO: CL - 服务端验证金币
    private listen_pickUp(pickUpType: EPickUpType, pickUp: PickUpBase, pickScript: PickUp) {

        if (pickUp == null) {
            return;
        }

        let value = null;
        let pickUpInfo: IPickUpInfo = null;
        switch (pickUpType) {
            case EPickUpType.skill:
                {
                    value = -1;

                    // 埋点
                    //AnalyticsTool.send_ts_coregameplay_step(ECoreStep.pickUpSkillBall);
                    EventManager.instance.call(EAnalyticsEvents.coreStep, ECoreStep.pickUpSkillBall);
                    EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.box1);

                    // 埋点
                    AnalyticsTool.send_ts_action_pick(ELootType.skillBox);
                }
                break;
            case EPickUpType.hp:
                {
                    value = (pickUp as PickUpHp).hpPercent;

                    console.log('hpPercent: ', value);

                    if (value == null || value == undefined || isNaN(value)) { // TODO待排查原因
                        return;
                    }

                    let addvalue = 0;
                    let maxHp = this.playerModuleC.getAttr(Attribute.EnumAttributeType.maxHp);
                    addvalue = maxHp * value * 0.01;

                    this.playerModuleC.scene_unit_injured([this.localPlayerId],
                        [{
                            from: this.localPlayerId,
                            target: this.localPlayerId,
                            value: -addvalue,
                            type: EnumDamageType.normal
                        }],
                        Globaldata.land_pickUp_hp_offect
                    )

                    // 埋点
                    EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.box2);
                    // 埋点
                    AnalyticsTool.send_ts_action_pick(ELootType.pickHp);
                }
                break;
            case EPickUpType.money:
                {
                    value = (pickUp as PickUpMoney).money;
                    // 埋点
                    //AnalyticsTool.send_ts_coregameplay_step(ECoreStep.pickUpMoney);
                    EventManager.instance.call(EAnalyticsEvents.coreStep, ECoreStep.pickUpMoney);

                    // 埋点
                    EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.box3);

                    // 埋点
                    AnalyticsTool.send_ts_action_pick(ELootType.pickMoney);
                }
                break;
            case EPickUpType.attribute:
                {
                    let pickUpPill = pickUp as PickUpPill;
                    let pillInfo = pickUpPill.getPillInfo();
                    console.log("pillInfo: ", JSON.stringify(pillInfo));
                    value = pickUpPill.attributeValue;
                    pickUpInfo = pillInfo;
                    EventManager.instance.call(EModule_Events.land_pickUp_pill, pillInfo);
                    //104: 攻击加成    103: 减伤加成    102: 最大生命值加成    107: 最大能量值加成
                    // console.error(`rkc--------------属性加成：${attributeID}   ${value}`);

                    // 埋点
                    //AnalyticsTool.send_ts_coregameplay_step(ECoreStep.pickUpBuff);
                    EventManager.instance.call(EAnalyticsEvents.coreStep, ECoreStep.pickUpBuff);
                    switch (pillInfo.attributeID) {
                        case Attribute.EnumAttributeType.atkAdd:
                            // 埋点
                            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.box4);
                            // 埋点
                            AnalyticsTool.send_ts_action_pick(ELootType.pickPillAttack);
                            break;
                        case Attribute.EnumAttributeType.maxHpAdd:
                            // 埋点
                            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.box5);
                            // 埋点
                            AnalyticsTool.send_ts_action_pick(ELootType.pickPillHP);
                            break;
                        case Attribute.EnumAttributeType.defMultiple:
                            // 埋点
                            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.box6);
                            // 埋点
                            AnalyticsTool.send_ts_action_pick(ELootType.pickPillDef);
                            break;
                        default:
                            break;
                    }
                }
                break;
            case EPickUpType.dressUp:
                {
                    value = -1;
                    let pickUpDressUp = pickUp as PickUpDressUp;
                    let dressUpInfo = pickUpDressUp.getDressUpInfo();
                    pickUpInfo = dressUpInfo;
                    //替换技能
                    EventManager.instance.call(EModule_Events.land_pickUp_dressUp, dressUpInfo);
                }
                break;
            default:
                break;
        }
        if (value == null || value == undefined || isNaN(value)) { // TODO待排查原因
            return;
        }


        this.server.net_pickUp(pickScript.guid, pickUpType, value, pickUpInfo);
    }

    /**
     * 失去一个属性丹
     * @param attributeID 属性
     */
    public net_pillExipred(attributeID: number) {
        EventManager.instance.call(EModule_Events.land_lose_pill, attributeID);
    }


    /**
     * 刷新提示
     */
    public net_showTips(tipType: number) {

        switch (tipType) {
            case 1:
                {
                    Notice.showDownNotice(util.getLanguageByKey("LandParces_1"));
                }
                break;
            case 2:
                {
                    Notice.showDownNotice(util.getLanguageByKey("LandParces_2"));
                }
                break;
            default:
                break;
        }

    }

    /**
     * 获取随机地形位置
     */
    public async getrandomPostion(): Promise<Vector> {
        let cfgs = GameConfig.LandParcel.getAllElement().filter((value) => { return value.PortalSwitch == 1 });
        //透明 && buff 不传送
        let cfgids: number[] = cfgs.map((value) => { return value.Id })
            .filter((value) => { return !TriggerLand.landIds.includes(value) })
            .filter((value) => { return !ShowHiddenLand.landIds.includes(value) });

        let randomIndex = MathUtil.randomInt(0, cfgids.length);
        if (cfgids.length <= 0) {
            randomIndex = 1;
        }

        let guid = GameConfig.LandParcel.getElement(cfgids[randomIndex]).Guid;
        let objfind: GameObject = this.landParcess.find((value) => { return value?.obj?.gameObjectId == guid })?.obj;
        if (!objfind) {
            objfind = await GameObject.asyncFindGameObjectById(guid);
        }

        // 减少new对象
        let objPos = objfind.worldTransform.position;
        this.randomLandPos.x = objPos.x;
        this.randomLandPos.y = objPos.y;
        this.randomLandPos.z = objPos.z;

        this.randomLandPos.z += objfind.getBoundingBoxExtent().z;
        this.randomLandPos.z += Player.localPlayer.character.collisionExtent.z;

        return this, this.randomLandPos;
        // return objfind.worldTransform.position.clone().add(new Vector(0, 0, objfind.getBoundingBoxExtent().z))
        //     .add(new Vector(0, 0, Player.localPlayer.character.collisionExtent.z));
    }


    //*********************************************************测试gm************************************************************ */

    /**
     * 编辑器BUG: 
     * 父类有旋转，子节点服务器调用物体坐标时候，物体会抖动一下产生偏移 
     */
    public gm_loglandPos(id: number) {
        let guid = GameConfig.LandParcel.getElement(id).Guid;
        let obj = GameObject.findGameObjectById(guid);
        console.log("gm_loglandPos=======C", obj.worldTransform.position.clone());
    }

}
