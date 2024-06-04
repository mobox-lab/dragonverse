/** 
 * @Author       : xiaohao.li
 * @Date         : 2024-01-11 19:23:39
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-19 14:51:42
 * @FilePath     : \nevergiveup\JavaScripts\TweenCommon.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-12-19 17:58:02
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-22 16:51:19
 * @FilePath: \nevergiveup\JavaScripts\TweenCommon.ts
 * @Description: 修改描述
 */
import { AddGMCommand } from "module_gm";
import { Config } from "./GameStart";
import { UIPool } from "./UIPool";
import { ZwtTween } from "./ZwtTween";
import { GameConfig } from "./config/GameConfig";
import { UIMain } from "./stage/ui/UIMain";
import { SoundUtil } from "./tool/SoundUtil";
import FlyItem_Generate from "./ui-generate/FlyIcon/FlyItem_generate";
import FlyView_Generate from "./ui-generate/FlyIcon/FlyView_generate";

/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-15 09:23:07
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-18 09:46:27
 * @FilePath     : \nevergiveup\JavaScripts\TweenCommon.ts
 * @Description  : 修改描述
 */
export namespace TweenCommon {
    const _tweenMap: { [guid: string]: ZwtTween } = {};

    export function popUpHide(target: mw.Widget, onComplete: Function = () => { }) {
        if (_tweenMap[target.guid]) {
            _tweenMap[target.guid].clear();
            _tweenMap[target.guid] = null;
        }
        _tweenMap[target.guid] = new ZwtTween(target)
            .UIOpacityTo(0, 0.2, mw.TweenUtil.Easing.Linear.None, true)
            .scaleTo(new Vector(1.1), 0.15, false)
            .scaleTo(Vector.one, 0.15, false)
            .call(() => {
                onComplete();
            })
            .start()
        return _tweenMap[target.guid];
    }

    export function popUpShow(target: mw.Widget, onComplete: Function = () => { }) {
        if (_tweenMap[target.guid]) {
            _tweenMap[target.guid].clear();
            _tweenMap[target.guid] = null;
        }
        _tweenMap[target.guid] = new ZwtTween(target)
            .UIOpacityTo(1, 0.2, mw.TweenUtil.Easing.Linear.None, true)
            .scaleTo(new Vector(1.1), 0.15, false)
            .scaleTo(Vector.one, 0.15, false)
            .call(() => {
                onComplete();
            })
            .start();
        return _tweenMap[target.guid];
    }

    /**
     * 贝塞尔曲线
     * 给出一组点，算出的这个曲线在某个阶段的值
     * @param points 曲线点参数组
     * @param lerp 0-1的插值
     * @returns 曲线上的点
     */
    export function bezier(points: mw.Vector2[], lerp: number): mw.Vector2 {
        lerp = MathUtil.clamp(lerp, 0, 1);
        if (points.length == 2) {
            return Vector2.lerp(points[0], points[1], lerp);
        }
        let nextArray: mw.Vector2[] = [];
        for (let i = 0; i < points.length - 1; i++) {
            let pointA = points[i];
            let pointB = points[i + 1];
            let lerpPoint = Vector2.lerp(pointA, pointB, lerp)
            nextArray.push(lerpPoint);
        }
        return bezier(nextArray, lerp);
    }

    export function wait(time: number): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, Math.floor(time * 1000));
            time = null;
        });
    }

    let goldFailedShowTween: ZwtTween = null;
    export function goldFailedShow(target: mw.TextBlock, onComplete: Function = () => { }) {
        // target.contentColor = new LinearColor(1, 0, 0);
        if (!goldFailedShowTween) {
            goldFailedShowTween = new ZwtTween(target)
                .scaleTo(new Vector2(1.2, 1.2), 0.3, false, TweenUtil.Easing.Back.Out, true)
                .rotateTo(-20, 0.1)
                .rotateTo(20, 0.2)
                .scaleTo(Vector2.one, 0.3, false, TweenUtil.Easing.Back.Out, true)
                .rotateTo(-15, 0.1)
                .rotateTo(15, 0.1)
                .rotateTo(0, 0.1)
                .call(() => {
                    // target.contentColor = new LinearColor(1, 1, 1);
                    target.renderTransformAngle = 0;
                    onComplete();
                })
        } else {
            goldFailedShowTween.stop();
        }
        SoundUtil.PlaySoundById(GameConfig.Global.getElement(1).goldFailedVoice);
        goldFailedShowTween.start();
        return goldFailedShowTween;
    }
    export let flyItemPool: UIPool<FlyItem_Generate> = new UIPool(FlyItem_Generate);


    export async function addGoldAnim(count: number, worldLocation: Vector, offset: Vector2 = Vector2.zero, onComplete1?: Function, onComplete2?: Function) {
        let mainUI = mw.UIService.getUI(UIMain);
        let flyView = mw.UIService.getUI(FlyView_Generate);
        flyView.layer = mw.UILayerSystem;
        // if (flyView.txt_count["subValue"] == null) {
        //     flyView.txt_count["subValue"] = 0;
        //     flyView.txt_count.text = "x0";
        //     flyView.txt_count["value"] = 0;
        // }
        // flyView.txt_count["subValue"] += count;
        mw.UIService.show(FlyView_Generate);
        // await TweenCommon.wait(0.01);
        // /**  字符抖动动画 */
        // let goldScaleTween = new mw.Tween({ scale: new mw.Vector2(1, 1) })
        //     .to({ scale: new mw.Vector2(1.1, 1.1) }, 30)
        //     .easing(TweenUtil.Easing.Quadratic.Out)
        //     .repeat(1)
        //     .yoyo(true)
        //     .onUpdate((obj) => {
        //         flyView.cav_gold.renderScale = obj.scale;
        //     });

        let startPos = new mw.Vector2();
        if (worldLocation) {
            startPos = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, true).screenPosition;
        } else {
            let size = flyView.uiObject.size.clone()
            startPos.x = size.x / 2;
            startPos.y = size.y / 2;
        }
        startPos.add(offset);
        let endPos = new mw.Vector2();
        mw.localToViewport(mainUI.goldImg.tickSpaceGeometry, mw.Vector2.zero, mw.Vector2.zero, endPos);

        /** 细分次数 */
        let segments = Math.min(50, MathUtil.randomInt(Config.goldAnimRandAmount.x, Config.goldAnimRandAmount.y));

        for (let i = 0; i < segments; i++) {
            let node = TweenCommon.flyItemPool.spawn();
            flyView.rootCanvas.addChild(node.uiObject);
            node.uiObject.position = startPos.clone();
            let offsetPos = new mw.Vector2(MathUtil.randomInt(-100, 100), MathUtil.randomInt(-100, 100)).add(startPos);

            let tween = new mw.Tween({ pos: offsetPos.clone(), scale: new mw.Vector2(0.6, 0.6) })
                .to({ pos: endPos.clone(), scale: new mw.Vector2(1, 1) }, Config.goldAnimInitTime * 1000)
                .easing(mw.TweenUtil.Easing.Back.In)
                .onUpdate(obj => {
                    node.uiObject.position = obj.pos;
                    node.uiObject.renderScale = obj.scale;
                }).onComplete(() => {
                    TweenUtil.TWEEN.remove(tween);
                    TweenCommon.flyItemPool.despawn(node);
                    if (onComplete1) onComplete1();

                    let node2 = TweenCommon.flyItemPool.spawn();
                    flyView.rootCanvas.addChild(node2.uiObject);
                    node2.uiObject.position = endPos.clone();
                    let endPos2 = new mw.Vector2();
                    let backUpSize = node2.mIcon.size.clone();
                    mw.localToViewport(mainUI.goldImg.tickSpaceGeometry, mw.Vector2.zero, mw.Vector2.zero, endPos2);
                    let bezierPoint = [endPos.clone(), new mw.Vector2(endPos.x - offsetPos.x * 0.1, endPos.y + offsetPos.y * 0.1), endPos2];
                    let tween2 = new mw.Tween({ v: 0, size: node2.mIcon.size.clone() })
                        .to({ v: 1, size: mainUI.goldImg.size.clone() }, Config.goldAnimBackTime * 1000)
                        .easing(mw.TweenUtil.Easing.Quadratic.Out)
                        .onUpdate(obj => {
                            node2.uiObject.position = TweenCommon.bezier(bezierPoint, obj.v);
                            node2.mIcon.size = obj.size;
                        }).onComplete(() => {
                            node2.mIcon.size = backUpSize.clone();
                            TweenCommon.flyItemPool.despawn(node2);
                            TweenUtil.TWEEN.remove(tween2);
                            // TweenUtil.TWEEN.remove(goldScaleTween);
                            if (!TweenCommon.flyItemPool.hasUsedNode()) {
                                mw.UIService.hide(FlyView_Generate);
                                if (onComplete2) onComplete2();
                            }
                        }).start();
                }).start();
            // .onComplete(() => {
            //     /**  金币抵达字符叠加位置 */
            //     flyView.cav_gold.renderOpacity = 1;
            //     flyView.txt_count["value"] += Math.floor(count / segments);
            //     flyView.txt_count.text = "x" + flyView.txt_count["value"];
            //     TweenCommon.flyItemPool.despawn(node);
            //     // if (!goldScaleTween.isPlaying()) {
            //     //     goldScaleTween.start();
            //     // }
            //     /**  当前判断最终金币抵达 */
            //     if (!TweenCommon.flyItemPool.hasUsedNode()) {
            //         /**  校准 */
            //         flyView.txt_count["value"] = flyView.txt_count["subValue"];
            //         flyView.txt_count.text = "x" + flyView.txt_count["value"];
            //         if (!TweenCommon.flyItemPool.hasUsedNode()) {
            //             if (onComplete1) onComplete1();
            //             flyView.cav_gold.renderOpacity = 0;
            //             flyView.txt_count["subValue"] = 0;
            //             flyView.txt_count.text = "x0";
            //             flyView.txt_count["value"] = 0;
            //             let node2 = TweenCommon.flyItemPool.spawn();
            //             flyView.rootCanvas.addChild(node2.uiObject);
            //             node2.uiObject.position = endPos.clone();
            //             let endPos2 = new mw.Vector2();
            //             let backUpSize = node2.mIcon.size.clone();
            //             mw.localToViewport(mainUI.goldImg.tickSpaceGeometry, mw.Vector2.zero, mw.Vector2.zero, endPos2);
            //             let bezierPoint = [endPos.clone(), new mw.Vector2(endPos.x + 100, endPos.y + 100), endPos2];
            //             let tween2 = new mw.Tween({ v: 0, size: node2.mIcon.size.clone() })
            //                 .to({ v: 1, size: mainUI.goldImg.size.clone() }, 500)
            //                 .easing(mw.TweenUtil.Easing.Quadratic.Out)
            //                 .onUpdate(obj => {
            //                     node2.uiObject.position = TweenCommon.bezier(bezierPoint, obj.v);
            //                     node2.mIcon.size = obj.size;
            //                 }).onComplete(() => {
            //                     node2.mIcon.size = backUpSize.clone();
            //                     TweenCommon.flyItemPool.despawn(node2);
            //                     TweenUtil.TWEEN.remove(tween2);
            //                     // TweenUtil.TWEEN.remove(goldScaleTween);
            //                     if (!TweenCommon.flyItemPool.hasUsedNode()) {
            //                         mw.UIService.hide(FlyView_Generate);
            //                         if (onComplete2) onComplete2();
            //                     }
            //                 }).start();
            //         }
            //     }
            //     TweenUtil.TWEEN.remove(tween);
            // })

            await TweenCommon.wait(0.05);
        }
    }
}