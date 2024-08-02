/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-12 13:26:06
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-29 13:36:11
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\runnungGame\RunningGameQuest.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GameConfig } from "../../../config/GameConfig";
import { EventDefine } from "../../../const/EventDefine";
import AudioController, { BgmPlayStrategy } from "../../../controller/audio/AudioController";
import { CircleType } from "../../interactive/CircleTrigger";
import { Quest } from "../Quest";
import { RunningGameMagicCircle } from "./RunningGameMagicCircle";
import { RunningGameMode, RunningGameStatus } from "./RunningGameMode";
import Log4Ts from "mw-log4ts";


export const RunningGameGetParticle: string = "153617";
@mw.Component
export default class RunningGameQuest extends Quest {

    @mw.Property({ displayName: "起点碰撞体guid" })
    private _startObjGuid: string = "";

    @mw.Property({ group: "火龙魔法阵", displayName: "魔法阵guid" })
    private _fireObjGuid: string = "";

    @mw.Property({ group: "火龙魔法阵", displayName: "解封特效guid" })
    private _fireBreakGuid: string = "";

    @mw.Property({ group: "火龙魔法阵", displayName: "触发器guid" })
    private _fireTriggerGuid: string = "";

    @mw.Property({ group: "火龙魔法阵", displayName: "火龙ID" })
    private _fireId: number = 1;

    @mw.Property({ group: "水龙魔法阵", displayName: "魔法阵guid" })
    private _waterObjGuid: string = "";

    @mw.Property({ group: "水龙魔法阵", displayName: "解封特效guid" })
    private _waterBreakGuid: string = "";

    @mw.Property({ group: "水龙魔法阵", displayName: "触发器guid" })
    private _waterTriggerGuid: string = "";

    @mw.Property({ group: "水龙魔法阵", displayName: "水龙ID" })
    private _waterId: number = 2;

    @mw.Property({ group: "木龙魔法阵", displayName: "魔法阵guid" })
    private _woodObjGuid: string = "";

    @mw.Property({ group: "木龙魔法阵", displayName: "解封特效guid" })
    private _woodBreakGuid: string = "";

    @mw.Property({ group: "木龙魔法阵", displayName: "触发器guid" })
    private _woodTriggerGuid: string = "";

    @mw.Property({ group: "木龙魔法阵", displayName: "木龙ID" })
    private _woodId: number = 3;

    @mw.Property({ group: "土龙魔法阵", displayName: "魔法阵guid" })
    private _soilObjGuid: string = "";

    @mw.Property({ group: "土龙魔法阵", displayName: "解封特效guid" })
    private _soilBreakjGuid: string = "";

    @mw.Property({ group: "土龙魔法阵", displayName: "触发器guid" })
    private _soilTriggerGuid: string = "";

    @mw.Property({ group: "土龙魔法阵", displayName: "土龙ID" })
    private _sildId: number = 4;

    @mw.Property({ group: "终极魔法阵", displayName: "魔法阵guid" })
    private _finalGuid: string = "";

    @mw.Property({ group: "终极魔法阵", displayName: "解封特效guid" })
    private _finalBreakGuid: string = "";

    @mw.Property({ group: "终极魔法阵", displayName: "碰撞模型guid" })
    private _finalCollision: string = "";

    private _finalObj: mw.GameObject;

    private _finalBreakObj: mw.Effect;

    private _finalCollisionObj: mw.GameObject;


    protected get progress(): number {
        return 0;
    }

    private _startObj: mw.GameObject;

    private _gameMode: RunningGameMode;

    //private _gameController: RunningGameController;

    private _infos: { type: number, complete: boolean }[];


    protected onSerializeCustomData(customData: string): void {
        if (customData) {
            this._infos = JSON.parse(customData);
        } else {
            this._infos = [];
            for (let i = 1; i < 5; i++) {
                this._infos.push({ type: i, complete: false });
            }
            // this._infos = GameConfig.Dragon.getAllElement().map((val) => {
            //     return { type: val.elementalId, complete: false }
            // })

        }

    }

    protected onInitialize(): void {
        super.onInitialize();
        this.initEvents();
        this.initMagicCircle();
        this._startObj = mw.GameObject.findGameObjectById(this._startObjGuid);
        AssetUtil.asyncDownloadAsset(RunningGameGetParticle);
    }

    private initMagicCircle() {
        this._finalObj = mw.GameObject.findGameObjectById(this._finalGuid);
        this._finalBreakObj = mw.GameObject.findGameObjectById(this._finalBreakGuid) as mw.Effect;
        this._finalCollisionObj = mw.GameObject.findGameObjectById(this._finalCollision);
        for (const info of this._infos) {
            //if (info.complete) continue;
            //1火 2水 3木 4土
            switch (info.type) {
                case 1:
                    new RunningGameMagicCircle(this._fireObjGuid, this._fireBreakGuid, this._fireTriggerGuid, this._fireId, info.complete);
                    break;
                case 2:
                    new RunningGameMagicCircle(this._waterObjGuid, this._waterBreakGuid, this._waterTriggerGuid, this._waterId, info.complete);
                    break;
                case 3:
                    new RunningGameMagicCircle(this._woodObjGuid, this._woodBreakGuid, this._woodTriggerGuid, this._woodId, info.complete);
                    break;
                case 4:
                    new RunningGameMagicCircle(this._soilObjGuid, this._soilBreakjGuid, this._soilTriggerGuid, this._sildId, info.complete);
                    break;
                default:
                    break;
            }
        }
        if (this.checkIsAllComplete()) {
            this._finalObj.destroy();
            this._finalBreakObj.destroy();
            this._finalCollisionObj.destroy();
        }
    }


    private initEvents() {
        Log4Ts.log(RunningGameQuest, `init events`);
        mw.Event.addLocalListener(EventDefine.PlayerEnterCircleTrigger, this.onPlayerEnterCircleTrigger);
        mw.Event.addLocalListener(EventDefine.OnRuningGameEnd, this.runningGameEnd);
        mw.Event.addLocalListener(EventDefine.OnRunningGameBack, this.runningGameBack);
        mw.Event.addLocalListener(EventDefine.OnRunningGameAgain, this.runningGameAgain);
        mw.Event.addLocalListener(EventDefine.OnRunningGameStart, this.runningGameStart);
        mw.Event.addLocalListener(EventDefine.OnRunningGameUnlockMagicCircle, this.runningGameUnlockMagicCircle);


    }

    private onPoint() {

    }

    private onTransStart() {

    }

    private onTransEnd() {

    }

    private onGameGuide() {
        if (!this._gameMode) {
            this._gameMode = new RunningGameMode();
            AudioController.getInstance().play(18);

        }
    }

    private onGameReady() {
        this._gameMode?.setStatus(RunningGameStatus.Ready);
    }

    private onGameEnd() {

        // if (this._gameMode) {
        //     this._gameMode.onEnd();
        //     this._gameMode = null;
        // }
        AudioController.getInstance().playBgm(undefined, BgmPlayStrategy.Rnd);

        this.runningGameEnd();
        Player.localPlayer.character.changeState(CharacterStateType.Running);

    }

    private onPlayerEnterCircleTrigger = (circleType: CircleType) => {
        const character = Player.localPlayer.character;

        switch (circleType) {
            case CircleType.SpeedUp:
                this._gameMode?.enterSpeedUp();
                //this._gameController?.enterSpeedUp();
                break;
            case CircleType.SpeedDown:
                this._gameMode?.enterSpeedDown();
                //this._gameController?.enterSpeedDown();
                break;
            case CircleType.Point:
                this._gameMode?.enterPoint();
                break;
            case CircleType.TransStart:
                this._gameMode?.enterTransStart();
                break;
            case CircleType.TransEnd:
                this._gameMode?.enterTransEnd();
                break;
            case CircleType.Guide:
                this.onGameGuide();
                break;
            case CircleType.GameReady:
                this.onGameReady();
                break;
            case CircleType.GameEnd:
                this.onGameEnd();
                break;
            default:
                break;
        }

    };


    private runningGameStart = () => {
        (this._startObj as mw.Model).setCollision(mw.CollisionStatus.Off);
        (this._startObj as mw.Model).setVisibility(mw.PropertyStatus.Off);
    };

    private runningGameEnd = () => {
        if (this._gameMode) {
            this._gameMode.onEnd();
            this._gameMode = null;
        }
        (this._startObj as mw.Model).setCollision(mw.CollisionStatus.On);
        (this._startObj as mw.Model).setVisibility(mw.PropertyStatus.On);
    };

    private runningGameBack = () => {
        AudioController.getInstance().playBgm(undefined, BgmPlayStrategy.Rnd);

        const character = Player.localPlayer.character;
        character.movementEnabled = true;
        character.changeState(CharacterStateType.Running);
        //TODO_LviatYi walk
        character.worldTransform.position = GameConfig.Global.RG_Back_Loc.vec;
    };

    private runningGameAgain = () => {
        const character = Player.localPlayer.character;
        //character.switchToWalking();
        character.movementEnabled = true;
        character.worldTransform.position = GameConfig.Global.RG_Start_Loc.vec;
    };

    private runningGameUnlockMagicCircle = (type: number) => {
        const info = this._infos.find((val) => {
            return val.type === type;
        });
        if (info) {
            info.complete = true;
            this.updateTaskProgress(JSON.stringify(this._infos));
        }

        if (this.checkIsAllComplete()) {
            this._finalObj.destroy();
            this._finalCollisionObj.destroy();
            this._finalBreakObj.play(() => {
                this._finalBreakObj.destroy();
            });
        }
    };


    private checkIsAllComplete() {
        let isAllComplete = true;
        for (const info of this._infos) {
            if (!info.complete) {
                isAllComplete = false;
                break;
            }
        }
        return isAllComplete ? 1 : 0;
    }


    onActivated(): void {
    }

    onComplete(): void {
    }


}