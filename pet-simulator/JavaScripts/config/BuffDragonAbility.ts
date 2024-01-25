import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","dragonAbilityRange","addBuff"],["","",""],[1,[0,100],[0]],[2,[101,300],[1,5]],[3,[301,1000],[2,6]],[4,[1001,10000],[3,7]],[5,[10001,99999],[4,8]]];
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