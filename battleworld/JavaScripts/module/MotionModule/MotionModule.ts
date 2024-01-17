import { IMotionSkillElement } from "../../config/MotionSkill"
import { EMotionBreakType } from "../../editors/motionEditor/MontionEnum"
import { MotionDataManager } from "../../editors/motionEditor/MotionDataManager"
// import { SceneUnitUtil } from "../SceneUnitModule/SceneUnitModule"
// import { SceneUnitModuleC } from "../SceneUnitModule/SceneUnitModuleC"
import { MotionModuleC } from "./MotionModuleC"
import { MotionUtil } from "./MotionUtil"
import { ExtendsMotion, ServerMotion, AbstractMotion, RowMotion, ActionContext } from "./motionBase/MotionBase"




// import SceneUnitModel_Normal from "../SceneUnitModule/model/SceneUnitModel_Normal"

type MotionPerformantExtendsConstructor = { new(): ExtendsMotion }
type MotionNumericalExtendsConstructor = { new(): ServerMotion }
export class MotionRegister {
    static extendsMapClient: Map<string, MotionPerformantExtendsConstructor> = new Map()
    static extendsMapServer: Map<string, MotionNumericalExtendsConstructor> = new Map()

    static registerClientExtends(name: string, motion: MotionPerformantExtendsConstructor) {
        if (this.extendsMapClient.has(name)) {
            console.error(`添加了重复的motion构造函数:${name}`)
            return
        }
        this.extendsMapClient.set(name, motion)
    }

    static registerServerExtends(name: string, motion: MotionNumericalExtendsConstructor) {
        if (this.extendsMapServer.has(name)) {
            console.error(`添加了重复的motion构造函数:${name}`)
            return
        }
        this.extendsMapServer.set(name, motion)
    }

    /**通过id获取motion预演实例 */
    static getPerformantMotionInstance(motionId: number): AbstractMotion {

        return new RowMotion();
    }

    static getNumericalMotionInstance(motionId: number): ServerMotion {


        return new ServerMotion();
    }
}

export class MotionProcess {
    private readonly stageMotion: Set<AbstractMotion> = null;
    private readonly motionPool: Set<AbstractMotion> = null;
    private readonly recycleQueue: AbstractMotion[]

    private motionMDC: MotionModuleC

    constructor() {
        this.motionPool = new Set();
        this.stageMotion = new Set();
        this.recycleQueue = [];

        if (mw.SystemUtil.isClient()) {
            this.motionMDC = ModuleService.getModule(MotionModuleC)
        }
    }


    public invokeMotion(skillId: number, motionId: number, context: ActionContext, finisFunc: () => void = null) {


        let MotionData = MotionDataManager.instance.getMotionData(motionId);
        if (MotionData == null) {
            console.error(`未定义此Motion, motionId:${motionId}`)
            return;
        }

        let motion = this.getActionFromPool(motionId)
        motion.MotionContext = context;
        motion.CurrentFrame = 0;
        motion.stage = true;
        motion.BindSkillId = skillId;

        motion.invoke(MotionData, finisFunc);

        if (motion.isOwner) this.setOwnerState(motion)
    }

    /**释放motin蓄力 */
    public invokeMotion_charge(motionId: number, context: ActionContext, finisFunc: () => void = null) {
        let targetMotion: AbstractMotion
        for (let motion of this.stageMotion.values()) {
            if (motion.MotionContext.from == context.from) {
                targetMotion = motion
                break
            }
        }
        if (targetMotion == null) return;

        targetMotion.invoke_chargeRelease(finisFunc);
    }

    abortMotion(ownerID: number) {
        let targetMotion: AbstractMotion
        for (let motion of this.stageMotion.values()) {
            if (motion.MotionContext.from == ownerID) {
                targetMotion = motion
                break
            }
        }
        if (!targetMotion) return
        this.recycleMotion(targetMotion)
    }

    updateLogic() {
        for (let motion of this.stageMotion) {
            try {
                if (motion.ispause) {
                    //oTrace("暂停不执行")
                    continue;
                }
                motion.updateLogic()
            }
            catch (e) {
                console.error(`Motion/${motion.constructor.name}/updateLogic  出现错误!,错误信息:${e.message}\n${e.stack}`)
            }
            finally {
                if (motion.ispause) {
                    //oTrace("暂停不执行")
                    continue;
                }
                motion.CurrentFrame++
            }

            // 加入回收列表
            if (motion.CurrentFrame >= motion.MotionData.frameCount) {
                this.recycleQueue.push(motion)
            }
        }
        // 回收action
        if (this.recycleQueue.length > 0) {
            let count = this.recycleQueue.length
            for (let i = 0; i < count; i++) {
                let ac = this.recycleQueue.shift();
                this.recycleMotion(ac)
            }
        }
    }
    updatePerformant() { for (let action of this.stageMotion) { action.updatePerformant() } }


    getActionFromPool(motionId: number): AbstractMotion {
        // 没有此池子则创建pool TODO 定时清空

        if (this.motionPool.size == 0) {
            let abs = MotionRegister.getPerformantMotionInstance(motionId)
            this.stageMotion.add(abs)
            return abs
        }


        // 在池中查找未激活的返回
        let action: AbstractMotion

        for (let value of this.motionPool.values()) {
            if (value.stage == false) {
                action = value
                this.stageMotion.add(action)
                this.motionPool.delete(action)
                break;
            }
        }

        // 加入在池内创建
        if (!action) {
            let abs = MotionRegister.getPerformantMotionInstance(motionId)
            action = abs
            this.stageMotion.add(abs)
        }

        return action
    }

    recycleMotion(motion: AbstractMotion) {

        motion.finish()

        if (motion.isOwner) this.setOwnerState(undefined)

        // if (SceneUnitUtil.isSceneUnit(motion.MotionContext.from)) {
        //     let suMD = ModuleService.getModule(SceneUnitModuleC);
        //     let unitModel = suMD.getSceneUnit(motion.MotionContext.from);
        //     if (unitModel && unitModel instanceof SceneUnitModel_Normal) {

        //         // TODO:这个有啥用？

        //         unitModel.recordMotionPerformant(undefined)
        //     }

        // }

        motion.stage = false
        // 从stage删掉
        this.stageMotion.delete(motion)

        // 添加到容器
        this.motionPool.add(motion)
    }

    // 赋值帧状态
    private setOwnerState(motion: AbstractMotion) {
        this.motionMDC.setCurrentMotion(motion)
    }

    /**停止motino */
    public stopMotion(pId: number) {

        for (let motion of this.stageMotion) {
            if (motion.MotionContext.from == pId) {
                motion.CurrentFrame = motion.MotionData.frameCount + 10;
            }
        }
    }

    /**对象是否正在播放motion */
    public isHasPlayMotion(pId: number) {
        for (let motion of this.stageMotion.values()) {
            if (motion.breakType != EMotionBreakType.None) {
                continue;
            }
            if (motion.MotionContext.from == pId) {
                return true;
            }
        }
        return false;
    }

    /**
     * 是否有该玩家motion播放 包含回收中，中断
     * @param pId 
     * @returns 
     */
    public isHasPlayMotion2(pId: number) {
        for (let motion of this.stageMotion.values()) {
            if (motion.MotionContext.from == pId) {
                return true;
            }
        }

        return false;
    }

    /**
     * 是否还在播放其它motion
     * @param pId 
     * @param checkMotion 
     * @returns 
     */
    public isPlayOtherMotion(pId: number, checkMotion: AbstractMotion) {
        for (let motion of this.stageMotion.values()) {

            if (motion.MotionContext.from != pId) {
                continue;
            }

            if (motion == checkMotion) {
                continue;
            }

            if (motion.breakType == EMotionBreakType.CanBreak_NoStop) {
                continue;
            }

            if (motion.breakType == EMotionBreakType.CanBreak_Stop) {
                continue;
            }

            return true;
        }
        return false;
    }

    /**
     * 检测播放新的motion是否
     */
    public check_playMotionCond(pId: number, moitionSkillCfg: IMotionSkillElement) {

        if (moitionSkillCfg == null) {
            return false;
        }

        let curMotion: AbstractMotion = null;
        for (let motion of this.stageMotion.values()) {
            if (motion.breakType == EMotionBreakType.CanBreak_NoStop) {
                continue;
            }
            if (motion.MotionContext.from == pId) {
                curMotion = motion;
                break;
            }
        }

        // 当前没有播放motion
        if (curMotion == null) {
            return false;
        }

        let curSkillCfg = MotionUtil.getMotionSkillCfg(curMotion.MotionData.motionId);
        if (curSkillCfg == null) {
            return false;
        }

        if (moitionSkillCfg.skillSort > curSkillCfg.skillSort) {
            this.recycleMotion(curMotion);
            return false;
        }

        switch (curMotion.breakType) {
            case EMotionBreakType.None:
                return true;
                break;
            case EMotionBreakType.CanBreak_Stop:
                this.recycleMotion(curMotion);
                return false;
                break;
            case EMotionBreakType.CanBreak_NoStop:
                return false;
                break;
            default:
                return false;
                break;
        }


    }




}
