import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","nameCN","type","value","valueType","descCN"],["","","","","","",""],[1001,"TalentTree_Name_1","物理基础",1,[1,2],2,"物理伤害提高{0}%"],[1002,"TalentTree_Name_2","魔法学识",1,[1,2],2,"魔法伤害提高{0}%"],[1003,"TalentTree_Name_3","基地耐久",1,[100,200,300],1,"基地耐久提高{0}"],[1004,"TalentTree_Name_4","攻速增强",1,[0.2,0.4,0.6],2,"攻击速度提高{0}%"],[1005,"TalentTree_Name_5","天降能量",1,[10,20],1,"每个波次获得{0}能量"],[1006,"TalentTree_Name_6","矿机升级",1,[20,40,60,80,100],2,"能量单位产出能量效率提高{0}%"],[1007,"TalentTree_Name_7","光元素增伤",1,[1,2],2,"光属性伤害提高{0}%"],[1008,"TalentTree_Name_8","水元素增伤",1,[1,2],2,"水属性伤害提高{0}%"],[1009,"TalentTree_Name_9","土元素增伤",1,[1,2],2,"土属性伤害提高{0}%"],[1010,"TalentTree_Name_10","耐久恢复",1,[50,100],1,"基地每个波次恢复{0}耐久"],[1011,"TalentTree_Name_11","暗元素增伤",1,[1,2],2,"暗属性伤害提高{0}%"],[1012,"TalentTree_Name_12","火元素增伤",1,[1,2],2,"火属性伤害提高{0}%"],[1013,"TalentTree_Name_13","木元素增伤",1,[1,2],2,"木属性伤害提高{0}%"],[1014,"TalentTree_Name_14","敌方减速",1,[0.5,1],2,"敌方入场5秒内减速{0}%"],[1015,"TalentTree_Name_15","慧光",1,[0.5,1,1.5,2],2,"敌方受到伤害提高{0}%"]];
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