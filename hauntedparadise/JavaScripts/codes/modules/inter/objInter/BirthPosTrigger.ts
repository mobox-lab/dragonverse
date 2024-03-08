/*
 * @Author       : dal
 * @Date         : 2023-11-26 10:21:54
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-26 10:46:03
 * @FilePath     : \hauntedparadise\JavaScripts\modules\inter\objInter\BirthPosTrigger.ts
 * @Description  : 复活点出发放弃
 */

import { CommonUtils } from "../../../utils/CommonUtils";
import { ArchiveDataType } from "../../archive/ArchiveHelper";
import ArchiveModuleC from "../../archive/ArchiveModuleC";
import { PlayerModuleC } from "../../player/PlayerModuleC";

@Component
export default class TraceTrigger extends Script {
	@Property({ displayName: "复活点" })
	birthPoint: Vector = Vector.zero;

	@Property({ displayName: "复活后的朝向" })
	birthRoation: Rotation = Rotation.zero;

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		if (!this.isRunningClient()) { return; }
		const trigger = this.gameObject as Trigger;
		trigger.onEnter.add((char: Character) => {
			if (!CommonUtils.isSelfChar(char)) { return; }
			ModuleService.getModule(PlayerModuleC).birthPos = this.birthPoint.clone();
			ModuleService.getModule(PlayerModuleC).birthRot = this.birthRoation.clone();
			ModuleService.getModule(ArchiveModuleC).reqSaveData(
				[ArchiveDataType.BIRTHPOS, ArchiveDataType.BIRTHROT],
				[this.birthPoint.clone(), CommonUtils.rot2Arr(this.birthRoation)]
			);
		})
	}
}