/*
 * @Author       : dal
 * @Date         : 2024-01-26 15:40:05
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-29 18:00:31
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\UIAniUtil.ts
 * @Description  : 
 */
export class UIAniUtil {

    private static _uiAngleTweenMap: Map<string, Tween<any>> = new Map();

    /**
     * 播放旋转UI动画（0-360自动轮回）
     * @param ui 
     * @param toAngle 要变换到的角度
     * @param duration 持续时间
     * @param doCompleteCall 完成的回调
     */
    static playAngleTurnAni(ui: Widget, toAngle: number, duration: number = 1e3, doCompleteCall?: Function) {
        let tween = this._uiAngleTweenMap.get(ui.guid);
        tween?.stop();
        let curAngle = ui.renderTransformAngle;
        let newToAngle = toAngle;
        if (Math.abs(curAngle - toAngle) > 180) {
            // 方向
            let dir = toAngle - curAngle > 0 ? -1 : 1;
            // 变化值
            let t = 360 - Math.abs(toAngle - curAngle);
            // 最终角度值
            newToAngle = curAngle + t * dir;
        }
        tween = new Tween({ angle: ui.renderTransformAngle })
            .to({ angle: newToAngle }, duration)
            .onUpdate((trans) => {
                if (!ui || !ui.visibility) { tween.stop(); return; }
                ui.renderTransformAngle = trans.angle;
            })
            .start()
            .onComplete(() => {
                ui.renderTransformAngle = toAngle;
                doCompleteCall && doCompleteCall();
                this._uiAngleTweenMap.delete(ui.guid);
            });
        this._uiAngleTweenMap.set(ui.guid, tween);
    }

    /**
     * 播放UI的透明度tween动画（0-360自动轮回）
     */
    static playOpaAni(ui: Widget, toOpa: number, duration: number = 1e3, doCompleteCall?: Function) {
        let tween = new Tween({ value: ui.renderOpacity })
            .to({ value: toOpa }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) { tween.stop(); return; }
                ui.renderOpacity = delta.value;
            })
            .start()
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
            });
    }

    /**
     * 播放UI的scale 的tween动画
     */
    static playScaleAni(ui: Widget, toScale: Vector2, duration: number = 1e3, doCompleteCall?: Function, delay?: number, easing?: TweenEasingFunction) {
        let tween = new Tween({ value: ui.renderScale })
            .to({ value: toScale }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) { tween.stop(); return; }
                ui.renderScale = delta.value;
            })
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
            });
        delay && tween.delay(delay);
        easing && tween.easing(easing);
        tween.start();
    }

    static playPosAni(ui: Widget, toPos: Vector2, duration: number = 1e3, doCompleteCall?: Function, delay?: number, easing?: TweenEasingFunction) {
        let tween = new Tween({ value: ui.position })
            .to({ value: toPos }, duration)
            .onUpdate((delta) => {
                if (!ui || !ui.visibility) { tween.stop(); return; }
                ui.position = delta.value;
            })
            .onComplete(() => {
                doCompleteCall && doCompleteCall();
            });
        delay && tween.delay(delay);
        easing && tween.easing(easing);
        tween.start();
    }
}