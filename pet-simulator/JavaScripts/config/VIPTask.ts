import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Info","Name","VIPTaskType","TragetNum","Giftcoin","Star","level","Front"],["","","Language","","","","","",""],[1,"领取在线奖励1","VIP_task_01",1,1,0,1,1,0],[2,"领取在线奖励5","VIP_task_01",1,5,0,2,2,0],[3,"领取在线奖励10","VIP_task_01",1,10,0,3,3,0],[4,"打破30个金币","VIP_task_02",2,30,0,1,1,0],[5,"打破50个金币","VIP_task_02",2,50,0,2,2,0],[6,"打破100个金币","VIP_task_02",2,100,0,3,3,0],[7,"打开15个宠物蛋","VIP_task_03",3,15,0,1,1,0],[8,"打开30个宠物蛋","VIP_task_03",3,30,0,2,2,0],[9,"打开50个宠物蛋","VIP_task_03",3,50,0,3,3,0],[10,"完成宠物融合5次","VIP_task_04",4,5,0,1,1,1006],[11,"完成宠物融合15次","VIP_task_04",4,15,0,2,2,1006],[12,"完成宠物融合30次","VIP_task_04",4,30,0,3,3,1006],[13,"爱心化宠物5次","VIP_task_05",5,5,0,1,1,1007],[14,"爱心化宠物10次","VIP_task_05",5,10,0,2,2,1007],[15,"爱心化宠物20次","VIP_task_05",5,20,0,3,3,1007],[16,"彩虹化宠物3次","VIP_task_06",6,3,0,1,1,1008],[17,"彩虹化宠物10次","VIP_task_06",6,10,0,2,2,1008],[18,"彩虹化宠物15次","VIP_task_06",6,15,0,3,3,1008],[19,"附魔宠物3次","VIP_task_07",7,3,0,1,1,2004],[20,"附魔宠物10次","VIP_task_07",7,10,0,2,2,2004],[21,"附魔宠物15次","VIP_task_07",7,15,0,3,3,2004],[22,"和玩家成功交易1次","VIP_task_08",8,1,0,1,1,0],[23,"和玩家成功交易5次","VIP_task_08",8,5,0,2,2,0],[24,"和玩家成功交易10次","VIP_task_08",8,10,0,3,3,0],[25,"获得传说宠物3次","VIP_task_09",9,3,0,1,1,0],[26,"获得传说宠物10次","VIP_task_09",9,10,0,2,2,0],[27,"获得传说宠物15次","VIP_task_09",9,15,0,3,3,0],[28,"获得神话宠物1次","VIP_task_10",10,1,0,1,1,0],[29,"获得神话宠物5次","VIP_task_10",10,5,0,2,2,0],[30,"获得神话宠物10次","VIP_task_10",10,10,0,3,3,0],[31,"玩1次抓娃娃机","VIP_task_13",13,1,0,1,1,0],[32,"玩10次抓娃娃机","VIP_task_13",13,10,0,2,2,0],[33,"玩30次抓娃娃机","VIP_task_13",13,30,0,3,3,0],[34,"打破10个礼物","VIP_task_11",11,10,0,1,1,0],[35,"打破30个礼物","VIP_task_11",11,30,0,2,2,0],[36,"打破60个礼物","VIP_task_11",11,60,0,3,3,0],[37,"打破5个宝箱","VIP_task_12",12,5,0,1,1,0],[38,"打破10个宝箱","VIP_task_12",12,10,0,2,2,0],[39,"打破30个宝箱","VIP_task_12",12,30,0,3,3,0]];
export interface IVIPTaskElement extends IElementBase{
 	/**任务id*/
	id:number
	/**策划用描述*/
	Info:string
	/**任务名字*/
	Name:string
	/**任务类型
1-领取在线奖励
2-打掉金币
3-打开宠物蛋
4-宠物融合
5-爱心化宠物
6-彩红化宠物
7-附魔宠物
8-和玩家交易
9-获得传说宠物
10-获得神话宠物
11-打破礼物
12-打破宝箱
13-玩抓娃娃机*/
	VIPTaskType:number
	/**目标数*/
	TragetNum:number
	/**废弃列*/
	Giftcoin:number
	/**获得星星币*/
	Star:number
	/**等级
1-一星
2-两星
3-三星*/
	level:number
	/**解锁前置区域
为区域表id*/
	Front:number
 } 
export class VIPTaskConfig extends ConfigBase<IVIPTaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}