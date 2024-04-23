import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonId","bagId","successRateAlgoId"],["","","",""],[1,1,4,2],[2,2,5,3],[3,3,6,4],[4,4,7,5],[5,5,8,6],[6,6,9,2],[7,7,10,3],[8,8,11,4],[9,9,12,5],[10,10,13,6],[11,11,14,2],[12,12,15,3],[13,13,16,4],[14,14,17,5],[15,15,18,6],[16,16,19,2],[17,17,20,3],[18,18,21,4],[19,19,22,5],[20,20,23,6],[21,21,24,0],[22,22,25,0],[23,23,26,0],[24,24,27,0],[25,25,28,0],[26,26,29,0],[27,27,30,0],[28,28,31,0],[29,29,32,0],[30,30,33,0],[31,31,34,0],[32,32,35,0],[33,33,36,0],[34,34,37,0],[35,35,38,0],[36,36,39,0],[37,37,40,0],[38,38,41,0],[39,39,42,0],[40,40,43,0],[41,41,44,0],[42,42,45,0]];
export interface ICharacterfulDragonElement extends IElementBase{
 	/**ID*/
	id:number
	/**龙基 ID*/
	dragonId:number
	/**背包物 ID*/
	bagId:number
	/**捕捉成功率算法*/
	successRateAlgoId:number
 } 
export class CharacterfulDragonConfig extends ConfigBase<ICharacterfulDragonElement>{
	constructor(){
		super(EXCELDATA);
	}

}