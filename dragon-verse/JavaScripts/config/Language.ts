import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_Ch","Value_J","Value_D"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"TestLanguageKey000001","Test000001","测试000001","テスト000001","Testen Sie 000001"],[2,"TestQualityName0001","TestQuality","测试质量","テスト品质","Testqualität"],[3,"TestBagItemName0001","TestBagItem","测试背包物品","テストバッグアイテム","Testbeutel-Artikel"],[4,"TestBagItemDesc0001","TestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDesc","测试背包描述测试背包描述测试背包描述测试背包描述测试背包描述","テストバッグアイテムの说明","Testbeutel-Artikel-Desc"],[5,"TestAreaName0001","TestArea","测试区域","テストエリア","Testgelände"],[6,"Dialogue0001","Welcome to DragonVerse Neo, step in and become a part of this enchanting realm!","欢迎来到Dragonverse Neo，成为这里的一员！","ドラゴンバース・ネオへようこそ!","Willkommen bei Dragonverse Neo und sei ein Teil davon!"],[7,"Dialogue0002","What shall be unveiled in the world of Dragonverse Neo?","Dragonverse Neo是个怎么样的世界？","ドラゴンバース・ネオってどんな世界?","Was für eine Welt ist Dragonverse Neo?"],[8,"Dialogue0003","DragonVerse Neo is a novel and delightful world where you can explore, discover, and create everything that belongs uniquely to you!","Dragonverse Neo是一个全新的充满乐趣的世界，你可以在这个世界中探索、发现、创造属于你的一切！","ドラゴンバース・ネオは、探索し、発见し、自分のアセットをクリエイションできる、新しい楽しさに満ちた世界です!","Dragonverse Neo ist eine neue, unterhaltsame Welt, in der du alles erforschen, entdecken und erschaffen kannst, was dir gehört!"],[9,"Dialogue0004","How can I experience DragonVerse Neo?","我要怎么体验Dragonverse Neo？","ドラゴンバース・ネオの游び方は?","Wie kann ich Dragonverse Neo erleben?"],[10,"Dialogue0005","Enter your Dragonkey and start your debut journey right away. Head over to Landing Page and check your eligibility if you don't have your Dragonkey yet.","输入你的Code即可立马体验，还没拥有Code？立即前往Landing Page获取！","ドラゴンキーという専用のコードを入力するとすぐにプレイできます。まだドラゴンキーをお持ちでない方は、ランディングページにアクセスして、今すぐ入手してください!","Geben Sie Ihren Code ein, um es sofort zu erleben, Sie haben noch keinen Code? Gehen Sie zur Landing Page, um es jetzt zu erhalten!"],[11,"Dialogue0006","My Dragonkey is ready!","Code在手，我要出去","ドラゴンキーの准备ができました","Mit dem Code in der Hand werde ich Dragonverse Neo erleben"],[12,"Dialogue0007","I don't have a Dragonkey..","我还没有Code，哪里获取","ドラゴンキーを持っていません…","Ich habe noch keinen Code, holen Sie sich jetzt den Code"],[13,"Dialogue0008","Verification ··· Succeed! Congratulations on getting out of the novice village, get ready to explore the world of Dragonverse Neo!","验证···成功！恭喜你可以走出新手村落，尽情探索Dragonverse Neo吧~","认证 ···成功！おめでとうございます！初心者の村を出て、ドラゴンバースネオを探索しましょう！","Verifizierung ··· Gelingen! Herzlichen Glückwunsch, dass du das Anfängerdorf verlassen und Dragonverse Neo erkundet hast~"],[14,"BagItemName0001","Blue Snitch","蓝色飞贼","ドラゴンボール","Blue Snitch"],[15,"BagItemName0002","Pitaya","火龙果","ドラゴンフルーツ","Drachenfrucht"],[16,"BagItemName0003","Gold","金币","ゴールド","Gold"],[17,"BagItemDesc0001","Press to capture and contain wild Modragon.","按下开关便可以捕捉Dragon，并封装在内的位面球。","ボタンを押して野生のモドラゴンを捕まえることができます。","Auf Knopfdruck kann der Drache eingefangen und in einer ebenen Kugel eingekapselt werden."],[18,"BagItemDesc0002","A delicate and juicy fruit, one of the favorite fruits of wild Modragons.","果肉细腻无核，汁水丰盈，是野生Dragon最喜爱的果实之一。","果肉は繊细で种がなく、果汁が豊富。野生のドラゴンのお気に入りの果物です。","Das Fruchtfleisch ist zart und kernlos, und der Saft ist reichlich vorhanden, was sie zu einer der Lieblingsfrüchte des wilden Drachen macht."],[19,"BagItemDesc0003","The magical coin fell from deep space, looks like a very valuable item.","从遥远的星空落下的神奇货币，看起来是很贵重的物品。","远くの星空から落ちてくる魔法の货币。とても贵重なアイテムのようです。","Die magische Währung, die vom fernen Sternenhimmel fällt, sieht aus wie ein sehr wertvoller Gegenstand."],[20,"DragonCharacter0001","Vigilant","机警的","用心深い","Wachsam"],[21,"DragonCharacter0002","Grumpy","暴躁的","気难しい","Mürrisch"],[22,"DragonCharacter0003","Timid","胆小的","臆病","Schüchtern"],[23,"DragonCharacter0004","Irritable","易怒的","不机嫌","Reizbar"],[24,"DragonCharacter0005","Gentle","温和的","优しい","Leicht"],[25,"DragonName00001","Flame Modragon","火焰龙娘","炎のモドラゴン","Flammen-Wurm"],[26,"DragonName00002","Aqua Modragon","水浪龙娘","水のモドラゴン","Welle Wurm"],[27,"DragonName00003","Hibiscus Modragon","木槿龙少","花のモドラゴン","Hibiskus Wurm"],[28,"DragonName00004","Megalithic Modragon","岩石龙娘","岩のモドラゴン","Rock Wurm"],[29,"DragonName00005","Infernal Modragon","炼狱龙娘","地狱のモドラゴン","Höllischer Drache"],[30,"DragonName00006","Ocean Modragon","海洋龙娘","海のモドラゴン","Ozean-Drache"],[31,"DragonName00007","Forest Modragon","森林龙娘","森のモドラゴン","Wald-Drache"],[32,"DragonName00008","Mountain Modragon","山脉龙娘","山のモドラゴン","Berg-Drache"],[33,"DragonName00009","Light Modragon","圣光龙娘","光のモドラゴン","Licht-Drache"],[34,"DragonName00010","Shadow Modragon","暗影龙娘","闇のモドラゴン","Schatten-Drache"],[35,"QualityName0001","Common","普通","コモン","Gemeinsam"],[36,"QualityName0002","Uncommon","良好","アンコモン","Ungewöhnlich"],[37,"QualityName0003","Unique","优秀","ユニーク","Einzigartig"],[38,"QualityName0004","Rare","稀有","レア","Selten"],[39,"QualityName0005","Epic","史诗","エピック","Episch"],[40,"QualityName0006","Legendary","传说","レジェンダリー","Sagenhaft"],[41,"ElementalName0001","Fire","火","炎","Feuer"],[42,"ElementalName0002","Water","水","水","Wasser"],[43,"ElementalName0003","Wood","木","木","Holz"],[44,"ElementalName0004","Earth","土","土","Erde"],[45,"ElementalName0005","Light","光","光","Licht"],[46,"ElementalName0006","Dark","暗","暗","Dunkel"],[100101,"CharacterName0001","Newbie Mentor · Oliver","新手导师 · 奥利弗","新米のメンター · オリバー","Newbie Mentor · Oliver"],[100102,"CharacterName0002","Master of Collection · Ricky","采集导师 · 瑞奇","コレクションの达人 · リッキー","Master of Collection · Ricky"],[100103,"CharacterName0003","Master of Dragons · Selina","捕龙专家 · 瑟琳娜","ドラゴンの达人 · セリーナ","Master of Dragons · Selina"],[100104,"CharacterName0004","Master of Emote · Barbara","舞者 · 芭芭拉","エモートの达人 · バーバラ","Master of Emote · Barbara"],[100105,"CharacterName0005","Wood Guardian · Fenia","木元素智者 · 芬尼亚","木の守护神 · フェニア","Wood Guardian · Fenia"],[100106,"CharacterName0006","Earth Guardian · Terrakus","土元素智者 · 泰瑞克斯","土の守护神 · テラクス","Earth Guardian · Terrakus"],[100107,"CharacterName0007","Water Guardian · Wendy","水元素智者 · 温迪妮","水の守护神 · ウェンディ","Water Guardian · Wendy"],[100108,"CharacterName0008","Fire Guardian · Elia","火元素智者 · 艾莉娅","火の守护神 · エリア","Fire Guardian · Elia"],[100109,"CharacterName0009","Mysterious","神秘人","谜","Mysterious"],[100110,"CharacterName0010","Wood Monolith","木元素图腾","木のモノリス","Wood Monolith"],[100111,"CharacterName0011","Earth Monolith","土元素图腾","土のモノリス","Earth Monolith"],[100112,"CharacterName0012","Fire Monolith","火元素图腾","火のモノリス","Fire Monolith"],[100113,"CharacterName0013","Water Monolith","水元素图腾","水のモノリス","Water Monolith"],[100201,"AreaName0001","Drakeling Town","龙吟村","ドラケリングの街","Drakeling Town"],[100202,"AreaName0002","Spawn Point","出生点","出现场所","Spawn Point"],[100203,"AreaName0003","Azure Shore","碧波湖畔","苍き岸辺","Azure Shore"],[100204,"AreaName0004","Acient Abyss","远古遗迹","古代の奈落","Acient Abyss"],[100205,"AreaName0005","Mythical Wasteland","神秘废墟","神秘の荒野","Mythical Wasteland"],[100206,"AreaName0006","Glacial Realm","冰霜天池","氷结の领域","Glacial Realm"],[101001,"CharacterInteract0001","Chat","对话","会话","Chat"],[101002,"CharacterInteract0002","Emote","动作交互","感情","Emote"],[102129,"Danmu_Content_3129","Spin","小陀螺","スピン","Spin"],[102130,"Danmu_Content_3130","Handstand","倒立旋转","逆立ち回転","Handstand"],[102131,"Danmu_Content_3131","Ballet","芭蕾","バレエ","Ballet"],[102132,"Danmu_Content_3132","Street","街舞","ストリートダンス","Street"],[102133,"Danmu_Content_3133","Mechan","机械舞","メカニカルダンス","Mechan"],[102134,"Danmu_Content_3134","Ghost","鬼步舞","ゴーストステップ","Ghost"],[102135,"Danmu_Content_3135","Jackson","迈克尔","ジャクソン","Jackson"],[102136,"Danmu_Content_3136","Modern","现代舞","モダンダンス","Modern"],[102137,"Danmu_Content_3137","Group","团舞","グループダンス","Group"],[102138,"Danmu_Content_3138","Heart","比心","ハート","Heart"],[102139,"Danmu_Content_3139","Shoulder","搂肩","ショルダーダンス","Shoulder"],[102140,"Danmu_Content_3140","Cheer","欢呼","歓声","Cheer"],[102141,"Danmu_Content_3141","Defy","不服气","不服従","Defy"],[102142,"Danmu_Content_3142","Viral","两只老虎","2匹の虎","Viral"],[102143,"Danmu_Content_3143","PPAP","PPAP","PPAP","PPAP"],[102144,"Danmu_Content_3144","Applaud","鼓掌","拍手","Applaud"],[102145,"Danmu_Content_3145","Salute","行礼","敬礼","Salute"],[102146,"Danmu_Content_3146","Wave","挥手","手を振る","Wave"],[102147,"Danmu_Content_3147","Like","点赞","いいね","Like"],[102148,"Danmu_Content_3148","Kiss","飞吻","キス","Kiss"],[102149,"Danmu_Content_3149","Angry","生气","怒り","Angry"],[102150,"Danmu_Content_3150","Heart","比心","ハート","Heart"],[102151,"Danmu_Content_3151","ShakeHead","摇头","を振る","ShakeHead"],[102152,"Danmu_Content_3152","Weep","哭泣","泣く","Weep"],[102153,"Danmu_Content_3153","Hug","拥抱","抱拥","Hug"],[102154,"Danmu_Content_3154","Pas deux","双人舞","パ・ドゥ","Pas deux"],[102155,"Danmu_Content_3155","Greet","打招呼","挨拶","Greet"],[102156,"Danmu_Content_3156","Jackson","迈克尔","ジャクソン","Jackson"],[102157,"Danmu_Content_3157","Wrestle","过肩摔","レスリング","Wrestle"],[102158,"Dragontip_Content_0001","*Modragon required to unlock this magical seal.","需要*元素龙才能解开该法阵","この魔法の封印を解除するにはモドラゴンが必要です。","*Modragon required to unlock this magical seal."],[102159,"Need_FireDargon","Summon your Flame Modragon to continue","需要召唤出火焰龙娘才能解锁该法阵","続行するには炎のモドラゴンを召唤してください。","Summon your Flame Modragon to continue"],[103001,"Obby_GoldReward","Receive gold coin award","获得金币奖励","Receive gold coin award","Receive gold coin award"],[103002,"Obby_RedTips","Do not touch the red","不能触碰到红色","Do not touch the red","Do not touch the red"],[103003,"Obby_CheckPoint_001","Level","Level","Level","Level"],[103004,"Obby_CheckPoint_002"," ","关"," "," "],[103005,"Obby_item_001","Automatic","自动寻路","Automatic","Automatic"],[103006,"Obby_item_002","Shield","护盾","Shield","Shield"],[105001,"Bag_001","Bag","背包","バッグ","Bag"],[105002,"Bag_002","Modragon","龙娘","モドラゴン","Modragon"],[105003,"Bag_003","Item","物品","アイテム","Item"],[105004,"Bag_004","Summon","召唤","召唤する","Summon"],[105005,"Bag_005","Rest","休息","休む","Rest"],[105006,"Bag_006","Amount","数量","量","Amount"],[105051,"Reset_001","Reset","点我复位","リセット","Reset"],[105101,"Collection_001","Collection Start","开始采集","コレクション开始","Collection Start"],[105102,"Collection_002","Collection Successful","采集成功","コレクション成功","Collection Successful"],[105103,"Collection_003","Collection Failed","采集失败","コレクション失败","Collection Failed"],[105201,"Catch_001","Boxing Start","开始捕捉","ボクシング开始","Boxing Start"],[105202,"Catch_002","Boxing Successful","捕捉成功","ボクシング成功","Boxing Successful"],[105203,"Catch_003","Boxing Failed","捕捉失败","ボクシング失败","Boxing Failed"],[105204,"Catch_004","Insufficient Blue Snitch, try again.","您的Blue Snitch不足，无法捕捉。","ドラゴンボールがありません","Insufficient Blue Snitch, try again."],[105205,"Catch_005","Perfect","完美的","パーフェクト","Perfect"],[105206,"Catch_006","Normal","一般的","ノーマル","Normal"],[105301,"Code001","Dear Moboxers:","尊敬的MOBOX小区：","尊敬するMOBOXコミュニティの皆様：","Dear Moboxers:"],[105302,"Code002","Enter your Dragonkey code below and start your debut journey on Dragonverse Neo Alpha Test:","在下方输入您的Dragonkey验证码即可开始探索Dragonverse Neo删档内测的完整内容:","下にドラゴンキー(コード)を入力して、ドラゴンバース・ネオのアルファテストをお楽しみください","Enter your Dragonkey code below and start your debut journey on Dragonverse Neo Alpha Test:"],[105303,"Code003","Enter your code","输入验证码","コードを入力","Enter your code"],[105304,"Code004","Verify","验证","确认","Verify"],[105305,"verifyCodeTooFrequently","Verify is too frequent","验证过于频繁，请稍候再试","検证の频度が高すぎる","Verify is too frequent"],[105306,"verifyCodeFail","Verification Failed, please check the code","验证失败，请检查验证码","検证に失败しました。コードを确认してください","Verification Failed, please check the code"],[105307,"verifyCodeSuccess","Verification Successful","验证成功","検证成功","Verification Successful"],[105308,"isVerifying","Verifying now, please wait","验证中，请稍候","今すぐ确认中、しばらくお待ちください","Verifying now, please wait"],[105401,"Setting001","Setting","设置","设定","Setting"],[105402,"Setting002","Rename","修改昵称","名前変更","Rename"],[105403,"Setting003","Language","多语言","言语","Language"],[105404,"Setting004","Verify","验证","确认","Verify"],[105405,"Setting005","Log out","注销","ログアウト","Log out"],[105406,"Setting006","Change avatar","修改形象","アバター変更","Change avatar"],[105407,"Setting007","Your name","你的昵称","あなたの名前","Your name"],[105501,"TinyGameLanKey0001","Pick up","拾取","拾う","Pick up"],[105502,"TinyGameLanKey0002","Put it down","放下","置く","Put it down"],[105503,"TinyGameLanKey0003","Fire spells","火球术","炎の呪文","Fire spells"],[105504,"TinyGameLanKey0004","Mini-game completed! Check your bag for Modragon reward!","恭喜通关小游戏，请在背包中查收奖励","ミニゲームが完了しました！报酬のモドラゴンをバッグから确认してください！","Mini-game completed! Check your bag for Modragon reward!"],[105505,"FireMonolithTips001","The flame-forged runes are dangling on the surface of the Monolith, releasing substantial heat around the Monolith","火焰般的符文在柱子上跳动，散发出炙热的氛围。","炎で锻えられた古代文字がモノリスの表面にぶら下がっており、モノリスの周りには强烈な热が放射されています。","The flame-forged runes are dangling on the surface of the Monolith, releasing substantial heat around the Monolith"],[105506,"WaterMonolithTips002","Aqueous encarvings are flowing on the surface of the Monolith, delighted with watery breeze","流水般的图案在这根柱子上流动，带来清凉的感觉。","水のような模様がモノリスの表面を流れており、水がせせらいでいます。","Aqueous encarvings are flowing on the surface of the Monolith, delighted with watery breeze"],[105507,"WoodMonolithTips003","The encarving on this Monolith shows vitality, surrounded by the fragrance of nature.","这根柱子上刻满了树木和生命的图腾，散发着清新的自然气息。","このモノリスの刻印は生命力を象征しており、自然の香りに囲まれています。","The encarving on this Monolith shows vitality, surrounded by the fragrance of nature."],[105508,"EarthMonolithTips004","The veins of stone interlace on the surface of this Monolith, feels like the mighty power of Earth","巨石纹路在这根柱子上交错，仿佛感受到大地的沉稳力量。","モノリスの表面の入り组んだ岩の模様から、强大な大地の力を感じます。","The veins of stone interlace on the surface of this Monolith, feels like the mighty power of Earth"],[105601,"BoxingDragonName00001","Fire · Ever Waltz","火·烬舞","Fire · Dance","Fire · Dance"],[105602,"BoxingDragonName00002","Fire · Molten Shine","火·熔光","Fire · Molten","Fire · Molten"],[105603,"BoxingDragonName00003","Fire · Fiery Shadow","火·炽影","Fire · Shadow","Fire · Shadow"],[105604,"BoxingDragonName00004","Fire · Sway","火·摇曳","Fire · Swaying","Fire · Swaying"],[105605,"BoxingDragonName00005","Fire · Ember","火·笙桦","Fire · Betula","Fire · Betula"],[105606,"BoxingDragonName00006","Water · Azure","水·蓝波","Water · Wave","Water · Wave"],[105607,"BoxingDragonName00007","Water · Frost","水·冰雪","Water · Ice","Water · Ice"],[105608,"BoxingDragonName00008","Water · Ripples","水·涟漪","Water · Ripples","Water · Ripples"],[105609,"BoxingDragonName00009","Water · Aqua","水·海影","Water · Sea","Water · Sea"],[105610,"BoxingDragonName00010","Water · Glacier","水·冰妃","Water · Princess","Water · Princess"],[105611,"BoxingDragonName00011","Wood · Sakura","木·樱林","Wood · Sakura","Wood · Sakura"],[105612,"BoxingDragonName00012","Wood · Verdant","木·翠影","Wood · Shadow","Wood · Shadow"],[105613,"BoxingDragonName00013","Wood · Sycamore","木·梧韵","Wood · Sycamore","Wood · Sycamore"],[105614,"BoxingDragonName00014","Wood · Serenity","木·茶枝","Wood · Branches","Wood · Branches"],[105615,"BoxingDragonName00015","Wood · Whisper","木·桃语","Wood · Momo","Wood · Momo"],[105616,"BoxingDragonName00016","Earth · Ridge","土·沧峰","Earth · Peak","Earth · Peak"],[105617,"BoxingDragonName00017","Earth · Summit","土·翠谷","Earth · Valley","Earth · Valley"],[105618,"BoxingDragonName00018","Earth · Domain","土·黄域","Earth · Domain","Earth · Domain"],[105619,"BoxingDragonName00019","Earth · Sprout","土·绿枝","Earth · Branches","Earth · Branches"],[105620,"BoxingDragonName00020","Earth · Stone","土·岩坡","Earth · Rock","Earth · Rock"],[105621,"BoxingDragonName00021","Fire · Blaze","火·焚花","Fire · Flowers","Fire · Flowers"],[105622,"BoxingDragonName00022","Fire · Inferno","火·赤翼","Fire · Wing","Fire · Wing"],[105623,"BoxingDragonName00023","Timid Infernal Modragon","胆小的炼狱龙娘","臆病な地狱のモドラゴン","Timid Infernal Modragon"],[105624,"BoxingDragonName00024","Irritable Infernal Modragon","易怒的炼狱龙娘","怒りっぽい地狱のモドラゴン","Irritable Infernal Modragon"],[105625,"BoxingDragonName00025","Gentle Infernal Modragon","温和的炼狱龙娘","穏やかな地狱のモドラゴン","Gentle Infernal Modragon"],[105626,"BoxingDragonName00026","Water · Springs","水·清泉","Water · Springs","Water · Springs"],[105627,"BoxingDragonName00027","Water · Yu","水·蓝钰","Water · Yu","Water · Yu"],[105628,"BoxingDragonName00028","Timid Ocean Modragon","胆小的海洋龙娘","臆病な海のモドラゴン","Timid Ocean Modragon"],[105629,"BoxingDragonName00029","Irritable Ocean Modragon","易怒的海洋龙娘","怒りっぽい海のモドラゴン","Irritable Ocean Modragon"],[105630,"BoxingDragonName00030","Gentle Ocean Modragon","温和的海洋龙娘","穏やかな海のモドラゴン","Gentle Ocean Modragon"],[105631,"BoxingDragonName00031","Wood · Wind","木·竹风","Wood · Wind","Wood · Wind"],[105632,"BoxingDragonName00032","Wood · Pine","木·松雨","Wood · Pine","Wood · Pine"],[105633,"BoxingDragonName00033","Timid Forest Modragon","胆小的森林龙娘","臆病な森のモドラゴン","Timid Forest Modragon"],[105634,"BoxingDragonName00034","Irritable Forest Modragon","易怒的森林龙娘","怒りっぽい森のモドラゴン","Irritable Forest Modragon"],[105635,"BoxingDragonName00035","Gentle Forest Modragon","温和的森林龙娘","穏やかな森のモドラゴン","Gentle Forest Modragon"],[105636,"BoxingDragonName00036","Earth · Wings","土·花翼","Earth · Wings","Earth · Wings"],[105637,"BoxingDragonName00037","Earth · Mountains","土·青峦","Earth · Mountains","Earth · Mountains"],[105638,"BoxingDragonName00038","Timid Mountain Modragon","胆小的山脉龙娘","臆病な山のモドラゴン","Timid Mountain Modragon"],[105639,"BoxingDragonName00039","Irritable Mountain Modragon","易怒的山脉龙娘","怒りっぽい山のモドラゴン","Irritable Mountain Modragon"],[105640,"BoxingDragonName00040","Gentle Mountain Modragon","温和的山脉龙娘","穏やかな山のモドラゴン","Gentle Mountain Modragon"],[105641,"BoxingDragonName00041","Light · Sunset","光·晚霞","Light · Sunset","Light · Sunset"],[105642,"BoxingDragonName00042","Light · Sunshine","光·日曦","Light · Sunshine","Light · Sunshine"],[105643,"BoxingDragonName00043","Light · Dance","光·云舞","Light · Dance","Light · Dance"],[105644,"BoxingDragonName00044","Light · Dawn","光·朝辉","Light · Dawn","Light · Dawn"],[105645,"BoxingDragonName00045","Light · Shadow","光·明影","Light · Shadow","Light · Shadow"],[105646,"BoxingDragonName00046","Dark · Blade","暗·魄刃","Dark · Blade","Dark · Blade"],[105647,"BoxingDragonName00047","Dark · Shadow","暗·雪影","Dark · Shadow","Dark · Shadow"],[105648,"BoxingDragonName00048","Dark · Nightway","暗·夜薇","Dark · Nightway","Dark · Nightway"],[105649,"BoxingDragonName00049","Dark · Wind","暗·幽风","Dark · Wind","Dark · Wind"],[105650,"BoxingDragonName00050","Dark · Moon","暗·冥月","Dark · Moon","Dark · Moon"],[105651,"BoxingDragonName00051","Light · Cloud","光·云露","Light · Cloud","Light · Cloud"],[105652,"BoxingDragonName00052","Light · Break","光·破晓","Light · Break","Light · Break"],[105653,"BoxingDragonName00053","Dark · Lotus","暗·影莲","Dark · Lotus","Dark · Lotus"],[105654,"BoxingDragonName00054","Dark · Feather","暗·墨翎","Dark · Feather","Dark · Feather"],[105701,"HomeResourcesName0001","Wood","木头","Wood","Wood"],[105702,"HomeResourcesName0002","Stone","石头","Stone","Stone"],[105703,"HomeResourcesName0003","Iron","黑铁","Iron","Iron"],[105704,"HomeResourcesName0004","Bronze","黄铜","Bronze","Bronze"],[105801,"HomeResourcesDesc0001","Can be consumed in Homestead gameplay and used to build Homesteads","可以在家园玩法中消耗，用于建造家园","Can be consumed in Homestead gameplay and used to build Homesteads","Can be consumed in Homestead gameplay and used to build Homesteads"],[105802,"HomeResourcesDesc0002","Can be consumed in Homestead gameplay and used to build Homesteads","可以在家园玩法中消耗，用于建造家园","Can be consumed in Homestead gameplay and used to build Homesteads","Can be consumed in Homestead gameplay and used to build Homesteads"],[105803,"HomeResourcesDesc0003","Can be consumed in Homestead gameplay and used to build Homesteads","可以在家园玩法中消耗，用于建造家园","Can be consumed in Homestead gameplay and used to build Homesteads","Can be consumed in Homestead gameplay and used to build Homesteads"],[105804,"HomeResourcesDesc0004","Can be consumed in Homestead gameplay and used to build Homesteads","可以在家园玩法中消耗，用于建造家园","Can be consumed in Homestead gameplay and used to build Homesteads","Can be consumed in Homestead gameplay and used to build Homesteads"],[200001,"Dialogue0009","Is there anything interesting around here?","这附近有什么有趣的东西吗？","この近くには面白いものがありますか？","Is there anything interesting around here?"],[200002,"Dialogue0010","Hey, new adventurer! Welcome to Dragonverse Neo. This is a world of dragon fantasy! See those colorful objects on the ground? Those are the true treasures in this land: Blue Snitchs.","哟，新来的冒险家！欢迎来到Dragonverse Neo，这里可是个充满奇妙的世界。看到地上那些五光十色的物体了吗？那可是我们这里的宝贝Blue Snitch。","こんにちは、新米の冒険者さん！Dragonverse Neoへようこそ！ここは不思议な世界でいっぱいのんですよ。地面にキラキラ光る色とりどりのオブジェクトが见えますか？それは当地の宝物、Blue Snitchなんです。","Hey, new adventurer! Welcome to Dragonverse Neo. This is a world of dragon fantasy! See those colorful objects on the ground? Those are the true treasures in this land: Blue Snitchs."],[200003,"Dialogue0011","Blue Snitch? looks pretty cool?","Blue Snitch？很厉害的样子？","Blue Snitch？それってすごそう？","Blue Snitch? looks pretty cool?"],[200004,"Dialogue0012","You bet! Blue Snitchs are preciously unique in this land, it's designed to capture DragonBorns or as an crafting material for mysterious items! Let me help you recognize them.","没错！Blue Snitch是这片大陆上独有的特产。你可以用它们来捕捉Modragon，也能用来合成一些有趣的东西。来，我教你如何辨认Blue Snitch。","そうなんです！Blue Snitchはこの大陆ならではの特产品なんです。Modragonを捕まえるためにも使えますし、面白いアイテムを合成するのにも使えるんですよ。さあ、どうやってBlue Snitchを见分けるか教えてあげるね。","You bet! Blue Snitchs are preciously unique in this land, it's designed to capture DragonBorns or as an crafting material for mysterious items! Let me help you recognize them."],[200005,"Dialogue0013","The rarities of these Blue Snitchs are determined by their colors and textures. Rare Blue Snitchs have higher odds in capturing DragonBorns.","这些Blue Snitch有不同的颜色和纹理，代表着它们的不同稀有度，越稀有的Blue Snitch捕获成功率越高。","これらのBlue Snitchには异なる色と质感があり、それが异なる希少度を表しています。希少なBlue Snitchほど、捕获の成功率が高まるんです。","The rarities of these Blue Snitchs are determined by their colors and textures. Rare Blue Snitchs have higher odds in capturing DragonBorns."],[200006,"Dialogue0014","How can I get Blue Snitch?","我要如何获得Blue Snitch呢？","Blue Snitchを入手するにはどうすればいいの？","How can I get Blue Snitch?"],[200007,"Dialogue0015","Eazy peasy! Just aim at the Blue Snitch and hit \"collect\".","对准它们，按下采集按钮，就能轻松采集到手。","それを狙って、収获ボタンを押してみれば、简単に手に入れることができるよ。","Eazy peasy! Just aim at the Blue Snitch and hit \"collect\"."],[200008,"Dialogue0016","Fanstastic, and what are those red fruits over there? Can I eat them?","原来如此，那边的红色果实又是什么，可以吃吗？","なるほど、ではあの赤い実は何でしょう？食べられるの？","Fanstastic, and what are those red fruits over there? Can I eat them?"],[200009,"Dialogue0017","That's Pitaya: A delicate and juicy fruit, one of the favorite fruits of Dragonborns. To collect Pitaya, just stand underneath the trees and press \"collect\".","那是我们的火龙果。果肉细腻无核，汁水丰盈，是野生Modragon最喜爱的果实之一。要采集火龙果，只需走到果树下，按下采集按钮即可。","それは私たちの火龙果。核がなくて肉质がきめ细かく、ジューシーな果実で、野生のModragonたちのお気に入りの食べ物の一つなんだ。火龙果を収获するには、果树の下に行って収获ボタンを押すだけでいいのよ。","That's Pitaya: A delicate and juicy fruit, one of the favorite fruits of Dragonborns. To collect Pitaya, just stand underneath the trees and press \"collect\"."],[200010,"Dialogue0018","Pitaya sounds delicious!","火龙果听起来好好吃啊！","火龙果、美味しそうですね！","Pitaya sounds delicious!"],[200011,"Dialogue0019","Indeed, not only are they tasty, but they're also crucial materials for crafting. Take some Pitaya with you, and they might help you along your journey in this land!","是的，不仅好吃，而且还是一些合成材料的重要组成部分。收集一些火龙果，它们可能对你未来的冒险起到帮助。","そうなんです、美味しいだけでなく、いくつかの合成アイテムの重要な材料にもなるのよ。火龙果を集めておくと、将来の冒険に役立つことがあるかもしれません。","Indeed, not only are they tasty, but they're also crucial materials for crafting. Take some Pitaya with you, and they might help you along your journey in this land!"],[200012,"Dialogue0020","There is something else I want you to know, we call it \"Gold Coins\"","还有一种采集物我要介绍给你，那就是金币。","それともう一つ、収获するアイテムとして绍介したいのが金货です。","There is something else I want you to know, we call it \"Gold Coins\""],[200013,"Dialogue0021","Gold Coins? Are they also collectibles?","金币？这也是一种采集物吗？","金货？これも収获の対象なの？","Gold Coins? Are they also collectibles?"],[200014,"Dialogue0022","In the land of Dragonverse Neo, Gold Coins is a precious resource. It fell from distance space. Using Gold Coins, you may trade with other adventurers, buy items and craft rare items.","在我们的Dragonverse Neo中，金币是一种非常重要的资源。它们从遥远的星空落下，是很贵重的物品。你可以使用它与其他冒险家交易、购买物品，甚至用来合成一些珍贵的道具。","Dragonverse Neoでは、金货は非常に重要な资源です。远くの宇宙から降ってきたもので、非常に価値があります。これらの金货を使って他の冒険者とのトレードやアイテムの购入、贵重なアイテムの合成などができるんです。","In the land of Dragonverse Neo, Gold Coins is a precious resource. It fell from distance space. Using Gold Coins, you may trade with other adventurers, buy items and craft rare items."],[200015,"Dialogue0023","So lucky-strikes are true! I hope I am the \"hit by gold\" version of Isaac Newton>3","原来天上掉金币这种事是真的会发生啊！","なるほど、天から金货が降ってくるなんて本当にあるんですね！","So lucky-strikes are true! I hope I am the \"hit by gold\" version of Isaac Newton>3"],[200016,"Dialogue0024","Exclusively in Dragonverse Neo! Now go and collect some of those Blue Snitchs, Pitaya and Gold Coins. Your adventure is await.","仅此一家，也只有在Dragonverse Neo中你才能体会到这种乐趣了！去吧，尝试着采集一些Blue Snitch,火龙果和金币吧。","これはDragonverse Neoだけの特别な楽しみなんだよ！さあ、Blue Snitch、火龙果、金货を集める楽しさを味わってみてね。","Exclusively in Dragonverse Neo! Now go and collect some of those Blue Snitchs, Pitaya and Gold Coins. Your adventure is await."],[200017,"Dialogue0025","Hey, new adventurer! Looks like you have mastered the collection skills, now it's time for you to get your lovely DragonBorn pal!","嘿，新冒险者，听说你已经掌握了采集的技巧，那么是不是也想要拥有属于自己的小伙伴Modragon呢？","ねえ、新しい冒険者さん、采取のスキルを身につけたと闻いたけど、それならばModragonの仲间を持ちたくない？","Hey, new adventurer! Looks like you have mastered the collection skills, now it's time for you to get your lovely DragonBorn pal!"],[200018,"Dialogue0026","Aha! Never say no to free Dragons!","来都来了，肯定要搞一只吧。","こっちに来て、ぜひ一匹仲间にしよう。","Aha! Never say no to free Dragons!"],[200019,"Dialogue0027","Your honesty is... quite straightfoward. You will need to use your Blue Snitchs to capture them, I will show you how.","你倒是很坦诚嘛！其实，只需要使用Blue Snitch就可以捕捉到属于你的Dragon了。先来了解一下如何使用Blue Snitch吧。","あなたは率直なんだね！実はBlue Snitchを使うだけで、自分だけのDragonを捕まえることができるんだよ。まずはBlue Snitchの使い方を知っておこう。","Your honesty is... quite straightfoward. You will need to use your Blue Snitchs to capture them, I will show you how."],[200020,"Dialogue0028","You see this Blue Snitch? All you have to do is capture them using the \"Capture\" controller, select your Blue Snitch and tose it to the Dragonborn you wish to capture. But it's not easy! Dragonborns could be quite stubborn to capture!","看到这颗Blue Snitch了吗？你可以通过Modragon捕获面板的操纵杆，选择它，然后投掷到想要捕捉的Modragon附近。不过，这可不是一件简单的事情，每个Modragon都有自己的个性。","あのBlue Snitchを见たかい？Modragonを捕まえるパネルのスティックを使ってそれを选び、捕まえたいModragonの近くに投げるだけ。でも、これは简単なことじゃないんだよ、それぞれのModragonは自分の个性を持っているんだ。","You see this Blue Snitch? All you have to do is capture them using the \"Capture\" controller, select your Blue Snitch and tose it to the Dragonborn you wish to capture. But it's not easy! Dragonborns could be quite stubborn to capture!"],[200021,"Dialogue0029","Stubborn? You mean they have traits?","个性？","个性？","Stubborn? You mean they have traits?"],[200022,"Dialogue0030","That's right, there are 5 traits Dragonborns might have: Vigilant; Grumpy; Timid; Irritable or Gentle. traits are crucial when it comes to capturing them, so you might want to know their traits before you waste your Blue Snitch.","没错，每个Dragon都有五种个性，包括机警的、暴躁的、胆小的、易怒的、温和的。而且，它们的个性还会影响到捕捉的难度。所以在捕捉之前，最好先了解一下你要捕捉的Modragon的个性。","そうなんだ、各Dragonには贤い、攻撃的、臆病、怒りっぽい、温和といった5つの个性があります。しかも、彼らの个性は捕获の难易度にも影响を与えます。だから捕まえる前に、捕まえたいModragonの个性を知っておくといいよ。","That's right, there are 5 traits Dragonborns might have: Vigilant; Grumpy; Timid; Irritable or Gentle. traits are crucial when it comes to capturing them, so you might want to know their traits before you waste your Blue Snitch."],[200023,"Dialogue0031","Interesting! How would I know about their traits?","原来如此，我要怎么了解它们的个性呢？","なるほど、では彼らの个性をどうやって知ればいいの？","Interesting! How would I know about their traits?"],[200024,"Dialogue0032","It's quite simple, just look at the name and color of the Dragonborn, that will be your hint. Anyway, observation will help.","很简单，你只需要观察Modragon头上的名称和颜色，他们会提示你这只Modragon的个性；总之，多观察，你就能熟知它们的个性。","简単だよ、Modragonの头上の名前と色をよく観察して、それがそのModragonの个性を示しているよ。简単に言えば、よく観察して、彼らの个性を理解できるようになるよ。","It's quite simple, just look at the name and color of the Dragonborn, that will be your hint. Anyway, observation will help."],[200025,"Dialogue0033","You said it like it's so simple..","听上去很简单的样子。","简単そうね。","You said it like it's so simple.."],[200026,"Dialogue0034","Not that hard anyway!","那当然了，没有大家说的那么难！","もちろん、みんなが言うほど难しいことはないよ！","Not that hard anyway!"],[200027,"Dialogue0035","Can't you tell I'm being ironic?","我在说反话你听不出来吗？","逆ならわからないのか？","Can't you tell I'm being ironic?"],[200028,"Dialogue0036","......, you are lucky I'm not the grumpy one. Actually, I can teach you a technic, it can efficiently increase your odds of capturing them.","……，别在这阴阳怪气了，我破例传授你一个投掷诀窍，可以很好的提高你的捕获概率。","\"……、ここで阴阳怪气なことを言わないで、私例外的にあなたに投げるヒントを伝授します。これで捕获率がぐっと上がりますよ。","......, you are lucky I'm not the grumpy one. Actually, I can teach you a technic, it can efficiently increase your odds of capturing them."],[200029,"Dialogue0037","I'm listening.","说来听听。","闻いてみて。","I'm listening."],[200030,"Dialogue0038","Remember, controls the your strength. If the strength indicator slides right into the highest strength section (the narrow section in the force indicator), You can dramatically increase your odds of capture.","记住，力度是关键，投掷的瞬间，如果力度指示器指标刚好摆动到最高档力度区间（力度指示器中间最窄的那一档），就能够大大的提高捕获的成功率哦。","覚えてね、力がポイント。投げる瞬间、力のインジケーターが最も高いギアの间で揺れ动くようになったら（力のインジケーターの中で最も狭い部分）、捕获の成功率が大幅に向上します。","Remember, controls the your strength. If the strength indicator slides right into the highest strength section (the narrow section in the force indicator), You can dramatically increase your odds of capture."],[200031,"Dialogue0039","Bingo! Wait.. I don't think I'm the only one that konw this..","还有这种操作？你不会只告诉我一个人吧？","こんな操作もあるの？一人だけに教えるんじゃないでしょうね？","Bingo! Wait.. I don't think I'm the only one that konw this.."],[200032,"Dialogue0040","......Just go and try, remember to capture as much as possible. They will be your key helper along your journey!","...... 赶紧去试试吧，记得多捕捉一些Dragon，它们会成为你在Dragonverse Neo中的得力助手。","...... 早く试してみて、Dragonをたくさん捕まえてDragonverse Neoで强力な助手にしてね。","......Just go and try, remember to capture as much as possible. They will be your key helper along your journey!"],[200033,"Dialogue0041","Yo new folk! Welcome to Dragonverse Neo, I am the master of emote in this land, and you can call be Barb! Ready to learn some funky move?","Yo，新来的小伙伴！欢迎来到Dragonverse Neo！我是这片土地上的动作指导大师，随意叫我巴巴。在这里，你可以和我嬉笑打闹，学习各种骚气的动作。","Yo、新しい仲间！Dragonverse Neoへようこそ！私はこの土地のアクション指导マスター、ババです。ここでは私と一绪に笑ったり、いろんな洒落たアクションを学んだりできるわ。","Yo new folk! Welcome to Dragonverse Neo, I am the master of emote in this land, and you can call be Barb! Ready to learn some funky move?"],[200034,"Dialogue0042","Emote? Like what?","动作？比如说？","アクション？例えばね？","Emote? Like what?"],[200035,"Dialogue0043","Open your Emote panel, select an emote and play it, it's quite fun and I can show it to you!","点击你的动作面板，选择一个动作，保证比你想象中还要嗨！看我来给你演示一下~","アクションパネルをクリックして、アクションを选んで、思ったよりも楽しいことを保证するわ！见て、私がデモンストレーションするね。","Open your Emote panel, select an emote and play it, it's quite fun and I can show it to you!"],[200036,"Dialogue0044","This is our siganature move, very popular in the land of Dragonverse Neo! Use it and turn on the crowd like we always do!","这个动作是我们这里的代表性动作，你一学就能成为街头巷尾的焦点。用它向其他冒险者示好，他们肯定会跟着你一起high起来。","これはここでの代表的なアクション。一度覚えると、街の中で注目の的になるわ。これで他の冒険者に挨拶して、きっと一绪に楽しい时间を过ごせるわ。","This is our siganature move, very popular in the land of Dragonverse Neo! Use it and turn on the crowd like we always do!"],[200037,"Dialogue0045","Also here's a reminder for you: some emotes can boost your level of friendship with other masters. But be careful not to choose the wrong emote, people might get angry!","提醒你一下，有些动作可以提高他对你的好感度，而有些动作……你可得小心点，在%&￥#@导师那里可千万别做%*&@这个动作。","注意して、いくつかのアクションは彼の印象度を高めることができるけど、他のアクション……気をつけないと、讲师のところでは%&￥#@のアクションをやるわよ。","Also here's a reminder for you: some emotes can boost your level of friendship with other masters. But be careful not to choose the wrong emote, people might get angry!"],[200038,"Dialogue0046","O...kay, what's new..","额，还有这种操作。","ええ、こういった操作もあるんだからね。","O...kay, what's new.."],[200039,"Dialogue0047","You'll get there, like the wiseman once said: communications are delicacy, learn to be artful!","这就是所谓的见人说人话，见龙走龙步了吧。","これが言う所谓、人によって话す言叶、龙に逢って歩く歩みかけね。","You'll get there, like the wiseman once said: communications are delicacy, learn to be artful!"],[200040,"Dialogue0048","Hello, adventurer. The stone structure behind me is called \"Woodland Ball Buster,\" sealed by the mighty power of \"wood\" and mysterious mechanics.","你好，冒险者，我身后的这篇木林名为“举球消消乐”，它由一些机关和封印组成。","こんにちは、冒険者、私の后ろにあるこの木の森は「ボールリフトパズル」と呼ばれています。いくつかの装置と封印で构成されています。","Hello, adventurer. The stone structure behind me is called \"Woodland Ball Buster,\" sealed by the mighty power of \"wood\" and mysterious mechanics."],[200041,"Dialogue0049","What is sealed underneath?","里面封印着什么？","中には何が封印されているの？","What is sealed underneath?"],[200042,"Dialogue0050","I was retrained here decades ago, as you can see. I am not sure what's inside this mythical structure, not without my ability to move.","如你所见，我被限制在此处无法移动，里面究竟封印着什么，我并清楚，","见ての通り、私はここで动けなくなっていて、中には何が封印されているのかはっきりしていませんが、","I was retrained here decades ago, as you can see. I am not sure what's inside this mythical structure, not without my ability to move."],[200043,"Dialogue0051","But I will teach you some technics, adventurer. The technics might help you unveil the myth behind it.","无论如何，我会教你一些可能用的上的技能。","とにかく、使えるかもしれないいくつかのスキルを教えます。","But I will teach you some technics, adventurer. The technics might help you unveil the myth behind it."],[200044,"Dialogue0052","Now, try lifting the stone sphere.","现在，尝试举起木球吧。","さあ、木のボールを持ち上げてみて。","Now, try lifting the stone sphere."],[200045,"Dialogue0053","Now, try putting down the stone sphere.","现在，尝试放下木球。","そして、今、木のボールを置いてみて。","Now, try putting down the stone sphere."],[200046,"Dialogue0054","Well done, adventurer. Now go and explore, I wish you success.","好了，冒险者，去一探究竟吧，祝你成功。","さて、冒険者、冒険してみて、成功を祈っているわ。","Well done, adventurer. Now go and explore, I wish you success."],[200047,"Dialogue0055","Are there any other clues?","还有其他线索吗？","他にも手がかりはあるかしら？","Are there any other clues?"],[200048,"Dialogue0056","Observe the structure carefully, use the technics and perhaps you will find some clues. (Repeated after completing the tutorial)","仔细观察周围的环境，运用我教你的技能，或许你能找到一些线索。（教程完成后重复）","周りの环境をよく観察し、教えたスキルを活かして、もしかしたら手がかりが见つかるかもしれないわ。（チュートリアル完了后、缲り返す）","Observe the structure carefully, use the technics and perhaps you will find some clues. (Repeated after completing the tutorial)"],[200049,"Dialogue0057","Greetings, adventurer. This maze is crafted from ancient earth magic.","你好，冒险者。这座迷阵是由古老的土元素魔法构成的。","こんにちは、冒険者さん。この迷宫は古い土の要素の魔法で构成されています。","Greetings, adventurer. This maze is crafted from ancient earth magic."],[200050,"Dialogue0058","Magic circle? What's sealed within?","魔法阵？里面封印了什么东西吗？","魔法阵？中に何が封じ込められているのですか？","Magic circle? What's sealed within?"],[200051,"Dialogue0059","Unfortunately, my comfinement retrained my ability to investigate. But I sensed high density of earth elemental force from this area, it could be related to the Earth Dragon.","很遗憾，我被困在这里无法深入调查。但这片区域蕴藏浓厚的土元素，可能与土元素龙有关。","残念ながら、私はここに闭じ込められて深く调査できません。しかし、このエリアには浓厚な土の要素があり、土の要素ドラゴンと关连している可能性があります。","Unfortunately, my comfinement retrained my ability to investigate. But I sensed high density of earth elemental force from this area, it could be related to the Earth Dragon."],[200052,"Dialogue0060","Let me teach you some skills that might be helpful.","不过，我可以教你一些技能，也许对你有所帮助。","でも、いくつかのスキルを教えることはできます。おそらくあなたの助けになるでしょう。","Let me teach you some skills that might be helpful."],[200053,"Dialogue0061","First, leap from a high point onto the giant stone slabs below.","首先，从高处对准巨石板块跳跃下去。","まず、高いところからジャンプして巨大な岩の板に向かってください。","First, leap from a high point onto the giant stone slabs below."],[200054,"Dialogue0062","Well done! The gravitational velocity will help you destroy the top stone slabs.","不错，这种向下的冲击力能够摧毁顶部的巨石板块。","良いですね、この下方向の冲撃は顶上の岩の板を破壊できます。","Well done! The gravitational velocity will help you destroy the top stone slabs."],[200055,"Dialogue0063","Excellent, it seems you're ready to face the ancient stone maze. Good luck, adventurer.","很好，看来你已经准备好挑战巨石迷阵了。祝你好运，冒险者。","素晴らしい、あなたはすでに岩の迷宫に挑戦する准备が整っています。冒険者、幸运を祈ります。","Excellent, it seems you're ready to face the ancient stone maze. Good luck, adventurer."],[200056,"Dialogue0064","Any other tips?","还有其他技巧吗？","他にもテクニックはありますか？","Any other tips?"],[200057,"Dialogue0065","Observe the shapes and colors of the stones carefully; There might be hidden pathway that leads you back to the surface! (Repeated after completing the tutorial)","仔细观察巨石的形状和颜色，也许会有隐藏的信道。（教程完成后重复）","岩の形状や色を注意深く観察すると、隠れた通路があるかもしれません。（チュートリアル完了后に缲り返します）","Observe the shapes and colors of the stones carefully; There might be hidden pathway that leads you back to the surface! (Repeated after completing the tutorial)"],[200058,"Dialogue0066","Hello, adventurer. This infernal abyss has been conteminated by the mysterious force of Fire","你好，冒险者。这片火炎地域被一种神秘的力量所影响。","こんにちは、冒険者さん。この火炎地域は神秘的な力で影响を受けています。","Hello, adventurer. This infernal abyss has been conteminated by the mysterious force of Fire"],[200059,"Dialogue0067","Is there anything worth exploring here?","这里有什么值得一探究竟的吗？","ここには何か兴味深いものがありますか？","Is there anything worth exploring here?"],[200060,"Dialogue0068","I can't venture deep into the abyss, but I sense substantial fire energy coming out from the abyss.","我无法深入火炎地域，但我感受到封印中似乎含有大量的火元素。","私は火炎地域に深入りできませんが、封印の中には大量の火の要素が含まれているようです。","I can't venture deep into the abyss, but I sense substantial fire energy coming out from the abyss."],[200061,"Dialogue0069","Water and fire are mutually restraining elements. Use their power against each other, and you shall purify comtemination.","水与火是互相克制的关系，巧妙的运用水的力量，可以净化火炎，反之亦然。","水と火はお互いに制约がある关系です。水の力を巧みに使えば火炎を浄化でき、その逆もまた然りです。","Water and fire are mutually restraining elements. Use their power against each other, and you shall purify comtemination."],[200062,"Dialogue0070","Well done. You successfully purified the lava at the bottom of the abyss. Looks like you've became a brilliant self-taught!","干得不错，你成功将水池底部的岩浆净化了，看来你已经无师自通了。","うまくやりましたね、あなたは水池の底の溶岩を浄化することに成功しました。见事な自己教育ですね。","Well done. You successfully purified the lava at the bottom of the abyss. Looks like you've became a brilliant self-taught!"],[200063,"Dialogue0071","Are there any other techniques?","还有其他技巧吗？","他にもテクニックはありますか？","Are there any other techniques?"],[200064,"Dialogue0072","Water can purify lava, and vice versa.","水可以净化火炎，反之亦然。","水は火炎を浄化でき、その逆もまた然りです。","Water can purify lava, and vice versa."],[200065,"Dialogue0073","Hello, adventurer. This cloud maze was cleansed by the mighty power of water.","你好，冒险者。这片云中迷宫充满了水元素的力量。","こんにちは、冒険者さん。この云の中の迷宫は水の要素の力に満ちています。","Hello, adventurer. This cloud maze was cleansed by the mighty power of water."],[200066,"Dialogue0074","What lies at the end of the maze?","迷宫的尽头是什么？","迷宫の先には何があるのでしょうか？","What lies at the end of the maze?"],[200067,"Dialogue0075","The power of water is burried deep by the mythical clouds. Sense the elemental force of water and find a way out.","我感受到这片区域中有浓厚的水元素。但我无法亲自前往调查。","このエリアには浓厚な水の要素が感じられます。しかし、私は直接调査することはできません。","The power of water is burried deep by the mythical clouds. Sense the elemental force of water and find a way out."],[200068,"Dialogue0076","As you know, water and fire are mutual retaining elements, summon the force and use them against each other!","水与火是互相克制的关系，巧妙的运用火的力量，可以消散云雾，反之亦然。","水と火はお互いに制约がある关系です。火の力を巧みに使えば云を消すことができ、その逆もまた然りです。","As you know, water and fire are mutual retaining elements, summon the force and use them against each other!"],[200069,"Dialogue0077","Are there any other techniques?","还有其他技巧吗？","他にもテクニックはありますか？","Are there any other techniques?"],[200070,"Dialogue0078","When you can't complete a task alone, try summoning your Modragons for assistant!","当你无法一个人完成任务是，考虑装备你的宠物帮手吧。","一人では任务を完了できない场合は、ペットを装备することを検讨してください。","When you can't complete a task alone, try summoning your Modragons for assistant!"],[200071,"Dialogue0079","You can get Dragon Key by staking MBOX to holding 10,000 veMBOX, which can be found at https: //www.mobox.io/#/neo for more information.","你还可以通过质押MBOX持有10000 veMBOX获得Dragon Key，可前往 https: //www.mobox.io/#/neo 了解详情。","さらに、MBOXを10,000 veMBOXで担保にしてDragon Ke+E264+E265:E303+E265:E304+E264+E265:E303+E265:E299+E265:E298+E265:E294","You can get Dragon Key by staking MBOX to holding 10,000 veMBOX, which can be found at https: //www.mobox.io/#/neo for more information."],[200072,"Dialogue0080","Hello, DragonOwner. Are you feeling the flourishing vitality of wood glowing behind me?","你好，冒险家。感受到我身后茂盛的木之能量了吗？","こんにちは、冒険者さん。私の背后にある繁茂する木のエネルギーを感じましたか？","Hello, DragonOwner. Are you feeling the flourishing vitality of wood glowing behind me?"],[200073,"Dialogue0081","Wood power?","木之能量？那是什么？","木のエネルギー？","Wood power?"],[200074,"Dialogue0082","Behind me is the mythical maze form by wood energy, explore and unravel the mysteries within!","这是一片由木之能量汇聚而成的迷阵，探索并解开其中的奥秘吧。","これは木のエネルギーが集まってできた迷宫です。探索してその中の谜を解き明かしてください。","Behind me is the mythical maze form by wood energy, explore and unravel the mysteries within!"],[200075,"Dialogue0083","Who are you?","你是谁？","あなたは谁ですか？","Who are you?"],[200076,"Dialogue0084","I am Fenia, the guardian of wood. Entrusted by this land to safeguard the flourishing power of wood element.","我是木元素智者，负责守护茂盛的木元素之力。","私は木の元素の贤者で、繁茂する木の元素の力を守る责任があります。","I am Fenia, the guardian of wood. Entrusted by this land to safeguard the flourishing power of wood element."],[200077,"Dialogue0085","Hello, adventurer. The resilient earth power is sealed behind me. Harness the force of gravity and break through this seal!","你好，冒险家。在我的身后封印着强大的土之能量，巧妙地运用重力，用你的龙之身躯冲破这层封印吧！","こんにちは、冒険者さん。私の背后には强力な土のエネルギーが封印されています。巧妙に重力を利用して、あなたのドラゴンの体でこの封印を破ってください！","Hello, adventurer. The resilient earth power is sealed behind me. Harness the force of gravity and break through this seal!"],[200078,"Dialogue0086","Gravity is the key?","重力才是关键？","重力が键ですか？","Gravity is the key?"],[200079,"Dialogue0087","The dragonblood flowing in your vein carrys powerful energy, use it and shatter the seal with gravity!","你的龙之身躯蕴涵强大的能量，重力能帮助其击碎坚硬的表面。","あなたのドラゴンの体には强力なエネルギーが宿っています。重力はそれが硬い表面を打ち砕くのに役立ちます。","The dragonblood flowing in your vein carrys powerful energy, use it and shatter the seal with gravity!"],[200080,"Dialogue0088","Who are you?","你是谁？","あなたは谁ですか？","Who are you?"],[200081,"Dialogue0089","I am Terrakus, the guardian of earth. Entrusted by this land to oversee the resilient power of earth element.","我是土元素智者泰瑞克斯，负责掌管坚硬的土元素之力。","私は土の元素の贤者、テリクスです。硬い土の元素の力を统べる责任があります。","I am Terrakus, the guardian of earth. Entrusted by this land to oversee the resilient power of earth element."],[200082,"Dialogue0090","Greetings, adventurer. From water emerges the mist, from mist forms the clouds; it is through parting the clouds that one may behold the sun.","你好，冒险家。水生雾，雾生云，拨云方可见日。","こんにちは、冒険者さん。怒り燃える炼狱が咆哮しています。それを浄化することが唯一の道です。","Greetings, adventurer. From water emerges the mist, from mist forms the clouds; it is through parting the clouds that one may behold the sun."],[200083,"Dialogue0091","And after the sun..?","拨云见日？","浄化とは？","And after the sun..?"],[200084,"Dialogue0092","The maze shall guide you, but first, conquer the mythical clouds. Remember the restraint of water and fire.","迷宫将引导你。但首先，你需要克服云之障碍。记住，水火乃相生相克之物。","この大陆では、火と水は相生相克の关系にあり、水の元素は火の元素を浄化する能力を持っています。その逆もまた然りです。","The maze shall guide you, but first, conquer the mythical clouds. Remember the restraint of water and fire."],[200085,"Dialogue0093","Who are you?","你是谁？","あなたは谁ですか？","Who are you?"],[200086,"Dialogue0094","I am Wendy, the guardian of water. The power of flowing water is gentle but yet profound, uncontrollable, only to be accommodated.","我是水元素智者温迪妮，流水之力轻柔但深邃，不可控制，只可顺应。","私は火の元素の贤者、エリアです。怒り燃える火の元素を统べ、制御します。","I am Wendy, the guardian of water. The power of flowing water is gentle but yet profound, uncontrollable, only to be accommodated."],[200087,"Dialogue0095","The raging power of infernal is roaring from the abyss, cleanse and purification will be the only way out!","你好，冒险家。愤怒的火之炼狱正在咆哮，净化它才是唯一的出路。","こんにちは、冒険者さん。水から生まれる雾、雾から生まれる云、云を払うことで初めて日が见えます。","The raging power of infernal is roaring from the abyss, cleanse and purification will be the only way out!"],[200088,"Dialogue0096","Cleanse? How?","何为凈化？","云を払うとは？","Cleanse? How?"],[200089,"Dialogue0097","In the land of Dragonverse, fire and water exist in the harmony of creation and restraint. Water cleanse fire, and vice versa.","在这片大陆，火与水相生相克，水元素拥有净化火元素的能力，相反亦是如此。","迷宫はあなたを导くでしょう。ただし、まず最初に云の障害を乗り越える必要があります。覚えておいてください、水と火は相生相克の关系にあります。","In the land of Dragonverse, fire and water exist in the harmony of creation and restraint. Water cleanse fire, and vice versa."],[200090,"Dialogue0098","Who are you?","你是谁？","あなたは谁ですか？","Who are you?"],[200091,"Dialogue0099","I am Elia, the guardian of fire. Entrusted by this land to contain the fiery power of fire element.","我是火元素智者艾莉娅，负责掌管并控制愤怒的火元素之力。","私は水の元素の贤者、ウェンディーニです。流水の力は柔らかいが深远で、制御できず、従うしかありません。","I am Elia, the guardian of fire. Entrusted by this land to contain the fiery power of fire element."],[200092,"Dialogue0100","Greetings new Dragonowner! Welcome to the land of Dragonverse Neo, before you start your journey, you might want to get familiar with some collectable items.","哟，新来的冒险家！欢迎来到DragonVerse Neo！在开始冒险之前，你最好先了解一下一些物品的使用方法哦。","やあ、新しい冒険者！DragonVerse Neoへようこそ！冒険を始める前に、いくつかのアイテムの使用方法を知っておくと良いですよ。","Greetings new Dragonowner! Welcome to the land of Dragonverse Neo, before you start your journey, you might want to get familiar with some collectable items."],[200093,"Dialogue0101","Items? Like what?","物品？比如呢？","アイテム？例えば？","Items? Like what?"],[200094,"Dialogue0102","Like Blue Snitch, designed to capture wild Modragons! and Pitaya as well, your Modragons loves Pitaya!","比如说Blue Snitch，这是这片大陆上独有的特产，你可以用它们来捕捉Modragon。当然还有火龙果，你的龙娘宝宝们可全靠它吃饱肚子！","たとえばBlue Snitch、これはこの大陆でしか手に入らない特产品で、Modragonを捕まえるために使用できます。もちろん、Fire Dragon Fruitもあります。あなたのドラゴンの子供たちはこれでお腹を満たします！","Like Blue Snitch, designed to capture wild Modragons! and Pitaya as well, your Modragons loves Pitaya!"],[200095,"Dialogue0103","Pitaya..?","火龙果又是啥。。","Fire Dragon Fruitって何ですか？","Pitaya..?"],[200096,"Dialogue0104","Those collectable red fruits are Pitaya, A delicate and juicy fruit, one of the favorite fruits of Modragons.","地上可采集的红色果实就是火龙果。果肉细腻无核，汁水丰盈，是野生Modragon最喜爱的果实之一。","地上で采取できる赤い果実がFire Dragon Fruitです。果肉は滑らかで种がなく、ジューシーで、野生のModragonのお気に入りの果物の一つです。","Those collectable red fruits are Pitaya, A delicate and juicy fruit, one of the favorite fruits of Modragons."],[200097,"Dialogue0105","Collect? How?","如何才能采集呢？","どうやって采取すればいいですか？","Collect? How?"],[200098,"Dialogue0106","Collectible items are usually floating items with light. Once you get close to them, the collect button will become available. Collect as many as you can!","可采集的物品通常会发光，靠近它们后采集的按钮就会自动出现，别忘记多留点备用哦！","采取できるアイテムは通常光っています。それに近づくと采取ボタンが自动的に表示されます。忘れずにストックしておいてくださいね！","Collectible items are usually floating items with light. Once you get close to them, the collect button will become available. Collect as many as you can!"],[200099,"Dialogue0107","Who are you?","你是谁？","あなたは谁ですか？","Who are you?"],[200100,"Dialogue0108","I am Ricky, master of collection in this land. gonna be a rough time for you around here if you don't know how to collect!","我是瑞奇，这片大陆的采集导师。不懂采集的话在这片大陆可是很难混的！","私はリッキー、この大陆の収获の导师です。この大陆でうまくやっていくには収获を知らないと难しいんだよ！","I am Ricky, master of collection in this land. gonna be a rough time for you around here if you don't know how to collect!"],[200101,"Dialogue0109","Dragonowner, Welcome to DragonVerse Neo! Go get a Modragon before you get too lonely during your journey, they are great companions!","哟，新来的冒险家！欢迎来到DragonVerse Neo！想不想拥有一只乖巧无比的龙娘跟着你到处跑呢？","やあ、新しい冒険者！DragonVerse Neoへようこそ！かわいらしいドラゴンのお嬢様があなたの后を追いかけるのはいかがですか？","Dragonowner, Welcome to DragonVerse Neo! Go get a Modragon before you get too lonely during your journey, they are great companions!"],[200102,"Dialogue0110","They don't bite...?","它不咬人吧。。","噛みつかないでしょうね…","They don't bite...?"],[200103,"Dialogue0111","Ofcourse not! Modragons are your essential companions along the journey, boxing them takes skills!","你别打岔！龙娘是你接下来冒险的必要伴侣，捉不捉得到全凭自己！","余计なお世话を言わないで！ドラゴンのお嬢様はあなたの冒険の必须の相棒です。捕まえるかどうかはあなた次第です！","Ofcourse not! Modragons are your essential companions along the journey, boxing them takes skills!"],[200104,"Dialogue0112","Box? How?","怎么捉它呢","どうやって捕まえるんですか？","Box? How?"],[200105,"Dialogue0113","Just use your capture controller, but make sure you have sufficient Blue Snitch in your bag.","利用你的捕捉操纵杆即可，不过首先你要确保你的背包里有Blue Snitch","捕获レバーを使用すれば简単ですが、まず最初にバックパックにBlue Snitchがあることを确认してください。","Just use your capture controller, but make sure you have sufficient Blue Snitch in your bag."],[200106,"Dialogue0114","Guaranteed?","100%捕捉？","100%捕获？","Guaranteed?"],[200107,"Dialogue0115","Not that easy, but if you wanna increase the odds, make sure you release your Blue Snitch in the \"perfect zone\". Also, it takes luck to box Modragons with tough personalities.","可没那么容易，想要提高你的捕捉成功率，你必须在完美区域释放你的Blue Snitch。性格不好的龙娘尤其难抓！","そう简単にはいきません。捕获の成功率を上げたい场合は、Blue Snitchを完璧なエリアで放出する必要があります。性格の悪いドラゴンのお嬢様は特に捕まえるのが难しいですよ！","Not that easy, but if you wanna increase the odds, make sure you release your Blue Snitch in the \"perfect zone\". Also, it takes luck to box Modragons with tough personalities."],[200108,"Dialogue0116","They could be.. stubborn?","性格？","性格？","They could be.. stubborn?"],[200109,"Dialogue0117","That's right, each Modragons has unique personality. Observe their personality in their name tag, helps you save your Blue Snitch for sure!","没错，每个龙娘都有自己的性格。多观察龙娘头顶的性格，不要浪费自己的Blue Snitch哦！","そうですね、それぞれのドラゴンのお嬢様には独自の性格があります。ドラゴンのお嬢様の头上の性格をよく観察し、Blue Snitchを无駄にしないようにしてくださいね！","That's right, each Modragons has unique personality. Observe their personality in their name tag, helps you save your Blue Snitch for sure!"],[200110,"Dialogue0118","Who are you?","你是谁？","あなたは谁ですか？","Who are you?"],[200111,"Dialogue0119","I am Selina, master of dragon in this land. Who will say NO to a cute Modragon, right?!","我是瑟琳娜，这片大陆的捕龙专家。谁会拒绝一个可爱的龙娘呢！","私はセリーナ、この大陆のドラゴンの専门家です。かわいいドラゴンのお嬢様を拒否する人はいませんよね！","I am Selina, master of dragon in this land. Who will say NO to a cute Modragon, right?!"],[200112,"Dialogue0120","And this time..we're gonna get funky!","接着奏乐，接着舞！","次は音楽を奏で、そして踊りましょう！","And this time..we're gonna get funky!"],[200113,"Dialogue0121","Dance? Damn!","还能跳舞？","踊ることもできますか？","Dance? Damn!"],[200114,"Dialogue0122","That's for sure! Just click \"emote\" and get funky with some sick moves!","那肯定！点击“动作交互”就可以和NPC一起跳舞啦！","もちろんです！「アクションインタラクション」をクリックすれば、NPCと一绪に踊ることができます！","That's for sure! Just click \"emote\" and get funky with some sick moves!"],[200115,"Dialogue0123","Who are you?","你是谁？","あなたは谁ですか？","Who are you?"],[200116,"Dialogue0124","I am Barbara, master of emote in this land.","我是芭芭拉，这片大陆的动作大师！","私はバーバラ、この大陆のアクションの达人です！","I am Barbara, master of emote in this land."],[200117,"Dialogue0125","Hello, Dragonowner. The dawn is upon us.. Governance and consensus shall impose new challenge ahead of you.","你好，冒险家。黎明将至。治理之力与共识将解锁新的挑战！","こんにちは、冒険者さん。夜明けが近づいています。ガバナンスの力とコミュニティの合意が新しい挑戦を解除します！","Hello, Dragonowner. The dawn is upon us.. Governance and consensus shall impose new challenge ahead of you."],[200118,"Dialogue0126","Governance?","治理之力？","ガバナンスの力？","Governance?"],[200119,"Dialogue0127","Cast your vote on Snapshot, the consensus of our community will unseal new game contents ahead of us.","前往Snapshot进行投票，聚集小区的共识方可解锁新的游戏内容。","Snapshotに投票して、コミュニティの合意を集めると新しいゲームコンテンツが解除されます。","Cast your vote on Snapshot, the consensus of our community will unseal new game contents ahead of us."],[300000,"CurrentRoomId","Room ID: {0}","房间ID：{0}","Room ID: {0}","Room ID: {0}"],[300001,"JumpGameFailed","Switch Room Failed!","切换房间失败！","Switch Room Failed!","Switch Room Failed!"],[300002,"SwitchRoomBtn","Switch room","切换房间","Switch room","Switch room"],[300003,"JumpRoomText001","Switch to a designated room","切换至指定房间","Switch to a designated room","Switch to a designated room"],[300004,"JumpRoomText002","Please enter the Room ID","请输入房间ID","Please enter the Room ID","Please enter the Room ID"],[300005,"SwitchRoomConfirm","Confirm","确定","Confirm","Confirm"],[300006,"RainbowText1","You Win！","你赢了！","You Win！","You Win！"],[300007,"RainbowText2","Game Over","游戏结束","Game Over","Game Over"],[300008,"RainbowText3","Level Count：","关卡计数：","Level Count：","Level Count："],[300009,"RainbowText4","Star Count：","获得星星：","Star Count：","Star Count："],[300010,"RainbowText5","Time：","时间：","Time：","Time："],[300011,"RainbowText6","Total Star","星星总数","Total Star","Total Star"],[300012,"RainbowText7","Return","返回","Return","Return"],[300013,"RainbowText8","Pass a level","跳过一关","Pass a level","Pass a level"],[300014,"RainbowText9","Shield","护盾","Shield","Shield"],[300015,"RainbowText10","Your game count is insufficient！","你的游戏次数不足！","Your game count is insufficient！","Your game count is insufficient！"],[300016,"RainbowText11","Do you want to spend a game count to enter the Rainbow Run？","是否消耗一点游戏次数，进入rainbow跑酷？","Do you want to spend a game count to enter the Rainbow Run？","Do you want to spend a game count to enter the Rainbow Run？"],[300017,"RainbowText12","Yes","是","Yes","Yes"],[300018,"RainbowText13","No","否","No","No"],[300019,"addInvincible_Success","Enabling shield successfully！","添加护盾成功！","Enabling shield successfully！","Enabling shield successfully！"],[300020,"addInvincible_Fail","Enabling shield failed！","添加护盾失败！","Enabling shield failed！","Enabling shield failed！"],[300021,"Invincible_End","Shield end！","护盾结束！","Shield end！","Shield end！"],[300022,"autoFindPath_Fail","Automatic pathfinding failed！","自动寻路失败！","Automatic pathfinding failed！","Automatic pathfinding failed！"],[300023,"ObbyEnterWithoutTicket","Due to not failing in the last game，you do not counsume any game attempts this time！","由于上次在跑酷关内未失败，此次进入不消耗游戏次数！","Due to not failing in the last game，you do not counsume any game attempts this time！","Due to not failing in the last game，you do not counsume any game attempts this time！"],[300024,"Maptext001","Royal Tower","皇家塔楼","Royal Tower","Royal Tower"],[300025,"Maptext002","Azure Shore","碧波湖畔","Azure Shore","Azure Shore"],[300026,"Maptext003","Mythical Wasteland","神秘废墟","Mythical Wasteland","Mythical Wasteland"],[300027,"Maptext004","Cow Level","奶牛关","Cow Level","Cow Level"],[300028,"Maptext005","Acient Abyss","远古遗迹","Acient Abyss","Acient Abyss"],[300029,"Tiptext001","Even the tides of fate can defeat the will of the coast","即使是命运的潮汐，也能击败海岸的意志","即使是命运的潮汐，也能击败海岸的意志","即使是命运的潮汐，也能击败海岸的意志"],[300030,"Tiptext002","The bell of the first snow is the sacred bell of the shrine","初雪的铃，乃是神祠的圣铃","初雪的铃，乃是神祠的圣铃","初雪的铃，乃是神祠的圣铃"],[300031,"Tiptext003","The heavens have a great furnace, and the earth produces five kinds of metals","天有洪炉，地生五金","天有洪炉，地生五金","天有洪炉，地生五金"],[300032,"Tiptext004","The disturbing wandering dust, the roar of the earth","纷扰的游尘，大地的怒吼","纷扰的游尘，大地的怒吼","纷扰的游尘，大地的怒吼"],[300033,"Tiptext005","May the power of the divine dragon guide you","愿神龙之力引领你","愿神龙之力引领你","愿神龙之力引领你"],[300034,"Tiptext006","The surging magical aura... Here is full of magical creations","涌动的魔力气息...这里充满了魔法造物","涌动的魔力气息...这里充满了魔法造物","涌动的魔力气息...这里充满了魔法造物"],[300035,"CatchMainKey","Boxing","捕捉","Boxing","Boxing"],[300036,"TalkMainKey","Chat","對話","Chat","Chat"],[300037,"CollectLanKey0001","Collect","採集","Collect","Collect"],[300038,"TransportMainKey","Enable","启动","Enable","Enable"],[300039,"Main_Scene_Name","Dragonverse neo","Dragonverse neo","Dragonverse neo","Dragonverse neo"],[300040,"Main_Scene_Name1","Alien Base","外星基地","外星基地","外星基地"],[300041,"Main_Scene_Name2","Forest Camp","森林营地","森林营地","森林营地"],[300042,"Main_Scene_Name3","Waste Sea","荒海","荒海","荒海"],[300043,"Main_Scene_Name4","Wilderness Frontier","荒野边疆","Wilderness Frontier","Wilderness Frontier"],[300044,"Main_Scene_Name5","Ruins of the Future","未来遗迹","未来遗迹","未来遗迹"],[300045,"Main_Scene_Name6","The Darkness","永眠之暗","The Darkness","The Darkness"],[300046,"Guide0001","The W S A D key controls the front, back, left and right","WSAD键控制前后左右","The W S A D key controls the front, back, left and right","The W S A D key controls the front, back, left and right"],[300047,"Guide0002","Hold down the Alt key to invoke the mouse","持续按住Alt键唤出鼠标","Hold down the Alt key to invoke the mouse","Hold down the Alt key to invoke the mouse"],[300048,"Guide0003","Hold down the Shift key to accelerate","持续按住Shift键加速","Hold down the Shift key to accelerate","Hold down the Shift key to accelerate"],[300049,"Guide0004","Spacebar controls jumping","空格键控制跳跃","Spacebar controls jumping","Spacebar controls jumping"],[300050,"Guide0005","Press the spacebar continuously to jump continuously","连续按空格键可以连续跳跃","Press the spacebar continuously to jump continuously","Press the spacebar continuously to jump continuously"],[300051,"TestAnimalName0001","Pig","粉猪","Pig","Pig"],[300052,"TestAnimalName0002","Cat","橘猫","Cat","Cat"],[300053,"TestAnimalName0003","Dog","狗狗","Dog","Dog"],[300054,"TestAnimalName0004","Rabbit","垂耳兔","Rabbit","Rabbit"],[300055,"Maptext006","DreamPet Odyssey","萌宠奥德赛","DreamPet Odyssey","DreamPet Odyssey"],[300056,"Maptext007","Infinity Rumble","无限乱斗","Infinity Rumble","Infinity Rumble"],[300057,"Maptext008","Glacial Realm","冰霜天池","Glacial Realm","Glacial Realm"],[300058,"Main_Scene_Name7","Forest de Sakura","樱之森","Forest de Sakura","Forest de Sakura"],[300059,"Main_Scene_Name8","Candy Paradise","糖果天堂","糖果天堂","糖果天堂"],[300060,"Main_Scene_Name9","Revulet Alley","河畔小巷","Revulet Alley","Revulet Alley"],[300061,"Main_Scene_Name10","Waterfall Crest","覆潮之下","Waterfall Crest","Waterfall Crest"],[300062,"Main_Scene_Name11","Paradise Nostalgia","梦幻乐园","Paradise Nostalgia","Paradise Nostalgia"],[300063,"Main_Scene_Name12","Whalefall","鲸落","Whalefall","Whalefall"],[300064,"Main_Scene_Name13","Wizard's Castle","巫师豪宅","Wizard's Castle","Wizard's Castle"],[300065,"Main_Scene_Name14","Recon Station","勘察站","Recon Station","Recon Station"],[300066,"Main_Scene_Name15","Noman's Land","无人边境","Noman's Land","Noman's Land"],[300067,"Main_Scene_Name16","Abandoned Land","遗弃之地","遗弃地","遗弃地"],[300068,"Main_Scene_Name17","The Common","寻常一角","The Common","The Common"],[300069,"Main_Scene_Name18","Crystal Cove","水晶洞穴","Crystal Cove","Crystal Cove"],[300070,"Main_Scene_Name19","Inferno Castle","炼狱城堡","Inferno Castle","Inferno Castle"],[300071,"Main_Scene_Name20","Tower Haute","高塔","Tower Haute","Tower Haute"],[300072,"Tiptext007","The statue illuminates magical aura, you feel drowsy, lulling into realms...","雕像散发出一股魔力，你感到昏昏欲睡","The statue illuminates magical aura, you feel drowsy, lulling into realms...","The statue illuminates magical aura, you feel drowsy, lulling into realms..."],[300073,"Maptext009","Dragon Pals REALMs ","龙娘领域","Dragon Pals REALMs ","Dragon Pals REALMs "],[300074,"hasNoDragonBall","Missing Blue Snitch!","缺少蓝色飞贼！神像拒绝了你！","Missing Blue Snitch!","Missing Blue Snitch!"],[300075,"Game_Setting001","Setting","设置","Setting","Setting"],[300076,"Game_Setting002","Sound","声音","Sound","Sound"],[300077,"Game_Setting003","Mute","静音","Mute","Mute"],[300078,"Game_Setting004","Lens Settings","镜头设置","Lens Settings","Lens Settings"],[300079,"Game_Setting005","Sensitivity","镜头灵敏度","Sensitivity","Sensitivity"],[300080,"Game_Setting006","Low","低","Low","Low"],[300081,"Game_Setting007","High","高","High","High"],[300082,"Online_shop001","Senzu Potion","仙豆","Senzu Potion","Senzu Potion"],[300083,"Online_shop002","Use in game to get stamina","在游戏中使用可获得体力","Use in game to get stamina","Use in game to get stamina"],[300084,"Online_shop003","Blue Snitch","蓝色飞贼","Blue Snitch","Blue Snitch"],[300085,"Online_shop004","Capture the Modragon in the bonus level","在奖励地图中捕获龙娘时使用","Capture the Modragon in the bonus level","Capture the Modragon in the bonus level"],[300086,"Online_shop005","Purchase","购买","Purchase","Purchase"],[300087,"Online_shop006","Total：","总计：","Total：","Total："],[300088,"Online_shop007","Available：","结余：","Available：","Available："],[300089,"Online_shop008","DragonVerse Shop","DragonVerse 商城","DragonVerse Shop","DragonVerse Shop"],[300090,"Online_shop009","Consume","使用","Consume","Consume"],[300091,"Online_shop010","Quantity: ","数量：","Quantity: ","Quantity: "],[300092,"Online_shop011","Consume a Senzu Potion to recover {0} stamina? ","确定消耗一瓶仙豆药水并回复{0}体力吗？","Consume a Senzu Potion to recover {0} stamina? ","Consume a Senzu Potion to recover {0} stamina? "],[300093,"Online_shop012","Confirm(E)","确认（E）","Confirm(E)","Confirm(E)"],[300094,"Online_shop013","Cancel(Esc)","取消（Esc）","Cancel(Esc)","Cancel(Esc)"],[300095,"Online_shop014","Confirming","确认中","Confirming","Confirming"],[300096,"BoxingDragonDescribe00001","Ever Waltz dances in the flames, resembling a dancing firebird.","烬舞在火焰中翩翩起舞，宛如一只舞动的火鸟。","Ever Waltz dances in the flames, resembling a dancing firebird.","Ever Waltz dances in the flames, resembling a dancing firebird."],[300097,"BoxingDragonDescribe00002","Molten Shine shimmers with a golden light in the flames, resembling a melting gold.","熔光在火焰中闪烁着金色的光芒，宛如一颗熔化的金子。","Molten Shine shimmers with a golden light in the flames, resembling a melting gold.","Molten Shine shimmers with a golden light in the flames, resembling a melting gold."],[300098,"BoxingDragonDescribe00003","Fiery Shadow burns in the blaze, resembling a raging flame.","炽影在烈火中燃烧，宛如一道熊熊的火焰。","Fiery Shadow burns in the blaze, resembling a raging flame.","Fiery Shadow burns in the blaze, resembling a raging flame."],[300099,"BoxingDragonDescribe00004","Swaying flames burn in the wind, resembling a fierce phoenix.","摇曳的火焰在风中燃烧，宛如一只烈焰的凤凰。","Swaying flames burn in the wind, resembling a fierce phoenix.","Swaying flames burn in the wind, resembling a fierce phoenix."],[300100,"BoxingDragonDescribe00005","Ember's flames flicker with a warm light, resembling a fiery heart.","笙桦的火焰闪烁着温暖的光芒，宛如一颗火热的心。","Ember's flames flicker with a warm light, resembling a fiery heart.","Ember's flames flicker with a warm light, resembling a fiery heart."],[300101,"BoxingDragonDescribe00006","Azure dances in the water, resembling a free-spirited dolphin.","蓝波在水中翩翩起舞，宛如一只自由自在的海豚。","Azure dances in the water, resembling a free-spirited dolphin.","Azure dances in the water, resembling a free-spirited dolphin."],[300102,"BoxingDragonDescribe00007","Frost floats in the water, resembling a pure white snowflake, emitting a fresh scent.","冰雪在水中漂浮，宛如一朵洁白的雪花，散发出清新的气息。","Frost floats in the water, resembling a pure white snowflake, emitting a fresh scent.","Frost floats in the water, resembling a pure white snowflake, emitting a fresh scent."],[300103,"BoxingDragonDescribe00008","Ripples ripple on the water's surface, resembling a calm lake, emitting a tranquil aura.","涟漪在水面上荡漾，宛如一面平静的湖泊，散发出宁静的气息。","Ripples ripple on the water's surface, resembling a calm lake, emitting a tranquil aura.","Ripples ripple on the water's surface, resembling a calm lake, emitting a tranquil aura."],[300104,"BoxingDragonDescribe00009","Aqua swims in the sea, resembling a mysterious dolphin, emitting a mysterious aura.","海影在海底中游动，宛如一只神秘的海豚，散发出神秘的气息。","Aqua swims in the sea, resembling a mysterious dolphin, emitting a mysterious aura.","Aqua swims in the sea, resembling a mysterious dolphin, emitting a mysterious aura."],[300105,"BoxingDragonDescribe00010","Glacier dances in the ice and snow, resembling an ice and snow goddess.","冰妃在冰雪中翩翩起舞，宛如一位冰雪女神。","Glacier dances in the ice and snow, resembling an ice and snow goddess.","Glacier dances in the ice and snow, resembling an ice and snow goddess."],[300106,"BoxingDragonDescribe00011","Sakura blossoms in the spring, resembling a pink sea.","樱林在春日里绽放，宛如一片粉色的海洋。","Sakura blossoms in the spring, resembling a pink sea.","Sakura blossoms in the spring, resembling a pink sea."],[300107,"BoxingDragonDescribe00012","Verdant grows on the earth, resembling a green forest.","翠影在大地上生长，宛如一片翠绿的森林。","Verdant grows on the earth, resembling a green forest.","Verdant grows on the earth, resembling a green forest."],[300108,"BoxingDragonDescribe00013","Sycamore sways in the wind, resembling a dancing butterfly.","梧韵在风中摇曳，宛如一只舞动的蝴蝶。","Sycamore sways in the wind, resembling a dancing butterfly.","Sycamore sways in the wind, resembling a dancing butterfly."],[300109,"BoxingDragonDescribe00014","Serenity grows quietly on the earth, resembling an elegant lady.","茶枝在大地上静谧生长，宛如一位优雅的贵妇。","Serenity grows quietly on the earth, resembling an elegant lady.","Serenity grows quietly on the earth, resembling an elegant lady."],[300110,"BoxingDragonDescribe00015","Whisper whispers in the spring breeze, resembling a shy peach blossom.","桃语在春风中低语，宛如一朵含羞的桃花。","Whisper whispers in the spring breeze, resembling a shy peach blossom.","Whisper whispers in the spring breeze, resembling a shy peach blossom."],[300111,"BoxingDragonDescribe00016","Ridge stands tall on the earth, resembling a majestic mountain peak.","沧峰耸立在大地上，宛如一座巍峨的山峰。","Ridge stands tall on the earth, resembling a majestic mountain peak.","Ridge stands tall on the earth, resembling a majestic mountain peak."],[300112,"BoxingDragonDescribe00017","Summit quietly grows on the earth, resembling a green sea.","翠谷静谧在大地上，宛如一片绿色的海洋。","Summit quietly grows on the earth, resembling a green sea.","Summit quietly grows on the earth, resembling a green sea."],[300113,"BoxingDragonDescribe00018","Domain is vast and boundless, resembling a golden land.","黄域广袤无垠，宛如一片金色的土地。","Domain is vast and boundless, resembling a golden land.","Domain is vast and boundless, resembling a golden land."],[300114,"BoxingDragonDescribe00019","Sprout grows on the earth, resembling a vibrant plant.","绿枝在大地上生长，宛如一株生机勃勃的植物。","Sprout grows on the earth, resembling a vibrant plant.","Sprout grows on the earth, resembling a vibrant plant."],[300115,"BoxingDragonDescribe00020","Stone is indestructible, resembling a solid fortress.","岩坡坚不可摧，宛如一座坚实的城堡。","Stone is indestructible, resembling a solid fortress.","Stone is indestructible, resembling a solid fortress."],[300116,"BoxingDragonDescribe00021","Blaze's flames burn with the colors of flowers, resembling a burning fireworks.","焚花的火焰燃烧着花朵的颜色，宛如一朵燃烧的花火。","Blaze's flames burn with the colors of flowers, resembling a burning fireworks.","Blaze's flames burn with the colors of flowers, resembling a burning fireworks."],[300117,"BoxingDragonDescribe00022","Inferno's flames burn with the color of the sun, resembling a crimson phoenix.","赤翼的火焰燃烧着烈日的颜色，宛如一只猩红的凤凰。","Inferno's flames burn with the color of the sun, resembling a crimson phoenix.","Inferno's flames burn with the color of the sun, resembling a crimson phoenix."],[300118,"BoxingDragonDescribe00023",null,null,null,null],[300119,"BoxingDragonDescribe00024",null,null,null,null],[300120,"BoxingDragonDescribe00025",null,null,null,null],[300121,"BoxingDragonDescribe00026","Springs flow through the mountains, resembling a clear stream, emitting a fresh aura.","清泉在山间流淌，宛如一条清澈的小溪，散发出清新的气息。","Springs flow through the mountains, resembling a clear stream, emitting a fresh aura.","Springs flow through the mountains, resembling a clear stream, emitting a fresh aura."],[300122,"BoxingDragonDescribe00027","Yu shimmers with a blue light in the water, resembling a gem-like presence.","蓝钰在水中闪烁着蓝色的光芒，宛如一颗宝石般的存在。","Yu shimmers with a blue light in the water, resembling a gem-like presence.","Yu shimmers with a blue light in the water, resembling a gem-like presence."],[300123,"BoxingDragonDescribe00028",null,null,null,null],[300124,"BoxingDragonDescribe00029",null,null,null,null],[300125,"BoxingDragonDescribe00030",null,null,null,null],[300126,"BoxingDragonDescribe00031","Wind blows through the mountains, resembling a fresh green sea.","竹风在山间吹拂，宛如一片清新的绿色海洋。","Wind blows through the mountains, resembling a fresh green sea.","Wind blows through the mountains, resembling a fresh green sea."],[300127,"BoxingDragonDescribe00032","Pine dances in the rain, resembling a melodious tune.","松雨在雨中婉转，宛如一首悠扬的乐曲。","Pine dances in the rain, resembling a melodious tune.","Pine dances in the rain, resembling a melodious tune."],[300128,"BoxingDragonDescribe00033",null,null,null,null],[300129,"BoxingDragonDescribe00034",null,null,null,null],[300130,"BoxingDragonDescribe00035",null,null,null,null],[300131,"BoxingDragonDescribe00036","Wings soar on the earth, resembling a free bird.","花翼在大地上翱翔，宛如一只自由自在的鸟儿。","Wings soar on the earth, resembling a free bird.","Wings soar on the earth, resembling a free bird."],[300132,"BoxingDragonDescribe00037","Mountains stand tall on the earth, resembling a magnificent mountain range.","青峦耸立在大地上，宛如一座壮丽的山脉。","Mountains stand tall on the earth, resembling a magnificent mountain range.","Mountains stand tall on the earth, resembling a magnificent mountain range."],[300133,"BoxingDragonDescribe00038",null,null,null,null],[300134,"BoxingDragonDescribe00039",null,null,null,null],[300135,"BoxingDragonDescribe00040",null,null,null,null],[300136,"BoxingDragonDescribe00041","In the glow of the evening sun, the brilliance of the sunset appears particularly splendid, like a beautiful scenic view.","在夕阳的余晖中，晚霞的光辉显得格外绚烂，宛如一道美丽的风景线。","In the glow of the evening sun, the brilliance of the sunset appears particularly splendid, like a beautiful scenic view.","In the glow of the evening sun, the brilliance of the sunset appears particularly splendid, like a beautiful scenic view."],[300137,"BoxingDragonDescribe00042","The light of the sun illuminates the earth, brightening people's hearts and bringing warmth and hope.","日曦之光照耀着大地，点亮了人们的心灵，带来了温暖和希望。\n","The light of the sun illuminates the earth, brightening people's hearts and bringing warmth and hope.","The light of the sun illuminates the earth, brightening people's hearts and bringing warmth and hope."],[300138,"BoxingDragonDescribe00043","Dancing with the clouds, Light · Dance moves gracefully with the wind, resembling a light and carefree cloud.","云舞随风起舞，宛如一朵白云，轻盈自如，令人陶醉。","Dancing with the clouds, Light · Dance moves gracefully with the wind, resembling a light and carefree cloud.","Dancing with the clouds, Light · Dance moves gracefully with the wind, resembling a light and carefree cloud."],[300139,"BoxingDragonDescribe00044","The morning light of Dawn illuminates the earth, bringing a new beginning and hope.","朝辉的光芒照亮了早晨的大地，给人带来了新的开始和希望。","The morning light of Dawn illuminates the earth, bringing a new beginning and hope.","The morning light of Dawn illuminates the earth, bringing a new beginning and hope."],[300140,"BoxingDragonDescribe00045","The silhouette of Light · Shadow appears and disappears in the light, like a mysterious phantom.","明影的身形在光芒中若隐若现，宛如一道神秘的幻影。","The silhouette of Light · Shadow appears and disappears in the light, like a mysterious phantom.","The silhouette of Light · Shadow appears and disappears in the light, like a mysterious phantom."],[300141,"BoxingDragonDescribe00046","The edge of Dark · Blade is extremely sharp, like a cold light in the darkness.","魄刃的锋芒锐利无比，宛如黑暗中的一抹寒光。","The edge of Dark · Blade is extremely sharp, like a cold light in the darkness.","The edge of Dark · Blade is extremely sharp, like a cold light in the darkness."],[300142,"BoxingDragonDescribe00047","Snow Shadow shimmers with a cold gaze in the darkness, like a lurking panther in the night.","雪影在黑暗中闪烁着冷酷的眼神，宛如一只潜伏在夜幕中的猎豹。","Snow Shadow shimmers with a cold gaze in the darkness, like a lurking panther in the night.","Snow Shadow shimmers with a cold gaze in the darkness, like a lurking panther in the night."],[300143,"BoxingDragonDescribe00048","Nightway exudes a deep aura, like a seductive flower blooming in the dark night.","夜薇散发出深邃的气息，宛如黑夜中的一朵妖艳的花朵。","Nightway exudes a deep aura, like a seductive flower blooming in the dark night.","Nightway exudes a deep aura, like a seductive flower blooming in the dark night."],[300144,"BoxingDragonDescribe00049","Dark · Wind drifts in the darkness, carrying a mysterious aura, resembling a fairy.","幽风在黑暗中飘荡，带着一丝神秘的气息，宛如一位仙子。","Dark · Wind drifts in the darkness, carrying a mysterious aura, resembling a fairy.","Dark · Wind drifts in the darkness, carrying a mysterious aura, resembling a fairy."],[300145,"BoxingDragonDescribe00050","Mingyue emits a deep light in the darkness, like a mysterious mirror.","冥月在黑暗中散发出幽深的光芒，宛如一面神秘的镜子。","Mingyue emits a deep light in the darkness, like a mysterious mirror.","Mingyue emits a deep light in the darkness, like a mysterious mirror."],[300146,"BoxingDragonDescribe00051","Bathed in the morning dew, Light · Cloud exudes a fresh scent, resembling a delicate elf.","云露在清晨的露珠中沐浴，散发出清新的气息，宛如一位精灵。 ","Bathed in the morning dew, Light · Cloud exudes a fresh scent, resembling a delicate elf.","Bathed in the morning dew, Light · Cloud exudes a fresh scent, resembling a delicate elf."],[300147,"BoxingDragonDescribe00052","The light of Break breaks through the darkness of night, heralding the arrival of a new day.","破晓的光芒冲破黑夜的束缚，宣告了新的一天的到来。","The light of Break breaks through the darkness of night, heralding the arrival of a new day.","The light of Break breaks through the darkness of night, heralding the arrival of a new day."],[300148,"BoxingDragonDescribe00053","Shadow Lotus emits a eerie aura in the darkness, like a mysterious black lotus.","影莲在黑暗中散发出诡异的气息，宛如一朵神秘的黑莲花。","Shadow Lotus emits a eerie aura in the darkness, like a mysterious black lotus.","Shadow Lotus emits a eerie aura in the darkness, like a mysterious black lotus."],[300149,"BoxingDragonDescribe00054","In the darkness, Ink Feather's wings flutter, resembling a mysterious swallow.","墨翎的翅膀在黑暗中飞舞，宛如一只神秘的燕子。","In the darkness, Ink Feather's wings flutter, resembling a mysterious swallow.","In the darkness, Ink Feather's wings flutter, resembling a mysterious swallow."],[300150,"Main_Scene_Name21","Adventure Island","冒险岛","冒险岛","冒险岛"],[300151,"Main_Scene_Name22","Mysterious Portal","神秘传送门","神秘传送门","神秘传送门"],[300152,"Main_Scene_Name23","Sky","天穹之上","天穹之上","天穹之上"],[300153,"Main_Scene_Name24","Deep Forest","林中深处","林中深处","林中深处"],[300154,"Main_Scene_Name25","Modragon Cave","龙娘洞窟","龙娘洞窟","龙娘洞窟"],[300155,"Main_Scene_Name26","Spirits Palace","木灵宫殿","木灵宫殿","木灵宫殿"],[300156,"Main_Scene_Name27","City of Water","水之城都","水之城都","水之城都"],[300157,"Main_Scene_Name28","Tomb","陵墓","陵墓","陵墓"],[300158,"Main_Scene_Name29","Ghost City","幽灵城","幽灵城","幽灵城"],[300159,"Main_Scene_Name30","Secret Garden","秘密花园","秘密花园","秘密花园"],[300160,"Main_Scene_Name31","Adventure Town","冒险小镇","冒险小镇","冒险小镇"],[300161,"Main_Scene_Name32","Rock Altar","岩石神坛","岩石神坛","岩石神坛"],[300162,"Main_Scene_Name33","Fertile Island","丰裕岛","丰裕岛","丰裕岛"],[300163,"Main_Scene_Name34","Demon City","恶魔城","恶魔城","恶魔城"],[300164,"Maptext010","TD","塔防游戏","塔防游戏","塔防游戏"]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**名称*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**测试000001*/
	get TestLanguageKey000001():ILanguageElement{return this.getElement(1)};
	/**测试质量*/
	get TestQualityName0001():ILanguageElement{return this.getElement(2)};
	/**测试背包物品*/
	get TestBagItemName0001():ILanguageElement{return this.getElement(3)};
	/**测试背包描述测试背包描述测试背包描述测试背包描述测试背包描述*/
	get TestBagItemDesc0001():ILanguageElement{return this.getElement(4)};
	/**测试区域*/
	get TestAreaName0001():ILanguageElement{return this.getElement(5)};
	/**欢迎来到Dragonverse Neo，成为这里的一员！*/
	get Dialogue0001():ILanguageElement{return this.getElement(6)};
	/**Dragonverse Neo是个怎么样的世界？*/
	get Dialogue0002():ILanguageElement{return this.getElement(7)};
	/**Dragonverse Neo是一个全新的充满乐趣的世界，你可以在这个世界中探索、发现、创造属于你的一切！*/
	get Dialogue0003():ILanguageElement{return this.getElement(8)};
	/**我要怎么体验Dragonverse Neo？*/
	get Dialogue0004():ILanguageElement{return this.getElement(9)};
	/**输入你的Code即可立马体验，还没拥有Code？立即前往Landing Page获取！*/
	get Dialogue0005():ILanguageElement{return this.getElement(10)};
	/**Code在手，我要出去*/
	get Dialogue0006():ILanguageElement{return this.getElement(11)};
	/**我还没有Code，哪里获取*/
	get Dialogue0007():ILanguageElement{return this.getElement(12)};
	/**验证···成功！恭喜你可以走出新手村落，尽情探索Dragonverse Neo吧~*/
	get Dialogue0008():ILanguageElement{return this.getElement(13)};
	/**蓝色飞贼*/
	get BagItemName0001():ILanguageElement{return this.getElement(14)};
	/**火龙果*/
	get BagItemName0002():ILanguageElement{return this.getElement(15)};
	/**金币*/
	get BagItemName0003():ILanguageElement{return this.getElement(16)};
	/**按下开关便可以捕捉Dragon，并封装在内的位面球。*/
	get BagItemDesc0001():ILanguageElement{return this.getElement(17)};
	/**果肉细腻无核，汁水丰盈，是野生Dragon最喜爱的果实之一。*/
	get BagItemDesc0002():ILanguageElement{return this.getElement(18)};
	/**从遥远的星空落下的神奇货币，看起来是很贵重的物品。*/
	get BagItemDesc0003():ILanguageElement{return this.getElement(19)};
	/**机警的*/
	get DragonCharacter0001():ILanguageElement{return this.getElement(20)};
	/**暴躁的*/
	get DragonCharacter0002():ILanguageElement{return this.getElement(21)};
	/**胆小的*/
	get DragonCharacter0003():ILanguageElement{return this.getElement(22)};
	/**易怒的*/
	get DragonCharacter0004():ILanguageElement{return this.getElement(23)};
	/**温和的*/
	get DragonCharacter0005():ILanguageElement{return this.getElement(24)};
	/**火焰龙娘*/
	get DragonName00001():ILanguageElement{return this.getElement(25)};
	/**水浪龙娘*/
	get DragonName00002():ILanguageElement{return this.getElement(26)};
	/**木槿龙少*/
	get DragonName00003():ILanguageElement{return this.getElement(27)};
	/**岩石龙娘*/
	get DragonName00004():ILanguageElement{return this.getElement(28)};
	/**炼狱龙娘*/
	get DragonName00005():ILanguageElement{return this.getElement(29)};
	/**海洋龙娘*/
	get DragonName00006():ILanguageElement{return this.getElement(30)};
	/**森林龙娘*/
	get DragonName00007():ILanguageElement{return this.getElement(31)};
	/**山脉龙娘*/
	get DragonName00008():ILanguageElement{return this.getElement(32)};
	/**圣光龙娘*/
	get DragonName00009():ILanguageElement{return this.getElement(33)};
	/**暗影龙娘*/
	get DragonName00010():ILanguageElement{return this.getElement(34)};
	/**普通*/
	get QualityName0001():ILanguageElement{return this.getElement(35)};
	/**良好*/
	get QualityName0002():ILanguageElement{return this.getElement(36)};
	/**优秀*/
	get QualityName0003():ILanguageElement{return this.getElement(37)};
	/**稀有*/
	get QualityName0004():ILanguageElement{return this.getElement(38)};
	/**史诗*/
	get QualityName0005():ILanguageElement{return this.getElement(39)};
	/**传说*/
	get QualityName0006():ILanguageElement{return this.getElement(40)};
	/**火*/
	get ElementalName0001():ILanguageElement{return this.getElement(41)};
	/**水*/
	get ElementalName0002():ILanguageElement{return this.getElement(42)};
	/**木*/
	get ElementalName0003():ILanguageElement{return this.getElement(43)};
	/**土*/
	get ElementalName0004():ILanguageElement{return this.getElement(44)};
	/**光*/
	get ElementalName0005():ILanguageElement{return this.getElement(45)};
	/**暗*/
	get ElementalName0006():ILanguageElement{return this.getElement(46)};
	/**新手导师 · 奥利弗*/
	get CharacterName0001():ILanguageElement{return this.getElement(100101)};
	/**采集导师 · 瑞奇*/
	get CharacterName0002():ILanguageElement{return this.getElement(100102)};
	/**捕龙专家 · 瑟琳娜*/
	get CharacterName0003():ILanguageElement{return this.getElement(100103)};
	/**舞者 · 芭芭拉*/
	get CharacterName0004():ILanguageElement{return this.getElement(100104)};
	/**木元素智者 · 芬尼亚*/
	get CharacterName0005():ILanguageElement{return this.getElement(100105)};
	/**土元素智者 · 泰瑞克斯*/
	get CharacterName0006():ILanguageElement{return this.getElement(100106)};
	/**水元素智者 · 温迪妮*/
	get CharacterName0007():ILanguageElement{return this.getElement(100107)};
	/**火元素智者 · 艾莉娅*/
	get CharacterName0008():ILanguageElement{return this.getElement(100108)};
	/**神秘人*/
	get CharacterName0009():ILanguageElement{return this.getElement(100109)};
	/**木元素图腾*/
	get CharacterName0010():ILanguageElement{return this.getElement(100110)};
	/**土元素图腾*/
	get CharacterName0011():ILanguageElement{return this.getElement(100111)};
	/**火元素图腾*/
	get CharacterName0012():ILanguageElement{return this.getElement(100112)};
	/**水元素图腾*/
	get CharacterName0013():ILanguageElement{return this.getElement(100113)};
	/**龙吟村*/
	get AreaName0001():ILanguageElement{return this.getElement(100201)};
	/**出生点*/
	get AreaName0002():ILanguageElement{return this.getElement(100202)};
	/**碧波湖畔*/
	get AreaName0003():ILanguageElement{return this.getElement(100203)};
	/**远古遗迹*/
	get AreaName0004():ILanguageElement{return this.getElement(100204)};
	/**神秘废墟*/
	get AreaName0005():ILanguageElement{return this.getElement(100205)};
	/**冰霜天池*/
	get AreaName0006():ILanguageElement{return this.getElement(100206)};
	/**对话*/
	get CharacterInteract0001():ILanguageElement{return this.getElement(101001)};
	/**动作交互*/
	get CharacterInteract0002():ILanguageElement{return this.getElement(101002)};
	/**小陀螺*/
	get Danmu_Content_3129():ILanguageElement{return this.getElement(102129)};
	/**倒立旋转*/
	get Danmu_Content_3130():ILanguageElement{return this.getElement(102130)};
	/**芭蕾*/
	get Danmu_Content_3131():ILanguageElement{return this.getElement(102131)};
	/**街舞*/
	get Danmu_Content_3132():ILanguageElement{return this.getElement(102132)};
	/**机械舞*/
	get Danmu_Content_3133():ILanguageElement{return this.getElement(102133)};
	/**鬼步舞*/
	get Danmu_Content_3134():ILanguageElement{return this.getElement(102134)};
	/**迈克尔*/
	get Danmu_Content_3135():ILanguageElement{return this.getElement(102135)};
	/**现代舞*/
	get Danmu_Content_3136():ILanguageElement{return this.getElement(102136)};
	/**团舞*/
	get Danmu_Content_3137():ILanguageElement{return this.getElement(102137)};
	/**比心*/
	get Danmu_Content_3138():ILanguageElement{return this.getElement(102138)};
	/**搂肩*/
	get Danmu_Content_3139():ILanguageElement{return this.getElement(102139)};
	/**欢呼*/
	get Danmu_Content_3140():ILanguageElement{return this.getElement(102140)};
	/**不服气*/
	get Danmu_Content_3141():ILanguageElement{return this.getElement(102141)};
	/**两只老虎*/
	get Danmu_Content_3142():ILanguageElement{return this.getElement(102142)};
	/**PPAP*/
	get Danmu_Content_3143():ILanguageElement{return this.getElement(102143)};
	/**鼓掌*/
	get Danmu_Content_3144():ILanguageElement{return this.getElement(102144)};
	/**行礼*/
	get Danmu_Content_3145():ILanguageElement{return this.getElement(102145)};
	/**挥手*/
	get Danmu_Content_3146():ILanguageElement{return this.getElement(102146)};
	/**点赞*/
	get Danmu_Content_3147():ILanguageElement{return this.getElement(102147)};
	/**飞吻*/
	get Danmu_Content_3148():ILanguageElement{return this.getElement(102148)};
	/**生气*/
	get Danmu_Content_3149():ILanguageElement{return this.getElement(102149)};
	/**比心*/
	get Danmu_Content_3150():ILanguageElement{return this.getElement(102150)};
	/**摇头*/
	get Danmu_Content_3151():ILanguageElement{return this.getElement(102151)};
	/**哭泣*/
	get Danmu_Content_3152():ILanguageElement{return this.getElement(102152)};
	/**拥抱*/
	get Danmu_Content_3153():ILanguageElement{return this.getElement(102153)};
	/**双人舞*/
	get Danmu_Content_3154():ILanguageElement{return this.getElement(102154)};
	/**打招呼*/
	get Danmu_Content_3155():ILanguageElement{return this.getElement(102155)};
	/**迈克尔*/
	get Danmu_Content_3156():ILanguageElement{return this.getElement(102156)};
	/**过肩摔*/
	get Danmu_Content_3157():ILanguageElement{return this.getElement(102157)};
	/**需要*元素龙才能解开该法阵*/
	get Dragontip_Content_0001():ILanguageElement{return this.getElement(102158)};
	/**需要召唤出火焰龙娘才能解锁该法阵*/
	get Need_FireDargon():ILanguageElement{return this.getElement(102159)};
	/**获得金币奖励*/
	get Obby_GoldReward():ILanguageElement{return this.getElement(103001)};
	/**不能触碰到红色*/
	get Obby_RedTips():ILanguageElement{return this.getElement(103002)};
	/**Level*/
	get Obby_CheckPoint_001():ILanguageElement{return this.getElement(103003)};
	/**关*/
	get Obby_CheckPoint_002():ILanguageElement{return this.getElement(103004)};
	/**自动寻路*/
	get Obby_item_001():ILanguageElement{return this.getElement(103005)};
	/**护盾*/
	get Obby_item_002():ILanguageElement{return this.getElement(103006)};
	/**背包*/
	get Bag_001():ILanguageElement{return this.getElement(105001)};
	/**龙娘*/
	get Bag_002():ILanguageElement{return this.getElement(105002)};
	/**物品*/
	get Bag_003():ILanguageElement{return this.getElement(105003)};
	/**召唤*/
	get Bag_004():ILanguageElement{return this.getElement(105004)};
	/**休息*/
	get Bag_005():ILanguageElement{return this.getElement(105005)};
	/**数量*/
	get Bag_006():ILanguageElement{return this.getElement(105006)};
	/**点我复位*/
	get Reset_001():ILanguageElement{return this.getElement(105051)};
	/**开始采集*/
	get Collection_001():ILanguageElement{return this.getElement(105101)};
	/**采集成功*/
	get Collection_002():ILanguageElement{return this.getElement(105102)};
	/**采集失败*/
	get Collection_003():ILanguageElement{return this.getElement(105103)};
	/**开始捕捉*/
	get Catch_001():ILanguageElement{return this.getElement(105201)};
	/**捕捉成功*/
	get Catch_002():ILanguageElement{return this.getElement(105202)};
	/**捕捉失败*/
	get Catch_003():ILanguageElement{return this.getElement(105203)};
	/**您的Blue Snitch不足，无法捕捉。*/
	get Catch_004():ILanguageElement{return this.getElement(105204)};
	/**完美的*/
	get Catch_005():ILanguageElement{return this.getElement(105205)};
	/**一般的*/
	get Catch_006():ILanguageElement{return this.getElement(105206)};
	/**尊敬的MOBOX小区：*/
	get Code001():ILanguageElement{return this.getElement(105301)};
	/**在下方输入您的Dragonkey验证码即可开始探索Dragonverse Neo删档内测的完整内容:*/
	get Code002():ILanguageElement{return this.getElement(105302)};
	/**输入验证码*/
	get Code003():ILanguageElement{return this.getElement(105303)};
	/**验证*/
	get Code004():ILanguageElement{return this.getElement(105304)};
	/**验证过于频繁，请稍候再试*/
	get verifyCodeTooFrequently():ILanguageElement{return this.getElement(105305)};
	/**验证失败，请检查验证码*/
	get verifyCodeFail():ILanguageElement{return this.getElement(105306)};
	/**验证成功*/
	get verifyCodeSuccess():ILanguageElement{return this.getElement(105307)};
	/**验证中，请稍候*/
	get isVerifying():ILanguageElement{return this.getElement(105308)};
	/**设置*/
	get Setting001():ILanguageElement{return this.getElement(105401)};
	/**修改昵称*/
	get Setting002():ILanguageElement{return this.getElement(105402)};
	/**多语言*/
	get Setting003():ILanguageElement{return this.getElement(105403)};
	/**验证*/
	get Setting004():ILanguageElement{return this.getElement(105404)};
	/**注销*/
	get Setting005():ILanguageElement{return this.getElement(105405)};
	/**修改形象*/
	get Setting006():ILanguageElement{return this.getElement(105406)};
	/**你的昵称*/
	get Setting007():ILanguageElement{return this.getElement(105407)};
	/**拾取*/
	get TinyGameLanKey0001():ILanguageElement{return this.getElement(105501)};
	/**放下*/
	get TinyGameLanKey0002():ILanguageElement{return this.getElement(105502)};
	/**火球术*/
	get TinyGameLanKey0003():ILanguageElement{return this.getElement(105503)};
	/**恭喜通关小游戏，请在背包中查收奖励*/
	get TinyGameLanKey0004():ILanguageElement{return this.getElement(105504)};
	/**火焰般的符文在柱子上跳动，散发出炙热的氛围。*/
	get FireMonolithTips001():ILanguageElement{return this.getElement(105505)};
	/**流水般的图案在这根柱子上流动，带来清凉的感觉。*/
	get WaterMonolithTips002():ILanguageElement{return this.getElement(105506)};
	/**这根柱子上刻满了树木和生命的图腾，散发着清新的自然气息。*/
	get WoodMonolithTips003():ILanguageElement{return this.getElement(105507)};
	/**巨石纹路在这根柱子上交错，仿佛感受到大地的沉稳力量。*/
	get EarthMonolithTips004():ILanguageElement{return this.getElement(105508)};
	/**火·烬舞*/
	get BoxingDragonName00001():ILanguageElement{return this.getElement(105601)};
	/**火·熔光*/
	get BoxingDragonName00002():ILanguageElement{return this.getElement(105602)};
	/**火·炽影*/
	get BoxingDragonName00003():ILanguageElement{return this.getElement(105603)};
	/**火·摇曳*/
	get BoxingDragonName00004():ILanguageElement{return this.getElement(105604)};
	/**火·笙桦*/
	get BoxingDragonName00005():ILanguageElement{return this.getElement(105605)};
	/**水·蓝波*/
	get BoxingDragonName00006():ILanguageElement{return this.getElement(105606)};
	/**水·冰雪*/
	get BoxingDragonName00007():ILanguageElement{return this.getElement(105607)};
	/**水·涟漪*/
	get BoxingDragonName00008():ILanguageElement{return this.getElement(105608)};
	/**水·海影*/
	get BoxingDragonName00009():ILanguageElement{return this.getElement(105609)};
	/**水·冰妃*/
	get BoxingDragonName00010():ILanguageElement{return this.getElement(105610)};
	/**木·樱林*/
	get BoxingDragonName00011():ILanguageElement{return this.getElement(105611)};
	/**木·翠影*/
	get BoxingDragonName00012():ILanguageElement{return this.getElement(105612)};
	/**木·梧韵*/
	get BoxingDragonName00013():ILanguageElement{return this.getElement(105613)};
	/**木·茶枝*/
	get BoxingDragonName00014():ILanguageElement{return this.getElement(105614)};
	/**木·桃语*/
	get BoxingDragonName00015():ILanguageElement{return this.getElement(105615)};
	/**土·沧峰*/
	get BoxingDragonName00016():ILanguageElement{return this.getElement(105616)};
	/**土·翠谷*/
	get BoxingDragonName00017():ILanguageElement{return this.getElement(105617)};
	/**土·黄域*/
	get BoxingDragonName00018():ILanguageElement{return this.getElement(105618)};
	/**土·绿枝*/
	get BoxingDragonName00019():ILanguageElement{return this.getElement(105619)};
	/**土·岩坡*/
	get BoxingDragonName00020():ILanguageElement{return this.getElement(105620)};
	/**火·焚花*/
	get BoxingDragonName00021():ILanguageElement{return this.getElement(105621)};
	/**火·赤翼*/
	get BoxingDragonName00022():ILanguageElement{return this.getElement(105622)};
	/**胆小的炼狱龙娘*/
	get BoxingDragonName00023():ILanguageElement{return this.getElement(105623)};
	/**易怒的炼狱龙娘*/
	get BoxingDragonName00024():ILanguageElement{return this.getElement(105624)};
	/**温和的炼狱龙娘*/
	get BoxingDragonName00025():ILanguageElement{return this.getElement(105625)};
	/**水·清泉*/
	get BoxingDragonName00026():ILanguageElement{return this.getElement(105626)};
	/**水·蓝钰*/
	get BoxingDragonName00027():ILanguageElement{return this.getElement(105627)};
	/**胆小的海洋龙娘*/
	get BoxingDragonName00028():ILanguageElement{return this.getElement(105628)};
	/**易怒的海洋龙娘*/
	get BoxingDragonName00029():ILanguageElement{return this.getElement(105629)};
	/**温和的海洋龙娘*/
	get BoxingDragonName00030():ILanguageElement{return this.getElement(105630)};
	/**木·竹风*/
	get BoxingDragonName00031():ILanguageElement{return this.getElement(105631)};
	/**木·松雨*/
	get BoxingDragonName00032():ILanguageElement{return this.getElement(105632)};
	/**胆小的森林龙娘*/
	get BoxingDragonName00033():ILanguageElement{return this.getElement(105633)};
	/**易怒的森林龙娘*/
	get BoxingDragonName00034():ILanguageElement{return this.getElement(105634)};
	/**温和的森林龙娘*/
	get BoxingDragonName00035():ILanguageElement{return this.getElement(105635)};
	/**土·花翼*/
	get BoxingDragonName00036():ILanguageElement{return this.getElement(105636)};
	/**土·青峦*/
	get BoxingDragonName00037():ILanguageElement{return this.getElement(105637)};
	/**胆小的山脉龙娘*/
	get BoxingDragonName00038():ILanguageElement{return this.getElement(105638)};
	/**易怒的山脉龙娘*/
	get BoxingDragonName00039():ILanguageElement{return this.getElement(105639)};
	/**温和的山脉龙娘*/
	get BoxingDragonName00040():ILanguageElement{return this.getElement(105640)};
	/**光·晚霞*/
	get BoxingDragonName00041():ILanguageElement{return this.getElement(105641)};
	/**光·日曦*/
	get BoxingDragonName00042():ILanguageElement{return this.getElement(105642)};
	/**光·云舞*/
	get BoxingDragonName00043():ILanguageElement{return this.getElement(105643)};
	/**光·朝辉*/
	get BoxingDragonName00044():ILanguageElement{return this.getElement(105644)};
	/**光·明影*/
	get BoxingDragonName00045():ILanguageElement{return this.getElement(105645)};
	/**暗·魄刃*/
	get BoxingDragonName00046():ILanguageElement{return this.getElement(105646)};
	/**暗·雪影*/
	get BoxingDragonName00047():ILanguageElement{return this.getElement(105647)};
	/**暗·夜薇*/
	get BoxingDragonName00048():ILanguageElement{return this.getElement(105648)};
	/**暗·幽风*/
	get BoxingDragonName00049():ILanguageElement{return this.getElement(105649)};
	/**暗·冥月*/
	get BoxingDragonName00050():ILanguageElement{return this.getElement(105650)};
	/**光·云露*/
	get BoxingDragonName00051():ILanguageElement{return this.getElement(105651)};
	/**光·破晓*/
	get BoxingDragonName00052():ILanguageElement{return this.getElement(105652)};
	/**暗·影莲*/
	get BoxingDragonName00053():ILanguageElement{return this.getElement(105653)};
	/**暗·墨翎*/
	get BoxingDragonName00054():ILanguageElement{return this.getElement(105654)};
	/**木头*/
	get HomeResourcesName0001():ILanguageElement{return this.getElement(105701)};
	/**石头*/
	get HomeResourcesName0002():ILanguageElement{return this.getElement(105702)};
	/**黑铁*/
	get HomeResourcesName0003():ILanguageElement{return this.getElement(105703)};
	/**黄铜*/
	get HomeResourcesName0004():ILanguageElement{return this.getElement(105704)};
	/**可以在家园玩法中消耗，用于建造家园*/
	get HomeResourcesDesc0001():ILanguageElement{return this.getElement(105801)};
	/**可以在家园玩法中消耗，用于建造家园*/
	get HomeResourcesDesc0002():ILanguageElement{return this.getElement(105802)};
	/**可以在家园玩法中消耗，用于建造家园*/
	get HomeResourcesDesc0003():ILanguageElement{return this.getElement(105803)};
	/**可以在家园玩法中消耗，用于建造家园*/
	get HomeResourcesDesc0004():ILanguageElement{return this.getElement(105804)};
	/**这附近有什么有趣的东西吗？*/
	get Dialogue0009():ILanguageElement{return this.getElement(200001)};
	/**哟，新来的冒险家！欢迎来到Dragonverse Neo，这里可是个充满奇妙的世界。看到地上那些五光十色的物体了吗？那可是我们这里的宝贝Blue Snitch。*/
	get Dialogue0010():ILanguageElement{return this.getElement(200002)};
	/**Blue Snitch？很厉害的样子？*/
	get Dialogue0011():ILanguageElement{return this.getElement(200003)};
	/**没错！Blue Snitch是这片大陆上独有的特产。你可以用它们来捕捉Modragon，也能用来合成一些有趣的东西。来，我教你如何辨认Blue Snitch。*/
	get Dialogue0012():ILanguageElement{return this.getElement(200004)};
	/**这些Blue Snitch有不同的颜色和纹理，代表着它们的不同稀有度，越稀有的Blue Snitch捕获成功率越高。*/
	get Dialogue0013():ILanguageElement{return this.getElement(200005)};
	/**我要如何获得Blue Snitch呢？*/
	get Dialogue0014():ILanguageElement{return this.getElement(200006)};
	/**对准它们，按下采集按钮，就能轻松采集到手。*/
	get Dialogue0015():ILanguageElement{return this.getElement(200007)};
	/**原来如此，那边的红色果实又是什么，可以吃吗？*/
	get Dialogue0016():ILanguageElement{return this.getElement(200008)};
	/**那是我们的火龙果。果肉细腻无核，汁水丰盈，是野生Modragon最喜爱的果实之一。要采集火龙果，只需走到果树下，按下采集按钮即可。*/
	get Dialogue0017():ILanguageElement{return this.getElement(200009)};
	/**火龙果听起来好好吃啊！*/
	get Dialogue0018():ILanguageElement{return this.getElement(200010)};
	/**是的，不仅好吃，而且还是一些合成材料的重要组成部分。收集一些火龙果，它们可能对你未来的冒险起到帮助。*/
	get Dialogue0019():ILanguageElement{return this.getElement(200011)};
	/**还有一种采集物我要介绍给你，那就是金币。*/
	get Dialogue0020():ILanguageElement{return this.getElement(200012)};
	/**金币？这也是一种采集物吗？*/
	get Dialogue0021():ILanguageElement{return this.getElement(200013)};
	/**在我们的Dragonverse Neo中，金币是一种非常重要的资源。它们从遥远的星空落下，是很贵重的物品。你可以使用它与其他冒险家交易、购买物品，甚至用来合成一些珍贵的道具。*/
	get Dialogue0022():ILanguageElement{return this.getElement(200014)};
	/**原来天上掉金币这种事是真的会发生啊！*/
	get Dialogue0023():ILanguageElement{return this.getElement(200015)};
	/**仅此一家，也只有在Dragonverse Neo中你才能体会到这种乐趣了！去吧，尝试着采集一些Blue Snitch,火龙果和金币吧。*/
	get Dialogue0024():ILanguageElement{return this.getElement(200016)};
	/**嘿，新冒险者，听说你已经掌握了采集的技巧，那么是不是也想要拥有属于自己的小伙伴Modragon呢？*/
	get Dialogue0025():ILanguageElement{return this.getElement(200017)};
	/**来都来了，肯定要搞一只吧。*/
	get Dialogue0026():ILanguageElement{return this.getElement(200018)};
	/**你倒是很坦诚嘛！其实，只需要使用Blue Snitch就可以捕捉到属于你的Dragon了。先来了解一下如何使用Blue Snitch吧。*/
	get Dialogue0027():ILanguageElement{return this.getElement(200019)};
	/**看到这颗Blue Snitch了吗？你可以通过Modragon捕获面板的操纵杆，选择它，然后投掷到想要捕捉的Modragon附近。不过，这可不是一件简单的事情，每个Modragon都有自己的个性。*/
	get Dialogue0028():ILanguageElement{return this.getElement(200020)};
	/**个性？*/
	get Dialogue0029():ILanguageElement{return this.getElement(200021)};
	/**没错，每个Dragon都有五种个性，包括机警的、暴躁的、胆小的、易怒的、温和的。而且，它们的个性还会影响到捕捉的难度。所以在捕捉之前，最好先了解一下你要捕捉的Modragon的个性。*/
	get Dialogue0030():ILanguageElement{return this.getElement(200022)};
	/**原来如此，我要怎么了解它们的个性呢？*/
	get Dialogue0031():ILanguageElement{return this.getElement(200023)};
	/**很简单，你只需要观察Modragon头上的名称和颜色，他们会提示你这只Modragon的个性；总之，多观察，你就能熟知它们的个性。*/
	get Dialogue0032():ILanguageElement{return this.getElement(200024)};
	/**听上去很简单的样子。*/
	get Dialogue0033():ILanguageElement{return this.getElement(200025)};
	/**那当然了，没有大家说的那么难！*/
	get Dialogue0034():ILanguageElement{return this.getElement(200026)};
	/**我在说反话你听不出来吗？*/
	get Dialogue0035():ILanguageElement{return this.getElement(200027)};
	/**……，别在这阴阳怪气了，我破例传授你一个投掷诀窍，可以很好的提高你的捕获概率。*/
	get Dialogue0036():ILanguageElement{return this.getElement(200028)};
	/**说来听听。*/
	get Dialogue0037():ILanguageElement{return this.getElement(200029)};
	/**记住，力度是关键，投掷的瞬间，如果力度指示器指标刚好摆动到最高档力度区间（力度指示器中间最窄的那一档），就能够大大的提高捕获的成功率哦。*/
	get Dialogue0038():ILanguageElement{return this.getElement(200030)};
	/**还有这种操作？你不会只告诉我一个人吧？*/
	get Dialogue0039():ILanguageElement{return this.getElement(200031)};
	/**...... 赶紧去试试吧，记得多捕捉一些Dragon，它们会成为你在Dragonverse Neo中的得力助手。*/
	get Dialogue0040():ILanguageElement{return this.getElement(200032)};
	/**Yo，新来的小伙伴！欢迎来到Dragonverse Neo！我是这片土地上的动作指导大师，随意叫我巴巴。在这里，你可以和我嬉笑打闹，学习各种骚气的动作。*/
	get Dialogue0041():ILanguageElement{return this.getElement(200033)};
	/**动作？比如说？*/
	get Dialogue0042():ILanguageElement{return this.getElement(200034)};
	/**点击你的动作面板，选择一个动作，保证比你想象中还要嗨！看我来给你演示一下~*/
	get Dialogue0043():ILanguageElement{return this.getElement(200035)};
	/**这个动作是我们这里的代表性动作，你一学就能成为街头巷尾的焦点。用它向其他冒险者示好，他们肯定会跟着你一起high起来。*/
	get Dialogue0044():ILanguageElement{return this.getElement(200036)};
	/**提醒你一下，有些动作可以提高他对你的好感度，而有些动作……你可得小心点，在%&￥#@导师那里可千万别做%*&@这个动作。*/
	get Dialogue0045():ILanguageElement{return this.getElement(200037)};
	/**额，还有这种操作。*/
	get Dialogue0046():ILanguageElement{return this.getElement(200038)};
	/**这就是所谓的见人说人话，见龙走龙步了吧。*/
	get Dialogue0047():ILanguageElement{return this.getElement(200039)};
	/**你好，冒险者，我身后的这篇木林名为“举球消消乐”，它由一些机关和封印组成。*/
	get Dialogue0048():ILanguageElement{return this.getElement(200040)};
	/**里面封印着什么？*/
	get Dialogue0049():ILanguageElement{return this.getElement(200041)};
	/**如你所见，我被限制在此处无法移动，里面究竟封印着什么，我并清楚，*/
	get Dialogue0050():ILanguageElement{return this.getElement(200042)};
	/**无论如何，我会教你一些可能用的上的技能。*/
	get Dialogue0051():ILanguageElement{return this.getElement(200043)};
	/**现在，尝试举起木球吧。*/
	get Dialogue0052():ILanguageElement{return this.getElement(200044)};
	/**现在，尝试放下木球。*/
	get Dialogue0053():ILanguageElement{return this.getElement(200045)};
	/**好了，冒险者，去一探究竟吧，祝你成功。*/
	get Dialogue0054():ILanguageElement{return this.getElement(200046)};
	/**还有其他线索吗？*/
	get Dialogue0055():ILanguageElement{return this.getElement(200047)};
	/**仔细观察周围的环境，运用我教你的技能，或许你能找到一些线索。（教程完成后重复）*/
	get Dialogue0056():ILanguageElement{return this.getElement(200048)};
	/**你好，冒险者。这座迷阵是由古老的土元素魔法构成的。*/
	get Dialogue0057():ILanguageElement{return this.getElement(200049)};
	/**魔法阵？里面封印了什么东西吗？*/
	get Dialogue0058():ILanguageElement{return this.getElement(200050)};
	/**很遗憾，我被困在这里无法深入调查。但这片区域蕴藏浓厚的土元素，可能与土元素龙有关。*/
	get Dialogue0059():ILanguageElement{return this.getElement(200051)};
	/**不过，我可以教你一些技能，也许对你有所帮助。*/
	get Dialogue0060():ILanguageElement{return this.getElement(200052)};
	/**首先，从高处对准巨石板块跳跃下去。*/
	get Dialogue0061():ILanguageElement{return this.getElement(200053)};
	/**不错，这种向下的冲击力能够摧毁顶部的巨石板块。*/
	get Dialogue0062():ILanguageElement{return this.getElement(200054)};
	/**很好，看来你已经准备好挑战巨石迷阵了。祝你好运，冒险者。*/
	get Dialogue0063():ILanguageElement{return this.getElement(200055)};
	/**还有其他技巧吗？*/
	get Dialogue0064():ILanguageElement{return this.getElement(200056)};
	/**仔细观察巨石的形状和颜色，也许会有隐藏的信道。（教程完成后重复）*/
	get Dialogue0065():ILanguageElement{return this.getElement(200057)};
	/**你好，冒险者。这片火炎地域被一种神秘的力量所影响。*/
	get Dialogue0066():ILanguageElement{return this.getElement(200058)};
	/**这里有什么值得一探究竟的吗？*/
	get Dialogue0067():ILanguageElement{return this.getElement(200059)};
	/**我无法深入火炎地域，但我感受到封印中似乎含有大量的火元素。*/
	get Dialogue0068():ILanguageElement{return this.getElement(200060)};
	/**水与火是互相克制的关系，巧妙的运用水的力量，可以净化火炎，反之亦然。*/
	get Dialogue0069():ILanguageElement{return this.getElement(200061)};
	/**干得不错，你成功将水池底部的岩浆净化了，看来你已经无师自通了。*/
	get Dialogue0070():ILanguageElement{return this.getElement(200062)};
	/**还有其他技巧吗？*/
	get Dialogue0071():ILanguageElement{return this.getElement(200063)};
	/**水可以净化火炎，反之亦然。*/
	get Dialogue0072():ILanguageElement{return this.getElement(200064)};
	/**你好，冒险者。这片云中迷宫充满了水元素的力量。*/
	get Dialogue0073():ILanguageElement{return this.getElement(200065)};
	/**迷宫的尽头是什么？*/
	get Dialogue0074():ILanguageElement{return this.getElement(200066)};
	/**我感受到这片区域中有浓厚的水元素。但我无法亲自前往调查。*/
	get Dialogue0075():ILanguageElement{return this.getElement(200067)};
	/**水与火是互相克制的关系，巧妙的运用火的力量，可以消散云雾，反之亦然。*/
	get Dialogue0076():ILanguageElement{return this.getElement(200068)};
	/**还有其他技巧吗？*/
	get Dialogue0077():ILanguageElement{return this.getElement(200069)};
	/**当你无法一个人完成任务是，考虑装备你的宠物帮手吧。*/
	get Dialogue0078():ILanguageElement{return this.getElement(200070)};
	/**你还可以通过质押MBOX持有10000 veMBOX获得Dragon Key，可前往 https: //www.mobox.io/#/neo 了解详情。*/
	get Dialogue0079():ILanguageElement{return this.getElement(200071)};
	/**你好，冒险家。感受到我身后茂盛的木之能量了吗？*/
	get Dialogue0080():ILanguageElement{return this.getElement(200072)};
	/**木之能量？那是什么？*/
	get Dialogue0081():ILanguageElement{return this.getElement(200073)};
	/**这是一片由木之能量汇聚而成的迷阵，探索并解开其中的奥秘吧。*/
	get Dialogue0082():ILanguageElement{return this.getElement(200074)};
	/**你是谁？*/
	get Dialogue0083():ILanguageElement{return this.getElement(200075)};
	/**我是木元素智者，负责守护茂盛的木元素之力。*/
	get Dialogue0084():ILanguageElement{return this.getElement(200076)};
	/**你好，冒险家。在我的身后封印着强大的土之能量，巧妙地运用重力，用你的龙之身躯冲破这层封印吧！*/
	get Dialogue0085():ILanguageElement{return this.getElement(200077)};
	/**重力才是关键？*/
	get Dialogue0086():ILanguageElement{return this.getElement(200078)};
	/**你的龙之身躯蕴涵强大的能量，重力能帮助其击碎坚硬的表面。*/
	get Dialogue0087():ILanguageElement{return this.getElement(200079)};
	/**你是谁？*/
	get Dialogue0088():ILanguageElement{return this.getElement(200080)};
	/**我是土元素智者泰瑞克斯，负责掌管坚硬的土元素之力。*/
	get Dialogue0089():ILanguageElement{return this.getElement(200081)};
	/**你好，冒险家。水生雾，雾生云，拨云方可见日。*/
	get Dialogue0090():ILanguageElement{return this.getElement(200082)};
	/**拨云见日？*/
	get Dialogue0091():ILanguageElement{return this.getElement(200083)};
	/**迷宫将引导你。但首先，你需要克服云之障碍。记住，水火乃相生相克之物。*/
	get Dialogue0092():ILanguageElement{return this.getElement(200084)};
	/**你是谁？*/
	get Dialogue0093():ILanguageElement{return this.getElement(200085)};
	/**我是水元素智者温迪妮，流水之力轻柔但深邃，不可控制，只可顺应。*/
	get Dialogue0094():ILanguageElement{return this.getElement(200086)};
	/**你好，冒险家。愤怒的火之炼狱正在咆哮，净化它才是唯一的出路。*/
	get Dialogue0095():ILanguageElement{return this.getElement(200087)};
	/**何为凈化？*/
	get Dialogue0096():ILanguageElement{return this.getElement(200088)};
	/**在这片大陆，火与水相生相克，水元素拥有净化火元素的能力，相反亦是如此。*/
	get Dialogue0097():ILanguageElement{return this.getElement(200089)};
	/**你是谁？*/
	get Dialogue0098():ILanguageElement{return this.getElement(200090)};
	/**我是火元素智者艾莉娅，负责掌管并控制愤怒的火元素之力。*/
	get Dialogue0099():ILanguageElement{return this.getElement(200091)};
	/**哟，新来的冒险家！欢迎来到DragonVerse Neo！在开始冒险之前，你最好先了解一下一些物品的使用方法哦。*/
	get Dialogue0100():ILanguageElement{return this.getElement(200092)};
	/**物品？比如呢？*/
	get Dialogue0101():ILanguageElement{return this.getElement(200093)};
	/**比如说Blue Snitch，这是这片大陆上独有的特产，你可以用它们来捕捉Modragon。当然还有火龙果，你的龙娘宝宝们可全靠它吃饱肚子！*/
	get Dialogue0102():ILanguageElement{return this.getElement(200094)};
	/**火龙果又是啥。。*/
	get Dialogue0103():ILanguageElement{return this.getElement(200095)};
	/**地上可采集的红色果实就是火龙果。果肉细腻无核，汁水丰盈，是野生Modragon最喜爱的果实之一。*/
	get Dialogue0104():ILanguageElement{return this.getElement(200096)};
	/**如何才能采集呢？*/
	get Dialogue0105():ILanguageElement{return this.getElement(200097)};
	/**可采集的物品通常会发光，靠近它们后采集的按钮就会自动出现，别忘记多留点备用哦！*/
	get Dialogue0106():ILanguageElement{return this.getElement(200098)};
	/**你是谁？*/
	get Dialogue0107():ILanguageElement{return this.getElement(200099)};
	/**我是瑞奇，这片大陆的采集导师。不懂采集的话在这片大陆可是很难混的！*/
	get Dialogue0108():ILanguageElement{return this.getElement(200100)};
	/**哟，新来的冒险家！欢迎来到DragonVerse Neo！想不想拥有一只乖巧无比的龙娘跟着你到处跑呢？*/
	get Dialogue0109():ILanguageElement{return this.getElement(200101)};
	/**它不咬人吧。。*/
	get Dialogue0110():ILanguageElement{return this.getElement(200102)};
	/**你别打岔！龙娘是你接下来冒险的必要伴侣，捉不捉得到全凭自己！*/
	get Dialogue0111():ILanguageElement{return this.getElement(200103)};
	/**怎么捉它呢*/
	get Dialogue0112():ILanguageElement{return this.getElement(200104)};
	/**利用你的捕捉操纵杆即可，不过首先你要确保你的背包里有Blue Snitch*/
	get Dialogue0113():ILanguageElement{return this.getElement(200105)};
	/**100%捕捉？*/
	get Dialogue0114():ILanguageElement{return this.getElement(200106)};
	/**可没那么容易，想要提高你的捕捉成功率，你必须在完美区域释放你的Blue Snitch。性格不好的龙娘尤其难抓！*/
	get Dialogue0115():ILanguageElement{return this.getElement(200107)};
	/**性格？*/
	get Dialogue0116():ILanguageElement{return this.getElement(200108)};
	/**没错，每个龙娘都有自己的性格。多观察龙娘头顶的性格，不要浪费自己的Blue Snitch哦！*/
	get Dialogue0117():ILanguageElement{return this.getElement(200109)};
	/**你是谁？*/
	get Dialogue0118():ILanguageElement{return this.getElement(200110)};
	/**我是瑟琳娜，这片大陆的捕龙专家。谁会拒绝一个可爱的龙娘呢！*/
	get Dialogue0119():ILanguageElement{return this.getElement(200111)};
	/**接着奏乐，接着舞！*/
	get Dialogue0120():ILanguageElement{return this.getElement(200112)};
	/**还能跳舞？*/
	get Dialogue0121():ILanguageElement{return this.getElement(200113)};
	/**那肯定！点击“动作交互”就可以和NPC一起跳舞啦！*/
	get Dialogue0122():ILanguageElement{return this.getElement(200114)};
	/**你是谁？*/
	get Dialogue0123():ILanguageElement{return this.getElement(200115)};
	/**我是芭芭拉，这片大陆的动作大师！*/
	get Dialogue0124():ILanguageElement{return this.getElement(200116)};
	/**你好，冒险家。黎明将至。治理之力与共识将解锁新的挑战！*/
	get Dialogue0125():ILanguageElement{return this.getElement(200117)};
	/**治理之力？*/
	get Dialogue0126():ILanguageElement{return this.getElement(200118)};
	/**前往Snapshot进行投票，聚集小区的共识方可解锁新的游戏内容。*/
	get Dialogue0127():ILanguageElement{return this.getElement(200119)};
	/**房间ID：{0}*/
	get CurrentRoomId():ILanguageElement{return this.getElement(300000)};
	/**切换房间失败！*/
	get JumpGameFailed():ILanguageElement{return this.getElement(300001)};
	/**切换房间*/
	get SwitchRoomBtn():ILanguageElement{return this.getElement(300002)};
	/**切换至指定房间*/
	get JumpRoomText001():ILanguageElement{return this.getElement(300003)};
	/**请输入房间ID*/
	get JumpRoomText002():ILanguageElement{return this.getElement(300004)};
	/**确定*/
	get SwitchRoomConfirm():ILanguageElement{return this.getElement(300005)};
	/**你赢了！*/
	get RainbowText1():ILanguageElement{return this.getElement(300006)};
	/**游戏结束*/
	get RainbowText2():ILanguageElement{return this.getElement(300007)};
	/**关卡计数：*/
	get RainbowText3():ILanguageElement{return this.getElement(300008)};
	/**获得星星：*/
	get RainbowText4():ILanguageElement{return this.getElement(300009)};
	/**时间：*/
	get RainbowText5():ILanguageElement{return this.getElement(300010)};
	/**星星总数*/
	get RainbowText6():ILanguageElement{return this.getElement(300011)};
	/**返回*/
	get RainbowText7():ILanguageElement{return this.getElement(300012)};
	/**跳过一关*/
	get RainbowText8():ILanguageElement{return this.getElement(300013)};
	/**护盾*/
	get RainbowText9():ILanguageElement{return this.getElement(300014)};
	/**你的游戏次数不足！*/
	get RainbowText10():ILanguageElement{return this.getElement(300015)};
	/**是否消耗一点游戏次数，进入rainbow跑酷？*/
	get RainbowText11():ILanguageElement{return this.getElement(300016)};
	/**是*/
	get RainbowText12():ILanguageElement{return this.getElement(300017)};
	/**否*/
	get RainbowText13():ILanguageElement{return this.getElement(300018)};
	/**添加护盾成功！*/
	get addInvincible_Success():ILanguageElement{return this.getElement(300019)};
	/**添加护盾失败！*/
	get addInvincible_Fail():ILanguageElement{return this.getElement(300020)};
	/**护盾结束！*/
	get Invincible_End():ILanguageElement{return this.getElement(300021)};
	/**自动寻路失败！*/
	get autoFindPath_Fail():ILanguageElement{return this.getElement(300022)};
	/**由于上次在跑酷关内未失败，此次进入不消耗游戏次数！*/
	get ObbyEnterWithoutTicket():ILanguageElement{return this.getElement(300023)};
	/**皇家塔楼*/
	get Maptext001():ILanguageElement{return this.getElement(300024)};
	/**碧波湖畔*/
	get Maptext002():ILanguageElement{return this.getElement(300025)};
	/**神秘废墟*/
	get Maptext003():ILanguageElement{return this.getElement(300026)};
	/**奶牛关*/
	get Maptext004():ILanguageElement{return this.getElement(300027)};
	/**远古遗迹*/
	get Maptext005():ILanguageElement{return this.getElement(300028)};
	/**即使是命运的潮汐，也能击败海岸的意志*/
	get Tiptext001():ILanguageElement{return this.getElement(300029)};
	/**初雪的铃，乃是神祠的圣铃*/
	get Tiptext002():ILanguageElement{return this.getElement(300030)};
	/**天有洪炉，地生五金*/
	get Tiptext003():ILanguageElement{return this.getElement(300031)};
	/**纷扰的游尘，大地的怒吼*/
	get Tiptext004():ILanguageElement{return this.getElement(300032)};
	/**愿神龙之力引领你*/
	get Tiptext005():ILanguageElement{return this.getElement(300033)};
	/**涌动的魔力气息...这里充满了魔法造物*/
	get Tiptext006():ILanguageElement{return this.getElement(300034)};
	/**捕捉*/
	get CatchMainKey():ILanguageElement{return this.getElement(300035)};
	/**對話*/
	get TalkMainKey():ILanguageElement{return this.getElement(300036)};
	/**採集*/
	get CollectLanKey0001():ILanguageElement{return this.getElement(300037)};
	/**启动*/
	get TransportMainKey():ILanguageElement{return this.getElement(300038)};
	/**Dragonverse neo*/
	get Main_Scene_Name():ILanguageElement{return this.getElement(300039)};
	/**外星基地*/
	get Main_Scene_Name1():ILanguageElement{return this.getElement(300040)};
	/**森林营地*/
	get Main_Scene_Name2():ILanguageElement{return this.getElement(300041)};
	/**荒海*/
	get Main_Scene_Name3():ILanguageElement{return this.getElement(300042)};
	/**荒野边疆*/
	get Main_Scene_Name4():ILanguageElement{return this.getElement(300043)};
	/**未来遗迹*/
	get Main_Scene_Name5():ILanguageElement{return this.getElement(300044)};
	/**永眠之暗*/
	get Main_Scene_Name6():ILanguageElement{return this.getElement(300045)};
	/**WSAD键控制前后左右*/
	get Guide0001():ILanguageElement{return this.getElement(300046)};
	/**持续按住Alt键唤出鼠标*/
	get Guide0002():ILanguageElement{return this.getElement(300047)};
	/**持续按住Shift键加速*/
	get Guide0003():ILanguageElement{return this.getElement(300048)};
	/**空格键控制跳跃*/
	get Guide0004():ILanguageElement{return this.getElement(300049)};
	/**连续按空格键可以连续跳跃*/
	get Guide0005():ILanguageElement{return this.getElement(300050)};
	/**粉猪*/
	get TestAnimalName0001():ILanguageElement{return this.getElement(300051)};
	/**橘猫*/
	get TestAnimalName0002():ILanguageElement{return this.getElement(300052)};
	/**狗狗*/
	get TestAnimalName0003():ILanguageElement{return this.getElement(300053)};
	/**垂耳兔*/
	get TestAnimalName0004():ILanguageElement{return this.getElement(300054)};
	/**萌宠奥德赛*/
	get Maptext006():ILanguageElement{return this.getElement(300055)};
	/**无限乱斗*/
	get Maptext007():ILanguageElement{return this.getElement(300056)};
	/**冰霜天池*/
	get Maptext008():ILanguageElement{return this.getElement(300057)};
	/**樱之森*/
	get Main_Scene_Name7():ILanguageElement{return this.getElement(300058)};
	/**糖果天堂*/
	get Main_Scene_Name8():ILanguageElement{return this.getElement(300059)};
	/**河畔小巷*/
	get Main_Scene_Name9():ILanguageElement{return this.getElement(300060)};
	/**覆潮之下*/
	get Main_Scene_Name10():ILanguageElement{return this.getElement(300061)};
	/**梦幻乐园*/
	get Main_Scene_Name11():ILanguageElement{return this.getElement(300062)};
	/**鲸落*/
	get Main_Scene_Name12():ILanguageElement{return this.getElement(300063)};
	/**巫师豪宅*/
	get Main_Scene_Name13():ILanguageElement{return this.getElement(300064)};
	/**勘察站*/
	get Main_Scene_Name14():ILanguageElement{return this.getElement(300065)};
	/**无人边境*/
	get Main_Scene_Name15():ILanguageElement{return this.getElement(300066)};
	/**遗弃之地*/
	get Main_Scene_Name16():ILanguageElement{return this.getElement(300067)};
	/**寻常一角*/
	get Main_Scene_Name17():ILanguageElement{return this.getElement(300068)};
	/**水晶洞穴*/
	get Main_Scene_Name18():ILanguageElement{return this.getElement(300069)};
	/**炼狱城堡*/
	get Main_Scene_Name19():ILanguageElement{return this.getElement(300070)};
	/**高塔*/
	get Main_Scene_Name20():ILanguageElement{return this.getElement(300071)};
	/**雕像散发出一股魔力，你感到昏昏欲睡*/
	get Tiptext007():ILanguageElement{return this.getElement(300072)};
	/**龙娘领域*/
	get Maptext009():ILanguageElement{return this.getElement(300073)};
	/**缺少蓝色飞贼！神像拒绝了你！*/
	get hasNoDragonBall():ILanguageElement{return this.getElement(300074)};
	/**设置*/
	get Game_Setting001():ILanguageElement{return this.getElement(300075)};
	/**声音*/
	get Game_Setting002():ILanguageElement{return this.getElement(300076)};
	/**静音*/
	get Game_Setting003():ILanguageElement{return this.getElement(300077)};
	/**镜头设置*/
	get Game_Setting004():ILanguageElement{return this.getElement(300078)};
	/**镜头灵敏度*/
	get Game_Setting005():ILanguageElement{return this.getElement(300079)};
	/**低*/
	get Game_Setting006():ILanguageElement{return this.getElement(300080)};
	/**高*/
	get Game_Setting007():ILanguageElement{return this.getElement(300081)};
	/**仙豆*/
	get Online_shop001():ILanguageElement{return this.getElement(300082)};
	/**在游戏中使用可获得体力*/
	get Online_shop002():ILanguageElement{return this.getElement(300083)};
	/**蓝色飞贼*/
	get Online_shop003():ILanguageElement{return this.getElement(300084)};
	/**在奖励地图中捕获龙娘时使用*/
	get Online_shop004():ILanguageElement{return this.getElement(300085)};
	/**购买*/
	get Online_shop005():ILanguageElement{return this.getElement(300086)};
	/**总计：*/
	get Online_shop006():ILanguageElement{return this.getElement(300087)};
	/**结余：*/
	get Online_shop007():ILanguageElement{return this.getElement(300088)};
	/**DragonVerse 商城*/
	get Online_shop008():ILanguageElement{return this.getElement(300089)};
	/**使用*/
	get Online_shop009():ILanguageElement{return this.getElement(300090)};
	/**数量：*/
	get Online_shop010():ILanguageElement{return this.getElement(300091)};
	/**确定消耗一瓶仙豆药水并回复{0}体力吗？*/
	get Online_shop011():ILanguageElement{return this.getElement(300092)};
	/**确认（E）*/
	get Online_shop012():ILanguageElement{return this.getElement(300093)};
	/**取消（Esc）*/
	get Online_shop013():ILanguageElement{return this.getElement(300094)};
	/**确认中*/
	get Online_shop014():ILanguageElement{return this.getElement(300095)};
	/**烬舞在火焰中翩翩起舞，宛如一只舞动的火鸟。*/
	get BoxingDragonDescribe00001():ILanguageElement{return this.getElement(300096)};
	/**熔光在火焰中闪烁着金色的光芒，宛如一颗熔化的金子。*/
	get BoxingDragonDescribe00002():ILanguageElement{return this.getElement(300097)};
	/**炽影在烈火中燃烧，宛如一道熊熊的火焰。*/
	get BoxingDragonDescribe00003():ILanguageElement{return this.getElement(300098)};
	/**摇曳的火焰在风中燃烧，宛如一只烈焰的凤凰。*/
	get BoxingDragonDescribe00004():ILanguageElement{return this.getElement(300099)};
	/**笙桦的火焰闪烁着温暖的光芒，宛如一颗火热的心。*/
	get BoxingDragonDescribe00005():ILanguageElement{return this.getElement(300100)};
	/**蓝波在水中翩翩起舞，宛如一只自由自在的海豚。*/
	get BoxingDragonDescribe00006():ILanguageElement{return this.getElement(300101)};
	/**冰雪在水中漂浮，宛如一朵洁白的雪花，散发出清新的气息。*/
	get BoxingDragonDescribe00007():ILanguageElement{return this.getElement(300102)};
	/**涟漪在水面上荡漾，宛如一面平静的湖泊，散发出宁静的气息。*/
	get BoxingDragonDescribe00008():ILanguageElement{return this.getElement(300103)};
	/**海影在海底中游动，宛如一只神秘的海豚，散发出神秘的气息。*/
	get BoxingDragonDescribe00009():ILanguageElement{return this.getElement(300104)};
	/**冰妃在冰雪中翩翩起舞，宛如一位冰雪女神。*/
	get BoxingDragonDescribe00010():ILanguageElement{return this.getElement(300105)};
	/**樱林在春日里绽放，宛如一片粉色的海洋。*/
	get BoxingDragonDescribe00011():ILanguageElement{return this.getElement(300106)};
	/**翠影在大地上生长，宛如一片翠绿的森林。*/
	get BoxingDragonDescribe00012():ILanguageElement{return this.getElement(300107)};
	/**梧韵在风中摇曳，宛如一只舞动的蝴蝶。*/
	get BoxingDragonDescribe00013():ILanguageElement{return this.getElement(300108)};
	/**茶枝在大地上静谧生长，宛如一位优雅的贵妇。*/
	get BoxingDragonDescribe00014():ILanguageElement{return this.getElement(300109)};
	/**桃语在春风中低语，宛如一朵含羞的桃花。*/
	get BoxingDragonDescribe00015():ILanguageElement{return this.getElement(300110)};
	/**沧峰耸立在大地上，宛如一座巍峨的山峰。*/
	get BoxingDragonDescribe00016():ILanguageElement{return this.getElement(300111)};
	/**翠谷静谧在大地上，宛如一片绿色的海洋。*/
	get BoxingDragonDescribe00017():ILanguageElement{return this.getElement(300112)};
	/**黄域广袤无垠，宛如一片金色的土地。*/
	get BoxingDragonDescribe00018():ILanguageElement{return this.getElement(300113)};
	/**绿枝在大地上生长，宛如一株生机勃勃的植物。*/
	get BoxingDragonDescribe00019():ILanguageElement{return this.getElement(300114)};
	/**岩坡坚不可摧，宛如一座坚实的城堡。*/
	get BoxingDragonDescribe00020():ILanguageElement{return this.getElement(300115)};
	/**焚花的火焰燃烧着花朵的颜色，宛如一朵燃烧的花火。*/
	get BoxingDragonDescribe00021():ILanguageElement{return this.getElement(300116)};
	/**赤翼的火焰燃烧着烈日的颜色，宛如一只猩红的凤凰。*/
	get BoxingDragonDescribe00022():ILanguageElement{return this.getElement(300117)};
	/**null*/
	get BoxingDragonDescribe00023():ILanguageElement{return this.getElement(300118)};
	/**null*/
	get BoxingDragonDescribe00024():ILanguageElement{return this.getElement(300119)};
	/**null*/
	get BoxingDragonDescribe00025():ILanguageElement{return this.getElement(300120)};
	/**清泉在山间流淌，宛如一条清澈的小溪，散发出清新的气息。*/
	get BoxingDragonDescribe00026():ILanguageElement{return this.getElement(300121)};
	/**蓝钰在水中闪烁着蓝色的光芒，宛如一颗宝石般的存在。*/
	get BoxingDragonDescribe00027():ILanguageElement{return this.getElement(300122)};
	/**null*/
	get BoxingDragonDescribe00028():ILanguageElement{return this.getElement(300123)};
	/**null*/
	get BoxingDragonDescribe00029():ILanguageElement{return this.getElement(300124)};
	/**null*/
	get BoxingDragonDescribe00030():ILanguageElement{return this.getElement(300125)};
	/**竹风在山间吹拂，宛如一片清新的绿色海洋。*/
	get BoxingDragonDescribe00031():ILanguageElement{return this.getElement(300126)};
	/**松雨在雨中婉转，宛如一首悠扬的乐曲。*/
	get BoxingDragonDescribe00032():ILanguageElement{return this.getElement(300127)};
	/**null*/
	get BoxingDragonDescribe00033():ILanguageElement{return this.getElement(300128)};
	/**null*/
	get BoxingDragonDescribe00034():ILanguageElement{return this.getElement(300129)};
	/**null*/
	get BoxingDragonDescribe00035():ILanguageElement{return this.getElement(300130)};
	/**花翼在大地上翱翔，宛如一只自由自在的鸟儿。*/
	get BoxingDragonDescribe00036():ILanguageElement{return this.getElement(300131)};
	/**青峦耸立在大地上，宛如一座壮丽的山脉。*/
	get BoxingDragonDescribe00037():ILanguageElement{return this.getElement(300132)};
	/**null*/
	get BoxingDragonDescribe00038():ILanguageElement{return this.getElement(300133)};
	/**null*/
	get BoxingDragonDescribe00039():ILanguageElement{return this.getElement(300134)};
	/**null*/
	get BoxingDragonDescribe00040():ILanguageElement{return this.getElement(300135)};
	/**在夕阳的余晖中，晚霞的光辉显得格外绚烂，宛如一道美丽的风景线。*/
	get BoxingDragonDescribe00041():ILanguageElement{return this.getElement(300136)};
	/**日曦之光照耀着大地，点亮了人们的心灵，带来了温暖和希望。
*/
	get BoxingDragonDescribe00042():ILanguageElement{return this.getElement(300137)};
	/**云舞随风起舞，宛如一朵白云，轻盈自如，令人陶醉。*/
	get BoxingDragonDescribe00043():ILanguageElement{return this.getElement(300138)};
	/**朝辉的光芒照亮了早晨的大地，给人带来了新的开始和希望。*/
	get BoxingDragonDescribe00044():ILanguageElement{return this.getElement(300139)};
	/**明影的身形在光芒中若隐若现，宛如一道神秘的幻影。*/
	get BoxingDragonDescribe00045():ILanguageElement{return this.getElement(300140)};
	/**魄刃的锋芒锐利无比，宛如黑暗中的一抹寒光。*/
	get BoxingDragonDescribe00046():ILanguageElement{return this.getElement(300141)};
	/**雪影在黑暗中闪烁着冷酷的眼神，宛如一只潜伏在夜幕中的猎豹。*/
	get BoxingDragonDescribe00047():ILanguageElement{return this.getElement(300142)};
	/**夜薇散发出深邃的气息，宛如黑夜中的一朵妖艳的花朵。*/
	get BoxingDragonDescribe00048():ILanguageElement{return this.getElement(300143)};
	/**幽风在黑暗中飘荡，带着一丝神秘的气息，宛如一位仙子。*/
	get BoxingDragonDescribe00049():ILanguageElement{return this.getElement(300144)};
	/**冥月在黑暗中散发出幽深的光芒，宛如一面神秘的镜子。*/
	get BoxingDragonDescribe00050():ILanguageElement{return this.getElement(300145)};
	/**云露在清晨的露珠中沐浴，散发出清新的气息，宛如一位精灵。 */
	get BoxingDragonDescribe00051():ILanguageElement{return this.getElement(300146)};
	/**破晓的光芒冲破黑夜的束缚，宣告了新的一天的到来。*/
	get BoxingDragonDescribe00052():ILanguageElement{return this.getElement(300147)};
	/**影莲在黑暗中散发出诡异的气息，宛如一朵神秘的黑莲花。*/
	get BoxingDragonDescribe00053():ILanguageElement{return this.getElement(300148)};
	/**墨翎的翅膀在黑暗中飞舞，宛如一只神秘的燕子。*/
	get BoxingDragonDescribe00054():ILanguageElement{return this.getElement(300149)};
	/**冒险岛*/
	get Main_Scene_Name21():ILanguageElement{return this.getElement(300150)};
	/**神秘传送门*/
	get Main_Scene_Name22():ILanguageElement{return this.getElement(300151)};
	/**天穹之上*/
	get Main_Scene_Name23():ILanguageElement{return this.getElement(300152)};
	/**林中深处*/
	get Main_Scene_Name24():ILanguageElement{return this.getElement(300153)};
	/**龙娘洞窟*/
	get Main_Scene_Name25():ILanguageElement{return this.getElement(300154)};
	/**木灵宫殿*/
	get Main_Scene_Name26():ILanguageElement{return this.getElement(300155)};
	/**水之城都*/
	get Main_Scene_Name27():ILanguageElement{return this.getElement(300156)};
	/**陵墓*/
	get Main_Scene_Name28():ILanguageElement{return this.getElement(300157)};
	/**幽灵城*/
	get Main_Scene_Name29():ILanguageElement{return this.getElement(300158)};
	/**秘密花园*/
	get Main_Scene_Name30():ILanguageElement{return this.getElement(300159)};
	/**冒险小镇*/
	get Main_Scene_Name31():ILanguageElement{return this.getElement(300160)};
	/**岩石神坛*/
	get Main_Scene_Name32():ILanguageElement{return this.getElement(300161)};
	/**丰裕岛*/
	get Main_Scene_Name33():ILanguageElement{return this.getElement(300162)};
	/**恶魔城*/
	get Main_Scene_Name34():ILanguageElement{return this.getElement(300163)};
	/**塔防游戏*/
	get Maptext010():ILanguageElement{return this.getElement(300164)};

}