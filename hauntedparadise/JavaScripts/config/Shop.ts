import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","modelGuid","price","buyLimit","currencyType","description","type","listingTime","itemID","weight","shopID","giftList","giftNum","giftWeights","cameraGuid","itemPoint","otherLoc","otherRot","otherScale"],["","Language","","","","","Language","","","","","","","","","","","","",""],[1,"道具1","20799",10,10,1,"道具描述1",1,"1",10000,1,1,null,null,null,"1D4414F9","156DC1FF",null,null,null],[2,"道具2","21007",20,20,1,"道具描述2",2,"1",10001,2,1,null,null,null,"1D4414F9","156DC1FF",null,null,null],[3,"道具3","124422",200,2,1,"道具描述3",3,"2",10002,3,1,null,null,null,"1D4414F9","156DC1FF",null,null,null],[4,"道具4","43460",3000,5,1,"道具描述4",4,"2",10100,4,1,[[10003,10001],[10002,10004],[10005,10006]],[[1,1],[2,1],[1,3]],[4,5,6],"1D4414F9","156DC1FF",null,null,null],[5,"道具5","125037",400,10,1,"道具描述5",1,"2",10004,5,1,null,null,null,"1D4414F9","156DC1FF",null,null,null],[6,"道具6","266B3A6F4838B89FADAE4D8A780F594C",8000,2,1,"道具描述6",1,"2",10005,6,1,null,null,null,"1D4414F9","156DC1FF",null,new mw.Vector(90,0,0),new mw.Vector(2,2,2)]];
export interface IShopElement extends IElementBase{
 	/**ID*/
	id:number
	/**名字*/
	name:string
	/**模型ID*/
	modelGuid:string
	/**价格*/
	price:number
	/**限购数量(-1表示不限购)*/
	buyLimit:number
	/**货币类型*/
	currencyType:number
	/**商品描述*/
	description:string
	/**道具类型*/
	type:number
	/**上架时间*/
	listingTime:string
	/**关联道具表id*/
	itemID:number
	/**权重*/
	weight:number
	/**商店ID*/
	shopID:number
	/**礼包道具*/
	giftList:Array<Array<number>>
	/**礼包内道具数量*/
	giftNum:Array<Array<number>>
	/**礼包权重*/
	giftWeights:Array<number>
	/**摄像机guid*/
	cameraGuid:string
	/**模型锚点guid*/
	itemPoint:string
	/**模型位移*/
	otherLoc:mw.Vector
	/**模型旋转*/
	otherRot:mw.Vector
	/**模型缩放*/
	otherScale:mw.Vector
 } 
export class ShopConfig extends ConfigBase<IShopElement>{
	constructor(){
		super(EXCELDATA);
	}

}