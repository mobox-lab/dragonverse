
enum UIPoolFlag {
    visible = "UIPoolFlagVisible"
}


export class UIPool<T extends mw.UIScript> {

    /* 节点表 */
    public nodes: T[] = [];

    protected size: mw.Vector2 = null;

    constructor(protected _uiClass: new () => T) { }

    /**
     * 销毁池中所有对象
     */
    destroy(): void {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].destroy();
        };
        this.nodes.length = 0;
    }

    /**
     * 请求一个UI对象
     * @returns 生成的对象
     */
    spawn(): T {
        for (var i = 0; i < this.nodes.length; i++) {
            if (!this.nodes[i][UIPoolFlag.visible]) {
                this.nodes[i].uiObject.size = this.size;
                this.nodes[i].setVisible(true);
                this.nodes[i][UIPoolFlag.visible] = true;
                return this.nodes[i];
            }
        }
        let node: T = mw.UIService.create(this._uiClass);
        if (this.size == null)
            this.size = node.uiObject.size.clone();
        node.uiObject.size = this.size;
        node.rootCanvas.visibility = (mw.SlateVisibility.Visible);
        node.setVisible(true);
        node[UIPoolFlag.visible] = true;
        this.nodes.push(node);
        return node;
    };

    /**
     * 归还一个对象
     */
    despawn(node: T): void {
        const index = this.nodes.indexOf(node);
        if (index >= 0) {
            node.uiObject.size = mw.Vector2.zero;
            node.setVisible(false);
            node[UIPoolFlag.visible] = false;
        }
    }

    /**
     * 清除对象池中所有对象
     */
    clear(): void {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].uiObject.size = mw.Vector2.zero;
            this.nodes[i].setVisible(false);
            this.nodes[i][UIPoolFlag.visible] = false;
        }
    };
}


export class GridContainer<T extends mw.UIScript> extends UIPool<T> {

    constructor(private _canvas: mw.Canvas, protected _uiClass: new () => T) {
        super(_uiClass)
    }

    /**
     * 添加节点
     * @return 节点
     */
    public addNode(): T {
        const node = this.spawn();
        this._canvas.addChild(node.uiObject);
        return node;
    }

    /**
     * 移除单个节点
     */
    public removeNode(node: T) {
        this.despawn(node);
    }

    /**
     * 移除所有节点
     */
    public removeAllNode() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].uiObject.size = mw.Vector2.zero;
            this.nodes[i].setVisible(false);
            this.nodes[i][UIPoolFlag.visible] = false;
        }
    }
}


export class GridSelectContainer<T extends mw.UIScript & GridSelectContainerItem> extends UIPool<T> {

    constructor(private _canvas: mw.Canvas, protected _uiClass: new () => T) {
        super(_uiClass)
    }

    /**
     * 添加节点
     * @return 节点
     */
    public addNode(): T {
        const node = this.spawn();
        this._canvas.addChild(node.uiObject);
        node.onSelect.add(() => {
            this.selectNode(node);
        })
        return node;
    }

    /**
     * 更新节点选中态
     * @param node 
     */
    public selectNode(node: T) {
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i][UIPoolFlag.visible]) {
                if (this.nodes[i] == node) {
                    this.nodes[i].isSelected = true;
                    this.nodes[i].setSelected(true);
                } else {
                    this.nodes[i].isSelected = false;
                    this.nodes[i].setSelected(false);
                }
            }
        }
    }

    /**
     * 移除单个节点
     */
    public removeNode(node: T) {
        node.onSelect.clear();
        this.despawn(node);
    }

    /**
     * 移除所有节点
     */
    public removeAllNode() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].onSelect.clear();
            this.nodes[i].uiObject.size = mw.Vector2.zero;
            this.nodes[i].setVisible(false);
            this.nodes[i].setSelected(false);
            this.nodes[i][UIPoolFlag.visible] = false;
        }
    }
}


export interface GridSelectContainerItem {
    onSelect: Action;
    isSelected: boolean;
    setSelected(isTrue: boolean);
}
