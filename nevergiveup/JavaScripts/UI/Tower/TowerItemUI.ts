
/** 
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.10-13.47.57
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import Gtk from "gtoolkit";
import { GameManager } from "../../GameManager";
import { TowerEvent } from "../../Modules/TowerModule/TowerEnum";
import { TowerModuleC } from "../../Modules/TowerModule/TowerModuleC";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { ITowerElement } from "../../config/Tower";
import { GlobalData } from "../../const/GlobalData";
import TowerItemUI_Generate from "../../ui-generate/Tower/TowerItemUI_generate";
import TowerTagItem_Generate from "../../ui-generate/Tower/TowerTagItem_generate";
import TowerShopUI from "./TowerShopUI";

export default class TowerItemUI extends TowerItemUI_Generate {
	public cfg: ITowerElement = null;

	public isSelect: boolean = false;
	private _oriImg: string;
	/** 
	 * 构造UI文件成功后，在合适的时机最先初始化一次 
	 */
	protected onStart() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UILayerMiddle;
		this._oriImg = this.img_Icon.imageGuid;
		this.mPriceCanvas.visibility = SlateVisibility.Visible;
		Event.addLocalListener(TowerEvent.ChooseTower, (ui: UIScript) => {
            this.setSelected(ui == this);
        })
		this.itemBtn.onClicked.add(() => {
			if(GameManager.getStageClient()) {
				if (!this.cfg) return;
				ModuleService.getModule(TowerModuleC).chooseTowerByUI(this.cfg.id);
				Event.dispatchToLocal(TowerEvent.ChooseTower, this);
			} else {
				UIService.getUI(TowerShopUI).show({ isShop: false, cfgId: this.cfg?.id  });
			}
		})
		this.itemBtn.onHovered.add(() => {
			Gtk.trySetVisibility(this.can_hover, this.hoverNameTxt.text ? SlateVisibility.Visible : SlateVisibility.Collapsed);
		})
		this.itemBtn.onUnhovered.add(() => {
			Gtk.trySetVisibility(this.can_hover, SlateVisibility.Collapsed);
		})
	}

	/**
	 * 初始化
	 * @param cfgID 信息id
	 */
	public init(cfgID: number) {
		if (!cfgID) this.cfg = null;
		else this.cfg = GameConfig.Tower.getElement(cfgID);
		this.initObj();
	}

	public getTags() {
		const cfg = this.cfg;
		const tags = [];
		if(cfg?.attackCount?.length && ![3, 4].includes(cfg.adap))
			tags.push(cfg.attackCount[0] > 1 ? GlobalData.Shop.shopTagIconGuid[1] : GlobalData.Shop.shopTagIconGuid[0]); // shopTagIconGuid[0] 单体 shopTagIconGuid[1] 群体
		// adap 1为物理伤害，2为法术伤害，3为产出，4为增益
		if(cfg?.adap) {
			tags.push(GlobalData.Shop.shopTagIconGuid[cfg.adap + 1]);// 1-物理 2-法术 3-产出 4-增益
		}
		return tags;
	}

	/**
	 * 初始化组件
	*/
	private initObj() {
		if (!this.cfg) {
			Gtk.trySetVisibility(this.mCanvas_add, SlateVisibility.Visible);
			Gtk.trySetVisibility(this.mContainer_tower, SlateVisibility.Collapsed);
			this.hoverNameTxt.text = '';
		} else {
			Gtk.trySetVisibility(this.mCanvas_add, SlateVisibility.Collapsed);
			Gtk.trySetVisibility(this.mContainer_tower, SlateVisibility.Visible);
			this.img_Icon.imageGuid = this.cfg.imgGuid;
			this.txt_spend.text = this.cfg.spend[0].toString();
			this.nameTxt.text = this.cfg.name;

			const sInfo = GlobalData.Shop.getStrategyInfo(this.cfg.id);
			if(!sInfo?.strategyKey && this.cfg?.adap === 4) {
				 const { value } = GlobalData.Shop.getTowerBuffTextItem(this.cfg, 0, 0) ?? {};
				this.txt_attack.text = value;
			} else this.txt_attack.text = Utils.formatNumber(this.cfg.attackDamage[0]);

			this.hoverNameTxt.text = sInfo?.strategyTitle ?? "";

			this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[0];
			if(this.cfg.adap === 3) this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[1];
			if(this.cfg.adap === 4) this.fightImg.imageGuid = GlobalData.Shop.shopItemFightIconGuid[2];	

			this.icontagCanvas.removeAllChildren();
			this.bgElementImg.imageGuid = GlobalData.Shop.shopItemBgGuid[(this.cfg?.elementTy || 1) - 1];
			this.elementImg.imageGuid = GlobalData.Shop.shopItemCornerIconGuid[(this.cfg?.elementTy || 1) - 1];
			const tags = this.getTags();
			const len = tags?.length ?? 0;
			for (let i = 0; i < len; i++) {
				let item = UIService.create(TowerTagItem_Generate);
				this.icontagCanvas.addChild(item.uiObject);
				// item.txt_tag.text = GameConfig.Language.getElement(tags[i])?.Value
				item.img_tag.imageGuid = tags[i];
			}
		}
	}

	/**
	 * 设置选中状态
	 * @param isSelect 是否被选中
	 */
	public setSelected(isSelect: boolean) {
		this.selectImg.visibility = isSelect ? 0 : 1;
		this.isSelect = isSelect;
	}

	public setPriceVisible(isVisible: boolean) {
		// this.mPriceCanvas.visibility = isVisible ? SlateVisibility.Visible : SlateVisibility.Collapsed;
	}
	/** 
	 * 构造UI文件成功后，onStart之后 
	 * 对于UI的根节点的添加操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onAdded() {
	}

	/** 
	 * 构造UI文件成功后，onAdded之后
	 * 对于UI的根节点的移除操作，进行调用
	 * 注意：该事件可能会多次调用
	 */
	protected onRemoved() {
	}

	/** 
	* 构造UI文件成功后，UI对象再被销毁时调用 
	* 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
	*/
	protected onDestroy() {
	}

	/**
	* 每一帧调用
	* 通过canUpdate可以开启关闭调用
	* dt 两帧调用的时间差，毫秒
	*/
	//protected onUpdate(dt :number) {
	//}

	/**
	 * 设置显示时触发
	 */
	//protected onShow(...params:any[]) {
	//}

	/**
	 * 设置不显示时触发
	 */
	//protected onHide() {
	//}

	/**
	 * 当这个UI界面是可以接收事件的时候
	 * 手指或则鼠标触发一次Touch时触发
	 * 返回事件是否处理了
	 * 如果处理了，那么这个UI界面可以接收这次Touch后续的Move和End事件
	 * 如果没有处理，那么这个UI界面就无法接收这次Touch后续的Move和End事件
	 */
	//protected onTouchStarted(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标再UI界面上移动时
	 */
	//protected onTouchMoved(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 手指或则鼠标离开UI界面时
	 */
	//protected onTouchEnded(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent) :mw.EventReply{
	//	return mw.EventReply.unHandled; //mw.EventReply.handled
	//}

	/**
	 * 当在UI界面上调用detectDrag/detectDragIfPressed时触发一次
	 * 可以触发一次拖拽事件的开始生成
	 * 返回一次生成的拖拽事件 newDragDrop可以生成一次事件
	 */
	//protected onDragDetected(InGeometry :mw.Geometry,InPointerEvent:mw.PointerEvent):mw.DragDropOperation {
	//	return this.newDragDrop(null);
	//}

	/**
	 * 拖拽操作生成事件触发后经过这个UI时触发
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDragOver(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后在这个UI释放完成时
	 * 返回true的话表示处理了这次事件，不会再往这个UI的下一层的UI继续冒泡这个事件
	 */
	//protected onDrop(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation):boolean {
	//	return true;
	//}

	/**
	 * 拖拽操作生成事件触发后进入这个UI时触发
	 */
	//protected onDragEnter(InGeometry :mw.Geometry,InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

	/**
	 * 拖拽操作生成事件触发后离开这个UI时触发
	 */
	//protected onDragLeave(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

	/**
	 * 拖拽操作生成事件触发后，没有完成完成的拖拽事件而取消时触发
	 */
	//protected onDragCancelled(InDragDropEvent:mw.PointerEvent,InDragDropOperation:mw.DragDropOperation) {
	//}

}
