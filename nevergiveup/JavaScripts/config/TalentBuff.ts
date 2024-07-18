import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","nameCN","type","value","valueType","descCN"],["","","","","","",""],[1001,"TalentBuff_Name_1","物理基础",1,[1,2],1,"物理伤害提高{0}%"],[1002,"TalentBuff_Name_2","魔法学识",1,[1,2],1,"魔法伤害提高{0}%"],[1003,"TalentBuff_Name_3","攻速增强",1,[0.2,0.4,0.6],2,"攻击速度提高{0}%"],[1004,"TalentBuff_Name_4","距离增强",1,[0,0],1,null],[1005,"TalentBuff_Name_5","光元素增伤",1,[1,2],2,"光属性伤害提高{0}%"],[1006,"TalentBuff_Name_6","暗元素增伤",1,[1,2],2,"暗属性伤害提高{0}%"],[1007,"TalentBuff_Name_7","水元素增伤",1,[1,2],2,"水属性伤害提高{0}%"],[1008,"TalentBuff_Name_8","火元素增伤",1,[1,2],2,"火属性伤害提高{0}%"],[1009,"TalentBuff_Name_9","土元素增伤",1,[1,2],2,"土属性伤害提高{0}%"],[1010,"TalentBuff_Name_10","木元素增伤",1,[1,2],2,"木属性伤害提高{0}%"],[1011,"TalentBuff_Name_11","物理斩杀",1,[0],2,null],[1012,"TalentBuff_Name_12","魔法压制",1,[0],2,null],[1013,"TalentBuff_Name_13","高射火炮",1,[0,0],2,null],[1014,"TalentBuff_Name_14","物理精通2",1,[0,0,0],1,null],[1015,"TalentBuff_Name_15","魔法升华2",1,[0,0,0],1,null],[1016,"TalentBuff_Name_16","攻速增强++2",1,[0,0],1,null],[1017,"TalentBuff_Name_17","距离增强++2",1,[0,0,0],1,null],[1018,"TalentBuff_Name_18","光元素伤害加成2",1,[0,0,0],2,null],[1019,"TalentBuff_Name_19","暗元素伤害加成2",1,[0,0,0],2,null],[1020,"TalentBuff_Name_20","水元素伤害加成2",1,[0,0,0],2,null],[1021,"TalentBuff_Name_21","火元素伤害加成2",1,[0,0,0],2,null],[1022,"TalentBuff_Name_22","土元素伤害加成2",1,[0,0,0],2,null],[1023,"TalentBuff_Name_23","木元素伤害加成2",1,[0,0,0],2,null],[1024,"TalentBuff_Name_24","物理斩杀2",1,[0],2,null],[1025,"TalentBuff_Name_25","魔法压制2",1,[0],2,null],[1026,"TalentBuff_Name_26","高射火炮2",1,[0,0],2,null],[1027,"TalentBuff_Name_27","基地耐久",1,[100,200,300],1,"基地耐久提高{0}"],[1028,"TalentBuff_Name_28","天降能量",1,[10,20],1,"每个波次获得{0}能量"],[1029,"TalentBuff_Name_29","耐久恢复",1,[50,100],1,"基地每个波次恢复{0}耐久"],[1030,"TalentBuff_Name_30","矿机升级",1,[20,40,60,80,100],2,"能量单位产出能量效率提高{0}%"],[1031,"TalentBuff_Name_31","基地血量增加2",1,[0,0],1,null],[1032,"TalentBuff_Name_32","每回合获得金币2",1,[0,0],1,null],[1033,"TalentBuff_Name_33","每回合回复血量2",1,[0,0],1,null],[1034,"TalentBuff_Name_34","产出金币效率提升x%2",1,[0,0,0,0,0],2,null],[1035,"TalentBuff_Name_35","慧光",1,[0.5,1,1.5,2],2,"敌方受到伤害提高{0}%"],[1036,"TalentBuff_Name_36","敌方减速",1,[0.5,1],2,"敌方入场5秒内减速{0}%"],[1037,"TalentBuff_Name_37","元素克制时额外造成x%伤害",1,[0,0,0],2,null],[1038,"TalentBuff_Name_38","元素被克制时减少x%伤害削弱",1,[0,0,0],2,null],[1039,"TalentBuff_Name_39","怪物出场前10秒护甲减少x",1,[0,0,0,0],1,null],[1040,"TalentBuff_Name_40","怪物出场前10秒法抗减少x",1,[0,0,0,0],1,null],[1041,"TalentBuff_Name_41","怪物入场5秒减速2",1,[0,0],1,null],[1042,"TalentBuff_Name_42","怪物出场前10秒护甲减少x 2",1,[0,0],1,null],[1043,"TalentBuff_Name_43","怪物出场前10秒法抗减少x 2",1,[0,0],1,null],[1044,"TalentBuff_Name_44","在无尽模式下，物理伤害+x%",2,[0,0],2,null],[1045,"TalentBuff_Name_45","在无尽模式下，魔法伤害+x%",2,[0,0],2,null],[1046,"TalentBuff_Name_46","在无尽模式下，血量上限+x",2,[0,0],1,null],[1047,"TalentBuff_Name_47","物理（龙娘祝福）",1,[0,0,0],1,null],[1048,"TalentBuff_Name_48","魔法（龙娘祝福）",1,[0,0,0],1,null],[1049,"TalentBuff_Name_49"," 攻击距离（龙娘祝福）",1,[0,0,0],1,null],[1050,"TalentBuff_Name_50","减速固定值 (龙娘祝福）如果是减速用负数",1,[0,0,0],1,null],[1051,"TalentBuff_Name_51","基地血量 (龙娘祝福）",1,[0,0,0],1,null],[1052,"TalentBuff_Name_52","攻击速度 (龙娘祝福）",1,[0,0,0],1,null]];
export interface ITalentBuffElement extends IElementBase{
 	/**id*/
	id:number
	/**Buff名称*/
	name:string
	/**Buff名称(备注)*/
	nameCN:string
	/**Buff类型*/
	type:number
	/**1:基础类型*/
	value:Array<number>
	/**2:巅峰天赋*/
	valueType:number
	/**天赋Buff数值*/
	descCN:string
 } 
export class TalentBuffConfig extends ConfigBase<ITalentBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}