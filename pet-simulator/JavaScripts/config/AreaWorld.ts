import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","areaArr","imgUI","textUI"],["","","","Language"],[1,[1001,1002,1003,1004,1005,1006,1007,1008,1009,1010],"174823","AreaWorld_textUI_1"],[2,[2001,2002,2003,2004,2005,2006,2007,2008,2009,2010],"174811","AreaWorld_textUI_2"],[3,[3001,3002,3003,3004,3005,3006,3007,3008],"174812","AreaWorld_textUI_3"]];
export interface IAreaWorldElement extends IElementBase{
 	/**ID*/
	id:number
	/**子区域*/
	areaArr:Array<number>
	/**图片guid*/
	imgUI:string
	/**名字*/
	textUI:string
 } 
export class AreaWorldConfig extends ConfigBase<IAreaWorldElement>{
	constructor(){
		super(EXCELDATA);
	}

}