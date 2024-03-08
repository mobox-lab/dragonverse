import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","imageGuid","charmVal","intimacy"],["","Language","","",""],[1,"棒棒糖","157246",1,1],[2,"棒棒糖","157247",2,2],[3,"棒棒糖","157248",3,3],[4,"棒棒糖","157249",4,4],[5,"棒棒糖","157250",5,5],[6,"棒棒糖","157251",6,6],[7,"棒棒糖","157252",7,7],[8,"棒棒糖","157253",8,8],[9,"棒棒糖","157254",9,9]];
export interface IGiftElement extends IElementBase{
 	/**id*/
	id:number
	/**名字*/
	name:string
	/**图标guid*/
	imageGuid:string
	/**魅力值*/
	charmVal:number
	/**增加的亲密度*/
	intimacy:number
 } 
export class GiftConfig extends ConfigBase<IGiftElement>{
	constructor(){
		super(EXCELDATA);
	}

}