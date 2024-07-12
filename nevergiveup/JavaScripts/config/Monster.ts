import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","types","name","nameCN","elementTy","guid","walkAnim","hp","speed","underattack","attackproportion","goldAmount","escapeDamage","buffSlot","buffSlotRelativePos","hurtAnim","hurtAnimDur","deadAnim","deadAnimDur","vertigoDelay","armor","magicResist","buff"],["","","Language","","","","","","","","","","","","","","","","","","","",""],[1001,null,"Monster_name_1","丧尸",1,"268048","268567",550,105,"107535",1,5,25,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5,3,200,200,[5002]],[1002,[1],"Monster_name_2","快速丧尸",2,"174947","122498",40,200,"107535",1,5,25,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5,3,200,200,null],[1003,[5],"Monster_name_3","僵尸",3,"146185","122549",500,75,"107535",1,100,500,23,new mw.Vector(0,0,150),null,0.3,"20291",1,3,200,200,null],[1004,[2],"Monster_name_4","飞行",4,"151835","164988",30,150,"107535",1,5,25,23,new mw.Vector(0,0,150),"145952",0.3,"285395",1,3,200,200,null],[1005,[3],"Monster_name_5","护士",5,"174911","97860",40,150,"107535",1,5,25,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5,3,200,200,null],[1006,[5],"Monster_name_6","铁钩怪人",6,"145900","122498",500,75,"107535",1,100,500,23,new mw.Vector(0,0,150),"97861",0.3,"285139",1.5,3,200,200,null],[1007,null,"Monster_name_1","龙娘测试",6,"268048","268567",50,50,"107535",1,5,20,23,new mw.Vector(0,0,150),"97861",0.3,"281693",1.5,3,200,200,null]];
export interface IMonsterElement extends IElementBase{
 	/**怪物id*/
	id:number
	/**怪物类型 (1： 隐身，2：飞行，3：装甲，4：免控，5：boss)*/
	types:Array<number>
	/**名字*/
	name:string
	/**名字备注*/
	nameCN:string
	/**元素类型（1——6对应光暗水火木土）*/
	elementTy:number
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
	/**眩晕后的内置CD（从怪物受到眩晕buff时，应用该列计时，时间内怪物不会再次受到眩晕buff影响）*/
	vertigoDelay:number
	/**初始护甲*/
	armor:number
	/**初始魔抗*/
	magicResist:number
	/**怪物的Buff*/
	buff:Array<number>
 } 
export class MonsterConfig extends ConfigBase<IMonsterElement>{
	constructor(){
		super(EXCELDATA);
	}

}