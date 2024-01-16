import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Info","Price","Award","BasePlant","UponMuch","Name","Text","Icon","BaseIcon"],["","","","","","","Language","Language","",""],[1,"奖励",0,0,4,0,"Task_shop_16",null,null,null],[2,"任务扭蛋-扭蛋表id",400,1034,1,0,"Task_shop_1",null,"183108","183114"],[3,"滑板-默认滑板",200,0,1,1,"Task_shop_2","Task_shop_8","183113","183111"],[4,"宠物装备槽",2500,1,2,1,"Task_shop_3","Task_shop_9","183115","183110"],[5,"宠物背包容量 ",200,10,2,3,"Task_shop_4","Task_shop_10","183116","183110"],[6,"敬请期待",0,0,2,0,"Task_shop_11","Task_shop_12","183574","183110"],[7,"钻石奖励",0,0,4,0,"Task_shop_17",null,null,null],[8,"大钻石",5000,5000000000,3,0,"Task_shop_5",null,null,"183112"],[9,"中钻石",2000,1200000000,3,0,"Task_shop_6",null,null,"183112"],[10,"小钻石",500,250000000,3,0,"Task_shop_7",null,null,"183112"]];
export interface ITaskShopElement extends IElementBase{
 	/**定死了，如果再新增需要保持当前的id号*/
	id:number
	/**内容说明策划用*/
	Info:string
	/**价格*/
	Price:number
	/**收益
对应自己的收益用参数*/
	Award:number
	/**对应底板类型1=大；2=中；3=小；4=文本*/
	BasePlant:number
	/**兑换数量上限0=无限制*/
	UponMuch:number
	/**商品名文本*/
	Name:string
	/**商品详情文本*/
	Text:string
	/**商品图标*/
	Icon:string
	/**底板guid*/
	BaseIcon:string
 } 
export class TaskShopConfig extends ConfigBase<ITaskShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}