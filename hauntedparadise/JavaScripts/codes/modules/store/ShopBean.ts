/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-02-26 11:08:40
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-05 14:34:48
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\store\ShopBean.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { IShopElement } from "../../../config/Shop";
import { MainUI } from "../../ui/MainUI";
import UIShop from "./ui/UIShop";

export default class ShopBean {

    private _shopID: number = 1
    private _shopData: IShopElement[] = []
    private _isReady: boolean = false;
    private _shopCamera: Camera;
    private _shopPoint: mw.GameObject;
    private _playerCamera: Camera;
    private _models: Map<number, mw.GameObject> = new Map();
    private _curItem: mw.GameObject;
    private _curItemID: number;
    private _tempRotation: Rotation = Rotation.zero;
    constructor(shopID: number, camera: Camera, point: mw.GameObject) {
        this._shopID = shopID;
        this._shopCamera = camera;
        this._shopPoint = point;
        this._shopData = GameConfig.Shop.getAllElement().filter(e => e.shopID == shopID);
        this._playerCamera = Camera.currentCamera;
        this.initShop()
    }

    async initShop() {
        if (!this._shopCamera || !this._shopPoint || !this._shopData) return
        this._shopData.forEach(async e => {
            let item = await GameObject.asyncSpawn(e.modelGuid)
            if (!item) return
            if (e.otherRot) item.worldTransform.rotation = new Rotation(e.otherRot.x, e.otherRot.y, e.otherRot.z)
            if (e.otherScale) item.worldTransform.scale = e.otherScale;
            item.worldTransform.position = this._shopPoint.worldTransform.position.clone()
            if (e.otherLoc) item.worldTransform.position = item.worldTransform.position.add(e.otherLoc)
            item.setVisibility(mw.PropertyStatus.Off, true)
            this._models.set(e.id, item)
        })
        this._isReady = true;
    }

    public openStore() {
        if (!this._isReady) return
        Camera.switch(this._shopCamera);
        UIService.show(UIShop, this._shopID)
        UIService.hide(MainUI)
    }

    public closeStore() {
        Camera.switch(this._playerCamera);
        UIService.hide(UIShop)
        UIService.show(MainUI)
    }

    public selectItem(itemID: number) {
        if (!this._models.has(itemID)) return
        if (this._curItem) {
            let data = GameConfig.Shop.getElement(this._curItemID)
            this._curItem.setVisibility(mw.PropertyStatus.Off, true);
            this._curItem.worldTransform.rotation = data.otherRot ? new Rotation(data.otherRot.x, data.otherRot.y, data.otherRot.z) : Rotation.zero;
        }
        let item = this._models.get(itemID)
        item.setVisibility(mw.PropertyStatus.On, true)
        this._curItem = item
        this._curItemID = itemID
        let data = GameConfig.Shop.getElement(this._curItemID)
        this._tempRotation = data.otherRot ? new Rotation(data.otherRot.x, data.otherRot.y, data.otherRot.z) : Rotation.zero;
    }

    public rotateModel(state: boolean) {
        if (!this._curItem) return
        let delta = state ? -10 : 10
        this._tempRotation.z += delta
        this._curItem.worldTransform.rotation = this._tempRotation
    }

    public setRotate(rotation: Rotation) {
        if (this._curItem) this._curItem.worldTransform.rotation = rotation
    }

    public setScale(scale: Vector) {
        if (this._curItem) this._curItem.worldTransform.scale = scale
    }
    public setPosition(pos: Vector) {
        if (this._curItem) this._curItem.worldTransform.position = this._curItem.worldTransform.position.add(pos)
    }
}