import { EModule_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { Pet } from "./Pet";
import { PetModuleS } from "./PetModuleS";



export class PetModuleC extends ModuleC<PetModuleS, null> {
    // 当前自己的宠物
    public curPet: Pet = null;

    protected onStart(): void {
        EventManager.instance.add(EModule_Events.createPet, this.createPet, this);
        EventManager.instance.add(EModule_Events.destroyPet, this.destroyPet, this);
    }

    protected onUpdate(dt: number): void {
        this.curPetUpdate(dt);
    }


    /**
     * 自己的宠物轮询
     */
    private curPetUpdate(dt: number): void {
        if (this.curPet == null) return;
        this.curPet.onUpdate(dt);
    }

    /**
     * 创建宠物
     * @param player 主人
     * @param prefabGuid 宠物预制体guid
     */
    private createPet(playerId: number, prefabGuid: string) {
        let player = mw.Player.getPlayer(playerId);
        if (player == null || player.character == null) return;
        let character = player.character;

        if (playerId == this.localPlayerId) {
            if (this.curPet == null) {
                this.curPet = new Pet(character, prefabGuid);
            }
        }
    }

    /**
     * 销毁宠物
     * @param player 主人
     */
    private destroyPet(playerId: number): void {

        if (playerId == this.localPlayerId && this.curPet != null) {
            this.curPet.destroy();
            this.curPet = null;
        }
    }
}