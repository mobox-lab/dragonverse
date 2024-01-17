import { Globaldata } from "../../../../const/Globaldata";
import { util } from "../../../../tool/Utils";
import { MotionUtil } from "../../../MotionModule/MotionUtil";
import { Attribute } from "../../sub_attribute/AttributeValueObject";
import { EPlayerState, PlyerState } from "../PlyerState";
import { EPlayerEvents_C } from "../../../../const/Enum";
import { EventManager } from "../../../../tool/EventManager";


/**
 * 冲刺 && 加速冲刺
 */
export class State_sprint extends PlyerState {

    /**冲刺-技能id */
    private sprintID: number = 1;
    /**空中冲刺 */
    private sprintID_Skys: number[] = [4, 5];
    /**冲刺索引*/
    private skyIndex: number = 0;
    /**冲刺-计时器 */
    private restsprintTimer: any = 0;
    /**加速冲刺-计时*/
    private change_Speed_timer_key: any = null;
    /**是否是长冲刺*/
    private sprint_is_long_press: boolean = false;
    /**冲刺-开始 */
    public sprint_isStart_Speed_Check: boolean = false;


    constructor() {
        super();
        TimeUtil.onEnterFrame.add(this.update_sprint, this);
        EventManager.instance.add(EPlayerEvents_C.player_stop_sprintEffect, this.stopSprint, this);
    }

    protected onEnter(param: any) {
        this.sprint_is_long_press = false;
        if (param) {
            this.sprint_is_long_press = param as boolean;
        }

        this.start_gravity();
        this.sprint();
    }

    private start_gravity() {
        //在空中冲刺
        if (this.character.isJumping == false) {
            return;
        }

        let curMotion = this.motionMD.currentMotion;
        if (curMotion) {
            let motionSkill = MotionUtil.getMotionSkillCfg(curMotion.MotionData.motionId);
            if (motionSkill == null) {
                console.error("State_sprint motionSkill == null ", curMotion.MotionData.motionId);
                return;
            }

            let result = motionSkill.id == this.sprintID;

            let result1 = this.sprintID_Skys.includes(motionSkill.id);

            if (result == false && result1 == false) {
                return;
            }
        }

        this.character.gravityScale = 0;
        //防止再次进入加速度会和之前坠落速度叠加产生冲刺效果
        this.currentPlayer.character.addImpulse(this.currentPlayer.character.velocity.multiply(-1), true);
    }

    protected onExit() {
        this.character.gravityScale = Globaldata.dfgravityScale;
    }


    public onUpdate(dt: number) {
        this.baseStateUpdate(dt);
    }

    /**
     * 冲刺
     * @returns 
     */
    public async sprint() {

        if (this.motionMD.isHasPlayMotion()) {
            return;
        }

        this.crear_sprint_timer();
        this.start_sprint_timer();

        let spritId: number = 0;
        if (this.currentPlayer.character.isJumping) {
            spritId = this.sprintID_Skys[this.skyIndex];
            this.skyIndex++
            this.skyIndex = this.skyIndex % this.sprintID_Skys.length;
        } else {
            spritId = this.sprintID;
        }

        let invokeResult = await this.motionMD.invoke_motion(spritId, () => {
            this.changerSpeed();
            this.playerModulec.changeState(PlyerState.dfaultState, EPlayerState.sprint);
        });

        if (invokeResult == false) {
            this.playerModulec.changeState(PlyerState.dfaultState, EPlayerState.sprint);
        }
    }

    /**
    * 加速冲刺-加速 
    * @returns 
    */
    private changerSpeed() {
        this.setPlayerMaxSpeed(this.playerModulec.getAttr(Attribute.EnumAttributeType.speed) + Globaldata.sprintAddSpeed);
        this.clear_change_Speed_timer();
        this.change_Speed_timer_key = setTimeout(() => {
            this.sprint_isStart_Speed_Check = true;
            this.setPlayerMaxSpeed(this.playerModulec.getAttr(Attribute.EnumAttributeType.speed) + Globaldata.sprintAddSpeed)
        }, 500);
    }

    private clear_change_Speed_timer() {
        if (this.change_Speed_timer_key != null) {
            clearTimeout(this.change_Speed_timer_key);
        }
        this.change_Speed_timer_key = null;
    }

    private start_sprint_timer() {
        this.restsprintTimer = setTimeout(() => {
            this.restsprintTimer = null;
            this.crear_sprint_timer();
        }, Globaldata.sptintRestTime * 1000);
    }

    private crear_sprint_timer() {
        if (this.restsprintTimer) {
            clearTimeout(this.restsprintTimer);
            this.restsprintTimer = null;
        }
    }

    onDestory(): void {

    }



    /**加速冲刺能量衰减 && 普通冲刺速度衰减----------------------------------------------------------------- */
    /**冲刺-计时器 */
    private sprint_speed_timer: number = 0;
    //冲刺能量检测计时
    private sprintEnergyTimer: number = 0;
    //冲刺能量检测间隔
    private sprintEnergyDlateTime: number = 1;
    //冲刺能量减少值
    private sprintEnergyReduceValue: number = 5;
    //冲刺特效
    private springEffectId: number[] = [];
    //是否播放冲刺特效
    private isPlaySpringEffect: boolean = false;

    /**
     * 冲刺-移动速度衰减
     */
    private update_sprint(dt: number) {
        if (this.sprint_isStart_Speed_Check) {
            if (this.currentPlayer.character.isMoving == false) {
                this.stopSprint();
            }

            if (this.sprint_is_long_press == false) {
                this.sprint_speed_timer += dt;
                if (this.sprint_speed_timer >= 0.1) {
                    this.sprint_speed_timer = 0;
                    let speed = this.currentPlayer.character.maxWalkSpeed;
                    let dfSpeed = this.playerModulec.getAttr(Attribute.EnumAttributeType.speed)
                    if (speed >= dfSpeed) {
                        speed -= Globaldata.sptintReduceValue;
                        if (speed >= dfSpeed) {
                            this.setPlayerMaxSpeed(speed);
                        } else {
                            this.setPlayerMaxSpeed(dfSpeed)
                            this.sprint_isStart_Speed_Check = false;
                            this.sprint_is_long_press = false;
                        }
                    } else {
                        this.setPlayerMaxSpeed(dfSpeed)
                        this.sprint_isStart_Speed_Check = false;
                        this.sprint_is_long_press = false;
                    }
                }
            }

            //能量
            if (this.sprint_is_long_press) {
                let energy = this.playerModulec.getAttr(Attribute.EnumAttributeType.energy);
                if (energy <= 0) {
                    this.stopSprint();
                } else {
                    this.sprintEnergyTimer += dt;
                    if (this.sprintEnergyTimer >= this.sprintEnergyDlateTime) {
                        this.sprintEnergyTimer = 0;
                        this.playerModulec.reduceAttr(Attribute.EnumAttributeType.energy, this.sprintEnergyReduceValue, false)
                    }
                }
                this.playspringEffect();
            } else {
                this.stopSpringEffect();
            }
        } else {
            this.stopSpringEffect();
        }

    }

    //停止冲刺
    public stopSprint() {
        this.setPlayerMaxSpeed(this.playerModulec.getAttr(Attribute.EnumAttributeType.speed));
        this.sprint_isStart_Speed_Check = false;
        this.sprint_is_long_press = false;
        this.stopSpringEffect();
    }

    //播放冲刺特效
    public playspringEffect() {
        if (this.isPlaySpringEffect) {
            return;
        }
        this.stopSpringEffect();
        let effectId = Globaldata.sprintEffectId;
        if (effectId == null) {
            return;
        }
        util.playEffecstOnPlayer(this.currentPlayer.playerId, this.springEffectId, effectId);
        this.isPlaySpringEffect = true;
    }
    //停止冲刺特效
    public stopSpringEffect() {
        if (this.isPlaySpringEffect == false) {
            return;
        }
        if (this.springEffectId.length > 0) {
            for (let i = 0; i < this.springEffectId.length; i++) {
                EffectService.stop(this.springEffectId[i]);
            }
            this.springEffectId = [];
        }
        this.isPlaySpringEffect = false;
    }

    /**
     * 优化RPC 设置玩家最大速度 
     */
    private setPlayerMaxSpeed(speed: number) {
        this.currentPlayer.character.maxWalkSpeed = speed;
    }

}