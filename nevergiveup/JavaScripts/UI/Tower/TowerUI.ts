/*
 * @Author: shifu.huang
 * @Date: 2023-12-15 11:43:27
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-19 11:21:46
 * @FilePath: \nevergiveup\JavaScripts\UI\Tower\TowerUI.ts
 * @Description: 修改描述
 */

/**
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.14-15.04.46
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import Gtk from "gtoolkit";
import { GameManager } from "../../GameManager";
import { TowerEvent } from "../../Modules/TowerModule/TowerEnum";
import { TowerModuleC } from "../../Modules/TowerModule/TowerModuleC";
import TowerUI_Generate from "../../ui-generate/Tower/TowerUI_generate";
import TowerItemUI from "./TowerItemUI";
import TowerShopUI from "./TowerShopUI";

export class TowerConfigConstants {
    static readonly maxEquip = 8;
}

export default class TowerUI extends TowerUI_Generate {
    private _towerItemUIs: TowerItemUI[] = [];

    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        for (let i = 0; i < TowerConfigConstants.maxEquip; i++) {
            let item = UIService.create(TowerItemUI);
            this.towerItemCanvas.addChild(item.uiObject);
            this._towerItemUIs.push(item);
        }
        this.shopBtn.onClicked.add(() => {
            if (GameManager.getStageClient()) {
                return;
            }
            UIService.show(TowerShopUI, { isShop: false });
        });
        this.destroyBtn.onClicked.add(() => {
            ModuleService.getModule(TowerModuleC).cancelChosenTower();
        });
        Event.addLocalListener(TowerEvent.ChooseTower, (ui: UIScript) => {
            this.destroyBtn.visibility = ui == null ? SlateVisibility.Hidden : SlateVisibility.Visible;
        });
        UIService.getUI(TowerUI).setStageTowerUI(false);
    }

    get towerItemUIs() {
        return this._towerItemUIs;
    }

    // public setInteractBtn(pos: Vector) {
    // 	this.interactBtn.position =
    // 		InputUtil.projectWorldPositionToWidgetPosition(pos).screenPosition.subtract(UIService.getUI(TowerUI).interactBtn.size.divide(2));
    // }

    /**
     * 初始化塔的UI
     * @param towerIDs 塔表的ID
     * @returns
     */
    public setTowerUI(towerIDs: number[]) {
        if (!towerIDs || towerIDs.length < 0) return;
        for (let i = 0; i < TowerConfigConstants.maxEquip; i++) {
            this._towerItemUIs[i]?.init(towerIDs[i] ? towerIDs[i] : null);
        }
        Event.dispatchToLocal(TowerEvent.ChooseTower, null);
    }

    public setStageTowerUI(inStage?: boolean) {
        const [leftUpPosX, leftUpPosY] = [340, 850];
        const [leftPadding, gap, itemWidth] = [215, 15, 99];
        const maxWidth = leftPadding + (itemWidth + gap) * TowerConfigConstants.maxEquip;  // 最大可能长度（装满TowerConfigConstants.maxEquip个塔） 
        if (inStage) {
            let containerWidth = leftPadding;
            for (let i = 0; i < TowerConfigConstants.maxEquip; i++) {
                if (this._towerItemUIs[i]?.cfg) containerWidth += gap + itemWidth;
                Gtk.trySetVisibility(this._towerItemUIs[i], this._towerItemUIs[i]?.cfg ? mw.SlateVisibility.Visible : mw.SlateVisibility.Hidden);
            }
            this.mImage_5.size = new Vector(containerWidth, 216.00);
            this.shopBtn.size = new Vector(containerWidth, 216.00);
            this.destroyBtn.position = new Vector(containerWidth - 20, -30);
            this.towerCanvas.position = new Vector((maxWidth - containerWidth) / 2 + leftUpPosX, leftUpPosY);
        } else {
            for (let i = 0; i < TowerConfigConstants.maxEquip; i++) {
                Gtk.trySetVisibility(this._towerItemUIs[i], mw.SlateVisibility.Visible);
            }
            this.mImage_5.size = new Vector(maxWidth, 216.00);
            this.shopBtn.size = new Vector(maxWidth, 216.00);
            this.destroyBtn.position = new Vector(maxWidth - 20, -30);
            this.towerCanvas.position = new Vector(leftUpPosX, leftUpPosY);
        }
    }
    public setPriceVisible(visibility: boolean) {
        // for (let i = 0; i < this.towerItemUIs.length; i++) {
        // 	this.towerItemUIs[i].setPriceVisible(visibility);
        // }
    }
}
