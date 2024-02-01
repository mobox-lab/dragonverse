import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Info","price","buyCount","title"],["","","","","Language"],[1,"3次战斗机会",30,3,"Battle_Times_1"],[2,"6次战斗机会",60,6,"Battle_Times_1"],[3,"10次战斗机会",90,10,"Battle_Times_1"]];
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