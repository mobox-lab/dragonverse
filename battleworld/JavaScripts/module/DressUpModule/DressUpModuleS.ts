import { EModule_Events, EModule_Events_S, EPlayerEvents_S } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { DressUpInfo } from "../LandModule/PickUp/PickUpDressUp";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { SkillModuleS } from "../SkillModule/SkillModuleS";
import DressUpModuleC from "./DressUpModuleC";
import DressUpSync from "./DressUpSync";

/**
 * 换装服务端模块，主要处理限时换装道具的逻辑，获取道具时获得特殊技能、属性加成、新的外观、新的挂件，同时在时限结束需要进行还原
 */
export default class DressUpModuleS extends ModuleS<DressUpModuleC, null> {

    /** 记录了外观的属性同步脚本 */
    private _descUpSyncMap: Map<number, DressUpSync> = new Map();
    
    /** 记录了玩家正在使用的装扮信息 */
    private _dressUpInfoMap: Map<number, DressUpInfo> = new Map();
    /** 变身道具对属性加成的map */
    private _dressUpAttrMap: Map<number, Map<number, number>> = new Map();
    /** 记录了玩家在拾取有特殊技能的变装道具前，玩家的技能组，用于时间结束后恢复 */
    private _beforeDressUpSkillMap: Map<number, number[]> = new Map();

    /** 玩家模块 */
    private _playerModule: PlayerModuleS = null;
    /** 技能模块 */
    private _skillModule: SkillModuleS = null;

    /**
     * 监听变身请求，变身时间结束，初始化模块
     */
    protected onStart(): void {
        EventManager.instance.add(EModule_Events.land_pickUp_dressUp, this.listen_pickUp_dressUp_change, this);
        EventManager.instance.add(EModule_Events_S.pickUp_dressUp_timeout, this.listen_pickUp_dressUp_timeout, this);
        EventManager.instance.add(EPlayerEvents_S.player_deadState_s, this.listen_player_deadState, this);

        this._playerModule = ModuleService.getModule(PlayerModuleS);
        this._skillModule = ModuleService.getModule(SkillModuleS);
    }

    /**
     * 给新加入的玩家创建一个属性同步脚本
     * @param player 加入的玩家
     */
    protected async onPlayerEnterGame(player: mw.Player): Promise<void> {
        const playerId = player.playerId;
        if (this._descUpSyncMap.has(playerId)) {
            return;
        }
        let newScript = await mw.Script.spawnScript(DressUpSync, true);

        // 延迟下 ，客户端才会收到同步信息
        setTimeout(() => {
            newScript.server_init(playerId);
            newScript.server_setDescGuid("");
        }, 0);
        this._descUpSyncMap.set(playerId, newScript);
    }

    /**
     * 玩家离开游戏，删除管理的属性同步脚本
     * @param player 离开的玩家
     */
    protected onPlayerLeft(player: mw.Player): void {
        let playerId = player.playerId;
        if (this._descUpSyncMap.has(playerId) == false) {
            return;
        }
        this.listen_pickUp_dressUp_timeout(playerId);
        const sync = this._descUpSyncMap.get(playerId);
        if (sync) {
            sync.server_setCountdown(0);
            sync.destroy();
        }
        this._descUpSyncMap.delete(playerId);
        this._dressUpInfoMap.delete(playerId);
    }

    /**
     * 监听玩家捡起一个换装的道具（道具可能不会让其换装）
     * @param playerId 玩家id
     * @param dressUpInfo 换装需要影响到的数据信息
     */
    private listen_pickUp_dressUp_change(playerId: number, dressUpInfo: DressUpInfo) {
        if (!dressUpInfo) return;
        const sync = this._descUpSyncMap.get(playerId);
        sync?.server_setCountdown(Globaldata.land_dressup_duration);
        //替换特殊技能
        this.replaceSpecialSkills(playerId, dressUpInfo.skillIds);
        //记录一下当前这个道具
        this._dressUpInfoMap.set(playerId, dressUpInfo);
        //修改属性，并记录
        this.handleAddAttr(playerId, dressUpInfo);
        if (dressUpInfo.descGuid) {
            //修改外观
            sync?.server_setDescGuid(dressUpInfo.descGuid);
        }
        if (dressUpInfo.pendantId) {
            //修改挂件
            sync?.server_setPendentId(dressUpInfo.pendantId);
        }
    }

    /**
     * 处理属性相关
     * @param playerId 玩家id
     * @param dressUpInfo 装扮信息
     */
    private handleAddAttr(playerId: number, dressUpInfo: DressUpInfo) {
        if (dressUpInfo.attributeParams && dressUpInfo.attributeParams.length > 0) {
            let dressAttrInfo = this._dressUpAttrMap.get(playerId);
            if (!dressAttrInfo) {
                dressAttrInfo = new Map();
                this._dressUpAttrMap.set(playerId, dressAttrInfo);
            } else if (dressAttrInfo.size > 0) {
                //需要先扣掉属性
                for (let [attributeID, value] of dressAttrInfo) {
                    if (value > 0) {
                        this._playerModule.reducePlayerAttr(playerId, attributeID, value);
                    }
                }
                dressAttrInfo.clear();
            }
            for (let i = 0; i < dressUpInfo.attributeParams.length; i++) {
                const attributeParams = dressUpInfo.attributeParams[i];
                //加成
                this._playerModule.addPlayerAttr(playerId, attributeParams.attributeID, attributeParams.attributeValue);
                //记录
                let addValue = dressAttrInfo.get(attributeParams.attributeID);
                if (addValue == null || addValue == undefined) {
                    addValue = 0;
                }
                addValue = attributeParams.attributeValue;
                dressAttrInfo.set(attributeParams.attributeID, addValue);
            }
            //加成的属性
            // for (let i = 0; i < dressUpInfo.attributeParams.length; i++) {
            //     console.error(`rkc--------------attr:${dressUpInfo.attributeParams[i].attributeID}=${this._playerModule.getPlayerAttr(playerId, dressUpInfo.attributeParams[i].attributeID)}`);
            //     console.error(`rkc--------------record:${this._dressUpAttrMap.get(playerId).get(dressUpInfo.attributeParams[i].attributeID)}`);
            // }
        }
    }

    /**
     * 玩家的装扮时间结束
     * @param playerId 玩家id
     */
    private listen_pickUp_dressUp_timeout(playerId: number) {
        const info = this._dressUpInfoMap.get(playerId);
        if (info) {
            //清除装扮
            const sync = this._descUpSyncMap.get(playerId);
            sync?.server_setDescGuid("");
            //清除挂件
            sync?.server_setPendentId(0);
            this._dressUpInfoMap.delete(playerId);

            //清除特殊技能
            if (info && info.skillIds && info.skillIds.length > 0) {
                this._skillModule.discardAllCurEquipSkills(playerId);
                //还原技能
                const originalSkills = this._beforeDressUpSkillMap.get(playerId);
                if (originalSkills) {
                    for (let i = 0; i < originalSkills.length; i++) {
                        this._skillModule.selectSkillLibId(playerId, originalSkills[i]);
                    }
                    this._beforeDressUpSkillMap.delete(playerId);
                }
            }
        }
        //清除增益
        this.clearAddValue(playerId, this._dressUpAttrMap);
    }

    /**
     * 清除指定玩家增益的map记录属性
     * @param playerId 玩家id
     * @param addAttrMap 需要清除的map
     */
    public clearAddValue(playerId: number, addAttrMap: Map<number, Map<number, number>>) {
        const info = addAttrMap.get(playerId);
        if (info) {
            for (let [attributeID, addSumValue] of info) {
                this._playerModule.reducePlayerAttr(playerId, attributeID, addSumValue);
                info.set(attributeID, 0);
            }
        }
    }

    /**
     * 特殊技能替换
     * @param playerId 玩家id
     * @param skillIds 特殊技能
     */
    private replaceSpecialSkills(playerId: number, skillIds: number[]) {
        if (!skillIds || skillIds.length <= 0) return;
        const info = this._dressUpInfoMap.get(playerId);
        if (!info) {
            //记一下技能，用于后续恢复
            const skills = this._skillModule.getCurEquipSkillLibIds(playerId);
            if (skills) {
                const originalSkills = [];
                for (let i = 0; i < skills.length; i++) {
                    originalSkills.push(skills[i]);
                }
                this._beforeDressUpSkillMap.set(playerId, originalSkills);
            }
        }
        //卸掉这一套技能
        this._skillModule.discardAllCurEquipSkills(playerId);
        //换上一套新的技能
        for (let i = 0; i < skillIds.length; i++) {
            this._skillModule.selectSkillLibId(playerId, skillIds[i]);
        }
    }

    /**
     * 玩家死亡，如果是在变身效果中，需要取消
     * @param playerId 玩家id
     * @param sceneID 
     */
    private listen_player_deadState(playerId: number, sceneID: number) {
        this._beforeDressUpSkillMap.delete(playerId);
        this.listen_pickUp_dressUp_timeout(playerId);
        const sync = this._descUpSyncMap.get(playerId);
        if (sync) {
            sync.server_setCountdown(0);
        }
        this._dressUpInfoMap.delete(playerId);
    }
}