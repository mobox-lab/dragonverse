import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","count","repeat","reward","questObjectGuid"],["","","","","",""],[1,"获取木龙",5,false,[[26,1,1]],"BFA2FBF640BDA222EEB4B9884B78C1B4"],[2,"获取火龙",6,false,[[24,1,1]],"0B777B1642A1212E59FA3DA8648142A7"],[3,"获取水龙",1,false,[[25,1,1]],"1BF851F4459908F9C2AAB884763B1750"],[4,"获取土龙",1,false,[[27,1,1]],"D759B111445E9ECDC60E0EB67C073831"],[5,"跑酷",1,false,null,"0F362B364C669123BC0886AEC93884B0"],[6,"光暗龙",1,false,[[28,1,1,29,1,1]],"7949884C461020935235E5834F66108F"]];
export interface ITaskElement extends IElementBase{
 	/**任务 ID*/
	id:number
	/**名称*/
	name:string
	/**子项目数*/
	count:number
	/**可重复性*/
	repeat:boolean
	/**完成奖励*/
	reward:Array<Array<number>>
	/**Quest 物体 Guid*/
	questObjectGuid:string
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}