import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_Ch","Value_J","Value_D"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"TestLanguageKey000001","Test000001","测试000001","テスト000001","Testen Sie 000001"],[2,"TestQualityName0001","TestQuality","测试质量","テスト品質","Testqualität"],[3,"TestBagItemName0001","TestBagItem","测试背包物品","テストバッグアイテム","Testbeutel-Artikel"],[4,"TestBagItemDesc0001","TestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDesc","测试背包描述测试背包描述测试背包描述测试背包描述测试背包描述","テストバッグアイテムの説明","Testbeutel-Artikel-Desc "],[5,"TestAreaName0001","TestArea","测试区域","テストエリア","Testgelände"],[6,"Dialogue0001","Welcome to DragonVerse Neo and be a part of it!","欢迎来到DragonVerse Neo，成为这里的一员！","DragonVerse Neo へようこそ!","Willkommen bei DragonVerse Neo und sei ein Teil davon!"],[7,"Dialogue0002","What kind of world is DragonVerse Neo?","DragonVerse Neo是个怎么样的世界？","ドラゴンバース・ネオってどんな世界?","Was für eine Welt ist DragonVerse Neo?"],[8,"Dialogue0003","DragonVerse Neo is a new fun-filled world where you can explore, discover, and create everything yours!","DragonVerse Neo是一个全新的充满乐趣的世界，你可以在这个世界中探索、发现、创造属于你的一切！","DragonVerse Neoは、探索し、発見し、自分のものをすべて作成できる、新しい楽しさに満ちた世界です!","DragonVerse Neo ist eine neue, unterhaltsame Welt, in der du alles erforschen, entdecken und erschaffen kannst, was dir gehört!"],[9,"Dialogue0004","How can I experience DragonVerse Neo?","我要怎么体验DragonVerse Neo？","DragonVerse Neoを体験するにはどうすればいいですか?","Wie kann ich DragonVerse Neo erleben?"],[10,"Dialogue0005","Enter your code to experience it right away, don't have a code yet? Head over to Landing Page to get it now!","输入你的Code即可立马体验，还没拥有Code？立即前往Landing Page获取！","コードを入力するとすぐに体験できますが、まだコードをお持ちではありませんか?ランディングページにアクセスして、今すぐ入手してください!","Geben Sie Ihren Code ein, um es sofort zu erleben, Sie haben noch keinen Code? Gehen Sie zur Landing Page, um es jetzt zu erhalten!"],[11,"Dialogue0006","Code in my hand, I'm going to explore DragonVerse Neo","Code在手咯，我要探索DragonVerse Neo","コードを手に、ドラゴンバースネオを体験するつもりです","Mit dem Code in der Hand werde ich DragonVerse Neo erleben"],[12,"Dialogue0007","I don't have a code yet, get the code now","我还没有Code，立即获取Code","私はまだコードを持っていません、今すぐコードを入手してください","Ich habe noch keinen Code, holen Sie sich jetzt den Code"],[13,"Dialogue0008","Verification ··· Succeed! Congratulations on getting out of the beginner village and exploring DragonVerse Neo~","验证···成功！恭喜你可以走出新手村落，尽情探索DragonVerse Neo吧~","検証 ···継ぐ！初心者の村を出て、ドラゴンバースネオを探索したおめでとうございます~","Verifizierung ··· Gelingen! Herzlichen Glückwunsch, dass du das Anfängerdorf verlassen und DragonVerse Neo erkundet hast~"],[14,"BagItemName0001","DragonBall","Dragon位面球","ドラゴンボール","DragonBall"],[15,"BagItemName0002","Pitaya","火龙果","ドラゴンフルーツ","Drachenfrucht"],[16,"BagItemName0003","Gold","金币","金","Gold"],[17,"BagItemDesc0001","At the push of a switch, the Dragon can be captured and encapsulated in a plane sphere.","按下开关便可以捕捉Dragon，并封装在内的位面球。","スイッチを押すだけで、ドラゴンを捕らえ、平面の球体にカプセル化することができます。","Auf Knopfdruck kann der Drache eingefangen und in einer ebenen Kugel eingekapselt werden."],[18,"BagItemDesc0002","The flesh is delicate and seedless, and the juice is abundant, making it one of the favorite fruits of the wild Dragon.","果肉细腻无核，汁水丰盈，是野生Dragon最喜爱的果实之一。","果肉は繊細で種がなく、果汁が豊富で、野生のドラゴンのお気に入りの果物の1つになっています。","Das Fruchtfleisch ist zart und kernlos, und der Saft ist reichlich vorhanden, was sie zu einer der Lieblingsfrüchte des wilden Drachen macht."],[19,"BagItemDesc0003","The magical currency that falls from the distant starry sky looks like a very valuable item.","从遥远的星空落下的神奇货币，看起来是很贵重的物品。","遠くの星空から落ちてくる魔法の貨幣は、とても貴重なアイテムに見えます。","Die magische Währung, die vom fernen Sternenhimmel fällt, sieht aus wie ein sehr wertvoller Gegenstand."],[20,"DragonCharacter0001","Alert","机警的","アラート","Wachsam"],[21,"DragonCharacter0002","Grumpy","暴躁的","気難しい","Mürrisch"],[22,"DragonCharacter0003","Timid","胆小的","臆病","Schüchtern"],[23,"DragonCharacter0004","Irritable","易怒的","不機嫌な","Reizbar"],[24,"DragonCharacter0005","Mild","温和的","軽度","Leicht"],[25,"DragonName00001","Flame Wurm","火焰亚龙","フレイムワーム","Flammen-Wurm"],[26,"DragonName00002","Wave Wurm","水浪亚龙","ウェーブワーム","Welle Wurm"],[27,"DragonName00003","Hibiscus Wurm","木槿亚龙","ハイビスカスワーム","Hibiskus Wurm"],[28,"DragonName00004","Rock Wurm","岩石亚龙","ロックワーム","Rock Wurm"],[29,"DragonName00005","Infernal Dragon","炼狱巨龙","地獄の龍","Höllischer Drache"],[30,"DragonName00006","Ocean Dragon","海洋巨龙","オーシャンドラゴン","Ozean-Drache"],[31,"DragonName00007","Forest Dragon","森林巨龙","フォレストドラゴン","Wald-Drache"],[32,"DragonName00008","Mountain Dragon","山脉巨龙","マウンテンドラゴン","Berg-Drache"],[33,"DragonName00009","Light  Dragon","圣光巨龙","光のドラゴン","Licht-Drache"],[34,"DragonName00010","Shadow Dragon","暗影巨龙","シャドウドラゴン","Schatten-Drache"],[35,"QualityName0001","Common","普通","コモン","Gemeinsam"],[36,"QualityName0002","Uncommon","良好","珍しい","Ungewöhnlich"],[37,"QualityName0003","Unique","优秀","ユニーク","Einzigartig"],[38,"QualityName0004","Rare","稀有","珍","Selten"],[39,"QualityName0005","Epic","史诗","エピック","Episch"],[40,"QualityName0006","Legendary","传说","伝説","Sagenhaft"],[41,"ElementalName0001","Fire","火","火事","Feuer"],[42,"ElementalName0002","Water","水","水","Wasser"],[43,"ElementalName0003","Wood","木","木","Holz"],[44,"ElementalName0004","Earth","土","地球","Erde"],[45,"ElementalName0005","Light","光","光","Licht"],[46,"ElementalName0006","Dark","暗","暗い","Dunkel"]];
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
	/**欢迎来到DragonVerse Neo，成为这里的一员！*/
	get Dialogue0001():ILanguageElement{return this.getElement(6)};
	/**DragonVerse Neo是个怎么样的世界？*/
	get Dialogue0002():ILanguageElement{return this.getElement(7)};
	/**DragonVerse Neo是一个全新的充满乐趣的世界，你可以在这个世界中探索、发现、创造属于你的一切！*/
	get Dialogue0003():ILanguageElement{return this.getElement(8)};
	/**我要怎么体验DragonVerse Neo？*/
	get Dialogue0004():ILanguageElement{return this.getElement(9)};
	/**输入你的Code即可立马体验，还没拥有Code？立即前往Landing Page获取！*/
	get Dialogue0005():ILanguageElement{return this.getElement(10)};
	/**Code在手咯，我要探索DragonVerse Neo*/
	get Dialogue0006():ILanguageElement{return this.getElement(11)};
	/**我还没有Code，立即获取Code*/
	get Dialogue0007():ILanguageElement{return this.getElement(12)};
	/**验证···成功！恭喜你可以走出新手村落，尽情探索DragonVerse Neo吧~*/
	get Dialogue0008():ILanguageElement{return this.getElement(13)};
	/**Dragon位面球*/
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
	/**火焰亚龙*/
	get DragonName00001():ILanguageElement{return this.getElement(25)};
	/**水浪亚龙*/
	get DragonName00002():ILanguageElement{return this.getElement(26)};
	/**木槿亚龙*/
	get DragonName00003():ILanguageElement{return this.getElement(27)};
	/**岩石亚龙*/
	get DragonName00004():ILanguageElement{return this.getElement(28)};
	/**炼狱巨龙*/
	get DragonName00005():ILanguageElement{return this.getElement(29)};
	/**海洋巨龙*/
	get DragonName00006():ILanguageElement{return this.getElement(30)};
	/**森林巨龙*/
	get DragonName00007():ILanguageElement{return this.getElement(31)};
	/**山脉巨龙*/
	get DragonName00008():ILanguageElement{return this.getElement(32)};
	/**圣光巨龙*/
	get DragonName00009():ILanguageElement{return this.getElement(33)};
	/**暗影巨龙*/
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

}