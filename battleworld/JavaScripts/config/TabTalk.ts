import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["tabId","Info","tabName","content","next","type","icon","param1","param2","param3"],["","","Language","","","","","","",""],[1,"请教拳术","Dialog_Npc_Tap_1",["Dialog_Npc_6"],null,1,null,null,null,null],[2,"学习技能？","Dialog_Npc_Tap_2",["Dialog_Npc_7"],null,1,null,null,null,null],[3,"请教剑术","Dialog_Npc_Tap_3",["Dialog_Npc_9"],null,1,null,null,null,null]];
export interface ITabTalkElement extends IElementBase{
 	/**唯一ID*/
	tabId:number
	/**说明策划用*/
	Info:string
	/**名字*/
	tabName:string
	/**内容(如果数组长度大于1 视为在content画布填充)*/
	content:Array<string>
	/**下一个tab*/
	next:string
	/**类型
1. 正常页签
2. 斥候页签
3. 法师页签
4. 空舞页签
5. 占卜页签
6.炼金页签
7.等级觉醒
8.宠物蛋
9. 兑换星石
10. 旅行奸商
11. 宠物粮
14:悬赏令
15.等级觉醒-2界
16.2界-兑换星石
17.2界-宠物
18.2界-挂件饰品*/
	type:number
	/**icon*/
	icon:string
	/**预留参数1*/
	param1:string
	/**预留参数2*/
	param2:string
	/**预留参数3*/
	param3:string
 } 
export class TabTalkConfig extends ConfigBase<ITabTalkElement>{
	constructor(){
		super(EXCELDATA);
	}

}