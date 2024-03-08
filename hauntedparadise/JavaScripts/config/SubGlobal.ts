import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","key","detail","number","numberList","string","stringList","vector","array1d"],["","ReadByName","","","","","","",""],[1,"wantParams","每日白嫖配置",0,null,null,null,null,[10,0.05,1,10]],[2,"openBoxTimes","每日开宝箱次数",5,null,null,null,null,null],[3,"CurCardEffect","解密卡引导特效|缩放",0,null,"E4ABE76F452E98C5394D27ABFFC38A08",null,new mw.Vector(1,1,1),null],[4,"PassBaseExp","通关获得经验基数",300,null,null,null,null,null],[5,"NaturalOutputExp","每分钟自然产出经验",10,null,null,null,null,null]];
export interface ISubGlobalElement extends IElementBase{
 	/**ID*/
	id:number
	/**变量名，需要这列唯一*/
	key:string
	/**描述*/
	detail:string
	/**数字*/
	number:number
	/**二维数组*/
	numberList:Array<Array<number>>
	/**字符串*/
	string:string
	/**字符串数组*/
	stringList:Array<string>
	/**坐标*/
	vector:mw.Vector
	/**一维数组*/
	array1d:Array<number>
 } 
export class SubGlobalConfig extends ConfigBase<ISubGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**0*/
	get wantParams():ISubGlobalElement{return this.getElement(1)};
	/**5*/
	get openBoxTimes():ISubGlobalElement{return this.getElement(2)};
	/**0*/
	get CurCardEffect():ISubGlobalElement{return this.getElement(3)};
	/**300*/
	get PassBaseExp():ISubGlobalElement{return this.getElement(4)};
	/**10*/
	get NaturalOutputExp():ISubGlobalElement{return this.getElement(5)};

}