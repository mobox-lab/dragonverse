import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","ghostID","ghostNumber","passwordNumber","itemIds","isOpenFog","isOpenDarkAngle","lifeNum"],["\n","Language","Language","","","","","","",""],[1,"UI_diffi_01","EXCEL_diffculty_1",1,1,3,[[22,5],[30,1],[37,1],[28,1],[23,1],[43,1]],false,false,5],[2,"UI_diffi_02","EXCEL_diffculty_2",1,1,3,[[22,4],[30,1],[37,1],[28,1],[23,1],[43,1]],false,false,5],[3,"UI_diffi_03","EXCEL_diffculty_3",1,1,3,[[22,3],[30,1],[37,1],[28,1],[23,1],[43,1]],true,false,5],[4,"UI_diffi_04","EXCEL_diffculty_4",1,1,3,[[22,2],[30,1],[37,1],[28,1],[23,1],[43,1]],true,true,5],[5,"UI_diffi_05","EXCEL_diffculty_5",1,1,3,[[30,1],[37,1],[28,1],[23,1],[43,1]],true,true,5]];
export interface IDifficultyElement extends IElementBase{
 	/**ID*/
	id:number
	/**难度名字*/
	name:string
	/**难度说明*/
	desc:string
	/**鬼ID*/
	ghostID:number
	/**鬼数量*/
	ghostNumber:number
	/**密码锁数量*/
	passwordNumber:number
	/**道具表id(id*/
	itemIds:Array<Array<number>>
	/**数量)*/
	isOpenFog:boolean
	/**是否开启雾效*/
	isOpenDarkAngle:boolean
	/**是否开启暗角*/
	lifeNum:number
 } 
export class DifficultyConfig extends ConfigBase<IDifficultyElement>{
	constructor(){
		super(EXCELDATA);
	}

}