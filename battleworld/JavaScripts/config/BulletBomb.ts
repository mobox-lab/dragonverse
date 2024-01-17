import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","effectIds","soundIds","range","hitCount","checkTime"],["","","","","",""],[1,[142,143],[15],10,1,0],[2,[144,145,146,142],[15],20,1,0],[3,[147,148,142],[15],15,1,0],[4,[149,150,151],[15],20,3,1],[5,[152,153,154,152,153],[15],25,1,0]];
export interface IBulletBombElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**爆炸特效表数组*/
	effectIds:Array<number>
	/**爆炸音效表*/
	soundIds:Array<number>
	/**爆炸半径*/
	range:number
	/**生效次数*/
	hitCount:number
	/**检测间隔秒*/
	checkTime:number
 } 
export class BulletBombConfig extends ConfigBase<IBulletBombElement>{
	constructor(){
		super(EXCELDATA);
	}

}