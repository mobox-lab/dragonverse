import { MainUI } from "../../ui/MainUI";
import { InterEvtNameDef, ObjInterDefine } from "./ObjInterDefine";
import { PlayerModuleS } from "../player/PlayerModuleS";
import { HumanInteract } from "./objInter/HumanInteract";
import ObjInterScript from "./objInter/ObjInterScript";
export class PlayerInterData {
    public constructor(public char: Character) {
    }
    public lastValidPos(): Vector {
        if (this.validPos) {
            return this.validPos;
        }
        return this.char.worldTransform.position;
    }

    public validPos: Vector;

    public stat: string = "";
}

export class PlayerInterModuleC extends ModuleC<PlayerInterModuleS, null> {
    private _playerInter: HumanInteract;

    private _bindScript: ObjInterScript;

    private _isInterLoading: boolean = false;

    protected onStart(): void {
        this._playerInter = new HumanInteract()
    }

    protected onEnterScene(sceneType: number): void {
        this._playerInter.initInterObj();
    }

    public async reqInter(interObj: ObjInterScript) {
        if (this._isInterLoading) {
            console.error("正在交互加载中")
            return false;
        }
        if (this._playerInter.isInteracting) {
            console.error("正在交互中")
            return false;
        }
        this._isInterLoading = true;
        await this._playerInter.initInterObj();
        let offset = interObj.gameObject.worldTransform.rotation.rotateVector(interObj.releasePos);
        let pos = interObj.gameObject.worldTransform.position.clone().add(offset);
        if (!interObj.isSingle) {
            this.server.net_setPlayerValidPos(interObj.safeStat, pos)//this.localPlayer.character.worldTransform.position);
        }
        else {
            let res = await this.server.net_setPlayerValidPos(interObj.safeStat, pos, interObj.gameObject.gameObjectId);
            if (!res) {
                this._isInterLoading = false;
                return false;
            }
        }
        this._bindScript = interObj;
        this._playerInter.enterInteract(interObj.interactStance, interObj.gameObject, interObj.interSlot, interObj.isRotateCamera);
        this._isInterLoading = false;
        UIService.getUI(MainUI).setHandVisible(true, 3);
        return true;
    }

    /** 是否在交互建筑的标记 */
    public interBuildingMark: boolean = false;

    public reqStopInter(resetLoc: boolean = true) {
        if (!this._playerInter.isInteracting) {
            return false;
        }

        if (this._bindScript) {
            this._playerInter.exitInteract(resetLoc, this._bindScript.releasePos);
        }
        else {
            this._playerInter.exitInteract(resetLoc);
        }

        this.server.net_freePlayerPos();
        if (this._bindScript) {
            this._bindScript.leave();
        }

        if (this.interBuildingMark) { Event.dispatchToLocal("ClearBuildingDirtyMark"); this.interBuildingMark = false; }

        UIService.getUI(MainUI).setHandVisible(false, 3);
        return true;
    }
}

export class PlayerInterModuleS extends ModuleS<PlayerInterModuleC, null> {
    private _playerInfoMap: Map<number, PlayerInterData> = new Map();

    private _interStatMap: Map<string, number> = new Map();
    private _player2InterMap: Map<number, string> = new Map();

    public getPlayerPos(char: Character) {
        if (this._playerInfoMap.has(char.player.playerId)) {
            return this._playerInfoMap.get(char.player.playerId).lastValidPos();
        }
        else {
            return char.worldTransform.position;
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            if (!this._playerInfoMap.has(player.playerId)) {
                this._playerInfoMap.delete(player.playerId);
            }
            if (this._player2InterMap.has(this.currentPlayerId)) {
                let guid = this._player2InterMap.get(this.currentPlayerId);
                this._player2InterMap.delete(this.currentPlayerId);
                this._interStatMap.delete(guid);
            }
        } catch (error) {
            console.log("PlayerInterModuleS onPlayerLeft error:", error);
        }
    }

    public getPlayerIsInter(player: Player) {
        return this._player2InterMap.has(player.playerId) && this._playerInfoMap.get(player.playerId).validPos != null;
    }

    public getPlayerInterStat(player: Player): string {
        if (this._playerInfoMap.has(player.playerId)) {
            return this._playerInfoMap.get(player.playerId).stat;
        }
        else {
            return "";
        }
    }

    public net_setPlayerValidPos(interStat: string, pos: Vector, guid: string = "") {
        if (guid != "") {
            if (this._interStatMap.has(guid)) {
                return false;
            }
            this._interStatMap.set(guid, this.currentPlayerId)
            this._player2InterMap.set(this.currentPlayerId, guid);
        }
        if (!this._playerInfoMap.has(this.currentPlayerId)) {
            this._playerInfoMap.set(this.currentPlayerId, new PlayerInterData(this.currentPlayer.character));
        }
        this._playerInfoMap.get(this.currentPlayerId).validPos = pos;
        this._playerInfoMap.get(this.currentPlayerId).stat = interStat;
        this.currentPlayer.character.setCollision(PropertyStatus.Off);
        return true;
    }

    public net_freePlayerPos() {
        if (this._playerInfoMap.has(this.currentPlayerId)) {
            this._playerInfoMap.get(this.currentPlayerId).validPos = null;
            this._playerInfoMap.get(this.currentPlayerId).stat = "";
        }
        if (this._player2InterMap.has(this.currentPlayerId)) {
            let guid = this._player2InterMap.get(this.currentPlayerId);
            this._player2InterMap.delete(this.currentPlayerId);
            this._interStatMap.delete(guid);
        }
        this.currentPlayer.character.setCollision(PropertyStatus.On);
    }
}