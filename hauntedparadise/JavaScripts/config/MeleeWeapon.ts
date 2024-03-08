import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","hurt","hurtRate","otherStance","otherAtkAni","selfAtkToPos","selfAtkToRot","selfAtkTime","force","dirZIndex","attackSound","HitSound"],["","","","","","","","","","","","",""],[1,"棒子",10,[1],"14745",["20269"],[new mw.Vector(80,20,-50)],[new mw.Vector(-10,-70,0)],[100],500,0.7,1009,1010]];
export interface IMeleeWeaponElement extends IElementBase{
 	/**id*/
	id:number
	/**武器名称*/
	name:string
	/**基础伤害*/
	hurt:number
	/**各段伤害系数*/
	hurtRate:Array<number>
	/**别人视野中的姿态*/
	otherStance:string
	/**别人视野中的攻击动画*/
	otherAtkAni:Array<string>
	/**攻击的相对镜头终点位置可配置多段连击*/
	selfAtkToPos:mw.Vector[]
	/**攻击的相对镜头终点旋转可配置多段连击*/
	selfAtkToRot:mw.Vector[]
	/**总时长*/
	selfAtkTime:Array<number>
	/**力的大小*/
	force:number
	/**力的Z轴方向系数，决定飞向角度（最好在-1~1之间）*/
	dirZIndex:number
	/**挥动音效*/
	attackSound:number
	/**击中音效*/
	HitSound:number
 } 
export class MeleeWeaponConfig extends ConfigBase<IMeleeWeaponElement>{
	constructor(){
		super(EXCELDATA);
	}

}