import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","motionBtnDataId","weaponType","sellValue","weight","attrTypes","attrValues","selectIconGuid","changeIconGuid"],["","","","","","","","",""],[1,6,1,50,20,[102,107],[100,50],null,null],[2,7,1,50,20,[102,107],[100,50],null,null],[3,8,1,50,20,[102,107],[100,50],null,null],[4,9,1,50,20,[102,107],[100,50],null,null],[5,10,1,75,10,[107,107],[100,75],null,null],[6,11,1,100,5,[104,107],[25,100],null,null],[7,12,1,75,10,[102,107],[200,75],null,null],[8,13,1,75,10,[107,107],[100,75],null,null],[9,14,1,75,10,[102,107],[200,75],null,null],[10,15,1,100,5,[104,107],[25,100],null,null],[11,16,2,50,20,[102,107],[50,50],null,null],[12,17,2,50,20,[102,107],[50,50],null,null],[13,18,2,50,20,[102,107],[50,50],null,null],[14,19,2,75,5,[102,107],[100,50],null,null],[15,20,2,50,20,[102,107],[50,50],null,null],[16,21,2,75,10,[102,201],[80,10],null,null],[17,22,2,75,10,[102,201],[80,10],null,null],[18,23,2,100,5,[102,107],[100,100],null,null],[19,24,2,75,10,[102,201],[80,10],null,null],[20,25,2,100,5,[102,201],[100,10],null,null],[21,26,3,50,20,[102,107],[100,25],null,null],[22,27,3,50,20,[102,107],[100,25],null,null],[23,28,3,50,20,[102,107],[100,25],null,null],[24,29,3,50,20,[102,107],[100,25],null,null],[25,30,3,50,20,[102,107],[100,25],null,null],[26,31,3,75,10,[102,203],[150,5],null,null],[27,32,3,75,10,[102,203],[150,5],null,null],[28,33,3,75,10,[102,203],[150,5],null,null],[29,34,3,100,5,[102,104],[200,10],null,null],[30,35,3,100,5,[102,104],[200,10],null,null],[31,37,4,50,20,[102,107],[100,25],null,null],[32,38,4,50,20,[102,107],[100,25],null,null],[33,39,4,100,5,[102,107],[200,25],null,null],[34,40,4,50,20,[102,107],[100,25],null,null],[35,41,4,50,20,[102,107],[100,25],null,null],[36,42,4,75,10,[102,104],[150,5],null,null],[37,43,4,75,10,[102,104],[150,5],null,null],[38,44,4,50,20,[102,104],[100,5],null,null],[39,45,4,75,10,[102,203],[150,5],null,null],[40,46,4,100,5,[102,203],[200,10],null,null]];
export interface ISkillLibElement extends IElementBase{
 	/**唯一*/
	id:number
	/**MotionBtnData表技能按钮数据id*/
	motionBtnDataId:number
	/**武器类型*/
	weaponType:number
	/**售价*/
	sellValue:number
	/**权重*/
	weight:number
	/**属性加成数组*/
	attrTypes:Array<number>
	/**属性加成数组*/
	attrValues:Array<number>
	/**技能选择界面图标*/
	selectIconGuid:string
	/**技能更换界面图标*/
	changeIconGuid:string
 } 
export class SkillLibConfig extends ConfigBase<ISkillLibElement>{
	constructor(){
		super(EXCELDATA);
	}

}