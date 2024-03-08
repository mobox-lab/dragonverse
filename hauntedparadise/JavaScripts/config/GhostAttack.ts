import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","json","dis","cd","force"],["","","","",""],[1,"{\"charFightIdelAniId\":\"108371\",\"charFightIdelSlot\":\"2\",\"autoFocus\":\"0\",\"autoFocusRadius\":\"500\",\"autoFocusAngle\":\"90\",\"autoFocusDistFactor\":\"1\",\"infos\":[{\"type\":\"7\",\"duration\":\"1000\",\"frontRockLength\":\"1000\",\"isCharge\":\"0\",\"isAutoPlay\":\"0\",\"chargeTime\":[\"-1\",\"-1\",\"-1\"]},{\"type\":\"1\",\"guid\":\"14515\",\"slotIndex\":\"0\",\"duration\":\"1000\",\"rate\":\"1\",\"delayPlayTime\":\"0\",\"loop\":\"0\",\"hitLength\":\"300\",\"frontRockLength\":\"0\",\"isCharge\":\"0\",\"isAutoPlay\":\"0\"},{\"type\":\"5\",\"skillIndex\":\"10\",\"skillAngle\":\"0\",\"offsetPos\":[\"-100\",\"0\",\"0\"],\"skillRadius\":\"0\",\"skillHeight\":\"200\",\"skillLength\":\"250\",\"skillWidth\":\"200\",\"delayPlayTime\":\"200\"},{\"type\":\"4\",\"guid\":\"201136\",\"delayPlayTime\":\"0\",\"stopTime\":\"1000\"}]}",150,1.2,new mw.Vector(500,0,200)]];
export interface IGhostAttackElement extends IElementBase{
 	/**id*/
	id:number
	/**鬼的json*/
	json:string
	/**判断距离*/
	dis:number
	/**冷却时间*/
	cd:number
	/**冲量大小*/
	force:mw.Vector
 } 
export class GhostAttackConfig extends ConfigBase<IGhostAttackElement>{
	constructor(){
		super(EXCELDATA);
	}

}