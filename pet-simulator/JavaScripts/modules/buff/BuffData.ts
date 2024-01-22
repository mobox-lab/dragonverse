import { MapEx } from "odin";
import { GlobalEnum } from "../../const/Enum";

export class BuffData extends Subdata {

    @Decorator.persistence()
    public buffInfo: MapEx.MapExClass<number>; // number 代表buff的剩余时间
    @Decorator.persistence()
    public stamp: number; // 上次离开游戏的时间戳

    protected initDefaultData(): void {
        this.buffInfo = {};
        this.stamp = -1;
    }

    /**
     * 设置buff剩余时间
     * @param type 类型
     * @param time 结束的时间戳
     */
    public setBuffStamp(type: GlobalEnum.BuffType, time: number) {
        MapEx.set(this.buffInfo, type, time);
        this.save(true);
    }

    /**
     * 获取buff剩余时间
     */
    public getBuffTime(type: GlobalEnum.BuffType) {
        if (MapEx.has(this.buffInfo, type) == false) return null;
        return MapEx.get(this.buffInfo, type);
    }

    /**
     * 移除buff
     */
    public removeBuff(type: GlobalEnum.BuffType) {
        if (MapEx.has(this.buffInfo, type)) {
            MapEx.del(this.buffInfo, type);
            this.save(true);
        }
    }

    /**
     * 重写数据名
     */
    public get dataName(): string {
        return "BuffData";
    }
}