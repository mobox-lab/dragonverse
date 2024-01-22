import { SpawnManager, SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/01 10:06:56
* @Description  : 通用的子弹逻辑，是在服务器创建子弹对象
*/

import { BulletLaunchData, EBulletDestroyCondition, emptyAnchorKey, getBulletGuid, useReplicatedMode } from "./BulletDefine";
//import Rep_Bullet from "./Rep_Bullet";


/**
 * 子弹模块内部使用子弹数据结构，字段类型包含于excel导表工具导出的数据类型，原始静态数据，可供子弹对象索引查询,使用
 */
export class InnerBulletData {
    /**id*/
    id: number
    /**名称*/
    name: string
    /**子弹描述*/
    description: string
    /**子弹类型*/
    bulletType: number
    /**开启对npc自动导航 */
    autoNav: boolean
    /**伤害检测方式*/
    detectionType: number
    /**延迟时间(s)进行射线检测*/
    detectionDelay: number
    /**销毁结束条件*/
    destroyCondition: number
    /**子弹穿透次数（也是有效命中次数)*/
    penetrateCount: number
    /**子弹分裂数*/
    splitCount: number
    /**子弹分裂角度*/
    splitAngle: number
    /**反弹次数*/
    reboundCount: number
    /**抛物线高度比例(0-1)*/
    parabolaHeightScale: number
    /**延迟多少s销毁子弹*/
    delayDestroy: number
    /**速度：帧间隔*Speed*/
    speed: number
    /**子弹生成时的开火特效Guid*/
    fireEffectGuid: string
    /**开火特效的世界缩放*/
    fireEffectScale: Array<number>
    /**开火特效循环次数*/
    fireEffectLoop: number
    /**0:无限循环*/
    fireSoundGuid: string
    /**>0表示循环次数*/
    fireSoundVolume: number
    /**开火音效(3d)*/
    flyEffectGuid: string
    /** 1次性的*/
    flyEffectScale: Array<number>
    /**子弹飞行模型的旋转方向 */
    flyRelativeRot: mw.Vector
    /**开火音效的音量比例(0-1)*/
    triggerRelativePos: Array<number>
    /**子弹飞行用的模型/特效，约定朝向看向+X*/
    triggerRelativeRot: Array<number>
    /**可以空着，如瞬发的子弹*/
    triggerRelativeScale: Array<number>
    /**子弹飞行模型的世界缩放*/
    flySoundGuid: string
    /**子弹trigger的相对位置*/
    flySoundLoop: number
    /**子弹trigger的相对朝向*/
    flySoundVolume: number
    /**子弹trigger的相对缩放*/
    hitEffectGuid: string
    /**飞行音效(3d)*/
    hitEffectScale: Array<number>
    /**跟着物体走的*/
    hitEffectLoop: number
    /**飞行音效循环与否*/
    hitSoundGuid: string
    /**0循环*/
    hitSoundVolume: number

    /**>0次数*/
    extraParam1: string
    /**飞行音效的音量比例(0-1)*/
    extraParam2: string
    /**子弹命中时的特效Guid，可以没有*/
    extraParam3: string

    /**曲线偏移倍数，发射点到目标点距离的一倍作为乘法计算 中心 */
    curveOffsetMultiple: mw.Vector
    /**随机偏移倍数参考可以为空 */
    randomOffsetMultiple: mw.Vector
    /**固定曲线Z，相对释放者偏移*/
    fixCurveZ: number
    /**返回时子弹偏移倍数 */
    backOffsetMultiple: mw.Vector
    /**是否一直矫正子弹方向指向目标 0不矫正 1矫正  默认0 降低计算量 */
    isCalculateRotation: boolean
    /**曲线子弹无目标是否直线飞行*/
    isStraight: boolean

    /**命中爆炸id */
    hitBombId: number
}

export class Bullet {
    /**动态唯一id */
    protected _id: number = 0
    public get id() {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    /**
     * 静态子弹配置，any表示如果子弹需要自行扩充，也可以透传
     */
    protected _staticConfig: InnerBulletData;
    public get staticConfig(): InnerBulletData {
        return this._staticConfig;
    }


    /**
     * 是否初始化完成了
     */
    protected _inited: boolean = false;
    public get inited() {
        return this._inited;
    }

    /**
     * 是否已经死亡了
     */
    protected _dead: boolean = false;
    public get dead() {
        return this._dead;
    }

    /**
    * 子弹的管理者是谁，该玩家的客户端负责计算
    */
    protected _hostPlayerId: number;
    public get hostPlayerId(): number {
        return this._hostPlayerId;
    }
    //重要数据
    /**发射位置 */
    protected _launchPos: mw.Vector;
    public get launchPos(): mw.Vector {
        return this._launchPos;
    }
    /**目标位置 */
    protected _targetPos: mw.Vector;
    public get targetPos(): mw.Vector {
        return this._targetPos;
    }
    /**
     * 子弹速度 0表示瞬发子弹
     */
    protected _speed: number = 10;
    public get speed(): number {
        return this._speed;
    }
    /**
     * 穿透次数， 为1表示就会命中一个
     */
    protected _penetrateCount: number = 1;
    public get penetrateCount(): number {
        return this._penetrateCount;
    }

    /**
     * 反弹总次数
     */
    protected _reboundCount: number = 0;
    public get reboundCount(): number {
        return this._reboundCount;
    }

    /**
     * 分裂数量
     */
    protected _splitCount: number = 0;
    public get splitCount(): number {
        return this._splitCount;
    }

    /**
    * 水平分裂角度
    */
    protected _splitAngle: number = 0;
    public get splitAngle(): number {
        return this._splitAngle;
    }


    /**
     * 命中计数，为穿透服务
     */
    protected _hitCount: number = 0;
    public get hitCount(): number {
        return this._hitCount;
    }
    public set hitCount(value: number) {
        this._hitCount = value;
    }

    /**
     * 当前反弹次数，为反弹服务
     */
    protected _curRebountCount: number = 0;
    public get curRebountCount(): number {
        return this._curRebountCount;
    }
    public set curRebountCount(value: number) {
        this._curRebountCount = value;
    }


    /**
     * 延迟销毁的时间
     */
    protected _delayDestroyTime: number = 0;
    public get delayDestroyTime(): number {
        return this._delayDestroyTime;
    }

    /**
     *延迟销毁的timer
     */
    public destroyTimerId: number = null;

    /**
     * 子弹销毁条件，如果存在销毁时间，会进行
     */
    protected _destroyCondition: EBulletDestroyCondition = EBulletDestroyCondition.ReachTarget;
    public get destroyCondition(): EBulletDestroyCondition {
        return this._destroyCondition;
    }


    ////////////////////////////
    /**
     * 重置使用
     */
    used: boolean = false;

    /**
     * 服务器 用于同步的属性组件
     */
    // protected _syncScript: Rep_Bullet = null;
    // public get syncScript(): Rep_Bullet {
    //     return this._syncScript;
    // }

    /**
     * 服务端是用于同步数据的空锚点，客户端代表的是子弹的模型
     */
    protected _bulletObj: mw.GameObject;
    public get bulletObj(): mw.GameObject {
        return this._bulletObj;
    }
    public set bulletObj(bulletGo: mw.GameObject) {
        this._bulletObj = bulletGo;
    }

    /**子弹所携带的攻击属性对象数据，子弹发出之后会得到一份攻击属性数据，一但发出，攻击属性对象数据不变了  {atkerId:1,atk:500} */
    protected _launchData: BulletLaunchData = null;
    public get launchData(): BulletLaunchData {
        return this._launchData;
    }

    /**这个子弹都同步给了那些玩家id */
    private _syncPlayerIds: number[] = [];
    /**同步的玩家id数组 */
    public get syncPlayerIds(): number[] {
        return this._syncPlayerIds;
    }

    /**
     * 构造一个服务器用的逻辑子弹
     * @param launchData 发射时的数据集{}  
     * @param staticConfig 子弹静态表配置
     * @param _spawnScriptFunc 写 mw.MWScript.spawnScript
     * @param guid 子弹唯一id，
     */
    constructor(launchData: BulletLaunchData, staticConfig: InnerBulletData, guid: number = null) {
        //  oTrace("Bullet constructor staticConfig id: " + staticConfig.id);
        this.initCommon(launchData, staticConfig, guid)
    }
    /**
     * 常规初始化
     * @param launchData 
     * @param staticConfig 
     * @param guid 
     */
    initCommon(launchData: BulletLaunchData, staticConfig: InnerBulletData, guid: number = null) {
        this._dead = false;
        this.used = true;

        if (guid == null)
            this._id = getBulletGuid();
        else
            this._id = guid;
        // oTrace("Bullet constructor: launchData: " + JSON.stringify(launchData) + " staticConfig: " + JSON.stringify(staticConfig) + " guid: " + guid + " this._id: " + this.id);

        this._launchData = launchData;
        this._launchPos = launchData.launchPos;
        this._targetPos = launchData.targetPos;
        this._hostPlayerId = launchData.playerId;
        this._staticConfig = staticConfig;

        this._destroyCondition = staticConfig.destroyCondition;
        if (launchData.speed == null)
            launchData.speed = staticConfig.speed;
        if (launchData.penetrateCount == null)
            launchData.penetrateCount = staticConfig.penetrateCount;
        if (launchData.splitCount == null)
            launchData.splitCount = staticConfig.splitCount;
        if (launchData.splitAngle == null)
            launchData.splitAngle = staticConfig.splitAngle;
        if (launchData.reboundCount == null)
            launchData.reboundCount = staticConfig.reboundCount;
        if (launchData.heightScale == null)
            launchData.heightScale = staticConfig.parabolaHeightScale;
        if (launchData.delayDestroy == null)
            launchData.delayDestroy = staticConfig.delayDestroy;

        if (launchData.bulletType == null || launchData.bulletType == undefined) {
            if (staticConfig.bulletType == null || staticConfig.bulletType == 0)
                launchData.bulletType = 1;
            else
                launchData.bulletType = staticConfig.bulletType;
        }

        this._speed = launchData.speed == null ? this._speed : launchData.speed;
        this._penetrateCount = launchData.penetrateCount == null ? this._penetrateCount : launchData.penetrateCount;
        this._splitCount = launchData.splitCount == null ? this._splitCount : launchData.splitCount;
        this._splitAngle = launchData.splitAngle == null ? this._splitAngle : launchData.splitAngle;

        this._reboundCount = launchData.reboundCount == null ? this._reboundCount : launchData.reboundCount;
        this._delayDestroyTime = launchData.delayDestroy == null ? this._delayDestroyTime : launchData.delayDestroy;

    }

    /**
     * 标记完成初化
     */
    protected markReady() {
        this._inited = true;
    }


    /**
     * 必要的初始化
     */
    async init() {
        //子弹生成一个空锚点
        if (useReplicatedMode) {
            // oTrace("Bullet生成 空锚点用于属性同步");
            this._bulletObj = await SpawnManager.asyncSpawn({ guid: emptyAnchorKey, replicates: true });
            //Rep_Bullet
            // this._syncScript = await BulletSpawnScript.instance.getSpawnFunc()(Rep_Bullet);

            // this._syncScript.setTarget(this._bulletObj);
        }
        this.markReady();
    }

    /**
     * 标记已经死亡
     */
    markDead() {
        this._dead = true;
    }

    /**
     * 强制销毁了
     */
    forceDestroy() {
        this.destroyTimerId = null;
        this.markDead();
    }

    /**
     * 重置， 逻辑对象复用
     */
    reset() {
        this._launchData = null;
        this.used = false;
        this.id = -1;
        this._hitCount = 0;
        this._penetrateCount = 1;
        this._reboundCount = 0;
        this._curRebountCount = 0;
        this._syncPlayerIds.length = 0;
    }

    /**
     * 销毁
     */
    onDestroy() {
        this._launchData = null;
        this._bulletObj?.destroy();
        this._staticConfig = null;
        this._hostPlayerId = null;
        this._syncPlayerIds.length = 0;
    }

    public addSyncPlayerId(playerId: number) {
        if (this._syncPlayerIds.indexOf(playerId) == -1) {
            this._syncPlayerIds.push(playerId);
        }
    }
}