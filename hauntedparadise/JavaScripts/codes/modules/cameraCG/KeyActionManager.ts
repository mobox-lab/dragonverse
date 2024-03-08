import { CSConfig } from "./CSConfig";

/**
 * 按键状态管理器
 * 映射模块内操作到具体按键，实现无延迟监听按键按下状态
 */

export const enum KeyAction {
    CameraForward,
    CameraBack,
    CameraLeft,
    CameraRight,
    CameraUp,
    CameraDown,
    KeyFrame,
    DelKeyFrame,
    ChangeView,
    Back2LastFrame,
    PlayKeyFrames,
    PlayKeyFramesFromStart,
    StopKeyFrames,
    SaveAnim,
    ClearAnim,
    HoldUINode,
    OpenEditor,
    CloseEditor,
    EventFrame,
    HideViewPlay,
    CameraLeftRoll,
    CameraRightRoll,
    GoFrame,
}

/**
 * 按键状态管理器
 */
export class KeyActionManager {

    private static _instance: KeyActionManager;
    public static get instance(): KeyActionManager {
        if (!KeyActionManager._instance) {
            KeyActionManager._instance = new KeyActionManager();
        }
        return KeyActionManager._instance;
    }

    /** 初始化标记 */
    public isReady: boolean = false;

    /** 按下状态表 */
    private _actionStates: Map<KeyAction, boolean> = new Map<KeyAction, boolean>;
    private _btnStates: Map<string, boolean> = new Map<string, boolean>;

    private _isAltDown: boolean = false;

    public init() {
        if (this.isReady) return;
        // 初始化控制键
        InputUtil.onKeyDown(Keys.LeftAlt, () => {
            this._isAltDown = true;
        })
        InputUtil.onKeyUp(Keys.LeftAlt, () => {
            this._isAltDown = false;
        })

        CSConfig.KEY_ACTION_MAP.forEach((theKey, action, map) => {
            // 初始化按下状态 并设定状态改变监听
            this._actionStates.set(action, false);
            InputUtil.onKeyDown(theKey[0], () => {
                if (theKey.length >= 2 && this._isAltDown) {
                    this._actionStates.set(action, true);
                }
                if (theKey.length < 2 && !this._isAltDown) {
                    this._actionStates.set(action, true);
                }
            })
            InputUtil.onKeyUp(theKey[0], () => {
                this._actionStates.set(action, false);
            })
        });
        this.isReady = true;
    }

    /**
     * 检测功能是否被触发，无延迟（需要在update中调用，留意性能开销）
     * @param action 项目内按键操作枚举
     * @returns 是否被按下
     */
    public isPress(action: KeyAction | mw.Button): boolean {
        if (action instanceof mw.Button) {
            return this._btnStates.get(action.guid);
        } else {
            return this._actionStates.get(action);
        }
    }

    /**
     * 为指定按钮添加状态监听
     * @param btn 需要监听状态的按钮
     */
    public add(btn: mw.Button) {
        // 初始化按下状态 并设定状态改变监听
        this._btnStates.set(btn.guid, false);
        btn.onPressed.add(() => {
            this._btnStates.set(btn.guid, true);
        })
        btn.onReleased.add(() => {
            this._btnStates.set(btn.guid, false);
        })
    }

}