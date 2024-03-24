/*
 * @Author       : dal
 * @Date         : 2023-11-03 14:01:00
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-01-07 16:29:41
 * @FilePath: \hauntedparadise\JavaScripts\codes\modules\bag\BagModuleC.ts
 * @Description  : 
 */
import {GameConfig} from "../../../config/GameConfig";
import {Const, EGameTheme} from "../../Defines";
import GameStart from "../../GameStart";
import {CommonUtils} from "../../utils/CommonUtils";
import {LanUtil} from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import {GhostTraceHelper} from "../../utils/TraceHelper";
import {ArchiveData, ClueSaveData} from "../archive/ArchiveHelper";
import {BoardHelper} from "../blackboard/BoardDefine";
import {InterSaveModuleC} from "../inter/InterSaveHelper";
import {Event_LoadArchiveData} from "../procedure/const/Events";
import {RouteDefine} from "../route/RouteDefine";
import {BagDefine, BagItemData} from "./BagDefine";
import {BagModuleS} from "./BagModuleS";
import BagPanel from "./ui/BagPanel";

export class BagModuleC extends ModuleC<BagModuleS, null> {

    private _bagDataList: BagItemData[] = [];

    protected onStart(): void {
        super.onStart();
        BagDefine.init();

        Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
            // 唤醒一下背包
            UIService.getUI(BagPanel);
        });

        Event.addLocalListener("Event_GameEnd", () => {
            this._bagDataList.length = 0;
        });

        Event.addLocalListener(Event_LoadArchiveData, this.readArchive.bind(this));
    }

    /** 摄像机配置 */
    private readonly cameraCfgId: number = 9999;

    /** 检查有没有摄像机，没有就强塞一个 */
    private checkCameraAndPush(archiveData: ArchiveData) {
        const cameraCfg = GameConfig.Item.getElement(this.cameraCfgId);
        if (!cameraCfg) {
            return;
        }
        // 背包中怎么能没有摄像机，所以强塞一个
        if (archiveData.bagItems.filter(v => {
            return v.cfgId === this.cameraCfgId;
        }).length === 0) {
            this.reqAddItem(Player.localPlayer.playerId, this.cameraCfgId, "", "", 1, false);
        }
    }

    private async loadSpecialItems() {
        const specialItemList = await RouteDefine.getSpecialItemDataList(this.localPlayer.userId);
        this._bagDataList = this._bagDataList.concat(specialItemList);
    }

    protected onEnterScene(sceneType: number): void {
        if (GameStart.GameTheme === EGameTheme.Hall) {
            this._bagDataList = [];
            let item = new BagItemData();
            item.cfgId = 1200;
            item.count = 1;
            item.guid = "customItem";
            this._bagDataList.push(item);
            this.loadSpecialItems().then(() => {
                this.server.net_syncItems(this._bagDataList);
                Event.dispatchToLocal(BagDefine.OnItemInit, this._bagDataList);
            });
        }
    }

    /**
     * 读档
     */
    private async readArchive(archiveData: ArchiveData) {
        if (!archiveData.bagItems) {
            archiveData.bagItems = [];
        }
        this._bagDataList = archiveData.bagItems;
        await this.loadSpecialItems();
        Event.dispatchToLocal(BagDefine.OnItemInit, this._bagDataList);
        setTimeout(() => {
            this.checkCameraAndPush(archiveData);
        }, 3e2);
        this.server.net_syncItems(this._bagDataList, true);
    }

    /** 请求同步背包数据 */
    public reqSyncBagData(bagDataList: BagItemData[]) {
        this._bagDataList = bagDataList;
        this.server.net_syncItems(bagDataList);
        this.countSpecialItem();
    }

    /** 计算特殊道具的数量 */
    private countSpecialItem() {

        const specialItems = this._bagDataList.filter(v => {
            return this.checkIsSpecialItem(v.cfgId);
        });
        this.specialItemCountOnView = specialItems.filter(v => {
            return v.nodeId >= 0 && v.nodeId < BagDefine.ViewCount;
        }).length;
        this.normalItemCount = this._bagDataList.length - specialItems.length;
        // console.log("this.specialItemCountOnView: " + this.specialItemCountOnView);
        // console.log("this.normalItemCount: " + this.normalItemCount);
    }

    private checkIsSpecialItem(cfgId: number) {
        let data = GameConfig.Item.getElement(cfgId);
        if (!data) return false;
        if (data.clazz == "Currency") {
            return false;
        }
        return data.type === Const.SpecialItemType;
    }

    /**
     * 同步物品
     * @param needEquip 是否需要装备
     * @param itemdata
     */
    public net_resAddItem(needEquip: boolean, itemdata: BagItemData, showTips: boolean = true) {
        if (!itemdata) {
            return;
        }
        let grid = this._bagDataList.find((e) => {
            return e.guid == itemdata.guid;
        });
        if (!grid) {
            this._bagDataList.unshift(itemdata);
        } else {
            grid.count = itemdata.count;
        }
        Event.dispatchToLocal(BagDefine.AddItemEvt, itemdata, needEquip);
        Event.dispatchToLocal(BagDefine.OnItemChangeEvt, this._bagDataList);
        let cfg = GameConfig.Item.getElement(itemdata.cfgId);
        showTips && Tips.show(CommonUtils.formatString(GameConfig.Language.Door_Tips5.Value, cfg.tip));
        this.countSpecialItem();
    }

    /** 在展示区的特殊道具数量 - 用以动态计算 道具容量格子 的容量 */
    private specialItemCountOnView = 0;

    /** 动态的容量 */
    private get curMaxGridCount() {
        return GameConfig.Global.ItemMax.number - this.specialItemCountOnView;
    }

    /** 普通道具的数量 */
    private normalItemCount: number;

    public async reqAddItem(playerId: number, cfgId: number, customData: string, clueGuid: string, count: number = 1, needSelect = true): Promise<boolean> {
        let cfg = GameConfig.Item.getElement(cfgId);

        if (this.checkIsSpecialItem(cfgId)) {
            if (clueGuid != "") {
                // ModuleService.getModule(InterSaveModuleC).reqDeleteClue(clueGuid);
            }
            RouteDefine.addSpecialItem(this.localPlayer.userId, cfgId, count);
            return true;
        }

        if (!cfg) {
            console.error("尝试捡起来不存在的物品");
            return false;
        }

        let grid = this._bagDataList.find(e => {
            return e.cfgId == cfgId && e.customData == customData && e.count < cfg.maxCount;
        });

        //背包最大格子数目
        if (!grid && this.normalItemCount >= this.curMaxGridCount) {
            this.net_tipsMax();
            return false;
        }

        let res = await this.server.net_reqAddItem(playerId, cfgId, customData, clueGuid, count, needSelect);
        //GhostTraceHelper.itemTrace(cfgId, 2);
        return res;
    }

    public checkItemCanPick(playerId: number, cfgId: number, customData: string, clueGuid: string, count: number): boolean {
        let cfg = GameConfig.Item.getElement(cfgId);
        if (!cfg) {
            console.error("尝试捡起来不存在的物品");
            return false;
        }
        let grid = this._bagDataList.find(e => {
            return e.cfgId == cfgId && e.customData == customData && e.count < cfg.maxCount;
        });

        // 最大格子超过了零的有限制的
        if (cfg.maxGrid > 0) {
            // 检查一下是否超过最大格子
            let grids = this._bagDataList.filter(e => {
                return e.cfgId === cfgId;
            });
            // 是否还有容纳的余地
            if (grids.length > cfg.maxGrid) {
                this.net_tipsMaxGrid(cfgId);
                return false;
            }
            if (grids.length === cfg.maxGrid) {
                let mark: boolean = false;
                for (const grid of grids) {
                    // 有一个格子还没满
                    if (grid.count < cfg.maxCount) {
                        mark = true;
                        break;
                    }
                }
                if (!mark) {
                    this.net_tipsMaxGrid(cfgId);
                    return false;
                }
            }
        }

        //背包最大格子数目
        if (!grid && this.normalItemCount >= this.curMaxGridCount) {
            this.net_tipsMax();
            return false;
        }
        return true;
    }

    /** 检查背包中是否存在某个item */
    public checkItemExist(cfgId: number): boolean {
        return this.getItemsById(cfgId).length != 0;
    }

    public getItemsById(cfgId: number): BagItemData[] {
        return this._bagDataList.filter(v => {
            return v.cfgId === cfgId;
        });
    }

    /**
     * 移除物品
     * @param guid 物品的guid
     */
    public net_removeItem(guid: string, newCount: number) {
        let index = this._bagDataList.findIndex(e => {
            return e.guid == guid;
        });
        if (index == -1) {
            return;
        }
        let item = this._bagDataList[index];
        item.count = newCount;
        Event.dispatchToLocal(BagDefine.RemoveItemEvt, item, item.customData);
        if (item.count <= 0) {
            this._bagDataList.splice(index, 1);
        }
        GhostTraceHelper.itemTrace(item.cfgId, 3);
        Event.dispatchToLocal(BagDefine.OnItemChangeEvt, this._bagDataList);
        this.countSpecialItem();
    }

    /** 请求改变道具数量(可+可-)，从背包中改成功了几个就返回几个 */
    public async reqChangeItemCount(deltaNum: number, itemId: number) {
        if (deltaNum === 0) {
            return 0;
        }
        return this.server.net_reqChangeItemCount(this.localPlayerId, itemId, deltaNum);
    }

    /**
     * 合并两个item
     * @param itemDataList 道具列表，如果合并时一个itemData被吸干，需要及时删除
     * @param data1
     * @param data2
     * @returns 是否合并成功
     */
    public mergeTwoItem(itemDataList: BagItemData[], data1: BagItemData, data2: BagItemData) {
        if (data1.cfgId != data2.cfgId) {
            console.error(`DEBUG MyTypeError>>> data1: ${JSON.stringify(data1)}，与data2：${JSON.stringify(data2)}格子配置都不同，合并失败！`);
            return false;
        }
        let cfg = this.getItemCfg(data1.cfgId);
        // 就不用交换了
        if (cfg.maxCount <= 1 || data1.count === cfg.maxCount || data2.count === cfg.maxCount) {
            return false;
        }
        // 改变值，一个增，另一个就需要减少
        let deltaNum = cfg.maxCount - data1.count;
        deltaNum = Math.min(deltaNum, data2.count);
        data1.count += deltaNum;
        data2.count -= deltaNum;
        // 如果data2被吸干，就需要在道具列表中将其删除
        if (data2.count <= 0) {
            let id = itemDataList.findIndex(v => {
                return v.guid === data2.guid;
            });
            itemDataList.splice(id, 1);
        }
        return true;
    }

    private getItemCfg(itemId: number) {
        return GameConfig.Item.getElement(itemId);
    }

    public getAllItems() {
        return this._bagDataList;
    }

    public net_tipsMaxGrid(cfgId: number) {
        Tips.show(CommonUtils.formatString(LanUtil.getText("tips_show_8"), GameConfig.Item.getElement(cfgId).name));
    }

    public net_tipsMax() {
        Tips.show(GameConfig.Language.tips_show_01.Value);
    }

    public net_tipsCurrency(id: number, mount: number) {
        let str = GameConfig.Item.getElement(id).tip;
        if (str.includes("{0}")) {
            str = str.replace("{0}", mount.toString());
        }
        Tips.show(str);
    }

    /**
     * 获取道具数量.
     * @param {number} pid
     * @param {number} itemId
     * @return {number}
     */
    public getItemCount(itemId: number) {
        return this
            .getItemsById(itemId)
            .reduce((previousValue, item) => previousValue + item.count, 0);
    }

    public afford(price: [number, number][]): boolean {
        for (const p of price) {
            if (this.getItemCount(p[0]) < p[1]) {
                return false;
            }
        }
        return true;
    }

    public pay(price: [number, number][]) {
        this.server.net_pay(this.localPlayerId, price);
    }
}