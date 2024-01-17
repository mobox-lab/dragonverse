import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","Humantype","somatotype","cloths","effectIds","soundGuid","pendantIds","isOpenOutline","idleAnimationGuid"],["","","","","","","","","",""],[1,"预设男学生",2,1,["88DDDAA8479F20D15C8366ADD641F318"],[6],"130724",null,true,null],[2,"预设女学生",2,2,["3681A22C4D03E5BA2F16DCA5E545B6FB"],[6],"130724",null,true,null],[3,"平台形象",2,1,null,[6],"130724",null,true,null],[4,"怪职业卡",1,1,["151813"],null,null,null,true,null],[10001,"斥候",2,1,["665BDF0C43840CEAD6008CA1FB8FE269"],[6],"130724",[10001],true,null],[10002,"斥候·疾风",2,1,["97445AD94B466F68536F0DAD86D56DB8"],[6],"130724",[10002],true,null],[10003,"斥候·嗜血",2,1,["E3C27CC14AD7E63DE1140C87DFF38FFD"],[6],"130724",[10003],true,null],[10004,"斥候·狂暴",2,1,["460484FF41588D3EEFC44DADDAC8B5B1"],[6],"130724",[10004],true,null],[20001,"法师",2,2,["052DE15042EF877903A9F6A57FA6EFDA"],[6],"130724",[20001],true,null],[20002,"法师·风之魔法",2,2,["5D5FD8CA4A6AD3501B59C599A8DC268C"],[6],"130724",[20002],true,null],[20003,"法师·水之魔法",2,2,["AEDE0F8B40C2BA7BE4C1E99BFEE8F31F"],[6],"130724",[20003],true,null],[20004,"法师·火之魔法",2,2,["B107F986462A31F48EBC12B5251DE90A"],[6],"130724",[20004],true,null],[30001,"刺客",2,1,["3A7775E34570C22B51CAA8B8F0171BC9"],[6],"130724",[10001],true,null],[30002,"刺客·疾风",2,1,["B9293F0B467A3D3CAB0EAFBCAA8910D8"],[6],"130724",[10001],true,null],[30003,"刺客·嗜血",2,1,["B0E745D6469BCA5F373B0F80459DA1A7"],[6],"130724",[10001],true,null],[30004,"刺客·狂暴",2,1,["BDA9F3CE4344C359DBFF59901497E753"],[6],"130724",[10001],true,null],[40001,"元素使",2,2,["ED165F284956DC7EC2CB17853E8021DA"],[6],"130724",[10001],true,null],[40002,"元素使·雷",2,2,["746F110249C5AB78187FFCA2E3E694E8"],[6],"130724",[10001],true,null],[40003,"元素使·岩",2,2,["02346CEF47259FDB79D78D9620E9B663"],[6],"130724",[10001],true,null],[40004,"元素使·草",2,2,["07CEE2054BF8ACB3C999BD947B6A7929"],[6],"130724",[10001],true,null],[50001,"影舞",2,2,["FCACA36343573D4EAEBD30AAA6D168A9"],[6],"130724",[10001],false,null],[50002,"影舞·瞬",2,2,["65FEAD5048CA858672E7D0B68FC82034"],[6],"130724",[10001],false,null],[50003,"影舞·绝",2,2,["36C2C090498A47B6EB594AAB989F2BBE"],[6],"130724",[10001],false,null],[50004,"影舞·狱",2,2,["D5356FFC45EFB088169816AB8A90096E"],[6],"130724",[10001],false,null],[60001,"游侠",2,2,["4270E92143F5B5D4E1C16CBC2E06DA4D"],[6],"130724",[10001],false,null],[60002,"游侠·风行者",2,2,["5BF6624D47597B74B908B6B9411B341D"],[6],"130724",[10001],false,null],[60003,"游侠·炎之心",2,2,["CCF9272B4B84E88B3D4CE1926EF891A7"],[6],"130724",[10001],false,null],[60004,"游侠·冰幻舞",2,2,["197CDA2B474383BBB761CCB426B8A3FC"],[6],"130724",[10001],false,null],[70001,"绝地",2,1,["0558DAE7432C7D4B04DF9EAA352B724E"],[6],"130724",[10001],true,null],[70002,"绝地·光明使者",2,1,["C0949638405E4037F51FAEBD30ED7D48"],[6],"130724",[10001],true,null],[70003,"绝地·异星战士",2,1,["B16A71CA4F62F80A5DB7F19E5395E693"],[6],"130724",[10001],true,null],[70004,"绝地·血族使徒",2,1,["465A4BF841DCCC829EAC41889CA1766E"],[6],"130724",[10001],true,null],[80001,"牛仔",2,1,["2CC5BEBB4EDF453B88E7FDA2A23C514E"],[6],"130724",[10001],false,null],[80002,"牛仔·血红杀手",2,1,["EC7C8726494C7FB030EE0698ECA86658"],[6],"130724",[10001],false,null],[80003,"牛仔·蓝色魅影",2,1,["6B65E3B3475E131AC6081AA76BB52DF6"],[6],"130724",[10001],false,null],[80004,"牛仔·紫色激情",2,1,["25169B684E6660FAFAB2669DB1B3806A"],[6],"130724",[10001],false,null],[90001,"破军",2,1,["D28EF4E84F04909A00852597A18452E8"],[6],"130724",[10001],false,null],[90002,"破军·浴血",2,1,["95262C8B434D27FA8D786CB3FA54DDC3"],[6],"130724",[10001],false,null],[90003,"破军·锦衣",2,1,["4A1056D8411A50C791C555AB4D296238"],[6],"130724",[10001],false,null],[90004,"破军·云长",2,1,["C7C9702A40F44C106E907AA370C2447B"],[6],"130724",[10001],false,null],[100001,"御剑",2,2,["A300514E48E107116778A3A8B57C4236"],[6],"130724",[10001],false,null],[100002,"御剑·紫霞",2,2,["132BCE7441C7EC36D57E74B945EA2348"],[6],"130724",[10001],false,null],[110001,"拳师",2,2,["7CE8AC25435FFEEFE34D948435333008"],[6],"130724",[10001],false,null],[120001,"圣骑士",2,1,["9AE2A5DC48782BBC096C62A417C06C5E"],[6],"130724",[10001],false,"217285"],[130001,"火炮",2,2,["371ADB774DE9FF8A1F6D08A6A9C9A7E4"],[6],"130724",[10001],false,"218382"]];
export interface IAppearanceElement extends IElementBase{
 	/**id*/
	id:number
	/**描述*/
	desc:string
	/**1v1 2v2*/
	Humantype:number
	/**性别：1二次元男 2二次元女*/
	somatotype:number
	/**服装预设信息*/
	cloths:Array<string>
	/**特效表id数组*/
	effectIds:Array<number>
	/**音效guid*/
	soundGuid:string
	/**挂件id数组（挂件表id）*/
	pendantIds:Array<number>
	/**是否开启描边
0默认不开启
1开启*/
	isOpenOutline:boolean
	/**待机动画guid(不填使用默认)*/
	idleAnimationGuid:string
 } 
export class AppearanceConfig extends ConfigBase<IAppearanceElement>{
	constructor(){
		super(EXCELDATA);
	}

}