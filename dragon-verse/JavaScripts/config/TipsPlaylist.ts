import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content"],["","Language"],[1,null],[2,null],[3,null],[4,null],[5,null],[6,null]];
export interface ITipsPlaylistElement extends IElementBase{
 	/**undefined*/
	id:number
	/**播报内容（多语言表key）*/
	content:string
 } 
export class TipsPlaylistConfig extends ConfigBase<ITipsPlaylistElement>{
	constructor(){
		super(EXCELDATA);
	}

}