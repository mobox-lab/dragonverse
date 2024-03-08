import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","type","endPos","endRot","useTime","useSound","useEff","dataEx"],["","","","","","","",""],[1,1,new mw.Vector(80,20,-50),new mw.Vector(-10,-70,0),100,1009,"89104",["20"]]];
export interface ISpecialItemElement extends IElementBase{
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
export class SpecialItemConfig extends ConfigBase<ISpecialItemElement>{
	constructor(){
		super(EXCELDATA);
	}

}