/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-14 14:01:03
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-14 16:55:48
 * @FilePath: \DragonVerse\JavaScripts\ui\runningGame\RunningGameEndPanel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EventDefine } from "../../const/EventDefine";
import RGEndUI_Generate from "../../ui-generate/runningGame/RGEndUI_generate";

export class RunningGameData {
    /**穿过关卡数 */
    trans: number;
    /**穿过奖励圈数 */
    speedUp: number
    /**花费时间 */
    time: number;
    /**总得分 */
    score: number;
    /**是否新纪录 */
    isNewRecord: boolean;
}


export class RunningGameEndPanel extends RGEndUI_Generate {


    protected onAwake(): void {
        super.onAwake();
        this.hideSet();

        this.mBackButton.onClicked.add(this.onBackButtonClicked);
        this.mAgainButton.onClicked.add(this.onAgainButtonClicked);
    }

    private onBackButtonClicked = () => {
        this.visible = false;
        Event.dispatchToLocal(EventDefine.OnRunningGameBack);

    }

    private onAgainButtonClicked = () => {
        this.visible = false;
        Event.dispatchToLocal(EventDefine.OnRunningGameAgain);

    }



    private hideSet() {
        this.mBG.renderOpacity = 0.5;

        this.mDownCanvas.renderOpacity = 0;
        this.mDownCanvas.visibility = mw.SlateVisibility.Hidden;

        this.mImage.visibility = mw.SlateVisibility.Hidden;
        this.mImage.renderOpacity = 0.5;

        this.mInfoCanvas.visibility = mw.SlateVisibility.Hidden;
        this.mInfoCanvas.renderOpacity = 0.5;

        this.mScoreCanvas.renderOpacity = 0;
        this.mScoreBg.renderOpacity = 1;
        this.mScoreBg.position = this.mScore.position;
        this.mScoreBg.size = this.mScore.size;

        this.mText.fontSize = 90;
        this.mText.renderOpacity = 0.5;
        this.mTextBg.renderOpacity = 1;

        const windownSize = WindowUtil.getViewportSize();
        const canvasSize = this.mCanvas.size;
        this.mCanvas.position = new mw.Vector2((windownSize.x - canvasSize.x) / 2, (windownSize.y) / 2);

        this.mCanvas.visibility = mw.SlateVisibility.Hidden;
    }


    onShow(data: RunningGameData) {

        this.setData(data);
        this.showBg();
    }

    private setData(data: RunningGameData) {
        this.mTrans.text = data.trans + "";
        this.mSpeedUp.text = data.speedUp + "";
        this.mTime.text = data.time + "";
        this.mScore.text = data.score + "";
        if (data.isNewRecord) {
            this.mNew.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        } else {
            this.mNew.visibility = mw.SlateVisibility.Hidden;
        }
    }


    private showBg() {
        //先显示背景渐显
        new Tween({ opacity: 0.5 })
            .to({ opacity: 0.8 })
            .duration(500)
            .onUpdate(val => {
                this.mBG.renderOpacity = val.opacity;
            })
            .start()
            .onComplete(() => {
                this.showInfo();
            });
    }


    private showInfo() {
        //显示中间的信息
        this.mCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        //显示时间到！

        new Tween({ bg: 1 })
            .to({ bg: 0 })
            .duration(700)
            .onUpdate(val => {
                this.mTextBg.renderOpacity = val.bg;
                this.mTextBg_1.renderOpacity = val.bg;
            })
            .start();

        new Tween({ opacity: 0.5, size: 100, bg: 1 })
            .to({ opacity: 1, size: 75, bg: 0 })
            .duration(500)
            .onUpdate(val => {
                this.mText.renderOpacity = val.opacity;
                this.mText.fontSize = val.size;
            })
            .start()
            .onComplete(() => {
                //canvas向上走，同时显示下面的infos
                let pos = this.mCanvas.position.clone();
                this.mInfoCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                new Tween({ y: pos.y, opacity: 0.5 })
                    .to({ y: 300, opacity: 1 })
                    .duration(800)
                    .onUpdate(val => {
                        pos.y = val.y;
                        this.mCanvas.position = pos;
                        this.mInfoCanvas.renderOpacity = val.opacity;
                    })
                    .start()
                    .onComplete(() => {
                        //显示得分信息                   
                        new Tween({ opacity: 0 })
                            .to({ opacity: 1 })
                            .duration(400)
                            .onUpdate(val => {
                                this.mScoreCanvas.renderOpacity = val.opacity;
                            })
                            .start()
                            .onComplete(() => {
                                //this.mScoreBg.renderOpacity = 0;
                                let pos = this.mScoreBg.position.clone();
                                let size = this.mScoreBg.size.clone();

                                new Tween({ posY: pos.y, sizeY: size.y })
                                    .to({ posY: pos.y + size.y / 2, sizeY: 0 })
                                    .duration(200)
                                    .onUpdate(val => {
                                        pos.y = val.posY;
                                        size.y = val.sizeY;
                                        this.mScoreBg.position = pos;
                                        this.mScoreBg.size = size;
                                    })
                                    .start()
                                    .onComplete(() => {
                                        this.showImage();
                                    })
                            })
                    })
            })

    }

    private showImage() {

        const windownSize = WindowUtil.getViewportSize();

        this.mImage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        let size = new mw.Vector2(0);
        let pos = new mw.Vector2(0);

        new Tween({ opacity: 0.5, size: 500, pos: (windownSize.x - 500) / 2 })
            .to({ opacity: 1, size: 250, pos: (windownSize.x - 250) / 2 })
            .duration(500)
            .onUpdate(val => {
                this.mImage.renderOpacity = val.opacity;
                size.set(val.size, val.size);
                pos.x = val.pos;
                this.mImage.size = size;
                this.mImage.position = pos;
            })
            .start()
            .onComplete(() => {
                this.showDownCanvas();
            })
    }

    private showDownCanvas() {
        this.mDownCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        new Tween({ opacity: 0 })
            .to({ opacity: 1 })
            .duration(400)
            .onUpdate(val => {
                this.mDownCanvas.renderOpacity = val.opacity;
            })
            .start();
    }

    onHide() {
        this.hideSet();

    }


}