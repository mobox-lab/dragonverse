declare namespace lighter {
    export namespace animation {
        /// <reference types="core" />
        /// <reference types="type" />
        /// <reference types="gameplay" />
        /// <reference types="ui" />
        /// <reference types="global" />
        export class Playable {
            get isPlaying(): boolean;
            get isPaused(): boolean;
            get isMotionless(): boolean;
            private _isPlaying;
            private _isPaused;
            private _stepOnce;
            play(): void;
            stop(): void;
            pause(): void;
            resume(): void;
            step(): void;
            update(deltaTime: number): void;
            protected onPlay(): void;
            protected onPause(): void;
            protected onResume(): void;
            protected onStop(): void;
            protected onError(message: string): void;
        }
        /**
         * 动画使用的循环模式。
         */
        export enum WrapMode {
            /**
             * 向 Animation Component 或者 AnimationClip 查找 wrapMode
             */
            Default = 0,
            /**
             * 动画只播放一遍
             */
            Normal = 1,
            /**
             * 从最后一帧或结束位置开始反向播放，到第一帧或开始位置停止
             */
            Reverse = 36,
            /**
             * 循环播放
             */
            Loop = 2,
            /**
             * 反向循环播放
             */
            LoopReverse = 38,
            /**
             * 从第一帧播放到最后一帧，然后反向播放回第一帧，到第一帧后再正向播放，如此循环
             */
            PingPong = 22,
            /**
             * 从最后一帧开始反向播放，其他同 PingPong
             */
            PingPongReverse = 54
        }
        export class WrappedInfo {
            ratio: number;
            time: number;
            direction: number;
            stopped: boolean;
            iterations: number;
            frameIndex: number;
            constructor(info?: WrappedInfo);
            set(info: WrappedInfo): void;
        }
        /**
         * Animation 支持的事件类型。
         */
        export enum EventType {
            /**
             * 开始播放时触发。
             */
            PLAY = "play",
            /**
             * 停止播放时触发。
             */
            STOP = "stop",
            /**
             * 暂停播放时触发。
             */
            PAUSE = "pause",
            /**
             * 恢复播放时触发。
             */
            RESUME = "resume",
            /**
             * 假如动画循环次数大于 1，当动画播放到最后一帧时触发。
             */
            LASTFRAME = "lastframe",
            /**
             *
             * 动画完成播放时触发。
             */
            FINISHED = "finished"
        }
        interface CurveBase {
            readonly minRange: number;
            readonly maxRange: number;
        }
        type KeyFrame<TKeyframeValue> = [
            number,
            TKeyframeValue
        ];
        export class KeyFrameCurve<TKeyframeValue> implements CurveBase, Iterable<KeyFrame<TKeyframeValue>> {
            protected _times: number[];
            protected _values: TKeyframeValue[];
            get minRange(): number;
            get maxRange(): number;
            get length(): number;
            keyframes(): Iterable<KeyFrame<TKeyframeValue>>;
            times(): Readonly<number[]>;
            values(): Readonly<TKeyframeValue[]>;
            [Symbol.iterator](): {
                next: () => IteratorResult<KeyFrame<TKeyframeValue>>;
            };
            addKeyframe(time: number, value: TKeyframeValue): number;
            removeKeyframe(index: number): void;
            updateKeyframeTime(index: number, newTime: number): void;
            findFrameIndexWithTime(time: number): number;
            clear(): void;
            assignSorted(keyframes: Iterable<[
                number,
                TKeyframeValue
            ]>): void;
            assignSorted(times: readonly number[], values: TKeyframeValue[]): void;
            protected searchKeyframe(time: number): number;
            protected setKeyframes(times: number[], values: TKeyframeValue[]): void;
            private internalAddKeyframe;
        }
        type ObjectCurveKeyframe<T> = T;
        export class ObjectCurve<T> extends KeyFrameCurve<ObjectCurveKeyframe<T>> {
            evaluate(time: number): T;
            clone(): ObjectCurve<T>;
        }
        /**
         * @engineInternal
         */
        export enum EasingMethod {
            LINEAR = 0,
            CONSTANT = 1,
            QUAD_IN = 2,
            QUAD_OUT = 3,
            QUAD_IN_OUT = 4,
            QUAD_OUT_IN = 5,
            CUBIC_IN = 6,
            CUBIC_OUT = 7,
            CUBIC_IN_OUT = 8,
            CUBIC_OUT_IN = 9,
            QUART_IN = 10,
            QUART_OUT = 11,
            QUART_IN_OUT = 12,
            QUART_OUT_IN = 13,
            QUINT_IN = 14,
            QUINT_OUT = 15,
            QUINT_IN_OUT = 16,
            QUINT_OUT_IN = 17,
            SINE_IN = 18,
            SINE_OUT = 19,
            SINE_IN_OUT = 20,
            SINE_OUT_IN = 21,
            EXPO_IN = 22,
            EXPO_OUT = 23,
            EXPO_IN_OUT = 24,
            EXPO_OUT_IN = 25,
            CIRC_IN = 26,
            CIRC_OUT = 27,
            CIRC_IN_OUT = 28,
            CIRC_OUT_IN = 29,
            ELASTIC_IN = 30,
            ELASTIC_OUT = 31,
            ELASTIC_IN_OUT = 32,
            ELASTIC_OUT_IN = 33,
            BACK_IN = 34,
            BACK_OUT = 35,
            BACK_IN_OUT = 36,
            BACK_OUT_IN = 37,
            BOUNCE_IN = 38,
            BOUNCE_OUT = 39,
            BOUNCE_IN_OUT = 40,
            BOUNCE_OUT_IN = 41,
            SMOOTH = 42,
            FADE = 43
        }
        type EasingMethodFn = (k: number) => number;
        export function getEasingFn(easingMethod: EasingMethod): EasingMethodFn;
        /**
         * 在某关键帧（前一帧）和其下一帧之间插值时使用的插值方式。
         */
        export enum RealInterpolationMode {
            /**
             * 在前一帧和后一帧之间执行线性插值。
             */
            LINEAR = 0,
            /**
             * 永远使用前一帧的值。
             */
            CONSTANT = 1,
            /**
             * 在前一帧和后一帧之间执行立方插值。
             */
            CUBIC = 2
        }
        /**
         * 在求值曲线时，指定当输入时间下溢（小于第一帧的时间）或上溢（大于最后一帧的时间）时应该如何推断结果值。
         */
        export enum ExtrapolationMode {
            /**
             * 下溢时，根据前两帧的线性趋势计算结果；上溢时，根据最后两帧的线性趋势计算结果。
             * 如果曲线帧数小于 2，回退到  `CLAMP`。
             */
            LINEAR = 0,
            /**
             * 下溢时，使用第一帧的值；上溢时，使用最后一帧的值。
             */
            CLAMP = 1,
            /**
             * 求值时将该曲线视作是无限连续循环的。
             */
            LOOP = 2,
            /**
             * 求值时将该曲线视作是以“乒乓”的形式无限连续循环的。
             */
            PING_PONG = 3
        }
        /**
         * 指定关键帧两侧的切线权重模式。
         */
        export enum TangentWeightMode {
            /**
             * 关键帧的两侧都不携带切线权重信息。
             */
            NONE = 0,
            /**
             * 仅关键帧的左侧携带切线权重信息。
             */
            LEFT = 1,
            /**
             * 仅关键帧的右侧携带切线权重信息。
             */
            RIGHT = 2,
            /**
             * 关键帧的两侧都携带切线权重信息。
             */
            BOTH = 3
        }
        /**
         * 在某四元数关键帧（前一帧）和其下一帧之间插值时使用的插值方式。
         */
        export enum QuatInterpolationMode {
            /**
             * 在前一帧和后一帧之间执行球面线性插值。
             */
            SLERP = 0,
            /**
             * 永远使用前一帧的值。
             */
            CONSTANT = 1
        }
        export class QuatKeyframeValue {
            /**
             
             * 在执行插值时，当以此关键帧作为起始关键帧时应当使用的插值方式。
             */
            interpolationMode: QuatInterpolationMode;
            /**
             
             * 该关键帧的值。
             */
            value: mw.Quaternion;
            /**
             * @internal Reserved for backward compatibility. Will be removed in future.
             */
            easingMethod: EasingMethod | [
                number,
                number,
                number,
                number
            ];
            constructor({ value, interpolationMode, easingMethod }?: Partial<QuatKeyframeValue>);
        }
        /**
         
         * @zh
         * 用于描述实数关键帧值的参数。
         * 若是部分关键帧的形式，关键帧值的每个分量都是从该参数中取得。
         * 对于未指定的分量，使用默认值：
         * - 插值模式：球面线性插值
         * - 值：单位四元数
         */
        type QuatKeyframeValueParameters = Partial<QuatKeyframeValue>;
        /**
         * @zh
         * 四元数曲线
         */
        export class QuatCurve extends KeyFrameCurve<QuatKeyframeValue> {
            /**
             
             * 获取或设置此曲线的前向外推模式。
             * 默认为 `ExtrapolationMode.CLAMP`。
             */
            preExtrapolation: ExtrapolationMode;
            /**
             
             * 获取或设置此曲线的后向外推模式。
             * 默认为 `ExtrapolationMode.CLAMP`。
             */
            postExtrapolation: ExtrapolationMode;
            /**
             
             * 计算此曲线在指定时间上的值。
             */
            evaluate(time: number, quat?: mw.Quaternion): mw.Quaternion;
            addKeyframe(time: number, value: QuatKeyframeValueParameters): number;
            assignSorted(keyframes: Iterable<[
                number,
                QuatKeyframeValueParameters
            ]>): void;
            assignSorted(times: readonly number[], values: QuatKeyframeValueParameters[]): void;
            clone(): QuatCurve;
        }
        export enum TangentMode {
            Editable = 0,
            Smooth = 1,
            Linear = 2,
            Stepped = 3
        }
        export class RealKeyFrame {
            get interpolationMode(): RealInterpolationMode;
            set interpolationMode(value: RealInterpolationMode);
            get tangentWeightMode(): TangentWeightMode;
            set tangentWeightMode(value: TangentWeightMode);
            get easingMethod(): number;
            set easingMethod(value: number);
            private _flags;
            value: number;
            leftTangent: number;
            rightTangent: number;
            leftTangentWeight: number;
            rightTangentWeight: number;
            // only in editor
            tangentMode: TangentMode;
        }
        type RealKeyframeValueParameters = number | Partial<RealKeyFrame>;
        export class RealCurve extends KeyFrameCurve<RealKeyFrame> {
            preInfinity: ExtrapolationMode;
            postInfinity: ExtrapolationMode;
            evaluate(time: number): number;
            addKeyframe(time: number, value: RealKeyframeValueParameters): number;
            assignSorted(keyframes: Iterable<[
                number,
                RealKeyframeValueParameters
            ]>): void;
            /**
             * Assigns all keyframes.
             * @param times Times array. Should be sorted.
             * @param values Values array. Corresponding to each time in `times`.
             */
            assignSorted(times: readonly number[], values: RealKeyframeValueParameters[]): void;
            isConstant(tolerance: number): boolean;
            clone(): RealCurve;
        }
        /**
         * 曲线值代理用来设置曲线值到目标，是广义的赋值。
         * 每个曲线值代理都关联着一个目标对象。
         */
        interface IValueProxy<T = any> {
            /**
             * 从目标中获取值。某些情况下可能需要这个接口来实现分量动画。
             */
            get?: () => T;
            /**
             * 设置曲线值到目标对象上。
             */
            set: (value: T) => void;
        }
        interface IValueProxyFactory {
            forTarget(target: any): IValueProxy | undefined;
        }
        export const createEvalSymbol: unique symbol;
        export const trackBindingTag: unique symbol;
        interface RuntimeBinding<T = unknown> {
            setValue(value: T): void;
            getValue?(): T;
        }
        interface Range {
            min: number;
            max: number;
        }
        interface TrackEval<TValue> {
            readonly requiresDefault: boolean;
            evaluate(time: number, defaultValue?: TValue extends unknown ? unknown : Readonly<TValue>): TValue;
        }
        export const normalizedFollowTag: unique symbol;
        /**
         * 描述一条轨道如何寻址其目标对象。
         */
        export class TrackPath {
            private _paths;
            get length(): number;
            toString(): string;
            combine(path: TrackPath): this;
            toProperty(name: string, alias?: string): this;
            toHierarchy(name: string): this;
            toScript(name: string): this;
            toElement(name: number): this;
            toFunction(name: string, alias?: string): this;
            toSimulateProxy(name: string, alias?: string): this;
            isPropertyAt(index: number): boolean;
            isElementAt(index: number): boolean;
            isSimulateProxy(index: number): boolean;
            isHierarchyAt(index: number): boolean;
            isFunctionAt(index: number): boolean;
            parsePropertyAt(index: number): string;
            parseElementAt(index: number): number;
            parseHierarchyAt(index: number): string;
            getAlias(index: number): string;
            getAllAlias(): string;
            equal(b: TrackPath): boolean;
            from(path: string): void;
            clone(): TrackPath;
            getHierarchyDepth(): number;
            static equals(a: TrackPath, b: TrackPath): boolean;
            clear(): void;
            [normalizedFollowTag](root: unknown, beginIndex: number, endIndex: number): unknown;
            private getHierarchy;
            private getScript;
        }
        /**
         * 在运行时，将一条轨道绑定到其目标对象。
         */
        export class TrackBinding {
            path: TrackPath;
            proxy: IValueProxyFactory;
            private static _animationFunctions;
            createRuntimeBinding(target: unknown): RuntimeBinding<unknown> | {
                target: any;
                setValue: any;
                getValue: any;
            } | null;
        }
        /**
         * AnimationClip的基础组成部分,一个track对应了一条属性的变化曲线
         */
        export abstract class Track {
            get path(): TrackPath;
            set path(value: TrackPath);
            /**
             * 目标的值代理。
             */
            get proxy(): IValueProxyFactory | undefined;
            set proxy(value: IValueProxyFactory | undefined);
            /**
             * @internal
             */
            get [trackBindingTag](): TrackBinding;
            /**
             *  此轨道上的通道。
             */
            channels(): Iterable<Channel>;
            /**
             * 此轨道的时间范围。
             */
            range(): Range;
            abstract [createEvalSymbol](): TrackEval<any>;
            private _binding;
            abstract clone(): Track;
        }
        type Curve = RealCurve | QuatCurve | ObjectCurve<unknown>;
        export class Channel<T = Curve> {
            constructor(curve: T);
            name: string;
            /**
             * 通道中的曲线。
             */
            get curve(): T;
            set curve(value: T);
            private _curve;
        }
        type RealChannel = Channel<RealCurve>;
        export abstract class SingleChannelTrack<TCurve extends Curve> extends Track {
            // 因为要回去属性的默认值,所以需要初始化一个实例.. 抽象类先只能这么解决了
            static dotNotInstanceMe: boolean;
            constructor();
            /**
             * 轨道包含的通道。
             */
            get channel(): Channel<TCurve>;
            channels(): Iterable<Channel<TCurve>>;
            /**
             * @internal
             */
            protected abstract createCurve(): TCurve;
            /**
             * @internal
             */
            [createEvalSymbol](): TrackEval<unknown>;
            private _channel;
        }
        interface Range$0 {
            min: number;
            max: number;
        }
        interface IAnimationEventDispatcher {
            onAnimationEvent: mw.Action2<string, string[]>;
        }
        export namespace AnimationClip {
            interface IEvent {
                time: number;
                func: string;
                params: string[];
            }
        }
        export class TrackEvalStatus<TValue> {
            constructor(binding: RuntimeBinding<TValue>, trackEval: TrackEval<TValue>);
            evaluate(time: number): void;
            private _binding;
            private _trackEval;
            private _shouldEvaluateDefault;
        }
        interface IAnimationEvent {
            functionName: string;
            parameters: string[];
        }
        interface IAnimationEventGroup {
            events: IAnimationEvent[];
        }
        interface AnimationClipEvalContext {
            target: unknown;
        }
        export class AnimationClip extends lighter.assets.Asset {
            editorGuid: string;
            readonly name: string;
            constructor(name?: string);
            onLoaded(): void;
            /**
             * 动画帧率
             */
            sample: number;
            /**
             * 播放速度
             */
            speed: number;
            wrapMode: WrapMode;
            get trackCount(): number;
            get tracks(): Iterable<Track>;
            get events(): AnimationClip.IEvent[];
            set events(value: AnimationClip.IEvent[]);
            duration: number;
            private _tracks;
            private _events;
            private _runtimeEvents;
            createEvaluator(context: AnimationClipEvalContext): AnimationClipEvaluation;
            private _createEvalWithBinder;
            range(): Range$0;
            getTrack(index: number): Track;
            addTrack(track: Track): number;
            removeTrack(index: number): void;
            removeTrackFromTrack(track: Track | TrackPath): void;
            getTrackByPath(path: TrackPath): Track | undefined;
            clearTracks(): void;
            containsAnyEvent(): boolean;
            createEventEvaluator(targetNode: IAnimationEventDispatcher): EventEvaluator;
            clone(): AnimationClip;
        }
        export class AnimationClipEvaluation {
            constructor(trackEvalStatuses: TrackEvalStatus<unknown>[]);
            evaluate(time: number): void;
            destroy(): void;
            private _trackEvalStatues;
        }
        export class EventEvaluator {
            private _targetNode;
            private _ratios;
            private _eventGroups;
            private _wrapMode;
            constructor(_targetNode: IAnimationEventDispatcher, _ratios: readonly number[], _eventGroups: readonly IAnimationEventGroup[], _wrapMode: WrapMode);
            setWrapMode(wrapMode: WrapMode): void;
            ignore(ratio: number, direction: number): void;
            reset(): void;
            sample(ratio: number, direction: number, iterations: number): void;
            private _lastFrameIndex;
            private _lastIterations;
            private _lastDirection;
            private _ignoreIndex;
            private _sampled;
            private _doFire;
            private _checkAndFire;
            destroy(): void;
        }
        interface IAnimationLifeCycleEventDispatcher {
            onAnimationLifeEvent: mw.Action2<EventType, AnimationState>;
        }
        export class AnimationState extends Playable {
            get clip(): AnimationClip;
            /**
             * @en The name of the playing animation.
             * @zh 动画的名字。
             */
            get name(): string;
            get length(): number;
            get wrapMode(): WrapMode;
            set wrapMode(value: WrapMode);
            /**
             * 迭代次数，指动画播放多少次后结束, normalize time。 如 2.5（2次半）。
             * @default 1
             */
            get repeatCount(): number;
            set repeatCount(value: number);
            /**
             * 延迟多少秒播放。
             * @default 0
             */
            get delay(): number;
            set delay(value: number);
            /**
             * @zh 单次动画的持续时间，秒。（动画长度）
             * @readOnly
             */
            duration: number;
            /**
             * 获取或设置播放范围。
             * 范围的 `min`、`max` 字段都是以秒为单位的。
             * 设置时，应当指定一个有效的范围；实际的播放范围是该字段和 [0, 周期] 之间的交集。
             * 设置播放范围时将重置累计播放时间。
             * 如果 `min === max`，该动画将一直在 `min` 处播放。
             */
            get playbackRange(): Readonly<{
                min: number;
                max: number;
            }>;
            set playbackRange(value: Readonly<{
                min: number;
                max: number;
            }>);
            /**
             * 播放速率。
             * @default: 1.0
             */
            get speed(): number;
            set speed(value: number);
            private _time;
            /**
             * 动画当前**累计播放**的时间，单位为秒。
             * @default 0
             */
            get time(): number;
            set time(time: number);
            /**
             * @en Gets the time progress, in seconds.
             * @zh 获取动画的时间进度，单位为秒。
             */
            get current(): number;
            /**
             * @zh 获取动画播放的比例时间。
             */
            get ratio(): number;
            /**
             * 此动画状态的权重。
             */
            get weight(): number;
            set weight(value: number);
            frameRate: number;
            protected _targetNode: unknown | null;
            protected _curveLoaded: boolean;
            private _clip;
            private _speed;
            private _useSimpleProcess;
            private _eventTarget;
            private _wrapMode;
            private _repeatCount;
            private _delay;
            private _delayTime;
            private _currentFramePlayed;
            private _name;
            private _lastIterations;
            private _lastWrapInfo;
            private _wrappedInfo;
            private _playbackRange;
            private _playbackDuration;
            private _invDuration;
            private _weight;
            private _clipEval;
            private _clipEventEval;
            protected _doNotCreateEval: boolean;
            constructor(clip: AnimationClip, name?: string);
            private setResetClip;
            get curveLoaded(): boolean;
            initialize(root: unknown, eventDispatcher?: IAnimationEventDispatcher & IAnimationLifeCycleEventDispatcher): void;
            destroy(): void;
            update(delta: number): void;
            sample(): WrappedInfo;
            protected onPlay(): void;
            protected onStop(): void;
            protected onResume(): void;
            protected onPause(): void;
            /**
             * @internal
             */
            protected _sampleCurves(time: number): void;
            private _process;
            private process;
            private simpleProcess;
            private _needReverse;
            private getWrappedInfo;
            private _getPlaybackStart;
            private _sampleEvents;
            private emit;
            private _onReplayOrResume;
            private _onPauseOrStop;
        }
        interface CrossFadeScheduler {
            addCrossFade(crossFade: CrossFade): void;
            removeCrossFade(crossFade: CrossFade): void;
        }
        export class CrossFade extends Playable {
            private readonly _managedStates;
            private readonly _fadings;
            private _scheduled;
            private _scheduler;
            constructor(scheduler?: CrossFadeScheduler);
            update(deltaTime: number): void;
            /**
             * 在指定时间内将从当前动画状态切换到指定的动画状态。
             * @param state 指定的动画状态。
             * @param duration 切换时间。
             */
            crossFade(state: AnimationState | null, duration: number): void;
            clear(): void;
            protected onPlay(): void;
            /**
             * 停止我们淡入淡出的所有动画状态并停止淡入淡出。
             */
            protected onPause(): void;
            /**
             * 恢复我们淡入淡出的所有动画状态并继续淡入淡出。
             */
            protected onResume(): void;
            /**
             * 停止所有淡入淡出的动画状态。
             */
            protected onStop(): void;
            private _calculateWeights;
            private _scheduleThis;
            private _unscheduleThis;
        }
        export class AnimationManager {
            private _anims;
            private _crossFades;
            private _delayEvents;
            addCrossFade(crossFade: CrossFade): void;
            removeCrossFade(crossFade: CrossFade): void;
            addAnimation(anim: AnimationState): void;
            removeAnimation(anim: AnimationState): void;
            pushDelayEvent(fn: (...args: any[]) => void, thisArg: any, args: any[]): void;
            update(dt: number): void;
        }
        interface IHierarchyNode {
            parent: IHierarchyNode;
            name: string;
            guid: string;
        }
        export namespace AnimationUtility {
            /**
             * 计算两个节点之间的相对路径
             * @param from
             * @param to
             * @returns
             */
            function calculateRelativePath(from: IHierarchyNode, to: IHierarchyNode): string;
            /**
             * 判断一个节点是否为另外一个节点的子节点
             * @param from
             * @param to
             */
            function isRelativeTo(from: IHierarchyNode, to: IHierarchyNode): boolean;
            function getAllAnimatableProperties(target: IHierarchyNode, path?: TrackPath): Track[];
            // 只支持两种类型的对象
            function getAnimatableObjectChildren<T>(target: T, out: T[]): T[];
            /**
             *
             * @param trackPath
             * @param clip
             * @param channelName
             * @returns
             */
            function findCurveFromClip(trackPath: TrackPath, clip: AnimationClip, channelName?: string): RealCurve;
            function findChannel(track: Track, channelName?: string): Channel<Curve>;
            function createTrackBinding(target: IHierarchyNode, track: Track): RuntimeBinding<unknown> | {
                target: any;
                setValue: any;
                getValue: any;
            };
            function getTargetPropertyOnTrack(target: IHierarchyNode, track: Track): any;
            /**
             * 添加或者修改指定轨道上的关键帧
             * @param trackPath     轨道路径
             * @param clip          动画片段
             * @param time          时间
             * @param channelName   通道名称
             * @param value         值
             * @returns
             */
            function modifyKeyframeForClip(trackPath: TrackPath, clip: AnimationClip, target: IHierarchyNode, time: number, channelName: string, value?: unknown): string[];
            function modifyChannelValueAtTime(track: Track, target: IHierarchyNode, targetChannel: Channel, time: number, value?: any): void;
            function removeKeyframeForClip(trackPath: TrackPath, clip: AnimationClip, time: number, channelName: string): boolean;
            function evaluateValueFrom(trackPath: TrackPath, clip: AnimationClip, time: number, target: IHierarchyNode): any;
            function evaluateSingleChannel(trackPath: TrackPath, clip: AnimationClip, time: number, channelName: string): unknown;
            function modifyOrAddKeyframeForCurve(curve: Curve, time: number, value: any): void;
            function modifyOrAddKeyframeForChannel(channel: Channel, time: number, value: any): void;
        }
        export const setAnimatorTarget: unique symbol;
        export class Animator {
            static pools: Animator[];
            static getAnimator(target: unknown): Animator;
            protected _target: unknown;
            protected _nameToState: Map<string, AnimationState>;
            protected _clips: AnimationClip[];
            protected _crossFade: CrossFade;
            onAnimationEvent: mw.Action2<string, string[]>;
            onAnimationLifeEvent: mw.Action2<EventType, AnimationState>;
            [setAnimatorTarget](target: unknown): void;
            play(animationClip: AnimationClip | string): void;
            pause(): void;
            resume(): void;
            crossFade(name: string, duration?: number): void;
            getAnimationState(name: string): AnimationState;
            createState(clip: AnimationClip, name?: string): AnimationState;
            removeState(name: string): void;
            addClip(clip: AnimationClip, name?: string): AnimationState;
            removeClip(clip: AnimationClip, force?: boolean): void;
            protected doPlayOrCrossFade(state: AnimationState, duration: number): void;
            protected _doCreateState(clip: AnimationClip, name: string): AnimationState;
            protected _createState(clip: AnimationClip, name?: string): AnimationState;
            destroy(): void;
        }
        export function getGlobalAnimationManager(): AnimationManager;
        export namespace CurveUtility {
            type Keyframe = ElementType<RealCurve["_values"]>;
            export function hasKeysInRange(curve: Curve, beginTime: number, endTime: number): boolean;
            export function removeKeysInRange(curve: Curve, beginTime: number, endTime: number): void;
            export function updateTangentsFromMode(curve: RealCurve): void;
            export function updateTangentsFromModeSurrounding(curve: RealCurve, index: number): void;
            export function calculateSmoothTangent(keys: Keyframe): number;
            export function getKeyTangentMode(key: Keyframe, leftRight: number): TangentMode;
            export function getKeyBroken(key: Keyframe): boolean;
            export function setKeyBroken(key: Keyframe, broken: boolean): void;
            export function setKeyTangentMode(key: Keyframe, leftRight: number, mode: TangentMode): void;

        }
        export namespace math {
            const EPSILON = 0.000001;
            function repeat(t: number, length: number): number;
            function pingPong(t: number, length: number): number;
            function binarySearch(array: number[], value: number): number;
            function binarySearchEpsilon(array: Readonly<ArrayLike<number>>, value: number, EPSILON?: number): number;
            function binarySearchBy<T, U>(array: Readonly<ArrayLike<T>>, value: U, lessThan: (lhs: T, rhs: U) => number): number;
            function approx(a: number, b: number, maxDiff?: number): boolean;
            function lerp(a: number, b: number, t: number): number;
            function clamp(value: number, min: number, max: number): number;
            function clamp01(value: number): number;
        }
        export namespace builtinBindgings {
            interface CurveBase {
                readonly minRange: number;
                readonly maxRange: number;
            }
            type KeyFrame<TKeyframeValue> = [
                number,
                TKeyframeValue
            ];
            class KeyFrameCurve<TKeyframeValue> implements CurveBase, Iterable<KeyFrame<TKeyframeValue>> {
                protected _times: number[];
                protected _values: TKeyframeValue[];
                get minRange(): number;
                get maxRange(): number;
                get length(): number;
                keyframes(): Iterable<KeyFrame<TKeyframeValue>>;
                times(): Readonly<number[]>;
                values(): Readonly<TKeyframeValue[]>;
                [Symbol.iterator](): {
                    next: () => IteratorResult<KeyFrame<TKeyframeValue>>;
                };
                addKeyframe(time: number, value: TKeyframeValue): number;
                removeKeyframe(index: number): void;
                updateKeyframeTime(index: number, newTime: number): void;
                findFrameIndexWithTime(time: number): number;
                clear(): void;
                assignSorted(keyframes: Iterable<[
                    number,
                    TKeyframeValue
                ]>): void;
                assignSorted(times: readonly number[], values: TKeyframeValue[]): void;
                protected searchKeyframe(time: number): number;
                protected setKeyframes(times: number[], values: TKeyframeValue[]): void;
                private internalAddKeyframe;
            }
            type ObjectCurveKeyframe<T> = T;
            class ObjectCurve<T> extends KeyFrameCurve<ObjectCurveKeyframe<T>> {
                evaluate(time: number): T;
                clone(): ObjectCurve<T>;
            }
            /**
             * @engineInternal
             */
            enum EasingMethod {
                LINEAR = 0,
                CONSTANT = 1,
                QUAD_IN = 2,
                QUAD_OUT = 3,
                QUAD_IN_OUT = 4,
                QUAD_OUT_IN = 5,
                CUBIC_IN = 6,
                CUBIC_OUT = 7,
                CUBIC_IN_OUT = 8,
                CUBIC_OUT_IN = 9,
                QUART_IN = 10,
                QUART_OUT = 11,
                QUART_IN_OUT = 12,
                QUART_OUT_IN = 13,
                QUINT_IN = 14,
                QUINT_OUT = 15,
                QUINT_IN_OUT = 16,
                QUINT_OUT_IN = 17,
                SINE_IN = 18,
                SINE_OUT = 19,
                SINE_IN_OUT = 20,
                SINE_OUT_IN = 21,
                EXPO_IN = 22,
                EXPO_OUT = 23,
                EXPO_IN_OUT = 24,
                EXPO_OUT_IN = 25,
                CIRC_IN = 26,
                CIRC_OUT = 27,
                CIRC_IN_OUT = 28,
                CIRC_OUT_IN = 29,
                ELASTIC_IN = 30,
                ELASTIC_OUT = 31,
                ELASTIC_IN_OUT = 32,
                ELASTIC_OUT_IN = 33,
                BACK_IN = 34,
                BACK_OUT = 35,
                BACK_IN_OUT = 36,
                BACK_OUT_IN = 37,
                BOUNCE_IN = 38,
                BOUNCE_OUT = 39,
                BOUNCE_IN_OUT = 40,
                BOUNCE_OUT_IN = 41,
                SMOOTH = 42,
                FADE = 43
            }
            type EasingMethodFn = (k: number) => number;
            function getEasingFn(easingMethod: EasingMethod): EasingMethodFn;
            /**
             * 在某关键帧（前一帧）和其下一帧之间插值时使用的插值方式。
             */
            enum RealInterpolationMode {
                /**
                 * 在前一帧和后一帧之间执行线性插值。
                 */
                LINEAR = 0,
                /**
                 * 永远使用前一帧的值。
                 */
                CONSTANT = 1,
                /**
                 * 在前一帧和后一帧之间执行立方插值。
                 */
                CUBIC = 2
            }
            /**
             * 在求值曲线时，指定当输入时间下溢（小于第一帧的时间）或上溢（大于最后一帧的时间）时应该如何推断结果值。
             */
            enum ExtrapolationMode {
                /**
                 * 下溢时，根据前两帧的线性趋势计算结果；上溢时，根据最后两帧的线性趋势计算结果。
                 * 如果曲线帧数小于 2，回退到  `CLAMP`。
                 */
                LINEAR = 0,
                /**
                 * 下溢时，使用第一帧的值；上溢时，使用最后一帧的值。
                 */
                CLAMP = 1,
                /**
                 * 求值时将该曲线视作是无限连续循环的。
                 */
                LOOP = 2,
                /**
                 * 求值时将该曲线视作是以“乒乓”的形式无限连续循环的。
                 */
                PING_PONG = 3
            }
            /**
             * 指定关键帧两侧的切线权重模式。
             */
            enum TangentWeightMode {
                /**
                 * 关键帧的两侧都不携带切线权重信息。
                 */
                NONE = 0,
                /**
                 * 仅关键帧的左侧携带切线权重信息。
                 */
                LEFT = 1,
                /**
                 * 仅关键帧的右侧携带切线权重信息。
                 */
                RIGHT = 2,
                /**
                 * 关键帧的两侧都携带切线权重信息。
                 */
                BOTH = 3
            }
            /**
             * 在某四元数关键帧（前一帧）和其下一帧之间插值时使用的插值方式。
             */
            enum QuatInterpolationMode {
                /**
                 * 在前一帧和后一帧之间执行球面线性插值。
                 */
                SLERP = 0,
                /**
                 * 永远使用前一帧的值。
                 */
                CONSTANT = 1
            }
            class QuatKeyframeValue {
                /**
                 
                 * 在执行插值时，当以此关键帧作为起始关键帧时应当使用的插值方式。
                 */
                interpolationMode: QuatInterpolationMode;
                /**
                 
                 * 该关键帧的值。
                 */
                value: mw.Quaternion;
                /**
                 * @internal Reserved for backward compatibility. Will be removed in future.
                 */
                easingMethod: EasingMethod | [
                    number,
                    number,
                    number,
                    number
                ];
                constructor({ value, interpolationMode, easingMethod }?: Partial<QuatKeyframeValue>);
            }
            /**
             
             * @zh
             * 用于描述实数关键帧值的参数。
             * 若是部分关键帧的形式，关键帧值的每个分量都是从该参数中取得。
             * 对于未指定的分量，使用默认值：
             * - 插值模式：球面线性插值
             * - 值：单位四元数
             */
            type QuatKeyframeValueParameters = Partial<QuatKeyframeValue>;
            /**
             * @zh
             * 四元数曲线
             */
            class QuatCurve extends KeyFrameCurve<QuatKeyframeValue> {
                /**
                 
                 * 获取或设置此曲线的前向外推模式。
                 * 默认为 `ExtrapolationMode.CLAMP`。
                 */
                preExtrapolation: ExtrapolationMode;
                /**
                 
                 * 获取或设置此曲线的后向外推模式。
                 * 默认为 `ExtrapolationMode.CLAMP`。
                 */
                postExtrapolation: ExtrapolationMode;
                /**
                 
                 * 计算此曲线在指定时间上的值。
                 */
                evaluate(time: number, quat?: mw.Quaternion): mw.Quaternion;
                addKeyframe(time: number, value: QuatKeyframeValueParameters): number;
                assignSorted(keyframes: Iterable<[
                    number,
                    QuatKeyframeValueParameters
                ]>): void;
                assignSorted(times: readonly number[], values: QuatKeyframeValueParameters[]): void;
                clone(): QuatCurve;
            }
            enum TangentMode {
                Editable = 0,
                Smooth = 1,
                Linear = 2,
                Stepped = 3
            }
            class RealKeyFrame {
                get interpolationMode(): RealInterpolationMode;
                set interpolationMode(value: RealInterpolationMode);
                get tangentWeightMode(): TangentWeightMode;
                set tangentWeightMode(value: TangentWeightMode);
                get easingMethod(): number;
                set easingMethod(value: number);
                private _flags;
                value: number;
                leftTangent: number;
                rightTangent: number;
                leftTangentWeight: number;
                rightTangentWeight: number;
                // only in editor
                tangentMode: TangentMode;
            }
            type RealKeyframeValueParameters = number | Partial<RealKeyFrame>;
            class RealCurve extends KeyFrameCurve<RealKeyFrame> {
                preInfinity: ExtrapolationMode;
                postInfinity: ExtrapolationMode;
                evaluate(time: number): number;
                addKeyframe(time: number, value: RealKeyframeValueParameters): number;
                assignSorted(keyframes: Iterable<[
                    number,
                    RealKeyframeValueParameters
                ]>): void;
                /**
                 * Assigns all keyframes.
                 * @param times Times array. Should be sorted.
                 * @param values Values array. Corresponding to each time in `times`.
                 */
                assignSorted(times: readonly number[], values: RealKeyframeValueParameters[]): void;
                isConstant(tolerance: number): boolean;
                clone(): RealCurve;
            }
            /**
             * 曲线值代理用来设置曲线值到目标，是广义的赋值。
             * 每个曲线值代理都关联着一个目标对象。
             */
            interface IValueProxy<T = any> {
                /**
                 * 从目标中获取值。某些情况下可能需要这个接口来实现分量动画。
                 */
                get?: () => T;
                /**
                 * 设置曲线值到目标对象上。
                 */
                set: (value: T) => void;
            }
            interface IValueProxyFactory {
                forTarget(target: any): IValueProxy | undefined;
            }
            type Binder = (binding: TrackBinding) => undefined | RuntimeBinding;
            const createEvalSymbol: unique symbol;
            const trackBindingTag: unique symbol;
            interface RuntimeBinding<T = unknown> {
                setValue(value: T): void;
                getValue?(): T;
            }
            interface Range {
                min: number;
                max: number;
            }
            interface TrackEval<TValue> {
                readonly requiresDefault: boolean;
                evaluate(time: number, defaultValue?: TValue extends unknown ? unknown : Readonly<TValue>): TValue;
            }
            const normalizedFollowTag: unique symbol;
            /**
             * 描述一条轨道如何寻址其目标对象。
             */
            class TrackPath {
                private _paths;
                get length(): number;
                toString(): string;
                combine(path: TrackPath): this;
                toProperty(name: string, alias?: string): this;
                toHierarchy(name: string): this;
                toScript(name: string): this;
                toElement(name: number): this;
                toFunction(name: string, alias?: string): this;
                toSimulateProxy(name: string, alias?: string): this;
                isPropertyAt(index: number): boolean;
                isElementAt(index: number): boolean;
                isSimulateProxy(index: number): boolean;
                isHierarchyAt(index: number): boolean;
                isFunctionAt(index: number): boolean;
                parsePropertyAt(index: number): string;
                parseElementAt(index: number): number;
                parseHierarchyAt(index: number): string;
                getAlias(index: number): string;
                getAllAlias(): string;
                equal(b: TrackPath): boolean;
                from(path: string): void;
                clone(): TrackPath;
                getHierarchyDepth(): number;
                static equals(a: TrackPath, b: TrackPath): boolean;
                clear(): void;
                [normalizedFollowTag](root: unknown, beginIndex: number, endIndex: number): unknown;
                private getHierarchy;
                private getScript;
            }
            /**
             * 在运行时，将一条轨道绑定到其目标对象。
             */
            class TrackBinding {
                path: TrackPath;
                proxy: IValueProxyFactory;
                private static _animationFunctions;
                createRuntimeBinding(target: unknown): RuntimeBinding<unknown> | {
                    target: any;
                    setValue: any;
                    getValue: any;
                } | null;
            }
            /**
             * AnimationClip的基础组成部分,一个track对应了一条属性的变化曲线
             */
            abstract class Track {
                get path(): TrackPath;
                set path(value: TrackPath);
                /**
                 * 目标的值代理。
                 */
                get proxy(): IValueProxyFactory | undefined;
                set proxy(value: IValueProxyFactory | undefined);
                /**
                 * @internal
                 */
                get [trackBindingTag](): TrackBinding;
                /**
                 *  此轨道上的通道。
                 */
                channels(): Iterable<Channel>;
                /**
                 * 此轨道的时间范围。
                 */
                range(): Range;
                abstract [createEvalSymbol](): TrackEval<any>;
                private _binding;
                abstract clone(): Track;
            }
            type Curve = RealCurve | QuatCurve | ObjectCurve<unknown>;
            class Channel<T = Curve> {
                constructor(curve: T);
                name: string;
                /**
                 * 通道中的曲线。
                 */
                get curve(): T;
                set curve(value: T);
                private _curve;
            }
            type RealChannel = Channel<RealCurve>;
            abstract class SingleChannelTrack<TCurve extends Curve> extends Track {
                // 因为要回去属性的默认值,所以需要初始化一个实例.. 抽象类先只能这么解决了
                static dotNotInstanceMe: boolean;
                constructor();
                /**
                 * 轨道包含的通道。
                 */
                get channel(): Channel<TCurve>;
                channels(): Iterable<Channel<TCurve>>;
                /**
                 * @internal
                 */
                protected abstract createCurve(): TCurve;
                /**
                 * @internal
                 */
                [createEvalSymbol](): TrackEval<unknown>;
                private _channel;
            }
            interface IAnimationPropertyBindings<T = unknown> {
                matchOf(target: T): boolean;
                getAllAnimatableProperties(target: T, outProperties: Track[], trackPath: TrackPath): void;
            }
            type Vector = mw.Vector | mw.Vector2 | mw.Vector4;
            class VectorAnimateBindings implements IAnimationPropertyBindings<Vector> {
                matchOf(target: Vector): boolean;
                getAllAnimatableProperties(target: Vector, outProperties: Track[], trackPath: TrackPath): void;
            }
            class RotationAnimateBindings implements IAnimationPropertyBindings<mw.Rotation> {
                matchOf(target: mw.Rotation): boolean;
                getAllAnimatableProperties(target: mw.Rotation, outProperties: Track[], trackPath: TrackPath): void;
            }
            class LineColorAnimateBindings implements IAnimationPropertyBindings<mw.LinearColor> {
                matchOf(target: mw.LinearColor): boolean;
                getAllAnimatableProperties(target: mw.LinearColor, outProperties: Track[], trackPath: TrackPath): void;
            }
            class QuatAnimateBindings implements IAnimationPropertyBindings<mw.Quaternion> {
                matchOf(target: mw.Quaternion): boolean;
                getAllAnimatableProperties(target: mw.Quaternion, outProperties: Track[], trackPath: TrackPath): void;
            }
            class TransformBindings implements IAnimationPropertyBindings<mw.Transform> {
                matchOf(target: mw.Transform): boolean;
                getAllAnimatableProperties(target: mw.Transform, outProperties: Track[], trackPath: TrackPath): void;
            }
        }
        interface IAnimationPropertyBindings<T = unknown> {
            matchOf(target: T): boolean;
            getAllAnimatableProperties(target: T, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class CameraAnimateBindings implements IAnimationPropertyBindings<mw.Camera> {
            matchOf(target: mw.Camera): boolean;
            getAllAnimatableProperties(target: mw.Camera, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class FogAnimateBindings implements IAnimationPropertyBindings<mw.Fog> {
            matchOf(target: mw.Fog): boolean;
            getAllAnimatableProperties(target: mw.Fog, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class GameObjectAnimateBindings implements IAnimationPropertyBindings<mw.GameObject> {
            matchOf(target: mw.GameObject): boolean;
            getAllAnimatableProperties(target: mw.GameObject, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class GlobalCameraAnimateBindings implements IAnimationPropertyBindings<any> {
            matchOf(target: any): boolean;
            getAllAnimatableProperties(target: mw.Camera, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class LightingAnimateBindings implements IAnimationPropertyBindings<mw.Lighting> {
            matchOf(target: mw.Lighting): boolean;
            getAllAnimatableProperties(target: mw.Lighting, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class MaterialInstanceBindings implements IAnimationPropertyBindings<mw.MaterialInstance> {
            matchOf(target: mw.MaterialInstance): boolean;
            getAllAnimatableProperties(target: mw.MaterialInstance, outProperties: Track[], trackPath: TrackPath): void;
        }
        type NormalType = number | string | boolean;
        export class NormalTypeAnimateBindings implements IAnimationPropertyBindings<NormalType> {
            matchOf(target: NormalType): boolean;
            getAllAnimatableProperties(target: NormalType, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class PostProcessAnimateBindings implements IAnimationPropertyBindings<mw.PostProcess> {
            matchOf(target: mw.PostProcess): boolean;
            getAllAnimatableProperties(target: mw.PostProcess, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class ScriptAnimateBindings implements IAnimationPropertyBindings<mw.Script> {
            matchOf(target: mw.Script): boolean;
            getAllAnimatableProperties(target: mw.Script, outProperties: Track[], trackPath: TrackPath): void;
            private getGenericTrack;
        }
        /**
         * @Author       : zewei.zhang
         * @Date         : 2024-03-19 09:38:15
         * @LastEditors  : zewei.zhang
         * @LastEditTime : 2024-03-22 16:54:35
         * @FilePath     : \Plugins\core-animator\src\property\accessor\SkyBoxAnimateBindings.ts
         * @Description  : 天空盒动画绑定
         */
        export class SkyBoxAnimateBindings implements IAnimationPropertyBindings<mw.Skybox> {
            matchOf(target: mw.Skybox): boolean;
            getAllAnimatableProperties(target: mw.Skybox, outProperties: Track[], trackPath: TrackPath): void;
        }
        export class WidgetAnimateBindings implements IAnimationPropertyBindings<mw.Widget> {
            matchOf(target: Widget): boolean;
            getAllAnimatableProperties(target: Widget, outProperties: Track[], trackPath: TrackPath): void;
        }
        /**
         
         * 实数轨道描述目标上某个标量属性的动画。
         */
        export class RealTrack extends SingleChannelTrack<RealCurve> {
            /**
             * @internal
             */
            protected createCurve(): RealCurve;
            clone(): RealTrack;
        }
        export enum RGBRangeType {
            //0~1
            ZeroToOne = 1,
            //0~255
            ZeroToFF = 255
        }
        /**
         * @zh
         * 颜色轨道描述目标上某个颜色属性的动画。
         */
        export class LineColorTrack extends Track {
            private _rangeType;
            constructor(_rangeType?: RGBRangeType);
            /**
             * 返回此轨道的四条通道。
             */
            channels(): [
                RealChannel,
                RealChannel,
                RealChannel,
                RealChannel
            ];
            [createEvalSymbol](): ColorTrackEval;
            private _channels;
            clone(): LineColorTrack;
        }
        export class ColorTrackEval implements TrackEval<mw.LinearColor> {
            private _x;
            private _y;
            private _z;
            private _w;
            private _rangeType;
            constructor(_x: RealCurve | undefined, _y: RealCurve | undefined, _z: RealCurve | undefined, _w: RealCurve | undefined, _rangeType?: RGBRangeType);
            get requiresDefault(): boolean;
            evaluate(time: number): mw.LinearColor;
            private _result;
        }
        /**
         * 向量轨道描述目标上某个（二、三、四维）向量属性的动画。
         */
        export class VectorTrack extends Track {
            constructor();
            /**
             * @zh 获取或设置此轨道在求值时有效的分量数（维度）。
             */
            get componentsCount(): number;
            set componentsCount(value: number);
            /**
             * @zh 返回此轨道的四条通道。
             */
            channels(): [
                RealChannel,
                RealChannel,
                RealChannel,
                RealChannel
            ];
            /**
             * @internal
             */
            [createEvalSymbol](): Vec2TrackEval | Vec3TrackEval | Vec4TrackEval;
            private _channels;
            private _nComponents;
            clone(): VectorTrack;
        }
        export class Vec2TrackEval implements TrackEval<mw.Vector2> {
            private _x;
            private _y;
            constructor(_x: RealCurve | undefined, _y: RealCurve | undefined);
            get requiresDefault(): boolean;
            evaluate(time: number): mw.Vector2;
            private _result;
        }
        export class Vec3TrackEval implements TrackEval<mw.Vector> {
            private _x;
            private _y;
            private _z;
            constructor(_x: RealCurve | undefined, _y: RealCurve | undefined, _z: RealCurve | undefined);
            get requiresDefault(): boolean;
            evaluate(time: number): mw.Vector;
            private _result;
        }
        export class Vec4TrackEval implements TrackEval<mw.Vector4> {
            private _x;
            private _y;
            private _z;
            private _w;
            constructor(_x: RealCurve | undefined, _y: RealCurve | undefined, _z: RealCurve | undefined, _w: RealCurve | undefined);
            get requiresDefault(): boolean;
            evaluate(time: number): mw.Vector4;
            private _result;
        }
        export class MarginTrack extends Track {
            private _vectorTrack;
            constructor();
            channels(): any;
            [createEvalSymbol](): MarginTrackEval;
            clone(): MarginTrack;
        }
        export class MarginTrackEval implements TrackEval<mw.Margin> {
            private _vec4TrackEval;
            constructor(_vec4TrackEval: Vec4TrackEval);
            get requiresDefault(): boolean;
            private _margin;
            evaluate(time: number, defaultValue?: Readonly<mw.Margin>): mw.Margin;
        }
        /**
         
         * 实数轨道描述目标上某个标量属性的动画。
         */
        export class ObjectTrack extends SingleChannelTrack<ObjectCurve<unknown>> {
            /**
             * @internal
             */
            protected createCurve(): ObjectCurve<unknown>;
            clone(): ObjectTrack;
        }
        /**
         
         * 四元数轨道描述目标上某个四元数（旋转）属性的动画。
         */
        export class QuatTrack extends SingleChannelTrack<QuatCurve> {
            /**
             * @internal
             */
            protected createCurve(): QuatCurve;
            /**
             * @internal
             */
            [createEvalSymbol](): QuatTrackEval;
            clone(): QuatTrack;
        }
        export class QuatTrackEval implements TrackEval<mw.Quaternion> {
            private _curve;
            constructor(_curve: QuatCurve);
            get requiresDefault(): boolean;
            evaluate(time: number): mw.Quaternion;
            private _result;
        }
        export class RotationTrack extends Track {
            private _vectorTrack;
            constructor();
            channels(): Iterable<Channel<Curve>>;
            [createEvalSymbol](): RotationTrackEval;
            clone(): RotationTrack;
        }
        export class RotationTrackEval implements TrackEval<mw.Rotation> {
            private _vec3TrackEval;
            constructor(_vec3TrackEval: Vec3TrackEval);
            get requiresDefault(): boolean;
            private _rotation;
            evaluate(time: number, defaultValue?: Readonly<mw.Rotation>): mw.Rotation;
        }


    }
}
