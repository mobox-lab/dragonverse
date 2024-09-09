import { IEggMachineElement } from "../../config/EggMachine";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { InterBtn } from "../../modules/InteractiveObjs/P_EggMachine";
import { PetBagModuleData } from "../../modules/PetBag/PetBagModuleData";
import { PetSimulatorPlayerModuleData } from "../../modules/Player/PlayerModuleData";
import { P_GlobalTips } from "../../modules/UI/P_GlobalTips";
import { TipsManager } from "../../modules/UI/Tips/CommonTipsManagerUI";
import NewBuyUI_Generate from "../../ui-generate/Buy/NewBuyUI_generate";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";

 
export default class NewBuyUI extends NewBuyUI_Generate {
    public buyEggCallback: (buyEggNum: number) => void;
    public unitPrice: number;
    private _cnt: number = 1;
    public cfg: IEggMachineElement;
    public goldType: GlobalEnum.CoinType = GlobalEnum.CoinType.FirstWorldGold;
    public get cnt() {
        return this._cnt;
    }
    public set cnt(value: number) {
        this._cnt = value;
        this.inp_Number.text = value.toString();
        const cost = this.unitPrice * value;
        this.text_All.text = utils.formatNumber(cost);
        const totalGold = this.getTotalGold();
        const leftNum = totalGold - cost;
        this.text_Left.text = leftNum < 0 ? `-${utils.formatNumber(Math.abs(leftNum))}`: utils.formatNumber(leftNum);
        if(totalGold - cost <= 0) this.text_Left.setFontColorByHex("#FF0000");
        else this.text_Left.setFontColorByHex("#FFFFFF");
    }

    private getTotalGold() {
        const data = DataCenterC.getData(PetSimulatorPlayerModuleData);
        switch (this.goldType) {
            case GlobalEnum.CoinType.FirstWorldGold: return data.gold;
            case GlobalEnum.CoinType.SecondWorldGold: return data.gold2;
            case GlobalEnum.CoinType.ThirdWorldGold: return data.gold3;
            default: return 0;
        }
    }

    private judgeGoldType() {
        const coinType = GlobalEnum.CoinType;
        const cfg = this.cfg;
        if (cfg.AreaID < 2000) {
            this.goldType = coinType.FirstWorldGold;
            this.price_icon.imageGuid = GameConfig.Coins.getElement(1).Icon1
        } else if (cfg.AreaID < 3000) {
            this.goldType = coinType.SecondWorldGold;
            this.price_icon.imageGuid = GameConfig.Coins.getElement(3).Icon1
        } else if (cfg.AreaID < 4000) {
            this.goldType = coinType.ThirdWorldGold;
            this.price_icon.imageGuid = GameConfig.Coins.getElement(4).Icon1
        }
    }

    onStart() {
        this.btn_Down.onClicked.add(() => {
            if(this.cnt - 1 <= 0) return;
            this.cnt--; 
        })
        this.btn_Up.onClicked.add(() => {
            const data = DataCenterC.getData(PetBagModuleData);
            const maxCnt = data.BagCapacity - data.CurBagCapacity;
            if(this.cnt + 1 > maxCnt) {
                TipsManager.showTips(GameConfig.Language.Page_UI_Tips_14.Value);
                return;
            }
            this.cnt++;
        })
        this.btn_Close.onClicked.add(() => {
            this.hide();
        })
        this.btn_Buy.onClicked.add(() => {
            if(this.cnt + "" !== this.inp_Number.text) {
                return;
            }
            const totalGold = this.getTotalGold();
            if(totalGold < this.unitPrice * this.cnt) {
                MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_4.Value);
                return;
            }
            this.buyEggCallback(this.cnt);
            this.hide();
        })
        this.inp_Number.onTextChanged.add((text) => {
            try {
                const cnt = Number(text);
                const data = DataCenterC.getData(PetBagModuleData);
                const maxCnt = data.BagCapacity - data.CurBagCapacity;
                if(isNaN(cnt) || cnt <= 0 || cnt > maxCnt) {
                    this.inp_Number.setFontColorByHex("#FF0000");
                    return;
                };
                this.inp_Number.setFontColorByHex("#FFFFFF");
                this.cnt = cnt;
            } catch {
                this.inp_Number.setFontColorByHex("#FF0000");
            }
        })
    }

    protected onShow(cfg: IEggMachineElement, buyEggCallBack: (buyEggNum: number) => void ): void {
        console.log("#debug egg buy show cfg:" + JSON.stringify(cfg))
        this.buyEggCallback = buyEggCallBack;
        this.cfg = cfg;
        this.judgeGoldType();
        this.unitPrice = cfg.Price[0];
        this.cnt = 1;
    }
    onHide() {
        InterBtn.instance.isShow = false;
    }
}