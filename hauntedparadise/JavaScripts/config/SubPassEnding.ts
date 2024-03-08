import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","title","gameTheme","passEndingId"],["","Language","",""],[1,"Ending_school_Title1","School",1000],[2,"Ending_school_Title2","School",2000],[3,"Ending_school_Title3","School",3000],[4,"Ending_Graveyard_Title1","Graveyard",1000],[5,"Ending_hospital_Title1","Hospital",5001],[6,"Ending_hospital_Title2","Hospital",5002],[7,"Ending_hospital_Title3","Hospital",5003],[8,"Ending_hospital_Title4","Hospital",5004],[9,"Ending_Town_Title1","Town",1000],[10,"Ending_Town_Title2","Town",2000],[11,"Ending_Town_Title3","Town",3000]];
export interface ISubPassEndingElement extends IElementBase{
 	/**ID*/
	id:number
	/**结局标题多语言的key*/
	title:string
	/**游戏主题*/
	gameTheme:string
	/**各结局的通关Id*/
	passEndingId:number
 } 
export class SubPassEndingConfig extends ConfigBase<ISubPassEndingElement>{
	constructor(){
		super(EXCELDATA);
	}

}