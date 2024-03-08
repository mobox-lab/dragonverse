import { GameConfig } from '../../../../config/GameConfig';
import { GhostAttackConfig } from '../../../../config/GhostAttack';
import { PlayerManagerExtension } from '../../../Modified027Editor/ModifiedPlayer';
import { MapEx } from '../../../utils/MapEx';
import { LoadMgr } from '../Tools/LoadManager';
import { AnimationInfo, NodeInfoAnim, NodeInfoAudio, NodeInfoBase, NodeInfoCamera, NodeInfoEff, NodeInfoFlyEntity, NodeInfoForbidden, NodeInfoMove, NodeInfoPeriod, NodeInfoSkillRect, NodeInfoThrow, NodeType, ThrowGo, getNodeClassByType } from "./AnmationInfo";
import { AssetsManager } from "./AssetsManager";
import { SkillRectCheck } from "./SkillRectCheck";
import { TimeOutInfo, WeaponData } from "./WeaponDef";
/** 冷兵器客户端处理器 */
export abstract class WeaponClient extends WeaponData {

    /** 当前动画索引 */
    private _curAnimationIndex: number = 0;
    /** 当前动作索引 */
    private _curActionIndex: number = 0;

    /** 是否可以连击 */
    private _canCombo: boolean = false;

    /** 是否达到蓄力状态 */
    private _canCharge: boolean = false;

    /** 是否可以操作 */
    private _canOper: boolean = true;

    /** 最后一次的播放动作信息 */
    private _lastPlayInfo: NodeInfoPeriod = null;
    /** 最后一次播放的guid */
    private _lastPlayGuid: string = "";

    /** 最后一次播放的动画对象 */
    private _lastAnimation: mw.Animation = null;

    /** 当前右手穿戴的装备 */
    @mw.Property({ replicated: true, onChanged: "client_OnChangeEquipWeaponRight" })
    protected equipRightWeaponGuid: string = "";

    /** 当前左手穿戴的装备 */
    @mw.Property({ replicated: true, onChanged: "client_OnChangeEquipWeaponLeft" })
    protected equipLeftWeaponGuid: string = "";

    /** 客户端右手穿戴的装备 */
    private _clientEquipGo_Right: mw.GameObject = null;
    /** 客户端左手穿戴的装备 */
    private _clientEquipGo_Left: mw.GameObject = null;

    /** 战斗姿态 */
    private _fightIdelAniGuid: string = "";
    /** 战斗姿态混合模式 */
    private _fightStanceBlendMode: number = 2;

    /** 战斗姿态待机设置时间 */
    private _constFightingSec: number = 3;

    /** 战斗待机计时 */
    private _fightingSec: number = 0;

    /** 当前飞弹id */
    private curFireNodeGenId: number = 1;

    private curFollowNodeGenId: number = 1;

    //private _onFlyHit: (hitObjs: mw.GameObject[]) => void = null;

    /** 重写武器JSON完成 */
    private rewriteFinished: boolean = false;

    private _onComplate: (actionIndex: number, maxIndex: number) => void;
    private _onHit: (param: string, maxIndex: number, hitObjs: mw.GameObject[]) => void;
    private _onStartCombo: (milSec: number) => void;
    private _onStartCharge: (actionIndex: number, maxIndex: number, endCharge: (chargeTime: number) => void) => void;
    private _onChangeControl: (canControl: boolean) => void = null;

    /** 击打索引 */
    hitIndex: number = 0;

    private _chargeStartTime: number = null;

    /** 当前动作的最大段数 */
    private _maxIndex: number = 0;
    /** 当前段数 */
    private _curIndex: number = 0;

    private _timeOutPool: TimeOutInfo[] = [];

    // private _lastCameraData: CameraSystemData;


    //#region 是否本地播放特效

    /**
     * 是否同步特效
     */
    private _syncEff: boolean = true;
    _stance: mw.SubStance;

    private _clientPlayerId: number;

    get canOper() {
        return this._canOper;
    }

    public isDestroy = false;

    get curActionIndex() {
        return this._curActionIndex;
    }

    protected onDestroy(): void {
        super.onDestroy();
        console.log("WeaponDestroy");
        if (this.isDestroy) {
            return;
        }
        this.isDestroy = true;
        if (this._clientEquipGo_Right != null) {
            this._clientEquipGo_Right.parent = null;
            this._clientEquipGo_Right.destroy();
            this._clientEquipGo_Right = null;
        }
        if (this._clientEquipGo_Left != null) {
            this._clientEquipGo_Left.parent = null;
            this._clientEquipGo_Left.destroy();
            this._clientEquipGo_Left = null;
        }
        MapEx.forEach(this._cacheFlyNode, (k, v) => {
            v?.destroy();
        })
        this._cacheFlyNode = {};
        if (this.char && this.char.worldTransform) {
            console.log("rock onDestroy");
            this.char.movementEnabled = true;
            this.char.jumpEnabled = true;
        }
        this._stance?.stop();
        this.stopAllTimer();
        super.onDestroy();
    }

    /**
     * 是否同步特效
     */
    public get syncEff() {
        return this._syncEff
    }

    /**
     * 是否同步特效
     */
    public set syncEff(localEff: boolean) {
        this._syncEff = localEff;
    }
    //#endregion

    /**
     * 通过参数重写冷兵器的动画JSON
     * @param params 
     */
    public async reWriteAnimationByParams(...params: number[]) {
        this.rewriteFinished = false;
        this.server_setWeaponJsonByParams(...params);
        // 服务器触发，在服务端也要解析
        if (SystemUtil.isServer()) {
            this.reWriteAnimationJson(params);
        }
        return new Promise<void>((resolve, reject) => {
            if (this.rewriteFinished) {
                return resolve();
            }
            const id = setTimeout(() => {
                if (this.rewriteFinished) {
                    clearTimeout(id);
                    return resolve();
                }
            }, 30);
        })
    }

    /**
     * 重新写入动画数据
     * @param skillIds 动画数据数组 每个json为一个动画
     */
    protected async reWriteAnimationJson(skillIds: number[]) {
        let jsonList = [];
        skillIds.forEach(e => {
            let skillCfg = GameConfig.GhostAttack.getElement(e);
            if (!skillCfg) {
                return;
            }
            jsonList.push(skillCfg.json);
        })
        this.animationJsons = [];
        this.animationJsons = jsonList;
        this.animationInfo = [];
        this.animationJsons.forEach(e => {

            let info = JSON.parse(e) as AnimationInfo;
            let newInfo = new AnimationInfo();

            if (info) {
                // 保存非节点信息
                Object.keys(info).forEach(e => {
                    if (info[e] instanceof Object) {
                        return;
                    }
                    newInfo[e] = info[e];
                })
                // 保存节点信息
                info.infos.forEach(e => {
                    const nodeClass = getNodeClassByType(Number(e.type));
                    let nodeInfo = new nodeClass();
                    Object.keys(nodeInfo).forEach(k => {
                        nodeInfo[k] = e[k]
                    })
                    newInfo.infos.push(nodeInfo);
                })
                this.animationInfo.push(newInfo);
            } else {
                console.error("解析json错误 : " + e);
            }
        })

        if (this.animationInfo.length != this.animationJsons.length) {
            console.error("解析json错误 : 动画数量和解析数量不一致 : " + this.animationInfo.length + " = " + this.animationJsons.length);
        } else {
            // 加载资源
            for (let i = 0; i < this.animationInfo.length; i++) {
                let aniInfo = this.animationInfo[i];
                for (let j = 0; j < aniInfo.infos.length; j++) {
                    let info = aniInfo.infos[j];
                    if (info["guid"] == null) {
                        continue;
                    }
                    if (mw.AssetUtil.assetLoaded(info["guid"])) continue;
                    if (!mw.AssetUtil.assetLoaded(info["guid"])) {
                        let res = await mw.AssetUtil.asyncDownloadAsset(info["guid"]);

                    }
                }
                if (aniInfo.charFightIdelAniId == "") {
                    continue;
                }
                if (mw.AssetUtil.assetLoaded(aniInfo.charFightIdelAniId)) continue;
                if (!mw.AssetUtil.assetLoaded(aniInfo.charFightIdelAniId)) {
                    let res = await mw.AssetUtil.asyncDownloadAsset(aniInfo.charFightIdelAniId);

                }
            }
        }
        this.rewriteFinished = true;
    }

    /**
     * 播放动画
     * @param index 动画索引
     * @param onComplate 动画播放完成回调,actionIndex:当前index,maxIndex:最大索引
     * @param onHit 打击点回调,actionIndex:当前动作索引,maxIndex:最大动作索引,hitObjs:受击对象列表(过滤自身)
     * @param onStartCombo 开始连击回调,milSec:可以连击的时间(毫秒)
     * @param onStartCharge 开始蓄力回调,actionIndex:当前动作索引,maxIndex:最大动作索引,endCharge:开发者主动触发,结束蓄力，参数是否蓄力成功
     * @param onFlyNodeHit 弹道技能击中回调
     * @returns 
     */
    public async playAnimation(index: number,
        onComplate: (actionIndex: number, maxIndex: number) => void,
        onHit: (param: string, maxIndex: number, hitObjs: mw.GameObject[]) => void,
        onStartCombo: (milSec: number) => void,
        onStartCharge: (actionIndex: number, maxIndex: number, endCharge: (chargeTime: number) => void) => void,
        onChangeControl: (canControl: boolean) => void = null
    ): Promise<boolean> {
        console.log("playAnimation : " + index, this._curAnimationIndex, this._curActionIndex);
        if (!this._canOper) {
            // console.error("当前不能操作");
            return false;
        }

        if (!this.checkIndex(index)) {
            console.error("索引出错 : " + index);
            return false;
        }
        /** 绑定方法 */
        this._onComplate = onComplate;
        this._onHit = onHit;
        this._onStartCombo = onStartCombo;
        this._onStartCharge = onStartCharge;
        //this._onFlyHit = onFlyHit;
        this._onChangeControl = onChangeControl;

        this.stopAllTimer();
        this.allTimer = [];

        // 新的攻击动画，重置连击
        if (this._curAnimationIndex != index) {
            this._curActionIndex = 0;
            this._canOper = false;
            this._canCombo = false;
        }

        this._maxIndex = this.getActionLengthByAnimation(this._curAnimationIndex) - 1;
        this._curIndex = this._curActionIndex;

        // 可以连击，设置当前动画索引
        if (this._canCombo) {
            //设置下一个连击动作，计算下一个动作索引
            this._curActionIndex++;
            console.log("canCombo1 : " + this._maxIndex + "/" + this._curActionIndex + " / " + this._curIndex);

            if (this._curActionIndex >= this.getActionLengthByAnimation(this._curAnimationIndex)) {
                console.log("canCombo2 : " + this.getActionLengthByAnimation(this._curAnimationIndex) + "/" + this._curActionIndex + " / " + this._maxIndex);
                this._curActionIndex = 0;
            }
            //回调当前执行动作完成
            if (onComplate) {
                onComplate(this._curIndex, this._maxIndex);
            }
            // if (this._lastAnimation != null) {
            //     console.log("stop play 7", this._lastPlayGuid, Date.now());
            //     let aaa = this._lastAnimation;
            //     this._lastAnimation.stop();
            //     this._lastAnimation = null;
            //     console.log("check animation is playing", aaa.isPlaying);
            //     const it = setInterval(() => {
            //         console.log("check animation is playing", aaa.isPlaying);
            //         if (aaa.isPlaying == false) {
            //             clearInterval(it);
            //             console.log("animation real stop", this._lastPlayGuid, Date.now());
            //         }
            //     }, 1)
            // }
        }

        //设置不能动画也不能连击了
        this._canOper = false;
        this._canCombo = false;
        this._canCharge = false;
        this._fightIdelAniGuid = this.getCharFightIdelGuid(index);
        this._fightStanceBlendMode = this.getCharFightBlendMode(index);
        console.error("this.fightIdelAniGuid : " + this._fightIdelAniGuid);

        //设置当前要播放的动画索引
        this._curAnimationIndex = index;
        let periodInfo = this.getCurPlayActionInfo();
        if (!periodInfo) {
            this._canOper = true;
            console.error("获取不到当前动作 : " + index);
            return false;
        }

        this._lastPlayInfo = periodInfo;

        if (periodInfo.isCharge == "1") {
            this._canCharge = true;
            this._chargeStartTime = Date.now();
        }

        console.error("准备开始一段攻击 : " + periodInfo.duration);

        // if (this._fightIdelAniGuid != "") {
        //     this._stance = PlayerManagerExtension.loadStanceExtesion(this.char, this._fightIdelAniGuid, true)
        //     this._stance.blendMode = this._fightStanceBlendMode;
        //     if (!this.gameObject) {
        //         return;
        //     }
        //     this._stance.play();
        // }

        //持续时间
        let durMilSec = parseInt(periodInfo.duration);
        /** 处理战斗待机 */
        this._fightingSec = 0;
        this.char.movementEnabled = false;
        this.char.jumpEnabled = false;
        //设置前摇时间，丢失控制
        let rock = parseInt(periodInfo.frontRockLength);

        /** 计算最终前摇时间 会决定禁止操作的时间 */
        let logicFrontTime = rock;
        let moves = this.getCurPlayInfoAtType<NodeInfoMove>(NodeType.Move);
        moves.forEach(e => {
            if (e.isToPos == "1") return;
            let moveTime = parseInt(e.delayPlayTime) + parseInt(e.duration);
            if (moveTime > logicFrontTime) {
                logicFrontTime = moveTime;
            }
        })

        if (logicFrontTime > durMilSec) durMilSec = logicFrontTime;

        /** 前摇结束 */
        this.startTimeOut(() => {
            console.log("startTimeout of logicFrontTime", logicFrontTime);
            this._canOper = true;
            this._canCombo = true;
            this.char.movementEnabled = true;
            this.char.jumpEnabled = true;
            if (this._onStartCombo) {
                this._onStartCombo(durMilSec - logicFrontTime);
            }
            if (periodInfo.isAutoPlay != "0") {
                this.playAnimation(this._curAnimationIndex, this._onComplate, this._onHit, this._onStartCombo, this._onStartCharge);
                return;
            }
        }, logicFrontTime);

        /** 完成回调 */
        this.startTimeOut(() => {
            this._canCombo = false;
            this._canOper = true;
            this.char.movementEnabled = true;
            this.char.jumpEnabled = true;
            this._curActionIndex = 0;
            if (this._lastAnimation) {
                console.log("stop play 6", this._lastPlayGuid, durMilSec, Date.now());
                this._lastAnimation?.stop();
                this._lastAnimation = null;
                this._lastPlayGuid = "";
                this._fightingSec = this._constFightingSec;
            }
            if (this._onComplate) {
                this._onComplate(this._curIndex, this._maxIndex);
            }
        }, durMilSec);

        // 开始真实节点流程
        let isSync = true;

        if (WeaponData.getClinetSyncState) {
            isSync = WeaponData.getClinetSyncState();
        }
        isSync = true;
        if (isSync) {
            this.server_startPeriod(this._curAnimationIndex, this._curActionIndex, this._clientPlayerId);
        }
        this.startPeriod(this._curAnimationIndex, this._curActionIndex, true);
        return true;
    }


    /**      客户端开始一段攻击     */
    @RemoteFunction(mw.Client)
    client_startPeriod(player: mw.Player, animationIndex: number, periodIndex: number) {
        if (player == this.char.player) {
            return;
        }
        if (this.animationInfo == null) {
            console.warn("animationInfo is null, info is not replicated yet");
            return;
        }
        this.startPeriod(animationIndex, periodIndex);
    }


    /** 开始一段攻击
     * @param animationIndex 动画索引
     * @param periodIndex 动作索引
     */
    private startPeriod(animationIndex: number, periodIndex: number, isSelf: boolean = false) {
        this._curAnimationIndex = animationIndex;
        this._curActionIndex = periodIndex;

        /** 播放特效 */
        let effs = this.getCurPlayInfoAtType<NodeInfoEff>(NodeType.Eff);
        this.playAnimationEff(effs);

        /** 飞弹处理 */
        let flyNodes = this.getCurPlayInfoAtType<NodeInfoFlyEntity>(NodeType.FlyEntity);
        this.startFireNode(flyNodes, isSelf);
        /** 脱手技能处理 */
        let followNode = this.getCurPlayInfoAtType<NodeInfoThrow>(NodeType.Throw);
        this.startThrowNode(followNode, isSelf);

        /** 播放音效 */
        let audios = this.getCurPlayInfoAtType<NodeInfoAudio>(NodeType.Audio);
        this.playAudio(audios);

        if (isSelf) {
            this.setCharAutoFocus(animationIndex);
            let periodInfo = this.getCurPlayActionInfo();

            /** 动画处理 */
            let animas = this.getCurPlayInfoAtType<NodeInfoAnim>(NodeType.Animation);
            this.animasHandle(animas);

            /** 移动处理 */
            let moves = this.getCurPlayInfoAtType<NodeInfoMove>(NodeType.Move);
            this.moveHandle(moves);

            /** 控制处理 */
            let controls = this.getCurPlayInfoAtType<NodeInfoForbidden>(NodeType.Forbidden);
            this.controlHandle(controls);

            if (SystemUtil.isClient() && PlayerManagerExtension.isCharacter(this.char)) {
                let cameras = this.getCurPlayInfoAtType<NodeInfoCamera>(NodeType.Camera);
                // this.controlCamera(cameras);
            }

            /** 获取技能检测类 */
            let skillRectNodes = this.getCurPlayInfoAtType<NodeInfoSkillRect>(NodeType.SkillRect);



            /** 击打点回调 */
            if (this._onHit) {
                skillRectNodes.forEach(e => {
                    const skillRectCheck = [e];
                    let tempTime = parseInt(e.delayPlayTime);
                    if (e.delayPlayTime == "" || isNaN(tempTime)) {
                        this._onHit(e.skillIndex, this._maxIndex, SkillRectCheck.checkNodes(this.char, skillRectCheck));
                        return;
                    }
                    setTimeout(() => {
                        this._onHit(e.skillIndex, this._maxIndex, SkillRectCheck.checkNodes(this.char, skillRectCheck));
                    }, tempTime);
                })
            }

            if (periodInfo.isCharge != "0") {
                console.log("deal charge");
                new Promise((resolve: (chargeTime: number) => void, reject: (reason?: any) => void) => {
                    if (this._onStartCharge) {
                        console.log("onStartCharge")
                        this._chargeStartTime = Date.now();
                        this._onStartCharge(this._curActionIndex, this.getActionLengthByAnimation(this._curAnimationIndex) - 1, resolve);
                    }
                }).then((_chargeTime) => {
                    console.log("chargeTime", _chargeTime);
                    this.char.movementEnabled = true;
                    this.char.jumpEnabled = true;
                    this._canOper = true;
                    this._canCombo = false;
                    if (this._lastPlayInfo == null || this._chargeStartTime == null) {
                        console.error("lastPlayInfo or is null");
                        return false;
                    }
                    const chargeTime = Date.now() - this._chargeStartTime;
                    console.log("check charge Time",);
                    const tempIndex = this._curActionIndex;
                    //设置蓄力链接动作，计算下一个动作索引
                    for (let i = 0; i < this._lastPlayInfo.chargeTime.length; i++) {
                        console.log("check charge Time", i, this._lastPlayInfo.chargeTime[i])
                        if (parseInt(this._lastPlayInfo.chargeTime[i]) < 0) {
                            break;
                        }
                        else if (chargeTime >= parseInt(this._lastPlayInfo.chargeTime[i])) {
                            this._curActionIndex = i;
                        }
                        else {
                            break;
                        }
                    }
                    if (this._curActionIndex >= this.getActionLengthByAnimation(this._curAnimationIndex)) {
                        this._curActionIndex = 0;
                    }
                    console.log("after check index", this._curActionIndex);
                    if (this._curActionIndex == tempIndex) {
                        console.log("chargeTime not reach", chargeTime);
                        this.stopPlay();
                        return;
                    }
                    this.playAnimation(this._curAnimationIndex, this._onComplate, this._onHit, this._onStartCombo, this._onStartCharge);
                });
                return;
            }
        }
    }

    /** 获取动画总数 */
    public getAnimationCount(): number {
        return this.animationInfo.length;
    }

    /**
     * 停止播放
     */
    public stopPlay() {

        this._canCombo = false;
        this._canOper = true;
        this._curActionIndex = 0;
        this.stopAllTimer();
        if (this._lastAnimation) {
            this._lastAnimation.stop();
            console.log("stop play 2", this._lastPlayGuid)
            this._lastAnimation = null;
        }
        //PlayerManagerExtesion.rpcStopAnimation(this.char, this._lastPlayGuid)
        if (this._stance) this._stance.stop();
        //this._lastPlayGuid = "";

    }

    /**
     * 获取动画中攻击分段的总数
     * @param animationIndex 动画索引
     * @returns -1为传入参数有误
     */
    public getActionLengthByAnimation(animationIndex: number): number {
        if (!this.checkIndex(animationIndex)) {
            return -1;
        }

        let res = 0;
        let aniInfo = this.animationInfo[animationIndex];
        aniInfo.infos.forEach(e => {
            if (e.type == NodeType.Period.toString()) res++;
        })
        return res;
    }

    /**
     * 穿戴手部武器装备
     * @param equipGuid 装备guid
     * @param isRight 是否右手(默认:是)
     */
    public equipWeapon_Hand(equipGuid: string, isRight: boolean = true) {
        this.server_EquipWeapon(equipGuid, isRight);
    }

    /**
     * 取消手部武器穿戴
     * @param isRight 是否右手(默认:是)
     */
    public unequipWeapon_Hand(isRight: boolean = true) {
        this.server_EquipWeapon("", isRight);
    }

    /**
     * 设置从战斗待机切换到待机需要等待的时间
     * @param sec 
     */
    public setFightIdelChangeIdelWaitSec(sec: number) {
        this._constFightingSec = sec;
    }

    /**
     * 获取战斗待机动画guid
     * @param aniamtionIndex 
     */
    private getCharFightIdelGuid(animationIndex: number): string {
        if (!this.checkIndex(animationIndex)) {
            return "";
        }
        let aniInfo = this.animationInfo[animationIndex];
        return aniInfo.charFightIdelAniId;
    }

    private getCharFightBlendMode(animationIndex: number): number {
        if (!this.checkIndex(animationIndex)) {
            return 2;
        }
        let aniInfo = this.animationInfo[animationIndex];
        return parseInt(aniInfo.charFightIdelSlot);
    }

    /**
     * 设置自动锁定朝向
     * @param animationIndex 
     * @returns 
     */
    private setCharAutoFocus(animationIndex: number) {
        console.log("setCharAutoFocus", animationIndex)
        if (!this.checkIndex(animationIndex)) {
            return;
        }
        let aniInfo = this.animationInfo[animationIndex];
        if (parseInt(aniInfo.autoFocus) == 0) {
            return;
        }
        const radius = parseInt(aniInfo.autoFocusRadius);
        let res = SkillRectCheck.checkRadius(this.char, this.char.worldTransform.position, radius, 150);
        res = SkillRectCheck.checkAngle(this.char.worldTransform.position, this.char.worldTransform.getForwardVector(), parseInt(aniInfo.autoFocusAngle), res);
        res = res.filter(e => e.gameObjectId != this.char.gameObjectId).filter(WeaponData.focusFilter);
        if (res.length <= 0) {
            return;
        }
        console.log("setCharAutoFocus res length", res.length);
        const forward = this.char.worldTransform.getForwardVector().clone();
        const curloc = this.char.worldTransform.position.clone();
        const TempVecDist = new Vector();
        const TempVecNormal = new Vector();
        // const distFactor = parseInt(aniInfo.autoFocusDistFactor ? aniInfo.autoFocusDistFactor : "1");
        const distFactor = 0;

        let weight = 0;

        let candidate: GameObject = null;
        res.forEach(e => {
            const cos = Vector.dot(forward, Vector.normalize(Vector.subtract(e.worldTransform.position, curloc, TempVecDist), TempVecNormal));
            const tempWeight = (cos + 1) / 2 * (1 - distFactor) + (radius - TempVecDist.length) / radius * distFactor;
            if (weight < tempWeight) {
                weight = tempWeight;
                candidate = e;
            }
        });
        if (candidate) {
            setTimeout(() => {
                this.char.lookAt(candidate.worldTransform.position);
            }, 1);
        }
    }

    /** 客户端绑定角色id改变 */
    private client_OnChangeCharGuid() {
        let handle = setInterval(async () => {
            let char = await GameObject.asyncFindGameObjectById(this.charGuid);
            if (char) {
                await char.asyncReady();
                clearInterval(handle);
                if (PlayerManagerExtension.isCharacter(char)) {
                    this.char = char as mw.Character;
                } else {
                    this.char = char as mw.Character;
                }
            }
        }, 100);
    }

    /** 服务器通知客户端更换装备 */
    private client_OnChangeEquipWeaponRight() {

        if (this._clientEquipGo_Right != null) {
            this._clientEquipGo_Right.parent = null;
            this._clientEquipGo_Right.destroy();
            this._clientEquipGo_Right = null;
        }

        if (this.equipRightWeaponGuid != "") {
            const handle = setInterval(async () => {
                if (this.char != null) {
                    clearInterval(handle);
                    await this.char.asyncReady();
                    const weaponGo = await LoadMgr.asyncSpawn(this.equipRightWeaponGuid, { replicates: false });
                    if (!weaponGo) {
                        console.log("TypeError: client_OnChangeEquipWeaponRight 武器不存在 : " + this.equipRightWeaponGuid);
                        return;
                    }
                    await weaponGo.asyncReady();
                    if (this._clientEquipGo_Right != null) {
                        this._clientEquipGo_Right.parent = null;
                        this._clientEquipGo_Right.destroy();
                        this._clientEquipGo_Right = null;
                    }
                    this._clientEquipGo_Right = weaponGo;
                    this.char.attachToSlot(this._clientEquipGo_Right, mw.HumanoidSlotType.RightHand);
                    this._clientEquipGo_Right.setCollision(mw.CollisionStatus.Off, true);
                }
            }, 100)
        }
    }

    /** 服务器通知客户端更换装备 */
    private client_OnChangeEquipWeaponLeft() {

        if (this._clientEquipGo_Left != null) {
            this._clientEquipGo_Left.parent = null;
            this._clientEquipGo_Left.destroy();
            this._clientEquipGo_Left = null;
        }
        if (this.equipLeftWeaponGuid != "") {
            const handle = setInterval(async () => {
                if (this.char != null) {
                    clearInterval(handle);
                    await this.char.asyncReady();
                    const weaponGo = await LoadMgr.asyncSpawn(this.equipLeftWeaponGuid, { replicates: false });
                    if (!weaponGo) {
                        console.error("TypeError: client_OnChangeEquipWeaponLeft 武器不存在 : " + this.equipLeftWeaponGuid);
                        return;
                    }
                    await weaponGo.asyncReady();
                    if (this._clientEquipGo_Left != null) {
                        this._clientEquipGo_Left.parent = null;
                        this._clientEquipGo_Left.destroy();
                        this._clientEquipGo_Left = null;
                    }
                    this._clientEquipGo_Left = weaponGo;
                    this.char.attachToSlot(this._clientEquipGo_Left, mw.HumanoidSlotType.LeftHand);
                    this._clientEquipGo_Left.setCollision(mw.CollisionStatus.Off, true);
                }
            }, 100)
        }
    }

    /**
     * 客户都安通过参数设置武器JSON
     * @param params 
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    protected client_setWeaponJsonByParams(...params: number[]) {
        console.log("params rewrite" + params)
        // const JSON = WeaponData.getWeaponJson(...params);
        this.reWriteAnimationJson(params);
    }

    /**
    * 播放特效
    * @param guid 特效id
    * @param slotIndex 插槽位置 -1 则在角色原地播放
    * @param offsetPos 偏移坐标
    * @param offsetRotate 偏移旋转
    * @param offsetScale 偏移缩放
    */
    protected async client_PlayEffect(guid: string, stopTime: number, loop: boolean, slotIndex: number,
        offsetPos: mw.Vector, offsetRotate: mw.Rotation, offsetScale: mw.Vector, colorHex: string) {
        let eff = await AssetsManager.getGameObject<mw.Effect>(guid, false);
        //console.log("client_PlayEffect", offsetPos, offsetRotate, offsetScale)
        eff.stop();
        eff.parent = null;
        if (slotIndex == -1) {
            eff.worldTransform.position = (new mw.Vector(offsetPos.x, offsetPos.y, offsetPos.z));
            eff.worldTransform.rotation = (new mw.Rotation(offsetRotate.x, offsetRotate.y, offsetRotate.z));
            eff.worldTransform.scale = (new mw.Vector(offsetScale.x, offsetScale.y, offsetScale.z));
            eff.loop = loop;
            eff.maskcolor = (mw.LinearColor.colorHexToLinearColor("FFFFFFFF"));
            if (colorHex && colorHex != "") {
                eff.maskcolor = (mw.LinearColor.colorHexToLinearColor(colorHex));
            }
            eff.play();
            setTimeout(() => {
                AssetsManager.releaseGameObject2Pool(eff);
            }, stopTime);
        } else {
            this.char.attachToSlot(eff, slotIndex);
            eff.localTransform.position = (new mw.Vector(offsetPos.x, offsetPos.y, offsetPos.z));
            eff.localTransform.rotation = (new mw.Rotation(offsetRotate.x, offsetRotate.y, offsetRotate.z));
            eff.localTransform.scale = (new mw.Vector(offsetScale.x, offsetScale.y, offsetScale.z));
            eff.loop = loop;
            eff.maskcolor = (mw.LinearColor.colorHexToLinearColor("FFFFFFFF"));
            if (colorHex && colorHex != "") {
                eff.maskcolor = (mw.LinearColor.colorHexToLinearColor(colorHex));
            }
            eff.play();
            setTimeout(() => {
                AssetsManager.releaseGameObject2Pool(eff);
            }, stopTime);
        }
    }

    /**
     * 发射飞弹
     * @param fireNode 
     */
    private startFireNode(fireNode: NodeInfoFlyEntity[], isSelf: boolean) {
        fireNode.forEach(info => {
            const playInfo = info;
            this.startTimeOut(() => {
                const rotation = new mw.Rotation(
                    parseInt(playInfo.offsetRotation[0]), parseInt(playInfo.offsetRotation[1]), parseInt(playInfo.offsetRotation[2]));
                let dir = rotation.rotateVector(this.char.worldTransform.getForwardVector().normalize());
                let startPos = this.char.worldTransform.position.clone();
                let offsetPos = new mw.Vector(
                    parseInt(playInfo.offsetPos[0]), parseInt(playInfo.offsetPos[1]), parseInt(playInfo.offsetPos[2]));
                startPos = startPos.clone().add(dir.clone().multiply(offsetPos.x)).add(this.char.worldTransform.getRightVector().clone().normalize().multiply(offsetPos.y)).add(this.char.worldTransform.getUpVector().clone().normalize().multiply(offsetPos.z));
                const scale = new mw.Vector(
                    parseInt(playInfo.offsetScale[0]), parseInt(playInfo.offsetScale[1]), parseInt(playInfo.offsetScale[2]));
                let speed = parseInt(playInfo.moveSpeed);
                let fireNodeId = this.gameObject.gameObjectId + "~" + this.curFireNodeGenId++;
                this.client_createFireNode(parseInt(playInfo.skillIndex), fireNodeId, startPos, dir, speed, playInfo.guid, playInfo.colorHex, playInfo.moveDistance, scale, parseInt(playInfo.axis), parseInt(playInfo.rotationSpeed), isSelf);
            }, parseInt(playInfo.delayPlayTime));
        })
    }

    private _cacheFlyNode: MapEx.MapExClass<mw.GameObject> = {};

    /**
     * 客户端全局广播发射飞弹
     * @param fireNodeId 
     * @param startPos 
     * @param dir 
     * @param speed 
     */
    protected async client_createFireNode(skillIndex: number, fireNodeId: string, startPos: mw.Vector, dir: mw.Vector,
        speed: number, guid: string, colorHex: string, flyMoveDis: string, scale: mw.Vector, axis: number, rotateSpeed: number, isSelf: boolean) {
        console.log("client_createFireNode", fireNodeId);
        let go = await LoadMgr.asyncSpawn(guid, { replicates: false });
        if (go instanceof mw.Effect) {
            let eff = go as mw.Effect;

            eff.maskcolor = (mw.LinearColor.colorHexToLinearColor("FFFFFFFF"));
            if (colorHex && colorHex != "") {
                eff.maskcolor = (mw.LinearColor.colorHexToLinearColor(colorHex));
            }

            eff.loop = true;
            eff.loopCount = 0;
            eff.play();
        }
        if (go) {
            MapEx.set(this._cacheFlyNode, fireNodeId, go);
            let dirV3 = new mw.Vector(dir.x, dir.y, dir.z);
            let startV3 = new mw.Vector(startPos.x, startPos.y, startPos.z);
            go.worldTransform.position = startV3.clone();
            go.worldTransform.rotation = dirV3.toRotation();
            go.worldTransform.scale = scale;
            let rotV3 = go.worldTransform.rotation.clone();
            let trueAxis = axis == 0 ? "x" : (axis == 1 ? "y" : "z");
            let lastTime = Date.now();
            let maxDis = 3000;
            if (flyMoveDis != "" && flyMoveDis != "0") maxDis = parseInt(flyMoveDis);
            if (isNaN(maxDis) && maxDis <= 0) maxDis = 3000;
            const handle = setInterval(() => {
                if (!go.worldTransform.position || !go.worldTransform.position.clone()) {
                    clearInterval(handle);
                    return;
                }
                let curTime = Date.now();
                let dt = (curTime - lastTime) / 1000;
                lastTime = curTime;

                let startLocation = go.worldTransform.position.clone();
                let endLocation = go.worldTransform.position.clone().add(dirV3.clone().multiply(speed * dt));

                rotV3[trueAxis] = rotV3[trueAxis] + rotateSpeed * dt;
                if (isSelf) {
                    let res = QueryUtil.lineTrace(startLocation, endLocation, true, SkillRectCheck.showRect)
                    res = res.filter(e => {
                        return (e instanceof mw.Pawn) && e.gameObject != go && e.gameObject.gameObjectId != this.char.gameObjectId
                    })
                    if (res.length > 0) {
                        console.error("攻击到对象数量 : " + res.length);
                        if (this._onHit) {
                            let resObj = [];
                            res.forEach(e => {
                                resObj.push(e.gameObject);
                            })
                            this._onHit(skillIndex.toString(), this._maxIndex, resObj);
                        }
                        console.log("client_UnFireNode", go.gameObjectId)
                        this.client_UnFireNode(go.gameObjectId);
                        clearInterval(handle);
                        return;
                    }
                }
                go.worldTransform.position = endLocation;
                go.worldTransform.rotation = rotV3;
                if (mw.Vector.distance(startV3, go.worldTransform.position) >= maxDis) {
                    console.log("client_UnFireNode", go.gameObjectId)
                    this.client_UnFireNode(go.gameObjectId);
                    clearInterval(handle);
                    return;
                }
            }, 5);
        }
    }

    private _cacheThrowNode: MapEx.MapExClass<ThrowGo> = {};

    startThrowNode(followNode: NodeInfoThrow[], isSelf: boolean) {
        followNode.forEach(info => {
            const playInfo = info;
            this.startTimeOut(() => {
                const rotation = new mw.Rotation(
                    parseInt(playInfo.offsetRotation[0]), parseInt(playInfo.offsetRotation[1]), parseInt(playInfo.offsetRotation[2]));
                let dir = rotation.rotateVector(this.char.worldTransform.getForwardVector().normalize());
                let startPos = this.char.worldTransform.position.clone();
                startPos = startPos.clone();
                const scale = new mw.Vector(
                    parseInt(playInfo.offsetScale[0]), parseInt(playInfo.offsetScale[1]), parseInt(playInfo.offsetScale[2]));
                let speed = parseInt(playInfo.moveSpeed);
                let fireNodeId = this.gameObject.gameObjectId + "~" + this.curFollowNodeGenId++;
                let maxDis = Math.min(3000, parseInt(playInfo.moveDistance));
                this.client_createThrowNode(parseInt(playInfo.skillIndex), fireNodeId, startPos, dir, speed, playInfo.guid, playInfo.colorHex, maxDis, scale, parseInt(playInfo.skillRadius), parseInt(playInfo.frequency), parseInt(playInfo.duration), isSelf);
            }, parseInt(playInfo.delayPlayTime));
        })
    }

    /** 创建跟随节点 */
    async client_createThrowNode(skillIndex: number, throwNodeId: string, startPos: mw.Vector, dir: mw.Vector,
        speed: number, guid: string, colorHex: string, flyMoveDis: number, scale: mw.Vector, skillRadius: number, frequency: number, duration: number, isSelf: boolean) {
        let throwGuids = throwNodeId.split("~");
        console.log("client_createFireNode", throwGuids);
        let go = await LoadMgr.asyncSpawn(guid, { replicates: false });
        if (go instanceof mw.Effect) {
            let eff = go as mw.Effect;
            eff.maskcolor = (mw.LinearColor.colorHexToLinearColor("FFFFFFFF"));
            if (colorHex && colorHex != "") {
                eff.maskcolor = (mw.LinearColor.colorHexToLinearColor(colorHex));
            }
            eff.loop = true;
            eff.loopCount = 0;
            eff.play();
        }
        if (go) {
            let throwGo = new ThrowGo(throwNodeId, go, duration / 1000, frequency / 1000, speed == 0 ? 0 : flyMoveDis / speed);
            MapEx.set(this._cacheThrowNode, throwNodeId, throwGo);
            let dirV3 = new mw.Vector(dir.x, dir.y, dir.z);
            let startV3 = new mw.Vector(startPos.x, startPos.y, startPos.z);
            go.worldTransform.position = startV3.clone();
            go.worldTransform.rotation = dirV3.toRotation();
            go.worldTransform.scale = scale;
            let lastTime = Date.now();

            throwGo.intervalHandle = setInterval(() => {

                let curTime = Date.now();
                let dt = (curTime - lastTime) / 1000;
                console.log("throwGo interval", curTime, dt, throwGo.time, throwGo.checkTimer, throwGo.flyTimer)
                lastTime = curTime;

                if (throwGo.flyTimer > 0) {
                    let endLocation = throwGo.go.worldTransform.position.clone().add(dirV3.clone().multiply(speed * dt));
                    go.worldTransform.position = endLocation;
                    throwGo.flyTimer -= dt;
                    return;
                }
                throwGo.time -= dt;
                if (throwGo.time <= 0) {
                    console.log("client_UnThrowNode", throwGo.id)
                    this.client_UnThrowNode(throwGo.id);
                    return;
                }
                if (isSelf) {
                    throwGo.checkTimer -= dt;
                    if (throwGo.checkTimer <= 0) {
                        throwGo.checkTimer = frequency;
                        let res = SkillRectCheck.checkRadius(this.char, throwGo.go.worldTransform.position, skillRadius, 200);
                        res = res.filter(e => { return e != throwGo.go && e.gameObjectId != this.char.gameObjectId })
                        if (res.length > 0) {
                            console.error("投掷物攻击到对象数量 : " + res.length);
                            if (this._onHit) {
                                this._onHit(skillIndex.toString(), this._maxIndex, res);
                            }
                            return;
                        }
                    }
                }
            }, 5);
        }
    }


    /**
     * 销毁飞弹
     * @param fireNodeId 
     */
    protected async client_UnFireNode(gameObjectId: string) {

        let go: mw.GameObject = null;
        let key;
        MapEx.forEach(this._cacheFlyNode, (k, e) => {
            if (e.gameObjectId == gameObjectId) {
                key = k;
                go = e;
            }
        })
        if (go) {
            MapEx.del(this._cacheFlyNode, key);
            go?.destroy();
        }
    }

    protected async client_UnThrowNode(throwId: string) {
        let throwGo: ThrowGo = null;
        throwGo = MapEx.get(this._cacheThrowNode, throwId);
        if (throwGo) {
            MapEx.del(this._cacheThrowNode, throwId);
            throwGo.go?.destroy();
            throwGo.go = null;
            if (throwGo.intervalHandle) {
                clearInterval(throwGo.intervalHandle);
                throwGo.intervalHandle = null;
            }
        }
    }

    /** 移动处理 */
    private moveHandle(moveInfo: NodeInfoMove[]) {

        moveInfo.forEach(e => {

            /** 移动时间 */
            let dur = parseInt(e.duration);
            /** 移动距离 */
            let moveDis = parseInt(e.moveDistance);
            let moveRot: Rotation = null;
            if (e.moveRotation) {
                let split = e.moveRotation;
                moveRot = new Rotation(parseFloat(split[0]), parseFloat(split[1]), parseFloat(split[2]));
            }
            /** 移动类型 */
            let moveType = parseInt(e.isToPos);

            /** 移动方向 */
            let moveDirAll: Vector = null;
            moveDirAll = new Vector(parseFloat(e.moveDir[0]), parseFloat(e.moveDir[1]), parseFloat(e.moveDir[2])).normalize();
            /** 移动延迟 */
            let moveDelay = parseInt(e.delayPlayTime);
            this.startTimeOut(() => {

                if (moveRot) {
                    this.characterLerpRot(this.char.gameObjectId, this.char.localTransform.rotation, moveRot, dur);
                }
                /** 处理瞬移 */
                if (moveType == 1) {
                    let charPos = this.char.worldTransform.position;
                    let toPos = charPos;
                    let curMoveDis: Vector = null;
                    let offset = this.char.worldTransform.getForwardVector().toRotation();
                    curMoveDis = offset.rotateVector(moveDirAll).multiply(moveDis);
                    toPos = toPos.clone().add(curMoveDis);
                    let rate = 1;
                    /** 碰撞检测 因为瞬移长度不定，所以需要多条射线进行检测 最多5条 */
                    while (true) {
                        if (rate <= 0) {
                            return;
                        }
                        let res = QueryUtil.lineTrace(charPos, toPos, true, SkillRectCheck.showRect);
                        res = res.filter(e => { return !(e.gameObject instanceof mw.Trigger) })
                        if (res.findIndex(e => { return e.gameObject == this.char }) != -1 && res.length == 1) {
                            break;
                        }
                        if (res.length > 0) {
                            rate -= 0.2;
                            toPos = charPos.clone().add(curMoveDis.multiply(rate));
                        } else {
                            break;
                        }
                    }
                    this.char.worldTransform.position = (toPos);
                    return;
                }

                //非瞬移
                let charPos = this.char.worldTransform.position.clone();
                let toPos = charPos;
                let curMoveDis: Vector = null;
                let offset = this.char.worldTransform.getForwardVector().toRotation();
                curMoveDis = offset.rotateVector(moveDirAll).multiply(moveDis);
                toPos = toPos.clone().add(curMoveDis);
                this.characterLerpMove(this.char.gameObjectId, charPos, toPos, dur, moveType == -1);
            }, moveDelay);
        })
    }

    /** 控制处理 */
    controlHandle(controlInfos: NodeInfoForbidden[]) {
        let period = this.getCurPlayActionInfo();
        let totalTime = parseInt(period.duration);
        controlInfos.forEach(e => {
            this.startTimeOut(() => {
                switch (e.slotIndex) {
                    case "0":
                        if (this._onChangeControl) {
                            this._onChangeControl(true);
                        }
                        this._onChangeControl(true);
                        break;
                    case "1":
                        this.char.movementEnabled = true;
                        break;
                    case "2":
                        this.char.jumpEnabled = true;
                        break;
                }
                if (parseInt(e.delayPlayTime) + parseInt(e.duration) >= totalTime) {
                    return;
                }
                this.startTimeOut(() => {
                    switch (e.slotIndex) {
                        case "0":
                            if (this._onChangeControl) {
                                this._onChangeControl(false);
                            }
                            break;
                        case "1":
                            this.char.movementEnabled = false;
                            break;
                        case "2":
                            this.char.jumpEnabled = false;
                            break;
                    }
                }, parseInt(e.duration))
            }, parseInt(e.delayPlayTime))
        })
    }

    // controlCamera(cameraInfos: NodeInfoCamera[]) {
    //     const cameraSystem = Camera.currentCamera;
    //     this._lastCameraData = ModifiedCameraSystem.getCurrentSettings();
    //     cameraInfos.forEach(e => {
    //         this.startTimeOut(() => {
    //             const duration = parseInt(e.duration);
    //             // 处理震屏
    //             if (e.presetIndex == "2") {
    //                 const amplitude = parseFloat(e.shake[1]);
    //                 const frequency = parseFloat(e.shake[2]);
    //                 let shakeData = ModifiedCameraSystem.getDefaultCameraShakeData();
    //                 switch (e.shake[0]) {
    //                     case "0":
    //                         shakeData.locXOscillation.amplitude = amplitude;
    //                         shakeData.locXOscillation.frequency = frequency;
    //                         break;
    //                     case "1":
    //                         shakeData.locYOscillation.amplitude = amplitude;
    //                         shakeData.locYOscillation.frequency = frequency;
    //                         break;
    //                     case "2":
    //                         shakeData.locZOscillation.amplitude = amplitude;
    //                         shakeData.locZOscillation.frequency = frequency;
    //                         break;
    //                     case "3":
    //                         shakeData.rotPitchOscillation.amplitude = amplitude;
    //                         shakeData.rotPitchOscillation.frequency = frequency;
    //                         break;
    //                     case "4":
    //                         shakeData.rotYawOscillation.amplitude = amplitude;
    //                         shakeData.rotYawOscillation.frequency = frequency;
    //                         break;
    //                     case "5":
    //                         shakeData.rotRollOscillation.amplitude = amplitude;
    //                         shakeData.rotRollOscillation.frequency = frequency;
    //                         break;
    //                     default: break;
    //                 }
    //                 ModifiedCameraSystem.startCameraShake(shakeData, duration / 1000);
    //                 return;
    //             }
    //             // 处理镜头偏移
    //             const offsetLength = e.presetIndex == "1" ? -parseInt(e.offsetLength) : parseInt(e.offsetLength);
    //             const startLength = this._lastCameraData.targetArmLength;
    //             const targetLength = this._lastCameraData.targetArmLength + offsetLength;
    //             const startFov = this._lastCameraData.cameraFOV;
    //             const targetFov = startFov + parseInt(e.offsetFov);
    //             const lengthPath = [startLength, (startLength + targetLength) / 2, targetLength, targetLength, startLength];
    //             const FovPath = [startFov, (startFov + targetFov) / 2, targetFov, targetFov, startFov];
    //             const tween = new mw.Tween({ length: startLength, fov: startFov })
    //                 .to({ length: lengthPath, fov: FovPath }, duration)
    //                 .interpolation(TweenUtil.Interpolation.Bezier)
    //                 .onUpdate((v) => {
    //                     cameraSystem.springArm.length = (v.length);
    //                     cameraSystem.fov = (v.fov);
    //                 })
    //                 .onComplete(() => {
    //                     ModifiedCameraSystem.applySettings(this._lastCameraData);
    //                 })
    //                 .start();
    //         }, parseInt(e.delayPlayTime))
    //     })
    // }

    /** 动画处理 */
    private animasHandle(animInfos: NodeInfoAnim[]) {
        animInfos.forEach(info => {
            console.log("play anim", info.guid, info.delayPlayTime, info.duration, info.loop, info.rate, info.slotIndex);
            const animDelay = parseInt(info.delayPlayTime);
            this.startTimeOut(() => {
                // if (this._lastAnimation) {
                //     this._lastAnimation?.stop();
                //     console.log("stop play 1", this._lastPlayGuid);
                //     this._lastPlayGuid = "";
                //     this._lastAnimation = null;
                // }
                const anim = PlayerManagerExtension.loadAnimationExtesion(this.char, info.guid)
                const rate = parseFloat(info.rate);
                const loop = parseInt(info.loop) == 1 ? 233 : 1;
                let duration = parseInt(info.duration);
                // if (loop == 1) {
                //     if (anim.length / rate * 1000 < duration) {
                //         duration = anim.length / rate * 1000;
                //     }
                // }
                anim.speed = rate;
                anim.loop = loop;
                console.log("play anim loop", loop)
                // anim = parseInt(infoIndex);
                anim.play();

                this._lastPlayGuid = info.guid;
                this._lastAnimation = anim;
                console.log("start animation", info.guid, duration, Date.now());
                this.startTimeOut(() => {
                    if (this._lastAnimation) {
                        console.log("stop play 4")
                        const res = this._lastAnimation.stop();
                        console.log("stop play 4", this._lastPlayGuid, res)
                        this._lastPlayGuid = "";
                        this._lastAnimation = null;
                        this._fightingSec = this._constFightingSec;
                    }
                }, duration)
            }, animDelay)
        })
    }

    /**
     * 播放音效
     * @param audios 
     * @returns 
     */
    private playAudio(audios: NodeInfoAudio[]) {
        if (mw.SystemUtil.isServer()) return;
        audios.forEach((e) => {
            this.startTimeOut(async () => {
                let audioObj = await LoadMgr.asyncSpawn<mw.Sound>(e.guid, { replicates: false });
                if (audioObj) {
                    let audio = audioObj as mw.Sound;
                    audio.stop();
                    audio.isUISound = false;
                    audio.isLoop = false;
                    audio.play();
                    if (e.stopTime != "" && e.stopTime != "0") {
                        let timerDelay = parseInt(e.stopTime);
                        setTimeout(() => {
                            if (audio) {
                                audio.stop();
                                audio.destroy();
                            }
                        }, timerDelay);
                    } else {
                        audio.onFinish.add(() => {
                            audio.destroy();
                        })
                    }
                }
            }, parseInt(e.delayPlayTime));
        })
    }

    /** 播放特效 */
    private playAnimationEff(effs: NodeInfoEff[]) {

        if (mw.SystemUtil.isServer()) return;
        //console.log("playAnimationEff")
        effs.forEach(e => {
            // console.log("playAnimationEff", JSON.stringify(e))
            setTimeout(async () => {
                let offsetPos = new mw.Vector(parseFloat(e.offsetPos[0]), parseFloat(e.offsetPos[1]),
                    parseFloat(e.offsetPos[2]));
                let offsetRotate = new mw.Rotation(parseFloat(e.offsetRotation[0]), parseFloat(e.offsetRotation[1]),
                    parseFloat(e.offsetRotation[2]));
                let offsetScale = new mw.Vector(parseFloat(e.offsetScale[0]), parseFloat(e.offsetScale[1]),
                    parseFloat(e.offsetScale[2]));

                let slotIndex = parseInt(e.slotIndex);
                if (slotIndex <= -1) {
                    offsetRotate = this.char.worldTransform.getForwardVector().toRotation().clone().add(new mw.Rotation(offsetRotate.x,
                        offsetRotate.y, offsetRotate.z));
                    let forward = this.char.worldTransform.getForwardVector().normalized;
                    let right = this.char.worldTransform.getRightVector().normalized;
                    offsetPos = this.char.worldTransform.position.clone().add(
                        forward.multiply(offsetPos.x).add(
                            right.multiply(offsetPos.y)
                        ).add(
                            mw.Vector.up.multiply(offsetPos.z)
                        )
                    );
                    if (slotIndex == -2) {
                        offsetPos = offsetPos.clone().subtract(mw.Vector.up.multiply(this.char.collisionExtent.z / 2));
                    }
                    if (this._syncEff) {
                        this.client_PlayEffect(e.guid, parseInt(e.stopTime), parseInt(e.loop) == 1, slotIndex, offsetPos, offsetRotate, offsetScale, e.colorHex);
                    }
                } else {
                    if (this.char.player == null) return;
                    if (this._syncEff) {
                        this.client_PlayEffect(e.guid, parseInt(e.stopTime), parseInt(e.loop) == 1, slotIndex, offsetPos, offsetRotate, offsetScale, e.colorHex);
                    }
                }
            }, parseInt(e.delayPlayTime));
        })
    }

    /**
     * 启动一个定时器
     * @param callback 回调
     * @param milSec 延迟毫秒
     */
    private startTimeOut(callback: () => void, milSec: number) {
        if (milSec <= 0) {
            callback();
            return;
        }
        let info: TimeOutInfo = null;
        if (this._timeOutPool.length > 0) {
            info = this._timeOutPool.pop();
        }
        else {
            info = new TimeOutInfo();
        }
        info.callBack = callback;
        info.delay = milSec / 1000;
        info.delay = Math.max(0.001, info.delay);
        this.allTimer.push(info);
    }

    /** 获取当前播放的action */
    private getCurPlayActionInfo(): NodeInfoPeriod {
        let info = this.animationInfo[this._curAnimationIndex];
        let animationIndex = 0;
        for (let i = 0; i < info.infos.length; i++) {

            let e = info.infos[i];
            if (e instanceof NodeInfoPeriod) {
                if (animationIndex == this._curActionIndex) {
                    return e;
                }
                animationIndex++;
            }

        }
        return null;
    }

    /**
     * 获取当前要处理的数据根据指定类型
     * @returns 
     */
    private getCurPlayInfoAtType<T extends NodeInfoBase>(type: NodeType): T[] {

        let res = [];
        if (this._curAnimationIndex >= this.animationInfo.length) return res;
        let info = this.animationInfo[this._curAnimationIndex];
        if (!info || !info.infos) {
            console.error("动画数据错误", this.animationJsons);
            return res;
        }
        let periodIndex = -1;

        for (let i = 0; i < info.infos.length; i++) {

            let e = info.infos[i];


            if (e.type == NodeType.Period.toString()) {
                periodIndex++;
            }

            if (this._curActionIndex == periodIndex) {
                if (e.type == type.toString()) {
                    res.push(e);
                }
            }

            if (this._curActionIndex < periodIndex) {
                break;
            }
        }
        return res;
    }

    /** 检查动画索引 */
    private checkIndex(index: number): boolean {
        if (index < 0 || index >= this.animationInfo.length) {
            return false;
        }
        return true;
    }

    onStart() {

        super.onStart();
        if (mw.SystemUtil.isClient()) {
            Player.asyncGetLocalPlayer().then(player => {
                this._clientPlayerId = player.playerId;
            })
        }
    }

    onUpdate(dt: number) {

        super.onUpdate(dt);

        for (let index = 0; index < this.allTimer.length; index++) {
            const element = this.allTimer[index];
            if (element.delay <= 0) {
                this._timeOutPool.push(element);
                this.allTimer.splice(index, 1)
                index--;
            }
        }
        this.allTimer.forEach(e => {
            if (e.delay <= 0) {
                return;
            }
            e.delay -= dt;
            if (e.delay <= 0) {
                e.callBack();
            }
        })

        if (mw.SystemUtil.isClient()) {

            if (this._fightingSec > 0)
                this._fightingSec -= dt;
            if (this._canOper && this._canCombo) {
                /** 角色在移动 */
                if (this.char.isMoving && (this._lastPlayGuid != "" || this._fightIdelAniGuid != "")) {
                    //console.error("停止动画", this._lastPlayGuid, this._fightIdelAniGuid)
                    if (this._lastAnimation && this._lastAnimation.slot != 1) {
                        console.log("stop play 3", this._lastPlayGuid)
                        this._lastAnimation?.stop();
                        this._lastAnimation = null;
                        this._lastPlayGuid = "";
                    }
                    if (this._stance && this._stance.blendMode != 0) {
                        this._stance.stop();
                    }
                }
            }
            else if (this.char != null && this._fightIdelAniGuid != "") {
                if (this._fightingSec <= 0 || (this.char.isMoving && !this.char.isJumping)) {
                    if (this._lastPlayGuid == this._fightIdelAniGuid) {
                        console.log("moving:", this.char.isMoving + "jumping:" + this.char.isJumping + "fightSecond:" + this._fightingSec)
                        if (this._lastAnimation && this._lastAnimation.slot != 1) {
                            console.error("开始移动 停止战斗动画")
                            this._lastAnimation?.stop();
                            console.log("stop play 5", this._lastPlayGuid)
                            this._lastAnimation = null;
                            this._lastPlayGuid = "";

                        }
                        if (this._stance) {
                            this._stance.stop();
                        }
                        this._fightIdelAniGuid = "";
                    }
                    return;
                }

                if (this._fightingSec > 0 && this._fightIdelAniGuid != "") {
                    if (this._lastPlayGuid == "") {
                        console.error("播放战斗姿态")
                        if (this._stance)
                            this._stance.play();
                        this._lastPlayGuid = this._fightIdelAniGuid;
                    }
                }
            }
        }
    }
}

