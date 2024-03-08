import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","content","type","guid","pos","rot"],["","","","","","",""],[1,null,null,0,null,null,null]];
export interface IClueElement extends IElementBase{
 	/**id*/
	id:number
	/**名称*/
	name:string
	/**描述*/
	content:string
	/**类型(0是密码碎片)*/
	type:number
	/**预制体guid*/
	guid:string
	/**位置*/
	pos:Vector
	/**旋转*/
	rot:Vector
 } 
export class ClueConfig extends ConfigBase<IClueElement>{
	constructor(){
		super(EXCELDATA);
	}

}