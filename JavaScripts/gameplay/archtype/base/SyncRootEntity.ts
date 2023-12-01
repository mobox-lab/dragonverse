import ClientDisplayEntity from "./ClientDisplayEntity";
import { IState } from "./IState";
import { InitializeCheckerScript } from "./InitializeCheckScript";





export abstract class SyncRootEntity<T extends IState> extends InitializeCheckerScript {

    @SyncRootEntity.required
    public playerId: number;

    @SyncRootEntity.required
    public displayGuid: string;

    @SyncRootEntity.required
    public sign: string;


    @mw.Property({ replicated: true, onChanged: 'onLogicStateChanged' })
    private _logicState: T = null;

    protected displayObject: mw.GameObject;

    /**
     * 状态改变被同步
     */
    onLogicStateSynced: mw.Action1<T> = new mw.Action1();


    get state(): T {
        return this._logicState
    }


    protected async onInitialize(): Promise<void> {

        if (mw.SystemUtil.isClient()) {
            this.displayObject = await mw.GameObject.asyncSpawn(this.displayGuid);
            let scripts = this.displayObject.getScripts();
            for (const script of scripts) {
                if (script instanceof ClientDisplayEntity) {
                    script.setHosted(this);
                    script.extraCondition = true;
                    break;
                }
            }
        }
    }

    public isLocalPlayer(): boolean {

        return this.playerId === mw.Player.localPlayer.playerId;
    }


    /**
     * 客户端申请改变逻辑状态
     * @param state 
     */
    changeLogicState(state: T): void {

        this.serverChangeLogicState(state);
    }


    @mw.RemoteFunction(mw.Server)
    private serverChangeLogicState(state: T): void {

        this._logicState = state;
    }


    private onLogicStateChanged(state: T): void {

        this.onLogicStateSynced.call(this.state);
    }

    protected onDestroy(): void {
        if (this.displayObject) {

            // 主控被销毁了，那么他也要销毁
            this.displayObject.destroy();
        }
        this.onLogicStateSynced.clear();
    }
}