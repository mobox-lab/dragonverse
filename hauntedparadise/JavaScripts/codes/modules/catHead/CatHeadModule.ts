import { GameConfig } from "../../../config/GameConfig";
import { SoundConfig } from "../../../config/Sound";
import { TipsUI } from "../../ui/TipsUI";
import { CommonUtils } from "../../utils/CommonUtils";
import { GhostBaseStateMachine } from "../../utils/GhostStateMachine";
import MusicMgr from "../../utils/MusicMgr";
import Tips from "../../utils/Tips";
import SoundController from "../controller/SoundController";
import { CatEvt } from "../inter/evtCom/CatEvt";
import { CatPlayerData } from "./CatPlayerData";
import { CatHeadStatType, CatHeadStateMachine } from "./states/CatHeadStatType";
import { BaseCatHeadState, CatHeadIdleState, CatHeadPreState, CatHeadRunState } from "./states/CatHeadState";
export const CatHeadRunEvt = "CatHeadRun";
export const CatHeadStopEvt = "CatHeadStop";


export class CatHeadModuleC extends ModuleC<CatHeadModuleS, null>{
    /** curCathead trigger enter mark */
    private _curCatArea: number = 0;

    /**
     * on player enter a cat area with a areaid
     * @param areaId cat area id
     */
    public enterCatArea(areaId: number) {
        this._curCatArea = areaId
        this.server.net_enterCatArea(areaId);
    }

    /**
     * when player leave cat area
     */
    public leaveCatArea() {
        this.server.net_leaveCatArea();
    }

    /**
     * when player enter safe area
     * @param isSafe 
     */
    public setPlayerSafe(isSafe: boolean) {
        this.server.net_setPlayerSafe(isSafe);
    }

    /**
     * when server enter preStat
     */
    public net_changeStats(stat: CatHeadStatType, customData: number[]) {
        if (stat == CatHeadStatType.Pre) {
            TipsUI.showCatTips(CommonUtils.formatString(GameConfig.CatHead.tips1.string, GameConfig.CatHead.preTime.number));
            MusicMgr.instance.play(GameConfig.CatHead.preSound.number);
        }
        else if (stat == CatHeadStatType.Run) {
            TipsUI.showCatTips(CommonUtils.formatString(GameConfig.CatHead.tips3.string));
        }
        else if (stat == CatHeadStatType.Idle) {
            TipsUI.showCatTips(CommonUtils.formatString(GameConfig.CatHead.tips4.string));
        }
    }

    public reqActiveHead(goid: string, areaId: number) {
        this.server.net_activeHead(goid, areaId);
    }
}


export class CatHeadModuleS extends ModuleS<CatHeadModuleC, null>{
    /** control cat head stats flow */
    private _fsm: CatHeadStateMachine;

    /** every stageData */
    private _dataArr: Map<number, CatPlayerData> = new Map();

    private _playerSafeMap: Map<number, boolean> = new Map();

    protected onStart(): void {
        let ids = GameConfig.CatHead.allAreaIds.ids;
        if (ids && ids.length == 0) {
            return;
        }
        this._fsm = new CatHeadStateMachine();
        this._fsm.register(CatHeadStatType.Idle, new CatHeadIdleState(this._fsm, this));
        this._fsm.register(CatHeadStatType.Pre, new CatHeadPreState(this._fsm, this));
        this._fsm.register(CatHeadStatType.Run, new CatHeadRunState(this._fsm, this));
        ids.forEach(e => {
            this._dataArr.set(e, new CatPlayerData());
        })
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            this._dataArr.forEach(e => {
                let index = e.entryPlayerIds.indexOf(player.playerId);
                if (index == -1) {
                    return;
                }
                e.entryPlayerIds.splice(index, 1);
            })
            if (this._playerSafeMap.has(player.playerId)) {
                this._playerSafeMap.delete(player.playerId);
            }
        } catch (error) {
            console.error(error);
        }
    }

    net_leaveCatArea() {
        this._dataArr.forEach(e => {
            let index = e.entryPlayerIds.indexOf(this.currentPlayerId);
            if (index == -1) {
                return;
            }
            e.entryPlayerIds.splice(index, 1);
        })
    }

    public net_enterCatArea(areaId: number) {
        if (!this._dataArr.has(areaId)) {
            return;
        }
        this.net_leaveCatArea();
        this.getTargetAreaData(areaId).entryPlayerIds.push(this.currentPlayerId);
    }

    public getTargetAreaData(areaId: number) {
        return this._dataArr.get(areaId);
    }

    public getAllAreaData() {
        return this._dataArr;
    }

    protected onUpdate(dt: number): void {
        this._fsm?.update(dt);
    }

    @Decorator.noReply()
    net_setPlayerSafe(isSafe: boolean) {
        this._playerSafeMap.set(this.currentPlayerId, isSafe);
    }
    /**
     * get is this player in cat safe area
     * @param playerId 
     */
    public getIsPlayerSafe(playerId: number) {
        if (this._playerSafeMap.has(playerId)) {
            return this._playerSafeMap.get(playerId);
        }
        return false;
    }

    public reqChangeStats(stat: CatHeadStatType, data: number[]) {
        this.getAllClient().net_changeStats(stat, data);
    }


    net_activeHead(goid: string, areaId: number) {
        let data = this.getTargetAreaData(areaId);
        if (data) {
            if (!data.contributePlayerIds.includes(this.currentPlayerId)) {
                data.contributePlayerIds.push(this.currentPlayerId)
            }
            data.restTime -= GameConfig.CatHead.decTime.number;
        }
        //Event.dispatchToAllClient(CatEvt.evtName, goid);
    }
}