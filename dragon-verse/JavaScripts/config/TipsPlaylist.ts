import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","environment"],["","",""],[1,null,0],[2,null,0],[3,null,0],[4,null,0],[5,null,0],[6,null,0]];
export interface ITipsPlaylistElement extends IElementBase{
 	/**undefined*/
	id:number
	/**播报内容（多语言表key）*/
	content:string
	/**播报对应环境（0：主世界
其他：场景表id）*/
	environment:number
 } 
export class TipsPlaylistConfig extends ConfigBase<ITipsPlaylistElement>{
	constructor(){
		super(EXCELDATA);
	}

}