import { EEnemyComponentType } from "../../tool/Enum";
import { IEnemyComponent } from "./IEnemyComponent";

/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-11 14:19:34
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-12 16:24:59
 * @FilePath     : \nevergiveup\JavaScripts\enemy\components\ImmueControlComponent.ts
 * @Description  : 修改描述
 */
export class ImmuneControlComponent extends IEnemyComponent {
    get name(): string {
        return "免控";
    }
    get type(): EEnemyComponentType {
        return EEnemyComponentType.ImmuneControl;
    }

    async init() {
        this.aura = await GameObjPool.asyncSpawn("C6075BCB4C6DD6A7ADFD62A16607051F");
    }


    onUpdate(dt: number) {
    }

    onHurt(damage: { amount: number; }): void {
    }

    onDestroy() {
    }
}