
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/hud/HUDpetGift.ui')
export default class HUDpetGift_Generate extends UIScript {
		private mCanvas_Pet_Internal: mw.Canvas
	public get mCanvas_Pet(): mw.Canvas {
		if(!this.mCanvas_Pet_Internal&&this.uiWidgetBase) {
			this.mCanvas_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet') as mw.Canvas
		}
		return this.mCanvas_Pet_Internal
	}
	private mBtn_Pet_Internal: mw.Button
	public get mBtn_Pet(): mw.Button {
		if(!this.mBtn_Pet_Internal&&this.uiWidgetBase) {
			this.mBtn_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet/mBtn_Pet') as mw.Button
		}
		return this.mBtn_Pet_Internal
	}
	private mText_Pet_Internal: mw.TextBlock
	public get mText_Pet(): mw.TextBlock {
		if(!this.mText_Pet_Internal&&this.uiWidgetBase) {
			this.mText_Pet_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet/mBtn_Pet/mText_Pet') as mw.TextBlock
		}
		return this.mText_Pet_Internal
	}
	private mCanvas_Point_Internal: mw.Canvas
	public get mCanvas_Point(): mw.Canvas {
		if(!this.mCanvas_Point_Internal&&this.uiWidgetBase) {
			this.mCanvas_Point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet/mCanvas_Point') as mw.Canvas
		}
		return this.mCanvas_Point_Internal
	}
	private mText_Point_Internal: mw.TextBlock
	public get mText_Point(): mw.TextBlock {
		if(!this.mText_Point_Internal&&this.uiWidgetBase) {
			this.mText_Point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Pet/mCanvas_Point/mText_Point') as mw.TextBlock
		}
		return this.mText_Point_Internal
	}
	private mCanvas_Gift_Internal: mw.Canvas
	public get mCanvas_Gift(): mw.Canvas {
		if(!this.mCanvas_Gift_Internal&&this.uiWidgetBase) {
			this.mCanvas_Gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gift') as mw.Canvas
		}
		return this.mCanvas_Gift_Internal
	}
	private mBtn_Gift_Internal: mw.Button
	public get mBtn_Gift(): mw.Button {
		if(!this.mBtn_Gift_Internal&&this.uiWidgetBase) {
			this.mBtn_Gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gift/mBtn_Gift') as mw.Button
		}
		return this.mBtn_Gift_Internal
	}
	private mMaskPrograss_Gift_Internal: mw.MaskButton
	public get mMaskPrograss_Gift(): mw.MaskButton {
		if(!this.mMaskPrograss_Gift_Internal&&this.uiWidgetBase) {
			this.mMaskPrograss_Gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gift/mMaskPrograss_Gift') as mw.MaskButton
		}
		return this.mMaskPrograss_Gift_Internal
	}
	private mText_Gift_Internal: mw.TextBlock
	public get mText_Gift(): mw.TextBlock {
		if(!this.mText_Gift_Internal&&this.uiWidgetBase) {
			this.mText_Gift_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Gift/mText_Gift') as mw.TextBlock
		}
		return this.mText_Gift_Internal
	}
	private mCanvas_PetSelect_Internal: mw.Canvas
	public get mCanvas_PetSelect(): mw.Canvas {
		if(!this.mCanvas_PetSelect_Internal&&this.uiWidgetBase) {
			this.mCanvas_PetSelect_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect') as mw.Canvas
		}
		return this.mCanvas_PetSelect_Internal
	}
	private canvas_Pet1_Internal: mw.Canvas
	public get canvas_Pet1(): mw.Canvas {
		if(!this.canvas_Pet1_Internal&&this.uiWidgetBase) {
			this.canvas_Pet1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet1') as mw.Canvas
		}
		return this.canvas_Pet1_Internal
	}
	private btnPet1_Internal: mw.Button
	public get btnPet1(): mw.Button {
		if(!this.btnPet1_Internal&&this.uiWidgetBase) {
			this.btnPet1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet1/btnPet1') as mw.Button
		}
		return this.btnPet1_Internal
	}
	private imgPet1_Internal: mw.Image
	public get imgPet1(): mw.Image {
		if(!this.imgPet1_Internal&&this.uiWidgetBase) {
			this.imgPet1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet1/imgPet1') as mw.Image
		}
		return this.imgPet1_Internal
	}
	private imgAttack1_Internal: mw.Image
	public get imgAttack1(): mw.Image {
		if(!this.imgAttack1_Internal&&this.uiWidgetBase) {
			this.imgAttack1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet1/imgAttack1') as mw.Image
		}
		return this.imgAttack1_Internal
	}
	private canvas_Pet2_Internal: mw.Canvas
	public get canvas_Pet2(): mw.Canvas {
		if(!this.canvas_Pet2_Internal&&this.uiWidgetBase) {
			this.canvas_Pet2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet2') as mw.Canvas
		}
		return this.canvas_Pet2_Internal
	}
	private btnPet2_Internal: mw.Button
	public get btnPet2(): mw.Button {
		if(!this.btnPet2_Internal&&this.uiWidgetBase) {
			this.btnPet2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet2/btnPet2') as mw.Button
		}
		return this.btnPet2_Internal
	}
	private imgPet2_Internal: mw.Image
	public get imgPet2(): mw.Image {
		if(!this.imgPet2_Internal&&this.uiWidgetBase) {
			this.imgPet2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet2/imgPet2') as mw.Image
		}
		return this.imgPet2_Internal
	}
	private imgAttack2_Internal: mw.Image
	public get imgAttack2(): mw.Image {
		if(!this.imgAttack2_Internal&&this.uiWidgetBase) {
			this.imgAttack2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet2/imgAttack2') as mw.Image
		}
		return this.imgAttack2_Internal
	}
	private canvas_Pet3_Internal: mw.Canvas
	public get canvas_Pet3(): mw.Canvas {
		if(!this.canvas_Pet3_Internal&&this.uiWidgetBase) {
			this.canvas_Pet3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet3') as mw.Canvas
		}
		return this.canvas_Pet3_Internal
	}
	private btnPet3_Internal: mw.Button
	public get btnPet3(): mw.Button {
		if(!this.btnPet3_Internal&&this.uiWidgetBase) {
			this.btnPet3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet3/btnPet3') as mw.Button
		}
		return this.btnPet3_Internal
	}
	private imgPet3_Internal: mw.Image
	public get imgPet3(): mw.Image {
		if(!this.imgPet3_Internal&&this.uiWidgetBase) {
			this.imgPet3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet3/imgPet3') as mw.Image
		}
		return this.imgPet3_Internal
	}
	private imgAttack3_Internal: mw.Image
	public get imgAttack3(): mw.Image {
		if(!this.imgAttack3_Internal&&this.uiWidgetBase) {
			this.imgAttack3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet3/imgAttack3') as mw.Image
		}
		return this.imgAttack3_Internal
	}
	private canvas_Pet4_Internal: mw.Canvas
	public get canvas_Pet4(): mw.Canvas {
		if(!this.canvas_Pet4_Internal&&this.uiWidgetBase) {
			this.canvas_Pet4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet4') as mw.Canvas
		}
		return this.canvas_Pet4_Internal
	}
	private btnPet4_Internal: mw.Button
	public get btnPet4(): mw.Button {
		if(!this.btnPet4_Internal&&this.uiWidgetBase) {
			this.btnPet4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet4/btnPet4') as mw.Button
		}
		return this.btnPet4_Internal
	}
	private imgPet4_Internal: mw.Image
	public get imgPet4(): mw.Image {
		if(!this.imgPet4_Internal&&this.uiWidgetBase) {
			this.imgPet4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet4/imgPet4') as mw.Image
		}
		return this.imgPet4_Internal
	}
	private imgAttack4_Internal: mw.Image
	public get imgAttack4(): mw.Image {
		if(!this.imgAttack4_Internal&&this.uiWidgetBase) {
			this.imgAttack4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_PetSelect/canvas_Pet4/imgAttack4') as mw.Image
		}
		return this.imgAttack4_Internal
	}
	private petStateCanvas_Internal: mw.Canvas
	public get petStateCanvas(): mw.Canvas {
		if(!this.petStateCanvas_Internal&&this.uiWidgetBase) {
			this.petStateCanvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/ScrollBox/petStateCanvas') as mw.Canvas
		}
		return this.petStateCanvas_Internal
	}



	public showAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
	public hideAction: mw.Action1<mw.UIScript> = new mw.Action1<mw.UIScript>();
 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}

	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_Pet.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Pet");
		})
		this.mBtn_Pet.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Gift.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Gift");
		})
		this.mBtn_Gift.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnPet1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnPet1");
		})
		this.btnPet1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnPet2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnPet2");
		})
		this.btnPet2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnPet3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnPet3");
		})
		this.btnPet3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btnPet4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btnPet4");
		})
		this.btnPet4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Pet)
		
	
		this.initLanguage(this.mText_Point)
		
	
		this.initLanguage(this.mText_Gift)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }

	protected onShow(...params: any[]): void {};

    public show(...param): void {
		Event.dispatchToLocal("ShowUIAction_37", this);
		this.showAction.call(this);
		mw.UIService.showUI(this, this.layer, ...param);
	}

    public hide(): void {
		Event.dispatchToLocal("HideUIAction_37", this);
		this.hideAction.call(this);
		mw.UIService.hideUI(this);
	}
}
 