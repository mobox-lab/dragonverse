import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","generationAreas","startGenerationTime","generationInterval","generationCount","fadeTime","movementRadius","speed","restTime","avatarGuid","animGuid","meshOffset"],["","Language","","","","","","","","","","","",""],[1,"TestAnimalName0001",null,[29,33],0,60000,1,60000,500,[1],[3,2,5],"159590",["150833","150830","150834"],new mw.Vector(0,0,-60)],[2,"TestAnimalName0002",null,[30,34],0,60000,2,60000,500,[2,1,3],[2,3,1],"159750",["181301","181390","235648"],null],[3,"TestAnimalName0003",null,[31,35],0,60000,2,60000,500,[1,2,3],[1,2,3],"159842",null,null],[4,"TestAnimalName0004",null,[32,38],0,60000,2,60000,500,[3,21],[1,2,3],"160045",null,null],[5,"TestAnimalName0001",null,null,60000,60000,1,60000,500,[1],[3,2,5],"159590",null,null],[6,"TestAnimalName0002",null,null,60000,60000,2,60000,500,[2,1,3],[2,3,1],"159750",null,null],[7,"TestAnimalName0003",null,null,60000,60000,2,60000,500,[1,2,3],[1,2,3],"159842",null,null],[8,"TestAnimalName0004",null,null,60000,60000,1,60000,500,[3,21],[1,2,3],"160045",null,null],[9,"TestAnimalName0001",null,[1731,7838,1564,0,-66,7976,1553,0,6303,3548,1691],120000,60000,2,60000,500,[1],[3,2,5],"159590",null,null],[10,"TestAnimalName0002",null,[-11272,6585,3358,0,-9615,9185,3873,0,5035,5120,1652],120000,60000,2,60000,500,[2,1,3],[2,3,1],"159750",null,null],[11,"TestAnimalName0003",null,[-10249,441,2078,0,-8841,-1131,1679,0,-11098,1544,2448],120000,60000,2,60000,500,[1,2,3],[1,2,3],"159842",null,null]];
export interface IAnimalEcologyElement extends IElementBase{
 	/**动物 ID*/
	id:number
	/**名称*/
	name:string
	/**VIEW_ONLY 不要更改或使用此列*/
	name_trs:string
	/**生成区域*/
	generationAreas:Array<number>
	/**生成起始时间 ms*/
	startGenerationTime:number
	/**单次生成间隔 ms*/
	generationInterval:number
	/**单次生成数量*/
	generationCount:number
	/**自动消失时长 ms*/
	fadeTime:number
	/**运动范围*/
	movementRadius:number
	/**速度可采样值 m/s*/
	speed:Array<number>
	/**休憩时长可采样值 s*/
	restTime:Array<number>
	/**形象 Guid*/
	avatarGuid:string
	/**动画 Guid 等待|走|跑*/
	animGuid:Array<string>
	/**模型偏移修正*/
	meshOffset:mw.Vector
 } 
export class AnimalEcologyConfig extends ConfigBase<IAnimalEcologyElement>{
	constructor(){
		super(EXCELDATA);
	}

}