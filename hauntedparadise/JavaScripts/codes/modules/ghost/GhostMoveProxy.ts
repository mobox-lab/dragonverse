import { GamesStartDefines } from "../../Defines";

export class GhostMoveProxy {
    private _for: Vector = Vector.forward;

    private _failCount: number = 0;

    private _jumpforce: Vector = new Vector(500, 0, 1000);

    private _lastStuckPos: Vector = Vector.zero;

    private _repTryCount: number = 0;

    private _globalEnable: boolean = true;

    public constructor() {
        this._globalEnable = GamesStartDefines.gameTheme != "Town"

    }

    public resetFailCount() {
        this._failCount = -1;
    }

    onUpdate(char: Character, rot: Rotation) {
        if (!this._globalEnable) {
            return;
        }
        char.worldTransform.rotation = rot;
        char.addMovement(this._for)
        this.failFunc(char);
    }

    public failFunc(char: Character, iscanFlash: boolean = true) {
        if (!this._globalEnable) {
            return;
        }
        if (char.velocity.sqrMagnitude <= 3) {
            this._failCount++;
            if (this._failCount >= 2) {
                let charpos = char.worldTransform.position;
                if (this._repTryCount > 0 && iscanFlash) {
                    let checkDis = 500 + (this._repTryCount - 1) * 300
                    let charfor = char.worldTransform.getForwardVector().multiply(checkDis);
                    let end = charfor.add(charpos)
                    let res = QueryUtil.lineTrace(end, charpos, true, true);
                    for (let index = 0; index < res.length; index++) {
                        const element = res[index];
                        if (element.gameObject instanceof Trigger) {
                            continue;
                        }
                        char.worldTransform.position = element.position.add(char.worldTransform.getForwardVector().multiply(100));
                        break;
                    }
                }
                else {
                    char.addImpulse(char.worldTransform.rotation.rotateVector(this._jumpforce), true);
                    if (Vector.squaredDistance(this._lastStuckPos, charpos) <= 50) {
                        this._repTryCount++;
                        console.log("moveproxy rep count ++" + this._repTryCount)
                    }
                    else {
                        this._repTryCount = 0;
                    }
                    this._lastStuckPos = charpos;
                }
            }
        }
        else {
            this._failCount = 0;
        }
    }

    public jump(char: Character) {
        if (!this._globalEnable) {
            return;
        }
        char.addImpulse(char.worldTransform.rotation.rotateVector(this._jumpforce), true);
    }
}