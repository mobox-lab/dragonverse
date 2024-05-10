import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","areaName","bgmId","bornPoint","fogId","skyBoxId","light","changeTime","changeCount","rotation"],["","Language","","","","","","","",""],[1,"battal_world_nameLV_20",34,new mw.Vector(231146,18953,3034),4,0,1,0,0,new mw.Vector(0,0,70)],[2,"battal_world_nameLV_21",31,new mw.Vector(212355,18550.12,2758.65),1,0,1,0,0,null]];
export interface IAreaElement extends IElementBase{
 	/**id*/
	id:number
	/**区域名字*/
	areaName:string
	/**背景音乐
音效表*/
	bgmId:number
	/**出生点*/
	bornPoint:mw.Vector
	/**区域雾id
不填代表没有雾*/
	fogId:number
	/**天空盒Id
不填默认为-1*/
	skyBoxId:number
	/**光照ID
不填默认为-1*/
	light:number
	/**修改时间(s)*/
	changeTime:number
	/**修改频率(次数/s)*/
	changeCount:number
	/**出生点相对旋转*/
	rotation:mw.Vector
 } 
export class AreaConfig extends ConfigBase<IAreaElement>{
	constructor(){
		super(EXCELDATA);
	}

}