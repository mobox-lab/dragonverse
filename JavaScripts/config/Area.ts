import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","points"],["","Language",""],[1,"TestAreaName0001",[[-50,-15371,1048],[-492,-15953,1110],[-471,-14422,1006]]],[2,"TestAreaName0001",[[-2461,-11936,465],[-2673,-11203,419],[-1908,-12482,510]]],[3,"TestAreaName0001",[[-2673,-11203,419],[-2835,-10598,407],[-3227,-10666,372]]],[4,"TestAreaName0001",[[-3797,-9219,689],[-3811,-8544,906]]],[5,"TestAreaName0001",[[-3090,-6200,983],[-3533,-5161,1131]]],[6,"TestAreaName0001",[[-858,-7036,714],[-2389,-8190,945]]],[7,"TestAreaName0001",[[4092,-1276,647],[4951,-226,962]]],[8,"TestAreaName0001",[[4551,5857,1636],[5564,4225,1684]]],[9,"TestAreaName0001",[[1731,7838,1564],[-66,7976,1553]]],[10,"TestAreaName0001",[[-11272,6585,3358],[-9615,9185,3873]]],[11,"TestAreaName0001",[[-10249,441,2078],[-8841,-1131,1679]]]];
export interface IAreaElement extends IElementBase{
 	/**区域 ID*/
	id:number
	/**名称*/
	name:string
	/**点集*/
	points:Array<Array<number>>
 } 
export class AreaConfig extends ConfigBase<IAreaElement>{
	constructor(){
		super(EXCELDATA);
	}

}