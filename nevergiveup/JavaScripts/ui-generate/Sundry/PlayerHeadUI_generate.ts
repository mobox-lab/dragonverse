
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/PlayerHeadUI.ui')
export default class PlayerHeadUI_Generate extends UIScript {
		private image_Internal: mw.Image
	public get image(): mw.Image {
		if(!this.image_Internal&&this.uiWidgetBase) {
			this.image_Internal = this.uiWidgetBase.findChildByPath('Background/image') as mw.Image
		}
		return this.image_Internal
	}
	private title_Internal: mw.TextBlock
	public get title(): mw.TextBlock {
		if(!this.title_Internal&&this.uiWidgetBase) {
			this.title_Internal = this.uiWidgetBase.findChildByPath('Background/title') as mw.TextBlock
		}
		return this.title_Internal
	}
	private bgName_Internal: mw.Image
	public get bgName(): mw.Image {
		if(!this.bgName_Internal&&this.uiWidgetBase) {
			this.bgName_Internal = this.uiWidgetBase.findChildByPath('Background/bgName') as mw.Image
		}
		return this.bgName_Internal
	}
	private image_1_Internal: mw.Image
	public get image_1(): mw.Image {
		if(!this.image_1_Internal&&this.uiWidgetBase) {
			this.image_1_Internal = this.uiWidgetBase.findChildByPath('Background/image_1') as mw.Image
		}
		return this.image_1_Internal
	}
	private playerLevel_Internal: mw.TextBlock
	public get playerLevel(): mw.TextBlock {
		if(!this.playerLevel_Internal&&this.uiWidgetBase) {
			this.playerLevel_Internal = this.uiWidgetBase.findChildByPath('Background/playerLevel') as mw.TextBlock
		}
		return this.playerLevel_Internal
	}
	private playerName_Internal: mw.TextBlock
	public get playerName(): mw.TextBlock {
		if(!this.playerName_Internal&&this.uiWidgetBase) {
			this.playerName_Internal = this.uiWidgetBase.findChildByPath('Background/playerName') as mw.TextBlock
		}
		return this.playerName_Internal
	}
	private subTitle_Internal: mw.TextBlock
	public get subTitle(): mw.TextBlock {
		if(!this.subTitle_Internal&&this.uiWidgetBase) {
			this.subTitle_Internal = this.uiWidgetBase.findChildByPath('Background/subTitle') as mw.TextBlock
		}
		return this.subTitle_Internal
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
	   
	
	   this.initLanguage(this.playerLevel)
	   
	
	   this.initLanguage(this.playerName)
	   
	
	   this.initLanguage(this.subTitle)
	   
	
	   //文本多语言
	   

   }
   private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
	   let call = UIScript.getBehavior("lan");
	   if (call && ui) {
		   call(ui);
	   }
   }
   protected onShow(...params: any[]): void {};

   public show(...param): void {
	   UIService.showUI(this, this.layer, ...param);
   }

   public hide(): void {
	   UIService.hideUI(this);
   }
}
