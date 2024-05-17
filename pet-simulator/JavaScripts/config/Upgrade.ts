import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","ICONguid","Diamond","Upgradenum","PetNum"],["","Language","","","",""],[1,"Page_Title_4",179495,[1250,35000,6750,13500,20000],[1.3,1.8,2.2,2.6,3],0],[2,"Page_Title_5",179496,[2500,10000,30000,80000,150000],[1,1.3,1.8,2.3,2.5],0],[3,"Page_Title_6",179492,[1750,5000,13300,40000,100000],[0.5,0.9,1.2,1.5,1.8],0],[4,"Page_Title_7",179491,[1250,2500,7000,15000,30000],[0.5,0.9,1.2,1.5,1.8],0],[5,"Page_Title_8",179497,[3000,5000,7000,11000,15000],[0],5]];
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
	PetNum:number
 } 
export class UpgradeConfig extends ConfigBase<IUpgradeElement>{
	constructor(){
		super(EXCELDATA);
	}

}