/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-14 17:50:59
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-21 16:30:39
 * @FilePath: \DragonVerse\JavaScripts\gameplay\interactive\CircleTrigger.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import { RunningGameGetParticle } from "../quest/runnungGame/RunningGameQuest";


/**
 * 跑酷游戏触发器类别
 */
export enum CircleType {
    /**加速 */
    SpeedUp = 1,
    /**减速 */
    SpeedDown = 2,
    /**积分 */
    Point = 3,
    /**传送门起点 */
    TransStart = 4,
    /**传送门终点 */
    TransEnd = 5,
    /**引导区域 */
    Guide = 6,
    /**游戏准备开始区域 */
    GameReady = 7,
    /**游戏结束区域 */
    GameEnd = 8,
}

/**
 * 跑酷游戏中各类触发器
 */
@mw.Component
export default class CircleTrigger extends mw.Script {

    @mw.Property({
        displayName: "圈类别",
        enumType: {
            "加速圈": CircleType.SpeedUp,
            "减速圈": CircleType.SpeedDown,
            "积分圈": CircleType.Point,
            "传送门起点": CircleType.TransStart,
            "传送门终点": CircleType.TransEnd,
            "引导区域": CircleType.Guide,
            "游戏准备开始区域": CircleType.GameReady,
            "游戏结束区域": CircleType.GameEnd,
        }
    })
    private _circleType: CircleType = CircleType.SpeedUp;

    private _trigger: mw.Trigger;

    private _obj: mw.GameObject;

    protected onStart(): void {

        this.initTrigger();
    }


    private initTrigger() {

        this._trigger = this.gameObject.getChildByName("触发器") as mw.Trigger;
        this._trigger.onEnter.add(this.onEnter);

        if (this._circleType === CircleType.Point || this._circleType === CircleType.SpeedUp) {
            this._obj = this.gameObject.getChildByName("场景__光圈");
        }

    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (obj === Player.localPlayer.character) {
                mw.Event.dispatchToLocal(EventDefine.PlayerEnterCircleTrigger, this._circleType);

                if (this._circleType <= CircleType.Point) {
                    const particle = GameObjPool.spawn(RunningGameGetParticle) as mw.Effect;
                    if (this.gameObject) {
                        particle.worldTransform.position = this.gameObject.worldTransform.position;
                    } else {
                        particle.worldTransform.position = this._trigger.worldTransform.position;
                    }
                    particle.play(() => {
                        GameObjPool.despawn(particle);
                    })
                }


                //加时圈做个cd
                if (this._obj&&(this._circleType === CircleType.Point || this._circleType === CircleType.SpeedUp)) {
                    (this._obj as mw.Model).setCollision(mw.CollisionStatus.Off);
                    (this._obj as mw.Model).setVisibility(mw.PropertyStatus.Off);
                    this._trigger.setCollision(mw.CollisionStatus.Off);
                    let time: number;
                    if (this._circleType === CircleType.Point) {
                        time = GameConfig.Global.RG_TIME_CD.value;
                    } else if (this._circleType === CircleType.SpeedUp) {
                        time = GameConfig.Global.RG_SPEED_CD.value;
                    }
                    TimeUtil.delayExecute(() => {
                        (this._obj as mw.Model).setCollision(mw.CollisionStatus.On);
                        (this._obj as mw.Model).setVisibility(mw.PropertyStatus.On);
                        this._trigger.setCollision(mw.CollisionStatus.On);
                    }, time * 100)
                }

            }
        }
    };


}