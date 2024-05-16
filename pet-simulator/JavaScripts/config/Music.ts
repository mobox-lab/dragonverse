import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","guid","Notice","volume","IFSync","IFCycle","IF3d","falloffDistance","shapeExtents"],["","","","","","","","",""],[1,"14031","背景音乐（每个世界不同）",0,null,null,null,0,0],[2,"134704","玩家脚步声（移动时触发，停止移动停止，挂在玩家身上，其他玩家也听得到）",0.3,null,null,null,0,0],[3,"130809","跳跃声（离开地面时触发，挂在玩家身上）",0.5,null,null,null,0,0],[4,"120839","落地音效",1,null,null,null,0,0],[5,"169132","喷泉处水流的声音（策划直接摆在场景里）",1,null,null,null,0,0],[6,"159241","可破坏资源掉落到地面时的声音（古墩一下，所有人可以听到，资源位置播放）",1,null,null,null,0,0],[7,"134703","按钮点击音效（只有自己可以听到）",1,null,null,null,0,0],[8,"148670","宠物移动音效（宠物落地时播放 只有地面宠物有）",0.1,null,null,null,0,0],[9,"148672","宠物抽出来时候的音效（只有自己可以听到）",1,null,null,null,0,0],[10,"39328","宠物装备时的音效 嗖一下（只有自己可以听到）",0.3,null,null,null,0,0],[11,"128511","资源物被破坏时的音效（所有人可以听到，资源位置播放）",0.1,null,null,null,1600,200],[12,"148670","宠物出战时的音效 （只有自己可以听到，由跟随状态变为寻找资源状态时）",1,null,null,null,0,0],[13,"136198","资源进入玩家时的音效（只有自己可以听到，玩家吸收到金币时触发）",0.1,null,null,null,0,0],[14,"176226","资源物被暴击破坏时的音效（所有人可以听到，资源位置播放）",1,null,null,null,0,0],[15,"148848","开始抽卡宠物蛋的音效",1,null,null,null,0,0]];
export interface IMusicElement extends IElementBase{
 	/**唯一ID*/
	ID:number
	/**音效guid*/
	guid:string
	/**备注*/
	Notice:string
	/**音量比例*/
	volume:number
	/**是否同步*/
	IFSync:boolean
	/**是否循环播放*/
	IFCycle:boolean
	/**是否为3d音效*/
	IF3d:boolean
	/**衰减距离（默认值600）*/
	falloffDistance:number
	/**球体半径（默认值200）*/
	shapeExtents:number
 } 
export class MusicConfig extends ConfigBase<IMusicElement>{
	constructor(){
		super(EXCELDATA);
	}

}