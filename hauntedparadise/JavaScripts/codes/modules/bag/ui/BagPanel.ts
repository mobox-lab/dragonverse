import {GameConfig} from "../../../../config/GameConfig";
import Bag_UI_Generate from "../../../../ui-generate/ShareUI/Bag_UI_generate";
import {Const} from "../../../Defines";
import {BagItemUI, EBagItemType} from "../../../ui/BagItemUI";
import {TimerOnly} from "../../../utils/AsyncTool";
import {GlobalSwitch} from "../../../utils/GlobalSwitch";
import Tips from "../../../utils/Tips";
import {GridSelectContainer} from "../../../utils/UIPool";
import {EquipDefine} from "../../equip/EquipDefine";
import {EquipModuleC} from "../../equip/EquipModuleC";
import {RouteDefine} from "../../route/RouteDefine";
import {BagDefine, BagItemData} from "../BagDefine";
import {BagModuleC} from "../BagModuleC";
import {ItemUseBox} from "./ItemUseBox";

export default class BagPanel extends Bag_UI_Generate {
    /** 当前显示的界面 */
    public curView: number = 1;

    // /** 物品栏道具容器 */
    // private viewContainer: GridSelectContainer<BagItemUI>;

    /** 背包中普通道具的容器 */
    private normalItemContainer: GridSelectContainer<BagItemUI>;

    // /** 特殊道具容器 */
    // private specialItemContainer: GridSelectContainer<BagItemUI>;

    /** 背包道具数据列表 */
    private bagItemDataList: BagItemData[] = [];

    private initContainer() {
        // this.canvas_prop.removeAllChildren();
        // this.viewContainer = new GridSelectContainer(this.canvas_prop, BagItemUI);
        this.normalItemContainer = new GridSelectContainer(this.canvas_items01, BagItemUI);
        // this.specialItemContainer = new GridSelectContainer(this.canvas_items, BagItemUI);
        // for (let index = 0; index < BagDefine.ViewCount; index++) {
        //     let node = this.viewContainer.addNode();
        //     node.initNode(index, EBagItemType.View);
        //     node.setAsEmpty();
        // }
        for (let index = 0; index < BagDefine.NormalItemCapacity; index++) {
            let node = this.normalItemContainer.addNode();
            node.initNode(index + BagDefine.ViewCount, EBagItemType.Normal);
            node.setAsEmpty();
        }
        // for (let index = 0; index < BagDefine.SpecialItemCapacity; index++) {
        //     let node = this.specialItemContainer.addNode();
        //     node.initNode(index + BagDefine.ViewCount + BagDefine.NormalItemCapacity, EBagItemType.Special);
        //     node.setAsEmpty();
        // }
    }

    private get selfModule() {
        return ModuleService.getModule(BagModuleC);
    }

    private syncTimer: TimerOnly = new TimerOnly();

    /**
     * 同步背包数据，每次会等等再一起同步，默认是慢同步
     * @param syncQuick 快同步，不需要等
     */
    public syncItemData(syncQuick: boolean = false) {
        if (syncQuick) {
            this.syncTimer.stop();
            this.selfModule.reqSyncBagData(this.bagItemDataList);
        } else {
            // 润一秆，再同步，装高手
            this.syncTimer.setTimeout(() => {
                this.selfModule.reqSyncBagData(this.bagItemDataList);
            }, 3e2);
        }
    }

    private initEvt() {
        // if (GlobalSwitch.enableBagItemMark()) {
        //     this.viewContainer.onNodeRemoveAction.add((node: BagItemUI) => {
        //         node.text_type.text = "";
        //     });
        // }
        Event.addLocalListener(EquipDefine.EquipEvt, this.onEquipItem.bind(this));
        Event.addLocalListener(BagDefine.OnItemInit, this.onItemInit.bind(this));
        Event.addLocalListener(BagDefine.AddItemEvt, this.onItemAdd.bind(this));
        Event.addLocalListener(BagDefine.RemoveItemEvt, this.onItemRemove.bind(this));
        Event.addLocalListener(BagDefine.OnItemChangeEvt, (bagItemList: BagItemData[]) => {
            this.bagItemDataList = bagItemList;
        });
        //初始化货币显示
        RouteDefine.getFearCoin(Player.localPlayer.userId).then(val => {
            // this.text_freenum.text = val.toString()
        });
        //监听货币变化
        RouteDefine.onFearCoinChangeAction.add((money: number) => {
            // this.text_freenum.text = money.toString();
        });
    }

    private onEquipItem(equipData: BagItemData) {
        // if (this.curView != 1) { return; }
        // // 没有装备了，需要取消选中当前道具
        // if (!equipData) { this.viewContainer.beSelectedNode && this.viewContainer.beSelectedNode.onSelect.call(); return; }
        // const equipItemUI = this.viewContainer.nodes.find(v => { return v.data && v.data.guid === equipData.guid });
        // if (!equipItemUI) {
        //     console.error(`DEBUG MyTypeError>>> 装备itemUI有问题${JSON.stringify(equipData)}`);
        //     return;
        // }
        // if (this.viewContainer.beSelectedNode != equipItemUI) {
        //     equipItemUI.onSelect.call();
        // }
    }

    private onItemInit(bagList: BagItemData[]) {
        this.bagItemDataList = bagList;
        console.log("DEBUG>>> onItemInit, ", JSON.stringify(this.bagItemDataList));
        this.bagItemDataList.forEach(bagItemData => {
            console.log("DEBUG>>> bagItemData: ", JSON.stringify(bagItemData));
            // // 如果是特殊道具单独找一下
            // if (this.isSpecialItem(bagItemData.cfgId)) {
            //     let specialBagItemUI = this.getFirstSpecialItemEmptyGrid(bagItemData);
            //     // if (!specialBagItemUI) { specialBagItemUI = this.specialItemContainer.addNode(); }
            //     specialBagItemUI.setData(bagItemData);
            //     return;
            // }
            // 之前的老存档可能是没有nodeId的
            if (bagItemData.nodeId === null || bagItemData.nodeId === undefined || bagItemData.nodeId === -1) {
                // 找到第一个空格子
                let bagItemUI = this.getFirstEmptyGrid();
                if (!bagItemUI) {
                    console.error(`DEBUG MyTypeError>>> 找不到一个可用的背包格子bagItemData: ${JSON.stringify(bagItemData)}`);
                    return;
                }
                bagItemUI.setData(bagItemData);
            } else {
                let itemUI = this.getItemUIByNodeId(bagItemData.nodeId);
                if (!itemUI.data) {
                    itemUI.setData(bagItemData);
                }
                // 被鸠占鹊巢了，重新找一个
                else {
                    itemUI = this.getFirstEmptyGrid();
                    if (itemUI) {
                        itemUI.setData(bagItemData);
                    }
                }
            }
        });
    }

    protected onHide() {
        UIService.hide(ItemUseBox);
    }

    // /** 找到第一个没使用的特殊道具格子 */
    // private getFirstSpecialItemEmptyGrid(itemData: BagItemData) {
    //     let itemUI = this.findExistSpecialItemInBag(itemData.guid);
    //     if (itemUI) { return itemUI; }
    //     return this.specialItemContainer.nodes[this.getFirstEmptyGridIdFromContainer(this.specialItemContainer)];
    // }

    // private findExistSpecialItemInBag(guid: string) {
    //     let itemUI = this.viewContainer.nodes.find(v => { return v.data && v.data.guid === guid });
    //     if (!itemUI) { itemUI = this.specialItemContainer.nodes.find(v => { return v.data && v.data.guid === guid }); }
    //     return itemUI
    // }

    private onItemAdd(itemData: BagItemData, needEquip: boolean) {
        console.log("DEBUG>>> onItemAdd, ", JSON.stringify(this.bagItemDataList));

        // // 处理特殊道具
        // if (this.isSpecialItem(itemData.cfgId)) {
        //     let specialBagItemUI = this.getFirstSpecialItemEmptyGrid(itemData);
        //     if (!specialBagItemUI) { specialBagItemUI = this.specialItemContainer.addNode(); }
        //     specialBagItemUI.setData(itemData);
        //     return;
        // }

        let bagItemUI: BagItemUI;
        // 已经有的更新这个位置的数量
        if (itemData.nodeId != null && itemData.nodeId != undefined && itemData.nodeId != -1) {
            bagItemUI = this.getItemUIByNodeId(itemData.nodeId);
        } else {
            bagItemUI = this.getFirstEmptyGrid();
        }
        if (bagItemUI) {
            bagItemUI.setData(itemData);
            // 在可视范围之内是可装备的才装备上
            if (needEquip && itemData.nodeId < BagDefine.ViewCount && this.curView === 1) {
                EquipDefine.EquipItem(itemData.guid);
            }
        }
    }

    private onItemRemove(itemData: BagItemData) {
        console.log("DEBUG>>> onItemRemove, ", JSON.stringify(itemData));
        // let itemUI = this.viewContainer.nodes.find(v => { return v.data && v.data.guid === itemData.guid });
        let itemUI;
        if (!itemUI) {
            itemUI = this.normalItemContainer.nodes.find(v => {
                return v.data && v.data.guid === itemData.guid;
            });
        }
        // if (!itemUI) { itemUI = this.specialItemContainer.nodes.find(v => { return v.data && v.data.guid === itemData.guid }); }
        if (!itemUI) {
            return;
        }
        if (itemData.count <= 0) {
            itemUI.setAsEmpty();
        } else {
            itemUI.setData(itemData);
        }
    }

    /** 通过节点索引找到itemUI */
    private getItemUIByNodeId(nodeId: number) {
        // if (nodeId < BagDefine.ViewCount) {
        //     return this.viewContainer.nodes[nodeId];
        // }
        if (nodeId < BagDefine.ViewCount + BagDefine.NormalItemCapacity) {
            return this.normalItemContainer.nodes[nodeId - BagDefine.ViewCount];
        } else {
            // return this.specialItemContainer.nodes[nodeId - BagDefine.ViewCount - BagDefine.NormalItemCapacity];
            return null;
        }
    }

    /** 找第一个空格子，在物品栏和普通道具背包中，会赋予nodeId */
    private getFirstEmptyGrid() {
        // let bagItemUIId = this.getFirstEmptyGridIdFromContainer(this.viewContainer);
        let bagItemUIId = -1;
        // if (bagItemUIId != -1) {
        //     let bagItemUI = this.viewContainer.nodes[bagItemUIId];
        //     return bagItemUI;
        // } else {
        bagItemUIId = this.getFirstEmptyGridIdFromContainer(this.normalItemContainer);
        let bagItemUI = this.normalItemContainer.nodes[bagItemUIId];
        return bagItemUI;
        // }
    }

    /** 从指定容器中找到第一个空格子 */
    private getFirstEmptyGridIdFromContainer(container: GridSelectContainer<BagItemUI>) {
        return container.nodes.findIndex((itemUI) => {
            return itemUI.data === null;
        });
    }

    /** 将所有容器归还 */
    public setAllNodeEmpty() {
        this.bagItemDataList.length = 0;
        // this.viewContainer.nodes.forEach(itemUI => {
        //     itemUI.setAsEmpty();
        // });
        this.normalItemContainer.nodes.forEach(itemUI => {
            itemUI.setAsEmpty();
        });
        // this.specialItemContainer.nodes.forEach(itemUI => {
        //     itemUI.setAsEmpty();
        // });
    }

    private initBtn() {
        this.btn_back.onClicked.add(this.applyFirstView.bind(this));
        // this.btn_expand.onClicked.add(this.applySecondView.bind(this));
        // this.btn_openbag.onClicked.add(this.shiftView.bind(this));
        const closeBtnList: Button[] = [];
        // closeBtnList.push(this.btn_close);
        // closeBtnList.push(this.btn_close1);
        // closeBtnList.push(this.btn_close2);
        closeBtnList.forEach(btn => {
            btn.clickMethod = ButtonClickMethod.PreciseClick;
            btn.onClicked.add(() => {
                this.checkExistSelectedItem()?.onSelect.call();
            });
        });
    }

    /** 检查是不是有需要交互的UI Item 可能是空 */
    public checkExistSelectedItem(): BagItemUI {
        if (this.curView != 2) {
            return;
        }
        // if (this.viewContainer.beSelectedNode) {
        //     return this.viewContainer.beSelectedNode;
        // }
        if (this.normalItemContainer.beSelectedNode) {
            return this.normalItemContainer.beSelectedNode;
        }
        return null;
        // return this.specialItemContainer.beSelectedNode;
    }

    /** 是否是交换物体的模式 */
    public isChangeMode: boolean = false;

    public enterChangeMode() {
        this.isChangeMode = true;
    }

    public exitChangeMode() {
        this.isChangeMode = false;
    }

    /**
     * 交换两个格子
     * @param itemUI1
     * @param itemUI2
     */
    public reqChangeTwoItem(itemUI1: BagItemUI, itemUI2: BagItemUI) {
        if (!this.canChangeTwoItem(itemUI1, itemUI2)) {
            Tips.show(GameConfig.SubLanguage.bag_01.Value);
            return;
        }
        let data1 = itemUI1.data;
        let data2 = itemUI2.data;
        data2 ? itemUI1.setData(data2) : itemUI1.setAsEmpty();
        data1 ? itemUI2.setData(data1) : itemUI2.setAsEmpty();
    }

    /**
     * 是否能交换两个item
     */
    private canChangeTwoItem(itemUI1: BagItemUI, itemUI2: BagItemUI) {
        if (this.isSpecialItem(itemUI1.data.cfgId) && itemUI2.type === EBagItemType.Normal) {
            return false;
        }
        if (!this.isSpecialItem(itemUI1.data.cfgId) && itemUI2.type === EBagItemType.Special) {
            return false;
        }
        if (itemUI2.data && this.isSpecialItem(itemUI2.data.cfgId) && itemUI1.type === EBagItemType.Normal) {
            return false;
        }
        if (itemUI2.data && !this.isSpecialItem(itemUI2.data.cfgId) && itemUI1.type === EBagItemType.Special) {
            return false;
        }
        return true;
    }

    private getItemType(cfgId: number) {
        return GameConfig.Item.getElement(cfgId).type;
    }

    /** 是否特殊道具 **/
    private isSpecialItem(cfgId: number) {
        return this.getItemType(cfgId) === Const.SpecialItemType;
    }

    /**
     * 合并两个格子
     * @param itemUI1
     * @param itemUI2
     */
    public reqMergeTwoItem(itemUI1: BagItemUI, itemUI2: BagItemUI) {
        let data1 = itemUI1.data;
        let data2 = itemUI2.data;
        let needSync = this.selfModule.mergeTwoItem(this.bagItemDataList, data1, data2);
        itemUI1.setData(data2, needSync);
        itemUI2.setData(data1, needSync);
    }

    protected onStart() {
        this.layer = mw.UILayerScene;
        this.initContainer();
        this.initEvt();
        this.initBtn();
    }

    /**
     * @param needPriorView 是否继承原来界面
     */
    protected onShow(needPriorView: boolean) {
        !needPriorView && this.applyFirstView();
    }

    private shiftView() {
        if (this.curView === 1) {
            this.applySecondView();
        } else {
            this.applyFirstView();
        }
    }

    /** 启用一级界面 */
    private applyFirstView() {
        this.curView = 1;
        this.exitChangeMode();
        this.canvas_bag.visibility = SlateVisibility.Collapsed;
        // this.btn_expand.visibility = SlateVisibility.Visible;
        this.clearAllSelectNode();
        this.checkHasEquipWeapon();
        EquipDefine.EquipItem(null);
    }

    /** 检查有没有装备道具，装备了的道具需要重新高亮 */
    private checkHasEquipWeapon() {
        if (EquipDefine.curPlayerEquipItem) {
            this.getItemUIByNodeId(EquipDefine.curPlayerEquipItem.nodeId).onSelect.call();
        }
    }

    /** 启用二级界面 */
    private applySecondView() {
        this.curView = 2;
        ModuleService.getModule(EquipModuleC).equip(null);
        this.canvas_bag.visibility = SlateVisibility.SelfHitTestInvisible;
        // this.btn_expand.visibility = SlateVisibility.Collapsed;
        // this.viewContainer.beSelectedNode && this.viewContainer.beSelectedNode.onSelect.call();
    }

    private clearAllSelectNode() {
        // this.viewContainer.beSelectedNode && this.viewContainer.beSelectedNode.onSelect.call();
        this.normalItemContainer.beSelectedNode && this.normalItemContainer.beSelectedNode.onSelect.call();
        // this.specialItemContainer.beSelectedNode && this.specialItemContainer.beSelectedNode.onSelect.call();
    }
}