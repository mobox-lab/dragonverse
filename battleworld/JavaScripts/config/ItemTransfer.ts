import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","name","keepTime","prefabGuid"],["","","","",""],[204001,"传送卷轴","传送卷轴",30,"01B8DA2E400B6C53BADDC1B7403C1D4D"]];
export interface IItemTransferElement extends IElementBase{
 	/**id与背包表id保持一致*/
	id:number
	/**描述*/
	desc:string
	/**名字*/
	name:string
	/**保持时间秒*/
	keepTime:number
	/**传送门预制体guid*/
	prefabGuid:string
 } 
export class ItemTransferConfig extends ConfigBase<IItemTransferElement>{
	constructor(){
		super(EXCELDATA);
	}

}