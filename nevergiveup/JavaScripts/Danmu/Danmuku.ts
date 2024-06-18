/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-29 15:43:49
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-09 15:35:02
 * @FilePath     : \nevergiveup\JavaScripts\Danmu\Danmuku.ts
 * @Description  : 修改描述
 */

import { Config } from "../GameStart"
import Danmaku_Generate from "../ui-generate/Sundry/Danmaku_generate"

export class Danmuku extends Danmaku_Generate {
    public overAct: Action = new Action()
    private _position: Vector2 = new Vector2(1980, 0)

    public start(playerName: string, text: string, type: number = 1) {
        this._position.x = 1980
        this._position.y = MathUtil.randomFloat(100, 500)
        this.mMainCanvas.position = this._position
        let identityName = ""

        this.mName.text = playerName + "：" + identityName;
        if (type == 1) {
            this.mChat.text = text
            this.mEmojiContainer.visibility = SlateVisibility.Collapsed
            this.mChat.visibility = SlateVisibility.SelfHitTestInvisible
        } else {
            this.mEmoji.imageGuid = text
            this.mChat.visibility = SlateVisibility.Collapsed
            this.mEmojiContainer.visibility = SlateVisibility.SelfHitTestInvisible
        }
        this.rootCanvas.visibility = SlateVisibility.SelfHitTestInvisible
        this.canUpdate = true
    }

    private stop() {
        this._position.x = 0 - this.mMainCanvas.size.x
        this.mMainCanvas.position = this._position
        this.canUpdate = false
        this.rootCanvas.visibility = SlateVisibility.Collapsed
        this.overAct.call()
    }

    protected onUpdate(dt: number): void {
        this._position.x -= Config.danmukuSpeed * dt
        this.mMainCanvas.position = this._position
        if (this._position.x <= 0 - this.mMainCanvas.size.x) {
            this.stop()
        }
    }
}