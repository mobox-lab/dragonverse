import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Coinnum_1","DMnum","PassNum","Coinnum_2"],["","","","",""],[1,500,200,1,5000],[2,2000,1000,6,20000],[3,10000,3000,12,50000],[4,40000,7000,18,100000],[5,100000,13000,36,300000],[6,300000,20000,54,800000],[7,800000,26000,72,1200000],[8,1200000,40000,90,3000000],[9,4000000,70000,108,5000000],[10,10000000,100000,126,8000000],[11,25000000,300000,144,10000000],[12,50000000,600000,180,40000000],[13,100000000,1000000,216,80000000],[14,150000000,3000000,234,150000000],[15,300000000,5000000,240,300000000]];
export interface IGradientElement extends IElementBase{
 	/**梯度阶段*/
	id:number
	/**第一世界金币货币梯度*/
	Coinnum_1:number
	/**钻石货币*/
	DMnum:number
	/**通行证星星数*/
	PassNum:number
	/**第二世界金币货币梯度*/
	Coinnum_2:number
 } 
export class GradientConfig extends ConfigBase<IGradientElement>{
	constructor(){
		super(EXCELDATA);
	}

}