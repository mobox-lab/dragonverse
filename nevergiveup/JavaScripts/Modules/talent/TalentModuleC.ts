import { JModuleC } from "../../depend/jibu-module/JModule";
import YoactArray from "../../depend/yoact/YoactArray";
import TalentModuleS from "./TalentModuleS";
import IUnique from "../../depend/yoact/IUnique";
import TalentModuleData from "./TalentModuleData";
import { GameConfig } from "../../config/GameConfig";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import Log4Ts from "mw-log4ts";
import { ETalentType } from "../../const/enum";
import { TalentTree } from "../../TalentTree/ui/TalentTree";
import { PlayerUtil } from "../PlayerModule/PlayerUtil";
import { StageActions } from "../../Actions";
import { TimerModuleUtils } from "../TimeModule/time";
import TalentUtils from "./TalentUtils";
import Utils from "../../Utils";

export class TalentItemUnique implements IUnique {
    public id: number;
    public index: number;

    public static arrayFromObject(data: TalentModuleData): TalentItemUnique[] {
        const result: TalentItemUnique[] = [];
        for (const key in data.talentMap) {
            const element = data.talentMap[key];
            result.push(new TalentItemUnique(Number(key), element));
        }
        return result;
    }

    constructor(id: number, index: number) {
        this.id = id;
        this.index = index;
    }

    public move(updated: this): boolean {
        let changed: boolean = false;
        if (this.index !== updated.index) {
            changed = true;
            this.index = updated.index;
        }

        return changed;
    }

    public primaryKey = (): number => this.id;

}

export default class TalentModuleC extends JModuleC<TalentModuleS, TalentModuleData> {
    private _playC: PlayerModuleC;
    public talentItemYoact: YoactArray<TalentItemUnique> = new YoactArray<TalentItemUnique>();

    private get playC(): PlayerModuleC | null {
        if (!this._playC) this._playC = ModuleService.getModule(PlayerModuleC);
        return this._playC;
    }

    protected onJStart(): void {
        super.onJStart();

        TimerModuleUtils.addOnlineDayListener(() => this.clearDailyCount(false), this);
        TimerModuleUtils.addLoginDayListener(() => this.clearDailyCount(true), this);
        this.talentItemYoact.setAll(TalentItemUnique.arrayFromObject(this.data));
    }

    private clearDailyCount(isSave: boolean) {
        this.data.dailyCount = 0;
        isSave && this.server.net_clearDailyCount();
    }

    /**
     * 检查是否足够消费
     * @param {number[]} nums
     * @returns {boolean}
     * @private
     */
    private checkEnoughCost(nums: number[]): boolean {
        const [gold, tech] = nums;
        const enoughGold = this.playC.checkGold(gold);
        const enoughTech = this.playC.checkTechPoint(tech);
        return enoughGold && enoughTech;
    }

    private selfSetItem(id: number, index: number = 0) {
        if (index < 0) return;
        const item = this.talentItemYoact.getItem(id);
        if (item) {
            item.index = index;
        } else {
            this.talentItemYoact.addItem(new TalentItemUnique(id, index));
        }
    }

    private checkUnlockLevel(unLockLevel: number) {
        const playerScript = PlayerUtil.getPlayerScript(Player.localPlayer.playerId);
        if (!playerScript) return false;
        return playerScript.level >= unLockLevel;
    }

    /**
     * 获取天赋解锁点数
     * @param {number} id
     * @returns {number}
     */
    public getTalentIndex(id: number): number {
        return this.talentItemYoact.getItem(id)?.index ?? 0;
    }

    public async tryTalentLevelUp(id: number) {
        const item = GameConfig.TalentTree.getElement(id);
        const level = this.getTalentIndex(id);
        const maxLevel = item.maxLevel;
        // 是否为最大等级
        if (level >= maxLevel) {
            TipsManager.showTips(GameConfig.Language.getElement("Text_Unlocked").Value);
            return false;
        }
        // TODO: 判断当前玩家等级是否能解锁
        const isEnoughLevel = this.checkUnlockLevel(item.unlockLevel);
        if (!isEnoughLevel) {
            TipsManager.showTips(Utils.Format(GameConfig.Language.Text_Tips_1.Value, item.unlockLevel));
            return false;
        }
        // 判断是否足够解锁
        const nextLv = level + 1;
        const updateCost = item.type === ETalentType.Base
            ? [item.cost[0][nextLv], item.cost[1][nextLv]]
            : [TalentUtils.calcExp4Lv(nextLv, item.cost[0][1], item.lvTimes), TalentUtils.calcExp4Lv(nextLv, item.cost[1][1], item.lvTimes)];
        const isEnoughCost = this.checkEnoughCost(updateCost);
        if (!isEnoughCost) {
            TipsManager.showTips(GameConfig.Language.getElement("Text_LessMaterial").Value);
            return false;
        }
        try {
            const result = await this.server.net_updateTalentLevel(id);
            if (!result) {
                TipsManager.showTips(GameConfig.Language.getElement("Text_Unlocked").Value);
                return false;
            }
            TipsManager.showTips(GameConfig.Language.getElement("Text_SuccessUnlock").Value);
            StageActions.onTalentActivate.call(id);
            return true;
        } catch (error) {
            Log4Ts.error(TalentModuleC, error);
            return false;
        }
    }

    public getTalentTotalUnlockCnt() {
        // return this.talentItemYoact.getAll().length;
        return this.talentItemYoact.getAll().reduce((acc, cur) => acc + (cur?.index ?? 0), 0);
    }

    public getDailyCount() {
        return this.data.dailyCount;
    }

    public async net_setItem(id: number, index: number) {
        this.selfSetItem(id, index);
        return true;
    }

    public net_updateTalentLevel(id: number) {
        const level = this.data.getTalentIndex(id);
        UIService.getUI(TalentTree).updatedCompleted(id, level);
    }
}





