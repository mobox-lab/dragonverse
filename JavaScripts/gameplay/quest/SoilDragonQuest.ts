import { Quest } from "./Quest";


/**
 * 土龙任务
 */
export class SoilDragonQuest extends Quest {
    protected get progress(): number {
        return 0;
    }

    protected onSerializeCustomData(customData: string): void {
        Player.localPlayer.character.velocity;
        Player.localPlayer.character.addImpulse;
    }

    onActivated(): void {
    }

    onComplete(): void {
    }
}