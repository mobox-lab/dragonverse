/** 
 * @Author       : zhenyu.zhang
 * @Date         : 2023-04-04 16:44:53
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-13 16:44:20
 * @FilePath     : \nevergiveup\JavaScripts\ZwtTween.ts
 * @Description  : 工具类
 */
import EasingFunction = mw.TweenEasingFunction;
import Tween = mw.Tween
export type TweenIns = { animName: string, param?: any[], easing?: EasingFunction, isAsync: boolean, relative?: boolean }

export class ZwtTween {
    constructor(target: mw.GameObject | mw.Widget) {
        this._targetObj = target
    }

    isStart: boolean = false
    isPause: boolean = false
    curTweens: Map<number, Tween<any>> = new Map()
    tweenInss: TweenIns[] = []
    private _targetObj: mw.GameObject | mw.Widget
    tweenId: number = 0

    getTarget() {
        return this._targetObj
    }

    /**开始 */
    start() {
        if (this.isStart) return
        this.isStart = true
        this._start()
        return this
    }

    /**停止,无法再继续 */
    stop() {
        this.isStart = false
        this.isPause = false
        this.curTweens.forEach((v, k) => {
            v.stop()
        })
    }

    /**暂停 */
    pause() {
        if (this.isStart) {
            this.isPause = true
            this.curTweens.forEach((v, k) => {
                v.pause()
            })
        }
    }

    /**继续 */
    resume() {
        if (this.isStart) {
            if (this.isPause) {
                this.isPause = false
                this.curTweens.forEach((v, k) => {
                    v.resume()
                })
            }
        } else {
            this.start()
        }
    }

    /**清理，停止并清空动画数据 */
    async clear() {
        this.stop()
        return new Promise<void>((res, rej) => {
            setTimeout(() => {
                this.tweenInss = []
                this.curTweens = new Map()
                this.tweenId = 0
                res()
            }, 1);
        })
    }

    private async _start() {
        let repeatStart = false
        let curRepeatCount = 0
        for (let i = 0; i < this.tweenInss.length; i++) {
            if (!this._targetObj) {
                this.clear()
                return
            }
            if (!this.isStart) {
                return
            }
            let anim = this.tweenInss[i]
            switch (anim.animName) {
                case this._moveTo.name:
                    if (anim.isAsync)
                        this._moveTo(anim.param[0], anim.param[1], anim.easing, anim.relative)
                    else
                        await this._moveTo(anim.param[0], anim.param[1], anim.easing, anim.relative)
                    break;
                case this._moveBy.name:
                    if (anim.isAsync)
                        this._moveBy(anim.param[0], anim.param[1], anim.easing, anim.relative)
                    else
                        await this._moveBy(anim.param[0], anim.param[1], anim.easing, anim.relative)
                    break
                case this._scaleTo.name:
                    if (anim.isAsync)
                        this._scaleTo(anim.param[0], anim.param[1], anim.easing, anim.relative)
                    else
                        await this._scaleTo(anim.param[0], anim.param[1], anim.easing, anim.relative)
                    break
                case this._rotateTo.name:
                    if (anim.isAsync)
                        this._rotateTo(anim.param[0], anim.param[1], anim.easing)
                    else
                        await this._rotateTo(anim.param[0], anim.param[1], anim.easing)
                    break
                case this._UIopacityTo.name:
                    if (anim.isAsync)
                        this._UIopacityTo(anim.param[0], anim.param[1], anim.easing)
                    else
                        await this._UIopacityTo(anim.param[0], anim.param[1], anim.easing)
                    break
                case this._call.name:
                    this._call(anim.param[0])
                    break
                case this._repeat.name:
                    if (anim.param[0] == 0 || anim.param[1] == 0) break

                    if (repeatStart) {//为true说明正在循环中，需要判断已循环次数
                        if (curRepeatCount == 0) {
                            repeatStart = false
                            break
                        }
                    } else {//为false说明刚进循环
                        repeatStart = true
                        curRepeatCount = anim.param[1]
                    }
                    if (curRepeatCount != -1) curRepeatCount--
                    i -= (anim.param[0] + 1)
                    if (i < -1) i = -1
                    break
                case this._delay.name:
                    await this._delay(anim.param[0])
                    break
                default:
                    break;
            }
        }
        this.isStart = false
        this.isPause = false
    }

    private async _moveTo(pos: mw.Vector | mw.Vector2, time: number, easing: EasingFunction, relative: boolean) {
        let startValue: mw.Vector | mw.Vector2 = null
        if (relative) {
            if (this._targetObj instanceof mw.GameObject)
                startValue = this._targetObj.localTransform.position.clone()
            else
                startValue = this._targetObj.position.clone()
        } else {
            if (this._targetObj instanceof mw.GameObject)
                startValue = this._targetObj.worldTransform.position.clone()
            else
                startValue = getUIAbsolutePos(this._targetObj)
        }

        await this._createTween(startValue, pos, time, easing, (p) => {
            if (relative) {
                if (this._targetObj instanceof mw.GameObject)
                    this._targetObj.localTransform.position = (p)
                else {
                    this._targetObj.position = p
                }
            } else {
                if (this._targetObj instanceof mw.GameObject)
                    this._targetObj.worldTransform.position = p
                else
                    this._targetObj.position = p
            }
        })
    }

    private async _scaleTo(pos: mw.Vector | mw.Vector2, time: number, easing: EasingFunction, relative: boolean) {
        let startValue: mw.Vector | mw.Vector2 = null
        if (relative) {
            if (this._targetObj instanceof mw.GameObject)
                startValue = this._targetObj.localTransform.scale
            else
                startValue = this._targetObj.renderScale
        } else {
            if (this._targetObj instanceof mw.GameObject)
                startValue = this._targetObj.worldTransform.scale
            else
                startValue = this._targetObj.renderScale
        }
        await this._createTween(startValue, pos, time, easing, (p) => {
            if (relative) {
                if (this._targetObj instanceof mw.GameObject)
                    this._targetObj.localTransform.scale = (p)
                else
                    this._targetObj.renderScale = p
            } else {
                if (this._targetObj instanceof mw.GameObject)
                    this._targetObj.worldTransform.scale = p
                else
                    this._targetObj.renderScale = p
            }
        })
    }

    private async _rotateTo(rotation: mw.Rotation | number, time: number, easing: EasingFunction) {
        await this._createTween((this._targetObj instanceof mw.GameObject) ? this._targetObj.localTransform.rotation : { rotation: this._targetObj.renderTransformAngle },
            (this._targetObj instanceof mw.GameObject) ? rotation : { rotation: rotation }, time, easing,
            (p) => {
                (this._targetObj instanceof mw.GameObject) ? this._targetObj.localTransform.rotation = (p) : this._targetObj.renderTransformAngle = p.rotation
            })
    }

    private async _moveBy(pos: mw.Vector | mw.Vector2, time: number, easing: EasingFunction, relative: boolean) {
        let startValue: mw.Vector | mw.Vector2 = null
        let endValue: mw.Vector | mw.Vector2 = null
        if (relative) {
            if (this._targetObj instanceof mw.GameObject)
                startValue = this._targetObj.localTransform.position.clone()
            else
                startValue = this._targetObj.position.clone()
        } else {
            if (this._targetObj instanceof mw.GameObject)
                startValue = this._targetObj.worldTransform.position.clone()
            else
                startValue = getUIAbsolutePos(this._targetObj).clone()
        }
        if ((pos instanceof mw.Vector) && (startValue instanceof mw.Vector)) {
            endValue = pos.clone().add(startValue)
        } else if ((pos instanceof mw.Vector2) && (startValue instanceof mw.Vector2)) {
            endValue = pos.clone().add(startValue)
        }
        await this._createTween(startValue, endValue, time, easing, (p: any) => {
            if (relative) {
                if (this._targetObj instanceof mw.GameObject)
                    this._targetObj.localTransform.position = (p)
                else {
                    this._targetObj.position = p
                }
            } else {
                if (this._targetObj instanceof mw.GameObject)
                    this._targetObj.worldTransform.position = p
                else
                    this._targetObj.position = getUIAbsolutePos(this._targetObj)
            }
        })
    }

    private async _UIopacityTo(opacity: number, time: number, easing: EasingFunction) {
        let startValue: { opacity: number }
        let endValue: { opacity: number } = { opacity: opacity }
        if (this._targetObj instanceof mw.Widget)
            startValue = { opacity: this._targetObj.renderOpacity }
        await this._createTween<{ opacity: number }>(startValue, endValue, time, easing, (p: any) => {
            if (this._targetObj instanceof mw.Widget)
                this._targetObj.renderOpacity = p.opacity
        })
    }

    /**
     * 通用tween的创建 
     */
    private _createTween<T>(startValue: T, endValue: T, time: number, easing: EasingFunction, updateCall: Function) {
        return new Promise<Tween<T>>((res, rej) => {
            let tweenId = this.tweenId++
            let tween = new Tween<T>(startValue).to(endValue).duration(time * 1000).easing(easing).onUpdate((p) => {
                if (this.isStart) {
                    updateCall(p)
                } else {
                    tween.stop()
                }
            }).onComplete(() => {
                this.curTweens.delete(tweenId)
                res(tween)
            }).onStop(() => {
                this.curTweens.delete(tweenId)
                res(tween)
            })
            if (this.isStart) {
                tween.start()
                this.curTweens.set(tweenId, tween)
            } else {
                tween.stop()
            }
        })
    }

    private async _call(call: Function) {
        call()
    }

    private async _repeat() {

    }

    private async _delay(time: number): Promise<void> {
        return new Promise<void>((res, rej) => {
            if (time <= 0) {
                res()
                return
            }
            time *= 1000
            let curTime = 0
            let lastTimestamp = Date.now()
            let interval = setInterval(() => {
                if (!this.isPause) {
                    let nowTime = Date.now()
                    curTime += (nowTime - lastTimestamp)
                    lastTimestamp = nowTime
                }
                if (!this.isStart || curTime >= time) {
                    clearInterval(interval)
                    res()
                    return
                }
            }, 1)
        })
    }

    /**
     * 移动固定位置 
     */
    moveTo(pos: mw.Vector | mw.Vector2, time: number, relative: boolean = false, easing?: EasingFunction, isAsync: boolean = false) {
        if (!easing) easing = TweenUtil.Easing.Linear.None
        let anim: TweenIns = { animName: this._moveTo.name, param: [pos, time], easing: easing, isAsync: isAsync, relative: relative }
        this.tweenInss.push(anim)
        return this
    }

    /**
     * 缩放到固定大小 
     */
    scaleTo(targetScale: mw.Vector | mw.Vector2, time: number, relative: boolean = false, easing?: EasingFunction, isAsync: boolean = false) {
        if (!easing) easing = TweenUtil.Easing.Linear.None
        let anim: TweenIns = { animName: this._scaleTo.name, param: [targetScale, time], easing: easing, isAsync: isAsync, relative: relative }
        this.tweenInss.push(anim)
        return this
    }

    /**
     * 旋转到固定值--只适用相对旋转 
     */
    rotateTo(rotation: mw.Rotation | number, time: number, easing?: EasingFunction, isAsync: boolean = false) {
        if (!easing) easing = TweenUtil.Easing.Linear.None
        let anim: TweenIns = { animName: this._rotateTo.name, param: [rotation, time], easing, isAsync, relative: true }
        this.tweenInss.push(anim)
        return this
    }

    /**
     * 移动固定距离 
     */
    moveBy(pos: mw.Vector | mw.Vector2, time: number, relative: boolean = false, easing?: EasingFunction, isAsync: boolean = false) {
        if (!easing) easing = TweenUtil.Easing.Linear.None
        let anim: TweenIns = { animName: this._moveBy.name, param: [pos, time], easing: easing, isAsync: isAsync, relative: relative }
        this.tweenInss.push(anim)
        return this
    }

    /**设置UI不透明度 */
    UIOpacityTo(opacity: number, time: number, easing?: EasingFunction, isAsync: boolean = false) {
        if (!easing) easing = TweenUtil.Easing.Linear.None
        let anim: TweenIns = { animName: this._UIopacityTo.name, param: [opacity, time], easing: easing, isAsync: isAsync }
        this.tweenInss.push(anim)
        return this
    }

    /**
     * 回调 
     */
    call(fun: Function) {
        let anim: TweenIns = { animName: this._call.name, param: [fun], isAsync: false }
        this.tweenInss.push(anim)
        return this
    }

    /**
     * 重复
     * @param cycleRandom 循环范围，会将前面几次动作重复
     * @param count 取-1时为无限循环
     * @returns 
     */
    repeat(cycleRandom: number, count: number) {
        let anim: TweenIns = { animName: this._repeat.name, param: [cycleRandom, count], isAsync: false }
        this.tweenInss.push(anim)
        return this
    }

    /**
     * 等待
     */
    delay(time: number) {
        let anim: TweenIns = { animName: this._delay.name, param: [time], isAsync: false }
        this.tweenInss.push(anim)
        return this
    }
}

/**获取ui绝对坐标 */
export function getUIAbsolutePos(widget: mw.Widget) {
    let result = widget.position.clone()
    let curUI = widget
    while (curUI.parent) {
        curUI = curUI.parent
        result = result.add(curUI.position)
    }
    return result
}