import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","foreshow","bornAreaId","sceneEnvId","areaIds","capacity"],["","Language","","","","",""],[1,"Main_Scene_Name",null,0,1,[9],3],[2,"Main_Scene_Name1",null,22,2,[15],7],[3,"Main_Scene_Name2",null,23,3,[17],7],[4,"Main_Scene_Name3",null,24,4,[21],7],[5,"Main_Scene_Name4",null,25,5,[16],7],[6,"Main_Scene_Name5",null,26,6,[20],7],[7,"Main_Scene_Name6",null,27,7,[17],10],[8,null,null,28,0,null,0]];
export interface ISceneElement extends IElementBase{
 	/**undefined*/
	id:number
	/**场景名称（多语言表key）（1是主场景）*/
	name:string
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