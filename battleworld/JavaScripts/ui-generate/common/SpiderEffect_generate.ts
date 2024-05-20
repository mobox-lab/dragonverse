
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/common/SpiderEffect.ui
 */

 

 @UIBind('UI/common/SpiderEffect.ui')
 export default class SpiderEffect_Generate extends UIScript {
	 	private mPic_BG_Internal: mw.Image
	public get mPic_BG(): mw.Image {
		if(!this.mPic_BG_Internal&&this.uiWidgetBase) {
			this.mPic_BG_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_BG') as mw.Image
		}
		return this.mPic_BG_Internal
	}
	private mPic_BG_1_Internal: mw.Image
	public get mPic_BG_1(): mw.Image {
		if(!this.mPic_BG_1_Internal&&this.uiWidgetBase) {
			this.mPic_BG_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mPic_BG_1') as mw.Image
		}
		return this.mPic_BG_1_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
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
 