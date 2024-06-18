/*
 * @Author: shifu.huang
 * @Date: 2024-01-19 09:52:13
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-19 10:43:51
 * @FilePath: \nevergiveup\JavaScripts\Game\TryTowerUI.ts
 * @Description: 修改描述
 */
import { GameManager } from "../GameManager";
import { TowerEvent } from "../Modules/TowerModule/TowerEnum";
import { TowerModuleC } from "../Modules/TowerModule/TowerModuleC";
import TowerUI from "../UI/Tower/TowerUI";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { ITowerElement } from "../config/Tower";
import TryTowerUI_Generate from "../ui-generate/Level/TryTowerUI_generate";

export default class TryTowerUI extends TryTowerUI_Generate {
    private _cfg: ITowerElement = null;

    public isSelect: boolean = false;
    private _oriImg: string;
    /** 
     * 构造UI文件成功后，在合适的时机最先初始化一次 
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this._oriImg = this.towerImg.imageGuid;
        this.mPriceCanvas.visibility = SlateVisibility.Visible;
        Event.addLocalListener(TowerEvent.ChooseTower, (ui: UIScript) => {
            this.setSelected(ui == this);
        })
        this.createBtn.onClicked.add(() => {
            if (!this._cfg || !GameManager.getStageClient()) return;
            ModuleService.getModule(TowerModuleC).chooseTowerByUI(this._cfg.id, true);
            Event.dispatchToLocal(TowerEvent.ChooseTower, this);
        })
    }

    /**
     * 初始化
     * @param cfgID 信息id
     */
    public init(cfgID: number, count: number) {
        if (!cfgID) this._cfg = null;
        else this._cfg = GameConfig.Tower.getElement(cfgID);
        this.initObj(count);
    }


    /**
     * 初始化组件
    */
    private initObj(count: number) {
        if (!this._cfg) {
            this.towerImg.imageGuid = this._oriImg;
            this.valueText.text = "0";
        } else {
            Utils.setImageByAsset(this.towerImg, this._cfg);
            this.valueText.text = count.toFixed();
        }

    }

    /**
     * 设置选中状态
     * @param isSelect 是否被选中
     */
    public setSelected(isSelect: boolean) {
        this.selectImg.visibility = isSelect ? 0 : 1;
        this.isSelect = isSelect;
    }

}

