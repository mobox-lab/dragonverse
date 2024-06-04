/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-14 15:24:15
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 17:50:46
 * @FilePath     : \nevergiveup\JavaScripts\Modules\PlayerModule\PlayerModuleC.ts
 * @Description  : 修改描述
 */

import { PlayerActions, TechTreeActions } from "../../Actions";
import { TechTree } from "../../TechTree/TechTree";
import LobbyUI from "../../UI/LobbyUI";
import SettingUI from "../../UI/SettingUI";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import { GameConfig } from "../../config/GameConfig";
import { ItemType } from "../../tool/Enum";
import { FirstEvent, MGSTool } from '../../tool/MGSTool';
import { VoiceEvent } from "../../tool/SoundUtil";
import { TimerModuleUtils } from "../TimeModule/time";
import PlayerModuleData from "./PlayerModuleData";
import { PlayerModuleS } from "./PlayerModuleS";

export default class PlayerModuleC extends ModuleC<PlayerModuleS, PlayerModuleData> {
    techTree: TechTree;
    private _enemyCount: number = 0;
    protected onEnterScene(sceneType: number): void {
        this.data.onDataChange.add(() => {
            PlayerActions.onPlayerDataChanged.call();
        });
        UIService.show(LobbyUI);
        this.techTree = new TechTree();
        this.updateCurrency();
        TimerModuleUtils.addOnlineDayListener(() => this.clearDailyCount(false), this);
        TimerModuleUtils.addLoginDayListener(() => this.clearDailyCount(true), this);
        UIService.getUI(SettingUI)["attackSelect" + (this.data.attackVoiceFactor > 0 ? "False" : "True")].onClicked.broadcast();
        UIService.getUI(SettingUI)["bgmSelect" + (this.data.bgmVoiceFactor > 0 ? "False" : "True")].onClicked.broadcast();

        Event.addLocalListener(VoiceEvent.Bgm, (value: number) => {
            this.data.bgmVoiceFactor = value;
            this.server.net_saveSetting(this.data.bgmVoiceFactor, this.data.attackVoiceFactor)
        })

        Event.addLocalListener(VoiceEvent.Attack, (value: number) => {
            this.data.attackVoiceFactor = value;
            this.server.net_saveSetting(this.data.bgmVoiceFactor, this.data.attackVoiceFactor)
        })
    }

    private clearDailyCount(isSave: boolean) {
        this.data.completeStageCount.daily = 0;
        this.data.killEnemyCount.daily = 0;
        isSave && this.server.net_SaveSumCount(this.data.completeStageCount.sum, this.data.completeStageCount.daily,
            this.data.killEnemyCount.sum, this.data.killEnemyCount.daily);
    }

    public onEnemyKilled() {
        this._enemyCount++;
        MGSTool.doFirstEvent(FirstEvent.CoreStep3);
    }

    public onStageCompleted() {
        this.data.completeStageCount.sum = this.data.completeStageCount.sum + 1;
        this.data.completeStageCount.daily = this.data.completeStageCount.daily + 1;
        this.data.killEnemyCount.sum = this.data.killEnemyCount.sum + this._enemyCount;
        this.data.killEnemyCount.daily = this.data.killEnemyCount.daily + this._enemyCount;
        this.server.net_SaveSumCount(this.data.completeStageCount.sum, this.data.completeStageCount.daily,
            this.data.killEnemyCount.sum, this.data.killEnemyCount.daily);
        this._enemyCount = 0;
    }


    /**
     * 是否第一次做某事
     * @param action 名字
     * @returns 是否有做过
     */
    public hasFirstAction(action: string): boolean {
        return this.data.firstAction.indexOf(action) != -1;
    }

    /**
     * 设置第一次做某事
     * @param action 
     */
    public setFirstAction(action: string) {
        // if (!await this.hasFirstAction(action))
        this.data.firstAction.push(action);
        this.server.net_setFirstAction(action);
    }

    public get gold(): number {
        return this.data.gold;
    }

    public get unlockTechNodes() {
        return this.data.unlockedTechNodes;
    }

    public async getUnlockTechNodeMap(playerIds: number[]) {
        return await this.server.net_getUnlockedTechNodes(playerIds);
    }

    public getUnlockTechNodes(nodeMap: { [key: number]: number[] }) {
        // map it to id : count
        let map = {};
        for (let key of Object.keys(nodeMap)) {
            let nodes = nodeMap[key];
            for (let i = 0; i < nodes.length; i++) {
                if (map[nodes[i]]) {
                    map[nodes[i]]++;
                }
                else {
                    map[nodes[i]] = 1;
                }
            }
        }
        return map;
    }

    updateCurrency() {
        PlayerActions.onPlayerDataChanged.call();
    }

    /**
     * 判断当前的钱是否够花
     * @param gold 要花的金币
     * @returns 够不够
     */
    public checkGold(gold: number) {
        if (this.data.gold >= gold) {
            return true;
        }
        return false;
    }

    /**
     * 判断当前的钱是否够花
     * @param gold 要花的金币
     * @returns 够不够
     */
    public checkTechPoint(techPoint: number) {
        if (this.data.techPoint >= techPoint) {
            return true;
        }
        return false;
    }

    /**
     * 判断物品是否足够
     */
    public checkItem(itemCfg: number[]) {
        let [id, amount] = itemCfg;
        let item = GameConfig.Item.getElement(id);
        if (item.itemType == ItemType.Gold) {
            return this.checkGold(amount);
        }
        else if (item.itemType == ItemType.TechPoint) {
            return this.checkTechPoint(amount);
        }
        return false;
    }

    /**
     * 解锁科技树节点
     */
    public async tryUnlockTechNode(id: number) {
        if (this.data.unlockedTechNodes.indexOf(id) == -1) {
            let cfg = GameConfig.TechTree.getElement(id);
            if (this.checkEnouthItems(cfg.Cost)) {
                let success = await this.server.net_checkEnouthItems(this.localPlayer, cfg.Cost);
                if (success) {
                    this.data.unlockedTechNodes.push(id);
                    let unlocked = await this.server.net_unlockTechNode(this.localPlayer, id);
                    if (unlocked) {
                        TipsManager.showTips(GameConfig.Language.getElement("Text_SuccessUnlock").Value);
                        TechTreeActions.onItemUnlocked.call(id);
                        MGSTool.unlockTech(id);
                        MGSTool.costMGS(cfg.Cost, 9);
                    }
                    else {
                        TipsManager.showTips(GameConfig.Language.getElement("Text_Unlocked").Value);
                    }
                }
                else {
                    TipsManager.showTips(GameConfig.Language.getElement("Text_LessMaterial").Value);
                }
            }
            else {
                TipsManager.showTips(GameConfig.Language.getElement("Text_LessMaterial").Value);
            }
        }
    }


    public checkEnouthItems(items: number[][]) {
        let flag = true;
        for (let i = 0; i < items.length; i++) {
            if (!this.checkItem(items[i])) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    public hasFirstMonsterTag(tagId: number) {
        return this.data.firstMonsterTags.indexOf(tagId) != -1;
    }

    /**
     * 设置第一次做某事
     * @param action 
     */
    public setFirstMonsterTag(tagId: number) {
        // if (!await this.hasFirstAction(action))
        this.data.firstMonsterTags.push(tagId);
        this.server.net_setFirstMonsterTag(tagId);
    }

}