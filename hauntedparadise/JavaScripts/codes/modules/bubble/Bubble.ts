import { BubblePool } from "./BubblePool";
import { IBubbleConfig, IBubbleSkin } from "./IBubbleConfig";
import { IBubbleUI } from "./IBubbleUI";
/**
* @Author: zhaolei
* @Date: 2022-08-18 15:11:45
* @LastEditors: zhaolei
* @Description: 气泡对话框对象，纯客户端类
*/
/**
 * 聊天气泡基类，用于显示在玩家头顶显示聊天气泡
 */
export class BubbleChat {
	/**世界UI的缩放 */
	private readonly _scale = 0.3;
	/**文本框状态机 */
	private _fsm: BubbleFsm;
	/**气泡UI */
	protected _ui: IBubbleUI;
	/**Z轴偏移 */
	public offsetZ: number = 0;
	/**ui的半宽 */
	protected _halfWidth: number = 0;
	/**ui的高度 */
	protected _height: number = 0;
	/**当前UI的高度 */
	protected _currentHeight: number = 0;
	/**是否销毁 */
	public isDestroy: boolean = false;
	/**世界UI对象 */
	public widget: UIWidget
	/**当前对象ID */
	private curId: number;

	/**
	 * 构造函数，初始化ui对象和世界UI对象，设置ui对象的内容和可见性，设置世界UI对象的显示模式和目标UI对象和实际渲染大小等，控制世界UI对象的可见性
	 * @param skin 气泡的皮肤配置
	 * @param cfg 气泡的配置
	 * @param _text 显示在气泡上的文字
	 * @param onMeasure 气泡重新定位回调
	 * @param owner 气泡拥有者
	 */
	constructor(protected skin: IBubbleSkin, public cfg: IBubbleConfig, private _text: string, protected onMeasure: () => void, protected owner: () => mw.GameObject,) {
		this._ui = BubblePool.getUIPool(BubblePool.curId).spawn();
		this.curId = BubblePool.curId
		this.widget = BubblePool.getWidgetPool().spawn();

		this._ui.text.text = _text;
		this._ui.text.invalidateLayoutAndVolatility();
		this._ui.setVisible(true);
		this._ui.uiObject.zOrder = skin.zOrder;
		this.widget.widgetSpace = WidgetSpaceMode.World;
		this.widget.setTargetUIWidget(this._ui.uiWidgetBase);
		this._ui.rootCanvas.position = new Vector2(100, 100);
		this._ui.rootCanvas.clipEnable = false;
		this.widget.setVisibility(PropertyStatus.On)
		this.widget.drawSize = this._ui.rootCanvas.size;
		this.widget.worldTransform.scale = Vector.one.multiply(this._scale);

		this._fsm = new BubbleFsm(this);
	}

	/**
	* 更新对话框，更新状态机
	* @param dt 两帧调用的时间差，毫秒
	* @return 是否更新状态即
	*/
	public onUpdate(dt: number) {
		return this._fsm.update(dt);
	}
	/** 
	 * 弹出气泡，设置当前UI高度，气泡重新定位
	 */
	public jump(_scale: number) {
		this._currentHeight = _scale * this._height;
		this.onMeasure();
	}
	/**
	 * 隐藏UI，移除到屏幕外面，设置三维向量常量数据和ui对象的渲染缩放
	 * @param _scale 设置气泡UI的渲染缩放
	 */
	public scale(_scale: number) {
		tempSize.x = Math.min(1, _scale * 3);
		tempSize.y = _scale;
		this._ui.uiObject.renderScale = tempSize;
	}

	/**
	 * 设置气泡的Z轴偏移
	 * @param offset Z轴偏移值
	 */
	public offset(offset: number) {
		this.offsetZ = offset;
	}
	/**
	 * 获取气泡的高度
	 * @returns 气泡的高度
	 */
	public get height() {
		return this._currentHeight;
	}


	/**
	 * 计算气泡的显示的位置、大小和设置文本，根据气泡皮肤配置，设置箭头图片的显示隐藏，根据气泡皮肤配置，设置喇叭图片的显示隐藏，设置世界UI的渲染大小
	 */
	public measure() {
		/**计算总长度*/
		const size = this._ui.text.desiredSize;
		tempSize.set(size);
		/**计算富文本高度*/
		tempSize.set(tempSize.x + this.skin.borderSpaceLeft + this.skin.borderSpaceRight, tempSize.y + this.skin.borderSpaceUp + this.skin.borderSpaceDown);

		this._halfWidth = tempSize.x / 2;
		this._height = tempSize.y;

		/**计算气泡大小*/
		this._ui.rootCanvas.size = tempSize;
		this._ui.bg.size = tempSize;
		if (this.skin.borderVisible) {
			tempSize.x += 6;
			tempSize.y += 6;
			this._ui.border.size = tempSize;
		}
		this._ui.text.position = tempSize.set(this.skin.borderSpaceLeft, this.skin.borderSpaceUp);


		this._ui.text.text = "";
		this._ui.text.fontSize = this.skin.fontSize;
		/**根据气泡皮肤配置，设置箭头图片的显示隐藏 */
		if (this.skin.arrayVisible) {
			this._ui.array.visibility = mw.SlateVisibility.Collapsed;
			this._ui.array.position = tempSize.set(this._halfWidth - 28, this._height - 9);
		} else {
			this._ui.array.visibility = mw.SlateVisibility.Collapsed;
		}

		/**根据气泡皮肤配置，设置喇叭图片的显示隐藏 */
		if (this.skin.hornVisiable) {
			this._ui.horn.visibility = mw.SlateVisibility.HitTestInvisible;
		}
		else {
			this._ui.horn.visibility = mw.SlateVisibility.Collapsed;
		}
		/**设置世界UI的渲染大小 */
		this.widget.drawSize = new Vector2(512, 512);
	}

	/**
	 * 获取是否需要重新计算的位置、大小
	 * @returns 是否需要重新计算的位置、大小
	 */
	public get isSizeValidate() {
		const size = this._ui.text.desiredSize;
		return size.y > 0;
	}

	/**
	 * 重新设置文本
	 */
	public retrySizeValidate() {
		this._ui.text.text = this._text;
	}

	/**
	 * 设置文本
	 */
	public showText() {
		this._ui.text.text = this._text;
	}

	/**
	 *隐藏气泡UI，并根据isDestroy将世界UI和气泡UI销毁或回收到对象池中
	 */
	public destory() {
		this._ui.uiObject.visibility = mw.SlateVisibility.Collapsed;
		if (this.isDestroy) {
			this._ui.destroy();
			this.widget?.destroy();
		} else {
			BubblePool.getWidgetPool().despawn(this.widget);
			BubblePool.getUIPool(this.curId).despawn(this._ui);
		}
	}

	/**
	 * 基于拥有者位置，更新气泡的位置
	 * @returns 返回是否更新成功
	 */
	public updateUI() {
		try {
			if (!localCharacter) {
				const player = Player.localPlayer;
				player && (localCharacter = player.character);
			}
			if (localCharacter) {
				const owner = this.owner();
				if (owner) {
					const loc = owner.worldTransform.position;
					let left = Camera.currentCamera.worldTransform.clone().getRightVector().multiply(new mw.Vector(-1, -1, -1)).clone();
					if (owner instanceof mw.Character) {
						loc.z += owner.collisionExtent.z / 2 * owner.worldTransform.scale.x * 1.2;
						loc.z -= 75;
						loc.z += 20;
						loc.z += this.offsetZ * this._scale;
						let right = Camera.currentCamera.worldTransform.clone().getRightVector().clone();
						loc.subtract(right.multiply(this._halfWidth * this._scale - 75 + 20));
						this.widget.worldTransform.position = loc.add(left.multiply(5)).add(new mw.Vector(0, 0, 25));
					} else {
						loc.z += this.offsetZ * this._scale;
						let right = Camera.currentCamera.worldTransform.clone().getRightVector().clone();
						loc.subtract(right.multiply(this._halfWidth * this._scale - 75 + 20));
						this.widget.worldTransform.position = loc.add(left.multiply(5)).add(new mw.Vector(0, 0, 25));
					}

					let dir = Vector.subtract(Camera.currentCamera.worldTransform.clone().position, loc, this._tempVec);
					dir.z = 0;
					this._tempRot.fromVector(dir);
					this.widget.worldTransform.rotation = this._tempRot;
					return true;
				}
			}
			return false;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	/**临时三维向量 */
	private _tempVec: Vector = Vector.zero;
	/**临时三维向量 */
	private _tempVec2: Vector = Vector.zero;
	/**临时旋转值 */
	private _tempRot: Rotation = Rotation.zero;
}

/**
 * 气泡状态机接口
 */
interface IBubbleState {
	/**
	 * 退出状态回调
	 */
	onExit(): void;
	/**
	 * 进入状态回调
	 */
	onEnter();
	/**
	 * 每帧调用一次
	 * @param dt 这一帧于上一帧的时间差
	 */
	update(dt: number);
}

/**
 * 计算气泡位置，主要用于计算气泡大小，切换状态
 */
class StateMeasure implements IBubbleState {
	/**延时时间 */
	private _timer: number;
	/**重新计算时间 */
	private _retryTime: number;
	/** 构造函数
	 * @param fsm 气泡状态机
	 */
	constructor(public fsm: BubbleFsm) {

	}
	/**
	 * 退出状态回调
	 */
	onExit(): void {
	}
	/**
	 * 初始化该状态的值
	 */
	onEnter() {
		this._timer = 0.2;
		this._retryTime = 5;
		this.fsm.bubble.scale(0);
	}

	/**
	 * 判断是否需要计算气泡大小，如果需要计算，切换到下一个状态
	 * @param dt 这一帧于上一帧的时间差
	 */
	update(dt: number) {
		this._timer -= dt;
		if (this._timer <= 0) {
			if (this.fsm.bubble.isSizeValidate) {
				this.fsm.bubble.measure();
				this.fsm.switchState(StateJump);
			} else {
				this.fsm.bubble.retrySizeValidate();
				if (--this._retryTime <= 0) {
					/**拿不到气泡，标记销毁气泡，退出状态机*/
					this.fsm.bubble.isDestroy = true;
					this.fsm.finish();
				}
				this._timer = 0.2;
			}
		}
	}
}

/**
 * 顶开状态，主要用于弹出气泡，更新气泡位置，切换状态
 */
class StateJump implements IBubbleState {
	/**
	 * 延时时间
	 */
	private _timer: number;
	/** 构造函数
	 * @param fsm 气泡状态机
	 */
	constructor(public fsm: BubbleFsm) {

	}
	/**
	 * 退出状态回调
	 */
	onExit(): void {
	}

	/**
	 * 初始化该状态的值
	 */
	onEnter() {
		this._timer = 0;
	}

	/**
	 * 设置气泡的缩放，位置。延时时间到了，切换到下个状态
	 * @param dt 这一帧于上一帧的时间差
	 */
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
 * 展开状态，主要用于切换气泡的显示状态，更新气泡位置，完成状态机
 */
class StateExpand implements IBubbleState {
	/**
	 * 展开时间
	 */
	private _timer: number;
	/** 构造函数
	 * @param fsm 气泡状态机
	 */
	constructor(public fsm: BubbleFsm) {

	}
	/**
	 * 退出状态回调
	 */
	onExit(): void {
	}
	/**
	 * 初始化该状态的值
	 */
	onEnter() {
		this._timer = 0;
	}
	/**
	 * 判断是否更新成功，如果更新成功，结束状态机。延时时间到了，切换到下个状态
	 * @param dt 这一帧于上一帧的时间差
	 */
	update(dt: number) {
		this._timer += dt * 5;
		if (this._timer >= 1) {
			this._timer = 1;
			this.fsm.switchState(StateView);
		}
		this.fsm.bubble.scale(this._timer);
		if (!this.fsm.bubble.updateUI()) {
			this.fsm.finish();
		}
	}
}
/**
 * 显示状态，根据气泡是否更新成功，控制状态机结束
 */
class StateView implements IBubbleState {
	/**
	 * 显示时间
	 */
	private _timer: number;
	/** 构造函数
	 * @param fsm 气泡状态机
	 */
	constructor(public fsm: BubbleFsm) {

	}
	/**
	 * 退出状态回调
	 */
	onExit(): void {
	}
	/**
	 * 初始化该状态的值，显示气泡文本
	 */
	onEnter() {
		this._timer = this.fsm.bubble.cfg.time;
		this.fsm.bubble.showText();
	}
	/**
	 * 显示时间到了，更新气泡，结束状态机。
	 * @param dt 这一帧于上一帧的时间差
	 */
	update(dt: number) {
		this._timer -= dt;
		if (this._timer <= 0 || !this.fsm.bubble.updateUI()) {
			this.fsm.finish();
		}
	}
}

/**
 * 气泡状态机，控制气泡状态的切换和更新
 */
class BubbleFsm {
	/**状态机是否结束 */
	private _isFinish: boolean;
	/**状态机状态数组 */
	private _stateList: IBubbleState[];
	/**
	 * 当前状态
	 */
	private _currentState: IBubbleState;
	/**
	 * 下一个状态
	 */
	private _nextState: IBubbleState;

	/**
	 * 创建状态机并启动
	 * @param bubble 聊天气泡
	 */
	constructor(public bubble: BubbleChat) {
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
	public finish() {
		this._isFinish = true;
	}
	/**
	 * 更新状态机
	 * @param dt 这一帧于上一帧的时间差
	 */
	public update(dt: number) {
		this._currentState.update(dt);
		this._doChangeState();
		return this._isFinish;
	}
	/**
	 * 调用切换到下一个状态，为了防止状态混乱，仅在update期间调用
	 */
	private _doChangeState() {
		if (this._nextState) {
			this._currentState.onExit();
			this._currentState = this._nextState;
			this._currentState.onEnter();
			this._nextState = null;
		}
	}
	/**
	 * 切换到下一个状态
	 * @param stateClass 状态机切换的状态
	 */
	public switchState(stateClass: new (o) => IBubbleState) {
		if (this._currentState.constructor.name != stateClass.name) {
			this._nextState = this._stateList.find(i => i.constructor.name == stateClass.name);
		}

	}
}
/**三维向量常量 */
const tempSize: mw.Vector2 = new mw.Vector2(0);
/**当前客户端角色 */
let localCharacter: mw.Character;
if (mw.SystemUtil.isClient()) {
	/**获取本地角色 */
	Player.asyncGetLocalPlayer().then(player => {
		localCharacter = player.character;
	});
}
