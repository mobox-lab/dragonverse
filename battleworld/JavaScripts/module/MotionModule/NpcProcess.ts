import { Constants } from "../../tool/Constants";
import { Singleton } from "../../tool/FunctionUtil";
import { MotionRegister } from "./MotionModule";
import { ServerMotion } from "./motionBase/MotionBase";
import { MotionModuleC } from "./MotionModuleC";


/**
 * 单端npc攻击 motion
 */
@Singleton()
export class NpcProcess {
    public static instance: NpcProcess = null;

    private recycleQueue: ServerMotion[] = [];
    private stageMotion: Set<ServerMotion> = new Set();
    private motionPool: Set<ServerMotion> = new Set();

    private mMotion: MotionModuleC = null;

    public init() {
        TimeUtil.setInterval(this.logicUpdate.bind(this), Constants.LogicFrameInterval);

        this.mMotion = ModuleService.getModule(MotionModuleC);
    }

    // // 单端npc 发起游戏
    // public client_invokeServerMotion(motionId: number, from: ISceneUnitBase, to: number) {

    //     let motionData = MotionDataManager.instance.getMotionData(motionId);

    //     if (motionData == null) {
    //         console.error(`未定义此Motion, motionId:${motionId}`)
    //         return;
    //     }


    //     let motion = this.getMotionFromPool(motionId);
    //     motion.currentFrame = 0;
    //     motion.stage = true;
    //     motion.invoke(from, motionData, to);

    //     this.mMotion.net_room_player_invoke_motion(motionId, from.sceneId, to);
    // }


    private logicUpdate() {
        for (let motion of this.stageMotion) {

            try { motion.updateLogic() }
            catch (e) { console.error(`Server Motion/${motion.constructor.name}/updateLogic 出现错误!,错误信息:${e.message}\n${e.stack}`) }
            finally { motion.currentFrame++ }

            if (motion.currentFrame >= motion.motionData.frameCount) this.recycleQueue.push(motion)
        }

        if (this.recycleQueue.length > 0) {
            let count = this.recycleQueue.length
            for (let i = 0; i < count; i++) {
                let ac = this.recycleQueue.shift();
                this.recycleMotion(ac)
            }
        }
    }

    // 回收Motion
    private recycleMotion(motion: ServerMotion) {
        motion.finish()

        motion.stage = false
        // 从stage删掉
        this.stageMotion.delete(motion)

        // 添加到容器
        this.motionPool.add(motion)
    }

    // 获取一个Motion
    private getMotionFromPool(motionId: number): ServerMotion {
        // 没有此池子则创建pool

        if (this.motionPool.size == 0) {
            let abs = MotionRegister.getNumericalMotionInstance(motionId)
            this.stageMotion.add(abs)
            return abs
        }

        let motion: ServerMotion

        for (let value of this.motionPool.values()) {
            if (value.stage == false) {
                motion = value
                this.stageMotion.add(motion)
                this.motionPool.delete(motion)
                break;
            }
        }
        if (!motion) {
            let abs = MotionRegister.getNumericalMotionInstance(motionId)
            motion = abs
            this.stageMotion.add(abs)
        }
        return motion
    }

    /**
      * 中断npc当前动效
      * @param sceneID 
      */
    public stopMotion(id: number) {
        for (let motion of this.stageMotion) {
            if (motion.owner.sceneId == id) {
                motion.stop();
            }
        }
    }


    /**
     * 通过sceneID获取motion
     * @param sceneID 
     * @returns 动效对象 自行判空
     */
    public getMotionBySceneID(sceneID: number): ServerMotion | undefined {
        for (const motion of this.stageMotion.values()) {
            if (motion.owner.sceneId == sceneID) return motion
        }
        return undefined
    }

    /**
     * 中断npc当前动效
     * @param sceneID 
     */
    public abortMotion(sceneID: number) {

        let stageMotion = this.getMotionBySceneID(sceneID);

        if (!stageMotion) return

        this.recycleMotion(stageMotion);

        this.mMotion.net_server_abort_motion(sceneID);
    }



}