
 

 @UIBind('UI/ShareUI/Diffi_UI.ui')
 export default class Diffi_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private btn_startgame_Internal: mw.StaleButton
	public get btn_startgame(): mw.StaleButton {
		if(!this.btn_startgame_Internal&&this.uiWidgetBase) {
			this.btn_startgame_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/btn_startgame') as mw.StaleButton
		}
		return this.btn_startgame_Internal
	}
	private img_lock0_Internal: mw.Image
	public get img_lock0(): mw.Image {
		if(!this.img_lock0_Internal&&this.uiWidgetBase) {
			this.img_lock0_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/img_lock0') as mw.Image
		}
		return this.img_lock0_Internal
	}
	private btn_diffiswitch_Internal: mw.StaleButton
	public get btn_diffiswitch(): mw.StaleButton {
		if(!this.btn_diffiswitch_Internal&&this.uiWidgetBase) {
			this.btn_diffiswitch_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/btn_diffiswitch') as mw.StaleButton
		}
		return this.btn_diffiswitch_Internal
	}
	private btn_rankinglist_Internal: mw.Button
	public get btn_rankinglist(): mw.Button {
		if(!this.btn_rankinglist_Internal&&this.uiWidgetBase) {
			this.btn_rankinglist_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/btn_rankinglist') as mw.Button
		}
		return this.btn_rankinglist_Internal
	}
	private text_rankinglist_Internal: mw.TextBlock
	public get text_rankinglist(): mw.TextBlock {
		if(!this.text_rankinglist_Internal&&this.uiWidgetBase) {
			this.text_rankinglist_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/text_rankinglist') as mw.TextBlock
		}
		return this.text_rankinglist_Internal
	}
	private text_passing_Internal: mw.TextBlock
	public get text_passing(): mw.TextBlock {
		if(!this.text_passing_Internal&&this.uiWidgetBase) {
			this.text_passing_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/text_passing') as mw.TextBlock
		}
		return this.text_passing_Internal
	}
	private text_passingnumber_Internal: mw.TextBlock
	public get text_passingnumber(): mw.TextBlock {
		if(!this.text_passingnumber_Internal&&this.uiWidgetBase) {
			this.text_passingnumber_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/text_passingnumber') as mw.TextBlock
		}
		return this.text_passingnumber_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private canvas_diffichoose_Internal: mw.Canvas
	public get canvas_diffichoose(): mw.Canvas {
		if(!this.canvas_diffichoose_Internal&&this.uiWidgetBase) {
			this.canvas_diffichoose_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose') as mw.Canvas
		}
		return this.canvas_diffichoose_Internal
	}
	private canvas_compass_Internal: mw.Canvas
	public get canvas_compass(): mw.Canvas {
		if(!this.canvas_compass_Internal&&this.uiWidgetBase) {
			this.canvas_compass_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass') as mw.Canvas
		}
		return this.canvas_compass_Internal
	}
	private img_compass_Internal: mw.Image
	public get img_compass(): mw.Image {
		if(!this.img_compass_Internal&&this.uiWidgetBase) {
			this.img_compass_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/img_compass') as mw.Image
		}
		return this.img_compass_Internal
	}
	private canvas_easy_Internal: mw.Canvas
	public get canvas_easy(): mw.Canvas {
		if(!this.canvas_easy_Internal&&this.uiWidgetBase) {
			this.canvas_easy_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_easy') as mw.Canvas
		}
		return this.canvas_easy_Internal
	}
	private btn_easy_Internal: mw.Button
	public get btn_easy(): mw.Button {
		if(!this.btn_easy_Internal&&this.uiWidgetBase) {
			this.btn_easy_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_easy/btn_easy') as mw.Button
		}
		return this.btn_easy_Internal
	}
	private txt_easy_Internal: mw.TextBlock
	public get txt_easy(): mw.TextBlock {
		if(!this.txt_easy_Internal&&this.uiWidgetBase) {
			this.txt_easy_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_easy/txt_easy') as mw.TextBlock
		}
		return this.txt_easy_Internal
	}
	private img_badge1_Internal: mw.Image
	public get img_badge1(): mw.Image {
		if(!this.img_badge1_Internal&&this.uiWidgetBase) {
			this.img_badge1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_easy/img_badge1') as mw.Image
		}
		return this.img_badge1_Internal
	}
	private canvas_normal_Internal: mw.Canvas
	public get canvas_normal(): mw.Canvas {
		if(!this.canvas_normal_Internal&&this.uiWidgetBase) {
			this.canvas_normal_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_normal') as mw.Canvas
		}
		return this.canvas_normal_Internal
	}
	private btn_normal_Internal: mw.Button
	public get btn_normal(): mw.Button {
		if(!this.btn_normal_Internal&&this.uiWidgetBase) {
			this.btn_normal_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_normal/btn_normal') as mw.Button
		}
		return this.btn_normal_Internal
	}
	private txt_normal_Internal: mw.TextBlock
	public get txt_normal(): mw.TextBlock {
		if(!this.txt_normal_Internal&&this.uiWidgetBase) {
			this.txt_normal_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_normal/txt_normal') as mw.TextBlock
		}
		return this.txt_normal_Internal
	}
	private img_badge2_Internal: mw.Image
	public get img_badge2(): mw.Image {
		if(!this.img_badge2_Internal&&this.uiWidgetBase) {
			this.img_badge2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_normal/img_badge2') as mw.Image
		}
		return this.img_badge2_Internal
	}
	private canvas_hard_Internal: mw.Canvas
	public get canvas_hard(): mw.Canvas {
		if(!this.canvas_hard_Internal&&this.uiWidgetBase) {
			this.canvas_hard_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hard') as mw.Canvas
		}
		return this.canvas_hard_Internal
	}
	private btn_hard_Internal: mw.Button
	public get btn_hard(): mw.Button {
		if(!this.btn_hard_Internal&&this.uiWidgetBase) {
			this.btn_hard_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hard/btn_hard') as mw.Button
		}
		return this.btn_hard_Internal
	}
	private txt_hard_Internal: mw.TextBlock
	public get txt_hard(): mw.TextBlock {
		if(!this.txt_hard_Internal&&this.uiWidgetBase) {
			this.txt_hard_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hard/txt_hard') as mw.TextBlock
		}
		return this.txt_hard_Internal
	}
	private img_badge3_Internal: mw.Image
	public get img_badge3(): mw.Image {
		if(!this.img_badge3_Internal&&this.uiWidgetBase) {
			this.img_badge3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hard/img_badge3') as mw.Image
		}
		return this.img_badge3_Internal
	}
	private img_lock01_Internal: mw.Image
	public get img_lock01(): mw.Image {
		if(!this.img_lock01_Internal&&this.uiWidgetBase) {
			this.img_lock01_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hard/img_lock01') as mw.Image
		}
		return this.img_lock01_Internal
	}
	private canvas_nightmare_Internal: mw.Canvas
	public get canvas_nightmare(): mw.Canvas {
		if(!this.canvas_nightmare_Internal&&this.uiWidgetBase) {
			this.canvas_nightmare_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_nightmare') as mw.Canvas
		}
		return this.canvas_nightmare_Internal
	}
	private btn_nightmare_Internal: mw.Button
	public get btn_nightmare(): mw.Button {
		if(!this.btn_nightmare_Internal&&this.uiWidgetBase) {
			this.btn_nightmare_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_nightmare/btn_nightmare') as mw.Button
		}
		return this.btn_nightmare_Internal
	}
	private txt_nightmare_Internal: mw.TextBlock
	public get txt_nightmare(): mw.TextBlock {
		if(!this.txt_nightmare_Internal&&this.uiWidgetBase) {
			this.txt_nightmare_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_nightmare/txt_nightmare') as mw.TextBlock
		}
		return this.txt_nightmare_Internal
	}
	private img_badge4_Internal: mw.Image
	public get img_badge4(): mw.Image {
		if(!this.img_badge4_Internal&&this.uiWidgetBase) {
			this.img_badge4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_nightmare/img_badge4') as mw.Image
		}
		return this.img_badge4_Internal
	}
	private img_lock02_Internal: mw.Image
	public get img_lock02(): mw.Image {
		if(!this.img_lock02_Internal&&this.uiWidgetBase) {
			this.img_lock02_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_nightmare/img_lock02') as mw.Image
		}
		return this.img_lock02_Internal
	}
	private canvas_hell_Internal: mw.Canvas
	public get canvas_hell(): mw.Canvas {
		if(!this.canvas_hell_Internal&&this.uiWidgetBase) {
			this.canvas_hell_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hell') as mw.Canvas
		}
		return this.canvas_hell_Internal
	}
	private btn_hell_Internal: mw.Button
	public get btn_hell(): mw.Button {
		if(!this.btn_hell_Internal&&this.uiWidgetBase) {
			this.btn_hell_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hell/btn_hell') as mw.Button
		}
		return this.btn_hell_Internal
	}
	private txt_hell_Internal: mw.TextBlock
	public get txt_hell(): mw.TextBlock {
		if(!this.txt_hell_Internal&&this.uiWidgetBase) {
			this.txt_hell_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hell/txt_hell') as mw.TextBlock
		}
		return this.txt_hell_Internal
	}
	private img_badge5_Internal: mw.Image
	public get img_badge5(): mw.Image {
		if(!this.img_badge5_Internal&&this.uiWidgetBase) {
			this.img_badge5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hell/img_badge5') as mw.Image
		}
		return this.img_badge5_Internal
	}
	private img_lock03_Internal: mw.Image
	public get img_lock03(): mw.Image {
		if(!this.img_lock03_Internal&&this.uiWidgetBase) {
			this.img_lock03_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_compass/canvas_hell/img_lock03') as mw.Image
		}
		return this.img_lock03_Internal
	}
	private canvas_pointer_Internal: mw.Canvas
	public get canvas_pointer(): mw.Canvas {
		if(!this.canvas_pointer_Internal&&this.uiWidgetBase) {
			this.canvas_pointer_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_pointer') as mw.Canvas
		}
		return this.canvas_pointer_Internal
	}
	private img_pointer_Internal: mw.Image
	public get img_pointer(): mw.Image {
		if(!this.img_pointer_Internal&&this.uiWidgetBase) {
			this.img_pointer_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffichoose/canvas_pointer/img_pointer') as mw.Image
		}
		return this.img_pointer_Internal
	}
	private canvas_diffitips_Internal: mw.Canvas
	public get canvas_diffitips(): mw.Canvas {
		if(!this.canvas_diffitips_Internal&&this.uiWidgetBase) {
			this.canvas_diffitips_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips') as mw.Canvas
		}
		return this.canvas_diffitips_Internal
	}
	private img_frame_Internal: mw.Image
	public get img_frame(): mw.Image {
		if(!this.img_frame_Internal&&this.uiWidgetBase) {
			this.img_frame_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/img_frame') as mw.Image
		}
		return this.img_frame_Internal
	}
	private text_diff_Internal: mw.TextBlock
	public get text_diff(): mw.TextBlock {
		if(!this.text_diff_Internal&&this.uiWidgetBase) {
			this.text_diff_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/text_diff') as mw.TextBlock
		}
		return this.text_diff_Internal
	}
	private text_diffitips_Internal: mw.TextBlock
	public get text_diffitips(): mw.TextBlock {
		if(!this.text_diffitips_Internal&&this.uiWidgetBase) {
			this.text_diffitips_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/text_diffitips') as mw.TextBlock
		}
		return this.text_diffitips_Internal
	}
	private canvas_diffiLock_Internal: mw.Canvas
	public get canvas_diffiLock(): mw.Canvas {
		if(!this.canvas_diffiLock_Internal&&this.uiWidgetBase) {
			this.canvas_diffiLock_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/canvas_diffiLock') as mw.Canvas
		}
		return this.canvas_diffiLock_Internal
	}
	private img_black_Internal: mw.Image
	public get img_black(): mw.Image {
		if(!this.img_black_Internal&&this.uiWidgetBase) {
			this.img_black_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/canvas_diffiLock/img_black') as mw.Image
		}
		return this.img_black_Internal
	}
	private text_diffiLock_Internal: mw.TextBlock
	public get text_diffiLock(): mw.TextBlock {
		if(!this.text_diffiLock_Internal&&this.uiWidgetBase) {
			this.text_diffiLock_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/canvas_diffiLock/text_diffiLock') as mw.TextBlock
		}
		return this.text_diffiLock_Internal
	}
	private canvas_record_Internal: mw.Canvas
	public get canvas_record(): mw.Canvas {
		if(!this.canvas_record_Internal&&this.uiWidgetBase) {
			this.canvas_record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/canvas_record') as mw.Canvas
		}
		return this.canvas_record_Internal
	}
	private btn_record_Internal: mw.StaleButton
	public get btn_record(): mw.StaleButton {
		if(!this.btn_record_Internal&&this.uiWidgetBase) {
			this.btn_record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/canvas_diffitips/canvas_record/btn_record') as mw.StaleButton
		}
		return this.btn_record_Internal
	}


 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = mw.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.btn_startgame.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_startgame");
		})
		this.initLanguage(this.btn_startgame);
		this.btn_startgame.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_startgame.onPressed.add(() => {
			this.btn_startgame["preScale"] = this.btn_startgame.renderScale;
			this.btn_startgame.renderScale = Vector2.one.set(this.btn_startgame["preScale"]).multiply(1.1);
		})
		this.btn_startgame.onReleased.add(() => {
			this.btn_startgame.renderScale = this.btn_startgame["preScale"];
		})
		
		
	
		this.btn_diffiswitch.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_diffiswitch");
		})
		this.initLanguage(this.btn_diffiswitch);
		this.btn_diffiswitch.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_diffiswitch.onPressed.add(() => {
			this.btn_diffiswitch["preScale"] = this.btn_diffiswitch.renderScale;
			this.btn_diffiswitch.renderScale = Vector2.one.set(this.btn_diffiswitch["preScale"]).multiply(1.1);
		})
		this.btn_diffiswitch.onReleased.add(() => {
			this.btn_diffiswitch.renderScale = this.btn_diffiswitch["preScale"];
		})
		
		
	
		this.btn_record.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_record");
		})
		this.initLanguage(this.btn_record);
		this.btn_record.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_record.onPressed.add(() => {
			this.btn_record["preScale"] = this.btn_record.renderScale;
			this.btn_record.renderScale = Vector2.one.set(this.btn_record["preScale"]).multiply(1.1);
		})
		this.btn_record.onReleased.add(() => {
			this.btn_record.renderScale = this.btn_record["preScale"];
		})
		
		
	
		//按钮添加点击
		
		this.btn_rankinglist.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_rankinglist");
		})
		this.btn_rankinglist.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_rankinglist.onPressed.add(() => {
			this.btn_rankinglist["preScale"] = this.btn_rankinglist.renderScale;
			this.btn_rankinglist.renderScale = Vector2.one.set(this.btn_rankinglist["preScale"]).multiply(1.1);
		})
		this.btn_rankinglist.onReleased.add(() => {
			this.btn_rankinglist.renderScale = this.btn_rankinglist["preScale"];
		})
		
	
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_easy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_easy");
		})
		this.btn_easy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_easy.onPressed.add(() => {
			this.btn_easy["preScale"] = this.btn_easy.renderScale;
			this.btn_easy.renderScale = Vector2.one.set(this.btn_easy["preScale"]).multiply(1.1);
		})
		this.btn_easy.onReleased.add(() => {
			this.btn_easy.renderScale = this.btn_easy["preScale"];
		})
		
	
		this.btn_normal.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_normal");
		})
		this.btn_normal.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_normal.onPressed.add(() => {
			this.btn_normal["preScale"] = this.btn_normal.renderScale;
			this.btn_normal.renderScale = Vector2.one.set(this.btn_normal["preScale"]).multiply(1.1);
		})
		this.btn_normal.onReleased.add(() => {
			this.btn_normal.renderScale = this.btn_normal["preScale"];
		})
		
	
		this.btn_hard.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_hard");
		})
		this.btn_hard.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_hard.onPressed.add(() => {
			this.btn_hard["preScale"] = this.btn_hard.renderScale;
			this.btn_hard.renderScale = Vector2.one.set(this.btn_hard["preScale"]).multiply(1.1);
		})
		this.btn_hard.onReleased.add(() => {
			this.btn_hard.renderScale = this.btn_hard["preScale"];
		})
		
	
		this.btn_nightmare.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_nightmare");
		})
		this.btn_nightmare.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_nightmare.onPressed.add(() => {
			this.btn_nightmare["preScale"] = this.btn_nightmare.renderScale;
			this.btn_nightmare.renderScale = Vector2.one.set(this.btn_nightmare["preScale"]).multiply(1.1);
		})
		this.btn_nightmare.onReleased.add(() => {
			this.btn_nightmare.renderScale = this.btn_nightmare["preScale"];
		})
		
	
		this.btn_hell.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Diffi_UI_btn_hell");
		})
		this.btn_hell.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_hell.onPressed.add(() => {
			this.btn_hell["preScale"] = this.btn_hell.renderScale;
			this.btn_hell.renderScale = Vector2.one.set(this.btn_hell["preScale"]).multiply(1.1);
		})
		this.btn_hell.onReleased.add(() => {
			this.btn_hell.renderScale = this.btn_hell["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_rankinglist)
		
	
		this.initLanguage(this.text_passing)
		
	
		this.initLanguage(this.text_passingnumber)
		
	
		this.initLanguage(this.txt_easy)
		
	
		this.initLanguage(this.txt_normal)
		
	
		this.initLanguage(this.txt_hard)
		
	
		this.initLanguage(this.txt_nightmare)
		
	
		this.initLanguage(this.txt_hell)
		
	
		this.initLanguage(this.text_diff)
		
	
		this.initLanguage(this.text_diffitips)
		
	
		this.initLanguage(this.text_diffiLock)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Diffi_UI'] = Diffi_UI_Generate;