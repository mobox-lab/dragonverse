import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","mCanvasSkill0","mCanvasSkill1","mCanvasSkill2"],["","","","",""],[1,"拳头",3,1,2],[2,"单手剑",4,1,2],[3,"法杖",5,1,2],[4,"双手剑",36,1,2]];
export interface IMotionBtnElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**描述*/
	desc:string
	/**普攻按钮*/
	mCanvasSkill0:number
	/**跳跃按钮*/
	mCanvasSkill1:number
	/**冲刺按钮*/
	mCanvasSkill2:number
 } 
export class MotionBtnConfig extends ConfigBase<IMotionBtnElement>{
	constructor(){
		super(EXCELDATA);
	}

}