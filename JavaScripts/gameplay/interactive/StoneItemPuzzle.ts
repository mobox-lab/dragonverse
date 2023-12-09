import { KeyItemPuzzle } from "./KeyItemPuzzel";







const tempOffset = mw.Vector.zero;

const StoneItemAnimationTag = 'StoneItemAnimationTag';

/**
 * 
 */
@mw.Component
export default class StoneItemPuzzle extends KeyItemPuzzle {



    private _ball: mw.IntegratedMover;

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
        this._ball = this.unLockPart.getChildByName("ball") as mw.IntegratedMover;
        this._light = this.unLockPart.getChildByName("light");
        this.afterInitialize();
    }


    protected onPutInSomeGameObject(keyItem: mw.GameObject, isAccepted: boolean): void {

        const end = keyItem.worldTransform.position.clone()
        end.z -= 150;

        let tween = actions.tween(keyItem.worldTransform).to(500, {
            position: end
        }).setTag(StoneItemAnimationTag)

        if (isAccepted) {

            tween.start();

        } else {



        }
    }


    protected onPostLockStatusChanged() {

        this._ball.localTransform.position = this.lockBallPos;
        this._light.localTransform.position = this.lockLightPos;
        actions.tween(this._ball.localTransform)
            .delay(800)
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
        this._ball.enable = true;

    }


    protected onLocked(): void {
        super.onLocked();
        this.clearAnimation();

        let localTransform = this._ball.localTransform;
        localTransform.position = this.lockBallPos;
        localTransform = this._light.localTransform;
        localTransform.position = this.lockLightPos
        this._ball.enable = false;


    }



    private clearAnimation() {

        actions.tweens.stopAllByTag(StoneItemAnimationTag);
    }













}

