import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","iceLoc","iceRot","iceScale","mesh"],["","","","",""],[1,[6192,4793,1737],[0,0,0],[1,1,1],"24512"],[2,[6392,4793,1737],[0,0,0],[1,1,1],"24512"],[3,[6592,4793,1737],[0,0,0],[1,1,1],"24512"],[4,[6192,4993,1737],[0,0,0],[1,1,1],"24512"],[5,[6392,4993,1737],[0,0,0],[1,1,1],"24512"],[6,[6592,4993,1737],[0,0,0],[1,1,1],"24512"]];
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
 } 
export class IceBlockConfig extends ConfigBase<IIceBlockElement>{
	constructor(){
		super(EXCELDATA);
	}

}