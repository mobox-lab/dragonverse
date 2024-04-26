/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-04-24 16:14:39
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-26 16:48:46
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\BasePortalTrigger.ts
 * @Description  : 传送门交互物
 */


import Log4Ts from "../../depend/log4ts/Log4Ts";
import JumpProgress_Generate from "../../ui-generate/subgame/JumpProgress_generate";
import { ActivateByTrigger, ActivateMode, TriggerType } from "./ActiveMode";
import { SharedInteractiveObj } from "./BaseInteractiveScript";
import { InteractiveObjModuleC } from "./InteractiveObjModule";

export abstract class BasePortalTrigger extends SharedInteractiveObj {

    @Property({ displayName: "进度条时间(秒),0不显示", group: "Config-progress" })
    public progressMaxTime: number = 3;

    activeMode: ActivateMode;

    maxPlayerCount: number = Infinity;

    private _progressBar: ProgressBar;
    private _cnvProgressBar: Canvas;

    private readonly _progressTag = "JumpProgress";

    abstract triggerType: TriggerType;


    protected onStart(): void {
        super.onStart();
        this.activeMode = new ActivateByTrigger(this.gameObject, this.triggerType);
    }

    allPlayerEndInteractionInClient(): void {

    }
    firstStartInteractionInClient(): void {

    }
    protected startInteractionInServer(playerId: number): void {
        Log4Ts.log(BasePortalTrigger, `startInteractionInServer:${playerId}}`);
        this.onStartPortalInServer();
    }

    protected startInteractionInClient(playerId: number): void {
        Log4Ts.log(BasePortalTrigger, `startInteractionInClient:${playerId}}`);
        if (this.progressMaxTime > 0) {
            //显示进度条
            let ui = UIService.show(JumpProgress_Generate);
            this._progressBar = ui.progressBar;
            this._cnvProgressBar = ui.cnvProgressBar;
            this._progressBar.percent = 0;
            this._cnvProgressBar.renderOpacity = 0;
            this.playProgress();
        } else {
            //直接结束交互，进入传送
            ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this.gameObject.gameObjectId);
            this.onProgressDone();
        }
        this.onStartPortalInClient();

    }

    protected stopInteractionInServer(playerId: number, finishCallBack?: () => void): void {
        Log4Ts.log(BasePortalTrigger, `stopInteractionInServer:${playerId}}`);
        finishCallBack();
        this.onInterruptProgressInServer();
    }

    protected stopInteractionInClient(playerId: number, finishCallBack?: () => void): void {
        Log4Ts.log(BasePortalTrigger, `stopInteractionInClient:${playerId}}`);

        //如果退出trigger关闭进度条
        //进度条结束
        if (this._isPlayingProgress) {
            actions.tweens.stopAllByTag(this._progressTag);
            this.onInterruptProgressInClient();
        }

        actions.tween(this._cnvProgressBar).to(100, { renderOpacity: 0 }).call(() => {
            UIService.hide(JumpProgress_Generate);
        }).start();


        finishCallBack();
    }



    /**
     * 播放 Progress 动画.
     */
    private _isPlayingProgress: boolean = false;
    public playProgress() {
        this._isPlayingProgress = true;
        let progressTask = actions.tween(this._progressBar).setTag(this._progressTag).to(this.progressMaxTime * 1000, { percent: 1 }).call(() => {
            this._isPlayingProgress = false;
            //退出交互，进入传送
            ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this.gameObject.gameObjectId);
            this.onProgressDone();
        });

        actions.tween(this._cnvProgressBar).setTag(this._progressTag).to(100, { renderOpacity: 1 }).call(() => {
            progressTask.start();
        }).start();
    }


    abstract onStartPortalInServer(): void;

    abstract onStartPortalInClient(): void;

    abstract onInterruptProgressInClient(): void;

    abstract onInterruptProgressInServer(): void;

    abstract onProgressDone(): void;
}
