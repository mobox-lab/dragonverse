import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","stage","needWin","iconGuid","textColor","percent","isWelcome","isShow"],["","Language","","","","","",""],[1,"SubStage_1",0,"78739",[255,255,255,1],0,false,false],[2,"SubStage_2",1,"78739",[255,255,255,1],0.1,false,false],[3,"SubStage_3",3,"78739",[255,255,255,1],0.2,false,false],[4,"SubStage_4",5,"78739",[255,255,255,1],0.3,false,false],[5,"SubStage_5",10,"78739",[255,255,255,1],0.5,false,false],[6,"SubStage_6",15,"78739",[43,174,71,1],0.7,false,false],[7,"SubStage_7",25,"78741",[43,174,71,1],1,false,true],[8,"SubStage_8",50,"78741",[43,174,71,1],1.5,false,false],[9,"SubStage_9",70,"78741",[43,174,71,1],2,false,false],[10,"SubStage_10",100,"78741",[20,162,240,1],3,false,false],[11,"SubStage_11",135,"78741",[20,162,240,1],5,false,true],[12,"SubStage_12",150,"78741",[20,162,240,1],8,false,false],[13,"SubStage_13",180,"78740",[20,162,240,1],10,false,true],[14,"SubStage_14",210,"78740",[240,186,0,1],15,false,false],[15,"SubStage_15",250,"78740",[240,186,0,1],20,false,true],[16,"SubStage_16",300,"78740",[240,186,0,1],25,false,false],[17,"SubStage_17",350,"78740",[240,186,0,1],30,false,true],[18,"SubStage_18",400,"78740",[182,92,240,1],35,false,false],[19,"SubStage_19",500,"78744",[182,92,240,1],40,false,true],[20,"SubStage_20",600,"78744",[182,92,240,1],42,false,false],[21,"SubStage_21",700,"78744",[182,92,240,1],45,false,false],[22,"SubStage_22",800,"78744",[240,66,0,1],48,false,false],[23,"SubStage_23",900,"78744",[240,66,0,1],50,false,true],[24,"SubStage_24",1000,"78744",[240,66,0,1],55,false,false],[25,"SubStage_25",1500,"78745",[240,66,0,1],57,false,false],[26,"SubStage_26",2000,"78745",[255,229,0,1],60,false,true],[27,"SubStage_27",3000,"78745",[255,229,0,1],65,false,false],[28,"SubStage_28",4000,"78745",[255,229,0,1],70,false,true],[29,"SubStage_29",5000,"78745",[255,229,0,1],75,false,false],[30,"SubStage_30",6000,"78743",[255,0,0,1],80,true,true],[31,"SubStage_31",7000,"78743",[255,0,0,1],90,true,true],[32,"SubStage_32",8000,"78743",[255,0,0,1],99,true,true],[33,"SubStage_33",9000,"78743",[255,0,0,1],99.5,true,true],[34,"SubStage_34",10000,"78743",[255,0,0,1],99.9,true,true],[35,"SubStage_35",20000,"78743",[255,0,0,1],99.99,true,true],[36,"SubStage_36",999999,"78743",[255,0,0,1],100,true,true]];
export interface ISubStageElement extends IElementBase{
 	/**id*/
	id:number
	/**阶段*/
	stage:string
	/**所需PVP胜场*/
	needWin:number
	/**icon(没读啊)*/
	iconGuid:string
	/**字体颜色*/
	textColor:Array<number>
	/**比例(没读啊)*/
	percent:number
	/**是否欢迎(没读啊)*/
	isWelcome:boolean
	/**是否播报(没读啊)*/
	isShow:boolean
 } 
export class SubStageConfig extends ConfigBase<ISubStageElement>{
	constructor(){
		super(EXCELDATA);
	}

}