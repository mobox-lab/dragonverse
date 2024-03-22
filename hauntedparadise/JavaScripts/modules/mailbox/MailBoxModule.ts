/*
 * @Author       : dal
 * @Date         : 2024-01-15 15:36:25
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-31 14:59:17
 * @FilePath     : \hauntedparadise\JavaScripts\modules\mailbox\MailBoxModule.ts
 * @Description  : 
 */

import { IMailBoxElement } from "../../config/MailBox";
import { MapEx } from "../../codes/utils/MapEx";
import { MailScript } from "./MailScript";
import { ProcedureModuleC } from "../../codes/modules/procedure/ProcedureModuleC";
import { MailBoxPanel } from "./UIMailBox";
import { AddGMCommand } from "module_gm";
import { HomeModuleC } from "../home/HomeModuleC";
import { TimerOnly, WaitLoop } from "../../codes/utils/AsyncTool";

/** 出生日期 */
const BirthDate: string = "2094|04|01";

/** 邮件信息 */
export class MailInfo {

    /** 是否初始化过 */
    isInit: boolean = false;

    /** 所有收到的邮件 */
    allMails: number[] = [];

    /** 读过的邮件 */
    readMails: number[] = [];

    /** 当前的日历 */
    curDate: string = BirthDate;
}

export class MailBoxData extends Subdata {

    /** 与存档关联起来 */
    @Decorator.persistence()
    public mailInfoMap: MapEx.MapExClass<MailInfo> = {};

    /** 读完所有邮件的回调 */
    public onReadAllAction: Action = new Action();

    public getMailInfo(archiveId: number) {
        let mailInfo = MapEx.get(this.mailInfoMap, archiveId);
        if (!mailInfo) {
            mailInfo = new MailInfo();
            MapEx.set(this.mailInfoMap, archiveId, mailInfo);
            this.save(true);
        }
        return mailInfo;
    }

    public pushNewMail(archiveId: number, newMails: number[]) {
        let mailInfo = this.getMailInfo(archiveId);
        newMails.forEach((id) => {
            if (!mailInfo.allMails.includes(id)) {
                mailInfo.allMails.push(id);
            }
        });
        // 没初始化初始化一下
        if (!mailInfo.isInit) { mailInfo.isInit = true; }
        this.save(true);
    }

    public pushNewReadMail(archiveId: number, newReadMail: number) {
        let mailInfo = this.getMailInfo(archiveId);
        let newReadMails = mailInfo.readMails.concat(newReadMail);
        mailInfo.readMails = newReadMails;
        MapEx.set(this.mailInfoMap, archiveId, mailInfo);
        // 简单判断一下长度相等就代表读完了所有邮件
        if (mailInfo.readMails.length >= mailInfo.allMails.length) {
            this.onReadAllAction.call();
        }
        this.save(true);
    }

    public updateAliveDate(archiveId: number, date: string) {
        let mailInfo = this.getMailInfo(archiveId);
        // 没初始化初始化一下
        if (!mailInfo.isInit) { mailInfo.isInit = true; }
        mailInfo.curDate = date;
        MapEx.set(this.mailInfoMap, archiveId, mailInfo);
        this.save(true);
    }

    /** 删除一个日历 */
    deleteDate(archiveId: number) {
        let mailInfo = new MailInfo();
        MapEx.set(this.mailInfoMap, archiveId, mailInfo);
        this.save(true);
    }
}

AddGMCommand("打开信箱", async () => { Event.dispatchToLocal("ShowMailBox"); })

export class MailBoxModuleC extends ModuleC<MailBoxModuleS, MailBoxData> {

    protected onStart(): void {
        Event.addLocalListener("ShowMailBox", () => { UIService.show(MailBoxPanel) });

        DataCenterC.ready().then(() => {
            this.data.onReadAllAction.add(() => {
                ModuleService.getModule(HomeModuleC).localHome.setMailEffVis(false);
            });
        });
    }

    public get archiveId() {
        return ModuleService.getModule(ProcedureModuleC).myScript.archiveID;
    }

    public get mailInfo() {
        return this.data.getMailInfo(this.archiveId);
    }

    /** 接收新的邮件 */
    public receiveNewMails(mails: IMailBoxElement[], dateStr: string) {
        const mailInfo = this.mailInfo;
        // 还有未读邮件
        if (mailInfo.allMails.length > mailInfo.readMails.length) {
            WaitLoop.loop(() => { return ModuleService.getModule(HomeModuleC).localHome }, 100, -1).then((localHome) => { localHome.setMailEffVis(true); });
        }
        // 如果初始化过并且日期相同，就不参与了
        if (mailInfo.isInit && dateStr == mailInfo.curDate) { return; }
        if (mails.length > 0) {
            this.server.net_receiveNewMails(this.localPlayerId, this.archiveId, mails.map(item => { return item.id }));
            WaitLoop.loop(() => { return ModuleService.getModule(HomeModuleC).localHome }, 100, -1).then((localHome) => {
                // 收到了新的邮件
                localHome.setMailEffVis(true);
            });
        }
        if (mailInfo.curDate != dateStr) { this.server.net_updateAliveDate(this.localPlayerId, this.archiveId, dateStr) }
    }

    timer: TimerOnly = new TimerOnly();

    /** 读了一个邮件 */
    public readMail(mailId: number) {
        if (this.mailInfo.readMails.includes(mailId)) { return; }
        this.server.net_readMail(this.localPlayerId, this.archiveId, mailId);
        // 主动检测一下，是否读完
        this.timer.setTimeout(() => {
            const mailInfo = this.data.getMailInfo(this.archiveId);
            if(mailInfo.readMails >= mailInfo.allMails) {
                ModuleService.getModule(HomeModuleC).localHome.setMailEffVis(false);
            }
        }, 5e2);
    }
}

export class MailBoxModuleS extends ModuleS<MailBoxModuleC, MailBoxData> {

    private mailMap: Map<string, MailScript> = new Map();

    protected onStart(): void {
        Event.addClientListener("OnPlayerAliveDayChange", (player, dayNum: number) => {
            this.net_setDate(player.userId, dayNum);
        })

        Event.addLocalListener("DeleteArchiveSuccess", this.deleteDate.bind(this))
        Event.addLocalListener("StartProcedureServer", this.initDate.bind(this));
        Event.addLocalListener("EndProcedureServer", this.resetDate.bind(this));
    }

    private deleteDate(userId: string, archiveId: number) {
        let data = this.getPlayerData(userId);
        data.deleteDate(archiveId);
    }

    /** 初始化日历 */
    private initDate(userId: string, aliveDay: number) {
        this.net_setDate(userId, aliveDay);
    }

    /** 重置日历 */
    private resetDate(userId: string) {
        this.mailMap.get(userId).dateStr = "-1";
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        this.initPlayerMailScript(player.userId);
    }

    private initPlayerMailScript(userId: string) {
        if (this.mailMap.has(userId)) { return; }
        let player = Player.getPlayer(userId);
        let mailScript = player.getPlayerState(MailScript);
        this.mailMap.set(player.userId, mailScript);
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.mailMap.delete(player.userId);
    }

    @Decorator.noReply()
    public net_receiveNewMails(pid: number, archiveId: number, mails: number[]) {
        const data = this.getPlayerData(pid);
        data.pushNewMail(archiveId, mails);
    }

    @Decorator.noReply()
    public net_updateAliveDate(pid: number, archiveId: number, date: string) {
        const data = this.getPlayerData(pid);
        data.updateAliveDate(archiveId, date);
    }

    @Decorator.noReply()
    public net_readMail(pid: number, archiveId: number, mail: number) {
        const data = this.getPlayerData(pid);
        if (data.getMailInfo(archiveId).readMails.includes(mail)) { return; }
        data.pushNewReadMail(archiveId, mail);
    }

    /**
     * 设置一个玩家的日历
     * @param userId 
     * @param aliveDay 存活天数
     */
    @Decorator.noReply()
    public net_setDate(userId: string, aliveDay: number) {
        if (!this.mailMap.has(userId)) { this.initPlayerMailScript(userId); }
        this.mailMap.get(userId).updateDate(aliveDay);
    }
}