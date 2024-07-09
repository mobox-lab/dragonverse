import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","effectGuid","slot","nameCN","circulate","location"],["","","","","",""],[1,null,10,"炫酷的特效",1,["10","10","100"]]];
export interface ILevelEffectElement extends IElementBase{
 	/**特效id*/
	id:number
	/**特效对应预制体guid*/
	effectGuid:string
	/**挂载节点*/
	slot:number
	/**名字备注*/
	nameCN:string
	/**如果预制体内存在特效，是否循环播放*/
	circulate:number
	/**特效相对于挂载节点位置*/
	location:Array<string>
 } 
export class LevelEffectConfig extends ConfigBase<ILevelEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}