import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","checkpointloc"],["",""],[1,[392379.56,13370.56,24797.14]],[2,[397763.56,13370.56,24797.15]],[3,[403052.56,13440.56,24797.14]],[4,[403052.56,8170.56,24797.14]],[5,[403052.56,2385.56,24797.14]],[6,[403052.56,-2048.44,24797.14]],[7,[397615.56,-2031.44,24797.14]],[8,[391056.56,-1271.44,24797.14]],[9,[391332.56,4027.56,24797.14]],[10,[391332.56,6633.56,24797.14]],[11,[391436.56,9573.56,24797.14]]];
export interface IObbycheckElement extends IElementBase{
 	/**id*/
	id:number
	/**检查点世界坐标*/
	checkpointloc:Array<number>
 } 
export class ObbycheckConfig extends ConfigBase<IObbycheckElement>{
	constructor(){
		super(EXCELDATA);
	}

}