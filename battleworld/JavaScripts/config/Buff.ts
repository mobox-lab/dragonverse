import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","description","name_lan","description_lan","buffGameType","changeJobDestrory","unlockLevel","icon","buffEffectType","checkIds","overlayType","lifecycleType","duration","triggerCount","triggerInterval","actionGuid","effectGuids","effectGuid","loop","effectDelayTime","effectSlotIndex","relativePos","relativeRot","scale","affectPropertyType","buffTriggerOpportunity","subBuffs","skillTriggerOpportunity","skillId","param1_Model","param1","param2_Model","param2","param3_Model","param3","ps","param4"],["","","","Language","Language","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],[10001,"样例buff","变身","buff_name_7","buff_description_7",1,1,0,11111,4,null,2,1,20,0,0,0,null,0,0,0,0,null,null,null,0,0,null,0,0,1,5,1000,8,0,19,"变大5倍数",null],[10002,"样例buff","眩晕","buff_name_8","buff_description_8",1,0,0,11111,5,null,2,1,5,0,0,0,null,0,0,0,0,null,null,null,0,0,null,0,0,0,0,0,0,0,0,"眩晕5秒",null],[10003,"样例buff","吸引","buff_name_72","buff_description_72",1,0,0,11111,6,null,0,1,1,0,0,0,null,0,0,0,0,null,null,null,0,0,null,0,0,1,1,0,0,0,0,null,new mw.Vector(1538,0,0)],[10004,"样例buff","禁锢","buff_name_30","buff_description_30",1,0,0,11111,10,null,3,1,2,0,0,0,[99],0,0,0,0,null,null,null,0,0,null,0,0,0,0,0,0,0,0,null,null],[10005,"样例buff","回血","buff_name_31","buff_description_31",1,1,0,11111,15,null,1,2,0,10,1,0,[100],0,0,0,0,null,null,null,0,0,null,0,0,1,5,0,0,0,0,null,null],[10006,"样例buff","加速","buff_name_33","buff_description_33",1,1,0,175029,1,null,2,1,14,0,0,0,null,0,0,0,0,null,null,null,1,0,null,0,0,1,50,0,0,0,0,null,null],[10007,"样例buff","减伤","buff_name_35","buff_description_35",1,1,0,175014,1,null,3,1,10,0,0,0,[102],0,0,0,0,null,null,null,3,0,null,0,0,1,50,0,0,0,0,null,null],[10008,"样例buff","加攻","buff_name_39","buff_description_39",1,1,0,143692,1,null,4,1,10,0,0,0,null,0,0,0,0,null,null,null,4,0,null,0,0,1,15,0,0,0,0,null,null],[10009,"样例buff","减速","buff_name_50","buff_description_50",1,0,0,175029,1,null,3,1,2,0,0,0,[89],0,0,0,0,null,null,null,1,0,null,0,0,1,-80,0,0,0,0,null,null],[10010,"样例buff","吸血","buff_name_59","buff_description_59",1,1,0,175015,1,null,3,1,10,0,0,0,[117],0,0,0,0,null,null,null,8,0,null,0,0,1,50,0,0,0,0,"攻击能恢复造成伤害10%的血量【自己】",null],[10011,"样例buff","加暴击率","buff_name_61","buff_description_61",1,1,0,175029,1,null,3,1,10,0,0,0,[116],0,0,0,0,null,null,null,5,0,null,0,0,0,50,0,0,0,0,"狂暴：暴击几率增加10%【自己】",null],[10012,"样例buff","加爆抗","buff_name_67","buff_description_67",1,1,0,175014,1,null,3,1,10,0,0,0,[123],0,0,0,0,null,null,null,12,0,null,0,0,1,50,0,0,0,0,null,null],[10013,"样例buff","易伤","buff_name_75","buff_description_75",1,1,0,175014,1,null,1,1,10,0,0,0,null,0,0,0,0,null,null,null,14,0,null,0,0,1,3,0,0,0,0,null,null],[1,"减速","拳头【震地空爆】技能减速","buff_name_50","buff_description_50",1,0,0,175029,1,null,3,1,3,0,0,0,[2],0,0,0,0,null,null,null,1,0,null,0,0,1,-50,0,0,0,0,null,null],[2,"加攻","拳头【战吼】技能加攻","buff_name_39","buff_description_39",1,1,0,143692,1,null,4,1,5,0,0,0,[3],0,0,0,0,null,null,null,4,0,null,0,0,1,50,0,0,0,0,null,null],[3,"禁锢","拳头【轰雷震爆】技能禁锢","buff_name_30","buff_description_30",1,0,0,11111,10,null,3,1,2,0,0,0,[4],0,0,0,0,null,null,null,0,0,null,0,0,0,0,0,0,0,0,null,null],[4,"眩晕","拳头【升龙冲拳】眩晕技能","buff_name_8","buff_description_8",1,0,0,11111,5,null,2,1,3,0,0,0,[5],0,0,0,0,null,null,null,0,0,null,0,0,0,0,0,0,0,0,null,null],[5,"吸引","拳头【升龙冲拳】吸引技能","buff_name_72","buff_description_72",1,0,0,11111,6,null,0,1,0.2,0,0,0,null,0,0,0,0,null,null,null,0,0,null,0,0,1,0.2,0,0,0,0,null,null],[6,"易伤","拳头【源力涌动】易伤技能","buff_name_75","buff_description_75",1,1,0,175014,1,null,1,1,5,0,0,0,[7],0,0,0,0,null,null,null,14,0,null,0,0,1,25,0,0,0,0,null,null],[7,"减伤","拳头【源力涌动】减伤技能","buff_name_35","buff_description_35",1,1,0,175014,1,null,3,1,5,0,0,0,[8],0,0,0,0,null,null,null,3,0,null,0,0,1,15,0,0,0,0,null,null],[8,"减速","单手剑【通用】累计减速","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,3,0,0,0,[9],0,0,0,0,null,null,null,1,0,null,0,0,1,-10,0,0,0,0,null,null],[9,"加速","单手剑【技能8】加速","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,10,0,0,0,[11,12],0,0,0,0,null,null,null,1,0,null,0,0,1,65,0,0,0,0,null,null],[10,"吸引","单手剑【技能9】聚集","buff_name_72","buff_description_72",1,0,0,11111,6,null,0,1,1,0,0,0,null,0,0,0,0,null,null,null,0,0,null,0,0,1,0.2,0,0,0,0,null,null],[11,"减速","通用技能施放减速1秒减80%","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,1,0,0,0,null,0,0,0,0,null,null,null,1,0,null,0,0,1,-80,0,0,0,0,null,null],[12,"减速","通用技能施放减速2秒减80%","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,2,0,0,0,null,0,0,0,0,null,null,null,1,0,null,0,0,1,-80,0,0,0,0,null,null],[13,"减速","通用技能施放减速3秒减80%","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,3,0,0,0,null,0,0,0,0,null,null,null,1,0,null,0,0,1,-80,0,0,0,0,null,null],[14,"减速","通用技能施放减速4秒减80%","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,4,0,0,0,null,0,0,0,0,null,null,null,1,0,null,0,0,1,-80,0,0,0,0,null,null],[15,"瞬移","法师三技能瞬移buff","buff_name_20","buff_description_20",1,1,0,11111,11,null,1,1,2,0,0,0,[13],0,0,0,0,null,null,null,0,0,null,0,0,1,10000,1,47,0,0,null,null],[16,"减速","法师二技能减速","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,2,0,0,0,[13],0,0,0,0,null,null,null,1,0,null,0,0,1,-10,0,0,0,0,null,null],[17,"减速","法师五技能减速","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,2,0,0,0,[13],0,0,0,0,null,null,null,1,0,null,0,0,1,-2,0,0,0,0,null,null],[18,"眩晕","法师技能6眩晕","buff_name_8","buff_description_8",1,0,0,11111,5,null,2,1,1,0,0,0,[14],0,0,0,0,null,null,null,0,0,null,0,0,0,0,0,0,0,0,null,null],[19,"禁锢","法师技能8禁锢","buff_name_30","buff_description_30",1,0,0,11111,10,null,3,1,3,0,0,0,[15],0,0,0,0,null,null,null,0,0,null,0,0,0,0,0,0,0,0,null,null],[20,"减伤","法师技能9减伤","buff_name_35","buff_description_35",1,1,0,175014,1,null,3,1,8,0,0,0,[16],0,0,0,0,null,null,null,3,0,null,0,0,1,30,0,0,0,0,null,null],[21,"附魔","法师技能10附魔","buff_name_27","buff_description_27",1,0,0,175016,14,null,4,1,8,0,0,0,[17],0,0,0,0,null,null,[1],0,0,null,0,0,0,22,0,0,0,0,null,null],[22,"附魔dot","法师技能10附魔dot伤害","buff_name_29","buff_description_29",1,0,0,175016,9,null,1,2,0,2,1,0,[18],0,0,0,0,null,null,null,0,0,null,0,0,1,15,0,0,0,0,null,null],[23,"附魔dot","双手机通用火dot","buff_name_29","buff_description_29",1,0,0,175016,9,null,1,2,0,3,1,0,[25],0,0,0,0,null,null,null,0,0,null,0,0,1,20,0,0,0,0,null,null],[24,"禁锢","双手剑技能7禁锢","buff_name_30","buff_description_30",1,0,0,11111,10,null,3,1,2,0,0,0,[26],0,0,0,0,null,null,null,0,0,null,0,0,0,0,0,0,0,0,null,null],[25,"易伤","双手剑技能8易伤","buff_name_75","buff_description_75",1,1,0,175014,1,null,1,1,5,0,0,0,[7],0,0,0,0,null,null,null,14,0,null,0,0,1,25,0,0,0,0,null,null],[26,"减速","双手剑技能8减速","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,5,0,0,0,[27],0,0,0,0,null,null,null,1,0,null,0,0,1,-60,0,0,0,0,null,null],[27,"减伤","双手剑技能9减伤","buff_name_35","buff_description_35",1,1,0,175014,1,null,3,1,8,0,0,0,[28],0,0,0,0,null,null,null,3,0,null,0,0,1,45,0,0,0,0,null,null],[28,"加攻","双手剑技能10加攻","buff_name_39","buff_description_39",1,1,0,143692,1,null,4,1,8,0,0,0,[29],0,0,0,0,null,null,null,4,0,null,0,0,1,40,0,0,0,0,null,null],[29,"减速","双手剑技能6减速","buff_name_50","buff_description_50",1,0,0,175029,1,null,1,1,3,0,0,0,[31],0,0,0,0,null,null,null,1,0,null,0,0,1,-50,0,0,0,0,null,null]];
export interface IBuffElement extends IElementBase{
 	/**id*/
	id:number
	/**名称(方便查看)*/
	name:string
	/**buff描述(方便查看)*/
	description:string
	/**名称（多语言）*/
	name_lan:string
	/**buff描述（多语言）*/
	description_lan:string
	/**Buff类型（1普通buff 2职业被动3占卜4社团）*/
	buffGameType:number
	/**切换职业卡需要销毁的buff(1销毁0不销毁 不填默认销毁 通常对自己的buff销毁了)*/
	changeJobDestrory:number
	/**解锁等级*/
	unlockLevel:number
	/**图标*/
	icon:number
	/**0:无效果 1:基础属性变化 2:会生成新buff 3:会施放新的技能 4:改变宿主的模型 5:晕眩 6:吸附 7:变形 8:能量护盾 9:灼烧效果 10:禁锢 11:闪现 12:治疗 Buff的效果类型*/
	buffEffectType:number
	/**buff优先级校验*/
	checkIds:Array<number>
	/**0: 独占的，表示该id的buff身上只能有一个 1: 可叠加，表示身上可能同时有多个相同id的buff 2: 追加持续时间*/
	overlayType:number
	/**表示buff还是先前的，本次生成会追加前buff的Duration字段 3:刷新持续时间*/
	lifecycleType:number
	/**表示buff还是先前的，本次生成会刷新前buff的Duration字段 如果不是想挂到角色身上可以不填 buff的叠加方式*/
	duration:number
	/**0:永远存在的 1:有时限，受Duration约束 2:触发次数限定，受TriggerCount约束 buff的生命周期类型*/
	triggerCount:number
	/**>0*/
	triggerInterval:number
	/**在生命周期为 《有时限时》使用 持续时间(单位s)*/
	actionGuid:number
	/**触发次数*/
	effectGuids:Array<number>
	/**配合TriggerCount使用*/
	effectGuid:number
	/**表示触发的间隔 触发间隔(单位s)*/
	loop:number
	/**动作的guid*/
	effectDelayTime:number
	/**buff生成时产生的特效Guid*/
	effectSlotIndex:number
	/**buff生成时产生的特效Guid*/
	relativePos:Array<number>
	/**是否循环。0-不循环，1-循环*/
	relativeRot:Array<number>
	/**buff生成时特效延迟多久出现(单位s)*/
	scale:Array<number>
	/**特效挂载人物身上的插槽索引*/
	affectPropertyType:number
	/**单位和编辑器保持一致，应该是厘米 如果是不是挂到角色身上，就带表世界位置 特效挂载于人物插槽|物体时的相对位置*/
	buffTriggerOpportunity:number
	/**如果是不是挂到角色身上，就带表世界异界 特效挂载于人物插槽|物体时的相对朝向*/
	subBuffs:Array<number>
	/**特效缩放*/
	skillTriggerOpportunity:number
	/**配合BuffEffectType=1时使用，记录着这个类型的属性变化值 0:无用的 1: 移动速度 2: 最大生命值 3: 减伤 4: 近战攻击力 && 技能攻击力 5: 暴击率[0-100] 6: 增加伤害类道具效果 7: 最大能量 8: 生命偷取 影响的属性类型*/
	skillId:number
	/**仅对会施加子buff有用 0:无效的 1:主buff生成后立即执行 2:由触发次数的方式来触发，再每次触发时执行一次施放子buff 子buff的生效时机*/
	param1_Model:number
	/**配合BuffEffectType=2时使用，生成的子buff将是具有其自身的独立生命周期 该子buff应该是通用类型的buff，如果是特殊的， 建议由调用者来额外创建，指定特殊buff类 会生成的通用子buff*/
	param1:number
	/**仅对会调用新的技能时有用 0:无效的 1:主buff生成后立即执行 2:由触发次数的方式来触发，再每次触发时执行一次施放子buff 调用新的技能的生效时机*/
	param2_Model:number
	/**配合BuffEffectType=3时使用， 告诉外部需要释放一个新技能*/
	param2:number
	/**该技能建议是简单的，能通用被技能管理器施放的 PS：内部调用技能管理器来施放一个新技能，可能会缺少很多特殊的信息需求，所以如果技能特殊，由调用者来外部施放 会调用新的技能*/
	param3_Model:number
	/**0:值类型 1:百分比 参数Param1是值类型还是百分比类型*/
	param3:number
	/**参数1*/
	ps:string
	/**0:值类型 1:百分比 参数Param2是值类型还是百分比类型*/
	param4:mw.Vector
 } 
export class BuffConfig extends ConfigBase<IBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}