
import { oTrace } from "odin";
import { HUDModuleC } from "../module/HudModule/HUDModule";
import { PlayerActionType, SceneActionModuleC, SceneActionModuleS } from "../module/HudModule/SceneActionBaseModule";
import { util } from "../tool/Utils";
import { InteractiveHelper } from "./InteractiveObjs/InteractObject";



//交互玩家管理(前后端都有效)
class InteractPlayerMsg {
    /**交互物中的人 */
    private static playerSet: Set<number> = new Set();
    //玩家开始交互
    public static addPlayer(player: number | mw.Player): void {
        let playerId: number = this.getPlayerId(player);
        this.playerSet.add(playerId);
    }
    //玩家结束交互
    public static removePlayer(player: number | mw.Player): void {
        let playerId: number = this.getPlayerId(player);
        this.playerSet.delete(playerId);
    }
    //玩家是否正在交互
    public static has(player: number | mw.Player): boolean {
        let playerId: number = this.getPlayerId(player);
        return this.playerSet.has(playerId);
    }
    private static getPlayerId(player: number | mw.Player): number {
        if (player instanceof mw.Player) return player.playerId;
        return player;
    }
}
@util.AutoInit
export class InterHelperBuild {
    static init() {
        InteractiveHelper.addExitInteractiveListener = this.addExitInteractiveListener;
        InteractiveHelper.removeExitInteractiveListener = this.removeExitInteractiveListener;
        InteractiveHelper.showSelectUI = this.showSelectUI;
        InteractiveHelper.hideSelectUI = this.hideSelectUI;

        InteractiveHelper.activeConditions = this.activeConditions;
        InteractiveHelper.onPlayerAction = this.onPlayerAction;
        InteractiveHelper.onPlayInteract = this.onPlayInteract;
        InteractiveHelper.playInteractionEnable = this.playInteractionEnable;
        InteractiveHelper.onPandoraAnalytics = this.onPandoraAnalytics;
        InteractiveHelper.showTips = this.showTips;

        //多语言
        InteractiveHelper.getCDLanguage = this.getCDLanguage;
    }
    /**
     * 退出交互监听
     * @param type 类型 1-按钮退出 2-行走和跳跃退出
     * @param callback 
     */
    public static addExitInteractiveListener(type: number, callback: () => void) {
        ModuleService.getModule(HUDModuleC).addExitInteractiveListener(type, callback);
    }
    //取消退出交互监听
    public static removeExitInteractiveListener() {
        ModuleService.getModule(HUDModuleC).removeExitInteractiveListener();
    }

    //显示选择UI(Client)
    public static showSelectUI(icoList: string[], selectCallback: (index: number) => void) {

    }
    //关闭选择UI(Client)
    public static hideSelectUI() {
        //关闭
    }

    /**
     * 外部激活条件判断(Server)
     * @param param 自定义激活条件参数(就是SP_Active_Trigger喝SP_Active_UI中的“外部条件”)
     * @returns 是否激活
     */
    public static activeConditions(param: string): boolean {
        return true;
    }
    /**
     * 外部联动调用(Server)
     * @param playerId 玩家id
     * @param active 是否激活
     * @param activeParam 上个节点传递的参数
     * @param param 自定义参数(外部关联参数)
     */
    public static onPlayerAction(playerId: number, active: boolean, activeParam: any, param: string): boolean {
        oTrace(`外部关联 playerId=${playerId} active=${active} activeParam=${activeParam} param=${param} `);
        let arr = param.split(':');
        let type: string = arr[0];
        switch (type) {
            case "TakeProp"://获取道具

                break;
        }
        return true;
    }
    //设置一个玩家的交互状态(服务端)
    public static onPlayInteract(player: mw.Player | number, state: boolean) {
        if (state) {
            ModuleService.getModule(SceneActionModuleS).setPlayerAction(player, PlayerActionType.Interaction);
        } else {
            ModuleService.getModule(SceneActionModuleS).setPlayerAction(player, PlayerActionType.Free);
        }
    }
    //判断玩家当前的状态是否可以交互(服务器&客户端)
    public static playInteractionEnable(player: mw.Player | number): boolean {
        if (mw.SystemUtil.isServer()) {
            return !ModuleService.getModule(SceneActionModuleS).playerIsBusy(player);
        } else {
            return !ModuleService.getModule(SceneActionModuleC).playerIsBusy(player);
        }
    }
    /**
     * 潘多拉埋点(Client)
     * @param guid gameObject的guid
     * @param tag gameObject的tag
     * @param active 开始结束交互(true-开始 false-结束)
     * @param needExit 是否需要结束(如果为false，说明这个交互物没有退出)
     */
    public static onPandoraAnalytics(guid: string, tag: string, active: boolean, needExit: boolean) {

    }

    /**
     * 提示
     * @param text 
     */
    public static showTips(text: string): void {

    }

    /**
     * 获取CD中多语言
     * @param text 
     */
    public static getCDLanguage(): string {
        return "请稍等一会再试试吧！";
    }
}