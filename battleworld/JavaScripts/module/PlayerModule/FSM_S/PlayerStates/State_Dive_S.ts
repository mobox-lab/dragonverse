import { EAreaEvents_S, EPlayerEvents_S } from "../../../../const/Enum";
import { Globaldata } from "../../../../const/Globaldata";
import { EventManager } from "../../../../tool/EventManager";
import { util } from "../../../../tool/Utils";
import { EPlayerState } from "../../FSM/PlyerState";
import { PlayerState_S } from "../PlayerState_S";

/**冲刺状态 */
enum EDiveState {
    none,
    /**检测最高点 */
    checkHeight,
    /**俯冲状态 */
    diving,

}

/**
 * 俯冲状态
 * 检测玩家是否达到最高点
 */
export class State_Dive_S extends PlayerState_S {

    private diveState: EDiveState = EDiveState.none;

    private dropAnim: mw.Animation = null;
    private groundAnim: mw.Animation = null;


    public enter() {
        this.diveState = EDiveState.checkHeight;

        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            return;
        }
        this.dropAnim = player.character.loadAnimation(Globaldata.diveAnimGuid);
        this.dropAnim.loop = 999;
        this.groundAnim = player.character.loadAnimation(Globaldata.diveGroundAnimGuid);

        let rot = player.character.worldTransform.rotation;
        Globaldata.tmpRotation1.x = 0;
        Globaldata.tmpRotation1.y = Globaldata.diveUpRotationY;
        Globaldata.tmpRotation1.z = rot.z;
        player.character.worldTransform.rotation = Globaldata.tmpRotation1;

        // 俯身动画
        this.dropAnim.play();

        EventManager.instance.call(EAreaEvents_S.Area_SetBattleAreaId, this.playerProxy.PId);
    }

    public onUpdate(dt: number) {

        switch (this.diveState) {
            case EDiveState.checkHeight:
                {
                    let player = mw.Player.getPlayer(this.playerProxy.PId);
                    if (player == null) {
                        return;
                    }
                    let chara = player.character;
                    let velocity = chara.velocity;


                    if (velocity.z < 0) {
                        this.diveState = EDiveState.diving;
                        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_DiveVisible_S, this.playerProxy.PId, true);

                        Globaldata.tmpRotation1.x = 0;
                        Globaldata.tmpRotation1.y = Globaldata.diveDownRotationY;
                        Globaldata.tmpRotation1.z = chara.worldTransform.rotation.z;
                        chara.worldTransform.rotation = Globaldata.tmpRotation1;
                    }
                }
                break;
            case EDiveState.diving:
                {
                    let player = mw.Player.getPlayer(this.playerProxy.PId);
                    if (player == null) {
                        this.playerProxy.changeState(EPlayerState.Idle);
                        return;
                    }
                    let chara = player.character;
                    if (chara == null) {
                        this.playerProxy.changeState(EPlayerState.Idle);
                        return;
                    }

                    if (chara.isJumping == false) {
                        this.reset_player();


                        // 重置胶囊体位置
                        let chara = player.character;
                        let curRotation = chara.worldTransform.rotation;
                        Globaldata.tmpRotation1.x = 0;
                        Globaldata.tmpRotation1.y = 0;
                        Globaldata.tmpRotation1.z = curRotation.z;
                        chara.worldTransform.rotation = Globaldata.tmpRotation1;

                        let playerLoc = chara.worldTransform.position;
                        let extentZ = chara.collisionExtent.z / 2;
                        Globaldata.tmpVector2.x = playerLoc.x;
                        Globaldata.tmpVector2.y = playerLoc.y;
                        Globaldata.tmpVector2.z = playerLoc.z - extentZ;
                        EffectService.playAtPosition(Globaldata.diveGroundEffectGuid, Globaldata.tmpVector2);
                        util.playSoundByConfig(Globaldata.diveGroundSoundId, Globaldata.tmpVector2);
                        this.groundAnim.play();
                        this.diveState = EDiveState.none;
                        this.playerProxy.changeState(EPlayerState.Idle);
                    }

                    // let results = QueryUtil.lineTrace(chara.worldTransform.position, Globaldata.tmpVector2, true, false, null, false, false, chara);
                    // if (results.length > 0) {

                    //     this.reset_player();

                    //     Globaldata.tmpVector2.z = playerLoc.z - extentZ;
                    //     EffectService.playAtPosition(Globaldata.diveGroundEffectGuid, Globaldata.tmpVector2);

                    //     util.playSoundByConfig(Globaldata.diveGroundSoundId, Globaldata.tmpVector2);
                    //     this.groundAnim.play();

                    //     this.diveState = EDiveState.none;
                    //     this.playerProxy.changeState(EPlayerState.Idle);
                    // }

                }
                break;
            default:
                break;
        }

    }


    private reset_player() {

        if (this.dropAnim) {
            this.dropAnim.stop();
            this.dropAnim = null;
        }

        if (this.diveState == EDiveState.none) {
            return;
        }
        let player = mw.Player.getPlayer(this.playerProxy.PId);
        if (player == null) {
            this.playerProxy.changeState(EPlayerState.Idle);
            return;
        }



        let chara = player.character;
        let curRotation = chara.worldTransform.rotation;
        Globaldata.tmpRotation1.x = 0;
        Globaldata.tmpRotation1.y = 0;
        Globaldata.tmpRotation1.z = curRotation.z;
        chara.worldTransform.rotation = Globaldata.tmpRotation1;

        //EventManager.instance.call(EAreaEvents_S.Area_SetBattleAreaId, this.playerProxy.PId);

        EventManager.instance.call(EPlayerEvents_S.PlayerEvent_DiveVisible_S, this.playerProxy.PId, false);
    }

    exit(param?: any): void {
        this.reset_player();
    }


}