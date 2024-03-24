/*
 * @Author       : dal
 * @Date         : 2023-11-03 11:51:28
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-05 17:34:51
 * @FilePath     : \hauntedparadise\JavaScripts\codes\ui\BagItemUI.ts
 * @Description  : 
 */
import {GameConfig} from "../../config/GameConfig";
import {BagItemData} from "../modules/bag/BagDefine";
import {EquipDefine} from "../modules/equip/EquipDefine";
import Prop_UI_Generate from "../../ui-generate/ShareUI/Prop_UI_generate";
import {CommonUtils} from "../utils/CommonUtils";
import Tips from "../utils/Tips";
import {GlobalSwitch} from "../utils/GlobalSwitch";
import BagPanel from "../modules/bag/ui/BagPanel";
import {IItemElement} from "../../config/Item";
import {BagItemOperateHud} from "../modules/bag/ui/BagItemOperateHud";
import {ItemUseBox} from "../modules/bag/ui/ItemUseBox";

export enum EBagItemType {

    /** 展示栏 */
    View,
    /** 普通道具 */
    Normal,
    /** 特殊道具 */
    Special,
}

export class BagItemUI extends Prop_UI_Generate {

    /** 这个格子的节点索引 */
    private nodeId: number = -1;

    public onSelect: Action;
    public isSelected: boolean;

    public data: BagItemData;

    public cfg: IItemElement;

    static selectColor = LinearColor.colorHexToLinearColor("#FFF500");
    static unSelectColor = LinearColor.colorHexToLinearColor("#C6C6C6FF");

    public type: EBagItemType = EBagItemType.View;

    public hideAllInfo() {
        UIService.hideUI(this.operateHud);
    }

    private operateHud: BagItemOperateHud;

    public onStart() {
        this.onSelect = new Action();
        this.btn_prop.onClicked.add(this.onClicked.bind(this));
        this.operateHud = UIService.create(BagItemOperateHud);
    }

    private get selfPanel() {
        return UIService.getUI(BagPanel);
    }

    /** 初始化这个节点id，后续就不许改了 */
    public initNode(nodeId: number, type: EBagItemType) {
        this.nodeId = nodeId;
        this.type = type;
    }

    private onClicked() {
        switch (this.selfPanel.curView) {
            case 1:
                this.onEquipClick();
                break;
            case 2:
                this.onTriggerClick();
                break;
            default:
                this.onEquipClick();
        }
    }

    /** 装备东西点击回调 */
    private onEquipClick() {
        if (!this.data) {
            return;
        }
        if (this.isSelected) {
            EquipDefine.EquipItem(null);
        } else {
            EquipDefine.EquipItem(this.data.guid);
            let itemCfg = GameConfig.Item.getElement(this.data.cfgId);
            if (itemCfg) {
                Tips.show(CommonUtils.formatString(GameConfig.Language.Door_Tips6.Value, itemCfg.tip));
            }
        }
    }

    /** 改变顺序点击回调 */
    private onTriggerClick() {
        if (UIService.getUI(ItemUseBox).visible) {
            return;
        }
        if (this.selfPanel.isChangeMode) {
            this.triggerMove();
        } else {
            const lastClickedItem = this.selfPanel.checkExistSelectedItem();
            lastClickedItem && lastClickedItem.onSelect.call();
            if (this.data) {
                if (this != lastClickedItem) {
                    Tips.show(this.cfg.name);
                    UIService.showUI(this.operateHud, UILayerOwn, this);
                    this.onSelect.call();
                }
            }
        }
    }

    /** 第一版 直接交换版 */
    private triggerChange() {
        const lastClickedItem = this.selfPanel.checkExistSelectedItem();
        if (!lastClickedItem && !this.data) {
            return;
        }
        if (this.data) {
            Tips.show(this.cfg.name);
        }
        if (lastClickedItem) {
            lastClickedItem.onSelect.call();
            if (lastClickedItem != this) {
                // 两个配置相同的情况，考虑合并
                if (lastClickedItem.data && this.data && lastClickedItem.data.cfgId === this.data.cfgId) {
                    this.selfPanel.reqMergeTwoItem(lastClickedItem, this);
                }
                // 配置不同，才交换
                else {
                    this.selfPanel.reqChangeTwoItem(lastClickedItem, this);
                }
            }
        } else {
            this.onSelect.call();
        }
    }

    /** 第二版 有触发移动操作前的交换 */
    private triggerMove() {
        const lastClickedItem = this.selfPanel.checkExistSelectedItem();
        if (!lastClickedItem && !this.data) {
            return;
        }
        lastClickedItem.onSelect.call();
        if (lastClickedItem != this) {
            // 两个配置相同的情况，考虑合并
            if (lastClickedItem.data && this.data && lastClickedItem.data.cfgId === this.data.cfgId) {
                this.selfPanel.reqMergeTwoItem(lastClickedItem, this);
            }
            // 配置不同，才交换
            else {
                this.selfPanel.reqChangeTwoItem(lastClickedItem, this);
            }
        }
        this.selfPanel.exitChangeMode();
    }

    public setSelected(isTrue: boolean) {
        this.isSelected = isTrue;
        this.img_line.imageColor = isTrue ? BagItemUI.selectColor : BagItemUI.unSelectColor;
        if (!isTrue) {
            this.hideAllInfo();
        }
        ;
    }

    /**
     * 设置这个格子的数据
     * @param data
     * @param needSync 是否需要同步，默认不用
     * @returns
     */
    public setData(data: BagItemData, needSync: boolean = false) {
        if (data.count <= 0) {
            this.setAsEmpty();
            return;
        }
        this.data = data;
        // nodeId变了需要同步
        if (this.data.nodeId != this.nodeId || needSync) {
            this.data.nodeId = this.nodeId;
            this.selfPanel.syncItemData();
        }
        let cfg = GameConfig.Item.getElement(data.cfgId);
        this.cfg = cfg;
        if (!cfg) {
            console.error(`item表找不到这个配置啊${data.cfgId}`);
            return;
        }
        this.img_prop.visibility = SlateVisibility.SelfHitTestInvisible;
        this.img_prop.imageGuid = cfg.icon;
        if (cfg.maxCount > 1) {
            this.text_num.text = data.count.toString();
        } else {
            this.text_num.text = "";
        }

        if (GlobalSwitch.enableBagItemMark()) {
            let txtTips: string;
            if (cfg.clazz === "BuildingItem") {
                txtTips = GameConfig.Language["ItemType_03"].Value;
                if (cfg.id === 1) {
                    txtTips = GameConfig.Language["ItemType_01"].Value;
                }
            } else {
                txtTips = GameConfig.Language["ItemType_02"].Value;
            }
            this.text_type.text = txtTips;
        }

        this.img_quality.imageGuid = GameConfig.ItemQuality.getElement(cfg.quality)?.imgGuid ?? "";

        this.hideAllInfo();
    }

    private readonly emptyQualityId = 1;

    public setAsEmpty() {
        this.img_quality.imageGuid = GameConfig.ItemQuality.getElement(this.emptyQualityId).imgGuid;
        this.data = null;
        this.cfg = null;
        this.img_prop.visibility = SlateVisibility.Collapsed;
        this.text_num.text = "";
        this.text_type.text = "";
        this.hideAllInfo();
    }
}
