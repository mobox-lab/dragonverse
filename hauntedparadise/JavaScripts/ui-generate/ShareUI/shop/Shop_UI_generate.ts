
 

 @UIBind('UI/ShareUI/shop/Shop_UI.ui')
 export default class Shop_UI_Generate extends UIScript {
	 	private img_bg_1_Internal: mw.Image
	public get img_bg_1(): mw.Image {
		if(!this.img_bg_1_Internal&&this.uiWidgetBase) {
			this.img_bg_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/img_bg_1') as mw.Image
		}
		return this.img_bg_1_Internal
	}
	private canvas_tabs_Internal: mw.Canvas
	public get canvas_tabs(): mw.Canvas {
		if(!this.canvas_tabs_Internal&&this.uiWidgetBase) {
			this.canvas_tabs_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs') as mw.Canvas
		}
		return this.canvas_tabs_Internal
	}
	private img_bg1_1_Internal: mw.Image
	public get img_bg1_1(): mw.Image {
		if(!this.img_bg1_1_Internal&&this.uiWidgetBase) {
			this.img_bg1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/img_bg1_1') as mw.Image
		}
		return this.img_bg1_1_Internal
	}
	private img_bg1_Internal: mw.Image
	public get img_bg1(): mw.Image {
		if(!this.img_bg1_Internal&&this.uiWidgetBase) {
			this.img_bg1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/img_bg1') as mw.Image
		}
		return this.img_bg1_Internal
	}
	private img_bg1_2_Internal: mw.Image
	public get img_bg1_2(): mw.Image {
		if(!this.img_bg1_2_Internal&&this.uiWidgetBase) {
			this.img_bg1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/img_bg1_2') as mw.Image
		}
		return this.img_bg1_2_Internal
	}
	private canvas_back_Internal: mw.Canvas
	public get canvas_back(): mw.Canvas {
		if(!this.canvas_back_Internal&&this.uiWidgetBase) {
			this.canvas_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_back') as mw.Canvas
		}
		return this.canvas_back_Internal
	}
	private btn_back_Internal: mw.Button
	public get btn_back(): mw.Button {
		if(!this.btn_back_Internal&&this.uiWidgetBase) {
			this.btn_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_back/btn_back') as mw.Button
		}
		return this.btn_back_Internal
	}
	private text_back_Internal: mw.TextBlock
	public get text_back(): mw.TextBlock {
		if(!this.text_back_Internal&&this.uiWidgetBase) {
			this.text_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_back/text_back') as mw.TextBlock
		}
		return this.text_back_Internal
	}
	private img_back_Internal: mw.Image
	public get img_back(): mw.Image {
		if(!this.img_back_Internal&&this.uiWidgetBase) {
			this.img_back_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_back/img_back') as mw.Image
		}
		return this.img_back_Internal
	}
	private canvas_tablist_Internal: mw.Canvas
	public get canvas_tablist(): mw.Canvas {
		if(!this.canvas_tablist_Internal&&this.uiWidgetBase) {
			this.canvas_tablist_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist') as mw.Canvas
		}
		return this.canvas_tablist_Internal
	}
	private img_tabSelected_Internal: mw.Image
	public get img_tabSelected(): mw.Image {
		if(!this.img_tabSelected_Internal&&this.uiWidgetBase) {
			this.img_tabSelected_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/img_tabSelected') as mw.Image
		}
		return this.img_tabSelected_Internal
	}
	private canvas_tab0_Internal: mw.Canvas
	public get canvas_tab0(): mw.Canvas {
		if(!this.canvas_tab0_Internal&&this.uiWidgetBase) {
			this.canvas_tab0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab0') as mw.Canvas
		}
		return this.canvas_tab0_Internal
	}
	private btn_tab0_Internal: mw.Button
	public get btn_tab0(): mw.Button {
		if(!this.btn_tab0_Internal&&this.uiWidgetBase) {
			this.btn_tab0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab0/btn_tab0') as mw.Button
		}
		return this.btn_tab0_Internal
	}
	private text_tab0_Internal: mw.TextBlock
	public get text_tab0(): mw.TextBlock {
		if(!this.text_tab0_Internal&&this.uiWidgetBase) {
			this.text_tab0_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab0/text_tab0') as mw.TextBlock
		}
		return this.text_tab0_Internal
	}
	private canvas_tab1_Internal: mw.Canvas
	public get canvas_tab1(): mw.Canvas {
		if(!this.canvas_tab1_Internal&&this.uiWidgetBase) {
			this.canvas_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab1') as mw.Canvas
		}
		return this.canvas_tab1_Internal
	}
	private btn_tab1_Internal: mw.Button
	public get btn_tab1(): mw.Button {
		if(!this.btn_tab1_Internal&&this.uiWidgetBase) {
			this.btn_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab1/btn_tab1') as mw.Button
		}
		return this.btn_tab1_Internal
	}
	private text_tab1_Internal: mw.TextBlock
	public get text_tab1(): mw.TextBlock {
		if(!this.text_tab1_Internal&&this.uiWidgetBase) {
			this.text_tab1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab1/text_tab1') as mw.TextBlock
		}
		return this.text_tab1_Internal
	}
	private canvas_tab2_Internal: mw.Canvas
	public get canvas_tab2(): mw.Canvas {
		if(!this.canvas_tab2_Internal&&this.uiWidgetBase) {
			this.canvas_tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab2') as mw.Canvas
		}
		return this.canvas_tab2_Internal
	}
	private btn_tab2_Internal: mw.Button
	public get btn_tab2(): mw.Button {
		if(!this.btn_tab2_Internal&&this.uiWidgetBase) {
			this.btn_tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab2/btn_tab2') as mw.Button
		}
		return this.btn_tab2_Internal
	}
	private text_tab2_Internal: mw.TextBlock
	public get text_tab2(): mw.TextBlock {
		if(!this.text_tab2_Internal&&this.uiWidgetBase) {
			this.text_tab2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab2/text_tab2') as mw.TextBlock
		}
		return this.text_tab2_Internal
	}
	private canvas_tab3_Internal: mw.Canvas
	public get canvas_tab3(): mw.Canvas {
		if(!this.canvas_tab3_Internal&&this.uiWidgetBase) {
			this.canvas_tab3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab3') as mw.Canvas
		}
		return this.canvas_tab3_Internal
	}
	private btn_tab3_Internal: mw.Button
	public get btn_tab3(): mw.Button {
		if(!this.btn_tab3_Internal&&this.uiWidgetBase) {
			this.btn_tab3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab3/btn_tab3') as mw.Button
		}
		return this.btn_tab3_Internal
	}
	private text_tab3_Internal: mw.TextBlock
	public get text_tab3(): mw.TextBlock {
		if(!this.text_tab3_Internal&&this.uiWidgetBase) {
			this.text_tab3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab3/text_tab3') as mw.TextBlock
		}
		return this.text_tab3_Internal
	}
	private canvas_tab4_Internal: mw.Canvas
	public get canvas_tab4(): mw.Canvas {
		if(!this.canvas_tab4_Internal&&this.uiWidgetBase) {
			this.canvas_tab4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab4') as mw.Canvas
		}
		return this.canvas_tab4_Internal
	}
	private btn_tab4_Internal: mw.Button
	public get btn_tab4(): mw.Button {
		if(!this.btn_tab4_Internal&&this.uiWidgetBase) {
			this.btn_tab4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab4/btn_tab4') as mw.Button
		}
		return this.btn_tab4_Internal
	}
	private text_tab4_Internal: mw.TextBlock
	public get text_tab4(): mw.TextBlock {
		if(!this.text_tab4_Internal&&this.uiWidgetBase) {
			this.text_tab4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tabs/canvas_tablist/canvas_tab4/text_tab4') as mw.TextBlock
		}
		return this.text_tab4_Internal
	}
	private canvas_list_Internal: mw.Canvas
	public get canvas_list(): mw.Canvas {
		if(!this.canvas_list_Internal&&this.uiWidgetBase) {
			this.canvas_list_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list') as mw.Canvas
		}
		return this.canvas_list_Internal
	}
	private text_shop_Internal: mw.TextBlock
	public get text_shop(): mw.TextBlock {
		if(!this.text_shop_Internal&&this.uiWidgetBase) {
			this.text_shop_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/text_shop') as mw.TextBlock
		}
		return this.text_shop_Internal
	}
	private canvas_itemlist_Internal: mw.Canvas
	public get canvas_itemlist(): mw.Canvas {
		if(!this.canvas_itemlist_Internal&&this.uiWidgetBase) {
			this.canvas_itemlist_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_itemlist') as mw.Canvas
		}
		return this.canvas_itemlist_Internal
	}
	private img_bg2_1_Internal: mw.Image
	public get img_bg2_1(): mw.Image {
		if(!this.img_bg2_1_Internal&&this.uiWidgetBase) {
			this.img_bg2_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_itemlist/img_bg2_1') as mw.Image
		}
		return this.img_bg2_1_Internal
	}
	private img_bg2_Internal: mw.Image
	public get img_bg2(): mw.Image {
		if(!this.img_bg2_Internal&&this.uiWidgetBase) {
			this.img_bg2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_itemlist/img_bg2') as mw.Image
		}
		return this.img_bg2_Internal
	}
	private img_bg2_1_1_Internal: mw.Image
	public get img_bg2_1_1(): mw.Image {
		if(!this.img_bg2_1_1_Internal&&this.uiWidgetBase) {
			this.img_bg2_1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_itemlist/img_bg2_1_1') as mw.Image
		}
		return this.img_bg2_1_1_Internal
	}
	private canvas_shopitems_Internal: mw.Canvas
	public get canvas_shopitems(): mw.Canvas {
		if(!this.canvas_shopitems_Internal&&this.uiWidgetBase) {
			this.canvas_shopitems_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_itemlist/ScrollBox/canvas_shopitems') as mw.Canvas
		}
		return this.canvas_shopitems_Internal
	}
	private canvas_sort_Internal: mw.Canvas
	public get canvas_sort(): mw.Canvas {
		if(!this.canvas_sort_Internal&&this.uiWidgetBase) {
			this.canvas_sort_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort') as mw.Canvas
		}
		return this.canvas_sort_Internal
	}
	private img_sortbg_Internal: mw.Image
	public get img_sortbg(): mw.Image {
		if(!this.img_sortbg_Internal&&this.uiWidgetBase) {
			this.img_sortbg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/img_sortbg') as mw.Image
		}
		return this.img_sortbg_Internal
	}
	private btn_sort_Internal: mw.Button
	public get btn_sort(): mw.Button {
		if(!this.btn_sort_Internal&&this.uiWidgetBase) {
			this.btn_sort_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/btn_sort') as mw.Button
		}
		return this.btn_sort_Internal
	}
	private text_sort_Internal: mw.TextBlock
	public get text_sort(): mw.TextBlock {
		if(!this.text_sort_Internal&&this.uiWidgetBase) {
			this.text_sort_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/text_sort') as mw.TextBlock
		}
		return this.text_sort_Internal
	}
	private img_sort_Internal: mw.Image
	public get img_sort(): mw.Image {
		if(!this.img_sort_Internal&&this.uiWidgetBase) {
			this.img_sort_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/img_sort') as mw.Image
		}
		return this.img_sort_Internal
	}
	private canvas_sortlist_Internal: mw.Canvas
	public get canvas_sortlist(): mw.Canvas {
		if(!this.canvas_sortlist_Internal&&this.uiWidgetBase) {
			this.canvas_sortlist_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist') as mw.Canvas
		}
		return this.canvas_sortlist_Internal
	}
	private img_bg3_Internal: mw.Image
	public get img_bg3(): mw.Image {
		if(!this.img_bg3_Internal&&this.uiWidgetBase) {
			this.img_bg3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/img_bg3') as mw.Image
		}
		return this.img_bg3_Internal
	}
	private img_bg3_1_Internal: mw.Image
	public get img_bg3_1(): mw.Image {
		if(!this.img_bg3_1_Internal&&this.uiWidgetBase) {
			this.img_bg3_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/img_bg3_1') as mw.Image
		}
		return this.img_bg3_1_Internal
	}
	private canvas_category_Internal: mw.Canvas
	public get canvas_category(): mw.Canvas {
		if(!this.canvas_category_Internal&&this.uiWidgetBase) {
			this.canvas_category_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category') as mw.Canvas
		}
		return this.canvas_category_Internal
	}
	private canvas_category1_Internal: mw.Canvas
	public get canvas_category1(): mw.Canvas {
		if(!this.canvas_category1_Internal&&this.uiWidgetBase) {
			this.canvas_category1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1') as mw.Canvas
		}
		return this.canvas_category1_Internal
	}
	private text_category1_Internal: mw.TextBlock
	public get text_category1(): mw.TextBlock {
		if(!this.text_category1_Internal&&this.uiWidgetBase) {
			this.text_category1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1/text_category1') as mw.TextBlock
		}
		return this.text_category1_Internal
	}
	private btn_category1_Internal: mw.Button
	public get btn_category1(): mw.Button {
		if(!this.btn_category1_Internal&&this.uiWidgetBase) {
			this.btn_category1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1/btn_category1') as mw.Button
		}
		return this.btn_category1_Internal
	}
	private canvas_category1_1_Internal: mw.Canvas
	public get canvas_category1_1(): mw.Canvas {
		if(!this.canvas_category1_1_Internal&&this.uiWidgetBase) {
			this.canvas_category1_1_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_1') as mw.Canvas
		}
		return this.canvas_category1_1_Internal
	}
	private text_category2_Internal: mw.TextBlock
	public get text_category2(): mw.TextBlock {
		if(!this.text_category2_Internal&&this.uiWidgetBase) {
			this.text_category2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_1/text_category2') as mw.TextBlock
		}
		return this.text_category2_Internal
	}
	private btn_category2_Internal: mw.Button
	public get btn_category2(): mw.Button {
		if(!this.btn_category2_Internal&&this.uiWidgetBase) {
			this.btn_category2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_1/btn_category2') as mw.Button
		}
		return this.btn_category2_Internal
	}
	private canvas_category1_2_Internal: mw.Canvas
	public get canvas_category1_2(): mw.Canvas {
		if(!this.canvas_category1_2_Internal&&this.uiWidgetBase) {
			this.canvas_category1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_2') as mw.Canvas
		}
		return this.canvas_category1_2_Internal
	}
	private text_category3_Internal: mw.TextBlock
	public get text_category3(): mw.TextBlock {
		if(!this.text_category3_Internal&&this.uiWidgetBase) {
			this.text_category3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_2/text_category3') as mw.TextBlock
		}
		return this.text_category3_Internal
	}
	private btn_category3_Internal: mw.Button
	public get btn_category3(): mw.Button {
		if(!this.btn_category3_Internal&&this.uiWidgetBase) {
			this.btn_category3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_2/btn_category3') as mw.Button
		}
		return this.btn_category3_Internal
	}
	private canvas_category1_3_Internal: mw.Canvas
	public get canvas_category1_3(): mw.Canvas {
		if(!this.canvas_category1_3_Internal&&this.uiWidgetBase) {
			this.canvas_category1_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_3') as mw.Canvas
		}
		return this.canvas_category1_3_Internal
	}
	private text_category4_Internal: mw.TextBlock
	public get text_category4(): mw.TextBlock {
		if(!this.text_category4_Internal&&this.uiWidgetBase) {
			this.text_category4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_3/text_category4') as mw.TextBlock
		}
		return this.text_category4_Internal
	}
	private btn_category4_Internal: mw.Button
	public get btn_category4(): mw.Button {
		if(!this.btn_category4_Internal&&this.uiWidgetBase) {
			this.btn_category4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_3/btn_category4') as mw.Button
		}
		return this.btn_category4_Internal
	}
	private canvas_category1_4_Internal: mw.Canvas
	public get canvas_category1_4(): mw.Canvas {
		if(!this.canvas_category1_4_Internal&&this.uiWidgetBase) {
			this.canvas_category1_4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_4') as mw.Canvas
		}
		return this.canvas_category1_4_Internal
	}
	private text_category5_Internal: mw.TextBlock
	public get text_category5(): mw.TextBlock {
		if(!this.text_category5_Internal&&this.uiWidgetBase) {
			this.text_category5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_4/text_category5') as mw.TextBlock
		}
		return this.text_category5_Internal
	}
	private btn_category5_Internal: mw.Button
	public get btn_category5(): mw.Button {
		if(!this.btn_category5_Internal&&this.uiWidgetBase) {
			this.btn_category5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_list/canvas_sort/canvas_sortlist/canvas_category/canvas_category1_4/btn_category5') as mw.Button
		}
		return this.btn_category5_Internal
	}
	private canvas_currency_Internal: mw.Canvas
	public get canvas_currency(): mw.Canvas {
		if(!this.canvas_currency_Internal&&this.uiWidgetBase) {
			this.canvas_currency_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency') as mw.Canvas
		}
		return this.canvas_currency_Internal
	}
	private canvas_freemoney_Internal: mw.Canvas
	public get canvas_freemoney(): mw.Canvas {
		if(!this.canvas_freemoney_Internal&&this.uiWidgetBase) {
			this.canvas_freemoney_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_freemoney') as mw.Canvas
		}
		return this.canvas_freemoney_Internal
	}
	private img_freebg_Internal: mw.Image
	public get img_freebg(): mw.Image {
		if(!this.img_freebg_Internal&&this.uiWidgetBase) {
			this.img_freebg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_freemoney/img_freebg') as mw.Image
		}
		return this.img_freebg_Internal
	}
	private img_freeicon_Internal: mw.Image
	public get img_freeicon(): mw.Image {
		if(!this.img_freeicon_Internal&&this.uiWidgetBase) {
			this.img_freeicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_freemoney/img_freeicon') as mw.Image
		}
		return this.img_freeicon_Internal
	}
	private text_freenum_Internal: mw.TextBlock
	public get text_freenum(): mw.TextBlock {
		if(!this.text_freenum_Internal&&this.uiWidgetBase) {
			this.text_freenum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_freemoney/text_freenum') as mw.TextBlock
		}
		return this.text_freenum_Internal
	}
	private btn_free_Internal: mw.Button
	public get btn_free(): mw.Button {
		if(!this.btn_free_Internal&&this.uiWidgetBase) {
			this.btn_free_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_freemoney/btn_free') as mw.Button
		}
		return this.btn_free_Internal
	}
	private canvas_recharge_Internal: mw.Canvas
	public get canvas_recharge(): mw.Canvas {
		if(!this.canvas_recharge_Internal&&this.uiWidgetBase) {
			this.canvas_recharge_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_recharge') as mw.Canvas
		}
		return this.canvas_recharge_Internal
	}
	private img_rebg_Internal: mw.Image
	public get img_rebg(): mw.Image {
		if(!this.img_rebg_Internal&&this.uiWidgetBase) {
			this.img_rebg_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_recharge/img_rebg') as mw.Image
		}
		return this.img_rebg_Internal
	}
	private img_reicon_Internal: mw.Image
	public get img_reicon(): mw.Image {
		if(!this.img_reicon_Internal&&this.uiWidgetBase) {
			this.img_reicon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_recharge/img_reicon') as mw.Image
		}
		return this.img_reicon_Internal
	}
	private text_renum_Internal: mw.TextBlock
	public get text_renum(): mw.TextBlock {
		if(!this.text_renum_Internal&&this.uiWidgetBase) {
			this.text_renum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_recharge/text_renum') as mw.TextBlock
		}
		return this.text_renum_Internal
	}
	private btn_re_Internal: mw.Button
	public get btn_re(): mw.Button {
		if(!this.btn_re_Internal&&this.uiWidgetBase) {
			this.btn_re_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_recharge/btn_re') as mw.Button
		}
		return this.btn_re_Internal
	}
	private btn_entrance_Internal: mw.Button
	public get btn_entrance(): mw.Button {
		if(!this.btn_entrance_Internal&&this.uiWidgetBase) {
			this.btn_entrance_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_currency/canvas_recharge/btn_entrance') as mw.Button
		}
		return this.btn_entrance_Internal
	}
	private canvas_details_Internal: mw.Canvas
	public get canvas_details(): mw.Canvas {
		if(!this.canvas_details_Internal&&this.uiWidgetBase) {
			this.canvas_details_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details') as mw.Canvas
		}
		return this.canvas_details_Internal
	}
	private img_bg4_Internal: mw.Image
	public get img_bg4(): mw.Image {
		if(!this.img_bg4_Internal&&this.uiWidgetBase) {
			this.img_bg4_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/img_bg4') as mw.Image
		}
		return this.img_bg4_Internal
	}
	private img_bg2_1_2_Internal: mw.Image
	public get img_bg2_1_2(): mw.Image {
		if(!this.img_bg2_1_2_Internal&&this.uiWidgetBase) {
			this.img_bg2_1_2_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/img_bg2_1_2') as mw.Image
		}
		return this.img_bg2_1_2_Internal
	}
	private text_name_Internal: mw.TextBlock
	public get text_name(): mw.TextBlock {
		if(!this.text_name_Internal&&this.uiWidgetBase) {
			this.text_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/text_name') as mw.TextBlock
		}
		return this.text_name_Internal
	}
	private img_br_Internal: mw.Image
	public get img_br(): mw.Image {
		if(!this.img_br_Internal&&this.uiWidgetBase) {
			this.img_br_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/img_br') as mw.Image
		}
		return this.img_br_Internal
	}
	private text_itemdetail_Internal: mw.TextBlock
	public get text_itemdetail(): mw.TextBlock {
		if(!this.text_itemdetail_Internal&&this.uiWidgetBase) {
			this.text_itemdetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_details/text_itemdetail') as mw.TextBlock
		}
		return this.text_itemdetail_Internal
	}
	private canvas_giftDetails_Internal: mw.Canvas
	public get canvas_giftDetails(): mw.Canvas {
		if(!this.canvas_giftDetails_Internal&&this.uiWidgetBase) {
			this.canvas_giftDetails_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails') as mw.Canvas
		}
		return this.canvas_giftDetails_Internal
	}
	private img_bg5_Internal: mw.Image
	public get img_bg5(): mw.Image {
		if(!this.img_bg5_Internal&&this.uiWidgetBase) {
			this.img_bg5_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails/img_bg5') as mw.Image
		}
		return this.img_bg5_Internal
	}
	private img_bg2_1_3_Internal: mw.Image
	public get img_bg2_1_3(): mw.Image {
		if(!this.img_bg2_1_3_Internal&&this.uiWidgetBase) {
			this.img_bg2_1_3_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails/img_bg2_1_3') as mw.Image
		}
		return this.img_bg2_1_3_Internal
	}
	private gift_name_Internal: mw.TextBlock
	public get gift_name(): mw.TextBlock {
		if(!this.gift_name_Internal&&this.uiWidgetBase) {
			this.gift_name_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails/gift_name') as mw.TextBlock
		}
		return this.gift_name_Internal
	}
	private img_detailline_Internal: mw.Image
	public get img_detailline(): mw.Image {
		if(!this.img_detailline_Internal&&this.uiWidgetBase) {
			this.img_detailline_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails/img_detailline') as mw.Image
		}
		return this.img_detailline_Internal
	}
	private canvas_detailContent_Internal: mw.Canvas
	public get canvas_detailContent(): mw.Canvas {
		if(!this.canvas_detailContent_Internal&&this.uiWidgetBase) {
			this.canvas_detailContent_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails/canvas_detailContent') as mw.Canvas
		}
		return this.canvas_detailContent_Internal
	}
	private canvas_giftItem_Internal: mw.Canvas
	public get canvas_giftItem(): mw.Canvas {
		if(!this.canvas_giftItem_Internal&&this.uiWidgetBase) {
			this.canvas_giftItem_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails/canvas_detailContent/ScrollBox/canvas_giftItem') as mw.Canvas
		}
		return this.canvas_giftItem_Internal
	}
	private text_giftDetail_Internal: mw.TextBlock
	public get text_giftDetail(): mw.TextBlock {
		if(!this.text_giftDetail_Internal&&this.uiWidgetBase) {
			this.text_giftDetail_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_giftDetails/canvas_detailContent/text_giftDetail') as mw.TextBlock
		}
		return this.text_giftDetail_Internal
	}
	private canvas_buy_Internal: mw.Canvas
	public get canvas_buy(): mw.Canvas {
		if(!this.canvas_buy_Internal&&this.uiWidgetBase) {
			this.canvas_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy') as mw.Canvas
		}
		return this.canvas_buy_Internal
	}
	private btn_buy_Internal: mw.Button
	public get btn_buy(): mw.Button {
		if(!this.btn_buy_Internal&&this.uiWidgetBase) {
			this.btn_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/btn_buy') as mw.Button
		}
		return this.btn_buy_Internal
	}
	private text_buy_Internal: mw.TextBlock
	public get text_buy(): mw.TextBlock {
		if(!this.text_buy_Internal&&this.uiWidgetBase) {
			this.text_buy_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/btn_buy/text_buy') as mw.TextBlock
		}
		return this.text_buy_Internal
	}
	private img_money_Internal: mw.Image
	public get img_money(): mw.Image {
		if(!this.img_money_Internal&&this.uiWidgetBase) {
			this.img_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/img_money') as mw.Image
		}
		return this.img_money_Internal
	}
	private text_money_Internal: mw.TextBlock
	public get text_money(): mw.TextBlock {
		if(!this.text_money_Internal&&this.uiWidgetBase) {
			this.text_money_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_buy/text_money') as mw.TextBlock
		}
		return this.text_money_Internal
	}
	private canvas_want_Internal: mw.Canvas
	public get canvas_want(): mw.Canvas {
		if(!this.canvas_want_Internal&&this.uiWidgetBase) {
			this.canvas_want_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_want') as mw.Canvas
		}
		return this.canvas_want_Internal
	}
	private btn_want_Internal: mw.Button
	public get btn_want(): mw.Button {
		if(!this.btn_want_Internal&&this.uiWidgetBase) {
			this.btn_want_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_want/btn_want') as mw.Button
		}
		return this.btn_want_Internal
	}
	private text_want_Internal: mw.TextBlock
	public get text_want(): mw.TextBlock {
		if(!this.text_want_Internal&&this.uiWidgetBase) {
			this.text_want_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_want/btn_want/text_want') as mw.TextBlock
		}
		return this.text_want_Internal
	}
	private img_wanticon_Internal: mw.Image
	public get img_wanticon(): mw.Image {
		if(!this.img_wanticon_Internal&&this.uiWidgetBase) {
			this.img_wanticon_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_want/img_wanticon') as mw.Image
		}
		return this.img_wanticon_Internal
	}
	private text_wantnum_Internal: mw.TextBlock
	public get text_wantnum(): mw.TextBlock {
		if(!this.text_wantnum_Internal&&this.uiWidgetBase) {
			this.text_wantnum_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_want/text_wantnum') as mw.TextBlock
		}
		return this.text_wantnum_Internal
	}
	private btn_intro_Internal: mw.Button
	public get btn_intro(): mw.Button {
		if(!this.btn_intro_Internal&&this.uiWidgetBase) {
			this.btn_intro_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_want/btn_intro') as mw.Button
		}
		return this.btn_intro_Internal
	}
	private canvas_show_Internal: mw.Canvas
	public get canvas_show(): mw.Canvas {
		if(!this.canvas_show_Internal&&this.uiWidgetBase) {
			this.canvas_show_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_show') as mw.Canvas
		}
		return this.canvas_show_Internal
	}
	private progress_Internal: mw.ProgressBar
	public get progress(): mw.ProgressBar {
		if(!this.progress_Internal&&this.uiWidgetBase) {
			this.progress_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_show/progress') as mw.ProgressBar
		}
		return this.progress_Internal
	}
	private canvas_tipsbox_Internal: mw.Canvas
	public get canvas_tipsbox(): mw.Canvas {
		if(!this.canvas_tipsbox_Internal&&this.uiWidgetBase) {
			this.canvas_tipsbox_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tipsbox') as mw.Canvas
		}
		return this.canvas_tipsbox_Internal
	}
	private text_content_tips_Internal: mw.TextBlock
	public get text_content_tips(): mw.TextBlock {
		if(!this.text_content_tips_Internal&&this.uiWidgetBase) {
			this.text_content_tips_Internal = this.uiWidgetBase.findChildByPath('RootCanvas/canvas_tipsbox/text_content_tips') as mw.TextBlock
		}
		return this.text_content_tips_Internal
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
		
		this.btn_back.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_back");
		})
		this.btn_back.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_back.onPressed.add(() => {
			this.btn_back["preScale"] = this.btn_back.renderScale;
			this.btn_back.renderScale = Vector2.one.set(this.btn_back["preScale"]).multiply(1.1);
		})
		this.btn_back.onReleased.add(() => {
			this.btn_back.renderScale = this.btn_back["preScale"];
		})
		
	
		this.btn_tab0.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_tab0");
		})
		this.btn_tab0.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab0.onPressed.add(() => {
			this.btn_tab0["preScale"] = this.btn_tab0.renderScale;
			this.btn_tab0.renderScale = Vector2.one.set(this.btn_tab0["preScale"]).multiply(1.1);
		})
		this.btn_tab0.onReleased.add(() => {
			this.btn_tab0.renderScale = this.btn_tab0["preScale"];
		})
		
	
		this.btn_tab1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_tab1");
		})
		this.btn_tab1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab1.onPressed.add(() => {
			this.btn_tab1["preScale"] = this.btn_tab1.renderScale;
			this.btn_tab1.renderScale = Vector2.one.set(this.btn_tab1["preScale"]).multiply(1.1);
		})
		this.btn_tab1.onReleased.add(() => {
			this.btn_tab1.renderScale = this.btn_tab1["preScale"];
		})
		
	
		this.btn_tab2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_tab2");
		})
		this.btn_tab2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab2.onPressed.add(() => {
			this.btn_tab2["preScale"] = this.btn_tab2.renderScale;
			this.btn_tab2.renderScale = Vector2.one.set(this.btn_tab2["preScale"]).multiply(1.1);
		})
		this.btn_tab2.onReleased.add(() => {
			this.btn_tab2.renderScale = this.btn_tab2["preScale"];
		})
		
	
		this.btn_tab3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_tab3");
		})
		this.btn_tab3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab3.onPressed.add(() => {
			this.btn_tab3["preScale"] = this.btn_tab3.renderScale;
			this.btn_tab3.renderScale = Vector2.one.set(this.btn_tab3["preScale"]).multiply(1.1);
		})
		this.btn_tab3.onReleased.add(() => {
			this.btn_tab3.renderScale = this.btn_tab3["preScale"];
		})
		
	
		this.btn_tab4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_tab4");
		})
		this.btn_tab4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_tab4.onPressed.add(() => {
			this.btn_tab4["preScale"] = this.btn_tab4.renderScale;
			this.btn_tab4.renderScale = Vector2.one.set(this.btn_tab4["preScale"]).multiply(1.1);
		})
		this.btn_tab4.onReleased.add(() => {
			this.btn_tab4.renderScale = this.btn_tab4["preScale"];
		})
		
	
		this.btn_sort.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_sort");
		})
		this.btn_sort.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_sort.onPressed.add(() => {
			this.btn_sort["preScale"] = this.btn_sort.renderScale;
			this.btn_sort.renderScale = Vector2.one.set(this.btn_sort["preScale"]).multiply(1.1);
		})
		this.btn_sort.onReleased.add(() => {
			this.btn_sort.renderScale = this.btn_sort["preScale"];
		})
		
	
		this.btn_category1.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_category1");
		})
		this.btn_category1.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_category1.onPressed.add(() => {
			this.btn_category1["preScale"] = this.btn_category1.renderScale;
			this.btn_category1.renderScale = Vector2.one.set(this.btn_category1["preScale"]).multiply(1.1);
		})
		this.btn_category1.onReleased.add(() => {
			this.btn_category1.renderScale = this.btn_category1["preScale"];
		})
		
	
		this.btn_category2.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_category2");
		})
		this.btn_category2.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_category2.onPressed.add(() => {
			this.btn_category2["preScale"] = this.btn_category2.renderScale;
			this.btn_category2.renderScale = Vector2.one.set(this.btn_category2["preScale"]).multiply(1.1);
		})
		this.btn_category2.onReleased.add(() => {
			this.btn_category2.renderScale = this.btn_category2["preScale"];
		})
		
	
		this.btn_category3.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_category3");
		})
		this.btn_category3.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_category3.onPressed.add(() => {
			this.btn_category3["preScale"] = this.btn_category3.renderScale;
			this.btn_category3.renderScale = Vector2.one.set(this.btn_category3["preScale"]).multiply(1.1);
		})
		this.btn_category3.onReleased.add(() => {
			this.btn_category3.renderScale = this.btn_category3["preScale"];
		})
		
	
		this.btn_category4.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_category4");
		})
		this.btn_category4.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_category4.onPressed.add(() => {
			this.btn_category4["preScale"] = this.btn_category4.renderScale;
			this.btn_category4.renderScale = Vector2.one.set(this.btn_category4["preScale"]).multiply(1.1);
		})
		this.btn_category4.onReleased.add(() => {
			this.btn_category4.renderScale = this.btn_category4["preScale"];
		})
		
	
		this.btn_category5.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_category5");
		})
		this.btn_category5.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_category5.onPressed.add(() => {
			this.btn_category5["preScale"] = this.btn_category5.renderScale;
			this.btn_category5.renderScale = Vector2.one.set(this.btn_category5["preScale"]).multiply(1.1);
		})
		this.btn_category5.onReleased.add(() => {
			this.btn_category5.renderScale = this.btn_category5["preScale"];
		})
		
	
		this.btn_free.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_free");
		})
		this.btn_free.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_free.onPressed.add(() => {
			this.btn_free["preScale"] = this.btn_free.renderScale;
			this.btn_free.renderScale = Vector2.one.set(this.btn_free["preScale"]).multiply(1.1);
		})
		this.btn_free.onReleased.add(() => {
			this.btn_free.renderScale = this.btn_free["preScale"];
		})
		
	
		this.btn_re.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_re");
		})
		this.btn_re.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_re.onPressed.add(() => {
			this.btn_re["preScale"] = this.btn_re.renderScale;
			this.btn_re.renderScale = Vector2.one.set(this.btn_re["preScale"]).multiply(1.1);
		})
		this.btn_re.onReleased.add(() => {
			this.btn_re.renderScale = this.btn_re["preScale"];
		})
		
	
		this.btn_entrance.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_entrance");
		})
		this.btn_entrance.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_entrance.onPressed.add(() => {
			this.btn_entrance["preScale"] = this.btn_entrance.renderScale;
			this.btn_entrance.renderScale = Vector2.one.set(this.btn_entrance["preScale"]).multiply(1.1);
		})
		this.btn_entrance.onReleased.add(() => {
			this.btn_entrance.renderScale = this.btn_entrance["preScale"];
		})
		
	
		this.btn_buy.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_buy");
		})
		this.btn_buy.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_buy.onPressed.add(() => {
			this.btn_buy["preScale"] = this.btn_buy.renderScale;
			this.btn_buy.renderScale = Vector2.one.set(this.btn_buy["preScale"]).multiply(1.1);
		})
		this.btn_buy.onReleased.add(() => {
			this.btn_buy.renderScale = this.btn_buy["preScale"];
		})
		
	
		this.btn_want.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_want");
		})
		this.btn_want.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_want.onPressed.add(() => {
			this.btn_want["preScale"] = this.btn_want.renderScale;
			this.btn_want.renderScale = Vector2.one.set(this.btn_want["preScale"]).multiply(1.1);
		})
		this.btn_want.onReleased.add(() => {
			this.btn_want.renderScale = this.btn_want["preScale"];
		})
		
	
		this.btn_intro.onClicked.add(()=>{
			Event.dispatchToLocal("PlayButtonClick", "Shop_UI_btn_intro");
		})
		this.btn_intro.touchMethod = (mw.ButtonTouchMethod.PreciseTap);
		this.btn_intro.onPressed.add(() => {
			this.btn_intro["preScale"] = this.btn_intro.renderScale;
			this.btn_intro.renderScale = Vector2.one.set(this.btn_intro["preScale"]).multiply(1.1);
		})
		this.btn_intro.onReleased.add(() => {
			this.btn_intro.renderScale = this.btn_intro["preScale"];
		})
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.text_back)
		
	
		this.initLanguage(this.text_tab0)
		
	
		this.initLanguage(this.text_tab1)
		
	
		this.initLanguage(this.text_tab2)
		
	
		this.initLanguage(this.text_tab3)
		
	
		this.initLanguage(this.text_tab4)
		
	
		this.initLanguage(this.text_shop)
		
	
		this.initLanguage(this.text_sort)
		
	
		this.initLanguage(this.text_category1)
		
	
		this.initLanguage(this.text_category2)
		
	
		this.initLanguage(this.text_category3)
		
	
		this.initLanguage(this.text_category4)
		
	
		this.initLanguage(this.text_category5)
		
	
		this.initLanguage(this.text_freenum)
		
	
		this.initLanguage(this.text_renum)
		
	
		this.initLanguage(this.text_name)
		
	
		this.initLanguage(this.text_itemdetail)
		
	
		this.initLanguage(this.gift_name)
		
	
		this.initLanguage(this.text_giftDetail)
		
	
		this.initLanguage(this.text_buy)
		
	
		this.initLanguage(this.text_money)
		
	
		this.initLanguage(this.text_want)
		
	
		this.initLanguage(this.text_wantnum)
		
	
		this.initLanguage(this.text_content_tips)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/canvas_giftDetails/TextBlock") as any);
		
	

	}
	private initLanguage(ui: mw.StaleButton | mw.TextBlock) {
        let call = mw.UIScript.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }

UIService['UI_Shop_UI'] = Shop_UI_Generate;