import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";

@Component
export default class GraphicShowItem extends Script {
    @Property({ displayName: "画质等级", tooltip: "请用|隔开不同的画质等级" })
    public graphicArr: string = "1";

    @Property({ displayName: "是否开启碰撞", tooltip: "在显示后是否开启碰撞" })
    public isOpenCollsion: boolean = true;

    private arr: number[] = []

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let arr = this.graphicArr.split("|");
        arr.forEach(e => {
            this.arr.push(Number(e));
        })
        Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, value: string) => {
            if (key != BoardKeys.Style) {
                return;
            }
            let style = Number(value);
            if (!this.arr.includes(style)) {
                this.gameObject.setCollision(CollisionStatus.Off, true);
                this.gameObject.setVisibility(PropertyStatus.Off);
                return;
            }
            if (this.isOpenCollsion) {
                this.gameObject.setCollision(CollisionStatus.On, true);
            }
            else {
                this.gameObject.setCollision(CollisionStatus.Off, true);
            }
            this.gameObject.setVisibility(PropertyStatus.On);
        })
    }
}