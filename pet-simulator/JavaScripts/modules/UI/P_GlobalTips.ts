import { GlobalData } from "../../const/GlobalData";
import GlobalTips_Generate from "../../ui-generate/common/GlobalTips_generate";



export class P_GlobalTips extends GlobalTips_Generate {

    /**空闲Tips*/
    private freeTextArr: Array<string> = new Array();

    private backSize: mw.Vector2;

    onStart() {
        this.backSize = this.mCanvas_back.size.clone();
    }

    /**
     * 跑马灯tips
     * @param tips tips
     * @param count 滚动次数=1
     * @returns 
     */
    public showTips(tips: string, count = 1) {
        this.freeTextArr.push(tips);
        if (this.freeTextArr.length > 1) { //正在tips滚动
            return;
        }
        mw.UIService.showUI(this);
        this.mText.text = tips;
        this.mTextcopy.text = tips;  //TODO 不能动态获取size 临时方案 通过第三方ui索取
        // this.mText.size = new mw.Vector(utils.getNameLen(tips) * 38.3333, this.mText.size.y);
        this.mText.text = tips;
        this.mText.visibility = mw.SlateVisibility.Hidden;
        this.showBack(count);
    }

    private showBack(i: number) {
        this.mCanvas_back.size = this.mImage_Head.size;
        let tween = new mw.Tween(this.mCanvas_back.size)
            .to(this.backSize, GlobalData.GlobalTips.showBgTime)
            .start()
            .onUpdate((loc) => {
                this.mCanvas_back.size = loc;
            })
            .onComplete(() => {
                this.showText(i);
                tween = null;
            })
    }

    /**
     * 文字跑马灯
     * @param i 滚动次数
     */
    private showText(i: number) {
        if (this.mText.visibility != mw.SlateVisibility.Visible) {
            this.mText.visibility = mw.SlateVisibility.Visible;
        }
        let startPos = new mw.Vector2(this.mCanvas_Text.size.x, this.mText.position.y);
        let tarPos = new mw.Vector2(- this.mTextcopy.size.x, this.mText.position.y);
        this.mText.position = startPos;
        let tween = new mw.Tween(this.mText.position)
            .to(tarPos, GlobalData.GlobalTips.showTextTime)
            .start()
            .onUpdate((newPos) => {
                this.mText.position = newPos;
            })
            .onComplete(async () => {
                i--;
                if (i <= 0) { //当前Tips轮播 完成
                    this.freeTextArr.shift(); //移除当前tips
                    if (this.freeTextArr.length > 0) { //继续轮播剩余tips
                        this.mTextcopy.text = this.freeTextArr[0];
                        await TimeUtil.delaySecond(0.1);
                        this.mText.text = this.freeTextArr[0];
                        // this.mText.size = new mw.Vector(utils.getNameLen(this.freeTextArr[0]) * 38.3333, this.mText.size.y);
                        this.showText(i);
                        return;
                    }
                    tween.stop();
                    mw.UIService.hideUI(this);
                    return;
                }
                this.showText(i);
            })
    }

}