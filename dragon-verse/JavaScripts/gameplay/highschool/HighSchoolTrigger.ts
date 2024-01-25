/*
 * @Author: steven
 * @Date: 2023-12-14 17:50:59
 * @LastEditors: steven
 * @LastEditTime: 2023-12-21 16:30:39
 */
import { EventDefine } from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import Nolan from "../../depend/nolan/Nolan";
import i18n from "../../language/i18n";
import { PromotTips } from "../../ui/common/PromotTips";
import MainPanel from "../../ui/main/MainPanel";
import GToolkit from "../../util/GToolkit";


/**
 * 跑酷游戏触发器类别
 */
export enum HighSchoolType {
    /**起点 */
    TransStart = 1,
    DeadBackGround = 2,//地下的死亡触发点，碰到后就锁定视角，判定死亡
    DeadRed = 3,//红色方块 触碰后变成布娃娃，然后回到原点
    ScorePoint = 4,//得分点 碰到后就得分
}

/**
 * 跑酷游戏中各类触发器
 */
@mw.Component
export default class HighSchoolTrigger extends mw.Script {

    @mw.Property({
        displayName: "圈类别",
        enumType: {
            "起点": HighSchoolType.TransStart,
            "坠落死亡区": HighSchoolType.DeadBackGround,
            "红色死亡区": HighSchoolType.DeadRed,
            "得分点": HighSchoolType.ScorePoint,
        }
    })
    private _circleType: HighSchoolType = HighSchoolType.TransStart;

    @mw.Property({ displayName: "关卡叙述，用来表示是第几个检查点" })
    private _checkPointIdx: number = 0;

    private _trigger: mw.Trigger;

    private _hander: number;

    public static lastPos:mw.Vector;

    protected onStart(): void {
        if (mw.SystemUtil.isServer()) {
            return;
        }
        this.initTrigger();
    }


    private initTrigger() {
        this._trigger =  this.gameObject as mw.Trigger;
        this._trigger.onEnter.add(this.onEnter);
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (GToolkit.isSelfCharacter(obj)) {
                if (this._circleType == HighSchoolType.TransStart) {
                    HighSchoolTrigger.lastPos = this._trigger.worldTransform.position;
                    this.setProps(obj);
                    UIService.getUI(MainPanel).setCanSprint(false);
                }else if (this._circleType == HighSchoolType.DeadBackGround) {
                    //锁定摄像头
                    obj.ragdollEnabled = true;
                    this._hander = TimeUtil.setInterval(this.onCountDown, 2);

                }else if (this._circleType == HighSchoolType.DeadRed) {
                    obj.ragdollEnabled = true;
                    this._hander = TimeUtil.setInterval(this.onCountDown, 2);
                }else if (this._circleType == HighSchoolType.ScorePoint) {
                    HighSchoolTrigger.lastPos = this._trigger.worldTransform.position;
                    // PromotTips.showTips(i18n.lan(i18n.keyTable.Need_FireDargon));
                    Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.keyTable.Obby_GoldReward));
                    //记录是第几关 改变进度条
                    
                }
            }
        }
    };

    private setProps(obj: mw.Character){
        obj.maxWalkSpeed = GameServiceConfig.ROLE_MAX_WALK_SPEED_OBBY;
        obj.maxAcceleration = GameServiceConfig.ROLE_MAX_WALK_ACCURATE_OBBY;
        obj.maxStepHeight = GameServiceConfig.ROLE_MAX_STEP_HEIGHT_OBBY;
        obj.walkableFloorAngle = GameServiceConfig.ROLE_WALKABLE_FLOOR_ANGLE_OBBY;
        obj.rotateRate = GameServiceConfig.ROLE_ROTATE_RATE_OBBY;
        obj.groundFriction = GameServiceConfig.ROLE_GROUND_FRICTION_OBBY;
        obj.maxFallingSpeed = GameServiceConfig.ROLE_FALLING_SPEED_OBBY;
        obj.gravityScale = GameServiceConfig.ROLE_GRAVITY_SCALE_OBBY;
        obj.maxJumpHeight = GameServiceConfig.ROLE_JUMP_HEIGHT_OBBY;
        obj.jumpMaxCount = GameServiceConfig.ROLE_JUMP_MAX_COUNT_OBBY;
    }

    private onCountDown = () => {
        if (this._hander) {
            TimeUtil.clearInterval(this._hander);
            this._hander = null;
        }
        this.reborn();
    };

    private reborn(){
        Player.localPlayer.character.ragdollEnabled = false;
        Player.localPlayer.character.worldTransform.position = HighSchoolTrigger.lastPos;
        Nolan.getInstance().lookToward(Player.localPlayer.character.worldTransform.rotation.rotateVector(Vector.forward));
    }

}