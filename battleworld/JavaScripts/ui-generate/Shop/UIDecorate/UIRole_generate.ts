
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 冷风吹
 * UI: UI/Shop/UIDecorate/UIRole.ui
 * TIME: 2023.12.15-16.38.04
 */

 

 @UIBind('UI/Shop/UIDecorate/UIRole.ui')
 export default class UIRole_Generate extends UIScript {
	 	private mCanvasRole_Internal: mw.Canvas
	public get mCanvasRole(): mw.Canvas {
		if(!this.mCanvasRole_Internal&&this.uiWidgetBase) {
			this.mCanvasRole_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/CanvasContent/mCanvasRole') as mw.Canvas
		}
		return this.mCanvasRole_Internal
	}
	private mScrollDec_Internal: mw.ScrollBox
	public get mScrollDec(): mw.ScrollBox {
		if(!this.mScrollDec_Internal&&this.uiWidgetBase) {
			this.mScrollDec_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/CanvasContent/mScrollDec') as mw.ScrollBox
		}
		return this.mScrollDec_Internal
	}
	private mCanvasDec_Internal: mw.Canvas
	public get mCanvasDec(): mw.Canvas {
		if(!this.mCanvasDec_Internal&&this.uiWidgetBase) {
			this.mCanvasDec_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/CanvasContent/mScrollDec/mCanvasDec') as mw.Canvas
		}
		return this.mCanvasDec_Internal
	}
	private mBtnClose1_Internal: mw.Button
	public get mBtnClose1(): mw.Button {
		if(!this.mBtnClose1_Internal&&this.uiWidgetBase) {
			this.mBtnClose1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/CanvasContent/mBtnClose1') as mw.Button
		}
		return this.mBtnClose1_Internal
	}
	private mTextClose1_Internal: mw.TextBlock
	public get mTextClose1(): mw.TextBlock {
		if(!this.mTextClose1_Internal&&this.uiWidgetBase) {
			this.mTextClose1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/CanvasContent/mBtnClose1/mTextClose1') as mw.TextBlock
		}
		return this.mTextClose1_Internal
	}
	private mCanvasBtn_Internal: mw.Canvas
	public get mCanvasBtn(): mw.Canvas {
		if(!this.mCanvasBtn_Internal&&this.uiWidgetBase) {
			this.mCanvasBtn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn') as mw.Canvas
		}
		return this.mCanvasBtn_Internal
	}
	private mCanvasGold_Internal: mw.Canvas
	public get mCanvasGold(): mw.Canvas {
		if(!this.mCanvasGold_Internal&&this.uiWidgetBase) {
			this.mCanvasGold_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasGold') as mw.Canvas
		}
		return this.mCanvasGold_Internal
	}
	private mTextGold_Internal: mw.TextBlock
	public get mTextGold(): mw.TextBlock {
		if(!this.mTextGold_Internal&&this.uiWidgetBase) {
			this.mTextGold_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasGold/mTextGold') as mw.TextBlock
		}
		return this.mTextGold_Internal
	}
	private mBtnGold_Internal: mw.StaleButton
	public get mBtnGold(): mw.StaleButton {
		if(!this.mBtnGold_Internal&&this.uiWidgetBase) {
			this.mBtnGold_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasGold/mBtnGold') as mw.StaleButton
		}
		return this.mBtnGold_Internal
	}
	private mCanvasDisBg_Internal: mw.Canvas
	public get mCanvasDisBg(): mw.Canvas {
		if(!this.mCanvasDisBg_Internal&&this.uiWidgetBase) {
			this.mCanvasDisBg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasDisBg') as mw.Canvas
		}
		return this.mCanvasDisBg_Internal
	}
	private mTextDis_Internal: mw.TextBlock
	public get mTextDis(): mw.TextBlock {
		if(!this.mTextDis_Internal&&this.uiWidgetBase) {
			this.mTextDis_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasDisBg/mTextDis') as mw.TextBlock
		}
		return this.mTextDis_Internal
	}
	private mTextDis2_Internal: mw.TextBlock
	public get mTextDis2(): mw.TextBlock {
		if(!this.mTextDis2_Internal&&this.uiWidgetBase) {
			this.mTextDis2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasDisBg/mTextDis2') as mw.TextBlock
		}
		return this.mTextDis2_Internal
	}
	private mTextDis3_Internal: mw.TextBlock
	public get mTextDis3(): mw.TextBlock {
		if(!this.mTextDis3_Internal&&this.uiWidgetBase) {
			this.mTextDis3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasDisBg/mTextDis3') as mw.TextBlock
		}
		return this.mTextDis3_Internal
	}
	private mBtnDis_Internal: mw.StaleButton
	public get mBtnDis(): mw.StaleButton {
		if(!this.mBtnDis_Internal&&this.uiWidgetBase) {
			this.mBtnDis_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasBtn/mCanvasDisBg/mBtnDis') as mw.StaleButton
		}
		return this.mBtnDis_Internal
	}
	private mCanvasWarn_Internal: mw.Canvas
	public get mCanvasWarn(): mw.Canvas {
		if(!this.mCanvasWarn_Internal&&this.uiWidgetBase) {
			this.mCanvasWarn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasWarn') as mw.Canvas
		}
		return this.mCanvasWarn_Internal
	}
	private mTextWarn_Internal: mw.TextBlock
	public get mTextWarn(): mw.TextBlock {
		if(!this.mTextWarn_Internal&&this.uiWidgetBase) {
			this.mTextWarn_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasWarn/mTextWarn') as mw.TextBlock
		}
		return this.mTextWarn_Internal
	}
	private mCanvasMoney_Internal: mw.Canvas
	public get mCanvasMoney(): mw.Canvas {
		if(!this.mCanvasMoney_Internal&&this.uiWidgetBase) {
			this.mCanvasMoney_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasMoney') as mw.Canvas
		}
		return this.mCanvasMoney_Internal
	}
	private mGold_Internal: mw.TextBlock
	public get mGold(): mw.TextBlock {
		if(!this.mGold_Internal&&this.uiWidgetBase) {
			this.mGold_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasMoney/mGold') as mw.TextBlock
		}
		return this.mGold_Internal
	}
	private mCanvasDes_Internal: mw.Canvas
	public get mCanvasDes(): mw.Canvas {
		if(!this.mCanvasDes_Internal&&this.uiWidgetBase) {
			this.mCanvasDes_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasDes') as mw.Canvas
		}
		return this.mCanvasDes_Internal
	}
	private mDes_Internal: mw.TextBlock
	public get mDes(): mw.TextBlock {
		if(!this.mDes_Internal&&this.uiWidgetBase) {
			this.mDes_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/CanvasWindow/mCanvasDes/mDes') as mw.TextBlock
		}
		return this.mDes_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtnGold.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtnGold");
		})
		this.initLanguage(this.mBtnGold);
		//this.mBtnGold.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtnDis.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtnDis");
		})
		this.initLanguage(this.mBtnDis);
		//this.mBtnDis.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mBtnClose1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtnClose1");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mTextClose1)
		
	
		this.initLanguage(this.mTextGold)
		
	
		this.initLanguage(this.mTextDis)
		
	
		this.initLanguage(this.mTextDis2)
		
	
		this.initLanguage(this.mTextDis3)
		
	
		this.initLanguage(this.mTextWarn)
		
	
		this.initLanguage(this.mGold)
		
	
		this.initLanguage(this.mDes)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 