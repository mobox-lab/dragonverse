/*
 * @Author       : dal
 * @Date         : 2023-11-13 16:54:00
 * @LastEditors  : dal
 * @LastEditTime : 2023-12-28 18:15:57
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\archive\ArchiveModuleC.ts
 * @Description  : 
 */

import PlayerArchiveData from "./ArchiveData";
import { ArchiveData } from "./ArchiveHelper";
import ArchiveModuleS from "./ArchiveModuleS";

export default class ArchiveModuleC extends ModuleC<ArchiveModuleS, PlayerArchiveData> {

    async reqDataByArchiveId(archiveID: number): Promise<ArchiveData> {
        return this.server.net_reqArchiveData(this.localPlayer.userId, archiveID);
    }

    async reqAllData(): Promise<ArchiveData[]> {
        return this.server.net_reqAllData(this.localPlayer.userId);
    }

    /**
     * 根据属性和value值存储游戏进度（对同一个key每6秒钟只能操作一次，否则会被锁定）
     * @param id 存档序号 - 从0开始，默认是0
     * @param properties string数组代表ArchiveData类的字段
     * @param values any数组ArchiveData对应字段的value值
     * @returns true or false
     */
    async reqSaveData(properties: string[], values: any[]): Promise<void> {
        this.server.net_reqSetData(this.localPlayer.userId, properties, values);
    }

    reqDeleteData(archiveId: number): void {
        if (!this._isDeleteCoolDown) { return; }
        this._isDeleteCoolDown = false;
        this.server.net_reqDeleteData(this.localPlayer.userId, archiveId);
    }

    private _isDeleteCoolDown: boolean = true;

    private deleteCoolTime: number = 1;

    protected onUpdate(dt: number): void {
        if (!this._isDeleteCoolDown) {
            this.deleteCoolTime -= dt;
            if (this.deleteCoolTime <= 0) {
                this.deleteCoolTime = 1;
                this._isDeleteCoolDown = true;
            }
        }
    }

    public addClickCount(archiveId: number) {
        this.server.net_addClickCount(this.localPlayer.userId, archiveId);
    }
}