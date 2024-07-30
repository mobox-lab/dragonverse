import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","playermodel","playermovement","bossmodel","skipWaveCount","multipleplayer","goldFailedVoice","unlockTaskLevel","unlockTechLevel","initialGold","initialTechPoint","techTreePaddingY","unlockDailyTask","armoredEnemyDamageEnhancement","armoredEnemyDamageReduction"],["","","","","","","","","","","","","","",""],[1,1.5,300,4,0.6,[1,2,3],169190,2,3,10,10,50,3,1.5,0.5]];
export interface IGlobalElement extends IElementBase{
 	/**id*/
	id:number
	/**玩家模型缩放比例*/
	playermodel:number
	/**玩家移动速度*/
	playermovement:number
	/**boss模型放大倍数*/
	bossmodel:number
	/**跳波比例0.8= 80%*/
	skipWaveCount:number
	/**234人的多人游戏怪物血量放大倍数*/
	multipleplayer:Array<number>
	/**金币不足音效（对应音效表ID)*/
	goldFailedVoice:number
	/**任务解锁等级*/
	unlockTaskLevel:number
	/**天赋解锁等级*/
	unlockTechLevel:number
	/**初始金币*/
	initialGold:number
	/**初始科技点*/
	initialTechPoint:number
	/**科技树行距*/
	techTreePaddingY:number
	/**日常任务解锁等级*/
	unlockDailyTask:number
	/**装甲怪增伤*/
	armoredEnemyDamageEnhancement:number
	/**装甲怪减伤*/
	armoredEnemyDamageReduction:number
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}

}