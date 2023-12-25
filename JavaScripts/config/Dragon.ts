import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","avatar","elementalId","qualityId","areaIds","existenceTime","generationInterval","hitPoint","cost"],["","","","","","","","",""],[1,"0CE65651422E71E84423E681142A581F",1,1,[2,4,6,8,10],240,120,1,1],[2,"F9F4398349B6D10C043C4F92C0A58C6E",2,1,[2,4,6,8,10],240,120,1,1],[3,"959D53384BD302DD4AA78B9E7FA077FE",3,1,[2,4,6,8,10],240,120,1,1],[4,"212B5FEC4468537FB2D4BC9FB3C853FD",4,1,[2,4,6,8,10],240,120,1,1]];
export interface IDragonElement extends IElementBase{
 	/**ID*/
	id:number
	/**形象*/
	avatar:string
	/**元素 ID*/
	elementalId:number
	/**品质 ID*/
	qualityId:number
	/**生成区域 ID 集合*/
	areaIds:Array<number>
	/**存在时间*/
	existenceTime:number
	/**生成间隔*/
	generationInterval:number
	/**可捕捉次数*/
	hitPoint:number
	/**捕捉消耗*/
	cost:number
 } 
export class DragonConfig extends ConfigBase<IDragonElement>{
	constructor(){
		super(EXCELDATA);
	}

}