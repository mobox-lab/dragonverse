export class ImpluseUpdater {
    public static instance: ImpluseUpdater = new ImpluseUpdater();
    private _impluseSimilators: ImpluseSimilator[];

    private constructor() {
        // TimeUtil.onEnterFrame.add((dt: number) => {
        //     for (let index = 0; index < this._impluseSimilators.length; index++) {
        //         const element = this._impluseSimilators[index];
        //         element.update(dt);
        //     }
        //     this._impluseSimilators = this._impluseSimilators.filter(e => {
        //         return !e.isFinished;
        //     })
        // })
    }

    public addImpluse(char: Character, force: Vector) {
        force.subtract(char.velocity);
        char.addImpulse(force, true);
        // const guid = char.gameObjectId;
        // let impluser = this._impluseSimilators.find((e) => {
        //     return e.guid == guid;
        // })
        // if (!impluser) {
        //     impluser = new ImpluseSimilator(char);
        //     this._impluseSimilators.push(impluser);
        // }
        // impluser.setImpuluse(force);
    }

}

class ImpluseSimilator {
    /** 唯一标识 */
    public guid: string;

    /** 是否已经完成 */
    public isFinished: boolean = false;

    /** 给予的冲量 */
    public force: Vector = Vector.zero;

    /** 最大的速度 */
    private _maxSpd: number;

    /** 计时器，计时0.1s后销毁 */
    private _timer: number = 0;

    /** 是否已经给过冲量了 */
    private _isGiveImpuled: boolean = false;

    public constructor(private char: Character) {
        this.guid = char.gameObjectId;
    }

    public update(dt: number) {
        try {
            if (!this._isGiveImpuled) {
                this.force.subtract(this.char.velocity);
                this.char.addImpulse(this.force, true);
                this._isGiveImpuled = true;
            }
            this._timer += dt;
            if (this._timer < 0.1) {
                return;
            }
            let spd = this.char.velocity;
            let val = spd.magnitude;
            if (val >= this._maxSpd) {
                spd.multiply(val - this._maxSpd);
                this.char.addImpulse(spd.multiply(-1), true);
            }
            this.isFinished = true;
        } catch (error) {
            this.isFinished = true;
        }
    }

    /**
     * 设置想要的冲量大小
     * @param force 
     */
    public setImpuluse(force: Vector) {
        this.force.set(force);
        this.isFinished = false;
        this._maxSpd = force.magnitude;
        this._timer = 0;
        this._isGiveImpuled = false;
    }
}