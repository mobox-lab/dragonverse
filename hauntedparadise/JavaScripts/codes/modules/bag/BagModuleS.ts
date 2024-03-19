import { AddGMCommand } from "module_gm";
import { BagDefine, BagItemData } from "./BagDefine";
import { BagModuleC } from "./BagModuleC";
import { ArchiveData, ArchiveDataType, ArchiveHelper } from "../archive/ArchiveHelper";
import { InterSaveModuleS } from "../inter/InterSaveHelper";
import { GameConfig } from "../../../config/GameConfig";
import { IItemElement } from "../../../config/Item";
import { RouteDefine } from "../route/RouteDefine";
import { Const } from "../../Defines";

AddGMCommand("增加物品", () => {

}, (plyaer: mw.Player, params: string) => {
    if (params == "" || params == null) {
        BagDefine.AddItem(plyaer.playerId, 1)
    } else {
        let param = params.split("|");
        BagDefine.AddItem(plyaer.playerId, Number(param[0]), "", "", Number(param[1]) ? Number(param[1]) : 1);
    }
})

AddGMCommand("移除物品", () => {

}, (plyaer: mw.Player, params: string) => {
    let guid = BagDefine.GetItemGuid(plyaer.playerId, 1);
    BagDefine.RemoveItem(plyaer.playerId, guid, 1)
})

type OtherBagInfo = {

    /** 在展示区的特殊道具数量 - 用以动态计算 道具容量格子 的容量 */
    specialItemCountOnView,

    /** 普通道具的数量 */
    normalItemCount,

}

export class BagModuleS extends ModuleS<BagModuleC, null> {
    private _dataMap: Map<number, BagItemData[]> = new Map();

    protected onStart(): void {
        BagDefine.init();
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            if (this._dataMap.has(player.playerId)) {
                this._dataMap.delete(player.playerId);
            }
        } catch (error) {
            console.error(error + "{BagModuleSLeftTypeError}");
        }
    }

    /** 由客户端主动发起的同步，会自动保存一次到存档 */
    public net_syncItems(datas: BagItemData[]) {
        this._dataMap.set(this.currentPlayerId, datas);
        // 保存到存档
        ArchiveHelper.reqSetData(this.currentPlayer.userId, [ArchiveDataType.BAGITEMS], [datas], true);
    }

    /** 动态的容量 */
    private getCurMaxGridCount(specialCountOnView: number) {
        return GameConfig.Global.ItemMax.number - specialCountOnView;
    }

    /**
     * 增加物品
     * @param cfgId 配置表id
     * @param customData 自定义数据
     * @param needSaveToArchive 是否需要保存到存档 default true
     */
    public net_reqAddItem(playerId: number, cfgId: number, customData: string, clueGuid: string = "", count: number = 1, needSelect: boolean = true, showTips = true) {
        if (!this.getClient(this.currentPlayer)) {
            return;
        }

        if (!this._dataMap.has(playerId)) {
            this._dataMap.set(playerId, []);
        }
        let arr = this._dataMap.get(playerId);

        let cfg = GameConfig.Item.getElement(cfgId);
        if (!cfg) {
            return false;
        }
        /** 检查是否是货币类型，不入库 */
        if (cfg.clazz == "Currency") {
            this.trans2Currency(playerId, cfg, count, clueGuid);
            return true;
        }

        if (this.checkIsSpecialItem(cfgId)) {
            if (clueGuid != "") {
                // ModuleService.getModule(InterSaveModuleS).net_deleteClue(playerId, clueGuid);
            }
            RouteDefine.addSpecialItem(Player.getPlayer(playerId).userId, cfgId, count);
            return true;
        }

        // 最大格子超过了零的有限制的
        if (cfg.maxGrid > 0) {
            // 检查一下是否超过最大格子
            let grids = arr.filter(e => { return e.cfgId === cfgId });
            // 是否还有容纳的余地
            if (grids.length > cfg.maxGrid) {
                this.getClient(playerId).net_tipsMaxGrid(cfgId);
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
                    this.getClient(playerId).net_tipsMaxGrid(cfgId);
                    return false;
                }
            }
        }

        let grid = arr.find(e => {
            return e.cfgId == cfgId && e.customData == customData && e.count < cfg.maxCount;
        });

        const otherBagInfo = this.countSpecialItem(playerId);

        //背包最大格子数目
        if (!grid && otherBagInfo.normalItemCount >= this.getCurMaxGridCount(otherBagInfo.specialItemCountOnView)) {
            this.getClient(playerId).net_tipsMax();
            // TODO: 多出来的count就先服务器直接吃掉了，后续可以加一个丢在地上
            return false;
        }

        /** 溢出的数量 - 如果这次存的数量太多了，将会触发加存机制 */
        let extraCount: number = 0;

        if (!grid) {
            let itemdata = new BagItemData();
            itemdata.cfgId = cfgId;
            itemdata.customData = customData;
            itemdata.guid = `${Date.now()}_${cfgId}`;
            // 可以堆叠的情况
            if (cfg.maxCount != 0) {
                if (count > cfg.maxCount) {
                    itemdata.count = cfg.maxCount;
                    // 溢出了
                    extraCount = count - cfg.maxCount;
                } else {
                    itemdata.count = count;
                }
            }
            // 不能堆叠
            else {
                itemdata.count = 1;
            }
            arr.push(itemdata);
            grid = itemdata;
        }
        else {
            if (grid.count + count > cfg.maxCount) {
                let needCount = cfg.maxCount - grid.count;
                grid.count += needCount;
                // 溢出了
                extraCount = count - needCount;
            } else {
                grid.count += count;
            }
        }

        Event.dispatchToLocal(BagDefine.AddItemEvt, playerId, cfgId, customData);
        if (clueGuid != "") {
            // ModuleService.getModule(InterSaveModuleS).net_deleteClue(playerId, clueGuid);
        }

        // 保存到存档
        ArchiveHelper.reqSetData(Player.getPlayer(playerId).userId, [ArchiveDataType.BAGITEMS], [arr]);

        this.getClient(playerId).net_resAddItem(needSelect, grid, showTips);

        /** 溢出了，加存 */
        if (extraCount > 0) {
            // 等等同步
            setTimeout(() => { this.net_reqAddItem(playerId, cfgId, customData, clueGuid, extraCount, needSelect, showTips); }, 20);
        }

        return true;
    }

    /**
     * 将道具转换成货币
     * @param pid 
     * @param cfg 
     * @param count 
     * @param clueGuid 
     */
    private trans2Currency(pid: number, cfg: IItemElement, count: number, clueGuid: string) {
        let player = Player.getPlayer(pid);
        if (!player) {
            return;
        }
        if (cfg.clazzParam.length < 2) {
            return;
        }
        let num = cfg.clazzParam.map(e => { return Number(e); })
        if (!num[0] || !num[1]) {
            return;
        }
        num[0] = Math.round(num[0]);
        num[1] = MathUtil.clamp(num[1], 0, Number.MAX_SAFE_INTEGER);
        let mount = Math.round(count * num[1]);
        console.log("获得了恐惧比" + mount)
        RouteDefine.changeFearCoin(player.userId, mount);
        if (clueGuid != "") {
            // ModuleService.getModule(InterSaveModuleS).net_deleteClue(pid, clueGuid);
        }
        this.getClient(player).net_tipsCurrency(cfg.id, mount);
    }

    public getItemGuid(playerId: number, cfgId: number, customData: string = ""): string {
        let arr = this._dataMap.get(playerId);
        let index = arr.findIndex(e => { return e.cfgId == cfgId && customData == customData });
        if (index == -1) {
            return "";
        }
        return arr[index].guid;
    }

    public getItemsById(pid: number, cfgId: number): BagItemData[] {
        let arr = this._dataMap.get(pid);
        if (!arr) { return; }
        return arr.filter(v => { return v.cfgId === cfgId });
    }

    /** 找到并移除多个道具并返回 */
    public net_reqChangeItemCount(pid: number, itemId: number, deltaNum: number) {

        if (deltaNum === 0) { return 0; }

        // 减
        if (deltaNum < 0) {
            deltaNum = Math.abs(deltaNum);
            let items = this.getItemsById(pid, itemId);
            if (!items) { return 0; }
            // 先减少的，再减多的
            items.sort((a, b) => { return a.count - b.count });
            let finalCount = 0;
            for (let data of items) {
                if (data.count >= deltaNum) {
                    finalCount += deltaNum;
                    this.removeItem(pid, data.guid, deltaNum);
                    break;
                } else {
                    deltaNum -= data.count;
                    finalCount += data.count;
                    this.removeItem(pid, data.guid, data.count);
                }
            }
            return finalCount;
        }
        // 加
        else {
            this.net_reqAddItem(pid, itemId, "", "", deltaNum, false, false);
            // TODO:这里的返回数量不一定准确，因为有可能被背包上限卡住
            return deltaNum;
        }
    }

    /**
     * 移除一个玩家背包中某个格子的道具
     * @param playerId 
     * @param guid 格子id
     * @param discardCount 可选参数，不传将会移除这个格子中所有的堆叠道具
     */
    public removeItem(playerId: number, guid: string, discardCount?: number) {
        let arr = this._dataMap.get(playerId);
        if (!arr) {
            console.error("玩家的背包为空");
            return false;
        }
        let index = arr.findIndex(e => { return e.guid == guid });
        if (index == -1) {
            return false;
        }
        let data = arr[index];
        let newDiscardCount = discardCount ? discardCount : data.count;
        data.count -= newDiscardCount;
        Event.dispatchToLocal(BagDefine.RemoveItemEvt, playerId, data);
        if (data.count == 0) {
            arr.splice(index, 1);
        }

        if (this.checkIsSpecialItem(data.cfgId)) {
            const player = Player.getPlayer(playerId);
            player && RouteDefine.removeSpecialItem(player.userId, data.cfgId, newDiscardCount);
        }

        // 保存到存档
        ArchiveHelper.reqSetData(Player.getPlayer(playerId).userId, [ArchiveDataType.BAGITEMS], [arr]);

        this.getClient(playerId).net_removeItem(guid, data.count);

        return true;
    }

    private checkIsSpecialItem(cfgId: number) {
        return GameConfig.Item.getElement(cfgId).type === Const.SpecialItemType;
    }

    /** 计算特殊道具的数量 */
    private countSpecialItem(pid: number): OtherBagInfo {
        const bagDataList = this._dataMap.get(pid);
        if (!bagDataList) { return; }
        const specialItems = bagDataList.filter(v => { return this.checkIsSpecialItem(v.cfgId) });
        const specialItemOnViewCount = specialItems.filter(v => { return v.nodeId >= 0 && v.nodeId < BagDefine.ViewCount }).length;
        const bagInfo: OtherBagInfo = { specialItemCountOnView: specialItemOnViewCount, normalItemCount: bagDataList.length - specialItems.length };
        return bagInfo;
    }

    public getItem(playerId: number, guid: string) {
        let arr = this._dataMap.get(playerId);
        let index = arr.findIndex(e => { return e.guid == guid });
        if (index == -1) {
            return null;
        }
        return arr[index];
    }
}