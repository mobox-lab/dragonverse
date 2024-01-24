/*
 * @Author: steven
 * @Date: 2023-12-14 17:50:59
 * @LastEditors: steven
 * @LastEditTime: 2023-12-21 16:30:39
 */

import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import GameServiceConfig from "../../const/GameServiceConfig";
import Nolan from "../../depend/nolan/Nolan";
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

    private _trigger: mw.Trigger;

    private _hander: number;

    public static startTran:Transform;

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

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (GToolkit.isSelfCharacter(obj)) {
                if (this._circleType == HighSchoolType.TransStart) {
                    HighSchoolTrigger.startTran = obj.worldTransform;
                    UIService.getUI(MainPanel).setCanSprint(false);
                }else if (this._circleType == HighSchoolType.DeadBackGround) {
                    this._hander = TimeUtil.setInterval(this.onCountDown, 2);
                    //锁定摄像头

                }else if (this._circleType == HighSchoolType.DeadRed) {
                    obj.ragdollEnabled = true;
                    this._hander = TimeUtil.setInterval(this.onCountDown, 2);
                }
            }
        }
    };

    private onCountDown = () => {
        if (this._hander) {
            TimeUtil.clearInterval(this._hander);
            this._hander = null;
        }
        this.reborn();
    };

    private reborn(){
        Player.localPlayer.character.worldTransform = HighSchoolTrigger.startTran;
        Nolan.getInstance().lookToward(Player.localPlayer.character.worldTransform.rotation.rotateVector(Vector.forward));
    }

}