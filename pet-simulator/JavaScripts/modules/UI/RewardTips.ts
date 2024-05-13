import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { Singleton } from "../../util/GToolkit";
 import {  utils } from "../../util/uitls";
import { P_HudUI } from "../Hud/P_HudUI";

/**拾取奖励 ui  */

export class RewardTips {

    private startColor = GlobalData.RewardTipsUI.fontColor[0];
    private endColor = GlobalData.RewardTipsUI.fontColor[1];
    private scaleT: mw.Tween<{ x: any; y: any; z: any; }>;
    private allCount: number = 0;
    private inter: number;
    private char: mw.Character;

    private root: mw.UserWidget;
    private mTipsCanvas: mw.Canvas;
    private mValText: mw.TextBlock;
    private mImage: mw.Image;

    private loc: mw.Vector;
    private addValue: number = 0;
    private curValue: number = 0;

    constructor(loc: mw.Vector = new mw.Vector(0, 0)) {
        this.loc = loc;
        this.root = mw.createUIByName("common/RewardTips");
        this.root.size = new mw.Vector(420, 100);
        this.mTipsCanvas = (this.root.findChildByPath("RootCanvas/mTipsCanvas")) as mw.Canvas;
        this.mValText = (this.root.findChildByPath("RootCanvas/mTipsCanvas/mValText")) as mw.TextBlock;
        this.mImage = (this.root.findChildByPath("RootCanvas/mTipsCanvas/mImage")) as mw.Image;
        mw.UIService.getUI(P_HudUI, false).rootCanvas.addChild(this.root);
        this.hide();
        this.char = Player.localPlayer.character;
    }

    /**
     * 开始动画
     * @param type 类型
     * @param count 数量
     */
    public startTween(count: number) {
        if (count <= 0) return;
        if (count < 1) count = 1;
        if (!this.root.visible) {
            this.root.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        }
        this.i = 0;
        this.clearTween();
        this.clearHideInterval();

        this.addValue = count * GlobalData.RewardTipsUI.showInterval * 0.5;

        this.allCount += count;

        this.sRGBTween([this.mValText], () => { this.hide() });

        this.hideInterval = setTimeout(() => {
            this.clearHideInterval();
            this.hide();
        }, GlobalData.RewardTipsUI.showInterval * 1000);

        if (this.inter == null)
            this.inter = TimeUtil.setInterval(this.update.bind(this), 0.04);
    }

    private hideInterval: any;
    private clearHideInterval() {
        if (this.hideInterval) {
            clearTimeout(this.hideInterval);
            this.hideInterval = null;
        }
    }


    /**设置图片 */
    public setImg(type: GlobalEnum.CoinType) {

        if (type == GlobalEnum.CoinType.FirstWorldGold) {
            this.mImage.imageGuid = GameConfig.Coins.getElement(1).Icon1;
        } else if (type == GlobalEnum.CoinType.SecondWorldGold) {
            this.mImage.imageGuid = GameConfig.Coins.getElement(3).Icon1;
        }
        else if (type == GlobalEnum.CoinType.ThirdWorldGold) {
            this.mImage.imageGuid = GameConfig.Coins.getElement(4).Icon1;
        }
        else if (type == GlobalEnum.CoinType.Diamond) {
            this.mImage.imageGuid = GameConfig.Coins.getElement(2).Icon1;
        }
    }

    private clearTween() {
        if (this.scaleT && this.scaleT.isPlaying()) {
            this.scaleT.pause()
        }
    }
    private hide() {
        this.clear();
        this.allCount = 0;
        this.curValue = 0;
        this.root.visibility = (mw.SlateVisibility.Collapsed);
    }

    /**颜色变化 */
    private sRGBTween(objUI: mw.Image[] | mw.Button[] | mw.Canvas[] | mw.TextBlock[], callback?: () => void): void {

        let startSRBG = this.startColor;
        let endSRGB = this.endColor;

        this.scaleT = new mw.Tween({ x: startSRBG.x, y: startSRBG.y, z: startSRBG.z }).to({ x: endSRGB.x, y: endSRGB.y, z: endSRGB.z }, GlobalData.RewardTipsUI.showInterval * 1000)
            .onUpdate((v) => {
                for (let i = 0; i < objUI.length; ++i) {
                    let sRGBColor: mw.LinearColor = mw.LinearColor.white;
                    sRGBColor.r = Number((v.x / 255).toFixed(2));
                    sRGBColor.g = Number((v.y / 255).toFixed(2));
                    sRGBColor.b = Number((v.z / 255).toFixed(2));
                    if (objUI[i] instanceof mw.Image) {
                        (objUI[i] as mw.Image).imageColor = sRGBColor;
                    }
                    else if (objUI[i] instanceof mw.Button) {
                        (objUI[i] as mw.Button).normalImageColor = sRGBColor;
                    }
                    else if (objUI[i] instanceof mw.TextBlock) {
                        (objUI[i] as mw.TextBlock).fontColor = sRGBColor;
                    }
                }
            })
            .onComplete(() => {
                if (callback) {
                    callback();
                }
            })
            .easing()
            .start();
    }

    private clear() {
        if (this.inter == null) return;
        TimeUtil.clearInterval(this.inter);
        this.inter = null;
        this.i = 0;
    }

    private i: number = 0;
    private update() {
        let pos = mw.InputUtil.projectWorldPositionToWidgetPosition(this.char.worldTransform.position, false).screenPosition.add(this.loc).add(GlobalData.RewardTipsUI.uiSlotLoc);
        pos.y -= this.i++;
        this.mTipsCanvas.position = pos

        if (this.allCount > this.curValue) {
            this.curValue += this.addValue;
            this.mValText.text = utils.formatNumber(Math.floor(this.curValue))
        } else {
            this.mValText.text = utils.formatNumber(Math.floor(this.allCount))
        }
    }
}

export class RewardTipsManager  extends Singleton<RewardTipsManager>(){
    /**
     * 全局提示事件名.
     * @desc 事件参数 [string, IGlobalTipsOption]
     * - {string} content 提示内容.
     * - {IGlobalTipsOption} option 提示选项.
     * @type {string}
     */
    public static readonly EVENT_NAME_REWARD_TIPS_GET_UI = "EventNameRewardTipsGetUi";

    public static instance: RewardTipsManager;

    private firstGoldTips: RewardTips;
    private secondGoldTips: RewardTips;
    private thirdGoldTips: RewardTips;
    private diamondTips: RewardTips;

    constructor() {
				super();
        this.firstGoldTips = new RewardTips(new mw.Vector(0, 100));
        this.firstGoldTips.setImg(GlobalEnum.CoinType.FirstWorldGold)
        this.secondGoldTips = new RewardTips(new mw.Vector(0, 100));
        this.secondGoldTips.setImg(GlobalEnum.CoinType.SecondWorldGold)
        this.thirdGoldTips = new RewardTips(new mw.Vector(0, 100));
        this.thirdGoldTips.setImg(GlobalEnum.CoinType.ThirdWorldGold)
        this.diamondTips = new RewardTips();
        this.diamondTips.setImg(GlobalEnum.CoinType.Diamond)
    }

		/**
		 * 注册事件.
		 * @return {this}
		 */
		public registerEvent(): this {
				if (mw.SystemUtil.isClient()) {
						mw.Event.addLocalListener(
							RewardTipsManager.EVENT_NAME_REWARD_TIPS_GET_UI,
								this.getUI
						);
						mw.Event.addServerListener(
							RewardTipsManager.EVENT_NAME_REWARD_TIPS_GET_UI,
								this.getUI
						);
				}

				return this;
		}

    public getUI(type: GlobalEnum.CoinType, count: number) {
        if (type == GlobalEnum.CoinType.FirstWorldGold) {
            this.firstGoldTips.startTween(count);
        } else if (type == GlobalEnum.CoinType.SecondWorldGold) {
            this.secondGoldTips.startTween(count);
        } else if (type == GlobalEnum.CoinType.ThirdWorldGold) {
            this.thirdGoldTips.startTween(count);
        }
        else if (type == GlobalEnum.CoinType.Diamond) {
            this.diamondTips.startTween(count);
        }
    }
}