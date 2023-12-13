import { EventDefine } from "../../const/EventDefine";


/**
 * 跑酷游戏触发器类别
 */
export enum CircleType {
    /**加速 */
    SpeedUp = "1",
    /**减速 */
    SpeedDown = "2",
    /**积分 */
    Point = "3",
    /**传送门起点 */
    TransStart = "4",
    /**传送门终点 */
    TransEnd = "5",
    /**引导区域 */
    Guide = "6",
    /**游戏开始区域 */
    GameStart = "7",
    /**游戏结束区域 */
    GameEnd = "8",
}

/**
 * 跑酷游戏中各类触发器
 */
@mw.Component
export default class CircleTrigger extends mw.Script {

    @mw.Property({
        displayName: "圈类别",
        selectOptions: {
            "加速圈": CircleType.SpeedUp,
            "减速圈": CircleType.SpeedDown,
            "积分圈": CircleType.Point,
            "传送门起点": CircleType.TransStart,
            "传送门终点": CircleType.TransEnd,
            "引导区域": CircleType.Guide,
            "游戏开始区域": CircleType.GameStart,
            "游戏结束区域": CircleType.GameEnd,
        }
    })
    private _circleType: CircleType = CircleType.SpeedUp;

    private _trigger: mw.Trigger;

    protected onStart(): void {

        this.initTrigger();
    }


    private initTrigger() {

        this._trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;
        this._trigger.onEnter.add(this.onEnter);
    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (obj === Player.localPlayer.character) {
                mw.Event.dispatchToLocal(EventDefine.PlayerEnterCircleTrigger, this._circleType);
            }
        }
    };


}