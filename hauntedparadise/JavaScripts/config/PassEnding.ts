import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","title","content","endingSound","expMul","needTime"],["","Language","Language","","",""],[1000,"Ending_Graveyard_Title1","Ending_Graveyard_Content1","135161",0.9,20],[2000,"Ending_Graveyard_Title2","Ending_Graveyard_Content2","135161",1,20]];
export interface IPassEndingElement extends IElementBase{
 	/**ID*/
	id:number
	/**结局标题多语言的key*/
	title:string
	/**结局内容多语言的key*/
	content:string
	/**结局音效*/
	endingSound:string
	/**经验倍率*/
	expMul:number
	/**预计通关时长（分钟）*/
	needTime:number
 } 
export class PassEndingConfig extends ConfigBase<IPassEndingElement>{
	constructor(){
		super(EXCELDATA);
	}

}