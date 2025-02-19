import { EventDefine } from "../../const/EventDefine";
import MainPanel_Generate from "../../ui-generate/main/MainPanel_generate";
import BagPanel from "../bag/BagPanel";
import HandbookPanel from "../handbook/HandbookPanel";
import { AdvancedTweenTask } from "../../depend/waterween/tweenTask/AdvancedTweenTask";
import Waterween from "../../depend/waterween/Waterween";
import Log4Ts from "mw-log4ts";
import CodeVerifyPanel from "../auth/CodeVerifyPanel";
import { SceneDragonModuleC } from "../../module/scene-dragon/SceneDragonModule";
import { BagModuleC } from "../../module/bag/BagModule";
import { Yoact } from "../../depend/yoact/Yoact";
import TweenTaskGroup from "../../depend/waterween/TweenTaskGroup";
import i18n from "../../language/i18n";
import { CollectibleItemModuleC } from "../../module/collectible-item/CollectibleItemModule";
import UnifiedRoleController, { RoleMovementState } from "../../module/role/UnifiedRoleController";
import GameServiceConfig from "../../const/GameServiceConfig";
import { FlowTweenTask } from "../../depend/waterween/tweenTask/FlowTweenTask";
import { CubicBezier } from "../../depend/easing/Easing";
import MainCurtainPanel from "./MainCurtainPanel";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import { ObbyModuleC } from "../../module/obby/ObbyModule";
import { JumpGamePanel } from "../jump-game/JumpGamePanel";
import Nolan from "../../depend/nolan/Nolan";
import { MapPanel } from "../map/MapPanel";
import Gtk, { Regulator } from "gtoolkit";
import AccountService = mw.AccountService;
import bindYoact = Yoact.bindYoact;
import NpcBehavior from "../../module/npc/NpcBehavior";
import CollectibleItem from "../../module/collectible-item/CollectibleItem";
import DialogifyManager from "../../depend/dialogify/DialogifyManager";
import GlobalTips from "../../depend/global-tips/GlobalTips";
import { ActivateByUIAndTrigger, ActivateMode } from "../../gameplay/interactiveObj/ActiveMode";
import ADialoguePanelController from "../../depend/dialogify/dialogue-panel-controller/ADialoguePanelController";
import SettingsPanel from "../settings/SettingsPanel";
import { addGMCommand } from "mw-god-mod";
import DragonHandbook from "../dragon-handbook/DragonHandbook";
import { AuthModuleC } from "../../module/auth/AuthModule";
import P12ShopPanel from "../shop/P12ShopPanel";
import { formatEtherInteger } from "../../util/CommonUtil";

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
            MainPanel,
            `request to change mouse lock type to ${MouseLockType[type]}.`,
            `option param:`,
            `   0: ${MouseLockType[MouseLockType.Press]}`,
            `   1: ${MouseLockType[MouseLockType.Tap]}`
        );
        if (type === currentLockType) return;
        else currentLockType = type;

        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainPanel), Keys.LeftAlt);
        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainPanel), Keys.LeftCommand);
        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainPanel), Keys.RightAlt);
        KeyOperationManager.getInstance().unregisterKey(UIService.getUI(MainPanel), Keys.RightCommand);
        if (currentLockType === MouseLockType.Press) {
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.LeftAlt,
                () => (InputUtil.isLockMouse = false)
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainPanel),
                Keys.LeftAlt,
                () => (InputUtil.isLockMouse = true)
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.LeftCommand,
                () => (InputUtil.isLockMouse = false)
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainPanel),
                Keys.LeftCommand,
                () => (InputUtil.isLockMouse = true)
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.RightAlt,
                () => (InputUtil.isLockMouse = false)
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainPanel),
                Keys.RightAlt,
                () => (InputUtil.isLockMouse = true)
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.RightCommand,
                () => (InputUtil.isLockMouse = false)
            );
            KeyOperationManager.getInstance().onKeyUp(
                UIService.getUI(MainPanel),
                Keys.RightCommand,
                () => (InputUtil.isLockMouse = true)
            );
        } else {
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.LeftAlt,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse)
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.LeftCommand,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse)
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.RightAlt,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse)
            );
            KeyOperationManager.getInstance().onKeyDown(
                UIService.getUI(MainPanel),
                Keys.RightCommand,
                () => (InputUtil.isLockMouse = !InputUtil.isLockMouse)
            );
        }
    },
    undefined,
    undefined,
    "Mouse"
);

/**
 * 交互类型.
 * 调整顺序 将影响优先级.
 */
export enum InteractType {
    /**
     * 空置.
     */
    Null,
    /**
     * 捕捉.
     */
    Catch,
    /**
     * 对话.
     */
    Npc,
    /**
     * 收集.
     */
    Collect,
    /**
     * 传送.
     */
    Transport,
    /**
     * 自定义.
     */
    Custom,
}

/**
 * 自定义交互选项.
 */
export interface CustomInteractOption {
    /**
     * 名称.
     */
    name: string;

    /**
     * 图标 Guid.
     */
    icon: string;

    /**
     * 触发回调.
     */
    onTrigger: () => void;
}

/**
 * 主界面.
 * @desc 常驻的. 除游戏实例销毁 任何时机不应该 destroy 此 UI.
 * @desc 监听 {@link EventDefine.ShowGlobalPrompt} 事件. 事件参数 {@link string}.
 * @desc
 * @desc ---
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export default class MainPanel extends MainPanel_Generate {
    //#region Member
    private _eventListeners: EventListener[] = [];

    private _character: Character;

    private get character(): Character | null {
        if (!this._character) this._character = Player.localPlayer?.character ?? null;
        return this._character;
    }

    private get roleController(): UnifiedRoleController | null {
        return this.character?.player?.getPlayerState(UnifiedRoleController) ?? null;
    }

    private _sceneDragonModule: SceneDragonModuleC = null;

    private _nolan: Nolan;

    public get sceneDragonModule(): SceneDragonModuleC | null {
        if (!this._sceneDragonModule) {
            this._sceneDragonModule = ModuleService.getModule(SceneDragonModuleC) ?? null;
        }
        return this._sceneDragonModule;
    }

    private _collectibleItemModule: CollectibleItemModuleC = null;

    public get collectibleItemModule(): CollectibleItemModuleC | null {
        if (!this._collectibleItemModule) {
            this._collectibleItemModule = ModuleService.getModule(CollectibleItemModuleC) ?? null;
        }
        return this._collectibleItemModule;
    }

    private _bagModule: BagModuleC = null;

    public get bagModule(): BagModuleC | null {
        if (!this._bagModule) {
            this._bagModule = ModuleService.getModule(BagModuleC) ?? null;
        }
        return this._bagModule;
    }

    private _curtain: MainCurtainPanel;

    private _progressTask: AdvancedTweenTask<number>;

    private _progressShowTask: AdvancedTweenTask<number>;

    private _pointerTask: AdvancedTweenTask<number>;

    private _successTask: TweenTaskGroup;

    private _failTask: TweenTaskGroup;

    private _effectCnvTask: AdvancedTweenTask<number>;

    private _effectImgTasks: TweenTaskGroup[] = [];

    private _activatedInteractType: InteractType = undefined;

    private _currentInteractType: InteractType = InteractType.Null;

    private _staminaShownTask: AdvancedTweenTask<number>;

    private _staminaValueTask: FlowTweenTask<number>;

    private _staminaShown: boolean = false;

    private _staminaValueUpdateRegulator: Regulator = new Regulator(1e3);

    private _staminaScaleTask: FlowTweenTask<number>;

    private _lastCollectibleItem: string;

    private _collectCandidates: string[] = [];

    private _lastFocusNpc: NpcBehavior;

    private _npcCandidates: NpcBehavior[] = [];

    private _tpDoorCandidate: ActivateMode = undefined;

    private _customCandidate: CustomInteractOption;

    private _authModuleC: AuthModuleC;

    private get authModuleC(): AuthModuleC | null {
        if (!this._authModuleC) this._authModuleC = ModuleService.getModule(AuthModuleC);
        return this._authModuleC;
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld UI Event
    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

        //#region Member init
        this.layer = 0;

        // this._promptPanel = UIService.create(GlobalPromptPanel);

        this._curtain = UIService.create(MainCurtainPanel);
        this._curtain.layer = mw.UILayerTop;
        this._curtain = UIService.show(MainCurtainPanel);
        this._curtain.showCurtain(false);

        this.btnJump.onClicked.add(() => {
            if (this._character) {
                this.jump();
                this.roleController?.trySprint(false);
            } else {
                Player.asyncGetLocalPlayer().then((player) => {
                    this._character = player.character;
                    this.jump();
                    this.roleController?.trySprint(false);
                });
            }
        });

        // this.btnBag.onClicked.add(() => this.showBag());
        this.btnBag.onClicked.add(() => this.showDragonHandbook());
        // this.btnBook.onClicked.add(() => this.showHandbook());
        this.btnCode.onClicked.add(() => this.showCode());
        this.btnReset.onClicked.add(respawn);
        this.btnDragonBall.onClicked.add(() => this.tryCatch());

        this.btnFindPath.onClicked.add(() => {
            // 自动寻路
            ModuleService.getModule(ObbyModuleC).autoFindPath();
        });

        this.btnShield.onClicked.add(() => {
            // 护盾
            ModuleService.getModule(ObbyModuleC).setInvincible();
        });

        // this.updateMuteBtn();

        this.btnSound.onClicked.add(() => {
            // this.btnSound.enable = false;
            // // 判断是否静音
            // let res = !(AudioController.getInstance().isPlayBgm || AudioController.getInstance().isPlayEffect);
            // this.btnSound.pressedImageGuid = res
            //     ? GameServiceConfig.MAIN_PANEL_SOUND_BUTTON_IMG_GUID
            //     : GameServiceConfig.MAIN_PANEL_MUTE_BUTTON_IMG_GUID;
            // res = !res;
            // ModuleService.getModule(PlayerSettingModuleC).setMute(res);
            // AudioController.getInstance().mute(res);
            // this.btnSound.normalImageGuid = res
            //     ? GameServiceConfig.MAIN_PANEL_MUTE_BUTTON_IMG_GUID
            //     : GameServiceConfig.MAIN_PANEL_SOUND_BUTTON_IMG_GUID;
            // this.btnSound.normalImageSize = new Vector2(88, 96);
            // this.btnSound.pressedImageSize = new Vector2(88, 96);
            // this.btnSound.enable = true;
            if (!UIService.getUI(SettingsPanel).visible) {
                UIService.show(SettingsPanel);
            } else {
                UIService.hide(SettingsPanel);
            }
        });

        this.btnMap.onClicked.add(() => {
            if (!UIService.getUI(MapPanel) || !UIService.getUI(MapPanel).cnvMap.visible) {
                UIService.getUI(MapPanel)?.showBigMap();
            } else {
                UIService.getUI(MapPanel)?.showMiniMap();
            }
        });

        this._nolan = Nolan.getInstance();

        KeyOperationManager.getInstance().onKeyPress(this, Keys.W, () => {
            Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityX(1);
        });
        KeyOperationManager.getInstance().onKeyPress(this, Keys.S, () => {
            Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityX(-1);
        });
        KeyOperationManager.getInstance().onKeyPress(this, Keys.A, () => {
            Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityY(-1);
        });
        KeyOperationManager.getInstance().onKeyPress(this, Keys.D, () => {
            Player.localPlayer.getPlayerState(UnifiedRoleController).changeVelocityY(1);
        });
        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.MouseScrollUp, () => {
            if (!this._nolan) {
                Log4Ts.warn(MainPanel, `nolan not ready.`);
                return;
            }

            const dist = Math.max(
                GameServiceConfig.CAMERA_ZOOM_MIN_DIST,
                this._nolan.armLength - GameServiceConfig.CAMERA_ZOOM_PER_DIST
            );
            this._nolan.zoom(dist, true, GameServiceConfig.CAMERA_ZOOM_PER_DURATION);
        });
        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.MouseScrollDown, () => {
            if (!this._nolan) {
                Log4Ts.warn(MainPanel, `nolan not ready.`);
                return;
            }

            const dist = Math.min(
                GameServiceConfig.CAMERA_ZOOM_MAX_DIST,
                this._nolan.armLength + GameServiceConfig.CAMERA_ZOOM_PER_DIST
            );
            this._nolan.zoom(dist, true, GameServiceConfig.CAMERA_ZOOM_PER_DURATION);
        });
        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.SpaceBar, () => this.jump());
        KeyOperationManager.getInstance().onKeyDown(this, Keys.LeftAlt, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.LeftAlt, () => (InputUtil.isLockMouse = true));
        KeyOperationManager.getInstance().onKeyDown(this, Keys.LeftCommand, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.LeftCommand, () => (InputUtil.isLockMouse = true));
        KeyOperationManager.getInstance().onKeyDown(this, Keys.RightAlt, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.RightAlt, () => (InputUtil.isLockMouse = true));
        KeyOperationManager.getInstance().onKeyDown(this, Keys.RightCommand, () => (InputUtil.isLockMouse = false));
        KeyOperationManager.getInstance().onKeyUp(this, Keys.RightCommand, () => (InputUtil.isLockMouse = true));

        this.setCanSprint(true);

        if (this.bagModule) {
            bindYoact(() => (this.txtDragonBallNum.text = this.bagModule.dragonBallYoact.count.toString()));
            bindYoact(() => (this.playtimecount_1.text = this.bagModule.obbyTicketYoact.count.toString()));
            bindYoact(() => (this.textcoin.text = this.bagModule.obbyCoinYoact.count.toString()));
        } else {
            const listener = Event.addLocalListener(EventDefine.BagModuleClientReady, () => {
                bindYoact(() => (this.txtDragonBallNum.text = this.bagModule.dragonBallYoact.count.toString()));
                bindYoact(() => (this.playtimecount_1.text = this.bagModule.obbyTicketYoact.count.toString()));
                bindYoact(() => (this.textcoin.text = this.bagModule.obbyCoinYoact.count.toString()));
                listener.disconnect();
            });
        }

        this._progressTask = Waterween.to(
            () => this.progressBar.percent,
            (val) => (this.progressBar.percent = val),
            1,
            GameServiceConfig.SCENE_DRAGON_CATCH_PROGRESS_DURATION,
            0
        ).restart(true);
        this._progressTask.onDone.add((param) => {
            if (param) return;
            this.onProgressDone();
        });

        this._progressShowTask = Waterween.to(
            () => this.cnvProgressBar.renderOpacity,
            (val) => (this.cnvProgressBar.renderOpacity = val),
            1,
            0.5e3,
            0
        ).restart(true);

        this._pointerTask = Waterween.to(
            () => this.cnvPointer.renderTransformAngle,
            (val) => (this.cnvPointer.renderTransformAngle = val),
            GameServiceConfig.MAIN_PANEL_POINTER_END_ANGLE,
            GameServiceConfig.MAIN_PANEL_POINTER_HALF_DURATION,
            GameServiceConfig.MAIN_PANEL_POINTER_START_ANGLE
        )
            .restart(true)
            .pingPong();

        this._successTask = Waterween.group(
            () => {
                return this.imgOperationSuccess.renderOpacity;
            },
            (val) => {
                this.imgOperationSuccess.renderOpacity = val;
                this.txtOperationFeedback.renderOpacity = val;
            },
            [
                { dist: null, duration: 1e3 },
                { dist: 0, duration: 0.5e3 },
            ],
            1
        );

        this._failTask = Waterween.group(
            () => {
                return this.imgOperationFail.renderOpacity;
            },
            (val) => {
                this.imgOperationFail.renderOpacity = val;
                this.txtOperationFeedback.renderOpacity = val;
            },
            [
                { dist: null, duration: 1e3 },
                { dist: 0, duration: 0.5e3 },
            ],
            1
        );

        this._effectCnvTask = Waterween.to(
            () => this.cnvSprintEffect.renderOpacity,
            (val) => (this.cnvSprintEffect.renderOpacity = val),
            1,
            GameServiceConfig.MAIN_PANEL_CNV_SPRINT_EFFECT_DURATION,
            0
        ).restart(true);
        this._effectCnvTask.onDone.add((param) => {
            if (param) this._effectImgTasks.forEach((value) => value.pause());
        });

        const dist = [
            { dist: 0.3, duration: 0.1e3 },
            { dist: 0.4, duration: 0.1e3 },
            { dist: 0.2, duration: 0.1e3 },
            { dist: 0.5, duration: 0.1e3 },
            { dist: 0.3, duration: 0.1e3 },
        ];
        this._effectImgTasks.push(
            Waterween.group(
                () => this.imgSprintEffect1.renderOpacity,
                (val) => (this.imgSprintEffect1.renderOpacity = val),
                dist
            ).repeat()
        );

        this._staminaShownTask = Waterween.to(
            () => this.cnvStamina.renderOpacity,
            (val) => (this.cnvStamina.renderOpacity = val),
            1,
            GameServiceConfig.MAIN_PANEL_CNV_STAMINA_SHOWN_DURATION,
            0
        ).restart(true);

        this._staminaValueTask = Waterween.flow(
            () => this.barStamina.percent,
            (val) => (this.barStamina.percent = val),
            1e3,
            new CubicBezier(0.5, 0, 0.5, 1),
            undefined,
            true
        );

        this._staminaScaleTask = Waterween.flow(
            () => this.cnvStamina.renderScale.x,
            (val) => (this.cnvStamina.renderScale = new Vector(val, val)),
            1e3,
            new CubicBezier(0.5, 0, 0.5, 1),
            undefined,
            true
        );

        Gtk.doWhenTrue(() => !!this.authModuleC, () => {
            // MDBL Token
            bindYoact(() => Gtk.trySetText(this.mText_token, formatEtherInteger(BigInt(this.authModuleC.currency.count ?? 0))));
            this.btn_Fresh_Token.onClicked.add(() => this.authModuleC.refreshCurrency());
        });

        this.btnCode.visibility = SlateVisibility.Hidden;

        this.btnJumpGame.onClicked.add(() => {
            if (!UIService.getUI(JumpGamePanel, false) || !UIService.getUI(JumpGamePanel).visible) {
                UIService.show(JumpGamePanel);
            } else {
                UIService.hide(JumpGamePanel);
            }
        });

        // KeyOperationManager.getInstance().bindButton(this, Keys.H, this.btnShop);
        this.btnShop.onClicked.add(() => {
            if (UIService.getUI(P12ShopPanel)?.isShowing) {
                UIService.hide(P12ShopPanel);
            } else {
                UIService.show(P12ShopPanel);
            }
        })

        this.init();
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event subscribe
        this._eventListeners.push(Event.addLocalListener(EventDefine.DragonOnLock, () => this.prepareCatch()));
        this._eventListeners.push(Event.addLocalListener(EventDefine.DragonOnUnlock, () => this.endCatch()));
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.PlayerEnableEnter, this.onEnablePlayerEnter.bind(this))
        );
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.PlayerDisableEnter, this.onDisablePlayerEnter.bind(this))
        );
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.TryCollectCollectibleItem, (arg) => this.tryCollect(arg as string))
        );
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.PlayerReset, (playerId) => {
                if (playerId === this.character.player.playerId) Log4Ts.log(MainPanel, `Player reset.`);
            })
        );
        this._eventListeners.push(Event.addLocalListener(EventDefine.OnDragonQuestsComplete, this.onFinishSubTask));

        // this._eventListeners.push(
        //     Event.addLocalListener(PlayerSettingModuleC.EVENT_NAME_PLAYER_SETTING_CHANGED, () => this.updateMuteBtn()),
        // );
        this._eventListeners.push(
            Event.addLocalListener(
                DialogifyManager.PlayerEnterOfficialDialogueEventName,
                () => (this._currentInteractType = InteractType.Npc)
            )
        );
        this._eventListeners.push(
            Event.addLocalListener(
                DialogifyManager.LeaveDialogueEventName,
                () => this._currentInteractType === InteractType.Npc && (this._currentInteractType = InteractType.Null)
            )
        );

        this._eventListeners.push(
            Event.addLocalListener(DialogifyManager.PlayerEnterOfficialDialogueEventName, () => {
                KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
                    DialogifyManager.getInstance().exit();
                });
            }),
            Event.addLocalListener(DialogifyManager.LeaveDialogueEventName, () => {
                KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
            }),
            Event.addLocalListener(ADialoguePanelController.ControllerExitDialogueEventName, () => {
                KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
            })
        );
        //#endregion ------------------------------------------------------------------------------------------
    }

    // private updateMuteBtn() {
    //     let res = !(AudioController.getInstance().isPlayBgm || AudioController.getInstance().isPlayEffect);
    //     if (res) {
    //         this.btnSound.normalImageGuid = GameServiceConfig.MAIN_PANEL_MUTE_BUTTON_IMG_GUID;
    //     } else {
    //         this.btnSound.normalImageGuid = GameServiceConfig.MAIN_PANEL_SOUND_BUTTON_IMG_GUID;
    //     }
    //     AudioController.getInstance().mute(res);
    // }

    protected onUpdate() {
        if (this._staminaValueUpdateRegulator.request()) {
            const currValue = this.roleController?.movementState?.stamina ?? 0;
            const shown = currValue !== RoleMovementState.STAMINA_MAX_COUNT;

            if (this._staminaShown !== shown) {
                this.showStamina(shown);
                this._staminaShown = shown;
            }
            this._staminaValueTask.to(currValue / RoleMovementState.STAMINA_MAX_COUNT);
        }

        if (this._staminaShown) {
            this.updateStaminaLocation();
            this.updateStaminaScale();
        }

        this.judgeInteractType();
    }

    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onAdded() {}

    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onRemoved() {}

    /**
     * 构造UI文件成功后，UI对象再被销毁时调用
     * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
     */
    protected onDestroy() {
        //#region Event Unsubscribe
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    /**
     * 每一帧调用
     * 通过canUpdate可以开启关闭调用
     * dt 两帧调用的时间差，毫秒
     */
    // protected onUpdate(dt :number) {
    //}

    /**
     * 设置显示时触发
     */
    // protected onShow(...params:any[]) {
    //}

    /**
     * 设置不显示时触发
     */
    // protected onHide() {
    //}

    /**
     * 当这个UI界面是可以接收事件的时候
     * 手指或则鼠标触发一次Touch时触发
     * 返回事件是否处理了
     * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
     * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
     */
    // protected onTouchStarted(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
    //	return EventReply.unHandled; //EventReply.handled
    //}

    /**
     * 手指或则鼠标再UI界面上移动时
     */
    // protected onTouchMoved(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
    //	return EventReply.unHandled; //EventReply.handled
    //}

    /**
     * 手指或则鼠标离开UI界面时
     */
    // protected OnTouchEnded(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
    //	return EventReply.unHandled; //EventReply.handled
    //}

    /**
     * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
     * 可以触发一次拖拽事件的开始生成
     * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
     */
    // protected onDragDetected(InGemotry :Geometry,InPointerEvent:PointerEvent):DragDropOperation {
    //	return this.newDragDrop(null);
    //}

    /**
     * 拖拽操作生成事件触发后经过这个UI时触发
     * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
     */
    // protected onDragOver(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
    //	return true;
    //}

    /**
     * 拖拽操作生成事件触发后在这个UI释放完成时
     * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
     */
    // protected onDrop(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
    //	return true;
    //}

    /**
     * 拖拽操作生成事件触发后进入这个UI时触发
     */
    // protected onDragEnter(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation) {
    //}

    /**
     * 拖拽操作生成事件触发后离开这个UI时触发
     */
    // protected onDragLeave(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
    //}

    /**
     * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
     */
    // protected onDragCancelled(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
    //}

    protected onShow() {}

    protected onHide() {}

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Init
    public init() {
        Gtk.trySetVisibility(this.cnvDragonBall, false);
        // UIService.hideUI(this._promptPanel);
        this.cnvSprintEffect.renderOpacity = 0;
        this.imgOperationFail.renderOpacity = 0;
        this.imgOperationSuccess.renderOpacity = 0;
        this.txtOperationFeedback.renderOpacity = 0;
        this.btnDragonBall.enable = false;
        this.refreshAvatar();

        //#region Exist for V1
        Gtk.trySetVisibility(this.btnCode, false);
        // Gtk.trySetVisibility(this.btnBook, false);
        // Gtk.trySetVisibility(this.btnDragon, false);
        Gtk.trySetVisibility(this.obbySkillCanvas, false);
        // Gtk.trySetVisibility(this.playcount, false);
        // Gtk.trySetVisibility(this.coincount, false);
        // Gtk.trySetVisibility(this.btnDragonBall, false);
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    /**
     * @description: 设置是否可以冲刺
     * @param canSprint 是否可以冲刺
     */
    public setCanSprint(canSprint: boolean) {
        if (canSprint) {
            KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.LeftShift, () => {
                this.roleController?.trySprint(true);
            });
            KeyOperationManager.getInstance().onKeyUp(this, mw.Keys.LeftShift, () => {
                this.roleController?.trySprint(false);
            });
            KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.RightShift, () => {
                this.roleController?.trySprint(true);
            });
            KeyOperationManager.getInstance().onKeyUp(this, mw.Keys.RightShift, () => {
                this.roleController?.trySprint(false);
            });
        } else {
            this.roleController?.trySprint(false);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.LeftShift);
            KeyOperationManager.getInstance().unregisterKey(this, Keys.RightShift);
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region UI Behavior

    //#region ├ Interact Btn
    // 尝试有效化/注册一个可交互物品的交互按键.
    // 按照优先级规则的首个元素将占用并渲染交互按键.

    public enableCollectibleItem(syncKey: string) {
        if (this._collectCandidates.indexOf(syncKey) >= 0) {
            Log4Ts.log(MainPanel, `already in candidates.`, `syncKey: ${syncKey}`);
            return;
        }
        this._collectCandidates.push(syncKey);
    }

    public disableCollectibleItem(syncKey: string) {
        Gtk.remove(this._collectCandidates, syncKey, false);
    }

    public enableNpc(npc: NpcBehavior) {
        if (this._npcCandidates.indexOf(npc) >= 0) {
            Log4Ts.log(MainPanel, `already in candidates.`, `syncKey: ${npc}`);
            return;
        }
        if (!npc.talkEnable()) {
            Log4Ts.log(MainPanel, `npc talk disabled.`, `npc config id: ${npc.configId}`);
            return;
        }
        this._npcCandidates.push(npc);
    }

    public disableNpc(npc: NpcBehavior) {
        Gtk.remove(this._npcCandidates, npc, false);
    }

    public enableTransport(door: ActivateMode) {
        if (this._tpDoorCandidate === door) {
            Log4Ts.log(MainPanel, `already in candidates.`);
            return;
        }
        this._tpDoorCandidate = door;
    }

    public disableTransport() {
        this._tpDoorCandidate = undefined;
    }

    public enableCustom(option: CustomInteractOption) {
        this._customCandidate = option;
    }

    public disableCustom() {
        this._customCandidate = undefined;
    }

    private renderInteractOptionForCatch(): boolean {
        if (this._activatedInteractType === InteractType.Catch) return false;

        this.txtInteractContent.text = i18n.resolves.CatchMainKey();
        this.imgInteractIcon.imageGuid =
            GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_CATCH ?? Gtk.IMAGE_FULLY_TRANSPARENT_GUID;
        this.btnInteract.onClicked.clear();
        this.btnInteract.onClicked.add(this.onTryCatchBtnClick);
        return true;
    }

    private renderInteractOptionForNpc(): boolean {
        let c = this._npcCandidates.sort(NpcBehavior.priorityCmp)[0];
        if (this._activatedInteractType === InteractType.Npc && c === this._lastFocusNpc) return false;
        let valid: boolean = true;
        if (!c) {
            valid = false;
            Log4Ts.error(MainPanel, `null or empty collect candidates.`);
        }
        let greetContent = c.getGreetContent();
        this.txtInteractContent.text = valid && !Gtk.isNullOrEmpty(greetContent) ? greetContent : "";
        this.imgInteractIcon.imageGuid =
            GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_TALK ?? Gtk.IMAGE_FULLY_TRANSPARENT_GUID;
        this.btnInteract.onClicked.clear();
        valid && this.btnInteract.onClicked.add(this.onTryInteractNpc);
        this._lastFocusNpc = c;
        return true;
    }

    private renderInteractOptionForCollect(): boolean {
        let c = this._collectCandidates.sort(CollectibleItem.priorityCmp)[0];
        if (this._activatedInteractType === InteractType.Collect && c === this._lastCollectibleItem) return false;
        let valid: boolean = true;
        if (!c) {
            valid = false;
            Log4Ts.error(MainPanel, `null or empty collect candidates.`);
        }
        this.txtInteractContent.text = valid ? i18n.resolves.CollectLanKey0001() : "";
        this.imgInteractIcon.imageGuid =
            GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_COLLECT ?? Gtk.IMAGE_FULLY_TRANSPARENT_GUID;
        this.btnInteract.onClicked.clear();
        valid && this.btnInteract.onClicked.add(this.onTryCollectBtnClick);
        this._lastCollectibleItem = c;
        return true;
    }

    private renderInteractOptionForTransport(): boolean {
        if (this._activatedInteractType === InteractType.Transport) return false;

        this.txtInteractContent.text = i18n.resolves.TransportMainKey();
        this.imgInteractIcon.imageGuid =
            GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_TRANSPORT ?? Gtk.IMAGE_FULLY_TRANSPARENT_GUID;
        this.btnInteract.onClicked.clear();
        this.btnInteract.onClicked.add(this.onTryTransport);
        return true;
    }

    private renderInteractOptionForCustom(): boolean {
        if (Gtk.isNullOrUndefined(this._customCandidate)) {
            Log4Ts.warn(MainPanel, `set cnv interact with custom type, but option is null.`, `set with default value.`);
            this.txtInteractContent.text = "";
            this.imgInteractIcon.imageGuid = Gtk.IMAGE_FULLY_TRANSPARENT_GUID;
            return false;
        } else {
            this.txtInteractContent.text = this._customCandidate.name ?? "";
            let imgGuid =
                this._customCandidate.icon ??
                GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_CUSTOM ??
                Gtk.IMAGE_FULLY_TRANSPARENT_GUID;
            if (imgGuid !== this.imgInteractIcon.imageGuid) this.imgInteractIcon.imageGuid = imgGuid;
            this.btnInteract.onClicked.clear();
            this.btnInteract.onClicked.add(() => this._customCandidate.onTrigger());
            return true;
        }
    }

    public judgeInteractType() {
        let type: InteractType = InteractType.Null;
        if (this._currentInteractType !== InteractType.Null) {
            // 正在进行某项交互.
            type = InteractType.Null;
        } else if (this._tpDoorCandidate !== undefined) {
            type = InteractType.Transport;
        } else if (!Gtk.isNullOrEmpty(this.sceneDragonModule?.candidate)) {
            type = InteractType.Catch;
        } else if (this._npcCandidates.length > 0) {
            type = InteractType.Npc;
        } else if (this._collectCandidates.length > 0) {
            type = InteractType.Collect;
        } else if (this._customCandidate !== undefined) {
            type = InteractType.Custom;
        }

        if (type === InteractType.Null) {
            if (this._activatedInteractType === InteractType.Null) return;
            this.txtInteractContent.text = "";
            this.imgInteractIcon.imageGuid = Gtk.IMAGE_FULLY_TRANSPARENT_GUID;
            this.btnInteract.onClicked.clear();

            Gtk.trySetVisibility(this.cnvInteract, false);
        } else {
            Gtk.trySetVisibility(this.cnvInteract, true);
            switch (type) {
                case InteractType.Catch:
                    this.renderInteractOptionForCatch();
                    break;
                case InteractType.Npc:
                    this.renderInteractOptionForNpc();
                    break;
                case InteractType.Collect:
                    this.renderInteractOptionForCollect();
                    break;
                case InteractType.Transport:
                    this.renderInteractOptionForTransport();
                    break;
                case InteractType.Custom:
                    this.renderInteractOptionForCustom();
                    break;
            }
        }
        this._activatedInteractType = type;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    /**
     * 更新头像.
     */
    public refreshAvatar() {
        AccountService.fillAvatar(this.imgUserAvatarIcon);
    }

    /**
     * 待捕捉态.
     */
    public prepareCatch() {
        Log4Ts.log(MainPanel, `try catch`);
        if (this._currentInteractType !== InteractType.Null) return;

        this._currentInteractType = InteractType.Catch;
        this.btnDragonBall.enable = true;
        Gtk.trySetVisibility(this.cnvDragonBall, true);
        this._pointerTask.restart();
    }

    /**
     * 捕捉.
     */
    public tryCatch() {
        this.btnDragonBall.enable = false;
        this._pointerTask.pause();
        this.sceneDragonModule?.tryCatch();
        this.playProgress();
    }

    /**
     * 收集.
     */
    public tryCollect(syncKey: string) {
        if (this._currentInteractType !== InteractType.Null) return;
        if (this.collectibleItemModule?.isCollecting ?? true) return;

        this._currentInteractType = InteractType.Collect;
        this.collectibleItemModule?.tryCollect(syncKey);
        this.playProgress();
    }

    /**
     * 捕捉完成.
     */
    public endCatch() {
        Log4Ts.log(MainPanel, `end catch`);
        this.roleController?.removeMoveForbiddenBuff();
        this._currentInteractType = InteractType.Null;
        this.btnDragonBall.enable = false;
        Gtk.trySetVisibility(this.cnvDragonBall, false);
    }

    /**
     * 播放 Progress 动画.
     */
    public playProgress() {
        this._progressShowTask.forward();
        this._progressTask.restart();
    }

    public showResult(isSuccess: boolean, type: InteractType) {
        const focusTask = isSuccess ? this._successTask : this._failTask;
        const anotherTask = isSuccess ? this._failTask : this._successTask;

        if (!anotherTask.isPause) {
            anotherTask.restart(true);
            if (isSuccess) {
                this.imgOperationFail.renderOpacity = 0;
            } else {
                this.imgOperationSuccess.renderOpacity = 0;
            }
        }
        switch (type) {
            case InteractType.Catch:
                this.txtOperationFeedback.text = i18n.lan(isSuccess ? i18n.lanKeys.Catch_002 : i18n.lanKeys.Catch_003);
                break;
            case InteractType.Collect:
                this.txtOperationFeedback.text = i18n.lan(
                    isSuccess ? i18n.lanKeys.Collection_002 : i18n.lanKeys.Collection_003
                );
                break;
            default:
                break;
        }
        focusTask.restart();
    }

    /**
     * 是否 有效化 重置按钮.
     * @param enable
     */
    public enableReset(enable = true) {
        Gtk.trySetVisibility(this.resetCanvas, enable);
        this.btnReset.onClicked.clear();
        if (enable) {
            this.btnReset.onClicked.add(respawn);
        }
    }

    public showBag() {
        if (ModuleService.getModule(BagModuleC)?.isReady ?? false) {
            if (!UIService.getUI(BagPanel, false) || !UIService.getUI(BagPanel).visible) {
                UIService?.show(BagPanel);
            } else {
                UIService.hide(BagPanel);
            }
        }
    }

    public showHandbook() {
        if (ModuleService.getModule(BagModuleC)?.isReady ?? false) {
            UIService?.show(HandbookPanel);
        }
    }

    public showDragonHandbook() {
			if (ModuleService.getModule(BagModuleC)?.isReady ?? false) {
					if (!UIService.getUI(DragonHandbook, false) || !UIService.getUI(DragonHandbook).visible) {
							UIService?.show(DragonHandbook);
					} else {
							UIService.hide(DragonHandbook);
					}
			}
	}

    public showCode() {
        UIService?.show(CodeVerifyPanel);
    }

    public showSprintUiEffect(enable: boolean = true) {
        if (enable) {
            this._effectCnvTask.forward().continue();
            this._effectImgTasks.forEach((item) => item.continue());
        } else {
            this._effectCnvTask.backward().continue();
        }
    }

    private showStamina(enable: boolean = true) {
        if (enable) {
            this._staminaShownTask.forward().continue();
        } else {
            this._staminaShownTask.backward().continue();
        }
    }

    private updateStaminaLocation() {
        if (!this.character) return;
        const v = new Vector2();
        ScreenUtil.projectWorldPositionToWidgetPosition(
            this.character.player,
            this.character.worldTransform.position.add(
                Player.getControllerRotation().rotateVector(
                    new Vector(
                        0,
                        GameServiceConfig.MAIN_PANEL_CNV_STAMINA_WORLD_LOCATION_OFFSET_Y,
                        GameServiceConfig.MAIN_PANEL_CNV_STAMINA_WORLD_LOCATION_OFFSET_Z
                    )
                )
            ),
            v,
            true
        );

        if (!v.equals(Vector.zero)) {
            this.cnvStamina.position = v.set(v);
        } else {
            // 投影失效了
            this.cnvStamina.position = WindowUtil.getViewportSize()
                .clone()
                .multiply(0.5)
                .subtract(this.cnvStamina.size.clone().multiply(0.5))
                .add(new Vector2(GameServiceConfig.MAIN_PANEL_CNV_STAMINA_SCREEN_LOCATION_OFFSET_X, 0));
        }
    }

    private updateStaminaScale() {
        this._staminaScaleTask.to(
            GameServiceConfig.MAIN_PANEL_STAMINA_SCALE_CALCULATE_BASE / Camera.currentCamera.springArm.length
        );
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback

    private onProgressDone = () => {
        this._progressShowTask.backward();

        switch (this._currentInteractType) {
            case InteractType.Null:
                Log4Ts.warn(MainPanel, `there is no interact behavior.`);
                break;
            case InteractType.Catch:
                const catchResult = !Gtk.isNullOrEmpty(this.sceneDragonModule?.currentCatchResultSyncKey ?? null);
                Log4Ts.log(MainPanel, `catch result: ${catchResult}`);
                this.sceneDragonModule?.acceptResult();
                this.endCatch();
                this.showResult(catchResult, InteractType.Catch);
                break;
            case InteractType.Collect:
                const collectResult = !Gtk.isNullOrEmpty(
                    this.collectibleItemModule?.currentCollectResultSyncKey ?? null
                );
                Log4Ts.log(MainPanel, `collect result: ${collectResult}`);
                if (collectResult) {
                    Gtk.isNullOrEmpty(this.collectibleItemModule?.currentCollectResultSyncKey ?? null);
                    this.collectibleItemModule?.acceptCollect();
                }
                this.showResult(collectResult, InteractType.Collect);
                break;
            default:
                Log4Ts.warn(MainPanel, `type not supported.`);
        }
        this._currentInteractType = InteractType.Null;
    };

    jump() {
        if (!this.btnJump.enable) return;
        if (!(Player.localPlayer.character.getCurrentState() === CharacterStateType.Swimming)) {
            // this._character.changeState(CharacterStateType.Jumping);
            this.character.jump();
        } else {
            actions
                .tween(Player.localPlayer.character.worldTransform)
                .to(10, {
                    position: Player.localPlayer.character.worldTransform.position.clone().add(new Vector(0, 0, 100)),
                })
                .call(() => {
                    // this._character.changeState(CharacterStateType.Jumping);
                    this.character.jump();
                })
                .start();
        }
    }

    private onEnablePlayerEnter() {
        this.btnCode.visibility = SlateVisibility.Hidden;
    }

    private onDisablePlayerEnter() {
        this.cnvDragonBall.visibility = SlateVisibility.Hidden;
    }

    private onTryCatchBtnClick = () => {
        if (this.bagModule.hasDragonBall()) {
            this.sceneDragonModule.lock();
        } else {
            GlobalTips.getInstance().showGlobalTips(i18n.lan(i18n.lanKeys.Catch_004));
        }
    };

    private onTryCollectBtnClick = () => {
        this.tryCollect(this._lastCollectibleItem);
    };

    private onTryInteractNpc = () => {
        this._npcCandidates[0]?.talkWith();
    };

    private onTryTransport = () => {
        (this._tpDoorCandidate as ActivateByUIAndTrigger).clickToStartInteraction();
    };

    private onFinishSubTask = () => {
        // GlobalTips.getInstance().showGlobalTips(i18n.lan(i18n.lanKeys.TinyGameLanKey0004));
    };

    public enableJump(enable: boolean) {
        this.btnJump.enable = enable;
    }

    public switchToCowLevel(transferCallBack: () => void, respawnCallBack: () => void) {
        this.mapCanvas.visibility = SlateVisibility.Collapsed;
        this.transferCanvas.visibility = SlateVisibility.Visible;
        this.resetCanvas.visibility = SlateVisibility.Visible;
        this.btnCow.onClicked.clear();
        this.btnCow.addKey(Keys.T);
        this.btnCow.onClicked.add(transferCallBack);

        this.btnReset.onClicked.clear();
        this.btnReset.onClicked.add(respawnCallBack);
    }

    public switchToTransferLevel() {
        this.resetCanvas.visibility = SlateVisibility.Collapsed;
        // this.transferCanvas.visibility = SlateVisibility.Collapsed;
        this.mapCanvas.visibility = SlateVisibility.Collapsed;
        // this.btnCow.removeKey(Keys.T);
        this.btnReset.onClicked.clear();
    }

    public backToMainScene() {
        this.resetCanvas.visibility = SlateVisibility.Visible;
        this.transferCanvas.visibility = SlateVisibility.Collapsed;
        this.mapCanvas.visibility = SlateVisibility.Visible;
        this.btnCow.removeKey(Keys.T);
        this.btnReset.onClicked.clear();
        this.btnReset.onClicked.add(respawn);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

function respawn() {
    Event.dispatchToLocal(EventDefine.PlayerReset, Player.localPlayer.playerId);
    Event.dispatchToServer(EventDefine.PlayerReset, Player.localPlayer.playerId);
    Player.localPlayer.getPlayerState(UnifiedRoleController)?.respawn();
}
