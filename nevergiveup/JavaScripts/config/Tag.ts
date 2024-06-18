import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","dialog"],["","Language","Language"],[1,"Text_AttackTagStage1","Tag_dialog_1"],[2,"Text_AttackTagStage2","Tag_dialog_2"],[3,"Text_AttackTagStage3","Tag_dialog_3"],[4,"Text_AttackTagStage4","Tag_dialog_4"]];
export interface ITagElement extends IElementBase{
 	/**关卡id*/
	id:number
	/**名字*/
	name:string
	/**引导对话*/
	dialog:string
 } 
export class TagConfig extends ConfigBase<ITagElement>{
	constructor(){
		super(EXCELDATA);
	}

}