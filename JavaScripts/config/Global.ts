import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","key","string","strV","strVal","value","array1d","array2d","s1d","s2d","vec","patientMove"],["","ReadByName","","","","","","","","","",""],[1,"RG_MaxSpeed",null,"跑酷游戏最大飞行速度",null,1000,null,null,null,null,null,null],[2,"RG_DEFAULT_Acceleration",null,"跑酷游戏默认加速速率",null,2100,null,null,null,null,null,null],[3,"RG_DEFAULT_Deceleration",null,"跑酷游戏默认减速速率",null,200,null,null,null,null,null,null],[4,"RG_Time",null,"跑酷游戏时间",null,40,null,null,null,null,null,null],[5,"RG_SpeedDown_Value",null,"跑酷通过减速圈减速差值",null,500,null,null,null,null,null,null],[6,"RG_Speed_Score",null,"跑酷进入奖励圈积分",null,50,null,null,null,null,null,null],[7,"RG_Time_Score",null,"跑酷进入加时圈积分",null,100,null,null,null,null,null,null],[8,"RG_TransStart_Score",null,"跑酷进入传送门起点积分",null,100,null,null,null,null,null,null],[9,"RG_TransEnd_Score",null,"跑酷进入传送门终点积分",null,100,null,null,null,null,null,null],[10,"RG_PrepareTextSize",null,"跑酷准备文本字体大小",null,150,null,null,null,null,null,null],[11,"RG_Ready_Time",null,"跑酷ready时间",null,3.1,null,null,null,null,null,null],[12,"RG_Interval_Time",null,"跑酷ready与go之间的间隔时间",null,0.1,null,null,null,null,null,null],[13,"RG_Go_Time",null,"跑酷GO时间",null,1,null,null,null,null,null,null],[14,"RG_Start_Loc",null,"跑酷起点区域前位置",null,0,null,[[8855.69,94653.5,1753.76]],null,null,new mw.Vector(53,136591,2900),null],[15,"RG_Back_Loc",null,"跑酷返回出口处位置",null,0,null,[[13641.69,94653.5,1753.76]],null,null,new mw.Vector(-721,136766,2900),null],[16,"RG_FOV_VALUE",null,"跑酷Fov变化系数",null,2.6,null,null,null,null,null,null],[17,"RG_SPEEDUP_TIME",null,"跑酷通过加速圈加速时间",null,1,null,null,null,null,null,null],[18,"RG_UP_Acceleration",null,"跑酷通过加速圈加速度",null,5000,null,null,null,null,null,null],[19,"RG_Streaking_Effect",null,"跑酷拖尾特效","197804",17,null,[[0,0,0],[2,2,2],[0,0,0]],null,null,null,null],[20,"RG_TIME_CD ",null,"跑酷加时圈冷却",null,6,null,null,null,null,null,null],[21,"RG_SPEED_CD",null,"跑酷加速圈冷却",null,6,null,null,null,null,null,null]];
export interface IGlobalElement extends IElementBase{
 	/**id*/
	id:number
	/**变量名(最好填上)*/
	key:string
	/**(这一列空着，不然描述显示不出来)*/
	string:string
	/**描述(中文描述，方便看信息)*/
	strV:string
	/**字符串*/
	strVal:string
	/**数值*/
	value:number
	/**一维数组*/
	array1d:Array<number>
	/**二维数组*/
	array2d:Array<Array<number>>
	/**一维字符串数组*/
	s1d:Array<string>
	/**二维字符串数组*/
	s2d:Array<Array<string>>
	/**坐标*/
	vec:mw.Vector
	/**一维vector数组*/
	patientMove:mw.Vector[]
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**跑酷游戏最大飞行速度*/
	get RG_MaxSpeed():IGlobalElement{return this.getElement(1)};
	/**跑酷游戏默认加速速率*/
	get RG_DEFAULT_Acceleration():IGlobalElement{return this.getElement(2)};
	/**跑酷游戏默认减速速率*/
	get RG_DEFAULT_Deceleration():IGlobalElement{return this.getElement(3)};
	/**跑酷游戏时间*/
	get RG_Time():IGlobalElement{return this.getElement(4)};
	/**跑酷通过减速圈减速差值*/
	get RG_SpeedDown_Value():IGlobalElement{return this.getElement(5)};
	/**跑酷进入奖励圈积分*/
	get RG_Speed_Score():IGlobalElement{return this.getElement(6)};
	/**跑酷进入加时圈积分*/
	get RG_Time_Score():IGlobalElement{return this.getElement(7)};
	/**跑酷进入传送门起点积分*/
	get RG_TransStart_Score():IGlobalElement{return this.getElement(8)};
	/**跑酷进入传送门终点积分*/
	get RG_TransEnd_Score():IGlobalElement{return this.getElement(9)};
	/**跑酷准备文本字体大小*/
	get RG_PrepareTextSize():IGlobalElement{return this.getElement(10)};
	/**跑酷ready时间*/
	get RG_Ready_Time():IGlobalElement{return this.getElement(11)};
	/**跑酷ready与go之间的间隔时间*/
	get RG_Interval_Time():IGlobalElement{return this.getElement(12)};
	/**跑酷GO时间*/
	get RG_Go_Time():IGlobalElement{return this.getElement(13)};
	/**跑酷起点区域前位置*/
	get RG_Start_Loc():IGlobalElement{return this.getElement(14)};
	/**跑酷返回出口处位置*/
	get RG_Back_Loc():IGlobalElement{return this.getElement(15)};
	/**跑酷Fov变化系数*/
	get RG_FOV_VALUE():IGlobalElement{return this.getElement(16)};
	/**跑酷通过加速圈加速时间*/
	get RG_SPEEDUP_TIME():IGlobalElement{return this.getElement(17)};
	/**跑酷通过加速圈加速度*/
	get RG_UP_Acceleration():IGlobalElement{return this.getElement(18)};
	/**跑酷拖尾特效*/
	get RG_Streaking_Effect():IGlobalElement{return this.getElement(19)};
	/**跑酷加时圈冷却*/
	get RG_TIME_CD ():IGlobalElement{return this.getElement(20)};
	/**跑酷加速圈冷却*/
	get RG_SPEED_CD():IGlobalElement{return this.getElement(21)};

}