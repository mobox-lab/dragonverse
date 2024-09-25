import CommonTipsUI_Generate from "../../ui-generate/Tips/CommonTipsUI_generate";
import CommonTipsItemUI from "./CommonTipsItemUI";
import { LastWaveTipsUI } from "./LastWaveTipsUI";

export namespace TipsManager {

    export function showTips(value: string) {
        mw.UIService.getUI(CommonTipsManagerUI).showTips(value);
    }

    export function showWaveTips(value: string, size: number = 48, cb = () => { }) {
        mw.UIService.show(LastWaveTipsUI, value, size, cb);
    }

    export function showToClient(player: mw.Player, message: string) {
        if (SystemUtil.isClient()) return;
        Event.dispatchToClient(player, "Event_ShowTips", message);
    }
}

/**
 * 使用队列优化的tips ui接口，如果你希望你的tips参与到队列中进行管理（避免遮挡），实现这个接口即可
 */
export interface IQueueTipsItemUI extends UIScript {
    /**
     * tips的item类需要将content参数设置到对应UI的显示Text里面
     * @param content 提示文本
     */
    setTips(content: string): void;

    /**
     * 具体的动画表现，该如何移动，在动画播放完毕后一定要调用 mw.UIService.getUI(CommonTipsManagerUI).despawnTips(this);，否则无法复用，造成资源的浪费
     * @param start 开始动画的位置，可以根据这个参数进行调整具体的位置
     * @param end 结束动画的位置，可以根据这个参数进行调整具体的位置
     */
    startAnim(start: Vector2, end: Vector2): void;
}

/**
 * 通用tip管理UI，负责回收、限制弹出、队列弹出等功能
 */
export default class CommonTipsManagerUI extends CommonTipsUI_Generate {

    //#region CommonTipsItemUI

    /**缓存的提示框 */
    private _tipsList: Array<IQueueTipsItemUI> = new Array<IQueueTipsItemUI>();
    /**排队显示的队列 */
    private _showQueue: Array<IQueueTipsItemUI> = new Array<IQueueTipsItemUI>();
    /**队列容量的大小，防止队列无限增长（正常游玩不会出现这种情况） */
    private _queueCapacity: number = 10;

    /**刷新间隔300ms */
    private _refreshInterval: number = 1200;
    /**当前时间 */
    private _curTime: number = 0;

    //#endregion

    /**
     * 初始化，设置创建的tip池
     */
    protected onAwake(): void {
        this.layer = mw.UILayerTop;
        this.canUpdate = true;
    }

    protected onStart(): void {
        Event.addServerListener("Event_ShowTips", (message: string) => {
            if (!message) return;
            this.showTips(message);
        });
    }

    /**
     * 如果队列中有消息需要显示，则在时间符合条件后弹出
     * @param dt 帧间隔
     */
    protected onUpdate(dt: number): void {
        this._curTime -= dt * 1000;
        if (this._showQueue.length > 0 && this._curTime <= 0) {
            this._curTime = this._refreshInterval;
            //弹出一个
            const item = this._showQueue.shift();
            mw.UIService.showUI(item, item.layer);
            item.startAnim(this.start.position, this.end.position);
        }
        if (this._curTime <= 0) {
            this._curTime = this._refreshInterval;
        }
    }

    //#region CommonTipsItemUI

    /**
     * 将提示内容加入显示队列中
     * @param content 显示的文本内容
     */
    public showTips(content: string): void {
        this.showSpecialTips(content, CommonTipsItemUI);
    }

    /**
     * 将提示内容加入显示队列中
     * @param content 显示的文本内容
     * @param PanelClass 希望显示的tip UI，需要实现IQueueTipsItemUI，不希望定制化就传入CommonTipsItemUI
     */
    public showSpecialTips<T extends IQueueTipsItemUI>(content: string, PanelClass: new () => T): void {
        //太多了，丢弃，等到消耗消息
        if (this._showQueue.length >= this._queueCapacity) return;
        //获取一个提示项
        const item = this.spawnTips(content, PanelClass);
        if (!item || !item.uiObject) return;
        this.show();
        this._showQueue.push(item);
    }

    /**
     * 获取一个tip，会走对象池，在startAnim后需要调用despawnTips以归还才能复用
     * @param content 显示的文本内容
     * @param PanelClass 定制化的UI，需要实现IQueueTipsItemUI
     * @returns 实现IQueueTipsItemUI接口的tip ui
     */
    private spawnTips<T extends IQueueTipsItemUI>(content: string, PanelClass: new () => T): IQueueTipsItemUI {
        if (this._tipsList.length > 0) {
            let idx = -1;
            let res: IQueueTipsItemUI;
            for (let i = 0; i < this._tipsList.length; i++) {
                if (this._tipsList[i] instanceof PanelClass) {
                    idx = i;
                    res = this._tipsList[i];
                    // console.error(`rkc----idx: ${idx}`);
                    break;
                }
            }
            if (idx != -1) {
                this._tipsList.splice(idx, 1);
                res.setTips(content);
                return res;
            }
        }
        const item = mw.UIService.create(PanelClass);
        // console.error(`rkc----找不到，创建一个${PanelClass}`);
        item.setTips(content);
        return item;
    }

    /**
     * 还一个实现了IQueueTipsItemUI的UI回来，以备将来复用
     * @param tips 实现了IQueueTipsItemUI接口的UI实例
     */
    public despawnTips(tips: IQueueTipsItemUI): void {
        this._tipsList.push(tips);
    }

    /**
    * 显示当前ui
    */
    public show(): void {
        mw.UIService.showUI(this, this.layer);
    }

    //#endregion
}