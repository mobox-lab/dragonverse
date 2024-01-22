import { EPickUpType } from "../../../const/Enum";
import PickUpBase from "./PickUpBase";

/**
 * 拾取物 预制体金币
 */
@Component
export default class PickUpMoney extends PickUpBase {

    @mw.Property({ displayName: "增加金币数量", group: "属性" })
    public money: number = 100;


    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        await super.onStart();
        this.pickUpType = EPickUpType.money;
    }



}
