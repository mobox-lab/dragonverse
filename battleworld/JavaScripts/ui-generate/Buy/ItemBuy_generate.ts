
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Buy/ItemBuy.ui
 */

 

 @UIBind('UI/Buy/ItemBuy.ui')
 export default class ItemBuy_Generate extends UIScript {
	 	private mItemName_Internal: mw.TextBlock
	public get mItemName(): mw.TextBlock {
		if(!this.mItemName_Internal&&this.uiWidgetBase) {
			this.mItemName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mItemName') as mw.TextBlock
		}
		return this.mItemName_Internal
	}
	private price_Internal: mw.TextBlock
	public get price(): mw.TextBlock {
		if(!this.price_Internal&&this.uiWidgetBase) {
			this.price_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/price') as mw.TextBlock
		}
		return this.price_Internal
	}
	private mSelectBtn_Internal: mw.StaleButton
	public get mSelectBtn(): mw.StaleButton {
		if(!this.mSelectBtn_Internal&&this.uiWidgetBase) {
			this.mSelectBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mSelectBtn') as mw.StaleButton
		}
		return this.mSelectBtn_Internal
	}
	private count_Internal: mw.TextBlock
	public get count(): mw.TextBlock {
		if(!this.count_Internal&&this.uiWidgetBase) {
			this.count_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/count') as mw.TextBlock
		}
		return this.count_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mSelectBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mSelectBtn");
		})
		this.initLanguage(this.mSelectBtn);
		//this.mSelectBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mItemName)
		
	
		this.initLanguage(this.price)
		
	
		this.initLanguage(this.count)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 