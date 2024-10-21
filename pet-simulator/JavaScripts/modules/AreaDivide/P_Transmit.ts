import { IAreaWorldElement } from "../../config/AreaWorld";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import TransmitMain_Generate from "../../ui-generate/Transmit/TransmitMain_generate";
import WorldtipsUI_Generate from "../../ui-generate/WorldUI/WorldtipsUI_generate";
import { cubicBezier } from "../../util/MoveUtil";
import { utils } from "../../util/uitls";
import { AreaModuleData } from "../AreaDivide/AreaModuleData";

/**传送ui */
export class P_Transmit extends TransmitMain_Generate {

    private pointItems: PointItem[] = [];
    private data: AreaModuleData;
    private isFirst: boolean = true;

    public onPointBtnAC: Action2<number, number> = new Action2();

    onStart() {
        this.mBtn_Close.onClicked.add(() => {
            this.hide();
        });
        this.data = DataCenterC.getData(AreaModuleData);
    }

    public setCanvas() {
        this.createWorldItem();
        this.createPointItem(1);
    }

    protected onShow(...params: any[]): void {
        if (this.isFirst) {
            this.setCanvas();
            this.isFirst = false;
        }
        utils.showUITween(this);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            this.hide();
        });
    }

    //创建左边的世界item
    private createWorldItem() {
        let cfgs = GameConfig.AreaWorld.getAllElement();
        for (let i = 0; i < cfgs.length; i++) {
            let ui = mw.createUIByName("Transmit/WorldItem");
            ui.size = ui.rootContent.size;
            this.mWorldCanvas.addChild(ui);
            let item = new WorldItem(ui, cfgs[i]);
            item.onBtnAC.add(this.worldBtnAC, this);
        }
    }

    //创建右边的关卡item
    private createPointItem(id: number) {

        let cfg = GameConfig.AreaWorld.getElement(id);
        this.mText_world.text = cfg.textUI;

        let arr = cfg.areaArr;
        if (arr.length >= this.pointItems.length) { //如果新的数组长度大于旧的数组长度，就添加新的item
            let needAddNum = arr.length - this.pointItems.length;

            let j = 0;
            for (j = 0; j < this.pointItems.length; j++) {  //更新旧的item
                const element = this.pointItems[j];
                let level = this.data.getAreaDataById(arr[j]);
                element.setLock(arr[j], level);
                element.setItemVis(mw.SlateVisibility.SelfHitTestInvisible);
            }
            for (let i = 0; i < needAddNum; i++) {  //添加新的item
                let ui = mw.createUIByName("Transmit/PointItem");
                ui.size = ui.rootContent.size;
                let item = new PointItem(ui, arr[j]);
                this.pointItems.push(item);
                this.mPointCanvas.addChild(ui);

                let level = this.data.getAreaDataById(arr[j]);
                item.setLock(arr[j], level);
                item.onBtnAC.add(this.pointBtnEvent.bind(this));
                j++;
            }
        } else {  //如果新的数组长度小于旧的数组长度，就刷新 隐藏旧的item
            let needHideNum = this.pointItems.length - arr.length;
            let i = 0;
            for (i = 0; i < arr.length; i++) {
                const element = arr[i];
                let level = this.data.getAreaDataById(arr[i]);
                this.pointItems[i].setLock(arr[i], level);
                this.pointItems[i].setItemVis(mw.SlateVisibility.SelfHitTestInvisible);
            }
            for (let j = 0; j < needHideNum; j++) {     //隐藏旧的item
                this.pointItems[i++].setItemVis(mw.SlateVisibility.Collapsed);
            }
        }

    }

    //点击左边的世界item
    private worldBtnAC(id: number) {
        this.createPointItem(id);
    }

    //点击右边的关卡item
    private pointBtnEvent(id: number, level: number) {
        this.onPointBtnAC.call(id, level);
    }

    /**解锁完毕更新ui样式 */
    public updateUI(id: number, level: number) {
        let ui = this.pointItems.find((item) => {
            return item.id == id;
        });

        ui?.setLock(id, level);
    }

    public hide(): void {
        super.hide();
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}

/**传送tips */
export class P_TransmitTips extends WorldtipsUI_Generate {

    public showWorld(worldType: GlobalEnum.World) {
        let curText = this.getText(worldType);
        if (this.mText_Worldname.text == curText) {
            return;
        }
        this.mText_Worldname.text = curText;
        this.show();
        this.tweenOpacity();

    }

    /**设置文本 */
    public getText(worldType: GlobalEnum.World) {
        let str: string = "";
        switch (worldType) {
            case GlobalEnum.World.First:
                str = GameConfig.Language.AreaWorld_textUI_1.Value;
                break;
            case GlobalEnum.World.Second:
                str = GameConfig.Language.AreaWorld_textUI_2.Value;
                break;
            case GlobalEnum.World.AncientRuins:
                str = GameConfig.Language.AreaDivide_Name_15.Value;
                break;
            case GlobalEnum.World.CherryBlossomCourtyard:
                str = GameConfig.Language.AreaDivide_Name_16.Value;
                break;
            case GlobalEnum.World.Third:
                str = GameConfig.Language.AreaWorld_textUI_3.Value;
                break;
        }
        return str;
    }

    /**透明度tween */
    public tweenOpacity() {
        new mw.Tween({ o: 0 }).to({ o: 1 }, 500)
            .onUpdate((value) => {
                this.mText_Worldname.renderOpacity = value.o;
            }).onComplete((obj) => {
                new mw.Tween({ o: 1 }).to({ o: 0 }, 500).onUpdate((value) => {
                    this.mText_Worldname.renderOpacity = value.o;
                }).onComplete(() => {
                    this.hide();
                }).delay(1000).start();
            }).start()
    }


    protected onShow(...params: any[]): void {
        // utils.showUITween(this);
    }
}

/**左边 世界区域 */
class WorldItem {

    private btn: mw.StaleButton;
    public onBtnAC: Action1<number> = new Action();

    constructor(public ui: mw.UserWidget, public cfg: IAreaWorldElement) {
        this.btn = ui.findChildByPath("RootCanvas/mBtn_World") as mw.StaleButton;
        this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.btn.onClicked.add(() => {
            this.onBtnAC.call(cfg.id);
        });
        //临时屏蔽第二第三世界
        if (this.cfg.id > 2) {
            this.btn.onClicked.clear();
        }
        this.updateUI();
    }

    private updateUI() {
        this.btn.text = this.cfg.textUI;
        this.btn.normalImageGuid = this.cfg.imgUI;
        this.btn.pressedImageGuid = this.cfg.imgUI;
    }
}

class PointItem {
    private btn: mw.StaleButton;
    private img: mw.Image;
    private level: number;

    public onBtnAC: Action2<number, number> = new Action2();

    constructor(public ui: mw.UserWidget, public id: number) {
        this.btn = ui.findChildByPath("RootCanvas/mBtn_Point") as mw.StaleButton;
        this.btn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
        this.img = ui.findChildByPath("RootCanvas/mPic_type") as mw.Image;
        this.btn.onClicked.add(this.btnClick.bind(this));
    }

    private btnClick() {
        this.onBtnAC.call(this.id, this.level);
    }

    public setLock(id: number, level: number) {
        this.id = id;
        let cfg = GameConfig.AreaDivide.getElement(this.id);
        this.level = level;

        switch (level) {
            case 1:
                this.img.imageGuid = GlobalData.TransferPoint.unLockIcon[0];
                this.btn.text = GlobalData.TransferPoint.unLockName;
                this.btn.normalImageGuid = GlobalData.TransferPoint.btnBgGuid[0];
                break;
            case 2:
                this.img.imageGuid = GlobalData.TransferPoint.unLockIcon[1];
                this.btn.text = cfg.Name;
                this.btn.normalImageGuid = GlobalData.TransferPoint.btnBgGuid[1];
                break;
            case 3:
                this.img.imageGuid = cfg.imgGuid;
                this.btn.text = cfg.Name;
                this.btn.normalImageGuid = GlobalData.TransferPoint.btnBgGuid[2];
                break;
            default:
                break;
        }

    }

    public setItemVis(vis: mw.SlateVisibility) {
        this.ui.visibility = vis;
    }

}


