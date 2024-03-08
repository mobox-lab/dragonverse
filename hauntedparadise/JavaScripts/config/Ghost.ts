import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","ghostId","diffcult","treeName","casualSpeed","chaseSpeed","shining","existChaseDist","existChaseTime","chaseCD","safePlace","sightRange","sightRangeInCD","specialCheck","goodMed","checkCom","isHang2Player","hangParams","hangCom","chaseParams","chaseCom","isMoveChar","attackMode"],["","","","","","","","","","","","","","","","","","","","","","",""],[1000,1,[1],null,100,100,false,1200,20,20,["bed","cupboard"],[1200,60],[300,30],[[1,3000]],["2"],[1,2],10,null,1,null,1,1,1],[1001,1,[2],null,100,150,true,1500,20,20,["bed","cupboard"],[1300,60],[300,30],[[1,3000]],["2"],[1,2],10,null,1,null,1,1,1],[1002,1,[3],null,100,180,true,1700,20,20,["bed","cupboard"],[1400,60],[300,30],[[1,3000]],["2"],[1,2],10,null,1,null,1,1,1],[1003,1,[4],null,100,200,true,2000,20,20,["bed","cupboard"],[1500,60],[300,30],[[1,3000]],["2"],[1,2],10,null,1,null,1,1,1],[1004,1,[5],null,5000,350,true,2000,20,20,["bed","cupboard"],[1500,60],[300,30],[[1,3000]],["2"],[1,2],10,null,1,null,1,1,1],[2000,2,[1,2,3,4,5],null,100,300,false,500,25,0,["bed","cupboard"],[1500,270],[3,30],[[1,3000]],null,[3],0,null,3,["25944BE2"],2,1,1],[3000,3,[1,2,3,4,5],null,100,200,false,500,25,0,["bed","cupboard"],[1500,270],[3,30],[[1,3000]],null,null,0,["3E39989C","13ACCBA6","5"],5,null,1,1,1],[4000,4,[1,2,3,4,5],null,0,200,false,300,15,0,["bed","cupboard"],[200,360],[3,30],[[1,200]],["2"],[1,2],0,null,1,null,1,1,1,1],[5000,5,[1,2,3,4,5],null,0,100,false,250,30,20,["bed","cupboard"],[400,360],[3,30],[[1,200],[22]],["2"],[1,4],0,null,1,null,1,1,1,1]];
export interface IGhostElement extends IElementBase{
 	/**id*/
	id:number
	/**鬼的id*/
	ghostId:number
	/**难度区分*/
	diffcult:Array<number>
	/**依赖的行为树的名字*/
	treeName:string
	/**休闲态速度（S）*/
	casualSpeed:number
	/**追击速度（C为准）(S计算)*/
	chaseSpeed:number
	/**是否闪灵（C）*/
	shining:boolean
	/**离开追击距离（C）*/
	existChaseDist:number
	/**离开追击时间（C为准）(S计算)*/
	existChaseTime:number
	/**追击结束cd（C为准）(S计算)*/
	chaseCD:number
	/**有效的安全区（C）*/
	safePlace:Array<string>
	/**视线范围（C）*/
	sightRange:Array<number>
	/**CD期间视线范围（C）*/
	sightRangeInCD:Array<number>
	/**特殊检测范围*/
	specialCheck:Array<Array<number>>
	/**好药*/
	goodMed:Array<string>
	/**检测组件（1为普通的视线检测，2为药物检测(嗑药状态|检测范围)）*/
	checkCom:Array<number>
	/**是否需要追踪玩家*/
	isHang2Player:number
	/**闲逛特殊参数*/
	hangParams:Array<string>
	/**闲逛组件（1为基础巡逻逻辑，2为有手推车的巡逻逻辑（推车检测范围））*/
	hangCom:number
	/**追击组件*/
	chaseParams:Array<string>
	/**追击组件（1为直接跟着过去）*/
	chaseCom:number
	/**攻击的时候是被拉过去（1），还是过来处决（0）*/
	isMoveChar:number
	/**攻击模式（1为触碰击杀）*/
	attackMode:number
 } 
export class GhostConfig extends ConfigBase<IGhostElement>{
	constructor(){
		super(EXCELDATA);
	}

}