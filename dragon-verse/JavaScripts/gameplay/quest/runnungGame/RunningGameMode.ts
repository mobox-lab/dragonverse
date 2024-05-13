import { GameConfig } from "../../../config/GameConfig";
import { EventDefine } from "../../../const/EventDefine";
import AudioController from "../../../controller/audio/AudioController";
import { QuestModuleC } from "../../../module/quest/QuestModuleC";
import { RunningGameData, RunningGameEndPanel } from "../../../ui/runningGame/RunningGameEndPanel";
import { RunningGameGamingPanel } from "../../../ui/runningGame/RunningGameGamingPanel";
import { RunningGamePreparePanel } from "../../../ui/runningGame/RunningGamePreparePanel";
import { RunningGameController } from "./RuninngGameController";
import { CompanionModule_C } from "../../../module/companion/CompanionModule_C";
import MainPanel from "../../../ui/main/MainPanel";
import CharacterStateType = mw.CharacterStateType;

/**
 * 跑酷游戏状态
 */
export enum RunningGameStatus {

    Guide = 1,

    Ready = 2,

    Start = 3,

    End = 4

}

export class RunningGameMode {

    /**
     * 游戏总时长
     */
    private _gameTime: number;

    /**
     * 游戏状态
     */
    private _status: RunningGameStatus;


    private _gameController: RunningGameController;

    private _enterSpeedUpTime: number;

    private _enterSpeedDownTime: number;

    private _enterTransTime: number;

    private _playTime: number;

    private _speedScore: number;

    private _timeScore: number;

    private _transStartScore: number;

    private _transEndScore: number;

    private _playScore: number;

    private _companionModuleCache: CompanionModule_C;

    private get companionModule() {
        if (!this._companionModuleCache) {
            this._companionModuleCache = ModuleService.getModule(CompanionModule_C);
        }
        return this._companionModuleCache;
    }

    private _companionPairBagIdCache: number = 0;

    public get playScore(): number {
        return this._playScore;
    }


    constructor() {

        this.initGame();
    }

    private initGame() {
        this._gameTime = GameConfig.Global.RG_Time.value;
        this._enterSpeedDownTime = 0;
        this._enterSpeedUpTime = 0;
        this._enterTransTime = 0;
        this._playTime = 0;
        this._playScore = 0;

        this._speedScore = GameConfig.Global.RG_Speed_Score.value;
        this._timeScore = GameConfig.Global.RG_Time_Score.value;
        this._transStartScore = GameConfig.Global.RG_TransStart_Score.value;
        this._transEndScore = GameConfig.Global.RG_TransEnd_Score.value;

        this.setStatus(RunningGameStatus.Guide);
    }

    /**
     * 设置游戏状态
     */
    public setStatus(value: RunningGameStatus) {
        if (this._status === value || value <= this._status) {
            return;
        }
        this._status = value;
        this.onStatusChange();
    }

    /**
     * 当游戏状态改变
     */
    private onStatusChange() {
        switch (this._status) {
            case RunningGameStatus.Guide:
                this.onGuide();
                break;
            case RunningGameStatus.Ready:
                this.onReady();
                break;
            case RunningGameStatus.Start:
                this.onStart();
                break;
            case RunningGameStatus.End:
                // UIService.getUI(MainPanel)?.enableReset(true);
                Event.dispatchToLocal(EventDefine.OnRuningGameEnd);
                break;
            default:
                break;
        }
    }

    public onGuide() {
        if (!this._gameController) {
            const character = Player.localPlayer.character;
            UIService.getUI(MainPanel)?.enableReset(false);
            UIService.getUI(MainPanel)?.enableJump(false);
            character.changeState(CharacterStateType.Flying)
            this._companionPairBagIdCache = this.companionModule.getCurrentShowupBagId();
            if (this._companionPairBagIdCache !== 0) this.companionModule.showUpCompanion(this._companionPairBagIdCache, false);
            this._gameController = new RunningGameController(character);

        }
    }

    private onReady() {
        AudioController.getInstance().play(23);

        UIService.show(RunningGamePreparePanel).showReady();
        let delayTime = GameConfig.Global.RG_Ready_Time.value + GameConfig.Global.RG_Interval_Time.value;
        setTimeout(() => {
            this.setStatus(RunningGameStatus.Start);
        }, delayTime * 1000);


    }

    private _hander: number;

    private onStart() {
        UIService.show(RunningGamePreparePanel).showGo();
        UIService.show(RunningGameGamingPanel);
        Event.dispatchToLocal(EventDefine.OnRunningGameTimeChange, this._gameTime);
        this._hander = TimeUtil.setInterval(this.onCountDown, 1);
        Event.dispatchToLocal(EventDefine.OnRunningGameStart);
    }

    private onCountDown = () => {
        this._gameTime--;
        this._playTime++;
        Event.dispatchToLocal(EventDefine.OnRunningGameTimeChange, this._gameTime);
        if (this._gameTime <= 0) {
            this.setStatus(RunningGameStatus.End);
        }
    };

    public onEnd() {
        if (this._hander) {
            TimeUtil.clearInterval(this._hander);
            this._hander = null;
        }
        if (this._gameController) {
            this._gameController.onEnd();
            this._gameController = null;
        }

        if (this._companionPairBagIdCache !== 0) this.companionModule.showUpCompanion(this._companionPairBagIdCache, true);
        this._companionPairBagIdCache = 0;

        UIService.getUI(MainPanel)?.enableReset(true);
        UIService.getUI(MainPanel)?.enableJump(true);
        if (this._status != RunningGameStatus.Guide) {
            //关闭游戏UI
            UIService.hide(RunningGameGamingPanel);
            //出现结算UI
            AudioController.getInstance().play(25);
            Player.localPlayer.character.movementEnabled = false;
            const data = new RunningGameData();
            const flag = ModuleService.getModule(QuestModuleC).updateRunningGameScore(this._playScore);
            data.isNewRecord = flag;
            data.trans = this._enterTransTime;
            data.speedUp = this._enterSpeedUpTime;
            data.time = this._playTime;
            data.score = this._playScore;
            UIService.show(RunningGameEndPanel, data);
        }


    }

    private addGameTime(val: number) {
        this._gameTime += val;
        Event.dispatchToLocal(EventDefine.OnRunningGameTimeChange, this._gameTime, val);
    }

    private addScore(val: number) {
        this._playScore += val;
        Event.dispatchToLocal(EventDefine.OnRunningGameScoreChange, this._playScore);

    }

    public enterSpeedUp() {
        AudioController.getInstance().play(20);

        this._enterSpeedUpTime++;
        this.addScore(this._speedScore);
        this._gameController?.enterSpeedUp();
    }

    public enterSpeedDown() {
        AudioController.getInstance().play(21);

        this._enterSpeedDownTime++;
        this._gameController?.enterSpeedDown();
    }

    public enterTransStart() {
        AudioController.getInstance().play(16);

        this.addScore(this._transStartScore);
        this.addGameTime(4);
    }

    public enterTransEnd() {
        AudioController.getInstance().play(16);

        this._enterTransTime++;
        this.addScore(this._transEndScore);
        this._gameController?.enterSpeedUp();

    }

    public enterPoint() {
        AudioController.getInstance().play(19);

        this.addGameTime(2);
        this._gameController?.enterSpeedUp();
        this.addScore(this._timeScore);
    }


    // public clear() {
    //     if (this._gameController) {
    //         this._gameController.clear();
    //         this._gameController = null;
    //     }
    // }

}