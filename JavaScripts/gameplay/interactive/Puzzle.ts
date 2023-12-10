import { Persistence } from "./Persistence";



export abstract class Puzzle extends Persistence {


    @mw.Property({ replicated: true, onChanged: 'onLockStatusChanged', hideInEditor: true, defaultValue: undefined })
    private _isLocked: boolean = undefined;

    protected lockPart: mw.GameObject;

    protected unLockPart: mw.GameObject;

    private _cacheLockStatus: boolean;

    setup(lockState: boolean, ...args: any[]) {
        this._isLocked = lockState;
        this._cacheLockStatus = lockState;
    }


    set locked(value: boolean) {
        if (value === this._isLocked) {
            return;
        }
        this._cacheLockStatus = this._cacheLockStatus === undefined ? value : this._isLocked;
        this._isLocked = value;
        if (this.isInitializeComplete) {
            this.onLockStatusChanged();
        }
    }


    get locked() {
        return this._isLocked;
    }

    protected onInitialize(): void {


        this.lockPart = this.gameObject.getChildByName("locked");
        this.unLockPart = this.gameObject.getChildByName("unlock");
    }

    protected afterInitialize() {
        this.onLockStatusChanged();
    }



    protected async onLockStatusChanged() {

        if (this._isLocked) {
            this.onLocked();
        } else {
            this.onUnlocked();
        }

        if (this._cacheLockStatus !== this._isLocked) {

            this.onPostLockStatusChanged();
        }
        this._cacheLockStatus = this._isLocked;

    }


    protected onUnlocked() {

        this.lockPart.setVisibility(mw.PropertyStatus.Off, true);
        this.unLockPart.setVisibility(mw.PropertyStatus.On, true);

    }


    protected onLocked() {

        this.lockPart.setVisibility(mw.PropertyStatus.On, true);
        this.unLockPart.setVisibility(mw.PropertyStatus.Off, true);

    }



    protected onPostLockStatusChanged() {

    }


}