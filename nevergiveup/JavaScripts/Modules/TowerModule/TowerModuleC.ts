/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-05 17:42:04
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-04 10:13:48
 * @FilePath     : \nevergiveup\JavaScripts\Modules\TowerModule\TowerModuleC.ts
 * @Description  : 修改描述
 */
/*
 * @Author: shifu.huang
 * @Date: 2023-02-08 14:41:36
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-22 14:57:08
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\TowerModuleC.ts
 * @Description: 塔模块C
 */

import { InteractActions, StageActions, TowerActions } from "../../Actions";
import { CLICKEVENT } from "../../Game/Interact";
import { GameManager } from "../../GameManager";
import { GuideManager, GuideState } from "../../Guide/GuideManager";
import { MapManager } from "../../MapScript";
import { EStageState } from "../../StageEnums";
import { TweenCommon } from "../../TweenCommon";
import { TipsManager } from "../../UI/Tips/CommonTipsManagerUI";
import TowerInfoUI from "../../UI/Tower/TowerInfoUI";
import TowerShopUI from "../../UI/Tower/TowerShopUI";
import TowerUI from "../../UI/Tower/TowerUI";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import EnvironmentManager from "../../gameplay/interactiveObj/EnvironmentManager";
import { StageUtil } from "../../stage/Stage";
import { UIMain } from "../../stage/ui/UIMain";
import { MGSTool } from "../../tool/MGSTool";
import InteractUI_Generate from "../../ui-generate/Tower/InteractUI_generate";
import CardModuleC from "../CardModule/CardModuleC";
import PlayerModuleData from "../PlayerModule/PlayerModuleData";
import TowerBase from "./Tower/TowerBase";
import { TowerEvent, TowerInfo } from "./TowerEnum";
import { TowerManager } from "./TowerManager";
import { TowerModuleData } from "./TowerModuleData";
import { TowerModuleS } from "./TowerModuleS";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";

/**
 * 玩家客户端模块，管理玩家的各种信息
 */
export class TowerModuleC extends ModuleC<TowerModuleS, TowerModuleData> {
    private _maxTower: number = 20;
    private _maxSourceTower: number = 3;
    private _try: boolean;
    public get maxTower(): number {
        if (!this._maxTower) {
            this._maxTower = 20;
        }
        return this._maxTower;
    }
    public set maxTower(v: number) {
        this._maxTower = v;
    }

    public get maxSourceTower(): number {
        if (!this._maxSourceTower) {
            this._maxSourceTower = 3;
        }
        return this._maxSourceTower;
    }
    public set maxSourceTower(v: number) {
        this._maxSourceTower = v;
    }

    private _chooseSlotID: number = null;
    public get chooseSlotID(): number {
        return this._chooseSlotID;
    }

    public set chooseSlotID(v: number) {
        this._chooseSlotID = v;
    }

    private _chooseTowerID: number = null;
    public get chooseTowerID(): number {
        return this._chooseTowerID;
    }

    public set chooseTowerID(v: number) {
        this._chooseTowerID = v;
        if (this.chooseTowerID == null) {
            UIService.hideUI(this._towerInfoUI);
        } else if (this._towerInfoUI) {
            const towerClass = TowerManager.getTowerByPlaceID(this.chooseTowerID);
            console.log(
                "#debug chooseTowerID tower:" + JSON.stringify(towerClass.info) + " placeID:" + this.chooseTowerID
            );
            if (towerClass) {
                UIService.showUI(this._towerInfoUI, UILayerTop, towerClass);
                TowerActions.onTowerSelected.call(towerClass.info.placeID);
                this.isBuild = false; //把建造状态关了
            }
        }
    }

    private _interactID: number = null;
    public get interactID(): number {
        return this._interactID;
    }
    public set interactID(v: number) {
        this._interactID = v;
    }

    private _isBuild: boolean = false;
    public get isBuild(): boolean {
        return this._isBuild;
    }
    public set isBuild(v: boolean) {
        this.showSlotBuilding(v);
        this._isBuild = v;
        if (v) {
            //开始建造就把资料卡关了
            UIService.hideUI(this._towerInfoUI);
        } else {
            Event.dispatchToLocal(TowerEvent.ChooseTower, null);
        }
    }
    private _buildID: number = -1;
    private _cfg: ITowerElement = null;
    private _attackRangeEff: GameObject;
    private _towerInfoUI: TowerInfoUI = null;
    private _canCreate: boolean = true;
    private _interactMap: Map<number, InteractUI_Generate> = new Map();
    //埋点用的临时塔的map
    private _tempTowerMap: Map<number, number> = new Map();
    private _tryTowerMap: Map<number, number> = new Map();
    public tryTowerMgs: number[] = [];
    protected onStart(): void {
        console.log("hsfTowerModuleC====================== 启动");
        Event.addLocalListener(CLICKEVENT, this.onClick.bind(this));
        this.interactID = null;
        StageActions.onStageStateChanged.add(this.onStageStateChanged.bind(this));
        StageActions.onPlayerCountChanged.add((v: number) => {
            if (!v) this._maxTower = 20;
            else this._maxTower = 84 / v;
        });
        InteractActions.onInteract.add(this.onInteract.bind(this));
        InteractActions.onInteractEnd.add(this.onInteractEnd.bind(this));
        this.initEffect();
        this.initUI();
    }

    protected onUpdate(dt: number): void {
        this._interactMap.forEach((v, k) => {
            v.rootCanvas.position = InputUtil.projectWorldPositionToWidgetPosition(
                MapManager.getPositionFromId(k)
            ).screenPosition.subtract(UIService.getUI(InteractUI_Generate).interactBtn.size.divide(2));
        });
    }

    get towerInfoUI(): TowerInfoUI {
        return this._towerInfoUI;
    }

    private initUI() {
        this._towerInfoUI = UIService.create(TowerInfoUI);
    }

    private async initEffect() {
        this._attackRangeEff = (await GameObjPool.asyncSpawn("7019B887451AAB6CCC9821846AE1BFE7")) as GameObject;
        // this._attackRangeEff = (await GameObjPool.asyncSpawn("360869")) as Model;
        // this._attackRangeEff.setMaterial("93277");
        this.setAttackEffect(null);
    }

    public setAttackEffect(tower: TowerBase) {
        if (!this._attackRangeEff) return;
        if (!tower) {
            this._attackRangeEff.worldTransform.position = Utils.TEMP_VECTOR.set(0, 0, -99999);
        } else {
            let range = tower.property.findRange;
            let position = tower.oriPos.clone().add(new Vector(0, 0, 1));
            // let position = tower.tower.worldTransform.position;
            // position.z += 100;
            // let position = tower.oriPos;
            let scale = range * 2 + 1;
            this._attackRangeEff.worldTransform.scale = Utils.TEMP_VECTOR.set(scale, scale, 1);
            this._attackRangeEff.worldTransform.position = position;
            const stageCfg = StageUtil.getStageCfgById(MapManager.stageCfgId);
            const rotation = Rotation.zero;
            rotation.set(stageCfg?.rotation?.[0] ?? 200, stageCfg?.rotation?.[1] ?? 0, stageCfg?.rotation?.[2] ?? 0);

            this._attackRangeEff.worldTransform.rotation = rotation;
        }
    }

    public syncMaxSourceTower() {
        let stage = GameManager.getStageClient();
        let currentStage = stage ? stage.stageCfgId : -1;
        const stageCfg = StageUtil.getStageCfgById(currentStage);
        if (stageCfg.groupIndex === 10056) {
            this.maxSourceTower = 5;
        } else {
            this.maxSourceTower = 3;
        }
    }

    /**
     * 状态切换回调
     * @param state 状态
     */
    public onStageStateChanged(state: EStageState, waitTime: number, wave: number) {
        let towerUI = UIService.getUI(TowerUI);
        let stage = GameManager.getStageClient();
        let currentStage = stage ? stage.stageCfgId : -1;
        const stageCfg = StageUtil.getStageCfgById(currentStage);

        let currentWave = stage ? stage.currentWave : -1;
        // let currentWave = stage ? stage.stageId : -1;
        switch (state) {
            case EStageState.End:
                this.cancelChosenTower();
                towerUI.shopBtn.visibility = SlateVisibility.Visible;
                towerUI.setPriceVisible(false);
                this.onStageEnd();
                break;
            case EStageState.Wait:
                if (currentWave == 0) {
                    this.refreshTryTower();
                    this.cancelChosenTower();
                    this._tempTowerMap = new Map();
                    for (let i of ModuleService.getModule(CardModuleC).equipCards) {
                        this._tempTowerMap.set(i, 0);
                    }
                    this.tryTowerMgs = [];
                } else {
                    this._tempTowerMap.forEach((v, k) => {
                        MGSTool.waveOver(
                            k,
                            v,
                            currentWave,
                            currentStage,
                            DataCenterC.getData(PlayerModuleData).firstClears.includes(
                                Number(stageCfg.index.toString() + stageCfg.difficulty.toString())
                            )
                                ? 1
                                : 0
                        );
                    });
                    this._tempTowerMap = new Map();
                    for (let i of ModuleService.getModule(CardModuleC).equipCards) {
                        this._tempTowerMap.set(i, 0);
                    }
                }
                towerUI.shopBtn.visibility = SlateVisibility.Collapsed;
                towerUI.setPriceVisible(true);
                UIService.hide(TowerShopUI);
                break;
            case EStageState.Settle:
                break;
            default:
                break;
        }
    }

    private onInteract(tag, index) {
        if (tag != "tower") return;
        if (this._interactMap.has(index)) return;
        const interactUI = UIService.create(InteractUI_Generate);
        this._interactMap.set(index, interactUI);
        interactUI.interactBtn.onClicked.clear();
        interactUI.interactBtn.onClicked.add(this.interactToShowInfo.bind(this, index));
        UIService.showUI(interactUI, UILayerTop);
        interactUI.rootCanvas.size = new Vector2(63.5, 61.5);
        KeyOperationManager.getInstance().onKeyUp(interactUI, Keys.F, this.interactToShowInfo.bind(this, index));
    }

    interactToShowInfo = (id: number) => {
        this.interactID = id;
        this.onInteractBtnClick();
    };

    private onInteractEnd(tag, index) {
        if (tag != "tower") return;
        if (!this._interactMap.has(index)) return;
        const interactUI = this._interactMap.get(index);
        KeyOperationManager.getInstance().unregisterKey(interactUI, Keys.F);
        interactUI.destroy();
        this._interactMap.delete(index);
    }

    /**
     * towerui的InteractBtn的点击事件
     * @returns
     */
    public onInteractBtnClick() {
        if (this.interactID == null) return;
        this.chooseTowerID = this.interactID;
        this.chooseSlotID = null;
    }

    private async onClick(obj: GameObject) {
        if (!obj) return;
        // if (!obj || this._towerInfoUI.visible) return;
        if (
            GuideManager.guideState != GuideState.None &&
            GuideManager.guideState != GuideState.UpgradeTowerSelected &&
            GuideManager.guideState != GuideState.Complete
        ) {
            await this.onGuide(obj);
        } else {
            if (obj.tag?.startsWith("slot")) {
                this.chooseSlotID = +obj.tag?.substring(4);
                this.chooseTowerID = null;
                if (!this.towerInstaceOfSlot() && this._isBuild && this._buildID > 0) {
                    await this.createTowerByClick();
                }
            } else if (obj.tag?.startsWith("tower")) {
                this.chooseTowerID = +obj.tag?.substring(5);
                this.chooseSlotID = null;
            }
            // else {
            //     this.chooseSlotID = null;
            //     this.chooseTowerID = null;
            // }
        }
    }

    /**
     * 关卡结束回调
     */
    private onStageEnd() {
        // 环境恢复
        EnvironmentManager.getInstance().setEnvironment(1);
        TowerManager.destroyAllTower();
        this._interactMap.forEach((v, k) => {
            v.destroy();
            this._interactMap.delete(k);
        });
        this._interactMap = new Map();
        this.chooseSlotID = null;
        this.chooseTowerID = null;
        this.interactID = null;
        this.clearTryTower();
    }

    /**
     * 新手引导相关 by xiaohao.li
     * @param obj
     */
    private async onGuide(obj: GameObject) {
        if (GuideManager.guideState == GuideState.CreateTower || GuideManager.guideState == GuideState.CreateTower2) {
            if (obj.tag?.startsWith("slot")) {
                this.chooseSlotID = +obj.tag?.substring(4);
                this.chooseTowerID = null;
                let target = GuideManager.guideState == GuideState.CreateTower ? 10 : 11;
                if (this.chooseSlotID == target) {
                    if (this._isBuild && this._buildID > 0) {
                        await this.createTowerByClick();
                    }
                } else {
                    TipsManager.showTips(GameConfig.Language.getElement("Text_AppointedCreate").Value);
                }
            } else {
                TipsManager.showTips(GameConfig.Language.getElement("Text_CantDo").Value);
            }
        } else if (GuideManager.guideState == GuideState.UpgradeTower) {
            if (obj.tag?.startsWith("tower")) {
                let chooseTowerID = +obj.tag?.substring(5);
                if (chooseTowerID == 11) {
                    this.chooseTowerID = chooseTowerID;
                    this.chooseSlotID = null;
                } else {
                    TipsManager.showTips(GameConfig.Language.getElement("Text_AppointedUpgrade").Value);
                }
            }
        } else {
            if (obj.tag?.startsWith("slot")) {
                this.chooseSlotID = +obj.tag?.substring(4);
                this.chooseTowerID = null;
                if (!this.towerInstaceOfSlot() && this._isBuild && this._buildID > 0) {
                    TipsManager.showTips(GameConfig.Language.getElement("Text_CantDo").Value);
                }
            } else if (obj.tag?.startsWith("tower")) {
                TipsManager.showTips(GameConfig.Language.getElement("Text_CantDo").Value);
            }
        }
    }

    public async createTowerByPlaceId(cfgId: number, placeID: number) {
        this.chooseSlotID = placeID;
        this.chooseTowerID = null;
        this._buildID = cfgId;
        await this.createTowerByClick();
    }

    public async upgradeTowerByPlaceId(placeID: number) {
        this.chooseTowerID = placeID;
        this.chooseSlotID = null;
    }

    private showSlotBuilding(isShow: boolean) {
        MapManager.showFreeSlot(isShow);
    }

    /**
     * ui发起的升级塔的事件
     * @param towerInfo 塔的信息
     * @returns 是否升级成功
     */
    public upgradeTowerByUI(towerInfo: TowerInfo, addLevel: number = 1): boolean {
        const cfg = GameConfig.Tower.getElement(towerInfo.configID);
        if (!cfg || !Utils.isLocalPlayer(towerInfo.playerID)) return false;
        if (cfg.spend[towerInfo.level + addLevel] == null) {
            TipsManager.showTips(GameConfig.Language.getElement("Text_TowerMaxLevel").Value);
            return false;
        }
        if (GameManager.spendGold(cfg.spend[towerInfo.level + addLevel])) {
            this.server.net_upgradeTower(towerInfo, addLevel);
            MGSTool.goldChange(4, cfg.spend[towerInfo.level + addLevel], 5);
            return true;
        } else {
            TweenCommon.goldFailedShow(UIService.getUI(UIMain).goldTxt);
            TipsManager.showTips(GameConfig.Language.getElement("Text_LessGold").Value);
            return false;
        }
    }

    /**
     * 点击事件发起的创建塔
     */
    private async createTowerByClick() {
        if (!this._cfg) return;
        if (TowerManager.getTowerByPlaceID(this.chooseSlotID)) {
            this.chooseTowerID = this.chooseSlotID;
            this.chooseSlotID = null;
            return;
        } else {
            const sourceTower = GameConfig.Tower.getAllElement()
                .filter((o) => o.type === 3)
                .map((i) => i.id);
            let fullFlag = TowerManager.sourceTowerCount >= this.maxSourceTower;
            if (fullFlag && sourceTower.includes(this._buildID)) {
                // 资源塔满额了
                TweenCommon.goldFailedShow(UIService.getUI(UIMain).towerTxt);
                TipsManager.showTips(GameConfig.Language.getElement("Text_TowerFull").Value);
                return;
            }
            if (this._try && this._tryTowerMap.has(this._buildID)) {
                await this.createTower({
                    playerID: this.localPlayer.playerId,
                    playerName: GameManager.playerName,
                    configID: this._buildID,
                    placeID: this.chooseSlotID,
                    level: 0,
                });
                this.cancelChosenTower();
            } else if (GameManager.checkGold(this._cfg.spend[0])) {
                await this.createTower({
                    playerID: this.localPlayer.playerId,
                    playerName: GameManager.playerName,
                    configID: this._buildID,
                    placeID: this.chooseSlotID,
                    level: 0,
                });
                this.cancelChosenTower();
            } else {
                TweenCommon.goldFailedShow(UIService.getUI(UIMain).goldTxt);
                TipsManager.showTips(GameConfig.Language.getElement("Text_LessGold").Value);
            }
        }
    }

    /**
     * 用于优化已经存在塔的slot的点击事件
     * @returns 是否有塔
     */
    private towerInstaceOfSlot() {
        let tower = TowerManager.getTowerByPlaceID(this.chooseSlotID);
        if (tower) {
            this.chooseTowerID = this.chooseSlotID;
            this.chooseSlotID = null;
            return true;
        }
        return false;
    }

    /**
     * UI发起的选中塔
     * @param cfgID 塔的配置
     */
    public chooseTowerByUI(cfgID: number, isTry: boolean = false) {
        if (!cfgID) return;
        this._cfg = GameConfig.Tower.getElement(cfgID);
        if (!this._cfg) return;
        this.isBuild = true;
        this._buildID = cfgID;
        this._try = isTry;
    }

    /**
     * 取消点选
     */
    public cancelChosenTower() {
        this.isBuild = false;
        this._buildID = 0;
        this.chooseTowerID = null;
        this.chooseSlotID = null;
        this._try = false;
    }

    /**
     * UI发起的销毁塔
     */
    public destroyTowerByUI(towerInfo: TowerInfo) {
        if (!towerInfo || !Utils.isLocalPlayer(towerInfo.playerID)) return;
        this.destroyTower(towerInfo);
    }

    private refreshTryTower() {
        UIService.getUI(UIMain).setTryTower(this._tryTowerMap);
    }

    public checkTryTowerFull(id: number): boolean {
        if (!this._tryTowerMap.has(id) && this._tryTowerMap.size >= 3) {
            return true;
        }
        return false;
    }

    public addTryTower(id: number, count: number = 1): boolean {
        let oldCount = this._tryTowerMap.get(id);
        if (oldCount) {
            this._tryTowerMap.set(id, oldCount + count);
        } else {
            if (this._tryTowerMap.size >= 3) {
                return false;
            }
            this._tryTowerMap.set(id, count);
        }
        this.refreshTryTower();
        return true;
    }

    private reduceTryTower(id: number, count: number = 1) {
        let oldCount = this._tryTowerMap.get(id);
        if (oldCount == count) {
            this._tryTowerMap.delete(id);
        } else {
            this._tryTowerMap.set(id, oldCount - count);
        }
        if (this.tryTowerMgs.indexOf(id) == -1) {
            this.tryTowerMgs.push(id);
        }
        this.refreshTryTower();
    }

    private clearTryTower() {
        this._tryTowerMap.clear();
        this.refreshTryTower();
    }

    /**
     * 创建塔
     * @param info 塔的信息
     */
    public async createTower(info: TowerInfo): Promise<boolean> {
        if (!info || !this._canCreate || !this._cfg) return;
        this._canCreate = false;
        let flag = false;
        try {
            flag = await this.server.net_createTower(info);
            if (flag) {
                if (this._try) {
                    //扣掉1次试用塔，如果没了就清空
                    this.reduceTryTower(this._buildID);
                } else {
                    MGSTool.goldChange(4, this._cfg.spend[0], 7);
                    GameManager.spendGold(this._cfg.spend[0]);
                    let count = this._tempTowerMap.get(info.configID);
                    if (count != null) {
                        this._tempTowerMap.set(info.configID, count + 1);
                    } else {
                        this._tempTowerMap.set(info.configID, 1);
                    }
                }
            }
        } catch (e) {
            console.error(`hsf----net_createTower:${e}`);
        } finally {
            this._canCreate = true;
            return flag;
        }
    }

    public net_createTower(info: TowerInfo) {
        TowerManager.createTower(info);
        if (Utils.isLocalPlayer(info.playerID)) {
            // let count = this._tempTowerMap.get(info.configID);
            // if (count != null) {
            //     this._tempTowerMap.set(info.configID, count + 1);
            // } else {
            //     this._tempTowerMap.set(info.configID, 1);
            // }
        }
    }

    public net_destroyTowerByPlayer(player: Player) {
        TowerManager.destroyTowerByPlayer(player);
    }

    public net_upgradeTower(info: TowerInfo) {
        TowerManager.upgradeTower(info);
        if (info.placeID == this.chooseTowerID && this._towerInfoUI.visible) this.chooseTowerID = this.chooseTowerID;
    }

    /**
     * 销毁塔
     * @param info 塔的信息
     */
    public async destroyTower(towerInfo: TowerInfo) {
        if (!towerInfo && !TowerManager.hasTower(towerInfo.placeID)) return;
        this.server.net_destroyTower(towerInfo.placeID);
    }

    public net_destroyTower(placeID: number) {
        TowerManager.destroyTower(placeID);
    }

    /** 提前结束 */
    public earlySettle() {
        this.server.net_earlySettle();
    }
}
