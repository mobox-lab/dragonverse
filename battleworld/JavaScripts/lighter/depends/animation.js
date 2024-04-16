class AnimationManager {
    constructor() {
        this._anims = [];
        this._crossFades = [];
        this._delayEvents = [];
    }
    addCrossFade(crossFade) {
        const index = this._crossFades.indexOf(crossFade);
        if (index === -1) {
            this._crossFades.push(crossFade);
        }
    }
    removeCrossFade(crossFade) {
        const index = this._crossFades.indexOf(crossFade);
        if (index >= 0) {
            this._crossFades.splice(index, 1);
        }
    }
    addAnimation(anim) {
        const index = this._anims.indexOf(anim);
        if (index === -1) {
            this._anims.push(anim);
        }
    }
    removeAnimation(anim) {
        const index = this._anims.indexOf(anim);
        if (index >= 0) {
            this._anims.splice(index, 1);
        }
        else {
            console.warn(`AnimationManager.removeAnimation: animation not found.`);
        }
    }
    pushDelayEvent(fn, thisArg, args) {
        this._delayEvents.push({
            fn,
            thisArg,
            args,
        });
    }
    update(dt) {
        const { _delayEvents } = this;
        { // Update cross fades
            const crossFades = this._crossFades;
            for (const crossFade of crossFades) {
                crossFade.update(dt);
            }
        }
        for (const anim of this._anims) {
            anim.update(dt);
        }
        for (let i = 0, l = _delayEvents.length; i < l; i++) {
            const event = _delayEvents[i];
            event.fn.apply(event.thisArg, event.args);
        }
        _delayEvents.length = 0;
    }
}

let animationMgr;
function getGlobalAnimationManager() {
    if (!animationMgr) {
        animationMgr = new AnimationManager();
    }
    return animationMgr;
}

class Playable {
    constructor() {
        this._isPlaying = false;
        this._isPaused = false;
        this._stepOnce = false;
    }
    get isPlaying() {
        return this._isPlaying;
    }
    get isPaused() {
        return this._isPaused;
    }
    get isMotionless() {
        return !this.isPlaying || this.isPaused;
    }
    play() {
        if (this._isPlaying) {
            if (this._isPaused) {
                this._isPaused = false;
                this.onResume();
            }
            else {
                this.onError('repeat playing');
            }
        }
        else {
            this._isPlaying = true;
            this.onPlay();
        }
    }
    stop() {
        if (this._isPlaying) {
            this._isPlaying = false;
            this.onStop();
            this._isPaused = false;
        }
    }
    pause() {
        if (this._isPlaying && !this._isPaused) {
            this._isPaused = true;
            this.onPause();
        }
    }
    resume() {
        if (this._isPlaying && this._isPaused) {
            this._isPaused = false;
            this.onResume();
        }
    }
    step() {
        this.pause();
        this._stepOnce = true;
        if (!this._isPlaying) {
            this.play();
        }
    }
    update(deltaTime) {
    }
    onPlay() {
    }
    onPause() {
    }
    onResume() {
    }
    onStop() {
    }
    onError(message) {
    }
}

var WrapModeMask;
(function (WrapModeMask) {
    WrapModeMask[WrapModeMask["Default"] = 0] = "Default";
    WrapModeMask[WrapModeMask["Normal"] = 1] = "Normal";
    WrapModeMask[WrapModeMask["Loop"] = 2] = "Loop";
    WrapModeMask[WrapModeMask["ShouldWrap"] = 4] = "ShouldWrap";
    WrapModeMask[WrapModeMask["Clamp"] = 8] = "Clamp";
    WrapModeMask[WrapModeMask["PingPong"] = 22] = "PingPong";
    WrapModeMask[WrapModeMask["Reverse"] = 36] = "Reverse";
})(WrapModeMask || (WrapModeMask = {}));
/**
 * 动画使用的循环模式。
 */
var WrapMode;
(function (WrapMode) {
    /**
     * 向 Animation Component 或者 AnimationClip 查找 wrapMode
     */
    WrapMode[WrapMode["Default"] = 0] = "Default";
    /**
     * 动画只播放一遍
     */
    WrapMode[WrapMode["Normal"] = 1] = "Normal";
    /**
     * 从最后一帧或结束位置开始反向播放，到第一帧或开始位置停止
     */
    WrapMode[WrapMode["Reverse"] = 36] = "Reverse";
    /**
     * 循环播放
     */
    WrapMode[WrapMode["Loop"] = 2] = "Loop";
    /**
     * 反向循环播放
     */
    WrapMode[WrapMode["LoopReverse"] = 38] = "LoopReverse";
    /**
     * 从第一帧播放到最后一帧，然后反向播放回第一帧，到第一帧后再正向播放，如此循环
     */
    WrapMode[WrapMode["PingPong"] = 22] = "PingPong";
    /**
     * 从最后一帧开始反向播放，其他同 PingPong
     */
    WrapMode[WrapMode["PingPongReverse"] = 54] = "PingPongReverse";
})(WrapMode || (WrapMode = {}));
class WrappedInfo {
    constructor(info) {
        this.ratio = 0;
        this.time = 0;
        this.direction = 1;
        this.stopped = true;
        this.iterations = 0;
        this.frameIndex = undefined;
        if (info) {
            this.set(info);
        }
    }
    set(info) {
        this.ratio = info.ratio;
        this.time = info.time;
        this.direction = info.direction;
        this.stopped = info.stopped;
        this.iterations = info.iterations;
        this.frameIndex = info.frameIndex;
    }
}
/**
 * Animation 支持的事件类型。
 */
var EventType;
(function (EventType) {
    /**
     * 开始播放时触发。
     */
    EventType["PLAY"] = "play";
    /**
     * 停止播放时触发。
     */
    EventType["STOP"] = "stop";
    /**
     * 暂停播放时触发。
     */
    EventType["PAUSE"] = "pause";
    /**
     * 恢复播放时触发。
     */
    EventType["RESUME"] = "resume";
    /**
     * 假如动画循环次数大于 1，当动画播放到最后一帧时触发。
     */
    EventType["LASTFRAME"] = "lastframe";
    /**
     *
     * 动画完成播放时触发。
     */
    EventType["FINISHED"] = "finished";
})(EventType || (EventType = {}));

class AnimationState extends Playable {
    get clip() {
        return this._clip;
    }
    /**
     * @en The name of the playing animation.
     * @zh 动画的名字。
     */
    get name() {
        return this._name;
    }
    get length() {
        return this.duration;
    }
    get wrapMode() {
        return this._wrapMode;
    }
    set wrapMode(value) {
        this._wrapMode = value;
        this.time = 0;
        if (value & WrapModeMask.Loop) {
            this.repeatCount = Infinity;
        }
        else {
            this.repeatCount = 1;
        }
        this._clipEventEval?.setWrapMode(value);
    }
    /**
     * 迭代次数，指动画播放多少次后结束, normalize time。 如 2.5（2次半）。
     * @default 1
     */
    get repeatCount() {
        return this._repeatCount;
    }
    set repeatCount(value) {
        this._repeatCount = value;
        const shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;
        const reverse = (this.wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse;
        if (value === Infinity && !shouldWrap && !reverse) {
            this._useSimpleProcess = true;
        }
        else {
            this._useSimpleProcess = false;
        }
    }
    /**
     * 延迟多少秒播放。
     * @default 0
     */
    get delay() {
        return this._delay;
    }
    set delay(value) {
        this._delayTime = this._delay = value;
    }
    /**
     * 获取或设置播放范围。
     * 范围的 `min`、`max` 字段都是以秒为单位的。
     * 设置时，应当指定一个有效的范围；实际的播放范围是该字段和 [0, 周期] 之间的交集。
     * 设置播放范围时将重置累计播放时间。
     * 如果 `min === max`，该动画将一直在 `min` 处播放。
     */
    get playbackRange() {
        return this._playbackRange;
    }
    set playbackRange(value) {
        this._playbackRange.min = Math.max(value.min, 0);
        this._playbackRange.max = Math.min(value.max, this.duration);
        this._playbackDuration = this._playbackRange.max - this._playbackRange.min;
        this.time = 0.0;
    }
    /**
     * 播放速率。
     * @default: 1.0
     */
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }
    /**
     * 动画当前**累计播放**的时间，单位为秒。
     * @default 0
     */
    get time() {
        return this._time;
    }
    set time(time) {
        this._currentFramePlayed = false;
        this._time = time || 0.0;
        const info = this.getWrappedInfo(time, this._wrappedInfo);
        this._clipEventEval?.ignore(info.ratio, info.direction);
    }
    /**
     * @en Gets the time progress, in seconds.
     * @zh 获取动画的时间进度，单位为秒。
     */
    get current() {
        return this.getWrappedInfo(this.time).time;
    }
    /**
     * @zh 获取动画播放的比例时间。
     */
    get ratio() {
        return this.duration === 0.0 ? 0.0 : this.current / this.duration;
    }
    /**
     * 此动画状态的权重。
     */
    get weight() {
        return this._weight;
    }
    set weight(value) {
        this._weight = value;
    }
    constructor(clip, name = '') {
        super();
        /**
         * @zh 单次动画的持续时间，秒。（动画长度）
         * @readOnly
         */
        this.duration = 1.0;
        this._time = 0.0;
        this.frameRate = 0;
        this._targetNode = null;
        this._curveLoaded = false;
        this._speed = 1.0;
        this._useSimpleProcess = false;
        this._eventTarget = null;
        this._wrapMode = WrapMode.Normal;
        this._repeatCount = 1;
        this._delay = 0.0;
        this._delayTime = 0.0;
        this._currentFramePlayed = false;
        this._lastIterations = NaN;
        this._lastWrapInfo = null;
        this._wrappedInfo = new WrappedInfo();
        this._playbackDuration = 0.0;
        this._invDuration = 1.0;
        this._weight = 1.0;
        this._doNotCreateEval = false;
        this.setResetClip(clip, name);
    }
    setResetClip(clip, name = '') {
        this._clip = clip;
        this._name = name || (clip && clip.name);
        this._playbackRange = {
            min: 0.0,
            max: clip ? clip.duration : 0.0,
        };
        this._playbackDuration = clip ? clip.duration : 0.0;
        this._curveLoaded = false;
    }
    get curveLoaded() {
        return this._curveLoaded;
    }
    initialize(root, eventDispatcher) {
        if (this._curveLoaded) {
            return;
        }
        this._curveLoaded = true;
        if (this._clipEval) {
            this._clipEval.destroy();
            this._clipEval = undefined;
        }
        if (this._clipEventEval) {
            this._clipEventEval.destroy();
            this._clipEventEval = undefined;
        }
        this._eventTarget = eventDispatcher;
        this._targetNode = root;
        const clip = this._clip;
        this.duration = clip.duration;
        this._invDuration = 1.0 / this.duration;
        this._speed = clip.speed;
        this.wrapMode = clip.wrapMode;
        this.frameRate = clip.sample;
        this._playbackRange.min = 0.0;
        this._playbackRange.max = clip.duration;
        this._playbackDuration = clip.duration;
        if ((this.wrapMode & WrapModeMask.Loop) === WrapModeMask.Loop) {
            this.repeatCount = Infinity;
        }
        else {
            this.repeatCount = 1;
        }
        if (!this._doNotCreateEval) {
            this._clipEval = clip.createEvaluator({
                target: root,
            });
        }
        if (clip.containsAnyEvent()) {
            this._clipEventEval = clip.createEventEvaluator(eventDispatcher);
        }
    }
    destroy() {
        if (!this.isMotionless) {
            getGlobalAnimationManager().removeAnimation(this);
        }
        this._targetNode = null;
        this._eventTarget = null;
        this._clipEval?.destroy();
        this._clipEval = undefined;
        this._clipEventEval?.destroy();
        this._clipEventEval = undefined;
    }
    update(delta) {
        if (this._delayTime > 0.0) {
            this._delayTime -= delta;
            if (this._delayTime > 0.0) {
                // still waiting
                return;
            }
        }
        if (this._currentFramePlayed) {
            this._time += (delta * this._speed);
        }
        else {
            this._currentFramePlayed = true;
        }
        this._process();
    }
    sample() {
        const info = this.getWrappedInfo(this.time, this._wrappedInfo);
        this._sampleCurves(info.time);
        this._sampleEvents(info);
        return info;
    }
    onPlay() {
        this._time = (this._getPlaybackStart());
        this._delayTime = this._delay;
        this._onReplayOrResume();
        this.emit(EventType.PLAY, this);
    }
    onStop() {
        if (!this.isPaused) {
            this._onPauseOrStop();
        }
        this.emit(EventType.STOP, this);
    }
    onResume() {
        this._onReplayOrResume();
        this.emit(EventType.RESUME, this);
    }
    onPause() {
        this._onPauseOrStop();
        this.emit(EventType.PAUSE, this);
    }
    /**
     * @internal
     */
    _sampleCurves(time) {
        const { _clipEval: clipEval } = this;
        if (clipEval) {
            clipEval.evaluate(time);
        }
    }
    _process() {
        if (this._useSimpleProcess) {
            this.simpleProcess();
        }
        else {
            this.process();
        }
    }
    process() {
        // sample
        const info = this.sample();
        let lastInfo;
        if (!this._lastWrapInfo) {
            lastInfo = this._lastWrapInfo = new WrappedInfo(info);
        }
        else {
            lastInfo = this._lastWrapInfo;
        }
        if (this.repeatCount > 1 && ((info.iterations | 0) > (lastInfo.iterations | 0))) {
            this.emit(EventType.LASTFRAME, this);
        }
        lastInfo.set(info);
        if (info.stopped) {
            this.stop();
            this.emit(EventType.FINISHED, this);
        }
    }
    simpleProcess() {
        const playbackStart = this._playbackRange.min;
        const playbackDuration = this._playbackDuration;
        let time = 0.0;
        let ratio = 0.0;
        if (playbackDuration !== 0.0) {
            time = this.time % playbackDuration;
            if (time < 0.0) {
                time += playbackDuration;
            }
            const realTime = playbackStart + time;
            ratio = realTime * this._invDuration;
        }
        this._sampleCurves(playbackStart + time);
        if (this._clipEventEval) {
            const wrapInfo = this.getWrappedInfo(this.time, this._wrappedInfo);
            this._sampleEvents(wrapInfo);
        }
        if (Number.isNaN(this._lastIterations)) {
            this._lastIterations = ratio;
        }
        if ((this.time > 0 && this._lastIterations > ratio) || (this.time < 0 && this._lastIterations < ratio)) {
            this.emit(EventType.LASTFRAME, this);
        }
        this._lastIterations = ratio;
    }
    _needReverse(currentIterations) {
        const wrapMode = this.wrapMode;
        let needReverse = false;
        if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
            const isEnd = currentIterations - (currentIterations | 0) === 0;
            if (isEnd && (currentIterations > 0)) {
                currentIterations -= 1;
            }
            const isOddIteration = currentIterations & 1;
            if (isOddIteration) {
                needReverse = !needReverse;
            }
        }
        if ((wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse) {
            needReverse = !needReverse;
        }
        return needReverse;
    }
    getWrappedInfo(time, info) {
        info = info || new WrappedInfo();
        const { _playbackRange: { min: playbackStart, }, _playbackDuration: playbackDuration, } = this;
        const repeatCount = this.repeatCount;
        if (playbackDuration === 0.0) {
            info.time = 0.0;
            info.ratio = 0.0;
            info.direction = 1.0;
            info.stopped = !!Number.isFinite(repeatCount);
            info.iterations = 0.0;
            return info;
        }
        let stopped = false;
        time -= playbackStart;
        let currentIterations = time > 0 ? (time / playbackDuration) : -(time / playbackDuration);
        if (currentIterations >= repeatCount) {
            currentIterations = repeatCount;
            stopped = true;
            let tempRatio = repeatCount - (repeatCount | 0);
            if (tempRatio === 0) {
                tempRatio = 1; // 如果播放过，动画不复位
            }
            time = tempRatio * playbackDuration * (time > 0 ? 1 : -1);
        }
        if (time > playbackDuration) {
            const tempTime = time % playbackDuration;
            time = tempTime === 0 ? playbackDuration : tempTime;
        }
        else if (time < 0) {
            time %= playbackDuration;
            if (time !== 0) {
                time += playbackDuration;
            }
        }
        let needReverse = false;
        const shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;
        if (shouldWrap) {
            needReverse = this._needReverse(currentIterations);
        }
        let direction = needReverse ? -1 : 1;
        if (this.speed < 0) {
            direction *= -1;
        }
        // calculate wrapped time
        if (shouldWrap && needReverse) {
            time = playbackDuration - time;
        }
        info.time = playbackStart + time;
        info.ratio = info.time / this.duration;
        info.direction = direction;
        info.stopped = stopped;
        info.iterations = currentIterations;
        return info;
    }
    _getPlaybackStart() {
        return this._playbackRange.min;
    }
    _sampleEvents(wrapInfo) {
        this._clipEventEval?.sample(wrapInfo.ratio, wrapInfo.direction, wrapInfo.iterations);
    }
    emit(type, state) {
        if (this._eventTarget) {
            this._eventTarget.onAnimationLifeEvent.call(type, state);
        }
    }
    _onReplayOrResume() {
        getGlobalAnimationManager().addAnimation(this);
    }
    _onPauseOrStop() {
        getGlobalAnimationManager().removeAnimation(this);
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var TrackPath_1, TrackBinding_1;
const createEvalSymbol = Symbol('CreateEval');
const trackBindingTag = Symbol('TrackBinding');
var PathType;
(function (PathType) {
    PathType[PathType["Hierarchy"] = 0] = "Hierarchy";
    PathType[PathType["Script"] = 1] = "Script";
    PathType[PathType["Element"] = 2] = "Element";
    PathType[PathType["Property"] = 3] = "Property";
    PathType[PathType["Function"] = 4] = "Function";
    PathType[PathType["SimulateProxy"] = 5] = "SimulateProxy";
})(PathType || (PathType = {}));
const normalizedFollowTag = Symbol('NormalizedFollow');
/**
 * 描述一条轨道如何寻址其目标对象。
 */
let TrackPath = TrackPath_1 = class TrackPath {
    constructor() {
        this._paths = [];
    }
    get length() {
        return this._paths.length;
    }
    toString() {
        let ret = '';
        for (let i = 0; i < this._paths.length; i++) {
            const pathInfo = this._paths[i];
            if (i !== 0) {
                ret += '.';
            }
            ret += `${pathInfo.type}:${pathInfo.name}`;
        }
        return ret;
    }
    combine(path) {
        this._paths.unshift(...path._paths);
        return this;
    }
    toProperty(name, alias) {
        this._paths.push({ type: PathType.Property, name: name, alias: alias ? alias : name });
        return this;
    }
    toHierarchy(name) {
        this._paths.push({ type: PathType.Hierarchy, name: name });
        return this;
    }
    toScript(name) {
        this._paths.push({ type: PathType.Script, name: name });
        return this;
    }
    toElement(name) {
        this._paths.push({ type: PathType.Element, name: name.toString() });
        return this;
    }
    toFunction(name, alias) {
        this._paths.push({ type: PathType.Function, name: name, alias: alias ? alias : name });
        return this;
    }
    toSimulateProxy(name, alias) {
        this._paths.push({ type: PathType.SimulateProxy, name: name, alias: alias ? alias : name });
        return this;
    }
    isPropertyAt(index) {
        return this._paths[index].type === PathType.Property;
    }
    isElementAt(index) {
        return this._paths[index].type === PathType.Element;
    }
    isSimulateProxy(index) {
        return this._paths[index].type === PathType.SimulateProxy;
    }
    isHierarchyAt(index) {
        return this._paths[index].type === PathType.Hierarchy;
    }
    isFunctionAt(index) {
        return this._paths[index].type === PathType.Function;
    }
    parsePropertyAt(index) {
        return this._paths[index].name;
    }
    parseElementAt(index) {
        return Number(this._paths[index].name);
    }
    parseHierarchyAt(index) {
        return this._paths[index].name;
    }
    getAlias(index) {
        if (index < 0 || index >= this._paths.length) {
            return undefined;
        }
        return this._paths[index].alias ? this._paths[index].alias : this._paths[index].name;
    }
    getAllAlias() {
        let ret = '';
        for (let i = 0; i < this._paths.length; i++) {
            if (i !== 0) {
                ret += '.';
            }
            ret += this.getAlias(i);
        }
        return ret;
    }
    equal(b) {
        return TrackPath_1.equals(this, b);
    }
    from(path) {
        this._paths.length = 0;
        this._paths = JSON.parse(path);
    }
    clone() {
        const path = new TrackPath_1();
        path._paths = this._paths.slice();
        return path;
    }
    getHierarchyDepth() {
        let depth = 0;
        for (let i = 0; i < this._paths.length; i++) {
            if (!this.isHierarchyAt(i)) {
                break;
            }
            depth++;
        }
        return depth;
    }
    static equals(a, b) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; ++i) {
            const pathInfoFromA = a._paths[i];
            const pathInfoFromB = b._paths[i];
            if (pathInfoFromA.type !== pathInfoFromB.type) {
                return false;
            }
            if (pathInfoFromA.name !== pathInfoFromB.name) {
                return false;
            }
        }
        return true;
    }
    clear() {
        this._paths.length = 0;
    }
    [normalizedFollowTag](root, beginIndex, endIndex) {
        const { _paths: paths } = this;
        let result = root;
        for (let iPath = beginIndex; iPath < endIndex; ++iPath) {
            const path = paths[iPath];
            switch (path.type) {
                case PathType.Hierarchy:
                    result = this.getHierarchy(result, path.name);
                    break;
                case PathType.Script:
                    result = this.getScript(result, path.name);
                    break;
                case PathType.Element:
                    result = result[path.name];
                    break;
                case PathType.Property:
                    result = result[path.name];
                    break;
                case PathType.Function:
                    result = result[path.name]();
                    break;
            }
            if (result === null) {
                break;
            }
        }
        return result;
    }
    getHierarchy(root, name) {
        if ('getChildByName' in root) {
            return root.getChildByName(name);
        }
        return root[name];
    }
    getScript(root, name) {
        if (root instanceof mw.GameObject) {
            const components = root.getComponents();
            for (const component of components) {
                if (Object.getPrototypeOf(component.constructor).name === name) {
                    return component;
                }
            }
            return null;
        }
        return root[name];
    }
};
__decorate([
    lighter.decorators.serializable
], TrackPath.prototype, "_paths", void 0);
TrackPath = TrackPath_1 = __decorate([
    lighter.decorators.tsclass("mwanim.TrackPath")
], TrackPath);
/**
 * 在运行时，将一条轨道绑定到其目标对象。
 */
let TrackBinding = TrackBinding_1 = class TrackBinding {
    constructor() {
        this.path = new TrackPath();
    }
    createRuntimeBinding(target) {
        const { path, proxy } = this;
        const nPaths = path.length;
        const iLastPath = nPaths - 1;
        if (nPaths !== 0 && (path.isPropertyAt(iLastPath) || path.isElementAt(iLastPath)) && !proxy) {
            const lastPropertyKey = path.isPropertyAt(iLastPath)
                ? path.parsePropertyAt(iLastPath)
                : path.parseElementAt(iLastPath);
            const resultTarget = path[normalizedFollowTag](target, 0, nPaths - 1);
            if (resultTarget === null) {
                return null;
            }
            let animationFunction = TrackBinding_1._animationFunctions.get(resultTarget.constructor);
            if (!animationFunction) {
                animationFunction = new Map();
                TrackBinding_1._animationFunctions.set(resultTarget.constructor, animationFunction);
            }
            let accessor = animationFunction.get(lastPropertyKey);
            if (!accessor) {
                accessor = {
                    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
                    setValue: Function('value', `this.target.${lastPropertyKey} = value;`),
                    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
                    getValue: Function(`return this.target.${lastPropertyKey};`),
                };
                animationFunction.set(lastPropertyKey, accessor);
            }
            let setValue = accessor.setValue;
            let getValue = accessor.getValue;
            return {
                target: resultTarget,
                setValue,
                getValue,
            };
        }
        else if (!proxy) {
            return null;
        }
        else {
            let resultTarget;
            if (path.isSimulateProxy(iLastPath)) {
                resultTarget = path[normalizedFollowTag](target, 0, nPaths - 1);
                if (is(proxy, 'simulateParameterName')) {
                    proxy.simulateParameterName = path.parsePropertyAt(iLastPath);
                }
                else {
                    return null;
                }
            }
            if (path.isFunctionAt(iLastPath)) {
                resultTarget = path[normalizedFollowTag](target, 0, nPaths - 1);
            }
            else {
                resultTarget = path[normalizedFollowTag](target, 0, nPaths);
            }
            if (resultTarget === null) {
                return null;
            }
            const runtimeProxy = proxy.forTarget(resultTarget);
            if (!runtimeProxy) {
                return null;
            }
            const binding = {
                setValue: (value) => {
                    runtimeProxy.set(value);
                },
            };
            const proxyGet = runtimeProxy.get;
            if (proxyGet) {
                binding.getValue = () => proxyGet.call(runtimeProxy);
            }
            return binding;
        }
    }
};
TrackBinding._animationFunctions = new WeakMap();
__decorate([
    lighter.decorators.serializable
], TrackBinding.prototype, "path", void 0);
__decorate([
    lighter.decorators.serializable
], TrackBinding.prototype, "proxy", void 0);
TrackBinding = TrackBinding_1 = __decorate([
    lighter.decorators.tsclass("mwanim.TrackBinding")
], TrackBinding);
/**
 * AnimationClip的基础组成部分,一个track对应了一条属性的变化曲线
 */
let Track = class Track {
    constructor() {
        this._binding = new TrackBinding();
    }
    get path() {
        return this._binding.path;
    }
    set path(value) {
        this._binding.path = value;
    }
    /**
     * 目标的值代理。
     */
    get proxy() {
        return this._binding.proxy;
    }
    set proxy(value) {
        this._binding.proxy = value;
    }
    /**
     * @internal
     */
    get [trackBindingTag]() {
        return this._binding;
    }
    /**
     *  此轨道上的通道。
     */
    channels() {
        return [];
    }
    /**
     * 此轨道的时间范围。
     */
    range() {
        const range = { min: Infinity, max: -Infinity };
        for (const channel of this.channels()) {
            range.min = Math.min(range.min, channel.curve.minRange);
            range.max = Math.max(range.max, channel.curve.maxRange);
        }
        return range;
    }
};
__decorate([
    lighter.decorators.serializable
], Track.prototype, "_binding", void 0);
Track = __decorate([
    lighter.decorators.tsclass("mwanim.Track")
], Track);
let Channel = class Channel {
    constructor(curve) {
        this.name = '';
        this._curve = curve;
    }
    /**
     * 通道中的曲线。
     */
    get curve() {
        return this._curve;
    }
    set curve(value) {
        this._curve = value;
    }
};
__decorate([
    lighter.decorators.serializable
], Channel.prototype, "name", void 0);
__decorate([
    lighter.decorators.serializable
], Channel.prototype, "_curve", void 0);
Channel = __decorate([
    lighter.decorators.tsclass("mwanim.Channel")
], Channel);
let SingleChannelTrack = class SingleChannelTrack extends Track {
    constructor() {
        super();
        this._channel = null;
        this._channel = new Channel(this.createCurve());
    }
    /**
     * 轨道包含的通道。
     */
    get channel() {
        return this._channel;
    }
    channels() {
        return [this._channel];
    }
    /**
     * @internal
     */
    [createEvalSymbol]() {
        const { curve } = this._channel;
        return new SingleChannelTrackEval(curve);
    }
};
// 因为要回去属性的默认值,所以需要初始化一个实例.. 抽象类先只能这么解决了
SingleChannelTrack.dotNotInstanceMe = true;
__decorate([
    lighter.decorators.serializable
], SingleChannelTrack.prototype, "_channel", void 0);
SingleChannelTrack = __decorate([
    lighter.decorators.tsclass("mwanim.SingleChannelTrack")
], SingleChannelTrack);
class SingleChannelTrackEval {
    constructor(_curve) {
        this._curve = _curve;
    }
    get requiresDefault() {
        return false;
    }
    evaluate(time) {
        return this._curve.evaluate(time);
    }
}
function is(value, type) {
    return type in value;
}

/**
 
 *  没有任何缓动效果。
 */
function constant() {
    return 0;
}
/**
 *  线性函数，`f(k) = k`。返回值和输入值一一对应。
 */
function linear(k) {
    return k;
}
/**
 *  一个二次方的函数，f(k) = k * k。插值开始时很慢，然后逐渐加快，直到结束，并突然停止。
 */
function quadIn(k) {
    return k * k;
}
/**
 *  一个二次方的函数，f(k) = k * (2-k)。插值开始时很突然，然后在接近尾声时逐渐减慢。
 */
function quadOut(k) {
    return k * (2 - k);
}
/**
 *  插值开始时很慢，接着加快，然后在接近尾声时减慢。
 */
function quadInOut(k) {
    k *= 2;
    if (k < 1) {
        return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
}
/**
 *  启动慢，加速快。
 */
function cubicIn(k) {
    return k * k * k;
}
/**
 
 *  起动迅速，减速慢。
 */
function cubicOut(k) {
    return --k * k * k + 1;
}
/**
 
 *  在开始时加速动画，在结束时减慢动画的速度。
 */
function cubicInOut(k) {
    k *= 2;
    if (k < 1) {
        return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
}
/**
 *  启动慢，加速快。
 */
function quartIn(k) {
    return k * k * k * k;
}
/**
 
 *  起动迅速，减速慢。
 */
function quartOut(k) {
    return 1 - (--k * k * k * k);
}
/**
 *  在开始时加速动画，在结束时减慢动画的速度。
 */
function quartInOut(k) {
    k *= 2;
    if (k < 1) {
        return 0.5 * k * k * k * k;
    }
    return -0.5 * ((k -= 2) * k * k * k - 2);
}
/**
 *  启动慢，加速快。
 */
function quintIn(k) {
    return k * k * k * k * k;
}
/**
 *  起动迅速，减速慢。
 */
function quintOut(k) {
    return --k * k * k * k * k + 1;
}
/**
 *  在开始时加速动画，在结束时减慢动画的速度。
 */
function quintInOut(k) {
    k *= 2;
    if (k < 1) {
        return 0.5 * k * k * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k * k * k + 2);
}
/**
 *  平滑地加速动画。
 */
function sineIn(k) {
    if (k === 1) {
        return 1;
    }
    return 1 - Math.cos(k * Math.PI / 2);
}
/**
 *  平滑地使动画降速。
 */
function sineOut(k) {
    return Math.sin(k * Math.PI / 2);
}
/**
 *  在开始时平滑地加速动画，在结束时平滑地减速动画。
 */
function sineInOut(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
}
/**
 *  启动慢，加速快
 */
function expoIn(k) {
    return k === 0 ? 0 : Math.pow(1024, k - 1);
}
/**
 *  起动迅速，减速慢。
 */
function expoOut(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
}
/**
 *  在开始时加速动画，在结束时减慢动画的速度。
 */
function expoInOut(k) {
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    k *= 2;
    if (k < 1) {
        return 0.5 * Math.pow(1024, k - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
}
/**

 *  启动慢，加速快。
 */
function circIn(k) {
    return 1 - Math.sqrt(1 - k * k);
}
/**
 
 *  起动迅速，减速慢。
 */
function circOut(k) {
    return Math.sqrt(1 - (--k * k));
}
/**
 
 *  在开始时加速动画，在结束时减慢动画的速度。
 */
function circInOut(k) {
    k *= 2;
    if (k < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
}
/**
 *
 */
function elasticIn(k) {
    let s;
    let a = 0.1;
    const p = 0.4;
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    }
    else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
}
/**
 *
 */
function elasticOut(k) {
    let s;
    let a = 0.1;
    const p = 0.4;
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    }
    else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
}
/**
 *
 */
function elasticInOut(k) {
    let s;
    let a = 0.1;
    const p = 0.4;
    if (k === 0) {
        return 0;
    }
    if (k === 1) {
        return 1;
    }
    if (!a || a < 1) {
        a = 1;
        s = p / 4;
    }
    else {
        s = p * Math.asin(1 / a) / (2 * Math.PI);
    }
    k *= 2;
    if (k < 1) {
        return -0.5
            * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
}
/**
 *
 */
function backIn(k) {
    if (k === 1) {
        return 1;
    }
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
}
/**
 *
 */
function backOut(k) {
    if (k === 0) {
        return 0;
    }
    const s = 1.70158;
    return --k * k * ((s + 1) * k + s) + 1;
}
/**
 *
 */
function backInOut(k) {
    const s = 1.70158 * 1.525;
    k *= 2;
    if (k < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
}
function bounceIn(k) {
    return 1 - bounceOut(1 - k);
}
/**
 *
 */
function bounceOut(k) {
    if (k < (1 / 2.75)) {
        return 7.5625 * k * k;
    }
    else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    }
    else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    }
    else {
        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
    }
}
/**
 *
 */
function bounceInOut(k) {
    if (k < 0.5) {
        return bounceIn(k * 2) * 0.5;
    }
    return bounceOut(k * 2 - 1) * 0.5 + 0.5;
}
/**
 *
 */
function smooth(k) {
    if (k <= 0) {
        return 0;
    }
    if (k >= 1) {
        return 1;
    }
    return k * k * (3 - 2 * k);
}
/**
 *
 */
function fade(k) {
    if (k <= 0) {
        return 0;
    }
    if (k >= 1) {
        return 1;
    }
    return k * k * k * (k * (k * 6 - 15) + 10);
}
/**
 *
 */
const quadOutIn = _makeOutIn(quadIn, quadOut);
/**
 *
 */
const cubicOutIn = _makeOutIn(cubicIn, cubicOut);
/**
 *
 */
const quartOutIn = _makeOutIn(quartIn, quartOut);
/**
 *
 */
const quintOutIn = _makeOutIn(quintIn, quintOut);
/**
 *
 */
const sineOutIn = _makeOutIn(sineIn, sineOut);
/**
 *
 */
const expoOutIn = _makeOutIn(expoIn, expoOut);
/**
 *
 */
const circOutIn = _makeOutIn(circIn, circOut);
/**
 *
 */
const elasticOutIn = _makeOutIn(elasticIn, elasticOut);
/**
 *
 */
const backOutIn = _makeOutIn(backIn, backOut);
/**
 *
 */
const bounceOutIn = _makeOutIn(bounceIn, bounceOut);
function _makeOutIn(fnIn, fnOut) {
    return (k) => {
        if (k < 0.5) {
            return fnOut(k * 2) / 2;
        }
        return fnIn(2 * k - 1) / 2 + 0.5;
    };
}

/**
 * @engineInternal
 */
var EasingMethod;
(function (EasingMethod) {
    EasingMethod[EasingMethod["LINEAR"] = 0] = "LINEAR";
    EasingMethod[EasingMethod["CONSTANT"] = 1] = "CONSTANT";
    EasingMethod[EasingMethod["QUAD_IN"] = 2] = "QUAD_IN";
    EasingMethod[EasingMethod["QUAD_OUT"] = 3] = "QUAD_OUT";
    EasingMethod[EasingMethod["QUAD_IN_OUT"] = 4] = "QUAD_IN_OUT";
    EasingMethod[EasingMethod["QUAD_OUT_IN"] = 5] = "QUAD_OUT_IN";
    EasingMethod[EasingMethod["CUBIC_IN"] = 6] = "CUBIC_IN";
    EasingMethod[EasingMethod["CUBIC_OUT"] = 7] = "CUBIC_OUT";
    EasingMethod[EasingMethod["CUBIC_IN_OUT"] = 8] = "CUBIC_IN_OUT";
    EasingMethod[EasingMethod["CUBIC_OUT_IN"] = 9] = "CUBIC_OUT_IN";
    EasingMethod[EasingMethod["QUART_IN"] = 10] = "QUART_IN";
    EasingMethod[EasingMethod["QUART_OUT"] = 11] = "QUART_OUT";
    EasingMethod[EasingMethod["QUART_IN_OUT"] = 12] = "QUART_IN_OUT";
    EasingMethod[EasingMethod["QUART_OUT_IN"] = 13] = "QUART_OUT_IN";
    EasingMethod[EasingMethod["QUINT_IN"] = 14] = "QUINT_IN";
    EasingMethod[EasingMethod["QUINT_OUT"] = 15] = "QUINT_OUT";
    EasingMethod[EasingMethod["QUINT_IN_OUT"] = 16] = "QUINT_IN_OUT";
    EasingMethod[EasingMethod["QUINT_OUT_IN"] = 17] = "QUINT_OUT_IN";
    EasingMethod[EasingMethod["SINE_IN"] = 18] = "SINE_IN";
    EasingMethod[EasingMethod["SINE_OUT"] = 19] = "SINE_OUT";
    EasingMethod[EasingMethod["SINE_IN_OUT"] = 20] = "SINE_IN_OUT";
    EasingMethod[EasingMethod["SINE_OUT_IN"] = 21] = "SINE_OUT_IN";
    EasingMethod[EasingMethod["EXPO_IN"] = 22] = "EXPO_IN";
    EasingMethod[EasingMethod["EXPO_OUT"] = 23] = "EXPO_OUT";
    EasingMethod[EasingMethod["EXPO_IN_OUT"] = 24] = "EXPO_IN_OUT";
    EasingMethod[EasingMethod["EXPO_OUT_IN"] = 25] = "EXPO_OUT_IN";
    EasingMethod[EasingMethod["CIRC_IN"] = 26] = "CIRC_IN";
    EasingMethod[EasingMethod["CIRC_OUT"] = 27] = "CIRC_OUT";
    EasingMethod[EasingMethod["CIRC_IN_OUT"] = 28] = "CIRC_IN_OUT";
    EasingMethod[EasingMethod["CIRC_OUT_IN"] = 29] = "CIRC_OUT_IN";
    EasingMethod[EasingMethod["ELASTIC_IN"] = 30] = "ELASTIC_IN";
    EasingMethod[EasingMethod["ELASTIC_OUT"] = 31] = "ELASTIC_OUT";
    EasingMethod[EasingMethod["ELASTIC_IN_OUT"] = 32] = "ELASTIC_IN_OUT";
    EasingMethod[EasingMethod["ELASTIC_OUT_IN"] = 33] = "ELASTIC_OUT_IN";
    EasingMethod[EasingMethod["BACK_IN"] = 34] = "BACK_IN";
    EasingMethod[EasingMethod["BACK_OUT"] = 35] = "BACK_OUT";
    EasingMethod[EasingMethod["BACK_IN_OUT"] = 36] = "BACK_IN_OUT";
    EasingMethod[EasingMethod["BACK_OUT_IN"] = 37] = "BACK_OUT_IN";
    EasingMethod[EasingMethod["BOUNCE_IN"] = 38] = "BOUNCE_IN";
    EasingMethod[EasingMethod["BOUNCE_OUT"] = 39] = "BOUNCE_OUT";
    EasingMethod[EasingMethod["BOUNCE_IN_OUT"] = 40] = "BOUNCE_IN_OUT";
    EasingMethod[EasingMethod["BOUNCE_OUT_IN"] = 41] = "BOUNCE_OUT_IN";
    EasingMethod[EasingMethod["SMOOTH"] = 42] = "SMOOTH";
    EasingMethod[EasingMethod["FADE"] = 43] = "FADE";
})(EasingMethod || (EasingMethod = {}));
const easingMethodFnMap = {
    [EasingMethod.CONSTANT]: constant,
    [EasingMethod.LINEAR]: linear,
    [EasingMethod.QUAD_IN]: quadIn,
    [EasingMethod.QUAD_OUT]: quadOut,
    [EasingMethod.QUAD_IN_OUT]: quadInOut,
    [EasingMethod.QUAD_OUT_IN]: quadOutIn,
    [EasingMethod.CUBIC_IN]: cubicIn,
    [EasingMethod.CUBIC_OUT]: cubicOut,
    [EasingMethod.CUBIC_IN_OUT]: cubicInOut,
    [EasingMethod.CUBIC_OUT_IN]: cubicOutIn,
    [EasingMethod.QUART_IN]: quartIn,
    [EasingMethod.QUART_OUT]: quartOut,
    [EasingMethod.QUART_IN_OUT]: quartInOut,
    [EasingMethod.QUART_OUT_IN]: quartOutIn,
    [EasingMethod.QUINT_IN]: quintIn,
    [EasingMethod.QUINT_OUT]: quintOut,
    [EasingMethod.QUINT_IN_OUT]: quintInOut,
    [EasingMethod.QUINT_OUT_IN]: quintOutIn,
    [EasingMethod.SINE_IN]: sineIn,
    [EasingMethod.SINE_OUT]: sineOut,
    [EasingMethod.SINE_IN_OUT]: sineInOut,
    [EasingMethod.SINE_OUT_IN]: sineOutIn,
    [EasingMethod.EXPO_IN]: expoIn,
    [EasingMethod.EXPO_OUT]: expoOut,
    [EasingMethod.EXPO_IN_OUT]: expoInOut,
    [EasingMethod.EXPO_OUT_IN]: expoOutIn,
    [EasingMethod.CIRC_IN]: circIn,
    [EasingMethod.CIRC_OUT]: circOut,
    [EasingMethod.CIRC_IN_OUT]: circInOut,
    [EasingMethod.CIRC_OUT_IN]: circOutIn,
    [EasingMethod.ELASTIC_IN]: elasticIn,
    [EasingMethod.ELASTIC_OUT]: elasticOut,
    [EasingMethod.ELASTIC_IN_OUT]: elasticInOut,
    [EasingMethod.ELASTIC_OUT_IN]: elasticOutIn,
    [EasingMethod.BACK_IN]: backIn,
    [EasingMethod.BACK_OUT]: backOut,
    [EasingMethod.BACK_IN_OUT]: backInOut,
    [EasingMethod.BACK_OUT_IN]: backOutIn,
    [EasingMethod.BOUNCE_IN]: bounceIn,
    [EasingMethod.BOUNCE_OUT]: bounceOut,
    [EasingMethod.BOUNCE_IN_OUT]: bounceInOut,
    [EasingMethod.BOUNCE_OUT_IN]: bounceOutIn,
    [EasingMethod.SMOOTH]: smooth,
    [EasingMethod.FADE]: fade,
};
function getEasingFn(easingMethod) {
    return easingMethodFnMap[easingMethod];
}

const EPSILON = 0.000001;
function repeat(t, length) {
    return t - Math.floor(t / length) * length;
}
function pingPong(t, length) {
    t = repeat(t, length * 2);
    t = length - Math.abs(t - length);
    return t;
}
function binarySearch(array, value) {
    return binarySearchEpsilon(array, value, 0);
}
function binarySearchEpsilon(array, value, EPSILON = 1e-6) {
    let low = 0;
    let high = array.length - 1;
    let middle = high >>> 1;
    for (; low <= high; middle = (low + high) >>> 1) {
        const test = array[middle];
        if (test > (value + EPSILON)) {
            high = middle - 1;
        }
        else if (test < (value - EPSILON)) {
            low = middle + 1;
        }
        else {
            return middle;
        }
    }
    return ~low;
}
function binarySearchBy(array, value, lessThan) {
    let low = 0;
    let high = array.length - 1;
    let middle = high >>> 1;
    for (; low <= high; middle = (low + high) >>> 1) {
        const test = array[middle];
        if (lessThan(test, value) < 0) {
            high = middle - 1;
        }
        else if (lessThan(test, value) > 0) {
            low = middle + 1;
        }
        else {
            return middle;
        }
    }
    return ~low;
}
function approx(a, b, maxDiff) {
    maxDiff = maxDiff || EPSILON;
    return Math.abs(a - b) <= maxDiff;
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function clamp01(value) {
    return clamp(value, 0, 1);
}

var math = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EPSILON: EPSILON,
    approx: approx,
    binarySearch: binarySearch,
    binarySearchBy: binarySearchBy,
    binarySearchEpsilon: binarySearchEpsilon,
    clamp: clamp,
    clamp01: clamp01,
    lerp: lerp,
    pingPong: pingPong,
    repeat: repeat
});

let KeyFrameCurve = class KeyFrameCurve {
    constructor() {
        this._times = [];
        this._values = [];
    }
    get minRange() {
        return this._times[0];
    }
    get maxRange() {
        return this._times[this._times.length - 1];
    }
    get length() {
        return this._times.length;
    }
    keyframes() {
        return this;
    }
    times() {
        return this._times;
    }
    values() {
        return this._values;
    }
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index >= this._times.length) {
                    return {
                        done: true,
                        value: undefined,
                    };
                }
                else {
                    const value = [this._times[index], this._values[index]];
                    ++index;
                    return {
                        done: false,
                        value,
                    };
                }
            },
        };
    }
    addKeyframe(time, value) {
        return this.internalAddKeyframe(time, value);
    }
    removeKeyframe(index) {
        this._times.splice(index, 1);
        this._values.splice(index, 1);
    }
    updateKeyframeTime(index, newTime) {
        const value = this._values[index];
        this.removeKeyframe(index);
        this.internalAddKeyframe(newTime, value);
    }
    findFrameIndexWithTime(time) {
        return binarySearchEpsilon(this._times, time);
    }
    clear() {
        this._times.length = 0;
        this._values.length = 0;
    }
    assignSorted(times, values) {
        if (values !== undefined) {
            this.setKeyframes(times.slice(), values.slice());
        }
        else {
            const keyframes = Array.from(times);
            this.setKeyframes(keyframes.map(([time]) => time), keyframes.map(([, value]) => value));
        }
    }
    searchKeyframe(time) {
        return binarySearchEpsilon(this._times, time);
    }
    setKeyframes(times, values) {
        this._times = times;
        this._values = values;
    }
    internalAddKeyframe(time, value) {
        const times = this._times;
        const values = this._values;
        const nFrames = times.length;
        const index = binarySearch(times, time);
        if (index >= 0) {
            return index;
        }
        const iNext = ~index;
        if (iNext === 0) {
            times.unshift(time);
            values.unshift(value);
        }
        else if (iNext === nFrames) {
            times.push(time);
            values.push(value);
        }
        else {
            times.splice(iNext, 0, time);
            values.splice(iNext, 0, value);
        }
        if (times[iNext + 1] !== undefined && times[iNext + 1] <= time) {
            console.error("error");
        }
        return iNext;
    }
};
__decorate([
    lighter.decorators.serializable
], KeyFrameCurve.prototype, "_times", void 0);
__decorate([
    lighter.decorators.serializable
], KeyFrameCurve.prototype, "_values", void 0);
KeyFrameCurve = __decorate([
    lighter.decorators.tsclass("mwanim.KeyFrameCurve")
], KeyFrameCurve);

/**
 * 在某关键帧（前一帧）和其下一帧之间插值时使用的插值方式。
 */
var RealInterpolationMode;
(function (RealInterpolationMode) {
    /**
     * 在前一帧和后一帧之间执行线性插值。
     */
    RealInterpolationMode[RealInterpolationMode["LINEAR"] = 0] = "LINEAR";
    /**
     * 永远使用前一帧的值。
     */
    RealInterpolationMode[RealInterpolationMode["CONSTANT"] = 1] = "CONSTANT";
    /**
     * 在前一帧和后一帧之间执行立方插值。
     */
    RealInterpolationMode[RealInterpolationMode["CUBIC"] = 2] = "CUBIC";
})(RealInterpolationMode || (RealInterpolationMode = {}));
/**
 * 在求值曲线时，指定当输入时间下溢（小于第一帧的时间）或上溢（大于最后一帧的时间）时应该如何推断结果值。
 */
var ExtrapolationMode;
(function (ExtrapolationMode) {
    /**
     * 下溢时，根据前两帧的线性趋势计算结果；上溢时，根据最后两帧的线性趋势计算结果。
     * 如果曲线帧数小于 2，回退到  `CLAMP`。
     */
    ExtrapolationMode[ExtrapolationMode["LINEAR"] = 0] = "LINEAR";
    /**
     * 下溢时，使用第一帧的值；上溢时，使用最后一帧的值。
     */
    ExtrapolationMode[ExtrapolationMode["CLAMP"] = 1] = "CLAMP";
    /**
     * 求值时将该曲线视作是无限连续循环的。
     */
    ExtrapolationMode[ExtrapolationMode["LOOP"] = 2] = "LOOP";
    /**
     * 求值时将该曲线视作是以“乒乓”的形式无限连续循环的。
     */
    ExtrapolationMode[ExtrapolationMode["PING_PONG"] = 3] = "PING_PONG";
})(ExtrapolationMode || (ExtrapolationMode = {}));
/**
 * 指定关键帧两侧的切线权重模式。
 */
var TangentWeightMode;
(function (TangentWeightMode) {
    /**
     * 关键帧的两侧都不携带切线权重信息。
     */
    TangentWeightMode[TangentWeightMode["NONE"] = 0] = "NONE";
    /**
     * 仅关键帧的左侧携带切线权重信息。
     */
    TangentWeightMode[TangentWeightMode["LEFT"] = 1] = "LEFT";
    /**
     * 仅关键帧的右侧携带切线权重信息。
     */
    TangentWeightMode[TangentWeightMode["RIGHT"] = 2] = "RIGHT";
    /**
     * 关键帧的两侧都携带切线权重信息。
     */
    TangentWeightMode[TangentWeightMode["BOTH"] = 3] = "BOTH";
})(TangentWeightMode || (TangentWeightMode = {}));

// cSpell:words Cardano's irreducibilis
/**
 * Solve Cubic Equation using Cardano's formula.
 * The equation is formed from coeff0 + coeff1 * x + coeff2 * x^2 + coeff3 * x^3 = 0.
 * Modified from https://github.com/erich666/GraphicsGems/blob/master/gems/Roots3And4.c .
 */
function solveCubic(coeff0, coeff1, coeff2, coeff3, solutions) {
    // normal form: x^3 + Ax^2 + Bx + C = 0
    const a = coeff2 / coeff3;
    const b = coeff1 / coeff3;
    const c = coeff0 / coeff3;
    // substitute x = y - A/3 to eliminate quadric term:
    // x^3 +px + q = 0
    const sqrA = a * a;
    const p = 1.0 / 3.0 * (-1.0 / 3 * sqrA + b);
    const q = 1.0 / 2.0 * (2.0 / 27.0 * a * sqrA - 1.0 / 3 * a * b + c);
    // use Cardano's formula
    const cubicP = p * p * p;
    const d = q * q + cubicP;
    let nSolutions = 0;
    if (isZero(d)) {
        if (isZero(q)) { // one triple solution
            solutions[0] = 0;
            return 1;
        }
        else { // one single and one double solution
            const u = Math.cbrt(-q);
            solutions[0] = 2 * u;
            solutions[1] = -u;
            return 2;
        }
    }
    else if (d < 0) { // Casus irreducibilis: three real solutions
        const phi = 1.0 / 3 * Math.acos(-q / Math.sqrt(-cubicP));
        const t = 2 * Math.sqrt(-p);
        solutions[0] = t * Math.cos(phi);
        solutions[1] = -t * Math.cos(phi + Math.PI / 3);
        solutions[2] = -t * Math.cos(phi - Math.PI / 3);
        nSolutions = 3;
    }
    else { // one real solution
        const sqrtD = Math.sqrt(d);
        const u = Math.cbrt(sqrtD - q);
        const v = -Math.cbrt(sqrtD + q);
        solutions[0] = u + v;
        nSolutions = 1;
    }
    const sub = 1.0 / 3 * a;
    for (let i = 0; i < nSolutions; ++i) {
        solutions[i] -= sub;
    }
    return nSolutions;
}
const EQN_EPS = 1e-9;
function isZero(x) {
    return x > -EQN_EPS && x < EQN_EPS;
}

var RealCurve_1;
var TangentMode;
(function (TangentMode) {
    TangentMode[TangentMode["Editable"] = 0] = "Editable";
    TangentMode[TangentMode["Smooth"] = 1] = "Smooth";
    TangentMode[TangentMode["Linear"] = 2] = "Linear";
    TangentMode[TangentMode["Stepped"] = 3] = "Stepped";
})(TangentMode || (TangentMode = {}));
const REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_START = 0;
const REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_MASK = 0xFF << REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_START;
const REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_START = 8;
const REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_MASK = 0xFF << REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_START;
const REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_START = 16;
const REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_MASK = 0xFF << REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_START;
const REAL_KEYFRAME_VALUE_DEFAULT_FLAGS = (RealInterpolationMode.LINEAR << REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_START)
    | (TangentWeightMode.NONE << REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_START)
    | (0 << REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_START);
let RealKeyFrame = class RealKeyFrame {
    constructor() {
        this._flags = REAL_KEYFRAME_VALUE_DEFAULT_FLAGS;
        this.value = 0;
        this.leftTangent = Number.POSITIVE_INFINITY;
        this.rightTangent = Number.POSITIVE_INFINITY;
        this.leftTangentWeight = 0;
        this.rightTangentWeight = 0;
        // only in editor
        this.tangentMode = 0;
    }
    get interpolationMode() {
        return (this._flags & REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_MASK) >> REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_START;
    }
    set interpolationMode(value) {
        this._flags &= ~REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_MASK;
        this._flags |= (value << REAL_KEYFRAME_VALUE_FLAGS_INTERPOLATION_MODE_START);
    }
    get tangentWeightMode() {
        return (this._flags & REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_MASK) >> REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_START;
    }
    set tangentWeightMode(value) {
        this._flags &= ~REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_MASK;
        this._flags |= (value << REAL_KEYFRAME_VALUE_FLAGS_TANGENT_WEIGHT_MODE_START);
    }
    get easingMethod() {
        return (this._flags & REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_MASK) >> REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_START;
    }
    set easingMethod(value) {
        this._flags &= ~REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_MASK;
        this._flags |= (value << REAL_KEYFRAME_VALUE_FLAGS_EASING_METHOD_START);
    }
};
__decorate([
    lighter.decorators.serializable
], RealKeyFrame.prototype, "_flags", void 0);
__decorate([
    lighter.decorators.serializable
], RealKeyFrame.prototype, "value", void 0);
__decorate([
    lighter.decorators.serializable
], RealKeyFrame.prototype, "leftTangent", void 0);
__decorate([
    lighter.decorators.serializable
], RealKeyFrame.prototype, "rightTangent", void 0);
__decorate([
    lighter.decorators.serializable
], RealKeyFrame.prototype, "leftTangentWeight", void 0);
__decorate([
    lighter.decorators.serializable
], RealKeyFrame.prototype, "rightTangentWeight", void 0);
__decorate([
    lighter.decorators.serializable
], RealKeyFrame.prototype, "tangentMode", void 0);
RealKeyFrame = __decorate([
    lighter.decorators.tsclass("mwanim.RealKeyframeValue")
], RealKeyFrame);
function createRealKeyframeValue(params) {
    const realKeyframeValue = new RealKeyFrame();
    if (typeof params === 'number') {
        realKeyframeValue.value = params;
    }
    else {
        const { interpolationMode, tangentWeightMode, value, rightTangent, rightTangentWeight, leftTangent, leftTangentWeight, easingMethod, } = params;
        realKeyframeValue.value = value ?? realKeyframeValue.value;
        realKeyframeValue.rightTangent = rightTangent ?? realKeyframeValue.rightTangent;
        realKeyframeValue.rightTangentWeight = rightTangentWeight ?? realKeyframeValue.rightTangentWeight;
        realKeyframeValue.leftTangent = leftTangent ?? realKeyframeValue.leftTangent;
        realKeyframeValue.leftTangentWeight = leftTangentWeight ?? realKeyframeValue.leftTangentWeight;
        realKeyframeValue.interpolationMode = interpolationMode ?? realKeyframeValue.interpolationMode;
        realKeyframeValue.tangentWeightMode = tangentWeightMode ?? realKeyframeValue.tangentWeightMode;
        realKeyframeValue.easingMethod = easingMethod ?? realKeyframeValue.easingMethod;
    }
    return realKeyframeValue;
}
let RealCurve = RealCurve_1 = class RealCurve extends KeyFrameCurve {
    constructor() {
        super(...arguments);
        this.preInfinity = ExtrapolationMode.CLAMP;
        this.postInfinity = ExtrapolationMode.CLAMP;
    }
    evaluate(time) {
        const { _times: times, _values: values, } = this;
        const nFrames = times.length;
        if (nFrames === 0) {
            return 0.0;
        }
        const firstTime = times[0];
        const lastTime = times[nFrames - 1];
        if (time < firstTime) {
            // Underflow
            const preExtrapolation = this.preInfinity;
            const preValue = values[0];
            if (preExtrapolation === ExtrapolationMode.CLAMP || nFrames < 2) {
                return preValue.value;
            }
            switch (preExtrapolation) {
                case ExtrapolationMode.LINEAR:
                    return linearTrend(firstTime, values[0].value, times[1], values[1].value, time);
                case ExtrapolationMode.LOOP:
                    time = wrapRepeat(time, firstTime, lastTime);
                    break;
                case ExtrapolationMode.PING_PONG:
                    time = wrapPingPong(time, firstTime, lastTime);
                    break;
                default:
                    return preValue.value;
            }
        }
        else if (time > lastTime) {
            // Overflow
            const postExtrapolation = this.postInfinity;
            const preFrame = values[nFrames - 1];
            if (postExtrapolation === ExtrapolationMode.CLAMP || nFrames < 2) {
                return preFrame.value;
            }
            switch (postExtrapolation) {
                case ExtrapolationMode.LINEAR:
                    return linearTrend(lastTime, preFrame.value, times[nFrames - 2], values[nFrames - 2].value, time);
                case ExtrapolationMode.LOOP:
                    time = wrapRepeat(time, firstTime, lastTime);
                    break;
                case ExtrapolationMode.PING_PONG:
                    time = wrapPingPong(time, firstTime, lastTime);
                    break;
                default:
                    return preFrame.value;
            }
        }
        const index = binarySearchEpsilon(times, time);
        if (index >= 0) {
            return values[index].value;
        }
        const iNext = ~index;
        const iPre = iNext - 1;
        const preTime = times[iPre];
        const preValue = values[iPre];
        const nextTime = times[iNext];
        const nextValue = values[iNext];
        const dt = nextTime - preTime;
        const ratio = (time - preTime) / dt;
        return evalBetweenTwoKeyFrames(preTime, preValue, nextTime, nextValue, ratio);
    }
    addKeyframe(time, value) {
        return super.addKeyframe(time, createRealKeyframeValue(value));
    }
    assignSorted(times, values) {
        if (values !== undefined) {
            this.setKeyframes(times.slice(), values.map((value) => createRealKeyframeValue(value)));
        }
        else {
            const keyframes = Array.from(times);
            this.setKeyframes(keyframes.map(([time]) => time), keyframes.map(([, value]) => createRealKeyframeValue(value)));
        }
    }
    isConstant(tolerance) {
        if (this._values.length <= 1) {
            return true;
        }
        const firstVal = this._values[0].value;
        return this._values.every((frame) => approx(frame.value, firstVal, tolerance));
    }
    clone() {
        let curve = new RealCurve_1();
        curve.preInfinity = this.preInfinity;
        curve.postInfinity = this.postInfinity;
        curve._values = this._values.map((keyframe) => {
            const newKeyframe = new RealKeyFrame();
            newKeyframe.value = keyframe.value;
            newKeyframe.leftTangent = keyframe.leftTangent;
            newKeyframe.rightTangent = keyframe.rightTangent;
            newKeyframe.leftTangentWeight = keyframe.leftTangentWeight;
            newKeyframe.rightTangentWeight = keyframe.rightTangentWeight;
            newKeyframe.interpolationMode = keyframe.interpolationMode;
            newKeyframe.tangentWeightMode = keyframe.tangentWeightMode;
            newKeyframe.easingMethod = keyframe.easingMethod;
            return newKeyframe;
        });
        curve._times = this._times.slice();
        return curve;
    }
};
__decorate([
    lighter.decorators.serializable
], RealCurve.prototype, "preInfinity", void 0);
__decorate([
    lighter.decorators.serializable
], RealCurve.prototype, "postInfinity", void 0);
RealCurve = RealCurve_1 = __decorate([
    lighter.decorators.tsclass("mwanim.RealCurve")
], RealCurve);
function evalBetweenTwoKeyFrames(prevTime, prevValue, nextTime, nextValue, ratio) {
    const dt = nextTime - prevTime;
    switch (prevValue.interpolationMode) {
        default:
        case RealInterpolationMode.CONSTANT:
            return prevValue.value;
        case RealInterpolationMode.LINEAR: {
            const transformedRatio = prevValue.easingMethod === EasingMethod.LINEAR
                ? ratio
                : getEasingFn(prevValue.easingMethod)(ratio);
            return lerp(prevValue.value, nextValue.value, transformedRatio);
        }
        case RealInterpolationMode.CUBIC: {
            const ONE_THIRD = 1.0 / 3.0;
            const { rightTangent: prevTangent, rightTangentWeight: prevTangentWeightSpecified, } = prevValue;
            const prevTangentWeightEnabled = isRightTangentWeightEnabled(prevValue.tangentWeightMode);
            const { leftTangent: nextTangent, leftTangentWeight: nextTangentWeightSpecified, } = nextValue;
            const nextTangentWeightEnabled = isLeftTangentWeightEnabled(nextValue.tangentWeightMode);
            if (!prevTangentWeightEnabled && !nextTangentWeightEnabled) {
                // Optimize for the case when both x components of tangents are 1.
                // See below.
                const p1 = prevValue.value + ONE_THIRD * prevTangent * dt;
                const p2 = nextValue.value - ONE_THIRD * nextTangent * dt;
                return bezierInterpolate(prevValue.value, p1, p2, nextValue.value, ratio);
            }
            else {
                let prevTangentWeight = 0.0;
                if (prevTangentWeightEnabled) {
                    prevTangentWeight = prevTangentWeightSpecified;
                }
                else {
                    const x = dt;
                    const y = dt * prevTangent;
                    prevTangentWeight = Math.sqrt(x * x + y * y) * ONE_THIRD;
                }
                const angle0 = Math.atan(prevTangent);
                const tx0 = Math.cos(angle0) * prevTangentWeight + prevTime;
                const ty0 = Math.sin(angle0) * prevTangentWeight + prevValue.value;
                let nextTangentWeight = 0.0;
                if (nextTangentWeightEnabled) {
                    nextTangentWeight = nextTangentWeightSpecified;
                }
                else {
                    const x = dt;
                    const y = dt * nextTangent;
                    nextTangentWeight = Math.sqrt(x * x + y * y) * ONE_THIRD;
                }
                const angle1 = Math.atan(nextTangent);
                const tx1 = -Math.cos(angle1) * nextTangentWeight + nextTime;
                const ty1 = -Math.sin(angle1) * nextTangentWeight + nextValue.value;
                const dx = dt;
                // Hermite to Bezier
                const u0x = (tx0 - prevTime) / dx;
                const u1x = (tx1 - prevTime) / dx;
                const u0y = ty0;
                const u1y = ty1;
                // Converts from Bernstein Basis to Power Basis.
                // Formula: [1, 0, 0, 0; -3, 3, 0, 0; 3, -6, 3, 0; -1, 3, -3, 1] * [p_0; p_1; p_2; p_3]
                // --------------------------------------
                // | Basis | Coeff
                // | t^3   | 3 * p_1 - p_0 - 3 * p_2 + p_3
                // | t^2   | 3 * p_0 - 6 * p_1 + 3 * p_2
                // | t^1   | 3 * p_1 - 3 * p_0
                // | t^0   | p_0
                // --------------------------------------
                // where: p_0 = 0, p_1 = u0x, p_2 = u1x, p_3 = 1
                // Especially, when both tangents are 1, we will have u0x = 1/3 and u1x = 2/3
                // and then: ratio = t, eg. the ratios are
                // 1-1 corresponding to param t. That's why we can do optimization like above.
                const coeff0 = 0.0; // 0
                const coeff1 = 3.0 * u0x; // 1
                const coeff2 = 3.0 * u1x - 6.0 * u0x; // -1
                const coeff3 = 3.0 * (u0x - u1x) + 1.0; // 1
                // Solves the param t from equation X(t) = ratio.
                const solutions = [0.0, 0.0, 0.0];
                const nSolutions = solveCubic(coeff0 - ratio, coeff1, coeff2, coeff3, solutions);
                const param = getParamFromCubicSolution(solutions, nSolutions, ratio);
                // Solves Y.
                const y = bezierInterpolate(prevValue.value, u0y, u1y, nextValue.value, param);
                return y;
            }
        }
    }
}
function isLeftTangentWeightEnabled(tangentWeightMode) {
    return (tangentWeightMode & TangentWeightMode.LEFT) !== 0;
}
function isRightTangentWeightEnabled(tangentWeightMode) {
    return (tangentWeightMode & TangentWeightMode.RIGHT) !== 0;
}
function bezierInterpolate(p0, p1, p2, p3, t) {
    const u = 1 - t;
    const coeff0 = u * u * u;
    const coeff1 = 3 * u * u * t;
    const coeff2 = 3 * u * t * t;
    const coeff3 = t * t * t;
    return coeff0 * p0 + coeff1 * p1 + coeff2 * p2 + coeff3 * p3;
}
function getParamFromCubicSolution(solutions, solutionsCount, x) {
    let param = x;
    if (solutionsCount === 1) {
        param = solutions[0];
    }
    else {
        param = -Infinity;
        for (let iSolution = 0; iSolution < solutionsCount; ++iSolution) {
            const solution = solutions[iSolution];
            if (solution >= 0.0 && solution <= 1.0) {
                if (solution > param) {
                    param = solution;
                }
            }
        }
        if (param === -Infinity) {
            param = 0.0;
        }
    }
    return param;
}
function wrapRepeat(time, prevTime, nextTime) {
    return prevTime + repeat(time - prevTime, nextTime - prevTime);
}
function wrapPingPong(time, prevTime, nextTime) {
    return prevTime + pingPong(time - prevTime, nextTime - prevTime);
}
function linearTrend(prevTime, prevValue, nextTime, nextValue, time) {
    const slope = (nextValue - prevValue) / (nextTime - prevTime);
    return prevValue + (time - prevTime) * slope;
}

var RealTrack_1;
/**

 * 实数轨道描述目标上某个标量属性的动画。
 */
let RealTrack = RealTrack_1 = class RealTrack extends SingleChannelTrack {
    /**
     * @internal
     */
    createCurve() {
        return new RealCurve();
    }
    clone() {
        const track = new RealTrack_1();
        track.channel.name = this.channel.name;
        track.channel.curve = this.channel.curve.clone();
        track.path = this.path.clone();
        track.proxy = this.proxy;
        return track;
    }
};
RealTrack = RealTrack_1 = __decorate([
    lighter.decorators.tsclass("mwanim.RealTrack")
], RealTrack);

var ObjectCurve_1;
let ObjectCurve = ObjectCurve_1 = class ObjectCurve extends KeyFrameCurve {
    evaluate(time) {
        const iSearch = this.searchKeyframe(time);
        if (iSearch >= 0) {
            return this._values[iSearch];
        }
        const iPrev = clamp((~iSearch) - 1, 0, this._values.length - 1);
        return this._values[iPrev];
    }
    clone() {
        const curve = new ObjectCurve_1();
        curve._times = this._times.slice();
        curve._values = this._values.slice();
        return curve;
    }
};
ObjectCurve = ObjectCurve_1 = __decorate([
    lighter.decorators.tsclass("mwanim.ObjectCurve")
], ObjectCurve);

var ObjectTrack_1;
/**

 * 实数轨道描述目标上某个标量属性的动画。
 */
let ObjectTrack = ObjectTrack_1 = class ObjectTrack extends SingleChannelTrack {
    /**
     * @internal
     */
    createCurve() {
        return new ObjectCurve();
    }
    clone() {
        const track = new ObjectTrack_1();
        track.channel.name = this.channel.name;
        track.channel.curve = this.channel.curve.clone();
        track.path = this.path.clone();
        track.proxy = this.proxy;
        return track;
    }
};
ObjectTrack = ObjectTrack_1 = __decorate([
    lighter.decorators.tsclass("mwanim.ObjectTrack")
], ObjectTrack);

class NormalTypeAnimateBindings {
    matchOf(target) {
        return typeof target === "number" || typeof target === "string" || typeof target === "boolean";
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let path = trackPath.clone();
        switch (typeof target) {
            case "number":
                let track = new RealTrack();
                track.path = path;
                outProperties.push(track);
                break;
            case "string":
            case "boolean":
                let track1 = new ObjectTrack();
                track1.path = path;
                outProperties.push(track1);
                break;
        }
    }
}

var GenericAnimationBindingCache;
(function (GenericAnimationBindingCache) {
    const propertyAccessor = [];
    const baseTypeAccessor = new NormalTypeAnimateBindings();
    function registerCustomPropertyAccessor(accessor) {
        propertyAccessor.push(accessor);
    }
    GenericAnimationBindingCache.registerCustomPropertyAccessor = registerCustomPropertyAccessor;
    /**
     * 获取目标可以被动画的所有属性
     * @param target 动画目标
     * @param outProperties 动画轨道
     * @param trackPath 预设路径
     * @returns
     */
    function getAllAnimatableProperties(target, outProperties, trackPath) {
        if (!trackPath) {
            trackPath = new TrackPath();
        }
        let result = false;
        const typeStr = typeof (target);
        if (typeStr !== 'object') {
            baseTypeAccessor.getAllAnimatableProperties(target, outProperties, trackPath);
            return true;
        }
        for (let i = 0; i < propertyAccessor.length; i++) {
            if (propertyAccessor[i].matchOf(target)) {
                propertyAccessor[i].getAllAnimatableProperties(target, outProperties, trackPath);
                result = true;
            }
        }
        return result;
    }
    GenericAnimationBindingCache.getAllAnimatableProperties = getAllAnimatableProperties;
})(GenericAnimationBindingCache || (GenericAnimationBindingCache = {}));
function registerCustomBindings(base) {
    GenericAnimationBindingCache.registerCustomPropertyAccessor(new base());
    return base;
}

var AnimationUtility;
(function (AnimationUtility) {
    /**
     * 计算两个节点之间的相对路径
     * @param from
     * @param to
     * @returns
     */
    function calculateRelativePath(from, to) {
        if (from === to) {
            return '';
        }
        const path = [];
        let current = from;
        while (current) {
            path.push(current.name);
            if (current === to) {
                break;
            }
            current = current.parent;
        }
        return path.reverse().join("/");
    }
    AnimationUtility.calculateRelativePath = calculateRelativePath;
    /**
     * 判断一个节点是否为另外一个节点的子节点
     * @param from
     * @param to
     */
    function isRelativeTo(from, to) {
        let current = from;
        while (current) {
            if (current.parent === current) {
                return to === from;
            }
            if (current === to) {
                return true;
            }
            current = current.parent;
        }
        return false;
    }
    AnimationUtility.isRelativeTo = isRelativeTo;
    function getAllAnimatableProperties(target, path) {
        const out = [];
        GenericAnimationBindingCache.getAllAnimatableProperties(target, out, path);
        return out;
    }
    AnimationUtility.getAllAnimatableProperties = getAllAnimatableProperties;
    // 只支持两种类型的对象
    function getAnimatableObjectChildren(target, out) {
        if (target instanceof mw.GameObject) {
            const children = target.getChildren();
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    const child = children[i];
                    out.push(child);
                }
            }
        }
        else if (target instanceof mw.UserWidget) {
            return out;
        }
        else if (target instanceof mw.Widget) {
            const childCount = target.getChildrenCount();
            for (let i = 0; i < childCount; i++) {
                const child = target.getChildAt(i);
                out.push(child);
            }
        }
        return out;
    }
    AnimationUtility.getAnimatableObjectChildren = getAnimatableObjectChildren;
    /**
     *
     * @param trackPath
     * @param clip
     * @param channelName
     * @returns
     */
    function findCurveFromClip(trackPath, clip, channelName) {
        let track = clip.getTrackByPath(trackPath);
        if (!track) {
            return null;
        }
        let channel = findChannel(track, channelName);
        if (!channel) {
            return null;
        }
        return channel.curve;
    }
    AnimationUtility.findCurveFromClip = findCurveFromClip;
    function findChannel(track, channelName) {
        for (const v of track.channels()) {
            if (v.name === channelName) {
                return v;
            }
        }
        return null;
    }
    AnimationUtility.findChannel = findChannel;
    function createTrackBinding(target, track) {
        const binding = track[trackBindingTag].createRuntimeBinding(target);
        if (!binding) {
            return undefined;
        }
        return binding;
    }
    AnimationUtility.createTrackBinding = createTrackBinding;
    function getTargetPropertyOnTrack(target, track) {
        return createTrackBinding(target, track).getValue();
    }
    AnimationUtility.getTargetPropertyOnTrack = getTargetPropertyOnTrack;
    /**
     * 添加或者修改指定轨道上的关键帧
     * @param trackPath     轨道路径
     * @param clip          动画片段
     * @param time          时间
     * @param channelName   通道名称
     * @param value         值
     * @returns
     */
    function modifyKeyframeForClip(trackPath, clip, target, time, channelName, value) {
        let track = clip.getTrackByPath(trackPath);
        let modifyChannels = [];
        if (!track) {
            return modifyChannels;
        }
        for (const channel of track.channels()) {
            if (!channelName) {
                modifyChannelValueAtTime(track, target, channel, time, value);
                modifyChannels.push(channel.name);
            }
            else if (channel.name === channelName) {
                modifyChannelValueAtTime(track, target, channel, time, value);
                modifyChannels.push(channel.name);
                break;
            }
        }
        return modifyChannels;
    }
    AnimationUtility.modifyKeyframeForClip = modifyKeyframeForClip;
    function modifyChannelValueAtTime(track, target, targetChannel, time, value) {
        let setValue = true;
        if (value === undefined) {
            value = AnimationUtility.createTrackBinding(target, track).getValue();
            if (targetChannel.name) {
                value = value[targetChannel.name];
            }
            setValue = false;
        }
        AnimationUtility.modifyOrAddKeyframeForCurve(targetChannel.curve, time, value);
        if (setValue) {
            track[trackBindingTag].createRuntimeBinding(target).setValue(track[createEvalSymbol]().evaluate(time));
        }
    }
    AnimationUtility.modifyChannelValueAtTime = modifyChannelValueAtTime;
    function removeKeyframeForClip(trackPath, clip, time, channelName) {
        let track = clip.getTrackByPath(trackPath);
        if (!track) {
            return false;
        }
        let targetChannel;
        for (const channel of track.channels()) {
            if (channel.name === channelName) {
                targetChannel = channel;
                break;
            }
        }
        if (!targetChannel) {
            return false;
        }
        let curve = targetChannel.curve;
        let index = curve.findFrameIndexWithTime(time);
        if (index < 0) {
            return false;
        }
        curve.removeKeyframe(index);
        return true;
    }
    AnimationUtility.removeKeyframeForClip = removeKeyframeForClip;
    function evaluateValueFrom(trackPath, clip, time, target) {
        let track = clip.getTrackByPath(trackPath);
        if (!track) {
            return;
        }
        return track[createEvalSymbol]().evaluate(time);
    }
    AnimationUtility.evaluateValueFrom = evaluateValueFrom;
    function evaluateSingleChannel(trackPath, clip, time, channelName) {
        let track = clip.getTrackByPath(trackPath);
        if (!track) {
            return;
        }
        let targetChannel;
        for (const channel of track.channels()) {
            if (channel.name === channelName) {
                targetChannel = channel;
                break;
            }
        }
        if (!targetChannel) {
            return;
        }
        let curve = targetChannel.curve;
        return curve.evaluate(time);
    }
    AnimationUtility.evaluateSingleChannel = evaluateSingleChannel;
    function modifyOrAddKeyframeForCurve(curve, time, value) {
        let index = curve.findFrameIndexWithTime(time);
        if (index >= 0) {
            curve.removeKeyframe(index);
        }
        curve.addKeyframe(time, value);
    }
    AnimationUtility.modifyOrAddKeyframeForCurve = modifyOrAddKeyframeForCurve;
    function modifyOrAddKeyframeForChannel(channel, time, value) {
        modifyOrAddKeyframeForCurve(channel.curve, time, value);
    }
    AnimationUtility.modifyOrAddKeyframeForChannel = modifyOrAddKeyframeForChannel;
})(AnimationUtility || (AnimationUtility = {}));

class CrossFade extends Playable {
    constructor(scheduler) {
        super();
        this._managedStates = [];
        this._fadings = [];
        this._scheduled = false;
        this._scheduler = scheduler ?? getGlobalAnimationManager();
    }
    update(deltaTime) {
        if (this.isMotionless) {
            return;
        }
        const managedStates = this._managedStates;
        const fadings = this._fadings;
        if (managedStates.length === 1 && fadings.length === 1) {
            const state = managedStates[0].state;
            if (state) {
                state.weight = 1.0;
            }
        }
        else {
            this._calculateWeights(deltaTime);
        }
        if (managedStates.length === 1 && fadings.length === 1) { // Definitely not code repetition
            this._unscheduleThis();
        }
    }
    /**
     * 在指定时间内将从当前动画状态切换到指定的动画状态。
     * @param state 指定的动画状态。
     * @param duration 切换时间。
     */
    crossFade(state, duration) {
        if (this._managedStates.length === 0) {
            // If we are cross fade from a "initial" pose,
            // we do not use the duration.
            // It's meaning-less and may get a bad visual effect.
            duration = 0;
        }
        if (duration === 0) {
            this.clear();
        }
        let target = this._managedStates.find((weightedState) => weightedState.state === state);
        if (!target) {
            target = { state, reference: 0 };
            if (state) {
                state.play();
            }
            this._managedStates.push(target);
        }
        else if (target.state?.isMotionless) {
            target.state.play();
        }
        ++target.reference;
        this._fadings.unshift({
            easeDuration: duration,
            easeTime: 0,
            target,
        });
        if (!this.isMotionless) {
            this._scheduleThis();
        }
    }
    clear() {
        for (let iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
            const state = this._managedStates[iManagedState].state;
            if (state) {
                state.stop();
            }
        }
        this._managedStates.length = 0;
        this._fadings.length = 0;
    }
    onPlay() {
        super.onPlay();
        this._scheduleThis();
    }
    /**
     * 停止我们淡入淡出的所有动画状态并停止淡入淡出。
     */
    onPause() {
        super.onPause();
        for (let iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
            const state = this._managedStates[iManagedState].state;
            if (state) {
                state.pause();
            }
        }
        this._unscheduleThis();
    }
    /**
     * 恢复我们淡入淡出的所有动画状态并继续淡入淡出。
     */
    onResume() {
        super.onResume();
        for (let iManagedState = 0; iManagedState < this._managedStates.length; ++iManagedState) {
            const state = this._managedStates[iManagedState].state;
            if (state) {
                state.resume();
            }
        }
        this._scheduleThis();
    }
    /**
     * 停止所有淡入淡出的动画状态。
     */
    onStop() {
        super.onStop();
        this.clear();
    }
    _calculateWeights(deltaTime) {
        const managedStates = this._managedStates;
        const fadings = this._fadings;
        // Set all state's weight to 0.
        for (let iManagedState = 0; iManagedState < managedStates.length; ++iManagedState) {
            const state = managedStates[iManagedState].state;
            if (state) {
                state.weight = 0;
            }
        }
        // Allocate weights.
        let absoluteWeight = 1.0;
        let deadFadingBegin = fadings.length;
        for (let iFading = 0; iFading < fadings.length; ++iFading) {
            const fading = fadings[iFading];
            fading.easeTime += deltaTime;
            // We should properly handle the case of
            // `fading.easeTime === 0 && fading.easeDuration === 0`, which yields `NaN`.
            const relativeWeight = fading.easeDuration === 0 ? 1 : clamp01(fading.easeTime / fading.easeDuration);
            const weight = relativeWeight * absoluteWeight;
            absoluteWeight *= (1.0 - relativeWeight);
            if (fading.target.state) {
                fading.target.state.weight += weight;
            }
            if (fading.easeTime >= fading.easeDuration) {
                deadFadingBegin = iFading + 1;
                fading.easeTime = fading.easeDuration;
                break;
            }
        }
        // Kill fadings having no lifetime.
        if (deadFadingBegin !== fadings.length) {
            for (let iDeadFading = deadFadingBegin; iDeadFading < fadings.length; ++iDeadFading) {
                const deadFading = fadings[iDeadFading];
                --deadFading.target.reference;
                if (deadFading.target.reference <= 0) {
                    if (deadFading.target.state) {
                        deadFading.target.state.stop();
                    }
                    managedStates.splice(managedStates.indexOf(deadFading.target), 1);
                }
            }
            fadings.splice(deadFadingBegin);
        }
    }
    _scheduleThis() {
        if (!this._scheduled) {
            this._scheduler.addCrossFade(this);
            this._scheduled = true;
        }
    }
    _unscheduleThis() {
        if (this._scheduled) {
            this._scheduler.removeCrossFade(this);
            this._scheduled = false;
        }
    }
}

const setAnimatorTarget = Symbol('setAnimatorTarget');
class Animator {
    constructor() {
        this._nameToState = new Map();
        this._clips = [];
        this._crossFade = new CrossFade();
        this.onAnimationEvent = new mw.Action2();
        this.onAnimationLifeEvent = new mw.Action2();
    }
    static getAnimator(target) {
        const ret = Animator.pools.pop() || new Animator();
        ret[setAnimatorTarget](target);
        return ret;
    }
    [setAnimatorTarget](target) {
        this._target = target;
    }
    play(animationClip) {
        if (typeof animationClip === 'string') {
            this.crossFade(animationClip, 0);
        }
        else {
            this.addClip(animationClip);
            this.crossFade(animationClip.name, 0);
        }
    }
    pause() {
        this._crossFade.pause();
    }
    resume() {
        this._crossFade.resume();
    }
    crossFade(name, duration = 0.3) {
        const state = this._nameToState.get(name);
        if (state) {
            this.doPlayOrCrossFade(state, duration);
        }
    }
    getAnimationState(name) {
        const state = this._nameToState.get(name);
        if (state && !state.curveLoaded) {
            state.initialize(this._target, this);
        }
        return state || null;
    }
    createState(clip, name) {
        name = name || clip.name;
        this.removeState(name);
        return this._doCreateState(clip, name);
    }
    removeState(name) {
        const state = this._nameToState.get(name);
        if (state) {
            state.stop();
            this._nameToState.delete(name);
        }
    }
    addClip(clip, name) {
        if (this._clips.indexOf(clip) === -1) {
            this._clips.push(clip);
        }
        return this.createState(clip, name);
    }
    removeClip(clip, force) {
        let removalState;
        for (const name in this._nameToState) {
            const state = this._nameToState.get(name);
            const stateClip = state.clip;
            if (stateClip === clip) {
                removalState = state;
                break;
            }
        }
        if (removalState && removalState.isPlaying) {
            if (force) {
                removalState.stop();
            }
            else {
                return;
            }
        }
        this._clips = this._clips.filter((item) => item !== clip);
        if (removalState) {
            this._nameToState.delete(removalState.name);
            removalState.destroy();
        }
    }
    doPlayOrCrossFade(state, duration) {
        this._crossFade.play();
        this._crossFade.crossFade(state, duration);
    }
    _doCreateState(clip, name) {
        const state = this._createState(clip, name);
        if (this._target) {
            state.initialize(this._target, this);
        }
        this._nameToState.set(name, state);
        return state;
    }
    _createState(clip, name) {
        return new AnimationState(clip, name);
    }
    destroy() {
        for (const state of this._nameToState.values()) {
            state.destroy();
        }
        this._crossFade.clear();
        this._clips.length = 0;
        this._target = null;
        this._nameToState.clear();
        Animator.pools.push(this);
    }
}
Animator.pools = [];

var AnimationClip_1;
class TrackEvalStatus {
    constructor(binding, trackEval) {
        this._shouldEvaluateDefault = true;
        this._binding = binding;
        this._trackEval = trackEval;
        this._shouldEvaluateDefault = !!binding.getValue && trackEval.requiresDefault;
    }
    evaluate(time) {
        const { _binding: binding, _trackEval: trackEval } = this;
        const defaultValue = this._shouldEvaluateDefault
            ? (binding.getValue)()
            : undefined;
        const value = trackEval.evaluate(time, defaultValue);
        binding.setValue(value);
    }
}
let AnimationClip = AnimationClip_1 = class AnimationClip extends lighter.assets.Asset {
    constructor(name) {
        super();
        this.editorGuid = '';
        this.name = '';
        /**
         * 动画帧率
         */
        this.sample = 30;
        /**
         * 播放速度
         */
        this.speed = 1;
        this.wrapMode = WrapMode.Default;
        this.duration = 0;
        this._tracks = [];
        this._events = [];
        this._runtimeEvents = {
            ratios: [],
            eventGroups: [],
        };
        if (name) {
            this.name = name;
        }
    }
    onLoaded() {
        this.events = this._events;
    }
    get trackCount() {
        return this._tracks.length;
    }
    get tracks() {
        return this._tracks;
    }
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
        const ratios = [];
        const eventGroups = [];
        const events = this.events.sort((a, b) => a.time - b.time);
        const nEvents = events.length;
        for (let iEvent = 0; iEvent < nEvents; ++iEvent) {
            const eventData = events[iEvent];
            const ratio = eventData.time / this.duration;
            let i = ratios.findIndex((r) => r === ratio);
            if (i < 0) {
                i = ratios.length;
                ratios.push(ratio);
                eventGroups.push({
                    events: [],
                });
            }
            eventGroups[i].events.push({
                functionName: eventData.func,
                parameters: eventData.params,
            });
        }
        this._runtimeEvents = {
            ratios,
            eventGroups,
        };
    }
    createEvaluator(context) {
        const { target, } = context;
        const binder = (binding) => {
            const trackTarget = binding.createRuntimeBinding(target);
            return trackTarget ?? undefined;
        };
        return this._createEvalWithBinder(target, binder);
    }
    _createEvalWithBinder(target, binder) {
        const trackEvalStatues = [];
        const { _tracks: tracks } = this;
        const nTracks = tracks.length;
        for (let iTrack = 0; iTrack < nTracks; ++iTrack) {
            const track = tracks[iTrack];
            if (Array.from(track.channels()).every(({ curve }) => curve.length === 0)) {
                continue;
            }
            const runtimeBinding = binder(track[trackBindingTag]);
            if (!runtimeBinding) {
                continue;
            }
            let trackEval;
            trackEval = track[createEvalSymbol]();
            trackEvalStatues.push(new TrackEvalStatus(runtimeBinding, trackEval));
        }
        const evaluation = new AnimationClipEvaluation(trackEvalStatues);
        return evaluation;
    }
    range() {
        const range = { min: Infinity, max: -Infinity };
        const { _tracks: tracks } = this;
        const nTracks = tracks.length;
        for (let iTrack = 0; iTrack < nTracks; ++iTrack) {
            const track = tracks[iTrack];
            const trackRange = track.range();
            range.min = Math.min(range.min, trackRange.min);
            range.max = Math.max(range.max, trackRange.max);
        }
        if (this._events.length > 0) {
            range.min = Math.min(range.min, this._events[0].time);
            range.max = Math.max(range.max, this._events[this._events.length - 1].time);
        }
        return range;
    }
    getTrack(index) {
        return this._tracks[index];
    }
    addTrack(track) {
        const index = this._tracks.length;
        this._tracks.push(track);
        return index;
    }
    removeTrack(index) {
        this._tracks.splice(index, 1);
    }
    removeTrackFromTrack(track) {
        let path = track instanceof Track ? track.path : track;
        let index = this._tracks.findIndex((t) => t.path.equal(path));
        if (index >= 0) {
            this.removeTrack(index);
        }
    }
    getTrackByPath(path) {
        return this._tracks.find((t) => t.path.equal(path));
    }
    clearTracks() {
        this._tracks.length = 0;
    }
    containsAnyEvent() {
        return this._events.length !== 0;
    }
    createEventEvaluator(targetNode) {
        return new EventEvaluator(targetNode, this._runtimeEvents.ratios, this._runtimeEvents.eventGroups, this.wrapMode);
    }
    clone() {
        const clone = new AnimationClip_1(this.name);
        clone.sample = this.sample;
        clone.speed = this.speed;
        clone.wrapMode = this.wrapMode;
        clone.duration = this.duration;
        clone._tracks = this._tracks.map((track) => track.clone());
        clone._events = this._events.map((event) => ({ ...deepCopyEvent(event) }));
        clone.editorGuid = this.editorGuid;
        clone.nativeUrl = this.nativeUrl;
        clone.uuid = this.uuid;
        clone._runtimeEvents = {
            ratios: [...this._runtimeEvents.ratios],
            eventGroups: this._runtimeEvents.eventGroups.map((eventGroup) => ({
                events: eventGroup.events.map((event) => ({ ...deepCopyAnimationEvent(event) })),
            })),
        };
        return clone;
    }
};
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "editorGuid", void 0);
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "name", void 0);
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "sample", void 0);
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "speed", void 0);
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "wrapMode", void 0);
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "duration", void 0);
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "_tracks", void 0);
__decorate([
    lighter.decorators.serializable
], AnimationClip.prototype, "_events", void 0);
AnimationClip = AnimationClip_1 = __decorate([
    lighter.decorators.tsclass('mwanim.AnimationClip')
], AnimationClip);
class AnimationClipEvaluation {
    constructor(trackEvalStatuses) {
        this._trackEvalStatues = [];
        this._trackEvalStatues = trackEvalStatuses;
    }
    evaluate(time) {
        const { _trackEvalStatues: trackEvalStatuses, } = this;
        const nTrackEvalStatuses = trackEvalStatuses.length;
        for (let iTrackEvalStatus = 0; iTrackEvalStatus < nTrackEvalStatuses; ++iTrackEvalStatus) {
            trackEvalStatuses[iTrackEvalStatus].evaluate(time);
        }
    }
    destroy() {
    }
}
const InvalidIndex = -1;
class EventEvaluator {
    constructor(_targetNode, _ratios, _eventGroups, _wrapMode) {
        this._targetNode = _targetNode;
        this._ratios = _ratios;
        this._eventGroups = _eventGroups;
        this._wrapMode = _wrapMode;
        this._lastFrameIndex = -1;
        this._lastIterations = 0.0;
        this._lastDirection = 0;
        this._ignoreIndex = InvalidIndex;
        this._sampled = false;
    }
    setWrapMode(wrapMode) {
        this._wrapMode = wrapMode;
    }
    ignore(ratio, direction) {
        this._ignoreIndex = InvalidIndex;
        this._sampled = false;
        let frameIndex = getEventGroupIndexAtRatio(ratio, this._ratios);
        if (frameIndex < 0) {
            frameIndex = ~frameIndex - 1;
            if (direction < 0) {
                frameIndex += 1;
            }
            this._ignoreIndex = frameIndex;
        }
    }
    reset() {
        this._lastFrameIndex = -1;
        this._lastIterations = 0.0;
        this._lastDirection = 0;
        this._ignoreIndex = InvalidIndex;
        this._sampled = false;
    }
    sample(ratio, direction, iterations) {
        if (this._eventGroups.length === 0) {
            return;
        }
        const length = this._eventGroups.length;
        let eventIndex = getEventGroupIndexAtRatio(ratio, this._ratios);
        if (eventIndex < 0) {
            eventIndex = ~eventIndex - 1;
            // If direction is inverse, increase index.
            if (direction < 0) {
                eventIndex += 1;
            }
        }
        if (this._ignoreIndex !== eventIndex) {
            this._ignoreIndex = InvalidIndex;
        }
        if (!this._sampled) {
            this._sampled = true;
            this._doFire(eventIndex, false);
            this._lastFrameIndex = eventIndex;
            this._lastIterations = iterations;
            this._lastDirection = direction;
            return;
        }
        const wrapMode = this._wrapMode;
        const currentIterations = wrapIterations(iterations);
        let lastIterations = wrapIterations(this._lastIterations);
        let lastIndex = this._lastFrameIndex;
        const lastDirection = this._lastDirection;
        const iterationsChanged = lastIterations !== -1 && currentIterations !== lastIterations;
        if (lastIndex === eventIndex && iterationsChanged && length === 1) {
            this._doFire(0, false);
        }
        else if (lastIndex !== eventIndex || iterationsChanged) {
            direction = lastDirection;
            do {
                if (lastIndex !== eventIndex) {
                    if (direction === -1 && lastIndex === 0 && eventIndex > 0) {
                        if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                            direction *= -1;
                        }
                        else {
                            lastIndex = length;
                        }
                        lastIterations++;
                    }
                    else if (direction === 1 && lastIndex === length - 1 && eventIndex < length - 1) {
                        if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
                            direction *= -1;
                        }
                        else {
                            lastIndex = -1;
                        }
                        lastIterations++;
                    }
                    if (lastIndex === eventIndex) {
                        break;
                    }
                    if (lastIterations > currentIterations) {
                        break;
                    }
                }
                lastIndex += direction;
                this._doFire(lastIndex, true);
            } while (lastIndex !== eventIndex && lastIndex > -1 && lastIndex < length);
        }
        this._lastFrameIndex = eventIndex;
        this._lastIterations = iterations;
        this._lastDirection = direction;
    }
    _doFire(eventIndex, delay) {
        if (delay) {
            getGlobalAnimationManager().pushDelayEvent(this._checkAndFire, this, [eventIndex]);
        }
        else {
            this._checkAndFire(eventIndex);
        }
    }
    _checkAndFire(eventIndex) {
        if (!this._targetNode) {
            return;
        }
        const { _eventGroups: eventGroups } = this;
        if (eventIndex < 0 || eventIndex >= eventGroups.length || this._ignoreIndex === eventIndex) {
            return;
        }
        const eventGroup = eventGroups[eventIndex];
        const nEvents = eventGroup.events.length;
        for (let iEvent = 0; iEvent < nEvents; ++iEvent) {
            const event = eventGroup.events[iEvent];
            this._targetNode.onAnimationEvent.call(event.functionName, event.parameters);
        }
    }
    destroy() {
    }
}
function wrapIterations(iterations) {
    if (iterations - (iterations | 0) === 0) {
        iterations -= 1;
    }
    return iterations | 0;
}
function getEventGroupIndexAtRatio(ratio, ratios) {
    const result = binarySearchEpsilon(ratios, ratio);
    return result;
}
function deepCopyAnimationEvent(event) {
    return {
        functionName: event.functionName,
        parameters: [...event.parameters]
    };
}
function deepCopyEvent(event) {
    return {
        time: event.time,
        func: event.func,
        params: [...event.params],
    };
}

var CurveUtility;
(function (CurveUtility) {
    const kBrokenMask = 1 << 0;
    const kLeftTangentMask = 1 << 1 | 1 << 2;
    const kRightTangentMask = 1 << 3 | 1 << 4;
    function hasKeysInRange(curve, beginTime, endTime) {
        const times = curve.times();
        for (let i = curve.length - 1; i >= 0; i--) {
            if (times[i] >= beginTime && times[i] < endTime) {
                return true;
            }
        }
        return false;
    }
    CurveUtility.hasKeysInRange = hasKeysInRange;
    function removeKeysInRange(curve, beginTime, endTime) {
        const times = curve.times();
        for (let i = curve.length - 1; i >= 0; i--) {
            if (times[i] >= beginTime && times[i] < endTime) {
                curve.removeKeyframe(i);
            }
        }
    }
    CurveUtility.removeKeysInRange = removeKeysInRange;
    function updateTangentsFromMode(curve) {
        for (let i = 0; i < curve.length; i++) {
            internalUpdateTangentsFromMode(curve, i);
        }
    }
    CurveUtility.updateTangentsFromMode = updateTangentsFromMode;
    function updateTangentsFromModeSurrounding(curve, index) {
        // -2 is needed when moving keyframes
        internalUpdateTangentsFromMode(curve, index - 2);
        // Update surrounding keyframes
        internalUpdateTangentsFromMode(curve, index - 1);
        internalUpdateTangentsFromMode(curve, index);
        internalUpdateTangentsFromMode(curve, index + 1);
        // +2 is needed when moving keyframes
        internalUpdateTangentsFromMode(curve, index + 2);
    }
    CurveUtility.updateTangentsFromModeSurrounding = updateTangentsFromModeSurrounding;
    function calculateSmoothTangent(keys) {
        if (!keys.leftTangent || keys.leftTangent === Number.POSITIVE_INFINITY)
            keys.leftTangent = 0;
        if (!keys.rightTangent || keys.rightTangent === Number.POSITIVE_INFINITY)
            keys.rightTangent = 0;
        return (keys.rightTangent + keys.leftTangent) * 0.5;
    }
    CurveUtility.calculateSmoothTangent = calculateSmoothTangent;
    function internalUpdateTangentsFromMode(curve, index) {
        if (index < 0 || index >= curve.length)
            return;
        const key = curve.values()[index];
        const time = curve.times()[index];
        if (CurveUtility.getKeyTangentMode(key, 0) == TangentMode.Linear && index >= 1) {
            key.leftTangent = calculateLinearTangent(curve, index, index - 1);
            curve.updateKeyframeTime(index, time);
        }
        if (CurveUtility.getKeyTangentMode(key, 1) == TangentMode.Linear && index + 1 < curve.length) {
            key.rightTangent = calculateLinearTangent(curve, index, index + 1);
            curve.updateKeyframeTime(index, time);
        }
        if (CurveUtility.getKeyTangentMode(key, 0) == TangentMode.Smooth || CurveUtility.getKeyTangentMode(key, 1) == TangentMode.Smooth) {
            recalculateSplineSlope(curve, index, 0);
        }
    }
    function calculateLinearTangent(curve, index, toIndex) {
        const times = curve.times();
        const values = curve.values();
        return (values[index].value - values[toIndex].value) / (times[index] - times[toIndex]);
    }
    /**
     * 重新计算样条曲线指定索引的斜率
     * @param curve
     * @param index
     * @param bias
     * @returns
     */
    function recalculateSplineSlope(curve, index, bias) {
        let length = curve.length;
        if (length < 2) {
            return;
        }
        let times = curve.times();
        let values = curve.values();
        if (index === 0) {
            const dx = times[1] - times[0];
            const dy = values[1].value - values[0].value;
            const m = dy / dx;
            values[index].leftTangent = m;
            values[index].rightTangent = m;
        }
        else if (index === length - 1) {
            const dx = times[index] - times[index - 1];
            const dy = values[index].value - values[index - 1].value;
            const m = dy / dx;
            values[index].leftTangent = m;
            values[index].rightTangent = m;
        }
        else {
            const dx1 = times[index] - times[index - 1];
            const dy1 = values[index].value - values[index - 1].value;
            const dx2 = times[index + 1] - times[index];
            const dy2 = values[index + 1].value - values[index].value;
            const m1 = dx1 >= 0.0001 ? dy1 / dx1 : 0;
            const m2 = dx2 >= 0.0001 ? dy2 / dx2 : 0;
            const m = (1.0 + bias) * 0.5 * m1 + (1.0 - bias) * 0.5 * m2;
            values[index].leftTangent = m;
            values[index].rightTangent = m;
        }
    }
    function getKeyTangentMode(key, leftRight) {
        if (leftRight == 0) {
            return ((key.tangentMode & kLeftTangentMask) >> 1);
        }
        else {
            return ((key.tangentMode & kRightTangentMask) >> 3);
        }
    }
    CurveUtility.getKeyTangentMode = getKeyTangentMode;
    function getKeyBroken(key) {
        return (key.tangentMode & kBrokenMask) != 0;
    }
    CurveUtility.getKeyBroken = getKeyBroken;
    function setKeyBroken(key, broken) {
        if (broken) {
            key.tangentMode |= kBrokenMask;
        }
        else {
            key.tangentMode &= ~kBrokenMask;
        }
    }
    CurveUtility.setKeyBroken = setKeyBroken;
    function setKeyTangentMode(key, leftRight, mode) {
        if (leftRight == 0) {
            key.tangentMode &= ~kLeftTangentMask;
            key.tangentMode |= mode << 1;
        }
        else {
            key.tangentMode &= ~kRightTangentMask;
            key.tangentMode |= mode << 3;
        }
        if (getKeyTangentMode(key, leftRight) != mode) {
            throw new Error("BUG");
        }
    }
    CurveUtility.setKeyTangentMode = setKeyTangentMode;
})(CurveUtility || (CurveUtility = {}));

// var sin = Math.sin;
const cos = Math.cos;
const acos = Math.acos;
const max = Math.max;
// var atan2 = Math.atan2;
const pi = Math.PI;
const tau = 2 * pi;
const sqrt = Math.sqrt;
function crt(v) {
    if (v < 0) {
        return -Math.pow(-v, 1 / 3);
    }
    else {
        return Math.pow(v, 1 / 3);
    }
}
// Modified from http://jsbin.com/yibipofeqi/1/edit, optimized for animations.
// The origin Cardano's algorithm is based on http://www.trans4mind.com/personal_development/mathematics/polynomials/cubicAlgebra.htm
function cardano(curve, x) {
    // align curve with the intersecting line:
    // var line = {p1: {x: x, y: 0}, p2: {x: x, y: 1}};
    // var aligned = align(curve, line);
    /// / and rewrite from [a(1-t)^3 + 3bt(1-t)^2 + 3c(1-t)t^2 + dt^3] form
    //    pa = aligned[0].y,
    //    pb = aligned[1].y,
    //    pc = aligned[2].y,
    //    pd = aligned[3].y;
    /// /// curve = [{x:0, y:1}, {x: curve[0], y: 1-curve[1]}, {x: curve[2], y: 1-curve[3]}, {x:1, y:0}];
    const pa = x - 0;
    const pb = x - curve[0];
    const pc = x - curve[2];
    const pd = x - 1;
    // to [t^3 + at^2 + bt + c] form:
    const pa3 = pa * 3;
    const pb3 = pb * 3;
    const pc3 = pc * 3;
    const d = (-pa + pb3 - pc3 + pd);
    const rd = 1 / d;
    const r3 = 1 / 3;
    const a = (pa3 - 6 * pb + pc3) * rd;
    const a3 = a * r3;
    const b = (-pa3 + pb3) * rd;
    const c = pa * rd;
    // then, determine p and q:
    const p = (3 * b - a * a) * r3;
    const p3 = p * r3;
    const q = (2 * a * a * a - 9 * a * b + 27 * c) / 27;
    const q2 = q / 2;
    // and determine the discriminant:
    const discriminant = q2 * q2 + p3 * p3 * p3;
    // and some reserved variables
    let u1;
    let v1;
    let x1;
    let x2;
    let x3;
    // If the discriminant is negative, use polar coordinates
    // to get around square roots of negative numbers
    if (discriminant < 0) {
        const mp3 = -p * r3;
        const mp33 = mp3 * mp3 * mp3;
        const r = sqrt(mp33);
        // compute cosphi corrected for IEEE float rounding:
        const t = -q / (2 * r);
        const cosphi = t < -1 ? -1 : t > 1 ? 1 : t;
        const phi = acos(cosphi);
        const crtr = crt(r);
        const t1 = 2 * crtr;
        x1 = t1 * cos(phi * r3) - a3;
        x2 = t1 * cos((phi + tau) * r3) - a3;
        x3 = t1 * cos((phi + 2 * tau) * r3) - a3;
        // choose best percentage
        if (x1 >= 0 && x1 <= 1) {
            if (x2 >= 0 && x2 <= 1) {
                if (x3 >= 0 && x3 <= 1) {
                    return max(x1, x2, x3);
                }
                else {
                    return max(x1, x2);
                }
            }
            else if (x3 >= 0 && x3 <= 1) {
                return max(x1, x3);
            }
            else {
                return x1;
            }
        }
        else if (x2 >= 0 && x2 <= 1) {
            if (x3 >= 0 && x3 <= 1) {
                return max(x2, x3);
            }
            else {
                return x2;
            }
        }
        else {
            return x3;
        }
    }
    else if (discriminant === 0) {
        u1 = q2 < 0 ? crt(-q2) : -crt(q2);
        x1 = 2 * u1 - a3;
        x2 = -u1 - a3;
        // choose best percentage
        if (x1 >= 0 && x1 <= 1) {
            if (x2 >= 0 && x2 <= 1) {
                return max(x1, x2);
            }
            else {
                return x1;
            }
        }
        else {
            return x2;
        }
    }
    // one real root, and two imaginary roots
    else {
        const sd = sqrt(discriminant);
        u1 = crt(-q2 + sd);
        v1 = crt(q2 + sd);
        x1 = u1 - v1 - a3;
        return x1;
    }
}
function bezierByTime(controlPoints, x) {
    const percent = cardano(controlPoints, x); // t
    const p1y = controlPoints[1]; // b
    const p2y = controlPoints[3]; // c
    // return bezier(0, p1y, p2y, 1, percent);
    return ((1 - percent) * (p1y + (p2y - p1y) * percent) * 3 + percent * percent) * percent;
}

var QuatCurve_1;
/**
 * 在某四元数关键帧（前一帧）和其下一帧之间插值时使用的插值方式。
 */
var QuatInterpolationMode;
(function (QuatInterpolationMode) {
    /**
     * 在前一帧和后一帧之间执行球面线性插值。
     */
    QuatInterpolationMode[QuatInterpolationMode["SLERP"] = 0] = "SLERP";
    /**
     * 永远使用前一帧的值。
     */
    QuatInterpolationMode[QuatInterpolationMode["CONSTANT"] = 1] = "CONSTANT";
})(QuatInterpolationMode || (QuatInterpolationMode = {}));
let QuatKeyframeValue = class QuatKeyframeValue {
    constructor({ value, interpolationMode, easingMethod, } = {}) {
        /**
    
         * 在执行插值时，当以此关键帧作为起始关键帧时应当使用的插值方式。
         */
        this.interpolationMode = QuatInterpolationMode.SLERP;
        /**
    
         * 该关键帧的值。
         */
        this.value = mw.Quaternion.identity.clone();
        /**
         * @internal Reserved for backward compatibility. Will be removed in future.
         */
        this.easingMethod = EasingMethod.LINEAR;
        // TODO: shall we normalize it?
        this.value = value ? value.clone() : this.value;
        this.interpolationMode = interpolationMode ?? this.interpolationMode;
        this.easingMethod = easingMethod ?? this.easingMethod;
    }
};
__decorate([
    lighter.decorators.serializable
], QuatKeyframeValue.prototype, "interpolationMode", void 0);
__decorate([
    lighter.decorators.serializable
], QuatKeyframeValue.prototype, "value", void 0);
__decorate([
    lighter.decorators.serializable
], QuatKeyframeValue.prototype, "easingMethod", void 0);
QuatKeyframeValue = __decorate([
    lighter.decorators.tsclass("mwanim.QuatKeyframeValue")
], QuatKeyframeValue);
function createQuatKeyframeValue(params) {
    return new QuatKeyframeValue(params);
}
/**
 * @zh
 * 四元数曲线
 */
let QuatCurve = QuatCurve_1 = class QuatCurve extends KeyFrameCurve {
    constructor() {
        super(...arguments);
        /**
    
         * 获取或设置此曲线的前向外推模式。
         * 默认为 `ExtrapolationMode.CLAMP`。
         */
        this.preExtrapolation = ExtrapolationMode.CLAMP;
        /**
    
         * 获取或设置此曲线的后向外推模式。
         * 默认为 `ExtrapolationMode.CLAMP`。
         */
        this.postExtrapolation = ExtrapolationMode.CLAMP;
    }
    /**

     * 计算此曲线在指定时间上的值。
     */
    evaluate(time, quat) {
        if (!quat) {
            quat = mw.Quaternion.identity.clone();
        }
        const { _times: times, _values: values, postExtrapolation, preExtrapolation, } = this;
        const nFrames = times.length;
        if (nFrames === 0) {
            return quat;
        }
        const firstTime = times[0];
        const lastTime = times[nFrames - 1];
        if (time < firstTime) {
            // Underflow
            const preValue = values[0];
            switch (preExtrapolation) {
                case ExtrapolationMode.LOOP:
                    time = firstTime + repeat(time - firstTime, lastTime - firstTime);
                    break;
                case ExtrapolationMode.PING_PONG:
                    time = firstTime + pingPong(time - firstTime, lastTime - firstTime);
                    break;
                case ExtrapolationMode.CLAMP:
                default:
                    return quat.set(preValue.value);
            }
        }
        else if (time > lastTime) {
            // Overflow
            const preValue = values[nFrames - 1];
            switch (postExtrapolation) {
                case ExtrapolationMode.LOOP:
                    time = firstTime + repeat(time - firstTime, lastTime - firstTime);
                    break;
                case ExtrapolationMode.PING_PONG:
                    time = firstTime + pingPong(time - firstTime, lastTime - firstTime);
                    break;
                case ExtrapolationMode.CLAMP:
                default:
                    return quat.set(preValue.value);
            }
        }
        const index = binarySearchEpsilon(times, time);
        if (index >= 0) {
            const value = values[index].value;
            return quat.set(value);
        }
        const iNext = ~index;
        const iPre = iNext - 1;
        const preTime = times[iPre];
        const preValue = values[iPre];
        const nextTime = times[iNext];
        const nextValue = values[iNext];
        const dt = nextTime - preTime;
        const ratio = (time - preTime) / dt;
        switch (preValue.interpolationMode) {
            default:
            case QuatInterpolationMode.CONSTANT:
                return quat.set(preValue.value);
            case QuatInterpolationMode.SLERP: {
                const { easingMethod } = preValue;
                const transformedRatio = easingMethod === EasingMethod.LINEAR
                    ? ratio
                    : Array.isArray(easingMethod)
                        ? bezierByTime(easingMethod, ratio)
                        : getEasingFn(easingMethod)(ratio);
                return mw.Quaternion.slerp(preValue.value, nextValue.value, transformedRatio, quat);
            }
        }
    }
    addKeyframe(time, value) {
        const keyframeValue = new QuatKeyframeValue(value);
        return super.addKeyframe(time, keyframeValue);
    }
    assignSorted(times, values) {
        if (values !== undefined) {
            this.setKeyframes(times.slice(), values.map((value) => createQuatKeyframeValue(value)));
        }
        else {
            const keyframes = Array.from(times);
            this.setKeyframes(keyframes.map(([time]) => time), keyframes.map(([, value]) => createQuatKeyframeValue(value)));
        }
    }
    clone() {
        let curve = new QuatCurve_1();
        curve.preExtrapolation = this.preExtrapolation;
        curve.postExtrapolation = this.postExtrapolation;
        curve._times = this._times.slice();
        curve._values = this._values.map(value => new QuatKeyframeValue(value));
        return curve;
    }
};
__decorate([
    lighter.decorators.serializable
], QuatCurve.prototype, "preExtrapolation", void 0);
__decorate([
    lighter.decorators.serializable
], QuatCurve.prototype, "postExtrapolation", void 0);
QuatCurve = QuatCurve_1 = __decorate([
    lighter.decorators.tsclass("mwanim.QuatCurve")
], QuatCurve);

function maskIfEmpty(curve) {
    return curve.length === 0 ? undefined : curve;
}

var LineColorTrack_1;
var RGBRangeType;
(function (RGBRangeType) {
    //0~1
    RGBRangeType[RGBRangeType["ZeroToOne"] = 1] = "ZeroToOne";
    //0~255
    RGBRangeType[RGBRangeType["ZeroToFF"] = 255] = "ZeroToFF";
})(RGBRangeType || (RGBRangeType = {}));
const CHANNEL_NAMES$2 = ['r', 'g', 'b', 'a'];
/**
 * @zh
 * 颜色轨道描述目标上某个颜色属性的动画。
 */
let LineColorTrack = LineColorTrack_1 = class LineColorTrack extends Track {
    constructor(_rangeType = RGBRangeType.ZeroToOne) {
        super();
        this._rangeType = _rangeType;
        this._channels = new Array(4);
        for (let i = 0; i < this._channels.length; ++i) {
            const channel = new Channel(new RealCurve());
            channel.name = CHANNEL_NAMES$2[i];
            this._channels[i] = channel;
        }
    }
    /**
     * 返回此轨道的四条通道。
     */
    channels() {
        return this._channels;
    }
    [createEvalSymbol]() {
        return new ColorTrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve), maskIfEmpty(this._channels[3].curve), this._rangeType);
    }
    clone() {
        let ret = new LineColorTrack_1(this._rangeType);
        ret._channels.forEach((channel, i) => {
            channel.curve = this._channels[i].curve.clone();
            channel.name = this._channels[i].name;
        });
        ret.path = this.path.clone();
        ret.proxy = this.proxy;
        return ret;
    }
};
__decorate([
    lighter.decorators.serializable
], LineColorTrack.prototype, "_channels", void 0);
LineColorTrack = LineColorTrack_1 = __decorate([
    lighter.decorators.tsclass("mwanim.LineColorTrack")
], LineColorTrack);
class ColorTrackEval {
    constructor(_x, _y, _z, _w, _rangeType = RGBRangeType.ZeroToOne) {
        this._x = _x;
        this._y = _y;
        this._z = _z;
        this._w = _w;
        this._rangeType = _rangeType;
        this._result = mw.LinearColor.blue;
    }
    get requiresDefault() {
        return !this._x || !this._y || !this._z || !this._w;
    }
    evaluate(time) {
        if (this._x) {
            this._result.r = inverseLerp(0, this._rangeType, this._x.evaluate(time));
        }
        if (this._y) {
            this._result.g = inverseLerp(0, this._rangeType, this._y.evaluate(time));
        }
        if (this._z) {
            this._result.b = inverseLerp(0, this._rangeType, this._z.evaluate(time));
        }
        if (this._w) {
            this._result.a = inverseLerp(0, this._rangeType, this._w.evaluate(time));
        }
        return this._result;
    }
}
function inverseLerp(from, to, value) {
    if (from < to) {
        if (value < from)
            return 0.0;
        else if (value > to)
            return 1.0;
        else {
            value -= from;
            value /= (to - from);
            return value;
        }
    }
    else if (from > to) {
        if (value < to)
            return 1.0;
        else if (value > from)
            return 0;
        else {
            return 1 - ((value - to) / (from - to));
        }
    }
    else {
        return 0.0;
    }
}

var QuatTrack_1;
/**

 * 四元数轨道描述目标上某个四元数（旋转）属性的动画。
 */
let QuatTrack = QuatTrack_1 = class QuatTrack extends SingleChannelTrack {
    /**
     * @internal
     */
    createCurve() {
        return new QuatCurve();
    }
    /**
     * @internal
     */
    [createEvalSymbol]() {
        return new QuatTrackEval(this.channels()[0].curve);
    }
    clone() {
        const track = new QuatTrack_1();
        track.channel.name = this.channel.name;
        track.channel.curve = this.channel.curve.clone();
        track.path = this.path.clone();
        track.proxy = this.proxy;
        return track;
    }
};
QuatTrack = QuatTrack_1 = __decorate([
    lighter.decorators.tsclass("mwanim.QuatTrack")
], QuatTrack);
class QuatTrackEval {
    constructor(_curve) {
        this._curve = _curve;
        this._result = new mw.Quaternion();
    }
    get requiresDefault() {
        return false;
    }
    evaluate(time) {
        this._curve.evaluate(time, this._result);
        return this._result;
    }
}

var VectorTrack_1;
const CHANNEL_NAMES$1 = ['x', 'y', 'z', 'w'];
/**
 * 向量轨道描述目标上某个（二、三、四维）向量属性的动画。
 */
let VectorTrack = VectorTrack_1 = class VectorTrack extends Track {
    constructor() {
        super();
        this._nComponents = 4;
    }
    /**
     * @zh 获取或设置此轨道在求值时有效的分量数（维度）。
     */
    get componentsCount() {
        return this._nComponents;
    }
    set componentsCount(value) {
        this._nComponents = value;
        this._channels = new Array(value);
        for (let i = 0; i < this._channels.length; ++i) {
            const channel = new Channel(new RealCurve());
            channel.name = CHANNEL_NAMES$1[i];
            this._channels[i] = channel;
        }
    }
    /**
     * @zh 返回此轨道的四条通道。
     */
    channels() {
        return this._channels;
    }
    /**
     * @internal
     */
    [createEvalSymbol]() {
        switch (this._nComponents) {
            default:
            case 2:
                return new Vec2TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve));
            case 3:
                return new Vec3TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve));
            case 4:
                return new Vec4TrackEval(maskIfEmpty(this._channels[0].curve), maskIfEmpty(this._channels[1].curve), maskIfEmpty(this._channels[2].curve), maskIfEmpty(this._channels[3].curve));
        }
    }
    clone() {
        let ret = new VectorTrack_1();
        ret.componentsCount = this._nComponents;
        ret._channels.forEach((channel, i) => {
            channel.curve = this._channels[i].curve.clone();
            channel.name = this._channels[i].name;
        });
        ret.path = this.path.clone();
        ret.proxy = this.proxy;
        return ret;
    }
};
__decorate([
    lighter.decorators.serializable
], VectorTrack.prototype, "_channels", void 0);
__decorate([
    lighter.decorators.serializable
], VectorTrack.prototype, "_nComponents", void 0);
VectorTrack = VectorTrack_1 = __decorate([
    lighter.decorators.tsclass("mwanim.VectorTrack")
], VectorTrack);
class Vec2TrackEval {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
        this._result = new mw.Vector2();
    }
    get requiresDefault() {
        return !this._x || !this._y;
    }
    evaluate(time) {
        if (this._x) {
            this._result.x = this._x.evaluate(time);
        }
        if (this._y) {
            this._result.y = this._y.evaluate(time);
        }
        return this._result;
    }
}
class Vec3TrackEval {
    constructor(_x, _y, _z) {
        this._x = _x;
        this._y = _y;
        this._z = _z;
        this._result = new mw.Vector();
    }
    get requiresDefault() {
        return !this._x || !this._y || !this._z;
    }
    evaluate(time) {
        const { _x, _y, _z, _result } = this;
        if (_x) {
            _result.x = _x.evaluate(time);
        }
        if (_y) {
            _result.y = _y.evaluate(time);
        }
        if (_z) {
            _result.z = _z.evaluate(time);
        }
        return _result;
    }
}
class Vec4TrackEval {
    constructor(_x, _y, _z, _w) {
        this._x = _x;
        this._y = _y;
        this._z = _z;
        this._w = _w;
        this._result = new mw.Vector4();
    }
    get requiresDefault() {
        return !this._x || !this._y || !this._z || !this._w;
    }
    evaluate(time) {
        if (this._x) {
            this._result.x = this._x.evaluate(time);
        }
        if (this._y) {
            this._result.y = this._y.evaluate(time);
        }
        if (this._z) {
            this._result.z = this._z.evaluate(time);
        }
        if (this._w) {
            this._result.w = this._w.evaluate(time);
        }
        return this._result;
    }
}

var RotationTrack_1;
let RotationTrack = RotationTrack_1 = class RotationTrack extends Track {
    constructor() {
        super();
        this._vectorTrack = new VectorTrack();
        this._vectorTrack.componentsCount = 3;
    }
    channels() {
        return this._vectorTrack.channels();
    }
    [createEvalSymbol]() {
        const trackEval = this._vectorTrack[createEvalSymbol]();
        let ret = new RotationTrackEval(trackEval);
        return ret;
    }
    clone() {
        let ret = new RotationTrack_1();
        ret._vectorTrack = this._vectorTrack.clone();
        ret.path = this.path.clone();
        ret.proxy = this.proxy;
        return ret;
    }
};
__decorate([
    lighter.decorators.serializable
], RotationTrack.prototype, "_vectorTrack", void 0);
RotationTrack = RotationTrack_1 = __decorate([
    lighter.decorators.tsclass("mwanim.RotationTrack")
], RotationTrack);
class RotationTrackEval {
    constructor(_vec3TrackEval) {
        this._vec3TrackEval = _vec3TrackEval;
        this._rotation = new mw.Rotation();
    }
    get requiresDefault() {
        return this._vec3TrackEval.requiresDefault;
    }
    evaluate(time, defaultValue) {
        const value = this._vec3TrackEval.evaluate(time);
        this._rotation.set(value.x, value.y, value.z);
        return this._rotation;
    }
}

let VectorAnimateBindings = class VectorAnimateBindings {
    matchOf(target) {
        return target instanceof mw.Vector || target instanceof mw.Vector2 || target instanceof mw.Vector4;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        const length = Object.keys(target).length;
        let track = new VectorTrack();
        track.componentsCount = length;
        track.path = trackPath.clone();
        outProperties.push(track);
    }
};
VectorAnimateBindings = __decorate([
    registerCustomBindings
], VectorAnimateBindings);
let RotationAnimateBindings = class RotationAnimateBindings {
    matchOf(target) {
        return target instanceof mw.Rotation;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let track = new RotationTrack();
        track.path = trackPath.clone();
        outProperties.push(track);
    }
};
RotationAnimateBindings = __decorate([
    registerCustomBindings
], RotationAnimateBindings);
let LineColorAnimateBindings = class LineColorAnimateBindings {
    matchOf(target) {
        return target instanceof mw.LinearColor;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let track = new LineColorTrack(RGBRangeType.ZeroToOne);
        track.path = trackPath.clone();
        outProperties.push(track);
    }
};
LineColorAnimateBindings = __decorate([
    registerCustomBindings
], LineColorAnimateBindings);
let QuatAnimateBindings = class QuatAnimateBindings {
    matchOf(target) {
        return target instanceof mw.Quaternion;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let track = new QuatTrack();
        track.path = trackPath.clone();
        outProperties.push(track);
    }
};
QuatAnimateBindings = __decorate([
    registerCustomBindings
], QuatAnimateBindings);
let TransformBindings = class TransformBindings {
    matchOf(target) {
        return target instanceof mw.Transform;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let track2 = new VectorTrack();
        track2.componentsCount = 3;
        track2.path = trackPath.clone().toProperty("position");
        outProperties.push(track2);
        let track = new RotationTrack();
        track.path = trackPath.clone().toProperty("rotation");
        outProperties.push(track);
        let track1 = new VectorTrack();
        track1.componentsCount = 3;
        track1.path = trackPath.clone().toProperty("scale");
        outProperties.push(track1);
    }
};
TransformBindings = __decorate([
    registerCustomBindings
], TransformBindings);

var BuiltInTypeAccesor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get LineColorAnimateBindings () { return LineColorAnimateBindings; },
    get QuatAnimateBindings () { return QuatAnimateBindings; },
    get RotationAnimateBindings () { return RotationAnimateBindings; },
    get TransformBindings () { return TransformBindings; },
    get VectorAnimateBindings () { return VectorAnimateBindings; }
});

let GoCollisionValueProxy = class GoCollisionValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return target.getCollision();
            },
            set: (value) => {
                target.setCollision(value);
            }
        };
    }
};
GoCollisionValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.GoCollisionValueProxy")
], GoCollisionValueProxy);

let GoVisibleValueProxy = class GoVisibleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return target.getVisibility();
            },
            set: (value) => {
                target.setVisibility(value);
            }
        };
    }
};
GoVisibleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.GoVisibleValueProxy")
], GoVisibleValueProxy);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-21 14:53:24
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-28 14:11:52
 * @FilePath     : \Plugins\core-animator\src\property\accessor\BindingHelper.ts
 * @Description  : 属性绑定helper
 */
function isPureGameObject(target) {
    return !Reflect.has(target, "fogDensity") && !Reflect.has(target, "directionalLightColor") && !Reflect.has(target, "depthOfFieldEnabled") && !Reflect.has(target, "cloudColor")
        && !(target instanceof mw.Camera) && !Reflect.has(target, 'cameraFOV');
}
function isNotPrimitive(value) {
    return typeof value !== 'undefined' &&
        typeof value !== 'boolean' &&
        typeof value !== 'number' &&
        typeof value !== 'string' &&
        typeof value !== 'symbol' &&
        typeof value !== 'bigint'; // 如果需要考虑BigInt类型
}
function getCameraTransform(target) {
    return mw.Transform['fromUETransform'](target['ueCamera']['CameraSystemComponent']['GetCameraRelativeTransform']())['setHolder'](target, 'localTransform');
}
function setCameraTransform(target, transform) {
    target['ueCamera']['CameraSystemComponent']['SetCameraRelativeTransform'](transform['toUETransform']());
}

var bindHelper = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getCameraTransform: getCameraTransform,
    isNotPrimitive: isNotPrimitive,
    isPureGameObject: isPureGameObject,
    setCameraTransform: setCameraTransform
});

let GameObjectAnimateBindings = class GameObjectAnimateBindings {
    matchOf(target) {
        return target instanceof mw.GameObject && isPureGameObject(target);
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        // visible
        const visibleTrack = new ObjectTrack();
        visibleTrack.path = trackPath.clone().toFunction('setVisibility', 'visible');
        visibleTrack.proxy = new GoVisibleValueProxy();
        outProperties.push(visibleTrack);
        // collision
        const collisionTrack = new ObjectTrack();
        collisionTrack.path = trackPath.clone().toFunction('setCollision', 'collision');
        collisionTrack.proxy = new GoCollisionValueProxy();
        outProperties.push(collisionTrack);
        // transform
        if (target instanceof mw.Character) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target.worldTransform, outProperties, trackPath.clone().toProperty('worldTransform'));
        }
        else {
            GenericAnimationBindingCache.getAllAnimatableProperties(target.localTransform, outProperties, trackPath.clone().toProperty('localTransform'));
        }
        // material
        if ('getMaterialInstance' in target) {
            const materials = target.getMaterialInstance();
            for (let i = 0; i < materials.length; i++) {
                const material = materials[i];
                GenericAnimationBindingCache.getAllAnimatableProperties(material, outProperties, trackPath.clone().toFunction('getMaterialInstance', 'material').toElement(i));
            }
        }
        // script
        const components = target.getComponents();
        for (const component of components) {
            const name = Object.getPrototypeOf(component.constructor).name;
            GenericAnimationBindingCache.getAllAnimatableProperties(component, outProperties, trackPath.clone().toScript(name));
        }
    }
};
GameObjectAnimateBindings = __decorate([
    registerCustomBindings
], GameObjectAnimateBindings);

let MaterialScalarValueProxy = class MaterialScalarValueProxy {
    constructor() {
        this.simulateParameterName = '';
    }
    forTarget(target) {
        return {
            get: () => {
                return target.getScalarParameterValue(this.simulateParameterName);
            },
            set: (value) => {
                target.setScalarParameterValue(this.simulateParameterName, value);
            }
        };
    }
};
MaterialScalarValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.MaterialScalarValueProxy")
], MaterialScalarValueProxy);

let MaterialTextureValueProxy = class MaterialTextureValueProxy {
    constructor() {
        this.simulateParameterName = '';
    }
    forTarget(target) {
        return {
            get: () => {
                return target.getTextureParameterValue(this.simulateParameterName);
            },
            set: (value) => {
                target.setTextureParameterValue(this.simulateParameterName, value);
            }
        };
    }
};
MaterialTextureValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.MaterialTextureValueProxy")
], MaterialTextureValueProxy);

let MaterialVectorValueProxy = class MaterialVectorValueProxy {
    constructor() {
        this.simulateParameterName = '';
    }
    forTarget(target) {
        return {
            get: () => {
                return target.getVectorParameterValue(this.simulateParameterName);
            },
            set: (value) => {
                target.setVectorParameterValue(this.simulateParameterName, value);
            }
        };
    }
};
MaterialVectorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.MaterialVectorValueProxy")
], MaterialVectorValueProxy);

function camelCase(str) {
    str = str.replace(/\_/g, '');
    return str.charAt(0).toLowerCase() + str.slice(1);
}
let MaterialInstanceBindings = class MaterialInstanceBindings {
    matchOf(target) {
        if (typeof (target) !== "object") {
            return false;
        }
        return 'getScalarParameterValue' in target && 'getTextureParameterValue' in target && 'getVectorParameterValue' in target;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let properties = target.getAllScalarParameterName();
        for (const property of properties) {
            const track = new RealTrack();
            track.proxy = new MaterialScalarValueProxy();
            track.path = trackPath.clone().toSimulateProxy(property, camelCase(property));
            outProperties.push(track);
        }
        properties = target.getAllTextureParameterName();
        for (const property of properties) {
            const track = new ObjectTrack();
            track.proxy = new MaterialTextureValueProxy();
            track.path = trackPath.clone().toSimulateProxy(property, camelCase(property));
            outProperties.push(track);
        }
        properties = target.getAllVectorParameterName();
        for (const property of properties) {
            const track = new LineColorTrack();
            track.proxy = new MaterialVectorValueProxy();
            track.path = trackPath.clone().toSimulateProxy(property, camelCase(property));
            outProperties.push(track);
        }
    }
};
MaterialInstanceBindings = __decorate([
    registerCustomBindings
], MaterialInstanceBindings);

let ScriptAnimateBindings = class ScriptAnimateBindings {
    matchOf(target) {
        return target instanceof mw.Script;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        const properties = target.gameObject.getComponentPropertys(target.constructor);
        const rootPath = trackPath;
        for (const [k, v] of properties) {
            const defaultV = target[k] || v.defaultValue;
            let path = rootPath.clone().toProperty(k);
            if (defaultV instanceof Array) {
                let length = defaultV.length;
                for (let i = 0; i < length; i++) {
                    this.getGenericTrack(defaultV[i], outProperties, path.clone().toElement(i), v);
                }
            }
            else {
                this.getGenericTrack(defaultV, outProperties, trackPath, v);
            }
        }
    }
    getGenericTrack(value, outProperties, trackPath, propertyOption) {
        if (propertyOption.enumType || propertyOption.selectOptions) {
            let track = new ObjectTrack();
            track.path = trackPath.clone();
            outProperties.push(track);
            return;
        }
        GenericAnimationBindingCache.getAllAnimatableProperties(value, outProperties, trackPath);
    }
};
ScriptAnimateBindings = __decorate([
    registerCustomBindings
], ScriptAnimateBindings);

let TransitionEnableValueProxy = class TransitionEnableValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return target.isTransitionEnable;
            },
            set: (value) => {
                target.enableTransition = value;
            }
        };
    }
};
TransitionEnableValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.transitionEnableValueProxy")
], TransitionEnableValueProxy);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-22 18:45:33
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-27 18:18:50
 * @FilePath     : \Animator\Plugins\core-animator\src\track\MarginTrack.ts
 * @Description  : UI Margin对象Track
 */
var MarginTrack_1;
const CHANNEL_NAMES = ['left', 'top', 'right', 'bottom'];
let MarginTrack = MarginTrack_1 = class MarginTrack extends Track {
    constructor() {
        super();
        this._vectorTrack = new VectorTrack();
        this._vectorTrack.componentsCount = 4;
        let channels = this._vectorTrack.channels();
        for (let i = 0; i < channels.length; ++i) {
            const channel = new Channel(new RealCurve());
            channel.name = CHANNEL_NAMES[i];
            channels[i] = channel;
        }
    }
    channels() {
        return this._vectorTrack.channels();
    }
    [createEvalSymbol]() {
        const trackEval = this._vectorTrack[createEvalSymbol]();
        let ret = new MarginTrackEval(trackEval);
        return ret;
    }
    clone() {
        let ret = new MarginTrack_1();
        ret._vectorTrack = this._vectorTrack.clone();
        ret.path = this.path.clone();
        ret.proxy = this.proxy;
        return ret;
    }
};
__decorate([
    lighter.decorators.serializable
], MarginTrack.prototype, "_vectorTrack", void 0);
MarginTrack = MarginTrack_1 = __decorate([
    lighter.decorators.tsclass("mwanim.MarginTrack")
], MarginTrack);
class MarginTrackEval {
    constructor(_vec4TrackEval) {
        this._vec4TrackEval = _vec4TrackEval;
        this._margin = new mw.Margin(0);
    }
    get requiresDefault() {
        return this._vec4TrackEval.requiresDefault;
    }
    evaluate(time, defaultValue) {
        const value = this._vec4TrackEval.evaluate(time);
        this._margin.left = value.x;
        this._margin.top = value.y;
        this._margin.right = value.z;
        this._margin.bottom = value.w;
        return this._margin;
    }
}

const WidgetCopyProperties = [
    'enable',
    'renderTransformAngle',
    'renderTransformPivot',
    'renderShear',
    'renderScale',
    'renderOpacity',
    'constraints',
    'size',
    'autoSizeHorizontalEnable',
    'autoSizeVerticalEnable',
    'position',
];
let WidgetAnimateBindings = class WidgetAnimateBindings {
    matchOf(target) {
        return target instanceof Widget;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        // visible
        const visibleTrack = new ObjectTrack();
        visibleTrack.path = trackPath.clone().toProperty('visibility');
        outProperties.push(visibleTrack);
        // other
        for (const property of WidgetCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
    }
};
WidgetAnimateBindings = __decorate([
    registerCustomBindings
], WidgetAnimateBindings);
const CanvasCopyProperties = [
    'clipEnable',
    'autoLayoutEnable',
    'autoLayoutSpacing'
];
let CanvasAnimateBindings = class CanvasAnimateBindings {
    matchOf(target) {
        return target instanceof Canvas;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of CanvasCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let autoLayoutRuleTrack = new ObjectTrack();
        autoLayoutRuleTrack.path = trackPath.clone().toProperty("autoLayoutRule");
        outProperties.push(autoLayoutRuleTrack);
        let autoLayoutContainerRuleTrack = new ObjectTrack();
        autoLayoutContainerRuleTrack.path = trackPath.clone().toProperty("autoLayoutContainerRule");
        outProperties.push(autoLayoutContainerRuleTrack);
        let autoLayoutPacketRuleTrack = new ObjectTrack();
        autoLayoutContainerRuleTrack.path = trackPath.clone().toProperty("autoLayoutPacketRule");
        outProperties.push(autoLayoutPacketRuleTrack);
        let autoLayoutPaddingTrack = new MarginTrack();
        autoLayoutPaddingTrack.path = trackPath.clone().toProperty("autoLayoutPadding");
        outProperties.push(autoLayoutPaddingTrack);
    }
};
CanvasAnimateBindings = __decorate([
    registerCustomBindings
], CanvasAnimateBindings);
const ImageCopyProperties = [
    'imageSize',
    'imageColor',
    'imageGuid'
];
let ImageAnimateBindings = class ImageAnimateBindings {
    matchOf(target) {
        return target instanceof Image;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of ImageCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let imageDrawTypeTrack = new ObjectTrack();
        imageDrawTypeTrack.path = trackPath.clone().toProperty("imageDrawType");
        outProperties.push(imageDrawTypeTrack);
        let marginTrack = new MarginTrack();
        marginTrack.path = trackPath.clone().toProperty("margin");
        outProperties.push(marginTrack);
    }
};
ImageAnimateBindings = __decorate([
    registerCustomBindings
], ImageAnimateBindings);
const StaleButtonCopyProperties = [
    'focusable',
    'text',
    'fontSize',
    'fontLetterSpace',
    'strikethroughEnable',
    'underlineEnable',
    'contentColor',
    'fontColor',
    'shadowColor',
    'shadowOffset',
    'outlineColor',
    'outlineSize',
    'normalImageGuid',
    'normalImageSize',
    'normalImageColor',
    'transitionEnable',
    'pressedImageGuid',
    'pressedImageSize',
    'pressedImagColor',
    'disableImageGuid',
    'disableImageSize',
    'disableImageColor'
];
let StaleButtonAnimateBindings = class StaleButtonAnimateBindings {
    matchOf(target) {
        return target instanceof StaleButton;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of StaleButtonCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let glyphTrack = new ObjectTrack();
        glyphTrack.path = trackPath.clone().toProperty("glyph");
        outProperties.push(glyphTrack);
        let textAlignTrack = new ObjectTrack();
        textAlignTrack.path = trackPath.clone().toProperty("textAlign");
        outProperties.push(textAlignTrack);
        let textVerticalAlignTrack = new ObjectTrack();
        textVerticalAlignTrack.path = trackPath.clone().toProperty("textVerticalAlign");
        outProperties.push(textVerticalAlignTrack);
        let normalImageDrawTypeTrack = new ObjectTrack();
        normalImageDrawTypeTrack.path = trackPath.clone().toProperty("normalImageDrawType");
        outProperties.push(normalImageDrawTypeTrack);
        let normalImageMarginTrack = new MarginTrack();
        normalImageMarginTrack.path = trackPath.clone().toProperty("normalImageMargin");
        outProperties.push(normalImageMarginTrack);
        let pressedImageDrawTypeTrack = new ObjectTrack();
        pressedImageDrawTypeTrack.path = trackPath.clone().toProperty("pressedImageDrawType");
        outProperties.push(pressedImageDrawTypeTrack);
        let pressedImageMarginTrack = new MarginTrack();
        pressedImageMarginTrack.path = trackPath.clone().toProperty("pressedImageMargin");
        outProperties.push(pressedImageMarginTrack);
        let disableImageDrawTypeTrack = new ObjectTrack();
        disableImageDrawTypeTrack.path = trackPath.clone().toProperty("disableImageDrawType");
        outProperties.push(disableImageDrawTypeTrack);
        let disableImageMarginTrack = new MarginTrack();
        disableImageMarginTrack.path = trackPath.clone().toProperty("disableImageMargin");
        outProperties.push(disableImageMarginTrack);
    }
};
StaleButtonAnimateBindings = __decorate([
    registerCustomBindings
], StaleButtonAnimateBindings);
const ButtonCopyProperties = [
    'focusable',
    'transitionEnable',
    'normalImageGuid',
    'normalImageSize',
    'normalImageColor',
    'pressedImageGuid',
    'pressedImageSize',
    'pressedImagColor',
    'disableImageGuid',
    'disableImageSize',
    'disableImageColor',
];
let ButtonAnimateBindings = class ButtonAnimateBindings {
    matchOf(target) {
        return target instanceof Button;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of ButtonCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let normalImageDrawTypeTrack = new ObjectTrack();
        normalImageDrawTypeTrack.path = trackPath.clone().toProperty("normalImageDrawType");
        outProperties.push(normalImageDrawTypeTrack);
        let normalImageMarginTrack = new MarginTrack();
        normalImageMarginTrack.path = trackPath.clone().toProperty("normalImageMargin");
        outProperties.push(normalImageMarginTrack);
        let pressedImageDrawTypeTrack = new ObjectTrack();
        pressedImageDrawTypeTrack.path = trackPath.clone().toProperty("pressedImageDrawType");
        outProperties.push(pressedImageDrawTypeTrack);
        let pressedImageMarginTrack = new MarginTrack();
        pressedImageMarginTrack.path = trackPath.clone().toProperty("pressedImageMargin");
        outProperties.push(pressedImageMarginTrack);
        let disableImageDrawTypeTrack = new ObjectTrack();
        disableImageDrawTypeTrack.path = trackPath.clone().toProperty("disableImageDrawType");
        outProperties.push(disableImageDrawTypeTrack);
        let disableImageMarginTrack = new MarginTrack();
        disableImageMarginTrack.path = trackPath.clone().toProperty("disableImageMargin");
        outProperties.push(disableImageMarginTrack);
    }
};
ButtonAnimateBindings = __decorate([
    registerCustomBindings
], ButtonAnimateBindings);
const MaskButtonCopyProperties = [
    'focusable',
    'normalImageGuid',
    'normalImageSize',
    'normalImageColor',
    'pressedImageGuid',
    'pressedImageSize',
    'pressedImagColor',
    'disableImageGuid',
    'disableImageSize',
    'disableImageColor',
    'maskImageGuid',
    'maskImageColor',
    'maskTextureOpacity',
    'maskOpacity',
    'useMaskTextureOpacity',
    'inverseOpacity',
    'fanShapedRotatedCenter',
    'fanShapedRotated',
    'fanShapedValue',
    'circleCenter',
    'circleValue',
    'roundBoxPercentOffset',
    'roundBoxRadius',
    'roundBoxSharpness',
    'roundBoxUVRatio'
];
let MaskButtonAnimateBindings = class MaskButtonAnimateBindings {
    matchOf(target) {
        return target instanceof MaskButton;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of MaskButtonCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let transitionEnableTrack = new ObjectTrack();
        transitionEnableTrack.path = trackPath.clone().toFunction("isTransitionEnable");
        transitionEnableTrack.proxy = new TransitionEnableValueProxy();
        outProperties.push(transitionEnableTrack);
        let clickMethodTrack = new ObjectTrack();
        clickMethodTrack.path = trackPath.clone().toProperty("clickMethod");
        outProperties.push(clickMethodTrack);
        let pressedMethodTrack = new ObjectTrack();
        pressedMethodTrack.path = trackPath.clone().toProperty("pressedMethod");
        outProperties.push(pressedMethodTrack);
        let touchMethodTrack = new ObjectTrack();
        touchMethodTrack.path = trackPath.clone().toProperty("touchMethod");
        outProperties.push(touchMethodTrack);
        let normalImageDrawTypeTrack = new ObjectTrack();
        normalImageDrawTypeTrack.path = trackPath.clone().toProperty("normalImageDrawType");
        outProperties.push(normalImageDrawTypeTrack);
        let normalImageMarginTrack = new MarginTrack();
        normalImageMarginTrack.path = trackPath.clone().toProperty("normalImageMargin");
        outProperties.push(normalImageMarginTrack);
        let pressedImageDrawTypeTrack = new ObjectTrack();
        pressedImageDrawTypeTrack.path = trackPath.clone().toProperty("pressedImageDrawType");
        outProperties.push(pressedImageDrawTypeTrack);
        let pressedImageMarginTrack = new MarginTrack();
        pressedImageMarginTrack.path = trackPath.clone().toProperty("pressedImageMargin");
        outProperties.push(pressedImageMarginTrack);
        let disableImageDrawTypeTrack = new ObjectTrack();
        disableImageDrawTypeTrack.path = trackPath.clone().toProperty("disableImageDrawType");
        outProperties.push(disableImageDrawTypeTrack);
        let disableImageMarginTrack = new MarginTrack();
        disableImageMarginTrack.path = trackPath.clone().toProperty("disableImageMargin");
        outProperties.push(disableImageMarginTrack);
        let maskTypeTrack = new ObjectTrack();
        maskTypeTrack.path = trackPath.clone().toProperty("maskType");
        outProperties.push(maskTypeTrack);
    }
};
MaskButtonAnimateBindings = __decorate([
    registerCustomBindings
], MaskButtonAnimateBindings);
const TextBlockCopyProperties = [
    'text',
    'autoAdjust',
    'lineHeightPercentage',
    'fontSize',
    'fontLetterSpace',
    'strikethroughEnable',
    'underlineEnable',
    'contentColor',
    'fontColor',
    'shadowColor',
    'shadowOffset',
    'outlineColor',
    'outlineSize',
    'isRichText',
];
let TextBlockAnimateBindings = class TextBlockAnimateBindings {
    matchOf(target) {
        return target instanceof TextBlock;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of TextBlockCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let textHorizontalLayoutTrack = new ObjectTrack();
        textHorizontalLayoutTrack.path = trackPath.clone().toProperty("textHorizontalLayout");
        outProperties.push(textHorizontalLayoutTrack);
        let textVerticalAlignTrack = new ObjectTrack();
        textVerticalAlignTrack.path = trackPath.clone().toProperty("textVerticalAlign");
        outProperties.push(textVerticalAlignTrack);
        let glyphTrack = new ObjectTrack();
        glyphTrack.path = trackPath.clone().toProperty("glyph");
        outProperties.push(glyphTrack);
        let pressedImageMarginTrack = new MarginTrack();
        pressedImageMarginTrack.path = trackPath.clone().toProperty("pressedImageMargin");
        outProperties.push(pressedImageMarginTrack);
        let textAlignTrack = new ObjectTrack();
        textAlignTrack.path = trackPath.clone().toProperty("textAlign");
        outProperties.push(textAlignTrack);
        let textJustificationTrack = new ObjectTrack();
        textJustificationTrack.path = trackPath.clone().toProperty("textJustification");
        outProperties.push(textJustificationTrack);
        let textVerticalJustificationTrack = new ObjectTrack();
        textVerticalJustificationTrack.path = trackPath.clone().toProperty("textVerticalJustification");
        outProperties.push(textVerticalJustificationTrack);
    }
};
TextBlockAnimateBindings = __decorate([
    registerCustomBindings
], TextBlockAnimateBindings);
const InputBoxCopyProperties = [
    'strikethroughEnable',
    'underlineEnable',
    'contentColor',
    'shadowColor',
    'shadowOffset',
    'outlineColor',
    'outlineSize',
    'readOnlyEnable',
    'isRichText',
    'text',
    'hintString',
    'fontColor',
    'autoWrap',
    'textLengthLimit',
    'fontSize',
    'fontLetterSpace',
    'errorText'
];
let InputBoxAnimateBindings = class InputBoxAnimateBindings {
    matchOf(target) {
        return target instanceof InputBox;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of InputBoxCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let textVerticalAlignTrack = new ObjectTrack();
        textVerticalAlignTrack.path = trackPath.clone().toProperty("textVerticalAlign");
        outProperties.push(textVerticalAlignTrack);
        let glyphTrack = new ObjectTrack();
        glyphTrack.path = trackPath.clone().toProperty("glyph");
        outProperties.push(glyphTrack);
        let textAlignTrack = new ObjectTrack();
        textAlignTrack.path = trackPath.clone().toProperty("textAlign");
        outProperties.push(textAlignTrack);
        let inputTextLimitTrack = new ObjectTrack();
        inputTextLimitTrack.path = trackPath.clone().toProperty("inputTextLimit");
        outProperties.push(inputTextLimitTrack);
        let newLineKeyBindTrack = new ObjectTrack();
        newLineKeyBindTrack.path = trackPath.clone().toProperty("newLineKeyBind");
        outProperties.push(newLineKeyBindTrack);
    }
};
InputBoxAnimateBindings = __decorate([
    registerCustomBindings
], InputBoxAnimateBindings);
const ProgressBarCopyProperties = [
    'backgroundImageGuid',
    'backgroundImageSize',
    'backgroundImageSize',
    'fillImageGuid',
    'fillImageSize',
    'fillImageColor',
    'thumbImageGuid',
    'thumbImageSize',
    'thumbImageColor',
    'currentValue',
    'sliderMinValue',
    'sliderMaxValue',
    'percent',
    'barThickness',
];
let ProgressBarAnimateBindings = class ProgressBarAnimateBindings {
    matchOf(target) {
        return target instanceof ProgressBar;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of ProgressBarCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let fillType = new ObjectTrack();
        fillType.path = trackPath.clone().toProperty("fillType");
        outProperties.push(fillType);
        let backgroundImageMargin = new MarginTrack();
        backgroundImageMargin.path = trackPath.clone().toProperty("backgroundImageMargin");
        outProperties.push(backgroundImageMargin);
        let backgroundImageDrawType = new ObjectTrack();
        backgroundImageDrawType.path = trackPath.clone().toProperty("backgroundImageDrawType");
        outProperties.push(backgroundImageDrawType);
        let fillImageMargin = new MarginTrack();
        fillImageMargin.path = trackPath.clone().toProperty("fillImageMargin");
        outProperties.push(fillImageMargin);
        let fillImageDrawType = new ObjectTrack();
        fillImageDrawType.path = trackPath.clone().toProperty("fillImageDrawType");
        outProperties.push(fillImageDrawType);
        let thumbImageMargin = new MarginTrack();
        thumbImageMargin.path = trackPath.clone().toProperty("thumbImageMargin");
        outProperties.push(thumbImageMargin);
        let thumbImageDrawType = new ObjectTrack();
        thumbImageDrawType.path = trackPath.clone().toProperty("thumbImageDrawType");
        outProperties.push(thumbImageDrawType);
        let slideMethod = new ObjectTrack();
        slideMethod.path = trackPath.clone().toProperty("slideMethod");
        outProperties.push(slideMethod);
    }
};
ProgressBarAnimateBindings = __decorate([
    registerCustomBindings
], ProgressBarAnimateBindings);
const ScrollBoxCopyProperties = [
    'scrollbarThickness',
    'alwaysShowScrollBar',
    'scrollOffset',
    'elasticMultiplier',
    'supportElastic',
    'scrollAxisBrushGuid',
    'scrollAxisColor',
];
let ScrollBoxAnimateBindings = class ScrollBoxAnimateBindings {
    matchOf(target) {
        return target instanceof ScrollBox;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of ScrollBoxCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let orientation = new ObjectTrack();
        orientation.path = trackPath.clone().toProperty("orientation");
        outProperties.push(orientation);
        let scrollBarVisibility = new ObjectTrack();
        scrollBarVisibility.path = trackPath.clone().toProperty("scrollBarVisibility");
        outProperties.push(scrollBarVisibility);
        let defaultLocation = new ObjectTrack();
        defaultLocation.path = trackPath.clone().toProperty("defaultLocation");
        outProperties.push(defaultLocation);
        let animationType = new ObjectTrack();
        animationType.path = trackPath.clone().toProperty("animationType");
        outProperties.push(animationType);
        let shadowVisibility = new ObjectTrack();
        shadowVisibility.path = trackPath.clone().toProperty("shadowVisibility");
        outProperties.push(shadowVisibility);
        let scrollAxisBrushDrawType = new ObjectTrack();
        scrollAxisBrushDrawType.path = trackPath.clone().toProperty("scrollAxisBrushDrawType");
        outProperties.push(scrollAxisBrushDrawType);
        let scrollAxisBrushMargin = new MarginTrack();
        scrollAxisBrushMargin.path = trackPath.clone().toProperty("scrollAxisBrushMargin");
        outProperties.push(scrollAxisBrushMargin);
    }
};
ScrollBoxAnimateBindings = __decorate([
    registerCustomBindings
], ScrollBoxAnimateBindings);
const VirtualJoystickPanelCopyProperties = [
    'controlByMouseEnable',
    'center',
    'centerImageSize',
    'backgroundImageSize',
    'inputScale',
    'isLocationFixed',
    'timeUntilInactive',
    'timeUntilReset',
    'activeOpacity',
    'inActiveOpacity',
    'centerImageId',
    'centerTouchImage',
    'centerDisableImageId',
    'backgroundImageId',
    'backgroundTouchImageId',
    'backgroundDisabledImageId'
];
let VirtualJoystickPanelAnimateBindings = class VirtualJoystickPanelAnimateBindings {
    matchOf(target) {
        return target instanceof VirtualJoystickPanel;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of VirtualJoystickPanelCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
        let controlType = new ObjectTrack();
        controlType.path = trackPath.clone().toProperty("controlType");
        outProperties.push(controlType);
    }
};
VirtualJoystickPanelAnimateBindings = __decorate([
    registerCustomBindings
], VirtualJoystickPanelAnimateBindings);
let CheckboxAnimateBindings = class CheckboxAnimateBindings {
    matchOf(target) {
        return target instanceof Checkbox;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let checkState = new ObjectTrack();
        checkState.path = trackPath.clone().toProperty("checkState");
        outProperties.push(checkState);
        let touchMethod = new ObjectTrack();
        checkState.path = trackPath.clone().toProperty("touchMethod");
        outProperties.push(touchMethod);
    }
};
CheckboxAnimateBindings = __decorate([
    registerCustomBindings
], CheckboxAnimateBindings);
const DropdownCopyProperties = [
    'selectedOption',
    'selectedOptionIndex',
];
let DropdownAnimateBindings = class DropdownAnimateBindings {
    matchOf(target) {
        return target instanceof Dropdown;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of DropdownCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
    }
};
DropdownAnimateBindings = __decorate([
    registerCustomBindings
], DropdownAnimateBindings);
const TouchPadCopyProperties = [
    'inputScale',
    'controlByMouseEnable',
];
let TouchPadAnimateBindings = class TouchPadAnimateBindings {
    matchOf(target) {
        return target instanceof TouchPad;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        for (const property of TouchPadCopyProperties) {
            GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        }
    }
};
TouchPadAnimateBindings = __decorate([
    registerCustomBindings
], TouchPadAnimateBindings);
// TODO {@minjia.zhang/2024.02.19} 实现其他组件的属性动画化

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 10:16:19
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-12 10:06:19
 * @FilePath     : \Animator\Plugins\core-animator\src\proxy\SkyBoxValueProxy.ts
 * @Description  : 天空盒Proxy
 */
let SkyBoxCloudColorValueProxy = class SkyBoxCloudColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.cloudColor;
            },
            set: (value) => {
                Skybox.cloudColor = value;
            }
        };
    }
};
SkyBoxCloudColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxCloudColorValueProxy")
], SkyBoxCloudColorValueProxy);
let SkyBoxCloudDensityValueProxy = class SkyBoxCloudDensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.cloudDensity;
            },
            set: (value) => {
                Skybox.cloudDensity = value;
            }
        };
    }
};
SkyBoxCloudDensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxCloudDensityValueProxy")
], SkyBoxCloudDensityValueProxy);
let SkyBoxCloudOpacityValueProxy = class SkyBoxCloudOpacityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.cloudOpacity;
            },
            set: (value) => {
                Skybox.cloudOpacity = value;
            }
        };
    }
};
SkyBoxCloudOpacityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxCloudOpacityValueProxy")
], SkyBoxCloudOpacityValueProxy);
let SkyBoxCloudSpeedValueProxy = class SkyBoxCloudSpeedValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.cloudSpeed;
            },
            set: (value) => {
                Skybox.cloudSpeed = value;
            }
        };
    }
};
SkyBoxCloudSpeedValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxCloudSpeedValueProxy")
], SkyBoxCloudSpeedValueProxy);
let SkyBoxCloudTextureValueProxy = class SkyBoxCloudTextureValueProxy {
    constructor() {
        this.cloudTextureID = '';
    }
    forTarget(target) {
        return {
            get: () => {
                return this.cloudTextureID ? this.cloudTextureID : '';
            },
            set: (value) => {
                Skybox.cloudTextureID = value;
                this.cloudTextureID = value;
            }
        };
    }
};
SkyBoxCloudTextureValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxCloudTextureValueProxy")
], SkyBoxCloudTextureValueProxy);
let SkyBoxCloudVisibleValueProxy = class SkyBoxCloudVisibleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.cloudVisible;
            },
            set: (value) => {
                Skybox.cloudVisible = value;
            }
        };
    }
};
SkyBoxCloudVisibleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxCloudVisibleValueProxy")
], SkyBoxCloudVisibleValueProxy);
let SkyBoxMoonColorValueProxy = class SkyBoxMoonColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.moonColor;
            },
            set: (value) => {
                Skybox.moonColor = value;
            }
        };
    }
};
SkyBoxMoonColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxMoonColorValueProxy")
], SkyBoxMoonColorValueProxy);
let SkyBoxMoonIntensityValueProxy = class SkyBoxMoonIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.moonIntensity;
            },
            set: (value) => {
                Skybox.moonIntensity = value;
            }
        };
    }
};
SkyBoxMoonIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxMoonIntensityValueProxy")
], SkyBoxMoonIntensityValueProxy);
let SkyBoxMoonSizeValueProxy = class SkyBoxMoonSizeValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.moonSize;
            },
            set: (value) => {
                Skybox.moonSize = value;
            }
        };
    }
};
SkyBoxMoonSizeValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxMoonSizeValueProxy")
], SkyBoxMoonSizeValueProxy);
let SkyBoxMoonTextureValueProxy = class SkyBoxMoonTextureValueProxy {
    constructor() {
        this.moonTextureID = '';
    }
    forTarget(target) {
        return {
            get: () => {
                //没有get方法
                return this.moonTextureID ? this.moonTextureID : '';
            },
            set: (value) => {
                Skybox.moonTextureID = value;
            }
        };
    }
};
SkyBoxMoonTextureValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxMoonTextureValueProxy")
], SkyBoxMoonTextureValueProxy);
let SkyBoxMoonVisibleValueProxy = class SkyBoxMoonVisibleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.moonVisible;
            },
            set: (value) => {
                Skybox.moonVisible = value;
            }
        };
    }
};
SkyBoxMoonVisibleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxMoonVisibleValueProxy")
], SkyBoxMoonVisibleValueProxy);
let SkyBoxPresetValueProxy = class SkyBoxPresetValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.preset;
            },
            set: (value) => {
                Skybox.preset = value;
            }
        };
    }
};
SkyBoxPresetValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxPresetValueProxy")
], SkyBoxPresetValueProxy);
let SkyBoxDomeBottomColorValueProxy = class SkyBoxDomeBottomColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.skyDomeBottomColor;
            },
            set: (value) => {
                Skybox.skyDomeBottomColor = value;
            }
        };
    }
};
SkyBoxDomeBottomColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeBottomColorValueProxy")
], SkyBoxDomeBottomColorValueProxy);
let SkyBoxDomeBaseColorValueProxy = class SkyBoxDomeBaseColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.skyDomeBaseColor;
            },
            set: (value) => {
                Skybox.skyDomeBaseColor = value;
            }
        };
    }
};
SkyBoxDomeBaseColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeBaseColorValueProxy")
], SkyBoxDomeBaseColorValueProxy);
let SkyBoxDomeGradientEnabledValueProxy = class SkyBoxDomeGradientEnabledValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.skyDomeGradientEnabled;
            },
            set: (value) => {
                Skybox.skyDomeGradientEnabled = value;
            }
        };
    }
};
SkyBoxDomeGradientEnabledValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeGradientEnabledValueProxy")
], SkyBoxDomeGradientEnabledValueProxy);
let SkyBoxDomeHorizontalFallOffValueProxy = class SkyBoxDomeHorizontalFallOffValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.skyDomeHorizontalFallOff;
            },
            set: (value) => {
                Skybox.skyDomeHorizontalFallOff = value;
            }
        };
    }
};
SkyBoxDomeHorizontalFallOffValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeHorizontalFallOffValueProxy")
], SkyBoxDomeHorizontalFallOffValueProxy);
let SkyBoxDomeIntensityValueProxy = class SkyBoxDomeIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.skyDomeIntensity;
            },
            set: (value) => {
                Skybox.skyDomeIntensity = value;
            }
        };
    }
};
SkyBoxDomeIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeIntensityValueProxy")
], SkyBoxDomeIntensityValueProxy);
let SkyBoxDomeMiddleColorValueProxy = class SkyBoxDomeMiddleColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.skyDomeMiddleColor;
            },
            set: (value) => {
                Skybox.skyDomeMiddleColor = value;
            }
        };
    }
};
SkyBoxDomeMiddleColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeMiddleColorValueProxy")
], SkyBoxDomeMiddleColorValueProxy);
let SkyBoxDomeTextureIDValueProxy = class SkyBoxDomeTextureIDValueProxy {
    constructor() {
        this.skyDomeTextureID = '';
    }
    forTarget(target) {
        return {
            get: () => {
                return this.skyDomeTextureID ? this.skyDomeTextureID : '';
            },
            set: (value) => {
                Skybox.skyDomeTextureID = value;
            }
        };
    }
};
SkyBoxDomeTextureIDValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeTextureIDValueProxy")
], SkyBoxDomeTextureIDValueProxy);
let SkyBoxDomeTopColorValueProxy = class SkyBoxDomeTopColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.skyDomeTopColor;
            },
            set: (value) => {
                Skybox.skyDomeTopColor = value;
            }
        };
    }
};
SkyBoxDomeTopColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxDomeTopColorValueProxy")
], SkyBoxDomeTopColorValueProxy);
let SkyBoxStarIntensityValueProxy = class SkyBoxStarIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.starIntensity;
            },
            set: (value) => {
                Skybox.starIntensity = value;
            }
        };
    }
};
SkyBoxStarIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxStarIntensityValueProxy")
], SkyBoxStarIntensityValueProxy);
let SkyBoxStarDensityValueProxy = class SkyBoxStarDensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.starDensity;
            },
            set: (value) => {
                Skybox.starDensity = value;
            }
        };
    }
};
SkyBoxStarDensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxStarDensityValueProxy")
], SkyBoxStarDensityValueProxy);
let SkyBoxStarTextureValueProxy = class SkyBoxStarTextureValueProxy {
    constructor() {
        this.starTextureID = '';
    }
    forTarget(target) {
        return {
            get: () => {
                return this.starTextureID ? this.starTextureID : '';
            },
            set: (value) => {
                Skybox.starTextureID = value;
            }
        };
    }
};
SkyBoxStarTextureValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxStarTextureValueProxy")
], SkyBoxStarTextureValueProxy);
let SkyBoxStarVisibleValueProxy = class SkyBoxStarVisibleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.starVisible;
            },
            set: (value) => {
                Skybox.starVisible = value;
            }
        };
    }
};
SkyBoxStarVisibleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxStarVisibleValueProxy")
], SkyBoxStarVisibleValueProxy);
let SkyBoxSunColorValueProxy = class SkyBoxSunColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.sunColor;
            },
            set: (value) => {
                Skybox.sunColor = value;
            }
        };
    }
};
SkyBoxSunColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxSunColorValueProxy")
], SkyBoxSunColorValueProxy);
let SkyBoxSunIntensityValueProxy = class SkyBoxSunIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.sunIntensity;
            },
            set: (value) => {
                Skybox.sunIntensity = value;
            }
        };
    }
};
SkyBoxSunIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxSunIntensityValueProxy")
], SkyBoxSunIntensityValueProxy);
let SkyBoxSunSizeValueProxy = class SkyBoxSunSizeValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.sunSize;
            },
            set: (value) => {
                Skybox.sunSize = value;
            }
        };
    }
};
SkyBoxSunSizeValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxSunSizeValueProxy")
], SkyBoxSunSizeValueProxy);
let SkyBoxSunTextureIDValueProxy = class SkyBoxSunTextureIDValueProxy {
    constructor() {
        this.sunTextureID = '';
    }
    forTarget(target) {
        return {
            get: () => {
                return this.sunTextureID ? this.sunTextureID : '';
            },
            set: (value) => {
                Skybox.sunTextureID = value;
            }
        };
    }
};
SkyBoxSunTextureIDValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxSunTextureIDValueProxy")
], SkyBoxSunTextureIDValueProxy);
let SkyBoxSunVisibleValueProxy = class SkyBoxSunVisibleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.sunVisible;
            },
            set: (value) => {
                Skybox.sunVisible = value;
            }
        };
    }
};
SkyBoxSunVisibleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxSunVisibleValueProxy")
], SkyBoxSunVisibleValueProxy);
let SkyBoxYawAngleValueProxy = class SkyBoxYawAngleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Skybox.yawAngle;
            },
            set: (value) => {
                Skybox.yawAngle = value;
            }
        };
    }
};
SkyBoxYawAngleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.SkyBoxYawAngleValueProxy")
], SkyBoxYawAngleValueProxy);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 09:38:15
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-22 16:54:35
 * @FilePath     : \Plugins\core-animator\src\property\accessor\SkyBoxAnimateBindings.ts
 * @Description  : 天空盒动画绑定
 */
let SkyBoxAnimateBindings = class SkyBoxAnimateBindings {
    matchOf(target) {
        return isNotPrimitive(target) && Reflect.has(target, "cloudColor");
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let cloudColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        cloudColorTrack.path = trackPath.clone().toFunction('cloudColor');
        cloudColorTrack.proxy = new SkyBoxCloudColorValueProxy();
        outProperties.push(cloudColorTrack);
        let cloudDensityTrack = new RealTrack();
        cloudDensityTrack.path = trackPath.clone().toFunction('cloudDensity');
        cloudDensityTrack.proxy = new SkyBoxCloudDensityValueProxy();
        outProperties.push(cloudDensityTrack);
        let cloudOpacityTrack = new RealTrack();
        cloudOpacityTrack.path = trackPath.clone().toFunction('cloudOpacity');
        cloudOpacityTrack.proxy = new SkyBoxCloudOpacityValueProxy();
        outProperties.push(cloudOpacityTrack);
        let cloudSpeedTrack = new RealTrack();
        cloudSpeedTrack.path = trackPath.clone().toFunction('cloudSpeed');
        cloudSpeedTrack.proxy = new SkyBoxCloudSpeedValueProxy();
        outProperties.push(cloudSpeedTrack);
        let cloudTextureTrack = new ObjectTrack();
        cloudTextureTrack.path = trackPath.clone().toFunction('cloudTextureID');
        cloudTextureTrack.proxy = new SkyBoxCloudTextureValueProxy();
        outProperties.push(cloudTextureTrack);
        let cloudVisibleTrack = new ObjectTrack();
        cloudVisibleTrack.path = trackPath.clone().toFunction('cloudVisible');
        cloudVisibleTrack.proxy = new SkyBoxCloudVisibleValueProxy();
        outProperties.push(cloudVisibleTrack);
        let moonColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        moonColorTrack.path = trackPath.clone().toFunction('moonColor');
        moonColorTrack.proxy = new SkyBoxMoonColorValueProxy();
        outProperties.push(moonColorTrack);
        let moonIntensityTrack = new RealTrack();
        moonIntensityTrack.path = trackPath.clone().toFunction('moonIntensity');
        moonIntensityTrack.proxy = new SkyBoxMoonIntensityValueProxy();
        outProperties.push(moonIntensityTrack);
        let moonSizeTrack = new RealTrack();
        moonSizeTrack.path = trackPath.clone().toFunction('moonSize');
        moonSizeTrack.proxy = new SkyBoxMoonSizeValueProxy();
        outProperties.push(moonSizeTrack);
        let moonTextureTrack = new ObjectTrack();
        moonTextureTrack.path = trackPath.clone().toFunction('moonTextureID');
        moonTextureTrack.proxy = new SkyBoxMoonTextureValueProxy();
        outProperties.push(moonTextureTrack);
        let moonVisibleTrack = new ObjectTrack();
        moonVisibleTrack.path = trackPath.clone().toFunction('moonVisible');
        moonVisibleTrack.proxy = new SkyBoxMoonVisibleValueProxy();
        outProperties.push(moonVisibleTrack);
        let presetTrack = new ObjectTrack();
        presetTrack.path = trackPath.clone().toFunction('preset');
        presetTrack.proxy = new SkyBoxPresetValueProxy();
        outProperties.push(presetTrack);
        let domeBaseColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        domeBaseColorTrack.path = trackPath.clone().toFunction('skyDomeBaseColor');
        domeBaseColorTrack.proxy = new SkyBoxDomeBaseColorValueProxy();
        outProperties.push(domeBaseColorTrack);
        let domeBottomColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        domeBottomColorTrack.path = trackPath.clone().toFunction('skyDomeBottomColor');
        domeBottomColorTrack.proxy = new SkyBoxDomeBottomColorValueProxy();
        outProperties.push(domeBottomColorTrack);
        let domeGradientEnabledTrack = new ObjectTrack();
        domeGradientEnabledTrack.path = trackPath.clone().toFunction('skyDomeGradientEnabled');
        domeGradientEnabledTrack.proxy = new SkyBoxDomeGradientEnabledValueProxy();
        outProperties.push(domeGradientEnabledTrack);
        let domeHorizontalFallOffTrack = new RealTrack();
        domeHorizontalFallOffTrack.path = trackPath.clone().toFunction('skyDomeHorizontalFallOff');
        domeHorizontalFallOffTrack.proxy = new SkyBoxDomeHorizontalFallOffValueProxy();
        outProperties.push(domeHorizontalFallOffTrack);
        let domeIntensityTrack = new RealTrack();
        domeIntensityTrack.path = trackPath.clone().toFunction('skyDomeIntensity');
        domeIntensityTrack.proxy = new SkyBoxDomeIntensityValueProxy();
        outProperties.push(domeIntensityTrack);
        let domeMiddleColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        domeMiddleColorTrack.path = trackPath.clone().toFunction('skyDomeMiddleColor');
        domeMiddleColorTrack.proxy = new SkyBoxDomeMiddleColorValueProxy();
        outProperties.push(domeMiddleColorTrack);
        let domeTextureTrack = new ObjectTrack();
        domeTextureTrack.path = trackPath.clone().toFunction('skyDomeTextureID');
        domeTextureTrack.proxy = new SkyBoxDomeTextureIDValueProxy();
        outProperties.push(domeTextureTrack);
        let domeTopColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        domeTopColorTrack.path = trackPath.clone().toFunction('skyDomeTopColor');
        domeTopColorTrack.proxy = new SkyBoxDomeTopColorValueProxy();
        outProperties.push(domeTopColorTrack);
        let starIntensityTrack = new RealTrack();
        starIntensityTrack.path = trackPath.clone().toFunction('starIntensity');
        starIntensityTrack.proxy = new SkyBoxStarIntensityValueProxy();
        outProperties.push(starIntensityTrack);
        let starDensityTrack = new RealTrack();
        starDensityTrack.path = trackPath.clone().toFunction('starDensity');
        starDensityTrack.proxy = new SkyBoxStarDensityValueProxy();
        outProperties.push(starDensityTrack);
        let starTextureIDTrack = new ObjectTrack();
        starTextureIDTrack.path = trackPath.clone().toFunction('starTextureID');
        starTextureIDTrack.proxy = new SkyBoxStarTextureValueProxy();
        outProperties.push(starTextureIDTrack);
        let starVisibleTrack = new ObjectTrack();
        starVisibleTrack.path = trackPath.clone().toFunction('starVisible');
        starVisibleTrack.proxy = new SkyBoxStarVisibleValueProxy();
        outProperties.push(starVisibleTrack);
        let sunColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        sunColorTrack.path = trackPath.clone().toFunction('sunColor');
        sunColorTrack.proxy = new SkyBoxSunColorValueProxy();
        outProperties.push(sunColorTrack);
        let sunIntensityTrack = new RealTrack();
        sunIntensityTrack.path = trackPath.clone().toFunction('sunIntensity');
        sunIntensityTrack.proxy = new SkyBoxSunIntensityValueProxy();
        outProperties.push(sunIntensityTrack);
        let sunSizeTrack = new RealTrack();
        sunSizeTrack.path = trackPath.clone().toFunction('sunSize');
        sunSizeTrack.proxy = new SkyBoxSunSizeValueProxy();
        outProperties.push(sunSizeTrack);
        let sunTextureIDTrack = new ObjectTrack();
        sunTextureIDTrack.path = trackPath.clone().toFunction('sunTextureID');
        sunTextureIDTrack.proxy = new SkyBoxSunTextureIDValueProxy();
        outProperties.push(sunTextureIDTrack);
        let sunVisibleTrack = new ObjectTrack();
        sunVisibleTrack.path = trackPath.clone().toFunction('sunVisible');
        sunVisibleTrack.proxy = new SkyBoxSunVisibleValueProxy();
        outProperties.push(sunVisibleTrack);
        let yawAngleTrack = new RealTrack();
        yawAngleTrack.path = trackPath.clone().toFunction('yawAngle');
        yawAngleTrack.proxy = new SkyBoxYawAngleValueProxy();
        outProperties.push(yawAngleTrack);
    }
};
SkyBoxAnimateBindings = __decorate([
    registerCustomBindings
], SkyBoxAnimateBindings);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 13:21:41
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-21 10:49:29
 * @FilePath     : \Animator\Plugins\core-animator\src\proxy\LightingValueProxy.ts
 * @Description  : 环境光proxy
 */
let LightingDirectionalLightIntensityValueProxy = class LightingDirectionalLightIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.directionalLightIntensity;
            },
            set: (value) => {
                Lighting.directionalLightIntensity = value;
            }
        };
    }
};
LightingDirectionalLightIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingDirectionalLightIntensityValueProxy")
], LightingDirectionalLightIntensityValueProxy);
let LightingCastShadowsEnabledValueProxy = class LightingCastShadowsEnabledValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.castShadowsEnabled;
            },
            set: (value) => {
                Lighting.castShadowsEnabled = value;
            }
        };
    }
};
LightingCastShadowsEnabledValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingCastShadowsEnabledValueProxy")
], LightingCastShadowsEnabledValueProxy);
let LightingDirectionalLightColorValueProxy = class LightingDirectionalLightColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.directionalLightColor;
            },
            set: (value) => {
                Lighting.directionalLightColor = value;
            }
        };
    }
};
LightingDirectionalLightColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingDirectionalLightColorValueProxy")
], LightingDirectionalLightColorValueProxy);
let LightingEv100ValueProxy = class LightingEv100ValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.ev100;
            },
            set: (value) => {
                Lighting.ev100 = value;
            }
        };
    }
};
LightingEv100ValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingEv100ValueProxy")
], LightingEv100ValueProxy);
let LightingLightColorValueProxy = class LightingLightColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.lightColor;
            },
            set: (value) => {
                Lighting.lightColor = value;
            }
        };
    }
};
LightingLightColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingLightColorValueProxy")
], LightingLightColorValueProxy);
let LightingPitchAngleValueProxy = class LightingPitchAngleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.pitchAngle;
            },
            set: (value) => {
                Lighting.pitchAngle = value;
            }
        };
    }
};
LightingPitchAngleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingPitchAngleValueProxy")
], LightingPitchAngleValueProxy);
let LightingShadowsDistanceValueProxy = class LightingShadowsDistanceValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.shadowsDistance;
            },
            set: (value) => {
                Lighting.shadowsDistance = value;
            }
        };
    }
};
LightingShadowsDistanceValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingShadowsDistanceValueProxy")
], LightingShadowsDistanceValueProxy);
let LightingSkyLightColorValueProxy = class LightingSkyLightColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.skyLightColor;
            },
            set: (value) => {
                Lighting.skyLightColor = value;
            }
        };
    }
};
LightingSkyLightColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingSkyLightColorValueProxy")
], LightingSkyLightColorValueProxy);
let LightingSkyLightIntensityValueProxy = class LightingSkyLightIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.skyLightIntensity;
            },
            set: (value) => {
                Lighting.skyLightIntensity = value;
            }
        };
    }
};
LightingSkyLightIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingSkyLightIntensityValueProxy")
], LightingSkyLightIntensityValueProxy);
let LightingTemperatureValueProxy = class LightingTemperatureValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.temperature;
            },
            set: (value) => {
                Lighting.temperature = value;
            }
        };
    }
};
LightingTemperatureValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingTemperatureValueProxy")
], LightingTemperatureValueProxy);
let LightingTemperatureEnabledValueProxy = class LightingTemperatureEnabledValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.temperatureEnabled;
            },
            set: (value) => {
                Lighting.temperatureEnabled = value;
            }
        };
    }
};
LightingTemperatureEnabledValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingTemperatureEnabledValueProxy")
], LightingTemperatureEnabledValueProxy);
let LightingYawAngleValueProxy = class LightingYawAngleValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Lighting.yawAngle;
            },
            set: (value) => {
                Lighting.yawAngle = value;
            }
        };
    }
};
LightingYawAngleValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.LightingYawAngleValueProxy")
], LightingYawAngleValueProxy);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 13:20:04
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-22 16:55:01
 * @FilePath     : \Plugins\core-animator\src\property\accessor\LightingAnimateBindings.ts
 * @Description  : 环境光动画绑定
 */
let LightingAnimateBindings = class LightingAnimateBindings {
    matchOf(target) {
        return isNotPrimitive(target) && Reflect.has(target, "directionalLightColor");
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let directionalLightIntensityTrack = new RealTrack();
        directionalLightIntensityTrack.path = trackPath.clone().toFunction('directionalLightIntensity');
        directionalLightIntensityTrack.proxy = new LightingDirectionalLightIntensityValueProxy();
        outProperties.push(directionalLightIntensityTrack);
        let castShadowsEnabledTrack = new ObjectTrack();
        castShadowsEnabledTrack.path = trackPath.clone().toFunction('castShadowsEnabled');
        castShadowsEnabledTrack.proxy = new LightingCastShadowsEnabledValueProxy();
        outProperties.push(castShadowsEnabledTrack);
        let directionalLightColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        directionalLightColorTrack.path = trackPath.clone().toFunction('directionalLightColor');
        directionalLightColorTrack.proxy = new LightingDirectionalLightColorValueProxy();
        outProperties.push(directionalLightColorTrack);
        let ev100Track = new RealTrack();
        ev100Track.path = trackPath.clone().toFunction('ev100');
        ev100Track.proxy = new LightingEv100ValueProxy();
        outProperties.push(ev100Track);
        let lightColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        lightColorTrack.path = trackPath.clone().toFunction('lightColor');
        lightColorTrack.proxy = new LightingLightColorValueProxy();
        outProperties.push(lightColorTrack);
        let pitchAngleTrack = new RealTrack();
        pitchAngleTrack.path = trackPath.clone().toFunction('pitchAngle');
        pitchAngleTrack.proxy = new LightingPitchAngleValueProxy();
        outProperties.push(pitchAngleTrack);
        let shadowsDistanceTrack = new RealTrack();
        shadowsDistanceTrack.path = trackPath.clone().toFunction('shadowsDistance');
        shadowsDistanceTrack.proxy = new LightingShadowsDistanceValueProxy();
        outProperties.push(shadowsDistanceTrack);
        let skyLightColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        skyLightColorTrack.path = trackPath.clone().toFunction('skyLightColor');
        skyLightColorTrack.proxy = new LightingSkyLightColorValueProxy();
        outProperties.push(skyLightColorTrack);
        let skyLightIntensityTrack = new RealTrack();
        skyLightIntensityTrack.path = trackPath.clone().toFunction('skyLightIntensity');
        skyLightIntensityTrack.proxy = new LightingSkyLightIntensityValueProxy();
        outProperties.push(skyLightIntensityTrack);
        let temperatureTrack = new RealTrack();
        temperatureTrack.path = trackPath.clone().toFunction('temperature');
        temperatureTrack.proxy = new LightingTemperatureValueProxy();
        outProperties.push(temperatureTrack);
        let temperatureEnabledTrack = new ObjectTrack();
        temperatureEnabledTrack.path = trackPath.clone().toFunction('temperatureEnabled');
        temperatureEnabledTrack.proxy = new LightingTemperatureEnabledValueProxy();
        outProperties.push(temperatureEnabledTrack);
        let yawAngleTrack = new RealTrack();
        yawAngleTrack.path = trackPath.clone().toFunction('yawAngle');
        yawAngleTrack.proxy = new LightingYawAngleValueProxy();
        outProperties.push(yawAngleTrack);
    }
};
LightingAnimateBindings = __decorate([
    registerCustomBindings
], LightingAnimateBindings);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 11:42:15
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-28 16:20:08
 * @FilePath     : \Animator\Plugins\core-animator\src\proxy\FogValueProxy.ts
 * @Description  : 雾效值proxy
 */
let FogDensityValueProxy = class FogDensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['GetFogDensity']();
                }
                else {
                    return Fog.density;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetFogDensity'](value);
                }
                else {
                    Fog.density = value;
                }
            }
        };
    }
};
FogDensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogDensityValueProxy")
], FogDensityValueProxy);
let FogDirectionalInscatteringColorValueProxy = class FogDirectionalInscatteringColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return LinearColor['fromUELinearColor'](getFogGameObject()['GetDirectionalInscatteringColor']());
                }
                else {
                    return Fog.directionalInscatteringColor;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetDirectionalInscatteringColor'](value['toUELinearColor']());
                }
                else {
                    Fog.directionalInscatteringColor = value;
                }
            }
        };
    }
};
FogDirectionalInscatteringColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogDirectionalInscatteringColorValueProxy")
], FogDirectionalInscatteringColorValueProxy);
let FogDirectionalInscatteringExponentValueProxy = class FogDirectionalInscatteringExponentValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['GetDirectionalInscatteringExponent']();
                }
                else {
                    return Fog.directionalInscatteringExponent;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetDirectionalInscatteringExponent'](value);
                }
                else {
                    Fog.directionalInscatteringExponent = value;
                }
            }
        };
    }
};
FogDirectionalInscatteringExponentValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogDirectionalInscatteringExponentValueProxy")
], FogDirectionalInscatteringExponentValueProxy);
let FogDirectionalInscatteringStartDistanceValueProxy = class FogDirectionalInscatteringStartDistanceValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['GetDirectionalInscatteringStartDistance']();
                }
                else {
                    return Fog.directionalInscatteringStartDistance;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetDirectionalInscatteringStartDistance'](value);
                }
                else {
                    Fog.directionalInscatteringStartDistance = value;
                }
            }
        };
    }
};
FogDirectionalInscatteringStartDistanceValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogDirectionalInscatteringStartDistanceValueProxy")
], FogDirectionalInscatteringStartDistanceValueProxy);
let FogEnabledValueProxy = class FogEnabledValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['IsEnable']();
                }
                else {
                    return Fog.enabled;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetEnable'](value);
                }
                else {
                    Fog.enabled = value;
                }
            }
        };
    }
};
FogEnabledValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogEnabledValueProxy")
], FogEnabledValueProxy);
let FogHeightValueProxy = class FogHeightValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['GetFogHeight']();
                }
                else {
                    return Fog.height;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetFogHeight'](value);
                }
                else {
                    Fog.height = value;
                }
            }
        };
    }
};
FogHeightValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogHeightValueProxy")
], FogHeightValueProxy);
let FogHeightFalloffValueProxy = class FogHeightFalloffValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['GetFogHeightFalloff']();
                }
                else {
                    return Fog.heightFalloff;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetFogHeightFalloff'](value);
                }
                else {
                    Fog.heightFalloff = value;
                }
            }
        };
    }
};
FogHeightFalloffValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogHeightFalloffValueProxy")
], FogHeightFalloffValueProxy);
let FogInscatteringColorValueProxy = class FogInscatteringColorValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return LinearColor['fromUELinearColor'](getFogGameObject()['GetFogInscatteringColor']());
                }
                else {
                    return Fog.inscatteringColor;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetFogInscatteringColor'](value['toUELinearColor']());
                }
                else {
                    Fog.inscatteringColor = value;
                }
            }
        };
    }
};
FogInscatteringColorValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogInscatteringColorValueProxy")
], FogInscatteringColorValueProxy);
let FogMaxOpacityValueProxy = class FogMaxOpacityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['GetFogMaxOpacity']();
                }
                else {
                    return Fog.maxOpacity;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetFogMaxOpacity'](value);
                }
                else {
                    Fog.maxOpacity = value;
                }
            }
        };
    }
};
FogMaxOpacityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogMaxOpacityValueProxy")
], FogMaxOpacityValueProxy);
let FogStartDistanceValueProxy = class FogStartDistanceValueProxy {
    forTarget(target) {
        return {
            get: () => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    return getFogGameObject()['GetStartDistance']();
                }
                else {
                    return Fog.startDistance;
                }
            },
            set: (value) => {
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    getFogGameObject()['SetStartDistance'](value);
                }
                else {
                    Fog.startDistance = value;
                }
            }
        };
    }
};
FogStartDistanceValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.FogStartDistanceValueProxy")
], FogStartDistanceValueProxy);
// @lighter.decorators.tsclass("mwanim.FogStartDistanceValueProxy")
// export class FogPresetValueProxy implements IValueProxyFactory {
//     forTarget(target: mw.Fog): IValueProxy<any> {
//         return {
//             get: () => {
//                 // return Fog.p;
//             },
//             set: (value: any) => {
//                 Fog.setPreset(value);
//             }
//         }
//     }
// }
function getFogGameObject() {
    return GameObject.findGameObjectByName("Fog")['fog'];
}

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 11:39:35
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-22 16:55:11
 * @FilePath     : \Plugins\core-animator\src\property\accessor\FogAnimateBindings.ts
 * @Description  : 雾效动画绑定
 */
let FogAnimateBindings = class FogAnimateBindings {
    matchOf(target) {
        return isNotPrimitive(target) && Reflect.has(target, "fogDensity");
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let fogDensityTrack = new RealTrack();
        fogDensityTrack.path = trackPath.clone().toFunction('density');
        fogDensityTrack.proxy = new FogDensityValueProxy();
        outProperties.push(fogDensityTrack);
        let fogDirectionalInscatteringColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        fogDirectionalInscatteringColorTrack.path = trackPath.clone().toFunction('directionalInscatteringColor');
        fogDirectionalInscatteringColorTrack.proxy = new FogDirectionalInscatteringColorValueProxy();
        outProperties.push(fogDirectionalInscatteringColorTrack);
        let fogDirectionalInscatteringExponentTrack = new RealTrack();
        fogDirectionalInscatteringExponentTrack.path = trackPath.clone().toFunction('directionalInscatteringExponent');
        fogDirectionalInscatteringExponentTrack.proxy = new FogDirectionalInscatteringExponentValueProxy();
        outProperties.push(fogDirectionalInscatteringExponentTrack);
        let fogDirectionalInscatteringStartDistanceTrack = new RealTrack();
        fogDirectionalInscatteringStartDistanceTrack.path = trackPath.clone().toFunction('directionalInscatteringStartDistance');
        fogDirectionalInscatteringStartDistanceTrack.proxy = new FogDirectionalInscatteringStartDistanceValueProxy();
        outProperties.push(fogDirectionalInscatteringStartDistanceTrack);
        let fogEnabledTrack = new ObjectTrack();
        fogEnabledTrack.path = trackPath.clone().toFunction('enabled');
        fogEnabledTrack.proxy = new FogEnabledValueProxy();
        outProperties.push(fogEnabledTrack);
        let fogHeightTrack = new RealTrack();
        fogHeightTrack.path = trackPath.clone().toFunction('height');
        fogHeightTrack.proxy = new FogHeightValueProxy();
        outProperties.push(fogHeightTrack);
        let fogHeightFalloffTrack = new RealTrack();
        fogHeightFalloffTrack.path = trackPath.clone().toFunction('heightFalloff');
        fogHeightFalloffTrack.proxy = new FogHeightFalloffValueProxy();
        outProperties.push(fogHeightFalloffTrack);
        let fogInscatteringColorTrack = new LineColorTrack(RGBRangeType.ZeroToOne);
        fogInscatteringColorTrack.path = trackPath.clone().toFunction('inscatteringColor');
        fogInscatteringColorTrack.proxy = new FogInscatteringColorValueProxy();
        outProperties.push(fogInscatteringColorTrack);
        let fogMaxOpacityTrack = new RealTrack();
        fogMaxOpacityTrack.path = trackPath.clone().toFunction('maxOpacity');
        fogMaxOpacityTrack.proxy = new FogMaxOpacityValueProxy();
        outProperties.push(fogMaxOpacityTrack);
        let fogStartDistanceTrack = new RealTrack();
        fogStartDistanceTrack.path = trackPath.clone().toFunction('startDistance');
        fogStartDistanceTrack.proxy = new FogStartDistanceValueProxy();
        outProperties.push(fogStartDistanceTrack);
        //没有getter
        // let fogPresetTrack = new ObjectTrack();
        // fogPresetTrack.path = trackPath.clone().toFunction('preset');
        // fogPresetTrack.proxy = new FogStartDistanceValueProxy();
        // outProperties.push(fogPresetTrack);
    }
};
FogAnimateBindings = __decorate([
    registerCustomBindings
], FogAnimateBindings);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 13:35:07
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-21 10:49:38
 * @FilePath     : \Animator\Plugins\core-animator\src\proxy\PostProcessValueProxy.ts
 * @Description  : 后处理proxy
 */
let PostProcessBloomValueProxy = class PostProcessBloomValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.bloom;
            },
            set: (value) => {
                PostProcess.bloom = value;
            }
        };
    }
};
PostProcessBloomValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessBloomValueProxy")
], PostProcessBloomValueProxy);
let PostProcessPresetValueProxy = class PostProcessPresetValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.preset ? PostProcess.preset : 0;
            },
            set: (value) => {
                PostProcess.preset = value;
            }
        };
    }
};
PostProcessPresetValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessPresetValueProxy")
], PostProcessPresetValueProxy);
let PostProcessConfigBloomIntensityValueProxy = class PostProcessConfigBloomIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.config.bloomIntensity;
            },
            set: (value) => {
                PostProcess.config.bloomIntensity = value;
            }
        };
    }
};
PostProcessConfigBloomIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessConfigBloomIntensityValueProxy")
], PostProcessConfigBloomIntensityValueProxy);
let PostProcessSaturationValueProxy = class PostProcessSaturationValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.saturation;
            },
            set: (value) => {
                PostProcess.saturation = value;
            }
        };
    }
};
PostProcessSaturationValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessSaturationValueProxy")
], PostProcessSaturationValueProxy);
let PostProcessContrastValueProxy = class PostProcessContrastValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.contrast;
            },
            set: (value) => {
                PostProcess.contrast = value;
            }
        };
    }
};
PostProcessContrastValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessContrastValueProxy")
], PostProcessContrastValueProxy);
let PostProcessBlurEnabledValueProxy = class PostProcessBlurEnabledValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.blurEnabled;
            },
            set: (value) => {
                PostProcess.blurEnabled = value;
            }
        };
    }
};
PostProcessBlurEnabledValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessBlurEnabledValueProxy")
], PostProcessBlurEnabledValueProxy);
let PostProcessBlurIntensityValueProxy = class PostProcessBlurIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.blurIntensity;
            },
            set: (value) => {
                PostProcess.blurIntensity = value;
            }
        };
    }
};
PostProcessBlurIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessBlurIntensityValueProxy")
], PostProcessBlurIntensityValueProxy);
let PostProcessDepthOfFieldEnabledValueProxy = class PostProcessDepthOfFieldEnabledValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.depthOfFieldEnabled;
            },
            set: (value) => {
                PostProcess.depthOfFieldEnabled = value;
            }
        };
    }
};
PostProcessDepthOfFieldEnabledValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessDepthOfFieldEnabledValueProxy")
], PostProcessDepthOfFieldEnabledValueProxy);
let PostProcessDepthOfFieldIntensityValueProxy = class PostProcessDepthOfFieldIntensityValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.depthOfFieldIntensity;
            },
            set: (value) => {
                PostProcess.depthOfFieldIntensity = value;
            }
        };
    }
};
PostProcessDepthOfFieldIntensityValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessDepthOfFieldIntensityValueProxy")
], PostProcessDepthOfFieldIntensityValueProxy);
let PostProcessFocusPositionValueProxy = class PostProcessFocusPositionValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.focusPosition;
            },
            set: (value) => {
                PostProcess.focusPosition = value;
            }
        };
    }
};
PostProcessFocusPositionValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessFocusPositionValueProxy")
], PostProcessFocusPositionValueProxy);
let PostProcessFocusDistanceValueProxy = class PostProcessFocusDistanceValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return PostProcess.focusDistance;
            },
            set: (value) => {
                PostProcess.focusDistance = value;
            }
        };
    }
};
PostProcessFocusDistanceValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.PostProcessFocusDistanceValueProxy")
], PostProcessFocusDistanceValueProxy);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-19 13:34:17
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-22 16:54:48
 * @FilePath     : \Plugins\core-animator\src\property\accessor\PostProcessAnimateBindings.ts
 * @Description  : 后处理动画绑定
 */
let PostProcessAnimateBindings = class PostProcessAnimateBindings {
    matchOf(target) {
        return isNotPrimitive(target) && Reflect.has(target, "depthOfFieldEnabled");
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let bloomTrack = new RealTrack();
        bloomTrack.path = trackPath.clone().toFunction('bloom');
        bloomTrack.proxy = new PostProcessBloomValueProxy();
        outProperties.push(bloomTrack);
        let presetTrack = new ObjectTrack();
        presetTrack.path = trackPath.clone().toFunction('preset');
        presetTrack.proxy = new PostProcessPresetValueProxy();
        outProperties.push(presetTrack);
        //config里的属性和外部的一样
        // let configBloomIntensityTrack = new RealTrack();
        // configBloomIntensityTrack.path = trackPath.clone().toFunction('config.bloomIntensity');
        // configBloomIntensityTrack.proxy = new PostProcessPresetValueProxy();
        // outProperties.push(configBloomIntensityTrack);
        let saturationTrack = new RealTrack();
        saturationTrack.path = trackPath.clone().toFunction('saturation');
        saturationTrack.proxy = new PostProcessSaturationValueProxy();
        outProperties.push(saturationTrack);
        let contrastTrack = new RealTrack();
        contrastTrack.path = trackPath.clone().toFunction('contrast');
        contrastTrack.proxy = new PostProcessContrastValueProxy();
        outProperties.push(contrastTrack);
        let blurEnabledTrack = new ObjectTrack();
        blurEnabledTrack.path = trackPath.clone().toFunction('blurEnabled');
        blurEnabledTrack.proxy = new PostProcessBlurEnabledValueProxy();
        outProperties.push(blurEnabledTrack);
        let blurIntensityTrack = new RealTrack();
        blurIntensityTrack.path = trackPath.clone().toFunction('blurIntensity');
        blurIntensityTrack.proxy = new PostProcessBlurIntensityValueProxy();
        outProperties.push(blurIntensityTrack);
        let depthOfFieldEnabledTrack = new ObjectTrack();
        depthOfFieldEnabledTrack.path = trackPath.clone().toFunction('depthOfFieldEnabled');
        depthOfFieldEnabledTrack.proxy = new PostProcessDepthOfFieldEnabledValueProxy();
        outProperties.push(depthOfFieldEnabledTrack);
        let depthOfFieldIntensityTrack = new RealTrack();
        depthOfFieldIntensityTrack.path = trackPath.clone().toFunction('depthOfFieldIntensity');
        depthOfFieldIntensityTrack.proxy = new PostProcessDepthOfFieldIntensityValueProxy();
        outProperties.push(depthOfFieldIntensityTrack);
        let focusPositionTrack = new RealTrack();
        focusPositionTrack.path = trackPath.clone().toFunction('focusPosition');
        focusPositionTrack.proxy = new PostProcessFocusPositionValueProxy();
        outProperties.push(focusPositionTrack);
        let focusDistanceTrack = new RealTrack();
        focusDistanceTrack.path = trackPath.clone().toFunction('focusDistance');
        focusDistanceTrack.proxy = new PostProcessFocusDistanceValueProxy();
        outProperties.push(focusDistanceTrack);
    }
};
PostProcessAnimateBindings = __decorate([
    registerCustomBindings
], PostProcessAnimateBindings);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-26 17:04:35
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-28 14:12:01
 * @FilePath     : \Plugins\core-animator\src\proxy\CameraProxy.ts
 * @Description  : 相机Proxy
 */
let GlobalCameraRelativeLocationConfigValueProxy = class GlobalCameraRelativeLocationConfigValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Reflect.get(target, 'relativeLocationConfig');
            },
            set: (value) => {
                let outl = mweditor.findEditorSystem(mweditor.Outliner);
                outl.mainViewport.worldTransform.position = value;
                Reflect.set(target, 'relativeLocationConfig', value);
            }
        };
    }
};
GlobalCameraRelativeLocationConfigValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.GlobalCameraRelativeLocationConfigValueProxy")
], GlobalCameraRelativeLocationConfigValueProxy);
let GlobalCameraRelativeRotationConfigValueProxy = class GlobalCameraRelativeRotationConfigValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return Reflect.get(target, 'relativeRotationConfig');
            },
            set: (value) => {
                let outl = mweditor.findEditorSystem(mweditor.Outliner);
                outl.mainViewport.worldTransform.rotation = value;
                Reflect.set(target, 'relativeRotationConfig', value);
            }
        };
    }
};
GlobalCameraRelativeRotationConfigValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.GlobalCameraRelativeRotationConfigValueProxy")
], GlobalCameraRelativeRotationConfigValueProxy);
let CameraRelativePositionValueProxy = class CameraRelativePositionValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return getCameraTransform(target).position;
            },
            set: (value) => {
                let transform = getCameraTransform(target);
                transform.position = value;
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    // let outl = mweditor.findEditorSystem(mweditor.Outliner)
                    // outl.mainViewport.worldTransform.position = transform.position;
                    // outl.mainViewport.worldTransform.rotation = transform.rotation;
                    setCameraTransform(target, transform);
                }
                else {
                    target.localTransform.position = value;
                }
            }
        };
    }
};
CameraRelativePositionValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.CameraRelativePositionValueProxy")
], CameraRelativePositionValueProxy);
let CameraRelativeRotationValueProxy = class CameraRelativeRotationValueProxy {
    forTarget(target) {
        return {
            get: () => {
                return getCameraTransform(target).rotation;
            },
            set: (value) => {
                let transform = getCameraTransform(target);
                transform.rotation = value;
                if (!SystemUtil.isClient() && !SystemUtil.isServer()) {
                    // let outl = mweditor.findEditorSystem(mweditor.Outliner)
                    // outl.mainViewport.worldTransform.position = transform.position;
                    // outl.mainViewport.worldTransform.rotation = transform.rotation;
                    setCameraTransform(target, transform);
                }
                else {
                    target.localTransform.rotation = value;
                }
            }
        };
    }
};
CameraRelativeRotationValueProxy = __decorate([
    lighter.decorators.tsclass("mwanim.CameraRelativeRotationValueProxy")
], CameraRelativeRotationValueProxy);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-26 14:34:08
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-27 13:44:14
 * @FilePath     : \Plugins\core-animator\src\property\accessor\CameraAnimateBindings.ts
 * @Description  : 相机动画绑定（对象里的相机绑定）
 */
let CameraAnimateBindings = class CameraAnimateBindings {
    matchOf(target) {
        return target instanceof mw.Camera;
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        let relativeLocation = new VectorTrack(); // 摄像机相对位置
        relativeLocation.componentsCount = 3;
        relativeLocation.path = trackPath.clone().toFunction('relativeLocation', 'cameraRelativeLocation');
        relativeLocation.proxy = new CameraRelativePositionValueProxy();
        outProperties.push(relativeLocation);
        let relativeRotation = new RotationTrack(); // 摄像机相对旋转
        relativeRotation.path = trackPath.clone().toFunction('relativeRotation', 'cameraRelativeRotation');
        relativeRotation.proxy = new CameraRelativeRotationValueProxy();
        outProperties.push(relativeRotation);
        // let springArmRelativeLocation = new VectorTrack();// 弹簧臂相对位置
        // springArmRelativeLocation.componentsCount = 3;
        // springArmRelativeLocation.path = trackPath.clone().toProperty('relativeLocation', 'springArmRelativeLocation')
        // outProperties.push(springArmRelativeLocation);
        // let springArmWorldLocation = new VectorTrack();// 弹簧臂绝对位置
        // springArmWorldLocation.componentsCount = 3;
        // springArmWorldLocation.path = trackPath.clone().toProperty('worldLocation', 'springArmWorldLocation')
        // outProperties.push(springArmWorldLocation);
    }
};
CameraAnimateBindings = __decorate([
    registerCustomBindings
], CameraAnimateBindings);

/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-26 15:13:08
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-27 13:46:31
 * @FilePath     : \Plugins\core-animator\src\property\accessor\GlobalCameraAnimateBindings.ts
 * @Description  : 全局相机动画绑定（世界里的相机对象）
 */
let GlobalCameraAnimateBindings = class GlobalCameraAnimateBindings {
    matchOf(target) {
        return Reflect.has(target, 'cameraFOV');
    }
    getAllAnimatableProperties(target, outProperties, trackPath) {
        // throw new Error("Method not implemented.");
        // for (const property of CameraSettingCopyProperties) {
        //     GenericAnimationBindingCache.getAllAnimatableProperties(target[property], outProperties, trackPath.clone().toProperty(property));
        // }
        // let cameraProjectionMode = new ObjectTrack(); // 摄像机投影模式 CameraProjectionMode
        // cameraProjectionMode.path = trackPath.clone().toProperty('cameraProjectionMode');
        // outProperties.push(cameraProjectionMode);
        // let cameraLocationMode = new ObjectTrack();// 摄像机位置模式 CameraLocationMode
        // cameraLocationMode.path = trackPath.clone().toProperty('cameraLocationMode');
        // outProperties.push(cameraLocationMode);
        // let cameraRotationMode = new ObjectTrack();// 摄像机朝向模式 CameraRotationMode
        // cameraRotationMode.path = trackPath.clone().toProperty('cameraRotationMode');
        // outProperties.push(cameraRotationMode);
        // let cameraMode = new ObjectTrack();// 摄像机预设 CameraPreset
        // cameraMode.path = trackPath.clone().toProperty('cameraMode');
        // outProperties.push(cameraMode);
        // let relativeLocationConfig = new VectorTrack();// 相对位置
        // relativeLocationConfig.componentsCount = 3;
        // relativeLocationConfig.path = trackPath.clone().toFunction('relativeLocationConfig');
        // relativeLocationConfig.proxy = new GlobalCameraRelativeLocationConfigValueProxy();
        // outProperties.push(relativeLocationConfig);
        // let relativeRotationConfig = new RotationTrack();// 相对旋转
        // relativeRotationConfig.path = trackPath.clone().toFunction('relativeRotationConfig');
        // relativeRotationConfig.proxy = new GlobalCameraRelativeRotationConfigValueProxy();
        // outProperties.push(relativeRotationConfig);
    }
};
GlobalCameraAnimateBindings = __decorate([
    registerCustomBindings
], GlobalCameraAnimateBindings);

{
    globalThis.lighter.animation = {
        math, bindHelper,
        AnimationClip, AnimationManager, AnimationState, AnimationUtility, Animator, CrossFade, EasingMethod, EventType, ExtrapolationMode, GameObjectAnimateBindings, PostProcessAnimateBindings, FogAnimateBindings, LightingAnimateBindings, SkyBoxAnimateBindings, NormalTypeAnimateBindings,
        KeyFrameCurve, LineColorTrack, MaterialInstanceBindings, ObjectCurve, ObjectTrack, Playable, QuatKeyframeValue, QuatTrack, RealCurve, RealInterpolationMode, RealTrack, RotationTrack, ScriptAnimateBindings, TangentWeightMode, Track,
        TrackPath, VectorTrack, WidgetAnimateBindings, WrapMode, getEasingFn, getGlobalAnimationManager, MarginTrack, CameraAnimateBindings, GlobalCameraAnimateBindings
    };
}

export { AnimationClip, AnimationManager, AnimationState, AnimationUtility, Animator, CameraAnimateBindings, Channel, CrossFade, CurveUtility, EasingMethod, EventType, ExtrapolationMode, FogAnimateBindings, GameObjectAnimateBindings, GlobalCameraAnimateBindings, KeyFrameCurve, LightingAnimateBindings, LineColorTrack, MarginTrack, MaterialInstanceBindings, NormalTypeAnimateBindings, ObjectCurve, ObjectTrack, Playable, PostProcessAnimateBindings, QuatKeyframeValue, QuatTrack, RealCurve, RealInterpolationMode, RealTrack, RotationTrack, ScriptAnimateBindings, SkyBoxAnimateBindings, TangentMode, TangentWeightMode, Track, TrackPath, VectorTrack, WidgetAnimateBindings, WrapMode, bindHelper, BuiltInTypeAccesor as builtinBindgings, createEvalSymbol, getEasingFn, getGlobalAnimationManager, math, trackBindingTag };
//# sourceMappingURL=index.js.map
