

import { GameConfig } from "../../config/GameConfig";
import HUDpetGift_Generate from "../../ui-generate/hud/HUDpetGift_generate";
import { utils } from "../../util/uitls";
import { P_HudPet2 } from "../Hud/P_HudPet2";

export class P_HudPetGift extends HUDpetGift_Generate {

    /**领取按钮 */
    public onBtnAC: Action = new Action();
    /**红点提示事件key */
    public onRedPointAC: Action1<number> = new Action1();
    /**打开背包事件 */
    public onOpenBagAC: Action1<number[]> = new Action();

    /**红点提示数组 */
    private redPointArr: number[] = [];

    async onStart() {
        this.layer = mw.UILayerScene;
        this.mBtn_Gift.onClicked.add(() => {
            this.onBtnAC.call();
        });

        this.mBtn_Pet.onClicked.add(() => {
            this.onOpenBagAC.call(this.redPointArr);
        })

        this.mCanvas_Point.visibility = mw.SlateVisibility.Collapsed;
        this.onRedPointAC.add(this.addRedPoint, this);

    }
    /**添加红点提示 */
    public addRedPoint(key: number) {
        this.redPointArr.push(key);
        if (this.mCanvas_Point.visible == false) {
            this.mCanvas_Point.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
        this.mText_Point.text = this.redPointArr.length.toString();
    }
    /**移除红点提示 */
    public removeRedPoint(keys: number[]) {
        keys.forEach(key => {
            if (this.redPointArr.indexOf(key) != -1) {
                this.redPointArr.splice(this.redPointArr.indexOf(key), 1);
            }
        })
        this.mText_Point.text = this.redPointArr.length.toString();
    }
    /**清空红点 */
    public clearRedPoint() {
        this.redPointArr.length = 0;
        if (this.mCanvas_Point.visible == true) {
            this.mCanvas_Point.visibility = mw.SlateVisibility.Collapsed;
        }
    }

    public setBagText(curPetCount: number, allCount: number) {
        this.mText_Pet.text = curPetCount + "/" + allCount;
        mw.UIService.getUI(P_HudPet2).mText_Pet.text = curPetCount + "/" + allCount;
    }

    public canGet() {
        this.mText_Gift.text = GameConfig.Language.Text_ItemUI_2.Value;
        this.mMaskPrograss_Gift.fanShapedValue = 1;
    }


    /**领完了 */
    public geted() {
        this.mText_Gift.text = GameConfig.Language.Text_ItemUI_8.Value;
        this.mMaskPrograss_Gift.fanShapedValue = 1;
    }


    private timeInter: any;
    /**当前事件 、总时间 */
    public updateTime(time: number, totalTime: number) {

        let startTime = totalTime - time;

        this.clearTimeInter();
        let strTime = "";

        this.timeInter = TimeUtil.setInterval(() => {
            if (time >= 0) {
                strTime = utils.parseTime(time)
                time--;
                this.mText_Gift.text = (strTime);
                startTime++;
                this.updateProgress(startTime, totalTime);
            } else {
                this.clearTimeInter();
                this.canGet();
            }
        }, 1);

    }

    /**更新进度条 */
    private updateProgress(curLevel: number, maxLevel: number) {
        this.mMaskPrograss_Gift.fanShapedValue = curLevel / maxLevel;
    }

    private clearTimeInter() {
        if (this.timeInter) {
            TimeUtil.clearInterval(this.timeInter);
            this.timeInter = null;
        }
    }

}