/*
 * @Author       : aolin.dai aolin.dai@appshahe.com
 * @Date         : 2023-03-05 10:33:18
 * @LastEditors  : dal
 * @LastEditTime : 2023-12-26 15:34:42
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\meleeweapon\MeleeWeaponS.ts
 * @Description  : 
 */

import MeleeWeaponModuleC from "./MeleeWeaponC";

export default class MeleeWeaponModuleS extends ModuleS<MeleeWeaponModuleC, null> {

    /** 请求攻击 */
    @Decorator.noReply()
    net_reqAtk(pid: number, comboIndex: number) {
        this.getAllClient().net_resAtk(pid, comboIndex);
    }
}