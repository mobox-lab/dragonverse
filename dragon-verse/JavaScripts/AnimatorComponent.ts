import { AnimationAssetMgr } from "./lighter/animation";

enum TriggerTypeEnum { WhenGameStart = 1, OnKeyDown = 2 }

@mw.Serializable
export class AnimatorInfo {


    @mw.Property({ displayName: "动画guid", tooltip: "动画资源的guid,可以在动画文件中查看,或者动画脚本guid" })
    guid: string = ''

    @mw.Property({ displayName: "动画结束延迟时间", tooltip: "这个动画播放完毕延迟多久播放下一个" })
    delayTime: number = 0

    @mw.Property({ displayName: "动画播放速度", tooltip: "1为正常速度" })
    speed: number = 1

    @mw.Property({ displayName: "动画播放次数", tooltip: "0为无限循环" })
    repeatCount: number = 1

    @mw.Property({ displayName: "动画播放模式", tooltip: "动画是播放一次、循环、pingpong", enumType: lighter.animation.WrapMode })
    warpMode: lighter.animation.WrapMode = lighter.animation.WrapMode.Default
}



export enum AnimateTargetType {

    Normal,

    UI,

    Camera,

    PostProcess,

    Light,

    SkyBox,

    Fog
}

@mw.Component
export default class AnimatorComponent extends mw.Script {




    @mw.Property({ displayName: "触发类型", tooltip: "选择动画开始播放的时机", enumType: TriggerTypeEnum, group: "Animation", onChangedInEditor: "onEditorPlayTypeChanged" })
    public playAnimationType = TriggerTypeEnum.WhenGameStart;

    @mw.Property({ displayName: "动画播放触发按键", enumType: mw.Keys, tooltip: "当触发类型为按键时 按哪个键开始播放动画", group: "Animation" })
    public triggerAnimationKey: mw.Keys = mw.Keys.F1;



    @mw.Property({ displayName: "动画目标类型", enumType: AnimateTargetType, tooltip: "动画目标是什么", group: "Animation", onChangedInEditor: "onAnimateTargetChange" })
    public animateTargetType: AnimateTargetType = AnimateTargetType.Normal;

    @mw.Property({ displayName: "UI文件路径", group: "Animation/UI" })
    public uiPath: string = '';

    @mw.Property({ displayName: "UI动画对象path", group: "Animation/UI" })
    public uiTargetPath: string = '';

    @mw.Property({ displayName: "相机混入时间", tooltip: "只有当动画目标位相机时才生效,相机切换时的混入时间,单位秒", group: "Animation/Camera" })
    public cameraEasingInTime: number = 0

    @mw.Property({ displayName: "相机混出时间", tooltip: "只有当动画目标位相机时才生效,相机切换时的混入时间,单位秒", group: "Animation/Camera" })
    public cameraEasingOutTime: number = 0


    @mw.Property({ displayName: "相机混入曲线", enumType: mw.CameraSwitchBlendFunction, tooltip: "只有当动画目标位相机时才生效,切换曲线", group: "Animation/Camera" })
    public cameraEasingInFunc: mw.CameraSwitchBlendFunction = mw.CameraSwitchBlendFunction.Cubic

    @mw.Property({ displayName: "相机混出曲线", enumType: mw.CameraSwitchBlendFunction, tooltip: "只有当动画目标位相机时才生效,切换曲线", group: "Animation/Camera" })
    public cameraEasingOutFunc: mw.CameraSwitchBlendFunction = mw.CameraSwitchBlendFunction.Cubic

    @mw.Property({ displayName: "动画信息", tooltip: "动画信息", group: "Animation" })
    public animatorInfos: AnimatorInfo[] = [new AnimatorInfo()];

    private index: number = 0;


    private _uiRoot: mw.Widget;


    private _curCamera: mw.Camera;

    private _target: mw.GameObject | mw.Widget | mw.PostProcess | mw.Lighting | mw.Skybox | mw.Fog;

    constructor(...params: any[]) {
        super(...params);

        setTimeout(() => {
            this.onEditorPlayTypeChanged();
            this.onAnimateTargetChange();
        }, 2000)

    }

    protected onStart(): void {

        if (SystemUtil.isClient()) {

            this.preProcessAnimateTarget();

            if (this.playAnimationType === TriggerTypeEnum.WhenGameStart) {
                this.startSequence();
            } else {

                InputUtil.onKeyDown(this.triggerAnimationKey, () => {
                    this.startSequence();
                })
            }
        }
    }


    private preProcessAnimateTarget() {

        let target: any = this.gameObject;

        if (this.animateTargetType === AnimateTargetType.UI) {


            target = this.createUI(this.uiPath) as mw.Widget;
            target.visibility = mw.SlateVisibility.Collapsed;
            this._uiRoot = target;
            target = this.uiTargetPath ? target.findChildByPath(this.uiTargetPath) : target;

        } else if (this.animateTargetType === AnimateTargetType.Camera) {
            this._curCamera = mw.Camera.currentCamera;
        } else if (this.animateTargetType === AnimateTargetType.PostProcess) {
            target = mw.PostProcess;
        } else if (this.animateTargetType === AnimateTargetType.Light) {
            target = mw.Lighting;
        } else if (this.animateTargetType === AnimateTargetType.SkyBox) {
            target = mw.Skybox;
        } else if (this.animateTargetType === AnimateTargetType.Fog) {
            target = mw.Fog;
        }

        this._target = target;
    }

    private async startSequence() {
        this.index = 0;
        if (this.animateTargetType === AnimateTargetType.UI) {
            this._uiRoot.visibility = mw.SlateVisibility.HitTestInvisible;
        } else if (this.animateTargetType === AnimateTargetType.Camera) {
            mw.Camera.switch(this._target as mw.Camera, this.cameraEasingInTime, this.cameraEasingInFunc);
            await this.await(this.cameraEasingInTime)
        }
        this.doSequence();
    }





    private onSequenceEnd() {

        if (this.animateTargetType === AnimateTargetType.UI) {
            this._uiRoot.visibility = mw.SlateVisibility.Collapsed;
        } else if (this.animateTargetType === AnimateTargetType.Camera) {
            mw.Camera.switch(this._curCamera, this.cameraEasingOutTime, this.cameraEasingOutFunc);
            this._curCamera = null;
        }
    }

    private doSequence() {

        let animationInfo = this.animatorInfos[this.index];
        if (!animationInfo) {
            this.onSequenceEnd();
            return;
        }

        this.asyncPlayAnimate(this._target, animationInfo.guid, animationInfo.speed, animationInfo.repeatCount, animationInfo.warpMode).then(() => {

            this.await(animationInfo.delayTime).then(() => {
                this.index++;
                this.doSequence();
            })
        })
    }



    private async asyncPlayAnimate(target: unknown, animateGUid: string, speed: number = 1, repeatCount: number = 1, warpMode: lighter.animation.WrapMode = lighter.animation.WrapMode.Default) {
        return new Promise<void>((resolve, reject) => {

            const animator = lighter.animation.Animator.getAnimator(target);
            animator.onAnimationLifeEvent.clear();
            animator.onAnimationEvent.clear();

            animator.onAnimationEvent.add((name) => {
            })

            animator.onAnimationLifeEvent.add(async (type: lighter.animation.EventType) => {
                if (type === lighter.animation.EventType.FINISHED) {
                    animator.onAnimationLifeEvent.clear();
                    animator.destroy();
                    resolve();
                }
            }, this);

            let clip = AnimationAssetMgr.getAnimationClipWithUUID(animateGUid);

            if (!clip) clip = AnimationAssetMgr.getAnimationClipWithName(animateGUid);

            if (!clip) {
                console.error(`找不到动画资源:${animateGUid}`);
                resolve();
                return;

            }
            clip.wrapMode = warpMode;
            animator.addClip(clip);
            const state = animator.getAnimationState(clip.name);
            state.repeatCount = repeatCount;
            state.speed = speed;
            animator.play(clip.name);

        })
    }




    private async await(time: number) {

        return new Promise<void>((resolve, reject) => {

            setTimeout(() => {
                resolve();
            }, time * 1000);
        })
    }



    private onEditorPlayTypeChanged() {

        this.updateProperty('triggerAnimationKey', { hideInEditor: this.playAnimationType !== TriggerTypeEnum.OnKeyDown })
    }




    private onAnimateTargetChange() {

        this.updateProperty('uiPath', { hideInEditor: this.animateTargetType !== AnimateTargetType.UI })


        this.updateProperty('cameraEasingInTime', { hideInEditor: this.animateTargetType !== AnimateTargetType.Camera })
        this.updateProperty('cameraEasingOutTime', { hideInEditor: this.animateTargetType !== AnimateTargetType.Camera })
        this.updateProperty('cameraEasingInFunc', { hideInEditor: this.animateTargetType !== AnimateTargetType.Camera })
        this.updateProperty('cameraEasingOutFunc', { hideInEditor: this.animateTargetType !== AnimateTargetType.Camera })

    }

    private createUI(uipath: string) {
        const widget = createUIByPath(uipath);
        const rootCanvas = widget.findChildByPath("RootCanvas");
        let constraints = new mw.UIConstraintAnchors();
        constraints.constraintHorizontal = UIConstraintHorizontal.LeftRight;
        constraints.constraintVertical = UIConstraintVertical.TopBottom;

        widget.constraints = constraints;
        UIService.canvas.addChild(widget);

        return rootCanvas;
    }
}