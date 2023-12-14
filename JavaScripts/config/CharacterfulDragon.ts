import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonId","bagId","successRateAlgoId"],["","","",""],[1,1,4,1],[2,1,5,2],[3,1,6,3],[4,1,7,4],[5,1,8,5],[6,2,9,1],[7,2,10,2],[8,2,11,3],[9,2,12,4],[10,2,13,5],[11,3,14,1],[12,3,15,2],[13,3,16,3],[14,3,17,4],[15,3,18,5],[16,4,19,1],[17,4,20,2],[18,4,21,3],[19,4,22,4],[20,4,23,5]];
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