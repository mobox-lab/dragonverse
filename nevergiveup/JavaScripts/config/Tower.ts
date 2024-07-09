import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","nameCN","shopPrice","type","attackTags","imgGuid","infoTestsCn","infoTexts","spend","sellBack","guid","weaponGuid","attackEffect","hitEffect","effectDelayTime","attackTime","attackCount","attackRange","findRange","attackDamage","idleAnim","effectColor","attackAnim","AtkAnimDur","attackAnimSpeed","attackBuff","flyZ"],["","Language","","","","","","","","","","","","","","","","","","","","","","","","","",""],[1001,"Tower_name_1","枪手",300,1,[1,2],"291768",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[50,90,150],[25,70,160],["035FE6194D5ED1833C63E8A5565B4B2A","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"0524CC544E1BF295C554C69AD1D8CFA2","107535",0.8,0.2,[1,0.83,0.8],[1,1,1],[0,0,0],[2,2.1,2.25],[50,57.5,65],"281795",["FF9200FF","0C9BFFFF","FF00FEFF"],"81687",1,[1,1],[4007],0],[1002,"Tower_name_2","步枪手",360,1,[1,3],"291769",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[120,215,360],[60,165,385],["EAF74E344060D0E4F10B2FAA213EB466","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"629362DD4A7294FF649E37BDDE9F30B0","107535",0.8,0.2,[0.75,0.63,0.6],[1,1,1],[0,0,0],[1.2,1.32,1.5],[75,86.25,97.5],"281710",["FFBE4EFF","317FFFFF","FF31F1FF"],"80483",0.1,[1,1],null,0],[1003,"Tower_name_3","机枪手",540,1,[3],"291776",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[180,325,540],[90,250,575],["6B3208A84B2AE04875E6ACB418BCF27C","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"350A0E654CA7583A6D2FA987E8D51E1A","107535",0.8,0,[0.5,0.42,0.4],[1,1,1],[0,0,0],[1.5,1.65,1.875],[60,69,78],"281710",["FFB860FF","7FA3FFFF","FF75FAFF"],"80483",0.5,[1,1],null,0],[1004,"Tower_name_4","狙击手",750,1,[1,2,3],"291770",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[250,450,750],[125,350,800],["8D1F67E84BEAFBABCA05FE8DBE470802","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"E17F27CC4B7A0FCBDA598E9D66D87007","107535",0.8,0,[3,2.5,2.4],[1,1,1],[0,0,0],[3.75,4.125,4.6875],[200,230,260],"20227",["FFFFFFFF","33A4FFFF","FF4CF5FF"],"20279",0.5,[1,1],null,0],[1005,"Tower_name_5","火炮手",1125,1,[1,3],"291772",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[375,675,1125],[185,525,1200],["6CB1EE514F4B82CBB5CA22A5FEA68B5C","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"C40D8AAA48542A860728848F6CBDF8BF","107535",0.8,0,[2,1.67,1.6],[2,2,2],[1,1,1],[3,3.3,3.75],[250,287.5,325],"20273",["FF944DFF","5995FFFF","FF6BF9FF"],"288430",0.5,[1,1],null,0],[1006,"Tower_name_6","特种兵",720,1,[1,2],"291775",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[240,430,720],[120,335,765],["21D4F5AF4A7AD5509FCBCD8CC10D94DC","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"653891C94FB0A366D642CEA818391DC9","107535",0.8,0,[1,0.83,0.8],[2,2,2],[1,1,1],[1.5,1.65,1.875],[80,92,104],"281710",["FFAA65FF","4BAFFFFF","FFB4F4FF"],"80483",0.2,[1,1],null,0],[1007,"Tower_name_7","爆破专家",900,4,[1,3],"291779",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_5","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[300,540,900],[150,420,960],["EC5DCEC54F3EA67C227D0EA95AB9E08F","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"EECF96D34B6A40D279E4418439C0FCD8","107535",0.8,0,[2,1.67,1.6],[3,3,3],[1,1,1],[2,2.2,2.5],[100,115,130],"35385",null,"84862",0.5,[1,1],null,200],[1008,"Tower_name_8","歼击导弹",1800,4,[1,2,3],"291773",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_6","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[600,1080,1800],[300,840,1920],["B3A884E74563F1D443673D972DE73C5A","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"350A0E654CA7583A6D2FA987E8D51E1A","107535",0.8,0,[3,2.5,2.4],[3,3,3],[1,1,1],[3,3.3,3.75],[200,230,260],"180888",null,"86462",0,[1,1],null,0],[1009,"Tower_name_9","海豹突击手",675,1,[3],"291780",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[225,405,675],[115,315,720],["B6770C824788E1B59A5992BEB0E58D58","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"6A0DE7F4464370FE3F343F8B8280953B","107535",0.8,0,[0.33,0.28,0.27],[1,1,1],[1,1,1],[1.5,1.65,1.875],[50,57.5,65],"281710",["FF9E59FF","72C7FFFF","FF5CDCFF"],"80483",0.3,[1,1],null,0],[1010,"Tower_name_10","霰弹枪兵",2100,1,[1,3],"291778",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[720,1296,2160],[360,1000,2300],["A017872D4179A0F6C53E2786AA756766","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"CBC7A8DF492ADDA5A3B0A0B28A3EC68B","107535",0.8,0,[1,0.83,0.8],[5,5,5],[1,1,1],[1,1.1,1.25],[120,138,156],"281710",["FF9C6CFF","65AAFFFF","FF45FEFF"],"281780",0.25,[1,1],null,0],[2001,"Tower_name_11","金币矿机",100,3,null,"291777",["Tower_attackTags_7","Tower_attackTags_8"],["attackDamage","attackTime"],[30,90,150],[15,50,100],["3F3E2CEE4DABFE0E832743B85AE2BD5B","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"350A0E654CA7583A6D2FA987E8D51E1A","107535",0.8,0,[10,8,6],[2,3,4],[1,2,3],[0,0,0],[7,10,15],"180888",null,"97181",0,[1,1],null,0],[3001,"Tower_name_12","鼓舞旗帜",500,2,null,"291764",["Tower_attackTags_9","Tower_attackTags_10"],["attackDamage","findRange"],[250,450,750],[120,300,600],["14F45E2348C0537D52B304A3C3C6B69B","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],null,null,0.8,0,[0.01,0.01,0.01],[2,3,4],[1,2,3],[1,2,3],[10,15,25],null,null,"97181",0,[1,1],[2001,2002,2003],0],[1011,"光龙男1","光龙娘1",100,1,[1,2],"326244",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[60,100,200],[60,100,200],["09E82E72488ED6F749BA99A256F1792F","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"E8DF061043359EE84F60AEAAB3D3A68A","168944",0.3,0,[0.48,0.48,0.48],[1,1,1],[0,0,0],[1,1,1],[58,68,78],"144183",["FF9C6CFF","65AAFFFF","FF45FEFF"],"85959",0.3,[1,1],null,0],[1012,"光龙娘4","光龙娘4",600,1,[1,2],"326244",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[600,700,800],[600,700,800],["88A9134443C169D1D86DE4A68690D295","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"CC07D30340D3F7222F7D498025208100","153046",1.5,0,[3,3,2.8],[1,1,1],[0,0,0],[3,3,3],[1000,1250,1500],"284848",["FF9C6CFF","65AAFFFF","FF45FEFF"],"121794",2,[1,1],null,0],[1013,"光龙娘3","光龙娘3",550,1,[1,2],"326267",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[550,600,650],[550,600,650],["B06787054CADB7A7F6D7119045051E1E","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"D4B7264E42074A814EA43BA7906BBEE7","151551",1,0,[3,3,3],[4,4,4],[0,0,0],[2,2.25,2.5],[280,320,370],"144183",["FF9C6CFF","65AAFFFF","FF45FEFF"],"20275",3,[1,1],null,100],[1014,"光龙男2","光龙娘2",80,1,[1,2],"150576",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[80,120,200],[80,120,200],["AB17F0404A02BC9A002911BC7BDC0A65","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"B8042E594FB8BDA5FFE681993C5A8FB3","200133",1,0,[0.7,0.6,0.5],[1,1,1],[0,0,0],[1,1.2,1.4],[60,90,140],"144183",["FF9C6CFF","65AAFFFF","FF45FEFF"],"20270",1.8,[1,1],null,0],[1015,"光龙娘6","光龙娘7",100,3,null,"130536",["Tower_attackTags_7","Tower_attackTags_8"],["attackDamage","attackTime"],[30,90,150],[15,50,100],["F295C0434C6D1288C0CBCD81DD5DE08B","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"B8042E594FB8BDA5FFE681993C5A8FB3","200133",1,0,[10,8,6],[2,3,4],[1,2,3],[0,0,0],[7,10,15],"144183",["FF9C6CFF","65AAFFFF","FF45FEFF"],"20270",1.8,[1,1],null,0],[1016,"暖机光龙娘5","光龙娘5",200,1,[1,2],"326241",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[200,250,300],[200,250,300],["7A8D6E2149EC964C609BEABB1CD4DB6E","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"421CE1374301DC37D8FCB09C2F2321C4","150929",1,0,[1.7,1.7,1.7],[1,1,1],[0,0,0],[3,3,3],[200,250,300],"122546",["FF9C6CFF","65AAFFFF","FF45FEFF"],"135369",2,[1,1],null,0],[1017,"光龙娘7","增益光龙娘7",300,2,null,"326271",["Tower_attackTags_9","Tower_attackTags_10"],["attackDamage","findRange"],[250,450,750],[120,300,600],["2156CCFE49B0B0F804086C96D2F8166C","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],null,null,1,0,[0.01,0.01,0.01],[1,1,1],[1,2,3],[1,2,3],[10,15,25],null,null,"20270",0,[1,1],[2001,2002,2003],0],[1018,"暗龙娘2","暗龙娘2",200,1,[1,2],"143689",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[60,100,130],[60,100,130],["28D3AAC24F38644228D141AF6EE3C31F","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"45F04C6F46C61EA619AEF0B058363AC7","254300",1,0,[1.85,1.5,1.4],[1,1,1],[0,0,0],[1,1.2,1.2],[200,250,320],"285370",["FF9C6CFF","65AAFFFF","FF45FEFF"],"279685",0.5,[1,1],null,0],[1019,"暗龙娘1","暗龙娘1",160,1,[1,2],"326237",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[160,250,320],[160,250,320],["3A9D803A4C74C27DA0A11FA53B742510","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"07F582E14688F6E9C9F0D2951D0902E1","150927",1.3,0,[1.3,1.3,1.1],[8,8,8],[0,0,0],[1,1.25,1.25],[50,65,80],"146119",["FF9C6CFF","65AAFFFF","FF45FEFF"],"279672",1,[1,1],null,0],[1020,"暗龙娘3","暗龙娘3",70,1,[1,2],"326236",["Tower_attackTags_1","Tower_attackTags_2","Tower_attackTags_3","Tower_attackTags_4"],["attackDamage","attackTime","attackCount","findRange"],[70,120,180],[70,120,180],["CD0581B64EAB0563BF8537BCE23878AE","E718B09E4408CE5534779780E5365B64","E456238842ACC53D8C01EAABD11B256C"],"2E34840A438C9605A8FB7C978CAFE3D9","181026",1,0,[0.6,0.6,0.4],[1,1,1],[0,0,0],[1.5,1.6,1.6],[55,80,110],"144198",["FF9C6CFF","65AAFFFF","FF45FEFF"],"285283",0.4,[1,1],null,0]];
export interface ITowerElement extends IElementBase{
 	/**塔ID*/
	id:number
	/**塔的名字*/
	name:string
	/**名字备注*/
	nameCN:string
	/**塔的售价*/
	shopPrice:number
	/**塔的类型
1 攻击塔
2 buff 塔
3 产出塔
4 投掷物塔*/
	type:number
	/**特殊索敌类型
    Stealth = 1*/
	attackTags:Array<number>
	/**
    Flying = 2*/
	imgGuid:string
	/**
Armored = 3*/
	infoTestsCn:Array<string>
	/**塔的UI图片*/
	infoTexts:Array<string>
	/**描述显示字段文本文字*/
	spend:Array<number>
	/**资料卡的显示字段文本*/
	sellBack:Array<number>
	/**每一级塔要花的钱*/
	guid:Array<string>
	/**每一级塔拆除后返回的钱*/
	weaponGuid:string
	/**塔每一级buff特效的guid*/
	attackEffect:string
	/**武器guid*/
	hitEffect:number
	/**击中特效*/
	effectDelayTime:number
	/**受击特效的缩放*/
	attackTime:Array<number>
	/**特效延迟
播放时间
单位秒*/
	attackCount:Array<number>
	/**攻击间隔*/
	attackRange:Array<number>
	/**攻击数量*/
	findRange:Array<number>
	/**攻击AOE范围
（0为单体)*/
	attackDamage:Array<number>
	/**索敌范围*/
	idleAnim:string
	/**攻击伤害*/
	effectColor:Array<string>
	/**待机动画*/
	attackAnim:string
	/**特效颜色*/
	AtkAnimDur:number
	/**攻击动画*/
	attackAnimSpeed:Array<number>
	/**攻击动画持续时间*/
	attackBuff:Array<number>
	/**攻击动画参数
速率|次数*/
	flyZ:number
 } 
export class TowerConfig extends ConfigBase<ITowerElement>{
	constructor(){
		super(EXCELDATA);
	}

}