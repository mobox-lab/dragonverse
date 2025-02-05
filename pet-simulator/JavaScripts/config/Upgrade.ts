import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","ICONguid","Diamond","Upgradenum","PetNum"],["","Language","","","",""],[1,"Page_Title_4",179495,[1250,3500,6750,13500,20000],[1.3,1.8,2.2,2.6,3],[0]],[2,"Page_Title_5",179496,[1000,3000,15000,80000,200000],[0.1,0.2,0.3,0.4,0.5],[0]],[3,"Page_Title_6",179492,[1000,3000,15000,80000,200000],[0.2,0.4,0.6,0.8,1],[0]],[4,"Page_Title_7",179491,[1250,2500,7000,15000,30000],[0.5,0.9,1.2,1.5,1.8],[0]],[5,"Page_Title_8",179497,[10000,40000,200000,1000000,5000000],[0],[5,5,10,20,30]]];
export interface IUpgradeElement extends IElementBase{
 	/**id*/
	id:number
	/**名字*/
	name:string
	/**guid*/
	ICONguid:number
	/**各等级消耗钻石*/
	Diamond:Array<number>
	/**各等级百分比增值*/
	Upgradenum:Array<number>
	/**宠物背包增加数量*/
	PetNum:Array<number>
 } 
export class UpgradeConfig extends ConfigBase<IUpgradeElement>{
	constructor(){
		super(EXCELDATA);
	}

}