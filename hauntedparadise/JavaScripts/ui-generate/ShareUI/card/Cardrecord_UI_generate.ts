
 

 @UIBind('UI/ShareUI/card/Cardrecord_UI.ui')
 export default class Cardrecord_UI_Generate extends UIScript {
	 	private mRootCanvas_Internal: mw.Canvas
	public get mRootCanvas(): mw.Canvas {
		if(!this.mRootCanvas_Internal&&this.uiWidgetBase) {
			this.mRootCanvas_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas') as mw.Canvas
		}
		return this.mRootCanvas_Internal
	}
	private img_name_Internal: mw.Image
	public get img_name(): mw.Image {
		if(!this.img_name_Internal&&this.uiWidgetBase) {
			this.img_name_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/Canvas/img_name') as mw.Image
		}
		return this.img_name_Internal
	}
	private img_name2_1_Internal: mw.Image
	public get img_name2_1(): mw.Image {
		if(!this.img_name2_1_Internal&&this.uiWidgetBase) {
			this.img_name2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/Canvas/img_name2_1') as mw.Image
		}
		return this.img_name2_1_Internal
	}
	private img_name2_2_Internal: mw.Image
	public get img_name2_2(): mw.Image {
		if(!this.img_name2_2_Internal&&this.uiWidgetBase) {
			this.img_name2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/Canvas/img_name2_2') as mw.Image
		}
		return this.img_name2_2_Internal
	}
	private img_name2_2_1_Internal: mw.Image
	public get img_name2_2_1(): mw.Image {
		if(!this.img_name2_2_1_Internal&&this.uiWidgetBase) {
			this.img_name2_2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/Canvas/img_name2_2_1') as mw.Image
		}
		return this.img_name2_2_1_Internal
	}
	private img_name2_2_1_1_Internal: mw.Image
	public get img_name2_2_1_1(): mw.Image {
		if(!this.img_name2_2_1_1_Internal&&this.uiWidgetBase) {
			this.img_name2_2_1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/Canvas/img_name2_2_1_1') as mw.Image
		}
		return this.img_name2_2_1_1_Internal
	}
	private txt_cardname_Internal: mw.TextBlock
	public get txt_cardname(): mw.TextBlock {
		if(!this.txt_cardname_Internal&&this.uiWidgetBase) {
			this.txt_cardname_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/Canvas/txt_cardname') as mw.TextBlock
		}
		return this.txt_cardname_Internal
	}
	private btn_close_Internal: mw.Button
	public get btn_close(): mw.Button {
		if(!this.btn_close_Internal&&this.uiWidgetBase) {
			this.btn_close_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/Canvas/btn_close') as mw.Button
		}
		return this.btn_close_Internal
	}
	private record_Internal: mw.Canvas
	public get record(): mw.Canvas {
		if(!this.record_Internal&&this.uiWidgetBase) {
			this.record_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record') as mw.Canvas
		}
		return this.record_Internal
	}
	private img_record1_Internal: mw.Image
	public get img_record1(): mw.Image {
		if(!this.img_record1_Internal&&this.uiWidgetBase) {
			this.img_record1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/img_record1') as mw.Image
		}
		return this.img_record1_Internal
	}
	private img_record2_Internal: mw.Image
	public get img_record2(): mw.Image {
		if(!this.img_record2_Internal&&this.uiWidgetBase) {
			this.img_record2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/img_record2') as mw.Image
		}
		return this.img_record2_Internal
	}
	private img_end1_Internal: mw.Image
	public get img_end1(): mw.Image {
		if(!this.img_end1_Internal&&this.uiWidgetBase) {
			this.img_end1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/img_end1') as mw.Image
		}
		return this.img_end1_Internal
	}
	private img_end2_Internal: mw.Image
	public get img_end2(): mw.Image {
		if(!this.img_end2_Internal&&this.uiWidgetBase) {
			this.img_end2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/img_end2') as mw.Image
		}
		return this.img_end2_Internal
	}
	private img_end3_Internal: mw.Image
	public get img_end3(): mw.Image {
		if(!this.img_end3_Internal&&this.uiWidgetBase) {
			this.img_end3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/img_end3') as mw.Image
		}
		return this.img_end3_Internal
	}
	private canvas_end1_Internal: mw.Canvas
	public get canvas_end1(): mw.Canvas {
		if(!this.canvas_end1_Internal&&this.uiWidgetBase) {
			this.canvas_end1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1') as mw.Canvas
		}
		return this.canvas_end1_Internal
	}
	private canvas_troofy1_1_Internal: mw.Canvas
	public get canvas_troofy1_1(): mw.Canvas {
		if(!this.canvas_troofy1_1_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_1') as mw.Canvas
		}
		return this.canvas_troofy1_1_Internal
	}
	private img_shadow1_1_Internal: mw.Image
	public get img_shadow1_1(): mw.Image {
		if(!this.img_shadow1_1_Internal&&this.uiWidgetBase) {
			this.img_shadow1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_1/img_shadow1_1') as mw.Image
		}
		return this.img_shadow1_1_Internal
	}
	private img_trophy1_1_Internal: mw.Image
	public get img_trophy1_1(): mw.Image {
		if(!this.img_trophy1_1_Internal&&this.uiWidgetBase) {
			this.img_trophy1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_1/img_trophy1_1') as mw.Image
		}
		return this.img_trophy1_1_Internal
	}
	private txt_time1_1_Internal: mw.TextBlock
	public get txt_time1_1(): mw.TextBlock {
		if(!this.txt_time1_1_Internal&&this.uiWidgetBase) {
			this.txt_time1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_1/txt_time1_1') as mw.TextBlock
		}
		return this.txt_time1_1_Internal
	}
	private txt_diffi1_1_Internal: mw.TextBlock
	public get txt_diffi1_1(): mw.TextBlock {
		if(!this.txt_diffi1_1_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_1/txt_diffi1_1') as mw.TextBlock
		}
		return this.txt_diffi1_1_Internal
	}
	private canvas_troofy1_2_Internal: mw.Canvas
	public get canvas_troofy1_2(): mw.Canvas {
		if(!this.canvas_troofy1_2_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_2') as mw.Canvas
		}
		return this.canvas_troofy1_2_Internal
	}
	private img_shadow1_2_Internal: mw.Image
	public get img_shadow1_2(): mw.Image {
		if(!this.img_shadow1_2_Internal&&this.uiWidgetBase) {
			this.img_shadow1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_2/img_shadow1_2') as mw.Image
		}
		return this.img_shadow1_2_Internal
	}
	private img_trophy1_2_Internal: mw.Image
	public get img_trophy1_2(): mw.Image {
		if(!this.img_trophy1_2_Internal&&this.uiWidgetBase) {
			this.img_trophy1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_2/img_trophy1_2') as mw.Image
		}
		return this.img_trophy1_2_Internal
	}
	private txt_time1_2_Internal: mw.TextBlock
	public get txt_time1_2(): mw.TextBlock {
		if(!this.txt_time1_2_Internal&&this.uiWidgetBase) {
			this.txt_time1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_2/txt_time1_2') as mw.TextBlock
		}
		return this.txt_time1_2_Internal
	}
	private txt_diffi1_2_Internal: mw.TextBlock
	public get txt_diffi1_2(): mw.TextBlock {
		if(!this.txt_diffi1_2_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_2/txt_diffi1_2') as mw.TextBlock
		}
		return this.txt_diffi1_2_Internal
	}
	private canvas_troofy1_3_Internal: mw.Canvas
	public get canvas_troofy1_3(): mw.Canvas {
		if(!this.canvas_troofy1_3_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_3') as mw.Canvas
		}
		return this.canvas_troofy1_3_Internal
	}
	private img_shadow1_3_Internal: mw.Image
	public get img_shadow1_3(): mw.Image {
		if(!this.img_shadow1_3_Internal&&this.uiWidgetBase) {
			this.img_shadow1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_3/img_shadow1_3') as mw.Image
		}
		return this.img_shadow1_3_Internal
	}
	private img_trophy1_3_Internal: mw.Image
	public get img_trophy1_3(): mw.Image {
		if(!this.img_trophy1_3_Internal&&this.uiWidgetBase) {
			this.img_trophy1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_3/img_trophy1_3') as mw.Image
		}
		return this.img_trophy1_3_Internal
	}
	private txt_time1_3_Internal: mw.TextBlock
	public get txt_time1_3(): mw.TextBlock {
		if(!this.txt_time1_3_Internal&&this.uiWidgetBase) {
			this.txt_time1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_3/txt_time1_3') as mw.TextBlock
		}
		return this.txt_time1_3_Internal
	}
	private txt_diffi1_3_Internal: mw.TextBlock
	public get txt_diffi1_3(): mw.TextBlock {
		if(!this.txt_diffi1_3_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_3/txt_diffi1_3') as mw.TextBlock
		}
		return this.txt_diffi1_3_Internal
	}
	private canvas_troofy1_4_Internal: mw.Canvas
	public get canvas_troofy1_4(): mw.Canvas {
		if(!this.canvas_troofy1_4_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_4') as mw.Canvas
		}
		return this.canvas_troofy1_4_Internal
	}
	private img_shadow1_4_Internal: mw.Image
	public get img_shadow1_4(): mw.Image {
		if(!this.img_shadow1_4_Internal&&this.uiWidgetBase) {
			this.img_shadow1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_4/img_shadow1_4') as mw.Image
		}
		return this.img_shadow1_4_Internal
	}
	private img_trophy1_4_Internal: mw.Image
	public get img_trophy1_4(): mw.Image {
		if(!this.img_trophy1_4_Internal&&this.uiWidgetBase) {
			this.img_trophy1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_4/img_trophy1_4') as mw.Image
		}
		return this.img_trophy1_4_Internal
	}
	private txt_time1_4_Internal: mw.TextBlock
	public get txt_time1_4(): mw.TextBlock {
		if(!this.txt_time1_4_Internal&&this.uiWidgetBase) {
			this.txt_time1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_4/txt_time1_4') as mw.TextBlock
		}
		return this.txt_time1_4_Internal
	}
	private txt_diffi1_4_Internal: mw.TextBlock
	public get txt_diffi1_4(): mw.TextBlock {
		if(!this.txt_diffi1_4_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_4/txt_diffi1_4') as mw.TextBlock
		}
		return this.txt_diffi1_4_Internal
	}
	private canvas_troofy1_5_Internal: mw.Canvas
	public get canvas_troofy1_5(): mw.Canvas {
		if(!this.canvas_troofy1_5_Internal&&this.uiWidgetBase) {
			this.canvas_troofy1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_5') as mw.Canvas
		}
		return this.canvas_troofy1_5_Internal
	}
	private img_shadow1_5_Internal: mw.Image
	public get img_shadow1_5(): mw.Image {
		if(!this.img_shadow1_5_Internal&&this.uiWidgetBase) {
			this.img_shadow1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_5/img_shadow1_5') as mw.Image
		}
		return this.img_shadow1_5_Internal
	}
	private img_trophy1_5_Internal: mw.Image
	public get img_trophy1_5(): mw.Image {
		if(!this.img_trophy1_5_Internal&&this.uiWidgetBase) {
			this.img_trophy1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_5/img_trophy1_5') as mw.Image
		}
		return this.img_trophy1_5_Internal
	}
	private txt_time1_5_Internal: mw.TextBlock
	public get txt_time1_5(): mw.TextBlock {
		if(!this.txt_time1_5_Internal&&this.uiWidgetBase) {
			this.txt_time1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_5/txt_time1_5') as mw.TextBlock
		}
		return this.txt_time1_5_Internal
	}
	private txt_diffi1_5_Internal: mw.TextBlock
	public get txt_diffi1_5(): mw.TextBlock {
		if(!this.txt_diffi1_5_Internal&&this.uiWidgetBase) {
			this.txt_diffi1_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end1/canvas_troofy1_5/txt_diffi1_5') as mw.TextBlock
		}
		return this.txt_diffi1_5_Internal
	}
	private canvas_end2_Internal: mw.Canvas
	public get canvas_end2(): mw.Canvas {
		if(!this.canvas_end2_Internal&&this.uiWidgetBase) {
			this.canvas_end2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2') as mw.Canvas
		}
		return this.canvas_end2_Internal
	}
	private canvas_troofy2_1_Internal: mw.Canvas
	public get canvas_troofy2_1(): mw.Canvas {
		if(!this.canvas_troofy2_1_Internal&&this.uiWidgetBase) {
			this.canvas_troofy2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_1') as mw.Canvas
		}
		return this.canvas_troofy2_1_Internal
	}
	private img_shadow2_1_Internal: mw.Image
	public get img_shadow2_1(): mw.Image {
		if(!this.img_shadow2_1_Internal&&this.uiWidgetBase) {
			this.img_shadow2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_1/img_shadow2_1') as mw.Image
		}
		return this.img_shadow2_1_Internal
	}
	private img_trophy2_1_Internal: mw.Image
	public get img_trophy2_1(): mw.Image {
		if(!this.img_trophy2_1_Internal&&this.uiWidgetBase) {
			this.img_trophy2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_1/img_trophy2_1') as mw.Image
		}
		return this.img_trophy2_1_Internal
	}
	private txt_time2_1_Internal: mw.TextBlock
	public get txt_time2_1(): mw.TextBlock {
		if(!this.txt_time2_1_Internal&&this.uiWidgetBase) {
			this.txt_time2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_1/txt_time2_1') as mw.TextBlock
		}
		return this.txt_time2_1_Internal
	}
	private txt_diffi2_1_Internal: mw.TextBlock
	public get txt_diffi2_1(): mw.TextBlock {
		if(!this.txt_diffi2_1_Internal&&this.uiWidgetBase) {
			this.txt_diffi2_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_1/txt_diffi2_1') as mw.TextBlock
		}
		return this.txt_diffi2_1_Internal
	}
	private canvas_troofy2_2_Internal: mw.Canvas
	public get canvas_troofy2_2(): mw.Canvas {
		if(!this.canvas_troofy2_2_Internal&&this.uiWidgetBase) {
			this.canvas_troofy2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_2') as mw.Canvas
		}
		return this.canvas_troofy2_2_Internal
	}
	private img_shadow2_2_Internal: mw.Image
	public get img_shadow2_2(): mw.Image {
		if(!this.img_shadow2_2_Internal&&this.uiWidgetBase) {
			this.img_shadow2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_2/img_shadow2_2') as mw.Image
		}
		return this.img_shadow2_2_Internal
	}
	private img_trophy2_2_Internal: mw.Image
	public get img_trophy2_2(): mw.Image {
		if(!this.img_trophy2_2_Internal&&this.uiWidgetBase) {
			this.img_trophy2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_2/img_trophy2_2') as mw.Image
		}
		return this.img_trophy2_2_Internal
	}
	private txt_time2_2_Internal: mw.TextBlock
	public get txt_time2_2(): mw.TextBlock {
		if(!this.txt_time2_2_Internal&&this.uiWidgetBase) {
			this.txt_time2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_2/txt_time2_2') as mw.TextBlock
		}
		return this.txt_time2_2_Internal
	}
	private txt_diffi2_2_Internal: mw.TextBlock
	public get txt_diffi2_2(): mw.TextBlock {
		if(!this.txt_diffi2_2_Internal&&this.uiWidgetBase) {
			this.txt_diffi2_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_2/txt_diffi2_2') as mw.TextBlock
		}
		return this.txt_diffi2_2_Internal
	}
	private canvas_troofy2_3_Internal: mw.Canvas
	public get canvas_troofy2_3(): mw.Canvas {
		if(!this.canvas_troofy2_3_Internal&&this.uiWidgetBase) {
			this.canvas_troofy2_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_3') as mw.Canvas
		}
		return this.canvas_troofy2_3_Internal
	}
	private img_shadow2_3_Internal: mw.Image
	public get img_shadow2_3(): mw.Image {
		if(!this.img_shadow2_3_Internal&&this.uiWidgetBase) {
			this.img_shadow2_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_3/img_shadow2_3') as mw.Image
		}
		return this.img_shadow2_3_Internal
	}
	private img_trophy2_3_Internal: mw.Image
	public get img_trophy2_3(): mw.Image {
		if(!this.img_trophy2_3_Internal&&this.uiWidgetBase) {
			this.img_trophy2_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_3/img_trophy2_3') as mw.Image
		}
		return this.img_trophy2_3_Internal
	}
	private txt_time2_3_Internal: mw.TextBlock
	public get txt_time2_3(): mw.TextBlock {
		if(!this.txt_time2_3_Internal&&this.uiWidgetBase) {
			this.txt_time2_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_3/txt_time2_3') as mw.TextBlock
		}
		return this.txt_time2_3_Internal
	}
	private txt_diffi2_3_Internal: mw.TextBlock
	public get txt_diffi2_3(): mw.TextBlock {
		if(!this.txt_diffi2_3_Internal&&this.uiWidgetBase) {
			this.txt_diffi2_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_3/txt_diffi2_3') as mw.TextBlock
		}
		return this.txt_diffi2_3_Internal
	}
	private canvas_troofy2_4_Internal: mw.Canvas
	public get canvas_troofy2_4(): mw.Canvas {
		if(!this.canvas_troofy2_4_Internal&&this.uiWidgetBase) {
			this.canvas_troofy2_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_4') as mw.Canvas
		}
		return this.canvas_troofy2_4_Internal
	}
	private img_shadow2_4_Internal: mw.Image
	public get img_shadow2_4(): mw.Image {
		if(!this.img_shadow2_4_Internal&&this.uiWidgetBase) {
			this.img_shadow2_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_4/img_shadow2_4') as mw.Image
		}
		return this.img_shadow2_4_Internal
	}
	private img_trophy2_4_Internal: mw.Image
	public get img_trophy2_4(): mw.Image {
		if(!this.img_trophy2_4_Internal&&this.uiWidgetBase) {
			this.img_trophy2_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_4/img_trophy2_4') as mw.Image
		}
		return this.img_trophy2_4_Internal
	}
	private txt_time2_4_Internal: mw.TextBlock
	public get txt_time2_4(): mw.TextBlock {
		if(!this.txt_time2_4_Internal&&this.uiWidgetBase) {
			this.txt_time2_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_4/txt_time2_4') as mw.TextBlock
		}
		return this.txt_time2_4_Internal
	}
	private txt_diffi2_4_Internal: mw.TextBlock
	public get txt_diffi2_4(): mw.TextBlock {
		if(!this.txt_diffi2_4_Internal&&this.uiWidgetBase) {
			this.txt_diffi2_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_4/txt_diffi2_4') as mw.TextBlock
		}
		return this.txt_diffi2_4_Internal
	}
	private canvas_troofy2_5_Internal: mw.Canvas
	public get canvas_troofy2_5(): mw.Canvas {
		if(!this.canvas_troofy2_5_Internal&&this.uiWidgetBase) {
			this.canvas_troofy2_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_5') as mw.Canvas
		}
		return this.canvas_troofy2_5_Internal
	}
	private img_shadow2_5_Internal: mw.Image
	public get img_shadow2_5(): mw.Image {
		if(!this.img_shadow2_5_Internal&&this.uiWidgetBase) {
			this.img_shadow2_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_5/img_shadow2_5') as mw.Image
		}
		return this.img_shadow2_5_Internal
	}
	private img_trophy2_5_Internal: mw.Image
	public get img_trophy2_5(): mw.Image {
		if(!this.img_trophy2_5_Internal&&this.uiWidgetBase) {
			this.img_trophy2_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_5/img_trophy2_5') as mw.Image
		}
		return this.img_trophy2_5_Internal
	}
	private txt_time2_5_Internal: mw.TextBlock
	public get txt_time2_5(): mw.TextBlock {
		if(!this.txt_time2_5_Internal&&this.uiWidgetBase) {
			this.txt_time2_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_5/txt_time2_5') as mw.TextBlock
		}
		return this.txt_time2_5_Internal
	}
	private txt_diffi2_5_Internal: mw.TextBlock
	public get txt_diffi2_5(): mw.TextBlock {
		if(!this.txt_diffi2_5_Internal&&this.uiWidgetBase) {
			this.txt_diffi2_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end2/canvas_troofy2_5/txt_diffi2_5') as mw.TextBlock
		}
		return this.txt_diffi2_5_Internal
	}
	private canvas_end3_Internal: mw.Canvas
	public get canvas_end3(): mw.Canvas {
		if(!this.canvas_end3_Internal&&this.uiWidgetBase) {
			this.canvas_end3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3') as mw.Canvas
		}
		return this.canvas_end3_Internal
	}
	private canvas_troofy3_1_Internal: mw.Canvas
	public get canvas_troofy3_1(): mw.Canvas {
		if(!this.canvas_troofy3_1_Internal&&this.uiWidgetBase) {
			this.canvas_troofy3_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_1') as mw.Canvas
		}
		return this.canvas_troofy3_1_Internal
	}
	private img_shadow3_1_Internal: mw.Image
	public get img_shadow3_1(): mw.Image {
		if(!this.img_shadow3_1_Internal&&this.uiWidgetBase) {
			this.img_shadow3_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_1/img_shadow3_1') as mw.Image
		}
		return this.img_shadow3_1_Internal
	}
	private img_trophy3_1_Internal: mw.Image
	public get img_trophy3_1(): mw.Image {
		if(!this.img_trophy3_1_Internal&&this.uiWidgetBase) {
			this.img_trophy3_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_1/img_trophy3_1') as mw.Image
		}
		return this.img_trophy3_1_Internal
	}
	private txt_time3_1_Internal: mw.TextBlock
	public get txt_time3_1(): mw.TextBlock {
		if(!this.txt_time3_1_Internal&&this.uiWidgetBase) {
			this.txt_time3_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_1/txt_time3_1') as mw.TextBlock
		}
		return this.txt_time3_1_Internal
	}
	private txt_diffi3_1_Internal: mw.TextBlock
	public get txt_diffi3_1(): mw.TextBlock {
		if(!this.txt_diffi3_1_Internal&&this.uiWidgetBase) {
			this.txt_diffi3_1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_1/txt_diffi3_1') as mw.TextBlock
		}
		return this.txt_diffi3_1_Internal
	}
	private canvas_troofy3_2_Internal: mw.Canvas
	public get canvas_troofy3_2(): mw.Canvas {
		if(!this.canvas_troofy3_2_Internal&&this.uiWidgetBase) {
			this.canvas_troofy3_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_2') as mw.Canvas
		}
		return this.canvas_troofy3_2_Internal
	}
	private img_shadow3_2_Internal: mw.Image
	public get img_shadow3_2(): mw.Image {
		if(!this.img_shadow3_2_Internal&&this.uiWidgetBase) {
			this.img_shadow3_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_2/img_shadow3_2') as mw.Image
		}
		return this.img_shadow3_2_Internal
	}
	private img_trophy3_2_Internal: mw.Image
	public get img_trophy3_2(): mw.Image {
		if(!this.img_trophy3_2_Internal&&this.uiWidgetBase) {
			this.img_trophy3_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_2/img_trophy3_2') as mw.Image
		}
		return this.img_trophy3_2_Internal
	}
	private txt_time3_2_Internal: mw.TextBlock
	public get txt_time3_2(): mw.TextBlock {
		if(!this.txt_time3_2_Internal&&this.uiWidgetBase) {
			this.txt_time3_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_2/txt_time3_2') as mw.TextBlock
		}
		return this.txt_time3_2_Internal
	}
	private txt_diffi3_2_Internal: mw.TextBlock
	public get txt_diffi3_2(): mw.TextBlock {
		if(!this.txt_diffi3_2_Internal&&this.uiWidgetBase) {
			this.txt_diffi3_2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_2/txt_diffi3_2') as mw.TextBlock
		}
		return this.txt_diffi3_2_Internal
	}
	private canvas_troofy3_3_Internal: mw.Canvas
	public get canvas_troofy3_3(): mw.Canvas {
		if(!this.canvas_troofy3_3_Internal&&this.uiWidgetBase) {
			this.canvas_troofy3_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_3') as mw.Canvas
		}
		return this.canvas_troofy3_3_Internal
	}
	private img_shadow3_3_Internal: mw.Image
	public get img_shadow3_3(): mw.Image {
		if(!this.img_shadow3_3_Internal&&this.uiWidgetBase) {
			this.img_shadow3_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_3/img_shadow3_3') as mw.Image
		}
		return this.img_shadow3_3_Internal
	}
	private img_trophy3_3_Internal: mw.Image
	public get img_trophy3_3(): mw.Image {
		if(!this.img_trophy3_3_Internal&&this.uiWidgetBase) {
			this.img_trophy3_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_3/img_trophy3_3') as mw.Image
		}
		return this.img_trophy3_3_Internal
	}
	private txt_time3_3_Internal: mw.TextBlock
	public get txt_time3_3(): mw.TextBlock {
		if(!this.txt_time3_3_Internal&&this.uiWidgetBase) {
			this.txt_time3_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_3/txt_time3_3') as mw.TextBlock
		}
		return this.txt_time3_3_Internal
	}
	private txt_diffi3_3_Internal: mw.TextBlock
	public get txt_diffi3_3(): mw.TextBlock {
		if(!this.txt_diffi3_3_Internal&&this.uiWidgetBase) {
			this.txt_diffi3_3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_3/txt_diffi3_3') as mw.TextBlock
		}
		return this.txt_diffi3_3_Internal
	}
	private canvas_troofy3_4_Internal: mw.Canvas
	public get canvas_troofy3_4(): mw.Canvas {
		if(!this.canvas_troofy3_4_Internal&&this.uiWidgetBase) {
			this.canvas_troofy3_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_4') as mw.Canvas
		}
		return this.canvas_troofy3_4_Internal
	}
	private img_shadow3_4_Internal: mw.Image
	public get img_shadow3_4(): mw.Image {
		if(!this.img_shadow3_4_Internal&&this.uiWidgetBase) {
			this.img_shadow3_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_4/img_shadow3_4') as mw.Image
		}
		return this.img_shadow3_4_Internal
	}
	private img_trophy3_4_Internal: mw.Image
	public get img_trophy3_4(): mw.Image {
		if(!this.img_trophy3_4_Internal&&this.uiWidgetBase) {
			this.img_trophy3_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_4/img_trophy3_4') as mw.Image
		}
		return this.img_trophy3_4_Internal
	}
	private txt_time3_4_Internal: mw.TextBlock
	public get txt_time3_4(): mw.TextBlock {
		if(!this.txt_time3_4_Internal&&this.uiWidgetBase) {
			this.txt_time3_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_4/txt_time3_4') as mw.TextBlock
		}
		return this.txt_time3_4_Internal
	}
	private txt_diffi3_4_Internal: mw.TextBlock
	public get txt_diffi3_4(): mw.TextBlock {
		if(!this.txt_diffi3_4_Internal&&this.uiWidgetBase) {
			this.txt_diffi3_4_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_4/txt_diffi3_4') as mw.TextBlock
		}
		return this.txt_diffi3_4_Internal
	}
	private canvas_troofy3_5_Internal: mw.Canvas
	public get canvas_troofy3_5(): mw.Canvas {
		if(!this.canvas_troofy3_5_Internal&&this.uiWidgetBase) {
			this.canvas_troofy3_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_5') as mw.Canvas
		}
		return this.canvas_troofy3_5_Internal
	}
	private img_shadow3_5_Internal: mw.Image
	public get img_shadow3_5(): mw.Image {
		if(!this.img_shadow3_5_Internal&&this.uiWidgetBase) {
			this.img_shadow3_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_5/img_shadow3_5') as mw.Image
		}
		return this.img_shadow3_5_Internal
	}
	private img_trophy3_5_Internal: mw.Image
	public get img_trophy3_5(): mw.Image {
		if(!this.img_trophy3_5_Internal&&this.uiWidgetBase) {
			this.img_trophy3_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_5/img_trophy3_5') as mw.Image
		}
		return this.img_trophy3_5_Internal
	}
	private txt_time3_5_Internal: mw.TextBlock
	public get txt_time3_5(): mw.TextBlock {
		if(!this.txt_time3_5_Internal&&this.uiWidgetBase) {
			this.txt_time3_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_5/txt_time3_5') as mw.TextBlock
		}
		return this.txt_time3_5_Internal
	}
	private txt_diffi3_5_Internal: mw.TextBlock
	public get txt_diffi3_5(): mw.TextBlock {
		if(!this.txt_diffi3_5_Internal&&this.uiWidgetBase) {
			this.txt_diffi3_5_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/canvas_end3/canvas_troofy3_5/txt_diffi3_5') as mw.TextBlock
		}
		return this.txt_diffi3_5_Internal
	}
	private txt1_Internal: mw.TextBlock
	public get txt1(): mw.TextBlock {
		if(!this.txt1_Internal&&this.uiWidgetBase) {
			this.txt1_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/txt1') as mw.TextBlock
		}
		return this.txt1_Internal
	}
	private txt2_Internal: mw.TextBlock
	public get txt2(): mw.TextBlock {
		if(!this.txt2_Internal&&this.uiWidgetBase) {
			this.txt2_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/txt2') as mw.TextBlock
		}
		return this.txt2_Internal
	}
	private txt3_Internal: mw.TextBlock
	public get txt3(): mw.TextBlock {
		if(!this.txt3_Internal&&this.uiWidgetBase) {
			this.txt3_Internal = this.uiWidgetBase.findChildByPath('mRootCanvas/record/txt3') as mw.TextBlock
		}
		return this.txt3_Internal
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
		
		this.btn_close.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Cardrecord_UI_btn_close");
		})
		this.btn_close.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_close.onPressed.add(() => {
			this.btn_close["preScale"] = this.btn_close.renderScale;
			this.btn_close.renderScale = Vector2.one.set(this.btn_close["preScale"]).multiply(1.1);
		})
		this.btn_close.onReleased.add(() => {
			this.btn_close.renderScale = this.btn_close["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.txt_cardname)
		
	
		this.initLanguage(this.txt_time1_1)
		
	
		this.initLanguage(this.txt_diffi1_1)
		
	
		this.initLanguage(this.txt_time1_2)
		
	
		this.initLanguage(this.txt_diffi1_2)
		
	
		this.initLanguage(this.txt_time1_3)
		
	
		this.initLanguage(this.txt_diffi1_3)
		
	
		this.initLanguage(this.txt_time1_4)
		
	
		this.initLanguage(this.txt_diffi1_4)
		
	
		this.initLanguage(this.txt_time1_5)
		
	
		this.initLanguage(this.txt_diffi1_5)
		
	
		this.initLanguage(this.txt_time2_1)
		
	
		this.initLanguage(this.txt_diffi2_1)
		
	
		this.initLanguage(this.txt_time2_2)
		
	
		this.initLanguage(this.txt_diffi2_2)
		
	
		this.initLanguage(this.txt_time2_3)
		
	
		this.initLanguage(this.txt_diffi2_3)
		
	
		this.initLanguage(this.txt_time2_4)
		
	
		this.initLanguage(this.txt_diffi2_4)
		
	
		this.initLanguage(this.txt_time2_5)
		
	
		this.initLanguage(this.txt_diffi2_5)
		
	
		this.initLanguage(this.txt_time3_1)
		
	
		this.initLanguage(this.txt_diffi3_1)
		
	
		this.initLanguage(this.txt_time3_2)
		
	
		this.initLanguage(this.txt_diffi3_2)
		
	
		this.initLanguage(this.txt_time3_3)
		
	
		this.initLanguage(this.txt_diffi3_3)
		
	
		this.initLanguage(this.txt_time3_4)
		
	
		this.initLanguage(this.txt_diffi3_4)
		
	
		this.initLanguage(this.txt_time3_5)
		
	
		this.initLanguage(this.txt_diffi3_5)
		
	
		this.initLanguage(this.txt1)
		
	
		this.initLanguage(this.txt2)
		
	
		this.initLanguage(this.txt3)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Cardrecord_UI'] = Cardrecord_UI_Generate;