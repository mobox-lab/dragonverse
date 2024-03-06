/**
 * @Author       : zewei.zhang
 * @Date         : 2024-03-04 15:55:50
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-03-04 16:07:49
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\ui\obby\GameEndPanel.ts
 * @Description  : obby结算界面
 */

import {ObbyModuleC} from "../../module/obby/ObbyModule";
import endhighs_Generate from "../../ui-generate/subgame/endhighs_generate";
import {GameConfig} from "../../config/GameConfig";

export class ObbyGameData {
    /**过关数 */
    trans: number;
    /**花费时间 */
    time: number;
    /**星星数 */
    score: number;
    /**总星星数 */
    totalScore: number;
}

export class ObbyEndPanel extends endhighs_Generate {

    protected onAwake(): void {
        this.initUI();
        this.mBackButton.onClicked.add(() => {
            let obby = ModuleService.getModule(ObbyModuleC);
            obby.reborn();
            UIService.hide(ObbyEndPanel);
        });
    }

    initUI() {
        this.bg.renderOpacity = 0.5;

        this.title.renderOpacity = 0;

        this.levelCount.renderOpacity = 0.5;
        this.levelCount.visibility = SlateVisibility.Hidden;
        this.circleCount.visibility = SlateVisibility.Hidden;
        this.circleCount.renderOpacity = 0.5;

        this.timeCount.visibility = SlateVisibility.Hidden;
        this.timeCount.renderOpacity = 0.5;

        this.score.renderOpacity = 0;
        const windownSize = WindowUtil.getViewportSize();
        const canvasSize = this.infoCanvas.size;
        this.infoCanvas.position = new mw.Vector2((windownSize.x - canvasSize.x) / 2, (windownSize.y) / 2 - 150);
        this.infoCanvas.visibility = mw.SlateVisibility.Hidden;

        this.mBackButton.renderOpacity = 0;
        this.mBackButton.visibility = mw.SlateVisibility.Hidden;
    }

    onShow(data: ObbyGameData) {
        this.textnum.text = data.trans.toString();
        this.textnumc.text = data.score.toString();
        this.textnumt.text = this.getFormatTime__HM(data.time / 1000);
        this.texttime_1_1.text = data.totalScore.toString();
        if (data.trans === GameConfig.Obbycheck.getAllElement().length) {
            this.youWinText.visibility = SlateVisibility.SelfHitTestInvisible;
            this.gameOverText.visibility = SlateVisibility.Hidden;
        } else {
            this.youWinText.visibility = SlateVisibility.Hidden;
            this.gameOverText.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        this.showBg();
    }

    /**
     * 将数字转换成标准时间格式00:00
     *  num 为分钟数或者秒数 时:分 / 分:秒
     */
    getFormatTime__HM(num: number): string {
        return `${num / 60 < 10 ? "0" + Math.floor(num / 60) : Math.floor(num / 60)}:${num % 60 < 10 ? "0" + Math.floor(num % 60) : Math.floor(num % 60)}`
    }

    private showBg() {
        this.infoCanvas.visibility = SlateVisibility.SelfHitTestInvisible;
        //先显示背景渐显
        new Tween({opacity: 0.5})
            .to({opacity: 0.8})
            .duration(500)
            .onUpdate(val => {
                this.bg.renderOpacity = val.opacity;
            })
            .start()
            .onComplete(() => {
                this.showInfo();
            });
    }

    onHide() {
        this.initUI();
    }

    private showInfo() {

        new Tween({opacity: 0.5, size: 30, bg: 1})
            .to({opacity: 1, size: 160, bg: 0})
            .duration(500)
            .onUpdate(val => {
                this.title.renderOpacity = val.opacity;
                this.gameOverText.fontSize = val.size;
            })
            .start()
            .onComplete(() => {
                //canvas向上走，同时显示下面的infos
                let pos = this.infoCanvas.position.clone();
                this.levelCount.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.circleCount.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.timeCount.visibility = SlateVisibility.SelfHitTestInvisible;

                new Tween({y: pos.y, opacity: 0.5})
                    .to({y: 0, opacity: 1})
                    .duration(800)
                    .onUpdate(val => {
                        pos.y = val.y;
                        this.infoCanvas.position = pos;
                        this.levelCount.renderOpacity = val.opacity;
                        this.circleCount.renderOpacity = val.opacity;
                        this.timeCount.renderOpacity = val.opacity;
                    })
                    .start()
                    .onComplete(() => {
                        //显示得分信息                   
                        new Tween({opacity: 0})
                            .to({opacity: 1})
                            .duration(400)
                            .onUpdate(val => {
                                this.score.renderOpacity = val.opacity;
                            })
                            .start()
                            .onComplete(() => {
                                this.showDownCanvas();
                            })
                    })
            })
    }

    private showDownCanvas() {
        this.mBackButton.visibility = mw.SlateVisibility.Visible;
        new Tween({opacity: 0})
            .to({opacity: 1})
            .duration(400)
            .onUpdate(val => {
                this.mBackButton.renderOpacity = val.opacity;
            })
            .start();
    }
}
