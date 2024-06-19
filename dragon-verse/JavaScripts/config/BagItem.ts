import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name_trs","desc","desc_trs","icon","achievable","category_id"],["","Language","","Language","","","",""],[1,"BagItemName0001","蓝色飞贼","BagItemDesc0001","按下开关便可以捕捉Dragon，并封装在内的位面球。","267113",true,0],[2,"BagItemName0002","火龙果","BagItemDesc0002","果肉细腻无核，汁水丰盈，是野生Dragon最喜爱的果实之一。","267114",false,0],[3,"BagItemName0003","金币","BagItemDesc0003","从遥远的星空落下的神奇货币，看起来是很贵重的物品。","267112",true,0],[4,"BoxingDragonName00041","光·晚霞","BoxingDragonName00041","光·晚霞","326248",true,5],[5,"BoxingDragonName00042","光·日曦","BoxingDragonName00042","光·日曦","326241",true,5],[6,"BoxingDragonName00043","光·云舞","BoxingDragonName00043","光·云舞","326262",true,5],[7,"BoxingDragonName00044","光·朝辉","BoxingDragonName00044","光·朝辉","326267",true,5],[8,"BoxingDragonName00045","光·明影","BoxingDragonName00045","光·明影","326252",true,5],[9,"BoxingDragonName00051","光·云露","BoxingDragonName00051","光·云露","326251",true,5],[10,"BoxingDragonName00052","光·破晓","BoxingDragonName00052","光·破晓","326271",true,5],[11,"BoxingDragonName00046","暗·魄刃","BoxingDragonName00046","暗·魄刃","326237",true,6],[12,"BoxingDragonName00047","暗·雪影","BoxingDragonName00047","暗·雪影","326236",true,6],[13,"BoxingDragonName00048","暗·夜薇","BoxingDragonName00048","暗·夜薇","326240",true,6],[14,"BoxingDragonName00049","暗·幽风","BoxingDragonName00049","暗·幽风","326246",true,6],[15,"BoxingDragonName00050","暗·冥月","BoxingDragonName00050","暗·冥月","326245",true,6],[16,"BoxingDragonName00053","暗·影莲","BoxingDragonName00053","暗·影莲","326253",true,6],[17,"BoxingDragonName00054","暗·墨翎","BoxingDragonName00054","暗·墨翎","326244",true,6],[18,"BoxingDragonName00006","水·蓝波","BoxingDragonName00006","水·蓝波","326261",true,2],[19,"BoxingDragonName00007","水·冰雪","BoxingDragonName00007","水·冰雪","326272",true,2],[20,"BoxingDragonName00008","水·涟漪","BoxingDragonName00008","水·涟漪","326264",true,2],[21,"BoxingDragonName00009","水·海影","BoxingDragonName00009","水·海影","326263",true,2],[22,"BoxingDragonName00010","水·冰妃","BoxingDragonName00010","水·冰妃","326270",true,2],[23,"BoxingDragonName00026","水·清泉","BoxingDragonName00026","水·清泉","326269",true,2],[24,"BoxingDragonName00027","水·蓝钰","BoxingDragonName00027","水·蓝钰","326258",true,2],[25,"BoxingDragonName00001","火·烬舞","BoxingDragonName00001","火·烬舞","326243",true,1],[26,"BoxingDragonName00002","火·熔光","BoxingDragonName00002","火·熔光","326250",true,1],[27,"BoxingDragonName00003","火·炽影","BoxingDragonName00003","火·炽影","326249",true,1],[28,"BoxingDragonName00004","火·摇曳","BoxingDragonName00004","火·摇曳","326238",true,1],[29,"BoxingDragonName00005","火·笙桦","BoxingDragonName00005","火·笙桦","326276",true,1],[30,"BoxingDragonName00021","火·焚花","BoxingDragonName00021","火·焚花","326268",true,1],[31,"BoxingDragonName00022","火·赤翼","BoxingDragonName00022","火·赤翼","326279",true,1],[32,"BoxingDragonName00016","土·沧峰","BoxingDragonName00016","土·沧峰","326242",true,4],[33,"BoxingDragonName00017","土·翠谷","BoxingDragonName00017","土·翠谷","326277",true,4],[34,"BoxingDragonName00018","土·黄域","BoxingDragonName00018","土·黄域","326275",true,4],[35,"BoxingDragonName00019","土·绿枝","BoxingDragonName00019","土·绿枝","326265",true,4],[36,"BoxingDragonName00020","土·岩坡","BoxingDragonName00020","土·岩坡","326239",true,4],[37,"BoxingDragonName00036","土·花翼","BoxingDragonName00036","土·花翼","326274",true,4],[38,"BoxingDragonName00037","土·青峦","BoxingDragonName00037","土·青峦","326260",true,4],[39,"BoxingDragonName00011","木·樱林","BoxingDragonName00011","木·樱林","326255",true,3],[40,"BoxingDragonName00012","木·翠影","BoxingDragonName00012","木·翠影","326259",true,3],[41,"BoxingDragonName00013","木·梧韵","BoxingDragonName00013","木·梧韵","326273",true,3],[42,"BoxingDragonName00014","木·茶枝","BoxingDragonName00014","木·茶枝","326278",true,3],[43,"BoxingDragonName00015","木·桃语","BoxingDragonName00015","木·桃语","326257",true,3],[44,"BoxingDragonName00031","木·竹风","BoxingDragonName00031","木·竹风","326266",true,3],[45,"BoxingDragonName00032","木·松雨","BoxingDragonName00032","木·松雨","326256",true,3],[46,"HomeResourcesName0001","木头","HomeResourcesDesc0001","可以在家园玩法中消耗，用于建造家园","222920",false,0],[47,"HomeResourcesName0002","石头","HomeResourcesDesc0002","可以在家园玩法中消耗，用于建造家园","222920",false,0],[48,"HomeResourcesName0003","黑铁","HomeResourcesDesc0003","可以在家园玩法中消耗，用于建造家园","222920",false,0],[49,"HomeResourcesName0004","黄铜","HomeResourcesDesc0004","可以在家园玩法中消耗，用于建造家园","222920",false,0]];
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