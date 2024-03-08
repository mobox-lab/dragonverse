import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","type","endPos","endRot","useTime","useSound","useEff","dataEx"],["","","","","","","",""],[1,1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["20"]],[2,1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["30"]],[3,1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["50"]],[4,1,new mw.Vector(25,10,-10),new mw.Vector(10,70,20),500,1011,"89102",["100"]]];
export interface ITransItemElement extends IElementBase{
 	/**id*/
	id:number
	/**类型（1.回血）*/
	type:number
	/**相对镜头终点位置可配置多段连击*/
	endPos:mw.Vector
	/**相对镜头终点旋转可配置多段连击*/
	endRot:mw.Vector
	/**使用时长*/
	useTime:number
	/**使用音效，关联音效表*/
	useSound:number
	/**使用特效*/
	useEff:string
	/**额外数据*/
	dataEx:Array<string>
 } 
export class TransItemConfig extends ConfigBase<ITransItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}