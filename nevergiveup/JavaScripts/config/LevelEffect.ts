import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","effectGuid","slot","nameCN","circulate","location"],["","","","","",""],[1,"E718B09E4408CE5534779780E5365B64",10,"炫酷的特效",true,[10,10,100]],[2,"E141AC6246FA01BC41E98BB4D9423F80E141AC6246FA01BC41E98BB4D9423F80",23,null,true,[0,0,150]],[3,"E0D79BB64C2DCD08AEC54388C11A6AE7E0D79BB64C2DCD08AEC54388C11A6AE7",23,null,true,[0,0,150]]];
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