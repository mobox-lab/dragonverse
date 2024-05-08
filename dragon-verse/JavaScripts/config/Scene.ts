import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","foreshow","bornAreaId","sceneEnvId","areaIds","capacity"],["","Language","","","","",""],[1,"Main_Scene_Name",null,0,1,null,0],[2,"Main_Scene_Name1",null,0,2,null,0],[3,"Main_Scene_Name2",null,0,3,null,0],[4,"Main_Scene_Name3",null,0,4,null,0],[5,"Main_Scene_Name4",null,0,5,null,0],[6,"Main_Scene_Name5",null,0,6,null,0],[7,"Main_Scene_Name6",null,0,7,null,0],[8,"Main_Scene_Name7",null,0,0,null,0]];
export interface ISceneElement extends IElementBase{
 	/**undefined*/
	id:number
	/**场景名称（多语言表key）*/
	name:string
	/**传送预告内容*/
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