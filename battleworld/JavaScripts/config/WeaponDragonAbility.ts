import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonAbilityRange","addWeapon"],["","",""],[1,[0,100],[1]],[2,[101,300],[1,2]],[3,[301,1000],[1,2,3]],[4,[1001,10000],[1,2,3,4]]];
export interface IWeaponDragonAbilityElement extends IElementBase{
 	/**id*/
	id:number
	/**龙的能力值区间 */
	dragonAbilityRange:Array<number>
	/**武器类型*/
	addWeapon:Array<number>
 } 
export class WeaponDragonAbilityConfig extends ConfigBase<IWeaponDragonAbilityElement>{
	constructor(){
		super(EXCELDATA);
	}

}