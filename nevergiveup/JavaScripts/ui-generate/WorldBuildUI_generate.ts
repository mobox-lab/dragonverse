
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/WorldBuildUI.ui')
export default class WorldBuildUI_Generate extends UIScript {
		private canvasFight_Internal: mw.Canvas
	public get canvasFight(): mw.Canvas {
		if(!this.canvasFight_Internal&&this.uiWidgetBase) {
			this.canvasFight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasFight') as mw.Canvas
		}
		return this.canvasFight_Internal
	}
	private imgFight_Internal: mw.Image
	public get imgFight(): mw.Image {
		if(!this.imgFight_Internal&&this.uiWidgetBase) {
			this.imgFight_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvasFight/imgFight') as mw.Image
		}
		return this.imgFight_Internal
	}
	private playingCanvas_Internal: mw.Canvas
	public get playingCanvas(): mw.Canvas {
		if(!this.playingCanvas_Internal&&this.uiWidgetBase) {
			this.playingCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas') as mw.Canvas
		}
		return this.playingCanvas_Internal
	}
	private textDifficultly_Internal: mw.TextBlock
	public get textDifficultly(): mw.TextBlock {
		if(!this.textDifficultly_Internal&&this.uiWidgetBase) {
			this.textDifficultly_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/textDifficultly') as mw.TextBlock
		}
		return this.textDifficultly_Internal
	}
	private imgDifficultyImg_Internal: mw.Image
	public get imgDifficultyImg(): mw.Image {
		if(!this.imgDifficultyImg_Internal&&this.uiWidgetBase) {
			this.imgDifficultyImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/imgDifficultyImg') as mw.Image
		}
		return this.imgDifficultyImg_Internal
	}
	private imgSelected_Internal: mw.Image
	public get imgSelected(): mw.Image {
		if(!this.imgSelected_Internal&&this.uiWidgetBase) {
			this.imgSelected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/imgSelected') as mw.Image
		}
		return this.imgSelected_Internal
	}
	private textBuild_Internal: mw.TextBlock
	public get textBuild(): mw.TextBlock {
		if(!this.textBuild_Internal&&this.uiWidgetBase) {
			this.textBuild_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/textBuild') as mw.TextBlock
		}
		return this.textBuild_Internal
	}
	private textStatus_Internal: mw.TextBlock
	public get textStatus(): mw.TextBlock {
		if(!this.textStatus_Internal&&this.uiWidgetBase) {
			this.textStatus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/textStatus') as mw.TextBlock
		}
		return this.textStatus_Internal
	}
	private canvasBuildItem_Internal: mw.Canvas
	public get canvasBuildItem(): mw.Canvas {
		if(!this.canvasBuildItem_Internal&&this.uiWidgetBase) {
			this.canvasBuildItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/canvasBuildItem') as mw.Canvas
		}
		return this.canvasBuildItem_Internal
	}
	private canvasPlayerInfo_Internal: mw.Canvas
	public get canvasPlayerInfo(): mw.Canvas {
		if(!this.canvasPlayerInfo_Internal&&this.uiWidgetBase) {
			this.canvasPlayerInfo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/canvasPlayerInfo') as mw.Canvas
		}
		return this.canvasPlayerInfo_Internal
	}
	private textName_Internal: mw.TextBlock
	public get textName(): mw.TextBlock {
		if(!this.textName_Internal&&this.uiWidgetBase) {
			this.textName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/canvasPlayerInfo/textName') as mw.TextBlock
		}
		return this.textName_Internal
	}
	private textPlayerName_Internal: mw.TextBlock
	public get textPlayerName(): mw.TextBlock {
		if(!this.textPlayerName_Internal&&this.uiWidgetBase) {
			this.textPlayerName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/canvasPlayerInfo/textPlayerName') as mw.TextBlock
		}
		return this.textPlayerName_Internal
	}
	private imgLvBg_Internal: mw.Image
	public get imgLvBg(): mw.Image {
		if(!this.imgLvBg_Internal&&this.uiWidgetBase) {
			this.imgLvBg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/canvasPlayerInfo/imgLvBg') as mw.Image
		}
		return this.imgLvBg_Internal
	}
	private textLv_Internal: mw.TextBlock
	public get textLv(): mw.TextBlock {
		if(!this.textLv_Internal&&this.uiWidgetBase) {
			this.textLv_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/playingCanvas/canvasPlayerInfo/imgLvBg/textLv') as mw.TextBlock
		}
		return this.textLv_Internal
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
	   
	   this.initLanguage(this.textDifficultly)
	   
	
	   this.initLanguage(this.textBuild)
	   
	
	   this.initLanguage(this.textStatus)
	   
	
	   this.initLanguage(this.textName)
	   
	
	   this.initLanguage(this.textPlayerName)
	   
	
	   this.initLanguage(this.textLv)
	   
	
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
