import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonId","bagId","successRateAlgoId"],["","","",""],[1,1,4,1],[2,1,5,1],[3,1,6,1],[4,1,7,1]];
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