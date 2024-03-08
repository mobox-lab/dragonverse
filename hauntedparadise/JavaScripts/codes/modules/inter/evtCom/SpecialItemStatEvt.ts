import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
import { RegisterEvt } from "./IEvtCom";
/**
 * 改变玩家当前的嗑药状态
 */
@RegisterEvt
export class SpecialItemStatEvt{
    public static evtName: string = "evt_specialItemStatEvt";
    evtName: string = "evt_specialItemStatEvt";

    private _curStatTime: number;

    public constructor() { 
        this._curStatTime = 0;
        TimeUtil.onEnterFrame.add((dt: number) => { 
            if (this._curStatTime <= 0) { 
                return;
            }
            this._curStatTime -= dt;
            if (this._curStatTime <= 0) { 
                BoardHelper.ChangeKeyValue(BoardKeys.SpeicialItemStat, "");
                console.log("嗑药状态结束拉")
            }
        })
    }

    /**
     * 当接受到相应事件的时候
     * @param goid 通用gameObjectId，在这里没有使用
     * @param safeType 新的嗑药状态
     * @param time 嗑药状态会持续的时间
     */
    onGetCall(goid: string, safeType: string, time: string) {
        this._curStatTime = Number(time);
        BoardHelper.ChangeKeyValue(BoardKeys.SpeicialItemStat, safeType);
        console.log("玩家嗑药了,嗑药状态为" + safeType, "持续时间为" + time)
    } 
}
