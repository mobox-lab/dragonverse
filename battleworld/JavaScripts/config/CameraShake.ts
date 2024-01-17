import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","keepTime","rotPitchAmplitude","rotPitchFrequency","rotPitchWaveform","rotYawAmplitude","rotYawFrequency","rotYawWaveform","rotRollAmplitude","rotRollFrequency","rotRollWaveform","locXAmplitude","locXFrequency","locXWaveform","locYAmplitude","locYFrequency","locYWaveform","locZAmplitude","locZFrequency","locZWaveform","fovAmplitude","fovFrequency","fovWaveform"],["","","","","","","","","","","","","","","","","","","","","","",""],[1,1,1,3,0,3,3,0,0,0,0,0,0,0,0,0,0,5,3,0,10,3,0]];
export interface ICameraShakeElement extends IElementBase{
 	/**id*/
	id:number
	/**持续时间*/
	keepTime:number
	/**旋转Pitch幅度*/
	rotPitchAmplitude:number
	/**旋转Pitch频率*/
	rotPitchFrequency:number
	/**振荡的波形类型 0正弦:1噪声 */
	rotPitchWaveform:number
	/** 旋转Yaw轴幅度*/
	rotYawAmplitude:number
	/**旋转Yaw轴频率*/
	rotYawFrequency:number
	/**振荡的波形类型 0正弦:1噪声 */
	rotYawWaveform:number
	/**旋转Roll轴幅度*/
	rotRollAmplitude:number
	/**旋转Roll轴频率*/
	rotRollFrequency:number
	/**振荡的波形类型 0正弦:1噪声 */
	rotRollWaveform:number
	/** 位置X轴幅度*/
	locXAmplitude:number
	/** 位置X轴频率*/
	locXFrequency:number
	/**振荡的波形类型 0正弦:1噪声 */
	locXWaveform:number
	/** 位置Y轴幅度*/
	locYAmplitude:number
	/** 位置Y轴频率*/
	locYFrequency:number
	/**振荡的波形类型 0正弦:1噪声 */
	locYWaveform:number
	/**位置Z轴幅度*/
	locZAmplitude:number
	/**位置Z轴频率*/
	locZFrequency:number
	/**振荡的波形类型 0正弦:1噪声 */
	locZWaveform:number
	/**FOV幅度*/
	fovAmplitude:number
	/**FOV频率*/
	fovFrequency:number
	/**振荡的波形类型 0正弦:1噪声 */
	fovWaveform:number
 } 
export class CameraShakeConfig extends ConfigBase<ICameraShakeElement>{
	constructor(){
		super(EXCELDATA);
	}

}