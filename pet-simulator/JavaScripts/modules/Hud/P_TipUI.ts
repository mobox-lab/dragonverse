/*
 * @Author: tianran.shi
 * @Date: 2023-06-20 10:01:35
 * @LastEditors: tianran.shi
 * @LastEditTime: 2023-06-29 13:47:29
 * @FilePath: \pet-simulator\JavaScripts\modules\Hud\P_TipUI.ts
 * @Description: 
 */
import { GlobalData } from "../../const/GlobalData";
import Tips_Generate from "../../ui-generate/common/Tips_generate";
import { utils } from "../../util/uitls";

class P_TipUI extends Tips_Generate {

    /**当前已显示的tips数量 */
    private _tipCount: number = 0;
    /**tips显示时间 */
    private _tipTime: number = GlobalData.Tips.tipsTime;
    /**tips对应延时 */
    private _tipTimer: Map<mw.TextBlock, number> = new Map<mw.TextBlock, number>();

    onStart(): void {
        this.mBottomText_1.visibility = mw.SlateVisibility.Collapsed;
        this.mBottomText_2.visibility = mw.SlateVisibility.Collapsed;
        this.mBottomText_3.visibility = mw.SlateVisibility.Collapsed;
        this.mBottomText_4.visibility = mw.SlateVisibility.Collapsed;
    }

    public showTip(tip: string): void {
        if (!this.visible) {
            this.show();
        }
        let tipText: mw.TextBlock = this.getTipText();
        tipText.text = tip;
        tipText.fontColor = mw.LinearColor.colorHexToLinearColor(utils.randomArray(GlobalData.Tips.tipsColor));
        tipText.visibility = mw.SlateVisibility.Visible;
        let timer = this._tipTimer.get(tipText);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            tipText.visibility = mw.SlateVisibility.Collapsed;
        }, this._tipTime * 1000);
        this._tipTimer.set(tipText, timer);
    }

    private getTipText(): mw.TextBlock {
        let tipText: mw.TextBlock;
        switch (this._tipCount) {
            case 0:
                tipText = this.mBottomText_1;
                break;
            case 1:
                tipText = this.mBottomText_2;
                break;
            case 2:
                tipText = this.mBottomText_3;
                break;
            case 3:
                tipText = this.mBottomText_4;
                break;
            default:
                tipText = this.mBottomText_1;
                break;
        }
        this._tipCount++;
        if (this._tipCount > 3) this._tipCount = 0;
        return tipText;
    }
}

export class TipsManager {

    private static _instance: TipsManager;
    public static get instance(): TipsManager {
        if (!this._instance) {
            this._instance = new TipsManager();
            this._instance._tipUI = mw.UIService.getUI(Tips);
            this._instance._tipUI.show();
        }
        return this._instance;
    }

    private _tipUI: Tips;

    public showTip(tip: string): void {
        this._tipUI.showTips(tip);
    }

}

type tipData = {
    count: number,
    time: any,
    showTween: mw.Tween<{ x: number; y: number; }>,
    moveTween: mw.Tween<{ y: number; }>
}

class Tips extends Tips_Generate {
    private _size: mw.Vector2 = new mw.Vector2(1.3, 1.3);
    private _startPos: mw.Vector2;//起始位置
    private _sizeSpeed = 230;//缩放速度
    private _moveY: number;//移动距离
    private _moveSpeed = 100;//移动速度
    private _freeCellArr: Array<mw.TextBlock> = [];//当前空闲的条目
    private _activeCellArr: Array<mw.TextBlock> = [];//当前激活的条目
    private _texts: Array<string> = [];//需要显示的内容

    /**tips显示时间 */
    private _keepTime: number = GlobalData.Tips.tipsTime;
    /**当前激活的条目 */
    private _activeDataMap: Map<mw.TextBlock, tipData> = new Map<mw.TextBlock, tipData>();

    onStart() {
        this.layer = mw.UILayerTop;
        this._startPos = this.mBottomText_1.position.clone();
        this._moveY = this.mBottomText_1.size.y;
        this._freeCellArr = [this.mBottomText_1, this.mBottomText_2, this.mBottomText_3, this.mBottomText_4];
        this._freeCellArr.forEach((text) => {
            text.visibility = mw.SlateVisibility.Collapsed;
            text.position = this._startPos;
            let data: tipData = {
                count: 0,
                time: null,
                showTween: null,
                moveTween: null
            }
            this._activeDataMap.set(text, data);
        })
        this.canUpdate = true;
    }

    onUpdate(dt: number) {
        if (this._texts.length == 0) return;
        if (this._freeCellArr.length == 0) return;
        let mgs = this._texts.shift();
        this.showMsg(mgs)
    }


    /**
     * @param content 提示内容
     */
    public showTips(content: string) {
        if (!this.visible) { this.show(); }
        this._texts.push(content);
    }

    private showMsg(content: string) {
        let textBlock: mw.TextBlock = null;
        textBlock = this._freeCellArr.shift();
        let data = this._activeDataMap.get(textBlock);
        if (data.time) { clearTimeout(data.time), console.error('time is not null') };
        if (data.showTween) data.showTween.stop();
        if (data.moveTween) data.moveTween.stop();
        data.count = 0;

        textBlock.text = content;
        textBlock.fontColor = mw.LinearColor.colorHexToLinearColor(utils.randomArray(GlobalData.Tips.tipsColor));
        textBlock.renderScale = mw.Vector2.one;
        textBlock.position = this._startPos.clone();

        this._activeCellArr.push(textBlock);
        let time = setTimeout(() => {
            data.time = null;
            textBlock.visibility = mw.SlateVisibility.Collapsed;
            this._activeCellArr = this._activeCellArr.filter(item => item != textBlock);
            this._freeCellArr.push(textBlock);
        }, this._keepTime * 1000);
        data.time = time;
        this.refreshUI(textBlock);
    }

    refreshUI(textBlock: mw.TextBlock) {
        let length = this._activeCellArr.length;
        if (length == 0) return;
        this._activeCellArr.forEach((text) => {
            if (text == textBlock) {//缩放动画
                this.showTween(textBlock);
            } else {//移动动画
                this.moveTween(text);
            }
        })
    }

    /**显示缩放动画 */
    showTween(textBlock: mw.TextBlock) {
        let data = this._activeDataMap.get(textBlock);
        textBlock.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        let size = mw.Vector2.zero;
        let tween = new mw.Tween({ x: this._size.x, y: this._size.y }).to({ x: 1, y: 1 })
            .duration(this._sizeSpeed)
            .onUpdate((value) => {
                size.x = value.x;
                size.y = value.y;
                textBlock.renderScale = size
            })
            .onComplete((obj) => { })
            .easing(TweenUtil.Easing.Exponential.Out)//.Exponential.Out  Circular.InOut
            .start();
        data.showTween = tween;
    }

    /**移动动画 */
    moveTween(textBlock: mw.TextBlock) {
        let data = this._activeDataMap.get(textBlock);
        if (data.moveTween) data.moveTween.stop();
        data.count = (data.count++) > 3 ? 1 : data.count++;
        let pos = new mw.Vector2(textBlock.position.x, 0);
        let endY = this._startPos.y - data.count * this._moveY;
        let tween = new mw.Tween({ y: endY + this._moveY }).to({ y: endY })
            .duration(this._moveSpeed)
            .onUpdate((value) => {
                pos.y = value.y;
                textBlock.position = pos
            })
            .onComplete((obj) => { })
            .easing(TweenUtil.Easing.Elastic.Out)
            .start();
        data.moveTween = tween;
    }

}