import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Info","price","buyCount","title"],["","","","","Language"],[1,"10娃娃机币",30,10,"Task_shop_16"],[2,"35娃娃机币",100,35,"Task_shop_16"],[3,"70娃娃机币",200,70,"Task_shop_16"],[4,"150娃娃机币",400,150,"Task_shop_16"],[5,"270娃娃机币",700,270,"Task_shop_16"],[6,"400娃娃机币",1000,400,"Task_shop_16"]];
export interface IGoodsTableElement extends IElementBase{
 	/**undefined*/
	id:number
	/**内容说明策划用*/
	Info:string
	/**mobox币价格*/
	price:number
	/**兑换数量*/
	buyCount:number
	/**item标题*/
	title:string
 } 
export class GoodsTableConfig extends ConfigBase<IGoodsTableElement>{
	constructor(){
		super(EXCELDATA);
	}

}