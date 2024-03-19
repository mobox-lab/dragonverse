/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-10-10 10:55:59
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2023-11-17 14:07:49
 * @FilePath     : \hauntedparadise\JavaScripts\modules\lock\LockScript.ts
 * @Description  : 
 */
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../../config/GameConfig";
import { BlackBoardModuleC } from "../blackboard/BlackBoardMdouleC";
import { BoardHelper, BoardKeys } from "../blackboard/BoardDefine";
import { InterEvtData, InterEvtNameDef, ObjInterDefine } from "../inter/ObjInterDefine";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";
import LockHelperC from "./LockHelperC";
import LockUI from "./LockUI";
import LevelBase from "../Level/LevelBase";
import { ArchiveData } from "../archive/ArchiveHelper";
import { MapEx } from "../../utils/MapEx";
import { InterSaveModuleC } from "../inter/InterSaveHelper";
import { GhostTraceHelper } from "../../utils/TraceHelper";
AddGMCommand("打开密码锁UI", () => {
    Event.dispatchToLocal(InterEvtNameDef.showLockUIEvtName, "1");
    console.log("打开密码锁UI");
})


export enum LockEventsName {
    LockOpenSuccess = "LockOpenSuccess",
    LockOpenFail = "LockOpenFail"
}

export const CHECK_PASSWORD = "checkPassWord";

@Component
export default class LockScript extends LevelBase {
    @mw.Property({ displayName: "成功解锁触发事件" })
    public lockOpenSuccess: InterEvtData[] = [new InterEvtData()];
    @mw.Property({ displayName: "失败解锁触发事件" })
    public lockOpenFail: InterEvtData[] = [new InterEvtData()];
    @mw.Property({ numberType: NumberType.Int8, displayName: "当前密码锁的位数,默认生成难度表里面的" })
    public passwordBits: number = 0;
    /**BoardKeys.Password+this.gameObject.objectId的唯一表示 */
    @mw.Property({ displayName: "当前密码锁的Id" })
    public id: string = "";

    @mw.Property({ displayName: "固定密码" })
    public fixNumber: string = "";

    public EventListers: mw.EventListener[] = [];
    protected onLevelStart(): void {
        console.log("密码锁脚本初始化成功")
        //点击密码锁确认按钮 检查密码,正确发送开锁成功事件,错误发送开锁失败事件
        if (SystemUtil.isClient()) {
            this.id = BoardKeys.Password + this.id;
            this.addLocalListen(InterEvtNameDef.showLockUIEvtName, (guid: string) => {
                console.log("收到消息 打开密码锁UI");
                if (this.gameObject.gameObjectId != guid) {
                    return;
                }
                mw.UIService.show(LockUI, guid, this.id);
            })
            this.addLocalListen(CHECK_PASSWORD, (
                confirmPassword: string, guid: string) => {
                console.log("收到消息 检查密码", guid);
                if (guid != this.gameObject.gameObjectId) {
                    return;
                }

                if (this.checkPassword(confirmPassword)) {
                    console.log("密码正确");
                    this.save2Archive(1);
                    ObjInterDefine.dispatchClientByData(this.lockOpenSuccess, this.gameObject.gameObjectId);
                } else {
                    console.log("密码错误");
                    ObjInterDefine.dispatchClientByData(this.lockOpenFail, this.gameObject.gameObjectId);
                }
            });
        }
    }

    onLoadData(data: ArchiveData): void {
        let passwd = "";
        if (data.password && MapEx.has(data.password, this.id)) {
            passwd = MapEx.get(data.password, this.id);
        }
        if (passwd == "") {
            this.createPassword();
        } else {
            console.log("存储密码", this.id, ":", passwd)
            BoardHelper.ChangeKeyValue(this.id, passwd);;
        }
        let isUnlock = this.getSaveStatId(data);
        if (!isUnlock) {
            return;
        }
        ObjInterDefine.dispatchClientByData(this.lockOpenSuccess, this.gameObject.gameObjectId);
    }

    /** 
     * 随机创建密码 
     */
    private createPassword() {
        if (!this.passwordBits || this.passwordBits <= 0) {
            let degree = ModuleService.getModule(ProcedureModuleC).myScript.degree
            this.passwordBits = GameConfig.Difficulty.getElement(degree).passwordNumber;
        }
        let pwdStr = this.fixNumber;
        if (this.fixNumber == "") {
            const pwd: number[] = [];
            for (let i = 0; i < this.passwordBits; i++) {
                pwd.push(Math.floor(Math.random() * 10));
            }

            pwdStr = pwd.join("");
        }
        console.log(this.id, "创建密码", pwdStr)

        BoardHelper.ChangeKeyValue(this.id, pwdStr);
        // ModuleService.getModule(InterSaveModuleC).reqSavePasswd(this.id, pwdStr);
    }

    /**
     * 检查密码是否正确
     * @param confirmPassword 用户输入需要被检查的密码
     * @returns 是否正确
     */
    private checkPassword(confirmPassword: string) {
        let password = "";
        if (SystemUtil.isClient()) {
            password = ModuleService.getModule(BlackBoardModuleC).reqGetBoardValue(this.id);

        }
        console.log("当前密码是", password, "用户输入的密码是", confirmPassword)
        GhostTraceHelper.lockResultTrace(this.gameObject.gameObjectId, confirmPassword, password)
        if (password == confirmPassword) {
            return true;
        }
        return false;
    }

    protected onDestroy(): void {
        console.log("密码锁销毁", this.EventListers.length);
        this.EventListers.forEach(element => {
            element.disconnect();
        })
    }

}