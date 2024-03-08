/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2023-10-09 17:44:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2023-10-12 19:07:06
 * @FilePath: \catcompanion\JavaScripts\modules\controller\TriggerController.ts
 * @Description: 
 */

import { InterEvtData } from "../inter/ObjInterDefine";

@Serializable
class TriggerEvtData {
    @mw.Property({ displayName: "判断是否是当前玩家" })
    public isCurPlayer: boolean = false;
    @mw.Property({ displayName: "是否发送触发器检测到物体的Guid" })
    public isSendCheckObjGuid: boolean = false;
    @mw.Property({ displayName: "检测物体Tag" })
    public tagName: string = "";
    @mw.Property({ displayName: "发送事件" })
    public evtData: InterEvtData[] = [new InterEvtData()];
}

@Component
export default class TriggerController extends mw.Script {
    @mw.Property({ group: "全局配置", displayName: "进入触发器检测数据" })
    public enterEvtDataArr: TriggerEvtData[] = [new TriggerEvtData];
    @mw.Property({ group: "全局配置", displayName: "离开触发器检测数据" })
    public leaveEvtDataArr: TriggerEvtData[] = [new TriggerEvtData];

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        let trigger = this.gameObject as Trigger;
        trigger.onEnter.add((go) => {
            if (!Player.localPlayer) {
                return;
            }
            this.enterEvtDataArr.forEach(e => {
                if ((e.tagName != "" && go.tag == e.tagName) || (e.isCurPlayer && go == Player.localPlayer.character)) {
                    if (e.isSendCheckObjGuid) {
                        e.evtData.forEach((evt) => {
                            Event.dispatchToLocal(evt.evtName, go.gameObjectId, ...evt.params);
                        })
                    } else {
                        e.evtData.forEach((evt) => {
                            Event.dispatchToLocal(evt.evtName, evt.targetGuid, ...evt.params);
                            console.log(this.gameObject.gameObjectId)
                            console.log("dispatchLocal" + evt.evtName + ":" + evt.targetGuid + "_" + evt.params);
                        })
                    }
                }
            });
        })

        trigger.onLeave.add((go) => {
            if (!Player.localPlayer) {
                return;
            }
            if (!go) {
                return;
            }
            this.leaveEvtDataArr.forEach(e => {
                if ((e.tagName != "" && go.tag == e.tagName) || (e.isCurPlayer && go == Player.localPlayer.character)) {
                    if (e.isSendCheckObjGuid) {
                        e.evtData.forEach((evt) => {
                            Event.dispatchToLocal(evt.evtName, go.gameObjectId, ...evt.params);
                        })
                    } else {
                        e.evtData.forEach((evt) => {
                            Event.dispatchToLocal(evt.evtName, evt.targetGuid, ...evt.params);
                            console.log(this.gameObject.gameObjectId)
                            console.log("dispatchLocal" + evt.evtName + ":" + evt.targetGuid + "_" + evt.params);
                        })
                    }
                }
            });
        })
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

    }
}