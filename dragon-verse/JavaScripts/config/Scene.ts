import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","bornAreaId","sceneEnvId","areaIds","capacity"],["","Language","","","",""],[1,"Main_Scene_Name",22,1,null,0],[2,"Main_Scene_Name1",23,2,[15],7],[3,"Main_Scene_Name2",24,3,[17],7],[4,"Main_Scene_Name3",25,4,[21],7],[5,"Main_Scene_Name4",26,5,[16],7],[6,"Main_Scene_Name5",27,6,[20],7],[7,"Main_Scene_Name6",28,7,[18,19],10],[8,"Main_Scene_Name7",0,8,null,0]];
export interface ISceneElement extends IElementBase{
 	/**undefined*/
	id:number
	/**场景名称（多语言表key）*/
	name:string
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