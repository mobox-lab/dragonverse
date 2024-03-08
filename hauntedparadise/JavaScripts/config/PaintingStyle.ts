import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","text","ghostGuid","isHide","animationGuid","animationSpeed","CameraId","TransformAnchorId","tauntTxt"],["","Language","","","","","","","Language"],[1,"UI_Start_03","27DF04E74F6184FFA49A45B47266EF5B",0,"120393",0.5,"17DEDB14","10B54752","Subtitles_3"],[2,"UI_Start_05","0FEA5853419E1058EFB464A1A2AD5C6B",1,"120393",0.5,"17DEDB14","10B54752","subtitles_2"],[3,"UI_Start_04","86DC3418436A54A579AE4793ED6AD5C7",0,"120393",0.5,"17DEDB14","10B54752","subtitles_1"]];
export interface IPaintingStyleElement extends IElementBase{
 	/**ID*/
	id:number
	/**画风文本*/
	text:string
	/**鬼模型ID*/
	ghostGuid:string
	/**国内是否隐藏*/
	isHide:number
	/**播放待机动作*/
	animationGuid:string
	/**播放速度*/
	animationSpeed:number
	/**摄像机ID*/
	CameraId:string
	/**鬼锚点ID*/
	TransformAnchorId:string
	/**嘲讽文字*/
	tauntTxt:string
 } 
export class PaintingStyleConfig extends ConfigBase<IPaintingStyleElement>{
	constructor(){
		super(EXCELDATA);
	}

}