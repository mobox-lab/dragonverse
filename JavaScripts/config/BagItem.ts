import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","stackCount","icon"],["","Language","","",""],[1,"BagItemName0001","测试用物品",64,"222920"],[2,"DragonFruit","火龙果",999,"0"]];
export interface IBagItemElement extends IElementBase{
 	/**背包物品 ID*/
	id:number
	/**物品名称*/
	name:string
	/**物品描述*/
	desc:string
	/**最大堆叠数量*/
	stackCount:number
	/**icon*/
	icon:string
 } 
export class BagItemConfig extends ConfigBase<IBagItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}