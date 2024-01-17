
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 真爱与自由
 * UI: UI/Main/MainDeadMask.ui
 * TIME: 2023.12.15-19.34.56
 */

 

 @UIBind('UI/Main/MainDeadMask.ui')
 export default class MainDeadMask_Generate extends UIScript {
	 	private fadeCanvas_Internal: mw.Canvas
	public get fadeCanvas(): mw.Canvas {
		if(!this.fadeCanvas_Internal&&this.uiWidgetBase) {
			this.fadeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/fadeCanvas') as mw.Canvas
		}
		return this.fadeCanvas_Internal
	}
	private mbgBlack_Internal: mw.Image
	public get mbgBlack(): mw.Image {
		if(!this.mbgBlack_Internal&&this.uiWidgetBase) {
			this.mbgBlack_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/fadeCanvas/mbgBlack') as mw.Image
		}
		return this.mbgBlack_Internal
	}
	private title_Internal: mw.TextBlock
	public get title(): mw.TextBlock {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/fadeCanvas/title') as mw.TextBlock
		}
		return this.title_Internal
	}
	private mdeadNameTip_Internal: mw.TextBlock
	public get mdeadNameTip(): mw.TextBlock {
		if(!this.mdeadNameTip_Internal&&this.uiWidgetBase) {
			this.mdeadNameTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/fadeCanvas/mdeadNameTip') as mw.TextBlock
		}
		return this.mdeadNameTip_Internal
	}
	private mRank_Internal: mw.TextBlock
	public get mRank(): mw.TextBlock {
		if(!this.mRank_Internal&&this.uiWidgetBase) {
			this.mRank_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/fadeCanvas/mRank') as mw.TextBlock
		}
		return this.mRank_Internal
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
		
		this.initLanguage(this.title)
		
	
		this.initLanguage(this.mdeadNameTip)
		
	
		this.initLanguage(this.mRank)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/fadeCanvas/Tip") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 