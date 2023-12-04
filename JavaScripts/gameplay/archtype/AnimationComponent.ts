

@Serializable
export class AnimationConfig {

    @mw.Property({ displayName: "状态" })
    public state: string = '';

    @mw.Property({ displayName: "动画资源" })
    public animationName: string = ''

    @mw.Property({ displayName: "动画播放速度" })
    public speed: number = 1;


    @mw.Property({ displayName: "动画循环次数" })
    public loop: number = 1;

}


let activeEditorAnimationConfig: Record<string, string> = {};




@mw.Component
export default class AnimationComponent extends mw.Script {


    @mw.Property({ displayName: "默认动画名" })
    private _defaultAnimation: string = '';


    @mw.Property({ displayName: "动画配置" })
    private _animationConfig: AnimationConfig[] = [new AnimationConfig()];


    public onAnimationFinished: mw.Action2<AnimationComponent, string> = new mw.Action2();


    private _owner: mw.Character = null;


    private _animationStates: Map<string, AnimationConfig> = new Map();

    private _currentAnimationName: string = '';

    private _isAssetLoaded: boolean = false;

    private _currentAnimation: mw.Animation = null;


    public set owner(value: mw.Character) {
        if (this._owner === value) {
            return;
        }
        if (this._owner) {
            this.clearAnimation();
        }
        this._owner = value;
        this._owner.onDestroyDelegate.add(() => {
            this._owner.onDestroyDelegate.clear();
            this._currentAnimation = null;
            this._owner = null;
        })
        this.onAnimationStateChanged();
    }

    public get owner() {
        return this._owner;
    }

    protected async onStart(): Promise<void> {

        let loader: Promise<boolean>[] = [];
        for (let i = 0; i < this._animationConfig.length; i++) {

            let info = this._animationConfig[i];
            loader.push(mw.AssetUtil.asyncDownloadAsset(info.animationName));
            this._animationStates.set(info.state, info);
        }

        this._currentAnimationName = this._defaultAnimation;
        Promise.all(loader).then(() => {
            this._isAssetLoaded = true;
            this._owner = this.gameObject as mw.Character;
            this.onAnimationStateChanged();
        });
    }




    /**
     * 切换到指定的动画状态
     * @param state 
     * @returns 
     */
    public changeState(state: string) {
        if (this._currentAnimationName === state) {
            return;
        }
        this._currentAnimationName = state;
        if (!this._isAssetLoaded) {
            return;
        }

        this.onAnimationStateChanged();
    }




    private onAnimationStateChanged() {

        let stateConfig = this._animationStates.get(this._currentAnimationName);
        if (!stateConfig || !this.owner) {
            return;
        }
        if (this._currentAnimation) {
            this._currentAnimation.stop();
            this._currentAnimation.onFinish.clear();
        }
        let animation = this._currentAnimation = this.owner.loadAnimation(stateConfig.animationName)
        animation.loop = stateConfig.loop;
        animation.speed = stateConfig.speed;
        animation.play();
        this._currentAnimation.onFinish.add(() => {
            this.onAnimationPlayComplete();
        });

    }

    private onAnimationPlayComplete() {
        this.onAnimationFinished.call(this, this._currentAnimationName)
    }

    private clearAnimation() {
        if (this._currentAnimation) {
            this._currentAnimation.stop();
            this._currentAnimation.onFinish.clear();
            this._currentAnimation = null;
        }
    }

    protected onDestroy(): void {
        this.clearAnimation();
        this._animationStates.clear();

    }
}