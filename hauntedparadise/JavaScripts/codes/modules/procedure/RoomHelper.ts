/*
 * @Author       : dal
 * @Date         : 2023-11-16 17:05:00
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-04 18:27:16
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\RoomHelper.ts
 * @Description  : 
 */
import ItemPointScript from "./component/ItemPointScript";

export class Room {
    public items: ItemPointScript[] = [];

}

export class RoomHelper {
    private static _instance: RoomHelper;
    public static get instance(): RoomHelper {
        if (!this._instance) {
            this._instance = new RoomHelper();
        }
        return this._instance;
    }

    public roomMap: Map<number, Room> = new Map<number, Room>();

    // public registerRoomTrigger(triggerScript: RoomTriggerScript) {
    //     let room = this.getRoom(triggerScript.roomType);
    //     room.triggerScript = triggerScript;
    // }
    public registerItemPoint(itemPoint: ItemPointScript) {
        let room = this.getRoom(itemPoint.roomType);
        room.items.push(itemPoint);
    }

    public getRoom(roomId: number): Room {
        if (!this.roomMap.has(roomId)) {
            this.roomMap.set(roomId, new Room());
        }
        return this.roomMap.get(roomId);
    }
}