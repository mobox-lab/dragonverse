
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * UI: UI/notice/ItemKillTip.ui
 */

 

 @UIBind('UI/notice/ItemKillTip.ui')
 export default class ItemKillTip_Generate extends UIScript {
	 	private mKillTip_Internal: mw.TextBlock
	public get mKillTip(): mw.TextBlock {
		if(!this.mKillTip_Internal&&this.uiWidgetBase) {
			this.mKillTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mKillTip') as mw.TextBlock
		}
		return this.mKillTip_Internal
	}
	private mWeaponTip_Internal: mw.Canvas
	public get mWeaponTip(): mw.Canvas {
		if(!this.mWeaponTip_Internal&&this.uiWidgetBase) {
			this.mWeaponTip_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWeaponTip') as mw.Canvas
		}
		return this.mWeaponTip_Internal
	}
	private mWeapon1_Internal: mw.TextBlock
	public get mWeapon1(): mw.TextBlock {
		if(!this.mWeapon1_Internal&&this.uiWidgetBase) {
			this.mWeapon1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWeaponTip/mWeapon1') as mw.TextBlock
		}
		return this.mWeapon1_Internal
	}
	private mTextBlock_Internal: mw.TextBlock
	public get mTextBlock(): mw.TextBlock {
		if(!this.mTextBlock_Internal&&this.uiWidgetBase) {
			this.mTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWeaponTip/mTextBlock') as mw.TextBlock
		}
		return this.mTextBlock_Internal
	}
	private mWeapon2_Internal: mw.TextBlock
	public get mWeapon2(): mw.TextBlock {
		if(!this.mWeapon2_Internal&&this.uiWidgetBase) {
			this.mWeapon2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWeaponTip/mWeapon2') as mw.TextBlock
		}
		return this.mWeapon2_Internal
	}
	private mWeaponIcon_Internal: mw.Image
	public get mWeaponIcon(): mw.Image {
		if(!this.mWeaponIcon_Internal&&this.uiWidgetBase) {
			this.mWeaponIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mWeaponTip/mWeaponIcon') as mw.Image
		}
		return this.mWeaponIcon_Internal
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
		
		this.initLanguage(this.mKillTip)
		
	
		this.initLanguage(this.mWeapon1)
		
	
		this.initLanguage(this.mTextBlock)
		
	
		this.initLanguage(this.mWeapon2)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 