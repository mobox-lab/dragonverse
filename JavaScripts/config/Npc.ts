import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","characterId","avatar","position","rotation","greetNodeId","npcAction","basicActions"],["","","","","","","",""],[1,2,"723501EC429CA23BA0FC0B8185AE710E",new mw.Vector(87,-17132,1176),new mw.Vector(0,0,270),2,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[2,3,"43336D6746AA1D10AB1672B4ACDB8902",new mw.Vector(5860,-19235,1442),new mw.Vector(0,0,225),10,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[3,4,"2CD618014A460C32BEB18AB6E7AA7593",new mw.Vector(5140,-20460,1332),new mw.Vector(0,0,135),26,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[4,5,"E3BA5D7A4CE2021868965E85D54839F0",new mw.Vector(2859,-20882,1240),new mw.Vector(0,0,90),42,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[5,6,"13934140465336A72C371AA747D7C6C7",new mw.Vector(-1009,-7528,760),new mw.Vector(0,0,115),81,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[6,7,"DF2FF85C48B4DD2998A4AF852A596BAC",new mw.Vector(4689,6551,1605),new mw.Vector(0,0,225),86,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[7,8,"B89E24A84196FDA7DAF70FB2F1FB8824",new mw.Vector(-5059,-9845,545),new mw.Vector(0,0,0),96,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]],[8,9,"193FB9E241587FFE5C58389E28C29C8F",new mw.Vector(-12872,3333,2935),new mw.Vector(0,0,0),91,[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"]]];
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