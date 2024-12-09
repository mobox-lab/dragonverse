
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 */



@UIBind('UI/hud/Hud.ui')
export default class Hud_Generate extends UIScript {
		private mVirtualJoystickPanel_Internal: mw.VirtualJoystickPanel
	public get mVirtualJoystickPanel(): mw.VirtualJoystickPanel {
		if(!this.mVirtualJoystickPanel_Internal&&this.uiWidgetBase) {
			this.mVirtualJoystickPanel_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mVirtualJoystickPanel') as mw.VirtualJoystickPanel
		}
		return this.mVirtualJoystickPanel_Internal
	}
	private mTouchPad_Internal: mw.TouchPad
	public get mTouchPad(): mw.TouchPad {
		if(!this.mTouchPad_Internal&&this.uiWidgetBase) {
			this.mTouchPad_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mTouchPad') as mw.TouchPad
		}
		return this.mTouchPad_Internal
	}
	private mAtk_Canvas_Internal: mw.Canvas
	public get mAtk_Canvas(): mw.Canvas {
		if(!this.mAtk_Canvas_Internal&&this.uiWidgetBase) {
			this.mAtk_Canvas_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAtk_Canvas') as mw.Canvas
		}
		return this.mAtk_Canvas_Internal
	}
	private mJump_Btn_Internal: mw.Button
	public get mJump_Btn(): mw.Button {
		if(!this.mJump_Btn_Internal&&this.uiWidgetBase) {
			this.mJump_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mAtk_Canvas/mJump_Btn') as mw.Button
		}
		return this.mJump_Btn_Internal
	}
	private mCanvas_coin_Internal: mw.Canvas
	public get mCanvas_coin(): mw.Canvas {
		if(!this.mCanvas_coin_Internal&&this.uiWidgetBase) {
			this.mCanvas_coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin') as mw.Canvas
		}
		return this.mCanvas_coin_Internal
	}
	private mCanvas_diamond_Internal: mw.Canvas
	public get mCanvas_diamond(): mw.Canvas {
		if(!this.mCanvas_diamond_Internal&&this.uiWidgetBase) {
			this.mCanvas_diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_diamond') as mw.Canvas
		}
		return this.mCanvas_diamond_Internal
	}
	private mPic_diamond_Internal: mw.Image
	public get mPic_diamond(): mw.Image {
		if(!this.mPic_diamond_Internal&&this.uiWidgetBase) {
			this.mPic_diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_diamond/mPic_diamond') as mw.Image
		}
		return this.mPic_diamond_Internal
	}
	private mText_diamond_Internal: mw.TextBlock
	public get mText_diamond(): mw.TextBlock {
		if(!this.mText_diamond_Internal&&this.uiWidgetBase) {
			this.mText_diamond_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_diamond/mText_diamond') as mw.TextBlock
		}
		return this.mText_diamond_Internal
	}
	private mCanvas_specailcoin_Internal: mw.Canvas
	public get mCanvas_specailcoin(): mw.Canvas {
		if(!this.mCanvas_specailcoin_Internal&&this.uiWidgetBase) {
			this.mCanvas_specailcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_specailcoin') as mw.Canvas
		}
		return this.mCanvas_specailcoin_Internal
	}
	private mPic_coin_Internal: mw.Image
	public get mPic_coin(): mw.Image {
		if(!this.mPic_coin_Internal&&this.uiWidgetBase) {
			this.mPic_coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_specailcoin/mPic_coin') as mw.Image
		}
		return this.mPic_coin_Internal
	}
	private mText_coin_Internal: mw.TextBlock
	public get mText_coin(): mw.TextBlock {
		if(!this.mText_coin_Internal&&this.uiWidgetBase) {
			this.mText_coin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_specailcoin/mText_coin') as mw.TextBlock
		}
		return this.mText_coin_Internal
	}
	private mCanvas_Mcoin_Internal: mw.Canvas
	public get mCanvas_Mcoin(): mw.Canvas {
		if(!this.mCanvas_Mcoin_Internal&&this.uiWidgetBase) {
			this.mCanvas_Mcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_Mcoin') as mw.Canvas
		}
		return this.mCanvas_Mcoin_Internal
	}
	private mText_Mcoin_Internal: mw.TextBlock
	public get mText_Mcoin(): mw.TextBlock {
		if(!this.mText_Mcoin_Internal&&this.uiWidgetBase) {
			this.mText_Mcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_Mcoin/mText_Mcoin') as mw.TextBlock
		}
		return this.mText_Mcoin_Internal
	}
	private mAdd_Btn_Internal: mw.Button
	public get mAdd_Btn(): mw.Button {
		if(!this.mAdd_Btn_Internal&&this.uiWidgetBase) {
			this.mAdd_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_Mcoin/mAdd_Btn') as mw.Button
		}
		return this.mAdd_Btn_Internal
	}
	private mRefresh_Btn_Internal: mw.Button
	public get mRefresh_Btn(): mw.Button {
		if(!this.mRefresh_Btn_Internal&&this.uiWidgetBase) {
			this.mRefresh_Btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_Mcoin/mRefresh_Btn') as mw.Button
		}
		return this.mRefresh_Btn_Internal
	}
	private mPic_Mcoin_Internal: mw.Image
	public get mPic_Mcoin(): mw.Image {
		if(!this.mPic_Mcoin_Internal&&this.uiWidgetBase) {
			this.mPic_Mcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_Mcoin/mPic_Mcoin') as mw.Image
		}
		return this.mPic_Mcoin_Internal
	}
	private can_Mobox_Token_Internal: mw.Canvas
	public get can_Mobox_Token(): mw.Canvas {
		if(!this.can_Mobox_Token_Internal&&this.uiWidgetBase) {
			this.can_Mobox_Token_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_Mobox_Token') as mw.Canvas
		}
		return this.can_Mobox_Token_Internal
	}
	private mText_token_Internal: mw.TextBlock
	public get mText_token(): mw.TextBlock {
		if(!this.mText_token_Internal&&this.uiWidgetBase) {
			this.mText_token_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_Mobox_Token/mText_token') as mw.TextBlock
		}
		return this.mText_token_Internal
	}
	private pic_Token_Internal: mw.Image
	public get pic_Token(): mw.Image {
		if(!this.pic_Token_Internal&&this.uiWidgetBase) {
			this.pic_Token_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_Mobox_Token/pic_Token') as mw.Image
		}
		return this.pic_Token_Internal
	}
	private btn_Tips_Internal: mw.Button
	public get btn_Tips(): mw.Button {
		if(!this.btn_Tips_Internal&&this.uiWidgetBase) {
			this.btn_Tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_Mobox_Token/btn_Tips') as mw.Button
		}
		return this.btn_Tips_Internal
	}
	private btn_FreshToken_Internal: mw.Button
	public get btn_FreshToken(): mw.Button {
		if(!this.btn_FreshToken_Internal&&this.uiWidgetBase) {
			this.btn_FreshToken_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_Mobox_Token/btn_FreshToken') as mw.Button
		}
		return this.btn_FreshToken_Internal
	}
	private mCanvas_stamina_Internal: mw.Canvas
	public get mCanvas_stamina(): mw.Canvas {
		if(!this.mCanvas_stamina_Internal&&this.uiWidgetBase) {
			this.mCanvas_stamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina') as mw.Canvas
		}
		return this.mCanvas_stamina_Internal
	}
	private mText_Interval_Internal: mw.TextBlock
	public get mText_Interval(): mw.TextBlock {
		if(!this.mText_Interval_Internal&&this.uiWidgetBase) {
			this.mText_Interval_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina/mText_Interval') as mw.TextBlock
		}
		return this.mText_Interval_Internal
	}
	private mText_stamina2_Internal: mw.TextBlock
	public get mText_stamina2(): mw.TextBlock {
		if(!this.mText_stamina2_Internal&&this.uiWidgetBase) {
			this.mText_stamina2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina/mText_stamina2') as mw.TextBlock
		}
		return this.mText_stamina2_Internal
	}
	private mPic_stamina_Internal: mw.Image
	public get mPic_stamina(): mw.Image {
		if(!this.mPic_stamina_Internal&&this.uiWidgetBase) {
			this.mPic_stamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina/mPic_stamina') as mw.Image
		}
		return this.mPic_stamina_Internal
	}
	private mText_stamina_Internal: mw.TextBlock
	public get mText_stamina(): mw.TextBlock {
		if(!this.mText_stamina_Internal&&this.uiWidgetBase) {
			this.mText_stamina_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina/mText_stamina') as mw.TextBlock
		}
		return this.mText_stamina_Internal
	}
	private tips_btn_Internal: mw.Button
	public get tips_btn(): mw.Button {
		if(!this.tips_btn_Internal&&this.uiWidgetBase) {
			this.tips_btn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina/tips_btn') as mw.Button
		}
		return this.tips_btn_Internal
	}
	private btn_Fresh_Internal: mw.Button
	public get btn_Fresh(): mw.Button {
		if(!this.btn_Fresh_Internal&&this.uiWidgetBase) {
			this.btn_Fresh_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina/btn_Fresh') as mw.Button
		}
		return this.btn_Fresh_Internal
	}
	private btn_Plus_Internal: mw.Button
	public get btn_Plus(): mw.Button {
		if(!this.btn_Plus_Internal&&this.uiWidgetBase) {
			this.btn_Plus_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_stamina/btn_Plus') as mw.Button
		}
		return this.btn_Plus_Internal
	}
	private mCanvas_starcoin_Internal: mw.Canvas
	public get mCanvas_starcoin(): mw.Canvas {
		if(!this.mCanvas_starcoin_Internal&&this.uiWidgetBase) {
			this.mCanvas_starcoin_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_starcoin') as mw.Canvas
		}
		return this.mCanvas_starcoin_Internal
	}
	private taskShopBtn_Internal: mw.Button
	public get taskShopBtn(): mw.Button {
		if(!this.taskShopBtn_Internal&&this.uiWidgetBase) {
			this.taskShopBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_starcoin/taskShopBtn') as mw.Button
		}
		return this.taskShopBtn_Internal
	}
	private imgStarbg_Internal: mw.Image
	public get imgStarbg(): mw.Image {
		if(!this.imgStarbg_Internal&&this.uiWidgetBase) {
			this.imgStarbg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_starcoin/imgStarbg') as mw.Image
		}
		return this.imgStarbg_Internal
	}
	private imgStarIcon_Internal: mw.Image
	public get imgStarIcon(): mw.Image {
		if(!this.imgStarIcon_Internal&&this.uiWidgetBase) {
			this.imgStarIcon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_starcoin/imgStarIcon') as mw.Image
		}
		return this.imgStarIcon_Internal
	}
	private textCoinNum_Internal: mw.TextBlock
	public get textCoinNum(): mw.TextBlock {
		if(!this.textCoinNum_Internal&&this.uiWidgetBase) {
			this.textCoinNum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/mCanvas_starcoin/textCoinNum') as mw.TextBlock
		}
		return this.textCoinNum_Internal
	}
	private can_point_Internal: mw.Canvas
	public get can_point(): mw.Canvas {
		if(!this.can_point_Internal&&this.uiWidgetBase) {
			this.can_point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_point') as mw.Canvas
		}
		return this.can_point_Internal
	}
	private mText_point_Internal: mw.TextBlock
	public get mText_point(): mw.TextBlock {
		if(!this.mText_point_Internal&&this.uiWidgetBase) {
			this.mText_point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_point/mText_point') as mw.TextBlock
		}
		return this.mText_point_Internal
	}
	private pic_point_Internal: mw.Image
	public get pic_point(): mw.Image {
		if(!this.pic_point_Internal&&this.uiWidgetBase) {
			this.pic_point_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_point/pic_point') as mw.Image
		}
		return this.pic_point_Internal
	}
	private btn_FreshPoint_Internal: mw.Button
	public get btn_FreshPoint(): mw.Button {
		if(!this.btn_FreshPoint_Internal&&this.uiWidgetBase) {
			this.btn_FreshPoint_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_coin/can_point/btn_FreshPoint') as mw.Button
		}
		return this.btn_FreshPoint_Internal
	}
	private mCanvas_Transmit_Internal: mw.Canvas
	public get mCanvas_Transmit(): mw.Canvas {
		if(!this.mCanvas_Transmit_Internal&&this.uiWidgetBase) {
			this.mCanvas_Transmit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Transmit') as mw.Canvas
		}
		return this.mCanvas_Transmit_Internal
	}
	private mBtn_Transmit_Internal: mw.Button
	public get mBtn_Transmit(): mw.Button {
		if(!this.mBtn_Transmit_Internal&&this.uiWidgetBase) {
			this.mBtn_Transmit_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Transmit/mBtn_Transmit') as mw.Button
		}
		return this.mBtn_Transmit_Internal
	}
	private mCanvas_Setting_Internal: mw.Canvas
	public get mCanvas_Setting(): mw.Canvas {
		if(!this.mCanvas_Setting_Internal&&this.uiWidgetBase) {
			this.mCanvas_Setting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Setting') as mw.Canvas
		}
		return this.mCanvas_Setting_Internal
	}
	private mBtn_Setting_Internal: mw.Button
	public get mBtn_Setting(): mw.Button {
		if(!this.mBtn_Setting_Internal&&this.uiWidgetBase) {
			this.mBtn_Setting_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Setting/mBtn_Setting') as mw.Button
		}
		return this.mBtn_Setting_Internal
	}
	private mCanvas_buff_Internal: mw.Canvas
	public get mCanvas_buff(): mw.Canvas {
		if(!this.mCanvas_buff_Internal&&this.uiWidgetBase) {
			this.mCanvas_buff_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_buff') as mw.Canvas
		}
		return this.mCanvas_buff_Internal
	}
	private mCanvas_fasttran_Internal: mw.Canvas
	public get mCanvas_fasttran(): mw.Canvas {
		if(!this.mCanvas_fasttran_Internal&&this.uiWidgetBase) {
			this.mCanvas_fasttran_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_fasttran') as mw.Canvas
		}
		return this.mCanvas_fasttran_Internal
	}
	private mBtn_FastTran_Internal: mw.Button
	public get mBtn_FastTran(): mw.Button {
		if(!this.mBtn_FastTran_Internal&&this.uiWidgetBase) {
			this.mBtn_FastTran_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_fasttran/mBtn_FastTran') as mw.Button
		}
		return this.mBtn_FastTran_Internal
	}
	private mCanvas_Camera_Internal: mw.Canvas
	public get mCanvas_Camera(): mw.Canvas {
		if(!this.mCanvas_Camera_Internal&&this.uiWidgetBase) {
			this.mCanvas_Camera_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Camera') as mw.Canvas
		}
		return this.mCanvas_Camera_Internal
	}
	private mBtn_long_Internal: mw.StaleButton
	public get mBtn_long(): mw.StaleButton {
		if(!this.mBtn_long_Internal&&this.uiWidgetBase) {
			this.mBtn_long_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Camera/mBtn_long') as mw.StaleButton
		}
		return this.mBtn_long_Internal
	}
	private mBtn_near_Internal: mw.StaleButton
	public get mBtn_near(): mw.StaleButton {
		if(!this.mBtn_near_Internal&&this.uiWidgetBase) {
			this.mBtn_near_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Camera/mBtn_near') as mw.StaleButton
		}
		return this.mBtn_near_Internal
	}
	private mBtn_nomal_Internal: mw.StaleButton
	public get mBtn_nomal(): mw.StaleButton {
		if(!this.mBtn_nomal_Internal&&this.uiWidgetBase) {
			this.mBtn_nomal_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Camera/mBtn_nomal') as mw.StaleButton
		}
		return this.mBtn_nomal_Internal
	}
	private mGM_Internal: mw.Button
	public get mGM(): mw.Button {
		if(!this.mGM_Internal&&this.uiWidgetBase) {
			this.mGM_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mGM') as mw.Button
		}
		return this.mGM_Internal
	}
	private mCanvas_skid_Internal: mw.Canvas
	public get mCanvas_skid(): mw.Canvas {
		if(!this.mCanvas_skid_Internal&&this.uiWidgetBase) {
			this.mCanvas_skid_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_skid') as mw.Canvas
		}
		return this.mCanvas_skid_Internal
	}
	private mBtn_skid_Internal: mw.Button
	public get mBtn_skid(): mw.Button {
		if(!this.mBtn_skid_Internal&&this.uiWidgetBase) {
			this.mBtn_skid_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_skid/mBtn_skid') as mw.Button
		}
		return this.mBtn_skid_Internal
	}
	private mCanvas_Onlineshop_Internal: mw.Canvas
	public get mCanvas_Onlineshop(): mw.Canvas {
		if(!this.mCanvas_Onlineshop_Internal&&this.uiWidgetBase) {
			this.mCanvas_Onlineshop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Onlineshop') as mw.Canvas
		}
		return this.mCanvas_Onlineshop_Internal
	}
	private mBtn_Onlinehsop_Internal: mw.Button
	public get mBtn_Onlinehsop(): mw.Button {
		if(!this.mBtn_Onlinehsop_Internal&&this.uiWidgetBase) {
			this.mBtn_Onlinehsop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_Onlineshop/mBtn_Onlinehsop') as mw.Button
		}
		return this.mBtn_Onlinehsop_Internal
	}
	private mCanvas_jumpRoom_Internal: mw.Canvas
	public get mCanvas_jumpRoom(): mw.Canvas {
		if(!this.mCanvas_jumpRoom_Internal&&this.uiWidgetBase) {
			this.mCanvas_jumpRoom_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_jumpRoom') as mw.Canvas
		}
		return this.mCanvas_jumpRoom_Internal
	}
	private jumpRoomBtn_Internal: mw.Button
	public get jumpRoomBtn(): mw.Button {
		if(!this.jumpRoomBtn_Internal&&this.uiWidgetBase) {
			this.jumpRoomBtn_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/mCanvas_jumpRoom/jumpRoomBtn') as mw.Button
		}
		return this.jumpRoomBtn_Internal
	}
	private roomIdText_Internal: mw.TextBlock
	public get roomIdText(): mw.TextBlock {
		if(!this.roomIdText_Internal&&this.uiWidgetBase) {
			this.roomIdText_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/roomIdText') as mw.TextBlock
		}
		return this.roomIdText_Internal
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
		
		this.mBtn_long.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_long");
		})
		this.initLanguage(this.mBtn_long);
		this.mBtn_long.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_near.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_near");
		})
		this.initLanguage(this.mBtn_near);
		this.mBtn_near.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_nomal.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_nomal");
		})
		this.initLanguage(this.mBtn_nomal);
		this.mBtn_nomal.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		
		this.mJump_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mJump_Btn");
		})
		this.mJump_Btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mAdd_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mAdd_Btn");
		})
		this.mAdd_Btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mRefresh_Btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mRefresh_Btn");
		})
		this.mRefresh_Btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Tips.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Tips");
		})
		this.btn_Tips.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_FreshToken.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_FreshToken");
		})
		this.btn_FreshToken.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.tips_btn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "tips_btn");
		})
		this.tips_btn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Fresh.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Fresh");
		})
		this.btn_Fresh.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_Plus.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_Plus");
		})
		this.btn_Plus.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.taskShopBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "taskShopBtn");
		})
		this.taskShopBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.btn_FreshPoint.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "btn_FreshPoint");
		})
		this.btn_FreshPoint.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Transmit.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Transmit");
		})
		this.mBtn_Transmit.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Setting.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Setting");
		})
		this.mBtn_Setting.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_FastTran.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_FastTran");
		})
		this.mBtn_FastTran.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mGM.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mGM");
		})
		this.mGM.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_skid.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_skid");
		})
		this.mBtn_skid.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Onlinehsop.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "mBtn_Onlinehsop");
		})
		this.mBtn_Onlinehsop.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	
		this.jumpRoomBtn.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "jumpRoomBtn");
		})
		this.jumpRoomBtn.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_diamond)
		
	
		this.initLanguage(this.mText_coin)
		
	
		this.initLanguage(this.mText_Mcoin)
		
	
		this.initLanguage(this.mText_token)
		
	
		this.initLanguage(this.mText_Interval)
		
	
		this.initLanguage(this.mText_stamina2)
		
	
		this.initLanguage(this.mText_stamina)
		
	
		this.initLanguage(this.textCoinNum)
		
	
		this.initLanguage(this.mText_point)
		
	
		this.initLanguage(this.roomIdText)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas_fasttran/TextBlock") as any);
		
	

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
 