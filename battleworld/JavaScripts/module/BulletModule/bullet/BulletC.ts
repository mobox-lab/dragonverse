/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/01 10:13:53
* @Description  : 客户端子弹基类,处理移动和命中 
*/

import { EBulletEvents_C } from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";
import { Bullet, InnerBulletData } from "./Bullet";
import { BulletEvents, BulletLaunchData, bullet_RotateVector, checkObjIsEqual, EBulletDestroyCondition, EBulletHitCalcType, EBulletType } from "./BulletDefine";
import { Detector_BoxTrigger } from "./Detector_BoxTrigger";
import { Detector_LineTrace } from "./Detector_LineTrace";
import { IHitDetector } from "./IHitDetector";

/**
 * 检查子弹击中物体后是否是有效的，给外部一个命中判定机会做自己的特殊判定,返回true表示是一次有效的命中
 */
export type CheckBulletHitValid = (bullet: BulletC, target: mw.GameObject | mw.HitResult) => boolean;

/**
 * 检查子弹击中物体后是否是有效的反弹，给外部一个判定机会做自己的特殊判定,返回true表示是有效的，默认为true
 */
export type CheckBulletReboundValid = (bullet: BulletC, target: mw.HitResult) => boolean;

export abstract class BulletC extends Bullet {


    /**移动方向 */
    protected moveDir: mw.Vector = mw.Vector.zero;
    /**需要移动的距离 */
    protected moveDistance: number;
    /**当前位置 */
    protected worldPos: mw.Vector = mw.Vector.zero;


    /**
     * 子弹移动中
     */
    protected flying: boolean = false;
    /**
     * 每一次有效命中的命中位置，如果是射线检测方式就是射线的命中位置，如果是trigger,也会客户端计算一个相交位置,可供外部使用
     */
    public hitPos: mw.Vector;

    /**
     * 命中检查器
     */
    protected hitDetector: IHitDetector;

    /**
     * 只要到目的地了，就不会执行位置更新了
     */
    protected reachedTarget: boolean = false;

    /**
     * 命中检测方式
     */
    protected _detectionType: EBulletHitCalcType;
    public get detectionType(): EBulletHitCalcType {
        return this._detectionType;
    }

    /**
     * 外部用于检查命中目标是否有效
     */
    private checkHitValidFun: CheckBulletHitValid = null;

    /**
     * 检查是否为有效的反弹
     */
    private checkReboundValidFun: CheckBulletReboundValid = null;

    /**
     * 飞行音效id
     */
    private flySoundId: number = null;


    /**
     * 进入反弹状态,
     */
    private enterReboundStatus: boolean = false;
    /**
     * 反弹开始位置
     */
    private reboundStart: mw.Vector = null;
    /**
     * 反弹结束位置
     */
    private reboundEnd: mw.Vector = null;
    /**
     * 反弹最大距离,TODO
     */
    private reboundDistance: number = 0;

    /**
     * 延迟销毁
     */
    private delayDead: boolean = false;

    /**
     * 是否首帧
     */
    private firstFrame: boolean = true;
    public firstCheckLine: boolean = true;

    /** 延迟帧数 */
    private delayFrame: number = 0;

    /**目标命中缓存 */
    private hitTargetCache: Set<string> = new Set();

    /**
     * 构造一个服务器用的逻辑子弹
     * @param launchData 发射时的数据集{}  
     * @param staticConfig 子弹静态表配置
     * @param _spawnScriptFunc 写 mw.MWScript.spawnScript
     * @param guid 子弹唯一id，
     */
    constructor(launchData: BulletLaunchData, staticConfig: InnerBulletData, guid: number = null) {
        //oTrace("BulletC constructor staticConfig id: " + staticConfig.id);
        super(launchData, staticConfig, guid);
        this._detectionType = staticConfig.detectionType;
    }

    /**
     * 必要的初始化	  
     */
    async init() {
    }

    /**
     * 初始化子弹模型情况
     * @param bulletGo 子弹物体
     */
    async initBulletMode(bulletGo: mw.GameObject) {
        //oTrace("BulletC initBulletMode !!!!!!!!!");
        this._bulletObj = bulletGo;
        this.firstFrame = true;
    }

    /**
     * 初始化命中检测器 hook	  
     * @arg {trigger:mw.Trigger,checkFun: CheckBulletHitValid}
     */
    async initHitDetector(arg: any) {
        //oTrace("BulletC initHitDetector !!!!!!!!!");
        this.checkHitValidFun = arg.checkFun;
        this.checkReboundValidFun = arg.checkReboundFun;
        switch (this._detectionType) {
            case EBulletHitCalcType.Trigger:
                this.hitDetector = new Detector_BoxTrigger();
                let triggerRelativePos: mw.Vector = mw.Vector.zero;
                let triggerRelativeRot: mw.Vector = mw.Vector.zero;
                let triggerRelativeScale: mw.Vector = mw.Vector.one;
                if (this._staticConfig.triggerRelativePos && Array.isArray(this._staticConfig.triggerRelativePos))
                    triggerRelativePos = new mw.Vector(this._staticConfig.triggerRelativePos[0], this._staticConfig.triggerRelativePos[1], this._staticConfig.triggerRelativePos[2]);
                if (this._staticConfig.triggerRelativeRot && Array.isArray(this._staticConfig.triggerRelativeRot))
                    triggerRelativeRot = new mw.Vector(this._staticConfig.triggerRelativeRot[0], this._staticConfig.triggerRelativeRot[1], this._staticConfig.triggerRelativeRot[2]);
                if (this._staticConfig.triggerRelativeScale && Array.isArray(this._staticConfig.triggerRelativeScale))
                    triggerRelativeScale = new mw.Vector(this._staticConfig.triggerRelativeScale[0], this._staticConfig.triggerRelativeScale[1], this._staticConfig.triggerRelativeScale[2]);
                this.hitDetector.init({
                    trigger: arg.trigger,
                    rPos: triggerRelativePos,
                    rRot: triggerRelativeRot,
                    scale: triggerRelativeScale,
                    parent: this._bulletObj,
                    onCheckTriggerValid: (target: mw.GameObject) => {
                        return this.onCheckTriggerValid(target);
                    }
                });
                break;
            case EBulletHitCalcType.LineTrace:
                if (this.speed == 0)
                    this.bulletObj.setVisibility(mw.PropertyStatus.Off);
                this.hitDetector = new Detector_LineTrace();
                this.hitDetector.init({
                    delayTime: this._staticConfig.detectionDelay,
                    bulletObj: this.bulletObj,
                    checkFrom: this._launchPos,
                    checkTo: this._targetPos,
                    checkHostId: this.launchData.atkerIsPlayer == true ? this.hostPlayerId : -1,
                    onLineTraceTarget: (target: mw.HitResult) => {
                        return this.onLineTraceTarget(target);
                    },
                    onCheckOver: () => {
                        this.onLineTraceOver();
                    }
                });
                break;
        }
        this.hitDetector.bulletId = this.id;
        this.hitDetector.initOver();

        if (this.hostPlayerId != Player.localPlayer.playerId) {
            this.delayFrame = 60;
        }
    }

    /**
     * trigger 命中目标后trigger还有效么
     * @param target 目标
     */
    protected onCheckTriggerValid(target: mw.GameObject): boolean {
        if (this.checkHitValidFun) {
            //这是一次有效命中
            let result = this.checkHitValidFun(this, target);


            if (result) {
                // 一个目标只能命中一次，放置触发器多次碰撞情况
                if (this.hitTargetCache.has(target.gameObjectId)) {
                    return false;
                }
                this.hitTargetCache.add(target.gameObjectId);

                //oTrace("BulletC  完成了一次有效命中");
                this.onTriggerHitOnce(target);
                return this.hitCount >= this.penetrateCount;
            }
            return false;

        }
        else {
            return true;
        }
    }

    /**
     * 射线检测命中了目标
     * @param target 
     */
    protected onLineTraceTarget(target: mw.HitResult) {
        //oTrace("BulletC_Line onLineTraceTarget !!!!!!!!!");
        if (this.checkHitValidFun) {
            //这是一次有效命中w
            let result = this.checkHitValidFun(this, target);
            if (result) {
                //oTrace("BulletC  完成了一次有效命中");
                this.onLineTraceHitOnce(target);
                return true;
            }
            return false;
        }
        else
            return true;
    }


    /**
     * 子弹一切初始化完成了 hook
     */
    initOver() {
        this.hitTargetCache.clear();
        this._bulletObj.setVisibility(mw.PropertyStatus.On);
        if (this.staticConfig.flySoundGuid) {
            try {

                this.flySoundId = mw.SoundService.play3DSound(this.staticConfig.flySoundGuid, this._bulletObj, this.staticConfig.flySoundLoop, this.staticConfig.flySoundVolume);
            } catch (error) {
                console.error(`TypeError-(${this.staticConfig.flySoundGuid}):`, error)

            }
        }

        if (this.destroyCondition == EBulletDestroyCondition.CannotRebound) {
            this.reboundDistance = mw.Vector.distance(this._launchPos, this._targetPos);
        }

        this.markReady();
        //oTrace("BulletC  initOver !!!!!!!!!");
    }
    /**
     * 当射线检测完成后
     */
    protected onLineTraceOver() {
        //	oTrace("BulletC  onLineTraceOver !!!!!!!!!");
        this.markReached();
        this.markDead();
    }

    /**
     * 获取两个向量的旋转角
     * @param from 起始向量
     * @param to 目标向量
     * @param up 旋转轴
     * @returns 旋转的角度
     */
    public getSignedAngle(from: mw.Vector, to: mw.Vector, up: mw.Vector): number {
        let angle = mw.Vector.angle(from, to);
        let sign = Math.sign(mw.Vector.dot(up, mw.Vector.cross(from, to)));
        let signed_angle = angle * sign;
        return signed_angle <= 0 ? 360 + signed_angle : signed_angle;
    }

    /**
     * 检测反弹情况,考虑进如反弹状态
     * @param hitResult 
     */
    protected checkRebound(hitResult: mw.HitResult) {
        //oTrace("this._curRebountCount: " + this._curRebountCount + " this.reboundCount: " + this.reboundCount + " hitResult.gameObject: " + hitResult.gameObject.name);
        if (hitResult && this.destroyCondition == EBulletDestroyCondition.CannotRebound && !this.delayDead) {
            if (this._curRebountCount + 1 <= this.reboundCount) {
                if (!this.checkReboundValidFun(this, hitResult)) {
                    return;
                }
                this._curRebountCount++;
                //要进入反弹状态，变成直线移动了
                if (!this.enterReboundStatus)
                    this.enterReboundStatus = true;
                //计算反弹需要数据
                if (!this.reboundStart) {
                    this.reboundStart = new mw.Vector(this._launchPos.x, this._launchPos.y, this._launchPos.z);
                    this.reboundEnd = new mw.Vector(this._targetPos.x, this._targetPos.y, this._targetPos.z);
                }
                let normal = hitResult.impactNormal.normalized;
                let fromDir = this.reboundEnd.clone().subtract(this.reboundStart).normalize().multiply(-1);
                let crossDir = mw.Vector.cross(fromDir, normal);
                let angle = this.getSignedAngle(fromDir, normal, crossDir);
                //oTrace("angle: " + angle);
                let toDir = bullet_RotateVector(fromDir, crossDir, angle * 2)
                //计算一个新的反弹情况
                this.reboundStart = new mw.Vector(hitResult.impactPoint.x, hitResult.impactPoint.y, hitResult.impactPoint.z);
                this.reboundEnd = this.reboundStart.clone().add(toDir.multiply(this.reboundDistance));

                this.moveDir = this.reboundEnd.clone().subtract(this.reboundStart).normalize();
                this.moveDistance = mw.Vector.squaredDistance(this.reboundStart, this.reboundEnd);
                this.worldPos = new mw.Vector(this.reboundStart.x, this.reboundStart.y, this.reboundStart.z);
                try {
                    this._bulletObj.worldTransform.rotation = this.moveDir.toRotation();
                } catch (error) {

                }
            }
        }
    }

    /**
     *当命中目标时判断能否对目标产生伤害
     * @returns target
     */
    protected checkCanTakeDamage(target: mw.GameObject): boolean {

        if (this.hitDetector == null) return false;
        if (this.hitDetector instanceof Detector_LineTrace) {
            if (this._hitCount + 1 <= this._penetrateCount)
                return true;
            return false;
        }
        if (this.destroyCondition == EBulletDestroyCondition.CannotPenetrate) {
            if (this._hitCount + 1 <= this._penetrateCount) {
                if (this._hitCount + 1 == this._penetrateCount) {
                    //应该强行终止
                    this.markDead();
                }
                return true;
            }
            return false;
        }
        else if (this.destroyCondition == EBulletDestroyCondition.ReachTarget) {
            if (!this.reachedTarget) {
                if (this._hitCount + 1 <= this._penetrateCount) {
                    return true;
                }
                return false;
            }
        }
        else if (this.destroyCondition == EBulletDestroyCondition.CannotRebound) {
            if (this._hitCount + 1 <= this._penetrateCount) {
                return true;
            }
            return false;
        }
        return false;
    }

    /**
     * 当trigger成功命中一次之后
     * @param target
     */
    protected onTriggerHitOnce(target: mw.GameObject) {
        if (this.dead)
            return;

        let hitResults = [];

        if (this._staticConfig.bulletType == EBulletType.Parabola) {
            this.hitPos = this.worldPos;
        } else {
            if (this.enterReboundStatus) {
                hitResults = QueryUtil.lineTrace(this.reboundStart, this.reboundEnd, true, false);
            }
            else {
                hitResults = QueryUtil.lineTrace(this.launchPos, this.worldPos, true, false);
            }
        }


        //找到命中的单位
        //计算命中点
        let pos: mw.Vector = null;
        let hitResult = null;
        for (let i = 0; i < hitResults.length; i++) {
            //oTrace("Check trigger hit impactPos: this gameObject pos: " + hitResults[i].gameObject.name + " target .name: " + target.name);
            if (checkObjIsEqual(hitResults[i].gameObject, target)) {
                pos = hitResults[i].impactPoint;
                hitResult = hitResults[i];
                break;
            }
        }
        // 是否要产生伤害
        if (this.checkCanTakeDamage(target)) {
            this._hitCount++;
            if (pos) {
                this.hitPos = pos;
            }
            else {
                this.hitPos = this.worldPos;
            }

            Event.dispatchToLocal(BulletEvents.ClientBulletHitTarget, { bullet: this, target: target });
        }

        this.checkRebound(hitResult);
    }

    /**
     * 当射线检测成功命中一次之后
     * @param target
     */
    protected onLineTraceHitOnce(target: mw.HitResult) {
        if (this.dead)
            return;
        //射线检测，只需要管命中了是否要产生伤害
        if (this.checkCanTakeDamage(target.gameObject)) {
            this._hitCount++;
            this.hitPos = target.impactPoint;
            Event.dispatchToLocal(BulletEvents.ClientBulletHitTarget, { bullet: this, target: target });
        }
        this.checkRebound(target);
    }

    /**
     * 标记到达目标位置了
     */
    protected markReached() {
        this.reachedTarget = true;
    }

    /**
     * 用于回收时的资源返还，hook
     * @returns 
     */
    recycleResource(): { trigger: mw.Trigger, res: mw.GameObject } {

        if (this.hitDetector) {
            this.hitDetector.preDestroy();
        }
        if (this.flySoundId) {
            mw.SoundService.stop3DSound(this.flySoundId);
            this.flySoundId = null;
        }

        if (this._detectionType == EBulletHitCalcType.Trigger && this.hitDetector)
            return { trigger: (this.hitDetector as Detector_BoxTrigger).trigger, res: this._bulletObj }
        else
            return { trigger: null, res: this._bulletObj }
    }



    /**
     * 驱动更新
     * @param dt s 
     */
    onUpdate(dt: number) {

        if (this.firstFrame) {
            this.firstFrame = false;
            return;
        }

        if (this.delayFrame > 0) {
            this.delayFrame--;
            return;
        }

        if (this.dead || !this._inited)
            return;
        if (this.hitDetector)
            this.hitDetector.onUpdate(dt);
        if (this.enterReboundStatus) {
            this.updateReboundMovement(dt);
        }
        else {
            this.updateMovement(dt);
        }

    }

    /**
     * 更新位移 hook
     * @param dt 
     */
    protected updateMovement(dt: number) {

    }

    /**
     * 更新反弹位移  
     * @param dt 
     */
    protected updateReboundMovement(dt: number) {
        let newPos = this.worldPos.clone().add(this.moveDir.clone().multiply(this.speed * dt));
        this._bulletObj.worldTransform.position = newPos;
        this.worldPos = newPos;
        let nowDist = mw.Vector.squaredDistance(this.launchPos, this.worldPos);
        if (nowDist >= this.moveDistance) {
            this.markDead();//暂时这么处理就可以了
        }
    }


    /**
     * 销毁
     */
    onDestroy() {
        this.checkHitValidFun = null;
    }

}
