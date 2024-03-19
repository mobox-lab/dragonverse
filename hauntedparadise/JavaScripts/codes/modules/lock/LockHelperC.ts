/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-11-16 16:16:05
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2023-11-17 10:31:33
 * @FilePath     : \hauntedparadise\JavaScripts\modules\lock\LockHelperC.ts
 * @Description  : 
 */
import { MapEx } from "../../utils/MapEx";
import { ArchiveDataType } from "../archive/ArchiveHelper";
import ArchiveModuleC from "../archive/ArchiveModuleC";
import { InterSaveModuleC } from "../inter/InterSaveHelper";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";

export default class LockHelperC {
    private static _instance: LockHelperC;

    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        return this._instance = new LockHelperC();
    }

    // get procedureC() {
    //     return ModuleService.getModule(ProcedureModuleC);
    // }

    // get archiveC() {
    //     return ModuleService.getModule(ArchiveModuleC);
    // }

    // public lockMapEx: MapEx.MapExClass<string>;
    /**
     * 保存密码锁的数据
     */
    async setLockData(id: string, value: string) {
        //let achieveId = this.procedureC.myScript.archiveID;
        // let map: MapEx.MapExClass<string> = (await this.archiveC.reqAllData())[achieveId].password;
        // MapEx.set(map, id, value)
        // this.archiveC.reqSaveData([ArchiveDataType.PASSWORD], [map])
        // ModuleService.getModule(InterSaveModuleC).reqSavePasswd(id, value);
    }
    // /**
    //  * 
    //  * @param id 
    //  */
    // async getLockData(id: string) {
    //     let achieveId = this.procedureC.myScript.archiveID;
    //     let data = (await this.archiveC.reqAllData())[achieveId]
    //     if (data.password && MapEx.has(data.password, id)) {
    //         return MapEx.get(data.password, id);
    //     }
    //     return null;
    // }
}