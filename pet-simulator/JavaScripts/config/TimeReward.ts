import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","RewardName","Time","PicICON","RewardArr","buff","buffTime"],["","","","","","",""],[1,"礼包1",60,174803,[5000,2000,0,0],[0],[300,600]],[2,"礼包2",180,174803,[5500,2200,0,0],[0],[300,600]],[3,"礼包3",360,174824,[6000,2400,0,0],[0],[300,300]],[4,"礼包4",540,174824,[7000,3000,0,0],[0],[600]]];
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