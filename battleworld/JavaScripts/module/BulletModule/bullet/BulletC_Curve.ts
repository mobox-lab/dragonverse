import { EBulletEvents_C } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import { EventManager } from "../../../tool/EventManager";
import { util } from "../../../tool/Utils";
import { BulletC } from "./BulletC"


interface IBulletTime {
    value: number
}

/**
 * 曲线子弹
 * 
 */
export class BulletC_Curve extends BulletC {

    /**追踪目标动画 */
    private _followTargetTween: mw.Tween<any> = null;
    /**子弹返回tween */
    private _backTween: mw.Tween<any> = null;


    private _startTime: IBulletTime = { value: 0 };
    private _endTime: IBulletTime = { value: 0 };

    /**贝塞尔计算参考点 */
    private _bezierPos: mw.Vector = new mw.Vector();

    /**释放相对坐标点 */
    private _launcherLoc: mw.Vector = null;


    /**目标对象 */
    private _followTarget: mw.GameObject = null;

    private multX: number = 0;
    private multY: number = 0;
    private multZ: number = 0;

    /**是否命中爆炸了 */
    private _isHitBomb: boolean = false;


    /**
      * 子弹一切初始化完成了 hook
      */
    initOver() {

        super.initOver();


        this._isHitBomb = false;
        this._followTarget = null;

        // 判断是否有目标对象
        if (StringUtil.isEmpty(this.launchData.traceTargetGuid) == false) {
            let target = GameObject.findGameObjectById(this.launchData.traceTargetGuid);
            if (target) {
                this._followTarget = target;
                this._targetPos = target.worldTransform.position;
            }
        }

        // 计算相对发射坐标  
        // 计算曲线固定Z贝塞尔高度
        let player = Player.getPlayer(this.launchData.playerId);
        let fixCurveZ = 0;
        if (player) {
            this._launcherLoc = player.character.localTransform.inverseTransformPosition(this.launchPos);
            if (this._staticConfig.fixCurveZ && this.staticConfig.fixCurveZ > 0) {
                fixCurveZ = player.character.localTransform.position.z + this.staticConfig.fixCurveZ;
            }
        }


        /**子弹距离目标点距离 */
        let targetDis = mw.Vector.distance(this.targetPos, this.launchPos);

        //let frameCount = 1 / TimeUtil.delayTime();  // 一秒多少帧
        //let flyTime = (targetDis / this.staticConfig.speed) / frameCount;
        let time = 0.02;// TimeUtil.delayTime();1/60
        let flyTime = targetDis / (this.staticConfig.speed * time * 30);

        this.calculate_offsetMultiple(this.staticConfig.curveOffsetMultiple);

        // 计算子弹起始点到目标点 的贝塞尔参考点
        this.calculateBezierPoint(this.launchPos, this.targetPos, targetDis);

        // 固定火炮的贝塞尔高度
        if (fixCurveZ > 0) {
            this._bezierPos.z = fixCurveZ;
        }

        this.clear_timeValue();

        this._followTargetTween =
            new mw.Tween(this._startTime)
                .to(this._endTime, flyTime * 1000)
                .onUpdate(this.update_bullet.bind(this))
                .onComplete(this.update_bulletOver.bind(this)).start();
    }

    /**子弹飞向目标动画update */
    private update_bullet(timeData) {

        if (StringUtil.isEmpty(this.launchData.traceTargetGuid) == false && this._followTarget) {
            if (this._followTarget.getVisibility()) {
                this._targetPos = this._followTarget.worldTransform.position;
            } else {
                this._followTarget = null;
            }
        }

        let movePos = this.evaluate_2l(this.launchPos, this._bezierPos, this.targetPos, timeData.value);

        // 是否一直矫正子弹方向，没需求就关闭，减少计算量
        if (this.staticConfig.isCalculateRotation) {
            // 注意别用 Globaldata.tmpVector2  上面计算已经用了 这一帧参与存储计算了
            mw.Vector.subtract(movePos, this._bulletObj.worldTransform.position, Globaldata.tmpVector);
            mw.Rotation.fromVector(Globaldata.tmpVector, Globaldata.tmpRotation);
            this._bulletObj.worldTransform.rotation = Globaldata.tmpRotation;
        }
        this._bulletObj.worldTransform.position = movePos;
    }

    /**子弹到达目标 */
    private update_bulletOver() {
        this.clear_timeValue();
        // 判断是否返回出生点  可能设计绑定


        //
        /**子弹是否返回子弹出生点
         * 如果没有目标直线飞行 
         */
        if (this._staticConfig.backOffsetMultiple == null ||
            this._followTarget == null) {

            this.onReachTarget();

            this.check_CanBomb();

            return;
        }


        let player = Player.getPlayer(this.launchData.playerId);
        if (player == null) {
            return;
        }

        let bulletLoc = this._bulletObj.worldTransform.position;
        let targetDis = mw.Vector.distance(bulletLoc, player.character.worldTransform.position);

        let time = 0.02;// TimeUtil.delayTime();1/60
        let flyTime = targetDis / (this.staticConfig.speed * time * 30);
        //let flyTime = (targetDis / (this.staticConfig.speed * TimeUtil.delayTime())) / 30;

        this._launchPos = bulletLoc;
        this._targetPos = player.character.worldTransform.position;


        //this.multX = -this.multX;

        this.calculate_offsetMultiple(this.staticConfig.backOffsetMultiple);
        // 计算子弹起始点到目标点 的贝塞尔参考点
        this.calculateBezierPoint(this.launchPos, this.targetPos, targetDis);

        this._backTween = new mw.Tween(this._startTime)
            .to(this._endTime, flyTime * 1000)
            .onUpdate(this.update_bulletBack.bind(this))
            .onComplete(this.update_bulletBackOver.bind(this));

        this._backTween.start();
    }

    /**子弹飞回来动画update */
    private update_bulletBack(timeData) {

        let player = Player.getPlayer(this.launchData.playerId);
        if (player) {
            this._targetPos = player.character.localTransform.transformPosition(this._launcherLoc);
        }

        let movePos = this.evaluate_2l(this.launchPos, this._bezierPos, this.targetPos, timeData.value);

        // 是否一直矫正子弹方向，没需求就关闭，减少计算量
        if (this.staticConfig.isCalculateRotation) {

            if (timeData.value > 0.5) {

                let pRot = player.character.localTransform.getForwardVector().toRotation();
                let bRot = this._bulletObj.worldTransform.rotation;

                // 0.3   0.7-1  
                let lerpZ = MathUtil.lerp(bRot.z, pRot.z, timeData.value);

                Globaldata.tmpRotation.x = bRot.x;
                Globaldata.tmpRotation.y = bRot.y;
                Globaldata.tmpRotation.z = lerpZ;

                this._bulletObj.worldTransform.rotation = Globaldata.tmpRotation;

            } else {
                // 注意别用 Globaldata.tmpVector2  上面计算已经用了 这一帧参与存储计算了
                mw.Vector.subtract(this.targetPos, movePos, Globaldata.tmpVector);
                mw.Rotation.fromVector(Globaldata.tmpVector, Globaldata.tmpRotation);
                this._bulletObj.worldTransform.rotation = Globaldata.tmpRotation;
            }



        }
        this._bulletObj.worldTransform.position = movePos;
    }

    private update_bulletBackOver() {
        this.onReachTarget();
    }


    /** 重置下参与动画计算的值 */
    private clear_timeValue() {

        this._startTime.value = 0;
        this._endTime.value = 1;
    }



    // 二阶贝塞尔
    private evaluate_2l(a: mw.Vector, b: mw.Vector, c: mw.Vector, t: number): mw.Vector {
        mw.Vector.lerp(a, b, t, Globaldata.tmpVector1);
        mw.Vector.lerp(b, c, t, Globaldata.tmpVector2);
        mw.Vector.lerp(Globaldata.tmpVector1, Globaldata.tmpVector2, t, Globaldata.tmpVector2);
        return Globaldata.tmpVector2;
    }

    /**计算偏移赔率 */
    private calculate_offsetMultiple(offsetMultiple: mw.Vector) {


        if (this._staticConfig.isStraight && StringUtil.isEmpty(this.launchData.traceTargetGuid)) {
            this.multX = 0;
            this.multY = 0;
            this.multZ = 0;
            return;
        }


        let curveOffsetMultiple = offsetMultiple;

        // 计算偏移倍数
        this.multX = curveOffsetMultiple.x;
        this.multY = curveOffsetMultiple.y;
        this.multZ = curveOffsetMultiple.z;
        if (this._staticConfig.randomOffsetMultiple) {

            let minX = curveOffsetMultiple.x < this._staticConfig.randomOffsetMultiple.x ? curveOffsetMultiple.x : this._staticConfig.randomOffsetMultiple.x;
            let maxX = curveOffsetMultiple.x > this._staticConfig.randomOffsetMultiple.x ? curveOffsetMultiple.x : this._staticConfig.randomOffsetMultiple.x;
            this.multX = MathUtil.randomFloat(minX, maxX);

            let minY = curveOffsetMultiple.y < this._staticConfig.randomOffsetMultiple.y ? curveOffsetMultiple.y : this._staticConfig.randomOffsetMultiple.y;
            let maxY = curveOffsetMultiple.y > this._staticConfig.randomOffsetMultiple.y ? curveOffsetMultiple.y : this._staticConfig.randomOffsetMultiple.y;
            this.multY = MathUtil.randomFloat(minY, maxY);

            let minZ = curveOffsetMultiple.z < this._staticConfig.randomOffsetMultiple.z ? curveOffsetMultiple.z : this._staticConfig.randomOffsetMultiple.z;
            let maxZ = curveOffsetMultiple.z > this._staticConfig.randomOffsetMultiple.z ? curveOffsetMultiple.z : this._staticConfig.randomOffsetMultiple.z;
            this.multZ = MathUtil.randomFloat(minZ, maxZ);
        }
    }

    /**计算贝塞尔的参考点 */
    private calculateBezierPoint(pointA: mw.Vector, pointB: mw.Vector, targetDis: number) {

        // 获取两个点之间的中心点
        util.midpoint3D(pointA, pointB, this._bezierPos);

        // 计算中心点以两点组成向量为参考的 各个方向偏移量 的最终值
        let theta = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x);

        let x = (targetDis / 2) * this.multX;
        let y = (targetDis / 2) * this.multY;
        let z = (targetDis / 2) * this.multZ;
        let offsetX = this._bezierPos.x + y * Math.cos(theta + Math.PI / 2) + x * Math.cos(theta);
        let offsetY = this._bezierPos.y + y * Math.sin(theta + Math.PI / 2) + x * Math.sin(theta);
        let offsetZ = this._bezierPos.z + z;


        this._bezierPos.x = offsetX;
        this._bezierPos.y = offsetY;
        this._bezierPos.z = offsetZ;
    }


    /**
     * 当到达目标时
     */
    private onReachTarget() {
        this.markReached();
        this.markDead();


        // // 到达目标点爆炸
        // if (this._staticConfig.hitBombId && this._staticConfig.hitBombId > 0) {
        //     EventManager.instance.call(EBulletEvents_C.bullet_bomb_c, this);
        // }
    }

    /**检测是否爆炸 */
    private check_CanBomb() {

        if (this._staticConfig.hitBombId == null || this._staticConfig.hitBombId <= 0) {
            return;
        }

        if (this._isHitBomb) {
            return;
        }

        EventManager.instance.call(EBulletEvents_C.bullet_bomb_c, this);
    }

    // 子弹可能正好  结尾 ，并且发生了触发事件
    public getIsHitBomb(): boolean {
        return this._isHitBomb;
    }

    public setIsHitBomb() {
        this._isHitBomb = true;
    }

}