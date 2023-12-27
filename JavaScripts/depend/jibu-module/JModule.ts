import SubData = mwext.Subdata;
import ModuleClient = mwext.ModuleC;
import ModuleServer = mwext.ModuleS;
import { Delegate } from "../delegate/Delegate";
import SimpleDelegate = Delegate.SimpleDelegate;
import Log4Ts from "../log4ts/Log4Ts";
import SimpleDelegateFunction = Delegate.SimpleDelegateFunction;
import { NoOverride } from "../../util/GToolkit";

/**
 * Jibu Module
 * @desc 提供 Ready 回调与其他注入功能的 Module.
 */
export abstract class JModuleC<S, D extends SubData> extends ModuleClient<S, D> {
    private _isReady: boolean = false;

    private _onReady: SimpleDelegate<void> = new SimpleDelegate<void>();

    public get isReady(): boolean {
        return this._isReady;
    }

    /**
     * 你不应重写此方法.
     * @desc 当需要 覆写 onStart 时 请覆写 {@link JModuleC.onJStart}.
     * @protected
     */
    protected onStart(): NoOverride {
        super.onStart();
        this.onJStart();
        this._isReady = true;
        this._onReady.invoke();
        return;
    }

    /**
     * 注入后 生命周期方法 创建模块时调用.
     * @desc 当需要 覆写 onStart 时 请覆写 {@link JModuleC.onJStart}.
     * @protected
     */
    protected onJStart(): void {
    }

    /**
     * ready 委托.
     * @desc 非 ready 时等待 ready 委托调用.
     * @desc ready 时立即调用.
     * @param callback
     */
    public delegateOnReady(callback: SimpleDelegateFunction<void>) {
        if (this._isReady) {
            try {
                callback();
            } catch (e) {
                Log4Ts.error(JModuleC, e);
            }
        } else {
            this._onReady.once(callback);
        }
    }
}

export abstract class JModuleS<C, D extends SubData> extends ModuleServer<C, D> {
}

