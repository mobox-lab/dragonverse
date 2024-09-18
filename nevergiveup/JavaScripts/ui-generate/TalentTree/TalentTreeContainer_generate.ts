
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/TalentTree/TalentTreeContainer.ui')
export default class TalentTreeContainer_Generate extends UIScript {
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
	private bg_title_Internal: mw.Image
	public get bg_title(): mw.Image {
		if(!this.bg_title_Internal&&this.uiWidgetBase) {
			this.bg_title_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/bg_title') as mw.Image
		}
		return this.bg_title_Internal
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
	private talentItemCanvas_Internal: mw.Canvas
	public get talentItemCanvas(): mw.Canvas {
		if(!this.talentItemCanvas_Internal&&this.uiWidgetBase) {
			this.talentItemCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvas_dec/talentItemCanvas') as mw.Canvas
		}
		return this.talentItemCanvas_Internal
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
	private canvasInfo_Internal: mw.Canvas
	public get canvasInfo(): mw.Canvas {
		if(!this.canvasInfo_Internal&&this.uiWidgetBase) {
			this.canvasInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo') as mw.Canvas
		}
		return this.canvasInfo_Internal
	}
	private infoTxtName_Internal: mw.TextBlock
	public get infoTxtName(): mw.TextBlock {
		if(!this.infoTxtName_Internal&&this.uiWidgetBase) {
			this.infoTxtName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/infoTxtName') as mw.TextBlock
		}
		return this.infoTxtName_Internal
	}
	private infoTxtDesc_Internal: mw.TextBlock
	public get infoTxtDesc(): mw.TextBlock {
		if(!this.infoTxtDesc_Internal&&this.uiWidgetBase) {
			this.infoTxtDesc_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/infoTxtDesc') as mw.TextBlock
		}
		return this.infoTxtDesc_Internal
	}
	private canvasNumber_Internal: mw.Canvas
	public get canvasNumber(): mw.Canvas {
		if(!this.canvasNumber_Internal&&this.uiWidgetBase) {
			this.canvasNumber_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber') as mw.Canvas
		}
		return this.canvasNumber_Internal
	}
	private infoLevel1_Internal: mw.TextBlock
	public get infoLevel1(): mw.TextBlock {
		if(!this.infoLevel1_Internal&&this.uiWidgetBase) {
			this.infoLevel1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/infoLevel1') as mw.TextBlock
		}
		return this.infoLevel1_Internal
	}
	private levelSlash1_Internal: mw.TextBlock
	public get levelSlash1(): mw.TextBlock {
		if(!this.levelSlash1_Internal&&this.uiWidgetBase) {
			this.levelSlash1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/levelSlash1') as mw.TextBlock
		}
		return this.levelSlash1_Internal
	}
	private infoLevel2_Internal: mw.TextBlock
	public get infoLevel2(): mw.TextBlock {
		if(!this.infoLevel2_Internal&&this.uiWidgetBase) {
			this.infoLevel2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/infoLevel2') as mw.TextBlock
		}
		return this.infoLevel2_Internal
	}
	private levelSlash2_Internal: mw.TextBlock
	public get levelSlash2(): mw.TextBlock {
		if(!this.levelSlash2_Internal&&this.uiWidgetBase) {
			this.levelSlash2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/levelSlash2') as mw.TextBlock
		}
		return this.levelSlash2_Internal
	}
	private infoLevel3_Internal: mw.TextBlock
	public get infoLevel3(): mw.TextBlock {
		if(!this.infoLevel3_Internal&&this.uiWidgetBase) {
			this.infoLevel3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/infoLevel3') as mw.TextBlock
		}
		return this.infoLevel3_Internal
	}
	private levelSlash3_Internal: mw.TextBlock
	public get levelSlash3(): mw.TextBlock {
		if(!this.levelSlash3_Internal&&this.uiWidgetBase) {
			this.levelSlash3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/levelSlash3') as mw.TextBlock
		}
		return this.levelSlash3_Internal
	}
	private infoLevel4_Internal: mw.TextBlock
	public get infoLevel4(): mw.TextBlock {
		if(!this.infoLevel4_Internal&&this.uiWidgetBase) {
			this.infoLevel4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/infoLevel4') as mw.TextBlock
		}
		return this.infoLevel4_Internal
	}
	private levelSlash4_Internal: mw.TextBlock
	public get levelSlash4(): mw.TextBlock {
		if(!this.levelSlash4_Internal&&this.uiWidgetBase) {
			this.levelSlash4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/levelSlash4') as mw.TextBlock
		}
		return this.levelSlash4_Internal
	}
	private infoLevel5_Internal: mw.TextBlock
	public get infoLevel5(): mw.TextBlock {
		if(!this.infoLevel5_Internal&&this.uiWidgetBase) {
			this.infoLevel5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/canvasInfo/canvasNumber/infoLevel5') as mw.TextBlock
		}
		return this.infoLevel5_Internal
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
	private txtUnlocked_Internal: mw.TextBlock
	public get txtUnlocked(): mw.TextBlock {
		if(!this.txtUnlocked_Internal&&this.uiWidgetBase) {
			this.txtUnlocked_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/txtUnlocked') as mw.TextBlock
		}
		return this.txtUnlocked_Internal
	}
	private imgUpgradeBg_Internal: mw.Image
	public get imgUpgradeBg(): mw.Image {
		if(!this.imgUpgradeBg_Internal&&this.uiWidgetBase) {
			this.imgUpgradeBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/imgUpgradeBg') as mw.Image
		}
		return this.imgUpgradeBg_Internal
	}
	private infoBtn_Internal: mw.StaleButton
	public get infoBtn(): mw.StaleButton {
		if(!this.infoBtn_Internal&&this.uiWidgetBase) {
			this.infoBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/infoBtn') as mw.StaleButton
		}
		return this.infoBtn_Internal
	}
	private goldTxt_1_Internal: mw.TextBlock
	public get goldTxt_1(): mw.TextBlock {
		if(!this.goldTxt_1_Internal&&this.uiWidgetBase) {
			this.goldTxt_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/goldTxt_1') as mw.TextBlock
		}
		return this.goldTxt_1_Internal
	}
	private techPointTxt_1_Internal: mw.TextBlock
	public get techPointTxt_1(): mw.TextBlock {
		if(!this.techPointTxt_1_Internal&&this.uiWidgetBase) {
			this.techPointTxt_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/infoCanvas/techPointTxt_1') as mw.TextBlock
		}
		return this.techPointTxt_1_Internal
	}
	private talentCanvas_Internal: mw.Canvas
	public get talentCanvas(): mw.Canvas {
		if(!this.talentCanvas_Internal&&this.uiWidgetBase) {
			this.talentCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/talentCanvas') as mw.Canvas
		}
		return this.talentCanvas_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/talentCanvas/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private talentTreeCanvas_Internal: mw.Canvas
	public get talentTreeCanvas(): mw.Canvas {
		if(!this.talentTreeCanvas_Internal&&this.uiWidgetBase) {
			this.talentTreeCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/Canvas/talentCanvas/mScrollBox/talentTreeCanvas') as mw.Canvas
		}
		return this.talentTreeCanvas_Internal
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
	   
	
	   this.initLanguage(this.infoTxtName)
	   
	
	   this.initLanguage(this.infoTxtDesc)
	   
	
	   this.initLanguage(this.infoLevel1)
	   
	
	   this.initLanguage(this.levelSlash1)
	   
	
	   this.initLanguage(this.infoLevel2)
	   
	
	   this.initLanguage(this.levelSlash2)
	   
	
	   this.initLanguage(this.infoLevel3)
	   
	
	   this.initLanguage(this.levelSlash3)
	   
	
	   this.initLanguage(this.infoLevel4)
	   
	
	   this.initLanguage(this.levelSlash4)
	   
	
	   this.initLanguage(this.infoLevel5)
	   
	
	   this.initLanguage(this.txtUnlocked)
	   
	
	   this.initLanguage(this.goldTxt_1)
	   
	
	   this.initLanguage(this.techPointTxt_1)
	   
	
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
