import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Name","Value","Value_CN","Comment"],["","Key|ReadByName","MainLanguage","ChildLanguage",""],[20001,"Text_Task","Quest","任务",null],[20002,"Text_MainTask","Main Quest","一级目标",null],[20003,"Text_SubTask","Subordinary Quest","二级目标",null],[20004,"Text_NoFinishTaskTips","Quest not yet completed!","还未完成任务",null],[20005,"Text_FinishMainTask","All main quests are completed!","已完成所有主线任务",null],[20006,"Text_FinishTaskTips","Completed task {0}!","已完成任务{0}","{0}=任务名称"],[20007,"Text_NoFinish","Go","前往完成",null],[20008,"Text_GetAward","Claim","领取",null],[20009,"Img_Reward","162271","162274",null],[20010,"Text_MainTaskfinish","Main quests are completed!","主线任务已完成",null],[20011,"Text_NoMainTask","Main quests are completed!","主线任务已完成",null],[20012,"Text_TaskLock","Complete the previous quest to unlock!","完成前置任务以解锁此任务!",null],[20013,"Text_BuyCard","Buy","购买",null],[20014,"Text_UnEquipCard","Remove","卸下",null],[20015,"Text_EquipCard","Equip","装备",null],[20016,"Text_AttackTag0","Normal","普通 ",null],[20017,"Text_AttackTag1","Detector","反隐",null],[20018,"Text_AttackTag2","Air-DEF","对空",null],[20019,"Text_AttackTag3","Penetration","破甲",null],[20020,"Text_AttackTag4","Vertigo","硬控",null],[20021,"Text_AttackTag5","Boss","Boss ",null],[20022,"Text_AttackTagTips","Attack Types: ","可攻击类型: ",null],[20023,"Text_LessLevel","Open at Lv.{0}","达到Lv.{0}开放",null],[20024,"Text_CreatePlayerName","<size=24>Builder: </size><size=18>{0}</size>","<size=24>建造者: </size><size=18>{0}</size>",null],[20025,"Text_AttackTowerStr","<size=24>Total Damage: </size><size=18>{0}</size>","<size=24>总输出: </size><size=18>{0}</size>",null],[20026,"Text_FarmTowerStr","<size=24>Total Yield: </size><size=18>{0}</size>","<size=24>总产出: </size><size=18>{0}</size>",null],[20027,"Text_AirdropGainText","Obtained ","获得了 ",null],[20028,"Text_AirdropGainTower","Trial Tower * {0}!","试用塔 x{0} !",null],[20029,"Text_AirdropGainInGameGold","Gold * {0}!","建造金币 x{0} !",null],[20030,"Text_AirdropGainBuff","New buff!","增益Buff !",null],[20031,"Text_AirdropGainCash","Cash * {0}!","纸币 x{0} !",null],[20032,"Text_AirdropBagFull","The trial backpack is full!","试用背包已达上限!",null],[20033,"Text_Unranked","Not In","未上榜 ",null],[20034,"Text_Name","Player","昵称",null],[20035,"Text_Gold","Gold","金币",null],[20036,"Text_Damage","Damage","伤害",null],[20037,"Text_Pause","Pause","暂停",null],[20038,"Text_Wave","Wave: ","波次：",null],[20039,"Text_Win","Victory","胜利 ",null],[20040,"Text_Defeat","Defeat","失败 ",null],[20041,"Text_Perfect","Perfect ","完美 ",null],[20042,"Text_First","First ","首次 ",null],[20043,"Text_GameTime","Time: ","耗时： ",null],[20044,"Text_FinishWave","Wave: ","完成波次： ",null],[20045,"Text_Unlock","Unlocked","已解锁",null],[20046,"Text_NotSatisfied","Unable to unlock","未满足解锁条件 ",null],[20047,"Text_Upgrade","Upgrade","升级 ",null],[20048,"Text_MaxLevel","Full Level ","已满级 ",null],[20049,"Text_CardsFull","The slots are full. Remove some cards first! ","卡牌栏已满,请先卸下其他卡牌! ",null],[20050,"Text_CardNotEmpty","Equip at least one card! ","最少装备一个卡牌! ",null],[20051,"Text_TooFase","Operation too fast. Please try again later! ","操作太快，请稍等片刻再试! ",null],[20052,"Text_BuyAndEquip","Purchased successfully. The card has been automatically equipped.","购买成功,已自动装备! ",null],[20053,"Text_LessGold","Energy is insufficient","能量不足 ",null],[20054,"Text_CardIsUnlock","The unit has been unlocked.","该兵种已解锁 ",null],[20055,"Text_RankLevel","Rank","排名",null],[20056,"Text_LevelRank","Level Rank","等级排行榜 ",null],[20057,"Text_GoldRank","Gold Rank","金币排行榜 ",null],[20058,"Text_Level","Level","等级 ",null],[20059,"Text_LessMaterial","Materials is insufficient","材料不足!",null],[20060,"Text_Unlocked","It has been unlocked! ","已经解锁过了! ",null],[20061,"Text_SuccessUnlock","Unlocked successfully! ","解锁成功! ",null],[20062,"Text_MonsterComing","Powerful monsters are approaching!","强力怪物正在接近 ",null],[20063,"Text_LastWave","The last wave! ","最后一波！ ",null],[20064,"Text_BossComing","The boss is coming!","Boss来袭 ",null],[20065,"Text_SecondStart","s...","秒后开始",null],[20066,"Text_Pilot","Navigator","领航员",null],[20067,"Text_Guide1","Welcome back to the survivor camp. Let's fight off the infected and rebuild our home! ","欢迎回到幸存者营地，让我们抵御感染者，重建家园吧！ ",null],[20068,"Text_Guide2","Create a gunner unit first.","先创建一个枪手单位 ",null],[20069,"Text_Guide3","This unit has already entered the battlefield! ","他已经投入作战了！ ",null],[20070,"Text_Guide4","Now try to create another one! ","现在再尝试创建一个！ ",null],[20071,"Text_Guide5","The boss is coming! Upgrade the unit. You can tap to view the unit details! ","BOSS来袭！对单位进行升级，点击可以查看单位详情！ ",null],[20072,"Text_Guide6","The upgrade is successful! Defeat the attacking boss! ","升级成功，快打倒来袭的BOSS！ ",null],[20073,"Text_Guide7","You win a new card from the victory. Let's see how to use it! ","刚刚的胜利让我们获得了一张新卡牌，来看看如何使用吧！ ",null],[20074,"Text_Guide8","Go try your new card in < World 1 >!","快去<世界1>试试新的卡牌吧！ ",null],[20075,"Text_Guide9","In solo mode, you can speed up the game by using the accelerator button. ","在单人模式下，可以通过使用加速按钮来加快游戏进程 ",null],[20076,"Text_Guide10","In [Quest], you can get generous gifts by finishing the daily quests.","在任务界面可以领取每日任务，完成任务可以获得丰厚的奖励 ",null],[20077,"Text_Guide11","You can unlock new point in [Talent]. Go and have a look! ","在天赋树中可以解锁新天赋，快去看看吧！ ",null],[20078,"Text_Easy","Easy","简单 ",null],[20079,"Text_Normal","Normal","普通 ",null],[20080,"Text_Difficult","Hard","困难 ",null],[20081,"Text_StartHouseOwner","Only the room owner can start the game. ","只有房主才能开始游戏 ",null],[20082,"Text_AfterLastDifficulty","Complete the previous difficulty first!","请先完成上一难度 ",null],[20083,"Text_DifficultyHouseOwner","Only the room owner can change the difficulty. ","只有房主才能选择难度 ",null],[20084,"Text_Choosen"," (Selected)"," (已选)",null],[20085,"Text_RecommendLevel","Recommended Level.","推荐等级Lv.",null],[20086,"Text_UnlockAfterLastDifficulty","Not unlocked yet","完成上一难度解锁 ",null],[20087,"Text_SpecialEnemy","Elite: ","特殊怪物： ",null],[20088,"Text_CountDown","Countdown: ","倒计时： ",null],[20089,"Text_CantDo","Currently inoperable!","暂时无法操作 ",null],[20090,"Text_AppointedCreate","Tap to create a tower. ","请点击指定位置创建塔 ",null],[20091,"Text_AppointedUpgrade","Tap the tower to upgrade. ","请点击指定塔升级 ",null],[20092,"Text_TowerMaxLevel","The information of the tower is abnormal or full! ","塔的信息异常或已满级! ",null],[20093,"Text_TowerFull","The number of towers has reached the upper limit!","当前塔数量已达上限！",null],[20094,"Text_AttackTagStage1","Invisible","隐身 ",null],[20095,"Text_AttackTagStage2","Flying","飞行 ",null],[20096,"Text_AttackTagStage3","Armored","装甲 ",null],[20097,"Text_AttackTagStage4","Immune","免控 ",null],[20098,"Tower_name_1","Gunslinger","枪手",null],[20099,"Tower_name_2","Rifleman","步枪手",null],[20100,"Tower_name_3","Machine Gun","机枪手",null],[20101,"Tower_name_4","Sniper","狙击手",null],[20102,"Tower_name_5","Artilleryman","火炮手",null],[20103,"Tower_name_6","SF Soldier","特种兵",null],[20104,"Tower_name_7","Demolitionist","爆破专家",null],[20105,"Tower_name_8","Missile","歼击导弹",null],[20106,"Tower_name_9","Commando","海豹突击手",null],[20107,"Tower_name_10","Shotgunner","霰弹枪兵",null],[20108,"Tower_name_11","Gold Miner","金币矿机",null],[20109,"Tower_name_12","Morale Flag","鼓舞旗帜",null],[20110,"Tower_attackTags_1","Attack: ","攻击力:",null],[20111,"Tower_attackTags_2","Interval: ","攻击间隔:",null],[20112,"Tower_attackTags_3","Pellet Count: ","单次射击数：",null],[20113,"Tower_attackTags_4","Attack Range: ","攻击范围：",null],[20114,"Tower_attackTags_5","Throw Count: ","单次投掷数：",null],[20115,"Tower_attackTags_6","Shoot Count: ","单次发射数：",null],[20116,"Tower_attackTags_7","Each Yield: ","每次产量：",null],[20117,"Tower_attackTags_8","Interval: ","产出间隔：",null],[20118,"Tower_attackTags_9","Attack Multiplier: ","攻击增幅：",null],[20119,"Tower_attackTags_10","Scope of Influence: ","影响范围：",null],[20120,"Monster_name_1","Zombie","丧尸",null],[20121,"Monster_name_2","Speedy Zombie","快速丧尸",null],[20122,"Monster_name_3","Zombie King","僵尸王",null],[20123,"Monster_name_4","Flying","飞行",null],[20124,"Monster_name_5","Nurse","护士",null],[20125,"Monster_name_6","Hook Freak","铁钩怪人",null],[20126,"Item_nameKey_1","Gold","金币",null],[20127,"Item_nameKey_2","Tech Point","天赋点",null],[20128,"Item_nameKey_3","EXP","经验",null],[20129,"Stage_stageName_1","Ancient Tribe - Easy","远古部落-简单",null],[20130,"Stage_stageName_2","Ancient Tribe - Normal","远古部落-普通",null],[20131,"Stage_stageName_3","Ancient Tribe - Hard","远古部落-困难",null],[20132,"Stage_stageName_4","Lost Ruins - Easy","失落遗迹-简单",null],[20133,"Stage_stageName_5","Lost Ruins - Normal","失落遗迹-普通",null],[20134,"Stage_stageName_6","Lost Ruins - Hard","失落遗迹-困难",null],[20135,"Stage_stageName_7","Scorching Desert - Easy","炽热荒漠-简单",null],[20136,"Stage_stageName_8","Scorching Desert - Normal","炽热荒漠-普通",null],[20137,"Stage_stageName_9","Scorching Desert - Hard","炽热荒漠-困难",null],[20138,"Stage_stageName_10","Mystic Mines - Easy","秘境矿山-简单",null],[20139,"Stage_stageName_11","Mystic Mines - Normal","秘境矿山-普通",null],[20140,"Stage_stageName_12","Mystic Mines - Hard","秘境矿山-困难",null],[20141,"Stage_stageName_13","Deep Cavern - Easy","幽深矿洞-简单",null],[20142,"Stage_stageName_14","Deep Cavern - Normal","幽深矿洞-普通",null],[20143,"Stage_stageName_15","Deep Cavern - Hard","幽深矿洞-困难",null],[20144,"Task_taskName_1","Tech R&D {0}","科技研发{0}",null],[20145,"Task_taskName_2","Legion Builder {0}","军团缔造者{0}",null],[20146,"Task_taskName_3","Frontline Debut {0}","初上前线{0}",null],[20147,"Task_taskName_4","Field Expert {0}","沙场老兵{0}",null],[20148,"Task_taskName_5","Horror Slayer {0}","怪物杀手{0}",null],[20149,"Task_taskName_6","Horror Hunter {0}","怪物猎手{0}",null],[20150,"Task_taskName_7","Horror Cleaner {0}","怪物肃清者{0}",null],[20151,"Task_taskName_8","Terminator {0}","终结者{0}",null],[20152,"Task_taskName_9","Defensive Test {0}","防御挑战{0}",null],[20153,"Task_taskName_10","Slaying Test {0}","杀敌挑战{0}",null],[20154,"Task_taskinfo_1","Stage Pass {0}","通关{0}",null],[20155,"Task_taskinfo_2","Unlock Talent <color=#5769E0FF>{0}</color>","解锁天赋<color=#5769E0FF>{0}</color>",null],[20156,"Task_taskinfo_3","Unlock {0} unit types","解锁兵种{0}个",null],[20157,"Task_taskinfo_4","Play {0} games","游玩{0}局游戏",null],[20158,"Task_taskinfo_5","Defeat {0} monsters","击败{0}个怪物",null],[20159,"TechTree_NameKey_1","Attack UP {0}","攻击强化{0}",null],[20160,"TechTree_NameKey_2","Attack Speed UP {0}","攻速强化{0}",null],[20161,"TechTree_NameKey_3","Range UP {0}","射程强化{0}",null],[20162,"TechTree_NameKey_4","Monster Maiming {0}","怪物致残{0}",null],[20163,"TechTree_NameKey_5","Range Increase","射程大幅提升",null],[20164,"TechTree_NameKey_6","Attack Enhancement","攻击大幅强化",null],[20165,"TechTree_NameKey_7","ATK SPD Increase","攻速大幅强化",null],[20166,"TechTree_NameKey_8","Monster Deceleration","怪物大幅减速",null],[20167,"TechTree_desc_1","Improve Attack power of all available units by {0}.","所有可攻击兵种攻击力提高{0}",null],[20168,"TechTree_desc_2","Reduce Attack Interval of all available units by {0}%.","所有可攻击兵种攻击间隔降低{0}%",null],[20169,"TechTree_desc_3","Improve Attack range of all available units by {0}.","所有可攻击兵种攻击范围提高{0}点",null],[20170,"TechTree_desc_4","Increase Damage taken by all monsters by {0}%.","所有怪物受到的伤害提升{0}%",null],[20171,"TechTree_desc_5","Improve Attack range of all available units by {0}%.","所有可攻击兵种攻击范围提高{0}%",null],[20172,"TechTree_desc_6","Improve Attack power of all available units by {0}%.","所有可攻击兵种攻击力提高{0}%",null],[20173,"TechTree_desc_7","Reduce Attack Interval of all available units by {0}s.","所有可攻击兵种攻击间隔降低{0}秒",null],[20174,"TechTree_desc_8","Reduce Speed of all monsters by {0}.","所有怪物移动速度降低{0}点",null],[20175,"UI_1","Next Wave:","距离下一波：",null],[20176,"UI_2","Wave: {0}","波次：{0}",null],[20177,"UI_3","Skip this wave?","是否跳过这波",null],[20178,"UI_4","Talent","天赋树",null],[20179,"UI_5","Shop","商店",null],[20180,"UI_6","Options","设置",null],[20181,"UI_7","Main","主线",null],[20182,"UI_8","Daily","日常",null],[20183,"UI_9","Completed","已完成",null],[20184,"UI_10","Quest completed.","任务完成",null],[20185,"UI_11","Sell","出售",null],[20186,"UI_12","Deployed","已出战",null],[20187,"UI_13","Talent","天赋",null],[20188,"UI_14","Talent: ","天赋：",null],[20189,"UI_15","Effect: ","效果：",null],[20190,"UI_16","Required Materials: ","所需材料：",null],[20191,"UI_17","Unlock","解锁",null],[20192,"UI_18","Select Difficulty","难度选择",null],[20193,"UI_19","Party","队列",null],[20194,"UI_20","Countdown: {0}","倒计时：{0}",null],[20195,"UI_21","Go","立即前往",null],[20196,"UI_22","Rewards: ","获得奖励：",null],[20197,"UI_23","Continue","继续",null],[20198,"UI_24","BGM","背景音乐",null],[20199,"UI_25","Sound","声音",null],[20200,"UI_26","Shall we team up?","一起组队吗？",null],[20201,"UI_27","Quickly organize defense!","怪物要来了，快组织防御",null],[20202,"UI_28","Can you leave me some grids?","可以给我留一些格子吗？",null],[20203,"UI_29","I'm new here asking for a lead.","我是新手，大佬求带带",null],[20204,"UI_30","Let's create a Gold Miner first.","先放下一些金币矿机吧",null],[20205,"UI_31","Set up the defense line!","BOSS要来了，快布置好防线！",null],[20206,"UI_32","Where are you from?","你来自哪里啊？",null],[20207,"UI_33","Yep! That's right!","对！没错！",null],[20208,"UI_34","Do you need help?","你需要帮助吗？",null],[20209,"UI_35","Wanna play a game with us?","你想跟我们一起玩游戏吗？",null],[20210,"UI_36","Uhuh, that's it!","没错！就是那样！",null],[20211,"UI_37","I'm leaving now.","我走了",null],[20212,"UI_38","See you next time!","下次再见~",null],[20213,"Tag_dialog_1","There are invisible monsters. Use the anti-stealth units!","出现了会隐身的怪物，快使用能反隐的兵种！",null],[20214,"Tag_dialog_2","Use gunslingers or snipers to shoot down those flying guys.","快使用枪手或者狙击手将那些飞行的家伙打下来",null],[20215,"Tag_dialog_3","Monster with thick armor! Try some heavy firepower units!","这是有厚实护甲的怪物，尝试用一些重火力兵种攻击吧！",null],[20216,"Tag_dialog_4","These monsters are immune to your decelerating effect. Be careful!","这些怪物可以免疫你的减速效果，小心！",null],[20217,"Tag_dialog_5","The invulnerable boss is here. Quickly gather fire to defeat him!","实力强大的Boss来了，快集火击倒他！",null],[20218,"UI_39","View","查看",null],[20219,"Text_AirdropComing","Airdrop is coming! Go and pick up the rewards!","空投降临 !快去拾取奖励吧！",null],[20220,"buffAirdrop_name1","<color=#5769E0FF>Attack greatly enhanced</color>","<color=#5769E0FF>攻击大幅强化</color>",null],[20221,"buffAirdrop_name2","<color=#5769E0FF>Shoot Range greatly enhanced</color>","<color=#5769E0FF>射程大幅提升</color>",null],[20222,"buffAirdrop_name3","<color=#5769E0FF>Attack Speed greatly enhanced</color>","<color=#5769E0FF>攻速大幅强化</color>",null],[20223,"UI_40","The rear area is currently not open","后面的区域暂未开放",null],[20224,"UI_41","LV.{0}+open","LV{0}+开放",null],[20225,"UI_42","Start","开始",null],[20226,"UI_43","Leave","离开",null],[20227,"UI_44","Daily task reset time: ","日常任务重置时间：",null],[20228,"Sift_1","All","全部",null],[20229,"Sift_2","Element","元素",null],[20230,"Sift_3","Target","目标",null],[20231,"Sift_4","Type","类型",null],[20232,"Sift_5","Strategy","对策",null],[20233,"Element_1","Light","光",null],[20234,"Element_2","Dark","暗",null],[20235,"Element_3","Water","水",null],[20236,"Element_4","Fire","火"," "],[20237,"Element_5","Wood","木",null],[20238,"Element_6","Earth","土",null],[20239,"Target_1","Single","单体",null],[20240,"Target_2","Area","群体",null],[20241,"DamageType_1","Physical","物理",null],[20242,"DamageType_2","Magical","魔法",null],[20243,"Strategy_1","Warm-up","暖机",null],[20244,"Strategy_2","Anti-hidden","反隐",null],[20245,"Strategy_3","Armor Break","破甲",null],[20246,"Strategy_4","Stun effect","眩晕",null],[20247,"Strategy_5","Armor Shred","削甲",null],[20248,"Strategy_6","Slow effect","减速",null],[20249,"Strategy_7","Magic Penetration","法穿",null],[20250,"Strategy_8","Anti-Air","对空增伤",null],[20251,"Strategy_9","Multi-Hit","多段伤害",null],[20252,"Strategy_10","Priority Air","优先对空",null],[20253,"DamageType_3","Energy","能量",null],[20254,"DamageType_4","Buff","增益",null],[20255,"Tower_name_13","Beacon","光祈",null],[20256,"Tower_name_14","Aurora","极光",null],[20257,"Tower_name_15","Solara","耀日",null],[20258,"Tower_name_16","Sparkle","流光",null],[20259,"Tower_name_17","Gleam","晖环",null],[20260,"Tower_name_18","Celeste","湛灵",null],[20261,"Tower_name_19","Luminous","荧闪",null],[20262,"Tower_name_20","Myst","荧雾",null],[20263,"Tower_name_21","Onyx","燧晶",null],[20264,"Tower_name_22","Nyx","隐夜",null],[20265,"Tower_name_23","Dusk","渡夜",null],[20266,"Tower_name_24","Twilight","昏暮",null],[20267,"Tower_name_25","Vesper","星垂",null],[20268,"Tower_name_26","Obsidian","黑曜",null],[20269,"Tower_name_27","Ripple","轻漪",null],[20270,"Tower_name_28","Marina","海韵",null],[20271,"Tower_name_29","Serena","镜流",null],[20272,"Tower_name_30","Coral","灵珊",null],[20273,"Tower_name_31","Tide","汐音",null],[20274,"Tower_name_32","Aqua","吟涛",null],[20275,"Tower_name_33","Cinder","余烬",null],[20276,"Tower_name_34","Ash","烬焰",null],[20277,"Tower_name_35","Wildfire","烈夏",null],[20278,"Tower_name_36","Fury","舞刃",null],[20279,"Tower_name_37","Lava ","炎狱",null],[20280,"Tower_name_38","Fuze","熔索",null],[20281,"Tower_name_39","Elm","桑榆",null],[20282,"Tower_name_40","Cedar","白松",null],[20283,"Tower_name_41","Alder","桤桦",null],[20284,"Tower_name_42","Maple","长枫",null],[20285,"Tower_name_43","Myrtle","桃金娘",null],[20286,"Tower_name_44","Rowan","花楸",null],[20287,"Tower_name_45","Eldora","耀域",null],[20288,"Tower_name_46","Zinnia","雏菊",null],[20289,"Tower_name_47","Liora","明玉",null],[20290,"Tower_name_48","Ophelia","岩毅",null],[20291,"Tower_name_49","Marigold","金盏花",null],[20292,"Tower_name_50","Shu","黍",null],[20293,"StrategyDesc_1","Increases {1} attack range, {2} attack power, and {3} attack speed after {0} seconds","该单位经过{0}秒提升{1}攻击范围，{2}攻击力，{3}攻击速度",null],[20294,"StrategyDesc_2","This unit reveals cloaked monsters within its attack radius, allowing other units to attack invisible monsters as well","该单位会揭示攻击范围内的隐形怪物，使得其他单位也可以攻击隐身怪物",null],[20295,"StrategyDesc_3","The unit ignores the monster's {0} armor","该单位会无视怪物的{0}护甲",null],[20296,"StrategyDesc_4","The unit stuns monsters for {0} seconds when attacking","该单位在攻击时会眩晕怪物{0}秒",null],[20297,"StrategyDesc_5","This unit reduces the armor {0} monsters when attacking","该单位在攻击时会减少怪物{0}护甲",null],[20298,"StrategyDesc_6","This unit reduces the movement speed {0} monsters when attacking","该单位在攻击时会减少怪物{0}移动速度",null],[20299,"StrategyDesc_7","The unit ignores monsters {0} magic resistance","该单位会无视怪物{0}魔抗",null],[20300,"StrategyDesc_8","This unit deals {0} increased damage against flying monsters","该单位在对抗飞行怪物时会提升{0}伤害",null],[20301,"StrategyDesc_9","The unit deals {0} damage","该单位会造成{0}段伤害",null],[20302,"StrategyDesc_10","This unit prioritizes attacks on flying monsters","该单位会优先攻击飞行怪物",null],[20303,"TalentTree_Name_1","Physical Attack+","物理基础",null],[20304,"TalentTree_Name_2","Magic Attack+","魔法学识",null],[20305,"TalentTree_Name_3","HP Limit+","基地耐久",null],[20306,"TalentTree_Name_4","Attack Speed ​​​​Boost+","攻速增强",null],[20307,"TalentTree_Name_5","Get energy each round","天降能量",null],[20308,"TalentTree_Name_6","Capacity upgrades","产能升级",null],[20309,"TalentTree_Name_7","Light","光元素增伤",null],[20310,"TalentTree_Name_8","Water","水元素增伤",null],[20311,"TalentTree_Name_9","Earth","土元素增伤",null],[20312,"TalentTree_Name_10","Restore HP per round","耐久恢复",null],[20313,"TalentTree_Name_11","Dark","暗元素增伤",null],[20314,"TalentTree_Name_12","Fire","火元素增伤",null],[20315,"TalentTree_Name_13","Wood","木元素增伤",null],[20316,"TalentTree_Name_14","Enemy slowdown","敌方减速",null],[20317,"TalentTree_Name_15","Bright light","慧光",null],[20318,"TalentTree_Desc_1","{0}% increased Physical Damage","物理伤害提高{0}%",null],[20319,"TalentTree_Desc_2","{0}% increased magic damage","魔法伤害提高{0}%",null],[20320,"TalentTree_Desc_3","Base durability improvement{0}","基地耐久提高{0}",null],[20321,"TalentTree_Desc_4","{0}% increased attack speed","攻击速度提高{0}%",null],[20322,"TalentTree_Desc_5","Each wave gains {0} energy","每个波次获得{0}能量",null],[20323,"TalentTree_Desc_6","{0}% increase in energy efficiency per unit of output","能量单位产出能量效率提高{0}%",null],[20324,"TalentTree_Desc_7","{0}% increased Light Damage","光属性伤害提高{0}%",null],[20325,"TalentTree_Desc_8","{0}% increased Water Damage","水属性伤害提高{0}%",null],[20326,"TalentTree_Desc_9","{0}% increased Earth Damage","土属性伤害提高{0}%",null],[20327,"TalentTree_Desc_10","Each wave of the base recovers {0} durability","基地每个波次恢复{0}耐久",null],[20328,"TalentTree_Desc_11","{0}% increased Dark Damage","暗属性伤害提高{0}%",null],[20329,"TalentTree_Desc_12","{0}% increased Fire Damage","火属性伤害提高{0}%",null],[20330,"TalentTree_Desc_13","{0}% increased Wood Damage","木属性伤害提高{0}%",null],[20331,"TalentTree_Desc_14","Slows enemies by {0}% for 5 seconds","敌方入场5秒内减速{0}%",null],[20332,"TalentTree_Desc_15","{0}% increased damage taken by enemies","敌方受到伤害提高{0}%",null],[20333,"Monster_name_7","Black Mummy","黑木乃伊",null],[20334,"Monster_name_8","Clawman","羊角怪",null],[20335,"Monster_name_9","Flying Clawman","飞行羊角怪",null],[20336,"Monster_name_10","Dark Warrior","暗战士",null],[20337,"Monster_name_11","Dark Boss","暗首领",null],[20338,"Monster_name_12","Snake Woman","蛇女",null],[20339,"Monster_name_13","hate","憎恶",null],[20340,"Monster_name_14","Blue Devil","蓝恶魔",null],[20341,"Monster_name_15","Ice Warrior","玄冰战士",null],[20342,"Monster_name_16","Ice Guard","玄冰守卫",null],[20343,"Monster_name_17","Ice Wizard","玄冰巫师",null],[20344,"Monster_name_18","Snow monsters","雪怪",null],[20345,"Monster_name_19","Pumpkin mobs","南瓜小怪",null],[20346,"Monster_name_20","Deerclops","鹿角怪",null],[20347,"Monster_name_21","Thorn Rise","荆棘之兴",null],[20348,"Monster_name_22","Old Tree Man","老树人",null],[20349,"Monster_name_23","Female Treant","女树人",null],[20350,"Monster_name_24","Lava mobs","熔岩小怪",null],[20351,"Monster_name_25","Lava Behemoth","熔岩巨兽",null],[20352,"Monster_name_26","Flame creeps","火焰小兵",null],[20353,"Monster_name_27","Fire Demon","火恶魔",null],[20354,"Monster_name_28","Lava Iron Armor","熔岩铁甲",null],[20355,"Monster_name_29","Grass mobs","草地小怪",null],[20356,"Monster_name_30","Stone Monsters","石头怪",null],[20357,"Monster_name_31","butcher","屠夫",null],[20358,"Monster_name_32","Elderly goblins","老年地精",null],[20359,"Monster_name_33","Young goblins","青年地精",null],[20360,"Monster_name_34","mummy","木乃伊",null],[20361,"Monster_name_35","Giants of light","光巨人",null],[20362,"Monster_name_36","Mechwarrior","机甲战士",null],[20363,"Monster_name_37","Light Warriors","光战士",null],[20364,"Monster_name_38","Soldier of the Future","未来战士",null],[20365,"TalentTree_Name_16","Distance enhancement","距离增强",null],[20366,"TalentTree_Name_17","Physical Slash","物理斩杀",null],[20367,"TalentTree_Name_18","Desolation","黯灭",null],[20368,"TalentTree_Name_19","Shiva","希瓦",null],[20369,"TalentTree_Name_20","Anti-aircraft artillery","高射火炮",null],[20370,"TalentTree_Name_21","Magical suppression","魔法压制",null],[20371,"TalentTree_Name_22","Elemental Suppression","元素压制",null],[20372,"TalentTree_Name_23","Elemental Resistance","元素抵抗",null],[20373,"TalentTree_Name_24","Bright light Ⅱ","慧光Ⅱ",null],[20374,"TalentTree_Name_25","Physics proficient","物理精通",null],[20375,"TalentTree_Name_26","Magic sublimation","魔法升华",null],[20376,"TalentTree_Name_27","Base durability Ⅱ","基地耐久Ⅱ",null],[20377,"TalentTree_Name_28","Attack Speed increased Ⅱ","攻速增强Ⅱ",null],[20378,"TalentTree_Name_29","Heavenly Energy Ⅱ","天降能量Ⅱ",null],[20379,"TalentTree_Name_30","Capacity upgrades Ⅱ","产能升级Ⅱ",null],[20380,"TalentTree_Name_31","Light elemental damage bonus Ⅱ","光元素伤害加成Ⅱ",null],[20381,"TalentTree_Name_32","Dark Elemental Damage Bonus Ⅱ","暗元素伤害加成Ⅱ",null],[20382,"TalentTree_Name_33","Hydro damage bonus Ⅱ","水元素伤害加成Ⅱ",null],[20383,"TalentTree_Name_34","Base durability Ⅱ","耐久恢复Ⅱ",null],[20384,"TalentTree_Name_35","Fire Elemental Damage Bonus Ⅱ","火元素伤害加成Ⅱ",null],[20385,"TalentTree_Name_36","Earth Elemental Damage Bonus Ⅱ","土元素伤害加成Ⅱ",null],[20386,"TalentTree_Name_37","Wood damage bonus Ⅱ","木元素伤害加成Ⅱ",null],[20387,"TalentTree_Name_38","Enemy slowdown Ⅱ","敌方减速Ⅱ",null],[20388,"TalentTree_Name_39","Bright light Ⅲ","慧光Ⅲ",null],[20389,"TalentTree_Name_40","Distance enhancement Ⅱ","距离增强Ⅱ",null],[20390,"TalentTree_Name_41","Physical Slash Ⅱ","物理斩杀Ⅱ",null],[20391,"TalentTree_Name_42","Desolation Ⅱ","黯灭Ⅱ",null],[20392,"TalentTree_Name_43","Khiva Ⅱ","希瓦Ⅱ",null],[20393,"TalentTree_Name_44","Anti-aircraft artillery Ⅱ","高射火炮Ⅱ",null],[20394,"TalentTree_Name_45","Magic Suppression Ⅱ","魔法压制Ⅱ",null],[20395,"TalentTree_Name_46","Bright light Ⅳ","慧光Ⅳ",null],[20396,"TalentTree_Name_47","Phys.","物理",null],[20397,"TalentTree_Name_48","Mag.","魔法",null],[20398,"TalentTree_Name_49","durable","耐久",null],[20399,"TalentTree_Desc_16","{0}% increased attack range","攻击范围提高{0}%",null],[20400,"TalentTree_Desc_17","Physical damage dealt to enemies with less than 20% HP is increased by {0}%","物理伤害对于血量低于20%的敌方造成伤害提高{0}%",null],[20401,"TalentTree_Desc_18","Reduces enemy armor by {0} for 5 seconds","敌方入场5秒内护甲减少{0}",null],[20402,"TalentTree_Desc_19","Reduces Magic Resistance for 5 seconds of enemy entry{0}","敌方入场5秒内魔抗减少{0}",null],[20403,"TalentTree_Desc_20","{0}% increased damage dealt to airborne enemies","对空中敌方造成伤害提高{0}%",null],[20404,"TalentTree_Desc_21","Magic damage dealt to enemies with more than 80% HP is increased by {0}%","魔法伤害对于血量高于80%的敌方造成伤害提高{0}%",null],[20405,"TalentTree_Desc_22","{0}% increased damage dealt while Elemental Restrained","元素克制时造成伤害提高{0}%",null],[20406,"TalentTree_Desc_23","Damage Reduction when Elemental Restrained {0}%","元素被克制时的伤害减免减少{0}%",null],[20407,"TalentTree_Desc_24","{0}% increased damage taken by enemies","敌方受到伤害提高{0}%",null],[20408,"TalentTree_Desc_25","{0}% increased Physical Damage","物理伤害提高{0}%",null],[20409,"TalentTree_Desc_26","{0}% increased magic damage","魔法伤害提高{0}%",null],[20410,"TalentTree_Desc_27","Base durability improvement{0}","基地耐久提高{0}",null],[20411,"TalentTree_Desc_28","{0}% increased attack speed","攻击速度提高{0}%",null],[20412,"TalentTree_Desc_29","Each wave gains {0} energy","每个波次获得{0}能量",null],[20413,"TalentTree_Desc_30","{0}% increase in energy efficiency per unit of output","能量单位产出能量效率提高{0}%",null],[20414,"TalentTree_Desc_31","{0}% increased Light Damage","光属性伤害提高{0}%",null],[20415,"TalentTree_Desc_32","{0}% increased Water Damage","水属性伤害提高{0}%",null],[20416,"TalentTree_Desc_33","{0}% increased Earth Damage","土属性伤害提高{0}%",null],[20417,"TalentTree_Desc_34","Each wave of the base recovers {0} durability","基地每个波次恢复{0}耐久",null],[20418,"TalentTree_Desc_35","{0}% increased Dark Damage","暗属性伤害提高{0}%",null],[20419,"TalentTree_Desc_36","{0}% increased Fire Damage","火属性伤害提高{0}%",null],[20420,"TalentTree_Desc_37","{0}% increased Wood Damage","木属性伤害提高{0}%",null],[20421,"TalentTree_Desc_38","Slows enemies by {0}% for 5 seconds","敌方入场5秒内减速{0}%",null],[20422,"TalentTree_Desc_39","{0}% increased damage taken by enemies","敌方受到伤害提高{0}%",null],[20423,"TalentTree_Desc_40","{0}% increased attack range","攻击范围提高{0}%",null],[20424,"TalentTree_Desc_41","Physical damage dealt to enemies with less than 20% HP is increased by {0}%","物理伤害对于血量低于20%的敌方造成伤害提高{0}%",null],[20425,"TalentTree_Desc_42","Reduces enemy armor by {0} for 5 seconds","敌方入场5秒内护甲减少{0}",null],[20426,"TalentTree_Desc_43","Reduces Magic Resistance for 5 seconds of enemy entry{0}","敌方入场5秒内魔抗减少{0}",null],[20427,"TalentTree_Desc_44","{0}% increased damage dealt to airborne enemies","对空中敌方造成伤害提高{0}%",null],[20428,"TalentTree_Desc_45","Magic damage dealt to enemies with more than 80% HP is increased by {0}%","魔法伤害对于血量高于80%的敌方造成伤害提高{0}%",null],[20429,"TalentTree_Desc_46","{0}% increased damage taken by enemies","敌方受到伤害提高{0}%",null],[20430,"TalentTree_Desc_47","In Endless Mode, Physical Damage is increased by {0}%","在无尽模式下，物理伤害提高{0}%",null],[20431,"TalentTree_Desc_48","In endless mode, magic damage is increased by {0}%","在无尽模式下，魔法伤害提高{0}%",null],[20432,"TalentTree_Desc_49","In endless mode, base durability is increased by {0}","在无尽模式下，基地耐久提高{0}",null],[20433,"Tower_attackTags_11","Element: ","元素：",null],[20434,"Tower_attackTags_12","Cost: ","部署消耗：",null],[20435,"Tower_attackTags_13","Grade: ","等级：",null],[20436,"Text_insufficientStamina","Insufficient Stamina","体力不足",null],[20437,"Tower_setting_1","Lineup","出战阵容",null],[20438,"Tower_setting_2","Fold","收起",null],[20439,"Tower_setting_3","Barracks","兵营",null],[20440,"Stage_Select_1","Recommended element","推荐属性",null],[20441,"Stage_Select_2","Enemy skills","敌方技能",null],[20442,"MonsterSkill_1","Resilience","复原力",null],[20443,"MonsterSkill_2","Berserk","狂暴化",null],[20444,"MonsterSkill_3","Stealth ","隐身 ",null],[20445,"MonsterSkill_4","Flight","飞行",null],[20446,"MonsterSkillDesc_1","Units with this ability regenerate {0} of health per second","具有该技能的单位，每秒会回复{0}的生命值",null],[20447,"MonsterSkillDesc_2","When the unit drops below half health, it gains a {0}% movement speed increase","该单位生命值低于一半时，会获得{0}%的移动速度提升",null],[20448,"MonsterSkillDesc_3","This unit can only be attacked by units with the \"Anti-Stealth\" tag","该单位只能被具有“反隐”标签的单位攻击",null],[20449,"MonsterSkillDesc_4","This unit can only be attacked by units with the tags \"Air Damage Increase\" or \"Air Priority Target\".","该单位只能被具有“对空增伤”、“优先对空”标签的单位攻击",null],[20450,"Setting_1","High","高",null],[20451,"Setting_2","Low","低",null],[20452,"Text_Sell","Sell","出售",null],[20453,"Bless_UI_1","Blessing","祝福",null],[20454,"Bless_UI_2","*The Modragon's blessing comes from the Modragon captured by the \"Blue Snitch\" in the DragonverseNeo","*龙娘祝福来自于 Dragonverse 主世界通过“蓝色飞贼”抓取的龙娘",null],[20455,"Stage_stageName_16","Ancient Tribe","远古部落",null],[20456,"Stage_stageName_17","Lost Ruins","失落遗迹",null],[20457,"Stage_stageName_18","Scorching Desert","炽热荒漠",null],[20458,"Stage_stageName_19","Mystic Mines","秘境矿山",null],[20459,"Stage_stageName_20","Deep Cavern","幽深矿洞",null],[20460,"Stage_stageName_21","Endless Realm","无尽之境",null],[20461,"UI_45","Camera sensitivity","摄像机灵敏度",null],[20462,"UI_46","Slow","慢",null],[20463,"UI_47","Fast","快",null],[20464,"CurrentRoomId","Room ID: {0}","房间ID：{0}",null],[20465,"JumpGameFailed","Switch Room Failed!","切换房间失败！",null],[20466,"SwitchRoomBtn","Switch room","切换房间",null],[20467,"JumpRoomText001","Switch to a designated room","切换至指定房间",null],[20468,"JumpRoomText002","Please enter the Room ID","请输入房间ID",null],[20469,"SwitchRoomConfirm","Confirm","确定",null],[20470,"UI_48","Unlocked","已解锁",null]];
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
	/**能量不足 */
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
	/**材料不足!*/
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
	/**在天赋树中可以解锁新天赋，快去看看吧！ */
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
	/**金币*/
	get Item_nameKey_1():ILanguageElement{return this.getElement(20126)};
	/**天赋点*/
	get Item_nameKey_2():ILanguageElement{return this.getElement(20127)};
	/**经验*/
	get Item_nameKey_3():ILanguageElement{return this.getElement(20128)};
	/**远古部落-简单*/
	get Stage_stageName_1():ILanguageElement{return this.getElement(20129)};
	/**远古部落-普通*/
	get Stage_stageName_2():ILanguageElement{return this.getElement(20130)};
	/**远古部落-困难*/
	get Stage_stageName_3():ILanguageElement{return this.getElement(20131)};
	/**失落遗迹-简单*/
	get Stage_stageName_4():ILanguageElement{return this.getElement(20132)};
	/**失落遗迹-普通*/
	get Stage_stageName_5():ILanguageElement{return this.getElement(20133)};
	/**失落遗迹-困难*/
	get Stage_stageName_6():ILanguageElement{return this.getElement(20134)};
	/**炽热荒漠-简单*/
	get Stage_stageName_7():ILanguageElement{return this.getElement(20135)};
	/**炽热荒漠-普通*/
	get Stage_stageName_8():ILanguageElement{return this.getElement(20136)};
	/**炽热荒漠-困难*/
	get Stage_stageName_9():ILanguageElement{return this.getElement(20137)};
	/**秘境矿山-简单*/
	get Stage_stageName_10():ILanguageElement{return this.getElement(20138)};
	/**秘境矿山-普通*/
	get Stage_stageName_11():ILanguageElement{return this.getElement(20139)};
	/**秘境矿山-困难*/
	get Stage_stageName_12():ILanguageElement{return this.getElement(20140)};
	/**幽深矿洞-简单*/
	get Stage_stageName_13():ILanguageElement{return this.getElement(20141)};
	/**幽深矿洞-普通*/
	get Stage_stageName_14():ILanguageElement{return this.getElement(20142)};
	/**幽深矿洞-困难*/
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
	/**解锁天赋<color=#5769E0FF>{0}</color>*/
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
	/**天赋树*/
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
	/**已出战*/
	get UI_12():ILanguageElement{return this.getElement(20186)};
	/**天赋*/
	get UI_13():ILanguageElement{return this.getElement(20187)};
	/**天赋：*/
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
	/**声音*/
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
	/**全部*/
	get Sift_1():ILanguageElement{return this.getElement(20228)};
	/**元素*/
	get Sift_2():ILanguageElement{return this.getElement(20229)};
	/**目标*/
	get Sift_3():ILanguageElement{return this.getElement(20230)};
	/**类型*/
	get Sift_4():ILanguageElement{return this.getElement(20231)};
	/**对策*/
	get Sift_5():ILanguageElement{return this.getElement(20232)};
	/**光*/
	get Element_1():ILanguageElement{return this.getElement(20233)};
	/**暗*/
	get Element_2():ILanguageElement{return this.getElement(20234)};
	/**水*/
	get Element_3():ILanguageElement{return this.getElement(20235)};
	/**火*/
	get Element_4():ILanguageElement{return this.getElement(20236)};
	/**木*/
	get Element_5():ILanguageElement{return this.getElement(20237)};
	/**土*/
	get Element_6():ILanguageElement{return this.getElement(20238)};
	/**单体*/
	get Target_1():ILanguageElement{return this.getElement(20239)};
	/**群体*/
	get Target_2():ILanguageElement{return this.getElement(20240)};
	/**物理*/
	get DamageType_1():ILanguageElement{return this.getElement(20241)};
	/**魔法*/
	get DamageType_2():ILanguageElement{return this.getElement(20242)};
	/**暖机*/
	get Strategy_1():ILanguageElement{return this.getElement(20243)};
	/**反隐*/
	get Strategy_2():ILanguageElement{return this.getElement(20244)};
	/**破甲*/
	get Strategy_3():ILanguageElement{return this.getElement(20245)};
	/**眩晕*/
	get Strategy_4():ILanguageElement{return this.getElement(20246)};
	/**削甲*/
	get Strategy_5():ILanguageElement{return this.getElement(20247)};
	/**减速*/
	get Strategy_6():ILanguageElement{return this.getElement(20248)};
	/**法穿*/
	get Strategy_7():ILanguageElement{return this.getElement(20249)};
	/**对空增伤*/
	get Strategy_8():ILanguageElement{return this.getElement(20250)};
	/**多段伤害*/
	get Strategy_9():ILanguageElement{return this.getElement(20251)};
	/**优先对空*/
	get Strategy_10():ILanguageElement{return this.getElement(20252)};
	/**能量*/
	get DamageType_3():ILanguageElement{return this.getElement(20253)};
	/**增益*/
	get DamageType_4():ILanguageElement{return this.getElement(20254)};
	/**光祈*/
	get Tower_name_13():ILanguageElement{return this.getElement(20255)};
	/**极光*/
	get Tower_name_14():ILanguageElement{return this.getElement(20256)};
	/**耀日*/
	get Tower_name_15():ILanguageElement{return this.getElement(20257)};
	/**流光*/
	get Tower_name_16():ILanguageElement{return this.getElement(20258)};
	/**晖环*/
	get Tower_name_17():ILanguageElement{return this.getElement(20259)};
	/**湛灵*/
	get Tower_name_18():ILanguageElement{return this.getElement(20260)};
	/**荧闪*/
	get Tower_name_19():ILanguageElement{return this.getElement(20261)};
	/**荧雾*/
	get Tower_name_20():ILanguageElement{return this.getElement(20262)};
	/**燧晶*/
	get Tower_name_21():ILanguageElement{return this.getElement(20263)};
	/**隐夜*/
	get Tower_name_22():ILanguageElement{return this.getElement(20264)};
	/**渡夜*/
	get Tower_name_23():ILanguageElement{return this.getElement(20265)};
	/**昏暮*/
	get Tower_name_24():ILanguageElement{return this.getElement(20266)};
	/**星垂*/
	get Tower_name_25():ILanguageElement{return this.getElement(20267)};
	/**黑曜*/
	get Tower_name_26():ILanguageElement{return this.getElement(20268)};
	/**轻漪*/
	get Tower_name_27():ILanguageElement{return this.getElement(20269)};
	/**海韵*/
	get Tower_name_28():ILanguageElement{return this.getElement(20270)};
	/**镜流*/
	get Tower_name_29():ILanguageElement{return this.getElement(20271)};
	/**灵珊*/
	get Tower_name_30():ILanguageElement{return this.getElement(20272)};
	/**汐音*/
	get Tower_name_31():ILanguageElement{return this.getElement(20273)};
	/**吟涛*/
	get Tower_name_32():ILanguageElement{return this.getElement(20274)};
	/**余烬*/
	get Tower_name_33():ILanguageElement{return this.getElement(20275)};
	/**烬焰*/
	get Tower_name_34():ILanguageElement{return this.getElement(20276)};
	/**烈夏*/
	get Tower_name_35():ILanguageElement{return this.getElement(20277)};
	/**舞刃*/
	get Tower_name_36():ILanguageElement{return this.getElement(20278)};
	/**炎狱*/
	get Tower_name_37():ILanguageElement{return this.getElement(20279)};
	/**熔索*/
	get Tower_name_38():ILanguageElement{return this.getElement(20280)};
	/**桑榆*/
	get Tower_name_39():ILanguageElement{return this.getElement(20281)};
	/**白松*/
	get Tower_name_40():ILanguageElement{return this.getElement(20282)};
	/**桤桦*/
	get Tower_name_41():ILanguageElement{return this.getElement(20283)};
	/**长枫*/
	get Tower_name_42():ILanguageElement{return this.getElement(20284)};
	/**桃金娘*/
	get Tower_name_43():ILanguageElement{return this.getElement(20285)};
	/**花楸*/
	get Tower_name_44():ILanguageElement{return this.getElement(20286)};
	/**耀域*/
	get Tower_name_45():ILanguageElement{return this.getElement(20287)};
	/**雏菊*/
	get Tower_name_46():ILanguageElement{return this.getElement(20288)};
	/**明玉*/
	get Tower_name_47():ILanguageElement{return this.getElement(20289)};
	/**岩毅*/
	get Tower_name_48():ILanguageElement{return this.getElement(20290)};
	/**金盏花*/
	get Tower_name_49():ILanguageElement{return this.getElement(20291)};
	/**黍*/
	get Tower_name_50():ILanguageElement{return this.getElement(20292)};
	/**该单位经过{0}秒提升{1}攻击范围，{2}攻击力，{3}攻击速度*/
	get StrategyDesc_1():ILanguageElement{return this.getElement(20293)};
	/**该单位会揭示攻击范围内的隐形怪物，使得其他单位也可以攻击隐身怪物*/
	get StrategyDesc_2():ILanguageElement{return this.getElement(20294)};
	/**该单位会无视怪物的{0}护甲*/
	get StrategyDesc_3():ILanguageElement{return this.getElement(20295)};
	/**该单位在攻击时会眩晕怪物{0}秒*/
	get StrategyDesc_4():ILanguageElement{return this.getElement(20296)};
	/**该单位在攻击时会减少怪物{0}护甲*/
	get StrategyDesc_5():ILanguageElement{return this.getElement(20297)};
	/**该单位在攻击时会减少怪物{0}移动速度*/
	get StrategyDesc_6():ILanguageElement{return this.getElement(20298)};
	/**该单位会无视怪物{0}魔抗*/
	get StrategyDesc_7():ILanguageElement{return this.getElement(20299)};
	/**该单位在对抗飞行怪物时会提升{0}伤害*/
	get StrategyDesc_8():ILanguageElement{return this.getElement(20300)};
	/**该单位会造成{0}段伤害*/
	get StrategyDesc_9():ILanguageElement{return this.getElement(20301)};
	/**该单位会优先攻击飞行怪物*/
	get StrategyDesc_10():ILanguageElement{return this.getElement(20302)};
	/**物理基础*/
	get TalentTree_Name_1():ILanguageElement{return this.getElement(20303)};
	/**魔法学识*/
	get TalentTree_Name_2():ILanguageElement{return this.getElement(20304)};
	/**基地耐久*/
	get TalentTree_Name_3():ILanguageElement{return this.getElement(20305)};
	/**攻速增强*/
	get TalentTree_Name_4():ILanguageElement{return this.getElement(20306)};
	/**天降能量*/
	get TalentTree_Name_5():ILanguageElement{return this.getElement(20307)};
	/**产能升级*/
	get TalentTree_Name_6():ILanguageElement{return this.getElement(20308)};
	/**光元素增伤*/
	get TalentTree_Name_7():ILanguageElement{return this.getElement(20309)};
	/**水元素增伤*/
	get TalentTree_Name_8():ILanguageElement{return this.getElement(20310)};
	/**土元素增伤*/
	get TalentTree_Name_9():ILanguageElement{return this.getElement(20311)};
	/**耐久恢复*/
	get TalentTree_Name_10():ILanguageElement{return this.getElement(20312)};
	/**暗元素增伤*/
	get TalentTree_Name_11():ILanguageElement{return this.getElement(20313)};
	/**火元素增伤*/
	get TalentTree_Name_12():ILanguageElement{return this.getElement(20314)};
	/**木元素增伤*/
	get TalentTree_Name_13():ILanguageElement{return this.getElement(20315)};
	/**敌方减速*/
	get TalentTree_Name_14():ILanguageElement{return this.getElement(20316)};
	/**慧光*/
	get TalentTree_Name_15():ILanguageElement{return this.getElement(20317)};
	/**物理伤害提高{0}%*/
	get TalentTree_Desc_1():ILanguageElement{return this.getElement(20318)};
	/**魔法伤害提高{0}%*/
	get TalentTree_Desc_2():ILanguageElement{return this.getElement(20319)};
	/**基地耐久提高{0}*/
	get TalentTree_Desc_3():ILanguageElement{return this.getElement(20320)};
	/**攻击速度提高{0}%*/
	get TalentTree_Desc_4():ILanguageElement{return this.getElement(20321)};
	/**每个波次获得{0}能量*/
	get TalentTree_Desc_5():ILanguageElement{return this.getElement(20322)};
	/**能量单位产出能量效率提高{0}%*/
	get TalentTree_Desc_6():ILanguageElement{return this.getElement(20323)};
	/**光属性伤害提高{0}%*/
	get TalentTree_Desc_7():ILanguageElement{return this.getElement(20324)};
	/**水属性伤害提高{0}%*/
	get TalentTree_Desc_8():ILanguageElement{return this.getElement(20325)};
	/**土属性伤害提高{0}%*/
	get TalentTree_Desc_9():ILanguageElement{return this.getElement(20326)};
	/**基地每个波次恢复{0}耐久*/
	get TalentTree_Desc_10():ILanguageElement{return this.getElement(20327)};
	/**暗属性伤害提高{0}%*/
	get TalentTree_Desc_11():ILanguageElement{return this.getElement(20328)};
	/**火属性伤害提高{0}%*/
	get TalentTree_Desc_12():ILanguageElement{return this.getElement(20329)};
	/**木属性伤害提高{0}%*/
	get TalentTree_Desc_13():ILanguageElement{return this.getElement(20330)};
	/**敌方入场5秒内减速{0}%*/
	get TalentTree_Desc_14():ILanguageElement{return this.getElement(20331)};
	/**敌方受到伤害提高{0}%*/
	get TalentTree_Desc_15():ILanguageElement{return this.getElement(20332)};
	/**黑木乃伊*/
	get Monster_name_7():ILanguageElement{return this.getElement(20333)};
	/**羊角怪*/
	get Monster_name_8():ILanguageElement{return this.getElement(20334)};
	/**飞行羊角怪*/
	get Monster_name_9():ILanguageElement{return this.getElement(20335)};
	/**暗战士*/
	get Monster_name_10():ILanguageElement{return this.getElement(20336)};
	/**暗首领*/
	get Monster_name_11():ILanguageElement{return this.getElement(20337)};
	/**蛇女*/
	get Monster_name_12():ILanguageElement{return this.getElement(20338)};
	/**憎恶*/
	get Monster_name_13():ILanguageElement{return this.getElement(20339)};
	/**蓝恶魔*/
	get Monster_name_14():ILanguageElement{return this.getElement(20340)};
	/**玄冰战士*/
	get Monster_name_15():ILanguageElement{return this.getElement(20341)};
	/**玄冰守卫*/
	get Monster_name_16():ILanguageElement{return this.getElement(20342)};
	/**玄冰巫师*/
	get Monster_name_17():ILanguageElement{return this.getElement(20343)};
	/**雪怪*/
	get Monster_name_18():ILanguageElement{return this.getElement(20344)};
	/**南瓜小怪*/
	get Monster_name_19():ILanguageElement{return this.getElement(20345)};
	/**鹿角怪*/
	get Monster_name_20():ILanguageElement{return this.getElement(20346)};
	/**荆棘之兴*/
	get Monster_name_21():ILanguageElement{return this.getElement(20347)};
	/**老树人*/
	get Monster_name_22():ILanguageElement{return this.getElement(20348)};
	/**女树人*/
	get Monster_name_23():ILanguageElement{return this.getElement(20349)};
	/**熔岩小怪*/
	get Monster_name_24():ILanguageElement{return this.getElement(20350)};
	/**熔岩巨兽*/
	get Monster_name_25():ILanguageElement{return this.getElement(20351)};
	/**火焰小兵*/
	get Monster_name_26():ILanguageElement{return this.getElement(20352)};
	/**火恶魔*/
	get Monster_name_27():ILanguageElement{return this.getElement(20353)};
	/**熔岩铁甲*/
	get Monster_name_28():ILanguageElement{return this.getElement(20354)};
	/**草地小怪*/
	get Monster_name_29():ILanguageElement{return this.getElement(20355)};
	/**石头怪*/
	get Monster_name_30():ILanguageElement{return this.getElement(20356)};
	/**屠夫*/
	get Monster_name_31():ILanguageElement{return this.getElement(20357)};
	/**老年地精*/
	get Monster_name_32():ILanguageElement{return this.getElement(20358)};
	/**青年地精*/
	get Monster_name_33():ILanguageElement{return this.getElement(20359)};
	/**木乃伊*/
	get Monster_name_34():ILanguageElement{return this.getElement(20360)};
	/**光巨人*/
	get Monster_name_35():ILanguageElement{return this.getElement(20361)};
	/**机甲战士*/
	get Monster_name_36():ILanguageElement{return this.getElement(20362)};
	/**光战士*/
	get Monster_name_37():ILanguageElement{return this.getElement(20363)};
	/**未来战士*/
	get Monster_name_38():ILanguageElement{return this.getElement(20364)};
	/**距离增强*/
	get TalentTree_Name_16():ILanguageElement{return this.getElement(20365)};
	/**物理斩杀*/
	get TalentTree_Name_17():ILanguageElement{return this.getElement(20366)};
	/**黯灭*/
	get TalentTree_Name_18():ILanguageElement{return this.getElement(20367)};
	/**希瓦*/
	get TalentTree_Name_19():ILanguageElement{return this.getElement(20368)};
	/**高射火炮*/
	get TalentTree_Name_20():ILanguageElement{return this.getElement(20369)};
	/**魔法压制*/
	get TalentTree_Name_21():ILanguageElement{return this.getElement(20370)};
	/**元素压制*/
	get TalentTree_Name_22():ILanguageElement{return this.getElement(20371)};
	/**元素抵抗*/
	get TalentTree_Name_23():ILanguageElement{return this.getElement(20372)};
	/**慧光Ⅱ*/
	get TalentTree_Name_24():ILanguageElement{return this.getElement(20373)};
	/**物理精通*/
	get TalentTree_Name_25():ILanguageElement{return this.getElement(20374)};
	/**魔法升华*/
	get TalentTree_Name_26():ILanguageElement{return this.getElement(20375)};
	/**基地耐久Ⅱ*/
	get TalentTree_Name_27():ILanguageElement{return this.getElement(20376)};
	/**攻速增强Ⅱ*/
	get TalentTree_Name_28():ILanguageElement{return this.getElement(20377)};
	/**天降能量Ⅱ*/
	get TalentTree_Name_29():ILanguageElement{return this.getElement(20378)};
	/**产能升级Ⅱ*/
	get TalentTree_Name_30():ILanguageElement{return this.getElement(20379)};
	/**光元素伤害加成Ⅱ*/
	get TalentTree_Name_31():ILanguageElement{return this.getElement(20380)};
	/**暗元素伤害加成Ⅱ*/
	get TalentTree_Name_32():ILanguageElement{return this.getElement(20381)};
	/**水元素伤害加成Ⅱ*/
	get TalentTree_Name_33():ILanguageElement{return this.getElement(20382)};
	/**耐久恢复Ⅱ*/
	get TalentTree_Name_34():ILanguageElement{return this.getElement(20383)};
	/**火元素伤害加成Ⅱ*/
	get TalentTree_Name_35():ILanguageElement{return this.getElement(20384)};
	/**土元素伤害加成Ⅱ*/
	get TalentTree_Name_36():ILanguageElement{return this.getElement(20385)};
	/**木元素伤害加成Ⅱ*/
	get TalentTree_Name_37():ILanguageElement{return this.getElement(20386)};
	/**敌方减速Ⅱ*/
	get TalentTree_Name_38():ILanguageElement{return this.getElement(20387)};
	/**慧光Ⅲ*/
	get TalentTree_Name_39():ILanguageElement{return this.getElement(20388)};
	/**距离增强Ⅱ*/
	get TalentTree_Name_40():ILanguageElement{return this.getElement(20389)};
	/**物理斩杀Ⅱ*/
	get TalentTree_Name_41():ILanguageElement{return this.getElement(20390)};
	/**黯灭Ⅱ*/
	get TalentTree_Name_42():ILanguageElement{return this.getElement(20391)};
	/**希瓦Ⅱ*/
	get TalentTree_Name_43():ILanguageElement{return this.getElement(20392)};
	/**高射火炮Ⅱ*/
	get TalentTree_Name_44():ILanguageElement{return this.getElement(20393)};
	/**魔法压制Ⅱ*/
	get TalentTree_Name_45():ILanguageElement{return this.getElement(20394)};
	/**慧光Ⅳ*/
	get TalentTree_Name_46():ILanguageElement{return this.getElement(20395)};
	/**物理*/
	get TalentTree_Name_47():ILanguageElement{return this.getElement(20396)};
	/**魔法*/
	get TalentTree_Name_48():ILanguageElement{return this.getElement(20397)};
	/**耐久*/
	get TalentTree_Name_49():ILanguageElement{return this.getElement(20398)};
	/**攻击范围提高{0}%*/
	get TalentTree_Desc_16():ILanguageElement{return this.getElement(20399)};
	/**物理伤害对于血量低于20%的敌方造成伤害提高{0}%*/
	get TalentTree_Desc_17():ILanguageElement{return this.getElement(20400)};
	/**敌方入场5秒内护甲减少{0}*/
	get TalentTree_Desc_18():ILanguageElement{return this.getElement(20401)};
	/**敌方入场5秒内魔抗减少{0}*/
	get TalentTree_Desc_19():ILanguageElement{return this.getElement(20402)};
	/**对空中敌方造成伤害提高{0}%*/
	get TalentTree_Desc_20():ILanguageElement{return this.getElement(20403)};
	/**魔法伤害对于血量高于80%的敌方造成伤害提高{0}%*/
	get TalentTree_Desc_21():ILanguageElement{return this.getElement(20404)};
	/**元素克制时造成伤害提高{0}%*/
	get TalentTree_Desc_22():ILanguageElement{return this.getElement(20405)};
	/**元素被克制时的伤害减免减少{0}%*/
	get TalentTree_Desc_23():ILanguageElement{return this.getElement(20406)};
	/**敌方受到伤害提高{0}%*/
	get TalentTree_Desc_24():ILanguageElement{return this.getElement(20407)};
	/**物理伤害提高{0}%*/
	get TalentTree_Desc_25():ILanguageElement{return this.getElement(20408)};
	/**魔法伤害提高{0}%*/
	get TalentTree_Desc_26():ILanguageElement{return this.getElement(20409)};
	/**基地耐久提高{0}*/
	get TalentTree_Desc_27():ILanguageElement{return this.getElement(20410)};
	/**攻击速度提高{0}%*/
	get TalentTree_Desc_28():ILanguageElement{return this.getElement(20411)};
	/**每个波次获得{0}能量*/
	get TalentTree_Desc_29():ILanguageElement{return this.getElement(20412)};
	/**能量单位产出能量效率提高{0}%*/
	get TalentTree_Desc_30():ILanguageElement{return this.getElement(20413)};
	/**光属性伤害提高{0}%*/
	get TalentTree_Desc_31():ILanguageElement{return this.getElement(20414)};
	/**水属性伤害提高{0}%*/
	get TalentTree_Desc_32():ILanguageElement{return this.getElement(20415)};
	/**土属性伤害提高{0}%*/
	get TalentTree_Desc_33():ILanguageElement{return this.getElement(20416)};
	/**基地每个波次恢复{0}耐久*/
	get TalentTree_Desc_34():ILanguageElement{return this.getElement(20417)};
	/**暗属性伤害提高{0}%*/
	get TalentTree_Desc_35():ILanguageElement{return this.getElement(20418)};
	/**火属性伤害提高{0}%*/
	get TalentTree_Desc_36():ILanguageElement{return this.getElement(20419)};
	/**木属性伤害提高{0}%*/
	get TalentTree_Desc_37():ILanguageElement{return this.getElement(20420)};
	/**敌方入场5秒内减速{0}%*/
	get TalentTree_Desc_38():ILanguageElement{return this.getElement(20421)};
	/**敌方受到伤害提高{0}%*/
	get TalentTree_Desc_39():ILanguageElement{return this.getElement(20422)};
	/**攻击范围提高{0}%*/
	get TalentTree_Desc_40():ILanguageElement{return this.getElement(20423)};
	/**物理伤害对于血量低于20%的敌方造成伤害提高{0}%*/
	get TalentTree_Desc_41():ILanguageElement{return this.getElement(20424)};
	/**敌方入场5秒内护甲减少{0}*/
	get TalentTree_Desc_42():ILanguageElement{return this.getElement(20425)};
	/**敌方入场5秒内魔抗减少{0}*/
	get TalentTree_Desc_43():ILanguageElement{return this.getElement(20426)};
	/**对空中敌方造成伤害提高{0}%*/
	get TalentTree_Desc_44():ILanguageElement{return this.getElement(20427)};
	/**魔法伤害对于血量高于80%的敌方造成伤害提高{0}%*/
	get TalentTree_Desc_45():ILanguageElement{return this.getElement(20428)};
	/**敌方受到伤害提高{0}%*/
	get TalentTree_Desc_46():ILanguageElement{return this.getElement(20429)};
	/**在无尽模式下，物理伤害提高{0}%*/
	get TalentTree_Desc_47():ILanguageElement{return this.getElement(20430)};
	/**在无尽模式下，魔法伤害提高{0}%*/
	get TalentTree_Desc_48():ILanguageElement{return this.getElement(20431)};
	/**在无尽模式下，基地耐久提高{0}*/
	get TalentTree_Desc_49():ILanguageElement{return this.getElement(20432)};
	/**元素：*/
	get Tower_attackTags_11():ILanguageElement{return this.getElement(20433)};
	/**部署消耗：*/
	get Tower_attackTags_12():ILanguageElement{return this.getElement(20434)};
	/**等级：*/
	get Tower_attackTags_13():ILanguageElement{return this.getElement(20435)};
	/**体力不足*/
	get Text_insufficientStamina():ILanguageElement{return this.getElement(20436)};
	/**出战阵容*/
	get Tower_setting_1():ILanguageElement{return this.getElement(20437)};
	/**收起*/
	get Tower_setting_2():ILanguageElement{return this.getElement(20438)};
	/**兵营*/
	get Tower_setting_3():ILanguageElement{return this.getElement(20439)};
	/**推荐属性*/
	get Stage_Select_1():ILanguageElement{return this.getElement(20440)};
	/**敌方技能*/
	get Stage_Select_2():ILanguageElement{return this.getElement(20441)};
	/**复原力*/
	get MonsterSkill_1():ILanguageElement{return this.getElement(20442)};
	/**狂暴化*/
	get MonsterSkill_2():ILanguageElement{return this.getElement(20443)};
	/**隐身 */
	get MonsterSkill_3():ILanguageElement{return this.getElement(20444)};
	/**飞行*/
	get MonsterSkill_4():ILanguageElement{return this.getElement(20445)};
	/**具有该技能的单位，每秒会回复{0}的生命值*/
	get MonsterSkillDesc_1():ILanguageElement{return this.getElement(20446)};
	/**该单位生命值低于一半时，会获得{0}%的移动速度提升*/
	get MonsterSkillDesc_2():ILanguageElement{return this.getElement(20447)};
	/**该单位只能被具有“反隐”标签的单位攻击*/
	get MonsterSkillDesc_3():ILanguageElement{return this.getElement(20448)};
	/**该单位只能被具有“对空增伤”、“优先对空”标签的单位攻击*/
	get MonsterSkillDesc_4():ILanguageElement{return this.getElement(20449)};
	/**高*/
	get Setting_1():ILanguageElement{return this.getElement(20450)};
	/**低*/
	get Setting_2():ILanguageElement{return this.getElement(20451)};
	/**出售*/
	get Text_Sell():ILanguageElement{return this.getElement(20452)};
	/**祝福*/
	get Bless_UI_1():ILanguageElement{return this.getElement(20453)};
	/***龙娘祝福来自于 Dragonverse 主世界通过“蓝色飞贼”抓取的龙娘*/
	get Bless_UI_2():ILanguageElement{return this.getElement(20454)};
	/**远古部落*/
	get Stage_stageName_16():ILanguageElement{return this.getElement(20455)};
	/**失落遗迹*/
	get Stage_stageName_17():ILanguageElement{return this.getElement(20456)};
	/**炽热荒漠*/
	get Stage_stageName_18():ILanguageElement{return this.getElement(20457)};
	/**秘境矿山*/
	get Stage_stageName_19():ILanguageElement{return this.getElement(20458)};
	/**幽深矿洞*/
	get Stage_stageName_20():ILanguageElement{return this.getElement(20459)};
	/**无尽之境*/
	get Stage_stageName_21():ILanguageElement{return this.getElement(20460)};
	/**摄像机灵敏度*/
	get UI_45():ILanguageElement{return this.getElement(20461)};
	/**慢*/
	get UI_46():ILanguageElement{return this.getElement(20462)};
	/**快*/
	get UI_47():ILanguageElement{return this.getElement(20463)};
	/**房间ID：{0}*/
	get CurrentRoomId():ILanguageElement{return this.getElement(20464)};
	/**切换房间失败！*/
	get JumpGameFailed():ILanguageElement{return this.getElement(20465)};
	/**切换房间*/
	get SwitchRoomBtn():ILanguageElement{return this.getElement(20466)};
	/**切换至指定房间*/
	get JumpRoomText001():ILanguageElement{return this.getElement(20467)};
	/**请输入房间ID*/
	get JumpRoomText002():ILanguageElement{return this.getElement(20468)};
	/**确定*/
	get SwitchRoomConfirm():ILanguageElement{return this.getElement(20469)};
	/**已解锁*/
	get UI_48():ILanguageElement{return this.getElement(20470)};

}