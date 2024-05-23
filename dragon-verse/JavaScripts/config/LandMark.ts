import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","uiName","description"],["","","Language"],[1,"imgSymbol6","Maptext006"],[2,"imgSymbol7","Maptext007"],[3,"imgSymbol1","Maptext001"],[4,"imgSymbol2","Maptext002"],[5,"imgSymbol3","Maptext003"],[6,"imgSymbol4","Maptext004"],[7,"imgSymbol5","Maptext005"],[8,"imgSymbol8","Maptext008"]];
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