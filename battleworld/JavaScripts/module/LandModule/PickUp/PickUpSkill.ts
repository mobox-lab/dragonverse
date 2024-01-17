import { EPickUpType } from "../../../const/Enum";
import PickUpBase from "./PickUpBase";

/**
 * 拾取物 技能
 */
@Component
export default class PickUpSkill extends PickUpBase {


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        await super.onStart();
        this.pickUpType = EPickUpType.skill;
    }





}
