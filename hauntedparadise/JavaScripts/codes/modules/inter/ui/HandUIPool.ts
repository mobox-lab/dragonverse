import MScreenHandUI_Generate from "../../../../ui-generate/ShareUI/common/MScreenHandUI_generate";

/**
 * 手UI，用于显示手的UI，用于交互物的操作，由对象池提供
 */
export class UIHand extends MScreenHandUI_Generate {
    /** 当手的btn被按下时 */
    public onHandClick: Action = new Action();
    /** 是否有两个按钮 */
    public isHasTwo: () => boolean;
    /**
     * 初始化UI，添加点击事件
     */
    onStart() {
        this.mHandBtn.onClicked.add(() => {
            if (this.isHasTwo && this.isHasTwo()) {
                this.setLayer(1);
            }
            else {
                this.onHandClick.call();
            }
        })
        this.mPetBtn.onClicked.add(() => {
            this.onHandClick.call(false);
        })
        this.mHumanBtn.onClicked.add(() => {
            this.onHandClick.call(true);
        })
    }

    /**
     * 设置canvas层级，根据层级显示隐藏canvas，0为单按钮情况，1为双按钮情况
     * @param layer 显示层级
     */
    setLayer(layer: number) {
        if (layer == 0) {
            this.mCanvas1.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.mCanvas2.visibility = mw.SlateVisibility.Collapsed;
        }
        if (layer == 1) {
            this.mCanvas1.visibility = mw.SlateVisibility.Collapsed;
            this.mCanvas2.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }
    }
}

/**
 * 手UI数据，用于存储手UI和对应世界UI
 */
export class UIHandItem {
    /** UI */
    public ui: UIHand;
    /** 世界UI */
    public widget: mw.UIWidget;
}

/**
 * 手UI管理器，用于管理手UI的创建和回收
 */
export class UIHandWidgetManager {
    /**获取管理器单例 */
    public static get instance(): UIHandWidgetManager {
        if (!this._instance) {
            this._instance = new UIHandWidgetManager();
        }
        return this._instance;
    }
    /**单例 */
    private static _instance: UIHandWidgetManager;
    /** 缓存池 */
    private _pool: UIHandItem[] = [];

    /**
     * 获得一个手的世界UI，如果没有则创建，如果有则从缓存池中取
     * @returns 返回手的世界UI
     */
    public async getItem() {
        let item = this._pool.length == 0 ? null : this._pool.pop();
        if (!item) {
            item = new UIHandItem();
            let uiwidget = await mw.UIWidget.asyncSpawn<mw.UIWidget>("UIWidget", { replicates: false });
            let ui = mw.UIService.create(UIHand);
            uiwidget.setTargetUIWidget(ui.uiWidgetBase);
            uiwidget.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
            uiwidget.occlusionEnable = false;
            uiwidget.drawSize = ui.rootCanvas.size;
            item.ui = ui;
            item.widget = uiwidget;
        }
        item.ui.setLayer(0);
        item.ui.isHasTwo = null;
        item.widget.setVisibility(PropertyStatus.On);
        return item;
    }

    /**
     * 回收一个手世界UI，将其放入缓存池中
     * @param item 手UI 
     */
    public despawnItem(item: UIHandItem) {
        item.widget.parent = null;
        item.ui.onHandClick.clear();
        item.ui.rootCanvas.renderScale = Vector2.one;
        this._pool.push(item);
        console.log("GachaHandPoolLength" + this._pool.length);
        item.widget.setVisibility(PropertyStatus.Off);
    }
}
