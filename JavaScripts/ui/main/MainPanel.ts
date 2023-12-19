import { EventDefine } from "../../const/EventDefine";
import MainPanel_Generate from "../../ui-generate/main/MainPanel_generate";
import BagPanel from "../bag/BagPanel";
import { CollectibleInteractorPanel } from "../collectible/CollectibleInteractorPanel";
import HandbookPanel from "../handbook/HandbookPanel";
import { SceneDragonInteractorPanel } from "../scene-dragon/SceneDragonInteractorPanel";
import GToolkit from "../../util/GToolkit";
import { AdvancedTweenTask } from "../../depend/waterween/tweenTask/AdvancedTweenTask";
import GlobalPromptPanel from "./GlobalPromptPanel";
import AccountService = mw.AccountService;
import Waterween from "../../depend/waterween/Waterween";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import CodeVerifyPanel from "../auth/CodeVerifyPanel";
import { AuthModuleC } from "../../module/auth/AuthModule";
import { SceneDragonModuleC } from "../../module/scene-dragon/SceneDragonModule";

/**
 * 主界面 全局提示 参数.
 */
interface ShowGlobalPromptEventArgs {
    message: string;
}

/**
 * 主界面.
 * @desc 常驻的. 除游戏实例销毁 任何时机不应该 destroy 此 UI.
 * @desc 监听 {@link EventDefine.ShowGlobalPrompt} 事件. 事件参数 {@link ShowGlobalPromptEventArgs}.
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
    private _collectibleInteractorMap: Map<string, CollectibleInteractorPanel> = new Map();
    private _sceneDragonInteractorMap: Map<string, SceneDragonInteractorPanel> = new Map();
    private _promptPanel: GlobalPromptPanel;

    private _sceneDragonModule: SceneDragonModuleC = null;

    public get sceneDragonModule(): SceneDragonModuleC | null {
        if (!this._sceneDragonModule) {
            this._sceneDragonModule = ModuleService.getModule(SceneDragonModuleC) ?? null;
        }
        return this._sceneDragonModule;
    }

    private _progressTask: AdvancedTweenTask<number>;

    private _progressShowTask: AdvancedTweenTask<number>;

    private _pointerTask: AdvancedTweenTask<number>;

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld UI Event
    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

        //#region Member init
        this._promptPanel = UIService.create(GlobalPromptPanel);
        this.btnJump.onPressed.add(() => {
            if (this._character) {
                this._character.jump();
            } else {
                Player.asyncGetLocalPlayer().then((player) => {
                    this._character = player.character;
                    this._character.jump();
                });
            }
        });

        this.btnBag.onPressed.add(showBag);
        this.btnBook.onPressed.add(showHandbook);
        this.btnCode.onPressed.add(showCode);
        this.btnDragonBall.onPressed.add(this.onCatchClick);

        this._progressTask =
            Waterween
                .to(
                    () => this.progressBar.percent,
                    (val) => this.progressBar.percent = val,
                    1,
                    2e3,
                    0,
                ).restart(true);
        this._progressTask.onDone.add((param) => {
            if (param) return;
            this.onProgressDone();
        });

        this._progressShowTask =
            Waterween
                .to(
                    () => this.cnvProgressBar.renderOpacity,
                    (val) => this.cnvProgressBar.renderOpacity = val,
                    1,
                    0.5e3,
                    0,
                ).restart(true);

        this._pointerTask =
            Waterween
                .to(
                    () => this.cnvPointer.renderTransformAngle,
                    (val) => this.cnvPointer.renderTransformAngle = val,
                    45,
                    0.5e3,
                    -45,
                )
                .restart(true)
                .pingPong();

        ModuleService.ready().then(() => {
            let res = ModuleService.getModule(AuthModuleC).canEnterGame();
            if (!res) {
                this.cnvDragonBall.visibility = SlateVisibility.Hidden;
            } else {
                this.btnCode.visibility = SlateVisibility.Hidden;
            }
        });

        this.init();
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event subscribe
        this._eventListeners.push(Event.addLocalListener(EventDefine.ShowGlobalPrompt, this.onShowGlobalPrompt));
        this._eventListeners.push(Event.addLocalListener(EventDefine.DragonOnLock, this.onPlayerTryCatch));
        this._eventListeners.push(Event.addLocalListener(EventDefine.DragonOnUnlock, this.onPlayerEndCatch));
        this._eventListeners.push(Event.addLocalListener(EventDefine.PlayerEnableEnter, this.onEnablePlayerEnter.bind(this)));
        this._eventListeners.push(Event.addLocalListener(EventDefine.PlayerDisableEnter, this.onDisablePlayerEnter.bind(this)));
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate() {
    }

    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onAdded() {
    }

    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onRemoved() {
    }

    /**
     * 构造UI文件成功后，UI对象再被销毁时调用
     * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
     */
    protected onDestroy() {
//#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
//#endregion ------------------------------------------------------------------------------------------
    }

    /**
     * 每一帧调用
     * 通过canUpdate可以开启关闭调用
     * dt 两帧调用的时间差，毫秒
     */
    //protected onUpdate(dt :number) {
    //}

    /**
     * 设置显示时触发
     */
    //protected onShow(...params:any[]) {
    //}

    /**
     * 设置不显示时触发
     */
    //protected onHide() {
    //}

    /**
     * 当这个UI界面是可以接收事件的时候
     * 手指或则鼠标触发一次Touch时触发
     * 返回事件是否处理了
     * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
     * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
     */
    //protected onTouchStarted(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
    //	return EventReply.unHandled; //EventReply.handled
    //}

    /**
     * 手指或则鼠标再UI界面上移动时
     */
    //protected onTouchMoved(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
    //	return EventReply.unHandled; //EventReply.handled
    //}

    /**
     * 手指或则鼠标离开UI界面时
     */
    //protected OnTouchEnded(InGemotry :Geometry,InPointerEvent:PointerEvent) :EventReply{
    //	return EventReply.unHandled; //EventReply.handled
    //}

    /**
     * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
     * 可以触发一次拖拽事件的开始生成
     * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
     */
    //protected onDragDetected(InGemotry :Geometry,InPointerEvent:PointerEvent):DragDropOperation {
    //	return this.newDragDrop(null);
    //}

    /**
     * 拖拽操作生成事件触发后经过这个UI时触发
     * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
     */
    //protected onDragOver(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
    //	return true;
    //}

    /**
     * 拖拽操作生成事件触发后在这个UI释放完成时
     * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
     */
    //protected onDrop(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation):boolean {
    //	return true;
    //}

    /**
     * 拖拽操作生成事件触发后进入这个UI时触发
     */
    //protected onDragEnter(InGemotry :Geometry,InDragDropEvent:PointerEvent,InDragDropOperation:DragDropOperation) {
    //}

    /**
     * 拖拽操作生成事件触发后离开这个UI时触发
     */
    //protected onDragLeave(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
    //}

    /**
     * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
     */
    //protected onDragCancelled(InGemotry :Geometry,InDragDropEvent:PointerEvent) {
    //}

    protected onShow() {
    }

    protected onHide() {
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Init
    public init() {
        GToolkit.trySetVisibility(this.cnvDragonBall, false);
        UIService.hideUI(this._promptPanel);

        this.refreshAvatar();

        //#region Exist for V1
        GToolkit.trySetVisibility(this.btnMail, false);
        GToolkit.trySetVisibility(this.btnBook, false);
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region UI Behavior
    public addCollectibleItemInteractor(syncKey: string) {
        const collectibleInteractor = UIService.create(CollectibleInteractorPanel);
        collectibleInteractor.init(syncKey);
        this._collectibleInteractorMap.set(syncKey, collectibleInteractor);
        this.collectibleInteractorContainer.addChild(collectibleInteractor.uiObject);
    }

    public addSceneDragonInteractor(syncKey: string) {
        const sceneDragonInteractor = UIService.create(SceneDragonInteractorPanel);
        sceneDragonInteractor.init(syncKey);
        this._sceneDragonInteractorMap.set(syncKey, sceneDragonInteractor);
        this.sceneDragonInteractorContainer.addChild(sceneDragonInteractor.uiObject);
    }

    public removeCollectibleItemInteractor(syncKey: string) {
        const uis = this._collectibleInteractorMap.get(syncKey);
        if (uis) {
            this.collectibleInteractorContainer.removeChild(uis.uiObject);
        }
        this._collectibleInteractorMap.delete(syncKey);
    }

    public removeSceneDragonInteractor(syncKey: string) {
        const uis = this._sceneDragonInteractorMap.get(syncKey);
        if (uis) {
            this.sceneDragonInteractorContainer.removeChild(uis.uiObject);
        }
        this._sceneDragonInteractorMap.delete(syncKey);
    }

    private showGlobalPrompt(message: string) {
        this._promptPanel.showPrompt(message);
    }

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
        this.btnDragonBall.enable = true;
        GToolkit.trySetVisibility(this.cnvDragonBall, true);
        this._pointerTask.restart();
    }

    /**
     * 捕捉.
     */
    public tryCatch() {
        this._pointerTask.pause();
        this.sceneDragonModule?.tryCatch();
        this.playProgress();
    }

    /**
     * 捕捉完成.
     */
    public endCatch() {
        GToolkit.trySetVisibility(this.cnvDragonBall, false);
    }

    public playProgress() {
        this._progressShowTask.forward();
        this._progressTask.restart();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    private onShowGlobalPrompt = (args: ShowGlobalPromptEventArgs) => {
        this.showGlobalPrompt(args.message);
    };

    private onCatchClick = () => {
        this.btnDragonBall.enable = false;
        this.tryCatch();
    };

    private onPlayerTryCatch = () => {
        Log4Ts.log(MainPanel, `try catch`);
        this.prepareCatch();
    };

    private onPlayerEndCatch = () => {
        Log4Ts.log(MainPanel, `end catch`);
        this.endCatch();
    };

    private onProgressDone = () => {
        this._progressShowTask.backward();
        const result = !GToolkit.isNullOrEmpty(this.sceneDragonModule?.currentCatchResultSyncKey ?? null);
        Log4Ts.log(MainPanel, `catch result: ${result}`);
        if (result) {
            GToolkit.isNullOrEmpty(this.sceneDragonModule?.currentCatchResultSyncKey ?? null);
            this.sceneDragonModule?.acceptCatch();
            this.endCatch();
        } else {
            this.prepareCatch();
        }
    };

    private onEnablePlayerEnter() {
        this.btnCode.visibility = SlateVisibility.Hidden;
    }

    private onDisablePlayerEnter() {
        this.cnvDragonBall.visibility = SlateVisibility.Hidden;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

function showBag() {
    UIService.show(BagPanel);
}

function showHandbook() {
    UIService.show(HandbookPanel);
}

function showCode() {
    UIService.show(CodeVerifyPanel);
}