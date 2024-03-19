import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","key","detail","number","numberList","string","stringList","vector","array1d"],["","ReadByName","","","","","","",""],[1,"Test",null,0,null,null,null,null,null],[2,"Test2",null,0,null,"203770",null,null,null],[3,"GameBGM",null,0,null,"221073",null,null,null],[4,"BadEndSound",null,0,null,"203411",null,null,null],[5,"HappyEndSound",null,0,null,"135161",null,null,null],[6,"StartPos","出生点位",0,null,null,null,new mw.Vector(100.7,-950.42,426.34),null],[7,"StartRot","出生点玩家的旋转",0,null,null,null,new mw.Vector(0,0,90),null],[8,"RevivePos","复活点位",0,null,null,null,new mw.Vector(100.7,-950.42,426.34),null],[9,"ReviveRot","复活点玩家旋转",0,null,null,null,new mw.Vector(0,0,90),null],[10,"WalkSound","行走的随机音效",0,[[1,2]],null,null,null,null],[11,"WalkInterval","行走的音效播放间隔",0.7,null,null,null,null,null],[12,"ItemMax","背包最大各自数目",20,null,null,null,null,null],[13,"MaxHeight","人物最大身高",1.25,null,null,null,null,null],[14,"distance",null,0,null,null,null,null,[200,400,500,600]],[15,"timeLevel",null,0,null,null,null,null,[300,500,600,800,1000]],[16,"renderLevel",null,0,null,null,null,null,[0.8,0.6,0.4,0.2,0.1]],[17,"defaultNoteIdList","默认解锁的笔记id",0,null,null,null,null,[2001,2003]],[18,"cameraInputScale","摄像机移动灵敏度比例",0.18,null,null,null,null,null],[19,"itemScrollBox","物品滑动条长度",900,null,null,null,null,null],[20,"itemScrollEnable","物品滑条是否可以滑动",1,null,null,null,null,null],[21,"initItems","初始物品列表",0,null,null,null,null,null],[22,"MinHeight","人物最低身高",1.25,null,null,null,null,null],[23,"flashUI","闪屏UI画质区分",0,null,null,["m1","m2","m3"],null,null],[24,"killUI","击杀UI画质区分",0,null,null,["m1","m2","m3"],null,null],[25,"skyBoxLightIntensity","天空光强度",0,null,null,null,null,[2.8,3,2.8,2,2.5]],[26,"lightingIntensity","平行光强度",0,null,null,null,null,[2,2.5,2,1.3,1.6]],[27,"sunColor","太阳光颜色",0,null,null,["#757ABC","#D8FFFF","#FF3F3B","#FF1100","#FF3F3B"],null,null],[28,"skyBoxTopColor","天空球上层颜色",0,null,null,["#879BD8","#FDF1F1","#2F3245","#2C2C2C","#2F3245"],null,null],[29,"skyBoxMiddleColor","天空球中层颜色",0,null,null,["#4279B5","#D4DEF0","#5B6677","#252A33","#5B6677"],null,null],[30,"skyBoxBottomColor","天空球下层颜色",0,null,null,["#6772B1","#D7DBF7","#9194A6","#2B2C33","#9194A6"],null,null],[31,"lerpTime","过渡时间（6、12、18、0、3）",0,null,null,null,null,[126,252,378,423,468]],[32,"dayTime","白天时间（s）756",378,null,null,null,null,null],[33,"nightTime","夜晚时间（s）180",90,null,null,null,null,null],[34,"isGhostCloseDoor ",null,1,null,null,null,null,null],[35,"BuildDropSpeed","建筑下落速度",2000,null,null,null,null,null],[36,"BuildRotDelta","建筑旋转值",90,null,null,null,null,null],[37,"MaxBuildingNum","每个玩家的最大建筑数量",200,null,null,null,null,null]];
export interface IGlobalElement extends IElementBase{
 	/**ID*/
	id:number
	/**变量名，需要这列唯一*/
	key:string
	/**描述*/
	detail:string
	/**数字*/
	number:number
	/**二维数组*/
	numberList:Array<Array<number>>
	/**字符串*/
	string:string
	/**字符串数组*/
	stringList:Array<string>
	/**坐标*/
	vector:mw.Vector
	/**一维数组*/
	array1d:Array<number>
 } 
export class GlobalConfig extends ConfigBase<IGlobalElement>{
	constructor(){
		super(EXCELDATA);
	}
	/**0*/
	get Test():IGlobalElement{return this.getElement(1)};
	/**0*/
	get Test2():IGlobalElement{return this.getElement(2)};
	/**0*/
	get GameBGM():IGlobalElement{return this.getElement(3)};
	/**0*/
	get BadEndSound():IGlobalElement{return this.getElement(4)};
	/**0*/
	get HappyEndSound():IGlobalElement{return this.getElement(5)};
	/**0*/
	get StartPos():IGlobalElement{return this.getElement(6)};
	/**0*/
	get StartRot():IGlobalElement{return this.getElement(7)};
	/**0*/
	get RevivePos():IGlobalElement{return this.getElement(8)};
	/**0*/
	get ReviveRot():IGlobalElement{return this.getElement(9)};
	/**0*/
	get WalkSound():IGlobalElement{return this.getElement(10)};
	/**0.7*/
	get WalkInterval():IGlobalElement{return this.getElement(11)};
	/**20*/
	get ItemMax():IGlobalElement{return this.getElement(12)};
	/**1.25*/
	get MaxHeight():IGlobalElement{return this.getElement(13)};
	/**0*/
	get distance():IGlobalElement{return this.getElement(14)};
	/**0*/
	get timeLevel():IGlobalElement{return this.getElement(15)};
	/**0*/
	get renderLevel():IGlobalElement{return this.getElement(16)};
	/**0*/
	get defaultNoteIdList():IGlobalElement{return this.getElement(17)};
	/**0.18*/
	get cameraInputScale():IGlobalElement{return this.getElement(18)};
	/**900*/
	get itemScrollBox():IGlobalElement{return this.getElement(19)};
	/**1*/
	get itemScrollEnable():IGlobalElement{return this.getElement(20)};
	/**0*/
	get initItems():IGlobalElement{return this.getElement(21)};
	/**1.25*/
	get MinHeight():IGlobalElement{return this.getElement(22)};
	/**0*/
	get flashUI():IGlobalElement{return this.getElement(23)};
	/**0*/
	get killUI():IGlobalElement{return this.getElement(24)};
	/**0*/
	get skyBoxLightIntensity():IGlobalElement{return this.getElement(25)};
	/**0*/
	get lightingIntensity():IGlobalElement{return this.getElement(26)};
	/**0*/
	get sunColor():IGlobalElement{return this.getElement(27)};
	/**0*/
	get skyBoxTopColor():IGlobalElement{return this.getElement(28)};
	/**0*/
	get skyBoxMiddleColor():IGlobalElement{return this.getElement(29)};
	/**0*/
	get skyBoxBottomColor():IGlobalElement{return this.getElement(30)};
	/**0*/
	get lerpTime():IGlobalElement{return this.getElement(31)};
	/**378*/
	get dayTime():IGlobalElement{return this.getElement(32)};
	/**90*/
	get nightTime():IGlobalElement{return this.getElement(33)};
	/**1*/
	get isGhostCloseDoor ():IGlobalElement{return this.getElement(34)};
	/**2000*/
	get BuildDropSpeed():IGlobalElement{return this.getElement(35)};
	/**1*/
	get BuildRotDelta():IGlobalElement{return this.getElement(36)};
	/**200*/
	get MaxBuildingNum():IGlobalElement{return this.getElement(37)};

}