/** 
 * @Author       : fengqi.han
 * @Date         : 2023-08-24 13:57:18
 * @LastEditors  : fengqi.han
 * @LastEditTime : 2024-01-03 14:25:24
 * @FilePath     : \battleworld\JavaScripts\module\HudModule\RedDot.ts
 * @Description  : 红点系统
 */

import { Globaldata } from "../../const/Globaldata";
import redPoint_Generate from "../../ui-generate/common/redPoint_generate";



/** 
 * 红点树节点 (客户端)
 */
export class RedDotNode {
    /** 父节点 */
    private _parent: RedDotNode = null;
    /** 不同名字对应的红点数量 */
    private _redCount: Map<string, number> = new Map();
    /** 红点ui */
    private _redPoint: RedPoint = null;
    /** 各系统对红点显隐影响 */
    private _visibleMap: Map<string, boolean> = new Map();

    /**
     * 初始化，设置红点名字，显示红点
     * @param name 红点名字
     */
    public init(name: string) {
        this._redCount.set(name, 1);
        if (this._redPoint) {
            this._redPoint.setVisible(true);
        }
    }

    /**
     * 设置父节点
     * @param parent 父节点
     */
    public setParent(parent: RedDotNode) {
        this._parent = parent;
    }

    /**
     * 增加红点数量
     * @param name 红点名字
     */
    public addNum(name: string) {
        if (!this._redCount.has(name)) {
            this._redCount.set(name, 1);
        }
        else {
            this._redCount.set(name, this._redCount.get(name) + 1);
        }
        this._redPoint.setVisible(true);
    }

    /**
     * 减少红点数量
     * @param name 红点名字
     */
    public cutNum(name: string) {
        this._redCount.set(name, this._redCount.get(name) - 1);
        if (this._redCount.get(name) <= 0) {
            this._redPoint.setVisible(false);
        }
    }
    /** 
     * 绑定红点ui 
     * @param redPoint 红点ui
     */
    public setRedUI(redPoint: RedPoint) {
        this._redPoint = redPoint;
    }
    /** 
     * 重置 ，隐藏红点，移除红点ui，清空父节点，清空红点数量
     */
    public reset() {
        this._redPoint.setVisible(false);
        this._redPoint.remove();
        this._parent = null;
        this._redCount = new Map();
    }
    /** 
     * 向上检查父节点 
     * @param name 红点名字
     */
    public checkParent(name: string) {
        if (this._parent) {
            this._parent.cutNum(name);
            this._parent.checkParent(name);
        }
    }
    /** 
     * 遍历各系统对红点的显隐影响，修改红点显隐状态
     */
    private changeVisble() {
        let flag = false;
        for (let vis of this._visibleMap.values()) {
            flag = flag || vis;
        }
        if (this._redPoint) {
            this._redPoint.setVisible(flag);
        }
    }
    /** 
     * 设置显隐影响 
     * @param redName 红点名字
     * @param name 事件名字
     * @param flag 显隐状态
     */
    public setVisFactor(redName: string, name: string, flag: boolean) {
        if (!this._redCount.has(redName)) return;
        if (this._redCount.get(redName) <= 0) {
            if (this._visibleMap.has(name)) {
                this._visibleMap.delete(name);
            }
            return;
        }
        this._visibleMap.set(name, flag);
        this.changeVisble();
    }

}

/**
 * 红点管理器，用于统一处理红点的注册、显示、隐藏
 */
export class RedDotManager {
    /** 红点管理单例 */
    private static _instance: RedDotManager;
    /** 获取红点管理单例 */
    public static get instance() {
        return this._instance || (this._instance = new RedDotManager());
    }

    /** 存取ui绑定的节点 */
    private _redDotMap: Map<mw.Widget, RedDotNode> = new Map();
    /** 红点名对应的控件 */
    private _widgetMap: Map<string, mw.Widget> = new Map();
    /** 节点对象池 */
    private _nodePool: RedDotNode[] = [];

    /**
     * 注册红点UI
     * @param name 红点名
     * @param ui 绑定的UI
     */
    public registerWidget(name: RedDotName, ui: mw.Widget) {
        let nameArr = name.split(".");
        this._widgetMap.set(nameArr[nameArr.length - 1], ui);
    }
    /**
     * 添加红点
     * @param name 红点名
     * @param ui 绑定的UI
     */
    public addRedDotEvent(name: RedDotName, ui: mw.Widget) {
        let nameArr = name.split(".");
        this.registerWidget(name, ui);
        for (let i = 0; i < nameArr.length; i++) {
            if (!this._widgetMap.has(nameArr[i])) {
                console.error("UI中没有对应的控件，请检查红点名是否正确");
                return;
            }
            let widget = this._widgetMap.get(nameArr[i]);
            if (this._redDotMap.has(widget)) {
                this._redDotMap.get(widget).addNum(name);
                continue;
            }
            //构造节点
            let node = this.spawnNode();
            this._redDotMap.set(widget, node);
            this.createRedUI(widget);
            node.init(name);
            if (i > 0) {
                node.setParent(this._redDotMap.get(this._widgetMap.get(nameArr[i - 1])));
            }
        }
    }
    /** 
     * 移除红点 
     * @param name 红点名
     * @param ui 绑定的UI
     */
    public removeRedDotNode(name: RedDotName, ui: mw.Widget) {
        if (this._redDotMap.has(ui)) {
            let redDot = this._redDotMap.get(ui);
            redDot.checkParent(name);
            this.despawnNode(redDot);
            this._redDotMap.delete(ui);
        }
    }
    /**
     * 创建红点UI
     * @param ui 红点UI
     */
    private createRedUI(ui: mw.Widget) {
        let redDot = mw.UIService.create(RedPoint);
        (ui.parent as mw.Canvas).addChild(redDot.uiObject);
        redDot.uiObject.position = ui.position.add(new Vector(ui.size.x, 0));
        if (this._redDotMap.has(ui)) {
            this._redDotMap.get(ui).setRedUI(redDot);
        }
    }
    /** 
     * 对象池生成节点 
     * @returns 节点
     */
    private spawnNode(): RedDotNode {
        if (this._nodePool.length > 0) {
            return this._nodePool.shift();
        }
        else {
            return new RedDotNode();
        }
    }
    /** 
     * 重置结点，回收到对象池
     * @param node 红点结点
     */
    public despawnNode(node: RedDotNode) {
        node.reset();
        this._nodePool.push(node);
    }
    /** 
     * 设置根节点红点显隐影响
     * @param redName 红点名
     * @param factorName 事件名
     * @param flag 显隐状态
     */
    public setVisFactor(redName: RedDotName, factorName: string, flag: boolean) {
        let nameArr = redName.split(".");
        if (!this._widgetMap.has(nameArr[0])) return;
        let widget = this._widgetMap.get(nameArr[0]);
        if (!this._redDotMap.has(widget)) return;
        let node = this._redDotMap.get(widget);
        node.setVisFactor(redName, factorName, flag);
    }
}

/**
 * 红点UI，用于显示红点
 */
export class RedPoint extends redPoint_Generate {
    /** 红点动画tween */
    private _redTween: Tween< { x: number } > = null;
    protected onStart() {
        let scaleVec = new Vector2(0, 0);
        this._redTween = new Tween({ x: 1 }).to({ x: 1.3 }, Globaldata.redDotScaleTime)
        .onUpdate((obj) => {
            scaleVec.x = obj.x;
            scaleVec.y = obj.x;
            this.image.renderScale = scaleVec;
        }).yoyo(true).repeat(Infinity).start();
    }

    protected onShow() {
        this._redTween.start();
    }

    protected onHide() {
        this._redTween.stop();
    }
}

/**
 * 红点名（路径）
 */
export enum RedDotName {
    /** 段位按钮 */
    Rank = "Rank",
    /** 段位-段位开关 */
    RankSwitch = "Rank.RankSwitch",
}