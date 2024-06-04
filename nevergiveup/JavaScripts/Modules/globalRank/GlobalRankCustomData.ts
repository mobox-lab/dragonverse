/*
 * @Author       : chen.liang chen.liang@appshahe.com
 * @Date         : 2023-05-11 13:25:25
 * @FilePath: \globalRank\JavaScripts\modules\globalRank\GlobalRankCustomData.ts
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-19 10:11:17
 * @Description  : 
 */

import { GlobalRankDataHelper } from "./GlobalRankDataHelper";
import { GlobalRankModuleC } from "./GlobalRankModuleC";
import { EmRankCustomKey } from "./const/EmRankCustomKey";

/** 
 * 基础要同步的数据 
 * @ps 要存自己的数据就继承这个类
*/
export class RankInfoBase {
    id: string;
    name: string;
    score: number;
    updateTime?: number;
}
/** 数据库key前缀 */
const GlobalRankPrefix = "GlobalRank_";
/**
 * 全局排行榜数据实例,用于单个排行榜的同步
 */
@Component
export default class GlobalRankCustomData extends Script {
    /** 信息的数量 */
    private _infoCount: number = 10;
    /** 缓存数据 */
    private _cacheData: RankInfoBase[] = [];
    /** 正在同步中不会再进行同步 */
    private _UpdateHandle;
    /** 额外数据的 */
    @Property({ hideInEditor: true, replicated: true })
    private _customKey: string = "";
    /** 同步数据 */
    @Property({ hideInEditor: true, replicated: true, onChanged: "onDataChange" })
    private _dataReplicated: string = "";
    /** 初始化脚本 */
    init(key: string, count: number) {
        this._customKey = key;
        this._infoCount = count;
        this.updateData();
    }
    /** 获取排行榜数据 */
    getDataArray(): RankInfoBase[] {
        return this._cacheData;
    }
    /** 设置排行榜数据 */
    setData(info: RankInfoBase, key: string) {
        if (!info.id) return;
        info.updateTime = Date.now();
        const index = this._cacheData.findIndex((item) => item.id === info.id);
        if (index === -1) {
            this._cacheData.push(info);
        } else if (this._cacheData[index].updateTime < info.updateTime) {
            this._cacheData[index] = info;
        }
        this._cacheData.sort((a, b) => GlobalRankDataHelper.sortFunc(a, b, key));
        if (this._cacheData.length > this._infoCount) {
            this._cacheData.length = this._infoCount;
        }
        this._dataReplicated = JSON.stringify(this._cacheData);
        this.updateData();
    }
    /** 更新数据 */
    private updateData() {
        if (this._UpdateHandle) return;
        this.forceUpdate();
    }

    public forceUpdate() {
        if (this._customKey.endsWith(EmRankCustomKey.LocalOnly)) return;
        const customDataKey = GlobalRankPrefix + this._customKey + this.getTimeKey();
        DataStorage.asyncGetData(customDataKey).then((getResult) => {
            if (getResult.code != DataStorageResultCode.Success) {
                setTimeout(() => {
                    if (this._UpdateHandle) {
                        clearTimeout(this._UpdateHandle);
                        this._UpdateHandle = null;
                    }
                    this.updateData();
                }, 1000);
                return;
            }
            // console.log(">>> getGlobalRankData:" + GlobalRankPrefix + this._customKey + ":" + JSON.stringify(data));
            console.log(">>> getGlobalRankData:", customDataKey, getResult.code, JSON.stringify(getResult.data));

            const data: RankInfoBase[] = getResult.data;
            let isChanged = false;
            if (data) {
                data.forEach((info) => {
                    const index = this._cacheData.findIndex((item) => item.id === info.id);
                    if (index === -1) {
                        this._cacheData.push(info);
                    } else if (this._cacheData[index].updateTime < info.updateTime) {
                        this._cacheData[index] = info;
                    }
                });
                this._cacheData.sort((a, b) => GlobalRankDataHelper.sortFunc(a, b, this._customKey));
                if (this._cacheData.length > this._infoCount) {
                    this._cacheData.length = this._infoCount;
                }
                const UndefinedIndex = this._cacheData.findIndex(info => !info.id);
                if (UndefinedIndex != -1) {
                    this._cacheData.splice(UndefinedIndex, 1);
                }
                if (JSON.stringify(data) !== JSON.stringify(this._cacheData)) {
                    isChanged = true;
                }
            }
            else {
                isChanged = true;
            }
            this._dataReplicated = JSON.stringify(this._cacheData);
            if (isChanged) {
                const setResult = DataStorage.asyncSetData(customDataKey, this._cacheData);
                console.log(">>> setGlobalRankData:", customDataKey, setResult, JSON.stringify(this._cacheData));
            }
        });
        if (this._UpdateHandle) clearTimeout(this._UpdateHandle);
        this._UpdateHandle = setTimeout(() => {
            this._UpdateHandle = null;
        }, 5000);
    }

    private onDataChange() {
        let data = JSON.parse(this._dataReplicated) as RankInfoBase[];
        if (this._customKey != "") {
            const module = ModuleService.getModule(GlobalRankModuleC);
            if (!module) return;
            module.actionCall(this._customKey, data);
        }
        else {
            console.warn("rank data key is null");
        }
    }

    private _cacheDay: number = 0;
    private getTimeKey() {
        if (!this._customKey.endsWith(EmRankCustomKey.UpdateByTime)) return "";
        let time = new Date();
        if (this._cacheDay != time.getDate()) {
            this._cacheDay = time.getDate();
            this._cacheData = [];
        }
        return `_${time.getFullYear()}_${time.getMonth()}_${time.getDate()}`;
    }

}