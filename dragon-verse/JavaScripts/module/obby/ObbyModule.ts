import Enumerable from "linq";
import UUID from "pure-uuid";
import {GameConfig} from "../../config/GameConfig";
import {EventDefine} from "../../const/EventDefine";
import {BagTypes} from "../../const/ForeignKeyIndexer";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Regulator from "../../depend/regulator/Regulator";
import AreaManager from "../../gameplay/area/AreaManager";
import MainPanel from "../../ui/main/MainPanel";
import GToolkit from "../../util/GToolkit";
import {IPoint3} from "../../util/area/Shape";
import {BagModuleS} from "../bag/BagModule";
import noReply = mwext.Decorator.noReply;
import GameObject = mw.GameObject;
import GameObjPoolSourceType = mwext.GameObjPoolSourceType;
import EventListener = mw.EventListener;
import Enum = UE.Enum;
import {ObbyInteractorPanel} from "../../ui/obby/ObbyInteractorPanel";
import {DataUpgradeMethod} from "../../depend/jibu-module/JModule";
import Nolan from "../../depend/nolan/Nolan";
import i18n from "../../language/i18n";
import UnifiedRoleController from "../role/UnifiedRoleController";
import {GameEndPanel} from "../../ui/obby/GameEndPanel";
import {MapManager} from "../../gameplay/map/MapManager";
import {KeyboardManager} from "../../controller/KeyboardManager";
import GTkTypes from "../../util/GToolkit";


export default class ObbyModuleData extends Subdata {
    /**
     * 已经发布的正式数据版本号.
     * 以版本发布时间 升序排列.
     * RV.
     */
    public static readonly RELEASE_VERSIONS: number[] = [
        202401291339,
    ];

    /**
     * 版本升级办法.
     * UVM[n] : 从 RV[n] 升级到 RV[n+1] 的方法.
     */
    public static readonly UPDATE_VERSION_METHOD: DataUpgradeMethod<ObbyModuleData>[] = [
        // (data) => {
        // },
    ];

    // @Decorator.persistence()
    // public lv: number = 0;

    //#region Sub data
    protected initDefaultData(): void {
        this.currentVersion = this.version;
        // this.lv = 0;
    }

    protected onDataInit(): void {
        super.onDataInit();
        this.checkVersion();
    }

    public save(syncToClient: boolean): this {
        return super.save(syncToClient);
    }

    /**
     * 定义为最新版本号.
     * 为什么不做成只读属性而是个 getter 呢.
     */
    public get version(): number {
        return ObbyModuleData.RELEASE_VERSIONS[ObbyModuleData.RELEASE_VERSIONS.length - 1];
    }


    /**
     * 数据版本检查.
     */
    public checkVersion() {
        if (this.currentVersion === this.version) return;

        Log4Ts.log(ObbyModuleData,
            `数据准备升级`,
            () => `当前版本: ${this.currentVersion}`,
            () => `最新版本: ${this.version}.`,
        );

        const startIndex = ObbyModuleData.RELEASE_VERSIONS.indexOf(this.currentVersion);
        if (startIndex < 0) {
            Log4Ts.error(
                ObbyModuleData,
                `数据号版本异常`,
                `不是已发布的版本号`,
                () => `当前版本: ${this.currentVersion}.`);
            return;
        }

        for (let i = startIndex; i < ObbyModuleData.UPDATE_VERSION_METHOD.length - 1; ++i) {
            ObbyModuleData.UPDATE_VERSION_METHOD[i](this);
            this.currentVersion = ObbyModuleData.RELEASE_VERSIONS[i + 1];
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    // public updateLv(lv: number): boolean {
    //     if (lv > this.lv) {
    //         this.lv = lv;
    //         return true
    //     } else {
    //         return false;
    //     }
    // }
    //
    // public getLv() {
    //     return this.lv;
    // }
    //
    // public gmSetLv(lv: number): boolean {
    //     this.lv = lv;
    //     return true;
    // }
}

/**
 * ObbyModuleData.
 * 跑酷模块.
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class ObbyModuleC extends ModuleC<ObbyModuleS, ObbyModuleData> {
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
    private _checkPointCfg = {}
    private _effectPointCfg = {}
    private _effectScaleCfg = {}
    private _hander: number;
    public _startPos: mw.Vector;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        this._obbyPanel = UIService.create(ObbyInteractorPanel);
        this.initCheckPoint();
        Log4Ts.log(ObbyModuleC, "obbyModuleC onStart================")
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
        Log4Ts.log(ObbyModuleC, "obbyModuleC onEnterScene================")
    }

    protected onDestroy(): void {
        Log4Ts.log(ObbyModuleC, "obbyModuleC onDestroy================")
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

        let len = GameConfig.Obbycheck.getAllElement().length
        this._maxLv = len
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
        this.server.net_getLv();
        UIService.showUI(this._obbyPanel);
        Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityX(0);
        Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityY(0);

        this.setObbyProps(Player.localPlayer.character);

        let mainPanel = UIService.getUI(MainPanel);
        if (mainPanel) {
            mainPanel.setCanSprint(false);
            mainPanel.resetCanvas.visibility = SlateVisibility.Hidden;
            mainPanel.obbySkillCanvas.visibility = SlateVisibility.Visible;
            mainPanel.playcount.visibility = SlateVisibility.Visible;
            mainPanel.coincount.visibility = SlateVisibility.Visible;
            mainPanel.switchRoomCanvas.visibility = SlateVisibility.Hidden;
            MapManager.instance.hideMap();
        }
        this.server.net_revertGame();
    }

    private async onCountDown() {
        // if (!this._isStart) {
        //     return;
        // }
        if (this._hander) {
            // let obby = ModuleService.getModule(ObbyModuleC);
            // obby.reborn();
            UIService.show(GameEndPanel);
            await TimeUtil.delaySecond(0);
            TimeUtil.clearInterval(this._hander);
            this._hander = null;
        }
    };

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
                //没钱了，或者是无敌状态
            }
            this._isFindingPath = false;
        }
    }

    public async setInvincible() {
        let res = await this.server.net_setInvincible()
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
            })
        Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.Obby_GoldReward));
    }

    /**
     * 离开游戏
     * @param playerId
     */
    public exitGame() {
        if (this._hander) {
            TimeUtil.clearInterval(this._hander);
            this._hander = null;
        }
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
            mainPanel.playcount.visibility = SlateVisibility.Hidden;
            mainPanel.coincount.visibility = SlateVisibility.Hidden;
            mainPanel.switchRoomCanvas.visibility = SlateVisibility.Visible;
            MapManager.instance.showMap();
        }
        this._obbyPanel.setCurLv(this._curLv, this._maxLv);
        this.server.net_revertGame();
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
        obj.maxWalkSpeed = this.maxWalkSpeedOri
        obj.maxAcceleration = this.maxAccelerationOri
        obj.maxStepHeight = this.maxStepHeightOri
        obj.walkableFloorAngle = this.walkableFloorAngleOri
        obj.rotateRate = this.rotateRateOri
        obj.groundFriction = this.groundFrictionOri
        obj.maxFallingSpeed = this.maxFallingSpeedOri
        obj.gravityScale = this.gravityScaleOri
        obj.maxJumpHeight = this.maxJumpHeightOri
        obj.jumpMaxCount = this.jumpMaxCountOri
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

    public async redDead() {
        if (this._hander) {
            return;
        }
        let isInvincible = await this.server.net_isInvincible();
        if (!isInvincible) {
            let isAutoMoving = await this.server.net_isAutoMoving();
            if (!isAutoMoving) {
                Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.lan(i18n.lanKeys.Obby_RedTips));
                this._hander = TimeUtil.setInterval(this.onCountDown.bind(this), GameServiceConfig.REBORN_INTERVAL_OBBY)
                Player.localPlayer.character.changeState(CharacterStateType.Ragdoll);
            }
        } else {
            //复位到之前的点位
            if (this._curLv === 0) {
                mw.Player.localPlayer.character.worldTransform.position = this._startPos;
            } else {
                mw.Player.localPlayer.character.worldTransform.position = this._checkPointCfg["" + this._curLv];
            }

        }
    }

    public async groundDead() {
        if (this._hander) {
            return;
        }
        let isInvincible = await this.server.net_isInvincible();
        if (!isInvincible) {
            let isAutoMoving = await this.server.net_isAutoMoving();
            if (!isAutoMoving) {
                this._hander = TimeUtil.setInterval(this.onCountDown.bind(this), GameServiceConfig.REBORN_INTERVAL_OBBY)
                //锁定摄像头
                Player.localPlayer.character.changeState(CharacterStateType.Ragdoll);
            }
        } else {
            //复位到之前的点位
            if (this._curLv === 0) {
                mw.Player.localPlayer.character.worldTransform.position = this._startPos;
            } else {
                mw.Player.localPlayer.character.worldTransform.position = this._checkPointCfg["" + this._curLv];
            }

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

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    // public onPlayerReset = (playerId: number) => {
    //     if (this._isInGame && playerId == Player.localPlayer.character.player.playerId) {
    //         this.exitGame();
    //     }
    // };
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class ObbyModuleS extends ModuleS<ObbyModuleC, ObbyModuleData> {
    //#region Constant
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    //#region Member
    private _maxLv = 100; //最大关卡数
    //玩家当前通过的关卡
    private _playerArrivedCheckPoint: Map<number, number> = new Map<number, number>();
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
        this.initCheckPoint();
        //#region Inner Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onStart(): void {
        super.onStart();
        Log4Ts.log(ObbyModuleS, "obbyModules onStart================")

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
        Log4Ts.log(ObbyModuleS, "obbyModules onExecute================")
    }

    protected onPlayerLeft(player: Player): void {
        Log4Ts.log(ObbyModuleS, "obbyModules onPlayerLeft================")
    }

    protected onPlayerEnterGame(player: Player): void {
        Log4Ts.log(ObbyModuleS, "obbyModules onPlayerEnterGame================")
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
        this._playerArrivedCheckPoint.set(player.playerId, 0);
        this._playerIsInvincible.set(player.playerId, false);
        this._playerIsAutoMove.set(player.playerId, false);
        Log4Ts.log(ObbyModuleS, "obbyModules onPlayerJoined================")
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

        this.updateLv(currPlayerId, checkLv)
        return;
    }

    @noReply()
    public net_revertGame() {
        this._playerArrivedCheckPoint.set(this.currentPlayerId, 0);
        // this.currentData.lv = 0;
        // this.currentData.save(false);
    }

    @noReply()
    public net_getLv() {
        // const currPlayerId = this.currentPlayerId;
        // const playerData = this.getPlayerData(currPlayerId);
        // let lv = playerData.getLv();
        let lv = this._playerArrivedCheckPoint.get(this.currentPlayerId);
        this.getClient(this.currentPlayerId).net_updateLv(lv);
    }

    public async net_isInvincible(): Promise<boolean> {
        return Promise.resolve(this._playerIsInvincible.get(this.currentPlayerId));
    }

    public async net_isAutoMoving(): Promise<boolean> {
        return Promise.resolve(this._playerIsAutoMove.get(this.currentPlayerId));
    }

    public async net_setInvincible(): Promise<boolean> {
        if (this._playerIsInvincible.get(this.currentPlayerId) === true) {
            return Promise.resolve(false);
        } else {
            //判断有没钱
            this._playerIsInvincible.set(this.currentPlayerId, true);
            let playerId = this.currentPlayerId;
            this.getClient(this.currentPlayerId).net_setInvincibleSuccess();

            await mw.TimeUtil.delaySecond(10);
            this._playerIsInvincible.set(playerId, false);
            return Promise.resolve(true);
        }
    }

    // public gmSetLV(currPlayerId: number, lv: number) {
    //     const playerData = this.getPlayerData(currPlayerId);
    //     playerData.gmSetLv(lv);
    //     playerData.save(false);
    // }
    private _playerIsInvincible: Map<number, boolean> = new Map<number, boolean>();
    private _playerIsAutoMove: Map<number, boolean> = new Map<number, boolean>();

    public async net_autoFindPath(): Promise<boolean> {
        if (this._playerIsAutoMove.get(this.currentPlayerId) !== true) {
            //不是无敌状态再扣钱
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

            actions.tween(character.worldTransform).to(1000, {position: pos}).call(() => {
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
    }

    private _checkPointMap: Map<number, Vector> = new Map<number, Vector>();

    private initCheckPoint() {
        let len = GameConfig.Obbycheck.getAllElement().length;
        this._maxLv = len
        for (let i = 1; i <= len; i++) {
            let ele = GameConfig.Obbycheck.getElement(i);
            this._checkPointMap[i] = new mw.Vector(ele.checkpointloc[0], ele.checkpointloc[1], ele.checkpointloc[2]);
        }
        // reborn ============== pos=X=393994.28125 Y=13640.490234375 Z=24237.24609375 
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}