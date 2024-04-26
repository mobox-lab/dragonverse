import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content"],["","Language"],[1,"Tiptext001"],[2,"Tiptext002"],[3,"Tiptext003"],[4,"Tiptext004"],[5,"Tiptext005"],[6,"Tiptext006"]];
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