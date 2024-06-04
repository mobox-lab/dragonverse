/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-11 14:18:04
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-05 16:42:57
 * @FilePath     : \nevergiveup\JavaScripts\enemy\components\StealthComponent.ts
 * @Description  : 修改描述
 */

import { EEnemyComponentType } from "../../tool/Enum";
import { IEnemyComponent } from "./IEnemyComponent";

// Implementing Components
export class StealthComponent extends IEnemyComponent {
    get name(): string {
        return "隐身";
    }
    get type(): EEnemyComponentType {
        return EEnemyComponentType.Stealth;
    }
    async init() {
        this.aura = await GameObjPool.asyncSpawn("E8281AE648F8C89B424C0CAF903BF50A");
    }

    onUpdate(dt: number) {
    }

    onHurt(damage: { amount: number; }): void {
    }

    onDestroy() {
    }
}