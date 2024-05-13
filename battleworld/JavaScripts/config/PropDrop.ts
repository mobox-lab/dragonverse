import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Discribe","dropType","dropGuid","rewardFly","upTime","rewardMove","rewardOffsetZ","fallTime","overTime","extend"],["","","","","","","","","","",""],[1,"金币",3,"5BA0F2F74122E218BA6564B648CF5704",200,0.5,200,20,0.8,10,"{\"value\":100}"],[2,"技能球",1,"147DCB9A4B7FDB75926F50B33104E415",200,0.5,200,20,0.8,10,null],[3,"血瓶",2,"7AB4F8694A94CEFB2FA21989A0E3E3D2",200,0.5,200,20,0.8,10,"{\"value\":10}"],[4,"化形丹",5,"888F269A495A38DFBB5D94BF9F5BEBE2",200,0.5,200,20,0.8,10,null],[5,"初阶-养气丹",4,"9C82E15B4D7AC08F2AE87690A4A738A5",200,0.5,200,20,0.8,10,"{\"attributeID\":107,\"attributeValue\":100,\"duration\":150}"],[6,"初阶-生骨丹",4,"77B3466B4299EEB7FAB627A6E8B7AA5E",200,0.5,200,20,0.8,10,"{\"attributeID\":102,\"attributeValue\":100,\"duration\":150}"],[7,"初阶-龙鳞丹",4,"986105E84C483273F2A5E09ACDF2FA41",200,0.5,200,20,0.8,10,"{\"attributeID\":104,\"attributeValue\":10,\"duration\":150}"],[8,"初阶-龟甲丹",4,"A97431DE41AFDD8113C9B4BE2245036F",200,0.5,200,20,0.8,10,"{\"attributeID\":203,\"attributeValue\":5,\"duration\":150}"],[9,"化形丹·鸣人",5,"54E92DF14E6C1AA4550A80BFDD63666F",200,0.5,200,20,0.8,10,null],[10,"化形丹·路飞",5,"86C7FA9D431FF7D2A1D539BD96154B22",200,0.5,200,20,0.8,10,null],[11,"化形丹·蛋仔",5,"501DEBDD4B19EBAE54DF18BB6D31CEAA",200,0.5,200,20,0.8,10,null],[12,"化形丹·索隆",5,"C25762B8499159FBFE32B2BE7E5B4E7D",200,0.5,200,20,0.8,10,null],[13,"化形丹·樱校女",5,"29C967E94618A6CA4D8F1899A4F80C3A",200,0.5,200,20,0.8,10,null],[14,"化形丹·卡卡西",5,"1EA5D94C4B050095070661BBDD6F38D0",200,0.5,200,20,0.8,10,null],[15,"化形丹·樱校男",5,"341EEB6A41FA27832FA1E6B84090417C",200,0.5,200,20,0.8,10,null]];
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
	/**扩展字段(用来存属性值)*/
	extend:string
 } 
export class PropDropConfig extends ConfigBase<IPropDropElement>{
	constructor(){
		super(EXCELDATA);
	}

}