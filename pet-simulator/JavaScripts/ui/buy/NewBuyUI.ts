import { PetBagModuleData } from "../../modules/PetBag/PetBagModuleData";
import { PetSimulatorPlayerModuleData } from "../../modules/Player/PlayerModuleData";
import NewBuyUI_Generate from "../../ui-generate/Buy/NewBuyUI_generate";
import MessageBox from "../../util/MessageBox";

 
export default class NewBuyUI extends NewBuyUI_Generate {
    public buyEggCallback: (buyEggNum: number) => void;
    public unitPrice: number;
    private _cnt: number = 1;
    public get cnt() {
        return this._cnt;
    }
    public set cnt(value: number) {
        this._cnt = value;
        this.inp_Number.text = value.toString();
        const cost = this.unitPrice * value;
        this.text_All.text = cost.toString();
        this.text_Left.text = (DataCenterC.getData(PetSimulatorPlayerModuleData).gold - cost).toString(); // TODO: Area Gold;
    }
    onStart() {
        this.btn_Down.onClicked.add(() => {
            if(this.cnt - 1 <= 0) return;
            this.cnt--; 
        })
        this.btn_Up.onClicked.add(() => {
            const data = DataCenterC.getData(PetBagModuleData);
            const maxCnt = data.BagCapacity - data.CurBagCapacity;
            if(this.cnt + 1 > maxCnt) return;
            this.cnt++;
        })
        this.btn_Close.onClicked.add(() => {
            this.hide();
        })
        this.btn_Buy.onClicked.add(() => {
            if(DataCenterC.getData(PetSimulatorPlayerModuleData).gold < this.unitPrice * this.cnt) {
                MessageBox.showOneBtnMessage("金币不足!") // TODO: 多语言
                return;
            }
            this.buyEggCallback(this.cnt);
            this.hide();
        })
    }

    protected onShow(unitPrice: number, buyEggCallBack: (buyEggNum: number) => void ): void {
        this.buyEggCallback = buyEggCallBack;
        this.unitPrice = unitPrice;
        this.cnt = 1;
    }
}