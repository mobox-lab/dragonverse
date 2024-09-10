import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","uiName","description"],["","","Language"],[1,"imgSymbol6","Maptext006"],[2,"imgSymbol7","Maptext007"],[3,"imgSymbol4","Maptext009"],[4,"imgSymbol9","Maptext010"]];
export interface ILandMarkElement extends IElementBase{
 	/**id*/
	id:number
	/**地标UI的名称*/
	uiName:string
	/**地标的描述（多语言表key）*/
	description:string
 } 
export class LandMarkConfig extends ConfigBase<ILandMarkElement>{
	constructor(){
		super(EXCELDATA);
	}

}