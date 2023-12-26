import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonId","bagId","successRateAlgoId"],["","","",""],[1,1,4,2],[2,1,5,3],[3,1,6,4],[4,1,7,5],[5,1,8,6],[6,2,9,2],[7,2,10,3],[8,2,11,4],[9,2,12,5],[10,2,13,6],[11,3,14,2],[12,3,15,3],[13,3,16,4],[14,3,17,5],[15,3,18,6],[16,4,19,2],[17,4,20,3],[18,4,21,4],[19,4,22,5],[20,4,23,6],[21,5,24,0],[22,5,25,0],[23,5,26,0],[24,5,27,0],[25,5,28,0],[26,6,29,0],[27,6,30,0],[28,6,31,0],[29,6,32,0],[30,6,33,0],[31,7,34,0],[32,7,35,0],[33,7,36,0],[34,7,37,0],[35,7,38,0],[36,8,39,0],[37,8,40,0],[38,8,41,0],[39,8,42,0],[40,8,43,0],[41,9,44,0],[42,9,45,0],[43,9,46,0],[44,9,47,0],[45,9,48,0],[46,10,49,0],[47,10,50,0],[48,10,51,0],[49,10,52,0],[50,10,53,0]];
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