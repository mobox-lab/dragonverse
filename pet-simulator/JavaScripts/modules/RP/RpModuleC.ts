import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { GlobalData } from "../../const/GlobalData";
import RpModuleS from "./RpModuleS";

export default class RpModuleC extends ModuleC<RpModuleS, null> {

    private _danceAnim: mw.Animation;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.initAnimations();
        this.initTriggers();
    }


    /**初始化触发器 */
    private initTriggers() {
        // 跳舞区域触发器
        let danceTrigger = GameObject.findGameObjectById(GlobalData.Rp.danceTriggerGuid) as Trigger;
        danceTrigger.onEnter.add((obj: GameObject) => {
            this.onEnterDanceArea(obj);
            console.log("进入跳舞触发器");
        })
        danceTrigger.onLeave.add((obj: GameObject) => {
            this.onLeaveDanceArea(obj);
            console.log("离开跳舞触发器");
        })
    }

    /**初始化动画 */
    private initAnimations() {

        let myCharacter = this.localPlayer.character;
        // 跳舞动画
        this._danceAnim = PlayerManagerExtesion.loadAnimationExtesion(myCharacter, GlobalData.Rp.danceAnimGuid);
        this._danceAnim.loop = 0;
        // 骑马动画

    }

    /**进入跳舞区域 */
    private onEnterDanceArea(obj: GameObject) {
        // 只检测玩家
        if (PlayerManagerExtesion.isCharacter(obj) == false) return;
        // 只检测本客户端玩家
        let myCharacter = obj as Character;
        if (myCharacter.player.playerId != this.localPlayerId) return;

        this._danceAnim.play();
    }

    /**离开跳舞区域 */
    private onLeaveDanceArea(obj: GameObject) {
        // 只检测玩家
        if (PlayerManagerExtesion.isCharacter(obj) == false) return;
        // 只检测本客户端玩家
        let myCharacter = obj as Character;
        if (myCharacter.player.playerId != this.localPlayerId) return;

        this._danceAnim.stop();
    }
}