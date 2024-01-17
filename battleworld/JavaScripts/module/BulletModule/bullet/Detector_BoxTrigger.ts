
/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/08 10:30:15
* @Description  : BoxTrigger检测器接口
*/

import { Globaldata } from "../../../const/Globaldata";
import { bulletTriggerTag } from "./BulletDefine";
import { IHitDetector } from "./IHitDetector";


/**
 * 检测子弹击trigger中物体后是否失效，return true表示是有效的
 */
export type CheckTriggerValid = (target: mw.GameObject) => boolean;

export class Detector_BoxTrigger implements IHitDetector {
    /**
     * 对应的子弹id
     */
    bulletId: number;

    /**
     * 无效了，也就不要再检测
     */
    private invalid: boolean = false;

    /**
     * 用于命中计算的trigger 
     */
    private _trigger: mw.Trigger;
    public get trigger(): mw.Trigger {
        return this._trigger;
    }

    /**
     * 检测子弹击trigger中物体后是否失效
     */
    private onCheckTriggerValid: CheckTriggerValid = null;

    /**
     * trigger命中目标，去重用
     */
    private triggerHitTargets: Map<mw.GameObject, boolean>;

    /**
     * 上次命中的目标，不能连续命中同一目标
     */
    private lastHitTarget: mw.GameObject = null;

    private first: boolean = true;
    private _arg: any = null;


    constructor() {
        this.triggerHitTargets = new Map<mw.GameObject, boolean>();
    }


    /**
     * 初始化
     * @param arg {trigger,rPos,rPos,scale,parent,onCheckTriggerHitValid}
     */
    init(arg: any): void {
        this._trigger = arg.trigger;
        this._trigger.setVisibility(mw.PropertyStatus.Off, false);
        this.onCheckTriggerValid = arg.onCheckTriggerValid;
        this._trigger.tag = bulletTriggerTag;
        this.first = true;
        this._arg = arg;
        this._trigger.onEnter.add(this.onBulletHitObj);
    }


    /**
      * 当子弹击trigger击中某个物体后 ,屏蔽玩家自己和其它子弹
      * @param target 
      */
    public onBulletHitObj = (target: mw.GameObject): boolean => {

        if (target == null || target == undefined || this.invalid || target == this._trigger) {
            // if (this.invalid) {
            // 	//oTraceError("自己已经无效了，不检测了");
            // 	return false;
            // }
            // if (target == this._trigger) {
            // 	//oTraceError("目标对象是子弹自己");
            // 	return false;
            // }
            // if (target != null) {
            // 	//oTraceError("目标 : " + target.name);
            // 	return false;
            // }
            // //oTraceError("无效的目标对象 : " + target);
            return false;
        }

        //过滤掉其它子弹
        if (target instanceof mw.Trigger) {
            //目标是trigger
            let tTrigger = target;
            if (tTrigger.tag == bulletTriggerTag) {
                //oTrace("子弹命中，过虑其它子弹对象");
                return false;
            }
        }

        if (this.onCheckTriggerValid(target)) {
            this.invalid = true;
            return true;
        }
    }

    /**
     * 初始化完成
     */
    initOver(): void {

    }

    /** 
     * 帧驱动
     * dt s
     */
    onUpdate(dt: number): void {
        if (this.first) {
            this._trigger.parent = (this._arg.parent);
            this._trigger.localTransform.position = (this._arg.rPos);
            Globaldata.tmpRotation1.x = this._arg.rRot.x;
            Globaldata.tmpRotation1.y = this._arg.rRot.y;
            Globaldata.tmpRotation1.z = this._arg.rRot.z;
            this._trigger.localTransform.rotation = Globaldata.tmpRotation1;
            this._trigger.worldTransform.scale = this._arg.scale;
            this._trigger.setVisibility(mw.PropertyStatus.On, false);
            this.first = false;
        }
    }

    /**
     * 销毁前
     */
    preDestroy(): void {
        if (this._trigger) {
            this._trigger.parent = null;
            this._trigger.onEnter.remove(this.onBulletHitObj);

        }
    }

    /**
     * 销毁了
     */
    onDestroy(): void {
        this.triggerHitTargets.clear();
        this.triggerHitTargets = null;
        this.onCheckTriggerValid = null;
    }

}
