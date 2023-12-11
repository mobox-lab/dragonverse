import { PickableItem } from "./PickableItem";




@mw.Component
export default class Stone extends PickableItem {





    @mw.Property({ displayName: "持有姿态id" })
    private stanceId: string = ''

    @mw.Property({ displayName: "动画插槽" })

    private animSlot: mw.AnimSlot = mw.AnimSlot.Upper;


    @mw.Property({ displayName: "是否是姿态" })
    private isStance: boolean = true

    @mw.Property({ displayName: "被拾起后的插槽位置", enumType: mw.HumanoidSlotType })
    private slotName: mw.HumanoidSlotType = mw.HumanoidSlotType.Head;

    @mw.Property({ displayName: "被拾起后的插槽偏移" })
    private slotOffset: mw.Vector = new mw.Vector();


    private _stance: mw.Stance | mw.Animation;

    private delayCheckId: number = 0;




    protected onInitialize(): void {


        super.onInitialize();

        this.resetGameObject();
    }





    protected onBeenPicked(): void {
        this.clearDelayCheck();
        let gameObject: mw.GameObject = (this.holder).gameObject;
        if (!(gameObject instanceof mw.Character)) {
            return;
        }

        if (!this._stance) {
            this._stance = this.isStance ? gameObject.loadStance(this.stanceId) : gameObject.loadAnimation(this.stanceId);
        }
        if (this._stance instanceof mw.Animation) {

            this._stance.slot = this.animSlot;
            (this._stance as mw.Animation).loop = 0;
        }
        this._stance.play();

        gameObject.attachToSlot(this.gameObject, this.slotName);

        (this.gameObject as mw.Model).setCollision(mw.CollisionStatus.QueryOnly);
        this.gameObject.localTransform.position = this.slotOffset;
    }

    protected onBeenLand(): void {

        this.clearDelayCheck();
        this.clearStance();

        if (this.storage) {

            this.onBeenPutInStorage.call(this);
            return;
        }

        this.delayCheckId = TimeUtil.delayExecute(() => {

            if (!this.storage) {

                this.resetGameObject();
            }

        }, 1000)
    }

    private clearDelayCheck() {
        if (this.delayCheckId) {
            TimeUtil.clearDelayExecute(this.delayCheckId);
            this.delayCheckId = 0;

        }
    }




    private clearStance() {
        if (this._stance) {
            this._stance.stop();
        }
    }




    protected onDestroy(): void {
        super.onDestroy();
        this.clearStance();
        this.clearDelayCheck();
        this.onBeenPutInStorage.clear();
    }






}