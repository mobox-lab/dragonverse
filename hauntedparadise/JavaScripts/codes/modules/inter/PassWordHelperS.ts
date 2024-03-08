/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-11-16 13:23:02
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2023-11-17 14:15:29
 * @FilePath     : \hauntedparadise\JavaScripts\modules\inter\PassWordHelperS.ts
 * @Description  : 
 */
import { BoardHelper, BoardKeys } from "../blackboard/BoardDefine";

export class PassWordHelper {
    public static get instance() {
        if (!this._instance) {
            this._instance = new PassWordHelper();
        }
        return this._instance;
    }

    private static _instance: PassWordHelper;

    public static WordUpdateEvt = "wordUpdateEvt";

    private _cacheWord: string[] = [];

    constructor() {
        Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, curWord: string) => {
            //包含字串Password 说明是密码
            if (key.substring(0, 8) != BoardKeys.Password) {
                return;
            }
            this._cacheWord = [];
            for (let index = 0; index < curWord.length; index++) {
                const element = curWord[index];
                this._cacheWord.push(element);
            }
            Event.dispatchToLocal(PassWordHelper.WordUpdateEvt, key);
        })
    }

    public getNewNum(id: string, th: number): string {
        const curWord = BoardHelper.GetTargetKeyValue(BoardKeys.Password + id);
        if (th >= curWord.length) {
            return "0"
        }
        return curWord[th];
    }
}

PassWordHelper.instance;
