/*
 * @Author       : dal
 * @Date         : 2023-12-21 19:15:24
 * @LastEditors  : dal
 * @LastEditTime : 2023-12-25 17:47:45
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\GlobalDataHelper.ts
 * @Description  : 
 */

import { GlobalDefine } from "../../../../DefNoSubModule";

/** 总前缀 */
const TotalPrefix = GlobalDefine.TitlePrefix + "Procedure_";

export default class GlobalDataHelper {

    private constructor() { };

    /** 添加通过人数 */
    public static async addPassNum(degree: number) {
        let key = TotalPrefix + degree;
        let passNum = await this.getPassNum(degree);
        passNum++;
        // SystemUtil.isMobile() ? await DataStorage.asyncSetOtherGameData(MainPackageGameID, key, passNum) : await DataStorage.asyncSetData(key, passNum);
        await DataStorage.asyncSetData(key, passNum);
    }

    /** 获取通过人数 */
    public static async getPassNum(degree: number): Promise<number> {
        let key = TotalPrefix + degree;
        // let dataRes = await SystemUtil.isMobile() ? await DataStorage.asyncGetOtherGameData(MainPackageGameID, key) : await DataStorage.asyncGetData(key);
        let dataRes = await DataStorage.asyncGetData(key);
        if (!dataRes.data) { return 0; }
        return dataRes.data;
    }
}