
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/HUD/MonsterSkillsItem.ui')
export default class MonsterSkillsItem_Generate extends UIScript {
		private textCanvas_Internal: mw.Canvas
	public get textCanvas(): mw.Canvas {
		if(!this.textCanvas_Internal&&this.uiWidgetBase) {
			this.textCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas') as mw.Canvas
		}
		return this.textCanvas_Internal
	}
	private bg_Internal: mw.Image
	public get bg(): mw.Image {
		if(!this.bg_Internal&&this.uiWidgetBase) {
			this.bg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas/bg') as mw.Image
		}
		return this.bg_Internal
	}
	private txt_skill_Internal: mw.TextBlock
	public get txt_skill(): mw.TextBlock {
		if(!this.txt_skill_Internal&&this.uiWidgetBase) {
			this.txt_skill_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/textCanvas/txt_skill') as mw.TextBlock
		}
		return this.txt_skill_Internal
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
	   
	   this.initLanguage(this.txt_skill)
	   
	
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
