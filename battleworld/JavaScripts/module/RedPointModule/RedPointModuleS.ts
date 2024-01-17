import { EModule_Events_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { ERedPointPath, RedPointModuleC } from "./RedPointModuleC";













/**红点模块*/
export class RedPointModuleS extends ModuleS<RedPointModuleC, null>{


    protected onStart(): void {
        EventManager.instance.add(EModule_Events_S.changeRedDotNum, this.changeRedDotNum.bind(this));
        EventManager.instance.add(EModule_Events_S.changeRedDotState, this.changeRedDotState.bind(this));
    }

    /**
     * 修改一个红点节点的当前值
     * @playerid 玩家id
     * @param redDotPath 使用"/"作为分隔符的红点节点路径
     * @param newValue 新的红点值
     * @returns 修改成功返回true，修改失败或值没有变化返回false
     */
    private changeRedDotNum(playerid: number, redDotPath: ERedPointPath, newValue: number) {
        let player = Player.getPlayer(playerid);
        if (!player) {
            return
        }
        this.getClient(playerid).net_changeRedDotNum(redDotPath, newValue);
    }

    /**
     * 修改一个红点节点的值，新的值非0即1。可以认为是changeRedDotNum()的便利方法
     * @playerid 玩家id
     * @param redDotPath 使用"/"作为分隔符的红点节点路径
     * @param newValue 新的红点显示状态，true即显示（值为1），false即不显示（值为0）
     * @returns 
     */
    private changeRedDotState(playerid: number, redDotPath: ERedPointPath, newValue: boolean) {
        let player = Player.getPlayer(playerid);
        if (!player) {
            return
        }
        this.getClient(playerid).net_changeRedDotState(redDotPath, newValue);
    }

}