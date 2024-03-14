import { GameConfig } from "../../../../config/GameConfig";
import { TimerOnly, WaitLoop } from "../../../utils/AsyncTool";
import { UtilEx } from "../../../utils/UtilEx";
import { ArchiveHelper } from "../../archive/ArchiveHelper";
import { DegreeType, StyleType } from "../../blackboard/BoardDefine";
import { GlobalRankModuleC } from "../../globalRank/GlobalRankModuleC";
import { ProcedureModuleC } from "../ProcedureModuleC";
import { EmProcedureState, EndType } from "../const/EmProcedureState";
import { Event_GameStateChange } from "../const/Events";
import { LoadingProcedureStateClient, StartProcedureStateClient, EndProcedureStateClient, InitProcedureStateClient } from "../state/ProcedureStateClient";
import { EndProcedureStateServer, InitProcedureStateServer, LoadingProcedureStateServer, StartProcedureStateServer } from "../state/ProcedureStateServer";
import { LosePanel } from "../ui/LosePanel";
import { VictoryPanel } from "../ui/VictoryPanel";

/** 继承PlayerState之后只同步给客户端自己 */
@Component
export default class ProcedureScript extends mw.PlayerState {

    /** 用于同步的游戏状态 双端 */
    private _state: EmProcedureState = EmProcedureState.Init;

    /** 难度 双端 */
    public degree: DegreeType = DegreeType.Simple;

    /** 画面风格 双端 */
    public style: StyleType = StyleType.Cute;

    /** 存档序号 双端 */
    public archiveID: number = -1;

    /** 玩家id 双端 */
    @Property({ replicated: true })
    public pid: number;

    /** 用户id 双端 */
    @Property({ replicated: true })
    public userId: string;

    /** 单端 */
    public client_canStartGame: boolean = false;

    /** 线索对象 单端 */
    public client_clueGOArray: GameObject[] = [];

    /** 开始游戏或读取存档的时间戳 */
    public server_startTimestamp: number;

    /** 单位 毫秒 */
    @Property({ replicated: true })
    public client_useTime: number = 0;

    /** 服务端计算，双端同步，消耗的时间 / ms */
    public server_useTime: number = 0;

    /** 状态机 */
    private _stateMachine: UtilEx.StateMachine<EmProcedureState> = new UtilEx.StateMachine();

    @Property({ replicated: true, onChanged: "onUseTimeChanged" })
    public endType: EndType = EndType.None;

    /** 结局id */
    public endCfgId: number = 0;

    public initAttribute(userId: string, pid: number) {
        this.userId = userId;
        this.pid = pid;

    }

    /** 游戏开始时，每隔一段时间，自动保存一次数据 */
    private server_saveTimer: TimerOnly = new TimerOnly();

    /** 定时存档的时间 */
    private readonly SaveTime: number = 1e3 * 10;

    /** 开启定时存档 */
    public startIntervalSave() {
        this.server_saveTimer.setInterval(() => {
            console.log("DEBUG>>> 触发定时存档机制");
            ArchiveHelper.reqSetData(this.userId, [], [], true);
        }, this.SaveTime);
    }

    /** 关闭定时存档 */
    public endSave() {
        // ArchiveHelper.reqSetData(this.userId, [], [], true);
        this.server_saveTimer.stop();
        console.log("DEBUG>>> 定时存档机制关闭，强制存档");
    }


    public onUseTimeChanged() {
        if (SystemUtil.isServer()) { return; }
        switch (this.endType) {
            case EndType.Lose:
                UIService.getUI(LosePanel).setTxtInfo();
                break;
            case EndType.Success:
                UIService.getUI(VictoryPanel).setTxtInfo();
                let useTimeSec = Math.floor(this.client_useTime / 1e3);
                if (this.endCfgId) {
                    ModuleService.getModule(ProcedureModuleC).savePassExp(useTimeSec, Number(this.endCfgId), this.degree, this.userId);
                    ModuleService.getModule(GlobalRankModuleC).reqSetEndingData(Number(this.endCfgId), this.degree, useTimeSec);
                }
                ModuleService.getModule(GlobalRankModuleC).reqSetPassTime(this.degree, useTimeSec);
                break;
        }
    }

    /** 统计消耗时间 */
    public async countUseTime() {
        if (SystemUtil.isClient()) { return; }
        let archiveData = await ArchiveHelper.reqGetData(this.userId, this.archiveID);
        if (!archiveData) { archiveData = await WaitLoop.loop(() => { return ArchiveHelper.reqGetData(this.userId, this.archiveID) }, 10, 1e2) }
        if (!archiveData) { return; }
        let useTime = archiveData.gameTime;
        this.server_useTime = useTime + (Date.now() - this.server_startTimestamp);
        this.client_useTime = this.server_useTime;
    }

    /**
     * 服务端保存一下游戏进行时间
     * @return 返回当前游戏进行的时间
     */
    public saveUseTime(): number {
        let useTime = Date.now() - this.server_startTimestamp;
        this.server_startTimestamp = Date.now();
        return useTime;
    }

    /**
     * 当前状态
     */
    public get state() {
        return this._state;
    }

    public setState(state: EmProcedureState, data?: any) {
        this._state = state;
        this._stateMachine.switch(this._state, data);
        SystemUtil.isClient() && Event.dispatchToLocal(Event_GameStateChange, this._state, data);
    }

    protected onStart(): void {
        this.useUpdate = true;
        SystemUtil.isClient() ? this.client_onStart() : this.server_onStart();
    }

    protected onUpdate(dt: number) {
        this._stateMachine.update(dt);
    }

    // client
    private async client_onStart() {
        await ModuleService.ready();
        ModuleService.getModule(ProcedureModuleC).registerProcedureScript(this);
        this._stateMachine.register(EmProcedureState.Init, new InitProcedureStateClient(this));
        this._stateMachine.register(EmProcedureState.Loading, new LoadingProcedureStateClient(this));
        this._stateMachine.register(EmProcedureState.Start, new StartProcedureStateClient(this));
        this._stateMachine.register(EmProcedureState.End, new EndProcedureStateClient(this));
        this._stateMachine.switch(this._state);
        const bgm = GameConfig.Global.GameBGM.string;
        SoundService.playBGM(bgm)
    }

    // server
    private server_onStart() {
        this._stateMachine.register(EmProcedureState.Init, new InitProcedureStateServer(this));
        this._stateMachine.register(EmProcedureState.Loading, new LoadingProcedureStateServer(this));
        this._stateMachine.register(EmProcedureState.Start, new StartProcedureStateServer(this));
        this._stateMachine.register(EmProcedureState.End, new EndProcedureStateServer(this));
        this._stateMachine.switch(this._state);
    }
}