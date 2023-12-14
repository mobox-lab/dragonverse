import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","avatar","elementalId","qualityId","areaIds","existenceTime","generationInterval","hitPoint","cost"],["","","","","","","","",""],[1,"0",1,1,[1],300,80,1,10],[2,"0",2,1,[1],300,80,1,10],[3,"0",3,1,[1],300,80,1,10],[4,"0",4,1,[1],300,80,1,10]];
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