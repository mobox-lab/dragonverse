import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","bagId","qualityId","generationAreaId","existenceCount","existenceTime","generationInterval","successRate","hitPoint","resultAlgo"],["","","","","","","","","",""]];
export interface ICollectibleItemElement extends IElementBase{
 	/**采集物品 ID*/
	id:number
	/**背包物 ID*/
	bagId:number
	/**品质 ID*/
	qualityId:number
	/**生成区域 ID*/
	generationAreaId:Array<number>
	/**最大存在数量*/
	existenceCount:number
	/**存在时间（秒 Sec）*/
	existenceTime:number
	/**生成间隔（秒 Sec）*/
	generationInterval:number
	/**采集成功率（%）*/
	successRate:number
	/**可采集次数*/
	hitPoint:number
	/**采集结果算法 ID*/
	resultAlgo:number
 } 
export class CollectibleItemConfig extends ConfigBase<ICollectibleItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}