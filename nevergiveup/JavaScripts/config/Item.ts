import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","itemType","itemTypeid","itemLevel","itemImgGuid","nameKey"],["","","","","","Language"],[1,1,0,1,"98218","Item_nameKey_1"],[2,3,0,3,"133582","Item_nameKey_2"],[3,4,0,4,"153850","Item_nameKey_3"],[1001,2,1001,2,null,"Tower_name_1"],[1002,2,1002,2,null,"Tower_name_2"],[1003,2,1003,2,null,"Tower_name_3"],[1004,2,1004,2,null,"Tower_name_4"],[1005,2,1005,2,null,"Tower_name_5"],[1006,2,1006,2,null,"Tower_name_6"],[1007,2,1007,2,null,"Tower_name_7"],[1008,2,1008,2,null,"Tower_name_8"],[1009,2,1009,2,null,"Tower_name_9"],[1010,2,1010,2,null,"Tower_name_10"],[2001,2,2001,2,null,"Tower_name_11"],[3001,2,3001,2,null,"Tower_name_12"],[1011,2,1011,2,null,"Tower_name_12"],[1012,2,1012,2,null,"Tower_name_12"],[1013,2,1013,2,null,"Tower_name_12"],[1014,2,1014,2,null,"Tower_name_12"],[1015,2,1015,2,null,"Tower_name_12"],[1016,2,1016,2,null,"Tower_name_12"],[1017,2,1017,2,null,"Tower_name_12"]];
export interface IItemElement extends IElementBase{
 	/**道具id*/
	id:number
	/**道具类型
1.货币
2.塔的卡牌
3.科技点
4.经验*/
	itemType:number
	/**链接到对应表（如果有）中的id*/
	itemTypeid:number
	/**道具品质*/
	itemLevel:number
	/**道具的图片的guid*/
	itemImgGuid:string
	/**道具名*/
	nameKey:string
 } 
export class ItemConfig extends ConfigBase<IItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}