
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Tower/TowerShopUI.ui')
export default class TowerShopUI_Generate extends UIScript {
		private bgBtn_Internal: mw.Button
	public get bgBtn(): mw.Button {
		if(!this.bgBtn_Internal&&this.uiWidgetBase) {
			this.bgBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bgBtn') as mw.Button
		}
		return this.bgBtn_Internal
	}
	private closeBtn_Internal: mw.Button
	public get closeBtn(): mw.Button {
		if(!this.closeBtn_Internal&&this.uiWidgetBase) {
			this.closeBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/closeBtn') as mw.Button
		}
		return this.closeBtn_Internal
	}
	private img_fakeEsc_Internal: mw.Image
	public get img_fakeEsc(): mw.Image {
		if(!this.img_fakeEsc_Internal&&this.uiWidgetBase) {
			this.img_fakeEsc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_fakeEsc') as mw.Image
		}
		return this.img_fakeEsc_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private img_dec1_Internal: mw.Image
	public get img_dec1(): mw.Image {
		if(!this.img_dec1_Internal&&this.uiWidgetBase) {
			this.img_dec1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_dec1') as mw.Image
		}
		return this.img_dec1_Internal
	}
	private img_lilbg2_Internal: mw.Image
	public get img_lilbg2(): mw.Image {
		if(!this.img_lilbg2_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_lilbg2') as mw.Image
		}
		return this.img_lilbg2_Internal
	}
	private towerCanvas_Internal: mw.Canvas
	public get towerCanvas(): mw.Canvas {
		if(!this.towerCanvas_Internal&&this.uiWidgetBase) {
			this.towerCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/towerCanvas') as mw.Canvas
		}
		return this.towerCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/towerCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private towerItemCanvas_Internal: mw.Canvas
	public get towerItemCanvas(): mw.Canvas {
		if(!this.towerItemCanvas_Internal&&this.uiWidgetBase) {
			this.towerItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/towerCanvas/mScrollBox/towerItemCanvas') as mw.Canvas
		}
		return this.towerItemCanvas_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private img_backg_Internal: mw.Image
	public get img_backg(): mw.Image {
		if(!this.img_backg_Internal&&this.uiWidgetBase) {
			this.img_backg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/img_backg') as mw.Image
		}
		return this.img_backg_Internal
	}
	private infoImg_Internal: mw.Image
	public get infoImg(): mw.Image {
		if(!this.infoImg_Internal&&this.uiWidgetBase) {
			this.infoImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoImg') as mw.Image
		}
		return this.infoImg_Internal
	}
	private infoTxt_Internal: mw.TextBlock
	public get infoTxt(): mw.TextBlock {
		if(!this.infoTxt_Internal&&this.uiWidgetBase) {
			this.infoTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoTxt') as mw.TextBlock
		}
		return this.infoTxt_Internal
	}
	private canvas_tag_Internal: mw.Canvas
	public get canvas_tag(): mw.Canvas {
		if(!this.canvas_tag_Internal&&this.uiWidgetBase) {
			this.canvas_tag_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_tag') as mw.Canvas
		}
		return this.canvas_tag_Internal
	}
	private tagScrollBox_Internal: mw.ScrollBox
	public get tagScrollBox(): mw.ScrollBox {
		if(!this.tagScrollBox_Internal&&this.uiWidgetBase) {
			this.tagScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_tag/tagScrollBox') as mw.ScrollBox
		}
		return this.tagScrollBox_Internal
	}
	private tagCanvas_Internal: mw.Canvas
	public get tagCanvas(): mw.Canvas {
		if(!this.tagCanvas_Internal&&this.uiWidgetBase) {
			this.tagCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_tag/tagScrollBox/tagCanvas') as mw.Canvas
		}
		return this.tagCanvas_Internal
	}
	private img_lilbg3_Internal: mw.Image
	public get img_lilbg3(): mw.Image {
		if(!this.img_lilbg3_Internal&&this.uiWidgetBase) {
			this.img_lilbg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/img_lilbg3') as mw.Image
		}
		return this.img_lilbg3_Internal
	}
	private infoScrollCanvas_Internal: mw.Canvas
	public get infoScrollCanvas(): mw.Canvas {
		if(!this.infoScrollCanvas_Internal&&this.uiWidgetBase) {
			this.infoScrollCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoScrollCanvas') as mw.Canvas
		}
		return this.infoScrollCanvas_Internal
	}
	private infoItemCanvas_Internal: mw.Canvas
	public get infoItemCanvas(): mw.Canvas {
		if(!this.infoItemCanvas_Internal&&this.uiWidgetBase) {
			this.infoItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoScrollCanvas/ScrollBox/infoItemCanvas') as mw.Canvas
		}
		return this.infoItemCanvas_Internal
	}
	private infoBtn_Internal: mw.StaleButton
	public get infoBtn(): mw.StaleButton {
		if(!this.infoBtn_Internal&&this.uiWidgetBase) {
			this.infoBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoBtn') as mw.StaleButton
		}
		return this.infoBtn_Internal
	}



   protected onAwake() {
	   //设置能否每帧触发onUpdate
	   this.canUpdate = false;
	   this.layer = mw.UILayerBottom;
	   this.initButtons();
   }
   protected initButtons() {
	   //按钮添加点击
	   
	   this.infoBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "infoBtn");
	   })
	   this.initLanguage(this.infoBtn);
	   this.infoBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   //按钮添加点击
	   
	   this.bgBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "bgBtn");
	   })
	   this.bgBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.closeBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "closeBtn");
	   })
	   this.closeBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.txt_title)
	   
	
	   this.initLanguage(this.infoTxt)
	   
	
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
