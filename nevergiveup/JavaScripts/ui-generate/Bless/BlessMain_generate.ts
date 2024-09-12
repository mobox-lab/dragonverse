
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Bless/BlessMain.ui')
export default class BlessMain_Generate extends UIScript {
		private bgBtn_Internal: mw.Button
	public get bgBtn(): mw.Button {
		if(!this.bgBtn_Internal&&this.uiWidgetBase) {
			this.bgBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bgBtn') as mw.Button
		}
		return this.bgBtn_Internal
	}
	private mBtnClose_Internal: mw.Button
	public get mBtnClose(): mw.Button {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mBtnClose') as mw.Button
		}
		return this.mBtnClose_Internal
	}
	private bar_Light_Internal: mw.Canvas
	public get bar_Light(): mw.Canvas {
		if(!this.bar_Light_Internal&&this.uiWidgetBase) {
			this.bar_Light_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_Light') as mw.Canvas
		}
		return this.bar_Light_Internal
	}
	private scr_LightDragon_Internal: mw.ScrollBox
	public get scr_LightDragon(): mw.ScrollBox {
		if(!this.scr_LightDragon_Internal&&this.uiWidgetBase) {
			this.scr_LightDragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_LightDragon') as mw.ScrollBox
		}
		return this.scr_LightDragon_Internal
	}
	private can_Light_Internal: mw.Canvas
	public get can_Light(): mw.Canvas {
		if(!this.can_Light_Internal&&this.uiWidgetBase) {
			this.can_Light_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_LightDragon/can_Light') as mw.Canvas
		}
		return this.can_Light_Internal
	}
	private bar_Dark_Internal: mw.Canvas
	public get bar_Dark(): mw.Canvas {
		if(!this.bar_Dark_Internal&&this.uiWidgetBase) {
			this.bar_Dark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_Dark') as mw.Canvas
		}
		return this.bar_Dark_Internal
	}
	private scr_DarkDragon_Internal: mw.ScrollBox
	public get scr_DarkDragon(): mw.ScrollBox {
		if(!this.scr_DarkDragon_Internal&&this.uiWidgetBase) {
			this.scr_DarkDragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_DarkDragon') as mw.ScrollBox
		}
		return this.scr_DarkDragon_Internal
	}
	private can_Dark_Internal: mw.Canvas
	public get can_Dark(): mw.Canvas {
		if(!this.can_Dark_Internal&&this.uiWidgetBase) {
			this.can_Dark_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_DarkDragon/can_Dark') as mw.Canvas
		}
		return this.can_Dark_Internal
	}
	private bar_Water_Internal: mw.Canvas
	public get bar_Water(): mw.Canvas {
		if(!this.bar_Water_Internal&&this.uiWidgetBase) {
			this.bar_Water_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_Water') as mw.Canvas
		}
		return this.bar_Water_Internal
	}
	private scr_WaterDragon_Internal: mw.ScrollBox
	public get scr_WaterDragon(): mw.ScrollBox {
		if(!this.scr_WaterDragon_Internal&&this.uiWidgetBase) {
			this.scr_WaterDragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_WaterDragon') as mw.ScrollBox
		}
		return this.scr_WaterDragon_Internal
	}
	private can_Water_Internal: mw.Canvas
	public get can_Water(): mw.Canvas {
		if(!this.can_Water_Internal&&this.uiWidgetBase) {
			this.can_Water_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_WaterDragon/can_Water') as mw.Canvas
		}
		return this.can_Water_Internal
	}
	private bar_Fire_Internal: mw.Canvas
	public get bar_Fire(): mw.Canvas {
		if(!this.bar_Fire_Internal&&this.uiWidgetBase) {
			this.bar_Fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_Fire') as mw.Canvas
		}
		return this.bar_Fire_Internal
	}
	private scr_FireDragon_Internal: mw.ScrollBox
	public get scr_FireDragon(): mw.ScrollBox {
		if(!this.scr_FireDragon_Internal&&this.uiWidgetBase) {
			this.scr_FireDragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_FireDragon') as mw.ScrollBox
		}
		return this.scr_FireDragon_Internal
	}
	private can_Fire_Internal: mw.Canvas
	public get can_Fire(): mw.Canvas {
		if(!this.can_Fire_Internal&&this.uiWidgetBase) {
			this.can_Fire_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_FireDragon/can_Fire') as mw.Canvas
		}
		return this.can_Fire_Internal
	}
	private bar_Wood_Internal: mw.Canvas
	public get bar_Wood(): mw.Canvas {
		if(!this.bar_Wood_Internal&&this.uiWidgetBase) {
			this.bar_Wood_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_Wood') as mw.Canvas
		}
		return this.bar_Wood_Internal
	}
	private scr_WoodDragon_Internal: mw.ScrollBox
	public get scr_WoodDragon(): mw.ScrollBox {
		if(!this.scr_WoodDragon_Internal&&this.uiWidgetBase) {
			this.scr_WoodDragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_WoodDragon') as mw.ScrollBox
		}
		return this.scr_WoodDragon_Internal
	}
	private can_Wood_Internal: mw.Canvas
	public get can_Wood(): mw.Canvas {
		if(!this.can_Wood_Internal&&this.uiWidgetBase) {
			this.can_Wood_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_WoodDragon/can_Wood') as mw.Canvas
		}
		return this.can_Wood_Internal
	}
	private bar_Soil_Internal: mw.Canvas
	public get bar_Soil(): mw.Canvas {
		if(!this.bar_Soil_Internal&&this.uiWidgetBase) {
			this.bar_Soil_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/bar_Soil') as mw.Canvas
		}
		return this.bar_Soil_Internal
	}
	private scr_SoilDragon_Internal: mw.ScrollBox
	public get scr_SoilDragon(): mw.ScrollBox {
		if(!this.scr_SoilDragon_Internal&&this.uiWidgetBase) {
			this.scr_SoilDragon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_SoilDragon') as mw.ScrollBox
		}
		return this.scr_SoilDragon_Internal
	}
	private can_Soil_Internal: mw.Canvas
	public get can_Soil(): mw.Canvas {
		if(!this.can_Soil_Internal&&this.uiWidgetBase) {
			this.can_Soil_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/scr_SoilDragon/can_Soil') as mw.Canvas
		}
		return this.can_Soil_Internal
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
	   
	   this.bgBtn.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "bgBtn");
	   })
	   this.bgBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	
	   this.mBtnClose.onClicked.add(()=>{
		   Event.dispatchToLocal("PlayButtonClick", "mBtnClose");
	   })
	   this.mBtnClose.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
	   
	

	   //按钮多语言
	   
	   //文本多语言
	   
	   //文本多语言
	   
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextTitle") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextDesc") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextLight") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextDark") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextWater") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextFire") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextWood") as any);
	   
	
	   this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/TextEarth") as any);
	   
	

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
