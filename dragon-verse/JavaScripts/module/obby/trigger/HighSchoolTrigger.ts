/*
 * @Author: steven
 * @Date: 2023-12-14 17:50:59
 * @LastEditors: steven
 * @LastEditTime: 2023-12-21 16:30:39
 */
import { EventDefine } from "../../../const/EventDefine";
import GameServiceConfig from "../../../const/GameServiceConfig";
import Nolan from "../../../depend/nolan/Nolan";
import i18n from "../../../language/i18n";
import MainPanel from "../../../ui/main/MainPanel";
import GToolkit from "../../../util/GToolkit";
import UnifiedRoleController from "../../role/UnifiedRoleController";
import { ObbyModuleC } from "../ObbyModule";


/**
 * 跑酷游戏触发器类别
 */
export enum HighSchoolType {
    /**起点 */
    TransStart = 1,
    DeadBackGround = 2,//地下的死亡触发点，碰到后就锁定视角，判定死亡
    DeadRed = 3,//红色方块 触碰后变成布娃娃，然后回到原点
    ScorePoint = 4,//得分点 碰到后就得分
    GameExit = 5,//游戏结束
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
            "游戏退出点": HighSchoolType.GameExit,
        },
    })
    private _circleType: HighSchoolType = HighSchoolType.TransStart;

    @mw.Property({ displayName: "关卡叙述，用来表示是第几个检查点" })
    private _checkPointIdx: number = 0;

    private _trigger: mw.Trigger;

    protected onStart(): void {
        if (mw.SystemUtil.isServer()) {
            return;
        }
        this.initTrigger();
    }


    private initTrigger() {
        this._trigger = this.gameObject as mw.Trigger;
        this._trigger.onEnter.add(this.onEnter);
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);

    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (GToolkit.isSelfCharacter(obj)) {
                let obby = ModuleService.getModule(ObbyModuleC);
                if (this._circleType == HighSchoolType.TransStart) {
                    if (!obby.isInGame()) {
                        obby.enterGame();
                    }
                } else if (this._circleType == HighSchoolType.DeadBackGround) {
                    obby.groundDead();
                } else if (this._circleType == HighSchoolType.DeadRed) {
                    obby.redDead();
                } else if (this._circleType == HighSchoolType.ScorePoint) {
                    //判断是不是后面一关
                    if (obby.checkLv(this._checkPointIdx)) {
                        //记录是第几关 改变进度条
                        obby.updateCheckPoint(this._checkPointIdx);
                    }
                } else if (this._circleType == HighSchoolType.GameExit) {
                    Event.dispatchToLocal(EventDefine.PlayerReset, Player.localPlayer.playerId);
                    Event.dispatchToServer(EventDefine.PlayerReset, Player.localPlayer.playerId);
                    Player
                        .localPlayer
                        .getPlayerState(UnifiedRoleController)
                        ?.respawn();
                }
            }
        }
    };

}