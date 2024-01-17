import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","EffectID","EffectPoint","EffectLocation","EffectRotate","EffectLarge","EffectTime","ColorValue","Notice"],["","","","","","","","",""],[1,"128516",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),0,null,"跑墙特效"],[2,"142957",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),-3,"#FFFFFFFF","拳头技能减速特效"],[3,"113918",23,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,1.5),-5,"#FFFFFFFF","拳头技能加攻特效"],[4,"141655",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1.5,1.5,2),-2,"#FFFFFFFF","拳头技能禁锢特效"],[5,"141629",23,new mw.Vector(0,0,200),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-3,"#FFFFFFFF","拳头技能眩晕特效"],[6,"99601",23,new mw.Vector(0,0,100),new mw.Vector(0,90,0),new mw.Vector(2.5,2.5,2.5),-3,null,"拳头命中特效"],[7,"141632",23,new mw.Vector(0,0,225),new mw.Vector(0,0,0),new mw.Vector(2,2,2),-5,null,"拳头易伤特效"],[8,"113906",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1.1,1.1,1.1),-5,"#FFFFFFFF","拳头减伤特效"],[9,"158082",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.33,0.33,0.83),-3,"#5D7BFFFF","单手剑减速特效"],[10,"151736",12,new mw.Vector(-13,0,-17),new mw.Vector(0,0,0),new mw.Vector(2.5,2.5,2.5),-0.5,"#005ED3FF","单手剑命中特效"],[11,"89072",12,new mw.Vector(-6.3,0,-26.88),new mw.Vector(0,0,0),new mw.Vector(0.9,0.9,1),-10,"#006FFFFF","单手剑加速特效1"],[12,"145503",12,new mw.Vector(-6.3,0,-26.88),new mw.Vector(0,0,0),new mw.Vector(2,2,2),-10,"#006EFFFF","单手剑加速特效2"],[13,"141641",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-2,"#FFCC00FF","法师减速"],[14,"141629",23,new mw.Vector(0,0,200),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-1,"#FFFFFFFF","法师眩晕特效"],[15,"89111",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1.1),-3,"#FFCC67FF","法师技能8禁锢"],[16,"113909",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-8,"#FFC14FFF","法师技能9减伤"],[17,"106127",16,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-8,"#FFCD04FF","法师技能10附魔"],[18,"89601",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,2),-1,"#FFCD50FF","法师技能10附魔dot"],[19,"89105",23,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(1.2,1.2,1.2),-1,null,"法师命中特效"],[20,"142947",23,new mw.Vector(0,0,20),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-1,"#FFD300FF","法师技能4治疗"],[21,"27616",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,2),-2,null,"帕姆尼出场特效"],[22,"89589",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-2,null,"帕姆尼消失特效"],[23,"89088",23,new mw.Vector(10,0,120),new mw.Vector(0,30,-90),new mw.Vector(2.5,2.5,2.5),-1,null,"双手剑命中刀光小"],[24,"89088",23,new mw.Vector(10,0,120),new mw.Vector(0,-30,-90),new mw.Vector(4,4,4),-1,null,"双手剑命中刀光大"],[25,"172886",23,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(2.5,2.5,3),-1,"#E93300FF","双手剑灼烧特效"],[26,"78474",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(0.2,0.2,0.45),-2,"#FF6400FF","双手剑禁锢特效"],[27,"141633",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-5,"#FF6F00FF","双手剑减速"],[28,"89123",23,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-8,"#FF4800FF","双手剑减伤特效"],[29,"106127",23,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(5,5,5),-8,"#FF6800FF","双手剑加攻特效"],[30,"151741",23,new mw.Vector(0,0,100),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-1,"#FF5D00FF","双手剑技能命中特效"],[31,"141633",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-3,"#FF6F00FF","双手剑减速"],[156,"146799",23,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),-5,null,"回城特效"],[157,"27709",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(4,4,8),0,null,"火海"],[158,"142955",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(7,7,1),0,null,"毒沼"],[159,"13417",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(3,3,3),-2,null,"炮击"],[160,"168949",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,1),-2,null,"雷击"],[161,"78474",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(1,1,1),0,null,"减速"],[162,"151580",-1,new mw.Vector(0,0,0),new mw.Vector(0,0,0),new mw.Vector(2,2,2),-0.5,null,"拾取特效"],[163,"86617",-1,new mw.Vector(0,0,0),new mw.Vector(180,0,0),new mw.Vector(20,20,10),0,null,"弹簧特效"]];
export interface IEffectElement extends IElementBase{
 	/***/
	ID:number
	/***/
	EffectID:string
	/**特效挂点
（地块特效-1）*/
	EffectPoint:number
	/**特效偏移*/
	EffectLocation:mw.Vector
	/**特效旋转*/
	EffectRotate:mw.Vector
	/**特效缩放*/
	EffectLarge:mw.Vector
	/**特效时间（循环方式(0为无限*/
	EffectTime:number
	/** 正数为循环次数，负数为循环时间(单位:秒)) default: 1）*/
	ColorValue:string
	/**颜色值*/
	Notice:string
 } 
export class EffectConfig extends ConfigBase<IEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}