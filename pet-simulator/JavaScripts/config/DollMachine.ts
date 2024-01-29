import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","Hook","Rope","Time","Control","Guide","Claws","Marker","Generate","Trigger","Egg","Weight"],["","","","","","","","","","","",""],[1,"0F7059C8","316B3485","337ECCFF","3BB5B7FD","35A44B3A",["2DC1EAE1","3F8B6D54","08E743DF","1CDA96EE"],"23424D73",["17023AFC","0E55914B"],"33860DBD",[21,22,23,24,25,26],[18,1818,18,14,14]]];
export interface IDollMachineElement extends IElementBase{
 	/**娃娃机id*/
	id:number
	/**钩子guid*/
	Hook:string
	/**绳子guid*/
	Rope:string
	/**倒计时UIguid*/
	Time:string
	/**控制UIguid*/
	Control:string
	/**引导世界UI*/
	Guide:string
	/**前后左右爪子guid*/
	Claws:Array<string>
	/**边界标志物guid*/
	Marker:string
	/**生成点*/
	Generate:Array<string>
	/**触发器guid*/
	Trigger:string
	/**娃娃机内扭蛋*/
	Egg:Array<number>
	/**娃娃机扭蛋概率*/
	Weight:Array<number>
 } 
export class DollMachineConfig extends ConfigBase<IDollMachineElement>{
	constructor(){
		super(EXCELDATA);
	}

}