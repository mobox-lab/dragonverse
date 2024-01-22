/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/08 16:51:41
* @Description  :客户端 跟踪子弹 命中判断支持trigger 
*/

import { InnerBulletData } from "./Bullet";
import { BulletC } from "./BulletC";
import { BulletLaunchData, checkObjIsEqual, EBulletHitCalcType } from "./BulletDefine";

export default class BulletC_Trace extends BulletC {

    /**
     * 跟踪目标
     */
    private traceTarget: mw.GameObject = null;


    /**
     * 构造一个服务器用的逻辑子弹
     * @param launchData 发射时的数据集{}  
     * @param staticConfig 子弹静态表配置
     * @param guid 子弹唯一id，
     */
    constructor(launchData: BulletLaunchData, staticConfig: InnerBulletData, guid: number = null) {
        super(launchData, staticConfig, guid);
        this._detectionType = EBulletHitCalcType.Trigger;//跟踪只能用trigger
    }

    /**
     * 初始化子弹模型情况
     * @param bulletGo 子弹物体
     */
    async initBulletMode(bulletGo: mw.GameObject) {
        //oTrace("BulletC_Trace initBulletMode !!!!!!!!!");
        super.initBulletMode(bulletGo);
        //查找追踪的对象
        if (this._launchData.traceTargetGuid == undefined || this._launchData.traceTargetGuid == null || this._launchData.traceTargetGuid == "") {
            console.error("跟踪子弹，需要提供有效的跟踪目标!");
            return;
        }

        this.traceTarget = await GameObject.asyncFindGameObjectById(this._launchData.traceTargetGuid);

    }

    /**
     * 子弹一切初始化完成了 hook
     */
    initOver() {
        //	oTrace("BulletC_Trace initOver !!!!!!!!!");
        this.worldPos = new mw.Vector(this.launchPos.x, this.launchPos.y, this.launchPos.z);
        super.initOver();
    }

    /**
     *当命中目标时判断能否对目标产生伤害
    * @returns target
    */
    protected checkCanTakeDamage(target: mw.GameObject): boolean {
        //判断命中目标是否为跟踪目标，如果是，进入终止状态
        try {
            if (checkObjIsEqual(target, this.traceTarget)) {
                //	oTrace("BulletC_Trace  checkCanTakeDamage  dead!!!!");
                this.markDead();
            }
        } catch (error) {

        }
        return super.checkCanTakeDamage(target)
    }
    /**
     * 检测反弹情况,考虑进如反弹状态
     * @param hitResult 
     */
    protected checkRebound(hitResult: mw.HitResult) {

    }
    /**
     * 更新位移
     * @param dt 
     */
    protected updateMovement(dt: number) {
        if (!this.reachedTarget) {
            //调整方向
            try {
                let distance = mw.Vector.distance(this.traceTarget.worldTransform.position, this.worldPos)
                if (distance <= this.staticConfig.triggerRelativeScale[0] * 100) {
                    this.checkCanTakeDamage(this.traceTarget)
                    return
                }
                mw.Vector.subtract(this.traceTarget.worldTransform.position, this.worldPos, this.moveDir)
                this.moveDir = this.moveDir.normalize();
                // let rot = distance < this.staticConfig.triggerRelativeScale[0] * 100 ? this.moveDir : mw.Vector.lerp(this._bulletObj.worldTransform.rotation.vector(), this.moveDir, dt * 10)
                this._bulletObj.worldTransform.rotation = this.moveDir.toRotation();
                this.worldPos.add(this.moveDir.multiply(dt * this.speed));
                this._bulletObj.worldTransform.position = this._bulletObj.worldTransform.position.set(this.worldPos);
                // this.worldPos = nextPos;
            } catch (error) {

            }

        }
    }

    /**
     * 销毁
     */
    onDestroy() {
        super.onDestroy();
        this.traceTarget = null;
    }


}
