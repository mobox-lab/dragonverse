import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","RewardName","Time","PicICON","RewardArr","buff","buffTime"],["","","","","","",""],[1,"礼包1",180,174803,[100,2000,0,0],[0],[300,600]],[2,"礼包2",480,174803,[0,5000,0,0],[0],[300,600]],[3,"礼包3",900,174824,[0,10000,0,0],[0],[300,300]],[4,"礼包4",1200,174824,[0,10000,0,0],[0],[600]],[5,"礼包5",1800,174824,[100000,0,0,0],[0],[600]],[6,"礼包6",2400,174837,[100000,0,0,0],[0],[600]],[7,"礼包7",3000,174837,[0,10000,0,0],[0],[600]],[8,"礼包8",3600,174837,[0,20000,0,0],[0],[600]],[9,"礼包9",4500,174804,[0,20000,0,0],[0],[600]],[10,"礼包10",5400,174804,[0,40000,0,0],[0],[600]],[11,"礼包11",7200,174804,[0,40000,0,0],[0],[600]],[12,"礼包12",10800,174804,[0,60000,0,0],[0],[600]]];
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