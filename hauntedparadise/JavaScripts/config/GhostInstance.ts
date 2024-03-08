import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","ghostId","treeName","photoTag","hp","relifeTime","skills","dmg","stayTime","patrols","appearanceId","triggerGuid"],["","","","","","","","","","","",""],[7,1,"BindPlayerGhost","shadow",1010,10,[1],20,2,[new mw.Vector(-175,-4506,2431),new mw.Vector(805,-4006,4531),new mw.Vector(0,-5806,5531),new mw.Vector(-500,-2306,7531),new mw.Vector(-2555,-9896,8531),new mw.Vector(1205,-4506,6531),new mw.Vector(-555,-5506,3531),new mw.Vector(-1555,-3806,2431)],1,null]];
export interface IGhostInstanceElement extends IElementBase{
 	/**undefined*/
	id:number
	/**鬼的配置信息*/
	ghostId:number
	/**使用的行为树的名字*/
	treeName:string
	/**undefined*/
	photoTag:string
	/**鬼的生命值*/
	hp:number
	/**复活时间*/
	relifeTime:number
	/**技能组*/
	skills:Array<number>
	/**伤害值*/
	dmg:number
	/**眩晕时长*/
	stayTime:number
	/**巡逻点(鬼会从第一个巡逻点出生，逐步移动)*/
	patrols:mw.Vector[]
	/**外观id*/
	appearanceId:number
	/**undefined*/
	triggerGuid:string
 } 
export class GhostInstanceConfig extends ConfigBase<IGhostInstanceElement>{
	constructor(){
		super(EXCELDATA);
	}

}