import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name1","weaponId","triggerGuid","worldUIGuid","sellValue"],["","","","","",""],[1,"近战单手剑",2,"17BEFE91","307BEDEB",20000],[2,"法杖",3,"1F58D9F4","0692B870",10000],[3,"双手剑",4,"2E8BD119","1EA81627",30000]];
export interface IWeaponTriggerElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**武器名称(便于查看)*/
	name1:string
	/**武器表id*/
	weaponId:number
	/**触发器guid*/
	triggerGuid:string
	/**世界UIguid*/
	worldUIGuid:string
	/**售价*/
	sellValue:number
 } 
export class WeaponTriggerConfig extends ConfigBase<IWeaponTriggerElement>{
	constructor(){
		super(EXCELDATA);
	}

}