import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_C","Value_J","Value_D"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"Pet_Random_Name_1","Vance","Vance","Vance","Vance"],[2,"Pet_Random_Name_2","Judy","Judy","Judy","Judy"],[3,"Pet_Random_Name_3","Stan","Stan","Stan","Stan"],[4,"Pet_Random_Name_4","Prudent","Prudent","Prudent","Prudent"],[5,"Pet_Random_Name_5","Leigh","Leigh","Leigh","Leigh"],[6,"Pet_Random_Name_6","Ida","Ida","Ida","Ida"],[7,"Pet_Random_Name_7","Estra","Estra","Estra","Estra"],[8,"Pet_Random_Name_8","Sherard","Sherard","Sherard","Sherard"],[9,"Pet_Random_Name_9","Travers","Travers","Travers","Travers"],[10,"Pet_Random_Name_10","Mark","Mark","Mark","Mark"],[11,"Pet_Random_Name_11","Kingly","Kingly","Kingly","Kingly"],[12,"Pet_Random_Name_12","Dalton","Dalton","Dalton","Dalton"],[13,"Pet_Random_Name_13","Nicolette","Nicolette","Nicolette","Nicolette"],[14,"Pet_Random_Name_14","Meadow","Meadow","Meadow","Meadow"],[15,"Pet_Random_Name_15","Winston","Winston","Winston","Winston"],[16,"Pet_Random_Name_16","Kelsey","Kelsey","Kelsey","Kelsey"],[17,"Pet_Random_Name_17","Farrell","Farrell","Farrell","Farrell"],[18,"Pet_Random_Name_18","Wealthy","Wealthy","Wealthy","Wealthy"],[19,"Pet_Random_Name_19","Gifted","Gifted","Gifted","Gifted"],[20,"Pet_Random_Name_20","Kent","Kent","Kent","Kent"],[21,"Pet_Random_Name_21","Fresh","Fresh","Fresh","Fresh"],[22,"Pet_Random_Name_22","Des","Des","Des","Des"],[23,"Pet_Random_Name_23","Blueberry","Blueberry","Blueberry","Blueberry"],[24,"Pet_Random_Name_24","Nadia","Nadia","Nadia","Nadia"],[25,"Pet_Random_Name_25","Erwin","Erwin","Erwin","Erwin"],[26,"Pet_Random_Name_26","Jesse","Jesse","Jesse","Jesse"],[27,"Pet_Random_Name_27","Nightingale","Nightingale","Nightingale","Nightingale"],[28,"Pet_Random_Name_28","Deirdre","Deirdre","Deirdre","Deirdre"],[29,"Pet_Random_Name_29","Optimistic","Optimistic","Optimistic","Optimistic"],[30,"Pet_Random_Name_30","Donald","Donald","Donald","Donald"],[31,"Pet_Random_Name_31","Ardent","Ardent","Ardent","Ardent"],[32,"Pet_Random_Name_32","Esmond","Esmond","Esmond","Esmond"],[33,"Pet_Random_Name_33","Free","Free","Free","Free"],[34,"Pet_Random_Name_34","Daphne","Daphne","Daphne","Daphne"],[35,"Pet_Random_Name_35","Tara","Tara","Tara","Tara"],[36,"Pet_Random_Name_36","Winthrop","Winthrop","Winthrop","Winthrop"],[37,"Pet_Random_Name_37","Wanderer","Wanderer","Wanderer","Wanderer"],[38,"Pet_Random_Name_38","Francesca","Francesca","Francesca","Francesca"],[39,"Pet_Random_Name_39","Rhea","Rhea","Rhea","Rhea"],[40,"Pet_Random_Name_40","Harris","Harris","Harris","Harris"],[41,"Pet_Random_Name_41","Vigour","Vigour","Vigour","Vigour"],[42,"Pet_Random_Name_42","Wallace","Wallace","Wallace","Wallace"],[43,"Pet_Random_Name_43","Noblewoman","Noblewoman","Noblewoman","Noblewoman"],[44,"Pet_Random_Name_44","Trixie","Trixie","Trixie","Trixie"],[45,"Pet_Random_Name_45","Dennis","Dennis","Dennis","Dennis"],[46,"Pet_Random_Name_46","Delmar","Delmar","Delmar","Delmar"],[47,"Pet_Random_Name_47","Hamlin","Hamlin","Hamlin","Hamlin"],[48,"Pet_Random_Name_48","Power","Power","Power","Power"],[49,"Pet_Random_Name_49","Wendy","Wendy","Wendy","Wendy"],[50,"Pet_Random_Name_50","Salt","Salt","Salt","Salt"],[51,"Pet_Random_Name_51","Elton","Elton","Elton","Elton"],[52,"Pet_Random_Name_52","Kyla","Kyla","Kyla","Kyla"],[53,"Pet_Random_Name_53","Seeds","Seeds","Seeds","Seeds"],[54,"Pet_Random_Name_54","Delight","Delight","Delight","Delight"],[55,"Pet_Random_Name_55","Vivianne","Vivianne","Vivianne","Vivianne"],[56,"Pet_Random_Name_56","Linette","Linette","Linette","Linette"],[57,"Pet_Random_Name_57","Peaceful","Peaceful","Peaceful","Peaceful"],[58,"Pet_Random_Name_58","Prosperous","Prosperous","Prosperous","Prosperous"],[59,"Pet_Random_Name_59","Maxine","Maxine","Maxine","Maxine"],[60,"Pet_Random_Name_60","Rhoda","Rhoda","Rhoda","Rhoda"],[61,"Pet_Random_Name_61","Elias","Elias","Elias","Elias"],[62,"Pet_Random_Name_62","Nessia","Nessia","Nessia","Nessia"],[63,"Pet_Random_Name_63","Paxton","Paxton","Paxton","Paxton"],[64,"Pet_Random_Name_64","Peggy","Peggy","Peggy","Peggy"],[65,"Pet_Random_Name_65","Jemima","Jemima","Jemima","Jemima"],[66,"Pet_Random_Name_66","Julia","Julia","Julia","Julia"],[67,"Pet_Random_Name_67","Warren","Warren","Warren","Warren"],[68,"Pet_Random_Name_68","Rosa","Rosa","Rosa","Rosa"],[69,"Pet_Random_Name_69","Foster","Foster","Foster","Foster"],[70,"Pet_Random_Name_70","Konrad","Konrad","Konrad","Konrad"],[71,"Pet_Random_Name_71","Germaine","Germaine","Germaine","Germaine"],[72,"Pet_Random_Name_72","Tilda","Tilda","Tilda","Tilda"],[73,"Pet_Random_Name_73","John","John","John","John"],[74,"Pet_Random_Name_74","Laurel","Laurel","Laurel","Laurel"],[75,"Pet_Random_Name_75","Vincent","Vincent","Vincent","Vincent"],[76,"Pet_Random_Name_76","Spirited","Spirited","Spirited","Spirited"],[77,"Pet_Random_Name_77","Ambitious","Ambitious","Ambitious","Ambitious"],[78,"Pet_Random_Name_78","White","White","White","White"],[79,"Pet_Random_Name_79","Everett","Everett","Everett","Everett"],[80,"Pet_Random_Name_80","Falkner","Falkner","Falkner","Falkner"],[81,"Pet_Random_Name_81","Priscilla","Priscilla","Priscilla","Priscilla"],[82,"Pet_Random_Name_82","Wise","Wise","Wise","Wise"],[83,"Pet_Random_Name_83","Martin","Martin","Martin","Martin"],[84,"Pet_Random_Name_84","Hadwin","Hadwin","Hadwin","Hadwin"],[85,"Pet_Random_Name_85","Trustworthy","Trustworthy","Trustworthy","Trustworthy"],[86,"Pet_Random_Name_86","Beloved","Beloved","Beloved","Beloved"],[87,"Pet_Random_Name_87","Abigail","Abigail","Abigail","Abigail"],[88,"Pet_Random_Name_88","Zera","Zera","Zera","Zera"],[89,"Pet_Random_Name_89","Rex","Rex","Rex","Rex"],[90,"Pet_Random_Name_90","Wenda","Wenda","Wenda","Wenda"],[91,"Pet_Random_Name_91","Mercy","Mercy","Mercy","Mercy"],[92,"Pet_Random_Name_92","Dwayne","Dwayne","Dwayne","Dwayne"],[93,"Pet_Random_Name_93","Kirsten","Kirsten","Kirsten","Kirsten"],[94,"Pet_Random_Name_94","Kayla","Kayla","Kayla","Kayla"],[95,"Pet_Random_Name_95","Leo","Leo","Leo","Leo"],[96,"Pet_Random_Name_96","Willis","Willis","Willis","Willis"],[97,"Pet_Random_Name_97","Amiable","Amiable","Amiable","Amiable"],[98,"Pet_Random_Name_98","Jewel","Jewel","Jewel","Jewel"],[99,"Pet_Random_Name_99","Hartley","Hartley","Hartley","Hartley"],[100,"Pet_Random_Name_100","Eliza","Eliza","Eliza","Eliza"],[101,"Pet_Random_Name_101","Noelle","Noelle","Noelle","Noelle"],[102,"Pet_Random_Name_102","David","David","David","David"],[103,"Pet_Random_Name_103","Truman","Truman","Truman","Truman"],[104,"Pet_Random_Name_104","Nora","Nora","Nora","Nora"],[105,"Pet_Random_Name_105","Belle","Belle","Belle","Belle"],[106,"Pet_Random_Name_106","Ann","Ann","Ann","Ann"],[107,"Pet_Random_Name_107","Ian","Ian","Ian","Ian"],[108,"Pet_Random_Name_108","Fiona","Fiona","Fiona","Fiona"],[109,"Pet_Random_Name_109","Sparrow","Sparrow","Sparrow","Sparrow"],[110,"Pet_Random_Name_110","Blythe","Blythe","Blythe","Blythe"],[111,"Pet_Random_Name_111","Ivan","Ivan","Ivan","Ivan"],[112,"Pet_Random_Name_112","Irene","Irene","Irene","Irene"],[113,"Pet_Random_Name_113","Georgiana","Georgiana","Georgiana","Georgiana"],[114,"Pet_Random_Name_114","Lucille","Lucille","Lucille","Lucille"],[115,"Pet_Random_Name_115","Felicia","Felicia","Felicia","Felicia"],[116,"Pet_Random_Name_116","Nancy","Nancy","Nancy","Nancy"],[117,"Pet_Random_Name_117","Darian","Darian","Darian","Darian"],[118,"Pet_Random_Name_118","Firm","Firm","Firm","Firm"],[119,"Pet_Random_Name_119","Margot","Margot","Margot","Margot"],[120,"Pet_Random_Name_120","Eileen","Eileen","Eileen","Eileen"],[121,"Pet_Random_Name_121","Magda","Magda","Magda","Magda"],[122,"Pet_Random_Name_122","Sandra","Sandra","Sandra","Sandra"],[123,"Pet_Random_Name_123","Britney","Britney","Britney","Britney"],[124,"Pet_Random_Name_124","Peaceful","Peaceful","Peaceful","Peaceful"],[125,"Pet_Random_Name_125","Vaughan","Vaughan","Vaughan","Vaughan"],[126,"Pet_Random_Name_126","Garrick","Garrick","Garrick","Garrick"],[127,"Pet_Random_Name_127","Elliott","Elliott","Elliott","Elliott"],[128,"Pet_Random_Name_128","Glenn","Glenn","Glenn","Glenn"],[129,"Pet_Random_Name_129","Leith","Leith","Leith","Leith"],[130,"Pet_Random_Name_130","Trina","Trina","Trina","Trina"],[131,"Pet_Random_Name_131","Dixon","Dixon","Dixon","Dixon"],[132,"Pet_Random_Name_132","Silvery","Silvery","Silvery","Silvery"],[133,"Pet_Random_Name_133","Swift","Swift","Swift","Swift"],[134,"Pet_Random_Name_134","Oscar","Oscar","Oscar","Oscar"],[135,"Pet_Random_Name_135","Kirby","Kirby","Kirby","Kirby"],[136,"Pet_Random_Name_136","Princess","Princess","Princess","Princess"],[137,"Pet_Random_Name_137","Strawberry","Strawberry","Strawberry","Strawberry"],[138,"Pet_Random_Name_138","Rich","Rich","Rich","Rich"],[139,"Pet_Random_Name_139","Faithful","Faithful","Faithful","Faithful"],[140,"Pet_Random_Name_140","Nigel","Nigel","Nigel","Nigel"],[141,"Pet_Random_Name_141","Ernest","Ernest","Ernest","Ernest"],[142,"Pet_Random_Name_142","Robin","Robin","Robin","Robin"],[143,"Pet_Random_Name_143","Mountain","Mountain","Mountain","Mountain"],[144,"Pet_Random_Name_144","Fedora","Fedora","Fedora","Fedora"],[145,"Pet_Random_Name_145","Philip","Philip","Philip","Philip"],[146,"Pet_Random_Name_146","Uriah","Uriah","Uriah","Uriah"],[147,"Pet_Random_Name_147","Rebellious","Rebellious","Rebellious","Rebellious"],[148,"Pet_Random_Name_148","Vandal","Vandal","Vandal","Vandal"],[149,"Pet_Random_Name_149","Ursa","Ursa","Ursa","Ursa"],[150,"Pet_Random_Name_150","Dirk","Dirk","Dirk","Dirk"],[151,"Pet_Random_Name_151","Shannon","Shannon","Shannon","Shannon"],[152,"Pet_Random_Name_152","Penelope","Penelope","Penelope","Penelope"],[153,"Pet_Random_Name_153","Primavera","Primavera","Primavera","Primavera"],[154,"Pet_Random_Name_154","Toby","Toby","Toby","Toby"],[155,"Pet_Random_Name_155","Grant","Grant","Grant","Grant"],[156,"Pet_Random_Name_156","Roxanne","Roxanne","Roxanne","Roxanne"],[157,"Pet_Random_Name_157","Grateful","Grateful","Grateful","Grateful"],[158,"Pet_Random_Name_158","Lucinda","Lucinda","Lucinda","Lucinda"],[159,"Pet_Random_Name_159","Justin","Justin","Justin","Justin"],[160,"Pet_Random_Name_160","Tess","Tess","Tess","Tess"],[161,"Pet_Random_Name_161","Stacy","Stacy","Stacy","Stacy"],[162,"Pet_Random_Name_162","Exalted","Exalted","Exalted","Exalted"],[163,"Pet_Random_Name_163","Ethen","Ethen","Ethen","Ethen"],[164,"Pet_Random_Name_164","Flora","Flora","Flora","Flora"],[165,"Pet_Random_Name_165","Questa","Questa","Questa","Questa"],[166,"Pet_Random_Name_166","Spencer","Spencer","Spencer","Spencer"],[167,"Pet_Random_Name_167","Lucas","Lucas","Lucas","Lucas"],[168,"Pet_Random_Name_168","Virtuous","Virtuous","Virtuous","Virtuous"],[169,"Pet_Random_Name_169","Gregory","Gregory","Gregory","Gregory"],[170,"Pet_Random_Name_170","Harland","Harland","Harland","Harland"],[171,"Pet_Random_Name_171","April","April","April","April"],[172,"Pet_Random_Name_172","Orson","Orson","Orson","Orson"],[173,"Pet_Random_Name_173","Bound","Bound","Bound","Bound"],[174,"Pet_Random_Name_174","Adrienne","Adrienne","Adrienne","Adrienne"],[175,"Pet_Random_Name_175","Julie","Julie","Julie","Julie"],[176,"Pet_Random_Name_176","Counsellor","Counsellor","Counsellor","Counsellor"],[177,"Pet_Random_Name_177","Primrose","Primrose","Primrose","Primrose"],[178,"Pet_Random_Name_178","Hunter","Hunter","Hunter","Hunter"],[179,"Pet_Random_Name_179","One","One","One","One"],[180,"Pet_Random_Name_180","Rejoicing","Rejoicing","Rejoicing","Rejoicing"],[181,"Pet_Random_Name_181","Joan","Joan","Joan","Joan"],[182,"Pet_Random_Name_182","Wolf","Wolf","Wolf","Wolf"],[183,"Pet_Random_Name_183","Max","Max","Max","Max"],[184,"Pet_Random_Name_184","Honour","Honour","Honour","Honour"],[185,"Pet_Random_Name_185","Orva","Orva","Orva","Orva"],[186,"Pet_Random_Name_186","Drew","Drew","Drew","Drew"],[187,"Pet_Random_Name_187","Ivy","Ivy","Ivy","Ivy"],[188,"Pet_Random_Name_188","Lewis","Lewis","Lewis","Lewis"],[189,"Pet_Random_Name_189","Shawn","Shawn","Shawn","Shawn"],[190,"Pet_Random_Name_190","Sea","Sea","Sea","Sea"],[191,"Pet_Random_Name_191","Fiery","Fiery","Fiery","Fiery"],[192,"Pet_Random_Name_192","Dark","Dark","Dark","Dark"],[193,"Pet_Random_Name_193","United","United","United","United"],[194,"Pet_Random_Name_194","Thomasina","Thomasina","Thomasina","Thomasina"],[195,"Pet_Random_Name_195","Falcon","Falcon","Falcon","Falcon"],[196,"Pet_Random_Name_196","Imogene","Imogene","Imogene","Imogene"],[197,"Pet_Random_Name_197","Bella","Bella","Bella","Bella"],[198,"Pet_Random_Name_198","Kane","Kane","Kane","Kane"],[199,"Pet_Random_Name_199","Fiery","Fiery","Fiery","Fiery"],[200,"Pet_Random_Name_200","Norseman","Norseman","Norseman","Norseman"],[201,"PetARR_petName_1","Dog","小狗","Dog","Dog"],[202,"PetARR_petName_2","Cat","小猫","Cat","Cat"],[203,"PetARR_petName_3","Pink Bunny","粉兔","Pink Bunny","Pink Bunny"],[204,"PetARR_petName_4","Red-eared Bunny","红耳兔","Red-eared Bunny","Red-eared Bunny"],[205,"PetARR_petName_5","Orange Dog","小橘犬","Orange Dog","Orange Dog"],[206,"PetARR_petName_6","Calf","小牛","Calf","Calf"],[207,"PetARR_petName_7","Piggy","小猪","Piggy","Piggy"],[208,"PetARR_petName_8","Chick","小鸡","Chick","Chick"],[209,"PetARR_petName_9","Yellow Chicken","黄鸡","Yellow Chicken","Yellow Chicken"],[210,"PetARR_petName_10","Pink Dog","粉红小狗","Pink Dog","Pink Dog"],[211,"PetARR_petName_11","Lamb","小羊","Lamb","Lamb"],[212,"PetARR_petName_12","Squirrel","松鼠","Squirrel","Squirrel"],[213,"PetARR_petName_13","Brown Bear","棕熊","Brown Bear","Brown Bear"],[214,"PetARR_petName_14","White Bear","白熊","White Bear","White Bear"],[215,"PetARR_petName_15","Bat","蝙蝠","Bat","Bat"],[216,"PetARR_petName_16","Deer","小鹿","Deer","Deer"],[217,"PetARR_petName_17","Fox","小狐狸","Fox","Fox"],[218,"PetARR_petName_18","Elk","麋鹿","Elk","Elk"],[219,"PetARR_petName_19","Pink Fox","粉狐狸","Pink Fox","Pink Fox"],[220,"PetARR_petName_20","Pink Cat","粉红小猫","Pink Cat","Pink Cat"],[221,"PetARR_petName_21","Snow Dog","雪狗","Snow Dog","Snow Dog"],[222,"PetARR_petName_22","Snow Cat","雪猫","Snow Cat","Snow Cat"],[223,"PetARR_petName_23","Snow Lamb","雪羊","Snow Lamb","Snow Lamb"],[224,"PetARR_petName_24","Black & White Bear","黑白熊","Black & White Bear","Black & White Bear"],[225,"PetARR_petName_25","Blue Crystal Squirrel","蓝晶松鼠","Blue Crystal Squirrel","Blue Crystal Squirrel"],[226,"PetARR_petName_26","Squirrel","小松鼠","Squirrel","Squirrel"],[227,"PetARR_petName_27","Snow Chicken","雪鸡","Snow Chicken","Snow Chicken"],[228,"PetARR_petName_28","Snow Bull","雪牛","Snow Bull","Snow Bull"],[229,"PetARR_petName_29","Golden Bull","黄金牛","Golden Bull","Golden Bull"],[230,"PetARR_petName_30","Emerald Lamb","绿宝石羊","Emerald Lamb","Emerald Lamb"],[231,"PetARR_petName_31","Ice Crystal Bat","冰晶蝙蝠","Ice Crystal Bat","Ice Crystal Bat"],[232,"PetARR_petName_32","Night Bat","黑夜蝙蝠","Night Bat","Night Bat"],[233,"PetARR_petName_33","Ice Crystal Fox","冰晶狐狸","Ice Crystal Fox","Ice Crystal Fox"],[234,"PetARR_petName_34","Ice Crystal Deer","冰晶鹿","Ice Crystal Deer","Ice Crystal Deer"],[235,"PetARR_petName_35","Golden Pig","黄金猪","Golden Pig","Golden Pig"],[236,"PetARR_petName_36","Blue Crystal Bat","蓝晶蝙蝠","Blue Crystal Bat","Blue Crystal Bat"],[237,"PetARR_petName_37","Grass Pig","小草猪","Grass Pig","Grass Pig"],[238,"PetARR_petName_38","Pink Bull","粉牛","Pink Bull","Pink Bull"],[239,"PetARR_petName_39","Blue Cat","蓝猫","Blue Cat","Blue Cat"],[240,"PetARR_petName_40","Snow Pig","雪猪","Snow Pig","Snow Pig"],[241,"PetARR_petName_41","Golden Chicken","黄金鸡","Golden Chicken","Golden Chicken"],[242,"PetARR_petName_42","Pink Bunny","粉红兔子","Pink Bunny","Pink Bunny"],[243,"PetARR_petName_43","Snow Bunny","雪兔","Snow Bunny","Snow Bunny"],[244,"PetARR_petName_44","Orange Lamb","小橘羊","Orange Lamb","Orange Lamb"],[245,"PetARR_petName_45","Snow Squirrel","雪松鼠","Snow Squirrel","Snow Squirrel"],[246,"PetARR_petName_46","Emerald Fox","绿宝石狐","Emerald Fox","Emerald Fox"],[247,"PetARR_petName_47","Emerald Bear","绿宝石熊","Emerald Bear","Emerald Bear"],[248,"PetARR_petName_48","Blue Crystal Deer","蓝晶鹿","Blue Crystal Deer","Blue Crystal Deer"],[249,"PetARR_Quality_1","Common","普通","Common","Common"],[250,"PetARR_Quality_2","Rare","稀有","Rare","Rare"],[251,"PetARR_Quality_3","Epic","史诗","Epic","Epic"],[252,"PetARR_Quality_4","Legendary","传说","Legendary","Legendary"],[253,"PetARR_Special_1","Heart","爱心化","Heart","Heart"],[254,"PetARR_Special_2","Rainbow","彩虹化","Rainbow","Rainbow"],[255,"AreaDivide_Name_1","Shop","商店","Shop","Shop"],[256,"AreaDivide_Name_2","Area Ⅰ","地区Ⅰ","AreaⅠ","AreaⅠ"],[257,"AreaDivide_Name_3","Area Ⅱ","地区Ⅱ","Area Ⅱ","Area Ⅱ"],[258,"AreaDivide_Name_4","Area Ⅲ","地区Ⅲ","Area Ⅲ","Area Ⅲ"],[259,"AreaDivide_Name_5","Area Ⅳ","地区Ⅳ","Area Ⅳ","Area Ⅳ"],[260,"AreaDivide_Name_6","Area Ⅴ","地区Ⅴ","Area Ⅴ","Area Ⅴ"],[261,"AreaDivide_Name_7","Area Ⅵ","地区Ⅵ","Area Ⅵ","Area Ⅵ"],[262,"AreaDivide_Name_8","Area Ⅶ","地区Ⅶ","Area Ⅶ","Area Ⅶ"],[263,"AreaDivide_Name_9","Area Ⅷ","地区Ⅷ","Area Ⅷ","Area Ⅷ"],[264,"AreaDivide_Name_10","Tent","帐篷","Tent","Tent"],[265,"AreaDivide_Name_11","Secret Base","秘密基地","Secret Base","Secret Base"],[266,"AreaWorld_textUI_1","Initial Land","初始大陆","Initial Land","Initial Land"],[267,"Tips_gift_1","Obtained coins ×{0}!","获得金币×{0}!","Obtained coins ×{0}!","Obtained coins ×{0}!"],[268,"Tips_gift_2","Obtained diamonds x{0}!","获得钻石×{0}!","Obtained diamonds x{0}!","Obtained diamonds x{0}!"],[269,"Tips_gift_3","Obtained special pet!","获得特殊宠物!","Obtained special pet!","Obtained special pet!"],[270,"Info_pet_1","Own {0} pets.","拥有{0}/{1}个宠物","Own {0} pets.","Own {0} pets."],[271,"Info_gift_1","{0}/12 collected","领取进度{0}/12","{0}/12 collected","{0}/12 collected"],[272,"PetARR_petName_49","Poinko Chicken","只因哥","Poinko Chicken","Poinko Chicken"],[273,"PetARR_petName_50","Tiger","小老虎","Tiger","Tiger"],[274,"PetARR_petName_51","Octopus","小章鱼","Octopus","Octopus"],[275,"Dev_TextBlock_Intro_1","Fill this pet with vitality!","让这只宠物充满爱心!","Make this pet a Heart Pet!","Make this pet a Heart Pet!"],[276,"Dev_TextBlock_Intro_2","Fill this pet with rainbow!","让这只宠物充满彩虹!","Make this pet a Rainbow Pet!","Make this pet a Rainbow Pet!"],[277,"Dev_TextBlock_Explain_1","Select a pet to vitalize!","选择一只宠物使它充满爱心!","Select a pet you want to turn Heart Pet!","Select a pet you want to turn Heart Pet!"],[278,"Dev_TextBlock_Explain_2","Select a pet to be filled with Rainbow!","选择一只宠物使它充满彩虹!","Select a pet you want to turn Rainbow Pet!","Select a pet you want to turn Rainbow Pet!"],[279,"Text_Fuse_UI_1","Merge {0}/8 pets","融合{0}/8只宠物","Merge {0}/8 pets","Merge {0}/8 pets"],[280,"Text_Fuse_UI_2","Confirm Merge?","确认融合宠物？","Confirm Merge?","Confirm Merge?"],[281,"Text_Fuse_UI_3","You need more diamonds!","钻石不足!","You need more diamonds!","You need more diamonds!"],[282,"Buff_buffname_1","Congrats! You obtained Triple Attack Potion!","恭喜获得三倍攻击药水","Congratulations! You obtained x3 Attack Potion!","Congratulations! You obtained x3 Attack Potion!"],[283,"Buff_buffname_2","Congrats! You obtained Triple Reward Potion!","恭喜获得三倍奖励药水","Congratulations! You obtained x3 Reward Potion!","Congratulations! You obtained x3 Reward Potion!"],[284,"Buff_buffname_3","Congrats! You obtained Pet Hatching Boost!","恭喜获得宠物孵化幸运药水","Congratulations! You obtained Pet Hatching Lucky Potion!","Congratulations! You obtained Pet Hatching Lucky Potion!"],[285,"Buff_buffname_4","Congrats! You obtained Pet Hatching Super Boost!","恭喜获得宠物孵化超级幸运药水","Congratulations! You obtained Pet Hatching Super Lucky Potion!","Congratulations! You obtained Pet Hatching Super Lucky Potion!"],[286,"Text_tips_1","Purchase successful!","购买成功","Purchase successful!","Purchase successful!"],[287,"Text_messagebox_1","Spend {0} diamonds to unlock?","是否花费{0}钻石来解锁？","Spend {0} diamonds to unlock?","Spend {0} diamonds to unlock?"],[288,"Text_tips_3","You don't have enough diamonds!","钻石不足!","You don't have enough diamonds!","You don't have enough diamonds!"],[289,"Text_messagebox_2","Teleport to the Gacha Area?","是否传送到扭蛋区","Teleport to the Gacha Area?","Teleport to the Gacha Area?"],[290,"Text_messagebox_3","Spend {0} coins to purchase?","是否花费{0}金币购买","Spend {0} coins to purchase?","Spend {0} coins to purchase?"],[291,"Text_tips_4","You don't have enough coins!","金币不足","You don't have enough coins!","You don't have enough coins!"],[292,"Text_messagebox_4","Your backpack is full.","宠物背包已满，可以通过背包删除","Pet Backpack is full.","Pet Backpack is full."],[293,"Text_ItemUI_1","Obtained","已获得","Obtained","Obtained"],[294,"Text_ItemUI_2","Claimable!","可领取!","Redeem!","Redeem!"],[295,"Text_tips_5","Note: The gift has been claimed.","注意:礼包已被领取","Note: The gift has been redeemed.","Note: The gift has been redeemed."],[296,"Text_tips_6","It's not time yet!","时间还没到哦~","It's not time yet!","It's not time yet!"],[297,"button_1","Remove","卸载","Remove","Remove"],[298,"button_2","Summon","召唤","Equip","Equip"],[299,"Page_UI_Tips_1","Max Summon Limit: {0}","可以同时装备{0}个宠物","Equipment Pets Maximum: {0} ","Equipment Pets Maximum: {0} "],[300,"Page_UI_Tips_2","Your chance is {0}%, spend {1} diamonds to vitalize?","你的概率是{0}%，是否花费{1}钻石进行爱心化？","Your chance is {0}%, spend {1} diamonds to vitalize?","Your chance is {0}%, spend {1} diamonds to vitalize?"],[301,"Text_messagebox_5","Successful!","合成成功","Successful!","Successful!"],[302,"Text_messagebox_6","Failed.","合成失败","Failed.","Failed."],[303,"Page_UI_Tips_3","{0} pets","{0}只宠物","{0} pets","{0} pets"],[304,"Page_UI_Tips_4","Level {0}","等级{0}","Level {0}","Level {0}"],[305,"button_3","Tradable","可交易","Tradable","Tradable"],[306,"button_4","Untradable","不可交易","Untradable","Untradable"],[307,"button_5","Cooling","冷却中","Cooling","Cooling"],[308,"button_6","Trading","交易中","Trading","Trading"],[309,"button_7","Creating trade...","开启交易中","Creating trade...","Creating trade..."],[310,"button_8","Closing trade...","关闭交易中","Closing trade...","Closing trade..."],[311,"User_pet","{0} 's pets","{0}的宠物","{0} 's pets","{0} 's pets"],[312,"button_9","Preparing","准备中","Preparing","Preparing"],[313,"button_10","Ready!","准备!","Ready!","Ready!"],[314,"Text_messagebox_7","Player {0} sent a trade request.","玩家{0}请求与你交易","Player {0} sent a trade request.","Player {0} sent a trade request."],[315,"Text_messagebox_8","Trade completed.","交易完成","Trade completed.","Trade completed."],[316,"Text_messagebox_9","Cancel the trade?","是否取消交易","Cancel the trade?","Cancel the trade?"],[317,"Text_messagebox_10","Confirm the trade?","是否确认交易","Confirm the trade?","Confirm the trade?"],[318,"button_11","Confirm","确认","Confirm","Confirm"],[319,"button_12","Yes","是","Yes","Yes"],[320,"button_13","No","否","No","No"],[321,"Page_UI_Tips_5","Confirm the trade after {0} s.","{0}s后确认交易","Confirm the trade after {0} s.","Confirm the trade after {0} s."],[322,"Text_messagebox_11","Cannot delete, keep at least one pet.","不能删除,至少保留一个宠物","Cannot delete, keep at least one pet.","Cannot delete, keep at least one pet."],[323,"Text_messagebox_12","You cannot equip more pets!","宠物跟随已满，无法装备","You cannot equip more pets!","You cannot equip more pets!"],[324,"Text_messagebox_13","Are you sure to delete?","确定要删除吗？","Are you sure to delete?","Are you sure to delete?"],[325,"Text_messagebox_14","Traded {0} pets, and {1} diamonds, with {2} players.","交易了{0}个宠物 和 {1} 钻石 与{2}玩家","Traded {0} pets, and {1} diamonds, with {2} players.","Traded {0} pets, and {1} diamonds, with {2} players."],[326,"button_14","Confirming","确认中","Confirming","Confirming"],[327,"Text_messagebox_15","Request sent, waiting for response...","发送请求成功,等待对方回应","Request sent, waiting for response...","Request sent, waiting for response..."],[328,"Text_messagebox_16","Failed to send request, the player is busy.","发送请求失败,对方正忙","Failed to send request, the player is busy.","Failed to send request, the player is busy."],[329,"Text_messagebox_17","Player {0} rejected your trade request.","玩家{0}拒绝交易请求","Player {0} rejected your trade request.","Player {0} rejected your trade request."],[330,"Text_messagebox_18","Player {0} canceled the trade.","玩家{0} 取消了交易","Player {0} canceled the trade.","Player {0} canceled the trade."],[331,"PetARR_petName_52","Goldfish","小金鱼","Goldfish","Goldfish"],[332,"PetARR_petName_53","Monkey","小猴子","Monkey","Monkey"],[333,"PetARR_petName_54","Parrot","小鹦鹉","Parrot","Parrot"],[334,"PetARR_petName_55","Turtle","小乌龟","Turtle","Turtle"],[335,"PetARR_petName_56","Shark","小鲨鱼","Shark","Shark"],[336,"PetARR_petName_57","Walrus","小海象","Walrus","Walrus"],[337,"PetARR_petName_58","White Tiger","白虎","White Tiger","White Tiger"],[338,"PetARR_petName_59","Red Goldfish","红金鱼","Red Goldfish","Red Goldfish"],[339,"PetARR_petName_60","Penguin","小企鹅","Penguin","Penguin"],[340,"PetARR_petName_61","Snowman","小雪人","Snowman","Snowman"],[341,"PetARR_petName_62","White Ape","白猿","White Ape","White Ape"],[342,"PetARR_petName_63","Razor Turtle","剃刀龟","Razor Turtle","Razor Turtle"],[343,"PetARR_petName_64","Blue Snowman","蓝雪人","Blue Snowman","Blue Snowman"],[344,"PetARR_petName_65","Killer Whale","救生鲨","Killer Whale","Killer Whale"],[345,"PetARR_petName_66","Blue Octopus","蓝章鱼","Blue Octopus","Blue Octopus"],[346,"PetARR_petName_67","Blue Penguin","蓝企鹅","Blue Penguin","Blue Penguin"],[347,"PetARR_petName_68","Motley King Kong","五彩金刚","Motley King Kong","Motley King Kong"],[348,"PetARR_petName_69","Seal","海豹","Seal","Seal"],[349,"Text_messagebox_19","Already rated.","已经评价过了","Already rated.","Already rated."],[350,"Page_UI_Tips_6","Pick an initial pet!","选一只初始宠物吧!","Pick an initial pet!","Pick an initial pet!"],[351,"button_15","Yes!","确定!","Yes!","Yes!"],[352,"Text_messagebox_20","Close the trade?","确认关闭交易吗?","Close the trade?","Close the trade?"],[353,"Page_Title_1","Merge pets!","融合宠物!","Merge pets!","Merge pets!"],[354,"button_16","Merge !","融合!","Merge !","Merge !"],[355,"Page_UI_Tips_7","Get free gifts for playing!","玩游戏获得免费礼包","Get free gifts for playing!","Get free gifts for playing!"],[356,"Page_UI_Tips_8","The gift contains Super Powerful Pet!","礼包包含超强力宠物!","The gift contains Super Powerful Pet!","The gift contains Super Powerful Pet!"],[357,"Page_Title_2","Free Gifts!","免费礼包!","Free Gifts!","Free Gifts!"],[358,"Text_ItemUI_3","Get pets!","获取宠物!","Get pets!","Get pets!"],[359,"Page_Title_3","Upgrade!","升级!","Upgrade!","Upgrade!"],[360,"Page_UI_Tips_9","You will lose all pets chosen for fusion!","你会失去所有的选择合成的宠物!","You will lose all pets chosen for fusion!","You will lose all pets chosen for fusion!"],[361,"Page_Title_4","Coin Absorption Range","金币吸收范围","Coin Absorption Range","Coin Absorption Range"],[362,"Page_Title_5","Get More Diamonds","获得更多钻石","Get More Diamonds","Get More Diamonds"],[363,"Page_Title_6","Pet Damage","宠物伤害","Pet Damage","Pet Damage"],[364,"Page_Title_7","Pet Attack Speed","宠物攻击速度","Pet Attack Speed","Pet Attack Speed"],[365,"Page_Title_8","Pet Backpack Storage","背包宠物存储量","Pet Backpack Storage","Pet Backpack Storage"],[366,"Page_Title_9","Your Pets!","你的宠物!","Your Pets!","Your Pets!"],[367,"Page_Title_10","Collect pets!","收集宠物!","Collect pets!","Collect pets!"],[368,"Page_UI_Tips_10","Level Up, Max Summon Limit +1.","等级提升装备宠物上限+1","Level Upgrade, Equipment Pet Maximum +1.","Level Upgrade, Equipment Pet Maximum +1."],[369,"Page_UI_Tips_11","{0} owned","{0}拥有","{0} owned","{0} owned"],[370,"Page_UI_Tips_12","Name your pet!","为你的宠物起个昵称吧!","Name your pet!","Name your pet!"],[371,"Page_Title_11","Trading History!","交易历史!","Trading History!","Trading History!"],[372,"button_17","Return","返回","Return","Return"],[373,"button_18","Send","发送","Send","Send"],[374,"Page_Title_12","Trading Center!","交易中心!","Trading Center!","Trading Center!"],[375,"button_19","Trading History","交易历史","Trading History","Trading History"],[376,"Page_Title_13","Confirm the content for trade and tap Ready.","确定好交易内容后点击准备按钮","Confirm the content for trade and tap Ready.","Confirm the content for trade and tap Ready."],[377,"Page_Title_14","Get close and tap the button to unlock.","靠近后点击按钮解锁","Get close and tap the button to unlock.","Get close and tap the button to unlock."],[378,"Text_messagebox_21","You will not get any items in this trade, confirm?","你在本次交易中不会获得任何物品，确认交易吗","You will not get any items in this trade, confirm?","You will not get any items in this trade, confirm?"],[379,"Text_messagebox_22","You did not give any items in this trade, confirm?","你在本次交易中没有给予任何物品，确认交易吗","You did not give any items in this trade, confirm?","You did not give any items in this trade, confirm?"],[380,"Text_messagebox_23","Please make sure this trade is fair.","请确保这次交易是公平的","Please make sure this trade is fair.","Please make sure this trade is fair."],[381,"Text_ItemUI_4","Triple Reward","三倍奖励","x3 Reward","x3 Reward"],[382,"Text_ItemUI_5","Triple Attack","三倍攻击","x3 Attack","x3 Attack"],[383,"Text_ItemUI_6","Lucky","幸运","Lucky","Lucky"],[384,"Text_ItemUI_7","Super Lucky","超级幸运","Super Lucky","Super Lucky"],[385,"Text_tips_7","There are currently no pets fighting, tap on coin piles to fight!","当前没有宠物在战斗，点击金币堆出战!","There are currently no pets fighting, tap on coin piles to fight!","There are currently no pets fighting, tap on coin piles to fight!"],[386,"PetARR_petName_70","Little Yellow Turtle","小黄龟","Little Yellow Turtle","Little Yellow Turtle"],[387,"PetARR_petName_71","Pink Penguin","粉企鹅","Pink Penguin","Pink Penguin"],[388,"PetARR_petName_72","Yellow Octopus","黄章鱼","Yellow Octopus","Yellow Octopus"],[389,"PetARR_petName_73","Pink Octopus","粉章鱼","Pink Octopus","Pink Octopus"],[390,"PetARR_petName_74","Dark Green Walrus","墨绿海象","Dark Green Walrus","Dark Green Walrus"],[391,"PetARR_petName_75","Orange Tiger","橙老虎","Orange Tiger","Orange Tiger"],[392,"PetARR_petName_76","Melting Snowman","融化雪人","Melting Snowman","Melting Snowman"],[393,"PetARR_petName_77","Purple Snowman","紫色雪人","Purple Snowman","Purple Snowman"],[394,"Text_messagebox_24","Make sure you have at least 1 pet in your backpack.","确保背包中至少有一只宠物","Make sure you have at least 1 pet in your backpack.","Make sure you have at least 1 pet in your backpack."],[395,"Page_UI_Tips_13","Select more than 3 pets to merge.","选择3只以上的宠物进行融合","Select more than 3 pets to merge.","Select more than 3 pets to merge."],[396,"Text_Trade_1","Cancel","取消准备","Unready","Unready"],[397,"Text_Trade_2","Cancel","取消确认","Unconfirm","Unconfirm"],[398,"Text_tips_8","New pet egg has unlocked! Go check it out!","有全新的宠物蛋解锁了!快去看看吧~","New pet egg has unlocked! Go check it out!","New pet egg has unlocked! Go check it out!"],[399,"PetARR_Quality_5","Mythical","神话","Mythical","Mythical"],[400,"Enchants_Name_1","Coin I","金币Ⅰ","Coin I","Coin I"],[401,"Enchants_Name_2","Fantasy Coin I","幻想币Ⅰ","Fantasy Coin I","Fantasy Coin I"],[402,"Enchants_Name_3","Techno Coin I","科技币Ⅰ","Techno Coin I","Techno Coin I"],[403,"Enchants_Name_4","Teamwork","团队合作","Teamwork","Teamwork"],[404,"Enchants_Name_5","Super Teamwork","超级团队合作","Super Teamwork","Super Teamwork"],[405,"Enchants_Name_6","Charm","魅力","Charm","Charm"],[406,"Enchants_Name_7","Power I","力量Ⅰ","Power I","Power I"],[407,"Enchants_Name_8","Agility I","敏捷Ⅰ","Agility I","Agility I"],[408,"Enchants_Name_9","Diamond I","钻石Ⅰ","Diamond I","Diamond I"],[409,"Enchants_Name_10","Chest Destroyer I","宝箱破坏者Ⅰ","Chest Destroyer I","Chest Destroyer I"],[410,"Enchants_Name_11","Gift I","礼物Ⅰ","Gift I","Gift I"],[411,"Enchants_Name_12","Crazy Multiplier I","疯狂乘数Ⅰ","Crazy Multiplier I","Crazy Multiplier I"],[412,"Enchants_Name_13","Royalty","王权","Royalty","Royalty"],[413,"Enchants_Name_14","Magnet","磁铁","Magnet","Magnet"],[414,"Enchants_Name_15","Glitters","闪闪发光","Glitters","Glitters"],[415,"Enchants_Describe_1","{0}% extra coins","金币收益提高{0}%","{0}% extra coins","{0}% extra coins"],[416,"Enchants_Describe_2","{0}% extra fantasy coins","幻想币收益提高{0}%","{0}% extra fantasy coins","{0}% extra fantasy coins"],[417,"Enchants_Describe_3","{0}% extra techno coins","科技币收益提高{0}%","{0}% extra techno coins","{0}% extra techno coins"],[418,"Enchants_Describe_4","15% bonus dmg to all pets","队内宠物伤害提高15%","15% bonus dmg to all pets","15% bonus dmg to all pets"],[419,"Enchants_Describe_5","30% bonus dmg to all pets","队内宠物伤害提高30%","30% bonus dmg to all pets","30% bonus dmg to all pets"],[420,"Enchants_Describe_6","25% bonus crit rate to all pets","队内宠物暴击率提高20%","20% bonus crit rate to all pets","25% bonus crit rate to all pets"],[421,"Enchants_Describe_7","{0}% bonus dmg","伤害提高{0}%","{0}% bonus dmg","{0}% bonus dmg"],[422,"Enchants_Describe_8","{0}% bonus movement speed","宠物移速提高{0}%","{0}% bonus movement speed","{0}% bonus movement speed"],[423,"Enchants_Describe_9","{0}% bonus diamonds","钻石收益提高{0}%","{0}% bonus diamonds","{0}% bonus diamonds"],[424,"Enchants_Describe_10","{0}% bonus dmg to chests","对宝箱伤害提高{0}%","{0}% bonus dmg to chests","{0}% bonus dmg to chests"],[425,"Enchants_Describe_11","{0}% bonus giftbox reward","礼物盒收益提高{0}%","{0}% bonus giftbox reward","{0}% bonus giftbox reward"],[426,"Enchants_Describe_12","{0}% extra coins on Bonus Coin Piles","多倍奖励的金币收益提高{0}%","{0}% extra coins on Bonus Coin Piles","{0}% extra coins on Bonus Coin Piles"],[427,"Enchants_Describe_13","100% bonus dmg, 100% bonus diamond, 50% bonus movement speed","伤害提高100%，钻石收益提高100%，移速提高50%","100% bonus dmg, 100% bonus diamond, 50% bonus movement speed","100% bonus dmg, 100% bonus diamond, 50% bonus movement speed"],[428,"Enchants_Describe_14","Ability to collect coins and diamonds","宠物可吸附并收集金币钻石","Ability to collect coins and diamonds","Ability to collect coins and diamonds"],[429,"Enchants_Describe_15","Random diamond regen (in-team/unique)","在队伍中随机生成钻石（唯一）","Random diamond regen (in-team/unique)","Random diamond regen (in-team/unique)"],[430,"Text_ItemUI_8","All claimed","全部已领取","All Redeemed","All Redeemed"],[431,"Achievement_Grade_1","Easy","容易","Easy","Easy"],[432,"Achievement_Grade_2","Simple","简单","Simple","Simple"],[433,"Achievement_Grade_3","Average","中等","Average","Average"],[434,"Achievement_Grade_4","Hard","困难","Hard","Hard"],[435,"Achievement_Grade_5","Crazy","疯狂","Crazy","Crazy"],[436,"Achievement_Name_1","Egg Hatcher","孵蛋师","Egg Hatcher","Egg Hatcher"],[437,"Achievement_Name_2","Egg Hatcher II","孵蛋师Ⅱ","Egg Hatcher II","Egg Hatcher II"],[438,"Achievement_Name_3","Egg Hatcher III","孵蛋师Ⅲ","Egg Hatcher III","Egg Hatcher III"],[439,"Achievement_Name_4","Hatching Expert","孵蛋专家","Hatching Expert","Hatching Expert"],[440,"Achievement_Name_5","Hatching Expert II","孵蛋专家Ⅱ","Hatching Expert II","Hatching Expert II"],[441,"Achievement_Name_6","Hatching Expert III","孵蛋专家Ⅲ","Hatching Expert III","Hatching Expert III"],[442,"Achievement_Name_7","Hatching Elite","孵蛋精英","Hatching Elite","Hatching Elite"],[443,"Achievement_Name_8","Hatching Elite II","孵蛋精英Ⅱ","Hatching Elite II","Hatching Elite II"],[444,"Achievement_Name_9","Hatching Elite II","孵蛋精英Ⅲ","Hatching Elite II","Hatching Elite II"],[445,"Achievement_Name_10","Hatching Champion","孵蛋冠军","Hatching Champion","Hatching Champion"],[446,"Achievement_Name_11","Hatching Champion II","孵蛋冠军Ⅱ","Hatching Champion II","Hatching Champion II"],[447,"Achievement_Name_12","Hatching Champion III","孵蛋冠军Ⅲ","Hatching Champion III","Hatching Champion III"],[448,"Achievement_Name_13","Hatching Legend","孵蛋传奇","Hatching Legend","Hatching Legend"],[449,"Achievement_Name_14","Hatching Legend II","孵蛋传奇Ⅱ","Hatching Legend II","Hatching Legend II"],[450,"Achievement_Name_15","Hatching Legend III","孵蛋传奇Ⅲ","Hatching Legend III","Hatching Legend III"],[451,"Achievement_Name_16","Coin Collector","硬币收藏家","Coin Collector","Coin Collector"],[452,"Achievement_Name_17","Coin Collector II","硬币收藏家Ⅱ","Coin Collector II","Coin Collector II"],[453,"Achievement_Name_18","Coin Collector III","硬币收藏家Ⅲ","Coin Collector III","Coin Collector III"],[454,"Achievement_Name_19","Coin Expert","硬币专家","Coin Expert","Coin Expert"],[455,"Achievement_Name_20","Coin Expert II","硬币专家Ⅱ","Coin Expert II","Coin Expert II"],[456,"Achievement_Name_21","Coin Expert III","硬币专家Ⅲ","Coin Expert III","Coin Expert III"],[457,"Achievement_Name_22","Coin Elite","硬币精英","Coin Elite","Coin Elite"],[458,"Achievement_Name_23","Coin Elite II","硬币精英Ⅱ","Coin Elite II","Coin Elite II"],[459,"Achievement_Name_24","Coin Elite III","硬币精英Ⅲ","Coin Elite III","Coin Elite III"],[460,"Achievement_Name_25","Coin Champion","硬币冠军","Coin Champion","Coin Champion"],[461,"Achievement_Name_26","Coin Champion II","硬币冠军Ⅱ","Coin Champion II","Coin Champion II"],[462,"Achievement_Name_27","Coin Champion III","硬币冠军Ⅲ","Coin Champion III","Coin Champion III"],[463,"Achievement_Name_28","Coin Legend","硬币传奇","Coin Legend","Coin Legend"],[464,"Achievement_Name_29","Coin Legend II","硬币传奇Ⅱ","Coin Legend II","Coin Legend II"],[465,"Achievement_Name_30","Coin Legend III","硬币传奇Ⅲ","Coin Legend III","Coin Legend III"],[466,"Achievement_Name_31","Chest I","宝箱Ⅰ","Chest I","Chest I"],[467,"Achievement_Name_32","Chest II","宝箱Ⅱ","Chest II","Chest II"],[468,"Achievement_Name_33","Chest III","宝箱Ⅲ","Chest III","Chest III"],[469,"Achievement_Name_34","Chest IV","宝箱Ⅳ","Chest IV","Chest IV"],[470,"Achievement_Name_35","Chest V","宝箱Ⅴ","Chest V","Chest V"],[471,"Achievement_Name_36","Chest VI","宝箱Ⅵ","Chest VI","Chest VI"],[472,"Achievement_Name_37","Chest VII","宝箱Ⅶ","Chest VII","Chest VII"],[473,"Achievement_Name_38","Chest VIII","宝箱Ⅷ","Chest VIII","Chest VIII"],[474,"Achievement_Name_39","Chest IX","宝箱Ⅸ","Chest IX","Chest IX"],[475,"Achievement_Name_40","Chest X","宝箱Ⅹ","Chest X","Chest X"],[476,"Achievement_Name_41","Chest Looter","宝箱掠夺者","Chest Looter","Chest Looter"],[477,"Achievement_Name_42","Big Pirate","大海盗","Big Pirate","Big Pirate"],[478,"Achievement_Name_43","One Piece","海贼王","One Piece","One Piece"],[479,"Achievement_Name_44","Gift I","礼物Ⅰ","Gift I","Gift I"],[480,"Achievement_Name_45","Gift II","礼物Ⅱ","Gift II","Gift II"],[481,"Achievement_Name_46","Gift III","礼物Ⅲ","Gift III","Gift III"],[482,"Achievement_Name_47","Gift IV","礼物Ⅳ","Gift IV","Gift IV"],[483,"Achievement_Name_48","Gift V","礼物Ⅴ","Gift V","Gift V"],[484,"Achievement_Name_49","Gift VI","礼物Ⅵ","Gift VI","Gift VI"],[485,"Achievement_Name_50","Gift VII","礼物Ⅶ","Gift VII","Gift VII"],[486,"Achievement_Name_51","Gift VIII","礼物Ⅷ","Gift VIII","Gift VIII"],[487,"Achievement_Name_52","Self-improvement","自我完善","Self-improvement","Self-improvement"],[488,"Achievement_Name_53","Huge Step","大进步","Huge Step","Huge Step"],[489,"Achievement_Name_54","Perfection","完美","Perfection","Perfection"],[490,"Achievement_Name_55","Heart Beginner","爱心初学者","Heart Beginner","Heart Beginner"],[491,"Achievement_Name_56","Heart Expert","爱心人士","Heart Expert","Heart Expert"],[492,"Achievement_Name_57","Heart Ambassador","爱心大使","Heart Ambassador","Heart Ambassador"],[493,"Achievement_Name_58","Heart Legend","爱心传奇","Heart Legend","Heart Legend"],[494,"Achievement_Name_59","Rainbow Creator","创造彩虹","Rainbow Creator","Rainbow Creator"],[495,"Achievement_Name_60","Double Rainbow","双重彩虹","Double Rainbow","Double Rainbow"],[496,"Achievement_Name_61","Triple Rainbow","三重彩虹","Triple Rainbow","Triple Rainbow"],[497,"Achievement_Name_62","All Rainbow","全是彩虹","All Rainbow","All Rainbow"],[498,"Achievement_Name_63","Mad Scientist","疯狂的科学家","Mad Scientist","Mad Scientist"],[499,"Achievement_Name_64","Lab Master","实验室大师","Lab Master","Lab Master"],[500,"Achievement_Name_65","Fusion Expert","融合专家","Fusion Expert","Fusion Expert"],[501,"Achievement_Name_66","Einstein","爱因斯坦","Einstein","Einstein"],[502,"Achievement_Name_67","Bad Luck","不幸者","Bad Luck","Bad Luck"],[503,"Achievement_Name_68","The Unfortunate","倒霉透了","The Unfortunate","The Unfortunate"],[504,"Achievement_Name_69","Underdog","失败者","Underdog","Underdog"],[505,"Achievement_Name_70","Little Elf","小精灵","Little Elf","Little Elf"],[506,"Achievement_Name_71","Little Wizard","小巫师","Little Wizard","Little Wizard"],[507,"Achievement_Name_72","Demagoguery","蛊惑精灵","Demagoguery","Demagoguery"],[508,"Achievement_Name_73","Supreme Wizard","至尊巫师","Supreme Wizard","Supreme Wizard"],[509,"Achievement_Name_74","Harry Potter","哈利波特","Harry Potter","Harry Potter"],[510,"Achievement_Name_75","Set Foot","开始远征","Set Foot","Set Foot"],[511,"Achievement_Name_76","Journey Begins","建立旅程","Journey Begins","Journey Begins"],[512,"Achievement_Name_77","Rare Egg!","稀有蛋!","Rare Egg!","Rare Egg!"],[513,"Achievement_Name_78","Epic Egg!","史诗蛋!","Epic Egg!","Epic Egg!"],[514,"Achievement_Name_79","Legendary Egg!","传说蛋!","Legendary Egg!","Legendary Egg!"],[515,"Achievement_Name_80","Mythical Egg!","神话蛋!","Mythical Egg!","Mythical Egg!"],[516,"Achievement_Name_81","Luck!","幸运!","Luck!","Luck!"],[517,"Achievement_Name_82","Lady Luck!","幸运女神!","Lady Luck!","Lady Luck!"],[518,"Achievement_Name_83","Bad Luck!","运气真差!","Bad Luck!","Bad Luck!"],[519,"Achievement_Name_84","Chosen One","被选中的人","Chosen One","Chosen One"],[520,"Achievement_Name_85","Rainbow Itself","彩虹本虹","Rainbow Itself","Rainbow Itself"],[521,"Achievement_Name_86","Black Magic","黑魔法","Black Magic","Black Magic"],[522,"Achievement_Name_87","Pharaoh Relics","法老遗迹","Pharaoh Relics","Pharaoh Relics"],[523,"Achievement_Name_88","Angel Relics","天使遗迹","Angel Relics","Angel Relics"],[524,"Achievement_Name_89","Above the Clouds","云层之上","Above the Clouds","Above the Clouds"],[525,"Achievement_Name_90","Techno Dominator","科技主宰","Techno Dominator","Techno Dominator"],[526,"Achievement_Detail_1","Hatched {0} pet eggs","孵化{0}个宠物蛋","Hatched {0} pet eggs","Hatched {0} pet eggs"],[527,"Achievement_Detail_2","Mined {0} coins","挖矿{0}枚硬币","Mined {0} coins","Mined {0} coins"],[528,"Achievement_Detail_3","Destroyed {0} chests","打破 {0}个宝箱","Destroyed {0} chests","Destroyed {0} chests"],[529,"Achievement_Detail_4","Destroyed {0} gifts","打破 {0}礼物","Destroyed {0} gifts","Destroyed {0} gifts"],[530,"Achievement_Detail_5","Upgraded {0} times","升级成功{0}次","Upgraded {0} times","Upgraded {0} times"],[531,"Achievement_Detail_6","Converted {0} heart pets","将{0}只宠物成功转换为爱心化","Converted {0} heart pets","Converted {0} heart pets"],[532,"Achievement_Detail_7","Converted {0} rainbow pets","将{0}只宠物成功转换为彩虹化","Converted {0} rainbow pets","Converted {0} rainbow pets"],[533,"Achievement_Detail_8","Merged pets {0} times","融合宠物{0}次","Merged pets {0} times","Merged pets {0} times"],[534,"Achievement_Detail_9","Failed to convert heart pets {0} times","爱心化失败{0}次","Failed to convert heart pets {0} times","Failed to convert heart pets {0} times"],[535,"Achievement_Detail_10","Enchanted {0} times","附魔{0}次","Enchanted {0} times","Enchanted {0} times"],[536,"Achievement_Detail_11","Unlocked 3 areas","解锁 3 个区域","Unlocked 3 areas","Unlocked 3 areas"],[537,"Achievement_Detail_12","Unlocked 3 areas again","再次解锁 3 个区域","Unlocked 3 areas again","Unlocked 3 areas again"],[538,"Achievement_Detail_13","Hatched a rare pet","孵化出稀有宠物","Hatched a rare pet","Hatched a rare pet"],[539,"Achievement_Detail_14","Hatched an epic pet","孵化出史诗宠物","Hatched an epic pet","Hatched an epic pet"],[540,"Achievement_Detail_15","Hatched a legendary pet","孵化出传说宠物","Hatched a legendary pet","Hatched a legendary pet"],[541,"Achievement_Detail_16","Hatched a mythical pet","孵化出神话宠物","Hatched a mythical pet","Hatched a mythical pet"],[542,"Achievement_Detail_17","Converted 1 pet to a heart pet","使用一只宠物爱心化成功","Converted 1 pet to a heart pet","Converted 1 pet to a heart pet"],[543,"Achievement_Detail_18","Converted 1 legendary pet to a golden pet","使用一只传说宠物黄金化成功","Converted 1 legendary pet to a golden pet","Converted 1 legendary pet to a golden pet"],[544,"Achievement_Detail_19","Lost 5 pets for a heart pet","使用五只宠物爱心化失败","Lost 5 pets for a heart pet","Lost 5 pets for a heart pet"],[545,"Achievement_Detail_20","Merged a legendary pet","融合出了传说宠物","Merged a legendary pet","Merged a legendary pet"],[546,"Achievement_Detail_21","Converted 1 legendary pet to a rainbow pet","使用一只传说宠物彩虹化成功","Converted 1 legendary pet to a rainbow pet","Converted 1 legendary pet to a rainbow pet"],[547,"Achievement_Detail_22","Enchanted a pet with a tag","宠物附魔独特的标签成功","Enchanted a pet with a tag","Enchanted a pet with a tag"],[548,"Achievement_Detail_23","Broke a giant chest in the Area Ⅷ","击破地区Ⅷ大宝箱","Broke a giant chest in the Area Ⅷ","Broke a giant chest in the Area Ⅷ"],[549,"Achievement_Detail_24","Broke a giant chest in the paradise world","击破大天堂岛的天堂大宝箱","Broke a giant chest in the paradise world","Broke a giant chest in the paradise world"],[550,"Achievement_Detail_25","Reached Fantasy World","到达幻想世界","Reached Fantasy World","Reached Fantasy World"],[551,"Achievement_Detail_26","Reached Techno World","到达科技世界","Reached Techno World","Reached Techno World"],[552,"Achievement_UIname_1","Achievements!","成就!","Achievements!","Achievements!"],[553,"Achievement_UIname_2","Finished!","完成","Finished!","Finished!"],[554,"Egg_Areaname_1","Area Ⅰ Egg","地区Ⅰ蛋","Area Ⅰ Egg","Area Ⅰ Egg",null,"Area Ⅰ Egg"],[555,"Egg_Areaname_2","Area Ⅱ Egg","地区Ⅱ蛋","Area Ⅱ Egg","Area Ⅱ Egg",null,"Area Ⅱ Egg"],[556,"Egg_Areaname_3","Area Ⅲ Egg","地区Ⅲ蛋","Area Ⅲ Egg","Area Ⅲ Egg",null,"Area Ⅲ Egg"],[557,"Egg_Areaname_4","Area Ⅳ Egg","地区Ⅳ蛋","Area Ⅳ Egg","Area Ⅳ Egg",null,"Area Ⅳ Egg"],[558,"Egg_Areaname_5","Area Ⅴ Egg","地区Ⅴ蛋","Area Ⅴ Egg","Area Ⅴ Egg",null,"Area Ⅴ Egg"],[559,"Egg_Areaname_6","Area Ⅵ Egg","地区Ⅵ蛋","Area Ⅵ Egg ","Area Ⅵ Egg ",null,"Area Ⅵ Egg"],[560,"Egg_Areaname_7","Area Ⅶ Egg","地区Ⅶ蛋","Area Ⅶ Egg","Area Ⅶ Egg",null,"Area Ⅶ Egg"],[561,"Egg_Areaname_8","Area Ⅷ Egg","地区Ⅷ蛋","Area Ⅷ Egg","Area Ⅷ Egg",null,"Area Ⅷ Egg"],[562,"Egg_Areaname_9","Area Ⅸ Egg","地区Ⅸ蛋","Area Ⅸ Egg","Area Ⅸ Egg",null,"Area Ⅸ Egg"],[563,"Egg_Areaname_10","Area Ⅹ Egg","地区Ⅹ蛋","Area Ⅹ Egg","Area Ⅹ Egg",null,"Area Ⅹ Egg"],[564,"Egg_Areaname_11","Area Ⅺ Egg","地区Ⅺ蛋","Area Ⅺ Egg","Area Ⅺ Egg",null,"Area Ⅺ Egg"],[565,"Egg_Areaname_12","Area Ⅻ Egg","地区Ⅻ蛋","Area Ⅻ Egg","Area Ⅻ Egg",null,"Area Ⅻ Egg"],[566,"Egg_Areaname_13","Area XIII Egg","地区XIII蛋","Area XIII Egg","Area XIII Egg",null,"Area XIII Egg"],[567,"Egg_Areaname_14","Area XIV Egg","地区XIV蛋","Area XIV Egg","Area XIV Egg",null,"Area XIV Egg"],[568,"Egg_Areaname_15","Area XV Egg","地区XV蛋","Area XV Egg","Area XV Egg",null,"Area XV Egg"],[569,"Egg_Areaname_16","Area XVI Egg","地区XVI蛋","Area XVI Egg","Area XVI Egg",null,"Area XVI Egg"],[570,"Enchants_Name_16","Best Partner","最好的伙伴","Best Partner","Best Partner"],[571,"Enchants_Describe_16","Supreme Companion","出身显赫","Supreme Companion","Supreme Companion"],[572,"Tips_Enchants_1","Are you sure?","你确定吗?","Are you sure?","Are you sure?"],[573,"Tips_Enchants_2","Are you sure? The enchantment will be reset.","你确定吗？附魔会被重置","Are you sure? The enchantment will be reset.","Are you sure? The enchantment will be reset."],[574,"Tips_Enchants_3","These pets already have the required enchantments.","这些宠物已经有了所需的附魔","These pets already have the required enchantments.","These pets already have the required enchantments."],[575,"Tips_Enchants_4","Existing enchantments will be reset.","选中词条的附魔将被覆盖 ","Existing enchantments will be reset.","Existing enchantments will be reset."],[576,"Tips_Enchants_5","Enchant your pet, until it gets any selected enchantment.","附魔你的宠物,直到他获得你选择的任意词条","Enchant your pet, until it gets any selected enchantment.","Enchant your pet, until it gets any selected enchantment."],[577,"Tips_Enchants_6","Enchantment successful!","附魔成功!","Enchantment succeeded!","Enchantment succeeded!"],[578,"Tips_Enchants_7","Enchant","附魔","Enchant","Enchant"],[579,"Tips_Enchants_8","Stop","停止","Stop","Stop"],[580,"Task_Info_1","Destroy {0} coin piles in town","在城镇破坏{0}个金币堆","Destroy {0} coin piles in town","Destroy {0} coin piles in town"],[581,"Task_Info_2","Hatch {0} pets from the Area Ⅰ egg","在地区Ⅰ蛋孵化{0}只宠物","Hatch {0} pets from the Area Ⅰ egg","Hatch {0} pets from the Area Ⅰ egg"],[582,"Task_Info_3","Destroy {0} coin chests in town","在城镇打破{0}个金币箱子","Destroy {0} coin chests in town","Destroy {0} coin chests in town"],[583,"Task_Info_4","Destroy {0} gifts in the Area Ⅱ","地区Ⅱ中破坏{0}个礼物盒","Destroy {0} gifts in the Area Ⅱ","Destroy {0} gifts in the Area Ⅱ"],[584,"Task_Info_5","Upgrade {0} times","进行{0}次升级","Upgrade {0} times","Upgrade {0} times"],[585,"Task_Info_6","Hatch {0} pets from the Area Ⅱ egg","在地区Ⅱ蛋中孵化{0}只宠物","Hatch {0} pets from the Area Ⅱ egg","Hatch {0} pets from the Area Ⅱ egg"],[586,"Task_Info_7","Destroy {0} diamond chests on the Area Ⅲ","在地区Ⅲ打破{0}个钻石箱子","Destroy {0} diamond chests on the Area Ⅲ","Destroy {0} diamond chests on the Area Ⅲ"],[587,"Task_Info_8","Use the vitality machine {0} times","使用爱心化机器{0}次","Use the heart machine {0} times","Use the heart machine {0} times"],[588,"Task_Info_9","Merge {0} rare or higher rarity pets","融合出{0}只稀有以上的宠物","Merge {0} rare or higher rarity pets","Merge {0} rare or higher rarity pets"],[589,"Task_Info_10","Hatch {0} pets from the Area Ⅳ egg","从地区Ⅳ蛋中孵化{0}只宠物","Hatch {0} pets from the Area Ⅳ egg","Hatch {0} pets from the Area Ⅳ egg"],[590,"Task_Info_11","Use the rainbow machine {0} times","使用彩虹化机器{0}次","Use the rainbow machine {0} times","Use the rainbow machine {0} times"],[591,"Task_Info_12","Destroy {0} closed chests","打破封闭宝箱{0}个","Destroy {0} closed chests","Destroy {0} closed chests"],[592,"Task_Info_13","Destroy {0} gifts in the Area Ⅴfield","在地区Ⅴ破坏{0}个礼物盒","Destroy {0} gifts in the Area Ⅴfield","Destroy {0} gifts in the Area Ⅴfield"],[593,"Task_Info_14","Hatch {0} epic pets from the Area Ⅴ egg","在地区Ⅴ蛋中孵化{0}只史诗宠物","Hatch {0} epic pets from the Area Ⅴ egg","Hatch {0} epic pets from the Area Ⅴ egg"],[594,"Task_Info_15","Destroy {0} coin chests in the Area Ⅴfield","在地区Ⅴ破坏{0}个金币箱子","Destroy {0} coin chests in the Area Ⅴfield","Destroy {0} coin chests in the Area Ⅴfield"],[595,"Task_Info_16","Complete {0} trades","成功完成{0}次交易","Complete {0} trades","Complete {0} trades"],[596,"Task_Info_17","Hatch {0} pets from the Area Ⅵ egg","在地区Ⅵ蛋中孵化{0}只宠物","Hatch {0} pets from the Area Ⅵ egg","Hatch {0} pets from the Area Ⅵ egg"],[597,"Task_Info_18","Destroy {0} coin chests at the Area Ⅵ realm","在地区Ⅵ打破{0}个金币箱子","Destroy {0} coin chests at the Area Ⅵ","Destroy {0} coin chests at the Area Ⅵ"],[598,"Task_Info_19","Destroy {0} diamonds at the aqua kingdom","在地区Ⅶ打破{0}个钻石","Destroy {0} diamonds at the Area Ⅶ","Destroy {0} diamonds at the Area Ⅶ"],[599,"Task_Info_20","Hatch {0} pets of Rare or above rarity from the aquatic egg","从地区Ⅶ蛋中孵化{0}只稀有以上的宠物","Hatch {0} pets of Rare or above rarity","Hatch {0} pets of Rare or above rarity"],[600,"Task_Info_21","Destroy {0} coin chests at the aqua kingdom","在地区Ⅶ打破{0}个金币箱子","Destroy {0} coin chests at the Area Ⅶ","Destroy {0} coin chests at the Area Ⅶ"],[601,"Task_Info_22","Destroy {0} giant chests in the Area Ⅷ","在地区Ⅷ打破{0}个巨型箱子","Destroy {0} giant chests in the Area Ⅷ","Destroy {0} giant chests in the Area Ⅷ"],[602,"Task_Info_23","Hatch {0} legendary pets from the Area Ⅷ egg","在地区Ⅷ蛋中孵化出{0}只传说宠物","Hatch {0} legendary pets from the Area Ⅷ egg","Hatch {0} legendary pets from the Area Ⅷ egg"],[603,"Task_Info_24","Complete {0} trades","完成{0}次交易","Complete {0} trades","Complete {0} trades"],[604,"Task_Info_25","Hatch {0} pets from the Area Ⅸ egg","在地区Ⅸ蛋中孵化{0}只宠物","Hatch {0} pets from the Area Ⅸ egg","Hatch {0} pets from the Area Ⅸ egg"],[605,"Task_Info_26","Destroy {0} coin chests in the Area Ⅸ forest","在魔法森林破坏{0}个金币箱子","Destroy {0} coin chests in the Area Ⅸ forest","Destroy {0} coin chests in the Area Ⅸ forest"],[606,"Task_Info_27","Use the enchanting machine {0} times","使用附魔机{0}次","Use the enchanting machine {0} times","Use the enchanting machine {0} times"],[607,"Task_Info_28","Destroy {0} gifts on Area Ⅹ island","在地区Ⅹ岛打破{0}个礼物盒","Destroy {0} gifts on Area Ⅹ island","Destroy {0} gifts on Area Ⅹ island"],[608,"Task_Info_29","Hatch {0} pets from the Area Ⅹ egg","在地区Ⅹ蛋中孵化{0}只宠物","Hatch {0} pets from the Area Ⅹ egg","Hatch {0} pets from the Area Ⅹ egg"],[609,"Task_Info_30","Destroy {0} giant chests on Area Ⅹ island","在地区Ⅹ岛打破{0}次巨型箱子","Destroy {0} giant chests on Area Ⅹ island","Destroy {0} giant chests on Area Ⅹ island"],[610,"Task_Info_31","Complete {0} trades","完成{0}次交易","Complete {0} trades","Complete {0} trades"],[611,"Task_Info_32","Hatch {0} legendary pets from the samurai egg","在武士蛋孵化{0}只传说宠物","Hatch {0} legendary pets from the samurai egg","Hatch {0} legendary pets from the samurai egg"],[612,"Task_Info_33","Destroy {0} diamonds on samurai island","在武士岛破坏{0}个钻石","Destroy {0} diamonds on samurai island","Destroy {0} diamonds on samurai island"],[613,"Task_shop_1","Quest-exclusive Egg","任务专属蛋","Quest-exclusive Egg","Quest-exclusive Egg"],[614,"Task_shop_2","SO-10 Skateboard","SO-10滑板","SO-10 Skateboard","SO-10 Skateboard"],[615,"Task_shop_3","Pet Slots +1!","+1宠物位!","Pet Slots +1!","Pet Slots +1!"],[616,"Task_shop_4","Bigger backpack!","更大的背包!","Bigger backpack!","Bigger backpack!"],[617,"Task_shop_5","Piles of diamonds","成堆的钻石","Piles of diamonds","Piles of diamonds"],[618,"Task_shop_6","A pack of diamonds","一包钻石","A pack of diamonds","A pack of diamonds"],[619,"Task_shop_7","A small bag of diamonds","小袋钻石","A small bag of diamonds","A small bag of diamonds"],[620,"Task_shop_8","Redeem SO-10 Skateboard","兑换SO-10超级滑板","Redeem SO-10 Skateboard","Redeem SO-10 Skateboard"],[621,"Task_shop_9","Equipped Pets Maximum +1","同时可装备宠物数量+1!","Equipped Pets Maximum +1","Equipped Pets Maximum +1"],[622,"Task_shop_10","Pet Backpack Capacity + 10!","宠物背包容量+10!","Pet Backpack Capacity + 10!","Pet Backpack Capacity + 10!"],[623,"Task_shop_11","Update Soon!","马上更新!","Update Soon!","Update Soon!"],[624,"Task_shop_12","Coming Soon!","等待发布~","Coming Soon!","Coming Soon!"],[625,"Tips_huaban_1","You don't have a skateboard yet. Get one through the quest shop!","你还没有滑板，通过任务商店获得","You don't have a skateboard yet. Get one through the quest shop!","You don't have a skateboard yet. Get one through the quest shop!"],[626,"Task_shop_13","Spend {0} quest points to buy this item?","你确认花费{0}任务点数购买这个物品吗？","Spend {0} quest points to buy this item?","Spend {0} quest points to buy this item?"],[627,"Task_shop_14","You still need {0} quest points!","你还需要{0}任务点数才能购买!","You still need {0} quest points!","You still need {0} quest points!"],[628,"AreaDivide_Name_12","Fantasy Shop","幻想商店","Fantasy Shop","Fantasy Shop"],[629,"AreaDivide_Name_13","Portal","传送门","Portal","Portal"],[630,"AreaDivide_Name_14","Magic Forest","魔法森林","Magic Forest","Magic Forest"],[631,"AreaDivide_Name_15","Mysterious Relics","神秘遗迹","Mysterious Relics","Mysterious Relics"],[632,"AreaDivide_Name_16","Antique Courtyard","地区Ⅺ庭院","Antique Courtyard","Antique Courtyard"],[633,"Task_shop_15","The item has been redeemed!","商品已经兑换过了~","The item has been redeemed!","The item has been redeemed!"],[634,"AreaWorld_textUI_2","Fantasy World","幻想世界","Fantasy World","Fantasy World"],[635,"Loading_Text_1","Entering {0}...","正在进入{0}...","Entering {0}...","Entering {0}..."],[636,"PetARR_petName_78","American Monkey","美洲猴","American Monkey","American Monkey"],[637,"PetARR_petName_79","Indian Yeti","印第安雪人","Indian Yeti","Indian Yeti"],[638,"PetARR_petName_80","Blushy Parrot","鹦鹉玄凤","Blushy Parrot","Blushy Parrot"],[639,"PetARR_petName_81","Forest Deer","森林鹿","Forest Deer","Forest Deer"],[640,"PetARR_petName_82","Fairy","仙灵","Fairy","Fairy"],[641,"PetARR_petName_83","Egyptian Goldfish","埃及金鱼","Egyptian Goldfish","Egyptian Goldfish"],[642,"PetARR_petName_84","Egyptian Octopus","埃及章鱼","Egyptian Octopus","Egyptian Octopus"],[643,"PetARR_petName_85","Egyptian Shark","埃及鲨鱼","Egyptian Shark","Egyptian Shark"],[644,"PetARR_petName_86","Egyptian Deer","埃及鹿","Egyptian Deer","Egyptian Deer"],[645,"PetARR_petName_87","Egyptian Fairy","埃及仙灵","Egyptian Fairy","Egyptian Fairy"],[646,"PetARR_petName_88","Cobra","眼镜蛇","Cobra","Cobra"],[647,"PetARR_petName_89","Anubis","阿努比斯","Anubis","Anubis"],[648,"PetARR_petName_90","Samurai Tiger","武士老虎","Samurai Tiger","Samurai Tiger"],[649,"PetARR_petName_91","Samurai Walrus","武士海象","Samurai Walrus","Samurai Walrus"],[650,"PetARR_petName_92","Samurai Penguin","武士企鹅","Samurai Penguin","Samurai Penguin"],[651,"PetARR_petName_93","Samurai Snake","武士蛇","Samurai Snake","Samurai Snake"],[652,"PetARR_petName_94","Samurai Anubis","武士阿努比斯","Samurai Anubis","Samurai Anubis"],[653,"PetARR_petName_95","Samurai Dragon","武士龙","Samurai Dragon","Samurai Dragon"],[654,"Task_shop_16","Special Reward","特别奖励","Special Reward","Special Reward"],[655,"Task_shop_17","Diamond Pack","钻石包","Diamond Pack","Diamond Pack"],[656,"Task_shop_18","Quest complete, you got {0} quest points!","任务完成并获得+{0}任务点数","Quest complete, you got {0} quest points!","Quest complete, you got {0} quest points!"],[657,"Task_shop_19","{0} Quest Points","{0}任务点数","{0} Quest Points","{0} Quest Points"],[658,"Tips_Enchants_9","Unenchanted","未附魔","Unenchanted","Unenchanted"],[659,"Portol_Tip_1","{0} Fantasy Coins","{0}幻想币","{0} Fantasy Coins","{0} Fantasy Coins"],[660,"Portol_Tip_2","Not Yet Open","尚未开放","Not Yet Open","Not Yet Open"],[661,"PetARR_petName_96","Jaguar","美洲虎","Jaguar","Jaguar"],[662,"PetARR_petName_97","American Turtle","美洲龟","American Turtle","American Turtle"],[663,"Enchants_Name_17","Coin II","金币Ⅱ","Coin II","Coin II"],[664,"Enchants_Name_18","Coin III","金币Ⅲ","Coin III","Coin III"],[665,"Enchants_Name_19","Coin IV","金币Ⅳ","Coin IV","Coin IV"],[666,"Enchants_Name_20","Coin V","金币Ⅴ","Coin V","Coin V"],[667,"Enchants_Name_21","Fantasy Coin II","幻想币Ⅱ","Fantasy Coin II","Fantasy Coin II"],[668,"Enchants_Name_22","Fantasy Coin III","幻想币Ⅲ","Fantasy Coin III","Fantasy Coin III"],[669,"Enchants_Name_23","Fantasy Coin IV","幻想币Ⅳ","Fantasy Coin IV","Fantasy Coin IV"],[670,"Enchants_Name_24","Fantasy Coin V","幻想币Ⅴ","Fantasy Coin V","Fantasy Coin V"],[671,"Enchants_Name_25","Techno Coin II","科技币Ⅱ","Techno Coin II","Techno Coin II"],[672,"Enchants_Name_26","Techno Coin III","科技币Ⅲ","Techno Coin III","Techno Coin III"],[673,"Enchants_Name_27","Techno Coin IV","科技币Ⅳ","Techno Coin IV","Techno Coin IV"],[674,"Enchants_Name_28","Techno Coin V","科技币Ⅴ","Techno Coin V","Techno Coin V"],[675,"Enchants_Name_29","Power II","力量Ⅱ","Power II","Power II"],[676,"Enchants_Name_30","Power III","力量Ⅲ","Power III","Power III"],[677,"Enchants_Name_31","Power IV","力量Ⅳ","Power IV","Power IV"],[678,"Enchants_Name_32","Power V","力量Ⅴ","Power V","Power V"],[679,"Enchants_Name_33","Agility II","敏捷Ⅱ","Agility II","Agility II"],[680,"Enchants_Name_34","Agility III","敏捷Ⅲ","Agility III","Agility III"],[681,"Enchants_Name_35","Diamond II","钻石Ⅱ","Diamond II","Diamond II"],[682,"Enchants_Name_36","Diamond III","钻石Ⅲ","Diamond III","Diamond III"],[683,"Enchants_Name_37","Diamond IV","钻石Ⅳ","Diamond IV","Diamond IV"],[684,"Enchants_Name_38","Diamond V","钻石Ⅴ","Diamond V","Diamond V"],[685,"Enchants_Name_39","Chest Destroyer II","宝箱破坏者Ⅱ","Chest Destroyer II","Chest Destroyer II"],[686,"Enchants_Name_40","Chest Destroyer III","宝箱破坏者Ⅲ","Chest Destroyer III","Chest Destroyer III"],[687,"Enchants_Name_41","Gift II","礼物Ⅱ","Gift II","Gift II"],[688,"Enchants_Name_42","Gift III","礼物Ⅲ","Gift III","Gift III"],[689,"Enchants_Name_43","Crazy Multiplier II","疯狂乘数Ⅱ","Crazy Multiplier II","Crazy Multiplier II"],[690,"Enchants_Name_44","Crazy Multiplier III","疯狂乘数Ⅲ","Crazy Multiplier III","Crazy Multiplier III"],[691,"Enchants_Name_45","Crazy Multiplier IV","疯狂乘数Ⅳ","Crazy Multiplier IV","Crazy Multiplier IV"],[692,"Enchants_Name_46","Crazy Multiplier V","疯狂乘数Ⅴ","Crazy Multiplier V","Crazy Multiplier V"],[693,"PetARR_petName_98","SO-10","SO-10","SO-10","SO-10"],[694,"PetARR_petName_99","Huge SO-10","巨大·SO-10","Huge SO-10","Huge SO-10"],[695,"Achievement_Detail_27","Expanded backpack capacity by {0}","背包扩展+{0}","Expanded backpack capacity by {0}","Expanded backpack capacity by {0}"],[696,"AreaDivide_Name_17","Pink Candy","粉红糖果","Pink Candy","Pink Candy"],[697,"AreaDivide_Name_18","Dark Tomb Forest","黑暗墓林","Dark Tomb Forest","Dark Tomb Forest"],[698,"AreaDivide_Name_19","Magma Hell","岩浆地狱","Magma Hell","Magma Hell"],[699,"AreaDivide_Name_20","Tears of Kingdom","天国之泪","Tears of Kingdom","Tears of Kingdom"],[700,"AreaDivide_Name_21","Paradise World","天堂世界","Paradise World","Paradise World"],[701,"Button_view_1","Close","近","Close","Close"],[702,"Button_view_2","Far","远","Far","Far"],[703,"Button_view_3","Reset","恢复","Reset","Reset"],[704,"World_3D_1","Tap the coins","点击金币","Tap the coins","Tap the coins"],[705,"World_3D_2","Tap on the coin piles to get coins","点击金币堆获得金币","Tap on the coin piles to get coins","Tap on the coin piles to get coins"],[706,"World_3D_3","Vitalize","爱心化!","Heart!","Heart!"],[707,"World_3D_4","Vitalize your pet to increase its Attack Power!","将宠物爱心化提升攻击力","Heart your pet to increase its Attack Power!","Heart your pet to increase its Attack Power!"],[708,"UI_pagename_1","Wow!","哇哦!","Wow!","Wow!"],[709,"UI_pagename_2","Quest Shop!","任务商店!","Quest Shop!","Quest Shop!"],[710,"UI_pagename_3","Enchanted Pets!","附魔宠物!","Enchanted Pets!","Enchanted Pets!"],[711,"UI_pageinfo_1","Existing enchantments will be reset.","已有附魔会被重置","Existing enchantments will be reset.","Existing enchantments will be reset."],[712,"World_3D_5","Add extra abilities to pets","为宠物添加额外能力","Add extra abilities to pets","Add extra abilities to pets"],[713,"World_3D_6","~Quest~","~任务~","~Quest~","~Quest~"],[714,"World_3D_7","Shop","商店","Shop","Shop"],[715,"World_3D_8","Get close and tap the button to unlock.","靠近后点击按钮解锁","Get close and tap the button to unlock.","Get close and tap the button to unlock."],[716,"World_3D_9","Merge!","融合!","Merge!","Merge!"],[717,"World_3D_10","Merge multiple pets and see what happens!","融合多只宠物看看会出现什么吧","Merge multiple pets and see what happens!","Merge multiple pets and see what happens!"],[718,"World_3D_11","Rainbow!","彩虹化!","Rainbow!","Rainbow!"],[719,"World_3D_12","Rainbow your pet to increase its Attack Power!","将宠物彩虹化提升攻击力","Rainbow your pet to increase its Attack Power!","Rainbow your pet to increase its Attack Power!"],[720,"World_3D_13","Upgrade!","升级!","Upgrade!","Upgrade!"],[721,"World_3D_14","Enter the machine and tap the Upgrade button to improve attributes.","进入机器点击升级按钮提升属性","Enter the machine and tap the Upgrade button to improve attributes.","Enter the machine and tap the Upgrade button to improve attributes."],[722,"UI_pageinfo_2","Unlock codex levels","解锁图鉴等级","Unlock codex levels","Unlock codex levels"],[723,"UI_pagename_4","Attention!","注意!","Attention!","Attention!"],[724,"UI_pagename_5","OK!","好的!","OK!","OK!"],[725,"World_3D_15","Accelerating...","加速中...","Accelerating...","Accelerating..."],[726,"UI_pagename_6","Travel fast!","快速旅行!","Travel fast!","Travel fast!"],[727,"UI_pagename_7","~World~","~世界~","~World~","~World~"],[728,"UI_pagename_8","Select Tag","选择词条","Select Tag","Select Tag"],[729,"PetARR_petName_100","Deer","小鹿","Deer","Deer"],[730,"PetARR_petName_101","Green Snake","绿蛇","Green Snake","Green Snake"],[731,"PetARR_petName_102","Viper","毒蛇","Viper","Viper"],[732,"PetARR_petName_103","Candy Anubis","糖果阿努比斯","Candy Anubis","Candy Anubis"],[733,"PetARR_petName_104","Candy Dragon","糖果龙","Candy Dragon","Candy Dragon"],[734,"PetARR_petName_105","Demon Turtle","恶魔龟","Demon Turtle","Demon Turtle"],[735,"PetARR_petName_106","Demon Snowman","恶魔雪人","Demon Snowman","Demon Snowman"],[736,"PetARR_petName_107","Demon Penguin","恶魔企鹅","Demon Penguin","Demon Penguin"],[737,"PetARR_petName_108","Demon Walrus","恶魔海象","Demon Walrus","Demon Walrus"],[738,"PetARR_petName_109","Demon Fairy","恶魔仙灵","Demon Fairy","Demon Fairy"],[739,"PetARR_petName_110","Demon Cat","恶魔猫","Demon Cat","Demon Cat"],[740,"PetARR_petName_111","Demon Cerberus","恶魔三头犬","Demon Cerberus","Demon Cerberus"],[741,"PetARR_petName_112","Infernal Turtle","地狱龟","Infernal Turtle","Infernal Turtle"],[742,"PetARR_petName_113","Infernal Snowman","地狱雪人","Infernal Snowman","Infernal Snowman"],[743,"PetARR_petName_114","Infernal Penguin","地狱企鹅","Infernal Penguin","Infernal Penguin"],[744,"PetARR_petName_115","Infernal Walrus","地狱海象","Infernal Walrus","Infernal Walrus"],[745,"PetARR_petName_116","Infernal Dragon","地狱龙","Infernal Dragon","Infernal Dragon"],[746,"PetARR_petName_117","Infernal Spider","地狱蜘蛛","Infernal Spider","Infernal Spider"],[747,"PetARR_petName_118","Infernal Cerberus","地狱三头犬","Infernal Cerberus","Infernal Cerberus"],[748,"PetARR_petName_119","Angel Penguin","天使企鹅","Angel Penguin","Angel Penguin"],[749,"PetARR_petName_120","Angel Octopus","天使章鱼","Angel Octopus","Angel Octopus"],[750,"PetARR_petName_121","Angel Parrot","天使鹦鹉","Angel Parrot","Angel Parrot"],[751,"PetARR_petName_122","Angel Monkey","天使猴子","Angel Monkey","Angel Monkey"],[752,"PetARR_petName_123","Angel Spider","天使蜘蛛","Angel Spider","Angel Spider"],[753,"PetARR_petName_124","Emperor Penguin","帝王企鹅","Emperor Penguin","Emperor Penguin"],[754,"PetARR_petName_125","Emperor Octopus","帝王章鱼","Emperor Octopus","Emperor Octopus"],[755,"PetARR_petName_126","Emperor Parrot","帝王鹦鹉","Emperor Parrot","Emperor Parrot"],[756,"PetARR_petName_127","Emperor Cerberus","帝王三头犬","Emperor Cerberus","Emperor Cerberus"],[757,"PetARR_petName_128","Emperor Dragon","帝王龙","Emperor Dragon","Emperor Dragon"],[758,"PetARR_petName_129","Summer Penguin","夏日企鹅","Summer Penguin","Summer Penguin"],[759,"PetARR_petName_130","Summer Octopus","夏日章鱼","Summer Octopus","Summer Octopus"],[760,"Claw_Tips_1","Spend 1 summer coin on the claw machine?","要花费一个娃娃机币玩抓娃娃机吗？","Spend 1 summer coin on the claw machine?","Spend 1 summer coin on the claw machine?"],[761,"Claw_Tips_2","You don't have enough summer coins! \\nGet them through daily rewards!","娃娃机币不足！\n可以通过每日奖励获得娃娃机币！","You don't have enough summer coins! \\nGet them through daily rewards!","You don't have enough summer coins! \\nGet them through daily rewards!"],[762,"Claw_Tips_3","Other players are using the claw machine!","其他玩家在用抓娃娃机！","Other players are using the claw machine!","Other players are using the claw machine!"],[763,"Claw_Tips_4","Claw machine! Grab me a cutie!!!","抓娃娃娃娃机！！！","Claw machine! Grab me a cutie!!!","Claw machine! Grab me a cutie!!!"],[764,"Claw_Tips_5","Spend 1 summer coin for an attempt at claw machine!","用一个娃娃机币玩娃娃机","Spend 1 summer coin for an attempt at claw machine!","Spend 1 summer coin for an attempt at claw machine!"],[765,"Claw_Tips_6","In Use","正在使用中","In Use","In Use"],[766,"Claw_Tips_7","Summer event ongoing! Get summer coins!","活动中！获得娃娃机币！","Summer event ongoing! Get summer coins!","Summer event ongoing! Get summer coins!"],[767,"UIBUTTON1","Delete","删除","Delete","Delete"],[768,"UIBUTTON2","Cancel","取消","Cancel","Cancel"],[769,"pet_uiinfo1","Name your pet!","为你的宠物起昵称吧!","Name your pet!","Name your pet!"],[770,"Rank_Title_1","Rank","排行榜","Rank","Rank"],[771,"Rank_Title_2","Diamond Rank","钻石数量排行","Diamond Rank","Diamond Rank"],[772,"Rank_Title_3","Codex Rank","图鉴收集排行","Codex Rank","Codex Rank"],[773,"Portol_Tip_3","Teleport back to the main world?","是否传送回第一世界","Teleport back to the first world?","Teleport back to the first world?"],[774,"Claw_Tips_8","Summer event ongoing! New pets every day! Tap the red button on the claw machine! Chances to get a summer limited pet!","活动进行中！每天都有新宠物！点击娃娃机中央红色按钮，获得限定宠物！","Summer event ongoing! New pets every day! Tap the red button on the claw machine! Chances to get a summer limited pet!","Summer event ongoing! New pets every day! Tap the red button on the claw machine! Chances to get a summer limited pet!"],[775,"World_Tips_1","You obtained a legendary pet!","获得传说级宠物！","You obtained a legendary pet!","You obtained a legendary pet!"],[776,"World_Tips_2","You obtained a mythical pet!","获得神话级宠物！","You obtained a mythical pet!","You obtained a mythical pet!"],[777,"World_Tips_3","You obtained a summer limited pet!","获得限时宠物！","You obtained a summer limited pet!","You obtained a summer limited pet!"],[778,"World_Tips_4","You obtained a quest pet!","获得任务宠物！","You obtained a quest pet!","You obtained a quest pet!"],[779,"World_Tips_5","You obtained a super rare titanic pet!","获得超稀有巨大化宠物！","You obtained a super rare titanic pet!","You obtained a super rare titanic pet!"],[780,"World_Tips_6","Pet is attacking a giant chest in the Area Ⅷ. Come join it!","正在攻击地区Ⅷ大宝箱，快来和他一起吧！","Pet is attacking a giant chest in the Area Ⅷ. Come join it!","Pet is attacking a giant chest in the Area Ⅷ. Come join it!"],[781,"World_Tips_7","Pet is attacking a giant chest in the secret base. Come join it!","正在攻击秘密大宝箱，快来和他一起吧！","Pet is attacking a giant chest in the secret base. Come join it!","Pet is attacking a giant chest in the secret base. Come join it!"],[782,"World_Tips_8","Pet is attacking a giant chest on the Area Ⅹ. Come join it!","正在攻击地区Ⅹ大宝箱，快来和他一起吧！","Pet is attacking a giant chest on the Area Ⅹ island. Come join it!","Pet is attacking a giant chest on the Area Ⅹ island. Come join it!"],[783,"World_Tips_9","Pet is attacking a giant chest in the paradise world. Come join it!","正在攻击天堂大宝箱，快来和他一起吧！","Pet is attacking a giant chest in the paradise world. Come join it!","Pet is attacking a giant chest in the paradise world. Come join it!"],[784,"World_Tips_10","Upgraded to 50%!","已经升级到50%啦！","Upgraded to 50%!","Upgraded to 50%!"],[785,"World_Tips_11","Upgraded to 100%!","已经升级到100%啦！","Upgraded to 100%!","Upgraded to 100%!"],[786,"World_Tips_12","You've got {0} pets now. Go check them out!","已经拥有{0}只宠物啦，快去看看吧！","You've got {0} pets now. Go check them out!","You've got {0} pets now. Go check them out!"],[787,"World_Tips_13","Reached the second world!","到达第二世界！","Reached the second world!","Reached the second world!"],[788,"World_Tips_14","You obtained a legendary enchantment: Royalty!","获得传说级附魔王权！","You obtained a legendary enchantment: Royalty!","You obtained a legendary enchantment: Royalty!"],[789,"World_Tips_15","You obtained a legendary enchantment: Magnet!","获得传说级附魔磁铁！","You obtained a legendary enchantment: Magnet!","You obtained a legendary enchantment: Magnet!"],[790,"World_Tips_16","You obtained a legendary enchantment: Glitters!","获得传说级附魔闪闪发光！","You obtained a legendary enchantment: Glitters!","You obtained a legendary enchantment: Glitters!"],[791,"PetARR_petName_131","Dino Bearer","恐龙抗狼","Dino Bearer","Dino Bearer"],[792,"PetARR_petName_132","Candy Bearer","糖果龙抗狼","Candy Bearer","Candy Bearer"],[793,"Claw_Tips_9","Not enough summer coins! Spend {0} diamonds to get summer coins!","娃娃机币不足！花{0}钻石获得娃娃机币","Not enough summer coins! Spend {0} diamonds to get summer coins!","Not enough summer coins! Spend {0} diamonds to get summer coins!"],[794,"PetARR_petName_133","Waat · Reely","尊嘟假嘟","Waat · Reely","Waat · Reely"],[795,"PetARR_petName_134","Pirate Shark","海盗鲨鱼","Pirate Shark","Pirate Shark"],[796,"PetARR_petName_135","Royal Parrot","皇家鹦鹉","Royal Parrot","Royal Parrot"],[797,"PetARR_petName_136","Golden Surfer","冲浪小狼","Golden Surfer","Golden Surfer"],[798,"PetARR_petName_137","Titanic Golden Surfer","巨型冲浪小狼","Titanic Golden Surfer","Titanic Golden Surfer"],[799,"VIP_task_01","Claim online reward {0}","领取在线奖励{0}","Claim online reward {0}","Claim online reward {0}"],[800,"VIP_task_02","Destroy {0} coins","打破{0}个金币","Destroy {0} coins","Destroy {0} coins"],[801,"VIP_task_03","Hatch {0} pet eggs","打开{0}个宠物蛋","Hatch {0} pet eggs","Hatch {0} pet eggs"],[802,"VIP_task_04","Merge pets {0} times","完成宠物融合{0}次","Merge pets {0} times","Merge pets {0} times"],[803,"VIP_task_05","Convert {0} heart pets","成功爱心化宠物{0}次","Convert {0} heart pets","Convert {0} heart pets"],[804,"VIP_task_06","Convert {0} rainbow pets","成功彩虹化宠物{0}次","Convert {0} rainbow pets","Convert {0} rainbow pets"],[805,"VIP_task_07","Enchant pets {0} times","附魔宠物{0}次","Enchant pets {0} times","Enchant pets {0} times"],[806,"VIP_task_08","Make {0} successful trades","和玩家成功交易{0}次","Make {0} successful trades","Make {0} successful trades"],[807,"VIP_task_09","Obtain {0} legendary pets","获得传说宠物{0}次","Obtain {0} legendary pets","Obtain {0} legendary pets"],[808,"VIP_task_10","Obtain {0} mythical pets","获得神话宠物{0}次","Obtain {0} mythical pets","Obtain {0} mythical pets"],[809,"VIPmain_Text_1","Summer Pass!","夏日通行证！","Summer Pass!","Summer Pass!"],[810,"VIPmain_Text_2","Stars","星星","Stars","Stars"],[811,"VIPmain_Text_3","Quests refresh at 04:00 every morning. Don't forget to complete them!","任务每天凌晨04:00刷新，记得抓紧时间完成哦！","Quests refresh at 04:00 every morning. Don't forget to complete them!","Quests refresh at 04:00 every morning. Don't forget to complete them!"],[812,"VIPmain_Text_4","Purchase stars","购买星星","Purchase stars","Purchase stars"],[813,"VIPmain_Text_5","Unlock membership","解锁大会员","Unlock membership","Unlock membership"],[814,"VIPHud_Text_1","Pass Quests","通行证任务","Pass Quests","Pass Quests"],[815,"VIPBuy_Text_1","Membership Rewards","大会员奖励！","Membership Rewards","Membership Rewards"],[816,"VIPBuy_Text_2","Golden Key x2! (1 key for 15 stars)","金钥匙X2！（使用钥匙获得15颗星星）","Golden Key x2! (1 key for 15 stars)","Golden Key x2! (1 key for 15 stars)"],[817,"VIPBuy_Text_3","You get double rewards and 3 more missions available for 6 more stars every day!","获得双倍奖励！可以每天多做3个任务，多获得6颗星星！","You get double rewards and 3 more missions available for 6 more stars every day!","You get double rewards and 3 more missions available for 6 more stars every day!"],[818,"VIPKey_Text_1","Quick Purchase","快速购买！","Quick Purchase","Quick Purchase"],[819,"VIPKey_Text_2","Spend 1 Membership Key for 15 stars to get the following rewards right away.","消耗一把大会员钥匙，获得15颗星星，可马上获得以下奖励","Spend 1 Membership Key for 15 stars to get the following rewards right away.","Spend 1 Membership Key for 15 stars to get the following rewards right away."],[820,"VIPKey_Text_3","Note: You can get keys by joining the membership.","注意！购买大会员即可获得钥匙","Note: You can get keys by joining the membership.","Note: You can get keys by joining the membership."],[821,"VIPItem_Text_1","Double rewards for players with membership!","大会员双倍","Double rewards for players with membership!","Double rewards for players with membership!"],[822,"VIPItem_Text_2","To be unlocked","未解锁","To be unlocked","To be unlocked"],[823,"VIP_Tips_1","You don't have enough membership keys.","大会员钥匙不足","You don't have enough membership keys.","You don't have enough membership keys."],[824,"VIP_Tips_2","Exchange successful!","钥匙兑换成功","Exchange successful!","Exchange successful!"],[825,"VIP_Tips_3","You don't have enough stars.","星星不足","You don't have enough stars.","You don't have enough stars."],[826,"VIP_Tips_4","Quest completed!","任务已完成","Quest completed!","Quest completed!"],[827,"VIP_Tips_5","Obtained {0} stars!","获得{0}星星","Obtained {0} stars!","Obtained {0} stars!"],[828,"VIP_Tips_6","All Completed","全部完成","All Completed","All Completed"],[829,"VIPHud_Text_2","Refresh attempts: {0}","可刷新次数:{0}","Refresh attempts: {0}","Refresh attempts: {0}"],[830,"Carousel_Text_1","No empty seats on the carousel.","木马上已经没有座位了","No empty seats on the carousel.","No empty seats on the carousel."],[831,"VIPHud_Text_3","Pass Rewards","通行证奖励","Pass Rewards","Pass Rewards"],[832,"Enchants_Name_47","Strong Companion","强大的伙伴","Strong Companion","Strong Companion"],[833,"Enchants_Describe_17","Power = 50% of your strongest pet<color=#ED7E27ff> (exclusive, cannot be enchanted).</color>","默认获得最高战宠物战力的50%<color=#ED7E27ff>(独有,不可附魔)</color>","Power = 50% of your strongest pet<color=#ED7E27ff> (exclusive, cannot be enchanted).</color>","Power = 50% of your strongest pet<color=#ED7E27ff> (exclusive, cannot be enchanted).</color>"],[834,"PetARR_petName_138","Lover Penguin · Female","七夕·女宝","Lover Penguin · Female","Lover Penguin · Female"],[835,"PetARR_petName_139","Lover Penguin · Male","七夕·男宝","Lover Penguin · Male","Lover Penguin · Male"],[836,"AreaDivide_Name_22","Techno Shop","科技商店","Techno Shop","Techno Shop"],[837,"AreaDivide_Name_23","Cyber Town","赛博城镇","Cyber Town","Cyber Town"],[838,"AreaDivide_Name_24","Dark Technology","黑暗科技","Dark Technology","Dark Technology"],[839,"AreaDivide_Name_25","Steampunk","蒸汽朋克","Steampunk","Steampunk"],[840,"AreaDivide_Name_26","Steampunk Factory","蒸汽工厂","Steampunk Factory","Steampunk Factory"],[841,"AreaDivide_Name_27","Chem Experiment","化学实验","Chem Experiment","Chem Experiment"],[842,"AreaDivide_Name_28","Alien Forest","外星森林","Alien Forest","Alien Forest"],[843,"AreaDivide_Name_29","Gloomy Forest","阴暗森林","Gloomy Forest","Gloomy Forest"],[844,"AreaDivide_Name_30",null,null,null,null],[845,"AreaDivide_Name_31",null,null,null,null],[846,"AreaWorld_textUI_3","Techno World","科技世界","Techno World","Techno World"],[847,"Egg_Areaname_17","Cyber Egg","赛博蛋","Cyber Egg","Cyber Egg",null,"Area XVII Egg"],[848,"Egg_Areaname_18","Techno Egg","科技蛋","Techno Egg","Techno Egg",null,"Area XVIII Egg"],[849,"Egg_Areaname_19","Dark Egg","黑暗蛋","Dark Egg","Dark Egg",null,"Area XIX Egg"],[850,"Egg_Areaname_20","Mutant Egg","变异蛋","Mutant Egg","Mutant Egg",null,"Area XX Egg"],[851,"Egg_Areaname_21","Steampunk Egg","蒸汽蛋","Steampunk Egg","Steampunk Egg",null,"Area XXI Egg"],[852,"Egg_Areaname_22","Punk Egg","朋克蛋","Punk Egg","Punk Egg",null,"Area XXII Egg"],[853,"Egg_Areaname_23","Experiment Egg","实验蛋","Experiment Egg","Experiment Egg",null,"Area XXIII Egg"],[854,"Egg_Areaname_24","Potion Egg","药水蛋","Potion Egg","Potion Egg",null,"Area XXIV Egg"],[855,"Egg_Areaname_25","Alien Egg","外星蛋","Alien Egg","Alien Egg",null,"Area XXV Egg"],[856,"Egg_Areaname_26","Planet Egg","行星蛋","Planet Egg","Planet Egg",null,"Area XXVI Egg"],[857,"Egg_Areaname_27","Gloomy Egg","暗暗蛋","Gloomy Egg","Gloomy Egg",null,"Area XXVII Egg"],[858,"Egg_Areaname_28",null,null,null,null],[859,"Portol_Tip_4","Teleport to the third world?","是否传送到第三世界","Teleport to the third world?","Teleport to the third world?"],[860,"PetARR_petName_140","Calico Dog","花狗","Calico Dog","Calico Dog"],[861,"PetARR_petName_141","Calico Cat","花猫","Calico Cat","Calico Cat"],[862,"PetARR_petName_142","Radar Dog","雷达狗","Radar Dog","Radar Dog"],[863,"PetARR_petName_143","Radar Cat","雷达猫","Radar Cat","Radar Cat"],[864,"PetARR_petName_144","Cow Dog","黑白狗","Cow Dog","Cow Dog"],[865,"PetARR_petName_145","Cow Cat","奶牛猫","Cow Cat","Cow Cat"],[866,"PetARR_petName_146","Mech Dog","机械小狗","Mech Dog","Mech Dog"],[867,"PetARR_petName_147","Mech Cat","机械小猫","Mech Cat","Mech Cat"],[868,"PetARR_petName_148","Brown Dog","棕狗","Brown Dog","Brown Dog"],[869,"PetARR_petName_149","Yellow Cat","小黄猫","Yellow Cat","Yellow Cat"],[870,"PetARR_petName_150","Archer Dog","弓手狗","Archer Dog","Archer Dog"],[871,"PetARR_petName_151","Archer Cat","弓手猫","Archer Cat","Archer Cat"],[872,"PetARR_petName_152","Black Dog","黑狗","Black Dog","Black Dog"],[873,"PetARR_petName_153","Brown Cat","棕猫","Brown Cat","Brown Cat"],[874,"PetARR_petName_154","White Siamese","白暹罗猫","White Siamese","White Siamese"],[875,"PetARR_petName_155","Sci-fi Dog","科幻狗","Sci-fi Dog","Sci-fi Dog"],[876,"PetARR_petName_156","Sci-fi Cat","科幻猫","Sci-fi Cat","Sci-fi Cat"],[877,"PetARR_petName_157","Sci-Fi Siamese","科幻暹罗","Sci-Fi Siamese","Sci-Fi Siamese"],[878,"PetARR_petName_158","Black Siamese","黑暹罗猫","Black Siamese","Black Siamese"],[879,"PetARR_petName_159","White Rabbit","白兔","White Rabbit","White Rabbit"],[880,"PetARR_petName_160","Brown Squirrel","棕松鼠","Brown Squirrel","Brown Squirrel"],[881,"PetARR_petName_161","Steampunk Siamese","蒸汽暹罗","Steampunk Siamese","Steampunk Siamese"],[882,"PetARR_petName_162","Steampunk Rabbit","蒸汽白兔","Steampunk Rabbit","Steampunk Rabbit"],[883,"PetARR_petName_163","Steampunk Squirrel","蒸汽松鼠","Steampunk Squirrel","Steampunk Squirrel"],[884,"PetARR_petName_164","Bear","小熊","Bear","Bear"],[885,"PetARR_petName_165","Cow","牛牛","Cow","Cow"],[886,"PetARR_petName_166","Fox","狐狸","Fox","Fox"],[887,"PetARR_petName_167","Punk Bear","朋克小熊","Punk Bear","Punk Bear"],[888,"PetARR_petName_168","Punk Cow","朋克牛牛","Punk Cow","Punk Cow"],[889,"PetARR_petName_169","Punk Fox","朋克狐狸","Punk Fox","Punk Fox"],[890,"PetARR_petName_170","Rock Cat","摇滚猫","Rock Cat","Rock Cat"],[891,"PetARR_petName_171","Hiphop Dog","嘻哈狗","Hiphop Dog","Hiphop Dog"],[892,"VIP_task_11","Destroy {0} gifts","打破{0}个礼物","Destroy {0} gifts","Destroy {0} gifts"],[893,"VIP_task_12","Destroy {0} chests","打破{0}个宝箱","Destroy {0} chests","Destroy {0} chests"],[894,"VIP_task_13","Play the claw machine {0} times","玩{0}次抓娃娃机","Play the claw machine {0} times","Play the claw machine {0} times"],[895,"VIP_Tips_7","Pass rewards upgraded! Players who have received the rewards will be compensated.","通行证奖励升级！已领取奖励的玩家将得到补偿！","Pass rewards upgraded! Players who have received the rewards will be compensated.","Pass rewards upgraded! Players who have received the rewards will be compensated."],[896,"PetARR_petName_172","Yellow Rabbit","黄兔子","Yellow Rabbit","Yellow Rabbit"],[897,"PetARR_petName_173","Black Squirrel","黑松鼠","Black Squirrel","Black Squirrel"],[898,"PetARR_petName_174","Brown Bear","棕熊","Brown Bear","Brown Bear"],[899,"PetARR_petName_175","Gamer Squirrel","游戏松鼠","Gamer Squirrel","Gamer Squirrel"],[900,"PetARR_petName_176","Gamer Fox","游戏狐","Gamer Fox","Gamer Fox"],[901,"PetARR_petName_177","Yellow Cow","黄牛","Yellow Cow","Yellow Cow"],[902,"PetARR_petName_178","Red Fox","红狐","Red Fox","Red Fox"],[903,"PetARR_petName_179","Pink Pig","小粉猪","Pink Pig","Pink Pig"],[904,"PetARR_petName_180","Researcher Bear","科研熊","Researcher Bear","Researcher Bear"],[905,"PetARR_petName_181","Researcher Pig","科研猪","Researcher Pig","Researcher Pig"],[906,"PetARR_petName_182","Grey Rabbit","小灰兔","Grey Rabbit","Grey Rabbit"],[907,"PetARR_petName_183","Orange Squirrel","橘松鼠","Orange Squirrel","Orange Squirrel"],[908,"PetARR_petName_184","Antivirus Rabbit","防毒兔","Antivirus Rabbit","Antivirus Rabbit"],[909,"PetARR_petName_185","Antivirus Squirrel","防毒松鼠","Antivirus Squirrel","Antivirus Squirrel"],[910,"PetARR_petName_186","White Bear","白熊","White Bear","White Bear"],[911,"PetARR_petName_187","Black Cow","黑牛","Black Cow","Black Cow"],[912,"PetARR_petName_188","White Fox","白狐","White Fox","White Fox"],[913,"PetARR_petName_189","Doctor Bear","医生熊","Doctor Bear","Doctor Bear"],[914,"PetARR_petName_190","Doctor Fox","医生狐","Doctor Fox","Doctor Fox"],[915,"PetARR_petName_191","Black Pig","黑猪","Black Pig","Black Pig"],[916,"PetARR_petName_192","White Lamb","白羊","White Lamb","White Lamb"],[917,"PetARR_petName_193","Bat","蝙蝠","Bat","Bat"],[918,"PetARR_petName_194","Frankenstein Lamb","科学怪羊","Frankenstein Lamb","Frankenstein Lamb"],[919,"PetARR_petName_195","Frankenstein Bat","科学怪蝠","Frankenstein Bat","Frankenstein Bat"],[920,"Plaza_Text_1","My booth!","我的摊位！","My booth!","My booth!"],[921,"Plaza_Text_2","Select pets!","选择宠物！","Select pets!","Select pets!"],[922,"Plaza_Text_3","Shelve the pets!","上架宠物","Shelve the pets!","Shelve the pets!"],[923,"Plaza_Text_4","Remove","下架","Remove","Remove"],[924,"Plaza_Text_5","How much do you want to sell?","你要卖多少钱","How much do you want to sell?","How much do you want to sell?"],[925,"Plaza_Text_6","For sale!","出售！","For sale!","For sale!"],[926,"Plaza_Text_7","Booth decors!","摊位装饰！","Booth decors!","Booth decors!"],[927,"Plaza_Text_8","Table","桌子","Table","Table"],[928,"Plaza_Text_9","Sign","招牌","Sign","Sign"],[929,"Plaza_Text_10","Add-on","饰品","Add-on","Add-on"],[930,"Plaza_Text_11","Exterior","外装","Exterior","Exterior"],[931,"Plaza_Text_12","{0} rewards!","{0}奖励!","{0} rewards!","{0} rewards!"],[932,"Plaza_Text_13","His booth!","他的摊位！","His booth!","His booth!"],[933,"Plaza_Text_14","{0} pets","{0}宠物","{0} pets","{0} pets"],[934,"Rank_Title_4","List of money-making masters","赚钱高手榜","List of money-making masters","List of money-making masters"],[935,"Rank_Title_5","The Rich List","大富豪榜","The Rich List","The Rich List"],[936,"Rank_Title_6","Super Merchant List","超级商人榜","Super Merchant List","Super Merchant List"],[937,"Plaza_Text_15","There are not enough decoration coins at present, and you can get decoration coins for every 2 pets you buy!","当前装饰币不足哦，每买卖出2只宠物就可以获得装饰币啦！","There are not enough decoration coins at present, and you can get decoration coins for every 2 pets you buy!","There are not enough decoration coins at present, and you can get decoration coins for every 2 pets you buy!"],[938,"Plaza_Text_16","{0} ornamental coins","{0}装饰币","{0} ornamental coins","{0} ornamental coins"],[939,"Plaza_Text_17","Whether or not you need to buy the decoration","是否需要购买该装饰","Whether or not you need to buy the decoration","Whether or not you need to buy the decoration"],[940,"Tips_gift_4","Please accept compensation for the missing bug in the archive!Thank you for your understanding~","请收下关于存档丢失bug的补偿！感谢理解~","Please accept compensation for the missing bug in the archive!Thank you for your understanding~","Please accept compensation for the missing bug in the archive!Thank you for your understanding~"],[941,"Plaza_Text_18","Pet Paradise!","宠物乐园！","Pet Paradise!","Pet Paradise!"],[942,"Plaza_Text_19","Teleport to Exchange Square!","要传送到交易广场吗！","Teleport to Exchange Square!","Teleport to Exchange Square!"],[943,"Plaza_Text_20","Do you want to teleport back to Pet Paradise?","要传送回宠物乐园吗！","Do you want to teleport back to Pet Paradise?","Do you want to teleport back to Pet Paradise?"],[944,"Plaza_Text_21","My stall!","我的摊位！","My stall!","My stall!"],[945,"Plaza_Text_22","Transform!","变身！","Transform!","Transform!"],[946,"Plaza_Text_23","The pet is currently on sale, please try again after being removed from the shelves!","当前宠物正在出售中，请下架后重试！","The pet is currently on sale, please try again after being removed from the shelves!","The pet is currently on sale, please try again after being removed from the shelves!"],[947,"Goal_Text_1","Catch the doll and pass the level!","抓娃娃过关！","Catch the doll and pass the level!","Catch the doll and pass the level!"],[948,"Goal_Text_2","Monitoring faction: <color=#50EED6FF>{0}</color>/3","监控阵营：<color=#50EED6FF>{0}</color>/3","Monitoring faction: <color=#50EED6FF>{0}</color>/3","Monitoring faction: <color=#50EED6FF>{0}</color>/3"],[949,"Goal_Text_3","Toilet camp: <color=#50EED6FF>{0}</color>/3","马桶阵营：<color=#50EED6FF>{0}</color>/3","Toilet camp: <color=#50EED6FF>{0}</color>/3","Toilet camp: <color=#50EED6FF>{0}</color>/3"],[950,"Goal_Text_4","Leave the room","离开房间","Leave the room","Leave the room"],[951,"Goal_Text_5","Fastest clearance list","最快通关榜","Fastest clearance list","Fastest clearance list"],[952,"Plaza_Text_24","The function is still cooling, so please use it later","功能还在冷却中，请稍后在使用","The function is still cooling, so please use it later","The function is still cooling, so please use it later"],[953,"PetARR_petName_196","Toilet cat","马桶猫","Toilet cat","Toilet cat"],[954,"PetARR_petName_197","Toilet bunny","马桶兔子","Toilet bunny","Toilet bunny"],[955,"PetARR_petName_198","Monitor dogs","监控狗","Monitor dogs","Monitor dogs"],[956,"PetARR_petName_199","Monitor the bears","监控小熊","Monitor the bears","Monitor the bears"],[957,"PetARR_petName_200","Toilet Bishop sheep","马桶主教羊","Toilet Bishop sheep","Toilet Bishop sheep"],[958,"PetARR_petName_201","Titan audio deer","泰坦音响鹿","Titan audio deer","Titan audio deer"],[959,"Rank_Title_7","Daily leaderboard","每日榜","Daily leaderboard","Daily leaderboard"],[960,"Rank_Title_8","Weekly leaderboard","每周榜","Weekly leaderboard","Weekly leaderboard"],[961,"Plaza_Text_25","Congratulations on your 2000 diamonds","恭喜你开出2000钻石","Congratulations on your 2000 diamonds","Congratulations on your 2000 diamonds"],[962,"Plaza_Text_26","Congratulations on an ornament!","恭喜你开出了一个装饰品！快去装饰背包看看吧！","Congratulations on an ornament!","Congratulations on an ornament!"],[963,"Plaza_Text_27","What? You got a duplicate decoration? Let me use my magic to help you change it for a decorative coin!","什么？你抽到了重复的装饰？让我用魔法帮你换成装饰币吧！","What? You got a duplicate decoration? Let me use my magic to help you change it for a decorative coin!","What? You got a duplicate decoration? Let me use my magic to help you change it for a decorative coin!"],[964,"PetARR_petName_202","Laurel Rabbit","月桂兔","Laurel Rabbit","Laurel Rabbit"],[965,"PetARR_petName_203","Moon Hare","月兔","Moon Hare","Moon Hare"],[966,"Rank_Title_9","Camp Board","阵营榜","Camp Board","Camp Board"],[967,"Claw_Tips_10","Please wait {0}s before using the claw machine.","请过{0}秒后再使用娃娃机！","Please wait {0}s before using the claw machine.","Please wait {0}s before using the claw machine."],[968,"Claw_Tips_11","You're already using the claw machine!","已经在使用娃娃机了","You're already using the claw machine!","You're already using the claw machine!"],[969,"Plaza_Text_28","Reset","复位","Reset","Reset"],[970,"Deposit_1","Please open your browser and go to the official website of MOBOX to recharge: https://www.mobox.io","请打开浏览器前往MOBOX官网进行充值：https://www.mobox.io","Please open your browser and go to the official website of MOBOX to recharge: https://www.mobox.io","Please open your browser and go to the official website of MOBOX to recharge: https://www.mobox.io"],[971,"Deposit_2","Copy the URL","复制网址","Copy the URL","Copy the URL"],[972,"BuyDollCoin_Text_1","Do you want to buy Crane Coins?","是否购买娃娃机币？","Do you want to buy Crane Coins?","Do you want to buy Crane Coins?"],[973,"DollCoinNotEnough_Text_1","Do you want to buy it?","娃娃机币不足！是否购买？","Do you want to buy it?","Do you want to buy it?"],[974,"Copy_Success_Text_1","Replication success!","复制成功！","Replication success!","Replication success!"],[975,"BuyDollCoin_Success_Text_1","Successful purchase!","购买成功！","Successful purchase!","Successful purchase!"],[976,"BuyDollCoin_Fail_Text_1","Failed to purchase!","购买失败！","Failed to purchase!","Failed to purchase!"],[977,"Buff_Text_1","MODragon Lv.1 reward boost","龙龙1阶收益buff","MODragon Lv.1 gain buff","MODragon Lv.1 gain buff"],[978,"Buff_Text_2","MODragon Lv.2 reward boost","龙龙2阶收益buff","MODragon Lv.2 gain buff","MODragon Lv.2 gain buff"],[979,"Buff_Text_3","Small Reward Potion","小型奖励药水","Small reward potions","Small reward potions"],[980,"Buff_Text_4","Medium Reward Potion","中型奖励药水","Medium Reward Potion","Medium Reward Potion"],[981,"Buff_Text_5","Large Reward Potion","大型奖励药水","Large Reward Potion","Large Reward Potion"],[982,"Buff_Text_6","MODragon Lv.1 attack boost","龙龙1阶攻击buff","MODragon Lv.1 attack buff","MODragon Lv.1 attack buff"],[983,"Buff_Text_7","MODragon Lv.2 attack boost","龙龙2阶攻击buff","MODragon Lv.2 attack buff","MODragon Lv.2 attack buff"],[984,"Buff_Text_8","Small damage potions","小型伤害药水","Small damage potions","Small damage potions"],[985,"Buff_Text_9","Medium damage potions","中型伤害药水","Medium damage potions","Medium damage potions"],[986,"Buff_Text_10","Large damage potions","大型伤害药水","Large damage potions","Large damage potions"],[987,"Buff_Rule_1","MODragon boost mechanism","龙龙Buff规则","MODragon buff rules","MODragon buff rules"],[988,"Buff_Rule_2","1. The pet will receive different boost based on the Total Dragon Power held by a player's address:\n2. 100 < Total Power ≤ 400 -- MODragon Lv.1 reward boost\n400< Total Power ≤1000 -- MODragon Lv.1 reward boost + MODragon Lv.1 attack boost\n1000< Total Power ≤ 10000 -- MODragon Lv.2 reward boost + MODragon Lv.1 attack boost\n10,000 < Total Power -- MODragon Lv.2 reward boost + MODragon Lv.2 attack boost","1. 根据玩家地址上龙龙的总能力值宠物会获得不同的buff。\n2. 100＜总能力值≤400 -- 龙龙1阶收益buff \n400＜总能力值≤1000 -- 龙龙1阶收益buff + 龙龙1阶攻击buff\n1000＜总能力值≤10000 -- 龙龙2阶收益buff + 龙龙1阶攻击buff\n10000＜总能力值 -- 龙龙2阶收益buff + 龙龙2阶攻击buff","1. Depending on the total power of the dragon at the player's address, the pet will receive different buffs. \n2. 100 < Total Power ≤ 400 -- MODragon Lv.1 gain buff\n400< Total Power ≤1000 -- MODragon Lv.1 gain buff + MODragon Lv.1 attack buff\n1000< Total Power ≤ 10000 -- MODragon Lv.2 gain buff + MODragon Lv.1 attack buff\n10,000 < Total Power -- MODragon Lv.2 gain buff + MODragon Lv.2 attack buff","1. Depending on the total power of the dragon at the player's address, the pet will receive different buffs. \n2. 100 < Total Power ≤ 400 -- MODragon Lv.1 gain buff\n400< Total Power ≤1000 -- MODragon Lv.1 gain buff + MODragon Lv.1 attack buff\n1000< Total Power ≤ 10000 -- MODragon Lv.2 gain buff + MODragon Lv.1 attack buff\n10,000 < Total Power -- MODragon Lv.2 gain buff + MODragon Lv.2 attack buff"],[989,"Stamina_Rule_1","Stamina mechanism","体力规则","Stamina rules","Stamina rules"],[990,"Stamina_Rule_2","1. Stamina Full Recovery in 24 Hours for All Players\n2. Holding eMDBL can boost your max Stamina\n3. More Stamina Capacity = More Participation = Chance to Get More Rewards","1. 所有玩家在 24 小时内完全恢复体力\n2. 持有 eMDBL 可以提高你的体力上限\n3. 更多的体力 = 更多的参与 = 获得更多奖励的机会","1. Stamina Full Recovery in 24 Hours for All Players\n2. Holding eMDBL can boost your max Stamina\n3. More Stamina Capacity = More Participation = Chance to Get More Rewards","1. Stamina Full Recovery in 24 Hours for All Players\n2. Holding eMDBL can boost your max Stamina\n3. More Stamina Capacity = More Participation = Chance to Get More Rewards"],[991,"BuyDollCoin_Text_2","Crane coins shop","娃娃机商店","Crane coins shop","Crane coins shop"],[992,"BuyDollCoin_Text_3","Crane Coins","娃娃机硬币","Crane Coins","Crane Coins"],[993,"PetARR_petName_204","Water · Wave","水·蓝波","Water · Wave","Water · Wave"],[994,"PetARR_petName_205","Water · Ice","水·冰雪","Water · Ice","Water · Ice"],[995,"PetARR_petName_206","Water · Ripples","水·涟漪","Water · Ripples","Water · Ripples"],[996,"PetARR_petName_207","Water · Sea","水·海影","Water · Sea","Water · Sea"],[997,"PetARR_petName_208","Water · Princess","水·冰妃","Water · Princess","Water · Princess"],[998,"PetARR_petName_209","Water · Springs","水·清泉","Water · Springs","Water · Springs"],[999,"PetARR_petName_210","Water · Yu","水·蓝钰","Water · Yu","Water · Yu"],[1000,"PetARR_petName_211","Fire · Dance","火·烬舞","Fire · Dance","Fire · Dance"],[1001,"PetARR_petName_212","Fire · Molten","火·熔光","Fire · Molten","Fire · Molten"],[1002,"PetARR_petName_213","Fire · Shadow","火·炽影","Fire · Shadow","Fire · Shadow"],[1003,"PetARR_petName_214","Fire · Swaying","火·摇曳","Fire · Swaying","Fire · Swaying"],[1004,"PetARR_petName_215","Fire · Betula","火·笙桦","Fire · Betula","Fire · Betula"],[1005,"PetARR_petName_216","Fire · Flowers","火·焚花","Fire · Flowers","Fire · Flowers"],[1006,"PetARR_petName_217","Fire · Wing","火·赤翼","Fire · Wing","Fire · Wing"],[1007,"PetARR_petName_218","Wood · Sakura","木·樱林","Wood · Sakura","Wood · Sakura"],[1008,"PetARR_petName_219","Wood · Shadow","木·翠影","Wood · Shadow","Wood · Shadow"],[1009,"PetARR_petName_220","Wood · Sycamore","木·梧韵","Wood · Sycamore","Wood · Sycamore"],[1010,"PetARR_petName_221","Wood · Branches","木·茶枝","Wood · Branches","Wood · Branches"],[1011,"PetARR_petName_222","Wood · Momo","木·桃语","Wood · Momo","Wood · Momo"],[1012,"PetARR_petName_223","Wood · Wind","木·竹风","Wood · Wind","Wood · Wind"],[1013,"PetARR_petName_224","Wood · Pine","木·松雨","Wood · Pine","Wood · Pine"],[1014,"PetARR_petName_225","Earth · Peak","土·沧峰","Earth · Peak","Earth · Peak"],[1015,"PetARR_petName_226","Earth · Valley","土·翠谷","Earth · Valley","Earth · Valley"],[1016,"PetARR_petName_227","Earth · Domain","土·黄域","Earth · Domain","Earth · Domain"],[1017,"PetARR_petName_228","Earth · Branches","土·绿枝","Earth · Branches","Earth · Branches"],[1018,"PetARR_petName_229","Earth · Rock","土·岩坡","Earth · Rock","Earth · Rock"],[1019,"PetARR_petName_230","Earth · Wings","土·花翼","Earth · Wings","Earth · Wings"],[1020,"PetARR_petName_231","Earth · Mountains","土·青峦","Earth · Mountains","Earth · Mountains"],[1021,"PetARR_petName_232","Light · Sunset","光·晚霞","Light  Sunset","Light  Sunset"],[1022,"PetARR_petName_233","Light · Sunshine","光·日曦","Light  Sunshine","Light  Sunshine"],[1023,"PetARR_petName_234","Light · Dance","光·云舞","Light · Dance","Light · Dance"],[1024,"PetARR_petName_235","Light · Dawn","光·朝辉","Light · Dawn","Light · Dawn"],[1025,"PetARR_petName_236","Light · Shadow","光·明影","Light · Shadow","Light · Shadow"],[1026,"PetARR_petName_237","Light · Cloud","光·云露","Light · Cloud","Light · Cloud"],[1027,"PetARR_petName_238","Light · Break","光·破晓","Light · Break","Light · Break"],[1028,"PetARR_petName_239","Dark · Blade","暗·魄刃","Dark · Blade","Dark · Blade"],[1029,"PetARR_petName_240","Dark · Shadow","暗·雪影","Dark · Shadow","Dark · Shadow"],[1030,"PetARR_petName_241","Dark · Nightway","暗·夜薇","Dark · Nightway","Dark · Nightway"],[1031,"PetARR_petName_242","Dark · Wind","暗·幽风","Dark · Wind","Dark · Wind"],[1032,"PetARR_petName_243","Dark · Moon","暗·冥月","Dark · Moon","Dark · Moon"],[1033,"PetARR_petName_244","Dark · Lotus","暗·影莲","Dark · Lotus","Dark · Lotus"],[1034,"PetARR_petName_245","Dark · Feather","暗·墨翎","Dark · Feather","Dark · Feather"],[1035,"CurrentRoomId","Room ID: {0}","房间ID：{0}","Room ID: {0}","Room ID: {0}"],[1036,"JumpGameFailed","Switch Room Failed!","切换房间失败！","Switch Room Failed!","Switch Room Failed!"],[1037,"SwitchRoomBtn","Switch room","切换房间","Switch room","Switch room"],[1038,"JumpRoomText001","Switch to a designated room","切换至指定房间","Switch to a designated room","Switch to a designated room"],[1039,"JumpRoomText002","Please enter the Room ID","请输入房间id","Please enter the Room ID","Please enter the Room ID"],[1040,"SwitchRoomConfirm","Confirm","确定","Confirm","Confirm"],[1041,"StaminaNotEnough","Insufficient Stamina！","体力不足！","Insufficient Stamina！","Insufficient Stamina！"],[1042,"OpenEgg","Open!","开蛋！","Open!","Open!"],[1043,"NextLevelAttributes","Next Level Attributes","下一级属性","Next Level Attributes","Next Level Attributes"],[1044,"Enchants_new001","Empty","空","Empty","Empty"],[1045,"Enchants_new002","Click enchantment to add","点击附魔以添加","Click enchantment to add","Click enchantment to add"],[1046,"Game_Setting001","Setting","设置","Setting","Setting"],[1047,"Game_Setting002","Sound","声音","Sound","Sound"],[1048,"Game_Setting003","Mute","静音","Mute","Mute"],[1049,"Game_Setting004","Lens Settings","镜头设置","Lens Settings","Lens Settings"],[1050,"Game_Setting005","Sensitivity","镜头灵敏度","Sensitivity","Sensitivity"],[1051,"Game_Setting006","Low","低","Low","Low"],[1052,"Game_Setting007","High","高","High","High"],[1053,"Game_Setting008","Off","关","Off","Off"],[1054,"Enchants_new003","Complete one enchantment to unlock ","完成一次附魔以解锁","Complete one enchantment to unlock ","Complete one enchantment to unlock "],[1055,"Enchants_new004","Slot 1\nClick on the right enchantment to add ","槽位1\n点击右侧附魔添加","Slot 1\nClick on the right enchantment to add ","Slot 1\nClick on the right enchantment to add "],[1056,"Enchants_new005","Slot 2\nUnlocks after completing an enchantment","槽位2\n完成一次附魔后解锁","Slot 2\nUnlocks after completing an enchantment","Slot 2\nUnlocks after completing an enchantment"],[1057,"Enchants_new006","Reenchant","重新附魔","Reenchant","Reenchant"],[1058,"Enchants_new007","Boosted score","分数加成","Boosted Score","Boosted Score"],[1059,"Enchants_new008","Slot 2\nClick on the right enchantment to add ","槽位2\n点击右侧附魔添加","Slot 2\nClick on the right enchantment to add ","Slot 2\nClick on the right enchantment to add No enchants"],[1060,"Enchants_new009","No enchants","尚未附魔","No enchants","No enchants"],[1061,"Online_shop001","Senzu Potion","仙豆","Senzu Potion","Senzu Potion"],[1062,"Online_shop002","Use in game to get stamina","在游戏中使用可获得体力","Use in game to get stamina","Use in game to get stamina"],[1063,"Online_shop003","Blue Snitch","蓝色飞贼","Blue Snitch","Blue Snitch"],[1064,"Online_shop004","Capture the Modragon in the bonus level","在奖励地图中捕获龙娘时使用","Capture the Modragon in the bonus level","Capture the Modragon in the bonus level"],[1065,"Online_shop005","Purchase","购买","Purchase","Purchase"],[1066,"Online_shop006","Total: ","总计：","Total: ","Total: "],[1067,"Online_shop007","Available: ","结余：","Available: ","Available: "],[1068,"Online_shop008","DragonVerse Shop","DragonVerse 商城","DragonVerse Shop","DragonVerse Shop"],[1069,"Online_shop009","Consume","使用","Consume","Consume"],[1070,"Online_shop010","Quantity: ","数量：","Quantity: ","Quantity: "],[1071,"Online_shop011","Consume a Senzu Potion to recover {0} stamina? ","确定消耗一瓶仙豆药水并回复{0}体力吗？","Consume a Senzu Potion to recover {0} stamina? ","Consume a Senzu Potion to recover {0} stamina? "],[1072,"Online_shop012","Confirm(E)","确认（E）","Confirm(E)","Confirm(E)"],[1073,"Online_shop013","Cancel(Esc)","取消（Esc）","Cancel(Esc)","Cancel(Esc)"],[1074,"button_20","Unlock","解锁","Unlock","Unlock"],[1075,"button_21","Enter","进入","Enter","Enter"],[1076,"Pet_NewBuy001","Gacha！","扭蛋！","Gacha！","Gacha！"],[1077,"Pet_NewBuy002","How many pet eggs do I need to open？","需要开启多少枚扭蛋？","How many pet eggs do I need to open？","How many pet eggs do I need to open？"],[1078,"Pet_NewBuy003","Merge","融合","Merge","Merge"],[1079,"Pet_NewBuy004","Cumulative","今日累计","Cumulative","Cumulative"],[1080,"Pet_NewBuy005","Reset time","重置时间","Reset time","Reset time"],[1081,"Pet_NewBuy006","{0} time","{0}次","{0} time","{0} time"],[1082,"Pet_NewBuy007","{0} count","{0}只","{0} count","{0} count"],[1083,"Page_UI_Tips_14","Pet Backpack storage limit has been reached","背包宠物存储量达到上限","Pet Backpack storage limit has been reached","Pet Backpack storage limit has been reached"],[1084,"JumpRoomText003","Teleport","传送","Teleport","Teleport"],[1085,"Online_shop015","Refresh","刷新","Refresh","Refresh"],[1086,"Online_shop016","Sweep Token","扫荡券","Sweep Token","Sweep Token"],[1087,"Online_shop017","Speed-sweep for Perfect Victory stages","快速通关已经取得完美胜利的关卡","Speed-sweep for Perfect Victory stages","Speed-sweep for Perfect Victory stages"]];
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
	/**地区Ⅰ*/
	get AreaDivide_Name_2():ILanguageElement{return this.getElement(256)};
	/**地区Ⅱ*/
	get AreaDivide_Name_3():ILanguageElement{return this.getElement(257)};
	/**地区Ⅲ*/
	get AreaDivide_Name_4():ILanguageElement{return this.getElement(258)};
	/**地区Ⅳ*/
	get AreaDivide_Name_5():ILanguageElement{return this.getElement(259)};
	/**地区Ⅴ*/
	get AreaDivide_Name_6():ILanguageElement{return this.getElement(260)};
	/**地区Ⅵ*/
	get AreaDivide_Name_7():ILanguageElement{return this.getElement(261)};
	/**地区Ⅶ*/
	get AreaDivide_Name_8():ILanguageElement{return this.getElement(262)};
	/**地区Ⅷ*/
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
	/**融合{0}/8只宠物*/
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
	/**召唤*/
	get button_2():ILanguageElement{return this.getElement(298)};
	/**可以同时装备{0}个宠物*/
	get Page_UI_Tips_1():ILanguageElement{return this.getElement(299)};
	/**你的概率是{0}%，是否花费{1}钻石进行爱心化？*/
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
	/**宠物伤害*/
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
	/**金币收益提高{0}%*/
	get Enchants_Describe_1():ILanguageElement{return this.getElement(415)};
	/**幻想币收益提高{0}%*/
	get Enchants_Describe_2():ILanguageElement{return this.getElement(416)};
	/**科技币收益提高{0}%*/
	get Enchants_Describe_3():ILanguageElement{return this.getElement(417)};
	/**队内宠物伤害提高15%*/
	get Enchants_Describe_4():ILanguageElement{return this.getElement(418)};
	/**队内宠物伤害提高30%*/
	get Enchants_Describe_5():ILanguageElement{return this.getElement(419)};
	/**队内宠物暴击率提高20%*/
	get Enchants_Describe_6():ILanguageElement{return this.getElement(420)};
	/**伤害提高{0}%*/
	get Enchants_Describe_7():ILanguageElement{return this.getElement(421)};
	/**宠物移速提高{0}%*/
	get Enchants_Describe_8():ILanguageElement{return this.getElement(422)};
	/**钻石收益提高{0}%*/
	get Enchants_Describe_9():ILanguageElement{return this.getElement(423)};
	/**对宝箱伤害提高{0}%*/
	get Enchants_Describe_10():ILanguageElement{return this.getElement(424)};
	/**礼物盒收益提高{0}%*/
	get Enchants_Describe_11():ILanguageElement{return this.getElement(425)};
	/**多倍奖励的金币收益提高{0}%*/
	get Enchants_Describe_12():ILanguageElement{return this.getElement(426)};
	/**伤害提高100%，钻石收益提高100%，移速提高50%*/
	get Enchants_Describe_13():ILanguageElement{return this.getElement(427)};
	/**宠物可吸附并收集金币钻石*/
	get Enchants_Describe_14():ILanguageElement{return this.getElement(428)};
	/**在队伍中随机生成钻石（唯一）*/
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
	/**传说蛋!*/
	get Achievement_Name_79():ILanguageElement{return this.getElement(514)};
	/**神话蛋!*/
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
	/**附魔{0}次*/
	get Achievement_Detail_10():ILanguageElement{return this.getElement(535)};
	/**解锁 3 个区域*/
	get Achievement_Detail_11():ILanguageElement{return this.getElement(536)};
	/**再次解锁 3 个区域*/
	get Achievement_Detail_12():ILanguageElement{return this.getElement(537)};
	/**孵化出稀有宠物*/
	get Achievement_Detail_13():ILanguageElement{return this.getElement(538)};
	/**孵化出史诗宠物*/
	get Achievement_Detail_14():ILanguageElement{return this.getElement(539)};
	/**孵化出传说宠物*/
	get Achievement_Detail_15():ILanguageElement{return this.getElement(540)};
	/**孵化出神话宠物*/
	get Achievement_Detail_16():ILanguageElement{return this.getElement(541)};
	/**使用一只宠物爱心化成功*/
	get Achievement_Detail_17():ILanguageElement{return this.getElement(542)};
	/**使用一只传说宠物黄金化成功*/
	get Achievement_Detail_18():ILanguageElement{return this.getElement(543)};
	/**使用五只宠物爱心化失败*/
	get Achievement_Detail_19():ILanguageElement{return this.getElement(544)};
	/**融合出了传说宠物*/
	get Achievement_Detail_20():ILanguageElement{return this.getElement(545)};
	/**使用一只传说宠物彩虹化成功*/
	get Achievement_Detail_21():ILanguageElement{return this.getElement(546)};
	/**宠物附魔独特的标签成功*/
	get Achievement_Detail_22():ILanguageElement{return this.getElement(547)};
	/**击破地区Ⅷ大宝箱*/
	get Achievement_Detail_23():ILanguageElement{return this.getElement(548)};
	/**击破大天堂岛的天堂大宝箱*/
	get Achievement_Detail_24():ILanguageElement{return this.getElement(549)};
	/**到达幻想世界*/
	get Achievement_Detail_25():ILanguageElement{return this.getElement(550)};
	/**到达科技世界*/
	get Achievement_Detail_26():ILanguageElement{return this.getElement(551)};
	/**成就!*/
	get Achievement_UIname_1():ILanguageElement{return this.getElement(552)};
	/**完成*/
	get Achievement_UIname_2():ILanguageElement{return this.getElement(553)};
	/**地区Ⅰ蛋*/
	get Egg_Areaname_1():ILanguageElement{return this.getElement(554)};
	/**地区Ⅱ蛋*/
	get Egg_Areaname_2():ILanguageElement{return this.getElement(555)};
	/**地区Ⅲ蛋*/
	get Egg_Areaname_3():ILanguageElement{return this.getElement(556)};
	/**地区Ⅳ蛋*/
	get Egg_Areaname_4():ILanguageElement{return this.getElement(557)};
	/**地区Ⅴ蛋*/
	get Egg_Areaname_5():ILanguageElement{return this.getElement(558)};
	/**地区Ⅵ蛋*/
	get Egg_Areaname_6():ILanguageElement{return this.getElement(559)};
	/**地区Ⅶ蛋*/
	get Egg_Areaname_7():ILanguageElement{return this.getElement(560)};
	/**地区Ⅷ蛋*/
	get Egg_Areaname_8():ILanguageElement{return this.getElement(561)};
	/**地区Ⅸ蛋*/
	get Egg_Areaname_9():ILanguageElement{return this.getElement(562)};
	/**地区Ⅹ蛋*/
	get Egg_Areaname_10():ILanguageElement{return this.getElement(563)};
	/**地区Ⅺ蛋*/
	get Egg_Areaname_11():ILanguageElement{return this.getElement(564)};
	/**地区Ⅻ蛋*/
	get Egg_Areaname_12():ILanguageElement{return this.getElement(565)};
	/**地区XIII蛋*/
	get Egg_Areaname_13():ILanguageElement{return this.getElement(566)};
	/**地区XIV蛋*/
	get Egg_Areaname_14():ILanguageElement{return this.getElement(567)};
	/**地区XV蛋*/
	get Egg_Areaname_15():ILanguageElement{return this.getElement(568)};
	/**地区XVI蛋*/
	get Egg_Areaname_16():ILanguageElement{return this.getElement(569)};
	/**最好的伙伴*/
	get Enchants_Name_16():ILanguageElement{return this.getElement(570)};
	/**出身显赫*/
	get Enchants_Describe_16():ILanguageElement{return this.getElement(571)};
	/**你确定吗?*/
	get Tips_Enchants_1():ILanguageElement{return this.getElement(572)};
	/**你确定吗？附魔会被重置*/
	get Tips_Enchants_2():ILanguageElement{return this.getElement(573)};
	/**这些宠物已经有了所需的附魔*/
	get Tips_Enchants_3():ILanguageElement{return this.getElement(574)};
	/**选中词条的附魔将被覆盖 */
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
	/**在地区Ⅰ蛋孵化{0}只宠物*/
	get Task_Info_2():ILanguageElement{return this.getElement(581)};
	/**在城镇打破{0}个金币箱子*/
	get Task_Info_3():ILanguageElement{return this.getElement(582)};
	/**地区Ⅱ中破坏{0}个礼物盒*/
	get Task_Info_4():ILanguageElement{return this.getElement(583)};
	/**进行{0}次升级*/
	get Task_Info_5():ILanguageElement{return this.getElement(584)};
	/**在地区Ⅱ蛋中孵化{0}只宠物*/
	get Task_Info_6():ILanguageElement{return this.getElement(585)};
	/**在地区Ⅲ打破{0}个钻石箱子*/
	get Task_Info_7():ILanguageElement{return this.getElement(586)};
	/**使用爱心化机器{0}次*/
	get Task_Info_8():ILanguageElement{return this.getElement(587)};
	/**融合出{0}只稀有以上的宠物*/
	get Task_Info_9():ILanguageElement{return this.getElement(588)};
	/**从地区Ⅳ蛋中孵化{0}只宠物*/
	get Task_Info_10():ILanguageElement{return this.getElement(589)};
	/**使用彩虹化机器{0}次*/
	get Task_Info_11():ILanguageElement{return this.getElement(590)};
	/**打破封闭宝箱{0}个*/
	get Task_Info_12():ILanguageElement{return this.getElement(591)};
	/**在地区Ⅴ破坏{0}个礼物盒*/
	get Task_Info_13():ILanguageElement{return this.getElement(592)};
	/**在地区Ⅴ蛋中孵化{0}只史诗宠物*/
	get Task_Info_14():ILanguageElement{return this.getElement(593)};
	/**在地区Ⅴ破坏{0}个金币箱子*/
	get Task_Info_15():ILanguageElement{return this.getElement(594)};
	/**成功完成{0}次交易*/
	get Task_Info_16():ILanguageElement{return this.getElement(595)};
	/**在地区Ⅵ蛋中孵化{0}只宠物*/
	get Task_Info_17():ILanguageElement{return this.getElement(596)};
	/**在地区Ⅵ打破{0}个金币箱子*/
	get Task_Info_18():ILanguageElement{return this.getElement(597)};
	/**在地区Ⅶ打破{0}个钻石*/
	get Task_Info_19():ILanguageElement{return this.getElement(598)};
	/**从地区Ⅶ蛋中孵化{0}只稀有以上的宠物*/
	get Task_Info_20():ILanguageElement{return this.getElement(599)};
	/**在地区Ⅶ打破{0}个金币箱子*/
	get Task_Info_21():ILanguageElement{return this.getElement(600)};
	/**在地区Ⅷ打破{0}个巨型箱子*/
	get Task_Info_22():ILanguageElement{return this.getElement(601)};
	/**在地区Ⅷ蛋中孵化出{0}只传说宠物*/
	get Task_Info_23():ILanguageElement{return this.getElement(602)};
	/**完成{0}次交易*/
	get Task_Info_24():ILanguageElement{return this.getElement(603)};
	/**在地区Ⅸ蛋中孵化{0}只宠物*/
	get Task_Info_25():ILanguageElement{return this.getElement(604)};
	/**在魔法森林破坏{0}个金币箱子*/
	get Task_Info_26():ILanguageElement{return this.getElement(605)};
	/**使用附魔机{0}次*/
	get Task_Info_27():ILanguageElement{return this.getElement(606)};
	/**在地区Ⅹ岛打破{0}个礼物盒*/
	get Task_Info_28():ILanguageElement{return this.getElement(607)};
	/**在地区Ⅹ蛋中孵化{0}只宠物*/
	get Task_Info_29():ILanguageElement{return this.getElement(608)};
	/**在地区Ⅹ岛打破{0}次巨型箱子*/
	get Task_Info_30():ILanguageElement{return this.getElement(609)};
	/**完成{0}次交易*/
	get Task_Info_31():ILanguageElement{return this.getElement(610)};
	/**在武士蛋孵化{0}只传说宠物*/
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
	/**地区Ⅺ庭院*/
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
	/**正在攻击地区Ⅷ大宝箱，快来和他一起吧！*/
	get World_Tips_6():ILanguageElement{return this.getElement(780)};
	/**正在攻击秘密大宝箱，快来和他一起吧！*/
	get World_Tips_7():ILanguageElement{return this.getElement(781)};
	/**正在攻击地区Ⅹ大宝箱，快来和他一起吧！*/
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
	/**默认获得最高战宠物战力的50%<color=#ED7E27ff>(独有,不可附魔)</color>*/
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
	/**{0}奖励!*/
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
	/**请打开浏览器前往MOBOX官网进行充值：https://www.mobox.io*/
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
	/**龙龙1阶收益buff*/
	get Buff_Text_1():ILanguageElement{return this.getElement(977)};
	/**龙龙2阶收益buff*/
	get Buff_Text_2():ILanguageElement{return this.getElement(978)};
	/**小型奖励药水*/
	get Buff_Text_3():ILanguageElement{return this.getElement(979)};
	/**中型奖励药水*/
	get Buff_Text_4():ILanguageElement{return this.getElement(980)};
	/**大型奖励药水*/
	get Buff_Text_5():ILanguageElement{return this.getElement(981)};
	/**龙龙1阶攻击buff*/
	get Buff_Text_6():ILanguageElement{return this.getElement(982)};
	/**龙龙2阶攻击buff*/
	get Buff_Text_7():ILanguageElement{return this.getElement(983)};
	/**小型伤害药水*/
	get Buff_Text_8():ILanguageElement{return this.getElement(984)};
	/**中型伤害药水*/
	get Buff_Text_9():ILanguageElement{return this.getElement(985)};
	/**大型伤害药水*/
	get Buff_Text_10():ILanguageElement{return this.getElement(986)};
	/**龙龙Buff规则*/
	get Buff_Rule_1():ILanguageElement{return this.getElement(987)};
	/**1. 根据玩家地址上龙龙的总能力值宠物会获得不同的buff。
2. 100＜总能力值≤400 -- 龙龙1阶收益buff 
400＜总能力值≤1000 -- 龙龙1阶收益buff + 龙龙1阶攻击buff
1000＜总能力值≤10000 -- 龙龙2阶收益buff + 龙龙1阶攻击buff
10000＜总能力值 -- 龙龙2阶收益buff + 龙龙2阶攻击buff*/
	get Buff_Rule_2():ILanguageElement{return this.getElement(988)};
	/**体力规则*/
	get Stamina_Rule_1():ILanguageElement{return this.getElement(989)};
	/**1. 所有玩家在 24 小时内完全恢复体力
2. 持有 eMDBL 可以提高你的体力上限
3. 更多的体力 = 更多的参与 = 获得更多奖励的机会*/
	get Stamina_Rule_2():ILanguageElement{return this.getElement(990)};
	/**娃娃机商店*/
	get BuyDollCoin_Text_2():ILanguageElement{return this.getElement(991)};
	/**娃娃机硬币*/
	get BuyDollCoin_Text_3():ILanguageElement{return this.getElement(992)};
	/**水·蓝波*/
	get PetARR_petName_204():ILanguageElement{return this.getElement(993)};
	/**水·冰雪*/
	get PetARR_petName_205():ILanguageElement{return this.getElement(994)};
	/**水·涟漪*/
	get PetARR_petName_206():ILanguageElement{return this.getElement(995)};
	/**水·海影*/
	get PetARR_petName_207():ILanguageElement{return this.getElement(996)};
	/**水·冰妃*/
	get PetARR_petName_208():ILanguageElement{return this.getElement(997)};
	/**水·清泉*/
	get PetARR_petName_209():ILanguageElement{return this.getElement(998)};
	/**水·蓝钰*/
	get PetARR_petName_210():ILanguageElement{return this.getElement(999)};
	/**火·烬舞*/
	get PetARR_petName_211():ILanguageElement{return this.getElement(1000)};
	/**火·熔光*/
	get PetARR_petName_212():ILanguageElement{return this.getElement(1001)};
	/**火·炽影*/
	get PetARR_petName_213():ILanguageElement{return this.getElement(1002)};
	/**火·摇曳*/
	get PetARR_petName_214():ILanguageElement{return this.getElement(1003)};
	/**火·笙桦*/
	get PetARR_petName_215():ILanguageElement{return this.getElement(1004)};
	/**火·焚花*/
	get PetARR_petName_216():ILanguageElement{return this.getElement(1005)};
	/**火·赤翼*/
	get PetARR_petName_217():ILanguageElement{return this.getElement(1006)};
	/**木·樱林*/
	get PetARR_petName_218():ILanguageElement{return this.getElement(1007)};
	/**木·翠影*/
	get PetARR_petName_219():ILanguageElement{return this.getElement(1008)};
	/**木·梧韵*/
	get PetARR_petName_220():ILanguageElement{return this.getElement(1009)};
	/**木·茶枝*/
	get PetARR_petName_221():ILanguageElement{return this.getElement(1010)};
	/**木·桃语*/
	get PetARR_petName_222():ILanguageElement{return this.getElement(1011)};
	/**木·竹风*/
	get PetARR_petName_223():ILanguageElement{return this.getElement(1012)};
	/**木·松雨*/
	get PetARR_petName_224():ILanguageElement{return this.getElement(1013)};
	/**土·沧峰*/
	get PetARR_petName_225():ILanguageElement{return this.getElement(1014)};
	/**土·翠谷*/
	get PetARR_petName_226():ILanguageElement{return this.getElement(1015)};
	/**土·黄域*/
	get PetARR_petName_227():ILanguageElement{return this.getElement(1016)};
	/**土·绿枝*/
	get PetARR_petName_228():ILanguageElement{return this.getElement(1017)};
	/**土·岩坡*/
	get PetARR_petName_229():ILanguageElement{return this.getElement(1018)};
	/**土·花翼*/
	get PetARR_petName_230():ILanguageElement{return this.getElement(1019)};
	/**土·青峦*/
	get PetARR_petName_231():ILanguageElement{return this.getElement(1020)};
	/**光·晚霞*/
	get PetARR_petName_232():ILanguageElement{return this.getElement(1021)};
	/**光·日曦*/
	get PetARR_petName_233():ILanguageElement{return this.getElement(1022)};
	/**光·云舞*/
	get PetARR_petName_234():ILanguageElement{return this.getElement(1023)};
	/**光·朝辉*/
	get PetARR_petName_235():ILanguageElement{return this.getElement(1024)};
	/**光·明影*/
	get PetARR_petName_236():ILanguageElement{return this.getElement(1025)};
	/**光·云露*/
	get PetARR_petName_237():ILanguageElement{return this.getElement(1026)};
	/**光·破晓*/
	get PetARR_petName_238():ILanguageElement{return this.getElement(1027)};
	/**暗·魄刃*/
	get PetARR_petName_239():ILanguageElement{return this.getElement(1028)};
	/**暗·雪影*/
	get PetARR_petName_240():ILanguageElement{return this.getElement(1029)};
	/**暗·夜薇*/
	get PetARR_petName_241():ILanguageElement{return this.getElement(1030)};
	/**暗·幽风*/
	get PetARR_petName_242():ILanguageElement{return this.getElement(1031)};
	/**暗·冥月*/
	get PetARR_petName_243():ILanguageElement{return this.getElement(1032)};
	/**暗·影莲*/
	get PetARR_petName_244():ILanguageElement{return this.getElement(1033)};
	/**暗·墨翎*/
	get PetARR_petName_245():ILanguageElement{return this.getElement(1034)};
	/**房间ID：{0}*/
	get CurrentRoomId():ILanguageElement{return this.getElement(1035)};
	/**切换房间失败！*/
	get JumpGameFailed():ILanguageElement{return this.getElement(1036)};
	/**切换房间*/
	get SwitchRoomBtn():ILanguageElement{return this.getElement(1037)};
	/**切换至指定房间*/
	get JumpRoomText001():ILanguageElement{return this.getElement(1038)};
	/**请输入房间id*/
	get JumpRoomText002():ILanguageElement{return this.getElement(1039)};
	/**确定*/
	get SwitchRoomConfirm():ILanguageElement{return this.getElement(1040)};
	/**体力不足！*/
	get StaminaNotEnough():ILanguageElement{return this.getElement(1041)};
	/**开蛋！*/
	get OpenEgg():ILanguageElement{return this.getElement(1042)};
	/**下一级属性*/
	get NextLevelAttributes():ILanguageElement{return this.getElement(1043)};
	/**空*/
	get Enchants_new001():ILanguageElement{return this.getElement(1044)};
	/**点击附魔以添加*/
	get Enchants_new002():ILanguageElement{return this.getElement(1045)};
	/**设置*/
	get Game_Setting001():ILanguageElement{return this.getElement(1046)};
	/**声音*/
	get Game_Setting002():ILanguageElement{return this.getElement(1047)};
	/**静音*/
	get Game_Setting003():ILanguageElement{return this.getElement(1048)};
	/**镜头设置*/
	get Game_Setting004():ILanguageElement{return this.getElement(1049)};
	/**镜头灵敏度*/
	get Game_Setting005():ILanguageElement{return this.getElement(1050)};
	/**低*/
	get Game_Setting006():ILanguageElement{return this.getElement(1051)};
	/**高*/
	get Game_Setting007():ILanguageElement{return this.getElement(1052)};
	/**关*/
	get Game_Setting008():ILanguageElement{return this.getElement(1053)};
	/**完成一次附魔以解锁*/
	get Enchants_new003():ILanguageElement{return this.getElement(1054)};
	/**槽位1
点击右侧附魔添加*/
	get Enchants_new004():ILanguageElement{return this.getElement(1055)};
	/**槽位2
完成一次附魔后解锁*/
	get Enchants_new005():ILanguageElement{return this.getElement(1056)};
	/**重新附魔*/
	get Enchants_new006():ILanguageElement{return this.getElement(1057)};
	/**分数加成*/
	get Enchants_new007():ILanguageElement{return this.getElement(1058)};
	/**槽位2
点击右侧附魔添加*/
	get Enchants_new008():ILanguageElement{return this.getElement(1059)};
	/**尚未附魔*/
	get Enchants_new009():ILanguageElement{return this.getElement(1060)};
	/**仙豆*/
	get Online_shop001():ILanguageElement{return this.getElement(1061)};
	/**在游戏中使用可获得体力*/
	get Online_shop002():ILanguageElement{return this.getElement(1062)};
	/**蓝色飞贼*/
	get Online_shop003():ILanguageElement{return this.getElement(1063)};
	/**在奖励地图中捕获龙娘时使用*/
	get Online_shop004():ILanguageElement{return this.getElement(1064)};
	/**购买*/
	get Online_shop005():ILanguageElement{return this.getElement(1065)};
	/**总计：*/
	get Online_shop006():ILanguageElement{return this.getElement(1066)};
	/**结余：*/
	get Online_shop007():ILanguageElement{return this.getElement(1067)};
	/**DragonVerse 商城*/
	get Online_shop008():ILanguageElement{return this.getElement(1068)};
	/**使用*/
	get Online_shop009():ILanguageElement{return this.getElement(1069)};
	/**数量：*/
	get Online_shop010():ILanguageElement{return this.getElement(1070)};
	/**确定消耗一瓶仙豆药水并回复{0}体力吗？*/
	get Online_shop011():ILanguageElement{return this.getElement(1071)};
	/**确认（E）*/
	get Online_shop012():ILanguageElement{return this.getElement(1072)};
	/**取消（Esc）*/
	get Online_shop013():ILanguageElement{return this.getElement(1073)};
	/**解锁*/
	get button_20():ILanguageElement{return this.getElement(1074)};
	/**进入*/
	get button_21():ILanguageElement{return this.getElement(1075)};
	/**扭蛋！*/
	get Pet_NewBuy001():ILanguageElement{return this.getElement(1076)};
	/**需要开启多少枚扭蛋？*/
	get Pet_NewBuy002():ILanguageElement{return this.getElement(1077)};
	/**融合*/
	get Pet_NewBuy003():ILanguageElement{return this.getElement(1078)};
	/**今日累计*/
	get Pet_NewBuy004():ILanguageElement{return this.getElement(1079)};
	/**重置时间*/
	get Pet_NewBuy005():ILanguageElement{return this.getElement(1080)};
	/**{0}次*/
	get Pet_NewBuy006():ILanguageElement{return this.getElement(1081)};
	/**{0}只*/
	get Pet_NewBuy007():ILanguageElement{return this.getElement(1082)};
	/**背包宠物存储量达到上限*/
	get Page_UI_Tips_14():ILanguageElement{return this.getElement(1083)};
	/**传送*/
	get JumpRoomText003():ILanguageElement{return this.getElement(1084)};
	/**刷新*/
	get Online_shop015():ILanguageElement{return this.getElement(1085)};
	/**扫荡券*/
	get Online_shop016():ILanguageElement{return this.getElement(1086)};
	/**快速通关已经取得完美胜利的关卡*/
	get Online_shop017():ILanguageElement{return this.getElement(1087)};

}