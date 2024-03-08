
/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-05-18 14:57:43
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-29 17:43:32
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\GameAnimaiton.ts
 * @Description  : 
 */

/**
 * 包含UI和Obj的平移，抖动等动画
 *  */
export namespace GameAnimation {
    export class UIAnimation {

        /**
         * 不为全明星服务的通用的飘字
         * @param startLocation 开始位置
         * @param endLocation 结束位置
         * @param targetUI 被飘字的目标UI
         * @param time 飘字的时间
         * @param onFinished 结束回调
         */
        public static playFlyUI(startLocation: mw.Vector2, endLocation: mw.Vector2, targetUI: mw.Widget, time: number, onFinished?: () => void) {
            let tween = new mw.Tween(startLocation.clone());
            //飘到指定位置
            tween.to(endLocation, time * 1000).onUpdate((data: mw.Vector2) => {
                console.log(targetUI.position)
                targetUI.position = data;
            }).onComplete(() => {
                onFinished && onFinished();
            }).onStart(() => {
                targetUI.visibility = SlateVisibility.Visible;
            })
            tween.start()
        }


        /**
         * 
         * @param targetUI 需要放大的目标UI
         * @param largeTime 放大的时间
         * @param largeStart 放大开始的大小
         * @param largeRate 放大最终的大小
         * @param shrinkTime 缩小的时间  
         * @param shrinkRate 缩小的最终大小  
         * @param onFinished 结束的回调
         */
        public static playerEnlargeAnimation(targetUI: mw.Canvas, largeTime: number, largeStart: mw.Vector2, largeRate: mw.Vector2, shrinkTime?: number, shrinkRate?: mw.Vector2, onFinished?: () => void) {
            //缩小
            let shrinkAnim = new mw.Tween(largeRate)
                .to(shrinkRate, shrinkTime)
                .onUpdate((data) => {
                    targetUI.renderScale = data
                }).onComplete(() => {
                    onFinished && onFinished();
                })
            //放大
            new mw.Tween(largeStart)
                .to(largeRate, largeTime)
                .onUpdate((data) => {
                    targetUI.renderScale = data
                }).onComplete(() => {
                    if (shrinkTime != 0) {
                        shrinkAnim.start()
                    } else {
                        onFinished && onFinished();
                    }
                })
                .start()
        }
        /**
         * 平移的动画
         * @param starVector2 开始的位置
         * @param endVector2 结束的位置
         * @param time 持续的时间
         * @param ui 被平移的ui
         */
        playTranslateAnimation(startLocation: mw.Vector2, endLocation: mw.Vector2, time: number, targetUI: mw.Widget, onFinished?: () => void) {

            new mw.Tween(startLocation)
                .to(endLocation, time * 1000)
                .onUpdate((data) => {
                    //console.log("data", targetUI, data);
                    targetUI.position = data
                }).onComplete(() => {
                    onFinished && onFinished();
                })
                .start()
        }
        /**
         * 渲染透明
         * @param start 
         * @param end 
         * @param time 
         * @param targetUI 
         * @param onFinished 
         */
        public static playFadeAnimation(start: number, end: number, time: number, targetUI: mw.Widget, onFinished?: () => {}) {

            new mw.Tween({ renderOpacity: start })
                .to({ renderOpacity: end }, time * 1000)
                .onUpdate((data) => {
                    //console.log("data", targetUI, data);
                    targetUI.renderOpacity = data.renderOpacity
                }).onComplete(() => {
                    onFinished && onFinished();
                })
                .start()
        }


        /**
         * 左右抖动的动画
         * @param targetUI 目标UI
         * @param angle 旋转的角度
         * @param time 时间
         * @param times 次数
         * @param onFinished 结束的回调 
         */
        playWobbleAnimation(targetUI: mw.Canvas, angle: number, time: number, times: number, onFinished?: () => void) {


            let rightWobble = new mw.Tween({ angle1: angle })
                .to({ angle1: times != 0 ? -angle : 0 }, time * 2000)
                .onUpdate((data) => {
                    console.log("data", targetUI, data.angle1);
                    targetUI.renderTransformAngle = data.angle1;
                }).onComplete(() => {
                    if (times > 0) {
                        this.playWobbleAnimation(targetUI, angle, time, times - 1, onFinished)
                    } else {
                        onFinished && onFinished();
                    }
                })


            new mw.Tween({ angle1: targetUI.renderTransformAngle })
                .to({ angle1: angle }, time * 1000)
                .onUpdate((data) => {
                    console.log("data", targetUI, data.angle1);
                    targetUI.renderTransformAngle = data.angle1;
                }).onComplete(() => {
                    rightWobble.start();
                })
                .start()
        }
    }
    export class ObjAnimation {


        /**
         * 左右抖动的动画(相对位置)
         * @param targetUI 目标UI
         * @param angle 旋转的角度
         * @param time 时间
         * @param times 次数
         * @param onFinished 结束的回调 
         */
        public static playObjWobbleAnimation(target: GameObject, pos: Vector, time: number, times: number, onFinished?: () => void) {
            let startPos = target.localTransform.position.clone();
            let rightWobble = new mw.Tween(startPos)
                .to(pos, time * 1000)
                .onUpdate((data) => {
                    target.localTransform.position = data;
                }).onComplete(() => {
                    if (times > 0) {
                        // this.playObjWobbleAnimation(target, angle, time, times - 1, onFinished)
                    } else {
                        onFinished && onFinished();
                    }
                }).start();

        }

        /**
         * 左右抖动的动画(相对位置)
         * @param targetUI 目标UI
         * @param angle 旋转的角度
         * @param time 时间
         * @param times 次数
         * @param onFinished 结束的回调 
         */
        public static playObjRoaAnimation(target: GameObject, pos: Rotation, time: number, times: number, onFinished?: () => void) {
            let startPos = target.localTransform.rotation.clone();
            let rightWobble = new mw.Tween(startPos)
                .to(pos, time * 1000)
                .onUpdate((data) => {
                    target.localTransform.rotation = data;
                }).onComplete(() => {
                    if (times > 0) {
                        // this.playObjWobbleAnimation(target, angle, time, times - 1, onFinished)
                    } else {
                        onFinished && onFinished();
                    }
                }).start();
        }
        /**
         * 平移(相对位置)
         * @param target 
         * @param pos 
         * @param time 
         * @param times 
         * @param onFinished 
         */
        public static playObjTranslateAnimation(target: GameObject, startLocation: Vector, endLocation: Vector, time: number, onFinished?: () => void) {
            const tween = new mw.Tween(startLocation)
                .to(endLocation, time * 1000)
                .onUpdate((data) => {
                    if (!target || !target.getVisibility()) { tween.stop(); return; }
                    //console.log("data", targetUI, data);
                    target.localTransform.position = data
                }).onComplete(() => {
                    onFinished && onFinished();
                })
                .start()
        }
    }
}




export enum IconType {

    /**建造的货币 */
    MONEY = 1,
    /**竞技币 */
    TOKEN,
    /** 战令经验 */
    BP_EXP,
    /**排位积分 */
    BR_SCORE,
    WEEK_CHECK_SCORE
}