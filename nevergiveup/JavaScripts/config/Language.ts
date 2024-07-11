import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Name","Value","Value_CN","Comment"],["","Key|ReadByName","MainLanguage","ChildLanguage",""],[20001,"Text_Task","Quest","任务",null],[20002,"Text_MainTask","Main Quest","一级目标",null],[20003,"Text_SubTask","Subordinary Quest","二级目标",null],[20004,"Text_NoFinishTaskTips","Quest not yet completed!","还未完成任务",null],[20005,"Text_FinishMainTask","All main quests are completed!","已完成所有主线任务",null],[20006,"Text_FinishTaskTips","Completed task {0}!","已完成任务{0}","{0}=任务名称"],[20007,"Text_NoFinish","Go","前往完成",null],[20008,"Text_GetAward","Claim","领取",null],[20009,"Img_Reward","162271","162274",null],[20010,"Text_MainTaskfinish","Main quests are completed!","主线任务已完成",null],[20011,"Text_NoMainTask","Main quests are completed!","主线任务已完成",null],[20012,"Text_TaskLock","Complete the previous quest to unlock!","完成前置任务以解锁此任务!",null],[20013,"Text_BuyCard","Buy","购买",null],[20014,"Text_UnEquipCard","Remove","卸下",null],[20015,"Text_EquipCard","Equip","装备",null],[20016,"Text_AttackTag0","Normal","普通 ",null],[20017,"Text_AttackTag1","Detector","反隐",null],[20018,"Text_AttackTag2","Air-DEF","对空",null],[20019,"Text_AttackTag3","Penetration","破甲",null],[20020,"Text_AttackTag4","Vertigo","硬控",null],[20021,"Text_AttackTag5","Boss","Boss ",null],[20022,"Text_AttackTagTips","Attack Types: ","可攻击类型: ",null],[20023,"Text_LessLevel","Open at Lv.{0}","达到Lv.{0}开放",null],[20024,"Text_CreatePlayerName","<size=24>Builder: </size><size=18>{0}</size>","<size=24>建造者: </size><size=18>{0}</size>",null],[20025,"Text_AttackTowerStr","<size=24>Total Damage: </size><size=18>{0}</size>","<size=24>总输出: </size><size=18>{0}</size>",null],[20026,"Text_FarmTowerStr","<size=24>Total Yield: </size><size=18>{0}</size>","<size=24>总产出: </size><size=18>{0}</size>",null],[20027,"Text_AirdropGainText","Obtained ","获得了 ",null],[20028,"Text_AirdropGainTower","Trial Tower * {0}!","试用塔 x{0} !",null],[20029,"Text_AirdropGainInGameGold","Gold * {0}!","建造金币 x{0} !",null],[20030,"Text_AirdropGainBuff","New buff!","增益Buff !",null],[20031,"Text_AirdropGainCash","Cash * {0}!","纸币 x{0} !",null],[20032,"Text_AirdropBagFull","The trial backpack is full!","试用背包已达上限!",null],[20033,"Text_Unranked","Not In","未上榜 ",null],[20034,"Text_Name","Player","昵称",null],[20035,"Text_Gold","Gold","金币",null],[20036,"Text_Damage","Damage","伤害",null],[20037,"Text_Pause","Pause","暂停",null],[20038,"Text_Wave","Wave: ","波次：",null],[20039,"Text_Win","Victory","胜利 ",null],[20040,"Text_Defeat","Defeat","失败 ",null],[20041,"Text_Perfect","Perfect ","完美 ",null],[20042,"Text_First","First ","首次 ",null],[20043,"Text_GameTime","Time: ","耗时： ",null],[20044,"Text_FinishWave","Wave: ","完成波次： ",null],[20045,"Text_Unlock","Unlocked","已解锁",null],[20046,"Text_NotSatisfied","Unable to unlock","未满足解锁条件 ",null],[20047,"Text_Upgrade","Upgrade","升级 ",null],[20048,"Text_MaxLevel","Full Level ","已满级 ",null],[20049,"Text_CardsFull","The slots are full. Remove some cards first! ","卡牌栏已满,请先卸下其他卡牌! ",null],[20050,"Text_CardNotEmpty","Equip at least one card! ","最少装备一个卡牌! ",null],[20051,"Text_TooFase","Operation too fast. Please try again later! ","操作太快，请稍等片刻再试! ",null],[20052,"Text_BuyAndEquip","Purchased successfully. The card has been automatically equipped.","购买成功,已自动装备! ",null],[20053,"Text_LessGold","You need more gold.","金币不足 ",null],[20054,"Text_CardIsUnlock","The unit has been unlocked.","该兵种已解锁 ",null],[20055,"Text_RankLevel","Rank","排名",null],[20056,"Text_LevelRank","Level Rank","等级排行榜 ",null],[20057,"Text_GoldRank","Gold Rank","金币排行榜 ",null],[20058,"Text_Level","Level","等级 ",null],[20059,"Text_LessMaterial","You don't have enough materials.","材料不足! ",null],[20060,"Text_Unlocked","It has been unlocked! ","已经解锁过了! ",null],[20061,"Text_SuccessUnlock","Unlocked successfully! ","解锁成功! ",null],[20062,"Text_MonsterComing","Powerful monsters are approaching!","强力怪物正在接近 ",null],[20063,"Text_LastWave","The last wave! ","最后一波！ ",null],[20064,"Text_BossComing","The boss is coming!","Boss来袭 ",null],[20065,"Text_SecondStart","s...","秒后开始",null],[20066,"Text_Pilot","Navigator","领航员",null],[20067,"Text_Guide1","Welcome back to the survivor camp. Let's fight off the infected and rebuild our home! ","欢迎回到幸存者营地，让我们抵御感染者，重建家园吧！ ",null],[20068,"Text_Guide2","Create a gunner unit first.","先创建一个枪手单位 ",null],[20069,"Text_Guide3","This unit has already entered the battlefield! ","他已经投入作战了！ ",null],[20070,"Text_Guide4","Now try to create another one! ","现在再尝试创建一个！ ",null],[20071,"Text_Guide5","The boss is coming! Upgrade the unit. You can tap to view the unit details! ","BOSS来袭！对单位进行升级，点击可以查看单位详情！ ",null],[20072,"Text_Guide6","The upgrade is successful! Defeat the attacking boss! ","升级成功，快打倒来袭的BOSS！ ",null],[20073,"Text_Guide7","You win a new card from the victory. Let's see how to use it! ","刚刚的胜利让我们获得了一张新卡牌，来看看如何使用吧！ ",null],[20074,"Text_Guide8","Go try your new card in < World 1 >!","快去<世界1>试试新的卡牌吧！ ",null],[20075,"Text_Guide9","In solo mode, you can speed up the game by using the accelerator button. ","在单人模式下，可以通过使用加速按钮来加快游戏进程 ",null],[20076,"Text_Guide10","In [Quest], you can get generous gifts by finishing the daily quests.","在任务界面可以领取每日任务，完成任务可以获得丰厚的奖励 ",null],[20077,"Text_Guide11","You can unlock technology in [Talent]. Go and have a look! ","在科技树中可以解锁科技，快去看看吧！ ",null],[20078,"Text_Easy","Easy","简单 ",null],[20079,"Text_Normal","Normal","普通 ",null],[20080,"Text_Difficult","Hard","困难 ",null],[20081,"Text_StartHouseOwner","Only the room owner can start the game. ","只有房主才能开始游戏 ",null],[20082,"Text_AfterLastDifficulty","Complete the previous difficulty first!","请先完成上一难度 ",null],[20083,"Text_DifficultyHouseOwner","Only the room owner can change the difficulty. ","只有房主才能选择难度 ",null],[20084,"Text_Choosen"," (Selected)"," (已选)",null],[20085,"Text_RecommendLevel","Recommended Level.","推荐等级Lv.",null],[20086,"Text_UnlockAfterLastDifficulty","Not unlocked yet","完成上一难度解锁 ",null],[20087,"Text_SpecialEnemy","Elite: ","特殊怪物： ",null],[20088,"Text_CountDown","Countdown: ","倒计时： ",null],[20089,"Text_CantDo","Currently inoperable!","暂时无法操作 ",null],[20090,"Text_AppointedCreate","Tap to create a tower. ","请点击指定位置创建塔 ",null],[20091,"Text_AppointedUpgrade","Tap the tower to upgrade. ","请点击指定塔升级 ",null],[20092,"Text_TowerMaxLevel","The information of the tower is abnormal or full! ","塔的信息异常或已满级! ",null],[20093,"Text_TowerFull","The number of towers has reached the upper limit!","当前塔数量已达上限！",null],[20094,"Text_AttackTagStage1","Invisible","隐身 ",null],[20095,"Text_AttackTagStage2","Flying","飞行 ",null],[20096,"Text_AttackTagStage3","Armored","装甲 ",null],[20097,"Text_AttackTagStage4","Immune","免控 ",null],[20098,"Tower_name_1","Gunslinger","枪手",null],[20099,"Tower_name_2","Rifleman","步枪手",null],[20100,"Tower_name_3","Machine Gun","机枪手",null],[20101,"Tower_name_4","Sniper","狙击手",null],[20102,"Tower_name_5","Artilleryman","火炮手",null],[20103,"Tower_name_6","SF Soldier","特种兵",null],[20104,"Tower_name_7","Demolitionist","爆破专家",null],[20105,"Tower_name_8","Missile","歼击导弹",null],[20106,"Tower_name_9","Commando","海豹突击手",null],[20107,"Tower_name_10","Shotgunner","霰弹枪兵",null],[20108,"Tower_name_11","Gold Miner","金币矿机",null],[20109,"Tower_name_12","Morale Flag","鼓舞旗帜",null],[20110,"Tower_attackTags_1","Attack: ","攻击力:",null],[20111,"Tower_attackTags_2","Interval: ","攻击间隔:",null],[20112,"Tower_attackTags_3","Pellet Count: ","单次射击数：",null],[20113,"Tower_attackTags_4","Attack Range: ","攻击范围：",null],[20114,"Tower_attackTags_5","Throw Count: ","单次投掷数：",null],[20115,"Tower_attackTags_6","Shoot Count: ","单次发射数：",null],[20116,"Tower_attackTags_7","Each Yield: ","每次产量：",null],[20117,"Tower_attackTags_8","Interval: ","产出间隔：",null],[20118,"Tower_attackTags_9","Attack Multiplier: ","攻击增幅：",null],[20119,"Tower_attackTags_10","Scope of Influence: ","影响范围：",null],[20120,"Monster_name_1","Zombie","丧尸",null],[20121,"Monster_name_2","Speedy Zombie","快速丧尸",null],[20122,"Monster_name_3","Zombie King","僵尸王",null],[20123,"Monster_name_4","Flying","飞行",null],[20124,"Monster_name_5","Nurse","护士",null],[20125,"Monster_name_6","Hook Freak","铁钩怪人",null],[20126,"Item_nameKey_1","Cash","纸币",null],[20127,"Item_nameKey_2","Tech Point","科技点",null],[20128,"Item_nameKey_3","EXP","经验",null],[20129,"Stage_stageName_1","World 1 - Easy","世界1-简单",null],[20130,"Stage_stageName_2","World 1 - Normal","世界1-普通",null],[20131,"Stage_stageName_3","World 1 - Hard","世界1-困难",null],[20132,"Stage_stageName_4","World 2 - Easy","世界2-简单",null],[20133,"Stage_stageName_5","World 2 - Normal","世界2-普通",null],[20134,"Stage_stageName_6","World 2 - Hard","世界2-困难",null],[20135,"Stage_stageName_7","World 3 - Easy","世界3-简单",null],[20136,"Stage_stageName_8","World 3 - Normal","世界3-普通",null],[20137,"Stage_stageName_9","World 3 - Hard","世界3-困难",null],[20138,"Stage_stageName_10","World 4 - Easy","世界4-简单",null],[20139,"Stage_stageName_11","World 4 - Normal","世界4-普通",null],[20140,"Stage_stageName_12","World 4 - Hard","世界4-困难",null],[20141,"Stage_stageName_13","World 5 - Easy","世界5-简单",null],[20142,"Stage_stageName_14","World 5 - Normal","世界5-普通",null],[20143,"Stage_stageName_15","World 5 - Hard","世界5-困难",null],[20144,"Task_taskName_1","Tech R&D {0}","科技研发{0}",null],[20145,"Task_taskName_2","Legion Builder {0}","军团缔造者{0}",null],[20146,"Task_taskName_3","Frontline Debut {0}","初上前线{0}",null],[20147,"Task_taskName_4","Field Expert {0}","沙场老兵{0}",null],[20148,"Task_taskName_5","Horror Slayer {0}","怪物杀手{0}",null],[20149,"Task_taskName_6","Horror Hunter {0}","怪物猎手{0}",null],[20150,"Task_taskName_7","Horror Cleaner {0}","怪物肃清者{0}",null],[20151,"Task_taskName_8","Terminator {0}","终结者{0}",null],[20152,"Task_taskName_9","Defensive Test {0}","防御挑战{0}",null],[20153,"Task_taskName_10","Slaying Test {0}","杀敌挑战{0}",null],[20154,"Task_taskinfo_1","Stage Pass {0}","通关{0}",null],[20155,"Task_taskinfo_2","Unlock Technology <color=#5769E0FF>{0}</color>","解锁科技<color=#5769E0FF>{0}</color>",null],[20156,"Task_taskinfo_3","Unlock {0} unit types","解锁兵种{0}个",null],[20157,"Task_taskinfo_4","Play {0} games","游玩{0}局游戏",null],[20158,"Task_taskinfo_5","Defeat {0} monsters","击败{0}个怪物",null],[20159,"TechTree_NameKey_1","Attack UP {0}","攻击强化{0}",null],[20160,"TechTree_NameKey_2","Attack Speed UP {0}","攻速强化{0}",null],[20161,"TechTree_NameKey_3","Range UP {0}","射程强化{0}",null],[20162,"TechTree_NameKey_4","Monster Maiming {0}","怪物致残{0}",null],[20163,"TechTree_NameKey_5","Range Increase","射程大幅提升",null],[20164,"TechTree_NameKey_6","Attack Enhancement","攻击大幅强化",null],[20165,"TechTree_NameKey_7","ATK SPD Increase","攻速大幅强化",null],[20166,"TechTree_NameKey_8","Monster Deceleration","怪物大幅减速",null],[20167,"TechTree_desc_1","Improve Attack power of all available units by {0}.","所有可攻击兵种攻击力提高{0}",null],[20168,"TechTree_desc_2","Reduce Attack Interval of all available units by {0}%.","所有可攻击兵种攻击间隔降低{0}%",null],[20169,"TechTree_desc_3","Improve Attack range of all available units by {0}.","所有可攻击兵种攻击范围提高{0}点",null],[20170,"TechTree_desc_4","Increase Damage taken by all monsters by {0}%.","所有怪物受到的伤害提升{0}%",null],[20171,"TechTree_desc_5","Improve Attack range of all available units by {0}%.","所有可攻击兵种攻击范围提高{0}%",null],[20172,"TechTree_desc_6","Improve Attack power of all available units by {0}%.","所有可攻击兵种攻击力提高{0}%",null],[20173,"TechTree_desc_7","Reduce Attack Interval of all available units by {0}s.","所有可攻击兵种攻击间隔降低{0}秒",null],[20174,"TechTree_desc_8","Reduce Speed of all monsters by {0}.","所有怪物移动速度降低{0}点",null],[20175,"UI_1","Next Wave:","距离下一波：",null],[20176,"UI_2","Wave: {0}","波次：{0}",null],[20177,"UI_3","Skip this wave?","是否跳过这波",null],[20178,"UI_4","Talent","科技树",null],[20179,"UI_5","Shop","商店",null],[20180,"UI_6","Options","设置",null],[20181,"UI_7","Main","主线",null],[20182,"UI_8","Daily","日常",null],[20183,"UI_9","Completed","已完成",null],[20184,"UI_10","Quest completed.","任务完成",null],[20185,"UI_11","Sell","出售",null],[20186,"UI_12","Equipped","已装备",null],[20187,"UI_13","Technology","科技",null],[20188,"UI_14","Tech: ","科技：",null],[20189,"UI_15","Effect: ","效果：",null],[20190,"UI_16","Required Materials: ","所需材料：",null],[20191,"UI_17","Unlock","解锁",null],[20192,"UI_18","Select Difficulty","难度选择",null],[20193,"UI_19","Party","队列",null],[20194,"UI_20","Countdown: {0}","倒计时：{0}",null],[20195,"UI_21","Go","立即前往",null],[20196,"UI_22","Rewards: ","获得奖励：",null],[20197,"UI_23","Continue","继续",null],[20198,"UI_24","BGM","背景音乐",null],[20199,"UI_25","SFX","音效",null],[20200,"UI_26","Shall we team up?","一起组队吗？",null],[20201,"UI_27","Quickly organize defense!","怪物要来了，快组织防御",null],[20202,"UI_28","Can you leave me some grids?","可以给我留一些格子吗？",null],[20203,"UI_29","I'm new here asking for a lead.","我是新手，大佬求带带",null],[20204,"UI_30","Let's create a Gold Miner first.","先放下一些金币矿机吧",null],[20205,"UI_31","Set up the defense line!","BOSS要来了，快布置好防线！",null],[20206,"UI_32","Where are you from?","你来自哪里啊？",null],[20207,"UI_33","Yep! That's right!","对！没错！",null],[20208,"UI_34","Do you need help?","你需要帮助吗？",null],[20209,"UI_35","Wanna play a game with us?","你想跟我们一起玩游戏吗？",null],[20210,"UI_36","Uhuh, that's it!","没错！就是那样！",null],[20211,"UI_37","I'm leaving now.","我走了",null],[20212,"UI_38","See you next time!","下次再见~",null],[20213,"Tag_dialog_1","There are invisible monsters. Use the anti-stealth units!","出现了会隐身的怪物，快使用能反隐的兵种！",null],[20214,"Tag_dialog_2","Use gunslingers or snipers to shoot down those flying guys.","快使用枪手或者狙击手将那些飞行的家伙打下来",null],[20215,"Tag_dialog_3","Monster with thick armor! Try some heavy firepower units!","这是有厚实护甲的怪物，尝试用一些重火力兵种攻击吧！",null],[20216,"Tag_dialog_4","These monsters are immune to your decelerating effect. Be careful!","这些怪物可以免疫你的减速效果，小心！",null],[20217,"Tag_dialog_5","The invulnerable boss is here. Quickly gather fire to defeat him!","实力强大的Boss来了，快集火击倒他！",null],[20218,"UI_39","View","查看",null],[20219,"Text_AirdropComing","Airdrop is coming! Go and pick up the rewards!","空投降临 !快去拾取奖励吧！",null],[20220,"buffAirdrop_name1","<color=#5769E0FF>Attack greatly enhanced</color>","<color=#5769E0FF>攻击大幅强化</color>",null],[20221,"buffAirdrop_name2","<color=#5769E0FF>Shoot Range greatly enhanced</color>","<color=#5769E0FF>射程大幅提升</color>",null],[20222,"buffAirdrop_name3","<color=#5769E0FF>Attack Speed greatly enhanced</color>","<color=#5769E0FF>攻速大幅强化</color>",null],[20223,"UI_40","The rear area is currently not open","后面的区域暂未开放",null],[20224,"UI_41","LV.{0}+open","LV{0}+开放",null],[20225,"UI_42","Start","开始",null],[20226,"UI_43","Leave","离开",null],[20227,"UI_44","Daily task reset time: ","日常任务重置时间：",null]];
export interface ILanguageElement extends IElementBase{
 	/**序号*/
	id:number
	/**名字*/
	Name:string
	/**英文*/
	Value:string
	/**备注*/
	Comment:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**任务*/
	get Text_Task():ILanguageElement{return this.getElement(20001)};
	/**一级目标*/
	get Text_MainTask():ILanguageElement{return this.getElement(20002)};
	/**二级目标*/
	get Text_SubTask():ILanguageElement{return this.getElement(20003)};
	/**还未完成任务*/
	get Text_NoFinishTaskTips():ILanguageElement{return this.getElement(20004)};
	/**已完成所有主线任务*/
	get Text_FinishMainTask():ILanguageElement{return this.getElement(20005)};
	/**已完成任务{0}*/
	get Text_FinishTaskTips():ILanguageElement{return this.getElement(20006)};
	/**前往完成*/
	get Text_NoFinish():ILanguageElement{return this.getElement(20007)};
	/**领取*/
	get Text_GetAward():ILanguageElement{return this.getElement(20008)};
	/**162274*/
	get Img_Reward():ILanguageElement{return this.getElement(20009)};
	/**主线任务已完成*/
	get Text_MainTaskfinish():ILanguageElement{return this.getElement(20010)};
	/**主线任务已完成*/
	get Text_NoMainTask():ILanguageElement{return this.getElement(20011)};
	/**完成前置任务以解锁此任务!*/
	get Text_TaskLock():ILanguageElement{return this.getElement(20012)};
	/**购买*/
	get Text_BuyCard():ILanguageElement{return this.getElement(20013)};
	/**卸下*/
	get Text_UnEquipCard():ILanguageElement{return this.getElement(20014)};
	/**装备*/
	get Text_EquipCard():ILanguageElement{return this.getElement(20015)};
	/**普通 */
	get Text_AttackTag0():ILanguageElement{return this.getElement(20016)};
	/**反隐*/
	get Text_AttackTag1():ILanguageElement{return this.getElement(20017)};
	/**对空*/
	get Text_AttackTag2():ILanguageElement{return this.getElement(20018)};
	/**破甲*/
	get Text_AttackTag3():ILanguageElement{return this.getElement(20019)};
	/**硬控*/
	get Text_AttackTag4():ILanguageElement{return this.getElement(20020)};
	/**Boss */
	get Text_AttackTag5():ILanguageElement{return this.getElement(20021)};
	/**可攻击类型: */
	get Text_AttackTagTips():ILanguageElement{return this.getElement(20022)};
	/**达到Lv.{0}开放*/
	get Text_LessLevel():ILanguageElement{return this.getElement(20023)};
	/**<size=24>建造者: </size><size=18>{0}</size>*/
	get Text_CreatePlayerName():ILanguageElement{return this.getElement(20024)};
	/**<size=24>总输出: </size><size=18>{0}</size>*/
	get Text_AttackTowerStr():ILanguageElement{return this.getElement(20025)};
	/**<size=24>总产出: </size><size=18>{0}</size>*/
	get Text_FarmTowerStr():ILanguageElement{return this.getElement(20026)};
	/**获得了 */
	get Text_AirdropGainText():ILanguageElement{return this.getElement(20027)};
	/**试用塔 x{0} !*/
	get Text_AirdropGainTower():ILanguageElement{return this.getElement(20028)};
	/**建造金币 x{0} !*/
	get Text_AirdropGainInGameGold():ILanguageElement{return this.getElement(20029)};
	/**增益Buff !*/
	get Text_AirdropGainBuff():ILanguageElement{return this.getElement(20030)};
	/**纸币 x{0} !*/
	get Text_AirdropGainCash():ILanguageElement{return this.getElement(20031)};
	/**试用背包已达上限!*/
	get Text_AirdropBagFull():ILanguageElement{return this.getElement(20032)};
	/**未上榜 */
	get Text_Unranked():ILanguageElement{return this.getElement(20033)};
	/**昵称*/
	get Text_Name():ILanguageElement{return this.getElement(20034)};
	/**金币*/
	get Text_Gold():ILanguageElement{return this.getElement(20035)};
	/**伤害*/
	get Text_Damage():ILanguageElement{return this.getElement(20036)};
	/**暂停*/
	get Text_Pause():ILanguageElement{return this.getElement(20037)};
	/**波次：*/
	get Text_Wave():ILanguageElement{return this.getElement(20038)};
	/**胜利 */
	get Text_Win():ILanguageElement{return this.getElement(20039)};
	/**失败 */
	get Text_Defeat():ILanguageElement{return this.getElement(20040)};
	/**完美 */
	get Text_Perfect():ILanguageElement{return this.getElement(20041)};
	/**首次 */
	get Text_First():ILanguageElement{return this.getElement(20042)};
	/**耗时： */
	get Text_GameTime():ILanguageElement{return this.getElement(20043)};
	/**完成波次： */
	get Text_FinishWave():ILanguageElement{return this.getElement(20044)};
	/**已解锁*/
	get Text_Unlock():ILanguageElement{return this.getElement(20045)};
	/**未满足解锁条件 */
	get Text_NotSatisfied():ILanguageElement{return this.getElement(20046)};
	/**升级 */
	get Text_Upgrade():ILanguageElement{return this.getElement(20047)};
	/**已满级 */
	get Text_MaxLevel():ILanguageElement{return this.getElement(20048)};
	/**卡牌栏已满,请先卸下其他卡牌! */
	get Text_CardsFull():ILanguageElement{return this.getElement(20049)};
	/**最少装备一个卡牌! */
	get Text_CardNotEmpty():ILanguageElement{return this.getElement(20050)};
	/**操作太快，请稍等片刻再试! */
	get Text_TooFase():ILanguageElement{return this.getElement(20051)};
	/**购买成功,已自动装备! */
	get Text_BuyAndEquip():ILanguageElement{return this.getElement(20052)};
	/**金币不足 */
	get Text_LessGold():ILanguageElement{return this.getElement(20053)};
	/**该兵种已解锁 */
	get Text_CardIsUnlock():ILanguageElement{return this.getElement(20054)};
	/**排名*/
	get Text_RankLevel():ILanguageElement{return this.getElement(20055)};
	/**等级排行榜 */
	get Text_LevelRank():ILanguageElement{return this.getElement(20056)};
	/**金币排行榜 */
	get Text_GoldRank():ILanguageElement{return this.getElement(20057)};
	/**等级 */
	get Text_Level():ILanguageElement{return this.getElement(20058)};
	/**材料不足! */
	get Text_LessMaterial():ILanguageElement{return this.getElement(20059)};
	/**已经解锁过了! */
	get Text_Unlocked():ILanguageElement{return this.getElement(20060)};
	/**解锁成功! */
	get Text_SuccessUnlock():ILanguageElement{return this.getElement(20061)};
	/**强力怪物正在接近 */
	get Text_MonsterComing():ILanguageElement{return this.getElement(20062)};
	/**最后一波！ */
	get Text_LastWave():ILanguageElement{return this.getElement(20063)};
	/**Boss来袭 */
	get Text_BossComing():ILanguageElement{return this.getElement(20064)};
	/**秒后开始*/
	get Text_SecondStart():ILanguageElement{return this.getElement(20065)};
	/**领航员*/
	get Text_Pilot():ILanguageElement{return this.getElement(20066)};
	/**欢迎回到幸存者营地，让我们抵御感染者，重建家园吧！ */
	get Text_Guide1():ILanguageElement{return this.getElement(20067)};
	/**先创建一个枪手单位 */
	get Text_Guide2():ILanguageElement{return this.getElement(20068)};
	/**他已经投入作战了！ */
	get Text_Guide3():ILanguageElement{return this.getElement(20069)};
	/**现在再尝试创建一个！ */
	get Text_Guide4():ILanguageElement{return this.getElement(20070)};
	/**BOSS来袭！对单位进行升级，点击可以查看单位详情！ */
	get Text_Guide5():ILanguageElement{return this.getElement(20071)};
	/**升级成功，快打倒来袭的BOSS！ */
	get Text_Guide6():ILanguageElement{return this.getElement(20072)};
	/**刚刚的胜利让我们获得了一张新卡牌，来看看如何使用吧！ */
	get Text_Guide7():ILanguageElement{return this.getElement(20073)};
	/**快去<世界1>试试新的卡牌吧！ */
	get Text_Guide8():ILanguageElement{return this.getElement(20074)};
	/**在单人模式下，可以通过使用加速按钮来加快游戏进程 */
	get Text_Guide9():ILanguageElement{return this.getElement(20075)};
	/**在任务界面可以领取每日任务，完成任务可以获得丰厚的奖励 */
	get Text_Guide10():ILanguageElement{return this.getElement(20076)};
	/**在科技树中可以解锁科技，快去看看吧！ */
	get Text_Guide11():ILanguageElement{return this.getElement(20077)};
	/**简单 */
	get Text_Easy():ILanguageElement{return this.getElement(20078)};
	/**普通 */
	get Text_Normal():ILanguageElement{return this.getElement(20079)};
	/**困难 */
	get Text_Difficult():ILanguageElement{return this.getElement(20080)};
	/**只有房主才能开始游戏 */
	get Text_StartHouseOwner():ILanguageElement{return this.getElement(20081)};
	/**请先完成上一难度 */
	get Text_AfterLastDifficulty():ILanguageElement{return this.getElement(20082)};
	/**只有房主才能选择难度 */
	get Text_DifficultyHouseOwner():ILanguageElement{return this.getElement(20083)};
	/** (已选)*/
	get Text_Choosen():ILanguageElement{return this.getElement(20084)};
	/**推荐等级Lv.*/
	get Text_RecommendLevel():ILanguageElement{return this.getElement(20085)};
	/**完成上一难度解锁 */
	get Text_UnlockAfterLastDifficulty():ILanguageElement{return this.getElement(20086)};
	/**特殊怪物： */
	get Text_SpecialEnemy():ILanguageElement{return this.getElement(20087)};
	/**倒计时： */
	get Text_CountDown():ILanguageElement{return this.getElement(20088)};
	/**暂时无法操作 */
	get Text_CantDo():ILanguageElement{return this.getElement(20089)};
	/**请点击指定位置创建塔 */
	get Text_AppointedCreate():ILanguageElement{return this.getElement(20090)};
	/**请点击指定塔升级 */
	get Text_AppointedUpgrade():ILanguageElement{return this.getElement(20091)};
	/**塔的信息异常或已满级! */
	get Text_TowerMaxLevel():ILanguageElement{return this.getElement(20092)};
	/**当前塔数量已达上限！*/
	get Text_TowerFull():ILanguageElement{return this.getElement(20093)};
	/**隐身 */
	get Text_AttackTagStage1():ILanguageElement{return this.getElement(20094)};
	/**飞行 */
	get Text_AttackTagStage2():ILanguageElement{return this.getElement(20095)};
	/**装甲 */
	get Text_AttackTagStage3():ILanguageElement{return this.getElement(20096)};
	/**免控 */
	get Text_AttackTagStage4():ILanguageElement{return this.getElement(20097)};
	/**枪手*/
	get Tower_name_1():ILanguageElement{return this.getElement(20098)};
	/**步枪手*/
	get Tower_name_2():ILanguageElement{return this.getElement(20099)};
	/**机枪手*/
	get Tower_name_3():ILanguageElement{return this.getElement(20100)};
	/**狙击手*/
	get Tower_name_4():ILanguageElement{return this.getElement(20101)};
	/**火炮手*/
	get Tower_name_5():ILanguageElement{return this.getElement(20102)};
	/**特种兵*/
	get Tower_name_6():ILanguageElement{return this.getElement(20103)};
	/**爆破专家*/
	get Tower_name_7():ILanguageElement{return this.getElement(20104)};
	/**歼击导弹*/
	get Tower_name_8():ILanguageElement{return this.getElement(20105)};
	/**海豹突击手*/
	get Tower_name_9():ILanguageElement{return this.getElement(20106)};
	/**霰弹枪兵*/
	get Tower_name_10():ILanguageElement{return this.getElement(20107)};
	/**金币矿机*/
	get Tower_name_11():ILanguageElement{return this.getElement(20108)};
	/**鼓舞旗帜*/
	get Tower_name_12():ILanguageElement{return this.getElement(20109)};
	/**攻击力:*/
	get Tower_attackTags_1():ILanguageElement{return this.getElement(20110)};
	/**攻击间隔:*/
	get Tower_attackTags_2():ILanguageElement{return this.getElement(20111)};
	/**单次射击数：*/
	get Tower_attackTags_3():ILanguageElement{return this.getElement(20112)};
	/**攻击范围：*/
	get Tower_attackTags_4():ILanguageElement{return this.getElement(20113)};
	/**单次投掷数：*/
	get Tower_attackTags_5():ILanguageElement{return this.getElement(20114)};
	/**单次发射数：*/
	get Tower_attackTags_6():ILanguageElement{return this.getElement(20115)};
	/**每次产量：*/
	get Tower_attackTags_7():ILanguageElement{return this.getElement(20116)};
	/**产出间隔：*/
	get Tower_attackTags_8():ILanguageElement{return this.getElement(20117)};
	/**攻击增幅：*/
	get Tower_attackTags_9():ILanguageElement{return this.getElement(20118)};
	/**影响范围：*/
	get Tower_attackTags_10():ILanguageElement{return this.getElement(20119)};
	/**丧尸*/
	get Monster_name_1():ILanguageElement{return this.getElement(20120)};
	/**快速丧尸*/
	get Monster_name_2():ILanguageElement{return this.getElement(20121)};
	/**僵尸王*/
	get Monster_name_3():ILanguageElement{return this.getElement(20122)};
	/**飞行*/
	get Monster_name_4():ILanguageElement{return this.getElement(20123)};
	/**护士*/
	get Monster_name_5():ILanguageElement{return this.getElement(20124)};
	/**铁钩怪人*/
	get Monster_name_6():ILanguageElement{return this.getElement(20125)};
	/**纸币*/
	get Item_nameKey_1():ILanguageElement{return this.getElement(20126)};
	/**科技点*/
	get Item_nameKey_2():ILanguageElement{return this.getElement(20127)};
	/**经验*/
	get Item_nameKey_3():ILanguageElement{return this.getElement(20128)};
	/**世界1-简单*/
	get Stage_stageName_1():ILanguageElement{return this.getElement(20129)};
	/**世界1-普通*/
	get Stage_stageName_2():ILanguageElement{return this.getElement(20130)};
	/**世界1-困难*/
	get Stage_stageName_3():ILanguageElement{return this.getElement(20131)};
	/**世界2-简单*/
	get Stage_stageName_4():ILanguageElement{return this.getElement(20132)};
	/**世界2-普通*/
	get Stage_stageName_5():ILanguageElement{return this.getElement(20133)};
	/**世界2-困难*/
	get Stage_stageName_6():ILanguageElement{return this.getElement(20134)};
	/**世界3-简单*/
	get Stage_stageName_7():ILanguageElement{return this.getElement(20135)};
	/**世界3-普通*/
	get Stage_stageName_8():ILanguageElement{return this.getElement(20136)};
	/**世界3-困难*/
	get Stage_stageName_9():ILanguageElement{return this.getElement(20137)};
	/**世界4-简单*/
	get Stage_stageName_10():ILanguageElement{return this.getElement(20138)};
	/**世界4-普通*/
	get Stage_stageName_11():ILanguageElement{return this.getElement(20139)};
	/**世界4-困难*/
	get Stage_stageName_12():ILanguageElement{return this.getElement(20140)};
	/**世界5-简单*/
	get Stage_stageName_13():ILanguageElement{return this.getElement(20141)};
	/**世界5-普通*/
	get Stage_stageName_14():ILanguageElement{return this.getElement(20142)};
	/**世界5-困难*/
	get Stage_stageName_15():ILanguageElement{return this.getElement(20143)};
	/**科技研发{0}*/
	get Task_taskName_1():ILanguageElement{return this.getElement(20144)};
	/**军团缔造者{0}*/
	get Task_taskName_2():ILanguageElement{return this.getElement(20145)};
	/**初上前线{0}*/
	get Task_taskName_3():ILanguageElement{return this.getElement(20146)};
	/**沙场老兵{0}*/
	get Task_taskName_4():ILanguageElement{return this.getElement(20147)};
	/**怪物杀手{0}*/
	get Task_taskName_5():ILanguageElement{return this.getElement(20148)};
	/**怪物猎手{0}*/
	get Task_taskName_6():ILanguageElement{return this.getElement(20149)};
	/**怪物肃清者{0}*/
	get Task_taskName_7():ILanguageElement{return this.getElement(20150)};
	/**终结者{0}*/
	get Task_taskName_8():ILanguageElement{return this.getElement(20151)};
	/**防御挑战{0}*/
	get Task_taskName_9():ILanguageElement{return this.getElement(20152)};
	/**杀敌挑战{0}*/
	get Task_taskName_10():ILanguageElement{return this.getElement(20153)};
	/**通关{0}*/
	get Task_taskinfo_1():ILanguageElement{return this.getElement(20154)};
	/**解锁科技<color=#5769E0FF>{0}</color>*/
	get Task_taskinfo_2():ILanguageElement{return this.getElement(20155)};
	/**解锁兵种{0}个*/
	get Task_taskinfo_3():ILanguageElement{return this.getElement(20156)};
	/**游玩{0}局游戏*/
	get Task_taskinfo_4():ILanguageElement{return this.getElement(20157)};
	/**击败{0}个怪物*/
	get Task_taskinfo_5():ILanguageElement{return this.getElement(20158)};
	/**攻击强化{0}*/
	get TechTree_NameKey_1():ILanguageElement{return this.getElement(20159)};
	/**攻速强化{0}*/
	get TechTree_NameKey_2():ILanguageElement{return this.getElement(20160)};
	/**射程强化{0}*/
	get TechTree_NameKey_3():ILanguageElement{return this.getElement(20161)};
	/**怪物致残{0}*/
	get TechTree_NameKey_4():ILanguageElement{return this.getElement(20162)};
	/**射程大幅提升*/
	get TechTree_NameKey_5():ILanguageElement{return this.getElement(20163)};
	/**攻击大幅强化*/
	get TechTree_NameKey_6():ILanguageElement{return this.getElement(20164)};
	/**攻速大幅强化*/
	get TechTree_NameKey_7():ILanguageElement{return this.getElement(20165)};
	/**怪物大幅减速*/
	get TechTree_NameKey_8():ILanguageElement{return this.getElement(20166)};
	/**所有可攻击兵种攻击力提高{0}*/
	get TechTree_desc_1():ILanguageElement{return this.getElement(20167)};
	/**所有可攻击兵种攻击间隔降低{0}%*/
	get TechTree_desc_2():ILanguageElement{return this.getElement(20168)};
	/**所有可攻击兵种攻击范围提高{0}点*/
	get TechTree_desc_3():ILanguageElement{return this.getElement(20169)};
	/**所有怪物受到的伤害提升{0}%*/
	get TechTree_desc_4():ILanguageElement{return this.getElement(20170)};
	/**所有可攻击兵种攻击范围提高{0}%*/
	get TechTree_desc_5():ILanguageElement{return this.getElement(20171)};
	/**所有可攻击兵种攻击力提高{0}%*/
	get TechTree_desc_6():ILanguageElement{return this.getElement(20172)};
	/**所有可攻击兵种攻击间隔降低{0}秒*/
	get TechTree_desc_7():ILanguageElement{return this.getElement(20173)};
	/**所有怪物移动速度降低{0}点*/
	get TechTree_desc_8():ILanguageElement{return this.getElement(20174)};
	/**距离下一波：*/
	get UI_1():ILanguageElement{return this.getElement(20175)};
	/**波次：{0}*/
	get UI_2():ILanguageElement{return this.getElement(20176)};
	/**是否跳过这波*/
	get UI_3():ILanguageElement{return this.getElement(20177)};
	/**科技树*/
	get UI_4():ILanguageElement{return this.getElement(20178)};
	/**商店*/
	get UI_5():ILanguageElement{return this.getElement(20179)};
	/**设置*/
	get UI_6():ILanguageElement{return this.getElement(20180)};
	/**主线*/
	get UI_7():ILanguageElement{return this.getElement(20181)};
	/**日常*/
	get UI_8():ILanguageElement{return this.getElement(20182)};
	/**已完成*/
	get UI_9():ILanguageElement{return this.getElement(20183)};
	/**任务完成*/
	get UI_10():ILanguageElement{return this.getElement(20184)};
	/**出售*/
	get UI_11():ILanguageElement{return this.getElement(20185)};
	/**已装备*/
	get UI_12():ILanguageElement{return this.getElement(20186)};
	/**科技*/
	get UI_13():ILanguageElement{return this.getElement(20187)};
	/**科技：*/
	get UI_14():ILanguageElement{return this.getElement(20188)};
	/**效果：*/
	get UI_15():ILanguageElement{return this.getElement(20189)};
	/**所需材料：*/
	get UI_16():ILanguageElement{return this.getElement(20190)};
	/**解锁*/
	get UI_17():ILanguageElement{return this.getElement(20191)};
	/**难度选择*/
	get UI_18():ILanguageElement{return this.getElement(20192)};
	/**队列*/
	get UI_19():ILanguageElement{return this.getElement(20193)};
	/**倒计时：{0}*/
	get UI_20():ILanguageElement{return this.getElement(20194)};
	/**立即前往*/
	get UI_21():ILanguageElement{return this.getElement(20195)};
	/**获得奖励：*/
	get UI_22():ILanguageElement{return this.getElement(20196)};
	/**继续*/
	get UI_23():ILanguageElement{return this.getElement(20197)};
	/**背景音乐*/
	get UI_24():ILanguageElement{return this.getElement(20198)};
	/**音效*/
	get UI_25():ILanguageElement{return this.getElement(20199)};
	/**一起组队吗？*/
	get UI_26():ILanguageElement{return this.getElement(20200)};
	/**怪物要来了，快组织防御*/
	get UI_27():ILanguageElement{return this.getElement(20201)};
	/**可以给我留一些格子吗？*/
	get UI_28():ILanguageElement{return this.getElement(20202)};
	/**我是新手，大佬求带带*/
	get UI_29():ILanguageElement{return this.getElement(20203)};
	/**先放下一些金币矿机吧*/
	get UI_30():ILanguageElement{return this.getElement(20204)};
	/**BOSS要来了，快布置好防线！*/
	get UI_31():ILanguageElement{return this.getElement(20205)};
	/**你来自哪里啊？*/
	get UI_32():ILanguageElement{return this.getElement(20206)};
	/**对！没错！*/
	get UI_33():ILanguageElement{return this.getElement(20207)};
	/**你需要帮助吗？*/
	get UI_34():ILanguageElement{return this.getElement(20208)};
	/**你想跟我们一起玩游戏吗？*/
	get UI_35():ILanguageElement{return this.getElement(20209)};
	/**没错！就是那样！*/
	get UI_36():ILanguageElement{return this.getElement(20210)};
	/**我走了*/
	get UI_37():ILanguageElement{return this.getElement(20211)};
	/**下次再见~*/
	get UI_38():ILanguageElement{return this.getElement(20212)};
	/**出现了会隐身的怪物，快使用能反隐的兵种！*/
	get Tag_dialog_1():ILanguageElement{return this.getElement(20213)};
	/**快使用枪手或者狙击手将那些飞行的家伙打下来*/
	get Tag_dialog_2():ILanguageElement{return this.getElement(20214)};
	/**这是有厚实护甲的怪物，尝试用一些重火力兵种攻击吧！*/
	get Tag_dialog_3():ILanguageElement{return this.getElement(20215)};
	/**这些怪物可以免疫你的减速效果，小心！*/
	get Tag_dialog_4():ILanguageElement{return this.getElement(20216)};
	/**实力强大的Boss来了，快集火击倒他！*/
	get Tag_dialog_5():ILanguageElement{return this.getElement(20217)};
	/**查看*/
	get UI_39():ILanguageElement{return this.getElement(20218)};
	/**空投降临 !快去拾取奖励吧！*/
	get Text_AirdropComing():ILanguageElement{return this.getElement(20219)};
	/**<color=#5769E0FF>攻击大幅强化</color>*/
	get buffAirdrop_name1():ILanguageElement{return this.getElement(20220)};
	/**<color=#5769E0FF>射程大幅提升</color>*/
	get buffAirdrop_name2():ILanguageElement{return this.getElement(20221)};
	/**<color=#5769E0FF>攻速大幅强化</color>*/
	get buffAirdrop_name3():ILanguageElement{return this.getElement(20222)};
	/**后面的区域暂未开放*/
	get UI_40():ILanguageElement{return this.getElement(20223)};
	/**LV{0}+开放*/
	get UI_41():ILanguageElement{return this.getElement(20224)};
	/**开始*/
	get UI_42():ILanguageElement{return this.getElement(20225)};
	/**离开*/
	get UI_43():ILanguageElement{return this.getElement(20226)};
	/**日常任务重置时间：*/
	get UI_44():ILanguageElement{return this.getElement(20227)};

}