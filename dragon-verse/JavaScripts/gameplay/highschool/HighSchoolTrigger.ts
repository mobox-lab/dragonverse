/*
 * @Author: steven
 * @Date: 2023-12-14 17:50:59
 * @LastEditors: steven
 * @LastEditTime: 2023-12-21 16:30:39
 */

import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import MainPanel from "../../ui/main/MainPanel";
import GToolkit from "../../util/GToolkit";
import { RunningGameGetParticle } from "../quest/runnungGame/RunningGameQuest";


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
        }
    })
    private _circleType: HighSchoolType = HighSchoolType.TransStart;

    @mw.Property({ displayName: "跑酷最大速度" })
    public walkMaxSpeed: number = 1;
    @mw.Property({ displayName: "跑酷最大跳跃次数" })
    public jumpMaxCount: number = 1;
    @mw.Property({ displayName: "不可跨越高度" })
    public jumpMaxHeight: number = 1;

    private _trigger: mw.Trigger;

    private maxWalkSpeedOld = 0; //地面最大速度
    private maxAccelerationOld = 0;//地面最大加速度
    // private maxJumpHeight = 0; //不可跨越高度
    // private maxJumpHeight = 0; //最大站稳角度
    private rotateRateOld = 0; //最大转向速度
    // private maxJumpHeightOld = 0; //地面摩擦力
    // private maxJumpHeight = 0; //下落速度
    // private maxJumpHeight = 0; //重力倍率
    private maxJumpHeightOld = 0; //最大跳跃高度
    private jumpMaxCountOld = 0; //最大跳跃次数

    protected onStart(): void {
        if (mw.SystemUtil.isServer()) {
            return;
        }
        this.initTrigger();
    }


    private initTrigger() {
        console.log("initTrigger iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        this._trigger =  this.gameObject as mw.Trigger;
        this._trigger.onEnter.add(this.onEnter);

    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (GToolkit.isSelfCharacter(obj)) {
                if (this._circleType == HighSchoolType.TransStart) {
                    this.recordOldValue(obj);
                    obj.maxJumpHeight = this.jumpMaxHeight;
                    obj.jumpMaxCount = this.jumpMaxCount;
                    obj.maxWalkSpeed = this.walkMaxSpeed;
                    
                    UIService.getUI(MainPanel).setCanSprint(false);
                }else if (this._circleType == HighSchoolType.DeadBackGround) {
                    
                }else if (this._circleType == HighSchoolType.DeadRed) {

                }

            }
        }
    };

    private recordOldValue(obj:Character){
        this.maxWalkSpeedOld = obj.maxWalkSpeed;
        this.maxAccelerationOld = obj.maxAcceleration;
        this.rotateRateOld = obj.rotateRate;
        this.maxJumpHeightOld = obj.maxJumpHeight;
        this.jumpMaxCountOld = obj.jumpMaxCount;
    }

    private reborn(){

    }


}