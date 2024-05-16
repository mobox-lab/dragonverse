import { MapEx, oTrace } from "odin";
import { GlobalEnum } from "../../const/Enum";
import { BuffData } from "./BuffData";
import { BuffModuleS } from "./BuffModuleS";
import { BuffInfo } from "./ui/BuffItem";
import { P_Game_Buff } from "./ui/P_Game_Buff";
import { GameConfig } from "../../config/GameConfig";
import { IBuffElement } from "../../config/Buff";
import { GlobalData } from "../../const/GlobalData";

export class BuffModuleC extends ModuleC<BuffModuleS, BuffData> {

    // buffUI
    private buffUI: P_Game_Buff;
    // 玩家当前获得的buff
    private buffs: number[] = [];

    onEnterScene(sceneType: number): void {
        this.init();
        this.registerEvent();
    }

    async onUpdate(dt: number) {

    }

    /**
     * 字符串转对象
     */
    private parse(str: string) {
        let obj = {};
        let arr = str.split("|");
        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i].split(":");
            obj[temp[0]] = temp[1];
        }
        return obj;
    }

    /**
     * 初始化
     */
    private init() {
        this.buffUI = mw.UIService.getUI(P_Game_Buff);
        this.buffUI.show();
    }

    /**
     * 注册事件
     */
    private registerEvent() {
        this.buffUI.onBuffEndAction.add(this.onBuffEnd, this);
    }

    /**
     * 增加一个buff
     * @param type 药水类型
     * @param time 有效时间
     */
    public addBuff(buffId: number) {
        if (this.buffs.includes(buffId)) {
            return;
        }
        let ele = GameConfig.Buff.getElement(buffId);
        if (ele == null) {
            console.error("addBuff ele == null");
            return;
        }
        oTrace(`增加一个buff `, buffId);
        this.buffUI.addBuff(new BuffInfo(ele.name, ele.PicGuid, buffId));
        this.startBuff(buffId);
        this.buffs.push(buffId);
    }

    /**
     * buff结束
     */
    private onBuffEnd(type: GlobalEnum.BuffType) {
        let index = this.buffs.indexOf(type);
        oTrace(`buff 结束 ==== `, index);
        if (index != -1) {
            this.buffs.splice(index, 1);
        }
        this.stopBuff(type);
    }

    /**
     * 开启buff
     */
    private startBuff(buffId: number) {
        let cfg = GameConfig.Buff.getElement(buffId);
        if (cfg == null) {
            console.error("startBuff ele == null");
            return;
        }
        if (cfg.type == null || cfg.param == null) {
            console.error("startBuff cfg.type == null||cfg.param == null");
            return;
        }
        switch (Number(cfg.type)) {
            case GlobalEnum.BuffType.Gold:
                GlobalData.Buff.goldBuff = 1 + cfg.param / 100;
                break;
            case GlobalEnum.BuffType.Damage:
                GlobalData.Buff.damageBuffMap.set(Player.localPlayer.playerId, 1 + cfg.param / 100);
                break;
            default:
                break;
        }
        console.log("startBuff=========", cfg.type, cfg.param);
    }

    /**
     * 结束buff
     */
    private stopBuff(buffId: number) {
        let cfg = GameConfig.Buff.getElement(buffId);
        if (cfg == null) {
            console.error("startBuff ele == null");
            return;
        }

        if (cfg.type == null || cfg.param == null) {
            console.error("startBuff cfg.type == null||cfg.param == null");
            return;
        }
        switch (Number(cfg.type)) {
            case GlobalEnum.BuffType.Damage:
                GlobalData.Buff.damageBuffMap.set(Player.localPlayer.playerId, 1);
                break;
            case GlobalEnum.BuffType.Gold:
                GlobalData.Buff.goldBuff = 1;
                break;
        }
    }

    /**
     * 进入游戏add玩家buff
     */
    public net_addPlayerBuff(buffIds: number[]) {
        for (let i = 0; i < buffIds.length; i++) {
            this.addBuff(buffIds[i]);
        }
    }
}