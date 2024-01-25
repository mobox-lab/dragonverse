import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA: Array<Array<any>> = [["id", "Info", "price", "buyCount", "title"], ["", "", "", "", "Language"], [1, "娃娃机币", 0, 10, "Task_shop_16"], [2, "娃娃机币", 0, 20, "Task_shop_16"], [3, "娃娃机币", 0, 30, "Task_shop_16"]];
export interface IGoodsTableElement extends IElementBase {
	/**undefined*/
	id: number
	/**内容说明策划用*/
	Info: string
	/**mobox币价格*/
	price: number
	/**兑换数量*/
	buyCount: number
	/**item标题*/
	title: string
}
export class GoodsTableConfig extends ConfigBase<IGoodsTableElement> {
	constructor() {
		super(EXCELDATA);
	}

}