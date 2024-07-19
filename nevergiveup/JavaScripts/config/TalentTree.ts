import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","nameCN","slot","type","frontTalent","backTalent","cost","icon","buffId","desc","descCN"],["","","","","","","","","","","",""],[1001,"TalentTree_Name_1","物理基础","talentItemCanvas_1",1,null,[1004],[[1,10,20],[2,10,20]],"163646",1001,"TalentTree_Desc_1","物理伤害提高{0}%"],[1002,"TalentTree_Name_2","魔法学识","talentItemCanvas_2",1,null,[1004],[[1,10,20],[2,10,20]],"163646",1002,"TalentTree_Desc_2","魔法伤害提高{0}%"],[1003,"TalentTree_Name_3","基地耐久","talentItemCanvas_3",1,null,[1005],[[1,10,20,40],[2,10,20,40]],"163646",1003,"TalentTree_Desc_3","基地耐久提高{0}"],[1004,"TalentTree_Name_4","攻速增强","talentItemCanvas_4",1,[1001,1002],[1007,1008,1009],[[1,10,20,40],[2,10,20,40]],"163646",1004,"TalentTree_Desc_4","攻击速度提高{0}%"],[1005,"TalentTree_Name_5","天降能量","talentItemCanvas_5",1,[1003],[1010],[[1,10,20],[2,10,20]],"163646",1005,"TalentTree_Desc_5","每个波次获得{0}能量"],[1006,"TalentTree_Name_6","矿机升级","talentItemCanvas_6",1,[1003],[1014],[[1,10,20,40,65,100],[2,10,20,40,65,100]],"163646",1006,"TalentTree_Desc_6","能量单位产出能量效率提高{0}%"],[1007,"TalentTree_Name_7","光元素增伤","talentItemCanvas_7",1,[1004],[1011],[[1,10,20],[2,10,20]],"163646",1007,"TalentTree_Desc_7","光属性伤害提高{0}%"],[1008,"TalentTree_Name_8","水元素增伤","talentItemCanvas_8",1,[1004],[1012],[[1,10,20],[2,10,20]],"163646",1008,"TalentTree_Desc_8","水属性伤害提高{0}%"],[1009,"TalentTree_Name_9","土元素增伤","talentItemCanvas_9",1,[1004],[1013],[[1,10,20],[2,10,20]],"163646",1009,"TalentTree_Desc_9","土属性伤害提高{0}%"],[1010,"TalentTree_Name_10","耐久恢复","talentItemCanvas_10",1,[1005],[1014],[[1,10,20],[2,10,20]],"163646",1010,"TalentTree_Desc_10","基地每个波次恢复{0}耐久"],[1011,"TalentTree_Name_11","暗元素增伤","talentItemCanvas_11",1,[1007],[1015],[[1,10,20],[2,10,20]],"163646",1011,"TalentTree_Desc_11","暗属性伤害提高{0}%"],[1012,"TalentTree_Name_12","火元素增伤","talentItemCanvas_12",1,[1008],[1015],[[1,10,20],[2,10,20]],"163646",1012,"TalentTree_Desc_12","火属性伤害提高{0}%"],[1013,"TalentTree_Name_13","木元素增伤","talentItemCanvas_13",1,[1009],[1015],[[1,10,20],[2,10,20]],"163646",1013,"TalentTree_Desc_13","木属性伤害提高{0}%"],[1014,"TalentTree_Name_14","敌方减速","talentItemCanvas_14",1,[1006,1010],[1015],[[1,10,20,40],[2,10,20,40]],"163646",1014,"TalentTree_Desc_14","敌方入场5秒内减速{0}%"],[1015,"TalentTree_Name_15","慧光","talentItemCanvas_15",1,[1011,1012,1013,1014],null,[[1,10,20,40,65],[2,10,20,40,65]],"163646",1015,"TalentTree_Desc_15","敌方受到伤害提高{0}%"]];
export interface ITalentTreeElement extends IElementBase{
 	/**id*/
	id:number
	/**天赋名称*/
	name:string
	/**天赋名称(备注)*/
	nameCN:string
	/**天赋位置*/
	slot:string
	/**填写UI元素名称*/
	type:number
	/**天赋类型*/
	frontTalent:Array<number>
	/** 1:普通天赋 2:巅峰天赋*/
	backTalent:Array<number>
	/**解锁前置天赋Id*/
	cost:Array<Array<number>>
	/**可解锁的后置天赋Id*/
	icon:string
	/** 解锁以及升级所需资源[[资源id*/
	buffId:number
	/**1级*/
	desc:string
	/**2级*/
	descCN:string
 } 
export class TalentTreeConfig extends ConfigBase<ITalentTreeElement>{
	constructor(){
		super(EXCELDATA);
	}

}