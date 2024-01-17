import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["Id","Des","BuffType","Effectguid","MaterialId","TriggerScale","Frequency","ValueType","Value","msgKey"],["","","","","","","","","",""],[1,"火海（持续伤害）",1,157,"227686",new mw.Vector(8,8,2),1.5,70,-100,"fire"],[2,"毒沼",1,158,"224733",new mw.Vector(8,8,2),1,70,-50,"poison"],[3,"炮击（一次性伤害）",2,159,null,new mw.Vector(8,8,4),0,70,-150,"light"],[4,"雷击",2,160,null,new mw.Vector(8,8,10),0,70,-200,"cannon"],[5,"减速",3,161,null,new mw.Vector(7,7,2),0,201,-50,null],[6,"冲量跳跃",4,163,"47684",new mw.Vector(8,8,2),0,100,3000,null]];
export interface ILandBuffElement extends IElementBase{
 	/**唯一ID*/
	Id:number
	/**描述（策划看）*/
	Des:string
	/**类型
1 持续伤害
2 一次性伤害
3 属性修改*/
	BuffType:number
	/**特效ID*/
	Effectguid:number
	/**材质ID
不填则表示不替换材质*/
	MaterialId:string
	/**触发器缩放*/
	TriggerScale:mw.Vector
	/**触发频率xS/次不填默认触发1次*/
	Frequency:number
	/**数值类型
(属性ID沿用天启)
伤害：70
冲量：100*/
	ValueType:number
	/**buff数值
（正数+数值；负数-数值）*/
	Value:number
	/**标记该伤害的埋点key*/
	msgKey:string
 } 
export class LandBuffConfig extends ConfigBase<ILandBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}