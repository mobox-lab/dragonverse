import { BuffData, EBuffParamType } from "module_buff";
import { oTrace, oTraceError } from "odin";
import EnumAttributeType = Attribute.EnumAttributeType;
import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";
import { PlayerModuleS } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
import { EventManager } from "../../../../tool/EventManager";
import { EModule_Events_S } from "../../../../const/Enum";




// import { ISceneUnitBase } from "../../../SceneUnitModule/model/ISceneUnitBase";
import { EnumDamageType } from "../../../PlayerModule/PlayerModuleData";
/**
 * 触发回血-直接就是受到buff的人  配一个触发次数和间隔 然后每秒恢复百分比配的数值的生命值就行 
 */
export class HPTriggerBuffC extends BuffC_Base {

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

export class HPTriggerBuffS extends BuffS_Base {
    /**玩家模块*/
    public playerModules: PlayerModuleS = null;
    /**怪模块*/
    // public sceneUnitModuleS: SceneUnitModuleS = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("CauterizeBuffS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("CauterizeBuffS init");
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


        let maxHp = this.playerModules.getPlayerAttr(t_pid, EnumAttributeType.maxHp);
        //加成值类型 Percent or Value
        let t_hurt = this.param1_modle == EBuffParamType.Percent ? this.param1 * maxHp * 0.01 : this.param1

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

            this.playerModules.addPlayerAttr(t_pid, EnumAttributeType.hp, Math.round(t_hurt));
            this.playerModules.dispatchSceneUnitInjure(t_pid, [{ from: t_pid, target: t_pid, value: -Math.round(t_hurt), type: EnumDamageType.normal }], [t_pid])
            //oTraceError("buff_changeAttr======playerModulesaddPlayerAttr=====>>>>", t_pid, this.param1, Math.round(t_hurt));
        }
        //怪
        else {
            //this.sceneUnitModuleS.addSceneUnitAttr(t_pid, EnumAttributeType.hp, Math.round(t_hurt));
            //oTraceError("buff_changeAttr======sceneUnitModuleSaddPlayerAttr=====>>>>", t_pid, this.param1, Math.round(t_hurt));
        }
    }




}





