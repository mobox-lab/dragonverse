import { BagDataBase } from "./BagDataBase";
import BagItemTest from "./BagItemTest";
import { BagUIBase } from "./BagUIBase";
import { IBagUI, Layout } from "./IBagUI";

export default abstract class BagPanelBase<Data extends BagDataBase, ItemUI extends mw.UIScript> implements IBagUI {

    /**UI项的map, key为该项的唯一标识，value为item类 */
    public itemMap: Map<string, BagUIBase<Data, ItemUI>> = new Map();
    /**背包UI */
    public canvas: Canvas;
    /**布局参数 */
    layout: Layout;


    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.initLayout();
    }

    /**设置布局规则,所有参数都要设置 */
    initLayout(): Layout {
        let layout = new Layout();
        layout.itemCount = 4;
        layout.itemHeight = 200;
        layout.itemInterval = 90;
        layout.itemWidth = 200;
        layout.leftOffsetX = 50;
        layout.topOffsetY = 50;
        return layout;
    }

    /**背包刷新后的回调 */
    protected afterRefresh(): void {

    }

    /**背包项刷新后的回调 */
    protected afterOneItemRefresh(item: BagUIBase<Data, ItemUI>): void {

    }

    /**背包刷新前的回调 */
    protected beforeRefresh() {

    }

    /**刷新背包 */
    public refreshPanel(data: Data[]): void {


        // 将这次data没有的item数据删除
        let deleteKeyList: string[] = [];
        let include = false;
        this.itemMap.forEach((item, key) => {
            data.forEach((data) => {
                if (data.key == key) {
                    include = true;
                    return;
                }
            });
            // 新数据不包含item的key，就删除
            if (!include) deleteKeyList.push(key);
        });
        deleteKeyList.forEach((key) => {
            this.itemMap.get(key).delUI();
            this.itemMap.delete(key);
            // console.log("删除");
        });
        // 新增和更新
        data.forEach((data, index) => {
            let k = data.key.toString();
            let item = this.itemMap.get(k);
            // 如果没有这个item，就添加
            if (item == null) {
                item = this.onAddItem(k, data);
                item.addUI(index + 1);
                // console.log("新增");

            }
            // 如果有这个item，就更新
            else {
                item.moveUI(index + 1);
                // console.log("更新");
            }

            this.afterOneItemRefresh(item);
        });


        this.afterRefresh();
    }

    /**添加item */
    public abstract onAddItem(key: string, data: Data): BagUIBase<Data, ItemUI>;

}