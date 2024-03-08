import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","key","detail","diffcult","number","numberList","string","stringList","vector","array1d","array2d"],["","ReadByName","","","","","","","","",""],[1,"Value1","难度1价值区间",1,0,null,null,null,null,[6227,6882],null],[2,"Value_2","难度2价值区间",2,0,null,null,null,null,[6555,7245],null],[3,"Value_3","难度3价值区间",3,0,null,null,null,null,[6882,7607],null],[4,"Value_4","难度4价值区间",4,0,null,null,null,null,[7210,7969],null],[5,"Value_5","难度5价值区间",5,0,null,null,null,null,[7866,8694],null],[99,"GraveYard","墓地的价值区间",99,0,null,null,null,null,[10830,11970],null],[6,"Valid_Pos","最小生效点位数",0,0,null,null,null,null,null,[[0,0,0],[0,0,0],[0,0,0]]]];
export interface ISceneRefreshPropsElement extends IElementBase{
 	/**ID*/
	id:number
	/**变量名，需要这列唯一*/
	key:string
	/**描述*/
	detail:string
	/**难度*/
	diffcult:number
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
	/**二维数组*/
	array2d:Array<Array<number>>
 } 
export class SceneRefreshPropsConfig extends ConfigBase<ISceneRefreshPropsElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**1*/
	get Value1():ISceneRefreshPropsElement{return this.getElement(1)};
	/**2*/
	get Value_2():ISceneRefreshPropsElement{return this.getElement(2)};
	/**3*/
	get Value_3():ISceneRefreshPropsElement{return this.getElement(3)};
	/**4*/
	get Value_4():ISceneRefreshPropsElement{return this.getElement(4)};
	/**5*/
	get Value_5():ISceneRefreshPropsElement{return this.getElement(5)};
	/**99*/
	get GraveYard():ISceneRefreshPropsElement{return this.getElement(99)};
	/**0*/
	get Valid_Pos():ISceneRefreshPropsElement{return this.getElement(6)};

}