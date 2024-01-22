import { Puzzle } from "../interactive/Puzzle";
import GToolkit from "../../util/GToolkit";
import { Delegate } from "../../depend/delegate/Delegate";
import SimpleDelegate = Delegate.SimpleDelegate;
import { GameConfig } from "../../config/GameConfig";
import { QuestStateEnum } from "../../module/quest/Config";
import AudioController from "../../controller/audio/AudioController";

/**
 * 火龙任务 奖励谜题.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author minjia.zhang
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
@mw.Component
export default class FireRewardPuzzle extends Puzzle {
    @mw.Property({displayName: "播放的特效"})
    public effectId: string = "14329";

    @mw.Property({displayName: "是否 相对坐标", tooltip: "偏移将基于根节点."})
    public isEffectPlayerLocationRelative: boolean = true;

    @mw.Property({displayName: "特效位置", tooltip: "若使用相对坐标 坐标偏移将基于根节点."})
    public effectPlayerLocation: Vector = Vector.zero;

    @mw.Property({displayName: "特效缩放"})
    public effectScale: Vector = Vector.one;

    private _unlockSoundId: number;

    private _isOpened: boolean = false;

    private _trigger: mw.Trigger;

    public onPlayerGetReward: SimpleDelegate<void> = new SimpleDelegate();

    private _collision: mw.GameObject;

    private _lights: Effect[] = [];

    public setup(lockState: boolean, isOpened: boolean): void {
        super.setup(lockState);
        this._isOpened = isOpened;
        this.onStart();
    }

    public initSound(unlockSoundId: number) {
        this._unlockSoundId = unlockSoundId;
    }

    public get isOpened() {
        return this._isOpened;
    }

    public set isOpened(value: boolean) {
        if (value === this._isOpened) return;

        this._isOpened = value;
    }

    protected onInitialize(): void {
        super.onInitialize();
        this._trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;
        this._trigger.onEnter.add((value) => {
            this.onGameObjectEnter(value);
        });
        this._collision = this.lockPart.getChildByName("collision");

        this._lights.push(this.lockPart.getChildByName("light") as Effect);
        this._lights.push(this.lockPart.getChildByName("light2") as Effect);
        this._lights.push(this.lockPart.getChildByName("light3") as Effect);
        this._lights.push(this.lockPart.getChildByName("light4") as Effect);
        this._lights.push(this.lockPart.getChildByName("light5") as Effect);
    }

    private onGameObjectEnter(value: mw.GameObject) {
        if (!GToolkit.isCharacter(value)) return;
        if (!this.locked || !this._isOpened) return;

        this.onPlayerGetReward.invoke();

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
        AudioController.getInstance().play(this._unlockSoundId, this.gameObject.worldTransform.position);
        mw.EffectService.playAtPosition(this.effectId,
            this.isEffectPlayerLocationRelative ?
                this.gameObject.worldTransform.position.clone().add(this.effectPlayerLocation) :
                this.effectPlayerLocation,
            {
                scale: this.effectScale,
            });
    }

    public updateProgress(taskId: number, progress: number) {
        this.isOpened = progress >= GameConfig.Task.getElement(taskId).count - 1;

        for (let i = 0; i < progress && i < this._lights.length; ++i) {
            this._lights[i].play();
        }
    }
}