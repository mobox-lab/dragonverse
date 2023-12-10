import GToolkit from "../../util/GToolkit";
import { PickableItem } from "./PickableItem";
import { Puzzle } from "./Puzzle";



export interface KeyItem {

    type: number




}

export abstract class KeyItemPuzzle extends Puzzle {


    private _storageInfo: KeyItem[] = [];

    @mw.Property({ displayName: "允许存储的类型" })
    public allowStorageType: number[] = [0];

    @mw.Property({ displayName: "需要放置的数量" })
    public requiredPutNum: number = 0;



    public onStorageProgressUpdate: mw.Action1<KeyItemPuzzle> = new mw.Action1()

    private trigger: mw.Trigger;



    protected onInitialize(): void {
        super.onInitialize();
        this.trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;

        this.trigger.onEnter.add((enter) => {
            this.onTriggerEnter(enter);
        })

        this.onStorageNumUpdate();
    }

    protected afterInitialize(): void {
        super.afterInitialize();
        this.onStorageNumUpdate();
    }

    protected onDestroy(): void {
        super.onDestroy();
        this.onStorageProgressUpdate.clear();
    }


    private onTriggerEnter(enter: mw.GameObject) {

        if (!enter) {
            return;
        }
        let storageItem: PickableItem = GToolkit.getComponent(PickableItem, enter);

        if (!storageItem) {
            this.onPutInSomeGameObject(enter, false)
            return;
        }

        if (!this.locked) {
            this.onPutInSomeGameObject(enter, false)
            return;
        }


        if (this.allowStorageType.indexOf(storageItem.type) < 0) {

            return;
        }

        if (!this.checkExtraPutInCondition(storageItem)) {
            return
        }



        // 可以存储
        let storageInfo = this._storageInfo;
        storageItem.storage = this.guid;
        storageInfo.push({
            type: storageItem.type,
        })
        this.onPutInSomeGameObject(enter, true);
    }

    protected checkExtraPutInCondition(keyItem: KeyItem): boolean {
        return true;
    }


    protected onPutInSomeGameObject(keyItem: mw.GameObject, isAccepted: boolean) {

    }



    onReplicated(path, value, oldVal) {
        if (/persistence/.test(path)) {
            this.onStorageNumUpdate();
        }
    }

    private onStorageNumUpdate() {
        if (!this.locked) {
            return;
        }

        if (this.requiredPutNum <= this._storageInfo.length) {

            this.locked = false;
        } else {
            this.locked = true;
        }
        this.onStorageProgressUpdate.call(this);
    }

}

