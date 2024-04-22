
import { GlobalData } from "../../const/GlobalData";
import TradeChoose_Generate from "../../ui-generate/Trade/TradeChoose_generate";
import { PlayerNameManager } from "./PlayerNameManager";
import { GameConfig } from "../../config/GameConfig";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import { GlobalEnum } from "../../const/Enum";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";


/**玩家item页 */
class PlayerItem {

    private sendImg: mw.Image;
    private stateText: mw.TextBlock;
    private playerName: mw.TextBlock;
    private playerImg: mw.Image;
    private playerID: number;

    public onClick: Action1<number> = new Action1();
    // btn: mw.Button;

    constructor(public data: { id: number, state: GlobalEnum.TradingState }, private ui: mw.UserWidget) {
        this.playerID = data.id;
        this.sendImg = ui.findChildByPath("RootCanvas/Canvas/mImage_Go") as mw.Image;
        this.stateText = ui.findChildByPath("RootCanvas/Canvas/mtext_State") as mw.TextBlock;
        this.playerName = ui.findChildByPath("RootCanvas/Canvas/mtext_Username") as mw.TextBlock;
        // this.btn = ui.findChildByPath("RootCanvas/Canvas/mbtn_Trade") as mw.Button;
        // this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.playerImg = ui.findChildByPath("RootCanvas/Canvas/Image") as mw.Image;
        // this.btn.onClicked.add(() => {
        //     this.onClick.call(this.playerID);
        // });

        this.setPlayerName(data.id);
        this.setSendState(data.state);
    }

    private async setPlayerName(playerID: number) {
        this.playerName.text = await PlayerNameManager.instance.getPlayerName(playerID);
    }
    /**设置玩家头像 */
    public setPlayerImg(petId: number) {
        let strongPetCfg = GameConfig.PetARR.getElement(petId);
        if (strongPetCfg)
            this.playerImg.imageGuid = strongPetCfg.uiGuid;
    }

    private setSendState(state: GlobalEnum.TradingState) {

        if (state == GlobalEnum.TradingState.CanTrading) {
            this.sendImg.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.stateText.text = GameConfig.Language.button_3.Value;
            // this.btn.enable = true;
        } else {
            if (state == GlobalEnum.TradingState.Reject) {
                this.stateText.text = GameConfig.Language.button_4.Value
            }
            if (state == GlobalEnum.TradingState.Cooling) {
                this.stateText.text = GameConfig.Language.button_5.Value
            }
            if (state == GlobalEnum.TradingState.Trading) {
                this.stateText.text = GameConfig.Language.button_6.Value
            }
            // this.btn.enable = false;
            this.sendImg.visibility = mw.SlateVisibility.Collapsed;
        }

    }

    public updateUI(data: { id: number, state: GlobalEnum.TradingState }) {

        this.setPlayerName(data.id);
        this.setSendState(data.state);
    }

    /**设置可见性 */
    public setItemVis(vis: mw.SlateVisibility) {
        if (this.ui.visibility != vis)
            this.ui.visibility = vis;
    }


}

/**交易选择用户页 */
export class P_TradingChooseMain extends TradeChoose_Generate {

    private itemArr: PlayerItem[] = [];

    public onClickPlayerItemAC: Action1<number> = new Action1();
    public onClickOpenBtnAC: Action1<boolean> = new Action1();
    private isOpenTrade: boolean = false;

    onStart() {
        this.mBtn_Close.onClicked.add(() => { this.hide() })
        this.mOpen_Btn.onClicked.add(this.onClickOpenBtn.bind(this));
    }

    /**初始化交易按钮 */
    public initTradeBtn(IsOpen: boolean) {
        this.isOpenTrade = IsOpen;
        this.mOpen_Btn.text = this.isOpenTrade ? GameConfig.Language.button_7.Value : GameConfig.Language.button_8.Value;
        this.mOpen_Btn.setNormalImageColorByHex(this.isOpenTrade ? GlobalData.Trading.openColor[0] : GlobalData.Trading.openColor[1]);
    }
    public setCanvasItem(arr: { id: number, state: GlobalEnum.TradingState, petId: number }[]) {

        if (arr.length >= this.itemArr.length) { //如果新的数组长度大于旧的数组长度，就添加新的item
            let needAddNum = arr.length - this.itemArr.length;

            let j = 0;
            for (j = 0; j < this.itemArr.length; j++) {  //更新旧的item
                const element = this.itemArr[j];
                element.updateUI(arr[j]);
                element.setPlayerImg(arr[j].petId);
            }

            for (let i = 0; i < needAddNum; i++) {  //添加新的item
                let ui = mw.createUIByName("Trade/UserItem");

                ui.size = ui.rootContent.size;
                this.mUserCanvas.addChild(ui);

                let item = new PlayerItem(arr[j], ui);
                item.setPlayerImg(arr[j].petId);
                item.onClick.add(this.onClickItem.bind(this));
                this.itemArr.push(item);
                j++;
            }
        } else {  //如果新的数组长度小于旧的数组长度，就刷新 隐藏旧的item


            let needHideNum = this.itemArr.length - arr.length;
            let i = 0;
            for (i = 0; i < arr.length; i++) {
                const element = arr[i];
                this.itemArr[i].updateUI(element);

            }
            for (let j = 0; j < needHideNum; j++) {     //隐藏旧的item
                this.itemArr[i++].setItemVis(mw.SlateVisibility.Collapsed);
            }
        }
        this.show();
    }

    private onClickItem(playerId: number) {
        this.onClickPlayerItemAC.call(playerId);
    }


    private onClickOpenBtn() {
        if (this.isOpenTrade) {
            MessageBox.showTwoBtnMessage(GameConfig.Language.Text_messagebox_20.Value, (res) => {
                if (res) {
                    this.isOpenTrade = !this.isOpenTrade;
                    this.initTradeBtn(this.isOpenTrade);
                    this.onClickOpenBtnAC.call(this.isOpenTrade);
                    return;
                } else {
                    return;
                }
            })
        } else {
            this.isOpenTrade = !this.isOpenTrade;
            this.initTradeBtn(this.isOpenTrade);
            this.onClickOpenBtnAC.call(this.isOpenTrade);
        }

    }


    protected onShow(...params: any[]): void {
        utils.showUITween(this);
        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            this.hide();
        });
    }
    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}