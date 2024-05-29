import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","desc","desc_trs","icon","achievable"],["","Language","","Language","","",""],[1,"BagItemName0001",null,"BagItemDesc0001",null,"267113",true],[2,"BagItemName0002",null,"BagItemDesc0002",null,"267114",false],[3,"BagItemName0003",null,"BagItemDesc0003",null,"267112",true],[4,"BoxingDragonName00041",null,"BoxingDragonName00041",null,"326248",true],[5,"BoxingDragonName00042",null,"BoxingDragonName00042",null,"326241",true],[6,"BoxingDragonName00043",null,"BoxingDragonName00043",null,"326262",true],[7,"BoxingDragonName00044",null,"BoxingDragonName00044",null,"326267",true],[8,"BoxingDragonName00045",null,"BoxingDragonName00045",null,"326252",true],[9,"BoxingDragonName00051",null,"BoxingDragonName00051",null,"326251",true],[10,"BoxingDragonName00052",null,"BoxingDragonName00052",null,"326271",true],[11,"BoxingDragonName00046",null,"BoxingDragonName00046",null,"326237",true],[12,"BoxingDragonName00047",null,"BoxingDragonName00047",null,"326236",true],[13,"BoxingDragonName00048",null,"BoxingDragonName00048",null,"326240",true],[14,"BoxingDragonName00049",null,"BoxingDragonName00049",null,"326246",true],[15,"BoxingDragonName00050",null,"BoxingDragonName00050",null,"326245",true],[16,"BoxingDragonName00053",null,"BoxingDragonName00053",null,"326253",true],[17,"BoxingDragonName00054",null,"BoxingDragonName00054",null,"326244",true],[18,"BoxingDragonName00006",null,"BoxingDragonName00006",null,"326261",true],[19,"BoxingDragonName00007",null,"BoxingDragonName00007",null,"326272",true],[20,"BoxingDragonName00008",null,"BoxingDragonName00008",null,"326264",true],[21,"BoxingDragonName00009",null,"BoxingDragonName00009",null,"326263",true],[22,"BoxingDragonName00010",null,"BoxingDragonName00010",null,"326270",true],[23,"BoxingDragonName00026",null,"BoxingDragonName00026",null,"326269",true],[24,"BoxingDragonName00027",null,"BoxingDragonName00027",null,"326258",true],[25,"BoxingDragonName00001",null,"BoxingDragonName00001",null,"326243",true],[26,"BoxingDragonName00002",null,"BoxingDragonName00002",null,"326250",true],[27,"BoxingDragonName00003",null,"BoxingDragonName00003",null,"326249",true],[28,"BoxingDragonName00004",null,"BoxingDragonName00004",null,"326238",true],[29,"BoxingDragonName00005",null,"BoxingDragonName00005",null,"326276",true],[30,"BoxingDragonName00021",null,"BoxingDragonName00021",null,"326268",true],[31,"BoxingDragonName00022",null,"BoxingDragonName00022",null,"326279",true],[32,"BoxingDragonName00016",null,"BoxingDragonName00016",null,"326242",true],[33,"BoxingDragonName00017",null,"BoxingDragonName00017",null,"326277",true],[34,"BoxingDragonName00018",null,"BoxingDragonName00018",null,"326275",true],[35,"BoxingDragonName00019",null,"BoxingDragonName00019",null,"326265",true],[36,"BoxingDragonName00020",null,"BoxingDragonName00020",null,"326239",true],[37,"BoxingDragonName00036",null,"BoxingDragonName00036",null,"326274",true],[38,"BoxingDragonName00037",null,"BoxingDragonName00037",null,"326260",true],[39,"BoxingDragonName00011",null,"BoxingDragonName00011",null,"326255",true],[40,"BoxingDragonName00012",null,"BoxingDragonName00012",null,"326259",true],[41,"BoxingDragonName00013",null,"BoxingDragonName00013",null,"326273",true],[42,"BoxingDragonName00014",null,"BoxingDragonName00014",null,"326278",true],[43,"BoxingDragonName00015",null,"BoxingDragonName00015",null,"326257",true],[44,"BoxingDragonName00031",null,"BoxingDragonName00031",null,"326266",true],[45,"BoxingDragonName00032",null,"BoxingDragonName00032",null,"326256",true],[46,"HomeResourcesName0001",null,"HomeResourcesDesc0001",null,"222920",false],[47,"HomeResourcesName0002",null,"HomeResourcesDesc0002",null,"222920",false],[48,"HomeResourcesName0003",null,"HomeResourcesDesc0003",null,"222920",false],[49,"HomeResourcesName0004",null,"HomeResourcesDesc0004",null,"222920",false]];
export interface IBagItemElement extends IElementBase{
 	/**背包物品 ID*/
	id:number
	/**名称*/
	name:string
	/**VIEW_ONLY 不要更改或使用此列*/
	name_trs:string
	/**描述*/
	desc:string
	/**VIEW_ONLY 不要更改或使用此列*/
	desc_trs:string
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