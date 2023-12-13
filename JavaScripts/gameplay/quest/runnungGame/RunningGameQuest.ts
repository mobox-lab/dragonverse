/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-12 13:26:06
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-13 16:12:25
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\runnungGame\RunningGameQuest.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EventDefine } from "../../../const/EventDefine";
import { CircleType } from "../../interactive/CircleTrigger";
import { Quest } from "../Quest";
import { RunningGameController } from "./RuninngGameController";
import { RunningGameMode, RunningGameStatus } from "./RunningGameMode";



@mw.Component
export default class RunningGameQuest extends Quest {

    private _gameMode: RunningGameMode;

    //private _gameController: RunningGameController;

    protected onSerializeCustomData(customData: string): void {


    }

    protected onInitialize(): void {
        super.onInitialize();
        this.initEvents();
    }


    private initEvents() {
        mw.Event.addLocalListener(EventDefine.PlayerEnterCircleTrigger, this.onPlayerEnterCircleTrigger);
    }

    private onPlayerEnterCircleTrigger = (circleType: CircleType) => {
        const character = Player.localPlayer.character;

        switch (circleType) {
            case CircleType.SpeedUp:
                this._gameMode.enterSpeedUp();
                //this._gameController?.enterSpeedUp();
                break;
            case CircleType.SpeedDown:
                this._gameMode.enterSpeedDown();
                //this._gameController?.enterSpeedDown();
                break;
            case CircleType.Point:
                this._gameMode.enterPoint();
                break;
            case CircleType.TransStart:
                this._gameMode.enterTransStart();
                break;
            case CircleType.TransEnd:
                this._gameMode.enterTransEnd();
                break;
            case CircleType.Guide:
                this.onGuide();
                break;
            case CircleType.GameStart:
                this.onGameStart();
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

    private onGuide() {
        if (!this._gameMode) {
            this._gameMode = new RunningGameMode();
        }
    }

    private onGameStart() {
        this._gameMode?.setStatus(RunningGameStatus.Ready);

    }

    private onGameEnd() {

        if (this._gameMode) {
            this._gameMode.clear();
            this._gameMode = null;
        }
        Player.localPlayer.character.switchToWalking();

    }




    onActivated(): void {
    }

    onComplete(): void {
    }




}