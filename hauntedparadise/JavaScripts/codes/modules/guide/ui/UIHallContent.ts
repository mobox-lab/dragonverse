/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-01-29 10:18:54
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-05 11:48:17
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\guide\ui\UIHallContent.ts
 * @Description  : 
 */

import { IGuideTalkElement } from "../../../../config/GuideTalk";
import Hall_Chat_UI_Generate from "../../../../ui-generate/ShareUI/hall/Hall_Chat_UI_generate";
import Hall_Content_UI_Generate from "../../../../ui-generate/ShareUI/hall/Hall_Content_UI_generate";
import { WaitLoop } from "../../../utils/AsyncTool";
import { LanUtil } from "../../../utils/LanUtil";
import UIHallPopUp from "./UIHallPopUp";

const ItemLimit: number = 3

const OffsetY: number = 240

export default class UIHallContent extends Hall_Content_UI_Generate {

    private _msgData: IGuideTalkElement[] = []

    private _dataIndex: number = 0;

    private _itemIndex: number = 0;

    private _endCall: Function;

    private _oriPosition: Vector2;

    onStart() {
        this._oriPosition = this.content.position.clone()
        this.mBtnSkip.onClicked.add(() => {
            Event.dispatchToLocal("SkipMessage")
            this.mBtnSkip.enable = false;
            TimeUtil.delayExecute(() => { this.mBtnSkip.enable = true; }, 3)

        })
    }

    onShow() {
        UIService.hide(UIHallPopUp)
    }

    initMsgData(data: IGuideTalkElement[]) {
        this._msgData = data
    }

    setMessage() {
        if (this._dataIndex >= this._msgData.length) return
        let msgData = this._msgData[this._dataIndex];
        if (msgData.content.length <= 0) {
            this._dataIndex++;
            this._itemIndex = 0;
            this._endCall && this._endCall()
            return;
        }
        this._itemIndex++;
        if (this._itemIndex > ItemLimit) {
            let toPos = new Vector(this.content.position.x, this.content.position.y - OffsetY)
            new Tween(this.content.position)
                .to(toPos)
                .duration(300)
                .onUpdate((val) => { this.content.position = val })
                .onComplete(() => { this.createChatItem(msgData) })
                .start()
            return
        }
        this.createChatItem(msgData)
    }

    private createChatItem(msgData: IGuideTalkElement) {
        let text = LanUtil.getText(msgData.content.shift());
        let time = msgData.deltaTime.shift();
        if (!text) return
        let item = UIService.create(UIHallChat)
        this.content.addChild(item.uiObject)
        item.setData(text, this, time);
    }

    resetContent() {
        this.content.position = this._oriPosition;
        this.content.removeAllChildren()
    }

    showMessage(call?: Function) {
        UIService.show(UIHallContent)
        this._endCall = call;
        this.setMessage()
    }

    onHide() {
        this.resetContent()
    }

}

export class UIHallChat extends Hall_Chat_UI_Generate {

    private _isPlaying: boolean = true;
    private _timer: any;
    private _parent: UIHallContent
    private _event: EventListener;
    private _content: string
    private _timeOut: any;

    setData(content: string, UIContent: UIHallContent, delta: number = 200) {
        let index = 1
        this._parent = UIContent
        this._content = content
        this._timer = setInterval(async () => {
            this._isPlaying = true
            let sound = await GameObject.asyncSpawn("205629") as Sound
            sound.onFinish.add(() => { sound.destroy() })
            sound.play()
            if (!this.mText_Content || this.mText_Content.text === null) {
                await WaitLoop.loop(() => { return this.mText_Content && this.mText_Content.text != null }, 1e2, 50)
            }
            this.mText_Content.text = this._content.slice(0, index);
            let width = this.mText_Content.desiredSize.x < 200 ? 200 : this.mText_Content.desiredSize.x + 160
            this.mImg_DialogBox.size = new Vector2(width, 430)
            index++;
            if (index > this._content.length) {
                this.stop()
                this.waitNext()
            }
        }, delta)
        TimeUtil.delayExecute(() => { this.addEvent(); }, 2)
    }

    addEvent() {
        this._event = Event.addLocalListener("SkipMessage", () => {
            if (this._isPlaying) {
                this.stop()
                this.waitNext()
            } else {
                this.stop()
                clearTimeout(this._timeOut);
                this._parent.setMessage();
                this._event.disconnect()
            }
        })
    }

    private stop() {
        clearInterval(this._timer);
        this.mText_Content.text = this._content
        let width = this.mText_Content.desiredSize.x + 160
        this.mImg_DialogBox.size = new Vector2(width, 430)
        this._isPlaying = false
    }

    private waitNext() {
        this._timeOut = setTimeout(() => {
            this._event.disconnect()
            this._parent.setMessage()
        }, 1000)
    }

    onDestroy() {
        this._event.disconnect()
    }
}