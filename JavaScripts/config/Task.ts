import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","count","repeat","reward","script"],["","","","","",""],[1,"获取木龙",5,false,[null],"BFA2FBF640BDA222EEB4B9884B78C1B4"],[2,"获取土龙",0,false,null,"D759B111445E9ECDC60E0EB67C073831"]];
export interface ITaskElement extends IElementBase{
 	/**任务 ID*/
	id:number
	/**任务备注*/
	name:string
	/**事件完成次数*/
	count:number
	/**可否重复完成*/
	repeat:boolean
	/**任务完成奖励
格式如下:
[物品id*/
	reward:Array<number>
	/**物品数量]
物品id见bag表，填bagid即可*/
	script:string
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}