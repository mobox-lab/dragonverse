
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/TechTree/TechTreeContainer.ui')
export default class TechTreeContainer_Generate extends UIScript {
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
	private img_dec1_Internal: mw.Image
	public get img_dec1(): mw.Image {
		if(!this.img_dec1_Internal&&this.uiWidgetBase) {
			this.img_dec1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/img_dec1') as mw.Image
		}
		return this.img_dec1_Internal
	}
	private txt_title_Internal: mw.TextBlock
	public get txt_title(): mw.TextBlock {
		if(!this.txt_title_Internal&&this.uiWidgetBase) {
			this.txt_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/txt_title') as mw.TextBlock
		}
		return this.txt_title_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private img_lilbg2_Internal: mw.Image
	public get img_lilbg2(): mw.Image {
		if(!this.img_lilbg2_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/img_lilbg2') as mw.Image
		}
		return this.img_lilbg2_Internal
	}
	private img_lilbg2_1_Internal: mw.Image
	public get img_lilbg2_1(): mw.Image {
		if(!this.img_lilbg2_1_Internal&&this.uiWidgetBase) {
			this.img_lilbg2_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/img_lilbg2_1') as mw.Image
		}
		return this.img_lilbg2_1_Internal
	}
	private canvas_dec_Internal: mw.Canvas
	public get canvas_dec(): mw.Canvas {
		if(!this.canvas_dec_Internal&&this.uiWidgetBase) {
			this.canvas_dec_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_dec') as mw.Canvas
		}
		return this.canvas_dec_Internal
	}
	private nmTextBlock_Internal: mw.TextBlock
	public get nmTextBlock(): mw.TextBlock {
		if(!this.nmTextBlock_Internal&&this.uiWidgetBase) {
			this.nmTextBlock_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_dec/nmTextBlock') as mw.TextBlock
		}
		return this.nmTextBlock_Internal
	}
	private qwerTextBlock_1_Internal: mw.TextBlock
	public get qwerTextBlock_1(): mw.TextBlock {
		if(!this.qwerTextBlock_1_Internal&&this.uiWidgetBase) {
			this.qwerTextBlock_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_dec/qwerTextBlock_1') as mw.TextBlock
		}
		return this.qwerTextBlock_1_Internal
	}
	private infoTxtArea_Internal: mw.TextBlock
	public get infoTxtArea(): mw.TextBlock {
		if(!this.infoTxtArea_Internal&&this.uiWidgetBase) {
			this.infoTxtArea_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_dec/infoTxtArea') as mw.TextBlock
		}
		return this.infoTxtArea_Internal
	}
	private infoTxt_Internal: mw.TextBlock
	public get infoTxt(): mw.TextBlock {
		if(!this.infoTxt_Internal&&this.uiWidgetBase) {
			this.infoTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoTxt') as mw.TextBlock
		}
		return this.infoTxt_Internal
	}
	private infoTxtDesc_Internal: mw.TextBlock
	public get infoTxtDesc(): mw.TextBlock {
		if(!this.infoTxtDesc_Internal&&this.uiWidgetBase) {
			this.infoTxtDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoTxtDesc') as mw.TextBlock
		}
		return this.infoTxtDesc_Internal
	}
	private mRequiredContainer_Internal: mw.Canvas
	public get mRequiredContainer(): mw.Canvas {
		if(!this.mRequiredContainer_Internal&&this.uiWidgetBase) {
			this.mRequiredContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/mRequiredContainer') as mw.Canvas
		}
		return this.mRequiredContainer_Internal
	}
	private mRequired_Internal: mw.Canvas
	public get mRequired(): mw.Canvas {
		if(!this.mRequired_Internal&&this.uiWidgetBase) {
			this.mRequired_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/mRequiredContainer/ScrollBox_1/mRequired') as mw.Canvas
		}
		return this.mRequired_Internal
	}
	private infoBtn_Internal: mw.StaleButton
	public get infoBtn(): mw.StaleButton {
		if(!this.infoBtn_Internal&&this.uiWidgetBase) {
			this.infoBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoBtn') as mw.StaleButton
		}
		return this.infoBtn_Internal
	}
	private txtUnlocked_Internal: mw.TextBlock
	public get txtUnlocked(): mw.TextBlock {
		if(!this.txtUnlocked_Internal&&this.uiWidgetBase) {
			this.txtUnlocked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/txtUnlocked') as mw.TextBlock
		}
		return this.txtUnlocked_Internal
	}
	private techCanvas_Internal: mw.Canvas
	public get techCanvas(): mw.Canvas {
		if(!this.techCanvas_Internal&&this.uiWidgetBase) {
			this.techCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/techCanvas') as mw.Canvas
		}
		return this.techCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/techCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private techItemCanvas_Internal: mw.Canvas
	public get techItemCanvas(): mw.Canvas {
		if(!this.techItemCanvas_Internal&&this.uiWidgetBase) {
			this.techItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/techCanvas/mScrollBox/techItemCanvas') as mw.Canvas
		}
		return this.techItemCanvas_Internal
	}
	private moneyCanvas_Internal: mw.Canvas
	public get moneyCanvas(): mw.Canvas {
		if(!this.moneyCanvas_Internal&&this.uiWidgetBase) {
			this.moneyCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas') as mw.Canvas
		}
		return this.moneyCanvas_Internal
	}
	private goldCanvas_Internal: mw.Canvas
	public get goldCanvas(): mw.Canvas {
		if(!this.goldCanvas_Internal&&this.uiWidgetBase) {
			this.goldCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/goldCanvas') as mw.Canvas
		}
		return this.goldCanvas_Internal
	}
	private goldTxt_Internal: mw.TextBlock
	public get goldTxt(): mw.TextBlock {
		if(!this.goldTxt_Internal&&this.uiWidgetBase) {
			this.goldTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/goldCanvas/goldTxt') as mw.TextBlock
		}
		return this.goldTxt_Internal
	}
	private techPointCanvas_Internal: mw.Canvas
	public get techPointCanvas(): mw.Canvas {
		if(!this.techPointCanvas_Internal&&this.uiWidgetBase) {
			this.techPointCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/techPointCanvas') as mw.Canvas
		}
		return this.techPointCanvas_Internal
	}
	private techPointTxt_Internal: mw.TextBlock
	public get techPointTxt(): mw.TextBlock {
		if(!this.techPointTxt_Internal&&this.uiWidgetBase) {
			this.techPointTxt_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/moneyCanvas/techPointCanvas/techPointTxt') as mw.TextBlock
		}
		return this.techPointTxt_Internal
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
	   
	
	   this.initLanguage(this.nmTextBlock)
	   
	
	   this.initLanguage(this.qwerTextBlock_1)
	   
	
	   this.initLanguage(this.infoTxtArea)
	   
	
	   this.initLanguage(this.infoTxt)
	   
	
	   this.initLanguage(this.infoTxtDesc)
	   
	
	   this.initLanguage(this.txtUnlocked)
	   
	
	   this.initLanguage(this.goldTxt)
	   
	
	   this.initLanguage(this.techPointTxt)
	   
	
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
