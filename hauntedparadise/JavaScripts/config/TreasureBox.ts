import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","itemID","boxID","weight","enable"],["","","","",""],[1,null,0,0,null]];
export interface ITreasureBoxElement extends IElementBase{
 	/**ID*/
	id:number
	/**道具ID*/
	itemID:Array<Array<number>>
	/**宝箱id*/
	boxID:number
	/**奖品权重*/
	weight:number
	/**是否进入奖池*/
	enable:boolean
 } 
export class TreasureBoxConfig extends ConfigBase<ITreasureBoxElement>{
	constructor(){
		super(EXCELDATA);
	}

}