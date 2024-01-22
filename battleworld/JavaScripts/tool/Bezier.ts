import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { SpawnManager, SpawnInfo, } from '../Modified027Editor/ModifiedSpawn';
type Vector3Like = { x: number, y: number, z: number }
export class Bezier {

    private static _factory: BezierTranceFactory
    static get factory(): BezierTranceFactory {
        if (!this._factory) {
            this._factory = new BezierTranceFactory()
        }
        return this._factory
    }

    static actuateByFrame() {
        this._factory?.actuateByFrame()
    }

    // n阶级贝塞尔
    static evaluate(t: number, points: mw.Vector[]): mw.Vector {
        let n = points.length - 1
        let result = mw.Vector.zero
        for (let i = 0; i < points.length; i++) {
            let f = Math.pow(1 - t, n - i) * Math.pow(t, i) * this.combination(n, i)
            let d = points[i].clone().multiply(f)
            result = result.add(d)
        }
        return result
    }

    // 二阶贝塞尔
    static evaluate_2l(a: mw.Vector, b: mw.Vector, c: mw.Vector, t: number): mw.Vector {
        return mw.Vector.lerp(mw.Vector.lerp(a, b, t), mw.Vector.lerp(b, c, t), t)
    }

    // 组合
    private static combination(max: number, cur: number): number {
        return this.factorial(max) / (this.factorial(max - cur) * this.factorial(cur))
    }

    // 阶乘
    private static factorial(x: number): number {
        let result = 1
        for (let i = 1; i <= x; i++) {
            result *= i
        }
        return result
    }

}
// 攻击特效管理
class BezierTranceFactory {
    private readonly effectHostPool: mw.GameObject[] = []
    private readonly pool: BezierInstance[]

    constructor() {
        this.pool = []
        this.effectHostPool = []
    }

    actuateByFrame() {
        for (let eff of this.pool) {
            if (eff.active) {
                eff.actuateByFrame()
            }
        }
    }

    async invokeEffect(ps: mw.Vector[],
        effectID: string,
        frameCount: number,
        ease: BezierEase,
        callback?: Function,
        caller?: any,
        fireDelay?: number) {
        let attach = await this.getHostObject()

        if (fireDelay) await mw.TimeUtil.delaySecond(fireDelay)

        let eff: BezierTranceEffect

        for (let item of this.pool) {
            if (!item.active && typeof (item) == typeof (BezierTranceEffect)) {
                eff = item as BezierTranceEffect
                break
            }
        }

        eff = new BezierTranceEffect()
        this.pool.push(eff)
        eff.invoke(ps, effectID, frameCount, attach, ease, callback, caller)
    }

    private async getHostObject(): Promise<mw.GameObject> {
        for (let obj of this.effectHostPool) {
            if (!obj.getVisibility()) return obj
        }

        // 创建空锚点
        let item = SpawnManager.wornSpawn("25782", false)
        this.effectHostPool.push(item)
        return item
    }
}

export enum BezierEase {
    FadeIn,
    FadeOut,
}

abstract class BezierInstance {
    public active: boolean

    protected pathPoints: mw.Vector[]
    protected currentStep: number
    protected callBack: Function
    protected caller: any

    protected onInstanceFinish: () => void
    protected finishMethodCaller: any

    private stepCount: number
    private ease: BezierEase

    protected init(ps: mw.Vector[], frameCount: number, ease?: BezierEase, callBack?: Function, caller?: any) {
        if (frameCount == 0) {
            console.error("frameCount 别填0")
            return
        }
        this.pathPoints = ps;
        this.stepCount = 1 / frameCount
        this.currentStep = 0
        this.active = true
        this.callBack = callBack
        this.caller = caller
        this.ease = ease
    }

    protected evaluate(stepIncrease: boolean): mw.Vector {
        let d = this.evaluateEase(this.currentStep * this.stepCount)
        if (stepIncrease) this.currentStep++

        if (d >= 1) {
            this.active = false
            this.onInstanceFinish?.call(this.finishMethodCaller)
            this.callBack?.call(this.caller)
        }

        return Bezier.evaluate(d, this.pathPoints)
    }

    abstract actuateByFrame();

    private evaluateEase(x: number): number {
        switch (this.ease) {
            case BezierEase.FadeIn: return Math.pow(x, 0.5)
            case BezierEase.FadeOut: return Math.pow(x, 2)
            default: return x
        }
    }
}

// 贝塞尔特效
class BezierTranceEffect extends BezierInstance {
    private attachGameObject: mw.GameObject
    private instanceEffectID: number

    constructor() {
        super()
    }

    invoke(ps: mw.Vector[],
        effectID: string,
        frameCount: number,
        attach: mw.GameObject,
        ease?: BezierEase,
        callBack?: Function,
        caller?: any) {
        super.init(ps, frameCount, ease, callBack, caller)
        super.onInstanceFinish = this.onFinish
        super.finishMethodCaller = this

        this.attachGameObject = attach
        this.attachGameObject.worldTransform.position = ps[0]
        this.instanceEffectID = GeneralManager.rpcPlayEffectOnGameObject(effectID, attach, 0)
    }

    actuateByFrame() {
        this.attachGameObject.worldTransform.position = this.evaluate(true)
    }

    onFinish() {
        EffectService.stop(this.instanceEffectID)
    }
}
