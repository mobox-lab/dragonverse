import { GameConfig } from "../../../config/GameConfig";
import { IMotionBtnDataElement } from "../../../config/MotionBtnData";
import { IMotionSkillElement } from "../../../config/MotionSkill";
import { EAnalyticsEvents, EMotionEvents_C, EPlayerEvents_C } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import { EventManager } from "../../../tool/EventManager";
import Tips from "../../../tool/P_Tips";
import { PlayerModuleC } from "../PlayerModuleC";
import { State_downAttack } from "../FSM/PlayerStates/State_downAttack";
import { AttributeModuleC } from "../../AttributeModule/AttributeModuleC";
import { Attribute } from "../sub_attribute/AttributeValueObject";
import { EPlayerState } from "../FSM/PlyerState";
import { EFirstDo } from "../../AnalyticsModule/AnalyticsTool";

enum EBtnType {
    /**按下释放技能 */
    Pressed = 0,
    /**连击＋重击 */
    DoubleAddBash = 1,
    /**点击事件 */
    ClickEvent = 2,
    /**蓄力自动释放事件 */
    ChargeAutoReleaseEvent = 3,
}

/**下落冲刺 状态下 对某些技能进行过滤 */
const diveFilterMotionIds: number[] = [1, 2];

export class MainUISkillButton {

    private playerMD: PlayerModuleC;
    private mAttribute: AttributeModuleC = null;

    private rootCanvas: mw.Canvas = null;
    private btn_invoke: mw.Button = null;

    private img_eff: mw.Image = null;

    private mIcon: mw.Image = null;

    private mBtnName: mw.TextBlock = null;
    private mCDMask: mw.MaskButton = null;
    private mBlue: mw.TextBlock = null;


    /**按钮索引 TODO优化到表里 */
    private btnIndex: number = 0;

    private motionSkillCfgs: IMotionSkillElement[] = [];
    private bashSkillCfg: IMotionSkillElement = null;


    /**按钮数据 */
    private _btnDataCfg: IMotionBtnDataElement = null;

    /**当前motion索引 */
    private _motionSkillIndex: number = 0;
    /**释放技能时的索引 */
    private _preMotionSkillIndex: number = 0;

    public init(rootCanvas: mw.Canvas, btnIndex: number) {

        this.btnIndex = btnIndex;
        this.rootCanvas = rootCanvas;
        this.btn_invoke = this.rootCanvas.getChildByName("Btn_invoke") as mw.Button;
        this.img_eff = this.rootCanvas.getChildByName("Img_eff") as mw.Image;
        this.mIcon = this.rootCanvas.getChildByName("MIcon") as mw.Image;
        this.mBtnName = this.rootCanvas.getChildByName("MBtnName") as mw.TextBlock;
        this.mCDMask = this.rootCanvas.getChildByName("MCDMask") as mw.MaskButton;
        this.mBlue = this.rootCanvas.getChildByName("MBlue") as mw.TextBlock;

        this.playerMD = ModuleService.getModule(PlayerModuleC);
        this.mAttribute = ModuleService.getModule(AttributeModuleC);


        this.btn_invoke.onPressed.add(this.onPressed.bind(this));
        this.btn_invoke.onReleased.add(this.onReleased.bind(this));

        this.btn_invoke.touchMethod = (mw.ButtonTouchMethod.DownAndUp);

        this.img_eff.visibility = mw.SlateVisibility.Collapsed;

        this.mIcon.visibility = mw.SlateVisibility.Collapsed;
        this.mBtnName.visibility = mw.SlateVisibility.Collapsed;

        this.mCDMask.visibility = mw.SlateVisibility.Collapsed;
        this.mBlue.visibility = mw.SlateVisibility.Collapsed;

        EventManager.instance.add(EPlayerEvents_C.PlayerEvent_ResetSkilCD_C, this.listen_resetSkilCD, this);
    }

    private listen_resetSkilCD() {
        this._curTime = this._targetTime;

        if (this._btnDataCfg == null) {
            return;
        }
        if (this._btnDataCfg.skillIds == null) {
            return;
        }

        let skillId = this._btnDataCfg.skillIds[0];
        if (skillId == undefined || skillId == null) {
            return;
        }
        let skillCfg = GameConfig.MotionSkill.getElement(skillId);
        if (skillCfg == null) {
            return;
        }

        this.playerMD.clearMotionUsed(skillCfg.motionId);
    }


    public hideBtn() {
        this._targetTime = 0;
        this._curTime = 0;
        this.setVisible(false);

        // if (this._btnDataCfg && this._btnDataCfg.btnType == 1) {
        //     mw.InputUtil.unbindButton(mw.Keys.RightMouseButton);
        // }
        if (this._btnDataCfg && this._btnDataCfg.btnType == 1) {
            mw.InputUtil.unbindButton(mw.Keys.Q);
        } else if (this._btnDataCfg && this._btnDataCfg.id == 1) {
            //是跳跃
            InputUtil.unbindButton(Keys.SpaceBar);
        } else if (this._btnDataCfg && this._btnDataCfg.id == 2) {
            //是冲刺
            InputUtil.unbindButton(Keys.C);
        }
    }

    public setVisible(visible: boolean) {

        let v = visible ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.rootCanvas.visibility = v;
    }

    public setInfo(btnDataId: number) {


        this.setVisible(true);
        this._btnDataCfg = GameConfig.MotionBtnData.getElement(btnDataId);

        if (this._btnDataCfg && this._btnDataCfg.btnType == 1) {
            mw.InputUtil.bindButton(mw.Keys.Q, this.btn_invoke);
        } else if (this._btnDataCfg && this._btnDataCfg.id == 1) {
            //是跳跃
            InputUtil.bindButton(Keys.SpaceBar, this.btn_invoke);
        } else if (this._btnDataCfg && this._btnDataCfg.id == 2) {
            //是冲刺
            InputUtil.bindButton(Keys.C, this.btn_invoke);
        }

        this._motionSkillIndex = 0;
        this.motionSkillCfgs.length = 0;

        this._targetTime = 0;
        this._curTime = 0;

        this.mBlue.visibility = mw.SlateVisibility.Collapsed;
        // 清理下要不 变身自动切技能不会释放
        this._isBashed = false;

        if (this._btnDataCfg.downSkillId > 0) {
            State_downAttack.downAttackSkillId = this._btnDataCfg.downSkillId;
        }
        this.mCDMask.visibility = mw.SlateVisibility.Collapsed;
        if (this._btnDataCfg.skillIds) {
            for (let index = 0; index < this._btnDataCfg.skillIds.length; index++) {
                const skillId = this._btnDataCfg.skillIds[index];
                let skillCfg = GameConfig.MotionSkill.getElement(skillId);
                if (skillCfg == null) {
                    Tips.showByLogLevel("技能配置不存在MotionSkill " + skillId);
                    continue;
                }
                this.motionSkillCfgs.push(skillCfg);
            }

            let cdNum = this.motionSkillCfgs[0].magicPoints;
            this.mBlue.text = cdNum.toString();

            if (this._btnDataCfg.showMask) {

                let skillCfg = this.motionSkillCfgs[0];

                let lastUseTime = this.playerMD.getRegisteredMotionLastUseTime(skillCfg.motionId);
                let time = Date.now() - lastUseTime;
                let intervalTime = time - skillCfg.cd * 1000;
                if (intervalTime < 0) {
                    this._curTime = Math.abs(time / 1000);
                    this._targetTime = skillCfg.cd;
                } else {
                    this._targetTime = 0;
                    this.mCDMask.fanShapedValue = 1;
                }
            }
        }


        this.refresh_base();

        switch (this._btnDataCfg.btnType) {
            case EBtnType.DoubleAddBash:
                {
                    this.bashSkillCfg = GameConfig.MotionSkill.getElement(this._btnDataCfg.bashSkillId);
                }
                break;
            default:
                break;
        }

    }

    private _targetTime: number = 0
    private _curTime: number = 0;

    public onUpdate(dt) {
        // time
        if (this._targetTime <= 0) {
            return;
        }
        if (this.mCDMask.visible == false) {
            this.mCDMask.visibility = mw.SlateVisibility.Visible;
        }
        this._curTime += dt;

        this.mCDMask.fanShapedValue = this._curTime / this._targetTime;

        if (this._curTime >= this._targetTime) {
            this.mCDMask.fanShapedValue = 1;
            this._curTime = 0;
            this._targetTime = 0;
            this.mCDMask.visibility = mw.SlateVisibility.Collapsed;
        }

    }


    private refresh_base() {

        this.btn_invoke.visibility = mw.SlateVisibility.Visible;


        if (StringUtil.isEmpty(this._btnDataCfg.btnIcon)) {
            this.mIcon.visibility = mw.SlateVisibility.Collapsed;
            this.mBtnName.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mBtnName.text = this.motionSkillCfgs[0].Name;
        } else {
            if (!this._btnDataCfg && this._btnDataCfg.btnType == 1) {
                //如果不是普攻再显示底图
                this.mIcon.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.mBtnName.visibility = mw.SlateVisibility.Collapsed;
                this.mIcon.imageGuid = this._btnDataCfg.btnIcon;
            }
        }


        let cdNum = this.motionSkillCfgs[0].magicPoints;
        if (this._btnDataCfg.showMask && cdNum > 0) {

            this.mBlue.visibility = mw.SlateVisibility.SelfHitTestInvisible;

        } else {
            this.mBlue.visibility = mw.SlateVisibility.Collapsed;
        }
    }




    /**释放技能时间戳 */
    private _releaseTimeStamp: number = 0;

    /**重击key */
    private _bashKey: any = null;
    /**是否释放了重击 */
    private _isBashed: boolean = false;

    private onPressed() {

        if (this.isCanReleaseSkill() == false) {
            return;
        }

        switch (this._btnDataCfg.btnType) {
            case EBtnType.Pressed:
                {
                    this.releaseSkill();
                }
                break;
            case EBtnType.DoubleAddBash:
                {
                    // 有可能配置 没有重击
                    if (this.bashSkillCfg) {
                        this._isBashed = false;
                        this.clear_bashKey();
                        this._bashKey = setTimeout(() => {
                            this._bashKey = null;
                            this._isBashed = true;
                            this.playerMD.weaponSkill(this.bashSkillCfg, true, false);
                        }, this._btnDataCfg.autoReleaseTime * 1000);
                    }
                }
                break;
            case EBtnType.ClickEvent:
                {
                    EventManager.instance.call(this._btnDataCfg.eventNames[0]);
                }
                break;
            case EBtnType.ChargeAutoReleaseEvent:
                {
                    this._isBashed = false;
                    this.clear_bashKey();
                    this._bashKey = setTimeout(() => {
                        this._bashKey = null;
                        this._isBashed = true;
                        EventManager.instance.call(this._btnDataCfg.eventNames[1]);
                    }, this._btnDataCfg.autoReleaseTime * 1000);
                }
                break;
        }
    }

    private clear_bashKey() {
        if (this._bashKey) {
            clearTimeout(this._bashKey);
        }
        this._bashKey = null;
    }

    private onReleased() {

        if (this.isCanReleaseSkill() == false) {
            this.clear_bashKey();
            return;
        }

        switch (this._btnDataCfg.btnType) {
            case EBtnType.Pressed:
                {

                }
                break;
            case EBtnType.DoubleAddBash:
                {
                    this.clear_bashKey();

                    if (this._isBashed == false) {
                        if (this._btnDataCfg.downSkillId > 0 &&
                            this.playerMD.jump_distance > Globaldata.fallAttackHeight) {
                            this.playerMD.attack();
                        } else {
                            this.releaseSkill();
                        }
                    }

                }
                break;
            case EBtnType.ClickEvent:
                {
                    EventManager.instance.call(this._btnDataCfg.eventNames[1]);
                }
                break;
            case EBtnType.ChargeAutoReleaseEvent:
                {
                    this.clear_bashKey();
                    if (this._isBashed == false) {
                        EventManager.instance.call(this._btnDataCfg.eventNames[0]);
                    }

                }
                break;
        }
    }


    /**释放技能 */
    private async releaseSkill() {

        //玩家状态
        if (this._btnDataCfg.btnType !== 0 && !this.playerMD.isCanSkill()) {
            return
        }

        let releaseInterval = Date.now() - this._releaseTimeStamp;  // 技能释放间隔
        // 技能cd判定
        if (releaseInterval <= Globaldata.motionSkill_btnMinTime * 1000) {
            return;
        }

        // 连击重置索引
        if (releaseInterval >= Globaldata.doubleHitResetTime * 1000) {
            this._motionSkillIndex = 0;
        }

        let releaseSkillCfg = this.motionSkillCfgs[this._motionSkillIndex];


        let result = await this.playerMD.weaponSkill(releaseSkillCfg, true, false);

        if (result == false) {
            // 判断技能是否需要预缓存
            if (this._btnDataCfg.isPrestore) {
                EventManager.instance.call(EMotionEvents_C.motion_addPrestore, this.releaseSkill.bind(this));
            }
            return;
        }

        // 缓存释放给技能时的索引
        this._preMotionSkillIndex = this._motionSkillIndex;

        // 是否显示cd遮罩
        if (this._btnDataCfg.showMask) {
            this._targetTime = releaseSkillCfg.cd;
        }

        // 记录释放时间
        this._releaseTimeStamp = Date.now();


        this._motionSkillIndex++;
        this._motionSkillIndex = this._motionSkillIndex % this.motionSkillCfgs.length;

        if (this._btnDataCfg && this._btnDataCfg.btnType != 1) {
            // 埋点
            EventManager.instance.call(EAnalyticsEvents.firstDo, EFirstDo.skilluse);
        }
    }

    /**玩家当前能否点击释放技能按钮 */
    private isCanReleaseSkill() {

        // TODO 优化结构 方便增加条件
        let complex = mw.Player.localPlayer.character.complexMovementEnabled;
        if (complex == false) {
            return false;
        }

        let curState = this.mAttribute.getAttributeValue(Attribute.EnumAttributeType.fsmState);
        if (curState == EPlayerState.Dive && this.motionSkillCfgs.length > 0) {
            // 冲刺 跳跃 可以打断 冲刺状态
            if (diveFilterMotionIds.includes(this.motionSkillCfgs[0].id) == false) {
                return false;
            }

            // 打断冲刺
            EventManager.instance.call(EPlayerEvents_C.Player_ChangePlayerState, EPlayerState.Idle);
        }


        return true;
    }

}