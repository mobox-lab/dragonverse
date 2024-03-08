/*
 * @Author       : dal
 * @Date         : 2023-11-13 11:28:58
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-04 14:31:01
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\ObjAniUtil.ts
 * @Description  : 
 */
/*
 * @Author       : dal
 * @Date         : 2023-11-07 14:16:58
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-14 14:11:34
 * @FilePath     : \hauntedparadise\JavaScripts\utils\ObjAniUtil.ts
 * @Description  : 
 */
import { UtilEx } from "./UtilEx";

export class ObjAniUtil {

    /**
     * 模型散落在四周的效果
     * @param objGuid 生成的散落物模型guid
     * @param objTransForm 散落物的transForm信息
     * @param productNum 散落数量
     * @param scanterRange 散落范围
     * @param minHeightRate 贝塞尔曲线中点高度最低区间
     * @param maxHeightRate 贝塞尔曲线中点高度最高区间
     */
    static async playObjScatterAni(objGuid: string, objTransForm: Transform, minScale: number = 2, maxScale: number = 3, productNum: number = 10, scanterRange: number = 300, minHeightRate: number = 100, maxHeightRate: number = 200) {
        const go = await GameObjPool.asyncSpawn(objGuid) as Model;
        go.worldTransform.position = objTransForm.position;
        go.worldTransform.rotation = objTransForm.rotation;
        let rendScale = objTransForm.scale;
        let scale = Vector.one
        scale = scale.multiply(MathUtil.randomFloat(minScale, maxScale));
        let time = 0;
        const maxTime = 20;
        let forward = objTransForm.getForwardVector().negative;
        forward = new Rotation(0, 0, MathUtil.randomInt(-90, 90)).rotateVector(forward);
        const p0 = go.worldTransform.position.clone().add(Vector.up.multiply(20 * rendScale.x));
        const p2 = go.worldTransform.position.clone().add(
            forward.multiply(
                UtilEx.MathEx.rangeInt(-scanterRange * rendScale.x, scanterRange * rendScale.x)
            )
        );
        const p1 = new Vector(MathUtil.randomFloat(p0.x, p2.x),
            MathUtil.randomFloat(p0.y, p2.y),
            MathUtil.randomFloat(p0.z, p2.z)
        ).add(new Vector(0, 0, MathUtil.randomInt(minHeightRate * rendScale.x, maxHeightRate * rendScale.x)));
        let additionValue = MathUtil.randomFloat(1, 4);
        const handle = setInterval(() => {
            const bezier = UtilEx.TypeEx.getBezier3d(p0, p1, p2, time / maxTime);
            go.worldTransform.position = bezier;
            go.worldTransform.scale = scale.clone().multiply(1 - time / (maxTime * additionValue));
            time++;
            if (time > maxTime) {
                clearInterval(handle);
                setTimeout(() => {
                    GameObjPool.despawn(go);
                }, 5e3);
            }
        }, 20);
        productNum > 0 && this.playObjScatterAni(objGuid, objTransForm, minScale, maxScale, --productNum, scanterRange, minHeightRate, maxHeightRate);
    }

    private static _objScaleTweenMap: Map<string, Tween<any>> = new Map();

    /**
     * 播放模型变换尺寸的动画
     * @param obj 模型
     * @param toScale 要变换到的尺寸
     * @param duration 持续时间
     * @param doCompleteCall 完成的回调
     */
    public static playScaleUpAni(obj: GameObject, toScale: Vector, duration: number = 1e3, doCompleteCall?: Function) {
        if (!obj || !obj.localTransform) { return; }
        let tween = this._objScaleTweenMap.get(obj.gameObjectId);
        tween?.stop();
        tween = new Tween({ scale: obj.worldTransform.scale })
            .to({ scale: toScale }, duration)
            .onUpdate((trans) => {
                if (!obj || !obj.getVisibility()) { tween.stop(); return; }
                obj.worldTransform.scale = trans.scale;
            })
            .start()
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
                this._objScaleTweenMap.delete(obj.gameObjectId);
            });
        this._objScaleTweenMap.set(obj.gameObjectId, tween);
    }

    private static objPosTweenMap: Map<string, Tween<any>> = new Map();

    /**
     * @param obj 模型
     * @param doCompleteCall 完成的回调
     */
    public static playPosAni(obj: GameObject, toPos: Vector, duration: number = 1e3, doCompleteCall?: Function, isWorldTrans: boolean = false, easing: TweenEasingFunction = TweenUtil.Easing.Linear.None) {
        if (!obj || !obj.localTransform) { return; }
        let tween = this.objPosTweenMap.get(obj.gameObjectId);
        tween?.stop();
        tween = new Tween({ data: isWorldTrans ? obj.worldTransform.position : obj.localTransform.position })
            .to({ data: toPos }, duration)
            .onUpdate((trans) => {
                if (!obj || !obj.getVisibility()) { tween.stop(); return; }
                if (isWorldTrans) {
                    obj.worldTransform.position = trans.data;
                } else {
                    obj.localTransform.position = trans.data;
                }
            })
            .start()
            .easing(easing)
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
                this.objPosTweenMap.delete(obj.gameObjectId);
            });
        this.objPosTweenMap.set(obj.gameObjectId, tween);
    }

    private static objRotTweenMap: Map<string, Tween<any>> = new Map();

    /**
     * @param obj 模型
     * @param doCompleteCall 完成的回调
     */
    public static playRotAni(obj: GameObject, toRot: Rotation, duration: number = 1e3, doCompleteCall?: Function, isWorldTrans: boolean = false, easing: TweenEasingFunction = TweenUtil.Easing.Linear.None) {
        if (!obj || !obj.localTransform) { return; }
        let tween = this.objRotTweenMap.get(obj.gameObjectId);
        tween?.stop();
        let startRot = isWorldTrans ? obj.worldTransform.rotation : obj.localTransform.rotation;
        let startRotInfo = { x: Math.round(startRot.x), y: Math.round(startRot.y), z: Math.round(startRot.z) };
        let endRotInfo = { x: Math.round(toRot.x), y: Math.round(toRot.y), z: Math.round(toRot.z) };
        if (startRotInfo.x >= 180) { startRotInfo.x = startRotInfo.x - 360 }
        if (startRotInfo.y >= 180) { startRotInfo.y = startRotInfo.y - 360 }
        if (startRotInfo.z >= 180) { startRotInfo.z = startRotInfo.z - 360 }

        if (endRotInfo.x >= 180) { endRotInfo.x = endRotInfo.x - 360; }
        if (endRotInfo.y >= 180) { endRotInfo.y = endRotInfo.y - 360; }
        if (endRotInfo.z >= 180) { endRotInfo.z = endRotInfo.z - 360; }
        tween = new Tween({ data: startRotInfo })
            .to({ data: endRotInfo }, duration)
            .onUpdate((trans) => {
                if (!obj || !obj.getVisibility()) { tween.stop(); return; }
                if (isWorldTrans) {
                    obj.worldTransform.rotation = new Rotation(trans.data.x, trans.data.y, trans.data.z);
                } else {
                    obj.localTransform.rotation = new Rotation(trans.data.x, trans.data.y, trans.data.z);
                }
            })
            .start()
            .easing(easing)
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
                this.objRotTweenMap.delete(obj.gameObjectId);

            });
        this.objRotTweenMap.set(obj.gameObjectId, tween);
    }
}