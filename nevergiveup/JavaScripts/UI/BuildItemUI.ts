import BuildItem_Generate from "../ui-generate/BuildItem_generate";
import { ITowerElement } from "../config/Tower";
import { GameConfig } from "../config/GameConfig";
import { GlobalData } from "../const/GlobalData";

export default class BuildItemUI extends BuildItem_Generate {
    private _cfgID: number;
    public get cfgID(): number {
        return this._cfgID;
    }
    private _cfg: ITowerElement;

    public get cfg(): ITowerElement {
        return this._cfg;
    }
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        // this.chooseBtn.touchMethod = ButtonTouchMethod.PreciseTap;
        // this.chooseImg.visibility = SlateVisibility.Collapsed;
        // this.equipTxt.visibility = SlateVisibility.Collapsed;
        // this.chooseBtn.onClicked.add(() => {
        // 	UIService.getUI(TowerShopUI).showTowerInfo(this._cfgID, this.state);
        // });

        // for (let i = 0; i < 4; i++) {
        // 	let item = UIService.create(TowerTagItem_Generate);
        // 	item.visible = false;
        // 	this.icontagCanvas.addChild(item.uiObject);
        // 	this._tagItemUIs.push(item);
        // }
    }

    public init(cfgID: number) {
        if (cfgID) {
            this._cfgID = cfgID;
            this.initObj();
        }
    }

    /**
     * 初始化组件
     */
    private initObj() {
        this._cfg = GameConfig.Tower.getElement(this._cfgID);
        // this.imgElement.imageGuid = GlobalData.Shop.shopItemBgGuid[(this._cfg?.elementTy || 1) - 1];
        this.imgElement.imageGuid = GlobalData.Shop.shopItemCornerIconGuid[(this._cfg?.elementTy || 1) - 1];
        this.textElement.text = this._cfg.name;
    }
}
