import { PlayerManagerExtension, } from '../../Modified027Editor/ModifiedPlayer';
/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-10 15:26:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-26 14:52:24
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\ghost\GhostInst.ts
 * @Description  : 
 */

import { GlobalDefine } from '../../../DefNoSubModule';
import { GameConfig } from "../../../config/GameConfig";
import { IGhostElement } from "../../../config/Ghost";
import { IGhostGraphicElement } from '../../../config/GhostGraphic';
import { IGhostInstanceElement } from '../../../config/GhostInstance';
import { P_Blood } from '../../ui/P_Blood';
import { GhostBaseStateMachine } from '../../utils/GhostStateMachine';
import { BoardHelper, BoardKeys } from '../blackboard/BoardDefine';
import HelpModuleC from '../help/HelpModuleC';
import { PlayerModuleS } from '../player/PlayerModuleS';
import { GhostAniState, GhostLogicState, GhostMoveState, GhostSettings } from "./GhostDefine";
import { GhostModuleC } from './GhostModuleC';
import { GhostModuleS } from './GhostModuleS';
import { GhostStateCasual, GhostStateChase, GhostStateKill } from "./GhostState";
import { GhostBananeEvt } from './com/ClientGhostCheckCom';
import { GhostComDefine } from './com/GhostComDefine';
import { GhostPetAni } from './com/GhostPetAnimator';
import { BaseGhostCheckCom } from './com/base/IGhostCom';

export class TargetData {
    public char: Character;
    public player: Player;
    public degree: number;
    public cfg: IGhostElement;

    public setData(player: Player, degree: number, ghostId: number) {
        this.degree = degree;
        this.player = player;
        this.char = player.character;
        this.cfg = GameConfig.Ghost.getAllElement().find(e => {
            // console.log(e.ghostId);
            // console.log(e.diffcult);
            // console.log(e.ghostId == ghostId && e.diffcult.includes(degree));
            return e.ghostId == ghostId && e.diffcult.includes(degree);
        })
        if (!this.cfg) {
            console.error("没有找到相应的配置呀degree:" + degree + "ghostid:" + ghostId)
            this.cfg = GameConfig.Ghost.getAllElement().find(e => {
                return e.ghostId == ghostId;
            })
        }
    }
}

@Component
export default class GhostInst extends mw.Script {
    public static isInvincible: boolean = false;
    public static ghostIgnoreTag = "ghostIgnore";
    /** id */
    @mw.Property({ replicated: true })
    id: string = "";

    /** 配置id */
    @mw.Property({ replicated: true, onChanged: "onCfgIdChanged" })
    cfgId: number = 0;

    /** 移动状态 */
    @mw.Property({ replicated: true })
    moveState: GhostMoveState = GhostMoveState.Hang;

    /** 逻辑状态 */
    @mw.Property({ replicated: true })
    logicState: GhostLogicState = GhostLogicState.Casual;

    @Property({ replicated: true })
    moveAniGroup: GhostAniState = GhostAniState.Normal;

    /** 视野范围 */
    @mw.Property({ replicated: true })
    sightDist: number = 0;

    /** 追击目标id */
    @mw.Property({ replicated: true, onChanged: "client_onTargetChanged" })
    targetId: number = 0;

    /** 追击队列 */
    //@Property({ replicated: true })
    chaseArray: number[] = [];

    /** 看得见鬼的列表 */
    canSeeArray: number[] = [];

    public targetData: TargetData = new TargetData();


    /** 鬼的角色
     * @description 双端
     */
    ghostChar: mw.Character;

    _trigger: mw.Trigger;


    /** 鬼的配置
     * @description 双端
     */
    _cfg: IGhostElement;

    /**
     * 鬼的实例配置
     */
    _insCfg: IGhostInstanceElement;


    /**
     * 鬼的外观配置
     */
    graphicCfg: IGhostGraphicElement;

    /** 鬼初始化完成
     * @description 服务端
     */
    _serverInited: boolean = false;

    /** 逻辑状态机
     * @description 服务端
     */
    logicSM: GhostBaseStateMachine<GhostLogicState> = new GhostBaseStateMachine<GhostLogicState>();

    /** 脚步声
     * @description 服务端
     */
    walkSound: number;

    /** 鬼的逻辑行为计时器
     * @description 服务端
     */
    logicStateTimer: number = 0;

    /** 鬼的保护期计时器 */
    //protectTimer: number = 0;

    visibleTimer: number = 0;

    /**
     * 客户端初始化完成
     * @description 客户端
     */
    _clientInited: boolean = false;


    /** 客户端玩家
     * @description 客户端
     */
    _clientPlayer: mw.Player;

    /** 客户端角色
     * @description 客户端
     */
    _clientChar: mw.Character;

    /** 客户端检查计时器
     * @description 客户端
     */
    _clientCheckTimer: number = 0;

    /** 客户端目标玩家
     * @description 客户端
     */
    _clientTargetPlayer: mw.Player;

    /** 客户端目标角色
     * @description 客户端
     */
    _clientTargetCharacter: mw.Character;

    private _petAniCtl: GhostPetAni;

    private _sageTimer: number = 0;

    private _clientCheckComs: BaseGhostCheckCom[] = [];

    public enableKill: boolean = true;

    public comEnable: boolean = true;

    public bindDir: Rotation;

    /**
     * 是否还在贤者时间中
     */
    public get isInSage(): boolean {
        return this._sageTimer > 0;
    }

    protected onStart(): void {
        this.ghostChar = this.gameObject as mw.Character;
        this.ghostChar.collisionWithOtherCharacterEnabled = false;
        if (SystemUtil.isServer()) {
            this.server_onStart();
        }
        if (SystemUtil.isClient()) {
            this.onCfgIdChanged();
        }
    }

    server_onStart() {
        let id = setInterval(() => {
            if (this._trigger != null) {
                clearInterval(id);
                this.initTrigger();
            }
        }, 10)
    }

    initTrigger() {
        this._trigger.onEnter.add((go) => {

            if (!this.enableKill) {
                return;
            }
            if (PlayerManagerExtension.isCharacter(go)) {
                let ghostPos = this.ghostChar.worldTransform.position.clone().add(Vector.up.multiply(50));
                let res = QueryUtil.lineTrace(ghostPos, go.worldTransform.position, true, GhostSettings.openDebug, [this._trigger.gameObjectId], false, false, this.ghostChar);
                res = res.filter(e => { return !(e.gameObject instanceof mw.Trigger) })
                if (res.length > 0 && PlayerManagerExtension.isCharacter(res[0].gameObject)) {
                    let canKill = ModuleService.getModule(GhostModuleS).checkCanKill(go.player.playerId);
                    if (canKill) {
                        this.ser_catchPlayer(go.player);
                    }
                }
            }
        })
    }

    /**
     * 完成击杀
     * @param player 被击杀的player
     */
    @RemoteFunction(Client)
    cli_killChar(player: Player, dir: Vector) {
        if (!this.graphicCfg) {
            return;
        }
        let ani = null;
        if (this.graphicCfg.deathAni) {
            ani = PlayerManagerExtension.loadAnimationExtesion(player.character, this.graphicCfg.deathAni, true);
        }
        ModuleService.getModule(GhostModuleC).killPlayer(this.graphicCfg.attackDelayUI, this.graphicCfg.stopTime, ani, this.ghostChar, this.graphicCfg, dir, this._insCfg, 1);
    }

    private _isInited: boolean = false;

    /**
     * 客户端初始化
     */
    async onCfgIdChanged() {
        if (!this.gameObject || this.cfgId == 0) {
            return;
        }
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._clientPlayer = await Player.asyncGetLocalPlayer();
        console.log("鬼客户端初始化完成", this.cfgId)
        this._clientChar = this._clientPlayer.character;
        this.ghostChar.displayName = "";
        this.ghostChar = this.gameObject as mw.Character;
        this._insCfg = GameConfig.GhostInstance.getElement(this.cfgId);
        this._cfg = GameConfig.Ghost.getAllElement().find(e => {
            return e.ghostId == this._insCfg.ghostId;
        });
        this._clientInited = true;
        this.useUpdate = true;
        await this.ghostChar.asyncReady();
        await ModuleService.ready();
        let indexOffset = 0;
        this.ghostChar["photoTag"] = this._insCfg.photoTag;
        if (this._cfg.checkCom) {
            for (let index = 0; index < this._cfg.checkCom.length; index++) {
                let elm = this._cfg.checkCom[index];
                let com = GhostComDefine.clientGhostCheckComMap.get(elm);// new ClientCheckCom(this);
                let newCom = new com(this);
                newCom.onEnter(index - indexOffset);
                if (elm != 1) {
                    indexOffset++;
                }
                this._clientCheckComs.push(newCom);
            }
        }

        let stype = BoardHelper.GetTargetKeyValue(BoardKeys.Style);
        if (stype != undefined) {
            this.onStypeChanged(Number(stype));
        }

        let degree = BoardHelper.GetTargetKeyValue(BoardKeys.Degree);
        if (degree != undefined) {
            this.onDegreeChanged(Number(degree));
        }

        Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, val: string) => {
            if (key == BoardKeys.Style) {
                this.onStypeChanged(Number(val));
            }
            else if (key == BoardKeys.Degree) {
                this.onDegreeChanged(Number(val));
            }
        })
        setInterval(() => {
            this.ghostChar.setVisibility(this.ghostChar.getVisibility());
        }, 60000)
    }

    /**
     * 难度变更
     * @param degree 
     */
    private onDegreeChanged(degree: number) {
        this._cfg = GameConfig.Ghost.getAllElement().find(e => {
            return e.ghostId == this._insCfg.ghostId && e.diffcult.includes(degree);
        });
        if (!this._cfg) {
            console.error("找不到鬼的难度配置" + degree + "ghostId" + this._insCfg.ghostId);
        }
        let isShowGhost = degree < GlobalDefine.minDegree
        if (degree < GlobalDefine.minDegree) {
            this.ghostChar.clearDescription();
            this.comEnable = false;
        }
        else {
            this.comEnable = true;
        }
        console.log("鬼难度设置结果:" + isShowGhost)
    }

    /**
     * 画质变更
     * @param style 
     * @returns 
     */
    private onStypeChanged(style: number) {
        this.graphicCfg = GameConfig.GhostGraphic.getAllElement().find(e => {
            return e.graphicLevel == style && e.appearanceId == this._insCfg.appearanceId;
        });
        if (!this.graphicCfg) {
            console.error("[GhostChar]没有配置的鬼的画质等级" + `style${style} :appearanceId${this._insCfg.appearanceId}`);
            this.ghostChar.setDescription(["0A44E7084716F2C8873756A9262E6D34"]);
            return;
        }
        if (!this._petAniCtl) {
            this._petAniCtl = new GhostPetAni(this.gameObject as Character);
        }
        this.ghostChar.clearDescription();
        if (this.graphicCfg.apprance.startsWith("_")) {
            this.ghostChar.description.base.wholeBody = this.graphicCfg.apprance.slice(1);
            this._petAniCtl.setAnimation(this.graphicCfg);
        }
        else {
            this.ghostChar.setDescription([this.graphicCfg.apprance])
            this._petAniCtl.setAnimation(this.graphicCfg);
        }
        this.ghostChar.worldTransform.scale = Vector.one.multiply(this.graphicCfg.scale);
        this.ghostChar.collisionExtent = new Vector(15, 15, 50).divide(this.graphicCfg.scale);

        console.log("画质换装" + this.graphicCfg.apprance)

        this.ghostChar.setVisibility(this.ghostChar.getVisibility());
        this.ghostChar.asyncReady().then(() => {
            this._petAniCtl.stopAni();
        })
    }

    /**
     * 初始化鬼
     * @param cfgId 实例id
     */
    async server_initGhost(cfgId: number) {
        this.ghostChar = this.gameObject as mw.Character;
        this.ghostChar.maxStepHeight = 60;
        console.log("server_onStart", this.ghostChar.worldTransform.position);
        this.cfgId = cfgId;
        this._insCfg = GameConfig.GhostInstance.getElement(this.cfgId);
        this._cfg = GameConfig.Ghost.getAllElement().find(e => {
            return e.ghostId == this._insCfg.ghostId;
        });
        this.gameObject.worldTransform.position = this._insCfg.patrols[0];
        console.log("鬼初始化完成", this._insCfg.patrols[0]);
        this.sightDist = this._cfg.sightRange[0];
        //this.protectTimer = this._cfg.protectTime;
        this._trigger.shape = TriggerShapeType.Sphere;
        this._trigger.worldTransform.scale = Vector.one.multiply(this._cfg.attackMode);
        this.initSM()
        this._serverInited = true;
        this.useUpdate = true;
        this.ghostChar.capsuleCorrectionEnabled = false;
        this.ghostChar.collisionExtent = new Vector(15, 15, 50);
        let dCfg = GameConfig.GhostGraphic.getAllElement().find(e => {
            return e.appearanceId == this._insCfg.appearanceId;
        })
        this.ghostChar.setDescription([dCfg.apprance]);
    }

    initSM() {
        // 注册移动状态
        let followComCon = GhostComDefine.serverGhostFollowComMap.get(this._cfg.chaseCom);
        if (!followComCon) {
            console.error("没有找到鬼的移动组件")
            return;
        }
        let followCom = new followComCon(this);
        let hangComCon = GhostComDefine.serverGhostHangComMap.get(this._cfg.hangCom);
        if (!hangComCon) {
            console.error("没有找到鬼的巡逻组件" + this._cfg.hangCom);
            return;
        }
        let hangCom = new hangComCon(this);

        // 注册逻辑状态
        this.logicSM.register(GhostLogicState.Casual, new GhostStateCasual(this, hangCom));
        this.logicSM.register(GhostLogicState.Chase, new GhostStateChase(this, followCom));
        this.logicSM.register(GhostLogicState.Killing, new GhostStateKill(this));
    }



    setCasualConfigs() {
        this.ghostChar.maxWalkSpeed = this._cfg.casualSpeed;
        if (GhostSettings.chaseSound.soundGuid == "") {
            return;
        }
        if (this.walkSound) {
            SoundService.stop3DSound(this.walkSound);
        }
        this.walkSound = SoundService.play3DSound(GhostSettings.casualSound.soundGuid, this.ghostChar, 0, GhostSettings.casualSound.volume,
            { radius: GhostSettings.casualSound.innerRadius, falloffDistance: GhostSettings.casualSound.innerRadius }
        );
    }

    setChaseConfigs() {
        this.ghostChar.maxWalkSpeed = this.targetData.cfg.chaseSpeed;
        if (GhostSettings.chaseSound.soundGuid == "") {
            return;
        }
        if (this.walkSound) {
            SoundService.stop3DSound(this.walkSound);
        }
        this.walkSound = SoundService.play3DSound(GhostSettings.chaseSound.soundGuid, this.ghostChar, 0, GhostSettings.chaseSound.volume,
            { radius: GhostSettings.chaseSound.innerRadius, falloffDistance: GhostSettings.chaseSound.innerRadius }
        );
    }

    /**
     * 服务端开始追
     */
    @RemoteFunction(mw.Server)
    server_startChase(playerId: number, degree: number) {
        console.log("鬼开始追", playerId);
        if (this.logicState == GhostLogicState.Casual) {
            this.targetId = playerId;
            this.targetData.setData(Player.getPlayer(playerId), degree, this._cfg.ghostId);
            this.logicSM.switch(GhostLogicState.Chase);
        }
    }

    /**
     * 脱离追击
     */
    @RemoteFunction(mw.Server)
    server_exitChase() {
        if (this.logicState != GhostLogicState.Chase) {
            return;
        }
        console.log("鬼脱离追击");
        this.targetId = 0;
        this.logicSM.switch(GhostLogicState.Casual);
    }

    protected onUpdate(dt: number): void {
        if (SystemUtil.isServer()) {
            this.server_onUpdate(dt);
        }
        if (SystemUtil.isClient()) {
            this.client_onUpdate(dt);
        }
    }

    server_onUpdate(dt: number) {
        if (!this._serverInited) {
            return;
        }
        if (this._cfg.shining) {
            this.visibleTimer -= dt;
            if (this.visibleTimer <= 0) {
                this.ghostChar.setVisibility(!this.ghostChar.getVisibility() ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
                this.visibleTimer = this.ghostChar.getVisibility() ? 1 : 2;
            }
        }
        this.logicSM.update(dt);
        if (this.logicStateTimer != 9999) {
            this.logicStateTimer -= dt;
            if (this.logicStateTimer <= 0) {
                console.log("鬼逻辑状态计时器结束", this.logicState);
                this.server_checkLogicState();
                console.log("鬼逻辑状态计时器结束状态转换为", this.logicState);
            }
        }
    }

    server_checkLogicState() {
        switch (this.logicState) {
            case GhostLogicState.Casual:
                this.logicSM.switch(GhostLogicState.Casual);
                break;
            case GhostLogicState.Chase:
                this.server_exitChase();
                break;
            case GhostLogicState.Killing:
                console.log("鬼结束击杀动画表演");
                this.targetId = 0;
                this.logicSM.switch(GhostLogicState.Casual);
                break;
            default: break;
        }
    }

    private _preMoveState;

    client_onUpdate(dt: number) {
        if (!this.comEnable) {
            return;
        }
        this._petAniCtl?.onUpdate(this.moveState, this.moveAniGroup, dt);
        if (this.moveState != this._preMoveState) {
            this._preMoveState = this.moveState;
            if (this.moveState == GhostMoveState.Hang) {
                this.ghostChar.tag = "GhostHang"
            }
            else {
                this.ghostChar.tag = "GhostFollow"
            }
        }
        /** update signCheck & chase condition */
        this._clientCheckTimer += dt;
        if (this._clientCheckTimer >= 0.2) {
            this._clientCheckTimer = 0;
            this.client_checkGhostSight(0.2);
            this.client_checkTargetDist();
        }
        /** update sage */
        if (this._sageTimer > 0) {
            this._sageTimer -= dt;
            if (this._sageTimer <= 0) {
                console.log("结束了贤者时间")
            }
        }
    }

    client_onTargetChanged(path: string[], value: number, oldVal: number) {
        if (!Player.localPlayer) {
            return;
        }
        if (this.targetId == 0 && oldVal == Player.localPlayer.playerId) {
            this._sageTimer = this._cfg.chaseCD;
            console.log("end chase 2 this client")
        }
        //单个鬼
        //这个鬼在追自己
        if (value == Player.localPlayer.playerId) {
            // UIService.getUI(P_Blood).updateChaseByGhost(1);
            UIService.getUI(P_Blood).addGhostGuid(this.id);
            UIService.getUI(P_Blood).showBlood();
        }
        //这个鬼没有在追自己
        else {
            // UIService.getUI(P_Blood).updateChaseByGhost(-1);
            UIService.getUI(P_Blood).removeGhostGuid(this.id);
        }
        if (!Player.getPlayer(this.targetId)) {
            this._clientTargetPlayer = null;
            this._clientTargetCharacter = null;
        }
        else {
            this._clientTargetPlayer = Player.getPlayer(this.targetId);
            this._clientTargetCharacter = this._clientTargetPlayer.character;
        }
    }

    /**
     * 检查视野中的玩家
     */
    client_checkGhostSight(dt: number) {
        if (ModuleService.getModule(GhostModuleC).isKilling || ModuleService.getModule(GhostModuleC).isinvinci) {
            return;
        }
        this._clientCheckComs.forEach(e => {
            e.updateTimer += dt;
            if (e.updateTimer < e.updateInterval) {
                return;
            }
            e.updateTimer = 0;
            e.onUpdate(e.updateInterval);
        })
    }

    /**
     * 客户端检查目标距离
     */
    client_checkTargetDist() {
        if (this.logicState != GhostLogicState.Chase) return;
        if (this._clientTargetPlayer != this._clientPlayer) {
            return;
        }
        const path = Navigation.findPath(this.ghostChar.worldTransform.position, this._clientTargetCharacter.worldTransform.position);
        // 计算到目标点的路径长度
        let dist = 0;
        for (let i = 0; i < path.length - 1; i++) {
            dist += mw.Vector.distance(path[i], path[i + 1]);
        }
        if (dist >= this._cfg.existChaseDist) {
            this.server_exitChase();
        }
    }

    @RemoteFunction(Client, Multicast)
    public playAni(guid: string) {
        if (this._petAniCtl && this.graphicCfg) {
            this._petAniCtl.playAnimation(guid);
        }
    }

    @RemoteFunction(Client, Multicast)
    public stopAni() {
        if (this._petAniCtl && this.graphicCfg) {
            this._petAniCtl.stopAni();
        }
    }

    @RemoteFunction(Client)
    cli_checkGhostCatch(player: Player) {
        console.log("开始检测鬼是否抓到玩家")
        let curSafe: string = BoardHelper.GetTargetKeyValue(BoardKeys.PlayerSafeStat);
        if (curSafe && this._cfg.safePlace && this._cfg.safePlace.includes(curSafe)) {
            console.log("检测到玩家正在安全的地方躲避")
            return;
        }
        this.ser_cliCatch(player.playerId);
    }

    @RemoteFunction(Server)
    public ser_cliCatch(playerId: number) {
        this.ser_catchPlayer(Player.getPlayer(playerId));
    }


    public ser_catchPlayer(player: Player) {
        if (this.logicState == GhostLogicState.Killing) {
            return;
        }
        console.log("抓住你啦", player.character.gameObjectId, player.playerId);
        this.logicSM.switch(GhostLogicState.Killing);
        if (!this.ghostChar.getVisibility()) {
            this.ghostChar.setVisibility(mw.PropertyStatus.On);
            this.visibleTimer = 3;
        }
        ModuleService.getModule(GhostModuleS).setPlayerCd(player);
        let dir = Vector.subtract(player.character.worldTransform.position, this.ghostChar.worldTransform.position);
        dir.z = 0;
        this.ghostChar.worldTransform.rotation = dir.toRotation();
        this.cli_killChar(player, dir);
    }

    public setEnable(enable: boolean) {
        this.enableKill = enable;
        this.ghostChar.setVisibility(enable ? PropertyStatus.On : PropertyStatus.Off);
        console.log("将鬼显隐设置了" + enable)
    }

    @RemoteFunction(Server)
    public server_setClientSee(playerId: number, isCanSee: boolean, degree: number) {
        let player = Player.getPlayer(playerId);
        if (!player) {
            return;
        }
        if (playerId == this.targetId && degree != 0) {
            this.targetData.setData(player, degree, this._cfg.ghostId);
        }
        let index = this.canSeeArray.indexOf(playerId);
        if (isCanSee) {
            if (index != -1) {
                return;
            }
            this.canSeeArray.push(playerId);
        }
        else {
            if (index == -1) {
                return;
            }
            this.canSeeArray.splice(index, 1);
        }
    }

    @RemoteFunction(Client, Multicast)
    public syncChaseArray(newArray: number[]) {
        this.chaseArray = newArray
    }

    @RemoteFunction(Server)
    lead2Pos(targetPos: Vector, isEffectChase: boolean) {
        if (this.logicState != GhostLogicState.Casual && !isEffectChase) {
            return;
        }
        if (this.logicState == GhostLogicState.Chase) {
            this.server_exitChase();
        }
        Event.dispatchToLocal(GhostBananeEvt, this.ghostChar.gameObjectId, targetPos);
    }

    public takeDmg(dmg: number) {

    }
}
