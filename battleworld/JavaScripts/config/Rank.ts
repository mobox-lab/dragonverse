import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","des","rankName","integral","rankIntegral","rankIntegralReduce","shopId","rankImgID","rankTicket","notice"],["","","Language","","","","","","",""],[1,"青铜 - Bronze","Rank_name_1",0,[13,18,20,23,25,28,30],[0,0,0,0,0,0,0],0,"296288",0,0],[2,"白银 - Silver","Rank_name_2",200,[11,15,18,20,23,25,28],[0,0,0,0,0,0,0],0,"296289",0,0],[3,"黄金 - Gold","Rank_name_3",500,[7,9,10,12,15,18,20],[20,18,10,9,6,4,2],4001,"296292",0,0],[4,"铂金 - Platinum","Rank_name_4",1000,[4,6,9,10,12,15,18],[23,20,12,10,9,6,4],4002,"296285",0,0],[5,"钻石 - Diamond","Rank_name_5",2000,[0,4,6,9,10,12,15],[25,23,15,12,10,8,5],4003,"296281",0,0]];
export interface IRankElement extends IElementBase{
 	/**唯一ID*/
	id:number
	/**段位（策划看）*/
	des:string
	/**段位名称*/
	rankName:string
	/**所需积分*/
	integral:number
	/**击败不同段位得分
练气|筑基|金丹|元婴|化神|炼虚|合体*/
	rankIntegral:Array<number>
	/**被不同段位击败丢分
练气|筑基|金丹|元婴|化神|炼虚|合体*/
	rankIntegralReduce:Array<number>
	/**段位奖励商店ID
（不填无奖励）*/
	shopId:number
	/**段位图标*/
	rankImgID:string
	/**门票费用
填0不弹二次确认框*/
	rankTicket:number
	/**进入游戏是否公示0否，1是*/
	notice:number
 } 
export class RankConfig extends ConfigBase<IRankElement>{
	constructor(){
		super(EXCELDATA);
	}

}