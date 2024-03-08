
 

 @UIBind('UI/ShareUI/card/FriendRequest_UI.ui')
 export default class FriendRequest_UI_Generate extends UIScript {
	 	private canvas_friend1_Internal: mw.Canvas
	public get canvas_friend1(): mw.Canvas {
		if(!this.canvas_friend1_Internal&&this.uiWidgetBase) {
			this.canvas_friend1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1') as mw.Canvas
		}
		return this.canvas_friend1_Internal
	}
	private img_friendBg1_Internal: mw.Image
	public get img_friendBg1(): mw.Image {
		if(!this.img_friendBg1_Internal&&this.uiWidgetBase) {
			this.img_friendBg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/img_friendBg1') as mw.Image
		}
		return this.img_friendBg1_Internal
	}
	private img_friendBg2_Internal: mw.Image
	public get img_friendBg2(): mw.Image {
		if(!this.img_friendBg2_Internal&&this.uiWidgetBase) {
			this.img_friendBg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/img_friendBg2') as mw.Image
		}
		return this.img_friendBg2_Internal
	}
	private img_friendBg3_Internal: mw.Image
	public get img_friendBg3(): mw.Image {
		if(!this.img_friendBg3_Internal&&this.uiWidgetBase) {
			this.img_friendBg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/img_friendBg3') as mw.Image
		}
		return this.img_friendBg3_Internal
	}
	private text_friendRequest_Internal: mw.TextBlock
	public get text_friendRequest(): mw.TextBlock {
		if(!this.text_friendRequest_Internal&&this.uiWidgetBase) {
			this.text_friendRequest_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/text_friendRequest') as mw.TextBlock
		}
		return this.text_friendRequest_Internal
	}
	private btn_no_Internal: mw.Button
	public get btn_no(): mw.Button {
		if(!this.btn_no_Internal&&this.uiWidgetBase) {
			this.btn_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/btn_no') as mw.Button
		}
		return this.btn_no_Internal
	}
	private text_no_Internal: mw.TextBlock
	public get text_no(): mw.TextBlock {
		if(!this.text_no_Internal&&this.uiWidgetBase) {
			this.text_no_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/btn_no/text_no') as mw.TextBlock
		}
		return this.text_no_Internal
	}
	private btn_yes_Internal: mw.Button
	public get btn_yes(): mw.Button {
		if(!this.btn_yes_Internal&&this.uiWidgetBase) {
			this.btn_yes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/btn_yes') as mw.Button
		}
		return this.btn_yes_Internal
	}
	private text_yes_Internal: mw.TextBlock
	public get text_yes(): mw.TextBlock {
		if(!this.text_yes_Internal&&this.uiWidgetBase) {
			this.text_yes_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend1/btn_yes/text_yes') as mw.TextBlock
		}
		return this.text_yes_Internal
	}
	private canvas_friend2_Internal: mw.Canvas
	public get canvas_friend2(): mw.Canvas {
		if(!this.canvas_friend2_Internal&&this.uiWidgetBase) {
			this.canvas_friend2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend2') as mw.Canvas
		}
		return this.canvas_friend2_Internal
	}
	private img_friendBg4_Internal: mw.Image
	public get img_friendBg4(): mw.Image {
		if(!this.img_friendBg4_Internal&&this.uiWidgetBase) {
			this.img_friendBg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend2/img_friendBg4') as mw.Image
		}
		return this.img_friendBg4_Internal
	}
	private img_friendBg5_Internal: mw.Image
	public get img_friendBg5(): mw.Image {
		if(!this.img_friendBg5_Internal&&this.uiWidgetBase) {
			this.img_friendBg5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend2/img_friendBg5') as mw.Image
		}
		return this.img_friendBg5_Internal
	}
	private img_friendBg6_Internal: mw.Image
	public get img_friendBg6(): mw.Image {
		if(!this.img_friendBg6_Internal&&this.uiWidgetBase) {
			this.img_friendBg6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend2/img_friendBg6') as mw.Image
		}
		return this.img_friendBg6_Internal
	}
	private text_done_Internal: mw.TextBlock
	public get text_done(): mw.TextBlock {
		if(!this.text_done_Internal&&this.uiWidgetBase) {
			this.text_done_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_friend2/text_done') as mw.TextBlock
		}
		return this.text_done_Internal
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
		
		this.btn_no.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "FriendRequest_UI_btn_no");
		})
		this.btn_no.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_no.onPressed.add(() => {
			this.btn_no["preScale"] = this.btn_no.renderScale;
			this.btn_no.renderScale = Vector2.one.set(this.btn_no["preScale"]).multiply(1.1);
		})
		this.btn_no.onReleased.add(() => {
			this.btn_no.renderScale = this.btn_no["preScale"];
		})
		
	
		this.btn_yes.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "FriendRequest_UI_btn_yes");
		})
		this.btn_yes.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_yes.onPressed.add(() => {
			this.btn_yes["preScale"] = this.btn_yes.renderScale;
			this.btn_yes.renderScale = Vector2.one.set(this.btn_yes["preScale"]).multiply(1.1);
		})
		this.btn_yes.onReleased.add(() => {
			this.btn_yes.renderScale = this.btn_yes["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_friendRequest)
		
	
		this.initLanguage(this.text_no)
		
	
		this.initLanguage(this.text_yes)
		
	
		this.initLanguage(this.text_done)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_FriendRequest_UI'] = FriendRequest_UI_Generate;