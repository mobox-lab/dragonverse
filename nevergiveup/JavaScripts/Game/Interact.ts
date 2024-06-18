/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-10 16:08:52
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-12 16:42:13
 * @FilePath     : \nevergiveup\JavaScripts\Game\Interact.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-12-06 16:18:45
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-21 19:41:16
 * @FilePath: \nevergiveup\JavaScripts\Game\Interact.ts
 * @Description: 修改描述
 */

import { InteractActions } from "../Actions";

let filterName = ["slot", "tower", "enemy"];
let interactableTags = ["tower"];
// let interactableTags = ["slot", "tower"];
export let CLICKEVENT = "CLICKEVENT"

@Component
export default class Interact extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */

    touch: TouchInput;
    trigger: Trigger;
    async onStart() {
        if (SystemUtil.isServer()) return;
        this.touch = new TouchInput();
        this.touch.onTouchEnd.add((index, location, type) => {
            // if (type == TouchInputType.TouchBegin) {
            console.log("触摸的GameObject tag是：" + this.onTouchBegin(index, location)?.tag);
            // }
        });

        let player = await Player.asyncGetLocalPlayer();
        this.trigger = await GameObject.asyncSpawn("Trigger") as Trigger;
        player.character.attachToSlot(this.trigger, HumanoidSlotType.Root);
        this.trigger.shape = TriggerShapeType.Sphere;
        this.trigger.localTransform.position = new Vector(0);
        this.trigger.worldTransform.scale = new Vector(3);
        this.trigger.onEnter.add((go: GameObject) => {
            if (!go) return;
            if (go.tag) {
                for (let tag of interactableTags) {
                    if (go.tag.startsWith(tag)) {
                        let index = +go.tag.substring(tag.length);
                        InteractActions.onInteract.call(tag, index);
                        return;
                    }
                }
            }
        });


        this.trigger.onLeave.add((go: GameObject) => {
            if (!go) return;
            if (go.tag) {
                for (let tag of interactableTags) {
                    if (go.tag.startsWith(tag)) {
                        let index = +go.tag.substring(tag.length);
                        InteractActions.onInteractEnd.call(tag, index);
                        //TODO @lxh 好好看看为啥退出游戏不触发
                        return;
                    }
                }
            }
        });
    }

    // 开始触摸屏幕，从此位置
    private onTouchBegin(index: number, location: Vector2): mw.GameObject {
        let objs = ScreenUtil.getGameObjectByScreenPosition(location.x, location.y, 10000, true, false);
        for (let obj of objs) {
            if (!obj || !obj.gameObject || !obj.gameObject.tag) continue;
            for (let name of filterName) {
                if (obj.gameObject.tag.startsWith(name)) {
                    Event.dispatchToLocal(CLICKEVENT, obj.gameObject);
                    return obj.gameObject;
                }
            }
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this.trigger.destroy();
        this.trigger = null;
    }
}