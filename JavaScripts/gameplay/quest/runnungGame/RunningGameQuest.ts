/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-12 13:26:06
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-15 16:07:40
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\runnungGame\RunningGameQuest.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GameConfig } from "../../../config/GameConfig";
import { EventDefine } from "../../../const/EventDefine";
import { CircleType } from "../../interactive/CircleTrigger";
import { Quest } from "../Quest";
import { RunningGameController } from "./RuninngGameController";
import { RunningGameMode, RunningGameStatus } from "./RunningGameMode";




export const RunningGameGetParticle: string = "153617";
@mw.Component
export default class RunningGameQuest extends Quest {

    @mw.Property({ displayName: "起点碰撞体guid" })
    private _startObjGuid: string = "";

    @mw.Property({ group: "土龙魔法阵", displayName: "魔法阵guid" })
    private _soilObjGuid: string;

    @mw.Property({ group: "土龙魔法阵", displayName: "触发器guid" })
    private _soilTriggerGuid: string;

    private _soilObj: mw.GameObject;

    private _soilTrigger: mw.Trigger;

    @mw.Property({ group: "水龙魔法阵", displayName: "魔法阵guid" })
    private _waterObjGuid: string;

    @mw.Property({ group: "水龙魔法阵", displayName: "触发器guid" })
    private _waterTriggerGuid: string;

    private _waterObj: mw.GameObject;

    private _waterTrigger: mw.Trigger;

    @mw.Property({ group: "木龙魔法阵", displayName: "魔法阵guid" })
    private _woodObjGuid: string;

    @mw.Property({ group: "木龙魔法阵", displayName: "触发器guid" })
    private _woodTriggerGuid: string;

    private _woodObj: mw.GameObject;

    private _woodTrigger: mw.Trigger;

    @mw.Property({ group: "火龙魔法阵", displayName: "魔法阵guid" })
    private _fireObjGuid: string;

    @mw.Property({ group: "火龙魔法阵", displayName: "触发器guid" })
    private _fireTriggerGuid: string;

    private _firerObj: mw.GameObject;

    private _fireTrigger: mw.Trigger;

    protected get progress(): number {
        return 0;
    }

    private _startObj: mw.GameObject;

    private _gameMode: RunningGameMode;

    //private _gameController: RunningGameController;

    private _infos: { index: number, complete: boolean }[];


    protected onSerializeCustomData(customData: string): void {
        if (customData) {
            this._infos = JSON.parse(customData);
        } else {
            this._infos = GameConfig.IceBlock.getAllElement().map((val) => {
                return { index: val.id, complete: false }
            })

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
        this._soilObj = mw.GameObject.findGameObjectById(this._soilObjGuid);
        //this._soilTrigger=mw.GameObject.findGameObjectById(this._soilTriggerGuid) as mw.Trigger;

        this._waterObj = mw.GameObject.findGameObjectById(this._waterObjGuid);
        //this._waterTrigger=mw.GameObject.findGameObjectById(this._waterTriggerGuid) as mw.Trigger;

        this._woodObj = mw.GameObject.findGameObjectById(this._woodObjGuid);
        //this._woodTrigger=mw.GameObject.findGameObjectById(this._woodTriggerGuid) as mw.Trigger;

        this._firerObj = mw.GameObject.findGameObjectById(this._fireObjGuid);
        //this._fireTrigger=mw.GameObject.findGameObjectById(this._fireTriggerGuid) as mw.Trigger;
    }


    private initEvents() {
        mw.Event.addLocalListener(EventDefine.PlayerEnterCircleTrigger, this.onPlayerEnterCircleTrigger);
        mw.Event.addLocalListener(EventDefine.OnRuningGameEnd, this.runningGameEnd);
        mw.Event.addLocalListener(EventDefine.OnRunningGameBack, this.runningGameBack);
        mw.Event.addLocalListener(EventDefine.OnRunningGameAgain, this.runningGameAgain);
        mw.Event.addLocalListener(EventDefine.OnRunningGameStart, this.runningGameStart);

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
            default: break;
        }

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

        this.runningGameEnd();
        Player.localPlayer.character.switchToWalking();

    }

    private runningGameStart = () => {
        (this._startObj as mw.Model).setCollision(mw.CollisionStatus.Off);
        (this._startObj as mw.Model).setVisibility(mw.PropertyStatus.Off);
    }

    private runningGameEnd = () => {
        if (this._gameMode) {
            this._gameMode.onEnd();
            this._gameMode = null;
        }
        (this._startObj as mw.Model).setCollision(mw.CollisionStatus.On);
        (this._startObj as mw.Model).setVisibility(mw.PropertyStatus.On);
    }

    private runningGameBack = () => {
        const character = Player.localPlayer.character;
        character.movementEnabled = true;
        character.switchToWalking();
        character.worldTransform.position = GameConfig.Global.RG_Back_Loc.vec;
    }

    private runningGameAgain = () => {
        const character = Player.localPlayer.character;
        character.switchToWalking();
        character.movementEnabled = true;
        character.worldTransform.position = GameConfig.Global.RG_Start_Loc.vec;
    }




    onActivated(): void {
    }

    onComplete(): void {
    }




}