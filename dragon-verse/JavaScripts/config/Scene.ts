import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_str","foreshow","bornAreaId","sceneEnvId","areaIds","capacity"],["","Language","","Tiptext007","","","",""],[1,"Main_Scene_Name",null,"Tiptext007",0,1,[9],3],[2,"Main_Scene_Name1",null,"Tiptext007",22,2,[21],8],[3,"Main_Scene_Name2",null,"Tiptext007",23,3,[16],8],[4,"Main_Scene_Name3",null,"Tiptext007",24,4,[18],4],[5,"Main_Scene_Name4",null,"Tiptext007",25,5,[20],7],[6,"Main_Scene_Name5",null,"Tiptext007",26,6,[15],8],[7,"Main_Scene_Name6",null,"Tiptext007",27,7,[17],10],[8,null,null,"Tiptext007",28,0,null,0],[9,"Main_Scene_Name7",null,"Tiptext007",42,8,[55],7],[10,"Main_Scene_Name8",null,"Tiptext007",43,9,[56],8],[11,"Main_Scene_Name9",null,"Tiptext007",44,10,[57],7],[12,"Main_Scene_Name10",null,"Tiptext007",45,11,[58],7],[13,"Main_Scene_Name11",null,"Tiptext007",46,12,[59],10],[14,"Main_Scene_Name13",null,"Tiptext007",47,13,[60],10],[15,"Main_Scene_Name14",null,"Tiptext007",48,14,[61],10],[16,"Main_Scene_Name15",null,"Tiptext007",49,15,[62],7],[17,"Main_Scene_Name16",null,"Tiptext007",50,16,[63],8],[18,"Main_Scene_Name17",null,"Tiptext007",51,17,[64],7],[19,"Main_Scene_Name18",null,"Tiptext007",52,18,[65],7],[20,"Main_Scene_Name19",null,"Tiptext007",53,19,[66],7],[21,"Main_Scene_Name20",null,"Tiptext007",54,20,[67],7],[22,"Main_Scene_Name21",null,"Tiptext007",84,21,[68],8],[23,"Main_Scene_Name22",null,"Tiptext007",85,22,[69],4],[24,"Main_Scene_Name23",null,"Tiptext007",86,23,[70],6],[25,"Main_Scene_Name24",null,"Tiptext007",87,24,[71],6],[26,"Main_Scene_Name25",null,"Tiptext007",88,25,[72],8],[27,"Main_Scene_Name26",null,"Tiptext007",89,26,[73],6],[28,"Main_Scene_Name27",null,"Tiptext007",90,27,[74],8],[29,"Main_Scene_Name28",null,"Tiptext007",91,28,[75],8],[30,"Main_Scene_Name29",null,"Tiptext007",92,29,[76],8],[31,"Main_Scene_Name30",null,"Tiptext007",93,30,[77],6],[32,"Main_Scene_Name31",null,"Tiptext007",94,31,[78],6],[33,"Main_Scene_Name32",null,"Tiptext007",95,32,[79],4],[34,"Main_Scene_Name33",null,"Tiptext007",96,33,[80],8],[35,"Main_Scene_Name34",null,"Tiptext007",97,34,[81],8]];
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