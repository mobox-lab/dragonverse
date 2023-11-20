import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_Ch","Value_J","Value_D"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"TestLanguageKey000001",null,null,null,null]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**undefined*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**null*/
	get TestLanguageKey000001():ILanguageElement{return this.getElement(1)};

}