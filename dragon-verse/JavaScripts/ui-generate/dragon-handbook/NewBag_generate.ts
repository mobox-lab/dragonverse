/**
 * Auto generate by ui editor.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用

 * Template Author
 * @zewei.zhang
 * @LviatYi
 * @version 31.4.0
 * UI: UI/dragon-handbook/NewBag.ui
 */

import UIScript = mw.UIScript;


@UIBind('UI/dragon-handbook/NewBag.ui')
export default class NewBag_Generate extends UIScript {
	private imgMaskBg_Internal: mw.Image
	public get imgMaskBg(): mw.Image {
		if(!this.imgMaskBg_Internal&&this.uiWidgetBase) {
			this.imgMaskBg_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/imgMaskBg') as mw.Image
		}
		return this.imgMaskBg_Internal
	}
	private cnvTags_Internal: mw.Canvas
	public get cnvTags(): mw.Canvas {
		if(!this.cnvTags_Internal&&this.uiWidgetBase) {
			this.cnvTags_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags') as mw.Canvas
		}
		return this.cnvTags_Internal
	}
	private btn1_Internal: mw.StaleButton
	public get btn1(): mw.StaleButton {
		if(!this.btn1_Internal&&this.uiWidgetBase) {
			this.btn1_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn1') as mw.StaleButton
		}
		return this.btn1_Internal
	}
	private btn2_Internal: mw.StaleButton
	public get btn2(): mw.StaleButton {
		if(!this.btn2_Internal&&this.uiWidgetBase) {
			this.btn2_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn2') as mw.StaleButton
		}
		return this.btn2_Internal
	}
	private btn3_Internal: mw.StaleButton
	public get btn3(): mw.StaleButton {
		if(!this.btn3_Internal&&this.uiWidgetBase) {
			this.btn3_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn3') as mw.StaleButton
		}
		return this.btn3_Internal
	}
	private btn4_Internal: mw.StaleButton
	public get btn4(): mw.StaleButton {
		if(!this.btn4_Internal&&this.uiWidgetBase) {
			this.btn4_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn4') as mw.StaleButton
		}
		return this.btn4_Internal
	}
	private btn5_Internal: mw.StaleButton
	public get btn5(): mw.StaleButton {
		if(!this.btn5_Internal&&this.uiWidgetBase) {
			this.btn5_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/cnvTags/btn5') as mw.StaleButton
		}
		return this.btn5_Internal
	}
	private mScrollBox_Internal: mw.ScrollBox
	public get mScrollBox(): mw.ScrollBox {
		if(!this.mScrollBox_Internal&&this.uiWidgetBase) {
			this.mScrollBox_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox') as mw.ScrollBox
		}
		return this.mScrollBox_Internal
	}
	private mContent_Internal: mw.Canvas
	public get mContent(): mw.Canvas {
		if(!this.mContent_Internal&&this.uiWidgetBase) {
			this.mContent_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent') as mw.Canvas
		}
		return this.mContent_Internal
	}
	private scr_DarkDragon_Internal: mw.ScrollBox
	public get scr_DarkDragon(): mw.ScrollBox {
		if(!this.scr_DarkDragon_Internal&&this.uiWidgetBase) {
			this.scr_DarkDragon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_DarkDragon') as mw.ScrollBox
		}
		return this.scr_DarkDragon_Internal
	}
	private can_Dark_Internal: mw.Canvas
	public get can_Dark(): mw.Canvas {
		if(!this.can_Dark_Internal&&this.uiWidgetBase) {
			this.can_Dark_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_DarkDragon/can_Dark') as mw.Canvas
		}
		return this.can_Dark_Internal
	}
	private scr_WaterDragon_Internal: mw.ScrollBox
	public get scr_WaterDragon(): mw.ScrollBox {
		if(!this.scr_WaterDragon_Internal&&this.uiWidgetBase) {
			this.scr_WaterDragon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_WaterDragon') as mw.ScrollBox
		}
		return this.scr_WaterDragon_Internal
	}
	private can_Water_Internal: mw.Canvas
	public get can_Water(): mw.Canvas {
		if(!this.can_Water_Internal&&this.uiWidgetBase) {
			this.can_Water_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_WaterDragon/can_Water') as mw.Canvas
		}
		return this.can_Water_Internal
	}
	private scr_SoilDragon_Internal: mw.ScrollBox
	public get scr_SoilDragon(): mw.ScrollBox {
		if(!this.scr_SoilDragon_Internal&&this.uiWidgetBase) {
			this.scr_SoilDragon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_SoilDragon') as mw.ScrollBox
		}
		return this.scr_SoilDragon_Internal
	}
	private can_Soil_Internal: mw.Canvas
	public get can_Soil(): mw.Canvas {
		if(!this.can_Soil_Internal&&this.uiWidgetBase) {
			this.can_Soil_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_SoilDragon/can_Soil') as mw.Canvas
		}
		return this.can_Soil_Internal
	}
	private scr_FireDragon_Internal: mw.ScrollBox
	public get scr_FireDragon(): mw.ScrollBox {
		if(!this.scr_FireDragon_Internal&&this.uiWidgetBase) {
			this.scr_FireDragon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_FireDragon') as mw.ScrollBox
		}
		return this.scr_FireDragon_Internal
	}
	private can_Fire_Internal: mw.Canvas
	public get can_Fire(): mw.Canvas {
		if(!this.can_Fire_Internal&&this.uiWidgetBase) {
			this.can_Fire_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_FireDragon/can_Fire') as mw.Canvas
		}
		return this.can_Fire_Internal
	}
	private scr_WoodDragon_Internal: mw.ScrollBox
	public get scr_WoodDragon(): mw.ScrollBox {
		if(!this.scr_WoodDragon_Internal&&this.uiWidgetBase) {
			this.scr_WoodDragon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_WoodDragon') as mw.ScrollBox
		}
		return this.scr_WoodDragon_Internal
	}
	private can_Wood_Internal: mw.Canvas
	public get can_Wood(): mw.Canvas {
		if(!this.can_Wood_Internal&&this.uiWidgetBase) {
			this.can_Wood_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_WoodDragon/can_Wood') as mw.Canvas
		}
		return this.can_Wood_Internal
	}
	private scr_LightDragon_Internal: mw.ScrollBox
	public get scr_LightDragon(): mw.ScrollBox {
		if(!this.scr_LightDragon_Internal&&this.uiWidgetBase) {
			this.scr_LightDragon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_LightDragon') as mw.ScrollBox
		}
		return this.scr_LightDragon_Internal
	}
	private can_Light_Internal: mw.Canvas
	public get can_Light(): mw.Canvas {
		if(!this.can_Light_Internal&&this.uiWidgetBase) {
			this.can_Light_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/scr_LightDragon/can_Light') as mw.Canvas
		}
		return this.can_Light_Internal
	}
	private can_ElementIcon_Internal: mw.Canvas
	public get can_ElementIcon(): mw.Canvas {
		if(!this.can_ElementIcon_Internal&&this.uiWidgetBase) {
			this.can_ElementIcon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/can_ElementIcon') as mw.Canvas
		}
		return this.can_ElementIcon_Internal
	}
	private img_Water_Internal: mw.Image
	public get img_Water(): mw.Image {
		if(!this.img_Water_Internal&&this.uiWidgetBase) {
			this.img_Water_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/can_ElementIcon/img_Water') as mw.Image
		}
		return this.img_Water_Internal
	}
	private img_Dark_Internal: mw.Image
	public get img_Dark(): mw.Image {
		if(!this.img_Dark_Internal&&this.uiWidgetBase) {
			this.img_Dark_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/can_ElementIcon/img_Dark') as mw.Image
		}
		return this.img_Dark_Internal
	}
	private img_Soil_Internal: mw.Image
	public get img_Soil(): mw.Image {
		if(!this.img_Soil_Internal&&this.uiWidgetBase) {
			this.img_Soil_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/can_ElementIcon/img_Soil') as mw.Image
		}
		return this.img_Soil_Internal
	}
	private img_Fire_Internal: mw.Image
	public get img_Fire(): mw.Image {
		if(!this.img_Fire_Internal&&this.uiWidgetBase) {
			this.img_Fire_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/can_ElementIcon/img_Fire') as mw.Image
		}
		return this.img_Fire_Internal
	}
	private img_Wood_Internal: mw.Image
	public get img_Wood(): mw.Image {
		if(!this.img_Wood_Internal&&this.uiWidgetBase) {
			this.img_Wood_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/can_ElementIcon/img_Wood') as mw.Image
		}
		return this.img_Wood_Internal
	}
	private img_Light_Internal: mw.Image
	public get img_Light(): mw.Image {
		if(!this.img_Light_Internal&&this.uiWidgetBase) {
			this.img_Light_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mScrollBox/mContent/can_ElementIcon/img_Light') as mw.Image
		}
		return this.img_Light_Internal
	}
	private infoCanvas_Internal: mw.Canvas
	public get infoCanvas(): mw.Canvas {
		if(!this.infoCanvas_Internal&&this.uiWidgetBase) {
			this.infoCanvas_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas') as mw.Canvas
		}
		return this.infoCanvas_Internal
	}
	private mIcon_Internal: mw.Image
	public get mIcon(): mw.Image {
		if(!this.mIcon_Internal&&this.uiWidgetBase) {
			this.mIcon_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mIcon') as mw.Image
		}
		return this.mIcon_Internal
	}
	private mName_Internal: mw.TextBlock
	public get mName(): mw.TextBlock {
		if(!this.mName_Internal&&this.uiWidgetBase) {
			this.mName_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mName') as mw.TextBlock
		}
		return this.mName_Internal
	}
	private mNum_Internal: mw.TextBlock
	public get mNum(): mw.TextBlock {
		if(!this.mNum_Internal&&this.uiWidgetBase) {
			this.mNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mNum') as mw.TextBlock
		}
		return this.mNum_Internal
	}
	private mDescBack_Internal: mw.Image
	public get mDescBack(): mw.Image {
		if(!this.mDescBack_Internal&&this.uiWidgetBase) {
			this.mDescBack_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mDescBack') as mw.Image
		}
		return this.mDescBack_Internal
	}
	private mDesc_Internal: mw.TextBlock
	public get mDesc(): mw.TextBlock {
		if(!this.mDesc_Internal&&this.uiWidgetBase) {
			this.mDesc_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mDesc') as mw.TextBlock
		}
		return this.mDesc_Internal
	}
	private mBtnOpt_Internal: mw.StaleButton
	public get mBtnOpt(): mw.StaleButton {
		if(!this.mBtnOpt_Internal&&this.uiWidgetBase) {
			this.mBtnOpt_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/mBtnOpt') as mw.StaleButton
		}
		return this.mBtnOpt_Internal
	}
	private can_BallNum_Internal: mw.Canvas
	public get can_BallNum(): mw.Canvas {
		if(!this.can_BallNum_Internal&&this.uiWidgetBase) {
			this.can_BallNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/can_BallNum') as mw.Canvas
		}
		return this.can_BallNum_Internal
	}
	private img_BallNum_Internal: mw.Image
	public get img_BallNum(): mw.Image {
		if(!this.img_BallNum_Internal&&this.uiWidgetBase) {
			this.img_BallNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/can_BallNum/img_BallNum') as mw.Image
		}
		return this.img_BallNum_Internal
	}
	private img_DragonBall_Internal: mw.Image
	public get img_DragonBall(): mw.Image {
		if(!this.img_DragonBall_Internal&&this.uiWidgetBase) {
			this.img_DragonBall_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/can_BallNum/img_DragonBall') as mw.Image
		}
		return this.img_DragonBall_Internal
	}
	private text_BallNum_Internal: mw.TextBlock
	public get text_BallNum(): mw.TextBlock {
		if(!this.text_BallNum_Internal&&this.uiWidgetBase) {
			this.text_BallNum_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/infoCanvas/can_BallNum/text_BallNum') as mw.TextBlock
		}
		return this.text_BallNum_Internal
	}
	private mBtnClose_Internal: mw.StaleButton
	public get mBtnClose(): mw.StaleButton {
		if(!this.mBtnClose_Internal&&this.uiWidgetBase) {
			this.mBtnClose_Internal = this.uiWidgetBase.findChildByPath('MWCanvas_2147482460/mBtnClose') as mw.StaleButton
		}
		return this.mBtnClose_Internal
	}



	protected onStart() {
    }

	protected onAwake() {
        // 强制实现其 以规避 show 自作主张的使用 .layer 覆写 onShow 的默认参数导致的接口设计哲学不统一.
        this.layer = mw.UILayerMiddle;
        this.overrideTextSetter();
		this.initTextLan();
	}

    protected onUpdate(dt: number): void {
	}

	protected onShow(...args:unknown[]) {
	}

	protected onHide() {
	}

    protected onDestroy() {
        this.unregisterTextLan();
    }

    protected initTextLan() {
        // 文本按钮
        
        this.initLanguage(this.btn1);
        this.btn1.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn2);
        this.btn2.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn3);
        this.btn3.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn4);
        this.btn4.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.btn5);
        this.btn5.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.mBtnOpt);
        this.mBtnOpt.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        this.initLanguage(this.mBtnClose);
        this.mBtnClose.onClicked.add(() => Event.dispatchToLocal("__BUTTON_CLICKED__"));
        
	
        // 按钮
        
        // 未暴露的文本按钮
        
        // 文本控件
        
        this.initLanguage(this.mName)
        
	
        this.initLanguage(this.mNum)
        
	
        this.initLanguage(this.mDesc)
        
	
        this.initLanguage(this.text_BallNum)
        
	
        // 未暴露的文本控件
        
    }

    protected overrideTextSetter() {
        
        overrideTextBlockTextSetter(this.mName);
        
	
        overrideTextBlockTextSetter(this.mNum);
        
	
        overrideTextBlockTextSetter(this.mDesc);
        
	
        overrideTextBlockTextSetter(this.text_BallNum);
        
	
    }

    protected unregisterTextLan(){
        // 文本按钮多语言
        
        this.unregisterLanKey(this.btn1);
        
	
        this.unregisterLanKey(this.btn2);
        
	
        this.unregisterLanKey(this.btn3);
        
	
        this.unregisterLanKey(this.btn4);
        
	
        this.unregisterLanKey(this.btn5);
        
	
        this.unregisterLanKey(this.mBtnOpt);
        
	
        this.unregisterLanKey(this.mBtnClose);
        
	
        // 隐藏文本按钮多语言
        
        // 文本多语言
        
        this.unregisterLanKey(this.mName)
        
	
        this.unregisterLanKey(this.mNum)
        
	
        this.unregisterLanKey(this.mDesc)
        
	
        this.unregisterLanKey(this.text_BallNum)
        
	
        // 隐藏文本多语言
        
    }

    private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let lanFunc = mw.UIScript.getBehavior("lan");
        lanFunc?.(ui);
    }

    private unregisterLanKey(ui: mw.StaleButton | mw.TextBlock) {
        let unregisterFunc = mw.UIScript.getBehavior("unregister");
        unregisterFunc?.(ui);
    }
}

function findPropertyDescriptor(obj: unknown, prop: string): PropertyDescriptor | null {
    while (obj !== null) {
        let descriptor = Object.getOwnPropertyDescriptor(obj, prop);
        if (descriptor) {
            return descriptor;
        }
        obj = Object.getPrototypeOf(obj);
    }
    return null;
}

function overrideTextBlockTextSetter(textWidget: mw.TextBlock) {
    const originSetter = findPropertyDescriptor(textWidget, "text")?.set;
    if (!originSetter) return;
    Object.defineProperty(textWidget, "text", {
        set: function (value: string) {
            if (textWidget.text === value) return;
            originSetter.call(textWidget, value);
        },
        get: findPropertyDescriptor(textWidget, "text")?.get,
    });
}