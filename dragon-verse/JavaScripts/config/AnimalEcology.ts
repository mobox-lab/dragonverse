import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","generationAreas","startGenerationTime","generationInterval","generationCount","fadeTime","movementRadius","pathFindRadius","speed","restTime","prefabGuid"],["","Language","","","","","","","","","","",""],[1,"TestAnimalName0001",null,null,0,0,0,0,0,null,null,null,null]];
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
	/**寻路范围可采样值*/
	pathFindRadius:Array<number>
	/**速度可采样值 m/s*/
	speed:Array<number>
	/**休憩时长可采样值*/
	restTime:Array<number>
	/**预制体 Guid*/
	prefabGuid:string
 } 
export class AnimalEcologyConfig extends ConfigBase<IAnimalEcologyElement>{
	constructor(){
		super(EXCELDATA);
	}

}