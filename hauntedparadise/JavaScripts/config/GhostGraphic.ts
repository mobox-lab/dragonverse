import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","appearanceId","graphicLevel","apprance","scale","runAni","idleAni","chaseAni","watchAni","attackAni","carAni","CarIdleAni","attackDelayUI","hotHit","meleeHit","dizAni","deathAni","stopTime","offset"],["","","","","","","","","","","","","","","","","","",""],[1,1,3,"86DC3418436A54A579AE4793ED6AD5C7",1,"14500","14500","14500","14515","14515","14653","181191",0.6,"97861","97861","46283","52998",1.5,new mw.Vector(65,0,0)],[2,1,2,"5D75018D4FBD126ADBB2F08E1B563A2D",1,"14500","14500","14500","14515","14515","14653","181191",0.6,"97861","97861","46283","52998",1.5,new mw.Vector(65,0,0)],[3,1,1,"27DF04E74F6184FFA49A45B47266EF5B",1,"14500","14500","14500","14515","14515","14653","181191",0.6,"97861","97861","46283","52998",1.5,new mw.Vector(65,0,0)]];
export interface IGhostGraphicElement extends IElementBase{
 	/**ID*/
	id:number
	/**外观id*/
	appearanceId:number
	/**对应的画质等级*/
	graphicLevel:number
	/**模型*/
	apprance:string
	/**缩放*/
	scale:number
	/**跑动动画*/
	runAni:string
	/**待机动画*/
	idleAni:string
	/**追逐动画*/
	chaseAni:string
	/**观望动画*/
	watchAni:string
	/**攻击动画*/
	attackAni:string
	/**推车动画*/
	carAni:string
	/**推车待机动画*/
	CarIdleAni:string
	/**碎屏UI显示时间*/
	attackDelayUI:number
	/**热武器动画*/
	hotHit:string
	/**冷兵器击中动画*/
	meleeHit:string
	/**眩晕动画*/
	dizAni:string
	/**玩家死亡动画*/
	deathAni:string
	/**玩家死亡动画停止时间*/
	stopTime:number
	/**攻击的时候的偏移*/
	offset:mw.Vector
 } 
export class GhostGraphicConfig extends ConfigBase<IGhostGraphicElement>{
	constructor(){
		super(EXCELDATA);
	}

}