import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","key","gameId","gameIdGPark","name","maxNum"],["","","","","","Language",""],[1,"大厅","Hall","P_d288b58efdfcc12558ad19601647a6ab87d0e305","P_855fd66ecf725a5f9436f48cb61b82f591551ef1","大厅",5],[2,"学校","School","P_abdcacf4c8596dce5366b37b98ce85480b949c92","P_de18c334404201e856f4fb5f6c2341930bd5a0bb","鬼校",5],[3,"医院","Hospital","P_af43d40d4c839e12abb7266888584980c6e64cc1","P_2e8aaa759338543c856f951601e317c439408c89","疯人院",5],[4,"孤岛","Graveyard","P_66106133d124d4c838915bc832ed62d30406a217","P_5aa35a8e3b72474228a30ce4a92a7be6241d1bc2","惊魂岛",5],[5,"小镇","Town","P_a900c29788f522cc4d6cd2a9698a637407de6077","P_2c8794ada5dc8cc7c7f3e81f69dedb5a29ebe9e7","丧尸小镇",5]];
export interface IGameThemeElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	desc:string
	/**undefined*/
	key:string
	/**游戏id*/
	gameId:string
	/**海外游戏id*/
	gameIdGPark:string
	/**名字*/
	name:string
	/**最大匹配人数*/
	maxNum:number
 } 
export class GameThemeConfig extends ConfigBase<IGameThemeElement>{
	constructor(){
		super(EXCELDATA);
	}

}