/*
 * @Author       : dal
 * @Date         : 2023-11-03 14:01:00
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-03 14:49:41
 * @FilePath     : \hauntedparadise\JavaScripts\modules\inter\HandInterCompoent.ts
 * @Description  : 
 */
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import { Event_GameStateChange } from "../procedure/const/Events";
import HandTriggerCom from "./HandTriggerCom";
import { InterEvtData, ObjInterDefine } from "./ObjInterDefine";

@Component
export default class HandInterCompoent extends HandTriggerCom {
    protected async onStart() {
        if (SystemUtil.isServer()) {
            return;
        }
        super.onStart();
        // if (!this.gameObject.getChildByName("trigger")) { 
        //     let trigger = await GameObject.asyncSpawn("Trigger");
        //     trigger.name = "trigger";
        //     trigger.parent = this.gameObject;
        //     trigger.localTransform.position = Vector.zero;
        //     super.onStart();
        // }

    }
}
