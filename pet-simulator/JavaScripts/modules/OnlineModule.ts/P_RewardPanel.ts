import {GameConfig} from "../../config/GameConfig";
import {ITimeRewardElement} from "../../config/TimeReward";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import GiftItem_Generate from "../../ui-generate/Gift/GiftItem_generate";
import GiftMain_Generate from "../../ui-generate/Gift/GiftMain_generate";
import {utils} from "../../util/uitls";
import {TipsManager} from "../Hud/P_TipUI";


export class P_RewardPanel extends GiftMain_Generate {

    public itemArr: RewardItem[] = [];

    public onRewardBtnAC: Action1<number> = new Action1();

    onStart() {
        this.initUI();
    }

    private initUI() {
        let arr = GameConfig.TimeReward.getAllElement();

        for (let i = 0; i < arr.length; i++) {
            let ui = mw.UIService.create(RewardItem);
            ui.uiObject.size = new mw.Vector2(144, 144);
            this.mCanvas_Gift.addChild(ui.uiObject);
            ui.init(arr[i]);
            this.itemArr.push(ui);
            this.itemArr[i].onItemBtnAC.add((id: number) => {
                this.onRewardBtnAC.call(id);
            });
        }
    }

    /**设置领取进度 */
    public setRewardState(count: number) {
        this.mText_Progress.text = count + "/" + GameConfig.TimeReward.getAllElement().length;
    }

    protected onShow(...params: any[]): void {
        utils.showUITween(this);
        this.itemArr.forEach((item) => {
            item.setCount(true);
        });
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.mBtn_Close.onClicked.broadcast();
        });
    }

    onHide() {
        this.itemArr.forEach((item) => {
            item.setCount(false);
        });
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

}

export enum RewardState {
    /**计时中 */
    counting,
    /**可领取 */
    canReward,
    /**已领取 */
    rewarded
}

class RewardItem extends GiftItem_Generate {


    public onItemBtnAC: Action1<number> = new Action1();
    public onCanGetAC: Action1<number> = new Action1();

    private timeInter: any;

    public curTime: number = 0;

    public curState: RewardState = null;

    private Id: number;
    public cfg: ITimeRewardElement;

    private isTime: boolean = false;


    init(cfg: ITimeRewardElement) {
        this.cfg = cfg;
        this.mBtn_gift.normalImageGuid = cfg.PicICON.toString();

        this.setRewardImgVis(false);

        this.curTime = cfg.Time;
        this.Id = cfg.id;

        this.mBtn_gift.onClicked.add(() => {
            if (this.curState == RewardState.canReward) {
                this.onItemBtnAC.call(cfg.id);
                this.curState = RewardState.rewarded;

                //item 点击领取，领取完毕后 item显示的文本
                this.mText_Time.text = GameConfig.Language.Text_ItemUI_1.Value;

                this.setRewardImgVis(true);
            } else if (this.curState == RewardState.rewarded) {
                TipsManager.instance.showTip(GameConfig.Language.Text_tips_5.Value);
            } else {
                TipsManager.instance.showTip(GameConfig.Language.Text_tips_6.Value);
            }

        });
    }

    public setRewardImgVis(isVis: boolean) {
        this.mPic_done.visibility = isVis ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
    }

    /**开始计时 */
    public startCountDown(state: RewardState, curTime?: number) {
        this.curState = state;
        switch (state) {
            case RewardState.counting:
                this.updateTime(curTime);
                break;
            case RewardState.canReward:
                this.mText_Time.text = GameConfig.Language.Text_ItemUI_2.Value; //item 可领取
                break;
            case RewardState.rewarded:
                this.setRewardImgVis(true);
                this.mText_Time.text = GameConfig.Language.Text_ItemUI_1.Value; //item 已经领了
                break;
        }
    }

    /**计时  */
    private updateTime(curTime: number) {
        this.clearTimeInter();
        let strTime = "";
        this.curTime -= curTime;

        this.timeInter = TimeUtil.setInterval(() => {
            if (this.curTime >= 0) {
                this.curTime--;
                if (this.isTime) {
                    strTime = utils.parseTime(this.curTime);
                    this.mText_Time.text = (strTime);
                }

            } else {
                this.clearTimeInter();
                this.curState = RewardState.canReward;
                this.onCanGetAC.call(this.Id);
                this.startCountDown(this.curState);
            }
        }, 1);

    }

    private clearTimeInter() {
        if (this.timeInter) {
            TimeUtil.clearInterval(this.timeInter);
            this.timeInter = null;
        }
    }

    /**设置是否计时 */
    public setCount(isCount: boolean) {
        this.isTime = isCount;
    }
}