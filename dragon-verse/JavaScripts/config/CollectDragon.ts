import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonId","generationAreaId","existenceTime","generationInterval","hitPoint","cost","successRateAlgoId"],["","","","","","","",""],[1,1,[0,0],300,80,10,1,0]];
export interface ICollectDragonElement extends IElementBase{
 	/**undefined*/
	id:number
	/**undefined*/
	dragonId:number
	/**生成区域 ID*/
	generationAreaId:Array<number>
	/**存在时间*/
	existenceTime:number
	/**生成间隔*/
	generationInterval:number
	/**可捕捉次数*/
	hitPoint:number
	/**捕捉消耗*/
	cost:number
	/**捕捉成功率算法*/
	successRateAlgoId:number
 } 
export class CollectDragonConfig extends ConfigBase<ICollectDragonElement>{
	constructor(){
		super(EXCELDATA);
	}

}