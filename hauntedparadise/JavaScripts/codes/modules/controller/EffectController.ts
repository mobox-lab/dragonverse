/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2023-10-09 17:44:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2023-10-11 10:40:03
 * @FilePath: \catcompanion\JavaScripts\modules\controller\EffectController.ts
 * @Description: 
 */

import { InterEvtNameDef } from "../inter/ObjInterDefine";

@Component
export default class EffectController extends mw.Script {
    @mw.Property({ group: "全局设置", displayName: "特效闪烁间隙/S" })
    public intervalTime: number = 0;
    private _intervalHandler: any = null;
    public effectPlaying: boolean = false;
    public effect: mw.Effect;
    /**监听事件arr */
    private _listenerArr: mw.EventListener[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            this.effect = this.gameObject as mw.Effect;
            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.effectEvtName, (guid: string, isPlay: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    this.playEffect(isPlay == "true")
                }
            }));
        }
    }

    public playEffect(isPlay: boolean) {
        if (this._intervalHandler) {
            clearInterval(this._intervalHandler);
            this._intervalHandler = null;
        }
        this.effectPlaying = isPlay;
        if (isPlay) {
            this.effect.play();
            this.effectPlaying = true;
            if (this.intervalTime) {
                this._intervalHandler = setInterval(() => {
                    if (this.effectPlaying) {
                        this.effect.stop();
                    } else {
                        this.effect.play();
                    }
                    this.effectPlaying = !this.effectPlaying;
                }, this.intervalTime * 1000)
            }
        } else {
            this.effect.stop();
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
        this._listenerArr.forEach(e => {
            e.disconnect();
        })
    }
}