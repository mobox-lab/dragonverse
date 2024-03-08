import { EventFrameInfo } from "../../../model/info/EventFrameInfo";
import { Interpolator3 } from "../../../simplepathing/interpolator/Interpolator";
import { InterpolatorFactory, InterpolatorType } from "../../../simplepathing/interpolator/InterpolatorFactory";
import { EventsHandle } from "../EventsHandle";
import { EventTriggerType, registerCSEvent } from "../EventsHelper";
import { UICSTransInfo } from "../ui/UICSTransInfo";


export type TransParams = {
    targetId: string,
    position: Vector,
    rotation: Rotation,
    scale: Vector
}

@registerCSEvent(TransHandle.EVENT, "变换", UICSTransInfo, [EventTriggerType.Interpolation])
export class TransHandle extends EventsHandle {

    static readonly EVENT = "CS.Trans";

    private _infos: EventFrameInfo[];

    /** 对象插值器组 */
    private _locInters: Interpolator3<Vector>[] = [];
    private _rotInters: Interpolator3<Rotation>[] = [];
    private _scaleInters: Interpolator3<Vector>[] = [];

    private _tempLoc = Vector.zero;
    private _tempRot = Rotation.zero;
    private _tempScale = Vector.one;

    getDefParams(): TransParams {
        return {
            targetId: "",
            position: Vector.zero,
            rotation: Rotation.zero,
            scale: Vector.one
        };
    }

    onReSet(): void {
        if (!this._infos) return;
        // 找到每个目标的第一帧还原初始位置
        const targetMap = new Map<string, TransParams>();
        for (const info of this._infos) {
            const params = info.getParams<TransParams>();
            if (!targetMap.has(params.targetId)) {
                targetMap.set(params.targetId, params);
            }
        }
        for (const [targetId, params] of targetMap) {
            GameObject.asyncFindGameObjectById(targetId).then((obj) => {
                if (!obj) return;
                obj.worldTransform.position = params.position;
                obj.worldTransform.rotation = params.rotation;
            });
        }
    }

    onDataChange(infos: EventFrameInfo[]): void {
        this._infos = infos;
        this._locInters = [];
        this._rotInters = [];
        // 按targetId分组并缓存参数对象
        const targetMap = new Map<string, EventFrameInfo[]>();
        const paramsInstance = new Map<string, TransParams[]>();
        for (const info of infos) {
            const params = info.getParams<TransParams>();
            if (!paramsInstance.has(params.targetId)) {
                paramsInstance.set(params.targetId, []);
            }
            paramsInstance.get(params.targetId).push(params);
            if (!targetMap.has(params.targetId)) {
                targetMap.set(params.targetId, []);
            }
            targetMap.get(params.targetId).push(info);
        }
        // 创建插值器
        for (const [targetId, infos] of targetMap) {
            const params = paramsInstance.get(targetId);
            const times = infos.map((info) => info.time);
            const locInter = InterpolatorFactory.createInterpolator<Vector>(InterpolatorType.Linear);
            locInter.reCompute(params.map((param) => param.position), times);
            this._locInters.push(locInter);
            const rotInter = InterpolatorFactory.createInterpolator<Rotation>(InterpolatorType.Linear);
            rotInter.reCompute(params.map((param) => param.rotation), times);
            this._rotInters.push(rotInter);
            const scaleInter = InterpolatorFactory.createInterpolator<Vector>(InterpolatorType.Linear);
            scaleInter.reCompute(params.map((param) => param.scale), times);
            this._scaleInters.push(scaleInter);
            GameObject.asyncFindGameObjectById(targetId).then((obj) => {
                if (!obj) return;
                locInter["target"] = obj;
            });
        }
    }

    onTime(time: number): void {
        for (let i = 0; i < this._locInters.length; i++) {
            const obj = this._locInters[i]["target"] as GameObject;
            if (obj) {
                this._locInters[i].interpolate(time, this._tempLoc);
                obj.worldTransform.position = this._tempLoc;
                this._rotInters[i].interpolate(time, this._tempRot);
                obj.worldTransform.rotation = this._tempRot;
                this._scaleInters[i].interpolate(time, this._tempScale);
                obj.worldTransform.scale = this._tempScale;
            }
        }
    }

}
