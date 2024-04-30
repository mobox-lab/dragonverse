/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-26 17:25:06
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-26 18:26:46
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\PortalTrigger.ts
 * @Description  : 传送门交互物
 */

import Log4Ts from "../../depend/log4ts/Log4Ts";
import JumpProgress_Generate from "../../ui-generate/subgame/JumpProgress_generate";
import { SharedInteractiveObj } from "./BaseInteractiveScript";
import { InteractiveObjModuleC } from "./InteractiveObjModule";
import { PortalTriggerWithProgress } from "./PortalTriggerWithProgress";

export abstract class PortalTrigger extends SharedInteractiveObj {
    maxPlayerCount: number = Infinity;

    allPlayerEndInteractionInClient(): void {}
    firstStartInteractionInClient(): void {}
    protected startInteractionInServer(playerId: number): void {
        Log4Ts.log(PortalTrigger, `startInteractionInServer:${playerId}}`);
        this.onStartPortalInServer(playerId);
    }

    protected startInteractionInClient(playerId: number): void {
        Log4Ts.log(PortalTrigger, `startInteractionInClient:${playerId}}`);

        this.onStartPortalInClient();
    }

    protected stopInteractionInServer(playerId: number, finishCallBack?: () => void): void {
        Log4Ts.log(PortalTriggerWithProgress, `stopInteractionInServer:${playerId}}`);
        finishCallBack();
    }

    protected stopInteractionInClient(playerId: number, finishCallBack?: () => void): void {
        Log4Ts.log(PortalTriggerWithProgress, `stopInteractionInClient:${playerId}}`);
        finishCallBack();
    }

    /**
     * @description: 服务端开始传送
     */
    abstract onStartPortalInServer(playerId: number): void;
    /**
     * @description: 客户端开始传送
     */
    abstract onStartPortalInClient(): void;
}
