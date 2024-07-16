import Gtk from "gtoolkit";
import { P12ShopItem } from "./P12ShopConfig";
import { Yoact } from "../../depend/yoact/Yoact";
import { GameConfig } from "../../config/GameConfig";
import Online_shopItem_Generate from "../../ui-generate/Onlineshop/Online_shopItem_generate";
import { formatEtherInteger } from "../../util/CommonUtil";

export class P12ShopPanelItem extends Online_shopItem_Generate {
    private _count = Yoact.createYoact<{ data: number }>({data: 0});

    public data: P12ShopItem;
    public onChange: Action2<P12ShopPanelItem, number> = new Action2<P12ShopPanelItem, number>();

    protected onStart(): void {
        this.initElement();

        this.btn_Up.onClicked.add(() => {
            this._count.data++;
            this.onChange.call(this, this._count.data);
        });
        this.btn_Down.onClicked.add(() => {
            if (this._count.data <= 0) return;
            this._count.data--;
            this.onChange.call(this, this._count.data);
        });
        this.inp_Number.onTextChanged.add((text) => {
            const input = parseInt(text) || 0;
            if (this._count.data === input) return;
            this._count.data = input;
            this.onChange.call(this, this._count.data);
        });
    }

    // 初始化配置
    private initElement() {
        this.img_Background.renderOpacity = 0.5;
        this.btn_Item.onHovered.add(() => {
            this.img_Background.renderOpacity = 1;
        });
        this.btn_Item.onUnhovered.add(() => {
            this.img_Background.renderOpacity = 0.5;
        });
        Yoact.bindYoact(() => {
            this.inp_Number.text = this._count.data.toString();
        });
    }

    // 设置数据
    public setData(data: P12ShopItem) {
        this.data = data;
        this.text_Name.text = GameConfig.Language[data.name].Value;
        this.text_Describe.text = GameConfig.Language[data.description].Value;
        this.text_MoboxNumber.text = formatEtherInteger(data.value);
        this.img_Icon.imageGuid = data.icon;
    }

    // 重置状态
    public resetStatus() {
        this._count.data = 0;
        Gtk.trySetVisibility(this.img_Background2, false);
    }
}