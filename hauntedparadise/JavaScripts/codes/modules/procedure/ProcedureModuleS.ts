/*
 * @Author       : dal
 * @Date         : 2023-11-26 14:22:50
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-02 17:50:20
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ProcedureModuleS.ts
 * @Description  : 
 */
import { GamesStartDefines } from "../../Defines";
import { TimerOnly } from "../../utils/AsyncTool";
import { DegreeType } from "../blackboard/BoardDefine";
import ProcedureData from "./ProcedureData";
import { ProcedureModuleC } from "./ProcedureModuleC";
import ProcedureScript from "./component/ProcedureScript";
import { EmProcedureState } from "./const/EmProcedureState";
import GlobalDataHelper from "./ui/GlobalDataHelper";


/**
 * Procedure模块Server端
 */
export class ProcedureModuleS extends ModuleS<ProcedureModuleC, ProcedureData> {

    @Decorator.noReply()
    public net_syncProcedureState(userId: string, state: EmProcedureState, data?: any) {
        if (!userId) {
            userId = this.currentPlayer.userId;
            if (userId) {
                console.log(`DEBUG MyTypeError>>> 同步状态成功，客户端没有userId，但是服务端有userId userId: ${userId}`);
                this.getScript(userId).setState(state, data);
            } else {
                console.log(`DEBUG MyTypeError>>> 同步状态失败，客户服务端都没有userId userId: ${userId}`);
            }
        } else {
            this.getScript(userId).setState(state, data);
        }
        // 同步状态的时候玩家下线了，给pass掉
        // if (!this._scriptMap.has(userId)) {
        //     console.log(`DEBUG TypeError>>> 同步状态失败，玩家有可能离开了userId: ${userId}`);
        //     return;
        // }
        // ProcedureModuleS.getScriptByUserID(userId).setState(state, data);
    }

    /** 流程脚本的map, key为玩家userID, value时流程脚本 */
    private _scriptMap: Map<string, ProcedureScript> = new Map();

    protected onPlayerJoined(player: mw.Player): void {
        player.character.collisionWithOtherCharacterEnabled = GamesStartDefines.isOpenCharCollsion;
        this.initPlayerScript(player);
    }

    private initPlayerScript(player: Player) {
        if (this._scriptMap.has(player.userId)) { return; }
        let procedureScript = player.getPlayerState(ProcedureScript);
        procedureScript.initAttribute(player.userId, player.playerId);
        this._scriptMap.set(player.userId, procedureScript);
        return procedureScript;
    }

    private timerMap: Map<string, TimerOnly> = new Map();

    /** 玩家下线，如果仍在进行游戏的状态，则保存游戏运行时间，销毁脚本，删除在map中的脚本 */
    protected async onPlayerLeft(player: mw.Player) {
        if (!this._scriptMap.has(player.userId)) { return; }
        let procedureScript = this.getScript(player.userId);
        if (procedureScript.state === EmProcedureState.Start) {
            procedureScript.setState(EmProcedureState.End);
            console.log("DEBUG>>> 玩家下线了，保存一下当前的存档");
        }

        if (this.timerMap.has(player.userId)) {
            this.timerMap.get(player.userId).setTimeout(() => {
                procedureScript.destroy();
                this._scriptMap.delete(player.userId);
                this.timerMap.delete(player.userId);
            }, 1e4);
        } else {
            const timer = new TimerOnly();
            // 十秒后清
            timer.setTimeout(() => {
                procedureScript.destroy();
                this._scriptMap.delete(player.userId);
                this.timerMap.delete(player.userId);
            }, 1e4);
            this.timerMap.set(player.userId, timer);
        }
    }

    @Decorator.noReply()
    public net_setPlayerVisible(playerId: number, visible: boolean) {
        Player.getPlayer(playerId)?.character.setVisibility(visible ? PropertyStatus.On : PropertyStatus.Off);
    }

    @Decorator.noReply()
    public net_loadGame(userID: string, degree: number, style: number, archiveID: number) {
        let script = this.getScript(userID);
        script.degree = degree;
        script.style = style;
        script.archiveID = archiveID;
    }

    /** 拿脚本 */
    private getScript(userId: string) {
        if (!userId) { console.error(`DEBUG MyTypeError>>> 拿流程控制脚本失败 userId: ${userId}`); return; }

        let script = this._scriptMap.get(userId);
        if (!script) {
            script = ModuleService.getModule(ProcedureModuleS).initPlayerScript(Player.getPlayer(userId));
        }
        if (this.timerMap.has(userId)) {
            this.timerMap.get(userId).stop();
            this.timerMap.delete(userId);
        }
        return script;
    }

    /** 拿通过人数 */
    @Decorator.noReply()
    public net_passDegree(pid: number, degree: number) {
        const data = this.getPlayerData(pid);
        data.passDegree(degree);
    }

    /** 拿通过人数 */
    public net_reqPassNum(degree: number) {
        return GlobalDataHelper.getPassNum(degree);
    }

    /**
     * 根据用户id取流程脚本 - 仅供服务端调用，能保证一定有userId的script
     * @param userId 用户id
     * @returns 流程脚本
     */
    public static getScriptByUserID(userId: string) {
        let script = ModuleService.getModule(ProcedureModuleS)._scriptMap.get(userId);
        if (!script) {
            console.log("DEBUG>>> onPlayerJoined初始化脚本失败，重新初始化玩家流程控制脚本 userId: " + userId);
            script = ModuleService.getModule(ProcedureModuleS).initPlayerScript(Player.getPlayer(userId));
        }
        return script;
    }

    /**
     * 解锁某一个笔记
     * @param userId 
     * @param noteCfgId 
     */
    @Decorator.noReply()
    public net_unlockNote(userId: string, noteCfgId: number) {
        this.getPlayerData(userId).unlockNote(noteCfgId, userId);
    }

    /**
     * 初始化笔记
     * @param userId 
     */
    @Decorator.noReply()
    public net_initNote(userId: string, archiveId: number) {
        this.getPlayerData(userId).initNote(userId, archiveId);
    }

    /**
     * 加载存档中的笔记
     * @param userId
     */
    @Decorator.noReply()
    public net_loadNote(userId: string) {
        this.getPlayerData(userId).loadNoteByArchive(userId);
    }

    @Decorator.noReply()
    public net_removeNewDegree(pid: number, degree: DegreeType) {
        this.getPlayerData(pid).removeNewDegree(degree);
    }
}

