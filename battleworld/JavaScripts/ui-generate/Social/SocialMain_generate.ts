
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/Social/SocialMain.ui
 */

 

 @UIBind('UI/Social/SocialMain.ui')
 export default class SocialMain_Generate extends UIScript {
	 	private mainCanvas_Internal: mw.Canvas
	public get mainCanvas(): mw.Canvas {
		if(!this.mainCanvas_Internal&&this.uiWidgetBase) {
			this.mainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas') as mw.Canvas
		}
		return this.mainCanvas_Internal
	}
	private mBtn_teamesc_Internal: mw.Button
	public get mBtn_teamesc(): mw.Button {
		if(!this.mBtn_teamesc_Internal&&this.uiWidgetBase) {
			this.mBtn_teamesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/mBtn_teamesc') as mw.Button
		}
		return this.mBtn_teamesc_Internal
	}
	private roomCanvas_Internal: mw.Canvas
	public get roomCanvas(): mw.Canvas {
		if(!this.roomCanvas_Internal&&this.uiWidgetBase) {
			this.roomCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/roomCanvas') as mw.Canvas
		}
		return this.roomCanvas_Internal
	}
	private mBtn_room_on_Internal: mw.Button
	public get mBtn_room_on(): mw.Button {
		if(!this.mBtn_room_on_Internal&&this.uiWidgetBase) {
			this.mBtn_room_on_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/roomCanvas/mBtn_room_on') as mw.Button
		}
		return this.mBtn_room_on_Internal
	}
	private mBtn_room_off_Internal: mw.Button
	public get mBtn_room_off(): mw.Button {
		if(!this.mBtn_room_off_Internal&&this.uiWidgetBase) {
			this.mBtn_room_off_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/roomCanvas/mBtn_room_off') as mw.Button
		}
		return this.mBtn_room_off_Internal
	}
	private listCanvas_Internal: mw.Canvas
	public get listCanvas(): mw.Canvas {
		if(!this.listCanvas_Internal&&this.uiWidgetBase) {
			this.listCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/listCanvas') as mw.Canvas
		}
		return this.listCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/listCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private listItemCanvas_Internal: mw.Canvas
	public get listItemCanvas(): mw.Canvas {
		if(!this.listItemCanvas_Internal&&this.uiWidgetBase) {
			this.listItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mainCanvas/listCanvas/mScrollBox/listItemCanvas') as mw.Canvas
		}
		return this.listItemCanvas_Internal
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
		
		this.mBtn_teamesc.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_teamesc");
		})
		
		
	
		this.mBtn_room_on.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_room_on");
		})
		
		
	
		this.mBtn_room_off.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_room_off");
		})
		
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mainCanvas/Canvas_1/TextBlock") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mainCanvas/roomCanvas/mBtn_room_off/TextBlock_1") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mainCanvas/listCanvas/Canvas_3/TextBlock_3") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mainCanvas/listCanvas/Canvas_3/TextBlock_4") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 