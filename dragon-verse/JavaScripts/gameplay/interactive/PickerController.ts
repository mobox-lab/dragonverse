/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-10 14:01:19
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-11 15:11:45
 * @FilePath: \DragonVerse\JavaScripts\gameplay\interactive\PickerController.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EventDefine } from "../../const/EventDefine";
import { PickableItem } from "./PickableItem";

export interface IPickerController extends mw.Script {

    onPressedInteractive: mw.Action;

    canPick: boolean

    pickType: number[];

    pick(item: PickableItem): Promise<boolean>

    putdown();



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


    get canPick(): boolean {
        return !this._currentPickupItem;
    }

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