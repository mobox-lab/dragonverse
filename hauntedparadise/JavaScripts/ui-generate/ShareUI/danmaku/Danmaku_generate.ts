
 

 @UIBind('UI/ShareUI/danmaku/Danmaku.ui')
 export default class Danmaku_Generate extends UIScript {
	 	private mMainCanvas_Internal: mw.Canvas
	public get mMainCanvas(): mw.Canvas {
		if(!this.mMainCanvas_Internal&&this.uiWidgetBase) {
			this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas') as mw.Canvas
		}
		return this.mMainCanvas_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/Canvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mEmoji_Internal: mw.Image
	public get mEmoji(): mw.Image {
		if(!this.mEmoji_Internal&&this.uiWidgetBase) {
			this.mEmoji_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/Canvas/mEmoji') as mw.Image
		}
		return this.mEmoji_Internal
	}
	private mChat_Internal: mw.TextBlock
	public get mChat(): mw.TextBlock {
		if(!this.mChat_Internal&&this.uiWidgetBase) {
			this.mChat_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/Canvas/mChat') as mw.TextBlock
		}
		return this.mChat_Internal
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
		
		this.initLanguage(this.mName)
		
	
		this.initLanguage(this.mChat)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Danmaku'] = Danmaku_Generate;