import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Info","type","name","NpcGuid","TriggerGuid","start","content","reward","talkOffset","btntext","animationGuid","rate","loop","moneyType","World"],["","","","Language","","","Language","","id|数量","","Language","","","","",""],[1,null,1,"Name_Npc_1","026E0360","0DF43095","Dialog_Npc_1",null,null,new mw.Vector(0,60,50),"Dialog_Npc_Btn_1",null,0,0,0,0],[2,null,1,"Name_Npc_2","0867FDD3","00A760BD","Dialog_Npc_2",[1,2],null,new mw.Vector(0,60,50),"Dialog_Npc_Btn_1",null,0,0,0,0],[3,null,1,"Name_Npc_3","30AB47E2","28B175B3","Dialog_Npc_3",null,null,new mw.Vector(0,60,50),"Dialog_Npc_Btn_1",null,0,0,0,0],[4,null,1,"Name_Npc_4","226EAE41","26F3888C","Dialog_Npc_8",[3],null,new mw.Vector(0,60,50),"Dialog_Npc_Btn_1",null,0,0,0,0]];
export interface INpcDialogElement extends IElementBase{
 	/**唯一ID（对应npc）*/
	id:number
	/**npc说明*/
	Info:string
	/**类型
0 无类型
1 普通对话
2 商店NPC
3 占卜NPC
4 觉醒NPC
5 旅行商人
6 旅行商人世界2
7 跳转机器 
8 跳转机器世界2
9 材料悬赏
10 材料悬赏世界2
11 觉醒老师世界2
*/
	type:number
	/**名称*/
	name:string
	/**NPCguid*/
	NpcGuid:string
	/**NPC触发器*/
	TriggerGuid:string
	/**开场*/
	start:string
	/**内容*/
	content:Array<number>
	/**对话完成奖励*/
	reward:Array<Array<number>>
	/**按钮相对偏移*/
	talkOffset:mw.Vector
	/**按钮文本*/
	btntext:string
	/**NPC动作GUID*/
	animationGuid:string
	/**动作速度*/
	rate:number
	/**动作循环次数*/
	loop:number
	/**货币类型
0 无类型
1 星石
2 徽章
3 黄金勋章*/
	moneyType:number
	/**世界
0 老世界独有
1 新世界独有*/
	World:number
 } 
export class NpcDialogConfig extends ConfigBase<INpcDialogElement>{
	constructor(){
		super(EXCELDATA);
	}

}