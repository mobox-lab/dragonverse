/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-11 14:18:42
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-05 16:58:17
 * @FilePath     : \nevergiveup\JavaScripts\enemy\components\FlyingComponent.ts
 * @Description  : 修改描述
 */
import { EEnemyComponentType } from "../../tool/Enum";
import { IEnemyComponent } from "./IEnemyComponent";

// 上下浮动距离
const HOVER_DISTANCE = 20;
// 上下浮动速度
const HOVER_SPEED = 4;

export class FlyingComponent extends IEnemyComponent {
    get name(): string {
        return "飞行";
    }
    private _time: number = 0;
    private _tempPos: mw.Vector = mw.Vector.zero;
    get type(): EEnemyComponentType {
        return EEnemyComponentType.Flying;
    }


    async init() {
        this.aura = await GameObjPool.asyncSpawn("7D03B5434673E3F5E6A16F9AA74C9372");
    }

    onUpdate(dt: number) {
        this.hover(dt);
    }

    hover(dt: number) {
        // hover up and down
        if (this.enemy && this.enemy.go) {
            this._time += dt;
            let hoverHeight = HOVER_DISTANCE;
            let hoverSpeed = HOVER_SPEED;
            let hoverOffset = Math.sin(this._time * hoverSpeed) * hoverHeight;
            this._tempPos.x = this.enemy.go.worldTransform.position.x;
            this._tempPos.y = this.enemy.go.worldTransform.position.y;
            this._tempPos.z = this.enemy.go.worldTransform.position.z;
            this._tempPos.z += hoverOffset;
            this.enemy.go.worldTransform.position = this._tempPos;
        }
    }

    onHurt(damage: { amount: number; }): void {
    }

    onDestroy() {
    }
}