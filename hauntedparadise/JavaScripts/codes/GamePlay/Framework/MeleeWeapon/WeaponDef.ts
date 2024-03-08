import { AnimationInfo } from "./AnmationInfo";
import { SkillRectCheck } from "./SkillRectCheck";


export class TimeOutInfo {
    callBack: () => void;
    delay: number;
}

/** 冷兵器预定义类 */
export abstract class WeaponPreDefine extends mw.Script {

    /** 所有需要更新的回调 */
    protected allUpdateCallback: ((dt: number) => boolean)[] = [];

    /** 客户端设置武器Json通过对应参数 */
    protected abstract client_setWeaponJsonByParams(...params: any[]);

    /** 服务器设置武器Json通过对应参数 */
    protected abstract server_setWeaponJsonByParams(...params: any[]);

    protected abstract client_startPeriod(player: mw.Player, animationIndex: number, periodIndex: number);

    protected abstract server_startPeriod(animationIndex: number, periodIndex: number, launcherPlayerId: number, playerIds?: number[]);

    /** 客户端播放特效 */
    protected abstract client_PlayEffect(guid: string, stopTime: number, loop: boolean, slotIndex: number,
        offsetPos: mw.Vector, offsetRotate: mw.Rotation, offsetScale: mw.Vector, colorHex: string)

    /** 服务器停止所有时间 */
    protected abstract server_StopAllTimer();

    /** 服务器设置指定对象坐标 */
    //protected abstract server_SetCharPos(guid: string, pos: mw.Vector);

    /** 服务器设置对象位移到指定位置 */
    //protected abstract server_SetCharToPos(guid: string, startPos: mw.Vector, pos: mw.Vector, time: number)

    // /** 服务器播放特效中继函数 */
    // protected abstract server_PlayEffectProxy(guid: string, stopTime: number, slotIndex: number,
    //     offsetPos: mw.Vector, offsetRotate: mw.Rotation, offsetScale: mw.Vector, colorHex: string)

    // /** 服务器停止所有特效 */
    // protected abstract server_StopAllEffectProxy();

    /** 服务器穿戴装备 */
    protected abstract server_EquipWeapon(guid: string, isRight: boolean);

    /** 服务器设置角色guid */
    protected abstract server_SetChar(guid: string);

    // /** 服务器发射飞弹 */
    // protected abstract server_FireNodeBroadcast(fireNodeId: string, startPos: mw.Vector, dir: mw.Vector, speed: number, guid: string, colorHex: string, flyMaxDis: string);

    // protected abstract server_UnFireNode(guid: string);

}

/** 冷兵器数据层 */
export abstract class WeaponData extends WeaponPreDefine {


    /** 动画json */
    @mw.Property({ displayName: "动作数据", arrayDefault: ["{\"infos\":[{\"type\":\"1\",\"guid\":\"85955\",\"duration\":\"2000\",\"hitLength\":\"600\",\"frontRockLength\":\"600\",\"delayPlayTime\":\"\",\"slotIndex\":\"-1\",\"stopTime\":\"\",\"offsetPos\":[\"0\",\"0\",\"0\"],\"offsetRotation\":[\"0\",\"0\",\"0\"],\"offsetScale\":[\"0\",\"0\",\"0\"]},{\"type\":\"1\",\"guid\":\"85960\",\"duration\":\"2000\",\"hitLength\":\"600\",\"frontRockLength\":\"600\",\"delayPlayTime\":\"\",\"slotIndex\":\"-1\",\"stopTime\":\"\",\"offsetPos\":[\"0\",\"0\",\"0\"],\"offsetRotation\":[\"0\",\"0\",\"0\"],\"offsetScale\":[\"0\",\"0\",\"0\"]},{\"type\":\"1\",\"guid\":\"85959\",\"duration\":\"2000\",\"hitLength\":\"600\",\"frontRockLength\":\"600\",\"delayPlayTime\":\"\",\"slotIndex\":\"-1\",\"stopTime\":\"\",\"offsetPos\":[\"0\",\"0\",\"0\"],\"offsetRotation\":[\"0\",\"0\",\"0\"],\"offsetScale\":[\"0\",\"0\",\"0\"]},{\"type\":\"1\",\"guid\":\"85957\",\"duration\":\"2000\",\"hitLength\":\"600\",\"frontRockLength\":\"600\",\"delayPlayTime\":\"\",\"slotIndex\":\"-1\",\"stopTime\":\"\",\"offsetPos\":[\"0\",\"0\",\"0\"],\"offsetRotation\":[\"0\",\"0\",\"0\"],\"offsetScale\":[\"0\",\"0\",\"0\"]}]}"] })
    protected animationJsons: string[] = [];

    /** 动画信息 */
    protected animationInfo: AnimationInfo[] = [];

    /** timer */
    protected allTimer: TimeOutInfo[] = [];

    /** 宿主角色 */
    @mw.Property({ replicated: true, onChanged: "client_OnChangeCharGuid" })
    protected charGuid: string = "";

    @mw.Property({ replicated: true, onChanged: "client_OnWeaponParamsChanged" })
    protected weaponParams: number[] = [];
    protected char: mw.Character | mw.Character;

    /** 初始化完成回调 */
    protected _onInitComplateCall: () => void;

    /** 是否初始化完成 */
    protected _isInit: boolean = false;

    /** 获取武器json */
    public static getWeaponJson: (...param: any[]) => string[];

    /** 自动索敌转向过滤器 */
    public static focusFilter: (gameObject: GameObject) => boolean;

    /** 同步玩家过滤器 */
    public static getSynchronizedPlayer: (launchPlayerId: number) => number[];

    public static getClinetSyncState: () => boolean;

    /** 启动所有需要更新的回调 */
    protected startUpdateInterval(callback: (dt: number) => boolean) {
        this.allUpdateCallback.push(callback);
    }

    client_OnWeaponParamsChanged() {
        console.log("client_OnWeaponParamsChanged" + this.weaponParams);
        this.client_setWeaponJsonByParams(...this.weaponParams);

    }

    /** 停止所有定时器 */
    protected stopAllTimer() {
        console.log("rock stop all Timer", this.allTimer.length)

        this.allTimer.forEach(e => {
            e.delay = 0
        })
        this.server_StopAllTimer();
        this.allTimer = [];
        this.allUpdateCallback = [];
        if (this.char && this.char.worldTransform) {
            this.char.movementEnabled = true;
            this.char.jumpEnabled = true;
        }
    }

    /**
     * 初始化角色对象
     * @param character 角色
     * @param onInitComplateCall 初始化完成回调
     * @returns 
     */
    public initCharacter(character: mw.Character | mw.Character, onInitComplateCall: () => void): boolean {
        this.char = character;
        this.server_SetChar(this.char.gameObjectId);
        this._onInitComplateCall = onInitComplateCall;
        if (this._isInit && this._onInitComplateCall) {
            this._onInitComplateCall();
        }
        return true;
    }

    /**
     * 角色插值移动
     * @param guid 
     * @param startPos 
     * @param pos 
     * @param time 
     */
    protected async characterLerpMove(guid: string, startPos: mw.Vector, pos: mw.Vector, time: number, blockPlayer: boolean = false) {
        let go = await GameObject.asyncFindGameObjectById(guid);
        if (go instanceof mw.Pawn) {
            let char = go as (mw.Character | mw.Character);
            let curDur = 0;
            let posVec = new mw.Vector(pos.x, pos.y, pos.z);
            let startPosVec = new mw.Vector(startPos.x, startPos.y, startPos.z);
            let subDis = posVec.clone().subtract(startPosVec);
            let lastVec = char.worldTransform.position.clone(); //new mw.Vector(char.location.x, char.location.y, char.location.z);


            console.error("start Set char To Pos : " + Date.now());
            this.startUpdateInterval((dt: number): boolean => {

                curDur += (dt * 1000);
                if (curDur >= time) {
                    console.error("end Set char To Pos : " + Date.now());
                    return false;
                }

                let curProgress = parseFloat((curDur / time).toFixed(2));
                let curPos = new mw.Vector(
                    parseFloat((subDis.x * curProgress).toFixed(2)),
                    parseFloat((subDis.y * curProgress).toFixed(2)),
                    parseFloat((subDis.z * curProgress).toFixed(2))
                );

                let curVec = curPos.clone().add(startPosVec);
                let curDirVec = curVec.clone().subtract(lastVec).normalized;

                // 地面检测
                let resBottom = QueryUtil.lineTrace(curVec,
                    curVec.clone().add(char.worldTransform.getUpVector().multiply(-1).multiply(100)), true, SkillRectCheck.showRect);
                resBottom = resBottom.filter(e => {
                    return e.gameObject.tag && e.gameObject.tag == "center_platform";
                });
                if (resBottom.length > 0) {
                    curVec.z = resBottom[0].position.z + 100;
                }

                let res = QueryUtil.lineTrace(char.worldTransform.position, curVec.clone().add(curDirVec.multiply(50)), true, SkillRectCheck.showRect);
                res = blockPlayer ? res.filter(e => { return e.gameObject.gameObjectId != this.char.gameObjectId && !(e.gameObject instanceof mw.Trigger) && !(e.gameObject instanceof mw.Pawn) }) :
                    res.filter(e => { return e.gameObject.gameObjectId != this.char.gameObjectId && !(e.gameObject instanceof mw.Trigger) });
                lastVec = curVec;
                if (res.length > 0) {
                    return true;
                }

                // let sub = curVec.clone().subtract(lastVec);
                lastVec = curVec;
                char.worldTransform.position = (curVec.clone());

                return true;

            })
        }
    }

    /**
     * 角色插值旋转
     * @param guid 
     * @param startPos 
     * @param pos 
     * @param time 
     */
    protected async characterLerpRot(guid: string, startRot: mw.Rotation, rot: mw.Rotation, time: number) {
        let go = await GameObject.asyncFindGameObjectById(guid);
        if (go instanceof mw.Pawn) {
            let char = go as (mw.Character | mw.Character);
            let tempRot = new mw.Rotation(0, 0, 0);
            let curDur = 0;

            this.startUpdateInterval((dt: number): boolean => {

                curDur += (dt * 1000);
                if (curDur >= time) {
                    tempRot.x = 0;
                    tempRot.y = 0;
                    char.localTransform.rotation = (startRot.add(rot));
                    return false;
                }

                let curProgress = parseFloat((curDur / time).toFixed(2));
                tempRot.set(
                    startRot.x + parseFloat((rot.x * curProgress).toFixed(2)),
                    startRot.y + parseFloat((rot.y * curProgress).toFixed(2)),
                    startRot.z + parseFloat((rot.z * curProgress).toFixed(2))
                )

                char.localTransform.rotation = (tempRot);
                return true;

            })
        }
    }

    onStart() {
        super.onStart();

        console.warn("创建完成 weapon");
        // this.animationInfo = [];

        // this.animationJsons.forEach(e => {

        //     let info = JSON.parse(e) as AnimationInfo;
        //     let newInfo = new AnimationInfo();

        //     if (info) {

        //         Object.keys(info).forEach(e => {

        //             if (info[e] instanceof Object) {
        //                 return;
        //             }
        //             newInfo[e] = info[e];

        //         })

        //         info.infos.forEach(e => {
        //             let nodeInfo = new NodeInfoBase();
        //             Object.keys(e).forEach(k => {
        //                 nodeInfo[k] = e[k]
        //             })
        //             newInfo.infos.push(nodeInfo);
        //         })
        //         this.animationInfo.push(newInfo);
        //     } else {
        //         console.error("解析json错误 : " + e);
        //     }
        // })

        // if (this.animationInfo.length != this.animationJsons.length) {
        //     console.error("解析json错误 : 动画数量和解析数量不一致");
        // }
        if (!this._isInit) {
            this._isInit = true;
            if (this._onInitComplateCall)
                this._onInitComplateCall();
        }

    }

    onUpdate(dt: number) {
        super.onUpdate(dt);

        let newList = [];
        let updateList = false;

        this.allUpdateCallback.forEach(e => {
            let res = e(dt);
            if (res) {
                newList.push(e);
            } else {
                updateList = true;
            }
        })

        if (updateList)
            this.allUpdateCallback = newList;
    }

}