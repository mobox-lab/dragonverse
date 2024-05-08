/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-24 16:14:39
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-26 18:28:57
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\PortalTriggerWithProgress.ts
 * @Description  : 带进度条的传送门交互物
 */

import Log4Ts from "../../depend/log4ts/Log4Ts";
import JumpProgress_Generate from "../../ui-generate/subgame/JumpProgress_generate";
import { SharedInteractiveObj } from "./BaseInteractiveScript";
import { InteractiveObjModuleC } from "./InteractiveObjModule";

export abstract class PortalTriggerWithProgress extends SharedInteractiveObj {
    @Property({ displayName: "进度条时间(秒),0不显示", group: "Config-progress" })
    public progressMaxTime: number = 3;

    maxPlayerCount: number = Infinity;

    private _progressBar: ProgressBar;
    private _cnvProgressBar: Canvas;

    private readonly _progressTag = "JumpProgress";

    allPlayerEndInteractionInClient(): void { }
    firstStartInteractionInClient(): void { }

    private _delayTimer: any;
    protected startInteractionInServer(playerId: number): void {
        Log4Ts.log(PortalTriggerWithProgress, `startInteractionInServer:${playerId}}`);
        //服务端模拟在播放进度条
        this._delayTimer = setTimeout(() => {
            this.onProgressDoneInServer(playerId);
            this._isPlayingProgress = false;
        }, this.progressMaxTime * 1000);
        this._isPlayingProgress = true;

        this.onStartPortalInServer(playerId);
    }

    protected startInteractionInClient(playerId: number): void {
        Log4Ts.log(PortalTriggerWithProgress, `startInteractionInClient:${playerId}}`);
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
            this.onProgressDoneInClient();
        }
        this.onStartPortalInClient();
    }

    protected stopInteractionInServer(playerId: number, finishCallBack?: () => void): void {
        Log4Ts.log(PortalTriggerWithProgress, `stopInteractionInServer:${playerId}}`);
        if (this._isPlayingProgress) {
            this.onInterruptProgressInServer(playerId);
            clearTimeout(this._delayTimer);
        }

        finishCallBack();
    }

    protected stopInteractionInClient(playerId: number, finishCallBack?: () => void): void {
        Log4Ts.log(PortalTriggerWithProgress, `stopInteractionInClient:${playerId}}`);

        //如果退出trigger关闭进度条
        //进度条结束
        if (this._isPlayingProgress) {
            actions.tweens.stopAllByTag(this._progressTag);
            this.onInterruptProgressInClient();
            this._isPlayingProgress = false;
        }

        actions
            .tween(this._cnvProgressBar)
            .to(100, { renderOpacity: 0 })
            .call(() => {
                UIService.hide(JumpProgress_Generate);
            })
            .start();


        finishCallBack();
    }

    /**
     * 播放 Progress 动画.
     */
    protected _isPlayingProgress: boolean = false;
    public playProgress() {
        this._isPlayingProgress = true;
        let progressTask = actions
            .tween(this._progressBar)
            .setTag(this._progressTag)
            .to(this.progressMaxTime * 1000, { percent: 1 })
            .call(() => {
                this._isPlayingProgress = false;
                //退出交互，进入传送
                ModuleService.getModule(InteractiveObjModuleC).stopInteraction(this.gameObject.gameObjectId);
                this.onProgressDoneInClient();
            });

        actions
            .tween(this._cnvProgressBar)
            .setTag(this._progressTag)
            .to(100, { renderOpacity: 1 })
            .call(() => {
                progressTask.start();
            })
            .start();
    }

    /**
     * @description: 服务端开始传送
     */
    abstract onStartPortalInServer(playerId: number): void;
    /**
     * @description: 客户端开始传送
     */
    abstract onStartPortalInClient(): void;
    /**
     * @description: 客户端打断进度条时机
     */
    abstract onInterruptProgressInClient(): void;
    /**
     * @description: 服务端打断进度条时机
     */
    abstract onInterruptProgressInServer(playerId: number): void;
    /**
     * 进度条结束，进度条最大值为0时，会直接调用
     */
    abstract onProgressDoneInClient(): void;

    abstract onProgressDoneInServer(playerId: number): void;
}
