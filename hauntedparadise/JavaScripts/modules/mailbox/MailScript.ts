/*
 * @Author       : dal
 * @Date         : 2024-01-15 16:00:14
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-16 14:36:59
 * @FilePath     : \hauntedparadise\JavaScripts\modules\mailbox\MailScript.ts
 * @Description  : 
 */

import { GameConfig } from "../../config/GameConfig";
import { MailBoxModuleC } from "./MailBoxModule";

/** 出生日期 */
const BirthDateStr: string = "2094-04-01";

@Component
export class MailScript extends PlayerState {


    @Property({ hideInEditor: true, replicated: true, onChanged: "onDateChange" })
    public dateStr: string = "-1";

    /** 玩家的日历改变了 */
    public onDateChange() {
        if (this.dateStr === "-1") { return; }
        const mailCfgs = GameConfig.MailBox.getAllElement();
        // 今天需要收到的邮件
        const needGetMails = mailCfgs.filter((cfg) => { return this.dateStr === cfg.date });
        ModuleService.getModule(MailBoxModuleC).receiveNewMails(needGetMails, this.dateStr);
    }

    public updateDate(aliveDay: number) {
        const birthDate = new Date(BirthDateStr);
        birthDate.setDate(birthDate.getDate() + aliveDay);
        this.dateStr = DateFormatUtil(birthDate, "yyyy|MM|dd");
    }
}

export function DateFormatUtil(date: Date, format: string) {
    var args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
};