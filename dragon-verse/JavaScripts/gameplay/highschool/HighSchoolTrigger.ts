/*
 * @Author: steven
 * @Date: 2023-12-14 17:50:59
 * @LastEditors: steven
 * @LastEditTime: 2023-12-21 16:30:39
 */

import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import GToolkit from "../../util/GToolkit";
import { RunningGameGetParticle } from "../quest/runnungGame/RunningGameQuest";


/**
 * 跑酷游戏触发器类别
 */
export enum HighSchoolType {
    /**起点 */
    TransStart = 1,
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

    private _obj: mw.GameObject;

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
        console.log("onEnter iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        if (obj instanceof mw.Character) {
            if (GToolkit.isSelfCharacter(obj)) {

                if (this._circleType == HighSchoolType.TransStart) {
                    console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
                    obj.maxJumpHeight = 100;
                    obj.jumpMaxCount = 1;
                    obj.maxWalkSpeed = 100;
                }

            }
        }
    };


}