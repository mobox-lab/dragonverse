import { EventDefine } from "../../const/EventDefine";
import { PickableItem } from "./PickableItem";

export interface IPickerController extends mw.Script {

    onPressedInteractive: mw.Action;


    pickType: number[];

    pick(item: PickableItem): Promise<boolean>



}


@mw.Component
export default class PickerController extends mw.Script implements IPickerController {

    /**可以拾起的物品类型 */
    pickType: number[];

    /**
     * 当重复拾取物品时，自动放下之前的
     */
    public autoPutdown: boolean = true;

    onPressedInteractive: mw.Action1<PickerController> = new mw.Action1();

    private _currentPickupItem: PickableItem;

    protected onStart(): void {
        mw.Event.addLocalListener(EventDefine.PlayerPressedInterActive, this.onPlayerPressedInterActive);
    }


    private onPlayerPressedInterActive = () => {
        if (this._currentPickupItem) {
            this.putdown();
            return;
        }
        this.onPressedInteractive.call(this)
    }

    async pick(item: PickableItem) {

        if (this._currentPickupItem) {

            if (this.autoPutdown) {

                let ret = await this.putdown();
                if (!ret) {
                    return false
                }

            } else {

                return false;
            }
        }

        this._currentPickupItem = item;
        item.onDestroyed.add(this.onCurPickItemDestroyed, this)
        return true;
    }


    public async putdown() {
        if (this._currentPickupItem) {

            this._currentPickupItem.putdown();
            this._currentPickupItem.onDestroyed.remove(this.onCurPickItemDestroyed, this);
        }

        this._currentPickupItem = null;
        return true;
    }


    private onCurPickItemDestroyed() {
        this._currentPickupItem = null;
    }

}