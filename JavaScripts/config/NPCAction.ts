import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","icon","type","actionGuid","posOffset","rotation","sendStance","accectStance","circulate","time","talk","identity"],["","","","","","","","","","","","Language"],[1,"132593",1,"14552",null,null,null,null,true,0,102162,"102129"],[2,"132561",1,"14741",null,null,null,null,true,0,102163,"102130"],[3,"132580",1,"29733",null,null,null,null,true,0,102164,"102131"],[4,"132560",1,"122813",null,null,null,null,true,0,102165,"102132"],[5,"132559",1,"123405",null,null,null,null,true,0,102166,"102133"],[6,"132585",1,"124500",null,null,null,null,true,0,102167,"102134"],[7,"132556",1,"125813",null,null,null,null,true,0,102168,"102135"],[8,"132590",1,"124622",null,null,null,null,true,0,102169,"102136"],[9,"132591",1,"122676",null,null,null,null,true,0,102170,"102137"],[10,"132568",1,"123712",null,null,null,null,true,0,102171,"102138"],[11,"132583",1,"122240",null,null,null,null,true,0,102172,"102139"],[12,"132584",1,"123720",null,null,null,null,true,0,102173,"102140"],[13,"132554",1,"123714",null,null,null,null,true,0,102174,"102141"],[14,"132607",1,"129503",null,null,null,null,true,0,102175,"102142"],[15,"132569",1,"129505",null,null,null,null,true,0,102176,"102143"],[16,"34419",1,"14641",null,null,null,null,true,0,102177,"102144"],[17,"35629",1,"15057",null,null,null,null,true,0,102178,"102145"],[18,"35628",1,"14617",null,null,null,null,true,0,102179,"102146"],[19,"35630",1,"14759",null,null,null,null,true,0,102180,"102147"],[20,"34431",1,"14771",null,null,null,null,true,0,102181,"102148"],[21,"35632",1,"14766",null,null,null,null,true,0,102182,"102149"],[22,"34426",1,"15078",null,null,null,null,true,0,102183,"102150"],[23,"34417",1,"14504",null,null,null,null,true,0,102184,"102151"],[24,"34430",1,"14655",null,null,null,null,true,0,102185,"102152"],[25,"34420",3,null,new mw.Vector(0,0,40),new mw.Vector(0,0,180),"14703","14765",false,1,102186,"102153"],[26,"137647",3,null,new mw.Vector(0,100,0),new mw.Vector(0,0,0),"124192","124194",false,8,102187,"102154"],[27,"137650",3,null,new mw.Vector(0,0,150),new mw.Vector(0,0,180),"84920","84920",false,3,102188,"102155"],[28,"137656",3,null,new mw.Vector(0,0,100),new mw.Vector(0,0,180),"125813","125813",false,3,102189,"102156"],[29,"137656",3,null,new mw.Vector(0,0,0),new mw.Vector(0,0,0),"135368","135370",false,3.37,102190,"102157"]];
export interface INPCActionElement extends IElementBase{
 	/**ID*/
	id:number
	/**动作icon*/
	icon:string
	/**动作类型
1：npc单人动作
2：npc单人姿态
3：npc双人动作
4：npc双人姿态*/
	type:number
	/**动作、姿态guid*/
	actionGuid:string
	/**接收者位置偏移*/
	posOffset:mw.Vector
	/**接收者旋转偏移*/
	rotation:mw.Vector
	/**发起者动作、姿态*/
	sendStance:string
	/**接收者动作、姿态*/
	accectStance:string
	/**是否循环*/
	circulate:boolean
	/**动作时间*/
	time:number
	/**npc气泡语*/
	talk:number
	/**动作名称*/
	identity:string
 } 
export class NPCActionConfig extends ConfigBase<INPCActionElement>{
	constructor(){
		super(EXCELDATA);
	}

}