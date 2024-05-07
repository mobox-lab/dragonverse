import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","bornLocation"],["","Language",""],[1,"Main_Scene_Name",null],[2,"Main_Scene_Name1",new mw.Vector(7983.23,1689.94,297205.16)],[3,"Main_Scene_Name2",new mw.Vector(601928.06,598676.88,7547.03)],[4,"Main_Scene_Name3",new mw.Vector(100459,993107.06,6829.08)],[5,"Main_Scene_Name4",new mw.Vector(999049.81,17085.43,5191.43)],[6,"Main_Scene_Name5",new mw.Vector(198270.59,101007.19,627.89)],[7,"Main_Scene_Name6",new mw.Vector(498676.69,50463.05,47427.00)]];
export interface ISceneElement extends IElementBase{
 	/**undefined*/
	id:number
	/**场景名称（多语言表key）*/
	name:string
	/**出生点*/
	bornLocation:mw.Vector
 } 
export class SceneConfig extends ConfigBase<ISceneElement>{
	constructor(){
		super(EXCELDATA);
	}

}