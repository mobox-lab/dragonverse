import Danmaku_generate from "../../../ui-generate/ShareUI/danmaku/Danmaku_generate"
import { CeHuaDefines } from "../../CehuaDefines"
import { LanUtil } from "../../utils/LanUtil"


export default class Danmaku extends Danmaku_generate {

    public overAct: Action = new Action()
    private _position: Vector2 = new Vector2(1980, 0)

    public onStart() {
        TimeUtil.onEnterFrame.add((dt: number) => {
            if (!this.canUpdate) {
                return
            }
            this._position.x -= CeHuaDefines.DanmakuUISpd * dt;//this.mMainCanvas.size.x * dt
            this.mMainCanvas.position = this._position
            if (this._position.x <= 0 - this.mMainCanvas.size.x) {
                this.stop()
            }
        })
    }

    public start(playerName: string, text: string, type: number, count: number) {
        this._position.x = 1980
        this._position.y = MathUtil.randomFloat(100, 500)
        this.mMainCanvas.position = this._position
        let identityName = ""
        this.mName.text = playerName + "：" + identityName;
        if (type == 1) {
            this.mChat.text = text
            this.mEmoji.visibility = SlateVisibility.Collapsed
            this.mChat.visibility = SlateVisibility.SelfHitTestInvisible
        } else {
            this.mEmoji.imageGuid = text
            this.mChat.text = count != 1 ? `x${count}` : "";

            this.mChat.visibility = SlateVisibility.SelfHitTestInvisible
            this.mEmoji.visibility = SlateVisibility.SelfHitTestInvisible
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
}