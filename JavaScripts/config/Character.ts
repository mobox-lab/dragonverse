import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","originPainting"],["","",""],[1,"Me",null]];
export interface ICharacterElement extends IElementBase{
 	/**ID*/
	id:number
	/**名称*/
	name:string
	/**立绘*/
	originPainting:string
 } 
export class CharacterConfig extends ConfigBase<ICharacterElement>{
	constructor(){
		super(EXCELDATA);
	}

}