import { GameConfig } from "../../config/GameConfig";
import { IUpgradeElement } from "../../config/Upgrade";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import LevelUI_Generate from "../../ui-generate/LevelUp/LevelUI_generate";
import TypeItem_Generate from "../../ui-generate/LevelUp/TypeItem_generate";
import { utils } from "../../util/uitls";
import { PlayerModuleC } from "./PlayerModuleC";

export class P_LevelUI extends LevelUI_Generate {

    private itemsMap: Map<number, P_levelItem> = new Map<number, P_levelItem>();

    onStart(): void {
        this.mBtn_Close.onClicked.add(() => {
            this.hide();
        });
        this.initItems();
    }

    /**初始化item */
    private initItems(): void {
        let items = GameConfig.Upgrade.getAllElement();
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let levelItem = mw.UIService.create(P_levelItem);
            levelItem.init(i, item);
            this.mCanvas_Type.addChild(levelItem.rootCanvas);
            this.itemsMap.set(i, levelItem);
        }
    }

    public initItem(id: number, grade: number): void {
        let item = this.itemsMap.get(id);
        if (item) {
            item.setLevel(grade);
        }
    }

    protected onShow(...params: any[]): void {
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }

}

class P_levelItem extends TypeItem_Generate {

    /**当前升级信息 */
    private info: IUpgradeElement = null;
    /**当前进度 1-5*/
    private curLevel: number = 1;
    private curId: number = 0;

    /**初始化 */
    public init(id: number, info: IUpgradeElement): void {
        this.curId = id;
        this.info = info;
        this.mImg_Icon.imageGuid = info.ICONguid + "";
        this.mTxt_Itro.text = info.name;
        this.mBtn_Levelup.onClicked.add(() => {
            this.upgrade();
        });
        //ui控件导出改了，get的时候才会去找控件对象，先提前get下
        this.mImage_Piece_0;
        this.mImage_Piece_1;
        this.mImage_Piece_2;
        this.mImage_Piece_3;
        this.mImage_Piece_4;
    }

    private upgrade(): void {
        ModuleService.getModule(PlayerModuleC).levelUp(this.curId);
    }

    /**设置进度 */
    public setLevel(level: number): void {
        this.curLevel = level;
        for (let i = 0; i < 5; i++) {
            (this["mImage_Piece_" + i] as mw.Image).visibility = (i < level) ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        }
        if (this.info.PetNum[0]) { // 是背包上限
            if (level < 5) {
                this.mTxt_detail.text = `${GameConfig.Language.NextLevelAttributes.Value} + ${this.info.PetNum[level]}`
            } else if (level === 5) {
                this.mTxt_detail.text = `+ 70`
            }

        } else {
            if (level < 5) {
                this.mTxt_detail.text = `${GameConfig.Language.NextLevelAttributes.Value} + ${Math.round(this.info.Upgradenum[level] * 100)}%`;
            } else if (level === 5) {
                this.mTxt_detail.text = `+${this.info.Upgradenum[level - 1] * 100}%`
            }
        }

        if (level == 5) {
            this.mText_DiaNum.text = "MAX";
            this.mBtn_Levelup.enable = false;
            return;
        }
        console.error("level", level, "this.info.Diamond", this.info.Diamond);
        this.mText_DiaNum.text = utils.formatNumber(this.info.Diamond[level]);

    }

}

