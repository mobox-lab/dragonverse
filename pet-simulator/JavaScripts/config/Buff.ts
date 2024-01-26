import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","type","param","buffName","Ability","PicGuid"],["","Language","","","","",""],[1,"Buff_Text_1",1,10,"收益buff1","提升可破坏物奖励10%","179841"],[2,"Buff_Text_2",1,20,"收益buff3","提升可破坏物奖励20%","179841"],[3,"Buff_Text_3",1,20,"小型奖励药水","提升可破坏物奖励20%","179841"],[4,"Buff_Text_4",1,30,"中型奖励药水","可破坏物奖励提升30%","179841"],[5,"Buff_Text_5",1,50,"大型奖励药水","可破坏物奖励提升50%","179841"],[6,"Buff_Text_6",2,10,"伤害buff2","提升宠物攻击力10%","179840"],[7,"Buff_Text_7",2,20,"伤害buff4","提升宠物攻击力20%","179840"],[8,"Buff_Text_8",2,20,"小型伤害药水","提升宠物攻击力20%","179840"],[9,"Buff_Text_9",2,30,"中型伤害药水","宠物攻击力提升30%","179840"],[10,"Buff_Text_10",2,50,"大型伤害药水","宠物攻击力提升50%","179840"]];
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
	/**buff/药水名称
（策划用）*/
	buffName:string
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