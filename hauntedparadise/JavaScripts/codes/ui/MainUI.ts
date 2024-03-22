import {GameConfig} from "../../config/GameConfig";
import Main_UI_Generate from "../../ui-generate/ShareUI/Main_UI_generate";
import GameStart, {EGameTheme} from "../GameStart";
import {ArchiveDataType} from "../modules/archive/ArchiveHelper";
import ArchiveModuleC from "../modules/archive/ArchiveModuleC";
import {BagItemData} from "../modules/bag/BagDefine";
import BagPanel from "../modules/bag/ui/BagPanel";
import {EquipDefine} from "../modules/equip/EquipDefine";
// import GhostGraphPanel from "../modules/ghost/ui/GhostGraphPanel";
import IDCardPanel from "../modules/idcard/ui/IDCardPanel";
import {ObjInterModuleC} from "../modules/inter/ObjInterModuleC";
import {PlayerInterModuleC} from "../modules/inter/PlayerInterModule";
import LockUI from "../modules/lock/LockUI";
import HpHud from "../modules/player/ui/HpHud";
import {ProcedureModuleC} from "../modules/procedure/ProcedureModuleC";
import {EmProcedureState} from "../modules/procedure/const/EmProcedureState";
import {NotebookPanel} from "../modules/procedure/ui/NotebookPanel";
import StoreModuleC from "../modules/store/StoreModuleC";
import {CommonUtils} from "../utils/CommonUtils";
import {GlobalSwitch} from "../utils/GlobalSwitch";
import MusicMgr from "../utils/MusicMgr";
import {default as EmojiUI, default as emojiUI} from "./EmojiUI";
import SetUI from "./SetUI";
import {TipsUI} from "./TipsUI";
import BuildMaterialPanel from "../../modules/build-material/BuildMaterialPanel";


/** 代表生命数量的图片 */
const LifeNumImags: string[] = ["227788", "227783", "227772", "227789", "227771"];

export class MainUI extends Main_UI_Generate {
    private _lastTriggerTime: number = 0;

    protected onAwake(): void {
        this.initButtons();
        this.btn_notebook.onClicked.add(() => {
            UIService.show(NotebookPanel);
        });
        // this.btn_catch.pressedMethod = mw.ButtonPressMethod.ButtonPress;
        this.btn_catch.clickMethod = mw.ButtonClickMethod.DownAndUp;
        this.btn_catch.touchMethod = ButtonTouchMethod.DownAndUp;
    }

    /** 缓存一个存活天数 */
    private curAliveDay;

    /** 设置存活天数 - 加载游戏的时候读存档 */
    public setAliveDay(aliveDay: number) {
        this.curAliveDay = aliveDay;
        UIService.getUI(MainUI).text_daynew.text = CommonUtils.formatString(GameConfig.Language.procedure_4.Value, (this.curAliveDay + 1));
    }

    /** 增加存活天数 - 更新天数的同时更新存档 */
    public addAliveDay() {
        this.setAliveDay(this.curAliveDay + 1);
        Event.dispatchToServer("OnPlayerAliveDayChange", this.curAliveDay);
        ModuleService.getModule(ArchiveModuleC).reqSaveData([ArchiveDataType.ALIVEDAY], [this.curAliveDay]);
    }

    onStart() {
        this.layer = mw.UILayerScene;
        this.mTouchPad.inputScale = Vector2.one.multiply(GameConfig.Global.cameraInputScale.number);
        this.btn_catch.onClicked.add(() => {
            let curTIme = TimeUtil.elapsedTime();
            if (curTIme - this._lastTriggerTime < 0.5) {
                console.error("操作过于频繁");
                return;
            }
            this._lastTriggerTime = curTIme;
            let res = ModuleService.getModule(PlayerInterModuleC).reqStopInter(true);
            if (res) {
                return;
            }
            ModuleService.getModule(ObjInterModuleC).triggerSelectItem();
        });
        this.btn_setting.onClicked.add(() => {
            UIService.show(SetUI);
        });
        this.btn_build_material.onClicked.add(() => {
            UIService.show(BuildMaterialPanel);
        });

        // this.btn_camera.onClicked.add(() => {
        //     UIService.show(GhostGraphPanel);
        // });

        this.btn_idCard.onClicked.add(() => {
            UIService.show(IDCardPanel, Player.localPlayer.userId);
        });

        this.btn_switchposition.onClicked.add(() => {
            UIService.show(emojiUI);
            this.btn_switchposition.visibility = SlateVisibility.Collapsed;
        });

        // this.btn_catch.onClicked.add(() => {
        //     let curTIme = TimeUtil.elapsedTime();
        //     if (curTIme - this._lastTriggerTime < 0.5) {
        //         console.error("操作过于频繁")
        //         return;
        //     }
        //     this._lastTriggerTime = curTIme;
        //     let res = ModuleService.getModule(PlayerInterModuleC).reqStopInter(true);
        //     if (res) {
        //         return;
        //     }
        //     ModuleService.getModule(ObjInterModuleC).triggerSelecteItem();
        // })
        this.btn_discardItem.onClicked.add(() => {
            EquipDefine.discardEquip();
        });
        this.btn_useprops.onClicked.add(() => {
            EquipDefine.activeUseEquip();
        });

        if (GameStart.GameTheme === EGameTheme.Graveyard) {
            this.btn_jump.onClicked.clear();
            this.btn_jump.onClicked.add(() => {
                MusicMgr.instance.play(2006);
                if (!Player.localPlayer.character) {
                    return;
                }
                Player.localPlayer.character.jump();
            });
        } else {
            this.btn_jump.onClicked.add(() => {
                Player.localPlayer.character.jump();
            });
        }
        this.btn_shop.onClicked.add(() => {
            ModuleService.getModule(StoreModuleC).openStore(1);
        });

        this.setHandVisible(false);
        this.initEquipUse();

        /** 启用跳跃按钮 */
        if (GlobalSwitch.enableJumpBtn()) {
            this.canvas_jump.visibility = SlateVisibility.SelfHitTestInvisible;
        }
    }

    private initEquipUse() {
        Event.addLocalListener(EquipDefine.EquipEvt, (equipData: BagItemData) => {
            if (equipData) {
                let cfg = GameConfig.Item.getElement(equipData.cfgId);
                if (cfg.isCanActiveUse) {
                    this.canvas_useprops.visibility = SlateVisibility.SelfHitTestInvisible;
                    this.img_props.imageGuid = cfg.icon;
                } else {
                    this.canvas_useprops.visibility = SlateVisibility.Collapsed;
                }
                if (cfg.isCanDiscard) {
                    this.canvas_discardItem.visibility = SlateVisibility.SelfHitTestInvisible;
                } else {
                    this.canvas_discardItem.visibility = SlateVisibility.Collapsed;
                }
            } else {
                this.canvas_useprops.visibility = SlateVisibility.Collapsed;
                this.canvas_discardItem.visibility = SlateVisibility.Collapsed;
            }
        });
    }

    /**
     *
     * @param needResetJoyStick 是否需要重置摇杆
     * @returns
     */
    onShow(needResetJoyStick: boolean = true, needPriorBagView: boolean = false) {
        // 不在游戏流程中却被显示了就关闭
        if (GameStart.GameTheme != EGameTheme.Hall && ModuleService.getModule(ProcedureModuleC).myScript.state != EmProcedureState.Start) {
            UIService.hideUI(this);
            return;
        }

        // 与笔记本页面不共存
        UIService.hide(NotebookPanel);
        // 与密码UI不共存
        UIService.hide(LockUI);
        needResetJoyStick && this.mVirtualJoystickPanel.resetJoyStick();
        console.log("ressetJoyStick");

        GlobalSwitch.enableHpHud() && UIService.show(HpHud);
        UIService.getUI(TipsUI).setCatVisiable(true);
        UIService.show(TipsUI);

        UIService.show(BagPanel, needPriorBagView);
    }

    onHide() {
        this.mVirtualJoystickPanel.resetJoyStick();
        console.log("ressetJoyStick");
        UIService.hide(HpHud);
        UIService.hide(EmojiUI);
        UIService.getUI(TipsUI).setCatVisiable(false);

        UIService.hide(BagPanel);
    }

    /** 是否静止交互UI的显示 */
    public banHandUIVisible: boolean = false;

    private _priority: number = 0;

    /**
     * 设置手的显隐
     * @param visible 是否显示
     * @param priority 显示的优先级，优先级高的会覆盖优先级低的
     * @returns
     */
    public setHandVisible(visible: boolean, priority: number = 0, isSync: boolean = true) {
        isSync && Event.dispatchToLocal("SetHandVisible", visible);
        if (visible && this.banHandUIVisible) {
            console.error("交互UI显示失败，被ban了！");
            return;
        }

        if (this._priority > priority) {
            return;
        }
        if (visible) {
            this._priority = priority;
        } else {
            this._priority = 0;
        }

        this.canvas_catch.visibility = visible ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    public getWhitePointPos() {
        let v1 = new Vector2(0, 0);
        let v2 = new Vector2(0, 0);
        mw.localToViewport(this.img_aim.paintSpaceGeometry, Vector2.zero, v1, v2);
        return v2;
    }

    public changeClockUI(color: LinearColor) {
        // this.mCanvas_pointer.renderTransformAngle = time / AllTimeSecond * 360;
        if (!this.img_moon || !this.img_moon.imageColor) {
            return;
        }
        this.img_moon.imageColor = color;
        //计算当前时间24小时制
        //  this.text_timenew.text = (Math.floor(time / AllTimeSecond * 24) + ":" + ((time / AllTimeSecond * 24 - Math.floor(time / AllTimeSecond * 24)) * 60).toFixed(0));
    }

    /** 应用大厅界面 */
    public applyHallPanel() {
        this.canvas_setting.visibility = SlateVisibility.Collapsed;
        // this.canvas_tools.visibility = SlateVisibility.Collapsed;
        this.canvas_time.visibility = SlateVisibility.Collapsed;
        this.btn_notebook.visibility = SlateVisibility.Collapsed;
        this.canvas_book.visibility = SlateVisibility.Collapsed;
        this.img_point.visibility = SlateVisibility.Collapsed;
    }
}
