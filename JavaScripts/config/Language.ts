import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Value","Value_Ch","Value_J","Value_D"],["","Key|ReadByName","MainLanguage","ChildLanguage","ChildLanguage","ChildLanguage"],[1,"TestLanguageKey000001","Test000001","测试000001",null,null],[2,"TestQualityName0001","TestQuality","测试质量",null,null],[3,"TestBagItemName0001","TestBagItem","测试背包物品",null,null],[4,"TestBagItemDesc0001","TestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDescTestBagItemDesc","测试背包描述测试背包描述测试背包描述测试背包描述测试背包描述",null,null],[5,"TestAreaName0001","TestArea",null,null,null]];
export interface ILanguageElement extends IElementBase{
 	/**id*/
	ID:number
	/**名称*/
	Name:string
	/**英文*/
	Value:string
 } 
export class LanguageConfig extends ConfigBase<ILanguageElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**测试000001*/
	get TestLanguageKey000001():ILanguageElement{return this.getElement(1)};
	/**测试质量*/
	get TestQualityName0001():ILanguageElement{return this.getElement(2)};
	/**测试背包物品*/
	get TestBagItemName0001():ILanguageElement{return this.getElement(3)};
	/**测试背包描述测试背包描述测试背包描述测试背包描述测试背包描述*/
	get TestBagItemDesc0001():ILanguageElement{return this.getElement(4)};
	/**null*/
	get TestAreaName0001():ILanguageElement{return this.getElement(5)};

}