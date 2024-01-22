import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","attribute","addType","addValue","effectIds","soundGuid"],["","","","","","",""],[201001,"消耗药水：加血",70,2,0.1,[64],"136197"]];
export interface IItemConsumeElement extends IElementBase{
 	/**id与背包表id保持一致*/
	id:number
	/**描述*/
	desc:string
	/**属性70血量*/
	attribute:number
	/**增幅类型1值增加2百分比增加*/
	addType:number
	/**增幅值*/
	addValue:number
	/**特效表id数组*/
	effectIds:Array<number>
	/**音效guid*/
	soundGuid:string
 } 
export class ItemConsumeConfig extends ConfigBase<IItemConsumeElement>{
	constructor(){
		super(EXCELDATA);
	}

}