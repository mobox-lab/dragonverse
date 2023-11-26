import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","icon"],["","Language","Language",""],[1,"TestBagItemName0001","TestBagItemDesc0001","37708"],[2,"DragonFruit","火龙果","0"]];
export interface IBagItemElement extends IElementBase{
 	/**背包物品 ID*/
	id:number
	/**名称*/
	name:string
	/**描述*/
	desc:string
	/**图标*/
	icon:string
 } 
export class BagItemConfig extends ConfigBase<IBagItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}