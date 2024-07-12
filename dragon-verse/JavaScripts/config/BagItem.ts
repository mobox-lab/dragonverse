import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","desc","desc_trs","icon","achievable","category_id"],["","Language","","Language","","","",""],[1,"BagItemName0001",null,"BagItemDesc0001",null,"267113",true,0],[2,"BagItemName0002",null,"BagItemDesc0002",null,"267114",false,0],[3,"BagItemName0003",null,"BagItemDesc0003",null,"267112",true,0],[4,"BoxingDragonName00041",null,"BoxingDragonDescribe00041",null,"326248",true,5],[5,"BoxingDragonName00042",null,"BoxingDragonDescribe00042",null,"381551",true,5],[6,"BoxingDragonName00043",null,"BoxingDragonDescribe00043",null,"381547",true,5],[7,"BoxingDragonName00044",null,"BoxingDragonDescribe00044",null,"326267",true,5],[8,"BoxingDragonName00045",null,"BoxingDragonDescribe00045",null,"326252",true,5],[9,"BoxingDragonName00051",null,"BoxingDragonDescribe00051",null,"381596",true,5],[10,"BoxingDragonName00052",null,"BoxingDragonDescribe00052",null,"326271",true,5],[11,"BoxingDragonName00046",null,"BoxingDragonDescribe00046",null,"326237",true,6],[12,"BoxingDragonName00047",null,"BoxingDragonDescribe00047",null,"326236",true,6],[13,"BoxingDragonName00048",null,"BoxingDragonDescribe00048",null,"326240",true,6],[14,"BoxingDragonName00049",null,"BoxingDragonDescribe00049",null,"326246",true,6],[15,"BoxingDragonName00050",null,"BoxingDragonDescribe00050",null,"381549",true,6],[16,"BoxingDragonName00053",null,"BoxingDragonDescribe00053",null,"326253",true,6],[17,"BoxingDragonName00054",null,"BoxingDragonDescribe00054",null,"326244",true,6],[18,"BoxingDragonName00006",null,"BoxingDragonDescribe00006",null,"326261",true,2],[19,"BoxingDragonName00007",null,"BoxingDragonDescribe00007",null,"381550",true,2],[20,"BoxingDragonName00008",null,"BoxingDragonDescribe00008",null,"326264",true,2],[21,"BoxingDragonName00009",null,"BoxingDragonDescribe00009",null,"326263",true,2],[22,"BoxingDragonName00010",null,"BoxingDragonDescribe00010",null,"326270",true,2],[23,"BoxingDragonName00026",null,"BoxingDragonDescribe00026",null,"326269",true,2],[24,"BoxingDragonName00027",null,"BoxingDragonDescribe00027",null,"326258",true,2],[25,"BoxingDragonName00001",null,"BoxingDragonDescribe00001",null,"326243",true,1],[26,"BoxingDragonName00002",null,"BoxingDragonDescribe00002",null,"326250",true,1],[27,"BoxingDragonName00003",null,"BoxingDragonDescribe00003",null,"381552",true,1],[28,"BoxingDragonName00004",null,"BoxingDragonDescribe00004",null,"381602",true,1],[29,"BoxingDragonName00005",null,"BoxingDragonDescribe00005",null,"326276",true,1],[30,"BoxingDragonName00021",null,"BoxingDragonDescribe00021",null,"326268",true,1],[31,"BoxingDragonName00022",null,"BoxingDragonDescribe00022",null,"381600",true,1],[32,"BoxingDragonName00016",null,"BoxingDragonDescribe00016",null,"326242",true,4],[33,"BoxingDragonName00017",null,"BoxingDragonDescribe00017",null,"326277",true,4],[34,"BoxingDragonName00018",null,"BoxingDragonDescribe00018",null,"326275",true,4],[35,"BoxingDragonName00019",null,"BoxingDragonDescribe00019",null,"326265",true,4],[36,"BoxingDragonName00020",null,"BoxingDragonDescribe00020",null,"326239",true,4],[37,"BoxingDragonName00036",null,"BoxingDragonDescribe00036",null,"326274",true,4],[38,"BoxingDragonName00037",null,"BoxingDragonDescribe00037",null,"326260",true,4],[39,"BoxingDragonName00011",null,"BoxingDragonDescribe00011",null,"326255",true,3],[40,"BoxingDragonName00012",null,"BoxingDragonDescribe00012",null,"326259",true,3],[41,"BoxingDragonName00013",null,"BoxingDragonDescribe00013",null,"326273",true,3],[42,"BoxingDragonName00014",null,"BoxingDragonDescribe00014",null,"326278",true,3],[43,"BoxingDragonName00015",null,"BoxingDragonDescribe00015",null,"326257",true,3],[44,"BoxingDragonName00031",null,"BoxingDragonDescribe00031",null,"381553",true,3],[45,"BoxingDragonName00032",null,"BoxingDragonDescribe00032",null,"381597",true,3],[46,"HomeResourcesName0001",null,"HomeResourcesDesc0001",null,"222920",false,0],[47,"HomeResourcesName0002",null,"HomeResourcesDesc0002",null,"222920",false,0],[48,"HomeResourcesName0003",null,"HomeResourcesDesc0003",null,"222920",false,0],[49,"HomeResourcesName0004",null,"HomeResourcesDesc0004",null,"222920",false,0]];
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
	/**归属分类id（龙娘）*/
	category_id:number
 } 
export class BagItemConfig extends ConfigBase<IBagItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}