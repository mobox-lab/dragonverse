import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","guid","damage","fireInter","range","bulletLoc","fireEffect","fireSound","bulletID","bulletNum","fireEffRot","fireEffScale","fireEffOffset","shiftTime","shiftMus","force","shakeRotY","shakePosX","shakeTime"],["","Language","","","","","","","","","","","","","","","","","",""],[1,"水枪","122716",45,300,6000,new mw.Vector(-0.16,15.42,4.04),"88793",1006,1,7,[0,0,90],new mw.Vector(0.2,0.2,0.2),new mw.Vector(0,0,0),1,1007,0,-12,-8,300],[2,"步枪","44986",50,1000,6000,new mw.Vector(75,0,12),"4388",1006,2,30,[0,0,90],new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,0),0.5,1007,0,0,0,0],[3,"火箭筒","44994",200,1000,6000,new mw.Vector(75,0,12),"27438",1006,3,3,[0,0,90],new mw.Vector(1,1,1),new mw.Vector(0,0,0),1.5,1007,200,30,-15,200],[4,"恶魔剑","122952",50,1000,6000,new mw.Vector(75,0,12),"4388",1006,4,12,[0,0,90],new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,0),0.5,1007,0,0,0,0],[5,"弓","122947",50,1000,6000,new mw.Vector(0,0,12),"151735",1006,5,30,[0,0,90],new mw.Vector(1,1,1),new mw.Vector(0,0,0),0.5,1007,0,0,0,0],[6,"混沌葫芦","118288",50,1000,6000,new mw.Vector(75,0,12),"27438",1006,6,6,[0,0,90],new mw.Vector(1,1,1),new mw.Vector(0,0,0),3,1007,0,0,0,0],[7,"冰环剑","31734",50,1000,6000,new mw.Vector(75,0,12),"121783",1006,7,30,[0,0,90],new mw.Vector(0.5,0.5,0.5),new mw.Vector(0,0,0),1,1007,0,0,0,0]];
export interface IHotWeaponElement extends IElementBase{
 	/**id*/
	id:number
	/**热武器名*/
	name:string
	/**武器模型guid*/
	guid:string
	/**伤害*/
	damage:number
	/**连续开火时间间隔（毫秒）*/
	fireInter:number
	/**射程*/
	range:number
	/**发射子弹的相对位置*/
	bulletLoc:mw.Vector
	/**开火特效*/
	fireEffect:string
	/**开火音效*/
	fireSound:number
	/**关联子弹表的id*/
	bulletID:number
	/**弹夹子弹数量*/
	bulletNum:number
	/**开火特效相对旋转*/
	fireEffRot:Array<number>
	/**开火特效缩放*/
	fireEffScale:mw.Vector
	/**开火特效偏移*/
	fireEffOffset:mw.Vector
	/**换弹时间/s*/
	shiftTime:number
	/**换弹音效*/
	shiftMus:number
	/**后坐力*/
	force:number
	/**开火相对晃动Y轴旋转*/
	shakeRotY:number
	/**开火相对晃动的X轴位移*/
	shakePosX:number
	/**晃动时间（毫秒）*/
	shakeTime:number
 } 
export class HotWeaponConfig extends ConfigBase<IHotWeaponElement>{
	constructor(){
		super(EXCELDATA);
	}

}