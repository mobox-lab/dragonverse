/*
 * @Author       : dal
 * @Date         : 2024-03-06 17:21:48
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-07 14:41:23
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\buff\BuffModule.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import { EBuffType } from "./BuffDefine";
import { BuffScript } from "./BuffScript";

export class BuffModuleC extends ModuleC<BuffModuleS, null> {

    private myBuff: BuffScript

    public static get buffList() {
        return ModuleService.getModule(this).myBuff.buffList;
    }

    public static get attr() {
        return ModuleService.getModule(this).myBuff.playerAttr;
    }

    public registerState(script: BuffScript) {
        this.myBuff = script;
    }

    public get script() {
        return this.myBuff;
    }

    /**
     * 请求添加buff
     * @param buffId 配置id
     * @param addCount 添加数量
     */
    public reqAddBuff(buffId: number, addCount: number = 1) {
        if (!GameConfig.Item.getElement(buffId)) { return; }
        this.server.net_reqAddBuff(this.localPlayer.userId, buffId, addCount);
    }

    /** 拿到某一个buff */
    public getBuff(buffType: EBuffType) {
        return this.myBuff.buffList.find(v => { return v.type === buffType });
    }

    /** 检查某一个buff是否存在 */
    public checkBuffExist(buffType: EBuffType) {
        return this.getBuff(buffType) != undefined;
    }

    /**
     * 检查某一个类型的buff 效果是否冲突
     * @param buffType 
     * @param newVal 新的效果值
     * @returns 冲突了返回 true, and false otherwise
     */
    public checkValConflict(buffType: EBuffType, newVal: number) {
        return this.checkBuffExist(buffType) && this.getBuff(buffType).value != newVal;
    }
}

export class BuffModuleS extends ModuleS<BuffModuleC, null> {

    public static getAttr(userId: string) {
        return ModuleService.getModule(this).getScript(Player.getPlayer(userId)).playerAttr;
    }

    @Decorator.noReply()
    public net_reqAddBuff(userId: string, buffId: number, addCount: number) {
        let player = Player.getPlayer(userId);
        if (!player) {
            player = this.currentPlayer;
            if (!player) { return; }
        }
        const buffScript = this.getScript(player);
        buffScript.server_addBuff(buffId, addCount);
    }

    private scripMap: Map<string, BuffScript> = new Map();

    protected onPlayerEnterGame(player: mw.Player): void {
        this.getScript(player).server_loadBuff();
    }

    protected onPlayerLeft(player: mw.Player): void {
        this.scripMap.delete(player.userId);
    }

    public getScript(player: Player): BuffScript {
        const userId: string = player.userId;
        let script = this.scripMap.get(userId);
        if (!script) {
            script = player.getPlayerState(BuffScript);
            script.userId = userId;
        }
        return script;
    }
}