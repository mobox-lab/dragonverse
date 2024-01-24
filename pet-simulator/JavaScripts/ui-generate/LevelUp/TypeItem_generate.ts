
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/LevelUp/TypeItem.ui')
export default class TypeItem_Generate extends UIScript {
		private mImg_Icon_Internal: mw.Image
	public get mImg_Icon(): mw.Image {
		if(!this.mImg_Icon_Internal&&this.uiWidgetBase) {
			this.mImg_Icon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mImg_Icon') as mw.Image
		}
		return this.mImg_Icon_Internal
	}
	private mText_DiaNum_Internal: mw.TextBlock
	public get mText_DiaNum(): mw.TextBlock {
		if(!this.mText_DiaNum_Internal&&this.uiWidgetBase) {
			this.mText_DiaNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mText_DiaNum') as mw.TextBlock
		}
		return this.mText_DiaNum_Internal
	}
	private mBtn_Levelup_Internal: mw.Button
	public get mBtn_Levelup(): mw.Button {
		if(!this.mBtn_Levelup_Internal&&this.uiWidgetBase) {
			this.mBtn_Levelup_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mBtn_Levelup') as mw.Button
		}
		return this.mBtn_Levelup_Internal
	}
	private canvas_tupian_Internal: mw.Canvas
	public get canvas_tupian(): mw.Canvas {
		if(!this.canvas_tupian_Internal&&this.uiWidgetBase) {
			this.canvas_tupian_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tupian') as mw.Canvas
		}
		return this.canvas_tupian_Internal
	}
	private image_Internal: mw.Image
	public get image(): mw.Image {
		if(!this.image_Internal&&this.uiWidgetBase) {
			this.image_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tupian/image') as mw.Image
		}
		return this.image_Internal
	}
	private image_1_Internal: mw.Image
	public get image_1(): mw.Image {
		if(!this.image_1_Internal&&this.uiWidgetBase) {
			this.image_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tupian/image_1') as mw.Image
		}
		return this.image_1_Internal
	}
	private image_2_Internal: mw.Image
	public get image_2(): mw.Image {
		if(!this.image_2_Internal&&this.uiWidgetBase) {
			this.image_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tupian/image_2') as mw.Image
		}
		return this.image_2_Internal
	}
	private image_3_Internal: mw.Image
	public get image_3(): mw.Image {
		if(!this.image_3_Internal&&this.uiWidgetBase) {
			this.image_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tupian/image_3') as mw.Image
		}
		return this.image_3_Internal
	}
	private image_4_Internal: mw.Image
	public get image_4(): mw.Image {
		if(!this.image_4_Internal&&this.uiWidgetBase) {
			this.image_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/canvas_tupian/image_4') as mw.Image
		}
		return this.image_4_Internal
	}
	private mCanvas_Schedule_Internal: mw.Canvas
	public get mCanvas_Schedule(): mw.Canvas {
		if(!this.mCanvas_Schedule_Internal&&this.uiWidgetBase) {
			this.mCanvas_Schedule_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Schedule') as mw.Canvas
		}
		return this.mCanvas_Schedule_Internal
	}
	private mImage_Piece_0_Internal: mw.Image
	public get mImage_Piece_0(): mw.Image {
		if(!this.mImage_Piece_0_Internal&&this.uiWidgetBase) {
			this.mImage_Piece_0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_0') as mw.Image
		}
		return this.mImage_Piece_0_Internal
	}
	private mImage_Piece_1_Internal: mw.Image
	public get mImage_Piece_1(): mw.Image {
		if(!this.mImage_Piece_1_Internal&&this.uiWidgetBase) {
			this.mImage_Piece_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_1') as mw.Image
		}
		return this.mImage_Piece_1_Internal
	}
	private mImage_Piece_2_Internal: mw.Image
	public get mImage_Piece_2(): mw.Image {
		if(!this.mImage_Piece_2_Internal&&this.uiWidgetBase) {
			this.mImage_Piece_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_2') as mw.Image
		}
		return this.mImage_Piece_2_Internal
	}
	private mImage_Piece_3_Internal: mw.Image
	public get mImage_Piece_3(): mw.Image {
		if(!this.mImage_Piece_3_Internal&&this.uiWidgetBase) {
			this.mImage_Piece_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_3') as mw.Image
		}
		return this.mImage_Piece_3_Internal
	}
	private mImage_Piece_4_Internal: mw.Image
	public get mImage_Piece_4(): mw.Image {
		if(!this.mImage_Piece_4_Internal&&this.uiWidgetBase) {
			this.mImage_Piece_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mCanvas_Schedule/mImage_Piece_4') as mw.Image
		}
		return this.mImage_Piece_4_Internal
	}
	private mTxt_Itro_Internal: mw.TextBlock
	public get mTxt_Itro(): mw.TextBlock {
		if(!this.mTxt_Itro_Internal&&this.uiWidgetBase) {
			this.mTxt_Itro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/mTxt_Itro') as mw.TextBlock
		}
		return this.mTxt_Itro_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_Levelup.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Levelup");
		})
		this.mBtn_Levelup.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_DiaNum)
		
	
		this.initLanguage(this.mTxt_Itro)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 