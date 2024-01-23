import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","des","rankName","integral","rankIntegral","shopId","rankImgID","rankTicket","notice"],["","","Language","","","","","",""],[1,"青铜 - Bronze","Rank_name_1",0,[13,18,20,23,25,28,30],0,"153709",0,0],[2,"白银 - Silver","Rank_name_2",100,[11,15,18,20,23,25,28],0,"153672",0,0],[3,"黄金 - Gold","Rank_name_3",300,[7,9,10,12,15,18,20],4001,"153707",0,0],[4,"铂金 - Platinum","Rank_name_4",1000,[4,6,9,10,12,15,18],4002,"153667",0,0],[5,"钻石 - Diamond","Rank_name_5",2000,[0,4,6,9,10,12,15],4003,"153666",1,1],[6,"无双 - Immortal","Rank_name_6",3500,[0,2,4,7,9,10,12],4004,"153702",3,1],[7,"王者 - King","Rank_name_7",6000,[0,1,3,5,7,9,10],4005,"225466",5,1]];
export interface IRankElement extends IElementBase{
 	/**唯一ID*/
	id:number
	/**段位（策划看）*/
	des:string
	/**段位名称*/
	rankName:string
	/**所需积分*/
	integral:number
	/**（被）击败不同段位（丢）得分
练气|筑基|金丹|元婴|化神|炼虚|合体*/
	rankIntegral:Array<number>
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