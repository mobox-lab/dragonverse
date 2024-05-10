import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","RewardName","Time","PicICON","RewardArr","buff","buffTime"],["","","","","","",""],[1,"礼包1",300,174803,[500,100,0,0],[0],[300,600]],[2,"礼包2",600,174803,[1000,200,0,0],[0],[300,600]],[3,"礼包3",900,174824,[3000,300,0,0],[0],[300,300]],[4,"礼包4",1800,174824,[6000,500,0,0],[0],[600]],[5,"礼包5",3600,174824,[10000,600,0,0],[0],[600]],[6,"礼包6",7200,174837,[15000,1000,0,0],[0],[600]],[7,"礼包7",10800,174837,[20000,1500,0,0],[0],[600]],[8,"礼包8",18000,174837,[30000,2000,0,0],[0],[600]],[9,"礼包9",28800,174804,[40000,2500,0,0],[0],[600]],[10,"礼包10",43200,174804,[50000,3000,0,0],[0],[600]],[11,"礼包11",61200,174804,[50000,4000,0,0],[0],[600]],[12,"礼包12",86400,174804,[50000,5000,0,0],[0],[600]]];
export interface ITimeRewardElement extends IElementBase{
 	/**ID*/
	id:number
	/**奖励描述*/
	RewardName:string
	/**需要在线时间/s*/
	Time:number
	/**礼包图标*/
	PicICON:number
	/**奖励值
【金币*/
	RewardArr:Array<number>
	/**钻石，宠物id*/
	buff:Array<number>
	/**活动代币】*/
	buffTime:Array<number>
 } 
export class TimeRewardConfig extends ConfigBase<ITimeRewardElement>{
	constructor(){
		super(EXCELDATA);
	}

}