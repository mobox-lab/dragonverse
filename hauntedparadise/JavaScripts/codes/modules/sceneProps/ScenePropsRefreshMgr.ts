import { GameConfig } from "../../../config/GameConfig";
import { IRefreshPointElement } from "../../../config/RefreshPoint";
import { CommonUtils } from "../../utils/CommonUtils";
import { ClueSaveData } from "../archive/ArchiveHelper";

/**
 * 配置表信息
 */
interface Diff {
    array1d: number[];
}

/**
 * 刷新数据
 */
class RefreshData {
    public constructor(
        /** 所属的level */
        public level: number,
        /** 需要刷新的数目 */
        public count: number,) {
    }
}

/**
 * 物品数据
 */
class ItemData {

    public constructor(
        /** 物品Id */
        public itemId: number,
        /** 权重 */
        public weight: number) {
    }
}

/**
 * 组合包数据
 */
class PackData {
    /** 总权重 */
    public totalWeight: number = 0;
    /** 物品列表 */
    public items: ItemData[] = []
}

/**
 * 刷新点数据
 */
class RefreshPointData {
    /** 刷新点等级 */
    public level: number = 0;
    /** 层级备份数据 */
    private floorMapBk: Map<number, IRefreshPointElement[]> = new Map();
    /** 点位备份数据 */
    private allPointsBk: IRefreshPointElement[] = [];

    /** 层级实例数据 */
    private floorMap: Map<number, IRefreshPointElement[]> = new Map();
    /** 点位实例数据 */
    private allPoints: IRefreshPointElement[] = [];

    /** 最小数目 */
    private _minArr: number[] = [];

    /** 剩余量 */
    private _minNum: number = 0;

    /**
     * 增加点位
     * @param point 增加的点位配置
     */
    public addPoint(point: IRefreshPointElement) {
        if (!this.floorMapBk.has(point.pos)) {
            this.floorMapBk.set(point.pos, []);
        }
        let arr = this.floorMapBk.get(point.pos);
        arr.push(point);
        this.allPointsBk.push(point);
    }

    /**
     * 设置最低点位
     * @param arr 点位信息
     */
    public setPointMin(arr: number[]) {
        this._minArr = arr.slice();
        this._minNum = 0;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            this._minNum += element;
        }
        console.log("[RefreshMgr]设置保底点位数目" + arr);
    }

    /**
     * 获得一个随机点位
     * @returns 获得的随机点位
     */
    public getRandomPoint() {
        if (this.allPoints.length == 0) {
            return null;
        }
        let point: IRefreshPointElement;
        if (this._minNum == 0) {
            let rd = MathUtil.randomInt(0, this.allPoints.length);
            point = this.allPoints[rd]
        }
        else {
            for (let index = 0; index < this._minArr.length; index++) {
                const element = this._minArr[index];
                if (element != 0) {
                    this._minArr[index] = this._minArr[index] - 1;
                    this._minNum--;
                    let pointArr = this.floorMap.get(index + 1);
                    if (!pointArr) {
                        console.error("[RefreshMgr]没有这个等级的点位 level:" + this.level + "pos:" + (index + 1) + "优先检查表格");
                        continue;
                    }
                    if (pointArr.length == 0) {
                        console.error("[RefreshMgr]点位不够用了 level:" + this.level + " pos:" + (index + 1))
                        continue;
                    }
                    let rd = MathUtil.randomInt(0, pointArr.length);
                    point = pointArr[rd];
                    SystemUtil.isPIE && console.log("[RefreshMgr]抽了一个保底点位 lv:" + this.level + " pos:" + (index + 1) + " loc:" + point.locat);
                    break;
                }
            }
        }
        point && this.removePoint(point);
        return point;
    }

    /**
     * 移除一个在实例随机池的点位
     * @param point 移除的点位
     */
    private removePoint(point: IRefreshPointElement) {
        if (!this.floorMap.has(point.pos)) {
            return;
        }
        let arr = this.floorMap.get(point.pos);
        let index = arr.indexOf(point);
        if (index != -1) {
            arr.splice(index, 1);
        }
        index = this.allPoints.indexOf(point);
        if (index != -1) {
            this.allPoints.splice(index, 1);
        }
    }

    /**
     * 重新拷贝一份缓存数据
     */
    reset() {
        this.floorMapBk.forEach((v, k) => {
            this.floorMap.set(k, v.slice());
        })
        this.allPoints = this.allPointsBk.slice();
    }
}

export class ScenePropsRefreshMgr {
    public static get instance(): ScenePropsRefreshMgr {
        if (!this._instance) {
            this._instance = new ScenePropsRefreshMgr();
        }
        return this._instance;
    }

    private static _instance: ScenePropsRefreshMgr

    private _cluePointMap: Map<number, RefreshPointData> = new Map();

    private _itemMap: Map<number, PackData> = new Map();

    private constructor() {
        GameConfig.RefreshPack.getAllElement().forEach(packCfg => {
            let data = new PackData();
            for (let index = 0; index < packCfg.numberList.length; index++) {
                const element = packCfg.numberList[index];
                const cfg = GameConfig.SubItem.getElement(element);
                if (!cfg) {
                    continue;
                }
                let weight = CommonUtils.getUValue(packCfg.u, cfg.value, packCfg.value);
                data.totalWeight = data.totalWeight + weight;
                data.items.push(new ItemData(cfg.id, weight));
                console.log(`[RefreshMgr]物品weight${cfg.value}: pack的weight${packCfg.value} : 实际的weight${weight}`);
            }
            console.log(`[RefreshMgr]${packCfg.lv}pack的总weight${data.totalWeight}`);
            this._itemMap.set(packCfg.lv, data);
        });
        GameConfig.RefreshPoint.getAllElement().forEach((ele) => {
            if (!this._cluePointMap.has(ele.lv)) {
                let data = new RefreshPointData();
                data.level = ele.lv;
                this._cluePointMap.set(ele.lv, data);
            }
            let arr = this._cluePointMap.get(ele.lv)
            arr.addPoint(ele);
        })
    }

    /**
     * 刷新货物
     * @param diff 配置信息
     * @returns 线索信息
     */
    public refreshSceneProps(diff: number) {
        let resArr = this.startRefresh(GameConfig.SceneRefreshProps.getAllElement().find(e => {
            return e.diffcult = diff;
        }))
        let clues = this.insNewClues(resArr);
        if (!clues) {
            console.error("[RefreshMgr]没配表呢，亲");
            return [];
        }
        SystemUtil.isPIE && console.log("[RefreshMgr]刷新结果" + JSON.stringify(clues))
        return clues;
    }

    /**
     * 开始刷新
     * @param diff 配置信息
     * @returns 希望刷新得到的组合包总数
     */
    private startRefresh(diff: Diff) {
        let total = MathUtil.randomInt(diff.array1d[0], diff.array1d[1]);
        console.log("[RefreshMgr]场景随机初始值" + total);
        const refreshCfgs = GameConfig.RefreshPack.getAllElement();
        refreshCfgs.sort((a, b) => {
            return a.value - b.value;
        })
        let wishPoints: RefreshData[] = [];
        for (let index = refreshCfgs.length - 1; index >= 0; index--) {
            const cfg = refreshCfgs[index];
            let totalPrice = 0;
            for (let j = 0; j <= index; j++) {
                const cfg2 = refreshCfgs[j];
                totalPrice += cfg2.value * cfg2.weight;
            }
            let rate = total / totalPrice;
            let point = Math.floor(rate * cfg.weight);
            let wishPrice = point * cfg.value;
            total -= wishPrice;
            wishPoints[index] = new RefreshData(cfg.lv, point);
        }
        wishPoints.forEach(e => {
            console.log("[RefreshMgr]场景随机结果" + e.level + ":" + e.count);
        })
        console.log("[RefreshMgr]场景随机余量" + total);
        return wishPoints;
    }

    /**
     * 生成新的线索
     * @param wishPoints 希望的信息量
     * @returns 线索实例
     */
    private insNewClues(wishPoints: RefreshData[]) {
        let result: ClueSaveData[] = [];
        this._cluePointMap.forEach(e => {
            e.reset();
        })
        let a2d = GameConfig.SceneRefreshProps.Valid_Pos.array2d;
        if (!a2d) {
            console.error("[RefreshMgr]没有配置2d数组")
            return null;
        }
        for (let index = 0; index < wishPoints.length; index++) {
            let data = wishPoints[index];
            let arr = this._cluePointMap.get(data.level)
            if (a2d[data.level - 1]) {
                arr.setPointMin(a2d[data.level - 1]);
            }
            for (let j = 0; j < data.count; j++) {
                let point = arr.getRandomPoint();
                if (!point) {
                    console.error("[RefreshMgr]点位不够用了" + data.level + "\n需要的点位数目" + data.count)
                    continue;
                }
                let val = new ClueSaveData();
                val.assid = this.getRandomItem(data.level);
                val.loc = CommonUtils.vec2Arr(point.locat);
                val.rot = CommonUtils.vec2Arr(point.rot);
                result.push(val);
            }
        }
        return result;
    }

    /**
     * 获得一个随机物品
     * @param level 组合包等级
     * @returns 一个随机的物品id
     */
    private getRandomItem(level: number) {
        let data = this._itemMap.get(level);
        if (!data) {
            console.error("[RefreshMgr]生成失败，检查一下表格\n生成失败，检查一下表格" + level)
            return 0;
        }
        if (data.items.length == 0) {
            console.error("[RefreshMgr]随机失败，一个都没配啊兄弟" + level)
            return 0;
        }
        let rate = Math.random() * data.totalWeight;
        for (let index = 0; index < data.items.length; index++) {
            const element = data.items[index];
            if (rate <= element.weight) {
                return element.itemId;
            }
            rate -= element.weight;
        }
        console.log("[RefreshMgr]随机失败，检查一下算法" + level)
        return data.items[0].itemId;
    }
}