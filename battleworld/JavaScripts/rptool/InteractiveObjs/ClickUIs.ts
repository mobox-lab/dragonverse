
import KeyOperationManager from "../../controller/key-operation-manager/KeyOperationManager";
import SP_InteractiveUI_Generate from "../../ui-generate/RP/RPNPMUI/SP_InteractiveUI_generate";

//点击UI的画布
class ClickUICanvas extends SP_InteractiveUI_Generate {
    private showList: ClickUI[] = [];

    protected buildSelf(): void { }
    public addUI(data: ClickUI): void {
        this.rootCanvas.addChild(data.root);
        data.root.size = new mw.Vector2(100, 100);
        this.showList.push(data);
    }

    protected onUpdate(dt: number): void {
        for (let ui of this.showList) {
            if (!ui.isShow) {
                continue;
            }
            ui.update();
        }
    }

    public show(): void {
        mw.UIService.showUI(this);
        this.canUpdate = true;
    }

    public hide(): void {
        mw.UIService.hideUI(this);
    }
}
//点击UI的对象池
export class ClickUIPools {
    private list: ClickUI[] = [];
    private showList: ClickUI[] = [];

    private map: Map<string, ClickUI> = new Map<string, ClickUI>();

    private panel: ClickUICanvas = null;

    private static _instance: ClickUIPools = null;
    public static get instance(): ClickUIPools {
        if (ClickUIPools._instance == null) {
            ClickUIPools._instance = new ClickUIPools();
        }
        return ClickUIPools._instance;
    }

    /**
     * 显示交互UI
     * @param iconGuid 图标guid
     * @param obj 对应物体
     * @param offset 偏移
     * @param callBack 点击方法
     * @returns
     */
    public show(iconGuid: string, content: string, obj: mw.GameObject, offset: mw.Vector, callBack: Function): void {
        if (!this.panel) {
            this.panel = mw.UIService.create(ClickUICanvas);
            this.panel.show();
        }
        if (this.list.length > 0) {
            let ui = this.list.shift();
            ui.show(iconGuid, content, obj, offset, callBack);
            this.map.set(obj.gameObjectId, ui);
            return;
        }

        let root = mw.createUIByName("APO_UI/Main_interact");
        if (!root) {
            return null;
        }
        let ui = new ClickUI(root);
        this.panel.addUI(ui);
        this.showList.push(ui);
        ui.show(iconGuid, content, obj, offset, callBack);
        this.map.set(obj.gameObjectId, ui);
    }

    public getState(obj: mw.GameObject) {
        return this.map.has(obj.gameObjectId);
    }

    /**
     * 改变icon
     * @param iconGuid
     * @param obj
     * @returns
     */
    public changeIcon(iconGuid: string, obj: mw.GameObject): void {
        if (!this.map.has(obj.gameObjectId)) {
            return;
        }
        let ui = this.map.get(obj.gameObjectId);
        ui.changeIcon(iconGuid);
    }

    /**
     * 隐藏
     * @param obj
     */
    public hide(obj: mw.GameObject): void {
        let ui = this.map.get(obj.gameObjectId);
        if (ui) {
            ui.hide();
            this.map.delete(obj.gameObjectId);
            this.list.push(ui);
        }
    }
}

class ClickUI {
    public root: mw.UserWidgetPrefab = null;
    public isShow = false;
    private btn: mw.StaleButton = null;
    private obj: mw.GameObject = null;
    private offset: mw.Vector = null;
    private callBack: Function = null;
    private text: mw.TextBlock = null;
    private img: mw.Image = null;

    public constructor(root: mw.UserWidgetPrefab) {
        this.root = root;
        this.btn = this.root.findChildByPath("RootCanvas/mBtn_interact") as mw.StaleButton;
        this.text = this.root.findChildByPath("RootCanvas/mText_get") as mw.TextBlock;
        this.img = this.root.findChildByPath("RootCanvas/Image_1") as mw.Image;
        this.btn.onClicked.add(() => {
            this.callBack();
        });


    }

    public show(guid: string, content: string, obj: mw.GameObject, offset: mw.Vector, callBack: Function): void {
        this.callBack = callBack;
        this.obj = obj;
        this.offset = offset;
        //this.btn.normalImageGuid = guid;
        if (guid != null) {
            if (guid == "") guid = "167713"
            this.changeIcon(guid);
        }
        this.text.text = content;
        let pos = mw.InputUtil.projectWorldPositionToWidgetPosition(this.obj.worldTransform.position.add(this.offset), false).screenPosition;
        this.root.position = pos.subtract(this.root.size.multiply(0.5));
        this.root.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.isShow = true;

        KeyOperationManager.getInstance().onKeyUp(null, Keys.F, () => {
            this.callBack();
        });
    }

    public changeIcon(guid: string): void {
        this.img.imageGuid = guid;
        //this.btn.normalImageGuid = guid;

    }

    public update(): void {
        let pos: mw.Vector2 = mw.InputUtil.projectWorldPositionToWidgetPosition(this.obj.worldTransform.position.add(this.offset), false).screenPosition;
        this.root.position = pos.subtract(this.root.size.multiply(0.5));
    }

    public hide(): void {
        this.callBack = null;
        this.isShow = false;
        this.root.visibility = mw.SlateVisibility.Collapsed;

        KeyOperationManager.getInstance().unregisterKey(null, Keys.F);
    }
}