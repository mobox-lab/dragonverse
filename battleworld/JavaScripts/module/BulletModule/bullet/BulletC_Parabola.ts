/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/08 9:20:32
* @Description  :客户端 定点抛物线子弹 命中判断支持trigger 
*/

import { InnerBulletData } from "./Bullet";

import { BulletC } from "./BulletC";
import { BulletLaunchData, EBulletHitCalcType } from "./BulletDefine";

class Parabola {
    dist: number = 0;
    private originalPos: mw.Vector = mw.Vector.zero;
    private m: mw.Vector = mw.Vector.zero;
    private delta: mw.Vector = mw.Vector.zero;

    constructor(startPos: mw.Vector, endPos: mw.Vector, _m: mw.Vector) {
        this.delta = endPos.clone().subtract(startPos);
        this.m = _m;
        this.dist = mw.Vector.distance(startPos, endPos);
        this.originalPos = startPos;
    }

    /**
     * 根据直线距离，更新位置
     * @param r 距离
     * @returns 位置点
     */
    updatePos(r: number): mw.Vector {
        let result = mw.Vector.zero;
        result.x = -4 * this.m.x * r * r / this.dist + (4 * this.m.x + this.delta.x / this.dist) * r + this.originalPos.x;
        result.y = -4 * this.m.y * r * r / this.dist + (4 * this.m.y + this.delta.y / this.dist) * r + this.originalPos.y;
        result.z = -4 * this.m.z * r * r / this.dist + (4 * this.m.z + this.delta.z / this.dist) * r + this.originalPos.z;
        return new mw.Vector(result.x, result.y, result.z);
    }

    /**
     * 生成一个抛物线模型对象
     * @param startPos 起始位置
     * @param endPos 结束位置
     * @param gravityScale 重力方向缩放比例
     * @returns  Parabola
     */
    static spawnParabola(startPos: mw.Vector, endPos: mw.Vector, gravityScale: number = 1): Parabola {
        let gravity = new mw.Vector(0, 0, 1);
        gravity = gravity.multiply(gravityScale);
        return new Parabola(startPos, endPos, gravity);

    }

    /**
     * 获取一个推线轨迹顶
     * @param startPos 起始位置
     * @param endPos 结束位置
     * @param gravityScale 重力方向缩放比例
     * @param splitCount 轨迹点分段数
     * @returns 位置点集
     */
    static getParabolaPoints(startPos: mw.Vector, endPos: mw.Vector, gravityScale: number = 1, splitCount: number = 20): mw.Vector[] {
        let result: mw.Vector[] = [];
        let parabola = Parabola.spawnParabola(startPos, endPos, gravityScale);
        for (let i = 0; i <= splitCount; i++) {
            let tmpPos = parabola.updatePos(parabola.dist * i / splitCount);
            result.push(tmpPos);
        }
        return result;
    }

}



export class BulletC_Parabola extends BulletC {

    /**
    * 定点抛物线高度比例     PS语言特性: 注意这里的默认值会在constructor完成后会再执行，如果在这之前修改了会被这里重置
    */
    protected heightScale: number = 0.2;

    /**
     * 路点集
     */
    private _path: mw.Vector[] = [];
    public get path(): mw.Vector[] {
        return this._path;
    }

    /**
     * 轨迹索引
     */
    private pathIndex: number = 0;


    private moveStart: mw.Vector = mw.Vector.zero;
    private moveTarget: mw.Vector = mw.Vector.zero;

    /**
     * 构造一个服务器用的逻辑子弹
     * @param launchData 发射时的数据集{}  
     * @param staticConfig 子弹静态表配置
     * @param guid 子弹唯一id，
     */
    constructor(launchData: BulletLaunchData, staticConfig: InnerBulletData, guid: number = null) {
        super(launchData, staticConfig, guid);
        this._detectionType = EBulletHitCalcType.Trigger;//定点抛物线只能用trigger
    }


    /**
     * 子弹一切初始化完成了 hook
     */
    initOver() {
        this.heightScale = this._launchData.heightScale;
        this._path = Parabola.getParabolaPoints(this._launchPos, this._targetPos, this.heightScale);
        this.pathIndex = 0;
        super.initOver();
        this.beginLaunch();
    }


    /**
     * 开始发射子弹  
     */
    beginLaunch() {
        this.beginOnceFly(null);
        this.flying = true;
    }

    /**
     * 更新位移
     * @param dt 
     */
    protected updateMovement(dt: number) {
        if (this.flying && !this.reachedTarget) {

            let moveDis = this.speed * dt;

            let maxMoveDis = this.staticConfig.triggerRelativeScale[0] * 100;
            /** CCD 连续碰撞检测 */
            let oldWorldPos = this.worldPos.clone();
            this.worldPos.add(this.moveDir.clone().multiply(moveDis));
            let isHit = false;
            if (this._hostPlayerId == Player.localPlayer.playerId) {
                let hit = this.hitDetector;
                if (moveDis > maxMoveDis) {

                    let res = QueryUtil.lineTrace(oldWorldPos, this.worldPos, true, false);
                    // let tracePos: mw.Vector = null;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].gameObject == Player.localPlayer.character) {
                            continue;
                        }
                        /** 前置设置worldPos 是为了打击点表现得时候正确 */
                        // this.worldPos.set(res[i].impactPoint);
                        if (hit.onBulletHitObj(res[i].gameObject)) {
                            // tracePos = res[i].impactPoint.clone();
                            this.worldPos.set(res[i].impactPoint)
                            break;
                        }
                    }

                    // if (tracePos != null) {
                    //     isHit = true;
                    //     this.worldPos.set(tracePos)// = tracePos;
                    // }

                }
            }
            /** 检测完毕 */

            // let nextPos = newPos;
            // this.worldPos.set(newPos);
            // console.log("Parabola-------moveDis", moveDis, this.speed);
            if (isHit) {
                this._bulletObj.worldTransform.position = this._bulletObj.worldTransform.position.set(this.worldPos);
                return;
            }
            let dist = mw.Vector.distance(this.moveStart, this.worldPos);
            // console.log("Parabola-------moveDis", moveDis, this.speed, dist, this.moveDistance);
            if (dist >= this.moveDistance) {
                this.EndOnceFly(this.worldPos);
            } else {
                // this.worldPos.set(this.worldPos);
                try {
                    this._bulletObj.worldTransform.position = this._bulletObj.worldTransform.position.set(this.worldPos);
                } catch (error) {

                }
            }
        }
    }

    /**
     * 开始进行一段移动
     * @param nextPos 目标位置
     */
    private beginOnceFly(nextPos: mw.Vector = null) {
        let tmpDist = 0;
        if (nextPos) {
            tmpDist = mw.Vector.distance(this.moveStart, nextPos);
        }

        this.moveStart.set(this._path[this.pathIndex++]);
        this.moveTarget.set(this._path[this.pathIndex]);
        mw.Vector.subtract(this.moveTarget, this.moveStart, this.moveDir)
        this.moveDir = this.moveDir.normalize();

        let nextDist = mw.Vector.distance(this.moveStart, this.moveTarget);

        if (tmpDist > 0) {
            if (tmpDist > nextDist)
                tmpDist = nextDist;
            let tmpPos = this.moveDir.clone().multiply(tmpDist).add(this.moveStart);
            this.moveStart.set(tmpPos);
            try {
                this._bulletObj.worldTransform.position = this._bulletObj.worldTransform.position.set(this.moveStart);
            } catch (error) {

            }
        }

        this.moveDistance = mw.Vector.distance(this.moveStart, this.moveTarget);
        this.worldPos.set(this.moveStart);
        try {
            this._bulletObj.worldTransform.rotation = this.moveDir.toRotation();
        } catch (error) {
            console.error("typeError---", error)
        }
    }

    /**
     * 结束了一段移动
     * @param nextPos 
     */
    private EndOnceFly(nextPos: mw.Vector) {
        if (this.pathIndex == this._path.length - 1) {
            try {
                this._bulletObj.worldTransform.position = this._bulletObj.worldTransform.position.set(this.moveTarget);
            } catch (error) {

            }
            this.markReached();
        }
        else {
            this.beginOnceFly(nextPos); //有超过的风险，根据速度 调
        }
    }

    /**
     * 标记到达目标位置了
     */
    protected markReached() {
        this.reachedTarget = true;
        this.markDead();
    }

    /**
     * 销毁
     */
    onDestroy() {
        super.onDestroy();
        this._path = null;
    }

}

