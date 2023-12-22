import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","characterId","avatar","position","rotation","greetNodeId","npcAction","basicActions"],["","","","","","","",""],[1,2,"0CE65651422E71E84423E681142A581F",new mw.Vector(4620,-18620,1500),new mw.Vector(0,0,175),2,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[2,3,"959D53384BD302DD4AA78B9E7FA077FE",new mw.Vector(5860,-19235,1442),new mw.Vector(0,0,45),10,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[3,4,"F9F4398349B6D10C043C4F92C0A58C6E",new mw.Vector(5140,-20460,1332),new mw.Vector(0,0,175),26,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[4,5,"212B5FEC4468537FB2D4BC9FB3C853FD",new mw.Vector(2943,-20961,1219),new mw.Vector(0,0,250),42,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]]];
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