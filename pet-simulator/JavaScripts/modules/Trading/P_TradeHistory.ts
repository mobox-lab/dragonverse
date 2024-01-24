import HistoryRecord_Generate from "../../ui-generate/Trade/HistoryRecord_generate";
import TradeHistory_Generate from "../../ui-generate/Trade/TradeHistory_generate";
import { stringToNumberArr, utils } from "../../utils/uitls";
import { petItemDataNew } from "../PetBag/PetBagModuleData";
import { tradeRecord } from "./TradingModuleData";
import { stringToPet } from "./TradingModuleS";
import { petInfo } from "./TradingScript";
import { GameConfig } from "../../config/GameConfig";
import { TipsManager } from "../Hud/P_TipUI";
import { PetBagItem } from "../PetBag/P_Bag";
import { PetBag_Item } from "../PetBag/P_BagItem";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";


/**历史记录主页 */
export class P_historyRecord extends HistoryRecord_Generate {

    private itemArr: HisToryItem[] = [];

    public onCommentAC: Action2<boolean, tradeRecord> = new Action2();

    onStart() {

        this.mBtn_Close.onClicked.add(() => {
            this.hide();
        });
        this.mBtn_Back.onClicked.add(() => {
            this.hide();
        })

    }

    public showPanel(arr: tradeRecord[]) {
        if (arr.length > this.itemArr.length) { //如果新的数组长度大于旧的数组长度，就添加新的item
            let needAddNum = arr.length - this.itemArr.length;

            let j = 0;
            for (j = 0; j < needAddNum; j++) {
                let ui = mw.createUIByName("Trade/RecordItem");
                ui.size = ui.rootContent.size;
                this.mCanvas_TradeRecord.addChild(ui);
                let item = new HisToryItem(ui, arr[j]);
                item.onClickAc.add(this.onClick.bind(this));
                item.onComment.add(this.comment.bind(this));
                this.itemArr.push(item);
            }

        }
        this.show();
    }

    private onClick(item: tradeRecord) {

        let myId = Number(Player.localPlayer.userId);

        let panel = mw.UIService.getUI(P_HistoryTrade);
        let data = stringToNumberArr(item.str);
        let senderID = data[0];
        let senderGem = data[1];
        let receiverID = data[2];
        let receiveGem = data[3];
        let nameArr = item.n.split(',');

        if (myId == senderID) {
            panel.setMyCanvasItem(stringToPet(item.s));
            panel.setMyGem(senderGem);
            panel.setOtherGem(receiveGem)
            panel.setOtherName(nameArr[1])
            panel.setOtherCanvasItem(stringToPet(item.r));
        }
        else {
            panel.setMyCanvasItem(stringToPet(item.r));
            panel.setMyGem(receiveGem);
            panel.setOtherGem(senderGem)
            panel.setOtherName(nameArr[0])
            panel.setOtherCanvasItem(stringToPet(item.s));
        }
        panel.show();
    }

    private comment(is: boolean, data: tradeRecord) {
        this.onCommentAC.call(is, data)
    }

    public show(...param: any[]): void {
        super.show(...param);
        KeyOperationManager.getInstance().onKeyUp(Keys.Escape, this, () => {
            this.hide();
        });
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}

class HisToryItem {

    public onClickAc: Action1<tradeRecord> = new Action1();
    public onComment: Action2<boolean, tradeRecord> = new Action2();
    private historyText: mw.TextBlock;
    private time: mw.TextBlock;
    goodBtn: mw.Button;
    badBtn: mw.Button;

    constructor(public ui: mw.UserWidget, public data: tradeRecord) {
        this.historyText = ui.findChildByPath("RootCanvas/mBtn_RecordDetail/mText_Count") as mw.TextBlock;
        this.time = ui.findChildByPath("RootCanvas/mBtn_RecordDetail/mText_Time") as mw.TextBlock;
        let btn = ui.findChildByPath("RootCanvas/mBtn_RecordDetail") as mw.Button;
        this.goodBtn = ui.findChildByPath("RootCanvas/mBtn_Good") as mw.Button;
        this.badBtn = ui.findChildByPath("RootCanvas/mBtn_Bad") as mw.Button;
        btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        btn.onClicked.add(() => {
            this.onClickAc.call(data);
        });
        this.goodBtn.onClicked.add(() => {
            if (this.data.c != "" || !this.isinit) {
                TipsManager.instance.showTip(GameConfig.Language.Text_messagebox_19.Value)
                return;
            }
            this.isinit = false;
            this.onComment.call(true, data);
            this.goodBtn.normalImageGuid = "179452";
        })
        this.badBtn.onClicked.add(() => {
            if (data.c != "" || !this.isinit) {
                TipsManager.instance.showTip(GameConfig.Language.Text_messagebox_19.Value)
                return;
            }
            this.isinit = false;
            this.onComment.call(false, data);
            this.badBtn.normalImageGuid = "179452";
        })

        this.setBtnState();
        this.setHistoryText();
        this.setTime();
    }
    private isinit: boolean = false;
    /**设置评价按钮状态 */
    private setBtnState() {
        if (this.data.c == "0") {
            this.badBtn.normalImageGuid = "179452";
        } else if (this.data.c == "1") {
            this.goodBtn.normalImageGuid = "179452";
        } else {
            this.setBtnEnable(true);
            this.isinit = true;
        }
    }
    private setBtnEnable(isEnable: boolean) {
        this.goodBtn.enable = isEnable;
        this.badBtn.enable = isEnable;
    }

    /**设置历史文本 */
    private setHistoryText() {

        let str = GameConfig.Language.Text_messagebox_14.Value;
        let myId = Number(Player.localPlayer.userId);

        let data = stringToNumberArr(this.data.str);
        let senderID = data[0];
        let senderGem = data[1];
        let receiverID = data[2];
        let receiveGem = data[3];
        let nameArr = this.data.n.split(',');

        let sendPet = stringToPet(this.data.s)
        let receiverPet = stringToPet(this.data.r)

        if (senderID == myId) {
            this.historyText.text = utils.Format(str, sendPet.length, senderGem, nameArr[1])
        } else {
            this.historyText.text = utils.Format(str, receiverPet.length, receiveGem, nameArr[0])
        }


    }
    /**设置时间 */
    private setTime() {
        let str = this.data.t.toString()[0] + this.data.t.toString()[1] + this.data.t.toString()[2] + this.data.t.toString()[3] + "/" + this.data.t.toString()[4] + this.data.t.toString()[5] + "/" + this.data.t.toString()[6] + this.data.t.toString()[7];
        this.time.text = str;
    }


}

export class P_HistoryTrade extends TradeHistory_Generate {
    /**自己宠物数组 */
    private itemMyArr: PetBag_Item[] = [];
    /**对方宠物数组 */
    private itemOtherArr: PetBag_Item[] = [];

    onStart() {
        this.mBtn_Back.onClicked.add(() => {
            this.hide();
        });
    }

    /**设置其他人的宠物显示 */
    public setOtherCanvasItem(arr: petInfo[]) {

        this.itemOtherArr.forEach(element => {
            element.setVisible(mw.SlateVisibility.Collapsed);
        })

        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let item = PetBagItem.instance.UIPool.get();
            let data = new petItemDataNew(element.key, element.id);
            data.p.a = element.attack;
            data.p.n = "";
            item.init(data);
            item.uiObject.size = item.rootCanvas.size
            this.mCanvas_ReceivePet.addChild(item.uiObject);

            if (!this.itemOtherArr.includes(item)) {
                this.itemOtherArr.push(item);
            }
        }
    }

    /**设置自己的宠物显示 */
    public setMyCanvasItem(arr: petInfo[]) {
        PetBagItem.instance.UIPool.resetAll();

        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let item = PetBagItem.instance.UIPool.get();
            let data = new petItemDataNew(element.key, element.id);
            data.p.a = element.attack;
            data.p.n = "";
            item.init(data);
            item.uiObject.size = item.rootCanvas.size
            this.mCanvas_SelectPet.addChild(item.uiObject);
        }
    }

    public setMyGem(val: number) {
        this.mText_DMnum.text = val.toString();
    }
    public setOtherGem(val: number) {
        this.mText_ReceiveDM.text = val.toString();
    }
    /**设置其他人名字 */
    public setOtherName(name: string) {
        this.mText_UserName.text = utils.Format(GameConfig.Language.User_pet.Value, name);
    }
}

