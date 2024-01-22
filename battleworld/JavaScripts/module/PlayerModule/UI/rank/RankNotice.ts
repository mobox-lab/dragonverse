import { Globaldata } from "../../../../const/Globaldata";
import RankEnterTip_Generate from "../../../../ui-generate/notice/RankEnterTip_generate";

/**
 * 公告类型
 */
export enum ERankNoticeType {
    /** 进入房间公告 */
    Enter = 1,
    /** 升段位公告 */
    LevelUp = 2,
}

export class RankNotice extends RankEnterTip_Generate {
    /** 要公告的内容队列 */
    private _noticeArr: string[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
    }

    protected onShow(content: string): void {
        if (this._noticeArr.length == 0) {
            this.noticeTween(content);
        }
        this._noticeArr.push(content);
    }

    private noticeTween(content: string) {
        this.mRank.text = content;
        let pos = new Vector(0, this.rootCanvas.position.y);
        new Tween({ x: 1920 }).to({ x: -1920 }, Globaldata.rankNoticeTime)
            .onUpdate((obj) => {
                pos.x = obj.x;
                this.rootCanvas.position = pos;
            })
            .onComplete(() => {
                this._noticeArr.shift();
                if (this._noticeArr.length > 0) {
                    this.noticeTween(this._noticeArr[0]);
                }
                else {
                    UIService.hide(RankNotice);
                }
            }).start();
    }
}