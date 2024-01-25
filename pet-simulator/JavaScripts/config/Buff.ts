import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","param","Ability","PicGuid"],["","Language","","","",""],[1,"Text_ItemUI_4",1,100,"提升可破坏物奖励100%","179841"],[2,"Text_ItemUI_4",1,200,"提升可破坏物奖励200%","179841"],[3,"Text_ItemUI_4",1,300,"可破坏物奖励提升300%","179841"],[4,"Text_ItemUI_4",1,500,"可破坏物奖励提升500%","179841"],[5,"Text_ItemUI_5",2,100,"提升宠物攻击力100%","179840"],[6,"Text_ItemUI_5",2,200,"提升宠物攻击力200%","179840"],[7,"Text_ItemUI_5",2,300,"宠物攻击力提升300%","179840"],[8,"Text_ItemUI_5",2,500,"宠物攻击力提升500%","179840"]];
export interface IBuffElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**名字*/
	name:string
	/**类型（1可破坏物奖励提升
2宠物攻击力提升）*/
	type:number
	/**参数*/
	param:number
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