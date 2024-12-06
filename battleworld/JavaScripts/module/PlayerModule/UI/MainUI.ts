import {
    EAnalyticsEvents,
    EAreaEvent_C,
    EAreaId,
    EAttributeEvents_C,
    EModule_Events,
    EModule_Events_S,
    EPlayerEvents_C,
    ESkillEvent_C,
    EbackType,
} from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";
import { PlayerModuleC } from "../PlayerModuleC";
import { BattleWorldPlayerModuleData } from "../PlayerModuleData";
import { Attribute } from "../sub_attribute/AttributeValueObject";
import { Globaldata } from "../../../const/Globaldata";
import { EPlayerState, PlyerState } from "../FSM/PlyerState";
import { util } from "../../../tool/Utils";
import { Notice } from "../../../tool/Notice";
import { AttributeModuleC } from "../../AttributeModule/AttributeModuleC";
import { ChangeMoldeBuffC } from "../../buffModule/Buff/CustomBuff/ChangeMoldeBuff";
import { MotionModuleC } from "../../MotionModule/MotionModuleC";
import { SkillPanel } from "../../SkillModule/UI/SkillPanel";
import Main_HUD_Generate from "../../../ui-generate/Main/Main_HUD_generate";
import {
    AnalyticsTool,
    EClickEvent,
    ECoreStep,
    EFirstDo,
    EMovementType,
    EPageName,
} from "../../AnalyticsModule/AnalyticsTool";
import { RankPanel } from "./rank/RankPanel";
import { PlayerManager } from "../PlayerManager";
import { GameConfig } from "../../../config/GameConfig";
import { RedDotManager, RedDotName } from "../../HudModule/RedDot";
import { EnergyModuleC } from "../../Energy/EnergyModule";
import KeyOperationManager from "../../../controller/key-operation-manager/KeyOperationManager";
import BuyEnergyPanel from "../../../ui/BuyEnergyPanel";
import { Yoact } from "../../../depend/yoact/Yoact";
import { AuthModuleC } from "../../auth/AuthModule";
import { MessageBox } from "../../../tool/MessageBox";
import Tips from "../../../tool/P_Tips";
import { JumpGamePanel } from "../../../ui/jump-game/JumpGamePanel";
import Gtk from "gtoolkit";
import { PillInfo } from "../../LandModule/PickUp/PickUpPill";
import SettingUI from "../../SettingModule/UI/SettingUI";
import { P_Game_Action } from "../../action/ui/P_Game_Action";
import { SkillSelectPanel } from "../../SkillModule/UI/SkillSelectPanel";
import Log4Ts from "mw-log4ts";
import GameServiceConfig from "../../../const/GameServiceConfig";
import { addGMCommand } from "mw-god-mod";
import P12ShopPanel from "../../../ui/shop/P12ShopPanel";
import SenzuBeanConfirmPanel from "../../../ui/bag/SenzuBeanConfirmPanel";
import { P12BagModuleC } from "../../bag/P12BagModule";
import { Utils } from "../../../util/uitls";

enum MouseLockType {
    Press,
    Tap,
}

let currentLockType: MouseLockType = MouseLockType.Press;

addGMCommand(
    "Mouse Lock Type",
    "string",
    (value) => {
        const v = Gtk.isNullOrEmpty(value) ? undefined : Number(value);
        let type: MouseLockType;
        if (v === 0 || v === 1) {
            type = v;
        } else {
            switch (currentLockType) {
                case MouseLockType.Press:
                    type = MouseLockType.Tap;
                    break;
                case MouseLockType.Tap:
                    type = MouseLockType.Press;
                    break;
            }
        }

        Log4Ts.log(
            MainUI,
            `request to change mouse lock type to ${MouseLockType[type]}.`,
            `option param:`,
            `   0: ${MouseLockType[MouseLockType.Press]}`,
            `   1: ${MouseLockType[MouseLockType.Tap]}`,
        );
        if (type === currentLockType) return;
        else currentLockType = type;

        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainUI), Keys.LeftAlt);
        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainUI), Keys.LeftCommand);
        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainUI), Keys.RightAlt);
        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainUI), Keys.RightCommand);
        if (currentLockType === MouseLockType.Press) {
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.LeftAlt,
                () => (InputUtil.isLockMouse = false),
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainUI),
                Keys.LeftAlt,
                () => (InputUtil.isLockMouse = true),
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.LeftCommand,
                () => (InputUtil.isLockMouse = false),
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainUI),
                Keys.LeftCommand,
                () => (InputUtil.isLockMouse = true),
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.RightAlt,
                () => (InputUtil.isLockMouse = false),
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainUI),
                Keys.RightAlt,
                () => (InputUtil.isLockMouse = true),
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.RightCommand,
                () => (InputUtil.isLockMouse = false),
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainUI),
                Keys.RightCommand,
                () => (InputUtil.isLockMouse = true),
            );
        } else {
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.LeftAlt,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse),
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.LeftCommand,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse),
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.RightAlt,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse),
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainUI),
                Keys.RightCommand,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse),
            );
        }
    },
    undefined,
    undefined,
    "Mouse",
);
type PillUIInfo = {
    text: TextBlock;
    img: Image;
    num: number;
    name: TextBlock;
    duration: number;
    time: TextBlock;
    mask: MaskButton;
    timer: number;
    levelCanvas: Canvas;
};

export class MainUI extends Main_HUD_Generate {
    private playerMD: PlayerModuleC;

    private atrributeMD: AttributeModuleC = null;

    private playerData: BattleWorldPlayerModuleData;

    private motionMD: MotionModuleC = null;

    private gmKey: any = null;

    onStart() {
        this.atrributeMD = ModuleService.getModule(AttributeModuleC);
        this.motionMD = ModuleService.getModule(MotionModuleC);
        this.playerMD = ModuleService.getModule(PlayerModuleC);
        this.playerData = DataCenterC.getData(BattleWorldPlayerModuleData);

        // gm
        this.mBtn_GM.onClicked.add(() => {
            EventManager.instance.call(EModule_Events.gm_HideShowUI);
        });
        // 动作
        this.mActionBtn.onClicked.add(() => {
            if (UIService.getUI(P_Game_Action).isOpenAction) {
                UIService.hide(P_Game_Action);
                UIService.getUI(P_Game_Action).isOpenAction = false;
            } else {
                EventManager.instance.call(EModule_Events.action_open);
            }
        });
        // 设置
        this.mBtn_Setting.onClicked.add(() => {
            if (UIService.getUI(SettingUI)?.isShowing) {
                UIService.getUI(SettingUI)?.onBack();
            } else {
                EventManager.instance.call(EModule_Events.SetingModuleC_showSetingUI);
            }
        });
        // 重置
        this.mBtn_Reborn.onClicked.add(() => {
            this.reset();
        });
        // 回城
        this.mBtn_Back.onClicked.add(() => {
            this.back();

            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.back);

            // 埋点
            AnalyticsTool.send_ts_action_click(EClickEvent.back);
        });
        // 取消回城
        this.mCancel.onClicked.add(() => {
            this.listen_player_back_brake(EbackType.selfCancle);
        });
        // 刷新体力
        this.mBtn_Battle_Refresh.onClicked.add(() => {
            ModuleService.getModule(EnergyModuleC)?.refreshStaminaLimit();
            ModuleService.getModule(P12BagModuleC)?.refreshBagItem().then();
        });

        /**打开技能选择界面 */
        this.mSkillSelectBtn.onClicked.add(() => {
            EventManager.instance.call(ESkillEvent_C.SkillEvent_OpenSelectSkill_C);
        });

        // 打开段位UI
        this.mBtn_Rank.onClicked.add(() => {
            if (UIService.getUI(RankPanel)?.isShowing) {
                UIService.hide(RankPanel);
            } else {
                UIService.show(RankPanel);
            }
        });

        // 打开商店UI
        // KeyOperationManager.getInstance().bindButton(this, Keys.H, this.mBtn_OnlineShop);
        // this.mBtn_OnlineShop.onClicked.add(() => {
        //     if (UIService.getUI(P12ShopPanel)?.isShowing) {
        //         UIService.hide(P12ShopPanel);
        //     } else {
        //         UIService.show(P12ShopPanel);
        //     }
        // });

        this.mBtn_Battle_Plus.onClicked.add(() => {
            UIService.show(SenzuBeanConfirmPanel);
        });

        // MDBL Token
        Yoact.bindYoact(() => Gtk.trySetText(this.mMCoin, Utils.formatEtherInteger(BigInt(this.authModuleC?.currency.count ?? 0))));
        this.mBtn_MCoin_Refresh.onClicked.add(() => this.authModuleC?.refreshCurrency());

        this.playerMD.onAttributeChanged.add(this.onPlayerAttrChanged, this);
        this.playerMD.onAttributeInit.add(this.onAttributeInit, this);

        EventManager.instance.add(EModule_Events.area_changeArea, this.listen_area_changeArea, this);
        EventManager.instance.add(EPlayerEvents_C.player_back_brake, this.listen_player_back_brake, this);
        EventManager.instance.add(
            EAttributeEvents_C.Attribute_SkillPoints_Change_C,
            this.listen_askillPoints_change,
            this,
        );
        EventManager.instance.add(EPlayerEvents_C.Player_RefreshSkillPoints, this.listen_askillPoints_change, this);
        /**玩家金币数量发生变化 */
        EventManager.instance.add(EAttributeEvents_C.Attribute_Money_Change_C, this.listen_goldChanged, this);
        EventManager.instance.add(EModule_Events.shop_hideShowUI, this.setUIVisible, this);
        EventManager.instance.add(EPlayerEvents_C.Player_GM_PlayerInfo_C, this.listen_gmPlayerInfo, this);
        // 玩家拾取的丹药数量发生变化
        EventManager.instance.add(EModule_Events.land_pickUp_pill, this.listen_land_pickUp_pill, this);
        EventManager.instance.add(EModule_Events.land_lose_pill, this.listen_land_lose_pill, this);

        // 变身倒计时发生变化
        EventManager.instance.add(EModule_Events.land_dressUp_countdown, this.listen_land_dressUp_countdown, this);
        // 玩家杀戮值变化
        EventManager.instance.add(EAttributeEvents_C.Attribute_MassacreValue_C, this.listen_massacreValue, this);
        // 重置摇杆
        EventManager.instance.add(EPlayerEvents_C.PlayerEvent_ResetJoyStick_C, this.listen_resetJoyStick, this);
        // 玩家段位分变化
        // EventManager.instance.add(EAttributeEvents_C.Attribute_RankScore_Change_C, this.listen_rankScore, this);
        // // 怒气值变化
        // EventManager.instance.add(EAttributeEvents_C.Attribute_AngerValue_C, this.listen_angerChange, this);

        Yoact.bindYoact(() =>
            Gtk.trySetText(
                this.mBattle,
                Math.floor(ModuleService.getModule(EnergyModuleC).viewEnergyLimit.data).toString(),
            ),
        );
        Yoact.bindYoact(() =>
            Gtk.trySetText(
                this.mBattle_1,
                Math.floor(ModuleService.getModule(EnergyModuleC).viewEnergy.data).toString(),
            ),
        );

        this.mBtn_Battle_Add.onClicked.add(() => {
            // this.mBtn_Battle_Add.enable = false;
            ModuleService.getModule(EnergyModuleC).refreshStaminaLimit();
            // setTimeout(() => {
            //     this.mBtn_Battle_Add.enable = true;
            // }, 5e3);
        });

        this.onReserveAttrChanged();

        this.initBack();

        this.initVersion();

        this.initReset();

        this.initPill();

        this.jumpRoomBtn.onClicked.add(() => {
            if (UIService.getUI(JumpGamePanel).isShowing) {
                UIService.hide(JumpGamePanel);
            } else {
                UIService.show(JumpGamePanel);
            }
        });

        this.canUpdate = true;

        this.layer = mw.UILayerBottom;

        this.mSkillSelectBox.visibility = mw.SlateVisibility.Collapsed;
        // this.mBar_Fire.percent = 0;
        // this.mBar_Fire.visibility = mw.SlateVisibility.HitTestInvisible;

        this.listen_massacreValue();

        this.registerRedDot();

        Yoact.bindYoact(() => {
            Gtk.trySetText(this.mBattle, mwext.ModuleService.getModule(EnergyModuleC).viewEnergyLimit.data.toString());
        });

        this.mBtn_Battle_Add.onClicked.add(() => {
            UIService.show(BuyEnergyPanel);
        });

        this.mBtn_MCoin_Add.onClicked.add(() => {
            MessageBox.showOneBtnMessage(
                GameConfig.Language.Tips_Text_1.Value,
                GameConfig.Language.Deposit_1.Value,
                () => {
                    StringUtil.clipboardCopy(Globaldata.copyUrl);
                    Tips.show(GameConfig.Language.Copy_Success_Text_1.Value);
                },
                GameConfig.Language.Deposit_2.Value,
            );
        });

        EventManager.instance.add(
            EAttributeEvents_C.Attribute_RankScore_Change_C,
            (playerId: number, rankScore: number) => {
                Player.asyncGetLocalPlayer().then((player) => {
                    if (playerId == player.playerId) {
                        this.textDanNum.text = rankScore.toString();
                        let level = PlayerManager.instance.getRankLevel(rankScore);
                        this.imgDanIcon.imageGuid = GameConfig.Rank.getElement(level).rankImgID;
                    }
                });
            },
            this,
        );

        this.textKillNum.text = "0";

        KeyOperationManager.getInstance().onKeyDown(this, Keys.LeftAlt, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.LeftAlt, () => (InputUtil.isLockMouse = true));
        KeyOperationManager.getInstance().onKeyDown(this, Keys.RightAlt, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.RightAlt, () => (InputUtil.isLockMouse = true));
        KeyOperationManager.getInstance().onKeyDown(this, Keys.LeftCommand, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.LeftCommand, () => (InputUtil.isLockMouse = true));
        KeyOperationManager.getInstance().onKeyDown(this, Keys.RightCommand, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.RightCommand, () => (InputUtil.isLockMouse = true));

        let enable = true;
        KeyOperationManager.getInstance().onKeyUp(this, Keys.G, () => {

            if (enable) {
                if (UIService.getUI(SkillPanel).visible) {
                    UIService.getUI(SkillPanel).mWaiveBtn.onClicked.broadcast();
                } else if (UIService.getUI(SkillSelectPanel).visible) {
                    UIService.getUI(SkillSelectPanel).mDiscardBtn.onClicked.broadcast();
                } else if (this.mSkillSelectBox.visibility === SlateVisibility.SelfHitTestInvisible) {
                    // //最后判断技能选择按钮，优先panel
                    // ModuleService.getModule(SkillModuleC).discardSkillLib();
                }
                enable = false;
            } else {
                Tips.show(GameConfig.Language.Shop_tips_3.Value);
            }
            setTimeout(() => {
                enable = true;
            }, 1e3);

        });

        this.mCavasTrans.visibility = mw.SlateVisibility.Collapsed;

        Event.addServerListener(EModule_Events_S.setInvincibleBuff, this.setInvincibleBuff);
        this.canvasLevelDe.visibility = mw.SlateVisibility.Collapsed;
        this.mText_Defence_Time_cd_Long.text = "";
        this.mMask_Defence.fanShapedValue = 1;
        this.textDefence.visibility = mw.SlateVisibility.Collapsed;
    }

    private _authModuleC: AuthModuleC;

    private get authModuleC(): AuthModuleC | null {
        if (!this._authModuleC) this._authModuleC = ModuleService.getModule(AuthModuleC);
        return this._authModuleC;
    }

    public updateKillCount(killCount: number) {
        this.textKillNum.text = killCount.toString();
    }

    /**
     * 注册红点
     */
    private registerRedDot() {
        RedDotManager.instance.registerWidget(RedDotName.Rank, this.mBtn_Rank);
        UIService.getUI(RankPanel);
    }

    public setCameraSpeed(value: number) {
        this.mTouchPad.inputScale = new Vector2(value, value);
    }

    /**
     * 注册红点
     */
    // private registerRedDot() {
    //     RedDotManager.instance.registerWidget(RedDotName.Rank, this.mBtn_Rank);
    //     UIService.getUI(RankPanel);
    // }

    onShow() {
        this.listen_askillPoints_change(0, 0);

        // 埋点
        AnalyticsTool.send_ts_page(EPageName.main);
    }

    /**
     * 版本号
     */
    private initVersion() {
        this.mAttackNum.text = "";

        // let text = RouteService.getGameVersion();
        //
        // if (StringUtil.isEmpty(text)) {
        //     text = SystemUtil.getVersion();
        // }
        // if (StringUtil.isEmpty(text)) {
        //     text = "version null"
        // }
        //
        // text += `_${RoomService.getRoomId()}`
        // text += `_uid:${AccountService.getUserId()}`
        // this.mVersion.text = text;
    }

    private listen_gmPlayerInfo() {
        if (TimeUtil.onEnterFrame.includes(this.update_gmPlayerInfo, this) == false) {
            TimeUtil.onEnterFrame.add(this.update_gmPlayerInfo, this);
        }
    }

    private update_gmPlayerInfo() {
        let msg = "";
        msg = `最大移动速度：${mw.Player.localPlayer.character.maxWalkSpeed}`;

        this.mAttackNum.text = msg;
    }

    private listen_resetJoyStick() {
        this.mVirtualJoystickPanel.resetJoyStick();
    }

    /**
     * 技能点数量刷新
     */
    private listen_askillPoints_change(skillPointCount: number, oldValue: number) {
        let pointCount = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.weaponSkillPoints);

        let skillPanel = UIService.getUI(SkillPanel, false);
        if (skillPanel && skillPanel.visible) {
            pointCount -= 1;
        }

        let visibility = pointCount > 0 ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;

        this.mSkillSelectBox.visibility = visibility;

        this.mSkillSelctCount.text = pointCount.toString();
    }

    /*******************************************************血条&&能量&&金币*********************************************************/

    /**显示受伤UI*/
    private playingLowHpGlint: boolean = false;

    /**血条bg */
    private cur_life_val: number = 1;
    private target_life: number = 1;
    /**蓝条bg */
    private cur_Magic_val: number = 1;
    private target_Magic: number = 1;

    onUpdate() {
        this.cur_life_val = this.mBar_Life_back.currentValue;
        this.mBar_Life_back.currentValue = util.lerp(this.cur_life_val, this.target_life, 0.1);

        this.cur_Magic_val = this.mBar_Magic_back.currentValue;
        this.mBar_Magic_back.currentValue = util.lerp(this.cur_Magic_val, this.target_Magic, 0.1);
    }

    /**
     * 血量变化
     */
    public player_hpChange() {
        let max = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.maxHp);
        let hp = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.hp);

        if (max == null || hp == null || max == 0) {
            return;
        }

        let rate = hp / max;
        if (rate >= 1) {
            hp = Math.floor(max);
        }

        let preRate = this.mBar_Life.currentValue;
        this.mBar_Life.currentValue = rate;

        this.mText_Life.text = `${Math.floor(hp)}/${Math.floor(max)}`;
        this.target_life = Math.floor(hp) / Math.floor(max);

        if (rate < 0.1) {
            this.playingLowHpGlint = true;
            // this.img_low_hp.visibility = mw.SlateVisibility.Visible;
        } else {
            if (this.playingLowHpGlint == true) {
                // this.img_low_hp.visibility = mw.SlateVisibility.Collapsed;
                this.playingLowHpGlint = false;
            }
        }

        if (rate < preRate) {
            //this.onPlayerGetDamaged();

            this.listen_player_back_brake();
        }
    }

    /**
     * 属性初始化
     */
    private onAttributeInit() {
        this.onPlayerAttrChanged(Attribute.EnumAttributeType.energy);
    }

    /**
     * 即时属性变化
     */
    private onPlayerAttrChanged(attr: Attribute.EnumAttributeType) {
        if (attr != Attribute.EnumAttributeType.energy && attr != Attribute.EnumAttributeType.maxEnergyAdd) {
            return;
        }

        //能量
        let maxEnergy = this.playerMD.getAttr(Attribute.EnumAttributeType.maxEnergy);
        let curEnergy = this.playerMD.getAttr(Attribute.EnumAttributeType.energy);
        if (maxEnergy == null || curEnergy == null || maxEnergy == 0) {
            return;
        }

        this.mBar_Magic.currentValue = curEnergy / maxEnergy;
        this.mText_Magic.text = `${Math.floor(curEnergy)}/${Math.floor(maxEnergy)}`;
        this.target_Magic = Math.floor(curEnergy) / Math.floor(maxEnergy);
    }

    /**
     * 储备属性变化
     * 金币
     */
    private onReserveAttrChanged() {
        this.mGold.text = `${this.playerData.getAttrValue(Attribute.EnumAttributeType.money)}`;
    }

    /**
     * 储备属性变化
     * 金币
     */
    private listen_goldChanged(value: number) {
        this.mGold.text = `${value}`;
    }

    /**刷新能量条当前百分比 */
    public refresh_curMagicPer(per: number) {
        this.mBar_Magic_back.currentValue = per;
    }

    /*******************************************************回城*********************************************************/

    /**回城动画 */
    private reBackTween: mw.Tween<any> = null;

    /**回城计时-UI */
    private back_ui_cd: util.IntervalElement = null;

    /**回城计时-按钮*/
    private back_btn_cd: util.IntervalElement = null;

    /**回城特效*/
    private backEffeck: any = null;

    /**是否再回城中*/
    private isBacking: boolean = false;

    /**
     * 初始化回城
     */
    private initBack() {
        this.mMask_Back.visibility = mw.SlateVisibility.Collapsed;
        // this.backCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.backBtmCanvas.visibility = mw.SlateVisibility.Collapsed;
        this.mText_Back_Time_cd.visibility = mw.SlateVisibility.Collapsed;
    }

    /**
     * 区域变化
     * @param curAreaID
     */
    private listen_area_changeArea(curAreaID: number) {
        // curAreaID == EAreaId.Safe ? this.backCanvas.visibility = mw.SlateVisibility.Collapsed : this.backCanvas.visibility = mw.SlateVisibility.Visible;
    }

    /**
     * 打断回城
     */
    private listen_player_back_brake(backType: EbackType = EbackType.break) {
        if (this.isBacking == false) {
            return;
        }

        this.reBackTween?.stop();
        this.stopEffects();

        if (this.back_ui_cd) {
            this.back_ui_cd.clear();
            this.back_ui_cd = null;

            // 关闭回城动作
            EventManager.instance.call(EModule_Events.player_move, null);
        }
        if (this.back_btn_cd) {
            this.back_btn_cd.clear();
            this.back_btn_cd.clear();
        }

        this.backBtmCanvas.visibility = mw.SlateVisibility.Collapsed;

        switch (backType) {
            case EbackType.break:
                this.startBackBtnTimer(EbackType.break);
                this.startbackTween(EbackType.break);
                break;
            case EbackType.selfCancle:
                this.startBackBtnTimer(EbackType.selfCancle);
                this.startbackTween(EbackType.selfCancle);
                break;
            default:
                break;
        }

        this.isBacking = false;
    }

    /**
     * 回城
     */
    private back() {
        if (this.reBackTween && this.reBackTween.isPlaying()) {
            return;
        }
        if (PlyerState.dfaultState == EPlayerState.run) return;
        this.startbackTween(EbackType.break);
        this.startBackBtnTimer(EbackType.break);

        this.backBtmCanvas.visibility = mw.SlateVisibility.Visible;
        this.mBar_Back.currentValue = 1;
        this.mText_Back_Time.text = `${Globaldata.player_backTime}s`;

        if (this.back_ui_cd) {
            this.back_ui_cd.clear();
        }
        this.back_ui_cd = new util.IntervalElement(
            Globaldata.player_backTime,
            0.1,
            () => {
                // 关闭回城动作
                EventManager.instance.call(EModule_Events.player_move, null);

                this.backBtmCanvas.visibility = mw.SlateVisibility.Collapsed;
                this.mBar_Back.currentValue = 0;
                EventManager.instance.call(EAreaEvent_C.Area_BackSafe_C);
                this.isBacking = false;

                // 埋点
                EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.backed);
                // 埋点
                AnalyticsTool.send_ts_action_do(EMovementType.backSafe);
                //回城显示ui
                this.setCoinAndEnergyVisible(true);
            },
            (time: number) => {
                this.mText_Back_Time.text = `${time.toFixed(1)}s`;
                this.mBar_Back.currentValue = time / Globaldata.player_backTime;
            },
        );
        this.back_ui_cd.start();

        //特效
        this.backEffeck = util.playEffectOnPlayer(Player.localPlayer.playerId, 156);
        //播放回城动作
        EventManager.instance.call(EModule_Events.playAction, Globaldata.backAction);

        this.isBacking = true;
    }

    /**
     * 遮罩动画
     * @param backType
     */
    private startbackTween(backType: EbackType) {
        if (this.reBackTween) {
            this.reBackTween.stop();
        }
        let time =
            backType == EbackType.break ? Globaldata.player_backTime_cd : Globaldata.player_backTime_self_cancle_cd;
        this.reBackTween = new mw.Tween({ alpha: 0 })
            .to({ alpha: 1 }, time * 1000)
            .onUpdate((data) => {
                this.mMask_Back.fanShapedValue = data.alpha;
            })
            .onComplete(() => {
                this.mMask_Back.fanShapedValue = 1;
                this.mMask_Back.visibility = mw.SlateVisibility.Collapsed;
            })
            .onStart(() => {
                this.mMask_Back.visibility = mw.SlateVisibility.Visible;
            })
            .start();
    }

    /**
     * 开始回城按钮
     */
    private startBackBtnTimer(backType: EbackType) {
        this.mText_Back_Time_cd.visibility = mw.SlateVisibility.Visible;
        let time =
            backType == EbackType.break ? Globaldata.player_backTime_cd : Globaldata.player_backTime_self_cancle_cd;
        this.mText_Back_Time_cd.text = `${time.toFixed(0)}s`;
        if (this.back_btn_cd) {
            this.back_btn_cd.clear();
        }
        this.back_btn_cd = new util.IntervalElement(
            time,
            1,
            () => {
                this.mText_Back_Time_cd.visibility = mw.SlateVisibility.Collapsed;
            },
            (time: number) => {
                this.mText_Back_Time_cd.text = `${time.toFixed(0)}s`;
            },
        );
        this.back_btn_cd.start();
    }

    /**
     * 停止特效
     */
    private stopEffects() {
        if (this.backEffeck) {
            EffectService.stop(this.backEffeck);
        }
    }

    /*******************************************************重置*********************************************************/

    /**重置位置*/
    private rebornTween: mw.Tween<any> = null;

    /***
     * 重置位置
     */
    private initReset() {
        this.mMask_Reborn.visibility = mw.SlateVisibility.Collapsed;
        this.rebornTween = new mw.Tween({ alpha: 0 })
            .to({ alpha: 1 }, Globaldata.player_rebornTime * 1000)
            .onUpdate((data) => {
                this.mMask_Reborn.fanShapedValue = data.alpha;
            })
            .onComplete(() => {
                this.mMask_Reborn.fanShapedValue = 1;
                this.mMask_Reborn.visibility = mw.SlateVisibility.Collapsed;
            })
            .onStart(() => {
                this.mMask_Reborn.visibility = mw.SlateVisibility.Visible;
            });
    }

    /**
     * 重置位置
     */
    public reset() {
        if (ChangeMoldeBuffC.isChangeMolde) {
            let noteTxt = util.getLanguageByKey("Vehicle_tip_8"); //"当前状态受限"
            Notice.showDownNotice(noteTxt);
            return;
        }

        if (this.motionMD.isHasPlayMotion()) {
            let noteTxt = util.getLanguageByKey("Vehicle_tip_8"); //"当前状态受限"
            Notice.showDownNotice(noteTxt);
            return;
        }

        if (this.rebornTween.isPlaying()) return;
        this.rebornTween.start();

        this.mVirtualJoystickPanel.onInputDir.clear();
        this.playerMD.setMove(true);
        this.playerMD.changeState(EPlayerState.Idle);

        let player = Player.localPlayer;
        //fix:TypeError: Cannot read property'z' of undifined
        if (
            player == null ||
            player.character == null ||
            player.character.worldTransform == null ||
            player.character.worldTransform.rotation == null
        ) {
            return;
        }
        player.character.gravityScale = Globaldata.dfgravityScale;
        player.character.worldTransform.rotation = new mw.Rotation(0, 0, player.character.worldTransform.rotation.z);
        player.character.moveFacingDirection = mw.MoveFacingDirection.MovementDirection;
        player.character.movementDirection = mw.MovementDirection.ControllerDirection;
        player.character.setCollision(mw.PropertyStatus.On);
        player.character.movementEnabled = true;
        player.character.jumpEnabled = true;

        // 容错处理下落攻击
        if (this.motionMD.currentMotion) {
            this.motionMD.currentMotion.finish();
        }
    }

    /**
     * 恢复摇杆
     */
    onHide() {
        this.mVirtualJoystickPanel.resetJoyStick();
    }

    /**
     * 设置摇杆禁用
     * @param disable true 禁用 false 启用
     */
    public setJoystickDisable(disable: boolean) {
        if (disable) {
            this.mVirtualJoystickPanel.resetJoyStick();
            this.mVirtualJoystickPanel.visibility = mw.SlateVisibility.Collapsed;
        } else {
            this.mVirtualJoystickPanel.resetJoyStick();
            this.mVirtualJoystickPanel.visibility = mw.SlateVisibility.Visible;
        }
    }

    /**
     * 设置除摇杆外的ui显隐
     */
    private setUIVisible(visible: boolean) {
        this.hpCanvas.visibility = visible ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.mCanvasMoney.visibility = visible ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
    }

    /**************************************************杀戮值*************************************************************** */

    /**刷新杀戮信息 */
    private listen_massacreValue() {
        let value = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.massacreValue);
        if (value == 0) {
            this.mIcon_Kill.visibility = mw.SlateVisibility.Collapsed;
            this.mBar_Kill.visibility = mw.SlateVisibility.Collapsed;
            return;
        }

        if (this.mIcon_Kill.visible == false) {
            this.mIcon_Kill.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        if (this.mBar_Kill.visible == false) {
            this.mBar_Kill.visibility = mw.SlateVisibility.HitTestInvisible;
        }

        let perValue = value / Globaldata.massacre_max_layerCount;
        perValue = MathUtil.clamp(perValue, 0, 1);
        this.mBar_Kill.percent = perValue;
    }

    /*******************************************************丹药*********************************************************/

    /** 记录了增加的丹药类型对应的UI，目前先暂时这样写，后续考虑调整为动态生成 */

    private pillMap: Map<Attribute.EnumAttributeType, PillUIInfo> = new Map();

    /**
     * 初始化丹药的映射关系
     */
    private initPill() {
        //先暂时这样写着，后面不考虑用这种方式，考虑获取丹药时生成UI放到canvas中显示
        this.pillMap.set(Attribute.EnumAttributeType.atkAdd, {
            text: this.mText_Long_Num,
            img: this.mImage_Long,
            num: 0,
            name: this.textAttack,
            duration: 0,
            time: this.mText_Trans_Time_cd_Long,
            mask: this.mMask_Trans_Long,
            timer: -1,
            levelCanvas: this.canvasLevelF,
        });
        this.pillMap.set(Attribute.EnumAttributeType.defMultiple, {
            text: this.mText_Tortoise_Num,
            img: this.mImage_Tortoise,
            num: 0,
            name: this.textDefend,
            duration: 0,
            time: this.mText_Trans_Time_cd_Tortoise,
            mask: this.mMask_Trans_Tortoise,
            timer: -1,
            levelCanvas: this.canvasLevelD,
        });
        this.pillMap.set(Attribute.EnumAttributeType.maxHpAdd, {
            text: this.mText_Bone_Num,
            img: this.mImage_Bone,
            num: 0,
            name: this.textHeart,
            duration: 0,
            time: this.mText_Trans_Time_cd_Bone,
            mask: this.mMask_Trans_Bone,
            timer: -1,
            levelCanvas: this.canvasLevelH,
        });
        this.pillMap.set(Attribute.EnumAttributeType.maxEnergyAdd, {
            text: this.mText_Qi_Num,
            img: this.mImage_Qi,
            num: 0,
            name: this.textBlue,
            duration: 0,
            time: this.mText_Trans_Time_cd_Qi,
            mask: this.mMask_Trans_Qi,
            timer: -1,
            levelCanvas: this.canvasLevelB,
        });
        this.refreshPillVisible();
    }

    /**
     * 更新丹药的UI
     * @param pillType 拾取的丹药类型，-1表示清空显示
     */
    private listen_land_pickUp_pill(pillInfo: PillInfo) {
        if (!pillInfo) {
            for (let [_, second] of this.pillMap) {
                if (second && second.text) {
                    second.num = 0;
                    // second.text.text = second.num.toFixed();
                }
            }
        } else {
            if (pillInfo.attributeID) {
                const pillValue = this.pillMap.get(pillInfo.attributeID);
                //不需要叠加
                pillValue.num++;
                // pillValue.text.text = pillValue.num.toFixed();
                pillValue.duration = pillInfo.duration;
            }
        }
        this.refreshPillVisible();
    }

    /**
     * 失去一个丹药，更新UI
     * @param pillType 丹药类型，或者属性
     */
    private listen_land_lose_pill(pillType: number) {
        const pillValue = this.pillMap.get(pillType);
        if (pillType) {
            pillValue.num--;
            // pillValue.text.text = pillValue.num.toFixed();
        }
        this.refreshPillVisible();
    }

    /**
     * 刷新一下丹药的显隐
     */
    private refreshPillVisible() {
        let canvasShouldShow: boolean = false;
        for (let [_, second] of this.pillMap) {
            if (second && second.text && second.img) {
                if (second.num > 0) {
                    // second.text.visibility = SlateVisibility.Visible;
                    // second.img.visibility = SlateVisibility.Visible;
                    second.name.visibility = SlateVisibility.Visible;
                    canvasShouldShow = true;
                    // this.setBuffLevel(second.levelCanvas, second.num);
                    let oriDuration = second.duration;
                    if (second.timer === -1) {
                        second.timer = TimeUtil.setInterval(() => {
                            console.log(second.name.text, second.mask.fanShapedValue);
                            second.duration -= 0.1;
                            second.mask.fanShapedValue = (oriDuration - second.duration) / oriDuration;
                            second.time.text = `${second.duration.toFixed(1)}s`;
                            if (second.duration <= 0) {
                                // second.text.visibility = SlateVisibility.Collapsed;
                                // second.img.visibility = SlateVisibility.Collapsed;
                                second.time.text = "";
                                second.name.visibility = SlateVisibility.Collapsed;
                                second.mask.fanShapedValue = 1;
                                second.levelCanvas.visibility = SlateVisibility.Collapsed;
                                TimeUtil.clearInterval(second.timer);
                                second.timer = -1;
                            }
                        }, 0.1);
                    }
                } else {
                    // second.text.visibility = SlateVisibility.Collapsed;
                    // second.img.visibility = SlateVisibility.Collapsed;
                    second.name.visibility = SlateVisibility.Collapsed;
                    second.mask.fanShapedValue = 1;
                    second.time.text = "";
                    second.levelCanvas.visibility = SlateVisibility.Collapsed;
                    if (second.timer !== -1) {
                        TimeUtil.clearInterval(second.timer);
                        second.timer = -1;
                    }
                }
            }
        }
        // this.mCanvasPills.visibility = canvasShouldShow ? SlateVisibility.Visible : SlateVisibility.Collapsed;
    }

    /*******************************************************变身*********************************************************/

    /**
     * 更新变身倒计时的UI
     * @param countdown 倒计时
     */
    private listen_land_dressUp_countdown(countdown: number) {
        if (countdown <= 0) {
            this.mCavasTrans.visibility = SlateVisibility.Collapsed;
            this.mMask_Trans.fanShapedValue = 1;
        } else {
            this.mCavasTrans.visibility = SlateVisibility.Visible;
            this.mText_Trans_Time_cd.text = `${countdown.toFixed(1)}s`;
            let percent = countdown / Globaldata.land_dressup_duration;
            this.mMask_Trans.fanShapedValue = 1 - percent;
        }
    }

    /*******************************************************段位*********************************************************/
    private listen_rankScore(playerId: number, rankScore: number) {
        if (playerId != Player.localPlayer.playerId) return;
        let rank = PlayerManager.instance.getRankLevel(rankScore);
        let cfg = GameConfig.Rank.getElement(rank);
        this.mPoint.text = cfg.rankName + rankScore;
    }

    /*******************************************************怒气********************************************************* */

    /**玩家怒气值发生变化 */
    // private listen_angerChange() {

    //     let maxAngerValue = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.maxAngerValue);

    //     let curAngerValue = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.angerValue);

    //     this.mBar_Fire.percent = curAngerValue / maxAngerValue;
    // }

    private changeEnergy() {
        this.mBattle_1.text = Math.floor(ModuleService.getModule(EnergyModuleC).currEnergy()).toString();
    }

    public setCoinAndEnergyVisible(visible: boolean) {
        // this.mCanvasMCoin.visibility = visible ? SlateVisibility.Visible : SlateVisibility.Hidden;
        // this.mCanvasBattle.visibility = visible ? SlateVisibility.Visible : SlateVisibility.Hidden;
    }

    private setBuffLevel(parentCanvas: Canvas, level: number) {
        if (level === 0) {
            parentCanvas.visibility = SlateVisibility.Collapsed;
            return;
        }
        if (level <= parentCanvas.getChildrenCount()) {
            this.showBuffLevel(parentCanvas, level);
        }
    }

    private showBuffLevel(parentCanvas: Canvas, showLevel: number) {
        parentCanvas.visibility = SlateVisibility.Visible;
        for (let i = 0; i < parentCanvas.getChildrenCount(); i++) {
            if (i <= showLevel - 1) {
                parentCanvas.getChildAt(i).visibility = SlateVisibility.Visible;
            } else {
                parentCanvas.getChildAt(i).visibility = SlateVisibility.Collapsed;
            }
        }
    }

    private _invincibleBuffTimer: number = -1;
    private _invincibleBuffDuration: number = GameServiceConfig.INVINCIBLE_BUFF_TIME;
    public setInvincibleBuff = (isInvisible: boolean) => {
        if (isInvisible) {
            this._invincibleBuffTimer = TimeUtil.setInterval(() => {
                this._invincibleBuffDuration -= 100;
                this.mMask_Defence.fanShapedValue =
                    (GameServiceConfig.INVINCIBLE_BUFF_TIME - this._invincibleBuffDuration) /
                    GameServiceConfig.INVINCIBLE_BUFF_TIME;
                this.mText_Defence_Time_cd_Long.text = `${(this._invincibleBuffDuration / 1e3).toFixed(1)}s`;
                this.textDefence.visibility = mw.SlateVisibility.Visible;
                if (this._invincibleBuffDuration <= 0) {
                    TimeUtil.clearInterval(this._invincibleBuffTimer);
                    this.mMask_Defence.fanShapedValue = 1;
                    this.textDefence.visibility = mw.SlateVisibility.Collapsed;
                    this.mText_Defence_Time_cd_Long.text = "";
                    this._invincibleBuffDuration = GameServiceConfig.INVINCIBLE_BUFF_TIME;
                }
            }, 0.1);
        } else {
            TimeUtil.clearInterval(this._invincibleBuffTimer);
            this.mMask_Defence.fanShapedValue = 1;
            this.textDefence.visibility = mw.SlateVisibility.Collapsed;
            this.mText_Defence_Time_cd_Long.text = "";
            this._invincibleBuffDuration = GameServiceConfig.INVINCIBLE_BUFF_TIME;
        }
    };
}
