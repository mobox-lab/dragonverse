
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/notice/NoticeView.ui
 */

 

 @UIBind('UI/notice/NoticeView.ui')
 export default class NoticeView_Generate extends UIScript {
	 	private con_top_notice_Internal: mw.Canvas
	public get con_top_notice(): mw.Canvas {
		if(!this.con_top_notice_Internal&&this.uiWidgetBase) {
			this.con_top_notice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_top_notice') as mw.Canvas
		}
		return this.con_top_notice_Internal
	}
	private con_second_notice_Internal: mw.Canvas
	public get con_second_notice(): mw.Canvas {
		if(!this.con_second_notice_Internal&&this.uiWidgetBase) {
			this.con_second_notice_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_second_notice') as mw.Canvas
		}
		return this.con_second_notice_Internal
	}
	private con_top_notice_2_Internal: mw.Canvas
	public get con_top_notice_2(): mw.Canvas {
		if(!this.con_top_notice_2_Internal&&this.uiWidgetBase) {
			this.con_top_notice_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/con_top_notice_2') as mw.Canvas
		}
		return this.con_top_notice_2_Internal
	}
	private mKillCanvas_Internal: mw.Canvas
	public get mKillCanvas(): mw.Canvas {
		if(!this.mKillCanvas_Internal&&this.uiWidgetBase) {
			this.mKillCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mKillCanvas') as mw.Canvas
		}
		return this.mKillCanvas_Internal
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
 