import { RoomHelper } from "../RoomHelper";
import { Event_GameEnd } from "../const/Events";


@Component
export default class ItemPointScript extends mw.Script {
    /**
     * 房间类型
     */
    @mw.Property({ displayName: "房间类型" })
    public roomType: number = 0;
    /**
     * 物品刷新类型
     */
    @mw.Property({ displayName: "物品刷新类型" })
    public refreshType: number = 0;
    /**
     * 刷新难度
     */
    @mw.Property({ displayName: "刷新难度", tooltip: "需要大于或者等于这个难度等级才会加入到刷新点中" })
    public refreshDegree: number = 0;

    /**
     * 是否已使用
     */
    isUsed: boolean = false;
    protected onStart(): void {
        this.gameObject.asyncReady().then(go => {
            RoomHelper.instance.registerItemPoint(this);
        })
        Event.addLocalListener(Event_GameEnd, () => {
            this.isUsed = false;
        });
    }
}