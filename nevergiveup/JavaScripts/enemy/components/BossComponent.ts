/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-11 14:20:01
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-15 14:48:41
 * @FilePath     : \nevergiveup\JavaScripts\enemy\components\BossComponent.ts
 * @Description  : 修改描述
 */
import { EnemyActions } from "../../Actions";
import { EEnemyComponentType } from "../../tool/Enum";
import { IEnemyComponent } from "./IEnemyComponent";

export class BossComponent extends IEnemyComponent {
    get name(): string {
        return "";
    }
    get type(): EEnemyComponentType {
        return EEnemyComponentType.Boss;
    }
    scaled: boolean = false;

    async init() {
        if (this.enemy.headUI) {
            GameObjPool.despawn(this.enemy.headUI);
            this.enemy.headUI = null;
        }
        EnemyActions.onBossSpawned.call(this.enemy);
        this.aura = await GameObjPool.asyncSpawn("FAA0A46C41C8073223380B9D1B8F0A3A");
    }

    onUpdate(dt: number) {
        if (!this.scaled && this.enemy.go) {
            this.enemy.go.worldTransform.scale = new Vector(2);
            this.scaled = true;
        }
    }

    onHurt(damage: { amount: number }): void {
        EnemyActions.onBossSpawned.call(this.enemy);
    }

    onDestroy() {
        EnemyActions.onBossDie.call(this.enemy);
    }
}
