import { GlobalRankModuleC } from "./GlobalRankModuleC";
import { DegreeType } from "../blackboard/BoardDefine";
import { GlobalDefine } from "../../../DefNoSubModule";

/** 最多存储长度 */
export const MaxRankItemSaveLength = 1e3;

/** 最大显示长度 */
export const MaxRankItemViewLength = 50;

/** 服务端多久保存一次数据 */
export const RankDataSaveTime = 1e4;

/** 基础要同步的数据 - 为减少存储压力都用首字母的简写 */
export class GlobalRankDataInfoBase {
    /** userId */
    i: string;
    /** 姓名 */
    n: string;
    /** 通关时间 - 这里存的是秒*/
    t: number;
}

/** 数据库key前缀 */
const GlobalRankPrefix = GlobalDefine.TitlePrefix + "GlobalRank_";

/**
 * 全服排行榜实例
 */
@Component
export default class GlobalRankData<Info extends GlobalRankDataInfoBase> extends Script {

    /** 缓存数据 */
    private _cacheData: Info[] = [];

    /** 正在同步中不会再进行同步 */
    private _isUpdate = false;

    /** 额外数据的 */
    @Property({ hideInEditor: true, replicated: true })
    private _customKey: number = DegreeType.Simple;

    /** 同步数据 */
    @Property({ hideInEditor: true, replicated: true, onChanged: "onDataChange" })
    private _dataReplicated: string = "";

    /**
     * 初始化不同难度的脚本
     * @param key 难度
     */
    public server_init(key: DegreeType) {
        this._customKey = key;
        this.updateData();
    }

    /** 获取排行榜数据 */
    public getDataArray(): Info[] {
        return this._cacheData;
    }

    /** 设置排行榜数据 */
    public setData(info: Info) {
        if (!info.i) return;
        this.updateCache([info]);
        this.updateData();
    }

    /** 更新数据 */
    private updateData() {
        if (this._isUpdate) return;
        this.forceUpdateData();
        setTimeout(() => { this._isUpdate = false; }, RankDataSaveTime);
    }

    /** 忽视update，强制更新缓存到kv服务器 */
    public forceUpdateData() {
        if (SystemUtil.isMobile() && GlobalDefine.MainPackageGameID !== "") {
            DataStorage.asyncGetOtherGameData(GlobalDefine.MainPackageGameID, GlobalRankPrefix + this._customKey).then(this.onGetData.bind(this));
        } else {
            DataStorage.asyncGetData(GlobalRankPrefix + this._customKey).then(this.onGetData.bind(this));
        }
    }

    /** 获取到数据的回调 */
    private onGetData(res: DataStorageResult) {
        let isChanged = false;
        if (res.code === DataStorageResultCode.Success && res.data) {
            this.updateCache(res.data, false);
            if (JSON.stringify(res.data) !== JSON.stringify(this._cacheData)) { isChanged = true; }
        } else {
            // 初始化默认数据
            isChanged = true;
        }
        if (isChanged) {
            this._isUpdate = true;
            if (SystemUtil.isMobile() && GlobalDefine.MainPackageGameID !== "") {
                DataStorage.asyncSetOtherGameData(GlobalDefine.MainPackageGameID, GlobalRankPrefix + this._customKey, this._cacheData);
            } else {
                DataStorage.asyncSetData(GlobalRankPrefix + this._customKey, this._cacheData);
            }
        }
    }

    /** 用新数据更新缓存 */
    private updateCache(data: Info[], updateName: boolean = true) {
        data.forEach((info) => {
            const index = this._cacheData.findIndex((item) => item.i === info.i);
            if (index === -1) {
                this._cacheData.push(info);
            } else {
                // 通关时间小于从前，更新通关时间
                if (this._cacheData[index].t > info.t) {
                    this._cacheData[index].t = info.t;
                }
                // 平台名字变了，更新名字
                if (info.n != null && updateName && this._cacheData[index].n != info.n) {
                    this._cacheData[index].n = info.n;
                }
            }
        });
        // 重新排序
        this._cacheData.sort((a, b) => a.t - b.t);
        // 遍历cacheData，保证50名之后的玩家不存name
        this._cacheData.forEach((a, index) => { if (index > MaxRankItemViewLength) { a.n = null; } });
        // 保留前多少位
        if (this._cacheData.length > MaxRankItemSaveLength) { this._cacheData.length = MaxRankItemSaveLength; }
        // 同步给客户端 - 只同步可见的，同步太多会同步失败
        this._dataReplicated = JSON.stringify(this._cacheData.slice(0, MaxRankItemViewLength));
    }

    /** 客户端排行榜模块 */
    protected globalRankModuleC: GlobalRankModuleC;

    /** 同步到客户端 */
    private onDataChange() {
        let data = JSON.parse(this._dataReplicated) as Info[];
        if (this.globalRankModuleC) {
            this.globalRankModuleC["actionCall"](this._customKey, data);
        } else {
            let inter = setInterval(() => {
                let globalRandModuleC = ModuleService.getModule(GlobalRankModuleC);
                if (globalRandModuleC) {
                    this.globalRankModuleC = globalRandModuleC;
                    globalRandModuleC["actionCall"](this._customKey, data);
                    clearInterval(inter);
                }
            }, 100);
        }
    }
}