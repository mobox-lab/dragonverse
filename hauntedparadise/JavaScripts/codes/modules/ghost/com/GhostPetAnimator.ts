import { IGhostGraphicElement } from "../../../../config/GhostGraphic";
import { UtilEx } from "../../../utils/UtilEx";
import { MeshLoadAnimator } from "../../../utils/animator/MeshAnimator";
import { GhostAniState, GhostMoveState } from "../GhostDefine";

export class GhostPetAni {
    /** 高优先级动画 */
    private _curAni: mw.Animator.MeshAnimator | Animation;

    /** 跑动动画 */
    private _runAni: SubStance | Animation;

    /** 待机动画 */
    private _idleAni: SubStance;

    /** 追击动画 */
    private _chaseAni: SubStance | Animation;

    private _preIsmoving: boolean;

    private _preState: GhostMoveState;

    private _enalble: boolean = false;

    private _cfg: IGhostGraphicElement;
    /** 当前选择的基础动画组 */
    curAnimaGroup: GhostAniState;

    private isSlotAni: boolean = false;

    private isStop2Play: boolean = false;

    private _pasueTimer: number = 0;

    private _pasueTime: number = 0;

    public constructor(private _char: Character) {
    }

    public setIsStop2Play() {
        if (this.isStop2Play || !this._chaseAni) {
            return;
        }
        this.isStop2Play = true;
        this._runAni = this._char.loadAnimation(this._cfg.runAni);
        this._runAni.loop = 0;
        this._chaseAni = this._char.loadAnimation(this._cfg.chaseAni);
        this._chaseAni.loop = 0;
    }

    public async setAnimation(cfg: IGhostGraphicElement) {
        console.log("动画资源加载开始")
        this._enalble = false;
        this._cfg = cfg;
        await this._char.asyncReady();
        await UtilEx.asyncLoadAsset(cfg.runAni);
        await UtilEx.asyncLoadAsset(cfg.idleAni);
        await UtilEx.asyncLoadAsset(cfg.chaseAni);
        await UtilEx.asyncLoadAsset(cfg.carAni);
        await UtilEx.asyncLoadAsset(cfg.CarIdleAni);
        await UtilEx.asyncLoadAsset(cfg.attackAni);
        await UtilEx.asyncLoadAsset(cfg.watchAni);
        this.changeMoveAniGroup(GhostAniState.Normal);
        this._chaseAni = this._char.loadSubStance(cfg.chaseAni);
        this._enalble = true;
        this._preIsmoving = !this._char.isMoving;
        console.log("动画资源加载完毕")
    }

    public pauseAnimation() {
        if (!this._char || !this._char.worldTransform || !this._char.currentAnimation) {
            return;
        }
        this._char.currentAnimation.pause();
    }

    public continueAnimation() {
        if (!this._char || !this._char.worldTransform || !this._char.currentAnimation) {
            return;
        }
        this._char.currentAnimation.resume();
        if (this._preIsmoving) {
            this._preState == GhostMoveState.Hang ? this._runAni.play() : this._chaseAni.play();
        }
        else {
            this._idleAni.play();
        }
    }

    public async playAnimation(aniName: string, isLoop: boolean = false, slotType: AnimSlot = AnimSlot.Default) {
        if (!this._cfg) {
            return;
        }
        let aniGuid = this._cfg[aniName];
        let pauseTime = this._cfg[`${aniName}Pause`];
        let spd = this._cfg[`${aniName}Speed`] || 1;
        await UtilEx.asyncLoadAsset(aniGuid);
        if (slotType != AnimSlot.Default && this._char.currentAnimation && this._char.currentAnimation.isPlaying) {
            return;
        }

        if (!pauseTime) {
            let ani = this._char.loadAnimation(aniGuid);
            ani.loop = isLoop ? 0 : 1;
            ani.slot = slotType;
            this.isSlotAni = isLoop || slotType != AnimSlot.FullyBody && slotType != AnimSlot.Default;
            ani.speed = spd;
            ani.play();
            this._curAni = ani;
            // console.log("播放动画" + aniName)
            this._pasueTimer = 0;
        }
        else {
            this.isSlotAni = true;
            let ani = await MeshLoadAnimator(this._char, aniGuid, false)// await this._char.loadAnimator(aniGuid, false);
            ani.play();
            ani.speed = spd;
            this._curAni = ani;
            pauseTime /= spd;
            this._pasueTime = pauseTime;
            this._pasueTimer = pauseTime;
            // console.log("播放动画, mode 2:" + aniName + ":" + spd + ":" + pauseTime)
        }
    }

    stopAni() {
        if (!this._runAni) {
            return;
        }
        if (this._curAni) {
            this._curAni.stop();
            this._curAni = null;
        }
        this._preState == GhostMoveState.Hang ? this._runAni.play() : this._chaseAni.play();
    }

    private _cacheMoving: boolean = false;

    updateAnimator(dt: number) {
        if (this._curAni && this._pasueTimer > 0) {
            this._pasueTimer -= dt;
            if (this._pasueTimer <= this._pasueTime / 2) {
                this._pasueTimer = this._pasueTime - (this._curAni as mw.Animator.MeshAnimator).position;
            }
            /** 如果下一帧的时间充裕，则直接倒地 */
            if ((this._pasueTimer - 0.1) <= 0) {
                let ani = (this._curAni as mw.Animator.MeshAnimator);
                ani.play();
                ani.gotoAndStop(this._pasueTime)
                this._pasueTimer = 0;
            }
        }
    }

    /**
     * 每次更新调用，用于更新动画的状态，判断当前应该播放什么动画
     * @param moveState 移动状态
     * @param dt 帧间隔
     */
    public onUpdate(moveState: GhostMoveState, aniGroup: GhostAniState, dt: number) {


        if (!this._enalble) {
            return;
        }

        let isNeedChange = false;
        let ismoving = this._char.isMoving || this._char.isJumping;
        if (this._cacheMoving != ismoving) {
            this._cacheMoving = ismoving;
            return;
        }

        if (!isNeedChange) {
            isNeedChange = aniGroup != this.curAnimaGroup;
            if (isNeedChange) {
                // console.log("改变了animation组")
                this.curAnimaGroup = aniGroup;
                this.changeMoveAniGroup(aniGroup);
            }
        }
        if (!isNeedChange) {
            isNeedChange = this._preIsmoving != ismoving;
        }
        if (!isNeedChange) {
            isNeedChange = this._preState != moveState;
        }
        if (this._curAni && ismoving && !this.isSlotAni) {
            this._curAni.stop();
            this._curAni = null;
        }
        if (!isNeedChange) {
            return;
        }

        this._preIsmoving = ismoving;
        this._preState = moveState;
        if (this.isStop2Play) {
            if (this._preIsmoving) {
                moveState == GhostMoveState.Hang ? this._runAni.play() : this._chaseAni.play();
            }
            this._char.isMoving ? this.continueAnimation() : this.pauseAnimation();
        }
        else {
            if (this._preIsmoving) {
                moveState == GhostMoveState.Hang ? this._runAni.play() : this._chaseAni.play();
            }
            else {
                this._idleAni.play();
            }
            //console.log("当前的移动状态为" + moveState);
        }
    }

    private changeMoveAniGroup(aniGroup: GhostAniState) {
        if (aniGroup == GhostAniState.Normal) {
            this._runAni = this._char.loadSubStance(this._cfg.runAni);
            this._idleAni = this._char.loadSubStance(this._cfg.idleAni);
        }
        else {
            this._runAni = this._char.loadSubStance(this._cfg.carAni);
            this._idleAni = this._char.loadSubStance(this._cfg.CarIdleAni);
        }
    }
}