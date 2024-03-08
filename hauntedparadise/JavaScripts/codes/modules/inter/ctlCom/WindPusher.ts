export class WindPusher {
    private _enable: boolean = false;

    private _char: Character;

    private _force: Vector;

    private _tempVec: Vector = Vector.zero;

    constructor() {
        TimeUtil.onEnterFrame.add((dt: number) => {
            if (!this._enable) return;
            let prePos = this._char.worldTransform.position
            this._tempVec.set(this._force).multiply(dt);
            this._tempVec.add(prePos);
            let res = QueryUtil.lineTrace(prePos, this._tempVec, true);
            res = res.filter(e => {
                if (e.gameObject instanceof Character || e.gameObject instanceof Trigger) {
                    return false
                }
                return true;
            })
            if (res.length != 0) {
                return;
            }
            this._char.worldTransform.position = this._tempVec;
        })
    }

    setForce(force: Vector, isOpen: boolean) {
        this._enable = isOpen;
        if (!this._enable) {
            console.log("关闭风力")
            return;
        }
        if (!this._char) {
            this._char = Player.localPlayer.character;
        }
        this._force = force.clone().multiply(this._char.maxWalkSpeed);
        console.log("受到风力")
    }
}