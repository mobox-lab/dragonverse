import { CommonUtils } from "../../utils/CommonUtils";
import { ObjInterModuleC } from "./ObjInterModuleC";
import { UIHandItem, UIHandWidgetManager } from "./ui/HandUIPool";

/**
 * 交互手按钮触发器抽象类
 * 该类提供了一些交互手按钮触发器控制的基础方法
 */
export abstract class HandTrigger extends mw.Script {
    /** 
     * 玩家是否进入了触发器范围
     */
    public isEntered: boolean = false;

    /**  是否已经开始获取手但是没有获取到 */
    private _isInsing: boolean = false;

    /**  正在使用的手 */
    protected item: UIHandItem;

    /**  手部UI的位置锚点 */
    public posAnchor: mw.GameObject;

    /**  手部UI的缩放比例 */
    protected scale: Vector2 = Vector2.one;

    /**  是否需要跟随锚点 */
    protected isNeedFollowAnchor: boolean = false;

    public get pos(): Vector {
        return this.posAnchor.worldTransform.position;
    }

    /**  打开扭蛋机的方法 */
    private _openFunc;

    /**
     * 在组件启动时调用，用于初始化组件内部属性，注册触发器事件，控制手UI显影
     */
    protected initHandTrigger(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        let trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;
        if (!trigger) {
            console.error("没有找到子节点trigger" + this.gameObject.gameObjectId);
            return;
        }
        this._openFunc = this.onClickHand.bind(this);
        trigger.onEnter.add(async (go: mw.GameObject) => {
            if (!CommonUtils.isSelfChar(go)) {
                return;
            }
            if (this.isEntered || this._isInsing) {
                return;
            }
            this.isEntered = true;
            if (!this.isCanShow()) {
                return;
            }
            await this.setUIVisiable(true);

            if (!this.isEntered && this.item) {
                UIHandWidgetManager.instance.despawnItem(this.item);
                this.item = null;
            }
        })
        trigger.onLeave.add((go: mw.GameObject) => {
            if (!(CommonUtils.isSelfChar(go))) {
                return;
            }
            this.isEntered = false;
            if (this.item) {
                this.setUIVisiable(false);
            }
        })
    }

    /**
     * 设置手部UI的可见性，如果可见，会从对象池获取手UI，如果不可见，会归还手部UI
     * @param visiable 是否可见
     */
    public async setUIVisiable(visiable: boolean) {
        if (visiable) {
            if (this.item || this._isInsing) {
                return;
            }
            this._isInsing = true;
            this.posAnchor = this.gameObject.getChildByName("handPos");
            if (!this.posAnchor) {
                this.posAnchor = this.gameObject;
            }
            let item = await UIHandWidgetManager.instance.getItem();
            this.item = item;
            this.item.ui.rootCanvas.renderScale = this.scale;
            if (this.isNeedFollowAnchor) {
                item.widget.parent = this.posAnchor;
                item.widget.localTransform.position = Vector.zero;
            }
            else {
                item.widget.worldTransform.position = (this.posAnchor.worldTransform.position);
            }
            item.ui.onHandClick.add(this._openFunc);
            this._isInsing = false;
        }
        else {
            if (!this.item) {
                return;
            }
            UIHandWidgetManager.instance.despawnItem(this.item);
            this.item = null;
        }
    }

    /**
     * 判断是否可以显示手部UI
     * @returns 是否可以显示
     */
    protected isCanShow(): boolean {
        return true;
    }

    /**
     * 销毁时的回调函数，归还手部UI，释放资源
     */
    protected onDestroy(): void {
        if (this.item) {
            UIHandWidgetManager.instance.despawnItem(this.item);
            this.item = null;
        }
        this._openFunc = null;
    }

    /**
     * 点击手部的回调函数
     * @param isHumanClick 是否是人类点击
     */
    public onClickHand(isHumanClick: boolean = false) {
    }
}