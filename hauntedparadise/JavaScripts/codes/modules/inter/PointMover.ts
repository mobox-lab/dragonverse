import { AutoMover, TriAutoMoveData } from "./ctlCom/AutoMover";

@Component
export default class PointMover extends Script {

    @Property({ displayName: "移动点位", arrayDefault: new TriAutoMoveData() })
    public data: TriAutoMoveData[] = [];

    @Property({ displayName: "移动速度" })
    public moveSpd: number = 400;

    private _autoMover: AutoMover;

    protected onStart(): void {
        if (SystemUtil.isServer()) {
            this._autoMover = new AutoMover(this.data, this.gameObject, this.moveSpd);
            this.useUpdate = true;
        }
    }

    protected onUpdate(dt: number): void {
        this._autoMover.onUpdate(dt);
    }

}