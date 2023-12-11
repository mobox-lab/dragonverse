import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","iceLoc","iceRot","iceScale","mesh","impulse","triggerSpeedZ"],["","","","","","",""],[1,[6192,4793,1737],[0,0,0],[1,1,1],"24512",1000,300],[2,[6392,4793,1737],[0,0,0],[1,1,1],"24512",1000,300],[3,[6592,4793,1737],[0,0,0],[1,1,1],"24512",1000,300],[4,[6192,4993,1737],[0,0,0],[1,1,1],"24512",1000,300],[5,[6392,4993,1737],[0,0,0],[1,1,1],"24512",1000,300],[6,[6592,4993,1737],[0,0,0],[1,1,1],"24512",1000,300]];
export interface IIceBlockElement extends IElementBase{
 	/**ID*/
	id:number
	/**冰块位置*/
	iceLoc:Array<number>
	/**冰块旋转*/
	iceRot:Array<number>
	/**冰块大小*/
	iceScale:Array<number>
	/**材质*/
	mesh:string
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