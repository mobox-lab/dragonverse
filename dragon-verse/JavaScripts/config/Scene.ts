import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_str","foreshow","bornAreaId","sceneEnvId","areaIds","capacity"],["","Language","","Tiptext007","","","",""],[1,"Main_Scene_Name",null,"Tiptext007",0,1,[9],3],[2,"Main_Scene_Name1",null,"Tiptext007",22,2,[21],7],[3,"Main_Scene_Name2",null,"Tiptext007",23,3,[16],7],[4,"Main_Scene_Name3",null,"Tiptext007",24,4,[18],7],[5,"Main_Scene_Name4",null,"Tiptext007",25,5,[20],7],[6,"Main_Scene_Name5",null,"Tiptext007",26,6,[15],7],[7,"Main_Scene_Name6",null,"Tiptext007",27,7,[17],10],[8,null,null,"Tiptext007",28,0,null,0],[9,"Main_Scene_Name7",null,"Tiptext007",42,8,[55],7],[10,"Main_Scene_Name8",null,"Tiptext007",43,9,[56],7],[11,"Main_Scene_Name9",null,"Tiptext007",44,10,[57],7],[12,"Main_Scene_Name10",null,"Tiptext007",45,11,[58],7],[13,"Main_Scene_Name11",null,"Tiptext007",46,12,[59],10],[14,"Main_Scene_Name13",null,"Tiptext007",47,13,[60],10],[15,"Main_Scene_Name14",null,"Tiptext007",48,14,[61],10],[16,"Main_Scene_Name15",null,"Tiptext007",49,15,[62],7],[17,"Main_Scene_Name16",null,"Tiptext007",50,16,[63],7],[18,"Main_Scene_Name17",null,"Tiptext007",51,17,[64],7],[19,"Main_Scene_Name18",null,"Tiptext007",52,18,[65],7],[20,"Main_Scene_Name19",null,"Tiptext007",53,19,[66],7],[21,"Main_Scene_Name20",null,"Tiptext007",54,20,[67],7],[22,"Main_Scene_Name21",null,"Tiptext007",68,21,[68],7],[23,"Main_Scene_Name22",null,"Tiptext007",69,22,[69],7],[24,"Main_Scene_Name23",null,"Tiptext007",70,23,[70],7],[25,"Main_Scene_Name24",null,"Tiptext007",71,24,[71],7],[26,"Main_Scene_Name25",null,"Tiptext007",72,25,[72],7],[27,"Main_Scene_Name26",null,"Tiptext007",73,26,[73],7],[28,"Main_Scene_Name27",null,"Tiptext007",74,27,[74],7],[29,"Main_Scene_Name28",null,"Tiptext007",75,28,[75],7],[30,"Main_Scene_Name29",null,"Tiptext007",76,29,[76],7],[31,"Main_Scene_Name30",null,"Tiptext007",77,30,[77],7],[32,"Main_Scene_Name31",null,"Tiptext007",78,31,[78],7],[33,"Main_Scene_Name32",null,"Tiptext007",79,32,[79],7]];
export interface ISceneElement extends IElementBase{
 	/**undefined*/
	id:number
	/**场景名称（多语言表key）（1是主场景）*/
	name:string
	/**VIEW_ONLY 不要更改或使用此列*/
	name_str:string
	/**奶牛关传送播报（多语言表key）*/
	foreshow:string
	/**出生点区域 ID*/
	bornAreaId:number
	/**场景环境 ID*/
	sceneEnvId:number
	/**所含龙生成区域 ID*/
	areaIds:Array<number>
	/**龙承载容量*/
	capacity:number
 } 
export class SceneConfig extends ConfigBase<ISceneElement>{
	constructor(){
		super(EXCELDATA);
	}

}