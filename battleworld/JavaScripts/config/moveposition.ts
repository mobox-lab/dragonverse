import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","guid","position","speed","time","rotation","dynamicRotation"],["","","","","","",""],[1,"3ED92A3F",[new mw.Vector(235371,45263,21283),new mw.Vector(264463,-19519,21283),new mw.Vector(221339,-61553,21283),new mw.Vector(127925,-38007,21401)],new mw.Vector(1000,0,0),[72,72,72,90,90],null,1],[2,"0F979FB3",[new mw.Vector(241637,20663,28896)],new mw.Vector(800,0,0),[45,45],null,1],[3,"0DA3D6B5",[new mw.Vector(193685,-5900,43246),new mw.Vector(222424,-16660,42705),new mw.Vector(230357,4581,41682)],new mw.Vector(800,0,0),[45,45,45,45],null,1],[4,"0AA29100",[new mw.Vector(189858,39581,10076)],new mw.Vector(0,0,-1000),[30,30],null,0],[5,"12070999",[new mw.Vector(182343,12489,25333),new mw.Vector(146849,10559,25333),new mw.Vector(148745,-24318,25407)],new mw.Vector(0,800,0),[60,60,50,50],new mw.Vector(0,0,-90),1]];
export interface ImovepositionElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**物品场景Guid*/
	guid:string
	/**坐标数组2*/
	position:mw.Vector[]
	/**速度(注意是物体的本地轴)*/
	speed:mw.Vector
	/**每段时间(从起始到坐标数组2再到起始 所以比坐标数组2多一个)*/
	time:Array<number>
	/**模型相对旋转*/
	rotation:mw.Vector
	/**是否需要动态旋转（1是0否）*/
	dynamicRotation:number
 } 
export class movepositionConfig extends ConfigBase<ImovepositionElement>{
	constructor(){
		super(EXCELDATA);
	}

}