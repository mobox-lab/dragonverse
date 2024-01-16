import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","avatar","elementalId","qualityId","areaIds","firstGenerateCd","existenceTime","generationInterval","hitPoint","cost","wingGuid","wingTransform"],["","","","","","","","","","","",""],[1,"0CE65651422E71E84423E681142A581F",1,1,[2,4,6,8,10],0,240,120,1,1,"42825",[[0,0.96,0],[0,0,90],[1,1,1]]],[2,"F9F4398349B6D10C043C4F92C0A58C6E",2,1,[2,4,6,8,10],10,240,120,1,1,"136963",[[0,0,-10],[0,0,180],[1,1,1]]],[3,"959D53384BD302DD4AA78B9E7FA077FE",3,1,[2,4,6,8,10],60,240,120,1,1,"42813",[[0,0,0],[0,0,90],[1,1,1]]],[4,"212B5FEC4468537FB2D4BC9FB3C853FD",4,1,[2,4,6,8,10],30,240,120,1,1,"42829",[[0,0,0],[0,0,90],[1,1,1]]],[5,"35F0979C4331DD6FFDBEAABB24D0292C",1,3,null,0,0,0,0,0,"145913",[[0,0,0],[0,0,90],[1,1,1]]],[6,"0B661B284320AF4FC8C0F89FB6124BE8",2,3,null,0,0,0,0,0,"145906",[[0,0,-40],[0,0,90],[0.7,0.7,0.7]]],[7,"D51ECB7946B438A5D8F74AABBE659AB2",3,3,null,0,0,0,0,0,"177589",[[0,0,0],[0,0,90],[0.7,0.7,0.7]]],[8,"2EAB1D894378E985A2EA22B7ACCAE898",4,3,null,0,0,0,0,0,"42828",[[0,0,0],[0,0,90],[0.8,0.8,0.8]]],[9,"929EA0DB4E409DC4077786928E8697C6",5,3,null,0,0,0,0,0,"42812",[[0,0,0],[0,0,90],[1,1,1]]],[10,"FEDAA94940BE9848E3F4AFA07FDE3226",6,3,null,0,0,0,0,0,"136958",[[0,0,0],[0,0,180],[0.6,0.6,0.6]]]];
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
	/**首次生成冷却 秒 Sec*/
	firstGenerateCd:number
	/**存在时间 秒 Sec*/
	existenceTime:number
	/**生成间隔 秒 Sec*/
	generationInterval:number
	/**可捕捉次数*/
	hitPoint:number
	/**捕捉消耗*/
	cost:number
	/**翅膀guid*/
	wingGuid:string
	/**翅膀相对位置||旋转||缩放*/
	wingTransform:Array<Array<number>>
 } 
export class DragonConfig extends ConfigBase<IDragonElement>{
	constructor(){
		super(EXCELDATA);
	}

}