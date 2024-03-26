import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","Value","Value_CN","Value_JP"],["","Key|ReadByName","","MainLanguage","ChildLanguage","ChildLanguage"],[16001,"UI_diffi_01",null,"Easy","简单难度",null],[16002,"UI_diffi_02",null,"Normal","普通难度",null],[16003,"UI_diffi_03",null,"Hard","困难难度",null],[16004,"UI_diffi_04",null,"Nightmare","噩梦难度",null],[16005,"UI_diffi_05",null,"Hell","地狱难度",null],[16000,"buildtips_0",null,"Please build on the ground","请在地面上建造",null],[10001,"Ending_Title0",null,"Ending ?","结局 ？",null],[10002,"Ending_Graveyard_Title1",null,"Ending: Hot Air Balloon Pilot","结局 热气球驾驶员",null],[10003,"Ending_Graveyard_Content1",null,"The campers left this place of sin by hot air balloon. However, the curse of Haunt Isle will forever continue to cycle.","露营者乘坐热气球离开了这片罪恶之地。然而，惊魂岛的死亡诅咒也将永远循环下去。",null],[10004,"Ending_Graveyard_Title2",null,"Ending: Moon Savior","结局 代表月亮拯救你",null],[10005,"Ending_Graveyard_Content2",null,"Brave campers defeated the Blood Moon, and returned to the real world. The secrets of Haunt Isle will forever be a legend.","勇敢的露营者，打败血月，回到了现实世界。惊魂岛的秘密将永远成为一个传说。",null],[1001,"UI_Start_textTitle",null,"Haunt Isle","惊魂岛",null],[1002,"UI_Story_textTitle",null,"Camping Guidelines","露营须知",null],[1003,"UI_Story_textStory",null,"Campers, welcome to Haunt Isle! \r\nIt's said that every Blood Moon, your shadow comes looking for you...\r\nExplore <color=#af0000ff>building</color>, gather materials, <color=#af0000ff>block the shadows'</color> attacks. \r\nImprove your camping hut and persevere <color=#af0000ff>to survive!</color> \r\nStrange rumors, hiding unknown secrets... \r\nEnjoy the crimson camping journey!","各位露营者，欢迎来到惊魂岛\r\n听说，每当血月降临，你的影子会来找你…\r\n探索<color=#af0000ff>建造</color>，就地取材，<color=#af0000ff>阻挡影人</color>的攻击\r\n完善你的露营小屋，坚持<color=#af0000ff>活下去！</color>\r\n奇怪的传闻，隐藏着怎样不为人知的秘密…\r\n享受血色露营之旅吧！",null],[1101,"UI_Start_01",null,"Start Adventure","开始冒险",null],[1102,"UI_Start_02",null,"Switch Style","切换画风",null],[1103,"UI_Start_03",null,"Normal","普通",null],[1104,"UI_Start_04",null,"Cute","可爱",null],[1105,"UI_Start_05",null,"Mysterious","神秘",null],[1201,"UI_dietext_01",null,"You are losing consciousness to darkness...","你的意识逐渐被黑暗吞噬……",null],[1202,"UI_dietext_02",null,"Survival failed","求生失败",null],[1203,"UI_edback",null,"Return to Main Menu","回主菜单",null],[1204,"UI_edtime",null,"Clearance Time","通关用时",null],[1205,"subtitles_1",null,"Guess what...","猜猜看吧……",null],[1301,"procedure_1",null,"Click to continue the game","点击继续游戏",null],[1302,"procedure_2",null,"Click to start a new game","点击开始新游戏",null],[1303,"procedure_3",null,"Empty","空",null],[1304,"procedure_4",null,"Day {0}","第{0}天",null],[1305,"procedure_5",null,"Time spent: {0}","耗时：{0}",null],[1306,"procedure_6",null,"Creation date: {0}","创建日期：{0}",null],[1307,"procedure_7",null,"Select save file","选择存档",null],[1308,"procedure_8",null,"Delete the current save file?","是否删除当前存档",null],[1309,"procedure_9",null,"Yes","是",null],[1310,"procedure_10",null,"No","否",null],[1311,"procedure_11",null,"Save 1","存档1",null],[1312,"procedure_12",null,"Save 2","存档2",null],[1313,"procedure_13",null,"Save 3","存档3",null],[1314,"newmail_01",null,"New Mail"," 新邮件",null],[1315,"Homename_01",null,"My Hut","营地",null],[1316,"Homename_02",null,"Uninhabited","无人居住",null],[1401,"UI_diffi_06",null,"Completion Record","通关记录",null],[1402,"Door_Tips1",null,"This door won't open.","这道门打不开",null],[1501,"Door_Tips2",null,"You need the correct items to activate.","需要正确的物品才能开启",null],[1502,"Door_Tips3",null,"You need to find the right items to place.","需要寻找正确的物品才能放置哦",null],[1503,"Door_Tips4",null,"Digit {0} of the password: {1}","图书室密码箱第{0}位密码：{1}",null],[1504,"Door_Tips5",null,"Obtain {0}","获得{0}",null],[1505,"Door_Tips6",null,"{0}","{0}",null],[1506,"Door_Tips7",null,"Light {0} more candles to dispel the magic circle.","还要点亮{0}根蜡烛解除法阵",null],[1601,"ranktext_01",null,"Not ranked","未上榜",null],[1602,"ranktime_01",null,"Not cleared","未通关",null],[1603,"ranktext_02",null,"World Ranking","世界排名",null],[1604,"ranktext_03",null,"No one has cleared yet","目前还无人通关哦",null],[1605,"ranktext_04",null,"Nickname","玩家昵称",null],[1700,"diffilock_01",null,"Unlock any ending at {0} mode","通关{0}难度任意结局解锁",null],[1701,"diffilock_02",null,"{0} mode unlocked","{0}难度已解锁",null],[1702,"diffilock_03",null,"Tap anywhere to close","点击屏幕任意位置关闭",null],[1801,"back_01",null,"Return","返回游戏",null],[1802,"back_02",null,"Main Menu","返回主菜单",null],[1901,"help_01",null,"Long press the screen to give up asking for help","长按屏幕放弃求救",null],[1902,"help_02",null,"Help me!","请救救我！",null],[1903,"help_03",null,"HELP","HELP",null],[1904,"help_04",null,"{}","{}",null],[1905,"help_05",null,"{}m","{}米",null],[1906,"help_06",null,"(Long press on the left to give up asking for help)","（长按屏幕左侧放弃求救）",null],[1907,"help_07",null,"Can be revived by other players within {0}s","{0}秒内被其他玩家接触可复活",null],[1908,"GhostDistance_01",null,"Shadow\r\n{0}","影人\r\n{0}",null],[1909,"ItemType_01",null,"<color=#00ff00ff>Heal</color>","<color=#00ff00ff>回血</color>",null],[1910,"ItemType_02",null,"<color=#ffa500ff>Items</color>","<color=#ffa500ff>物品</color>",null],[1911,"ItemType_03",null,"<color=#00ffffff>Building</color>","<color=#00ffffff>建筑</color>",null],[1912,"medicineTips_01",null,"No need to consume when full HP","健康状态下无需食用",null],[1913,"medicineTips_02",null,"Consuming fruit has restored some of your HP","食用大树果实，健康恢复了一些",null],[1914,"PickUpTips_01",null,"Long press to pick up building","长按拾取建筑",null],[1915,"checkPointTips_01",null,"The ghost sailor awakened the shells sleeping in the sea!","幽灵水手唤起了海中沉睡的贝壳！",null],[1916,"checkPointTips_02",null,"Successfully lit up all the sword lights! <size=26>There seems to be something glowing in the warrior's helmet; go check it out</size>","成功点亮全部剑光！<size=26>勇士头盔中有什么在发光，去看看吧</size>",null],[1917,"checkPointTips_03",null,"Got a bite! A big fish!","上钩了！一条大鱼！",null],[1918,"checkPointTips_04",null,"The cat spat out a fish bone that is actually a key!","猫猫吐出了完整的鱼骨……等等，那好像是个钥匙！",null],[2001,"Notebook1_1",null,"Diary fragment: There seem to be many building materials on the island. I need to repair my camping hut before the Blood Moon arrives.","日记残页：岛上似乎有很多建筑材料，要赶快在血月降临前补好我的露营屋",null],[2002,"Notebook1_2",null,"Diary fragment: This is a deserted island. I don't know if there's a way to leave here; what should I do...\r","日记残页：这是一座孤岛，不知道有没有离开这里的办法，我该怎么办",null],[2003,"Notebook1_3",null,"Diary fragment: The Blood Moon that descends every night seems to have some kind of dark curse power, controlling shadowy figures to attack me...","日记残页：每晚降临的血月似乎有某种黑暗诅咒之力，操控着影人来攻击我",null],[2004,"Notebook1_4",null,"Map of Haunt Isle, probably drawn by previous campers","惊魂岛地形图，估计是以前的露营者绘制的",null],[2005,"Notebook1_5",null,"Diary fragment: After eating the healing tree fruit, I feel much better","日记残页：吃完治愈之树的果实，我感觉好多了",null],[2006,"Notebook1_6",null,"Rumor: Haunt Isle is located in the Bermuda region of the North Atlantic, where many ships and planes have gone missing","传闻：惊魂岛位于北大西洋的百慕大地区，该区域发生过多起船只和飞机失踪事件",null],[2007,"Notebook2_1",null,"A hot air balloon?! Maybe I can find a way to fix it","一个热气球？！或许可以想办法修好它",null],[2008,"Notebook2_2",null,"A swing, seems to be connected to some mechanism at the top","秋千，顶端似乎与某个机关相连",null],[2009,"Notebook2_3",null,"Let's take a moment of silence for the people who lost their lives in the air crash.","看来这些就是在那次大空难中遇难的人了，为你们默哀",null],[2010,"Notebook2_4",null,"Diary Fragment: The shadow creatures are getting stronger as they absorb the power of the Blood Moon. We need to find something stronger to resist them.","日记残页：影人在不断吸收血月的力量变得更强，得找些更坚硬的东西来",null],[2011,"Notebook2_5",null,"Ruins of ancient relics, witnessing the demise of a civilization.","古代遗迹的废墟，见证了某个文明的湮灭",null],[2012,"Notebook2_6",null,"Looks like the remains of some ancient creature.","看起来像是某种远古生物的遗骸",null],[2013,"Notebook3_1",null,"The ancient gladiator arena shines with the glory of warriors, but some holy swords are dim without their owners' inscriptions.","古斗兽场闪耀着勇士的光辉，但有些圣剑，因丢失了主人的铭牌而暗淡无光",null],[2014,"Notebook3_2",null,"Jack was a brave and fearless gladiator, flames raging on the battlefield of life and death.","Jack是一位勇敢无畏的角斗士，生死皆为战场的烈焰",null],[2015,"Notebook3_3",null,"Leo excelled in strategy and tactics, possessing extraordinary wisdom as a strategist.","Leo善于用于运用谋略和战术，拥有过人智慧的策士",null],[2016,"Notebook3_4",null,"Max rose from slavery with unwavering determination and resilience.","Max从奴隶身份崛起，百折不挠的斗志，坚韧的意志",null],[2017,"Notebook3_5",null,"Ann was renowned for her superb swordsmanship, a graceful and deadly sword dancer.","Ann以高超的剑术著称，她是剑术的舞者，优雅而致命",null],[2018,"Notebook3_6",null,"Diary Fragment: Why do the shadow creatures look exactly like me?!","日记残页：影人，为何长得和我一模一样？！",null],[2019,"Notebook4_1",null,"Farm warning sign: Beware of hungry cats.","农场警示牌：饿猫出没，注意安全",null],[2020,"Notebook4_2",null,"Mysterious slab with ancient carvings.","神秘的石板，上面篆刻着古老的图案",null],[2021,"Notebook4_3",null,"A common seashell on the beach, can hear the sound of waves.","沙滩上的一只普通的海螺，能听到海浪的声音",null],[2022,"Notebook4_4",null,"Warm campfire, where past campers used to gather.","温暖的篝火，过去的露营者们喜欢聚集于此",null],[2023,"Notebook4_5",null,"Crashed planes, stranded ships, ancient creatures extinct in volcanic eruptions... What's next?","坠毁的飞机、搁浅的船只、在火山喷发中灭绝的远古生物……下一个会是什么？",null],[2024,"Notebook4_6",null,"Why does my message in a bottle always drift back? Is there no way to escape?","我的漂流瓶为什么永远能漂回来，难道真的没有办法逃出去吗？",null],[2025,"Notebook5_1",null,"Strange mural on the rock wall: cave fish eating lobster bait.","岩壁上有一副奇怪的壁画，洞穴鱼正在吃龙虾做的鱼饵",null],[2026,"Notebook5_2",null,"Help me find my hat, and I'll tell you where the treasure of the deep sea is hidden.","帮我找到帽子，我会告诉你深海的宝藏藏在哪",null],[2027,"Notebook5_3",null,"Crashed plane with graffiti covered in blood: \"Don't trust anyone.\"","坠毁的飞机，机身上有血迹斑斑的涂鸦 :“不要相信任何人。”",null],[2028,"Notebook5_4",null,"Shipwrecked Crew Diary: My hat has been stolen! I can't lose it...","货船遗骸中遗留的船员日记：我的帽子被偷走了！我不能失去它…",null],[2029,"Notebook5_5",null,"Signal tower on the snowy mountain, continuously emitting interference rays.","雪山上的信号塔，塔顶正不断向外发射着某种干扰射线",null],[2030,"Notebook5_6",null,"A switch frozen by ice, cannot be used.","某个开关被寒冰冻住了，无法使用",null],[2031,"Notebook6_1",null,"A grave doll is peeking at you.","墓刻娃娃，正在偷看你",null],[2032,"Notebook6_2",null,"Inscription on the tombstone: They say this is paradise, but all I see is death.","墓碑上刻着：他们说这里是天堂，但我只看到了死亡",null],[2033,"Notebook6_3",null,"Cursed tree, absorbing the energy of the volcano, seems to harbor something evil inside.","魔化树，吸收火山的能量，似乎有什么邪恶的东西在里面孕育",null],[2034,"Notebook6_4",null,"Tree of death: Wither, decay, spread!","死灵之树：枯萎、凋零、蔓延吧！",null],[2035,"Notebook6_5",null,"Giant mirror, it seems to reflect another world.","巨大的镜子，仿佛能透过它看到另一个世界",null],[2036,"Notebook6_6",null,"Cage, the Blood Moon imprisoned me here...","牢笼，血月将我囚禁于此…",null],[4000,"tips_show_8",null,"{0} is full, can't pick up more","{0}已满，不能再拾取更多了",null],[4001,"day_tips1",null,"Blood Moon descends, monsters attack, beware!","血月降临，鬼怪袭来，注意躲避！",null],[4002,"day_tips2",null,"Blood Moon ends, brave campers start a new day!","血月结束，勇敢的露营者开启了新的一天！",null],[4003,"hometips_01",null,"No one has lived in this hut yet.","这个小屋暂时还无人居住哦",null],[4004,"hometips_02",null,"{0}'s Hut","{0}的露营小屋",null],[4005,"tips_show_01",null,"The backpack is already full.","背包已经塞不下东西了",null],[4006,"tips_show_02",null,"Items have been placed and cannot be placed again.","已经放置物品，无法再次放置",null],[4007,"tips_show_03",null,null,null,null],[4008,"tips_show_04",null,null,null,null],[4009,"tips_show_05",null,null,null,null],[4010,"tips_show_06",null,null,null,null],[4011,"tips_show_07",null,"Tree of Life, its fruit has healing effects (will produce the next fruit in {0})","生命之树，它的果实有治愈效果（还有{0}生产出下一个果实）",null],[4012,"tips_show_08",null,"Tree of Life, its fruit has healing effects (fruit limit reached, please pick up soon)","生命之树，它的果实有治愈效果（果实数量已达上限，请尽快拾取）",null],[4013,"tips_show_09",null,"'s Hut","\r\n的露营小屋",null],[4014,"tips_show_10",null,"Survived {0} days","已存活{0}天",null],[4015,"tips_show_11",null,"It's daytime now, {0} minutes until the shadow creatures attack at night. Please establish a safe area quickly.","现在是白天，距离夜晚影人来袭还有{0}分钟，请尽快建立安全区",null],[4016,"tips_show_12",null,"Night falls, Blood Moon descends, return to the hut to avoid the shadow creatures' attack!","夜晚血月降临，回到小屋躲避影人进攻！",null],[4017,"tips_show_101",null,"The ancient gladiator arena shines with the glory of warriors, but some holy swords are dim without their owners' inscriptions.","古斗兽场闪耀着勇士的光辉，但有些圣剑，因丢失了主人的铭牌而暗淡无光",null],[4018,"tips_show_102",null,"Jack was a brave and fearless gladiator, flames raging on the battlefield of life and death.","Jack是一位勇敢无畏的角斗士，生死皆为战场的烈焰",null],[4019,"tips_show_103",null,"Leo excelled in strategy and tactics, possessing extraordinary wisdom as a strategist.","Leo善于用于运用谋略和战术，拥有过人智慧的策士",null],[4020,"tips_show_104",null,"Max rose from slavery with unwavering determination and resilience.","Max从奴隶身份崛起，百折不挠的斗志，坚韧的意志",null],[4021,"tips_show_105",null,"Ann was renowned for her superb swordsmanship, a graceful and deadly sword dancer.","Ann以高超的剑术著称，她是剑术的舞者，优雅而致命",null],[4022,"tips_show_106",null,"Sword of bravery, sharp blade with raging flames.","勇敢之剑，剑刃锐利烈焰熊熊",null],[4023,"tips_show_107",null,"Sword of wisdom, exquisite handle with strategic brilliance.","智慧之剑，剑柄精妙运筹帷幄",null],[4024,"tips_show_108",null,"Sword of resilience, solid and unyielding like a rock.","坚韧之剑，剑身厚重坚如磐石",null],[4025,"tips_show_109",null,"Sword of elegance, dazzling sword light like a shooting star.","优雅之剑，剑光绚丽宛若流星",null],[4026,"tips_show_110",null,"Shining Holy Sword, forever engraved with the owner's name","闪耀光芒的圣剑，在此永远铭刻主人的名字",null],[4027,"tips_show_111",null,null,null,null],[4028,"tips_show_112",null,null,null,null],[4029,"tips_show_113",null,null,null,null],[4030,"tips_show_114",null,null,null,null],[4031,"tips_show_115",null,null,null,null],[4032,"tips_show_116",null,null,null,null],[4033,"tips_show_117",null,null,null,null],[4034,"tips_show_118",null,null,null,null],[4035,"tips_show_119",null,null,null,null],[4036,"tips_show_120",null,null,null,null],[4037,"tips_show_121",null,null,null,null],[4038,"tips_show_122",null,null,null,null],[4039,"tips_show_123",null,null,null,null],[3001,"UI_item_01",null,"Tree Fruit <size=26>(Eat to restore some HP)</size>","大树果实 <size=26>(食用可恢复一定血量)</size>",null],[3002,"UI_item_02",null,"Spider Web <size=26>(DEF 10)</size>","蜘蛛网 <size=26>(防御力 10)</size>",null],[3003,"UI_item_03",null,"Wooden Board <size=26>(DEF 100)</size>","木板 <size=26>(防御力 100)</size>",null],[3004,"UI_item_04",null,"Stone Board <size=26>(DEF 200)</size>","石板 <size=26>(防御力 200)</size>",null],[3005,"UI_item_05",null,"Iron Board <size=26>(DEF 400)</size>","铁板 <size=26>(防御力 400)</size>",null],[3006,"UI_item_06",null,"Wooden Fence <size=26>(DEF 110)</size>","木围栏 <size=26>(防御力 110)</size>",null],[3007,"UI_item_07",null,"Stone Fence <size=26>(DEF 230)</size>","石围栏 <size=26>(防御力 230)</size>",null],[3008,"UI_item_08",null,"Iron Fence <size=26>(DEF 450)</size>","铁围栏 <size=26>(防御力 450)</size>",null],[3009,"UI_item_09",null,"Cement Board <size=26>(DEF 500)</size>","水泥板 <size=26>(防御力 500)</size>",null],[3010,"UI_item_10",null,"Cement Pillar <size=26>(DEF 500)</size>","水泥柱 <size=26>(防御力 500)</size>",null],[3011,"UI_item_11",null,"Wooden Door <size=26>(DEF 140)</size>","木门 <size=26>(防御力 140)</size>",null],[3012,"UI_item_12",null,"Stone Door <size=26>(DEF 260)</size>","石门 <size=26>(防御力 260)</size>",null],[3013,"UI_item_13",null,"Iron Door <size=26>(DEF 480)</size>","铁门 <size=26>(防御力 480)</size>",null],[3014,"UI_item_14",null,"Tempered Glass Door <size=26>(DEF 500)</size>","钢化玻璃门 <size=26>(防御力 500)</size>",null],[3015,"UI_item_15",null,"Obsidian Door <size=26>(DEF 1000)</size>","黑曜石门 <size=26>(防御力 1000)</size>",null],[3121,"UI_item_1001",null,"Fabric Brick <size=26>(DEF 80)</size>","布艺方砖 <size=26>(防御力 80)</size>",null],[3122,"UI_item_1002",null,"Wooden Brick <size=26>(DEF 160)</size>","木质方砖 <size=26>(防御力 160)</size>",null],[3123,"UI_item_1003",null,"Crystal Brick <size=26>(DEF 300)</size>","水晶方砖 <size=26>(防御力 300)</size>",null],[3124,"UI_item_1004",null,"Sand Brick <size=26>(DEF 60)</size>","沙质方砖 <size=26>(防御力 60)</size>",null],[3125,"UI_item_1005",null,"Mud Brick <size=26>(DEF 90)</size>","泥土方砖 <size=26>(防御力 90)</size>",null],[3126,"UI_item_1006",null,"Volcanic Rock Brick <size=26>(DEF 1200)</size>","火山岩方砖 <size=26>(防御力 1200)</size>",null],[3127,"UI_item_1007",null,"Coal Brick <size=26>(DEF 110)</size>","煤炭方砖 <size=26>(防御力 110)</size>",null],[3128,"UI_item_1008",null,"Glass Brick <size=26>(DEF 510)</size>","玻璃方砖 <size=26>(防御力 510)</size>",null],[3129,"UI_item_1009",null,"Stone Brick <size=26>(DEF 220)</size>","石质方砖 <size=26>(防御力 220)</size>",null],[3130,"UI_item_1010",null,"Ore Brick <size=26>(DEF 260)</size>","矿石方砖 <size=26>(防御力 260)</size>",null],[3131,"UI_item_1011",null,"Grass Brick <size=26>(DEF 120)</size>","草方砖 <size=26>(防御力 120)</size>",null],[3132,"UI_item_1012",null,"Rusty Iron Brick <size=26>(DEF 450)</size>","锈铁方砖 <size=26>(防御力 450)</size>",null],[3133,"UI_item_1013",null,"Copper Brick <size=26>(DEF 430)</size>","铜质方砖 <size=26>(防御力 430)</size>",null],[3610,"UI_item_55",null,"Camera","照相机",null],[10101,"UI_item_101",null,"Carpet <size=26>(DEF 150)</size>","地毯 <size=26>(防御力 150)</size>",null],[10102,"UI_item_102",null,"Umbrella Stand <size=26>(DEF 150)</size>","雨伞架 <size=26>(防御力 150)</size>",null],[10103,"UI_item_103",null,"Sofa <size=26>(DEF 150)</size>","沙发 <size=26>(防御力 150)</size>",null],[10104,"UI_item_104",null,"Bedside Table <size=26>(DEF 150)</size>","床头柜 <size=26>(防御力 150)</size>",null],[10105,"UI_item_105",null,"Stool <size=26>(DEF 150)</size>","凳子 <size=26>(防御力 150)</size>",null],[10106,"UI_item_106",null,"TV Stand <size=26>(DEF 150)</size>","电视柜 <size=26>(防御力 150)</size>",null],[10107,"UI_item_107",null,"Bed <size=26>(DEF 150)</size>","床 <size=26>(防御力 150)</size>",null],[10108,"UI_item_108",null,"Table <size=26>(DEF 150)</size>","桌子 <size=26>(防御力 150)</size>",null],[10109,"UI_item_109",null,"Chair <size=26>(DEF 150)</size>","椅子 <size=26>(防御力 150)</size>",null],[10110,"UI_item_110",null,"Bookshelf <size=26>(DEF 150)</size>","书架 <size=26>(防御力 150)</size>",null],[10111,"UI_item_111",null,"TV <size=26>(DEF 150)</size>","电视 <size=26>(防御力 150)</size>",null],[10112,"UI_item_112",null,"Bathtub <size=26>(DEF 150)</size>","浴缸 <size=26>(防御力 150)</size>",null],[10113,"UI_item_113",null,"Bookcase <size=26>(DEF 150)</size>","书柜 <size=26>(防御力 150)</size>",null],[10114,"UI_item_114",null,"Wardrobe <size=26>(DEF 150)</size>","衣柜 <size=26>(防御力 150)</size>",null],[10115,"UI_item_115",null,"Painting <size=26>(DEF 150)</size>","挂画 <size=26>(防御力 150)</size>",null],[10116,"UI_item_116",null,"Frige <size=26>(DEF 150)</size>","冰箱 <size=26>(防御力 150)</size>",null],[10117,"UI_item_117",null,"TV Stand <size=26>(DEF 150)</size>","电视柜 <size=26>(防御力 150)</size>",null],[10118,"UI_item_118",null,"Clock <size=26>(DEF 150)</size>","钟表 <size=26>(防御力 150)</size>",null],[10119,"UI_item_119",null,"Computer <size=26>(DEF 150)</size>","电脑 <size=26>(防御力 150)</size>",null],[10120,"UI_item_120",null,"Washing Machine <size=26>(DEF 150)</size>","洗衣机 <size=26>(防御力 150)</size>",null],[10121,"UI_item_121",null,"Computer Desk <size=26>(DEF 150)</size>","电脑桌 <size=26>(防御力 150)</size>",null],[10122,"UI_item_122",null,"Computer Chair <size=26>(DEF 150)</size>","电脑椅 <size=26>(防御力 150)</size>",null],[10123,"UI_item_123",null,"Sofa Table <size=26>(DEF 150)</size>","沙发桌 <size=26>(防御力 150)</size>",null],[10124,"UI_item_124",null,"Bed <size=26>(DEF 150)</size>","床 <size=26>(防御力 150)</size>",null],[10125,"UI_item_125",null,"Wine Cabinet <size=26>(DEF 150)</size>","红酒柜 <size=26>(防御力 150)</size>",null],[10126,"UI_item_126",null,"Wardrobe <size=26>(DEF 150)</size>","衣柜 <size=26>(防御力 150)</size>",null],[10127,"UI_item_127",null,"Table <size=26>(DEF 150)</size>","桌子 <size=26>(防御力 150)</size>",null],[10128,"UI_item_128",null,"Sofa <size=26>(DEF 150)</size>","沙发 <size=26>(防御力 150)</size>",null],[10129,"UI_item_129",null,"Chair <size=26>(DEF 150)</size>","椅子 <size=26>(防御力 150)</size>",null],[10130,"UI_item_130",null,"Sink <size=26>(DEF 150)</size>","洗手池 <size=26>(防御力 150)</size>",null],[10131,"UI_item_131",null,"Cabinet <size=26>(DEF 150)</size>","柜子 <size=26>(防御力 150)</size>",null],[10132,"UI_item_132",null,"Table <size=26>(DEF 150)</size>","桌子 <size=26>(防御力 150)</size>",null],[10133,"UI_item_133",null,"Wardrobe <size=26>(DEF 150)</size>","衣柜 <size=26>(防御力 150)</size>",null],[10134,"UI_item_134",null,"TV Stand <size=26>(DEF 150)</size>","电视柜 <size=26>(防御力 150)</size>",null],[10135,"UI_item_135",null,"Dining Table <size=26>(DEF 150)</size>","餐桌 <size=26>(防御力 150)</size>",null],[10136,"UI_item_136",null,"Dining Chair <size=26>(DEF 150)</size>","餐椅 <size=26>(防御力 150)</size>",null],[10137,"UI_item_137",null,"Bed <size=26>(DEF 150)</size>","床 <size=26>(防御力 150)</size>",null],[10138,"UI_item_138",null,"Wine Cabinet <size=26>(DEF 150)</size>","红酒柜 <size=26>(防御力 150)</size>",null],[10139,"UI_item_139",null,"SC Cabinet <size=26>(DEF 150)</size>","半圆柜 <size=26>(防御力 150)</size>",null],[10140,"UI_item_140",null,"Bedside Table <size=26>(DEF 150)</size>","床头柜 <size=26>(防御力 150)</size>",null],[10141,"UI_item_141",null,"Violin <size=26>(DEF 150)</size>","小提琴 <size=26>(防御力 150)</size>",null],[10142,"UI_item_142",null,"Piano <size=26>(DEF 150)</size>","钢琴 <size=26>(防御力 150)</size>",null],[10143,"UI_item_143",null,"Sofa <size=26>(DEF 150)</size>","沙发 <size=26>(防御力 150)</size>",null],[10144,"UI_item_144",null,"Carpet <size=26>(DEF 150)</size>","地毯 <size=26>(防御力 150)</size>",null],[10145,"UI_item_145",null,"Chair <size=26>(DEF 150)</size>","椅子 <size=26>(防御力 150)</size>",null],[10146,"UI_item_146",null,"Fish Tank <size=26>(DEF 150)</size>","鱼缸 <size=26>(防御力 150)</size>",null],[10147,"UI_item_147",null,"Bookshelf <size=26>(DEF 150)</size>","书架 <size=26>(防御力 150)</size>",null],[10148,"UI_item_148",null,"Bed <size=26>(DEF 150)</size>","床 <size=26>(防御力 150)</size>",null],[10149,"UI_item_149",null,"Cabinet <size=26>(DEF 150)</size>","柜子 <size=26>(防御力 150)</size>",null],[10150,"UI_item_150",null,"Table <size=26>(DEF 150)</size>","桌子 <size=26>(防御力 150)</size>",null],[10151,"UI_item_151",null,"Stool <size=26>(DEF 150)</size>","凳子 <size=26>(防御力 150)</size>",null],[10152,"UI_item_152",null,"TV Stand <size=26>(DEF 150)</size>","电视柜 <size=26>(防御力 150)</size>",null],[10153,"UI_item_153",null,"Solo Sofa <size=26>(DEF 150)</size>","单人沙发 <size=26>(防御力 150)</size>",null],[10154,"UI_item_154",null,"Sofa <size=26>(DEF 150)</size>","沙发 <size=26>(防御力 150)</size>",null],[10155,"UI_item_155",null,"Cabinet <size=26>(DEF 150)</size>","柜子 <size=26>(防御力 150)</size>",null],[10156,"UI_item_156",null,"Bookcase <size=26>(DEF 150)</size>","书柜 <size=26>(防御力 150)</size>",null],[10157,"UI_item_157",null,"Chair <size=26>(DEF 150)</size>","椅子 <size=26>(防御力 150)</size>",null],[10158,"UI_item_158",null,"Dining Table <size=26>(DEF 150)</size>","餐桌 <size=26>(防御力 150)</size>",null],[10159,"UI_item_159",null,"Easel <size=26>(DEF 150)</size>","画架 <size=26>(防御力 150)</size>",null],[10160,"UI_item_160",null,"Carpet <size=26>(DEF 150)</size>","地毯 <size=26>(防御力 150)</size>",null],[10161,"UI_item_161",null,"Bed <size=26>(DEF 150)</size>","床 <size=26>(防御力 150)</size>",null],[10162,"UI_item_162",null,"Wardrobe <size=26>(DEF 150)</size>","衣柜 <size=26>(防御力 150)</size>",null],[10163,"UI_item_163",null,"Carpet <size=26>(DEF 150)</size>","地毯 <size=26>(防御力 150)</size>",null],[10164,"UI_item_164",null,"Desk <size=26>(DEF 150)</size>","书桌 <size=26>(防御力 150)</size>",null],[10165,"UI_item_165",null,"Cabinet <size=26>(DEF 150)</size>","橱柜 <size=26>(防御力 150)</size>",null],[10166,"UI_item_166",null,"Lazy Sofa <size=26>(DEF 150)</size>","懒人沙发 <size=26>(防御力 150)</size>",null],[10167,"UI_item_167",null,"Computer Chair <size=26>(DEF 150)</size>","电脑椅 <size=26>(防御力 150)</size>",null],[10168,"UI_item_168",null,"TV Stand <size=26>(DEF 150)</size>","电视柜 <size=26>(防御力 150)</size>",null],[10169,"UI_item_169",null,"Computer Desk <size=26>(DEF 150)</size>","电脑桌 <size=26>(防御力 150)</size>",null],[10170,"UI_item_170",null,"Countertop Cabinet <size=26>(DEF 150)</size>","台面柜 <size=26>(防御力 150)</size>",null],[10171,"UI_item_171",null,"Low Table <size=26>(DEF 150)</size>","高低桌 <size=26>(防御力 150)</size>",null],[10172,"UI_item_172",null,"Coffee Maker <size=26>(DEF 150)</size>","咖啡机 <size=26>(防御力 150)</size>",null],[10173,"UI_item_173",null,"Chair <size=26>(DEF 150)</size>","椅子 <size=26>(防御力 150)</size>",null],[10174,"UI_item_174",null,"Sofa <size=26>(DEF 150)</size>","沙发 <size=26>(防御力 150)</size>",null],[10175,"UI_item_175",null,"Painting <size=26>(DEF 150)</size>","挂画 <size=26>(防御力 150)</size>",null],[5001,"map_01",null,"Central Camp","中心营地",null],[5002,"map_02",null,"Waterfall Cave","流瀑山洞",null],[5003,"map_03",null,"Magma Volcano","岩浆火山",null],[5004,"map_04",null,"Snow Mountain","冰原雪山",null],[5005,"map_05",null,"Ethereal Graveyard","幽森墓地",null],[5006,"map_06",null,"Fallen Beach","陨落海滩",null],[5007,"map_07",null,"Pastoral Farm","田园农场",null],[5008,"map_08",null,"Boulder Canyon","巨石峡谷",null],[5009,"map_09",null,"Ancient Arena","古斗兽场",null],[5101,"maptips_01",null,"Bonfire, BBQ, Warm Campsite","篝火、烧烤，温暖的营地",null],[5102,"maptips_02",null,"Crystal Lake, where fish reside","冰晶湖泊，鱼儿栖息于此",null],[5103,"maptips_03",null,"Pulsating Magic Stones, harboring evil","跳动的魔石，孕育罪恶",null],[5104,"maptips_04",null,"Land of Extreme Cold, where everything freezes","极寒之地，冰封一切",null],[5105,"maptips_05",null,"Curtain Call of Life, eternal in the mirror","生命的落幕，镜中的永恒",null],[5106,"maptips_06",null,"Sunken Ship, Crashed Plane, What's Next?","沉船、坠机，下一个是…",null],[5107,"maptips_07",null,"Danger? Delicacy? Eyes Glaring","危险？美味？虎视眈眈",null],[5108,"maptips_08",null,"Narrow Skyline","一线天，狭窄的星空",null],[5109,"maptips_09",null,"The Place of Brave Souls","勇士埋骨之地，代表荣耀",null],[6001,"UI_item_6001",null,"Fishbone Key <size=26>(Go check the cave)</size>","鱼骨钥匙<size=26>（回山洞看看吧）</size>",null],[6002,"UI_item_6002",null,"Cat Bowl","猫碗",null],[6003,"UI_item_6003",null,"Fish Bait Made of Deep-Sea Lobster <size=26>(Go check the cave)</size>","深海龙虾制成的鱼饵<size=26>（去山洞看看吧）</size>",null],[6004,"UI_item_6004",null,"Cave Fish <size=26>(It's starving on the farm)</size>","洞穴鱼<size=26>（农场的它留下渴望的口水）</size>",null],[6005,"UI_item_6005",null,"Hat Lost by a Ghostly Sailor <size=26>(Check the ship)</size>","某位幽灵水手丢失的帽子<size=26>（可以去船上看看）</size>",null],[6006,"UI_item_6006",null,"Plaque: Jack, a Brave Gladiator, Flames of Battle <size=26>(Check the arena)</size>","铭牌:<size=26>Jack是一位勇敢无畏的角斗士，生死皆为战场的烈焰</size>",null],[6007,"UI_item_6007",null,"Plaque: Leo, Master of Strategy and Tactics <size=26>(Check the arena)</size>","铭牌:<size=26>Leo善于用于运用谋略和战术，拥有过人智慧的策士</size>",null],[6008,"UI_item_6008",null,"Plaque: Max, the Resilient Rise from Slavery <size=26>(Check the arena)</size>","铭牌:<size=26>Max从奴隶身份崛起，百折不挠的斗志，坚韧的意志</size>",null],[6009,"UI_item_6009",null,"Plaque: Ann, Master of Swordplay, Graceful and Deadly <size=26>(Check the arena)</size>","铭牌:<size=26>Ann以高超的剑术著称，她是剑术的舞者，优雅而致命</size>",null],[6010,"UI_item_6010",null,"Burner No.1 <size=26>(Power source for the hot air balloon)</size>","1号喷火器<size=26>（热气球的动力来源）</size>",null],[6011,"UI_item_6011",null,"Burner No.2 <size=26>(Power source for the hot air balloon)</size>","2号喷火器<size=26>（热气球的动力来源）</size>",null],[6012,"UI_item_6012",null,"Burner No.3 <size=26>(Power source for the hot air balloon)</size>","3号喷火器<size=26>（热气球的动力来源）</size>",null],[6013,"UI_item_6013",null,"Burner No.4 <size=26>(Power source for the hot air balloon)</size>","4号喷火器<size=26>（热气球的动力来源）</size>",null],[20001,"LetterDay_01",null,"Today","今天",null],[20002,"LetterDay_02",null,"{0} days ago","{0}天前",null],[20003,"mail_date",null,"2094-04-01","2094-04-01",null],[20004,"mail_writter",null,"Mysterious Man","神秘人",null],[20005,"mail_title",null,"Beware of the Shadow Creatures!","小心影人！",null],[20006,"mail_content",null,"Hey newcomer, see that wooden cabin? It's your only refuge now. \r\nOh, and I have to warn you, beware of the shadow creatures! They come for you when the Blood Moon rises. \r\nBefore that, explore the island, <color=#af0000ff>gather building materials and furniture, constantly improve your cabin, and fend off the shadow creatures' attacks.</color> \r\nGood luck!","嘿新来的，看到这个木屋了没，现在它是你唯一的庇护所。\r\n对了，我不得不提醒你，小心影人！\r\n夜晚血月降临时，它会来找你。\r\n在那之前，在岛上探索，<color=#af0000ff>收集建筑材料和家具，不断完善小屋，阻挡影人的攻击。</color>\r\n祝你好运！",null],[20007,"mail_writter_02",null,"Mysterious Man","神秘人",null],[20008,"mail_title_02",null,"Power of Healing","治愈之力",null],[20009,"mail_content_02",null,"What?! There's a <color=#af0000ff>giant tree stump</color> in the central camp? I can feel its healing power. <color=#af0000ff>Eating its fruit can restore your HP.</color> Good luck!","什么？！中心营地竟然有棵<color=#af0000ff>大树桩</color>？我能感受到它的治愈之力，<color=#af0000ff>食用它的果实能回复你的健康。</color>\r\n祝你好运！",null],[20010,"mail_writter_03",null,"Mysterious Man","神秘人",null],[20011,"mail_title_03",null,"Haunt Isle Map","惊魂岛地图",null],[20012,"mail_content_03",null,"I think you should have seen it now. Near the <color=#af0000ff>BBQ table in the central camp</color>, there's a <color=#af0000ff>map of Haunt Isle left by previous campers.</color> \r\nGood luck!","我想你应该看到了。<color=#af0000ff>中心营地的烧烤桌旁</color>，有以前的露营者留下的<color=#af0000ff>惊魂岛地图。</color>\r\n祝你好运！",null],[20013,"mail_writter_04",null,"Shadow","影人",null],[20014,"mail_title_04",null,"Tonight, I'll come again...","今晚，我会再来",null],[20015,"mail_content_04",null,"Blood Moon's call makes me <color=#af0000ff>stronger!</color> Tonight, I will come again.","血月的召唤，让我<color=#af0000ff>变得更强！</color>今晚，我会再来。",null],[20016,"mail_writter_05",null,"Mysterious Man","神秘人",null],[20017,"mail_title_05",null,"Please take some time to walk along the beach.","有时间可以去海滩逛逛",null],[20018,"mail_content_05",null,"I found many containers on the <color=#af0000ff>beach</color>. There should be some <color=#af0000ff>furniture</color> you're looking for. \r\nGood luck!","我在<color=#af0000ff>海滩</color>发现很多集装箱，应该会有你想要的<color=#af0000ff>家具。</color>\r\n祝你好运！",null],[20019,"mail_writter_06",null,"Blood Moon","血月",null],[20020,"mail_title_06",null,"Escape? Impossible","逃出去？不可能的",null],[20021,"mail_content_06",null,"The hot air balloon at the foot of the <color=#af0000ff>snow mountain</color> has long been destroyed by me. \r\nDon't even think about escaping... \r\nDeath is eternal... \r\nWhy not stay here forever?","<color=#af0000ff>雪山脚下的热气球</color>早已被我破坏。\r\n不要妄想逃出去...\r\n死亡即永恒...\r\n永远留在这里不好吗？",null],[20022,"mail_writter_07",null,"Grave Doll","墓刻娃娃",null],[20023,"mail_title_07",null,"Oops, caught red-handed","哎呀，被发现啦",null],[20024,"mail_content_07",null,"Stop struggling, it won't forgive you. Hehe...hehehe","别挣扎了，它不会原谅你的\r\n嘻嘻...嘻嘻嘻",null],[20025,"mail_writter_08",null,"Shadow","影人",null],[20026,"mail_title_08",null,"Your luck is running out","你的好运要结束了",null],[20027,"mail_content_08",null,"Almost, just almost! Damn it, these darn buildings are blocking my way, I'll smash them all!","差一点，就差一点！可恶，这些该死的建筑挡住了我的去路，我要把他们全部打烂！",null],[20028,"mail_writter_09",null,"Fisherman","钓鱼人",null],[20029,"mail_title_09",null,"Fish! Fish! Fish!","鱼！鱼！鱼！",null],[20030,"mail_content_09",null,"Why do I fish day after day in the <color=#af0000ff>cave</color> and never catch anything??","为什么我在<color=#af0000ff>山洞</color>里日复一日的钓鱼，永远没有鱼上钩？？",null],[20031,"mail_writter_10",null,"Black Cat","黑猫",null],[20032,"mail_title_10",null,"Meow?","喵？",null],[20033,"mail_content_10",null,"Meow? Meow... Meow... <color=#af0000ff>Hungry</color>...","喵？喵........呜......好<color=#af0000ff>饿</color>喵",null],[20034,"mail_writter_11",null,"Ghost Sailor","幽灵水手",null],[20035,"mail_title_11",null,"My hat is missing!","我的帽子不见了",null],[20036,"mail_content_11",null,"Someone stole my <color=#af0000ff>hat!</color> If you can help me find it, I'll show you treasures from the <color=#af0000ff>deep sea</color>.","有人偷走了我的<color=#af0000ff>帽子！</color>如果你能帮我找到它，我会送你来自<color=#af0000ff>深海的宝藏</color>",null],[20037,"mail_writter_12",null,"Shadow","影人",null],[20038,"mail_title_12",null,"Replace me, or be destroyed!","取代我，或者消灭你！",null],[20039,"mail_content_12",null,"I know everything about you... your existence, your fears. \r\nWhy should I just be your <color=#af0000ff>shadow?</color> \r\nReplace me, or be destroyed!","我了解你的一切...你的存在、你的恐惧\r\n凭什么我只能成为你的<color=#af0000ff>影子？</color>\r\n取代我，或者消灭你！",null],[20040,"mail_writter_13",null,"Mysterious Man","神秘人",null],[20041,"mail_title_13",null,"\"Delicacy\" from the Deep Sea","来自深海的\"美味\"",null],[20042,"mail_content_13",null,"Some time ago, the fisherman asked me to make a <color=#af0000ff>lobster ball</color> with deep-sea lobster meat. \r\nI placed it on the BBQ table in the <color=#af0000ff>central camp.</color> \r\nStrange, who would eat such fishy food these days?","前段时间，钓鱼人托我用深海的龙虾肉泥做了一个<color=#af0000ff>龙虾丸。</color>\r\n我放在<color=#af0000ff>中心营地</color>的烧烤桌上了。\r\n真是奇怪，这年头谁会吃这么腥的食物？",null],[20043,"mail_writter_14",null,"Blood Moon","血月",null],[20044,"mail_title_14",null,"The moon is the only one","月是唯一的",null],[20045,"mail_content_14",null,"Everyone is unique... and so is the moon. \r\nBecome... the <color=#af0000ff>sole</color> moon in the entire sky. \r\nDark creatures, respond to my call! \r\nMy power is surging...","每个人都是独一无二的...月，也是。\r\n成为...整个天空...<color=#af0000ff>唯一</color>的月。\r\n黑暗的牲灵们，回应我的呼唤！\r\n我的力量正在涌动...",null],[20101,"Building_0001",null,"Building","建筑",null],[20102,"Building_0002",null,"Furniture","家具",null],[20103,"Building_0003",null,"Build","建造",null],[20104,"Building_0004",null,"Continuous Build","连续建造",null],[20105,"Building_0005",null,"Backspace to return to the building selection page","退格键返回建筑选择界面",null],[20106,"Building_0006",null,"Esc to close the build page","Esc键关闭建造页面",null],[20107,"Building_0007",null,"Build","建造",null],[30001,"CurrentUserId",null,"User id:{0}","UserId：{0}",null],[30002,"JumpGameFailed",null,"Switch home failed! ","切换家园失败！",null],[30003,"SwitchHomeBtn",null,"Switch home","切换家园",null],[30004,"JumpHomeText001",null,"Switch to a designated home","切换至指定家园",null],[30005,"JumpHomeText002",null,"Please enter the user id","请输入userid",null],[30006,"SwitchHomeConfirm",null,"Confirm","确定",null]];
export interface ILanguageElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**名字索引*/
	name:string
	/**描述*/
	desc:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**Easy*/
	get UI_diffi_01():ILanguageElement{return this.getElement(16001)};
	/**Normal*/
	get UI_diffi_02():ILanguageElement{return this.getElement(16002)};
	/**Hard*/
	get UI_diffi_03():ILanguageElement{return this.getElement(16003)};
	/**Nightmare*/
	get UI_diffi_04():ILanguageElement{return this.getElement(16004)};
	/**Hell*/
	get UI_diffi_05():ILanguageElement{return this.getElement(16005)};
	/**Please build on the ground*/
	get buildtips_0():ILanguageElement{return this.getElement(16000)};
	/**Ending ?*/
	get Ending_Title0():ILanguageElement{return this.getElement(10001)};
	/**Ending: Hot Air Balloon Pilot*/
	get Ending_Graveyard_Title1():ILanguageElement{return this.getElement(10002)};
	/**The campers left this place of sin by hot air balloon. However, the curse of Haunt Isle will forever continue to cycle.*/
	get Ending_Graveyard_Content1():ILanguageElement{return this.getElement(10003)};
	/**Ending: Moon Savior*/
	get Ending_Graveyard_Title2():ILanguageElement{return this.getElement(10004)};
	/**Brave campers defeated the Blood Moon, and returned to the real world. The secrets of Haunt Isle will forever be a legend.*/
	get Ending_Graveyard_Content2():ILanguageElement{return this.getElement(10005)};
	/**Haunt Isle*/
	get UI_Start_textTitle():ILanguageElement{return this.getElement(1001)};
	/**Camping Guidelines*/
	get UI_Story_textTitle():ILanguageElement{return this.getElement(1002)};
	/**Campers, welcome to Haunt Isle! 
It's said that every Blood Moon, your shadow comes looking for you...
Explore <color=#af0000ff>building</color>, gather materials, <color=#af0000ff>block the shadows'</color> attacks. 
Improve your camping hut and persevere <color=#af0000ff>to survive!</color> 
Strange rumors, hiding unknown secrets... 
Enjoy the crimson camping journey!*/
	get UI_Story_textStory():ILanguageElement{return this.getElement(1003)};
	/**Start Adventure*/
	get UI_Start_01():ILanguageElement{return this.getElement(1101)};
	/**Switch Style*/
	get UI_Start_02():ILanguageElement{return this.getElement(1102)};
	/**Normal*/
	get UI_Start_03():ILanguageElement{return this.getElement(1103)};
	/**Cute*/
	get UI_Start_04():ILanguageElement{return this.getElement(1104)};
	/**Mysterious*/
	get UI_Start_05():ILanguageElement{return this.getElement(1105)};
	/**You are losing consciousness to darkness...*/
	get UI_dietext_01():ILanguageElement{return this.getElement(1201)};
	/**Survival failed*/
	get UI_dietext_02():ILanguageElement{return this.getElement(1202)};
	/**Return to Main Menu*/
	get UI_edback():ILanguageElement{return this.getElement(1203)};
	/**Clearance Time*/
	get UI_edtime():ILanguageElement{return this.getElement(1204)};
	/**Guess what...*/
	get subtitles_1():ILanguageElement{return this.getElement(1205)};
	/**Click to continue the game*/
	get procedure_1():ILanguageElement{return this.getElement(1301)};
	/**Click to start a new game*/
	get procedure_2():ILanguageElement{return this.getElement(1302)};
	/**Empty*/
	get procedure_3():ILanguageElement{return this.getElement(1303)};
	/**Day {0}*/
	get procedure_4():ILanguageElement{return this.getElement(1304)};
	/**Time spent: {0}*/
	get procedure_5():ILanguageElement{return this.getElement(1305)};
	/**Creation date: {0}*/
	get procedure_6():ILanguageElement{return this.getElement(1306)};
	/**Select save file*/
	get procedure_7():ILanguageElement{return this.getElement(1307)};
	/**Delete the current save file?*/
	get procedure_8():ILanguageElement{return this.getElement(1308)};
	/**Yes*/
	get procedure_9():ILanguageElement{return this.getElement(1309)};
	/**No*/
	get procedure_10():ILanguageElement{return this.getElement(1310)};
	/**Save 1*/
	get procedure_11():ILanguageElement{return this.getElement(1311)};
	/**Save 2*/
	get procedure_12():ILanguageElement{return this.getElement(1312)};
	/**Save 3*/
	get procedure_13():ILanguageElement{return this.getElement(1313)};
	/**New Mail*/
	get newmail_01():ILanguageElement{return this.getElement(1314)};
	/**My Hut*/
	get Homename_01():ILanguageElement{return this.getElement(1315)};
	/**Uninhabited*/
	get Homename_02():ILanguageElement{return this.getElement(1316)};
	/**Completion Record*/
	get UI_diffi_06():ILanguageElement{return this.getElement(1401)};
	/**This door won't open.*/
	get Door_Tips1():ILanguageElement{return this.getElement(1402)};
	/**You need the correct items to activate.*/
	get Door_Tips2():ILanguageElement{return this.getElement(1501)};
	/**You need to find the right items to place.*/
	get Door_Tips3():ILanguageElement{return this.getElement(1502)};
	/**Digit {0} of the password: {1}*/
	get Door_Tips4():ILanguageElement{return this.getElement(1503)};
	/**Obtain {0}*/
	get Door_Tips5():ILanguageElement{return this.getElement(1504)};
	/**{0}*/
	get Door_Tips6():ILanguageElement{return this.getElement(1505)};
	/**Light {0} more candles to dispel the magic circle.*/
	get Door_Tips7():ILanguageElement{return this.getElement(1506)};
	/**Not ranked*/
	get ranktext_01():ILanguageElement{return this.getElement(1601)};
	/**Not cleared*/
	get ranktime_01():ILanguageElement{return this.getElement(1602)};
	/**World Ranking*/
	get ranktext_02():ILanguageElement{return this.getElement(1603)};
	/**No one has cleared yet*/
	get ranktext_03():ILanguageElement{return this.getElement(1604)};
	/**Nickname*/
	get ranktext_04():ILanguageElement{return this.getElement(1605)};
	/**Unlock any ending at {0} mode*/
	get diffilock_01():ILanguageElement{return this.getElement(1700)};
	/**{0} mode unlocked*/
	get diffilock_02():ILanguageElement{return this.getElement(1701)};
	/**Tap anywhere to close*/
	get diffilock_03():ILanguageElement{return this.getElement(1702)};
	/**Return*/
	get back_01():ILanguageElement{return this.getElement(1801)};
	/**Main Menu*/
	get back_02():ILanguageElement{return this.getElement(1802)};
	/**Long press the screen to give up asking for help*/
	get help_01():ILanguageElement{return this.getElement(1901)};
	/**Help me!*/
	get help_02():ILanguageElement{return this.getElement(1902)};
	/**HELP*/
	get help_03():ILanguageElement{return this.getElement(1903)};
	/**{}*/
	get help_04():ILanguageElement{return this.getElement(1904)};
	/**{}m*/
	get help_05():ILanguageElement{return this.getElement(1905)};
	/**(Long press on the left to give up asking for help)*/
	get help_06():ILanguageElement{return this.getElement(1906)};
	/**Can be revived by other players within {0}s*/
	get help_07():ILanguageElement{return this.getElement(1907)};
	/**Shadow
{0}*/
	get GhostDistance_01():ILanguageElement{return this.getElement(1908)};
	/**<color=#00ff00ff>Heal</color>*/
	get ItemType_01():ILanguageElement{return this.getElement(1909)};
	/**<color=#ffa500ff>Items</color>*/
	get ItemType_02():ILanguageElement{return this.getElement(1910)};
	/**<color=#00ffffff>Building</color>*/
	get ItemType_03():ILanguageElement{return this.getElement(1911)};
	/**No need to consume when full HP*/
	get medicineTips_01():ILanguageElement{return this.getElement(1912)};
	/**Consuming fruit has restored some of your HP*/
	get medicineTips_02():ILanguageElement{return this.getElement(1913)};
	/**Long press to pick up building*/
	get PickUpTips_01():ILanguageElement{return this.getElement(1914)};
	/**The ghost sailor awakened the shells sleeping in the sea!*/
	get checkPointTips_01():ILanguageElement{return this.getElement(1915)};
	/**Successfully lit up all the sword lights! <size=26>There seems to be something glowing in the warrior's helmet; go check it out</size>*/
	get checkPointTips_02():ILanguageElement{return this.getElement(1916)};
	/**Got a bite! A big fish!*/
	get checkPointTips_03():ILanguageElement{return this.getElement(1917)};
	/**The cat spat out a fish bone that is actually a key!*/
	get checkPointTips_04():ILanguageElement{return this.getElement(1918)};
	/**Diary fragment: There seem to be many building materials on the island. I need to repair my camping hut before the Blood Moon arrives.*/
	get Notebook1_1():ILanguageElement{return this.getElement(2001)};
	/**Diary fragment: This is a deserted island. I don't know if there's a way to leave here; what should I do...*/
	get Notebook1_2():ILanguageElement{return this.getElement(2002)};
	/**Diary fragment: The Blood Moon that descends every night seems to have some kind of dark curse power, controlling shadowy figures to attack me...*/
	get Notebook1_3():ILanguageElement{return this.getElement(2003)};
	/**Map of Haunt Isle, probably drawn by previous campers*/
	get Notebook1_4():ILanguageElement{return this.getElement(2004)};
	/**Diary fragment: After eating the healing tree fruit, I feel much better*/
	get Notebook1_5():ILanguageElement{return this.getElement(2005)};
	/**Rumor: Haunt Isle is located in the Bermuda region of the North Atlantic, where many ships and planes have gone missing*/
	get Notebook1_6():ILanguageElement{return this.getElement(2006)};
	/**A hot air balloon?! Maybe I can find a way to fix it*/
	get Notebook2_1():ILanguageElement{return this.getElement(2007)};
	/**A swing, seems to be connected to some mechanism at the top*/
	get Notebook2_2():ILanguageElement{return this.getElement(2008)};
	/**Let's take a moment of silence for the people who lost their lives in the air crash.*/
	get Notebook2_3():ILanguageElement{return this.getElement(2009)};
	/**Diary Fragment: The shadow creatures are getting stronger as they absorb the power of the Blood Moon. We need to find something stronger to resist them.*/
	get Notebook2_4():ILanguageElement{return this.getElement(2010)};
	/**Ruins of ancient relics, witnessing the demise of a civilization.*/
	get Notebook2_5():ILanguageElement{return this.getElement(2011)};
	/**Looks like the remains of some ancient creature.*/
	get Notebook2_6():ILanguageElement{return this.getElement(2012)};
	/**The ancient gladiator arena shines with the glory of warriors, but some holy swords are dim without their owners' inscriptions.*/
	get Notebook3_1():ILanguageElement{return this.getElement(2013)};
	/**Jack was a brave and fearless gladiator, flames raging on the battlefield of life and death.*/
	get Notebook3_2():ILanguageElement{return this.getElement(2014)};
	/**Leo excelled in strategy and tactics, possessing extraordinary wisdom as a strategist.*/
	get Notebook3_3():ILanguageElement{return this.getElement(2015)};
	/**Max rose from slavery with unwavering determination and resilience.*/
	get Notebook3_4():ILanguageElement{return this.getElement(2016)};
	/**Ann was renowned for her superb swordsmanship, a graceful and deadly sword dancer.*/
	get Notebook3_5():ILanguageElement{return this.getElement(2017)};
	/**Diary Fragment: Why do the shadow creatures look exactly like me?!*/
	get Notebook3_6():ILanguageElement{return this.getElement(2018)};
	/**Farm warning sign: Beware of hungry cats.*/
	get Notebook4_1():ILanguageElement{return this.getElement(2019)};
	/**Mysterious slab with ancient carvings.*/
	get Notebook4_2():ILanguageElement{return this.getElement(2020)};
	/**A common seashell on the beach, can hear the sound of waves.*/
	get Notebook4_3():ILanguageElement{return this.getElement(2021)};
	/**Warm campfire, where past campers used to gather.*/
	get Notebook4_4():ILanguageElement{return this.getElement(2022)};
	/**Crashed planes, stranded ships, ancient creatures extinct in volcanic eruptions... What's next?*/
	get Notebook4_5():ILanguageElement{return this.getElement(2023)};
	/**Why does my message in a bottle always drift back? Is there no way to escape?*/
	get Notebook4_6():ILanguageElement{return this.getElement(2024)};
	/**Strange mural on the rock wall: cave fish eating lobster bait.*/
	get Notebook5_1():ILanguageElement{return this.getElement(2025)};
	/**Help me find my hat, and I'll tell you where the treasure of the deep sea is hidden.*/
	get Notebook5_2():ILanguageElement{return this.getElement(2026)};
	/**Crashed plane with graffiti covered in blood: "Don't trust anyone."*/
	get Notebook5_3():ILanguageElement{return this.getElement(2027)};
	/**Shipwrecked Crew Diary: My hat has been stolen! I can't lose it...*/
	get Notebook5_4():ILanguageElement{return this.getElement(2028)};
	/**Signal tower on the snowy mountain, continuously emitting interference rays.*/
	get Notebook5_5():ILanguageElement{return this.getElement(2029)};
	/**A switch frozen by ice, cannot be used.*/
	get Notebook5_6():ILanguageElement{return this.getElement(2030)};
	/**A grave doll is peeking at you.*/
	get Notebook6_1():ILanguageElement{return this.getElement(2031)};
	/**Inscription on the tombstone: They say this is paradise, but all I see is death.*/
	get Notebook6_2():ILanguageElement{return this.getElement(2032)};
	/**Cursed tree, absorbing the energy of the volcano, seems to harbor something evil inside.*/
	get Notebook6_3():ILanguageElement{return this.getElement(2033)};
	/**Tree of death: Wither, decay, spread!*/
	get Notebook6_4():ILanguageElement{return this.getElement(2034)};
	/**Giant mirror, it seems to reflect another world.*/
	get Notebook6_5():ILanguageElement{return this.getElement(2035)};
	/**Cage, the Blood Moon imprisoned me here...*/
	get Notebook6_6():ILanguageElement{return this.getElement(2036)};
	/**{0} is full, can't pick up more*/
	get tips_show_8():ILanguageElement{return this.getElement(4000)};
	/**Blood Moon descends, monsters attack, beware!*/
	get day_tips1():ILanguageElement{return this.getElement(4001)};
	/**Blood Moon ends, brave campers start a new day!*/
	get day_tips2():ILanguageElement{return this.getElement(4002)};
	/**No one has lived in this hut yet.*/
	get hometips_01():ILanguageElement{return this.getElement(4003)};
	/**{0}'s Hut*/
	get hometips_02():ILanguageElement{return this.getElement(4004)};
	/**The backpack is already full.*/
	get tips_show_01():ILanguageElement{return this.getElement(4005)};
	/**Items have been placed and cannot be placed again.*/
	get tips_show_02():ILanguageElement{return this.getElement(4006)};
	/**null*/
	get tips_show_03():ILanguageElement{return this.getElement(4007)};
	/**null*/
	get tips_show_04():ILanguageElement{return this.getElement(4008)};
	/**null*/
	get tips_show_05():ILanguageElement{return this.getElement(4009)};
	/**null*/
	get tips_show_06():ILanguageElement{return this.getElement(4010)};
	/**Tree of Life, its fruit has healing effects (will produce the next fruit in {0})*/
	get tips_show_07():ILanguageElement{return this.getElement(4011)};
	/**Tree of Life, its fruit has healing effects (fruit limit reached, please pick up soon)*/
	get tips_show_08():ILanguageElement{return this.getElement(4012)};
	/**'s Hut*/
	get tips_show_09():ILanguageElement{return this.getElement(4013)};
	/**Survived {0} days*/
	get tips_show_10():ILanguageElement{return this.getElement(4014)};
	/**It's daytime now, {0} minutes until the shadow creatures attack at night. Please establish a safe area quickly.*/
	get tips_show_11():ILanguageElement{return this.getElement(4015)};
	/**Night falls, Blood Moon descends, return to the hut to avoid the shadow creatures' attack!*/
	get tips_show_12():ILanguageElement{return this.getElement(4016)};
	/**The ancient gladiator arena shines with the glory of warriors, but some holy swords are dim without their owners' inscriptions.*/
	get tips_show_101():ILanguageElement{return this.getElement(4017)};
	/**Jack was a brave and fearless gladiator, flames raging on the battlefield of life and death.*/
	get tips_show_102():ILanguageElement{return this.getElement(4018)};
	/**Leo excelled in strategy and tactics, possessing extraordinary wisdom as a strategist.*/
	get tips_show_103():ILanguageElement{return this.getElement(4019)};
	/**Max rose from slavery with unwavering determination and resilience.*/
	get tips_show_104():ILanguageElement{return this.getElement(4020)};
	/**Ann was renowned for her superb swordsmanship, a graceful and deadly sword dancer.*/
	get tips_show_105():ILanguageElement{return this.getElement(4021)};
	/**Sword of bravery, sharp blade with raging flames.*/
	get tips_show_106():ILanguageElement{return this.getElement(4022)};
	/**Sword of wisdom, exquisite handle with strategic brilliance.*/
	get tips_show_107():ILanguageElement{return this.getElement(4023)};
	/**Sword of resilience, solid and unyielding like a rock.*/
	get tips_show_108():ILanguageElement{return this.getElement(4024)};
	/**Sword of elegance, dazzling sword light like a shooting star.*/
	get tips_show_109():ILanguageElement{return this.getElement(4025)};
	/**Shining Holy Sword, forever engraved with the owner's name*/
	get tips_show_110():ILanguageElement{return this.getElement(4026)};
	/**null*/
	get tips_show_111():ILanguageElement{return this.getElement(4027)};
	/**null*/
	get tips_show_112():ILanguageElement{return this.getElement(4028)};
	/**null*/
	get tips_show_113():ILanguageElement{return this.getElement(4029)};
	/**null*/
	get tips_show_114():ILanguageElement{return this.getElement(4030)};
	/**null*/
	get tips_show_115():ILanguageElement{return this.getElement(4031)};
	/**null*/
	get tips_show_116():ILanguageElement{return this.getElement(4032)};
	/**null*/
	get tips_show_117():ILanguageElement{return this.getElement(4033)};
	/**null*/
	get tips_show_118():ILanguageElement{return this.getElement(4034)};
	/**null*/
	get tips_show_119():ILanguageElement{return this.getElement(4035)};
	/**null*/
	get tips_show_120():ILanguageElement{return this.getElement(4036)};
	/**null*/
	get tips_show_121():ILanguageElement{return this.getElement(4037)};
	/**null*/
	get tips_show_122():ILanguageElement{return this.getElement(4038)};
	/**null*/
	get tips_show_123():ILanguageElement{return this.getElement(4039)};
	/**Tree Fruit <size=26>(Eat to restore some HP)</size>*/
	get UI_item_01():ILanguageElement{return this.getElement(3001)};
	/**Spider Web <size=26>(DEF 10)</size>*/
	get UI_item_02():ILanguageElement{return this.getElement(3002)};
	/**Wooden Board <size=26>(DEF 100)</size>*/
	get UI_item_03():ILanguageElement{return this.getElement(3003)};
	/**Stone Board <size=26>(DEF 200)</size>*/
	get UI_item_04():ILanguageElement{return this.getElement(3004)};
	/**Iron Board <size=26>(DEF 400)</size>*/
	get UI_item_05():ILanguageElement{return this.getElement(3005)};
	/**Wooden Fence <size=26>(DEF 110)</size>*/
	get UI_item_06():ILanguageElement{return this.getElement(3006)};
	/**Stone Fence <size=26>(DEF 230)</size>*/
	get UI_item_07():ILanguageElement{return this.getElement(3007)};
	/**Iron Fence <size=26>(DEF 450)</size>*/
	get UI_item_08():ILanguageElement{return this.getElement(3008)};
	/**Cement Board <size=26>(DEF 500)</size>*/
	get UI_item_09():ILanguageElement{return this.getElement(3009)};
	/**Cement Pillar <size=26>(DEF 500)</size>*/
	get UI_item_10():ILanguageElement{return this.getElement(3010)};
	/**Wooden Door <size=26>(DEF 140)</size>*/
	get UI_item_11():ILanguageElement{return this.getElement(3011)};
	/**Stone Door <size=26>(DEF 260)</size>*/
	get UI_item_12():ILanguageElement{return this.getElement(3012)};
	/**Iron Door <size=26>(DEF 480)</size>*/
	get UI_item_13():ILanguageElement{return this.getElement(3013)};
	/**Tempered Glass Door <size=26>(DEF 500)</size>*/
	get UI_item_14():ILanguageElement{return this.getElement(3014)};
	/**Obsidian Door <size=26>(DEF 1000)</size>*/
	get UI_item_15():ILanguageElement{return this.getElement(3015)};
	/**Fabric Brick <size=26>(DEF 80)</size>*/
	get UI_item_1001():ILanguageElement{return this.getElement(3121)};
	/**Wooden Brick <size=26>(DEF 160)</size>*/
	get UI_item_1002():ILanguageElement{return this.getElement(3122)};
	/**Crystal Brick <size=26>(DEF 300)</size>*/
	get UI_item_1003():ILanguageElement{return this.getElement(3123)};
	/**Sand Brick <size=26>(DEF 60)</size>*/
	get UI_item_1004():ILanguageElement{return this.getElement(3124)};
	/**Mud Brick <size=26>(DEF 90)</size>*/
	get UI_item_1005():ILanguageElement{return this.getElement(3125)};
	/**Volcanic Rock Brick <size=26>(DEF 1200)</size>*/
	get UI_item_1006():ILanguageElement{return this.getElement(3126)};
	/**Coal Brick <size=26>(DEF 110)</size>*/
	get UI_item_1007():ILanguageElement{return this.getElement(3127)};
	/**Glass Brick <size=26>(DEF 510)</size>*/
	get UI_item_1008():ILanguageElement{return this.getElement(3128)};
	/**Stone Brick <size=26>(DEF 220)</size>*/
	get UI_item_1009():ILanguageElement{return this.getElement(3129)};
	/**Ore Brick <size=26>(DEF 260)</size>*/
	get UI_item_1010():ILanguageElement{return this.getElement(3130)};
	/**Grass Brick <size=26>(DEF 120)</size>*/
	get UI_item_1011():ILanguageElement{return this.getElement(3131)};
	/**Rusty Iron Brick <size=26>(DEF 450)</size>*/
	get UI_item_1012():ILanguageElement{return this.getElement(3132)};
	/**Copper Brick <size=26>(DEF 430)</size>*/
	get UI_item_1013():ILanguageElement{return this.getElement(3133)};
	/**Camera*/
	get UI_item_55():ILanguageElement{return this.getElement(3610)};
	/**Carpet <size=26>(DEF 150)</size>*/
	get UI_item_101():ILanguageElement{return this.getElement(10101)};
	/**Umbrella Stand <size=26>(DEF 150)</size>*/
	get UI_item_102():ILanguageElement{return this.getElement(10102)};
	/**Sofa <size=26>(DEF 150)</size>*/
	get UI_item_103():ILanguageElement{return this.getElement(10103)};
	/**Bedside Table <size=26>(DEF 150)</size>*/
	get UI_item_104():ILanguageElement{return this.getElement(10104)};
	/**Stool <size=26>(DEF 150)</size>*/
	get UI_item_105():ILanguageElement{return this.getElement(10105)};
	/**TV Stand <size=26>(DEF 150)</size>*/
	get UI_item_106():ILanguageElement{return this.getElement(10106)};
	/**Bed <size=26>(DEF 150)</size>*/
	get UI_item_107():ILanguageElement{return this.getElement(10107)};
	/**Table <size=26>(DEF 150)</size>*/
	get UI_item_108():ILanguageElement{return this.getElement(10108)};
	/**Chair <size=26>(DEF 150)</size>*/
	get UI_item_109():ILanguageElement{return this.getElement(10109)};
	/**Bookshelf <size=26>(DEF 150)</size>*/
	get UI_item_110():ILanguageElement{return this.getElement(10110)};
	/**TV <size=26>(DEF 150)</size>*/
	get UI_item_111():ILanguageElement{return this.getElement(10111)};
	/**Bathtub <size=26>(DEF 150)</size>*/
	get UI_item_112():ILanguageElement{return this.getElement(10112)};
	/**Bookcase <size=26>(DEF 150)</size>*/
	get UI_item_113():ILanguageElement{return this.getElement(10113)};
	/**Wardrobe <size=26>(DEF 150)</size>*/
	get UI_item_114():ILanguageElement{return this.getElement(10114)};
	/**Painting <size=26>(DEF 150)</size>*/
	get UI_item_115():ILanguageElement{return this.getElement(10115)};
	/**Frige <size=26>(DEF 150)</size>*/
	get UI_item_116():ILanguageElement{return this.getElement(10116)};
	/**TV Stand <size=26>(DEF 150)</size>*/
	get UI_item_117():ILanguageElement{return this.getElement(10117)};
	/**Clock <size=26>(DEF 150)</size>*/
	get UI_item_118():ILanguageElement{return this.getElement(10118)};
	/**Computer <size=26>(DEF 150)</size>*/
	get UI_item_119():ILanguageElement{return this.getElement(10119)};
	/**Washing Machine <size=26>(DEF 150)</size>*/
	get UI_item_120():ILanguageElement{return this.getElement(10120)};
	/**Computer Desk <size=26>(DEF 150)</size>*/
	get UI_item_121():ILanguageElement{return this.getElement(10121)};
	/**Computer Chair <size=26>(DEF 150)</size>*/
	get UI_item_122():ILanguageElement{return this.getElement(10122)};
	/**Sofa Table <size=26>(DEF 150)</size>*/
	get UI_item_123():ILanguageElement{return this.getElement(10123)};
	/**Bed <size=26>(DEF 150)</size>*/
	get UI_item_124():ILanguageElement{return this.getElement(10124)};
	/**Wine Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_125():ILanguageElement{return this.getElement(10125)};
	/**Wardrobe <size=26>(DEF 150)</size>*/
	get UI_item_126():ILanguageElement{return this.getElement(10126)};
	/**Table <size=26>(DEF 150)</size>*/
	get UI_item_127():ILanguageElement{return this.getElement(10127)};
	/**Sofa <size=26>(DEF 150)</size>*/
	get UI_item_128():ILanguageElement{return this.getElement(10128)};
	/**Chair <size=26>(DEF 150)</size>*/
	get UI_item_129():ILanguageElement{return this.getElement(10129)};
	/**Sink <size=26>(DEF 150)</size>*/
	get UI_item_130():ILanguageElement{return this.getElement(10130)};
	/**Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_131():ILanguageElement{return this.getElement(10131)};
	/**Table <size=26>(DEF 150)</size>*/
	get UI_item_132():ILanguageElement{return this.getElement(10132)};
	/**Wardrobe <size=26>(DEF 150)</size>*/
	get UI_item_133():ILanguageElement{return this.getElement(10133)};
	/**TV Stand <size=26>(DEF 150)</size>*/
	get UI_item_134():ILanguageElement{return this.getElement(10134)};
	/**Dining Table <size=26>(DEF 150)</size>*/
	get UI_item_135():ILanguageElement{return this.getElement(10135)};
	/**Dining Chair <size=26>(DEF 150)</size>*/
	get UI_item_136():ILanguageElement{return this.getElement(10136)};
	/**Bed <size=26>(DEF 150)</size>*/
	get UI_item_137():ILanguageElement{return this.getElement(10137)};
	/**Wine Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_138():ILanguageElement{return this.getElement(10138)};
	/**SC Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_139():ILanguageElement{return this.getElement(10139)};
	/**Bedside Table <size=26>(DEF 150)</size>*/
	get UI_item_140():ILanguageElement{return this.getElement(10140)};
	/**Violin <size=26>(DEF 150)</size>*/
	get UI_item_141():ILanguageElement{return this.getElement(10141)};
	/**Piano <size=26>(DEF 150)</size>*/
	get UI_item_142():ILanguageElement{return this.getElement(10142)};
	/**Sofa <size=26>(DEF 150)</size>*/
	get UI_item_143():ILanguageElement{return this.getElement(10143)};
	/**Carpet <size=26>(DEF 150)</size>*/
	get UI_item_144():ILanguageElement{return this.getElement(10144)};
	/**Chair <size=26>(DEF 150)</size>*/
	get UI_item_145():ILanguageElement{return this.getElement(10145)};
	/**Fish Tank <size=26>(DEF 150)</size>*/
	get UI_item_146():ILanguageElement{return this.getElement(10146)};
	/**Bookshelf <size=26>(DEF 150)</size>*/
	get UI_item_147():ILanguageElement{return this.getElement(10147)};
	/**Bed <size=26>(DEF 150)</size>*/
	get UI_item_148():ILanguageElement{return this.getElement(10148)};
	/**Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_149():ILanguageElement{return this.getElement(10149)};
	/**Table <size=26>(DEF 150)</size>*/
	get UI_item_150():ILanguageElement{return this.getElement(10150)};
	/**Stool <size=26>(DEF 150)</size>*/
	get UI_item_151():ILanguageElement{return this.getElement(10151)};
	/**TV Stand <size=26>(DEF 150)</size>*/
	get UI_item_152():ILanguageElement{return this.getElement(10152)};
	/**Solo Sofa <size=26>(DEF 150)</size>*/
	get UI_item_153():ILanguageElement{return this.getElement(10153)};
	/**Sofa <size=26>(DEF 150)</size>*/
	get UI_item_154():ILanguageElement{return this.getElement(10154)};
	/**Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_155():ILanguageElement{return this.getElement(10155)};
	/**Bookcase <size=26>(DEF 150)</size>*/
	get UI_item_156():ILanguageElement{return this.getElement(10156)};
	/**Chair <size=26>(DEF 150)</size>*/
	get UI_item_157():ILanguageElement{return this.getElement(10157)};
	/**Dining Table <size=26>(DEF 150)</size>*/
	get UI_item_158():ILanguageElement{return this.getElement(10158)};
	/**Easel <size=26>(DEF 150)</size>*/
	get UI_item_159():ILanguageElement{return this.getElement(10159)};
	/**Carpet <size=26>(DEF 150)</size>*/
	get UI_item_160():ILanguageElement{return this.getElement(10160)};
	/**Bed <size=26>(DEF 150)</size>*/
	get UI_item_161():ILanguageElement{return this.getElement(10161)};
	/**Wardrobe <size=26>(DEF 150)</size>*/
	get UI_item_162():ILanguageElement{return this.getElement(10162)};
	/**Carpet <size=26>(DEF 150)</size>*/
	get UI_item_163():ILanguageElement{return this.getElement(10163)};
	/**Desk <size=26>(DEF 150)</size>*/
	get UI_item_164():ILanguageElement{return this.getElement(10164)};
	/**Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_165():ILanguageElement{return this.getElement(10165)};
	/**Lazy Sofa <size=26>(DEF 150)</size>*/
	get UI_item_166():ILanguageElement{return this.getElement(10166)};
	/**Computer Chair <size=26>(DEF 150)</size>*/
	get UI_item_167():ILanguageElement{return this.getElement(10167)};
	/**TV Stand <size=26>(DEF 150)</size>*/
	get UI_item_168():ILanguageElement{return this.getElement(10168)};
	/**Computer Desk <size=26>(DEF 150)</size>*/
	get UI_item_169():ILanguageElement{return this.getElement(10169)};
	/**Countertop Cabinet <size=26>(DEF 150)</size>*/
	get UI_item_170():ILanguageElement{return this.getElement(10170)};
	/**Low Table <size=26>(DEF 150)</size>*/
	get UI_item_171():ILanguageElement{return this.getElement(10171)};
	/**Coffee Maker <size=26>(DEF 150)</size>*/
	get UI_item_172():ILanguageElement{return this.getElement(10172)};
	/**Chair <size=26>(DEF 150)</size>*/
	get UI_item_173():ILanguageElement{return this.getElement(10173)};
	/**Sofa <size=26>(DEF 150)</size>*/
	get UI_item_174():ILanguageElement{return this.getElement(10174)};
	/**Painting <size=26>(DEF 150)</size>*/
	get UI_item_175():ILanguageElement{return this.getElement(10175)};
	/**Central Camp*/
	get map_01():ILanguageElement{return this.getElement(5001)};
	/**Waterfall Cave*/
	get map_02():ILanguageElement{return this.getElement(5002)};
	/**Magma Volcano*/
	get map_03():ILanguageElement{return this.getElement(5003)};
	/**Snow Mountain*/
	get map_04():ILanguageElement{return this.getElement(5004)};
	/**Ethereal Graveyard*/
	get map_05():ILanguageElement{return this.getElement(5005)};
	/**Fallen Beach*/
	get map_06():ILanguageElement{return this.getElement(5006)};
	/**Pastoral Farm*/
	get map_07():ILanguageElement{return this.getElement(5007)};
	/**Boulder Canyon*/
	get map_08():ILanguageElement{return this.getElement(5008)};
	/**Ancient Arena*/
	get map_09():ILanguageElement{return this.getElement(5009)};
	/**Bonfire, BBQ, Warm Campsite*/
	get maptips_01():ILanguageElement{return this.getElement(5101)};
	/**Crystal Lake, where fish reside*/
	get maptips_02():ILanguageElement{return this.getElement(5102)};
	/**Pulsating Magic Stones, harboring evil*/
	get maptips_03():ILanguageElement{return this.getElement(5103)};
	/**Land of Extreme Cold, where everything freezes*/
	get maptips_04():ILanguageElement{return this.getElement(5104)};
	/**Curtain Call of Life, eternal in the mirror*/
	get maptips_05():ILanguageElement{return this.getElement(5105)};
	/**Sunken Ship, Crashed Plane, What's Next?*/
	get maptips_06():ILanguageElement{return this.getElement(5106)};
	/**Danger? Delicacy? Eyes Glaring*/
	get maptips_07():ILanguageElement{return this.getElement(5107)};
	/**Narrow Skyline*/
	get maptips_08():ILanguageElement{return this.getElement(5108)};
	/**The Place of Brave Souls*/
	get maptips_09():ILanguageElement{return this.getElement(5109)};
	/**Fishbone Key <size=26>(Go check the cave)</size>*/
	get UI_item_6001():ILanguageElement{return this.getElement(6001)};
	/**Cat Bowl*/
	get UI_item_6002():ILanguageElement{return this.getElement(6002)};
	/**Fish Bait Made of Deep-Sea Lobster <size=26>(Go check the cave)</size>*/
	get UI_item_6003():ILanguageElement{return this.getElement(6003)};
	/**Cave Fish <size=26>(It's starving on the farm)</size>*/
	get UI_item_6004():ILanguageElement{return this.getElement(6004)};
	/**Hat Lost by a Ghostly Sailor <size=26>(Check the ship)</size>*/
	get UI_item_6005():ILanguageElement{return this.getElement(6005)};
	/**Plaque: Jack, a Brave Gladiator, Flames of Battle <size=26>(Check the arena)</size>*/
	get UI_item_6006():ILanguageElement{return this.getElement(6006)};
	/**Plaque: Leo, Master of Strategy and Tactics <size=26>(Check the arena)</size>*/
	get UI_item_6007():ILanguageElement{return this.getElement(6007)};
	/**Plaque: Max, the Resilient Rise from Slavery <size=26>(Check the arena)</size>*/
	get UI_item_6008():ILanguageElement{return this.getElement(6008)};
	/**Plaque: Ann, Master of Swordplay, Graceful and Deadly <size=26>(Check the arena)</size>*/
	get UI_item_6009():ILanguageElement{return this.getElement(6009)};
	/**Burner No.1 <size=26>(Power source for the hot air balloon)</size>*/
	get UI_item_6010():ILanguageElement{return this.getElement(6010)};
	/**Burner No.2 <size=26>(Power source for the hot air balloon)</size>*/
	get UI_item_6011():ILanguageElement{return this.getElement(6011)};
	/**Burner No.3 <size=26>(Power source for the hot air balloon)</size>*/
	get UI_item_6012():ILanguageElement{return this.getElement(6012)};
	/**Burner No.4 <size=26>(Power source for the hot air balloon)</size>*/
	get UI_item_6013():ILanguageElement{return this.getElement(6013)};
	/**Today*/
	get LetterDay_01():ILanguageElement{return this.getElement(20001)};
	/**{0} days ago*/
	get LetterDay_02():ILanguageElement{return this.getElement(20002)};
	/**2094-04-01*/
	get mail_date():ILanguageElement{return this.getElement(20003)};
	/**Mysterious Man*/
	get mail_writter():ILanguageElement{return this.getElement(20004)};
	/**Beware of the Shadow Creatures!*/
	get mail_title():ILanguageElement{return this.getElement(20005)};
	/**Hey newcomer, see that wooden cabin? It's your only refuge now. 
Oh, and I have to warn you, beware of the shadow creatures! They come for you when the Blood Moon rises. 
Before that, explore the island, <color=#af0000ff>gather building materials and furniture, constantly improve your cabin, and fend off the shadow creatures' attacks.</color> 
Good luck!*/
	get mail_content():ILanguageElement{return this.getElement(20006)};
	/**Mysterious Man*/
	get mail_writter_02():ILanguageElement{return this.getElement(20007)};
	/**Power of Healing*/
	get mail_title_02():ILanguageElement{return this.getElement(20008)};
	/**What?! There's a <color=#af0000ff>giant tree stump</color> in the central camp? I can feel its healing power. <color=#af0000ff>Eating its fruit can restore your HP.</color> Good luck!*/
	get mail_content_02():ILanguageElement{return this.getElement(20009)};
	/**Mysterious Man*/
	get mail_writter_03():ILanguageElement{return this.getElement(20010)};
	/**Haunt Isle Map*/
	get mail_title_03():ILanguageElement{return this.getElement(20011)};
	/**I think you should have seen it now. Near the <color=#af0000ff>BBQ table in the central camp</color>, there's a <color=#af0000ff>map of Haunt Isle left by previous campers.</color> 
Good luck!*/
	get mail_content_03():ILanguageElement{return this.getElement(20012)};
	/**Shadow*/
	get mail_writter_04():ILanguageElement{return this.getElement(20013)};
	/**Tonight, I'll come again...*/
	get mail_title_04():ILanguageElement{return this.getElement(20014)};
	/**Blood Moon's call makes me <color=#af0000ff>stronger!</color> Tonight, I will come again.*/
	get mail_content_04():ILanguageElement{return this.getElement(20015)};
	/**Mysterious Man*/
	get mail_writter_05():ILanguageElement{return this.getElement(20016)};
	/**Please take some time to walk along the beach.*/
	get mail_title_05():ILanguageElement{return this.getElement(20017)};
	/**I found many containers on the <color=#af0000ff>beach</color>. There should be some <color=#af0000ff>furniture</color> you're looking for. 
Good luck!*/
	get mail_content_05():ILanguageElement{return this.getElement(20018)};
	/**Blood Moon*/
	get mail_writter_06():ILanguageElement{return this.getElement(20019)};
	/**Escape? Impossible*/
	get mail_title_06():ILanguageElement{return this.getElement(20020)};
	/**The hot air balloon at the foot of the <color=#af0000ff>snow mountain</color> has long been destroyed by me. 
Don't even think about escaping... 
Death is eternal... 
Why not stay here forever?*/
	get mail_content_06():ILanguageElement{return this.getElement(20021)};
	/**Grave Doll*/
	get mail_writter_07():ILanguageElement{return this.getElement(20022)};
	/**Oops, caught red-handed*/
	get mail_title_07():ILanguageElement{return this.getElement(20023)};
	/**Stop struggling, it won't forgive you. Hehe...hehehe*/
	get mail_content_07():ILanguageElement{return this.getElement(20024)};
	/**Shadow*/
	get mail_writter_08():ILanguageElement{return this.getElement(20025)};
	/**Your luck is running out*/
	get mail_title_08():ILanguageElement{return this.getElement(20026)};
	/**Almost, just almost! Damn it, these darn buildings are blocking my way, I'll smash them all!*/
	get mail_content_08():ILanguageElement{return this.getElement(20027)};
	/**Fisherman*/
	get mail_writter_09():ILanguageElement{return this.getElement(20028)};
	/**Fish! Fish! Fish!*/
	get mail_title_09():ILanguageElement{return this.getElement(20029)};
	/**Why do I fish day after day in the <color=#af0000ff>cave</color> and never catch anything??*/
	get mail_content_09():ILanguageElement{return this.getElement(20030)};
	/**Black Cat*/
	get mail_writter_10():ILanguageElement{return this.getElement(20031)};
	/**Meow?*/
	get mail_title_10():ILanguageElement{return this.getElement(20032)};
	/**Meow? Meow... Meow... <color=#af0000ff>Hungry</color>...*/
	get mail_content_10():ILanguageElement{return this.getElement(20033)};
	/**Ghost Sailor*/
	get mail_writter_11():ILanguageElement{return this.getElement(20034)};
	/**My hat is missing!*/
	get mail_title_11():ILanguageElement{return this.getElement(20035)};
	/**Someone stole my <color=#af0000ff>hat!</color> If you can help me find it, I'll show you treasures from the <color=#af0000ff>deep sea</color>.*/
	get mail_content_11():ILanguageElement{return this.getElement(20036)};
	/**Shadow*/
	get mail_writter_12():ILanguageElement{return this.getElement(20037)};
	/**Replace me, or be destroyed!*/
	get mail_title_12():ILanguageElement{return this.getElement(20038)};
	/**I know everything about you... your existence, your fears. 
Why should I just be your <color=#af0000ff>shadow?</color> 
Replace me, or be destroyed!*/
	get mail_content_12():ILanguageElement{return this.getElement(20039)};
	/**Mysterious Man*/
	get mail_writter_13():ILanguageElement{return this.getElement(20040)};
	/**"Delicacy" from the Deep Sea*/
	get mail_title_13():ILanguageElement{return this.getElement(20041)};
	/**Some time ago, the fisherman asked me to make a <color=#af0000ff>lobster ball</color> with deep-sea lobster meat. 
I placed it on the BBQ table in the <color=#af0000ff>central camp.</color> 
Strange, who would eat such fishy food these days?*/
	get mail_content_13():ILanguageElement{return this.getElement(20042)};
	/**Blood Moon*/
	get mail_writter_14():ILanguageElement{return this.getElement(20043)};
	/**The moon is the only one*/
	get mail_title_14():ILanguageElement{return this.getElement(20044)};
	/**Everyone is unique... and so is the moon. 
Become... the <color=#af0000ff>sole</color> moon in the entire sky. 
Dark creatures, respond to my call! 
My power is surging...*/
	get mail_content_14():ILanguageElement{return this.getElement(20045)};
	/**Building*/
	get Building_0001():ILanguageElement{return this.getElement(20101)};
	/**Furniture*/
	get Building_0002():ILanguageElement{return this.getElement(20102)};
	/**Build*/
	get Building_0003():ILanguageElement{return this.getElement(20103)};
	/**Continuous Build*/
	get Building_0004():ILanguageElement{return this.getElement(20104)};
	/**Backspace to return to the building selection page*/
	get Building_0005():ILanguageElement{return this.getElement(20105)};
	/**Esc to close the build page*/
	get Building_0006():ILanguageElement{return this.getElement(20106)};
	/**Build*/
	get Building_0007():ILanguageElement{return this.getElement(20107)};
	/**User id:{0}*/
	get CurrentUserId():ILanguageElement{return this.getElement(30001)};
	/**Switch home failed! */
	get JumpGameFailed():ILanguageElement{return this.getElement(30002)};
	/**Switch home*/
	get SwitchHomeBtn():ILanguageElement{return this.getElement(30003)};
	/**Switch to a designated home*/
	get JumpHomeText001():ILanguageElement{return this.getElement(30004)};
	/**Please enter the user id*/
	get JumpHomeText002():ILanguageElement{return this.getElement(30005)};
	/**Confirm*/
	get SwitchHomeConfirm():ILanguageElement{return this.getElement(30006)};

}