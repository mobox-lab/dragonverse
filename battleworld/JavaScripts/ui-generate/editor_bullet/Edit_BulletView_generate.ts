
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 帅你一脸(影月宗·大师)
 * UI: UI/editor_bullet/Edit_BulletView.ui
 * TIME: 2023.11.15-14.12.49
 */

 

 @UIBind('UI/editor_bullet/Edit_BulletView.ui')
 export default class Edit_BulletView_Generate extends UIScript {
	 	private nBtnContent_Internal: mw.Canvas
	public get nBtnContent(): mw.Canvas {
		if(!this.nBtnContent_Internal&&this.uiWidgetBase) {
			this.nBtnContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtnScroll/nBtnContent') as mw.Canvas
		}
		return this.nBtnContent_Internal
	}
	private mBtnScroll_Internal: mw.ScrollBox
	public get mBtnScroll(): mw.ScrollBox {
		if(!this.mBtnScroll_Internal&&this.uiWidgetBase) {
			this.mBtnScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtnScroll') as mw.ScrollBox
		}
		return this.mBtnScroll_Internal
	}
	private mDataContent_Internal: mw.Canvas
	public get mDataContent(): mw.Canvas {
		if(!this.mDataContent_Internal&&this.uiWidgetBase) {
			this.mDataContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDataScroll/mDataContent') as mw.Canvas
		}
		return this.mDataContent_Internal
	}
	private mDataScroll_Internal: mw.ScrollBox
	public get mDataScroll(): mw.ScrollBox {
		if(!this.mDataScroll_Internal&&this.uiWidgetBase) {
			this.mDataScroll_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mDataScroll') as mw.ScrollBox
		}
		return this.mDataScroll_Internal
	}
	private mAddBullet_Internal: mw.StaleButton
	public get mAddBullet(): mw.StaleButton {
		if(!this.mAddBullet_Internal&&this.uiWidgetBase) {
			this.mAddBullet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAddBullet') as mw.StaleButton
		}
		return this.mAddBullet_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mAddBullet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAddBullet");
		})
		this.initLanguage(this.mAddBullet);
		//this.mAddBullet.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 