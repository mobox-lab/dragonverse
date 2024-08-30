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
        this.text_All.text = cost.toString();
        const totalGold = this.getTotalGold();
        this.text_Left.text = (totalGold - cost).toString();
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
        } else if (cfg.AreaID < 3000) {
            this.goldType = coinType.SecondWorldGold;
        } else if (cfg.AreaID < 4000) {
            this.goldType = coinType.ThirdWorldGold;
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
                TipsManager.showTips("已达到背包上限！"); // TODO: 多语言
                return;
            }
            this.cnt++;
        })
        this.btn_Close.onClicked.add(() => {
            this.hide();
        })
        this.btn_Buy.onClicked.add(() => {
            if(DataCenterC.getData(PetSimulatorPlayerModuleData).gold < this.unitPrice * this.cnt) {
                MessageBox.showOneBtnMessage(GameConfig.Language.Text_tips_4.Value);
                return;
            }
            this.buyEggCallback(this.cnt);
            this.hide();
        })
    }

    protected onShow(cfg: IEggMachineElement, buyEggCallBack: (buyEggNum: number) => void ): void {
        console.log("#debug egg buy show cfg:" + JSON.stringify(cfg))
        this.buyEggCallback = buyEggCallBack;
        this.cfg = cfg;
        this.unitPrice = cfg.Price[0];
        this.cnt = 1;
        this.judgeGoldType();
    }
    onHide() {
        InterBtn.instance.isShow = false;
    }
}