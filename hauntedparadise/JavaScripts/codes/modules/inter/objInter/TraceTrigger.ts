import { CommonUtils } from "../../../utils/CommonUtils";
import { GhostTraceHelper } from "../../../utils/TraceHelper";

@Component
export default class TraceTrigger extends Script {
	@Property({ displayName: "区域id" })
	public areaId: number = 0;

	/** 当脚本被实例后，会在第一帧更新前调用此函数 */
	protected onStart(): void {
		const trigger = this.gameObject as Trigger
		trigger.onEnter.add((char: Character) => {
			if (!CommonUtils.isSelfChar(char)) {
				return;
			}
			GhostTraceHelper.areaEnterTrace(this.areaId);
		})
		trigger.onLeave.add((char: Character) => {
			if (!CommonUtils.isSelfChar(char)) {
				return;
			}
			GhostTraceHelper.areaLeaveTrace(this.areaId);
		})
	}

	/**
	 * 周期函数 每帧执行
	 * 此函数执行需要将this.useUpdate赋值为true
	 * @param dt 当前帧与上一帧的延迟 / 秒
	 */
	protected onUpdate(dt: number): void {

	}

	/** 脚本被销毁时最后一帧执行完调用此函数 */
	protected onDestroy(): void {

	}
}