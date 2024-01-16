import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","PetId","Price"],["","",""],[1,1,100],[2,2,101],[3,3,102],[4,1,103],[5,2,104],[6,3,105]];
export interface IShopElement extends IElementBase{
 	/**ID*/
	id:number
	/**宠物id*/
	PetId:number
	/**钻石*/
	Price:number
 } 
export class ShopConfig extends ConfigBase<IShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}