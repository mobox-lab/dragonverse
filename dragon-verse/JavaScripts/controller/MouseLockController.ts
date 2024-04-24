/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-04-23 16:35:46
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-23 17:54:47
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\controller\MouseLockController.ts
 * @Description  : 鼠标锁定管理器
 */

import KeyOperationManager from "./key-operation-manager/KeyOperationManager";

export class MouseLockController {
    private static _instance: MouseLockController;

    private _needMouseUnlock: boolean[] = [];

    private constructor() { }

    public static getInstance(): MouseLockController {
        if (!this._instance) {
            this._instance = new MouseLockController();
        }
        return this._instance;
    }

    needMouseUnlock() {
        this._needMouseUnlock.push(true);
        InputUtil.isLockMouse = false;
        //为了防止松开alt会导致鼠标锁定
        KeyOperationManager.getInstance().onKeyUp(null, Keys.LeftAlt, () => { });
        KeyOperationManager.getInstance().onKeyUp(null, Keys.RightAlt, () => { });
    }

    cancelMouseUnlock() {
        this._needMouseUnlock.pop();
        if (this._needMouseUnlock.length === 0) {
            InputUtil.isLockMouse = true;
        }
        KeyOperationManager.getInstance().unregisterKey(null, Keys.LeftAlt);
        KeyOperationManager.getInstance().unregisterKey(null, Keys.RightAlt);
    }
}