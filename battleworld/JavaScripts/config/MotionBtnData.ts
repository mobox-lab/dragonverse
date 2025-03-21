import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","isPrestore","showMask","btnType","skillIds","autoReleaseTime","bashSkillId","downSkillId","eventNames","btnIcon"],["","","","","０：按下释放技能","","","","","",""],[1,"跳跃",false,false,0,[2],0,0,0,null,"295461"],[2,"冲刺",true,false,3,[1],0.3,11,12,["sprint","sprintSpeed"],"325143"],[3,"拳头普攻三连+重击",true,false,1,[6,7,8],0.3,9,0,null,"295281"],[4,"单手剑普攻三连+重击",true,false,1,[10,11,12],0.3,13,0,null,"295344"],[5,"法杖普攻二连+重击",true,false,1,[14,15],0.3,16,0,null,"295287"],[6,"拳头技能1",false,true,0,[17],0,0,0,null,"350390","四方震击√"],[7,"拳头技能2",false,true,0,[18],0,0,0,null,"350378","地脉震动√"],[8,"拳头技能3",false,true,0,[19],0,0,0,null,"350359","引力冲击√"],[9,"拳头技能4",false,true,0,[20],0,0,0,null,"350379","蓄力冲拳√"],[10,"拳头技能5",false,true,0,[21],0,0,0,null,"350377","震地空爆√"],[11,"拳头技能6",false,true,0,[22],0,0,0,null,"350369","战吼√"],[12,"拳头技能7",false,true,0,[23],0,0,0,null,"350361","洪雷震爆√"],[13,"拳头技能8",false,true,0,[24],0,0,0,null,"350348","升龙冲拳√"],[14,"拳头技能9",false,true,0,[25],0,0,0,null,"350373","狂风聚集√"],[15,"拳头技能10",false,true,0,[26],0,0,0,null,"350363","原力涌动√"],[16,"单手剑技能1",false,true,0,[27],0,0,0,null,"326706","洪雷剑气√"],[17,"单手剑技能2",false,true,0,[28],0,0,0,null,"326704","雷霆轰击√"],[18,"单手剑技能3",false,true,0,[29],0,0,0,null,"350347","燕返√"],[19,"单手剑技能4",false,true,0,[30],0,0,0,null,"350345","巨雷一击√"],[20,"单手剑技能5",false,true,0,[31],0,0,0,null,"326710","千鸟√"],[21,"单手剑技能6",false,true,0,[32],0,0,0,null,"327113","引雷√"],[22,"单手剑技能7",false,true,0,[33],0,0,0,null,"350352","雷霆连斩√"],[23,"单手剑技能8",false,true,0,[34],0,0,0,null,"326698","引雷入体√"],[24,"单手剑技能9",false,true,0,[35],0,0,0,null,"350346","聚雷阵√"],[25,"单手剑技能10",false,true,0,[36],0,0,0,null,"326712","雷切√"],[26,"法杖技能1",false,true,0,[37],0,0,0,null,"327119","光明降临√"],[27,"法杖技能2",false,true,0,[38],0,0,0,null,"350354","光之冲击√"],[28,"法杖技能3",false,true,0,[39],0,0,0,null,"350337","炫光一闪√"],[29,"法杖技能4",false,true,0,[40],0,0,0,null,"327101","光明疗愈√"],[30,"法杖技能5",false,true,0,[41],0,0,0,null,"327133","光之飞弹√"],[31,"法杖技能6",false,true,0,[42],0,0,0,null,"327099","时光禁锢√"],[32,"法杖技能7",false,true,0,[43],0,0,0,null,"327118","圣炎领域√"],[33,"法杖技能8",false,true,0,[44],0,0,0,null,"350410","聚能光炮√"],[34,"法杖技能9",false,true,0,[45],0,0,0,null,"327126","光之庇护√"],[35,"法杖技能10",false,true,0,[46],0,0,0,null,"327104","光焰附魔√"],[36,"双手剑普攻二连+重击",true,false,1,[48,49],0.3,50,0,null,"295273"],[37,"双手剑技能1",false,true,0,[51],0,0,0,null,"327083","烈焰突刺√"],[38,"双手剑技能2",false,true,0,[52],0,0,0,null,"327089","旋风斩击√"],[39,"双手剑技能3",false,true,0,[53],0,0,0,null,"350406","爆炎重击√"],[40,"双手剑技能4",false,true,0,[54],0,0,0,null,"327088","火雨√"],[41,"双手剑技能5",false,true,0,[55],0,0,0,null,"327087","烈焰飞劈√"],[42,"双手剑技能6",false,true,0,[56],0,0,0,null,"350375","巨焰剑气√"],[43,"双手剑技能7",false,true,0,[57],0,0,0,null,"350391","竖劈√"],[44,"双手剑技能8",false,true,0,[58],0,0,0,null,"327171","飞凰突击√"],[45,"双手剑技能9",false,true,0,[59],0,0,0,null,"350386","火焰庇护√"],[46,"双手剑技能10",false,true,0,[60],0,0,0,null,"327100","焰能觉醒√"],[47,"拳头怒气普攻",true,false,1,[61,62,63],0,0,0,null,"295281"],[48,"单手剑怒气普攻",true,false,1,[64,65,66],0,0,0,null,"295344"],[49,"法杖怒气普攻",true,false,1,[67,68],0,0,0,null,"295287"],[50,"双手剑怒气普攻",true,false,1,[69,70],0,0,0,null,"295273"]];
export interface IMotionBtnDataElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**描述*/
	desc:string
	/**是否对该技能预缓存*/
	isPrestore:boolean
	/**是否显示cd遮罩*/
	showMask:boolean
	/**按钮释放类型*/
	btnType:number
	/**0:1类型技能id数组*/
	skillIds:Array<number>
	/**1:3类型自动施放时间*/
	autoReleaseTime:number
	/**1重击技能id*/
	bashSkillId:number
	/**1下落攻击id*/
	downSkillId:number
	/**2事件名*/
	eventNames:Array<string>
	/**2按钮guid*/
	btnIcon:string
 } 
export class MotionBtnDataConfig extends ConfigBase<IMotionBtnDataElement>{
	constructor(){
		super(EXCELDATA);
	}

}