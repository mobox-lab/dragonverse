import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","characterId","avatar","position","rotation","greetNodeId","npcAction","basicActions"],["","","","","","","",""],[1,2,null,new mw.Vector(4620,-18620,1500),new mw.Vector(0,0,175),2,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],["14601","14624"]]];
export interface INpcElement extends IElementBase{
 	/**ID*/
	id:number
	/**角色 ID*/
	characterId:number
	/**形象*/
	avatar:string
	/**初始位置*/
	position:mw.Vector
	/**初始旋转*/
	rotation:mw.Vector
	/**招呼*/
	greetNodeId:number
	/**动作事件*/
	npcAction:Array<number>
	/**npc基础动作*/
	basicActions:Array<string>
 } 
export class NpcConfig extends ConfigBase<INpcElement>{
	constructor(){
		super(EXCELDATA);
	}

}