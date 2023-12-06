import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","count","repeat","reward","script"],["","","","","",""],[1,"获取木龙",5,false,[[null]],null]];
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
	reward:Array<Array<number>>
	/**物品数量]
物品id见bag表，填bagid即可*/
	script:string
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}