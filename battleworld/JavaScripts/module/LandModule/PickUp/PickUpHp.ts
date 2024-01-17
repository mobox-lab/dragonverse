import { EModule_Events, EPickUpType } from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";
import PickUpBase from "./PickUpBase";


/**
 * 拾取物 预制体血量
 */
@Component
export default class PickUpHp extends PickUpBase {

    @mw.Property({ displayName: "增加血量百分比", group: "属性" })
    public hpPercent: number = 30;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        await super.onStart();
        this.pickUpType = EPickUpType.hp;
    }



}

