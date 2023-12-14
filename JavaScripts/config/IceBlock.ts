import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","iceLoc","iceRot","iceScale","triggerRot","triggerScale","effectScale","impulse","triggerSpeedZ"],["","","","","","","","",""],[1,[5706.1,3481.74,1707.5],[0,0,0],[0.1,0.1,0.1],[0,0,0],[1,1,1],[1,1,1],1000,300],[2,[5376.1,3481.74,1707.5],[0,0,0],[0.1,0.1,0.1],[0,0,0],[1,1,1],[1,1,1],1000,300],[3,[5046.1,3481.74,1707.5],[0,0,0],[0.1,0.1,0.1],[0,0,0],[1,1,1],[1,1,1],1000,300],[4,[6046.1,3481.74,1707.5],[0,0,0],[0.1,0.1,0.1],[0,0,0],[1,1,1],[1,1,1],1000,300],[5,[6386.1,3481.74,1707.5],[0,0,0],[0.1,0.1,0.1],[0,0,0],[1,1,1],[1,1,1],1000,300],[6,[6736.1,3481.74,1707.5],[0,0,0],[0.1,0.1,0.1],[0,0,0],[1,1,1],[1,1,1],1000,300]];
export interface IIceBlockElement extends IElementBase{
 	/**ID*/
	id:number
	/**冰块位置*/
	iceLoc:Array<number>
	/**冰块旋转*/
	iceRot:Array<number>
	/**冰块大小*/
	iceScale:Array<number>
	/**触发器旋转*/
	triggerRot:Array<number>
	/**触发器大小*/
	triggerScale:Array<number>
	/**碎裂特效大小*/
	effectScale:Array<number>
	/**z轴冲量大小*/
	impulse:number
	/**触发冰块碎裂速度*/
	triggerSpeedZ:number
 } 
export class IceBlockConfig extends ConfigBase<IIceBlockElement>{
	constructor(){
		super(EXCELDATA);
	}

}