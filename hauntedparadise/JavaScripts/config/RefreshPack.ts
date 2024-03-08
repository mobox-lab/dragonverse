import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","lv","value","numberList","weight","u"],["","","","","",""],[1,1,120,[11001,11002,11003,11004,11005,10015,10016,10001],8,60],[2,2,300,[11003,11004,11005,11006,11007,10017,10018,10005,10002,10003],2,210],[3,3,600,[11007,11008,11009,11010,10000,10005,10004],1,560]];
export interface IRefreshPackElement extends IElementBase{
 	/**ID*/
	id:number
	/**资源包等级*/
	lv:number
	/**组合包价值*/
	value:number
	/**道具ID*/
	numberList:Array<number>
	/**比例*/
	weight:number
	/**u*/
	u:number
 } 
export class RefreshPackConfig extends ConfigBase<IRefreshPackElement>{
	constructor(){
		super(EXCELDATA);
	}

}