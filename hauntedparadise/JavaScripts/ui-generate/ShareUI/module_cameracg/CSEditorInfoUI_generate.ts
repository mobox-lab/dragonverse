
 

 @UIBind('UI/ShareUI/module_cameracg/CSEditorInfoUI.ui')
 export default class CSEditorInfoUI_Generate extends UIScript {
	 	private mInputLocX_Internal: mw.InputBox
	public get mInputLocX(): mw.InputBox {
		if(!this.mInputLocX_Internal&&this.uiWidgetBase) {
			this.mInputLocX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editLoc/mInputLocX') as mw.InputBox
		}
		return this.mInputLocX_Internal
	}
	private mInputLocY_Internal: mw.InputBox
	public get mInputLocY(): mw.InputBox {
		if(!this.mInputLocY_Internal&&this.uiWidgetBase) {
			this.mInputLocY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editLoc/mInputLocY') as mw.InputBox
		}
		return this.mInputLocY_Internal
	}
	private mInputLocZ_Internal: mw.InputBox
	public get mInputLocZ(): mw.InputBox {
		if(!this.mInputLocZ_Internal&&this.uiWidgetBase) {
			this.mInputLocZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editLoc/mInputLocZ') as mw.InputBox
		}
		return this.mInputLocZ_Internal
	}
	private mInputRotP_Internal: mw.InputBox
	public get mInputRotP(): mw.InputBox {
		if(!this.mInputRotP_Internal&&this.uiWidgetBase) {
			this.mInputRotP_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editRot/mInputRotP') as mw.InputBox
		}
		return this.mInputRotP_Internal
	}
	private mInputRotY_Internal: mw.InputBox
	public get mInputRotY(): mw.InputBox {
		if(!this.mInputRotY_Internal&&this.uiWidgetBase) {
			this.mInputRotY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editRot/mInputRotY') as mw.InputBox
		}
		return this.mInputRotY_Internal
	}
	private mInputRotR_Internal: mw.InputBox
	public get mInputRotR(): mw.InputBox {
		if(!this.mInputRotR_Internal&&this.uiWidgetBase) {
			this.mInputRotR_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editRot/mInputRotR') as mw.InputBox
		}
		return this.mInputRotR_Internal
	}
	private mInputFOV_Internal: mw.InputBox
	public get mInputFOV(): mw.InputBox {
		if(!this.mInputFOV_Internal&&this.uiWidgetBase) {
			this.mInputFOV_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editOther/mInputFOV') as mw.InputBox
		}
		return this.mInputFOV_Internal
	}
	private mBtnDelKeyFrame_Internal: mw.Button
	public get mBtnDelKeyFrame(): mw.Button {
		if(!this.mBtnDelKeyFrame_Internal&&this.uiWidgetBase) {
			this.mBtnDelKeyFrame_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Cav_editOther/CanvasBtnDelKeyFrame/mBtnDelKeyFrame') as mw.Button
		}
		return this.mBtnDelKeyFrame_Internal
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
		
		this.mBtnDelKeyFrame.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "CSEditorInfoUI_mBtnDelKeyFrame");
		})
		this.mBtnDelKeyFrame.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.mBtnDelKeyFrame.onPressed.add(() => {
			this.mBtnDelKeyFrame["preScale"] = this.mBtnDelKeyFrame.renderScale;
			this.mBtnDelKeyFrame.renderScale = Vector2.one.set(this.mBtnDelKeyFrame["preScale"]).multiply(1.1);
		})
		this.mBtnDelKeyFrame.onReleased.add(() => {
			this.mBtnDelKeyFrame.renderScale = this.mBtnDelKeyFrame["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editLoc/TextLoc") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editLoc/TextX") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editLoc/TextY") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editLoc/TextZ") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editRot/TextRot") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editRot/TextP") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editRot/TextY") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editRot/TextR") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editOther/TextFOV") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/Cav_editOther/CanvasBtnDelKeyFrame/Text") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_CSEditorInfoUI'] = CSEditorInfoUI_Generate;