import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Factor"],["",""],[1,1],[2,1.2],[3,1.4],[4,1.6],[5,2],[6,2.2],[7,2.4],[8,2.6],[9,2.8],[10,3]];
export interface IMultipleKillElement extends IElementBase{
 	/**ID(即连杀数量)*/
	ID:number
	/**修为奖励系数*/
	Factor:number
 } 
export class MultipleKillConfig extends ConfigBase<IMultipleKillElement>{
	constructor(){
		super(EXCELDATA);
	}

}