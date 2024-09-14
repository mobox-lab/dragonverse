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
import LobbyUI from "../LobbyUI";

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
            if(ui) {
                this.destroyBtn.visibility = SlateVisibility.Visible;
                this.mImage_mid.visibility = SlateVisibility.Hidden;
                this.destroyBtn.enable = true;
            } else {
                this.destroyBtn.visibility = SlateVisibility.Hidden;
                this.mImage_mid.visibility = SlateVisibility.HitTestInvisible;
                this.destroyBtn.enable = false;
            }
        });
        this.setStageTowerUI(false);
        this.setBtn.onClicked.add(() => {
            Gtk.trySetVisibility(UIService.getUI(LobbyUI).teamCanvas, mw.SlateVisibility.Visible);
            this.hide();
        })
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
        if(inStage) this.show();
        Gtk.trySetVisibility(this.settingUp, inStage ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.Visible);
        Gtk.trySetVisibility(this.mImage_mid, inStage? mw.SlateVisibility.HitTestInvisible: mw.SlateVisibility.Hidden);
        const [leftUpPosX, leftUpPosY] = [456, 850];
        const [leftPadding, rightPadding, gap, itemWidth] = [0, 0, 8, 120];
        const [borderLeftUpPosY] = [60]
        const [borderWidthLeft, borderPaddingLeft, borderPaddingBottom, borderWidthBottom] = [21, 2, 0, 11]
        const maxWidth = leftPadding + rightPadding + (itemWidth + gap) * TowerConfigConstants.maxEquip - gap;  // 最大可能长度（装满TowerConfigConstants.maxEquip个塔）
        let computeWidth = maxWidth;
        if (inStage) {
            let containerWidth = leftPadding + rightPadding - gap;
            for (let i = 0; i < TowerConfigConstants.maxEquip; i++) {
                if (this._towerItemUIs[i]?.cfg) containerWidth += gap + itemWidth;
                Gtk.trySetVisibility(this._towerItemUIs[i], this._towerItemUIs[i]?.cfg ? mw.SlateVisibility.Visible : mw.SlateVisibility.Hidden);
            }
            computeWidth = containerWidth;
            this.destroyBtn.position = new Vector(Math.floor(containerWidth / 2) - 16.5, 190);
            this.towerCanvas.position = new Vector((maxWidth - containerWidth) / 2 + leftUpPosX, leftUpPosY);
        } else {
            for (let i = 0; i < TowerConfigConstants.maxEquip; i++) {
                Gtk.trySetVisibility(this._towerItemUIs[i], mw.SlateVisibility.Visible);
            }
            Gtk.trySetVisibility(this.destroyBtn, mw.SlateVisibility.Collapsed);
            this.setBtn.position = new Vector(maxWidth/2 - 17,190.00)
            this.towerCanvas.position = new Vector(leftUpPosX, leftUpPosY);
        }
        this.borderCanvas.position = new Vector(-borderWidthLeft-borderPaddingLeft, borderLeftUpPosY);
        this.mBgImg.position = new Vector(-borderWidthLeft/2-borderPaddingLeft, borderLeftUpPosY);

        this.mBgImg.size = new Vector(computeWidth + (borderWidthLeft/2 + borderPaddingLeft) * 2, 216-borderLeftUpPosY+borderPaddingBottom-borderWidthBottom);
        this.shopBtn.size = new Vector(computeWidth, 216.00);
        this.mImage_left.size = new Vector(Math.floor(computeWidth / 2) - 20 + borderWidthLeft + borderPaddingLeft, 216-borderLeftUpPosY+borderPaddingBottom);
        this.mImage_right.size = new Vector(Math.floor(computeWidth / 2) - 20 + borderWidthLeft + borderPaddingLeft, 216-borderLeftUpPosY+borderPaddingBottom);
        
    }
    public setPriceVisible(visibility: boolean) {
        // for (let i = 0; i < this.towerItemUIs.length; i++) {
        // 	this.towerItemUIs[i].setPriceVisible(visibility);
        // }
    }
}
