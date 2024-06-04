import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","stage","needPower","iconGuid","textColor","percent","isWelcome","isShow","Ranking"],["","Language","","","","","","",""],[1,"Stage_1",0,"180120",[255,255,255,1],0.1,false,false,false],[2,"Stage_2",11,"180120",[255,255,255,1],0.3,false,false,false],[3,"Stage_3",24,"180120",[255,255,255,1],0.5,false,false,false],[4,"Stage_4",39,"180120",[255,255,255,1],0.7,false,false,false],[5,"Stage_5",80,"180120",[255,255,255,1],1,false,false,false],[6,"Stage_6",156,"180120",[255,255,255,1],2,false,false,false],[7,"Stage_7",206,"180120",[255,255,255,1],3,false,false,false],[8,"Stage_8",264,"180120",[255,255,255,1],4,false,false,true],[9,"Stage_9",360,"180120",[255,255,255,1],5,false,false,false],[10,"Stage_10",449,"180121",[255,255,255,1],6,false,false,false],[11,"Stage_11",548,"180121",[255,255,255,1],8,false,false,true],[12,"Stage_12",655,"180121",[255,255,255,1],10,false,true,false],[13,"Stage_13",774,"180121",[255,255,255,1],12,false,false,false],[14,"Stage_14",903,"180121",[255,255,255,1],15,false,false,true],[15,"Stage_15",1042,"180121",[255,255,255,1],18,false,false,false],[16,"Stage_16",1193,"180133",[255,231,0,1],20,false,true,false],[17,"Stage_17",1356,"180133",[255,231,0,1],23,false,false,true],[18,"Stage_18",1531,"180133",[255,231,0,1],27,false,false,false],[19,"Stage_19",1718,"180133",[255,231,0,1],30,false,true,false],[20,"Stage_20",1919,"180133",[255,231,0,1],35,false,false,true],[21,"Stage_21",2132,"180133",[255,231,0,1],38,false,false,false],[22,"Stage_22",2359,"180133",[255,231,0,1],42,false,true,false],[23,"Stage_23",2600,"180133",[255,231,0,1],46,false,false,true],[24,"Stage_24",2855,"180133",[255,231,0,1],48,false,false,false],[25,"Stage_25",3126,"180118",[227,31,0,1],50,false,true,false],[26,"Stage_26",3411,"180118",[227,31,0,1],54,false,false,true],[27,"Stage_27",3712,"180118",[227,31,0,1],60,false,true,false],[28,"Stage_28",4027,"180118",[227,31,0,1],62,false,false,false],[29,"Stage_29",4358,"180118",[227,31,0,1],64,false,false,true],[30,"Stage_30",4705,"180118",[227,31,0,1],66,false,false,false],[31,"Stage_31",5068,"180118",[227,31,0,1],68,false,false,false],[32,"Stage_32",5449,"180118",[227,31,0,1],70,false,true,true],[33,"Stage_33",5846,"180118",[227,31,0,1],71,false,false,false],[34,"Stage_34",6261,"180118",[227,31,0,1],73,false,false,false],[35,"Stage_35",6692,"180118",[227,31,0,1],75,false,false,true],[36,"Stage_36",7141,"180118",[227,31,0,1],77,false,false,true],[37,"Stage_37",7608,"180118",[227,31,0,1],79,false,false,true],[38,"Stage_38",8093,"180119",[227,31,0,1],81,false,true,true],[39,"Stage_39",8596,"180119",[227,31,0,1],83,false,false,true],[40,"Stage_40",9119,"180119",[227,31,0,1],85,false,false,true],[41,"Stage_41",9660,"180119",[227,31,0,1],87,false,false,true],[42,"Stage_42",10221,"180119",[227,31,0,1],88,false,false,true],[43,"Stage_43",10800,"180119",[227,31,0,1],89,false,false,true],[44,"Stage_44",11399,"180119",[227,31,0,1],90,true,true,true],[45,"Stage_45",12018,"180119",[227,31,0,1],91,true,true,true],[46,"Stage_46",12657,"180119",[227,31,0,1],92,true,true,true],[47,"Stage_47",13316,"180119",[227,31,0,1],93,true,true,true],[48,"Stage_48",13995,"180119",[227,31,0,1],94,true,true,true],[49,"Stage_49",14696,"180128",[255,231,0,1],95,true,true,true],[50,"Stage_50",15417,"180128",[255,231,0,1],96,true,true,true],[51,"Stage_51",16160,"180128",[255,231,0,1],97,true,true,true],[52,"Stage_52",16923,"180128",[255,231,0,1],98,true,true,true],[53,"Stage_53",17708,"180128",[255,231,0,1],98.3,true,true,true],[54,"Stage_54",18515,"180128",[255,231,0,1],98.5,true,true,true],[55,"Stage_55",19344,"180128",[255,231,0,1],98.8,true,true,true],[56,"Stage_56",20195,"180128",[255,231,0,1],98.9,true,true,true],[57,"Stage_57",21068,"180128",[255,231,0,1],99,true,true,true],[58,"Stage_58",21963,"180131",[255,231,0,1],99.1,true,true,true],[59,"Stage_59",22882,"180131",[255,231,0,1],99.2,true,true,true],[60,"Stage_60",23823,"180131",[255,231,0,1],99.3,true,true,true],[61,"Stage_61",24788,"180131",[255,231,0,1],99.4,true,true,true],[62,"Stage_62",25775,"180131",[255,231,0,1],99.5,true,true,true],[63,"Stage_63",26786,"180131",[255,231,0,1],99.6,true,true,true],[64,"Stage_64",27821,"180131",[255,231,0,1],99.7,true,true,true],[65,"Stage_65",28880,"180131",[255,231,0,1],99.8000000000001,true,true,true],[66,"Stage_66",29963,"180131",[255,231,0,1],99.9000000000001,true,true,true],[67,"Stage_67",31070,"180131",[227,31,0,1],100,true,true,true]];
export interface ILevelElement extends IElementBase{
 	/**id*/
	id:number
	/**阶段*/
	stage:string
	/**所需力量*/
	needPower:number
	/**icon*/
	iconGuid:string
	/**字体颜色*/
	textColor:Array<number>
	/**比例*/
	percent:number
	/**是否欢迎*/
	isWelcome:boolean
	/**是否播报*/
	isShow:boolean
	/**是否显示在排行榜（小于十个）*/
	Ranking:boolean
 } 
export class LevelConfig extends ConfigBase<ILevelElement>{
	constructor(){
		super(EXCELDATA);
	}

}