import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_str","foreshow","bornAreaId","sceneEnvId","areaIds","capacity"],["","Language","","","","","",""],[1,"Main_Scene_Name",null,null,0,1,[9],3],[2,"Main_Scene_Name1",null,null,22,2,[21],7],[3,"Main_Scene_Name2",null,null,23,3,[16],7],[4,"Main_Scene_Name3",null,null,24,4,[18,19],7],[5,"Main_Scene_Name4",null,null,25,5,[20],7],[6,"Main_Scene_Name5",null,null,26,6,[15],7],[7,"Main_Scene_Name6",null,null,27,7,[17],10],[8,null,null,null,28,0,null,0],[9,"Main_Scene_Name7",null,null,42,8,null,0],[10,"Main_Scene_Name8",null,null,43,9,null,0],[11,"Main_Scene_Name9",null,null,44,10,null,0],[12,"Main_Scene_Name10",null,null,45,11,null,0],[13,"Main_Scene_Name11",null,null,46,12,null,0],[14,"Main_Scene_Name12",null,null,47,13,null,0],[15,"Main_Scene_Name13",null,null,48,14,null,0],[16,"Main_Scene_Name14",null,null,49,15,null,0],[17,"Main_Scene_Name15",null,null,50,16,null,0],[18,"Main_Scene_Name16",null,null,51,17,null,0],[19,"Main_Scene_Name17",null,null,52,18,null,0],[20,"Main_Scene_Name18",null,null,53,19,null,0],[21,"Main_Scene_Name19",null,null,54,20,null,0]];
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