import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","EffectID","EffectPoint","EffectLocation","EffectRotate","EffectLarge","EffectTime","Notice"],["","","","","","","",""],[1,"130895",0,new mw.Vector(0,0,10),new mw.Vector(0,0,0),new mw.Vector(4,4,4),1,"破坏物攻击过程中的攻击特效"],[2,"151532",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,1.5),0,"倍率金币堆冒金币特效"],[3,"89563",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),0,"倍率钻石堆冒钻石特效"],[4,"142945",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),0,"扭蛋未解锁时束缚特效"],[5,"3853AC8B",0,new mw.Vector(10,0,0),new mw.Vector(0,0,0),new mw.Vector(0.75,0.75,0.75),0,"彩虹化光环"],[6,"02125D97",0,new mw.Vector(10,0,0),new mw.Vector(0,0,0),new mw.Vector(1.75,1.75,1.75),0,"彩虹化拖尾"],[7,"1042B07B",0,new mw.Vector(30,0,0),new mw.Vector(0,0,0),new mw.Vector(1.25,1.25,1.25),0,"爱心化拖尾"],[8,"73404",0,new mw.Vector(0,0,-20),new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),1,"扭蛋特效"],[9,"151734",0,new mw.Vector(0,0,40),new mw.Vector(0,0,0),new mw.Vector(6,6,6),1,"金币每阶段爆出特效"],[10,"152562",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(5,5,5),1,"破坏物在最后阶段暴击击破的特效"],[11,"173518",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),0,"扭蛋烟花"],[12,"173516",0,new mw.Vector(0,0,0),new mw.Vector(0,0,90),new mw.Vector(3,3,3),0,"扭蛋背景光"],[13,"155715",0,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(4,4,4),1,"金币阶段攻击特效"],[14,"25E0769D",0,new mw.Vector(6,0,6),new mw.Vector(0,0,0),new mw.Vector(1.25,1.25,1.25),0,"爱心挂载"],[15,"20F54133",0,new mw.Vector(15,0,15),new mw.Vector(0,0,-90),new mw.Vector(0.25,0.25,0.25),0,"彩虹挂载"],[16,"02125D97",0,new mw.Vector(10,0,85),new mw.Vector(0,0,0),new mw.Vector(1.75,1.75,1.75),0,"彩虹化拖尾 飞"],[17,"1042B07B",0,new mw.Vector(30,0,85),new mw.Vector(0,0,0),new mw.Vector(1.25,1.25,1.25),0,"爱心化拖尾 飞"],[18,"25E0769D",0,new mw.Vector(6,0,91),new mw.Vector(0,0,0),new mw.Vector(1.25,1.25,1.25),0,"爱心挂载 飞"],[19,"20F54133",0,new mw.Vector(15,0,100),new mw.Vector(0,0,-90),new mw.Vector(0.25,0.25,0.25),0,"彩虹挂载 飞"],[20,"129107",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),1,"玩家释放的强化星星"],[21,"30E74522",16,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,0.01),0,"玩家释放的长按强化效果"],[22,"153046",0,new mw.Vector(-20,0,0),new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),0,"宠物被玩家强化后的效果"]];
export interface IEffectElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**特效id*/
	EffectID:string
	/**特效挂点*/
	EffectPoint:number
	/**物体不配置，挂在锚点*/
	EffectLocation:mw.Vector
	/**特效偏移*/
	EffectRotate:mw.Vector
	/**特效旋转*/
	EffectLarge:mw.Vector
	/**特效缩放*/
	EffectTime:number
	/**特效时间<0时间；>0次数；=0循环*/
	Notice:string
 } 
export class EffectConfig extends ConfigBase<IEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}