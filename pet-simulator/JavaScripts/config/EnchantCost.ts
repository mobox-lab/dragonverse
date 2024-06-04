import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","EnchantCnt","CostDiamond","Notice"],["","","",""],[1,0,5000,null],[2,1,5000,null],[3,2,6000,null],[4,3,7000,null],[5,4,8000,null],[6,5,10000,null],[7,6,12000,null],[8,7,14000,null],[9,8,16000,null],[10,9,20000,null],[11,10,20000,"附魔次数>=这个的花费都为这个"]];
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