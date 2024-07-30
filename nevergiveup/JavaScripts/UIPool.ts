/**
 * UI对象池，该类提供了UI对象池的实现
 * @template T UI对象类型
 */

/** 
 * UI对象池标记枚举
 */
enum UIPoolFlag {
    visible = "UIPoolFlagVisible"
}

export class UIPool<T extends mw.UIScript> {

    /* 节点表 */
    public nodes: T[] = [];

    /* 节点大小 */
    protected size: mw.Vector2 = null;

    /**
     * 构造函数
     * @param _uiClass UI对象类型
     */
    constructor(protected _uiClass: new () => T) {
    }

    /**
     * 销毁池中所有对象
     */
    destroy(): void {
        for (let i = 0; i < this.nodes.length; i++) {
            try {
                this.nodes[i].destroy();
            } catch (e) {
                console.error(e);
            }
        }
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
     * @param node 要归还的对象
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
     * 判断是否有使用过的节点
     * @returns 是否有使用过的节点
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
     * 获取首个使用过的节点
     * @returns 首个使用过的节点
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
