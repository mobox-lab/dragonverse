import Enumerable from "linq";
import UUID from "pure-uuid";
import { GameConfig } from "../../config/GameConfig";
import { EventDefine } from "../../const/EventDefine";
import { BagTypes } from "../../const/ForeignKeyIndexer";
import GameServiceConfig from "../../const/GameServiceConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Regulator from "../../depend/regulator/Regulator";
import AreaManager from "../../gameplay/area/AreaManager";
import MainPanel from "../../ui/main/MainPanel";
import GToolkit from "../../util/GToolkit";
import { IPoint3 } from "../../util/area/Shape";
import { BagModuleS } from "../bag/BagModule";
import noReply = mwext.Decorator.noReply;
import GameObject = mw.GameObject;
import GameObjPoolSourceType = mwext.GameObjPoolSourceType;
import EventListener = mw.EventListener;
import Enum = UE.Enum;
import { ObbyInteractorPanel } from "../../ui/obby/ObbyInteractorPanel";
import { DataUpgradeMethod } from "../../depend/jibu-module/JModule";
import Nolan from "../../depend/nolan/Nolan";
import i18n from "../../language/i18n";

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

    @Decorator.persistence()
    public lv: number = 0;

    //#region Sub data
    protected initDefaultData(): void {
        this.currentVersion = this.version;
        this.lv = 0;
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
    public updateLv(lv: number): boolean {
        if(lv > this.lv){
            this.lv = lv;
            return true
        }else{
            return false;
        }
    }

    public getLv() {
        return this.lv;
    }

    public gmSetLv(lv: number): boolean {
        this.lv = lv;
        return true;
    }
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
    private _curLv:number;
    private _maxLv:number;
    private _isStart:boolean;
    private _isInGame:boolean;
    private _eventListeners: EventListener[] = [];
    private _checkPointCfg = {}
    public  _startPos: mw.Vector;
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
        Log4Ts.log(ObbyModuleC,"obbyModuleC onStart================")
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EnterCollectibleItemRange, this.onEnterCollectibleItemRange));
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
        Log4Ts.log(ObbyModuleC,"obbyModuleC onEnterScene================")
    }

    protected onDestroy(): void {
        Log4Ts.log(ObbyModuleC,"obbyModuleC onDestroy================")
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

        private initCheckPoint(){
            
            this._maxLv = GameConfig.Obbycheck.getAllElement().length;
            for(let i=1;i<=this._maxLv;i++){
                let ele = GameConfig.Obbycheck.getElement(i);
                this._checkPointCfg[""+i] = new mw.Vector(ele.checkpointloc[0],ele.checkpointloc[1],ele.checkpointloc[2]);
            }
            console.log("initCheckPoint _maxLv======"+this._maxLv);
        }
        /**
         * 是否在游戏中
         */
        public isInGame():boolean {
            return this._isInGame;
        }

        /**
         * 进入游戏
         */
        public enterGame() {
            //拉取当前的进度
            this._isStart = false;
            this._isInGame = true;
            this._curLv = 0;
            this._startPos = Player.localPlayer.character.worldTransform.position;
            this.server.net_getLv();
            UIService.showUI(this._obbyPanel);
            this.setObbyProps(Player.localPlayer.character);
            UIService.getUI(MainPanel).setCanSprint(false);
        }

        
        /**
         * 通过检查点
         * @param playerId
         */
        public updateCheckPoint(checkPointId:number) {
            
            //拉取当前的进度
            if(checkPointId <= this._curLv){
                return;
            }
            
            Event.dispatchToLocal(EventDefine.ShowGlobalPrompt, i18n.resolves.Obby_GoldReward());
            //播放粒子特效
            // mw.EffectService.playAtPosition("89095", this.gameObject.worldTransform.position);
            this.server.net_saveLv(checkPointId);
        }

        
        /**
         * 离开游戏
         * @param playerId
         */
        public exitGame() {
            this._isStart = false;
            this._curLv = 0;
            this._isInGame = false;
            UIService.hideUI(this._obbyPanel);
            this.resetProps(Player.localPlayer.character);
            UIService.getUI(MainPanel).setCanSprint(true);
        }

        public checkLv(curLv: number) {
            if(this._isStart&&curLv > this._curLv){
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
            console.log("reborn lv=============="+this._curLv)
            Player.localPlayer.character.ragdollEnabled = false;
            if(this._curLv == 0){
                Player.localPlayer.character.worldTransform.position = this._startPos;
            }else{
                Player.localPlayer.character.worldTransform.position = this._checkPointCfg[""+this._curLv];
            }
            Nolan.getInstance().lookToward(Player.localPlayer.character.worldTransform.rotation.rotateVector(Vector.forward));
        }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method

    public net_updateLv(curLv: number) {
        console.log("net_updateLv curLv======"+curLv);
        if(!this._isStart){
            this._isStart = true;
            if(curLv > this._curLv){
                //需要传送到之前的关卡 需要读取关卡的配置位置
                console.log("net_updateLv 传送======");
                this._curLv = curLv;
                this.reborn();
            }
        }
        this._curLv = curLv;
        this._obbyPanel.setCurLv(this._curLv,this._maxLv);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    // public onGMSetLv = (lv: number) => {
    //     console.log("onGMSetLv lv============="+lv);
    //     this.gmSetLV(lv);
    // };
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class ObbyModuleS extends ModuleS<ObbyModuleC, ObbyModuleData> {
    //#region Constant
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    //#region Member
        private _maxLv = 100; //最大关卡数
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();

        //#region Inner Member init
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onStart(): void {
        super.onStart();
        Log4Ts.log(ObbyModuleS,"obbyModules onStart================")

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
        Log4Ts.log(ObbyModuleS,"obbyModules onExecute================")
    }

    protected onPlayerLeft(player: Player): void {
        Log4Ts.log(ObbyModuleS,"obbyModules onPlayerLeft================")
    }

    protected onPlayerEnterGame(player: Player): void {
        Log4Ts.log(ObbyModuleS,"obbyModules onPlayerEnterGame================")
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
        Log4Ts.log(ObbyModuleS,"obbyModules onPlayerJoined================")
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄


    //#region Method
    
    /**
     * 更新等级并持久化
     */
    public updateLv(playerId: number, lv: number) {
        const playerData = this.getPlayerData(playerId);
        playerData.updateLv(lv);
        playerData.save(false);
        this.getClient(playerId).net_updateLv(lv);
        // Log4Ts.log(ObbyModuleS,"持久化 当前关卡数 lv========================"+lv);
        console.log("持久化 当前关卡数 lv========================"+lv);
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

     //#region Net Method
     @noReply()
     public net_saveLv(checkLv: number) {
        const currPlayerId = this.currentPlayerId;
        const playerData = this.getPlayerData(currPlayerId);
        let lv = playerData.getLv();
        if(checkLv<=lv){
            return;
        }

        if(checkLv > this._maxLv){
            checkLv = this._maxLv;
        }
    
        this.updateLv(currPlayerId,checkLv)
        return;
    }

    @noReply()
    public net_getLv() {
        const currPlayerId = this.currentPlayerId;
        const playerData = this.getPlayerData(currPlayerId);
        let lv = playerData.getLv();
        this.getClient(currPlayerId).net_updateLv(lv);
        return;
    }

    public gmSetLV(currPlayerId: number, lv: number) {
        const playerData = this.getPlayerData(currPlayerId);
        playerData.gmSetLv(lv);
        playerData.save(false);
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}