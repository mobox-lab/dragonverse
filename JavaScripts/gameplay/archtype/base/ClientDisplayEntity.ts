import { IClientDisplayHosted } from "./IClientHosted";
import { IState } from "./IState";
import { InitializeCheckerScript } from "./InitializeCheckScript";





export default abstract class ClientDisplayEntity<T extends IState> extends InitializeCheckerScript {

    /**
     * 初始化成功的外部条件
     */
    private _extraCondition: boolean = false;

    public set extraCondition(value: boolean) {
        this._extraCondition = value;
        this.onStart();
    }

    public get extraCondition() {
        return this._extraCondition;
    }

    private _hosted: IClientDisplayHosted<T>;

    private _cacheState: T;

    protected get state(): T {
        return this._cacheState;
    }



    protected onStart(): void {
        if (!this.extraCondition) {
            return;
        }

        super.onStart();
    }

    protected onInitialize(): void {
        this.onLogicStateSynced(this._hosted.state);
    }


    public setHosted(value: IClientDisplayHosted<T>) {
        if (this._hosted) {
            this._hosted.onLogicStateSynced.remove(this.onLogicStateSynced, this);
        }
        this._hosted = value;

        if (value) {
            this._hosted.onLogicStateSynced.add(this.onLogicStateSynced, this);
            let state = this._hosted.state;
            if (!state) {
                return;
            }
            this._cacheState = this.onLogicStateSynced(state);
        }
    }




    protected isDisplayForLocal() {
        return this._hosted.isLocalPlayer();
    }


    protected setLogicState(state: T): void {
        this._hosted.changeLogicState(state);
    }


    private onLogicStateSynced(state: T) {


        if (!this.isInitializeComplete) {
            return;
        }
        if (this._cacheState && this._cacheState.equal(state)) {
            return;
        }

        let ret = this.preLogicStateChange(this._cacheState, state)
        this.postLogicStateChange(state);
        return ret;
    }

    protected abstract preLogicStateChange(old: T, newEst: T): T;

    protected abstract postLogicStateChange(state: T): void;



    public onDestroy(): void {
        this._hosted = null;
        this._cacheState = null;
        super.onDestroy();
    }
}