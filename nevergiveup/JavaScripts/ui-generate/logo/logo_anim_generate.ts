
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/logo/logo_anim.ui')
export default class logo_anim_Generate extends UIScript {
		private maskImg_Internal: mw.Image
	public get maskImg(): mw.Image {
		if(!this.maskImg_Internal&&this.uiWidgetBase) {
			this.maskImg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/maskImg') as mw.Image
		}
		return this.maskImg_Internal
	}
	private can_logo_Internal: mw.Canvas
	public get can_logo(): mw.Canvas {
		if(!this.can_logo_Internal&&this.uiWidgetBase) {
			this.can_logo_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo') as mw.Canvas
		}
		return this.can_logo_Internal
	}
	private flip_anim12_Internal: mw.FlipBook
	public get flip_anim12(): mw.FlipBook {
		if(!this.flip_anim12_Internal&&this.uiWidgetBase) {
			this.flip_anim12_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim12') as mw.FlipBook
		}
		return this.flip_anim12_Internal
	}
	private flip_anim11_Internal: mw.FlipBook
	public get flip_anim11(): mw.FlipBook {
		if(!this.flip_anim11_Internal&&this.uiWidgetBase) {
			this.flip_anim11_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim11') as mw.FlipBook
		}
		return this.flip_anim11_Internal
	}
	private flip_anim10_Internal: mw.FlipBook
	public get flip_anim10(): mw.FlipBook {
		if(!this.flip_anim10_Internal&&this.uiWidgetBase) {
			this.flip_anim10_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim10') as mw.FlipBook
		}
		return this.flip_anim10_Internal
	}
	private flip_anim9_Internal: mw.FlipBook
	public get flip_anim9(): mw.FlipBook {
		if(!this.flip_anim9_Internal&&this.uiWidgetBase) {
			this.flip_anim9_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim9') as mw.FlipBook
		}
		return this.flip_anim9_Internal
	}
	private flip_anim8_Internal: mw.FlipBook
	public get flip_anim8(): mw.FlipBook {
		if(!this.flip_anim8_Internal&&this.uiWidgetBase) {
			this.flip_anim8_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim8') as mw.FlipBook
		}
		return this.flip_anim8_Internal
	}
	private flip_anim7_Internal: mw.FlipBook
	public get flip_anim7(): mw.FlipBook {
		if(!this.flip_anim7_Internal&&this.uiWidgetBase) {
			this.flip_anim7_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim7') as mw.FlipBook
		}
		return this.flip_anim7_Internal
	}
	private flip_anim6_Internal: mw.FlipBook
	public get flip_anim6(): mw.FlipBook {
		if(!this.flip_anim6_Internal&&this.uiWidgetBase) {
			this.flip_anim6_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim6') as mw.FlipBook
		}
		return this.flip_anim6_Internal
	}
	private flip_anim5_Internal: mw.FlipBook
	public get flip_anim5(): mw.FlipBook {
		if(!this.flip_anim5_Internal&&this.uiWidgetBase) {
			this.flip_anim5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim5') as mw.FlipBook
		}
		return this.flip_anim5_Internal
	}
	private flip_anim4_Internal: mw.FlipBook
	public get flip_anim4(): mw.FlipBook {
		if(!this.flip_anim4_Internal&&this.uiWidgetBase) {
			this.flip_anim4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim4') as mw.FlipBook
		}
		return this.flip_anim4_Internal
	}
	private flip_anim3_Internal: mw.FlipBook
	public get flip_anim3(): mw.FlipBook {
		if(!this.flip_anim3_Internal&&this.uiWidgetBase) {
			this.flip_anim3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim3') as mw.FlipBook
		}
		return this.flip_anim3_Internal
	}
	private flip_anim2_Internal: mw.FlipBook
	public get flip_anim2(): mw.FlipBook {
		if(!this.flip_anim2_Internal&&this.uiWidgetBase) {
			this.flip_anim2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim2') as mw.FlipBook
		}
		return this.flip_anim2_Internal
	}
	private flip_anim1_Internal: mw.FlipBook
	public get flip_anim1(): mw.FlipBook {
		if(!this.flip_anim1_Internal&&this.uiWidgetBase) {
			this.flip_anim1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/can_logo/flip_anim1') as mw.FlipBook
		}
		return this.flip_anim1_Internal
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
