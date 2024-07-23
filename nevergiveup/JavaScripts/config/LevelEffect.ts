import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","effectGuid","slot","nameCN","circulate","location"],["","","","","",""],[1,"E718B09E4408CE5534779780E5365B64",10,"炫酷的特效",true,[10,10,100]],[2,"E141AC6246FA01BC41E98BB4D9423F80",23,null,true,[0,0,100]],[3,"E0D79BB64C2DCD08AEC54388C11A6AE7",23,null,true,[0,0,100]],[4,"1D729A16497C24D2C4B6A9A247F09AE9",23,null,true,[0,0,100]],[5,"C030E576410EBE92DF5FAB83FAFD859A",23,null,true,[-60,0,70]],[6,"1D729A16497C24D2C4B6A9A247F09AE9",23,null,true,[0,0,-25]],[7,"7769FA77488F5E75A8D3B19B260CB297",23,null,true,[-90,0,93]]];
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