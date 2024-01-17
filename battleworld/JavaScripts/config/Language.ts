import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_C"],["","Key|ReadByName","MainLanguage","ChildLanguage"],[1,"ui_set_txt_1","Settings","设置"],[2,"ui_set_txt_2","Audio","声音"],[3,"ui_set_txt_3","BGM","背景音乐"],[4,"ui_set_txt_4","Low","低"],[5,"ui_set_txt_5","High","高"],[6,"ui_set_txt_6","SFX","音效"],[7,"ui_set_txt_7","Display","画面"],[8,"ui_set_txt_8","Image Quality","图像质量"],[9,"ui_set_txt_9","Cull Distance","裁剪距离"],[10,"ui_set_txt_10","Saturation","饱和度"],[11,"ui_set_txt_11","Shadow Effect","阴影效果"],[12,"ui_set_txt_12","Operation","操作"],[13,"ui_set_txt_13","FOV","视野缩放"],[14,"battal_dead_01","Defeat","战败"],[15,"battal_dead_02","by {0}","{0}击败了你"],[16,"battal_dead_03","Skills lost, you're now returning to Peace Area...","你的技能已失去，即将返回安全区！"],[17,"battal_dead_04","Welcome back! You won a total of {0} coins in the last round. Keep going!","欢迎归来！上一局你一共获得了{0}金币，继续加油"],[18,"Prefab_name_1","Skill Box","技能盲盒"],[19,"Prefab_name_2","Health Potion","血瓶"],[20,"Prefab_name_3","Coin","金币"],[21,"Scene_name_1","Field Warp","战场传送"],[22,"Shop_btn_1","Wings","翅膀"],[23,"Shop_btn_2","Trails","拖尾"],[24,"Shop_btn_3","Apply","装扮"],[25,"Shop_btn_4","Applied","已装扮"],[26,"Shop_btn_5","Buy","购买"],[27,"Shop_btn_6","Return","返回"],[28,"battal_world_nameLV_20","Peace Area","安全区"],[29,"battal_world_nameLV_21","Rumble Field","顶上战场"],[30,"LandParces_1","A new batch of supplies is about to be delivered!","新一批物资即将刷新！"],[31,"LandParces_2","The ground is about to change! Watch out!","地面即将发生变化！请小心！"],[32,"SkillSelect_1","New skill: {0}","新技能：【{0}】"],[33,"SkillSelect_2","Obtained {0} coins!","获得{0}金币"],[34,"WeaponTip_1","Applied","已拥有"],[35,"WeaponTip_2","Do you want to spend {0} coins on this weapon?","是否花费{0}进行购买"],[36,"WeaponTip_3","Spent {0} coins!","消耗{0}金币"],[37,"WeaponTip_4","Unable to switch weapons now. Try again after completing the battle.","当前无法切换武器，完成战局后再来吧"],[38,"SkillSelect_3","New skill slot! Go apply an additional skill!","技能点+1，请点击技能页面按钮使用"],[39,"SkillSelect_4","New skill slot! Select a skill to apply!","技能点+1，请选择技能"],[40,"Pendant_Wing_1","<color=#FFFF00>Soaring Phoenix</color>: Woven from the feathers of the Phoenix. Adds a small bonus to the wearer's attack.","<color=#FFFF00>【凤舞九天】</color>凤凰火焰所织就的翅膀，给佩戴者带来少量攻击力加成"],[41,"Pendant_Wing_2","<color=#FFFF00>Scarlet Bat</color>: Wings of a nether bat incarnate. Brings life-stealing effect to the wearer.","<color=#FFFF00>【血蝠】</color>幽冥蝠王力量所化，给佩戴者带来少量血量与吸血加成"],[42,"Pendant_Wing_3","<color=#FFFF00>Innocent Cupid</color>: A copy of the one Cupid wears. Adds a small bonus to health and damage reduction effect.","<color=#FFFF00>【丘比特】</color>蕴含丘比特之力，给佩戴者带来少量减伤与血量加成"],[43,"Pendant_Wing_4","<color=#FFFF00>Dark Night</color>: Made with the darkness of nights. Boosts the wearer's crit rate and crit damage.","<color=#FFFF00>【暗夜】</color>残夜之力，给佩戴者带来少量暴击率和暴击伤害加成"],[44,"Pendant_Wing_5","<color=#FFFF00>Lovely Angel</color>: Synthesized from the power of love. Brings a huge bonus to health and damage reduction effect.","<color=#FFFF00>【爱心天使】</color>爱的力量，给佩戴者带来大量血量和减伤加成"],[45,"Pendant_Trail_1","<color=#FFFF00>Comet Trail</color>: Brings a small bonus to the wearer's attack.","<color=#FFFF00>【彗星拖尾】</color>给佩戴者带来少量攻击加成"],[46,"Pendant_Trail_2","<color=#FFFF00>Morning Star</color>: Adds a small bonus to health.","<color=#FFFF00>【启明星拖尾】</color>给佩戴者带来少量血量加成"],[47,"Pendant_Trail_3","<color=#FFFF00>Frozen Land</color>: Brings damage reduction effect to the wearer.","<color=#FFFF00>【冰雪拖尾】</color>给佩戴者带来少量减伤加成"],[48,"Pendant_Trail_4","<color=#FFFF00>Candy Crush</color>: Adds a huge bonus to health.","<color=#FFFF00>【糖果拖尾 】</color>给佩戴者带来大量血量加成"],[49,"Pendant_Trail_5","<color=#FFFF00>Maple Leaf</color>: Adds a huge bonus to the wearer's attack and life-stealing effect.","<color=#FFFF00>【枫叶拖尾】</color>给佩戴者带来大量攻击与吸血加成"],[50,"KillTip_1","{0} has achieved <color=#FFF230>Double Kill</color>!","{0}达成<color=#FFF230>二连胜</color>"],[51,"KillTip_2","{0} has achieved <color=#FFF230>Trible Kill</color>!","{0}达成<color=#FFF230>三连胜</color>"],[52,"KillTip_3","{0} has achieved <color=#FFF230>Field Dominator</color>!","{0}已经<color=#FFF230>统治战场</color>"],[53,"KillTip_4","{0} has achieved <color=#FFF230>Rumble Legend</color>!","{0}已经<color=#FFF230>超神</color>"],[54,"KillTip_5","Triple Kill","三连绝世"],[55,"KillTip_6","Field Dominator","统治战场"],[56,"KillTip_7","Rumble Legend","超神之躯"],[57,"Shop_tips_1","Purchase successful!","购买成功！"],[58,"Shop_tips_2","Not enough coins!","金币不足！"],[59,"Prefab_name_4","Wyvern Shard · <color=#F6663A>Attack↑</color>","龙鳞丹·<color=#F6663A>攻击↑</color>"],[60,"Prefab_name_5","Tortoise Shard · <color=#F6663A>Damage Reduction↑</color>","龟甲丹·<color=#F6663A>减伤↑</color>"],[61,"Prefab_name_6","Calcium Shard · <color=#F6663A>Health↑</color>","生骨丹·<color=#F6663A>血量↑</color>"],[62,"Prefab_name_7","Source Shard · <color=#F6663A>Energy↑</color>","养气丹·<color=#F6663A>能量↑</color>"],[63,"Dialog_Npc_1","Use the field there as a place to test your strength, and fight to your heart's content, kids! Hey, why are you still here? Go have a rumble!","小的们，就以下方区域作为试炼力量的场所，尽情对战吧！咦~你怎么还在这，快下去塔塔开！"],[64,"Dialog_Npc_2","Back then, it was also in this field that I established my title as the <color=#F6663A>Warrior of the Sea</color>.","想当年，也是在这片战场上，立下了我<color=#F6663A>东海第一战士</color>的威名，哈哈哈哈~"],[65,"Dialog_Npc_3","What's wrong with me? First time being here, I just felt the urge to cry looking at the building.","怎么回事，看见对面的建筑，有流泪的冲动，明明是第一次来到这里。"],[66,"Name_Npc_1","Pirate Captain","海盗船长"],[67,"Name_Npc_2","Self-taught Sailor","第一水手"],[68,"Name_Npc_3","Scarf Boy","围巾少年"],[69,"SkillSelect_5","Details","显示详细技能"],[70,"SkillSelect_6","Brief","显示简略技能"],[71,"Name_Npc_4","Sword Master","第一剑客"],[72,"Name_Npc_5","Magic Mentor","魔导师"],[73,"Dialog_Npc_Tap_1","Consult on skills","请教拳术"],[74,"Dialog_Npc_6","<color=#F6663A>Gale Enclosure</color> is a rare control skill. Make sure to learn it well.","狂风聚集是难得的控制技能，建议学习~"],[75,"Dialog_Npc_Tap_2","Learning skills?","学习技能？"],[76,"Dialog_Npc_7","There are <color=#F6663A>random skill boxes</color> on the rumble field. Touch one to gain a new skill!","战场上有名为<color=#F6663A>【技能盲盒】</color>的物件，触碰即可习得新技能！"],[77,"Pendant_Wing_6","<color=#FFFF00>Nebula Cloud</color>: Adds a huge bonus to the wearer's crit rate.","<color=#FFFF00>【星云】</color>给佩戴者带来大量暴击率加成"],[78,"Pendant_Trail_6","<color=#FFFF00>Hexa Mascot</color>: Adds a small bonus to the wearer's crit resistance.","<color=#FFFF00>【六芒星】</color>给佩戴者带来少量抗暴加成"],[79,"battal_dead_05","defeated","击败"],[80,"Dialog_Npc_8","Who, me? I'm the Sword Master of the Region.","我乃西域第一剑客！"],[81,"Dialog_Npc_Tap_3","Consult on skills","请教剑术"],[82,"Dialog_Npc_9","The way of swordsmanship is to be fast. Therefore, <color=#F6663A>Thunder Draw</color> is a must-learn.","剑术之道，唯快不破。所以，<color=#F6663A>【引雷入体】</color>乃必学身法。"],[83,"Rank_text_1","Top Slayers","最强击杀王"],[84,"Rank_text_2","Rank","排名"],[85,"Rank_text_3","Player","昵称"],[86,"Rank_text_4","Defeats","击败数"],[87,"Rank_text_5","Top Survivors","最强生存王"],[88,"Rank_text_6","Time","时长"],[89,"Shop_name_1","Shop","商店"],[90,"Prefab_name_8","character Shard","化形丹"],[91,"Weapon_Name_1","Fist","拳头"],[92,"Weapon_Name_2","Thunder Knife","轰雷刀"],[93,"Weapon_Name_3","Light Pillar","光之杖"],[94,"Name_Npc_Masco_1","Wandering Pomni","闲逛的帕姆尼"],[95,"Name_Skill_Normal_1","Sprint","冲刺"],[96,"Name_Skill_Normal_2","Jump","跳跃"],[97,"Name_Skill_Normal_3","Fall","倒地"],[98,"Name_Skill_Normal_4","Attack","普攻"],[99,"Name_Skill_Fist_1","<color=#5DBF4DFF>Ground Wave</color>","<color=#5DBF4DFF>四方震击</color>"],[100,"Name_Skill_Fist_2","<color=#5DBF4DFF>Earthline Break</color>","<color=#5DBF4DFF>地脉震动</color>"],[101,"Name_Skill_Fist_3","<color=#5DBF4DFF>Force Impact</color>","<color=#5DBF4DFF>引力冲击</color>"],[102,"Name_Skill_Fist_4","<color=#5DBF4DFF>Full Charge</color>","<color=#5DBF4DFF>蓄力冲拳</color>"],[103,"Name_Skill_Fist_5","<color=#5DBF4DFF>Air Burst</color>","<color=#5DBF4DFF>震地空爆</color>"],[104,"Name_Skill_Fist_6","<color=#9357BFFF>Battle Roar</color>","<color=#9357BFFF>战吼</color>"],[105,"Name_Skill_Fist_7","<color=#3B93BFFF>Air Explosion</color>","<color=#3B93BFFF>轰雷震爆</color>"],[106,"Name_Skill_Fist_8","<color=#3B93BFFF>Dragon Scratch</color>","<color=#3B93BFFF>升龙冲拳</color>"],[107,"Name_Skill_Fist_9","<color=#3B93BFFF>Gale Enclosure</color>","<color=#3B93BFFF>狂风聚集</color>"],[108,"Name_Skill_Fist_10","<color=#9357BFFF>Power Surge</color>","<color=#9357BFFF>源力涌动</color>"],[109,"Name_Skill_Thunder_1","<color=#5DBF4DFF>Thunder Kenki</color>","<color=#5DBF4DFF>轰雷剑气</color>"],[110,"Name_Skill_Thunder_2","<color=#5DBF4DFF>Thunder Bomb</color>","<color=#5DBF4DFF>雷霆轰击</color>"],[111,"Name_Skill_Thunder_3","<color=#5DBF4DFF>Bird Trace</color>","<color=#5DBF4DFF>燕返</color>"],[112,"Name_Skill_Thunder_4","<color=#9357BFFF>Great Hit</color>","<color=#9357BFFF>巨雷一击</color>"],[113,"Name_Skill_Thunder_5","<color=#5DBF4DFF>Bird Crowd</color>","<color=#5DBF4DFF>千鸟</color>"],[114,"Name_Skill_Thunder_6","<color=#3B93BFFF>ThunderStrike</color>","<color=#3B93BFFF>引雷</color>"],[115,"Name_Skill_Thunder_7","<color=#3B93BFFF>Thunder Slash</color>","<color=#3B93BFFF>雷霆连斩</color>"],[116,"Name_Skill_Thunder_8","<color=#9357BFFF>Thunder Draw</color>","<color=#9357BFFF>引雷入体</color>"],[117,"Name_Skill_Thunder_9","<color=#3B93BFFF>Thunder Field</color>","<color=#3B93BFFF>聚雷阵</color>"],[118,"Name_Skill_Thunder_10","<color=#9357BFFF>Thunder Slit</color>","<color=#9357BFFF>雷切</color>"],[119,"Name_Skill_Light_1","<color=#5DBF4DFF>Light Arrival</color>","<color=#5DBF4DFF>光明降临</color>"],[120,"Name_Skill_Light_2","<color=#5DBF4DFF>Light Shock</color>","<color=#5DBF4DFF>光之冲击</color>"],[121,"Name_Skill_Light_3","<color=#5DBF4DFF>Light Glare</color>","<color=#5DBF4DFF>炫光一闪</color>"],[122,"Name_Skill_Light_4","<color=#5DBF4DFF>Light Heal</color>","<color=#5DBF4DFF>光明疗愈</color>"],[123,"Name_Skill_Light_5","<color=#5DBF4DFF>Bright Missle</color>","<color=#5DBF4DFF>光之飞弹</color>"],[124,"Name_Skill_Light_6","<color=#3B93BFFF>Light Cage</color>","<color=#3B93BFFF>时光禁锢</color>"],[125,"Name_Skill_Light_7","<color=#3B93BFFF>Holy Domain</color>","<color=#3B93BFFF>圣焰领域</color>"],[126,"Name_Skill_Light_8","<color=#3B93BFFF>Light Cannon</color>","<color=#3B93BFFF>聚能光炮</color>"],[127,"Name_Skill_Light_9","<color=#9357BFFF>Holy Blessing</color>","<color=#9357BFFF>光之庇佑</color>"],[128,"Name_Skill_Light_10","<color=#9357BFFF>Flame Enchantment</color>","<color=#9357BFFF>光焰附魔</color>"],[129,"Name_Skill_Light_3_2","Light Glare II","炫光一闪第二段"],[130,"Introduce_Skill_Fist_Sim_1","Manipulate the vibration of space to attack the surroundings.","操控空间震动，向四周造成攻击"],[131,"Introduce_Skill_Fist_Sim_2","Manipulate the vibration of the earthlines, causing three-time damage to the front.","操控地脉震动，向前方造成三次伤害"],[132,"Introduce_Skill_Fist_Sim_3","Unleash the power of the earth and attack the enemy in front.","引动大地之力，冲击面前的敌人"],[133,"Introduce_Skill_Fist_Sim_4","Draw out the power deep within your body and bombard the enemy ahead.","引出身体深处的力量，轰击前方敌人"],[134,"Introduce_Skill_Fist_Sim_5","Draw source power into your hands, causing explosive damage.","将源力引至手中并轰击地面，对四周敌人造成爆炸伤害"],[135,"Introduce_Skill_Fist_Sim_6","Absorb the power from surroundings to increase your attack by 5.","吸收四周的力量强化自身，提升自己5攻击力，同时震开四周的敌人"],[136,"Introduce_Skill_Fist_Sim_7","Shake the air and trigger thunder towards the enemy in front.","震动空气引动雷霆，飞身砸向前方的敌人"],[137,"Introduce_Skill_Fist_Sim_8","Cast the mad dragon and launch a three-stage explosive attack upwards.","施放狂龙之气，向上打出三段爆炸攻击"],[138,"Introduce_Skill_Fist_Sim_9","Fly out and affect the surrounding air, causing the wind to gather.","飞身而出牵动四周的空气，引发狂风聚集"],[139,"Introduce_Skill_Fist_Sim_10","Mobilize the source energy around and shake to repel the enemies around.","调动四周的源力并震荡，击退四周的敌人"],[140,"Introduce_Skill_Thunder_Sim_1","Draw thunder power and wave sword energy forward.","引动自身雷霆之力向前方挥出一道轰雷剑气"],[141,"Introduce_Skill_Thunder_Sim_2","Summon thunder to bombard the forward area three times.","召唤天雷轰击前方区域三次"],[142,"Introduce_Skill_Thunder_Sim_3","Leap behind and knock enemies back, pulling thunder and charging forward.","向身后跃起并震退敌人，在空中牵动雷霆附体并向前方发动冲击"],[143,"Introduce_Skill_Thunder_Sim_4","Gather all strength and slam on the ground violently.","凝聚自身全部力量，短暂蓄力后猛烈砸向脚下"],[144,"Introduce_Skill_Thunder_Sim_5","Transform into thunder and stab forward.","化身雷霆，向前方进行突刺"],[145,"Introduce_Skill_Thunder_Sim_6","Inject thunder power into the blade, calling for thunderstorms to bombard the enemies.","灌注雷力于刀身，呼唤雷暴持续轰击四周的敌人"],[146,"Introduce_Skill_Thunder_Sim_7","Invoke the thunder power to swing forward and cut out three times.","引动自身雷霆之力向前方用力挥砍出三道剑气"],[147,"Introduce_Skill_Thunder_Sim_8","Control the thunder to attack and increase your speed.","牵动雷霆附于自身，增加自身移动速度"],[148,"Introduce_Skill_Thunder_Sim_9","Concentrate all thunder power, adsorbing all enemies to the front.","凝聚自身雷力于一点，将四周所有敌人吸引至面前"],[149,"Introduce_Skill_Thunder_Sim_10","Cast thunder and slash many sections of sword energy forward.","施放雷霆的力量挥出雷神一斩，向前方大范围斩出多段剑气"],[150,"Introduce_Skill_Light_Sim_1","Unleash the power of light and rain down on the enemy.","施放光明之力，向前方降下灭敌光雨"],[151,"Introduce_Skill_Light_Sim_2","Gather energy and continue to cast light onward.","聚集能量，持续向前方施放光明冲击"],[152,"Introduce_Skill_Light_Sim_3","Incarnate into light, flash to the current position, and cast a shock.","化身为光，随后闪烁至当前所看位置并施放冲击"],[153,"Introduce_Skill_Light_Sim_4","Invoke the power of light, bless the earth, and obtain healing effects.","引动光明的力量，祝福大地，持续获得治疗效果"],[154,"Introduce_Skill_Light_Sim_5","Wave the staff quickly and cast the light missile.","快速挥舞法杖，施放出光明飞弹"],[155,"Introduce_Skill_Light_Sim_6","Invoke the power of light and stun the hit enemy.","引动光明之力并飞出，眩晕命中的敌人"],[156,"Introduce_Skill_Light_Sim_7","Burn the ground with light, causing continuous damage to the enemy.","使用光明之力灼烧面前的大地，对敌人造成持续伤害"],[157,"Introduce_Skill_Light_Sim_8","Gather light on the front line and bombard the enemy.","聚集光明于一线，轰击面前的敌人并禁锢"],[158,"Introduce_Skill_Light_Sim_9","Obtain the blessing of light and gain damage reduction effect.","获得光明祝福，庇佑自身获得减伤"],[159,"Introduce_Skill_Light_Sim_10","Invoke the fire of light, enchant the staff, and cause a scorching attack.","引动光明之火，附魔法杖，造成灼烧攻击"],[160,"Introduce_Skill_Fist_De_1","Consume energy by 25 and manipulate the space to deal 200% damage to the surroundings.","消耗25能量，操控空间震动，向四周造成四次200%伤害的攻击"],[161,"Introduce_Skill_Fist_De_2","Consume energy by 25, manipulate the earthlines to deal 100%, 150%, 200% three-stage damage.","消耗25能量，操控地脉震动，向前方造成三次100%/150%/200%的伤害"],[162,"Introduce_Skill_Fist_De_3","Consume energy by 25, activate the power of the earth to deal damage twice, and launch a 200% damage impact in front.","消耗25能量，引动大地之力，冲击面前的敌人，造成两次100%的伤害，之后牵引力量向正前方发动一次200%伤害的冲击"],[163,"Introduce_Skill_Fist_De_4","Consume energy by 50, draw out the deep power, and deal 400% damage to the surrounding area.","消耗50能量，引出深处的力量，轰击前方敌人，对自身周围造成一次400%的伤害"],[164,"Introduce_Skill_Fist_De_5","Consume energy by 25, direct source energy to bombard the ground, dealing 200% blast damage and slowing the enemies down by 50% for 3s.","消耗25能量，将源力引至手中并轰击地面，对四周敌人造成200%伤害的爆炸伤害，并减速50%，持续3秒"],[165,"Introduce_Skill_Fist_De_6","Consume energy by 25, increase attack by 50% for 5s, and cause 100% attack damage to the surrounding area.","消耗50能量，吸收四周的力量强化自身，提升自己50%的攻击力，持续5秒。同时震开四周的敌人，造成100%攻击力的伤害"],[166,"Introduce_Skill_Fist_De_7","Consume energy by 55, trigger thunder to smash the front, deal 200% damage, and imprison the enemies for 2s.","消耗55能量，震动空气引动雷霆，飞身砸向前方的敌人，对落点造成200%伤害并禁锢四周的敌人2秒"],[167,"Introduce_Skill_Fist_De_8","Consume energy by 55, fire three explosive attacks upwards, causing 50%, 100%, and 150% damage. Enemies hit by the last attack will be stunned for 3s.","消耗55点能量，施放狂龙之气，向上打出三段爆炸攻击，造成50%/100%/150%的伤害，被最后一段攻击命中的敌人会眩晕3秒"],[168,"Introduce_Skill_Fist_De_9","Consume energy by 55, gather strong winds to deal 50% damage 3 times, and adsorb enemies around for 3s.","消耗55点能量，飞身而出牵动四周的空气，引发狂风聚集，对落点造成3次50%的伤害并吸引四周的敌人，持续3秒"],[169,"Introduce_Skill_Fist_De_10","Consume energy by 25, repel enemies around and deal 150% damage. Gain a 25% damage reduction effect, increasing the damage taken by the hit enemy by 50% for 5s.","消耗50能量，调动四周的源力并震荡，击退四周的敌人并造成150%伤害，同时使自身获得25%减伤效果，使被击中的敌人受到的伤害增加50%，持续5秒"],[170,"Introduce_Skill_Thunder_De_1","Consume energy by 25, swing a thunderbolt sword energy forward, dealing 200% damage to the enemy hit.","消耗25能量，引动自身雷霆之力向前方挥出一道轰雷剑气，对命中的敌人造成200%伤害"],[171,"Introduce_Skill_Thunder_De_2","Consume energy by 50, summon thunder to bombard the area ahead three times, each dealing 150% damage and slowing down by 10% for 3s.","消耗50能量，召唤天雷轰击前方区域三次，每次轰击造成150%伤害，并减速10%，持续3秒"],[172,"Introduce_Skill_Thunder_De_3","Consume energy by 50, leap behind and repel the enemy, dealing 50% damage 3 times. Cause 150% damage once after landing, repelling the enemy and slowing them down by 10% for 3s.","消耗50能量，向身后跃起并震退敌人，在空中牵动雷霆附体并向前方发动冲击，期间造成3次50%伤害，落地后造成一次150%伤害，击退敌人并减速10%，持续3秒"],[173,"Introduce_Skill_Thunder_De_4","Consume energy by 75, smash violently to the ground after a short period of storage, causing five times 100% damage to the surrounding area.","消耗75能量，凝聚自身全部力量，短暂蓄力后猛烈砸向脚下，对四周造成5次100%伤害"],[174,"Introduce_Skill_Thunder_De_5","Consume energy by 50, transform into thunder and pierce forward, dealing 400% damage to enemies on the sides.","消耗50点能量，化身雷霆，向前方进行突刺，对沿途经过的敌人造成400%伤害"],[175,"Introduce_Skill_Thunder_De_6","Consume energy by 75, call for thunderstorms to bombard the surrounding enemies, causing 12 consecutive damage and slowing the hit enemy by 10% for 3s.","消耗75能量，灌注雷力于刀身，呼唤雷暴持续轰击四周的敌人，连续造成12次伤害，伤害随时间增加，依次为15%/30%/45%/60%，并对命中的敌人减速10%，持续3秒"],[176,"Introduce_Skill_Thunder_De_7","Consume energy by 50, trigger thunder to slash forward, causing 80%, 100%, and 120% damage in turn and slowing the hit enemy by 10% for 3s.","消耗50点能量，引动自身雷霆之力向前方用力挥砍出三道剑气，依次造成80%/100%/120%伤害，并对命中的敌人减速10%，持续3秒"],[177,"Introduce_Skill_Thunder_De_8","Consume energy by 100, absorb the power of thunder and increase speed by 80% in 10s.","消耗100点能量，牵动雷霆附于自身，10秒内增加自身80%移动速度"],[178,"Introduce_Skill_Thunder_De_9","Consume energy by 75, concentrate all thunder power, dealing 200% damage to all enemies adsorbed to the front.","消耗75点能量，凝聚自身雷力于一点，将四周所有敌人吸引至面前，并造成200%伤害"],[179,"Introduce_Skill_Thunder_De_10","Consume energy by 75, cast thunder to slash multiple times in a wide area forward, each dealing 150% damage and slowing the hit enemy by 10% for 3s.","消耗75点能量，施放雷霆的力量挥出雷神一斩，向前方大范围斩出多段剑气，每段剑气造成150%伤害并对命中的敌人减速10%，持续3秒"],[180,"Introduce_Skill_Light_De_1","Unleash the power of light and rain down on the enemy, causing 10 40% damage.","施放光明之力，向前方降下灭敌光雨，对面前区域造成10次40%的伤害"],[181,"Introduce_Skill_Light_De_2","Cast light impact forward, dealing 10 30% damage to the straight front area and causing 10% deceleration.","聚集能量，持续向前方施放光明冲击，对前方直线区域持续造成10次30%伤害，并造成10%减速"],[182,"Introduce_Skill_Light_De_3","Incarnate into light, flash to the current position, and deal 300% damage to the landing area.","化身为光，随后闪烁至当前所看位置并施放冲击，对落地范围造成300%伤害"],[183,"Introduce_Skill_Light_De_4","Attract the power of light to obtain healing effects continuously, recovering 20% attack 20 times within the skill range.","引动光明的力量，祝福大地，持续获得治疗效果，技能范围内持续恢复20次20%攻击力的血量"],[184,"Introduce_Skill_Light_De_5","Wave your staff quickly and cast 12 light missiles that track enemies, each dealing 10% damage and slowing down by 2%.","快速挥舞法杖，施放出12个可追踪敌人的光明飞弹，每个飞弹造成10%伤害并减速2%"],[185,"Introduce_Skill_Light_De_6","Invoke the power of light and stun the hit enemy for 1s, causing 200% damage.","引动光明之力并飞出，眩晕命中的敌人1秒，并造成200%伤害"],[186,"Introduce_Skill_Light_De_7","Burn the ground with light to cause continuous damage to the enemy, 20% damage each time.","使用光明之力灼烧面前的大地，对敌人造成持续伤害，每次伤害20%"],[187,"Introduce_Skill_Light_De_8","Gather light on the front line to bombard and imprison the enemy for 3s, causing 500% damage.","聚集光明于一线，轰击面前的敌人并禁锢3秒，造成500%的伤害"],[188,"Introduce_Skill_Light_De_9","Obtain the blessing of light and gain a 40% damage reduction effect that continues for 8s.","获得光明祝福，庇佑自身获得40%减伤，持续8秒"],[189,"Introduce_Skill_Light_De_10","Trigger the fire of light and enchant the staff, causing 20% damage-over-time for 2s.","引动光明之火，附魔法杖，使攻击造成20%持续2秒的dot伤害"],[190,"UI_SkillSelect_BtnTxt_1","Apply","替换"],[191,"UI_SkillSelect_BtnTxt_2","Apply","选择"],[192,"UI_SkillSelect_BtnTxt_3","Applied","已拥有"],[193,"UI_SkillSelect_BtnTxt_4","Later","稍后选择"],[194,"UI_SkillSelect_BtnTxt_5","Cancel","放弃"],[195,"UI_SkillSelect_BtnTxt_6","Select a skill you want to replace.","选择一个技能将其替换↘"],[196,"UI_SkillSelect_BtnTxt_7","Return","返回"],[197,"Shop_tips_3","Operation too frequent!","点击过快"],[198,"Dialog_Npc_Btn_1","Dialogue","对话"],[199,"Dialog_Npc_Btn_2","That's okay.","没关系"],[200,"Text_MainUI_2 ","Low energy.","能量不足"],[201,"action_1","Kiss","亲亲"],[202,"action_2","Judge","指指点点"],[203,"action_3","Agree","赞同"],[204,"action_4","Disagree","摇头"],[205,"action_5","Laugh","大笑"],[206,"action_6","Cry","哭"],[207,"action_7","Photo","拍照"],[208,"action_8","Photo 2","拍照2"],[209,"action_9","Applaud","鼓掌"],[210,"action_10","Yawn","打哈欠"],[211,"action_11","Cheer","欢呼"],[212,"action_12","Salute","敬礼"],[213,"action_13","Confused","困惑"],[214,"action_14","Surprised","惊喜"],[215,"action_15","Hands Up","举手"],[216,"action_16","Arrested","逮捕"],[217,"action_17","Injured","受伤"],[218,"action_18","Sit","坐下"],[219,"action_19","Sit 2","坐下2"],[220,"action_20","Lie Down","躺"],[221,"action_21","Sneak","潜行"],[222,"action_22","Jump","跳跃"],[223,"action_23","Backflip","后空翻"],[224,"action_24","Happy","开心"],[225,"action_25","Painful","痛苦"],[226,"action_26","Crawl","爬行"],[227,"action_27","Aerobics","健身操"],[228,"action_28","Growl","咆哮"],[229,"action_29","Bored","无聊"],[230,"action_30","Sad","悲伤"],[231,"action_31","Balance","平衡"],[232,"action_32","Dance 1","舞蹈1"],[233,"action_33","Dance 2","舞蹈2"],[234,"action_34","Dance 3","舞蹈3"],[235,"action_35","Dance 4","舞蹈4"],[236,"action_36","Dance 5","舞蹈5"],[237,"action_37","Upside Down","仰面朝天"],[238,"action_38","Get Down","趴下"],[239,"action_39","Aggrieved","委屈蹲坐"],[240,"action_40","Lol","捧腹大笑"],[241,"action_41","Think","思考"],[242,"action_42","Kneel","跪拜"],[243,"action_43","Chill","坐地上"],[244,"action_44","Relaxed","靠墙站立"],[245,"action_45","Pollo","Pollo"],[246,"action_46","Meditate","冥想"],[247,"action_47","Bandaged","包扎"],[248,"action_48","Sudden Kiss","偷亲"],[249,"action_49","Kissed","被偷亲"],[250,"action_50","Kick","踹"],[251,"action_51","Attack","攻击"],[252,"action_52","Faint","吓晕"],[253,"action_53","Play with Pet","宠物玩耍"],[254,"action_54","Play Ghost","扮鬼"],[255,"action_55","Heart-L","左比心"],[256,"action_56","Heart-R","右比心"],[257,"action_57","Hug","熊抱"],[258,"action_58","Bye","拜拜"],[259,"action_59","Hello","你好"],[260,"action_60","Refuse","拒绝"],[261,"action_61","Taunt","嘲讽"],[262,"action_62","Dog","狗蹲"],[263,"action_63","Ostrich","鸵鸟"],[264,"action_64","Stretch","压腿"],[265,"action_65","Fall","倒地"],[266,"action_66","Scroll","滚动"],[267,"action_67","Regret","惋惜"],[268,"action_68","Tumble","空中翻滚"],[269,"action_69","Ditto","ditto"],[270,"action_70","Girls","girls"],[271,"action_71","idol","idol"],[272,"action_72","Love Dive","lovedive"],[273,"action_73","Savage","savage"],[274,"action_74","Maniac","梅尼耶"],[275,"action_75","Thunderous","Thunderous"],[276,"action_76","Jingle Bells","叮叮当当当"],[277,"Rank_name_1","Bronze Sailor","练气"],[278,"Rank_name_2","Silver Sailor","筑基"],[279,"Rank_name_3","Golden Officer","金丹"],[280,"Rank_name_4","Platinum Captain","元婴"],[281,"Rank_name_5","Diamond Colonel","化神"],[282,"Rank_name_6","Unique General","炼虚"],[283,"Rank_name_7","Great Marshal","合体"],[284,"Rank_title_1","Rank","段位"],[285,"Rank_text_7","Beat others to earn points!","击败他人即可获取修为！"],[286,"Rank_text_8","Points will be deducted if you are defeated by others!","被他人击败将会扣除修为！"],[287,"Rank_text_9","Points: ","修炼进度："],[288,"Rank_text_10","Next Rank: {0}","下一段位：{0}"],[289,"Rank_text_11","Points Available Today: {0}","今日还可获得修为：{0}"],[290,"Rank_text_12","Reach {0} to unlock reward","到达{0}解锁奖励"],[291,"Rank_text_13","Rewards need to be collected at the shop.","奖励需前往商店领取"],[292,"Rank_text_14","{0}/{1}","{0}/{1}"],[293,"Back_name_1","Return","回城"],[294,"Tips_rank_1","Points Earned: {0}","本次战斗累计获得{0}修为"],[295,"Tips_rank_2","Points Deducted: {0}","本次战斗累计扣除{0}修为"],[296,"Tips_rank_3","Pay {0} points as a ticket?","是否支付{0}修为作为门票？"],[297,"Shop_title_1","Slay FX","击杀特效"],[298,"Shop_title_2","Rank Reward","段位奖励"],[299,"Pendant_Kill_1","<color=#FFFF00>Explosion</color> · You wanna know what it s like to be bombed?","<color=#FFFF00>【爆炸】</color>要尝尝炮弹的滋味吗？"],[300,"Pendant_Kill_2","<color=#FFFF00>Tiny Devil</color> · I'll give you the last ride.","<color=#FFFF00>【小恶魔】</color>小恶魔送你最后一程"],[301,"Pendant_Kill_3","<color=#FFFF00>Thunder</color> · It's the punishment from the sky.","<color=#FFFF00>【天雷】</color>天雷滚滚，神罚降临"],[302,"Pendant_Kill_4","<color=#FFFF00>Ground Thorn</color> · Running through the earth!","<color=#FFFF00>【地刺】</color>贯穿地板的雷霆"],[303,"Pendant_Kill_5","<color=#FFFF00>Fantasy</color> · Life is ephemeral, like a bubble.","<color=#FFFF00>【幻梦】</color>生命如幻梦泡影，转瞬即逝"],[304,"Pendant_Wing_7","<color=#FFFF00>Wizard of Oz</color> · Let it speed you up!","<color=#FFFF00>【绿野仙踪】</color>给佩戴者带来大量移速加成"],[305,"Pendant_Wing_8","<color=#FFFF00>Songbird</color> · Bonus to the wearer's ATK.","<color=#FFFF00>【玄鸟】</color>给佩戴者带来大量攻击力加成"],[306,"Pendant_Trail_7","<color=#FFFF00>Rainbow Trail</color> · Reduces the damage taken by the wearer.","<color=#FFFF00>【彩虹拖尾】</color>给佩戴者带来大量减伤加成"],[307,"Pendant_Trail_8","<color=#FFFF00>Football Trail</color> · Brings critical damage bonus to the wearer.","<color=#FFFF00>【足球拖尾】</color>给佩戴者带来大量暴伤加成"],[308,"Pendant_Rank_reward_1","<color=#FFFF00>Golden Officer</color> · Exclusive appearance of Virtuoso Phase.","<color=#FFFF00>【金丹】</color>金丹期专属外观"],[309,"Pendant_Rank_reward_2","<color=#FFFF00>Platinum Captain</color> · Exclusive appearance of Immortality Phase.","<color=#FFFF00>【元婴】</color>元婴期专属外观"],[310,"Pendant_Rank_reward_3","<color=#FFFF00>Diamond Colonel</color> · Exclusive appearance of Incarnation Phase.","<color=#FFFF00>【化神】</color>化神期专属外观"],[311,"Pendant_Rank_reward_4","<color=#FFFF00>Unique General</color> · Exclusive appearance of Divinity Phase.","<color=#FFFF00>【炼虚】</color>炼虚期专属外观"],[312,"Pendant_Rank_reward_5","<color=#FFFF00>Great Marshal</color> · Exclusive appearance of Transcendence Phase.","<color=#FFFF00>【合体】</color>合体期专属外观"],[313,"Shop_btn_7","Locked","未解锁"],[314,"Rank_text_15","All rewards are unlocked!","所有奖励已解锁！"],[315,"Rank_text_16","Points","修为"],[316,"Rank_text_17","Rank","玄天圣灵榜"],[317,"Rank_text_18","{0}{1}","{0}{1}"],[318,"Massacre_text_1","{0} obtained {2} bounty reward from {1}!","{0}获得了{1}的{2}赏金"],[319,"Weapon_Name_4","Explosive Sword","爆炎大剑"],[320,"Name_Skill_Fire_1","<color=#5DBF4DFF>Fire Burst</color>","<color=#5DBF4DFF>烈焰突刺</color>"],[321,"Name_Skill_Fire_2","<color=#5DBF4DFF>Gale Strike</color>","<color=#5DBF4DFF>旋风斩击</color>"],[322,"Name_Skill_Fire_3","<color=#9357BFFF>Flame Blast</color>","<color=#9357BFFF>爆炎重击</color>"],[323,"Name_Skill_Fire_4","<color=#5DBF4DFF>Fire Rain</color>","<color=#5DBF4DFF>火雨</color>"],[324,"Name_Skill_Fire_5","<color=#5DBF4DFF>Flame Hack</color>","<color=#5DBF4DFF>烈焰飞劈</color>"],[325,"Name_Skill_Fire_6","<color=#3B93BFFF>Sword Energy</color>","<color=#3B93BFFF>巨焰剑气</color>"],[326,"Name_Skill_Fire_7","<color=#3B93BFFF>Giant Slash</color>","<color=#3B93BFFF>巨焰竖斩</color>"],[327,"Name_Skill_Fire_8","<color=#5DBF4DFF>Phoenix Dash</color>","<color=#5DBF4DFF>飞凰突击</color>"],[328,"Name_Skill_Fire_9","<color=#3B93BFFF>Flame Shelter</color>","<color=#3B93BFFF>火焰庇护</color>"],[329,"Name_Skill_Fire_10","<color=#9357BFFF>Flame Awakening</color>","<color=#9357BFFF>焰能觉醒</color>"],[330,"Introduce_Skill_Fire_Sim_1","Draw the flames and bombard the enemies ahead with the sword wind.","牵引火焰，随着剑风轰击前方敌人"],[331,"Introduce_Skill_Fire_Sim_2","Swing a large sword and deal sustained damage to surrounding enemies.","挥舞大剑并旋转，对周围的敌人造成持续伤害"],[332,"Introduce_Skill_Fire_Sim_3","Unleash the power of fire and deal a devastating blow to the enemy in front.","施放大剑中的火之力量，对前方的敌人造成毁灭一击"],[333,"Introduce_Skill_Fire_Sim_4","Trigger fire to deal sustained damage to the area ahead.","引动火元素，对前方区域造成持续性伤害"],[334,"Introduce_Skill_Fire_Sim_5","Jump up with the flames and bombard the enemies in front.","举起大剑，伴随着烈焰跳起，轰击前方的敌人"],[335,"Introduce_Skill_Fire_Sim_6","Swing the sword and cast sword energy.","挥舞大剑，先前方施放巨大的火焰剑气"],[336,"Introduce_Skill_Fire_Sim_7","Draw the power of fire and deal damage to enemies in a straight line.","牵引火焰之力并向前方竖劈，对直线上的敌人造成伤害"],[337,"Introduce_Skill_Fire_Sim_8","Fly up and attack the enemy ahead","飞身跃起，以凤凰之姿飞攻前方的敌人"],[338,"Introduce_Skill_Fire_Sim_9","Draw fire to defend and reduce damage taken.","引动火焰庇护自身，降低受到的伤害"],[339,"Introduce_Skill_Fire_Sim_10","Repel surrounding enemies and strengthen yourself.","施放炎能，击退周围的敌人并加强自身"],[340,"Introduce_Skill_Fire_De_1",null,null],[341,"Introduce_Skill_Fire_De_2",null,null],[342,"Introduce_Skill_Fire_De_3",null,null],[343,"Introduce_Skill_Fire_De_4",null,null],[344,"Introduce_Skill_Fire_De_5",null,null],[345,"Introduce_Skill_Fire_De_6",null,null],[346,"Introduce_Skill_Fire_De_7",null,null],[347,"Introduce_Skill_Fire_De_8",null,null],[348,"Introduce_Skill_Fire_De_9",null,null],[349,"Introduce_Skill_Fire_De_10",null,null],[350,"Tips_rank_4","Welcome <color=#FFFF00>{0} {1}</color> into this room!","欢迎<color=#FFFF00>{0}玩家{1}</color>进入本房间！"],[351,"Tips_rank_5","You defeated {0}, + {1} points!","击败{0}玩家，获得修为{1}。"],[352,"Tips_rank_6","You're defeated by {0}, - {1} points.","被{0}玩家击败，扣除修为{1}。"],[353,"ui_set_txt_14","Display Rank","段位展示"],[354,"guide_text_1","Tap here to attack","点击按钮进行攻击"],[355,"guide_text_2","Tap to release skills","点击释放技能"],[356,"guide_dialog_1","Hello! Welcome to Unlimited Rumble.","你好！欢迎来到无限格斗世界！"],[357,"guide_dialog_2","Here you can gain extraordinary power, collect various weapons, and harness the power of the elements to battle against other players!","在这里你可以获得非凡的力量，收集各种武器，驾驭元素之力与其他玩家战斗！"],[358,"guide_dialog_3","Believe that your legend will be etched into the history of this world!","相信这个世界一定会留下你的传说历程！"],[359,"guide_dialog_4","Now, let's try the attack first!","下面，先来试试攻击吧！"],[360,"guide_dialog_5","You're impressive, unleashing such power right from the start.","哇！你真厉害，初到这个世界便可以释放出这么强的力量，一定是个天才！"],[361,"guide_dialog_6","You must be able to unearth even greater power.","你一定还可以发掘出更强的力量。"],[362,"guide_dialog_7","What's there? Go and have a look!","快看！那里是什么，快过去瞧一瞧吧！"],[363,"guide_dialog_8","Wow! You have gained a new skill that can help you better fight in this world.","哇！你获得了一个新的技能，它可以帮助你更好的在这个世界进行战斗。"],[364,"guide_dialog_9","Using skills consumes energy! Each skill has a cooldown, so wait a bit before casting it again.","释放技能会消耗能量值哟！每个技能都拥有冷却时间，释放后需要等一会才可以再次施放~"],[365,"guide_dialog_10","Here's a training stake. Try your new skill!","这里有一个训练用的木桩，快试试你的新技能的效果吧！"],[366,"guide_dialog_11","Wow! You‘re impressive!","哇！你真是太厉害啦！"],[367,"guide_dialog_12","Even with such challenging skills, you manage to learn them quickly!","这么难的技能都可以快速学会！"],[368,"guide_dialog_13","Now you can join the adventure of this world. Head to the marked location when you're ready!","现在的你已经可以加入这个世界的冒险啦，做好准备后，就前往标记处吧！"],[369,"UI_SkillSelect_Title_txt","Skill Selection","技能选择"],[370,"Rank_text_19","G.O.A.T","天下第一"],[371,"action_77","Cheesy Dance","科目三"],[372,"guide_npc_name","Stake","木桩"],[373,"setting_text_enemy","Lock","是否开启锁敌"],[374,"guide_UI_tip","Click anywhere to proceed to the next step.","点击任意位置下一步"],[375,"Tips_rank_7",null,"恭喜<color=#FFFF00>{0}</color>玩家段位晋升为<color=#FFFF00>{1}</color>"],[376,"Social_title_1",null,"社交"],[377,"Social_title_2",null,"房间玩家"],[378,"Social_title_3",null,"昵称"],[379,"Social_btn_1",null,"组队"],[380,"Social_btn_2",null,"已有队"],[381,"Social_btn_3",null,"离队"],[382,"Social_btn_4",null,"同意"],[383,"Social_btn_5",null,"拒绝（{0}s）"],[384,"Social_tips_1",null,"{0}拒绝了你的组队邀请！"],[385,"Social_tips_2",null,"请{0}秒后再试！"],[386,"Social_tips_3",null,"与{0}组队成功！"],[387,"Social_tips_4",null,"成功离队！"],[388,"Pendant_Kill_6",null,"<color=#FFFF00>【炎爆】</color>用火送你最后一程!"],[389,"Pendant_Kill_7",null,"<color=#FFFF00>【水龙卷】</color>沉入海底，那里最安静~"],[390,"Pendant_Trail_9",null,"<color=#FFFF00>【星光拖尾】</color>给佩戴者带来大量移速和减伤加成"],[391,"Social_tips_5",null,"{0}向你发出组队邀请"],[392,"Social_tips_6",null,"{0}已离开队伍"],[393,"Head_bounty","Bounty","赏金"]];
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
	/**新技能：【{0}】*/
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
	/**想当年，也是在这片战场上，立下了我<color=#F6663A>东海第一战士</color>的威名，哈哈哈哈~*/
	get Dialog_Npc_2():ILanguageElement{return this.getElement(64)};
	/**怎么回事，看见对面的建筑，有流泪的冲动，明明是第一次来到这里。*/
	get Dialog_Npc_3():ILanguageElement{return this.getElement(65)};
	/**海盗船长*/
	get Name_Npc_1():ILanguageElement{return this.getElement(66)};
	/**第一水手*/
	get Name_Npc_2():ILanguageElement{return this.getElement(67)};
	/**围巾少年*/
	get Name_Npc_3():ILanguageElement{return this.getElement(68)};
	/**显示详细技能*/
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
	/**拳头*/
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
	/**放弃*/
	get UI_SkillSelect_BtnTxt_5():ILanguageElement{return this.getElement(194)};
	/**选择一个技能将其替换↘*/
	get UI_SkillSelect_BtnTxt_6():ILanguageElement{return this.getElement(195)};
	/**返回*/
	get UI_SkillSelect_BtnTxt_7():ILanguageElement{return this.getElement(196)};
	/**点击过快*/
	get Shop_tips_3():ILanguageElement{return this.getElement(197)};
	/**对话*/
	get Dialog_Npc_Btn_1():ILanguageElement{return this.getElement(198)};
	/**没关系*/
	get Dialog_Npc_Btn_2():ILanguageElement{return this.getElement(199)};
	/**能量不足*/
	get Text_MainUI_2 ():ILanguageElement{return this.getElement(200)};
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
	/**练气*/
	get Rank_name_1():ILanguageElement{return this.getElement(277)};
	/**筑基*/
	get Rank_name_2():ILanguageElement{return this.getElement(278)};
	/**金丹*/
	get Rank_name_3():ILanguageElement{return this.getElement(279)};
	/**元婴*/
	get Rank_name_4():ILanguageElement{return this.getElement(280)};
	/**化神*/
	get Rank_name_5():ILanguageElement{return this.getElement(281)};
	/**炼虚*/
	get Rank_name_6():ILanguageElement{return this.getElement(282)};
	/**合体*/
	get Rank_name_7():ILanguageElement{return this.getElement(283)};
	/**段位*/
	get Rank_title_1():ILanguageElement{return this.getElement(284)};
	/**击败他人即可获取修为！*/
	get Rank_text_7():ILanguageElement{return this.getElement(285)};
	/**被他人击败将会扣除修为！*/
	get Rank_text_8():ILanguageElement{return this.getElement(286)};
	/**修炼进度：*/
	get Rank_text_9():ILanguageElement{return this.getElement(287)};
	/**下一段位：{0}*/
	get Rank_text_10():ILanguageElement{return this.getElement(288)};
	/**今日还可获得修为：{0}*/
	get Rank_text_11():ILanguageElement{return this.getElement(289)};
	/**到达{0}解锁奖励*/
	get Rank_text_12():ILanguageElement{return this.getElement(290)};
	/**奖励需前往商店领取*/
	get Rank_text_13():ILanguageElement{return this.getElement(291)};
	/**{0}/{1}*/
	get Rank_text_14():ILanguageElement{return this.getElement(292)};
	/**回城*/
	get Back_name_1():ILanguageElement{return this.getElement(293)};
	/**本次战斗累计获得{0}修为*/
	get Tips_rank_1():ILanguageElement{return this.getElement(294)};
	/**本次战斗累计扣除{0}修为*/
	get Tips_rank_2():ILanguageElement{return this.getElement(295)};
	/**是否支付{0}修为作为门票？*/
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
	/**<color=#FFFF00>【金丹】</color>金丹期专属外观*/
	get Pendant_Rank_reward_1():ILanguageElement{return this.getElement(308)};
	/**<color=#FFFF00>【元婴】</color>元婴期专属外观*/
	get Pendant_Rank_reward_2():ILanguageElement{return this.getElement(309)};
	/**<color=#FFFF00>【化神】</color>化神期专属外观*/
	get Pendant_Rank_reward_3():ILanguageElement{return this.getElement(310)};
	/**<color=#FFFF00>【炼虚】</color>炼虚期专属外观*/
	get Pendant_Rank_reward_4():ILanguageElement{return this.getElement(311)};
	/**<color=#FFFF00>【合体】</color>合体期专属外观*/
	get Pendant_Rank_reward_5():ILanguageElement{return this.getElement(312)};
	/**未解锁*/
	get Shop_btn_7():ILanguageElement{return this.getElement(313)};
	/**所有奖励已解锁！*/
	get Rank_text_15():ILanguageElement{return this.getElement(314)};
	/**修为*/
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
	/**击败{0}玩家，获得修为{1}。*/
	get Tips_rank_5():ILanguageElement{return this.getElement(351)};
	/**被{0}玩家击败，扣除修为{1}。*/
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

}