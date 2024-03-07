import Enumerable from "linq";
import UUID from "pure-uuid";
import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import { BagTypes } from "../../const/ForeignKeyIndexer";

import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import MainPanel from "../../ui/main/MainPanel";

import { BagModuleS } from "../bag/BagModule";


import noReply = mwext.Decorator.noReply;
import EventListener = mw.EventListener;

import { ObbyInteractorPanel } from "../../ui/obby/ObbyInteractorPanel";
import { DataUpgradeMethod, JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";
import Nolan from "../../depend/nolan/Nolan";
import i18n from "../../language/i18n";
import UnifiedRoleController from "../role/UnifiedRoleController";
import { ObbyEndPanel, ObbyGameData } from "../../ui/obby/ObbyEndPanel";
import { MapManager } from "../../gameplay/map/MapManager";
import { NoOverride } from "../../util/GToolkit";


export default class ObbyModuleData extends JModuleData {
    @Decorator.persistence()
    public totalStarCount: number = 0;

    @Decorator.persistence()
    public leaveObbyByExitGame: boolean = false;

    public recordStarCount(count: number, save: boolean = true) {
        this.totalStarCount += count;
        if (save) this.save(true);
    }

    public setLeaveObbyByExitGame(value: boolean) {
        this.leaveObbyByExitGame = value;
        this.save(false);
    }

    protected get releasedVersions(): number[] {
        return [
            202401291339,
            202403051755
        ];
    }

    protected get updateVersionMethod(): DataUpgradeMethod<this>[] {
        return [(data) => {
            delete data["lv"];
            return data;
        }];
    }
}

/**
 * ObbyModuleData.
 * 跑酷模块.
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class ObbyModuleC extends JModuleC<ObbyModuleS, ObbyModuleData> {
    //#region Constant

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member

    // private _mainPanel: MainPanel;
    private _obbyPanel: ObbyInteractorPanel;
    private _curLv: number;
    private _maxLv: number;
    // private _isStart: boolean;
    private _isInGame: boolean;
    private _eventListeners: EventListener[] = [];
    private _checkPointCfg = {};
    private _effectPointCfg = {};
    private _effectScaleCfg = {};
    // private _hander: number;
    public _startPos: mw.Vector;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onJStart(): void {
        //#region Member init
        this._obbyPanel = UIService.create(ObbyInteractorPanel);
        this.initCheckPoint();
        Log4Ts.log(ObbyModuleC, "obbyModuleC onStart================");
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.PlayerReset, this.onPlayerReset.bind(this)));
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
        Log4Ts.log(ObbyModuleC, "obbyModuleC onEnterScene================");
    }

    protected onDestroy(): void {
        Log4Ts.log(ObbyModuleC, "obbyModuleC onDestroy================");
        super.onDestroy();

        //#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method

    private initCheckPoint() {

        let len = GameConfig.Obbycheck.getAllElement().length;
        this._maxLv = len;
        for (let i = 1; i <= len; i++) {
            let ele = GameConfig.Obbycheck.getElement(i);
            this._checkPointCfg["" + i] = new mw.Vector(ele.checkpointloc[0], ele.checkpointloc[1], ele.checkpointloc[2]);
            this._effectPointCfg["" + i] = new mw.Vector(ele.splashpointloc[0], ele.splashpointloc[1], ele.splashpointloc[2]);
            this._effectScaleCfg["" + i] = new mw.Vector(ele.splashscale[0], ele.splashscale[1], ele.splashscale[2]);
        }
        // reborn ============== pos=X=393994.28125 Y=13640.490234375 Z=24237.24609375 
    }

    /**
     * 是否在游戏中
     */
    public isInGame(): boolean {
        return this._isInGame;
    }

    /**
     * 进入游戏
     */
    public enterGame() {
        //拉取当前的进度
        // this._isStart = false;


        this._isInGame = true;
        this._curLv = 0;
        this._startPos = Player.localPlayer.character.worldTransform.position.clone();
        this.server.net_startGame(Player.localPlayer.playerId);
        UIService.showUI(this._obbyPanel);
        Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityX(0);
        Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityY(0);

        this.setObbyProps(Player.localPlayer.character);

        let mainPanel = UIService.getUI(MainPanel);
        if (mainPanel) {
            mainPanel.setCanSprint(false);
            mainPanel.resetCanvas.visibility = SlateVisibility.Hidden;
            mainPanel.obbySkillCanvas.visibility = SlateVisibility.Visible;
            // mainPanel.playcount.visibility = SlateVisibility.Visible;
            // mainPanel.coincount.visibility = SlateVisibility.Visible;
            mainPanel.switchRoomCanvas.visibility = SlateVisibility.Hidden;
            MapManager.instance.hideMap();
        }
    }

    // private async onCountDown() {
    //     // if (!this._isStart) {
    //     //     return;
    //     // }
    //     // if (this._hander) {

    //     // await TimeUtil.delaySecond(0);
    //     //     TimeUtil.clearInterval(this._hander);
    //     //     this._hander = null;
    //     // }
    // };

    public async endGame() {
        console.log("1111111111111111111111111111")
        let res = await this.server.net_endGame();
        let data = new ObbyGameData();
        data.score = res.currentCount;
        data.totalScore = res.totalCount;
        data.time = res.duration;
        data.trans = res.passedLevel;
        UIService.show(ObbyEndPanel, data);
    }

    private _isFindingPath = false;

    public async autoFindPath() {
        if (!this._isFindingPath) {
            this._isFindingPath = true;
            //算下角度
            let nextPos = (this._checkPointCfg[(this._curLv + 1).toString()] as Vector).clone();
            if (nextPos) {
                let direction = nextPos.subtract(mw.Player.localPlayer.character.worldTransform.position).normalized;
                // mw.Player.localPlayer.character.worldTransform.lookAt(nextPos);
                mw.Player.setControllerRotation(mw.Rotation.fromVector(direction));
            }

            let res = await this.server.net_autoFindPath();
            if (res) {
                //寻路完了
            } else {
                //没钱了
                Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.autoFindPath_Fail));
            }
            this._isFindingPath = false;
        }
    }

    public async setInvincible() {
        let res = await this.server.net_setInvincible();
        if (res) {
            Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.Invincible_End));
        } else {
            Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.addInvincible_Fail));
        }
    }

    public net_setInvincibleSuccess() {
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.addInvincible_Success));

    }


    /**
     * 通过检查点
     * @param playerId
     */
    public async updateCheckPoint(checkPointId: number) {

        //拉取当前的进度
        if (checkPointId <= this._curLv) {
            return;
        }
        this.server.net_saveLv(checkPointId);
    }

    private playGetPointEffect(lv: number) {
        //播放粒子特效
        let pos = this._effectPointCfg["" + lv];
        let scale = this._effectScaleCfg["" + lv];
        EffectService.playAtPosition(
            GameServiceConfig.SCENE_DRAGON_OBBY,
            pos,
            {
                scale: scale,
                loopCount: 1,
            });
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.Obby_GoldReward));
    }

    /**
     * 离开游戏
     * @param playerId
     */
    public exitGame() {
        // if (this._hander) {
        //     TimeUtil.clearInterval(this._hander);
        //     this._hander = null;
        // }
        // this._isStart = false;
        this._curLv = 0;
        this._isInGame = false;
        // Player.localPlayer.character.changeState(CharacterStateType.Running);
        UIService.hideUI(this._obbyPanel);
        this.resetProps(Player.localPlayer.character);
        Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityX(0);
        Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityY(0);
        let mainPanel = UIService.getUI(MainPanel);
        if (mainPanel) {
            mainPanel.setCanSprint(true);
            mainPanel.resetCanvas.visibility = SlateVisibility.Visible;
            mainPanel.obbySkillCanvas.visibility = SlateVisibility.Hidden;
            // mainPanel.playcount.visibility = SlateVisibility.Hidden;
            // mainPanel.coincount.visibility = SlateVisibility.Hidden;
            mainPanel.switchRoomCanvas.visibility = SlateVisibility.Visible;
            MapManager.instance.showMap();
        }
        this._obbyPanel.setCurLv(this._curLv, this._maxLv);

        this._redDeadIsExecuting = false;
        this._groundIsExecuting = false;
    }

    public checkLv(curLv: number) {
        if (curLv > this._curLv) {
            return true;
        }
        return false;
    }

    private maxWalkSpeedOri = 0;
    private maxAccelerationOri = 0;
    private maxStepHeightOri = 0;
    private walkableFloorAngleOri = 0;
    private rotateRateOri = 0;
    private groundFrictionOri = 0;
    private maxFallingSpeedOri = 0;
    private gravityScaleOri = 0;
    private maxJumpHeightOri = 0;
    private jumpMaxCountOri = 0;

    private setObbyProps(obj: mw.Character) {
        this.maxWalkSpeedOri = obj.maxWalkSpeed;
        this.maxAccelerationOri = obj.maxAcceleration;
        this.maxStepHeightOri = obj.maxStepHeight;
        this.walkableFloorAngleOri = obj.walkableFloorAngle;
        this.rotateRateOri = obj.rotateRate;
        this.groundFrictionOri = obj.groundFriction;
        this.maxFallingSpeedOri = obj.maxFallingSpeed;
        this.gravityScaleOri = obj.gravityScale;
        this.maxJumpHeightOri = obj.maxJumpHeight;
        this.jumpMaxCountOri = obj.jumpMaxCount;

        obj.maxWalkSpeed = GameServiceConfig.ROLE_MAX_WALK_SPEED_OBBY;
        obj.maxAcceleration = GameServiceConfig.ROLE_MAX_WALK_ACCURATE_OBBY;
        obj.maxStepHeight = GameServiceConfig.ROLE_MAX_STEP_HEIGHT_OBBY;
        obj.walkableFloorAngle = GameServiceConfig.ROLE_WALKABLE_FLOOR_ANGLE_OBBY;
        obj.rotateRate = GameServiceConfig.ROLE_ROTATE_RATE_OBBY;
        obj.groundFriction = GameServiceConfig.ROLE_GROUND_FRICTION_OBBY;
        obj.maxFallingSpeed = GameServiceConfig.ROLE_FALLING_SPEED_OBBY;
        obj.gravityScale = GameServiceConfig.ROLE_GRAVITY_SCALE_OBBY;
        obj.maxJumpHeight = GameServiceConfig.ROLE_JUMP_HEIGHT_OBBY;
        obj.jumpMaxCount = GameServiceConfig.ROLE_JUMP_MAX_COUNT_OBBY;
    }

    private resetProps(obj: mw.Character) {
        obj.maxWalkSpeed = this.maxWalkSpeedOri;
        obj.maxAcceleration = this.maxAccelerationOri;
        obj.maxStepHeight = this.maxStepHeightOri;
        obj.walkableFloorAngle = this.walkableFloorAngleOri;
        obj.rotateRate = this.rotateRateOri;
        obj.groundFriction = this.groundFrictionOri;
        obj.maxFallingSpeed = this.maxFallingSpeedOri;
        obj.gravityScale = this.gravityScaleOri;
        obj.maxJumpHeight = this.maxJumpHeightOri;
        obj.jumpMaxCount = this.jumpMaxCountOri;
    }

    public reborn() {
        // if (!this._isStart) {
        //     return;
        // }
        Player.localPlayer.character.changeState(CharacterStateType.Running);
        // if (this._curLv == 0) {
        //     Player.localPlayer.character.worldTransform.position = this._startPos;
        // } else {
        //     Player.localPlayer.character.worldTransform.position = this._checkPointCfg["" + this._curLv];
        // }
        Player.localPlayer.character.worldTransform.position = GameServiceConfig.ENTER_OBBY_GAME_POS;
        Nolan.getInstance().lookToward(Player.localPlayer.character.worldTransform.rotation.rotateVector(Vector.forward));
        this.exitGame();
    }

    private _redDeadIsExecuting = false;
    public async redDead() {
        // if (this._hander) {
        //     return;
        // }
        if (this._redDeadIsExecuting) return;
        this._redDeadIsExecuting = true;
        let isInvincible = await this.server.net_isInvincible();
        if (!isInvincible) {
            let isAutoMoving = await this.server.net_isAutoMoving();
            if (!isAutoMoving) {

                Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.Obby_RedTips));
                TimeUtil.delaySecond(GameServiceConfig.REBORN_INTERVAL_OBBY).then(() => {
                    this.endGame();
                })
                Player.localPlayer.character.changeState(CharacterStateType.Ragdoll);
            } else {
                this._redDeadIsExecuting = false;
            }
        } else {
            //复位到之前的点位
            if (this._curLv === 0) {
                mw.Player.localPlayer.character.worldTransform.position = this._startPos;
            } else {
                mw.Player.localPlayer.character.worldTransform.position = this._checkPointCfg["" + this._curLv];
            }
            this._redDeadIsExecuting = false;
        }
    }
    private _groundIsExecuting = false;
    public async groundDead() {
        // if (this._hander) {
        //     return;
        // }
        if (this._groundIsExecuting) return;
        this._groundIsExecuting = true;
        let isInvincible = await this.server.net_isInvincible();
        if (!isInvincible) {
            let isAutoMoving = await this.server.net_isAutoMoving();
            if (!isAutoMoving) {
                TimeUtil.delaySecond(GameServiceConfig.REBORN_INTERVAL_OBBY).then(() => {
                    this.endGame();
                })
                // this._hander = TimeUtil.setInterval(this.onCountDown.bind(this), );
                //锁定摄像头
                Player.localPlayer.character.changeState(CharacterStateType.Ragdoll);
            } else {
                this._groundIsExecuting = false;
            }
        } else {
            //复位到之前的点位
            if (this._curLv === 0) {
                mw.Player.localPlayer.character.worldTransform.position = this._startPos;
            } else {
                mw.Player.localPlayer.character.worldTransform.position = this._checkPointCfg["" + this._curLv];
            }
            this._groundIsExecuting = false;
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method

    public net_updateLv(curLv: number) {
        // if (!this._isStart) {
        //     this._isStart = true;
        //     if (curLv > this._curLv) {
        //         //需要传送到之前的关卡 需要读取关卡的配置位置
        //         this._curLv = curLv;
        //         this.reborn();
        //     }
        // }
        if (this._curLv < curLv) {
            this.playGetPointEffect(curLv);
        }
        this._curLv = curLv;
        this._obbyPanel.setCurLv(this._curLv, this._maxLv);
    }

    public net_showEnterTips() {
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.ObbyEnterWithoutTicket));
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    // public onPlayerReset = (playerId: number) => {
    //     if (this._isInGame && playerId == Player.localPlayer.character.player.playerId) {
    //         this.exitGame();
    //     }
    // };
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class ObbyModuleS extends JModuleS<ObbyModuleC, ObbyModuleData> {
    //#region Constant
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member
    private _maxLv = 100; //最大关卡数
    //玩家当前通过的关卡

    private _playerArrivedCheckPoint: Map<number, number> = new Map<number, number>();

    private _checkPointMap: Map<number, Vector> = new Map<number, Vector>();

    private _playerStarsCounter: Map<number, number> = new Map<number, number>();

    private _playerStartTimeMap: Map<number, number> = new Map<number, number>();
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
        this.initCheckPoint();
        //#region Inner Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onJStart(): void {
        Log4Ts.log(ObbyModuleS, "obbyModules onStart================");

        //#region Member init
        //#endregion ------------------------------------------------------------------------------------------ 

        //#region Event Subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        //TODO_LviatYi 
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
        Log4Ts.log(ObbyModuleS, "obbyModules onExecute================");
    }

    protected onPlayerLeft(player: Player): void {
        Log4Ts.log(ObbyModuleS, "obbyModules onPlayerLeft================");
        if (this._playerStarsCounter.has(player.playerId)) {
            this.getPlayerData(player).setLeaveObbyByExitGame(true);
        }
    }

    protected onPlayerEnterGame(player: Player): void {
        Log4Ts.log(ObbyModuleS, "obbyModules onPlayerEnterGame================");
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
        Log4Ts.log(ObbyModuleS, "obbyModules onPlayerJoined================");
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method

    /**
     * 更新等级并持久化
     */
    public updateLv(playerId: number, lv: number) {
        // const playerData = this.getPlayerData(playerId);
        // playerData.updateLv(lv);
        // playerData.save(false);
        this._playerArrivedCheckPoint.set(playerId, lv);
        this.getClient(playerId).net_updateLv(lv);
        Log4Ts.log(ObbyModuleS, "持久化 当前关卡数 lv========================" + lv);
    }

    private initCheckPoint() {
        let len = GameConfig.Obbycheck.getAllElement().length;
        this._maxLv = len;
        for (let i = 1; i <= len; i++) {
            let ele = GameConfig.Obbycheck.getElement(i);
            this._checkPointMap[i] = new mw.Vector(ele.checkpointloc[0], ele.checkpointloc[1], ele.checkpointloc[2]);
        }
        // reborn ============== pos=X=393994.28125 Y=13640.490234375 Z=24237.24609375
    }

    /**
     * 增加 Star.
     * @param {number} playerId
     */
    public addPlayerStarCount(playerId: number) {
        this._playerStarsCounter.set(playerId, (this._playerStarsCounter.get(playerId) ?? 0) + 1);
    }

    public getPlayerStarCount(playerId: number) {
        return this._playerStarsCounter.get(playerId) ?? 0;
    }

    /**
     * 结束游戏.
     * @param {number} playerId
     * @return {GameResult | null} 返回游戏结果.
     *      - null 时 游戏并未开始.
     */
    public endGame(playerId: number): GameResult | null {
        if (this._playerStartTimeMap.has(playerId)) {
            const data = this.getPlayerData(playerId);
            const currentCount = this._playerStarsCounter.get(playerId) ?? 0;
            this._playerStarsCounter.delete(playerId);
            //设置为正常退出
            this.getPlayerData(playerId).setLeaveObbyByExitGame(false);
            data.recordStarCount(currentCount);
            let levels = this._playerArrivedCheckPoint.get(playerId);
            //重置为0
            this._playerArrivedCheckPoint.set(playerId, 0);
            return {
                currentCount,
                duration: Date.now() - this._playerStartTimeMap.get(playerId),
                totalCount: data.totalStarCount,
                passedLevel: levels
            };
        }
        return null;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    @noReply()
    public net_saveLv(checkLv: number) {
        const currPlayerId = this.currentPlayerId;
        const playerData = this.getPlayerData(currPlayerId);
        // let lv = playerData.getLv();
        let lv = this._playerArrivedCheckPoint.get(currPlayerId);
        if (lv && checkLv <= lv) {
            return;
        }

        if (checkLv > this._maxLv) {
            checkLv = this._maxLv;
        }

        this.updateLv(currPlayerId, checkLv);
        return;
    }

    /**
     * @description: 获取是否无敌
     */
    public async net_isInvincible(): Promise<boolean> {
        return Promise.resolve(this._playerIsInvincible.get(this.currentPlayerId));
    }

    /**
     * @description: 获取是否正在自动寻路
     */
    public async net_isAutoMoving(): Promise<boolean> {
        return Promise.resolve(this._playerIsAutoMove.get(this.currentPlayerId));
    }

    /**
     * @description: 设置无敌状态
     */
    public async net_setInvincible(): Promise<boolean> {
        if (this._playerIsInvincible.get(this.currentPlayerId) === true) {
            return Promise.resolve(false);
        } else {
            //判断有没钱
            let res = ModuleService.getModule(BagModuleS).consumeObbyCoin(this.currentPlayerId, GameServiceConfig.INVINCIBLE_COST);
            if (res) {
                this._playerIsInvincible.set(this.currentPlayerId, true);
                let playerId = this.currentPlayerId;
                EffectService.playOnGameObject(GameServiceConfig.OBBY_INVINCIBLE_EFFECT_GUID, this.currentPlayer.character, {
                    slotType: HumanoidSlotType.Root,
                    duration: GameServiceConfig.OBBY_INVINCIBLE_TIME, position: GameServiceConfig.OBBY_INVINCIBLE_EFFECT_POS_OFFSET,
                    rotation: GameServiceConfig.OBBY_INVINCIBLE_EFFECT_ROTATION,
                    scale: GameServiceConfig.OBBY_INVINCIBLE_EFFECT_SCALE
                });
                this.getClient(this.currentPlayerId).net_setInvincibleSuccess();

                await mw.TimeUtil.delaySecond(GameServiceConfig.OBBY_INVINCIBLE_TIME);
                this._playerIsInvincible.set(playerId, false);
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        }
    }

    // public gmSetLV(currPlayerId: number, lv: number) {
    //     const playerData = this.getPlayerData(currPlayerId);
    //     playerData.gmSetLv(lv);
    //     playerData.save(false);
    // }
    private _playerIsInvincible: Map<number, boolean> = new Map<number, boolean>();
    private _playerIsAutoMove: Map<number, boolean> = new Map<number, boolean>();

    /**
     * @description: 跳关方法
     */
    public async net_autoFindPath(): Promise<boolean> {
        if (this._playerIsAutoMove.get(this.currentPlayerId) !== true) {
            //不在传送
            let res = ModuleService.getModule(BagModuleS).consumeObbyCoin(this.currentPlayerId, GameServiceConfig.AUTO_FIND_PATH_COST);
            if (res) {
                let character = Player.getPlayer(this.currentPlayerId).character;
                if (!character) return;

                let oriGravity = character.gravityScale;
                character.gravityScale = 0;

                let animation = character.loadAnimation("285174");
                animation.play();
                character.movementEnabled = false;
                let pos = this._checkPointMap[this._playerArrivedCheckPoint.get(this.currentPlayerId) + 1];
                character.worldTransform.lookAt(new Vector(pos.x, pos.y, character.worldTransform.position.z));
                this._playerIsAutoMove.set(this.currentPlayerId, true);
                let playerId = this.currentPlayerId;

                Event.dispatchToLocal(EventDefine.ObbyStarCollectLevel, Player.getPlayer(this.currentPlayerId), this._playerArrivedCheckPoint.get(this.currentPlayerId));

                actions.tween(character.worldTransform).to(1000, { position: pos }).call(() => {
                    animation.stop();
                    character.gravityScale = oriGravity;
                    character.movementEnabled = true;
                    this._playerIsAutoMove.set(playerId, false);

                }).start();
                await TimeUtil.delaySecond(1);
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        } else {
            return Promise.resolve(false);
        }
    }

    public async net_getStarCount(): Promise<number> {
        return this.getPlayerStarCount(this.currentPlayerId);
    }

    /**
     * 开始游戏.
     * @param {number} playerId
     */
    @noReply()
    public net_startGame(playerId: number) {
        const player = Player.getPlayer(playerId);
        if (!player) return;
        Event.dispatchToLocal(EventDefine.ObbyStarReset, player);
        Event.dispatchToClient(player, EventDefine.ObbyStarReset, player);
        this._playerStarsCounter.set(playerId, 0);
        this._playerStartTimeMap.set(playerId, Date.now());
        this._playerArrivedCheckPoint.set(player.playerId, 0);
        this._playerIsInvincible.set(player.playerId, false);
        this._playerIsAutoMove.set(player.playerId, false);

        let lv = this._playerArrivedCheckPoint.get(this.currentPlayerId);
        this.getClient(this.currentPlayerId).net_updateLv(lv);
    }

    public async net_endGame(): Promise<GameResult> {
        return this.endGame(this.currentPlayerId);
    }

    public enterObbyWithoutTicket(playerId: number) {
        this.getClient(playerId).net_showEnterTips();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

interface GameResult {
    /**
     * 游戏时长.
     */
    duration: number;
    /**
     * 获取 ObbyStar 数量.
     */
    currentCount: number;
    /**
     * 总计获取 ObbyStar 数量.
     */
    totalCount: number;
    /**
     * 通过的关卡数
     */
    passedLevel: number;

}