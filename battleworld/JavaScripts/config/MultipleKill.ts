import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Factor"],["",""],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1]];
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