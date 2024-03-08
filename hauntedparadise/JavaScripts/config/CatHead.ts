import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","key","detail","number","string","ids"],["","ReadByName","","","Language",""],[1,"startCd","查房机制开始cd",30,null,null],[2,"preTime","预警倒计时时间",20,null,null],[3,"decTime","每次摸猫猫头减少的时间",2,null,null],[4,"runTime","每条猫猫头存活的时长",30,null,null],[5,"tips1","查房预警tips",0,"这里配多语言的key。鬼猫狂热将于{0}秒后开始，触摸猫猫头可取消本层狂热。",null],[6,"tips2","查房预警期间猫猫头",0,"玩家{0}取消了本层鬼猫狂热 ",null],[7,"tips3","怪物刷出后的tips",0,"本楼层鬼猫狂热已开始，请勿在走廊逗留。 ",null],[8,"tips4","狂热结束后的tips",0,"本楼层鬼猫狂热已结束 贡献者{0}",null],[9,"allAreaIds ","所有的猫猫头区域id",0,null,[1]],[10,"area2GhostId","猫猫头区域对应的鬼的id",0,null,[1]],[11,"preSound","预警音效（填sound表对应的音效id）",1,null,null]];
export interface ICatHeadElement extends IElementBase{
 	/**ID*/
	id:number
	/**变量名，需要这列唯一*/
	key:string
	/**描述*/
	detail:string
	/**数字*/
	number:number
	/**字符串*/
	string:string
	/**ids*/
	ids:Array<number>
 } 
export class CatHeadConfig extends ConfigBase<ICatHeadElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**30*/
	get startCd():ICatHeadElement{return this.getElement(1)};
	/**20*/
	get preTime():ICatHeadElement{return this.getElement(2)};
	/**2*/
	get decTime():ICatHeadElement{return this.getElement(3)};
	/**30*/
	get runTime():ICatHeadElement{return this.getElement(4)};
	/**0*/
	get tips1():ICatHeadElement{return this.getElement(5)};
	/**0*/
	get tips2():ICatHeadElement{return this.getElement(6)};
	/**0*/
	get tips3():ICatHeadElement{return this.getElement(7)};
	/**0*/
	get tips4():ICatHeadElement{return this.getElement(8)};
	/**0*/
	get allAreaIds ():ICatHeadElement{return this.getElement(9)};
	/**0*/
	get area2GhostId():ICatHeadElement{return this.getElement(10)};
	/**1*/
	get preSound():ICatHeadElement{return this.getElement(11)};

}