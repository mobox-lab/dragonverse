/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-10 15:26:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-26 14:52:53
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\ghost\GhostBehavoir.ts
 * @Description  : 
 */

import { GlobalDefine } from "../../../DefNoSubModule";
import { Behavior3Map } from "../../../behavior3Data/BehaviorMap";
import { GameConfig } from "../../../config/GameConfig";
import { IGhostElement } from "../../../config/Ghost";
import { IGhostDayElement } from "../../../config/GhostDay";
import { IGhostGraphicElement } from "../../../config/GhostGraphic";
import { IGhostInstanceElement } from "../../../config/GhostInstance";
import Weapon from "../../GamePlay/Framework/MeleeWeapon/Weapon";
import { LoadMgr } from "../../GamePlay/Framework/Tools/LoadManager";
import GameStart, { EGameTheme } from "../../GameStart";
import { PlayerManagerExtension } from "../../Modified027Editor/ModifiedPlayer";
import { BehaviorTreeManager } from "../../behavior3/BehaviorManager";
import { BehaviorTreeInstance } from "../../behavior3/BehaviorTree";
import { P_Blood } from "../../ui/P_Blood";
import { CommonUtils } from "../../utils/CommonUtils";
import { ImpluseUpdater } from "../../utils/ImpuluseLimiter";
import { BlackBoardModuleS } from "../blackboard/BlackBoardModuleS";
import { BoardHelper, BoardKeys } from "../blackboard/BoardDefine";
import { PlayerModuleS } from "../player/PlayerModuleS";
import { GhostMoveState, GhostLogicState, GhostAniState, GhostSettings } from "./GhostDefine";
import { GhostModuleC } from "./GhostModuleC";
import { GhostModuleS } from "./GhostModuleS";
import { GhostMoveProxy } from "./GhostMoveProxy";
import { GhostPetAni } from "./com/GhostPetAnimator";
import { GhostNodeStat } from "./nodes/const/GhostNodeStat";
import { GhostDistanceUI } from "./ui/GhostDistanceUI";


export class TargetData {
    public char: Character;
    public player: Player;
    public degree: number;
    public cfg: IGhostElement;
    public startTime: number;

    public setData(player: Player, degree: number, ghostId: number) {
        this.degree = degree;
        this.player = player;
        this.char = player.character;
        this.cfg = GameConfig.Ghost.getAllElement().find(e => {
            return e.ghostId == ghostId && e.diffcult.includes(degree);
        })
        if (!this.cfg) {
            console.error("没有找到相应的配置呀degree:" + degree + "ghostid:" + ghostId)
            this.cfg = GameConfig.Ghost.getAllElement().find(e => {
                return e.ghostId == ghostId;
            })
        }
        this.startTime = TimeUtil.elapsedTime();
    }
}

@Component
export default class GhostBehavoirInst extends mw.Script {
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

    /** 移动动画状态 */
    @Property({ replicated: true })
    moveAniGroup: GhostAniState = GhostAniState.Normal;

    /** 追击目标id */
    @mw.Property({ replicated: true, onChanged: "client_onTargetChanged" })
    targetId: number = 0;

    /** 这是第几天的鬼 */
    @Property({ replicated: true })
    public bindDay: number = 0;

    /** 正在追击的目标的属性 */
    public targetData: TargetData = new TargetData();

    /** 行为树 */
    private _behavoirTree: BehaviorTreeInstance;

    /** 是否使能了行为树 */
    public enableTree: boolean = true;

    /** 对应不同难度的鬼的配置 */
    public cfgMap: Map<number, IGhostElement> = new Map();

    /** 最后一次找寻玩家的时间节点 */
    public lastFindMap: Map<number, number> = new Map();

    @Property({ replicated: true, onChanged: "onBindPlayerIdChnaged" })
    /** 给行为树用的绑定的playerId */
    public bindPlayerId: number = 0;

    /** 当前的冷兵器 */
    private _meleeWeapon: Weapon;

    /** 鬼的角色
     * @description 双端
     */
    ghostChar: mw.Character;

    /** 触发器 */
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

    /** 脚步声
     * @description 服务端
     */
    walkSound: number;

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

    /** 客户端目标玩家
     * @description 客户端
     */
    _clientTargetPlayer: mw.Player;

    /** 客户端目标角色
     * @description 客户端
     */
    _clientTargetCharacter: mw.Character;

    /** 客户端播放用的动画控制器 */
    private _petAniCtl: GhostPetAni;

    /** 是否使能了击杀 */
    public enableKill: boolean = true;

    @Property({ replicated: true, onChanged: "onCurHpChanged" })
    /** 鬼当前的生命值 */
    public curHp: number = 0;

    /** 复活计时器 */
    public relifeTimer: number = 0;

    /** 技能cd图 */
    public skillCdMap: Map<number, number> = new Map();

    /** 寻路失败的时候的默认方向 */
    public bindDir: Rotation;

    /** 移动代理工具 */
    public moveProxy: GhostMoveProxy = new GhostMoveProxy();

    /** 鬼的今日配置 */
    public dayCfg: IGhostDayElement;

    /** where 2 start partol */
    public startPos: Vector;

    /** 总闸 */
    public enable: boolean = true;

    public lastCheckBuildId: string = "";

    private _cubeArr: GameObject[] = [];

    protected onStart(): void {
        this.ghostChar = this.gameObject as mw.Character;
        this.ghostChar.collisionWithOtherCharacterEnabled = true;
        if (SystemUtil.isServer()) {
            this.server_onStart();
            Player.onPlayerLeave.add((player: Player) => {
                if (this.lastFindMap.has(player.playerId)) {
                    this.lastFindMap.delete(player.playerId);
                }
            })
        }
        if (SystemUtil.isClient()) {
            this.onCfgIdChanged();
            this.onBindPlayerIdChnaged("", this.bindPlayerId, 0);
            if (SystemUtil.isPIE) {
                let preC;
                InputUtil.onKeyDown(Keys.P, () => {
                    GameObject.asyncSpawn("Camera", { replicates: false }).then((c: Camera) => {
                        preC = Camera.currentCamera;
                        Camera.switch(c);
                        c.parent = this.ghostChar;
                        c.springArm.length = 1000;
                    })
                });
                InputUtil.onKeyDown(Keys.O, () => {
                    Camera.switch(preC);
                });
            }
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
            if (!this.enable) {
                return;
            }
            if (PlayerManagerExtension.isCharacter(go)) {
                let ghostPos = this.ghostChar.worldTransform.position.clone().add(Vector.up.multiply(50));
                let res = QueryUtil.lineTrace(ghostPos, go.worldTransform.position, true, GhostSettings.openDebug, [this._trigger.gameObjectId], false, false, this.ghostChar);
                res = res.filter(e => { return !(e.gameObject instanceof mw.Trigger) })
                if (res.length > 0 && PlayerManagerExtension.isCharacter(res[0].gameObject)) {
                    let playerid = go.player.playerId;
                    //check if has speical taget
                    if (this.bindPlayerId != 0 && this.bindPlayerId != playerid) {
                        return;
                    }
                    // check if can kill this taget
                    let canKill = ModuleService.getModule(GhostModuleS).checkCanKill(playerid);
                    if (!canKill) {
                        return;
                    }
                    this.ser_catchPlayer(go.player);
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
        ModuleService.getModule(GhostModuleC).killPlayer(this.graphicCfg.attackDelayUI, this.graphicCfg.stopTime, ani, this.ghostChar, this.graphicCfg, dir, this._insCfg, this.bindDay);
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
        console.log("行为树版本鬼初始化完成", this.cfgId)
        this.ghostChar = this.gameObject as mw.Character;
        this.ghostChar.displayName = "";
        this._clientChar = this._clientPlayer.character;
        this._insCfg = GameConfig.GhostInstance.getElement(this.cfgId);
        this._cfg = GameConfig.Ghost.getAllElement().find(e => {
            return e.ghostId == this._insCfg.ghostId;
        });
        this.ghostChar["photoTag"] = this._insCfg.photoTag;
        this._clientInited = true;
        this.useUpdate = true;
        await this.ghostChar.asyncReady();
        await ModuleService.ready();

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
        const ghostModule = ModuleService.getModule(GhostModuleC);
        let bodyBox = await LoadMgr.asyncSpawn("197386");
        bodyBox.tag = "GhostBody";
        bodyBox.parent = this.ghostChar;
        bodyBox.worldTransform.scale = new Vector(0.5, 0.5, 1.5);
        bodyBox.localTransform.position = new Vector(0, 0, -25);
        bodyBox.setCollision(CollisionStatus.QueryOnly);
        bodyBox.setVisibility(PropertyStatus.Off);
        ghostModule.regPart(bodyBox.gameObjectId, this.ghostChar.gameObjectId);

        let headSphere = await LoadMgr.asyncSpawn("197388");
        headSphere.tag = "GhostHead";
        this.ghostChar.attachToSlot(headSphere, HumanoidSlotType.Head);
        headSphere.localTransform.position = new Vector(0, 0, -10);
        headSphere.localTransform.scale = Vector.one.multiply(0.5);
        headSphere.setVisibility(PropertyStatus.Off);
        headSphere.setCollision(CollisionStatus.QueryOnly);
        this._cubeArr.push(bodyBox);
        this._cubeArr.push(headSphere);
        ghostModule.regPart(headSphere.gameObjectId, this.ghostChar.gameObjectId);
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
        }
        console.log("鬼难度设置结果:" + isShowGhost)
    }

    /**
     * 画质变更
     * @param style 
     * @returns 
     */
    private onStypeChanged(style: number) {
        if (!this.ghostChar.worldTransform) {
            return;
        }
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
        GameStart.GameTheme != EGameTheme.Graveyard && this.ghostChar.clearDescription();
        if (this.graphicCfg.apprance.startsWith("_")) {
            this.ghostChar.description.base.wholeBody = this.graphicCfg.apprance.slice(1);
            this._petAniCtl.setAnimation(this.graphicCfg);
        }
        else {
            GameStart.GameTheme != EGameTheme.Graveyard && this.ghostChar.setDescription([this.graphicCfg.apprance])
            this._petAniCtl.setAnimation(this.graphicCfg);
        }
        this.ghostChar.worldTransform.scale = Vector.one.multiply(this.graphicCfg.scale);
        this.ghostChar.collisionExtent = new Vector(60, 60, 100).divide(this.graphicCfg.scale);

        console.log("画质换装" + this.graphicCfg.apprance)

        this.ghostChar.setVisibility(this.ghostChar.getVisibility(), false);
        this.ghostChar.asyncReady().then(() => {
            this._petAniCtl.stopAni();
        })
    }

    /**
     * 初始化鬼
     * @param cfgId 实例id
     */
    async server_initGhost(cfgId: number, dayId: number) {
        this.ghostChar = this.gameObject as mw.Character;
        this.ghostChar.maxStepHeight = 70;
        this.ghostChar.walkableFloorAngle = 60;
        this.cfgId = cfgId;
        this._insCfg = GameConfig.GhostInstance.getElement(this.cfgId);
        this._cfg = GameConfig.Ghost.getAllElement().find(e => {
            return e.ghostId == this._insCfg.ghostId;
        });
        this.bindDay = dayId;
        this.dayCfg = GameConfig.GhostDay.getElement(this.bindDay);
        if (!Behavior3Map.has(this._insCfg["treeName"])) {
            console.error("GhostBehavoirError: don't have target tree:" + this._insCfg["treeName"]);
            return;
        }
        this._behavoirTree = BehaviorTreeManager.new(`ghost${this.id}`, Behavior3Map.get(this._insCfg["treeName"]), {
            character: this.ghostChar,
            inst: this
        });
        GameConfig.Ghost.getAllElement().filter(e => {
            return e.ghostId == this._insCfg.ghostId;
        }).forEach(e => {
            for (let index = 0; index < e.diffcult.length; index++) {
                const dif = e.diffcult[index];
                this.cfgMap.set(dif, e);
            }
        });
        this.gameObject.worldTransform.position = this._insCfg.patrols[0].clone().add(Vector.up.multiply(50));
        this.curHp = this._insCfg.hp || 10;
        console.log("鬼初始化完成", this._insCfg.patrols[0]);
        if (this._cfg.attackMode == 1) {
            this._trigger.worldTransform.scale = new Vector(1, 1, 3)
        }
        else {
            this._trigger.shape = TriggerShapeType.Sphere;
            this._trigger.worldTransform.scale = Vector.one.multiply(this._cfg.attackMode);
        }
        if (!this._meleeWeapon) {
            this._meleeWeapon = await Script.spawnScript(Weapon, true, this.ghostChar);
            this._meleeWeapon.initCharacter(this.ghostChar, null);
        }
        this._meleeWeapon.reWriteAnimationByParams(...this._insCfg.skills);
        if (this._cfg.attackMode <= 0) {
            this._trigger.enabled = false;
        }
        this._serverInited = true;
        this.useUpdate = true;

        this.ghostChar.capsuleCorrectionEnabled = false;
        this.ghostChar.collisionShape = CustomShapeType.VerticalCapsule;
        this.ghostChar.collisionExtent = new Vector(60, 60, 100);

        if (GameStart.GameTheme != EGameTheme.Graveyard) {
            let dCfg = GameConfig.GhostGraphic.getAllElement().find(e => {
                return e.appearanceId == this._insCfg.appearanceId;
            })
            this.ghostChar.setDescription([dCfg.apprance]);
        }

        this.reset2Hang();
    }

    setCasualConfigs() {
        this.ghostChar.maxWalkSpeed = this._cfg.casualSpeed * this.dayCfg.spd;
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
        this.ghostChar.maxWalkSpeed = this.targetData.cfg.chaseSpeed * this.dayCfg.spd;
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
        if (!Player.getPlayer(playerId)) {
            return;
        }
        if (playerId == this.targetId) {
            return;
        }
        Navigation.stopNavigateTo(this.ghostChar);
        Navigation.stopFollow(this.ghostChar);
        console.log("鬼开始追", playerId);
        this.targetId = playerId;
        this.targetData.setData(Player.getPlayer(playerId), degree, this._cfg.ghostId);
        this._behavoirTree.set_env(GhostNodeStat.Chasing, -1);
        this._behavoirTree.set_env(GhostNodeStat.IsMoving, 0);
        this.setChaseConfigs();
        this.logicState = GhostLogicState.Chase;
        console.log("enter chase");
        this.moveState = GhostMoveState.Follow;
        this.stopAni();
    }

    /**
     * 脱离追击
     */
    @RemoteFunction(mw.Server)
    server_exitChase() {
        Navigation.stopNavigateTo(this.ghostChar);
        Navigation.stopFollow(this.ghostChar);
        console.log("鬼脱离追击");
        if (this.targetId) {
            this.lastFindMap.set(this.targetId, TimeUtil.elapsedTime());
        }

        console.log("enter casual");
        this.reset2Hang();
        console.log("casual enter hang");
    }

    public reset2Hang(aniPlay: boolean = true) {
        this.setCasualConfigs();
        this.logicState = GhostLogicState.Casual;
        this.moveState = GhostMoveState.Hang;
        this.targetId = 0;
        this._behavoirTree.set_env(GhostNodeStat.Chasing, 0);
        this._behavoirTree.set_env(GhostNodeStat.IsMoving, 0);
        this._behavoirTree.set_env(GhostNodeStat.PlayMelee, 0);
        this._behavoirTree.set_env(GhostNodeStat.PatrolStat, TimeUtil.elapsedTime() + 4.0);
        this._meleeWeapon.stopPlay();
        aniPlay && this.playAni("watchAni");
    }

    protected onUpdate(dt: number): void {
        if (!this.enable) {
            return;
        }
        if (SystemUtil.isServer()) {
            this.server_onUpdate(dt);
        }
        if (SystemUtil.isClient()) {
            this.client_onUpdate(dt);
        }
    }

    private _isPlayUpAni: boolean = false;

    server_onUpdate(dt: number) {
        if (this._isPlayUpAni) {
            return;
        }
        if (this.curHp <= 0) {
            if (this.relifeTimer > TimeUtil.elapsedTime()) {
                return;
            }
            this._isPlayUpAni = true;
            this.playAni("upAni")
            setTimeout(() => {
                this.enableTree = true;
                this.curHp = this._insCfg.hp || 10;
                this.stopAni();
                this.enableKill = true;
                this.ghostChar.collisionWithOtherCharacterEnabled = true;
                this._isPlayUpAni = false;
            }, 1500);
            return;
        }
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
        this.enableTree && this._behavoirTree.run();
        if (this.bindDir) {
            this.moveProxy.onUpdate(this.ghostChar, this.bindDir);
        }
    }

    private _preMoveState;

    client_onUpdate(dt: number) {
        this._petAniCtl?.updateAnimator(dt);
        if (this.relifeTimer >= 0) {
            this.relifeTimer -= dt;
            return;
        }
        this._petAniCtl?.onUpdate(this.moveState, this.moveAniGroup, 0.1 - this.relifeTimer);
        this.relifeTimer = 0.1;
        if (this.moveState != this._preMoveState) {
            this._preMoveState = this.moveState;
            if (this.moveState == GhostMoveState.Hang) {
                this.ghostChar.tag = "GhostHang"
            }
            else {
                this.ghostChar.tag = "GhostFollow"
            }
        }
    }

    client_onTargetChanged(path: string[], value: number, oldVal: number) {
        if (!Player.localPlayer) {
            return;
        }
        //单个鬼
        //这个鬼在追自己
        if (value == Player.localPlayer.playerId) {
            UIService.getUI(P_Blood).addGhostGuid(this.id);
            UIService.getUI(P_Blood).showBlood();
        }
        //这个鬼没有在追自己
        else {
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

    @RemoteFunction(Client, Multicast)
    public playAni(guid: string, isLoop: boolean = false) {
        if (this._petAniCtl && this.graphicCfg) {
            this._petAniCtl.playAnimation(guid, isLoop);
        }
    }

    @RemoteFunction(Client, Multicast)
    public playAni2(guid: string, slot: AnimSlot) {
        if (this._petAniCtl && this.graphicCfg) {
            this._petAniCtl.playAnimation(guid, false, slot);
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

    public ser_attack(skillId: number) {
        let cfg = GameConfig.GhostAttack.getElement(skillId);
        if (!cfg) {
            return;
        }
        Navigation.stopNavigateTo(this.ghostChar);
        this._behavoirTree.set_env(GhostNodeStat.PlayMelee, -1);
        this.skillCdMap.set(skillId, TimeUtil.elapsedTime() + cfg.cd);
        let skillIndex = this._insCfg.skills.indexOf(skillId);
        if (skillIndex == -1) {
            return;
        }
        this._meleeWeapon.playAnimation(skillIndex, () => {
            this.moveProxy.resetFailCount();
            this._behavoirTree.set_env(GhostNodeStat.PlayMelee, 0);
            this._behavoirTree.set_env(GhostNodeStat.IsMoving, 0);
        }, (params: string, maxIndex: number, hitobjs: GameObject[]) => {
            let dmg = Number(params);
            if (!dmg) {
                console.error("警告，技能伤害为0")
                return;
            }
            dmg = -dmg;
            dmg *= this.dayCfg.atk;
            dmg = Math.ceil(dmg);
            let hurtObjs = [];
            hitobjs.forEach(e => {
                if (this.bindPlayerId == 0 && e instanceof Character && e.player) {
                    const playermodule = ModuleService.getModule(PlayerModuleS);
                    //if kill special target

                    playermodule.net_changeHp(e.player.userId, - this._insCfg.dmg * this.dayCfg.atk);
                    if (playermodule.getHp(e.player.userId)) {
                        let dir = Vector.subtract(e.worldTransform.position, this.ghostChar.worldTransform.position).normalize();
                        let force = dir.toRotation().rotateVector(cfg.force);
                        ImpluseUpdater.instance.addImpluse(e, force);
                    }
                    else {
                        ModuleService.getModule(GhostModuleS).setPlayerCd(e.player);
                    };

                }
                if (e["BuildingUUID"]) {
                    Event.dispatchToLocal("S2S_ChangeBuildingHP", e["BuildingUUID"], dmg)
                    hurtObjs.push(e["BuildingUUID"]);
                }
            })
            if (this.lastCheckBuildId != "" && !hurtObjs.includes(this.lastCheckBuildId)) {
                Event.dispatchToLocal("S2S_ChangeBuildingHP", this.lastCheckBuildId, dmg)
            }
        }, null, null, null);
    }


    public ser_catchPlayer(player: Player) {
        if (this.logicState == GhostLogicState.Killing) {
            return;
        }
        console.log("enter kill");
        Navigation.stopNavigateTo(this.ghostChar);
        this.logicState = GhostLogicState.Killing;
        this.moveState = GhostMoveState.Wait;
        this.ghostChar.movementEnabled = false;
        this.playAni("attackAni");
        this.enableTree = false;
        // setdir
        console.log("抓住你啦", player.character.gameObjectId, player.playerId);
        if (!this.ghostChar.getVisibility()) {
            this.ghostChar.setVisibility(mw.PropertyStatus.On);
            this.visibleTimer = 3;
        }
        ModuleService.getModule(GhostModuleS).setPlayerCd(player, (this._insCfg["stayTime"] || 0) - 6);
        let dir = Vector.subtract(player.character.worldTransform.position, this.ghostChar.worldTransform.position);
        dir.z = 0;
        this.ghostChar.worldTransform.rotation = dir.toRotation();
        //settimeout
        setTimeout(() => {
            if (this.bindPlayerId) {
                ModuleService.getModule(GhostModuleS).setPlayerCd(player);
                this.enableTree = false;
                this.bindDir = dir.negative.toRotation();
                this.moveProxy.resetFailCount();
                setTimeout(() => {
                    this.bindDir = null;
                    this.enable = false;
                    ModuleService.getModule(GhostModuleS).despawnGhost(this);
                }, 4000);
                return;
            }
            this.ghostChar.movementEnabled = true;
            this.enableTree = true;
            this.reset2Hang();
        }, 2000);
        this.cli_killChar(player, dir);
    }

    public setEnable(enable: boolean) {
        if (this.curHp <= 0) {
            return;
        }
        this.enableKill = enable;
        this.ghostChar.setVisibility(enable ? PropertyStatus.On : PropertyStatus.Off);
        console.log("将鬼显隐设置了" + enable)
    }

    public takeDmg(dmg: number, targetId: number) {
        if (!this.targetId) {
            this.server_startChase(targetId, ModuleService.getModule(BlackBoardModuleS).reqGetBoardValue(targetId))
        }
        if (this.targetId == targetId) {
            this.targetData.startTime = TimeUtil.elapsedTime();
        }
        if (this.curHp <= 0) {
            return;
        }
        this.curHp -= dmg;

        if (this.curHp <= 0) {
            this.relifeTimer = TimeUtil.elapsedTime() + this._insCfg.relifeTime || 10;
            this.enableTree = false;
            this.enableKill = false;
            // this.ghostChar.setVisibility(PropertyStatus.Off);
            this._meleeWeapon.stopPlay();
            this.playAni("dizAni", true);
            this.ghostChar.movementEnabled = false;
            Navigation.stopFollow(this.ghostChar);
            Navigation.stopNavigateTo(this.ghostChar);
            this.reset2Hang(false);
            this.ghostChar.collisionWithOtherCharacterEnabled = false;
        }
    }

    public checkHitAni() {
        if (!this.enable || !this.enableTree || !this.enableKill || this._behavoirTree.env.getVar(GhostNodeStat.PlayMelee) == -1) {
            return false;
        }
        return true;
    }

    /**
     * reset 2 intial
     * @param pos 新的出生点位置
     */
    public reset(pos: Vector) {
        this.enable = true;
        this.curHp = this._insCfg.hp;
        this._behavoirTree?.interrupt();
        this.logicState == GhostLogicState.Casual ? this.setCasualConfigs() : this.setChaseConfigs();
        this.moveProxy.resetFailCount();
        this.startPos = pos;
    }

    protected onDestroy(): void {
        if (SystemUtil.isClient()) {
            UIService.getUI(P_Blood).removeGhostGuid(this.id);
            if (this.bindPlayerId) {
                UIService.getUI(GhostDistanceUI).clearTarget();
            }
        }
    }

    public async onBindPlayerIdChnaged(path: string, newval: number, oldVal: number) {
        if (!this.ghostChar) {
            return;
        }
        const localPlayer = await Player.asyncGetLocalPlayer();
        if (!localPlayer) {
            return;
        }
        if (oldVal == localPlayer.playerId) {
            await this.ghostChar.asyncReady();
            this.ghostChar.setPostProcessOutline(false);
        }
        if (this.bindPlayerId == 0 || this.bindPlayerId != localPlayer.playerId) {
            return;
        }
        await this.ghostChar.asyncReady();
        UIService.getUI(GhostDistanceUI).setTargetLoc(this.ghostChar, this);
        let des = localPlayer.character.getDescription();
        CommonUtils.blackDescription(des);
        this.ghostChar.setDescription(des);
        await this.ghostChar.asyncReady();
        this.ghostChar.syncDescription();
        setTimeout(() => {
            this.ghostChar.setPostProcessOutline(true, LinearColor.red, 4);
        }, 2000);
    }

    public onCurHpChanged(path: string, newval: number, oldVal: number) {
        if (this.curHp <= 0) {
            this._cubeArr.forEach(e => {
                (e as Model).setCollision(CollisionStatus.Off, true);
            })
            this.gameObject.setCollision(CollisionStatus.Off);
        }
        else if (newval > oldVal) {
            this._cubeArr.forEach(e => {
                (e as Model).setCollision(CollisionStatus.QueryOnly, true);
            })
            this.gameObject.setCollision(CollisionStatus.On);
        }
    }
}
