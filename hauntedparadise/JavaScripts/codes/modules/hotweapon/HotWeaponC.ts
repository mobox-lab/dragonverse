/*
 * @Author       : aolin.dai aolin.dai@appshahe.com
 * @Date         : 2023-03-05 10:33:00
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-17 18:01:14
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\hotweapon\HotWeaponC.ts
 * @Description  : 
 */

import { GameConfig } from '../../../config/GameConfig';
import { IItemElement } from '../../../config/Item';
import { TipsUI } from '../../ui/TipsUI';
import { TimerOnly } from '../../utils/AsyncTool';
import { BagDefine, BagItemData } from '../bag/BagDefine';
import { HotWeapon } from './HotWeapon';
import HotWeaponModuleS from "./HotWeaponS";
import HotWeaponPanel from './ui/HotWeaponPanel';


export default class HotWeaponModuleC extends ModuleC<HotWeaponModuleS, null> {

    /** 自己的武器 */
    private myWeapon: HotWeapon;

    /** 所有人的武器 */
    private weaponMap: Map<number, HotWeapon> = new Map();

    protected onAwake(): void {
        Player.asyncGetLocalPlayer().then((player) => {
            this.myWeapon = new HotWeapon();
            this.weaponMap.set(player.playerId, this.myWeapon);
        });

        Event.addLocalListener(BagDefine.AddItemEvt, this.onItemAdd.bind(this));
    }

    /** 道具改变 */
    private onItemAdd(bagItem: BagItemData) {
        // 装备了武器的前提下，没有子弹，并且捡到了这把枪的子弹
        if (this.myWeapon.isEquip && !this.myWeapon.bulletEnoughInWeapon && this.myWeapon.bulletCheck(bagItem.cfgId)) {
            this.myWeapon.shiftBullet();
        }
    }

    private get panel() {
        return UIService.getUI(HotWeaponPanel);
    }

    private isOwner(pid: number) {
        return pid === this.localPlayerId;
    }

    public equip(itemCfg: IItemElement, weaponGo: GameObject, ownerId: number) {
        let hotWeaponScript = this.weaponMap.get(ownerId);
        if (!hotWeaponScript) { hotWeaponScript = new HotWeapon(); this.weaponMap.set(ownerId, hotWeaponScript); }
        let weaponCfg = GameConfig.HotWeapon.getElement(itemCfg.clazzParam[0]);
        if (this.isOwner(ownerId)) {
            UIService.show(HotWeaponPanel, weaponCfg)
        }
        hotWeaponScript.setWeaponInfo(ownerId, weaponGo, weaponCfg);
    }

    public unEquip(ownerId: number) {
        if (!this.weaponMap.has(ownerId)) { return; }
        this.weaponMap.get(ownerId).clearWeaponInfo();
        if (this.isOwner(ownerId)) {
            UIService.hideUI(this.panel);
        }
    }

    private isTips: boolean = false;
    private tipsTimer: TimerOnly = new TimerOnly();

    public reqFire() {
        if (this.myWeapon.isShifting) {
            console.error("换弹中···");
            return;
        }
        if (!this.myWeapon.bulletEnoughInWeapon) {
            console.error("没子弹了哥们儿···");
            if (!this.isTips) {
                this.isTips = true;
                Event.dispatchToLocal("showTips", "", "tips_show_7");
                this.tipsTimer.setTimeout(() => { this.isTips = false; }, 5e3);
            }
            return;
        }
        let endPos = this.myWeapon.getShootEndLoc();
        let ownerId = this.localPlayerId;
        this.server.net_reqFire(ownerId, endPos, this.myWeapon.backForce);
    }

    /** 请求重载子弹 */
    public reqReloadBullet() {
        this.myWeapon.shiftBullet();
    }

    /** 
     * 响应开火
     * @param ownerId 开火的那个哥们儿
     * @param endPos 结束位置
     */
    public net_resFire(ownerId: number, endPos: Vector) {
        if (!this.weaponMap.has(ownerId)) { return; }
        this.weaponMap.get(ownerId).fire(endPos);
    }
}