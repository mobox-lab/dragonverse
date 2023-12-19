import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","soundGuid","soundName","loopCount","volume","isEffect","isStereo","innerRadius","falloffDistance","ps"],["","","","","","","","","",""],[1,"34743","主场景BGM",0,0.4,false,false,200,600,null],[2,"134703","通用按钮点击音效",1,0.3,true,false,200,600,null],[3,"13934","奔跑音效",0,1,true,true,200,3000,null],[4,"124715","跳跃按钮音效",1,1,true,false,200,600,null],[5,"169184","互动按键音效",1,1,true,false,200,600,"小游戏玩法中互动UI的通用按键音效"],[6,"137567","举球：放置正确",1,1,true,true,200,3000,null],[7,"201348","举球：魔法阵解封",1,1,true,true,200,3000,null],[8,"201180","巨石迷阵：踩碎地面爆炸",1,1,true,true,200,3000,null],[9,"203059","巨石迷阵：蘑菇弹床",1,1,true,true,200,3000,null],[10,"202244","火炎地狱：未有buff触碰岩浆",1,1,true,true,200,3000,"触碰到岩浆，和下边的音效随机播放一个"],[11,"201870","火炎地狱：未持有buff碰岩浆",1,1,true,true,200,3000,null],[12,"208422","火炎地狱：净化岩浆",1,1,true,true,200,3000,null],[13,"201907","火炎地狱：法阵解封，爆炸",1,1,true,true,200,3000,null],[14,"162446","拨云见日：喷火球",1,1,true,true,200,3000,"162446"],[15,"201831","拨云见日：命中云朵",1,1,true,false,200,3000,null],[16,"199746","跑酷：进入/离开传送门音效",1,1,true,true,200,3000,null],[17,"169184","跑酷：转换龙娘的点击音效",1,1,true,false,200,600,null],[18,"131499","跑酷：背景音乐",0,1,false,false,200,600,"玩家进入引导关卡时开始播放，离开引导关卡停止播放"],[19,"169141","跑酷：加时圈音效",1,1,true,false,200,600,null],[20,"208373","跑酷：加速圈音效",1,1,true,false,200,600,null],[21,"200390","跑酷：减速圈音效",1,1,true,false,200,600,null],[22,"207428","跑酷：碰撞音效",1,1,true,false,200,600,null],[23,"142134","跑酷：开始倒计时",1,1,true,false,200,600,null],[24,"202881","跑酷：高速音效",1,1,true,false,200,600,null],[25,"169182","跑酷：结算音效",1,1,true,false,200,600,null]];
export interface ISoundElement extends IElementBase{
 	/**ID*/
	id:number
	/**资源ID*/
	soundGuid:string
	/**音效名称*/
	soundName:string
	/**循环次数
0=无限
>0指定次数*/
	loopCount:number
	/**音量大小*/
	volume:number
	/**是否是音效
1=音效
0=BGM*/
	isEffect:boolean
	/**是否是3D音效*/
	isStereo:boolean
	/**内部半径*/
	innerRadius:number
	/**衰减距离*/
	falloffDistance:number
	/**备注*/
	ps:string
 } 
export class SoundConfig extends ConfigBase<ISoundElement>{
	constructor(){
		super(EXCELDATA);
	}

}