import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","name1","weaponType","attrTypes","attrValues","skillBtnBindId","pendantIds","backPendantIds","sellValue","killIcon","material","resetMaterial","action"],["","Language","","","","","","","","","","","",""],[1,"Weapon_Name_1","拳头",1,[203],[20],1,[5,6],null,0,"112148",null,null,null],[2,"Weapon_Name_2","近战单手剑",2,[102,107],[500,400],2,[1],[2],0,"98203","3B0077C7495F23F6CFEF50B0F9DE51BD","94F8EE354F1B98F3B86AB5B9ED256D8E",null],[3,"Weapon_Name_3","法杖",3,[102,107],[300,200],3,[3],[4],0,null,"3B0077C7495F23F6CFEF50B0F9DE51BD","73516B43428EDA50614F4EA40C4F4C05",null],[4,"Weapon_Name_4","双手剑",4,[102,107],[600,400],4,[33],[34],0,null,"3B0077C7495F23F6CFEF50B0F9DE51BD","CE073024456D3FE7B9883789DAFA716F","217285"]];
export interface IWeaponElement extends IElementBase{
 	/**唯一id*/
	id:number
	/**武器名称多语言*/
	name:string
	/**武器名称(便于查看)*/
	name1:string
	/**武器类型*/
	weaponType:number
	/**武器基础属性数组*/
	attrTypes:Array<number>
	/**武器基础属性值数组*/
	attrValues:Array<number>
	/**MotionBtn表技能按钮绑定id*/
	skillBtnBindId:number
	/**挂件表id*/
	pendantIds:Array<number>
	/**背部挂件id*/
	backPendantIds:Array<number>
	/**售价*/
	sellValue:number
	/**击杀图标*/
	killIcon:string
	/**发光材质*/
	material:string
	/**恢复材质
不填就恢复默认
填就恢复成对应的*/
	resetMaterial:string
	/**武器待机动画*/
	action:string
 } 
export class WeaponConfig extends ConfigBase<IWeaponElement>{
	constructor(){
		super(EXCELDATA);
	}

}