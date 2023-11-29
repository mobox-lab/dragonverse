import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA: Array<Array<any>> = [["id", "bagId", "avatar", "elementalId", "qualityId", "generationAreaId", "existenceTime", "generationInterval", "hitPoint", "cost", "successRateAlgoId"], ["", "", "", "", "", "", "", "", "", "", ""], [1, 1, "B88E6FED4EFDC43887594596D9C6EC25", 1, 1, [0, 0], 300, 80, 10, 1, 0]];
export interface IDragonElement extends IElementBase {
	/**龙 ID*/
	id: number
	/**背包物 ID*/
	bagId: number
	/**形象*/
	avatar: string
	/**元素 ID*/
	elementalId: number
	/**品质 ID*/
	qualityId: number
	/**生成区域 ID*/
	generationAreaId: Array<number>
	/**存在时间*/
	existenceTime: number
	/**生成间隔*/
	generationInterval: number
	/**可捕捉次数*/
	hitPoint: number
	/**捕捉消耗*/
	cost: number
	/**捕捉成功率算法*/
	successRateAlgoId: number
}
export class DragonConfig extends ConfigBase<IDragonElement>{
	constructor() {
		super(EXCELDATA);
	}

}