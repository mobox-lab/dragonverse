import { PlayerManagerExtesion, } from '../../../Modified027Editor/ModifiedPlayer';
/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/08 10:28:22
* @Description  : 射线检测器接口
*/
import { bulletTriggerTag, checkObjIsEqual } from "./BulletDefine";
import { IHitDetector } from "./IHitDetector";

/**
 * 子弹射线命中中物体时 返回值，是否需要继续检测
 */
type CheckLineTraceTarget = (target: mw.HitResult) => boolean;

export class Detector_LineTrace implements IHitDetector {

    /**
     * 对应的子弹id
     */
    bulletId: number;

    /**
     * 延迟检测的时间
     */
    private delayCheckTime: number = 0;


    /**
     * 检测起点
     */
    private checkFrom: mw.Vector;

    /**
     * 检测终点
     */
    private checkTo: mw.Vector;

    /**
     * 子弹物体
     */
    private bulletObj: mw.GameObject = null;

    /**
     * 检测者客户端id
     */
    private checkHostId: number = -1;

    /**
     * 已经开启了延迟射线检测
     */
    private beginDelayCheckLineTrace: boolean = false;


    /**
     * 外部用于射线命中了目标
     */
    private onLineTraceTarget: CheckLineTraceTarget = null;

    /**
     * 当射线检测完成时
     */
    private onCheckOver: () => void;

    /**
     * 初始化
     * @param arg {delayTime,bulletObj, onLineTraceTarget}
     */
    init(arg: any): void {
        this.delayCheckTime = arg.delayTime;
        this.bulletObj = arg.bulletObj;
        this.checkFrom = arg.checkFrom;
        this.checkTo = arg.checkTo;
        this.checkHostId = arg.checkHostId;
        this.onLineTraceTarget = arg.onLineTraceTarget;
        this.onCheckOver = arg.onCheckOver;
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
        //如果是射线检测，直接进行一次检测  
        if (!this.beginDelayCheckLineTrace) {
            this.delayLineTraceTarget();
        }
    }

    /**
     * 销毁前
     */
    preDestroy(): void {

    }

    /**
     * 销毁了
     */
    onDestroy(): void {
        this.delayCheckTime = null;
        this.bulletObj = null;
        this.checkFrom = null;
        this.checkTo = null;
        this.checkHostId = null;
        this.onLineTraceTarget = null;
        this.onCheckOver = null;
    }

    /**
     * 延迟一会开启射线检测
     */
    private async delayLineTraceTarget() {
        this.beginDelayCheckLineTrace = true;

        if (this.delayCheckTime > 0) {
            await mw.TimeUtil.delaySecond(this.delayCheckTime);
        }
        this.lineTraceTarget();
    }

    /**
     * 当子弹击trigger击中某个物体后 ,屏蔽玩家自己和其它子弹
     * @param target 
     */
    public onBulletHitObj(target: mw.GameObject): boolean {

        return false;
    }

    /**
     * 直接进行一个射线检测 
     */
    private lineTraceTarget() {
        let hitResults = null
        try {
            hitResults = QueryUtil.lineTrace(this.checkFrom, this.checkTo, true, false);
        } catch (error) {

        }
        if (!hitResults || !Array.isArray(hitResults))
            return;

        //过滤掉一样的和玩家自己
        let results: mw.HitResult[] = [];
        hitResults.forEach((ht) => {
            if (PlayerManagerExtesion.isCharacter(ht.gameObject)) {
                if (this.checkHostId != -1) {//子弹的发起者是玩家，过虑掉自己
                    let character = ht.gameObject as mw.Character;
                    if (character && character.player && character.player.playerId == this.checkHostId) {
                        return;
                    }
                }
            }
            //过滤掉其它子弹
            if (ht.gameObject instanceof mw.Trigger) {
                //目标是trigger
                let tTrigger = ht.gameObject as mw.Trigger;
                if (tTrigger.tag == bulletTriggerTag) {
                    //oTrace("子弹命中，过虑其它子弹对象");
                    return;
                }
            }
            //过滤掉一样的
            if (results.find((set) => { return checkObjIsEqual(set.gameObject, ht.gameObject); }) == null)
                results.push(ht);
        })
        for (let i = 0; i < results.length; i++) {
            if (!this.onLineTraceTarget(results[i]))
                break;
        }
        this.onCheckOver();
    }
}
