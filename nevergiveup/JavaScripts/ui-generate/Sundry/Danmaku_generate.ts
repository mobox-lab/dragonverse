﻿
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/Sundry/Danmaku.ui')
export default class Danmaku_Generate extends UIScript {
		private mMainCanvas_Internal: mw.Canvas
	public get mMainCanvas(): mw.Canvas {
		if(!this.mMainCanvas_Internal&&this.uiWidgetBase) {
			this.mMainCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas') as mw.Canvas
		}
		return this.mMainCanvas_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/Canvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mChat_Internal: mw.TextBlock
	public get mChat(): mw.TextBlock {
		if(!this.mChat_Internal&&this.uiWidgetBase) {
			this.mChat_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/Canvas/mChat') as mw.TextBlock
		}
		return this.mChat_Internal
	}
	private mEmojiContainer_Internal: mw.Canvas
	public get mEmojiContainer(): mw.Canvas {
		if(!this.mEmojiContainer_Internal&&this.uiWidgetBase) {
			this.mEmojiContainer_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/Canvas/mEmojiContainer') as mw.Canvas
		}
		return this.mEmojiContainer_Internal
	}
	private mEmoji_Internal: mw.Image
	public get mEmoji(): mw.Image {
		if(!this.mEmoji_Internal&&this.uiWidgetBase) {
			this.mEmoji_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mMainCanvas/Canvas/mEmojiContainer/mEmoji') as mw.Image
		}
		return this.mEmoji_Internal
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
	   
	   this.initLanguage(this.mName)
	   
	
	   this.initLanguage(this.mChat)
	   
	
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
