import { PlayerManagerExtesion, } from '../../../../Modified027Editor/ModifiedPlayer';
import { EModule_Events } from "../../../../const/Enum";
import { Globaldata } from "../../../../const/Globaldata";
import { EventManager } from "../../../../tool/EventManager";
import { util } from "../../../../tool/Utils";
import { PlyerState } from "../PlyerState";


/**
 * 死亡状态todo
 */
export class State_Dead extends PlyerState {

    /**死亡特效*/
    private _deadEffects: number[] = [];
    /**死亡时间*/
    private deadTimeOut: number = null;
    /**复活特效 */
    private _ResurgenceEffects: number[] = [];
    /**击杀玩家id */
    private unitId: number = 0;
    /**击杀次数 */
    private deadCount: number = 0;
    /**段位分变化 */
    private _rankScore: number = 0;
    protected onEnter(param: any) {

        this.deadCount = Number(param[0]);
        this.unitId = Number(param[1]);
        this._rankScore = Number(param[2]);
        this.clearDeadTime();
        let anim = PlayerManagerExtesion.rpcPlayAnimationLocally(this.currentPlayer.character, Globaldata.player_deadAnim, 1, 1)
        let time = anim.length;

        EventManager.instance.call(EModule_Events.player_Dead, this.unitId, this._rankScore);
        this.deadTimeOut = setTimeout(() => {
            this.deadTimeOut = null;
        }, time * 1000);

        util.playEffecstOnPlayer(this.currentPlayer.playerId, this._deadEffects, Globaldata.deatheffetIds);
    }
    protected onExit() {
        util.playEffecstOnPlayer(this.currentPlayer.playerId, this._ResurgenceEffects, Globaldata.reviveeffetIds);
        EventManager.instance.call(EModule_Events.player_Resurgence, this.unitId);
    }

    public onUpdate(dt: number) {

    }
    onDestory(): void {

    }

    private clearDeadTime() {
        if (this.deadTimeOut) {
            clearTimeout(this.deadTimeOut);
            this.deadTimeOut = null;
        }
    }

}