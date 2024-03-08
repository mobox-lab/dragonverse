
import { PlayerManagerExtension } from "../../Modified027Editor/ModifiedPlayer";
import { Animator } from "./Animator";

export async function MeshLoadAnimator(char: mw.Character, animationGuid: string, isSync: boolean = true) {
    let animator = MeshAnimator.getAnimator(char);
    let animationData: mw.Animation = PlayerManagerExtension.loadAnimationExtesion(char, animationGuid, isSync)
    await animator.setAnimationData(animationData);
    return animator;
}

export class MeshAnimator extends Animator implements mw.Animator.MeshAnimator {

    static characterAnimatorMap: Map<string, MeshAnimator> = new Map();

    static getAnimator(character: mw.Character): MeshAnimator {
        if (!this.characterAnimatorMap.has(character.gameObjectId)) {
            this.characterAnimatorMap.set(character.gameObjectId, new MeshAnimator(character));
        }
        return this.characterAnimatorMap.get(character.gameObjectId);
    }

    // static {
    //     Object.defineProperty(mw.Character.prototype, "loadAnimator", {
    //         value: 
    //     })
    // }

    private _currentMontage: UE.AnimMontage;

    private _animationInstance: UE.AnimInstance;

    private _animationData: mw.Animation;

    private _lastIntervalId: number;

    private _isPlaying: boolean;

    get position() {
        if (!this._currentMontage) {
            return 0;
        }
        return this._animationInstance.Montage_GetPosition(this._currentMontage);
    }

    set position(value: number) {
        if (!this._currentMontage) {
            return;
        }
        if (!this.isPlaying) {
            this.internalPlayAnimation();
        }
        this._animationInstance.Montage_SetPosition(this._currentMontage, value);
    }

    set loopTime(value: number) {
        if (!this._animationData) {
            return;
        }
        this._animationData.loop = value;
        this.isPlaying && this.internalPlayAnimation();
    }

    get loopTime() {
        if (!this._animationData) {
            return 0;
        }
        return this._animationData.loop;
    }

    set slot(value: mw.AnimSlot) {
        if (!this._animationData) {
            return;
        }
        this._animationData.slot = value;
        this.isPlaying && this.internalPlayAnimation();
    }

    get slot() {
        return this._animationData.slot;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    get length() {
        return this._animationData.length;
    }

    get speed() {
        return this._animationInstance.Montage_GetPlayRate(this._currentMontage);
    }

    set speed(value: number) {
        this._animationInstance.Montage_SetPlayRate(this._currentMontage, value);
    }

    public async setAnimationData(value: mw.Animation, customNotified?: mw.Animator.AnimationEventArgs[]) {

        if (!this._lastIntervalId !== undefined) {
            clearInterval(this._lastIntervalId);
            this._lastIntervalId = undefined;
        }

        this._animationData = value;
        this._animationData.play();
        this.setRegisteredEvent(customNotified);
        return new Promise<void>((resolve) => {
            this._lastIntervalId = setInterval(() => {
                this._currentMontage = this._animationInstance.GetCurrentActiveMontage();
                if (this._currentMontage) {
                    this._animationData.stop();
                    clearInterval(this._lastIntervalId);
                    this._lastIntervalId = undefined;
                    resolve();
                }
            }, 1)
        })
    }

    constructor(private _character: mw.Character) {
        super();
        let mesh: UE.SkeletalMeshComponent = this._character['actor'].Mesh;
        this._animationInstance = mesh.GetAnimInstance();
        this._character.onDestroyDelegate.add(this.onOwnerDestroy)
    }

    play() {
        this.internalPlayAnimation();
    }

    stop() {
        if (!this.isPlaying) {
            return false;
        }
        this._animationInstance.Montage_Stop(0, this._currentMontage);
        this._isPlaying = false;
        return true;
    }

    pause(): boolean {
        if (!this.isPlaying) {
            return false;
        }
        this._animationInstance.Montage_Pause(this._currentMontage);
        this._isPlaying = false;
        return true;
    }

    resume(): boolean {
        if (this.isPlaying) {
            return false;
        }
        this._animationInstance.Montage_Resume(this._currentMontage);
        this._isPlaying = true;
        return true;
    }

    gotoAndPlay(position: number) {
        this.play();
        this.position = position;
    }

    gotoAndStop(position: number) {
        this.position = position;
        this._animationInstance.Montage_Pause(this._currentMontage);
        this._isPlaying = true;
    }

    private onOwnerDestroy = () => {
        this.clear();
    }

    private internalPlayAnimation() {
        if (!this._currentMontage) {
            return;
        }
        this._animationInstance.Montage_Play(this._currentMontage);
        this._isPlaying = true;
    }

    protected clear() {
        super.clear();
        MeshAnimator.characterAnimatorMap.delete(this._character.gameObjectId);
        this._animationData = null;
        this._character = null;
        this._currentMontage = null;
    }

}