import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","iceLoc","iceRot","iceScale","triggerRot","triggerScale","effectScale","impulse","triggerSpeedZ"],["","","","","","","","",""],[1,[5514.75,8711.22,1450.87],[0,0,0],[1,1,1],[0,0,0],[22,32,2],[3,3,3],3500,500],[2,[6196.5,8809.18,1304.24],[0,0,0],[0.15,0.15,1],[0,0,0],[4.75,4.88,0.8],[1,1,1],2500,1200],[3,[5616.5,8480.18,1304.24],[0,0,0],[0.15,0.15,1],[0,0,0],[4.75,4.88,0.8],[1,1,1],2500,1200],[4,[5070.5,7856.18,1304.24],[0,0,0],[0.15,0.15,1],[0,0,0],[4.75,4.88,0.8],[1,1,1],2500,1200],[5,[4985.5,8735.18,1304.24],[0,0,0],[0.15,0.15,1],[0,0,0],[4.75,4.88,0.8],[1,1,1],2500,1200],[6,[5289.5,9557.18,1304.24],[0,0,0],[0.15,0.15,1],[0,0,0],[4.75,4.88,0.8],[1,1,1],2500,1200]];
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