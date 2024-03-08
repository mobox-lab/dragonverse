import { GhostTraceHelper } from "./TraceHelper";

const interval = 20

export default class Auto {

    /** 当前秒数 */
    private curSec: number = 0;
    /** 当前帧数 */
    private curFrame: number = 0;

    /** 检查时间间隔 */
    private checkTime: number = interval;

    /** 当前 CPU 画质等级 */
    private cLv: number = 0;
    /** 当前 GPU 画质等级 */
    private gLv: number = 0;

    /** 计数器 */
    private _count: number = 1;

    /** 
     * 初始化脚本内属性，判断是否进行画质调整
     */
    public onStart(): void {
        /** 获取当前 CPU 和 GPU 画质等级 */
        this.cLv = GraphicsSettings.getCPULevel();
        this.gLv = GraphicsSettings.getGPULevel();

        /** 如果 CPU 和 GPU 画质等级都为 1，则不进行画质调整 */
        if (this.cLv == 1 && this.gLv == 1) {
            return;
        }

        /** 打印初始画质等级 */
        console.log("初始画质 cpu" + this.cLv + "gpu" + this.gLv)
    }

    /**
     * 周期函数 每帧执行，用于自动调整画质，保证帧率
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    public onUpdate(dt: number): void {

        /** 更新当前秒数和帧数 */
        this.curSec += dt;
        this.curFrame++;
        this.checkTime -= dt;

        /** 如果未到检查时间间隔，则不进行画质调整 */
        if (this.checkTime >= 0) {
            return;
        }

        /** 重置检查时间间隔 */
        this.checkTime = interval;

        /** 计算当前帧率 */
        let fps = this.curFrame / this.curSec;

        /** 如果当前帧率大于等于 20，则不进行画质调整 */
        if (fps >= 20) {
            console.error("当前帧率 : " + fps);
            return
        }

        /** 标记是否进行了画质调整 */
        let isDown = false;

        /** 如果当前 CPU 画质等级大于 1，则降低 CPU 画质等级 */
        if (this.cLv > 1) {
            this.cLv--;
            console.error("降低画质【CPU】");
            GraphicsSettings.setGraphicsCPULevel(this.cLv);
            this.curSec = 0;
            this.curFrame = 0;
            isDown = true;
        }

        /** 如果当前 GPU 画质等级大于 1，则降低 GPU 画质等级 */
        if (this.gLv > 1) {
            this.gLv--;
            console.error("降低画质【GPU】");
            GraphicsSettings.setGraphicsGPULevel(this.gLv);
            this.curSec = 0;
            this.curFrame = 0;
            isDown = true;
        }

        /** 如果进行了画质调整，则记录帧率、CPU 画质等级和 GPU 画质等级 */
        if (isDown) {
            GhostTraceHelper.fpsTrace(this._count++, fps, this.cLv, this.gLv);
        }

    }

}