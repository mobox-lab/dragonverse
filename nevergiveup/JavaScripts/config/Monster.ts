import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","types","name","nameCN","guid","walkAnim","hp","speed","underattack","attackproportion","goldAmount","escapeDamage","buffSlot","buffSlotRelativePos","hurtAnim","hurtAnimDur","deadAnim","deadAnimDur"],["","","Language","","","","","","","","","","","","","","",""],[1001,null,"Monster_name_1","丧尸","146036","97857",50,100,"107535",1,5,25,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5],[1002,[1],"Monster_name_2","快速丧尸","174947","122498",40,200,"107535",1,5,25,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5],[1003,[5],"Monster_name_3","僵尸","146185","122549",500,75,"107535",1,100,500,23,new mw.Vector(0,0,150),null,0.3,"20291",1],[1004,[2],"Monster_name_4","飞行","151835","164988",30,150,"107535",1,5,25,23,new mw.Vector(0,0,150),"145952",0.3,"285395",1],[1005,[3],"Monster_name_5","护士","174911","97860",40,150,"107535",1,5,25,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5],[1006,[5],"Monster_name_6","铁钩怪人","145900","122498",500,75,"107535",1,100,500,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5]];
export interface IMonsterElement extends IElementBase{
 	/**怪物id*/
	id:number
	/**怪物类型 (1： 隐身，2：飞行，3：装甲，4：免控，5：boss)*/
	types:Array<number>
	/**名字*/
	name:string
	/**名字备注*/
	nameCN:string
	/**换装guid*/
	guid:string
	/**行走动画*/
	walkAnim:string
	/**生命值*/
	hp:number
	/**行走速度*/
	speed:number
	/**受击特效*/
	underattack:string
	/**受击特效缩放比例*/
	attackproportion:number
	/**击杀金币*/
	goldAmount:number
	/**逃跑伤害*/
	escapeDamage:number
	/**buff挂点*/
	buffSlot:number
	/**buff挂点偏移*/
	buffSlotRelativePos:mw.Vector
	/**受击动画*/
	hurtAnim:string
	/**受击动画持续时间*/
	hurtAnimDur:number
	/**死亡动画*/
	deadAnim:string
	/**死亡动画持续时间*/
	deadAnimDur:number
 } 
export class MonsterConfig extends ConfigBase<IMonsterElement>{
	constructor(){
		super(EXCELDATA);
	}

}