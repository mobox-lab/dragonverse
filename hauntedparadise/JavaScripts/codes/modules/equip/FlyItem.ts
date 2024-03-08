/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-01 16:51:47
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-07 15:22:25
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\FlyItem.ts
 * @Description  : 
 */

import { IItemElement } from "../../../config/Item";
import { FlyItemMgr } from "./FlyItemMgr";

export class FlyItem {

    private _target: mw.Player;
    private _obj: mw.GameObject;
    private _startPos: mw.Vector;
    private _ready: boolean = false;
    private _data: IItemElement;
    private _uniqueId: number;

    constructor(uniqueID: number, data: IItemElement, startPos: mw.Vector, target: mw.Player) {
        this._target = target;
        this._uniqueId = uniqueID
        this._data = data;
        if (!this._data || !this._target || !this._target.character) return;
        this._startPos = startPos;
        mw.GameObject.asyncSpawn(this._data.prefab).then(obj => {
            this._obj = obj;
            this._obj.worldTransform.position = this._startPos;
            this._ready = true;
            if (this._data.useSound && this._data.useSound[1]) SoundService.playSound(this._data.useSound[1])
        })
    }

    destroy() {
        this._ready = false;
        this._obj.destroy();
        FlyItemMgr.instance.deleteItem(this._uniqueId);
    }

    async update(dt: number) {
        if (!this._ready) return;
        if (!this._target || !this._target.character || !this._target.character.worldTransform) {
            this.destroy()
            return;
        }
        let dir = Vector.subtract(this._target.character.worldTransform.position, this._obj.worldTransform.position).normalize()
        this._obj.worldTransform.position = this._obj.worldTransform.position.add(dir.multiply(5))
        let distance = Vector.squaredDistance(this._obj.worldTransform.position, this._target.character.worldTransform.position)
        if (distance < 10000) {
            this.destroy()
            console.log("#################命中目标");
            //播放命中音效
            if (this._target && this._target.playerId == Player.localPlayer.playerId) {
                if (this._data.useSound && this._data.useSound[2]) SoundService.playSound(this._data.useSound[2])
            }
            this._data.useEffect[0][2] && this._target.character.loadAnimation(this._data.useEffect[0][2]).play()//被击动画
            //命中特效
            if (this._data.useEffect[0][3]) {
                let hitEffect = await mw.GameObject.asyncSpawn(this._data.useEffect[0][3])
                this._target?.character?.attachToSlot(hitEffect, HumanoidSlotType.Head);
                await TimeUtil.delaySecond(2)
                hitEffect.destroy()
                this._target?.character?.detachFromSlot(hitEffect);
            }
            if (this._data.useEffect[0][4]) {
                let onHitEffect = await mw.GameObject.asyncSpawn(this._data.useEffect[0][4])
                this._target?.character?.attachToSlot(onHitEffect, HumanoidSlotType.Head);
                await TimeUtil.delaySecond(2)
                onHitEffect.destroy()
                this._target?.character?.detachFromSlot(onHitEffect);
            }
        }
    }
}