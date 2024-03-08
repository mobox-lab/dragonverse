import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","backup","type","duration","value"],["","Language","","","",""],[1,"双倍经验卡 ","持续时间单位：天 ",1,1,2],[2,"双倍经验卡 ","持续时间单位：天 ",1,3,2],[3,"双倍经验卡 ","持续时间单位：天 ",1,7,2],[4,"三倍经验卡 ","持续时间单位：天 ",1,1,3]];
export interface IBuffElement extends IElementBase{
 	/**id*/
	id:number
	/**名字*/
	name:string
	/**备注 */
	backup:string
	/**类型：
1.经验卡（天数） */
	type:number
	/**持续时间 */
	duration:number
	/**效果值 */
	value:number
 } 
export class BuffConfig extends ConfigBase<IBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}