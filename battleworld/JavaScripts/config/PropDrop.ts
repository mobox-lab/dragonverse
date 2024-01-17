import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Discribe","dropType","dropGuid","rewardFly","upTime","rewardMove","rewardOffsetZ","fallTime","overTime"],["","","","","","","","","",""],[1,"金币",3,"5BA0F2F74122E218BA6564B648CF5704",200,0.5,200,20,0.8,10],[2,"技能球",1,"147DCB9A4B7FDB75926F50B33104E415",200,0.5,200,20,0.8,10],[3,"血瓶",2,"7AB4F8694A94CEFB2FA21989A0E3E3D2",200,0.5,200,20,0.8,10],[4,"化形丹",5,"8315C75149E8E4B5DE2E38ACADDC1967",200,0.5,200,20,0.8,10],[5,"初阶-养气丹",4,"9C82E15B4D7AC08F2AE87690A4A738A5",200,0.5,200,20,0.8,10],[6,"初阶-生骨丹",4,"77B3466B4299EEB7FAB627A6E8B7AA5E",200,0.5,200,20,0.8,10],[7,"初阶-龙鳞丹",4,"986105E84C483273F2A5E09ACDF2FA41",200,0.5,200,20,0.8,10],[8,"初阶-龟甲丹",4,"A97431DE41AFDD8113C9B4BE2245036F",200,0.5,200,20,0.8,10]];
export interface IPropDropElement extends IElementBase{
 	/**id*/
	id:number
	/**描述*/
	Discribe:string
	/**1技能 2血瓶 3金币 4丹药 5化形丹*/
	dropType:number
	/**掉落预制体guid*/
	dropGuid:string
	/**奖励飞行最大高度相对*/
	rewardFly:number
	/**上升时间秒*/
	upTime:number
	/**奖励移动最大距离相对*/
	rewardMove:number
	/**奖励落地相对高度相对
*/
	rewardOffsetZ:number
	/**下落时间*/
	fallTime:number
	/**掉落物销毁时间(0代表不消失 秒)*/
	overTime:number
 } 
export class PropDropConfig extends ConfigBase<IPropDropElement>{
	constructor(){
		super(EXCELDATA);
	}

}