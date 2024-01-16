import { Singleton } from "../depend/singleton/Singleton";


export class KeyboardManager extends Singleton<KeyboardManager>() {



    public onKeyDown: mw.Action1<mw.Keys> = new mw.Action1<mw.Keys>();

    public onKeyUp: mw.Action1<mw.Keys> = new mw.Action1<mw.Keys>();



    private _keyboardsEvent: Map<string, [EventListener, EventListener]> = new Map();

    private _keyboardsState: Map<string, boolean> = new Map<string, boolean>();



    protected onConstruct(): void {

        let keys = Object.keys(mw.Keys);

        for (const key of keys) {

            const value = mw.Keys[key];
            let event1 = mw.InputUtil.onKeyDown(value, () => {
                this._keyboardsState.set(key, true);
                this.onKeyDown.call(value as mw.Keys);
            });

            let event2 = mw.InputUtil.onKeyUp(value, () => {
                this._keyboardsState.set(key, false);
                this.onKeyUp.call(value as mw.Keys);
            })

            this._keyboardsEvent.set(key, [event1, event2])
        }



    }


    public isKewDown(key: string): boolean {

        return !!this._keyboardsState.get(key);
    }













}