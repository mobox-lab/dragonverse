import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","landId","runtype","hideRecover","runRecover","XRun1","XRun2","YRun1","YRun2","ZRun1","ZRun2"],["","","","","","","","","","",""],[2,[47,48,49,50,54,55,56,57,61,62,63,64,68,69,70,71],1,1,0,0,0,0,0,0,0],[3,[4,5,13,14,23,24,33,34,41,42,48,49,52,53,54,55,56,57,58,59,60,61,62,63,64,65,69,70,76,77,83,84,90,91,97,98],1,1,0,0,0,0,0,0,0]];
export interface ILandRunElement extends IElementBase{
 	/**唯一ID*/
	id:number
	/**地块表ID*/
	landId:Array<number>
	/**运动类型
1：显隐
2：平移*/
	runtype:number
	/**显隐是否恢复*/
	hideRecover:number
	/**平移是否恢复*/
	runRecover:number
	/**X轴正向平移开关*/
	XRun1:number
	/**X轴负向平移开关*/
	XRun2:number
	/**Y轴正向平移开关*/
	YRun1:number
	/**Y轴负向平移开关*/
	YRun2:number
	/**Z轴正向平移开关*/
	ZRun1:number
	/**Z轴负向平移开关*/
	ZRun2:number
 } 
export class LandRunConfig extends ConfigBase<ILandRunElement>{
	constructor(){
		super(EXCELDATA);
	}

}