import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","effectGuid","slot","nameCN","circulate","location"],["","","","","",""],[1,"E718B09E4408CE5534779780E5365B64",10,"炫酷的特效",true,[10,10,100]]];
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
	circulate:boolean
	/**特效相对于挂载节点位置*/
	location:Array<number>
 } 
export class LevelEffectConfig extends ConfigBase<ILevelEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}