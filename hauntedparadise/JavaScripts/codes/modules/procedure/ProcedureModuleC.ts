/*
 * @Author       : dal
 * @Date         : 2024-03-04 13:23:50
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-07 14:34:39
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ProcedureModuleC.ts
 * @Description  : 
 */
/*
 * @Author       : dal
 * @Date         : 2023-11-16 10:00:42
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-04 13:34:14
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ProcedureModuleC.ts
 * @Description  : 
 */


import { GlobalDefine } from "../../../DefNoSubModule";
import { GameConfig } from "../../../config/GameConfig";
import GameStart from "../../GameStart";
import { TimerOnly } from "../../utils/AsyncTool";
import { GlobalSwitch } from "../../utils/GlobalSwitch";
import TimeTransferUtil from "../../utils/TimeTransferUtil";
import { BoardHelper, BoardKeys, DegreeType } from "../blackboard/BoardDefine";
import { BuffModuleC } from "../buff/BuffModule";
import { GhostModuleC } from "../ghost/GhostModuleC";
import { PlayerAttr } from "../player/PlayerAttr";
import { PlayerModuleC } from "../player/PlayerModuleC";
import { RouteDataType } from "../route/RouteData";
import { RouteModuleC } from "../route/RouteModule";
import ProcedureData from "./ProcedureData";
import { ProcedureModuleS } from "./ProcedureModuleS";
import ProcedureScript from "./component/ProcedureScript";
import { GraveyardExpIndex, DiffExpIndex } from "./const/ClueDefine";
import { EmProcedureState, EndType } from "./const/EmProcedureState";
import { Event_PlayerPass } from "./const/Events";
import { NotebookPanel } from "./ui/NotebookPanel";
import { StoryUI } from "./ui/StoryUI";
import { VictoryPanel } from "./ui/VictoryPanel";

const Event_GhostCachedEvent = "GhostCatchPlayer";

/**
 * Procedure模块Client端
 */
export class ProcedureModuleC extends ModuleC<ProcedureModuleS, ProcedureData> {

    /** 客户端的流程控制脚本 */
    myScript: ProcedureScript;

    /** 保存通关经验 */
    public savePassExp(useTimeSec: number, cfgId: number, degree: DegreeType, userId: string) {
        let exp = 1;
        // 难度倍率
        let diffExpMul = 1;
        // 结局倍率
        let endingExpMul = GameConfig.PassEnding.getElement(cfgId).expMul;
        // 通关分钟
        let passTimeMinute = TimeTransferUtil.getTimeInfoByTimeSec(useTimeSec).minute;
        if (GlobalSwitch.isDynamicDegree()) {
            diffExpMul = GraveyardExpIndex;
            exp = GameConfig.SubGlobal.NaturalOutputExp.number * passTimeMinute * diffExpMul * endingExpMul;
        } else {
            diffExpMul = DiffExpIndex[degree - 1];
            const needTime = GameConfig.PassEnding.getElement(cfgId).needTime;
            const baseExp = GameConfig.SubGlobal.PassBaseExp.number;
            const logTime = passTimeMinute / needTime;
            if (logTime <= 0) { return; }
            exp = (1 - Math.log10(logTime)) * baseExp * endingExpMul * diffExpMul;
        }
        if (Number.isNaN(exp) || exp === Infinity) { return; }
        exp *= BuffModuleC.attr.expIndex;
        ModuleService.getModule(RouteModuleC).reqSetRouteData(userId, GameStart.GameTheme, [RouteDataType.TotalExp], [exp]);
    }


    /**
     * 创建模块,这时候只能调用本模块内容进行初始化
     */
    override onAwake(): void {
        super.onAwake();
        Event.addLocalListener(Event_GhostCachedEvent, this.onPlayerBeChased.bind(this));
        Event.addLocalListener(Event_PlayerPass, this.onPlayerWin.bind(this));
        Event.addLocalListener("Local_PlayerPass", this.onPlayerWinByLocalEvent.bind(this));
        Event.addLocalListener("evt_unlockNote", (guid: string, cfgId: string) => { this.unlockNote(Number(cfgId)) });
    }

    /** 供服务端注册同步到客户端的脚本 */
    public async registerProcedureScript(script: ProcedureScript) {
        this.myScript = script;
    }

    /** 被鬼追辽 */
    private onPlayerBeChased(playerId: number) {
        if (playerId != this.localPlayerId) { return; }
        // 减少玩家的生命
        ModuleService.getModule(PlayerModuleC).reduceLife();
    }

    /** 失败辽 */
    public setPlayerLoseState() {
        this.myScript.setState(EmProcedureState.End, EndType.Lose);
        this.server.net_syncProcedureState(Player.localPlayer.userId, this.myScript.state, EndType.Lose);
    }

    /** 通过单端的事件触发赢取胜利 */
    private onPlayerWinByLocalEvent(guid: string, endingCfgId: string) {
        if (endingCfgId) {
            this.myScript.endCfgId = Number(endingCfgId);
        }
        else {
            this.myScript.endCfgId = 0;
        }
        UIService.show(VictoryPanel, endingCfgId);
        this.myScript.setState(EmProcedureState.End, EndType.Success);
        // 保存通关信息
        ModuleService.getModule(RouteModuleC).reqSavePassInfo(this.myScript.degree, this.myScript.endCfgId);
        this.server.net_syncProcedureState(Player.localPlayer.userId, this.myScript.state, EndType.Success);
        if (!this.data.isDegreePassed(this.myScript.degree)) { this.server.net_passDegree(this.localPlayerId, this.myScript.degree); }
    }

    /** 胜利辽 */
    private onPlayerWin(guid: string, endingCfgId: string) {
        const char = GameObject.findGameObjectById(guid) as Character;
        if (!char || char.player != this.localPlayer) { return; }

        if (endingCfgId) {
            this.myScript.endCfgId = Number(endingCfgId);
        }
        else {
            this.myScript.endCfgId = 0;
        }
        UIService.show(VictoryPanel, endingCfgId);
        this.myScript.setState(EmProcedureState.End, EndType.Success);
        // 保存通关信息
        ModuleService.getModule(RouteModuleC).reqSavePassInfo(this.myScript.degree, this.myScript.endCfgId);
        this.server.net_syncProcedureState(Player.localPlayer.userId, this.myScript.state, EndType.Success);
        if (!this.data.isDegreePassed(this.myScript.degree)) { this.server.net_passDegree(this.localPlayerId, this.myScript.degree); }
    }

    /** 主动改变难度 */
    public changeDegree(degree: number) {
        // 不是动态难度的游戏不能主动改难度
        if (!GlobalSwitch.isDynamicDegree()) { return; }
        BoardHelper.ChangeKeyValue(BoardKeys.Degree, degree.toString());
        this.myScript.degree = degree;
    }

    private clientLoadGame(degree: number, style: number, archiveID: number) {
        BoardHelper.ChangeKeyValue(BoardKeys.Style, style.toString());
        BoardHelper.ChangeKeyValue(BoardKeys.Degree, degree.toString());
        if (degree < GlobalDefine.minDegree) {
            ModuleService.getModule(GhostModuleC).protectedPlayer(true);
        }
        else {
            ModuleService.getModule(GhostModuleC).protectedPlayer(false);
        }

        BoardHelper.ChangeKeyValue(BoardKeys.ArchiveID, style.toString());
        this.myScript.degree = degree;
        this.myScript.style = style;
        this.myScript.archiveID = archiveID;
        this.myScript.setState(EmProcedureState.Loading);
        this.server.net_syncProcedureState(Player.localPlayer.userId, this.myScript.state);
    }

    /** 是否通过存档 */
    private isLoadByArchive: boolean = false;

    /**
     * 加载
     * @param degree 难度
     * @param style 画面风格
     * @param archiveID 存档id default 0
     * @param isLoadByArchive 是否读档
     */
    public loadGame(degree: number, style: number, archiveID: number, isLoadByArchive: boolean = false) {
        console.log(`DEBUG>>> 加载游戏，难度：${degree}, 风格：${style}，存档序号：${archiveID}`);
        // UIService.show(StoryUI);
        ModuleService.getModule(ProcedureModuleC).startGame();
        UIService.getUI(NotebookPanel).clearAllDot();
        SoundService.playSound("131828");
        this.isLoadByArchive = isLoadByArchive;
        this.server.net_loadGame(Player.localPlayer.userId, degree, style, archiveID);
        this.clientLoadGame(degree, style, archiveID);
    }

    public startGame() {
        this.myScript.client_canStartGame = true;
        this.isLoadByArchive ? ModuleService.getModule(PlayerModuleC).setLife() : ModuleService.getModule(PlayerModuleC).initLife();

        this.isLoadByArchive ? this.server.net_loadNote(Player.localPlayer.userId) : this.server.net_initNote(Player.localPlayer.userId, this.myScript.archiveID);
    }

    public getServer(): ProcedureModuleS {
        return this.server;
    }

    /** 回到主菜单 */
    public backMainMenuPanel() {
        this.myScript.setState(EmProcedureState.End);
        this.server.net_syncProcedureState(Player.localPlayer.userId, this.myScript.state);
    }

    passInfoMap: Map<number, PassInfo> = new Map();

    /**
     * 拿通关人数, 连续拿要等十秒才会去服务端请求
     * @param degree 难度
     * @returns 通关人数
     */
    public async reqPassNum(degree: DegreeType): Promise<number> {
        let passNum: number = 0;
        if (!this.passInfoMap.has(degree)) {
            this.passInfoMap.set(degree, new PassInfo());
            passNum = await this.reqUpdatePassInfoMap(degree);
        } else {
            passNum = this.passInfoMap.get(degree).canReq ? await this.reqUpdatePassInfoMap(degree) : this.passInfoMap.get(degree).passNum;
        }
        return passNum;
    }

    /**
     * 请求设置通关人数的map并返回从服务端拿到的值  ( 有前提必须存在map中 )
     * @param degree 难度
     * @returns 从服务端拿到的通关人数值
     */
    private async reqUpdatePassInfoMap(degree: DegreeType): Promise<number> {
        if (!this.passInfoMap.has(degree)) { return; }
        let passInfo = this.passInfoMap.get(degree);
        passInfo.passNum = await this.server.net_reqPassNum(degree);
        passInfo.canReq = false;
        // 十秒才可继续请求服务端的数量
        passInfo.timer.setTimeout(() => { passInfo.canReq = true; }, 1e4);
        return passInfo.passNum;
    }

    /** 解锁笔记 */
    public unlockNote(noteCfgId: number) {
        if (this.noteIsUnlock(noteCfgId)) { return; }
        this.server.net_unlockNote(Player.localPlayer.userId, noteCfgId);
    }

    /** 看笔记解锁了没 */
    public noteIsUnlock(cfgId: number) {
        return this.data.getNoteIsUnlockById(cfgId);
    }

    public removeNewDegree(degree: DegreeType) {
        this.server.net_removeNewDegree(this.localPlayerId, degree);
    }
}

class PassInfo {

    // 定时器
    timer: TimerOnly = new TimerOnly();

    passNum: number = 0;

    /** 是否可以向服务器请求了 */
    canReq: boolean = true;
}