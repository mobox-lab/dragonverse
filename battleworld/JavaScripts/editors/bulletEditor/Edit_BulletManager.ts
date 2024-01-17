import { Singleton } from "../../tool/FunctionUtil";
import { MotionEditConst } from "../motionEditor/MotionEditConst";
import { Edit_BulletWindow } from "./Edit_BulletWindow";

@Singleton()
export class Edit_BulletManager {
    public static instance: Edit_BulletManager = null;


    /**当前选中的motion列表索引 */
    public curSelectIndex: number = 0;



    public init() {


        if (MotionEditConst.isUseEdit == false) {
            return;
        }

        Edit_BulletWindow.instance.init();

    }

}