import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Type","Name","Des","Icon","Img","Price","pendantId","pendantName"],["","","","Language","","","","","Language"],[1001,1,"凤舞九天","Pendant_Wing_1","211667",null,5000,[7],null],[1002,1,"血蝠","Pendant_Wing_2","136966",null,9000,[8],null],[1003,1,"丘比特","Pendant_Wing_3","136962",null,14000,[9],null],[1004,1,"暗夜","Pendant_Wing_4","145904",null,20000,[10],null],[1005,1,"爱心天使","Pendant_Wing_5","145910",null,24000,[11],null],[1006,1,"星云","Pendant_Wing_6","42812",null,14000,[17],null],[1007,1,"绿野仙踪","Pendant_Wing_7","42822",null,10000,[24],null],[1008,1,"玄鸟","Pendant_Wing_8","145913",null,30000,[25],null],[2001,2,"彗星拖尾","Pendant_Trail_1","153613",null,5000,[12],null],[2002,2,"启明星","Pendant_Trail_2","88021",null,9000,[13],null],[2003,2,"冰雪","Pendant_Trail_3","128514",null,14000,[14],null],[2004,2,"糖果","Pendant_Trail_4","145495",null,20000,[15],null],[2005,2,"枫叶","Pendant_Trail_5","195115",null,24000,[16],null],[2006,2,"六芒守护","Pendant_Trail_6","196217",null,14000,[18],null],[2007,2,"彩虹","Pendant_Trail_7","27392",null,20000,[26],null],[2008,2,"足球","Pendant_Trail_8","145493",null,30000,[27],null],[2009,2,"星光","Pendant_Trail_9","145506",null,40000,[47],null],[3001,3,"击杀特效·爆炸","Pendant_Kill_1","14329",null,2000,[19],null],[3002,3,"击杀特效·小恶魔","Pendant_Kill_2","61006",null,6000,[20],null],[3003,3,"击杀特效·天雷","Pendant_Kill_3","130641",null,14000,[21],null],[3004,3,"击杀特效·地刺","Pendant_Kill_4","137230",null,20000,[22],null],[3005,3,"击杀特效·幻梦","Pendant_Kill_5","153045",null,24000,[23],null],[3006,3,"击杀特效·炎爆","Pendant_Kill_6","271321",null,20000,[45],null],[3007,3,"击杀特效·水龙卷","Pendant_Kill_7","270683",null,20000,[46],null],[4001,4,"段位奖励·金丹","Pendant_Rank_reward_1","266517","267207",0,[28,35,40],"Rank_name_3"],[4002,4,"段位奖励·元婴","Pendant_Rank_reward_2","266519","267208",0,[29,36,41],"Rank_name_4"],[4003,4,"段位奖励·化神","Pendant_Rank_reward_3","266518","267209",0,[30,37,42],"Rank_name_5"],[4004,4,"段位奖励·炼虚","Pendant_Rank_reward_4","266521","267206",0,[31,38,43],"Rank_name_6"],[4005,4,"段位奖励·合体","Pendant_Rank_reward_5","266520","267205",0,[32,39,44],"Rank_name_7"]];
export interface IShopElement extends IElementBase{
 	/**ID*/
	id:number
	/**类型
1 翅膀
2 拖尾
3 击杀特效
4 段位特效*/
	Type:number
	/**名字（策划看）*/
	Name:string
	/**挂件描述*/
	Des:string
	/**服饰guid*/
	Icon:string
	/**服饰图标id
（不填则直接读取资源库图标）*/
	Img:string
	/**金币数量*/
	Price:number
	/**挂件ID*/
	pendantId:Array<number>
	/**挂件名称*/
	pendantName:string
 } 
export class ShopConfig extends ConfigBase<IShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}