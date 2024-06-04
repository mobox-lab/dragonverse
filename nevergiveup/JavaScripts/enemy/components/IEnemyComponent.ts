import { EEnemyComponentType } from "../../tool/Enum";
import { Enemy } from "../EnemyBase";

// Component Interfaces
export abstract class IEnemyComponent {
    abstract onUpdate(dt: number): void;
    abstract init(): Promise<void>;
    abstract onHurt(damage: { amount: number }, types: EEnemyComponentType[]): void;
    abstract onDestroy();
    abstract get type(): EEnemyComponentType;
    abstract get name(): string;

    aura: GameObject;
    attached: boolean;
    update(dt: number): void {
        this.onUpdate(dt);
        if (!this.attached && this.enemy.go && this.aura) {
            this.enemy.go.attachToSlot(this.aura, HumanoidSlotType.Root);
            let z = this.enemy.go.getBoundingBoxExtent().z / 2;
            this.aura.localTransform.position = new Vector(0, 0, z);
            this.aura.localTransform.scale = new Vector(1);
            this.attached = true;
        }
    }

    destroy(): void {
        this.onDestroy();
        if (this.aura) {
            GameObjPool.despawn(this.aura);
            this.aura = null;
        }
    }
    enemy: Enemy;
}