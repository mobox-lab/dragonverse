import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","EnchantCnt","CostDiamond","Notice"],["","","",""],[1,0,8000,null],[2,1,8000,null],[3,2,20000,null],[4,3,24000,null],[5,4,29000,null],[6,5,35000,null],[7,6,42000,null],[8,7,50000,null],[9,8,60000,null],[10,9,72000,null],[11,10,72000,"附魔次数>=这个的花费都为这个"]];
export interface IEnchantCostElement extends IElementBase{
 	/**附魔花费id*/
	id:number
	/**已附魔次数*/
	EnchantCnt:number
	/**附魔花费（钻石）*/
	CostDiamond:number
	/**备注*/
	Notice:string
 } 
export class EnchantCostConfig extends ConfigBase<IEnchantCostElement>{
	constructor(){
		super(EXCELDATA);
	}

}