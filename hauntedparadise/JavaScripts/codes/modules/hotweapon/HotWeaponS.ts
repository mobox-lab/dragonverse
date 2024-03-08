/*
 * @Author       : aolin.dai aolin.dai@appshahe.com
 * @Date         : 2023-03-05 10:33:18
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-04 18:21:08
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\hotweapon\HotWeaponS.ts
 * @Description  : 
 */

import { CommonUtils } from "../../utils/CommonUtils";
import { BagModuleS } from "../bag/BagModuleS";
import HotWeaponModuleC from "./HotWeaponC";

export default class HotWeaponModuleS extends ModuleS<HotWeaponModuleC, null> {

    @Decorator.noReply()
    public net_reqFire(ownerId: number, endPos: Vector, backForce: Vector) {
        let target = Player.getPlayer(ownerId).character;
        target.addImpulse(backForce, true);
        CommonUtils.getRpcPlayerList(target.worldTransform.position).forEach(player => {
            this.getClient(player).net_resFire(ownerId, endPos);
        });
    }

}