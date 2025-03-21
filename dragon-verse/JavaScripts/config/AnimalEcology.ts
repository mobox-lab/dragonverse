import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","generationAreas","startGenerationTime","generationInterval","generationCount","fadeTime","movementRadius","speed","restTime","avatarGuid","animGuid","meshOffset"],["","Language","","","","","","","","","","","",""],[1,"TestAnimalName0001",null,[29,33,39],0,300000,8,300000,5000,[100],[5,3,6],"159590",["150833","150830","150834"],new mw.Vector(0,0,-60)],[2,"TestAnimalName0002",null,[30,34,40],0,300000,8,300000,5000,[100,200,400],[3,4,5],"159750",["181301","181390","235648"],null],[3,"TestAnimalName0003",null,[31,35,41],0,300000,8,300000,5000,[100,200,400],[3,2,4],"159842",["150778","150775","150774"],null],[4,"TestAnimalName0004",null,[32,38],0,300000,8,300000,5000,[100,200,400],[2,3,4],"160045",["181301","181390","235648"],null]];
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