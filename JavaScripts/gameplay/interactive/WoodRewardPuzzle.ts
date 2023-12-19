import AudioController from "../../controller/audio/AudioController";
import { Puzzle } from "./Puzzle";


@mw.Component
export default class WoodRewardPuzzle extends Puzzle {


    @Puzzle.required
    private _progress: number = undefined;


    @mw.Property({ displayName: "播放的特效" })
    public effectId: string = '89589';

    @mw.Property({ displayName: "龙娘初始位置" })
    public dragonInitializeLocation: mw.Vector = new mw.Vector(0, 0, -90);

    @mw.Property({ displayName: "龙娘初始位置" })
    public dragonShowUpLocation: mw.Vector = new mw.Vector(0, 0, 90);

    @mw.Property({ displayName: "奖励龙娘的guid" })
    public dragonGuid: string = "076C6B69";


    @mw.Property({ displayName: "奖励龙娘出来后播放的动作" })
    public animationId: string = "8352";

    private _isOpened: boolean = false;


    private _trigger: mw.Trigger;

    public onPlayerGetReward: mw.Action = new mw.Action();

    private _effect: mw.GameObject;
    private _collision: mw.GameObject;

    private _character: mw.Character;

    public setup(lockState: boolean, isOpened: boolean, progress: number): void {
        super.setup(lockState);
        this._progress = progress;
        this._isOpened = isOpened;
        this._progress = progress;
        this.onStart();
    }

    public set progress(value: number) {
        if (value === this._progress) {
            return;
        }
        this._progress = value;
    }

    public get progress() {
        return this._progress;
    }

    protected async onInitialize() {
        super.onInitialize();
        this._trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;
        this._trigger.onEnter.add((value) => {

            this.onTriggerIn(value);
        })
        this._effect = this.lockPart.getChildByName("effect")
        this._collision = this.lockPart.getChildByName("collision")
        this._character = await mw.GameObject.asyncFindGameObjectById(this.dragonGuid) as mw.Character
        this._character.setVisibility(mw.PropertyStatus.Off);
        this._character.setCollision(mw.CollisionStatus.Off);
        this._character.worldTransform.position = this.gameObject.worldTransform.transformPosition(this.dragonInitializeLocation);
        this._character.complexMovementEnabled = false;
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

    protected onLocked(): void {
        super.onLocked();
        (this._collision as mw.Model).setCollision(mw.CollisionStatus.On);
    }

    protected onUnlocked(): void {
        super.onUnlocked();
        (this._collision as mw.Model).setCollision(mw.CollisionStatus.Off);
    }


    private doGetAnimation() {






        // 旋转
        actions.tween(this._effect.worldTransform)
            .call(() => {
                this._effect.setVisibility(mw.PropertyStatus.On)
            })
            .to(700, { scale: new mw.Vector(3, 1, 1) })
            .call(() => {
                this.createDragonThenFlyToPlayer();
            })
            .to(700, { scale: new mw.Vector(0, 1, 1) })
            .call((value) => {
                this._effect.setVisibility(mw.PropertyStatus.FromParent)
            })
            .start();

    }


    private createDragonThenFlyToPlayer() {
        this._character.setVisibility(mw.PropertyStatus.On);
        this._character.setCollision(mw.CollisionStatus.On);

        let dragonInitializeLocation = this.gameObject.worldTransform.transformPosition(this.dragonInitializeLocation);
        let dragonShowUpLocation = this.gameObject.worldTransform.transformPosition(this.dragonShowUpLocation);
        this._character.worldTransform.position = dragonInitializeLocation;
        // 播放特效
        mw.EffectService.playAtPosition(this.effectId, this.gameObject.worldTransform.position);

        actions.tween(this._character.localTransform).to(500, {
            position: dragonShowUpLocation
        }, {
            onUpdate: () => {
                this._character.lookAt(mw.Player.localPlayer.character.worldTransform.position);

            }
        }).call(() => {
            this._character.loadAnimation(this.animationId).play()
        }).start();

    }



    public set isOpened(value: boolean) {
        if (value === this._isOpened) {
            return;
        }
        this._isOpened = value;

        if (this._isOpened) {
            AudioController.getInstance().play(7, this.gameObject);
        }

    }


    public get isOpened() {
        return this._isOpened;
    }





}