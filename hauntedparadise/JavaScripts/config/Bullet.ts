import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","hitEffect","modelGuid","flySpeed","effectZoom","hitSound","itemId","force","dirZIndex"],["","","","","","","","",""],[1,"98962","3D24184D4DBDA776F5F5829E9192DC88",500,new mw.Vector(1,1,1),1008,1101,100,0.5],[2,"151741","AED3B35141B902502A4BEFB85E797275",100,new mw.Vector(1,1,1),0,0,0,0],[3,"4373","B4DB25074C4994916B91DA9358E064DC",70,new mw.Vector(1,1,1),0,1102,500,0.5],[4,"117228","ADD9AA484B6067DC0309A8AD5B3EB0F4",100,new mw.Vector(1,1,1),0,0,0,0],[5,"121783","5DB168184CEC5E1B24048ABD9C3C1DB1",100,new mw.Vector(1,1,1),0,0,0,0],[6,"4373","7F882C9E42784934C94C59A3921AF8DD",100,new mw.Vector(1,1,1),0,0,0,0],[7,"121783","07E3472C4AB09B8AA2B8A19933C1B83F",100,new mw.Vector(1,1,1),0,0,0,0]];
export interface IBulletElement extends IElementBase{
 	/**id*/
	id:number
	/**命中特效*/
	hitEffect:string
	/**子弹模型*/
	modelGuid:string
	/**飞行速度*/
	flySpeed:number
	/**命中特效缩放*/
	effectZoom:mw.Vector
	/**命中音效*/
	hitSound:number
	/**关联道具表id*/
	itemId:number
	/**力的大小*/
	force:number
	/**力的Z轴方向系数，决定飞向角度（最好在-1~1之间）*/
	dirZIndex:number
 } 
export class BulletConfig extends ConfigBase<IBulletElement>{
	constructor(){
		super(EXCELDATA);
	}

}