import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Appearance","InterTime","CreateNum","MaxNum","CreaEff","DisEff","WayRange","CheckRange","EscapeRange","EscapeTime","OutTime","Hp","DefaultSpeed","EscapeSpeed","Resistance","DropHp","DropId"],["","Language","","","","","","","","","","","","","","","","",""],[1,"Name_Npc_Masco_1","4428115846600B6C74DFB284369BAB00",25,1,1,[21],[22],5000,100,3000,5,2,2000,200,700,100,500,3]];
export interface IMascotNpcElement extends IElementBase{
 	/**类型id*/
	ID:number
	/**名字*/
	Name:string
	/**外观*/
	Appearance:string
	/**生成间隔时间s*/
	InterTime:number
	/**生成数量*/
	CreateNum:number
	/**生成上限*/
	MaxNum:number
	/**生成特效(特效表id）*/
	CreaEff:Array<number>
	/**消失特效(特效表id)*/
	DisEff:Array<number>
	/**寻路范围*/
	WayRange:number
	/**玩家出现检测范围*/
	CheckRange:number
	/**逃跑寻路范围*/
	EscapeRange:number
	/**逃跑保持时间*/
	EscapeTime:number
	/**脱离区域保持时间*/
	OutTime:number
	/**生命值*/
	Hp:number
	/**默认移动速度*/
	DefaultSpeed:number
	/**逃跑移动速度*/
	EscapeSpeed:number
	/**抗暴*/
	Resistance:number
	/**拾取物掉落血量*/
	DropHp:number
	/**拾取物id(物品掉落表)*/
	DropId:number
 } 
export class MascotNpcConfig extends ConfigBase<IMascotNpcElement>{
	constructor(){
		super(EXCELDATA);
	}

}