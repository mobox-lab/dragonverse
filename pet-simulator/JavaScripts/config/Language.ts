import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_C"],["","Key|ReadByName","MainLanguage","ChildLanguage"],[1,"Pet_Random_Name_1","Vance","Vance"],[2,"Pet_Random_Name_2","Judy","Judy"],[3,"Pet_Random_Name_3","Stan","Stan"],[4,"Pet_Random_Name_4","Prudent","Prudent"],[5,"Pet_Random_Name_5","Leigh","Leigh"],[6,"Pet_Random_Name_6","Ida","Ida"],[7,"Pet_Random_Name_7","Estra","Estra"],[8,"Pet_Random_Name_8","Sherard","Sherard"],[9,"Pet_Random_Name_9","Travers","Travers"],[10,"Pet_Random_Name_10","Mark","Mark"],[11,"Pet_Random_Name_11","Kingly","Kingly"],[12,"Pet_Random_Name_12","Dalton","Dalton"],[13,"Pet_Random_Name_13","Nicolette","Nicolette"],[14,"Pet_Random_Name_14","Meadow","Meadow"],[15,"Pet_Random_Name_15","Winston","Winston"],[16,"Pet_Random_Name_16","Kelsey","Kelsey"],[17,"Pet_Random_Name_17","Farrell","Farrell"],[18,"Pet_Random_Name_18","Wealthy","Wealthy"],[19,"Pet_Random_Name_19","Gifted","Gifted"],[20,"Pet_Random_Name_20","Kent","Kent"],[21,"Pet_Random_Name_21","Fresh","Fresh"],[22,"Pet_Random_Name_22","Des","Des"],[23,"Pet_Random_Name_23","Blueberry","Blueberry"],[24,"Pet_Random_Name_24","Nadia","Nadia"],[25,"Pet_Random_Name_25","Erwin","Erwin"],[26,"Pet_Random_Name_26","Jesse","Jesse"],[27,"Pet_Random_Name_27","Nightingale","Nightingale"],[28,"Pet_Random_Name_28","Deirdre","Deirdre"],[29,"Pet_Random_Name_29","Optimistic","Optimistic"],[30,"Pet_Random_Name_30","Donald","Donald"],[31,"Pet_Random_Name_31","Ardent","Ardent"],[32,"Pet_Random_Name_32","Esmond","Esmond"],[33,"Pet_Random_Name_33","Free","Free"],[34,"Pet_Random_Name_34","Daphne","Daphne"],[35,"Pet_Random_Name_35","Tara","Tara"],[36,"Pet_Random_Name_36","Winthrop","Winthrop"],[37,"Pet_Random_Name_37","Wanderer","Wanderer"],[38,"Pet_Random_Name_38","Francesca","Francesca"],[39,"Pet_Random_Name_39","Rhea","Rhea"],[40,"Pet_Random_Name_40","Harris","Harris"],[41,"Pet_Random_Name_41","Vigour","Vigour"],[42,"Pet_Random_Name_42","Wallace","Wallace"],[43,"Pet_Random_Name_43","Noblewoman","Noblewoman"],[44,"Pet_Random_Name_44","Trixie","Trixie"],[45,"Pet_Random_Name_45","Dennis","Dennis"],[46,"Pet_Random_Name_46","Delmar","Delmar"],[47,"Pet_Random_Name_47","Hamlin","Hamlin"],[48,"Pet_Random_Name_48","Power","Power"],[49,"Pet_Random_Name_49","Wendy","Wendy"],[50,"Pet_Random_Name_50","Salt","Salt"],[51,"Pet_Random_Name_51","Elton","Elton"],[52,"Pet_Random_Name_52","Kyla","Kyla"],[53,"Pet_Random_Name_53","Seeds","Seeds"],[54,"Pet_Random_Name_54","Delight","Delight"],[55,"Pet_Random_Name_55","Vivianne","Vivianne"],[56,"Pet_Random_Name_56","Linette","Linette"],[57,"Pet_Random_Name_57","Peaceful","Peaceful"],[58,"Pet_Random_Name_58","Prosperous","Prosperous"],[59,"Pet_Random_Name_59","Maxine","Maxine"],[60,"Pet_Random_Name_60","Rhoda","Rhoda"],[61,"Pet_Random_Name_61","Elias","Elias"],[62,"Pet_Random_Name_62","Nessia","Nessia"],[63,"Pet_Random_Name_63","Paxton","Paxton"],[64,"Pet_Random_Name_64","Peggy","Peggy"],[65,"Pet_Random_Name_65","Jemima","Jemima"],[66,"Pet_Random_Name_66","Julia","Julia"],[67,"Pet_Random_Name_67","Warren","Warren"],[68,"Pet_Random_Name_68","Rosa","Rosa"],[69,"Pet_Random_Name_69","Foster","Foster"],[70,"Pet_Random_Name_70","Konrad","Konrad"],[71,"Pet_Random_Name_71","Germaine","Germaine"],[72,"Pet_Random_Name_72","Tilda","Tilda"],[73,"Pet_Random_Name_73","John","John"],[74,"Pet_Random_Name_74","Laurel","Laurel"],[75,"Pet_Random_Name_75","Vincent","Vincent"],[76,"Pet_Random_Name_76","Spirited","Spirited"],[77,"Pet_Random_Name_77","Ambitious","Ambitious"],[78,"Pet_Random_Name_78","White","White"],[79,"Pet_Random_Name_79","Everett","Everett"],[80,"Pet_Random_Name_80","Falkner","Falkner"],[81,"Pet_Random_Name_81","Priscilla","Priscilla"],[82,"Pet_Random_Name_82","Wise","Wise"],[83,"Pet_Random_Name_83","Martin","Martin"],[84,"Pet_Random_Name_84","Hadwin","Hadwin"],[85,"Pet_Random_Name_85","Trustworthy","Trustworthy"],[86,"Pet_Random_Name_86","Beloved","Beloved"],[87,"Pet_Random_Name_87","Abigail","Abigail"],[88,"Pet_Random_Name_88","Zera","Zera"],[89,"Pet_Random_Name_89","Rex","Rex"],[90,"Pet_Random_Name_90","Wenda","Wenda"],[91,"Pet_Random_Name_91","Mercy","Mercy"],[92,"Pet_Random_Name_92","Dwayne","Dwayne"],[93,"Pet_Random_Name_93","Kirsten","Kirsten"],[94,"Pet_Random_Name_94","Kayla","Kayla"],[95,"Pet_Random_Name_95","Leo","Leo"],[96,"Pet_Random_Name_96","Willis","Willis"],[97,"Pet_Random_Name_97","Amiable","Amiable"],[98,"Pet_Random_Name_98","Jewel","Jewel"],[99,"Pet_Random_Name_99","Hartley","Hartley"],[100,"Pet_Random_Name_100","Eliza","Eliza"],[101,"Pet_Random_Name_101","Noelle","Noelle"],[102,"Pet_Random_Name_102","David","David"],[103,"Pet_Random_Name_103","Truman","Truman"],[104,"Pet_Random_Name_104","Nora","Nora"],[105,"Pet_Random_Name_105","Belle","Belle"],[106,"Pet_Random_Name_106","Ann","Ann"],[107,"Pet_Random_Name_107","Ian","Ian"],[108,"Pet_Random_Name_108","Fiona","Fiona"],[109,"Pet_Random_Name_109","Sparrow","Sparrow"],[110,"Pet_Random_Name_110","Blythe","Blythe"],[111,"Pet_Random_Name_111","Ivan","Ivan"],[112,"Pet_Random_Name_112","Irene","Irene"],[113,"Pet_Random_Name_113","Georgiana","Georgiana"],[114,"Pet_Random_Name_114","Lucille","Lucille"],[115,"Pet_Random_Name_115","Felicia","Felicia"],[116,"Pet_Random_Name_116","Nancy","Nancy"],[117,"Pet_Random_Name_117","Darian","Darian"],[118,"Pet_Random_Name_118","Firm","Firm"],[119,"Pet_Random_Name_119","Margot","Margot"],[120,"Pet_Random_Name_120","Eileen","Eileen"],[121,"Pet_Random_Name_121","Magda","Magda"],[122,"Pet_Random_Name_122","Sandra","Sandra"],[123,"Pet_Random_Name_123","Britney","Britney"],[124,"Pet_Random_Name_124","Peaceful","Peaceful"],[125,"Pet_Random_Name_125","Vaughan","Vaughan"],[126,"Pet_Random_Name_126","Garrick","Garrick"],[127,"Pet_Random_Name_127","Elliott","Elliott"],[128,"Pet_Random_Name_128","Glenn","Glenn"],[129,"Pet_Random_Name_129","Leith","Leith"],[130,"Pet_Random_Name_130","Trina","Trina"],[131,"Pet_Random_Name_131","Dixon","Dixon"],[132,"Pet_Random_Name_132","Silvery","Silvery"],[133,"Pet_Random_Name_133","Swift","Swift"],[134,"Pet_Random_Name_134","Oscar","Oscar"],[135,"Pet_Random_Name_135","Kirby","Kirby"],[136,"Pet_Random_Name_136","Princess","Princess"],[137,"Pet_Random_Name_137","Strawberry","Strawberry"],[138,"Pet_Random_Name_138","Rich","Rich"],[139,"Pet_Random_Name_139","Faithful","Faithful"],[140,"Pet_Random_Name_140","Nigel","Nigel"],[141,"Pet_Random_Name_141","Ernest","Ernest"],[142,"Pet_Random_Name_142","Robin","Robin"],[143,"Pet_Random_Name_143","Mountain","Mountain"],[144,"Pet_Random_Name_144","Fedora","Fedora"],[145,"Pet_Random_Name_145","Philip","Philip"],[146,"Pet_Random_Name_146","Uriah","Uriah"],[147,"Pet_Random_Name_147","Rebellious","Rebellious"],[148,"Pet_Random_Name_148","Vandal","Vandal"],[149,"Pet_Random_Name_149","Ursa","Ursa"],[150,"Pet_Random_Name_150","Dirk","Dirk"],[151,"Pet_Random_Name_151","Shannon","Shannon"],[152,"Pet_Random_Name_152","Penelope","Penelope"],[153,"Pet_Random_Name_153","Primavera","Primavera"],[154,"Pet_Random_Name_154","Toby","Toby"],[155,"Pet_Random_Name_155","Grant","Grant"],[156,"Pet_Random_Name_156","Roxanne","Roxanne"],[157,"Pet_Random_Name_157","Grateful","Grateful"],[158,"Pet_Random_Name_158","Lucinda","Lucinda"],[159,"Pet_Random_Name_159","Justin","Justin"],[160,"Pet_Random_Name_160","Tess","Tess"],[161,"Pet_Random_Name_161","Stacy","Stacy"],[162,"Pet_Random_Name_162","Exalted","Exalted"],[163,"Pet_Random_Name_163","Ethen","Ethen"],[164,"Pet_Random_Name_164","Flora","Flora"],[165,"Pet_Random_Name_165","Questa","Questa"],[166,"Pet_Random_Name_166","Spencer","Spencer"],[167,"Pet_Random_Name_167","Lucas","Lucas"],[168,"Pet_Random_Name_168","Virtuous","Virtuous"],[169,"Pet_Random_Name_169","Gregory","Gregory"],[170,"Pet_Random_Name_170","Harland","Harland"],[171,"Pet_Random_Name_171","April","April"],[172,"Pet_Random_Name_172","Orson","Orson"],[173,"Pet_Random_Name_173","Bound","Bound"],[174,"Pet_Random_Name_174","Adrienne","Adrienne"],[175,"Pet_Random_Name_175","Julie","Julie"],[176,"Pet_Random_Name_176","Counsellor","Counsellor"],[177,"Pet_Random_Name_177","Primrose","Primrose"],[178,"Pet_Random_Name_178","Hunter","Hunter"],[179,"Pet_Random_Name_179","One","One"],[180,"Pet_Random_Name_180","Rejoicing","Rejoicing"],[181,"Pet_Random_Name_181","Joan","Joan"],[182,"Pet_Random_Name_182","Wolf","Wolf"],[183,"Pet_Random_Name_183","Max","Max"],[184,"Pet_Random_Name_184","Honour","Honour"],[185,"Pet_Random_Name_185","Orva","Orva"],[186,"Pet_Random_Name_186","Drew","Drew"],[187,"Pet_Random_Name_187","Ivy","Ivy"],[188,"Pet_Random_Name_188","Lewis","Lewis"],[189,"Pet_Random_Name_189","Shawn","Shawn"],[190,"Pet_Random_Name_190","Sea","Sea"],[191,"Pet_Random_Name_191","Fiery","Fiery"],[192,"Pet_Random_Name_192","Dark","Dark"],[193,"Pet_Random_Name_193","United","United"],[194,"Pet_Random_Name_194","Thomasina","Thomasina"],[195,"Pet_Random_Name_195","Falcon","Falcon"],[196,"Pet_Random_Name_196","Imogene","Imogene"],[197,"Pet_Random_Name_197","Bella","Bella"],[198,"Pet_Random_Name_198","Kane","Kane"],[199,"Pet_Random_Name_199","Fiery","Fiery"],[200,"Pet_Random_Name_200","Norseman","Norseman"],[201,"PetARR_petName_1","Dog","小狗"],[202,"PetARR_petName_2","Cat","小猫"],[203,"PetARR_petName_3","Pink Bunny","粉兔"],[204,"PetARR_petName_4","Red-eared Bunny","红耳兔"],[205,"PetARR_petName_5","Orange Dog","小橘犬"],[206,"PetARR_petName_6","Calf","小牛"],[207,"PetARR_petName_7","Piggy","小猪"],[208,"PetARR_petName_8","Chick","小鸡"],[209,"PetARR_petName_9","Yellow Chicken","黄鸡"],[210,"PetARR_petName_10","Pink Dog","粉红小狗"],[211,"PetARR_petName_11","Lamb","小羊"],[212,"PetARR_petName_12","Squirrel","松鼠"],[213,"PetARR_petName_13","Brown Bear","棕熊"],[214,"PetARR_petName_14","White Bear","白熊"],[215,"PetARR_petName_15","Bat","蝙蝠"],[216,"PetARR_petName_16","Deer","小鹿"],[217,"PetARR_petName_17","Fox","小狐狸"],[218,"PetARR_petName_18","Elk","麋鹿"],[219,"PetARR_petName_19","Pink Fox","粉狐狸"],[220,"PetARR_petName_20","Pink Cat","粉红小猫"],[221,"PetARR_petName_21","Snow Dog","雪狗"],[222,"PetARR_petName_22","Snow Cat","雪猫"],[223,"PetARR_petName_23","Snow Lamb","雪羊"],[224,"PetARR_petName_24","Black & White Bear","黑白熊"],[225,"PetARR_petName_25","Blue Crystal Squirrel","蓝晶松鼠"],[226,"PetARR_petName_26","Squirrel","小松鼠"],[227,"PetARR_petName_27","Snow Chicken","雪鸡"],[228,"PetARR_petName_28","Snow Bull","雪牛"],[229,"PetARR_petName_29","Golden Bull","黄金牛"],[230,"PetARR_petName_30","Emerald Lamb","绿宝石羊"],[231,"PetARR_petName_31","Ice Crystal Bat","冰晶蝙蝠"],[232,"PetARR_petName_32","Night Bat","黑夜蝙蝠"],[233,"PetARR_petName_33","Ice Crystal Fox","冰晶狐狸"],[234,"PetARR_petName_34","Ice Crystal Deer","冰晶鹿"],[235,"PetARR_petName_35","Golden Pig","黄金猪"],[236,"PetARR_petName_36","Blue Crystal Bat","蓝晶蝙蝠"],[237,"PetARR_petName_37","Grass Pig","小草猪"],[238,"PetARR_petName_38","Pink Bull","粉牛"],[239,"PetARR_petName_39","Blue Cat","蓝猫"],[240,"PetARR_petName_40","Snow Pig","雪猪"],[241,"PetARR_petName_41","Golden Chicken","黄金鸡"],[242,"PetARR_petName_42","Pink Bunny","粉红兔子"],[243,"PetARR_petName_43","Snow Bunny","雪兔"],[244,"PetARR_petName_44","Orange Lamb","小橘羊"],[245,"PetARR_petName_45","Snow Squirrel","雪松鼠"],[246,"PetARR_petName_46","Emerald Fox","绿宝石狐"],[247,"PetARR_petName_47","Emerald Bear","绿宝石熊"],[248,"PetARR_petName_48","Blue Crystal Deer","蓝晶鹿"],[249,"PetARR_Quality_1","Common","普通"],[250,"PetARR_Quality_2","Rare","稀有"],[251,"PetARR_Quality_3","Epic","史诗"],[252,"PetARR_Quality_4","Legendary","传说"],[253,"PetARR_Special_1","Heart","爱心化"],[254,"PetARR_Special_2","Rainbow","彩虹化"],[255,"AreaDivide_Name_1","Shop","商店"],[256,"AreaDivide_Name_2","Town","城镇"],[257,"AreaDivide_Name_3","Forest","森林"],[258,"AreaDivide_Name_4","Beach","海滩"],[259,"AreaDivide_Name_5","Quarry","石矿"],[260,"AreaDivide_Name_6","Snowfield","雪地"],[261,"AreaDivide_Name_7","Glacier","冰川"],[262,"AreaDivide_Name_8","Seabed","海底"],[263,"AreaDivide_Name_9","Desert","沙漠"],[264,"AreaDivide_Name_10","Tent","帐篷"],[265,"AreaDivide_Name_11","Secret Base","秘密基地"],[266,"AreaWorld_textUI_1","Initial Land","初始大陆"],[267,"Tips_gift_1","Obtained coins ×{0}!","获得金币×{0}!"],[268,"Tips_gift_2","Obtained diamonds x{0}!","获得钻石×{0}!"],[269,"Tips_gift_3","Obtained special pet!","获得特殊宠物!"],[270,"Info_pet_1","Own {0} pets.","拥有{0}/{1}个宠物"],[271,"Info_gift_1","{0}/12 collected","领取进度{0}/12"],[272,"PetARR_petName_49","Poinko Chicken","只因哥"],[273,"PetARR_petName_50","Tiger","小老虎"],[274,"PetARR_petName_51","Octopus","小章鱼"],[275,"Dev_TextBlock_Intro_1","Make this pet a Heart Pet!","让这只宠物充满爱心!"],[276,"Dev_TextBlock_Intro_2","Make this pet a Rainbow Pet!","让这只宠物充满彩虹!"],[277,"Dev_TextBlock_Explain_1","Select a pet you want to turn Heart Pet!","选择一只宠物使它充满爱心!"],[278,"Dev_TextBlock_Explain_2","Select a pet you want to turn Rainbow Pet!","选择一只宠物使它充满彩虹!"],[279,"Text_Fuse_UI_1","Fuse {0}/12 pets","融合{0}/12只宠物"],[280,"Text_Fuse_UI_2","Fuse these pets?","确认融合宠物？"],[281,"Text_Fuse_UI_3","You need more diamonds!","钻石不足!"],[282,"Buff_buffname_1","Congratulations! You obtained x3 Attack Potion!","恭喜获得三倍攻击药水"],[283,"Buff_buffname_2","Congratulations! You obtained x3 Reward Potion!","恭喜获得三倍奖励药水"],[284,"Buff_buffname_3","Congratulations! You obtained Pet Hatching Lucky Potion!","恭喜获得宠物孵化幸运药水"],[285,"Buff_buffname_4","Congratulations! You obtained Pet Hatching Super Lucky Potion!","恭喜获得宠物孵化超级幸运药水"],[286,"Text_tips_1","Purchase successful!","购买成功"],[287,"Text_messagebox_1","Spend {0} diamonds to unlock?","是否花费{0}钻石来解锁？"],[288,"Text_tips_3","You don't have enough diamonds!","钻石不足!"],[289,"Text_messagebox_2","Teleport to the Gacha Area?","是否传送到扭蛋区"],[290,"Text_messagebox_3","Spend {0} coins to purchase?","是否花费{0}金币购买"],[291,"Text_tips_4","You don't have enough coins!","金币不足"],[292,"Text_messagebox_4","Pet Backpack is full.","宠物背包已满，可以通过背包删除"],[293,"Text_ItemUI_1","Obtained","已获得"],[294,"Text_ItemUI_2","Redeem!","可领取!"],[295,"Text_tips_5","Note: The gift has been redeemed.","注意:礼包已被领取"],[296,"Text_tips_6","It's not time yet!","时间还没到哦~"],[297,"button_1","Remove","卸载"],[298,"button_2","Equip","装备"],[299,"Page_UI_Tips_1","Equipment Pets Maximum: {0} ","可以同时装备{0}个宠物"],[300,"Page_UI_Tips_2","Your chance is {0}%, spend {1} diamonds to fuse?","你的概率是{0}%，是否花费{1}钻石进行合成？"],[301,"Text_messagebox_5","Successful!","合成成功"],[302,"Text_messagebox_6","Failed.","合成失败"],[303,"Page_UI_Tips_3","{0} pets","{0}只宠物"],[304,"Page_UI_Tips_4","Level {0}","等级{0}"],[305,"button_3","Tradable","可交易"],[306,"button_4","Untradable","不可交易"],[307,"button_5","Cooling","冷却中"],[308,"button_6","Trading","交易中"],[309,"button_7","Creating trade...","开启交易中"],[310,"button_8","Closing trade...","关闭交易中"],[311,"User_pet","{0} 's pets","{0}的宠物"],[312,"button_9","Preparing","准备中"],[313,"button_10","Ready!","准备!"],[314,"Text_messagebox_7","Player {0} sent a trade request.","玩家{0}请求与你交易"],[315,"Text_messagebox_8","Trade completed.","交易完成"],[316,"Text_messagebox_9","Cancel the trade?","是否取消交易"],[317,"Text_messagebox_10","Confirm the trade?","是否确认交易"],[318,"button_11","Confirm","确认"],[319,"button_12","Yes","是"],[320,"button_13","No","否"],[321,"Page_UI_Tips_5","Confirm the trade after {0} s.","{0}s后确认交易"],[322,"Text_messagebox_11","Cannot delete, keep at least one pet.","不能删除,至少保留一个宠物"],[323,"Text_messagebox_12","You cannot equip more pets!","宠物跟随已满，无法装备"],[324,"Text_messagebox_13","Are you sure to delete?","确定要删除吗？"],[325,"Text_messagebox_14","Traded {0} pets, and {1} diamonds, with {2} players.","交易了{0}个宠物 和 {1} 钻石 与{2}玩家"],[326,"button_14","Confirming","确认中"],[327,"Text_messagebox_15","Request sent, waiting for response...","发送请求成功,等待对方回应"],[328,"Text_messagebox_16","Failed to send request, the player is busy.","发送请求失败,对方正忙"],[329,"Text_messagebox_17","Player {0} rejected your trade request.","玩家{0}拒绝交易请求"],[330,"Text_messagebox_18","Player {0} canceled the trade.","玩家{0} 取消了交易"],[331,"PetARR_petName_52","Goldfish","小金鱼"],[332,"PetARR_petName_53","Monkey","小猴子"],[333,"PetARR_petName_54","Parrot","小鹦鹉"],[334,"PetARR_petName_55","Turtle","小乌龟"],[335,"PetARR_petName_56","Shark","小鲨鱼"],[336,"PetARR_petName_57","Walrus","小海象"],[337,"PetARR_petName_58","White Tiger","白虎"],[338,"PetARR_petName_59","Red Goldfish","红金鱼"],[339,"PetARR_petName_60","Penguin","小企鹅"],[340,"PetARR_petName_61","Snowman","小雪人"],[341,"PetARR_petName_62","White Ape","白猿"],[342,"PetARR_petName_63","Razor Turtle","剃刀龟"],[343,"PetARR_petName_64","Blue Snowman","蓝雪人"],[344,"PetARR_petName_65","Killer Whale","救生鲨"],[345,"PetARR_petName_66","Blue Octopus","蓝章鱼"],[346,"PetARR_petName_67","Blue Penguin","蓝企鹅"],[347,"PetARR_petName_68","Motley King Kong","五彩金刚"],[348,"PetARR_petName_69","Seal","海豹"],[349,"Text_messagebox_19","Already rated.","已经评价过了"],[350,"Page_UI_Tips_6","Pick an initial pet!","选一只初始宠物吧!"],[351,"button_15","Yes!","确定!"],[352,"Text_messagebox_20","Close the trade?","确认关闭交易吗?"],[353,"Page_Title_1","Fuse pets!","融合宠物!"],[354,"button_16","Fuse!","融合!"],[355,"Page_UI_Tips_7","Get free gifts for playing!","玩游戏获得免费礼包"],[356,"Page_UI_Tips_8","The gift contains Super Powerful Pet!","礼包包含超强力宠物!"],[357,"Page_Title_2","Free Gifts!","免费礼包!"],[358,"Text_ItemUI_3","Get pets!","获取宠物!"],[359,"Page_Title_3","Upgrade!","升级!"],[360,"Page_UI_Tips_9","You will lose all pets chosen for fusion!","你会失去所有的选择合成的宠物!"],[361,"Page_Title_4","Coin Absorption Range","金币吸收范围"],[362,"Page_Title_5","Get More Diamonds","获得更多钻石"],[363,"Page_Title_6","Pet Attack Power","宠物攻击力量"],[364,"Page_Title_7","Pet Attack Speed","宠物攻击速度"],[365,"Page_Title_8","Pet Backpack Storage","背包宠物存储量"],[366,"Page_Title_9","Your Pets!","你的宠物!"],[367,"Page_Title_10","Collect pets!","收集宠物!"],[368,"Page_UI_Tips_10","Level Upgrade, Equipment Pet Maximum +1.","等级提升装备宠物上限+1"],[369,"Page_UI_Tips_11","{0} owned","{0}拥有"],[370,"Page_UI_Tips_12","Name your pet!","为你的宠物起个昵称吧!"],[371,"Page_Title_11","Trading History!","交易历史!"],[372,"button_17","Return","返回"],[373,"button_18","Send","发送"],[374,"Page_Title_12","Trading Center!","交易中心!"],[375,"button_19","Trading History","交易历史"],[376,"Page_Title_13","Confirm the content for trade and tap Ready.","确定好交易内容后点击准备按钮"],[377,"Page_Title_14","Get close and tap the button to unlock.","靠近后点击按钮解锁"],[378,"Text_messagebox_21","You will not get any items in this trade, confirm?","你在本次交易中不会获得任何物品，确认交易吗"],[379,"Text_messagebox_22","You did not give any items in this trade, confirm?","你在本次交易中没有给予任何物品，确认交易吗"],[380,"Text_messagebox_23","Please make sure this trade is fair.","请确保这次交易是公平的"],[381,"Text_ItemUI_4","x3 Reward","三倍奖励"],[382,"Text_ItemUI_5","x3 Attack","三倍攻击"],[383,"Text_ItemUI_6","Lucky","幸运"],[384,"Text_ItemUI_7","Super Lucky","超级幸运"],[385,"Text_tips_7","There are currently no pets fighting, tap on coin piles to fight!","当前没有宠物在战斗，点击金币堆出战!"],[386,"PetARR_petName_70","Little Yellow Turtle","小黄龟"],[387,"PetARR_petName_71","Pink Penguin","粉企鹅"],[388,"PetARR_petName_72","Yellow Octopus","黄章鱼"],[389,"PetARR_petName_73","Pink Octopus","粉章鱼"],[390,"PetARR_petName_74","Dark Green Walrus","墨绿海象"],[391,"PetARR_petName_75","Orange Tiger","橙老虎"],[392,"PetARR_petName_76","Melting Snowman","融化雪人"],[393,"PetARR_petName_77","Purple Snowman","紫色雪人"],[394,"Text_messagebox_24","Make sure you have at least 1 pet in your backpack.","确保背包中至少有一只宠物"],[395,"Page_UI_Tips_13","Select more than 3 pets to fuse.","选择3只以上的宠物进行融合"],[396,"Text_Trade_1","Unready","取消准备"],[397,"Text_Trade_2","Unconfirm","取消确认"],[398,"Text_tips_8","New pet egg has unlocked! Go check it out!","有全新的宠物蛋解锁了!快去看看吧~"],[399,"PetARR_Quality_5","Mythical","神话"],[400,"Enchants_Name_1","Coin I","金币Ⅰ"],[401,"Enchants_Name_2","Fantasy Coin I","幻想币Ⅰ"],[402,"Enchants_Name_3","Techno Coin I","科技币Ⅰ"],[403,"Enchants_Name_4","Teamwork","团队合作"],[404,"Enchants_Name_5","Super Teamwork","超级团队合作"],[405,"Enchants_Name_6","Charm","魅力"],[406,"Enchants_Name_7","Power I","力量Ⅰ"],[407,"Enchants_Name_8","Agility I","敏捷Ⅰ"],[408,"Enchants_Name_9","Diamond I","钻石Ⅰ"],[409,"Enchants_Name_10","Chest Destroyer I","宝箱破坏者Ⅰ"],[410,"Enchants_Name_11","Gift I","礼物Ⅰ"],[411,"Enchants_Name_12","Crazy Multiplier I","疯狂乘数Ⅰ"],[412,"Enchants_Name_13","Royalty","王权"],[413,"Enchants_Name_14","Magnet","磁铁"],[414,"Enchants_Name_15","Glitters","闪闪发光"],[415,"Enchants_Describe_1","Pet earns {0}% extra coins.","宠物赚{0}%额外普通金币"],[416,"Enchants_Describe_2","Pet earns {0}% extra fantasy coins.","宠物赚{0}%额外幻想金币"],[417,"Enchants_Describe_3","Pet earns {0}% extra techno coins.","宠物赚{0}%额外科技币"],[418,"Enchants_Describe_4","Pet deals more damage with this pet (stacked).","宠物与这只宠物一起造成更多的伤害（叠加）"],[419,"Enchants_Describe_5","Pet deals super much damage with this pet (stacked).","宠物与这只宠物一起造成超级多的伤害（叠加）"],[420,"Enchants_Describe_6","Higher crit rate.","你更容易暴击"],[421,"Enchants_Describe_7","Pet deals {0}% more damage.","宠物造成{0}%额外伤害"],[422,"Enchants_Describe_8","Pet increases {0}% speed.","宠物移动增加{0}%额外速度"],[423,"Enchants_Describe_9","Pet earns {0}% extra diamonds.","宠物赚取{0}%额外钻石"],[424,"Enchants_Describe_10","Pet deals {0}% more damage to chests.","宠物对宝箱造成{0}%额外伤害"],[425,"Enchants_Describe_11","Gift earnings increase {0}% when destroyed by this pet.","被此宠物破坏的礼物收益多{0}%"],[426,"Enchants_Describe_12","Pet earns {0}% extra coins when it destroys Super Coins.","宠物打破超级金币中赚{0}%额外金币"],[427,"Enchants_Describe_13","Pet +100% damage, +100% diamond, +50% movement speed.","宠物+100%伤害，+100%钻石，+50%移速"],[428,"Enchants_Describe_14","Pet collects coins and diamonds for you.","宠物可以为你收集金币钻石"],[429,"Enchants_Describe_15","Pet generates diamonds randomly.","宠物随机生成钻石"],[430,"Text_ItemUI_8","All Redeemed","全部已领取"],[431,"Achievement_Grade_1","Easy","容易"],[432,"Achievement_Grade_2","Simple","简单"],[433,"Achievement_Grade_3","Average","中等"],[434,"Achievement_Grade_4","Hard","困难"],[435,"Achievement_Grade_5","Crazy","疯狂"],[436,"Achievement_Name_1","Egg Hatcher","孵蛋师"],[437,"Achievement_Name_2","Egg Hatcher II","孵蛋师Ⅱ"],[438,"Achievement_Name_3","Egg Hatcher III","孵蛋师Ⅲ"],[439,"Achievement_Name_4","Hatching Expert","孵蛋专家"],[440,"Achievement_Name_5","Hatching Expert II","孵蛋专家Ⅱ"],[441,"Achievement_Name_6","Hatching Expert III","孵蛋专家Ⅲ"],[442,"Achievement_Name_7","Hatching Elite","孵蛋精英"],[443,"Achievement_Name_8","Hatching Elite II","孵蛋精英Ⅱ"],[444,"Achievement_Name_9","Hatching Elite II","孵蛋精英Ⅲ"],[445,"Achievement_Name_10","Hatching Champion","孵蛋冠军"],[446,"Achievement_Name_11","Hatching Champion II","孵蛋冠军Ⅱ"],[447,"Achievement_Name_12","Hatching Champion III","孵蛋冠军Ⅲ"],[448,"Achievement_Name_13","Hatching Legend","孵蛋传奇"],[449,"Achievement_Name_14","Hatching Legend II","孵蛋传奇Ⅱ"],[450,"Achievement_Name_15","Hatching Legend III","孵蛋传奇Ⅲ"],[451,"Achievement_Name_16","Coin Collector","硬币收藏家"],[452,"Achievement_Name_17","Coin Collector II","硬币收藏家Ⅱ"],[453,"Achievement_Name_18","Coin Collector III","硬币收藏家Ⅲ"],[454,"Achievement_Name_19","Coin Expert","硬币专家"],[455,"Achievement_Name_20","Coin Expert II","硬币专家Ⅱ"],[456,"Achievement_Name_21","Coin Expert III","硬币专家Ⅲ"],[457,"Achievement_Name_22","Coin Elite","硬币精英"],[458,"Achievement_Name_23","Coin Elite II","硬币精英Ⅱ"],[459,"Achievement_Name_24","Coin Elite III","硬币精英Ⅲ"],[460,"Achievement_Name_25","Coin Champion","硬币冠军"],[461,"Achievement_Name_26","Coin Champion II","硬币冠军Ⅱ"],[462,"Achievement_Name_27","Coin Champion III","硬币冠军Ⅲ"],[463,"Achievement_Name_28","Coin Legend","硬币传奇"],[464,"Achievement_Name_29","Coin Legend II","硬币传奇Ⅱ"],[465,"Achievement_Name_30","Coin Legend III","硬币传奇Ⅲ"],[466,"Achievement_Name_31","Chest I","宝箱Ⅰ"],[467,"Achievement_Name_32","Chest II","宝箱Ⅱ"],[468,"Achievement_Name_33","Chest III","宝箱Ⅲ"],[469,"Achievement_Name_34","Chest IV","宝箱Ⅳ"],[470,"Achievement_Name_35","Chest V","宝箱Ⅴ"],[471,"Achievement_Name_36","Chest VI","宝箱Ⅵ"],[472,"Achievement_Name_37","Chest VII","宝箱Ⅶ"],[473,"Achievement_Name_38","Chest VIII","宝箱Ⅷ"],[474,"Achievement_Name_39","Chest IX","宝箱Ⅸ"],[475,"Achievement_Name_40","Chest X","宝箱Ⅹ"],[476,"Achievement_Name_41","Chest Looter","宝箱掠夺者"],[477,"Achievement_Name_42","Big Pirate","大海盗"],[478,"Achievement_Name_43","One Piece","海贼王"],[479,"Achievement_Name_44","Gift I","礼物Ⅰ"],[480,"Achievement_Name_45","Gift II","礼物Ⅱ"],[481,"Achievement_Name_46","Gift III","礼物Ⅲ"],[482,"Achievement_Name_47","Gift IV","礼物Ⅳ"],[483,"Achievement_Name_48","Gift V","礼物Ⅴ"],[484,"Achievement_Name_49","Gift VI","礼物Ⅵ"],[485,"Achievement_Name_50","Gift VII","礼物Ⅶ"],[486,"Achievement_Name_51","Gift VIII","礼物Ⅷ"],[487,"Achievement_Name_52","Self-improvement","自我完善"],[488,"Achievement_Name_53","Huge Step","大进步"],[489,"Achievement_Name_54","Perfection","完美"],[490,"Achievement_Name_55","Heart Beginner","爱心初学者"],[491,"Achievement_Name_56","Heart Expert","爱心人士"],[492,"Achievement_Name_57","Heart Ambassador","爱心大使"],[493,"Achievement_Name_58","Heart Legend","爱心传奇"],[494,"Achievement_Name_59","Rainbow Creator","创造彩虹"],[495,"Achievement_Name_60","Double Rainbow","双重彩虹"],[496,"Achievement_Name_61","Triple Rainbow","三重彩虹"],[497,"Achievement_Name_62","All Rainbow","全是彩虹"],[498,"Achievement_Name_63","Mad Scientist","疯狂的科学家"],[499,"Achievement_Name_64","Lab Master","实验室大师"],[500,"Achievement_Name_65","Fusion Expert","融合专家"],[501,"Achievement_Name_66","Einstein","爱因斯坦"],[502,"Achievement_Name_67","Bad Luck","不幸者"],[503,"Achievement_Name_68","The Unfortunate","倒霉透了"],[504,"Achievement_Name_69","Underdog","失败者"],[505,"Achievement_Name_70","Little Elf","小精灵"],[506,"Achievement_Name_71","Little Wizard","小巫师"],[507,"Achievement_Name_72","Demagoguery","蛊惑精灵"],[508,"Achievement_Name_73","Supreme Wizard","至尊巫师"],[509,"Achievement_Name_74","Harry Potter","哈利波特"],[510,"Achievement_Name_75","Set Foot","开始远征"],[511,"Achievement_Name_76","Journey Begins","建立旅程"],[512,"Achievement_Name_77","Rare Egg!","稀有蛋!"],[513,"Achievement_Name_78","Epic Egg!","史诗蛋!"],[514,"Achievement_Name_79","Mythical Egg!","神话蛋!"],[515,"Achievement_Name_80","Legendary Egg!","传说蛋!"],[516,"Achievement_Name_81","Luck!","幸运!"],[517,"Achievement_Name_82","Lady Luck!","幸运女神!"],[518,"Achievement_Name_83","Bad Luck!","运气真差!"],[519,"Achievement_Name_84","Chosen One","被选中的人"],[520,"Achievement_Name_85","Rainbow Itself","彩虹本虹"],[521,"Achievement_Name_86","Black Magic","黑魔法"],[522,"Achievement_Name_87","Pharaoh Relics","法老遗迹"],[523,"Achievement_Name_88","Angel Relics","天使遗迹"],[524,"Achievement_Name_89","Above the Clouds","云层之上"],[525,"Achievement_Name_90","Techno Dominator","科技主宰"],[526,"Achievement_Detail_1","Hatched {0} pet eggs","孵化{0}个宠物蛋"],[527,"Achievement_Detail_2","Mined {0} coins","挖矿{0}枚硬币"],[528,"Achievement_Detail_3","Destroyed {0} chests","打破 {0}个宝箱"],[529,"Achievement_Detail_4","Destroyed {0} gifts","打破 {0}礼物"],[530,"Achievement_Detail_5","Upgraded {0} times","升级成功{0}次"],[531,"Achievement_Detail_6","Converted {0} heart pets","将{0}只宠物成功转换为爱心化"],[532,"Achievement_Detail_7","Converted {0} rainbow pets","将{0}只宠物成功转换为彩虹化"],[533,"Achievement_Detail_8","Fused pets {0} times","融合宠物{0}次"],[534,"Achievement_Detail_9","Failed to convert heart pets {0} times","爱心化失败{0}次"],[535,"Achievement_Detail_10","Enchanted {0} pets","附魔{0}只宠物"],[536,"Achievement_Detail_11","Unlocked 3 areas","解锁 3 个区域"],[537,"Achievement_Detail_12","Unlocked 3 areas again","再次解锁 3 个区域"],[538,"Achievement_Detail_13","Hatched a rare pet","孵化出稀有宠物"],[539,"Achievement_Detail_14","Hatched an epic pet","孵化出史诗宠物"],[540,"Achievement_Detail_15","Hatched a legendary pet","孵化出传奇宠物"],[541,"Achievement_Detail_16","Hatched a mythical pet","孵化出神话宠物"],[542,"Achievement_Detail_17","Converted 1 pet to a heart pet","使用一只宠物爱心化成功"],[543,"Achievement_Detail_18","Converted 1 legendary pet to a golden pet","使用一只传说宠物黄金化成功"],[544,"Achievement_Detail_19","Lost 5 pets for a heart pet","使用五只宠物爱心化失败"],[545,"Achievement_Detail_20","Fused a legendary pet","融合出了传奇宠物"],[546,"Achievement_Detail_21","Converted 1 legendary pet to a rainbow pet","使用一只传奇宠物彩虹化成功"],[547,"Achievement_Detail_22","Enchanted a pet with a tag","宠物附魔独特的标签成功"],[548,"Achievement_Detail_23","Broke a giant chest in the desert","击破沙漠大宝箱"],[549,"Achievement_Detail_24","Broke a giant chest in the paradise world","击破天堂大宝箱"],[550,"Achievement_Detail_25","Reached Fantasy World","到达幻想世界"],[551,"Achievement_Detail_26","Reached Techno World","到达科技世界"],[552,"Achievement_UIname_1","Achievements!","成就!"],[553,"Achievement_UIname_2","Finished!","完成"],[554,"Egg_Areaname_1","Starter Egg","启动蛋"],[555,"Egg_Areaname_2","Forest Egg","森林蛋"],[556,"Egg_Areaname_3","Beach Egg","沙滩蛋"],[557,"Egg_Areaname_4","Mining Egg","矿区蛋"],[558,"Egg_Areaname_5","Snow Egg","雪地蛋"],[559,"Egg_Areaname_6","Glacial Egg ","冰川蛋"],[560,"Egg_Areaname_7","Undersea Egg","海底蛋"],[561,"Egg_Areaname_8","Desert Egg","沙漠蛋"],[562,"Egg_Areaname_9","Magic Egg","魔法蛋"],[563,"Egg_Areaname_10","Relic Egg","遗迹蛋"],[564,"Egg_Areaname_11","Antique Egg","古风蛋"],[565,"Egg_Areaname_12","Candy Egg","糖果蛋"],[566,"Egg_Areaname_13","Ghost Egg","鬼魂蛋"],[567,"Egg_Areaname_14","Hell Egg","地狱蛋"],[568,"Egg_Areaname_15","Kingdom Egg","天国蛋"],[569,"Egg_Areaname_16","Paradise Egg","天堂蛋"],[570,"Enchants_Name_16","Best Partner","最好的伙伴"],[571,"Enchants_Describe_16","More powerful than the average of the 4 strongest pets in your backpack<color=#ED7E27ff> (exclusive, cannot be enchanted).</color>","比你背包中4只最强宠物平均更厉害<color=#ED7E27ff>(独有,不可附魔)</color>"],[572,"Tips_Enchants_1","Are you sure?","你确定吗?"],[573,"Tips_Enchants_2","Are you sure? The enchantment will be reset.","你确定吗？附魔会被重置"],[574,"Tips_Enchants_3","These pets already have the required enchantments.","这些宠物已经有了所需的附魔"],[575,"Tips_Enchants_4","Existing enchantments will be reset.","已有的附魔会被重置"],[576,"Tips_Enchants_5","Enchant your pet, until it gets any selected enchantment.","附魔你的宠物,直到他获得你选择的任意词条"],[577,"Tips_Enchants_6","Enchantment succeeded!","附魔成功!"],[578,"Tips_Enchants_7","Enchant","附魔"],[579,"Tips_Enchants_8","Stop","停止"],[580,"Task_Info_1","Destroy {0} coin piles in town","在城镇破坏{0}个金币堆"],[581,"Task_Info_2","Hatch {0} pets from the starter egg","在启动蛋孵化{0}只宠物"],[582,"Task_Info_3","Destroy {0} coin chests in town","在城镇打破{0}个金币箱子"],[583,"Task_Info_4","Destroy {0} gifts in the forest","森林中破坏{0}个礼物盒"],[584,"Task_Info_5","Upgrade {0} times","进行{0}次升级"],[585,"Task_Info_6","Hatch {0} pets from the forest egg","在森林蛋中孵化{0}只宠物"],[586,"Task_Info_7","Destroy {0} diamond chests on the beach","在海滩打破{0}个钻石箱子"],[587,"Task_Info_8","Use the heart machine {0} times","使用爱心化机器{0}次"],[588,"Task_Info_9","Fuse {0} rare pets or pets with higher rarity","融合出{0}只稀有以上的宠物"],[589,"Task_Info_10","Hatch {0} pets from the mining egg","从矿区蛋中孵化{0}只宠物"],[590,"Task_Info_11","Use the rainbow machine {0} times","使用彩虹化机器{0}次"],[591,"Task_Info_12","Destroy {0} closed chests","打破封闭宝箱{0}个"],[592,"Task_Info_13","Destroy {0} gifts in the snowfield","在雪地破坏{0}个礼物盒"],[593,"Task_Info_14","Hatch {0} epic pets from the snow egg","在雪地蛋中孵化{0}只史诗宠物"],[594,"Task_Info_15","Destroy {0} coin chests in the snowfield","在雪地破坏{0}个金币箱子"],[595,"Task_Info_16","Complete {0} trades","成功完成{0}次交易"],[596,"Task_Info_17","Hatch {0} pets from the glacial egg","在冰川蛋中孵化{0}只宠物"],[597,"Task_Info_18","Destroy {0} coin chests at the glacier","在冰川打破{0}个金币箱子"],[598,"Task_Info_19","Destroy {0} diamonds at the undersea","在海底打破{0}个钻石"],[599,"Task_Info_20","Hatch {0} pets of rare pets or pets with higher rarity from the undersea egg","从海底蛋中孵化{0}只稀有以上的宠物"],[600,"Task_Info_21","Destroy {0} coin chests at the undersea","在海底打破{0}个金币箱子"],[601,"Task_Info_22","Destroy {0} giant chests in the desert","在沙漠打破{0}个巨型箱子"],[602,"Task_Info_23","Hatch {0} legendary pets from the desert egg","在沙漠蛋中孵化出{0}只传说宠物"],[603,"Task_Info_24","Complete {0} trades","完成{0}次交易"],[604,"Task_Info_25","Hatch {0} pets from the magic egg","在魔法蛋中孵化{0}只宠物"],[605,"Task_Info_26","Destroy {0} coin chests in the magic forest","在魔法森林破坏{0}个金币箱子"],[606,"Task_Info_27","Use the enchanting machine {0} times","使用附魔机{0}次 "],[607,"Task_Info_28","Destroy {0} gifts on relic island","在遗迹岛打破{0}个礼物盒"],[608,"Task_Info_29","Hatch {0} pets from the relic egg","在遗迹蛋中孵化{0}只宠物"],[609,"Task_Info_30","Destroy {0} giant chests on relic island","在遗迹岛打破{0}次巨型箱子"],[610,"Task_Info_31","Complete {0} trades","完成{0}次交易"],[611,"Task_Info_32","Hatch {0} legendary pets from the samurai egg","在武士蛋孵化{0}只传奇宠物"],[612,"Task_Info_33","Destroy {0} diamonds on samurai island","在武士岛破坏{0}个钻石"],[613,"Task_shop_1","Quest-exclusive Egg","任务专属蛋"],[614,"Task_shop_2","SO-10 Skateboard","SO-10滑板"],[615,"Task_shop_3","Pet Slots +1!","+1宠物位!"],[616,"Task_shop_4","Bigger backpack!","更大的背包!"],[617,"Task_shop_5","Piles of diamonds","成堆的钻石"],[618,"Task_shop_6","A pack of diamonds","一包钻石"],[619,"Task_shop_7","A small bag of diamonds","小袋钻石"],[620,"Task_shop_8","Redeem SO-10 Skateboard","兑换SO-10超级滑板"],[621,"Task_shop_9","Equipped Pets Maximum +1","同时可装备宠物数量+1!"],[622,"Task_shop_10","Pet Backpack Capacity + 10!","宠物背包容量+10!"],[623,"Task_shop_11","Update Soon!","马上更新!"],[624,"Task_shop_12","Coming Soon!","等待发布~"],[625,"Tips_huaban_1","You don't have a skateboard yet. Get one through the quest shop!","你还没有滑板，通过任务商店获得"],[626,"Task_shop_13","Spend {0} quest points to buy this item?","你确认花费{0}任务点数购买这个物品吗？"],[627,"Task_shop_14","You still need {0} quest points!","你还需要{0}任务点数才能购买!"],[628,"AreaDivide_Name_12","Fantasy Shop","幻想商店"],[629,"AreaDivide_Name_13","Portal","传送门"],[630,"AreaDivide_Name_14","Magic Forest","魔法森林"],[631,"AreaDivide_Name_15","Mysterious Relics","神秘遗迹"],[632,"AreaDivide_Name_16","Antique Courtyard","古风庭院"],[633,"Task_shop_15","The item has been redeemed!","商品已经兑换过了~"],[634,"AreaWorld_textUI_2","Fantasy World","幻想世界"],[635,"Loading_Text_1","Entering {0}...","正在进入{0}..."],[636,"PetARR_petName_78","American Monkey","美洲猴"],[637,"PetARR_petName_79","Indian Yeti","印第安雪人"],[638,"PetARR_petName_80","Blushy Parrot","鹦鹉玄凤"],[639,"PetARR_petName_81","Forest Deer","森林鹿"],[640,"PetARR_petName_82","Fairy","仙灵"],[641,"PetARR_petName_83","Egyptian Goldfish","埃及金鱼"],[642,"PetARR_petName_84","Egyptian Octopus","埃及章鱼"],[643,"PetARR_petName_85","Egyptian Shark","埃及鲨鱼"],[644,"PetARR_petName_86","Egyptian Deer","埃及鹿"],[645,"PetARR_petName_87","Egyptian Fairy","埃及仙灵"],[646,"PetARR_petName_88","Cobra","眼镜蛇"],[647,"PetARR_petName_89","Anubis","阿努比斯"],[648,"PetARR_petName_90","Samurai Tiger","武士老虎"],[649,"PetARR_petName_91","Samurai Walrus","武士海象"],[650,"PetARR_petName_92","Samurai Penguin","武士企鹅"],[651,"PetARR_petName_93","Samurai Snake","武士蛇"],[652,"PetARR_petName_94","Samurai Anubis","武士阿努比斯"],[653,"PetARR_petName_95","Samurai Dragon","武士龙"],[654,"Task_shop_16","Special Reward","特别奖励"],[655,"Task_shop_17","Diamond Pack","钻石包"],[656,"Task_shop_18","Quest complete, you got {0} quest points!","任务完成并获得+{0}任务点数"],[657,"Task_shop_19","{0} Quest Points","{0}任务点数"],[658,"Tips_Enchants_9","Unenchanted","未附魔"],[659,"Portol_Tip_1","{0} Fantasy Coins","{0}幻想币"],[660,"Portol_Tip_2","Not Yet Open","尚未开放"],[661,"PetARR_petName_96","Jaguar","美洲虎"],[662,"PetARR_petName_97","American Turtle","美洲龟"],[663,"Enchants_Name_17","Coin II","金币Ⅱ"],[664,"Enchants_Name_18","Coin III","金币Ⅲ"],[665,"Enchants_Name_19","Coin IV","金币Ⅳ"],[666,"Enchants_Name_20","Coin V","金币Ⅴ"],[667,"Enchants_Name_21","Fantasy Coin II","幻想币Ⅱ"],[668,"Enchants_Name_22","Fantasy Coin III","幻想币Ⅲ"],[669,"Enchants_Name_23","Fantasy Coin IV","幻想币Ⅳ"],[670,"Enchants_Name_24","Fantasy Coin V","幻想币Ⅴ"],[671,"Enchants_Name_25","Techno Coin II","科技币Ⅱ"],[672,"Enchants_Name_26","Techno Coin III","科技币Ⅲ"],[673,"Enchants_Name_27","Techno Coin IV","科技币Ⅳ"],[674,"Enchants_Name_28","Techno Coin V","科技币Ⅴ"],[675,"Enchants_Name_29","Power II","力量Ⅱ"],[676,"Enchants_Name_30","Power III","力量Ⅲ"],[677,"Enchants_Name_31","Power IV","力量Ⅳ"],[678,"Enchants_Name_32","Power V","力量Ⅴ"],[679,"Enchants_Name_33","Agility II","敏捷Ⅱ"],[680,"Enchants_Name_34","Agility III","敏捷Ⅲ"],[681,"Enchants_Name_35","Diamond II","钻石Ⅱ"],[682,"Enchants_Name_36","Diamond III","钻石Ⅲ"],[683,"Enchants_Name_37","Diamond IV","钻石Ⅳ"],[684,"Enchants_Name_38","Diamond V","钻石Ⅴ"],[685,"Enchants_Name_39","Chest Destroyer II","宝箱破坏者Ⅱ"],[686,"Enchants_Name_40","Chest Destroyer III","宝箱破坏者Ⅲ"],[687,"Enchants_Name_41","Gift II","礼物Ⅱ"],[688,"Enchants_Name_42","Gift III","礼物Ⅲ"],[689,"Enchants_Name_43","Crazy Multiplier II","疯狂乘数Ⅱ"],[690,"Enchants_Name_44","Crazy Multiplier III","疯狂乘数Ⅲ"],[691,"Enchants_Name_45","Crazy Multiplier IV","疯狂乘数Ⅳ"],[692,"Enchants_Name_46","Crazy Multiplier V","疯狂乘数Ⅴ"],[693,"PetARR_petName_98","SO-10","SO-10"],[694,"PetARR_petName_99","Huge SO-10","巨大·SO-10"],[695,"Achievement_Detail_27","Expanded backpack capacity by {0}","背包扩展+{0}"],[696,"AreaDivide_Name_17","Pink Candy","粉红糖果"],[697,"AreaDivide_Name_18","Dark Tomb Forest","黑暗墓林"],[698,"AreaDivide_Name_19","Magma Hell","岩浆地狱"],[699,"AreaDivide_Name_20","Tears of Kingdom","天国之泪"],[700,"AreaDivide_Name_21","Paradise World","天堂世界"],[701,"Button_view_1","Close","近"],[702,"Button_view_2","Far","远"],[703,"Button_view_3","Reset","恢复"],[704,"World_3D_1","Tap the coins","点击金币"],[705,"World_3D_2","Tap on the coin piles to get coins","点击金币堆获得金币"],[706,"World_3D_3","Heart!","爱心化!"],[707,"World_3D_4","Heart your pet to increase its Attack Power!","将宠物爱心化提升攻击力"],[708,"UI_pagename_1","Wow!","哇哦!"],[709,"UI_pagename_2","Quest Shop!","任务商店!"],[710,"UI_pagename_3","Enchanted Pets!","附魔宠物!"],[711,"UI_pageinfo_1","Existing enchantments will be reset.","已有附魔会被重置"],[712,"World_3D_5","Add extra abilities to pets","为宠物添加额外能力"],[713,"World_3D_6","~Quest~","~任务~"],[714,"World_3D_7","Shop","商店"],[715,"World_3D_8","Get close and tap the button to unlock.","靠近后点击按钮解锁"],[716,"World_3D_9","Fuse!","融合!"],[717,"World_3D_10","Fuse multiple pets and see what happens!","融合多只宠物看看会出现什么吧"],[718,"World_3D_11","Rainbow!","彩虹化!"],[719,"World_3D_12","Rainbow your pet to increase its Attack Power!","将宠物彩虹化提升攻击力"],[720,"World_3D_13","Upgrade!","升级!"],[721,"World_3D_14","Enter the machine and tap the Upgrade button to improve attributes.","进入机器点击升级按钮提升属性"],[722,"UI_pageinfo_2","Unlock codex levels","解锁图鉴等级"],[723,"UI_pagename_4","Attention!","注意!"],[724,"UI_pagename_5","OK!","好的!"],[725,"World_3D_15","Accelerating...","加速中..."],[726,"UI_pagename_6","Travel fast!","快速旅行!"],[727,"UI_pagename_7","~World~","~世界~"],[728,"UI_pagename_8","Select Tag","选择词条"],[729,"PetARR_petName_100","Deer","小鹿"],[730,"PetARR_petName_101","Green Snake","绿蛇"],[731,"PetARR_petName_102","Viper","毒蛇"],[732,"PetARR_petName_103","Candy Anubis","糖果阿努比斯"],[733,"PetARR_petName_104","Candy Dragon","糖果龙"],[734,"PetARR_petName_105","Demon Turtle","恶魔龟"],[735,"PetARR_petName_106","Demon Snowman","恶魔雪人"],[736,"PetARR_petName_107","Demon Penguin","恶魔企鹅"],[737,"PetARR_petName_108","Demon Walrus","恶魔海象"],[738,"PetARR_petName_109","Demon Fairy","恶魔仙灵"],[739,"PetARR_petName_110","Demon Cat","恶魔猫"],[740,"PetARR_petName_111","Demon Cerberus","恶魔三头犬"],[741,"PetARR_petName_112","Infernal Turtle","地狱龟"],[742,"PetARR_petName_113","Infernal Snowman","地狱雪人"],[743,"PetARR_petName_114","Infernal Penguin","地狱企鹅"],[744,"PetARR_petName_115","Infernal Walrus","地狱海象"],[745,"PetARR_petName_116","Infernal Dragon","地狱龙"],[746,"PetARR_petName_117","Infernal Spider","地狱蜘蛛"],[747,"PetARR_petName_118","Infernal Cerberus","地狱三头犬"],[748,"PetARR_petName_119","Angel Penguin","天使企鹅"],[749,"PetARR_petName_120","Angel Octopus","天使章鱼"],[750,"PetARR_petName_121","Angel Parrot","天使鹦鹉"],[751,"PetARR_petName_122","Angel Monkey","天使猴子"],[752,"PetARR_petName_123","Angel Spider","天使蜘蛛"],[753,"PetARR_petName_124","Emperor Penguin","帝王企鹅"],[754,"PetARR_petName_125","Emperor Octopus","帝王章鱼"],[755,"PetARR_petName_126","Emperor Parrot","帝王鹦鹉"],[756,"PetARR_petName_127","Emperor Cerberus","帝王三头犬"],[757,"PetARR_petName_128","Emperor Dragon","帝王龙"],[758,"PetARR_petName_129","Summer Penguin","夏日企鹅"],[759,"PetARR_petName_130","Summer Octopus","夏日章鱼"],[760,"Claw_Tips_1","Spend 1 summer coin on the claw machine?","要花费一个娃娃机币玩抓娃娃机吗？"],[761,"Claw_Tips_2","You don't have enough summer coins! \\nGet them through daily rewards!","娃娃机币不足！\r\n可以通过每日奖励获得娃娃机币！"],[762,"Claw_Tips_3","Other players are using the claw machine!","其他玩家在用抓娃娃机！"],[763,"Claw_Tips_4","Claw machine! Grab me a cutie!!!","抓娃娃娃娃机！！！"],[764,"Claw_Tips_5","Spend 1 summer coin for an attempt at claw machine!","用一个娃娃机币玩娃娃机"],[765,"Claw_Tips_6","In Use","正在使用中"],[766,"Claw_Tips_7","Summer event ongoing! Get summer coins!","活动中！获得娃娃机币！"],[767,"UIBUTTON1","Delete","删除"],[768,"UIBUTTON2","Cancel","取消"],[769,"pet_uiinfo1","Name your pet!","为你的宠物起昵称吧!"],[770,"Rank_Title_1","Rank","排行榜"],[771,"Rank_Title_2","Diamond Rank","钻石数量排行"],[772,"Rank_Title_3","Codex Rank","图鉴收集排行"],[773,"Portol_Tip_3","Teleport back to the first world?","是否传送回第一世界"],[774,"Claw_Tips_8","Summer event ongoing! New pets every day! Tap the red button on the claw machine! Chances to get a summer limited pet!","活动进行中！每天都有新宠物！点击娃娃机中央红色按钮，获得限定宠物！"],[775,"World_Tips_1","You obtained a legendary pet!","获得传说级宠物！"],[776,"World_Tips_2","You obtained a mythical pet!","获得神话级宠物！"],[777,"World_Tips_3","You obtained a summer limited pet!","获得限时宠物！"],[778,"World_Tips_4","You obtained a quest pet!","获得任务宠物！"],[779,"World_Tips_5","You obtained a super rare titanic pet!","获得超稀有巨大化宠物！"],[780,"World_Tips_6","Pet is attacking a giant chest in the desert. Come join it!","正在攻击沙漠大宝箱，快来和他一起吧！"],[781,"World_Tips_7","Pet is attacking a giant chest in the secret base. Come join it!","正在攻击秘密大宝箱，快来和他一起吧！"],[782,"World_Tips_8","Pet is attacking a giant chest on the relic island. Come join it!","正在攻击遗迹大宝箱，快来和他一起吧！"],[783,"World_Tips_9","Pet is attacking a giant chest in the paradise world. Come join it!","正在攻击天堂大宝箱，快来和他一起吧！"],[784,"World_Tips_10","Upgraded to 50%!","已经升级到50%啦！"],[785,"World_Tips_11","Upgraded to 100%!","已经升级到100%啦！"],[786,"World_Tips_12","You've got {0} pets now. Go check them out!","已经拥有{0}只宠物啦，快去看看吧！"],[787,"World_Tips_13","Reached the second world!","到达第二世界！"],[788,"World_Tips_14","You obtained a legendary enchantment: Royalty!","获得传说级附魔王权！"],[789,"World_Tips_15","You obtained a legendary enchantment: Magnet!","获得传说级附魔磁铁！"],[790,"World_Tips_16","You obtained a legendary enchantment: Glitters!","获得传说级附魔闪闪发光！"],[791,"PetARR_petName_131","Dino Bearer","恐龙抗狼"],[792,"PetARR_petName_132","Candy Bearer","糖果龙抗狼"],[793,"Claw_Tips_9","Not enough summer coins! Spend {0} diamonds to get summer coins!","娃娃机币不足！花{0}钻石获得娃娃机币"],[794,"PetARR_petName_133","Waat · Reely","尊嘟假嘟"],[795,"PetARR_petName_134","Pirate Shark","海盗鲨鱼"],[796,"PetARR_petName_135","Royal Parrot","皇家鹦鹉"],[797,"PetARR_petName_136","Golden Surfer","冲浪小狼"],[798,"PetARR_petName_137","Titanic Golden Surfer","巨型冲浪小狼"],[799,"VIP_task_01","Claim online reward {0}","领取在线奖励{0}"],[800,"VIP_task_02","Destroy {0} coins","打破{0}个金币"],[801,"VIP_task_03","Hatch {0} pet eggs","打开{0}个宠物蛋"],[802,"VIP_task_04","Fuse pets {0} times","完成宠物融合{0}次"],[803,"VIP_task_05","Convert {0} heart pets","成功爱心化宠物{0}次"],[804,"VIP_task_06","Convert {0} rainbow pets","成功彩虹化宠物{0}次"],[805,"VIP_task_07","Enchant pets {0} times","附魔宠物{0}次"],[806,"VIP_task_08","Make {0} successful trades","和玩家成功交易{0}次"],[807,"VIP_task_09","Obtain {0} legendary pets","获得传说宠物{0}次"],[808,"VIP_task_10","Obtain {0} mythical pets","获得神话宠物{0}次"],[809,"VIPmain_Text_1","Summer Pass!","夏日通行证！"],[810,"VIPmain_Text_2","Stars","星星"],[811,"VIPmain_Text_3","Quests refresh at 04:00 every morning. Don't forget to complete them!","任务每天凌晨04:00刷新，记得抓紧时间完成哦！"],[812,"VIPmain_Text_4","Purchase stars","购买星星"],[813,"VIPmain_Text_5","Unlock membership","解锁大会员"],[814,"VIPHud_Text_1","Pass Quests","通行证任务"],[815,"VIPBuy_Text_1","Membership Rewards","大会员奖励！"],[816,"VIPBuy_Text_2","Golden Key x2! (1 key for 15 stars)","金钥匙X2！（使用钥匙获得15颗星星）"],[817,"VIPBuy_Text_3","You get double rewards and 3 more missions available for 6 more stars every day!","获得双倍奖励！可以每天多做3个任务，多获得6颗星星！"],[818,"VIPKey_Text_1","Quick Purchase","快速购买！"],[819,"VIPKey_Text_2","Spend 1 Membership Key for 15 stars to get the following rewards right away.","消耗一把大会员钥匙，获得15颗星星，可马上获得以下奖励"],[820,"VIPKey_Text_3","Note: You can get keys by joining the membership.","注意！购买大会员即可获得钥匙"],[821,"VIPItem_Text_1","Double rewards for players with membership!","大会员双倍"],[822,"VIPItem_Text_2","To be unlocked","未解锁"],[823,"VIP_Tips_1","You don't have enough membership keys.","大会员钥匙不足"],[824,"VIP_Tips_2","Exchange successful!","钥匙兑换成功"],[825,"VIP_Tips_3","You don't have enough stars.","星星不足"],[826,"VIP_Tips_4","Quest completed!","任务已完成"],[827,"VIP_Tips_5","Obtained {0} stars!","获得{0}星星"],[828,"VIP_Tips_6","All Completed","全部完成"],[829,"VIPHud_Text_2","Refresh attempts: {0}","可刷新次数:{0}"],[830,"Carousel_Text_1","No empty seats on the carousel.","木马上已经没有座位了"],[831,"VIPHud_Text_3","Pass Rewards","通行证奖励"],[832,"Enchants_Name_47","Strong Companion","强大的伙伴"],[833,"Enchants_Describe_17","50% of your strongest pet<color=#ED7E27ff> (exclusive, cannot be enchanted).</color>","是你最强宠物的50%<color=#ED7E27ff>(独有,不可附魔)</color>"],[834,"PetARR_petName_138","Lover Penguin · Female","七夕·女宝"],[835,"PetARR_petName_139","Lover Penguin · Male","七夕·男宝"],[836,"AreaDivide_Name_22","Techno Shop","科技商店"],[837,"AreaDivide_Name_23","Cyber Town","赛博城镇"],[838,"AreaDivide_Name_24","Dark Technology","黑暗科技"],[839,"AreaDivide_Name_25","Steampunk","蒸汽朋克"],[840,"AreaDivide_Name_26","Steampunk Factory","蒸汽工厂"],[841,"AreaDivide_Name_27","Chem Experiment","化学实验"],[842,"AreaDivide_Name_28","Alien Forest","外星森林"],[843,"AreaDivide_Name_29","Gloomy Forest","阴暗森林"],[844,"AreaDivide_Name_30",null,null],[845,"AreaDivide_Name_31",null,null],[846,"AreaWorld_textUI_3","Techno World","科技世界"],[847,"Egg_Areaname_17","Cyber Egg","赛博蛋"],[848,"Egg_Areaname_18","Techno Egg","科技蛋"],[849,"Egg_Areaname_19","Dark Egg","黑暗蛋"],[850,"Egg_Areaname_20","Mutant Egg","变异蛋"],[851,"Egg_Areaname_21","Steampunk Egg","蒸汽蛋"],[852,"Egg_Areaname_22","Punk Egg","朋克蛋"],[853,"Egg_Areaname_23","Experiment Egg","实验蛋"],[854,"Egg_Areaname_24","Potion Egg","药水蛋"],[855,"Egg_Areaname_25","Alien Egg","外星蛋"],[856,"Egg_Areaname_26","Planet Egg","行星蛋"],[857,"Egg_Areaname_27","Gloomy Egg","暗暗蛋"],[858,"Egg_Areaname_28",null,null],[859,"Portol_Tip_4","Teleport to the third world?","是否传送到第三世界"],[860,"PetARR_petName_140","Calico Dog","花狗"],[861,"PetARR_petName_141","Calico Cat","花猫"],[862,"PetARR_petName_142","Radar Dog","雷达狗"],[863,"PetARR_petName_143","Radar Cat","雷达猫"],[864,"PetARR_petName_144","Cow Dog","黑白狗"],[865,"PetARR_petName_145","Cow Cat","奶牛猫"],[866,"PetARR_petName_146","Mech Dog","机械小狗"],[867,"PetARR_petName_147","Mech Cat","机械小猫"],[868,"PetARR_petName_148","Brown Dog","棕狗"],[869,"PetARR_petName_149","Yellow Cat","小黄猫"],[870,"PetARR_petName_150","Archer Dog","弓手狗"],[871,"PetARR_petName_151","Archer Cat","弓手猫"],[872,"PetARR_petName_152","Black Dog","黑狗"],[873,"PetARR_petName_153","Brown Cat","棕猫"],[874,"PetARR_petName_154","White Siamese","白暹罗猫"],[875,"PetARR_petName_155","Sci-fi Dog","科幻狗"],[876,"PetARR_petName_156","Sci-fi Cat","科幻猫"],[877,"PetARR_petName_157","Sci-Fi Siamese","科幻暹罗"],[878,"PetARR_petName_158","Black Siamese","黑暹罗猫"],[879,"PetARR_petName_159","White Rabbit","白兔"],[880,"PetARR_petName_160","Brown Squirrel","棕松鼠"],[881,"PetARR_petName_161","Steampunk Siamese","蒸汽暹罗"],[882,"PetARR_petName_162","Steampunk Rabbit","蒸汽白兔"],[883,"PetARR_petName_163","Steampunk Squirrel","蒸汽松鼠"],[884,"PetARR_petName_164","Bear","小熊"],[885,"PetARR_petName_165","Cow","牛牛"],[886,"PetARR_petName_166","Fox","狐狸"],[887,"PetARR_petName_167","Punk Bear","朋克小熊"],[888,"PetARR_petName_168","Punk Cow","朋克牛牛"],[889,"PetARR_petName_169","Punk Fox","朋克狐狸"],[890,"PetARR_petName_170","Rock Cat","摇滚猫"],[891,"PetARR_petName_171","Hiphop Dog","嘻哈狗"],[892,"VIP_task_11","Destroy {0} gifts","打破{0}个礼物"],[893,"VIP_task_12","Destroy {0} chests","打破{0}个宝箱"],[894,"VIP_task_13","Play the claw machine {0} times","玩{0}次抓娃娃机"],[895,"VIP_Tips_7","Pass rewards upgraded! Players who have received the rewards will be compensated.","通行证奖励升级！已领取奖励的玩家将得到补偿！"],[896,"PetARR_petName_172","Yellow Rabbit","黄兔子"],[897,"PetARR_petName_173","Black Squirrel","黑松鼠"],[898,"PetARR_petName_174","Brown Bear","棕熊"],[899,"PetARR_petName_175","Gamer Squirrel","游戏松鼠"],[900,"PetARR_petName_176","Gamer Fox","游戏狐"],[901,"PetARR_petName_177","Yellow Cow","黄牛"],[902,"PetARR_petName_178","Red Fox","红狐"],[903,"PetARR_petName_179","Pink Pig","小粉猪"],[904,"PetARR_petName_180","Researcher Bear","科研熊"],[905,"PetARR_petName_181","Researcher Pig","科研猪"],[906,"PetARR_petName_182","Grey Rabbit","小灰兔"],[907,"PetARR_petName_183","Orange Squirrel","橘松鼠"],[908,"PetARR_petName_184","Antivirus Rabbit","防毒兔"],[909,"PetARR_petName_185","Antivirus Squirrel","防毒松鼠"],[910,"PetARR_petName_186","White Bear","白熊"],[911,"PetARR_petName_187","Black Cow","黑牛"],[912,"PetARR_petName_188","White Fox","白狐"],[913,"PetARR_petName_189","Doctor Bear","医生熊"],[914,"PetARR_petName_190","Doctor Fox","医生狐"],[915,"PetARR_petName_191","Black Pig","黑猪"],[916,"PetARR_petName_192","White Lamb","白羊"],[917,"PetARR_petName_193","Bat","蝙蝠"],[918,"PetARR_petName_194","Frankenstein Lamb","科学怪羊"],[919,"PetARR_petName_195","Frankenstein Bat","科学怪蝠"],[920,"Plaza_Text_1","My booth!","我的摊位！"],[921,"Plaza_Text_2","Select pets!","选择宠物！"],[922,"Plaza_Text_3","Shelve the pets!","上架宠物"],[923,"Plaza_Text_4","Remove","下架"],[924,"Plaza_Text_5","How much do you want to sell?","你要卖多少钱"],[925,"Plaza_Text_6","For sale!","出售！"],[926,"Plaza_Text_7","Booth decors!","摊位装饰！"],[927,"Plaza_Text_8","Table","桌子"],[928,"Plaza_Text_9","Sign","招牌"],[929,"Plaza_Text_10","Add-on","饰品"],[930,"Plaza_Text_11","Exterior","外装"],[931,"Plaza_Text_12","{0} coins","{0}币"],[932,"Plaza_Text_13","His booth!","他的摊位！"],[933,"Plaza_Text_14","{0} pets","{0}宠物"],[934,"Rank_Title_4",null,"赚钱高手榜"],[935,"Rank_Title_5",null,"大富豪榜"],[936,"Rank_Title_6",null,"超级商人榜"],[937,"Plaza_Text_15",null,"当前装饰币不足哦，每买卖出2只宠物就可以获得装饰币啦！"],[938,"Plaza_Text_16",null,"{0}装饰币"],[939,"Plaza_Text_17",null,"是否需要购买该装饰"],[940,"Tips_gift_4",null,"请收下关于存档丢失bug的补偿！感谢理解~"],[941,"Plaza_Text_18",null,"宠物乐园！"],[942,"Plaza_Text_19",null,"要传送到交易广场吗！"],[943,"Plaza_Text_20",null,"要传送回宠物乐园吗！"],[944,"Plaza_Text_21",null,"我的摊位！"],[945,"Plaza_Text_22",null,"变身！"],[946,"Plaza_Text_23",null,"当前宠物正在出售中，请下架后重试！"],[947,"Goal_Text_1",null,"抓娃娃过关！"],[948,"Goal_Text_2",null,"监控阵营：<color=#50EED6FF>{0}</color>/3"],[949,"Goal_Text_3",null,"马桶阵营：<color=#50EED6FF>{0}</color>/3"],[950,"Goal_Text_4",null,"离开房间"],[951,"Goal_Text_5",null,"最快通关榜"],[952,"Plaza_Text_24",null,"功能还在冷却中，请稍后在使用"],[953,"PetARR_petName_196",null,"马桶猫"],[954,"PetARR_petName_197",null,"马桶兔子"],[955,"PetARR_petName_198",null,"监控狗"],[956,"PetARR_petName_199",null,"监控小熊"],[957,"PetARR_petName_200",null,"马桶主教羊"],[958,"PetARR_petName_201",null,"泰坦音响鹿"],[959,"Rank_Title_7",null,"每日榜"],[960,"Rank_Title_8",null,"每周榜"],[961,"Plaza_Text_25",null,"恭喜你开出2000钻石"],[962,"Plaza_Text_26",null,"恭喜你开出了一个装饰品！快去装饰背包看看吧！"],[963,"Plaza_Text_27",null,"什么？你抽到了重复的装饰？让我用魔法帮你换成装饰币吧！"],[964,"PetARR_petName_202","Laurel Rabbit","月桂兔"],[965,"PetARR_petName_203","Moon Hare","月兔"],[966,"Rank_Title_9","Camp Board","阵营榜"],[967,"Claw_Tips_10","Please wait {0}s before using the claw machine.","请过{0}秒后再使用娃娃机！"],[968,"Claw_Tips_11","You're already using the claw machine!","已经在使用娃娃机了"],[969,"Plaza_Text_28",null,"复位"],[970,"Deposit_1","Please open your browser and go to the official website of MOBOX to recharge: https://www.mobox.io","请打开浏览器前往MOBOX官网進行充值：https://www.mobox.io"],[971,"Deposit_2","Copy the URL","复制网址"],[972,"BuyDollCoin_Text_1",null,"是否购买娃娃机币？"],[973,"DollCoinNotEnough_Text_1",null,"娃娃机币不足！是否购买？"],[974,"Copy_Success_Text_1",null,"复制成功！"],[975,"BuyDollCoin_Success_Text_1",null,"购买成功！"],[976,"BuyDollCoin_Fail_Text_1",null,"购买失败！"],[977,"Buff_Text_1","MODragon gain buff","龙龙收益buff"],[978,"Buff_Text_2","MODragon gain buff","龙龙收益buff"],[979,"Buff_Text_3","Small reward potions","小型奖励药水"],[980,"Buff_Text_4","Medium Reward Potion","中型奖励药水"],[981,"Buff_Text_5","Large Reward Potion","大型奖励药水"],[982,"Buff_Text_6","MODragon attack buff","龙龙攻击buff"],[983,"Buff_Text_7","MODragon attack buff","龙龙攻击buff"],[984,"Buff_Text_8","Small damage potions","小型伤害药水"],[985,"Buff_Text_9","Medium damage potions","中型伤害药水"],[986,"Buff_Text_10","Large damage potions","大型伤害药水"]];
export interface ILanguageElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**多语言key*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**Vance*/
	get Pet_Random_Name_1():ILanguageElement{return this.getElement(1)};
	/**Judy*/
	get Pet_Random_Name_2():ILanguageElement{return this.getElement(2)};
	/**Stan*/
	get Pet_Random_Name_3():ILanguageElement{return this.getElement(3)};
	/**Prudent*/
	get Pet_Random_Name_4():ILanguageElement{return this.getElement(4)};
	/**Leigh*/
	get Pet_Random_Name_5():ILanguageElement{return this.getElement(5)};
	/**Ida*/
	get Pet_Random_Name_6():ILanguageElement{return this.getElement(6)};
	/**Estra*/
	get Pet_Random_Name_7():ILanguageElement{return this.getElement(7)};
	/**Sherard*/
	get Pet_Random_Name_8():ILanguageElement{return this.getElement(8)};
	/**Travers*/
	get Pet_Random_Name_9():ILanguageElement{return this.getElement(9)};
	/**Mark*/
	get Pet_Random_Name_10():ILanguageElement{return this.getElement(10)};
	/**Kingly*/
	get Pet_Random_Name_11():ILanguageElement{return this.getElement(11)};
	/**Dalton*/
	get Pet_Random_Name_12():ILanguageElement{return this.getElement(12)};
	/**Nicolette*/
	get Pet_Random_Name_13():ILanguageElement{return this.getElement(13)};
	/**Meadow*/
	get Pet_Random_Name_14():ILanguageElement{return this.getElement(14)};
	/**Winston*/
	get Pet_Random_Name_15():ILanguageElement{return this.getElement(15)};
	/**Kelsey*/
	get Pet_Random_Name_16():ILanguageElement{return this.getElement(16)};
	/**Farrell*/
	get Pet_Random_Name_17():ILanguageElement{return this.getElement(17)};
	/**Wealthy*/
	get Pet_Random_Name_18():ILanguageElement{return this.getElement(18)};
	/**Gifted*/
	get Pet_Random_Name_19():ILanguageElement{return this.getElement(19)};
	/**Kent*/
	get Pet_Random_Name_20():ILanguageElement{return this.getElement(20)};
	/**Fresh*/
	get Pet_Random_Name_21():ILanguageElement{return this.getElement(21)};
	/**Des*/
	get Pet_Random_Name_22():ILanguageElement{return this.getElement(22)};
	/**Blueberry*/
	get Pet_Random_Name_23():ILanguageElement{return this.getElement(23)};
	/**Nadia*/
	get Pet_Random_Name_24():ILanguageElement{return this.getElement(24)};
	/**Erwin*/
	get Pet_Random_Name_25():ILanguageElement{return this.getElement(25)};
	/**Jesse*/
	get Pet_Random_Name_26():ILanguageElement{return this.getElement(26)};
	/**Nightingale*/
	get Pet_Random_Name_27():ILanguageElement{return this.getElement(27)};
	/**Deirdre*/
	get Pet_Random_Name_28():ILanguageElement{return this.getElement(28)};
	/**Optimistic*/
	get Pet_Random_Name_29():ILanguageElement{return this.getElement(29)};
	/**Donald*/
	get Pet_Random_Name_30():ILanguageElement{return this.getElement(30)};
	/**Ardent*/
	get Pet_Random_Name_31():ILanguageElement{return this.getElement(31)};
	/**Esmond*/
	get Pet_Random_Name_32():ILanguageElement{return this.getElement(32)};
	/**Free*/
	get Pet_Random_Name_33():ILanguageElement{return this.getElement(33)};
	/**Daphne*/
	get Pet_Random_Name_34():ILanguageElement{return this.getElement(34)};
	/**Tara*/
	get Pet_Random_Name_35():ILanguageElement{return this.getElement(35)};
	/**Winthrop*/
	get Pet_Random_Name_36():ILanguageElement{return this.getElement(36)};
	/**Wanderer*/
	get Pet_Random_Name_37():ILanguageElement{return this.getElement(37)};
	/**Francesca*/
	get Pet_Random_Name_38():ILanguageElement{return this.getElement(38)};
	/**Rhea*/
	get Pet_Random_Name_39():ILanguageElement{return this.getElement(39)};
	/**Harris*/
	get Pet_Random_Name_40():ILanguageElement{return this.getElement(40)};
	/**Vigour*/
	get Pet_Random_Name_41():ILanguageElement{return this.getElement(41)};
	/**Wallace*/
	get Pet_Random_Name_42():ILanguageElement{return this.getElement(42)};
	/**Noblewoman*/
	get Pet_Random_Name_43():ILanguageElement{return this.getElement(43)};
	/**Trixie*/
	get Pet_Random_Name_44():ILanguageElement{return this.getElement(44)};
	/**Dennis*/
	get Pet_Random_Name_45():ILanguageElement{return this.getElement(45)};
	/**Delmar*/
	get Pet_Random_Name_46():ILanguageElement{return this.getElement(46)};
	/**Hamlin*/
	get Pet_Random_Name_47():ILanguageElement{return this.getElement(47)};
	/**Power*/
	get Pet_Random_Name_48():ILanguageElement{return this.getElement(48)};
	/**Wendy*/
	get Pet_Random_Name_49():ILanguageElement{return this.getElement(49)};
	/**Salt*/
	get Pet_Random_Name_50():ILanguageElement{return this.getElement(50)};
	/**Elton*/
	get Pet_Random_Name_51():ILanguageElement{return this.getElement(51)};
	/**Kyla*/
	get Pet_Random_Name_52():ILanguageElement{return this.getElement(52)};
	/**Seeds*/
	get Pet_Random_Name_53():ILanguageElement{return this.getElement(53)};
	/**Delight*/
	get Pet_Random_Name_54():ILanguageElement{return this.getElement(54)};
	/**Vivianne*/
	get Pet_Random_Name_55():ILanguageElement{return this.getElement(55)};
	/**Linette*/
	get Pet_Random_Name_56():ILanguageElement{return this.getElement(56)};
	/**Peaceful*/
	get Pet_Random_Name_57():ILanguageElement{return this.getElement(57)};
	/**Prosperous*/
	get Pet_Random_Name_58():ILanguageElement{return this.getElement(58)};
	/**Maxine*/
	get Pet_Random_Name_59():ILanguageElement{return this.getElement(59)};
	/**Rhoda*/
	get Pet_Random_Name_60():ILanguageElement{return this.getElement(60)};
	/**Elias*/
	get Pet_Random_Name_61():ILanguageElement{return this.getElement(61)};
	/**Nessia*/
	get Pet_Random_Name_62():ILanguageElement{return this.getElement(62)};
	/**Paxton*/
	get Pet_Random_Name_63():ILanguageElement{return this.getElement(63)};
	/**Peggy*/
	get Pet_Random_Name_64():ILanguageElement{return this.getElement(64)};
	/**Jemima*/
	get Pet_Random_Name_65():ILanguageElement{return this.getElement(65)};
	/**Julia*/
	get Pet_Random_Name_66():ILanguageElement{return this.getElement(66)};
	/**Warren*/
	get Pet_Random_Name_67():ILanguageElement{return this.getElement(67)};
	/**Rosa*/
	get Pet_Random_Name_68():ILanguageElement{return this.getElement(68)};
	/**Foster*/
	get Pet_Random_Name_69():ILanguageElement{return this.getElement(69)};
	/**Konrad*/
	get Pet_Random_Name_70():ILanguageElement{return this.getElement(70)};
	/**Germaine*/
	get Pet_Random_Name_71():ILanguageElement{return this.getElement(71)};
	/**Tilda*/
	get Pet_Random_Name_72():ILanguageElement{return this.getElement(72)};
	/**John*/
	get Pet_Random_Name_73():ILanguageElement{return this.getElement(73)};
	/**Laurel*/
	get Pet_Random_Name_74():ILanguageElement{return this.getElement(74)};
	/**Vincent*/
	get Pet_Random_Name_75():ILanguageElement{return this.getElement(75)};
	/**Spirited*/
	get Pet_Random_Name_76():ILanguageElement{return this.getElement(76)};
	/**Ambitious*/
	get Pet_Random_Name_77():ILanguageElement{return this.getElement(77)};
	/**White*/
	get Pet_Random_Name_78():ILanguageElement{return this.getElement(78)};
	/**Everett*/
	get Pet_Random_Name_79():ILanguageElement{return this.getElement(79)};
	/**Falkner*/
	get Pet_Random_Name_80():ILanguageElement{return this.getElement(80)};
	/**Priscilla*/
	get Pet_Random_Name_81():ILanguageElement{return this.getElement(81)};
	/**Wise*/
	get Pet_Random_Name_82():ILanguageElement{return this.getElement(82)};
	/**Martin*/
	get Pet_Random_Name_83():ILanguageElement{return this.getElement(83)};
	/**Hadwin*/
	get Pet_Random_Name_84():ILanguageElement{return this.getElement(84)};
	/**Trustworthy*/
	get Pet_Random_Name_85():ILanguageElement{return this.getElement(85)};
	/**Beloved*/
	get Pet_Random_Name_86():ILanguageElement{return this.getElement(86)};
	/**Abigail*/
	get Pet_Random_Name_87():ILanguageElement{return this.getElement(87)};
	/**Zera*/
	get Pet_Random_Name_88():ILanguageElement{return this.getElement(88)};
	/**Rex*/
	get Pet_Random_Name_89():ILanguageElement{return this.getElement(89)};
	/**Wenda*/
	get Pet_Random_Name_90():ILanguageElement{return this.getElement(90)};
	/**Mercy*/
	get Pet_Random_Name_91():ILanguageElement{return this.getElement(91)};
	/**Dwayne*/
	get Pet_Random_Name_92():ILanguageElement{return this.getElement(92)};
	/**Kirsten*/
	get Pet_Random_Name_93():ILanguageElement{return this.getElement(93)};
	/**Kayla*/
	get Pet_Random_Name_94():ILanguageElement{return this.getElement(94)};
	/**Leo*/
	get Pet_Random_Name_95():ILanguageElement{return this.getElement(95)};
	/**Willis*/
	get Pet_Random_Name_96():ILanguageElement{return this.getElement(96)};
	/**Amiable*/
	get Pet_Random_Name_97():ILanguageElement{return this.getElement(97)};
	/**Jewel*/
	get Pet_Random_Name_98():ILanguageElement{return this.getElement(98)};
	/**Hartley*/
	get Pet_Random_Name_99():ILanguageElement{return this.getElement(99)};
	/**Eliza*/
	get Pet_Random_Name_100():ILanguageElement{return this.getElement(100)};
	/**Noelle*/
	get Pet_Random_Name_101():ILanguageElement{return this.getElement(101)};
	/**David*/
	get Pet_Random_Name_102():ILanguageElement{return this.getElement(102)};
	/**Truman*/
	get Pet_Random_Name_103():ILanguageElement{return this.getElement(103)};
	/**Nora*/
	get Pet_Random_Name_104():ILanguageElement{return this.getElement(104)};
	/**Belle*/
	get Pet_Random_Name_105():ILanguageElement{return this.getElement(105)};
	/**Ann*/
	get Pet_Random_Name_106():ILanguageElement{return this.getElement(106)};
	/**Ian*/
	get Pet_Random_Name_107():ILanguageElement{return this.getElement(107)};
	/**Fiona*/
	get Pet_Random_Name_108():ILanguageElement{return this.getElement(108)};
	/**Sparrow*/
	get Pet_Random_Name_109():ILanguageElement{return this.getElement(109)};
	/**Blythe*/
	get Pet_Random_Name_110():ILanguageElement{return this.getElement(110)};
	/**Ivan*/
	get Pet_Random_Name_111():ILanguageElement{return this.getElement(111)};
	/**Irene*/
	get Pet_Random_Name_112():ILanguageElement{return this.getElement(112)};
	/**Georgiana*/
	get Pet_Random_Name_113():ILanguageElement{return this.getElement(113)};
	/**Lucille*/
	get Pet_Random_Name_114():ILanguageElement{return this.getElement(114)};
	/**Felicia*/
	get Pet_Random_Name_115():ILanguageElement{return this.getElement(115)};
	/**Nancy*/
	get Pet_Random_Name_116():ILanguageElement{return this.getElement(116)};
	/**Darian*/
	get Pet_Random_Name_117():ILanguageElement{return this.getElement(117)};
	/**Firm*/
	get Pet_Random_Name_118():ILanguageElement{return this.getElement(118)};
	/**Margot*/
	get Pet_Random_Name_119():ILanguageElement{return this.getElement(119)};
	/**Eileen*/
	get Pet_Random_Name_120():ILanguageElement{return this.getElement(120)};
	/**Magda*/
	get Pet_Random_Name_121():ILanguageElement{return this.getElement(121)};
	/**Sandra*/
	get Pet_Random_Name_122():ILanguageElement{return this.getElement(122)};
	/**Britney*/
	get Pet_Random_Name_123():ILanguageElement{return this.getElement(123)};
	/**Peaceful*/
	get Pet_Random_Name_124():ILanguageElement{return this.getElement(124)};
	/**Vaughan*/
	get Pet_Random_Name_125():ILanguageElement{return this.getElement(125)};
	/**Garrick*/
	get Pet_Random_Name_126():ILanguageElement{return this.getElement(126)};
	/**Elliott*/
	get Pet_Random_Name_127():ILanguageElement{return this.getElement(127)};
	/**Glenn*/
	get Pet_Random_Name_128():ILanguageElement{return this.getElement(128)};
	/**Leith*/
	get Pet_Random_Name_129():ILanguageElement{return this.getElement(129)};
	/**Trina*/
	get Pet_Random_Name_130():ILanguageElement{return this.getElement(130)};
	/**Dixon*/
	get Pet_Random_Name_131():ILanguageElement{return this.getElement(131)};
	/**Silvery*/
	get Pet_Random_Name_132():ILanguageElement{return this.getElement(132)};
	/**Swift*/
	get Pet_Random_Name_133():ILanguageElement{return this.getElement(133)};
	/**Oscar*/
	get Pet_Random_Name_134():ILanguageElement{return this.getElement(134)};
	/**Kirby*/
	get Pet_Random_Name_135():ILanguageElement{return this.getElement(135)};
	/**Princess*/
	get Pet_Random_Name_136():ILanguageElement{return this.getElement(136)};
	/**Strawberry*/
	get Pet_Random_Name_137():ILanguageElement{return this.getElement(137)};
	/**Rich*/
	get Pet_Random_Name_138():ILanguageElement{return this.getElement(138)};
	/**Faithful*/
	get Pet_Random_Name_139():ILanguageElement{return this.getElement(139)};
	/**Nigel*/
	get Pet_Random_Name_140():ILanguageElement{return this.getElement(140)};
	/**Ernest*/
	get Pet_Random_Name_141():ILanguageElement{return this.getElement(141)};
	/**Robin*/
	get Pet_Random_Name_142():ILanguageElement{return this.getElement(142)};
	/**Mountain*/
	get Pet_Random_Name_143():ILanguageElement{return this.getElement(143)};
	/**Fedora*/
	get Pet_Random_Name_144():ILanguageElement{return this.getElement(144)};
	/**Philip*/
	get Pet_Random_Name_145():ILanguageElement{return this.getElement(145)};
	/**Uriah*/
	get Pet_Random_Name_146():ILanguageElement{return this.getElement(146)};
	/**Rebellious*/
	get Pet_Random_Name_147():ILanguageElement{return this.getElement(147)};
	/**Vandal*/
	get Pet_Random_Name_148():ILanguageElement{return this.getElement(148)};
	/**Ursa*/
	get Pet_Random_Name_149():ILanguageElement{return this.getElement(149)};
	/**Dirk*/
	get Pet_Random_Name_150():ILanguageElement{return this.getElement(150)};
	/**Shannon*/
	get Pet_Random_Name_151():ILanguageElement{return this.getElement(151)};
	/**Penelope*/
	get Pet_Random_Name_152():ILanguageElement{return this.getElement(152)};
	/**Primavera*/
	get Pet_Random_Name_153():ILanguageElement{return this.getElement(153)};
	/**Toby*/
	get Pet_Random_Name_154():ILanguageElement{return this.getElement(154)};
	/**Grant*/
	get Pet_Random_Name_155():ILanguageElement{return this.getElement(155)};
	/**Roxanne*/
	get Pet_Random_Name_156():ILanguageElement{return this.getElement(156)};
	/**Grateful*/
	get Pet_Random_Name_157():ILanguageElement{return this.getElement(157)};
	/**Lucinda*/
	get Pet_Random_Name_158():ILanguageElement{return this.getElement(158)};
	/**Justin*/
	get Pet_Random_Name_159():ILanguageElement{return this.getElement(159)};
	/**Tess*/
	get Pet_Random_Name_160():ILanguageElement{return this.getElement(160)};
	/**Stacy*/
	get Pet_Random_Name_161():ILanguageElement{return this.getElement(161)};
	/**Exalted*/
	get Pet_Random_Name_162():ILanguageElement{return this.getElement(162)};
	/**Ethen*/
	get Pet_Random_Name_163():ILanguageElement{return this.getElement(163)};
	/**Flora*/
	get Pet_Random_Name_164():ILanguageElement{return this.getElement(164)};
	/**Questa*/
	get Pet_Random_Name_165():ILanguageElement{return this.getElement(165)};
	/**Spencer*/
	get Pet_Random_Name_166():ILanguageElement{return this.getElement(166)};
	/**Lucas*/
	get Pet_Random_Name_167():ILanguageElement{return this.getElement(167)};
	/**Virtuous*/
	get Pet_Random_Name_168():ILanguageElement{return this.getElement(168)};
	/**Gregory*/
	get Pet_Random_Name_169():ILanguageElement{return this.getElement(169)};
	/**Harland*/
	get Pet_Random_Name_170():ILanguageElement{return this.getElement(170)};
	/**April*/
	get Pet_Random_Name_171():ILanguageElement{return this.getElement(171)};
	/**Orson*/
	get Pet_Random_Name_172():ILanguageElement{return this.getElement(172)};
	/**Bound*/
	get Pet_Random_Name_173():ILanguageElement{return this.getElement(173)};
	/**Adrienne*/
	get Pet_Random_Name_174():ILanguageElement{return this.getElement(174)};
	/**Julie*/
	get Pet_Random_Name_175():ILanguageElement{return this.getElement(175)};
	/**Counsellor*/
	get Pet_Random_Name_176():ILanguageElement{return this.getElement(176)};
	/**Primrose*/
	get Pet_Random_Name_177():ILanguageElement{return this.getElement(177)};
	/**Hunter*/
	get Pet_Random_Name_178():ILanguageElement{return this.getElement(178)};
	/**One*/
	get Pet_Random_Name_179():ILanguageElement{return this.getElement(179)};
	/**Rejoicing*/
	get Pet_Random_Name_180():ILanguageElement{return this.getElement(180)};
	/**Joan*/
	get Pet_Random_Name_181():ILanguageElement{return this.getElement(181)};
	/**Wolf*/
	get Pet_Random_Name_182():ILanguageElement{return this.getElement(182)};
	/**Max*/
	get Pet_Random_Name_183():ILanguageElement{return this.getElement(183)};
	/**Honour*/
	get Pet_Random_Name_184():ILanguageElement{return this.getElement(184)};
	/**Orva*/
	get Pet_Random_Name_185():ILanguageElement{return this.getElement(185)};
	/**Drew*/
	get Pet_Random_Name_186():ILanguageElement{return this.getElement(186)};
	/**Ivy*/
	get Pet_Random_Name_187():ILanguageElement{return this.getElement(187)};
	/**Lewis*/
	get Pet_Random_Name_188():ILanguageElement{return this.getElement(188)};
	/**Shawn*/
	get Pet_Random_Name_189():ILanguageElement{return this.getElement(189)};
	/**Sea*/
	get Pet_Random_Name_190():ILanguageElement{return this.getElement(190)};
	/**Fiery*/
	get Pet_Random_Name_191():ILanguageElement{return this.getElement(191)};
	/**Dark*/
	get Pet_Random_Name_192():ILanguageElement{return this.getElement(192)};
	/**United*/
	get Pet_Random_Name_193():ILanguageElement{return this.getElement(193)};
	/**Thomasina*/
	get Pet_Random_Name_194():ILanguageElement{return this.getElement(194)};
	/**Falcon*/
	get Pet_Random_Name_195():ILanguageElement{return this.getElement(195)};
	/**Imogene*/
	get Pet_Random_Name_196():ILanguageElement{return this.getElement(196)};
	/**Bella*/
	get Pet_Random_Name_197():ILanguageElement{return this.getElement(197)};
	/**Kane*/
	get Pet_Random_Name_198():ILanguageElement{return this.getElement(198)};
	/**Fiery*/
	get Pet_Random_Name_199():ILanguageElement{return this.getElement(199)};
	/**Norseman*/
	get Pet_Random_Name_200():ILanguageElement{return this.getElement(200)};
	/**小狗*/
	get PetARR_petName_1():ILanguageElement{return this.getElement(201)};
	/**小猫*/
	get PetARR_petName_2():ILanguageElement{return this.getElement(202)};
	/**粉兔*/
	get PetARR_petName_3():ILanguageElement{return this.getElement(203)};
	/**红耳兔*/
	get PetARR_petName_4():ILanguageElement{return this.getElement(204)};
	/**小橘犬*/
	get PetARR_petName_5():ILanguageElement{return this.getElement(205)};
	/**小牛*/
	get PetARR_petName_6():ILanguageElement{return this.getElement(206)};
	/**小猪*/
	get PetARR_petName_7():ILanguageElement{return this.getElement(207)};
	/**小鸡*/
	get PetARR_petName_8():ILanguageElement{return this.getElement(208)};
	/**黄鸡*/
	get PetARR_petName_9():ILanguageElement{return this.getElement(209)};
	/**粉红小狗*/
	get PetARR_petName_10():ILanguageElement{return this.getElement(210)};
	/**小羊*/
	get PetARR_petName_11():ILanguageElement{return this.getElement(211)};
	/**松鼠*/
	get PetARR_petName_12():ILanguageElement{return this.getElement(212)};
	/**棕熊*/
	get PetARR_petName_13():ILanguageElement{return this.getElement(213)};
	/**白熊*/
	get PetARR_petName_14():ILanguageElement{return this.getElement(214)};
	/**蝙蝠*/
	get PetARR_petName_15():ILanguageElement{return this.getElement(215)};
	/**小鹿*/
	get PetARR_petName_16():ILanguageElement{return this.getElement(216)};
	/**小狐狸*/
	get PetARR_petName_17():ILanguageElement{return this.getElement(217)};
	/**麋鹿*/
	get PetARR_petName_18():ILanguageElement{return this.getElement(218)};
	/**粉狐狸*/
	get PetARR_petName_19():ILanguageElement{return this.getElement(219)};
	/**粉红小猫*/
	get PetARR_petName_20():ILanguageElement{return this.getElement(220)};
	/**雪狗*/
	get PetARR_petName_21():ILanguageElement{return this.getElement(221)};
	/**雪猫*/
	get PetARR_petName_22():ILanguageElement{return this.getElement(222)};
	/**雪羊*/
	get PetARR_petName_23():ILanguageElement{return this.getElement(223)};
	/**黑白熊*/
	get PetARR_petName_24():ILanguageElement{return this.getElement(224)};
	/**蓝晶松鼠*/
	get PetARR_petName_25():ILanguageElement{return this.getElement(225)};
	/**小松鼠*/
	get PetARR_petName_26():ILanguageElement{return this.getElement(226)};
	/**雪鸡*/
	get PetARR_petName_27():ILanguageElement{return this.getElement(227)};
	/**雪牛*/
	get PetARR_petName_28():ILanguageElement{return this.getElement(228)};
	/**黄金牛*/
	get PetARR_petName_29():ILanguageElement{return this.getElement(229)};
	/**绿宝石羊*/
	get PetARR_petName_30():ILanguageElement{return this.getElement(230)};
	/**冰晶蝙蝠*/
	get PetARR_petName_31():ILanguageElement{return this.getElement(231)};
	/**黑夜蝙蝠*/
	get PetARR_petName_32():ILanguageElement{return this.getElement(232)};
	/**冰晶狐狸*/
	get PetARR_petName_33():ILanguageElement{return this.getElement(233)};
	/**冰晶鹿*/
	get PetARR_petName_34():ILanguageElement{return this.getElement(234)};
	/**黄金猪*/
	get PetARR_petName_35():ILanguageElement{return this.getElement(235)};
	/**蓝晶蝙蝠*/
	get PetARR_petName_36():ILanguageElement{return this.getElement(236)};
	/**小草猪*/
	get PetARR_petName_37():ILanguageElement{return this.getElement(237)};
	/**粉牛*/
	get PetARR_petName_38():ILanguageElement{return this.getElement(238)};
	/**蓝猫*/
	get PetARR_petName_39():ILanguageElement{return this.getElement(239)};
	/**雪猪*/
	get PetARR_petName_40():ILanguageElement{return this.getElement(240)};
	/**黄金鸡*/
	get PetARR_petName_41():ILanguageElement{return this.getElement(241)};
	/**粉红兔子*/
	get PetARR_petName_42():ILanguageElement{return this.getElement(242)};
	/**雪兔*/
	get PetARR_petName_43():ILanguageElement{return this.getElement(243)};
	/**小橘羊*/
	get PetARR_petName_44():ILanguageElement{return this.getElement(244)};
	/**雪松鼠*/
	get PetARR_petName_45():ILanguageElement{return this.getElement(245)};
	/**绿宝石狐*/
	get PetARR_petName_46():ILanguageElement{return this.getElement(246)};
	/**绿宝石熊*/
	get PetARR_petName_47():ILanguageElement{return this.getElement(247)};
	/**蓝晶鹿*/
	get PetARR_petName_48():ILanguageElement{return this.getElement(248)};
	/**普通*/
	get PetARR_Quality_1():ILanguageElement{return this.getElement(249)};
	/**稀有*/
	get PetARR_Quality_2():ILanguageElement{return this.getElement(250)};
	/**史诗*/
	get PetARR_Quality_3():ILanguageElement{return this.getElement(251)};
	/**传说*/
	get PetARR_Quality_4():ILanguageElement{return this.getElement(252)};
	/**爱心化*/
	get PetARR_Special_1():ILanguageElement{return this.getElement(253)};
	/**彩虹化*/
	get PetARR_Special_2():ILanguageElement{return this.getElement(254)};
	/**商店*/
	get AreaDivide_Name_1():ILanguageElement{return this.getElement(255)};
	/**城镇*/
	get AreaDivide_Name_2():ILanguageElement{return this.getElement(256)};
	/**森林*/
	get AreaDivide_Name_3():ILanguageElement{return this.getElement(257)};
	/**海滩*/
	get AreaDivide_Name_4():ILanguageElement{return this.getElement(258)};
	/**石矿*/
	get AreaDivide_Name_5():ILanguageElement{return this.getElement(259)};
	/**雪地*/
	get AreaDivide_Name_6():ILanguageElement{return this.getElement(260)};
	/**冰川*/
	get AreaDivide_Name_7():ILanguageElement{return this.getElement(261)};
	/**海底*/
	get AreaDivide_Name_8():ILanguageElement{return this.getElement(262)};
	/**沙漠*/
	get AreaDivide_Name_9():ILanguageElement{return this.getElement(263)};
	/**帐篷*/
	get AreaDivide_Name_10():ILanguageElement{return this.getElement(264)};
	/**秘密基地*/
	get AreaDivide_Name_11():ILanguageElement{return this.getElement(265)};
	/**初始大陆*/
	get AreaWorld_textUI_1():ILanguageElement{return this.getElement(266)};
	/**获得金币×{0}!*/
	get Tips_gift_1():ILanguageElement{return this.getElement(267)};
	/**获得钻石×{0}!*/
	get Tips_gift_2():ILanguageElement{return this.getElement(268)};
	/**获得特殊宠物!*/
	get Tips_gift_3():ILanguageElement{return this.getElement(269)};
	/**拥有{0}/{1}个宠物*/
	get Info_pet_1():ILanguageElement{return this.getElement(270)};
	/**领取进度{0}/12*/
	get Info_gift_1():ILanguageElement{return this.getElement(271)};
	/**只因哥*/
	get PetARR_petName_49():ILanguageElement{return this.getElement(272)};
	/**小老虎*/
	get PetARR_petName_50():ILanguageElement{return this.getElement(273)};
	/**小章鱼*/
	get PetARR_petName_51():ILanguageElement{return this.getElement(274)};
	/**让这只宠物充满爱心!*/
	get Dev_TextBlock_Intro_1():ILanguageElement{return this.getElement(275)};
	/**让这只宠物充满彩虹!*/
	get Dev_TextBlock_Intro_2():ILanguageElement{return this.getElement(276)};
	/**选择一只宠物使它充满爱心!*/
	get Dev_TextBlock_Explain_1():ILanguageElement{return this.getElement(277)};
	/**选择一只宠物使它充满彩虹!*/
	get Dev_TextBlock_Explain_2():ILanguageElement{return this.getElement(278)};
	/**融合{0}/12只宠物*/
	get Text_Fuse_UI_1():ILanguageElement{return this.getElement(279)};
	/**确认融合宠物？*/
	get Text_Fuse_UI_2():ILanguageElement{return this.getElement(280)};
	/**钻石不足!*/
	get Text_Fuse_UI_3():ILanguageElement{return this.getElement(281)};
	/**恭喜获得三倍攻击药水*/
	get Buff_buffname_1():ILanguageElement{return this.getElement(282)};
	/**恭喜获得三倍奖励药水*/
	get Buff_buffname_2():ILanguageElement{return this.getElement(283)};
	/**恭喜获得宠物孵化幸运药水*/
	get Buff_buffname_3():ILanguageElement{return this.getElement(284)};
	/**恭喜获得宠物孵化超级幸运药水*/
	get Buff_buffname_4():ILanguageElement{return this.getElement(285)};
	/**购买成功*/
	get Text_tips_1():ILanguageElement{return this.getElement(286)};
	/**是否花费{0}钻石来解锁？*/
	get Text_messagebox_1():ILanguageElement{return this.getElement(287)};
	/**钻石不足!*/
	get Text_tips_3():ILanguageElement{return this.getElement(288)};
	/**是否传送到扭蛋区*/
	get Text_messagebox_2():ILanguageElement{return this.getElement(289)};
	/**是否花费{0}金币购买*/
	get Text_messagebox_3():ILanguageElement{return this.getElement(290)};
	/**金币不足*/
	get Text_tips_4():ILanguageElement{return this.getElement(291)};
	/**宠物背包已满，可以通过背包删除*/
	get Text_messagebox_4():ILanguageElement{return this.getElement(292)};
	/**已获得*/
	get Text_ItemUI_1():ILanguageElement{return this.getElement(293)};
	/**可领取!*/
	get Text_ItemUI_2():ILanguageElement{return this.getElement(294)};
	/**注意:礼包已被领取*/
	get Text_tips_5():ILanguageElement{return this.getElement(295)};
	/**时间还没到哦~*/
	get Text_tips_6():ILanguageElement{return this.getElement(296)};
	/**卸载*/
	get button_1():ILanguageElement{return this.getElement(297)};
	/**装备*/
	get button_2():ILanguageElement{return this.getElement(298)};
	/**可以同时装备{0}个宠物*/
	get Page_UI_Tips_1():ILanguageElement{return this.getElement(299)};
	/**你的概率是{0}%，是否花费{1}钻石进行合成？*/
	get Page_UI_Tips_2():ILanguageElement{return this.getElement(300)};
	/**合成成功*/
	get Text_messagebox_5():ILanguageElement{return this.getElement(301)};
	/**合成失败*/
	get Text_messagebox_6():ILanguageElement{return this.getElement(302)};
	/**{0}只宠物*/
	get Page_UI_Tips_3():ILanguageElement{return this.getElement(303)};
	/**等级{0}*/
	get Page_UI_Tips_4():ILanguageElement{return this.getElement(304)};
	/**可交易*/
	get button_3():ILanguageElement{return this.getElement(305)};
	/**不可交易*/
	get button_4():ILanguageElement{return this.getElement(306)};
	/**冷却中*/
	get button_5():ILanguageElement{return this.getElement(307)};
	/**交易中*/
	get button_6():ILanguageElement{return this.getElement(308)};
	/**开启交易中*/
	get button_7():ILanguageElement{return this.getElement(309)};
	/**关闭交易中*/
	get button_8():ILanguageElement{return this.getElement(310)};
	/**{0}的宠物*/
	get User_pet():ILanguageElement{return this.getElement(311)};
	/**准备中*/
	get button_9():ILanguageElement{return this.getElement(312)};
	/**准备!*/
	get button_10():ILanguageElement{return this.getElement(313)};
	/**玩家{0}请求与你交易*/
	get Text_messagebox_7():ILanguageElement{return this.getElement(314)};
	/**交易完成*/
	get Text_messagebox_8():ILanguageElement{return this.getElement(315)};
	/**是否取消交易*/
	get Text_messagebox_9():ILanguageElement{return this.getElement(316)};
	/**是否确认交易*/
	get Text_messagebox_10():ILanguageElement{return this.getElement(317)};
	/**确认*/
	get button_11():ILanguageElement{return this.getElement(318)};
	/**是*/
	get button_12():ILanguageElement{return this.getElement(319)};
	/**否*/
	get button_13():ILanguageElement{return this.getElement(320)};
	/**{0}s后确认交易*/
	get Page_UI_Tips_5():ILanguageElement{return this.getElement(321)};
	/**不能删除,至少保留一个宠物*/
	get Text_messagebox_11():ILanguageElement{return this.getElement(322)};
	/**宠物跟随已满，无法装备*/
	get Text_messagebox_12():ILanguageElement{return this.getElement(323)};
	/**确定要删除吗？*/
	get Text_messagebox_13():ILanguageElement{return this.getElement(324)};
	/**交易了{0}个宠物 和 {1} 钻石 与{2}玩家*/
	get Text_messagebox_14():ILanguageElement{return this.getElement(325)};
	/**确认中*/
	get button_14():ILanguageElement{return this.getElement(326)};
	/**发送请求成功,等待对方回应*/
	get Text_messagebox_15():ILanguageElement{return this.getElement(327)};
	/**发送请求失败,对方正忙*/
	get Text_messagebox_16():ILanguageElement{return this.getElement(328)};
	/**玩家{0}拒绝交易请求*/
	get Text_messagebox_17():ILanguageElement{return this.getElement(329)};
	/**玩家{0} 取消了交易*/
	get Text_messagebox_18():ILanguageElement{return this.getElement(330)};
	/**小金鱼*/
	get PetARR_petName_52():ILanguageElement{return this.getElement(331)};
	/**小猴子*/
	get PetARR_petName_53():ILanguageElement{return this.getElement(332)};
	/**小鹦鹉*/
	get PetARR_petName_54():ILanguageElement{return this.getElement(333)};
	/**小乌龟*/
	get PetARR_petName_55():ILanguageElement{return this.getElement(334)};
	/**小鲨鱼*/
	get PetARR_petName_56():ILanguageElement{return this.getElement(335)};
	/**小海象*/
	get PetARR_petName_57():ILanguageElement{return this.getElement(336)};
	/**白虎*/
	get PetARR_petName_58():ILanguageElement{return this.getElement(337)};
	/**红金鱼*/
	get PetARR_petName_59():ILanguageElement{return this.getElement(338)};
	/**小企鹅*/
	get PetARR_petName_60():ILanguageElement{return this.getElement(339)};
	/**小雪人*/
	get PetARR_petName_61():ILanguageElement{return this.getElement(340)};
	/**白猿*/
	get PetARR_petName_62():ILanguageElement{return this.getElement(341)};
	/**剃刀龟*/
	get PetARR_petName_63():ILanguageElement{return this.getElement(342)};
	/**蓝雪人*/
	get PetARR_petName_64():ILanguageElement{return this.getElement(343)};
	/**救生鲨*/
	get PetARR_petName_65():ILanguageElement{return this.getElement(344)};
	/**蓝章鱼*/
	get PetARR_petName_66():ILanguageElement{return this.getElement(345)};
	/**蓝企鹅*/
	get PetARR_petName_67():ILanguageElement{return this.getElement(346)};
	/**五彩金刚*/
	get PetARR_petName_68():ILanguageElement{return this.getElement(347)};
	/**海豹*/
	get PetARR_petName_69():ILanguageElement{return this.getElement(348)};
	/**已经评价过了*/
	get Text_messagebox_19():ILanguageElement{return this.getElement(349)};
	/**选一只初始宠物吧!*/
	get Page_UI_Tips_6():ILanguageElement{return this.getElement(350)};
	/**确定!*/
	get button_15():ILanguageElement{return this.getElement(351)};
	/**确认关闭交易吗?*/
	get Text_messagebox_20():ILanguageElement{return this.getElement(352)};
	/**融合宠物!*/
	get Page_Title_1():ILanguageElement{return this.getElement(353)};
	/**融合!*/
	get button_16():ILanguageElement{return this.getElement(354)};
	/**玩游戏获得免费礼包*/
	get Page_UI_Tips_7():ILanguageElement{return this.getElement(355)};
	/**礼包包含超强力宠物!*/
	get Page_UI_Tips_8():ILanguageElement{return this.getElement(356)};
	/**免费礼包!*/
	get Page_Title_2():ILanguageElement{return this.getElement(357)};
	/**获取宠物!*/
	get Text_ItemUI_3():ILanguageElement{return this.getElement(358)};
	/**升级!*/
	get Page_Title_3():ILanguageElement{return this.getElement(359)};
	/**你会失去所有的选择合成的宠物!*/
	get Page_UI_Tips_9():ILanguageElement{return this.getElement(360)};
	/**金币吸收范围*/
	get Page_Title_4():ILanguageElement{return this.getElement(361)};
	/**获得更多钻石*/
	get Page_Title_5():ILanguageElement{return this.getElement(362)};
	/**宠物攻击力量*/
	get Page_Title_6():ILanguageElement{return this.getElement(363)};
	/**宠物攻击速度*/
	get Page_Title_7():ILanguageElement{return this.getElement(364)};
	/**背包宠物存储量*/
	get Page_Title_8():ILanguageElement{return this.getElement(365)};
	/**你的宠物!*/
	get Page_Title_9():ILanguageElement{return this.getElement(366)};
	/**收集宠物!*/
	get Page_Title_10():ILanguageElement{return this.getElement(367)};
	/**等级提升装备宠物上限+1*/
	get Page_UI_Tips_10():ILanguageElement{return this.getElement(368)};
	/**{0}拥有*/
	get Page_UI_Tips_11():ILanguageElement{return this.getElement(369)};
	/**为你的宠物起个昵称吧!*/
	get Page_UI_Tips_12():ILanguageElement{return this.getElement(370)};
	/**交易历史!*/
	get Page_Title_11():ILanguageElement{return this.getElement(371)};
	/**返回*/
	get button_17():ILanguageElement{return this.getElement(372)};
	/**发送*/
	get button_18():ILanguageElement{return this.getElement(373)};
	/**交易中心!*/
	get Page_Title_12():ILanguageElement{return this.getElement(374)};
	/**交易历史*/
	get button_19():ILanguageElement{return this.getElement(375)};
	/**确定好交易内容后点击准备按钮*/
	get Page_Title_13():ILanguageElement{return this.getElement(376)};
	/**靠近后点击按钮解锁*/
	get Page_Title_14():ILanguageElement{return this.getElement(377)};
	/**你在本次交易中不会获得任何物品，确认交易吗*/
	get Text_messagebox_21():ILanguageElement{return this.getElement(378)};
	/**你在本次交易中没有给予任何物品，确认交易吗*/
	get Text_messagebox_22():ILanguageElement{return this.getElement(379)};
	/**请确保这次交易是公平的*/
	get Text_messagebox_23():ILanguageElement{return this.getElement(380)};
	/**三倍奖励*/
	get Text_ItemUI_4():ILanguageElement{return this.getElement(381)};
	/**三倍攻击*/
	get Text_ItemUI_5():ILanguageElement{return this.getElement(382)};
	/**幸运*/
	get Text_ItemUI_6():ILanguageElement{return this.getElement(383)};
	/**超级幸运*/
	get Text_ItemUI_7():ILanguageElement{return this.getElement(384)};
	/**当前没有宠物在战斗，点击金币堆出战!*/
	get Text_tips_7():ILanguageElement{return this.getElement(385)};
	/**小黄龟*/
	get PetARR_petName_70():ILanguageElement{return this.getElement(386)};
	/**粉企鹅*/
	get PetARR_petName_71():ILanguageElement{return this.getElement(387)};
	/**黄章鱼*/
	get PetARR_petName_72():ILanguageElement{return this.getElement(388)};
	/**粉章鱼*/
	get PetARR_petName_73():ILanguageElement{return this.getElement(389)};
	/**墨绿海象*/
	get PetARR_petName_74():ILanguageElement{return this.getElement(390)};
	/**橙老虎*/
	get PetARR_petName_75():ILanguageElement{return this.getElement(391)};
	/**融化雪人*/
	get PetARR_petName_76():ILanguageElement{return this.getElement(392)};
	/**紫色雪人*/
	get PetARR_petName_77():ILanguageElement{return this.getElement(393)};
	/**确保背包中至少有一只宠物*/
	get Text_messagebox_24():ILanguageElement{return this.getElement(394)};
	/**选择3只以上的宠物进行融合*/
	get Page_UI_Tips_13():ILanguageElement{return this.getElement(395)};
	/**取消准备*/
	get Text_Trade_1():ILanguageElement{return this.getElement(396)};
	/**取消确认*/
	get Text_Trade_2():ILanguageElement{return this.getElement(397)};
	/**有全新的宠物蛋解锁了!快去看看吧~*/
	get Text_tips_8():ILanguageElement{return this.getElement(398)};
	/**神话*/
	get PetARR_Quality_5():ILanguageElement{return this.getElement(399)};
	/**金币Ⅰ*/
	get Enchants_Name_1():ILanguageElement{return this.getElement(400)};
	/**幻想币Ⅰ*/
	get Enchants_Name_2():ILanguageElement{return this.getElement(401)};
	/**科技币Ⅰ*/
	get Enchants_Name_3():ILanguageElement{return this.getElement(402)};
	/**团队合作*/
	get Enchants_Name_4():ILanguageElement{return this.getElement(403)};
	/**超级团队合作*/
	get Enchants_Name_5():ILanguageElement{return this.getElement(404)};
	/**魅力*/
	get Enchants_Name_6():ILanguageElement{return this.getElement(405)};
	/**力量Ⅰ*/
	get Enchants_Name_7():ILanguageElement{return this.getElement(406)};
	/**敏捷Ⅰ*/
	get Enchants_Name_8():ILanguageElement{return this.getElement(407)};
	/**钻石Ⅰ*/
	get Enchants_Name_9():ILanguageElement{return this.getElement(408)};
	/**宝箱破坏者Ⅰ*/
	get Enchants_Name_10():ILanguageElement{return this.getElement(409)};
	/**礼物Ⅰ*/
	get Enchants_Name_11():ILanguageElement{return this.getElement(410)};
	/**疯狂乘数Ⅰ*/
	get Enchants_Name_12():ILanguageElement{return this.getElement(411)};
	/**王权*/
	get Enchants_Name_13():ILanguageElement{return this.getElement(412)};
	/**磁铁*/
	get Enchants_Name_14():ILanguageElement{return this.getElement(413)};
	/**闪闪发光*/
	get Enchants_Name_15():ILanguageElement{return this.getElement(414)};
	/**宠物赚{0}%额外普通金币*/
	get Enchants_Describe_1():ILanguageElement{return this.getElement(415)};
	/**宠物赚{0}%额外幻想金币*/
	get Enchants_Describe_2():ILanguageElement{return this.getElement(416)};
	/**宠物赚{0}%额外科技币*/
	get Enchants_Describe_3():ILanguageElement{return this.getElement(417)};
	/**宠物与这只宠物一起造成更多的伤害（叠加）*/
	get Enchants_Describe_4():ILanguageElement{return this.getElement(418)};
	/**宠物与这只宠物一起造成超级多的伤害（叠加）*/
	get Enchants_Describe_5():ILanguageElement{return this.getElement(419)};
	/**你更容易暴击*/
	get Enchants_Describe_6():ILanguageElement{return this.getElement(420)};
	/**宠物造成{0}%额外伤害*/
	get Enchants_Describe_7():ILanguageElement{return this.getElement(421)};
	/**宠物移动增加{0}%额外速度*/
	get Enchants_Describe_8():ILanguageElement{return this.getElement(422)};
	/**宠物赚取{0}%额外钻石*/
	get Enchants_Describe_9():ILanguageElement{return this.getElement(423)};
	/**宠物对宝箱造成{0}%额外伤害*/
	get Enchants_Describe_10():ILanguageElement{return this.getElement(424)};
	/**被此宠物破坏的礼物收益多{0}%*/
	get Enchants_Describe_11():ILanguageElement{return this.getElement(425)};
	/**宠物打破超级金币中赚{0}%额外金币*/
	get Enchants_Describe_12():ILanguageElement{return this.getElement(426)};
	/**宠物+100%伤害，+100%钻石，+50%移速*/
	get Enchants_Describe_13():ILanguageElement{return this.getElement(427)};
	/**宠物可以为你收集金币钻石*/
	get Enchants_Describe_14():ILanguageElement{return this.getElement(428)};
	/**宠物随机生成钻石*/
	get Enchants_Describe_15():ILanguageElement{return this.getElement(429)};
	/**全部已领取*/
	get Text_ItemUI_8():ILanguageElement{return this.getElement(430)};
	/**容易*/
	get Achievement_Grade_1():ILanguageElement{return this.getElement(431)};
	/**简单*/
	get Achievement_Grade_2():ILanguageElement{return this.getElement(432)};
	/**中等*/
	get Achievement_Grade_3():ILanguageElement{return this.getElement(433)};
	/**困难*/
	get Achievement_Grade_4():ILanguageElement{return this.getElement(434)};
	/**疯狂*/
	get Achievement_Grade_5():ILanguageElement{return this.getElement(435)};
	/**孵蛋师*/
	get Achievement_Name_1():ILanguageElement{return this.getElement(436)};
	/**孵蛋师Ⅱ*/
	get Achievement_Name_2():ILanguageElement{return this.getElement(437)};
	/**孵蛋师Ⅲ*/
	get Achievement_Name_3():ILanguageElement{return this.getElement(438)};
	/**孵蛋专家*/
	get Achievement_Name_4():ILanguageElement{return this.getElement(439)};
	/**孵蛋专家Ⅱ*/
	get Achievement_Name_5():ILanguageElement{return this.getElement(440)};
	/**孵蛋专家Ⅲ*/
	get Achievement_Name_6():ILanguageElement{return this.getElement(441)};
	/**孵蛋精英*/
	get Achievement_Name_7():ILanguageElement{return this.getElement(442)};
	/**孵蛋精英Ⅱ*/
	get Achievement_Name_8():ILanguageElement{return this.getElement(443)};
	/**孵蛋精英Ⅲ*/
	get Achievement_Name_9():ILanguageElement{return this.getElement(444)};
	/**孵蛋冠军*/
	get Achievement_Name_10():ILanguageElement{return this.getElement(445)};
	/**孵蛋冠军Ⅱ*/
	get Achievement_Name_11():ILanguageElement{return this.getElement(446)};
	/**孵蛋冠军Ⅲ*/
	get Achievement_Name_12():ILanguageElement{return this.getElement(447)};
	/**孵蛋传奇*/
	get Achievement_Name_13():ILanguageElement{return this.getElement(448)};
	/**孵蛋传奇Ⅱ*/
	get Achievement_Name_14():ILanguageElement{return this.getElement(449)};
	/**孵蛋传奇Ⅲ*/
	get Achievement_Name_15():ILanguageElement{return this.getElement(450)};
	/**硬币收藏家*/
	get Achievement_Name_16():ILanguageElement{return this.getElement(451)};
	/**硬币收藏家Ⅱ*/
	get Achievement_Name_17():ILanguageElement{return this.getElement(452)};
	/**硬币收藏家Ⅲ*/
	get Achievement_Name_18():ILanguageElement{return this.getElement(453)};
	/**硬币专家*/
	get Achievement_Name_19():ILanguageElement{return this.getElement(454)};
	/**硬币专家Ⅱ*/
	get Achievement_Name_20():ILanguageElement{return this.getElement(455)};
	/**硬币专家Ⅲ*/
	get Achievement_Name_21():ILanguageElement{return this.getElement(456)};
	/**硬币精英*/
	get Achievement_Name_22():ILanguageElement{return this.getElement(457)};
	/**硬币精英Ⅱ*/
	get Achievement_Name_23():ILanguageElement{return this.getElement(458)};
	/**硬币精英Ⅲ*/
	get Achievement_Name_24():ILanguageElement{return this.getElement(459)};
	/**硬币冠军*/
	get Achievement_Name_25():ILanguageElement{return this.getElement(460)};
	/**硬币冠军Ⅱ*/
	get Achievement_Name_26():ILanguageElement{return this.getElement(461)};
	/**硬币冠军Ⅲ*/
	get Achievement_Name_27():ILanguageElement{return this.getElement(462)};
	/**硬币传奇*/
	get Achievement_Name_28():ILanguageElement{return this.getElement(463)};
	/**硬币传奇Ⅱ*/
	get Achievement_Name_29():ILanguageElement{return this.getElement(464)};
	/**硬币传奇Ⅲ*/
	get Achievement_Name_30():ILanguageElement{return this.getElement(465)};
	/**宝箱Ⅰ*/
	get Achievement_Name_31():ILanguageElement{return this.getElement(466)};
	/**宝箱Ⅱ*/
	get Achievement_Name_32():ILanguageElement{return this.getElement(467)};
	/**宝箱Ⅲ*/
	get Achievement_Name_33():ILanguageElement{return this.getElement(468)};
	/**宝箱Ⅳ*/
	get Achievement_Name_34():ILanguageElement{return this.getElement(469)};
	/**宝箱Ⅴ*/
	get Achievement_Name_35():ILanguageElement{return this.getElement(470)};
	/**宝箱Ⅵ*/
	get Achievement_Name_36():ILanguageElement{return this.getElement(471)};
	/**宝箱Ⅶ*/
	get Achievement_Name_37():ILanguageElement{return this.getElement(472)};
	/**宝箱Ⅷ*/
	get Achievement_Name_38():ILanguageElement{return this.getElement(473)};
	/**宝箱Ⅸ*/
	get Achievement_Name_39():ILanguageElement{return this.getElement(474)};
	/**宝箱Ⅹ*/
	get Achievement_Name_40():ILanguageElement{return this.getElement(475)};
	/**宝箱掠夺者*/
	get Achievement_Name_41():ILanguageElement{return this.getElement(476)};
	/**大海盗*/
	get Achievement_Name_42():ILanguageElement{return this.getElement(477)};
	/**海贼王*/
	get Achievement_Name_43():ILanguageElement{return this.getElement(478)};
	/**礼物Ⅰ*/
	get Achievement_Name_44():ILanguageElement{return this.getElement(479)};
	/**礼物Ⅱ*/
	get Achievement_Name_45():ILanguageElement{return this.getElement(480)};
	/**礼物Ⅲ*/
	get Achievement_Name_46():ILanguageElement{return this.getElement(481)};
	/**礼物Ⅳ*/
	get Achievement_Name_47():ILanguageElement{return this.getElement(482)};
	/**礼物Ⅴ*/
	get Achievement_Name_48():ILanguageElement{return this.getElement(483)};
	/**礼物Ⅵ*/
	get Achievement_Name_49():ILanguageElement{return this.getElement(484)};
	/**礼物Ⅶ*/
	get Achievement_Name_50():ILanguageElement{return this.getElement(485)};
	/**礼物Ⅷ*/
	get Achievement_Name_51():ILanguageElement{return this.getElement(486)};
	/**自我完善*/
	get Achievement_Name_52():ILanguageElement{return this.getElement(487)};
	/**大进步*/
	get Achievement_Name_53():ILanguageElement{return this.getElement(488)};
	/**完美*/
	get Achievement_Name_54():ILanguageElement{return this.getElement(489)};
	/**爱心初学者*/
	get Achievement_Name_55():ILanguageElement{return this.getElement(490)};
	/**爱心人士*/
	get Achievement_Name_56():ILanguageElement{return this.getElement(491)};
	/**爱心大使*/
	get Achievement_Name_57():ILanguageElement{return this.getElement(492)};
	/**爱心传奇*/
	get Achievement_Name_58():ILanguageElement{return this.getElement(493)};
	/**创造彩虹*/
	get Achievement_Name_59():ILanguageElement{return this.getElement(494)};
	/**双重彩虹*/
	get Achievement_Name_60():ILanguageElement{return this.getElement(495)};
	/**三重彩虹*/
	get Achievement_Name_61():ILanguageElement{return this.getElement(496)};
	/**全是彩虹*/
	get Achievement_Name_62():ILanguageElement{return this.getElement(497)};
	/**疯狂的科学家*/
	get Achievement_Name_63():ILanguageElement{return this.getElement(498)};
	/**实验室大师*/
	get Achievement_Name_64():ILanguageElement{return this.getElement(499)};
	/**融合专家*/
	get Achievement_Name_65():ILanguageElement{return this.getElement(500)};
	/**爱因斯坦*/
	get Achievement_Name_66():ILanguageElement{return this.getElement(501)};
	/**不幸者*/
	get Achievement_Name_67():ILanguageElement{return this.getElement(502)};
	/**倒霉透了*/
	get Achievement_Name_68():ILanguageElement{return this.getElement(503)};
	/**失败者*/
	get Achievement_Name_69():ILanguageElement{return this.getElement(504)};
	/**小精灵*/
	get Achievement_Name_70():ILanguageElement{return this.getElement(505)};
	/**小巫师*/
	get Achievement_Name_71():ILanguageElement{return this.getElement(506)};
	/**蛊惑精灵*/
	get Achievement_Name_72():ILanguageElement{return this.getElement(507)};
	/**至尊巫师*/
	get Achievement_Name_73():ILanguageElement{return this.getElement(508)};
	/**哈利波特*/
	get Achievement_Name_74():ILanguageElement{return this.getElement(509)};
	/**开始远征*/
	get Achievement_Name_75():ILanguageElement{return this.getElement(510)};
	/**建立旅程*/
	get Achievement_Name_76():ILanguageElement{return this.getElement(511)};
	/**稀有蛋!*/
	get Achievement_Name_77():ILanguageElement{return this.getElement(512)};
	/**史诗蛋!*/
	get Achievement_Name_78():ILanguageElement{return this.getElement(513)};
	/**神话蛋!*/
	get Achievement_Name_79():ILanguageElement{return this.getElement(514)};
	/**传说蛋!*/
	get Achievement_Name_80():ILanguageElement{return this.getElement(515)};
	/**幸运!*/
	get Achievement_Name_81():ILanguageElement{return this.getElement(516)};
	/**幸运女神!*/
	get Achievement_Name_82():ILanguageElement{return this.getElement(517)};
	/**运气真差!*/
	get Achievement_Name_83():ILanguageElement{return this.getElement(518)};
	/**被选中的人*/
	get Achievement_Name_84():ILanguageElement{return this.getElement(519)};
	/**彩虹本虹*/
	get Achievement_Name_85():ILanguageElement{return this.getElement(520)};
	/**黑魔法*/
	get Achievement_Name_86():ILanguageElement{return this.getElement(521)};
	/**法老遗迹*/
	get Achievement_Name_87():ILanguageElement{return this.getElement(522)};
	/**天使遗迹*/
	get Achievement_Name_88():ILanguageElement{return this.getElement(523)};
	/**云层之上*/
	get Achievement_Name_89():ILanguageElement{return this.getElement(524)};
	/**科技主宰*/
	get Achievement_Name_90():ILanguageElement{return this.getElement(525)};
	/**孵化{0}个宠物蛋*/
	get Achievement_Detail_1():ILanguageElement{return this.getElement(526)};
	/**挖矿{0}枚硬币*/
	get Achievement_Detail_2():ILanguageElement{return this.getElement(527)};
	/**打破 {0}个宝箱*/
	get Achievement_Detail_3():ILanguageElement{return this.getElement(528)};
	/**打破 {0}礼物*/
	get Achievement_Detail_4():ILanguageElement{return this.getElement(529)};
	/**升级成功{0}次*/
	get Achievement_Detail_5():ILanguageElement{return this.getElement(530)};
	/**将{0}只宠物成功转换为爱心化*/
	get Achievement_Detail_6():ILanguageElement{return this.getElement(531)};
	/**将{0}只宠物成功转换为彩虹化*/
	get Achievement_Detail_7():ILanguageElement{return this.getElement(532)};
	/**融合宠物{0}次*/
	get Achievement_Detail_8():ILanguageElement{return this.getElement(533)};
	/**爱心化失败{0}次*/
	get Achievement_Detail_9():ILanguageElement{return this.getElement(534)};
	/**附魔{0}只宠物*/
	get Achievement_Detail_10():ILanguageElement{return this.getElement(535)};
	/**解锁 3 个区域*/
	get Achievement_Detail_11():ILanguageElement{return this.getElement(536)};
	/**再次解锁 3 个区域*/
	get Achievement_Detail_12():ILanguageElement{return this.getElement(537)};
	/**孵化出稀有宠物*/
	get Achievement_Detail_13():ILanguageElement{return this.getElement(538)};
	/**孵化出史诗宠物*/
	get Achievement_Detail_14():ILanguageElement{return this.getElement(539)};
	/**孵化出传奇宠物*/
	get Achievement_Detail_15():ILanguageElement{return this.getElement(540)};
	/**孵化出神话宠物*/
	get Achievement_Detail_16():ILanguageElement{return this.getElement(541)};
	/**使用一只宠物爱心化成功*/
	get Achievement_Detail_17():ILanguageElement{return this.getElement(542)};
	/**使用一只传说宠物黄金化成功*/
	get Achievement_Detail_18():ILanguageElement{return this.getElement(543)};
	/**使用五只宠物爱心化失败*/
	get Achievement_Detail_19():ILanguageElement{return this.getElement(544)};
	/**融合出了传奇宠物*/
	get Achievement_Detail_20():ILanguageElement{return this.getElement(545)};
	/**使用一只传奇宠物彩虹化成功*/
	get Achievement_Detail_21():ILanguageElement{return this.getElement(546)};
	/**宠物附魔独特的标签成功*/
	get Achievement_Detail_22():ILanguageElement{return this.getElement(547)};
	/**击破沙漠大宝箱*/
	get Achievement_Detail_23():ILanguageElement{return this.getElement(548)};
	/**击破天堂大宝箱*/
	get Achievement_Detail_24():ILanguageElement{return this.getElement(549)};
	/**到达幻想世界*/
	get Achievement_Detail_25():ILanguageElement{return this.getElement(550)};
	/**到达科技世界*/
	get Achievement_Detail_26():ILanguageElement{return this.getElement(551)};
	/**成就!*/
	get Achievement_UIname_1():ILanguageElement{return this.getElement(552)};
	/**完成*/
	get Achievement_UIname_2():ILanguageElement{return this.getElement(553)};
	/**启动蛋*/
	get Egg_Areaname_1():ILanguageElement{return this.getElement(554)};
	/**森林蛋*/
	get Egg_Areaname_2():ILanguageElement{return this.getElement(555)};
	/**沙滩蛋*/
	get Egg_Areaname_3():ILanguageElement{return this.getElement(556)};
	/**矿区蛋*/
	get Egg_Areaname_4():ILanguageElement{return this.getElement(557)};
	/**雪地蛋*/
	get Egg_Areaname_5():ILanguageElement{return this.getElement(558)};
	/**冰川蛋*/
	get Egg_Areaname_6():ILanguageElement{return this.getElement(559)};
	/**海底蛋*/
	get Egg_Areaname_7():ILanguageElement{return this.getElement(560)};
	/**沙漠蛋*/
	get Egg_Areaname_8():ILanguageElement{return this.getElement(561)};
	/**魔法蛋*/
	get Egg_Areaname_9():ILanguageElement{return this.getElement(562)};
	/**遗迹蛋*/
	get Egg_Areaname_10():ILanguageElement{return this.getElement(563)};
	/**古风蛋*/
	get Egg_Areaname_11():ILanguageElement{return this.getElement(564)};
	/**糖果蛋*/
	get Egg_Areaname_12():ILanguageElement{return this.getElement(565)};
	/**鬼魂蛋*/
	get Egg_Areaname_13():ILanguageElement{return this.getElement(566)};
	/**地狱蛋*/
	get Egg_Areaname_14():ILanguageElement{return this.getElement(567)};
	/**天国蛋*/
	get Egg_Areaname_15():ILanguageElement{return this.getElement(568)};
	/**天堂蛋*/
	get Egg_Areaname_16():ILanguageElement{return this.getElement(569)};
	/**最好的伙伴*/
	get Enchants_Name_16():ILanguageElement{return this.getElement(570)};
	/**比你背包中4只最强宠物平均更厉害<color=#ED7E27ff>(独有,不可附魔)</color>*/
	get Enchants_Describe_16():ILanguageElement{return this.getElement(571)};
	/**你确定吗?*/
	get Tips_Enchants_1():ILanguageElement{return this.getElement(572)};
	/**你确定吗？附魔会被重置*/
	get Tips_Enchants_2():ILanguageElement{return this.getElement(573)};
	/**这些宠物已经有了所需的附魔*/
	get Tips_Enchants_3():ILanguageElement{return this.getElement(574)};
	/**已有的附魔会被重置*/
	get Tips_Enchants_4():ILanguageElement{return this.getElement(575)};
	/**附魔你的宠物,直到他获得你选择的任意词条*/
	get Tips_Enchants_5():ILanguageElement{return this.getElement(576)};
	/**附魔成功!*/
	get Tips_Enchants_6():ILanguageElement{return this.getElement(577)};
	/**附魔*/
	get Tips_Enchants_7():ILanguageElement{return this.getElement(578)};
	/**停止*/
	get Tips_Enchants_8():ILanguageElement{return this.getElement(579)};
	/**在城镇破坏{0}个金币堆*/
	get Task_Info_1():ILanguageElement{return this.getElement(580)};
	/**在启动蛋孵化{0}只宠物*/
	get Task_Info_2():ILanguageElement{return this.getElement(581)};
	/**在城镇打破{0}个金币箱子*/
	get Task_Info_3():ILanguageElement{return this.getElement(582)};
	/**森林中破坏{0}个礼物盒*/
	get Task_Info_4():ILanguageElement{return this.getElement(583)};
	/**进行{0}次升级*/
	get Task_Info_5():ILanguageElement{return this.getElement(584)};
	/**在森林蛋中孵化{0}只宠物*/
	get Task_Info_6():ILanguageElement{return this.getElement(585)};
	/**在海滩打破{0}个钻石箱子*/
	get Task_Info_7():ILanguageElement{return this.getElement(586)};
	/**使用爱心化机器{0}次*/
	get Task_Info_8():ILanguageElement{return this.getElement(587)};
	/**融合出{0}只稀有以上的宠物*/
	get Task_Info_9():ILanguageElement{return this.getElement(588)};
	/**从矿区蛋中孵化{0}只宠物*/
	get Task_Info_10():ILanguageElement{return this.getElement(589)};
	/**使用彩虹化机器{0}次*/
	get Task_Info_11():ILanguageElement{return this.getElement(590)};
	/**打破封闭宝箱{0}个*/
	get Task_Info_12():ILanguageElement{return this.getElement(591)};
	/**在雪地破坏{0}个礼物盒*/
	get Task_Info_13():ILanguageElement{return this.getElement(592)};
	/**在雪地蛋中孵化{0}只史诗宠物*/
	get Task_Info_14():ILanguageElement{return this.getElement(593)};
	/**在雪地破坏{0}个金币箱子*/
	get Task_Info_15():ILanguageElement{return this.getElement(594)};
	/**成功完成{0}次交易*/
	get Task_Info_16():ILanguageElement{return this.getElement(595)};
	/**在冰川蛋中孵化{0}只宠物*/
	get Task_Info_17():ILanguageElement{return this.getElement(596)};
	/**在冰川打破{0}个金币箱子*/
	get Task_Info_18():ILanguageElement{return this.getElement(597)};
	/**在海底打破{0}个钻石*/
	get Task_Info_19():ILanguageElement{return this.getElement(598)};
	/**从海底蛋中孵化{0}只稀有以上的宠物*/
	get Task_Info_20():ILanguageElement{return this.getElement(599)};
	/**在海底打破{0}个金币箱子*/
	get Task_Info_21():ILanguageElement{return this.getElement(600)};
	/**在沙漠打破{0}个巨型箱子*/
	get Task_Info_22():ILanguageElement{return this.getElement(601)};
	/**在沙漠蛋中孵化出{0}只传说宠物*/
	get Task_Info_23():ILanguageElement{return this.getElement(602)};
	/**完成{0}次交易*/
	get Task_Info_24():ILanguageElement{return this.getElement(603)};
	/**在魔法蛋中孵化{0}只宠物*/
	get Task_Info_25():ILanguageElement{return this.getElement(604)};
	/**在魔法森林破坏{0}个金币箱子*/
	get Task_Info_26():ILanguageElement{return this.getElement(605)};
	/**使用附魔机{0}次 */
	get Task_Info_27():ILanguageElement{return this.getElement(606)};
	/**在遗迹岛打破{0}个礼物盒*/
	get Task_Info_28():ILanguageElement{return this.getElement(607)};
	/**在遗迹蛋中孵化{0}只宠物*/
	get Task_Info_29():ILanguageElement{return this.getElement(608)};
	/**在遗迹岛打破{0}次巨型箱子*/
	get Task_Info_30():ILanguageElement{return this.getElement(609)};
	/**完成{0}次交易*/
	get Task_Info_31():ILanguageElement{return this.getElement(610)};
	/**在武士蛋孵化{0}只传奇宠物*/
	get Task_Info_32():ILanguageElement{return this.getElement(611)};
	/**在武士岛破坏{0}个钻石*/
	get Task_Info_33():ILanguageElement{return this.getElement(612)};
	/**任务专属蛋*/
	get Task_shop_1():ILanguageElement{return this.getElement(613)};
	/**SO-10滑板*/
	get Task_shop_2():ILanguageElement{return this.getElement(614)};
	/**+1宠物位!*/
	get Task_shop_3():ILanguageElement{return this.getElement(615)};
	/**更大的背包!*/
	get Task_shop_4():ILanguageElement{return this.getElement(616)};
	/**成堆的钻石*/
	get Task_shop_5():ILanguageElement{return this.getElement(617)};
	/**一包钻石*/
	get Task_shop_6():ILanguageElement{return this.getElement(618)};
	/**小袋钻石*/
	get Task_shop_7():ILanguageElement{return this.getElement(619)};
	/**兑换SO-10超级滑板*/
	get Task_shop_8():ILanguageElement{return this.getElement(620)};
	/**同时可装备宠物数量+1!*/
	get Task_shop_9():ILanguageElement{return this.getElement(621)};
	/**宠物背包容量+10!*/
	get Task_shop_10():ILanguageElement{return this.getElement(622)};
	/**马上更新!*/
	get Task_shop_11():ILanguageElement{return this.getElement(623)};
	/**等待发布~*/
	get Task_shop_12():ILanguageElement{return this.getElement(624)};
	/**你还没有滑板，通过任务商店获得*/
	get Tips_huaban_1():ILanguageElement{return this.getElement(625)};
	/**你确认花费{0}任务点数购买这个物品吗？*/
	get Task_shop_13():ILanguageElement{return this.getElement(626)};
	/**你还需要{0}任务点数才能购买!*/
	get Task_shop_14():ILanguageElement{return this.getElement(627)};
	/**幻想商店*/
	get AreaDivide_Name_12():ILanguageElement{return this.getElement(628)};
	/**传送门*/
	get AreaDivide_Name_13():ILanguageElement{return this.getElement(629)};
	/**魔法森林*/
	get AreaDivide_Name_14():ILanguageElement{return this.getElement(630)};
	/**神秘遗迹*/
	get AreaDivide_Name_15():ILanguageElement{return this.getElement(631)};
	/**古风庭院*/
	get AreaDivide_Name_16():ILanguageElement{return this.getElement(632)};
	/**商品已经兑换过了~*/
	get Task_shop_15():ILanguageElement{return this.getElement(633)};
	/**幻想世界*/
	get AreaWorld_textUI_2():ILanguageElement{return this.getElement(634)};
	/**正在进入{0}...*/
	get Loading_Text_1():ILanguageElement{return this.getElement(635)};
	/**美洲猴*/
	get PetARR_petName_78():ILanguageElement{return this.getElement(636)};
	/**印第安雪人*/
	get PetARR_petName_79():ILanguageElement{return this.getElement(637)};
	/**鹦鹉玄凤*/
	get PetARR_petName_80():ILanguageElement{return this.getElement(638)};
	/**森林鹿*/
	get PetARR_petName_81():ILanguageElement{return this.getElement(639)};
	/**仙灵*/
	get PetARR_petName_82():ILanguageElement{return this.getElement(640)};
	/**埃及金鱼*/
	get PetARR_petName_83():ILanguageElement{return this.getElement(641)};
	/**埃及章鱼*/
	get PetARR_petName_84():ILanguageElement{return this.getElement(642)};
	/**埃及鲨鱼*/
	get PetARR_petName_85():ILanguageElement{return this.getElement(643)};
	/**埃及鹿*/
	get PetARR_petName_86():ILanguageElement{return this.getElement(644)};
	/**埃及仙灵*/
	get PetARR_petName_87():ILanguageElement{return this.getElement(645)};
	/**眼镜蛇*/
	get PetARR_petName_88():ILanguageElement{return this.getElement(646)};
	/**阿努比斯*/
	get PetARR_petName_89():ILanguageElement{return this.getElement(647)};
	/**武士老虎*/
	get PetARR_petName_90():ILanguageElement{return this.getElement(648)};
	/**武士海象*/
	get PetARR_petName_91():ILanguageElement{return this.getElement(649)};
	/**武士企鹅*/
	get PetARR_petName_92():ILanguageElement{return this.getElement(650)};
	/**武士蛇*/
	get PetARR_petName_93():ILanguageElement{return this.getElement(651)};
	/**武士阿努比斯*/
	get PetARR_petName_94():ILanguageElement{return this.getElement(652)};
	/**武士龙*/
	get PetARR_petName_95():ILanguageElement{return this.getElement(653)};
	/**特别奖励*/
	get Task_shop_16():ILanguageElement{return this.getElement(654)};
	/**钻石包*/
	get Task_shop_17():ILanguageElement{return this.getElement(655)};
	/**任务完成并获得+{0}任务点数*/
	get Task_shop_18():ILanguageElement{return this.getElement(656)};
	/**{0}任务点数*/
	get Task_shop_19():ILanguageElement{return this.getElement(657)};
	/**未附魔*/
	get Tips_Enchants_9():ILanguageElement{return this.getElement(658)};
	/**{0}幻想币*/
	get Portol_Tip_1():ILanguageElement{return this.getElement(659)};
	/**尚未开放*/
	get Portol_Tip_2():ILanguageElement{return this.getElement(660)};
	/**美洲虎*/
	get PetARR_petName_96():ILanguageElement{return this.getElement(661)};
	/**美洲龟*/
	get PetARR_petName_97():ILanguageElement{return this.getElement(662)};
	/**金币Ⅱ*/
	get Enchants_Name_17():ILanguageElement{return this.getElement(663)};
	/**金币Ⅲ*/
	get Enchants_Name_18():ILanguageElement{return this.getElement(664)};
	/**金币Ⅳ*/
	get Enchants_Name_19():ILanguageElement{return this.getElement(665)};
	/**金币Ⅴ*/
	get Enchants_Name_20():ILanguageElement{return this.getElement(666)};
	/**幻想币Ⅱ*/
	get Enchants_Name_21():ILanguageElement{return this.getElement(667)};
	/**幻想币Ⅲ*/
	get Enchants_Name_22():ILanguageElement{return this.getElement(668)};
	/**幻想币Ⅳ*/
	get Enchants_Name_23():ILanguageElement{return this.getElement(669)};
	/**幻想币Ⅴ*/
	get Enchants_Name_24():ILanguageElement{return this.getElement(670)};
	/**科技币Ⅱ*/
	get Enchants_Name_25():ILanguageElement{return this.getElement(671)};
	/**科技币Ⅲ*/
	get Enchants_Name_26():ILanguageElement{return this.getElement(672)};
	/**科技币Ⅳ*/
	get Enchants_Name_27():ILanguageElement{return this.getElement(673)};
	/**科技币Ⅴ*/
	get Enchants_Name_28():ILanguageElement{return this.getElement(674)};
	/**力量Ⅱ*/
	get Enchants_Name_29():ILanguageElement{return this.getElement(675)};
	/**力量Ⅲ*/
	get Enchants_Name_30():ILanguageElement{return this.getElement(676)};
	/**力量Ⅳ*/
	get Enchants_Name_31():ILanguageElement{return this.getElement(677)};
	/**力量Ⅴ*/
	get Enchants_Name_32():ILanguageElement{return this.getElement(678)};
	/**敏捷Ⅱ*/
	get Enchants_Name_33():ILanguageElement{return this.getElement(679)};
	/**敏捷Ⅲ*/
	get Enchants_Name_34():ILanguageElement{return this.getElement(680)};
	/**钻石Ⅱ*/
	get Enchants_Name_35():ILanguageElement{return this.getElement(681)};
	/**钻石Ⅲ*/
	get Enchants_Name_36():ILanguageElement{return this.getElement(682)};
	/**钻石Ⅳ*/
	get Enchants_Name_37():ILanguageElement{return this.getElement(683)};
	/**钻石Ⅴ*/
	get Enchants_Name_38():ILanguageElement{return this.getElement(684)};
	/**宝箱破坏者Ⅱ*/
	get Enchants_Name_39():ILanguageElement{return this.getElement(685)};
	/**宝箱破坏者Ⅲ*/
	get Enchants_Name_40():ILanguageElement{return this.getElement(686)};
	/**礼物Ⅱ*/
	get Enchants_Name_41():ILanguageElement{return this.getElement(687)};
	/**礼物Ⅲ*/
	get Enchants_Name_42():ILanguageElement{return this.getElement(688)};
	/**疯狂乘数Ⅱ*/
	get Enchants_Name_43():ILanguageElement{return this.getElement(689)};
	/**疯狂乘数Ⅲ*/
	get Enchants_Name_44():ILanguageElement{return this.getElement(690)};
	/**疯狂乘数Ⅳ*/
	get Enchants_Name_45():ILanguageElement{return this.getElement(691)};
	/**疯狂乘数Ⅴ*/
	get Enchants_Name_46():ILanguageElement{return this.getElement(692)};
	/**SO-10*/
	get PetARR_petName_98():ILanguageElement{return this.getElement(693)};
	/**巨大·SO-10*/
	get PetARR_petName_99():ILanguageElement{return this.getElement(694)};
	/**背包扩展+{0}*/
	get Achievement_Detail_27():ILanguageElement{return this.getElement(695)};
	/**粉红糖果*/
	get AreaDivide_Name_17():ILanguageElement{return this.getElement(696)};
	/**黑暗墓林*/
	get AreaDivide_Name_18():ILanguageElement{return this.getElement(697)};
	/**岩浆地狱*/
	get AreaDivide_Name_19():ILanguageElement{return this.getElement(698)};
	/**天国之泪*/
	get AreaDivide_Name_20():ILanguageElement{return this.getElement(699)};
	/**天堂世界*/
	get AreaDivide_Name_21():ILanguageElement{return this.getElement(700)};
	/**近*/
	get Button_view_1():ILanguageElement{return this.getElement(701)};
	/**远*/
	get Button_view_2():ILanguageElement{return this.getElement(702)};
	/**恢复*/
	get Button_view_3():ILanguageElement{return this.getElement(703)};
	/**点击金币*/
	get World_3D_1():ILanguageElement{return this.getElement(704)};
	/**点击金币堆获得金币*/
	get World_3D_2():ILanguageElement{return this.getElement(705)};
	/**爱心化!*/
	get World_3D_3():ILanguageElement{return this.getElement(706)};
	/**将宠物爱心化提升攻击力*/
	get World_3D_4():ILanguageElement{return this.getElement(707)};
	/**哇哦!*/
	get UI_pagename_1():ILanguageElement{return this.getElement(708)};
	/**任务商店!*/
	get UI_pagename_2():ILanguageElement{return this.getElement(709)};
	/**附魔宠物!*/
	get UI_pagename_3():ILanguageElement{return this.getElement(710)};
	/**已有附魔会被重置*/
	get UI_pageinfo_1():ILanguageElement{return this.getElement(711)};
	/**为宠物添加额外能力*/
	get World_3D_5():ILanguageElement{return this.getElement(712)};
	/**~任务~*/
	get World_3D_6():ILanguageElement{return this.getElement(713)};
	/**商店*/
	get World_3D_7():ILanguageElement{return this.getElement(714)};
	/**靠近后点击按钮解锁*/
	get World_3D_8():ILanguageElement{return this.getElement(715)};
	/**融合!*/
	get World_3D_9():ILanguageElement{return this.getElement(716)};
	/**融合多只宠物看看会出现什么吧*/
	get World_3D_10():ILanguageElement{return this.getElement(717)};
	/**彩虹化!*/
	get World_3D_11():ILanguageElement{return this.getElement(718)};
	/**将宠物彩虹化提升攻击力*/
	get World_3D_12():ILanguageElement{return this.getElement(719)};
	/**升级!*/
	get World_3D_13():ILanguageElement{return this.getElement(720)};
	/**进入机器点击升级按钮提升属性*/
	get World_3D_14():ILanguageElement{return this.getElement(721)};
	/**解锁图鉴等级*/
	get UI_pageinfo_2():ILanguageElement{return this.getElement(722)};
	/**注意!*/
	get UI_pagename_4():ILanguageElement{return this.getElement(723)};
	/**好的!*/
	get UI_pagename_5():ILanguageElement{return this.getElement(724)};
	/**加速中...*/
	get World_3D_15():ILanguageElement{return this.getElement(725)};
	/**快速旅行!*/
	get UI_pagename_6():ILanguageElement{return this.getElement(726)};
	/**~世界~*/
	get UI_pagename_7():ILanguageElement{return this.getElement(727)};
	/**选择词条*/
	get UI_pagename_8():ILanguageElement{return this.getElement(728)};
	/**小鹿*/
	get PetARR_petName_100():ILanguageElement{return this.getElement(729)};
	/**绿蛇*/
	get PetARR_petName_101():ILanguageElement{return this.getElement(730)};
	/**毒蛇*/
	get PetARR_petName_102():ILanguageElement{return this.getElement(731)};
	/**糖果阿努比斯*/
	get PetARR_petName_103():ILanguageElement{return this.getElement(732)};
	/**糖果龙*/
	get PetARR_petName_104():ILanguageElement{return this.getElement(733)};
	/**恶魔龟*/
	get PetARR_petName_105():ILanguageElement{return this.getElement(734)};
	/**恶魔雪人*/
	get PetARR_petName_106():ILanguageElement{return this.getElement(735)};
	/**恶魔企鹅*/
	get PetARR_petName_107():ILanguageElement{return this.getElement(736)};
	/**恶魔海象*/
	get PetARR_petName_108():ILanguageElement{return this.getElement(737)};
	/**恶魔仙灵*/
	get PetARR_petName_109():ILanguageElement{return this.getElement(738)};
	/**恶魔猫*/
	get PetARR_petName_110():ILanguageElement{return this.getElement(739)};
	/**恶魔三头犬*/
	get PetARR_petName_111():ILanguageElement{return this.getElement(740)};
	/**地狱龟*/
	get PetARR_petName_112():ILanguageElement{return this.getElement(741)};
	/**地狱雪人*/
	get PetARR_petName_113():ILanguageElement{return this.getElement(742)};
	/**地狱企鹅*/
	get PetARR_petName_114():ILanguageElement{return this.getElement(743)};
	/**地狱海象*/
	get PetARR_petName_115():ILanguageElement{return this.getElement(744)};
	/**地狱龙*/
	get PetARR_petName_116():ILanguageElement{return this.getElement(745)};
	/**地狱蜘蛛*/
	get PetARR_petName_117():ILanguageElement{return this.getElement(746)};
	/**地狱三头犬*/
	get PetARR_petName_118():ILanguageElement{return this.getElement(747)};
	/**天使企鹅*/
	get PetARR_petName_119():ILanguageElement{return this.getElement(748)};
	/**天使章鱼*/
	get PetARR_petName_120():ILanguageElement{return this.getElement(749)};
	/**天使鹦鹉*/
	get PetARR_petName_121():ILanguageElement{return this.getElement(750)};
	/**天使猴子*/
	get PetARR_petName_122():ILanguageElement{return this.getElement(751)};
	/**天使蜘蛛*/
	get PetARR_petName_123():ILanguageElement{return this.getElement(752)};
	/**帝王企鹅*/
	get PetARR_petName_124():ILanguageElement{return this.getElement(753)};
	/**帝王章鱼*/
	get PetARR_petName_125():ILanguageElement{return this.getElement(754)};
	/**帝王鹦鹉*/
	get PetARR_petName_126():ILanguageElement{return this.getElement(755)};
	/**帝王三头犬*/
	get PetARR_petName_127():ILanguageElement{return this.getElement(756)};
	/**帝王龙*/
	get PetARR_petName_128():ILanguageElement{return this.getElement(757)};
	/**夏日企鹅*/
	get PetARR_petName_129():ILanguageElement{return this.getElement(758)};
	/**夏日章鱼*/
	get PetARR_petName_130():ILanguageElement{return this.getElement(759)};
	/**要花费一个娃娃机币玩抓娃娃机吗？*/
	get Claw_Tips_1():ILanguageElement{return this.getElement(760)};
	/**娃娃机币不足！
可以通过每日奖励获得娃娃机币！*/
	get Claw_Tips_2():ILanguageElement{return this.getElement(761)};
	/**其他玩家在用抓娃娃机！*/
	get Claw_Tips_3():ILanguageElement{return this.getElement(762)};
	/**抓娃娃娃娃机！！！*/
	get Claw_Tips_4():ILanguageElement{return this.getElement(763)};
	/**用一个娃娃机币玩娃娃机*/
	get Claw_Tips_5():ILanguageElement{return this.getElement(764)};
	/**正在使用中*/
	get Claw_Tips_6():ILanguageElement{return this.getElement(765)};
	/**活动中！获得娃娃机币！*/
	get Claw_Tips_7():ILanguageElement{return this.getElement(766)};
	/**删除*/
	get UIBUTTON1():ILanguageElement{return this.getElement(767)};
	/**取消*/
	get UIBUTTON2():ILanguageElement{return this.getElement(768)};
	/**为你的宠物起昵称吧!*/
	get pet_uiinfo1():ILanguageElement{return this.getElement(769)};
	/**排行榜*/
	get Rank_Title_1():ILanguageElement{return this.getElement(770)};
	/**钻石数量排行*/
	get Rank_Title_2():ILanguageElement{return this.getElement(771)};
	/**图鉴收集排行*/
	get Rank_Title_3():ILanguageElement{return this.getElement(772)};
	/**是否传送回第一世界*/
	get Portol_Tip_3():ILanguageElement{return this.getElement(773)};
	/**活动进行中！每天都有新宠物！点击娃娃机中央红色按钮，获得限定宠物！*/
	get Claw_Tips_8():ILanguageElement{return this.getElement(774)};
	/**获得传说级宠物！*/
	get World_Tips_1():ILanguageElement{return this.getElement(775)};
	/**获得神话级宠物！*/
	get World_Tips_2():ILanguageElement{return this.getElement(776)};
	/**获得限时宠物！*/
	get World_Tips_3():ILanguageElement{return this.getElement(777)};
	/**获得任务宠物！*/
	get World_Tips_4():ILanguageElement{return this.getElement(778)};
	/**获得超稀有巨大化宠物！*/
	get World_Tips_5():ILanguageElement{return this.getElement(779)};
	/**正在攻击沙漠大宝箱，快来和他一起吧！*/
	get World_Tips_6():ILanguageElement{return this.getElement(780)};
	/**正在攻击秘密大宝箱，快来和他一起吧！*/
	get World_Tips_7():ILanguageElement{return this.getElement(781)};
	/**正在攻击遗迹大宝箱，快来和他一起吧！*/
	get World_Tips_8():ILanguageElement{return this.getElement(782)};
	/**正在攻击天堂大宝箱，快来和他一起吧！*/
	get World_Tips_9():ILanguageElement{return this.getElement(783)};
	/**已经升级到50%啦！*/
	get World_Tips_10():ILanguageElement{return this.getElement(784)};
	/**已经升级到100%啦！*/
	get World_Tips_11():ILanguageElement{return this.getElement(785)};
	/**已经拥有{0}只宠物啦，快去看看吧！*/
	get World_Tips_12():ILanguageElement{return this.getElement(786)};
	/**到达第二世界！*/
	get World_Tips_13():ILanguageElement{return this.getElement(787)};
	/**获得传说级附魔王权！*/
	get World_Tips_14():ILanguageElement{return this.getElement(788)};
	/**获得传说级附魔磁铁！*/
	get World_Tips_15():ILanguageElement{return this.getElement(789)};
	/**获得传说级附魔闪闪发光！*/
	get World_Tips_16():ILanguageElement{return this.getElement(790)};
	/**恐龙抗狼*/
	get PetARR_petName_131():ILanguageElement{return this.getElement(791)};
	/**糖果龙抗狼*/
	get PetARR_petName_132():ILanguageElement{return this.getElement(792)};
	/**娃娃机币不足！花{0}钻石获得娃娃机币*/
	get Claw_Tips_9():ILanguageElement{return this.getElement(793)};
	/**尊嘟假嘟*/
	get PetARR_petName_133():ILanguageElement{return this.getElement(794)};
	/**海盗鲨鱼*/
	get PetARR_petName_134():ILanguageElement{return this.getElement(795)};
	/**皇家鹦鹉*/
	get PetARR_petName_135():ILanguageElement{return this.getElement(796)};
	/**冲浪小狼*/
	get PetARR_petName_136():ILanguageElement{return this.getElement(797)};
	/**巨型冲浪小狼*/
	get PetARR_petName_137():ILanguageElement{return this.getElement(798)};
	/**领取在线奖励{0}*/
	get VIP_task_01():ILanguageElement{return this.getElement(799)};
	/**打破{0}个金币*/
	get VIP_task_02():ILanguageElement{return this.getElement(800)};
	/**打开{0}个宠物蛋*/
	get VIP_task_03():ILanguageElement{return this.getElement(801)};
	/**完成宠物融合{0}次*/
	get VIP_task_04():ILanguageElement{return this.getElement(802)};
	/**成功爱心化宠物{0}次*/
	get VIP_task_05():ILanguageElement{return this.getElement(803)};
	/**成功彩虹化宠物{0}次*/
	get VIP_task_06():ILanguageElement{return this.getElement(804)};
	/**附魔宠物{0}次*/
	get VIP_task_07():ILanguageElement{return this.getElement(805)};
	/**和玩家成功交易{0}次*/
	get VIP_task_08():ILanguageElement{return this.getElement(806)};
	/**获得传说宠物{0}次*/
	get VIP_task_09():ILanguageElement{return this.getElement(807)};
	/**获得神话宠物{0}次*/
	get VIP_task_10():ILanguageElement{return this.getElement(808)};
	/**夏日通行证！*/
	get VIPmain_Text_1():ILanguageElement{return this.getElement(809)};
	/**星星*/
	get VIPmain_Text_2():ILanguageElement{return this.getElement(810)};
	/**任务每天凌晨04:00刷新，记得抓紧时间完成哦！*/
	get VIPmain_Text_3():ILanguageElement{return this.getElement(811)};
	/**购买星星*/
	get VIPmain_Text_4():ILanguageElement{return this.getElement(812)};
	/**解锁大会员*/
	get VIPmain_Text_5():ILanguageElement{return this.getElement(813)};
	/**通行证任务*/
	get VIPHud_Text_1():ILanguageElement{return this.getElement(814)};
	/**大会员奖励！*/
	get VIPBuy_Text_1():ILanguageElement{return this.getElement(815)};
	/**金钥匙X2！（使用钥匙获得15颗星星）*/
	get VIPBuy_Text_2():ILanguageElement{return this.getElement(816)};
	/**获得双倍奖励！可以每天多做3个任务，多获得6颗星星！*/
	get VIPBuy_Text_3():ILanguageElement{return this.getElement(817)};
	/**快速购买！*/
	get VIPKey_Text_1():ILanguageElement{return this.getElement(818)};
	/**消耗一把大会员钥匙，获得15颗星星，可马上获得以下奖励*/
	get VIPKey_Text_2():ILanguageElement{return this.getElement(819)};
	/**注意！购买大会员即可获得钥匙*/
	get VIPKey_Text_3():ILanguageElement{return this.getElement(820)};
	/**大会员双倍*/
	get VIPItem_Text_1():ILanguageElement{return this.getElement(821)};
	/**未解锁*/
	get VIPItem_Text_2():ILanguageElement{return this.getElement(822)};
	/**大会员钥匙不足*/
	get VIP_Tips_1():ILanguageElement{return this.getElement(823)};
	/**钥匙兑换成功*/
	get VIP_Tips_2():ILanguageElement{return this.getElement(824)};
	/**星星不足*/
	get VIP_Tips_3():ILanguageElement{return this.getElement(825)};
	/**任务已完成*/
	get VIP_Tips_4():ILanguageElement{return this.getElement(826)};
	/**获得{0}星星*/
	get VIP_Tips_5():ILanguageElement{return this.getElement(827)};
	/**全部完成*/
	get VIP_Tips_6():ILanguageElement{return this.getElement(828)};
	/**可刷新次数:{0}*/
	get VIPHud_Text_2():ILanguageElement{return this.getElement(829)};
	/**木马上已经没有座位了*/
	get Carousel_Text_1():ILanguageElement{return this.getElement(830)};
	/**通行证奖励*/
	get VIPHud_Text_3():ILanguageElement{return this.getElement(831)};
	/**强大的伙伴*/
	get Enchants_Name_47():ILanguageElement{return this.getElement(832)};
	/**是你最强宠物的50%<color=#ED7E27ff>(独有,不可附魔)</color>*/
	get Enchants_Describe_17():ILanguageElement{return this.getElement(833)};
	/**七夕·女宝*/
	get PetARR_petName_138():ILanguageElement{return this.getElement(834)};
	/**七夕·男宝*/
	get PetARR_petName_139():ILanguageElement{return this.getElement(835)};
	/**科技商店*/
	get AreaDivide_Name_22():ILanguageElement{return this.getElement(836)};
	/**赛博城镇*/
	get AreaDivide_Name_23():ILanguageElement{return this.getElement(837)};
	/**黑暗科技*/
	get AreaDivide_Name_24():ILanguageElement{return this.getElement(838)};
	/**蒸汽朋克*/
	get AreaDivide_Name_25():ILanguageElement{return this.getElement(839)};
	/**蒸汽工厂*/
	get AreaDivide_Name_26():ILanguageElement{return this.getElement(840)};
	/**化学实验*/
	get AreaDivide_Name_27():ILanguageElement{return this.getElement(841)};
	/**外星森林*/
	get AreaDivide_Name_28():ILanguageElement{return this.getElement(842)};
	/**阴暗森林*/
	get AreaDivide_Name_29():ILanguageElement{return this.getElement(843)};
	/**null*/
	get AreaDivide_Name_30():ILanguageElement{return this.getElement(844)};
	/**null*/
	get AreaDivide_Name_31():ILanguageElement{return this.getElement(845)};
	/**科技世界*/
	get AreaWorld_textUI_3():ILanguageElement{return this.getElement(846)};
	/**赛博蛋*/
	get Egg_Areaname_17():ILanguageElement{return this.getElement(847)};
	/**科技蛋*/
	get Egg_Areaname_18():ILanguageElement{return this.getElement(848)};
	/**黑暗蛋*/
	get Egg_Areaname_19():ILanguageElement{return this.getElement(849)};
	/**变异蛋*/
	get Egg_Areaname_20():ILanguageElement{return this.getElement(850)};
	/**蒸汽蛋*/
	get Egg_Areaname_21():ILanguageElement{return this.getElement(851)};
	/**朋克蛋*/
	get Egg_Areaname_22():ILanguageElement{return this.getElement(852)};
	/**实验蛋*/
	get Egg_Areaname_23():ILanguageElement{return this.getElement(853)};
	/**药水蛋*/
	get Egg_Areaname_24():ILanguageElement{return this.getElement(854)};
	/**外星蛋*/
	get Egg_Areaname_25():ILanguageElement{return this.getElement(855)};
	/**行星蛋*/
	get Egg_Areaname_26():ILanguageElement{return this.getElement(856)};
	/**暗暗蛋*/
	get Egg_Areaname_27():ILanguageElement{return this.getElement(857)};
	/**null*/
	get Egg_Areaname_28():ILanguageElement{return this.getElement(858)};
	/**是否传送到第三世界*/
	get Portol_Tip_4():ILanguageElement{return this.getElement(859)};
	/**花狗*/
	get PetARR_petName_140():ILanguageElement{return this.getElement(860)};
	/**花猫*/
	get PetARR_petName_141():ILanguageElement{return this.getElement(861)};
	/**雷达狗*/
	get PetARR_petName_142():ILanguageElement{return this.getElement(862)};
	/**雷达猫*/
	get PetARR_petName_143():ILanguageElement{return this.getElement(863)};
	/**黑白狗*/
	get PetARR_petName_144():ILanguageElement{return this.getElement(864)};
	/**奶牛猫*/
	get PetARR_petName_145():ILanguageElement{return this.getElement(865)};
	/**机械小狗*/
	get PetARR_petName_146():ILanguageElement{return this.getElement(866)};
	/**机械小猫*/
	get PetARR_petName_147():ILanguageElement{return this.getElement(867)};
	/**棕狗*/
	get PetARR_petName_148():ILanguageElement{return this.getElement(868)};
	/**小黄猫*/
	get PetARR_petName_149():ILanguageElement{return this.getElement(869)};
	/**弓手狗*/
	get PetARR_petName_150():ILanguageElement{return this.getElement(870)};
	/**弓手猫*/
	get PetARR_petName_151():ILanguageElement{return this.getElement(871)};
	/**黑狗*/
	get PetARR_petName_152():ILanguageElement{return this.getElement(872)};
	/**棕猫*/
	get PetARR_petName_153():ILanguageElement{return this.getElement(873)};
	/**白暹罗猫*/
	get PetARR_petName_154():ILanguageElement{return this.getElement(874)};
	/**科幻狗*/
	get PetARR_petName_155():ILanguageElement{return this.getElement(875)};
	/**科幻猫*/
	get PetARR_petName_156():ILanguageElement{return this.getElement(876)};
	/**科幻暹罗*/
	get PetARR_petName_157():ILanguageElement{return this.getElement(877)};
	/**黑暹罗猫*/
	get PetARR_petName_158():ILanguageElement{return this.getElement(878)};
	/**白兔*/
	get PetARR_petName_159():ILanguageElement{return this.getElement(879)};
	/**棕松鼠*/
	get PetARR_petName_160():ILanguageElement{return this.getElement(880)};
	/**蒸汽暹罗*/
	get PetARR_petName_161():ILanguageElement{return this.getElement(881)};
	/**蒸汽白兔*/
	get PetARR_petName_162():ILanguageElement{return this.getElement(882)};
	/**蒸汽松鼠*/
	get PetARR_petName_163():ILanguageElement{return this.getElement(883)};
	/**小熊*/
	get PetARR_petName_164():ILanguageElement{return this.getElement(884)};
	/**牛牛*/
	get PetARR_petName_165():ILanguageElement{return this.getElement(885)};
	/**狐狸*/
	get PetARR_petName_166():ILanguageElement{return this.getElement(886)};
	/**朋克小熊*/
	get PetARR_petName_167():ILanguageElement{return this.getElement(887)};
	/**朋克牛牛*/
	get PetARR_petName_168():ILanguageElement{return this.getElement(888)};
	/**朋克狐狸*/
	get PetARR_petName_169():ILanguageElement{return this.getElement(889)};
	/**摇滚猫*/
	get PetARR_petName_170():ILanguageElement{return this.getElement(890)};
	/**嘻哈狗*/
	get PetARR_petName_171():ILanguageElement{return this.getElement(891)};
	/**打破{0}个礼物*/
	get VIP_task_11():ILanguageElement{return this.getElement(892)};
	/**打破{0}个宝箱*/
	get VIP_task_12():ILanguageElement{return this.getElement(893)};
	/**玩{0}次抓娃娃机*/
	get VIP_task_13():ILanguageElement{return this.getElement(894)};
	/**通行证奖励升级！已领取奖励的玩家将得到补偿！*/
	get VIP_Tips_7():ILanguageElement{return this.getElement(895)};
	/**黄兔子*/
	get PetARR_petName_172():ILanguageElement{return this.getElement(896)};
	/**黑松鼠*/
	get PetARR_petName_173():ILanguageElement{return this.getElement(897)};
	/**棕熊*/
	get PetARR_petName_174():ILanguageElement{return this.getElement(898)};
	/**游戏松鼠*/
	get PetARR_petName_175():ILanguageElement{return this.getElement(899)};
	/**游戏狐*/
	get PetARR_petName_176():ILanguageElement{return this.getElement(900)};
	/**黄牛*/
	get PetARR_petName_177():ILanguageElement{return this.getElement(901)};
	/**红狐*/
	get PetARR_petName_178():ILanguageElement{return this.getElement(902)};
	/**小粉猪*/
	get PetARR_petName_179():ILanguageElement{return this.getElement(903)};
	/**科研熊*/
	get PetARR_petName_180():ILanguageElement{return this.getElement(904)};
	/**科研猪*/
	get PetARR_petName_181():ILanguageElement{return this.getElement(905)};
	/**小灰兔*/
	get PetARR_petName_182():ILanguageElement{return this.getElement(906)};
	/**橘松鼠*/
	get PetARR_petName_183():ILanguageElement{return this.getElement(907)};
	/**防毒兔*/
	get PetARR_petName_184():ILanguageElement{return this.getElement(908)};
	/**防毒松鼠*/
	get PetARR_petName_185():ILanguageElement{return this.getElement(909)};
	/**白熊*/
	get PetARR_petName_186():ILanguageElement{return this.getElement(910)};
	/**黑牛*/
	get PetARR_petName_187():ILanguageElement{return this.getElement(911)};
	/**白狐*/
	get PetARR_petName_188():ILanguageElement{return this.getElement(912)};
	/**医生熊*/
	get PetARR_petName_189():ILanguageElement{return this.getElement(913)};
	/**医生狐*/
	get PetARR_petName_190():ILanguageElement{return this.getElement(914)};
	/**黑猪*/
	get PetARR_petName_191():ILanguageElement{return this.getElement(915)};
	/**白羊*/
	get PetARR_petName_192():ILanguageElement{return this.getElement(916)};
	/**蝙蝠*/
	get PetARR_petName_193():ILanguageElement{return this.getElement(917)};
	/**科学怪羊*/
	get PetARR_petName_194():ILanguageElement{return this.getElement(918)};
	/**科学怪蝠*/
	get PetARR_petName_195():ILanguageElement{return this.getElement(919)};
	/**我的摊位！*/
	get Plaza_Text_1():ILanguageElement{return this.getElement(920)};
	/**选择宠物！*/
	get Plaza_Text_2():ILanguageElement{return this.getElement(921)};
	/**上架宠物*/
	get Plaza_Text_3():ILanguageElement{return this.getElement(922)};
	/**下架*/
	get Plaza_Text_4():ILanguageElement{return this.getElement(923)};
	/**你要卖多少钱*/
	get Plaza_Text_5():ILanguageElement{return this.getElement(924)};
	/**出售！*/
	get Plaza_Text_6():ILanguageElement{return this.getElement(925)};
	/**摊位装饰！*/
	get Plaza_Text_7():ILanguageElement{return this.getElement(926)};
	/**桌子*/
	get Plaza_Text_8():ILanguageElement{return this.getElement(927)};
	/**招牌*/
	get Plaza_Text_9():ILanguageElement{return this.getElement(928)};
	/**饰品*/
	get Plaza_Text_10():ILanguageElement{return this.getElement(929)};
	/**外装*/
	get Plaza_Text_11():ILanguageElement{return this.getElement(930)};
	/**{0}币*/
	get Plaza_Text_12():ILanguageElement{return this.getElement(931)};
	/**他的摊位！*/
	get Plaza_Text_13():ILanguageElement{return this.getElement(932)};
	/**{0}宠物*/
	get Plaza_Text_14():ILanguageElement{return this.getElement(933)};
	/**赚钱高手榜*/
	get Rank_Title_4():ILanguageElement{return this.getElement(934)};
	/**大富豪榜*/
	get Rank_Title_5():ILanguageElement{return this.getElement(935)};
	/**超级商人榜*/
	get Rank_Title_6():ILanguageElement{return this.getElement(936)};
	/**当前装饰币不足哦，每买卖出2只宠物就可以获得装饰币啦！*/
	get Plaza_Text_15():ILanguageElement{return this.getElement(937)};
	/**{0}装饰币*/
	get Plaza_Text_16():ILanguageElement{return this.getElement(938)};
	/**是否需要购买该装饰*/
	get Plaza_Text_17():ILanguageElement{return this.getElement(939)};
	/**请收下关于存档丢失bug的补偿！感谢理解~*/
	get Tips_gift_4():ILanguageElement{return this.getElement(940)};
	/**宠物乐园！*/
	get Plaza_Text_18():ILanguageElement{return this.getElement(941)};
	/**要传送到交易广场吗！*/
	get Plaza_Text_19():ILanguageElement{return this.getElement(942)};
	/**要传送回宠物乐园吗！*/
	get Plaza_Text_20():ILanguageElement{return this.getElement(943)};
	/**我的摊位！*/
	get Plaza_Text_21():ILanguageElement{return this.getElement(944)};
	/**变身！*/
	get Plaza_Text_22():ILanguageElement{return this.getElement(945)};
	/**当前宠物正在出售中，请下架后重试！*/
	get Plaza_Text_23():ILanguageElement{return this.getElement(946)};
	/**抓娃娃过关！*/
	get Goal_Text_1():ILanguageElement{return this.getElement(947)};
	/**监控阵营：<color=#50EED6FF>{0}</color>/3*/
	get Goal_Text_2():ILanguageElement{return this.getElement(948)};
	/**马桶阵营：<color=#50EED6FF>{0}</color>/3*/
	get Goal_Text_3():ILanguageElement{return this.getElement(949)};
	/**离开房间*/
	get Goal_Text_4():ILanguageElement{return this.getElement(950)};
	/**最快通关榜*/
	get Goal_Text_5():ILanguageElement{return this.getElement(951)};
	/**功能还在冷却中，请稍后在使用*/
	get Plaza_Text_24():ILanguageElement{return this.getElement(952)};
	/**马桶猫*/
	get PetARR_petName_196():ILanguageElement{return this.getElement(953)};
	/**马桶兔子*/
	get PetARR_petName_197():ILanguageElement{return this.getElement(954)};
	/**监控狗*/
	get PetARR_petName_198():ILanguageElement{return this.getElement(955)};
	/**监控小熊*/
	get PetARR_petName_199():ILanguageElement{return this.getElement(956)};
	/**马桶主教羊*/
	get PetARR_petName_200():ILanguageElement{return this.getElement(957)};
	/**泰坦音响鹿*/
	get PetARR_petName_201():ILanguageElement{return this.getElement(958)};
	/**每日榜*/
	get Rank_Title_7():ILanguageElement{return this.getElement(959)};
	/**每周榜*/
	get Rank_Title_8():ILanguageElement{return this.getElement(960)};
	/**恭喜你开出2000钻石*/
	get Plaza_Text_25():ILanguageElement{return this.getElement(961)};
	/**恭喜你开出了一个装饰品！快去装饰背包看看吧！*/
	get Plaza_Text_26():ILanguageElement{return this.getElement(962)};
	/**什么？你抽到了重复的装饰？让我用魔法帮你换成装饰币吧！*/
	get Plaza_Text_27():ILanguageElement{return this.getElement(963)};
	/**月桂兔*/
	get PetARR_petName_202():ILanguageElement{return this.getElement(964)};
	/**月兔*/
	get PetARR_petName_203():ILanguageElement{return this.getElement(965)};
	/**阵营榜*/
	get Rank_Title_9():ILanguageElement{return this.getElement(966)};
	/**请过{0}秒后再使用娃娃机！*/
	get Claw_Tips_10():ILanguageElement{return this.getElement(967)};
	/**已经在使用娃娃机了*/
	get Claw_Tips_11():ILanguageElement{return this.getElement(968)};
	/**复位*/
	get Plaza_Text_28():ILanguageElement{return this.getElement(969)};
	/**请打开浏览器前往MOBOX官网進行充值：https://www.mobox.io*/
	get Deposit_1():ILanguageElement{return this.getElement(970)};
	/**复制网址*/
	get Deposit_2():ILanguageElement{return this.getElement(971)};
	/**是否购买娃娃机币？*/
	get BuyDollCoin_Text_1():ILanguageElement{return this.getElement(972)};
	/**娃娃机币不足！是否购买？*/
	get DollCoinNotEnough_Text_1():ILanguageElement{return this.getElement(973)};
	/**复制成功！*/
	get Copy_Success_Text_1():ILanguageElement{return this.getElement(974)};
	/**购买成功！*/
	get BuyDollCoin_Success_Text_1():ILanguageElement{return this.getElement(975)};
	/**购买失败！*/
	get BuyDollCoin_Fail_Text_1():ILanguageElement{return this.getElement(976)};
	/**龙龙收益buff*/
	get Buff_Text_1():ILanguageElement{return this.getElement(977)};
	/**龙龙收益buff*/
	get Buff_Text_2():ILanguageElement{return this.getElement(978)};
	/**小型奖励药水*/
	get Buff_Text_3():ILanguageElement{return this.getElement(979)};
	/**中型奖励药水*/
	get Buff_Text_4():ILanguageElement{return this.getElement(980)};
	/**大型奖励药水*/
	get Buff_Text_5():ILanguageElement{return this.getElement(981)};
	/**龙龙攻击buff*/
	get Buff_Text_6():ILanguageElement{return this.getElement(982)};
	/**龙龙攻击buff*/
	get Buff_Text_7():ILanguageElement{return this.getElement(983)};
	/**小型伤害药水*/
	get Buff_Text_8():ILanguageElement{return this.getElement(984)};
	/**中型伤害药水*/
	get Buff_Text_9():ILanguageElement{return this.getElement(985)};
	/**大型伤害药水*/
	get Buff_Text_10():ILanguageElement{return this.getElement(986)};

}