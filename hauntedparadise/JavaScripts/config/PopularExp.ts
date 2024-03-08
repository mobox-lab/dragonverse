import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","level","charmVal"],["","",""],[1,1,100],[2,2,300],[3,3,500],[4,4,1000],[5,5,2000],[6,6,5000],[7,7,10000],[8,8,20000],[9,9,50000]];
export interface IPopularExpElement extends IElementBase{
 	/**id*/
	id:number
	/**等级*/
	level:number
	/**鬼魅值*/
	charmVal:number
 } 
export class PopularExpConfig extends ConfigBase<IPopularExpElement>{
	constructor(){
		super(EXCELDATA);
	}

}