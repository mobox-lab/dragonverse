import { ModifiedCameraSystem } from '../../Modified027Editor/ModifiedCamera';
import { GameConfig } from "../../config/GameConfig";
import { EAnalyticsEvents, EAreaEvent_C, EAreaId, EModule_Events } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { EventManager } from "../../tool/EventManager";
import { Notice } from "../../tool/Notice";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { AreaModuleS } from "./AreaModuleS";
import { util } from "../../tool/Utils";
import { AttributeModuleC } from '../AttributeModule/AttributeModuleC';
import { LandModuleC } from '../LandModule/LandModuleC';
import { PlayerModuleC } from '../PlayerModule/PlayerModuleC';
import { ShopView } from '../ShopModule/UI/ShopView';
import { ECoreStep, EHurtSource, THurtSourceData } from '../AnalyticsModule/AnalyticsTool';
import { MainUI } from '../PlayerModule/UI/MainUI';

export class AreaModuleC extends ModuleC<AreaModuleS, null> {

    /**玩家模块*/
    private playerModuleC: PlayerModuleC = null;

    /**属性模块*/
    private attributeModuleC: AttributeModuleC = null;

    /**战场触发器*/
    private battle_tirgger: mw.Trigger = null;

    /**区域检测 */
    private _checkAreaUpdateKey: any = null;

    /**当前玩家区域所在id */
    public get curAreaId(): number {
        let areaId = this.attributeModuleC.getAttributeValue(Attribute.EnumAttributeType.areaId);
        if (areaId == 0 || areaId == null) {
            return EAreaId.Safe;
        }
        return areaId;
    }

    protected onStart(): void {
        this.attributeModuleC = ModuleService.getModule(AttributeModuleC);
        this.playerModuleC = ModuleService.getModule(PlayerModuleC);
        EventManager.instance.add(EAreaEvent_C.area_transmit, this.listen_transmitArea, this);
        EventManager.instance.add(EAreaEvent_C.area_updateAreaId_c, this.listen_updateAreaId, this);
        EventManager.instance.add(EAreaEvent_C.Area_BackSafe_C, this.listen_backSafe, this);
        EventManager.instance.add(EAreaEvent_C.AreaEvent_guidePos_C, this.listen_transmitGuidePos, this);
        this.init();
    }

    /**
     * 初始化
     */
    private async init() {

        this._checkAreaUpdateKey = TimeUtil.setInterval(this.update_checkArea.bind(this), 0.5);
    }

    /**进入新手引导区域 */
    private listen_transmitGuidePos() {
        this.setLocation(Globaldata.guide_bornPos);
    }

    /**玩家返回安全区 */
    private listen_backSafe() {
        this.server.net_transmitSafeArea();
    }

    /**
     * 传送到指定区域
     */
    private async listen_transmitArea(areaId: number) {

        let cfg = GameConfig.Area.getElement(areaId);
        if (cfg == null) {
            cfg = GameConfig.Area.getElement(EAreaId.Safe);
        }

        let pos = null;
        if (areaId == EAreaId.Battle) {
            pos = await ModuleService.getModule(LandModuleC).getrandomPostion();
            UIService.getUI(MainUI)?.setCoinAndEnergyVisible(false);
        } else {
            pos = cfg.bornPoint;
            //回城，显示ui
            UIService.getUI(MainUI)?.setCoinAndEnergyVisible(true);
        }

        this.setLocation(pos.clone());
        this.server.net_setPlayerAreaId(cfg.id);
    }


    /**
     * 更新玩家区域id
     */
    private listen_updateAreaId(pId: number, areaId: number) {
        if (pId != this.localPlayerId) return;

        EventManager.instance.call(EModule_Events.area_changeArea, areaId);

        let areaCfg = GameConfig.Area.getElement(areaId);
        if (areaCfg == null) {
            return;
        }

        Notice.showDownNotice(areaCfg.areaName);

        SoundService.stopBGM();

        let soundCfg = GameConfig.Sound.getElement(areaCfg.bgmId);
        if (soundCfg) {
            if (StringUtil.isEmpty(soundCfg.guid) == false) {
                SoundService.playBGM(soundCfg.guid, soundCfg.volume);
            }
        }

        // 埋点
        if (areaId == EAreaId.Battle) {
            EventManager.instance.call(EAnalyticsEvents.coreStep, ECoreStep.enterBattle);
        }
    }

    /**
     * 进入触发器
     */
    private onEnterTrigger(go: mw.GameObject) {
        if (!util.objectIsCucrrentPlayer(go)) {
            return;
        }
        this.listen_transmitArea(EAreaId.Battle)
    }

    /**
     * 离开触发器
     */
    private onLeaveTrigger(go: mw.GameObject) {
        if (!util.objectIsCucrrentPlayer(go)) {
            return;
        }
    }

    /**
     * 检测区域
     */
    public async update_checkArea() {

        if (this.localPlayer == null) return;

        if (this.curAreaId == null) return;

        let playerLoc = PlayerManager.instance.getPlayerLoc();

        if (playerLoc == null) return;

        if (playerLoc.z < Globaldata.playerBottomZ + this.localPlayer.character.getBoundingBoxExtent().z * 0.5) {
            //掉一半血传送回战场随机点位
            let hp = this.playerModuleC.getAttr(Attribute.EnumAttributeType.hp);
            if (hp <= 0) {
                return;
            }
            let maxHP = this.playerModuleC.getAttr(Attribute.EnumAttributeType.maxHp);

            if (hp > maxHP * 0.5) {
                let position = await ModuleService.getModule(LandModuleC).getrandomPostion();
                UIService.getUI(MainUI)?.setCoinAndEnergyVisible(false);
                this.setLocation(position);
            } else {

            }

            let hurtSourceData: THurtSourceData = {
                source: EHurtSource.sea,
                skillId: 0,
                skillEffectId: 0,
            }
            this.playerModuleC.reduceAttr(Attribute.EnumAttributeType.hp, maxHP * 0.5, true, 0, hurtSourceData);
            return;
        }
    }

    /**
     * 设置玩家位置
     * @param position 
     */
    private setLocation(position: Vector) {
        this.localPlayer.character.worldTransform.position = position;
        mw.Vector.multiply(this.localPlayer.character.worldTransform.getForwardVector(), -1, Globaldata.tmpVector);
        PlayerManager.instance.updatePlayerLoc(this.localPlayerId, position);

        ModifiedCameraSystem.setOverrideCameraRotation(Globaldata.tmpVector.toRotation());
        setTimeout(() => {
            ModifiedCameraSystem.resetOverrideCameraRotation();
        }, 0);
    }


    public async net_dropLand() {
        let position = await ModuleService.getModule(LandModuleC).getrandomPostion();
        UIService.getUI(MainUI)?.setCoinAndEnergyVisible(false);
        this.setLocation(position);
    }

}