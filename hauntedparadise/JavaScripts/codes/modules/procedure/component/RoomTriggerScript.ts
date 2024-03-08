/*
 * @Author: chen.liang chen.liang@appshahe.com
 * @Date: 2023-10-10 18:32:24
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-10-11 14:10:30
 * @FilePath: \catcompanion\JavaScripts\modules\procedure\component\RoomTriggerScript.ts
 * @Description: 
 */

import { RoomHelper } from "../RoomHelper";
import { Event_GameEnd, Event_RoomTriggerEnter, Event_RoomTriggerLeave } from "../const/Events";

@Component
export default class RoomTriggerScript extends mw.Script {
    /**
     * 房间类型
     */
    @mw.Property({ displayName: "房间类型" })
    public roomType: number = 0;

    public trigger: mw.Trigger
    /** 房间内玩家*/
    public playerIds: number[] = [];

    protected onStart(): void {
        if (!this.gameObject) {
            console.error("[RoomTriggerScript] 配置错误，没有父节点" + this.guid)//.gameObjectId)
        }
        this.gameObject.asyncReady().then(go => {
            this.trigger = this.gameObject as Trigger;
            if (!this.trigger) {
                console.error("RoomTriggerScript: trigger is null", this.gameObject.gameObjectId)
                return;
            }

            this.trigger.onEnter.add((char: mw.Character) => {
                if (!char?.player) return;
                const playerId = char.player.playerId;
                // if (SystemUtil.isClient() && playerId != Player.localPlayer.playerId) return;
                Event.dispatchToLocal(Event_RoomTriggerEnter, this.roomType, playerId);
                this.playerIds.push(playerId);
            });

            this.trigger.onLeave.add((char: mw.Character) => {
                if (!char?.player) return;
                const playerId = char.player.playerId;
                // if (SystemUtil.isClient() && playerId != Player.localPlayer.playerId) return;
                Event.dispatchToLocal(Event_RoomTriggerLeave, this.roomType, playerId);
                this.playerIds.splice(this.playerIds.indexOf(playerId), 1);
            });
            Event.addLocalListener(Event_GameEnd, () => {
                this.playerIds = [];
            });

            //RoomHelper.instance.registerRoomTrigger(this);
        })
    }
}
