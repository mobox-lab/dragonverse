import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","bagId","qualityId","areaIds","prefabGuid","existenceCount","existenceTime","generationInterval","successRate","hitPoint","resultAlgo"],["","","","","","","","","","",""],[1,1,2,[1,3,5,7,9,11],"19864DB9433C12B44D2F95BE76825159",12,240,120,75,1,1],[2,2,1,[1,3,5,7,9,11],"FB8A97A4467717F1B31D30BB00E15279",12,240,120,75,1,1],[3,3,1,[1,3,5,7,9,11],"91ADF0AB4F8ECC6BC0BC8BABA83214F8",12,240,120,75,1,1]];
export interface ICollectibleItemElement extends IElementBase{
 	/**采集物品 ID*/
	id:number
	/**背包物 ID*/
	bagId:number
	/**品质 ID*/
	qualityId:number
	/**生成区域 ID 集合*/
	areaIds:Array<number>
	/**预制体 Guid*/
	prefabGuid:string
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