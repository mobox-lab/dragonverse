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
    private buffs: GlobalEnum.BuffType[] = [];
    // 每十秒从服务端获取一次buff
    private buffTimer: number = 10;

    onEnterScene(sceneType: number): void {
        this.init();
        this.registerEvent();
    }

    async onUpdate(dt: number) {
        this.buffTimer -= dt;
        if (this.buffTimer <= 0) {
            this.buffTimer = 10;
            let str = await this.server.net_getBuff();
            if (!StringUtil.isEmpty(str)) {
                let obj = this.parse(str);
                MapEx.forEach(obj, (type: GlobalEnum.BuffType, time: number) => {
                    this.buffUI.setBuffTime(Number(type), time);
                });
            }
        }
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
    public addBuff(type: GlobalEnum.BuffType, time: number, isRpc: boolean = true) {
        if (time <= 0 || isNaN(time)) return;

        if (this.buffs.includes(type)) {
            this.buffUI.addBuffTime(type, time);
            if (isRpc) this.server.net_addBuffTime(type, time);
            oTrace(`修改buff时间 .............`, type, time);
            return;
        }

        let ele = this.getBuffElement(type);
        oTrace(`增加一个buff `, type, ele);
        this.buffUI.addBuff(new BuffInfo(ele.name, ele.PicGuid, type, time));
        this.startBuff(type);
        this.buffs.push(type);
        if (isRpc) {
            this.server.net_addBuff(type, time);
        }
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
        this.server.net_removeBuff(type);
    }

    /**
     * 根据buff类型获取对应的element
     */
    private getBuffElement(type: GlobalEnum.BuffType) {
        let ele: IBuffElement = null;
        switch (Number(type)) { // buffInfo里边传的字符串类型，这里要转成number
            case GlobalEnum.BuffType.LuckyPotion:
                ele = GameConfig.Buff.getElement(3);
                break;
            case GlobalEnum.BuffType.SuperLuckyPotion:
                ele = GameConfig.Buff.getElement(4);
                break;
            case GlobalEnum.BuffType.ThreeTimesDamage:
                ele = GameConfig.Buff.getElement(2);
                break;
            case GlobalEnum.BuffType.ThreeTimesGold:
                ele = GameConfig.Buff.getElement(1);
                break;
        }
        return ele;
    }

    /**
     * 开启buff
     */
    private startBuff(type: GlobalEnum.BuffType) {
        switch (Number(type)) {
            case GlobalEnum.BuffType.LuckyPotion:
                GlobalData.Buff.curSmallLuckyBuff = GlobalData.Buff.smallLuckyPotion;
                break;
            case GlobalEnum.BuffType.SuperLuckyPotion:
                GlobalData.Buff.curSuperLuckyBuff = GlobalData.Buff.superLuckyPotion;
                break;
            case GlobalEnum.BuffType.ThreeTimesDamage:
                GlobalData.Buff.damageBuff = 3;
                break;
            case GlobalEnum.BuffType.ThreeTimesGold:
                GlobalData.Buff.goldBuff = 3;
                break;
        }
    }

    /**
     * 结束buff
     */
    private stopBuff(type: GlobalEnum.BuffType) {
        switch (Number(type)) {
            case GlobalEnum.BuffType.LuckyPotion:
                GlobalData.Buff.curSmallLuckyBuff = [0, 0];
                break;
            case GlobalEnum.BuffType.SuperLuckyPotion:
                GlobalData.Buff.curSuperLuckyBuff = [0, 0]
                break;
            case GlobalEnum.BuffType.ThreeTimesDamage:
                GlobalData.Buff.damageBuff = 1;
                break;
            case GlobalEnum.BuffType.ThreeTimesGold:
                GlobalData.Buff.goldBuff = 1;
                break;
        }
    }

    /**
     * 进入游戏add玩家buff
     */
    public net_addPlayerBuff(buffs: GlobalEnum.BuffType[], times: number[]) {
        for (let i = 0; i < buffs.length; i++) {
            this.addBuff(buffs[i], times[i], false);
        }
    }
}