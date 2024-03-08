/*
 * @Author       : dal
 * @Date         : 2023-11-03 15:47:02
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-07 17:13:55
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\UIPool.ts
 * @Description  : 
 */
/**对象池标志枚举 */
enum UIPoolFlag {
    /**显示标志 */
    visible = "UIPoolFlagVisible"
}

/**
 * UI对象池
 */
export class UIPool<T extends mw.UIScript> {

    /* 节点表 */
    public nodes: T[] = [];
    /**节点大小 */
    protected size: mw.Vector2 = null;

    /**
     * 构造函数
     * @param _uiClass UI类
     */
    constructor(protected _uiClass: new () => T) {
    }

    /**
     * 销毁池中所有对象
     */
    destroy(): void {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].destroy();
        }
        ;
        this.nodes.length = 0;
    }

    /**
     * 请求一个UI对象
     * @returns 生成的对象
     */
    spawn(): T {
        for (let i = 0; i < this.nodes.length; i++) {
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
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].uiObject.size = mw.Vector2.zero;
            this.nodes[i].setVisible(false);
            this.nodes[i][UIPoolFlag.visible] = false;
        }
    };

    /**
     * 获取是否有使用的节点
     * @returns 返回是否有使用的节点 
     */
    hasUsedNode(): boolean {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i][UIPoolFlag.visible]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取首个使用节点
     */
    getFirstUsedNode(): T {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i][UIPoolFlag.visible]) {
                return this.nodes[i];
            }
        }
        return null;
    }
}


/**
 * 网格容器继承自UIPool
 */
export class GridContainer<T extends mw.UIScript> extends UIPool<T> {
    /**
     * 构造函数
     * @param _canvas canvas组件
     * @param _uiClass UI类
     */
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
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].uiObject.size = mw.Vector2.zero;
            this.nodes[i].setVisible(false);
            this.nodes[i][UIPoolFlag.visible] = false;
        }
    }
}

/**
 * 网格选择容器，继承自UIPool
 */
export class GridSelectContainer<T extends mw.UIScript & GridSelectContainerItem> extends UIPool<T> {

    constructor(private _canvas: mw.Canvas, protected _uiClass: new () => T) {
        super(_uiClass)
    }

    beSelectedNode: T;

    /**
     * 添加节点
     * @return 节点
     */
    public addNode(): T {
        const node = this.spawn();
        this._canvas.addChild(node.uiObject);
        node.onSelect.add(() => {
            if (this.beSelectedNode === node) {
                this.beSelectedNode = null;
                node.setSelected(false);
            } else {
                this.selectNode(node);
            }
        })
        return node;
    }

    /**
     * 更新节点选中态
     * @param node 选中节点
     */
    public selectNode(node: T) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i][UIPoolFlag.visible]) {
                if (this.nodes[i] == node) {
                    node.isSelected = true;
                    node.setSelected(true);
                    this.beSelectedNode = node;
                } else {
                    this.nodes[i].isSelected = false;
                    this.nodes[i].setSelected(false);
                }
            }
        }
    }

    /**
     * 移除单个节点
     * @param node 移除节点
     */
    public removeNode(node: T) {
        node.onSelect.clear();
        this.despawn(node);
    }

    onNodeRemoveAction: Action = new Action();

    /**
     * 移除所有节点
     */
    public removeAllNode() {
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].onSelect.clear();
            this.nodes[i].uiObject.size = mw.Vector2.zero;
            this.nodes[i].setVisible(false);
            this.nodes[i].setSelected(false);
            this.nodes[i][UIPoolFlag.visible] = false;
            this.onNodeRemoveAction.call(this.nodes[i]);
        }
    }
}


/**
 * 网格选择容器Item接口
 */
export interface GridSelectContainerItem {
    /**选中代理 */
    onSelect: Action;
    /**是否选中 */
    isSelected: boolean;
    /**
     * 设置选中状态
     * @param isTrue 是否选中
     */
    setSelected(isTrue: boolean);
}
