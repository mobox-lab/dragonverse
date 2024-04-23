import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","desc","icon","achievable"],["","Language","Language","",""],[1,"BagItemName0001","BagItemDesc0001","267113",true],[2,"BagItemName0002","BagItemDesc0002","267114",false],[3,"BagItemName0003","BagItemDesc0003","267112",true],[4,"BoxingDragonName00041","BoxingDragonName00041","326248",true],[5,"BoxingDragonName00042","BoxingDragonName00042","326241",true],[6,"BoxingDragonName00043","BoxingDragonName00043","326262",true],[7,"BoxingDragonName00044","BoxingDragonName00044","326267",true],[8,"BoxingDragonName00045","BoxingDragonName00045","326252",true],[9,"BoxingDragonName00051","BoxingDragonName00051","326251",true],[10,"BoxingDragonName00052","BoxingDragonName00052","326271",true],[11,"BoxingDragonName00046","BoxingDragonName00046","326237",true],[12,"BoxingDragonName00047","BoxingDragonName00047","326236",true],[13,"BoxingDragonName00048","BoxingDragonName00048","326240",true],[14,"BoxingDragonName00049","BoxingDragonName00049","326246",true],[15,"BoxingDragonName00050","BoxingDragonName00050","326245",true],[16,"BoxingDragonName00053","BoxingDragonName00053","326253",true],[17,"BoxingDragonName00054","BoxingDragonName00054","326244",true],[18,"BoxingDragonName00006","BoxingDragonName00006","326270",true],[19,"BoxingDragonName00007","BoxingDragonName00007","326272",true],[20,"BoxingDragonName00008","BoxingDragonName00008","326264",true],[21,"BoxingDragonName00009","BoxingDragonName00009","326263",true],[22,"BoxingDragonName00010","BoxingDragonName00010","326261",true],[23,"BoxingDragonName00026","BoxingDragonName00026","326269",true],[24,"BoxingDragonName00027","BoxingDragonName00027","326258",true],[25,"BoxingDragonName00001","BoxingDragonName00001","326243",true],[26,"BoxingDragonName00002","BoxingDragonName00002","326250",true],[27,"BoxingDragonName00003","BoxingDragonName00003","326249",true],[28,"BoxingDragonName00004","BoxingDragonName00004","326238",true],[29,"BoxingDragonName00005","BoxingDragonName00005","326276",true],[30,"BoxingDragonName00021","BoxingDragonName00021","326268",true],[31,"BoxingDragonName00022","BoxingDragonName00022","326279",true],[32,"BoxingDragonName00016","BoxingDragonName00016","326242",true],[33,"BoxingDragonName00017","BoxingDragonName00017","326277",true],[34,"BoxingDragonName00018","BoxingDragonName00018","326275",true],[35,"BoxingDragonName00019","BoxingDragonName00019","326265",true],[36,"BoxingDragonName00020","BoxingDragonName00020","326239",true],[37,"BoxingDragonName00036","BoxingDragonName00036","326274",true],[38,"BoxingDragonName00037","BoxingDragonName00037","326260",true],[39,"BoxingDragonName00011","BoxingDragonName00011","326255",true],[40,"BoxingDragonName00012","BoxingDragonName00012","326259",true],[41,"BoxingDragonName00013","BoxingDragonName00013","326273",true],[42,"BoxingDragonName00014","BoxingDragonName00014","326278",true],[43,"BoxingDragonName00015","BoxingDragonName00015","326257",true],[44,"BoxingDragonName00031","BoxingDragonName00031","326266",true],[45,"BoxingDragonName00032","BoxingDragonName00032","326256",true],[46,"HomeResourcesName0001","HomeResourcesDesc0001","222920",false],[47,"HomeResourcesName0002","HomeResourcesDesc0002","222920",false],[48,"HomeResourcesName0003","HomeResourcesDesc0003","222920",false],[49,"HomeResourcesName0004","HomeResourcesDesc0004","222920",false]];
export interface IBagItemElement extends IElementBase{
 	/**背包物品 ID*/
	id:number
	/**名称*/
	name:string
	/**描述*/
	desc:string
	/**图标*/
	icon:string
	/**可完成性*/
	achievable:boolean
 } 
export class BagItemConfig extends ConfigBase<IBagItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}