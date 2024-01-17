import { PlayerManagerExtesion } from '../../../../Modified027Editor/ModifiedPlayer';
import { PlyerState, EPlayerState } from "../PlyerState";
import { GameConfig } from "../../../../config/GameConfig";
import { util } from "../../../../tool/Utils";
import { EAttributeEvents_C, EModule_Events, EWeaponEvent_C } from "../../../../const/Enum";
import { EventManager } from "../../../../tool/EventManager";
import { EquipManager } from "../../../EquipModule/EquipManager";
import { Globaldata } from '../../../../const/Globaldata';
import { AttributeModuleC } from '../../../AttributeModule/AttributeModuleC';
import { Attribute } from '../../sub_attribute/AttributeValueObject';
import { WeaponModuleC } from '../../../WeaponModule/WeaponModuleC';

/**
 * 待机状态
 */
export class State_Idle extends PlyerState {

    /**动画资源 */
    private idleAni: string = null;

    /**上个武器id */
    private preWeaponId: number = null;

    /**处理动画混入无法stop */
    private enterTime: number = 0;

    private mAttr: AttributeModuleC = null;
    private mWeapon: WeaponModuleC = null;

    constructor() {
        super();
        this.mAttr = ModuleService.getModule(AttributeModuleC);
        this.mWeapon = ModuleService.getModule(WeaponModuleC);
        EventManager.instance.add(EAttributeEvents_C.Attribute_WeaponId_Change_C, this.listen_weaponIdChange.bind(this));
        EventManager.instance.add(EWeaponEvent_C.WeaponEvent_HasVisibleHandleWeapon_C, this.listen_showOrHidePendant.bind(this));
    }

    protected onEnter() {
        if (PlyerState.isWallRunExit) {
            PlyerState.isWallRunExit = false;
            PlyerState.onChangeRunwalltoIdle.call();
        }
        this.playAni()
    }

    protected onExit() {
        this.stopAni();
    }

    public onUpdate(dt: number) {

        this.baseStateUpdate(dt);

        if (PlyerState.dfaultState == EPlayerState.run) {
            this.playerModulec.changeState(EPlayerState.run);
        }

        if (PlyerState.dfaultState == EPlayerState.jump) {
            this.playerModulec.changeState(EPlayerState.jump, -1);
        }

        //只打断空舞 
        if (PlyerState.jumpTime > 2 && PlyerState.dfaultState != EPlayerState.jump) {
            PlyerState.jumpTime = 0;
        }
    }

    onDestory(): void {

    }

    /**控制玩家手中武器显示隐藏 */
    private async listen_showOrHidePendant(pId: number, show: boolean) {

        if (pId != Player.localPlayer.playerId) {
            return;
        }

        if (show) {
            return;
        }

        this.stopAni(false);

    }

    private listen_weaponIdChange(pId: number, value: number) {
        if (mw.Player.localPlayer.playerId != pId) {
            return;
        }

        if (this.motionMD.isHasPlayMotion()) {
            return;
        }

        if (PlyerState.dfaultState != EPlayerState.Idle) {
            return;
        }

        if (this.preWeaponId == 0) {
            return;
        }
        if (value == this.preWeaponId) {
            return;
        }

        this.stopAni(false);
        //必须加延迟否则不生效
        setTimeout(() => {
            this.playAni();
        }, Globaldata.mixAnimationTime * 1000);
    }


    /**
     * 播放动画
     */
    private async playAni() {


        if (this.mWeapon.isWeaponInBack()) {
            this.stopAni();
            return;
        }

        let curWeaponId = this.mAttr.getAttributeValue(Attribute.EnumAttributeType.weaponId);

        let weaponCfg = GameConfig.Weapon.getElement(curWeaponId);
        if (weaponCfg == null) {
            return;
        }

        if (StringUtil.isEmpty(weaponCfg.action)) {
            return;
        }

        let curraniguid = weaponCfg.action;


        //fix：增加动画容错，有动画和缓存技能时不播放动画，防止概率影响motion动画
        if (this.motionMD.isHasPlayMotion()) {
            return;
        }

        if (this.motionMD.isPrestore()) {
            return;
        }

        let velocity = this.character.velocity;
        if ((Math.abs(velocity.x) > 100 || Math.abs(velocity.y) > 100)) {
            return;
        }

        if (this.playerModulec.v2.x != 0 || this.playerModulec.v2.y != 0) {
            return;
        }

        PlayerManagerExtesion.rpcPlayAnimation(this.character, curraniguid, 0, 1);
        this.idleAni = curraniguid;
        this.enterTime = Date.now();

    }

    /**
     * 停止动画
     */
    private stopAni(isByEnterTime: boolean = true) {

        let stopAni = () => {
            if (this.idleAni) {
                PlayerManagerExtesion.rpcStopAnimation(this.character, this.idleAni)
                this.idleAni = null;
            }
        }

        if (isByEnterTime == false) {
            setTimeout(() => {
                stopAni();
            }, Globaldata.mixAnimationTime * 1000);
            return;
        }

        //延迟一帧停止动画
        setTimeout(() => {
            let dlateTime = (Date.now() - this.enterTime) / 1000;
            if (dlateTime <= Globaldata.mixAnimationTime) {
                setTimeout(() => {
                    stopAni();
                }, (Globaldata.mixAnimationTime - dlateTime) * 1000);
            } else {
                stopAni();
            }
        }, 0);
    }


}