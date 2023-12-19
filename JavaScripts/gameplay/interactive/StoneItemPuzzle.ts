import { KeyItemPuzzle } from "./KeyItemPuzzel";







const tempOffset = mw.Vector.zero;

const StoneItemAnimationTag = 'StoneItemAnimationTag';

/**
 * 
 */
@mw.Component
export default class StoneItemPuzzle extends KeyItemPuzzle {



    private _mover: mw.IntegratedMover;

    private _ball: mw.GameObject;

    private _light: mw.GameObject;



    @mw.Property({ displayName: "解锁后球的浮动运动量" })
    private offset: mw.Vector = new mw.Vector(0, 0, 20);

    @mw.Property({ displayName: "解锁前球的位置" })
    private lockBallPos: mw.Vector = new mw.Vector(0, 0, -89);

    @mw.Property({ displayName: "解锁后球的位置" })
    private animateBallPos: mw.Vector = new mw.Vector(0, 0, 150);

    @mw.Property({ displayName: "解锁后球的位置" })
    private unlockBallPos: mw.Vector = new mw.Vector(0, 0, 215);


    @mw.Property({ displayName: "解锁前光效的位置" })
    private lockLightPos: mw.Vector = new mw.Vector(0, 0, -405);

    @mw.Property({ displayName: "解锁后光效的位置" })
    private unlockLightPos: mw.Vector = new mw.Vector(0, 0, -10);





    protected onInitialize(): void {
        super.onInitialize();
        this._ball = this.unLockPart.getChildByName("ball");
        this._mover = this._ball.getChildByName("mover") as mw.IntegratedMover
        this._light = this.unLockPart.getChildByName("light");
    }


    protected onPutInSomeGameObject(keyItem: mw.GameObject, isAccepted: boolean): void {


        if (isAccepted) {

            this._ball.setVisibility(mw.PropertyStatus.On);
            this._ball.localTransform.position = this.unlockBallPos;
            const end = this._ball.localTransform.position;
            end.z -= 450;

            actions.tween(this._ball.localTransform).to(500, {
                position: end
            },).setTag("putan")
                .start();
        } else {




        }
    }


    protected onPostLockStatusChanged() {

        this._light.localTransform.position = this.lockLightPos;
        actions.tween(this._ball.localTransform)
            .delay(800)
            .call(() => {
                actions.tweens.stopAllByTag('putan');

                this._ball.localTransform.position = this.lockBallPos;

            })
            .to(1000, { position: this.animateBallPos })
            .to(500, { position: this.unlockBallPos })
            .setTag(StoneItemAnimationTag)
            .call(this.onLockStatusChanged, this)
            .start();

        actions.tween(this._light.localTransform)
            .delay(800)
            .to(1000, { position: this.unlockLightPos })
            .setTag(StoneItemAnimationTag)
            .start();


    }







    protected onUnlocked(): void {
        super.onUnlocked();
        this.clearAnimation();

        let localTransform = this._ball.localTransform;
        localTransform.position = this.unlockBallPos;
        localTransform = this._light.localTransform;
        localTransform.position = this.unlockLightPos;
        this._mover.enable = true;

    }


    protected onLocked(): void {
        super.onLocked();
        this.clearAnimation();

        let localTransform = this._ball.localTransform;
        localTransform.position = this.lockBallPos;
        localTransform = this._light.localTransform;
        localTransform.position = this.lockLightPos
        this._mover.enable = false;



    }



    private clearAnimation() {

        actions.tweens.stopAllByTag(StoneItemAnimationTag);
    }













}

