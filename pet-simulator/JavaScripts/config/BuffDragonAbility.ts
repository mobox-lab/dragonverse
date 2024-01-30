import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonAbilityRange","addBuff"],["","",""],[1,[101,400],[1]],[2,[401,1000],[1,6]],[3,[1001,10000],[2,6]],[4,[10001,9999999],[2,7]]];
export interface IBuffDragonAbilityElement extends IElementBase{
 	/**id*/
	id:number
	/**龙的能力值区间 */
	dragonAbilityRange:Array<number>
	/**BUFF类型*/
	addBuff:Array<number>
 } 
export class BuffDragonAbilityConfig extends ConfigBase<IBuffDragonAbilityElement>{
	constructor(){
		super(EXCELDATA);
	}

}