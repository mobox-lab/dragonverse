import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","characterId","avatar","position","rotation","greetNodeId","npcAction","basicActions","wingGuid","wingTransform"],["","","","","","","","","",""],[2,3,"43336D6746AA1D10AB1672B4ACDB8902",new mw.Vector(5860,-19235,1442),new mw.Vector(0,0,225),130,[1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"],null,null],[3,4,"2CD618014A460C32BEB18AB6E7AA7593",new mw.Vector(5140,-20460,1332),new mw.Vector(0,0,135),131,[1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"],null,null],[4,5,"E3BA5D7A4CE2021868965E85D54839F0",new mw.Vector(2859,-20882,1240),new mw.Vector(0,0,90),132,[1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"],"145910",[[0,0,0],[0,0,180],[1,1,1]]],[5,6,"13934140465336A72C371AA747D7C6C7",new mw.Vector(-1009,-7528,760),new mw.Vector(0,0,130),133,[1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"],null,null],[6,7,"DF2FF85C48B4DD2998A4AF852A596BAC",new mw.Vector(4689,6551,1605),new mw.Vector(0,0,225),134,[1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"],null,null],[7,8,"B89E24A84196FDA7DAF70FB2F1FB8824",new mw.Vector(50059,50845,545),new mw.Vector(0,0,0),135,[1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"],null,null],[8,9,"193FB9E241587FFE5C58389E28C29C8F",new mw.Vector(-12872,3333,2935),new mw.Vector(0,0,0),136,[1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24],["14601","14624"],null,null],[9,10,"C515F42248D3B6522F4AA6BD0517A051",new mw.Vector(-5374,12378,4208),new mw.Vector(0,0,235),137,null,["14601","14624"],null,null]];
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
	/**翅膀guid*/
	wingGuid:string
	/**翅膀相对位置||旋转||缩放*/
	wingTransform:Array<Array<number>>
 } 
export class NpcConfig extends ConfigBase<INpcElement>{
	constructor(){
		super(EXCELDATA);
	}

}