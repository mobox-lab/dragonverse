import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","uiName","description"],["","","Language"],[1,"imgSymbol1","Maptext001"],[2,"imgSymbol2","Maptext002"],[3,"imgSymbol3","Maptext003"],[4,"imgSymbol4","Maptext004"],[5,"imgSymbol5","Maptext005"]];
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