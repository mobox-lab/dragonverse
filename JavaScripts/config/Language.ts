import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_Ch","Value_J","Value_D"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"TestLanguageKey000001","Test000001","測試000001","テスト000001","Testen Sie 000001"],[2,"TestQualityName0001","TestQuality","測試品質","テスト品質","Testqualität"],[3,"TestBagItemName0001","TestBagItem","測試背包物品","テストバッグアイテム","Testbeutel-Artikel"],[4,"TestBagItemDesc0001","TestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDesc","測試背包描述測試背包描述測試背包描述測試背包描述測試背包描述","テストバッグアイテムの説明","Testbeutel-Artikel-Desc"],[5,"TestAreaName0001","TestArea","測試區域","テストエリア","Testgelände"],[6,"Dialogue0001","Welcome to DragonVerse Neo, step in and become a part of this enchanting realm!","歡迎來到Dragonverse Neo，成為這裡的一員！","Dragonverse Neo へようこそ!","Willkommen bei Dragonverse Neo und sei ein Teil davon!"],[7,"Dialogue0002","What shall be unveiled in the world of Dragonverse Neo?","Dragonverse Neo是個怎麼樣的世界？","ドラゴンバース・ネオってどんな世界?","Was für eine Welt ist Dragonverse Neo?"],[8,"Dialogue0003","DragonVerse Neo is a novel and delightful world where you can explore, discover, and create everything that belongs uniquely to you!","Dragonverse Neo是一個全新的充滿樂趣的世界，你可以在這個世界中探索、發現、創造屬於你的一切！","Dragonverse Neoは、探索し、発見し、自分のものをすべて作成できる、新しい楽しさに満ちた世界です!","Dragonverse Neo ist eine neue, unterhaltsame Welt, in der du alles erforschen, entdecken und erschaffen kannst, was dir gehört!"],[9,"Dialogue0004","How can I experience DragonVerse Neo?","我要怎麼體驗Dragonverse Neo？","Dragonverse Neoを體験するにはどうすればいいですか?","Wie kann ich Dragonverse Neo erleben?"],[10,"Dialogue0005","Enter your Dragonkey and start your debut journey right away. Head over to Landing Page and check your eligibility if you don't have your Dragonkey yet.","輸入你的Code即可立馬體驗，還沒擁有Code？立即前往Landing Page獲取！","コードを入力するとすぐに體験できますが、まだコードをお持ちではありませんか?ランディングページにアクセスして、今すぐ入手してください!","Geben Sie Ihren Code ein, um es sofort zu erleben, Sie haben noch keinen Code? Gehen Sie zur Landing Page, um es jetzt zu erhalten!"],[11,"Dialogue0006","My Dragonkey is ready!","Code在手，我要出去","コードを手に、ドラゴンバースネオを體験するつもりです","Mit dem Code in der Hand werde ich Dragonverse Neo erleben"],[12,"Dialogue0007","I don't have a Dragonkey..","我還沒有Code，哪裡獲取","私はまだコードを持っていません、今すぐコードを入手してください","Ich habe noch keinen Code, holen Sie sich jetzt den Code"],[13,"Dialogue0008","Verification ··· Succeed! Congratulations on getting out of the novice village, get ready to explore the world of Dragonverse Neo!","驗證···成功！恭喜你可以走出新手村落，盡情探索Dragonverse Neo吧~","検証 ···継ぐ！初心者の村を出て、ドラゴンバースネオを探索したおめでとうございます~","Verifizierung ··· Gelingen! Herzlichen Glückwunsch, dass du das Anfängerdorf verlassen und Dragonverse Neo erkundet hast~"],[14,"BagItemName0001","DragonBall","Dragon位面球","ドラゴンボール","DragonBall"],[15,"BagItemName0002","Pitaya","火龍果","ドラゴンフルーツ","Drachenfrucht"],[16,"BagItemName0003","Gold","金幣","金","Gold"],[17,"BagItemDesc0001","Press to capture and contain wild Modragon.","按下開關便可以捕捉Dragon，並封裝在內的位面球。","スイッチを押すだけで、ドラゴンを捕らえ、平面の球體にカプセル化することができます。","Auf Knopfdruck kann der Drache eingefangen und in einer ebenen Kugel eingekapselt werden."],[18,"BagItemDesc0002","A delicate and juicy fruit, one of the favorite fruits of wild Modragons.","果肉細膩無核，汁水豐盈，是野生Dragon最喜愛的果實之一。","果肉は繊細で種がなく、果汁が豊富で、野生のドラゴンのお気に入りの果物の1つになっています。","Das Fruchtfleisch ist zart und kernlos, und der Saft ist reichlich vorhanden, was sie zu einer der Lieblingsfrüchte des wilden Drachen macht."],[19,"BagItemDesc0003","The magical coin fell from deep space, looks like a very valuable item.","從遙遠的星空落下的神奇貨幣，看起來是很貴重的物品。","遠くの星空から落ちてくる魔法の貨幣は、とても貴重なアイテムに見えます。","Die magische Währung, die vom fernen Sternenhimmel fällt, sieht aus wie ein sehr wertvoller Gegenstand."],[20,"DragonCharacter0001","Vigilant","機警的","アラート","Wachsam"],[21,"DragonCharacter0002","Grumpy","暴躁的","気難しい","Mürrisch"],[22,"DragonCharacter0003","Timid","膽小的","臆病","Schüchtern"],[23,"DragonCharacter0004","Irritable","易怒的","不機嫌な","Reizbar"],[24,"DragonCharacter0005","Gentle","溫和的","軽度","Leicht"],[25,"DragonName00001","Flame Modragon","火焰龍娘","フレイムワーム","Flammen-Wurm"],[26,"DragonName00002","Aqua Modragon","水浪龍娘","ウェーブワーム","Welle Wurm"],[27,"DragonName00003","Hibiscus Modragon","木槿龍少","ハイビスカスワーム","Hibiskus Wurm"],[28,"DragonName00004","Megalithic Modragon","岩石龍娘","ロックワーム","Rock Wurm"],[29,"DragonName00005","Infernal Modragon","煉獄龍娘","地獄の龍","Höllischer Drache"],[30,"DragonName00006","Ocean Modragon","海洋龍娘","オーシャンドラゴン","Ozean-Drache"],[31,"DragonName00007","Forest Modragon","森林龍娘","フォレストドラゴン","Wald-Drache"],[32,"DragonName00008","Mountain Modragon","山脈龍娘","マウンテンドラゴン","Berg-Drache"],[33,"DragonName00009","Light Modragon","聖光龍娘","光のドラゴン","Licht-Drache"],[34,"DragonName00010","Shadow Modragon","暗影龍娘","シャドウドラゴン","Schatten-Drache"],[35,"QualityName0001","Common","普通","コモン","Gemeinsam"],[36,"QualityName0002","Uncommon","良好","珍しい","Ungewöhnlich"],[37,"QualityName0003","Unique","優秀","ユニーク","Einzigartig"],[38,"QualityName0004","Rare","稀有","珍","Selten"],[39,"QualityName0005","Epic","史詩","エピック","Episch"],[40,"QualityName0006","Legendary","傳說","伝説","Sagenhaft"],[41,"ElementalName0001","Fire","火","火事","Feuer"],[42,"ElementalName0002","Water","水","水","Wasser"],[43,"ElementalName0003","Wood","木","木","Holz"],[44,"ElementalName0004","Earth","土","地球","Erde"],[45,"ElementalName0005","Light","光","光","Licht"],[46,"ElementalName0006","Dark","暗","暗い","Dunkel"],[100101,"CharacterName0001","Newbie Mentor · Oliver","新手導師 · 奧利弗","Newbie Mentor · Oliver","Newbie Mentor · Oliver"],[100102,"CharacterName0002","Master of Collection · Ricky","採集導師 · 瑞奇","Master of Collection · Ricky","Master of Collection · Ricky"],[100103,"CharacterName0003","Master of Dragons · Selina","捕龍專家 · 瑟琳娜","Master of Dragons · Selina","Master of Dragons · Selina"],[100104,"CharacterName0004","Master of Emote · Barbara","舞者 · 芭芭拉","Master of Emote · Barbara","Master of Emote · Barbara"],[100105,"CharacterName0005","Wood Guardian · Fenia","木元素智者 · 芬尼亞","Wood Guardian · Fenia","Wood Guardian · Fenia"],[100106,"CharacterName0006","Earth Guardian · Terrakus","土元素智者 · 泰瑞克斯","Earth Guardian · Terrakus","Earth Guardian · Terrakus"],[100107,"CharacterName0007","Water Guardian · Wendy","水元素智者 · 溫蒂妮","Water Guardian · Wendy","Water Guardian · Wendy"],[100108,"CharacterName0008","Fire Guardian · Elia","火元素智者 · 艾莉婭","Fire Guardian · Elia","Fire Guardian · Elia"],[100109,"CharacterName0009","Mysterious","神秘人","Mysterious","Mysterious"],[100110,"CharacterName0010","Wood Monolith","木元素圖騰","Wood Monolith","Wood Monolith"],[100111,"CharacterName0011","Earth Monolith","木元素圖騰","Earth Monolith","Earth Monolith"],[100112,"CharacterName0012","Fire Monolith","火元素圖騰","Fire Monolith","Fire Monolith"],[100113,"CharacterName0013","Water Monolith","水元素圖騰","Water Monolith","Water Monolith"],[100201,"AreaName0001","Drakeling Town","龍吟村","Drakeling Town","Drakeling Town"],[100202,"AreaName0002","Spawn Point","出生點","Spawn Point","Spawn Point"],[100203,"AreaName0003","Azure Shore","碧波湖畔","Azure Shore","Azure Shore"],[100204,"AreaName0004","Acient Abyss","遠古遺跡","Acient Abyss","Acient Abyss"],[100205,"AreaName0005","Mythical Wasteland","神秘廢墟","Mythical Wasteland","Mythical Wasteland"],[100206,"AreaName0006","Glacial Realm","冰霜天池","Glacial Realm","Glacial Realm"],[101001,"CharacterInteract0001","Chat","對話","Chat","Chat"],[101002,"CharacterInteract0002","Emote","動作交互","Emote","Emote"],[102129,"Danmu_Content_3129","Spin","小陀螺","Spin","Spin"],[102130,"Danmu_Content_3130","Handstand","倒立旋轉","Handstand","Handstand"],[102131,"Danmu_Content_3131","Ballet","芭蕾","Ballet","Ballet"],[102132,"Danmu_Content_3132","Street","街舞","Street","Street"],[102133,"Danmu_Content_3133","Mechan","機械舞","Mechan","Mechan"],[102134,"Danmu_Content_3134","Ghost","鬼步舞","Ghost","Ghost"],[102135,"Danmu_Content_3135","Jackson","邁克爾","Jackson","Jackson"],[102136,"Danmu_Content_3136","Modern","現代舞","Modern","Modern"],[102137,"Danmu_Content_3137","Group","團舞","Group","Group"],[102138,"Danmu_Content_3138","Heart","比心","Heart","Heart"],[102139,"Danmu_Content_3139","Shoulder","摟肩","Shoulder","Shoulder"],[102140,"Danmu_Content_3140","Cheer","歡呼","Cheer","Cheer"],[102141,"Danmu_Content_3141","Defy","不服氣","Defy","Defy"],[102142,"Danmu_Content_3142","Viral","兩隻老虎","Viral","Viral"],[102143,"Danmu_Content_3143","PPAP","PPAP","PPAP","PPAP"],[102144,"Danmu_Content_3144","Applaud","鼓掌","Applaud","Applaud"],[102145,"Danmu_Content_3145","Salute","行禮","Salute","Salute"],[102146,"Danmu_Content_3146","Wave","揮手","Wave","Wave"],[102147,"Danmu_Content_3147","Like","點贊","Like","Like"],[102148,"Danmu_Content_3148","Kiss","飛吻","Kiss","Kiss"],[102149,"Danmu_Content_3149","Angry","生氣","Angry","Angry"],[102150,"Danmu_Content_3150","Heart","比心","Heart","Heart"],[102151,"Danmu_Content_3151","ShakeHead","搖頭","ShakeHead","ShakeHead"],[102152,"Danmu_Content_3152","Weep","哭泣","Weep","Weep"],[102153,"Danmu_Content_3153","Hug","擁抱","Hug","Hug"],[102154,"Danmu_Content_3154","Pas deux","雙人舞","Pas deux","Pas deux"],[102155,"Danmu_Content_3155","Greet","打招呼","Greet","Greet"],[102156,"Danmu_Content_3156","Jackson","邁克爾","Jackson","Jackson"],[102157,"Danmu_Content_3157","Wrestle","過肩摔","Wrestle","Wrestle"],[102158,"Dragontip_Content_0001","*Modragon required to unlock this magical seal.","需要*元素龍才能解開該法陣","*Modragon required to unlock this magical seal.","*Modragon required to unlock this magical seal."],[105001,"Bag_001","Bag","背包","Bag","Bag"],[105002,"Bag_002","Modragon","龍娘","Modragon","Modragon"],[105003,"Bag_003","Item","物品","Item","Item"],[105004,"Bag_004","Auto-follow","跟隨","Auto-follow","Auto-follow"],[105005,"Bag_005","Rest","休息","Rest","Rest"],[105006,"Bag_006","Amount","數量","Amount","Amount"],[105051,"Reset_001","Reset","點我復位","Reset","Reset"],[105101,"Collection_001","Collection Start","開始採集","Collection Start","Collection Start"],[105102,"Collection_002","Collection Successful","採集成功","Collection Successful","Collection Successful"],[105103,"Collection_003","Collection Failed","採集失敗","Collection Failed","Collection Failed"],[105201,"Catch_001","Boxing Start","開始捕捉","Boxing Start","Boxing Start"],[105202,"Catch_002","Boxing Successful","捕捉成功","Boxing Successful","Boxing Successful"],[105203,"Catch_003","Boxing Failed","捕捉失敗","Boxing Failed","Boxing Failed"],[105204,"Catch_004","Insufficient Dragonball, try again.","您的DragonBall不足，無法捕捉。","Insufficient Dragonball, try again.","Insufficient Dragonball, try again."],[105205,"Catch_005","Perfect","完美的","Perfect","Perfect"],[105206,"Catch_006","Normal","一般的","Normal","Normal"],[105301,"Code001","Dear Moboxers:","尊敬的MOBOX社區：","Dear Moboxers:","Dear Moboxers:"],[105302,"Code002","Enter your Dragonkey code below and start your debut journey on Dragonverse Neo Alpha Test:","在下方輸入您的Dragonkey驗證碼即可開始探索Dragonverse Neo刪檔內測的完整內容:","Enter your Dragonkey code below and start your debut journey on Dragonverse Neo Alpha Test:","Enter your Dragonkey code below and start your debut journey on Dragonverse Neo Alpha Test:"],[105303,"Code003","Enter your code","輸入驗證碼","Enter your code","Enter your code"],[105304,"Code004","Verify","驗證","Verify","Verify"],[105401,"Setting001","Setting","設置","Setting","Setting"],[105402,"Setting002","Rename","修改昵稱","Rename","Rename"],[105403,"Setting003","Language","多語言","Language","Language"],[105404,"Setting004","Verify","驗證","Verify","Verify"],[105405,"Setting005","Log out","登出","Log out","Log out"],[105406,"Setting006","Change avatar","修改形象","Change avatar","Change avatar"],[105407,"Setting007","Your name","你的昵稱","Your name","Your name"],[105501,"TinyGameLanKey0001","Pick up","拾取","Pick up","Pick up"],[105502,"TinyGameLanKey0002","Put it down","放下","Put it down","Put it down"],[105503,"TinyGameLanKey0003","Fire spells","火球術","Fire spells","Fire spells"],[105504,"TinyGameLanKey0004","Congrats on nailing the game! Check reward right in your bag!","恭喜通關小遊戲，請在背包中查收獎勵","Congrats on nailing the game! Check reward right in your bag!","Congrats on nailing the game! Check reward right in your bag!"],[105601,"BoxingDragonName00001","Vigilant Flame Modragon","機警的火焰龍娘","Vigilant Flame Modragon","Vigilant Flame Modragon"," Flame Modragon","火焰龍娘","Vigilant","機警的"],[105602,"BoxingDragonName00002","Grumpy Flame Modragon","暴躁的火焰龍娘","Grumpy Flame Modragon","Grumpy Flame Modragon"," Aqua Modragon","水浪龍娘","Grumpy","暴躁的"],[105603,"BoxingDragonName00003","Timid Flame Modragon","膽小的火焰龍娘","Timid Flame Modragon","Timid Flame Modragon"," Hibiscus Modragon","木槿龍娘","Timid","膽小的"],[105604,"BoxingDragonName00004","Irritable Flame Modragon","易怒的火焰龍娘","Irritable Flame Modragon","Irritable Flame Modragon"," Megalithic Modragon","岩石龍娘","Irritable","易怒的"],[105605,"BoxingDragonName00005","Gentle Flame Modragon","溫和的火焰龍娘","Gentle Flame Modragon","Gentle Flame Modragon"," Infernal Modragon","煉獄龍娘","Gentle","溫和的"],[105606,"BoxingDragonName00006","Vigilant Aqua Modragon","機警的水浪龍娘","Vigilant Aqua Modragon","Vigilant Aqua Modragon"," Ocean Modragon","海洋龍娘"],[105607,"BoxingDragonName00007","Grumpy Aqua Modragon","暴躁的水浪龍娘","Grumpy Aqua Modragon","Grumpy Aqua Modragon"," Forest Modragon","森林龍娘"],[105608,"BoxingDragonName00008","Timid Aqua Modragon","膽小的水浪龍娘","Timid Aqua Modragon","Timid Aqua Modragon"," Mountain Modragon","山脈龍娘"],[105609,"BoxingDragonName00009","Irritable Aqua Modragon","易怒的水浪龍娘","Irritable Aqua Modragon","Irritable Aqua Modragon"," Light Modragon","聖光龍娘"],[105610,"BoxingDragonName00010","Gentle Aqua Modragon","溫和的水浪龍娘","Gentle Aqua Modragon","Gentle Aqua Modragon"," Shadow Modragon","暗影龍娘"],[105611,"BoxingDragonName00011","Vigilant Hibiscus Modragon","機警的木槿龍娘","Vigilant Hibiscus Modragon","Vigilant Hibiscus Modragon"],[105612,"BoxingDragonName00012","Grumpy Hibiscus Modragon","暴躁的木槿龍娘","Grumpy Hibiscus Modragon","Grumpy Hibiscus Modragon"],[105613,"BoxingDragonName00013","Timid Hibiscus Modragon","膽小的木槿龍娘","Timid Hibiscus Modragon","Timid Hibiscus Modragon"],[105614,"BoxingDragonName00014","Irritable Hibiscus Modragon","易怒的木槿龍娘","Irritable Hibiscus Modragon","Irritable Hibiscus Modragon"],[105615,"BoxingDragonName00015","Gentle Hibiscus Modragon","溫和的木槿龍娘","Gentle Hibiscus Modragon","Gentle Hibiscus Modragon"],[105616,"BoxingDragonName00016","Vigilant Megalithic Modragon","機警的岩石龍娘","Vigilant Megalithic Modragon","Vigilant Megalithic Modragon"],[105617,"BoxingDragonName00017","Grumpy Megalithic Modragon","暴躁的岩石龍娘","Grumpy Megalithic Modragon","Grumpy Megalithic Modragon"],[105618,"BoxingDragonName00018","Timid Megalithic Modragon","膽小的岩石龍娘","Timid Megalithic Modragon","Timid Megalithic Modragon"],[105619,"BoxingDragonName00019","Irritable Megalithic Modragon","易怒的岩石龍娘","Irritable Megalithic Modragon","Irritable Megalithic Modragon"],[105620,"BoxingDragonName00020","Gentle Megalithic Modragon","溫和的岩石龍娘","Gentle Megalithic Modragon","Gentle Megalithic Modragon"],[105621,"BoxingDragonName00021","Vigilant Infernal Modragon","機警的煉獄龍娘","Vigilant Infernal Modragon","Vigilant Infernal Modragon"],[105622,"BoxingDragonName00022","Grumpy Infernal Modragon","暴躁的煉獄龍娘","Grumpy Infernal Modragon","Grumpy Infernal Modragon"],[105623,"BoxingDragonName00023","Timid Infernal Modragon","膽小的煉獄龍娘","Timid Infernal Modragon","Timid Infernal Modragon"],[105624,"BoxingDragonName00024","Irritable Infernal Modragon","易怒的煉獄龍娘","Irritable Infernal Modragon","Irritable Infernal Modragon"],[105625,"BoxingDragonName00025","Gentle Infernal Modragon","溫和的煉獄龍娘","Gentle Infernal Modragon","Gentle Infernal Modragon"],[105626,"BoxingDragonName00026","Vigilant Ocean Modragon","機警的海洋龍娘","Vigilant Ocean Modragon","Vigilant Ocean Modragon"],[105627,"BoxingDragonName00027","Grumpy Ocean Modragon","暴躁的海洋龍娘","Grumpy Ocean Modragon","Grumpy Ocean Modragon"],[105628,"BoxingDragonName00028","Timid Ocean Modragon","膽小的海洋龍娘","Timid Ocean Modragon","Timid Ocean Modragon"],[105629,"BoxingDragonName00029","Irritable Ocean Modragon","易怒的海洋龍娘","Irritable Ocean Modragon","Irritable Ocean Modragon"],[105630,"BoxingDragonName00030","Gentle Ocean Modragon","溫和的海洋龍娘","Gentle Ocean Modragon","Gentle Ocean Modragon"],[105631,"BoxingDragonName00031","Vigilant Forest Modragon","機警的森林龍娘","Vigilant Forest Modragon","Vigilant Forest Modragon"],[105632,"BoxingDragonName00032","Grumpy Forest Modragon","暴躁的森林龍娘","Grumpy Forest Modragon","Grumpy Forest Modragon"],[105633,"BoxingDragonName00033","Timid Forest Modragon","膽小的森林龍娘","Timid Forest Modragon","Timid Forest Modragon"],[105634,"BoxingDragonName00034","Irritable Forest Modragon","易怒的森林龍娘","Irritable Forest Modragon","Irritable Forest Modragon"],[105635,"BoxingDragonName00035","Gentle Forest Modragon","溫和的森林龍娘","Gentle Forest Modragon","Gentle Forest Modragon"],[105636,"BoxingDragonName00036","Vigilant Mountain Modragon","機警的山脈龍娘","Vigilant Mountain Modragon","Vigilant Mountain Modragon"],[105637,"BoxingDragonName00037","Grumpy Mountain Modragon","暴躁的山脈龍娘","Grumpy Mountain Modragon","Grumpy Mountain Modragon"],[105638,"BoxingDragonName00038","Timid Mountain Modragon","膽小的山脈龍娘","Timid Mountain Modragon","Timid Mountain Modragon"],[105639,"BoxingDragonName00039","Irritable Mountain Modragon","易怒的山脈龍娘","Irritable Mountain Modragon","Irritable Mountain Modragon"],[105640,"BoxingDragonName00040","Gentle Mountain Modragon","溫和的山脈龍娘","Gentle Mountain Modragon","Gentle Mountain Modragon"],[105641,"BoxingDragonName00041","Vigilant Light Modragon","機警的聖光龍娘","Vigilant Light Modragon","Vigilant Light Modragon"],[105642,"BoxingDragonName00042","Grumpy Light Modragon","暴躁的聖光龍娘","Grumpy Light Modragon","Grumpy Light Modragon"],[105643,"BoxingDragonName00043","Timid Light Modragon","膽小的聖光龍娘","Timid Light Modragon","Timid Light Modragon"],[105644,"BoxingDragonName00044","Irritable Light Modragon","易怒的聖光龍娘","Irritable Light Modragon","Irritable Light Modragon"],[105645,"BoxingDragonName00045","Gentle Light Modragon","溫和的聖光龍娘","Gentle Light Modragon","Gentle Light Modragon"],[105646,"BoxingDragonName00046","Vigilant Shadow Modragon","機警的暗影龍娘","Vigilant Shadow Modragon","Vigilant Shadow Modragon"],[105647,"BoxingDragonName00047","Grumpy Shadow Modragon","暴躁的暗影龍娘","Grumpy Shadow Modragon","Grumpy Shadow Modragon"],[105648,"BoxingDragonName00048","Timid Shadow Modragon","膽小的暗影龍娘","Timid Shadow Modragon","Timid Shadow Modragon"],[105649,"BoxingDragonName00049","Irritable Shadow Modragon","易怒的暗影龍娘","Irritable Shadow Modragon","Irritable Shadow Modragon"],[105650,"BoxingDragonName00050","Gentle Shadow Modragon","溫和的暗影龍娘","Gentle Shadow Modragon","Gentle Shadow Modragon"],[200001,"Dialogue0009","Is there anything interesting around here?","這附近有什麼有趣的東西嗎？","Is there anything interesting around here?","Is there anything interesting around here?"],[200002,"Dialogue0010","Hey, new adventurer! Welcome to Dragonverse Neo. This is a world of dragon fantasy! See those colorful objects on the ground? Those are the true treasures in this land: DragonBalls.","喲，新來的冒險家！歡迎來到Dragonverse Neo，這裡可是個充滿奇妙的世界。看到地上那些五光十色的物體了嗎？那可是我們這裡的寶貝DragonBall。","Hey, new adventurer! Welcome to Dragonverse Neo. This is a world of dragon fantasy! See those colorful objects on the ground? Those are the true treasures in this land: DragonBalls.","Hey, new adventurer! Welcome to Dragonverse Neo. This is a world of dragon fantasy! See those colorful objects on the ground? Those are the true treasures in this land: DragonBalls."],[200003,"Dialogue0011","Dragonball? looks pretty cool?","DragonBall？很厲害的樣子？","Dragonball? looks pretty cool?","Dragonball? looks pretty cool?"],[200004,"Dialogue0012","You bet! Dragonballs are preciously unique in this land, it's designed to capture DragonBorns or as an crafting material for mysterious items! Let me help you recognize them.","沒錯！DragonBall是這片大陸上獨有的特產。你可以用它們來捕捉Modragon，也能用來合成一些有趣的東西。來，我教你如何辨認DragonBall。","You bet! Dragonballs are preciously unique in this land, it's designed to capture DragonBorns or as an crafting material for mysterious items! Let me help you recognize them.","You bet! Dragonballs are preciously unique in this land, it's designed to capture DragonBorns or as an crafting material for mysterious items! Let me help you recognize them."],[200005,"Dialogue0013","The rarities of these DragonBalls are determined by their colors and textures. Rare DragonBalls have higher odds in capturing DragonBorns.","這些DragonBall有不同的顏色和紋理，代表著它們的不同稀有度，越稀有的DragonBall捕獲成功率越高。","The rarities of these DragonBalls are determined by their colors and textures. Rare DragonBalls have higher odds in capturing DragonBorns.","The rarities of these DragonBalls are determined by their colors and textures. Rare DragonBalls have higher odds in capturing DragonBorns."],[200006,"Dialogue0014","How can I get Dragonball?","我要如何獲得DragonBall呢？","How can I get Dragonball?","How can I get Dragonball?"],[200007,"Dialogue0015","Eazy peasy! Just aim at the Dragonball and hit \"collect\".","對準它們，按下採集按鈕，就能輕鬆採集到手。","Eazy peasy! Just aim at the Dragonball and hit \"collect\".","Eazy peasy! Just aim at the Dragonball and hit \"collect\"."],[200008,"Dialogue0016","Fanstastic, and what are those red fruits over there? Can I eat them?","原來如此，那邊的紅色果實又是什麼，可以吃嗎？","Fanstastic, and what are those red fruits over there? Can I eat them?","Fanstastic, and what are those red fruits over there? Can I eat them?"],[200009,"Dialogue0017","That's Pitaya: A delicate and juicy fruit, one of the favorite fruits of Dragonborns. To collect Pitaya, just stand underneath the trees and press \"collect\".","那是我們的火龍果。果肉細膩無核，汁水豐盈，是野生Modragon最喜愛的果實之一。要採集火龍果，只需走到果樹下，按下採集按鈕即可。","That's Pitaya: A delicate and juicy fruit, one of the favorite fruits of Dragonborns. To collect Pitaya, just stand underneath the trees and press \"collect\".","That's Pitaya: A delicate and juicy fruit, one of the favorite fruits of Dragonborns. To collect Pitaya, just stand underneath the trees and press \"collect\"."],[200010,"Dialogue0018","Pitaya sounds delicious!","火龍果聽起來好好吃啊！","Pitaya sounds delicious!","Pitaya sounds delicious!"],[200011,"Dialogue0019","Indeed, not only are they tasty, but they're also crucial materials for crafting. Take some Pitaya with you, and they might help you along your journey in this land!","是的，不僅好吃，而且還是一些合成材料的重要組成部分。收集一些火龍果，它們可能對你未來的冒險起到幫助。","Indeed, not only are they tasty, but they're also crucial materials for crafting. Take some Pitaya with you, and they might help you along your journey in this land!","Indeed, not only are they tasty, but they're also crucial materials for crafting. Take some Pitaya with you, and they might help you along your journey in this land!"],[200012,"Dialogue0020","There is something else I want you to know, we call it \"Gold Coins\"","還有一種採集物我要介紹給你，那就是金幣。","There is something else I want you to know, we call it \"Gold Coins\"","There is something else I want you to know, we call it \"Gold Coins\""],[200013,"Dialogue0021","Gold Coins? Are they also collectibles?","金幣？這也是一種採集物嗎？","Gold Coins? Are they also collectibles?","Gold Coins? Are they also collectibles?"],[200014,"Dialogue0022","In the land of Dragonverse Neo, Gold Coins is a precious resource. It fell from distance space. Using Gold Coins, you may trade with other adventurers, buy items and craft rare items.","在我們的Dragonverse Neo中，金幣是一種非常重要的資源。它們從遙遠的星空落下，是很貴重的物品。你可以使用它與其他冒險家交易、購買物品，甚至用來合成一些珍貴的道具。","In the land of Dragonverse Neo, Gold Coins is a precious resource. It fell from distance space. Using Gold Coins, you may trade with other adventurers, buy items and craft rare items.","In the land of Dragonverse Neo, Gold Coins is a precious resource. It fell from distance space. Using Gold Coins, you may trade with other adventurers, buy items and craft rare items."],[200015,"Dialogue0023","So lucky-strikes are true! I hope I am the \"hit by gold\" version of Isaac Newton>3","原來天上掉金幣這種事是真的會發生啊！","So lucky-strikes are true! I hope I am the \"hit by gold\" version of Isaac Newton>3","So lucky-strikes are true! I hope I am the \"hit by gold\" version of Isaac Newton>3"],[200016,"Dialogue0024","Exclusively in Dragonverse Neo! Now go and collect some of those Dragonballs, Pitaya and Gold Coins. Your adventure is await.","僅此一家，也只有在Dragonverse Neo中你才能體會到這種樂趣了！去吧，嘗試著採集一些DragonBall,火龍果和金幣吧。","Exclusively in Dragonverse Neo! Now go and collect some of those Dragonballs, Pitaya and Gold Coins. Your adventure is await.","Exclusively in Dragonverse Neo! Now go and collect some of those Dragonballs, Pitaya and Gold Coins. Your adventure is await."],[200017,"Dialogue0025","Hey, new adventurer! Looks like you have mastered the collection skills, now it's time for you to get your lovely DragonBorn pal!","嘿，新冒險者，聽說你已經掌握了採集的技巧，那麼是不是也想要擁有屬於自己的小夥伴Modragon呢？","Hey, new adventurer! Looks like you have mastered the collection skills, now it's time for you to get your lovely DragonBorn pal!","Hey, new adventurer! Looks like you have mastered the collection skills, now it's time for you to get your lovely DragonBorn pal!"],[200018,"Dialogue0026","Aha! Never say no to free Dragons!","來都來了，肯定要搞一隻吧。","Aha! Never say no to free Dragons!","Aha! Never say no to free Dragons!"],[200019,"Dialogue0027","Your honesty is... quite straightfoward. You will need to use your Dragonballs to capture them, I will show you how.","你倒是很坦誠嘛！其實，只需要使用DragonBall就可以捕捉到屬於你的Dragon了。先來瞭解一下如何使用DragonBall吧。","Your honesty is... quite straightfoward. You will need to use your Dragonballs to capture them, I will show you how.","Your honesty is... quite straightfoward. You will need to use your Dragonballs to capture them, I will show you how."],[200020,"Dialogue0028","You see this Dragonball? All you have to do is capture them using the \"Capture\" controller, select your Dragonball and tose it to the Dragonborn you wish to capture. But it's not easy! Dragonborns could be quite stubborn to capture!","看到這顆DragonBall了嗎？你可以通過Modragon捕獲面板的操縱杆，選擇它，然後投擲到想要捕捉的Modragon附近。不過，這可不是一件簡單的事情，每個Modragon都有自己的個性。","You see this Dragonball? All you have to do is capture them using the \"Capture\" controller, select your Dragonball and tose it to the Dragonborn you wish to capture. But it's not easy! Dragonborns could be quite stubborn to capture!","You see this Dragonball? All you have to do is capture them using the \"Capture\" controller, select your Dragonball and tose it to the Dragonborn you wish to capture. But it's not easy! Dragonborns could be quite stubborn to capture!"],[200021,"Dialogue0029","Stubborn? You mean they have traits?","個性？","Stubborn? You mean they have traits?","Stubborn? You mean they have traits?"],[200022,"Dialogue0030","That's right, there are 5 traits Dragonborns might have: Vigilant; Grumpy; Timid; Irritable or Gentle. traits are crucial when it comes to capturing them, so you might want to know their traits before you waste your dragonball.","沒錯，每個Dragon都有五種個性，包括機警的、暴躁的、膽小的、易怒的、溫和的。而且，它們的個性還會影響到捕捉的難度。所以在捕捉之前，最好先瞭解一下你要捕捉的Modragon的個性。","That's right, there are 5 traits Dragonborns might have: Vigilant; Grumpy; Timid; Irritable or Gentle. traits are crucial when it comes to capturing them, so you might want to know their traits before you waste your dragonball.","That's right, there are 5 traits Dragonborns might have: Vigilant; Grumpy; Timid; Irritable or Gentle. traits are crucial when it comes to capturing them, so you might want to know their traits before you waste your dragonball."],[200023,"Dialogue0031","Interesting! How would I know about their traits?","原來如此，我要怎麼瞭解它們的個性呢？","Interesting! How would I know about their traits?","Interesting! How would I know about their traits?"],[200024,"Dialogue0032","It's quite simple, just look at the name and color of the Dragonborn, that will be your hint. Anyway, observation will help.","很簡單，你只需要觀察Modragon頭上的名稱和顏色，他們會提示你這只Modragon的個性；總之，多觀察，你就能熟知它們的個性。","It's quite simple, just look at the name and color of the Dragonborn, that will be your hint. Anyway, observation will help.","It's quite simple, just look at the name and color of the Dragonborn, that will be your hint. Anyway, observation will help."],[200025,"Dialogue0033","You said it like it's so simple..","聽上去很簡單的樣子。","You said it like it's so simple..","You said it like it's so simple.."],[200026,"Dialogue0034","Not that hard anyway!","那當然了，沒有大家說的那麼難！","Not that hard anyway!","Not that hard anyway!"],[200027,"Dialogue0035","Can't you tell I'm being ironic?","我在說反話你聽不出來嗎？","Can't you tell I'm being ironic?","Can't you tell I'm being ironic?"],[200028,"Dialogue0036","......, you are lucky I'm not the grumpy one. Actually, I can teach you a technic, it can efficiently increase your odds of capturing them.","……，別在這陰陽怪氣了，我破例傳授你一個投擲訣竅，可以很好的提高你的捕獲概率。","......, you are lucky I'm not the grumpy one. Actually, I can teach you a technic, it can efficiently increase your odds of capturing them.","......, you are lucky I'm not the grumpy one. Actually, I can teach you a technic, it can efficiently increase your odds of capturing them."],[200029,"Dialogue0037","I'm listening.","說來聽聽。","I'm listening.","I'm listening."],[200030,"Dialogue0038","Remember, controls the your strength. If the strength indicator slides right into the highest strength section (the narrow section in the force indicator), You can dramatically increase your odds of capture.","記住，力度是關鍵，投擲的瞬間，如果力度指示器指標剛好擺動到最高檔力度區間（力度指示器中間最窄的那一檔），就能夠大大的提高捕獲的成功率哦。","Remember, controls the your strength. If the strength indicator slides right into the highest strength section (the narrow section in the force indicator), You can dramatically increase your odds of capture.","Remember, controls the your strength. If the strength indicator slides right into the highest strength section (the narrow section in the force indicator), You can dramatically increase your odds of capture."],[200031,"Dialogue0039","Bingo! Wait.. I don't think I'm the only one that konw this..","還有這種操作？你不會只告訴我一個人吧？","Bingo! Wait.. I don't think I'm the only one that konw this..","Bingo! Wait.. I don't think I'm the only one that konw this.."],[200032,"Dialogue0040","......Just go and try, remember to capture as much as possible. They will be your key helper along your journey!","...... 趕緊去試試吧，記得多捕捉一些Dragon，它們會成為你在Dragonverse Neo中的得力助手。","......Just go and try, remember to capture as much as possible. They will be your key helper along your journey!","......Just go and try, remember to capture as much as possible. They will be your key helper along your journey!"],[200033,"Dialogue0041","Yo new folk! Welcome to Dragonverse Neo, I am the master of emote in this land, and you can call be Barb! Ready to learn some funky move?","Yo，新來的小夥伴！歡迎來到Dragonverse Neo！我是這片土地上的動作指導大師，隨意叫我巴巴。在這裡，你可以和我嬉笑打鬧，學習各種騷氣的動作。","Yo new folk! Welcome to Dragonverse Neo, I am the master of emote in this land, and you can call be Barb! Ready to learn some funky move?","Yo new folk! Welcome to Dragonverse Neo, I am the master of emote in this land, and you can call be Barb! Ready to learn some funky move?"],[200034,"Dialogue0042","Emote? Like what?","動作？比如說？","Emote? Like what?","Emote? Like what?"],[200035,"Dialogue0043","Open your Emote panel, select an emote and play it, it's quite fun and I can show it to you!","點擊你的動作面板，選擇一個動作，保證比你想像中還要嗨！看我來給你演示一下~","Open your Emote panel, select an emote and play it, it's quite fun and I can show it to you!","Open your Emote panel, select an emote and play it, it's quite fun and I can show it to you!"],[200036,"Dialogue0044","This is our siganature move, very popular in the land of Dragonverse Neo! Use it and turn on the crowd like we always do!","這個動作是我們這裡的代表性動作，你一學就能成為街頭巷尾的焦點。用它向其他冒險者示好，他們肯定會跟著你一起high起來。","This is our siganature move, very popular in the land of Dragonverse Neo! Use it and turn on the crowd like we always do!","This is our siganature move, very popular in the land of Dragonverse Neo! Use it and turn on the crowd like we always do!"],[200037,"Dialogue0045","Also here's a reminder for you: some emotes can boost your level of friendship with other masters. But be careful not to choose the wrong emote, people might get angry!","提醒你一下，有些動作可以提高他對你的好感度，而有些動作……你可得小心點，在%&￥#@導師那裡可千萬別做%*&@這個動作。","Also here's a reminder for you: some emotes can boost your level of friendship with other masters. But be careful not to choose the wrong emote, people might get angry!","Also here's a reminder for you: some emotes can boost your level of friendship with other masters. But be careful not to choose the wrong emote, people might get angry!"],[200038,"Dialogue0046","O...kay, what's new..","額，還有這種操作。","O...kay, what's new..","O...kay, what's new.."],[200039,"Dialogue0047","You'll get there, like the wiseman once said: communications are delicacy, learn to be artful!","這就是所謂的見人說人話，見龍走龍步了吧。","You'll get there, like the wiseman once said: communications are delicacy, learn to be artful!","You'll get there, like the wiseman once said: communications are delicacy, learn to be artful!"],[200040,"Dialogue0048","Hello, adventurer. The stone structure behind me is called \"Woodland Ball Buster,\" sealed by the mighty power of \"wood\" and mysterious mechanics.","你好，冒險者，我身後的這篇木林名為“舉球消消樂”，它由一些機關和封印組成。","Hello, adventurer. The stone structure behind me is called \"Woodland Ball Buster,\" sealed by the mighty power of \"wood\" and mysterious mechanics.","Hello, adventurer. The stone structure behind me is called \"Woodland Ball Buster,\" sealed by the mighty power of \"wood\" and mysterious mechanics."],[200041,"Dialogue0049","What is sealed underneath?","裡面封印著什麼？","What is sealed underneath?","What is sealed underneath?"],[200042,"Dialogue0050","I was retrained here decades ago, as you can see. I am not sure what's inside this mythical structure, not without my ability to move.","如你所見，我被限制在此處無法移動，裡面究竟封印著什麼，我並清楚，","I was retrained here decades ago, as you can see. I am not sure what's inside this mythical structure, not without my ability to move.","I was retrained here decades ago, as you can see. I am not sure what's inside this mythical structure, not without my ability to move."],[200043,"Dialogue0051","But I will teach you some technics, adventurer. The technics might help you unveil the myth behind it.","無論如何，我會教你一些可能用的上的技能。","But I will teach you some technics, adventurer. The technics might help you unveil the myth behind it.","But I will teach you some technics, adventurer. The technics might help you unveil the myth behind it."],[200044,"Dialogue0052","Now, try lifting the stone sphere.","現在，嘗試舉起木球吧。","Now, try lifting the stone sphere.","Now, try lifting the stone sphere."],[200045,"Dialogue0053","Now, try putting down the stone sphere.","現在，嘗試放下木球。","Now, try putting down the stone sphere.","Now, try putting down the stone sphere."],[200046,"Dialogue0054","Well done, adventurer. Now go and explore, I wish you success.","好了，冒險者，去一探究竟吧，祝你成功。","Well done, adventurer. Now go and explore, I wish you success.","Well done, adventurer. Now go and explore, I wish you success."],[200047,"Dialogue0055","Are there any other clues?","還有其他線索嗎？","Are there any other clues?","Are there any other clues?"],[200048,"Dialogue0056","Observe the structure carefully, use the technics and perhaps you will find some clues. (Repeated after completing the tutorial)","仔細觀察周圍的環境，運用我教你的技能，或許你能找到一些線索。（教程完成後重複）","Observe the structure carefully, use the technics and perhaps you will find some clues. (Repeated after completing the tutorial)","Observe the structure carefully, use the technics and perhaps you will find some clues. (Repeated after completing the tutorial)"],[200049,"Dialogue0057","Greetings, adventurer. This maze is crafted from ancient earth magic.","你好，冒險者。這座迷陣是由古老的土元素魔法構成的。","Greetings, adventurer. This maze is crafted from ancient earth magic.","Greetings, adventurer. This maze is crafted from ancient earth magic."],[200050,"Dialogue0058","Magic circle? What's sealed within?","魔法陣？裡面封印了什麼東西嗎？","Magic circle? What's sealed within?","Magic circle? What's sealed within?"],[200051,"Dialogue0059","Unfortunately, my comfinement retrained my ability to investigate. But I sensed high density of earth elemental force from this area, it could be related to the Earth Dragon.","很遺憾，我被困在這裡無法深入調查。但這片區域蘊藏濃厚的土元素，可能與土元素龍有關。","Unfortunately, my comfinement retrained my ability to investigate. But I sensed high density of earth elemental force from this area, it could be related to the Earth Dragon.","Unfortunately, my comfinement retrained my ability to investigate. But I sensed high density of earth elemental force from this area, it could be related to the Earth Dragon."],[200052,"Dialogue0060","Let me teach you some skills that might be helpful.","不過，我可以教你一些技能，也許對你有所幫助。","Let me teach you some skills that might be helpful.","Let me teach you some skills that might be helpful."],[200053,"Dialogue0061","First, leap from a high point onto the giant stone slabs below.","首先，從高處對準巨石板塊跳躍下去。","First, leap from a high point onto the giant stone slabs below.","First, leap from a high point onto the giant stone slabs below."],[200054,"Dialogue0062","Well done! The gravitational velocity will help you destroy the top stone slabs.","不錯，這種向下的衝擊力能夠摧毀頂部的巨石板塊。","Well done! The gravitational velocity will help you destroy the top stone slabs.","Well done! The gravitational velocity will help you destroy the top stone slabs."],[200055,"Dialogue0063","Excellent, it seems you're ready to face the ancient stone maze. Good luck, adventurer.","很好，看來你已經準備好挑戰巨石迷陣了。祝你好運，冒險者。","Excellent, it seems you're ready to face the ancient stone maze. Good luck, adventurer.","Excellent, it seems you're ready to face the ancient stone maze. Good luck, adventurer."],[200056,"Dialogue0064","Any other tips?","還有其他技巧嗎？","Any other tips?","Any other tips?"],[200057,"Dialogue0065","Observe the shapes and colors of the stones carefully; There might be hidden pathway that leads you back to the surface! (Repeated after completing the tutorial)","仔細觀察巨石的形狀和顏色，也許會有隱藏的通道。（教程完成後重複）","Observe the shapes and colors of the stones carefully; There might be hidden pathway that leads you back to the surface! (Repeated after completing the tutorial)","Observe the shapes and colors of the stones carefully; There might be hidden pathway that leads you back to the surface! (Repeated after completing the tutorial)"],[200058,"Dialogue0066","Hello, adventurer. This infernal abyss has been conteminated by the mysterious force of Fire","你好，冒險者。這片火炎地域被一種神秘的力量所影響。","Hello, adventurer. This infernal abyss has been conteminated by the mysterious force of Fire","Hello, adventurer. This infernal abyss has been conteminated by the mysterious force of Fire"],[200059,"Dialogue0067","Is there anything worth exploring here?","這裡有什麼值得一探究竟的嗎？","Is there anything worth exploring here?","Is there anything worth exploring here?"],[200060,"Dialogue0068","I can't venture deep into the abyss, but I sense substantial fire energy coming out from the abyss.","我無法深入火炎地域，但我感受到封印中似乎含有大量的火元素。","I can't venture deep into the abyss, but I sense substantial fire energy coming out from the abyss.","I can't venture deep into the abyss, but I sense substantial fire energy coming out from the abyss."],[200061,"Dialogue0069","Water and fire are mutually restraining elements. Use their power against each other, and you shall purify comtemination.","水與火是互相克制的關係，巧妙的運用水的力量，可以淨化火炎，反之亦然。","Water and fire are mutually restraining elements. Use their power against each other, and you shall purify comtemination.","Water and fire are mutually restraining elements. Use their power against each other, and you shall purify comtemination."],[200062,"Dialogue0070","Well done. You successfully purified the lava at the bottom of the abyss. Looks like you've became a brilliant self-taught!","幹得不錯，你成功將水池底部的岩漿淨化了，看來你已經無師自通了。","Well done. You successfully purified the lava at the bottom of the abyss. Looks like you've became a brilliant self-taught!","Well done. You successfully purified the lava at the bottom of the abyss. Looks like you've became a brilliant self-taught!"],[200063,"Dialogue0071","Are there any other techniques?","還有其他技巧嗎？","Are there any other techniques?","Are there any other techniques?"],[200064,"Dialogue0072","Water can purify lava, and vice versa.","水可以淨化火炎，反之亦然。","Water can purify lava, and vice versa.","Water can purify lava, and vice versa."],[200065,"Dialogue0073","Hello, adventurer. This cloud maze was cleansed by the mighty power of water.","你好，冒險者。這片雲中迷宮充滿了水元素的力量。","Hello, adventurer. This cloud maze was cleansed by the mighty power of water.","Hello, adventurer. This cloud maze was cleansed by the mighty power of water."],[200066,"Dialogue0074","What lies at the end of the maze?","迷宮的盡頭是什麼？","What lies at the end of the maze?","What lies at the end of the maze?"],[200067,"Dialogue0075","The power of water is burried deep by the mythical clouds. Sense the elemental force of water and find a way out.","我感受到這片區域中有濃厚的水元素。但我無法親自前往調查。","The power of water is burried deep by the mythical clouds. Sense the elemental force of water and find a way out.","The power of water is burried deep by the mythical clouds. Sense the elemental force of water and find a way out."],[200068,"Dialogue0076","As you know, water and fire are mutual retaining elements, summon the force and use them against each other!","水與火是互相克制的關係，巧妙的運用火的力量，可以消散雲霧，反之亦然。","As you know, water and fire are mutual retaining elements, summon the force and use them against each other!","As you know, water and fire are mutual retaining elements, summon the force and use them against each other!"],[200069,"Dialogue0077","Are there any other techniques?","還有其他技巧嗎？","Are there any other techniques?","Are there any other techniques?"],[200070,"Dialogue0078","When you can't complete a task alone, try summoning your Modragons for assistant!","當你無法一個人完成任務是，考慮裝備你的寵物幫手吧。","When you can't complete a task alone, try summoning your Modragons for assistant!","When you can't complete a task alone, try summoning your Modragons for assistant!"],[200071,"Dialogue0079","You can get Dragon Key by staking MBOX to holding 10,000 veMBOX, which can be found at https: //www.mobox.io/#/neo for more information.","你還可以通過質押MBOX持有10000 veMBOX獲得Dragon Key，可前往 https: //www.mobox.io/#/neo 瞭解詳情。","You can get Dragon Key by staking MBOX to holding 10,000 veMBOX, which can be found at https: //www.mobox.io/#/neo for more information.","You can get Dragon Key by staking MBOX to holding 10,000 veMBOX, which can be found at https: //www.mobox.io/#/neo for more information."],[200072,"Dialogue0080","Hello, DragonOwner. Are you feeling the flourishing vitality of wood glowing behind me?","你好，冒險家。感受到我身後茂盛的木之能量了嗎？","Hello, DragonOwner. Are you feeling the flourishing vitality of wood glowing behind me?","Hello, DragonOwner. Are you feeling the flourishing vitality of wood glowing behind me?"],[200073,"Dialogue0081","Wood power?","木之能量？那是什麼？","Wood power?","Wood power?"],[200074,"Dialogue0082","Behind me is the mythical maze form by wood energy, explore and unravel the mysteries within!","這是一片由木之能量匯聚而成的迷陣，探索並解開其中的奧秘吧。","Behind me is the mythical maze form by wood energy, explore and unravel the mysteries within!","Behind me is the mythical maze form by wood energy, explore and unravel the mysteries within!"],[200075,"Dialogue0083","Who are you?","你是誰？","Who are you?","Who are you?"],[200076,"Dialogue0084","I am Fenia, the guardian of wood. Entrusted by this land to safeguard the flourishing power of wood element.","我是木元素智者，負責守護茂盛的木元素之力。","I am Fenia, the guardian of wood. Entrusted by this land to safeguard the flourishing power of wood element.","I am Fenia, the guardian of wood. Entrusted by this land to safeguard the flourishing power of wood element."],[200077,"Dialogue0085","Hello, adventurer. The resilient earth power is sealed behind me. Harness the force of gravity and break through this seal!","你好，冒險家。在我的身後封印著強大的土之能量，巧妙地運用重力，用你的龍之身軀衝破這層封印吧！","Hello, adventurer. The resilient earth power is sealed behind me. Harness the force of gravity and break through this seal!","Hello, adventurer. The resilient earth power is sealed behind me. Harness the force of gravity and break through this seal!"],[200078,"Dialogue0086","Gravity is the key?","重力才是關鍵？","Gravity is the key?","Gravity is the key?"],[200079,"Dialogue0087","The dragonblood flowing in your vein carrys powerful energy, use it and shatter the seal with gravity!","你的龍之身軀蘊涵強大的能量，重力能幫助其擊碎堅硬的表面。","The dragonblood flowing in your vein carrys powerful energy, use it and shatter the seal with gravity!","The dragonblood flowing in your vein carrys powerful energy, use it and shatter the seal with gravity!"],[200080,"Dialogue0088","Who are you?","你是誰？","Who are you?","Who are you?"],[200081,"Dialogue0089","I am Terrakus, the guardian of earth. Entrusted by this land to oversee the resilient power of earth element.","我是土元素智者泰瑞克斯，負責掌管堅硬的土元素之力。","I am Terrakus, the guardian of earth. Entrusted by this land to oversee the resilient power of earth element.","I am Terrakus, the guardian of earth. Entrusted by this land to oversee the resilient power of earth element."],[200082,"Dialogue0090","Greetings, adventurer. From water emerges the mist, from mist forms the clouds; it is through parting the clouds that one may behold the sun.","你好，冒險家。水生霧，霧生雲，撥雲方可見日。","Greetings, adventurer. From water emerges the mist, from mist forms the clouds; it is through parting the clouds that one may behold the sun.","Greetings, adventurer. From water emerges the mist, from mist forms the clouds; it is through parting the clouds that one may behold the sun."],[200083,"Dialogue0091","And after the sun..?","撥雲見日？","And after the sun..?","And after the sun..?"],[200084,"Dialogue0092","The maze shall guide you, but first, conquer the mythical clouds. Remember the restraint of water and fire.","迷宮將引導你。但首先，你需要克服雲之障礙。記住，水火乃相生相剋之物。","The maze shall guide you, but first, conquer the mythical clouds. Remember the restraint of water and fire.","The maze shall guide you, but first, conquer the mythical clouds. Remember the restraint of water and fire."],[200085,"Dialogue0093","Who are you?","你是誰？","Who are you?","Who are you?"],[200086,"Dialogue0094","I am Wendy, the guardian of water. The power of flowing water is gentle but yet profound, uncontrollable, only to be accommodated.","我是水元素智者溫蒂妮，流水之力輕柔但深邃，不可控制，只可順應。","I am Wendy, the guardian of water. The power of flowing water is gentle but yet profound, uncontrollable, only to be accommodated.","I am Wendy, the guardian of water. The power of flowing water is gentle but yet profound, uncontrollable, only to be accommodated."],[200087,"Dialogue0095","The raging power of infernal is roaring from the abyss, cleanse and purification will be the only way out!","你好，冒險家。憤怒的火之煉獄正在咆哮，淨化它才是唯一的出路。","The raging power of infernal is roaring from the abyss, cleanse and purification will be the only way out!","The raging power of infernal is roaring from the abyss, cleanse and purification will be the only way out!"],[200088,"Dialogue0096","Cleanse? How?","何為凈化？","Cleanse? How?","Cleanse? How?"],[200089,"Dialogue0097","In the land of Dragonverse, fire and water exist in the harmony of creation and restraint. Water cleanse fire, and vice versa.","在這片大陸，火與水相生相剋，水元素擁有淨化火元素的能力，相反亦是如此。","In the land of Dragonverse, fire and water exist in the harmony of creation and restraint. Water cleanse fire, and vice versa.","In the land of Dragonverse, fire and water exist in the harmony of creation and restraint. Water cleanse fire, and vice versa."],[200090,"Dialogue0098","Who are you?","你是誰？","Who are you?","Who are you?"],[200091,"Dialogue0099","I am Elia, the guardian of fire. Entrusted by this land to contain the fiery power of fire element.","我是火元素智者艾莉婭，負責掌管並控制憤怒的火元素之力。","I am Elia, the guardian of fire. Entrusted by this land to contain the fiery power of fire element.","I am Elia, the guardian of fire. Entrusted by this land to contain the fiery power of fire element."],[200092,"Dialogue0100","Greetings new Dragonowner! Welcome to the land of Dragonverse Neo, before you start your journey, you might want to get familiar with some collectable items.","哟，新来的冒险家！欢迎来到DragonVerse Neo！在开始冒险之前，你最好先了解一下一些物品的使用方法哦。","Greetings new Dragonowner! Welcome to the land of Dragonverse Neo, before you start your journey, you might want to get familiar with some collectable items.","Greetings new Dragonowner! Welcome to the land of Dragonverse Neo, before you start your journey, you might want to get familiar with some collectable items."],[200093,"Dialogue0101","Items? Like what?","物品？比如呢？","Items? Like what?","Items? Like what?"],[200094,"Dialogue0102","Like Dragonball, designed to capture wild Modragons! and Pitaya as well, your Modragons loves Pitaya!","比如说Dragonball，这是这片大陆上独有的特产，你可以用它们来捕捉Modragon。当然还有火龙果，你的龙娘宝宝们可全靠它吃饱肚子！","Like Dragonball, designed to capture wild Modragons! and Pitaya as well, your Modragons loves Pitaya!","Like Dragonball, designed to capture wild Modragons! and Pitaya as well, your Modragons loves Pitaya!"],[200095,"Dialogue0103","Pitaya..?","火龙果又是啥。。","Pitaya..?","Pitaya..?"],[200096,"Dialogue0104","Those collectable red fruits are Pitaya, A delicate and juicy fruit, one of the favorite fruits of Modragons.","地上可采集的红色果实就是火龙果。果肉细腻无核，汁水丰盈，是野生Modragon最喜爱的果实之一。","Those collectable red fruits are Pitaya, A delicate and juicy fruit, one of the favorite fruits of Modragons.","Those collectable red fruits are Pitaya, A delicate and juicy fruit, one of the favorite fruits of Modragons."],[200097,"Dialogue0105","Collect? How?","如何才能采集呢？","Collect? How?","Collect? How?"],[200098,"Dialogue0106","Collectible items are usually floating items with light. Once you get close to them, the collect button will become available. Collect as many as you can!","可采集的物品通常会发光，靠近它们后采集的按钮就会自动出现，别忘记多留点备用哦！","Collectible items are usually floating items with light. Once you get close to them, the collect button will become available. Collect as many as you can!","Collectible items are usually floating items with light. Once you get close to them, the collect button will become available. Collect as many as you can!"],[200099,"Dialogue0107","Who are you?","你是谁？","Who are you?","Who are you?"],[200100,"Dialogue0108","I am Ricky, master of collection in this land. gonna be a rough time for you around here if you don't know how to collect!","我是瑞奇，这片大陆的采集导师。不懂采集的话在这片大陆可是很难混的！","I am Ricky, master of collection in this land. gonna be a rough time for you around here if you don't know how to collect!","I am Ricky, master of collection in this land. gonna be a rough time for you around here if you don't know how to collect!"],[200101,"Dialogue0109","Dragonowner, Welcome to DragonVerse Neo! Go get a Modragon before you get too lonely during your journey, they are great companions!","哟，新来的冒险家！欢迎来到DragonVerse Neo！想不想拥有一只乖巧无比的龙娘跟着你到处跑呢？","Dragonowner, Welcome to DragonVerse Neo! Go get a Modragon before you get too lonely during your journey, they are great companions!","Dragonowner, Welcome to DragonVerse Neo! Go get a Modragon before you get too lonely during your journey, they are great companions!"],[200102,"Dialogue0110","They don't bite...?","它不咬人吧。。","They don't bite...?","They don't bite...?"],[200103,"Dialogue0111","Ofcourse not! Modragons are your essential companions along the journey, boxing them takes skills!","你别打岔！龙娘是你接下来冒险的必要伴侣，捉不捉得到全凭自己！","Ofcourse not! Modragons are your essential companions along the journey, boxing them takes skills!","Ofcourse not! Modragons are your essential companions along the journey, boxing them takes skills!"],[200104,"Dialogue0112","Box? How?","怎么捉它呢","Box? How?","Box? How?"],[200105,"Dialogue0113","Just use your capture controller, but make sure you have sufficient Dragonball in your bag.","利用你的捕捉操纵杆即可，不过首先你要确保你的背包里有Dragonball","Just use your capture controller, but make sure you have sufficient Dragonball in your bag.","Just use your capture controller, but make sure you have sufficient Dragonball in your bag."],[200106,"Dialogue0114","Guaranteed?","100%捕捉？","Guaranteed?","Guaranteed?"],[200107,"Dialogue0115","Not that easy, but if you wanna increase the odds, make sure you release your dragonball in the \"perfect zone\". Also, it takes luck to box Modragons with tough personalities.","可没那么容易，想要提高你的捕捉成功率，你必须在完美区域释放你的Dragonball。性格不好的龙娘尤其难抓！","Not that easy, but if you wanna increase the odds, make sure you release your dragonball in the \"perfect zone\". Also, it takes luck to box Modragons with tough personalities.","Not that easy, but if you wanna increase the odds, make sure you release your dragonball in the \"perfect zone\". Also, it takes luck to box Modragons with tough personalities."],[200108,"Dialogue0116","They could be.. stubborn?","性格？","They could be.. stubborn?","They could be.. stubborn?"],[200109,"Dialogue0117","That's right, each Modragons has unique personality. Observe their personality in their name tag, helps you save your dragonball for sure!","没错，每个龙娘都有自己的性格。多观察龙娘头顶的性格，不要浪费自己的Dragonball哦！","That's right, each Modragons has unique personality. Observe their personality in their name tag, helps you save your dragonball for sure!","That's right, each Modragons has unique personality. Observe their personality in their name tag, helps you save your dragonball for sure!"],[200110,"Dialogue0118","Who are you?","你是谁？","Who are you?","Who are you?"],[200111,"Dialogue0119","I am Selina, master of dragon in this land. Who will say NO to a cute Modragon, right?!","我是瑟琳娜，这片大陆的捕龙专家。谁会拒绝一个可爱的龙娘呢！","I am Selina, master of dragon in this land. Who will say NO to a cute Modragon, right?!","I am Selina, master of dragon in this land. Who will say NO to a cute Modragon, right?!"],[200112,"Dialogue0120","And this time..we're gonna get funky!","接着奏乐，接着舞！","And this time..we're gonna get funky!","And this time..we're gonna get funky!"],[200113,"Dialogue0121","Dance? Damn!","还能跳舞？","Dance? Damn!","Dance? Damn!"],[200114,"Dialogue0122","That's for sure! Just click \"emote\" and get funky with some sick moves!","那肯定！点击“动作交互”就可以和NPC一起跳舞啦！","That's for sure! Just click \"emote\" and get funky with some sick moves!","That's for sure! Just click \"emote\" and get funky with some sick moves!"],[200115,"Dialogue0123","Who are you?","你是谁？","Who are you?","Who are you?"],[200116,"Dialogue0124","I am Barbara, master of emote in this land.","我是芭芭拉，这片大陆的动作大师！","I am Barbara, master of emote in this land.","I am Barbara, master of emote in this land."],[200117,"Dialogue0125","Hello, Dragonowner. The dawn is upon us, unseal the magic by converging the elemental power. New challenge shall be imposed!","你好，冒险家。黎明将至，汇聚元素之力，迎接新的挑战吧。","Hello, Dragonowner. The dawn is upon us, unseal the magic by converging the elemental power. New challenge shall be imposed!","Hello, Dragonowner. The dawn is upon us, unseal the magic by converging the elemental power. New challenge shall be imposed!"],[200118,"Dialogue0126","The dawn?","黎明将至？","The dawn?","The dawn?"],[200119,"Dialogue0127","Converge the power of the elementals, monoliths will be the hint.","汇聚元素之力，图腾会带给你答案。","Converge the power of the elementals, monoliths will be the hint.","Converge the power of the elementals, monoliths will be the hint."]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**名稱*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**測試000001*/
	get TestLanguageKey000001():ILanguageElement{return this.getElement(1)};
	/**測試品質*/
	get TestQualityName0001():ILanguageElement{return this.getElement(2)};
	/**測試背包物品*/
	get TestBagItemName0001():ILanguageElement{return this.getElement(3)};
	/**測試背包描述測試背包描述測試背包描述測試背包描述測試背包描述*/
	get TestBagItemDesc0001():ILanguageElement{return this.getElement(4)};
	/**測試區域*/
	get TestAreaName0001():ILanguageElement{return this.getElement(5)};
	/**歡迎來到Dragonverse Neo，成為這裡的一員！*/
	get Dialogue0001():ILanguageElement{return this.getElement(6)};
	/**Dragonverse Neo是個怎麼樣的世界？*/
	get Dialogue0002():ILanguageElement{return this.getElement(7)};
	/**Dragonverse Neo是一個全新的充滿樂趣的世界，你可以在這個世界中探索、發現、創造屬於你的一切！*/
	get Dialogue0003():ILanguageElement{return this.getElement(8)};
	/**我要怎麼體驗Dragonverse Neo？*/
	get Dialogue0004():ILanguageElement{return this.getElement(9)};
	/**輸入你的Code即可立馬體驗，還沒擁有Code？立即前往Landing Page獲取！*/
	get Dialogue0005():ILanguageElement{return this.getElement(10)};
	/**Code在手，我要出去*/
	get Dialogue0006():ILanguageElement{return this.getElement(11)};
	/**我還沒有Code，哪裡獲取*/
	get Dialogue0007():ILanguageElement{return this.getElement(12)};
	/**驗證···成功！恭喜你可以走出新手村落，盡情探索Dragonverse Neo吧~*/
	get Dialogue0008():ILanguageElement{return this.getElement(13)};
	/**Dragon位面球*/
	get BagItemName0001():ILanguageElement{return this.getElement(14)};
	/**火龍果*/
	get BagItemName0002():ILanguageElement{return this.getElement(15)};
	/**金幣*/
	get BagItemName0003():ILanguageElement{return this.getElement(16)};
	/**按下開關便可以捕捉Dragon，並封裝在內的位面球。*/
	get BagItemDesc0001():ILanguageElement{return this.getElement(17)};
	/**果肉細膩無核，汁水豐盈，是野生Dragon最喜愛的果實之一。*/
	get BagItemDesc0002():ILanguageElement{return this.getElement(18)};
	/**從遙遠的星空落下的神奇貨幣，看起來是很貴重的物品。*/
	get BagItemDesc0003():ILanguageElement{return this.getElement(19)};
	/**機警的*/
	get DragonCharacter0001():ILanguageElement{return this.getElement(20)};
	/**暴躁的*/
	get DragonCharacter0002():ILanguageElement{return this.getElement(21)};
	/**膽小的*/
	get DragonCharacter0003():ILanguageElement{return this.getElement(22)};
	/**易怒的*/
	get DragonCharacter0004():ILanguageElement{return this.getElement(23)};
	/**溫和的*/
	get DragonCharacter0005():ILanguageElement{return this.getElement(24)};
	/**火焰龍娘*/
	get DragonName00001():ILanguageElement{return this.getElement(25)};
	/**水浪龍娘*/
	get DragonName00002():ILanguageElement{return this.getElement(26)};
	/**木槿龍少*/
	get DragonName00003():ILanguageElement{return this.getElement(27)};
	/**岩石龍娘*/
	get DragonName00004():ILanguageElement{return this.getElement(28)};
	/**煉獄龍娘*/
	get DragonName00005():ILanguageElement{return this.getElement(29)};
	/**海洋龍娘*/
	get DragonName00006():ILanguageElement{return this.getElement(30)};
	/**森林龍娘*/
	get DragonName00007():ILanguageElement{return this.getElement(31)};
	/**山脈龍娘*/
	get DragonName00008():ILanguageElement{return this.getElement(32)};
	/**聖光龍娘*/
	get DragonName00009():ILanguageElement{return this.getElement(33)};
	/**暗影龍娘*/
	get DragonName00010():ILanguageElement{return this.getElement(34)};
	/**普通*/
	get QualityName0001():ILanguageElement{return this.getElement(35)};
	/**良好*/
	get QualityName0002():ILanguageElement{return this.getElement(36)};
	/**優秀*/
	get QualityName0003():ILanguageElement{return this.getElement(37)};
	/**稀有*/
	get QualityName0004():ILanguageElement{return this.getElement(38)};
	/**史詩*/
	get QualityName0005():ILanguageElement{return this.getElement(39)};
	/**傳說*/
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
	/**新手導師 · 奧利弗*/
	get CharacterName0001():ILanguageElement{return this.getElement(100101)};
	/**採集導師 · 瑞奇*/
	get CharacterName0002():ILanguageElement{return this.getElement(100102)};
	/**捕龍專家 · 瑟琳娜*/
	get CharacterName0003():ILanguageElement{return this.getElement(100103)};
	/**舞者 · 芭芭拉*/
	get CharacterName0004():ILanguageElement{return this.getElement(100104)};
	/**木元素智者 · 芬尼亞*/
	get CharacterName0005():ILanguageElement{return this.getElement(100105)};
	/**土元素智者 · 泰瑞克斯*/
	get CharacterName0006():ILanguageElement{return this.getElement(100106)};
	/**水元素智者 · 溫蒂妮*/
	get CharacterName0007():ILanguageElement{return this.getElement(100107)};
	/**火元素智者 · 艾莉婭*/
	get CharacterName0008():ILanguageElement{return this.getElement(100108)};
	/**神秘人*/
	get CharacterName0009():ILanguageElement{return this.getElement(100109)};
	/**木元素圖騰*/
	get CharacterName0010():ILanguageElement{return this.getElement(100110)};
	/**木元素圖騰*/
	get CharacterName0011():ILanguageElement{return this.getElement(100111)};
	/**火元素圖騰*/
	get CharacterName0012():ILanguageElement{return this.getElement(100112)};
	/**水元素圖騰*/
	get CharacterName0013():ILanguageElement{return this.getElement(100113)};
	/**龍吟村*/
	get AreaName0001():ILanguageElement{return this.getElement(100201)};
	/**出生點*/
	get AreaName0002():ILanguageElement{return this.getElement(100202)};
	/**碧波湖畔*/
	get AreaName0003():ILanguageElement{return this.getElement(100203)};
	/**遠古遺跡*/
	get AreaName0004():ILanguageElement{return this.getElement(100204)};
	/**神秘廢墟*/
	get AreaName0005():ILanguageElement{return this.getElement(100205)};
	/**冰霜天池*/
	get AreaName0006():ILanguageElement{return this.getElement(100206)};
	/**對話*/
	get CharacterInteract0001():ILanguageElement{return this.getElement(101001)};
	/**動作交互*/
	get CharacterInteract0002():ILanguageElement{return this.getElement(101002)};
	/**小陀螺*/
	get Danmu_Content_3129():ILanguageElement{return this.getElement(102129)};
	/**倒立旋轉*/
	get Danmu_Content_3130():ILanguageElement{return this.getElement(102130)};
	/**芭蕾*/
	get Danmu_Content_3131():ILanguageElement{return this.getElement(102131)};
	/**街舞*/
	get Danmu_Content_3132():ILanguageElement{return this.getElement(102132)};
	/**機械舞*/
	get Danmu_Content_3133():ILanguageElement{return this.getElement(102133)};
	/**鬼步舞*/
	get Danmu_Content_3134():ILanguageElement{return this.getElement(102134)};
	/**邁克爾*/
	get Danmu_Content_3135():ILanguageElement{return this.getElement(102135)};
	/**現代舞*/
	get Danmu_Content_3136():ILanguageElement{return this.getElement(102136)};
	/**團舞*/
	get Danmu_Content_3137():ILanguageElement{return this.getElement(102137)};
	/**比心*/
	get Danmu_Content_3138():ILanguageElement{return this.getElement(102138)};
	/**摟肩*/
	get Danmu_Content_3139():ILanguageElement{return this.getElement(102139)};
	/**歡呼*/
	get Danmu_Content_3140():ILanguageElement{return this.getElement(102140)};
	/**不服氣*/
	get Danmu_Content_3141():ILanguageElement{return this.getElement(102141)};
	/**兩隻老虎*/
	get Danmu_Content_3142():ILanguageElement{return this.getElement(102142)};
	/**PPAP*/
	get Danmu_Content_3143():ILanguageElement{return this.getElement(102143)};
	/**鼓掌*/
	get Danmu_Content_3144():ILanguageElement{return this.getElement(102144)};
	/**行禮*/
	get Danmu_Content_3145():ILanguageElement{return this.getElement(102145)};
	/**揮手*/
	get Danmu_Content_3146():ILanguageElement{return this.getElement(102146)};
	/**點贊*/
	get Danmu_Content_3147():ILanguageElement{return this.getElement(102147)};
	/**飛吻*/
	get Danmu_Content_3148():ILanguageElement{return this.getElement(102148)};
	/**生氣*/
	get Danmu_Content_3149():ILanguageElement{return this.getElement(102149)};
	/**比心*/
	get Danmu_Content_3150():ILanguageElement{return this.getElement(102150)};
	/**搖頭*/
	get Danmu_Content_3151():ILanguageElement{return this.getElement(102151)};
	/**哭泣*/
	get Danmu_Content_3152():ILanguageElement{return this.getElement(102152)};
	/**擁抱*/
	get Danmu_Content_3153():ILanguageElement{return this.getElement(102153)};
	/**雙人舞*/
	get Danmu_Content_3154():ILanguageElement{return this.getElement(102154)};
	/**打招呼*/
	get Danmu_Content_3155():ILanguageElement{return this.getElement(102155)};
	/**邁克爾*/
	get Danmu_Content_3156():ILanguageElement{return this.getElement(102156)};
	/**過肩摔*/
	get Danmu_Content_3157():ILanguageElement{return this.getElement(102157)};
	/**需要*元素龍才能解開該法陣*/
	get Dragontip_Content_0001():ILanguageElement{return this.getElement(102158)};
	/**背包*/
	get Bag_001():ILanguageElement{return this.getElement(105001)};
	/**龍娘*/
	get Bag_002():ILanguageElement{return this.getElement(105002)};
	/**物品*/
	get Bag_003():ILanguageElement{return this.getElement(105003)};
	/**跟隨*/
	get Bag_004():ILanguageElement{return this.getElement(105004)};
	/**休息*/
	get Bag_005():ILanguageElement{return this.getElement(105005)};
	/**數量*/
	get Bag_006():ILanguageElement{return this.getElement(105006)};
	/**點我復位*/
	get Reset_001():ILanguageElement{return this.getElement(105051)};
	/**開始採集*/
	get Collection_001():ILanguageElement{return this.getElement(105101)};
	/**採集成功*/
	get Collection_002():ILanguageElement{return this.getElement(105102)};
	/**採集失敗*/
	get Collection_003():ILanguageElement{return this.getElement(105103)};
	/**開始捕捉*/
	get Catch_001():ILanguageElement{return this.getElement(105201)};
	/**捕捉成功*/
	get Catch_002():ILanguageElement{return this.getElement(105202)};
	/**捕捉失敗*/
	get Catch_003():ILanguageElement{return this.getElement(105203)};
	/**您的DragonBall不足，無法捕捉。*/
	get Catch_004():ILanguageElement{return this.getElement(105204)};
	/**完美的*/
	get Catch_005():ILanguageElement{return this.getElement(105205)};
	/**一般的*/
	get Catch_006():ILanguageElement{return this.getElement(105206)};
	/**尊敬的MOBOX社區：*/
	get Code001():ILanguageElement{return this.getElement(105301)};
	/**在下方輸入您的Dragonkey驗證碼即可開始探索Dragonverse Neo刪檔內測的完整內容:*/
	get Code002():ILanguageElement{return this.getElement(105302)};
	/**輸入驗證碼*/
	get Code003():ILanguageElement{return this.getElement(105303)};
	/**驗證*/
	get Code004():ILanguageElement{return this.getElement(105304)};
	/**設置*/
	get Setting001():ILanguageElement{return this.getElement(105401)};
	/**修改昵稱*/
	get Setting002():ILanguageElement{return this.getElement(105402)};
	/**多語言*/
	get Setting003():ILanguageElement{return this.getElement(105403)};
	/**驗證*/
	get Setting004():ILanguageElement{return this.getElement(105404)};
	/**登出*/
	get Setting005():ILanguageElement{return this.getElement(105405)};
	/**修改形象*/
	get Setting006():ILanguageElement{return this.getElement(105406)};
	/**你的昵稱*/
	get Setting007():ILanguageElement{return this.getElement(105407)};
	/**拾取*/
	get TinyGameLanKey0001():ILanguageElement{return this.getElement(105501)};
	/**放下*/
	get TinyGameLanKey0002():ILanguageElement{return this.getElement(105502)};
	/**火球術*/
	get TinyGameLanKey0003():ILanguageElement{return this.getElement(105503)};
	/**恭喜通關小遊戲，請在背包中查收獎勵*/
	get TinyGameLanKey0004():ILanguageElement{return this.getElement(105504)};
	/**機警的火焰龍娘*/
	get BoxingDragonName00001():ILanguageElement{return this.getElement(105601)};
	/**暴躁的火焰龍娘*/
	get BoxingDragonName00002():ILanguageElement{return this.getElement(105602)};
	/**膽小的火焰龍娘*/
	get BoxingDragonName00003():ILanguageElement{return this.getElement(105603)};
	/**易怒的火焰龍娘*/
	get BoxingDragonName00004():ILanguageElement{return this.getElement(105604)};
	/**溫和的火焰龍娘*/
	get BoxingDragonName00005():ILanguageElement{return this.getElement(105605)};
	/**機警的水浪龍娘*/
	get BoxingDragonName00006():ILanguageElement{return this.getElement(105606)};
	/**暴躁的水浪龍娘*/
	get BoxingDragonName00007():ILanguageElement{return this.getElement(105607)};
	/**膽小的水浪龍娘*/
	get BoxingDragonName00008():ILanguageElement{return this.getElement(105608)};
	/**易怒的水浪龍娘*/
	get BoxingDragonName00009():ILanguageElement{return this.getElement(105609)};
	/**溫和的水浪龍娘*/
	get BoxingDragonName00010():ILanguageElement{return this.getElement(105610)};
	/**機警的木槿龍娘*/
	get BoxingDragonName00011():ILanguageElement{return this.getElement(105611)};
	/**暴躁的木槿龍娘*/
	get BoxingDragonName00012():ILanguageElement{return this.getElement(105612)};
	/**膽小的木槿龍娘*/
	get BoxingDragonName00013():ILanguageElement{return this.getElement(105613)};
	/**易怒的木槿龍娘*/
	get BoxingDragonName00014():ILanguageElement{return this.getElement(105614)};
	/**溫和的木槿龍娘*/
	get BoxingDragonName00015():ILanguageElement{return this.getElement(105615)};
	/**機警的岩石龍娘*/
	get BoxingDragonName00016():ILanguageElement{return this.getElement(105616)};
	/**暴躁的岩石龍娘*/
	get BoxingDragonName00017():ILanguageElement{return this.getElement(105617)};
	/**膽小的岩石龍娘*/
	get BoxingDragonName00018():ILanguageElement{return this.getElement(105618)};
	/**易怒的岩石龍娘*/
	get BoxingDragonName00019():ILanguageElement{return this.getElement(105619)};
	/**溫和的岩石龍娘*/
	get BoxingDragonName00020():ILanguageElement{return this.getElement(105620)};
	/**機警的煉獄龍娘*/
	get BoxingDragonName00021():ILanguageElement{return this.getElement(105621)};
	/**暴躁的煉獄龍娘*/
	get BoxingDragonName00022():ILanguageElement{return this.getElement(105622)};
	/**膽小的煉獄龍娘*/
	get BoxingDragonName00023():ILanguageElement{return this.getElement(105623)};
	/**易怒的煉獄龍娘*/
	get BoxingDragonName00024():ILanguageElement{return this.getElement(105624)};
	/**溫和的煉獄龍娘*/
	get BoxingDragonName00025():ILanguageElement{return this.getElement(105625)};
	/**機警的海洋龍娘*/
	get BoxingDragonName00026():ILanguageElement{return this.getElement(105626)};
	/**暴躁的海洋龍娘*/
	get BoxingDragonName00027():ILanguageElement{return this.getElement(105627)};
	/**膽小的海洋龍娘*/
	get BoxingDragonName00028():ILanguageElement{return this.getElement(105628)};
	/**易怒的海洋龍娘*/
	get BoxingDragonName00029():ILanguageElement{return this.getElement(105629)};
	/**溫和的海洋龍娘*/
	get BoxingDragonName00030():ILanguageElement{return this.getElement(105630)};
	/**機警的森林龍娘*/
	get BoxingDragonName00031():ILanguageElement{return this.getElement(105631)};
	/**暴躁的森林龍娘*/
	get BoxingDragonName00032():ILanguageElement{return this.getElement(105632)};
	/**膽小的森林龍娘*/
	get BoxingDragonName00033():ILanguageElement{return this.getElement(105633)};
	/**易怒的森林龍娘*/
	get BoxingDragonName00034():ILanguageElement{return this.getElement(105634)};
	/**溫和的森林龍娘*/
	get BoxingDragonName00035():ILanguageElement{return this.getElement(105635)};
	/**機警的山脈龍娘*/
	get BoxingDragonName00036():ILanguageElement{return this.getElement(105636)};
	/**暴躁的山脈龍娘*/
	get BoxingDragonName00037():ILanguageElement{return this.getElement(105637)};
	/**膽小的山脈龍娘*/
	get BoxingDragonName00038():ILanguageElement{return this.getElement(105638)};
	/**易怒的山脈龍娘*/
	get BoxingDragonName00039():ILanguageElement{return this.getElement(105639)};
	/**溫和的山脈龍娘*/
	get BoxingDragonName00040():ILanguageElement{return this.getElement(105640)};
	/**機警的聖光龍娘*/
	get BoxingDragonName00041():ILanguageElement{return this.getElement(105641)};
	/**暴躁的聖光龍娘*/
	get BoxingDragonName00042():ILanguageElement{return this.getElement(105642)};
	/**膽小的聖光龍娘*/
	get BoxingDragonName00043():ILanguageElement{return this.getElement(105643)};
	/**易怒的聖光龍娘*/
	get BoxingDragonName00044():ILanguageElement{return this.getElement(105644)};
	/**溫和的聖光龍娘*/
	get BoxingDragonName00045():ILanguageElement{return this.getElement(105645)};
	/**機警的暗影龍娘*/
	get BoxingDragonName00046():ILanguageElement{return this.getElement(105646)};
	/**暴躁的暗影龍娘*/
	get BoxingDragonName00047():ILanguageElement{return this.getElement(105647)};
	/**膽小的暗影龍娘*/
	get BoxingDragonName00048():ILanguageElement{return this.getElement(105648)};
	/**易怒的暗影龍娘*/
	get BoxingDragonName00049():ILanguageElement{return this.getElement(105649)};
	/**溫和的暗影龍娘*/
	get BoxingDragonName00050():ILanguageElement{return this.getElement(105650)};
	/**這附近有什麼有趣的東西嗎？*/
	get Dialogue0009():ILanguageElement{return this.getElement(200001)};
	/**喲，新來的冒險家！歡迎來到Dragonverse Neo，這裡可是個充滿奇妙的世界。看到地上那些五光十色的物體了嗎？那可是我們這裡的寶貝DragonBall。*/
	get Dialogue0010():ILanguageElement{return this.getElement(200002)};
	/**DragonBall？很厲害的樣子？*/
	get Dialogue0011():ILanguageElement{return this.getElement(200003)};
	/**沒錯！DragonBall是這片大陸上獨有的特產。你可以用它們來捕捉Modragon，也能用來合成一些有趣的東西。來，我教你如何辨認DragonBall。*/
	get Dialogue0012():ILanguageElement{return this.getElement(200004)};
	/**這些DragonBall有不同的顏色和紋理，代表著它們的不同稀有度，越稀有的DragonBall捕獲成功率越高。*/
	get Dialogue0013():ILanguageElement{return this.getElement(200005)};
	/**我要如何獲得DragonBall呢？*/
	get Dialogue0014():ILanguageElement{return this.getElement(200006)};
	/**對準它們，按下採集按鈕，就能輕鬆採集到手。*/
	get Dialogue0015():ILanguageElement{return this.getElement(200007)};
	/**原來如此，那邊的紅色果實又是什麼，可以吃嗎？*/
	get Dialogue0016():ILanguageElement{return this.getElement(200008)};
	/**那是我們的火龍果。果肉細膩無核，汁水豐盈，是野生Modragon最喜愛的果實之一。要採集火龍果，只需走到果樹下，按下採集按鈕即可。*/
	get Dialogue0017():ILanguageElement{return this.getElement(200009)};
	/**火龍果聽起來好好吃啊！*/
	get Dialogue0018():ILanguageElement{return this.getElement(200010)};
	/**是的，不僅好吃，而且還是一些合成材料的重要組成部分。收集一些火龍果，它們可能對你未來的冒險起到幫助。*/
	get Dialogue0019():ILanguageElement{return this.getElement(200011)};
	/**還有一種採集物我要介紹給你，那就是金幣。*/
	get Dialogue0020():ILanguageElement{return this.getElement(200012)};
	/**金幣？這也是一種採集物嗎？*/
	get Dialogue0021():ILanguageElement{return this.getElement(200013)};
	/**在我們的Dragonverse Neo中，金幣是一種非常重要的資源。它們從遙遠的星空落下，是很貴重的物品。你可以使用它與其他冒險家交易、購買物品，甚至用來合成一些珍貴的道具。*/
	get Dialogue0022():ILanguageElement{return this.getElement(200014)};
	/**原來天上掉金幣這種事是真的會發生啊！*/
	get Dialogue0023():ILanguageElement{return this.getElement(200015)};
	/**僅此一家，也只有在Dragonverse Neo中你才能體會到這種樂趣了！去吧，嘗試著採集一些DragonBall,火龍果和金幣吧。*/
	get Dialogue0024():ILanguageElement{return this.getElement(200016)};
	/**嘿，新冒險者，聽說你已經掌握了採集的技巧，那麼是不是也想要擁有屬於自己的小夥伴Modragon呢？*/
	get Dialogue0025():ILanguageElement{return this.getElement(200017)};
	/**來都來了，肯定要搞一隻吧。*/
	get Dialogue0026():ILanguageElement{return this.getElement(200018)};
	/**你倒是很坦誠嘛！其實，只需要使用DragonBall就可以捕捉到屬於你的Dragon了。先來瞭解一下如何使用DragonBall吧。*/
	get Dialogue0027():ILanguageElement{return this.getElement(200019)};
	/**看到這顆DragonBall了嗎？你可以通過Modragon捕獲面板的操縱杆，選擇它，然後投擲到想要捕捉的Modragon附近。不過，這可不是一件簡單的事情，每個Modragon都有自己的個性。*/
	get Dialogue0028():ILanguageElement{return this.getElement(200020)};
	/**個性？*/
	get Dialogue0029():ILanguageElement{return this.getElement(200021)};
	/**沒錯，每個Dragon都有五種個性，包括機警的、暴躁的、膽小的、易怒的、溫和的。而且，它們的個性還會影響到捕捉的難度。所以在捕捉之前，最好先瞭解一下你要捕捉的Modragon的個性。*/
	get Dialogue0030():ILanguageElement{return this.getElement(200022)};
	/**原來如此，我要怎麼瞭解它們的個性呢？*/
	get Dialogue0031():ILanguageElement{return this.getElement(200023)};
	/**很簡單，你只需要觀察Modragon頭上的名稱和顏色，他們會提示你這只Modragon的個性；總之，多觀察，你就能熟知它們的個性。*/
	get Dialogue0032():ILanguageElement{return this.getElement(200024)};
	/**聽上去很簡單的樣子。*/
	get Dialogue0033():ILanguageElement{return this.getElement(200025)};
	/**那當然了，沒有大家說的那麼難！*/
	get Dialogue0034():ILanguageElement{return this.getElement(200026)};
	/**我在說反話你聽不出來嗎？*/
	get Dialogue0035():ILanguageElement{return this.getElement(200027)};
	/**……，別在這陰陽怪氣了，我破例傳授你一個投擲訣竅，可以很好的提高你的捕獲概率。*/
	get Dialogue0036():ILanguageElement{return this.getElement(200028)};
	/**說來聽聽。*/
	get Dialogue0037():ILanguageElement{return this.getElement(200029)};
	/**記住，力度是關鍵，投擲的瞬間，如果力度指示器指標剛好擺動到最高檔力度區間（力度指示器中間最窄的那一檔），就能夠大大的提高捕獲的成功率哦。*/
	get Dialogue0038():ILanguageElement{return this.getElement(200030)};
	/**還有這種操作？你不會只告訴我一個人吧？*/
	get Dialogue0039():ILanguageElement{return this.getElement(200031)};
	/**...... 趕緊去試試吧，記得多捕捉一些Dragon，它們會成為你在Dragonverse Neo中的得力助手。*/
	get Dialogue0040():ILanguageElement{return this.getElement(200032)};
	/**Yo，新來的小夥伴！歡迎來到Dragonverse Neo！我是這片土地上的動作指導大師，隨意叫我巴巴。在這裡，你可以和我嬉笑打鬧，學習各種騷氣的動作。*/
	get Dialogue0041():ILanguageElement{return this.getElement(200033)};
	/**動作？比如說？*/
	get Dialogue0042():ILanguageElement{return this.getElement(200034)};
	/**點擊你的動作面板，選擇一個動作，保證比你想像中還要嗨！看我來給你演示一下~*/
	get Dialogue0043():ILanguageElement{return this.getElement(200035)};
	/**這個動作是我們這裡的代表性動作，你一學就能成為街頭巷尾的焦點。用它向其他冒險者示好，他們肯定會跟著你一起high起來。*/
	get Dialogue0044():ILanguageElement{return this.getElement(200036)};
	/**提醒你一下，有些動作可以提高他對你的好感度，而有些動作……你可得小心點，在%&￥#@導師那裡可千萬別做%*&@這個動作。*/
	get Dialogue0045():ILanguageElement{return this.getElement(200037)};
	/**額，還有這種操作。*/
	get Dialogue0046():ILanguageElement{return this.getElement(200038)};
	/**這就是所謂的見人說人話，見龍走龍步了吧。*/
	get Dialogue0047():ILanguageElement{return this.getElement(200039)};
	/**你好，冒險者，我身後的這篇木林名為“舉球消消樂”，它由一些機關和封印組成。*/
	get Dialogue0048():ILanguageElement{return this.getElement(200040)};
	/**裡面封印著什麼？*/
	get Dialogue0049():ILanguageElement{return this.getElement(200041)};
	/**如你所見，我被限制在此處無法移動，裡面究竟封印著什麼，我並清楚，*/
	get Dialogue0050():ILanguageElement{return this.getElement(200042)};
	/**無論如何，我會教你一些可能用的上的技能。*/
	get Dialogue0051():ILanguageElement{return this.getElement(200043)};
	/**現在，嘗試舉起木球吧。*/
	get Dialogue0052():ILanguageElement{return this.getElement(200044)};
	/**現在，嘗試放下木球。*/
	get Dialogue0053():ILanguageElement{return this.getElement(200045)};
	/**好了，冒險者，去一探究竟吧，祝你成功。*/
	get Dialogue0054():ILanguageElement{return this.getElement(200046)};
	/**還有其他線索嗎？*/
	get Dialogue0055():ILanguageElement{return this.getElement(200047)};
	/**仔細觀察周圍的環境，運用我教你的技能，或許你能找到一些線索。（教程完成後重複）*/
	get Dialogue0056():ILanguageElement{return this.getElement(200048)};
	/**你好，冒險者。這座迷陣是由古老的土元素魔法構成的。*/
	get Dialogue0057():ILanguageElement{return this.getElement(200049)};
	/**魔法陣？裡面封印了什麼東西嗎？*/
	get Dialogue0058():ILanguageElement{return this.getElement(200050)};
	/**很遺憾，我被困在這裡無法深入調查。但這片區域蘊藏濃厚的土元素，可能與土元素龍有關。*/
	get Dialogue0059():ILanguageElement{return this.getElement(200051)};
	/**不過，我可以教你一些技能，也許對你有所幫助。*/
	get Dialogue0060():ILanguageElement{return this.getElement(200052)};
	/**首先，從高處對準巨石板塊跳躍下去。*/
	get Dialogue0061():ILanguageElement{return this.getElement(200053)};
	/**不錯，這種向下的衝擊力能夠摧毀頂部的巨石板塊。*/
	get Dialogue0062():ILanguageElement{return this.getElement(200054)};
	/**很好，看來你已經準備好挑戰巨石迷陣了。祝你好運，冒險者。*/
	get Dialogue0063():ILanguageElement{return this.getElement(200055)};
	/**還有其他技巧嗎？*/
	get Dialogue0064():ILanguageElement{return this.getElement(200056)};
	/**仔細觀察巨石的形狀和顏色，也許會有隱藏的通道。（教程完成後重複）*/
	get Dialogue0065():ILanguageElement{return this.getElement(200057)};
	/**你好，冒險者。這片火炎地域被一種神秘的力量所影響。*/
	get Dialogue0066():ILanguageElement{return this.getElement(200058)};
	/**這裡有什麼值得一探究竟的嗎？*/
	get Dialogue0067():ILanguageElement{return this.getElement(200059)};
	/**我無法深入火炎地域，但我感受到封印中似乎含有大量的火元素。*/
	get Dialogue0068():ILanguageElement{return this.getElement(200060)};
	/**水與火是互相克制的關係，巧妙的運用水的力量，可以淨化火炎，反之亦然。*/
	get Dialogue0069():ILanguageElement{return this.getElement(200061)};
	/**幹得不錯，你成功將水池底部的岩漿淨化了，看來你已經無師自通了。*/
	get Dialogue0070():ILanguageElement{return this.getElement(200062)};
	/**還有其他技巧嗎？*/
	get Dialogue0071():ILanguageElement{return this.getElement(200063)};
	/**水可以淨化火炎，反之亦然。*/
	get Dialogue0072():ILanguageElement{return this.getElement(200064)};
	/**你好，冒險者。這片雲中迷宮充滿了水元素的力量。*/
	get Dialogue0073():ILanguageElement{return this.getElement(200065)};
	/**迷宮的盡頭是什麼？*/
	get Dialogue0074():ILanguageElement{return this.getElement(200066)};
	/**我感受到這片區域中有濃厚的水元素。但我無法親自前往調查。*/
	get Dialogue0075():ILanguageElement{return this.getElement(200067)};
	/**水與火是互相克制的關係，巧妙的運用火的力量，可以消散雲霧，反之亦然。*/
	get Dialogue0076():ILanguageElement{return this.getElement(200068)};
	/**還有其他技巧嗎？*/
	get Dialogue0077():ILanguageElement{return this.getElement(200069)};
	/**當你無法一個人完成任務是，考慮裝備你的寵物幫手吧。*/
	get Dialogue0078():ILanguageElement{return this.getElement(200070)};
	/**你還可以通過質押MBOX持有10000 veMBOX獲得Dragon Key，可前往 https: //www.mobox.io/#/neo 瞭解詳情。*/
	get Dialogue0079():ILanguageElement{return this.getElement(200071)};
	/**你好，冒險家。感受到我身後茂盛的木之能量了嗎？*/
	get Dialogue0080():ILanguageElement{return this.getElement(200072)};
	/**木之能量？那是什麼？*/
	get Dialogue0081():ILanguageElement{return this.getElement(200073)};
	/**這是一片由木之能量匯聚而成的迷陣，探索並解開其中的奧秘吧。*/
	get Dialogue0082():ILanguageElement{return this.getElement(200074)};
	/**你是誰？*/
	get Dialogue0083():ILanguageElement{return this.getElement(200075)};
	/**我是木元素智者，負責守護茂盛的木元素之力。*/
	get Dialogue0084():ILanguageElement{return this.getElement(200076)};
	/**你好，冒險家。在我的身後封印著強大的土之能量，巧妙地運用重力，用你的龍之身軀衝破這層封印吧！*/
	get Dialogue0085():ILanguageElement{return this.getElement(200077)};
	/**重力才是關鍵？*/
	get Dialogue0086():ILanguageElement{return this.getElement(200078)};
	/**你的龍之身軀蘊涵強大的能量，重力能幫助其擊碎堅硬的表面。*/
	get Dialogue0087():ILanguageElement{return this.getElement(200079)};
	/**你是誰？*/
	get Dialogue0088():ILanguageElement{return this.getElement(200080)};
	/**我是土元素智者泰瑞克斯，負責掌管堅硬的土元素之力。*/
	get Dialogue0089():ILanguageElement{return this.getElement(200081)};
	/**你好，冒險家。水生霧，霧生雲，撥雲方可見日。*/
	get Dialogue0090():ILanguageElement{return this.getElement(200082)};
	/**撥雲見日？*/
	get Dialogue0091():ILanguageElement{return this.getElement(200083)};
	/**迷宮將引導你。但首先，你需要克服雲之障礙。記住，水火乃相生相剋之物。*/
	get Dialogue0092():ILanguageElement{return this.getElement(200084)};
	/**你是誰？*/
	get Dialogue0093():ILanguageElement{return this.getElement(200085)};
	/**我是水元素智者溫蒂妮，流水之力輕柔但深邃，不可控制，只可順應。*/
	get Dialogue0094():ILanguageElement{return this.getElement(200086)};
	/**你好，冒險家。憤怒的火之煉獄正在咆哮，淨化它才是唯一的出路。*/
	get Dialogue0095():ILanguageElement{return this.getElement(200087)};
	/**何為凈化？*/
	get Dialogue0096():ILanguageElement{return this.getElement(200088)};
	/**在這片大陸，火與水相生相剋，水元素擁有淨化火元素的能力，相反亦是如此。*/
	get Dialogue0097():ILanguageElement{return this.getElement(200089)};
	/**你是誰？*/
	get Dialogue0098():ILanguageElement{return this.getElement(200090)};
	/**我是火元素智者艾莉婭，負責掌管並控制憤怒的火元素之力。*/
	get Dialogue0099():ILanguageElement{return this.getElement(200091)};
	/**哟，新来的冒险家！欢迎来到DragonVerse Neo！在开始冒险之前，你最好先了解一下一些物品的使用方法哦。*/
	get Dialogue0100():ILanguageElement{return this.getElement(200092)};
	/**物品？比如呢？*/
	get Dialogue0101():ILanguageElement{return this.getElement(200093)};
	/**比如说Dragonball，这是这片大陆上独有的特产，你可以用它们来捕捉Modragon。当然还有火龙果，你的龙娘宝宝们可全靠它吃饱肚子！*/
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
	/**利用你的捕捉操纵杆即可，不过首先你要确保你的背包里有Dragonball*/
	get Dialogue0113():ILanguageElement{return this.getElement(200105)};
	/**100%捕捉？*/
	get Dialogue0114():ILanguageElement{return this.getElement(200106)};
	/**可没那么容易，想要提高你的捕捉成功率，你必须在完美区域释放你的Dragonball。性格不好的龙娘尤其难抓！*/
	get Dialogue0115():ILanguageElement{return this.getElement(200107)};
	/**性格？*/
	get Dialogue0116():ILanguageElement{return this.getElement(200108)};
	/**没错，每个龙娘都有自己的性格。多观察龙娘头顶的性格，不要浪费自己的Dragonball哦！*/
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
	/**你好，冒险家。黎明将至，汇聚元素之力，迎接新的挑战吧。*/
	get Dialogue0125():ILanguageElement{return this.getElement(200117)};
	/**黎明将至？*/
	get Dialogue0126():ILanguageElement{return this.getElement(200118)};
	/**汇聚元素之力，图腾会带给你答案。*/
	get Dialogue0127():ILanguageElement{return this.getElement(200119)};

}