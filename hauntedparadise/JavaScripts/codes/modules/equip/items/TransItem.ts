/*
 * @Author       : dal
 * @Date         : 2024-01-11 09:21:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-06 16:08:18
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\items\TransItem.ts
 * @Description  : 回血道具
 */

import { GameConfig } from "../../../../config/GameConfig";
import { IItemElement } from "../../../../config/Item";
import { ISpecialItemElement } from "../../../../config/SpecialItem";
import MusicMgr from "../../../utils/MusicMgr";
import { ObjAniUtil } from "../../../utils/ObjAniUtil";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import { EquipDefine } from "../EquipDefine";
import { EquipModuleC } from "../EquipModuleC";
import { Item, registerItem } from "./Item";

@registerItem
export class TransItem extends Item {

    private go: GameObject;

    /** 特殊道具的配置 */
    private specialCfg: ISpecialItemElement;

    public onHand(element: IItemElement, go: GameObject, ownerId: number): void {
        if (ownerId != Player.localPlayer.playerId) { return; }
        this.specialCfg = GameConfig.TransItem.getElement(element.clazzParam[0]);
        this.go = go;
        this.prePos = this.go.localTransform.position.clone();
        this.preRot = this.go.localTransform.rotation.clone();
        this.toPos = this.specialCfg.endPos;
        let tempRot = this.specialCfg.endRot;
        this.toRot = new Rotation(tempRot.x, tempRot.y, tempRot.z);
        this.useTime = this.specialCfg.useTime;
        this.isLockUse = false;
    }

    public onRemoveHand(element: IItemElement): void {

    }

    protected onUse(element: IItemElement, useCount: number): boolean {
        if (this.isLockUse) { return false; }

        if (Number.isNaN(useCount) || useCount <= 0) { return; }

        switch (this.specialCfg.type) {
            case 1:
                if (ModuleService.getModule(PlayerModuleC).isHealthy()) {
                    Tips.show(GameConfig.Language["medicineTips_01"].Value);
                    return false;
                } else if (ModuleService.getModule(PlayerModuleC).checkCanAddFullHp(Number(this.specialCfg.dataEx[0]) * (useCount - 1))) {
                    Tips.show("所用药量过猛！（记得接多语言）");
                    return false;
                }
                break;
            default:
                break;
        }

        this.playUseAni(() => {
            if (this.go === null || !this.go.getVisibility()) { return; }
            switch (this.specialCfg.type) {
                case 1:
                    ModuleService.getModule(PlayerModuleC).changeHp(Number(this.specialCfg.dataEx[0]) * useCount);
                    break;
                default:
                    break;
            }
            EffectService.playOnGameObject(this.specialCfg.useEff, Player.localPlayer.character, {
                slotType: HumanoidSlotType.Root
            });
            GhostTraceHelper.itemTrace(EquipDefine.curPlayerEquipItem.cfgId, 2);
            Tips.show(GameConfig.Language["medicineTips_02"].Value);
        });
        EquipModuleC.waitTime = 1;
        return true;
    }

    private preRot = Rotation.zero;

    private prePos = Vector.zero;

    private toRot = Rotation.zero;

    private toPos = Vector.zero;

    private useTime = 100;

    private isLockUse: boolean = false;

    /** 播放使用动画 */
    public playUseAni(completeCall: Function) {
        if (this.isLockUse) { return; }
        this.isLockUse = true;
        MusicMgr.instance.play(this.specialCfg.useSound, this.go);
        ObjAniUtil.playRotAni(this.go, this.toRot, this.useTime, () => {
            ObjAniUtil.playRotAni(this.go, this.preRot, this.useTime, () => {
                this.isLockUse = false;
                completeCall();
                return true;
            }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);

        ObjAniUtil.playPosAni(this.go, this.toPos, this.useTime, () => {
            ObjAniUtil.playPosAni(this.go, this.prePos, this.useTime, () => { }, false, TweenUtil.Easing.Quadratic.In)
        }, false, TweenUtil.Easing.Back.Out);
    }
}
