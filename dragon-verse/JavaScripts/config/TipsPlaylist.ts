import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","environment"],["","",""],[1,"Tiptext001",0],[2,"Tiptext002",0],[3,"Tiptext003",0],[4,"Tiptext004",0],[5,"Tiptext005",0],[6,"Tiptext006",0]];
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