declare namespace lighter {
    export namespace assets {
        class Asset {
            uuid: string;
            private _ref;
            /**
             * 基于工程路径下的原生路径
             */
            nativeUrl: string;
            get refCount(): number;
            addRef(): this;
            decreaseRef(autoRelease?: boolean): this;
            validate(): boolean;
            destroy(): void;
            onLoaded(): void;
        }

        interface IAssetMgr {
            getAsset<T extends Asset>(uuid: string): T;
            hasAsset(uuid: string): boolean;
            getAssetsByType(type: string): string[];
        }

        interface IAssetPlugin {
            /**
             * 插件标识
             */
            name: string;
            /**
             * 版本
             */
            version: string;
            sourceMgr: IAssetMgr;
            /**
             * 初始化资源
             * @param assets
             */
            initialize(assets: Asset[]): any;
            /**
             * 处理版本不匹配资源
             * @param assets
             */
            handleUnMatchedVersion(assets: Asset, curVer: string): boolean;
            clear(): void;
        }

        abstract class BaseAssetPlugin {
            abstract name: string;
            abstract version: string;
            abstract sourceMgr: IAssetMgr;
            get assetsList(): string[];
            handleUnMatchedVersion(assets: Asset, curVer: string): boolean;
            initialize(assets: Asset[]): void;
            protected upgradeAsset(asset: Asset, curVer: string, targetVer: string): void;
        }

        interface IAssetSource {
            asset: unknown;
            uuid: string;
            type: string;
            ver: string;
            subVer: string;
        }

        type IAssetConfig = Omit<IAssetSource, "asset">;
        type LoadProgress = (cur: number, total: number) => void;
        abstract class AssetsManager {
            version: string;
            private _isAssetLoaded;
            private _assetsMetaInfo;
            private _assets;
            private _assetTypeLookTable;
            private _assetPlugins;
            abstract startLoad(progress?: LoadProgress): void;
            registerAssetsPlugin(plugin: IAssetPlugin): void;
            unRegisterAssetsPlugin(plugin: IAssetPlugin): void;
            loadAsset(source: IAssetSource): void;
            loadAssetsComplete(): void;
            private handlePluginAsset;
            getAsset<T extends Asset>(uuid: string): T;
            hasAsset(uuid: string): boolean;
            deleteAsset(uuid: string): void;
            getAssetsByType(assetType: string): string[];
            protected postedAssetUpgraded(asset: Asset, meta: IAssetConfig): void;
            protected getAssetMetaInfo(uuid: string): IAssetConfig;
            protected internalLoadAsset(asset: Asset, config: IAssetConfig): void;
            protected internalRemoveAsset(asset: Asset): void;
            private internalGetAssetTypeSet;
            clear(): void;
        }
    }

    export namespace util {
        function decodeUuid(base64: string): string;
        interface IEventdispatcher {
            hasListener(type: string): boolean;
            event(type: string, ...data: any[]): boolean;
            on(type: string, caller: any, listener: EventCallBack, ...args: unknown[]): IEventdispatcher;
            once(type: string, caller: any, listener: EventCallBack, ...args: unknown[]): IEventdispatcher;
            off(type: string, caller: any, listener: EventCallBack, onceOnly?: boolean): IEventdispatcher;
            offAll(type?: string): IEventdispatcher;
            offAllCaller(caller: any): IEventdispatcher;
        }

        type EventCallBack = (...args: unknown[]) => unknown;
        class EventDispatcher {
            /**@private */
            private _events;
            /**
             * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
             * @param	type 事件的类型。
             * @return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
             */
            hasListener(type: string): boolean;
            /**
             * 派发事件。
             * @param type	事件类型。
             * @param data	（可选）回调数据。
             * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
             */
            event(type: string, ...data: any[]): boolean;
            /**
             * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
             * @param type		事件的类型。
             * @param caller	事件侦听函数的执行域。
             * @param listener	事件侦听函数。
             * @param args		（可选）事件侦听函数的回调参数。
             * @return 此 EventDispatcher 对象。
             */
            on(type: string, caller: any, listener: EventCallBack, ...args: unknown[]): EventDispatcher;
            /**
             * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
             * @param type		事件的类型。
             * @param caller	事件侦听函数的执行域。
             * @param listener	事件侦听函数。
             * @param args		（可选）事件侦听函数的回调参数。
             * @return 此 EventDispatcher 对象。
             */
            once(type: string, caller: any, listener: EventCallBack, ...args: unknown[]): EventDispatcher;
            private createListener;
            /**
             * 从 EventDispatcher 对象中删除侦听器。
             * @param type		事件的类型。
             * @param caller	事件侦听函数的执行域。
             * @param listener	事件侦听函数。
             * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
             * @return 此 EventDispatcher 对象。
             */
            off(type: string, caller: any, listener: EventCallBack, onceOnly?: boolean): EventDispatcher;
            /**
             * 从 EventDispatcher 对象中删除指定事件类型的所有侦听器。
             * @param type	（可选）事件类型，如果值为 null，则移除本对象所有类型的侦听器。
             * @return 此 EventDispatcher 对象。
             */
            offAll(type?: string): EventDispatcher;
            /**
             * 移除caller为target的所有事件监听
             * @param	caller caller对象
             */
            offAllCaller(caller: any): EventDispatcher;
            private recoverHandlers;
        }

        type Fn<T extends any[]> = (...args: T) => any;
        type InferFnArgs<T> = T extends Fn<infer A> ? A : any;
        type AnyFunction = (...args: unknown[]) => unknown;
        class THandler<T extends AnyFunction> {
            /**@private handler对象池*/
            protected static _pool: THandler<any>[];
            /**@private */
            private static _gid;
            /** 执行域(this)。*/
            caller: unknown | null;
            /** 处理方法。*/
            method: T;
            /** 参数。*/
            args: any[] | null;
            /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
            once: boolean;
            /**@private */
            protected _id: number;
            ref: number;
            /**
             * 根据指定的属性值，创建一个 <code>_THandler</code> 类的实例。
             * @param	caller 执行域。
             * @param	method 处理函数。
             * @param	args 函数参数。
             * @param	once 是否只执行一次。
             */
            constructor(caller: unknown | null, method: T, args?: unknown[] | null, once?: boolean);
            /**
             * 设置此对象的指定属性值。
             * @param	caller 执行域(this)。
             * @param	method 回调方法。
             * @param	args 携带的参数。
             * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
             * @return  返回 handler 本身。
             */
            setTo(caller: any, method: T, args?: unknown[] | null, once?: boolean): THandler<T>;
            /**
             * 执行处理器。
             */
            run(): any;
            /**
             * 执行处理器，并携带额外数据。
             * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
             */
            runWith(...args: InferFnArgs<T>): any;
            /**
             * 清理对象引用。
             */
            clear(): THandler<T>;
            /**
             * 清理并回收到 _THandler 对象池内。
             */
            recover(): void;
            /**
             * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
             * @param	caller 执行域(this)。
             * @param	method 回调方法。
             * @param	args 携带的参数。
             * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
             * @return  返回创建的handler实例。
             */
            static create<T extends AnyFunction>(caller: any, method: T, args?: any[] | null, once?: boolean): THandler<T>;
            static is(obj: unknown): obj is Handler;
        }

        class Handler extends THandler<any> {
        }

        class IDGenerator {
            /**
             * @en
             * The global id generator might have a conflict problem once every 365 days,
             * if the game runs at 60 FPS and each frame 4760273 counts of new id are requested.
             *
             * @zh
             * 全局的 id 生成器，如果游戏以 60 FPS 运行，每帧获取 4760273 个新 id, 则可能在 365 天后发生冲突。
             */
            static global: IDGenerator;
            /**
             * @en A number to record current id. It may increase when invoke `getNewId()`. Should use
             * `getNewId()` to get a unique id.
             * @zh 记录当前 id 值。调用 `getNewId()` 时，它可能被加1。应该使用 `getNewId()` 获取唯一的 id。
             */
            id: number;
            /**
             * @en A string value indicates the category this IDGenerator belongs to. It will be an empty
             * string if not be assigned by passed parameter in constructor.
             * @zh 用于标识该 IDGenerator 所属的类别。如果构造函数没有传参数对它赋值的话，它将是一个空字符串。
             */
            prefix: string;
            /**
             * @en Construct a new id generator.
             * @zh 构造一个新的 id 生成器。
             *
             * @param category @en You can specify a unique category to avoid id collision with other instance of IdGenerator.
             * @zh 你能指定一个唯一的标识用于避免与其他 id 生成器冲突。
             */
            constructor(category?: string);
            /**
             * @en Gets a unique id. @zh 获取唯一的 id。
             * @returns @en The unique id. It has the form `prefix+id`, for example `scene55`, `scene` is `prefix`, `55` is `id`.
             * @zh 唯一的 id。它的形式是 `prefix+id`，比如 `scene55`，`scene` 是 prefix，`55` 是 `id`。
             */
            getNewId(): string;
        }

        type CleanUpFunction<T> = (value: T) => boolean | void;
        class Pool<T> {
            /**
             * @en
             * The current number of available objects, the default is 0. It will gradually increase with the recycle of the object,
             * the maximum will not exceed the size specified when the constructor is called.
             * @zh
             * 当前可用对象数量，一开始默认是 0，随着对象的回收会逐渐增大，最大不会超过调用构造函数时指定的 size。
             * @default 0
             */
            count: number;
            /**
             * @en
             * Gets an object from pool.
             * @zh 从对象池中获取一个对象。
             * @returns @en An object or null if this pool doesn't contain any object.
             * @zh 获取的对象。如果对象池中没有对象，返回 null。
             */
            get(): T | null;
            private _pool;
            private _cleanup;
            /**
             * @en Constructor. @zh 构造函数。
             * @param cleanupFunc @en Callback method used to process the cleanup logic when the object is recycled.
             * @zh 当对象放入对象池时，用来执行清理逻辑的回调函数。
             * @param size @en Pool size. @zh 对象池大小。
             */
            constructor(cleanup: CleanUpFunction<T>, size: number);
            /**
             * @en Constructor. @zh 构造函数。
             * @param size @en Pool size. @zh 对象池大小。
             */
            constructor(size: number);
            /**
             * @en
             * Gets an object from pool.
             * @zh 从对象池中获取一个对象。
             * @returns @en An object or null if this pool doesn't contain any object.
             * @zh 获取的对象。如果对象池中没有对象，返回 null。
             * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
             */
            _get(): T | null;
            /**
             * @en Put an object into the pool.
             * @zh 向对象池返还一个不再需要的对象。
             */
            put(obj: T): void;
            /**
             * @en Resize the pool.
             * @zh 设置对象池容量。
             * @param length @en New pool size.
             * @zh 新对象池大小。
             */
            resize(length: number): void;
        }

        class MutableForwardIterator<T> {
            array: T[];
            i: number;
            constructor(array: T[]);
            get length(): number;
            set length(value: number);
            remove(value: T): void;
            removeAt(i: number): void;
            fastRemove(value: T): void;
            fastRemoveAt(i: number): void;
            push(item: T): void;
        }

        class Time {
            private _previousTime;
            private _currentTime;
            private _delta;
            private _elapsed;
            private _timescale;
            private _useFixedDelta;
            private _fixedDelta; //ms 一秒60帧
            constructor();
            /**
             * 关闭fixeddelta
             * @returns
             */
            disableFixedDelta(): this;
            /**
             * 销毁
             * @returns
             */
            dispose(): this;
            /**
             * 已固定帧率运行
             * @returns
             */
            enableFixedDelta(): this;
            /**
             * 获取两帧的间隔
             * @returns
             */
            getDelta(): number;
            /**
             * 返回计时器开始工作后到现在的时间
             * @returns
             */
            getElapsed(): number;
            getFixedDelta(): number;
            getTimescale(): number;
            reset(): this;
            /**
             * 设置一帧固定的fixed
             * @param fixedDelta 单位秒
             * @returns
             */
            setFixedDelta(fixedDelta: number): this;
            setTimescale(timescale: any): this;
            update(): this;
            private innerNow;
        }

        class Regulator {
            updateFrequency: number;
            private _time;
            private _nextUpdateTime;
            /**
             *
             * @param updateFrequency 每秒执行多少个update
             */
            constructor(updateFrequency?: number);
            /**
             * 返回本帧能否执行后续逻辑
             * @returns
             */
            ready(): boolean;
            reset(): Time;
        }

        const js: {
            registeredClassNames: Record<string, Constructor<unknown>>;
            registeredClassIds: Record<string, Constructor<unknown>>;
            isNumber(object: any): boolean;
            isString(object: any): boolean;
            isEmptyObject(obj: any): boolean;
            createMap(forceDictMode?: boolean): any;
            getClassName(objOrCtor: any): string;
            obsolete(object: any, obsoleted: string, newExpr: string, writable?: boolean): void;
            obsoletes(obj: any, objName: any, props: any, writable: any): void;
            formatStr(msg: string, ...subst: (string | number)[]): string;
            formatStr(...data: unknown[]): string;
            shiftArguments(): any[];
            getPropertyDescriptor(object: any, propertyName: string): PropertyDescriptor;
            copyAllProperties(source: any, target: any, excepts: string[]): void;
            addon(object?: Record<string | number, any>, ...sources: any[]): Record<string | number, any>;
            mixin(object?: Record<string | number, any>, ...sources: any[]): Record<string | number, any>;
            extend(cls: Function, base: Function): Function;
            getSuper(constructor: Function): any;
            is<T>(instance: any, property: string): instance is T;
            is<T_1>(instance: any, properties: string[]): instance is T_1;
            is<T_2>(instance: any, method: (instance: any) => boolean): instance is T_2;
            isChildClassOf<T_3 extends Constructor<unknown>>(subclass: unknown, superclass: T_3): subclass is T_3;
            isChildClassOf(subclass: unknown, superclass: unknown): boolean;
            clear(object: Record<string | number, any>): void;
            setClassName(className: string, constructor: Constructor<unknown>): void;
            setClassAlias(target: Constructor<unknown>, alias: string): void;
            unregisterClass(...constructors: Function[]): void;
            _getClassById(classId: any): Constructor<unknown>;
            getClassById(classId: any): Constructor<unknown>;
            getClassByName(classname: any): Constructor<unknown>;
            _getClassId(obj: any, allowTempId?: boolean): string;
            getClassId(obj: any, allowTempId?: boolean): string;
            value: (object: Record<string | number, any>, propertyName: string, value_: any, writable?: boolean, enumerable?: boolean) => void;
            getset: (object: Record<string | number, any>, propertyName: string, getter: () => any, setter?: boolean | ((value: any) => void), enumerable?: boolean, configurable?: boolean) => void;
            get: (object: Record<string | number, any>, propertyName: string, getter: () => any, enumerable?: boolean, configurable?: boolean) => void;
            set: (object: Record<string | number, any>, propertyName: string, setter: (value: any) => void, enumerable?: boolean, configurable?: boolean) => void;
            _idToClass: Record<string, Constructor<unknown>>;
            _nameToClass: Record<string, Constructor<unknown>>;
            _setClassId: (id: string, constructor: Constructor<unknown>) => void;
        };
        const array: {
            removeAt<T>(array: T[], index: number): void;
            fastRemoveAt<T_1>(array: T_1[], index: number): void;
            remove<T_2>(array: T_2[], value: T_2): boolean;
            fastRemove<T_3>(array: T_3[], value: T_3): void;
            removeIf<T_4>(array: T_4[], predicate: (value: T_4) => boolean): T_4;
            verifyType<T_5 extends Function>(array: any[], type: T_5): array is T_5[];
            removeArray<T_6>(array: T_6[], removals: T_6[]): void;
            appendObjectsAt<T_7>(array: T_7[], objects: T_7[], index: number): T_7[];
            contains<T_8>(array: T_8[], value: T_8): boolean;
            copy<T_9>(array: T_9[]): T_9[];
        };
        const misc: {
            BASE64_VALUES: number[];
            BUILTIN_CLASSID_RE: RegExp;
        };
        const path: {
            join(...segments: string[]): string;
            extname(path: string): string;
            mainFileName(fileName: string): string;
            basename(path: string, extName?: string): string;
            dirname(path: string): string;
            changeExtname(path: string, extName?: string): string;
            changeBasename(path: string, newBaseName: string, keepExt?: boolean): string;
            _normalize(url: any): any;
            relativeTo(from: string, to: string): string;
            stripSep(path: string): string;
            getSeparator(): string;
        };
    }

    export namespace controller {
        class EventManager extends util.EventDispatcher {
            trigger(event: string, ...args: unknown[]): void;
        }

        class TimerHandler extends util.Handler {
            get handler(): number;
            /**
             * 该计时器已经过去的时间
             */
            elapsed: number;
            /**
             * 该计时器的总时间
             */
            duration: number;
            /**
             * 重复执行次数ld
             */
            loop: number;
            static create<T extends AnyFunction>(caller: any, method: T, args?: any[] | null, once?: boolean): TimerHandler;
            clear(): util.THandler<any>;
        }

        class SchedulerController {
            private _timer;
            private _isPause;
            private _handlers;
            tick(): void;
            once(delay: number, caller: any, method: AnyFunction, ...args: any[]): number;
            loop(delay: number, caller: any, method: AnyFunction, ...args: any[]): number;
            callLater(caller: any, method: AnyFunction, ...args: any[]): number;
            hasTimer(caller: any, method?: AnyFunction): boolean;
            hasTimer(index: number): boolean;
            /**
             * 清除指定Id的计时器
             * @param handler
             */
            remove(handler: number): any;
            /**
             * 清除指定执行域上的回调计时器
             * @param	caller 执行域(this)。
             * @param	method 定时器回调函数。
             */
            remove(caller: any, method: AnyFunction): any;
            removeAll(caller: any): void;
            clear(): void;
            /**
             * 立即执行一个延时回调，并且从等待队列中移除
             * @param	caller 执行域(this)。
             * @param	method 定时器回调函数。
             */
            run(caller: any, method: AnyFunction): any;
            /**
             * 立即执行一个延时回调，并且从等待队列中移除
             * @param	caller 执行域(this)。
             * @param	method 定时器回调函数。
             */
            run(handler: number): any;
            pause(): void;
            resume(): void;
            set scale(value: number);
            get elapsed(): number;
            get delta(): number;
            private getTimer;
            private getQueryFunction;
            private queryWithHandler;
            private queryWithCallerAndMethod;
            getRemindTime(handler: number): number;
            getRemindTime(caller: unknown, method: AnyFunction): number;
        }
    }

    export namespace decorators {
        type AnyFunction = Function;
        const CLASS_TAG = "__ctors__";
        function makeSmartClassDecorator<TArg>(decorate: <TFunction extends AnyFunction>(constructor: TFunction, arg?: TArg) => ReturnType<ClassDecorator>): ClassDecorator & ((arg?: TArg) => ClassDecorator);
        function makeEditorClassDecoratorFn<TValue>(propertyName: string): (value: TValue) => ClassDecorator;
        function makeSmartEditorClassDecorator<TValue>(propertyName: string, defaultValue: TValue): ClassDecorator & ((arg?: TValue | undefined) => ClassDecorator);
        const CACHE_KEY = "__tsClassCache__";
        function getClassCache(ctor: any, decoratorName?: any): any;
        function getSubDict<T, TKey extends keyof T>(obj: T, key: TKey): NonNullable<T[TKey]>;
        function isTsClass(constructor: any): constructor is TSClass;
        type TSClass = {
            __props__: string[];
        } & ExtendsConstructor;
        const serializable: PropertyDecorator;
        const tsclass: ((name?: string, isAbstract?: boolean) => ClassDecorator) & ClassDecorator;
    }

    export namespace deserialize {
        interface TSClassConstructor<T> extends EmptyConstructorClass<T> {
            __values__: string[];
            __deserialize__?: CompiledDeserializeFn;
        }

        type AnyFunction = Function;
        type CompiledDeserializeFn = (deserializer: _Deserializer, object: Record<string, unknown>, deserialized: Record<string, unknown>, constructor: AnyFunction) => void;
        type TypedArrayViewConstructorName = "Uint8Array" | "Int8Array" | "Uint16Array" | "Int16Array" | "Uint32Array" | "Int32Array" | "Float32Array" | "Float64Array";
        interface SerializedTypedArray {
            __id__: never;
            __uuid__: never;
            __type__: "TypedArray";
            array: number[];
            ctor: TypedArrayViewConstructorName;
        }

        interface SerializedTypedArrayRef {
            __id__: never;
            __uuid__: never;
            __type__: "TypedArrayRef";
            ctor: TypedArrayViewConstructorName;
            offset: number;
            length: number;
        }

        type SerializedGeneralTypedObject = {
            __id__: never;
            __uuid__: never;
            __type__?: NotKnownTypeTag;
        } & Record<NotTypeTag, SerializedFieldValue>;
        interface SerializedObjectReference {
            __type__: never;
            __uuid__: never;
            __id__: number;
        }

        interface SerializedUUIDReference {
            __type__: never;
            __id__: never;
            __uuid__: string;
            __expectedType__: string;
        }

        interface SerializedMap {
            __type__: "Map";
            keys: SerializedValue[];
            values: SerializedValue[];
        }

        interface SerializeSet {
            __type__: "Set";
            values: SerializedValue[];
        }

        type SerializedObject = SerializedTypedArray | SerializedTypedArrayRef | SerializedGeneralTypedObject | SerializedMap | SerializeSet;
        type SerializedValue = SerializedObject | SerializedValue[] | string | number | boolean | null;
        type SerializedFieldObjectValue = SerializedObjectReference | SerializedUUIDReference | unknown;
        type SerializedFieldValue = string | number | boolean | null | SerializedFieldObjectValue;
        type NotA<T, ReservedNames> = T extends ReservedNames ? never : T;
        type NotB<T, ReservedNames> = ReservedNames extends T ? never : T;
        type FooName<T, ReservedNames> = NotA<T, ReservedNames> & NotB<T, ReservedNames>;
        type NotTypeTag = FooName<string, "__type__">;
        type NotKnownTypeTag = FooName<string, "TypedArray" | "TypedArrayRef" | "Map" | "Set">;
        type SerializedData = SerializedObject | SerializedObject[];
        class DeserializerPool extends util.Pool<_Deserializer> {
            constructor();
        }

        class _Deserializer {
            static pool: DeserializerPool;
            result: Details;
            customEnv: unknown;
            deserializedList: Array<Record<PropertyKey, unknown> | undefined>;
            deserializedData: any;
            private _classFinder;
            private _reportMissingClass;
            private _onDereferenced;
            /**
             * @engineInternal
             */
            get ignoreEditorOnly(): unknown;
            private _ignoreEditorOnly;
            private _mainBinChunk;
            private _serializedData;
            constructor(result: Details, classFinder: ClassFinder, reportMissingClass: ReportMissingClass, customEnv: unknown, ignoreEditorOnly: unknown);
            reset(result: Details, classFinder: ClassFinder, reportMissingClass: ReportMissingClass, customEnv: unknown, ignoreEditorOnly: unknown): void;
            clear(): void;
            deserialize(serializedData: SerializedData): any;
            /**
             * @param serialized - The object to deserialize, must be non-nil.
             * @param globalIndex - If the object is deserialized from "root objects" array.
             * @param owner - Tracing purpose.
             * @param propName - Tracing purpose.
             */
            private _deserializeObject;
            private _deserializeTypedArrayView;
            private _deserializeTypedArrayViewRef;
            private _deserializeMap;
            private _deserializeSet;
            private _deserializeArray;
            private _deserializePlainObject;
            private _deserializeTypeTaggedObject;
            private _deserializeInto;
            private _runCustomizedDeserialize;
            private _deserializeFireClass;
            /**
             * @engineInternal
             */
            _deserializeAndAssignField(obj: Record<PropertyKey, unknown> | unknown[], serializedField: SerializedFieldObjectValue, propName: string): boolean;
            private _deserializeObjectField;
            /**
             * @engineInternal
             */
            _fillPlainObject(instance: Record<string, unknown>, serialized: Record<string, unknown>): void;
            /**
             * @engineInternal
             */
            _deserializeFastDefinedObject(instance: Record<PropertyKey, unknown>, serialized: SerializedGeneralTypedObject, klass: SerializableClassConstructor): void;
        }

        interface DeserializeDynamicOptions {
            classFinder?: ClassFinder;
            ignoreEditorOnly?: boolean;
            createAssetRefs?: boolean;
            customEnv?: unknown;
            reportMissingClass?: ReportMissingClass;
        }

        function deserializeDynamic(data: SerializedData, details: Details, options?: DeserializeDynamicOptions): any;
        function parseUuidDependenciesDynamic(serialized: unknown): string[];
        interface ICustomHandler {
            result: Details;
            customEnv: any;
        }

        interface IOptions extends Partial<ICustomHandler> {
            classFinder?: ClassFinder;
            reportMissingClass?: ReportMissingClass;
        }

        class Details {
            uuidObjList: any[];
            uuidPropList: string[];
            uuidList: string[];
            /**
             * @en
             * list of the depends assets' type
             * @zh
             * 依赖的资源类型列表
             */
            uuidTypeList: string[];
            static pool: util.Pool<Details>;
            // eslint-disable-next-line @typescript-eslint/ban-types
            assignAssetsBy: (getter: (uuid: string, options: {
                type: Constructor<unknown>;
                owner: Record<string, unknown>;
                prop: string;
            }) => unknown) => void;
            init(): void;
            /**
             * @method reset
             */
            reset(): void;
            /**
             * @method push
             * @param {Object} obj
             * @param {String} propName
             * @param {String} uuid
             */
            // eslint-disable-next-line @typescript-eslint/ban-types
            push(obj: object, propName: string, uuid: string, type?: string): void;
        }

        function deserialize(data: string | any, details?: Details, options?: IOptions & DeserializeDynamicOptions): unknown;
        type SerializableClassConstructor = new () => unknown;
        type ReportMissingClass = (id: string) => void;
        type ClassFinder = {
            (id: string, serialized: unknown, owner?: unknown[] | Record<PropertyKey, unknown>, propName?: string): SerializableClassConstructor | undefined;
            onDereferenced?: (deserializedList: Array<Record<PropertyKey, unknown> | undefined>, id: number, object: Record<string, unknown> | unknown[], propName: string) => void;
        };
    }

    export namespace serialize {
        interface IMissingClassReporter {
        }

        interface IMissingObjectReporter {
        }

        interface ICustomizedClass {
            serializeContent(): string;
            deserializeContent(content: string): void;
        }

        type BuiltinType = Map<unknown, unknown> | Set<unknown> | Date;
        interface IParserOptions {
            /**
             * 当遇到无效的数据时是否抛弃该数据，而不是抛出异常
             */
            discardInvalid?: boolean;
            /**
             * 当值为默认值时不序列化该属性
             */
            doNotStripDefault?: boolean;
            missingClassReporter?: IMissingClassReporter;
            missingObjectReporter?: IMissingObjectReporter;
        }

        interface IMapLike<K = unknown, V = unknown> {
            set(key: K, value: V): this;
            get(key: K): V | undefined;
            keys(): IterableIterator<K>;
            values(): IterableIterator<V>;
        }

        interface IBuilderOptions {
            /**
             * 是否将对象序列化为字符串
             */
            stringify?: boolean;
            /**
             * 是否压缩序列化后的字符串
             */
            minify?: boolean;
            /**
             * 是否强制内联，当序列化对象依赖外部对象时，开启该选项可以将外部对象序列化到当前对象中
             */
            forceInline?: boolean;
        }

        interface IPropertyOptions {
            formerlySerializedAs?: string;
            defaultValue?: any;
            expectedType?: string;
        }

        type PropertyOptions = IPropertyOptions | null;
        interface IArrayOptions extends IPropertyOptions {
            writeOnlyArray: any[];
        }

        interface IClassOptions extends IPropertyOptions {
            type: string;
            /**
             * 此类的实例永远只会被一个地方引用到。
             */
            uniquelyReferenced?: boolean;
        }

        interface ICustomClassOptions extends IClassOptions {
            content: any;
        }

        interface IObjParsingInfo {
        }

        abstract class Builder {
            private _stringify;
            private _minify;
            constructor(options: IBuilderOptions);
            setOptions(options: IBuilderOptions): void;
            /**
             * 写入一个基础属性 string|boolean|number|undefined|null
             * @param owner 父节点
             * @param ownerInfo 父节点的序列化信息
             * @param key 属性在父节点中的键
             * @param options 序列化参数
             */
            abstract writeRawProperty(owner: Object, ownerInfo: IObjParsingInfo | null, key: string | number, options: PropertyOptions | null): void;
            /**
             * 写入一个数组类型属性
             * @param owner 父节点
             * @param ownerInfo 父节点的序列化信息
             * @param key 性在父节点中的键
             * @param options 序列化参数
             */
            abstract writeArrayProperty(owner: Object, ownerInfo: IObjParsingInfo | null, key: string | number, options: IArrayOptions | null): IObjParsingInfo;
            /**
             * 写入一个字典类型属性
             */
            abstract writeDictProperty(owner: Object, ownerInfo: IObjParsingInfo | null, key: string | number, options: PropertyOptions | null): IObjParsingInfo;
            /** 写入一个使用装饰器tsclass标记过的类属性*/
            abstract writeClassProperty(owner: Object, ownerInfo: IObjParsingInfo | null, key: string | number, options: IClassOptions | null): IObjParsingInfo;
            /**写入一个引擎定义的数据类型属性 */
            abstract writeBuiltinProperty(owner: Object, ownerInfo: IObjParsingInfo | null, key: string | number, options: IClassOptions | null): IObjParsingInfo;
            /** 设置根节点对象 */
            abstract initialize(root: Object): void;
            protected abstract finalizeJsonPart(): any;
            dump(): object | string;
        }

        type IOption = IParserOptions & IBuilderOptions;
        class Parser {
            private _builder;
            private _doNotStripDefault;
            private _missingClassReporter;
            private _missingObjectReporter;
            constructor(builder: Builder, options: IParserOptions);
            initialize(builder: Builder, options: IParserOptions): void;
            parse(object: object): void;
            private parseField;
            private parseTypeValueField;
            private parseArrayField;
            private parseMapField;
            private parseSetField;
            private parseTSClassField;
            private parseObjectField;
            private enumerateClass;
            private getPropertyDefaultValue;
        }

        function serialize(target: Object, options: IOption): string | object;
    }
}
