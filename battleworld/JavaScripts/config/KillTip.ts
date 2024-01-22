import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","tip","hudTip","soundId"],["","","Language","Language",""],[2,"玩家A达成二连胜","KillTip_1",null,35],[3,"【玩家A】达成三连胜","KillTip_2","KillTip_5",36],[5,"【玩家A】已经统治战场","KillTip_3","KillTip_6",37],[8,"【玩家A】已经超神","KillTip_4","KillTip_7",38]];
export interface IKillTipElement extends IElementBase{
 	/**id(唯一id 可以认为击杀人数)*/
	id:number
	/**注释参考*/
	desc:string
	/**多语言提示*/
	tip:string
	/**头顶UI提示*/
	hudTip:string
	/**击杀音效*/
	soundId:number
 } 
export class KillTipConfig extends ConfigBase<IKillTipElement>{
	constructor(){
		super(EXCELDATA);
	}

}