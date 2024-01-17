import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","AttrType","AttrValue"],["","",""],[1,101,0],[2,102,0],[3,103,0],[4,104,0],[5,105,0],[6,106,0],[7,107,0],[8,108,0],[9,109,0],[10,110,0],[11,111,0],[12,112,0],[13,113,0],[14,114,0],[15,0,0],[16,201,0],[17,202,0],[18,203,0],[19,204,0],[20,205,0],[21,206,0],[22,207,0],[23,208,0],[24,209,0],[25,210,0],[26,211,0],[27,212,0],[28,213,0],[29,214,0],[30,0,0],[31,1,650],[32,2,1000],[33,3,0],[34,4,100],[35,5,5],[36,6,0],[37,7,500],[38,8,0],[39,9,0],[40,10,0],[41,11,2],[42,12,0],[43,13,0],[44,14,0]];
export interface IInitialAttrElement extends IElementBase{
 	/**ID*/
	ID:number
	/**类型*/
	AttrType:number
	/**属性值*/
	AttrValue:number
 } 
export class InitialAttrConfig extends ConfigBase<IInitialAttrElement>{
	constructor(){
		super(EXCELDATA);
	}

}