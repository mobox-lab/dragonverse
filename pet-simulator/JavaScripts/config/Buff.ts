import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","Ability","PicGuid"],["","Language","",""],[1,"Text_ItemUI_4","打碎金币堆获取的金币数量*3","179841"],[2,"Text_ItemUI_5","对金币堆造成的伤害变为3倍","179840"],[3,"Text_ItemUI_6","抽卡概率小提升","179839"],[4,"Text_ItemUI_7","抽卡概率大幅提升","179838"]];
export interface IBuffElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**名字*/
	name:string
	/**效果描述*/
	Ability:string
	/**图标guid*/
	PicGuid:string
 } 
export class BuffConfig extends ConfigBase<IBuffElement>{
	constructor(){
		super(EXCELDATA);
	}

}