import { KeyAction } from "./KeyActionManager";

// export type BtnConfig = {
//     name: string,
//     icon: string,
//     iconScale: number,
//     folded: boolean
// }

/** 
 * 配置类
 */
export class CSConfig {
    /* 主UI按钮配置 */
    // public static readonly EditorUIBtn: Array<BtnConfig> = []

    /** 临时数据存储Key */
    public static readonly TEMP_STORAGE_KEY = "CSTempStorage";
    public static readonly TEMP_STORAGE_COPY_KEY = "CSTempStorageCopy";
    public static readonly TEMP_STORAGE_KEY_SET_CAMERA_SYNC = "CSTempStorageSetCameraSync";
    public static readonly TEMP_STORAGE_KEY_SET_ = "CSTempStorage";

    /** 按键映射 */
    public static readonly KEY_ACTION_MAP: Map<KeyAction, Keys[]> = new Map([
        // 通用
        [KeyAction.HoldUINode, [Keys.RightMouseButton]],
        [KeyAction.OpenEditor, [Keys.Home]],
        [KeyAction.CloseEditor, [Keys.End]],
        // 相机控制
        [KeyAction.CameraForward, [Keys.W]],
        [KeyAction.CameraBack, [Keys.S]],
        [KeyAction.CameraLeft, [Keys.A]],
        [KeyAction.CameraRight, [Keys.D]],
        [KeyAction.CameraUp, [Keys.E]],
        [KeyAction.CameraDown, [Keys.Q]],
        [KeyAction.CameraLeftRoll, [Keys.Q, Keys.LeftAlt]],
        [KeyAction.CameraRightRoll, [Keys.E, Keys.LeftAlt]],
        // 帧操作
        [KeyAction.DelKeyFrame, [Keys.Delete]],
        [KeyAction.KeyFrame, [Keys.F1]],
        [KeyAction.EventFrame, [Keys.F2]],
        [KeyAction.GoFrame, [Keys.F3]],
        [KeyAction.Back2LastFrame, [Keys.F4]],
        // 播放器操作
        [KeyAction.PlayKeyFrames, [Keys.F5]],
        [KeyAction.PlayKeyFramesFromStart, [Keys.F6]],
        [KeyAction.StopKeyFrames, [Keys.F7]],
        [KeyAction.ChangeView, [Keys.F8]],
        [KeyAction.HideViewPlay, [Keys.Enter]],
        // 数据操作
        [KeyAction.SaveAnim, [Keys.F9]],
        [KeyAction.ClearAnim, [Keys.F12]],
    ]);

}
