import { BuffData, EBuffParamType } from "module_buff";
import { oTrace, oTraceError } from "odin";
import EnumAttributeType = Attribute.EnumAttributeType;
import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
import { PlayerModuleS, THurtData } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
import { EventManager } from "../../../../tool/EventManager";
import { EModule_Events_S } from "../../../../const/Enum";




// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";
/**
 * 火之法师  造成伤害时敌人持续受到灼烧效果，每秒造成攻击力5%的伤害，持续2秒  
 */
export class CauterizeBuffC extends BuffC_Base {

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("CauterizeBuffC constructor _id: ", _id, " configId: ", staticConfig.id);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("CauterizeBuffC init");
        super.init();

        // this.onTrigger.add(this.onTriggerHandler, this);
    }

    public async destroy() {
        //oTrace("CauterizeBuffC Destroy");
        //处理：触发结束直接销毁导致特效不播放
        await TimeUtil.delaySecond(2);
        super.destroy();
    }


    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

}

export class CauterizeBuffS extends BuffS_Base {
    /**玩家模块*/
    public playerModules: PlayerModuleS = null;
    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("CauterizeBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //Trace("CauterizeBuffS init");
        super.init();
        this.playerModules = ModuleService.getModule(PlayerModuleS);
        // this.sceneUnitModuleS = ModuleService.getModule(SceneUnitModuleS);
        this.onTrigger.add(this.onTriggerHandler, this);
    }


    /**
    * 销毁，清理
    */
    public async destroy() {
        //处理：触发结束直接销毁导致特效不播放
        await TimeUtil.delaySecond(2);
        //oTrace("CauterizeBuffS Destroy");
        super.destroy();
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    /**触发灼烧*/
    onTriggerHandler<BuffS>(arg: any) {
        //oTrace("onTriggerHandler========================================>>>>>>", this.buffEffectType, this.hostGuid);
        if (this.hostGuid == null) {
            oTraceError("error:onTriggerHandler uff.hostGuid == null ", this.hostGuid);
            return;
        }
        let t_pid = Number(this.hostGuid);
        if (isNaN(t_pid)) {
            oTraceError("error:onTriggerHandler sNaN(t_pid) ", this.hostGuid);
            return;
        }

        //释放者 攻击力：目前只有玩家有会灼烧技能
        if (this.castPId > 0) {
            //注意：销毁判断玩家
            let player = Player.getPlayer(this.castPId);
            if (player == null) {
                return;
            }
            if (player.character == null) {
                return;
            }
        }
        let castPlayerAttack = this.playerModules.getPlayerAttr(this.castPId, EnumAttributeType.atk);
        //伤害 加成值类型 Percent or Value
        let t_hurt = this.param1_modle == EBuffParamType.Percent ? this.param1 * castPlayerAttack * 0.01 : this.param1


        //玩家
        if (t_pid > 0) {

            //注意：销毁判断玩家
            let player = Player.getPlayer(t_pid);
            if (player == null) {
                return;
            }
            if (player.character == null) {
                return;
            }

            let hurtData: THurtData = {
                atkVal_replace: Math.round(t_hurt)
            }

            this.playerModules.test_HurtPlayerByMotion(this.castPId, t_pid, hurtData);

        }
        //怪
        else {
            //this.sceneUnitModuleS.hitSceneUnit(this.castPId, null, t_pid, Math.round(t_hurt));
            let hurtData: THurtData = {
                atkVal_replace: Math.round(t_hurt)
            }
            EventManager.instance.call(EModule_Events_S.sceneUnit_beAttack, this.castPId, [t_pid], hurtData);

        }

        //特效处理：
        if (t_pid > 0) {
            //玩家死亡 
            if (this.playerModules.getPlayerAttr(t_pid, EnumAttributeType.hp) <= 0) {
                return;
            }

        } else {

        }

        // //log
        // if (t_pid > 0) {
        //     this.playerModules.logPlayerAttr(t_pid)
        // } else {
        //     this.sceneUnitModuleS.getSceneUnitByID(t_pid).log()
        // }

    }




}





