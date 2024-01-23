import { Singleton } from "../depend/singleton/Singleton";

export class TimeManager extends Singleton<TimeManager>() {

    private _preRequestServerTime = 0;

    private _timeDiff: number = 0;

    protected onConstruct(): void {

        if (SystemUtil.isClient()) {

            mw.Event.addServerListener("onSyncServerTime", (time: number) => {

                let curClientTime = Date.now()
                let networkDelay = curClientTime - this._preRequestServerTime
                let curServerTime = time - (networkDelay >> 1);
                this._timeDiff = curServerTime - curClientTime;
            })




            this.startSyncServerTime();
        }


        if (SystemUtil.isServer()) {
            mw.Event.addClientListener("onRequestServerTime", (player: mw.Player) => {

                mw.Event.dispatchToClient(player, 'onSyncServerTime', Date.now());
            })
        }
    }

    private startSyncServerTime() {
        this._preRequestServerTime = Date.now();
        mw.Event.dispatchToServer("onRequestServerTime");
    }



    get currentTime() {
        return Date.now() + this._timeDiff;
    }


}