import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","avatar","elementalId","qualityId","areaIds","existenceTime","generationInterval","hitPoint","cost"],["","","","","","","","",""],[1,"0CE65651422E71E84423E681142A581F",1,1,[2,4,6,8,10],240,120,1,1],[2,"F9F4398349B6D10C043C4F92C0A58C6E",2,1,[2,4,6,8,10],240,120,1,1],[3,"959D53384BD302DD4AA78B9E7FA077FE",3,1,[2,4,6,8,10],240,120,1,1],[4,"212B5FEC4468537FB2D4BC9FB3C853FD",4,1,[2,4,6,8,10],240,120,1,1],[5,"35F0979C4331DD6FFDBEAABB24D0292C",1,3,null,0,0,0,0],[6,"0B661B284320AF4FC8C0F89FB6124BE8",2,3,null,0,0,0,0],[7,"D51ECB7946B438A5D8F74AABBE659AB2",3,3,null,0,0,0,0],[8,"2EAB1D894378E985A2EA22B7ACCAE898",4,3,null,0,0,0,0],[9,"929EA0DB4E409DC4077786928E8697C6",5,3,null,0,0,0,0],[10,"FEDAA94940BE9848E3F4AFA07FDE3226",6,3,null,0,0,0,0]];
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