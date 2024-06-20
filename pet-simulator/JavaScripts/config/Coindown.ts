import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Type","Guid","Lowattacknum","Stepcoin","Stepdiamond","Lastcoin","Lastdaimond","Crittimes","Stagetimes"],["","","","","","","","","",""],[1,"金币1","3F10ABA143FC447D1EC1729EE0238AD6",[1,4],4,1,6,2,3,[2,2,4,6]],[2,"金币2","AAF7ECC4440E12FE2E30AAAD58B258DF",[1,4],8,1,12,2,3,[2,2,4,6]],[3,"金币3","E74C3CC24DA907D83DF3AB8A334C09E8",[1,5],12,1,18,3,3,[2,2,4,6]],[4,"金币4","24F08A574508F4D50C97EA83B234DAB5",[1,6],16,2,24,3,3,[2,2,4,6]],[5,"金币5","268AA763416DC6CFEE317BBAE429E557",[1,8],20,2,30,4,3,[2,2,4,6]],[6,"金币6","1FCF576C4A5031D9B3E87BA9D1C7A04A",[1,8],24,2,36,4,3,[2,2,4,6]],[7,"钻石1","0C2C570D439F4767365DBBB58259EBC2",[1,2],0,6,0,16,3,[2,2,4,6]],[8,"钻石2","ECB8E3804E2C034AA74B47AE8FC2540D",[1,3],0,12,0,18,3,[2,2,4,6]],[9,"宝箱","431D0ED6457125E9D16182B0392745CD",[1,8],0,0,40,4,2,[1,1,1,1]]];
export interface ICoindownElement extends IElementBase{
 	/**ID*/
	ID:number
	/**破坏物属性*/
	Type:string
	/**预制体id*/
	Guid:string
	/**刮痧数量（随机数范围）*/
	Lowattacknum:Array<number>
	/**每到三分之一金币数量*/
	Stepcoin:number
	/**每到三分之一钻石数量*/
	Stepdiamond:number
	/**破坏时金币数量*/
	Lastcoin:number
	/**破坏时钻石数量*/
	Lastdaimond:number
	/**破坏时暴击倍率（最后阶段*倍率）*/
	Crittimes:number
	/**阶段倍率（每阶段都加倍）（3/5/25/100）*/
	Stagetimes:Array<number>
 } 
export class CoindownConfig extends ConfigBase<ICoindownElement>{
	constructor(){
		super(EXCELDATA);
	}

}