/*
 * @Author: yudong.wu yudong.wu@appshahe.com
 * @Date: 2023-10-09 17:44:00
 * @LastEditors: yudong.wu yudong.wu@appshahe.com
 * @LastEditTime: 2023-10-13 15:05:09
 * @FilePath: \catcompanion\JavaScripts\modules\controller\SoundController.ts
 * @Description: 
 */

import { InterEvtNameDef } from "../inter/ObjInterDefine";

@Component
export default class SoundController extends mw.Script {
    @mw.Property({ group: "全局设置", displayName: "音效ID(多个音效用|分开)",tooltip:"如果填入了多个音效，循环次数请填1哈。" })
    public soundGuid: string = "";
    @mw.Property({ group: "全局设置", displayName: "音量" })
    private volume: number = 1;
    @mw.Property({ group: "全局设置", displayName: "循环次数" })
    private loopCount: number = 1;
    private _soundId: number = null;
    /**监听事件arr */
    private _listenerArr: mw.EventListener[] = [];

    private _soundArr: string[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this._soundArr = this.soundGuid.split("|");
        if (SystemUtil.isClient()) {
            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.playSoundEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    SoundService.playSound(this.getRdSound(), this.loopCount, this.volume);
                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.playBGMEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    SoundService.playBGM(this.getRdSound(), this.volume)
                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.play3DSoundEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    this._soundId = SoundService.play3DSound(this.getRdSound(), guid, this.loopCount, this.volume);
                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.stopSoundEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    SoundService.stopSound(this.getRdSound())
                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.stopBGMEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    SoundService.stopBGM();
                }
            }));

            this._listenerArr.push(Event.addLocalListener(InterEvtNameDef.stop3DSoundEvtName, (guid: string) => {
                if (this.gameObject.gameObjectId == guid) {
                    SoundService.stop3DSound(this._soundId);
                }
            }));
        }
    }

    private getRdSound() { 
        if (this._soundArr.length == 1) { 
            return this._soundArr[0];
        }
        return this._soundArr[MathUtil.randomInt(0,this._soundArr.length)];
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this._listenerArr.forEach(e => {
            e.disconnect();
        })
    }
}