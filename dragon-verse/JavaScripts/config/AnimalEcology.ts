import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","generationAreas","startGenerationTime","generationInterval","generationCount","fadeTime","movementRadius","pathFindRadius","speed","restTime","prefabGuid"],["","Language","","","","","","","","","","",""],[1,"TestAnimalName0001",null,[29],0,60000,1,60000,10,[1],[1],[3,2,5],"4F89DF024353D4AAA93987A8FF8B9FBD"],[2,"TestAnimalName0002",null,[30],0,60000,2,60000,10,[1],[2,1,3],[2,3,1],"FAE2BD3F428A66CF8E0A88802492AD8A"],[3,"TestAnimalName0003",null,[31],0,60000,2,60000,10,[1],[1,2,3],[1,2,3],"B434BF4A4218D8FE2B4536BEFA893AA9"],[4,"TestAnimalName0004",null,[-3797,-9219,690,0,-3811,-8544,908,0,-1747,-7508,844,0,-2399,-6110,882],0,60000,2,60000,10,[1],[3,21],[1,2,3],"4C46C84046B0E75EF1A2CC91B0298D40"],[5,"TestAnimalName0001",null,[-3090,-6200,990,0,-3533,-5161,1131,0,-4460,-3301,1337,0,-4038,-5173,1202],60000,60000,1,60000,10,[1],[1],[3,2,5],"4F89DF024353D4AAA93987A8FF8B9FBD"],[6,"TestAnimalName0002",null,[-858,-7036,714,0,-2389,-8190,940,0,-3963,-7967,1011],60000,60000,2,60000,10,[1],[2,1,3],[2,3,1],"FAE2BD3F428A66CF8E0A88802492AD8A"],[7,"TestAnimalName0003",null,[4092,-1276,647,0,4951,-226,962,0,-3373,-9083,731],60000,60000,2,60000,10,[1],[1,2,3],[1,2,3],"B434BF4A4218D8FE2B4536BEFA893AA9"],[8,"TestAnimalName0004",null,[4551,5857,1636,0,5564,4225,1684,0,5577,735,1317],60000,60000,1,60000,10,[1],[3,21],[1,2,3],"4C46C84046B0E75EF1A2CC91B0298D40"],[9,"TestAnimalName0001",null,[1731,7838,1564,0,-66,7976,1553,0,6303,3548,1691],120000,60000,2,60000,10,[1],[1],[3,2,5],"4F89DF024353D4AAA93987A8FF8B9FBD"],[10,"TestAnimalName0002",null,[-11272,6585,3358,0,-9615,9185,3873,0,5035,5120,1652],120000,60000,2,60000,10,[1],[2,1,3],[2,3,1],"FAE2BD3F428A66CF8E0A88802492AD8A"],[11,"TestAnimalName0003",null,[-10249,441,2078,0,-8841,-1131,1679,0,-11098,1544,2448],120000,60000,2,60000,10,[1],[1,2,3],[1,2,3],"B434BF4A4218D8FE2B4536BEFA893AA9"]];
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