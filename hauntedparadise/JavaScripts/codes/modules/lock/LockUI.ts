/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-10-10 14:00:10
 * @LastEditors  : dal
 * @LastEditTime : 2023-12-01 17:11:53
 * @FilePath     : \hauntedparadise\JavaScripts\modules\lock\LockUI.ts
 * @Description  : 
 */

import Password_UI_Generate from "../../../ui-generate/ShareUI/Password_UI_generate";
import { MainUI } from "../../ui/MainUI";
import { BlackBoardModuleC } from "../blackboard/BlackBoardMdouleC";
import { CHECK_PASSWORD } from "./LockScript";
//TODO 继承UI
export default class LockUI extends Password_UI_Generate {
    public confirmPassword: string = "";
    //TODO 等拿到当前密码位数的表
    public digits: number = 4;
    /** 密码锁物品的guid */
    private _guid: string;
    /** 当前打开UI对应的密码锁的guid */
    public curLockId: string = "";
    onShow(guid: string, id: string) {
        this._guid = guid;
        for (let i = 1; i <= 4; i++) {
            this[`text_input_${i}`].text = "";
        }
        this.confirmPassword = "";
        this.curLockId = id;
        this.initUI();

        UIService.hide(MainUI);
    }

    onStart() {
        // Event.addServerListener(Event_GameInit, (playerID: string) => {
        //     //在密码锁不只一个的情况下这边读取密码的key需要修改

        //     //密码最多4位,隐藏多余位数


        // })


        for (let i = 0; i <= 9; i++) {
            this[`btn_number${i}`].onClicked.add(() => {
                if (this.confirmPassword.length < this.digits) {
                    this.confirmPassword += i.toString();
                    this[`text_input_${this.confirmPassword.length}`].text = i.toString()
                }
            })
        }
        this.btn_enter.onClicked.add(() => {
            Event.dispatchToLocal(CHECK_PASSWORD, this.confirmPassword, this._guid);
            mw.UIService.hideUI(this);
            UIService.show(MainUI);
        })
        this.btn_enter_close.onClicked.add(() => {
            mw.UIService.hideUI(this);
            UIService.show(MainUI);
        })
    }
    private initUI() {
        let password = ModuleService.getModule(BlackBoardModuleC).reqGetBoardValue(this.curLockId);
        this.digits = password.length;
        console.log("当前密码", password, password.length)
        for (let i = 1; i <= 4; i++) {
            if (i <= this.digits) {
                this[`minput_${i}`].visibility = mw.SlateVisibility.SelfHitTestInvisible;
            } else {
                this[`minput_${i}`].visibility = mw.SlateVisibility.Collapsed;
            }

        }
    }

}