import { PlayerManagerExtesion } from "../../../../Modified027Editor/ModifiedPlayer";
import { Globaldata } from "../../../../const/Globaldata";
import { Notice } from "../../../../tool/Notice";
import { util } from "../../../../tool/Utils";
import { AnalyticsTool, EMovementType } from "../../../AnalyticsModule/AnalyticsTool";
import { Attribute } from "../../sub_attribute/AttributeValueObject";
import { PlyerState, EPlayerState } from "../PlyerState";


/**
 * 跳状态 && 空舞状态
 */
export class State_jump extends PlyerState {

    /**二段跳动作1 */
    private jumpAnimation1: string = "74096";
    /**二段跳动作2 */
    private jumpAnimation2: string = "150691";
    /**二段跳动作3 空舞 */
    private jumpAnimation3: string = "14701";
    /**二段跳动作3 空舞speed */
    private jumpAnimation3speed: number = 0.75;
    /**二段跳动作3 空舞 */
    private jumpEnergy: number = 25;
    /**跳冲量*/
    private jumpHight: number = 1500;
    /**重力恢复时间 */
    private jumpgravitytime: number = 0.3;
    /**空舞cd*/
    private jump3CD: number = 0.3;
    /**二段跳动作3 空舞 */
    private jump3Effects: number[] = [83, 84];
    /**空舞特效延迟时间*/
    private effectDelayTiem: number[] = [0, 0];
    /**空舞冲量大小 */
    private jump3Force: number = 1200;
    /**特效ids key */
    private jumpEffectIds: Array<number> = [];
    /**空舞特效延迟时间 key*/
    private effectDelayKey: any[] = [];
    /**重力恢复计时*/
    private timer: number = 0;

    protected onEnter(param: any) {
        this.jump(param);
    }
    protected onExit() {
        this.character.gravityScale = Globaldata.dfgravityScale;
    }
    public onUpdate(dt: number) {

        this.baseStateUpdate(dt)
        if (PlyerState.dfaultState == EPlayerState.Idle) {
            this.playerModulec.changeState(EPlayerState.Idle);
            PlyerState.jumpTime = 0;
        }

        if (PlyerState.dfaultState == EPlayerState.run) {
            this.playerModulec.changeState(EPlayerState.run);
            PlyerState.jumpTime = 0;
        }

        if (PlyerState.jumpTime > 1) {
            let time = Date.now() - this.timer - this.jumpgravitytime * 1000;
            if (time > 0) {
                this.character.gravityScale = Globaldata.dfgravityScale;
            }
        }
    }

    /**
    * 跳跃
    * @returns 
    */
    private jump(param: any) {

        if (param) {

            if (param == -1) {
                return;
            }

            let type = param as EPlayerState;

            //冲刺，技能不执行
            if (type == EPlayerState.sprint) {
                return;
            }
        }

        let maxJumpTimes: number = 2;

        if (PlyerState.jumpTime >= maxJumpTimes) {
            return;
        }

        //空舞-每次消耗20点能量
        if (PlyerState.jumpTime > 1) {

            let time = Date.now() - this.timer;
            let intervalTime = time - this.jump3CD * 1000;

            if (intervalTime < 0) {
                return;
            }

            let energy = this.playerModulec.getAttr(Attribute.EnumAttributeType.energy);
            if (this.jumpEnergy > energy) {
                Notice.showDownNotice(util.getLanguageByKey("Text_MainUI_2"));
                return
            }
            this.playerModulec.reduceAttr(Attribute.EnumAttributeType.energy, this.jumpEnergy, false)

        }

        if (PlyerState.jumpTime >= 1) {
            this.timer = Date.now();
        }

        this.stopJump3Effect();

        let velocity = this.currentPlayer.character.velocity;
        if (PlyerState.jumpTime > 1) {
            this.currentPlayer.character.addImpulse(velocity.multiply(-1), true)
            this.currentPlayer.character.addImpulse(new mw.Vector(0, 0, this.jump3Force), true)
        } else {
            this.currentPlayer.character.addImpulse(new mw.Vector(0, 0, velocity.z).multiply(-1), true)
            this.currentPlayer.character.addImpulse(new mw.Vector(0, 0, this.jumpHight), true)
        }

        let jumpAnimation: string = this.jumpAnimation1;
        let jumpAnimationRate: number = 1;
        if (PlyerState.jumpTime == 0) {
            jumpAnimation = this.jumpAnimation1;
        }
        else if (PlyerState.jumpTime == 1) {
            jumpAnimation = this.jumpAnimation2;
        }
        else {
            this.character.gravityScale = 0;
            jumpAnimation = this.jumpAnimation3;
            jumpAnimationRate = this.jumpAnimation3speed;
            this.playJump3Effect();
        }

        let ani = PlayerManagerExtesion.rpcPlayAnimation(this.currentPlayer.character, jumpAnimation, 1, jumpAnimationRate);
        ani.onFinish.clear();
        ani.onFinish.add(() => {
        })
        PlyerState.jumpTime++;
    }

    /**
     * 播放空舞特效
     */
    playJump3Effect() {
        for (let index = 0; index < this.jump3Effects.length; index++) {
            const element = this.jump3Effects[index];

            let effectDelayKey = setTimeout(() => {
                let effectId = util.playEffectOnPlayer(this.currentPlayer.playerId, element);
                this.jumpEffectIds.push(effectId);
            }, this.effectDelayTiem[index] * 1000);

            this.effectDelayKey.push(effectDelayKey);
        }
    }

    /**
     * 停止空舞特效
     */
    stopJump3Effect() {
        for (let index = 0; index < this.jumpEffectIds.length; index++) {
            const element = this.jumpEffectIds[index];
            EffectService.stop(element);
        }
        this.jumpEffectIds = [];

        for (let index = 0; index < this.effectDelayKey.length; index++) {
            const element = this.effectDelayKey[index];
            clearTimeout(element);
        }
        this.effectDelayKey = [];
    }


    onDestory(): void {

    }

}