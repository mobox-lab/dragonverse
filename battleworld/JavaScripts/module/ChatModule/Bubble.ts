import BubbleUI_Generate from "../../ui-generate/BubbleUI_generate";

/**
 * 聊天气泡
 */
export class Bubble {
    /**所属的物体 */
    private _object: mw.GameObject;
    /**UI对象池 */
    private _uiPool: mwext.ObjPool<BubbleUI_Generate>;
    /**展示的文字 */
    private _text: string;
    /**排序回调 */
    private _onMeasureCallback: (owner: mw.GameObject) => {};
    /**
     * 文本框状态机
     */
    private _fsm: BubbleFsm;
    /**所属UI */
    private _ui: BubbleUI_Generate;
    /**
     * Z轴偏移
     */
    public offsetZ: number = 0;
    private _halfWidth: number = 0;
    private _height: number = 0;
    private _currentHeight: number = 0;

    public tempSize = Vector2.zero;
    /**角色 */
    private localCharacter: mw.Character;
    /**
     *
     * @param object 所属的物体
     * @param _ui 所属的UI，从对象池拿
     * @param _text 所属的UI，展示的文字
     */
    constructor(_object, _uiPool, _text, _onMeasureCallback) {
        Player.asyncGetLocalPlayer().then(player => {
            player.character.asyncReady().then(character => {
                this.localCharacter = character;
            });
        });
        this._object = _object;
        this._uiPool = _uiPool;
        this._text = _text;
        this._onMeasureCallback = _onMeasureCallback;
        this._ui = _uiPool.spawn();
        this.tempSize.x = 1920;
        this.tempSize.y = 0;
        this._ui.dialogText.size = this.tempSize;
        this._ui.dialogText.text = _text;
        this._ui.dialogText.autoSizeEnable = true;
        mw.UIService.showUI(this._ui);
        this._fsm = new BubbleFsm(this);
    }

    /**获取所属对象 */
    get object() {
        return this._object;
    }

    /** 更新状态机
    * @param number dt
    * @return 
    */
    onUpdate(dt: number) {
        return this._fsm.update(dt);
    }

    jump(_scale: number) {
        this._currentHeight = _scale * this._height;
        this._onMeasureCallback(this._object);
    }

    /**
     * 隐藏UI，移除到屏幕外面
     */
    scale(_scale: number) {
        this.tempSize.x = Math.min(1, _scale * 3);
        this.tempSize.y = _scale;
        this._ui.rootCanvas.renderScale = this.tempSize;
    }

    offset(offset: number) {
        this.offsetZ = offset;
    }

    get height() {
        return this._currentHeight;
    }

    measure() {
        const size = this._ui.dialogText.size;
        //计算总长度
        this.tempSize.x = size.x;
        //计算富文本高度
        if (this.tempSize.x > 300) {
            this.tempSize.y = size.y + (Math.ceil(this.tempSize.x / 300) - 1) * 32.18; //Math.max(, 128);
            this.tempSize.x = 300;
            this._ui.dialogText.textHorizontalLayout = mw.UITextHorizontalLayout.AutoWarpText;
            this._ui.dialogText.autoSizeEnable = false;
            this._ui.dialogText.size = this.tempSize;
            this.tempSize.x += 60;
            this.tempSize.y += 20;
        }
        else {
            this.tempSize.x = size.x + 60; //Math.max(, 128);
            this.tempSize.y = size.y + 20; //Math.max(, 128);
        }
        this._halfWidth = this.tempSize.x / 2;
        this._height = this.tempSize.y + 12;
        this._ui.rootCanvas.size = this.tempSize;
        this._ui.dialogBg.size = this.tempSize;
        this.tempSize.x += 4;
        this.tempSize.y += 4;
        this._ui.dialogBg1.size = this.tempSize;
        //this._ui.dialogBg.imageColor = (localCharacter === this._object ? exports.BubbleModuleInst._config.bgColorSelf() : exports.BubbleModuleInst._config.bgColorOther(this._object));
        this._ui.dialogText.text = "";
        //this._ui.dialogText.contentColor = (localCharacter === this._object ? exports.BubbleModuleInst._config.textolorSelf() : exports.BubbleModuleInst._config.textolorOther(this._object));
    }

    get isSizeValidate() {
        const size = this._ui.dialogText.size;
        return size.y > 0;
    }

    /**
     * 显示文本
     */
    showText() {
        this._ui.dialogText.text = this._text;
    }

    /**销毁对象 */
    destory() {
        this._ui.rootCanvas.visibility = mw.SlateVisibility.Collapsed;
        this._uiPool.despawn(this._ui);
    }

    /**
     * 更新气泡在屏幕中的位置
     */
    updatePosition() {
        if (this.localCharacter) {
            const loc = this._object.worldTransform.position;
            loc.z += 80;
            this.tempSize = InputUtil.projectWorldPositionToWidgetPosition(loc, false).screenPosition;
            this.tempSize.y -= this.offsetZ;
            this.tempSize.x -= this._halfWidth;
            this._ui.rootCanvas.position = this.tempSize;
        }
    }
}

/**
 * 状态机
 */
class BubbleFsm {
    /** 聊天气泡 */
    public bubble: Bubble;
    private _isFinish: boolean;
    /**状态列表 */
    private _stateList;
    /** 当前状态 */
    private _currentState;
    /** 下一个状态 */
    private _nextState;
    constructor(bubble: Bubble) {
        this.bubble = bubble;
        this._stateList = [];
        this._stateList.push(this._currentState = new StateMeasure(this));
        this._stateList.push(new StateExpand(this));
        this._stateList.push(new StateView(this));
        this._stateList.push(new StateJump(this));
        this._currentState.onEnter();
    }
    /**
     * 状态机完成
     */
    finish() {
        this._isFinish = true;
    }
    /**
     * 更新状态机
     * @param dt
     */
    update(dt: number) {
        this._currentState.update(dt);
        this._doChangeState();
        return this._isFinish;
    }
    /**
     * 调用切换到下一个状态，为了防止状态混乱，仅在update期间调用
     */
    _doChangeState() {
        if (this._nextState) {
            this._currentState.onExit();
            this._currentState = this._nextState;
            this._currentState.onEnter();
            this._nextState = null;
        }
    }
    /**
     * 切换到下一个状态
     */
    switchState(stateClass) {
        if (this._currentState.constructor.name != stateClass.name) {
            this._nextState = this._stateList.find(i => i.constructor.name == stateClass.name);
        }
    }
}

/**
 * 显示状态
 */
class StateView {
    /**状态机 */
    public fsm: BubbleFsm;
    /**显示时间 */
    private _timer: number;
    constructor(fsm: BubbleFsm) {
        this.fsm = fsm;
    }

    onExit() {
    }

    onEnter() {
        this._timer = 4;
        this.fsm.bubble.showText();
    }

    update(dt: number) {
        this._timer -= dt;
        if (this._timer <= 0) {
            this.fsm.finish();
        }
        this.fsm.bubble.updatePosition();
    }
}

/**
 * 展开状态
 */
class StateExpand {
    /**状态机 */
    public fsm: BubbleFsm;
    /** 展开时间 */
    private _timer: number;
    constructor(fsm: BubbleFsm) {
        this.fsm = fsm;
    }

    onExit() {
    }

    onEnter() {
        this._timer = 0;
    }

    update(dt: number) {
        this._timer += dt * 5;
        if (this._timer >= 1) {
            this._timer = 1;
            this.fsm.switchState(StateView);
        }
        this.fsm.bubble.scale(this._timer);
        this.fsm.bubble.updatePosition();
    }
}

/**
 * 顶开状态
 */
class StateJump {
    /**状态机 */
    public fsm: BubbleFsm;
    /**
     * 延时时间
     */
    private _timer: number;
    constructor(fsm: BubbleFsm) {
        this.fsm = fsm;
    }
    onExit() {
    }
    onEnter() {
        this._timer = 0;
    }
    update(dt: number) {
        this._timer += dt * 5;
        if (this._timer >= 1) {
            this._timer = 1;
            this.fsm.switchState(StateExpand);
        }
        this.fsm.bubble.jump(this._timer);
    }
}

/**
 * 计算状态
 */
class StateMeasure {
    /**状态机 */
    fsm: BubbleFsm;
    /** 延时时间*/
    private _timer: number;
    constructor(fsm: BubbleFsm) {
        this.fsm = fsm;
    }

    onExit() {
    }

    onEnter() {
        this._timer = 0.2;
        this.fsm.bubble.scale(0);
    }

    update(dt: number) {
        this._timer -= dt;
        if (this._timer <= 0) {
            if (this.fsm.bubble.isSizeValidate) {
                this.fsm.bubble.measure();
                this.fsm.switchState(StateJump);
            }
            else {
                this._timer = 0.2;
            }
        }
    }
}