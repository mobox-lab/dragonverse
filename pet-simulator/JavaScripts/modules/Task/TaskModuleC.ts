import { MapEx } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { ITaskElement } from "../../config/Task";
import { GlobalData } from "../../const/GlobalData";
import MessageBox from "../../util/MessageBox";
import { utils } from "../../util/uitls";
import { TipsManager } from "../Hud/P_TipUI";
import { EggMachineTween } from "../InteractiveObjs/EggMachineTween";
import { PetBagModuleC } from "../PetBag/PetBagModuleC";
import { P_TaskShop } from "./P_TaskShop";
import { TaskModuleData } from "./TaskModuleData";
import { Task_ModuleS } from "./Task_ModuleS";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { GlobalEnum } from "../../const/Enum";
import { P_PetHud } from "../Hud/P_PetHud";
import { P_HudUI } from "../Hud/P_HudUI";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";


export class Task_ModuleC extends ModuleC<Task_ModuleS, TaskModuleData> {

    /**任务商店UI */
    private taskShopUI: P_TaskShop = null;
    /**世界ui */
    private worldUIs: Map<number, worldUI> = new Map<number, worldUI>();

    protected onStart(): void {
        this.taskShopUI = mw.UIService.getUI(P_TaskShop);
        this.taskShopUI.buyAction.add((id) => {
            this.taskShopBuy(id);
        });
        this.data.taskCompleteAction.add((id, count) => {
            this.onTaskComplete(id, count);
        });
    }

    protected onEnterScene(sceneType: number): void {
        this.onWorldUIInit();
    }

    /**判断当前玩家是否拥有滑板 */
    public isHaveSkateboard(): boolean {
        let count = this.data.getTaskShopData(GlobalData.Task.ripstikId);
        if (count && count > 0) {
            return true;
        }
        return false;
    }

    /**世界UI初始化 */
    private onWorldUIInit(): void {
        let data = this.data.getAllTaskData();
        GlobalData.Task.worldUI.clear();
        let info = GameConfig.Task.getAllElement();
        info.forEach((value, key) => {
            let worldUIGuid = value.UI;
            if (worldUIGuid) GlobalData.Task.worldUI.set(value.Area, value.UI);
        });
        GlobalData.Task.worldUI.forEach(async (guid, sceneId) => {
            let uI = new worldUI(guid, sceneId, data);
            this.worldUIs.set(sceneId, uI);
        })
    }

    /**单个任务完成回调 */
    private onTaskComplete(id: number, count: number): void {
        let info = GameConfig.Task.getElement(id);
        let sceneId = info.Area;
        let worldUI = this.worldUIs.get(sceneId);
        if (worldUI) {
            let upper = info.NumB;
            let diff = upper - count;
            if (diff <= 0) {
                TipsManager.instance.showTip(utils.Format(GameConfig.Language.Task_shop_18.Value, info.Points));
                AnalyticsTool.action_task(id);
            }
            worldUI.onTaskComplete(info, count);
        }
        UIService.getUI(P_HudUI).updateTaskPoint();
    }

    /**任务商店购买 */
    public taskShopBuy(id: number): void {
        this.hideTaskShop();
        let info = GameConfig.TaskShop.getElement(id);
        let price = info.Price;
        MessageBox.showTwoBtnMessage(utils.Format(GameConfig.Language.Task_shop_13.Value, price), async (res) => {
            if (res) {
                if (id == 2) {//买蛋，判断背包是否已满
                    let petMC = ModuleService.getModule(PetBagModuleC)
                    if (petMC.getCurPetNum() >= petMC.getBagCapacity()) {
                        MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_4.Value);
                        return;
                    }
                }
                let diff = await this.server.net_taskShopBuy(id);
                diff > 0 ? this.taskShopBuyFail(diff) : this.taskShopBuySuccess(id, diff);
            } else {
                this.showTaskShop();
            }
        })
    }

    /**购买失败 */
    public taskShopBuyFail(diff: number): void {
        MessageBox.showOneBtnMessage(utils.Format(GameConfig.Language.Task_shop_14.Value, diff), () => {
            this.showTaskShop();
        });
    }

    /**购买成功 */
    public taskShopBuySuccess(id: number, diff: number): void {
        TipsManager.instance.showTip(GameConfig.Language.Text_tips_1.Value);
        AnalyticsTool.action_buy_energybag(id);
        if (diff == 0 && id == GlobalData.Task.gashaponId[0]) {
            this.buyGashapon(id);
            return;
        }
        if (diff < 0) this.taskShopUI.arrayUpper(id);
        this.showTaskShop();
    }

    /**购买扭蛋 */
    public buyGashapon(id: number): void {
        let info = GameConfig.TaskShop.getElement(id);
        let petId = EggMachineTween.instance.startTween_Special(info.Award, GlobalEnum.SpecialEgg.Task);
        ModuleService.getModule(PetBagModuleS).net_addPetWithMissingInfo(petId);
    }

    /**显示任务商店 */
    public showTaskShop(): void {
        let taskShopData = this.data.getAllTaskShopData();
        this.taskShopUI.show(taskShopData, this.data.getTaskPoint());
    }

    /**隐藏任务商店 */
    public hideTaskShop(): void {
        this.taskShopUI.hide();
    }

    /**
     * 获取任务币数量
     * @returns taskPoint
     */
    public getTaskPoint(): number {
        return this.data.getTaskPoint();
    }

}

type uiItem = {
    text: mw.TextBlock;
    img: mw.Image;
}

class worldUI {

    private text1: mw.TextBlock = null;
    private text2: mw.TextBlock = null;
    private text3: mw.TextBlock = null;
    private img1: mw.Image = null;
    private img2: mw.Image = null;
    private img3: mw.Image = null;
    private btn: mw.Button = null;
    private worldUI: mw.UIWidget = null;
    private uiWidget: mw.UserWidget = null;
    private texts: Map<number, uiItem> = new Map<number, uiItem>();

    constructor(guid: string, scene: number, data: MapEx.MapExClass<number>) {
        this.init(guid, scene, data);
    }

    async init(guid: string, sceneId: number, data: MapEx.MapExClass<number>): Promise<void> {
        this.worldUI = (await GameObject.asyncFindGameObjectById(guid)) as mw.UIWidget;
        this.uiWidget = this.worldUI.getTargetUIWidget();
        this.text1 = this.uiWidget.findChildByPath("RootCanvas/mCanvas_task/mCanvas_TaskItem1/mText_mission1") as mw.TextBlock;
        this.img1 = this.uiWidget.findChildByPath("RootCanvas/mCanvas_task/mCanvas_TaskItem1/mPic_startandstatus1") as mw.Image;
        this.text2 = this.uiWidget.findChildByPath("RootCanvas/mCanvas_task/mCanvas_TaskItem2/mText_mission2") as mw.TextBlock;
        this.img2 = this.uiWidget.findChildByPath("RootCanvas/mCanvas_task/mCanvas_TaskItem2/mPic_startandstatus2") as mw.Image;
        this.text3 = this.uiWidget.findChildByPath("RootCanvas/mCanvas_task/mCanvas_TaskItem3/mText_mission3") as mw.TextBlock;
        this.img3 = this.uiWidget.findChildByPath("RootCanvas/mCanvas_task/mCanvas_TaskItem3/mPic_startandstatus3") as mw.Image;
        this.btn = this.uiWidget.findChildByPath("RootCanvas/mCanvas_shop/mBtn_shop") as mw.Button;
        let text = this.uiWidget.findChildByPath("RootCanvas/TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_6.Value;
        text = this.uiWidget.findChildByPath("RootCanvas/mCanvas_shop/TextBlock_2") as mw.TextBlock;
        text.text = GameConfig.Language.World_3D_7.Value;

        this.btn.onClicked.add(() => {
            ModuleService.getModule(Task_ModuleC).showTaskShop();
        });
        this.textInit(sceneId, data);
    }

    private textInit(sceneId: number, data: MapEx.MapExClass<number>): void {
        let taskInfo = GameConfig.Task.getAllElement();
        let id = 1;
        for (let i = 0; i < taskInfo.length; i++) {
            let task = taskInfo[i];
            if (task.Area == sceneId) {
                let count = MapEx.get(data, task.id);
                if (!count) count = 0;
                let itemText: mw.TextBlock = null;
                let itemImg: mw.Image = null;
                switch (id) {
                    case 1:
                        itemText = this.text1;
                        itemImg = this.img1;
                        break;
                    case 2:
                        itemText = this.text2;
                        itemImg = this.img2;
                        break;
                    default:
                        itemText = this.text3;
                        itemImg = this.img3;
                        break;
                }
                this.texts.set(task.id, { text: itemText, img: itemImg });
                this.onTaskComplete(task, count);
                if (id >= 3) break;
                id++;
            }
        }
    }

    /**单个任务完成回调 */
    public onTaskComplete(info: ITaskElement, count: number): void {
        let item = this.texts.get(info.id);
        let upper = info.NumB;
        if (count >= upper) {
            count = upper;
            item.text.contentColor = mw.LinearColor.colorHexToLinearColor(GlobalData.Task.taskCompleteColor);
            item.img.imageGuid = GlobalData.Task.taskCompleteIcon;
        }
        //剩余任务数
        let diff = upper - count;
        if (item) {
            item.text.text = utils.Format(info.Text, diff);
        }
        this.worldUI.refresh();
    }

}