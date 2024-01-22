import { IClientDisplayHosted } from "./IClientHosted";
import { IState } from "./IState";
import { InitializeCheckerScript } from "./InitializeCheckScript";





export default abstract class ClientDisplayEntity<T extends IState> extends InitializeCheckerScript {




    @ClientDisplayEntity.required
    private _hosted: IClientDisplayHosted<T>;

    protected get state(): T {
        return this._hosted.state
    }



    protected onStart(): void {
        mwext.ModuleService.ready().then((value) => {
            super.onStart();
        })
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
            this.onLogicStateSynced(state);
        }
    }




    protected isDisplayForLocal() {
        if (!this._hosted) {
            return false;
        }
        return this._hosted.isLocalPlayer();
    }





    private onLogicStateSynced(state: T) {


        if (!this.isInitializeComplete) {
            return;
        }


        let ret = this.preLogicStateChange(state, state)
        this.postLogicStateChange(state);
        return ret;
    }

    protected abstract preLogicStateChange(old: T, newEst: T): T;

    protected abstract postLogicStateChange(state: T): void;



    public onDestroy(): void {
        this._hosted = null;
        super.onDestroy();
    }
}