import AnimationClip = lighter.animation.AnimationClip;


class ClipManager extends lighter.assets.BaseAssetPlugin {
    public name: string = 'mwanim'
    public version: string = '1.0.0'
    public sourceMgr: lighter.assets.IAssetMgr

    private _animateLUT: Map<string, AnimationClip> = new Map();

    initialize(assets: any[]) {

        assets.forEach((value) => {

            let clip = value as AnimationClip;
            this._animateLUT.set(clip.name, clip);
        })
    }


    public getAnimationClipWithName(name: string): AnimationClip {
        return this._animateLUT.get(name);
    }

    public getAnimationClipWithUUID(uuid: string): AnimationClip {
        return this.sourceMgr.getAsset(uuid);
    }

    clear() {

    }
}




const AnimationAssetMgr = new ClipManager();


lighter.asset.registerAssetsPlugin(AnimationAssetMgr);
export {
    AnimationAssetMgr
};

