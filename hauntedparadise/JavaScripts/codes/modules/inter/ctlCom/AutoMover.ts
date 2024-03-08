
@Serializable
export class TriAutoMoveData {
    @Property({ displayName: "移动的位置" })
    public pos: Vector = Vector.zero;
    @Property({ displayName: "停留的时间" })
    public delayTime: number = 0;
}

export class AutoMover {
    /** 当前移动的点位 */
    private _curIndex: number = 0;

    /** 当前点位的计时器 */
    private _curTimer: number = 0;

    /** 移动的位置，当前的 */
    private _tempVec: Vector = Vector.zero;

    /** 移动到每个点位需要的时间 */
    private _timeArr: number[] = [];

    /** 需要暂停的时长 */
    private _stayTimer: number = 0;

    public constructor(public datas: TriAutoMoveData[], public root: GameObject, public moveSpd: number) {
        for (let index = 0; index < datas.length; index++) {
            const cur = datas[index];
            let nextIndex = index + 1 >= datas.length ? 0 : index + 1;
            const next = datas[nextIndex]
            let dis = Vector.distance(cur.pos.clone(), next.pos.clone());
            this._timeArr.push(dis / this.moveSpd);
        }
    }

    onUpdate(dt: number) {
        if (this._stayTimer > 0) {
            this._stayTimer -= dt;
            return;
        }
        let cur = this.datas[this._curIndex];
        let nextIndex = this._curIndex + 1 >= this.datas.length ? 0 : this._curIndex + 1;
        let next = this.datas[nextIndex];
        this._curTimer += dt;
        let percent = this._curTimer / this._timeArr[this._curIndex];
        percent = Math.min(percent, 1);
        Vector.lerp(cur.pos, next.pos, percent, this._tempVec);
        this.root.localTransform.position = this._tempVec;
        if (percent >= 1) {
            this._curTimer = 0;
            this._curIndex++;
            if (this._curIndex >= this.datas.length) {
                this._curIndex = 0;
            }
            this._stayTimer = this.datas[this._curIndex].delayTime;
        }
    }
}