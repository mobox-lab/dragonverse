/** 
 * @Author       : xiaohao.li
 * @Date         : 2024-01-15 13:38:19
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-15 14:43:32
 * @FilePath     : \nevergiveup\JavaScripts\enemy\components\ArmoredComponent.ts
 * @Description  : 修改描述
 */
/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-29 15:43:49
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-11 09:43:57
 * @FilePath     : \nevergiveup\JavaScripts\enemy\components\ArmoredComponent.ts
 * @Description  : 修改描述
 */
import { GameConfig } from "../../config/GameConfig";
import { EEnemyComponentType } from "../../tool/Enum";
import { IEnemyComponent } from "./IEnemyComponent";

export class ArmoredComponent extends IEnemyComponent {
    get name(): string {
        return "装甲";
    }
    get type(): EEnemyComponentType {
        return EEnemyComponentType.Armored;
    }

    async init() {
        this.aura = await GameObjPool.asyncSpawn("BD492B42469B434FEEBEEF9D20C5F039");
    }

    onUpdate(dt: number) {


    }

    onHurt(damage: { amount: number }, types: EEnemyComponentType[]): void {
        let damageEnhanse = GameConfig.Global.getAllElement()[0].armoredEnemyDamageEnhancement;
        let damageRecuction = GameConfig.Global.getAllElement()[0].armoredEnemyDamageReduction;

        if (types.indexOf(this.type) >= 0) {
            damage.amount *= damageEnhanse;
        }
        else {
            damage.amount *= damageRecuction;
        }
    }

    onDestroy() {
    }
}