import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Info","Icon1","Icon2","Effect"],["","","","",""],[1,"金币","176424","176411","176198"],[2,"钻石","176405","176435","176201"],[3,"第二世界金币","176434","176404","176198"],[4,"第三世界金币","176416","176389","176198"]];
export interface ICoinsElement extends IElementBase{
 	/**id*/
	id:number
	/**货币说明*/
	Info:string
	/**货币图标：倾斜，用于主界面*/
	Icon1:string
	/**货币图标：正面，用于分隔墙*/
	Icon2:string
	/**对应特效资源*/
	Effect:string
 } 
export class CoinsConfig extends ConfigBase<ICoinsElement>{
	constructor(){
		super(EXCELDATA);
	}

}