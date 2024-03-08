import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","json"],["",""],[1,"{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":-733.16,\"y\":-620.88,\"z\":578.75},\"_rotation\":{\"x\":0,\"y\":-14.49,\"z\":-82.67},\"_fov\":90},{\"_time\":1.33,\"_location\":{\"x\":27.25,\"y\":-523.09,\"z\":578.75},\"_rotation\":{\"x\":0,\"y\":-14.49,\"z\":-82.67},\"_fov\":90},{\"_time\":2.26,\"_location\":{\"x\":391.57,\"y\":-476.22,\"z\":578.75},\"_rotation\":{\"x\":0,\"y\":-14.49,\"z\":-82.67},\"_fov\":90}],\"interpolation\":1,\"eventFrameInfos\":[{\"_time\":0.61,\"_name\":\"CS.Sound\",\"_params\":\"{\\\"assetId\\\":\\\"196558\\\",\\\"targetId\\\":\\\"\\\",\\\"loopCount\\\":0,\\\"volume\\\":1,\\\"keepTime\\\":3}\"}]} "],[2,"{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":-733.16,\"y\":-620.88,\"z\":578.75},\"_rotation\":{\"x\":0,\"y\":-14.49,\"z\":-82.67},\"_fov\":90},{\"_time\":1.33,\"_location\":{\"x\":27.25,\"y\":-523.09,\"z\":578.75},\"_rotation\":{\"x\":0,\"y\":-14.49,\"z\":-82.67},\"_fov\":90},{\"_time\":2.26,\"_location\":{\"x\":391.57,\"y\":-476.22,\"z\":578.75},\"_rotation\":{\"x\":0,\"y\":-14.49,\"z\":-82.67},\"_fov\":90}],\"interpolation\":1,\"eventFrameInfos\":[{\"_time\":0.61,\"_name\":\"CS.Sound\",\"_params\":\"{\\\"assetId\\\":\\\"196558\\\",\\\"targetId\\\":\\\"\\\",\\\"loopCount\\\":0,\\\"volume\\\":1,\\\"keepTime\\\":3}\"}]} "]];
export interface IJsonElement extends IElementBase{
 	/**id*/
	id:number
	/**实际上的值*/
	json:string
 } 
export class JsonConfig extends ConfigBase<IJsonElement>{
	constructor(){
		super(EXCELDATA);
	}

}