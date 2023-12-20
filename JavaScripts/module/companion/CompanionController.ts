
import CompanionRoot from "../../gameplay/archtype/entity/CompanionRoot";


export interface ICompanionEntityCollection {



    /**
     * 
     * @param playerId 
     */
    getController(playerId?: number): CompanionController;
}

export class CompanionController {


    constructor(public playerId: number) {

    }



    private _companionInstance: Map<string, CompanionRoot> = new Map();


    public registerCompanion(entity: CompanionRoot) {

        let sign = entity.sign;
        if (this._companionInstance.has(sign)) {

            return false;
        }

        if (entity.playerId !== this.playerId) {

            return false;
        }

        this._companionInstance.set(sign, entity);
        entity.onDestroyed.add(this.onEntityDestroyed, this)
        return true;

    }

    public getCurrentCompanion() {
        let go: CompanionRoot = this._companionInstance.values().next().value
        if (!go) {
            return null;
        }
        return go.sign;
    }


    public removeCompanionWithSign(sign: string): void {

        let entity = this._companionInstance.get(sign);

        if (!entity) {
            return;
        }
        this._companionInstance.delete(sign);
        entity.destroy();
    }



    private onEntityDestroyed(entity: CompanionRoot) {

        if (entity.playerId !== this.playerId) return;
        this._companionInstance.delete(entity.sign);
    }


    public clear(): void {

        for (const iterator of this._companionInstance.values()) {
            iterator.destroy();
        }
        this._companionInstance.clear();
    }


    public async createCompanion(prefab: string, sign: string, nickName: string) {

        let player = mw.Player.getPlayer(this.playerId).character;
        let script = await mw.Script.spawnScript(CompanionRoot, true, player)
        script.displayGuid = prefab;
        script.sign = sign;
        script.playerId = this.playerId;
        script.nickName = nickName;
        script.initializeComplete();
        this.registerCompanion(script);
    };



}