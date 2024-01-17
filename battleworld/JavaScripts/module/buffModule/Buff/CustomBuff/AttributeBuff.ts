
import { BuffData, EBuffParamType, BuffS } from "module_buff";
import EnumAttributeType = Attribute.EnumAttributeType;
import { oTrace, oTraceError } from "odin";
import { BuffS_Base } from "../BuffS_Base";
import { BuffC_Base } from "../BuffC_Base";
import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
import { PlayerModuleS } from "../../../PlayerModule/PlayerModuleS";
// import { SceneUnitModuleS } from "../../../SceneUnitModule/SceneUnitModuleS";
import { EDefineType } from "../../../../const/Enum";
import { Globaldata } from "../../../../const/Globaldata";
import { MascotModuleS } from "../../../npc/mascotNpc/MascotModuleS";


/**
 * 属性修改BUFF -- 朗基努斯之枪
 * 玩家持有该道具时获得150%全属性提升。使用后，对玩家正前方发出一个可穿透的“枪”形子弹，飞行距离x，飞行速度v，对击中的所有人造成玩家生命值上限的伤害。玩家使用后会使自身当前生命值和生命值上限变为1，死亡重生后恢复。
 */
export class AttributeBuffC extends BuffC_Base {

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("AttributeBuffC constructor _id: ", _id, " configId: ", staticConfig.id);
        super(_id, staticConfig, arg);
    }

    public init() {
        // oTrace("AttributeBuffC init");
        super.init();
    }

    /**
   * 销毁，清理
   */
    public destroy() {
        //oTrace("AttributeBuffC Destroy");
        super.destroy();
    }
}

export class AttributeBuffS extends BuffS_Base {

    /**玩家模块*/
    public playerModules: PlayerModuleS = null;
    /**怪模块*/
    public sceneUnitModuleS: MascotModuleS = null;

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        super(_id, staticConfig, arg);
    }

    public init() {
        super.init();
        this.playerModules = ModuleService.getModule(PlayerModuleS);
        this.sceneUnitModuleS = ModuleService.getModule(MascotModuleS);
        this.buff_changeAttr(true)
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        super.destroy();
        this.buff_changeAttr(false)
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }


    /**
    * buff 更改玩家属性
    * @param this 
    * @param t_pid 
    * @param isCreated 创建buff还是销毁buff
    * @returns 
    */
    private buff_changeAttr(isCreated: boolean): void {

        //oTrace("GameModuleS:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);
        if (this.hostGuid == null) {
            oTraceError("error:buff_changeAttr_start uff.hostGuid == null ", this.hostGuid);
            return;
        }

        let t_pid = Number(this.hostGuid);
        if (isNaN(t_pid)) {
            oTraceError("error:buff_changeAttr_start sNaN(t_pid) ", this.hostGuid);
            return;
        }

        if ((this.affectPropertyType in EnumAttributeType) == false) {
            oTraceError("error:buff_changeAttr_over affectPropertyType not in attr ", this.affectPropertyType);
            return;
        }


        // 标准类型
        let t_normalType = Number(this.affectPropertyType);
        //加成类型
        let t_addType = t_normalType + Globaldata.addAttribueTypeVale;
        let t_MultipleType = t_normalType + Globaldata.multiplyAttribueTypeVale;


        if ((t_normalType in EnumAttributeType) == false) {
            oTraceError("error:buff_changeAttr_over t_normalType not in attr ", t_normalType);
            return;
        }

        //加成值类型 Percent or Value
        let param1_modle = this.param1_modle
        if (this.arg != null) {
            param1_modle = this.arg.buffParamType ? this.arg.buffParamType : this.param1_modle
        }
        let t_type = param1_modle == EBuffParamType.Percent ? t_MultipleType : t_addType

        let value = this.param1;
        if (this.arg != null) {
            value = this.arg.value ? this.arg.value : this.param1
        }
        //玩家
        if (t_pid > 0) {

            //注意：销毁判断玩家
            let player = Player.getPlayer(t_pid);
            if (player == null) {
                oTraceError("error:buff_changeAttr_over player == null ", t_pid);
                return;
            }
            if (player.character == null) {
                oTraceError("error:buff_changeAttr_over character == nulld ", t_pid);
                return;
            }

            if (isCreated) {
                this.playerModules.addPlayerAttr(t_pid, t_type, value)
            } else {

                // 百分比加成这里的 百分比  不取绝对值
                let perType = Math.floor(t_type / 100);
                if (perType != 2) {
                    value = Math.abs(value);
                }

                this.playerModules.reducePlayerAttr(t_pid, t_type, value, null, EDefineType.none)
            }
        }
        //怪
        else {
            if (isCreated) {
                this.sceneUnitModuleS.addSceneUnitAttr(t_pid, t_type, value)
            } else {
                this.sceneUnitModuleS.reduceSceneUnitAttr(t_pid, t_type, value)
            }
        }

    }
}
