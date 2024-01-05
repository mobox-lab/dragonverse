import GToolkit from "../../../util/GToolkit";
import GameObjPoolSourceType = mwext.GameObjPoolSourceType;
import GameServiceConfig from "../../../const/GameServiceConfig";

const tags = "ThrowDragonBall";

const mid1 = mw.Vector.zero;


export class ThrowDragonBall {
    private _instance: mw.GameObject;

    public constructor(private owner: mw.Character, private target: mw.Vector, private duration: number) {
        let obj = this._instance = mwext.GameObjPool.spawn(GameServiceConfig.THROW_BALL_PREFAB_GUID, GameObjPoolSourceType.Prefab);
        if (!obj) {
            throw new Error(`无法创建预制体,请将该模型拖入到优先加载`);
        }
    }

    public do() {
        if (!this._instance) {
            return;
        }
        // actions.tweens.stopAllByTag(tags);

        let location = this.owner.getSlotWorldPosition(mw.HumanoidSlotType.RightHand);
        this._instance.worldTransform.position = location;
        let c1 = this.generateControllerPoint(location, this.target, 200);
        actions.tween(this._instance.worldTransform).bezierTo(this.duration, c1, c1, this.target).setTag(tags).start();

    }


    public next(result: boolean, duration: number = 1000, complete: () => void = null) {
        if (!this._instance) {
            return;
        }
        // actions.tweens.stopAllByTag(tags);

        if (result) {
            let location = this.owner.getSlotWorldPosition(mw.HumanoidSlotType.RightHand);
            actions.tween(this._instance.worldTransform).to(duration, { position: location }).setTag(tags).call(() => {
                this.clear();
            }).start();
        } else {

            let dir = mid1.set(GToolkit.random(-1, 1), GToolkit.random(-1, 1), 0).normalize();
            dir.multiply(GToolkit.random(300, 500, true));
            let end = dir.add(this._instance.worldTransform.position);
            let c1 = this.generateControllerPoint(this._instance.worldTransform.position, end, 300);
            actions.tween(this._instance.worldTransform).bezierTo(duration, c1, c1, end).setTag(tags).call(() => {
                complete && complete();
                this.clear();
            }).start();
        }
    }


    private generateControllerPoint(start: mw.Vector, end: mw.Vector, height: number): mw.Vector {
        let mid = mw.Vector.lerp(start, end, 0.5, mid1);
        mid.z += height;
        return mid;
    }

    public clear() {
        this.target = null;
        this.owner = null;
        // actions.tweens.stopAllByTag(tags);
        if (this._instance) {
            GameObjPool.despawn(this._instance);
            this._instance = null;
        }
    }
}


globalThis.ThrowDragonBall = ThrowDragonBall;

