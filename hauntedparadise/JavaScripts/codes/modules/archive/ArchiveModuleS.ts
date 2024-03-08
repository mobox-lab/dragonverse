/*
 * @Author       : dal
 * @Date         : 2023-11-16 17:05:13
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-23 10:25:58
 * @FilePath     : \hauntedparadise\JavaScripts\modules\archive\ArchiveModuleS.ts
 * @Description  : 
 */

import PlayerArchiveData from "./ArchiveData";
import { ArchiveData, ArchiveHelper } from "./ArchiveHelper";
import ArchiveModuleC from "./ArchiveModuleC";

export default class ArchiveModuleS extends ModuleS<ArchiveModuleC, PlayerArchiveData> {

    net_reqArchiveData(userId: string, archiveID: number): ArchiveData | PromiseLike<ArchiveData> {
        return ArchiveHelper.reqGetData(userId, archiveID);
    }

    @Decorator.noReply()
    net_reqSetData(userID, properties: string[], values: any[]): void {
        ArchiveHelper.reqSetData(userID, properties, values);
    }

    net_reqAllData(userID: string): Promise<ArchiveData[]> {
        return ArchiveHelper.reqGetAllData(userID);
    }

    @Decorator.noReply()
    net_reqDeleteData(userID: string, archiveId: number): void {
        ArchiveHelper.reqDeleteData(userID, archiveId);
    }

    @Decorator.noReply()
    net_addClickCount(userId: string, archiveId: number) {
        this.getPlayerData(userId).addClickCount(archiveId);
    }

    @Decorator.noReply()
    net_initClickCount(userId: string, archiveId: number) {
        this.getPlayerData(userId).initClickCount(archiveId);
    }
}