import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","guid"],["",""],[1001,"022EE7E54467CD8437DB52BB14795CE2"]];
export interface IAirdropElement extends IElementBase{
 	/**id*/
	id:number
	/**空投Guid*/
	guid:string
 } 
export class AirdropConfig extends ConfigBase<IAirdropElement>{
	constructor(){
		super(EXCELDATA);
	}

}