import { Puzzle } from "./Puzzle";


@mw.Component
export default class WoodRewardPuzzle extends Puzzle {


    @Puzzle.required
    private _progress: number = undefined;


    @mw.Property({ displayName: "播放的特效" })
    public effectId: string = '89589';

    private _isOpened: boolean = false;


    private _trigger: mw.Trigger;

    public onPlayerGetReward: mw.Action = new mw.Action();

    private _effect: mw.GameObject;

    public setup(lockState: boolean, isOpened: boolean): void {
        super.setup(lockState);
        this._isOpened = isOpened;
    }

    protected onInitialize(): void {
        super.onInitialize();
        this._trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;
        this._trigger.onEnter.add((value) => {

            this.onTriggerIn(value);
        })
        this._effect = this.lockPart.getChildByName("")
    }


    private onTriggerIn(value: mw.GameObject) {

        if (!this.locked || !this._isOpened) {
            return;
        }
        if (!(value instanceof mw.Character)) {
            return;
        }

        this.onPlayerGetReward.call();

        this.doGetAnimation();
    }


    private doGetAnimation() {



        // 播放特效
        mw.EffectService.playAtPosition(this.effectId, this.gameObject.worldTransform.position);

        // 旋转
        actions.tween(this._effect.worldTransform)
            .to(700, { scale: new mw.Vector(3, 1, 1) })
            .to(700, { scale: new mw.Vector(0, 1, 1) })
            .call((value) => {
                this.createDragonThenFlyToPlayer();
            })
            .start();

    }


    private createDragonThenFlyToPlayer() {

    }



    public set isOpened(value: boolean) {
        if (value === this._isOpened) {
            return;
        }
        this._isOpened = value;


    }


    public get isOpened() {
        return this._isOpened;
    }





}