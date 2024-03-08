import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","Value","Value_CN","Value_JP"],["","Key|ReadByName","","MainLanguage","ChildLanguage","ChildLanguage"],[1,"seriesOfWorks_01",null,"Horror Park Series","恐怖乐园系列作品",null],[2,"Brand_1",null,"Please input the display content","请输入展示内容",null],[3,"UI_Dialog_1",null,"Confirm","确定",null],[4,"UI_Dialog_2",null,"Cancel","取消",null],[5,"UI_Dialog_11",null,"The input content contains illegal words; please re-enter","输入内容包含敏感词，请重新输入",null],[6,"camera_01",null,"No ghosts were captured","没有拍到任何鬼怪",null],[7,"camera_02",null,"Captured <color=#00ff00ff>{0}</color>, image recorded has been unlocked","拍到<color=#00ff00ff>{0}</color>，图录已解锁",null],[8,"back_03",null,"Return to lobby","返回大厅",null],[9,"go_01",null,"Do you want to go to {0}'s world?","是否前往{0}的世界",null],[10,"ReturnHall_01",null,"Do you want to return to the lobby?","是否返回大厅？",null],[11,"ReturnHall_02",null,"Yes","是",null],[12,"ReturnHall_03",null,"No","否",null],[13,"BackToHall_01",null,"Return to lobby","返回大厅",null],[14,"ghostLock_01",null,"Locked","待解锁",null],[15,"ghostName_01","鬼怪图录，鬼名字","Shadow","影人",null],[16,"ghostUnlock_01","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Haunt Isle\nBlood Moon Minion \nAnother \"Me\"","惊魂岛\n血月爪牙\n另一个\"我\"",null],[17,"ghostType_01","鬼怪图录，鬼类别","Category: Dark Creatures","类别: 黑暗的牲灵",null],[18,"ghostWeek_01","鬼怪图录，鬼弱点","Weakness: Extremely dislike obstructive buildings","弱点: 极度讨厌碍事的建筑",null],[19,"ghostBack_01","鬼怪图录，鬼相关背景介绍","Background: I know everything about you... your existence, your fears... Why should I only be your shadow? Replace me, or be destroyed!","背景: 我了解你的一切...\n你的存在、你的恐惧...\n凭什么我只能成为你的影子？\n取代我，或者消灭你！",null],[20,"ghostName_02",null,"Nurse Pamni","护士帕姆尼",null],[21,"ghostUnlock_02",null,"Asylum \nWandering \nEverywhere","疯人院\n四处游荡\n随处可见",null],[22,"ghostType_02",null,"Category: Red Moon Creature","类别: 红月生物",null],[23,"ghostWeek_02",null,"Weakness: Seemingly unable to enter certain doors","弱点: 似乎进不去一些门",null],[24,"ghostBack_02",null,"Background: Originally pure and kind creatures, they gradually lost themselves under the prolonged influence of the Red Moon. Even so, there is still a chance of salvation.","背景: 原本是纯洁善良的生物\n在红月的长时间浸染下，逐渐失去了自我\n即便如此，也仍有被拯救的可能",null],[25,"ghostName_03","鬼怪图录，鬼名字","Pamni","帕姆尼",null],[26,"ghostName_04","鬼怪图录，鬼名字","Crawling Pamni","阴暗爬行帕姆尼",null],[27,"ghostName_05","鬼怪图录，鬼名字","Shy Pamni","羞羞帕姆尼",null],[28,"ghostName_06","鬼怪图录，鬼名字","Flashing Pamni","闪灵帕姆尼",null],[29,"ghostUnlock_03","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nDigital Circus \nSuperstar","恐怖鬼校\n数字马戏团\n超级明星",null],[30,"ghostUnlock_04","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nUnable to Stand and Walk \nDark and Damp Places","恐怖鬼校\n无法站立行走\n阴暗潮湿的地方",null],[31,"ghostUnlock_05","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nShy Twisted Personality \nHiding with Dummies","恐怖鬼校\n害羞扭曲的性格\n和假人躲在一起",null],[32,"ghostUnlock_06","鬼怪图录，鬼未解锁的提示（位置等2-3个关键词）","Horror School \nFlashing\nOnly Appears on the Second Floor","恐怖鬼校\n一闪一闪\n只会在二楼出现",null],[33,"ghostType_03","鬼怪图录，鬼类别","Category: Ordinary Undead","类别: 普通亡灵",null],[34,"ghostType_04","鬼怪图录，鬼类别","Category: Animal Undead","类别: 动物亡灵",null],[35,"ghostType_05","鬼怪图录，鬼类别","Category: Shy Undead","类别: 羞羞亡灵",null],[36,"ghostType_06","鬼怪图录，鬼类别","Category: Flashing Undead","类别: 闪烁亡灵",null],[37,"ghostWeek_03","鬼怪图录，鬼弱点","Weakness: Fear of Magic Circles","弱点: 惧怕法阵",null],[38,"ghostWeek_04","鬼怪图录，鬼弱点","Weakness: Extremely hungry, craving food","弱点: 十分饥饿，渴望食物",null],[39,"ghostWeek_05","鬼怪图录，鬼弱点","Weakness: Staring at it is like magic; paralysis ensues","弱点: 对于他注视就像魔法，盯住就被麻痹了似的",null],[40,"ghostWeek_06","鬼怪图录，鬼弱点","Weakness: Confined to a fixed area","弱点: 被禁锢在固定区域",null],[41,"ghostBack_03","鬼怪图录，鬼相关背景介绍","Background: Pamni, who came from the Digital Circus and was controlled by the school's spirits, replicated Pamni's appearance, continuing to roam the school...","背景: 从数字马戏团穿越而来的帕姆尼，被学校怨灵所控制，怨灵复制了帕姆尼的外形，继续在学校中游荡……",null],[42,"ghostBack_04","鬼怪图录，鬼相关背景介绍","Background: Jack, the principal's beloved dog in the underground tunnels, fell victim to the Blood Moon's appearance, forcing the principal to take drastic measures. Jack, too, didn't survive and continues to use Pamni's body, seeking food in the sewers...","背景: 地下道中本是校长养着的爱犬——杰克，血月的出现迫使校长对它下了狠手，杰克也没能幸免，继续使用帕姆尼的身躯，在下水道寻找食物……",null],[43,"ghostBack_05","鬼怪图录，鬼相关背景介绍","Background: There was a girl who used to spend afternoons in the chemistry classroom. She was shy and met her end here, harmed by students using chemicals. Her spirit was sealed in this classroom...","背景: 以前，学校的化学教室中总有一个小女孩做实验到放学，她生性胆小害羞，最后却在这里被坏学生用化学药品伤害而亡，她的亡灵就被封印在了这间教室里……",null],[44,"ghostBack_06","鬼怪图录，鬼相关背景介绍","Background: The principal's office at school is strictly off-limits to students. They have never seen the principal enter the office directly. One day, a curious student followed the principal's route to the office but did not come out.","背景: 校长办公室是学校的禁地，学生从来没见过校长直接进入到办公室里。有一天，一个好奇的学生跟着校长的路线进入了办公室，他却再也没有出来过……",null],[45,"ghostName_07",null,"Anna","安娜",null],[46,"ghostName_08",null,"Frank","弗兰克",null],[47,"ghostName_09",null,"Tic","蒂奇",null],[48,"ghostName_10",null,"Alice","爱丽丝",null],[49,"ghostName_11",null,"Jack","杰克",null],[50,"ghostName_12",null,"Kelly","凯莉",null],[51,"ghostUnlock_07",null,"Zombie Ville \nShop \nRiverside","丧尸小镇\n商店\n河边",null],[52,"ghostUnlock_08",null,"Zombie Ville\nWandering Everywhere \nMain Road","丧尸小镇\n四处游荡\n必经之路",null],[53,"ghostUnlock_09",null,"Zombie Ville\nScythe \nAlways in the House","丧尸小镇\n镰刀\n总在屋子里",null],[54,"ghostUnlock_10",null,"Zombie Ville\nStaring at the Crossroads \nRed Pigtails","丧尸小镇\n岔路口发呆\n红发双马尾",null],[55,"ghostUnlock_11",null,"Zombie Ville\nPlump \nGiant Knife","丧尸小镇\n胖胖的\n巨大的刀",null],[56,"ghostUnlock_12",null,"Zombie Ville\nLoitering Near Home \nWhite Pigtails","丧尸小镇\n家附近闲逛\n白发双马尾",null],[57,"ghostType_07",null,"Normal Zombie","普通丧尸",null],[58,"ghostType_08",null,"Normal Zombie","普通丧尸",null],[59,"ghostType_09",null,"Special Zombie","特殊丧尸",null],[60,"ghostType_10",null,"Child Zombie","小孩丧尸",null],[61,"ghostType_11",null,"Special Zombie","特殊丧尸",null],[62,"ghostType_12",null,"Child Zombie","小孩丧尸\n",null],[63,"ghostWeek_07",null,"Weakness: Easily stunned","弱点: 十分容易被击晕",null],[64,"ghostWeek_08",null,"Weakness: Easily stunned","弱点: 十分容易被击晕",null],[65,"ghostWeek_09",null,"Weakness: Long stun duration","弱点: 击晕后晕倒时间长",null],[66,"ghostWeek_10",null,"Weakness: Small movement area","弱点: 行动区域小",null],[67,"ghostWeek_11",null,"Weakness: Slow movement","弱点: 行动缓慢",null],[68,"ghostWeek_12",null,"Weakness: No attacking ability","弱点: 不会攻击",null],[69,"ghostBack_07",null,"Background: Anna had always been troubled by the repetitive and joyless life in her town, but everything changed with the appearance of the Blood Moon, as she became the first affected person.","背景: 小镇的生活是重复的，毫无乐趣的，安娜一直为这无聊的生活而烦恼，她想改变。直到红月的出现，她成为了第一个被影响的人",null],[70,"ghostBack_08",null,"Background: Frank appears serious and reserved, rarely smiling or seeming youthful. He has a distinctly old-fashioned air, but he harbors his own private world.","背景: 弗兰克是个不苟言笑的人，在别人看来完全不像个年轻人，显得十分古板，但只有他自己知道，他有着自己的世界",null],[71,"ghostBack_09",null,"Background: He once wanted to be a pirate and put a scythe on his left hand, but his mother opposed. So, he became an expert in cutting wheat with his scythe and gained fame in the town.","背景: 曾经想当海盗，于是给左手装上镰刀，但受到母亲的反对，被母亲狠狠教育后，只能选择选择留在了小镇里，利用镰刀左手成为了小镇里有名的割麦子高手",null],[72,"ghostBack_10",null,"Background: Alice, once the naughtiest kid in town, grew silent and violent after being influenced by the Blood Moon. She now stays at the crossroads all day.","背景: 爱丽丝是小镇里最顽皮的小孩，每天在小镇里上窜下跳，但红月影响后，她变得沉默，整天呆在路口发呆，但脾气变得暴躁，攻击性极强",null],[73,"ghostBack_11",null,"Background: The town has only one butcher, who may look intimidating, but he is actually a very kind person. When the Blood Moon appeared, he was the first to step forward and use his huge knife to protect those who had not yet been affected by the moonlight.","背景: 小镇里唯一的屠夫，虽然长得很吓人但实际上是个热心肠。红月之后，他第一个站出来，用他巨大的刀守护还未受红月光芒影响的人",null],[74,"ghostBack_12",null,"Background: Kelly was the only person in town who was not affected by the Blood Moon. Before Jack was affected, he tried to protect her by locking her in a dark room. However, his efforts were in vain, and Kelly remained the only person in town who did not turn violent.","背景: 凯莉是小镇里最后一个被红月影响的人。杰克被影响前，用最后的理智将她锁在了见不到光的房间，终究无济于事，但她成为了小镇里唯一不会攻击的人",null],[75,"bag_01",null,null,"不是同一个品种的道具，移动失败！",null],[76,"bag_02",null,null,"道具",null],[77,"bag_03",null,null,"特殊",null],[78,"bag_04",null,null,"使用",null],[79,"bag_05",null,null,"移动",null],[80,"bag_06",null,null,"详细信息",null],[81,"bag_07",null,null,"使用",null],[82,"bag_08",null,null,"最大",null],[83,"bag_09",null,null,"取消",null],[84,"bag_10",null,null,"确定",null],[85,"bag_11",null,null,"使用成功",null],[86,"bag_12",null,null,"已经是最大数量",null],[87,"bag_13",null,null,"所用药量过猛！",null],[100,"shop_01",null,null,"神秘人商店",null],[101,"shop_02",null,null,"购买",null],[102,"shop_03",null,null,"我想要",null],[103,"sort_01",null,null,"默认排序",null],[104,"sort_02",null,null,"价格 ↑",null],[105,"sort_03",null,null,"价格 ↓",null],[106,"sort_04",null,null,"上架时间 ↑",null],[107,"sort_05",null,null,"上架时间 ↓",null],[108,"shoptips_01",null,null,"提示",null],[109,"shoptips_02",null,null,"取消",null],[110,"shoptips_03",null,null,"确定",null],[111,"shoptips_04",null,null,"确认使用{0}恐惧币购买{1}个{2}吗？",null],[112,"shoptips_05",null,null,"恐惧币不足，可前往购买恐惧币，确认前往",null],[113,"shoptips_06",null,null,"剩余次数不足，明天再来试试吧~",null],[114,"shop_04",null,null,"恭喜获得",null],[115,"shop_05",null,null,"确定",null],[116,"shop_06",null,null,"购买",null],[117,"shop_07",null,null,"最大",null],[118,"shop_08",null,null,"限购：{0}",null],[119,"shop_09",null,null,"概率获得",null],[120,"shop_10",null,null,"点击【我想要】按钮，将有惊喜发生噢~甚至有概率直接获得该道具！",null],[121,"shop_11",null,null,"所有道具",null],[122,"shop_12",null,null,"BUFF",null],[123,"shop_13",null,null,"消耗品",null],[124,"shop_14",null,null,"互动道具",null],[125,"shop_15",null,null,"礼包",null],[126,"shop_16",null,null,"恭喜你！成功获得了恐惧币！",null],[127,"shop_17",null,null,"本次登录不再提示",null],[150,"money_01",null,null,"恐惧币",null],[151,"money_02",null,null,"乐币",null],[1001,"RouteTeam_01",null,null,"组队跳转({0}/{1})",null],[1002,"RouteTeam_02",null,null,"{0}秒后跳转",null],[2000,"Currency_01",null,null,"获得了{0}恐惧币",null],[10000,"UI_item_10000",null,null,"复活卡",null],[10001,"UI_item_10001",null,null,"小血瓶",null],[10002,"UI_item_10002",null,null,"中血瓶",null],[10003,"UI_item_10003",null,null,"大血瓶",null],[10004,"UI_item_10004",null,null,"活力丹",null],[10005,"UI_item_10005",null,null,"单局双倍经验卡",null],[10006,"UI_item_10006",null,null,"一天双倍经验卡",null],[10007,"UI_item_10007",null,null,"三天双倍经验卡",null],[10008,"UI_item_10008",null,null,"七天双倍经验卡",null],[10009,"UI_item_10009",null,null,"一天三倍经验卡",null],[10010,"UI_item_10010",null,null,"小礼包",null],[10011,"UI_item_10011",null,null,"中礼包",null],[10012,"UI_item_10012",null,null,"大礼包",null],[10013,"UI_item_10013",null,null,"解谜提示卡",null],[10014,"UI_item_10014",null,null,"丘比特效",null],[10015,"UI_item_10015",null,null,"雪球",null],[10016,"UI_item_10016",null,null,"巴掌特效",null],[10017,"UI_item_10017",null,null,"鸡腿特效",null],[10018,"UI_item_10018",null,null,"欢呼特效",null],[10200,"UI_item_10200",null,null,"恐惧币",null],[10300,"UI_des_00",null,null,"具有神秘力量，使用后可直接复活，继续挑战！","复活卡"],[10301,"UI_des_01",null,null,"特殊药品，可随身携带的补血剂，使用可回复 5 血量","小血瓶"],[10302,"UI_des_02",null,null,"特殊药品，可随身携带的补血剂，使用可回复 20 血量","中血瓶"],[10303,"UI_des_03",null,null,"特殊药品，可随身携带的补血剂，使用可回复 50 血量","大血瓶"],[10304,"UI_des_04",null,null,"特殊药品，可随身携带的补血剂，使用可回复 100 血量","活力丹"],[10305,"UI_des_05",null,null,"使用后完成一局游戏，即可 双倍 经验加成","单局双倍经验卡"],[10306,"UI_des_06",null,null,"使用后一天内每完成一局游戏均有 双倍 经验加成","一天双倍经验卡"],[10307,"UI_des_07",null,null,"使用后三天内每完成一局游戏均有 双倍 经验加成","三天双倍经验卡"],[10308,"UI_des_08",null,null,"使用后七天内每完成一局游戏均有 双倍 经验加成","七天双倍经验卡"],[10309,"UI_des_09",null,null,"使用后一天内每完成一局游戏均有 三倍 经验加成","一天三倍经验卡"],[10310,"UI_des_10",null,null,"普通等级的礼包，打开即有概率获得礼包内奖品之一","小礼包"],[10311,"UI_des_11",null,null,"中等等级的礼包，打开即有概率获得礼包内奖品之一","中礼包"],[10312,"UI_des_12",null,null,"稀有等级的礼包，打开即有概率获得礼包内奖品之一","大礼包"],[10313,"UI_des_13",null,null,"遇到无法解决的谜题，就使用它吧！它将帮助你解谜！","解谜提示卡"],[10314,"UI_des_14",null,null,"使用后可以和其他玩家产生特殊互动效果","丘比特效"],[10315,"UI_des_15",null,null,"使用后可以和其他玩家产生特殊互动效果","雪球"],[10316,"UI_des_16",null,null,"使用后可以和其他玩家产生特殊互动效果","巴掌特效"],[10317,"UI_des_17",null,null,"使用后可以和其他玩家产生特殊互动效果","鸡腿特效"],[10318,"UI_des_18",null,null,"使用后可以和其他玩家产生特殊互动效果","欢呼特效"],[10500,"UI_des_200",null,null,"可以通过场景拾取、游玩游戏等方式获得",null],[10101,"packbuy_01",null,null,"是否兑换{0}",null],[10102,"packbuy_02",null,null,"开启{0}礼包",null],[10103,"quality_01",null,"common","普通",null],[10104,"quality_02",null,"uncommon","罕见",null],[10105,"quality_03",null,"rare","稀有",null],[10106,"quality_04",null,"epic","史诗",null],[10107,"quality_05",null,"legendary","传奇",null]];
export interface ISubLanguageElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**名字索引*/
	name:string
	/**描述*/
	desc:string
	/**英文*/
	Value:string
 } 
export class SubLanguageConfig extends ConfigBase<ISubLanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**Horror Park Series*/
	get seriesOfWorks_01():ISubLanguageElement{return this.getElement(1)};
	/**Please input the display content*/
	get Brand_1():ISubLanguageElement{return this.getElement(2)};
	/**Confirm*/
	get UI_Dialog_1():ISubLanguageElement{return this.getElement(3)};
	/**Cancel*/
	get UI_Dialog_2():ISubLanguageElement{return this.getElement(4)};
	/**The input content contains illegal words; please re-enter*/
	get UI_Dialog_11():ISubLanguageElement{return this.getElement(5)};
	/**No ghosts were captured*/
	get camera_01():ISubLanguageElement{return this.getElement(6)};
	/**Captured <color=#00ff00ff>{0}</color>, image recorded has been unlocked*/
	get camera_02():ISubLanguageElement{return this.getElement(7)};
	/**Return to lobby*/
	get back_03():ISubLanguageElement{return this.getElement(8)};
	/**Do you want to go to {0}'s world?*/
	get go_01():ISubLanguageElement{return this.getElement(9)};
	/**Do you want to return to the lobby?*/
	get ReturnHall_01():ISubLanguageElement{return this.getElement(10)};
	/**Yes*/
	get ReturnHall_02():ISubLanguageElement{return this.getElement(11)};
	/**No*/
	get ReturnHall_03():ISubLanguageElement{return this.getElement(12)};
	/**Return to lobby*/
	get BackToHall_01():ISubLanguageElement{return this.getElement(13)};
	/**Locked*/
	get ghostLock_01():ISubLanguageElement{return this.getElement(14)};
	/**Shadow*/
	get ghostName_01():ISubLanguageElement{return this.getElement(15)};
	/**Haunt Isle
Blood Moon Minion 
Another "Me"*/
	get ghostUnlock_01():ISubLanguageElement{return this.getElement(16)};
	/**Category: Dark Creatures*/
	get ghostType_01():ISubLanguageElement{return this.getElement(17)};
	/**Weakness: Extremely dislike obstructive buildings*/
	get ghostWeek_01():ISubLanguageElement{return this.getElement(18)};
	/**Background: I know everything about you... your existence, your fears... Why should I only be your shadow? Replace me, or be destroyed!*/
	get ghostBack_01():ISubLanguageElement{return this.getElement(19)};
	/**Nurse Pamni*/
	get ghostName_02():ISubLanguageElement{return this.getElement(20)};
	/**Asylum 
Wandering 
Everywhere*/
	get ghostUnlock_02():ISubLanguageElement{return this.getElement(21)};
	/**Category: Red Moon Creature*/
	get ghostType_02():ISubLanguageElement{return this.getElement(22)};
	/**Weakness: Seemingly unable to enter certain doors*/
	get ghostWeek_02():ISubLanguageElement{return this.getElement(23)};
	/**Background: Originally pure and kind creatures, they gradually lost themselves under the prolonged influence of the Red Moon. Even so, there is still a chance of salvation.*/
	get ghostBack_02():ISubLanguageElement{return this.getElement(24)};
	/**Pamni*/
	get ghostName_03():ISubLanguageElement{return this.getElement(25)};
	/**Crawling Pamni*/
	get ghostName_04():ISubLanguageElement{return this.getElement(26)};
	/**Shy Pamni*/
	get ghostName_05():ISubLanguageElement{return this.getElement(27)};
	/**Flashing Pamni*/
	get ghostName_06():ISubLanguageElement{return this.getElement(28)};
	/**Horror School 
Digital Circus 
Superstar*/
	get ghostUnlock_03():ISubLanguageElement{return this.getElement(29)};
	/**Horror School 
Unable to Stand and Walk 
Dark and Damp Places*/
	get ghostUnlock_04():ISubLanguageElement{return this.getElement(30)};
	/**Horror School 
Shy Twisted Personality 
Hiding with Dummies*/
	get ghostUnlock_05():ISubLanguageElement{return this.getElement(31)};
	/**Horror School 
Flashing
Only Appears on the Second Floor*/
	get ghostUnlock_06():ISubLanguageElement{return this.getElement(32)};
	/**Category: Ordinary Undead*/
	get ghostType_03():ISubLanguageElement{return this.getElement(33)};
	/**Category: Animal Undead*/
	get ghostType_04():ISubLanguageElement{return this.getElement(34)};
	/**Category: Shy Undead*/
	get ghostType_05():ISubLanguageElement{return this.getElement(35)};
	/**Category: Flashing Undead*/
	get ghostType_06():ISubLanguageElement{return this.getElement(36)};
	/**Weakness: Fear of Magic Circles*/
	get ghostWeek_03():ISubLanguageElement{return this.getElement(37)};
	/**Weakness: Extremely hungry, craving food*/
	get ghostWeek_04():ISubLanguageElement{return this.getElement(38)};
	/**Weakness: Staring at it is like magic; paralysis ensues*/
	get ghostWeek_05():ISubLanguageElement{return this.getElement(39)};
	/**Weakness: Confined to a fixed area*/
	get ghostWeek_06():ISubLanguageElement{return this.getElement(40)};
	/**Background: Pamni, who came from the Digital Circus and was controlled by the school's spirits, replicated Pamni's appearance, continuing to roam the school...*/
	get ghostBack_03():ISubLanguageElement{return this.getElement(41)};
	/**Background: Jack, the principal's beloved dog in the underground tunnels, fell victim to the Blood Moon's appearance, forcing the principal to take drastic measures. Jack, too, didn't survive and continues to use Pamni's body, seeking food in the sewers...*/
	get ghostBack_04():ISubLanguageElement{return this.getElement(42)};
	/**Background: There was a girl who used to spend afternoons in the chemistry classroom. She was shy and met her end here, harmed by students using chemicals. Her spirit was sealed in this classroom...*/
	get ghostBack_05():ISubLanguageElement{return this.getElement(43)};
	/**Background: The principal's office at school is strictly off-limits to students. They have never seen the principal enter the office directly. One day, a curious student followed the principal's route to the office but did not come out.*/
	get ghostBack_06():ISubLanguageElement{return this.getElement(44)};
	/**Anna*/
	get ghostName_07():ISubLanguageElement{return this.getElement(45)};
	/**Frank*/
	get ghostName_08():ISubLanguageElement{return this.getElement(46)};
	/**Tic*/
	get ghostName_09():ISubLanguageElement{return this.getElement(47)};
	/**Alice*/
	get ghostName_10():ISubLanguageElement{return this.getElement(48)};
	/**Jack*/
	get ghostName_11():ISubLanguageElement{return this.getElement(49)};
	/**Kelly*/
	get ghostName_12():ISubLanguageElement{return this.getElement(50)};
	/**Zombie Ville 
Shop 
Riverside*/
	get ghostUnlock_07():ISubLanguageElement{return this.getElement(51)};
	/**Zombie Ville
Wandering Everywhere 
Main Road*/
	get ghostUnlock_08():ISubLanguageElement{return this.getElement(52)};
	/**Zombie Ville
Scythe 
Always in the House*/
	get ghostUnlock_09():ISubLanguageElement{return this.getElement(53)};
	/**Zombie Ville
Staring at the Crossroads 
Red Pigtails*/
	get ghostUnlock_10():ISubLanguageElement{return this.getElement(54)};
	/**Zombie Ville
Plump 
Giant Knife*/
	get ghostUnlock_11():ISubLanguageElement{return this.getElement(55)};
	/**Zombie Ville
Loitering Near Home 
White Pigtails*/
	get ghostUnlock_12():ISubLanguageElement{return this.getElement(56)};
	/**Normal Zombie*/
	get ghostType_07():ISubLanguageElement{return this.getElement(57)};
	/**Normal Zombie*/
	get ghostType_08():ISubLanguageElement{return this.getElement(58)};
	/**Special Zombie*/
	get ghostType_09():ISubLanguageElement{return this.getElement(59)};
	/**Child Zombie*/
	get ghostType_10():ISubLanguageElement{return this.getElement(60)};
	/**Special Zombie*/
	get ghostType_11():ISubLanguageElement{return this.getElement(61)};
	/**Child Zombie*/
	get ghostType_12():ISubLanguageElement{return this.getElement(62)};
	/**Weakness: Easily stunned*/
	get ghostWeek_07():ISubLanguageElement{return this.getElement(63)};
	/**Weakness: Easily stunned*/
	get ghostWeek_08():ISubLanguageElement{return this.getElement(64)};
	/**Weakness: Long stun duration*/
	get ghostWeek_09():ISubLanguageElement{return this.getElement(65)};
	/**Weakness: Small movement area*/
	get ghostWeek_10():ISubLanguageElement{return this.getElement(66)};
	/**Weakness: Slow movement*/
	get ghostWeek_11():ISubLanguageElement{return this.getElement(67)};
	/**Weakness: No attacking ability*/
	get ghostWeek_12():ISubLanguageElement{return this.getElement(68)};
	/**Background: Anna had always been troubled by the repetitive and joyless life in her town, but everything changed with the appearance of the Blood Moon, as she became the first affected person.*/
	get ghostBack_07():ISubLanguageElement{return this.getElement(69)};
	/**Background: Frank appears serious and reserved, rarely smiling or seeming youthful. He has a distinctly old-fashioned air, but he harbors his own private world.*/
	get ghostBack_08():ISubLanguageElement{return this.getElement(70)};
	/**Background: He once wanted to be a pirate and put a scythe on his left hand, but his mother opposed. So, he became an expert in cutting wheat with his scythe and gained fame in the town.*/
	get ghostBack_09():ISubLanguageElement{return this.getElement(71)};
	/**Background: Alice, once the naughtiest kid in town, grew silent and violent after being influenced by the Blood Moon. She now stays at the crossroads all day.*/
	get ghostBack_10():ISubLanguageElement{return this.getElement(72)};
	/**Background: The town has only one butcher, who may look intimidating, but he is actually a very kind person. When the Blood Moon appeared, he was the first to step forward and use his huge knife to protect those who had not yet been affected by the moonlight.*/
	get ghostBack_11():ISubLanguageElement{return this.getElement(73)};
	/**Background: Kelly was the only person in town who was not affected by the Blood Moon. Before Jack was affected, he tried to protect her by locking her in a dark room. However, his efforts were in vain, and Kelly remained the only person in town who did not turn violent.*/
	get ghostBack_12():ISubLanguageElement{return this.getElement(74)};
	/**null*/
	get bag_01():ISubLanguageElement{return this.getElement(75)};
	/**null*/
	get bag_02():ISubLanguageElement{return this.getElement(76)};
	/**null*/
	get bag_03():ISubLanguageElement{return this.getElement(77)};
	/**null*/
	get bag_04():ISubLanguageElement{return this.getElement(78)};
	/**null*/
	get bag_05():ISubLanguageElement{return this.getElement(79)};
	/**null*/
	get bag_06():ISubLanguageElement{return this.getElement(80)};
	/**null*/
	get bag_07():ISubLanguageElement{return this.getElement(81)};
	/**null*/
	get bag_08():ISubLanguageElement{return this.getElement(82)};
	/**null*/
	get bag_09():ISubLanguageElement{return this.getElement(83)};
	/**null*/
	get bag_10():ISubLanguageElement{return this.getElement(84)};
	/**null*/
	get bag_11():ISubLanguageElement{return this.getElement(85)};
	/**null*/
	get bag_12():ISubLanguageElement{return this.getElement(86)};
	/**null*/
	get bag_13():ISubLanguageElement{return this.getElement(87)};
	/**null*/
	get shop_01():ISubLanguageElement{return this.getElement(100)};
	/**null*/
	get shop_02():ISubLanguageElement{return this.getElement(101)};
	/**null*/
	get shop_03():ISubLanguageElement{return this.getElement(102)};
	/**null*/
	get sort_01():ISubLanguageElement{return this.getElement(103)};
	/**null*/
	get sort_02():ISubLanguageElement{return this.getElement(104)};
	/**null*/
	get sort_03():ISubLanguageElement{return this.getElement(105)};
	/**null*/
	get sort_04():ISubLanguageElement{return this.getElement(106)};
	/**null*/
	get sort_05():ISubLanguageElement{return this.getElement(107)};
	/**null*/
	get shoptips_01():ISubLanguageElement{return this.getElement(108)};
	/**null*/
	get shoptips_02():ISubLanguageElement{return this.getElement(109)};
	/**null*/
	get shoptips_03():ISubLanguageElement{return this.getElement(110)};
	/**null*/
	get shoptips_04():ISubLanguageElement{return this.getElement(111)};
	/**null*/
	get shoptips_05():ISubLanguageElement{return this.getElement(112)};
	/**null*/
	get shoptips_06():ISubLanguageElement{return this.getElement(113)};
	/**null*/
	get shop_04():ISubLanguageElement{return this.getElement(114)};
	/**null*/
	get shop_05():ISubLanguageElement{return this.getElement(115)};
	/**null*/
	get shop_06():ISubLanguageElement{return this.getElement(116)};
	/**null*/
	get shop_07():ISubLanguageElement{return this.getElement(117)};
	/**null*/
	get shop_08():ISubLanguageElement{return this.getElement(118)};
	/**null*/
	get shop_09():ISubLanguageElement{return this.getElement(119)};
	/**null*/
	get shop_10():ISubLanguageElement{return this.getElement(120)};
	/**null*/
	get shop_11():ISubLanguageElement{return this.getElement(121)};
	/**null*/
	get shop_12():ISubLanguageElement{return this.getElement(122)};
	/**null*/
	get shop_13():ISubLanguageElement{return this.getElement(123)};
	/**null*/
	get shop_14():ISubLanguageElement{return this.getElement(124)};
	/**null*/
	get shop_15():ISubLanguageElement{return this.getElement(125)};
	/**null*/
	get shop_16():ISubLanguageElement{return this.getElement(126)};
	/**null*/
	get shop_17():ISubLanguageElement{return this.getElement(127)};
	/**null*/
	get money_01():ISubLanguageElement{return this.getElement(150)};
	/**null*/
	get money_02():ISubLanguageElement{return this.getElement(151)};
	/**null*/
	get RouteTeam_01():ISubLanguageElement{return this.getElement(1001)};
	/**null*/
	get RouteTeam_02():ISubLanguageElement{return this.getElement(1002)};
	/**null*/
	get Currency_01():ISubLanguageElement{return this.getElement(2000)};
	/**null*/
	get UI_item_10000():ISubLanguageElement{return this.getElement(10000)};
	/**null*/
	get UI_item_10001():ISubLanguageElement{return this.getElement(10001)};
	/**null*/
	get UI_item_10002():ISubLanguageElement{return this.getElement(10002)};
	/**null*/
	get UI_item_10003():ISubLanguageElement{return this.getElement(10003)};
	/**null*/
	get UI_item_10004():ISubLanguageElement{return this.getElement(10004)};
	/**null*/
	get UI_item_10005():ISubLanguageElement{return this.getElement(10005)};
	/**null*/
	get UI_item_10006():ISubLanguageElement{return this.getElement(10006)};
	/**null*/
	get UI_item_10007():ISubLanguageElement{return this.getElement(10007)};
	/**null*/
	get UI_item_10008():ISubLanguageElement{return this.getElement(10008)};
	/**null*/
	get UI_item_10009():ISubLanguageElement{return this.getElement(10009)};
	/**null*/
	get UI_item_10010():ISubLanguageElement{return this.getElement(10010)};
	/**null*/
	get UI_item_10011():ISubLanguageElement{return this.getElement(10011)};
	/**null*/
	get UI_item_10012():ISubLanguageElement{return this.getElement(10012)};
	/**null*/
	get UI_item_10013():ISubLanguageElement{return this.getElement(10013)};
	/**null*/
	get UI_item_10014():ISubLanguageElement{return this.getElement(10014)};
	/**null*/
	get UI_item_10015():ISubLanguageElement{return this.getElement(10015)};
	/**null*/
	get UI_item_10016():ISubLanguageElement{return this.getElement(10016)};
	/**null*/
	get UI_item_10017():ISubLanguageElement{return this.getElement(10017)};
	/**null*/
	get UI_item_10018():ISubLanguageElement{return this.getElement(10018)};
	/**null*/
	get UI_item_10200():ISubLanguageElement{return this.getElement(10200)};
	/**null*/
	get UI_des_00():ISubLanguageElement{return this.getElement(10300)};
	/**null*/
	get UI_des_01():ISubLanguageElement{return this.getElement(10301)};
	/**null*/
	get UI_des_02():ISubLanguageElement{return this.getElement(10302)};
	/**null*/
	get UI_des_03():ISubLanguageElement{return this.getElement(10303)};
	/**null*/
	get UI_des_04():ISubLanguageElement{return this.getElement(10304)};
	/**null*/
	get UI_des_05():ISubLanguageElement{return this.getElement(10305)};
	/**null*/
	get UI_des_06():ISubLanguageElement{return this.getElement(10306)};
	/**null*/
	get UI_des_07():ISubLanguageElement{return this.getElement(10307)};
	/**null*/
	get UI_des_08():ISubLanguageElement{return this.getElement(10308)};
	/**null*/
	get UI_des_09():ISubLanguageElement{return this.getElement(10309)};
	/**null*/
	get UI_des_10():ISubLanguageElement{return this.getElement(10310)};
	/**null*/
	get UI_des_11():ISubLanguageElement{return this.getElement(10311)};
	/**null*/
	get UI_des_12():ISubLanguageElement{return this.getElement(10312)};
	/**null*/
	get UI_des_13():ISubLanguageElement{return this.getElement(10313)};
	/**null*/
	get UI_des_14():ISubLanguageElement{return this.getElement(10314)};
	/**null*/
	get UI_des_15():ISubLanguageElement{return this.getElement(10315)};
	/**null*/
	get UI_des_16():ISubLanguageElement{return this.getElement(10316)};
	/**null*/
	get UI_des_17():ISubLanguageElement{return this.getElement(10317)};
	/**null*/
	get UI_des_18():ISubLanguageElement{return this.getElement(10318)};
	/**null*/
	get UI_des_200():ISubLanguageElement{return this.getElement(10500)};
	/**null*/
	get packbuy_01():ISubLanguageElement{return this.getElement(10101)};
	/**null*/
	get packbuy_02():ISubLanguageElement{return this.getElement(10102)};
	/**common*/
	get quality_01():ISubLanguageElement{return this.getElement(10103)};
	/**uncommon*/
	get quality_02():ISubLanguageElement{return this.getElement(10104)};
	/**rare*/
	get quality_03():ISubLanguageElement{return this.getElement(10105)};
	/**epic*/
	get quality_04():ISubLanguageElement{return this.getElement(10106)};
	/**legendary*/
	get quality_05():ISubLanguageElement{return this.getElement(10107)};

}