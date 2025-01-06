import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_C","Value","Value_D","Value_E"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"ui_set_txt_1","Settings","设置","設定",null,"Настройки"],[2,"ui_set_txt_2","Audio","声音","オーディオ",null,"Звук"],[3,"ui_set_txt_3","BGM","背景音乐","BGM",null,"Фоновая музыка"],[4,"ui_set_txt_4","Low","低","低",null,"Меньше"],[5,"ui_set_txt_5","High","高","高",null,"Больше"],[6,"ui_set_txt_6","SFX","音效","効果音",null,"Звуковые эффекты"],[7,"ui_set_txt_7","Display","画面","表示",null,"Экран"],[8,"ui_set_txt_8","Image Quality","图像质量","画像品質",null,"Качество изображения"],[9,"ui_set_txt_9","Cull Distance","裁剪距离","カリング距離",null,"Расстояние отбраковки"],[10,"ui_set_txt_10","Saturation","饱和度","彩度",null,"Насыщенность"],[11,"ui_set_txt_11","Shadow Effect","阴影效果","シャドウエフェクト",null,"Эффект тени"],[12,"ui_set_txt_12","Operation","操作","操作",null,"Режим"],[13,"ui_set_txt_13","FOV","视野缩放","視野角",null,"Поле зрения"],[14,"battal_dead_01","Defeat","战败","敗北",null,"Поражение"],[15,"battal_dead_02","by {0}","{0}击败了你","{0}によって",null,"от {0}"],[16,"battal_dead_03","Skills lost, you're now returning to Peace Area...","你的技能已失去，即将返回安全区！","スキルを失いました、現在安全地帯に戻ります...",null,"Навыки потеряны, вы теперь возвращаетесь в Зону Мира..."],[17,"battal_dead_04","Welcome back! You won a total of {0} coins in the last round. Keep going!","欢迎归来！上一局你一共获得了{0}金币，继续加油","お帰りなさい！前回のラウンドでコインを合計{0}枚獲得しました。これからも頑張ってください！",null,"Добро пожаловать назад! В последнем раунде вы выиграли в общей сложности {0} монет. Продолжайте!"],[18,"Prefab_name_1","Skill Box","技能盲盒","スキルボックス",null,"Ящик с навыками"],[19,"Prefab_name_2","Health Potion","血瓶","体力ポーション",null,"Целебное зелье"],[20,"Prefab_name_3","Coin","金币","コイン",null,"Монета"],[21,"Scene_name_1","Join battle","战场传送","Join battle",null,"Join battle"],[22,"Shop_btn_1","Wings","翅膀","ウィング",null,"Крылья"],[23,"Shop_btn_2","Tailings","拖尾","トレイル",null,"Маршруты"],[24,"Shop_btn_3","Apply","装扮","適用",null,"Применить"],[25,"Shop_btn_4","Applied","已装扮","適用済み",null,"Применён"],[26,"Shop_btn_5","Purchase","购买","購入",null,"Купить"],[27,"Shop_btn_6","Return","返回","戻る",null,"Вернуться"],[28,"battal_world_nameLV_20","Truce Area","安全区","安全地帯",null,"Зона мира"],[29,"battal_world_nameLV_21","Rumble Field","顶上战场","ランブルフィールド",null,"Поле боя"],[30,"LandParces_1","A new batch of supplies is about to be delivered!","新一批物资即将刷新！","間もなく新しい補給物資が届きます！",null,"Новая партия припасов вот-вот будет доставлена!"],[31,"LandParces_2","The ground is about to change! Watch out!","地面即将发生变化！请小心！","注意！地面が変わろうとしています！",null,"Земля вот-вот изменится! Будьте осторожны!"],[32,"SkillSelect_1","New skill: {0}","新技能：{0}","新しいスキル: {0}",null,"Новый навык: {0}"],[33,"SkillSelect_2","Obtained {0} coins!","获得{0}金币","コインを{0}枚獲得！",null,"Получено {0} монет!"],[34,"WeaponTip_1","Applied","已拥有","適用済み",null,"Применён"],[35,"WeaponTip_2","Confirm to spend {0} coins on this weapon?","是否花费{0}进行购买","この武器に{0}枚のコインを使用しますか？",null,"Вы хотите потратить {0} монет на это оружие?"],[36,"WeaponTip_3","Spent {0} coins!","消耗{0}金币","コイン{0}枚を使用しました！",null,"Потрачено {0} монет!"],[37,"WeaponTip_4","Unable to switch weapons now. Try again after completing the battle.","当前无法切换武器，完成战局后再来吧","現在武器を切り替えることはできません。戦闘終了後に再度お試しください！",null,"Невозможно сменить оружие сейчас. Попробуйте снова после завершения битвы."],[38,"SkillSelect_3","New skill slot! Go apply an additional skill!","技能点+1，请点击技能页面按钮使用","新しいスキルスロットができました！追加スキルを適用しましょう！",null,"Новый слот для навыка! Примените дополнительный навык!"],[39,"SkillSelect_4","New skill slot! Select a skill to apply!","技能点+1，请选择技能","新しいスキルスロットできました！適用するスキルを選択してください！",null,"Новый слот для навыка! Выберите навык для применения!"],[40,"Pendant_Wing_1","<color=#FFFF00>Soaring Phoenix</color>: Woven from the feathers of the Phoenix. Adds a small bonus to the player's attack damage.","<color=#FFFF00>【凤舞九天】</color>凤凰火焰所织就的翅膀，给佩戴者带来少量攻击力加成","<color=#FFFF00>舞い上がるフェニックス</color>: フェニックスの羽で製作。装備者の攻撃力をわずかに向上。",null,"<color=#FFFF00>Восходящий Феникс</color>: соткан из перьев Феникса. Добавляет небольшой бонус к атаке носителя."],[41,"Pendant_Wing_2","<color=#FFFF00>Scarlet Bat</color>: Wings of shadowed king-bat. Brings omni-vamp effect to the player.","<color=#FFFF00>【血蝠】</color>幽冥蝠王力量所化，给佩戴者带来少量血量与吸血加成","<color=#FFFF00>スカーレットバット</color>: ネザーバットの翼の化身。装備者にライフスティール効果を与える。",null,"<color=#FFFF00>Алая Летучая мышь</color>: Крылья воплощения адской летучей мыши. Приносят эффект кражи жизни носителю."],[42,"Pendant_Wing_3","<color=#FFFF00>Cupid</color>: Filled with the power of God Cupid. Adds a small bonus to max health and damage reduction effects.","<color=#FFFF00>【丘比特】</color>蕴含丘比特之力，给佩戴者带来少量减伤与血量加成","<color=#FFFF00>イノセントキューピッド</color>: キューピッドが着用した物のコピー。体力とダメージ軽減効果をわずかに向上。",null,"<color=#FFFF00>Невинный Купидон</color>: Копия той, которую носит Купидон. Добавляет небольшой бонус к здоровью и эффекту снижения урона."],[43,"Pendant_Wing_4","<color=#FFFF00>ShadowFall</color>: Made with the darkness of nights. Boosts the player's crit rate and crit damage.","<color=#FFFF00>【暗夜】</color>残夜之力，给佩戴者带来少量暴击率和暴击伤害加成","<color=#FFFF00>ダークナイト</color>: 暗闇で製作。装備者のクリティカル率とクリティカルダメージを増加。",null,"<color=#FFFF00>Темная Ночь</color>: Сделана из темноты ночей. Увеличивает шанс критического удара и урон от критического удара носителя."],[44,"Pendant_Wing_5","<color=#FFFF00>Hearty Angel</color>: Synthesized from the power of love. Brings a huge bonus to health and damage reduction effects.","<color=#FFFF00>【爱心天使】</color>爱的力量，给佩戴者带来大量血量和减伤加成","<color=#FFFF00>ラブリーエンジェル</color>: 愛の力で合成。体力とダメージ軽減効果を大幅に向上。",null,"<color=#FFFF00>Прекрасный Ангел</color>: Синтезирован из силы любви. Приносит огромный бонус к здоровью и эффекту снижения урона."],[45,"Pendant_Trail_1","<color=#FFFF00>Comet Tailiing</color>: Brings a small bonus to the player's attack damage.","<color=#FFFF00>【彗星拖尾】</color>给佩戴者带来少量攻击加成","<color=#FFFF00>彗星のトレイル</color>: 装備者の攻撃力をわずかに向上。",null,"<color=#FFFF00>Хвост кометы</color>: Приносит небольшой бонус к атаке носителя."],[46,"Pendant_Trail_2","<color=#FFFF00>Meteor Tailing</color>: Adds a small bonus to max health.","<color=#FFFF00>【启明星拖尾】</color>给佩戴者带来少量血量加成","<color=#FFFF00>明けの明星</color>: 体力をわずかに向上。",null,"<color=#FFFF00>Утренняя звезда</color>: Добавляет небольшой бонус к здоровью."],[47,"Pendant_Trail_3","<color=#FFFF00>Frosty Tailing</color>: Brings damage reduction effect to the player.","<color=#FFFF00>【冰雪拖尾】</color>给佩戴者带来少量减伤加成","<color=#FFFF00>フローズンランド</color>: 装備者にダメージ軽減効果を与える。",null,"<color=#FFFF00>Замороженная земля</color>: Приносит эффект снижения урона носителю."],[48,"Pendant_Trail_4","<color=#FFFF00>Candy Tailing</color>: Adds a huge bonus to max health.","<color=#FFFF00>【糖果拖尾 】</color>给佩戴者带来大量血量加成","<color=#FFFF00>キャンディクラッシュ</color>: 体力を大幅に向上。",null,"<color=#FFFF00>Сладкое безумие</color>: Добавляет огромный бонус к здоровью."],[49,"Pendant_Trail_5","<color=#FFFF00>Maple Tailing</color>: Adds a huge bonus to the player's attack damage and omni-vamp effects.","<color=#FFFF00>【枫叶拖尾】</color>给佩戴者带来大量攻击与吸血加成","<color=#FFFF00>メープルリーフ</color>: 装備者の攻撃力とライフスティール効果を大幅に向上。",null,"<color=#FFFF00>Кленовый лист</color>: Добавляет огромный бонус к атаке носителя и эффект кражи жизни."],[50,"KillTip_1","{0} has achieved <color=#FFF230>Double Kill</color>!","{0}达成<color=#FFF230>二连胜</color>","{0}が<color=#FFF230>ダブルキル</color>を達成！",null,"{0} достиг <color=#FFF230>Двойного убийства</color>!"],[51,"KillTip_2","{0} has achieved <color=#FFF230>Trible Kill</color>!","{0}达成<color=#FFF230>三连胜</color>","{0}が<color=#FFF230>トリプルキル</color>を達成！",null,"{0} достиг <color=#FFF230>Тройного убийства</color>!"],[52,"KillTip_3","{0} has achieved <color=#FFF230>Field Dominator</color>!","{0}已经<color=#FFF230>统治战场</color>","{0}が<color=#FFF230>フィールドドミネーター</color>を達成！",null,"{0} достиг <color=#FFF230>Доминирования на поле боя</color>!"],[53,"KillTip_4","{0} has achieved <color=#FFF230>Rumble Legend</color>!","{0}已经<color=#FFF230>超神</color>","{0}が<color=#FFF230>ランブルレジェンド</color>を達成！",null,"{0} достиг <color=#FFF230>Легенды землетрясения</color>"],[54,"KillTip_5","Triple Kill","三连绝世","トリプルキル",null,"Тройное убийство"],[55,"KillTip_6","Field Dominator","统治战场","フィールドドミネーター",null,"Доминирования на поле боя"],[56,"KillTip_7","Rumble Legend","超神之躯","ランブルレジェンド",null,"Легенда землетрясения"],[57,"Shop_tips_1","Purchase successful!","购买成功！","購入しました！",null,"Покупка успешна!"],[58,"Shop_tips_2","Not enough coins!","金币不足！","コインが足りません！",null,"Недостаточно монет!"],[59,"Prefab_name_4","Wyvern Shard · <color=#F6663A>Attack↑</color>","龙鳞丹·<color=#F6663A>攻击↑</color>","ワイバーンの欠片 · <color=#F6663A>攻撃↑</color>",null,"Осколок виверны · <color=#F6663A>Атака↑</color>"],[60,"Prefab_name_5","Tortoise Shard · <color=#F6663A>Damage Reduction↑</color>","龟甲丹·<color=#F6663A>减伤↑</color>","亀の欠片 · <color=#F6663A>ダメージ軽減↑</color>",null,"Осколок черепахи · <color=#F6663A>Снижение урона↑</color>"],[61,"Prefab_name_6","Calcium Shard · <color=#F6663A>Health↑</color>","生骨丹·<color=#F6663A>血量↑</color>","カルシウムの欠片 · <color=#F6663A>体力↑</color>",null,"Осколок кальция · <color=#F6663A>Здоровье↑</color>"],[62,"Prefab_name_7","Qi Shard · <color=#F6663A>Energy↑</color>","养气丹·<color=#F6663A>能量↑</color>","ソースの欠片 · <color=#F6663A>エネルギー↑</color>",null,"Осколок источника · <color=#F6663A>Энергия↑</color>"],[63,"Dialog_Npc_1","Go test your strength and dive into combat!","小的们，就以下方区域作为试炼力量的场所，尽情对战吧！咦~你怎么还在这，快下去塔塔开！","そのフィールドを力試しの場所として、思う存分に戦いなさい！ さあ、戦いを楽しんできなさい！",null,"Используйте это поле как место, чтобы проверить свою силу, и сражайтесь в свое удовольствие, ребята! Эй, почему вы все еще здесь? Идите и устройте драку!"],[64,"Dialog_Npc_2","Imagine the good old days, when I got my rep as the <color=#F6663A>King warrior of Dragonverse Neo</color>.","想当年，也是在这片战场上，立下了我<color=#F6663A>Dragonverse Neo第一战士</color>的威名，哈哈哈哈~","かつて、私もこのフィールドで<color=#F6663A>海の戦士</color>という称号を手に入れました",null,"Тогда, много лет назад, именно на этом поле я установил свой титул как <color=#F6663A>Воин моря</color>."],[65,"Dialog_Npc_3","uhh..The nostalgia rushing thru my body..","怎么回事，看见对面的建筑，有流泪的冲动，明明是第一次来到这里。","私はどうしたんだろう？初めてここに来たとき、ただ建物を眺めるだけで泣きたい気持ちになってきた",null,"Что со мной не так? Впервые находясь здесь, я почувствовал непреодолимое желание заплакать, глядя на это здание."],[66,"Name_Npc_1","Pirate Captain","海盗船长","海賊船長",null,"Капитан пиратов"],[67,"Name_Npc_2","King Sailor","第一水手","独学の船乗り",null,"Самоучка-моряк"],[68,"Name_Npc_3","Scarf Boy","围巾少年","スカーフボーイ",null,"Мальчик в шарфе"],[69,"SkillSelect_5","Skill Details","新技能","詳細",null,"Детали"],[70,"SkillSelect_6","Skill Briefs","显示简略技能","簡潔",null,"Краткое описание"],[71,"Name_Npc_4","Sword Master","第一剑客","ソードマスター",null,"Мастер меча"],[72,"Name_Npc_5","Magic Enchanter","魔导师","魔導士",null,"Магический наставник"],[73,"Dialog_Npc_Tap_1","About skills","请教拳术","スキルについて相談",null,"Консультация по навыкам"],[74,"Dialog_Npc_6","<color=#F6663A>Gale Enclosure</color> is a rare control skill. Master it!","狂风聚集是难得的控制技能，建议学习~","<color=#F6663A>ゲイルエンクロージャー</color>は珍しいコントロールスキルです。しっかりと学んでください。",null,"<color=#F6663A>Клетка для бури</color> - редкий контролирующий навык. Убедитесь, что вы хорошо его изучили."],[75,"Dialog_Npc_Tap_2","Learning skills?","学习技能？","スキルを学ぶ？",null,"Изучение навыков?"],[76,"Dialog_Npc_7","There are <color=#F6663A>random skill boxes</color> on the rumble field. Pick up to gain a new skill!","战场上有名为<color=#F6663A>【技能盲盒】</color>的物件，触碰即可习得新技能！","ランブルフィールドには<color=#F6663A>ランダムスキルボックス</color>があります。タッチすると新しいスキルを獲得できます！",null,"На поле боя есть <color=#F6663A>случайные ящики с навыками</color>. Прикоснитесь к одному, чтобы получить новый навык!"],[77,"Pendant_Wing_6","<color=#FFFF00>Nebula</color>: Adds a huge bonus to the player's crit rate.","<color=#FFFF00>【星云】</color>给佩戴者带来大量暴击率加成","<color=#FFFF00>星雲の雲</color>: 装備者のクリティカル率を大幅に向上。",null,"<color=#FFFF00>Облако тумана</color>: Добавляет огромный бонус к показателю критического удара владельца."],[78,"Pendant_Trail_6","<color=#FFFF00>HexaStar</color>: Adds a small bonus to the player's crit resistance.","<color=#FFFF00>【六芒星】</color>给佩戴者带来少量抗暴加成","<color=#FFFF00>ヘキサマスコット</color>: 装着者のクリティカル耐性を小幅に向上。",null,"<color=#FFFF00>Маскот гекса</color>: Добавляет небольшой бонус к сопротивлению критическим ударам владельца."],[79,"battal_dead_05","defeated","击败","敗北",null,"Потерпел поражение"],[80,"Dialog_Npc_8","I'm the Sword Master!","我乃西域第一剑客！","私ですか？私はこの地域のソードマスターです。",null,"Кто, я? Я - Мастер меча этого региона."],[81,"Dialog_Npc_Tap_3","Consult on skills","请教剑术","スキルについて相談",null,"Консультация по навыкам"],[82,"Dialog_Npc_9","Swiftness conquers all.. Therefore, <color=#F6663A>Thunder Draw</color> is a must-learn.","剑术之道，唯快不破。所以，<color=#F6663A>【引雷入体】</color>乃必学身法。","ソードには速さが求められます。だからこそ、<color=#F6663A>サンダードロー</color>は必ず学ぶべきです。",null,"Путь владения мечом - это быстрота. Поэтому <color=#F6663A>Молниеносный выпад</color> - это навык, который необходимо изучить."],[83,"Rank_text_1","Top Slayers","最强击杀王","トップスレイヤー",null,"Лучшие убийцы"],[84,"Rank_text_2","Rank","排名","ランク",null,"Ранг"],[85,"Rank_text_3","Player","昵称","プレイヤー",null,"Игрок"],[86,"Rank_text_4","Defeats","击败数","撃破数",null,"Победы"],[87,"Rank_text_5","Top Survivors","最强生存王","トップサバイバー",null,"Лучшие выжившие"],[88,"Rank_text_6","Time","时长","時間",null,"Время"],[89,"Shop_name_1","Shop","商店","ショップ",null,"Магазин"],[90,"Prefab_name_8","Character Shard","化形丹","キャラクターの欠片",null,"Фрагмент персонажа"],[91,"Weapon_Name_1","Striker Gauntlet","冲击拳套","拳",null,"Кулак"],[92,"Weapon_Name_2","Thunder Katana","轰雷刀","サンダーナイフ",null,"Молниеносный нож"],[93,"Weapon_Name_3","Illuminum Staff","光之杖","ライトピラー",null,"Световой столб"],[94,"Name_Npc_Masco_1","Wandering Pomni","闲逛的帕姆尼","放浪のポムニ",null,"Странствующий Помни"],[95,"Name_Skill_Normal_1","Sprint","冲刺","スプリント",null,"Спринт"],[96,"Name_Skill_Normal_2","Jump","跳跃","ジャンプ",null,"Прыжок"],[97,"Name_Skill_Normal_3","Fall","倒地","落下",null,"Падение"],[98,"Name_Skill_Normal_4","Attack","普攻","攻撃",null,"Атака"],[99,"Name_Skill_Fist_1","<color=#5DBF4DFF>Ground Wave</color>","<color=#5DBF4DFF>四方震击</color>","<color=#5DBF4DFF>グラウンドウェーブ</color>",null,"<color=#5DBF4DFF>Волна земли</color>"],[100,"Name_Skill_Fist_2","<color=#5DBF4DFF>Earthline Break</color>","<color=#5DBF4DFF>地脉震动</color>","<color=#5DBF4DFF>アースラインブレイク</color>",null,"<color=#5DBF4DFF>Разрыв земной линии</color>"],[101,"Name_Skill_Fist_3","<color=#5DBF4DFF>Gravity Impact</color>","<color=#5DBF4DFF>引力冲击</color>","<color=#5DBF4DFF>フォースインパクト</color>",null,"<color=#5DBF4DFF>Воздействие силы</color>"],[102,"Name_Skill_Fist_4","<color=#5DBF4DFF>Full Charge</color>","<color=#5DBF4DFF>蓄力冲拳</color>","<color=#5DBF4DFF>フルチャージ</color>",null,"<color=#5DBF4DFF>Полный заряд</color>"],[103,"Name_Skill_Fist_5","<color=#5DBF4DFF>Air Burst</color>","<color=#5DBF4DFF>震地空爆</color>","<color=#5DBF4DFF>エアバースト</color>",null,"<color=#5DBF4DFF>Взрыв в воздухе</color>"],[104,"Name_Skill_Fist_6","<color=#9357BFFF>Battle Roar</color>","<color=#9357BFFF>战吼</color>","<color=#9357BFFF>バトルロア</color>",null,"<color=#9357BFFF>Боевой рев</color>"],[105,"Name_Skill_Fist_7","<color=#3B93BFFF>Air Explosion</color>","<color=#3B93BFFF>轰雷震爆</color>","<color=#3B93BFFF>エアエクスプロージョン</color>",null,"<color=#3B93BFFF>Взрыв в воздухе</color>"],[106,"Name_Skill_Fist_8","<color=#3B93BFFF>Shoryuken</color>","<color=#3B93BFFF>升龙冲拳</color>","<color=#3B93BFFF>ドラゴンスクラッチ</color>",null,"<color=#3B93BFFF>Царапина дракона</color>"],[107,"Name_Skill_Fist_9","<color=#3B93BFFF>Gale Enclosure</color>","<color=#3B93BFFF>狂风聚集</color>","<color=#3B93BFFF>ゲイルエンクロージャー</color>",null,"<color=#3B93BFFF>Ограждение урагана</color>"],[108,"Name_Skill_Fist_10","<color=#9357BFFF>Power Surge</color>","<color=#9357BFFF>源力涌动</color>","<color=#9357BFFF>パワーサージ</color>",null,"<color=#9357BFFF>Всплеск силы</color>"],[109,"Name_Skill_Thunder_1","<color=#5DBF4DFF>Thunder Kenki</color>","<color=#5DBF4DFF>轰雷剑气</color>","<color=#5DBF4DFF>サンダーケンキ</color>",null,"<color=#5DBF4DFF>Молниеносный нож</color>"],[110,"Name_Skill_Thunder_2","<color=#5DBF4DFF>Thunder Bomb</color>","<color=#5DBF4DFF>雷霆轰击</color>","<color=#5DBF4DFF>サンダーボム</color>",null,"<color=#5DBF4DFF>Молниеносная бомба</color>"],[111,"Name_Skill_Thunder_3","<color=#5DBF4DFF>Phoenix Trace</color>","<color=#5DBF4DFF>燕返</color>","<color=#5DBF4DFF>バードトレース</color>",null,"<color=#5DBF4DFF>След птицы</color>"],[112,"Name_Skill_Thunder_4","<color=#9357BFFF>Lightening Strike</color>","<color=#9357BFFF>巨雷一击</color>","<color=#9357BFFF>グレートヒット</color>",null,"<color=#9357BFFF>Мощный удар</color>"],[113,"Name_Skill_Thunder_5","<color=#5DBF4DFF>Senpu</color>","<color=#5DBF4DFF>千鸟</color>","<color=#5DBF4DFF>バードクラウド</color>",null,"<color=#5DBF4DFF>Толпа птиц</color>"],[114,"Name_Skill_Thunder_6","<color=#3B93BFFF>Thunder Spell</color>","<color=#3B93BFFF>引雷</color>","<color=#3B93BFFF>サンダーストライク</color>",null,"<color=#3B93BFFF>Удар грома</color>"],[115,"Name_Skill_Thunder_7","<color=#3B93BFFF>Thunder Slash</color>","<color=#3B93BFFF>雷霆连斩</color>","<color=#3B93BFFF>サンダースラッシュ</color>",null,"<color=#3B93BFFF>Разряд грома</color>"],[116,"Name_Skill_Thunder_8","<color=#9357BFFF>Thunder Buff</color>","<color=#9357BFFF>引雷入体</color>","<color=#9357BFFF>サンダードロー</color>",null,"<color=#9357BFFF>Молниеносный удар</color>"],[117,"Name_Skill_Thunder_9","<color=#3B93BFFF>Thunder Field</color>","<color=#3B93BFFF>聚雷阵</color>","<color=#3B93BFFF>サンダーフィールド</color>",null,"<color=#3B93BFFF>Молниеносное поле</color>"],[118,"Name_Skill_Thunder_10","<color=#9357BFFF>Raikiri</color>","<color=#9357BFFF>雷切</color>","<color=#9357BFFF>サンダースリット</color>",null,"<color=#9357BFFF>Молниеносный разрез</color>"],[119,"Name_Skill_Light_1","<color=#5DBF4DFF>Light's Descent</color>","<color=#5DBF4DFF>光明降临</color>","<color=#5DBF4DFF>ライトアライバル</color>",null,"<color=#5DBF4DFF>Прибытие света</color>"],[120,"Name_Skill_Light_2","<color=#5DBF4DFF>Light Shock</color>","<color=#5DBF4DFF>光之冲击</color>","<color=#5DBF4DFF>ライトショック</color>",null,"<color=#5DBF4DFF>Удар света</color>"],[121,"Name_Skill_Light_3","<color=#5DBF4DFF>Flash of Radiance</color>","<color=#5DBF4DFF>炫光一闪</color>","<color=#5DBF4DFF>ライトグレア</color>",null,"<color=#5DBF4DFF>Световой блеск</color>"],[122,"Name_Skill_Light_4","<color=#5DBF4DFF>Luminating Heal</color>","<color=#5DBF4DFF>光明疗愈</color>","<color=#5DBF4DFF>ライトヒール</color>",null,"<color=#5DBF4DFF>Световое исцеление</color>"],[123,"Name_Skill_Light_5","<color=#5DBF4DFF>Bright Missle</color>","<color=#5DBF4DFF>光之飞弹</color>","<color=#5DBF4DFF>ブライトミサイル</color>",null,"<color=#5DBF4DFF>Яркая ракета</color>"],[124,"Name_Skill_Light_6","<color=#3B93BFFF>Time Cage</color>","<color=#3B93BFFF>时光禁锢</color>","<color=#3B93BFFF>ライトケージ</color>",null,"<color=#3B93BFFF>Световая клетка</color>"],[125,"Name_Skill_Light_7","<color=#3B93BFFF>Holy Domain</color>","<color=#3B93BFFF>圣焰领域</color>","<color=#3B93BFFF>ホーリードメイン</color>",null,"<color=#3B93BFFF>Священная территория</color>"],[126,"Name_Skill_Light_8","<color=#3B93BFFF>Converging Cannon</color>","<color=#3B93BFFF>聚能光炮</color>","<color=#3B93BFFF>ライトキャノン</color>",null,"<color=#3B93BFFF>Световая пушка</color>"],[127,"Name_Skill_Light_9","<color=#9357BFFF>Holy Blessing</color>","<color=#9357BFFF>光之庇佑</color>","<color=#9357BFFF>ホーリーブレッシング</color>",null,"<color=#9357BFFF>Священное благословение</color>"],[128,"Name_Skill_Light_10","<color=#9357BFFF>Flame Enchantment</color>","<color=#9357BFFF>光焰附魔</color>","<color=#9357BFFF>フレイムエンチャントメント</color>",null,"<color=#9357BFFF>Огненное заклинание</color>"],[129,"Name_Skill_Light_3_2","Light Glare II","炫光一闪第二段","ライトグレア II",null,"Световой блеск II"],[130,"Introduce_Skill_Fist_Sim_1","Manipulate the vibration of space to attack the surroundings.","操控空间震动，向四周造成攻击","空間を振動させ、周囲の敵を攻撃する。",null,"Манипулируйте вибрацией пространства, чтобы атаковать окружающую среду"],[131,"Introduce_Skill_Fist_Sim_2","Manipulate the vibration of the earthlines, causing three-time damage to the front.","操控地脉震动，向前方造成三次伤害","地脈の振動を使って、前方の敵に三段階攻撃を与える。",null,"Манипулируйте вибрацией земных линий, вызывая трехкратный урон спереди"],[132,"Introduce_Skill_Fist_Sim_3","Unleash the power of the earth and attack the enemy in front.","引动大地之力，冲击面前的敌人","大地の力を解放し、前方の敵を攻撃する。",null,"Освободите силу земли и атакуйте врага спереди"],[133,"Introduce_Skill_Fist_Sim_4","Draw out the power deep within your body and bombard the enemy ahead.","引出身体深处的力量，轰击前方敌人","体の奥にある力を解放して、前方の敵を爆撃する。",null,"Извлеките силу, глубоко скрытую в вашем теле, и обрушьте ее на врага впереди"],[134,"Introduce_Skill_Fist_Sim_5","Draw source power into your hands, causing explosive damage.","将源力引至手中并轰击地面，对四周敌人造成爆炸伤害","ソースパワーを手に集中させて、敵を爆撃する。",null,"Втяните источник силы в свои руки, вызывая взрывной урон"],[135,"Introduce_Skill_Fist_Sim_6","Absorb the power from surroundings to increase your attack by 5.","吸收四周的力量强化自身，提升自己5攻击力，同时震开四周的敌人","周囲から力を吸収し、攻撃力を5増加させる。",null,"Поглотите силу из окружающей среды, чтобы увеличить вашу атаку на 5"],[136,"Introduce_Skill_Fist_Sim_7","Shake the air and trigger thunder towards the enemy in front.","震动空气引动雷霆，飞身砸向前方的敌人","空気を振動させ、前方の敵に雷攻撃を与える。",null,"Встряхните воздух и вызовите удар молнии в сторону врага впереди"],[137,"Introduce_Skill_Fist_Sim_8","Cast the mad dragon and launch a three-stage explosive attack upwards.","施放狂龙之气，向上打出三段爆炸攻击","狂龍を召喚し、上方に三段階攻撃を与える。",null,"Бросьте безумного дракона и запустите трехэтапную взрывную атаку вверх"],[138,"Introduce_Skill_Fist_Sim_9","Fly out and affect the surrounding air, causing the wind to gather.","飞身而出牵动四周的空气，引发狂风聚集","飛び上がって周囲の空気に影響を与え、風を寄せ集める。",null,"Взлетите и воздействуйте на окружающий воздух, вызывая скопление ветра"],[139,"Introduce_Skill_Fist_Sim_10","Mobilize the source energy around and shake to repel the enemies around.","调动四周的源力并震荡，击退四周的敌人","ソースエネルギーで周囲を振動させ、敵を撃退する。",null,"Мобилизуйте окружающую энергию источника и встряхните, чтобы оттолкнуть врагов вокруг"],[140,"Introduce_Skill_Thunder_Sim_1","Draw thunder power and wave sword energy forward.","引动自身雷霆之力向前方挥出一道轰雷剑气","雷の力を使って前方の敵にソードエネルギーで攻撃を与える。",null,"Втяните силу молнии и направьте энергию меча вперед"],[141,"Introduce_Skill_Thunder_Sim_2","Summon thunder to bombard the forward area three times.","召唤天雷轰击前方区域三次","雷を召喚して、前方の敵を三回爆撃する。",null,"Призовите молнию, чтобы трижды обстрелять переднюю область"],[142,"Introduce_Skill_Thunder_Sim_3","Leap behind and knock enemies back, pulling thunder and charging forward.","向身后跃起并震退敌人，在空中牵动雷霆附体并向前方发动冲击","後ろに跳び、敵を後退させながら雷を引きつけて前進する。",null,"Прыгните за спину и отбросьте врагов назад, притягивая молнию и устремляясь вперед"],[143,"Introduce_Skill_Thunder_Sim_4","Gather all strength and slam on the ground violently.","凝聚自身全部力量，短暂蓄力后猛烈砸向脚下","全ての力を集めて地面に激しく叩きつける。",null,"Соберите всю силу и сильно ударьте по земле"],[144,"Introduce_Skill_Thunder_Sim_5","Transform into thunder and stab forward.","化身雷霆，向前方进行突刺","雷に変身して前方を突き刺す。",null,"Преобразиться в молнию и нанести удар вперед"],[145,"Introduce_Skill_Thunder_Sim_6","Inject thunder power into the blade, calling for thunderstorms to bombard the enemies.","灌注雷力于刀身，呼唤雷暴持续轰击四周的敌人","刃に雷の力を注ぎ、雷雨を呼び寄せて敵を爆撃する。",null,"Впрыснуть силу молнии в клинок, вызывая грозовые бури, чтобы атаковать врагов"],[146,"Introduce_Skill_Thunder_Sim_7","Invoke the thunder power to swing forward and cut out three times.","引动自身雷霆之力向前方用力挥砍出三道剑气","雷の力を呼び出し、前方の敵を三回切り裂く。",null,"Призвать силу молнии, чтобы нанести удар вперед и разрезать три раза"],[147,"Introduce_Skill_Thunder_Sim_8","Control the thunder to attack and increase your speed.","牵动雷霆附于自身，增加自身移动速度","雷を操って攻撃を行い、移動速度を増加させる。",null,"Контролировать молнию для атаки и увеличения скорости"],[148,"Introduce_Skill_Thunder_Sim_9","Concentrate all thunder power, adsorbing all enemies to the front.","凝聚自身雷力于一点，将四周所有敌人吸引至面前","雷の力を集中させて、前方の敵を吸収する。",null,"Сосредоточить всю силу молнии, поглощая всех врагов спереди"],[149,"Introduce_Skill_Thunder_Sim_10","Cast thunder and slash many sections of sword energy forward.","施放雷霆的力量挥出雷神一斩，向前方大范围斩出多段剑气","雷を放ちながら大量のソードエネルギーを前方の敵に斬りつける。",null,"Бросить молнию и нанести множество ударов энергией меча вперед"],[150,"Introduce_Skill_Light_Sim_1","Unleash the power of light and rain down on the enemy.","施放光明之力，向前方降下灭敌光雨","光の力を解放して、敵に攻撃を与える。",null,"Освободить силу света и обрушить её на врага"],[151,"Introduce_Skill_Light_Sim_2","Gather energy and continue to cast light onward.","聚集能量，持续向前方施放光明冲击","エネルギーを集めて、光を前方の敵に放ち続ける。",null,"Собрать энергию и продолжать бросать свет вперед"],[152,"Introduce_Skill_Light_Sim_3","Incarnate into light, flash to the current position, and cast a shock.","化身为光，随后闪烁至当前所看位置并施放冲击","光に変身した後、現在位置にフラッシュしてショックを与える。",null,"Воплотиться в свет, вспыхнуть в текущем положении и нанести удар"],[153,"Introduce_Skill_Light_Sim_4","Invoke the power of light, bless the earth, and obtain healing effects.","引动光明的力量，祝福大地，持续获得治疗效果","光の力を呼び出し、大地に祝福を与え、治癒効果を獲得。",null,"Призвать силу света, благословить землю и получить исцеляющий эффект"],[154,"Introduce_Skill_Light_Sim_5","Wave the staff quickly and cast the light missile.","快速挥舞法杖，施放出光明飞弹","杖を素早く振り、光のミサイルを放つ。",null,"Быстро взмахнуть посохом и выпустить световой снаряд"],[155,"Introduce_Skill_Light_Sim_6","Invoke the power of light and stun the hit enemy.","引动光明之力并飞出，眩晕命中的敌人","光の力を呼び出し、当たった敵を麻痺状態にさせる。",null,"Призвать силу света и оглушить пораженного врага"],[156,"Introduce_Skill_Light_Sim_7","Burn the ground with light, causing continuous damage to the enemy.","使用光明之力灼烧面前的大地，对敌人造成持续伤害","光で地面を焼き付き、敵に連続ダメージを与える。",null,"Поджечь землю светом, нанося непрерывный урон врагу"],[157,"Introduce_Skill_Light_Sim_8","Gather light on the front line and bombard the enemy.","聚集光明于一线，轰击面前的敌人并禁锢","前方に光を集め、敵を爆撃する。",null,"Собрать свет на передней линии и обстрелять врага"],[158,"Introduce_Skill_Light_Sim_9","Obtain the blessing of light and gain damage reduction effect.","获得光明祝福，庇佑自身获得减伤","光の祝福を得て、ダメージ軽減効果を獲得。",null,"Получить благословение света и получить эффект снижения урона"],[159,"Introduce_Skill_Light_Sim_10","Invoke the fire of light, enchant the staff, and cause a scorching attack.","引动光明之火，附魔法杖，造成灼烧攻击","光の炎を呼び出し、杖に魔法をかけて灼熱攻撃を与える。",null,"Призвать огонь света, зачаровать посох и вызвать обжигающую атаку"],[160,"Introduce_Skill_Fist_De_1","Consume energy by 25 and manipulate the space to deal 200% damage to the surroundings.","消耗25能量，操控空间震动，向四周造成四次200%伤害的攻击",null,null,"Потребляет 25 энергии и манипулирует пространством, нанося 200% урона окружению."],[161,"Introduce_Skill_Fist_De_2","Consume energy by 25, manipulate the earthlines to deal 100%, 150%, 200% three-stage damage.","消耗25能量，操控地脉震动，向前方造成三次100%/150%/200%的伤害",null,null,"Потребляет 25 энергии и манипулирует земными линиями, нанося 100%, 150%, 200% трехэтапный урон."],[162,"Introduce_Skill_Fist_De_3","Consume energy by 25, activate the power of the earth to deal damage twice, and launch a 200% damage impact in front.","消耗25能量，引动大地之力，冲击面前的敌人，造成两次100%的伤害，之后牵引力量向正前方发动一次200%伤害的冲击",null,null,"Потребляет 25 энергии, активирует силу земли, наносит урон дважды и запускает 200% урон впереди."],[163,"Introduce_Skill_Fist_De_4","Consume energy by 50, draw out the deep power, and deal 400% damage to the surrounding area.","消耗50能量，引出深处的力量，轰击前方敌人，对自身周围造成一次400%的伤害",null,null,"Потребляет 50 энергии, высвобождает глубокую силу и наносит 400% урона окружающему пространству."],[164,"Introduce_Skill_Fist_De_5","Consume energy by 25, direct source energy to bombard the ground, dealing 200% blast damage and slowing the enemies down by 50% for 3s.","消耗25能量，将源力引至手中并轰击地面，对四周敌人造成200%伤害的爆炸伤害，并减速50%，持续3秒",null,null,"Потребляет 25 энергии, направляет энергию источника для бомбардировки земли, нанося 200% урона от взрыва и замедляя врагов на 50% на 3 секунды."],[165,"Introduce_Skill_Fist_De_6","Consume energy by 25, increase attack by 50% for 5s, and cause 100% attack damage to the surrounding area.","消耗50能量，吸收四周的力量强化自身，提升自己50%的攻击力，持续5秒。同时震开四周的敌人，造成100%攻击力的伤害",null,null,"Потребляет 25 энергии, увеличивает атаку на 50% на 5 секунд и наносит 100% урона от атаки окружающему пространству."],[166,"Introduce_Skill_Fist_De_7","Consume energy by 55, trigger thunder to smash the front, deal 200% damage, and imprison the enemies for 2s.","消耗55能量，震动空气引动雷霆，飞身砸向前方的敌人，对落点造成200%伤害并禁锢四周的敌人2秒",null,null,"Потребляет 55 энергии, вызывает удар молнии, наносит 200% урона и заключает врагов в тюрьму на 2 секунды."],[167,"Introduce_Skill_Fist_De_8","Consume energy by 55, fire three explosive attacks upwards, causing 50%, 100%, and 150% damage. Enemies hit by the last attack will be stunned for 3s.","消耗55点能量，施放狂龙之气，向上打出三段爆炸攻击，造成50%/100%/150%的伤害，被最后一段攻击命中的敌人会眩晕3秒",null,null,"Потребляет 55 энергии, производит три взрыва вверх, нанося 50%, 100% и 150% урона. Враги, пораженные последней атакой, будут оглушены на 3 секунды."],[168,"Introduce_Skill_Fist_De_9","Consume energy by 55, gather strong winds to deal 50% damage 3 times, and adsorb enemies around for 3s.","消耗55点能量，飞身而出牵动四周的空气，引发狂风聚集，对落点造成3次50%的伤害并吸引四周的敌人，持续3秒",null,null,"Потребляет 55 энергии, собирает сильные ветры, чтобы нанести 50% урона 3 раза, и поглощает врагов вокруг на 3 секунды."],[169,"Introduce_Skill_Fist_De_10","Consume energy by 25, repel enemies around and deal 150% damage. Gain a 25% damage reduction effect, increasing the damage taken by the hit enemy by 50% for 5s.","消耗50能量，调动四周的源力并震荡，击退四周的敌人并造成150%伤害，同时使自身获得25%减伤效果，使被击中的敌人受到的伤害增加50%，持续5秒",null,null,"Потребляет 25 энергии, отталкивает врагов вокруг и наносит 150% урона. Получает эффект снижения урона на 25%, увеличивая урон, получаемый пораженным врагом, на 50% на 5 секунд."],[170,"Introduce_Skill_Thunder_De_1","Consume energy by 25, swing a thunderbolt sword energy forward, dealing 200% damage to the enemy hit.","消耗25能量，引动自身雷霆之力向前方挥出一道轰雷剑气，对命中的敌人造成200%伤害",null,null,"Потребляет 25 энергии, наносит удар молниеносным мечом энергии вперед, нанося 200% урона пораженному врагу."],[171,"Introduce_Skill_Thunder_De_2","Consume energy by 50, summon thunder to bombard the area ahead three times, each dealing 150% damage and slowing down by 10% for 3s.","消耗50能量，召唤天雷轰击前方区域三次，每次轰击造成150%伤害，并减速10%，持续3秒",null,null,"Потребляет 50 энергии, призывает молнию, чтобы трижды бомбардировать область впереди, каждый раз нанося 150% урона и замедляя на 10% на 3 секунды."],[172,"Introduce_Skill_Thunder_De_3","Consume energy by 50, leap behind and repel the enemy, dealing 50% damage 3 times. Cause 150% damage once after landing, repelling the enemy and slowing them down by 10% for 3s.","消耗50能量，向身后跃起并震退敌人，在空中牵动雷霆附体并向前方发动冲击，期间造成3次50%伤害，落地后造成一次150%伤害，击退敌人并减速10%，持续3秒",null,null,"Потребляет 50 энергии, прыгает за спину врага и отталкивает его, нанося 50% урона 3 раза. Наносит 150% урона один раз после приземления, отталкивает врага и замедляет его на 10% на 3 секунды."],[173,"Introduce_Skill_Thunder_De_4","Consume energy by 75, smash violently to the ground after a short period of storage, causing five times 100% damage to the surrounding area.","消耗75能量，凝聚自身全部力量，短暂蓄力后猛烈砸向脚下，对四周造成5次100%伤害",null,null,"Потребляет 75 энергии, сильно бьет по земле после короткого периода накопления, нанося пятикратный 100% урон окружающему пространству."],[174,"Introduce_Skill_Thunder_De_5","Consume energy by 50, transform into thunder and pierce forward, dealing 400% damage to enemies on the sides.","消耗50点能量，化身雷霆，向前方进行突刺，对沿途经过的敌人造成400%伤害",null,null,"Потребляет 50 энергии, превращается в молнию и пронзает вперед, нанося 400% урона врагам по бокам."],[175,"Introduce_Skill_Thunder_De_6","Consume energy by 75, call for thunderstorms to bombard the surrounding enemies, causing 12 consecutive damage and slowing the hit enemy by 10% for 3s.","消耗75能量，灌注雷力于刀身，呼唤雷暴持续轰击四周的敌人，连续造成12次伤害，伤害随时间增加，依次为15%/30%/45%/60%，并对命中的敌人减速10%，持续3秒",null,null,"Потребляет 75 энергии, вызывает грозу, чтобы бомбардировать окружающих врагов, нанося 12 последовательных ударов и замедляя пораженного врага на 10% на 3 секунды."],[176,"Introduce_Skill_Thunder_De_7","Consume energy by 50, trigger thunder to slash forward, causing 80%, 100%, and 120% damage in turn and slowing the hit enemy by 10% for 3s.","消耗50点能量，引动自身雷霆之力向前方用力挥砍出三道剑气，依次造成80%/100%/120%伤害，并对命中的敌人减速10%，持续3秒",null,null,"Потребляет 50 энергии, вызывает удар молнии, чтобы нанести 80%, 100% и 120% урона по очереди и замедлить пораженного врага на 10% на 3 секунды."],[177,"Introduce_Skill_Thunder_De_8","Consume energy by 100, absorb the power of thunder and increase speed by 80% in 10s.","消耗100点能量，牵动雷霆附于自身，10秒内增加自身80%移动速度",null,null,"Потребляет 100 энергии, поглощает силу молнии и увеличивает скорость на 80% в течение 10 секунд."],[178,"Introduce_Skill_Thunder_De_9","Consume energy by 75, concentrate all thunder power, dealing 200% damage to all enemies adsorbed to the front.","消耗75点能量，凝聚自身雷力于一点，将四周所有敌人吸引至面前，并造成200%伤害",null,null,"Потребляет 75 энергии, концентрирует всю силу молнии, нанося 200% урона всем врагам, поглощенным спереди."],[179,"Introduce_Skill_Thunder_De_10","Consume energy by 75, cast thunder to slash multiple times in a wide area forward, each dealing 150% damage and slowing the hit enemy by 10% for 3s.","消耗75点能量，施放雷霆的力量挥出雷神一斩，向前方大范围斩出多段剑气，每段剑气造成150%伤害并对命中的敌人减速10%，持续3秒",null,null,"Потребляет 75 энергии, наносит удар молнией, нанося 150% урона несколько раз в широкой области впереди, замедляя пораженного врага на 10% на 3 секунды."],[180,"Introduce_Skill_Light_De_1","Unleash the power of light and rain down on the enemy, causing 10 40% damage.","施放光明之力，向前方降下灭敌光雨，对面前区域造成10次40%的伤害",null,null,"Освобождает силу света и обрушивает ее на врага, нанося 10 раз по 40% урона."],[181,"Introduce_Skill_Light_De_2","Cast light impact forward, dealing 10 30% damage to the straight front area and causing 10% deceleration.","聚集能量，持续向前方施放光明冲击，对前方直线区域持续造成10次30%伤害，并造成10%减速",null,null,"Наносит удар светом вперед, нанося 10 раз по 30% урона прямо перед собой и вызывая замедление на 10%."],[182,"Introduce_Skill_Light_De_3","Incarnate into light, flash to the current position, and deal 300% damage to the landing area.","化身为光，随后闪烁至当前所看位置并施放冲击，对落地范围造成300%伤害",null,null,"Превращается в свет, вспыхивает на текущей позиции и наносит 300% урона при приземлении."],[183,"Introduce_Skill_Light_De_4","Attract the power of light to obtain healing effects continuously, recovering 20% attack 20 times within the skill range.","引动光明的力量，祝福大地，持续获得治疗效果，技能范围内持续恢复20次20%攻击力的血量",null,null,"Притягивает силу света для получения непрерывного исцеления, восстанавливая 20% атаки 20 раз в пределах радиуса действия навыка."],[184,"Introduce_Skill_Light_De_5","Wave your staff quickly and cast 12 light missiles that track enemies, each dealing 10% damage and slowing down by 2%.","快速挥舞法杖，施放出12个可追踪敌人的光明飞弹，每个飞弹造成10%伤害并减速2%",null,null,"Быстро взмахивает посохом и выпускает 12 световых ракет, которые отслеживают врагов, каждая наносит 10% урона и замедляет на 2%."],[185,"Introduce_Skill_Light_De_6","Invoke the power of light and stun the hit enemy for 1s, causing 200% damage.","引动光明之力并飞出，眩晕命中的敌人1秒，并造成200%伤害",null,null,"Призывает силу света и оглушает пораженного врага на 1 секунду, нанося 200% урона."],[186,"Introduce_Skill_Light_De_7","Burn the ground with light to cause continuous damage to the enemy, 20% damage each time.","使用光明之力灼烧面前的大地，对敌人造成持续伤害，每次伤害20%",null,null,"Поджигает землю светом, нанося врагу непрерывный урон, по 20% каждый раз."],[187,"Introduce_Skill_Light_De_8","Gather light on the front line to bombard and imprison the enemy for 3s, causing 500% damage.","聚集光明于一线，轰击面前的敌人并禁锢3秒，造成500%的伤害",null,null,"Собирает свет на передней линии, чтобы бомбардировать и заключить врага в тюрьму на 3 секунды, нанося 500% урона."],[188,"Introduce_Skill_Light_De_9","Obtain the blessing of light and gain a 40% damage reduction effect that continues for 8s.","获得光明祝福，庇佑自身获得40%减伤，持续8秒",null,null,"Получает благословение света и получает эффект снижения урона на 40%, который длится 8 секунд."],[189,"Introduce_Skill_Light_De_10","Trigger the fire of light and enchant the staff, causing 20% damage-over-time for 2s.","引动光明之火，附魔法杖，使攻击造成20%持续2秒的dot伤害",null,null,"Активирует огонь света и зачаровывает посох, нанося 20% урона в течение 2 секунд."],[190,"UI_SkillSelect_BtnTxt_1","Apply","替换","適用",null,"Применить"],[191,"UI_SkillSelect_BtnTxt_2","Select","选择","適用",null,"Применить"],[192,"UI_SkillSelect_BtnTxt_3","Applied","已拥有","適用済み",null,"Примененный"],[193,"UI_SkillSelect_BtnTxt_4","Later","稍后选择","後で",null,"Позже"],[194,"UI_SkillSelect_BtnTxt_5","Cancel(G)","放弃（G）","キャンセル",null,"Отменить"],[195,"UI_SkillSelect_BtnTxt_6","Select a skill you want to replace.","选择一个技能将其替换↘","置き換えたいスキルを選択してください。",null,"Выберите навык, который вы хотите заменить"],[196,"UI_SkillSelect_BtnTxt_7","Return","返回","戻る",null,"Вернуться"],[197,"Shop_tips_3","Operation too frequent!","点击过快","操作が頻繁すぎます！",null,"Операция слишком частая!"],[198,"Dialog_Npc_Btn_1","Dialogue","对话","対話",null,"Диалог"],[199,"Dialog_Npc_Btn_2","Done","结束对话","それでいいです。",null,"Все в порядке."],[200,"Text_MainUI_2","Low energy.","能量不足","エネルギーが少ないです。",null,"Низкий уровень энергии."],[201,"action_1","Kiss","亲亲","キス",null,"Поцелуй"],[202,"action_2","Judge","指指点点","判断",null,"Судья"],[203,"action_3","Agree","赞同","同意",null,"Согласен"],[204,"action_4","Disagree","摇头","反対",null,"Не согласен"],[205,"action_5","Laugh","大笑","笑う",null,"Смех"],[206,"action_6","Cry","哭","泣く",null,"Плач"],[207,"action_7","Photo","拍照","写真",null,"Фото"],[208,"action_8","Photo 2","拍照2","写真 2",null,"Фото 2"],[209,"action_9","Applaud","鼓掌","拍手する",null,"Аплодисменты"],[210,"action_10","Yawn","打哈欠","あくび",null,"Зевать"],[211,"action_11","Cheer","欢呼","応援",null,"Приветствие"],[212,"action_12","Salute","敬礼","敬礼",null,"Салютовать"],[213,"action_13","Confused","困惑","困惑",null,"Смущенный"],[214,"action_14","Surprised","惊喜","驚き",null,"Удивленный"],[215,"action_15","Hands Up","举手","手を挙げる",null,"Руки вверх"],[216,"action_16","Arrested","逮捕","逮捕された",null,"Арестованный"],[217,"action_17","Injured","受伤","負傷",null,"Раненый"],[218,"action_18","Sit","坐下","座る",null,"Сидеть"],[219,"action_19","Sit 2","坐下2","座る 2",null,"Сидеть 2"],[220,"action_20","Lie Down","躺","横になる",null,"Лежать"],[221,"action_21","Sneak","潜行","忍び足",null,"Красться"],[222,"action_22","Jump","跳跃","ジャンプ",null,"Прыгать"],[223,"action_23","Backflip","后空翻","バックフリップ",null,"Сальто назад"],[224,"action_24","Happy","开心","幸せ",null,"Счастливый"],[225,"action_25","Painful","痛苦","苦痛",null,"Болезненный"],[226,"action_26","Crawl","爬行","はう",null,"Ползти"],[227,"action_27","Aerobics","健身操","エアロビクス",null,"Аэробика"],[228,"action_28","Growl","咆哮","唸る",null,"Рычать"],[229,"action_29","Bored","无聊","退屈",null,"Скучать"],[230,"action_30","Sad","悲伤","悲しい",null,"Грустить"],[231,"action_31","Balance","平衡","バランス",null,"Баланс"],[232,"action_32","Dance 1","舞蹈1","ダンス 1",null,"Танец 1"],[233,"action_33","Dance 2","舞蹈2","ダンス 2",null,"Танец 2"],[234,"action_34","Dance 3","舞蹈3","ダンス 3",null,"Танец 3"],[235,"action_35","Dance 4","舞蹈4","ダンス 4",null,"Танец 4"],[236,"action_36","Dance 5","舞蹈5","ダンス 5",null,"Танец 5"],[237,"action_37","Upside Down","仰面朝天","逆さま",null,"Вверх ногами"],[238,"action_38","Get Down","趴下","降りる",null,"Спуститься"],[239,"action_39","Aggrieved","委屈蹲坐","苦悩",null,"Оскорбленный"],[240,"action_40","Lol","捧腹大笑","笑",null,"Lol"],[241,"action_41","Think","思考","考える",null,"Думать"],[242,"action_42","Kneel","跪拜","ひざまずく",null,"Встать на колени"],[243,"action_43","Chill","坐地上","くつろぐ",null,"На чиле"],[244,"action_44","Relaxed","靠墙站立","リラックス",null,"Расслабленный"],[245,"action_45","Pollo","Pollo","ポロ",null,"Курица"],[246,"action_46","Meditate","冥想","瞑想",null,"Медитировать"],[247,"action_47","Bandaged","包扎","包帯",null,"Перебинтованный"],[248,"action_48","Sudden Kiss","偷亲","突然のキス",null,"Внезапный поцелуй"],[249,"action_49","Kissed","被偷亲","キスされた",null,"Поцелованный"],[250,"action_50","Kick","踹","キック",null,"Удар ногой"],[251,"action_51","Attack","攻击","攻撃",null,"Атака"],[252,"action_52","Faint","吓晕","気絶",null,"Потерять сознание"],[253,"action_53","Play with Pet","宠物玩耍","ペットと遊ぶ",null,"Играть с питомцем"],[254,"action_54","Play Ghost","扮鬼","お化けを遊ぶ",null,"Играть в призрака"],[255,"action_55","Heart-L","左比心","ハート-L",null,"Сердце-L"],[256,"action_56","Heart-R","右比心","ハート-R",null,"Сердце-R"],[257,"action_57","Hug","熊抱","ハグ",null,"Обнимать"],[258,"action_58","Bye","拜拜","バイ",null,"Пока"],[259,"action_59","Hello","你好","ハロー",null,"Привет"],[260,"action_60","Refuse","拒绝","拒否",null,"Отказываться"],[261,"action_61","Taunt","嘲讽","挑発",null,"Дразнить"],[262,"action_62","Dog","狗蹲","犬",null,"Собака"],[263,"action_63","Ostrich","鸵鸟","ダチョウ",null,"Страус"],[264,"action_64","Stretch","压腿","ストレッチ",null,"Растяжка"],[265,"action_65","Fall","倒地","転倒",null,"Падать"],[266,"action_66","Scroll","滚动","スクロール",null,"Прокрутка"],[267,"action_67","Regret","惋惜","後悔",null,"Сожалеть"],[268,"action_68","Tumble","空中翻滚","転がる",null,"Падать"],[269,"action_69","Ditto","ditto","そっくり",null,"То же самое"],[270,"action_70","Girls","girls","女の子たち",null,"Девочки"],[271,"action_71","idol","idol","アイドル",null,"Идол"],[272,"action_72","Love Dive","lovedive","ラブダイブ",null,"Любовное погружение"],[273,"action_73","Savage","savage","野蛮",null,"Дикарь"],[274,"action_74","Maniac","梅尼耶","マニアック",null,"Маньяк"],[275,"action_75","Thunderous","Thunderous","雷鳴",null,"Громоподобный"],[276,"action_76","Jingle Bells","叮叮当当当","ジングルベル",null,"Колокольчики"],[277,"Rank_name_1","Bronze","英勇黄铜","ブロンズ",null,"Бронза"],[278,"Rank_name_2","Silver","不屈白银","シルバー",null,"Серебро"],[279,"Rank_name_3","Golden","荣耀黄金","ゴールデン",null,"Золото"],[280,"Rank_name_4","Platinum","华贵铂金","プラチナ",null,"Платина"],[281,"Rank_name_5","Diamond","璀璨钻石","ダイヤモンド",null,"Бриллиант"],[282,"Rank_name_6","Immortal","超凡大师","イモータル",null,"Бессмертный"],[283,"Rank_name_7","Legendary","最强王者","キング",null,"Король"],[284,"Rank_title_1","Rank","段位","ランク",null,"Ранг"],[285,"Rank_text_7","Beat others to earn points!","击败他人即可获取积分！","他の人を倒してポイントを獲得！",null,"Побеждай других, чтобы заработать очки!"],[286,"Rank_text_8","Points will be deducted if you are defeated by others!","被他人击败将会扣除积分！","他の人に倒されるとポイントが減ります！",null,"Очки будут вычтены, если тебя победят другие!"],[287,"Rank_text_9","Points:","积分进度：","ポイント：",null,"Очки:"],[288,"Rank_text_10","Next Rank: {0}","下一段位：{0}","次のランク：{0}",null,"Следующий ранг: {0}"],[289,"Rank_text_11","Points Available Today: {0}","今日还可获得积分：{0}","今日利用可能なポイント：{0}",null,"Очки, доступные сегодня: {0}"],[290,"Rank_text_12","Reach {0} to unlock reward","到达{0}解锁奖励","{0}に到達して報酬を解除",null,"Достигните {0}, чтобы разблокировать награду"],[291,"Rank_text_13","Claim rewards at the shop.","奖励需前往商店领取","報酬はショップで受け取る必要があります。",null,"Награды необходимо собирать в магазине"],[292,"Rank_text_14","{0}/{1}","{0}/{1}","{0}/{1}",null,"{0}/{1}"],[293,"Back_name_1","Return","回城","戻る",null,"Вернуться"],[294,"Tips_rank_1","Points Earned: {0}","本次战斗累计获得{0}积分","獲得ポイント：{0}",null,"Заработано {0} очков"],[295,"Tips_rank_2","Points Deducted: {0}","本次战斗累计扣除{0}积分","減点ポイント：{0}",null,"Вычтенно {0} очков"],[296,"Tips_rank_3","Pay {0} points for a ticket?","是否支付{0}积分作为门票？","チケットとして{0}ポイントを支払いますか？",null,"Заплатить {0} очков в качестве билета?"],[297,"Shop_title_1","Slay Effect","击杀特效","スレイFX",null,"Спецэффекты"],[298,"Shop_title_2","Rank Reward","段位奖励","ランク報酬",null,"Награда за ранг"],[299,"Pendant_Kill_1","<color=#FFFF00>Explosion</color> · You wanna know what it s like to be bombed?","<color=#FFFF00>【爆炸】</color>要尝尝炮弹的滋味吗？","<color=#FFFF00>爆発</color> · 爆撃される感覚を味わいたいかい？",null,"<color=#FFFF00>Взрыв</color> · Ты хочешь знать, каково это, когда тебя бомбят?"],[300,"Pendant_Kill_2","<color=#FFFF00>Tiny Devil</color> · I'll give you the last ride.","<color=#FFFF00>【小恶魔】</color>小恶魔送你最后一程","<color=#FFFF00>小さな悪魔</color> · 最後の一乗りをさせてあげるよ！",null,"<color=#FFFF00>Крошечный дьявол</color> · Я довезу тебя в последний раз."],[301,"Pendant_Kill_3","<color=#FFFF00>Thunder</color> · It's the punishment from the sky.","<color=#FFFF00>【天雷】</color>天雷滚滚，神罚降临","<color=#FFFF00>雷</color> · 空からの裁きだ！",null,"<color=#FFFF00>Гром</color> · Это наказание с небес."],[302,"Pendant_Kill_4","<color=#FFFF00>Ground Thorn</color> · Running through the earth!","<color=#FFFF00>【地刺】</color>贯穿地板的雷霆","<color=#FFFF00>地面の棘</color> · 地面を這いやがれ！",null,"<color=#FFFF00>Подземная колючка</color> · Бегущая по земле!"],[303,"Pendant_Kill_5","<color=#FFFF00>Fantasy</color> · Life is ephemeral, like a bubble.","<color=#FFFF00>【幻梦】</color>生命如幻梦泡影，转瞬即逝","<color=#FFFF00>ファンタジー</color> ·人生は泡の如し。",null,"<color=#FFFF00>Фантазия</color> · Жизнь эфемерна, как пузырь."],[304,"Pendant_Wing_7","<color=#FFFF00>Wizard of Oz</color> · Let it speed you up!","<color=#FFFF00>【绿野仙踪】</color>给佩戴者带来大量移速加成","<color=#FFFF00>オズの魔法使い</color> · スピードアップさせてあげる！",null,"<color=#FFFF00>Волшебник страны Оз</color> · Пусть это ускорит вас!"],[305,"Pendant_Wing_8","<color=#FFFF00>Songbird</color> · Bonus to the player's ATK.","<color=#FFFF00>【玄鸟】</color>给佩戴者带来大量攻击力加成","<color=#FFFF00>歌う鳥</color> · 装備者の攻撃力を向上。",null,"<color=#FFFF00>Певчая птица</color> · Бонус к атаке владельца."],[306,"Pendant_Trail_7","<color=#FFFF00>Rainbow Tailing</color> · Reduces the damage taken by the player.","<color=#FFFF00>【彩虹拖尾】</color>给佩戴者带来大量减伤加成","<color=#FFFF00>レインボートレイル</color> · 装備者が受けるダメージを減らす。",null,"<color=#FFFF00>Радужная тропа</color> · Снижает урон, получаемый владельцем."],[307,"Pendant_Trail_8","<color=#FFFF00>Football Tailing</color> · Brings critical damage bonus to the player.","<color=#FFFF00>【足球拖尾】</color>给佩戴者带来大量暴伤加成","<color=#FFFF00>フットボールトレイル</color> · 装備者のクリティカルダメージを向上。",null,"<color=#FFFF00>Футбольная тропа</color> · Приносит бонус критического урона владельцу."],[308,"Pendant_Rank_reward_1","<color=#FFFF00>Golden</color> · Exclusive appearance of Virtuoso Phase.","<color=#FFFF00>【黄金】</color>黄金段专属外观","<color=#FFFF00>ゴールデンオフィサー</color> · バーチュオーソフェーズの専用外見。",null,"<color=#FFFF00>Золотой офицер</color> · Эксклюзивный внешний вид фазы Виртуоза."],[309,"Pendant_Rank_reward_2","<color=#FFFF00>Platinum</color> · Exclusive appearance of Immortality Phase.","<color=#FFFF00>【铂金】</color>铂金段专属外观","<color=#FFFF00>プラチナキャプテン</color> · イモータリティフェーズの専用外見。",null,"<color=#FFFF00>Платиновый капитан</color> · Эксклюзивный внешний вид фазы Бессмертия."],[310,"Pendant_Rank_reward_3","<color=#FFFF00>Diamond</color> · Exclusive appearance of Incarnation Phase.","<color=#FFFF00>【钻石】</color>钻石段专属外观","<color=#FFFF00>ダイヤモンドコロネル</color> · インカーネーションフェーズの専用外見。",null,"<color=#FFFF00>Бриллиантовый полковник</color> · Эксклюзивный внешний вид фазы Воплощения."],[311,"Pendant_Rank_reward_4","<color=#FFFF00>Immortal</color> · Exclusive appearance of Divinity Phase.","<color=#FFFF00>【无双】</color>无双段专属外观","<color=#FFFF00>ユニークジェネラル</color> · ディビニティフェーズの専用外見。",null,"<color=#FFFF00>Уникальный генерал</color> · Эксклюзивный внешний вид фазы Божественности."],[312,"Pendant_Rank_reward_5","<color=#FFFF00>King</color> · Exclusive appearance of Transcendence Phase.","<color=#FFFF00>【王者】</color>王者段专属外观","<color=#FFFF00>グレートマーシャル</color> · トランセンデンスフェーズの専用外見。",null,"<color=#FFFF00>Великий маршал</color> · Эксклюзивный внешний вид фазы Превосходства."],[313,"Shop_btn_7","Locked","未解锁","ロックされました",null,"Заблокировано"],[314,"Rank_text_15","All rewards are unlocked!","所有奖励已解锁！","全ての報酬が解除されました！",null,"Все награды разблокированы!"],[315,"Rank_text_16","Points","积分","ポイント",null,"Очки"],[316,"Rank_text_17","Rank","玄天圣灵榜","ランク",null,"Рейтинг"],[317,"Rank_text_18","{0}{1}","{0}{1}","{0}{1}",null,"{0}{1}"],[318,"Massacre_text_1","{0} obtained {2} bounty reward from {1}!","{0}获得了{1}的{2}赏金","{0}は{1}から{2}の賞金報酬を獲得しました！",null,"{0} получено {2} щедрое вознаграждение от {1}!"],[319,"Weapon_Name_4","Explosive Sword","爆炎大剑","爆裂剣",null,"Взрывной меч"],[320,"Name_Skill_Fire_1","<color=#5DBF4DFF>Fire Burst</color>","<color=#5DBF4DFF>烈焰突刺</color>","<color=#5DBF4DFF>ファイアバースト</color>",null,"<color=#5DBF4DFF>Огненный взрыв</color>"],[321,"Name_Skill_Fire_2","<color=#5DBF4DFF>Gale Strike</color>","<color=#5DBF4DFF>旋风斩击</color>","<color=#5DBF4DFF>ゲイルストライク</color>",null,"<color=#5DBF4DFF>Удар урагана</color>"],[322,"Name_Skill_Fire_3","<color=#9357BFFF>Flame Blast</color>","<color=#9357BFFF>爆炎重击</color>","<color=#9357BFFF>フレイムブラスト</color>",null,"<color=#9357BFFF>Взрыв пламени</color>"],[323,"Name_Skill_Fire_4","<color=#5DBF4DFF>Fire Rain</color>","<color=#5DBF4DFF>火雨</color>","<color=#5DBF4DFF>ファイアレイン</color>",null,"<color=#5DBF4DFF>Огненный дождь</color>"],[324,"Name_Skill_Fire_5","<color=#5DBF4DFF>Flame Hack</color>","<color=#5DBF4DFF>烈焰飞劈</color>","<color=#5DBF4DFF>フレイムハック</color>",null,"<color=#5DBF4DFF>Взлом Огня</color>"],[325,"Name_Skill_Fire_6","<color=#3B93BFFF>Sword Energy</color>","<color=#3B93BFFF>巨焰剑气</color>","<color=#3B93BFFF>ソードエネルギー</color>",null,"<color=#3B93BFFF>Энергия меча</color>"],[326,"Name_Skill_Fire_7","<color=#3B93BFFF>Giant Slash</color>","<color=#3B93BFFF>巨焰竖斩</color>","<color=#3B93BFFF>ジャイアントスラッシュ</color>",null,"<color=#3B93BFFF>Удар гиганта</color>"],[327,"Name_Skill_Fire_8","<color=#5DBF4DFF>Phoenix Dash</color>","<color=#5DBF4DFF>飞凰突击</color>","<color=#5DBF4DFF>フェニックスダッシュ</color>",null,"<color=#5DBF4DFF>Прыжок феникса</color>"],[328,"Name_Skill_Fire_9","<color=#3B93BFFF>Flame Shelter</color>","<color=#3B93BFFF>火焰庇护</color>","<color=#3B93BFFF>フレイムシェルター</color>",null,"<color=#3B93BFFF>Укрытие пламенем</color>"],[329,"Name_Skill_Fire_10","<color=#9357BFFF>Flame Awakening</color>","<color=#9357BFFF>焰能觉醒</color>","<color=#9357BFFF>フレイムアウェイクニング</color>",null,"<color=#9357BFFF>Пробуждение пламени</color>"],[330,"Introduce_Skill_Fire_Sim_1","Draw the flames and bombard the enemies ahead with the sword wind.","牵引火焰，随着剑风轰击前方敌人","炎を引き寄せ、前方の敵に剣風で爆撃を行う。",null,"Нарисуйте пламя и обстреляйте врагов впереди мечом ветра."],[331,"Introduce_Skill_Fire_Sim_2","Swing a large sword and deal sustained damage to surrounding enemies.","挥舞大剑并旋转，对周围的敌人造成持续伤害","大剣を振りかざし、周囲の敵に継続ダメージを与える。",null,"Взмахните большим мечом и наносите продолжительный урон окружающим врагам."],[332,"Introduce_Skill_Fire_Sim_3","Unleash the power of fire and deal a devastating blow to the enemy in front.","施放大剑中的火之力量，对前方的敌人造成毁灭一击","火の力を解放し、前方の敵に壊滅的な一撃を与える。",null,"Освободите силу огня и нанесите сокрушительный удар врагу впереди."],[333,"Introduce_Skill_Fire_Sim_4","Trigger fire to deal sustained damage to the area ahead.","引动火元素，对前方区域造成持续性伤害","火を引き起こし、前方の敵に継続ダメージを与える。",null,"Активируйте огонь, чтобы нанести продолжительный урон области впереди."],[334,"Introduce_Skill_Fire_Sim_5","Jump up with the flames and bombard the enemies in front.","举起大剑，伴随着烈焰跳起，轰击前方的敌人","炎と共に跳び上がり、前方の敵を爆撃する。",null,"Подпрыгните с помощью пламени и обстреляйте врагов впереди."],[335,"Introduce_Skill_Fire_Sim_6","Swing the sword and cast sword energy.","挥舞大剑，先前方施放巨大的火焰剑气","剣を振りかざし、ソードエネルギーを放つ。",null,"Взмахните мечом и выпустите энергию меча."],[336,"Introduce_Skill_Fire_Sim_7","Draw the power of fire and deal damage to enemies in a straight line.","牵引火焰之力并向前方竖劈，对直线上的敌人造成伤害","火の力を引き寄せ、直線上の敵にダメージを与える。",null,"Нарисуйте силу огня и нанесите урон врагам по прямой линии."],[337,"Introduce_Skill_Fire_Sim_8","Fly up and attack the enemy ahead","飞身跃起，以凤凰之姿飞攻前方的敌人","飛び上がり、前方の敵を攻撃する。",null,"Взлетите и атакуйте врага впереди."],[338,"Introduce_Skill_Fire_Sim_9","Draw fire to defend and reduce damage taken.","引动火焰庇护自身，降低受到的伤害","火を引き寄せて防御し、受けるダメージを軽減させる。",null,"Нарисуйте огонь, чтобы защититься и уменьшить получаемый урон."],[339,"Introduce_Skill_Fire_Sim_10","Repel surrounding enemies and strengthen yourself.","施放炎能，击退周围的敌人并加强自身","周囲の敵を撃退し、自身を強化する。",null,"Отбросьте окружающих врагов и укрепите себя."],[340,"Introduce_Skill_Fire_De_1",null,null,null,null,null],[341,"Introduce_Skill_Fire_De_2",null,null,null,null,null],[342,"Introduce_Skill_Fire_De_3",null,null,null,null,null],[343,"Introduce_Skill_Fire_De_4",null,null,null,null,null],[344,"Introduce_Skill_Fire_De_5",null,null,null,null,null],[345,"Introduce_Skill_Fire_De_6",null,null,null,null,null],[346,"Introduce_Skill_Fire_De_7",null,null,null,null,null],[347,"Introduce_Skill_Fire_De_8",null,null,null,null,null],[348,"Introduce_Skill_Fire_De_9",null,null,null,null,null],[349,"Introduce_Skill_Fire_De_10",null,null,null,null,null],[350,"Tips_rank_4","Welcome <color=#FFFF00>{0} {1}</color> into this room!","欢迎<color=#FFFF00>{0}玩家{1}</color>进入本房间！","この部屋に<color=#FFFF00>{0} {1}</color>を歓迎します！",null,"Добро пожаловать <color=#FFFF00>{0} {1}</color> в эту комнату!"],[351,"Tips_rank_5","You defeated {0}, + {1} points!","击败{0}玩家，获得积分{1}。","{0}を倒して、{1}ポイントを獲得しました！",null,"Вы победили {0}, + {1} очков!"],[352,"Tips_rank_6","You're defeated by {0}, - {1} points.","被{0}玩家击败，扣除积分{1}。","あなたは{0}に倒され、{1}ポイント減点されました。",null,"Вас победил {0}, - {1} очков."],[353,"ui_set_txt_14","Display Rank","段位展示","ランク表示",null,"Показать ранг"],[354,"guide_text_1","Tap here to attack","点击按钮进行攻击","ここをタップして攻撃",null,"Коснитесь здесь, чтобы атаковать"],[355,"guide_text_2","Tap to release skills","点击释放技能","タップしてスキルを発動",null,"Коснитесь, чтобы использовать навыки"],[356,"guide_dialog_1","Hello! Welcome to Infinity Rumble.","你好！欢迎来到无限格斗世界！","こんにちは！アンリミテッドランブルへようこそ。",null,"Привет! Добро пожаловать в Unlimited Rumble."],[357,"guide_dialog_2","In here, you battle with other rumble fighters, collect extradinary strength by harnessing the power of mythical weapons.","在这里你可以获得非凡的力量，收集各种武器，驾驭元素之力与其他玩家战斗！","ここで特別な力と様々な武器を手に入れることができます。そして、元素の力を利用して他のプレイヤーと戦うこともできますよ！",null,"Здесь вы можете получить невероятную силу, собрать разнообразное оружие и овладеть силой стихий, чтобы сражаться с другими игроками!"],[358,"guide_dialog_3","Get ready for the world to remember you, as the legendary rumble fighter!","相信这个世界一定会留下你的传说历程！","あなたの伝説がこの世界の歴史に刻まれると信じてください！",null,"Поверьте, что ваша легенда будет вписана в историю этого мира!"],[359,"guide_dialog_4","Now, let's try the attack first!","下面，先来试试攻击吧！","さあ、まずは攻撃を試してみましょう！",null,"А теперь попробуем атаку!"],[360,"guide_dialog_5","We have never seen a talented fighter like you.. The power you unleased is.. powerful!","哇！你真厉害，初到这个世界便可以释放出这么强的力量，一定是个天才！","素晴らしい、最初からこんなに力を解放できるなんて！",null,"Вы впечатляете, высвобождая такую силу с самого начала."],[361,"guide_dialog_6","You must be able to unearth even greater power.","你一定还可以发掘出更强的力量。","あなたはもっと大きな力を見つけ出すことができるはずです。",null,"Вы должны суметь раскрыть еще большую силу."],[362,"guide_dialog_7","Go have a peak at the core of rumble!","快看！那里是什么，快过去瞧一瞧吧！","そこには何がある？行って見てみよう！",null,"Что там? Иди и посмотри!"],[363,"guide_dialog_8","New skills..Better technics","哇！你获得了一个新的技能，它可以帮助你更好的在这个世界进行战斗。","わお！この世界で戦うために役立つ新しいスキルを獲得しました！",null,"Вау! Ты получил новый навык, который поможет тебе лучше сражаться в этом мире."],[364,"guide_dialog_9","Using skills consumes energy! Each skill has a cooldown, so wait a bit before casting it again.","释放技能会消耗能量值哟！每个技能都拥有冷却时间，释放后需要等一会才可以再次施放~","スキルの使用はエネルギーを消費します！各スキルにはクールダウンがありますので、もう一度使用する前に少し待ってください。",null,"Использование навыков требует энергии! У каждого навыка есть время восстановления, поэтому подожди немного, прежде чем использовать его снова."],[365,"guide_dialog_10","Here's a training pupet. Try your new skill!","这里有一个训练用的木桩，快试试你的新技能的效果吧！","これは練習用の木樁です。新しいスキルを試してみてください！",null,"Вот тренировочный столб. Попробуй свой новый навык!"],[366,"guide_dialog_11","Wow! You‘re impressive!","哇！你真是太厉害啦！","わお！素晴らしい！",null,"Вау! Ты впечатляешь!"],[367,"guide_dialog_12","It usually takes hard-core learning skill to master these abilities quickly, impressive!","这么难的技能都可以快速学会！","こんなに難しいスキルも、すぐに覚えるんですね！",null,"Даже с такими сложными навыками ты быстро их осваиваешь!"],[368,"guide_dialog_13","Time to dive into the rumbles! Head to the marked location when you're ready!","现在的你已经可以加入这个世界的冒险啦，做好准备后，就前往标记处吧！","これであなたもこの世界で冒険できます！準備ができたら、マークされた場所に向かってください！",null,"Теперь ты можешь отправиться в приключение по этому миру. Отправляйся в отмеченное место, когда будешь готов!"],[369,"UI_SkillSelect_Title_txt","Skill Selection","技能选择","スキル選択",null,"Выбор навыков"],[370,"Rank_text_19","G.O.A.T","天下第一","G.O.A.T",null,"Величайший из всех времен"],[371,"action_77","Cheesy Dance","科目三","チーズダンス",null,"Cheesy танец"],[372,"guide_npc_name","Pupet","木桩","木樁",null,"Столб"],[373,"setting_text_enemy","Lock","是否开启锁敌","ロック",null,"Замок"],[374,"guide_UI_tip","Click anywhere to proceed to the next step.","点击任意位置下一步","任意の場所をクリックして、次のステップに進んでください",null,"Щелкните в любом месте, чтобы перейти к следующему шагу."],[375,"Tips_rank_7","Congratulations<color=#FFFF00>{0}</color> player has been promoted to <color=#FFFF00>{1}</color>","恭喜<color=#FFFF00>{0}</color>玩家段位晋升为<color=#FFFF00>{1}</color>",null,null,"Поздравляем<</color>color=#FFFF00>{0} игрок был повышен до <color=#FFFF00>{1}</color>"],[376,"Social_title_1","Social","社交",null,null,null],[377,"Social_title_2","Room Player","房间玩家",null,null,null],[378,"Social_title_3","Nickname","昵称",null,null,null],[379,"Social_btn_1","Team Up","组队",null,null,null],[380,"Social_btn_2","Already Teamed","已有队",null,null,null],[381,"Social_btn_3","Leave Team","离队",null,null,null],[382,"Social_btn_4","Agree","同意",null,null,null],[383,"Social_btn_5","Refuse ({0}s)","拒绝（{0}s）",null,null,null],[384,"Social_tips_1","{0} has refused your team invite!","{0}拒绝了你的组队邀请！",null,null,null],[385,"Social_tips_2","Please try again in {0} seconds!","请{0}秒后再试！",null,null,null],[386,"Social_tips_3","Teamed up with {0} successfully!","与{0}组队成功！",null,null,null],[387,"Social_tips_4","Successfully left the team!","成功离队！",null,null,null],[388,"Pendant_Kill_6","<color=#FFFF00> [Flame burst]</color> send you your last ride with fire!","<color=#FFFF00>【炎爆】</color>用火送你最后一程!",null,null,"<color=#FFFF00> [Взрыв пламени]</color> отправит тебя в последнее путешествие с огнем!"],[389,"Pendant_Kill_7","<color=#FFFF00> [Water spout]</color> sinks to the bottom of the sea","<color=#FFFF00>【水龙卷】</color>沉入海底，那里最安静~",null,null,"<color=#FFFF00> [Водоворот]</color> погружается на дно моря"],[390,"Pendant_Trail_9","<color=#FFFF00> [Starlight Tailing]</color> gives the player speed and damage reduction","<color=#FFFF00>【星光拖尾】</color>给佩戴者带来大量移速和减伤加成",null,null,"<color=#FFFF00> [След звездного света]</color> дает носителю скорость и снижение урона"],[391,"Social_tips_5",null,"{0}向你发出组队邀请",null,null,null],[392,"Social_tips_6",null,"{0}已离开队伍",null,null,null],[393,"Head_bounty","Bounty","赏金",null,null,"Награда"],[394,"Battle_Times_1","Battle time","战斗次数",null,null,"Время битвы"],[395,"Buy_Confirm_Text","Confirm to purchase battles?","是否购买战斗次数？",null,null,"Подтвердить покупку битвы?"],[396,"Buy_Success_Text","Purchase successfully","购买成功",null,null,"Покупка успешно завершена"],[397,"Buy_Fail_Text","Failed purchase","购买失败",null,null,"Неудачная покупка"],[398,"Deposit_1","Please open your browser and go to the official website of MOBOX to recharge: \nhttps://www.mobox.io","请打开浏览器前往MOBOX官网進行充值：\nhttps://www.mobox.io",null,null,"Пожалуйста, откройте свой браузер и перейдите на официальный сайт MOBOX для пополнения: https://www.mobox.io"],[399,"Deposit_2","Copy the url","复制网址",null,null,"Скопируйте URL"],[400,"Copy_Success_Text_1","Replication success!","复制成功！",null,null,"Успешное копирование!"],[401,"Tips_Text_1","Tips","提示","ヒント",null,"Советы"],[402,"ui_set_txt_15","Action","动作",null,null,"Действие"],[403,"Prefab_name_9","Deform","化形",null,null,"Deform"],[404,"Battle_shop_1","Purchase battles","购买战斗次数",null,null,"Покупка битв"],[405,"SkillSelect_8","New skill","新技能",null,null,"Новый навык"],[406,"ui_set_txt_16","Camera Speed","镜头速度",null,null,null],[407,"CurrentRoomId","Room ID:{0}","房间ID：{0}",null,"Room ID:{0}","Room ID:{0}"],[408,"JumpGameFailed","Switch Room Failed!","切换房间失败！",null,"Switch Room Failed!","Switch Room Failed!"],[409,"SwitchRoomBtn","Switch room","切换房间",null,"Switch room","Switch room"],[410,"JumpRoomText001","Switch to a designated room","切换至指定房间",null,"Switch to a designated room","Switch to a designated room"],[411,"JumpRoomText002","Please enter the Room ID","请输入房间ID",null,"Please enter the Room ID","Please enter the Room ID"],[412,"SwitchRoomConfirm","Confirm","确定",null,"Confirm","Confirm"],[413,"BuffName001","ATK","攻击",null,"ATK","ATK"],[414,"BuffName002","DEF","防御",null,"DEF","DEF"],[415,"BuffName003","Life","生命",null,"Life","Life"],[416,"BuffName004","MOB","能量",null,"MOB","MOB"],[417,"EquipTips","Equip","装备",null,"Equip","Equip"],[418,"UnequipTips","Unequip","卸下",null,"Unequip","Unequip"],[419,"StaminaNotEnough","Insufficient Stamina！","体力不足！",null,"Insufficient Stamina！","Insufficient Stamina！"],[420,"Invincible001","Invincible！","无敌",null,"Invincible！","Invincible！"],[421,"ui_set_txt_17","Mute","静音",null,"Mute","Mute"],[422,"Online_shop001","Senzu Potion","仙豆","Senzu Potion","Senzu Potion","Senzu Potion"],[423,"Online_shop002","Use in game to get stamina","在游戏中使用可获得体力","Use in game to get stamina","Use in game to get stamina","Use in game to get stamina"],[424,"Online_shop003","Blue Snitch","蓝色飞贼","Blue Snitch","Blue Snitch","Blue Snitch"],[425,"Online_shop004","Capture the Modragon in the bonus level","在奖励地图中捕获龙娘时使用","Capture the Modragon in the bonus level","Capture the Modragon in the bonus level","Capture the Modragon in the bonus level"],[426,"Online_shop005","Purchase","购买","Purchase","Purchase","Purchase"],[427,"Online_shop006","Total：","总计：","Total：","Total：","Total："],[428,"Online_shop007","Available：","结余：","Available：","Available：","Available："],[429,"Online_shop008","DragonVerse Shop","DragonVerse 商城","DragonVerse Shop","DragonVerse Shop","DragonVerse Shop"],[430,"Online_shop009","Consume","使用","Consume","Consume","Consume"],[431,"Online_shop010","Quantity: ","数量：","Quantity: ","Quantity: ","Quantity: "],[432,"Online_shop011","Consume a Senzu Potion to recover {0} stamina? ","确定消耗一瓶仙豆药水并回复{0}体力吗？","Consume a Senzu Potion to recover {0} stamina? ","Consume a Senzu Potion to recover {0} stamina? ","Consume a Senzu Potion to recover {0} stamina? "],[433,"Online_shop012","Confirm(E)","确认（E）","Confirm(E)","Confirm(E)","Confirm(E)"],[434,"Online_shop013","Cancel(Esc)","取消（Esc）","Cancel(Esc)","Cancel(Esc)","Cancel(Esc)"],[435,"Online_shop014","Confirming","确认中","Confirming","Confirming","Confirming"],[436,"Online_shop016","Sweep Token","扫荡券","Sweep Token","Sweep Token","Sweep Token"],[437,"Online_shop017","Speed-sweep for Perfect Victory stages","快速通关已经取得完美胜利的关卡","Speed-sweep for Perfect Victory stages","Speed-sweep for Perfect Victory stages","Speed-sweep for Perfect Victory stages"]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**名字索引*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**设置*/
	get ui_set_txt_1():ILanguageElement{return this.getElement(1)};
	/**声音*/
	get ui_set_txt_2():ILanguageElement{return this.getElement(2)};
	/**背景音乐*/
	get ui_set_txt_3():ILanguageElement{return this.getElement(3)};
	/**低*/
	get ui_set_txt_4():ILanguageElement{return this.getElement(4)};
	/**高*/
	get ui_set_txt_5():ILanguageElement{return this.getElement(5)};
	/**音效*/
	get ui_set_txt_6():ILanguageElement{return this.getElement(6)};
	/**画面*/
	get ui_set_txt_7():ILanguageElement{return this.getElement(7)};
	/**图像质量*/
	get ui_set_txt_8():ILanguageElement{return this.getElement(8)};
	/**裁剪距离*/
	get ui_set_txt_9():ILanguageElement{return this.getElement(9)};
	/**饱和度*/
	get ui_set_txt_10():ILanguageElement{return this.getElement(10)};
	/**阴影效果*/
	get ui_set_txt_11():ILanguageElement{return this.getElement(11)};
	/**操作*/
	get ui_set_txt_12():ILanguageElement{return this.getElement(12)};
	/**视野缩放*/
	get ui_set_txt_13():ILanguageElement{return this.getElement(13)};
	/**战败*/
	get battal_dead_01():ILanguageElement{return this.getElement(14)};
	/**{0}击败了你*/
	get battal_dead_02():ILanguageElement{return this.getElement(15)};
	/**你的技能已失去，即将返回安全区！*/
	get battal_dead_03():ILanguageElement{return this.getElement(16)};
	/**欢迎归来！上一局你一共获得了{0}金币，继续加油*/
	get battal_dead_04():ILanguageElement{return this.getElement(17)};
	/**技能盲盒*/
	get Prefab_name_1():ILanguageElement{return this.getElement(18)};
	/**血瓶*/
	get Prefab_name_2():ILanguageElement{return this.getElement(19)};
	/**金币*/
	get Prefab_name_3():ILanguageElement{return this.getElement(20)};
	/**战场传送*/
	get Scene_name_1():ILanguageElement{return this.getElement(21)};
	/**翅膀*/
	get Shop_btn_1():ILanguageElement{return this.getElement(22)};
	/**拖尾*/
	get Shop_btn_2():ILanguageElement{return this.getElement(23)};
	/**装扮*/
	get Shop_btn_3():ILanguageElement{return this.getElement(24)};
	/**已装扮*/
	get Shop_btn_4():ILanguageElement{return this.getElement(25)};
	/**购买*/
	get Shop_btn_5():ILanguageElement{return this.getElement(26)};
	/**返回*/
	get Shop_btn_6():ILanguageElement{return this.getElement(27)};
	/**安全区*/
	get battal_world_nameLV_20():ILanguageElement{return this.getElement(28)};
	/**顶上战场*/
	get battal_world_nameLV_21():ILanguageElement{return this.getElement(29)};
	/**新一批物资即将刷新！*/
	get LandParces_1():ILanguageElement{return this.getElement(30)};
	/**地面即将发生变化！请小心！*/
	get LandParces_2():ILanguageElement{return this.getElement(31)};
	/**新技能：{0}*/
	get SkillSelect_1():ILanguageElement{return this.getElement(32)};
	/**获得{0}金币*/
	get SkillSelect_2():ILanguageElement{return this.getElement(33)};
	/**已拥有*/
	get WeaponTip_1():ILanguageElement{return this.getElement(34)};
	/**是否花费{0}进行购买*/
	get WeaponTip_2():ILanguageElement{return this.getElement(35)};
	/**消耗{0}金币*/
	get WeaponTip_3():ILanguageElement{return this.getElement(36)};
	/**当前无法切换武器，完成战局后再来吧*/
	get WeaponTip_4():ILanguageElement{return this.getElement(37)};
	/**技能点+1，请点击技能页面按钮使用*/
	get SkillSelect_3():ILanguageElement{return this.getElement(38)};
	/**技能点+1，请选择技能*/
	get SkillSelect_4():ILanguageElement{return this.getElement(39)};
	/**<color=#FFFF00>【凤舞九天】</color>凤凰火焰所织就的翅膀，给佩戴者带来少量攻击力加成*/
	get Pendant_Wing_1():ILanguageElement{return this.getElement(40)};
	/**<color=#FFFF00>【血蝠】</color>幽冥蝠王力量所化，给佩戴者带来少量血量与吸血加成*/
	get Pendant_Wing_2():ILanguageElement{return this.getElement(41)};
	/**<color=#FFFF00>【丘比特】</color>蕴含丘比特之力，给佩戴者带来少量减伤与血量加成*/
	get Pendant_Wing_3():ILanguageElement{return this.getElement(42)};
	/**<color=#FFFF00>【暗夜】</color>残夜之力，给佩戴者带来少量暴击率和暴击伤害加成*/
	get Pendant_Wing_4():ILanguageElement{return this.getElement(43)};
	/**<color=#FFFF00>【爱心天使】</color>爱的力量，给佩戴者带来大量血量和减伤加成*/
	get Pendant_Wing_5():ILanguageElement{return this.getElement(44)};
	/**<color=#FFFF00>【彗星拖尾】</color>给佩戴者带来少量攻击加成*/
	get Pendant_Trail_1():ILanguageElement{return this.getElement(45)};
	/**<color=#FFFF00>【启明星拖尾】</color>给佩戴者带来少量血量加成*/
	get Pendant_Trail_2():ILanguageElement{return this.getElement(46)};
	/**<color=#FFFF00>【冰雪拖尾】</color>给佩戴者带来少量减伤加成*/
	get Pendant_Trail_3():ILanguageElement{return this.getElement(47)};
	/**<color=#FFFF00>【糖果拖尾 】</color>给佩戴者带来大量血量加成*/
	get Pendant_Trail_4():ILanguageElement{return this.getElement(48)};
	/**<color=#FFFF00>【枫叶拖尾】</color>给佩戴者带来大量攻击与吸血加成*/
	get Pendant_Trail_5():ILanguageElement{return this.getElement(49)};
	/**{0}达成<color=#FFF230>二连胜</color>*/
	get KillTip_1():ILanguageElement{return this.getElement(50)};
	/**{0}达成<color=#FFF230>三连胜</color>*/
	get KillTip_2():ILanguageElement{return this.getElement(51)};
	/**{0}已经<color=#FFF230>统治战场</color>*/
	get KillTip_3():ILanguageElement{return this.getElement(52)};
	/**{0}已经<color=#FFF230>超神</color>*/
	get KillTip_4():ILanguageElement{return this.getElement(53)};
	/**三连绝世*/
	get KillTip_5():ILanguageElement{return this.getElement(54)};
	/**统治战场*/
	get KillTip_6():ILanguageElement{return this.getElement(55)};
	/**超神之躯*/
	get KillTip_7():ILanguageElement{return this.getElement(56)};
	/**购买成功！*/
	get Shop_tips_1():ILanguageElement{return this.getElement(57)};
	/**金币不足！*/
	get Shop_tips_2():ILanguageElement{return this.getElement(58)};
	/**龙鳞丹·<color=#F6663A>攻击↑</color>*/
	get Prefab_name_4():ILanguageElement{return this.getElement(59)};
	/**龟甲丹·<color=#F6663A>减伤↑</color>*/
	get Prefab_name_5():ILanguageElement{return this.getElement(60)};
	/**生骨丹·<color=#F6663A>血量↑</color>*/
	get Prefab_name_6():ILanguageElement{return this.getElement(61)};
	/**养气丹·<color=#F6663A>能量↑</color>*/
	get Prefab_name_7():ILanguageElement{return this.getElement(62)};
	/**小的们，就以下方区域作为试炼力量的场所，尽情对战吧！咦~你怎么还在这，快下去塔塔开！*/
	get Dialog_Npc_1():ILanguageElement{return this.getElement(63)};
	/**想当年，也是在这片战场上，立下了我<color=#F6663A>Dragonverse Neo第一战士</color>的威名，哈哈哈哈~*/
	get Dialog_Npc_2():ILanguageElement{return this.getElement(64)};
	/**怎么回事，看见对面的建筑，有流泪的冲动，明明是第一次来到这里。*/
	get Dialog_Npc_3():ILanguageElement{return this.getElement(65)};
	/**海盗船长*/
	get Name_Npc_1():ILanguageElement{return this.getElement(66)};
	/**第一水手*/
	get Name_Npc_2():ILanguageElement{return this.getElement(67)};
	/**围巾少年*/
	get Name_Npc_3():ILanguageElement{return this.getElement(68)};
	/**新技能*/
	get SkillSelect_5():ILanguageElement{return this.getElement(69)};
	/**显示简略技能*/
	get SkillSelect_6():ILanguageElement{return this.getElement(70)};
	/**第一剑客*/
	get Name_Npc_4():ILanguageElement{return this.getElement(71)};
	/**魔导师*/
	get Name_Npc_5():ILanguageElement{return this.getElement(72)};
	/**请教拳术*/
	get Dialog_Npc_Tap_1():ILanguageElement{return this.getElement(73)};
	/**狂风聚集是难得的控制技能，建议学习~*/
	get Dialog_Npc_6():ILanguageElement{return this.getElement(74)};
	/**学习技能？*/
	get Dialog_Npc_Tap_2():ILanguageElement{return this.getElement(75)};
	/**战场上有名为<color=#F6663A>【技能盲盒】</color>的物件，触碰即可习得新技能！*/
	get Dialog_Npc_7():ILanguageElement{return this.getElement(76)};
	/**<color=#FFFF00>【星云】</color>给佩戴者带来大量暴击率加成*/
	get Pendant_Wing_6():ILanguageElement{return this.getElement(77)};
	/**<color=#FFFF00>【六芒星】</color>给佩戴者带来少量抗暴加成*/
	get Pendant_Trail_6():ILanguageElement{return this.getElement(78)};
	/**击败*/
	get battal_dead_05():ILanguageElement{return this.getElement(79)};
	/**我乃西域第一剑客！*/
	get Dialog_Npc_8():ILanguageElement{return this.getElement(80)};
	/**请教剑术*/
	get Dialog_Npc_Tap_3():ILanguageElement{return this.getElement(81)};
	/**剑术之道，唯快不破。所以，<color=#F6663A>【引雷入体】</color>乃必学身法。*/
	get Dialog_Npc_9():ILanguageElement{return this.getElement(82)};
	/**最强击杀王*/
	get Rank_text_1():ILanguageElement{return this.getElement(83)};
	/**排名*/
	get Rank_text_2():ILanguageElement{return this.getElement(84)};
	/**昵称*/
	get Rank_text_3():ILanguageElement{return this.getElement(85)};
	/**击败数*/
	get Rank_text_4():ILanguageElement{return this.getElement(86)};
	/**最强生存王*/
	get Rank_text_5():ILanguageElement{return this.getElement(87)};
	/**时长*/
	get Rank_text_6():ILanguageElement{return this.getElement(88)};
	/**商店*/
	get Shop_name_1():ILanguageElement{return this.getElement(89)};
	/**化形丹*/
	get Prefab_name_8():ILanguageElement{return this.getElement(90)};
	/**冲击拳套*/
	get Weapon_Name_1():ILanguageElement{return this.getElement(91)};
	/**轰雷刀*/
	get Weapon_Name_2():ILanguageElement{return this.getElement(92)};
	/**光之杖*/
	get Weapon_Name_3():ILanguageElement{return this.getElement(93)};
	/**闲逛的帕姆尼*/
	get Name_Npc_Masco_1():ILanguageElement{return this.getElement(94)};
	/**冲刺*/
	get Name_Skill_Normal_1():ILanguageElement{return this.getElement(95)};
	/**跳跃*/
	get Name_Skill_Normal_2():ILanguageElement{return this.getElement(96)};
	/**倒地*/
	get Name_Skill_Normal_3():ILanguageElement{return this.getElement(97)};
	/**普攻*/
	get Name_Skill_Normal_4():ILanguageElement{return this.getElement(98)};
	/**<color=#5DBF4DFF>四方震击</color>*/
	get Name_Skill_Fist_1():ILanguageElement{return this.getElement(99)};
	/**<color=#5DBF4DFF>地脉震动</color>*/
	get Name_Skill_Fist_2():ILanguageElement{return this.getElement(100)};
	/**<color=#5DBF4DFF>引力冲击</color>*/
	get Name_Skill_Fist_3():ILanguageElement{return this.getElement(101)};
	/**<color=#5DBF4DFF>蓄力冲拳</color>*/
	get Name_Skill_Fist_4():ILanguageElement{return this.getElement(102)};
	/**<color=#5DBF4DFF>震地空爆</color>*/
	get Name_Skill_Fist_5():ILanguageElement{return this.getElement(103)};
	/**<color=#9357BFFF>战吼</color>*/
	get Name_Skill_Fist_6():ILanguageElement{return this.getElement(104)};
	/**<color=#3B93BFFF>轰雷震爆</color>*/
	get Name_Skill_Fist_7():ILanguageElement{return this.getElement(105)};
	/**<color=#3B93BFFF>升龙冲拳</color>*/
	get Name_Skill_Fist_8():ILanguageElement{return this.getElement(106)};
	/**<color=#3B93BFFF>狂风聚集</color>*/
	get Name_Skill_Fist_9():ILanguageElement{return this.getElement(107)};
	/**<color=#9357BFFF>源力涌动</color>*/
	get Name_Skill_Fist_10():ILanguageElement{return this.getElement(108)};
	/**<color=#5DBF4DFF>轰雷剑气</color>*/
	get Name_Skill_Thunder_1():ILanguageElement{return this.getElement(109)};
	/**<color=#5DBF4DFF>雷霆轰击</color>*/
	get Name_Skill_Thunder_2():ILanguageElement{return this.getElement(110)};
	/**<color=#5DBF4DFF>燕返</color>*/
	get Name_Skill_Thunder_3():ILanguageElement{return this.getElement(111)};
	/**<color=#9357BFFF>巨雷一击</color>*/
	get Name_Skill_Thunder_4():ILanguageElement{return this.getElement(112)};
	/**<color=#5DBF4DFF>千鸟</color>*/
	get Name_Skill_Thunder_5():ILanguageElement{return this.getElement(113)};
	/**<color=#3B93BFFF>引雷</color>*/
	get Name_Skill_Thunder_6():ILanguageElement{return this.getElement(114)};
	/**<color=#3B93BFFF>雷霆连斩</color>*/
	get Name_Skill_Thunder_7():ILanguageElement{return this.getElement(115)};
	/**<color=#9357BFFF>引雷入体</color>*/
	get Name_Skill_Thunder_8():ILanguageElement{return this.getElement(116)};
	/**<color=#3B93BFFF>聚雷阵</color>*/
	get Name_Skill_Thunder_9():ILanguageElement{return this.getElement(117)};
	/**<color=#9357BFFF>雷切</color>*/
	get Name_Skill_Thunder_10():ILanguageElement{return this.getElement(118)};
	/**<color=#5DBF4DFF>光明降临</color>*/
	get Name_Skill_Light_1():ILanguageElement{return this.getElement(119)};
	/**<color=#5DBF4DFF>光之冲击</color>*/
	get Name_Skill_Light_2():ILanguageElement{return this.getElement(120)};
	/**<color=#5DBF4DFF>炫光一闪</color>*/
	get Name_Skill_Light_3():ILanguageElement{return this.getElement(121)};
	/**<color=#5DBF4DFF>光明疗愈</color>*/
	get Name_Skill_Light_4():ILanguageElement{return this.getElement(122)};
	/**<color=#5DBF4DFF>光之飞弹</color>*/
	get Name_Skill_Light_5():ILanguageElement{return this.getElement(123)};
	/**<color=#3B93BFFF>时光禁锢</color>*/
	get Name_Skill_Light_6():ILanguageElement{return this.getElement(124)};
	/**<color=#3B93BFFF>圣焰领域</color>*/
	get Name_Skill_Light_7():ILanguageElement{return this.getElement(125)};
	/**<color=#3B93BFFF>聚能光炮</color>*/
	get Name_Skill_Light_8():ILanguageElement{return this.getElement(126)};
	/**<color=#9357BFFF>光之庇佑</color>*/
	get Name_Skill_Light_9():ILanguageElement{return this.getElement(127)};
	/**<color=#9357BFFF>光焰附魔</color>*/
	get Name_Skill_Light_10():ILanguageElement{return this.getElement(128)};
	/**炫光一闪第二段*/
	get Name_Skill_Light_3_2():ILanguageElement{return this.getElement(129)};
	/**操控空间震动，向四周造成攻击*/
	get Introduce_Skill_Fist_Sim_1():ILanguageElement{return this.getElement(130)};
	/**操控地脉震动，向前方造成三次伤害*/
	get Introduce_Skill_Fist_Sim_2():ILanguageElement{return this.getElement(131)};
	/**引动大地之力，冲击面前的敌人*/
	get Introduce_Skill_Fist_Sim_3():ILanguageElement{return this.getElement(132)};
	/**引出身体深处的力量，轰击前方敌人*/
	get Introduce_Skill_Fist_Sim_4():ILanguageElement{return this.getElement(133)};
	/**将源力引至手中并轰击地面，对四周敌人造成爆炸伤害*/
	get Introduce_Skill_Fist_Sim_5():ILanguageElement{return this.getElement(134)};
	/**吸收四周的力量强化自身，提升自己5攻击力，同时震开四周的敌人*/
	get Introduce_Skill_Fist_Sim_6():ILanguageElement{return this.getElement(135)};
	/**震动空气引动雷霆，飞身砸向前方的敌人*/
	get Introduce_Skill_Fist_Sim_7():ILanguageElement{return this.getElement(136)};
	/**施放狂龙之气，向上打出三段爆炸攻击*/
	get Introduce_Skill_Fist_Sim_8():ILanguageElement{return this.getElement(137)};
	/**飞身而出牵动四周的空气，引发狂风聚集*/
	get Introduce_Skill_Fist_Sim_9():ILanguageElement{return this.getElement(138)};
	/**调动四周的源力并震荡，击退四周的敌人*/
	get Introduce_Skill_Fist_Sim_10():ILanguageElement{return this.getElement(139)};
	/**引动自身雷霆之力向前方挥出一道轰雷剑气*/
	get Introduce_Skill_Thunder_Sim_1():ILanguageElement{return this.getElement(140)};
	/**召唤天雷轰击前方区域三次*/
	get Introduce_Skill_Thunder_Sim_2():ILanguageElement{return this.getElement(141)};
	/**向身后跃起并震退敌人，在空中牵动雷霆附体并向前方发动冲击*/
	get Introduce_Skill_Thunder_Sim_3():ILanguageElement{return this.getElement(142)};
	/**凝聚自身全部力量，短暂蓄力后猛烈砸向脚下*/
	get Introduce_Skill_Thunder_Sim_4():ILanguageElement{return this.getElement(143)};
	/**化身雷霆，向前方进行突刺*/
	get Introduce_Skill_Thunder_Sim_5():ILanguageElement{return this.getElement(144)};
	/**灌注雷力于刀身，呼唤雷暴持续轰击四周的敌人*/
	get Introduce_Skill_Thunder_Sim_6():ILanguageElement{return this.getElement(145)};
	/**引动自身雷霆之力向前方用力挥砍出三道剑气*/
	get Introduce_Skill_Thunder_Sim_7():ILanguageElement{return this.getElement(146)};
	/**牵动雷霆附于自身，增加自身移动速度*/
	get Introduce_Skill_Thunder_Sim_8():ILanguageElement{return this.getElement(147)};
	/**凝聚自身雷力于一点，将四周所有敌人吸引至面前*/
	get Introduce_Skill_Thunder_Sim_9():ILanguageElement{return this.getElement(148)};
	/**施放雷霆的力量挥出雷神一斩，向前方大范围斩出多段剑气*/
	get Introduce_Skill_Thunder_Sim_10():ILanguageElement{return this.getElement(149)};
	/**施放光明之力，向前方降下灭敌光雨*/
	get Introduce_Skill_Light_Sim_1():ILanguageElement{return this.getElement(150)};
	/**聚集能量，持续向前方施放光明冲击*/
	get Introduce_Skill_Light_Sim_2():ILanguageElement{return this.getElement(151)};
	/**化身为光，随后闪烁至当前所看位置并施放冲击*/
	get Introduce_Skill_Light_Sim_3():ILanguageElement{return this.getElement(152)};
	/**引动光明的力量，祝福大地，持续获得治疗效果*/
	get Introduce_Skill_Light_Sim_4():ILanguageElement{return this.getElement(153)};
	/**快速挥舞法杖，施放出光明飞弹*/
	get Introduce_Skill_Light_Sim_5():ILanguageElement{return this.getElement(154)};
	/**引动光明之力并飞出，眩晕命中的敌人*/
	get Introduce_Skill_Light_Sim_6():ILanguageElement{return this.getElement(155)};
	/**使用光明之力灼烧面前的大地，对敌人造成持续伤害*/
	get Introduce_Skill_Light_Sim_7():ILanguageElement{return this.getElement(156)};
	/**聚集光明于一线，轰击面前的敌人并禁锢*/
	get Introduce_Skill_Light_Sim_8():ILanguageElement{return this.getElement(157)};
	/**获得光明祝福，庇佑自身获得减伤*/
	get Introduce_Skill_Light_Sim_9():ILanguageElement{return this.getElement(158)};
	/**引动光明之火，附魔法杖，造成灼烧攻击*/
	get Introduce_Skill_Light_Sim_10():ILanguageElement{return this.getElement(159)};
	/**消耗25能量，操控空间震动，向四周造成四次200%伤害的攻击*/
	get Introduce_Skill_Fist_De_1():ILanguageElement{return this.getElement(160)};
	/**消耗25能量，操控地脉震动，向前方造成三次100%/150%/200%的伤害*/
	get Introduce_Skill_Fist_De_2():ILanguageElement{return this.getElement(161)};
	/**消耗25能量，引动大地之力，冲击面前的敌人，造成两次100%的伤害，之后牵引力量向正前方发动一次200%伤害的冲击*/
	get Introduce_Skill_Fist_De_3():ILanguageElement{return this.getElement(162)};
	/**消耗50能量，引出深处的力量，轰击前方敌人，对自身周围造成一次400%的伤害*/
	get Introduce_Skill_Fist_De_4():ILanguageElement{return this.getElement(163)};
	/**消耗25能量，将源力引至手中并轰击地面，对四周敌人造成200%伤害的爆炸伤害，并减速50%，持续3秒*/
	get Introduce_Skill_Fist_De_5():ILanguageElement{return this.getElement(164)};
	/**消耗50能量，吸收四周的力量强化自身，提升自己50%的攻击力，持续5秒。同时震开四周的敌人，造成100%攻击力的伤害*/
	get Introduce_Skill_Fist_De_6():ILanguageElement{return this.getElement(165)};
	/**消耗55能量，震动空气引动雷霆，飞身砸向前方的敌人，对落点造成200%伤害并禁锢四周的敌人2秒*/
	get Introduce_Skill_Fist_De_7():ILanguageElement{return this.getElement(166)};
	/**消耗55点能量，施放狂龙之气，向上打出三段爆炸攻击，造成50%/100%/150%的伤害，被最后一段攻击命中的敌人会眩晕3秒*/
	get Introduce_Skill_Fist_De_8():ILanguageElement{return this.getElement(167)};
	/**消耗55点能量，飞身而出牵动四周的空气，引发狂风聚集，对落点造成3次50%的伤害并吸引四周的敌人，持续3秒*/
	get Introduce_Skill_Fist_De_9():ILanguageElement{return this.getElement(168)};
	/**消耗50能量，调动四周的源力并震荡，击退四周的敌人并造成150%伤害，同时使自身获得25%减伤效果，使被击中的敌人受到的伤害增加50%，持续5秒*/
	get Introduce_Skill_Fist_De_10():ILanguageElement{return this.getElement(169)};
	/**消耗25能量，引动自身雷霆之力向前方挥出一道轰雷剑气，对命中的敌人造成200%伤害*/
	get Introduce_Skill_Thunder_De_1():ILanguageElement{return this.getElement(170)};
	/**消耗50能量，召唤天雷轰击前方区域三次，每次轰击造成150%伤害，并减速10%，持续3秒*/
	get Introduce_Skill_Thunder_De_2():ILanguageElement{return this.getElement(171)};
	/**消耗50能量，向身后跃起并震退敌人，在空中牵动雷霆附体并向前方发动冲击，期间造成3次50%伤害，落地后造成一次150%伤害，击退敌人并减速10%，持续3秒*/
	get Introduce_Skill_Thunder_De_3():ILanguageElement{return this.getElement(172)};
	/**消耗75能量，凝聚自身全部力量，短暂蓄力后猛烈砸向脚下，对四周造成5次100%伤害*/
	get Introduce_Skill_Thunder_De_4():ILanguageElement{return this.getElement(173)};
	/**消耗50点能量，化身雷霆，向前方进行突刺，对沿途经过的敌人造成400%伤害*/
	get Introduce_Skill_Thunder_De_5():ILanguageElement{return this.getElement(174)};
	/**消耗75能量，灌注雷力于刀身，呼唤雷暴持续轰击四周的敌人，连续造成12次伤害，伤害随时间增加，依次为15%/30%/45%/60%，并对命中的敌人减速10%，持续3秒*/
	get Introduce_Skill_Thunder_De_6():ILanguageElement{return this.getElement(175)};
	/**消耗50点能量，引动自身雷霆之力向前方用力挥砍出三道剑气，依次造成80%/100%/120%伤害，并对命中的敌人减速10%，持续3秒*/
	get Introduce_Skill_Thunder_De_7():ILanguageElement{return this.getElement(176)};
	/**消耗100点能量，牵动雷霆附于自身，10秒内增加自身80%移动速度*/
	get Introduce_Skill_Thunder_De_8():ILanguageElement{return this.getElement(177)};
	/**消耗75点能量，凝聚自身雷力于一点，将四周所有敌人吸引至面前，并造成200%伤害*/
	get Introduce_Skill_Thunder_De_9():ILanguageElement{return this.getElement(178)};
	/**消耗75点能量，施放雷霆的力量挥出雷神一斩，向前方大范围斩出多段剑气，每段剑气造成150%伤害并对命中的敌人减速10%，持续3秒*/
	get Introduce_Skill_Thunder_De_10():ILanguageElement{return this.getElement(179)};
	/**施放光明之力，向前方降下灭敌光雨，对面前区域造成10次40%的伤害*/
	get Introduce_Skill_Light_De_1():ILanguageElement{return this.getElement(180)};
	/**聚集能量，持续向前方施放光明冲击，对前方直线区域持续造成10次30%伤害，并造成10%减速*/
	get Introduce_Skill_Light_De_2():ILanguageElement{return this.getElement(181)};
	/**化身为光，随后闪烁至当前所看位置并施放冲击，对落地范围造成300%伤害*/
	get Introduce_Skill_Light_De_3():ILanguageElement{return this.getElement(182)};
	/**引动光明的力量，祝福大地，持续获得治疗效果，技能范围内持续恢复20次20%攻击力的血量*/
	get Introduce_Skill_Light_De_4():ILanguageElement{return this.getElement(183)};
	/**快速挥舞法杖，施放出12个可追踪敌人的光明飞弹，每个飞弹造成10%伤害并减速2%*/
	get Introduce_Skill_Light_De_5():ILanguageElement{return this.getElement(184)};
	/**引动光明之力并飞出，眩晕命中的敌人1秒，并造成200%伤害*/
	get Introduce_Skill_Light_De_6():ILanguageElement{return this.getElement(185)};
	/**使用光明之力灼烧面前的大地，对敌人造成持续伤害，每次伤害20%*/
	get Introduce_Skill_Light_De_7():ILanguageElement{return this.getElement(186)};
	/**聚集光明于一线，轰击面前的敌人并禁锢3秒，造成500%的伤害*/
	get Introduce_Skill_Light_De_8():ILanguageElement{return this.getElement(187)};
	/**获得光明祝福，庇佑自身获得40%减伤，持续8秒*/
	get Introduce_Skill_Light_De_9():ILanguageElement{return this.getElement(188)};
	/**引动光明之火，附魔法杖，使攻击造成20%持续2秒的dot伤害*/
	get Introduce_Skill_Light_De_10():ILanguageElement{return this.getElement(189)};
	/**替换*/
	get UI_SkillSelect_BtnTxt_1():ILanguageElement{return this.getElement(190)};
	/**选择*/
	get UI_SkillSelect_BtnTxt_2():ILanguageElement{return this.getElement(191)};
	/**已拥有*/
	get UI_SkillSelect_BtnTxt_3():ILanguageElement{return this.getElement(192)};
	/**稍后选择*/
	get UI_SkillSelect_BtnTxt_4():ILanguageElement{return this.getElement(193)};
	/**放弃（G）*/
	get UI_SkillSelect_BtnTxt_5():ILanguageElement{return this.getElement(194)};
	/**选择一个技能将其替换↘*/
	get UI_SkillSelect_BtnTxt_6():ILanguageElement{return this.getElement(195)};
	/**返回*/
	get UI_SkillSelect_BtnTxt_7():ILanguageElement{return this.getElement(196)};
	/**点击过快*/
	get Shop_tips_3():ILanguageElement{return this.getElement(197)};
	/**对话*/
	get Dialog_Npc_Btn_1():ILanguageElement{return this.getElement(198)};
	/**结束对话*/
	get Dialog_Npc_Btn_2():ILanguageElement{return this.getElement(199)};
	/**能量不足*/
	get Text_MainUI_2():ILanguageElement{return this.getElement(200)};
	/**亲亲*/
	get action_1():ILanguageElement{return this.getElement(201)};
	/**指指点点*/
	get action_2():ILanguageElement{return this.getElement(202)};
	/**赞同*/
	get action_3():ILanguageElement{return this.getElement(203)};
	/**摇头*/
	get action_4():ILanguageElement{return this.getElement(204)};
	/**大笑*/
	get action_5():ILanguageElement{return this.getElement(205)};
	/**哭*/
	get action_6():ILanguageElement{return this.getElement(206)};
	/**拍照*/
	get action_7():ILanguageElement{return this.getElement(207)};
	/**拍照2*/
	get action_8():ILanguageElement{return this.getElement(208)};
	/**鼓掌*/
	get action_9():ILanguageElement{return this.getElement(209)};
	/**打哈欠*/
	get action_10():ILanguageElement{return this.getElement(210)};
	/**欢呼*/
	get action_11():ILanguageElement{return this.getElement(211)};
	/**敬礼*/
	get action_12():ILanguageElement{return this.getElement(212)};
	/**困惑*/
	get action_13():ILanguageElement{return this.getElement(213)};
	/**惊喜*/
	get action_14():ILanguageElement{return this.getElement(214)};
	/**举手*/
	get action_15():ILanguageElement{return this.getElement(215)};
	/**逮捕*/
	get action_16():ILanguageElement{return this.getElement(216)};
	/**受伤*/
	get action_17():ILanguageElement{return this.getElement(217)};
	/**坐下*/
	get action_18():ILanguageElement{return this.getElement(218)};
	/**坐下2*/
	get action_19():ILanguageElement{return this.getElement(219)};
	/**躺*/
	get action_20():ILanguageElement{return this.getElement(220)};
	/**潜行*/
	get action_21():ILanguageElement{return this.getElement(221)};
	/**跳跃*/
	get action_22():ILanguageElement{return this.getElement(222)};
	/**后空翻*/
	get action_23():ILanguageElement{return this.getElement(223)};
	/**开心*/
	get action_24():ILanguageElement{return this.getElement(224)};
	/**痛苦*/
	get action_25():ILanguageElement{return this.getElement(225)};
	/**爬行*/
	get action_26():ILanguageElement{return this.getElement(226)};
	/**健身操*/
	get action_27():ILanguageElement{return this.getElement(227)};
	/**咆哮*/
	get action_28():ILanguageElement{return this.getElement(228)};
	/**无聊*/
	get action_29():ILanguageElement{return this.getElement(229)};
	/**悲伤*/
	get action_30():ILanguageElement{return this.getElement(230)};
	/**平衡*/
	get action_31():ILanguageElement{return this.getElement(231)};
	/**舞蹈1*/
	get action_32():ILanguageElement{return this.getElement(232)};
	/**舞蹈2*/
	get action_33():ILanguageElement{return this.getElement(233)};
	/**舞蹈3*/
	get action_34():ILanguageElement{return this.getElement(234)};
	/**舞蹈4*/
	get action_35():ILanguageElement{return this.getElement(235)};
	/**舞蹈5*/
	get action_36():ILanguageElement{return this.getElement(236)};
	/**仰面朝天*/
	get action_37():ILanguageElement{return this.getElement(237)};
	/**趴下*/
	get action_38():ILanguageElement{return this.getElement(238)};
	/**委屈蹲坐*/
	get action_39():ILanguageElement{return this.getElement(239)};
	/**捧腹大笑*/
	get action_40():ILanguageElement{return this.getElement(240)};
	/**思考*/
	get action_41():ILanguageElement{return this.getElement(241)};
	/**跪拜*/
	get action_42():ILanguageElement{return this.getElement(242)};
	/**坐地上*/
	get action_43():ILanguageElement{return this.getElement(243)};
	/**靠墙站立*/
	get action_44():ILanguageElement{return this.getElement(244)};
	/**Pollo*/
	get action_45():ILanguageElement{return this.getElement(245)};
	/**冥想*/
	get action_46():ILanguageElement{return this.getElement(246)};
	/**包扎*/
	get action_47():ILanguageElement{return this.getElement(247)};
	/**偷亲*/
	get action_48():ILanguageElement{return this.getElement(248)};
	/**被偷亲*/
	get action_49():ILanguageElement{return this.getElement(249)};
	/**踹*/
	get action_50():ILanguageElement{return this.getElement(250)};
	/**攻击*/
	get action_51():ILanguageElement{return this.getElement(251)};
	/**吓晕*/
	get action_52():ILanguageElement{return this.getElement(252)};
	/**宠物玩耍*/
	get action_53():ILanguageElement{return this.getElement(253)};
	/**扮鬼*/
	get action_54():ILanguageElement{return this.getElement(254)};
	/**左比心*/
	get action_55():ILanguageElement{return this.getElement(255)};
	/**右比心*/
	get action_56():ILanguageElement{return this.getElement(256)};
	/**熊抱*/
	get action_57():ILanguageElement{return this.getElement(257)};
	/**拜拜*/
	get action_58():ILanguageElement{return this.getElement(258)};
	/**你好*/
	get action_59():ILanguageElement{return this.getElement(259)};
	/**拒绝*/
	get action_60():ILanguageElement{return this.getElement(260)};
	/**嘲讽*/
	get action_61():ILanguageElement{return this.getElement(261)};
	/**狗蹲*/
	get action_62():ILanguageElement{return this.getElement(262)};
	/**鸵鸟*/
	get action_63():ILanguageElement{return this.getElement(263)};
	/**压腿*/
	get action_64():ILanguageElement{return this.getElement(264)};
	/**倒地*/
	get action_65():ILanguageElement{return this.getElement(265)};
	/**滚动*/
	get action_66():ILanguageElement{return this.getElement(266)};
	/**惋惜*/
	get action_67():ILanguageElement{return this.getElement(267)};
	/**空中翻滚*/
	get action_68():ILanguageElement{return this.getElement(268)};
	/**ditto*/
	get action_69():ILanguageElement{return this.getElement(269)};
	/**girls*/
	get action_70():ILanguageElement{return this.getElement(270)};
	/**idol*/
	get action_71():ILanguageElement{return this.getElement(271)};
	/**lovedive*/
	get action_72():ILanguageElement{return this.getElement(272)};
	/**savage*/
	get action_73():ILanguageElement{return this.getElement(273)};
	/**梅尼耶*/
	get action_74():ILanguageElement{return this.getElement(274)};
	/**Thunderous*/
	get action_75():ILanguageElement{return this.getElement(275)};
	/**叮叮当当当*/
	get action_76():ILanguageElement{return this.getElement(276)};
	/**英勇黄铜*/
	get Rank_name_1():ILanguageElement{return this.getElement(277)};
	/**不屈白银*/
	get Rank_name_2():ILanguageElement{return this.getElement(278)};
	/**荣耀黄金*/
	get Rank_name_3():ILanguageElement{return this.getElement(279)};
	/**华贵铂金*/
	get Rank_name_4():ILanguageElement{return this.getElement(280)};
	/**璀璨钻石*/
	get Rank_name_5():ILanguageElement{return this.getElement(281)};
	/**超凡大师*/
	get Rank_name_6():ILanguageElement{return this.getElement(282)};
	/**最强王者*/
	get Rank_name_7():ILanguageElement{return this.getElement(283)};
	/**段位*/
	get Rank_title_1():ILanguageElement{return this.getElement(284)};
	/**击败他人即可获取积分！*/
	get Rank_text_7():ILanguageElement{return this.getElement(285)};
	/**被他人击败将会扣除积分！*/
	get Rank_text_8():ILanguageElement{return this.getElement(286)};
	/**积分进度：*/
	get Rank_text_9():ILanguageElement{return this.getElement(287)};
	/**下一段位：{0}*/
	get Rank_text_10():ILanguageElement{return this.getElement(288)};
	/**今日还可获得积分：{0}*/
	get Rank_text_11():ILanguageElement{return this.getElement(289)};
	/**到达{0}解锁奖励*/
	get Rank_text_12():ILanguageElement{return this.getElement(290)};
	/**奖励需前往商店领取*/
	get Rank_text_13():ILanguageElement{return this.getElement(291)};
	/**{0}/{1}*/
	get Rank_text_14():ILanguageElement{return this.getElement(292)};
	/**回城*/
	get Back_name_1():ILanguageElement{return this.getElement(293)};
	/**本次战斗累计获得{0}积分*/
	get Tips_rank_1():ILanguageElement{return this.getElement(294)};
	/**本次战斗累计扣除{0}积分*/
	get Tips_rank_2():ILanguageElement{return this.getElement(295)};
	/**是否支付{0}积分作为门票？*/
	get Tips_rank_3():ILanguageElement{return this.getElement(296)};
	/**击杀特效*/
	get Shop_title_1():ILanguageElement{return this.getElement(297)};
	/**段位奖励*/
	get Shop_title_2():ILanguageElement{return this.getElement(298)};
	/**<color=#FFFF00>【爆炸】</color>要尝尝炮弹的滋味吗？*/
	get Pendant_Kill_1():ILanguageElement{return this.getElement(299)};
	/**<color=#FFFF00>【小恶魔】</color>小恶魔送你最后一程*/
	get Pendant_Kill_2():ILanguageElement{return this.getElement(300)};
	/**<color=#FFFF00>【天雷】</color>天雷滚滚，神罚降临*/
	get Pendant_Kill_3():ILanguageElement{return this.getElement(301)};
	/**<color=#FFFF00>【地刺】</color>贯穿地板的雷霆*/
	get Pendant_Kill_4():ILanguageElement{return this.getElement(302)};
	/**<color=#FFFF00>【幻梦】</color>生命如幻梦泡影，转瞬即逝*/
	get Pendant_Kill_5():ILanguageElement{return this.getElement(303)};
	/**<color=#FFFF00>【绿野仙踪】</color>给佩戴者带来大量移速加成*/
	get Pendant_Wing_7():ILanguageElement{return this.getElement(304)};
	/**<color=#FFFF00>【玄鸟】</color>给佩戴者带来大量攻击力加成*/
	get Pendant_Wing_8():ILanguageElement{return this.getElement(305)};
	/**<color=#FFFF00>【彩虹拖尾】</color>给佩戴者带来大量减伤加成*/
	get Pendant_Trail_7():ILanguageElement{return this.getElement(306)};
	/**<color=#FFFF00>【足球拖尾】</color>给佩戴者带来大量暴伤加成*/
	get Pendant_Trail_8():ILanguageElement{return this.getElement(307)};
	/**<color=#FFFF00>【黄金】</color>黄金段专属外观*/
	get Pendant_Rank_reward_1():ILanguageElement{return this.getElement(308)};
	/**<color=#FFFF00>【铂金】</color>铂金段专属外观*/
	get Pendant_Rank_reward_2():ILanguageElement{return this.getElement(309)};
	/**<color=#FFFF00>【钻石】</color>钻石段专属外观*/
	get Pendant_Rank_reward_3():ILanguageElement{return this.getElement(310)};
	/**<color=#FFFF00>【无双】</color>无双段专属外观*/
	get Pendant_Rank_reward_4():ILanguageElement{return this.getElement(311)};
	/**<color=#FFFF00>【王者】</color>王者段专属外观*/
	get Pendant_Rank_reward_5():ILanguageElement{return this.getElement(312)};
	/**未解锁*/
	get Shop_btn_7():ILanguageElement{return this.getElement(313)};
	/**所有奖励已解锁！*/
	get Rank_text_15():ILanguageElement{return this.getElement(314)};
	/**积分*/
	get Rank_text_16():ILanguageElement{return this.getElement(315)};
	/**玄天圣灵榜*/
	get Rank_text_17():ILanguageElement{return this.getElement(316)};
	/**{0}{1}*/
	get Rank_text_18():ILanguageElement{return this.getElement(317)};
	/**{0}获得了{1}的{2}赏金*/
	get Massacre_text_1():ILanguageElement{return this.getElement(318)};
	/**爆炎大剑*/
	get Weapon_Name_4():ILanguageElement{return this.getElement(319)};
	/**<color=#5DBF4DFF>烈焰突刺</color>*/
	get Name_Skill_Fire_1():ILanguageElement{return this.getElement(320)};
	/**<color=#5DBF4DFF>旋风斩击</color>*/
	get Name_Skill_Fire_2():ILanguageElement{return this.getElement(321)};
	/**<color=#9357BFFF>爆炎重击</color>*/
	get Name_Skill_Fire_3():ILanguageElement{return this.getElement(322)};
	/**<color=#5DBF4DFF>火雨</color>*/
	get Name_Skill_Fire_4():ILanguageElement{return this.getElement(323)};
	/**<color=#5DBF4DFF>烈焰飞劈</color>*/
	get Name_Skill_Fire_5():ILanguageElement{return this.getElement(324)};
	/**<color=#3B93BFFF>巨焰剑气</color>*/
	get Name_Skill_Fire_6():ILanguageElement{return this.getElement(325)};
	/**<color=#3B93BFFF>巨焰竖斩</color>*/
	get Name_Skill_Fire_7():ILanguageElement{return this.getElement(326)};
	/**<color=#5DBF4DFF>飞凰突击</color>*/
	get Name_Skill_Fire_8():ILanguageElement{return this.getElement(327)};
	/**<color=#3B93BFFF>火焰庇护</color>*/
	get Name_Skill_Fire_9():ILanguageElement{return this.getElement(328)};
	/**<color=#9357BFFF>焰能觉醒</color>*/
	get Name_Skill_Fire_10():ILanguageElement{return this.getElement(329)};
	/**牵引火焰，随着剑风轰击前方敌人*/
	get Introduce_Skill_Fire_Sim_1():ILanguageElement{return this.getElement(330)};
	/**挥舞大剑并旋转，对周围的敌人造成持续伤害*/
	get Introduce_Skill_Fire_Sim_2():ILanguageElement{return this.getElement(331)};
	/**施放大剑中的火之力量，对前方的敌人造成毁灭一击*/
	get Introduce_Skill_Fire_Sim_3():ILanguageElement{return this.getElement(332)};
	/**引动火元素，对前方区域造成持续性伤害*/
	get Introduce_Skill_Fire_Sim_4():ILanguageElement{return this.getElement(333)};
	/**举起大剑，伴随着烈焰跳起，轰击前方的敌人*/
	get Introduce_Skill_Fire_Sim_5():ILanguageElement{return this.getElement(334)};
	/**挥舞大剑，先前方施放巨大的火焰剑气*/
	get Introduce_Skill_Fire_Sim_6():ILanguageElement{return this.getElement(335)};
	/**牵引火焰之力并向前方竖劈，对直线上的敌人造成伤害*/
	get Introduce_Skill_Fire_Sim_7():ILanguageElement{return this.getElement(336)};
	/**飞身跃起，以凤凰之姿飞攻前方的敌人*/
	get Introduce_Skill_Fire_Sim_8():ILanguageElement{return this.getElement(337)};
	/**引动火焰庇护自身，降低受到的伤害*/
	get Introduce_Skill_Fire_Sim_9():ILanguageElement{return this.getElement(338)};
	/**施放炎能，击退周围的敌人并加强自身*/
	get Introduce_Skill_Fire_Sim_10():ILanguageElement{return this.getElement(339)};
	/**null*/
	get Introduce_Skill_Fire_De_1():ILanguageElement{return this.getElement(340)};
	/**null*/
	get Introduce_Skill_Fire_De_2():ILanguageElement{return this.getElement(341)};
	/**null*/
	get Introduce_Skill_Fire_De_3():ILanguageElement{return this.getElement(342)};
	/**null*/
	get Introduce_Skill_Fire_De_4():ILanguageElement{return this.getElement(343)};
	/**null*/
	get Introduce_Skill_Fire_De_5():ILanguageElement{return this.getElement(344)};
	/**null*/
	get Introduce_Skill_Fire_De_6():ILanguageElement{return this.getElement(345)};
	/**null*/
	get Introduce_Skill_Fire_De_7():ILanguageElement{return this.getElement(346)};
	/**null*/
	get Introduce_Skill_Fire_De_8():ILanguageElement{return this.getElement(347)};
	/**null*/
	get Introduce_Skill_Fire_De_9():ILanguageElement{return this.getElement(348)};
	/**null*/
	get Introduce_Skill_Fire_De_10():ILanguageElement{return this.getElement(349)};
	/**欢迎<color=#FFFF00>{0}玩家{1}</color>进入本房间！*/
	get Tips_rank_4():ILanguageElement{return this.getElement(350)};
	/**击败{0}玩家，获得积分{1}。*/
	get Tips_rank_5():ILanguageElement{return this.getElement(351)};
	/**被{0}玩家击败，扣除积分{1}。*/
	get Tips_rank_6():ILanguageElement{return this.getElement(352)};
	/**段位展示*/
	get ui_set_txt_14():ILanguageElement{return this.getElement(353)};
	/**点击按钮进行攻击*/
	get guide_text_1():ILanguageElement{return this.getElement(354)};
	/**点击释放技能*/
	get guide_text_2():ILanguageElement{return this.getElement(355)};
	/**你好！欢迎来到无限格斗世界！*/
	get guide_dialog_1():ILanguageElement{return this.getElement(356)};
	/**在这里你可以获得非凡的力量，收集各种武器，驾驭元素之力与其他玩家战斗！*/
	get guide_dialog_2():ILanguageElement{return this.getElement(357)};
	/**相信这个世界一定会留下你的传说历程！*/
	get guide_dialog_3():ILanguageElement{return this.getElement(358)};
	/**下面，先来试试攻击吧！*/
	get guide_dialog_4():ILanguageElement{return this.getElement(359)};
	/**哇！你真厉害，初到这个世界便可以释放出这么强的力量，一定是个天才！*/
	get guide_dialog_5():ILanguageElement{return this.getElement(360)};
	/**你一定还可以发掘出更强的力量。*/
	get guide_dialog_6():ILanguageElement{return this.getElement(361)};
	/**快看！那里是什么，快过去瞧一瞧吧！*/
	get guide_dialog_7():ILanguageElement{return this.getElement(362)};
	/**哇！你获得了一个新的技能，它可以帮助你更好的在这个世界进行战斗。*/
	get guide_dialog_8():ILanguageElement{return this.getElement(363)};
	/**释放技能会消耗能量值哟！每个技能都拥有冷却时间，释放后需要等一会才可以再次施放~*/
	get guide_dialog_9():ILanguageElement{return this.getElement(364)};
	/**这里有一个训练用的木桩，快试试你的新技能的效果吧！*/
	get guide_dialog_10():ILanguageElement{return this.getElement(365)};
	/**哇！你真是太厉害啦！*/
	get guide_dialog_11():ILanguageElement{return this.getElement(366)};
	/**这么难的技能都可以快速学会！*/
	get guide_dialog_12():ILanguageElement{return this.getElement(367)};
	/**现在的你已经可以加入这个世界的冒险啦，做好准备后，就前往标记处吧！*/
	get guide_dialog_13():ILanguageElement{return this.getElement(368)};
	/**技能选择*/
	get UI_SkillSelect_Title_txt():ILanguageElement{return this.getElement(369)};
	/**天下第一*/
	get Rank_text_19():ILanguageElement{return this.getElement(370)};
	/**科目三*/
	get action_77():ILanguageElement{return this.getElement(371)};
	/**木桩*/
	get guide_npc_name():ILanguageElement{return this.getElement(372)};
	/**是否开启锁敌*/
	get setting_text_enemy():ILanguageElement{return this.getElement(373)};
	/**点击任意位置下一步*/
	get guide_UI_tip():ILanguageElement{return this.getElement(374)};
	/**恭喜<color=#FFFF00>{0}</color>玩家段位晋升为<color=#FFFF00>{1}</color>*/
	get Tips_rank_7():ILanguageElement{return this.getElement(375)};
	/**社交*/
	get Social_title_1():ILanguageElement{return this.getElement(376)};
	/**房间玩家*/
	get Social_title_2():ILanguageElement{return this.getElement(377)};
	/**昵称*/
	get Social_title_3():ILanguageElement{return this.getElement(378)};
	/**组队*/
	get Social_btn_1():ILanguageElement{return this.getElement(379)};
	/**已有队*/
	get Social_btn_2():ILanguageElement{return this.getElement(380)};
	/**离队*/
	get Social_btn_3():ILanguageElement{return this.getElement(381)};
	/**同意*/
	get Social_btn_4():ILanguageElement{return this.getElement(382)};
	/**拒绝（{0}s）*/
	get Social_btn_5():ILanguageElement{return this.getElement(383)};
	/**{0}拒绝了你的组队邀请！*/
	get Social_tips_1():ILanguageElement{return this.getElement(384)};
	/**请{0}秒后再试！*/
	get Social_tips_2():ILanguageElement{return this.getElement(385)};
	/**与{0}组队成功！*/
	get Social_tips_3():ILanguageElement{return this.getElement(386)};
	/**成功离队！*/
	get Social_tips_4():ILanguageElement{return this.getElement(387)};
	/**<color=#FFFF00>【炎爆】</color>用火送你最后一程!*/
	get Pendant_Kill_6():ILanguageElement{return this.getElement(388)};
	/**<color=#FFFF00>【水龙卷】</color>沉入海底，那里最安静~*/
	get Pendant_Kill_7():ILanguageElement{return this.getElement(389)};
	/**<color=#FFFF00>【星光拖尾】</color>给佩戴者带来大量移速和减伤加成*/
	get Pendant_Trail_9():ILanguageElement{return this.getElement(390)};
	/**{0}向你发出组队邀请*/
	get Social_tips_5():ILanguageElement{return this.getElement(391)};
	/**{0}已离开队伍*/
	get Social_tips_6():ILanguageElement{return this.getElement(392)};
	/**赏金*/
	get Head_bounty():ILanguageElement{return this.getElement(393)};
	/**战斗次数*/
	get Battle_Times_1():ILanguageElement{return this.getElement(394)};
	/**是否购买战斗次数？*/
	get Buy_Confirm_Text():ILanguageElement{return this.getElement(395)};
	/**购买成功*/
	get Buy_Success_Text():ILanguageElement{return this.getElement(396)};
	/**购买失败*/
	get Buy_Fail_Text():ILanguageElement{return this.getElement(397)};
	/**请打开浏览器前往MOBOX官网進行充值：
https://www.mobox.io*/
	get Deposit_1():ILanguageElement{return this.getElement(398)};
	/**复制网址*/
	get Deposit_2():ILanguageElement{return this.getElement(399)};
	/**复制成功！*/
	get Copy_Success_Text_1():ILanguageElement{return this.getElement(400)};
	/**提示*/
	get Tips_Text_1():ILanguageElement{return this.getElement(401)};
	/**动作*/
	get ui_set_txt_15():ILanguageElement{return this.getElement(402)};
	/**化形*/
	get Prefab_name_9():ILanguageElement{return this.getElement(403)};
	/**购买战斗次数*/
	get Battle_shop_1():ILanguageElement{return this.getElement(404)};
	/**新技能*/
	get SkillSelect_8():ILanguageElement{return this.getElement(405)};
	/**镜头速度*/
	get ui_set_txt_16():ILanguageElement{return this.getElement(406)};
	/**房间ID：{0}*/
	get CurrentRoomId():ILanguageElement{return this.getElement(407)};
	/**切换房间失败！*/
	get JumpGameFailed():ILanguageElement{return this.getElement(408)};
	/**切换房间*/
	get SwitchRoomBtn():ILanguageElement{return this.getElement(409)};
	/**切换至指定房间*/
	get JumpRoomText001():ILanguageElement{return this.getElement(410)};
	/**请输入房间ID*/
	get JumpRoomText002():ILanguageElement{return this.getElement(411)};
	/**确定*/
	get SwitchRoomConfirm():ILanguageElement{return this.getElement(412)};
	/**攻击*/
	get BuffName001():ILanguageElement{return this.getElement(413)};
	/**防御*/
	get BuffName002():ILanguageElement{return this.getElement(414)};
	/**生命*/
	get BuffName003():ILanguageElement{return this.getElement(415)};
	/**能量*/
	get BuffName004():ILanguageElement{return this.getElement(416)};
	/**装备*/
	get EquipTips():ILanguageElement{return this.getElement(417)};
	/**卸下*/
	get UnequipTips():ILanguageElement{return this.getElement(418)};
	/**体力不足！*/
	get StaminaNotEnough():ILanguageElement{return this.getElement(419)};
	/**无敌*/
	get Invincible001():ILanguageElement{return this.getElement(420)};
	/**静音*/
	get ui_set_txt_17():ILanguageElement{return this.getElement(421)};
	/**仙豆*/
	get Online_shop001():ILanguageElement{return this.getElement(422)};
	/**在游戏中使用可获得体力*/
	get Online_shop002():ILanguageElement{return this.getElement(423)};
	/**蓝色飞贼*/
	get Online_shop003():ILanguageElement{return this.getElement(424)};
	/**在奖励地图中捕获龙娘时使用*/
	get Online_shop004():ILanguageElement{return this.getElement(425)};
	/**购买*/
	get Online_shop005():ILanguageElement{return this.getElement(426)};
	/**总计：*/
	get Online_shop006():ILanguageElement{return this.getElement(427)};
	/**结余：*/
	get Online_shop007():ILanguageElement{return this.getElement(428)};
	/**DragonVerse 商城*/
	get Online_shop008():ILanguageElement{return this.getElement(429)};
	/**使用*/
	get Online_shop009():ILanguageElement{return this.getElement(430)};
	/**数量：*/
	get Online_shop010():ILanguageElement{return this.getElement(431)};
	/**确定消耗一瓶仙豆药水并回复{0}体力吗？*/
	get Online_shop011():ILanguageElement{return this.getElement(432)};
	/**确认（E）*/
	get Online_shop012():ILanguageElement{return this.getElement(433)};
	/**取消（Esc）*/
	get Online_shop013():ILanguageElement{return this.getElement(434)};
	/**确认中*/
	get Online_shop014():ILanguageElement{return this.getElement(435)};
	/**扫荡券*/
	get Online_shop016():ILanguageElement{return this.getElement(436)};
	/**快速通关已经取得完美胜利的关卡*/
	get Online_shop017():ILanguageElement{return this.getElement(437)};

}