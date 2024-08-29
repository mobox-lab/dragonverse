import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","QualityType","Order","Name","Color","Describe","Function","Degree","Weight","EnchantType","Level","RankScore"],["","","","Language","","Language","","","","","",""],[1,0,4,"Enchants_Name_1","E740E0","Enchants_Describe_1","获取更多世界一货币",15,3.5,9,1,15000],[2,0,5,"Enchants_Name_17","E740E0","Enchants_Describe_1",null,30,1.8,9,2,45000],[3,0,6,"Enchants_Name_18","E740E0","Enchants_Describe_1",null,50,1,9,3,70000],[4,0,7,"Enchants_Name_19","E740E0","Enchants_Describe_1",null,75,0.5,9,4,100000],[5,0,8,"Enchants_Name_20","E740E0","Enchants_Describe_1",null,100,0.2,9,5,350000],[6,0,9,"Enchants_Name_2","E740E0","Enchants_Describe_2","获取更多世界二货币",10,10,10,1,15000],[7,0,10,"Enchants_Name_21","E740E0","Enchants_Describe_2",null,20,5,10,2,45000],[8,0,11,"Enchants_Name_22","E740E0","Enchants_Describe_2",null,30,3,10,3,70000],[9,0,12,"Enchants_Name_23","E740E0","Enchants_Describe_2",null,40,1.5,10,4,100000],[10,0,13,"Enchants_Name_24","E740E0","Enchants_Describe_2",null,60,0.5,10,5,350000],[11,0,14,"Enchants_Name_3","E740E0","Enchants_Describe_3","获取更多世界三货币",15,0,11,1,0],[12,0,15,"Enchants_Name_25","E740E0","Enchants_Describe_3",null,30,0,11,2,0],[13,0,16,"Enchants_Name_26","E740E0","Enchants_Describe_3",null,50,0,11,3,0],[14,0,17,"Enchants_Name_27","E740E0","Enchants_Describe_3",null,75,0,11,4,0],[15,0,18,"Enchants_Name_28","E740E0","Enchants_Describe_3",null,100,0,11,5,0],[16,0,19,"Enchants_Name_4","E740E0","Enchants_Describe_4","宠物与这只宠物一起造成更多的伤害（叠加）",10,4,12,1,15000],[17,0,20,"Enchants_Name_5","E740E0","Enchants_Describe_5","宠物与这只宠物一起造成更多的伤害（叠加）",20,3,12,2,15000],[18,0,21,"Enchants_Name_6","E740E0","Enchants_Describe_6","增加您在装备时获得暴击的机会",25,3,4,1,15000],[19,0,22,"Enchants_Name_7","E740E0","Enchants_Describe_7","宠物造成+n%伤害",10,7,1,1,15000],[20,0,23,"Enchants_Name_29","E740E0","Enchants_Describe_7",null,20,3.5,1,2,45000],[21,0,24,"Enchants_Name_30","E740E0","Enchants_Describe_7",null,30,2,1,3,70000],[22,0,25,"Enchants_Name_31","E740E0","Enchants_Describe_7",null,40,0.8,1,4,125000],[23,0,26,"Enchants_Name_32","E740E0","Enchants_Describe_7",null,60,0.4,1,5,500000],[24,0,27,"Enchants_Name_8","E740E0","Enchants_Describe_8","宠物移动速度+n%",15,5,5,1,20000],[25,0,28,"Enchants_Name_33","E740E0","Enchants_Describe_8",null,30,3.5,5,2,70000],[26,0,29,"Enchants_Name_34","E740E0","Enchants_Describe_8",null,50,1.5,5,3,200000],[27,0,30,"Enchants_Name_9","E740E0","Enchants_Describe_9","宠物额外赚取 +n% 钻石",5,7,3,1,15000],[28,0,31,"Enchants_Name_35","E740E0","Enchants_Describe_9",null,10,3.5,3,2,45000],[29,0,32,"Enchants_Name_36","E740E0","Enchants_Describe_9",null,20,2,3,3,70000],[30,0,33,"Enchants_Name_37","E740E0","Enchants_Describe_9",null,30,0.8,3,4,125000],[31,0,34,"Enchants_Name_38","E740E0","Enchants_Describe_9",null,40,0.4,3,5,500000],[32,0,35,"Enchants_Name_10","E740E0","Enchants_Describe_10","宠物对宝箱造成+n%伤害",20,3,6,1,35000],[33,0,36,"Enchants_Name_39","E740E0","Enchants_Describe_10",null,40,2,6,2,70000],[34,0,37,"Enchants_Name_40","E740E0","Enchants_Describe_10",null,60,0.8,6,3,200000],[35,0,38,"Enchants_Name_11","E740E0","Enchants_Describe_11","被此宠物损坏的礼物收益 +n% 奖励",20,3,7,1,35000],[36,0,39,"Enchants_Name_41","E740E0","Enchants_Describe_11",null,40,2,7,2,70000],[37,0,40,"Enchants_Name_42","E740E0","Enchants_Describe_11",null,60,0.5,7,3,200000],[38,0,41,"Enchants_Name_12","E740E0","Enchants_Describe_12","宠物在随机乘数中额外赚取 +n% 金币",15,7,8,1,15000],[39,0,42,"Enchants_Name_43","E740E0","Enchants_Describe_12",null,30,3.5,8,2,45000],[40,0,43,"Enchants_Name_44","E740E0","Enchants_Describe_12",null,50,2,8,3,70000],[41,0,44,"Enchants_Name_45","E740E0","Enchants_Describe_12",null,70,1,8,4,100000],[42,0,45,"Enchants_Name_46","E740E0","Enchants_Describe_12",null,100,0.5,8,5,350000],[43,0,1,"Enchants_Name_13","ED7E27","Enchants_Describe_13","宠物造成 +100% 伤害，额外获得 +100% 钻石，移动速度提高 50%",0,0.2,0,0,1000000],[44,0,2,"Enchants_Name_14","ED7E27","Enchants_Describe_14","宠物可以为你收集物品，宠物可以收集范围等于您的收集范围的物品。",0,0,0,0,0],[45,0,3,"Enchants_Name_15","ED7E27","Enchants_Describe_15","宠物随机生成钻石\r\n宠物生成 5、10、15、20、30、50、80 等钻石以随机间隔",0,0.1,0,0,1600000],[46,1,0,"Enchants_Name_16","ED7E27","Enchants_Describe_16","前四只最好的宠物，平均值 *1.5",0,0,0,0,2000000],[47,1,0,"Enchants_Name_47","ED7E28","Enchants_Describe_17","你最强宠物的值*0.5",0,0,0,0,0]];
export interface IEnchantsElement extends IElementBase{
 	/**词条id*/
	id:number
	/**是否特有
0=不特有，可附魔 
1=特有，不可附魔*/
	QualityType:number
	/**词条顺序*/
	Order:number
	/**词条名称*/
	Name:string
	/**词条名称颜色（在宠物的标签中显示）*/
	Color:string
	/**效果描述*/
	Describe:string
	/**功能（策划用）*/
	Function:string
	/**对应效果的程度百分比*/
	Degree:number
	/**概率加权(一列加起来是100*/
	Weight:number
	/**0.其他
1.伤害加成
2.金币加成
3.钻石加成
4.暴击加成
5.移动速度加成
6.宝箱伤害加成
7.四级金币宝箱加成
8.倍率资源加成金币
9.第一世界金币加成
10.第二世界金币加成
11.第三世界金币加成
12.团队合作伤害加成*/
	EnchantType:number
	/**0.无等级
1.等级1
2.等级2
3.等级3
4.等级4
5.等级5*/
	Level:number
	/**排行榜数值加成，不填默认为0*/
	RankScore:number
 } 
export class EnchantsConfig extends ConfigBase<IEnchantsElement>{
	constructor(){
		super(EXCELDATA);
	}

}