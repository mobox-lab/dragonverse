import { MapEx } from "odin";

/**
 * 商店模块数据
 */
export class ShopModuleData extends Subdata {
    /** 玩家拥有的商店物品 */
    @Decorator.persistence()
    public ownItemArr: number[] = [];

    public get dataName() {
        return "ShopModuleData";
    }

    //当前最新的版本号(默认是1，升级数据需要重写)
    protected override get version() {
        return 1;
    }

    protected initDefaultData() {
        this.ownItemArr = [];
    }

}