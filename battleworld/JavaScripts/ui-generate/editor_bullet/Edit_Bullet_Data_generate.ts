
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/editor_bullet/Edit_Bullet_Data.ui
 */

 

 @UIBind('UI/editor_bullet/Edit_Bullet_Data.ui')
 export default class Edit_Bullet_Data_Generate extends UIScript {
	 	private mTittle_Internal: mw.TextBlock
	public get mTittle(): mw.TextBlock {
		if(!this.mTittle_Internal&&this.uiWidgetBase) {
			this.mTittle_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTittle') as mw.TextBlock
		}
		return this.mTittle_Internal
	}
	private mInput_Internal: mw.InputBox
	public get mInput(): mw.InputBox {
		if(!this.mInput_Internal&&this.uiWidgetBase) {
			this.mInput_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInput') as mw.InputBox
		}
		return this.mInput_Internal
	}
	private mInputX_Internal: mw.InputBox
	public get mInputX(): mw.InputBox {
		if(!this.mInputX_Internal&&this.uiWidgetBase) {
			this.mInputX_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputX') as mw.InputBox
		}
		return this.mInputX_Internal
	}
	private mInputY_Internal: mw.InputBox
	public get mInputY(): mw.InputBox {
		if(!this.mInputY_Internal&&this.uiWidgetBase) {
			this.mInputY_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputY') as mw.InputBox
		}
		return this.mInputY_Internal
	}
	private mInputZ_Internal: mw.InputBox
	public get mInputZ(): mw.InputBox {
		if(!this.mInputZ_Internal&&this.uiWidgetBase) {
			this.mInputZ_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mInputZ') as mw.InputBox
		}
		return this.mInputZ_Internal
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
		
		this.initLanguage(this.mTittle)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 